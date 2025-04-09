#!/bin/bash

MODE_FILE="/etc/vpn-dashboard/.confidential_mode"

if [ -f "$MODE_FILE" ]; then
  echo "[MODE] Désactivation du mode ultra confidentiel..."
  rm "$MODE_FILE"
  sudo sed -i 's/^PasswordAuthentication no/PasswordAuthentication yes/' /etc/ssh/sshd_config
  sudo systemctl restart ssh
  echo "[MODE] SSH par mot de passe réactivé. Logs utilisateurs réactivés."
else
  echo "[MODE] Activation du mode ultra confidentiel..."
  mkdir -p /etc/vpn-dashboard
  touch "$MODE_FILE"
  sudo sed -i 's/^PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
  sudo systemctl restart ssh
  echo "[MODE] SSH par mot de passe désactivé. Journaux utilisateurs désactivés."
fi
