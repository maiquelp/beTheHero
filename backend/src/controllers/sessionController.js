const connection = require('../database/connection.js');

module.exports = {

    async create(req, res) {
        const { id } = req.body;

        const ong = await connection('ong').where('id', id).select('name').first();

        if (!ong) {
            return res.status(400).json({ error: 'Ong not found.'})
        }
        
        return res.json(ong)
    }
}    