const fs = require("fs");
const { loggingPath } = require("./config").serverConfig;

const writeError = (err) => {
  console.trace(err);
  fs.writeFile(loggingPath, err.toString(), (error) => {
    if (error) {
      console.trace(error);
    }
  });
};

module.exports = writeError;
