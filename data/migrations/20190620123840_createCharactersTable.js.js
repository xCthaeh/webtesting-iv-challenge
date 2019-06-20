exports.up = function(knex, Promise) {
  return knex.schema.createTable("characters", tbl => {
    tbl.increments();
    tbl
      .string("name", 128)
      .unique()
      .notNullable();
    tbl.string("series", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("characters");
};
