// backend/services/notifier.js
const nodemailer = require('nodemailer');
const config = require('../config');

exports.sendNotification = ({ type, message, method = [] }) => {
  method.forEach(m => {
    switch (m) {
      case 'email':
        sendEmail(message);
        break;
      case 'telegram':
        console.log(`[Telegram] ${message}`);
        break;
      case 'whatsapp':
        console.log(`[WhatsApp] ${message}`);
        break;
      default:
        console.log(`[Notification ${m}] ${message}`);
    }
  });
};

function sendEmail(content) {
  const transporter = nodemailer.createTransport({
    host: config.smtp.host,
    port: config.smtp.port,
    auth: {
      user: config.smtp.user,
      pass: config.smtp.pass
    }
  });

  const mailOptions = {
    from: config.smtp.user,
    to: config.smtp.user,
    subject: 'Alerte VPN Node',
    text: content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error('[EMAIL] Erreur:', error);
    else console.log('[EMAIL] Envoyé :', info.response);
  });
}
