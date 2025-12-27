import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

// Import modules
import Home from "@modules/home";
import DrFrank from "@modules/dr-frank";
import FightClub from "@modules/fight-club";
import MeanGirls from "@modules/mean-girls";

/**
 * Module Wrapper Component
 * Handles environment isolation for each module:
 * - Sets body background class
 * - Provides universal exit button
 * - Cleans up on unmount
 */
interface ModuleWrapperProps {
  children: React.ReactNode;
  bgClass: string;
  textClass?: string;
  fontClass?: string;
}

const ModuleWrapper = ({
  children,
  bgClass,
  textClass = "text-white",
  fontClass = "font-sans",
}: ModuleWrapperProps) => {
  useEffect(() => {
    const originalClass = document.body.className;
    document.body.className = `${bgClass} ${textClass} ${fontClass}`;

    return () => {
      document.body.className = originalClass;
    };
  }, [bgClass, textClass, fontClass]);

  return (
    <div
      className={`relative min-h-screen ${bgClass} ${textClass} ${fontClass}`}
    >
      {/* Universal Exit Button */}
      <Link
        to="/"
        className="fixed top-4 left-4 z-[100] opacity-30 hover:opacity-100 transition-opacity p-2 bg-black/70 hover:bg-black text-white rounded-full text-xs font-mono uppercase tracking-widest shadow-lg"
        title="Return to Home"
      >
        ← EXIT
      </Link>
      {children}
    </div>
  );
};

/**
 * Scroll to Top on Route Change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Main App Router
 */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <ModuleWrapper bgClass="bg-zinc-950">
              <Home />
            </ModuleWrapper>
          }
        />

        {/* Module 1: Frankenstein's Forms */}
        <Route
          path="/dr-frank"
          element={
            <ModuleWrapper
              bgClass="bg-slate-950"
              textClass="text-slate-300"
              fontClass="font-serif"
            >
              <DrFrank />
            </ModuleWrapper>
          }
        />

        {/* Module 2: Project Mayhem (Fight Club) */}
        <Route
          path="/fight-club"
          element={
            <ModuleWrapper
              bgClass="bg-black"
              textClass="text-white"
              fontClass="font-sans"
            >
              <FightClub />
            </ModuleWrapper>
          }
        />

        {/* Module 3: The Burn Book (Mean Girls) */}
        <Route
          path="/mean-girls"
          element={
            <ModuleWrapper
              bgClass="bg-pink-50"
              textClass="text-gray-900"
              fontClass="font-sans"
            >
              <MeanGirls />
            </ModuleWrapper>
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <ModuleWrapper bgClass="bg-zinc-950">
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-black text-zinc-800 mb-4">
                    404
                  </h1>
                  <p className="text-zinc-500 mb-8">This route doesn't exist</p>
                  <Link
                    to="/"
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Go Home
                  </Link>
                </div>
              </div>
            </ModuleWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
