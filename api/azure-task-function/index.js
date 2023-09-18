const axios = require('axios');
const { getEmail, isMember } = require("../database");
const { setJson, setErrorJson } = require("../contextHelper");



module.exports = async function (context, req) {
    const email = getEmail(req);
    if (!await isMember(email, context)) {
        setJson(context, [{
            "gameClassOrder": 1,
            "name": "Not Member",
            "tests": [],
            "instruction": "You are not member!",
            "filter": "",
            "timeLimit": 1,
            "reward": 0,
        }]);
        return;
    }

    try {     
        const url = process.env.gameTaskFunctionUrl +"&email=" + encodeURIComponent(email);
            const res = await axios.get(url, JSON.stringify({}), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // context.log(res.data);        
        // let response = { ...res.data };     
        setJson(context, res.data);

    } catch (ex) {
        context.log(ex);
        setErrorJson(context, ex);
    }
}