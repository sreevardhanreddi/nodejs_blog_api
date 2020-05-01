require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require("./../../database/models");
const User = db.user;

const secret = process.env.SERVER_SECRET || "serversecret";

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    return res.json({ error: true, errors });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      res.status(400);
      return res.json({ message: "Email is taken" });
    }
    userData = {
      username: email,
      email: email,
      password: await bcrypt.hash(password, 12),
    };
    const data = await User.create(userData);
    res.status(201);
    res.json({ message: "created user", data });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    return res.json({ error: true, ...errors });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ email: user.email, userId: user.id }, secret);
        // const token = jwt.sign({ email: user.email, userId: user.id }, secret, {
        //   expiresIn: "1h",
        // });
        res.status(200);
        return res.json({ token });
      } else {
        res.status(400);
        return res.json({ message: "Invalid username or password" });
      }
    }
    res.json(400);
    return res.json({ message: "Invalid username or password" });
  } catch (err) {
    console.log(err);
    res.json(500).end();
  }
};
