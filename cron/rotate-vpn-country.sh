#!/bin/bash

# Configuration
VPN_PROVIDER="nordvpn"
AVAILABLE_COUNTRIES=("fr" "de" "es" "se" "nl" "pl")
SELECTED=${AVAILABLE_COUNTRIES[$RANDOM % ${#AVAILABLE_COUNTRIES[@]}]}

# Commande de connexion
echo "[CRON] Rotation VPN quotidienne vers $SELECTED..."
nordvpn connect "$SELECTED"

# Log
if [ $? -eq 0 ]; then
  echo "[VPN] Succès : connecté à $SELECTED via $VPN_PROVIDER"
else
  echo "[VPN] Échec de connexion à $SELECTED"
fi
