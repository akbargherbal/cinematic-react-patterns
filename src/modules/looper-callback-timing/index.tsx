import { useState, useEffect, useRef, useCallback } from "react";
import {
  Clock,
  Zap,
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function LooperCallbackTiming() {
  const [chapter, setChapter] = useState(0);

  const chapters = [
    {
      id: "intro",
      title: "The Contract",
      icon: Clock,
      demo: <ContractDemo />,
    },
    {
      id: "build",
      title: "When Your Loop Runs",
      icon: Zap,
      demo: <StaleClosureDemo />,
    },
    {
      id: "climax",
      title: "The Rainmaker Problem",
      icon: AlertTriangle,
      demo: <MemoryLeakDemo />,
    },
    {
      id: "resolution",
      title: "Breaking the Loop",
      icon: Shield,
      demo: <CleanupDemo />,
    },
    {
      id: "summary",
      title: "Temporal Hygiene",
      icon: CheckCircle,
      demo: <ComparisonMatrix />,
    },
  ];

  const currentChapter = chapters[chapter];
  const Icon = currentChapter.icon;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl sm:text-4xl font-bold text-amber-500">
              Looper
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Callback Execution Timing • Kansas, 2044
          </p>
        </div>
      </header>

      {/* Chapter Progress */}
      <div className="bg-slate-900/30 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => setChapter(idx)}
                className={`flex-1 h-2 rounded transition-all ${
                  idx === chapter
                    ? "bg-amber-500"
                    : idx < chapter
                    ? "bg-amber-900/50"
                    : "bg-slate-800"
                }`}
                aria-label={`Go to chapter ${idx + 1}: ${ch.title}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pb-32">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Narrative */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Icon className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-bold">{currentChapter.title}</h2>
            </div>

            <div className="prose prose-invert prose-slate max-w-none">
              <ChapterContent chapter={chapter} />
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-amber-500">
                Interactive Demo
              </h3>
              {currentChapter.demo}
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="px-6 py-2 bg-slate-800 text-slate-200 rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors"
            >
              Previous
            </button>

            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-amber-600 text-white rounded disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
function ChapterContent({ chapter }: { chapter: number }) {
  const content = [
    // Chapter 0: The Contract
    <>
      <p className="text-slate-300 leading-relaxed">
        In 2044, Joe works as a looper. The job is simple: wait in a Kansas
        cornfield with a blunderbuss, and when a hooded figure materializes on
        the tarp in front of you, you pull the trigger. No questions. The target
        is sent from thirty years in the future, and you're paid in silver bars
        strapped to their body. Clean, efficient, untraceable.
      </p>
      <p className="text-slate-300 leading-relaxed">
        The system works because of the delay. You schedule the execution
        now—the Gat Men in 2074 send the target back—but the actual callback
        doesn't run until the precise moment they arrive. Thirty years is a long
        time. Long enough that you forget the details. Long enough that the
        context changes completely.
      </p>
      <p className="text-slate-300 leading-relaxed">
        Joe has closed dozens of loops. He knows the rhythm: show up, wait for
        the shimmer in the air, fire, collect payment, go home. The callback
        always executes exactly as scheduled. The future is reliable.
      </p>
      <p className="text-slate-300 leading-relaxed">
        Until the day you're asked to close your own loop.
      </p>
      <div className="bg-slate-800/50 border-l-4 border-amber-500 p-4 my-6">
        <p className="text-amber-200 font-semibold mb-2">The React Pattern:</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          When you schedule a callback—whether it's a setTimeout, an event
          handler, or an API response handler—you're creating a time loop. The
          function is defined now, capturing all variables around it (a
          closure). But it won't execute until later, when the event fires or
          the timer completes.
        </p>
      </div>
      <pre className="bg-slate-950 border border-slate-700 rounded p-4 text-sm overflow-x-auto">
        <code className="text-green-400">{`function YoungJoe() {
const [target, setTarget] = useState('anonymous');

setTimeout(() => {
console.log(\`Executing hit on: \${target}\`);
// Captures 'target' from NOW
// But runs 30 seconds in the FUTURE
}, 30000);

setTarget('Old Joe'); // What if this changes?
}`}</code>
      </pre>
    </>,

    // Chapter 1: When Your Loop Runs
    <>
      <p className="text-slate-300 leading-relaxed">
        The shimmer comes right on schedule. Joe raises his blunderbuss, finger
        on the trigger. But the hooded figure on the tarp isn't bound. Isn't
        kneeling. The hood falls back, and Joe is staring at himself—thirty
        years older, scarred, desperate.
      </p>
      <p className="text-slate-300 leading-relaxed">
        Old Joe moves fast. Too fast. He's not the passive target the callback
        expected. He's a man with a mission, with context Young Joe doesn't
        have. A wife, murdered. A crime lord called the Rainmaker who closes all
        the loops. A future that went horribly wrong.
      </p>
      <p className="text-slate-300 leading-relaxed">
        "You don't understand what's coming," Old Joe says. "The context has
        changed."
      </p>
      <p className="text-slate-300 leading-relaxed">
        This is the problem with callbacks that execute far in the future. When
        Young Joe scheduled this execution, he captured the current state: kill
        target, get paid, retire. But by the time the callback runs—thirty years
        later—the state has mutated. The closure captured the wrong variables.
      </p>
      <div className="bg-slate-800/50 border-l-4 border-amber-500 p-4 my-6">
        <p className="text-amber-200 font-semibold mb-2">The Problem:</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Callbacks execute with stale closure variables. The values they
          captured at scheduling time may no longer match the current
          application state at execution time.
        </p>
      </div>
      <pre className="bg-slate-950 border border-slate-700 rounded p-4 text-sm overflow-x-auto">
        <code className="text-green-400">{`function YoungJoe() {

const [mission, setMission] = useState('close loop');

useEffect(() => {
const timeoutId = setTimeout(() => {
// Stale closure: mission is still 'close loop'
console.log(\`Executing: \${mission}\`);
}, 30000);
}, []); // Empty deps = captures initial value

setMission('kill Rainmaker'); // Too late!
}`}</code>
      </pre>
    </>,

    // Chapter 2: The Rainmaker Problem
    <>
      <p className="text-slate-300 leading-relaxed">
        Young Joe tracks Old Joe to a farmhouse. There's a woman there—Sara—and
        her son, Cid. Old Joe believes Cid will grow up to become the Rainmaker,
        the crime lord who closes all the loops and kills his wife. Old Joe's
        callback has one purpose: kill the child, prevent the future, save his
        wife.
      </p>
      <p className="text-slate-300 leading-relaxed">
        But Young Joe sees the problem now. Old Joe is operating on stale data.
        He's executing a side effect—murder—based on incomplete information
        captured thirty years ago. The closure doesn't have the full picture.
      </p>
      <p className="text-slate-300 leading-relaxed">
        This is the callback bug in its most destructive form. Old Joe's
        callback is creating the very problem it's trying to solve. By executing
        with stale assumptions, the callback is corrupting the state it's trying
        to fix.
      </p>
      <div className="bg-red-950/30 border-l-4 border-red-500 p-4 my-6">
        <p className="text-red-400 font-semibold mb-2">The Nightmare:</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          A callback running after the component unmounts, or after state has
          changed so drastically that the callback's assumptions are invalid.
          Memory leaks, errors, and corrupted data follow.
        </p>
      </div>
      <pre className="bg-slate-950 border border-slate-700 rounded p-4 text-sm overflow-x-auto">
        <code className="text-red-400">{`function YoungJoe() {

const [mounted, setMounted] = useState(true);

useEffect(() => {
setTimeout(() => {
// DANGER: Component might be unmounted!
// This causes errors and memory leaks
setState(newValue); // Error: Can't update unmounted
}, 30000);

    // NO CLEANUP FUNCTION

}, []);

// Component unmounts...
return () => setMounted(false);
}`}</code>
      </pre>
    </>,

    // Chapter 3: Breaking the Loop
    <>
      <p className="text-slate-300 leading-relaxed">
        Young Joe stands in the cornfield, the same field where he closed dozens
        of loops. He sees the future playing out: Old Joe kills Cid, Sara dies
        protecting him, Cid becomes the Rainmaker, sends Old Joe back to kill
        Cid. The loop is perfect. Unbreakable.
      </p>
      <p className="text-slate-300 leading-relaxed">
        Unless someone cancels the callback.
      </p>
      <p className="text-slate-300 leading-relaxed">
        Young Joe understands now what it means to "close your loop." It's not
        about executing the callback as scheduled. It's about taking
        responsibility for the side effects you create. It's about cleanup.
      </p>
      <p className="text-slate-300 leading-relaxed">
        He raises his blunderbuss—not at Old Joe, but at himself. The only way
        to prevent the callback from executing is to eliminate the function
        before it completes. If Young Joe dies, Old Joe never exists. The
        callback is cancelled. The loop is broken.
      </p>
      <div className="bg-green-950/30 border-l-4 border-green-500 p-4 my-6">
        <p className="text-green-400 font-semibold mb-2">The Solution:</p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Return a cleanup function from useEffect. Clear timeouts, cancel
          requests, remove listeners. Prevent stale callbacks from running in
          corrupted contexts.
        </p>
      </div>
      <pre className="bg-slate-950 border border-slate-700 rounded p-4 text-sm overflow-x-auto">
        <code className="text-green-400">{`function YoungJoe() {

useEffect(() => {
let cancelled = false;

    const timeoutId = setTimeout(() => {
      if (cancelled) return; // Abort!

      // Safe to execute
      performAction();
    }, 30000);

    // CLEANUP FUNCTION
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      // Break the loop before it corrupts
    };

}, []);
}`}</code>
      </pre>
    </>,

    // Chapter 4: Temporal Hygiene
    <>
      <p className="text-slate-300 leading-relaxed">
        In 2044, loopers learn a hard lesson: callbacks scheduled now execute
        later, in a different context. The variables you capture might be stale.
        The state might have changed. The component might have unmounted. The
        future is not the present.
      </p>
      <p className="text-slate-300 leading-relaxed">
        The solution isn't to let the callback run blindly. It's to cancel it.
        To clean up. To break the loop before it can corrupt the timeline.
      </p>

      <div className="bg-slate-800/50 rounded-lg p-6 my-6 space-y-4">
        <h4 className="text-xl font-bold text-amber-500">
          The Rules of Temporal Hygiene
        </h4>
        <div className="space-y-3">
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">
                Always Return Cleanup
              </p>
              <p className="text-sm text-slate-400">
                Every useEffect that schedules a callback should return a
                cleanup function.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">
                Check Before Executing
              </p>
              <p className="text-sm text-slate-400">
                Verify the context is still valid. Is the component mounted? Is
                the state correct?
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">
                Use Cancellation Flags
              </p>
              <p className="text-sm text-slate-400">
                Set a boolean in cleanup. Check it in callback. If cancelled,
                abort.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">
                Understand Closure Capture
              </p>
              <p className="text-sm text-slate-400">
                Callbacks capture variables at scheduling time, not execution
                time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-slate-300 leading-relaxed font-semibold text-lg text-amber-500">
        Close your own loop. Before it closes you.
      </p>
    </>,
  ];

  return <div className="space-y-4">{content[chapter]}</div>;
}

function ContractDemo() {
  const [target, setTarget] = useState("anonymous");
  const [scheduled, setScheduled] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [capturedValue, setCapturedValue] = useState("");

  const scheduleCallback = () => {
    setCapturedValue(target);
    setScheduled(true);
    setExecuted(false);

    setTimeout(() => {
      setExecuted(true);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        Schedule a callback that captures the current target value. Then change
        the target and see what the callback executes with.
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2">
            Current Target:
          </label>
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-amber-500"
            placeholder="Enter target name"
          />
        </div>

        <button
          onClick={scheduleCallback}
          disabled={scheduled && !executed}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-2 rounded transition-colors"
        >
          {scheduled && !executed
            ? "Callback Scheduled..."
            : "Schedule Callback (3s delay)"}
        </button>

        {scheduled && (
          <div className="bg-slate-800/50 border border-slate-700 rounded p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-semibold">Captured Value:</span>
              <code className="text-amber-400">{capturedValue}</code>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-semibold">Current Value:</span>
              <code className="text-slate-400">{target}</code>
            </div>
            {executed && (
              <div className="mt-3 pt-3 border-t border-slate-700">
                <p className="text-sm text-green-400">
                  ✓ Callback executed with:{" "}
                  <code className="text-amber-400">{capturedValue}</code>
                </p>
                {capturedValue !== target && (
                  <p className="text-sm text-red-400 mt-1">
                    ⚠ Current value is different: <code>{target}</code>
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StaleClosureDemo() {
  const [mission, setMission] = useState("close loop");
  const [capturedMission, setCapturedMission] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const scheduleMission = () => {
    setCapturedMission(mission);
    setIsScheduled(true);
    setShowResult(false);

    setTimeout(() => {
      setShowResult(true);
    }, 2000);
  };

  const reset = () => {
    setIsScheduled(false);
    setShowResult(false);
    setCapturedMission("");
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        Old Joe's mission was set 30 years ago. See how changing the mission
        creates a mismatch between what was captured and what's current.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={() => setMission("close loop")}
          className={`py-2 px-3 rounded text-sm transition-colors ${
            mission === "close loop"
              ? "bg-amber-600 text-white"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          Close Loop
        </button>
        <button
          onClick={() => setMission("kill Rainmaker")}
          className={`py-2 px-3 rounded text-sm transition-colors ${
            mission === "kill Rainmaker"
              ? "bg-red-600 text-white"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          Kill Rainmaker
        </button>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded p-4">
        <p className="text-sm mb-2">
          <span className="font-semibold">Current Mission:</span>{" "}
          <code className="text-amber-400">{mission}</code>
        </p>
        {isScheduled && (
          <p className="text-sm">
            <span className="font-semibold">Captured 30 Years Ago:</span>{" "}
            <code className="text-slate-400">{capturedMission}</code>
          </p>
        )}
      </div>

      {!isScheduled ? (
        <button
          onClick={scheduleMission}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded transition-colors"
        >
          Schedule Callback (Become a Looper)
        </button>
      ) : (
        <div className="space-y-3">
          {!showResult && (
            <div className="flex items-center gap-2 text-amber-500 text-sm">
              <Clock className="w-4 h-4 animate-pulse" />
              <span>Waiting 30 years...</span>
            </div>
          )}
          {showResult && (
            <div
              className={`border rounded p-4 ${
                capturedMission !== mission
                  ? "bg-red-950/30 border-red-500/50"
                  : "bg-green-950/30 border-green-500/50"
              }`}
            >
              <p className="text-sm font-semibold mb-2">
                {capturedMission !== mission
                  ? "⚠ Stale Closure Problem!"
                  : "✓ Values Match"}
              </p>
              <p className="text-sm">
                Old Joe executes with:{" "}
                <code className="text-amber-400">{capturedMission}</code>
              </p>
              {capturedMission !== mission && (
                <p className="text-sm text-red-400 mt-2">
                  But the actual mission is now: <code>{mission}</code>
                </p>
              )}
            </div>
          )}
          <button
            onClick={reset}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded transition-colors text-sm"
          >
            Reset Demo
          </button>
        </div>
      )}
    </div>
  );
}

function MemoryLeakDemo() {
  const [isMounted, setIsMounted] = useState(true);
  const [callbackScheduled, setCallbackScheduled] = useState(false);
  const [error, setError] = useState("");
  const timeoutRef = useRef<number | null>(null);

  const scheduleWithoutCleanup = () => {
    setCallbackScheduled(true);
    setError("");

    timeoutRef.current = window.setTimeout(() => {
      if (!isMounted) {
        setError("ERROR: Tried to update state on unmounted component!");
      }
    }, 2000);
  };

  const toggleMount = () => {
    setIsMounted((m) => !m);
    if (isMounted && timeoutRef.current) {
      // Simulating unmount without cleanup
    }
  };

  const reset = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setCallbackScheduled(false);
    setError("");
    setIsMounted(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        The Rainmaker problem: a callback executing after the component (Cid's
        life) is gone.
      </p>

      <div className="flex items-center justify-between bg-slate-800/50 border border-slate-700 rounded p-4">
        <span className="text-sm font-semibold">Component Status:</span>
        <div className="flex items-center gap-2">
          {isMounted ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <span className={isMounted ? "text-green-400" : "text-red-400"}>
            {isMounted ? "Mounted" : "Unmounted"}
          </span>
        </div>
      </div>

      <button
        onClick={scheduleWithoutCleanup}
        disabled={callbackScheduled}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-2 rounded transition-colors"
      >
        {callbackScheduled
          ? "Callback Scheduled (No Cleanup)"
          : "Schedule Dangerous Callback"}
      </button>

      {callbackScheduled && (
        <button
          onClick={toggleMount}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded transition-colors"
        >
          {isMounted ? "Unmount Component" : "Remount Component"}
        </button>
      )}

      {error && (
        <div className="bg-red-950/50 border border-red-500 rounded p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-400 font-semibold text-sm">
                Memory Leak Detected
              </p>
              <p className="text-sm text-red-300 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={reset}
        className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded transition-colors text-sm"
      >
        Reset Demo
      </button>
    </div>
  );
}

function CleanupDemo() {
  const [withCleanup, setWithCleanup] = useState(true);
  const [scheduled, setScheduled] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (!scheduled) return;

    let isCancelled = false;

    const timeoutId = window.setTimeout(() => {
      if (withCleanup && isCancelled) {
        setCancelled(true);
        return;
      }
      setExecuted(true);
    }, 2000);

    return () => {
      if (withCleanup) {
        isCancelled = true;
        clearTimeout(timeoutId);
      }
    };
  }, [scheduled, withCleanup]);

  const schedule = () => {
    setScheduled(true);
    setExecuted(false);
    setCancelled(false);

    setTimeout(() => {
      setScheduled(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        Young Joe's choice: let the callback run (Old Joe lives) or cancel it
        (break the loop).
      </p>

      <div className="flex gap-2">
        <button
          onClick={() => setWithCleanup(false)}
          className={`flex-1 py-2 rounded text-sm transition-colors ${
            !withCleanup
              ? "bg-red-600 text-white"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          No Cleanup
        </button>
        <button
          onClick={() => setWithCleanup(true)}
          className={`flex-1 py-2 rounded text-sm transition-colors ${
            withCleanup
              ? "bg-green-600 text-white"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          With Cleanup
        </button>
      </div>

      <button
        onClick={schedule}
        disabled={scheduled}
        className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-2 rounded transition-colors"
      >
        Schedule Then Immediately "Unmount"
      </button>

      {(executed || cancelled) && (
        <div
          className={`border rounded p-4 ${
            cancelled
              ? "bg-green-950/30 border-green-500/50"
              : "bg-red-950/30 border-red-500/50"
          }`}
        >
          {cancelled && (
            <div className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-green-500 flex-shrink-0" />
              <div>
                <p className="text-green-400 font-semibold text-sm">
                  Callback Cancelled
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  Cleanup function prevented execution. Loop broken. Timeline
                  safe.
                </p>
              </div>
            </div>
          )}
          {executed && (
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-semibold text-sm">
                  Callback Executed Anyway
                </p>
                <p className="text-sm text-slate-300 mt-1">
                  No cleanup function. Old Joe lived. The Rainmaker is born.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-slate-800/50 rounded p-4 mt-4">
        <p className="text-xs font-mono text-green-400">
          {withCleanup
            ? `return () => {

cancelled = true;
clearTimeout(timeoutId);
}`
            : "// No cleanup function returned"}
        </p>
      </div>
    </div>
  );
}

function ComparisonMatrix() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        The two paths: letting callbacks run unchecked vs. proper cleanup and
        cancellation.
      </p>

      <div className="grid gap-4">
        {/* Without Cleanup */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-red-500" />
            <h4 className="font-bold text-red-400">
              Without Cleanup (Old Joe's Way)
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Schedule callback, assume context won't change</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Let it execute no matter what</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Callback runs with stale closures</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Tries to mutate state that's changed or gone</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Creates bugs, memory leaks, infinite loops</span>
            </li>
          </ul>
        </div>

        {/* With Cleanup */}
        <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h4 className="font-bold text-green-400">
              With Cleanup (Young Joe's Way)
            </h4>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Schedule callback, but prepare to cancel it</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Return a cleanup function from useEffect</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Check if execution is still valid</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Cancel if component unmounts or state changes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Prevent corrupted side effects</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-4 mt-6">
        <p className="text-amber-400 font-semibold mb-2">
          The Professional Looper Knows:
        </p>
        <p className="text-sm text-slate-300">
          Always clean up your callbacks. Always break the loop before it breaks
          you. Close your own loop.
        </p>
      </div>
    </div>
  );
}
