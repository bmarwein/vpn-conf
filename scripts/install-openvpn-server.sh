#!/bin/bash

echo "[VPN] Installation du serveur OpenVPN sur le RPi..."
sudo apt update
sudo apt install -y openvpn easy-rsa

make-cadir ~/openvpn-ca
cd ~/openvpn-ca

echo "[CONFIG] Initialisation des certificats..."
source vars
./clean-all
./build-ca
./build-key-server server
./build-dh
./build-key client1
./build-key client2

cp keys/{server.crt,server.key,ca.crt,dh2048.pem} /etc/openvpn/

echo "[ACTIVATION] Démarrage du serveur OpenVPN..."
sudo cp ~/vpn-dashboard/config/server.conf /etc/openvpn/
sudo systemctl start openvpn@server
sudo systemctl enable openvpn@server

echo "[VPN] Serveur OpenVPN opérationnel."
