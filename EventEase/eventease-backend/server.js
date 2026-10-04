require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// ROUTES
const eventRoutes = require("./routes/eventRoutes");
app.use("/api/events", eventRoutes);

// MONGO CONNECTION
// Set MONGODB_URI in eventease-backend/.env (never commit that file).
// Falls back to a local MongoDB if nothing is set.
const mongoURI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/EventEase";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ DB Error:", err.message));

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
