const express = require("express");

const controller = require("./controller/challenges");

const router = express.Router();

router.get("/", controller.getChallenges);
router.get("/:id", controller.getChallengeById);

module.exports = router;
