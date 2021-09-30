const mongoose = require("mongoose");

const { tagBlockRef } = require("./TagBlock");

const blockTreeRef = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "BlockTree"
};

const blockTreeSchema = new mongoose.Schema({
  block: tagBlockRef,
  children: [blockTreeRef]
});

function populateNested(next) {
  this.populate({ path: "block", model: "TagBlock" })
    .populate("children");
  next();
}

blockTreeSchema.pre("find", populateNested);
blockTreeSchema.pre("findOne", populateNested);

module.exports = mongoose.model("BlockTree", blockTreeSchema);
module.exports.blockTreeRef = blockTreeRef;