import { findRnsrRoutes } from '../frontend/src/utils/rnsrAlgorithm.js';
import { defaultNodes, defaultEdges } from '../frontend/src/data/mockNetworkData.js';

console.log('=== MODULE 2 ALGORITHM VERIFICATION ===\n');

// Test 1: Standard RNSR
console.log('--- Test Case 1: Standard RNSR (A1 -> A3, SLA = 60ms) ---');
const res1 = findRnsrRoutes({ nodes: defaultNodes, edges: defaultEdges, sourceId: 'A1', destinationId: 'A3', slaLimit: 60 });
console.log('Discovered Paths:', res1.allPaths.length);
console.log('Optimized Path:', res1.optimizedPath.nodes.join(' -> '), '| Latency:', res1.optimizedPath.totalLatency, 'ms | Relays:', res1.optimizedPath.relayCount);
console.log('Min Latency Path:', res1.minLatencyPath.nodes.join(' -> '), '| Latency:', res1.minLatencyPath.totalLatency, 'ms | Relays:', res1.minLatencyPath.relayCount);

// Test 2: Strict SLA Violation
console.log('\n--- Test Case 2: Strict SLA (A1 -> A3, SLA = 20ms) ---');
const res2 = findRnsrRoutes({ nodes: defaultNodes, edges: defaultEdges, sourceId: 'A1', destinationId: 'A3', slaLimit: 20 });
console.log('Violation Error:', res2.slaViolationMsg);

// Test 3: Same Node Error
console.log('\n--- Test Case 3: Same Node Error (A1 -> A1) ---');
const res3 = findRnsrRoutes({ nodes: defaultNodes, edges: defaultEdges, sourceId: 'A1', destinationId: 'A1', slaLimit: 60 });
console.log('Error Message:', res3.error);

// Test 4: Multi-Relay Path
console.log('\n--- Test Case 4: Multi-Relay (A2 -> A3, SLA = 50ms) ---');
const res4 = findRnsrRoutes({ nodes: defaultNodes, edges: defaultEdges, sourceId: 'A2', destinationId: 'A3', slaLimit: 50 });
console.log('Optimized Path:', res4.optimizedPath.nodes.join(' -> '), '| Latency:', res4.optimizedPath.totalLatency, 'ms | Relays:', res4.optimizedPath.relayCount);
