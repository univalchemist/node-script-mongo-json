const fs = require('fs');
const client = require('../config/db');
client.connect(async err => {
    const collection = client.db("test").collection("userSystemSecurityProfile");
    const jsonData = await fs.readFileSync('../json/user_system_security_profile.json', 'utf8');
    const json = JSON.parse(jsonData);
    await collection.insertMany(json);
});
