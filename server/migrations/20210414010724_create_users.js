exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").unique();
    table.string("phone");
    table.string("address");
    table.string("avatar");
    table.string("github_id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
