const { Sequelize } = require("sequelize");
const sequelize = require("./../database");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING(30),
      allowNull: false,
      unique: true,
    },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    last_activity: { type: Sequelize.DATE },
    is_admin: { type: Sequelize.BOOLEAN, defaultValue: false },
    is_owner: { type: Sequelize.BOOLEAN, defaultValue: false },
    is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
  }
  // { underscored: true, tableName: "user" }
);

module.exports = User;
