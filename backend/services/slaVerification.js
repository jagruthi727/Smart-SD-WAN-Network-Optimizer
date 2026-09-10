/**
 * Module 3.4 - SLA Verification
 * -----------------------------------------------------------------------
 * Flags each discovered path as SLA-compliant or not against the
 * configured maximum end-to-end latency (L_max), and summarizes overall
 * compliance for the batch of candidate paths.
 */

export function verifySlaCompliance(paths, slaLimit) {
    const limit = Number(slaLimit);
    return paths.map((p) => ({ ...p, isSlaCompliant: p.totalLatency <= limit }));
  }
  
  export function getComplianceSummary(paths, slaLimit) {
    const compliant = paths.filter((p) => p.isSlaCompliant);
    const minLatencyPath = paths.length
      ? [...paths].sort((a, b) => a.totalLatency - b.totalLatency)[0]
      : null;
  
    return {
      slaLimit: Number(slaLimit),
      totalPathsDiscovered: paths.length,
      compliantPathsCount: compliant.length,
      compliantPaths: compliant,
      minLatencyPath,
      slaViolationMsg:
        compliant.length === 0 && minLatencyPath
          ? `Discovered ${paths.length} route(s), but none satisfy the SLA constraint (Max Latency <= ${slaLimit} ms). Minimum latency available is ${minLatencyPath.totalLatency} ms.`
          : null
    };
  }