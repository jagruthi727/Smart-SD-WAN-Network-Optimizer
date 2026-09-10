/**
 * Module 3.3 - Latency Calculator
 * -----------------------------------------------------------------------
 * Sums the per-link latency along a path to obtain the end-to-end (E2E)
 * transmission delay, which is the quantity checked against the SLA
 * threshold (L_max) in the next stage.
 */

export function calculatePathLatency(path) {
    const totalLatency = path.links.reduce((sum, link) => sum + Number(link.latency || 0), 0);
    return { ...path, totalLatency, hopCount: path.links.length };
  }
  
  export function calculateAllLatencies(paths) {
    return paths.map(calculatePathLatency);
  }