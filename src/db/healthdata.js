const {getDatabase} = require('./mongo');

async function addData(entry) {
  const database = await getDatabase();
  if (Array.isArray(entry.data) && entry.data.length > 0) {
    const result = await database.collection(entry.name).insertMany(entry.data);
    return result.insertedCount;
  }
}

async function getData(table) {
  const database = await getDatabase();
  return await database.collection(table).find({}).toArray();
}

async function deleteData(table, id) {
  const database = await getDatabase();
  await database.collection(table).deleteOne({
    _id: new ObjectID(id),
  });
}

module.exports = {
  addData,
  getData,
  deleteData
};
