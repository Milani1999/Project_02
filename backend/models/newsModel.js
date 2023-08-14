const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notice = mongoose.model("News", newsSchema);

module.exports = Notice;
