const connection = require('../database/connection');

module.exports = {
    async update(req, res){
        const {token, id} = req.query;

        const now = new Date();
        now.setHours(now.getHours() - 3);

        try {
            const user = await connection('ong').where({id: id, passwordResetToken: token}).
                andWhere('passwordResetExpiration', '>', now).
                select('id', 'passwordResetExpiration').first();

            if (!user) return res.status(400).json({ error: 'Verification failed, try to login and require a new verification mail'})

            await connection('ong').where('id', id).update('verified', 1);

            return res.status(204).send();
            
        } catch (err) {
            res.status(400).json({ error: 'Connection failed, try again'})
        }
    }
}