const express = require('express');
const router = express.Router();

let alerts = [];

router.get('/', (req, res) => {
  res.json(alerts);
});

router.post('/', (req, res) => {
  const alert = req.body;
  alert.timestamp = new Date();
  alerts.push(alert);
  res.json({ message: 'Alerte enregistrée', alert });
});

module.exports = router;
