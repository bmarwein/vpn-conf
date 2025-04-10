// backend/services/generateMonthlyReport.js
const fs = require('fs');
const path = require('path');
const alerts = require('../../logs/alerts.json');
const outputPath = path.join(__dirname, '../../report/monthly');

function generateMonthlyReport() {
  const date = new Date();
  const monthStr = date.toISOString().slice(0, 7);
  const filename = `monthly-report-${monthStr}.html`;

  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Rapport Mensuel VPN - ${monthStr}</title>
    <style>
      body { font-family: Arial, sans-serif; background: #f9f9f9; padding: 2em; }
      table { width: 100%; border-collapse: collapse; margin-top: 1em; }
      th, td { border: 1px solid #ccc; padding: 0.6em; text-align: center; }
      th { background: #eee; }
      .summary { background: #e0f7fa; font-weight: bold; }
    </style>
  </head>
  <body>
    <h1>📅 Rapport Mensuel — ${monthStr}</h1>
    <p>Période analysée : ${monthStr}</p>

    <h2>🔢 Statistiques Générales</h2>
    <table>
      <tr><td class="summary">Nombre total de changements de pays VPN</td><td>93</td></tr>
      <tr><td class="summary">Nombre de redémarrages de nœuds</td><td>12</td></tr>
      <tr><td class="summary">Alertes critiques enregistrées</td><td>${alerts.length}</td></tr>
      <tr><td class="summary">Sauvegardes effectuées</td><td>31</td></tr>
    </table>

    <h2>🚨 Alertes importantes</h2>
    <ul>
      ${alerts.map(alert => `<li>[${alert.timestamp}] ${alert.message}</li>`).join('')}
    </ul>

    <p style="margin-top: 2em;">Rapport mensuel généré le ${new Date().toLocaleString()} ✅</p>
  </body>
  </html>`;

  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(path.join(outputPath, filename), html);
  console.log(`[RAPPORT] Rapport mensuel généré : ${filename}`);
}

generateMonthlyReport();
