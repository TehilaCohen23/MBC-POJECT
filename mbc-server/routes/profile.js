const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const _ = require("lodash");

router.get("/", auth, async (req, res) => {
  try {
    let user = await User.findById(req.payload.id);
    if (!user) return res.status(404).send("No such user");
    if (req.payload.biz)
      return res
        .status(200)
        .send(_.pick(user, ["_id", "name", "businessName", "email", "biz"]));
    res.status(200).send(_.pick(user, ["_id", "name", "email", "biz"]));
  } catch (error) {
    res.status(401).send("No valid token");
  }
});

module.exports = router;
