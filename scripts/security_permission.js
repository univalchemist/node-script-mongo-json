const fs = require('fs');
const client = require('../config/db');
client.connect(async err => {
  const collection = client.db("test").collection("securityPermission");
  const jsonData = await fs.readFileSync('../json/security_permission.json', 'utf8');
  const json = JSON.parse(jsonData);
  await collection.insertMany(json);
});
