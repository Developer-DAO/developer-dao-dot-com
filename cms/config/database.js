const path = require("path");

module.exports = ({ env }) =>
  process.env.NODE_ENV === "development"
    ? {
        connection: {
          client: "sqlite",
          connection: {
            filename: path.join(
              __dirname,
              "..",
              env("DATABASE_FILENAME", ".tmp/data.db")
            ),
          },
          useNullAsDefault: true,
        },
      }
    : {
        connection: {
          client: "postgres",
          connection: {
            host: env("DATABASE_HOST"),
            port: env.int("DATABASE_PORT"),
            database: env("DATABASE_NAME"),
            user: env("DATABASE_USERNAME"),
            password: env("DATABASE_PASSWORD"),
            pool: 10,
            ssl: {
              rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
            },
          },
          debug: false,
        },
      };
