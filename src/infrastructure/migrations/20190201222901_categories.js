
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('categories', (table) => {
      table.uuid('id').primary();
      table.string('categoryName', 20);
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('categories'),
  ]);
};
