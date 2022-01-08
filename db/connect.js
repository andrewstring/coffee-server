const { MongoClient } = require("mongodb");
const assert = require("assert");

const { mongoConfig } = require("../config.js");

const poolConnect = (database) => {
  MongoClient.connect(
    mongoConfig.url,
    {
      maxPoolSize: 10,
    },
    (err, db) => {
      assert.equal(null, err);
      database.connection = db;
    }
  );
};

const connect = async (client) => {
  client.connect();
  console.log("SUCCESS: successfully connected to database");
};

const run = async (transaction) => {
  const client = new MongoClient(mongoConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect(async (err) => {
    const db = client.db(mongoConfig.db);
    await transaction(db);
    client.close();
  });
};

exports.default = connect;
exports.run = run;
exports.poolConnect = poolConnect;
