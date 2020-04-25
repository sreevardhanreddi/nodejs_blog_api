module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: "postgres",
    password: "root",
    database: "database_test",
    host: "127.0.0.1",
    port: 5433,
    dialect: "postgres",
    operatorsAliases: false,
  },
  production: {
    username: "postgres",
    password: "root",
    database: "database_production",
    host: "127.0.0.1",
    port: 5433,
    dialect: "postgres",
    operatorsAliases: false,
  },
};
