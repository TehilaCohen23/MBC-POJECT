const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const joi = require("joi");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let loginSchema = joi.object({
  email: joi.string().email().min(6).required(),
  password: joi.string().min(5).required(),
});

router.post("/", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send("Wrong body");

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send(error);

    let userPassword = await bcrypt.compare(req.body.password, user.password);
    if (!userPassword) return res.status(400).send("Wrong email or password");

    const token = jwt.sign({ id: user._id, biz: user.biz }, process.env.JWTKEY);

    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
