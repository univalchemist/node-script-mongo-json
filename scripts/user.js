const fs = require('fs');
const client = require('../config/db');
client.connect(err => {
  const userCollection = client.db("test").collection("user");
  // perform actions on the collection object
  fs.readFile('../json/user.json', 'utf8', function (err, data) {
    if (err) throw err;
    var json = JSON.parse(data);
    userCollection.insertMany(json, function (err, doc) {
      console.log("============success=============");
      if (err) throw err;
    });
    if (err) throw err;
  });
});
