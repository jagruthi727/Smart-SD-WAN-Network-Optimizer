/**
 * Initial Network Topology Dataset
 * Represents SD-WAN Edge Routers, Gateway, and Relay Nodes.
 */

export const initialNetworkTopology = {
  nodes: [
    { id: 'SRC', label: 'Branch Office A (Source)', type: 'source', region: 'us-east' },
    { id: 'R1', label: 'Relay Node 1 (Chicago)', type: 'relay', latencyBase: 12 },
    { id: 'R2', label: 'Relay Node 2 (Dallas)', type: 'relay', latencyBase: 18 },
    { id: 'R3', label: 'Relay Node 3 (Denver)', type: 'relay', latencyBase: 25 },
    { id: 'R4', label: 'Relay Node 4 (Atlanta)', type: 'relay', latencyBase: 15 },
    { id: 'DST', label: 'HQ Cloud Gateway (Destination)', type: 'destination', region: 'us-west' }
  ],
  links: [
    { source: 'SRC', target: 'R1', latency: 15, bandwidth: 100 },
    { source: 'SRC', target: 'R2', latency: 22, bandwidth: 100 },
    { source: 'R1', target: 'R3', latency: 18, bandwidth: 100 },
    { source: 'R2', target: 'R4', latency: 12, bandwidth: 100 },
    { source: 'R3', target: 'DST', latency: 20, bandwidth: 100 },
    { source: 'R4', target: 'DST', latency: 28, bandwidth: 100 }
  ]
};
