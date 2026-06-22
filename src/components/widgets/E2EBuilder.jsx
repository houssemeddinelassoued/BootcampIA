import { useState } from 'react';
import { FIL_ROUGE_OPTIONS } from '../../data/sessions';

const STEPS = [
  {
    id: 'story', icon: '📋', title: 'User Story (fil rouge)',
    description: 'La User Story sélectionnée en Session 2',
    color: 'violet',
    content: (fr) => (
      <div className="space-y-3">
        <p className="text-slate-300 text-sm">User Story priorisée {fr?.emoji} {fr?.name || 'EcoTrack'} :</p>
        <div className="card p-4 border-violet-500/30 bg-violet-950/10">
          <p className="text-white font-medium italic">
            « En tant que <strong className="text-violet-300">Responsable RSE</strong>,
            je veux <strong className="text-violet-300">importer mes factures d'énergie</strong>
            afin de <strong className="text-violet-300">calculer mon scope 2 automatiquement</strong>. »
          </p>
        </div>
        <div className="flex gap-4 text-xs text-slate-500">
          <span>🔴 Priorité : Critique</span>
          <span>📦 Sprint 1</span>
        </div>
      </div>
    ),
  },
  {
    id: 'front', icon: '🎨', title: 'Front-end (Non-Tech)',
    description: 'Interface générée avec v0.dev ou Lovable',
    color: 'blue',
    content: (fr) => (
      <div className="space-y-3">
        <p className="text-slate-400 text-xs font-mono mb-2">Prompt v0.dev :</p>
        <div className="card p-3 border-blue-500/20 bg-blue-950/10 font-mono text-xs text-slate-400">
          « Crée une page d'upload de factures d'énergie : drag & drop CSV/PDF, tableau de prévisualisation, bouton "Calculer l'empreinte". Design dark, vert émeraude. »
        </div>
        {/* Simplified UI preview */}
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
          <div className="border-2 border-dashed border-emerald-500/40 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">📁</div>
            <p className="text-slate-400 text-sm">Glissez vos factures ici</p>
            <p className="text-slate-600 text-xs">CSV, PDF — max 10 Mo</p>
          </div>
          <div className="mt-3 flex gap-2">
            <div className="flex-1 h-8 bg-slate-800 rounded animate-pulse" />
            <div className="w-24 h-8 bg-emerald-600 rounded text-xs text-white flex items-center justify-center">
              Calculer →
            </div>
          </div>
        </div>
        <p className="text-blue-300 text-xs">✅ Généré par v0.dev en 15 secondes depuis le prompt</p>
      </div>
    ),
  },
  {
    id: 'back', icon: '⚙️', title: 'Back-end (Tech)',
    description: 'API FastAPI générée avec Cursor',
    color: 'orange',
    content: () => (
      <div className="space-y-3">
        <p className="text-slate-400 text-xs font-mono mb-2">Endpoint généré par Cursor :</p>
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
          <div className="px-4 py-2 bg-slate-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-slate-400 text-xs font-mono">api.py</span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto">
{`@app.post("/calculate-scope2")
async def calc_scope2(file: UploadFile):
    invoices = parse_csv(await file.read())
    co2e = sum(
        inv.kwh * FACTOR_FR
        for inv in invoices
    )
    return {"scope2_tco2e": co2e / 1000}`}
          </pre>
        </div>
        <p className="text-orange-300 text-xs">✅ Généré par Cursor + type hints + tests (voir slide précédente)</p>
      </div>
    ),
  },
  {
    id: 'connect', icon: '🔗', title: 'Connexion Front ↔ Back',
    description: 'Un appel fetch() pour connecter les deux',
    color: 'emerald',
    content: () => (
      <div className="space-y-3">
        <p className="text-slate-400 text-xs mb-2">Connexion via fetch — généré par l'IA :</p>
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
          <div className="px-4 py-2 bg-slate-800 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-400 text-xs font-mono">upload.js</span>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto">
{`const uploadFile = async (file) => {
  const form = new FormData();
  form.append('file', file);
  
  const res = await fetch(
    'http://localhost:8000/calculate-scope2',
    { method: 'POST', body: form }
  );
  
  const { scope2_tco2e } = await res.json();
  showResult(scope2_tco2e);
};`}
          </pre>
        </div>
        <div className="card p-4 bg-emerald-950/15 border-emerald-500/30">
          <p className="text-emerald-400 font-bold text-sm">🎉 Le MVP fonctionne !</p>
          <p className="text-slate-400 text-sm mt-1">
            Front génère un fichier → API calcule le scope 2 → résultat affiché en temps réel.<br />
            Construit en <strong className="text-white">~30 minutes</strong> avec l'IA.
          </p>
        </div>
      </div>
    ),
  },
];

const COLORS = {
  violet:  { border:'border-violet-500/40', bg:'bg-violet-950/15', num:'text-violet-400', icon:'bg-violet-500', dot:'bg-violet-500' },
  blue:    { border:'border-blue-500/40',   bg:'bg-blue-950/15',   num:'text-blue-400',   icon:'bg-blue-500',   dot:'bg-blue-500' },
  orange:  { border:'border-orange-500/40', bg:'bg-orange-950/15', num:'text-orange-400', icon:'bg-orange-500', dot:'bg-orange-500' },
  emerald: { border:'border-emerald-500/40',bg:'bg-emerald-950/15',num:'text-emerald-400',icon:'bg-emerald-500',dot:'bg-emerald-500' },
};

export default function E2EBuilder({ filRouge }) {
  const [activeStep, setActiveStep] = useState(null);
  const [completed, setCompleted] = useState([]);

  const open = (id) => {
    setActiveStep(id === activeStep ? null : id);
    if (!completed.includes(id)) setCompleted(c => [...c, id]);
  };

  const fr = filRouge || FIL_ROUGE_OPTIONS[0];
  const allDone = completed.length >= STEPS.length;

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Boucle End-to-End</h3>
        <p className="text-slate-400 mt-1">
          De la User Story au MVP connecté — cliquez sur chaque étape pour la dérouler
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              completed.includes(s.id) ? `${COLORS[s.color].icon} text-white` : 'bg-slate-800 text-slate-500'
            }`}>
              {completed.includes(s.id) ? '✓' : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 transition-all duration-500 ${
                completed.includes(STEPS[i+1].id) ? 'bg-emerald-500' : 'bg-slate-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {STEPS.map((step, i) => {
          const c = COLORS[step.color];
          const isOpen = activeStep === step.id;
          const isDone = completed.includes(step.id);
          return (
            <div key={step.id}
              className={`rounded-xl border transition-all duration-300 ${isOpen ? `${c.border} ${c.bg}` : 'border-slate-700 bg-slate-800/40'}`}>
              <button onClick={() => open(step.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}>
                <span className="text-2xl">{step.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{step.title}</span>
                    {isDone && <span className="text-emerald-400 text-xs">✓ Complété</span>}
                  </div>
                  <p className="text-slate-400 text-sm">{step.description}</p>
                </div>
                <span className={`text-xl transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${c.num}`}>▾</span>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 animate-fade-in">
                  {step.content(fr)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {allDone && (
        <div className="card p-5 border-emerald-500/40 bg-emerald-950/20 animate-bounce-in text-center">
          <p className="text-3xl mb-2">🎉</p>
          <p className="text-emerald-300 font-bold text-lg">MVP End-to-End opérationnel !</p>
          <p className="text-slate-400 text-sm mt-1">
            Front + API + connexion — construit en ~30 min avec l'IA.<br />
            <span className="text-white font-medium">Le code doit être relu avant la production.</span>
          </p>
        </div>
      )}
    </div>
  );
}
