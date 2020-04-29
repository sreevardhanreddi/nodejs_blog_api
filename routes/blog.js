const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const isAuth = require("./../middleware/authMiddleware");

const blogController = require("../controllers/blog/blog");

router.get("/list/", blogController.getBlogs);

router.post(
  "/create/",
  isAuth.authenticateToken,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  blogController.createBlogPost
);

router.get("/post/:postId/", blogController.getBlogById);

router.put(
  "/post/:postId/",
  isAuth.authenticateToken,
  blogController.updateBlogById
);

router.delete(
  "/post/:postId/",
  isAuth.authenticateToken,
  blogController.deletePostById
);

module.exports = router;
