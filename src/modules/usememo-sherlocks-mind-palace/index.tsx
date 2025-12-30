import { useState, useEffect, useMemo, useCallback } from "react";
import { Brain, Clock, AlertCircle, CheckCircle, Zap, RotateCcw, Eye, EyeOff } from "lucide-react";
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
    { id: "bus", label: "Bus Schedule", value: 23 }
  ]);
  const [leakedCalculations, setLeakedCalculations] = useState<number>(0);
  const [showPalace, setShowPalace] = useState<boolean>(true);
  const [parent] = useAutoAnimate();

  // Simulate expensive calculation (fibonacci)
  const performExpensiveCalculation = useCallback((inputs: number[]): number => {
    const startTime = performance.now();
    
    // Expensive operation: sum of fibonacci sequence up to nth number
    const fib = (n: number): number => {
      if (n <= 1) return n;
      return fib(n - 1) + fib(n - 2);
    };
    
    // Use inputs to determine complexity
    const complexity = Math.max(10, Math.floor(inputs.reduce((a, b) => a + b, 0) % 30));
    let result = 0;
    for (let i = 0; i < complexity; i++) {
      result += fib(i % 15);
    }
    
    const endTime = performance.now();
    setCalculationTime(endTime - startTime);
    return result;
  }, []);

  // Broken: Recalculates on every render
  const brokenCalculationResult = useMemo(() => {
    if (!isMemoizing) {
      const inputs = evidence.map(e => e.value);
      return performExpensiveCalculation(inputs);
    }
    return 0;
  }, [evidence, isMemoizing, performExpensiveCalculation]);

  // Fixed: Memoized with dependencies
  const memoizedCalculationResult = useMemo(() => {
    if (isMemoizing) {
      const inputs = evidence.map(e => e.value);
      return performExpensiveCalculation(inputs);
    }
    return 0;
  }, [evidence, isMemoizing, performExpensiveCalculation]);

  // Track renders and leaked calculations
  useEffect(() => {
    setRenderCount(prev => prev + 1);
    
    if (!isMemoizing && chapter >= 1) {
      // Simulate Lestrade's repeated questions triggering recalculations
      setLeakedCalculations(prev => {
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
    setEvidence(prev => prev.map(e => 
      e.id === id ? { ...e, value: Math.max(1, e.value + delta) } : e
    ));
  };

  const resetDemo = () => {
    setEvidence([
      { id: "mud", label: "Mud Composition", value: 42 },
      { id: "witness", label: "Witness Timeline", value: 15 },
      { id: "bus", label: "Bus Schedule", value: 23 }
    ]);
    setLeakedCalculations(0);
    setCalculationTime(0);
  };

  const chapters: Chapter[] = [
    {
      title: "The Deductive Engine",
      content: "Sherlock's mind processes complex deductions by connecting disparate clues—a computationally expensive operation. Once completed, the conclusion is 'filed away' as a stored result, avoiding the need to retrace the entire logical path. This mirrors React components that perform heavy calculations: the work is done once, and the result should be preserved for reuse unless the underlying evidence changes."
    },
    {
      title: "The Re-Litigation of the Obvious",
      content: "Without his Mind Palace, Sherlock must re-derive the same conclusion every time Lestrade asks—a wasteful repetition of mental effort. In React, this is the anti-pattern of re-running expensive functions on every render. Each state change triggers the entire calculation again, draining performance just as repeated questioning drains Sherlock's patience. The UI becomes sluggish, and the component's 'mental energy' is exhausted."
    },
    {
      title: "The Architecture of Memory",
      content: "The Mind Palace is Sherlock's solution: a dedicated mental space where completed deductions are stored with their specific evidence tags. When asked again, he retrieves the pre-computed answer instantly—unless the evidence changes. This is `useMemo`: it memoizes expensive calculations, caching results against a dependency array. The component only re-calculates when dependencies change, otherwise it retrieves the cached value with zero cost."
    },
    {
      title: "Calculation vs. Retrieval",
      content: "Two approaches side by side: constant re-calculation versus memoized retrieval. The first is frantic, slow, and exhausting—like Sherlock re-analyzing every clue from scratch. The second is calm and instant—storing the result and fetching it when needed. The key distinction: memoization only re-calculates when dependencies change. When evidence updates, the Mind Palace recognizes the invalidated conclusion and performs a fresh deduction."
    },
    {
      title: "The Rules of the Palace",
      content: "The Mind Palace isn't for trivial facts—storing breakfast orders costs more than simply remembering them. `useMemo` follows the same rule: don't memoize cheap calculations where overhead exceeds benefit. Reserve it for truly expensive operations. Most importantly, the system depends on accurate dependency tracking. Wrong dependencies create 'false conclusions'—stale cached values that don't reflect current evidence."
    }
  ];

  const currentChapter = chapters[chapter];

  // Code examples as template literals
  const expensiveFunctionCode = `// The expensive deduction
const analyzeClues = (clues: Clue[]): Conclusion => {
  // Complex logic connecting multiple evidence points
  return deriveConclusion(clues);
};`;

  const brokenMemoCode = `// ❌ Re-calculates on every render
function DetectiveWork() {
  const [clues, setClues] = useState(initialClues);
  
  // This runs on EVERY render
  const conclusion = analyzeClues(clues);
  
  return <div>{conclusion.text}</div>;
}`;

  const fixedMemoCode = `// ✅ Memoized with dependencies
function DetectiveWork() {
  const [clues, setClues] = useState(initialClues);
  
  // Only re-calculates when clues change
  const conclusion = useMemo(() => {
    return analyzeClues(clues);
  }, [clues]); // ← Dependency array
  
  return <div>{conclusion.text}</div>;
}`;

  const trivialMemoCode = `// ❌ Don't memoize trivial calculations
const breakfast = useMemo(() => {
  return "eggs and toast"; // This is cheap!
}, []); // Overhead > benefit

// ✅ Just calculate directly
const breakfast = "eggs and toast";`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-serif p-4 md:p-8">
      {/* Header */}
      <header className="border-b border-amber-500/30 bg-slate-950/80 backdrop-blur-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between gap-4 md:gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-2 md:gap-3">
              <Brain className="text-amber-500 w-6 h-6 md:w-8 md:h-8" />
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Sherlock</h1>
            </div>
            <p className="text-xs md:text-sm text-slate-400">Sherlock Holmes • 2010</p>
          </div>
          <p className="text-base md:text-lg text-amber-500 font-medium">
            useMemo Hook
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-7 mb-8 lg:mb-0">
          <div className="prose prose-invert prose-lg max-w-none mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-amber-100">
              {currentChapter.title}
            </h2>
            <p className="leading-relaxed text-slate-300">{currentChapter.content}</p>
          </div>

          {/* Chapter-specific Code Examples */}
          <div className="space-y-6 mb-8">
            {chapter === 0 && (
              <CodeBlock
                code={expensiveFunctionCode}
                variant="default"
                title="// The Complex Deduction"
                defaultExpanded={true}
              />
            )}
            
            {chapter === 1 && (
              <CodeBlock
                code={brokenMemoCode}
                variant="error"
                title="// ❌ Anti-pattern: Re-litigating the Obvious"
                defaultExpanded={true}
              />
            )}
            
            {chapter === 2 && (
              <CodeBlock
                code={fixedMemoCode}
                variant="success"
                title="// ✅ Solution: The Mind Palace (useMemo)"
                defaultExpanded={true}
              />
            )}
            
            {chapter === 4 && (
              <CodeBlock
                code={trivialMemoCode}
                variant="error"
                title="// ❌ vs ✅ When NOT to useMemo"
                defaultExpanded={true}
              />
            )}
          </div>

          {/* Navigation */}
          <nav className="flex justify-between items-center mt-8">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="px-4 md:px-6 py-2 md:py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            >
              ← Previous
            </button>
            
            <div className="text-center">
              <div className="text-sm text-slate-400 mb-1">Chapter Progress</div>
              <div className="flex items-center gap-2">
                <div className="w-32 md:w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-mono tabular-nums">
                  {chapter + 1}/{chapters.length}
                </span>
              </div>
            </div>
            
            <button
              onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
              disabled={chapter === chapters.length - 1}
              className="px-4 md:px-6 py-2 md:py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            >
              Next →
            </button>
          </nav>
        </div>

        {/* Right Column: Interactive Mind Palace */}
        <div className="lg:col-span-5">
          <div className="sticky top-8">
            <div className="bg-slate-900/80 border border-amber-500/30 rounded-xl p-4 md:p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg md:text-xl font-bold text-amber-300 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Sherlock's Mind Palace
                </h3>
                <button
                  onClick={() => setShowPalace(!showPalace)}
                  className="text-slate-400 hover:text-amber-500 transition-colors"
                >
                  {showPalace ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {showPalace && (
                <div ref={parent} className="space-y-6">
                  {/* Mode Toggle */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setIsMemoizing(false)}
                      className={`flex-1 py-2 rounded-lg transition-all duration-300 ${!isMemoizing ? 'bg-red-900/40 border border-red-500/50 text-red-300' : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Re-Deducing</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setIsMemoizing(true)}
                      className={`flex-1 py-2 rounded-lg transition-all duration-300 ${isMemoizing ? 'bg-emerald-900/40 border border-emerald-500/50 text-emerald-300' : 'bg-slate-800/50 border border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Mind Palace</span>
                      </div>
                    </button>
                  </div>

                  {/* Evidence/Dependencies */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                      Evidence (Dependencies)
                    </h4>
                    <div className="space-y-3">
                      {evidence.map((item) => (
                        <div key={item.id} className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg">
                          <div>
                            <div className="font-medium text-slate-300">{item.label}</div>
                            <div className="text-sm text-slate-500">Value: <span className="font-mono text-amber-400">{item.value}</span></div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => updateEvidence(item.id, -1)}
                              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors"
                            >
                              −
                            </button>
                            <button
                              onClick={() => updateEvidence(item.id, 1)}
                              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-sm transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calculation Result */}
                  <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-300">Deduction Result</h4>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${isMemoizing ? 'bg-emerald-900/30 text-emerald-400' : 'bg-red-900/30 text-red-400'}`}>
                        {isMemoizing ? 'MEMOIZED' : 'RE-CALCULATING'}
                      </div>
                    </div>
                    <div className="text-2xl font-bold font-mono text-center mb-2 text-amber-300">
                      {isMemoizing ? memoizedCalculationResult.toLocaleString() : brokenCalculationResult.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500 text-center">
                      Calculation took <span className="text-amber-400 font-mono">{calculationTime.toFixed(2)}ms</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/30 p-3 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Render Count</div>
                      <div className="text-xl font-bold font-mono text-slate-300">{renderCount}</div>
                    </div>
                    <div className="bg-slate-800/30 p-3 rounded-lg">
                      <div className="text-xs text-slate-500 mb-1">Leaked Calculations</div>
                      <div className={`text-xl font-bold font-mono ${leakedCalculations > 10 ? 'text-red-400' : 'text-slate-300'}`}>
                        {leakedCalculations}
                        {leakedCalculations > 10 && <AlertCircle className="w-4 h-4 inline ml-2" />}
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        // Trigger re-render to simulate Lestrade's question
                        setRenderCount(prev => prev + 1);
                      }}
                      className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Lestrade Asks Again</span>
                    </button>
                    <button
                      onClick={resetDemo}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span className="hidden md:inline">Reset</span>
                    </button>
                  </div>

                  {/* Explanation */}
                  <div className="text-sm text-slate-500 border-t border-slate-800 pt-4 mt-4">
                    <p className="mb-2">
                      {isMemoizing ? (
                        <>
                          <span className="text-emerald-400">✓ Mind Palace Active</span>: The deduction is stored. Changing evidence triggers recalculation; identical evidence returns cached result instantly.
                        </>
                      ) : (
                        <>
                          <span className="text-red-400">✗ Re-deducing Every Time</span>: Every "question" (render) forces Sherlock to re-derive the conclusion from scratch—exhausting and slow.
                        </>
                      )}
                    </p>
                    <p>
                      <Clock className="w-3 h-3 inline mr-1" />
                      Performance impact: {calculationTime > 5 ? 'Significant' : 'Minimal'}
                    </p>
                  </div>
                </div>
              )}

              {!showPalace && (
                <div className="text-center py-8 text-slate-500">
                  <Brain className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p>The Mind Palace is currently hidden.</p>
                  <button
                    onClick={() => setShowPalace(true)}
                    className="mt-4 text-amber-500 hover:text-amber-400 underline"
                  >
                    Reveal Palace
                  </button>
                </div>
              )}
            </div>

            {/* Key Insight */}
            <div className="mt-4 p-4 bg-amber-950/20 border border-amber-500/30 rounded-xl">
              <h4 className="font-bold text-amber-300 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Key Insight
              </h4>
              <p className="text-sm text-amber-200/80">
                {chapter === 0 && "Expensive calculations should be performed once and stored."}
                {chapter === 1 && "Re-calculating on every render wastes performance—like re-solving the same puzzle."}
                {chapter === 2 && "useMemo stores results until dependencies change—retrieval is instant."}
                {chapter === 3 && "Only re-calculate when evidence changes. Otherwise, retrieve from cache."}
                {chapter === 4 && "Don't memoize trivial calculations. The overhead costs more than the work saved."}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}