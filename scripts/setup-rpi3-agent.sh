#!/bin/bash

echo "[SETUP] Installation de l'agent VPN node..."

cd ~/vpn-node-agent || mkdir -p ~/vpn-node-agent && cd ~/vpn-node-agent

# Exemple : cloner depuis un repo Git ou copier depuis une clé USB
# git clone https://... si nécessaire

echo "[INSTALL] Dépendances Node.js"
npm install

echo "[LANCEMENT] Agent statusServer..."
pm2 start statusServer.js --name vpn-agent

echo "[AUTOSTART] Enregistrement pm2"
pm2 save
pm2 startup

echo "[FINI] L’agent VPN node est opérationnel sur le port 5000"
