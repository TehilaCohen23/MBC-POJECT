const express = require("express");
const Card = require("../models/card");
const router = express.Router();
const auth = require("../middleware/auth");
const joi = require("joi");
const _ = require("lodash");

let cardSchema = joi.object({
  name: joi.string().min(4).max(30).required(),
  description: joi.string().min(5).max(120),
  address: joi.string().min(6).max(20),
  phone: joi.string().min(9).max(15),
  image: joi.string().min(2).required(),
});

//add new card (with userId)
router.post("/", auth, async (req, res) => {
  try {
    const { error } = cardSchema.validate(req.body);
    if (error) return res.status(400).send("Wrong body");

    let newCard = new Card(req.body);

    newCard.userId = req.payload.id;

    let cardid = _.random(1000);
    newCard.cardId = cardid;

    newCard.save();
    res.status(201).send(newCard);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all the cards
router.get("/", auth, async (req, res) => {
  try {
    let cards = await Card.find();

    res.status(200).send(cards);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get cards by userId.
router.get("/:userId", auth, async (req, res) => {
  try {
    if (!req.payload.biz) return res.status(400).send("No valid");

    let result = await Card.find({ userId: req.params.userId });

    res.status(200).send(result);
  } catch ({ error }) {
    if (!error) return res.status(400).send("error in get card by userId");
    return res.status(400).send(error);
  }
});

//update card by cardId
router.put("/:id", auth, async (req, res) => {
  try {
    if (!req.payload.biz) return res.status(403).send("No valid");

    let cardToUp = await Card.findById(req.params.id);
    console.log(cardToUp);
    if (req.payload.id !== cardToUp.userId)
      return res.status(400).send("Impossible action");

    const { error } = cardSchema.validate(req.body);
    console.log(req.body);
    if (error) return res.status(400).send("Wrong body");

    //let newCard = await req.body; req.params.id
    await Card.findByIdAndUpdate(cardToUp, req.body, {
      new: true,
    });

    res.status(200).send("The card details have been update");
  } catch (error) {
    res.status(400).send("No such cards");
  }
});

//delete card by cardId
router.delete("/:id", auth, async (req, res) => {
  try {
    if (!req.payload.biz) return res.status(403).send("No valid");
    let cardToRemove = await Card.findById(req.params.id);

    if (req.payload.id !== cardToRemove.userId)
      return res.status(400).send("Impossible action");

    if (!cardToRemove) return res.status(404).send("No such card");

    await Card.findByIdAndRemove(cardToRemove);
    res.status(200).send("The card has been removed");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
