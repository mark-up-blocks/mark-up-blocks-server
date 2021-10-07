const RootChallenge = require("../../models/RootChallenge");
const Challenge = require("../../models/Challenge");

const { stageInfoOption } = require("../../config/populateOptions");

async function populateChildChallenges(rootChallenge) {
  const populated = await Challenge.populate(
    rootChallenge,
    { ...stageInfoOption, path: "childChallenges" }
  );
  const childChallenges = await Promise.all(
    populated.childChallenges.map((child) => {
      return child.childChallenges.length ? populateChildChallenges(child) : child;
    })
  );

  return { ...rootChallenge, childChallenges };
}

async function getRootChallenges() {
  const rootChallenges = await RootChallenge
    .find()
    .populate({ ...stageInfoOption, path: "stage" })
    .lean();

  return Promise.all(rootChallenges.map(
    async (challenge) => ({ ...challenge, stage: await populateChildChallenges(challenge.stage) })
  ));
}

function getChallengeById(id) {
  return Challenge.findById(id)
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
}

module.exports = { getRootChallenges, getChallengeById };
