import { runRouteOptimization } from '../backend/services/routeOptimizationEngine.js';
import { initialNetworkTopology } from '../backend/data/index.js';

console.log('=== MODULE 3 ROUTE OPTIMIZATION ENGINE VERIFICATION ===\n');

// Test 1: Standard topology, generous SLA
console.log('--- Test 1: SRC -> DST, SLA = 60ms ---');
const r1 = runRouteOptimization({ ...initialNetworkTopology, sourceId: 'SRC', destinationId: 'DST', slaLimit: 60 });
console.log('Paths discovered:', r1.allPaths.length, '| SLA compliant:', r1.compliantPathsCount);
console.log('Optimized route:', r1.optimizedPath.nodeIds.join(' -> '), '| latency:', r1.optimizedPath.totalLatency, 'ms | relays:', r1.optimizedPath.relayCount, '| cost: $' + r1.optimizedPath.totalCost);
console.log('Min-latency route:', r1.minLatencyPath.nodeIds.join(' -> '), '| latency:', r1.minLatencyPath.totalLatency, 'ms');
console.log('Statistics:', r1.statistics);

// Test 2: Strict SLA -> should violate
console.log('\n--- Test 2: SRC -> DST, SLA = 20ms (strict, should violate) ---');
const r2 = runRouteOptimization({ ...initialNetworkTopology, sourceId: 'SRC', destinationId: 'DST', slaLimit: 20 });
console.log('Optimized route:', r2.optimizedPath, '| Violation msg:', r2.slaViolationMsg);

// Test 3: Same source/destination -> should throw a clean error
console.log('\n--- Test 3: SRC -> SRC (invalid) ---');
try {
  runRouteOptimization({ ...initialNetworkTopology, sourceId: 'SRC', destinationId: 'SRC', slaLimit: 60 });
} catch (e) {
  console.log('Caught expected error:', e.message);
}

// Test 4: Unknown node -> should throw
console.log('\n--- Test 4: Unknown node "ZZZ" (invalid) ---');
try {
  runRouteOptimization({ ...initialNetworkTopology, sourceId: 'SRC', destinationId: 'ZZZ', slaLimit: 60 });
} catch (e) {
  console.log('Caught expected error:', e.message);
}

// Test 5: Cost tie-breaker - two equal-relay-count, SLA-compliant paths, engine should pick cheaper one
console.log('\n--- Test 5: Cost-optimization tie-break scenario ---');
const nodes = [
  { id: 'A', type: 'source' },
  { id: 'R1', type: 'relay', monthlyCost: 500 },
  { id: 'R2', type: 'relay', monthlyCost: 100 },
  { id: 'B', type: 'destination' }
];
const links = [
  { id: 'e1', source: 'A', target: 'R1', latency: 10, cost: 20 },
  { id: 'e2', source: 'R1', target: 'B', latency: 10, cost: 20 },
  { id: 'e3', source: 'A', target: 'R2', latency: 15, cost: 20 },
  { id: 'e4', source: 'R2', target: 'B', latency: 15, cost: 20 }
];
const r5 = runRouteOptimization({ nodes, links, sourceId: 'A', destinationId: 'B', slaLimit: 60 });
r5.allPaths.forEach(p => console.log(p.nodeIds.join(' -> '), '| latency:', p.totalLatency, '| relays:', p.relayCount, '| cost: $' + p.totalCost));
console.log('=> Optimized (should route via cheaper R2 despite higher latency):', r5.optimizedPath.nodeIds.join(' -> '), '| cost: $' + r5.optimizedPath.totalCost);