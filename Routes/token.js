var express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const { mongoConfig } = require("../config");
const clientRouter = express.Router();

const client = new MongoClient(mongoConfig.url);
const collection = "tokens";

//generate token
clientRouter.post("/", async (req, res) => {
  try {
    await client.connect();
    const response = await generateToken(client, collection, req.body);
    res.write(response);
  } catch (err) {
    console.trace(err);
  } finally {
    res.end();
    await client.close();
  }
});
