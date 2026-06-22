import { useNavigate } from 'react-router-dom';
import { usePresentation } from '../contexts/PresentationContext';
import { SESSIONS, FIL_ROUGE_OPTIONS } from '../data/sessions';

const SCHEDULE = [
  { time:'09:00', session:1, duration:'45 min', pause:false },
  { time:'09:45', label:'☕ Pause', duration:'10 min', pause:true },
  { time:'09:55', session:2, duration:'60 min', pause:false },
  { time:'10:55', label:'☕ Pause déjeuner', duration:'15 min', pause:true },
  { time:'11:10', session:3, duration:'120 min *', pause:false },
  { time:'13:10', session:4, duration:'45 min', pause:false },
];

const SESSION_BG = {
  violet:  'bg-white',
  blue:    'bg-white',
  orange:  'bg-white',
  emerald: 'bg-white',
};

const FR_SELECTED = {
  emerald: 'bg-emerald-500/15 border-emerald-500/40',
  blue:    'bg-blue-500/15 border-blue-500/40',
  amber:   'bg-amber-500/15 border-amber-500/40',
  orange:  'bg-orange-500/15 border-orange-500/40',
  violet:  'bg-blue-500/15 border-blue-500/40',
};
const SESSION_BORDERS = {
  violet:  'border-blue-500/30 hover:border-blue-500/60',
  blue:    'border-blue-500/30 hover:border-blue-500/60',
  orange:  'border-orange-500/30 hover:border-orange-500/60',
  emerald: 'border-emerald-500/30 hover:border-emerald-500/60',
};
const SESSION_BADGE = {
  violet:  'bg-blue-500/15 border-blue-500/30 text-blue-300',
  blue:    'bg-blue-500/15 border-blue-500/30 text-blue-300',
  orange:  'bg-orange-500/15 border-orange-500/30 text-orange-300',
  emerald: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
};

export default function Home() {
  const navigate = useNavigate();
  const { presenterMode, togglePresenterMode, filRouge, setFilRouge } = usePresentation();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">

      {/* Hero */}
      <section className="text-center space-y-4 py-8 relative">
        <div className="grid-dots absolute inset-0 rounded-3xl opacity-50" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 badge bg-slate-800 border-slate-700 text-slate-300 text-sm px-4 py-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Plateforme interactive — guide formateur live
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight">
            🚀 Bootcamp IA<br />
            <span className="text-grad-blue">Co-fondateur Virtuel</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            4h30 · 4 sessions · Des concepts aux mains dans le code
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="badge bg-blue-500/15 border-blue-500/30 text-blue-300">30% théorie</span>
            <span className="badge bg-blue-500/15 border-blue-500/30 text-blue-300">30% démos</span>
            <span className="badge bg-orange-500/15 border-orange-500/30 text-orange-300">40% pratique</span>
          </div>
        </div>
      </section>

      {/* Fil rouge selector (presenter-only, discreet) */}
      {presenterMode && (
        <section className="card p-4 border-slate-700">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="font-semibold text-sm">🧵 Projets fil conducteur (mode formateur)</h2>
            <span className="badge bg-emerald-500/10 border-emerald-500/25 text-emerald-700 text-[11px]">
              Pôle de Compétitivité de Bizerte
            </span>
          </div>

          <p className="text-slate-500 text-xs mb-3">
            Focus contexte local : AgriTech, Agroalimentaire, Développement durable
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {FIL_ROUGE_OPTIONS.map(fr => (
              <button
                key={fr.id}
                onClick={() => setFilRouge(fr)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  filRouge.id === fr.id
                    ? FR_SELECTED[fr.color] || 'bg-slate-700/40 border-slate-600'
                    : 'border-slate-700 bg-slate-800/40 hover:border-slate-600'
                }`}
                aria-pressed={filRouge.id === fr.id}
              >
                <div className="text-lg mb-0.5">{fr.emoji}</div>
                <div className="font-semibold text-xs leading-tight">{fr.name}</div>
                <div className="text-slate-500 text-[11px] mt-0.5 leading-tight">{fr.cible}</div>
              </button>
            ))}
          </div>

          {filRouge && (
            <p className="text-slate-500 text-xs mt-2.5">
              <span className="font-medium">{filRouge.emoji} {filRouge.name}</span> — {filRouge.tagline}
            </p>
          )}
        </section>
      )}

      {/* Session cards */}
      <section>
        <h2 className="font-bold text-white text-xl mb-4">📚 Les 4 sessions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {SESSIONS.map(s => (
            <button
              key={s.id}
              onClick={() => navigate(`/session/${s.id}`)}
              className={`card p-6 text-left border transition-all duration-200 ${SESSION_BG[s.color]} ${SESSION_BORDERS[s.color]} group hover:-translate-y-0.5`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-3xl">{s.emoji}</span>
                  <div className="mt-2">
                    <span className={`badge border text-xs ${SESSION_BADGE[s.color]}`}>
                      Session {s.id} · {s.duration} min
                    </span>
                  </div>
                </div>
                <span className={`text-2xl opacity-30 group-hover:opacity-80 group-hover:translate-x-1 transition-all ${s.accentClass}`}>→</span>
              </div>
              <h3 className="font-bold text-white text-lg mt-3">{s.title}</h3>
              <p className="text-slate-400 text-sm mt-1">{s.subtitle}</p>
              <p className="text-slate-500 text-xs mt-3 leading-relaxed">{s.objective}</p>

              {/* Segment pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {s.segments.map(seg => (
                  <span key={seg.id} className="badge bg-slate-800 border-slate-700 text-slate-400 text-xs">
                    {seg.emoji} {seg.title.split(' ').slice(0, 3).join(' ')} ({seg.duration}min)
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Planning & Presenter mode row */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Schedule */}
        <section className="card p-6 border-slate-700">
          <h2 className="font-bold text-white text-lg mb-4">⏱️ Planning type (9h→13h10)</h2>
          <div className="space-y-2">
            {SCHEDULE.map((item, i) => {
              const session = item.session ? SESSIONS.find(s => s.id === item.session) : null;
              return (
                <div key={i} className={`flex items-center gap-3 py-2 ${item.pause ? 'opacity-50' : ''}`}>
                  <span className="text-slate-500 font-mono text-xs w-12 shrink-0">{item.time}</span>
                  {session ? (
                    <button onClick={() => navigate(`/session/${session.id}`)}
                      className="flex-1 flex items-center gap-2 hover:text-white transition-colors text-left">
                      <span>{session.emoji}</span>
                      <span className="text-slate-300 text-sm">{session.title}</span>
                      <span className={`badge ml-auto border ${SESSION_BADGE[session.color]} text-xs`}>{item.duration}</span>
                    </button>
                  ) : (
                    <div className="flex-1 flex items-center gap-2">
                      <span className="text-slate-500 text-sm">{item.label}</span>
                      <span className="badge ml-auto bg-slate-800 border-slate-700 text-slate-500 text-xs">{item.duration}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-slate-600 text-xs mt-3">* Micro-pause de 10 min au milieu de la Session 3</p>
        </section>

        {/* Presenter + key shortcuts */}
        <section className="card p-6 border-slate-700 space-y-5">
          <h2 className="font-bold text-white text-lg">⚙️ Contrôles formateur</h2>

          <div className={`p-4 rounded-xl border transition-all ${presenterMode ? 'bg-amber-950/20 border-amber-500/30' : 'bg-slate-800/50 border-slate-700'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Mode formateur</p>
                <p className="text-slate-400 text-sm">Affiche minuteurs, notes et transitions</p>
              </div>
              <button onClick={togglePresenterMode}
                className={`relative w-12 h-6 rounded-full transition-colors ${presenterMode ? 'bg-amber-500' : 'bg-slate-700'}`}
                role="switch" aria-checked={presenterMode}>
                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${presenterMode ? 'translate-x-7' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>

          <div>
            <p className="text-slate-400 text-sm font-medium mb-3">Raccourcis clavier :</p>
            <div className="space-y-2">
              {[
                { keys: ['←', '→'], desc: 'Naviguer entre les slides' },
                { keys: ['P'], desc: 'Basculer mode formateur' },
              ].map((shortcut, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {shortcut.keys.map(k => (
                      <kbd key={k} className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-300">{k}</kbd>
                    ))}
                  </div>
                  <span className="text-slate-400 text-sm">{shortcut.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-slate-400 text-sm font-medium mb-2">Objectifs pédagogiques :</p>
            <ol className="space-y-1">
              {['Démystifier le fonctionnement d\'un LLM','Protéger sa propriété intellectuelle','Accélérer la discovery produit','Prototyper un MVP en quelques heures','Pitcher son projet avec l\'IA'].map((obj, i) => (
                <li key={i} className="flex gap-2 text-slate-400 text-xs">
                  <span className="text-violet-400 shrink-0">{i+1}.</span>
                  {obj}
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

    </div>
  );
}
