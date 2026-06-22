import { usePresentation } from '../contexts/PresentationContext';
import { SESSIONS } from '../data/sessions';
import SlideLayout from '../components/layout/SlideLayout';
import MockupDemo from '../components/widgets/MockupDemo';
import LiveCodingDemo from '../components/widgets/LiveCodingDemo';
import E2EBuilder from '../components/widgets/E2EBuilder';

const S = SESSIONS[2];

function SessionOverview({ session }) {
  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-6xl">{session.emoji}</span>
        <div>
          <h2 className="text-3xl font-black text-white">{session.title}</h2>
          <p className="text-orange-300 mt-1">{session.subtitle}</p>
        </div>
      </div>
      <p className="text-slate-400 text-lg leading-relaxed">{session.objective}</p>

      <div className="card p-4 border-orange-500/25 bg-orange-950/10">
        <p className="text-orange-400 font-bold text-sm mb-2">⚡ Esprit Hackathon</p>
        <p className="text-slate-400 text-sm">
          Cette session est la plus intense. L'objectif n'est pas la perfection mais la vitesse.
          Un prototype imparfait qui tourne vaut mieux que dix slides de spécification.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {session.segments.map(seg => (
          <div key={seg.id} className="card p-4 border-orange-500/20 hover:border-orange-500/35 transition-all">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{seg.emoji}</span>
              <span className="font-bold text-white text-sm">{seg.title}</span>
              <span className="ml-auto text-orange-400 text-xs font-mono">{seg.duration} min</span>
            </div>
          </div>
        ))}
      </div>
      <div className="card p-4 border-orange-500/20 bg-orange-950/10">
        <p className="text-orange-400 font-bold text-sm">🎯 Livrable de la session :</p>
        <p className="text-white mt-1">{session.livrable}</p>
      </div>
    </div>
  );
}

function SessionRecap({ session }) {
  return (
    <div className="max-w-2xl mx-auto p-6 lg:p-10 text-center space-y-6">
      <span className="text-6xl">🎉</span>
      <h2 className="text-3xl font-black text-white">Prototype terminé !</h2>
      <p className="text-slate-400 text-lg">{session.takeaway}</p>
      <div className="card p-5 border-orange-500/25 bg-orange-950/10">
        <p className="text-orange-400 font-bold mb-3">📦 Ce que vous repartez avec :</p>
        <p className="text-white">{session.livrable}</p>
      </div>
      <p className="text-slate-500 text-sm">→ Prochaine étape : Session 4 — Pitcher &amp; Lancer</p>
    </div>
  );
}

export default function Session3() {
  const { filRouge } = usePresentation();

  const slides = [
    {
      id: 'overview',
      title: 'Vue d\'ensemble — Mode Hackathon',
      duration: S.duration,
      emoji: S.emoji,
      type: null,
      note: 'Créez une ambiance hackathon : minuteur visible, musique optionnelle, groupes de 2-3. Annoncez : « Dans 2h vous aurez un prototype qui tourne. »',
      content: <SessionOverview session={S} />,
    },
    {
      id: 'maquettage',
      title: 'Maquettage No-code',
      duration: S.segments[0].duration,
      emoji: S.segments[0].emoji,
      type: 'Demo',
      note: S.segments[0].note,
      content: <MockupDemo />,
    },
    {
      id: 'code',
      title: 'Génération de Code IA',
      duration: S.segments[1].duration,
      emoji: S.segments[1].emoji,
      type: 'Demo',
      note: S.segments[1].note,
      content: <LiveCodingDemo />,
    },
    {
      id: 'e2e',
      title: 'Assembler le MVP E2E',
      duration: S.segments[2].duration,
      emoji: S.segments[2].emoji,
      type: 'Atelier',
      note: S.segments[2].note,
      content: <E2EBuilder filRouge={filRouge} />,
    },
    {
      id: 'recap',
      title: 'Récap — Démo Time !',
      duration: 0,
      emoji: '🎉',
      type: null,
      note: 'Chaque équipe fait une démo de 2 minutes. Applaudissements obligatoires. Annoncez : « On va maintenant pitcher ça. »',
      content: <SessionRecap session={S} />,
    },
  ];

  return (
    <SlideLayout
      slides={slides}
      session={S}
      onNextSession="/session/4"
      onPrevSession="/session/2"
    />
  );
}
