# 🗓️ Automatisation des rapports VPN

Ce dossier contient les scripts `cron` permettant de générer automatiquement :

- 📊 Rapports hebdomadaires (`weekly`)
- 📅 Rapports mensuels (`monthly`)

---

## 📁 Scripts disponibles

| Script                                   | Fonction                                 |
|------------------------------------------|------------------------------------------|
| `generate-weekly-report.sh`              | Génère un rapport HTML chaque dimanche    |
| `generate-monthly-report.sh`             | Génère un rapport HTML le 1er de chaque mois |

---

## 📌 Mise en place

### 1. Donner les droits d'exécution :

```bash
chmod +x cron/*.sh

. Ajouter les tâches cron :

crontab -e

Puis ajouter les lignes suivantes :

0 23 * * 0 /home/pi/vpn-conf/cron/generate-weekly-report.sh
5 0 1 * * /home/pi/vpn-conf/cron/generate-monthly-report.sh

📌 Ces tâches :

    Génèrent automatiquement les rapports HTML à partir des fichiers nodes.json et alerts.json

    Sauvegardent les rapports dans report/weekly/ et report/monthly/

✅ Vérification des rapports

Une fois générés, les rapports peuvent être visualisés :

    depuis le dashboard dans la section 📊 Rapports

    ou en ouvrant directement les fichiers .html dans un navigateur.

🛠️ Dépendances

Ces scripts nécessitent :

    Node.js installé (≥ v18 recommandé)

    Que les scripts generateWeeklyReport.js et generateMonthlyReport.js soient opérationnels dans backend/services/

🔄 Astuce (optionnelle)

Tu peux tester manuellement :

bash cron/generate-weekly-report.sh
bash cron/generate-monthly-report.sh

Auteur : @bmarwein
Mise à jour : Avril 2025
