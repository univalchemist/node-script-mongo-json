const fs = require('fs');
const client = require('../config/db');
client.connect(async err  => {
    const collection = client.db("test").collection("userClientSecurityProfile");
    const jsonData = await fs.readFileSync('../json/user_client_security_profile.json', 'utf8');
    const json = JSON.parse(jsonData);

    const client_role_jsonData = await fs.readFileSync('../json/client_role.json', 'utf8');
    const client_role_json = JSON.parse(client_role_jsonData);

    const client_role_security_permission_jsonData = await fs.readFileSync('../json/client_role_security_permission.json', 'utf8');
    const client_role_security_permission_json = JSON.parse(client_role_security_permission_jsonData);

    let userClientSecurityProfile = [];
    await Promise.all(json.map( async item =>{
        const temp = item;
        temp.client_role = client_role_json.filter(c => item.client_role_id === c.client_role_id);
        temp.client_role_security_permission = client_role_security_permission_json.filter(c => item.client_role_id === c.client_role_id);
        userClientSecurityProfile.push(temp);
    }));

    await collection.insertMany(userClientSecurityProfile);
    console.log("insert successfully");
});
