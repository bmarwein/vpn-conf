const fs = require('fs');
const path = require('path');
const alerts = require('../logs/alerts.json');
const nodesData = require('../config/nodes.json');

function filterAlerts(start, end) {
  return alerts.filter(a => {
    const ts = new Date(a.timestamp);
    return ts >= start && ts <= end;
  });
}

const logsPath = path.join(__dirname, '..', 'logs');

if (!fs.existsSync(logsPath)) fs.mkdirSync(logsPath);
if (!fs.existsSync(path.join(logsPath, 'alerts.json'))) fs.writeFileSync(path.join(logsPath, 'alerts.json'), '[]');
if (!fs.existsSync(path.join(logsPath, 'nodes.json'))) fs.writeFileSync(path.join(logsPath, 'nodes.json'), '[]');

function generateHTML(title, stats, alertList, filename, outputPath) {
  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>${title}</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f9f9f9; padding: 2em; }
        table { width: 100%; border-collapse: collapse; margin-top: 1em; }
        th, td { border: 1px solid #ccc; padding: 0.6em; text-align: center; }
        th { background: #eee; }
        .summary { background: #e0f7fa; font-weight: bold; }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <p>Généré le ${new Date().toLocaleString()}</p>

      <h2>📊 Statistiques</h2>
      <table>
        ${Object.entries(stats).map(([key, val]) => `<tr><td class="summary">${key}</td><td>${val}</td></tr>`).join('')}
      </table>

      <h2>🚨 Alertes</h2>
      <ul>
        ${alertList.length > 0 ? alertList.map(a => `<li>[${a.timestamp}] ${a.message}</li>`).join('') : '<li>Aucune alerte</li>'}
      </ul>
    </body>
    </html>
  `;

  fs.mkdirSync(outputPath, { recursive: true });
  const filePath = path.join(outputPath, filename);
  fs.writeFileSync(filePath, html);
  return filename;
}

exports.generateCustomReport = (type, startDate, endDate) => {
  const now = new Date();
  let start = startDate ? new Date(startDate) : null;
  let end = endDate ? new Date(endDate) : now;

  const monthStr = now.toISOString().slice(0, 7);
  const dateStr = now.toISOString().split('T')[0];

  if (type === 'weekly') {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    end = now;
  } else if (type === 'monthly') {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }

  const filteredAlerts = filterAlerts(start, end);

  const stats = {
    "Nombre de nœuds analysés": nodesData.length,
    "Alertes détectées": filteredAlerts.length,
    "Période": `${start.toLocaleDateString()} ➜ ${end.toLocaleDateString()}`
  };

  const filename = `${type}-report-${Date.now()}.html`;
  const outputPath = path.join(__dirname, `../../report/${type}`);

  return generateHTML(
    `📄 Rapport ${type.charAt(0).toUpperCase() + type.slice(1)} VPN`,
    stats,
    filteredAlerts,
    filename,
    outputPath
  );
};
