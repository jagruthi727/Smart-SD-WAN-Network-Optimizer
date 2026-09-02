import React, { useState, useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import CustomNode from '../components/CustomNode';
import { defaultNodes, defaultEdges, defaultSLA } from '../data/mockNetworkData';
import { findRnsrRoutes, getHighlightedElements } from '../utils/rnsrAlgorithm';
import { Sliders, Zap, ShieldCheck, AlertCircle, CheckCircle2, Play, TestTube2, ArrowRight, Layers, Clock } from 'lucide-react';

export default function Optimization() {
  // Network Graph State
  const [nodes] = useNodesState(defaultNodes);
  const [edges] = useEdgesState(defaultEdges);

  // Configuration Form State
  const [sourceId, setSourceId] = useState('A1');
  const [destinationId, setDestinationId] = useState('A3');
  const [slaLimit, setSlaLimit] = useState(defaultSLA);

  // Active Highlighted Route State
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  // Results State
  const [optimizationResult, setOptimizationResult] = useState(() =>
    findRnsrRoutes({
      nodes: defaultNodes,
      edges: defaultEdges,
      sourceId: 'A1',
      destinationId: 'A3',
      slaLimit: defaultSLA,
    })
  );

  const nodeTypes = useMemo(() => ({ networkNode: CustomNode }), []);

  // Run RNSR Optimization Action
  const handleRunOptimization = useCallback(
    (overrideSource, overrideDest, overrideSla) => {
      const src = overrideSource !== undefined ? overrideSource : sourceId;
      const dst = overrideDest !== undefined ? overrideDest : destinationId;
      const sla = overrideSla !== undefined ? overrideSla : slaLimit;

      const result = findRnsrRoutes({
        nodes,
        edges,
        sourceId: src,
        destinationId: dst,
        slaLimit: sla,
      });

      setOptimizationResult(result);
      setSelectedRouteId(null); // Reset manually selected path to display RNSR optimal
    },
    [nodes, edges, sourceId, destinationId, slaLimit]
  );

  // Preset Test Case Handlers
  const runTestCase = (src, dst, sla) => {
    setSourceId(src);
    setDestinationId(dst);
    setSlaLimit(sla);
    handleRunOptimization(src, dst, sla);
  };

  // Determine active route for visualization highlight
  const activeRouteToHighlight = useMemo(() => {
    if (!optimizationResult || optimizationResult.error) return null;
    if (selectedRouteId) {
      return optimizationResult.allPaths?.find((p) => p.pathId === selectedRouteId) || null;
    }
    return optimizationResult.optimizedPath || optimizationResult.minLatencyPath || null;
  }, [optimizationResult, selectedRouteId]);

  // Compute highlighted nodes & edges for React Flow canvas
  const { highlightedNodes, highlightedEdges } = useMemo(() => {
    return getHighlightedElements(nodes, edges, activeRouteToHighlight);
  }, [nodes, edges, activeRouteToHighlight]);

  const { optimizedPath, minLatencyPath, allPaths, slaViolationMsg, error } = optimizationResult || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Module 2: Route Optimization (RNSR Engine)</h2>
        <p className="text-slate-400 text-sm mt-1">
          Select Source and Destination nodes, configure max latency constraints, and compute optimal relay-minimized routes.
        </p>
      </div>

      {/* Manual Test Scenarios Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          <TestTube2 className="w-4 h-4" />
          Quick Test Scenarios / Manual Test Cases:
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => runTestCase('A1', 'A3', 60)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Test 1: Standard RNSR (A1 → A3, 60ms)
          </button>
          <button
            onClick={() => runTestCase('A1', 'A3', 20)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Test 2: Strict SLA Violation (A1 → A3, 20ms)
          </button>
          <button
            onClick={() => runTestCase('A1', 'A1', 60)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            Test 3: Same Node Error (A1 → A1)
          </button>
          <button
            onClick={() => runTestCase('A2', 'A3', 50)}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            Test 4: Multi-Relay Path (A2 → A3, 50ms)
          </button>
        </div>
      </div>

      {/* Main Grid: Control Panel & Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sliders className="w-5 h-5 text-cyan-400" />
              Optimization Parameters
            </h3>

            {/* Source Node Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                1. Source Node
              </label>
              <select
                value={sourceId}
                onChange={(e) => setSourceId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {nodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.data?.label || n.id} ({n.data?.nodeType === 'relay' ? 'Relay' : 'Access'})
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Node Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                2. Destination Node
              </label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                {nodes.map((n) => (
                  <option key={n.id} value={n.id}>
                    {n.data?.label || n.id} ({n.data?.nodeType === 'relay' ? 'Relay' : 'Access'})
                  </option>
                ))}
              </select>
            </div>

            {/* SLA Max Latency Selection */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <span>3. SLA Max Latency Limit (L_max)</span>
                <span className="text-amber-400 font-bold">{slaLimit} ms</span>
              </div>
              <input
                type="number"
                min="5"
                max="300"
                value={slaLimit}
                onChange={(e) => setSlaLimit(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button
            onClick={() => handleRunOptimization()}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            Run RNSR Optimization Algorithm
          </button>
        </div>

        {/* Visual Canvas Panel */}
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden min-h-[380px] flex flex-col relative">
          <div className="px-4 py-3 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-200">Active Topology & Optimized Route Visualizer</span>
            {activeRouteToHighlight && (
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                Highlighted Route: {activeRouteToHighlight.nodes.join(' → ')} ({activeRouteToHighlight.totalLatency} ms)
              </span>
            )}
          </div>

          <div className="flex-1 min-h-[320px] relative">
            <ReactFlow nodes={highlightedNodes} edges={highlightedEdges} nodeTypes={nodeTypes} fitView>
              <Background color="#334155" gap={16} />
              <Controls className="bg-slate-800 border-slate-700 text-white" />
            </ReactFlow>
          </div>
        </div>
      </div>

      {/* Error Alert Box */}
      {(error || slaViolationMsg) && (
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-rose-200 block">Optimization Execution Error / Constraint Violation</span>
            <p className="text-xs text-rose-300 mt-0.5">{error || slaViolationMsg}</p>
          </div>
        </div>
      )}

      {/* Comparison Cards: RNSR Optimized vs Min-Latency */}
      {allPaths && allPaths.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RNSR Optimized Route Card */}
          <div
            className={`bg-slate-900/60 border rounded-xl p-5 space-y-3 relative overflow-hidden ${
              optimizedPath
                ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                : 'border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">RNSR Optimized Route</h3>
              </div>
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Primary Selection
              </span>
            </div>

            {optimizedPath ? (
              <div className="space-y-3">
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-sm text-emerald-300 font-semibold flex items-center justify-between">
                  <span>{optimizedPath.nodes.join(' → ')}</span>
                  <span className="text-xs font-sans text-slate-400">{optimizedPath.totalLatency} ms</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-800/40 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Latency</span>
                    <span className="font-bold text-white text-sm">{optimizedPath.totalLatency} ms</span>
                  </div>
                  <div className="p-2 bg-slate-800/40 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Relay Nodes</span>
                    <span className="font-bold text-purple-400 text-sm">{optimizedPath.relayCount}</span>
                  </div>
                  <div className="p-2 bg-slate-800/40 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">SLA Status</span>
                    <span className="font-bold text-emerald-400 text-sm">COMPLIANT</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Guarantees SLA constraint (\(\le {slaLimit}\) ms) while minimizing intermediate relay node overhead ({optimizedPath.relayCount} relay hop{optimizedPath.relayCount === 1 ? '' : 's'}).
                </p>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500">
                No route satisfies the SLA latency constraint of {slaLimit} ms.
              </div>
            )}
          </div>

          {/* Minimum-Latency Route Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">Absolute Minimum-Latency Route</h3>
              </div>
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Comparison Baseline
              </span>
            </div>

            {minLatencyPath ? (
              <div className="space-y-3">
                <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800 font-mono text-sm text-cyan-300 font-semibold flex items-center justify-between">
                  <span>{minLatencyPath.nodes.join(' → ')}</span>
                  <span className="text-xs font-sans text-slate-400">{minLatencyPath.totalLatency} ms</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-800/40 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Latency</span>
                    <span className="font-bold text-cyan-400 text-sm">{minLatencyPath.totalLatency} ms</span>
                  </div>
                  <div className="p-2 bg-slate-800/40 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Relay Nodes</span>
                    <span className="font-bold text-purple-400 text-sm">{minLatencyPath.relayCount}</span>
                  </div>
                  <div className="p-2 bg-slate-800/40 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">SLA Status</span>
                    <span
                      className={`font-bold text-sm ${
                        minLatencyPath.isSlaCompliant ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {minLatencyPath.isSlaCompliant ? 'COMPLIANT' : 'EXCEEDED'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Identifies the shortest latency path regardless of intermediate relay node count or SLA compliance.
                </p>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500">No paths discovered.</div>
            )}
          </div>
        </div>
      )}

      {/* Discovered Paths Comparison Table */}
      {allPaths && allPaths.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Discovered Paths Evaluation Table ({allPaths.length})</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                All simple paths evaluated by the RNSR engine against SLA limit ({slaLimit} ms).
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 uppercase text-[10px] font-bold text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Path ID</th>
                  <th className="py-3 px-4">Path Sequence</th>
                  <th className="py-3 px-4">Total Latency</th>
                  <th className="py-3 px-4">Relay Hops</th>
                  <th className="py-3 px-4">SLA Validation</th>
                  <th className="py-3 px-4">Optimization Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {allPaths.map((path) => {
                  const isRNSR = optimizedPath && optimizedPath.pathId === path.pathId;
                  const isMinLatency = minLatencyPath && minLatencyPath.pathId === path.pathId;
                  const isSelected = activeRouteToHighlight?.pathId === path.pathId;

                  return (
                    <tr
                      key={path.pathId}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        isSelected ? 'bg-slate-800/60' : ''
                      }`}
                    >
                      <td className="py-3 px-4 font-mono font-semibold text-slate-400">{path.pathId}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">{path.nodes.join(' → ')}</td>
                      <td className="py-3 px-4 font-semibold text-slate-200">{path.totalLatency} ms</td>
                      <td className="py-3 px-4 text-purple-400 font-bold">{path.relayCount}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${
                            path.isSlaCompliant
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          {path.isSlaCompliant ? 'COMPLIANT' : 'EXCEEDED'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {isRNSR ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold text-[10px] border border-emerald-500/40">
                            ★ RNSR OPTIMAL
                          </span>
                        ) : isMinLatency ? (
                          <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold text-[10px] border border-cyan-500/40">
                            MIN LATENCY
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedRouteId(path.pathId)}
                          className={`px-2.5 py-1 text-[11px] font-semibold rounded transition-colors ${
                            isSelected
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                        >
                          {isSelected ? 'Highlighted' : 'Visualize'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
