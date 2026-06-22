import { useEffect, useState } from 'react';

const POSTIT_COLORS = [
  'bg-yellow-300', 'bg-pink-300', 'bg-green-300', 'bg-blue-300', 'bg-orange-300', 'bg-purple-300',
];
const ROTATIONS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', 'rotate-0', '-rotate-3', 'rotate-3'];

const CATEGORIES = ['Contenu', 'Analyse', 'Communication', 'Développement', 'Administratif', 'Autre'];
const CAT_COLORS = {
  'Contenu':       'bg-violet-500/20 text-violet-300',
  'Analyse':       'bg-blue-500/20 text-blue-300',
  'Communication': 'bg-emerald-500/20 text-emerald-300',
  'Développement': 'bg-orange-500/20 text-orange-300',
  'Administratif': 'bg-amber-500/20 text-amber-300',
  'Autre':         'bg-slate-600/30 text-slate-300',
};

const EXAMPLES = [
  'Rédiger les rapports hebdomadaires',
  'Résumer les retours clients du support',
  'Préparer les présentations pour les réunions',
  'Répondre aux emails de prospection',
];

export default function PostItBoard() {
  const [input, setInput] = useState('');
  const [postits, setPostits] = useState(() => {
    const saved = localStorage.getItem('bootcamp-postits');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        localStorage.removeItem('bootcamp-postits');
      }
    }
    return EXAMPLES.map((text, i) => ({
      id: i, text, color: POSTIT_COLORS[i % POSTIT_COLORS.length],
      rot: ROTATIONS[i % ROTATIONS.length], cat: null,
    }));
  });
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    localStorage.setItem('bootcamp-postits', JSON.stringify(postits));
  }, [postits]);

  const addPostit = () => {
    const t = input.trim();
    if (!t) return;
    const id = Date.now();
    setPostits(p => [...p, {
      id, text: t, cat: null,
      color: POSTIT_COLORS[id % POSTIT_COLORS.length],
      rot: ROTATIONS[id % ROTATIONS.length],
    }]);
    setInput('');
  };

  const setCategory = (id, cat) =>
    setPostits(p => p.map(pi => pi.id === id ? { ...pi, cat } : pi));

  const removePostit = (id) => {
    setPostits(p => p.filter(pi => pi.id !== id));
  };

  const visible = filter ? postits.filter(p => p.cat === filter) : postits;

  const categorizedCount = postits.filter(p => p.cat).length;

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Activité Flash — Carte des tâches automatisables</h3>
        <p className="text-slate-400 mt-1">
          Notez votre tâche la plus chronophage de la semaine, puis catégorisez-la
        </p>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addPostit()}
          placeholder="Ma tâche la plus chronophage cette semaine…"
          maxLength={80}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors text-sm"
          aria-label="Saisir une tâche"
        />
        <button onClick={addPostit} className="btn-primary px-5 shrink-0">
          + Ajouter
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-slate-500 text-xs">Filtrer :</span>
        <button onClick={() => setFilter(null)}
          className={`px-3 py-1 rounded-full text-xs border transition-all ${!filter ? 'bg-white text-slate-900 border-white' : 'border-slate-700 text-slate-400 hover:text-white'}`}>
          Toutes ({postits.length})
        </button>
        {CATEGORIES.map(c => {
          const count = postits.filter(p => p.cat === c).length;
          if (count === 0 && filter !== c) return null;
          return (
            <button key={c} onClick={() => setFilter(c === filter ? null : c)}
              className={`px-3 py-1 rounded-full text-xs border transition-all ${filter === c ? 'bg-white text-slate-900 border-white' : `border-slate-700 ${CAT_COLORS[c]} hover:border-current`}`}>
              {c} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Post-its grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[200px]">
        {visible.map(p => (
          <div key={p.id} className={`postit ${p.color} ${p.rot} relative animate-bounce-in`}>
            <button
              onClick={() => removePostit(p.id)}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/20 hover:bg-black/35 text-slate-800 text-xs font-bold"
              aria-label={`Supprimer la tâche ${p.text}`}
              title="Supprimer"
            >
              ×
            </button>
            <p className="text-slate-800 text-sm leading-snug mb-3">{p.text}</p>
            {/* Category selector */}
            <select
              value={p.cat || ''}
              onChange={e => setCategory(p.id, e.target.value || null)}
              className="w-full text-xs bg-white/60 border border-black/10 rounded-md px-1.5 py-1 text-slate-700 focus:outline-none"
              aria-label={`Catégorie pour "${p.text}"`}
            >
              <option value="">Catégoriser…</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* Summary */}
      {categorizedCount > 0 && (
        <div className="card p-4 bg-violet-950/15 border-violet-500/25 animate-fade-in">
          <p className="text-violet-300 text-sm font-bold mb-2">
            🤖 Potentiel d'automatisation IA : {categorizedCount}/{postits.length} tâches catégorisées
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.filter(c => postits.some(p => p.cat === c)).map(c => {
              const count = postits.filter(p => p.cat === c).length;
              return (
                <span key={c} className={`badge border ${CAT_COLORS[c]}`}>
                  {c} × {count}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
