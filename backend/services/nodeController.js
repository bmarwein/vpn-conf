// services/nodeController.js
const fs = require('fs');
const path = require('path');
const nodesPath = path.join(__dirname, '../config/nodes.json');

function readNodes() {
  return JSON.parse(fs.readFileSync(nodesPath));
}

function writeNodes(data) {
  fs.writeFileSync(nodesPath, JSON.stringify(data, null, 2));
}

exports.listNodes = (req, res) => {
  const nodes = readNodes();
  res.json(nodes);
};

exports.addNode = (req, res) => {
  const nodes = readNodes();
  const newNode = req.body;
  nodes.push(newNode);
  writeNodes(nodes);
  res.json({ message: 'Nœud ajouté', node: newNode });
};

exports.restartNode = (req, res) => {
  const { id } = req.params;
  // Ici on pourrait déclencher un redémarrage via SSH ou API locale
  res.json({ message: `Redémarrage demandé pour le nœud ${id}` });
};

exports.suspendNode = (req, res) => {
  const nodes = readNodes();
  const { id } = req.params;
  const node = nodes.find(n => n.id === id);
  if (node) {
    node.status = 'suspended';
    writeNodes(nodes);
    res.json({ message: 'Nœud suspendu' });
  } else {
    res.status(404).json({ error: 'Nœud non trouvé' });
  }
};

exports.enableNode = (req, res) => {
  const nodes = readNodes();
  const { id } = req.params;
  const node = nodes.find(n => n.id === id);
  if (node) {
    node.status = 'active';
    writeNodes(nodes);
    res.json({ message: 'Nœud activé' });
  } else {
    res.status(404).json({ error: 'Nœud non trouvé' });
  }
};

exports.changeNodeVPN = (req, res) => {
  const nodes = readNodes();
  const { id } = req.params;
  const { provider, country } = req.body;
  const node = nodes.find(n => n.id === id);
  if (node) {
    node.vpn = { provider, country };
    writeNodes(nodes);
    res.json({ message: 'VPN du nœud mis à jour', node });
  } else {
    res.status(404).json({ error: 'Nœud non trouvé' });
  }
};
