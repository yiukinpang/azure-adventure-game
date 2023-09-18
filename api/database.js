const { TableClient } = require("@azure/data-tables");

const storageAccountConnectionString = process.env.storageAccountConnectionString;
const usersTableClient = TableClient.fromConnectionString(storageAccountConnectionString, "users");
const marksTableClient = TableClient.fromConnectionString(storageAccountConnectionString, "marks");


const getEmail = (req) => {
    const header = req.headers['x-ms-client-principal'];
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    const clientPrincipal = JSON.parse(decoded);
    return clientPrincipal.userDetails;
}

const isMember = async (email, context) => {
    try {
        const user = await usersTableClient.getEntity(email, email);
        context.log(user);
        return user.partitionKey ? true : false;
    } catch (__) {
        return false;
    }
}

const saveMark = async (email, task, mark) => {
    // chech if mark already exists

    const isExist = async (email, task) => {
        try {
            const m = await marksTableClient.getEntity(email, task);
            console.log("exist");
            return m.partitionKey ? true : false;
        } catch (__) {
            console.log("Not exist");
            return false;
        }
    }

    if (await isExist(email, task)) {
        const now = new Date();
        const m = await marksTableClient.getEntity(email, task);
        // update mark
        m.mark = mark;
        m.date = new Date();
        if(mark !== 0 && !m.passAt){
            m.passAt = now;
        }
        await marksTableClient.updateEntity(m, "Merge");
        return;
    }

    console.log("not exist");
    const now = new Date();
    const data = {
        partitionKey: email,
        rowKey: task,
        mark: mark,
        firstTrial : now,
        date: now,
    };
    if(mark !== 0){
        data.passAt = now;
    }
    await marksTableClient.createEntity(data);
}

const getMarks = async (email) => {
    let continuationToken = null;
    let pageEntities = undefined;
    let entities = [];
    do {
        const page = await marksTableClient.listEntities({
            queryOptions: {
                filter: `PartitionKey eq '${email}'`
            }
        }).byPage({ maxPageSize: 100, continuationToken: continuationToken }).next();
        pageEntities = page.value;
        if (!pageEntities) break;
        continuationToken = pageEntities.continuationToken;
        entities = entities.concat(pageEntities);
    }
    while (continuationToken !== undefined);
    // reduce entities to a dict with {task: mark}
    entities = entities.reduce((acc, cur) => {
        acc[cur.rowKey] = cur.mark;
        return acc;
    }, {});
    return entities
}


module.exports = {
    getEmail,
    isMember,
    saveMark,
    getMarks,
};