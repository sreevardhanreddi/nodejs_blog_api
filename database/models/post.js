const Sequelize = require("sequelize");
const sequelize = require("./../database");

const Post = sequelize.define(
  "post",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    content: {
      type: Sequelize.TEXT,
      required: true,
    },
    cover_pic: { type: Sequelize.STRING },
  },
  { underscored: true, tableName: "posts" }
);

Post.associate = function (models) {
  // associations can be defined here
  Post.belongsTo(models.user);

  // many to many association
  Post.belongsToMany(models.tags, {
    through: "post_tags",
    timestamps: false,
  });
};

module.exports = Post;
