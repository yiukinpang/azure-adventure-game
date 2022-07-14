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
    }, {
        "message": "Ok bye!",
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
    { "instruction": "Can you help create a resource group named 'projProd' in Hong Kong?", "filter": "test==AzureProjectTest.ResourceGroupTest", "time": 2, "coin": 10 },
    { "instruction": "Can you help create a Storage account in resource group 'projProd' and add tag name 'usage' and value 'logic'?", "filter": "test==AzureProjectTest.StorageAccountTest.Test01_StorageAccountsWithTag", "time": 2, "coin": 10 },
    { "instruction": "Can you help create a Storage account in resource group 'projProd' and add tag name 'usage' and value 'StaticWeb'?", "filter": "test==AzureProjectTest.StorageAccountTest.Test02_StorageAccountsWithTag", "time": 2, "coin": 10 },
    { "instruction": "Can you help change your Storage account tagged 'usage' as 'logic' to southeastasia, AccessTier to Hot, StorageV2, Standard_LRS and allow public access?", "filter": "test==AzureProjectTest.StorageAccountTest.Test03_StorageAccountSettings", "time": 2, "coin": 20 },
    { "instruction": "Can you help change your Storage account tagged 'StaticWeb' as 'logic' to eastasia, AccessTier to Hot, StorageV2, Standard_LRS and allow public access? It should have Blob container called '$web'. Index page with content 'This is index page.' and error page with content 'This is error page.'", "filter": "test==AzureProjectTest.StorageAccountTest.Test04_WebStorageAccountSettings", "time": 2, "coin": 20 },
];
