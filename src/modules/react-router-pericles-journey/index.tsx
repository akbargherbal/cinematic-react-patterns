import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Compass, Map, BookOpen, CheckCircle, Quote, History, Home, Ship, Navigation } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function ReactRouterPericlesJourney(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [navMode, setNavMode] = useState<'manual' | 'router'>('manual');
  const [manualHistory, setManualHistory] = useState<string[]>(['Antioch']);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [frustrationLevel, setFrustrationLevel] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const chapters: Chapter[] = [
    {
      title: "The Single-Page Epic",
      content: "Pericles' entire life is one play—a Single-Page Application (SPA). His scroll to Pentapolis is a destination. Changing visible shores without a new play is **client-side navigation**."
    },
    {
      title: "Shards of a Story",
      content: "Landing in Tarsus only to instantly flee is **jarring context reset**. Without a routing system, navigation becomes manual state juggling. The story shatters into disconnected scenes."
    },
    {
      title: "The Chorus of Code",
      content: "Gower narrates seamless scene transitions. He is **React Router**. He manages the history stack, renders the correct component for the location, and preserves state—all without a page reload."
    },
    {
      title: "Recitation vs. Route",
      content: "**Marina's manual recap** forces Pericles to rebuild context painfully. **Gower's declarative routes** (`<Route path=\"ephesus\">`) flow naturally. One is laborious code; the other is elegant configuration."
    },
    {
      title: "The Chart of All Shores",
      content: "The final map shows all connected sea-routes. This is your **`<Routes>` configuration**. Each city is a `<Route>`. The entire navigable structure exists within one SPA scroll."
    }
  ];

  // Code Examples
  const antiPatternManualNav = `// ❌ Manual Navigation (Anti-Pattern)
function App() {
  const [currentView, setCurrentView] = useState('antioch');
  const [history, setHistory] = useState(['antioch']);

  const navigateManually = (newView: string) => {
    setCurrentView(newView);
    setHistory(prev => [...prev, newView]); // Manual history tracking
    // Must also manually manage scroll, focus, state passing...
  };

  return (
    <div>
      {currentView === 'antioch' && <Antioch />}
      {currentView === 'tyre' && <Tyre />}
      {/* Repetitive, error-prone conditional rendering */}
    </div>
  );
}`;

  const correctRouterPattern = `// ✅ Declarative Routing with React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/antioch" element={<Antioch />} />
        <Route path="/tyre" element={<Tyre />} />
        <Route path="/pentapolis" element={<Pentapolis />} />
        {/* Clean, centralized configuration */}
      </Routes>
    </BrowserRouter>
  );
}`;

  const navigationExample = `// ✅ Navigating Between Routes
import { Link, useNavigate } from 'react-router-dom';

function NavigationControls() {
  const navigate = useNavigate();

  return (
    <nav>
      {/* Declarative navigation */}
      <Link to="/tyre">Sail to Tyre</Link>
      
      {/* Programmatic navigation */}
      <button onClick={() => navigate('/pentapolis')}>
        Set Course for Pentapolis
      </button>
      
      {/* Navigation with state */}
      <Link 
        to="/ephesus" 
        state={{ fromAntioch: true, cargo: 'hope' }}
      >
        Journey to Ephesus
      </Link>
    </nav>
  );
}`;

  // Demo: Manual Navigation Frustration
  const triggerManualNavigation = () => {
    if (navMode !== 'manual') return;
    
    const cities = ['Tarsus', 'Pentapolis', 'Ephesus', 'Mytilene'];
    const nextCity = cities[Math.floor(Math.random() * cities.length)];
    
    setManualHistory(prev => [...prev, nextCity]);
    setRenderCount(prev => prev + 1);
    setFrustrationLevel(prev => Math.min(prev + 15, 100));
    
    // Safety circuit breaker
    if (manualHistory.length >= 10) {
      alert("Circuit breaker: Too much manual history! Resetting.");
      resetDemo();
    }
  };

  const resetDemo = () => {
    setManualHistory(['Antioch']);
    setRenderCount(0);
    setFrustrationLevel(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentChapter = chapters[chapter];

  // City Components for Router Demo
  const Antioch = () => (
    <div className="rounded-lg bg-amber-950/30 p-6 text-center">
      <h3 className="mb-2 text-xl font-bold text-amber-300">🏛️ Antioch</h3>
      <p className="text-amber-200/80">The starting point. A riddle hangs in the air.</p>
      <div className="mt-4">
        <Link 
          to="/tyre" 
          className="inline-flex items-center gap-2 rounded bg-teal-700 px-4 py-2 text-white hover:bg-teal-600"
        >
          <Ship className="h-4 w-4" /> Flee to Tyre
        </Link>
      </div>
    </div>
  );

  const Tyre = () => {
    const location = useLocation();
    return (
      <div className="rounded-lg bg-teal-950/30 p-6 text-center">
        <h3 className="mb-2 text-xl font-bold text-teal-300">⚓ Tyre</h3>
        <p className="teal-200/80">A temporary haven. The sea calls again.</p>
        {location.state && (
          <p className="mt-2 text-sm text-amber-400">
            State from previous route: {JSON.stringify(location.state)}
          </p>
        )}
        <div className="mt-4 flex justify-center gap-4">
          <Link 
            to="/" 
            className="rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
          >
            ⬅️ Return Home
          </Link>
          <Link 
            to="/pentapolis" 
            state={{ fromTyre: true, supplies: 'low' }}
            className="rounded bg-teal-700 px-4 py-2 hover:bg-teal-600"
          >
            Next ➡️ Pentapolis
          </Link>
        </div>
      </div>
    );
  };

  const Pentapolis = () => (
    <div className="rounded-lg bg-rose-950/30 p-6 text-center">
      <h3 className="mb-2 text-xl font-bold text-rose-300">👑 Pentapolis</h3>
      <p className="rose-200/80">A tournament of fate. A new course is set.</p>
      <div className="mt-4">
        <Link 
          to="/ephesus" 
          className="rounded bg-teal-700 px-4 py-2 hover:bg-teal-600"
        >
          Continue Journey
        </Link>
      </div>
    </div>
  );

  const Ephesus = () => (
    <div className="rounded-lg bg-purple-950/30 p-6 text-center">
      <h3 className="mb-2 text-xl font-bold text-purple-300">⚗️ Ephesus</h3>
      <p className="purple-200/80">The temple of Diana. A miraculous restoration.</p>
      <div className="mt-4">
        <Link 
          to="/" 
          className="rounded bg-teal-700 px-4 py-2 hover:bg-teal-600"
        >
          ⛵ Complete Journey
        </Link>
      </div>
    </div>
  );

  const HomePort = () => {
    const navigate = useNavigate();
    return (
      <div className="rounded-lg bg-slate-800/40 p-8 text-center">
        <h3 className="mb-4 text-2xl font-bold text-teal-300">🗺️ The Journey Map</h3>
        <p className="mb-6 text-slate-300">The entire epic contained in one SPA. Navigate using the links below.</p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <button
            onClick={() => navigate('/antioch')}
            className="rounded bg-amber-800/50 p-4 hover:bg-amber-800/70"
          >
            Antioch
          </button>
          <button
            onClick={() => navigate('/tyre')}
            className="rounded bg-teal-800/50 p-4 hover:bg-teal-800/70"
          >
            Tyre
          </button>
          <button
            onClick={() => navigate('/pentapolis')}
            className="rounded bg-rose-800/50 p-4 hover:bg-rose-800/70"
          >
            Pentapolis
          </button>
          <button
            onClick={() => navigate('/ephesus')}
            className="rounded bg-purple-800/50 p-4 hover:bg-purple-800/70"
          >
            Ephesus
          </button>
        </div>
        <p className="mt-6 text-sm text-slate-400">
          Each button triggers client-side navigation. No page reloads.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/20 to-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Compass}
        title="Pericles, Prince of Tyre"
        subtitle="Pericles, The Journeyman, 1600s"
        concept="React Router: Client-Side Navigation"
        themeColor="teal"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <BrowserRouter>
          <ModuleLayout
            sidebar={
              <div className="sticky top-24 space-y-6">
                {/* Interactive Controls */}
                <div className="rounded-xl border border-teal-500/30 bg-slate-900/80 p-4">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                    <Navigation className="h-5 w-5 text-teal-400" />
                    Demo Controls
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setNavMode('manual')}
                        className={`flex-1 rounded px-3 py-2 text-sm ${navMode === 'manual' ? 'bg-red-700' : 'bg-slate-800'}`}
                      >
                        ❌ Manual
                      </button>
                      <button
                        onClick={() => setNavMode('router')}
                        className={`flex-1 rounded px-3 py-2 text-sm ${navMode === 'router' ? 'bg-teal-700' : 'bg-slate-800'}`}
                      >
                        ✅ React Router
                      </button>
                    </div>
                    
                    {navMode === 'manual' && (
                      <>
                        <button
                          onClick={triggerManualNavigation}
                          className="w-full rounded bg-red-800/50 px-4 py-2 hover:bg-red-800/70"
                        >
                          Trigger Manual Navigation
                        </button>
                        <button
                          onClick={resetDemo}
                          className="w-full rounded bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
                        >
                          Reset Demo
                        </button>
                      </>
                    )}

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Renders</div>
                        <div className="font-mono text-xl">{renderCount}</div>
                      </div>
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Frustration</div>
                        <div className="font-mono text-xl">{frustrationLevel}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metaphor Registry */}
                <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                    <Map className="h-5 w-5 text-teal-400" />
                    Metaphor Registry
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Pericles' Life Story</span>
                      <span className="text-sm font-medium">Single-Page App</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Cities (Antioch, Tyre...)</span>
                      <span className="text-sm font-medium">Route Components</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Sea Voyages</span>
                      <span className="text-sm font-medium">Navigation Events</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Gower, the Chorus</span>
                      <span className="text-sm font-medium">React Router</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Destination Scroll</span>
                      <span className="text-sm font-medium">URL Parameters</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Final Map</span>
                      <span className="text-sm font-medium">Route Configuration</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Thaisa's Restoration</span>
                      <span className="text-sm font-medium">Client-Side Render</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-sm text-slate-400">Marina's Recap</span>
                      <span className="text-sm font-medium">Manual History (Anti-Pattern)</span>
                    </div>
                  </div>
                </div>

                {/* Key Insight Card */}
                <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-bold text-teal-300">
                    <CheckCircle className="h-4 w-4" />
                    Key Insight
                  </h4>
                  <p className="text-sm text-teal-200/80">
                    {chapter === 0 && "An SPA is one application container holding many views. React Router enables navigation between them without page reloads."}
                    {chapter === 1 && "Without a router, you manually juggle state and history. This leads to jarring context resets and brittle code."}
                    {chapter === 2 && "React Router manages navigation declaratively. It handles the history stack, URL updates, and component rendering seamlessly."}
                    {chapter === 3 && "Declarative routes (<Route path='...'>) are cleaner and more maintainable than manual conditional rendering and prop drilling."}
                    {chapter === 4 && "Your complete route configuration defines all navigable paths in one place, creating a structured, predictable SPA."}
                  </p>
                </div>

                {/* Quote Card */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                  <p className="text-sm italic text-slate-400">
                    {chapter === 0 && "\"Your journey is one tale, yet it must visit many shores.\""}
                    {chapter === 1 && "\"We land only to depart? There is no thread to follow.\""}
                    {chapter === 2 && "\"Behold, one scene dissolves, and another is rendered.\""}
                    {chapter === 3 && "\"Each city a story, versus one story of many cities.\""}
                    {chapter === 4 && "\"So many distant shores, not separate pages, but chapters in a single scroll.\""}
                  </p>
                  <p className="mt-2 text-right text-xs text-slate-500">
                    — {chapter === 2 || chapter === 4 ? "Gower" : "Pericles"}
                  </p>
                </div>
              </div>
            }
          >
            {/* Chapter Content */}
            <div className="prose prose-invert prose-lg mb-8 max-w-none">
              <h2 className="text-3xl font-bold text-teal-100">
                {currentChapter.title}
              </h2>
              <div className="leading-relaxed text-slate-300">
                <p>{currentChapter.content}</p>
              </div>
            </div>

            {/* Interactive Demo Section */}
            <section className="mb-8 rounded-xl border border-teal-500/20 bg-slate-900/40 p-6">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-6 w-2 rounded bg-teal-500"></div>
                <h3 className="text-xl font-bold text-teal-200">
                  Interactive Demonstration
                </h3>
              </div>

              {chapter === 0 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-teal-500/30 bg-slate-900/60 p-6">
                    <h4 className="mb-4 text-lg font-bold text-teal-300">
                      The SPA Container: One Play, Many Scenes
                    </h4>
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <p className="mb-4 text-slate-300">
                          Below is a complete React Router application. Click the links to navigate between "cities" (routes). Notice:
                        </p>
                        <ul className="mb-4 list-disc space-y-2 pl-5 text-slate-300">
                          <li>No page reloads (check your browser's network tab)</li>
                          <li>URL updates in the address bar</li>
                          <li>State can be passed between routes</li>
                        </ul>
                      </div>
                      <div className="rounded border border-slate-700 p-4">
                        <Routes>
                          <Route path="/" element={<HomePort />} />
                          <Route path="/antioch" element={<Antioch />} />
                          <Route path="/tyre" element={<Tyre />} />
                          <Route path="/pentapolis" element={<Pentapolis />} />
                          <Route path="/ephesus" element={<Ephesus />} />
                        </Routes>
                      </div>
                    </div>
                  </div>
                  <CodeBlock
                    code={`// SPA Structure with React Router
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</BrowserRouter>`}
                    language="tsx"
                    variant="default"
                    title="// The Single-Page Application Container"
                    defaultExpanded={true}
                  />
                </div>
              )}

              {chapter === 1 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-red-500/30 bg-slate-900/60 p-6">
                    <h4 className="mb-4 text-lg font-bold text-red-300">
                      ❌ The Anti-Pattern: Manual Navigation
                    </h4>
                    <div className="mb-6 grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="mb-3 text-slate-300">
                          Simulating navigation without a router means manually managing:
                        </p>
                        <ul className="space-y-2 text-sm text-slate-400">
                          <li>• Current view state</li>
                          <li>• History stack</li>
                          <li>• Scroll positions</li>
                          <li>• Focus management</li>
                          <li>• State passing between "views"</li>
                        </ul>
                        <button
                          onClick={triggerManualNavigation}
                          className="mt-4 rounded bg-red-800/50 px-4 py-2 hover:bg-red-800/70"
                        >
                          Trigger Another Manual Navigation
                        </button>
                      </div>
                      <div className="rounded border border-red-500/30 bg-slate-900 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <h5 className="font-bold text-red-300">Manual History Stack</h5>
                          <span className="text-xs text-slate-500">
                            {manualHistory.length} entries
                          </span>
                        </div>
                        <div className="space-y-2">
                          {manualHistory.map((city, index) => (
                            <div
                              key={index}
                              className={`rounded px-3 py-2 ${index === manualHistory.length - 1 ? 'bg-red-900/40' : 'bg-slate-800/40'}`}
                            >
                              <div className="flex justify-between">
                                <span>{city}</span>
                                <span className="text-xs text-slate-500">
                                  Render #{index + 1}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded bg-slate-800/30 p-3 text-center">
                        <div className="text-xs text-slate-500">History Entries</div>
                        <div className="font-mono text-2xl">{manualHistory.length}</div>
                      </div>
                      <div className="rounded bg-slate-800/30 p-3 text-center">
                        <div className="text-xs text-slate-500">Total Renders</div>
                        <div className="font-mono text-2xl">{renderCount}</div>
                      </div>
                      <div className="rounded bg-slate-800/30 p-3 text-center">
                        <div className="text-xs text-slate-500">Frustration</div>
                        <div className="font-mono text-2xl">{frustrationLevel}%</div>
                      </div>
                    </div>
                  </div>
                  <CodeComparison
                    badCode={antiPatternManualNav}
                    goodCode={correctRouterPattern}
                    language="tsx"
                    themeColor="teal"
                    badLabel="❌ Manual Navigation (Fragile & Complex)"
                    goodLabel="✅ React Router (Declarative & Robust)"
                    badExplanation="Manual state management leads to prop drilling, lost history, and janky UX."
                    goodExplanation="Declarative route configuration centralizes navigation logic and handles edge cases."
                  />
                </div>
              )}

              {chapter === 2 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-teal-500/30 bg-slate-900/60 p-6">
                    <h4 className="mb-4 text-lg font-bold text-teal-300">
                      ✅ The Solution: React Router as Gower
                    </h4>
                    <div className="mb-6">
                      <p className="mb-4 text-slate-300">
                        React Router handles navigation seamlessly:
                      </p>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="rounded border border-teal-500/20 bg-teal-950/20 p-4">
                          <h5 className="mb-2 font-bold text-teal-300">History Stack</h5>
                          <p className="text-sm text-teal-200/80">
                            Automatically tracks navigation history. Users can use browser back/forward.
                          </p>
                        </div>
                        <div className="rounded border border-teal-500/20 bg-teal-950/20 p-4">
                          <h5 className="mb-2 font-bold text-teal-300">URL Synchronization</h5>
                          <p className="text-sm text-teal-200/80">
                            URL updates reflect current location. Bookmarking and sharing work naturally.
                          </p>
                        </div>
                        <div className="rounded border border-teal-500/20 bg-teal-950/20 p-4">
                          <h5 className="mb-2 font-bold text-teal-300">Component Lifecycle</h5>
                          <p className="text-sm text-teal-200/80">
                            Components mount/unmount cleanly during transitions. State can be preserved.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <h5 className="mb-3 font-bold text-teal-300">Try It: Navigate Programmatically</h5>
                        <div className="space-y-3 rounded border border-teal-500/20 bg-slate-900 p-4">
                          <p className="text-sm text-slate-400">
                            Using `useNavigate()` hook for programmatic navigation:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Link 
                              to="/antioch" 
                              className="rounded bg-amber-800/50 px-3 py-2 text-sm hover:bg-amber-800/70"
                            >
                              Link to Antioch
                            </Link>
                            <Link 
                              to="/tyre"
                              state={{ secret: 'riddle', cargo: 'hope' }}
                              className="rounded bg-teal-800/50 px-3 py-2 text-sm hover:bg-teal-800/70"
                            >
                              Link with State
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="mb-3 font-bold text-teal-300">Current Location</h5>
                        <div className="rounded border border-teal-500/20 bg-slate-900 p-4">
                          <div className="font-mono text-sm">
                            <div className="text-teal-400">useLocation() returns:</div>
                            <div className="mt-2 text-slate-300">
                              {JSON.stringify({
                                pathname: window.location.pathname,
                                key: 'unique_key_for_each_navigation',
                                state: null
                              }, null, 2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CodeBlock
                    code={navigationExample}
                    language="tsx"
                    variant="success"
                    title="// ✅ Declarative & Programmatic Navigation"
                    defaultExpanded={true}
                  />
                </div>
              )}

              {chapter === 3 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-teal-500/30 bg-slate-900/60 p-6">
                    <h4 className="mb-6 text-center text-lg font-bold text-teal-300">
                      Side-by-Side Comparison: Manual vs Declarative
                    </h4>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="rounded border border-red-500/30 bg-slate-900 p-4">
                          <h5 className="mb-3 font-bold text-red-300">Marina's Manual Recap</h5>
                          <ul className="space-y-2 text-sm text-slate-400">
                            <li>• Requires verbose prop drilling</li>
                            <li>• History must be manually tracked</li>
                            <li>• Browser back/forward broken</li>
                            <li>• State management becomes complex</li>
                            <li>• Code duplicates across "views"</li>
                          </ul>
                          <div className="mt-4 rounded bg-red-900/30 p-3">
                            <div className="text-xs text-red-300">Complexity Score: High</div>
                            <div className="mt-1 h-2 w-full rounded bg-red-900/50">
                              <div className="h-full w-4/5 rounded bg-red-500"></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            onClick={() => setNavMode('manual')}
                            className="rounded bg-red-800/50 px-4 py-2 hover:bg-red-800/70"
                          >
                            Try Manual Mode
                          </button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded border border-teal-500/30 bg-slate-900 p-4">
                          <h5 className="mb-3 font-bold text-teal-300">Gower's Declarative Routes</h5>
                          <ul className="space-y-2 text-sm text-slate-400">
                            <li>• Clean, centralized configuration</li>
                            <li>• Automatic history management</li>
                            <li>• Full browser navigation support</li>
                            <li>• Built-in state passing mechanisms</li>
                            <li>• Lazy loading support</li>
                          </ul>
                          <div className="mt-4 rounded bg-teal-900/30 p-3">
                            <div className="text-xs text-teal-300">Complexity Score: Low</div>
                            <div className="mt-1 h-2 w-full rounded bg-teal-900/50">
                              <div className="h-full w-2/5 rounded bg-teal-500"></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            onClick={() => setNavMode('router')}
                            className="rounded bg-teal-800/50 px-4 py-2 hover:bg-teal-800/70"
                          >
                            Try Router Mode
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CodeBlock
                    code={`// Complete Route Configuration Example
<Routes>
  {/* Index route */}
  <Route index element={<Dashboard />} />
  
  {/* Parameterized routes */}
  <Route path="users/:userId" element={<UserProfile />} />
  
  {/* Nested routes */}
  <Route path="settings" element={<SettingsLayout />}>
    <Route path="profile" element={<ProfileSettings />} />
    <Route path="notifications" element={<NotificationSettings />} />
  </Route>
  
  {/* Protected routes */}
  <Route element={<RequireAuth />}>
    <Route path="admin" element={<AdminPanel />} />
  </Route>
  
  {/* Fallback route */}
  <Route path="*" element={<NotFound />} />
</Routes>`}
                    language="tsx"
                    variant="default"
                    title="// 💡 Advanced Route Patterns"
                    defaultExpanded={true}
                  />
                </div>
              )}

              {chapter === 4 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-teal-500/30 bg-slate-900/60 p-6">
                    <h4 className="mb-4 text-lg font-bold text-teal-300">
                      The Complete Map: Route Configuration
                    </h4>
                    <div className="mb-6">
                      <p className="mb-4 text-slate-300">
                        Your route configuration defines the entire navigable structure of your SPA:
                      </p>
                      <div className="rounded border border-teal-500/20 bg-slate-900 p-4">
                        <div className="font-mono text-sm">
                          <div className="text-teal-400">// Route Configuration Map</div>
                          <div className="mt-2 space-y-1 pl-4 text-slate-300">
                            <div>📄 <span className="text-amber-400">/</span> → HomePort component</div>
                            <div>🏛️ <span className="text-amber-400">/antioch</span> → Antioch component</div>
                            <div>⚓ <span className="text-teal-400">/tyre</span> → Tyre component</div>
                            <div>👑 <span className="text-rose-400">/pentapolis</span> → Pentapolis component</div>
                            <div>⚗️ <span className="text-purple-400">/ephesus</span> → Ephesus component</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded border border-teal-500/20 bg-teal-950/20 p-4">
                        <h5 className="mb-2 font-bold text-teal-300">Centralized Structure</h5>
                        <p className="text-sm text-teal-200/80">
                          All routes defined in one place. Easy to understand the app's navigation structure at a glance.
                        </p>
                      </div>
                      <div className="rounded border border-teal-500/20 bg-teal-950/20 p-4">
                        <h5 className="mb-2 font-bold text-teal-300">Type Safety</h5>
                        <p className="text-sm text-teal-200/80">
                          With TypeScript, you get autocomplete for route paths and type-safe route parameters.
                        </p>
                      </div>
                    </div>
                  </div>
                  <CodeBlock
                    code={`// Final Implementation: Complete Router Setup
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// 1. Define your route configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'users/:id', element: <UserDetail /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

// 2. Provide the router to your app
function App() {
  return <RouterProvider router={router} />;
}

// 3. That's it! Your entire SPA navigation is configured.`}
                    language="tsx"
                    variant="success"
                    title="// 🗺️ Complete Navigation Configuration"
                    defaultExpanded={true}
                  />
                </div>
              )}
            </section>

            {/* Navigation */}
            <ChapterNavigation
              currentChapter={chapter}
              totalChapters={chapters.length}
              onChapterChange={setChapter}
              themeColor="teal"
            />
          </ModuleLayout>
        </BrowserRouter>
      </main>
    </div>
  );
}