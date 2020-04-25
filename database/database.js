const { Sequelize } = require("sequelize");
const dbConfig = require("./config/config");

const sequelize = new Sequelize(
  process.env[dbConfig.development.use_env_variable],
  dbConfig.development.pool
);

module.exports = sequelize;
