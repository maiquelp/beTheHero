const connection = require('../database/connection');
const generateId = require('../utils/generateId');

module.exports = {

    async index(req, res) {
        const ongSelect = await connection('ong').select('*');
        
        return res.json(ongSelect)
    },

    async create(req, res) {
        const {name, email, whatsapp, city, uf } = req.body;
    
        const id = generateId();

        await connection('ong').insert({
            id, name, email, whatsapp, city, uf
        });
    
        return res.json({ id })
    }
}