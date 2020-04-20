// const connection = require('../database/connection');

// module.exports = {

//     async create(req, res) {
//         const { id } = req.body;

//         const ong = await connection('ong').where('id', id).select('name').first();

//         if (!ong) {
//             return res.status(400).json({ error: 'Ong not found.'})
//         }
        
//         return res.json(ong)
//     }
// }    
const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken')

module.exports = {

    async create(req, res) {
        const { email, password } = req.body;

        const user = await connection('ong').where('email', email).select('password', 'id').first();

        try {
            if ((!user) || (!await bcrypt.compare(password, user.password))) {
                return res.status(400).json({ error: 'Verify user and password'})
            }
        
            return res.json({user, token: generateToken({id: user.id})})

        } catch (err) {
            return res.status(400).json({ error: 'connection failed'})
        }
    }
}    