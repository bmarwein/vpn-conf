// routes/vpn.js
const express = require('express');
const router = express.Router();
const vpnManager = require('../services/vpnManager');

// Retourne les pays disponibles pour un fournisseur donné
router.get('/:provider/countries', vpnManager.getAvailableCountries);

module.exports = router;
