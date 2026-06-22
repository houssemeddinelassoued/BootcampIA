import { usePresentation } from '../contexts/PresentationContext';
import { SESSIONS } from '../data/sessions';
import SlideLayout from '../components/layout/SlideLayout';
import MarketResearch from '../components/widgets/MarketResearch';
import PersonaBuilder from '../components/widgets/PersonaBuilder';
import UserStoryBoard from '../components/widgets/UserStoryBoard';

const S = SESSIONS[1];

function SessionOverview({ session }) {
  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-6xl">{session.emoji}</span>
        <div>
          <h2 className="text-3xl font-black text-white">{session.title}</h2>
          <p className="text-blue-300 mt-1">{session.subtitle}</p>
        </div>
      </div>
      <p className="text-slate-400 text-lg leading-relaxed">{session.objective}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {session.segments.map(seg => (
          <div key={seg.id} className="card p-4 border-blue-500/20 hover:border-blue-500/35 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{seg.emoji}</span>
              <span className="font-bold text-white text-sm">{seg.title}</span>
              <span className="ml-auto text-blue-400 text-xs font-mono">{seg.duration} min</span>
            </div>
          </div>
        ))}
      </div>
      <div className="card p-4 border-blue-500/20 bg-blue-950/10">
        <p className="text-blue-400 font-bold text-sm">🎯 Livrable de la session :</p>
        <p className="text-white mt-1">{session.livrable}</p>
      </div>
    </div>
  );
}

function SessionRecap({ session }) {
  return (
    <div className="max-w-2xl mx-auto p-6 lg:p-10 text-center space-y-6">
      <span className="text-6xl">✅</span>
      <h2 className="text-3xl font-black text-white">Récapitulatif</h2>
      <p className="text-slate-400 text-lg">{session.takeaway}</p>
      <div className="card p-5 border-blue-500/25 bg-blue-950/10">
        <p className="text-blue-400 font-bold mb-3">📦 Ce que vous repartez avec :</p>
        <p className="text-white">{session.livrable}</p>
      </div>
      <p className="text-slate-500 text-sm">→ Prochaine étape : Session 3 — Prototypage Rapide</p>
    </div>
  );
}

export default function Session2() {
  const { filRouge } = usePresentation();

  const slides = [
    {
      id: 'overview',
      title: 'Vue d\'ensemble',
      duration: S.duration,
      emoji: S.emoji,
      type: null,
      note: 'Rappelez l\'idée fil rouge sélectionnée. Expliquez que cette session est celle où les participants définissent leur cible et leur marché.',
      content: <SessionOverview session={S} />,
    },
    {
      id: 'marche',
      title: 'Étude de Marché avec l\'IA',
      duration: S.segments[0].duration,
      emoji: S.segments[0].emoji,
      type: 'Demo',
      note: S.segments[0].note,
      content: <MarketResearch filRouge={filRouge} />,
    },
    {
      id: 'persona',
      title: 'Persona & Idéation',
      duration: S.segments[1].duration,
      emoji: S.segments[1].emoji,
      type: 'Atelier',
      note: S.segments[1].note,
      content: <PersonaBuilder filRouge={filRouge} />,
    },
    {
      id: 'backlog',
      title: 'Backlog & User Stories',
      duration: S.segments[2].duration,
      emoji: S.segments[2].emoji,
      type: 'Atelier',
      note: S.segments[2].note,
      content: <UserStoryBoard filRouge={filRouge} />,
    },
    {
      id: 'recap',
      title: 'Récapitulatif',
      duration: 0,
      emoji: '✅',
      type: null,
      note: 'Chaque équipe présente son persona en 1 min. Annoncez la Session 3 : « On va maintenant construire. »',
      content: <SessionRecap session={S} />,
    },
  ];

  return (
    <SlideLayout
      slides={slides}
      session={S}
      onNextSession="/session/3"
      onPrevSession="/session/1"
    />
  );
}
