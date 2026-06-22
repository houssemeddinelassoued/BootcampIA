import { usePresentation } from '../contexts/PresentationContext';
import { SESSIONS } from '../data/sessions';
import SlideLayout from '../components/layout/SlideLayout';
import TokenPredictor from '../components/widgets/TokenPredictor';
import RagVisualizer from '../components/widgets/RagVisualizer';
import SecurityMatrix from '../components/widgets/SecurityMatrix';
import PostItBoard from '../components/widgets/PostItBoard';

const S = SESSIONS[0];

function SessionOverview({ session }) {
  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-6xl">{session.emoji}</span>
        <div>
          <h2 className="text-3xl font-black text-white">{session.title}</h2>
          <p className="text-violet-300 mt-1">{session.subtitle}</p>
        </div>
      </div>
      <p className="text-slate-400 text-lg leading-relaxed">{session.objective}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {session.segments.map(seg => (
          <div key={seg.id} className="card p-4 border-violet-500/20 hover:border-violet-500/35 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{seg.emoji}</span>
              <span className="font-bold text-white text-sm">{seg.title}</span>
              <span className="ml-auto text-violet-400 text-xs font-mono">{seg.duration} min</span>
            </div>
            <div className="flex gap-1 flex-wrap">
              {seg.type && <span className="badge bg-violet-500/10 border-violet-500/20 text-violet-400 text-xs">{seg.type}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="card p-4 border-violet-500/20 bg-violet-950/10">
        <p className="text-violet-400 font-bold text-sm">🎯 Livrable de la session :</p>
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
      <div className="card p-5 border-violet-500/25 bg-violet-950/10">
        <p className="text-violet-400 font-bold mb-3">📦 Ce que vous repartez avec :</p>
        <p className="text-white">{session.livrable}</p>
      </div>
      <p className="text-slate-500 text-sm">→ Prochaine étape : Session 2 — Planifier &amp; Concevoir son Marché</p>
    </div>
  );
}

export default function Session1() {
  const { filRouge } = usePresentation();

  const slides = [
    {
      id: 'overview',
      title: 'Vue d\'ensemble',
      duration: S.duration,
      emoji: S.emoji,
      type: null,
      note: 'Accueillez les participants, présentez-vous et demandez-leur d\'écrire sur un post-it : « Mon rapport à l\'IA en une phrase ».',
      content: <SessionOverview session={S} />,
    },
    {
      id: 'panorama',
      title: 'Panorama & Prédiction de tokens',
      duration: S.segments[0].duration,
      emoji: S.segments[0].emoji,
      type: 'Demo',
      note: S.segments[0].note,
      content: <TokenPredictor />,
    },
    {
      id: 'rag',
      title: 'Mémoire & RAG',
      duration: 10,
      emoji: '📚',
      type: 'Demo',
      note: S.segments[0].note,
      content: <RagVisualizer />,
    },
    {
      id: 'securite',
      title: 'Sécurité & Propriété Intellectuelle',
      duration: S.segments[1].duration,
      emoji: S.segments[1].emoji,
      type: 'Exercice',
      note: S.segments[1].note,
      content: <SecurityMatrix />,
    },
    {
      id: 'valeur',
      title: 'Activité Flash — Créer de la Valeur',
      duration: S.segments[2].duration,
      emoji: S.segments[2].emoji,
      type: 'Atelier',
      note: S.segments[2].note,
      content: <PostItBoard />,
    },
    {
      id: 'recap',
      title: 'Récapitulatif',
      duration: 0,
      emoji: '✅',
      type: null,
      note: 'Synthèse collective : 3 mots pour résumer Session 1. Annoncez la pause et la Session 2.',
      content: <SessionRecap session={S} />,
    },
  ];

  return (
    <SlideLayout
      slides={slides}
      session={S}
      onNextSession="/session/2"
      onPrevSession="/"
    />
  );
}
