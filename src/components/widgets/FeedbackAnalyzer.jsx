import { useState } from 'react';

const FEEDBACKS = [
  { id:1, text:'Super outil ! Le tableau de bord est très clair. Par contre le calcul du scope 3 est un peu flou pour nous.' },
  { id:2, text:'On galère à comprendre comment importer nos factures de gaz. L\'interface d\'upload est trop compliquée.' },
  { id:3, text:'Excellent ! Le rapport CSRD généré automatiquement nous a fait gagner 2 jours de travail ce mois-ci.' },
  { id:4, text:'Le prix est trop élevé pour une PME de notre taille. On ne peut pas se permettre 399€/mois.' },
  { id:5, text:'J\'adore les alertes automatiques quand on dépasse notre objectif mensuel. Vraiment utile !' },
];

const ANALYSIS = [
  { id:1, sentiment:'😐', label:'Mitigé', tags:['UX positive', 'Scope 3 — confusion'], color:'text-amber-300', bg:'bg-amber-950/15', border:'border-amber-500/25' },
  { id:2, sentiment:'😤', label:'Négatif', tags:['UX — friction', 'Onboarding à améliorer'], color:'text-red-300', bg:'bg-red-950/15', border:'border-red-500/25' },
  { id:3, sentiment:'😊', label:'Très positif', tags:['ROI concret', 'Gain de temps'], color:'text-emerald-300', bg:'bg-emerald-950/15', border:'border-emerald-500/25' },
  { id:4, sentiment:'😤', label:'Négatif', tags:['Prix — obstacle', 'Segment PME < 50 sal.'], color:'text-red-300', bg:'bg-red-950/15', border:'border-red-500/25' },
  { id:5, sentiment:'😊', label:'Positif', tags:['Feature alertes', 'Engagement fort'], color:'text-emerald-300', bg:'bg-emerald-950/15', border:'border-emerald-500/25' },
];

export default function FeedbackAnalyzer() {
  const [analyzed, setAnalyzed] = useState(false);
  const [visible, setVisible] = useState(0);

  const analyze = () => {
    setAnalyzed(true);
    setVisible(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setVisible(i);
      if (i >= FEEDBACKS.length) clearInterval(id);
    }, 500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Préparer la suite : Analyse de Feedbacks</h3>
        <p className="text-slate-400 mt-1">
          Simulation d'une analyse de sentiment et de catégorisation automatique des retours utilisateurs
        </p>
      </div>

      <div className="card p-4 border-emerald-500/20 bg-emerald-950/10 font-mono text-xs text-slate-400">
        <span className="text-emerald-300 font-bold">Prompt :</span><br />
        « Analyse ces 5 retours utilisateurs. Pour chacun, donne : le sentiment (Positif/Négatif/Mitigé),
        les tags thématiques (UX, Prix, Fonctionnalités, ROI, Onboarding) et un score de 1 à 5. »
      </div>

      {/* Feedbacks */}
      <div className="space-y-3">
        {FEEDBACKS.map((f, i) => {
          const a = ANALYSIS[i];
          const isAnalyzed = analyzed && i < visible;
          return (
            <div key={f.id} className={`rounded-xl border transition-all duration-300 ${
              isAnalyzed ? `${a.border} ${a.bg}` : 'border-slate-700 bg-slate-800/40'
            }`}>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {isAnalyzed && (
                    <span className="text-2xl shrink-0 animate-bounce-in">{a.sentiment}</span>
                  )}
                  <p className="text-slate-300 text-sm leading-relaxed flex-1">{f.text}</p>
                </div>
                {isAnalyzed && (
                  <div className="flex items-center gap-2 mt-3 flex-wrap animate-fade-in">
                    <span className={`text-xs font-bold ${a.color}`}>{a.label}</span>
                    {a.tags.map(t => (
                      <span key={t} className={`badge border text-xs ${a.border} ${a.color}`}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!analyzed && (
        <button onClick={analyze} className="btn-primary w-full py-4 text-base">
          🤖 Analyser les feedbacks →
        </button>
      )}

      {analyzed && visible >= FEEDBACKS.length && (
        <div className="card p-5 border-emerald-500/25 bg-emerald-950/10 animate-bounce-in">
          <p className="text-emerald-400 font-bold text-sm mb-3">📊 Synthèse automatique :</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-emerald-900/20 rounded-xl p-3">
              <div className="text-2xl">😊</div>
              <div className="text-emerald-300 font-bold">2</div>
              <div className="text-slate-400 text-xs">Positifs</div>
            </div>
            <div className="bg-amber-900/20 rounded-xl p-3">
              <div className="text-2xl">😐</div>
              <div className="text-amber-300 font-bold">1</div>
              <div className="text-slate-400 text-xs">Mitigés</div>
            </div>
            <div className="bg-red-900/20 rounded-xl p-3">
              <div className="text-2xl">😤</div>
              <div className="text-red-300 font-bold">2</div>
              <div className="text-slate-400 text-xs">Négatifs</div>
            </div>
          </div>
          <p className="text-slate-400 text-xs mt-3">
            🔴 Points d'attention prioritaires : onboarding CSV et prix PME &lt; 50 salariés
          </p>
        </div>
      )}
    </div>
  );
}
