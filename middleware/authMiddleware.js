const jwt = require("jsonwebtoken");
const db = require("./../database/models");
const User = db.user;

const secret = process.env.SERVER_SECRET || "serversecret";

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token =
      authHeader != null || authHeader != undefined
        ? authHeader.split(" ")[1]
        : null;

    if (token == null) {
      return res.status(401).end();
    }

    const data = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: data.email } });
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).end();
  }
};

module.exports = {
  authenticateToken,
};
