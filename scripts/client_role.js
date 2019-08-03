const fs = require('fs');
const client = require('../config/db');
client.connect(err => {
  const userClientSecurityProfileCollection = client.db("test").collection("userClientSecurityProfile");
  const collection = client.db("test").collection("clientRole");
  // perform actions on the collection object
  fs.readFile('../json/client_role.json', 'utf8', async function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data);
    let userHistory = [];
   await Promise.all(json.map( async item =>{
      const history = item;
      console.log("mapping******************************");
      try {
        let result = await userClientSecurityProfileCollection.findOne({client_role_id: item.client_role_id})
        if (result) {
          console.log("result~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          history.client_role = result
        }
      } catch (e) {
        console.log("errrr @@@@@@@@@@@@@@@@@@@@@@@@@@@@", e);
      }
      userHistory.push(history);
    }));
    console.log("endMapping~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    try {
      const r = await collection.insertMany(userHistory);
      if (r) {
        console.log("==============Success===================")
      }
    } catch (e) {
      throw e;
    }
    if (err) throw err;
  });
});
