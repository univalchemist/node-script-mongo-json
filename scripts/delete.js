const client = require('../config/db');
client.connect(err => {
    const collectionName = "user";
    const collection = client.db("test").collection(collectionName);
    // perform actions on the collection object
    collection.deleteMany({}, function (err, doc) {
        console.log("delete successfully");
        if (err) throw err;
    })
});
