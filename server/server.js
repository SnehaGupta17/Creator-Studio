// require("dotenv").config();
// console.log("KEY LOADED:", process.env.GEMINI_API_KEY);
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");

// // require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/api/auth", authRoutes);

// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//   res.send("API Running");
// });

// const PORT = process.env.PORT || 5000;

// const path = require("path");



// // 2. Add this block at the bottom
// const clientPath = path.join(__dirname, "..", "client");

// // This serves your images, CSS, and JS from the client folder
// app.use(express.static(clientPath));

// // This handles the main page load
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "client", "index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // 1. Moved to the top
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 2. Define path to client
const clientPath = path.join(__dirname, "..", "client");
app.use(express.static(clientPath));

// API Routes
app.use("/api/auth", authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// 3. Frontend Route (Must be AFTER API routes)
app.get("/", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});