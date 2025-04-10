// backend/routes/alerts.js
const express = require('express');
const router = express.Router();

let alerts = [];

router.get('/', (req, res) => {
  try {
    res.json(alerts);
  } catch (err) {
    console.error('[ALERTS] Erreur GET :', err.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des alertes.' });
  }
});

router.post('/', (req, res) => {
  try {
    const alert = req.body;
    if (!alert.message || !alert.type) {
      return res.status(400).json({ error: 'Type et message requis.' });
    }
    alert.timestamp = new Date();
    alerts.push(alert);
    res.json({ message: 'Alerte enregistrée', alert });
  } catch (err) {
    console.error('[ALERTS] Erreur POST :', err.message);
    res.status(500).json({ error: 'Erreur lors de l’enregistrement de l’alerte.' });
  }
});

module.exports = router;
