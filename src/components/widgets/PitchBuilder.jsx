import { useState } from 'react';
import { FIL_ROUGE_OPTIONS } from '../../data/sessions';

const SLIDES_TEMPLATE = [
  { emoji:'😱', title:'Problème', key:'probleme' },
  { emoji:'✨', title:'Solution',  key:'solution' },
  { emoji:'🌍', title:'Marché',    key:'marche' },
  { emoji:'🧑‍🤝‍🧑', title:'Équipe',    key:'equipe' },
  { emoji:'🛠️', title:'MVP',       key:'mvp' },
  { emoji:'💰', title:'Modèle',    key:'monetisation' },
];

export default function PitchBuilder({ filRouge }) {
  const [phase, setPhase] = useState('idle'); // idle | generating | deck | elevator
  const [visibleSlides, setVisibleSlides] = useState(0);
  const [elevatorTyped, setElevatorTyped] = useState('');

  const fr = filRouge || FIL_ROUGE_OPTIONS[0];
  const deck = fr.pitchDeck || FIL_ROUGE_OPTIONS[0].pitchDeck;
  const pitch = fr.pitchElevator || FIL_ROUGE_OPTIONS[0].pitchElevator;

  const generateDeck = () => {
    setPhase('generating');
    setVisibleSlides(0);
    setTimeout(() => {
      setPhase('deck');
      let i = 0;
      const id = setInterval(() => {
        i++;
        setVisibleSlides(i);
        if (i >= SLIDES_TEMPLATE.length) clearInterval(id);
      }, 350);
    }, 1500);
  };

  const generateElevator = () => {
    setPhase('elevator');
    setElevatorTyped('');
    let i = 0;
    const id = setInterval(() => {
      setElevatorTyped(pitch.slice(0, ++i));
      if (i >= pitch.length) clearInterval(id);
    }, 16);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 lg:p-10 space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-white">Pitch & Communication</h3>
        <p className="text-slate-400 mt-1">
          Générez le pitch deck et l'argumentaire pour{' '}
          <span className="text-emerald-300 font-medium">{fr.name}</span>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <button onClick={generateDeck}
          className="card p-5 text-left hover:border-emerald-500/40 transition-all group">
          <div className="text-2xl mb-2">📊</div>
          <div className="font-bold text-white">Générer le Pitch Deck</div>
          <div className="text-slate-400 text-sm mt-1">6 slides structurées depuis le BMC</div>
          <div className="mt-3 text-emerald-400 text-sm group-hover:translate-x-1 transition-transform">Générer avec Gamma.app →</div>
        </button>
        <button onClick={generateElevator}
          className="card p-5 text-left hover:border-emerald-500/40 transition-all group">
          <div className="text-2xl mb-2">🎤</div>
          <div className="font-bold text-white">Pitch Ascenseur 30s</div>
          <div className="text-slate-400 text-sm mt-1">Script à prononcer à voix haute</div>
          <div className="mt-3 text-emerald-400 text-sm group-hover:translate-x-1 transition-transform">Générer avec Claude →</div>
        </button>
      </div>

      {/* Generating */}
      {phase === 'generating' && (
        <div className="card p-6 border-emerald-500/20 text-center animate-fade-in">
          <div className="flex justify-center gap-2 mb-3">
            {[0,1,2,3].map(i => <div key={i} className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay:`${i*120}ms` }} />)}
          </div>
          <p className="text-emerald-300">Gamma.app génère les slides…</p>
        </div>
      )}

      {/* Deck slides */}
      {phase === 'deck' && (
        <div className="space-y-4 animate-fade-in">
          <p className="text-emerald-400 text-sm font-medium">✅ Pitch Deck généré — {visibleSlides}/{SLIDES_TEMPLATE.length} slides</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SLIDES_TEMPLATE.slice(0, visibleSlides).map((s, i) => (
              <div key={s.key} className="card p-4 border-emerald-500/20 hover:border-emerald-500/40 transition-all animate-bounce-in">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{s.emoji}</span>
                  <span className="font-bold text-white text-sm">{s.title}</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{deck[s.key]}</p>
              </div>
            ))}
          </div>
          <button onClick={generateElevator}
            className="w-full py-3 rounded-xl border border-emerald-500/30 bg-emerald-950/10 text-emerald-300 hover:bg-emerald-950/20 transition-all text-sm font-medium">
            🎤 Générer aussi le pitch ascenseur 30s →
          </button>
        </div>
      )}

      {/* Elevator pitch */}
      {phase === 'elevator' && (
        <div className="space-y-4 animate-fade-in">
          <div className="card p-6 border-emerald-500/30 bg-emerald-950/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-emerald-400 font-bold text-sm">🎤 Pitch Ascenseur 30 secondes :</span>
              <span className="badge bg-emerald-500/15 border-emerald-500/30 text-emerald-300 text-xs">⏱️ ~30s à voix haute</span>
            </div>
            <p className="text-white text-base leading-relaxed">
              {elevatorTyped}
              {elevatorTyped.length < pitch.length && <span className="animate-blink text-emerald-400">|</span>}
            </p>
          </div>
          {elevatorTyped.length >= pitch.length && (
            <div className="card p-4 bg-amber-950/15 border-amber-500/25 animate-fade-in">
              <p className="text-amber-300 text-sm font-bold">💡 Exercice formateur :</p>
              <p className="text-slate-400 text-sm mt-1">
                Demandez à 2 volontaires de prononcer ce pitch à voix haute en 30 secondes chrono.
                C'est souvent le moment le plus mémorable de la session !
              </p>
            </div>
          )}
          <button onClick={() => setPhase('deck')}
            className="btn-ghost text-sm border border-slate-700">
            ← Voir le Pitch Deck complet
          </button>
        </div>
      )}
    </div>
  );
}
