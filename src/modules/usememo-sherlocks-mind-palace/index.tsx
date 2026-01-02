import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Brain,
  Clock,
  AlertCircle,
  CheckCircle,
  Zap,
  RotateCcw,
  Eye,
  EyeOff,
} from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeComparison } from "@/components/common/CodeComparison";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  title: string;
  content: string;
}

interface Evidence {
  id: string;
  label: string;
  value: number;
}

export default function UseMemoSherlocksMindPalace(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [calculationTime, setCalculationTime] = useState<number>(0);
  const [isMemoizing, setIsMemoizing] = useState<boolean>(false);
  const [evidence, setEvidence] = useState<Evidence[]>([
    { id: "mud", label: "Mud Composition", value: 42 },
    { id: "witness", label: "Witness Timeline", value: 15 },
    { id: "bus", label: "Bus Schedule", value: 23 },
  ]);
  const [leakedCalculations, setLeakedCalculations] = useState<number>(0);
  const [showPalace, setShowPalace] = useState<boolean>(true);
  const [parent] = useAutoAnimate();

  // Simulate expensive calculation (fibonacci)
  const performExpensiveCalculation = useCallback(
    (inputs: number[]): number => {
      const startTime = performance.now();

      // Expensive operation: sum of fibonacci sequence up to nth number
      const fib = (n: number): number => {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
      };

      // Use inputs to determine complexity
      const complexity = Math.max(
        10,
        Math.floor(inputs.reduce((a, b) => a + b, 0) % 30),
      );
      let result = 0;
      for (let i = 0; i < complexity; i++) {
        result += fib(i % 15);
      }

      const endTime = performance.now();
      setCalculationTime(endTime - startTime);
      return result;
    },
    [],
  );

  // Broken: Recalculates on every render
  const brokenCalculationResult = useMemo(() => {
    if (!isMemoizing) {
      const inputs = evidence.map((e) => e.value);
      return performExpensiveCalculation(inputs);
    }
    return 0;
  }, [evidence, isMemoizing, performExpensiveCalculation]);

  // Fixed: Memoized with dependencies
  const memoizedCalculationResult = useMemo(() => {
    if (isMemoizing) {
      const inputs = evidence.map((e) => e.value);
      return performExpensiveCalculation(inputs);
    }
    return 0;
  }, [evidence, isMemoizing, performExpensiveCalculation]);

  // Track renders and leaked calculations
  useEffect(() => {
    setRenderCount((prev) => prev + 1);

    if (!isMemoizing && chapter >= 1) {
      // Simulate Lestrade's repeated questions triggering recalculations
      setLeakedCalculations((prev) => {
        const newValue = prev + 1;
        if (newValue > 50) {
          resetDemo(); // Circuit breaker
          return 0;
        }
        return newValue;
      });
    }
  }, [chapter, isMemoizing]);

  const updateEvidence = (id: string, delta: number) => {
    setEvidence((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, value: Math.max(1, e.value + delta) } : e,
      ),
    );
  };

  const resetDemo = () => {
    setEvidence([
      { id: "mud", label: "Mud Composition", value: 42 },
      { id: "witness", label: "Witness Timeline", value: 15 },
      { id: "bus", label: "Bus Schedule", value: 23 },
    ]);
    setLeakedCalculations(0);
    setCalculationTime(0);
  };

  const chapters: Chapter[] = [
    {
      title: "The Deductive Engine",
      content:
        "Sherlock's mind processes complex deductions by connecting disparate clues—a computationally expensive operation. Once completed, the conclusion is 'filed away' as a stored result, avoiding the need to retrace the entire logical path. This mirrors React components that perform heavy calculations: the work is done once, and the result should be preserved for reuse unless the underlying evidence changes.",
    },
    {
      title: "The Re-Litigation of the Obvious",
      content:
        "Without his Mind Palace, Sherlock must re-derive the same conclusion every time Lestrade asks—a wasteful repetition of mental effort. In React, this is the anti-pattern of re-running expensive functions on every render. Each state change triggers the entire calculation again, draining performance just as repeated questioning drains Sherlock's patience. The UI becomes sluggish, and the component's 'mental energy' is exhausted.",
    },
    {
      title: "The Architecture of Memory",
      content:
        "The Mind Palace is Sherlock's solution: a dedicated mental space where completed deductions are stored with their specific evidence tags. When asked again, he retrieves the pre-computed answer instantly—unless the evidence changes. This is `useMemo`: it memoizes expensive calculations, caching results against a dependency array. The component only re-calculates when dependencies change, otherwise it retrieves the cached value with zero cost.",
    },
    {
      title: "Calculation vs. Retrieval",
      content:
        "Two approaches side by side: constant re-calculation versus memoized retrieval. The first is frantic, slow, and exhausting—like Sherlock re-analyzing every clue from scratch. The second is calm and instant—storing the result and fetching it when needed. The key distinction: memoization only re-calculates when dependencies change. When evidence updates, the Mind Palace recognizes the invalidated conclusion and performs a fresh deduction.",
    },
    {
      title: "The Rules of the Palace",
      content:
        "The Mind Palace isn't for trivial facts—storing breakfast orders costs more than simply remembering them. `useMemo` follows the same rule: don't memoize cheap calculations where overhead exceeds benefit. Reserve it for truly expensive operations. Most importantly, the system depends on accurate dependency tracking. Wrong dependencies create 'false conclusions'—stale cached values that don't reflect current evidence.",
    },
  ];

  const currentChapter = chapters[chapter];

  // Code examples as template literals
  const expensiveFunctionCode = `// The expensive deduction
const analyzeClues = (clues: Clue[]): Conclusion => {
  // Complex logic connecting multiple evidence points
  return deriveConclusion(clues);
};`;

  const brokenMemoCode = `// Re-calculates on EVERY render
function DetectiveWork() {
  const [clues, setClues] = useState(initialClues);

  // This runs on EVERY render
  const conclusion = analyzeClues(clues);

  return <div>{conclusion.text}</div>;
}`;

  const fixedMemoCode = `// Only re-calculates when clues change
function DetectiveWork() {
  const [clues, setClues] = useState(initialClues);

  // Only re-calculates when clues change
  const conclusion = useMemo(() => {
    return analyzeClues(clues);
  }, [clues]); // ← Dependency array

  return <div>{conclusion.text}</div>;
}`;

  const trivialMemoBadCode = `// Don't memoize trivial calculations
const breakfast = useMemo(() => {
  return "eggs and toast"; // This is cheap!
}, []); // Overhead > benefit`;

  const trivialMemoGoodCode = `// Just calculate directly
const breakfast = "eggs and toast";`;

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      {/* Standardized Header */}
      <ModuleHeader
        icon={Brain}
        title="Sherlock"
        subtitle="Sherlock Holmes • 2010"
        concept="useMemo Hook"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Standardized Layout */}
        <ModuleLayout
          sidebar={
            <div className="sticky top-24">
              {/* Interactive Mind Palace */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4 backdrop-blur-sm md:p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-amber-300 md:text-xl">
                    <Brain className="h-5 w-5" />
                    Sherlock's Mind Palace
                  </h3>
                  <button
                    onClick={() => setShowPalace(!showPalace)}
                    className="text-slate-400 transition-colors hover:text-amber-500"
                    aria-label={
                      showPalace ? "Hide Mind Palace" : "Show Mind Palace"
                    }
                  >
                    {showPalace ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {showPalace && (
                  <div ref={parent} className="space-y-6">
                    {/* Mode Toggle */}
                    <div className="mb-6 flex gap-2">
                      <button
                        onClick={() => setIsMemoizing(false)}
                        className={`flex-1 rounded-lg py-2 transition-all duration-300 ${!isMemoizing ? "border border-red-500/50 bg-red-900/40 text-red-300" : "border border-slate-700 bg-slate-800/50 text-slate-400 hover:bg-slate-800"}`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">Re-Deducing</span>
                        </div>
                      </button>
                      <button
                        onClick={() => setIsMemoizing(true)}
                        className={`flex-1 rounded-lg py-2 transition-all duration-300 ${isMemoizing ? "border border-emerald-500/50 bg-emerald-900/40 text-emerald-300" : "border border-slate-700 bg-slate-800/50 text-slate-400 hover:bg-slate-800"}`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Mind Palace</span>
                        </div>
                      </button>
                    </div>

                    {/* Evidence/Dependencies */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                        Evidence (Dependencies)
                      </h4>
                      <div className="space-y-3">
                        {evidence.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between rounded-lg bg-slate-800/50 p-3"
                          >
                            <div>
                              <div className="text-sm font-medium text-slate-300">
                                {item.label}
                              </div>
                              <div className="text-xs text-slate-500">
                                Value:{" "}
                                <span className="font-mono text-amber-400">
                                  {item.value}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateEvidence(item.id, -1)}
                                className="rounded bg-slate-700 px-3 py-1 text-sm transition-colors hover:bg-slate-600"
                                aria-label={`Decrease ${item.label}`}
                              >
                                −
                              </button>
                              <button
                                onClick={() => updateEvidence(item.id, 1)}
                                className="rounded bg-slate-700 px-3 py-1 text-sm transition-colors hover:bg-slate-600"
                                aria-label={`Increase ${item.label}`}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Calculation Result */}
                    <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-medium text-slate-300">
                          Deduction Result
                        </h4>
                        <div
                          className={`rounded px-2 py-1 text-xs font-medium ${isMemoizing ? "bg-emerald-900/30 text-emerald-400" : "bg-red-900/30 text-red-400"}`}
                        >
                          {isMemoizing ? "MEMOIZED" : "RE-CALCULATING"}
                        </div>
                      </div>
                      <div className="mb-2 text-center font-mono text-2xl font-bold text-amber-300">
                        {isMemoizing
                          ? memoizedCalculationResult.toLocaleString()
                          : brokenCalculationResult.toLocaleString()}
                      </div>
                      <div className="text-center text-sm text-slate-500">
                        Calculation took{" "}
                        <span className="font-mono text-amber-400">
                          {calculationTime.toFixed(2)}ms
                        </span>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-slate-800/30 p-3">
                        <div className="mb-1 text-xs text-slate-500">
                          Render Count
                        </div>
                        <div className="font-mono text-xl font-bold text-slate-300">
                          {renderCount}
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-800/30 p-3">
                        <div className="mb-1 text-xs text-slate-500">
                          Leaked Calculations
                        </div>
                        <div
                          className={`font-mono text-xl font-bold ${leakedCalculations > 10 ? "text-red-400" : "text-slate-300"}`}
                        >
                          {leakedCalculations}
                          {leakedCalculations > 10 && (
                            <AlertCircle className="ml-2 inline h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          // Trigger re-render to simulate Lestrade's question
                          setRenderCount((prev) => prev + 1);
                        }}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-700 py-2 text-sm transition-colors hover:bg-slate-600"
                      >
                        <Zap className="h-4 w-4" />
                        <span>Lestrade Asks</span>
                      </button>
                      <button
                        onClick={resetDemo}
                        className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 transition-colors hover:bg-slate-700"
                        aria-label="Reset demo"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Explanation */}
                    <div className="mt-4 border-t border-slate-800 pt-4 text-sm text-slate-500">
                      <p className="mb-2">
                        {isMemoizing ? (
                          <>
                            <span className="text-emerald-400">
                              ✓ Mind Palace Active
                            </span>
                            : The deduction is stored. Changing evidence
                            triggers recalculation; identical evidence returns
                            cached result instantly.
                          </>
                        ) : (
                          <>
                            <span className="text-red-400">
                              ✗ Re-deducing Every Time
                            </span>
                            : Every "question" (render) forces Sherlock to
                            re-derive the conclusion from scratch—exhausting and
                            slow.
                          </>
                        )}
                      </p>
                      <p className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Performance impact:{" "}
                        {calculationTime > 5 ? "Significant" : "Minimal"}
                      </p>
                    </div>
                  </div>
                )}

                {!showPalace && (
                  <div className="py-8 text-center text-slate-500">
                    <Brain className="mx-auto mb-4 h-12 w-12 opacity-30" />
                    <p>The Mind Palace is currently hidden.</p>
                    <button
                      onClick={() => setShowPalace(true)}
                      className="mt-4 text-amber-500 underline hover:text-amber-400"
                    >
                      Reveal Palace
                    </button>
                  </div>
                )}
              </div>

              {/* Key Insight Card */}
              <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 &&
                    "Expensive calculations should be performed once and stored."}
                  {chapter === 1 &&
                    "Re-calculating on every render wastes performance—like re-solving the same puzzle."}
                  {chapter === 2 &&
                    "useMemo stores results until dependencies change—retrieval is instant."}
                  {chapter === 3 &&
                    "Only re-calculate when evidence changes. Otherwise, retrieve from cache."}
                  {chapter === 4 &&
                    "Don't memoize trivial calculations. The overhead costs more than the work saved."}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-amber-100 sm:text-3xl">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Chapter-Specific Code Examples */}
          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6 backdrop-blur-sm sm:mb-12 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Code Examples
              </h3>
            </div>

            <div className="space-y-6">
              {chapter === 0 && (
                <CodeBlock
                  code={expensiveFunctionCode}
                  language="tsx"
                  title="// The Complex Deduction"
                  defaultExpanded={true}
                />
              )}

              {chapter === 1 && (
                <CodeBlock
                  code={brokenMemoCode}
                  language="tsx"
                  title="// ❌ Anti-pattern: Re-litigating the Obvious"
                  defaultExpanded={true}
                />
              )}

              {chapter === 2 && (
                <CodeBlock
                  code={fixedMemoCode}
                  language="tsx"
                  title="// ✅ Solution: The Mind Palace (useMemo)"
                  defaultExpanded={true}
                />
              )}

              {chapter === 3 && (
                <CodeComparison
                  badCode={brokenMemoCode}
                  goodCode={fixedMemoCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Re-calculating Every Render"
                  goodLabel="✅ Memoized with Dependencies"
                  badExplanation="Every render triggers the expensive calculation, even when clues haven't changed. This drains performance like Sherlock re-solving the case from scratch each time Lestrade asks."
                  goodExplanation="The calculation only runs when dependencies change. React caches the result and returns it instantly on subsequent renders—just like Sherlock retrieving a conclusion from his Mind Palace."
                />
              )}

              {chapter === 4 && (
                <CodeComparison
                  badCode={trivialMemoBadCode}
                  goodCode={trivialMemoGoodCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Over-Memoization"
                  goodLabel="✅ Direct Calculation"
                  badExplanation="Memoizing trivial calculations adds overhead without benefit. The cost of checking dependencies and managing cache exceeds the work saved."
                  goodExplanation="For cheap operations, direct calculation is faster. Save useMemo for genuinely expensive computations where the benefit outweighs the overhead."
                />
              )}
            </div>
          </section>

          {/* Standardized Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="amber"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}
