const connection = require('../database/connection');
const bcrypt = require('bcryptjs');

module.exports = {
    async update(req, res){
        const {token, id} = req.query;

        const now = new Date();
        now.setHours(now.getHours() - 3);

        try {
            const user = await connection('user').where({id: id, token: token}).
                andWhere('tokenExpiration', '>', now).
                select('id', 'tokenExpiration').first();

            if (!user) return res.status(400).json({ error: 'Verification failed, try reset password again'})

            const password = await bcrypt.hash(req.body.password, 10);
    
            await connection('user').where('id', id).update('password', password);

            return res.status(204).send();
            
        } catch (err) {
            res.status(400).send('Connection failed, try again')
        }
    }
}