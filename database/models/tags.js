const Sequelize = require("sequelize");
const sequelize = require("./../database");

const Tags = sequelize.define(
  "tags",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    tag: Sequelize.STRING,
    slug: Sequelize.STRING,
  },
  { underscored: true, tableName: "tags", timestamps: false }
);

module.exports = Tags;
