import { findRnsrRoutes } from '../frontend/src/utils/rnsrAlgorithm.js';

const tradeoffNodes = [
  { id: 'A1', type: 'networkNode', data: { label: 'Access A1', nodeType: 'access' }, position: { x: 50, y: 150 } },
  { id: 'R1', type: 'networkNode', data: { label: 'Relay R1', nodeType: 'relay' }, position: { x: 250, y: 80 } },
  { id: 'R2', type: 'networkNode', data: { label: 'Relay R2', nodeType: 'relay' }, position: { x: 450, y: 80 } },
  { id: 'A3', type: 'networkNode', data: { label: 'Access A3', nodeType: 'access' }, position: { x: 650, y: 150 } }
];

const tradeoffEdges = [
  { id: 'e-a1-r1', source: 'A1', target: 'R1', label: '10 ms', data: { latency: 10 }, style: { stroke: '#38bdf8', strokeWidth: 2 } },
  { id: 'e-r1-a3', source: 'R1', target: 'A3', label: '40 ms', data: { latency: 40 }, style: { stroke: '#38bdf8', strokeWidth: 2 } }, // Route 1: A1->R1->A3 = 50ms, 1 relay
  { id: 'e-r1-r2', source: 'R1', target: 'R2', label: '15 ms', data: { latency: 15 }, style: { stroke: '#a855f7', strokeWidth: 2 } },
  { id: 'e-r2-a3', source: 'R2', target: 'A3', label: '15 ms', data: { latency: 15 }, style: { stroke: '#a855f7', strokeWidth: 2 } }  // Route 2: A1->R1->R2->A3 = 40ms, 2 relays
];

const res = findRnsrRoutes({
  nodes: tradeoffNodes,
  edges: tradeoffEdges,
  sourceId: 'A1',
  destinationId: 'A3',
  slaLimit: 60
});

console.log('=== DETERMINISTIC RNSR TRADEOFF TEST ===\n');
console.log('Discovered Paths Count:', res.allPaths.length);

console.log('\n--- Discovered Paths ---');
res.allPaths.forEach(p => {
  console.log(`Path: ${p.nodes.join(' -> ')} | Latency: ${p.totalLatency} ms | Relays: ${p.relayCount} | SLA Compliant: ${p.isSlaCompliant}`);
});

console.log('\n--- RNSR Optimized Route ---');
console.log(`Path: ${res.optimizedPath.nodes.join(' -> ')} | Latency: ${res.optimizedPath.totalLatency} ms | Relays: ${res.optimizedPath.relayCount}`);

console.log('\n--- Min-Latency Baseline Route ---');
console.log(`Path: ${res.minLatencyPath.nodes.join(' -> ')} | Latency: ${res.minLatencyPath.totalLatency} ms | Relays: ${res.minLatencyPath.relayCount}`);
