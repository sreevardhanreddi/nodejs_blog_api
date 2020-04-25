const User = require("./user");
const Profile = require("./profile");
const Post = require("./post");
const Tags = require("./tags");

// 1 to 1 with profile
User.hasOne(Profile, {
  foreignKey: "profile",
  as: "profile",
  onDelete: "CASCADE",
  onUpdate: "RESTRICT",
});
Profile.belongsTo(User);

// 1 to many with post
User.hasMany(Post, {
  foreignKey: "created_by",
  as: "posts",
  onDelete: "SET NULL",
  onUpdate: "RESTRICT",
});
Post.belongsTo(User);

// many to many association
Post.belongsToMany(Tags, {
  through: "post_tags",
  timestamps: false,
});
Tags.belongsToMany(Post, {
  through: "post_tags",
  timestamps: false,
});

module.exports = {
  User,
  Profile,
  Post,
  Tags,
};
