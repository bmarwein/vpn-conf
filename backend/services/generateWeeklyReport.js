const fs = require('fs');
const path = require('path');

const nodesData = require('../../config/nodes.json');
const alerts = require('../../logs/alerts.json'); // fichier généré automatiquement si log des alertes
const outputPath = path.join(__dirname, '../../report/weekly');

function generateReportHTML(data, alertList) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const filename = `weekly-report-${dateStr}.html`;

  const html = `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Rapport Hebdomadaire VPN - ${dateStr}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 2em; background: #f5f5f5; }
      h1 { color: #444; }
      table { width: 100%; border-collapse: collapse; margin-top: 1em; }
      th, td { border: 1px solid #ccc; padding: 0.6em; text-align: center; }
      th { background: #eee; }
      .success { color: green; }
      .error { color: red; }
    </style>
  </head>
  <body>
    <h1>📊 Rapport Hebdomadaire — Cascade VPN</h1>
    <p>Semaine du ${dateStr}</p>

    <h2>🌍 VPN Nodes Actifs</h2>
    <table>
      <thead>
        <tr><th>ID</th><th>Fournisseur</th><th>Pays</th><th>Statut</th></tr>
      </thead>
      <tbody>
        ${data.map(node => `
          <tr>
            <td>${node.id}</td>
            <td>${node.vpn.provider}</td>
            <td>${node.vpn.country}</td>
            <td>${node.status}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h2>🚨 Alertes</h2>
    <ul>
      ${alertList.length > 0 ? alertList.map(a =>
        `<li class="${a.type === 'error' ? 'error' : 'success'}">[${a.timestamp}] ${a.message}</li>`
      ).join('') : '<li class="success">Aucune alerte critique détectée</li>'}
    </ul>

    <p style="margin-top: 2em;">Rapport généré automatiquement le ${now.toLocaleString()} ✅</p>
  </body>
  </html>`;

  fs.mkdirSync(outputPath, { recursive: true });
  fs.writeFileSync(path.join(outputPath, filename), html);
  console.log(`[RAPPORT] Rapport HTML généré : ${filename}`);
}

// Exécution
generateReportHTML(nodesData, alerts || []);
