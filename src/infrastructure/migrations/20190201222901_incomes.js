
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('incomes', (table) => {
      table.increments('id').primary();
      table.string('month', 2);
      table.string('year', 4);
      table.string('category').references('categories.name');
      table.text('description');
      table.decimal('value', 10);
      table.datetime('created_at');
      table.datetime('updated_at');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('incomes'),
  ]);
};
