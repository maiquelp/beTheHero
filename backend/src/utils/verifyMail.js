const generateId = require('./generateId');
const mailer = require('../config/mailer');
const connection = require('../database/connection');

module.exports = async function verifyMail(id, email) {

    const token = generateId();

    const now = new Date();
    now.setHours(now.getHours() - 2);

    try {

        await connection('ong').where('id', id).update({
            token: token,
            tokenExpiration: now
        });

        mailer.sendMail({
            to: email,
            from: 'verify@bethehero.com',
            template: 'auth/verify',
            context: {token, id}
        }, (err) => {
            if (err) 
                return console.log('Error sending verification email');

        })
    } catch (err) {
        return console.log('Registration failed')
    }
}

