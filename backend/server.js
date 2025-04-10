const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const nodeRoutes = require('./routes/nodes');
const vpnRoutes = require('./routes/vpn');
const alertRoutes = require('./routes/alerts');
const reportRoutes = require('./routes/reports');

app.use('/api/nodes', nodeRoutes);
app.use('/api/vpn', vpnRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('Backend VPN Dashboard is running.');
});

module.exports = app; // 👈 très important pour les tests
