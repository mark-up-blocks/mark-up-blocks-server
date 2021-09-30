const mongoose = require("mongoose");

const tagBlockRef = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "TagBlock"
};

const tagBlockSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: true
  },
  isContainer: {
    type: Boolean,
    default: false
  },
  property: {}
});

module.exports = mongoose.model("TagBlock", tagBlockSchema);
module.exports.tagBlockRef = tagBlockRef;
