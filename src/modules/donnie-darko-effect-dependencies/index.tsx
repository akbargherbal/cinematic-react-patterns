import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  GitBranch,
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface DemoState {
  userIdDemo: {
    userId: number;
    user: { id: number; name: string } | null;
    loading: boolean;
  };
  timerDemo: {
    count: number;
    running: boolean;
  };
  raceDemo: {
    userId: number;
    fetches: Array<{ id: number; status: string; timestamp: number }>;
    currentUser: { id: number; name: string } | null;
  };
}

export default function DonnieDarkoEffectDependencies() {
  const [chapter, setChapter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(28);
  const [demoState, setDemoState] = useState<DemoState>({
    userIdDemo: { userId: 1, user: null, loading: false },
    timerDemo: { count: 0, running: false },
    raceDemo: { userId: 1, fetches: [], currentUser: null },
  });

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "The Artifact Appears",
        content: `October 2, 1988. 28 days, 6 hours, 42 minutes, 12 seconds. That's when the world ends.

Donnie Darko wakes up on a golf course in his pajamas, no memory of how he got there. When he returns home, a jet engine has crashed through his bedroom ceiling. If he'd been asleep in his bed, he'd be dead. Something—or someone—saved him.

That night, Frank appears. A six-foot rabbit with a grotesque metal mask, eyes like empty sockets. "Wake up, Donnie," Frank says, his voice distorted and hollow. Frank tells Donnie the world will end in 28 days. Frank tells him to do things. Burn down buildings. Flood the school. Frank is always watching, always counting down.

What Donnie doesn't know yet: he's living in a tangent universe. A corrupted timeline that shouldn't exist. The jet engine is an artifact—a glitch in reality. And Frank? Frank is trying to show Donnie what he's watching, what he needs to pay attention to. But Donnie is watching the wrong things.`,
      },
      {
        id: "build",
        title: "Watching the Wrong Things",
        content: `Donnie starts following Frank's instructions. He floods the school by breaking a water main, forcing it to close. He burns down Jim Cunningham's house, exposing a child pornography dungeon. He's doing things, taking action, but he doesn't understand why. He's reacting to Frank, to the engine, to the surface-level artifacts of the tangent universe.

Meanwhile, reality is glitching. Donnie sees things others don't—liquid spears emerging from people's chests, showing the path they'll walk in the next few seconds. Time feels wrong. His girlfriend Gretchen is drawn into his orbit, but she's confused, scared. "What's happening to you?" she asks. Donnie can't explain. He's trapped in a loop, watching the wrong things, and everyone around him is suffering the consequences.`,
      },
      {
        id: "climax",
        title: "Reality Unravels",
        content: `October 30, 1988. The tangent universe is collapsing.

Donnie and Gretchen go to Grandma Death's house on Halloween night, trying to understand what's happening. But they're attacked by bullies. Gretchen is thrown into the road. A car—driven by Frank, the real Frank, a teenager in a rabbit costume—runs her over. She dies in Donnie's arms.

Donnie shoots Frank. Kills him. But it doesn't matter. The tangent universe is still collapsing. The wormhole opens above Donnie's house, a swirling vortex in the sky. The jet engine—the artifact that started it all—is pulled through time, back to October 2nd. Back to the beginning.`,
      },
      {
        id: "resolution",
        title: "Frank Reveals the Truth",
        content: `Donnie lies in bed, waiting. The wormhole swirls above his house. The jet engine is falling through time, pulled back to October 2nd. In moments, it will crash through his ceiling.

This time, he doesn't sleepwalk away. This time, he stays. He understands now.

Frank's voice echoes in his mind: "Every living creature on Earth dies alone." But that's not quite right. Donnie isn't alone. He's connected to everyone in the tangent universe—his family, Gretchen, Frank himself. His death will save them all, will restore the primary universe, will close the loop.`,
      },
      {
        id: "summary",
        title: "The Primary Universe Restored",
        content: `October 2, 1988. Morning.

Donnie's mother wakes up. She's crying, but she doesn't know why. Donnie's sister asks, "What's wrong?" Their mother can't explain. Just a dream. Just a feeling.

Gretchen rides her bike past Donnie's house. She sees the fire trucks, the police cars, the jet engine being hauled away. She waves to Donnie's mother. They've never met, but somehow it feels right. Donnie's mother waves back.

Frank drives by in his red Trans Am, touches his eye. It hurts, but there's no wound. Just a phantom pain from a timeline that no longer exists.`,
      },
    ],
    [],
  );

  const currentChapter = chapters[chapter];

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = useCallback(() => {
    setChapter((c) => Math.max(0, c - 1));
  }, []);

  const handleNext = useCallback(() => {
    setChapter((c) => Math.min(chapters.length - 1, c + 1));
  }, [chapters.length]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-100 md:text-4xl">
                Donnie Darko: Effect Dependencies
              </h1>
              <p className="mt-2 text-sm text-slate-400 md:text-base">
                Middlesex, Virginia • October 1988
              </p>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{timeLeft} days</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-slate-100 md:text-3xl">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>

        {/* Chapter Content */}
        <div className="prose prose-invert prose-slate mb-12 max-w-none">
          {currentChapter.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="mb-4 leading-relaxed text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Interactive Demonstrations */}
        {chapter === 0 && <IntroDemo />}
        {chapter === 1 && (
          <WrongDependenciesDemo
            demoState={demoState}
            setDemoState={setDemoState}
          />
        )}
        {chapter === 2 && (
          <StaleClosureDemo demoState={demoState} setDemoState={setDemoState} />
        )}
        {chapter === 3 && (
          <CleanupDemo demoState={demoState} setDemoState={setDemoState} />
        )}
        {chapter === 4 && <UniverseComparisonDemo />}
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="rounded-lg bg-slate-800 px-4 py-2 text-slate-300 transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 md:px-6"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === chapter
                      ? "w-8 bg-blue-400"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-30 md:px-6"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Chapter 1: Intro Demo - Dependency Array Visualizer
function IntroDemo() {
  const [renderCount, setRenderCount] = useState(0);
  const [effectMode, setEffectMode] = useState<"empty" | "deps" | "none">(
    "deps",
  );
  const [effectRuns, setEffectRuns] = useState<number[]>([]);

  useEffect(
    () => {
      if (effectMode === "empty") {
        setEffectRuns([0]);
      } else if (effectMode === "deps") {
        setEffectRuns((prev) => [...prev, renderCount]);
      } else if (effectMode === "none") {
        setEffectRuns((prev) => [...prev, renderCount]);
      }
    },
    effectMode === "empty"
      ? []
      : effectMode === "deps"
        ? [renderCount]
        : undefined,
  );

  const triggerRender = () => setRenderCount((c) => c + 1);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-blue-400" />
        <h3 className="text-xl font-bold text-slate-100">
          Dependency Array Visualizer
        </h3>
      </div>

      <p className="mb-6 text-slate-400">
        In React, your component is a universe. Every render creates a snapshot
        of reality. The dependency array tells useEffect when to run again.
      </p>

      {/* Mode Selection */}
      <div className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <button
          onClick={() => {
            setEffectMode("empty");
            setEffectRuns([]);
            setRenderCount(0);
          }}
          className={`rounded-lg border-2 p-4 transition-all ${
            effectMode === "empty"
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <code className="text-sm text-blue-400">useEffect(fn, [])</code>
          <p className="mt-2 text-xs text-slate-400">Runs once on mount</p>
        </button>

        <button
          onClick={() => {
            setEffectMode("deps");
            setEffectRuns([]);
            setRenderCount(0);
          }}
          className={`rounded-lg border-2 p-4 transition-all ${
            effectMode === "deps"
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <code className="text-sm text-emerald-400">
            useEffect(fn, [count])
          </code>
          <p className="mt-2 text-xs text-slate-400">Runs when count changes</p>
        </button>

        <button
          onClick={() => {
            setEffectMode("none");
            setEffectRuns([]);
            setRenderCount(0);
          }}
          className={`rounded-lg border-2 p-4 transition-all ${
            effectMode === "none"
              ? "border-red-500 bg-red-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <code className="text-sm text-red-400">useEffect(fn)</code>
          <p className="mt-2 text-xs text-slate-400">Runs after every render</p>
        </button>
      </div>

      {/* Trigger Render Button */}
      <button
        onClick={triggerRender}
        className="mb-6 w-full rounded-lg bg-slate-800 py-3 text-slate-200 transition-all hover:bg-slate-700"
      >
        Trigger Re-render (Count: {renderCount})
      </button>

      {/* Timeline Visualization */}
      <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
        <p className="mb-3 text-sm text-slate-400">
          Effect Execution Timeline:
        </p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: renderCount + 1 }).map((_, idx) => {
            const effectRan = effectRuns.includes(idx);
            return (
              <div
                key={idx}
                className={`rounded px-3 py-2 font-mono text-sm ${
                  effectRan
                    ? "border border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                    : "border border-slate-700 bg-slate-800 text-slate-500"
                }`}
              >
                R{idx}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          R = Render, Green = Effect Executed
        </p>
      </div>
    </div>
  );
}

// Chapter 2: Wrong Dependencies Demo
function WrongDependenciesDemo({
  demoState,
  setDemoState,
}: {
  demoState: DemoState;
  setDemoState: React.Dispatch<React.SetStateAction<DemoState>>;
}) {
  const [wrongUserId, setWrongUserId] = useState(1);
  const [wrongUser, setWrongUser] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [correctUserId, setCorrectUserId] = useState(1);
  const [correctUser, setCorrectUser] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // Wrong: Missing dependency
  useEffect(() => {
    const fakeUser = { id: wrongUserId, name: `User ${wrongUserId}` };
    setTimeout(() => setWrongUser(fakeUser), 300);
  }, []); // ❌ Missing wrongUserId

  // Correct: Includes dependency
  useEffect(() => {
    const fakeUser = { id: correctUserId, name: `User ${correctUserId}` };
    setTimeout(() => setCorrectUser(fakeUser), 300);
  }, [correctUserId]); // ✅ Includes correctUserId

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-red-400" />
        <h3 className="text-xl font-bold text-slate-100">
          Watching the Wrong Things
        </h3>
      </div>

      <p className="mb-6 text-slate-400">
        When your effect reads a value but doesn't include it in dependencies,
        you create a tangent universe—a corrupted timeline where reality
        diverges.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Wrong Dependencies */}
        <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <h4 className="font-bold text-red-400">Tangent Universe</h4>
          </div>

          <pre className="mb-4 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-3 text-xs">
            <code className="text-slate-300">
              {`useEffect(() => {
  fetchUser(userId);
}, []); // ❌ Missing userId`}
            </code>
          </pre>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-slate-400">
                User ID:
              </label>
              <input
                type="number"
                value={wrongUserId}
                onChange={(e) => setWrongUserId(Number(e.target.value))}
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200"
              />
            </div>
            <div className="rounded border border-slate-800 bg-slate-950 p-3">
              <p className="text-sm text-slate-400">Fetched User:</p>
              <p className="font-mono text-slate-200">
                {wrongUser ? wrongUser.name : "Loading..."}
              </p>
              <p className="mt-2 text-xs text-red-400">
                ⚠️ Always shows User 1 (stale closure)
              </p>
            </div>
          </div>
        </div>

        {/* Correct Dependencies */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <h4 className="font-bold text-emerald-400">Primary Universe</h4>
          </div>

          <pre className="mb-4 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-3 text-xs">
            <code className="text-slate-300">
              {`useEffect(() => {
  fetchUser(userId);
}, [userId]); // ✅ Includes userId`}
            </code>
          </pre>

          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm text-slate-400">
                User ID:
              </label>
              <input
                type="number"
                value={correctUserId}
                onChange={(e) => setCorrectUserId(Number(e.target.value))}
                className="w-full rounded border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200"
              />
            </div>
            <div className="rounded border border-slate-800 bg-slate-950 p-3">
              <p className="text-sm text-slate-400">Fetched User:</p>
              <p className="font-mono text-slate-200">
                {correctUser ? correctUser.name : "Loading..."}
              </p>
              <p className="mt-2 text-xs text-emerald-400">
                ✓ Updates when userId changes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Chapter 3: Stale Closure Demo
function StaleClosureDemo({
  demoState,
  setDemoState,
}: {
  demoState: DemoState;
  setDemoState: React.Dispatch<React.SetStateAction<DemoState>>;
}) {
  const [count, setCount] = useState(0);
  const [staleLog, setStaleLog] = useState<string[]>([]);
  const [freshLog, setFreshLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  // Stale closure: captures initial count
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setStaleLog((prev) => [...prev, `Count: ${count}`].slice(-5));
    }, 1000);

    return () => clearInterval(interval);
  }, [running]); // ❌ Missing count dependency

  // Fresh closure: uses updater function
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setFreshLog((prev) => [...prev, `Count: ${count}`].slice(-5));
    }, 1000);

    return () => clearInterval(interval);
  }, [running, count]); // ✅ Includes count

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  const toggleRunning = () => {
    setRunning(!running);
    if (running) {
      setCount(0);
      setStaleLog([]);
      setFreshLog([]);
    }
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-purple-400" />
        <h3 className="text-xl font-bold text-slate-100">
          Reality Unravels: Stale Closures
        </h3>
      </div>

      <p className="mb-6 text-slate-400">
        When your effect captures values from an old render, it operates on
        outdated data. The component "reality" becomes unpredictable—like Donnie
        stuck on October 2nd.
      </p>

      <div className="mb-6 rounded-lg border border-slate-800 bg-slate-950 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-100">{count}</p>
            <p className="text-sm text-slate-400">Current Count</p>
          </div>
          <button
            onClick={toggleRunning}
            className={`rounded-lg px-6 py-2 transition-all ${
              running
                ? "bg-red-600 text-white hover:bg-red-500"
                : "bg-blue-600 text-white hover:bg-blue-500"
            }`}
          >
            {running ? "Stop" : "Start"} Counter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Stale Closure */}
        <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <h4 className="font-bold text-red-400">Stale Closure</h4>
          </div>

          <pre className="mb-4 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-3 text-xs">
            <code className="text-slate-300">
              {`useEffect(() => {
  const interval = setInterval(() => {
    log(\`Count: \${count}\`);
  }, 1000);
  return () => clearInterval(interval);
}, []); // ❌ Missing count`}
            </code>
          </pre>

          <div className="min-h-[120px] rounded border border-slate-800 bg-slate-950 p-3">
            <p className="mb-2 text-xs text-slate-500">Console Output:</p>
            {staleLog.map((log, idx) => (
              <p key={idx} className="font-mono text-xs text-red-400">
                {log} <span className="text-slate-600">(always 0)</span>
              </p>
            ))}
          </div>
        </div>

        {/* Fresh Closure */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <h4 className="font-bold text-emerald-400">Fresh Closure</h4>
          </div>

          <pre className="mb-4 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-3 text-xs">
            <code className="text-slate-300">
              {`useEffect(() => {
  const interval = setInterval(() => {
    log(\`Count: \${count}\`);
  }, 1000);
  return () => clearInterval(interval);
}, [count]); // ✅ Includes count`}
            </code>
          </pre>

          <div className="min-h-[120px] rounded border border-slate-800 bg-slate-950 p-3">
            <p className="mb-2 text-xs text-slate-500">Console Output:</p>
            {freshLog.map((log, idx) => (
              <p key={idx} className="font-mono text-xs text-emerald-400">
                {log} <span className="text-slate-600">(current value)</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Chapter 4: Cleanup Demo
function CleanupDemo({
  demoState,
  setDemoState,
}: {
  demoState: DemoState;
  setDemoState: React.Dispatch<React.SetStateAction<DemoState>>;
}) {
  const [userId, setUserId] = useState(1);
  const [withoutCleanup, setWithoutCleanup] = useState<{
    fetches: Array<{ id: number; status: string }>;
    currentUser: string;
  }>({ fetches: [], currentUser: "" });
  const [withCleanup, setWithCleanup] = useState<{
    fetches: Array<{ id: number; status: string }>;
    currentUser: string;
  }>({ fetches: [], currentUser: "" });

  // Without cleanup - race condition
  useEffect(() => {
    setWithoutCleanup((prev) => ({
      ...prev,
      fetches: [...prev.fetches, { id: userId, status: "fetching" }],
    }));

    setTimeout(
      () => {
        setWithoutCleanup((prev) => ({
          fetches: prev.fetches.map((f) =>
            f.id === userId && f.status === "fetching"
              ? { ...f, status: "complete" }
              : f,
          ),
          currentUser: `User ${userId}`,
        }));
      },
      1000 + Math.random() * 1000,
    );
  }, [userId]);

  // With cleanup - no race condition
  useEffect(() => {
    let cancelled = false;

    setWithCleanup((prev) => ({
      ...prev,
      fetches: [...prev.fetches, { id: userId, status: "fetching" }],
    }));

    setTimeout(
      () => {
        if (!cancelled) {
          setWithCleanup((prev) => ({
            fetches: prev.fetches.map((f) =>
              f.id === userId && f.status === "fetching"
                ? { ...f, status: "complete" }
                : f,
            ),
            currentUser: `User ${userId}`,
          }));
        } else {
          setWithCleanup((prev) => ({
            ...prev,
            fetches: prev.fetches.map((f) =>
              f.id === userId && f.status === "fetching"
                ? { ...f, status: "cancelled" }
                : f,
            ),
          }));
        }
      },
      1000 + Math.random() * 1000,
    );

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const changeUser = () => {
    setUserId((id) => (id % 5) + 1);
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <CheckCircle className="h-5 w-5 text-blue-400" />
        <h3 className="text-xl font-bold text-slate-100">
          Cleanup Functions: Closing the Loop
        </h3>
      </div>

      <p className="mb-6 text-slate-400">
        The cleanup function is Donnie's sacrifice—it "undoes" the previous
        effect before the new one runs, preventing race conditions and stale
        data.
      </p>

      <div className="mb-6">
        <button
          onClick={changeUser}
          className="w-full rounded-lg bg-blue-600 py-3 text-white transition-all hover:bg-blue-500"
        >
          Change User (Current: {userId})
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Without Cleanup */}
        <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
          <div className="mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <h4 className="font-bold text-red-400">Without Cleanup</h4>
          </div>

          <pre className="mb-4 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-3 text-xs">
            <code className="text-slate-300">
              {`useEffect(() => {
  fetchUser(userId)
    .then(setUser);
}, [userId]);
// ❌ No cleanup, race condition`}
            </code>
          </pre>

          <div className="mb-3 space-y-2">
            {withoutCleanup.fetches.slice(-5).map((fetch, idx) => (
              <div
                key={idx}
                className={`rounded px-3 py-2 font-mono text-xs ${
                  fetch.status === "fetching"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                User {fetch.id}: {fetch.status}
              </div>
            ))}
          </div>

          <div className="rounded border border-slate-800 bg-slate-950 p-3">
            <p className="text-sm text-slate-400">Current User:</p>
            <p className="font-mono text-slate-200">
              {withoutCleanup.currentUser}
            </p>
            <p className="mt-2 text-xs text-red-400">
              ⚠️ May show wrong user if fetches complete out of order
            </p>
          </div>
        </div>

        {/* With Cleanup */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-emerald-400" />
            <h4 className="font-bold text-emerald-400">With Cleanup</h4>
          </div>

          <pre className="mb-4 overflow-x-auto rounded border border-slate-800 bg-slate-950 p-3 text-xs">
            <code className="text-slate-300">
              {`useEffect(() => {
  let cancelled = false;
  fetchUser(userId)
    .then(data => {
      if (!cancelled) setUser(data);
    });
  return () => { cancelled = true; };
}, [userId]); // ✅ Cleanup prevents race`}
            </code>
          </pre>

          <div className="mb-3 space-y-2">
            {withCleanup.fetches.slice(-5).map((fetch, idx) => (
              <div
                key={idx}
                className={`rounded px-3 py-2 font-mono text-xs ${
                  fetch.status === "fetching"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : fetch.status === "cancelled"
                      ? "bg-slate-800 text-slate-600"
                      : "bg-emerald-500/20 text-emerald-400"
                }`}
              >
                User {fetch.id}: {fetch.status}
              </div>
            ))}
          </div>

          <div className="rounded border border-slate-800 bg-slate-950 p-3">
            <p className="text-sm text-slate-400">Current User:</p>
            <p className="font-mono text-slate-200">
              {withCleanup.currentUser}
            </p>
            <p className="mt-2 text-xs text-emerald-400">
              ✓ Always shows correct user, old fetches cancelled
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Chapter 5: Universe Comparison
function UniverseComparisonDemo() {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
      <div className="mb-4 flex items-center gap-2">
        <GitBranch className="h-5 w-5 text-purple-400" />
        <h3 className="text-xl font-bold text-slate-100">
          Two Universes: A Final Comparison
        </h3>
      </div>

      <p className="mb-6 text-slate-400">
        The tangent universe was a warning. A glimpse of what happens when you
        watch the wrong things. Here's the contrast between corrupted and stable
        timelines.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tangent Universe */}
        <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h4 className="text-lg font-bold text-red-400">Tangent Universe</h4>
          </div>

          <div className="space-y-4">
            <div className="rounded border border-slate-800 bg-slate-950 p-4">
              <p className="mb-2 font-mono text-sm text-red-400">
                ❌ Missing Dependencies
              </p>
              <pre className="overflow-x-auto text-xs text-slate-400">
                {`useEffect(() => {
  fetchUser(userId);
}, []); // userId not included`}
              </pre>
            </div>

            <div className="rounded border border-slate-800 bg-slate-950 p-4">
              <p className="mb-2 font-mono text-sm text-red-400">
                ❌ Irrelevant Dependencies
              </p>
              <pre className="overflow-x-auto text-xs text-slate-400">
                {`useEffect(() => {
  console.log(time);
}, [theme]); // theme is irrelevant`}
              </pre>
            </div>

            <div className="rounded border border-slate-800 bg-slate-950 p-4">
              <p className="mb-2 font-mono text-sm text-red-400">
                ❌ No Cleanup
              </p>
              <pre className="overflow-x-auto text-xs text-slate-400">
                {`useEffect(() => {
  const interval = setInterval(...);
  // No cleanup, memory leak
}, []);`}
              </pre>
            </div>

            <div className="rounded border border-slate-800 bg-slate-950 p-4">
              <p className="mb-2 font-mono text-sm text-red-400">
                ❌ Stale Closures
              </p>
              <pre className="overflow-x-auto text-xs text-slate-400">
                {`useEffect(() => {
  setTimeout(() => {
    console.log(count); // Always 0
  }, 1000);
}, []);`}
              </pre>
            </div>
          </div>

          <div className="mt-4 rounded border border-red-500/50 bg-red-950/30 p-3">
            <p className="text-sm text-red-300">
              <strong>Result:</strong> Reality unravels. Stale data, missed
              updates, race conditions, memory leaks. The component universe
              collapses.
            </p>
          </div>
        </div>

        {/* Primary Universe */}
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <h4 className="text-lg font-bold text-emerald-400">
              Primary Universe
            </h4>
          </div>

          <div className="space-y-4">
            <div className="rounded border border-slate-800 bg-slate-950 p-4">
              <p className="mb-2 font-mono text-sm text-emerald-400">
                ✅ Correct Dependencies
              </p>
              <pre className="overflow-x-auto text-xs text-slate-400">
                {`useEffect(() => {
  fetchUser(userId);
}, [userId]); // userId included`}
              </pre>
            </div>

            <div className="rounded border border-slate-800 bg-slate-950 p-4">
              <p className="mb-2 font-mono text-sm text-emerald-400">
                ✅ Relevant Dependencies Only
              </p>
              <pre className="overflow-x-auto text-xs text-slate-400">
                {`useEffect(() => {
  console.log(time);
}, [time]); // only time included`}
              </pre>
            </div>

            <div className="rounded border border-slate-800 bg-slate-950 p-4">
              <p className="mb-2 font-mono text-sm text-emerald-400">
                ✅ Proper Cleanup
              </p>
              <pre className="overflow-x-auto text-xs text-slate-400">
                {`useEffect(() => {
  const interval = setInterval(...);
  return () => clearInterval(interval);
}, []);`}
              </pre>
            </div>

            <div className="rounded border border-slate-800 bg-slate-950 p-4">
              <p className="mb-2 font-mono text-sm text-emerald-400">
                ✅ Fresh Closures
              </p>
              <pre className="overflow-x-auto text-xs text-slate-400">
                {`useEffect(() => {
  setTimeout(() => {
    console.log(count); // Current value
  }, 1000);
}, [count]);`}
              </pre>
            </div>
          </div>

          <div className="mt-4 rounded border border-emerald-500/50 bg-emerald-950/30 p-3">
            <p className="text-sm text-emerald-300">
              <strong>Result:</strong> Reality is stable. Effects run
              predictably, data stays synchronized, no memory leaks. The primary
              universe endures.
            </p>
          </div>
        </div>
      </div>

      {/* Rules Summary */}
      <div className="rounded-lg border border-blue-500/30 bg-slate-950 p-6">
        <h4 className="mb-4 text-lg font-bold text-blue-400">
          The Rules of Effect Dependencies
        </h4>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start gap-3">
            <span className="font-bold text-blue-400">1.</span>
            <span>
              <strong>
                Include every value from component scope that your effect reads.
              </strong>
              Props, state, derived values—if you read it, include it.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-blue-400">2.</span>
            <span>
              <strong>Don't include values your effect doesn't read.</strong>
              Irrelevant dependencies cause unnecessary re-runs.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-blue-400">3.</span>
            <span>
              <strong>Use cleanup functions to "undo" effects.</strong>
              Clear timers, cancel requests, remove listeners. Cleanup runs
              before the next effect.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-blue-400">4.</span>
            <span>
              <strong>Listen to ESLint warnings.</strong>
              The exhaustive-deps rule is Frank, warning you about wrong
              dependencies.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-blue-400">5.</span>
            <span>
              <strong>Consider splitting effects.</strong>
              One effect per concern makes dependencies easier to manage.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-bold text-blue-400">6.</span>
            <span>
              <strong>Use updater functions to avoid dependencies.</strong>{" "}
              <code>setState(prev =&gt; prev + 1)</code> doesn't need current
              state in dependencies.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
