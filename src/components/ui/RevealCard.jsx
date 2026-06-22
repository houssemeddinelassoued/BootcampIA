import { useState } from 'react';

export default function RevealCard({ label, children, color = 'violet' }) {
  const [open, setOpen] = useState(false);

  const colors = {
    violet:  'border-violet-500/40 bg-violet-900/20',
    blue:    'border-blue-500/40 bg-blue-900/20',
    orange:  'border-orange-500/40 bg-orange-900/20',
    emerald: 'border-emerald-500/40 bg-emerald-900/20',
    amber:   'border-amber-500/40 bg-amber-900/20',
    red:     'border-red-500/40 bg-red-900/20',
  };

  return (
    <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${open ? colors[color] || colors.violet : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left"
        aria-expanded={open}
      >
        <span className="font-medium text-slate-200">{label}</span>
        <span className={`text-xl transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="px-5 pb-4 animate-fade-in text-slate-300 text-sm leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}
