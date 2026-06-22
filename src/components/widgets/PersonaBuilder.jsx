import { useState } from 'react';
import { FIL_ROUGE_OPTIONS } from '../../data/sessions';

export default function PersonaBuilder({ filRouge }) {
  const [generating, setGenerating] = useState(false);
  const [persona, setPersona] = useState(null);
  const [devil, setDevil] = useState(false);
  const [devilText, setDevilText] = useState('');

  const DEVIL_ARGUMENT = filRouge?.id === 'ecotrack'
    ? `• Les PME n'ont pas le budget — elles verront ça comme une contrainte réglementaire, pas une opportunité.
• Les concurrents bien établis (Greenly, Sweep) ont une longueur d'avance de 3 ans.
• Le scope 3 est quasi impossible à mesurer précisément — vous vendrez de la fausse précision.
• Le marché PME est fragmenté et le coût d'acquisition sera prohibitif.
• Une simple feuille Excel gratuite d'ADEME couvre 80% des besoins d'une PME en 30 min.`
    : `• Votre cible n'est peut-être pas prête à payer pour ça aujourd'hui.
• Des concurrents plus grands peuvent copier votre fonctionnalité en 3 mois.
• Votre différenciateur IA n'est pas défendable — les APIs LLM sont accessibles à tous.
• Le CAC sera trop élevé si votre cible ne cherche pas activement cette solution.
• Avez-vous validé que les utilisateurs ont vraiment ce problème — et qu'ils payent pour le résoudre ?`;

  const currentPersona = filRouge?.persona || FIL_ROUGE_OPTIONS[0].persona;

  const generate = () => {
    setGenerating(true);
    setPersona(null);
    setDevil(false);
    setTimeout(() => {
      setGenerating(false);
      setPersona(currentPersona);
    }, 2200);
  };

  const triggerDevil = () => {
    setDevil(true);
    setDevilText('');
    let i = 0;
    const id = setInterval(() => {
      setDevilText(DEVIL_ARGUMENT.slice(0, ++i));
      if (i >= DEVIL_ARGUMENT.length) clearInterval(id);
    }, 14);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Idéation & Structuration Produit</h3>
        <p className="text-slate-400 mt-1">
          Générez un persona détaillé pour{' '}
          <span className="text-blue-300 font-medium">{filRouge?.name || 'votre startup'}</span>
        </p>
      </div>

      {/* Prompt preview */}
      <div className="card p-4 border-blue-500/20 bg-blue-950/10 font-mono text-xs text-slate-400 leading-relaxed">
        <span className="text-blue-300 font-bold">Prompt systémique :</span><br />
        « Tu es expert en {filRouge?.secteur || 'stratégie produit'}. Génère un persona pour{' '}
        {filRouge?.name || 'notre startup'} (cible : {filRouge?.cible || 'PME'}). Format : prénom, âge, rôle,
        entreprise, 3 frustrations majeures, 3 objectifs, une citation verbatim. »
      </div>

      {!persona && !generating && (
        <button onClick={generate} className="btn-primary w-full py-4 text-base">
          ✨ Générer le persona avec l'IA →
        </button>
      )}

      {generating && (
        <div className="card p-6 border-blue-500/20 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
            <span className="text-blue-300 text-sm">L'IA génère le persona… (simulation)</span>
          </div>
          <div className="mt-4 space-y-2">
            {['Analyse du secteur…', 'Construction du profil démographique…', 'Identification des frustrations…', 'Rédaction de la citation verbatim…'].map((step, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-500 text-sm"
                style={{ opacity: generating ? 1 : 0, transition: `opacity 0.3s ${i * 400}ms` }}>
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                {step}
              </div>
            ))}
          </div>
        </div>
      )}

      {persona && (
        <div className="space-y-4 animate-slide-up">
          {/* Persona card */}
          <div className="card p-6 border-blue-500/30 bg-slate-900">
            <div className="flex items-start gap-4">
              <div className="text-5xl">{persona.emoji || '👤'}</div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-white">{persona.nom}, {persona.age} ans</h4>
                <p className="text-blue-300 font-medium">{persona.role}</p>
                <p className="text-slate-400 text-sm">{persona.entreprise}</p>
              </div>
            </div>

            <blockquote className="mt-4 border-l-4 border-blue-500 pl-4 italic text-blue-800 text-sm">
              {persona.citation}
            </blockquote>

            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              <div>
                <p className="text-red-400 text-xs font-bold uppercase tracking-wide mb-2">😤 Frustrations</p>
                <ul className="space-y-1.5">
                  {persona.frustrations.map((f, i) => (
                    <li key={i} className="flex gap-2 text-slate-300 text-sm">
                      <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-wide mb-2">🎯 Objectifs</p>
                <ul className="space-y-1.5">
                  {persona.objectifs.map((o, i) => (
                    <li key={i} className="flex gap-2 text-slate-300 text-sm">
                      <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Avocat du diable */}
          {!devil && (
            <button onClick={triggerDevil}
              className="w-full py-3 rounded-xl border border-red-500/30 bg-red-950/10 text-red-300 hover:bg-red-950/20 transition-all text-sm font-medium">
              😈 Jouer l'Avocat du Diable contre {filRouge?.name || 'cette idée'}
            </button>
          )}

          {devil && (
            <div className="card p-5 border-red-500/30 bg-red-950/15 animate-fade-in">
              <p className="text-red-400 font-bold text-sm mb-3">😈 L'Avocat du Diable argumente :</p>
              <pre className="text-red-800 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                {devilText}<span className="animate-blink">|</span>
              </pre>
              {devilText.length >= DEVIL_ARGUMENT.length && (
                <div className="mt-4 pt-3 border-t border-red-500/20">
                  <p className="text-slate-400 text-xs">💡 Utilisez ces objections pour renforcer votre pitch — chaque contre-argument est une opportunité de différenciation.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
