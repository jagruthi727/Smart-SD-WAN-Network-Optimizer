import React from 'react';
import { LayoutDashboard, Network, Sliders, PlayCircle, BarChart3 } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'topology', label: 'Network Topology', icon: Network },
    { id: 'optimization', label: 'Optimization', icon: Sliders },
    { id: 'simulation', label: 'Simulation', icon: PlayCircle },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-slate-900/50 border-r border-slate-800 p-4 flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-800 text-xs text-slate-400">
        <p className="font-semibold text-slate-300">CAD College Project</p>
        <p className="mt-1">Concept: Relay Node Selection & Routing (RNSR)</p>
      </div>
    </aside>
  );
}
