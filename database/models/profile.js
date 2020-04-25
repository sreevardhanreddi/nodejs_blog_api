const Sequelize = require("sequelize");
const sequelize = require("./../database");

const Profile = sequelize.define(
  "profile",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    profile_description: {
      type: Sequelize.STRING,
    },
    profile_pic: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  { underscored: true, tableName: "profile" }
);

module.exports = Profile;
