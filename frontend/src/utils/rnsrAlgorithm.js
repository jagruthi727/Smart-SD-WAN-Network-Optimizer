/**
 * Relay Node Selection & Routing (RNSR) Algorithm
 * 
 * Objectives:
 * 1. Find all simple paths from Source to Destination.
 * 2. Calculate Total Latency and Intermediate Relay Node Count for each path.
 * 3. Filter paths satisfying SLA Constraint: Total Latency <= SLA Limit (L_max).
 * 4. Select RNSR Optimized Path: Minimize Relay Nodes, then minimize Latency.
 * 5. Compare with Absolute Minimum Latency Path.
 */

export function findRnsrRoutes({ nodes, edges, sourceId, destinationId, slaLimit }) {
  // Input Validations
  if (!sourceId || !destinationId) {
    return { error: 'Please select both Source and Destination nodes.' };
  }

  if (sourceId === destinationId) {
    return { error: 'Source and Destination nodes must be distinct.' };
  }

  if (!nodes || nodes.length === 0) {
    return { error: 'Network graph has no nodes.' };
  }

  // Node Map for Type Lookup
  const nodeMap = new Map();
  nodes.forEach(n => nodeMap.set(n.id, n));

  if (!nodeMap.has(sourceId) || !nodeMap.has(destinationId)) {
    return { error: 'Selected source or destination node does not exist in topology.' };
  }

  // Build Undirected Adjacency List
  const adj = new Map();
  nodes.forEach(n => adj.set(n.id, []));

  edges.forEach(e => {
    const latency = Number(e.data?.latency || e.label?.replace(/[^0-9.]/g, '') || 10);
    if (adj.has(e.source) && adj.has(e.target)) {
      adj.get(e.source).push({ neighbor: e.target, latency, edgeId: e.id });
      adj.get(e.target).push({ neighbor: e.source, latency, edgeId: e.id });
    }
  });

  // Discover All Simple Paths via DFS
  const allPaths = [];

  function dfs(currentNode, targetNode, visited, currentPathNodes, currentEdges, currentLatency) {
    if (currentNode === targetNode) {
      // Calculate Intermediate Relay Node Count (excluding Source and Destination)
      const intermediateNodes = currentPathNodes.slice(1, -1);
      const relayCount = intermediateNodes.filter(nodeId => {
        const nodeObj = nodeMap.get(nodeId);
        return nodeObj?.data?.nodeType === 'relay' || nodeId.startsWith('R');
      }).length;

      const isSlaCompliant = currentLatency <= Number(slaLimit);

      allPaths.push({
        pathId: `path-${allPaths.length + 1}`,
        nodes: [...currentPathNodes],
        edges: [...currentEdges],
        totalLatency: currentLatency,
        relayCount,
        isSlaCompliant,
        hopCount: currentEdges.length
      });
      return;
    }

    visited.add(currentNode);

    const neighbors = adj.get(currentNode) || [];
    for (const edge of neighbors) {
      if (!visited.has(edge.neighbor)) {
        dfs(
          edge.neighbor,
          targetNode,
          visited,
          [...currentPathNodes, edge.neighbor],
          [...currentEdges, edge.edgeId],
          currentLatency + edge.latency
        );
      }
    }

    visited.delete(currentNode);
  }

  const visitedSet = new Set();
  dfs(sourceId, destinationId, visitedSet, [sourceId], [], 0);

  if (allPaths.length === 0) {
    return {
      error: `No route exists between "${nodeMap.get(sourceId)?.data?.label || sourceId}" and "${nodeMap.get(destinationId)?.data?.label || destinationId}".`
    };
  }

  // Identify Absolute Minimum Latency Path
  const sortedByLatency = [...allPaths].sort((a, b) => a.totalLatency - b.totalLatency);
  const minLatencyPath = sortedByLatency[0];

  // Filter SLA Compliant Paths
  const compliantPaths = allPaths.filter(p => p.isSlaCompliant);

  let optimizedPath = null;
  let slaViolationMsg = null;

  if (compliantPaths.length === 0) {
    slaViolationMsg = `Discovered ${allPaths.length} route(s), but NONE satisfy the SLA constraint (Max Latency <= ${slaLimit} ms). Minimum latency available is ${minLatencyPath.totalLatency} ms.`;
  } else {
    // RNSR Optimization Order:
    // Primary: Minimize Relay Node Hops
    // Secondary: Minimize Total Latency (Tie-breaker)
    const sortedRnsr = [...compliantPaths].sort((a, b) => {
      if (a.relayCount !== b.relayCount) {
        return a.relayCount - b.relayCount;
      }
      return a.totalLatency - b.totalLatency;
    });
    optimizedPath = sortedRnsr[0];
  }

  return {
    allPaths,
    compliantPathsCount: compliantPaths.length,
    optimizedPath,
    minLatencyPath,
    slaViolationMsg,
    slaLimit: Number(slaLimit)
  };
}

/**
 * Generates styled React Flow nodes and edges highlighting the active route.
 */
export function getHighlightedElements(nodes, edges, activeRoute) {
  const activeEdgeIds = new Set(activeRoute?.edges || []);
  const activeNodeIds = new Set(activeRoute?.nodes || []);

  const highlightedNodes = nodes.map(node => {
    const isHighlighted = activeNodeIds.has(node.id);
    return {
      ...node,
      style: {
        ...node.style,
        border: isHighlighted ? '3px solid #10b981' : undefined,
        boxShadow: isHighlighted ? '0 0 15px rgba(16, 185, 129, 0.4)' : undefined,
        opacity: activeRoute && !isHighlighted ? 0.4 : 1
      }
    };
  });

  const highlightedEdges = edges.map(edge => {
    const isHighlighted = activeEdgeIds.has(edge.id);
    return {
      ...edge,
      animated: isHighlighted,
      style: {
        ...edge.style,
        stroke: isHighlighted ? '#10b981' : '#475569',
        strokeWidth: isHighlighted ? 3.5 : 1.5,
        opacity: activeRoute && !isHighlighted ? 0.3 : 1
      }
    };
  });

  return { highlightedNodes, highlightedEdges };
}
