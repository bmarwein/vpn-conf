const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/weekly', (req, res) => {
  const reportPath = path.join(__dirname, '../report-sample/weekly-report-2025-04-06.html');
  if (fs.existsSync(reportPath)) {
    res.sendFile(reportPath);
  } else {
    res.status(404).send('Rapport hebdomadaire introuvable');
  }
});

router.get('/monthly', (req, res) => {
  const reportPath = path.join(__dirname, '../report-sample/monthly-report-2025-03.html');
  if (fs.existsSync(reportPath)) {
    res.sendFile(reportPath);
  } else {
    res.status(404).send('Rapport mensuel introuvable');
  }
});

module.exports = router;
