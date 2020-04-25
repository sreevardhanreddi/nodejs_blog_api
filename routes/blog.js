const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const isAuth = require("./../middleware/authMiddleware");

const blogController = require("../controllers/blog/blog");

router.get("/list/", blogController.getBlogs);

router.post(
  "/create/",
  isAuth.authenticateToken,
  [body("title").trim().isLength({ min: 5 }), body("email").trim().isEmail()],
  blogController.createBlogPost
);

module.exports = router;
