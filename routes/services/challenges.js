const Challenge = require("../../models/Challenge");

async function getChallenges() {
  const challenges = await Challenge.find().lean();

  return challenges;
}

function getChallengeById(id) {
  return Challenge.findById(id)
    .populate({
      path: "elementTree",
      model: "BlockTree"
    })
    .lean();
}

module.exports = { getChallenges, getChallengeById };
