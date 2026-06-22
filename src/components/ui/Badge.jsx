export default function Badge({ children, color = 'slate', className = '' }) {
  const colors = {
    slate:   'bg-slate-700/60 border-slate-600/50 text-slate-300',
    violet:  'bg-violet-500/15 border-violet-500/30 text-violet-300',
    blue:    'bg-blue-500/15 border-blue-500/30 text-blue-300',
    orange:  'bg-orange-500/15 border-orange-500/30 text-orange-300',
    emerald: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
    amber:   'bg-amber-500/15 border-amber-500/30 text-amber-300',
    red:     'bg-red-500/15 border-red-500/30 text-red-300',
    green:   'bg-green-500/15 border-green-500/30 text-green-300',
  };
  return (
    <span className={`badge ${colors[color] || colors.slate} ${className}`}>
      {children}
    </span>
  );
}
