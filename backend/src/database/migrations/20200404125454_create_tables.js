
exports.up = function (knex) {
  return knex.schema.createTable('tables', (table) => {
    table.increments()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.float('value', 2).notNullable()
    table.string('type').notNullable()
    table.date('date').notNullable()

    table.string('userId').references('id').inTable('users')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('tables')
};
