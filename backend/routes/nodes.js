const express = require('express');
const router = express.Router();
const nodeController = require('../services/nodeController');

router.get('/', nodeController.listNodes);
router.post('/add', nodeController.addNode);
router.post('/:id/restart', nodeController.restartNode);
router.post('/:id/suspend', nodeController.suspendNode);
router.post('/:id/enable', nodeController.enableNode);
router.post('/:id/change-vpn', nodeController.changeNodeVPN);

module.exports = router;
