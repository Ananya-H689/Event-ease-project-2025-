const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// GET ALL EVENTS
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST (Add new event)
router.post("/", async (req, res) => {
  try {
    console.log("Incoming registration data:", req.body);
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (Remove a registration by ID)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Registration not found" });
    res.json({ message: "Deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
