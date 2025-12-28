import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Clock, AlertTriangle, CheckCircle, Zap, GitBranch } from "lucide-react";

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
    []
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
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
                Donnie Darko: Effect Dependencies
              </h1>
              <p className="text-sm md:text-base text-slate-400 mt-2">
                Middlesex, Virginia • October 1988
              </p>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <Clock className="w-5 h-5" />
              <span className="text-lg font-mono">{timeLeft} days</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>

        {/* Chapter Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          {currentChapter.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="text-slate-300 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Interactive Demonstrations */}
        {chapter === 0 && <IntroDemo />}
        {chapter === 1 && <WrongDependenciesDemo demoState={demoState} setDemoState={setDemoState} />}
        {chapter === 2 && <StaleClosureDemo demoState={demoState} setDemoState={setDemoState} />}
        {chapter === 3 && <CleanupDemo demoState={demoState} setDemoState={setDemoState} />}
        {chapter === 4 && <UniverseComparisonDemo />}
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="px-4 md:px-6 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === chapter
                      ? "bg-blue-400 w-8"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
  const [effectMode, setEffectMode] = useState<"empty" | "deps" | "none">("deps");
  const [effectRuns, setEffectRuns] = useState<number[]>([]);

  useEffect(() => {
    if (effectMode === "empty") {
      setEffectRuns([0]);
    } else if (effectMode === "deps") {
      setEffectRuns((prev) => [...prev, renderCount]);
    } else if (effectMode === "none") {
      setEffectRuns((prev) => [...prev, renderCount]);
    }
  }, effectMode === "empty" ? [] : effectMode === "deps" ? [renderCount] : undefined);

  const triggerRender = () => setRenderCount((c) => c + 1);

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-bold text-slate-100">
          Dependency Array Visualizer
        </h3>
      </div>

      <p className="text-slate-400 mb-6">
        In React, your component is a universe. Every render creates a snapshot of reality.
        The dependency array tells useEffect when to run again.
      </p>

      {/* Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <button
          onClick={() => {
            setEffectMode("empty");
            setEffectRuns([]);
            setRenderCount(0);
          }}
          className={`p-4 rounded-lg border-2 transition-all ${
            effectMode === "empty"
              ? "border-blue-500 bg-blue-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <code className="text-sm text-blue-400">useEffect(fn, [])</code>
          <p className="text-xs text-slate-400 mt-2">Runs once on mount</p>
        </button>

        <button
          onClick={() => {
            setEffectMode("deps");
            setEffectRuns([]);
            setRenderCount(0);
          }}
          className={`p-4 rounded-lg border-2 transition-all ${
            effectMode === "deps"
              ? "border-emerald-500 bg-emerald-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <code className="text-sm text-emerald-400">useEffect(fn, [count])</code>
          <p className="text-xs text-slate-400 mt-2">Runs when count changes</p>
        </button>

        <button
          onClick={() => {
            setEffectMode("none");
            setEffectRuns([]);
            setRenderCount(0);
          }}
          className={`p-4 rounded-lg border-2 transition-all ${
            effectMode === "none"
              ? "border-red-500 bg-red-500/10"
              : "border-slate-700 hover:border-slate-600"
          }`}
        >
          <code className="text-sm text-red-400">useEffect(fn)</code>
          <p className="text-xs text-slate-400 mt-2">Runs after every render</p>
        </button>
      </div>

      {/* Trigger Render Button */}
      <button
        onClick={triggerRender}
        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-all mb-6"
      >
        Trigger Re-render (Count: {renderCount})
      </button>

      {/* Timeline Visualization */}
      <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
        <p className="text-sm text-slate-400 mb-3">Effect Execution Timeline:</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: renderCount + 1 }).map((_, idx) => {
            const effectRan = effectRuns.includes(idx);
            return (
              <div
                key={idx}
                className={`px-3 py-2 rounded text-sm font-mono ${
                  effectRan
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                    : "bg-slate-800 text-slate-500 border border-slate-700"
                }`}
              >
                R{idx}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-3">
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
  const [wrongUser, setWrongUser] = useState<{ id: number; name: string } | null>(null);
  const [correctUserId, setCorrectUserId] = useState(1);
  const [correctUser, setCorrectUser] = useState<{ id: number; name: string } | null>(null);

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
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-400" />
        <h3 className="text-xl font-bold text-slate-100">
          Watching the Wrong Things
        </h3>
      </div>

      <p className="text-slate-400 mb-6">
        When your effect reads a value but doesn't include it in dependencies,
        you create a tangent universe—a corrupted timeline where reality diverges.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wrong Dependencies */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h4 className="font-bold text-red-400">Tangent Universe</h4>
          </div>

          <pre className="bg-slate-950 p-3 rounded text-xs overflow-x-auto mb-4 border border-slate-800">
            <code className="text-slate-300">
              {`useEffect(() => {
  fetchUser(userId);
}, []); // ❌ Missing userId`}
            </code>
          </pre>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-400 block mb-1">User ID:</label>
              <input
                type="number"
                value={wrongUserId}
                onChange={(e) => setWrongUserId(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200"
              />
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800">
              <p className="text-sm text-slate-400">Fetched User:</p>
              <p className="text-slate-200 font-mono">
                {wrongUser ? wrongUser.name : "Loading..."}
              </p>
              <p className="text-xs text-red-400 mt-2">
                ⚠️ Always shows User 1 (stale closure)
              </p>
            </div>
          </div>
        </div>

        {/* Correct Dependencies */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-emerald-400">Primary Universe</h4>
          </div>

          <pre className="bg-slate-950 p-3 rounded text-xs overflow-x-auto mb-4 border border-slate-800">
            <code className="text-slate-300">
              {`useEffect(() => {
  fetchUser(userId);
}, [userId]); // ✅ Includes userId`}
            </code>
          </pre>

          <div className="space-y-3">
            <div>
              <label className="text-sm text-slate-400 block mb-1">User ID:</label>
              <input
                type="number"
                value={correctUserId}
                onChange={(e) => setCorrectUserId(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200"
              />
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800">
              <p className="text-sm text-slate-400">Fetched User:</p>
              <p className="text-slate-200 font-mono">
                {correctUser ? correctUser.name : "Loading..."}
              </p>
              <p className="text-xs text-emerald-400 mt-2">
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
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-bold text-slate-100">
          Reality Unravels: Stale Closures
        </h3>
      </div>

      <p className="text-slate-400 mb-6">
        When your effect captures values from an old render, it operates on outdated data.
        The component "reality" becomes unpredictable—like Donnie stuck on October 2nd.
      </p>

      <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-slate-100">{count}</p>
            <p className="text-sm text-slate-400">Current Count</p>
          </div>
          <button
            onClick={toggleRunning}
            className={`px-6 py-2 rounded-lg transition-all ${
              running
                ? "bg-red-600 hover:bg-red-500 text-white"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            {running ? "Stop" : "Start"} Counter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stale Closure */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h4 className="font-bold text-red-400">Stale Closure</h4>
          </div>

          <pre className="bg-slate-950 p-3 rounded text-xs overflow-x-auto mb-4 border border-slate-800">
            <code className="text-slate-300">
              {`useEffect(() => {
  const interval = setInterval(() => {
    log(\`Count: \${count}\`);
  }, 1000);
  return () => clearInterval(interval);
}, []); // ❌ Missing count`}
            </code>
          </pre>

          <div className="bg-slate-950 rounded p-3 border border-slate-800 min-h-[120px]">
            <p className="text-xs text-slate-500 mb-2">Console Output:</p>
            {staleLog.map((log, idx) => (
              <p key={idx} className="text-xs text-red-400 font-mono">
                {log} <span className="text-slate-600">(always 0)</span>
              </p>
            ))}
          </div>
        </div>

        {/* Fresh Closure */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-emerald-400">Fresh Closure</h4>
          </div>

          <pre className="bg-slate-950 p-3 rounded text-xs overflow-x-auto mb-4 border border-slate-800">
            <code className="text-slate-300">
              {`useEffect(() => {
  const interval = setInterval(() => {
    log(\`Count: \${count}\`);
  }, 1000);
  return () => clearInterval(interval);
}, [count]); // ✅ Includes count`}
            </code>
          </pre>

          <div className="bg-slate-950 rounded p-3 border border-slate-800 min-h-[120px]">
            <p className="text-xs text-slate-500 mb-2">Console Output:</p>
            {freshLog.map((log, idx) => (
              <p key={idx} className="text-xs text-emerald-400 font-mono">
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

    setTimeout(() => {
      setWithoutCleanup((prev) => ({
        fetches: prev.fetches.map((f) =>
          f.id === userId && f.status === "fetching"
            ? { ...f, status: "complete" }
            : f
        ),
        currentUser: `User ${userId}`,
      }));
    }, 1000 + Math.random() * 1000);
  }, [userId]);

  // With cleanup - no race condition
  useEffect(() => {
    let cancelled = false;

    setWithCleanup((prev) => ({
      ...prev,
      fetches: [...prev.fetches, { id: userId, status: "fetching" }],
    }));

    setTimeout(() => {
      if (!cancelled) {
        setWithCleanup((prev) => ({
          fetches: prev.fetches.map((f) =>
            f.id === userId && f.status === "fetching"
              ? { ...f, status: "complete" }
              : f
          ),
          currentUser: `User ${userId}`,
        }));
      } else {
        setWithCleanup((prev) => ({
          ...prev,
          fetches: prev.fetches.map((f) =>
            f.id === userId && f.status === "fetching"
              ? { ...f, status: "cancelled" }
              : f
          ),
        }));
      }
    }, 1000 + Math.random() * 1000);

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const changeUser = () => {
    setUserId((id) => (id % 5) + 1);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-blue-400" />
        <h3 className="text-xl font-bold text-slate-100">
          Cleanup Functions: Closing the Loop
        </h3>
      </div>

      <p className="text-slate-400 mb-6">
        The cleanup function is Donnie's sacrifice—it "undoes" the previous effect before
        the new one runs, preventing race conditions and stale data.
      </p>

      <div className="mb-6">
        <button
          onClick={changeUser}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all"
        >
          Change User (Current: {userId})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Without Cleanup */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h4 className="font-bold text-red-400">Without Cleanup</h4>
          </div>

          <pre className="bg-slate-950 p-3 rounded text-xs overflow-x-auto mb-4 border border-slate-800">
            <code className="text-slate-300">
              {`useEffect(() => {
  fetchUser(userId)
    .then(setUser);
}, [userId]);
// ❌ No cleanup, race condition`}
            </code>
          </pre>

          <div className="space-y-2 mb-3">
            {withoutCleanup.fetches.slice(-5).map((fetch, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded text-xs font-mono ${
                  fetch.status === "fetching"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                User {fetch.id}: {fetch.status}
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-3 rounded border border-slate-800">
            <p className="text-sm text-slate-400">Current User:</p>
            <p className="text-slate-200 font-mono">{withoutCleanup.currentUser}</p>
            <p className="text-xs text-red-400 mt-2">
              ⚠️ May show wrong user if fetches complete out of order
            </p>
          </div>
        </div>

        {/* With Cleanup */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <h4 className="font-bold text-emerald-400">With Cleanup</h4>
          </div>

          <pre className="bg-slate-950 p-3 rounded text-xs overflow-x-auto mb-4 border border-slate-800">
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

          <div className="space-y-2 mb-3">
            {withCleanup.fetches.slice(-5).map((fetch, idx) => (
              <div
                key={idx}
                className={`px-3 py-2 rounded text-xs font-mono ${
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

          <div className="bg-slate-950 p-3 rounded border border-slate-800">
            <p className="text-sm text-slate-400">Current User:</p>
            <p className="text-slate-200 font-mono">{withCleanup.currentUser}</p>
            <p className="text-xs text-emerald-400 mt-2">
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
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="w-5 h-5 text-purple-400" />
        <h3 className="text-xl font-bold text-slate-100">
          Two Universes: A Final Comparison
        </h3>
      </div>

      <p className="text-slate-400 mb-6">
        The tangent universe was a warning. A glimpse of what happens when you watch
        the wrong things. Here's the contrast between corrupted and stable timelines.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Tangent Universe */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h4 className="text-lg font-bold text-red-400">Tangent Universe</h4>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded border border-slate-800">
              <p className="text-sm font-mono text-red-400 mb-2">❌ Missing Dependencies</p>
              <pre className="text-xs text-slate-400 overflow-x-auto">
                {`useEffect(() => {
  fetchUser(userId);
}, []); // userId not included`}
              </pre>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800">
              <p className="text-sm font-mono text-red-400 mb-2">❌ Irrelevant Dependencies</p>
              <pre className="text-xs text-slate-400 overflow-x-auto">
                {`useEffect(() => {
  console.log(time);
}, [theme]); // theme is irrelevant`}
              </pre>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800">
              <p className="text-sm font-mono text-red-400 mb-2">❌ No Cleanup</p>
              <pre className="text-xs text-slate-400 overflow-x-auto">
                {`useEffect(() => {
  const interval = setInterval(...);
  // No cleanup, memory leak
}, []);`}
              </pre>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800">
              <p className="text-sm font-mono text-red-400 mb-2">❌ Stale Closures</p>
              <pre className="text-xs text-slate-400 overflow-x-auto">
                {`useEffect(() => {
  setTimeout(() => {
    console.log(count); // Always 0
  }, 1000);
}, []);`}
              </pre>
            </div>
          </div>

          <div className="mt-4 p-3 bg-red-950/30 rounded border border-red-500/50">
            <p className="text-sm text-red-300">
              <strong>Result:</strong> Reality unravels. Stale data, missed updates,
              race conditions, memory leaks. The component universe collapses.
            </p>
          </div>
        </div>

        {/* Primary Universe */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h4 className="text-lg font-bold text-emerald-400">Primary Universe</h4>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 p-4 rounded border border-slate-800">
              <p className="text-sm font-mono text-emerald-400 mb-2">✅ Correct Dependencies</p>
              <pre className="text-xs text-slate-400 overflow-x-auto">
                {`useEffect(() => {
  fetchUser(userId);
}, [userId]); // userId included`}
              </pre>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800">
              <p className="text-sm font-mono text-emerald-400 mb-2">✅ Relevant Dependencies Only</p>
              <pre className="text-xs text-slate-400 overflow-x-auto">
                {`useEffect(() => {
  console.log(time);
}, [time]); // only time included`}
              </pre>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800">
              <p className="text-sm font-mono text-emerald-400 mb-2">✅ Proper Cleanup</p>
              <pre className="text-xs text-slate-400 overflow-x-auto">
                {`useEffect(() => {
  const interval = setInterval(...);
  return () => clearInterval(interval);
}, []);`}
              </pre>
            </div>

            <div className="bg-slate-950 p-4 rounded border border-slate-800">
              <p className="text-sm font-mono text-emerald-400 mb-2">✅ Fresh Closures</p>
              <pre className="text-xs text-slate-400 overflow-x-auto">
                {`useEffect(() => {
  setTimeout(() => {
    console.log(count); // Current value
  }, 1000);
}, [count]);`}
              </pre>
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-950/30 rounded border border-emerald-500/50">
            <p className="text-sm text-emerald-300">
              <strong>Result:</strong> Reality is stable. Effects run predictably,
              data stays synchronized, no memory leaks. The primary universe endures.
            </p>
          </div>
        </div>
      </div>

      {/* Rules Summary */}
      <div className="bg-slate-950 rounded-lg p-6 border border-blue-500/30">
        <h4 className="text-lg font-bold text-blue-400 mb-4">
          The Rules of Effect Dependencies
        </h4>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">1.</span>
            <span>
              <strong>Include every value from component scope that your effect reads.</strong>
              Props, state, derived values—if you read it, include it.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">2.</span>
            <span>
              <strong>Don't include values your effect doesn't read.</strong>
              Irrelevant dependencies cause unnecessary re-runs.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">3.</span>
            <span>
              <strong>Use cleanup functions to "undo" effects.</strong>
              Clear timers, cancel requests, remove listeners. Cleanup runs before the next effect.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">4.</span>
            <span>
              <strong>Listen to ESLint warnings.</strong>
              The exhaustive-deps rule is Frank, warning you about wrong dependencies.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">5.</span>
            <span>
              <strong>Consider splitting effects.</strong>
              One effect per concern makes dependencies easier to manage.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-400 font-bold">6.</span>
            <span>
              <strong>Use updater functions to avoid dependencies.</strong>
              setState(prev => prev + 1) doesn't need current state in dependencies.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}