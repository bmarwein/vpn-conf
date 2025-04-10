#!/bin/bash
cd /home/pi/vpn-conf/backend/services
echo "[CRON] Génération du rapport hebdomadaire..."
node generateWeeklyReport.js >> /var/log/weekly-report.log 2>&1

#0 23 * * 0 /home/pi/vpn-conf/cron/generate-weekly-report.sh
