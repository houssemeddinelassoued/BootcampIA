import { useState } from 'react';

const WITHOUT_RAG = {
  query: 'Quelles sont les obligations CSRD pour les PME en 2025 ?',
  answer: 'Les PME doivent soumettre un rapport de durabilité complet avant le 31 mars 2025, couvrant toutes leurs activités mondiales selon le standard ESRS-SME. La pénalité en cas de non-conformité est de 250 000 € par manquement.',
  tag: '⚠️ Hallucination',
  tagColor: 'text-red-400',
  issues: ['Date incorrecte — le seuil CSRD PME est 2026, pas 2025', 'Montant de pénalité inventé', 'Standard « ESRS-SME » inexact', 'Le modèle « devine » à partir de son entraînement sans source vérifiable'],
};

const WITH_RAG = {
  docs: [
    { title: 'Directive CSRD 2022/2464/EU — Article 19a', excerpt: '...les grandes entreprises à compter du 1er janvier 2024, les PME cotées à compter du 1er janvier 2026...' },
    { title: 'EFRAG — Guide PME non-cotées (2024)', excerpt: '...standard volontaire VSME (Voluntary SME Standard) pour les PME hors obligation légale...' },
  ],
  answer: 'Pour les PME françaises : les PME cotées sont soumises à la CSRD à partir des exercices ouverts au 1er janvier 2026. Les PME non-cotées ne sont pas directement soumises, mais peuvent être impactées par les exigences de reporting de leurs grands clients.',
  tag: '✅ Réponse sourcée',
  tagColor: 'text-emerald-400',
};

export default function RagVisualizer() {
  const [mode, setMode] = useState('intro'); // 'intro' | 'without' | 'with' | 'compare'
  const [ragStep, setRagStep] = useState(0); // 0=query, 1=retrieve, 2=augment, 3=answer

  const advanceRag = () => setRagStep(s => Math.min(s + 1, 3));

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Le RAG — Donner un livre ouvert à l'IA</h3>
        <p className="text-slate-400 mt-1">Comparez une réponse <em>sans</em> RAG (hallucination possible) vs <em>avec</em> RAG (sourcée)</p>
      </div>

      {/* Simplified RAG architecture */}
      <div className="card p-4 border-blue-500/20 bg-blue-950/10">
        <p className="text-sm font-semibold text-blue-300 mb-3">🧩 Architecture RAG simplifiée</p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center text-center text-xs">
          <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-2.5">👤 Question utilisateur</div>
          <div className="text-slate-500">→</div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-2.5">🔎 Retriever (base documentaire)</div>
          <div className="text-slate-500">→</div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/40 p-2.5">🤖 LLM + contexte injecté</div>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id:'without', label:'Sans RAG', icon:'❌' },
          { id:'with',    label:'Avec RAG', icon:'📚' },
          { id:'compare', label:'Comparaison',  icon:'⚡' },
        ].map(tab => (
          <button key={tab.id} onClick={() => { setMode(tab.id); setRagStep(0); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              mode === tab.id
                ? 'bg-blue-500/20 border-blue-500/40 text-blue-700'
                : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-900'
            }`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Without RAG */}
      {mode === 'without' && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-4 border-red-500/20 bg-red-950/10">
            <p className="text-slate-400 text-xs mb-2">Question posée au LLM :</p>
            <p className="text-white font-medium italic">« {WITHOUT_RAG.query} »</p>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-sm">Le LLM répond depuis sa mémoire d'entraînement…</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
          <div className="card p-5 border-red-500/30 bg-red-950/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-400 font-bold text-sm">{WITHOUT_RAG.tag}</span>
            </div>
            <p className="text-white leading-relaxed">{WITHOUT_RAG.answer}</p>
          </div>
          <div className="card p-4 bg-red-900/10 border-red-500/20">
            <p className="text-red-400 text-sm font-bold mb-2">🚨 Problèmes identifiés :</p>
            <ul className="space-y-1">
              {WITHOUT_RAG.issues.map((issue, i) => (
                <li key={i} className="text-red-700 text-sm flex gap-2">
                  <span className="text-red-500 shrink-0">✗</span> {issue}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* With RAG */}
      {mode === 'with' && (
        <div className="space-y-4 animate-fade-in">
          {/* Step 0: Query */}
          <div className="card p-4 border-blue-500/20">
            <p className="text-slate-400 text-xs mb-1">1. Question :</p>
            <p className="text-white font-medium italic">« {WITH_RAG.docs[0] && WITHOUT_RAG.query} »</p>
          </div>

          {/* Step 1: Retrieve button */}
          {ragStep === 0 && (
            <button onClick={advanceRag} className="btn-primary w-full py-3">
              📚 Étape 2 : Rechercher dans les documents →
            </button>
          )}

          {/* Documents retrieved */}
          {ragStep >= 1 && (
            <div className="space-y-2 animate-fade-in">
              <p className="text-blue-400 text-sm font-medium">2. Documents récupérés (retrieval) :</p>
              {WITH_RAG.docs.map((doc, i) => (
                <div key={i} className="card p-4 border-blue-500/20 bg-blue-950/10">
                  <p className="text-blue-300 text-xs font-bold mb-1">📄 {doc.title}</p>
                  <p className="text-slate-300 text-sm italic">«  {doc.excerpt}  »</p>
                </div>
              ))}
            </div>
          )}

          {ragStep === 1 && (
            <button onClick={advanceRag} className="btn-primary w-full py-3">
              🔗 Étape 3 : Augmenter le contexte du LLM →
            </button>
          )}

          {ragStep >= 2 && (
            <div className="card p-4 border-violet-500/20 bg-violet-950/10 animate-fade-in">
              <p className="text-violet-300 text-xs font-bold mb-2">3. Prompt augmenté envoyé au LLM :</p>
              <p className="text-slate-400 text-xs leading-relaxed">
                « Réponds à la question en te basant UNIQUEMENT sur les documents fournis :<br/>
                [Document 1]…[Document 2]…<br/>
                Question : {WITHOUT_RAG.query} »
              </p>
            </div>
          )}

          {ragStep === 2 && (
            <button onClick={advanceRag} className="btn-primary w-full py-3">
              ✅ Étape 4 : Voir la réponse sourcée →
            </button>
          )}

          {ragStep >= 3 && (
            <div className="space-y-3 animate-slide-up">
              <div className="card p-5 border-emerald-500/30 bg-emerald-950/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-400 font-bold text-sm">{WITH_RAG.tag}</span>
                </div>
                <p className="text-white leading-relaxed">{WITH_RAG.answer}</p>
              </div>
              <div className="card p-4 bg-emerald-900/10 border-emerald-500/20">
                <p className="text-emerald-300 text-sm font-bold mb-1">💡 Pourquoi c'est mieux :</p>
                <ul className="text-slate-300 text-sm space-y-1">
                  <li>✓ Basé sur des documents réels et vérifiables</li>
                  <li>✓ Le LLM ne peut pas inventer — il synthétise les sources</li>
                  <li>✓ Applicable aux données propriétaires de votre startup</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compare side by side */}
      {mode === 'compare' && (
        <div className="grid lg:grid-cols-2 gap-4 animate-fade-in">
          <div className="card p-5 border-red-500/25 bg-red-950/10">
            <p className="text-red-400 font-bold text-sm mb-3">❌ Sans RAG</p>
            <p className="text-slate-700 text-sm leading-relaxed">{WITHOUT_RAG.answer}</p>
            <div className="mt-3 pt-3 border-t border-red-500/20">
              {WITHOUT_RAG.issues.slice(0,2).map((i,k) => <p key={k} className="text-red-700 text-xs">✗ {i}</p>)}
            </div>
          </div>
          <div className="card p-5 border-emerald-500/25 bg-emerald-950/10">
            <p className="text-emerald-400 font-bold text-sm mb-3">✅ Avec RAG</p>
            <p className="text-slate-700 text-sm leading-relaxed">{WITH_RAG.answer}</p>
            <div className="mt-3 pt-3 border-t border-emerald-500/20 space-y-1">
              <p className="text-emerald-700 text-xs">✓ Basé sur 2 sources officielles</p>
              <p className="text-emerald-700 text-xs">✓ Dates et chiffres vérifiables</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
