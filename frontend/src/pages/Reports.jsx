import React from 'react';
import { BarChart3, FileText, CheckCircle2 } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Performance Reports & Viva Summary</h2>
        <p className="text-slate-400 text-sm mt-1">
          Comparative analytics comparing direct routing vs. Relay Node Selection & Routing (RNSR).
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          Project Architecture Key Points for Viva
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50 space-y-2">
            <span className="text-cyan-400 font-semibold text-sm">1. Problem Statement</span>
            <p className="text-xs text-slate-300">
              Direct cloud connections can experience unpredicted latency variations. RNSR optimizes paths by selecting minimal relay nodes under strict latency constraints.
            </p>
          </div>
          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50 space-y-2">
            <span className="text-emerald-400 font-semibold text-sm">2. Core Objective</span>
            <p className="text-xs text-slate-300">
              Guarantee end-to-end delay ≤ SLA threshold (e.g. 60ms) while minimizing unnecessary relay hops to reduce processing delay.
            </p>
          </div>
          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50 space-y-2">
            <span className="text-indigo-400 font-semibold text-sm">3. Tech Stack Choice</span>
            <p className="text-xs text-slate-300">
              Modular decoupled architecture: React + Vite + Tailwind frontend for intuitive visualization, Node.js + Express backend for light API services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
