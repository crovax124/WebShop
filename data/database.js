const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDataBase() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("vjloop-shop");
}

function getDb() {
  if (!database) {
    throw new Error(
      "You must connect to MongoDB first(or install the community Server)"
    );
  }
  return database;
}

module.exports = {
  connectToDataBase: connectToDataBase,
  getDb: getDb,
};
