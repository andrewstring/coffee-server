const jwt = require("jsonwebtoken");
const { privateKey } = require("config");

const generateToken = async (db, collection, credentials) => {
  jwt.sign(credentials, privateKey, { algorithm: "RS256" }, (err, token) => {
    if (err) {
      throw new Error("ERROR: Issue Generating Token");
    } else {
      console.log(token);
    }
  });
};
