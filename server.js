const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
require("dotenv").config();

const qrRoutes = require("./routes/qrRoutes");
const visitorRoutes = require("./routes/visitorRoutes");
const socketHandler = require("./routes/signalingRoutes");

const app = express();
const server = http.createServer(app);
const io = new Server(server);



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Routes
app.use("/api/qr", qrRoutes);
app.use("/api/visitors", visitorRoutes);

// Dynamic Visitor ID Generation
app.get("/visit", (req, res) => {
  const { v4: uuidv4 } = require("uuid"); // Import locally
  const visitorId = uuidv4(); // Generate a unique visitor ID
  console.log(`Generated Visitor ID: ${visitorId}`);
  res.redirect(`/visit-page?visitorId=${visitorId}`);
});

// Serve Visitor Page with EJS
app.get("/visit-page", (req, res) => {
  const visitorId = req.query.visitorId || "unknown"; // Retrieve visitorId from query params
  res.render("layout", { title: "Visitor Video Call", visitorId }); // Pass visitorId to the EJS template
});

// Route to render the "Thanks" page
app.get("/thanks", (req, res) => {
  res.render("thanks", { title: "Thank You!" });
});

// WebRTC Signaling
socketHandler(io);

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
