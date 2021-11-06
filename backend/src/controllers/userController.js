const connection = require('../database/connection');

const generateId = require('../utils/generateId');
const verifyMail = require('../utils/verifyMail');
const bcrypt = require('bcryptjs');

module.exports = {

    async index(req, res) {
        const userSelect = await connection('user').select('id', 'name', 'email');
        
        return res.json(userSelect)
    },

    async create(req, res) {
        const {name, email} = req.body;

        const password = await bcrypt.hash(req.body.password, 10);

        const id = generateId();

        const hasEmail = await connection('user').where('email', email).select('email').first();
        
        try {
            if (hasEmail) {
                return res.status(400).send('email already exists')

            }
            await connection('user').insert({
                id, name, email, password
            });

            verifyMail(id, email);
                
            return res.status(204).send();

        } catch (err) {
            return res.status(400).send('Registration failed')
        }
    }
}