const mongoose = require("mongoose");

const { tagBlockRef } = require("./TagBlock");
const { blockTreeRef } = require("./BlockTree");

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tagBlocks: [tagBlockRef],
  boilerplate: blockTreeRef,
  answer: blockTreeRef
});

module.exports = mongoose.model("Challenge", challengeSchema);