import React from 'react';
import { Server, Activity, ShieldCheck, Zap, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total SD-WAN Relays', value: '4 Nodes', detail: 'Chicago, Dallas, Denver, Atlanta', icon: Server, color: 'text-cyan-400' },
    { title: 'Max Latency Constraint', value: '60 ms', detail: 'User Defined SLA Threshold', icon: Activity, color: 'text-amber-400' },
    { title: 'Estimated Route Latency', value: '53 ms', detail: 'SRC → R1 → R3 → DST', icon: Zap, color: 'text-emerald-400' },
    { title: 'Relay Node Reduction', value: '50%', detail: '2 Relays selected out of 4', icon: ShieldCheck, color: 'text-indigo-400' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">SD-WAN Control Center</h2>
        <p className="text-slate-400 text-sm mt-1">
          Overview of Relay Node Selection and Routing (RNSR) constraints & system telemetry.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{s.title}</span>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="mt-3 text-2xl font-bold text-white">{s.value}</div>
              <div className="mt-1 text-xs text-slate-400">{s.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
            Project Concept: RNSR
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            In modern SD-WAN architectures, finding an end-to-end path that guarantees low latency while minimizing total relay hops reduces data transmission overhead and cloud computing costs.
          </p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
              <span className="text-cyan-400 font-semibold text-sm">Constraint Satisfaction</span>
              <p className="text-xs text-slate-400 mt-1">End-to-End Latency ≤ Max Latency Constraint (L_max)</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-semibold text-sm">Objective Function</span>
              <p className="text-xs text-slate-400 mt-1">Minimize Total Relay Hops K while maintaining path stability.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Quick Actions</h3>
            <p className="text-slate-400 text-xs mb-4">Navigate to core optimization tools:</p>
            <div className="space-y-2">
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 flex items-center justify-between text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
                <span>View Full Topology Map</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 flex items-center justify-between text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer">
                <span>Configure Latency Constraints</span>
                <ArrowUpRight className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-500">
            Backend Connection: <span className="text-emerald-400 font-medium">http://localhost:5000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
