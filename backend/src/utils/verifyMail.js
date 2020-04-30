const generateId = require('./generateId');
const mailer = require('../config/mailer');
const connection = require('../database/connection');

module.exports = async function verifyMail(id, email) {

    const token = generateId();

    const now = new Date();
    now.setHours(now.getHours() - 2);

    try {

        await connection('ong').where('id', id).update({
            passwordResetToken: token,
            passwordResetExpiration: now 
        });

        mailer.sendMail({
            to: email,
            from: 'verify@bethehero.com',
            template: 'auth/verify',
            context: {token, id}
        }, (err) => {
            if (err) 
                return res.status(400).json({error: 'Error sending verification email'});

            return res.status(204).send();

        })
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed'})
    }
}

