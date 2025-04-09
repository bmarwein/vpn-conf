# VPN Dashboard - Infrastructure VPN en cascade 🛰️

Ce projet permet de créer une **infrastructure VPN en cascade intelligente** à l'aide de plusieurs Raspberry Pi (RPi3, RPi4) contrôlés par un Raspberry Pi 5 central.

---

## 🎯 Objectif

- Masquer ton IP en la faisant transiter par plusieurs pays via une chaîne VPN (Espagne → Allemagne → France, etc.)
- Visualiser les connexions sur une **carte mondiale interactive**
- Gérer les nœuds VPN (RPi) depuis une interface web moderne
- Recevoir des **alertes en temps réel**
- Générer des **rapports automatiques hebdomadaires et mensuels**

---

## 🧱 Structure du projet

vpn-conf/ 
├── backend/ # API Node.js 
├── frontend/ # Dashboard React + Tailwind 
├── pi-node-agent/ # Agent Node.js à déployer sur les RPi VPN 
├── scripts/ # Scripts bash (installation, sécurité, privacy, etc.) 
├── config/ # Fichiers de configuration VPN, nodes, Prometheus 
├── docs/ # README, API.md, PDF d'utilisation 
├── report-sample/ # Exemples de rapports HTML générés 
├── .env # Configuration des accès privés (non versionné) 
├── .gitignore 
└── package.json

---

## 🚀 Lancer le projet

### Sur le Raspberry Pi 5 (serveur central)

```bash
bash scripts/setup-rpi5-dashboard.sh

Sur chaque Raspberry Pi 3 (VPN node)
bash scripts/setup-rpi3-agent.sh


🛠️ Fonctions clés

    🔁 Cascade VPN automatisée

    🌍 Carte mondiale avec heatmap + flèches

    🔔 Notifications (Email, Telegram, WhatsApp)

    📊 Monitoring Prometheus + Grafana

    🧩 API REST + fichier API_REFERENCE.md

    🧱 Restauration automatique en cas de panne

    👁️ Mode ultra confidentiel (logs OFF, SSH restreint)

📦 API REST

Voir docs/API_REFERENCE.md pour les endpoints et exemples.
🛡️ Sécurité

    🔒 SSH par clé uniquement (mode privé)

    🚫 Logs désactivés en mode ultra confidentiel

    🔐 Fail2ban actif avec ban permanent

    📉 Audit automatique avec audit-securite.sh

📩 Contact

Développé par @bmarwein
💬 Pour questions ou améliorations, tu peux ouvrir une issue sur le dépôt privé GitHub ou me contacter directement.

✅ Licence

MIT © 2025


---
