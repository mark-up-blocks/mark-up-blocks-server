const express = require("express");
const createError = require("http-errors");
const mongoose = require("mongoose");

const Challenge = require("../models/Challenge");

const router = express.Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw createError(400, "invalid challenge id");
    }

    const challenge = await Challenge.findById(id)
      .populate({
        path: "tagBlocks.block",
        model: "TagBlock"
      })
      .populate({
        path: "boilerplate answer",
        model: "BlockTree"
      })
      .lean();

    if (!challenge) {
      throw createError(404, "challenge not found");
    }

    res.status(200);
    res.json(challenge);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
