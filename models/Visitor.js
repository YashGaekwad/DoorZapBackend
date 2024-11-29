const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  visitorId: String,
  name: String,
  phone: String,
});

module.exports = mongoose.model("Visitor", VisitorSchema);
