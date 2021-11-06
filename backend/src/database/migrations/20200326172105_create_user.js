exports.up = function(knex) {
    return knex.schema.createTable('user', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('token');
        table.string('tokenExpiration');
        table.boolean('verified').defaultTo(0)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('user')
};
