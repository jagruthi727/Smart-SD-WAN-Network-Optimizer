import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Network, Server, Trash2 } from 'lucide-react';

export default function CustomNode({ id, data, selected }) {
  const isAccess = data.nodeType === 'access';
  const label = data.label || id;
  const onDelete = data.onDelete;

  return (
    <div
      className={`min-w-[160px] px-4 py-3 rounded-xl border shadow-lg transition-all relative group ${
        selected
          ? 'ring-2 ring-cyan-400 border-cyan-400'
          : isAccess
          ? 'bg-slate-900 border-cyan-500/40 text-slate-100'
          : 'bg-slate-900 border-purple-500/40 text-slate-100'
      }`}
    >
      {/* Input Handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-cyan-400 !border-2 !border-slate-900"
      />

      {/* Node Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {isAccess ? (
            <Network className="w-4 h-4 text-cyan-400" />
          ) : (
            <Server className="w-4 h-4 text-purple-400" />
          )}
          <span className="font-bold text-sm text-white tracking-wide">{label}</span>
        </div>

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            title="Delete Node"
            className="opacity-60 hover:opacity-100 hover:text-rose-400 p-1 text-slate-400 transition-opacity"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Node Type Badge */}
      <div className="mt-2 flex items-center justify-between">
        <span
          className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${
            isAccess
              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
          }`}
        >
          {isAccess ? 'Access Node' : 'Relay / Core'}
        </span>
      </div>

      {/* Output Handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-purple-400 !border-2 !border-slate-900"
      />
    </div>
  );
}
