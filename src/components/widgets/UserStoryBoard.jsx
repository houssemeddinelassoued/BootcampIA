import { useState } from 'react';
import { FIL_ROUGE_OPTIONS } from '../../data/sessions';

const PRIORITY_COLORS = {
  '🔴 Critique': 'text-red-400 bg-red-500/10',
  '🟠 Haute':    'text-orange-400 bg-orange-500/10',
  '🟡 Moyenne':  'text-yellow-400 bg-yellow-500/10',
};

export default function UserStoryBoard({ filRouge }) {
  const [step, setStep] = useState(0); // 0=idle, 1=generating, 2=done
  const [visibleRows, setVisibleRows] = useState(0);
  const [copied, setCopied] = useState(false);

  const stories = (filRouge?.persona?.userStories || FIL_ROUGE_OPTIONS[0].persona.userStories);

  const generate = () => {
    setStep(1);
    setVisibleRows(0);
    let count = 0;
    const id = setInterval(() => {
      count++;
      setVisibleRows(count);
      if (count >= stories.length) {
        clearInterval(id);
        setStep(2);
      }
    }, 600);
  };

  const copyToClipboard = () => {
    const header = 'En tant que | Je veux | Afin de | Priorité\n';
    const rows = stories.map(s => `${s.persona} | ${s.action} | ${s.benefice} | ${s.priority}`).join('\n');
    navigator.clipboard.writeText(header + rows).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-2xl font-bold text-white">Du Concept à l'Exécution</h3>
          <p className="text-slate-400 mt-1">
            Persona → fonctionnalités → User Stories → backlog
            {filRouge && <span className="ml-2 badge bg-blue-500/15 border-blue-500/30 text-blue-300">{filRouge.emoji} {filRouge.name}</span>}
          </p>
        </div>
        {step === 2 && (
          <button onClick={copyToClipboard}
            className={`btn-ghost text-xs border ${copied ? 'border-emerald-500/40 text-emerald-300' : 'border-slate-700'}`}>
            {copied ? '✅ Copié !' : '📋 Copier le backlog'}
          </button>
        )}
      </div>

      {/* Prompt preview */}
      <div className="card p-4 border-blue-500/20 bg-blue-950/10 font-mono text-xs text-slate-400 leading-relaxed">
        <span className="text-blue-300 font-bold">Prompt :</span><br />
        « À partir du persona {filRouge?.persona?.nom || 'Sophie'} ({filRouge?.persona?.role || 'Responsable RSE'}),
        génère 5 User Stories pour {filRouge?.name || 'EcoTrack'} au format "En tant que [rôle], je veux [action]
        afin de [bénéfice]". Présente en tableau avec une colonne Priorité (Critique/Haute/Moyenne). »
      </div>

      {step === 0 && (
        <button onClick={generate} className="btn-primary w-full py-4 text-base">
          ⚙️ Générer le backlog →
        </button>
      )}

      {(step === 1 || step === 2) && (
        <div className="space-y-3 animate-fade-in">
          {step === 1 && visibleRows < stories.length && (
            <div className="flex items-center gap-2 text-blue-300 text-sm">
              <div className="flex gap-1">
                {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay:`${i*150}ms` }} />)}
              </div>
              Génération du backlog…
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-blue-500/20">
            <table className="w-full text-sm">
              <thead className="bg-blue-950/30">
                <tr>
                  <th className="px-4 py-3 text-left text-blue-300 text-xs font-bold">#</th>
                  <th className="px-4 py-3 text-left text-blue-300 text-xs font-bold">En tant que</th>
                  <th className="px-4 py-3 text-left text-blue-300 text-xs font-bold">Je veux</th>
                  <th className="px-4 py-3 text-left text-blue-300 text-xs font-bold">Afin de</th>
                  <th className="px-4 py-3 text-left text-blue-300 text-xs font-bold">Priorité</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {stories.slice(0, visibleRows).map((s, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors animate-slide-right">
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">{i + 1}</td>
                    <td className="px-4 py-3 text-slate-300">{s.persona}</td>
                    <td className="px-4 py-3 text-white font-medium">{s.action}</td>
                    <td className="px-4 py-3 text-slate-400">{s.benefice}</td>
                    <td className="px-4 py-3">
                      <span className={`badge border-0 text-xs font-bold px-2 py-0.5 rounded ${PRIORITY_COLORS[s.priority]}`}>
                        {s.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {step === 2 && (
            <div className="card p-4 bg-emerald-950/15 border-emerald-500/25 animate-fade-in">
              <p className="text-emerald-400 text-sm font-bold mb-1">📦 Livrable généré !</p>
              <p className="text-slate-400 text-sm">
                {stories.length} User Stories priorisées, prêtes à copier dans <strong className="text-white">Jira</strong>,{' '}
                <strong className="text-white">Notion</strong> ou <strong className="text-white">Linear</strong>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
