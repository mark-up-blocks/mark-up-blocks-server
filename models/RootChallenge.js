const mongoose = require("mongoose");

const rootChallengeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  stage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge"
  }
});

module.exports = mongoose.model("RootChallenge", rootChallengeSchema);
