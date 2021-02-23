const express = require("express");
const passport = require("passport");

const {
  garbageList,
  treasureList,
} = require("../controllers/thingControllers");
const router = express.Router();

router.get("/garbage", garbageList);
router.get(
  "/treasure",
  passport.authenticate("jwt", { session: false }),
  treasureList
);

module.exports = router;
