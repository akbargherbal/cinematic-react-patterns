import { useState, useEffect, useRef } from "react";
import { Clock, AlertTriangle, CheckCircle, XCircle, Timer } from "lucide-react";

export default function LooperCallbackTiming() {
  const [chapter, setChapter] = useState(0);

  const chapters = [
    {
      id: "intro",
      title: "The Contract",
      content: `In 2044, Joe works as a looper. The job is simple: wait in a Kansas cornfield with a blunderbuss, and when a hooded figure materializes on the tarp in front of you, you pull the trigger. No questions. The target is sent from thirty years in the future, and you're paid in silver bars strapped to their body. Clean, efficient, untraceable.

The system works because of the delay. You schedule the execution now—the Gat Men in 2074 send the target back—but the actual callback doesn't run until the precise moment they arrive. Thirty years is a long time. Long enough that you forget the details. Long enough that the context changes completely.

Joe has closed dozens of loops. He knows the rhythm: show up, wait for the shimmer in the air, fire, collect payment, go home. The callback always executes exactly as scheduled. The future is reliable.

Until the day you're asked to close your own loop.

"Closing your loop" means your future self is the target. In thirty years, the Gat Men will send you back to be killed by your younger self. It's the ultimate test of the system: can you execute a callback when you're both the scheduler and the scheduled?

Most loopers take the silver, retire rich, and live out their thirty years knowing exactly when and how they'll die. The callback is set. The execution is inevitable.

But what happens when the callback runs in a completely different context than the one that scheduled it?`,
      demo: <TimelineDemo />,
    },
    {
      id: "build",
      title: "When Your Loop Runs",
      content: `The shimmer comes right on schedule. Joe raises his blunderbuss, finger on the trigger. But the hooded figure on the tarp isn't bound. Isn't kneeling. The hood falls back, and Joe is staring at himself—thirty years older, scarred, desperate.

Old Joe moves fast. Too fast. He's not the passive target the callback expected. He's a man with a mission, with context Young Joe doesn't have. A wife, murdered. A crime lord called the Rainmaker who closes all the loops. A future that went horribly wrong.

Young Joe hesitates. The callback is supposed to execute simply: pull trigger, collect silver, done. But Old Joe isn't following the script. He's carrying variables Young Joe never captured—memories of a woman named Suzie, knowledge of the Rainmaker, a desperation that makes him dangerous.

"You don't understand what's coming," Old Joe says. "The context has changed."

This is the problem with callbacks that execute far in the future. When Young Joe scheduled this execution (by becoming a looper), he captured the current state: kill target, get paid, retire. Simple. But by the time the callback runs—thirty years later—the state has mutated. Old Joe has lived a life, lost a wife, learned things Young Joe can't imagine.

The closure captured the wrong variables.`,
      demo: <StaleClosureDemo />,
    },
    {
      id: "climax",
      title: "The Rainmaker Problem",
      content: `Young Joe tracks Old Joe to a farmhouse outside the city. There's a woman there—Sara—and her son, Cid. Old Joe believes Cid will grow up to become the Rainmaker, the crime lord who closes all the loops and kills his wife. Old Joe's callback has one purpose: kill the child, prevent the future, save his wife.

But Young Joe sees the problem now. He sees what happens when a callback executes with corrupted assumptions.

Old Joe is operating on stale data. He has a list of three children, one of whom might be the Rainmaker. He's executing a side effect—murder—based on incomplete information captured thirty years ago. The closure doesn't have the full picture. It doesn't know that Cid only becomes the Rainmaker because Old Joe tries to kill him.

This is the callback bug in its most destructive form.

Young Joe watches Cid use his telekinetic powers in a rage, sees the boy's potential for violence. He realizes the terrible truth: Old Joe's callback is creating the very problem it's trying to solve. By executing with stale assumptions, the callback is corrupting the state it's trying to fix.

It's a memory leak. A race condition. A side effect that triggers more side effects in an infinite loop.`,
      demo: <MemoryLeakDemo />,
    },
    {
      id: "resolution",
      title: "Breaking the Loop",
      content: `Young Joe stands in the cornfield, the same field where he closed dozens of loops. He sees the future playing out: Old Joe kills Cid, Sara dies trying to protect him, Cid survives and becomes the Rainmaker, grows up to close all the loops, kills Old Joe's wife, sends Old Joe back to kill Cid. The loop is perfect. Unbreakable.

Unless someone cancels the callback.

Young Joe understands now what it means to "close your loop." It's not about executing the callback as scheduled. It's about taking responsibility for the side effects you create. It's about cleanup.

He sees Old Joe aiming at Cid. He sees Sara throwing herself in front of her son. He sees the moment when the callback will execute, when the side effect will trigger, when the state will be corrupted beyond repair.

And he sees the cleanup function: himself.

Young Joe raises his blunderbuss—not at Old Joe, but at himself. The only way to prevent the callback from executing is to eliminate the function before it completes. If Young Joe dies, Old Joe never exists. The callback is cancelled. The loop is broken.

It's the ultimate cleanup function: return a function that prevents the scheduled callback from ever running.`,
      demo: <CleanupDemo />,
    },
    {
      id: "summary",
      title: "Temporal Hygiene",
      content: `In 2044, loopers learn a hard lesson: callbacks scheduled now execute later, in a different context. The variables you capture in your closure might be stale by the time the function runs. The state might have changed. The component might have unmounted. The future is not the present.

Young Joe scheduled a callback thirty years in advance. He captured the context: kill target, get paid, retire. Simple. But by the time Old Joe arrived—by the time the callback executed—everything had changed. The closure had the wrong variables. The execution environment was corrupted. The side effect would have created the very problem it was trying to solve.

The solution wasn't to let the callback run. It was to cancel it. To clean up. To break the loop before it could corrupt the timeline.`,
      demo: <PatternComparison />,
    },
  ];

  const currentChapter = chapters[chapter];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && chapter > 0) {
        setChapter(c => c - 1);
      } else if (e.key === "ArrowRight" && chapter < chapters.length - 1) {
        setChapter(c => c + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chapter, chapters.length]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-amber-500/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">
            Looper
          </h1>
          <p className="text-lg md:text-xl text-slate-400">
            Callback Execution Timing
          </p>
          <p className="text-sm text-slate-500 mt-2">
            When callbacks execute in a different context than they were scheduled
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 pb-32">
        <article className="space-y-8">
          {/* Chapter Title */}
          <div className="border-l-4 border-amber-500 pl-6">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">
              {currentChapter.title}
            </h2>
            <p className="text-sm text-slate-500">
              Chapter {chapter + 1} of {chapters.length}
            </p>
          </div>

          {/* Narrative Content */}
          <div className="prose prose-invert prose-slate max-w-none">
            {currentChapter.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-lg leading-relaxed mb-4 text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Interactive Demo */}
          <div className="mt-12">
            {currentChapter.demo}
          </div>
        </article>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-sm border-t border-amber-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setChapter(c => c - 1)}
              disabled={chapter === 0}
              className="px-6 py-2 bg-amber-950/50 text-amber-500 border border-amber-500/30 rounded hover:bg-amber-950 hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Clock className="w-4 h-4" />
              <span>
                Chapter {chapter + 1} of {chapters.length}
              </span>
            </div>

            <button
              onClick={() => setChapter(c => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-amber-950/50 text-amber-500 border border-amber-500/30 rounded hover:bg-amber-950 hover:border-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Interactive Demo Components

function TimelineDemo() {
  const [isScheduled, setIsScheduled] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [capturedValue, setCapturedValue] = useState("anonymous");
  const [currentValue, setCurrentValue] = useState("anonymous");

  const scheduleCallback = () => {
    setIsScheduled(true);
    setIsExecuting(false);
    setProgress(0);
    setCapturedValue(currentValue);

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsExecuting(true);
          return 100;
        }
        return p + 10;
      });
    }, 300);
  };

  const reset = () => {
    setIsScheduled(false);
    setIsExecuting(false);
    setProgress(0);
    setCurrentValue("anonymous");
  };

  return (
    <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <Timer className="w-6 h-6" />
        The React Pattern: Callback Scheduling
      </h3>

      <div className="space-y-6">
        {/* Code Example */}
        <div className="bg-slate-900 rounded p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-slate-300">
{`function YoungJoe() {
  const [target, setTarget] = useState('${currentValue}');
  
  // Schedule a callback for 3 seconds from now
  setTimeout(() => {
    console.log(\`Executing hit on: \${target}\`);
    // This callback captures 'target' from NOW
    // But it runs 3 seconds in the FUTURE
  }, 3000);
  
  // What if target changes before the callback runs?
  setTarget('Old Joe');
}`}
          </pre>
        </div>

        {/* Interactive Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Current Target:
            </label>
            <input
              type="text"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              disabled={isScheduled}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-300 disabled:opacity-50"
              placeholder="Enter target name"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={scheduleCallback}
              disabled={isScheduled}
              className="px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Schedule Callback
            </button>
            <button
              onClick={reset}
              className="px-6 py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Timeline Visualization */}
        {isScheduled && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Scheduled</span>
              <span className="text-slate-400">Executing...</span>
              <span className="text-slate-400">Complete</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-slate-900 rounded p-4">
                <p className="text-xs text-slate-500 mb-1">Captured at schedule time:</p>
                <p className="text-amber-400 font-mono">{capturedValue}</p>
              </div>
              <div className="bg-slate-900 rounded p-4">
                <p className="text-xs text-slate-500 mb-1">Current value:</p>
                <p className="text-slate-300 font-mono">{currentValue}</p>
              </div>
            </div>
          </div>
        )}

        {isExecuting && (
          <div className="bg-slate-900 border border-amber-500/50 rounded p-4">
            <p className="text-amber-400 font-mono text-sm">
              Console: Executing hit on: {capturedValue}
            </p>
            {capturedValue !== currentValue && (
              <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Warning: Callback executed with stale data! Current target is "{currentValue}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StaleClosureDemo() {
  const [mission, setMission] = useState("close loop");
  const [scheduledMission, setScheduledMission] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const scheduleCallback = () => {
    setScheduledMission(mission);
    setIsScheduled(true);
    setHasExecuted(false);

    setTimeout(() => {
      setHasExecuted(true);
    }, 2000);
  };

  return (
    <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-amber-400 mb-4">
        Stale Closure Problem
      </h3>

      <div className="space-y-6">
        <div className="bg-slate-900 rounded p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-slate-300">
{`useEffect(() => {
  const timeoutId = setTimeout(() => {
    // By the time this runs, mission might have changed
    console.log(\`Executing mission: \${mission}\`);
    executeMission(mission); // Might be the wrong mission!
  }, 2000);
  
  // No cleanup function = Old Joe escapes
}, []);`}
          </pre>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Young Joe's Mission:
            </label>
            <select
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              disabled={isScheduled && !hasExecuted}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-slate-300 disabled:opacity-50"
            >
              <option value="close loop">Close Loop (retire peacefully)</option>
              <option value="kill Rainmaker">Kill Rainmaker (save wife)</option>
              <option value="protect Cid">Protect Cid (break the cycle)</option>
            </select>
          </div>

          <button
            onClick={scheduleCallback}
            disabled={isScheduled && !hasExecuted}
            className="px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isScheduled && !hasExecuted ? "Callback Scheduled..." : "Schedule Callback"}
          </button>

          {isScheduled && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 rounded p-4 border-l-4 border-amber-500">
                  <p className="text-xs text-slate-500 mb-1">Old Joe's Mission (captured):</p>
                  <p className="text-amber-400 font-mono text-sm">{scheduledMission}</p>
                </div>
                <div className="bg-slate-900 rounded p-4 border-l-4 border-slate-500">
                  <p className="text-xs text-slate-500 mb-1">Young Joe's Mission (current):</p>
                  <p className="text-slate-300 font-mono text-sm">{mission}</p>
                </div>
              </div>

              {hasExecuted && (
                <div className={`rounded p-4 ${scheduledMission !== mission ? 'bg-red-950/50 border border-red-500/50' : 'bg-emerald-950/50 border border-emerald-500/50'}`}>
                  <p className={`font-mono text-sm ${scheduledMission !== mission ? 'text-red-400' : 'text-emerald-400'}`}>
                    Callback executed: {scheduledMission}
                  </p>
                  {scheduledMission !== mission && (
                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      Context mismatch! Old Joe is executing the wrong mission.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MemoryLeakDemo() {
  const [isMounted, setIsMounted] = useState(true);
  const [leakedCallbacks, setLeakedCallbacks] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const mountedRef = useRef(true);

  const scheduleWithoutCleanup = () => {
    const callbackId = Date.now();
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Scheduled callback #${callbackId}`]);

    setTimeout(() => {
      if (!mountedRef.current) {
        setLeakedCallbacks(prev => prev + 1);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ⚠️ Callback #${callbackId} executed after unmount!`]);
      } else {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ✓ Callback #${callbackId} executed safely`]);
      }
    }, 2000);
  };

  const toggleMount = () => {
    setIsMounted(prev => !prev);
    mountedRef.current = !mountedRef.current;
  };

  return (
    <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6" />
        Memory Leak: The Rainmaker Problem
      </h3>

      <div className="space-y-6">
        <div className="bg-slate-900 rounded p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-slate-300">
{`useEffect(() => {
  setTimeout(() => {
    // DANGER: Component might be unmounted
    // DANGER: This might trigger a cascade of bugs
    if (target) {
      killTarget(target); // Accessing state that no longer exists!
    }
  }, 2000);
  
  // NO CLEANUP FUNCTION
  // The callback will run no matter what
}, [target]);`}
          </pre>
        </div>

        <div className="flex items-center justify-between bg-slate-900 rounded p-4">
          <div>
            <p className="text-sm text-slate-400">Component Status:</p>
            <p className={`text-lg font-bold ${isMounted ? 'text-emerald-400' : 'text-red-400'}`}>
              {isMounted ? 'Mounted' : 'Unmounted'}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Leaked Callbacks:</p>
            <p className="text-3xl font-bold text-red-400">{leakedCallbacks}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={scheduleWithoutCleanup}
            className="px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
          >
            Schedule Callback (No Cleanup)
          </button>
          <button
            onClick={toggleMount}
            className={`px-6 py-2 rounded ${isMounted ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'} text-white`}
          >
            {isMounted ? 'Unmount Component' : 'Mount Component'}
          </button>
        </div>

        <div className="bg-slate-900 rounded p-4 max-h-64 overflow-y-auto">
          <p className="text-xs text-slate-500 mb-2">Console Output:</p>
          {logs.length === 0 ? (
            <p className="text-slate-600 text-sm">No callbacks scheduled yet...</p>
          ) : (
            <div className="space-y-1 font-mono text-xs">
              {logs.map((log, idx) => (
                <p key={idx} className={log.includes('⚠️') ? 'text-red-400' : 'text-slate-400'}>
                  {log}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CleanupDemo() {
  const [withCleanup, setWithCleanup] = useState({ mounted: true, scheduled: false, executed: false });
  const [withoutCleanup, setWithoutCleanup] = useState({ mounted: true, scheduled: false, executed: false });

  const scheduleWithCleanup = () => {
    setWithCleanup(prev => ({ ...prev, scheduled: true, executed: false }));

    const timeoutId = setTimeout(() => {
      if (withCleanup.mounted) {
        setWithCleanup(prev => ({ ...prev, executed: true }));
      }
    }, 2000);

    // Cleanup function
    return () => clearTimeout(timeoutId);
  };

  const scheduleWithoutCleanup = () => {
    setWithoutCleanup(prev => ({ ...prev, scheduled: true, executed: false }));

    setTimeout(() => {
      setWithoutCleanup(prev => ({ ...prev, executed: true }));
    }, 2000);
  };

  const unmountWithCleanup = () => {
    setWithCleanup(prev => ({ ...prev, mounted: false }));
  };

  const unmountWithoutCleanup = () => {
    setWithoutCleanup(prev => ({ ...prev, mounted: false }));
  };

  return (
    <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-amber-400 mb-4">
        Breaking the Loop: Cleanup Functions
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Without Cleanup */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
          <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Without Cleanup
          </h4>

          <div className="bg-slate-900 rounded p-3 font-mono text-xs mb-4 overflow-x-auto">
            <pre className="text-slate-300">
{`useEffect(() => {
  setTimeout(() => {
    execute();
  }, 2000);
  
  // No cleanup!
}, []);`}
            </pre>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Status:</span>
              <span className={withoutCleanup.mounted ? 'text-emerald-400' : 'text-red-400'}>
                {withoutCleanup.mounted ? 'Mounted' : 'Unmounted'}
              </span>
            </div>

            <button
              onClick={scheduleWithoutCleanup}
              disabled={withoutCleanup.scheduled}
              className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 text-sm"
            >
              Schedule Callback
            </button>

            <button
              onClick={unmountWithoutCleanup}
              disabled={!withoutCleanup.mounted}
              className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 disabled:opacity-50 text-sm"
            >
              Unmount Component
            </button>

            {withoutCleanup.executed && !withoutCleanup.mounted && (
              <div className="bg-red-900/50 border border-red-500 rounded p-3 text-sm">
                <p className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Callback executed after unmount!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* With Cleanup */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
          <h4 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            With Cleanup
          </h4>

          <div className="bg-slate-900 rounded p-3 font-mono text-xs mb-4 overflow-x-auto">
            <pre className="text-slate-300">
{`useEffect(() => {
  const id = setTimeout(() => {
    execute();
  }, 2000);
  
  return () => {
    clearTimeout(id);
  };
}, []);`}
            </pre>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Status:</span>
              <span className={withCleanup.mounted ? 'text-emerald-400' : 'text-red-400'}>
                {withCleanup.mounted ? 'Mounted' : 'Unmounted'}
              </span>
            </div>

            <button
              onClick={scheduleWithCleanup}
              disabled={withCleanup.scheduled}
              className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50 text-sm"
            >
              Schedule Callback
            </button>

            <button
              onClick={unmountWithCleanup}
              disabled={!withCleanup.mounted}
              className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 disabled:opacity-50 text-sm"
            >
              Unmount Component
            </button>

            {!withCleanup.mounted && withCleanup.scheduled && (
              <div className="bg-emerald-900/50 border border-emerald-500 rounded p-3 text-sm">
                <p className="text-emerald-400 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Callback cancelled on unmount!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-slate-900 rounded p-4">
        <p className="text-sm text-slate-400 mb-2">The Pattern:</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Young Joe killing himself is the cleanup function. By returning a function from useEffect that cancels the scheduled callback, you prevent it from executing in corrupted state. The loop is broken. The timeline is clean.
        </p>
      </div>
    </div>
  );
}

function PatternComparison() {
  return (
    <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-amber-400 mb-6">
        The Rules of Temporal Hygiene
      </h3>

      <div className="space-y-8">
        {/* Best Practices Checklist */}
        <div className="bg-slate-900 rounded-lg p-6">
          <h4 className="text-xl font-bold text-amber-400 mb-4">Best Practices</h4>
          <div className="space-y-3">
            {[
              "Always return a cleanup function from useEffect",
              "Clear timeouts and intervals in cleanup",
              "Cancel API requests with AbortController",
              "Remove event listeners in cleanup",
              "Check mounted state before updating state in callbacks",
              "Use cancellation flags for async operations",
              "Understand closure capture timing",
              "Test component unmounting scenarios"
            ].map((practice, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-slate-300">{practice}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              Wrong Way
            </h4>
            <div className="bg-slate-900 rounded p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-slate-300">
{`useEffect(() => {
  setTimeout(() => {
    // No checks
    setState(newValue);
  }, 1000);
  
  // No cleanup
}, []);`}
              </pre>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Right Way
            </h4>
            <div className="bg-slate-900 rounded p-4 font-mono text-xs overflow-x-auto">
              <pre className="text-slate-300">
{`useEffect(() => {
  let cancelled = false;
  
  const id = setTimeout(() => {
    if (!cancelled) {
      setState(newValue);
    }
  }, 1000);
  
  return () => {
    cancelled = true;
    clearTimeout(id);
  };
}, []);`}
              </pre>
            </div>
          </div>
        </div>

        {/* Final Wisdom */}
        <div className="bg-amber-950/30 border-l-4 border-amber-500 p-6">
          <p className="text-lg text-amber-400 font-bold mb-2">
            "Close your own loop."
          </p>
          <p className="text-slate-300 leading-relaxed">
            Joe learned that being a looper isn't about executing every callback that's scheduled. It's about knowing when to cancel. When to clean up. When to break the loop before it corrupts everything. In React, you're a looper every time you use useEffect. The question is: will you close your loop properly?
          </p>
        </div>
      </div>
    </div>
  );
}