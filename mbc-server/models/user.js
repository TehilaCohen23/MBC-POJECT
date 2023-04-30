const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, minlength: 6, unique: true, required: true },
  password: { type: String, minlength: 5, required: true },
  name: { type: String, minlength: 4 },
  businessName: { type: String, minlength: 4 },
  biz: { type: Boolean },
});

//model - class
const User = mongoose.model("users", userSchema);
module.exports = User;
