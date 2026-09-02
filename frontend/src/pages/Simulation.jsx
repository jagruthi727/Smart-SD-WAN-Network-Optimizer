import React from 'react';
import { PlayCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export default function Simulation() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">SD-WAN Network Simulation</h2>
        <p className="text-slate-400 text-sm mt-1">
          Simulate traffic load variations, jitter spikes, and node failures to observe dynamic RNSR rerouting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <PlayCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Traffic Load Scenario</h3>
              <p className="text-xs text-slate-400">Inject artificial latency delays into selected relay links.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Allows testing how the algorithm dynamically switches relay paths when Chicago or Dallas links experience congestion.
          </p>
          <div className="pt-2">
            <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded text-xs border border-slate-700">
              Simulation Preset: Standard Traffic
            </span>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Node Failure Scenario</h3>
              <p className="text-xs text-slate-400">Simulate link drops and relay node downtime.</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tests resilience of the Relay Node Selection process when a primary relay node becomes unreachable.
          </p>
          <div className="pt-2">
            <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded text-xs border border-slate-700">
              Status: Idle (Ready)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
