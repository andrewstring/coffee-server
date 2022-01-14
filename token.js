const jwt = require("jsonwebtoken");
const { privateKey } = require("./config");

const generateToken = async (client, db, collection, credentials, res) => {
  await jwt.sign(credentials, privateKey, async (err, token) => {
    if (err) {
    } else {
      const document = tokenDocument(token);
      await client.db(db).collection(collection).insertOne(document);
      res.send(document);
    }
  });
};

const validateToken = async (token, res) => {
  try {
    res.send(await jwt.verify(token, privateKey));
  } catch {
    res.send("invalid");
  }
};

const tokenDocument = (token) => {
  return {
    token: token,
    dateCreated: new Date(),
  };
};

module.exports = { generateToken, validateToken };
