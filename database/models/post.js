"use strict";
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "post",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      content: {
        type: DataTypes.TEXT,
        required: true,
      },
      cover_pic: { type: DataTypes.STRING },
    },
    { underscored: true, tableName: "posts" }
  );
  post.associate = function (models) {
    // associations can be defined here

    post.belongsTo(models.user, {
      foreignKey: "created_by",
      as: "user",
      onDelete: "SET NULL",
      onUpdate: "RESTRICT",
    });

    // many to many association
    post.belongsToMany(models.tags, {
      through: "post_tags",
      timestamps: false,
    });
  };
  return post;
};
