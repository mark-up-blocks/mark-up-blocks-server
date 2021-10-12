const mongoose = require("mongoose");

const { tagBlockRef } = require("./TagBlock");

const blockTreeRef = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "BlockTree",
  required: true
};

const blockTreeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isSubChallenge: {
    type: Boolean,
    default: false
  },
  block: tagBlockRef,
  childTrees: {
    type: [blockTreeRef],
    default: []
  }
});

function populateNested(next) {
  this.populate({ path: "block", model: "TagBlock" })
    .populate("childTrees");
  next();
}

blockTreeSchema.pre("find", populateNested);
blockTreeSchema.pre("findOne", populateNested);

module.exports = mongoose.model("BlockTree", blockTreeSchema);
module.exports.blockTreeRef = blockTreeRef;
