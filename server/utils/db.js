const path = require("path");

const dbPath = path.resolve(__dirname, "../db/database.sqlite");

const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

knex.schema
  .hasTable("todos")
  .then((exists) => {
    if (!exists) {
      return knex.schema
        .createTable("todos", (table) => {
          table.increments("todo_id").primary();
          table.string("title");
          table.string("description").nullable();
          table.boolean("completed").defaultTo(false);
        })
        .then(() => {
          console.log("Table 'Todos' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    console.log("Database setup successful.");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

module.exports = knex;
