import { useState, useEffect, Suspense, lazy, ReactNode } from "react";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Play,
  RefreshCw,
  Theater,
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
  emotionalArc: string;
}

export default function SuspenseWaitingForGodot(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState<number>(0);
  const [leakedIntervals, setLeakedIntervals] = useState<number>(0);
  const [simulateError, setSimulateError] = useState<boolean>(false);

  // Simulated async component for Suspense demonstration
  const LazyGodot = lazy(
    () =>
      new Promise<{ default: () => JSX.Element }>((resolve) => {
        setTimeout(() => {
          if (simulateError) {
            // Simulate an error for demonstration
            throw new Error("Godot cannot come today");
          }
          resolve({
            default: () => (
              <div className="animate-pulse text-2xl font-bold text-amber-400">
                🎭 Godot Has Arrived! 🎭
              </div>
            ),
          });
        }, 2000);
      }),
  );

  // Circuit breaker for leaked intervals
  useEffect(() => {
    if (leakedIntervals > 5) {
      resetDemo();
      alert("Safety: Auto-reset after 5 leaked intervals");
    }
  }, [leakedIntervals]);

  // Cleanup function
  useEffect(() => {
    return () => {
      // Cleanup any lingering timers
      resetDemo();
    };
  }, []);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Empty Road",
      content:
        "The stage is set with a single skeletal tree and an empty road stretching into nothingness. Vladimir and Estragon wait, filling time with their dialogue and hat-swapping. This is the fallback UI—the performance shown while the main event (Godot) is pending. When the messenger boy arrives with news that 'Godot won't come this evening but surely tomorrow,' we see the asynchronous state update: the promise is still pending, merely deferred.",
      emotionalArc:
        "Quiet anticipation → Repetitive melancholy → Flicker of hope → Resigned continuation",
    },
    {
      id: "build",
      title: "The Tyranny of the Horizon",
      content:
        "Vladimir appoints Estragon as the 'Godot-Checker'—constantly polling the horizon and shouting updates. This manual state checking (`if (isLoading)`) fragments their performance. When Pozzo appears, Estragon's false alarm triggers the wrong 'Welcome Godot' routine, confusing the audience. The effort of managing loading states exhausts the actors and ruins the user experience. The anti-pattern: manually checking state destroys flow.",
      emotionalArc:
        "Anxious determination → Manic confusion → Jarring failure → Utter exhaustion",
    },
    {
      id: "climax",
      title: "The Suspense Curtain",
      content:
        "The Director introduces the 'Suspense Curtain'—a declarative boundary that handles transitions automatically. Vladimir and Estragon perform uninterrupted, immersed in rich dialogue. When the boy arrives, the curtain rises seamlessly, revealing him without breaking performance. The waiting is no longer their burden; React's `<Suspense>` handles state transitions elegantly. The fallback UI becomes a complete experience.",
      emotionalArc:
        "Skeptical weariness → Immersive performance → Seamless revelation → Peaceful relief",
    },
    {
      id: "resolution",
      title: "Two Acts, Two Worlds",
      content:
        "Side-by-side comparison: The Imperative Act shows frantic polling, jarring interruptions, and exhausted actors. The Declarative Act shows fluid performance, seamless transitions, and professional elegance. Vladimir reflects: 'In the first act, we performed the waiting. In the second, we simply performed.' The difference: carrying the burden vs. trusting the structure.",
      emotionalArc:
        "Recalling chaos → Observing elegance → Articulated epiphany → Confident understanding",
    },
    {
      id: "summary",
      title: "The Art of Being",
      content:
        "The stage returns to its original state, but the atmosphere has transformed. The silence is now one of trust, not dread. Vladimir says, 'We just... are. We perform. We trust the stage to tell us when the scene changes.' The playbill reads: 'Featuring the eventual arrival of Godot. Note: The transition between states is managed by the Theatre.' Mastery: letting the framework handle uncertainty.",
      emotionalArc:
        "Serene confidence → Integration → Mastery → Peaceful closure",
    },
  ];

  // Code examples
  const imperativeCode = `// ❌ Imperative Loading Anti-pattern
function GodotChecker() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  // Manual polling - leaks memory!
  useEffect(() => {
    const interval = setInterval(() => {
      checkForGodot();
      setPollCount(c => c + 1); // Side effect
    }, 500);

    // ❌ Missing cleanup
    // return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Constantly checking road...</div>;
  }

  return <div>{data}</div>;
}`;

  const declarativeCode = `// ✅ Declarative Suspense Pattern
const Godot = lazy(() => import('./Godot'));

function TheaterStage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 border border-amber-500/30 rounded">
          <p>🎭 Vladimir & Estragon perform...</p>
          <p>👒 Hat-swapping philosophy...</p>
          <p>🥕 Discussing carrots...</p>
        </div>
      }
    >
      <Godot />
    </Suspense>
  );
}`;

  const errorBoundaryCode = `// ✅ Error Boundary for Resilience
function GodotPlay() {
  return (
    <ErrorBoundary
      fallback={<p>Godot cannot come today. The show continues.</p>}
    >
      <Suspense fallback={<TheaterFallback />}>
        <LazyGodot />
      </Suspense>
    </ErrorBoundary>
  );
}`;

  const currentChapter = chapters[chapter];

  // Demo functions
  const simulateImperativeLoading = () => {
    setIsLoading(true);
    setData(null);
    setPollCount(0);

    // Intentionally broken - missing cleanup
    const interval = setInterval(() => {
      setPollCount((p) => p + 1);
      if (pollCount >= 3) {
        setIsLoading(false);
        setData("⚠️ Pozzo arrives (false alarm!)");
        setLeakedIntervals((l) => l + 1);
      }
    }, 800);
  };

  const resetDemo = () => {
    setIsLoading(false);
    setData(null);
    setPollCount(0);
    setLeakedIntervals(0);
    setSimulateError(false);
  };

  const triggerSuspenseDemo = () => {
    setIsLoading(true);
    setData(null);
    setPollCount(0);
    // Suspense will handle the loading state automatically
  };

  // Render appropriate demo based on chapter
  const renderChapterDemo = (): ReactNode => {
    switch (chapter) {
      case 0: // Chapter 1: The Empty Road
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/30 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Theater className="h-6 w-6 text-amber-400" />
                <h3 className="text-lg font-semibold text-amber-200">
                  The Fallback Performance
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded bg-amber-950/40 p-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-amber-400" />
                  <p className="text-amber-100/80">
                    "We are waiting for Godot. What else is there to do?"
                  </p>
                </div>
                <div className="flex items-center gap-3 rounded bg-amber-950/40 p-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-amber-400" />
                  <p className="text-amber-100/80">
                    👒 Fiddling with hats and boots...
                  </p>
                </div>
                <div className="flex items-center gap-3 rounded bg-amber-950/40 p-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-amber-400" />
                  <p className="text-amber-100/80">
                    🥕 Discussing carrots vs. turnips...
                  </p>
                </div>
              </div>
            </div>
            <CodeBlock
              code={`// The fallback UI while waiting
const TheaterFallback = () => (
  <div className="p-6 border border-amber-500/30 rounded-lg">
    <h3>🎭 Performance in Progress</h3>
    <p>Vladimir & Estragon fill the time...</p>
    <p>Audience sees engaging content</p>
    <p>Loading happens in background</p>
  </div>
);`}
              language="tsx"
              title="// ✅ Engaging Fallback UI"
              defaultExpanded={true}
            />
          </div>
        );

      case 1: // Chapter 2: The Tyranny of the Horizon
        return (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={simulateImperativeLoading}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                <AlertCircle className="h-4 w-4" />
                🐛 Trigger Imperative Bug
              </button>
              <button
                onClick={resetDemo}
                className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Demo
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  Godot-Checker (Polling)
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Poll Count:</span>
                    <span className="font-mono text-red-300">{pollCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Leaked Intervals:</span>
                    <span className="font-mono text-red-300">
                      {leakedIntervals}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Status:</span>
                    <span
                      className={
                        isLoading ? "text-amber-300" : "text-green-300"
                      }
                    >
                      {isLoading ? "🔄 Checking road..." : "⏸️ Idle"}
                    </span>
                  </div>
                  {data && (
                    <div className="rounded border border-red-500/50 bg-red-900/30 p-3 text-red-200">
                      {data}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-6">
                <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-400">
                  <Clock className="h-5 w-5" />
                  Actors' Performance Quality
                </h4>
                <div className="space-y-3">
                  <div
                    className={`rounded p-2 ${pollCount > 0 ? "bg-red-900/20 text-red-300" : "bg-amber-900/20 text-amber-300"}`}
                  >
                    {pollCount > 0
                      ? "❌ Fragmented, constantly interrupted"
                      : "✅ Rich, immersive dialogue"}
                  </div>
                  <div
                    className={`rounded p-2 ${leakedIntervals > 0 ? "bg-red-900/20 text-red-300" : "bg-amber-900/20 text-amber-300"}`}
                  >
                    {leakedIntervals > 0
                      ? "❌ Exhausted, memory leaking"
                      : "✅ Energetic, focused"}
                  </div>
                  <div
                    className={`rounded p-2 ${data?.includes("Pozzo") ? "bg-red-900/20 text-red-300" : "bg-amber-900/20 text-amber-300"}`}
                  >
                    {data?.includes("Pozzo")
                      ? "❌ Audience confused by false alarm"
                      : "✅ Audience engaged"}
                  </div>
                </div>
              </div>
            </div>

            <CodeComparison
              badCode={imperativeCode}
              goodCode={declarativeCode}
              language="tsx"
              themeColor="amber"
              badLabel="❌ Imperative Anti-pattern"
              goodLabel="✅ Declarative Solution"
              badExplanation="Manual polling creates side effects, memory leaks, and complex state management."
              goodExplanation="Suspense handles the loading state declaratively, keeping the component logic clean."
            />
          </div>
        );

      case 2: // Chapter 3: The Suspense Curtain
        return (
          <div className="space-y-6">
            <div className="mb-6 flex flex-wrap gap-4">
              <button
                onClick={triggerSuspenseDemo}
                className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
              >
                <Play className="h-4 w-4" />
                Start Declarative Performance
              </button>
              <button
                onClick={() => setSimulateError(!simulateError)}
                className={`px-4 py-2 ${simulateError ? "bg-red-600 hover:bg-red-700" : "bg-slate-700 hover:bg-slate-600"} rounded-lg text-white`}
              >
                {simulateError ? "✅ Simulate Success" : "❌ Simulate Error"}
              </button>
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-amber-900/10 p-8">
              <div className="mb-8 text-center">
                <Theater className="mx-auto mb-3 h-12 w-12 text-amber-400" />
                <h3 className="text-xl font-bold text-amber-300">
                  The Suspense Curtain
                </h3>
                <p className="text-amber-400/70">
                  Declarative boundary handles transitions
                </p>
              </div>

              <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-amber-500/40 p-6">
                <Suspense
                  fallback={
                    <div className="space-y-4 text-center">
                      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-amber-500/30 border-t-amber-400" />
                      <div className="space-y-2">
                        <p className="text-lg text-amber-300">
                          🎭 The Actors Perform
                        </p>
                        <p className="text-amber-400/70">
                          "We don't watch the road anymore..."
                        </p>
                        <div className="mt-4 flex justify-center gap-4">
                          <div className="rounded bg-amber-900/30 p-2 text-amber-200">
                            👒 Hat-swapping
                          </div>
                          <div className="rounded bg-amber-900/30 p-2 text-amber-200">
                            🥕 Carrot debate
                          </div>
                          <div className="rounded bg-amber-900/30 p-2 text-amber-200">
                            🌳 Tree contemplation
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                >
                  <LazyGodot />
                </Suspense>
              </div>
            </div>

            <CodeComparison
              badCode={declarativeCode}
              goodCode={errorBoundaryCode}
              language="tsx"
              themeColor="amber"
              badLabel="Basic Suspense"
              goodLabel="Resilient Suspense"
              badExplanation="Handles loading states perfectly, but if the network fails, the whole app crashes."
              goodExplanation="Wraps the Suspense boundary in an Error Boundary to catch network failures gracefully."
            />
          </div>
        );

      case 3: // Chapter 4: Two Acts, Two Worlds
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="mb-2 text-2xl font-bold text-amber-300">
                Side-by-Side Comparison
              </h3>
              <p className="text-amber-400/70">
                The same wait, two different experiences
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Imperative Column */}
              <div className="rounded-xl border border-red-500/30 bg-gradient-to-br from-red-950/20 to-red-900/10 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="text-xl font-bold text-red-300">
                    Act I: Imperative
                  </h4>
                  <div className="rounded-full bg-red-900/50 px-3 py-1 text-sm text-red-300">
                    The Burden
                  </div>
                </div>

                <div className="mb-6 space-y-4 text-red-200">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                    <span>Constant road-checking (polling)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                    <span>Jarring false alarms (Pozzo)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                    <span>Exhausted, fragmented performance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />
                    <span>Memory leaks accumulate</span>
                  </div>
                </div>

                <div className="rounded-lg border border-red-500/20 bg-red-900/20 p-4">
                  <p className="text-center text-red-300 italic">
                    "In the first act, we{" "}
                    <span className="font-bold">performed the waiting</span>."
                  </p>
                </div>
              </div>

              {/* Declarative Column */}
              <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-amber-900/10 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h4 className="text-xl font-bold text-amber-300">
                    Act II: Declarative
                  </h4>
                  <div className="rounded-full bg-amber-900/50 px-3 py-1 text-sm text-amber-300">
                    The Trust
                  </div>
                </div>

                <div className="mb-6 space-y-4 text-amber-200">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
                    <span>Suspense boundary handles transitions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
                    <span>Seamless reveals (curtain rises)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
                    <span>Immersive, uninterrupted performance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
                    <span>Automatic cleanup and error handling</span>
                  </div>
                </div>

                <div className="rounded-lg border border-amber-500/20 bg-amber-900/20 p-4">
                  <p className="text-center text-amber-300 italic">
                    "In the second, we{" "}
                    <span className="font-bold">simply performed</span>."
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-amber-500/20 pt-6 text-center">
              <p className="text-lg font-semibold text-amber-300">
                The Difference?
              </p>
              <p className="mt-2 text-amber-400/70">
                Imperative:{" "}
                <span className="text-red-300">You manage the state</span> •
                Declarative:{" "}
                <span className="text-amber-300">React manages the state</span>
              </p>
            </div>
          </div>
        );

      case 4: // Chapter 5: The Art of Being
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="mb-6 inline-block rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-900/30 to-amber-800/20 p-4">
                <CheckCircle className="mx-auto h-16 w-16 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-amber-300">
                Mastery Achieved
              </h3>
              <p className="text-amber-400/70">
                Trusting the structure to handle uncertainty
              </p>
            </div>

            <div className="mx-auto max-w-2xl">
              <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-950/30 to-amber-900/20 p-8">
                <div className="space-y-6 text-center">
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-amber-300">
                      Final Playbill
                    </p>
                    <div className="rounded-lg border border-amber-500/20 bg-amber-950/50 p-6">
                      <p className="mb-2 text-2xl font-bold text-amber-300">
                        WAITING FOR GODOT
                      </p>
                      <p className="mb-4 text-amber-400">
                        A Play by Vladimir & Estragon
                      </p>
                      <div className="border-t border-amber-500/20 pt-4">
                        <p className="text-sm text-amber-400/70 italic">
                          *Please Note: The transition between states of being
                          is managed by the Theatre.*
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-3">
                    <div className="rounded-lg bg-amber-900/20 p-4">
                      <p className="text-sm text-amber-400/70">Performance</p>
                      <p className="font-semibold text-amber-300">Immersive</p>
                    </div>
                    <div className="rounded-lg bg-amber-900/20 p-4">
                      <p className="text-sm text-amber-400/70">Transitions</p>
                      <p className="font-semibold text-amber-300">Seamless</p>
                    </div>
                    <div className="rounded-lg bg-amber-900/20 p-4">
                      <p className="text-sm text-amber-400/70">Mental Load</p>
                      <p className="font-semibold text-amber-300">Minimal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              code={`// The complete declarative pattern
function GodotPlay() {
  return (
    <ErrorBoundary
      fallback={<TheaterError />}
    >
      <Suspense
        fallback={
          <TheaterFallback
            message="🎭 The actors perform while waiting..."
            activities={['Hat-swapping', 'Carrot debates', 'Tree contemplation']}
          />
        }
      >
        <LazyGodot
          delay={2000}
          onArrival={() => console.log('Godot arrived!')}
        />
        <OtherAsyncComponents />
      </Suspense>
    </ErrorBoundary>
  );
}`}
              language="tsx"
              title="// ✅ Complete Declarative Implementation"
              defaultExpanded={true}
            />

            <div className="pt-6 text-center">
              <p className="text-lg text-amber-300 italic">
                "We don't watch the road anymore. We trust the stage."
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Clock}
        title="Waiting for Godot"
        subtitle="Suspense • Vladimir & Estragon • 1953"
        concept="Declarative Async State"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-100">
                  <Theater className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">
                      Waiting/Polling
                    </span>
                    <span className="text-sm font-medium text-amber-200">
                      Imperative State
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Godot</span>
                    <span className="text-sm font-medium text-amber-200">
                      Async Data
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Curtain</span>
                    <span className="text-sm font-medium text-amber-200">
                      Suspense Boundary
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Director</span>
                    <span className="text-sm font-medium text-amber-200">
                      React Framework
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Insight */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 &&
                    "Fallback UIs maintain engagement while data loads."}
                  {chapter === 1 &&
                    "Manual state checking creates complexity and bugs."}
                  {chapter === 2 &&
                    "Suspense boundaries handle loading states declaratively."}
                  {chapter === 3 &&
                    "Declarative code shifts the burden from developer to framework."}
                  {chapter === 4 &&
                    "Trusting the framework simplifies the mental model."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm text-slate-400 italic">
                  {chapter === 0 &&
                    '"We are waiting for Godot. What else is there to do?"'}
                  {chapter === 1 &&
                    '"Stop talking about carrots! Is he on the road yet?"'}
                  {chapter === 2 && '"The stage will hold the wait for us."'}
                  {chapter === 3 &&
                    '"In the first act, we performed the waiting."'}
                  {chapter === 4 &&
                    '"We don\'t watch the road anymore. We trust the stage."'}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Vladimir & Estragon
                </p>
              </div>

              {/* Safety Note */}
              <div className="rounded-xl border border-amber-500/10 bg-slate-900/30 p-4">
                <div className="flex items-center gap-2 text-xs text-amber-400/60">
                  <AlertCircle className="h-3 w-3" />
                  <span>
                    Safety: Circuit breakers prevent infinite loops. Max 5
                    leaked intervals before auto-reset.
                  </span>
                </div>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-amber-100 sm:text-3xl">
              {currentChapter.title}
            </h2>
            <div className="mb-4 flex items-center gap-2 text-sm text-amber-400/70">
              <span>Emotional arc:</span>
              <span className="font-medium">{currentChapter.emotionalArc}</span>
            </div>
            <div className="space-y-4 leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6 backdrop-blur-sm sm:mb-12 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Interactive Stage
              </h3>
            </div>
            {renderChapterDemo()}
          </section>

          {/* Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="amber"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}