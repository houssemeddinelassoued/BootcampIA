import { useState } from 'react';

const SKETCH_ELEMENTS = [
  { x: 10, y: 8,  w: 80, h: 10, rx: 2, label: '⬛ Header — Dashboard EcoTrack', fill: '#334155' },
  { x: 10, y: 24, w: 36, h: 30, rx: 2, label: '📊 Graphique émissions', fill: '#1e3a5f' },
  { x: 52, y: 24, w: 38, h: 13, rx: 2, label: '📈 Scope 1', fill: '#1e3a5f' },
  { x: 52, y: 41, w: 38, h: 13, rx: 2, label: '📈 Scope 2', fill: '#1e3a5f' },
  { x: 10, y: 60, w: 80, h: 10, rx: 4, label: '🔘 Bouton Export CSRD', fill: '#065f46' },
];

const GENERATED_HTML = `<!-- Dashboard EcoTrack généré par Claude Vision -->
<div class="min-h-screen bg-gray-950 text-white font-sans">
  
  <!-- Header -->
  <header class="bg-emerald-900 px-6 py-4 flex items-center justify-between">
    <h1 class="text-xl font-bold">🌱 EcoTrack — Dashboard Carbone</h1>
    <span class="badge bg-emerald-500/20 text-emerald-300">Scope 1·2·3</span>
  </header>

  <main class="p-6 grid grid-cols-3 gap-4">
    
    <!-- Graphique émissions -->
    <div class="col-span-2 bg-slate-800 rounded-xl p-4">
      <h2 class="text-sm font-bold text-slate-300 mb-3">Émissions mensuelles (tCO₂e)</h2>
      <div class="flex items-end gap-2 h-32">
        <!-- Bars (simplified) -->
        <div class="flex-1 bg-emerald-500/40 rounded-t" style="height:60%"></div>
        <div class="flex-1 bg-emerald-500/60 rounded-t" style="height:75%"></div>
        <div class="flex-1 bg-emerald-500/80 rounded-t" style="height:55%"></div>
        <div class="flex-1 bg-emerald-500 rounded-t" style="height:45%"></div>
      </div>
    </div>

    <!-- KPIs -->
    <div class="space-y-3">
      <div class="bg-slate-800 rounded-xl p-4">
        <p class="text-xs text-slate-400">Scope 1 (direct)</p>
        <p class="text-2xl font-bold text-emerald-400">12.4 tCO₂e</p>
      </div>
      <div class="bg-slate-800 rounded-xl p-4">
        <p class="text-xs text-slate-400">Scope 2 (énergie)</p>
        <p class="text-2xl font-bold text-blue-400">34.7 tCO₂e</p>
      </div>
    </div>

    <!-- Export button -->
    <div class="col-span-3">
      <button class="w-full bg-emerald-600 hover:bg-emerald-500 
                     text-white font-bold py-3 rounded-xl transition">
        📄 Générer le Rapport CSRD
      </button>
    </div>
  </main>
</div>`;

export default function MockupDemo() {
  const [phase, setPhase] = useState('sketch'); // sketch | generating | code | preview
  const [codeLines, setCodeLines] = useState(0);

  const generateCode = () => {
    setPhase('generating');
    setTimeout(() => {
      setPhase('code');
      let lines = 0;
      const total = GENERATED_HTML.split('\n').length;
      const id = setInterval(() => {
        lines++;
        setCodeLines(lines);
        if (lines >= total) clearInterval(id);
      }, 60);
    }, 1800);
  };

  const lines = GENERATED_HTML.split('\n');

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Maquettage — Photo → HTML</h3>
        <p className="text-slate-600 mt-1">Dessinez sur papier, importez la photo dans Claude, puis récupérez un HTML/Tailwind exploitable.</p>
      </div>

      <div className="card p-4 border-blue-500/20 bg-blue-950/10">
        <p className="text-blue-700 text-sm font-semibold mb-2">Parcours en 3 étapes</p>
        <div className="grid sm:grid-cols-3 gap-2 text-sm">
          <p className="text-slate-700">1. Schéma papier</p>
          <p className="text-slate-700">2. Code généré</p>
          <p className="text-slate-700">3. Aperçu final</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id:'sketch', label:'📝 Schéma papier' },
          { id:'code',   label:'💻 Code généré' },
          { id:'preview',label:'👁️ Aperçu' },
        ].map(tab => (
          <button key={tab.id}
            onClick={() => { if (tab.id !== 'sketch' && phase === 'sketch') return; setPhase(tab.id); }}
            className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              phase === tab.id
                ? 'bg-orange-500/20 border-orange-500/40 text-orange-800'
                : 'bg-slate-800 border-slate-700 text-slate-600 hover:text-slate-900'
            } ${tab.id !== 'sketch' && phase === 'sketch' ? 'opacity-40 cursor-not-allowed' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sketch phase */}
      {phase === 'sketch' && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-6 border-orange-500/20 bg-slate-900">
            <p className="text-slate-700 text-sm mb-4 font-medium">Interface dessinée sur papier (simulation) :</p>
            <div className="bg-white rounded-lg p-4 relative" style={{ height: 200 }}>
              <svg viewBox="0 0 100 80" className="w-full h-full">
                {SKETCH_ELEMENTS.map((el, i) => (
                  <g key={i}>
                    <rect x={el.x} y={el.y} width={el.w} height={el.h} rx={el.rx}
                      fill={el.fill} stroke="#94a3b8" strokeWidth="0.5" />
                    <text x={el.x + el.w/2} y={el.y + el.h/2 + 1.5}
                      textAnchor="middle" fill="white" fontSize="3.5">{el.label}</text>
                  </g>
                ))}
              </svg>
            </div>
            <p className="text-slate-600 text-sm mt-3 text-center">
              Ce croquis est ensuite photographié puis envoyé à Claude avec le prompt ci-dessous.
            </p>
          </div>

          <div className="card p-4 border-orange-500/20 bg-orange-950/10 font-mono text-sm text-slate-700 leading-relaxed">
            <span className="text-orange-700 font-bold">Prompt :</span><br />
            « [Image jointe] Génère le code HTML avec Tailwind CSS correspondant à cette maquette.
            Utilise un fond sombre (slate-950), des composants réactifs et de vraies données de démonstration. »
          </div>

          <button onClick={generateCode} className="btn-primary w-full py-4 text-base">
            ⚡ Générer le code HTML/Tailwind →
          </button>
        </div>
      )}

      {/* Generating */}
      {phase === 'generating' && (
        <div className="card p-8 border-orange-500/20 text-center space-y-4 animate-fade-in">
          <div className="flex justify-center gap-2">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                style={{ animationDelay:`${i*120}ms` }} />
            ))}
          </div>
          <p className="text-orange-300 font-medium">Claude Vision analyse le croquis…</p>
          <div className="text-slate-500 text-sm space-y-1">
            <p>• Détection des éléments UI…</p>
            <p>• Génération de la structure HTML…</p>
            <p>• Application des classes Tailwind…</p>
          </div>
        </div>
      )}

      {/* Code view */}
      {(phase === 'code' || phase === 'preview') && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <p className="text-orange-700 text-sm font-semibold">✅ Code généré en ~2 secondes</p>
            <button onClick={() => setPhase('preview')}
              className="text-xs btn-ghost border border-slate-700">👁️ Voir l'aperçu →</button>
          </div>

          {phase === 'code' && (
            <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-auto max-h-80">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900/80">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-slate-500 text-xs ml-2 font-mono">dashboard-ecotrack.html</span>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto">
                {lines.slice(0, codeLines).map((line, i) => (
                  <div key={i} className="flex">
                    <span className="text-slate-600 w-8 shrink-0 text-right mr-4 select-none">{i + 1}</span>
                    <span className={
                      line.trim().startsWith('<!--') ? 'text-slate-500' :
                      line.includes('class=') ? 'text-orange-300' :
                      line.includes('<') ? 'text-blue-300' : 'text-slate-300'
                    }>{line}</span>
                  </div>
                ))}
              </pre>
            </div>
          )}

          {phase === 'preview' && (
            <div className="rounded-xl overflow-hidden border border-orange-500/20 shadow-2xl">
              {/* Simulated rendered UI */}
              <div className="bg-slate-950 text-white font-sans text-sm">
                <div className="bg-emerald-900 px-4 py-3 flex items-center justify-between">
                  <span className="font-bold">🌱 EcoTrack — Dashboard Carbone</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">Scope 1·2·3</span>
                </div>
                <div className="p-4 grid grid-cols-3 gap-3">
                  <div className="col-span-2 bg-slate-800 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-2">Émissions mensuelles (tCO₂e)</p>
                    <div className="flex items-end gap-1.5 h-24">
                      {[60,75,55,45,65,50].map((h, i) => (
                        <div key={i} className="flex-1 bg-emerald-500/60 rounded-t-sm transition-all"
                          style={{ height: `${h}%`, animationDelay:`${i*100}ms` }} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-slate-800 rounded-xl p-3">
                      <p className="text-xs text-slate-400">Scope 1</p>
                      <p className="text-xl font-bold text-emerald-400">12.4 t</p>
                    </div>
                    <div className="bg-slate-800 rounded-xl p-3">
                      <p className="text-xs text-slate-400">Scope 2</p>
                      <p className="text-xl font-bold text-blue-400">34.7 t</p>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-center text-sm">
                      📄 Générer le Rapport CSRD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
