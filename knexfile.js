// Update with your config settings.
const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "pmwrifas",
      user: "nkinformatica",
      password: "natan210290",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${path.resolve(__dirname, "src", "migrations")}`,
    },
  },
};
