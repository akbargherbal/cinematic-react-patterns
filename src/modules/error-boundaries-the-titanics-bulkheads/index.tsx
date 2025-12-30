import { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from "react";
import { Ship, AlertTriangle, Shield, Waves, Anchor } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

// === Titanic Error Boundary (Teaching Component) ===
class TitanicErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; boundaryName: string },
  { hasError: boolean; errorMessage: string }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode; boundaryName: string }) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(`🚨 Bulkhead "${this.props.boundaryName}" contained error:`, error.message);
    console.log("Component stack:", errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// === Broken Component that throws errors ===
const IcebergCollision = ({ shouldCrash }: { shouldCrash: boolean }) => {
  if (shouldCrash) {
    throw new Error("💥 Iceberg collision! Hull breach detected.");
  }
  return (
    <div className="p-4 bg-slate-800/50 border border-sky-400/30 rounded">
      <div className="flex items-center gap-2">
        <Ship className="w-5 h-5 text-sky-400" />
        <span className="text-sky-300">Compartment: Boiler Room #6</span>
      </div>
      <div className="mt-2 text-sm text-slate-400">Status: Operational ✅</div>
    </div>
  );
};

// === Fallback UI (Lifeboats) ===
const LifeboatFallback = ({ boundaryName }: { boundaryName: string }) => (
  <div className="p-4 bg-amber-950/40 border border-amber-500/50 rounded animate-pulse">
    <div className="flex items-center gap-2 mb-2">
      <AlertTriangle className="w-5 h-5 text-amber-400" />
      <span className="font-bold text-amber-300">Bulkhead Sealed: {boundaryName}</span>
    </div>
    <p className="text-sm text-amber-200/80">
      Emergency procedures activated. This compartment is isolated.
    </p>
    <div className="mt-3 flex items-center gap-2 text-xs">
      <Anchor className="w-3 h-3" />
      <span className="text-amber-300">Lifeboats deployed - Fallback UI active</span>
    </div>
  </div>
);

// === Main Module Component ===
export default function TitanicErrorBoundaries(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [cascadeErrors, setCascadeErrors] = useState<number>(0);
  const [showBoundary, setShowBoundary] = useState<boolean>(false);
  const [shouldCrash, setShouldCrash] = useState<boolean>(false);
  const [nestedMode, setNestedMode] = useState<"cascade" | "contained">("cascade");
  const [activeBoundaries, setActiveBoundaries] = useState<Set<string>>(new Set());
  const errorTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Circuit breaker: reset after 5 cascade errors
  useEffect(() => {
    if (cascadeErrors >= 5) {
      resetDemo();
    }
  }, [cascadeErrors]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
    };
  }, []);

  const chapters = [
    {
      title: "The Unsinkable Design",
      content:
        "Thomas Andrews' revolutionary design divided the Titanic into 16 watertight compartments. Each was a self-contained fortress, theoretically able to isolate flooding. In React, components are similar compartments—independent sections of your UI. But without proper bulkheads (Error Boundaries), a breach in one can sink the entire application.",
    },
    {
      title: "The Cascade",
      content:
        "When the iceberg struck, it breached multiple compartments. The watertight bulkheads had a fatal flaw: they didn't extend to the upper decks. As each compartment filled, water spilled over into the next, creating an unstoppable cascade. In React, an uncaught error in a component propagates upward, crashing each parent until the entire app fails—the white screen of death.",
    },
    {
      title: "Sealing the Boundary",
      content:
        "Imagine a redesigned engine room with full-height steel bulkheads. When a steam pipe bursts (a component error), an emergency lever slams a boundary shut, containing the damage. The rest of the ship continues operating. In React, Error Boundaries are these bulkheads—they catch JavaScript errors anywhere in their child component tree and display a fallback UI instead of crashing.",
    },
    {
      title: "Two Fates, One Design",
      content:
        "The original Titanic sank because one failure became a catastrophe. A redesigned ship with proper bulkheads would have contained the damage, allowing most systems to function. Similarly, an app without Error Boundaries crashes completely from one error. With boundaries, the error is contained, showing a helpful fallback while the rest of the app remains interactive.",
    },
    {
      title: "The Resilient Architect",
      content:
        "Modern ships use cellular architecture—multiple layers of containment. A breach in one cell doesn't compromise others. In React, you should wrap strategic component trees with Error Boundaries: navigation sections, feature modules, data-fetching components. Don't build for perfection; build for resilience. Assume errors will happen and design systems that contain them.",
    },
  ];

  const triggerCascade = () => {
    setShouldCrash(true);
    setCascadeErrors((prev) => prev + 1);
    
    // Auto-reset after showing error
    errorTimerRef.current = setTimeout(() => {
      setShouldCrash(false);
    }, 2000);
  };

  const resetDemo = () => {
    setCascadeErrors(0);
    setShouldCrash(false);
    setShowBoundary(false);
    setActiveBoundaries(new Set());
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }
  };

  const currentChapter = chapters[chapter];

  // Code examples
  const errorBoundaryCode = `class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return <div className="error-fallback">Something went wrong.</div>;
    }
    return this.props.children;
  }
}`;

  const usageCode = `// Wrap vulnerable components
<ErrorBoundary fallback={<ErrorFallback />}>
  <IcebergCollision /> {/* This might throw */}
</ErrorBoundary>

// The rest of your app continues working
<OtherComponents />
<Navigation />
<UserProfile />`;

  const missingBoundaryCode = `// ❌ NO BULKHEAD - ERROR PROPAGATES
function App() {
  return (
    <div>
      <Header />
      <MainContent /> {/* Error here crashes everything */}
      <Footer /> {/* Never renders */}
    </div>
  );
}`;

  const withBoundaryCode = `// ✅ WITH BULKHEADS - ERROR CONTAINED
function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary fallback={<MaintenanceMessage />}>
        <MainContent /> {/* Error caught here */}
      </ErrorBoundary>
      <Footer /> {/* Still renders! */}
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-serif">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Ship className="text-sky-400 w-8 h-8" />
              <h1 className="text-2xl md:text-3xl font-bold">Titanic (1997)</h1>
            </div>
            <p className="text-sm md:text-base text-slate-400">
              Thomas Andrews, The Designer
            </p>
          </div>
          <p className="text-base md:text-lg text-sky-400 font-medium">
            Error Boundaries: The Titanic's Bulkheads
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Main Content - 7 columns */}
        <div className="lg:col-span-7 space-y-8">
          {/* Chapter Content */}
          <section className="prose prose-invert prose-lg max-w-none">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl md:text-3xl font-bold m-0">{currentChapter.title}</h2>
              <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                Chapter {chapter + 1} of 5
              </span>
            </div>
            <p className="leading-relaxed text-slate-300">{currentChapter.content}</p>
          </section>

          {/* Interactive Demo Section */}
          <section className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Waves className="w-5 h-5 text-sky-400" />
              Interactive Demonstration
            </h3>

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/30 border border-sky-500/20 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <Ship className="w-4 h-4 text-sky-400" />
                      <span className="text-sm font-medium">Boiler Room</span>
                    </div>
                    <div className="text-xs text-slate-400">Component A</div>
                  </div>
                  <div className="p-4 bg-slate-800/30 border border-sky-500/20 rounded">
                    <div className="flex items-center gap-2 mb-2">
                      <Ship className="w-4 h-4 text-sky-400" />
                      <span className="text-sm font-medium">Grand Staircase</span>
                    </div>
                    <div className="text-xs text-slate-400">Component B</div>
                  </div>
                </div>
                <CodeBlock
                  code={`// Your React application is a ship
const TitanicApp = () => (
  <div className="ship">
    <BoilerRoom />    {/* Compartment 1 */}
    <GrandStaircase /> {/* Compartment 2 */}
    <EngineRoom />    {/* Compartment 3 */}
    <Bridge />        {/* Compartment 4 */}
  </div>
);`}
                  variant="default"
                  title="// The Ship As Component Tree"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="bg-red-950/20 border border-red-500/30 p-4 rounded">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span className="font-bold text-red-300">Cascade Simulation</span>
                    </div>
                    <button
                      onClick={triggerCascade}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                    >
                      🚨 Simulate Iceberg
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className={`p-3 rounded ${shouldCrash ? 'bg-red-900/40 border border-red-500/50' : 'bg-slate-800/30 border border-slate-700'}`}>
                      Boiler Room #6: {shouldCrash ? '💥 BREACHED - Flooding!' : '✅ Operational'}
                    </div>
                    <div className={`p-3 rounded ${cascadeErrors > 0 ? 'bg-red-800/30 border border-red-500/30' : 'bg-slate-800/30 border border-slate-700'}`}>
                      Boiler Room #5: {cascadeErrors > 0 ? '⚠️ Water rising' : '✅ Operational'}
                    </div>
                    <div className={`p-3 rounded ${cascadeErrors > 1 ? 'bg-red-800/30 border border-red-500/30' : 'bg-slate-800/30 border border-slate-700'}`}>
                      Engine Room: {cascadeErrors > 1 ? '⚠️ Power failing' : '✅ Operational'}
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-red-300">
                    Cascade errors: <span className="font-bold">{cascadeErrors}</span> / 5 (auto-reset at 5)
                  </div>
                </div>
                <CodeBlock
                  code={missingBoundaryCode}
                  variant="error"
                  title="// ❌ No Error Boundaries - The Cascade"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setShowBoundary(false)}
                    className={`px-4 py-2 rounded transition-colors ${!showBoundary ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    ❌ Without Boundary
                  </button>
                  <button
                    onClick={() => setShowBoundary(true)}
                    className={`px-4 py-2 rounded transition-colors ${showBoundary ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    ✅ With Boundary
                  </button>
                </div>

                <div className="border border-slate-700 rounded p-4">
                  {showBoundary ? (
                    <TitanicErrorBoundary
                      fallback={<LifeboatFallback boundaryName="Engine Room Bulkhead" />}
                      boundaryName="Engine Room"
                    >
                      <IcebergCollision shouldCrash={shouldCrash} />
                    </TitanicErrorBoundary>
                  ) : (
                    <IcebergCollision shouldCrash={shouldCrash} />
                  )}
                  
                  <div className="mt-4 p-3 bg-slate-800/30 rounded border border-slate-700">
                    <div className="flex items-center gap-2">
                      <Ship className="w-4 h-4 text-sky-400" />
                      <span>Rest of the Ship (Other Components)</span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      Status: {showBoundary ? '✅ Fully Operational' : '⚠️ At Risk'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShouldCrash(!shouldCrash)}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded"
                >
                  {shouldCrash ? '🛠️ Repair Hull' : '💥 Simulate Iceberg Collision'}
                </button>

                <CodeBlock
                  code={errorBoundaryCode}
                  variant="success"
                  title="// ✅ Error Boundary Implementation"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-red-950/20 border border-red-500/30 p-4 rounded">
                    <h4 className="font-bold text-red-300 mb-3">❌ The Cascade</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-red-900/40 rounded text-sm">Boiler Room: 💥 CRASHED</div>
                      <div className="p-2 bg-red-800/30 rounded text-sm">Engine Room: 💥 CRASHED</div>
                      <div className="p-2 bg-red-800/30 rounded text-sm">Bridge: 💥 CRASHED</div>
                      <div className="p-2 bg-slate-800/30 rounded text-sm opacity-50">Lifeboats: NEVER DEPLOYED</div>
                    </div>
                    <div className="mt-4 text-xs text-red-300">
                      Entire ship lost. White screen of death.
                    </div>
                  </div>

                  <div className="bg-sky-950/20 border border-sky-500/30 p-4 rounded">
                    <h4 className="font-bold text-sky-300 mb-3">✅ The Containment</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-amber-900/40 rounded text-sm">Boiler Room: 🚨 SEALED</div>
                      <div className="p-2 bg-sky-900/30 rounded text-sm">Engine Room: ✅ OPERATIONAL</div>
                      <div className="p-2 bg-sky-900/30 rounded text-sm">Bridge: ✅ OPERATIONAL</div>
                      <div className="p-2 bg-amber-800/30 rounded text-sm">Lifeboats: ✅ DEPLOYED</div>
                    </div>
                    <div className="mt-4 text-xs text-sky-300">
                      80% of ship functional. Graceful degradation.
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={withBoundaryCode}
                  variant="success"
                  title="// ✅ With Error Boundaries - Contained Failure"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setNestedMode("cascade")}
                    className={`px-4 py-2 rounded transition-colors ${nestedMode === "cascade" ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    Single Boundary
                  </button>
                  <button
                    onClick={() => setNestedMode("contained")}
                    className={`px-4 py-2 rounded transition-colors ${nestedMode === "contained" ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                  >
                    Nested Boundaries
                  </button>
                </div>

                <div className="border border-slate-700 rounded p-4">
                  {nestedMode === "contained" ? (
                    <div className="space-y-4">
                      <TitanicErrorBoundary
                        fallback={<LifeboatFallback boundaryName="Navigation Deck" />}
                        boundaryName="Navigation"
                      >
                        <div className="p-3 bg-slate-800/30 rounded">
                          <div className="text-sm font-medium">Navigation System</div>
                          <button
                            onClick={() => setActiveBoundaries(prev => new Set(prev).add("nav"))}
                            className="mt-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded"
                          >
                            Trigger Error
                          </button>
                        </div>
                      </TitanicErrorBoundary>

                      <TitanicErrorBoundary
                        fallback={<LifeboatFallback boundaryName="Passenger Area" />}
                        boundaryName="Passenger"
                      >
                        <div className="p-3 bg-slate-800/30 rounded">
                          <div className="text-sm font-medium">Passenger Interface</div>
                          <div className="text-xs text-slate-400 mt-1">✅ Fully Functional</div>
                        </div>
                      </TitanicErrorBoundary>
                    </div>
                  ) : (
                    <TitanicErrorBoundary
                      fallback={<LifeboatFallback boundaryName="Main Ship" />}
                      boundaryName="Main"
                    >
                      <div className="space-y-4">
                        <div className="p-3 bg-slate-800/30 rounded">
                          <div className="text-sm font-medium">Navigation System</div>
                          <div className="text-xs text-slate-400 mt-1">✅ Operational</div>
                        </div>
                        <div className="p-3 bg-slate-800/30 rounded">
                          <div className="text-sm font-medium">Passenger Interface</div>
                          <div className="text-xs text-slate-400 mt-1">✅ Operational</div>
                        </div>
                      </div>
                    </TitanicErrorBoundary>
                  )}
                </div>

                <CodeBlock
                  code={usageCode}
                  variant="default"
                  title="// Strategic Boundary Placement"
                  defaultExpanded={true}
                />
              </div>
            )}
          </section>

          {/* Navigation */}
          <nav className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              ← Previous
            </button>
            
            <div className="flex flex-col items-center">
              <div className="flex gap-1 mb-2">
                {chapters.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${i === chapter ? 'bg-sky-500' : 'bg-slate-700'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
            </div>
            
            <button
              onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              Next →
            </button>
          </nav>
        </div>

        {/* Sidebar - 5 columns */}
        <div className="lg:col-span-5 mt-8 lg:mt-0">
          <div className="sticky top-24 space-y-6">
            {/* Metaphor Mapping */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-sky-400" />
                Metaphor Registry
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-sm text-slate-400">Titanic</span>
                  <span className="text-sm font-medium">React Application</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-sm text-slate-400">Bulkheads</span>
                  <span className="text-sm font-medium">Error Boundaries</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-sm text-slate-400">Iceberg Collision</span>
                  <span className="text-sm font-medium">JavaScript Error</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-sm text-slate-400">Cascade Flood</span>
                  <span className="text-sm font-medium">Error Propagation</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-sm text-slate-400">Lifeboats</span>
                  <span className="text-sm font-medium">Fallback UI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Unaffected Sections</span>
                  <span className="text-sm font-medium">Working Components</span>
                </div>
              </div>
            </div>

            {/* Key Concept */}
            <div className="bg-sky-950/20 border border-sky-500/30 rounded-xl p-5">
              <h3 className="text-lg font-bold mb-3 text-sky-300">Key Concept</h3>
              <p className="text-sm text-slate-300 mb-3">
                Error Boundaries catch JavaScript errors in their child component tree, 
                log those errors, and display a fallback UI instead of crashing.
              </p>
              <div className="text-xs text-sky-300/80 space-y-1">
                <div>• Class components only (or use `react-error-boundary` package)</div>
                <div>• Use `getDerivedStateFromError()` to render fallback</div>
                <div>• Use `componentDidCatch()` for error logging</div>
                <div>• Place boundaries around feature sections</div>
              </div>
            </div>

            {/* Reset Section */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-5">
              <h3 className="text-lg font-bold mb-3">Demo Controls</h3>
              <div className="space-y-3">
                <button
                  onClick={resetDemo}
                  className="w-full px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors"
                >
                  🔄 Reset All Demos
                </button>
                <div className="text-xs text-slate-400">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span>Red = Error / Without Boundary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>Blue = Contained / With Boundary</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}