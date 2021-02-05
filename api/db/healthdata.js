const {getDatabase} = require('./mongo');

async function addData(entry) {
  const database = await getDatabase();
  entry.data.forEach(datum =>
    database.collection(entry.name).updateOne(
      {ts: Date.parse(datum.date)},
      {$set: {datum}},
      {upsert: true}
    )
  );
  return 0;
}

async function getData(table) {
  const database = await getDatabase();
  return await database.collection(table).find({}).sort({ "ts" : 1 }).toArray();
}

module.exports = {
  addData,
  getData,
};
