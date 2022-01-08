const express = require("express");
const connect = require("./db/connect");
const { MongoClient, ObjectId } = require("mongodb");
const { serverConfig, mongoConfig } = require("./config");
const writeError = require("./error-writing");
const app = express();

//error logging
process.on("uncaughtException", (err) => {
  writeError(err);
});

const client = new MongoClient(mongoConfig.url);

//authentication
app.use((req, res, next) => {
  next();
});

//json
app.use(express.json());

//get all items from collection
app.get("/:type", async (req, res) => {
  try {
    await client.connect();
    const type = req.params.type;
    const cursor = await client.db(mongoConfig.db).collection(type).find({});
    const array = await cursor.toArray();
    res.send(array);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
    await client.close();
  }
});

//get single item
app.get("/:type/:id", async (req, res) => {
  try {
    await client.connect();
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
    await client.close();
  }
});

//post item to collection
app.post("/:type/", async (req, res) => {
  try {
    await client.connect();
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
    await client.close();
  }
});

//update item
app.put("/:type/:id", async (req, res) => {
  try {
    await client.connect();
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
    await client.close();
  }
});

//delete item
app.delete("/:type/:id", async (req, res) => {
  try {
    await client.connect();
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
    await client.close();
  }
});

//start server
app.listen(process.env.PORT || serverConfig.port, () => {
  console.log(`SUCCESS: app listening on port ${serverConfig.port}`);
});
