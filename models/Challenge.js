const mongoose = require("mongoose");

const { blockTreeRef } = require("./BlockTree");

const challengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  elementTree: blockTreeRef
});

module.exports = mongoose.model("Challenge", challengeSchema);
