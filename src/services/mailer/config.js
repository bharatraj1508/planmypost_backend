const nodemailer = require("nodemailer");

const MAIL_AUTH_USER = process.env.MAIL_AUTH_USER;
const MAIL_AUTH_PASS = process.env.MAIL_AUTH_PASS;
const MAIL_TRANSPORTER_HOST = process.env.MAIL_TRANSPORTER_HOST;
const MAIL_TRANSPORTER_PORT = process.env.MAIL_TRANSPORTER_PORT;
const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME;

const transporter = nodemailer.createTransport({
  host: MAIL_TRANSPORTER_HOST,
  port: MAIL_TRANSPORTER_PORT,
  auth: {
    user: MAIL_AUTH_USER,
    pass: MAIL_AUTH_PASS,
  },
});

const sendEmail = (opts) =>
  transporter.sendMail({
    ...opts,
    from: { name: MAIL_FROM_NAME, address: MAIL_AUTH_USER },
  });

module.exports = {
  sendEmail,
};