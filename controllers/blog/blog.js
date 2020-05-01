const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const db = require("./../../database/models/");
const Post = db.post;
const User = db.user;
const Tags = db.tags;

exports.createBlogPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    return res.json({ error: true, ...errors });
  }

  try {
    const { title } = req.body;
    const post = await Post.findOne({ where: { title: title } });
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
      cover_pic: req.file ? req.file.path : null,
    };
    const post = await Post.create(postObj);
    const { tags } = req.body;
    if (tags) {
      const tagsList = tags.split(",").map((tag) => {
        return { tag: tag.trim(), slug: tag.trim() };
      });
      if (tagsList) {
        const tagObjs = await Promise.all(
          tagsList.map(
            // find or create returns two values, instance(:db) and created (:bool)
            async (tag) => {
              const [instance, created] = await Tags.findOrCreate({
                where: { ...tag },
              });
              return instance;
            }
          )
        );

        // assign multiple tags to post
        await post.setTags(tagObjs);
      }
    }

    res.status(201);
    res.json({ message: "created post", post });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

exports.getBlogs = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    return res.json({ error: true, ...errors });
  }
  try {
    let page = req.query.page || 1;
    if (page <= 0) {
      page = 1;
    }
    let perPage = req.query.per_page || 10;
    let offset = (page - 1) * perPage;
    let title = req.query.title || "";

    const posts = await Post.findAll({
      limit: perPage,
      offset: offset,
      order: [["id", "ASC"]],
      where: {
        title: {
          [Op.iLike]: `%${title}%`,
        },
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "email"],
        },
        {
          model: Tags,
          as: "tags",
          through: { attributes: [] },
        },
      ],
    });
    const postsCount = await Post.count();
    res.status(200);
    res.json({
      count: postsCount,
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
        {
          model: Tags,
          as: "tags",
          through: { attributes: [] },
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
    let post = await Post.findOne({
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
      post = await post.update(postObj);
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
    if (!post) {
      return res.status(404).end();
    }
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
