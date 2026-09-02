import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import CustomNode from '../components/CustomNode';
import { defaultNodes, defaultEdges, defaultSLA } from '../data/mockNetworkData';
import { Plus, RotateCcw, Network, Server, Activity, Link2, Trash2, Clock } from 'lucide-react';

export default function NetworkTopology() {
  // React Flow Nodes & Edges State
  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);
  const [slaLimit, setSlaLimit] = useState(defaultSLA);

  // Form State for Adding New Node
  const [newNodeName, setNewNodeName] = useState('');
  const [newNodeType, setNewNodeType] = useState('access');

  // Connection Latency Modal State
  const [pendingConnection, setPendingConnection] = useState(null);
  const [connectionLatency, setConnectionLatency] = useState(15);
  const [showLatencyModal, setShowLatencyModal] = useState(false);

  // Define custom node types mapping
  const nodeTypes = useMemo(() => ({ networkNode: CustomNode }), []);

  // Delete node helper passed into custom nodes
  const handleDeleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    },
    [setNodes, setEdges]
  );

  // Attach onDelete callback to data of each node
  const nodesWithHandlers = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onDelete: handleDeleteNode,
      },
    }));
  }, [nodes, handleDeleteNode]);

  // Summary Metrics Calculation
  const totalNodes = nodes.length;
  const accessNodesCount = nodes.filter((n) => n.data.nodeType === 'access').length;
  const relayNodesCount = nodes.filter((n) => n.data.nodeType === 'relay').length;
  const totalLinks = edges.length;

  // Connection Creation Handler
  const onConnect = useCallback((connection) => {
    setPendingConnection(connection);
    setConnectionLatency(15);
    setShowLatencyModal(true);
  }, []);

  const confirmConnection = () => {
    if (!pendingConnection) return;
    const latencyVal = Number(connectionLatency) || 10;
    const newEdge = {
      id: `e-${pendingConnection.source}-${pendingConnection.target}-${Date.now()}`,
      source: pendingConnection.source,
      target: pendingConnection.target,
      label: `${latencyVal} ms`,
      data: { latency: latencyVal },
      style: {
        stroke: pendingConnection.source.startsWith('R') || pendingConnection.target.startsWith('R') ? '#a855f7' : '#38bdf8',
        strokeWidth: 2,
      },
    };
    setEdges((eds) => addEdge(newEdge, eds));
    setPendingConnection(null);
    setShowLatencyModal(false);
  };

  const cancelConnection = () => {
    setPendingConnection(null);
    setShowLatencyModal(false);
  };

  // Add New Node Handler
  const handleAddNode = (e) => {
    e.preventDefault();
    if (!newNodeName.trim()) return;

    const id = `Node_${Date.now().toString().slice(-4)}`;
    // Random staggered position near center of canvas
    const position = {
      x: 200 + Math.floor(Math.random() * 250),
      y: 100 + Math.floor(Math.random() * 200),
    };

    const newNode = {
      id,
      type: 'networkNode',
      position,
      data: {
        label: newNodeName.trim(),
        nodeType: newNodeType,
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setNewNodeName('');
  };

  // Reset Network Handler
  const handleResetNetwork = () => {
    setNodes(defaultNodes);
    setEdges(defaultEdges);
    setSlaLimit(defaultSLA);
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Header & Page Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Module 1: Network Configuration</h2>
          <p className="text-slate-400 text-sm mt-1">
            Configure access and relay nodes, establish connections with latency values, and set SLA threshold limits.
          </p>
        </div>
        <button
          onClick={handleResetNetwork}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors self-start md:self-auto"
        >
          <RotateCcw className="w-4 h-4 text-cyan-400" />
          Reset Network
        </button>
      </div>

      {/* Requirement 9: Summary Panel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Nodes</span>
            <Network className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-white mt-2">{totalNodes}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Access Nodes</span>
            <Network className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-400 mt-2">{accessNodesCount}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Relay / Core Nodes</span>
            <Server className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-purple-400 mt-2">{relayNodesCount}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Links</span>
            <Link2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-2">{totalLinks}</div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>SLA Latency Limit</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 mt-2">{slaLimit} ms</div>
        </div>
      </div>

      {/* Control Bar: Requirement 2 (Add Node) & Requirement 8 (SLA Configuration) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        {/* Add Node Form */}
        <form onSubmit={handleAddNode} className="lg:col-span-2 flex flex-wrap items-center gap-3">
          <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider min-w-[70px]">
            Add Node:
          </div>
          <input
            type="text"
            placeholder="e.g. Access A4 or Relay R3"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
            className="flex-1 min-w-[180px] bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <select
            value={newNodeType}
            onChange={(e) => setNewNodeType(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="access">Access Node</option>
            <option value="relay">Relay / Core Node</option>
          </select>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Node
          </button>
        </form>

        {/* SLA Configuration */}
        <div className="flex items-center gap-3 lg:border-l lg:border-slate-800 lg:pl-4 pt-3 lg:pt-0 border-t border-slate-800 lg:border-t-0">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider whitespace-nowrap">
            Max SLA Latency:
          </label>
          <div className="flex items-center gap-2 flex-1">
            <input
              type="number"
              min="1"
              max="500"
              value={slaLimit}
              onChange={(e) => setSlaLimit(Number(e.target.value) || 0)}
              className="w-24 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
            />
            <span className="text-xs text-slate-400">ms</span>
          </div>
        </div>
      </div>

      {/* Requirement 3, 4, 6, 7: Visual React Flow Canvas */}
      <div className="flex-1 min-h-[480px] bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden relative">
        <ReactFlow
          nodes={nodesWithHandlers}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background color="#334155" gap={16} />
          <Controls className="bg-slate-800 border-slate-700 text-white" />
        </ReactFlow>

        {/* User Hint overlay */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur border border-slate-800 px-4 py-2.5 rounded-lg text-xs text-slate-300 shadow-lg flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>Connect nodes by dragging handles</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            <span>Select node/edge & press Delete to remove</span>
          </div>
        </div>
      </div>

      {/* Requirement 5: Latency Input Modal upon edge creation */}
      {showLatencyModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Link2 className="w-5 h-5 text-cyan-400" />
              Set Connection Latency
            </h3>
            <p className="text-xs text-slate-400">
              Specify propagation delay (in milliseconds) for link between{' '}
              <span className="text-cyan-300 font-semibold">{pendingConnection?.source}</span> and{' '}
              <span className="text-cyan-300 font-semibold">{pendingConnection?.target}</span>.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Latency (ms)</label>
              <input
                type="number"
                min="1"
                max="1000"
                value={connectionLatency}
                onChange={(e) => setConnectionLatency(e.target.value)}
                autoFocus
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-400 font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={cancelConnection}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmConnection}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold rounded-lg transition-colors"
              >
                Add Connection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
