// services/notifier.js
exports.sendNotification = ({ type, message, method = [] }) => {
  method.forEach(m => {
    console.log(`[${type.toUpperCase()}] (${m}): ${message}`);
    // Implémentation à compléter pour Email, Telegram, WhatsApp
  });
};
