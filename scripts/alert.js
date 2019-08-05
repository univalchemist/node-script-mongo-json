const fs = require('fs');
const client = require('../config/db');
client.connect(async err  => {
  const collection = client.db("test").collection("alert");
  const jsonData = await fs.readFileSync('../json/alert.json', 'utf8');
  const json = JSON.parse(jsonData);

  const alert_notification_jsonData = await fs.readFileSync('../json/alert_notification.json', 'utf8');
  const alert_notification_json = JSON.parse(alert_notification_jsonData);

  const alert_recipient_jsonData = await fs.readFileSync('../json/alert_recipient.json', 'utf8');
  const alert_recipient_json = JSON.parse(alert_recipient_jsonData);
  let alert = [];
  await Promise.all(json.map( async item =>{
    const temp = item;
    temp.alert_notification = alert_notification_json.filter(c => item.alert_id === c.alert_id);
    temp.alert_recipient = alert_recipient_json.filter(c => item.alert_id === c.alert_id);
    alert.push(temp);
  }));

  await collection.insertMany(alert);
  console.log("insert successfully");
});
