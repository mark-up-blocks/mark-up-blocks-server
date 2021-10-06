const mongoose = require("mongoose");

const { tagBlockRef } = require("./TagBlock");
const { blockTreeRef } = require("./BlockTree");

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  tagBlocks: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge"
    },
    block: tagBlockRef,
    isChallenge: {
      type: Boolean,
      default: false
    }
  }],
  boilerplate: blockTreeRef,
  answer: blockTreeRef
});

module.exports = mongoose.model("Challenge", challengeSchema);
