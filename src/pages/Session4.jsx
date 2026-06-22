import { usePresentation } from '../contexts/PresentationContext';
import { SESSIONS } from '../data/sessions';
import SlideLayout from '../components/layout/SlideLayout';
import PitchBuilder from '../components/widgets/PitchBuilder';
import FeedbackAnalyzer from '../components/widgets/FeedbackAnalyzer';
import ActionPlan from '../components/widgets/ActionPlan';

const S = SESSIONS[3];

function SessionOverview({ session }) {
  return (
    <div className="max-w-3xl mx-auto p-6 lg:p-10 space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-6xl">{session.emoji}</span>
        <div>
          <h2 className="text-3xl font-black text-white">{session.title}</h2>
          <p className="text-emerald-300 mt-1">{session.subtitle}</p>
        </div>
      </div>
      <p className="text-slate-400 text-lg leading-relaxed">{session.objective}</p>
      <div className="grid sm:grid-cols-2 gap-3">
        {session.segments.map(seg => (
          <div key={seg.id} className="card p-4 border-emerald-500/20 hover:border-emerald-500/35 transition-all">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">{seg.emoji}</span>
              <span className="font-bold text-white text-sm">{seg.title}</span>
              <span className="ml-auto text-emerald-400 text-xs font-mono">{seg.duration} min</span>
            </div>
          </div>
        ))}
      </div>
      <div className="card p-4 border-emerald-500/20 bg-emerald-950/10">
        <p className="text-emerald-400 font-bold text-sm">🎯 Livrable de la session :</p>
        <p className="text-white mt-1">{session.livrable}</p>
      </div>
    </div>
  );
}

function SessionRecap({ session }) {
  return (
    <div className="max-w-2xl mx-auto p-6 lg:p-10 text-center space-y-8">
      <span className="text-6xl">🏆</span>
      <h2 className="text-3xl font-black text-white">Bravo, vous êtes prêts !</h2>
      <p className="text-slate-400 text-lg">{session.takeaway}</p>
      <div className="card p-5 border-emerald-500/25 bg-emerald-950/10">
        <p className="text-emerald-400 font-bold mb-3">📦 Votre kit de départ :</p>
        <p className="text-white">{session.livrable}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { emoji:'🤖', label:'LLM démystifié' },
          { emoji:'🎯', label:'Persona défini' },
          { emoji:'🛠️', label:'MVP prototype' },
          { emoji:'🎤', label:'Pitch prêt' },
        ].map((item, i) => (
          <div key={i} className="card p-4 text-center border-emerald-500/20">
            <div className="text-3xl mb-2">{item.emoji}</div>
            <div className="text-white text-xs font-medium">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="card p-4 border-amber-500/25 bg-amber-950/10">
        <p className="text-amber-300 font-bold mb-1">🎤 Note formateur — clôture :</p>
        <p className="text-slate-400 text-sm">
          Demandez à chaque participant de dire UNE chose qu'il va faire différemment dès demain avec l'IA.
          Prenez une photo de groupe. Partagez les ressources via QR code ou lien.
        </p>
      </div>
    </div>
  );
}

export default function Session4() {
  const { filRouge } = usePresentation();

  const slides = [
    {
      id: 'overview',
      title: 'Déploiement, Pitch & Clôture',
      duration: S.duration,
      emoji: S.emoji,
      type: null,
      note: 'Dernière ligne droite. Célébrez ce qui a été accompli aujourd\'hui. Cette session répond à "Et maintenant, on fait quoi ?"',
      content: <SessionOverview session={S} />,
    },
    {
      id: 'pitch',
      title: 'Pitch Deck & Communication IA',
      duration: S.segments[0] ? S.segments[0].duration : 20,
      emoji: '📊',
      type: 'Atelier',
      note: 'Chaque équipe génère son pitch deck. Sélectionnez 2-3 volontaires pour prononcer le pitch ascenseur à voix haute.',
      content: <PitchBuilder filRouge={filRouge} />,
    },
    {
      id: 'feedback',
      title: 'Analyser les Feedbacks Utilisateurs',
      duration: 10,
      emoji: '🔍',
      type: 'Demo',
      note: 'Montrez comment l\'IA trie et catégorise les feedbacks en secondes. Demandez : « Qui a déjà passé des heures à lire des verbatims ? »',
      content: <FeedbackAnalyzer />,
    },
    {
      id: 'action',
      title: 'Plan d\'Action Anti-Bullshit',
      duration: 10,
      emoji: '🎯',
      type: 'Exercice',
      note: 'Passez les 3 pièges rapidement. Insistez sur la checklist d\'outils. Laissez 3 minutes pour que chacun écrive son engagement.',
      content: <ActionPlan />,
    },
    {
      id: 'recap',
      title: 'Clôture & Félicitations',
      duration: 5,
      emoji: '🏆',
      type: null,
      note: 'Tour de table rapide : 1 chose que vous allez faire différemment demain. Photo de groupe recommandée. Merci !',
      content: <SessionRecap session={S} />,
    },
  ];

  return (
    <SlideLayout
      slides={slides}
      session={S}
      onNextSession="/"
      onPrevSession="/session/3"
    />
  );
}
