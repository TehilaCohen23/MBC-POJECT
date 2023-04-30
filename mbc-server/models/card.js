const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: { type: String, minlength: 4, require: true },
  description: { type: String, minlength: 5, require: true },
  address: { type: String, minlength: 6 },
  phone: { type: String, minlength: 9 },
  image: { type: String, minlength: 2, require: true },
  userId: { type: String },
  cardId: { type: String },
});

const Card = mongoose.model("cards", cardSchema);
module.exports = Card;
