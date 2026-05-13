const mongoose = require("mongoose");

const ScriptSchema = new mongoose.Schema({
  topic: String,
  niche: String,
  platform: String,
  style: String,
  output: Object, // This stores the title, hook, body, etc.
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Script", ScriptSchema);