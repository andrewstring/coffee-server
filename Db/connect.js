const { MongoClient } = require("mongodb");
const assert = require("assert");
const { mongoConfig } = require("../config");

const connect = async (client) => {
  await client.connect();
  console.trace("SUCCESS: successfully connected to database");
};

const runTransaction = async (
  transaction,
  username,
  password,
  adminUsername,
  adminPassword
) => {
  const client = new MongoClient(mongoConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect(async (err) => {
    const db = client.db(mongoConfig.db);
    if (username && password) {
      await transaction(db, username, password, adminUsername, adminPassword);
    } else {
      await transaction(db);
    }
    client.close();
  });
};

module.exports = runTransaction;
