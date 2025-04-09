#!/bin/bash

echo "[AUDIT] Lancement de l’audit de sécurité..."

# Vérification de base : utilisateurs sudo
echo "[+] Utilisateurs sudo :"
getent group sudo

# Vérification des ports ouverts
echo "[+] Ports TCP ouverts :"
sudo ss -tuln

# Vérification des tentatives SSH récentes
echo "[+] Dernières tentatives SSH :"
sudo grep "sshd" /var/log/auth.log | tail -n 10

# Vérification des mises à jour de sécurité
echo "[+] Mises à jour disponibles :"
sudo apt update > /dev/null
sudo apt list --upgradable | grep security

# Vérification de fail2ban (si installé)
if systemctl is-active --quiet fail2ban; then
  echo "[+] Fail2ban est actif"
  sudo fail2ban-client status sshd
else
  echo "[!] Fail2ban n’est pas actif ou non installé"
fi

# Vérification du statut des services critiques
echo "[+] Statut de services critiques :"
systemctl status ssh
systemctl status openvpn

echo "[AUDIT TERMINÉ] ✅"
