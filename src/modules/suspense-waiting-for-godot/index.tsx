import { useState, useEffect, Suspense, lazy, ReactNode } from "react";
import {
  Clock,
  AlertCircle,
  CheckCircle,
  Play,
  Pause,
  RefreshCw,
  Theater,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  id: string;
  title: string;
  content: string;
  emotionalArc: string;
}

export default function SuspenseWaitingForGodot(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [mode, setMode] = useState<"imperative" | "declarative">("imperative");
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

  // Code examples as template literals
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

    // Note: We're NOT clearing this interval to demonstrate the leak
    // In a real app, we would: return () => clearInterval(interval);
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
                <h3 className="text-lg font-semibold">
                  The Fallback Performance
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded bg-amber-950/40 p-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-amber-400" />
                  <p>"We are waiting for Godot. What else is there to do?"</p>
                </div>
                <div className="flex items-center gap-3 rounded bg-amber-950/40 p-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-amber-400" />
                  <p>👒 Fiddling with hats and boots...</p>
                </div>
                <div className="flex items-center gap-3 rounded bg-amber-950/40 p-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-amber-400" />
                  <p>🥕 Discussing carrots vs. turnips...</p>
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
              variant="success"
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
                onClick={() =>
                  setMode(mode === "imperative" ? "declarative" : "imperative")
                }
                className="rounded-lg bg-amber-600 px-4 py-2 text-white hover:bg-amber-700"
              >
                {mode === "imperative"
                  ? "✅ Show Declarative Fix"
                  : "❌ Show Imperative Bug"}
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
                    <span>Poll Count:</span>
                    <span className="font-mono text-red-300">{pollCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Leaked Intervals:</span>
                    <span className="font-mono text-red-300">
                      {leakedIntervals}/5
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <span
                      className={
                        isLoading ? "text-amber-300" : "text-green-300"
                      }
                    >
                      {isLoading ? "🔄 Checking road..." : "⏸️ Idle"}
                    </span>
                  </div>
                  {data && (
                    <div className="rounded border border-red-500/50 bg-red-900/30 p-3">
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

            <CodeBlock
              code={mode === "imperative" ? imperativeCode : declarativeCode}
              variant={mode === "imperative" ? "error" : "success"}
              title={
                mode === "imperative"
                  ? "// ❌ Imperative Anti-pattern"
                  : "// ✅ Declarative Solution"
              }
              defaultExpanded={true}
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
                          <div className="rounded bg-amber-900/30 p-2">
                            👒 Hat-swapping
                          </div>
                          <div className="rounded bg-amber-900/30 p-2">
                            🥕 Carrot debate
                          </div>
                          <div className="rounded bg-amber-900/30 p-2">
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <CodeBlock
                code={declarativeCode}
                variant="success"
                title="// ✅ Suspense Implementation"
                defaultExpanded={true}
              />
              <CodeBlock
                code={errorBoundaryCode}
                variant="default"
                title="// 💡 Error Boundary for Resilience"
                defaultExpanded={true}
              />
            </div>
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

                <div className="mb-6 space-y-4">
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

                <div className="mb-6 space-y-4">
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
              variant="success"
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
    <div className="min-h-screen bg-gradient-to-b from-amber-950 via-slate-950 to-amber-950/30 font-serif text-amber-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-amber-500/20 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-amber-400" />
              <div>
                <h1 className="text-2xl font-bold text-amber-300 md:text-3xl">
                  Waiting for Godot
                </h1>
                <p className="text-sm text-amber-400/80 md:text-base">
                  Suspense • Vladimir & Estragon • 1953
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-amber-400/60">Theatre of React</p>
              <p className="text-base font-medium text-amber-400">
                Declarative Async State
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column - Content */}
          <div className="space-y-8 lg:col-span-7">
            {/* Chapter Content */}
            <div className="rounded-2xl border border-amber-500/20 bg-slate-900/40 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-amber-300 md:text-3xl">
                    {currentChapter.title}
                  </h2>
                  <span className="rounded-full bg-amber-900/30 px-3 py-1 text-sm text-amber-300">
                    Chapter {chapter + 1} of 5
                  </span>
                </div>
                <div className="mb-4 flex items-center gap-2 text-sm text-amber-400/70">
                  <span>Emotional arc:</span>
                  <span className="font-medium">
                    {currentChapter.emotionalArc}
                  </span>
                </div>
              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                <p className="leading-relaxed text-amber-100/90">
                  {currentChapter.content}
                </p>
              </div>
            </div>

            {/* Memorable Phrase */}
            <div className="rounded-r-lg border-l-4 border-amber-500 bg-gradient-to-r from-amber-900/20 to-amber-800/10 p-6">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-amber-400" />
                </div>
                <p className="text-lg text-amber-300 italic">
                  {chapter === 0 &&
                    "We are waiting for Godot. What else is there to do?"}
                  {chapter === 1 &&
                    "Stop talking about carrots! Is he on the road yet? Check again!"}
                  {chapter === 2 &&
                    "The stage will hold the wait for us. Our job is just to perform."}
                  {chapter === 3 &&
                    "In the first act, we performed the waiting. In the second, we simply performed."}
                  {chapter === 4 &&
                    "We don't watch the road anymore. We trust the stage."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Demo */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 backdrop-blur-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-xl font-bold text-amber-300">
                    <Theater className="h-5 w-5" />
                    Interactive Stage
                  </h3>
                  <div className="rounded-full bg-amber-900/30 px-3 py-1 text-sm text-amber-300">
                    {chapter === 0 && "The Fallback"}
                    {chapter === 1 && "The Anti-pattern"}
                    {chapter === 2 && "The Solution"}
                    {chapter === 3 && "Comparison"}
                    {chapter === 4 && "Mastery"}
                  </div>
                </div>

                <div className="space-y-6">{renderChapterDemo()}</div>

                {/* Safety Note */}
                <div className="mt-6 border-t border-amber-500/10 pt-4">
                  <div className="flex items-center gap-2 text-xs text-amber-400/60">
                    <AlertCircle className="h-3 w-3" />
                    <span>
                      Safety: Circuit breakers prevent infinite loops. Max 5
                      leaked intervals before auto-reset.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-12 border-t border-amber-500/20 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="w-full rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-900/50 to-amber-800/30 px-6 py-3 text-amber-300 transition-all duration-300 hover:border-amber-500 hover:from-amber-900/70 hover:to-amber-800/50 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
            >
              ← Previous Scene
            </button>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {chapters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChapter(idx)}
                    className={`h-3 w-3 rounded-full transition-all ${idx === chapter ? "bg-amber-400" : "bg-amber-400/30 hover:bg-amber-400/50"}`}
                    aria-label={`Go to chapter ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="font-mono text-sm text-amber-400/70">
                Scene {chapter + 1}/{chapters.length}
              </span>
            </div>

            <button
              onClick={() =>
                setChapter(Math.min(chapters.length - 1, chapter + 1))
              }
              disabled={chapter === chapters.length - 1}
              className="w-full rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-800/30 to-amber-900/50 px-6 py-3 text-amber-300 transition-all duration-300 hover:border-amber-500 hover:from-amber-800/50 hover:to-amber-900/70 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
            >
              Next Scene →
            </button>
          </div>
        </nav>
      </main>
    </div>
  );
}
