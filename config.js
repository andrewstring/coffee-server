//Server config
const serverConfig = {
  loggingPath: "./app_err.log",
  port: 3000,
};

//MongoDB
const mongoConfig = {
  db: "DailyJoeCoffee",
  url: "mongodb+srv://admin:Fellow3.0!@dailyjoecoffee.b57as.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
};

exports.config = { serverConfig, mongoConfig };
