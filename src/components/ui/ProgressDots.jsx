const DOT_COLORS = {
  violet:  { active: 'bg-blue-500 scale-125', inactive: 'bg-slate-600 hover:bg-blue-500/50' },
  blue:    { active: 'bg-blue-500 scale-125',   inactive: 'bg-slate-600 hover:bg-blue-500/50' },
  orange:  { active: 'bg-orange-500 scale-125', inactive: 'bg-slate-600 hover:bg-orange-500/50' },
  emerald: { active: 'bg-emerald-500 scale-125',inactive: 'bg-slate-600 hover:bg-emerald-500/50' },
};

export default function ProgressDots({ total, current, onSelect, color = 'violet' }) {
  const c = DOT_COLORS[color] || DOT_COLORS.violet;
  return (
    <div className="flex items-center gap-2" role="tablist" aria-label="Navigation des segments">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          aria-label={`Segment ${i + 1}`}
          onClick={() => onSelect?.(i)}
          className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${i === current ? c.active : c.inactive}`}
        />
      ))}
    </div>
  );
}
