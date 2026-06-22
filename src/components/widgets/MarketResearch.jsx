import { useState } from 'react';

const MOCKED_RESULTS = {
  ecotrack: {
    competitors: [
      { name: 'Greenly', positioning: 'PME/ETI', strength: 'Interface claire, rapport CSRD', weakness: 'Prix élevé (>2000€/an)', funding: '70M€' },
      { name: 'Sweep',   positioning: 'ETI/Grands comptes', strength: 'Plateforme complète scopes 1-2-3', weakness: 'Trop complexe pour PME', funding: '73M€' },
      { name: 'Traace',  positioning: 'Startups / Scale-ups', strength: 'Onboarding rapide', weakness: 'Données sectorielles limitées', funding: '10M€' },
      { name: 'Carbo',   positioning: 'TPE/PME', strength: 'Prix accessible (149€/mois)', weakness: 'Pas de rapport CSRD natif', funding: '5M€' },
    ],
    trends: [
      '📈 Obligation CSRD étendue aux PME cotées à partir de 2026 — la demande va exploser',
      '🤝 Les grands donneurs d\'ordre imposent le bilan GES à leurs fournisseurs PME',
      '🤖 L\'IA réduit le coût de collecte des données de 70% (OCR factures, API bancaires)',
      '🇫🇷 La Base Carbone ADEME s\'enrichit — meilleure précision des calculs scope 3',
      '💰 Le marché des certifications carbone B2B croît de 40%/an en Europe',
    ],
  },
  default: {
    competitors: [
      { name: 'Concurrent A', positioning: 'Grands comptes', strength: 'Marque établie', weakness: 'Lent à innover', funding: '50M€' },
      { name: 'Concurrent B', positioning: 'PME', strength: 'Prix bas', weakness: 'Fonctions limitées', funding: '5M€' },
      { name: 'Concurrent C', positioning: 'Startups', strength: 'UX moderne', weakness: 'Peu de clients', funding: '2M€' },
    ],
    trends: [
      '📈 Le marché croît de 25%/an — opportunité de capturer des parts rapidement',
      '🤖 L\'IA réduit les coûts opérationnels de 40-60% dans ce secteur',
      '🌍 Les réglementations européennes créent une obligation de conformité',
      '💡 Les clients recherchent des solutions intégrées (API-first)',
      '🔀 Consolidation du marché — les petits acteurs sont rachetés',
    ],
  },
};

export default function MarketResearch({ filRouge }) {
  const [mode, setMode] = useState(null); // null | 'competitor' | 'trends'
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const data = MOCKED_RESULTS[filRouge?.id] || MOCKED_RESULTS.default;

  const startGen = (m) => {
    setMode(m);
    setGenerating(true);
    setDone(false);
    setTimeout(() => { setGenerating(false); setDone(true); }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Étude de marché augmentée par IA</h3>
        <p className="text-slate-400 mt-1">
          Simulation d'une analyse concurrentielle et des tendances clés
          {filRouge && <span className="ml-2 badge bg-blue-500/15 border-blue-500/30 text-blue-300">{filRouge.emoji} {filRouge.name}</span>}
        </p>
      </div>

      {/* Action buttons */}
      <div className="grid sm:grid-cols-2 gap-3">
        <button onClick={() => startGen('competitor')}
          className={`card p-5 text-left hover:border-blue-500/40 transition-all group ${mode === 'competitor' ? 'border-blue-500/40' : ''}`}>
          <div className="text-2xl mb-2">🗺️</div>
          <div className="font-bold text-white">Mapping concurrentiel</div>
          <div className="text-slate-400 text-sm mt-1">« Qui sont les acteurs du marché et leurs différenciateurs ? »</div>
          <div className="mt-3 text-blue-400 text-sm group-hover:translate-x-1 transition-transform">Analyser avec Perplexity AI →</div>
        </button>
        <button onClick={() => startGen('trends')}
          className={`card p-5 text-left hover:border-blue-500/40 transition-all group ${mode === 'trends' ? 'border-blue-500/40' : ''}`}>
          <div className="text-2xl mb-2">📊</div>
          <div className="font-bold text-white">5 tendances majeures 2026</div>
          <div className="text-slate-400 text-sm mt-1">« Analyse ces rapports PDF et sors les tendances clés »</div>
          <div className="mt-3 text-blue-400 text-sm group-hover:translate-x-1 transition-transform">Analyser avec Claude →</div>
        </button>
      </div>

      {/* Generating animation */}
      {generating && (
        <div className="card p-6 border-blue-500/20 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
            <span className="text-blue-300 text-sm">L'IA analyse les données… (simulation)</span>
          </div>
        </div>
      )}

      {/* Results */}
      {done && mode === 'competitor' && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-blue-400 font-medium text-sm">✅ Analyse concurrentielle générée :</p>
          <div className="overflow-x-auto rounded-xl border border-blue-500/20">
            <table className="w-full text-sm">
              <thead className="bg-blue-950/30">
                <tr>
                  {['Acteur', 'Positionnement', 'Forces', 'Faiblesses', 'Fonds levés'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-blue-300 text-xs font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {data.competitors.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-3 font-bold text-white">{c.name}</td>
                    <td className="px-4 py-3 text-slate-400">{c.positioning}</td>
                    <td className="px-4 py-3 text-emerald-300">{c.strength}</td>
                    <td className="px-4 py-3 text-red-300">{c.weakness}</td>
                    <td className="px-4 py-3 text-slate-300">{c.funding}</td>
                  </tr>
                ))}
                <tr className="bg-blue-950/20">
                  <td className="px-4 py-3 font-bold text-blue-300">{filRouge?.name || 'Votre startup'}</td>
                  <td className="px-4 py-3 text-blue-300">PME / RSE</td>
                  <td className="px-4 py-3 text-blue-300">IA + prix accessible</td>
                  <td className="px-4 py-3 text-blue-300">Notoriété à bâtir</td>
                  <td className="px-4 py-3 text-blue-300">Seed (en cours)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-slate-500 text-xs">⚠️ Simulation pédagogique — à vérifier avec Perplexity AI + sources primaires</p>
        </div>
      )}

      {done && mode === 'trends' && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-blue-700 font-medium text-sm">✅ 5 tendances majeures identifiées :</p>
          <div className="space-y-2">
            {data.trends.map((t, i) => (
              <div key={i} className="card p-4 border-blue-500/20 flex items-start gap-3"
                style={{ animationDelay: `${i * 100}ms` }}>
                <span className="text-blue-700 font-bold text-sm shrink-0">{i + 1}.</span>
                <p className="text-slate-700 text-sm">{t}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs">⚠️ Simulation pédagogique — à compléter avec vos propres recherches Perplexity</p>
        </div>
      )}
    </div>
  );
}
