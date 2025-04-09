// backend/logger.js
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/system.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
  console.log(logMessage.trim());
}

module.exports = { log };
