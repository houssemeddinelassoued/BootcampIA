import { createContext, useContext, useState } from 'react';
import { FIL_ROUGE_OPTIONS } from '../data/sessions';

const PresentationContext = createContext(null);

export function PresentationProvider({ children }) {
  const [presenterMode, setPresenterMode] = useState(false);
  const [filRouge, setFilRouge] = useState(FIL_ROUGE_OPTIONS[0]);

  const togglePresenterMode = () => setPresenterMode(m => !m);

  return (
    <PresentationContext.Provider value={{ presenterMode, setPresenterMode, togglePresenterMode, filRouge, setFilRouge }}>
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  return useContext(PresentationContext);
}
