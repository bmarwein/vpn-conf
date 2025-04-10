// backend/services/backupManager.js
const fs = require('fs');
const path = require('path');

exports.performBackup = () => {
  const date = new Date().toISOString().split('T')[0];
  const backupDir = path.join(__dirname, `../backup/${date}`);

  try {
    fs.mkdirSync(backupDir, { recursive: true });
    const filesToBackup = ['nodes.json', 'notifications.json', 'vpnProviders.json'];
    filesToBackup.forEach(file => {
      const src = path.join(__dirname, `../config/${file}`);
      const dest = path.join(backupDir, file);
      fs.copyFileSync(src, dest);
    });
    console.log(`[BACKUP] Sauvegarde du ${date} terminée.`);
  } catch (err) {
    console.error('[BACKUP] Erreur de sauvegarde :', err.message);
  }
};
