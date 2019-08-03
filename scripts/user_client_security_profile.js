const fs = require('fs');
const client = require('../config/db');
client.connect(err => {
  const collection = client.db("test").collection("userClientSecurityProfile");
  const userCollection = client.db("test").collection("user");
  // perform actions on the collection object
  fs.readFile('../json/user_client_security_profile.json', 'utf8', async function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data);
    let userHistory = [];
   await Promise.all(json.map( async item =>{
      const history = item;
      console.log("mapping******************************");
      try {
        let result = await userCollection.findOne({user_id: item.user_id})
        if (result) {
          console.log("result~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          history.user = result
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
