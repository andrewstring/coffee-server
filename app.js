const express = require("express");
const { clientRouter, adminRouter } = require("./Routes");
const { serverConfig } = require("./config");
const writeError = require("./error-writing");
const app = express();

//error logging
process.on("uncaughtException", (err) => {
  writeError(err);
});

//json
app.use(express.json());

//routes
app.use("/client", clientRouter);
app.use("/admin", adminRouter);

//start server
app.listen(process.argv[2] || process.env.PORT || serverConfig.port, () => {
  const port = process.argv[2] || process.env.PORT || serverConfig.port;
  console.log(`SUCCESS: app listening on port ${port}`);
});
