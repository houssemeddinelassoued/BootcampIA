import { useTimer } from '../../hooks/useTimer';

const SESSION_COLORS = {
  violet:  { ring: 'stroke-blue-500',  urgent: 'stroke-amber-400',  over: 'stroke-red-500',  startBtn: 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/40' },
  blue:    { ring: 'stroke-blue-500',    urgent: 'stroke-amber-400',  over: 'stroke-red-500',  startBtn: 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/40' },
  orange:  { ring: 'stroke-orange-500',  urgent: 'stroke-amber-400',  over: 'stroke-red-500',  startBtn: 'bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/40' },
  emerald: { ring: 'stroke-emerald-500', urgent: 'stroke-amber-400',  over: 'stroke-red-500',  startBtn: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/40' },
};

export default function Timer({
  durationMinutes,
  color = 'violet',
  size = 'md',
  seconds: controlledSeconds,
  running: controlledRunning,
  onStateChange,
}) {

  const { formatted, progress, isUrgent, isOver, running, start, pause, reset } = useTimer(durationMinutes, {
    initialSeconds: controlledSeconds,
    initialRunning: controlledRunning,
    onStateChange,
  });
  const c = SESSION_COLORS[color] || SESSION_COLORS.violet;
  const r   = size === 'lg' ? 52 : size === 'sm' ? 24 : 38;
  const sw  = size === 'lg' ? 7  : size === 'sm' ? 4  : 5;
  const dim = (r + sw) * 2 + 4;
  const cx  = dim / 2;
  const circumference = 2 * Math.PI * r;
  const dash = circumference * (1 - progress);
  const ringClass = isOver ? c.over : isUrgent ? c.urgent : c.ring;
  const textSz = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-xs' : 'text-base';

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <div className="relative">
        <svg width={dim} height={dim} className="-rotate-90" aria-label={`Minuteur ${formatted}`}>
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="currentColor" className="text-slate-700" strokeWidth={sw} />
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="currentColor"
            className={`${ringClass} transition-all`}
            strokeWidth={sw} strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dash}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
          />
        </svg>
        <span className={`absolute inset-0 flex items-center justify-center font-mono font-bold rotate-0 ${textSz} ${isOver ? 'text-red-400' : isUrgent ? 'text-amber-400' : 'text-white'}`}>
          {formatted}
        </span>
      </div>

      <div className="flex gap-1.5">
        {!running ? (
          <button onClick={start} aria-label="Démarrer le minuteur"
            className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${c.startBtn}`}>
            ▶ Start
          </button>
        ) : (
          <button onClick={pause} aria-label="Mettre en pause"
            className="px-2.5 py-1 text-xs rounded-full border bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/40 transition-colors">
            ⏸ Pause
          </button>
        )}
        <button onClick={reset} aria-label="Réinitialiser"
          className="px-2.5 py-1 text-xs rounded-full border bg-slate-700/50 text-slate-400 border-slate-600/40 hover:bg-slate-600/60 transition-colors">
          ↺
        </button>
      </div>
    </div>
  );
}
