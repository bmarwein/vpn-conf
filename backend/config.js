// backend/config.js
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,

  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },

  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
    chatId: process.env.TELEGRAM_CHAT_ID
  },

  whatsapp: {
    apiKey: process.env.WHATSAPP_API_KEY,
    phoneNumber: process.env.WHATSAPP_PHONE_NUMBER
  },

  ssh: {
    keyPath: process.env.SSH_KEY_PATH || '/home/pi/.ssh/id_rsa'
  }
};
