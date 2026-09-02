import React from 'react';
import { Network, Activity, Cpu } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 text-cyan-400">
          <Network className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            Smart SD-WAN Network Optimizer
            <span className="px-2 py-0.5 text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">
              RNSR Architecture
            </span>
          </h1>
          <p className="text-xs text-slate-400">Relay Node Selection & Latency-Constrained Routing</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-xs bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-700/50">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-slate-300">Engine Status:</span>
          <span className="font-semibold text-emerald-400">Ready</span>
        </div>
        <div className="flex items-center space-x-2 text-xs bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-700/50">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-300">Cloud SD-WAN Controller</span>
        </div>
      </div>
    </header>
  );
}
