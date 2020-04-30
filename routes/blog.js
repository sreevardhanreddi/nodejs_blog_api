const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const multer = require("multer");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "media/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, true);
    return cb(Error("Only .png, .jpg and .jpeg format allowed!"));
  }
};

const fileSizeLimit = {
  fileSize: 1 * 1024 * 1024,
};

const multerConfig = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: fileSizeLimit,
});

const isAuth = require("./../middleware/authMiddleware");

const blogController = require("../controllers/blog/blog");

router.get("/list/", blogController.getBlogs);

router.post(
  "/create/",
  isAuth.authenticateToken,
  multerConfig.single("cover_image"),
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
