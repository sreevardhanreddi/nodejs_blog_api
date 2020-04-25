const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/auth/auth");

router.post(
  "/sign-up/",
  [
    body("password").trim().isLength({ min: 4 }),
    body("email").trim().isEmail(),
  ],
  authController.signUp
);

router.post(
  "/login/",
  [
    body("password").trim().isLength({ min: 4 }),
    body("email").trim().isEmail(),
  ],
  authController.login
);

module.exports = router;
