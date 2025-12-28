import { useState, useEffect, useRef, useCallback } from "react";
import {
  RefreshCw,
  Terminal,
  AlertTriangle,
  Users,
  CheckCircle2,
} from "lucide-react";

interface LogEntry {
  id: number;
  message: string;
  type: "mount" | "unmount" | "effect" | "cleanup";
}

interface Chapter {
  id: string;
  title: string;
  content: string;
  demo: () => JSX.Element;
}

export default function RussianDollLifecycleDebugging() {
  const [chapter, setChapter] = useState(0);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The First Death",
      content: `Nadia Vulvokov dies at her thirty-sixth birthday party.

One moment she's in the bathroom, staring at her reflection in the mirror—wild curly hair, dark lipstick, that leather jacket she always wears like armor. The next moment, she's walking down the stairs into the party, and then she's stepping into the street, and then there's the taxi, and then—

She's back in the bathroom.

Same mirror. Same moment. The exact same moment.

"What the fuck?"

This is what it feels like when your component unmounts unexpectedly and remounts with its initial state. You were running, everything was fine, your state was populated, your effects were subscribed, your refs were pointing to the right DOM nodes—and then suddenly, without warning, you're back at the beginning. Constructor called. Initial state restored. All your subscriptions gone.

Nadia doesn't know why she died. She doesn't know why she's back. All she knows is that something is very, very wrong.

In React terms, she's experiencing a lifecycle bug—a component that keeps unmounting when it shouldn't. Maybe a parent component is re-rendering and not preserving her key. Maybe a conditional render is toggling her in and out of existence. Maybe an effect cleanup function is running at the wrong time.

This is the moment every developer faces when they see their component flickering in and out of existence in React DevTools. That moment of realization: I have a lifecycle bug, and I need to figure out what's causing it.`,
      demo: LoopCounterDemo,
    },
    {
      id: "build",
      title: "Debugging the Loop",
      content: `Nadia starts keeping a journal.

Not a physical journal—she can't carry anything across deaths, across remounts. But a mental one. A log of everything that happens in each iteration of the loop. Each lifecycle instance.

Loop 6: Died from falling down stairs. Ate the chicken. Talked to John. Petted Oatmeal.

Loop 12: Died from taxi. Didn't eat the chicken. Still talked to John. Avoided Oatmeal.

Loop 18: Died from falling air conditioner. Ate the fruit. Didn't talk to John. Oatmeal was in the bedroom.

She's doing what every developer does when debugging a lifecycle issue: systematic logging. She's adding console.logs to different points in her component's lifecycle, trying to isolate which variable, which prop, which effect is causing the unexpected unmount.

She starts getting more systematic. She isolates variables. She tests one thing at a time.

This is the process. This is what debugging lifecycle issues looks like. You think it's the props changing. You stabilize the props. Still unmounts. You think it's a dependency array issue. You add the dependencies. Still unmounts.

Nadia is learning what every React developer learns: the bug isn't always where you think it is.`,
      demo: LifecycleLoggerDemo,
    },
    {
      id: "climax",
      title: "The Disappearing World",
      content: `The loops are getting worse.

Nadia has died hundreds of times now. Hundreds of remounts. Hundreds of fresh component instances, each one starting with the same initial state, each one trying to stay mounted long enough to figure out the bug.

But now the world is falling apart.

Oatmeal dies. Just stops existing. One loop he's there, the next loop he's gone, and he never comes back. A child component unmounted, never to remount again.

Then John disappears. Then Lizzy. Then more people. The party gets smaller. The world gets emptier. Each loop, fewer components remain in the tree.

This is what cascading unmounts look like.

When one component has a lifecycle bug—when its cleanup functions don't run properly, when its effects don't unsubscribe, when its dependencies aren't managed—it doesn't just affect that component. It affects everything connected to it. The entire tree becomes unstable.

This is the nightmare scenario. This is what happens when you ignore lifecycle issues. They compound. They multiply. They bring down the entire system.`,
      demo: DegradationDemo,
    },
    {
      id: "resolution",
      title: "Finding Alan",
      content: `Nadia and Alan start debugging together.

Two components. Two lifecycles. One shared dependency.

"When do you die?" Nadia asks.

"Different times," Alan says. "Different ways. But always—"

"Always at the same time I do," Nadia finishes.

This is what coupled lifecycle debugging looks like. You can't just look at one component. You have to look at the whole system. You have to understand the dependencies. You have to trace the connections.

They're doing what every developer must do when debugging coupled components: trace the dependency chain.

What does Nadia's component depend on? What does Alan's component depend on? Where do those dependencies overlap? What happens when one component's lifecycle affects the shared dependency?

"I think I know what's happening," Nadia says slowly. "We're both subscribed to the same thing. When one of us dies—unmounts—it changes the shared state. That change triggers the other one to unmount. We're causing each other's lifecycle bugs."

They need to survive together. They need to both reach a stable mounted state. They need to coordinate their lifecycles so that one's unmount doesn't trigger the other's.`,
      demo: CoupledComponentsDemo,
    },
    {
      id: "summary",
      title: "Breaking Free",
      content: `Nadia stands in the bathroom one last time. But this time, it's different.

This time, she's not stuck. This time, the loop is broken. This time, she understands.

Let's review what she learned—what every React developer needs to know about debugging lifecycle issues.

THE DEBUGGING PROCESS

1. Recognize the Pattern
When your component keeps unmounting unexpectedly, you're in a lifecycle loop. Signs you have a lifecycle bug:
• Component flickers in React DevTools
• State resets unexpectedly
• Effects run more often than they should
• Cleanup functions fire at wrong times

2. Add Systematic Logging
Don't just add random console.logs. Be systematic. Log at specific lifecycle points. Watch the pattern. When does it mount? When does it unmount? What triggers the unmount?

3. Isolate Variables
Test one hypothesis at a time. Is it a prop change? Parent re-render? Conditional render? Key prop changing? Effect dependency issue?

4. Check for Cascading Unmounts
If other components are also unmounting unexpectedly, you have a cascading bug. Look for missing cleanup functions, uncancelled subscriptions, uncleared timers, memory leaks.

5. Identify Coupled Lifecycles
Sometimes your component's lifecycle is coupled to another component's lifecycle through shared context, shared state, shared subscriptions. When one unmounts, it triggers the other to unmount.

The bug isn't always where you think it is. But if you're systematic, if you're patient, if you understand lifecycles—you'll find it. And you'll break free.`,
      demo: DebuggingChecklistDemo,
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="mb-2 flex items-center gap-3">
            <RefreshCw className="h-8 w-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-orange-500">Russian Doll</h1>
          </div>
          <p className="text-lg text-teal-400">
            Debugging Component Lifecycle Issues
          </p>
          <p className="mt-1 text-sm text-slate-400">Nadia Vulvokov, 2019</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 pb-32">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Narrative Column */}
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="mb-4 text-2xl font-bold text-orange-400">
                {currentChapter.title}
              </h2>
              <div className="prose prose-invert prose-slate max-w-none">
                {currentChapter.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4 leading-relaxed text-slate-300">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Column */}
          <div className="space-y-6">
            <div className="rounded-lg border border-teal-500/30 bg-slate-900/50 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-teal-400" />
                <h3 className="text-xl font-bold text-teal-400">
                  Interactive Demo
                </h3>
              </div>
              <currentChapter.demo />
            </div>
          </div>
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="rounded-lg bg-orange-600 px-6 py-2 font-medium transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600"
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
                      ? "w-8 bg-orange-500"
                      : idx < chapter
                        ? "bg-teal-500"
                        : "bg-slate-700"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="rounded-lg bg-orange-600 px-6 py-2 font-medium transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600"
            >
              Next
            </button>
          </div>
          <div className="mt-2 text-center text-sm text-slate-400">
            Chapter {chapter + 1} of {chapters.length}
          </div>
        </div>
      </footer>
    </div>
  );
}

// Demo Components

function LoopCounterDemo() {
  const [isLooping, setIsLooping] = useState(false);
  const [loopCount, setLoopCount] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logIdRef = useRef(0);

  const addLog = useCallback((message: string, type: LogEntry["type"]) => {
    setLogs((prev) => [
      ...prev.slice(-4),
      { id: logIdRef.current++, message, type },
    ]);
  }, []);

  useEffect(() => {
    if (!isLooping) return;

    const interval = setInterval(() => {
      setLoopCount((c) => {
        const newCount = c + 1;
        addLog(`💀 Component unmounted (Loop ${newCount})`, "unmount");
        setTimeout(() => {
          addLog(`🔄 Component remounted (Loop ${newCount})`, "mount");
        }, 100);
        return newCount;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLooping, addLog]);

  const handleToggle = () => {
    if (!isLooping) {
      setLoopCount(0);
      setLogs([]);
      addLog("🟢 Component mounted (Loop 0)", "mount");
    }
    setIsLooping(!isLooping);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-orange-500/30 bg-slate-950 p-6 text-center">
        <div className="mb-2 text-6xl font-bold text-orange-500">
          {loopCount}
        </div>
        <div className="text-sm text-slate-400">Loop Count</div>
        {isLooping && (
          <div className="mt-4 animate-pulse text-orange-400">
            Component remounting...
          </div>
        )}
      </div>

      <button
        onClick={handleToggle}
        className={`w-full rounded-lg py-3 font-medium transition-colors ${
          isLooping
            ? "bg-red-600 hover:bg-red-500"
            : "bg-teal-600 hover:bg-teal-500"
        }`}
      >
        {isLooping ? "Stop Loop" : "Start Loop"}
      </button>

      <div className="max-h-40 space-y-1 overflow-y-auto rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-xs">
        <div className="mb-2 text-slate-500">Console Output:</div>
        {logs.map((log) => (
          <div
            key={log.id}
            className={`${
              log.type === "mount"
                ? "text-teal-400"
                : log.type === "unmount"
                  ? "text-orange-400"
                  : "text-slate-400"
            }`}
          >
            {log.message}
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-slate-600">No logs yet...</div>
        )}
      </div>
    </div>
  );
}

function LifecycleLoggerDemo() {
  const [logMount, setLogMount] = useState(true);
  const [logEffect, setLogEffect] = useState(false);
  const [logCleanup, setLogCleanup] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [triggerCount, setTriggerCount] = useState(0);
  const logIdRef = useRef(0);

  const addLog = useCallback((message: string, type: LogEntry["type"]) => {
    setLogs((prev) => [
      ...prev.slice(-6),
      { id: logIdRef.current++, message, type },
    ]);
  }, []);

  useEffect(() => {
    if (logMount) {
      addLog("🟢 Component mounted", "mount");
    }

    return () => {
      if (logCleanup) {
        addLog("🔴 Component cleanup", "cleanup");
      }
    };
  }, [triggerCount, logMount, logCleanup, addLog]);

  useEffect(() => {
    if (logEffect) {
      addLog("🔵 Effect running", "effect");
    }

    return () => {
      if (logEffect && logCleanup) {
        addLog("🟡 Effect cleanup", "cleanup");
      }
    };
  }, [triggerCount, logEffect, logCleanup, addLog]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={logMount}
            onChange={(e) => setLogMount(e.target.checked)}
            className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500"
          />
          <span>Log mount/unmount</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={logEffect}
            onChange={(e) => setLogEffect(e.target.checked)}
            className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500"
          />
          <span>Log effect execution</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={logCleanup}
            onChange={(e) => setLogCleanup(e.target.checked)}
            className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500"
          />
          <span>Log cleanup functions</span>
        </label>
      </div>

      <button
        onClick={() => setTriggerCount((c) => c + 1)}
        className="w-full rounded-lg bg-orange-600 py-3 font-medium transition-colors hover:bg-orange-500"
      >
        Trigger Re-render
      </button>

      <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-xs">
        <div className="mb-2 text-slate-500">Lifecycle Logs:</div>
        {logs.map((log) => (
          <div
            key={log.id}
            className={`${
              log.type === "mount"
                ? "text-teal-400"
                : log.type === "effect"
                  ? "text-blue-400"
                  : log.type === "cleanup"
                    ? "text-yellow-400"
                    : "text-orange-400"
            }`}
          >
            {log.message}
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-slate-600">Enable logging options above...</div>
        )}
      </div>
    </div>
  );
}

function DegradationDemo() {
  const [hasCleanup, setHasCleanup] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [components, setComponents] = useState<boolean[]>(Array(12).fill(true));

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setComponents((prev) => {
        const activeIndices = prev
          .map((active, idx) => (active ? idx : -1))
          .filter((idx) => idx !== -1);

        if (activeIndices.length === 0) {
          setIsRunning(false);
          return prev;
        }

        const removeCount = hasCleanup ? 1 : Math.min(2, activeIndices.length);
        const toRemove = activeIndices
          .sort(() => Math.random() - 0.5)
          .slice(0, removeCount);

        return prev.map((active, idx) =>
          toRemove.includes(idx) ? false : active,
        );
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, hasCleanup]);

  const handleStart = () => {
    setComponents(Array(12).fill(true));
    setIsRunning(true);
  };

  const activeCount = components.filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hasCleanup}
            onChange={(e) => setHasCleanup(e.target.checked)}
            disabled={isRunning}
            className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500 disabled:opacity-50"
          />
          <span>Proper cleanup functions</span>
        </label>
        <div className="text-sm text-slate-400">
          {activeCount} / 12 components
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {components.map((active, idx) => (
          <div
            key={idx}
            className={`aspect-square rounded-lg border-2 transition-all duration-500 ${
              active
                ? "border-teal-500/50 bg-teal-500/20"
                : "border-red-500/30 bg-red-500/10 opacity-30"
            }`}
          >
            {active && (
              <div className="flex h-full w-full items-center justify-center text-xs text-teal-400">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleStart}
        disabled={isRunning}
        className="w-full rounded-lg bg-orange-600 py-3 font-medium transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600"
      >
        {isRunning ? "Cascading unmounts..." : "Start Degradation"}
      </button>

      {activeCount === 0 && !isRunning && (
        <div className="text-center text-sm text-red-400">
          <AlertTriangle className="mr-1 inline h-4 w-4" />
          All components unmounted
        </div>
      )}
    </div>
  );
}

function CoupledComponentsDemo() {
  const [coordinated, setCoordinated] = useState(false);
  const [nadiaAlive, setNadiaAlive] = useState(true);
  const [alanAlive, setAlanAlive] = useState(true);
  const [sharedState, setSharedState] = useState(0);

  const killNadia = () => {
    setNadiaAlive(false);
    if (!coordinated) {
      setTimeout(() => setAlanAlive(false), 300);
    }
    setSharedState((s) => s + 1);
  };

  const killAlan = () => {
    setAlanAlive(false);
    if (!coordinated) {
      setTimeout(() => setNadiaAlive(false), 300);
    }
    setSharedState((s) => s + 1);
  };

  const reset = () => {
    setNadiaAlive(true);
    setAlanAlive(true);
    setSharedState(0);
  };

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={coordinated}
          onChange={(e) => setCoordinated(e.target.checked)}
          className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500"
        />
        <span>Coordinated cleanup (prevents coupling)</span>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <div
          className={`rounded-lg border-2 p-4 transition-all ${
            nadiaAlive
              ? "border-orange-500/50 bg-orange-500/20"
              : "border-slate-700 bg-slate-800/50 opacity-50"
          }`}
        >
          <div className="mb-3 text-center">
            <div className="text-lg font-bold text-orange-400">Nadia</div>
            <div className="text-xs text-slate-400">Component A</div>
          </div>
          <button
            onClick={killNadia}
            disabled={!nadiaAlive}
            className="w-full rounded bg-red-600 py-2 text-sm transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {nadiaAlive ? "Unmount" : "Unmounted"}
          </button>
        </div>

        <div
          className={`rounded-lg border-2 p-4 transition-all ${
            alanAlive
              ? "border-teal-500/50 bg-teal-500/20"
              : "border-slate-700 bg-slate-800/50 opacity-50"
          }`}
        >
          <div className="mb-3 text-center">
            <div className="text-lg font-bold text-teal-400">Alan</div>
            <div className="text-xs text-slate-400">Component B</div>
          </div>
          <button
            onClick={killAlan}
            disabled={!alanAlive}
            className="w-full rounded bg-red-600 py-2 text-sm transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            {alanAlive ? "Unmount" : "Unmounted"}
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-950 p-3 text-center">
        <div className="mb-1 text-xs text-slate-400">Shared State</div>
        <div className="text-2xl font-bold text-slate-300">{sharedState}</div>
      </div>

      <button
        onClick={reset}
        className="w-full rounded-lg bg-teal-600 py-3 font-medium transition-colors hover:bg-teal-500"
      >
        Reset Both Components
      </button>

      {!nadiaAlive && !alanAlive && (
        <div className="text-center text-sm text-orange-400">
          <Users className="mr-1 inline h-4 w-4" />
          {coordinated
            ? "Both unmounted independently"
            : "Cascading unmount detected!"}
        </div>
      )}
    </div>
  );
}

function DebuggingChecklistDemo() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const checklistItems = [
    "Add console.logs to mount/unmount lifecycle",
    "Check React DevTools for unexpected remounts",
    "Verify dependency arrays in useEffect",
    "Ensure cleanup functions are present",
    "Test for cascading unmounts",
    "Identify shared state/context dependencies",
    "Use refs for stable references",
    "Coordinate cleanup in coupled components",
  ];

  const toggleItem = (idx: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const progress = (checkedItems.size / checklistItems.length) * 100;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {checklistItems.map((item, idx) => (
          <label
            key={idx}
            className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-700 bg-slate-950 p-3 transition-colors hover:border-teal-500/50"
          >
            <input
              type="checkbox"
              checked={checkedItems.has(idx)}
              onChange={() => toggleItem(idx)}
              className="mt-0.5 h-5 w-5 rounded border-slate-600 bg-slate-800 text-teal-500 focus:ring-teal-500"
            />
            <span className="flex-1 text-sm">{item}</span>
          </label>
        ))}
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-950 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-400">Debugging Progress</span>
          <span className="text-sm font-bold text-teal-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-teal-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {progress === 100 && (
        <div className="flex items-center justify-center gap-2 text-center text-sm text-teal-400">
          <CheckCircle2 className="h-4 w-4" />
          Loop broken! You've mastered lifecycle debugging.
        </div>
      )}
    </div>
  );
}
