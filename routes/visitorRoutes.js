const express = require("express");
const Visitor = require("../models/Visitor");

const router = express.Router();

// Handle Visitor Form Submission
router.post("/visit/:visitorId", async (req, res) => {
  const { visitorId } = req.params;
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).send("Name and phone are required");
  }

  const visitor = new Visitor({ visitorId, name, phone });
  await visitor.save();
  res.status(200).send("Visitor details received");
});

module.exports = router;
