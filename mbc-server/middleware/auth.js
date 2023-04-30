const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send("Access denied. invalid token");

    const payload = jwt.verify(token, process.env.JWTKEY); // payload if i have token decode and put in payload

    req.payload = payload;

    next();
  } catch (error) {
    res.status(400).send(error);
  }
};
