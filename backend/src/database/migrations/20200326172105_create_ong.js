exports.up = function(knex) {
    return knex.schema.createTable('ong', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('passwordResetToken');
        table.string('passwordResetExpiration')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ong')
};
