// routes/vpn.js
const express = require('express');
const router = express.Router();
const vpnManager = require('../services/vpnManager');

router.get('/:provider/countries', async (req, res, next) => {
  try {
    await vpnManager.getAvailableCountries(req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
