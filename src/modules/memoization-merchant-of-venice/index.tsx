import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Scale, BookOpen, Brain, Zap, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

// Simulate an expensive calculation like parsing legal code
const useExpensiveCalculation = (input: number, enabled: boolean): number => {
  const [result, setResult] = useState(0);
  const calculationCountRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    calculationCountRef.current += 1;
    // Artificial delay to simulate heavy computation
    const startTime = performance.now();
    let computed = input;
    for (let i = 0; i < 1000000; i++) {
      computed = Math.sqrt(computed + i) * Math.sin(computed);
    }
    const endTime = performance.now();
    
    // Force a visual delay for demonstration
    const timer = setTimeout(() => {
      setResult(computed);
    }, 300);

    return () => clearTimeout(timer);
  }, [input, enabled]);

  return result;
};

export default function MemoizationMerchantOfVenice(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'broken' | 'fixed'>('broken');
  const [inputValue, setInputValue] = useState<number>(5);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [calculationCost, setCalculationCost] = useState<number>(0);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);
  const autoRunIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Circuit breaker safety
  const MAX_CALCULATIONS = 50;
  const [safetyResetCount, setSafetyResetCount] = useState<number>(0);

  // Count renders for demo
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, [chapter, demoMode, inputValue, isAutoRunning]);

  // Auto-run simulation for Chapter 1 (Build)
  useEffect(() => {
    if (isAutoRunning && chapter === 1) {
      autoRunIntervalRef.current = setInterval(() => {
        setInputValue(prev => (prev % 10) + 1);
        setCalculationCost(prev => {
          const newCost = prev + 1;
          // Circuit breaker
          if (newCost >= MAX_CALCULATIONS) {
            resetDemo();
            setSafetyResetCount(prev => prev + 1);
            return 0;
          }
          return newCost;
        });
      }, 500);
    }
    
    return () => {
      if (autoRunIntervalRef.current) {
        clearInterval(autoRunIntervalRef.current);
        autoRunIntervalRef.current = null;
      }
    };
  }, [isAutoRunning, chapter]);

  // The "expensive" calculation - conditionally memoized
  const expensiveResult = useExpensiveCalculation(inputValue, demoMode === 'broken' || chapter <= 1);
  const memoizedResult = useMemo(() => {
    // This would be the same calculation, but memoized
    return useExpensiveCalculation(inputValue, true);
  }, [inputValue]);

  const resetDemo = useCallback(() => {
    setIsAutoRunning(false);
    setInputValue(5);
    setCalculationCost(0);
    if (autoRunIntervalRef.current) {
      clearInterval(autoRunIntervalRef.current);
      autoRunIntervalRef.current = null;
    }
  }, []);

  const chapters: Chapter[] = [
    { 
      title: "The Tome of Reason", 
      content: "Portia's legal argument is a heavy, complex calculation—weaving law, equity, and rhetoric. Like parsing deep component props or filtering large lists, some operations are inherently expensive and costly to recompute." 
    },
    { 
      title: "Rebuilding the Cathedral", 
      content: "Re-deriving the full argument for every minor question wastes mental effort and time. In React, recalculating expensive values on every render causes performance lag—blocking the main thread like a ticking clock." 
    },
    { 
      title: "Written in the Mind", 
      content: "Portia prepares by studying the bond and law—her dependencies. She caches the perfected argument. `useMemo` does this: compute once based on dependencies, cache the result, and recall it efficiently until inputs change." 
    },
    { 
      title: "A Bond of Dependencies", 
      content: "Shylock's claim fails when a new law (dependency) appears; his logic didn't include it. Portia's memoized argument succeeds—built on complete dependencies. An accurate dependency array is critical for correct memoization." 
    },
    { 
      title: "The Quality of Performance", 
      content: "The trial's success came from prepared, cached reasoning delivered efficiently. `useMemo` optimizes performance by caching expensive calculations, ensuring smooth UI rendering and preserving user experience." 
    },
  ];

  const currentChapter = chapters[chapter];

  // Code examples
  const antiPatternCode = `// ❌ Recalculates on every render
function LegalArgument({ statute, bondText }) {
  // This runs every time, even if inputs unchanged
  const complexRuling = expensiveCalculation(statute, bondText);
  
  return <Verdict ruling={complexRuling} />;
}`;

  const memoizedCode = `// ✅ Memoizes based on dependencies
function LegalArgument({ statute, bondText }) {
  // Only recalculates when statute or bondText changes
  const complexRuling = useMemo(
    () => expensiveCalculation(statute, bondText),
    [statute, bondText] // Dependency array
  );
  
  return <Verdict ruling={complexRuling} />;
}`;

  const dependencyArrayCode = `// ⚠️ Incorrect dependency array
const ruling = useMemo(
  () => expensiveCalculation(statute, bondText),
  [statute] // Missing bondText!
  // Stale closure: won't update if bondText changes
);

// ✅ Correct dependency array
const ruling = useMemo(
  () => expensiveCalculation(statute, bondText),
  [statute, bondText] // All inputs listed
);`;

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Scale}
        title="The Merchant of Venice"
        subtitle="Portia as Balthazar, c. 1596"
        concept="React Concept: useMemo Hook"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* 1. Interactive Controls */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Zap className="h-5 w-5 text-amber-400" />
                  Courtroom Demo
                </h3>
                
                <div className="mb-4 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDemoMode('broken')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'broken' ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      ❌ Recalculate
                    </button>
                    <button
                      onClick={() => setDemoMode('fixed')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'fixed' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      ✅ Memoized
                    </button>
                  </div>
                  
                  {chapter === 1 && (
                    <button
                      onClick={() => setIsAutoRunning(!isAutoRunning)}
                      className={`rounded px-3 py-2 text-sm ${isAutoRunning ? 'bg-amber-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      {isAutoRunning ? '⏸️ Pause Strain' : '▶️ Simulate Strain'}
                    </button>
                  )}
                  
                  <button
                    onClick={resetDemo}
                    className="rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
                  >
                    🔄 Reset Demo
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded bg-slate-800/50 p-3">
                    <div className="text-xs text-slate-400">Render Count</div>
                    <div className="font-mono text-xl tabular-nums">{renderCount}</div>
                  </div>
                  <div className="rounded bg-slate-800/50 p-3">
                    <div className="text-xs text-slate-400">Calc. Cost</div>
                    <div className={`font-mono text-xl tabular-nums ${calculationCost > 30 ? 'text-red-400' : calculationCost > 15 ? 'text-amber-400' : 'text-slate-300'}`}>
                      {calculationCost}
                    </div>
                  </div>
                  <div className="rounded bg-slate-800/50 p-3">
                    <div className="text-xs text-slate-400">Input Value</div>
                    <div className="font-mono text-xl tabular-nums">{inputValue}</div>
                  </div>
                  <div className="rounded bg-slate-800/50 p-3">
                    <div className="text-xs text-slate-400">Mode</div>
                    <div className={`font-medium ${demoMode === 'broken' ? 'text-red-400' : 'text-emerald-400'}`}>
                      {demoMode === 'broken' ? 'Recalculating' : 'Memoized'}
                    </div>
                  </div>
                </div>
                
                {safetyResetCount > 0 && (
                  <div className="mt-3 rounded border border-amber-500/30 bg-amber-950/30 p-2">
                    <p className="text-xs text-amber-300">
                      ⚡ Safety reset triggered {safetyResetCount} time{safetyResetCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>

              {/* 2. Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <BookOpen className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Portia's Legal Argument</span>
                    <span className="text-sm font-medium">Expensive Calculation</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Memoized Argument</span>
                    <span className="text-sm font-medium">useMemo Return Value</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Bond Terms & Law</span>
                    <span className="text-sm font-medium">Dependency Array</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Re-deriving Each Question</span>
                    <span className="text-sm font-medium">Recalculation Anti-pattern</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Shylock's Knife & Clock</span>
                    <span className="text-sm font-medium">Performance Cost</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Pre-Trial Preparation</span>
                    <span className="text-sm font-medium">Initial Computation</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-sm text-slate-400">Shylock's Rigid Literalism</span>
                    <span className="text-sm font-medium">Incomplete Dependencies</span>
                  </div>
                </div>
              </div>

              {/* 3. Key Insight Card */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <Brain className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "Some React calculations are inherently expensive—like complex legal arguments. Identifying them is the first step to optimization."}
                  {chapter === 1 && "Recalculating expensive values on every render causes UI lag and wasted resources, blocking user interaction."}
                  {chapter === 2 && "useMemo caches calculation results based on dependencies. If inputs don't change, React returns the cached value."}
                  {chapter === 3 && "An accurate dependency array is critical. Missing dependencies cause stale values; extra dependencies cause unnecessary recalculations."}
                  {chapter === 4 && "Memoization isn't free—it trades memory for CPU. Use it strategically for truly expensive calculations that have stable inputs."}
                </p>
              </div>

              {/* 4. Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && "\"The weight of the argument was a tome in itself.\""}
                  {chapter === 1 && "\"Must I rebuild the cathedral for every stone the court examines?\""}
                  {chapter === 2 && "\"Let it be written here, and recalled, not remade.\""}
                  {chapter === 3 && "\"His claim crumbled at the introduction of a new law; her argument was built upon it.\""}
                  {chapter === 4 && "\"The quality of mercy is not strained, and neither should be the performance of your reason.\""}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — {chapter === 2 || chapter === 4 ? "Portia" : "Balthazar"}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-amber-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter-specific demos */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-lg font-semibold">The Expensive Function</h4>
                    <p className="mb-4 text-sm text-slate-400">
                      Like Portia's legal reasoning, this simulated calculation is intentionally slow. It parses "legal code" with artificial complexity.
                    </p>
                    <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm text-slate-400">Calculation Input:</span>
                        <span className="font-mono text-lg">{inputValue}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Computed Result:</span>
                        <span className="font-mono text-lg text-amber-300">
                          {expensiveResult.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={`function expensiveLegalCalculation(statute) {
  // Simulate complex legal parsing
  let result = statute;
  for (let i = 0; i < 1000000; i++) {
    result = Math.sqrt(result + i) * Math.sin(result);
  }
  return result;
}`}
                      language="typescript"
                      variant="default"
                      title="// The Costly Operation"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="mb-4">
                  <p className="text-slate-400">
                    The input changes automatically to simulate a dynamic component. Without memoization, the expensive calculation runs every time.
                  </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <h4 className="font-semibold text-red-300">Performance Strain</h4>
                      </div>
                      <p className="text-sm text-red-200/80">
                        Each render triggers the full calculation, causing visible lag. The "calculation cost" metric rises quickly.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Status:</span>
                        <span className={`font-medium ${isAutoRunning ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`}>
                          {isAutoRunning ? '⏳ Calculating...' : 'Idle'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Input Changes:</span>
                        <span className="font-mono">{calculationCost}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={antiPatternCode}
                      language="tsx"
                      variant="error"
                      title="// ❌ Recalculates Every Render"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={memoizedCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Without useMemo"
                  goodLabel="✅ With useMemo"
                  badExplanation="The expensive calculation runs on every render, causing performance degradation as the component updates."
                  goodExplanation="useMemo caches the result. It only recalculates when statute or bondText change, dramatically improving performance."
                />
                
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-400" />
                    <h4 className="font-semibold">Live Comparison</h4>
                  </div>
                  <p className="mb-3 text-sm text-amber-200/80">
                    Toggle between modes in the sidebar controls. Watch how "Memoized" mode responds instantly while "Recalculate" mode lags.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded bg-slate-800/50 p-3 text-center">
                      <div className="text-xs text-slate-400">Current Mode</div>
                      <div className={`text-lg font-bold ${demoMode === 'broken' ? 'text-red-400' : 'text-emerald-400'}`}>
                        {demoMode === 'broken' ? 'Recalculating' : 'Memoized'}
                      </div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-3 text-center">
                      <div className="text-xs text-slate-400">Result</div>
                      <div className="font-mono text-lg text-amber-300">
                        {demoMode === 'broken' ? expensiveResult.toFixed(4) : memoizedResult.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <div className="mb-4">
                  <p className="text-slate-400">
                    Adjust dependencies to see how memoization behaves. Adding a dependency forces recalculation; removing one can cause stale values.
                  </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                        <h4 className="font-semibold text-emerald-300">Dependency Playground</h4>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Statute Dependency:</span>
                          <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Bond Text Dependency:</span>
                          <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Legal Precedent:</span>
                          <div className="h-3 w-3 rounded-full bg-slate-600"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <button 
                        onClick={() => setInputValue(prev => prev + 1)}
                        className="w-full rounded bg-slate-800 py-2 hover:bg-slate-700"
                      >
                        Change Input Value (Forces Recalculation)
                      </button>
                      <p className="text-xs text-slate-500">
                        When input changes, both dependencies are affected, so memoization correctly recalculates.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={dependencyArrayCode}
                      language="tsx"
                      variant="default"
                      title="// ⚖️ Dependency Array Precision"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-lg font-semibold">Performance Summary</h4>
                    <div className="space-y-4">
                      <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
                        <div className="mb-3 text-sm text-slate-400">Cost Analysis</div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>Total Renders:</span>
                            <span className="font-mono">{renderCount}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Calculations Triggered:</span>
                            <span className="font-mono">{calculationCost}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Memoization Efficiency:</span>
                            <span className="font-mono text-emerald-400">
                              {renderCount > 0 ? Math.max(0, 100 - Math.round((calculationCost / renderCount) * 100)) : 100}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400">
                        With proper memoization, only dependency changes trigger expensive calculations. Most renders use cached values.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={`// 🎯 Strategic useMemo Guidelines

// 1. Use for expensive calculations
const transformedData = useMemo(
  () => expensiveTransform(rawData),
  [rawData]
);

// 2. Use for stable object references
const config = useMemo(
  () => ({ theme: 'dark', duration: 300 }),
  [] // Empty array: never recalculates
);

// 3. Don't overuse - memoization has memory cost
// const x = useMemo(() => y + 1, [y]); // ❌ Overkill`}
                      language="typescript"
                      variant="success"
                      title="// 📜 Best Practices"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

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