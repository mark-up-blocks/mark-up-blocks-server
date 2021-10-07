const mongoose = require("mongoose");
const createError = require("http-errors");

const service = require("../services/challenges");

async function getRootChallenges(req, res, next) {
  try {
    const challenges = await service.getRootChallenges();

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

    const challenge = await service.getChallengeById(id);

    if (!challenge) {
      throw createError(404, "challenge not found");
    }

    res.status(200);
    res.json(challenge);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getRootChallenges,
  getChallengeById
};
