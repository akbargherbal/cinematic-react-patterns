import { useState, useEffect, useRef, useCallback } from "react";
import { Clock, Send, Zap, CheckCircle, AlertTriangle, Play, Pause, RotateCcw } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-100 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
            Interstellar: Async State
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Cooper, Gargantua, 2014 • Asynchronous State &amp; Race Conditions
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 pb-32">
        {/* Chapter Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-300 mb-2">
            {currentChapter.title}
          </h2>
          <p className="text-slate-400 text-lg">{currentChapter.subtitle}</p>
        </div>

        {/* Chapter Content */}
        {chapter === 0 &amp;&amp; <ChapterOne />}
        {chapter === 1 &amp;&amp; <ChapterTwo />}
        {chapter === 2 &amp;&amp; <ChapterThree />}
        {chapter === 3 &amp;&amp; <ChapterFour />}
        {chapter === 4 &amp;&amp; <ChapterFive />}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => setChapter((c) => c - 1)}
            disabled={chapter === 0}
            className="px-4 md:px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-lg transition-all duration-200 text-sm md:text-base font-medium"
          >
            Previous
          </button>

          <div className="flex gap-2">
            {chapters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setChapter(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  idx === chapter
                    ? "bg-blue-400 w-8"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Go to chapter ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setChapter((c) => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="px-4 md:px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed rounded-lg transition-all duration-200 text-sm md:text-base font-medium"
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

      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 shadow-lg shadow-blue-500/10">
        <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Time Dilation Simulator
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Miller's Planet Clock */}
          <div className="bg-slate-950 border border-blue-500/30 rounded-lg p-6 text-center">
            <div className="text-sm text-blue-400 mb-2 font-medium">
              Miller's Planet (Async Context)
            </div>
            <div className="text-5xl font-bold text-blue-300 mb-2 font-mono">
              {planetTime}s
            </div>
            <div className="text-xs text-slate-500">Inside the callback</div>
          </div>

          {/* Earth Clock */}
          <div className="bg-slate-950 border border-amber-500/30 rounded-lg p-6 text-center">
            <div className="text-sm text-amber-400 mb-2 font-medium">
              Earth (Main Thread)
            </div>
            <div className="text-5xl font-bold text-amber-300 mb-2 font-mono">
              {earthTime}s
            </div>
            <div className="text-xs text-slate-500">Outside the callback</div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Start Mission
              </>
            )}
          </button>
          <button
            onClick={reset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-950/30 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-slate-300 leading-relaxed">
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
          msg.id === messageId ? { ...msg, receivedAt: Date.now() } : msg
        )
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

      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 shadow-lg shadow-amber-500/10">
        <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
          <Send className="w-5 h-5" />
          Stale Closure Visualizer
        </h3>

        <div className="bg-slate-950 border border-amber-500/30 rounded-lg p-6 mb-6 text-center">
          <div className="text-sm text-amber-400 mb-2 font-medium">
            Tom's Current Age (State)
          </div>
          <div className="text-5xl font-bold text-amber-300 mb-4 font-mono">
            {tomAge}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={sendMessage}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-500 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Send Message (Capture State)
            </button>
            <button
              onClick={ageUp}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 font-medium"
            >
              +5 Years Pass
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-slate-500 py-8">
              No messages yet. Send a message and watch time pass...
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  msg.receivedAt
                    ? "bg-red-950/30 border-red-500/30"
                    : "bg-slate-800 border-slate-600 opacity-50"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-slate-300">
                    Message #{msg.id}
                  </div>
                  <div className="text-xs text-slate-500">
                    {msg.receivedAt ? "Received" : "In transit..."}
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  Captured age: <span className="text-amber-400 font-mono">{msg.capturedAge}</span>
                </div>
                {msg.receivedAt &amp;&amp; (
                  <div className="mt-2 pt-2 border-t border-red-500/20">
                    <div className="text-sm text-red-400 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Current age is {tomAge}, but message says {msg.capturedAge}!
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="mt-6 p-4 bg-amber-950/30 border border-amber-500/20 rounded-lg">
          <p className="text-sm text-slate-300 leading-relaxed">
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
          op.id === opId ? { ...op, endTime: Date.now() } : op
        )
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

      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 shadow-lg shadow-blue-500/10">
        <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Race Condition Simulator
        </h3>

        <div className="mb-6 flex items-center gap-4 p-4 bg-slate-950 border border-slate-700 rounded-lg">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useProtection}
              onChange={(e) => setUseProtection(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-300">
              Enable Version Protection (Tesseract Mode)
            </span>
          </label>
        </div>

        <div className="bg-slate-950 border border-blue-500/30 rounded-lg p-6 mb-6">
          <div className="text-sm text-blue-400 mb-2 font-medium text-center">
            Final State
          </div>
          <div className="text-3xl font-bold text-center text-blue-300 font-mono">
            {finalState}
          </div>
        </div>

        <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
          {operations.map((op) => (
            <div
              key={op.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                op.endTime
                  ? "bg-green-950/30 border-green-500/30"
                  : "bg-slate-800 border-slate-600"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
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
              {op.endTime &amp;&amp; (
                <div className="mt-2 text-xs text-green-400 flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
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
            className="flex-1 px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-all duration-200 font-medium"
          >
            Start Race Condition
          </button>
          <button
            onClick={reset}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all duration-200 font-medium flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-950/30 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-slate-300 leading-relaxed">
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

      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 shadow-lg shadow-blue-500/10">
        <h3 className="text-xl font-bold text-blue-300 mb-4">
          The Tesseract Toolkit
        </h3>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {patterns.map((pattern, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPattern(idx)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap text-sm font-medium ${
                selectedPattern === idx
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {pattern.name}
            </button>
          ))}
        </div>

        <div className="bg-slate-950 border border-blue-500/30 rounded-lg p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <Icon className="w-6 h-6 text-blue-400" />
            <div>
              <h4 className="text-lg font-bold text-blue-300">
                {currentPattern.name}
              </h4>
              <p className="text-sm text-slate-400">
                {currentPattern.description}
              </p>
            </div>
          </div>

          <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-slate-300 font-mono">
              {currentPattern.code}
            </code>
          </pre>
        </div>

        <div className="p-4 bg-blue-950/30 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-slate-300 leading-relaxed">
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

      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 shadow-lg shadow-blue-500/10">
        <h3 className="text-xl font-bold text-blue-300 mb-4">
          The Three Truths of Async State
        </h3>

        <div className="space-y-4 mb-6">
          <div className="bg-slate-950 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-lg font-bold text-blue-300 mb-2">
              Truth 1: Your closure is a time capsule
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              When you capture variables in an async callback, you're capturing
              a snapshot. By the time your callback executes, that moment is in
              the past. Always check if captured values are still current.
            </p>
          </div>

          <div className="bg-slate-950 border border-amber-500/30 rounded-lg p-4">
            <h4 className="text-lg font-bold text-amber-300 mb-2">
              Truth 2: Operations complete out of order
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              You dispatch operation A, then B. B might complete first. If both
              update the same state, you have a race condition. The order you
              dispatch is not the order they complete.
            </p>
          </div>

          <div className="bg-slate-950 border border-green-500/30 rounded-lg p-4">
            <h4 className="text-lg font-bold text-green-300 mb-2">
              Truth 3: Only the current update matters
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Your component might dispatch dozens of async operations. Only the
              most recent one should update state. The others should recognize
              they're stale and abort.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowComparison(!showComparison)}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 font-medium mb-6"
        >
          {showComparison ? "Hide" : "Show"} Incorrect vs Correct Comparison
        </button>

        {showComparison &amp;&amp; (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
              <h4 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Incorrect: No Protection
              </h4>
              <pre className="bg-slate-900 border border-red-500/20 rounded p-3 overflow-x-auto mb-3">
                <code className="text-xs text-slate-300 font-mono">
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
                ❌ Memory leaks<br />
                ❌ Race conditions<br />
                ❌ Stale state updates
              </div>
            </div>

            <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-4">
              <h4 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Correct: Full Protection
              </h4>
              <pre className="bg-slate-900 border border-green-500/20 rounded p-3 overflow-x-auto mb-3">
                <code className="text-xs text-slate-300 font-mono">
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
                ✓ Mounted check<br />
                ✓ Request cancellation<br />
                ✓ Race protection
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-blue-950/30 border border-blue-500/20 rounded-lg">
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            <strong className="text-blue-300">The Mission Continues:</strong>{" "}
            Cooper steals a ship and heads toward Edmunds' planet. It will take
            decades, but Brand is waiting. The async operation completes
            successfully—not because it was fast, but because it was handled
            correctly.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your applications are the same. They're not fast—network requests
            take time, computations take time. But they can be correct. Every
            async operation is a journey through time dilation. The tesseract
            pattern gives you the tools to bridge that gap.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-950/50 to-amber-950/50 border border-blue-500/30 rounded-lg p-6 text-center">
        <p className="text-2xl font-bold text-blue-300 mb-2">
          One Hour There, Seven Years Here
        </p>
        <p className="text-slate-300 leading-relaxed">
          That's the fundamental equation of async state. Inside your callback,
          time feels normal. Outside, the world races forward. You can't change
          the equation. But you can account for it.
        </p>
        <p className="text-sm text-slate-400 mt-4 italic">
          Choose the tesseract. Stay synchronized. Handle async correctly.
        </p>
      </div>
    </div>
  );
}