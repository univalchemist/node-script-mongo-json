const fs = require('fs');
const client = require('../config/db');
client.connect(err => {
  const collection = client.db("test").collection("securityPermission");
  // perform actions on the collection object
  fs.readFile('../json/security_permission.json', 'utf8', function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data);
    collection.insertMany(json, function (err, doc) {
      console.log("============success=============");
      if (err) throw err;
    });
    if (err) throw err;
  });
});
