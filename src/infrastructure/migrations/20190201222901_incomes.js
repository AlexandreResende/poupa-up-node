
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('incomes', (table) => {
      table.string('id').primary();
      table.string('month', 2);
      table.string('year', 4);
      table.string('category', 100);
      table.text('description');
      table.decimal('value', 2)
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('incomes'),
  ]);
};
