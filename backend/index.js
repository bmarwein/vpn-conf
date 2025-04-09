const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3001;

// Config
dotenv.config();
app.use(cors());
app.use(express.json());

// Routes
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

app.listen(port, () => {
  console.log(`API backend en service sur le port ${port}`);
});
