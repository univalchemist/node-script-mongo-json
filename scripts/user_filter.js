const fs = require('fs');
const client = require('../config/db');
client.connect(async err  => {
  const collection = client.db("test").collection("userFilter");
  const jsonData = await fs.readFileSync('../json/user_filter.json', 'utf8');
  const json = JSON.parse(jsonData);

  const user_filter_plan_jsonData = await fs.readFileSync('../json/user_filter_plan.json', 'utf8');
  const user_filter_plan_json = JSON.parse(user_filter_plan_jsonData);

  const user_filter_control_jsonData = await fs.readFileSync('../json/user_filter_control.json', 'utf8');
  const user_filter_control_json = JSON.parse(user_filter_control_jsonData);

  const user_filter_suffix_jsonData = await fs.readFileSync('../json/user_filter_suffix.json', 'utf8');
  const user_filter_suffix_json = JSON.parse(user_filter_suffix_jsonData);

  const user_filter_account_jsonData = await fs.readFileSync('../json/user_filter_account.json', 'utf8');
  const user_filter_account_json = JSON.parse(user_filter_account_jsonData);

  let userFilter = [];
  await Promise.all(json.map( async item =>{
    const temp = item;
    temp.user_filter_plan = user_filter_plan_json.filter(c => item.user_filter_id === c.user_filter_id);
    temp.user_filter_control = user_filter_control_json.filter(c => item.user_filter_id === c.user_filter_id);
    temp.user_filter_suffix = user_filter_suffix_json.filter(c => item.user_filter_id === c.user_filter_id);
    temp.user_filter_account = user_filter_account_json.filter(c => item.user_filter_id === c.user_filter_id);
    userFilter.push(temp);
  }));

  await collection.insertMany(userFilter);
  console.log("insert successfully");
});
