const express = require('express');
const os = require('os');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;

const fallback = require('./fallback-locations.json');

app.use(express.json());

app.get('/status', (req, res) => {
  const hostname = os.hostname();
  const uptime = os.uptime();
  const load = os.loadavg();
  const mem = {
    total: os.totalmem(),
    free: os.freemem()
  };

  res.json({
    node: hostname,
    uptime,
    load,
    memory: mem,
    timestamp: new Date()
  });
});

app.get('/location', (req, res) => {
  const hostname = os.hostname();
  const loc = fallback[hostname];
  if (loc) {
    res.json({
      id: hostname,
      location: loc
    });
  } else {
    res.status(404).json({ error: "Fallback non trouvé pour ce node" });
  }
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`# HELP node_uptime_seconds Uptime du node
# TYPE node_uptime_seconds gauge
node_uptime_seconds ${os.uptime()}
`);
});

app.listen(port, () => {
  console.log(`[AGENT] Node local en ligne sur le port ${port}`);
});
