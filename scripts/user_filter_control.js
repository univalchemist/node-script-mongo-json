const fs = require('fs');
const client = require('../config/db');
client.connect(err => {
  const collection = client.db("test").collection("userFilterControl");
  const userFilterCollection = client.db("test").collection("userFilter");
  // perform actions on the collection object
  fs.readFile('../json/user_filter_control.json', 'utf8', async function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data);
    let userHistory = [];
   await Promise.all(json.map( async item =>{
      const history = item;
      console.log("mapping******************************");
      try {
        let result = await userFilterCollection.findOne({user_filter_id: item.user_filter_id})
        if (result) {
          console.log("result~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          history.user_filter = result
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