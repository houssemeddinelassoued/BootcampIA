import { useState, useEffect } from 'react';

const EXAMPLES = [
  {
    context: 'Le ciel est',
    tokens: [
      {
        word: 'bleu',
        prob: 0.34,
        color: 'emerald',
        continuation: 'bleu ce matin, avec un vent faible venant du nord.',
        explanation: 'Suite descriptive cohérente avec une météo stable et positive.',
      },
      {
        word: 'gris',
        prob: 0.26,
        color: 'blue',
        continuation: 'gris et lourd, annonçant peut-être une pluie en fin de journée.',
        explanation: 'Le modèle bascule vers un registre plus prudent et nuancé.',
      },
      {
        word: 'nuageux',
        prob: 0.20,
        color: 'violet',
        continuation: 'nuageux mais lumineux, sans précipitations immédiates.',
        explanation: 'Chemin intermédiaire: ni totalement ensoleillé, ni franchement mauvais.',
      },
      {
        word: 'loin',
        prob: 0.12,
        color: 'orange',
        continuation: 'loin des préoccupations du jour, dans une métaphore poétique inattendue.',
        explanation: 'Token grammaticalement moins attendu: la suite devient plus créative.',
      },
      {
        word: 'vanille',
        prob: 0.08,
        color: 'slate',
        continuation: 'vanille... image absurde qui montre une dérive sémantique possible.',
        explanation: 'Exemple d\'option improbable qui peut produire une continuation incohérente.',
      },
    ],
    insight: 'Quand on clique un token moins probable, la suite peut rester fluide mais dériver du sens attendu.',
  },
  {
    context: 'في اجتماع اليوم قرر الفريق أن',
    tokens: [
      {
        word: 'يُطلق',
        prob: 0.36,
        color: 'emerald',
        continuation: 'يُطلق نسخة تجريبية هذا الشهر لاختبار ردود فعل العملاء.',
        explanation: 'اختيار عملي يدل على قرار تنفيذي سريع مع تركيز على التحقق من السوق.',
      },
      {
        word: 'يؤجل',
        prob: 0.24,
        color: 'blue',
        continuation: 'يؤجل الإطلاق حتى يكتمل التكامل مع نظام الفوترة.',
        explanation: 'نبرة حذرة: الجودة والاعتمادية مقدمتان على السرعة.',
      },
      {
        word: 'يُحسّن',
        prob: 0.19,
        color: 'violet',
        continuation: 'يُحسّن تجربة الاستخدام قبل أي حملة تسويق واسعة.',
        explanation: 'التركيز ينتقل إلى القيمة المتصورة قبل التوسع التجاري.',
      },
      {
        word: 'يختبر',
        prob: 0.13,
        color: 'orange',
        continuation: 'يختبر فرضية التسعير مع ثلاث شرائح من العملاء.',
        explanation: 'اختيار تحليلي يفتح مسار تجارب وقياسات أكثر.',
      },
      {
        word: 'يتراجع',
        prob: 0.08,
        color: 'slate',
        continuation: 'يتراجع مؤقتا لإعادة تعريف الأولويات والموارد.',
        explanation: 'هذا المسار أقل تفاؤلا ويؤدي غالبا إلى إعادة تخطيط شاملة.',
      },
    ],
    insight: 'Même en arabe, le LLM ne "comprend" pas comme un humain: il estime des probabilités de tokens selon le contexte.',
  },
  {
    context: 'La startup a levé',
    tokens: [
      {
        word: '5',
        prob: 0.33,
        color: 'emerald',
        continuation: '5 millions d\'euros en série A pour accélérer son expansion régionale.',
        explanation: 'Chemin classique d\'annonce financière structuré et crédible.',
      },
      {
        word: '10',
        prob: 0.25,
        color: 'blue',
        continuation: '10 millions, ce qui implique souvent un plan de croissance plus agressif.',
        explanation: 'Un montant plus élevé entraîne une narration de scale-up plus forte.',
      },
      {
        word: '2',
        prob: 0.22,
        color: 'violet',
        continuation: '2 millions pour consolider le produit avant une levée plus large.',
        explanation: 'Interprétation orientée prudence: validation produit d\'abord.',
      },
      {
        word: 'plusieurs',
        prob: 0.13,
        color: 'orange',
        continuation: 'plusieurs tickets auprès de business angels spécialisés.',
        explanation: 'La phrase reste logique mais devient moins précise numériquement.',
      },
      {
        word: 'des',
        prob: 0.07,
        color: 'slate',
        continuation: 'des fonds additionnels, formulation vague et moins informative.',
        explanation: 'Token faible probabilité: la suite devient générique et parfois floue.',
      },
    ],
    insight: 'Le modèle n\'a pas besoin d\'Internet dans l\'instant: il complète par probabilité à partir de schémas appris.',
  },
];

const CHIP = {
  emerald: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-800 hover:bg-emerald-500/25',
  blue:    'bg-blue-500/15 border-blue-500/40 text-blue-800 hover:bg-blue-500/25',
  violet:  'bg-blue-500/15 border-blue-500/40 text-blue-800 hover:bg-blue-500/25',
  orange:  'bg-orange-500/15 border-orange-500/40 text-orange-800 hover:bg-orange-500/25',
  slate:   'bg-slate-700/50 border-slate-600/50 text-slate-700 hover:bg-slate-700/60',
};
const BAR = {
  emerald: 'bg-emerald-500', blue: 'bg-blue-500',
  violet: 'bg-blue-500', orange: 'bg-orange-500', slate: 'bg-slate-500',
};

export default function TokenPredictor() {
  const [exIdx, setExIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [animated, setAnimated] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const ex = EXAMPLES[exIdx];

  const adjustedTokens = (() => {
    const t = Math.max(0.1, Number(temperature));
    const weighted = ex.tokens.map(tok => ({
      ...tok,
      adjusted: Math.pow(tok.prob, 1 / t),
    }));
    const total = weighted.reduce((sum, tok) => sum + tok.adjusted, 0);
    return weighted.map(tok => ({
      ...tok,
      adjustedProb: tok.adjusted / total,
    }));
  })();

  const sampleToken = () => {
    const r = Math.random();
    let acc = 0;
    for (const tok of adjustedTokens) {
      acc += tok.adjustedProb;
      if (r <= acc) {
        setChosen(tok);
        return;
      }
    }
    setChosen(adjustedTokens[adjustedTokens.length - 1]);
  };

  useEffect(() => {
    setAnimated(false);
    setChosen(null);
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, [exIdx, temperature]);

  const handleNext = () => {
    setExIdx(i => (i + 1) % EXAMPLES.length);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Comment un LLM « réfléchit »</h3>
          <p className="text-slate-400 mt-1">Cliquez sur un token pour voir ce que le modèle « choisit »</p>
        </div>
        <span className="badge bg-blue-500/15 border-blue-500/30 text-blue-700">
          {exIdx + 1}/{EXAMPLES.length}
        </span>
      </div>

      {/* Context */}
      <div className="card p-5 border-blue-500/20">
        <p className="text-slate-400 text-sm mb-2">Contexte (tokens déjà traités) :</p>
        <p className="text-2xl lg:text-3xl font-bold text-white leading-relaxed">
          {ex.context}{' '}
          <span className="inline-block w-10 h-8 rounded-md bg-blue-500/30 border-2 border-blue-400 animate-blink align-middle" aria-label="curseur de prédiction" />
        </p>
        <p className="text-slate-600 text-xs mt-2">← Le LLM lit ce contexte et calcule la probabilité de chaque token suivant</p>
      </div>

      {/* Temperature control */}
      <div className="card p-4 border-blue-500/20">
        <div className="flex items-center justify-between gap-3 mb-2">
          <p className="text-sm font-semibold text-white">🌡️ Température du modèle</p>
          <span className="badge bg-blue-500/15 border-blue-500/30 text-blue-300">{temperature.toFixed(1)}</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="1.5"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(Number(e.target.value))}
          className="w-full"
          aria-label="Température du modèle"
        />
        <p className="text-xs text-slate-500 mt-2">
          0.1 = très déterministe, 1.0 = équilibré, 1.5 = plus créatif/aléatoire
        </p>
      </div>

      {/* Tokens */}
      {!chosen && (
        <div className="space-y-2.5 animate-fade-in">
          <p className="text-slate-300 text-sm font-medium">Quelle est la probabilité de chaque token suivant ?</p>
          {adjustedTokens.map((t, i) => (
            <button
              key={t.word}
              onClick={() => setChosen(t)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl border text-left transition-all duration-150 active:scale-[0.99] ${CHIP[t.color]}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="w-12 text-right font-mono font-bold text-sm shrink-0">
                {Math.round(t.adjustedProb * 100)}%
              </span>
              <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${BAR[t.color]}`}
                  style={{
                    width: animated ? `${Math.round(t.adjustedProb * 100)}%` : '0%',
                    transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>
              <span className="w-28 font-semibold text-lg shrink-0">« {t.word} »</span>
            </button>
          ))}
          <button onClick={sampleToken} className="btn-primary w-full mt-2">
            🎲 Échantillonner selon la température
          </button>
        </div>
      )}

      {/* Reveal after choice */}
      {chosen && (
        <div className="space-y-4 animate-slide-up">
          <div className="card p-5 border-blue-500/30">
            <p className="text-slate-400 text-xs mb-1">Le LLM sélectionne :</p>
            <p className="text-2xl font-bold text-white">
              {ex.context}{' '}
              <span className="text-blue-700 underline decoration-wavy decoration-blue-500">« {chosen.word} »</span>
            </p>
          </div>

          <div className="card p-4 bg-emerald-900/10 border-emerald-500/25">
            <p className="text-emerald-400 text-xs font-bold mb-1">↪ Suite probable :</p>
            <p className="text-white text-lg italic">« {chosen.continuation} »</p>
          </div>

          <div className="card p-4 bg-blue-950/10 border-blue-500/25">
            <p className="text-blue-700 text-xs font-bold mb-2">💡 Ce que ça illustre :</p>
            <p className="text-slate-300 text-sm">
              Vous avez choisi <strong className="text-white">« {chosen.word} »</strong> ({Math.round(chosen.adjustedProb * 100)}%) : {chosen.explanation}
            </p>
            <p className="text-slate-400 text-sm mt-2">{ex.insight}</p>
            <ul className="mt-2 space-y-1 text-slate-400 text-sm">
              <li>• Un LLM génère <strong className="text-white">1 token à la fois</strong>, pas une phrase entière d'un coup</li>
              <li>• Les <strong className="text-white">hallucinations</strong> arrivent quand plusieurs mauvais tokens ont des probabilités similaires</li>
              <li>• Le <strong className="text-white">contexte</strong> (prompt) conditionne entièrement les prédictions → soigner son prompt = soigner le résultat</li>
            </ul>
          </div>

          <button onClick={handleNext} className="btn-primary w-full text-center py-3">
            Exemple suivant ({exIdx + 1}/{EXAMPLES.length}) →
          </button>
        </div>
      )}
    </div>
  );
}
