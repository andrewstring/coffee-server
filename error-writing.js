const fs = require("fs");
const { loggingPath } = require("./config").serverConfig;

const writeError = (err) => {
  console.log(err);
  fs.writeFile(loggingPath, err.toString(), (error) => {
    if (error) {
      console.log(error);
    }
  });
};

module.exports = writeError;
