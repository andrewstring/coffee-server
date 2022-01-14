var express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const { mongoConfig } = require("../config");
const tokenRouter = express.Router();
const { generateToken, validateToken } = require("../token");

const db = mongoConfig.db;
const client = new MongoClient(mongoConfig.url);
const collection = "tokens";

//generate token
tokenRouter.post("/", async (req, res) => {
  try {
    await client.connect(async (err) => {
      await generateToken(client, db, collection, req.body, res);
    });
  } catch (err) {
    console.trace(err);
    res.end();
  } finally {
    await client.close();
  }
});

//validate token
tokenRouter.get("/:id/:token", async (req, res) => {
  try {
    const id = ObjectId(req.params.id);
    await client.connect(async (err) => {
      const response = (
        await client
          .db(mongoConfig.db)
          .collection(collection)
          .find({ _id: id, token: req.params.token })
          .toArray()
      )[0];
      if (!response) {
        res.statusCode = 400;
        res.send("invalid");
      }
      await validateToken(response.token, res);
    });
  } catch {
    res.statusCode = 400;
    res.send("invalid");
  } finally {
    await client.close();
  }
});

module.exports = tokenRouter;
