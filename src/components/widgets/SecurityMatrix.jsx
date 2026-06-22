import { useState } from 'react';

const DATA_ITEMS = [
  { id:1, label:'Code source cœur de métier', icon:'💻', risk:'danger',
    answer:'🚨 JAMAIS dans ChatGPT gratuit', reason:'Vos algos propriétaires pourraient entraîner le modèle de OpenAI et se retrouver dans les réponses d\'autres utilisateurs.' },
  { id:2, label:'Données clients (noms, emails, contrats)', icon:'📋', risk:'danger',
    answer:'🚨 JAMAIS sans accord RGPD', reason:'Violation du RGPD. Risque de fuite via entraînement. Utiliser uniquement des données anonymisées ou une version Enterprise.' },
  { id:3, label:'Contenu de votre site web public', icon:'🌐', risk:'safe',
    answer:'✅ OK à utiliser', reason:'Votre site est déjà public. L\'IA peut l\'analyser, en faire un résumé ou en extraire des infos sans risque.' },
  { id:4, label:'Stratégie commerciale confidentielle', icon:'📊', risk:'warning',
    answer:'⚠️ Enterprise/API uniquement', reason:'Sensible mais pas critique. À envoyer uniquement via ChatGPT Enterprise, Claude API ou une solution locale (Ollama).' },
  { id:5, label:'Brochure marketing (PDF public)', icon:'📄', risk:'safe',
    answer:'✅ OK à utiliser', reason:'Document déjà destiné au public. Parfait pour demander à l\'IA de le résumer ou d\'en extraire des arguments de vente.' },
  { id:6, label:'Données RH et salaires', icon:'👥', risk:'danger',
    answer:'🚨 JAMAIS — RGPD catégorie sensible', reason:'Les données RH sont parmi les plus protégées par le RGPD. Local ou Enterprise uniquement, avec audit de sécurité.' },
];

const RISK_STYLES = {
  danger:  { border:'border-red-500/40', bg:'bg-red-950/20', icon:'🚨', label:'Ne jamais partager', color:'text-red-400' },
  warning: { border:'border-amber-500/40', bg:'bg-amber-950/15', icon:'⚠️', label:'Attention — contexte important', color:'text-amber-400' },
  safe:    { border:'border-emerald-500/40', bg:'bg-emerald-950/15', icon:'✅', label:'OK à utiliser', color:'text-emerald-400' },
};

export default function SecurityMatrix() {
  const [revealed, setRevealed] = useState({});
  const [score, setScore] = useState(0);

  const reveal = (id) => {
    if (!revealed[id]) {
      setRevealed(r => ({ ...r, [id]: true }));
      setScore(s => s + 1);
    }
  };

  const allDone = score >= DATA_ITEMS.length;

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Sécurité & Propriété Intellectuelle</h3>
          <p className="text-slate-400 mt-1">Cliquez sur chaque donnée pour voir si vous pouvez la coller dans un LLM gratuit</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{score}/{DATA_ITEMS.length}</div>
          <div className="text-slate-400 text-xs">révélées</div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {DATA_ITEMS.map(item => {
          const isRevealed = revealed[item.id];
          const style = RISK_STYLES[item.risk];
          return (
            <button
              key={item.id}
              onClick={() => reveal(item.id)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                isRevealed
                  ? `${style.border} ${style.bg}`
                  : 'border-slate-700 bg-slate-800/60 hover:border-slate-600 hover:bg-slate-800'
              }`}
              aria-expanded={isRevealed}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{item.label}</p>
                  {!isRevealed && (
                    <p className="text-slate-500 text-xs mt-1">Cliquez pour révéler ▾</p>
                  )}
                  {isRevealed && (
                    <div className="mt-2 space-y-1 animate-fade-in">
                      <p className={`font-bold text-sm ${style.color}`}>{item.answer}</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{item.reason}</p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {allDone && (
        <div className="card p-5 border-violet-500/30 bg-violet-950/15 animate-bounce-in">
          <p className="text-violet-300 font-bold text-base mb-2">💡 La règle d'or à retenir :</p>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { icon:'🆓', label:'Gratuit (ChatGPT Free)', rule:'→ Uniquement données publiques', color:'text-red-300' },
              { icon:'💼', label:'Enterprise / API', rule:'→ Données confidentielles OK', color:'text-amber-300' },
              { icon:'🖥️', label:'Local (Ollama)', rule:'→ Tout, même le plus sensible', color:'text-emerald-300' },
            ].map(r => (
              <div key={r.icon} className="text-center p-3 bg-slate-800/60 rounded-lg">
                <div className="text-2xl mb-1">{r.icon}</div>
                <div className="text-white text-xs font-semibold">{r.label}</div>
                <div className={`text-xs mt-1 ${r.color}`}>{r.rule}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
