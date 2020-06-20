const nodemailer = require('nodemailer');
const neh = require('nodemailer-express-handlebars');
const path = require('path');


const {host, port, user, pass} = require('./mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: {user, pass}
});

transport.use('compile', neh({
    viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail/')
      },
      viewPath: path.resolve('./src/resources/mail/'),
      extName: '.html'
}));

module.exports = transport;