import { useState } from 'react';

const TRAPS = [
  {
    title: 'Les hallucinations',
    icon: '🌀',
    description: 'L\'IA invente des faits, des chiffres, des références avec une confiance absolue. Elle ne sait pas qu\'elle ne sait pas.',
    examples: ['Un chatbot qui invente une jurisprudence inexistante', 'Un rapport qui cite des études jamais publiées', 'Du code qui utilise une API qui n\'existe pas'],
    mitigation: 'Toujours vérifier les faits importants avec une source primaire. Le RAG réduit (pas élimine) les hallucinations.',
  },
  {
    title: 'Le code spaghetti',
    icon: '🍝',
    description: 'L\'IA génère du code qui fonctionne mais qui est non maintenable, sans tests, avec des vulnérabilités de sécurité.',
    examples: ['Secrets en clair dans le code', 'Zéro gestion des erreurs', 'Architecture incompréhensible après 3 mois'],
    mitigation: 'Relire TOUT le code généré. Le faire reviewer par quelqu\'un qui comprend. Ne pas déployer du code qu\'on ne comprend pas.',
  },
  {
    title: 'La dépendance',
    icon: '🔗',
    description: 'On délègue trop à l\'IA et on perd ses propres compétences. Ou l\'outil disparaît/change ses conditions.',
    examples: ['Équipe incapable d\'écrire un email sans IA', 'Outil clé abandonné par l\'éditeur', 'Hausse de prix x10 quand vous êtes captif'],
    mitigation: 'Garder l\'humain dans la boucle. Comprendre ce qu\'on utilise. Diversifier les fournisseurs. Lire les CGU.',
  },
];

const TOOLS = [
  { icon:'🤖', name:'ChatGPT ou Claude', usage:'Assistant généraliste — emails, textes, analyses, code', url:'https://chatgpt.com' },
  { icon:'🔍', name:'Perplexity AI', usage:'Recherche sourcée — veille marché, concurrents, tendances', url:'https://perplexity.ai' },
  { icon:'⚡', name:'1 outil de votre profil', choices:[
    { label:'v0.dev — interface React', profile:'Non-Tech / Design' },
    { label:'Cursor / Copilot — IDE IA', profile:'Dev / Tech' },
    { label:'Gamma.app — présentations', profile:'Business / Marketing' },
  ], url: null },
];

export default function ActionPlan() {
  const [openTrap, setOpenTrap] = useState(null);
  const [checked, setChecked] = useState([]);
  const [copied, setCopied] = useState(false);

  const toggle = (id) => setChecked(c => c.includes(id) ? c.filter(i => i !== id) : [...c, id]);

  const copyChecklist = () => {
    const text = `Ma checklist IA — Bootcamp Co-fondateur Virtuel

✅ OUTILS À INSTALLER :
1. ChatGPT (ou Claude) — assistant généraliste
2. Perplexity AI — recherche sourcée
3. Un outil spécialisé (v0.dev / Cursor / Gamma selon mon profil)

⚠️ LES 3 PIÈGES À ÉVITER :
1. Hallucinations → toujours vérifier les faits importants
2. Code spaghetti → relire TOUT le code généré avant de déployer
3. Dépendance → garder l'humain dans la boucle

🎯 MON ENGAGEMENT :
Cette semaine, je vais utiliser l'IA pour : _______________`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white">Plan d'Action — Anti-Bullshit</h3>
        <p className="text-slate-400 mt-1">Les pièges à éviter et les 3 outils à installer avant de partir</p>
      </div>

      {/* Traps */}
      <div className="space-y-3">
        <h4 className="text-lg font-bold text-white">⚠️ Les 3 pièges à éviter</h4>
        {TRAPS.map((trap, i) => (
          <div key={i}
            className={`rounded-xl border transition-all duration-300 ${
              openTrap === i ? 'border-red-500/40 bg-red-950/15' : 'border-slate-700 bg-slate-800/40'
            }`}>
            <button onClick={() => setOpenTrap(openTrap === i ? null : i)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left"
              aria-expanded={openTrap === i}>
              <span className="text-2xl">{trap.icon}</span>
              <span className="font-bold text-white flex-1">{trap.title}</span>
              <span className={`text-xl transition-transform ${openTrap === i ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {openTrap === i && (
              <div className="px-5 pb-5 space-y-3 animate-fade-in">
                <p className="text-slate-300 text-sm">{trap.description}</p>
                <div>
                  <p className="text-red-400 text-xs font-bold mb-1">Exemples concrets :</p>
                  <ul className="space-y-1">
                    {trap.examples.map((ex, j) => (
                      <li key={j} className="text-slate-400 text-xs flex gap-2">
                        <span className="text-red-500 shrink-0">•</span>{ex}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-3 bg-emerald-950/15 border-emerald-500/25">
                  <p className="text-emerald-400 text-xs font-bold">✅ Comment l'éviter :</p>
                  <p className="text-slate-300 text-xs mt-1">{trap.mitigation}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tools checklist */}
      <div className="space-y-3">
        <h4 className="text-lg font-bold text-white">🧰 Checklist de départ — 3 outils à installer</h4>
        {TOOLS.map((tool, i) => (
          <div key={i}
            onClick={() => toggle(i)}
            className={`rounded-xl border p-4 cursor-pointer transition-all ${
              checked.includes(i) ? 'border-emerald-500/40 bg-emerald-950/15' : 'border-slate-700 bg-slate-800/40 hover:border-slate-600'
            }`}
            role="checkbox" aria-checked={checked.includes(i)}>
            <div className="flex items-start gap-3">
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all ${
                checked.includes(i) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'
              }`}>
                {checked.includes(i) && <span className="text-white text-xs font-bold">✓</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{tool.icon}</span>
                  <span className="font-bold text-white">{tool.name}</span>
                </div>
                {tool.usage && <p className="text-slate-400 text-sm mt-1">{tool.usage}</p>}
                {tool.choices && (
                  <div className="mt-2 space-y-1">
                    {tool.choices.map((c, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="text-slate-600 text-xs">→</span>
                        <span className="text-slate-300 text-sm">{c.label}</span>
                        <span className="badge bg-slate-700/60 border-slate-600/50 text-slate-400 text-xs">{c.profile}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <p className="text-slate-600 text-xs">Cliquez pour cocher chaque outil installé</p>
      </div>

      {/* Commitment */}
      <div className="card p-5 border-violet-500/30 bg-violet-950/15">
        <p className="text-violet-300 font-bold mb-2">🎯 Mon engagement cette semaine :</p>
        <input
          type="text"
          placeholder="Cette semaine, je vais utiliser l'IA pour…"
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 text-sm"
          aria-label="Engagement personnel"
        />
      </div>

      {/* Copy button */}
      <button onClick={copyChecklist}
        className={`w-full py-3 rounded-xl border font-medium text-sm transition-all ${
          copied
            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
            : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
        }`}>
        {copied ? '✅ Checklist copiée dans le presse-papier !' : '📋 Copier la checklist complète'}
      </button>
    </div>
  );
}
