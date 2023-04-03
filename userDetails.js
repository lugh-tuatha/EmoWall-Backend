const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    phone: { type: String, unique: true },
    password: String,
    cpassword: String,
    userType: String,
  },
  {
    collection: "Userinfo",
  }
);

mongoose.model("Userinfo", UserDetailsSchema);
