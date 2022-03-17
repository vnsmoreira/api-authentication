const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

var transport = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
});

const hbsConfig = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('./resources/mail'),
  extName: '.html',
};

transport.use('compile', hbs(hbsConfig));

module.exports = transport;
