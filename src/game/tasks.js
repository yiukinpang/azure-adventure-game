export const gradingEngineBaseUrl = "https://gradingengineassignmentfunctionapp.azurewebsites.net/api/AzureGraderFunction";
export const dialogs = {
    "npc_01": [{
        "message": "Hello",
    }, {
        "message": "How are you?",
    }],
    "npc_02": [{
        "message": "Hello there",
    }],
    "npc_03": [{
        "message": "Hi",
    }],
    "npc_04": [{
        "message": "Hey",
    }],
    "sword": [{
        "message": "You got a sword",
    }],
    "push": [{
        "message": "You can push boxes now",
    }],
    "sign_01": [{
        "message": "You can read this!",
    }],
    "book_01": [{
        "message": "Welcome to the game!",
    }]
};

export const tasks = [
    {
        "gameClassOrder": 1,
        "name": "Test01_ResourceGroupExist",
        "instruction": "Can you help create a resource group named 'projProd' in Hong Kong?",
        "filter": "test=AzureProjectTest.ResourceGroupTest.Test01_ResourceGroupExist || test=AzureProjectTest.ResourceGroupTest.Test02_ResourceGroupLocation",
        "timeLimit": 2,
        "reward": 10
    },
    {
        "gameClassOrder": 2,
        "name": "Test01_StorageAccountsWithTag",
        "instruction": "Can you help create a Storage account in resource group 'projProd' and add tag name 'usage' and value 'logic'?",
        "filter": "test=AzureProjectTest.StorageAccountTest.Test01_StorageAccountsWithTag",
        "timeLimit": 2,
        "reward": 10
    },
    {
        "gameClassOrder": 2,
        "name": "Test02_StorageAccountsWithTag",
        "instruction": "Can you help create a Storage account in resource group 'projProd' and add tag name 'usage' and value 'StaticWeb'?",
        "filter": "test=AzureProjectTest.StorageAccountTest.Test02_StorageAccountsWithTag",
        "timeLimit": 2,
        "reward": 10
    },
    {
        "gameClassOrder": 2,
        "name": "Test03_StorageAccountSettings",
        "instruction": "Can you help change your Storage account tagged 'usage' as 'logic' to southeastasia, AccessTier to Hot, StorageV2, Standard_LRS and allow public access?",
        "filter": "test=AzureProjectTest.StorageAccountTest.Test03_StorageAccountSettings",
        "timeLimit": 2,
        "reward": 20
    }
];
