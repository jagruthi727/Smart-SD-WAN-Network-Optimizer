/**
 * Module 3.2 - Relay Node Selection
 * -----------------------------------------------------------------------
 * Classifies the intermediate nodes on a discovered path as relay nodes
 * (as opposed to the source/destination access points) and annotates the
 * relay count/ids, since minimizing relay node usage is the RNSR paper's
 * primary optimization objective.
 */

export function annotatePathRelays(path, nodeMap) {
    const intermediateIds = path.nodeIds.slice(1, -1);
    const relayIds = intermediateIds.filter((id) => nodeMap.get(id)?.type === 'relay');
  
    return {
      ...path,
      relayIds,
      relayCount: relayIds.length
    };
  }
  
  export function annotateAllPaths(paths, nodeMap) {
    return paths.map((p) => annotatePathRelays(p, nodeMap));
  }