const stageInfoOption = {
  path: "tagBlocks._id",
  model: "Challenge",
  select: "tagBlocks title",
  transform(doc) {
    if (!doc) {
      return null;
    }

    const childChallenges = [];

    doc.tagBlocks.forEach(async (block) => {
      if (block.isChallenge) {
        childChallenges.push(block._id);
      }
    });

    return {
      _id: doc._id,
      title: doc.title,
      childChallenges
    };
  }
};

module.exports = { stageInfoOption };
