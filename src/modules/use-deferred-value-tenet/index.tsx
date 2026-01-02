import { useState, useDeferredValue, useEffect, useMemo, useRef } from "react";
import { RotateCcw, Cpu, Zap, Clock, BarChart3, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeComparison } from "@/components/common/CodeComparison";
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

export default function UseDeferredValueTenet() {
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

  const chapters = [
    {
      title: "The Principle of Two Times",
      content:
        "The operations room has two data flows. The Live Intel Feed must be instant and responsive—this is 'forward time.' The Holographic Tactical Display performs complex calculations that cause visible stutters—this is 'the consequence.' When the consequence blocks the now, you get a paradox you can't afford.",
    },
    {
      title: "The Ståls-12 Stutter",
      content:
        "Connecting the fast input directly to the slow display creates a blocking render. Each keystroke forces the entire system to wait for heavy computations, freezing the UI. The operation fails because you're waiting for the future to calculate.",
    },
    {
      title: "Engaging the Turnstile",
      content:
        "The Turnstile (useDeferredValue) creates an inverted copy of your input that arrives a moment later. The live feed stays responsive with crisp white text, while the deferred version shimmers in red for the slow display. The two time streams flow in parallel without collision.",
    },
    {
      title: "Two Sides of the Glass",
      content:
        "Compare the approaches side-by-side. The direct connection delays action to wait for consequence—frustration and failure. The Turnstile defers the consequence while allowing action—control and success. One blocks the user, the other empowers them.",
    },
    {
      title: "What's Happened, Happened",
      content:
        "Mastery means orchestrating multiple deferred streams. The urgent happens now, the heavy calculations happen a moment ago. As long as they don't collide, the timeline—and your UI—remains perfectly responsive and stable.",
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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      <ModuleHeader
        icon={RotateCcw}
        title="Tenet"
        subtitle="Christopher Nolan • 2020"
        concept="useDeferredValue Hook"
        themeColor="cyan"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-cyan-100">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  Temporal Controls
                </h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setIsBlockingMode(!isBlockingMode)}
                    className={`w-full rounded-lg px-4 py-2 font-medium transition-all ${
                      isBlockingMode 
                        ? "border border-red-500/50 bg-red-500/20 text-red-300 hover:bg-red-500/30" 
                        : "border border-cyan-500/50 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30"
                    }`}
                  >
                    {isBlockingMode ? "❌ Blocking Mode" : "✅ Deferred Mode"}
                  </button>

                  <button
                    onClick={resetDemo}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2 transition-colors hover:bg-slate-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset Timeline
                  </button>
                </div>

                {/* System Status */}
                <div className="mt-6 space-y-3 border-t border-slate-800 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Input Status</span>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${inputResponsive ? "animate-pulse bg-emerald-500" : "bg-red-500"}`}></div>
                      <span className={`font-mono font-bold ${inputResponsive ? "text-emerald-400" : "text-red-400"}`}>
                        {inputResponsive ? "RESPONSIVE" : "BLOCKED"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded bg-slate-800/50 p-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                        <Cpu className="h-3 w-3" /> Renders
                      </div>
                      <div className="font-mono text-lg text-cyan-300">{renderCount}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-2 text-center">
                      <div className="flex items-center justify-center gap-1 text-xs text-slate-500">
                        <Clock className="h-3 w-3" /> Blocked
                      </div>
                      <div className="font-mono text-lg text-red-300">{blockedRenders}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metaphor Map */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-200">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Live Intel Feed</span>
                    <span className="text-sm font-medium text-emerald-400">User Input</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Holographic Display</span>
                    <span className="text-sm font-medium text-red-400">Expensive Render</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Turnstile</span>
                    <span className="text-sm font-medium text-cyan-400">useDeferredValue</span>
                  </div>
                </div>
              </div>

              {/* Key Insight */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-cyan-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-cyan-200/80">
                  {chapter === 0 && "React renders are normally synchronous. If a component takes 300ms to render, the browser freezes for 300ms."}
                  {chapter === 1 && "Blocking the main thread kills the user experience. The user feels the lag immediately."}
                  {chapter === 2 && "useDeferredValue forks the data stream: one for immediate display (input), one for delayed processing (results)."}
                  {chapter === 3 && "The 'stale' version of the data is kept on screen until the new heavy calculation finishes."}
                  {chapter === 4 && "This pattern keeps the application responsive even when performing heavy work on the client side."}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-cyan-100 sm:text-3xl">
              {currentChapter.title}
            </h2>
            <p className="leading-relaxed text-slate-300">
              {currentChapter.content}
            </p>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-cyan-500/20 bg-slate-900/40 p-6 sm:mb-12 sm:p-8">
            {/* Live Intel Feed (Input) */}
            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <Zap className="h-5 w-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-emerald-300">
                  Live Intel Feed
                </h3>
                <span className="rounded bg-emerald-950/50 px-2 py-1 text-xs text-emerald-300 border border-emerald-500/20">
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
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg border-2 border-red-500/50 bg-red-500/10 backdrop-blur-sm">
                    <div className="flex items-center gap-2 rounded-full bg-red-950/90 px-4 py-2 border border-red-500/50">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <span className="font-bold text-red-300">SYSTEM BLOCKED</span>
                    </div>
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
                  className={`rounded px-2 py-1 text-xs border ${isBlockingMode ? "bg-red-950/50 text-red-300 border-red-500/20" : "bg-cyan-950/50 text-cyan-300 border-cyan-500/20"}`}
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
                            className={`font-mono text-sm ${isBlockingMode ? "text-red-300" : "text-cyan-300"}`}
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
                  <div className="mt-4 rounded-lg border border-cyan-500/50 bg-cyan-950/30 p-3 animate-pulse">
                    <div className="flex items-center gap-2 text-cyan-300">
                      <RotateCcw className="h-4 w-4 animate-spin" />
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

            {/* Code Comparison */}
            <div className="mt-8">
              <CodeComparison
                badCode={blockingCode}
                goodCode={deferredCode}
                language="tsx"
                themeColor="cyan"
                badLabel="❌ Direct Connection (Blocking)"
                goodLabel="✅ Turnstile Pattern (Deferred)"
                badExplanation="Connecting heavy computation directly to input state blocks the main thread on every keystroke, causing the UI to freeze."
                goodExplanation="useDeferredValue creates a secondary version of the state that updates with lower priority, keeping the input responsive while results calculate in the background."
              />
            </div>
          </section>

          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="cyan"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}