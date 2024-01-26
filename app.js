const express = require("express");
const app = express();
const colors = require("colors");
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
require("dotenv").config();

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true, limit: '50mb'}))

app.use("/upload", express.static(__dirname + "/upload"));

const mongoUrl = process.env.MONGO_URL;
const connectDB = require("./ConnectDB");

connectDB();

app.use("/api/v2/release/emotions", require("./routes/emotionsRoutes"));

app.listen(5000, () => {
  console.log("Server Started");
});