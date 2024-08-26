const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
  Username: { type: String, required: true },
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  edited: { type: Boolean, default: false },
});

module.exports = mongoose.model("Comments", CommentsSchema);
