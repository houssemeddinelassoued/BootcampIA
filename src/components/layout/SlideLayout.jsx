import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePresentation } from '../../contexts/PresentationContext';
import { useKeyboardNav } from '../../hooks/useKeyboardNav';
import ProgressDots from '../ui/ProgressDots';
import Timer from '../ui/Timer';
import Badge from '../ui/Badge';
import TrainerPanel from './TrainerPanel';

const TYPE_COLORS = {
  demo:     'bg-blue-500/15 text-blue-300 border-blue-500/30',
  Demo:     'bg-blue-500/15 text-blue-300 border-blue-500/30',
  theory:   'bg-violet-500/15 text-violet-300 border-violet-500/30',
  Théorie:  'bg-violet-500/15 text-violet-300 border-violet-500/30',
  workshop: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  Atelier:  'bg-orange-500/15 text-orange-300 border-orange-500/30',
  activity: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  Exercice: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
};
const TYPE_LABELS = {
  demo:'🎬 Démo', Demo:'🎬 Démo',
  theory:'📖 Théorie', Théorie:'📖 Théorie',
  workshop:'⚙️ Atelier', Atelier:'⚙️ Atelier',
  activity:'🙋 Exercice', Exercice:'🙋 Exercice',
};

export default function SlideLayout({ slides, session, onNextSession, onPrevSession }) {
  const [idx, setIdx] = useState(0);
  const { presenterMode } = usePresentation();
  const navigate = useNavigate();

  const initialTimerStates = useMemo(
    () => slides.reduce((acc, s) => {
      if (s.duration > 0) {
        acc[s.id] = { seconds: s.duration * 60, running: false };
      }
      return acc;
    }, {}),
    [slides]
  );
  const [timerStates, setTimerStates] = useState(initialTimerStates);

  const pauseTimerForSlide = useCallback((slideId) => {
    if (!slideId) return;
    setTimerStates(prev => {
      const current = prev[slideId];
      if (!current || !current.running) return prev;
      return {
        ...prev,
        [slideId]: { ...current, running: false },
      };
    });
  }, []);

  const updateTimerState = useCallback((slideId, next) => {
    if (!slideId) return;
    setTimerStates(prev => {
      const fallback = slides.find(s => s.id === slideId)?.duration > 0
        ? { seconds: slides.find(s => s.id === slideId).duration * 60, running: false }
        : { seconds: 0, running: false };
      const current = prev[slideId] || fallback;
      if (current.seconds === next.seconds && current.running === next.running) {
        return prev;
      }
      return {
        ...prev,
        [slideId]: {
          seconds: next.seconds,
          running: next.running,
        },
      };
    });
  }, [slides]);

  const goNext = useCallback((source = 'button') => {
    if (source === 'arrow' || source === 'button') {
      pauseTimerForSlide(slides[idx]?.id);
    }
    if (idx < slides.length - 1) setIdx(i => i + 1);
    else if (onNextSession) navigate(onNextSession);
  }, [idx, slides, onNextSession, navigate, pauseTimerForSlide]);

  const goPrev = useCallback((source = 'button') => {
    if (source === 'arrow' || source === 'button') {
      pauseTimerForSlide(slides[idx]?.id);
    }
    if (idx > 0) setIdx(i => i - 1);
    else if (onPrevSession) navigate(onPrevSession);
  }, [idx, slides, onPrevSession, navigate, pauseTimerForSlide]);

  useKeyboardNav(
    () => goNext('arrow'),
    () => goPrev('arrow')
  );

  const slide = slides[idx];
  const isFirst = idx === 0;
  const isLast  = idx === slides.length - 1;
  const slideTimerState = timerStates[slide.id] || { seconds: slide.duration * 60, running: false };

  const sessionBorderColors = {
    violet: 'border-violet-500/20',
    blue:   'border-blue-500/20',
    orange: 'border-orange-500/20',
    emerald:'border-emerald-500/20',
  };

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 3.5rem)' }}>

      {/* Slide top bar */}
      <div className={`flex items-center gap-3 px-6 py-3 border-b ${sessionBorderColors[session?.color] || 'border-slate-800'} bg-slate-950/80`}>
        <span className="text-slate-500 text-sm font-mono shrink-0">{idx + 1}/{slides.length}</span>

        <div className="flex-1 min-w-0 flex items-center gap-2">
          {slide.emoji && <span className="text-lg">{slide.emoji}</span>}
          <h2 className="font-bold text-white truncate">{slide.title}</h2>
          {slide.type && (
            <span className={`badge shrink-0 hidden sm:inline-flex ${TYPE_COLORS[slide.type] || TYPE_COLORS.demo}`}>
              {TYPE_LABELS[slide.type]}
            </span>
          )}
          {slide.duration > 0 && (
            <Badge color="slate" className="shrink-0 hidden sm:inline-flex">
              {slide.duration} min
            </Badge>
          )}
        </div>

        <ProgressDots total={slides.length} current={idx} onSelect={setIdx} color={session?.color} />

        {presenterMode && slide.duration > 0 && (
          <Timer
            durationMinutes={slide.duration}
            color={session?.color}
            size="sm"
            seconds={slideTimerState.seconds}
            running={slideTimerState.running}
            onStateChange={(next) => updateTimerState(slide.id, next)}
          />
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto animate-fade-in" key={slide.id}>
        {slide.content}
      </main>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/80 shrink-0">
        <button
          onClick={() => goPrev('arrow')}
          disabled={isFirst && !onPrevSession}
          aria-label="Slide précédent"
          className="flex items-center gap-2 btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← {isFirst && onPrevSession ? 'Session précédente' : 'Précédent'}
        </button>

        <span className="text-slate-600 text-xs hidden sm:block">← → pour naviguer</span>

        <button
          onClick={() => goNext('arrow')}
          disabled={isLast && !onNextSession}
          aria-label="Slide suivant"
          className="flex items-center gap-2 btn-ghost disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {isLast && onNextSession ? 'Session suivante' : 'Suivant'} →
        </button>
      </div>

      {/* Trainer notes */}
      {presenterMode && slide.note && <TrainerPanel note={slide.note} />}
    </div>
  );
}
