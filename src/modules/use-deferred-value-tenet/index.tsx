import { useState, useDeferredValue, useEffect, useMemo, useRef } from "react";
import { RotateCcw, Cpu, Zap, Clock, BarChart3 } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// Simulate expensive computation
const simulateExpensiveFilter = (
  query: string,
  items: string[],
  delay: number = 100,
): string[] => {
  // Artificial delay to simulate heavy computation
  const start = performance.now();
  while (performance.now() - start < delay) {
    // Blocking loop
  }

  if (!query) return items.slice(0, 10);
  return items
    .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 10);
};

// Generate sample data
const generateItems = (): string[] => {
  const prefixes = [
    "Agent",
    "Target",
    "Asset",
    "Location",
    "Operation",
    "Device",
  ];
  const suffixes = [
    "Alpha",
    "Bravo",
    "Charlie",
    "Delta",
    "Echo",
    "Foxtrot",
    "Gold",
    "Hotel",
  ];
  const items: string[] = [];

  for (let i = 0; i < 1000; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    const num = Math.floor(Math.random() * 100);
    items.push(`${prefix}_${suffix}_${num}`);
  }

  return items;
};

interface Chapter {
  title: string;
  content: string;
  demoMode?: "intro" | "blocking" | "solution" | "comparison" | "mastery";
}

export default function UseDeferredValueTenet(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [input, setInput] = useState<string>("");
  const [blockedRenders, setBlockedRenders] = useState<number>(0);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [isBlockingMode, setIsBlockingMode] = useState<boolean>(false);
  const [items] = useState<string[]>(() => generateItems());
  const [lastInputTime, setLastInputTime] = useState<number>(Date.now());
  const [inputResponsive, setInputResponsive] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const deferredInput = useDeferredValue(input);
  const [animationParent] = useAutoAnimate();

  // Circuit breaker for blocking mode
  useEffect(() => {
    if (blockedRenders > 50) {
      setIsBlockingMode(false);
      setBlockedRenders(0);
      alert(
        "🚨 Circuit breaker: Too many blocked renders! Switching to deferred mode.",
      );
    }
  }, [blockedRenders]);

  // Monitor input responsiveness
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const timeSinceLastInput = Date.now() - lastInputTime;
      setInputResponsive(timeSinceLastInput < 1000);
    }, 100);

    return () => clearInterval(checkInterval);
  }, [lastInputTime]);

  // Simulate blocking render in blocking mode
  const blockingResults = useMemo(() => {
    if (isBlockingMode && chapter >= 1) {
      setBlockedRenders((prev) => prev + 1);
      return simulateExpensiveFilter(input, items, 300);
    }
    return simulateExpensiveFilter(input, items, 50);
  }, [input, items, isBlockingMode, chapter]);

  // Deferred results (always responsive)
  const deferredResults = useMemo(() => {
    setRenderCount((prev) => prev + 1);
    return simulateExpensiveFilter(deferredInput, items, 200);
  }, [deferredInput, items]);

  const chapters: Chapter[] = [
    {
      title: "The Principle of Two Times",
      content:
        "The operations room has two data flows. The Live Intel Feed must be instant and responsive—this is 'forward time.' The Holographic Tactical Display performs complex calculations that cause visible stutters—this is 'the consequence.' When the consequence blocks the now, you get a paradox you can't afford.",
      demoMode: "intro",
    },
    {
      title: "The Ståls-12 Stutter",
      content:
        "Connecting the fast input directly to the slow display creates a blocking render. Each keystroke forces the entire system to wait for heavy computations, freezing the UI. The operation fails because you're waiting for the future to calculate.",
      demoMode: "blocking",
    },
    {
      title: "Engaging the Turnstile",
      content:
        "The Turnstile (useDeferredValue) creates an inverted copy of your input that arrives a moment later. The live feed stays responsive with crisp white text, while the deferred version shimmers in red for the slow display. The two time streams flow in parallel without collision.",
      demoMode: "solution",
    },
    {
      title: "Two Sides of the Glass",
      content:
        "Compare the approaches side-by-side. The direct connection delays action to wait for consequence—frustration and failure. The Turnstile defers the consequence while allowing action—control and success. One blocks the user, the other empowers them.",
      demoMode: "comparison",
    },
    {
      title: "What's Happened, Happened",
      content:
        "Mastery means orchestrating multiple deferred streams. The urgent happens now, the heavy calculations happen a moment ago. As long as they don't collide, the timeline—and your UI—remains perfectly responsive and stable.",
      demoMode: "mastery",
    },
  ];

  const currentChapter = chapters[chapter];

  // Code examples
  const blockingCode = `// ❌ Direct connection - UI blocks
function SearchComponent() {
  const [query, setQuery] = useState("");
  
  // Expensive computation blocks EVERY keystroke
  const results = expensiveFilter(query, items);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // 🔴 Input lags during computation
      />
      <ResultsList items={results} />
    </div>
  );
}`;

  const deferredCode = `// ✅ Turnstile pattern - UI stays responsive
function SearchComponent() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  
  // Expensive computation uses DEFERRED value
  const results = expensiveFilter(deferredQuery, items);
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // 🟢 Input stays responsive
      />
      <ResultsList 
        items={results} 
        // Shows slightly stale data briefly
      />
    </div>
  );
}`;

  const resetDemo = (): void => {
    setInput("");
    setBlockedRenders(0);
    setRenderCount(0);
    setLastInputTime(Date.now());
    setIsBlockingMode(chapter === 1 || chapter === 3);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle chapter change
  useEffect(() => {
    setIsBlockingMode(chapter === 1 || chapter === 3);
    resetDemo();
  }, [chapter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950 p-4 text-slate-300 md:p-8">
      <header className="sticky top-0 z-10 mb-8 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <RotateCcw className="h-6 w-6 text-cyan-500 md:h-8 md:w-8" />
              <h1 className="text-xl font-bold tracking-tight md:text-3xl">
                Tenet
              </h1>
            </div>
            <div className="text-right text-xs text-slate-400 md:text-base">
              <div>Christopher Nolan • 2020</div>
              <div className="font-medium text-cyan-500">
                useDeferredValue Hook
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl">
        {/* Chapter Content */}
        <div className="prose prose-invert prose-lg mb-8 max-w-none md:mb-12">
          <h2 className="mb-4 text-2xl font-bold text-cyan-300 md:text-3xl">
            {currentChapter.title}
          </h2>
          <p className="leading-relaxed text-slate-300">
            {currentChapter.content}
          </p>
        </div>

        {/* Interactive Demo Section */}
        <section className="mb-8 rounded-xl border border-slate-700 bg-slate-900/50 p-4 shadow-xl shadow-blue-900/10 md:mb-12 md:p-8">
          {/* Control Panel */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-slate-800/30 p-4">
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${inputResponsive ? "animate-pulse bg-emerald-500" : "bg-red-500"}`}
              ></div>
              <span className="font-mono text-sm">
                Input: {inputResponsive ? "RESPONSIVE" : "BLOCKED"}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsBlockingMode(!isBlockingMode)}
                className={`rounded-lg px-4 py-2 font-medium transition-all ${isBlockingMode ? "border border-red-500/50 bg-red-500/20 text-red-300" : "border border-cyan-500/50 bg-cyan-500/20 text-cyan-300"}`}
              >
                {isBlockingMode ? "❌ Blocking Mode" : "✅ Deferred Mode"}
              </button>

              <button
                onClick={resetDemo}
                className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 transition-colors hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-slate-400" />
                <span>
                  Renders:{" "}
                  <span className="font-mono text-cyan-300">{renderCount}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>
                  Blocked:{" "}
                  <span className="font-mono text-red-300">
                    {blockedRenders}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Live Intel Feed (Input) */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <Zap className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-emerald-300">
                Live Intel Feed
              </h3>
              <span className="rounded bg-emerald-950/50 px-2 py-1 text-xs text-emerald-300">
                Forward Time
              </span>
            </div>

            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setLastInputTime(Date.now());
                }}
                placeholder="Type to search agents, targets, locations..."
                className="w-full rounded-lg border-2 border-emerald-500/30 bg-slate-800 p-4 text-lg text-white placeholder-slate-400 transition-colors focus:border-emerald-500 focus:outline-none"
                disabled={!inputResponsive}
              />
              {!inputResponsive && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-red-500/50 bg-red-500/10">
                  <span className="font-medium text-red-300">
                    SYSTEM BLOCKED
                  </span>
                </div>
              )}
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Current query:{" "}
              <span className="font-mono text-emerald-300">
                {input || "(empty)"}
              </span>
            </p>
          </div>

          {/* Holographic Tactical Display (Results) */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div
                className={`h-5 w-5 ${isBlockingMode ? "text-red-400" : "text-cyan-400"}`}
              >
                <BarChart3 />
              </div>
              <h3
                className={`text-lg font-semibold ${isBlockingMode ? "text-red-300" : "text-cyan-300"}`}
              >
                Holographic Tactical Display
              </h3>
              <span
                className={`rounded px-2 py-1 text-xs ${isBlockingMode ? "bg-red-950/50 text-red-300" : "bg-cyan-950/50 text-cyan-300"}`}
              >
                {isBlockingMode ? "Direct Connection" : "Inverted Stream"}
              </span>
            </div>

            <div
              ref={animationParent}
              className={`rounded-lg border-2 p-4 ${isBlockingMode ? "border-red-500/30 bg-red-950/10" : "border-cyan-500/30 bg-cyan-950/10"} min-h-[200px] transition-colors`}
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {(isBlockingMode ? blockingResults : deferredResults).map(
                  (item, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border p-3 ${isBlockingMode ? "border-red-500/20 bg-red-950/20" : "border-cyan-500/20 bg-cyan-950/20"} transition-all duration-300`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${isBlockingMode ? "bg-red-500" : "bg-cyan-500"}`}
                        ></div>
                        <span
                          className={`font-mono ${isBlockingMode ? "text-red-300" : "text-cyan-300"}`}
                        >
                          {item}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        {isBlockingMode ? "Direct render" : "Deferred render"}
                      </div>
                    </div>
                  ),
                )}
              </div>

              {deferredInput !== input && !isBlockingMode && (
                <div className="mt-4 rounded-lg border border-cyan-500/50 bg-cyan-950/30 p-3">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500"></div>
                    <span className="text-sm font-medium">
                      Inverted stream updating...
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">
                    Showing results for:{" "}
                    <span className="font-mono text-cyan-300">
                      {deferredInput || "(empty)"}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Code Examples */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <CodeBlock
                code={blockingCode}
                variant="error"
                title="// ❌ Direct Connection (Blocking)"
                defaultExpanded={chapter >= 1}
                language="jsx"
              />

              <CodeBlock
                code={deferredCode}
                variant="success"
                title="// ✅ Turnstile Pattern (Deferred)"
                defaultExpanded={chapter >= 2}
                language="jsx"
              />
            </div>

            <div className="mt-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <h4 className="mb-2 text-lg font-semibold text-cyan-300">
                Key Insight
              </h4>
              <p className="text-slate-300">
                <span className="font-medium text-red-300">
                  useDeferredValue
                </span>{" "}
                creates a version of state that can "lag behind" the latest
                value. This allows urgent updates (like user input) to render
                immediately, while expensive computations (like filtering large
                lists) can use the slightly stale value without blocking the UI.
              </p>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <nav className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:flex-row md:mt-12 md:p-6">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="w-full rounded-lg bg-slate-800 px-6 py-3 text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
          >
            ← Previous Chapter
          </button>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-sm text-slate-400">Chapter Progress</div>
              <div className="font-mono text-cyan-300">
                {chapter + 1} of {chapters.length}
              </div>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`h-3 w-3 rounded-full transition-all ${idx === chapter ? "bg-cyan-500" : "bg-slate-700 hover:bg-slate-600"}`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              setChapter(Math.min(chapters.length - 1, chapter + 1))
            }
            disabled={chapter === chapters.length - 1}
            className="w-full rounded-lg bg-cyan-600 px-6 py-3 text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
          >
            Next Chapter →
          </button>
        </nav>
      </main>

      <footer className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
        <p>Tenet Operations Module • React useDeferredValue Demonstration</p>
        <p className="mt-2">
          All temporal streams secured. UI remains responsive.
        </p>
      </footer>
    </div>
  );
}
