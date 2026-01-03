import { useState, ComponentType } from "react";
import {
  Brain,
  Code,
  Book,
  Wand,
  Zap,
  Loader,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeComparison } from "@/components/common/CodeComparison";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  id: string;
  title: string;
  content: string;
  demoKey: string;
}

interface LazyComponent {
  name: string;
  size: number;
  loaded: boolean;
  error: boolean;
  component: ComponentType | null;
}

export default function CodeSplittingWithHorcruxes(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [monolithicSize, setMonolithicSize] = useState<number>(3500);
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(
    new Set()
  );
  const [activeHorcrux, setActiveHorcrux] = useState<string | null>(null);
  const [simulateCrash, setSimulateCrash] = useState<boolean>(false);
  const [networkDelay, setNetworkDelay] = useState<number>(1000);
  const [lazyComponents, setLazyComponents] = useState<LazyComponent[]>([
    { name: "Diary", size: 450, loaded: false, error: false, component: null },
    { name: "Ring", size: 620, loaded: false, error: false, component: null },
    { name: "Locket", size: 580, loaded: false, error: false, component: null },
    { name: "Cup", size: 510, loaded: false, error: false, component: null },
    { name: "Diadem", size: 670, loaded: false, error: false, component: null },
    { name: "Nagini", size: 890, loaded: false, error: false, component: null },
  ]);

const chapters: Chapter[] = [
  {
    id: "intro",
    title: "The All-or-Nothing Soul",
    content:
      "Tom Riddle closed the ancient tome with contempt. His soul—powerful, singular, complete—was also fragile. 'A single soul is a single point of failure,' he whispered. 'Poor design.'",
    demoKey: "monolithic-bundle",
  },
  {
    id: "build",
    title: "The Godric's Hollow Crash",
    content:
      "Voldemort arrived at the Potter cottage as pure, concentrated power—his entire being loaded into one vessel. When the curse rebounded, it wasn't partial failure. The whole monolithic structure collapsed instantly.",
    demoKey: "crash-demo",
  },
  {
    id: "climax",
    title: "The Soul Divided",
    content:
      "The newly reborn Voldemort performed the ritual, tearing his soul and anchoring a fragment into Nagini. His immediate power diminished, but something replaced it: resilience. 'I am no longer a single entity. I am a network.'",
    demoKey: "lazy-loading",
  },
  {
    id: "resolution",
    title: "Monolith vs. Plague",
    content:
      "In Dumbledore's Pensieve, Harry saw two approaches. The Monolith: Voldemort arrived in full, overwhelming presence—but when driven away, the threat vanished entirely. The Plague: He appeared in stages, anchored elsewhere. When the man fled, the threat remained.",
    demoKey: "comparison",
  },
  {
    id: "summary",
    title: "Hunting the Pieces",
    content:
      "'The locket is done. The cup is next,' Hermione said. Their strategy was clear: don't attack the main body while distributed pieces remain. Hunt systematically, one Horcrux at a time, until the network falls.",
    demoKey: "sequential-loading",
  },
];

  const currentChapter = chapters[chapter];

  // Simulate loading a lazy component
  const loadHorcrux = (name: string): void => {
    if (loadedComponents.has(name) || loadedComponents.size >= 5) return;

    setActiveHorcrux(name);

    // Simulate network delay
    setTimeout(() => {
      setLoadedComponents((prev) => new Set([...prev, name]));
      setLazyComponents((prev) =>
        prev.map((h) => (h.name === name ? { ...h, loaded: true } : h))
      );
      setActiveHorcrux(null);
    }, networkDelay);
  };

  // Reset all loaded components
  const resetDemo = (): void => {
    setLoadedComponents(new Set());
    setLazyComponents((prev) => prev.map((h) => ({ ...h, loaded: false })));
    setActiveHorcrux(null);
  };

  // Code examples
  const monolithicCode = `// ❌ Monolithic Anti-Pattern
import DiaryComponent from './diary';
import RingComponent from './ring';
import LocketComponent from './locket';
import CupComponent from './cup';
import DiademComponent from './diadem';
import NaginiComponent from './nagini';

function MonolithApp() {
  // All 3.5KB loaded upfront
  return (
    <>
      <DiaryComponent />
      <RingComponent />
      <LocketComponent />
      <CupComponent />
      <DiademComponent />
      <NaginiComponent />
    </>
  );
}`;

  const lazyCode = `// ✅ Code Splitting with React.lazy()
import { lazy, Suspense } from 'react';

const Diary = lazy(() => import('./diary'));
const Ring = lazy(() => import('./ring'));
const Locket = lazy(() => import('./locket'));
const Cup = lazy(() => import('./cup'));
const Diadem = lazy(() => import('./diadem'));
const Nagini = lazy(() => import('./nagini'));

function SplitApp() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Route path="/diary" element={<Diary />} />
      <Route path="/ring" element={<Ring />} />
      {/* Only loads when needed */}
    </Suspense>
  );
}`;

  const missingSuspenseCode = `// ❌ Missing Suspense Boundary
const LazyComponent = lazy(() => import('./component'));

function BrokenApp() {
  return <LazyComponent />; // Will crash!
}`;

  const correctSuspenseCode = `// ✅ With Suspense Boundary
const LazyComponent = lazy(() => import('./component'));

function FixedApp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`;

  const chunkConfigCode = `// ✅ Optimal Chunk Configuration
// Group related components
const HorcruxViews = lazy(() => import(
  /* webpackChunkName: "horcrux-views" */
  './horcrux-views'
));

const DarkArtifacts = lazy(() => import(
  /* webpackChunkName: "dark-artifacts" */
  './dark-artifacts'
));

// Route-based splitting (most effective)
const routes = [
  {
    path: '/diary',
    element: lazy(() => import('./diary'))
  },
  {
    path: '/ring',
    element: lazy(() => import('./ring'))
  }
];`;

  // Calculate metrics
  const loadedSize = lazyComponents
    .filter((h) => loadedComponents.has(h.name))
    .reduce((sum, h) => sum + h.size, 0);

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Brain}
        title="Harry Potter series"
        subtitle="Fiction • Voldemort's Horcruxes • 1997-2007"
        concept="Code Splitting and Lazy Loading"
        themeColor="emerald"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Metrics Card */}
              <div className="rounded-xl border border-emerald-500/20 bg-slate-900/60 p-4 backdrop-blur-sm">
                <h3 className="mb-3 font-bold text-emerald-100">
                  System Metrics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Bundle Size</span>
                    <span className="font-mono text-emerald-300">
                      {monolithicSize} KB
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Loaded</span>
                    <span className="font-mono text-emerald-300">
                      {loadedSize} KB
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Savings</span>
                    <span className="font-mono text-emerald-300">
                      {Math.round((1 - loadedSize / monolithicSize) * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800">
                    <div
                      className="h-1.5 rounded-full bg-emerald-500 transition-all duration-500"
                      style={{
                        width: `${(loadedSize / monolithicSize) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-300">
                  <Book className="h-5 w-5" />
                  Metaphor Registry
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-red-500"></div>
                    <div>
                      <span className="font-medium">Monolithic Soul</span>
                      <p className="text-xs text-slate-400">
                        Single JavaScript bundle
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-500"></div>
                    <div>
                      <span className="font-medium">Horcrux</span>
                      <p className="text-xs text-slate-400">Code-split chunk</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-amber-500"></div>
                    <div>
                      <span className="font-medium">Pensieve</span>
                      <p className="text-xs text-slate-400">
                        Suspense fallback UI
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-purple-500"></div>
                    <div>
                      <span className="font-medium">Hunt</span>
                      <p className="text-xs text-slate-400">
                        Network request for chunk
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Key Insight */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-emerald-200/80">
                  {chapter === 0 &&
                    "Large bundles create single points of failure and slow initial loads."}
                  {chapter === 1 &&
                    "When a monolithic app crashes, the entire user experience is lost."}
                  {chapter === 2 &&
                    "Splitting code into chunks (Horcruxes) isolates failures and improves resilience."}
                  {chapter === 3 &&
                    "Distributed systems load faster initially but require managing loading states."}
                  {chapter === 4 &&
                    "Sequential loading allows for precise control over resource prioritization."}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-emerald-300 sm:text-3xl">
              {currentChapter.title}
            </h2>
            <div className="space-y-4 leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-emerald-500/20 bg-slate-900/40 p-6 backdrop-blur-sm sm:mb-12 sm:p-8">
            {currentChapter.demoKey === "monolithic-bundle" && (
              <div className="space-y-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-red-300">
                  <AlertTriangle className="h-5 w-5" />
                  Monolithic Bundle: All-or-Nothing
                </h3>
                <CodeBlock
                  code={monolithicCode}
                  language="tsx"
                  title="// ❌ Monolithic Anti-Pattern"
                  defaultExpanded={true}
                />
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setMonolithicSize(3500)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                  >
                    Simulate 3.5MB Bundle
                  </button>
                  <span className="text-sm text-slate-400">
                    Initial load: 3500KB • Time-to-Interactive: ~7s
                  </span>
                </div>
              </div>
            )}

            {currentChapter.demoKey === "crash-demo" && (
              <div className="space-y-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-red-300">
                  <AlertTriangle className="h-5 w-5" />
                  Single Point of Failure
                </h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSimulateCrash(true)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                  >
                    Simulate Bundle Crash
                  </button>
                  <button
                    onClick={() => setSimulateCrash(false)}
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
                  >
                    Reset
                  </button>
                </div>
                {simulateCrash && (
                  <div className="animate-pulse rounded-lg border border-red-500/50 bg-red-950/30 p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                      <div>
                        <p className="font-bold text-red-300">
                          Fatal Bundle Error
                        </p>
                        <p className="text-sm text-red-400">
                          Application crashed: Entire bundle failed to load
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentChapter.demoKey === "lazy-loading" && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-emerald-300">
                    <Wand className="h-5 w-5" />
                    Code Splitting with React.lazy()
                  </h3>
                  <CodeBlock
                    code={lazyCode}
                    language="tsx"
                    title="// ✅ Code Splitting Solution"
                    defaultExpanded={true}
                  />
                </div>

                <CodeComparison
                  badCode={missingSuspenseCode}
                  goodCode={correctSuspenseCode}
                  language="tsx"
                  themeColor="emerald"
                  badLabel="❌ Missing Suspense"
                  goodLabel="✅ With Suspense"
                  badExplanation="Without Suspense, lazy components will crash the app while loading."
                  goodExplanation="Suspense provides a fallback UI while the component chunk loads."
                />

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-lg bg-slate-800/30 p-4">
                    <h4 className="mb-3 font-bold text-emerald-300">
                      Load a Horcrux (Chunk)
                    </h4>
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                      {lazyComponents.map((horcrux) => (
                        <button
                          key={horcrux.name}
                          onClick={() => loadHorcrux(horcrux.name)}
                          disabled={horcrux.loaded || activeHorcrux !== null}
                          className={`flex flex-col items-center justify-center rounded-lg p-3 transition-all ${
                            horcrux.loaded
                              ? "border border-emerald-500/30 bg-emerald-500/20"
                              : "border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50"
                          } disabled:cursor-not-allowed disabled:opacity-30`}
                        >
                          {activeHorcrux === horcrux.name ? (
                            <Loader className="mb-1 h-5 w-5 animate-spin text-amber-400" />
                          ) : horcrux.loaded ? (
                            <Zap className="mb-1 h-5 w-5 text-emerald-400" />
                          ) : (
                            <Code className="mb-1 h-5 w-5 text-slate-400" />
                          )}
                          <span className="text-sm font-medium">
                            {horcrux.name}
                          </span>
                          <span className="text-xs text-slate-400">
                            {horcrux.size}KB
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-800/30 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-bold text-emerald-300">
                        Network Simulation
                      </h4>
                      <button
                        onClick={resetDemo}
                        className="rounded bg-slate-700 px-3 py-1 text-sm hover:bg-slate-600"
                      >
                        Reset All
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <label className="text-sm">Delay:</label>
                        <input
                          type="range"
                          min="500"
                          max="3000"
                          step="100"
                          value={networkDelay}
                          onChange={(e) =>
                            setNetworkDelay(parseInt(e.target.value))
                          }
                          className="flex-1"
                        />
                        <span className="text-sm">{networkDelay}ms</span>
                      </div>
                      {activeHorcrux && (
                        <div className="rounded border border-amber-500/30 bg-amber-950/20 p-3">
                          <div className="flex items-center gap-2">
                            <Loader className="h-4 w-4 animate-spin text-amber-400" />
                            <span className="text-sm">
                              Fetching {activeHorcrux} chunk...
                            </span>
                          </div>
                          <div className="mt-2 h-2 w-full rounded-full bg-slate-700">
                            <div
                              className="h-2 rounded-full bg-amber-500 transition-all duration-1000"
                              style={{ width: "100%" }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentChapter.demoKey === "comparison" && (
              <div className="space-y-6">
                <h3 className="text-center text-xl font-bold text-emerald-300">
                  Monolith vs. Distributed System
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                      <h4 className="mb-3 font-bold text-red-300">
                        Monolithic Approach
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span>Loads everything upfront</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span>Single point of failure</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span>Poor Time-to-Interactive</span>
                        </li>
                      </ul>
                      <div className="mt-4 rounded bg-slate-900/50 p-3">
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Bundle Size:</span>
                          <span className="font-bold text-red-300">
                            {monolithicSize} KB
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div
                            className="h-2 rounded-full bg-red-500"
                            style={{ width: "100%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                      <h4 className="mb-3 font-bold text-emerald-300">
                        Code-Split Approach
                      </h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span>Loads only what's needed</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span>Graceful partial failure</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span>Faster initial render</span>
                        </li>
                      </ul>
                      <div className="mt-4 rounded bg-slate-900/50 p-3">
                        <div className="mb-1 flex justify-between text-sm">
                          <span>Currently Loaded:</span>
                          <span className="font-bold text-emerald-300">
                            {loadedSize} KB
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div
                            className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                            style={{
                              width: `${(loadedSize / monolithicSize) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentChapter.demoKey === "sequential-loading" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-emerald-300">
                  Systematic Component Hunting
                </h3>
                <CodeBlock
                  code={chunkConfigCode}
                  language="tsx"
                  title="// ✅ Optimal Chunk Configuration"
                  defaultExpanded={true}
                />
                <div className="rounded-lg bg-slate-800/30 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-bold text-emerald-300">
                      Sequential Loading Strategy
                    </h4>
                    <div className="text-sm text-slate-400">
                      Loaded: {loadedComponents.size}/6 • Circuit:{" "}
                      {5 - loadedComponents.size} remaining
                    </div>
                  </div>
                  <div className="space-y-3">
                    {lazyComponents.map((horcrux) => (
                      <div
                        key={horcrux.name}
                        className={`flex items-center justify-between rounded-lg p-3 transition-all ${
                          horcrux.loaded
                            ? "border border-emerald-500/20 bg-emerald-500/10"
                            : "bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {horcrux.loaded ? (
                            <Zap className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <Code className="h-5 w-5 text-slate-500" />
                          )}
                          <div>
                            <p className="font-medium">{horcrux.name}</p>
                            <p className="text-xs text-slate-400">
                              {horcrux.size}KB chunk
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {horcrux.loaded ? (
                            <span className="rounded bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">
                              Loaded
                            </span>
                          ) : (
                            <button
                              onClick={() => loadHorcrux(horcrux.name)}
                              disabled={
                                loadedComponents.size >= 5 ||
                                activeHorcrux !== null
                              }
                              className="rounded bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-700 disabled:opacity-30"
                            >
                              Hunt
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-slate-700 pt-4">
                    <p className="text-center text-sm text-slate-400">
                      "We don't go after the main body. We find the pieces.
                      That's the only way."
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="emerald"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}