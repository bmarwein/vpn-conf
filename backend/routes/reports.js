// backend/routes/reports.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { generateCustomReport } = require('../services/customReportGenerator');

router.get('/weekly', (req, res) => {
  try {
    const fileName = `weekly-report-${new Date().toISOString().split('T')[0]}.html`;
    const reportPath = path.join(__dirname, `../report/weekly/${fileName}`);
    if (fs.existsSync(reportPath)) {
      res.sendFile(reportPath);
    } else {
      res.status(404).json({ error: 'Rapport hebdomadaire non trouvé.' });
    }
  } catch (err) {
    console.error('[REPORTS] Weekly error:', err.message);
    res.status(500).json({ error: 'Erreur chargement rapport hebdo.' });
  }
});

router.get('/monthly', (req, res) => {
  try {
    const fileName = `monthly-report-${new Date().toISOString().slice(0, 7)}.html`;
    const reportPath = path.join(__dirname, `../report/monthly/${fileName}`);
    if (fs.existsSync(reportPath)) {
      res.sendFile(reportPath);
    } else {
      res.status(404).json({ error: 'Rapport mensuel non trouvé.' });
    }
  } catch (err) {
    console.error('[REPORTS] Monthly error:', err.message);
    res.status(500).json({ error: 'Erreur chargement rapport mensuel.' });
  }
});

router.post('/generate', async (req, res) => {
  try {
    const { type, startDate, endDate } = req.body;

    if (!type || !["weekly", "monthly", "custom"].includes(type)) {
      return res.status(400).json({ error: "Type de rapport invalide." });
    }

    const filename = await generateCustomReport(type, startDate, endDate);
    res.json({ success: true, file: filename });
  } catch (err) {
    console.error("[ERREUR] Génération rapport :", err.message);
    res.status(500).json({ error: "Erreur lors de la génération du rapport." });
  }
});

module.exports = router;
