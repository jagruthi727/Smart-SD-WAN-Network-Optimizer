/**
 * Module 3.5 - Cost Optimization Engine
 * -----------------------------------------------------------------------
 * Estimates the operational cost of a candidate path: the hosting cost of
 * every relay node it uses, plus the circuit/data-transfer cost of every
 * link it crosses (this is the "operational cost" the RNSR paper's
 * abstract says relay-node count is a proxy for - here it is priced out
 * directly). It then selects the RNSR-optimal route among SLA-compliant
 * paths: fewest relay nodes first (paper's primary objective), lowest
 * cost second, lowest latency as the final tie-breaker.
 */

export function calculatePathCost(path, nodeMap) {
    const relayCost = path.relayIds.reduce(
      (sum, id) => sum + Number(nodeMap.get(id)?.monthlyCost || 0),
      0
    );
    const linkCost = path.links.reduce((sum, link) => sum + Number(link.cost || 0), 0);
    const totalCost = relayCost + linkCost;
  
    return { ...path, relayCost, linkCost, totalCost };
  }
  
  export function calculateAllCosts(paths, nodeMap) {
    return paths.map((p) => calculatePathCost(p, nodeMap));
  }
  
  export function selectOptimalRoute(compliantPaths) {
    if (!compliantPaths || compliantPaths.length === 0) return null;
  
    const sorted = [...compliantPaths].sort((a, b) => {
      if (a.relayCount !== b.relayCount) return a.relayCount - b.relayCount; // 1. fewest relays
      if (a.totalCost !== b.totalCost) return a.totalCost - b.totalCost;     // 2. lowest cost
      return a.totalLatency - b.totalLatency;                                 // 3. lowest latency
    });
  
    return sorted[0];
  }