import express from 'express';
import { initialNetworkTopology } from '../data/index.js';

const router = express.Router();

// GET /api/topology - Retrieve initial network topology placeholder
router.get('/topology', (req, res) => {
  res.json({
    success: true,
    data: initialNetworkTopology
  });
});

// GET /api/status - Retrieve system status placeholder
router.get('/status', (req, res) => {
  res.json({
    success: true,
    status: 'System ready for RNSR optimization',
    nodesCount: initialNetworkTopology.nodes.length,
    linksCount: initialNetworkTopology.links.length
  });
});

export default router;
