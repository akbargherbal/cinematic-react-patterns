import { useState, useEffect, useTransition, useCallback } from "react";
import { Film, Play, Pause, RotateCcw, Phone, Zap } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface DemoMetrics {
  renderCount: number;
  blockedTime: number;
  droppedInputs: number;
  responsiveInputs: number;
}

export default function ConcurrentRenderingPulpFiction(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [showDemo, setShowDemo] = useState<boolean>(true);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Tapestry",
      content: `**"We're not making a timeline. We're making a tapestry."**

In a dark editing bay, three film reels labeled VINCENT, BUTCH, and JULES sit on separate machines. Quentin, the director, explains his vision: don't show one story then the next—prepare them all at once, ready to be woven together.

**React's concurrent mode**: Like Quentin's editing bay, React can work on multiple UI updates simultaneously in the background, ready to show whichever one matters most at any moment.`,
    },
    {
      id: "build",
      title: "The Linear Cut",
      content: `**"The whole movie just... stopped. We're blocked."**

Lawrence forces Quentin to create a chronological cut. They watch a slow scene—then the phone rings. An urgent call from the studio. But they can't stop the projector mid-scene. By the time it finishes, the call is gone.

**Legacy rendering**: One long update blocks everything. User input queues up helplessly while the main thread grinds through expensive work.`,
    },
    {
      id: "climax",
      title: "The Scheduler",
      content: `**"Pause the boxer. Show me the hitman. Now."**

Quentin unveils his custom switchboard—The Scheduler. He starts rendering Butch's long escape scene. The phone rings. He flips a switch: the reel pauses instantly. Another switch: Vincent's short scene plays. He takes the call. Then he flips back—Butch's scene resumes from the exact frame it paused on.

**useTransition & Concurrent Features**: React can pause low-priority work, handle urgent updates immediately, then seamlessly resume background work—all without losing progress.`,
    },
    {
      id: "resolution",
      title: "Traffic Jam vs. Dance",
      content: `**"One is a traffic jam. The other is a dance."**

**Approach A (Linear)**: An assistant tries typing "WHERE IS THE BRIEFCASE?" while a long monologue plays. The teletype is frozen. Keys clatter uselessly. When the scene finally ends, all the buffered letters print in a jarring burst.

**Approach B (Concurrent)**: Same test with the Scheduler. The typing starts, the Scheduler detects it, gracefully dims the background scene, and letters print instantly. The rhythm never breaks.

**The lesson**: Blocking renders create traffic jams. Concurrent rendering creates a dance—everything yields gracefully to what matters most right now.`,
    },
    {
      id: "summary",
      title: "The Premiere",
      content: `**"Show the most important piece at the most important time."**

Opening night. The audience is captivated by the non-linear story—never confused, always engaged. Quentin realizes the magic wasn't just editing multiple stories at once; it was knowing which piece to show at which moment.

**React concurrent rendering**: Prepare everything in the background. Prioritize what the user needs right now. Keep the experience fluid, responsive, and delightful.`,
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-red-950/20 text-zinc-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Film className="h-6 w-6 text-red-500 sm:h-8 sm:w-8" />
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
                Pulp Fiction
              </h1>
            </div>
            <p className="text-xs text-zinc-400 sm:text-sm md:text-base">
              Quentin Tarantino • 1994
            </p>
          </div>
          <p className="text-sm font-medium text-amber-500 sm:text-base md:text-lg">
            Concurrent Rendering
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Narrative Column */}
          <div className="lg:col-span-7">
            <div className="mb-8 lg:mb-12">
              <h2 className="mb-4 text-2xl font-bold text-red-400 sm:mb-6 sm:text-3xl">
                {currentChapter.title}
              </h2>
              <div className="prose prose-invert prose-zinc max-w-none">
                {currentChapter.content.split("\n\n").map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="mb-4 text-base leading-relaxed text-zinc-300 sm:text-lg"
                  >
                    {paragraph.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-amber-400">
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <DemoSection chapter={chapter} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex items-center justify-between border-t border-zinc-800 pt-8 sm:mt-12">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:py-3 sm:text-base"
          >
            Previous
          </button>
          <div className="text-center">
            <span className="mb-1 block text-xs text-zinc-400 sm:text-sm">
              Progress
            </span>
            <span className="font-mono text-sm text-amber-400 sm:text-base">
              Chapter {chapter + 1} of {chapters.length}
            </span>
          </div>
          <button
            onClick={() =>
              setChapter(Math.min(chapters.length - 1, chapter + 1))
            }
            disabled={chapter === chapters.length - 1}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:py-3 sm:text-base"
          >
            Next
          </button>
        </nav>
      </main>
    </div>
  );
}

// Demo Section Component
function DemoSection({ chapter }: { chapter: number }): JSX.Element {
  switch (chapter) {
    case 0:
      return <TapestryDemo />;
    case 1:
      return <BlockingDemo />;
    case 2:
      return <SchedulerDemo />;
    case 3:
      return <ComparisonDemo />;
    case 4:
      return <SummaryDemo />;
    default:
      return <TapestryDemo />;
  }
}

// Chapter 1: The Tapestry - Preparing Multiple UI States
function TapestryDemo(): JSX.Element {
  const [activeReel, setActiveReel] = useState<string | null>(null);

  const reels = [
    { id: "vincent", label: "VINCENT", color: "text-blue-400 border-blue-500" },
    { id: "butch", label: "BUTCH", color: "text-orange-400 border-orange-500" },
    { id: "jules", label: "JULES", color: "text-purple-400 border-purple-500" },
  ];

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-bold text-amber-400 sm:text-xl">
          Multiple States, One Timeline
        </h3>
      </div>

      <p className="mb-6 text-xs text-zinc-400 sm:text-sm">
        Click each reel to "prepare" it. React can work on all three UI updates
        simultaneously in the background.
      </p>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {reels.map((reel) => (
          <button
            key={reel.id}
            onClick={() => setActiveReel(reel.id)}
            className={`rounded-lg border-2 p-3 transition-all sm:p-4 ${
              activeReel === reel.id
                ? `${reel.color} bg-zinc-800`
                : "border-zinc-700 text-zinc-500 hover:border-zinc-600"
            }`}
          >
            <Film className="mx-auto mb-2 h-6 w-6 sm:h-8 sm:w-8" />
            <span className="font-mono text-xs font-bold sm:text-sm">
              {reel.label}
            </span>
          </button>
        ))}
      </div>

      {activeReel && (
        <div className="animate-in fade-in rounded-lg border border-amber-500/30 bg-zinc-800/50 p-3 duration-300 sm:p-4">
          <p className="text-xs text-amber-400 sm:text-sm">
            ✓ Reel "
            <span className="font-bold">{activeReel.toUpperCase()}</span>" is
            being prepared in the background. React doesn't need to show it
            yet—it's ready when needed.
          </p>
        </div>
      )}

      <div className="mt-6 border-t border-zinc-700 pt-6">
        <p className="text-xs text-zinc-500 italic">
          💡 In concurrent mode, React can prepare multiple component trees
          without committing any to the DOM yet.
        </p>
      </div>
    </div>
  );
}

// Chapter 2: The Linear Cut - Blocking Render Demo
function BlockingDemo(): JSX.Element {
  const [isBlocking, setIsBlocking] = useState<boolean>(false);
  const [phoneRinging, setPhoneRinging] = useState<boolean>(false);
  const [callMissed, setCallMissed] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const startBlockingRender = useCallback(() => {
    setIsBlocking(true);
    setCallMissed(false);
    setProgress(0);

    // Simulate long, blocking render
    const startTime = Date.now();
    const duration = 3000; // 3 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsBlocking(false);
        setPhoneRinging(false);
        if (phoneRinging) {
          setCallMissed(true);
        }
      }
    }, 50);

    // Phone rings during blocking render
    setTimeout(() => {
      if (isBlocking) {
        setPhoneRinging(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isBlocking, phoneRinging]);

  const reset = () => {
    setIsBlocking(false);
    setPhoneRinging(false);
    setCallMissed(false);
    setProgress(0);
  };

  const blockingCode = `// ❌ Blocking Render - Legacy React
function BlockingComponent() {
  const [items, setItems] = useState([]);
  
  const loadData = () => {
    // Heavy synchronous work blocks everything
    const result = expensiveCalculation(); // 3 seconds
    setItems(result);
    // User input is completely frozen during this time
  };
  
  return <div onClick={loadData}>Load Data</div>;
}`;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Phone
          className={`h-5 w-5 ${phoneRinging ? "animate-pulse text-red-500" : "text-zinc-500"}`}
        />
        <h3 className="text-lg font-bold text-red-400 sm:text-xl">
          Blocking Render
        </h3>
      </div>

      <p className="mb-6 text-xs text-zinc-400 sm:text-sm">
        Start the "long scene". Notice the phone rings but cannot be answered
        until the scene finishes.
      </p>

      {/* Controls */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={startBlockingRender}
          disabled={isBlocking}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30 sm:text-base"
        >
          <Play className="h-4 w-4" />
          {isBlocking ? "RENDERING..." : "Start Scene"}
        </button>
        <button
          onClick={reset}
          className="rounded-lg bg-zinc-700 px-4 py-3 text-white transition-all hover:bg-zinc-600"
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Visual Feedback */}
      <div className="mb-6 space-y-4">
        {/* Progress Bar */}
        <div className="rounded-lg bg-zinc-800 p-3 sm:p-4">
          <div className="mb-2 flex justify-between text-xs text-zinc-400">
            <span>Render Progress</span>
            <span className="font-mono">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-700">
            <div
              className="h-2 rounded-full bg-red-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Phone Status */}
        <div
          className={`rounded-lg border-2 p-3 transition-all sm:p-4 ${
            phoneRinging
              ? "animate-pulse border-red-500 bg-red-950/30"
              : callMissed
                ? "border-red-700 bg-red-950/20"
                : "border-zinc-700 bg-zinc-800/30"
          }`}
        >
          <div className="flex items-center gap-3">
            <Phone
              className={`h-5 w-5 sm:h-6 sm:w-6 ${
                phoneRinging
                  ? "text-red-400"
                  : callMissed
                    ? "text-red-600"
                    : "text-zinc-500"
              }`}
            />
            <div>
              <p className="text-sm font-semibold sm:text-base">
                {phoneRinging
                  ? "📞 PHONE RINGING!"
                  : callMissed
                    ? "❌ Call Missed"
                    : "☎️ Phone Idle"}
              </p>
              {isBlocking && phoneRinging && (
                <p className="mt-1 text-xs text-red-400">
                  UI is blocked - can't answer!
                </p>
              )}
              {callMissed && (
                <p className="mt-1 text-xs text-red-500">
                  "The whole movie just... stopped. We're blocked."
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <CodeBlock
        code={blockingCode}
        variant="error"
        title="// ❌ Blocking Pattern"
        language="tsx"
        defaultExpanded={true}
      />

      <div className="mt-4 border-t border-zinc-700 pt-4">
        <p className="text-xs text-zinc-500">
          ⚠️ <strong>The Problem</strong>: Heavy work locks the main thread.
          User interactions queue up and feel broken.
        </p>
      </div>
    </div>
  );
}

// Chapter 3: The Scheduler - useTransition Demo
function SchedulerDemo(): JSX.Element {
  const [isPending, startTransition] = useTransition();
  const [heavyWork, setHeavyWork] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const [phoneAnswered, setPhoneAnswered] = useState<boolean>(false);

  const startHeavyWork = () => {
    setPhoneAnswered(false);
    startTransition(() => {
      setHeavyWork(true);
      // Simulate heavy background work
      setTimeout(() => {
        setHeavyWork(false);
      }, 3000);
    });
  };

  const handleInput = (value: string) => {
    setUserInput(value);
    setPhoneAnswered(true);
  };

  const reset = () => {
    setHeavyWork(false);
    setUserInput("");
    setPhoneAnswered(false);
  };

  const concurrentCode = `// ✅ Concurrent Rendering with useTransition
function ConcurrentComponent() {
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState([]);
  
  const loadData = () => {
    // Mark this update as low-priority (deferrable)
    startTransition(() => {
      const result = expensiveCalculation(); // 3 seconds
      setItems(result);
    });
    // User input remains responsive during background work!
  };
  
  return (
    <div onClick={loadData}>
      Load Data {isPending && "(Loading...)"}
    </div>
  );
}`;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-bold text-amber-400 sm:text-xl">
          The Scheduler
        </h3>
      </div>

      <p className="mb-6 text-xs text-zinc-400 sm:text-sm">
        Start heavy work, then try typing. The UI stays responsive—you can
        "answer the phone" immediately.
      </p>

      {/* Controls */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={startHeavyWork}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-3 text-sm font-semibold text-black transition-all hover:bg-amber-500 sm:text-base"
        >
          <Play className="h-4 w-4" />
          {isPending ? "WORKING..." : "Start Background Work"}
        </button>
        <button
          onClick={reset}
          className="rounded-lg bg-zinc-700 px-4 py-3 text-white transition-all hover:bg-zinc-600"
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Interactive Input */}
      <div className="mb-6 space-y-4">
        <div className="rounded-lg bg-zinc-800 p-3 sm:p-4">
          <label className="mb-2 block text-xs text-zinc-400">
            Type to "answer the phone":
          </label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Type anything..."
            className="w-full rounded border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-white transition-colors focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div
            className={`rounded-lg border-2 p-3 ${
              isPending
                ? "border-amber-500 bg-amber-950/20"
                : "border-zinc-700 bg-zinc-800/30"
            }`}
          >
            <p className="text-xs text-zinc-400">Background Work</p>
            <p className="mt-1 text-sm font-semibold text-amber-400">
              {isPending ? "⏳ In Progress" : "✓ Idle"}
            </p>
          </div>
          <div
            className={`rounded-lg border-2 p-3 ${
              phoneAnswered
                ? "border-green-500 bg-green-950/20"
                : "border-zinc-700 bg-zinc-800/30"
            }`}
          >
            <p className="text-xs text-zinc-400">User Input</p>
            <p className="mt-1 text-sm font-semibold text-green-400">
              {phoneAnswered ? "✓ Responsive" : "Waiting..."}
            </p>
          </div>
        </div>
      </div>

      {/* Code Comparison */}
      <CodeBlock
        code={concurrentCode}
        variant="success"
        title="// ✅ Concurrent Pattern"
        language="tsx"
        defaultExpanded={true}
      />

      <div className="mt-4 border-t border-zinc-700 pt-4">
        <p className="text-xs text-zinc-500">
          ✨ <strong>The Solution</strong>: useTransition marks updates as
          deferrable. React can pause them to handle urgent work, then
          seamlessly resume.
        </p>
      </div>
    </div>
  );
}

// Chapter 4: Traffic Jam vs. Dance - Side-by-Side Comparison
function ComparisonDemo(): JSX.Element {
  const [mode, setMode] = useState<"blocking" | "concurrent">("blocking");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [blockedInputs, setBlockedInputs] = useState<number>(0);
  const [successfulInputs, setSuccessfulInputs] = useState<number>(0);
  const [metrics, setMetrics] = useState<DemoMetrics>({
    renderCount: 0,
    blockedTime: 0,
    droppedInputs: 0,
    responsiveInputs: 0,
  });

  // Circuit breaker
  useEffect(() => {
    if (blockedInputs >= 50) {
      reset();
    }
  }, [blockedInputs]);

  const runComparison = (approach: "blocking" | "concurrent") => {
    setMode(approach);
    setIsRunning(true);

    if (approach === "blocking") {
      // Simulate blocking behavior
      const startTime = Date.now();
      setTimeout(() => {
        const elapsed = Date.now() - startTime;
        setMetrics((prev) => ({
          ...prev,
          renderCount: prev.renderCount + 1,
          blockedTime: prev.blockedTime + elapsed,
          droppedInputs: prev.droppedInputs + 3,
        }));
        setBlockedInputs((prev) => prev + 3);
        setIsRunning(false);
      }, 2000);
    } else {
      // Simulate concurrent behavior
      setTimeout(() => {
        setMetrics((prev) => ({
          ...prev,
          renderCount: prev.renderCount + 1,
          responsiveInputs: prev.responsiveInputs + 3,
        }));
        setSuccessfulInputs((prev) => prev + 3);
        setIsRunning(false);
      }, 200);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setBlockedInputs(0);
    setSuccessfulInputs(0);
    setMetrics({
      renderCount: 0,
      blockedTime: 0,
      droppedInputs: 0,
      responsiveInputs: 0,
    });
  };

  const blockingExample = `// ❌ Approach A: The Linear Cut
function LinearUI() {
  // Long monologue blocks everything
  const renderMonologue = () => {
    expensiveWork(); // UI frozen
    // User typing is blocked
  };
}`;

  const concurrentExample = `// ✅ Approach B: The Concurrent Cut
function ConcurrentUI() {
  const [isPending, startTransition] = useTransition();
  
  const renderMonologue = () => {
    startTransition(() => {
      expensiveWork(); // Deferrable
    });
    // User typing stays responsive!
  };
}`;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Film className="h-5 w-5 text-red-400" />
        <h3 className="text-lg font-bold text-red-400 sm:text-xl">
          Traffic Jam vs. Dance
        </h3>
      </div>

      <p className="mb-6 text-xs text-zinc-400 sm:text-sm">
        Compare blocking vs. concurrent rendering side-by-side.
      </p>

      {/* Mode Toggle */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => runComparison("blocking")}
          disabled={isRunning}
          className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm text-white transition-all hover:bg-red-700 disabled:opacity-30"
        >
          🚦 Run Blocking
        </button>
        <button
          onClick={() => runComparison("concurrent")}
          disabled={isRunning}
          className="flex-1 rounded-lg bg-green-600 px-4 py-3 text-sm text-white transition-all hover:bg-green-700 disabled:opacity-30"
        >
          💃 Run Concurrent
        </button>
        <button
          onClick={reset}
          className="rounded-lg bg-zinc-700 px-4 py-3 text-white transition-all hover:bg-zinc-600"
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Metrics Dashboard */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-zinc-800 p-3">
          <p className="text-xs text-zinc-400">Dropped Inputs</p>
          <p className="mt-1 font-mono text-xl font-bold text-red-400 sm:text-2xl">
            {metrics.droppedInputs}
          </p>
        </div>
        <div className="rounded-lg bg-zinc-800 p-3">
          <p className="text-xs text-zinc-400">Responsive Inputs</p>
          <p className="mt-1 font-mono text-xl font-bold text-green-400 sm:text-2xl">
            {metrics.responsiveInputs}
          </p>
        </div>
        <div className="rounded-lg bg-zinc-800 p-3">
          <p className="text-xs text-zinc-400">Blocked Time (ms)</p>
          <p className="mt-1 font-mono text-xl font-bold text-amber-400 sm:text-2xl">
            {metrics.blockedTime}
          </p>
        </div>
        <div className="rounded-lg bg-zinc-800 p-3">
          <p className="text-xs text-zinc-400">Total Renders</p>
          <p className="mt-1 font-mono text-xl font-bold text-blue-400 sm:text-2xl">
            {metrics.renderCount}
          </p>
        </div>
      </div>

      {/* Code Comparison */}
      <div className="space-y-3">
        <CodeBlock
          code={blockingExample}
          variant="error"
          title="// ❌ Blocking (Traffic Jam)"
          language="tsx"
        />
        <CodeBlock
          code={concurrentExample}
          variant="success"
          title="// ✅ Concurrent (Dance)"
          language="tsx"
        />
      </div>

      <div className="mt-4 border-t border-zinc-700 pt-4">
        <p className="text-xs text-zinc-500">
          🎯 <strong>The Difference</strong>: Blocking creates frustration.
          Concurrent creates flow.
          {blockedInputs >= 45 && (
            <span className="ml-2 text-red-400">
              (Circuit breaker approaching - will reset at 50)
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

// Chapter 5: The Premiere - Summary Demo
function SummaryDemo(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  const allItems = [
    "Vincent Vega",
    "Jules Winnfield",
    "Mia Wallace",
    "Butch Coolidge",
    "Marsellus Wallace",
    "Pumpkin",
    "Honey Bunny",
    "Winston Wolf",
    "Brett",
    "Captain Koons",
    "Fabienne",
    "Lance",
    "Jody",
    "Marvin",
    "The Gimp",
    "Zed",
    "Maynard",
    "Esmeralda Villalobos",
  ];

  useEffect(() => {
    if (searchTerm) {
      startTransition(() => {
        // Simulate expensive filtering
        const results = allItems.filter((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredItems(results);
      });
    } else {
      setFilteredItems(allItems);
    }
  }, [searchTerm]);

  const summaryCode = `// 🎬 Real-World Example: Responsive Search
function SearchableList() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);

  const handleSearch = (value: string) => {
    setQuery(value); // Immediate update
    
    startTransition(() => {
      // Heavy filtering is deferrable
      const filtered = expensiveFilter(items, value);
      setResults(filtered);
    });
  };

  return (
    <div>
      <input 
        value={query}
        onChange={e => handleSearch(e.target.value)}
        // Input stays responsive even during heavy work
      />
      <List items={results} isPending={isPending} />
    </div>
  );
}`;

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Film className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-bold text-amber-400 sm:text-xl">
          The Premiere
        </h3>
      </div>

      <p className="mb-6 text-xs text-zinc-400 sm:text-sm">
        Search through characters. Notice how the input stays responsive even as
        results update.
      </p>

      {/* Search Demo */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search characters..."
            className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-3 text-sm text-white transition-colors focus:border-amber-500 focus:outline-none sm:text-base"
          />
          {isPending && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
            </div>
          )}
        </div>

        <div className="mt-4 max-h-64 overflow-y-auto rounded-lg bg-zinc-800 p-4">
          {filteredItems.length > 0 ? (
            <ul className="space-y-2">
              {filteredItems.map((item, idx) => (
                <li
                  key={idx}
                  className="border-b border-zinc-700 py-1 text-sm text-zinc-300 last:border-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500 italic">No characters found</p>
          )}
        </div>
      </div>

      {/* Code Example */}
      <CodeBlock
        code={summaryCode}
        variant="success"
        title="// ✅ Concurrent Rendering in Action"
        language="tsx"
        defaultExpanded={false}
      />

      <div className="mt-6 space-y-3 border-t border-zinc-700 pt-6">
        <div className="rounded-lg border border-amber-500/30 bg-amber-950/30 p-4">
          <p className="mb-2 text-sm font-semibold text-amber-400">
            ✨ Key Takeaway
          </p>
          <p className="text-xs text-zinc-300 sm:text-sm">
            <strong>
              "Show the most important piece at the most important time."
            </strong>
            <br />
            Concurrent rendering lets React prepare everything in the background
            while always prioritizing what the user needs <em>right now</em>.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <div className="rounded-lg bg-zinc-800 p-3">
            <p className="mb-1 text-zinc-400">🎭 The Metaphor</p>
            <p className="text-zinc-200">
              Multiple film reels, one projector—intelligently scheduled
            </p>
          </div>
          <div className="rounded-lg bg-zinc-800 p-3">
            <p className="mb-1 text-zinc-400">⚛️ The React API</p>
            <p className="text-zinc-200">
              useTransition, useDeferredValue, Suspense
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
