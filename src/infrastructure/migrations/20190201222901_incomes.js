
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('incomes', (table) => {
      table.uuid('id').primary();
      table.string('month', 2);
      table.string('year', 4);
      table.uuid('category_id').references('categories.id');
      table.text('description');
      table.decimal('value', 2);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('incomes'),
  ]);
};
