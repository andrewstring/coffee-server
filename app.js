const express = require("express");
const connect = require("./db/connect").default;
const { MongoClient, ObjectId } = require("mongodb");
const { serverConfig, mongoConfig } = require("./config").config;
const writeError = require("./error-writing").writeError;
const app = express();

//error logging
process.on("uncaughtException", (err) => {
  writeError(err);
});

//setup pool
const client = new MongoClient(mongoConfig.url);
connect(client);

//authentication
app.use((req, res, next) => {
  next();
});

//json
app.use(express.json());

//get all items from collection
app.get("/:type", async (req, res) => {
  try {
    const type = req.params.type;
    const cursor = await client.db(mongoConfig.db).collection(type).find({});
    const array = await cursor.toArray();
    res.send(array);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
  }
});

//get single item
app.get("/:type/:id", async (req, res) => {
  try {
    const type = req.params.type;
    const query = {
      _id: ObjectId(req.params.id),
    };
    const cursor = await client.db(mongoConfig.db).collection(type).find(query);
    const array = await cursor.toArray();
    res.send(array);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
  }
});

//post item to collection
app.post("/:type/", async (req, res) => {
  try {
    const document = req.body;
    document.dateAdded = new Date();
    const type = req.params.type;
    const response = await client
      .db(mongoConfig.db)
      .collection(type)
      .insertOne(document);
    res.send(response);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
  }
});

//update item
app.put("/:type/:id", async (req, res) => {
  try {
    const document = req.body;
    delete document.dateAdded;
    document.dateUpdated = new Date();

    const type = req.params.type;
    const id = new ObjectId(req.params.id);
    const response = await client
      .db(mongoConfig.db)
      .collection(type)
      .updateOne({ _id: id }, { $set: document });
    res.send(response);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
  }
});

//delete item
app.delete("/:type/:id", async (req, res) => {
  try {
    const query = {
      _id: ObjectId(req.params.id),
    };
    const type = req.params.type;
    const response = await client
      .db(mongoConfig.db)
      .collection(type)
      .deleteOne(query);
    res.send(response);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
  }
});

//start server
app.listen(process.env.PORT || serverConfig.port, () => {
  console.log(`SUCCESS: app listening on port ${serverConfig.port}`);
});
