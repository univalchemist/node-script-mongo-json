const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sirsaula:Learntocode1%25@cluster0-xxg4p.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
module.exports = client;

