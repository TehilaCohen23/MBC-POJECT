const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Card = require("../models/card");
const _ = require("lodash");

//get card by cardId
router.get("/:id", auth, async (req, res) => {
  try {
    let result = await Card.findById(req.params.id);
    if (!result) return res.status(404).send("No found card for this id");

    res
      .status(200)
      .send(
        _.pick(result, [
          "name",
          "description",
          "address",
          "phone",
          "image",
          "userId",
        ])
      );
  } catch ({ error }) {
    if (!error) return res.status(400).send("No such cards");
    return res.status(400).send(error);
  }
});

module.exports = router;
