import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PresentationProvider } from './contexts/PresentationContext';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Session1 from './pages/Session1';
import Session2 from './pages/Session2';
import Session3 from './pages/Session3';
import Session4 from './pages/Session4';

export default function App() {
  return (
    <HashRouter>
      <PresentationProvider>
        <div className="light-theme min-h-screen bg-slate-950 flex flex-col">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/session/1" element={<Session1 />} />
              <Route path="/session/2" element={<Session2 />} />
              <Route path="/session/3" element={<Session3 />} />
              <Route path="/session/4" element={<Session4 />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <footer className="border-t border-slate-200 bg-white/70 backdrop-blur px-6 py-4 text-center text-sm text-slate-700">
            <p>
              © {new Date().getFullYear()} Houssem Eddine Lassoued ·{' '}
              <a
                href="https://github.com/houssemeddinelassoued/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 font-medium hover:text-blue-800"
              >
                GitHub
              </a>
              {' '}·{' '}
              <a
                href="https://www.linkedin.com/in/houssemeddinelassoued/"
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 font-medium hover:text-blue-800"
              >
                LinkedIn
              </a>
            </p>
          </footer>
        </div>
      </PresentationProvider>
    </HashRouter>
  );
}
