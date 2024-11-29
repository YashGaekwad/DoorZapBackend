const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: String,
  homeId: String,
  qrCodeUrl: String,
});

module.exports = mongoose.model("User", UserSchema);
