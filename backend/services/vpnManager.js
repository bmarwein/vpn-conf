// services/vpnManager.js
const fs = require('fs');
const path = require('path');

exports.getAvailableCountries = (req, res) => {
  const provider = req.params.provider;
  const filePath = path.join(__dirname, '../config/vpnProviders.json');

  try {
    const data = JSON.parse(fs.readFileSync(filePath));
    const countries = data[provider] || [];
    res.json({ provider, countries });
  } catch (err) {
    console.error("[ERREUR] Chargement vpnProviders.json :", err.message);
    res.status(500).json({ error: 'Erreur de lecture des pays disponibles.' });
  }
};
