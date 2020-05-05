const generateId = require('../utils/generateId');
const connection = require('../database/connection');
const mailer = require('../config/mailer');

module.exports = {

    async update(req, res){
        const { email } = req.body;

        try {
            const {id} = await connection('ong').where('email', email).select('id').first();

            const token = generateId();

            const now = new Date();
            now.setHours(now.getHours() - 2);
            
            await connection('ong').where('id', id).update({
                token: token,
                tokenExpiration: now 
            });

            mailer.sendMail({
                to: email,
                from: 'recover@bethehero.com',
                template: 'auth/recover',
                context: {token, id}
            }, (err) => {
                if (err) 
                    return res.status(400).send('Error sending recover email');

                return res.status(204).send();

            });
        } catch(err){
            res.status(400).send('Unregistered email or connection failed, try again')
        }
    }
}    