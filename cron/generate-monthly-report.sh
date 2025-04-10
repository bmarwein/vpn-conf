#!/bin/bash
cd /home/pi/vpn-conf/backend/services
echo "[CRON] Génération du rapport mensuel..."
node generateMonthlyReport.js >> /var/log/monthly-report.log 2>&1

#5 0 1 * * /home/pi/vpn-conf/cron/generate-monthly-report.sh
