const express = require("express");
const app = express();
const colors = require("colors");
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
require("dotenv").config();

app.use("/upload", express.static(__dirname + "/upload"));

const mongoUrl = process.env.MONGO_URL;

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database".cyan.underline);
  })
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log("Server Started");
});

app.use("/post", require("./routes/uploadRoutes"));

app.use("/sadpost", require("./routes/sadPostRoutes"));

app.use('/sadpost', require("./routes/sadPostRoutes"));

app.use("/angerpost", require("./routes/angerPostRoutes"));
