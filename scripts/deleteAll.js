const client = require('../config/db');
client.connect(err => {
    const collections = [
        "user",
        "clientRole",
        "clientRoleSecurityPermission",
        "content",
        "measure",
        "role",
        "securityPermission",
        "userClientSecurityProfile",
        "userFavorites",
        "userFilter",
        "userFilterAccount",
        "userFilterControl",
        "userFilterPlan",
        "userFilterSuffix",
        "userHistory",
        "userSort",
        "userSystemSecurityProfile"
    ];
    collections.map(c => {
        const collection = client.db("test").collection(c);
        // perform actions on the collection object
        collection.deleteMany({}, function (err, doc) {
            console.log("delete all successfully");
            if (err) throw err;
        })
    });
});
