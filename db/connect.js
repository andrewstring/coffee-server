const { MongoClient } = require("mongodb");
const assert = require("assert");

const { mongo } = require("../config.js");

const poolConnect = () => {
  MongoClient.connect(
    mongo.url,
    {
      poolSize: 10,
    },
    (err, db) => {
      assert.equal(null, err);
      return;
    }
  );
};

const connect = (transaction) => {
  const client = new MongoClient(mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect(async (err) => {
    const db = client.db(mongo.db);
    await transaction(db);
    client.close();
  });
};

exports.default = connect;
