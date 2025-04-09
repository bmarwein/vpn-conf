# vpn-conf
# Arborescence complète du projet VPN en cascade

vpn-conf/
├── backend/
│   ├── index.js
│   ├── routes/
│   │   ├── nodes.js
│   │   ├── vpn.js
│   │   ├── alerts.js
│   │   └── reports.js
│   ├── services/
│   │   ├── nodeController.js
│   │   ├── vpnManager.js
│   │   ├── notifier.js
│   │   ├── backupManager.js
│   │   └── securityAudit.js
│   ├── config.js
│   ├── logger.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
├── pi-node-agent/
│   ├── statusServer.js
│   ├── fallback-locations.json
│   └── package.json
├── scripts/
│   ├── setup-rpi5-dashboard.sh
│   ├── setup-rpi3-agent.sh
│   ├── install-openvpn-server.sh
│   ├── fail2ban-setup.sh
│   ├── audit-securite.sh
│   ├── switch-country.sh
│   ├── dashboard-controlled-switch.js
│   └── toggle_privacy_mode.sh
├── config/
│   ├── nodes.json
│   ├── notifications.json
│   ├── vpnProviders.json
│   └── prometheus.yml
├── docs/
│   ├── README.md
│   ├── API_REFERENCE.md
│   └── USAGE_GUIDE_FR.pdf
├── report-sample/
│   ├── weekly-report-2025-04-06.html
│   └── monthly-report-2025-03.html
├── .gitignore
├── package.json (root si monorepo)
└── README.md (global)

# Tous les fichiers .js contiennent du code réel (Node.js ou React),
# les .sh sont des scripts bash exécutables pour l'installation et l'automatisation,
# les .json sont des configs clés,
# les .html sont des rapports générés automatiquement
# les .md sont documentés (API, guide, etc.)
