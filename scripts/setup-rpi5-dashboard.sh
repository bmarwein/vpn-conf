#!/bin/bash

echo "[INSTALL] Mise en place du backend..."
cd ~/vpn-dashboard/backend || exit
npm install

echo "[INSTALL] Mise en place du frontend..."
cd ../frontend || exit
npm install
npm run build

echo "[INSTALLATION TERMINÉE]"
echo "Backend prêt sur : http://localhost:3001"
