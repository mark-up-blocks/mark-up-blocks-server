const express = require("express");

const controller = require("./controller/challenges");

const router = express.Router();

router.get("/", controller.getRootChallengeList);
router.get("/:id", controller.getChallengeById);

module.exports = router;
