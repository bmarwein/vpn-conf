✅ docs/DEPLOYMENT_OVERVIEW.md

# 🛰️ VPN Cascade Infrastructure — Vue d'ensemble & Déploiement

Ce document résume toute l’architecture, les composants et le processus de déploiement du projet **vpn-conf** (cascade VPN avec Raspberry Pi).

---

## 🔧 Architecture générale

┌──────────────┐        ┌──────────────┐        ┌──────────────┐ 
│ RPi3 (Node 1)│──VPN──▶│ RPi3 (Node 2)│──VPN──▶│ RPi3 (Node 3)│──VPN──▶ 🌍 Internet 
│ Spain (Nord) │        │ Germany (Proton)      │ France (Express) 
└────▲─────────┘        └────▲─────────┘        └────▲─────────┘ 
│ │ │ │ │ │ │ ▼ ▼ ┌──────────────────────────────┐ │ RPi5 (Central) │ │ Dashboard React + API Node.js│ │ Heatmap + Fallback + Backup │ └──────────────────────────────┘


---

## 📦 Composants

### Backend Node.js (`/backend`)
- API REST (`/api/nodes`, `/api/alerts`, `/api/reports`)
- Sauvegarde automatique & restauration
- Notifications : Email, Telegram, WhatsApp
- Mode ultra confidentiel
- Audit sécurité automatique

### Frontend React (`/frontend`)
- Carte interactive + heatmap
- Visualisation de la cascade VPN
- Tableau de bord (status, alertes, paramètres)
- Timeline historique + rapports HTML

### Agent RPi3 (`/pi-node-agent`)
- Serveur Express minimal
- Exposition de status `/status`, `/location`, `/metrics`
- Intégration Prometheus

---

## 🚀 Déploiement rapide

### Serveur central (RPi5)

```bash
cd vpn-conf
bash scripts/setup-rpi5-dashboard.sh

Nodes VPN (RPi3)

cd vpn-conf
bash scripts/setup-rpi3-agent.sh

🔁 Automatisation via cron
Action	Script	Heure recommandée
Rotation VPN quotidienne	rotate-vpn-country.sh	0 4 * * *
Sauvegarde + restauration	auto-backup-restore.sh	0 3 * * *
Audit sécurité	audit-securite.sh	Hebdo / manuel
📊 Monitoring

    Prometheus (prometheus.yml) : collecte les /metrics exposés

    Grafana (optionnel) : tableau de bord graphique (à intégrer)

🔐 Sécurité

    🔒 SSH par clé uniquement (mode privé)

    🧱 Fail2ban actif : ban permanent après 3 échecs

    🔁 Sauvegarde automatique journalière

    👁️ Mode ultra confidentiel via toggle dashboard

📁 Emplacements clés

    /config/ : fichiers JSON & yml de config

    /report/ : rapports HTML hebdo & mensuels

    /scripts/ : bash utilitaires & automatisation

    /docs/ : guides API + PDF d’utilisation

📄 Fichiers de doc

    README.md — aperçu général

    API_REFERENCE.md — endpoints backend

    USAGE_GUIDE_FR.pdf — guide complet utilisateur

✅ Déploiement terminé ? Tu peux :

    Démarrer le backend : npm run start:backend

    Lancer le dashboard : cd frontend && npm run dev

    Ouvrir le dashboard : http://localhost:5173

Auteur : @bmarwein
Date : Avril 2025
Version : 1.0
