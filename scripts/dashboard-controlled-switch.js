#!/usr/bin/env node

const { exec } = require('child_process');
const [,, nodeIP, vpnProvider, countryCode ] = process.argv;

if (!nodeIP || !vpnProvider || !countryCode) {
  console.error('Usage : node dashboard-controlled-switch.js <IP_NODE> <VPN_PROVIDER> <COUNTRY_CODE>');
  process.exit(1);
}

const sshCommand = `ssh -o StrictHostKeyChecking=no pi@${nodeIP} 'bash -s' <<EOF
echo "[VPN] Passage à ${vpnProvider} - ${countryCode}..."
if [ "${vpnProvider}" == "nordvpn" ]; then
  nordvpn connect ${countryCode}
elif [ "${vpnProvider}" == "protonvpn" ]; then
  protonvpn c -f --cc ${countryCode}
else
  echo "Fournisseur ${vpnProvider} non supporté"
fi
EOF`;

exec(sshCommand, (err, stdout, stderr) => {
  if (err) {
    console.error(`[ERREUR] Changement VPN échoué :`, err.message);
    return;
  }
  console.log(`[VPN ${nodeIP}] Sortie :\n`, stdout);
  if (stderr) console.error(`[VPN ${nodeIP}] Erreurs :\n`, stderr);
});
