/**
 * Initial Network Topology Dataset
 * Represents SD-WAN Edge Routers, Gateway, and Relay Nodes.
 */

export const initialNetworkTopology = {
  nodes: [
    { id: 'SRC', label: 'Branch Office A (Source)', type: 'source', region: 'us-east' },
    { id: 'R1', label: 'Relay Node 1 (Chicago)', type: 'relay', latencyBase: 12, monthlyCost: 480 },
    { id: 'R2', label: 'Relay Node 2 (Dallas)', type: 'relay', latencyBase: 18, monthlyCost: 420 },
    { id: 'R3', label: 'Relay Node 3 (Denver)', type: 'relay', latencyBase: 25, monthlyCost: 560 },
    { id: 'R4', label: 'Relay Node 4 (Atlanta)', type: 'relay', latencyBase: 15, monthlyCost: 400 },
    { id: 'DST', label: 'HQ Cloud Gateway (Destination)', type: 'destination', region: 'us-west' }
  ],
  // monthlyCost on relay nodes = illustrative cloud-instance hosting cost (USD/mo).
  // cost on links = illustrative circuit / cross-region data-transfer cost (USD/mo).
  links: [
    { id: 'e1', source: 'SRC', target: 'R1', latency: 15, bandwidth: 100, cost: 60 },
    { id: 'e2', source: 'SRC', target: 'R2', latency: 22, bandwidth: 100, cost: 90 },
    { id: 'e3', source: 'R1', target: 'R3', latency: 18, bandwidth: 100, cost: 70 },
    { id: 'e4', source: 'R2', target: 'R4', latency: 12, bandwidth: 100, cost: 50 },
    { id: 'e5', source: 'R3', target: 'DST', latency: 20, bandwidth: 100, cost: 80 },
    { id: 'e6', source: 'R4', target: 'DST', latency: 28, bandwidth: 100, cost: 110 }
  ]
};