#!/bin/bash

BACKUP_DIR="/home/pi/vpn-conf/backup/$(date +%F)"
CONFIG_DIR="/home/pi/vpn-conf/config"

mkdir -p "$BACKUP_DIR"

echo "[BACKUP] Sauvegarde des fichiers critiques..."

cp "$CONFIG_DIR"/*.json "$BACKUP_DIR/"
cp "$CONFIG_DIR/prometheus.yml" "$BACKUP_DIR/"

echo "[BACKUP] Sauvegarde effectuée dans : $BACKUP_DIR"

# Vérification de fichiers corrompus (ex : JSON vides)
for f in "$CONFIG_DIR"/*.json; do
  if ! jq empty "$f" > /dev/null 2>&1; then
    echo "[RESTORE] Fichier corrompu détecté : $f — restauration..."
    cp "$BACKUP_DIR/$(basename "$f")" "$f"
  fi
done

echo "[SÉCURITÉ] Audit rapide post-backup (taille + JSON)"
ls -lh "$BACKUP_DIR"/*.json
