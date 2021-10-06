const createError = require("http-errors");
const mongoose = require("mongoose");

const RootChallenge = require("../models/RootChallenge");
const Challenge = require("../models/Challenge");

async function getRootChallengeList(req, res, next) {
  try {
    const challenges = await RootChallenge.find().lean();

    res.status(200);
    res.json({ challenges });
  } catch (err) {
    next(err);
  }
}

async function getChallengeById(req, res, next) {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(400, "invalid challenge id");
    }

    const challenge = await Challenge.findById(id)
      .populate([
        {
          path: "tagBlocks.block",
          model: "TagBlock"
        },
        {
          path: "boilerplate answer",
          model: "BlockTree"
        }
      ])
      .lean();

    if (!challenge) {
      throw createError(404, "challenge not found");
    }

    res.status(200);
    res.json(challenge);
  } catch (err) {
    next(err);
  }
}

module.exports = { getRootChallengeList, getChallengeById };
