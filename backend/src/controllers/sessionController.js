const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

module.exports = {

    async create(req, res) {
        const { email, password } = req.body;

        const user = await connection('ong').where('email', email).select('password', 'name', 'id').first();

        const {name, id} = user;

        try {
            if ((!user) || (!await bcrypt.compare(password, user.password))) {
                return res.status(400).json({ error: 'Verify user and password'})
            }
        
            return res.json({name, id, token: generateToken({id: user.id})})

        } catch (err) {
            return res.status(400).json({ error: 'connection failed'})
        }
    }
}    