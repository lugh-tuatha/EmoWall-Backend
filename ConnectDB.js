const DBConfig = require("./service/shared/config-service").getConf('DB')

const mongoose = require('mongoose');
const DB = process.env.MONGO_URL

const connectDB = async () => {
  mongoose
    .connect(DB || DBConfig.DatabaseUrl, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("Connected to database".cyan.underline);
    })
    .catch((e) => console.log(e));
}

module.exports = connectDB;