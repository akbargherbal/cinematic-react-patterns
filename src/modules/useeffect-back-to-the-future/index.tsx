import { useState, useEffect, useRef, useCallback } from "react";
import {
  Zap,
  Clock,
  Camera,
  AlertCircle,
  CheckCircle,
  Play,
  RotateCcw,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function UseEffectBackToTheFuture(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [photoState, setPhotoState] = useState<"clear" | "fading" | "buggy">(
    "clear",
  );
  const [georgeCourage, setGeorgeCourage] = useState<number>(0);
  const [lorraineAffection, setLorraineAffection] = useState<number>(0);
  const [martyActions, setMartyActions] = useState<number>(0);
  const [effectRunCount, setEffectRunCount] = useState<number>(0);
  const [uncontrolledMode, setUncontrolledMode] = useState<boolean>(false);
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timeout | null>(null);
  const [demoMode, setDemoMode] = useState<"uncontrolled" | "controlled">(
    "uncontrolled",
  );

  const [timelineLog, setTimelineLog] = useState<string[]>([
    "1985: Timeline initialized",
  ]);
  const [timelineRef] = useAutoAnimate();

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Unintended Side Effect",
      content:
        "The world tears itself apart in a flash of blue-white light. Marty McFly crashes into 1955—a foreign element in this pastel world. He's outside the normal flow of time, like a useEffect that runs after the initial render. Doc Brown shows him the photograph: 'Whatever you do here has an effect... on that.' The photograph represents the component's UI—it will update when side effects change the state.",
    },
    {
      id: "build",
      title: "The Uncontrolled Ripple",
      content:
        "Marty acts on impulse, shoving George out of danger. He checks the photograph—Dave is fading! Panicked, he frantically intervenes constantly, trying to fix things. Each action causes the photo to flicker and shimmer. Doc diagnoses the problem: 'You're just randomly interacting with the timeline! Every little thing is causing a ripple!' This is the useEffect anti-pattern—running on every render without proper dependencies, creating chaos.",
    },
    {
      id: "climax",
      title: "The Dependency Array",
      content:
        "In Doc's garage, a revelation: 'We don't need to react to everything.' Doc draws a box: [George's Courage, Lorraine's Affection]. 'This is our dependency array! Our effect will only run when these specific values change.' At the Enchantment Under the Sea dance, George kisses Lorraine—the dependency is met. Marty's hand solidifies, the photograph clears. One precise execution, triggered by specific state changes.",
    },
    {
      id: "resolution",
      title: "The Controlled Timeline vs. The Chaotic Ripple",
      content:
        "Two approaches: The uncontrolled effect—constant, chaotic execution leading to flickering UI and wasted cycles. The dependency-driven effect—a single, precise execution triggered only when specific state changes. Doc explains: 'It's not about doing more, it's about doing the right thing at the right time. That's precision. That's control.'",
    },
    {
      id: "summary",
      title: "The Cleanup Function",
      content:
        "Marty checks the final photograph—not just fixed, but better. The side effect has improved the state. Doc shouts over the storm: 'Once you hit 88, the connection to this timeline is severed! The effect is done, and the past is sealed! This is the cleanup, Marty!' The lightning strikes, the DeLorean vanishes. The component unmounts, the cleanup function runs, preventing memory leaks (paradoxes).",
    },
  ];

  // Circuit breaker: Reset if too many timers leaked
  useEffect(() => {
    if (leakedTimers > 50) {
      resetLeakedTimers();
    }
  }, [leakedTimers]);

  // Chapter 1: Simple side effect (runs once)
  useEffect(() => {
    if (chapter === 0) {
      const timeout = setTimeout(() => {
        setTimelineLog((prev) => [
          ...prev,
          "1955: Time travel complete (initial effect ran)",
        ]);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [chapter]);

  // Chapter 2: Uncontrolled effect (runs on every render when active)
  useEffect(() => {
    if (chapter === 1 && uncontrolledMode) {
      // This effect has no dependencies, so it runs on every render
      setEffectRunCount((prev) => prev + 1);
      setTimelineLog((prev) => [
        ...prev,
        `Render ${effectRunCount + 1}: Uncontrolled effect ran`,
      ]);

      // Simulate photo degradation
      if (effectRunCount % 3 === 0 && effectRunCount > 0) {
        setPhotoState(effectRunCount > 10 ? "buggy" : "fading");
      }

      // Circuit breaker
      if (effectRunCount >= 20) {
        setUncontrolledMode(false);
        setTimelineLog((prev) => [
          ...prev,
          "Circuit breaker: Too many uncontrolled renders!",
        ]);
      }
    }
  });

  // Chapter 3: Controlled effect with dependencies
  useEffect(() => {
    if (chapter === 2) {
      // This effect only runs when dependencies change
      if (georgeCourage >= 10 && lorraineAffection >= 10) {
        setPhotoState("clear");
        setTimelineLog((prev) => [
          ...prev,
          "Dependency met: Effect triggered (the kiss!)",
        ]);
      }
    }
  }, [chapter, georgeCourage, lorraineAffection]);

  // Chapter 5: Cleanup demonstration
  useEffect(() => {
    if (chapter === 4 && activeTimer) {
      // The effect returns a cleanup function
      return () => {
        if (activeTimer) {
          clearInterval(activeTimer);
          setActiveTimer(null);
          setTimelineLog((prev) => [
            ...prev,
            "Cleanup: Timer cleared (paradox prevented)",
          ]);
        }
      };
    }
  }, [chapter, activeTimer]);

  const triggerUncontrolledEffect = useCallback(() => {
    setUncontrolledMode(true);
    setMartyActions((prev) => prev + 1);
  }, []);

  const startTimer = useCallback(() => {
    if (activeTimer) {
      clearInterval(activeTimer);
    }

    const timer = setInterval(() => {
      setTimelineLog((prev) => {
        const newLog = [
          ...prev,
          `Timer tick: ${new Date().toLocaleTimeString()}`,
        ];
        return newLog.slice(-10); // Keep last 10 entries
      });
    }, 1000);

    setActiveTimer(timer);

    if (demoMode === "uncontrolled") {
      setLeakedTimers((prev) => prev + 1);
    }
  }, [activeTimer, demoMode]);

  const resetLeakedTimers = useCallback(() => {
    if (activeTimer) {
      clearInterval(activeTimer);
      setActiveTimer(null);
    }
    setLeakedTimers(0);
    setTimelineLog((prev) => [...prev, "Reset: All timers cleaned up"]);
  }, [activeTimer]);

  const resetDemo = useCallback(() => {
    setPhotoState("clear");
    setGeorgeCourage(0);
    setLorraineAffection(0);
    setMartyActions(0);
    setEffectRunCount(0);
    setUncontrolledMode(false);
    setLeakedTimers(0);
    if (activeTimer) {
      clearInterval(activeTimer);
      setActiveTimer(null);
    }
    setTimelineLog(["1985: Timeline initialized"]);
  }, [activeTimer]);

  const currentChapter = chapters[chapter];

  // Code examples as template literals
  const noDepsCode = `// ❌ No dependency array - runs on EVERY render
useEffect(() => {
  console.log("Effect ran!");
  // This runs after every single render
  // Causes performance issues and bugs
});`;

  const emptyDepsCode = `// ✅ Empty dependency array - runs once
useEffect(() => {
  console.log("Effect ran on mount!");
  // This runs only once after initial render
  // Good for setup code
}, []);`;

  const withDepsCode = `// ✅ With dependencies - runs when deps change
useEffect(() => {
  fetchUserData(userId);
  // Only runs when userId changes
  // Precise control over execution
}, [userId]);`;

  const cleanupCode = `// ✅ With cleanup function
useEffect(() => {
  const timer = setInterval(() => {
    tick();
  }, 1000);

  // Cleanup function runs on unmount
  return () => {
    clearInterval(timer);
    // Prevents memory leaks
  };
}, []);`;

  const brokenCleanupCode = `// ❌ Missing cleanup - memory leak!
useEffect(() => {
  setInterval(() => {
    tick();
  }, 1000);
  // No cleanup = timer keeps running
  // even after component unmounts
}, []);`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 font-sans text-slate-300">
      <header className="border-b border-amber-500/30 bg-slate-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 flex-shrink-0 text-amber-400" />
              <div>
                <h1 className="text-2xl font-bold text-white md:text-3xl">
                  Back to the Future
                </h1>
                <p className="text-base font-medium text-amber-400 md:text-lg">
                  The useEffect Hook
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-400 md:text-base">
              1985 • Marty McFly • Time Travel
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Content - 8 columns on desktop */}
          <div className="space-y-8 lg:col-span-8">
            {/* Chapter Content */}
            <section className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white md:text-3xl">
                  {currentChapter.title}
                </h2>
                <span className="rounded-full bg-slate-700/50 px-3 py-1 text-center font-mono text-sm">
                  {chapter + 1}/5
                </span>
              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                <p className="mb-6 text-lg leading-relaxed text-slate-300">
                  {currentChapter.content}
                </p>

                {/* Memorable Quote */}
                <div className="my-6 border-l-4 border-amber-500/50 pl-4 text-slate-300 italic">
                  {chapter === 0 &&
                    "Whatever you do here, Marty, has an effect... on that."}
                  {chapter === 1 &&
                    "You're just randomly interacting with the timeline! Every little thing is causing a ripple!"}
                  {chapter === 2 &&
                    "We told time what to watch for. That's control, Marty."}
                  {chapter === 3 &&
                    "It's not about doing more, it's about doing the right thing at the right time."}
                  {chapter === 4 && "The timeline is set. No more paradoxes."}
                </div>
              </div>
            </section>

            {/* Interactive Demo Section */}
            <section className="rounded-xl border border-amber-500/20 bg-slate-800/20 p-6 md:p-8">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <Play className="h-5 w-5 text-amber-400" />
                Interactive Timeline
              </h3>

              {/* Chapter-specific demos */}
              {chapter === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-3">
                    <div className="space-y-4 md:col-span-1">
                      <h4 className="text-center font-semibold text-amber-300">
                        The Photograph (UI State)
                      </h4>
                      <div
                        className={`h-48 rounded-lg border-2 ${photoState === "clear" ? "border-green-500/50 bg-green-950/20" : photoState === "fading" ? "border-amber-500/50 bg-amber-950/20" : "border-red-500/50 bg-red-950/20"} flex items-center justify-center`}
                      >
                        <div className="text-center">
                          <Camera
                            className={`mx-auto mb-2 h-12 w-12 ${photoState === "clear" ? "text-green-400" : photoState === "fading" ? "text-amber-400" : "text-red-400"}`}
                          />
                          <p className="font-semibold">
                            {photoState === "clear" && "✓ Family photo clear"}
                            {photoState === "fading" && "⚠️ Siblings fading..."}
                            {photoState === "buggy" && "❌ Photo corrupted!"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 md:col-span-2">
                      <h4 className="text-center font-semibold text-amber-300">
                        Initial Side Effect
                      </h4>
                      <CodeBlock
                        code={`useEffect(() => {
  // This runs after initial render
  console.log("Arrived in 1955!");
  // Like Marty appearing in the past
}, []); // Empty array = run once`}
                        variant="success"
                        title="// ✅ Initial effect (mount)"
                        defaultExpanded={true}
                      />
                    </div>
                  </div>
                </div>
              )}

              {chapter === 1 && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-semibold text-amber-300">
                      Uncontrolled Effects
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={triggerUncontrolledEffect}
                        disabled={uncontrolledMode}
                        className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        🐛 Trigger Chaotic Action
                      </button>
                      <button
                        onClick={() => setUncontrolledMode(false)}
                        className="rounded-lg bg-slate-700 px-4 py-2 text-white transition-colors hover:bg-slate-600"
                      >
                        Stop Chaos
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <CodeBlock
                        code={noDepsCode}
                        variant="error"
                        title="// ❌ Common Mistake: Missing Dependency Array"
                        defaultExpanded={true}
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg bg-slate-900/50 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm text-slate-400">
                            Effect Runs:
                          </span>
                          <span className="font-mono text-red-400">
                            {effectRunCount}
                          </span>
                        </div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm text-slate-400">
                            Marty's Actions:
                          </span>
                          <span className="font-mono text-amber-400">
                            {martyActions}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">
                            Photo State:
                          </span>
                          <span
                            className={`font-mono ${photoState === "clear" ? "text-green-400" : photoState === "fading" ? "text-amber-400" : "text-red-400"}`}
                          >
                            {photoState.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="text-sm text-slate-400">
                        <AlertCircle className="mr-1 inline h-4 w-4" />
                        Each action triggers a re-render, which runs the effect
                        again
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {chapter === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <CodeBlock
                        code={withDepsCode}
                        variant="success"
                        title="// ✅ Controlled with Dependencies"
                        defaultExpanded={true}
                      />
                    </div>

                    <div className="space-y-6 md:col-span-1">
                      <div>
                        <h4 className="mb-3 font-semibold text-amber-300">
                          Dependency States
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <div className="mb-1 flex justify-between">
                              <span className="text-sm text-slate-400">
                                George's Courage
                              </span>
                              <span className="font-mono text-blue-400">
                                {georgeCourage}/10
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-700">
                              <div
                                className="h-2 rounded-full bg-blue-500 transition-all duration-300"
                                style={{
                                  width: `${(georgeCourage / 10) * 100}%`,
                                }}
                              />
                            </div>
                            <button
                              onClick={() =>
                                setGeorgeCourage((prev) =>
                                  Math.min(10, prev + 2),
                                )
                              }
                              className="mt-2 rounded bg-blue-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-700"
                            >
                              + Courage
                            </button>
                          </div>

                          <div>
                            <div className="mb-1 flex justify-between">
                              <span className="text-sm text-slate-400">
                                Lorraine's Affection
                              </span>
                              <span className="font-mono text-pink-400">
                                {lorraineAffection}/10
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-700">
                              <div
                                className="h-2 rounded-full bg-pink-500 transition-all duration-300"
                                style={{
                                  width: `${(lorraineAffection / 10) * 100}%`,
                                }}
                              />
                            </div>
                            <button
                              onClick={() =>
                                setLorraineAffection((prev) =>
                                  Math.min(10, prev + 2),
                                )
                              }
                              className="mt-2 rounded bg-pink-600 px-3 py-1 text-sm text-white transition-colors hover:bg-pink-700"
                            >
                              + Affection
                            </button>
                          </div>
                        </div>
                      </div>

                      {georgeCourage >= 10 && lorraineAffection >= 10 && (
                        <div className="rounded-lg border border-green-500/30 bg-green-900/30 p-4">
                          <div className="flex items-center gap-2 text-green-400">
                            <CheckCircle className="h-5 w-5" />
                            <span className="font-semibold">
                              Dependencies met! Effect triggered.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {chapter === 3 && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-semibold text-amber-300">
                      Comparison: Controlled vs. Chaotic
                    </h4>
                    <button
                      onClick={() =>
                        setDemoMode(
                          demoMode === "uncontrolled"
                            ? "controlled"
                            : "uncontrolled",
                        )
                      }
                      className="rounded-lg bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700"
                    >
                      {demoMode === "uncontrolled"
                        ? "✅ Show Controlled"
                        : "❌ Show Chaotic"}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div
                      className={`rounded-lg p-4 ${demoMode === "uncontrolled" ? "border border-red-500/30 bg-red-950/20" : "border border-slate-700 bg-slate-900/50"}`}
                    >
                      <h5 className="mb-3 flex items-center gap-2 font-semibold">
                        {demoMode === "uncontrolled" ? "❌ Chaotic" : "Chaotic"}{" "}
                        Approach
                      </h5>
                      <CodeBlock
                        code={noDepsCode}
                        variant={
                          demoMode === "uncontrolled" ? "error" : "default"
                        }
                        title={
                          demoMode === "uncontrolled"
                            ? "// ❌ Runs on every render"
                            : "// Without dependencies"
                        }
                        collapsible={true}
                        defaultExpanded={demoMode === "uncontrolled"}
                      />
                      <div className="mt-4 text-sm text-slate-400">
                        • Effect runs constantly
                        <br />
                        • Wastes performance
                        <br />• Causes race conditions
                      </div>
                    </div>

                    <div
                      className={`rounded-lg p-4 ${demoMode === "controlled" ? "border border-green-500/30 bg-green-950/20" : "border border-slate-700 bg-slate-900/50"}`}
                    >
                      <h5 className="mb-3 flex items-center gap-2 font-semibold">
                        {demoMode === "controlled"
                          ? "✅ Controlled"
                          : "Controlled"}{" "}
                        Approach
                      </h5>
                      <CodeBlock
                        code={withDepsCode}
                        variant={
                          demoMode === "controlled" ? "success" : "default"
                        }
                        title={
                          demoMode === "controlled"
                            ? "// ✅ Runs only when needed"
                            : "// With dependencies"
                        }
                        collapsible={true}
                        defaultExpanded={demoMode === "controlled"}
                      />
                      <div className="mt-4 text-sm text-slate-400">
                        • Effect runs precisely
                        <br />
                        • Optimized performance
                        <br />• Predictable behavior
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {chapter === 4 && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="font-semibold text-amber-300">
                      Cleanup Function
                    </h4>
                    <div className="flex gap-2">
                      <button
                        onClick={startTimer}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                      >
                        Start Timer
                      </button>
                      <button
                        onClick={resetLeakedTimers}
                        className="rounded-lg bg-slate-700 px-4 py-2 text-white transition-colors hover:bg-slate-600"
                      >
                        Cleanup
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <CodeBlock
                        code={cleanupCode}
                        variant="success"
                        title="// ✅ With Cleanup Function"
                        defaultExpanded={true}
                      />
                    </div>

                    <div>
                      <CodeBlock
                        code={brokenCleanupCode}
                        variant="error"
                        title="// ❌ Missing Cleanup (Memory Leak)"
                        collapsible={true}
                      />

                      <div className="mt-4 space-y-3">
                        <div className="rounded-lg bg-slate-900/50 p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-400">
                              Active Timer:
                            </span>
                            <span
                              className={`font-mono ${activeTimer ? "text-green-400" : "text-slate-500"}`}
                            >
                              {activeTimer ? "RUNNING" : "STOPPED"}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm text-slate-400">
                              Leaked Timers:
                            </span>
                            <span
                              className={`font-mono ${leakedTimers > 0 ? "text-red-400" : "text-slate-400"}`}
                            >
                              {leakedTimers}
                            </span>
                          </div>
                        </div>

                        {leakedTimers > 0 && (
                          <div className="text-sm text-red-400">
                            <AlertCircle className="mr-1 inline h-4 w-4" />
                            {leakedTimers} timer{leakedTimers !== 1 ? "s" : ""}{" "}
                            would leak without cleanup
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reset button for all chapters */}
              <div className="mt-6 border-t border-slate-700/50 pt-6">
                <button
                  onClick={resetDemo}
                  className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-white transition-colors hover:bg-slate-600"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset All Demos
                </button>
              </div>
            </section>

            {/* Navigation */}
            <nav className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <button
                onClick={() => setChapter(Math.max(0, chapter - 1))}
                disabled={chapter === 0}
                className="w-full rounded-lg bg-slate-800 px-6 py-3 text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
              >
                ← Previous Chapter
              </button>

              <div className="flex items-center gap-4">
                <div className="w-48 flex-1 sm:w-64">
                  <div className="h-2 w-full rounded-full bg-slate-700">
                    <div
                      className="h-2 rounded-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${((chapter + 1) / 5) * 100}%` }}
                    />
                  </div>
                  <div className="mt-1 text-center text-sm text-slate-400">
                    Progress: {Math.round(((chapter + 1) / 5) * 100)}%
                  </div>
                </div>

                <span className="hidden font-mono text-sm text-slate-400 sm:inline">
                  {chapter + 1}/5
                </span>
              </div>

              <button
                onClick={() =>
                  setChapter(Math.min(chapters.length - 1, chapter + 1))
                }
                disabled={chapter === chapters.length - 1}
                className="w-full rounded-lg bg-amber-600 px-6 py-3 text-white transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
              >
                Next Chapter →
              </button>
            </nav>
          </div>

          {/* Sidebar - 4 columns on desktop */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* Timeline Visualization */}
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-sm">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                  <Clock className="h-5 w-5 text-amber-400" />
                  Timeline Log
                </h3>

                <div
                  ref={timelineRef}
                  className="max-h-[300px] space-y-2 overflow-y-auto pr-2"
                >
                  {timelineLog.map((entry, index) => (
                    <div
                      key={index}
                      className="rounded border-l-2 border-amber-500/50 bg-slate-900/50 p-2 font-mono text-sm"
                    >
                      {entry}
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-xs text-slate-500">
                  Showing last {Math.min(timelineLog.length, 10)} of{" "}
                  {timelineLog.length} events
                </div>
              </div>

              {/* Key Concepts */}
              <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Key useEffect Concepts
                </h3>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                      <span className="text-xs font-bold text-amber-400">
                        1
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-amber-300">
                        Side Effects
                      </span>
                      <p className="text-sm text-slate-400">
                        Operations outside render cycle (API calls, timers, DOM
                        mutations)
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                      <span className="text-xs font-bold text-amber-400">
                        2
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-amber-300">
                        Dependency Array
                      </span>
                      <p className="text-sm text-slate-400">
                        Controls when effect runs: [] (mount), [dep] (when dep
                        changes), or omitted (every render)
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/20">
                      <span className="text-xs font-bold text-amber-400">
                        3
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-amber-300">
                        Cleanup Function
                      </span>
                      <p className="text-sm text-slate-400">
                        Return function from useEffect to clean up resources
                        (unmount or before re-run)
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
