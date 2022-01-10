var express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const { mongoConfig } = require("../config");
var clientRouter = express.Router();

const client = new MongoClient(mongoConfig.url);

//get all items from collection
clientRouter.get("/:type", async (req, res) => {
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
clientRouter.get("/:type/:id", async (req, res) => {
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
clientRouter.post("/:type/", async (req, res) => {
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
clientRouter.put("/:type/:id", async (req, res) => {
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
clientRouter.delete("/:type/:id", async (req, res) => {
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

module.exports = clientRouter;
