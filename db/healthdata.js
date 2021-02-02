const {getDatabase} = require('./mongo');

const collectionName = 'healthdata';

async function addData(ad) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(ad);
  return insertedId;
}

async function getData() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}

async function deleteData(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
  });
}

module.exports = {
  addData,
  getData,
  deleteData
};
