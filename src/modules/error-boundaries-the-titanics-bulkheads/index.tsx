import { useState, useEffect, useRef } from "react";
import { Ship, AlertTriangle, Shield, Waves, Anchor } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";

// === Broken Component that throws errors ===
const IcebergCollision = ({ shouldCrash }: { shouldCrash: boolean }) => {
  if (shouldCrash) {
    throw new Error("💥 Iceberg collision! Hull breach detected.");
  }
  return (
    <div className="rounded border border-cyan-400/30 bg-slate-800/50 p-4">
      <div className="flex items-center gap-2">
        <Ship className="h-5 w-5 text-cyan-400" />
        <span className="text-cyan-300">Compartment: Boiler Room #6</span>
      </div>
      <div className="mt-2 text-sm text-slate-400">Status: Operational ✅</div>
    </div>
  );
};

// === Fallback UI (Lifeboats) ===
const LifeboatFallback = ({
  error,
  resetErrorBoundary,
  boundaryName,
}: {
  error?: Error;
  resetErrorBoundary?: () => void;
  boundaryName: string;
}) => (
  <div className="animate-pulse rounded border border-amber-500/50 bg-amber-950/40 p-4">
    <div className="mb-2 flex items-center gap-2">
      <AlertTriangle className="h-5 w-5 text-amber-400" />
      <span className="font-bold text-amber-300">
        Bulkhead Sealed: {boundaryName}
      </span>
    </div>
    <p className="text-sm text-amber-200/80">
      Emergency procedures activated. This compartment is isolated.
    </p>
    <div className="mt-3 flex items-center gap-2 text-xs">
      <Anchor className="h-3 w-3" />
      <span className="text-amber-300">
        Lifeboats deployed - Fallback UI active
      </span>
    </div>
  </div>
);

// === Main Module Component ===
export default function TitanicErrorBoundaries(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [cascadeErrors, setCascadeErrors] = useState<number>(0);
  const [showBoundary, setShowBoundary] = useState<boolean>(false);
  const [shouldCrash, setShouldCrash] = useState<boolean>(false);
  const [nestedMode, setNestedMode] = useState<"cascade" | "contained">(
    "cascade",
  );
  const [activeBoundaries, setActiveBoundaries] = useState<Set<string>>(
    new Set(),
  );
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
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      {/* Standardized Header */}
      <ModuleHeader
        icon={Ship}
        title="Titanic (1997)"
        subtitle="Thomas Andrews, The Designer"
        concept="Error Boundaries: The Titanic's Bulkheads"
        themeColor="cyan"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Standardized Layout */}
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Metaphor Mapping */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Titanic</span>
                    <span className="text-sm font-medium">
                      React Application
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Bulkheads</span>
                    <span className="text-sm font-medium">
                      Error Boundaries
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">
                      Iceberg Collision
                    </span>
                    <span className="text-sm font-medium">
                      JavaScript Error
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">
                      Cascade Flood
                    </span>
                    <span className="text-sm font-medium">
                      Error Propagation
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Lifeboats</span>
                    <span className="text-sm font-medium">Fallback UI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      Unaffected Sections
                    </span>
                    <span className="text-sm font-medium">
                      Working Components
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Concept */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5">
                <h3 className="mb-3 text-lg font-bold text-cyan-300">
                  Key Concept
                </h3>
                <p className="mb-3 text-sm text-slate-300">
                  Error Boundaries catch JavaScript errors in their child
                  component tree, log those errors, and display a fallback UI
                  instead of crashing.
                </p>
                <div className="space-y-1 text-xs text-cyan-300/80">
                  <div>
                    • Class components only (or use `react-error-boundary`
                    package)
                  </div>
                  <div>
                    • Use `getDerivedStateFromError()` to render fallback
                  </div>
                  <div>• Use `componentDidCatch()` for error logging</div>
                  <div>• Place boundaries around feature sections</div>
                </div>
              </div>

              {/* Reset Section */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-3 text-lg font-bold">Demo Controls</h3>
                <div className="space-y-3">
                  <button
                    onClick={resetDemo}
                    className="w-full rounded bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700"
                  >
                    🔄 Reset All Demos
                  </button>
                  <div className="text-xs text-slate-400">
                    <div className="mb-1 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <span>Red = Error / Without Boundary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-cyan-500" />
                      <span>Cyan = Contained / With Boundary</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <section className="prose prose-invert prose-lg mb-8 max-w-none sm:mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="m-0 text-2xl font-bold sm:text-3xl">
                {currentChapter.title}
              </h2>
              <span className="rounded-full bg-slate-800/50 px-3 py-1 text-sm text-slate-400">
                Chapter {chapter + 1} of 5
              </span>
            </div>
            <p className="leading-relaxed text-slate-300">
              {currentChapter.content}
            </p>
          </section>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-slate-700 bg-slate-900/50 p-6 sm:mb-12 sm:p-8">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <Waves className="h-5 w-5 text-cyan-400" />
              Interactive Demonstration
            </h3>

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded border border-cyan-500/20 bg-slate-800/30 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Ship className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm font-medium">Boiler Room</span>
                    </div>
                    <div className="text-xs text-slate-400">Component A</div>
                  </div>
                  <div className="rounded border border-cyan-500/20 bg-slate-800/30 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Ship className="h-4 w-4 text-cyan-400" />
                      <span className="text-sm font-medium">
                        Grand Staircase
                      </span>
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
                <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <span className="font-bold text-red-300">
                        Cascade Simulation
                      </span>
                    </div>
                    <button
                      onClick={triggerCascade}
                      className="rounded bg-red-600 px-4 py-2 text-sm text-white transition-colors hover:bg-red-700"
                    >
                      🚨 Simulate Iceberg
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div
                      className={`rounded p-3 ${shouldCrash ? "border border-red-500/50 bg-red-900/40" : "border border-slate-700 bg-slate-800/30"}`}
                    >
                      Boiler Room #6:{" "}
                      {shouldCrash
                        ? "💥 BREACHED - Flooding!"
                        : "✅ Operational"}
                    </div>
                    <div
                      className={`rounded p-3 ${cascadeErrors > 0 ? "border border-red-500/30 bg-red-800/30" : "border border-slate-700 bg-slate-800/30"}`}
                    >
                      Boiler Room #5:{" "}
                      {cascadeErrors > 0 ? "⚠️ Water rising" : "✅ Operational"}
                    </div>
                    <div
                      className={`rounded p-3 ${cascadeErrors > 1 ? "border border-red-500/30 bg-red-800/30" : "border border-slate-700 bg-slate-800/30"}`}
                    >
                      Engine Room:{" "}
                      {cascadeErrors > 1
                        ? "⚠️ Power failing"
                        : "✅ Operational"}
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-red-300">
                    Cascade errors:{" "}
                    <span className="font-bold">{cascadeErrors}</span> / 5
                    (auto-reset at 5)
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
                <div className="mb-4 flex gap-4">
                  <button
                    onClick={() => setShowBoundary(false)}
                    className={`rounded px-4 py-2 transition-colors ${!showBoundary ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"}`}
                  >
                    ❌ Without Boundary
                  </button>
                  <button
                    onClick={() => setShowBoundary(true)}
                    className={`rounded px-4 py-2 transition-colors ${showBoundary ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-300"}`}
                  >
                    ✅ With Boundary
                  </button>
                </div>

                <div className="rounded border border-slate-700 p-4">
                  {showBoundary ? (
                    <ErrorBoundary
                      FallbackComponent={(props) => (
                        <LifeboatFallback
                          {...props}
                          boundaryName="Engine Room Bulkhead"
                        />
                      )}
                      onError={(error, errorInfo) => {
                        console.log(
                          `🚨 Bulkhead "Engine Room" contained error:`,
                          error.message,
                        );
                        console.log(
                          "Component stack:",
                          errorInfo.componentStack,
                        );
                      }}
                    >
                      <IcebergCollision shouldCrash={shouldCrash} />
                    </ErrorBoundary>
                  ) : (
                    <IcebergCollision shouldCrash={shouldCrash} />
                  )}

                  <div className="mt-4 rounded border border-slate-700 bg-slate-800/30 p-3">
                    <div className="flex items-center gap-2">
                      <Ship className="h-4 w-4 text-cyan-400" />
                      <span>Rest of the Ship (Other Components)</span>
                    </div>
                    <div className="mt-1 text-sm text-slate-400">
                      Status:{" "}
                      {showBoundary ? "✅ Fully Operational" : "⚠️ At Risk"}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShouldCrash(!shouldCrash)}
                  className="rounded bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
                >
                  {shouldCrash
                    ? "🛠️ Repair Hull"
                    : "💥 Simulate Iceberg Collision"}
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
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                    <h4 className="mb-3 font-bold text-red-300">
                      ❌ The Cascade
                    </h4>
                    <div className="space-y-2">
                      <div className="rounded bg-red-900/40 p-2 text-sm">
                        Boiler Room: 💥 CRASHED
                      </div>
                      <div className="rounded bg-red-800/30 p-2 text-sm">
                        Engine Room: 💥 CRASHED
                      </div>
                      <div className="rounded bg-red-800/30 p-2 text-sm">
                        Bridge: 💥 CRASHED
                      </div>
                      <div className="rounded bg-slate-800/30 p-2 text-sm opacity-50">
                        Lifeboats: NEVER DEPLOYED
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-red-300">
                      Entire ship lost. White screen of death.
                    </div>
                  </div>

                  <div className="rounded border border-cyan-500/30 bg-cyan-950/20 p-4">
                    <h4 className="mb-3 font-bold text-cyan-300">
                      ✅ The Containment
                    </h4>
                    <div className="space-y-2">
                      <div className="rounded bg-amber-900/40 p-2 text-sm">
                        Boiler Room: 🚨 SEALED
                      </div>
                      <div className="rounded bg-cyan-900/30 p-2 text-sm">
                        Engine Room: ✅ OPERATIONAL
                      </div>
                      <div className="rounded bg-cyan-900/30 p-2 text-sm">
                        Bridge: ✅ OPERATIONAL
                      </div>
                      <div className="rounded bg-amber-800/30 p-2 text-sm">
                        Lifeboats: ✅ DEPLOYED
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-cyan-300">
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
                <div className="mb-4 flex gap-4">
                  <button
                    onClick={() => setNestedMode("cascade")}
                    className={`rounded px-4 py-2 transition-colors ${nestedMode === "cascade" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"}`}
                  >
                    Single Boundary
                  </button>
                  <button
                    onClick={() => setNestedMode("contained")}
                    className={`rounded px-4 py-2 transition-colors ${nestedMode === "contained" ? "bg-cyan-600 text-white" : "bg-slate-800 text-slate-300"}`}
                  >
                    Nested Boundaries
                  </button>
                </div>

                <div className="rounded border border-slate-700 p-4">
                  {nestedMode === "contained" ? (
                    <div className="space-y-4">
                      <ErrorBoundary
                        FallbackComponent={(props) => (
                          <LifeboatFallback
                            {...props}
                            boundaryName="Navigation Deck"
                          />
                        )}
                        onError={(error, errorInfo) => {
                          console.log(
                            `🚨 Bulkhead "Navigation" contained error:`,
                            error.message,
                          );
                          console.log(
                            "Component stack:",
                            errorInfo.componentStack,
                          );
                        }}
                      >
                        <div className="rounded bg-slate-800/30 p-3">
                          <div className="text-sm font-medium">
                            Navigation System
                          </div>
                          <button
                            onClick={() =>
                              setActiveBoundaries((prev) =>
                                new Set(prev).add("nav"),
                              )
                            }
                            className="mt-2 rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                          >
                            Trigger Error
                          </button>
                        </div>
                      </ErrorBoundary>

                      <ErrorBoundary
                        FallbackComponent={(props) => (
                          <LifeboatFallback
                            {...props}
                            boundaryName="Passenger Area"
                          />
                        )}
                        onError={(error, errorInfo) => {
                          console.log(
                            `🚨 Bulkhead "Passenger" contained error:`,
                            error.message,
                          );
                          console.log(
                            "Component stack:",
                            errorInfo.componentStack,
                          );
                        }}
                      >
                        <div className="rounded bg-slate-800/30 p-3">
                          <div className="text-sm font-medium">
                            Passenger Interface
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            ✅ Fully Functional
                          </div>
                        </div>
                      </ErrorBoundary>
                    </div>
                  ) : (
                    <ErrorBoundary
                      FallbackComponent={(props) => (
                        <LifeboatFallback {...props} boundaryName="Main Ship" />
                      )}
                      onError={(error, errorInfo) => {
                        console.log(
                          `🚨 Bulkhead "Main" contained error:`,
                          error.message,
                        );
                        console.log(
                          "Component stack:",
                          errorInfo.componentStack,
                        );
                      }}
                    >
                      <div className="space-y-4">
                        <div className="rounded bg-slate-800/30 p-3">
                          <div className="text-sm font-medium">
                            Navigation System
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            ✅ Operational
                          </div>
                        </div>
                        <div className="rounded bg-slate-800/30 p-3">
                          <div className="text-sm font-medium">
                            Passenger Interface
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            ✅ Operational
                          </div>
                        </div>
                      </div>
                    </ErrorBoundary>
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

          {/* Standardized Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="cyan"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}
