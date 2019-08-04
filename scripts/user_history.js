const fs = require('fs');
const client = require('../config/db');
client.connect(async err => {
    const collection = client.db("test").collection("userHistory");
    const jsonData = await fs.readFileSync('../json/user_history.json', 'utf8');
    const json = JSON.parse(jsonData);
    await collection.insertMany(json);
});
