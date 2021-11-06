const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const verifyMail = require('../utils/verifyMail');

module.exports = {

    async create(req, res) {
        const { email, password } = req.body;

        const user = await connection('user').where('email', email).select('password', 'name', 'id', 'verified').first();

        try {
            if ((!user) || (!await bcrypt.compare(password, user.password))) {
                return res.status(401).send('Verify user and password')
            }
            if (user.verified === 0) {
                verifyMail(user.id, email);
                return res.status(403).send('User is not verified, check your email')
            }
            return res.json({name: user.name, token: generateToken({id: user.id})})

        } catch (err) {
            return res.status(400).send('connection failed')
        }
    }
}    