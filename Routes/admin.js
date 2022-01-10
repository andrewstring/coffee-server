var express = require("express");
const { MongoClient, ObjectID, ObjectId } = require("mongodb");
const { mongoConfig } = require("../config");
var adminRouter = express.Router();

const client = new MongoClient(mongoConfig.url);
const collection = "authentication";

//get all items from collection
adminRouter.get("/", async (req, res) => {
  try {
    await client.connect();
    const cursor = await client
      .db(mongoConfig.db)
      .collection(collection)
      .find({});
    const array = await cursor.toArray();
    res.send(array);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
    await client.close();
  }
});

//get specified document from collection
adminRouter.get("/:id", async (req, res) => {
  try {
    await client.connect();
    const query = {
      _id: ObjectId(req.params.id),
    };
    const cursor = await client
      .db(mongoConfig.db)
      .collection(collection)
      .find(query);
    const array = await cursor.toArray();
    res.send(array);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
    await client.close();
  }
});

//add new credentials to collection
adminRouter.post("/", async (req, res) => {
  try {
    await client.connect();
    const document = req.body;
    document.dateAdded = new Date();
    const response = await client
      .db(mongoConfig.db)
      .collection(collection)
      .insertOne(document);
    res.send(response);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
    await client.close();
  }
});

//delete old credentials
adminRouter.delete("/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  try {
    await client.connect();
    const query = {
      _id: { $not: { $eq: id } },
    };
    const response = await client
      .db(mongoConfig.db)
      .collection(collection)
      .deleteMany(query);
    res.send(response);
  } catch (err) {
    console.error(err);
  } finally {
    res.end();
    await client.close();
  }
});

module.exports = adminRouter;
