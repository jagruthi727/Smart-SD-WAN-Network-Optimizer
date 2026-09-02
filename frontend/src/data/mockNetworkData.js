/**
 * Default Sample Network Topology Data (Module 1)
 * Includes: Access A1, Access A2, Relay R1, Relay R2, Access A3
 */

export const defaultNodes = [
  {
    id: 'A1',
    type: 'networkNode',
    position: { x: 80, y: 100 },
    data: { label: 'Access A1', nodeType: 'access' }
  },
  {
    id: 'A2',
    type: 'networkNode',
    position: { x: 80, y: 260 },
    data: { label: 'Access A2', nodeType: 'access' }
  },
  {
    id: 'R1',
    type: 'networkNode',
    position: { x: 360, y: 100 },
    data: { label: 'Relay R1', nodeType: 'relay' }
  },
  {
    id: 'R2',
    type: 'networkNode',
    position: { x: 360, y: 260 },
    data: { label: 'Relay R2', nodeType: 'relay' }
  },
  {
    id: 'A3',
    type: 'networkNode',
    position: { x: 640, y: 180 },
    data: { label: 'Access A3', nodeType: 'access' }
  }
];

export const defaultEdges = [
  {
    id: 'e-A1-R1',
    source: 'A1',
    target: 'R1',
    label: '15 ms',
    data: { latency: 15 },
    style: { stroke: '#38bdf8', strokeWidth: 2 }
  },
  {
    id: 'e-A2-R1',
    source: 'A2',
    target: 'R1',
    label: '20 ms',
    data: { latency: 20 },
    style: { stroke: '#38bdf8', strokeWidth: 2 }
  },
  {
    id: 'e-R1-R2',
    source: 'R1',
    target: 'R2',
    label: '12 ms',
    data: { latency: 12 },
    style: { stroke: '#a855f7', strokeWidth: 2 }
  },
  {
    id: 'e-R1-A3',
    source: 'R1',
    target: 'A3',
    label: '25 ms',
    data: { latency: 25 },
    style: { stroke: '#38bdf8', strokeWidth: 2 }
  },
  {
    id: 'e-R2-A3',
    source: 'R2',
    target: 'A3',
    label: '18 ms',
    data: { latency: 18 },
    style: { stroke: '#38bdf8', strokeWidth: 2 }
  }
];

export const defaultSLA = 60; // Max allowed end-to-end latency in ms
