const mongoose = require("mongoose");

const { validateTagBlockProperty } = require("../helpers/validate");

const tagBlockRef = {
  type: mongoose.Schema.Types.ObjectId,
  ref: "TagBlock",
  required: true
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
  property: {
    type: {},
    validate: {
      validator: validateTagBlockProperty,
      message: "TagBlock's property field should be an object of string"
    }
  }
});

module.exports = mongoose.model("TagBlock", tagBlockSchema);
module.exports.tagBlockRef = tagBlockRef;
