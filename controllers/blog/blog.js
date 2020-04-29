const { validationResult } = require("express-validator");
const db = require("./../../database/models/");
const Post = db.post;
const User = db.user;
const Tags = db.tags;

exports.createBlogPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    return res.json({ error: true, errors });
  }
  try {
    const post = await Post.findOne({ where: { title: req.body.title } });
    if (post) {
      res.status(400);
      return res.json({
        error: true,
        message: "Post with this title already exists",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }

  try {
    const postObj = {
      title: req.body.title,
      content: req.body.content,
      created_by: req.user.id,
    };
    const data = await Post.create(postObj);
    res.status(201);
    res.json({ message: "created post" });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

exports.getBlogs = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email"],
        },
      ],
    });
    res.status(200);
    res.json({
      posts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({
      where: { id: postId },
      include: [
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    if (post) {
      res.status(200);
      res.json({
        post,
      });
    } else {
      return res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.updateBlogById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({
      where: { id: postId },
    });
    if (!post) {
      return res.status(404).end();
    } else {
      if (req.user.id != post.created_by) {
        return res.status(403).end();
      }
      const postObj = {
        title: req.body.title,
        content: req.body.content,
      };
      await post.update(postObj);
      res.status(200);
      res.json({
        post,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

exports.deletePostById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findOne({ where: { id: postId } });
    if (post.created_by != req.user.id) {
      return res.status(403).end();
    }
    await post.destroy();
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
