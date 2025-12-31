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
      <header className="border-b border-zinc-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4 sm:gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-3">
              <Film className="text-red-500 w-6 h-6 sm:w-8 sm:h-8" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Pulp Fiction</h1>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-zinc-400">
              Quentin Tarantino • 1994
            </p>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-amber-500 font-medium">
            Concurrent Rendering
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Narrative Column */}
          <div className="lg:col-span-7">
            <div className="mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-red-400">
                {currentChapter.title}
              </h2>
              <div className="prose prose-invert prose-zinc max-w-none">
                {currentChapter.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 leading-relaxed text-base sm:text-lg text-zinc-300">
                    {paragraph.split('**').map((part, i) =>
                      i % 2 === 1 ? <strong key={i} className="text-amber-400">{part}</strong> : part
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
        <nav className="flex justify-between items-center mt-8 sm:mt-12 pt-8 border-t border-zinc-800">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base font-medium"
          >
            Previous
          </button>
          <div className="text-center">
            <span className="text-xs sm:text-sm text-zinc-400 block mb-1">Progress</span>
            <span className="text-sm sm:text-base font-mono text-amber-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
          </div>
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base font-medium"
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
    <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-amber-500 w-5 h-5" />
        <h3 className="text-lg sm:text-xl font-bold text-amber-400">Multiple States, One Timeline</h3>
      </div>
      
      <p className="text-xs sm:text-sm text-zinc-400 mb-6">
        Click each reel to "prepare" it. React can work on all three UI updates simultaneously in the background.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {reels.map((reel) => (
          <button
            key={reel.id}
            onClick={() => setActiveReel(reel.id)}
            className={`p-3 sm:p-4 border-2 rounded-lg transition-all ${
              activeReel === reel.id
                ? `${reel.color} bg-zinc-800`
                : "border-zinc-700 text-zinc-500 hover:border-zinc-600"
            }`}
          >
            <Film className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2" />
            <span className="text-xs sm:text-sm font-mono font-bold">{reel.label}</span>
          </button>
        ))}
      </div>

      {activeReel && (
        <div className="bg-zinc-800/50 border border-amber-500/30 rounded-lg p-3 sm:p-4 animate-in fade-in duration-300">
          <p className="text-xs sm:text-sm text-amber-400">
            ✓ Reel "<span className="font-bold">{activeReel.toUpperCase()}</span>" is being prepared in the background.
            React doesn't need to show it yet—it's ready when needed.
          </p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-zinc-700">
        <p className="text-xs text-zinc-500 italic">
          💡 In concurrent mode, React can prepare multiple component trees without committing any to the DOM yet.
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
    <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Phone className={`w-5 h-5 ${phoneRinging ? "text-red-500 animate-pulse" : "text-zinc-500"}`} />
        <h3 className="text-lg sm:text-xl font-bold text-red-400">Blocking Render</h3>
      </div>

      <p className="text-xs sm:text-sm text-zinc-400 mb-6">
        Start the "long scene". Notice the phone rings but cannot be answered until the scene finishes.
      </p>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={startBlockingRender}
          disabled={isBlocking}
          className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Play className="w-4 h-4" />
          {isBlocking ? "RENDERING..." : "Start Scene"}
        </button>
        <button
          onClick={reset}
          className="px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-all"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Visual Feedback */}
      <div className="space-y-4 mb-6">
        {/* Progress Bar */}
        <div className="bg-zinc-800 rounded-lg p-3 sm:p-4">
          <div className="flex justify-between text-xs text-zinc-400 mb-2">
            <span>Render Progress</span>
            <span className="font-mono">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-zinc-700 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Phone Status */}
        <div className={`border-2 rounded-lg p-3 sm:p-4 transition-all ${
          phoneRinging
            ? "border-red-500 bg-red-950/30 animate-pulse"
            : callMissed
            ? "border-red-700 bg-red-950/20"
            : "border-zinc-700 bg-zinc-800/30"
        }`}>
          <div className="flex items-center gap-3">
            <Phone className={`w-5 h-5 sm:w-6 sm:h-6 ${
              phoneRinging ? "text-red-400" : callMissed ? "text-red-600" : "text-zinc-500"
            }`} />
            <div>
              <p className="text-sm sm:text-base font-semibold">
                {phoneRinging ? "📞 PHONE RINGING!" : callMissed ? "❌ Call Missed" : "☎️ Phone Idle"}
              </p>
              {isBlocking && phoneRinging && (
                <p className="text-xs text-red-400 mt-1">UI is blocked - can't answer!</p>
              )}
              {callMissed && (
                <p className="text-xs text-red-500 mt-1">
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

      <div className="mt-4 pt-4 border-t border-zinc-700">
        <p className="text-xs text-zinc-500">
          ⚠️ <strong>The Problem</strong>: Heavy work locks the main thread. User interactions queue up and feel broken.
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
    <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-amber-500 w-5 h-5" />
        <h3 className="text-lg sm:text-xl font-bold text-amber-400">The Scheduler</h3>
      </div>

      <p className="text-xs sm:text-sm text-zinc-400 mb-6">
        Start heavy work, then try typing. The UI stays responsive—you can "answer the phone" immediately.
      </p>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={startHeavyWork}
          className="flex-1 px-4 py-3 bg-amber-600 text-black font-semibold rounded-lg hover:bg-amber-500 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Play className="w-4 h-4" />
          {isPending ? "WORKING..." : "Start Background Work"}
        </button>
        <button
          onClick={reset}
          className="px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-all"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Interactive Input */}
      <div className="space-y-4 mb-6">
        <div className="bg-zinc-800 rounded-lg p-3 sm:p-4">
          <label className="block text-xs text-zinc-400 mb-2">Type to "answer the phone":</label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => handleInput(e.target.value)}
            placeholder="Type anything..."
            className="w-full bg-zinc-900 border border-zinc-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className={`border-2 rounded-lg p-3 ${
            isPending ? "border-amber-500 bg-amber-950/20" : "border-zinc-700 bg-zinc-800/30"
          }`}>
            <p className="text-xs text-zinc-400">Background Work</p>
            <p className="text-sm font-semibold text-amber-400 mt-1">
              {isPending ? "⏳ In Progress" : "✓ Idle"}
            </p>
          </div>
          <div className={`border-2 rounded-lg p-3 ${
            phoneAnswered ? "border-green-500 bg-green-950/20" : "border-zinc-700 bg-zinc-800/30"
          }`}>
            <p className="text-xs text-zinc-400">User Input</p>
            <p className="text-sm font-semibold text-green-400 mt-1">
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

      <div className="mt-4 pt-4 border-t border-zinc-700">
        <p className="text-xs text-zinc-500">
          ✨ <strong>The Solution</strong>: useTransition marks updates as deferrable. React can pause them to handle urgent work, then seamlessly resume.
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
        setMetrics(prev => ({
          ...prev,
          renderCount: prev.renderCount + 1,
          blockedTime: prev.blockedTime + elapsed,
          droppedInputs: prev.droppedInputs + 3,
        }));
        setBlockedInputs(prev => prev + 3);
        setIsRunning(false);
      }, 2000);
    } else {
      // Simulate concurrent behavior
      setTimeout(() => {
        setMetrics(prev => ({
          ...prev,
          renderCount: prev.renderCount + 1,
          responsiveInputs: prev.responsiveInputs + 3,
        }));
        setSuccessfulInputs(prev => prev + 3);
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
    <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Film className="text-red-400 w-5 h-5" />
        <h3 className="text-lg sm:text-xl font-bold text-red-400">Traffic Jam vs. Dance</h3>
      </div>

      <p className="text-xs sm:text-sm text-zinc-400 mb-6">
        Compare blocking vs. concurrent rendering side-by-side.
      </p>

      {/* Mode Toggle */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => runComparison("blocking")}
          disabled={isRunning}
          className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-30 transition-all text-sm"
        >
          🚦 Run Blocking
        </button>
        <button
          onClick={() => runComparison("concurrent")}
          disabled={isRunning}
          className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-30 transition-all text-sm"
        >
          💃 Run Concurrent
        </button>
        <button
          onClick={reset}
          className="px-4 py-3 bg-zinc-700 text-white rounded-lg hover:bg-zinc-600 transition-all"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-zinc-800 rounded-lg p-3">
          <p className="text-xs text-zinc-400">Dropped Inputs</p>
          <p className="text-xl sm:text-2xl font-mono font-bold text-red-400 mt-1">
            {metrics.droppedInputs}
          </p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3">
          <p className="text-xs text-zinc-400">Responsive Inputs</p>
          <p className="text-xl sm:text-2xl font-mono font-bold text-green-400 mt-1">
            {metrics.responsiveInputs}
          </p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3">
          <p className="text-xs text-zinc-400">Blocked Time (ms)</p>
          <p className="text-xl sm:text-2xl font-mono font-bold text-amber-400 mt-1">
            {metrics.blockedTime}
          </p>
        </div>
        <div className="bg-zinc-800 rounded-lg p-3">
          <p className="text-xs text-zinc-400">Total Renders</p>
          <p className="text-xl sm:text-2xl font-mono font-bold text-blue-400 mt-1">
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

      <div className="mt-4 pt-4 border-t border-zinc-700">
        <p className="text-xs text-zinc-500">
          🎯 <strong>The Difference</strong>: Blocking creates frustration. Concurrent creates flow.
          {blockedInputs >= 45 && <span className="text-red-400 ml-2">(Circuit breaker approaching - will reset at 50)</span>}
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
    "Vincent Vega", "Jules Winnfield", "Mia Wallace", "Butch Coolidge",
    "Marsellus Wallace", "Pumpkin", "Honey Bunny", "Winston Wolf",
    "Brett", "Captain Koons", "Fabienne", "Lance", "Jody",
    "Marvin", "The Gimp", "Zed", "Maynard", "Esmeralda Villalobos"
  ];

  useEffect(() => {
    if (searchTerm) {
      startTransition(() => {
        // Simulate expensive filtering
        const results = allItems.filter(item =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Film className="text-amber-500 w-5 h-5" />
        <h3 className="text-lg sm:text-xl font-bold text-amber-400">The Premiere</h3>
      </div>

      <p className="text-xs sm:text-sm text-zinc-400 mb-6">
        Search through characters. Notice how the input stays responsive even as results update.
      </p>

      {/* Search Demo */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search characters..."
            className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors text-sm sm:text-base"
          />
          {isPending && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
        
        <div className="mt-4 bg-zinc-800 rounded-lg p-4 max-h-64 overflow-y-auto">
          {filteredItems.length > 0 ? (
            <ul className="space-y-2">
              {filteredItems.map((item, idx) => (
                <li key={idx} className="text-sm text-zinc-300 py-1 border-b border-zinc-700 last:border-0">
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

      <div className="mt-6 pt-6 border-t border-zinc-700 space-y-3">
        <div className="bg-amber-950/30 border border-amber-500/30 rounded-lg p-4">
          <p className="text-sm font-semibold text-amber-400 mb-2">
            ✨ Key Takeaway
          </p>
          <p className="text-xs sm:text-sm text-zinc-300">
            <strong>"Show the most important piece at the most important time."</strong>
            <br />
            Concurrent rendering lets React prepare everything in the background while always prioritizing what the user needs <em>right now</em>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-zinc-800 rounded-lg p-3">
            <p className="text-zinc-400 mb-1">🎭 The Metaphor</p>
            <p className="text-zinc-200">Multiple film reels, one projector—intelligently scheduled</p>
          </div>
          <div className="bg-zinc-800 rounded-lg p-3">
            <p className="text-zinc-400 mb-1">⚛️ The React API</p>
            <p className="text-zinc-200">useTransition, useDeferredValue, Suspense</p>
          </div>
        </div>
      </div>
    </div>
  );
}