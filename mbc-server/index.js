const express = require("express");
const mongoose = require("mongoose");
const me = require("./routes/me");
const register = require("./routes/register");
const business = require("./routes/registrationAsBusinesses");
const login = require("./routes/login");
const profile = require("./routes/profile");
const cards = require("./routes/cards");
const cardsOne = require("./routes/cardsOne");
const cors = require("cors");

require("dotenv").config();
const app = express();

const port = process.env.PORT || 8001;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//routers to `/api/{...}`
app.use("/api/me", me);
app.use("/api/register", register);
app.use("/api/business", business);
app.use("/api/login", login);
app.use("/api/profile", profile);
app.use("/api/cards", cards);
app.use("/api/cardsOne", cardsOne);

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Mongo connected"))
  .catch(() => console.log("cannot connect to Mongo"));

app.listen(port, () => console.log(`Server started on port ${port}`));
