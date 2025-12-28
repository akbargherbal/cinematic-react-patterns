import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";

// Import the centralized module registry
import { getEnabledModules } from "./config/moduleRegistry";

// Import home page
import Home from "@modules/home";

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
        className="fixed top-4 left-3 z-[100] opacity-30 hover:opacity-100 transition-opacity p-2 bg-black/70 hover:bg-black text-white rounded-full text-xs font-mono uppercase tracking-widest shadow-lg"
        title="Return to Home"
      >
        ← EXIT
      </Link>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 lg:py-6">
        {children}
      </div>
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
 * Loading Component for Lazy-Loaded Modules
 */
const ModuleLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
      <p className="text-zinc-400 font-mono text-sm">Loading module...</p>
    </div>
  </div>
);

/**
 * Main App Router
 * 
 * 🔌 SWITCHBOARD ARCHITECTURE
 * 
 * Routes are now dynamically generated from the module registry.
 * To enable/disable a module:
 * 1. Open src/config/moduleRegistry.ts
 * 2. Find the module you want to toggle
 * 3. Set `enabled: true` or `enabled: false`
 * 4. Restart the dev server
 * 
 * The module will automatically be:
 * - Added/removed from routing
 * - Shown/hidden on the home page
 * - Lazy-loaded only when needed
 */
export default function App() {
  // Get only enabled modules from the registry
  const enabledModules = getEnabledModules();

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

        {/* Dynamically Generated Module Routes */}
        {enabledModules.map((module) => {
          // Lazy load the module component
          const LazyComponent = lazy(module.component);

          return (
            <Route
              key={module.id}
              path={module.path}
              element={
                <ModuleWrapper
                  bgClass={module.wrapperProps.bgClass}
                  textClass={module.wrapperProps.textClass}
                  fontClass={module.wrapperProps.fontClass}
                >
                  <Suspense fallback={<ModuleLoader />}>
                    <LazyComponent />
                  </Suspense>
                </ModuleWrapper>
              }
            />
          );
        })}

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