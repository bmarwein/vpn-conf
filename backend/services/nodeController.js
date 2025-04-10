// backend/services/nodeController.js
const fs = require('fs');
const path = require('path');
const Joi = require('joi');

const nodesPath = path.join(__dirname, '../config/nodes.json');

const nodeSchema = Joi.object({
  id: Joi.string().required(),
  ip: Joi.string().ip().required(),
  vpn: Joi.object({
    provider: Joi.string().required(),
    country: Joi.string().required()
  }).required(),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required()
  }).required(),
  status: Joi.string().valid("active", "suspended").default("active"),
  mode: Joi.string().valid("local", "central").required()
});

function readNodes() {
  try {
    return JSON.parse(fs.readFileSync(nodesPath));
  } catch (err) {
    console.error("[ERREUR] Lecture nodes.json échouée:", err.message);
    return [];
  }
}

function writeNodes(data) {
  try {
    fs.writeFileSync(nodesPath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("[ERREUR] Écriture nodes.json échouée:", err.message);
  }
}

exports.listNodes = (req, res) => {
  try {
    const nodes = readNodes();
    res.json(nodes);
  } catch (err) {
    res.status(500).json({ error: "Impossible de charger les nœuds." });
  }
};

exports.addNode = (req, res) => {
  const { error, value } = nodeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const nodes = readNodes();
    nodes.push(value);
    writeNodes(nodes);
    res.json({ message: 'Nœud ajouté', node: value });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l’ajout du nœud." });
  }
};

exports.restartNode = (req, res) => {
  const { id } = req.params;
  res.json({ message: `Redémarrage demandé pour le nœud ${id}` });
};

exports.suspendNode = (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suspension." });
  }
};

exports.enableNode = (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de l’activation." });
  }
};

exports.changeNodeVPN = (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la modification VPN." });
  }
};
