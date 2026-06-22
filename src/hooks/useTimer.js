import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(durationMinutes, options = {}) {
  const total = durationMinutes * 60;
  const { initialSeconds, initialRunning, onStateChange } = options;
  const hasInitialSeconds = Number.isFinite(initialSeconds);
  const [seconds, setSeconds] = useState(hasInitialSeconds ? initialSeconds : total);
  const [running, setRunning] = useState(Boolean(initialRunning));
  const ref = useRef(null);

  const start  = useCallback(() => setRunning(true), []);
  const pause  = useCallback(() => setRunning(false), []);
  const reset  = useCallback(() => { setRunning(false); setSeconds(total); }, [total]);

  useEffect(() => {
    if (running && seconds > 0) {
      ref.current = setInterval(() => setSeconds(s => s - 1), 1000);
    } else {
      clearInterval(ref.current);
      if (seconds === 0) setRunning(false);
    }
    return () => clearInterval(ref.current);
  }, [running, seconds]);

  // Keep local state in sync with controlled values when provided.
  useEffect(() => {
    if (hasInitialSeconds) {
      setSeconds(initialSeconds);
    }
  }, [hasInitialSeconds, initialSeconds]);

  useEffect(() => {
    if (typeof initialRunning === 'boolean') {
      setRunning(initialRunning);
    }
  }, [initialRunning]);

  useEffect(() => {
    if (typeof onStateChange === 'function') {
      onStateChange({ seconds, running });
    }
  }, [seconds, running, onStateChange]);

  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const progress = total > 0 ? 1 - seconds / total : 0;

  return {
    seconds, running, progress,
    isUrgent: seconds > 0 && seconds < 120,
    isOver: seconds === 0,
    formatted: `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
    start, pause, reset,
  };
}
