const express = require("express");
const { body, query } = require("express-validator");
const { blogCoverImageValidator } = require("./../utils/fileUploadConfig");

const router = express.Router();

const isAuth = require("./../middleware/authMiddleware");

const blogController = require("../controllers/blog/blog");

/**
 * @swagger
 * /blogs/list/:
 *   get:
 *     tags:
 *     - "get all posts"
 *     description: "returns all blogs with pagination *page and perpage* "
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "page"
 *       in: "query"
 *       description: "page number"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     - name: "per_page"
 *       in: "query"
 *       description: "no of posts per page"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     - name: "title"
 *       in: "query"
 *       description: "title of the post"
 *       required: false
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *       "400":
 *         description: "Invalid ID supplied"
 *       "404":
 *         description: "post not found"
 */
router.get(
  "/list/",
  [
    query("page").trim().isNumeric(),
    query("per_page").trim().isNumeric(),
    query("title").trim().optional(),
  ],
  blogController.getBlogs
);

/**
 * @swagger
 *'/blogs/create/':
 *  post:
 *     tags:
 *     - "create post"
 *     summary: "creates post"
 *     description: "creates a post"
 *     consumes:
 *     - "multipart/form-data"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "Authorization"
 *       in: "header"
 *       required: false
 *       type: "string"
 *     - name: "title"
 *       in: "formData"
 *       description: "title of the post"
 *       required: true
 *       type: "string"
 *     - name: "content"
 *       in: "formData"
 *       description: "content of the post"
 *       required: true
 *       type: "string"
 *     - name: "tags"
 *       in: "formData"
 *       description: "tags seperated by commas"
 *       required: false
 *       type: "string"
 *     - name: "cover_image"
 *       in: "formData"
 *       description: "cover pic for the post"
 *       required: false
 *       type: "file"
 *     responses:
 *       "201":
 *         description: "created"
 *       "401":
 *         description: "Un authenticated"
 *       "400":
 *         description: "in valid data"
 *       "422":
 *         description: "in valid data"
 *     security:
 *     - api_key: []
 */
router.post(
  "/create/",
  isAuth.authenticateToken,
  blogCoverImageValidator,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  blogController.createBlogPost
);

/**
 * @swagger
 * /blogs/post/{postId}:
 *   get:
 *     tags:
 *     - "get post by id"
 *     summary: "find post by id"
 *     description: "Returns a single post"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "postId"
 *       in: "path"
 *       description: "ID of post to return"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     responses:
 *       "200":
 *         description: "successful operation"
 *       "400":
 *         description: "Invalid ID supplied"
 *       "404":
 *         description: "post not found"
 */
router.get("/post/:postId/", blogController.getBlogById);

/**
 * @swagger
 *'/blogs/post/{postId}/':
 *  put:
 *     tags:
 *     - "update post"
 *     summary: "update post"
 *     description: "update a post by id"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "Authorization"
 *       in: "header"
 *       required: false
 *       type: "string"
 *     - name: "postId"
 *       in: "path"
 *       description: "Post id to update"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     - name: "title"
 *       in: "formData"
 *       description: "title of the post"
 *       required: False
 *       type: "string"
 *     - name: "content"
 *       in: "formData"
 *       description: "content of the post"
 *       required: False
 *       type: "string"
 *     responses:
 *       "200":
 *         description: "updated"
 *       "401":
 *         description: "Un authenticated"
 *       "400":
 *         description: "in valid data"
 *       "404":
 *         description: "blog not found"
 *       "403":
 *         description: "un authorized"
 *     security:
 *     - api_key: []
 */
router.put(
  "/post/:postId/",
  isAuth.authenticateToken,
  blogController.updateBlogById
);

/**
 * @swagger
 *'/blogs/post/{postId}/':
 *  delete:
 *     tags:
 *     - "delete post"
 *     summary: "Deletes post"
 *     description: "delete a post with given id"
 *     operationId: "delete post"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "Authorization"
 *       in: "header"
 *       required: false
 *       type: "string"
 *     - name: "postId"
 *       in: "path"
 *       description: "Post id to delete"
 *       required: true
 *       type: "integer"
 *       format: "int64"
 *     responses:
 *       "204":
 *         description: "deleted"
 *       "401":
 *         description: "Un authenticated"
 *       "403":
 *         description: "Un authorized"
 *     security:
 *     - api_key: []
 */
router.delete(
  "/post/:postId/",
  isAuth.authenticateToken,
  blogController.deletePostById
);

module.exports = router;
