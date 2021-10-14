const TagBlock = require("../models/TagBlock");
const BlockTree = require("../models/BlockTree");
const Challenge = require("../models/Challenge");

const child1 = {
  title: "child1",
  isSubChallenge: false,
  block: {
    tagName: "span",
    isContainer: false,
    property: {
      text: "child1"
    }
  }
};

const child2 = {
  title: "child2",
  isSubChallenge: false,
  block: {
    tagName: "span",
    isContainer: false,
    property: {
      text: "child2"
    }
  }
};

const parent = {
  title: "parent",
  isSubChallenge: true,
  block: {
    tagName: "div",
    isContainer: true,
    property: {
      style: {
        display: "flex",
        justifyContent: "center"
      }
    }
  }
};

async function insertMockData() {
  const [child1Tag, child2Tag, parentTag] = await Promise.all(
    [child1, child2, parent].map(({ block }) => TagBlock.create(block))
  );

  const child1Tree = await BlockTree.create({ ...child1, block: child1Tag._id });
  const child2Tree = await BlockTree.create({ ...child2, block: child2Tag._id });
  const parentTree = await BlockTree.create({
    ...parent,
    block: parentTag._id,
    childTrees: [child1Tree._id, child2Tree._id]
  });

  await Challenge.create({
    name: "test",
    elementTree: parentTree._id
  });
}

module.exports = {
  child1, child2, parent, insertMockData
};
