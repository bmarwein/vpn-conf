#!/bin/bash

echo "[SECURITE] Installation de Fail2ban..."
sudo apt update
sudo apt install -y fail2ban

echo "[CONFIG] Configuration du bannissement permanent..."
sudo tee /etc/fail2ban/jail.local > /dev/null <<EOL
[sshd]
enabled = true
port = ssh
logpath = %(sshd_log)s
maxretry = 3
bantime = -1
findtime = 600
EOL

echo "[RESTART] Redémarrage de Fail2ban..."
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban

echo "[SECURITE] Fail2ban actif avec bannissement permanent après 3 échecs."
