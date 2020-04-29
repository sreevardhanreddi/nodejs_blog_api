const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/auth/auth");

/**
 * @swagger
 *'/auth/sign-up/':
 *  post:
 *    tags:
 *    - "create user"
 *    summary: "create a new user"
 *    description: ""
 *    operationId: ""
 *    consumes:
 *    - "application/x-www-form-urlencoded"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - name: "email"
 *      in: "formData"
 *      type: string
 *      description: "email of the user"
 *      required: true
 *    - name: "password"
 *      in: "formData"
 *      type: string
 *      description: "password for the user"
 *      required: true
 *    responses:
 *      "422":
 *        description: "Invalid input"
 *      "201":
 *        description: "user created"
 */
router.post(
  "/sign-up/",
  [
    body("password").trim().isLength({ min: 4 }),
    body("email").trim().isEmail(),
  ],
  authController.signUp
);

/**
 * @swagger
 *'/auth/login/':
 *  post:
 *    tags:
 *    - "login user"
 *    summary: "login user and return a json web token"
 *    description: ""
 *    operationId: ""
 *    consumes:
 *    - "application/x-www-form-urlencoded"
 *    produces:
 *    - "application/json"
 *    parameters:
 *    - name: "email"
 *      in: "formData"
 *      type: string
 *      description: "email of the user"
 *      required: true
 *    - name: "password"
 *      in: "formData"
 *      type: string
 *      description: "password for the user"
 *      required: true
 *    responses:
 *      "422":
 *        description: "Invalid input"
 *      "400":
 *        description: "invalid username and password"
 *      "200":
 *        description: "user logged in"
 */
router.post(
  "/login/",
  [
    body("password").trim().isLength({ min: 4 }),
    body("email").trim().isEmail(),
  ],
  authController.login
);

module.exports = router;
