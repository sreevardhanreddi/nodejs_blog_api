"use strict";
module.exports = (sequelize, DataTypes) => {
  const tags = sequelize.define(
    "tags",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tag: DataTypes.STRING,
      slug: DataTypes.STRING,
    },
    { underscored: true, tableName: "tags", timestamps: false }
  );
  tags.associate = function (models) {
    // associations can be defined here
    tags.belongsToMany(models.post, {
      through: "post_tags",
      timestamps: false,
    });
  };
  return tags;
};
