const fs = require('fs');
const client = require('../config/db');
client.connect(err => {
  const userFilterCollection = client.db("test").collection("userFilter");
  // perform actions on the collection object
  fs.readFile('../json/user_filter.json', 'utf8', function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data);
    userFilterCollection.insertMany(json, function (err, doc) {
      console.log("============success=============");
      if (err) throw err;
    });
    if (err) throw err;
  });
});
