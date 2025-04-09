# 🔁 Automatisation - Scripts Cron VPN Dashboard

Ce dossier contient les scripts bash utilisés pour automatiser les actions quotidiennes de l'infrastructure VPN.

---

## 📅 1. Rotation quotidienne du pays VPN

### Script : `rotate-vpn-country.sh`

**But :** changer le pays VPN de façon aléatoire chaque jour.

- Compatible avec NordVPN, ProtonVPN, etc.
- Appelé automatiquement via `cron`.

**Crontab recommandé :**
```bash
0 4 * * * /home/pi/cron/rotate-vpn-country.sh >> /var/log/vpn-rotate.log 2>&1

💾 2. Sauvegarde automatique et restauration
Script : auto-backup-restore.sh

But :

    Sauvegarder tous les fichiers critiques (nodes.json, vpnProviders.json, etc.)

    Détecter les JSON corrompus

    Restaurer automatiquement depuis la dernière version saine

Crontab recommandé :

0 3 * * * /home/pi/cron/auto-backup-restore.sh >> /var/log/vpn-backup.log 2>&1

✅ Bonnes pratiques

    Donner les droits d’exécution :

chmod +x *.sh

    Installer jq pour valider les JSON :

sudo apt install jq

    Tester les scripts à la main une première fois avant de les activer avec cron.

🔐 Sécurité

    Les fichiers de logs sont enregistrés dans /var/log/

    Les backups sont stockés dans /home/pi/vpn-conf/backup/

    Les restaurations automatiques protègent contre les corruptions de config

Mainteneur : @bmarwein
Version : 1.0 – avril 2025
