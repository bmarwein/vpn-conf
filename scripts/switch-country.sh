#!/bin/bash

VPN_PROVIDER="nordvpn"  # à détecter ou injecter dynamiquement
VPN_COUNTRIES=("fr" "es" "de" "se" "nl")

# Sélection aléatoire
SELECTED_COUNTRY=${VPN_COUNTRIES[$RANDOM % ${#VPN_COUNTRIES[@]}]}
echo "[VPN] Changement de pays vers : $SELECTED_COUNTRY"

# Exécution de la commande NordVPN (exemple)
nordvpn connect "$SELECTED_COUNTRY"

if [ $? -eq 0 ]; then
  echo "[VPN] Connexion réussie à $SELECTED_COUNTRY"
else
  echo "[VPN] Échec de connexion. Tentative suivante..."
fi
