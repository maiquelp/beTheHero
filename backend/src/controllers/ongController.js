const connection = require('../database/connection');
const generateId = require('../utils/generateId');
const generateToken = require('../utils/generateToken');

const bcrypt = require('bcryptjs');

module.exports = {

    async index(req, res) {
        const ongSelect = await connection('ong').select('name', 'email', 'whatsapp', 'city', 'uf');
        
        return res.json(ongSelect)
    },

    async create(req, res) {
        const {name, email, whatsapp, city, uf} = req.body;

        const password = await bcrypt.hash(req.body.password, 10);

        const id = generateId();

        const hasEmail = await connection('ong').where('email', email).select('email').first();
        
        try {
            if (hasEmail) {
                return res.status(400).send({ error: 'email already exists'})

            }
            await connection('ong').insert({
                id, name, email, password, whatsapp, city, uf
            });
    
            return res.json({id, token: generateToken({id})})

        } catch (err) {
            return res.status(400).send({ error: 'Registration failed'})
        }
    }
}