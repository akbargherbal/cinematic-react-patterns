import {
  useState,
  useEffect,
  useTransition,
  useCallback,
  useMemo,
} from "react";
import { Clock, Zap, Search, RotateCcw, Play, Layers } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface Metrics {
  freezeCount: number;
  totalFreezeTime: number;
  responsiveInputs: number;
  blockedInputs: number;
}

export default function UseTransitionHook(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Two Clocks",
      content: `**"Not all thoughts need to happen at the same speed."**

Ariadne's workshop is dominated by two clocks: REAL-TIME ticks normally, DREAM-TIME crawls. Her challenge: users type instantly (Real-Time) but rendering a complex cityscape takes time (Dream-Time). How can these two speeds coexist?

**The React parallel**: Some updates must be instant (user input), others are expensive but can wait (heavy rendering). The developer's challenge is keeping them from fighting for the same moment.`,
    },
    {
      id: "build",
      title: "The World Freezes",
      content: `**"You're stopping their heart to listen."**

Saito types 'P' in the search. The entire dream world freezes—rain suspended mid-air, sound vanished. When it restarts, he's nauseous from the lag. Each keystroke locks the world again. His subconscious rejects the broken experience.

**Legacy React**: Every state update blocks the entire UI. Users feel trapped, frustrated. The app becomes unusable when treating all updates as equally urgent.`,
    },
    {
      id: "climax",
      title: "The Dream Within a Dream",
      content: `**"Don't stop the world; start a transition."**

Cobb introduces a modified PASIV device—the Transition button. Ariadne redesigns: keystrokes happen in Real-Time (instant), but cityscape rendering happens in Dream-Time (deferred). Saito types—letters appear instantly, the world shimmers with a blue aura, then the new scene resolves beautifully.

**useTransition**: Mark expensive updates as non-urgent with \`startTransition\`. User input stays instant while heavy work happens in the background with \`isPending\` feedback.`,
    },
    {
      id: "resolution",
      title: "Synchronized Time",
      content: `**Side-by-side comparison:**

**Left screen (Frozen)**: Each keystroke is a violent jolt. World stops, stutters, restarts. Saito's face shows frustration. The dream rejects him.

**Right screen (Fluid)**: Letters appear instantly. World shimmers gracefully. Saito walks around while the background updates. He smiles—he's in control.

**The lesson**: Urgent updates (keystrokes) in Real-Time. Heavy work (rendering) in Dream-Time. They synchronize, not compete.`,
    },
    {
      id: "summary",
      title: "The Architect of Time",
      content: `**"You're an Architect of Time."**

Ariadne builds a vast virtual library. As users type filters, letters appear instantly. Distant library wings shimmer and reorganize—Tolstoy materializes, philosophy fades—all while users scroll comfortably through nearby shelves.

**Mastery**: Understanding which updates must be instant (user input, navigation) and which can transition gracefully (heavy lists, complex renders). The app respects user attention.`,
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Layers className="h-6 w-6 text-blue-400 sm:h-8 sm:w-8" />
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
                Inception
              </h1>
            </div>
            <p className="text-xs text-slate-400 sm:text-sm md:text-base">
              Ariadne • 2010
            </p>
          </div>
          <p className="text-sm font-medium text-blue-400 sm:text-base md:text-lg">
            useTransition Hook
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Narrative Column */}
          <div className="lg:col-span-7">
            <div className="mb-8 lg:mb-12">
              <h2 className="mb-4 text-2xl font-bold text-blue-300 sm:mb-6 sm:text-3xl">
                {currentChapter.title}
              </h2>
              <div className="prose prose-invert prose-slate max-w-none">
                {currentChapter.content.split("\n\n").map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="mb-4 text-base leading-relaxed text-slate-300 sm:text-lg"
                  >
                    {paragraph.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-blue-400">
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
        <nav className="mt-8 flex items-center justify-between border-t border-slate-700 pt-8 sm:mt-12">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:py-3 sm:text-base"
          >
            Previous
          </button>
          <div className="text-center">
            <span className="mb-1 block text-xs text-slate-400 sm:text-sm">
              Progress
            </span>
            <span className="font-mono text-sm text-blue-400 sm:text-base">
              Chapter {chapter + 1} of {chapters.length}
            </span>
          </div>
          <button
            onClick={() =>
              setChapter(Math.min(chapters.length - 1, chapter + 1))
            }
            disabled={chapter === chapters.length - 1}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:py-3 sm:text-base"
          >
            Next
          </button>
        </nav>
      </main>
    </div>
  );
}

// Demo Section Router
function DemoSection({ chapter }: { chapter: number }): JSX.Element {
  switch (chapter) {
    case 0:
      return <TwoClocksDemo />;
    case 1:
      return <WorldFreezesDemo />;
    case 2:
      return <TransitionDemo />;
    case 3:
      return <ComparisonDemo />;
    case 4:
      return <SummaryDemo />;
    default:
      return <TwoClocksDemo />;
  }
}

// Chapter 1: The Two Clocks
function TwoClocksDemo(): JSX.Element {
  const [realTime, setRealTime] = useState<Date>(new Date());
  const [dreamTime, setDreamTime] = useState<number>(0);

  useEffect(() => {
    // Real-Time clock updates every second
    const realInterval = setInterval(() => {
      setRealTime(new Date());
    }, 1000);

    // Dream-Time clock updates every 10 seconds (10x slower)
    const dreamInterval = setInterval(() => {
      setDreamTime((prev) => prev + 1);
    }, 10000);

    return () => {
      clearInterval(realInterval);
      clearInterval(dreamInterval);
    };
  }, []);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-bold text-blue-300 sm:text-xl">
          Two Speeds of Time
        </h3>
      </div>

      <p className="mb-6 text-xs text-slate-400 sm:text-sm">
        Watch how the two clocks operate at different speeds. Some operations
        need Real-Time responsiveness, others can work in Dream-Time.
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Real-Time Clock */}
        <div className="rounded-lg border-2 border-green-500/50 bg-slate-800 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 animate-pulse text-green-400" />
            <p className="text-xs font-semibold text-slate-400">REAL-TIME</p>
          </div>
          <p className="font-mono text-2xl font-bold text-green-400">
            {realTime.toLocaleTimeString()}
          </p>
          <p className="mt-2 text-xs text-slate-500">Updates every second</p>
        </div>

        {/* Dream-Time Clock */}
        <div className="rounded-lg border-2 border-blue-500/50 bg-slate-800 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <p className="text-xs font-semibold text-slate-400">DREAM-TIME</p>
          </div>
          <p className="font-mono text-2xl font-bold text-blue-400">
            {dreamTime.toString().padStart(2, "0")}s
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Updates every 10 seconds
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-blue-500/30 bg-blue-950/30 p-4">
        <p className="text-xs text-blue-300 sm:text-sm">
          <strong>💡 The Metaphor</strong>: User input happens in Real-Time
          (instant feedback). Heavy rendering can happen in Dream-Time
          (deferred, non-blocking).
        </p>
      </div>

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="text-xs text-slate-500">
          In React, useTransition lets you separate these two speeds—keeping
          user input instant while deferring expensive work.
        </p>
      </div>
    </div>
  );
}

// Chapter 2: The World Freezes (Blocking Demo)
function WorldFreezesDemo(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isBlocking, setIsBlocking] = useState<boolean>(false);
  const [freezeCount, setFreezeCount] = useState<number>(0);
  const [totalFreezeTime, setTotalFreezeTime] = useState<number>(0);

  // Circuit breaker
  useEffect(() => {
    if (freezeCount >= 50) {
      reset();
    }
  }, [freezeCount]);

  const simulateBlockingInput = useCallback(() => {
    setIsBlocking(true);
    const startTime = Date.now();

    // Simulate heavy synchronous work (blocking)
    const blockingTime = 1500;
    setTimeout(() => {
      const elapsed = Date.now() - startTime;
      setTotalFreezeTime((prev) => prev + elapsed);
      setFreezeCount((prev) => prev + 1);
      setIsBlocking(false);
    }, blockingTime);
  }, []);

  const handleBlockingType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    simulateBlockingInput();
  };

  const reset = () => {
    setSearchValue("");
    setIsBlocking(false);
    setFreezeCount(0);
    setTotalFreezeTime(0);
  };

  const blockingCode = `// ❌ Blocking Pattern - Everything Freezes
function BlockingSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleChange = (value: string) => {
    setQuery(value);
    
    // Heavy synchronous filtering - BLOCKS UI
    const filtered = expensiveFilter(largeDataset, value);
    setResults(filtered); // UI frozen until this completes
  };

  return (
    <input 
      value={query}
      onChange={e => handleChange(e.target.value)}
      // ⚠️ Input feels unresponsive, laggy
    />
  );
}`;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Search
          className={`h-5 w-5 ${isBlocking ? "animate-pulse text-red-400" : "text-slate-500"}`}
        />
        <h3 className="text-lg font-bold text-red-400 sm:text-xl">
          The World Freezes
        </h3>
      </div>

      <p className="mb-6 text-xs text-slate-400 sm:text-sm">
        Type in the search box. Notice how the entire UI becomes unresponsive
        during the "heavy work."
      </p>

      {/* Interactive Demo */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={handleBlockingType}
            disabled={isBlocking}
            placeholder="Type to search (world will freeze)..."
            className={`w-full rounded-lg border-2 bg-slate-800 px-4 py-3 text-sm text-white transition-all placeholder:text-slate-500 focus:outline-none sm:text-base ${
              isBlocking
                ? "cursor-not-allowed border-red-500 opacity-50"
                : "border-slate-600 focus:border-blue-500"
            }`}
          />
          {isBlocking && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-red-950/20">
              <p className="text-sm font-semibold text-red-400">❄️ FROZEN</p>
            </div>
          )}
        </div>

        <button
          onClick={reset}
          className="mt-3 flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm text-white transition-all hover:bg-slate-600"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      {/* Metrics */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Freeze Events</p>
          <p className="mt-1 font-mono text-xl font-bold text-red-400 sm:text-2xl">
            {freezeCount}
          </p>
        </div>
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Total Freeze Time</p>
          <p className="mt-1 font-mono text-xl font-bold text-red-400 sm:text-2xl">
            {(totalFreezeTime / 1000).toFixed(1)}s
          </p>
        </div>
      </div>

      {/* Code */}
      <CodeBlock
        code={blockingCode}
        variant="error"
        title="// ❌ Blocking Pattern"
        language="tsx"
        defaultExpanded={true}
      />

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="text-xs text-slate-500">
          ⚠️ <strong>The Problem</strong>: Heavy synchronous updates lock the
          UI. The dream rejects the Subject.
          {freezeCount >= 45 && (
            <span className="ml-2 text-red-400">
              (Circuit breaker approaching)
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

// Chapter 3: The Dream Within a Dream (useTransition Solution)
function TransitionDemo(): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  const mockData = useMemo(
    () => [
      "Place de la Concorde",
      "Arc de Triomphe",
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame",
      "Sacré-Cœur",
      "Champs-Élysées",
      "Panthéon",
      "Versailles",
      "Musée d'Orsay",
      "Sainte-Chapelle",
      "Les Invalides",
      "Luxembourg Gardens",
      "Tuileries Garden",
      "Père Lachaise",
      "Montmartre",
    ],
    [],
  );

  const handleSearch = (value: string) => {
    // Urgent update: Input value (Real-Time)
    setSearchValue(value);

    // Non-urgent update: Heavy filtering (Dream-Time)
    startTransition(() => {
      const results = mockData.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredResults(results);
    });
  };

  const reset = () => {
    setSearchValue("");
    setFilteredResults(mockData);
  };

  const transitionCode = `// ✅ useTransition - Responsive UI
function TransitionSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    setQuery(value); // Urgent: instant update
    
    startTransition(() => {
      // Non-urgent: deferred work
      const filtered = expensiveFilter(largeDataset, value);
      setResults(filtered);
    });
    // ✅ Input stays responsive!
  };

  return (
    <div>
      <input 
        value={query}
        onChange={e => handleChange(e.target.value)}
        // Input is always responsive
      />
      {isPending && <Shimmer />}
      <Results data={results} />
    </div>
  );
}`;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-bold text-blue-300 sm:text-xl">
          The Transition Device
        </h3>
      </div>

      <p className="mb-6 text-xs text-slate-400 sm:text-sm">
        Type in the search. Notice: input is instant, but results update with a
        shimmer effect.
      </p>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search landmarks (fluid transition)..."
            className="w-full rounded-lg border-2 border-slate-600 bg-slate-800 px-4 py-3 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-blue-500 focus:outline-none sm:text-base"
          />
          {isPending && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
            </div>
          )}
        </div>

        <button
          onClick={reset}
          className="mt-3 flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm text-white transition-all hover:bg-slate-600"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>

      {/* Results Display */}
      <div
        className={`max-h-48 overflow-y-auto rounded-lg bg-slate-800 p-4 transition-all ${
          isPending ? "opacity-60 blur-[2px]" : "opacity-100"
        }`}
      >
        <p className="mb-2 text-xs text-slate-400">
          Results: {filteredResults.length} locations
          {isPending && (
            <span className="ml-2 text-blue-400">(Updating...)</span>
          )}
        </p>
        <ul className="space-y-1">
          {filteredResults.slice(0, 10).map((item, idx) => (
            <li
              key={idx}
              className="border-b border-slate-700 py-1 text-sm text-slate-300 last:border-0"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Code Comparison */}
      <div className="mt-6">
        <CodeBlock
          code={transitionCode}
          variant="success"
          title="// ✅ useTransition Pattern"
          language="tsx"
          defaultExpanded={true}
        />
      </div>

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="text-xs text-slate-500">
          ✨ <strong>The Solution</strong>: Input happens in Real-Time. Heavy
          work transitions in Dream-Time. The \`isPending\` flag provides visual
          feedback.
        </p>
      </div>
    </div>
  );
}

// Chapter 4: Synchronized Time (Comparison)
function ComparisonDemo(): JSX.Element {
  const [mode, setMode] = useState<"blocking" | "transition">("blocking");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [metrics, setMetrics] = useState<Metrics>({
    freezeCount: 0,
    totalFreezeTime: 0,
    responsiveInputs: 0,
    blockedInputs: 0,
  });

  // Circuit breaker
  useEffect(() => {
    if (metrics.freezeCount >= 50) {
      reset();
    }
  }, [metrics.freezeCount]);

  const handleBlockingInput = (value: string) => {
    setSearchValue(value);
    setIsProcessing(true);

    const startTime = Date.now();
    setTimeout(() => {
      const elapsed = Date.now() - startTime;
      setMetrics((prev) => ({
        ...prev,
        freezeCount: prev.freezeCount + 1,
        totalFreezeTime: prev.totalFreezeTime + elapsed,
        blockedInputs: prev.blockedInputs + 1,
      }));
      setIsProcessing(false);
    }, 1000);
  };

  const handleTransitionInput = (value: string) => {
    setSearchValue(value);
    setMetrics((prev) => ({
      ...prev,
      responsiveInputs: prev.responsiveInputs + 1,
    }));

    startTransition(() => {
      // Simulate heavy work
    });
  };

  const reset = () => {
    setSearchValue("");
    setIsProcessing(false);
    setMetrics({
      freezeCount: 0,
      totalFreezeTime: 0,
      responsiveInputs: 0,
      blockedInputs: 0,
    });
  };

  const blockingExample = `// ❌ Frozen World
function FrozenUI() {
  const [query, setQuery] = useState("");
  
  const handleChange = (value: string) => {
    setQuery(value);
    expensiveSync(); // UI locks
  };
}`;

  const transitionExample = `// ✅ Fluid World
function FluidUI() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (value: string) => {
    setQuery(value); // Instant
    startTransition(() => {
      expensiveWork(); // Background
    });
  };
}`;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Layers className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-bold text-blue-300 sm:text-xl">
          Synchronized Time
        </h3>
      </div>

      <p className="mb-6 text-xs text-slate-400 sm:text-sm">
        Compare side-by-side: blocking vs transition approaches.
      </p>

      {/* Mode Toggle */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setMode("blocking")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
            mode === "blocking"
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          ❄️ Blocking
        </button>
        <button
          onClick={() => setMode("transition")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
            mode === "transition"
              ? "bg-blue-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          💫 Transition
        </button>
        <button
          onClick={reset}
          className="rounded-lg bg-slate-700 px-4 py-3 text-white transition-all hover:bg-slate-600"
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Input Demo */}
      <div className="mb-6">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            const value = e.target.value;
            if (mode === "blocking") {
              handleBlockingInput(value);
            } else {
              handleTransitionInput(value);
            }
          }}
          disabled={mode === "blocking" && isProcessing}
          placeholder={`Type to test ${mode} mode...`}
          className={`w-full rounded-lg border-2 bg-slate-800 px-4 py-3 text-sm text-white transition-all placeholder:text-slate-500 focus:outline-none sm:text-base ${
            mode === "blocking"
              ? isProcessing
                ? "cursor-not-allowed border-red-500 opacity-50"
                : "border-red-500/50"
              : isPending
                ? "border-blue-500"
                : "border-blue-500/50"
          }`}
        />
      </div>

      {/* Metrics Dashboard */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Blocked Inputs</p>
          <p className="mt-1 font-mono text-xl font-bold text-red-400">
            {metrics.blockedInputs}
          </p>
        </div>
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Responsive Inputs</p>
          <p className="mt-1 font-mono text-xl font-bold text-green-400">
            {metrics.responsiveInputs}
          </p>
        </div>
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Freeze Time (ms)</p>
          <p className="mt-1 font-mono text-xl font-bold text-amber-400">
            {metrics.totalFreezeTime}
          </p>
        </div>
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Freeze Count</p>
          <p className="mt-1 font-mono text-xl font-bold text-blue-400">
            {metrics.freezeCount}
          </p>
        </div>
      </div>

      {/* Code Comparison */}
      <div className="space-y-3">
        <CodeBlock
          code={blockingExample}
          variant="error"
          title="// ❌ Frozen World"
          language="tsx"
        />
        <CodeBlock
          code={transitionExample}
          variant="success"
          title="// ✅ Fluid World"
          language="tsx"
        />
      </div>

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="text-xs text-slate-500">
          🎯 <strong>The Difference</strong>: Blocking stops the heart.
          Transition respects the Subject.
          {metrics.freezeCount >= 45 && (
            <span className="ml-2 text-red-400">
              (Circuit breaker approaching)
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

// Chapter 5: The Architect of Time (Summary)
function SummaryDemo(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [filteredBooks, setFilteredBooks] = useState<string[]>([]);

  const library = useMemo(
    () => [
      "War and Peace - Tolstoy",
      "Anna Karenina - Tolstoy",
      "Crime and Punishment - Dostoevsky",
      "The Brothers Karamazov - Dostoevsky",
      "Dead Souls - Gogol",
      "The Master and Margarita - Bulgakov",
      "Doctor Zhivago - Pasternak",
      "One Day in the Life of Ivan Denisovich - Solzhenitsyn",
      "The Idiot - Dostoevsky",
      "Eugene Onegin - Pushkin",
      "Fathers and Sons - Turgenev",
      "The Cherry Orchard - Chekhov",
      "The Seagull - Chekhov",
      "A Hero of Our Time - Lermontov",
      "The Lower Depths - Gorky",
    ],
    [],
  );

  useEffect(() => {
    if (searchQuery) {
      startTransition(() => {
        const results = library.filter((book) =>
          book.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setFilteredBooks(results);
      });
    } else {
      setFilteredBooks(library);
    }
  }, [searchQuery, library]);

  const summaryCode = `// 🎬 The Architect of Time - Mastery
function VirtualLibrary() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    setQuery(value); // Real-Time: instant feedback
    
    startTransition(() => {
      // Dream-Time: heavy filtering
      const filtered = expensiveFilter(massiveLibrary, value);
      setBooks(filtered);
    });
  };

  return (
    <div>
      <SearchInput 
        value={query}
        onChange={handleSearch}
        // Always responsive
      />
      <LibraryView 
        books={books}
        isPending={isPending}
        // Shimmers during transition
      />
    </div>
  );
}`;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Layers className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-bold text-blue-300 sm:text-xl">
          The Architect of Time
        </h3>
      </div>

      <p className="mb-6 text-xs text-slate-400 sm:text-sm">
        Filter through a virtual library. Notice how typing stays instant while
        the collection reorganizes.
      </p>

      {/* Search Interface */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter 19th Century Russian Literature..."
            className="w-full rounded-lg border-2 border-slate-600 bg-slate-800 py-3 pr-4 pl-10 text-sm text-white transition-colors placeholder:text-slate-500 focus:border-blue-500 focus:outline-none sm:text-base"
          />
          {isPending && (
            <div className="absolute top-1/2 right-3 -translate-y-1/2">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
            </div>
          )}
        </div>
      </div>

      {/* Library Display */}
      <div
        className={`max-h-64 overflow-y-auto rounded-lg bg-slate-800 p-4 transition-all duration-300 ${
          isPending ? "opacity-60 blur-[1px]" : "opacity-100"
        }`}
      >
        <p className="mb-3 text-xs text-slate-400">
          {filteredBooks.length} books in collection
          {isPending && (
            <span className="ml-2 text-blue-400">(Reorganizing wings...)</span>
          )}
        </p>
        <ul className="space-y-2">
          {filteredBooks.map((book, idx) => (
            <li
              key={idx}
              className="rounded border-l-2 border-blue-500/50 bg-slate-900/50 px-3 py-2 text-sm text-slate-300"
            >
              {book}
            </li>
          ))}
        </ul>
      </div>

      {/* Code Example */}
      <div className="mt-6">
        <CodeBlock
          code={summaryCode}
          variant="success"
          title="// ✅ Mastery: The Architect of Time"
          language="tsx"
          defaultExpanded={false}
        />
      </div>

      {/* Key Principles */}
      <div className="mt-6 space-y-3 border-t border-slate-700 pt-6">
        <div className="rounded-lg border border-blue-500/30 bg-blue-950/30 p-4">
          <p className="mb-2 text-sm font-semibold text-blue-300">
            ✨ Core Principles
          </p>
          <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
            <li>
              • <strong>Real-Time</strong>: User input, navigation, critical
              interactions
            </li>
            <li>
              • <strong>Dream-Time</strong>: Heavy renders, data filtering,
              complex updates
            </li>
            <li>
              • <strong>isPending</strong>: Visual feedback during transitions
              (shimmer, blur)
            </li>
            <li>
              • <strong>Respect</strong>: The app never stops the Subject's
              heart to listen
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="mb-1 text-slate-400">🎭 The Metaphor</p>
            <p className="text-slate-200">
              Two clocks, synchronized—not competing
            </p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="mb-1 text-slate-400">⚛️ The React API</p>
            <p className="text-slate-200">
              useTransition, startTransition, isPending
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
