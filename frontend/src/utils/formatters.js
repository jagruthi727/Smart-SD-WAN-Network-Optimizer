/**
 * Utility functions for Smart SD-WAN Optimizer
 */

export const formatLatency = (ms) => {
  if (ms === undefined || ms === null) return 'N/A';
  return `${ms} ms`;
};

export const formatBandwidth = (mbps) => {
  if (mbps === undefined || mbps === null) return 'N/A';
  return `${mbps} Mbps`;
};

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'optimal':
    case 'online':
      return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    case 'warning':
    case 'suboptimal':
      return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'error':
    case 'offline':
      return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    default:
      return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
};
