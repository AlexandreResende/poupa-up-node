
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expenses', (table) => {
      table.uuid('id').primary();
      table.string('month', 2);
      table.string('year', 4);
      table.string('category').references('categories.name');
      table.text('description');
      table.decimal('value', 2);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('last_updated_at');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expenses'),
  ]);
};
