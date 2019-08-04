const fs = require('fs');
const client = require('../config/db');
client.connect(async err  => {
  const collection = client.db("test").collection("user");
  const jsonData = await fs.readFileSync('../json/user.json', 'utf8');
  const json = JSON.parse(jsonData);
  const user_history =  await client.db("test").collection("userHistory").find({}).toArray();
  const user_favorites =  await client.db("test").collection("userFavorites").find({}).toArray();
  const user_system_security_profile =  await client.db("test").collection("userSystemSecurityProfile").find({}).toArray();
  const user_sort =  await client.db("test").collection("userSort").find({}).toArray();
  const user_client_security_profile =  await client.db("test").collection("userClientSecurityProfile").find({}).toArray();

  let user = [];
  await Promise.all(json.map( async item =>{
    const temp = item;
    temp.user_history = user_history.filter(c => item.user_id === c.user_id);
    temp.user_favorites = user_favorites.filter(c => item.user_id === c.user_id);
    temp.user_system_security_profile = user_system_security_profile.filter(c => item.user_id === c.user_id);
    temp.user_sort = user_sort.filter(c => item.user_id === c.user_id);
    temp.user_client_security_profile = user_client_security_profile.filter(c => item.user_id === c.user_id);
    user.push(temp);
  }));

  await collection.insertMany(user);
});
