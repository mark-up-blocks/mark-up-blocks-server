const mongoose = require("mongoose");

const { stageInfoOption } = require("../config/populateOptions");

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

async function populateChallenge(next) {
  this.populate({
    ...stageInfoOption,
    path: "stage",
    populate: {
      ...stageInfoOption,
      populate: {
        ...stageInfoOption
      }
    }
  });

  next();
}

rootChallengeSchema.pre(/^find/, populateChallenge);

module.exports = mongoose.model("RootChallenge", rootChallengeSchema);
