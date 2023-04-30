const express = require("express");
const router = express.Router();
const joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const userSchema = joi.object({
  name: joi.string().min(4).required(),
  email: joi.string().email().min(6).required(),
  password: joi.string().min(5).max(12).required(),
});

router.post("/", async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send("Wrong body");

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist");

    user = new User(req.body);
    let passwordSalt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(req.body.password, passwordSalt);
    user.biz = false;
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
