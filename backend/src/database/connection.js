const knex = require('knex');
const configuration = require('../../knexfile.js');

const env = process.env.NODE_ENV; //recebe o ambiente de execução.

const connection = knex(configuration[env]);

module.exports = connection;
