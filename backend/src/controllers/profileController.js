const connection = require('../database/connection');

module.exports = {

    async index(req, res) {
        const ong_id = req.userId;

        const incident = await connection('incident').where('ong_id', ong_id).select('*');
        
        return res.json(incident)
    }
}    