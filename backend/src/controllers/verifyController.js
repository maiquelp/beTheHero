const connection = require('../database/connection');

module.exports = {
    async update(req, res){
        const {token, id} = req.query;

        const now = new Date();
        now.setHours(now.getHours() - 3);

        try {
            const user = await connection('ong').where({id: id, token: token}).
                andWhere('tokenExpiration', '>', now).
                select('id', 'tokenExpiration').first();

            if (!user) return res.status(400).send('Verification failed, try to login and require a new verification mail')

            await connection('ong').where('id', id).update('verified', 1);

            return res.status(204).send();
            
        } catch (err) {
            res.status(400).send('Connection failed, try again')
        }
    }
}