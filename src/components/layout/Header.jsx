import { useNavigate, useLocation } from 'react-router-dom';
import { usePresentation } from '../../contexts/PresentationContext';
import { SESSIONS, FIL_ROUGE_OPTIONS } from '../../data/sessions';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { presenterMode, togglePresenterMode, filRouge, setFilRouge } = usePresentation();

  const sessionId = location.pathname.startsWith('/session/')
    ? parseInt(location.pathname.split('/').pop())
    : null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 h-14 gap-4">

        {/* Logo / Home */}
        <button onClick={() => navigate('/')} className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity">
          <span className="text-xl">🚀</span>
          <span className="font-bold text-white text-sm hidden sm:block">Bootcamp IA</span>
        </button>

        {/* Session navigation */}
        <nav className="flex items-center gap-1 overflow-x-auto" aria-label="Navigation des sessions">
          {SESSIONS.map(s => {
            const active = sessionId === s.id;
            const colors = {
              violet:  active ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' : 'text-slate-500 hover:text-slate-300',
              blue:    active ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' : 'text-slate-500 hover:text-slate-300',
              orange:  active ? 'bg-orange-500/20 text-orange-300 border-orange-500/40' : 'text-slate-500 hover:text-slate-300',
              emerald: active ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'text-slate-500 hover:text-slate-300',
            };
            return (
              <button
                key={s.id}
                onClick={() => navigate(`/session/${s.id}`)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all whitespace-nowrap ${active ? `${colors[s.color]} border` : 'border-transparent hover:bg-slate-800'}`}
                aria-current={active ? 'page' : undefined}
              >
                <span>{s.emoji}</span>
                <span className="hidden md:block">S{s.id}</span>
                <span className="hidden lg:block">— {s.title.split(' ').slice(0, 3).join(' ')}…</span>
              </button>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Fil rouge selector (presenter mode only) */}
          {presenterMode && (
            <select
              value={filRouge.id}
              onChange={e => setFilRouge(FIL_ROUGE_OPTIONS.find(f => f.id === e.target.value))}
              className="hidden lg:block text-xs bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:border-slate-600 max-w-52"
              aria-label="Choisir le fil rouge"
            >
              {FIL_ROUGE_OPTIONS.map(f => (
                <option key={f.id} value={f.id}>{f.emoji} {f.name}</option>
              ))}
            </select>
          )}

          {/* Presenter mode toggle */}
          <button
            onClick={togglePresenterMode}
            title={presenterMode ? 'Mode participant (masquer les notes)' : 'Mode formateur (afficher les notes)'}
            aria-pressed={presenterMode}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              presenterMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <span>{presenterMode ? '🎤' : '👁️'}</span>
            <span className="hidden sm:block">{presenterMode ? 'Formateur' : 'Participant'}</span>
          </button>
        </div>
      </div>

      {/* Keyboard hint */}
      {sessionId && (
        <div className="px-4 pb-1 text-xs text-slate-600 hidden lg:block">
          ← → flèches pour naviguer · P = mode formateur
        </div>
      )}
    </header>
  );
}
