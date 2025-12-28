import { useState, useEffect, useRef, useCallback } from "react";
import {
  Clock,
  Send,
  Zap,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";

interface Message {
  id: number;
  capturedAge: number;
  sentAt: number;
  receivedAt?: number;
}

interface Operation {
  id: number;
  name: string;
  duration: number;
  startTime: number;
  endTime?: number;
  result: string;
}

export default function InterstellarAsyncState() {
  const [chapter, setChapter] = useState(0);

  const chapters = [
    {
      title: "One Hour There",
      subtitle: "Understanding Time Dilation in Async Operations",
    },
    {
      title: "Twenty-Three Years of Messages",
      subtitle: "The Problem of Stale Closures",
    },
    {
      title: "The Quantum Data Problem",
      subtitle: "Race Conditions and Out-of-Order Completion",
    },
    {
      title: "The Tesseract Pattern",
      subtitle: "Five Patterns for Correct Async Handling",
    },
    {
      title: "Staying Synchronized Across Time",
      subtitle: "Synthesis and Best Practices",
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 font-sans text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">
          <h1 className="mb-2 text-3xl font-bold text-blue-400 md:text-4xl">
            Interstellar: Async State
          </h1>
          <p className="text-sm text-slate-400 md:text-base">
            Cooper, Gargantua, 2014 • Asynchronous State & Race Conditions
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 pb-32 md:px-8">
        {/* Chapter Header */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-blue-300 md:text-3xl">
            {currentChapter.title}
          </h2>
          <p className="text-lg text-slate-400">{currentChapter.subtitle}</p>
        </div>

        {/* Chapter Content */}
        {chapter === 0 && <ChapterOne />}
        {chapter === 1 && <ChapterTwo />}
        {chapter === 2 && <ChapterThree />}
        {chapter === 3 && <ChapterFour />}
        {chapter === 4 && <ChapterFive />}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
          <button
            onClick={() => setChapter((c) => c - 1)}
            disabled={chapter === 0}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600 md:px-6 md:text-base"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {chapters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setChapter(idx)}
                className={`h-2 w-2 rounded-full transition-all duration-200 ${
                  idx === chapter
                    ? "w-8 bg-blue-400"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Go to chapter ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setChapter((c) => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600 md:px-6 md:text-base"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}

// Chapter One: Time Dilation Demo
function ChapterOne() {
  const [planetTime, setPlanetTime] = useState(0);
  const [earthTime, setEarthTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const planetInterval = setInterval(() => {
      setPlanetTime((t) => t + 1);
    }, 1000);

    const earthInterval = setInterval(() => {
      setEarthTime((t) => t + 1);
    }, 143); // ~7x faster (1000ms / 7 ≈ 143ms)

    return () => {
      clearInterval(planetInterval);
      clearInterval(earthInterval);
    };
  }, [isRunning]);

  const reset = () => {
    setPlanetTime(0);
    setEarthTime(0);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-slate-300">
          Cooper descends to Miller's planet, where time warps near Gargantua.
          One hour here equals seven years on the Endurance. From inside the
          async operation, time feels normal—but outside, the universe races
          forward.
        </p>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6 shadow-lg shadow-blue-500/10">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-blue-300">
          <Clock className="h-5 w-5" />
          Time Dilation Simulator
        </h3>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {/* Miller's Planet Clock */}
          <div className="rounded-lg border border-blue-500/30 bg-slate-950 p-6 text-center">
            <div className="mb-2 text-sm font-medium text-blue-400">
              Miller's Planet (Async Context)
            </div>
            <div className="mb-2 font-mono text-5xl font-bold text-blue-300">
              {planetTime}s
            </div>
            <div className="text-xs text-slate-500">Inside the callback</div>
          </div>

          {/* Earth Clock */}
          <div className="rounded-lg border border-amber-500/30 bg-slate-950 p-6 text-center">
            <div className="mb-2 text-sm font-medium text-amber-400">
              Earth (Main Thread)
            </div>
            <div className="mb-2 font-mono text-5xl font-bold text-amber-300">
              {earthTime}s
            </div>
            <div className="text-xs text-slate-500">Outside the callback</div>
          </div>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium transition-all duration-200 hover:bg-blue-500"
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Start Mission
              </>
            )}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-lg bg-slate-700 px-6 py-2 font-medium transition-all duration-200 hover:bg-slate-600"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-950/30 p-4">
          <p className="text-sm leading-relaxed text-slate-300">
            <strong className="text-blue-300">The Lesson:</strong> Inside your
            async callback, execution feels normal. But outside—in the main
            thread, in your component's lifecycle—time doesn't wait. State
            changes. Props update. The component might unmount. Your callback
            doesn't know. It's trapped in its own time dilation.
          </p>
        </div>
      </div>
    </div>
  );
}

// Chapter Two: Stale Closures Demo
function ChapterTwo() {
  const [tomAge, setTomAge] = useState(10);
  const [messages, setMessages] = useState<Message[]>([]);
  const messageIdRef = useRef(0);

  const sendMessage = useCallback(() => {
    const capturedAge = tomAge;
    const messageId = ++messageIdRef.current;

    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        capturedAge,
        sentAt: Date.now(),
      },
    ]);

    // Simulate async delay (3 seconds)
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, receivedAt: Date.now() } : msg,
        ),
      );
    }, 3000);
  }, [tomAge]);

  const ageUp = () => {
    setTomAge((age) => age + 5);
  };

  const reset = () => {
    setTomAge(10);
    setMessages([]);
    messageIdRef.current = 0;
  };

  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-slate-300">
          Cooper returns to the Endurance after one hour on Miller's planet.
          Twenty-three years have passed. He watches messages from Tom—each one
          sent with good intentions, each one arriving in a world that has moved
          on. The closure captured a moment that no longer exists.
        </p>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6 shadow-lg shadow-amber-500/10">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-amber-300">
          <Send className="h-5 w-5" />
          Stale Closure Visualizer
        </h3>

        <div className="mb-6 rounded-lg border border-amber-500/30 bg-slate-950 p-6 text-center">
          <div className="mb-2 text-sm font-medium text-amber-400">
            Tom's Current Age (State)
          </div>
          <div className="mb-4 font-mono text-5xl font-bold text-amber-300">
            {tomAge}
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={sendMessage}
              className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-2 font-medium transition-all duration-200 hover:bg-amber-500"
            >
              <Send className="h-4 w-4" /> Send Message (Capture State)
            </button>
            <button
              onClick={ageUp}
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium transition-all duration-200 hover:bg-blue-500"
            >
              +5 Years Pass
            </button>
            <button
              onClick={reset}
              className="rounded-lg bg-slate-700 px-4 py-2 transition-all duration-200 hover:bg-slate-600"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="max-h-64 space-y-3 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="py-8 text-center text-slate-500">
              No messages yet. Send a message and watch time pass...
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-lg border p-4 transition-all duration-300 ${
                  msg.receivedAt
                    ? "border-red-500/30 bg-red-950/30"
                    : "border-slate-600 bg-slate-800 opacity-50"
                }`}
              >
                <div className="mb-2 flex items-start justify-between">
                  <div className="text-sm font-medium text-slate-300">
                    Message #{msg.id}
                  </div>
                  <div className="text-xs text-slate-500">
                    {msg.receivedAt ? "Received" : "In transit..."}
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  Captured age:{" "}
                  <span className="font-mono text-amber-400">
                    {msg.capturedAge}
                  </span>
                </div>
                {msg.receivedAt && (
                  <div className="mt-2 border-t border-red-500/20 pt-2">
                    <div className="flex items-center gap-2 text-sm text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                      Current age is {tomAge}, but message says{" "}
                      {msg.capturedAge}!
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-950/30 p-4">
          <p className="text-sm leading-relaxed text-slate-300">
            <strong className="text-amber-300">The Problem:</strong> Each
            message captures Tom's age in a closure. By the time the async
            operation completes (3 seconds), the state has changed. The callback
            tries to update based on stale data—like Cooper's messages arriving
            decades late.
          </p>
        </div>
      </div>
    </div>
  );
}

// Chapter Three: Race Conditions Demo
function ChapterThree() {
  const [operations, setOperations] = useState<Operation[]>([]);
  const [finalState, setFinalState] = useState<string>("Initial");
  const [useProtection, setUseProtection] = useState(false);
  const operationIdRef = useRef(0);
  const versionRef = useRef(0);

  const startOperation = (name: string, duration: number, result: string) => {
    const opId = ++operationIdRef.current;
    const currentVersion = ++versionRef.current;
    const startTime = Date.now();

    setOperations((prev) => [
      ...prev,
      { id: opId, name, duration, startTime, result },
    ]);

    setTimeout(() => {
      setOperations((prev) =>
        prev.map((op) =>
          op.id === opId ? { ...op, endTime: Date.now() } : op,
        ),
      );

      if (useProtection) {
        // Check if this is still the most recent operation
        if (currentVersion === versionRef.current) {
          setFinalState(result);
        }
      } else {
        // No protection - always update
        setFinalState(result);
      }
    }, duration);
  };

  const runRaceCondition = () => {
    setOperations([]);
    setFinalState("Initial");
    versionRef.current = 0;

    // Operation A: slow (3s)
    startOperation("Fetch from Miller's Planet", 3000, "Data from Miller");

    // Operation B: fast (1s)
    setTimeout(() => {
      startOperation("Fetch from Endurance", 1000, "Data from Endurance");
    }, 500);
  };

  const reset = () => {
    setOperations([]);
    setFinalState("Initial");
    operationIdRef.current = 0;
    versionRef.current = 0;
  };

  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-slate-300">
          Cooper falls into Gargantua, trying to send quantum data to Murph. But
          messages sent in sequence don't arrive in sequence. Time dilation
          scrambles the order. Later dispatches complete before earlier ones.
          This is the race condition—operations completing out of order, each
          trying to update the same state.
        </p>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6 shadow-lg shadow-blue-500/10">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-blue-300">
          <Zap className="h-5 w-5" />
          Race Condition Simulator
        </h3>

        <div className="mb-6 flex items-center gap-4 rounded-lg border border-slate-700 bg-slate-950 p-4">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={useProtection}
              onChange={(e) => setUseProtection(e.target.checked)}
              className="h-4 w-4"
            />
            <span className="text-sm text-slate-300">
              Enable Version Protection (Tesseract Mode)
            </span>
          </label>
        </div>

        <div className="mb-6 rounded-lg border border-blue-500/30 bg-slate-950 p-6">
          <div className="mb-2 text-center text-sm font-medium text-blue-400">
            Final State
          </div>
          <div className="text-center font-mono text-3xl font-bold text-blue-300">
            {finalState}
          </div>
        </div>

        <div className="mb-6 max-h-48 space-y-3 overflow-y-auto">
          {operations.map((op) => (
            <div
              key={op.id}
              className={`rounded-lg border p-4 transition-all duration-300 ${
                op.endTime
                  ? "border-green-500/30 bg-green-950/30"
                  : "border-slate-600 bg-slate-800"
              }`}
            >
              <div className="mb-2 flex items-start justify-between">
                <div className="text-sm font-medium text-slate-300">
                  {op.name}
                </div>
                <div className="text-xs text-slate-500">
                  {op.endTime ? "Completed" : "Running..."}
                </div>
              </div>
              <div className="text-xs text-slate-400">
                Duration: {op.duration}ms • Result: {op.result}
              </div>
              {op.endTime && (
                <div className="mt-2 flex items-center gap-2 text-xs text-green-400">
                  <CheckCircle className="h-3 w-3" />
                  Completed at {new Date(op.endTime).toLocaleTimeString()}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={runRaceCondition}
            disabled={operations.some((op) => !op.endTime)}
            className="flex-1 rounded-lg bg-blue-600 px-6 py-2 font-medium transition-all duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            Start Race Condition
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-lg bg-slate-700 px-6 py-2 font-medium transition-all duration-200 hover:bg-slate-600"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        <div className="mt-6 rounded-lg border border-blue-500/20 bg-blue-950/30 p-4">
          <p className="text-sm leading-relaxed text-slate-300">
            <strong className="text-blue-300">The Race:</strong> Operation A
            starts first but takes 3 seconds. Operation B starts later but
            completes in 1 second. Without protection, B's result is overwritten
            by A's stale result. With version protection (tesseract mode), only
            the most recent operation updates state.
          </p>
        </div>
      </div>
    </div>
  );
}

// Chapter Four: Pattern Showcase
function ChapterFour() {
  const [selectedPattern, setSelectedPattern] = useState(0);

  const patterns = [
    {
      name: "Mounted Check",
      description: "Verify component is still mounted before updating state",
      code: `useEffect(() => {
  let isMounted = true;
  
  async function fetchData() {
    const data = await fetch('/api/data');
    
    if (isMounted) {
      setState(data);
    }
  }
  
  fetchData();
  
  return () => {
    isMounted = false;
  };
}, []);`,
      icon: CheckCircle,
    },
    {
      name: "AbortController",
      description: "Cancel network requests when component unmounts",
      code: `useEffect(() => {
  const controller = new AbortController();
  
  async function fetchData() {
    try {
      const response = await fetch('/api/data', {
        signal: controller.signal
      });
      setState(await response.json());
    } catch (error) {
      if (error.name === 'AbortError') return;
      throw error;
    }
  }
  
  fetchData();
  
  return () => controller.abort();
}, []);`,
      icon: AlertTriangle,
    },
    {
      name: "Version Numbers",
      description: "Track operation versions to ignore stale updates",
      code: `function useAsyncState(initial) {
  const [state, setState] = useState(initial);
  const versionRef = useRef(0);
  
  const setAsync = useCallback(async (fn) => {
    const version = ++versionRef.current;
    const newState = await fn();
    
    if (version === versionRef.current) {
      setState(newState);
    }
  }, []);
  
  return [state, setAsync];
}`,
      icon: Zap,
    },
    {
      name: "Dependency Arrays",
      description: "Re-run effects when dependencies change",
      code: `useEffect(() => {
  async function fetchUser() {
    const response = await fetch(
      \`/api/users/\${userId}\`
    );
    setUser(await response.json());
  }
  
  fetchUser();
}, [userId]); // Re-fetch when userId changes`,
      icon: Clock,
    },
    {
      name: "Race Condition Guard",
      description: "Ignore results from outdated operations",
      code: `useEffect(() => {
  let ignore = false;
  
  async function search() {
    const results = await fetch(
      \`/api/search?q=\${query}\`
    );
    
    if (!ignore) {
      setResults(await results.json());
    }
  }
  
  search();
  
  return () => {
    ignore = true;
  };
}, [query]);`,
      icon: Send,
    },
  ];

  const currentPattern = patterns[selectedPattern];
  const Icon = currentPattern.icon;

  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-slate-300">
          Cooper in the tesseract can see all moments simultaneously. He
          understands when to send data, to whom, and how to verify it arrives
          correctly. These five patterns give you the same power—the ability to
          see across async time and handle state updates correctly.
        </p>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6 shadow-lg shadow-blue-500/10">
        <h3 className="mb-4 text-xl font-bold text-blue-300">
          The Tesseract Toolkit
        </h3>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {patterns.map((pattern, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPattern(idx)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                selectedPattern === idx
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {pattern.name}
            </button>
          ))}
        </div>

        <div className="mb-4 rounded-lg border border-blue-500/30 bg-slate-950 p-6">
          <div className="mb-4 flex items-center gap-3">
            <Icon className="h-6 w-6 text-blue-400" />
            <div>
              <h4 className="text-lg font-bold text-blue-300">
                {currentPattern.name}
              </h4>
              <p className="text-sm text-slate-400">
                {currentPattern.description}
              </p>
            </div>
          </div>

          <pre className="overflow-x-auto rounded-lg border border-slate-700 bg-slate-900 p-4">
            <code className="font-mono text-sm text-slate-300">
              {currentPattern.code}
            </code>
          </pre>
        </div>

        <div className="rounded-lg border border-blue-500/20 bg-blue-950/30 p-4">
          <p className="text-sm leading-relaxed text-slate-300">
            <strong className="text-blue-300">The Principle:</strong> All these
            patterns share one insight—async operations must be aware of their
            temporal context. Check if you're still relevant. Cancel if needed.
            Version your updates. Respect dependencies. Guard against races.
          </p>
        </div>
      </div>
    </div>
  );
}

// Chapter Five: Comparison Tool
function ChapterFive() {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-slate-300">
          Cooper floats in space, rescued from the black hole. Time dilation is
          not a bug—it's fundamental. Async execution is not a bug—it's
          necessary. The question is not "how do I avoid async?" but "how do I
          handle it correctly?"
        </p>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6 shadow-lg shadow-blue-500/10">
        <h3 className="mb-4 text-xl font-bold text-blue-300">
          The Three Truths of Async State
        </h3>

        <div className="mb-6 space-y-4">
          <div className="rounded-lg border border-blue-500/30 bg-slate-950 p-4">
            <h4 className="mb-2 text-lg font-bold text-blue-300">
              Truth 1: Your closure is a time capsule
            </h4>
            <p className="text-sm leading-relaxed text-slate-300">
              When you capture variables in an async callback, you're capturing
              a snapshot. By the time your callback executes, that moment is in
              the past. Always check if captured values are still current.
            </p>
          </div>

          <div className="rounded-lg border border-amber-500/30 bg-slate-950 p-4">
            <h4 className="mb-2 text-lg font-bold text-amber-300">
              Truth 2: Operations complete out of order
            </h4>
            <p className="text-sm leading-relaxed text-slate-300">
              You dispatch operation A, then B. B might complete first. If both
              update the same state, you have a race condition. The order you
              dispatch is not the order they complete.
            </p>
          </div>

          <div className="rounded-lg border border-green-500/30 bg-slate-950 p-4">
            <h4 className="mb-2 text-lg font-bold text-green-300">
              Truth 3: Only the current update matters
            </h4>
            <p className="text-sm leading-relaxed text-slate-300">
              Your component might dispatch dozens of async operations. Only the
              most recent one should update state. The others should recognize
              they're stale and abort.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="mb-6 w-full rounded-lg bg-blue-600 px-6 py-3 font-medium transition-all duration-200 hover:bg-blue-500"
        >
          {showComparison ? "Hide" : "Show"} Incorrect vs Correct Comparison
        </button>

        {showComparison && (
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-4">
              <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Incorrect: No Protection
              </h4>
              <pre className="mb-3 overflow-x-auto rounded border border-red-500/20 bg-slate-900 p-3">
                <code className="font-mono text-xs text-slate-300">
                  {`useEffect(() => {
  async function fetchData() {
    const data = await fetch('/api');
    setState(data);
  }
  fetchData();
}, []);

// Problems:
// - No mounted check
// - No cleanup
// - No race protection
// - Stale updates possible`}
                </code>
              </pre>
              <div className="text-xs text-red-400">
                ❌ Memory leaks
                <br />
                ❌ Race conditions
                <br />❌ Stale state updates
              </div>
            </div>

            <div className="rounded-lg border border-green-500/30 bg-green-950/30 p-4">
              <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-green-400">
                <CheckCircle className="h-5 w-5" />
                Correct: Full Protection
              </h4>
              <pre className="mb-3 overflow-x-auto rounded border border-green-500/20 bg-slate-900 p-3">
                <code className="font-mono text-xs text-slate-300">
                  {`useEffect(() => {
  let ignore = false;
  const controller = new AbortController();
  
  async function fetchData() {
    const data = await fetch('/api', {
      signal: controller.signal
    });
    if (!ignore) setState(data);
  }
  
  fetchData();
  
  return () => {
    ignore = true;
    controller.abort();
  };
}, []);`}
                </code>
              </pre>
              <div className="text-xs text-green-400">
                ✓ Mounted check
                <br />
                ✓ Request cancellation
                <br />✓ Race protection
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-blue-500/20 bg-blue-950/30 p-4">
          <p className="mb-3 text-sm leading-relaxed text-slate-300">
            <strong className="text-blue-300">The Mission Continues:</strong>{" "}
            Cooper steals a ship and heads toward Edmunds' planet. It will take
            decades, but Brand is waiting. The async operation completes
            successfully—not because it was fast, but because it was handled
            correctly.
          </p>
          <p className="text-sm leading-relaxed text-slate-300">
            Your applications are the same. They're not fast—network requests
            take time, computations take time. But they can be correct. Every
            async operation is a journey through time dilation. The tesseract
            pattern gives you the tools to bridge that gap.
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-blue-500/30 bg-gradient-to-r from-blue-950/50 to-amber-950/50 p-6 text-center">
        <p className="mb-2 text-2xl font-bold text-blue-300">
          One Hour There, Seven Years Here
        </p>
        <p className="leading-relaxed text-slate-300">
          That's the fundamental equation of async state. Inside your callback,
          time feels normal. Outside, the world races forward. You can't change
          the equation. But you can account for it.
        </p>
        <p className="mt-4 text-sm italic text-slate-400">
          Choose the tesseract. Stay synchronized. Handle async correctly.
        </p>
      </div>
    </div>
  );
}
