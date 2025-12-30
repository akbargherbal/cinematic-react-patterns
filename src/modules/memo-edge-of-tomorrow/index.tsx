import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Brain, SkipForward, Zap, Cpu, Timer, RefreshCw, ChevronLeft, ChevronRight, Shield, Target } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function MemoEdgeOfTomorrow(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [parentRenderCount, setParentRenderCount] = useState<number>(0);
  const [forceRenders, setForceRenders] = useState<number>(0);
  const [bruteForceRenders, setBruteForceRenders] = useState<number>(0);
  const [memoizedRenders, setMemoizedRenders] = useState<number>(0);
  const [energy, setEnergy] = useState<number>(100);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [showOptimized, setShowOptimized] = useState<boolean>(true);
  const [sectorProps, setSectorProps] = useState<Record<string, number>>({
    alpha: 1,
    beta: 2,
    gamma: 3,
    delta: 4
  });
  const [animationParent] = useAutoAnimate();

  // Circuit breaker - reset if forced renders exceed safe limit
  useEffect(() => {
    if (forceRenders > 100) {
      resetDemo();
    }
  }, [forceRenders]);

  // Energy depletion simulation
  useEffect(() => {
    if (chapter === 1) {
      const drain = Math.max(0, forceRenders * 0.5);
      setEnergy(Math.max(0, 100 - drain));
    }
  }, [forceRenders, chapter]);

  const chapters: Chapter[] = [
    {
      id: "relentless-render",
      title: "The Relentless Render",
      content: "The world lurches into existence with a drill sergeant's scream. This is the render cycle—the parent component state updates and the day begins anew. Every time the parent re-renders, all children must evaluate. The beach landing executes again, identical to the last loop. Live. Die. Re-render. The loop is relentless."
    },
    {
      id: "brute-force",
      title: "The Brute-Force Approach",
      content: "Loop after loop, Cage hammers himself against the problem. He re-executes the beach landing perfectly each time, but the cost is immense. His suit steams, his muscles scream. 'You're re-fighting battles you've already won,' Rita tells him. The waste leaves him too exhausted to handle new threats when props finally change."
    },
    {
      id: "recognition",
      title: "The Recognition Principle",
      content: "'If the picture is the same, you don't need to paint it again,' Rita explains. Cage learns to perform a shallow comparison: check if the tactical inputs (props) are identical. If they are, skip the execution and use the cached result. He sprints through the beach untouched, conserving all resources for the real problems ahead."
    },
    {
      id: "effort-vs-memory",
      title: "Effort vs. Memory",
      content: "Two approaches to the same fortified nest. Brute-force: 87 seconds, half ammo, exhaustion warnings. Optimized: 12 seconds, full ammo, stable biometrics. The result is identical—nest neutralized—but the cost differs dramatically. One path is effort. The other is memory. Use memory when the inputs are unchanged; use effort only when they change."
    },
    {
      id: "symphony",
      title: "The Symphony of Optimization",
      content: "The battlefield becomes a component tree. Cage moves with fluid efficiency: 'Trench sequence? Props unchanged. Skip render. Bunker approach? Props unchanged. Skip render. Ridge assault? New variable detected—render.' He memoizes entire sectors, focusing energy only where props change. He has learned not just to survive renders, but to master the application."
    }
  ];

  // Brute force component (no memo)
  const BruteForceComponent: React.FC<{ id: string; value: number }> = ({ id, value }) => {
    useEffect(() => {
      setBruteForceRenders(prev => {
        const newCount = prev + 1;
        // Simulate expensive computation
        const start = performance.now();
        let dummy = 0;
        for (let i = 0; i < 1000000; i++) {
          dummy += Math.sqrt(i);
        }
        const end = performance.now();
        setExecutionTime(prevTime => prevTime + (end - start));
        return newCount;
      });
    });

    return (
      <div className="bg-red-950/20 border border-red-500/30 p-4 rounded">
        <div className="flex items-center gap-2 text-red-300">
          <Target className="w-4 h-4" />
          <span className="font-mono">Sector {id.toUpperCase()}</span>
          <span className="text-xs opacity-70">(Renders: {bruteForceRenders})</span>
        </div>
        <div className="mt-2 text-lg font-mono">Value: {value}</div>
        <div className="text-xs text-red-400/70 mt-1">Re-rendering... ⚡</div>
      </div>
    );
  };

  // Memoized component
  const MemoizedComponent: React.FC<{ id: string; value: number }> = memo(({ id, value }) => {
    useEffect(() => {
      setMemoizedRenders(prev => prev + 1);
    });

    return (
      <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded">
        <div className="flex items-center gap-2 text-emerald-300">
          <Shield className="w-4 h-4" />
          <span className="font-mono">Sector {id.toUpperCase()}</span>
          <span className="text-xs opacity-70">(Renders: {memoizedRenders})</span>
        </div>
        <div className="mt-2 text-lg font-mono">Value: {value}</div>
        <div className="text-xs text-emerald-400/70 mt-1">Memoized ✓</div>
      </div>
    );
  });

  MemoizedComponent.displayName = "MemoizedComponent";

  const triggerParentRender = () => {
    setParentRenderCount(prev => prev + 1);
    setForceRenders(prev => prev + 1);
  };

  const changeSectorProps = (sector: string) => {
    setSectorProps(prev => ({
      ...prev,
      [sector]: prev[sector] + 1
    }));
  };

  const resetDemo = () => {
    setParentRenderCount(0);
    setForceRenders(0);
    setBruteForceRenders(0);
    setMemoizedRenders(0);
    setEnergy(100);
    setExecutionTime(0);
    setSectorProps({
      alpha: 1,
      beta: 2,
      gamma: 3,
      delta: 4
    });
  };

  const currentChapter = chapters[chapter];

  // Code examples
  const brokenCode = `// ❌ Brute-force re-rendering
function BeachLanding({ enemyCount }) {
  // Expensive computation runs every render
  const result = expensiveCombatSimulation(enemyCount);
  
  return <div>{result}</div>;
}

// Parent component
function Battlefield() {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(t => t + 1); // Forces re-render every second
    }, 1000);
    return () => clearInterval(timer); // Cleanup
  }, []);
  
  return <BeachLanding enemyCount={10} />;
}`;

  const fixedCode = `// ✅ Memoized optimization
const BeachLanding = memo(function BeachLanding({ enemyCount }) {
  // Only runs when enemyCount changes
  const result = expensiveCombatSimulation(enemyCount);
  
  return <div>{result}</div>;
});

// Same parent component
function Battlefield() {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  // BeachLanding won't re-render unless enemyCount changes
  return <BeachLanding enemyCount={10} />;
}`;

  const shallowComparisonCode = `// React.memo's shallow comparison
function arePropsEqual(prevProps, nextProps) {
  // Returns true if props are equal (skip re-render)
  // Returns false if props differ (re-render needed)
  
  // For objects/arrays: reference equality check
  return prevProps.config === nextProps.config;
}

// Custom comparison function
const OptimizedComponent = memo(CombatSequence, arePropsEqual);`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Edge of Tomorrow</h1>
                <p className="text-sm text-cyan-300 font-medium">React.memo Optimization</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">Sci-Fi • Major William Cage • 2014</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Chapter content */}
            <section className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{currentChapter.title}</h2>
                <span className="px-3 py-1 bg-slate-800 rounded-full text-sm font-mono">
                  Chapter {chapter + 1} of 5
                </span>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-slate-300">{currentChapter.content}</p>
              </div>
            </section>

            {/* Code examples */}
            <section className="space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CodeBlock className="w-5 h-5" />
                Tactical Code Analysis
              </h3>
              
              <CodeBlock
                code={brokenCode}
                variant="error"
                title="// ❌ The Brute-Force Loop"
                language="jsx"
                defaultExpanded={chapter <= 1}
              />
              
              <CodeBlock
                code={fixedCode}
                variant="success"
                title="// ✅ The Optimized Loop"
                language="jsx"
                defaultExpanded={chapter >= 2}
              />
              
              {chapter >= 3 && (
                <CodeBlock
                  code={shallowComparisonCode}
                  variant="default"
                  title="// 🔍 Shallow Comparison Mechanics"
                  language="jsx"
                  defaultExpanded={true}
                />
              )}
            </section>
          </div>

          {/* Right column - Interactive demo */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Demo header */}
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Live Optimization Drill
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  {chapter === 0 && "Trigger parent re-renders to see the relentless loop"}
                  {chapter === 1 && "Watch energy deplete with brute-force re-renders"}
                  {chapter === 2 && "Toggle between memoized and non-memoized components"}
                  {chapter === 3 && "Compare effort vs memory approaches"}
                  {chapter === 4 && "Manage the entire battlefield with strategic memoization"}
                </p>
                
                {/* Controls */}
                <div className="space-y-3">
                  <button
                    onClick={triggerParentRender}
                    className="w-full px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Force Parent Re-render
                  </button>
                  
                  {chapter >= 2 && (
                    <button
                      onClick={() => setShowOptimized(!showOptimized)}
                      className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <SkipForward className="w-4 h-4" />
                      {showOptimized ? "Show Brute-Force" : "Show Optimized"}
                    </button>
                  )}
                  
                  <button
                    onClick={resetDemo}
                    className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-red-500/30 text-red-300 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset Simulation
                  </button>
                </div>
              </div>

              {/* Metrics dashboard */}
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Battlefield Diagnostics
                </h4>
                
                <div className="space-y-4" ref={animationParent}>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Parent Render Cycles</span>
                      <span className="font-mono">{parentRenderCount}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-500 transition-all duration-300"
                        style={{ width: `${Math.min(parentRenderCount * 2, 100)}%` }}
                      />
                    </div>
                  </div>
                  
                  {chapter >= 1 && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Energy Reserve</span>
                        <span className="font-mono">{Math.round(energy)}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${energy > 30 ? 'bg-emerald-500' : 'bg-red-500'}`}
                          style={{ width: `${energy}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {chapter >= 2 && (
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                      <div className="text-center p-3 bg-red-950/20 rounded-lg">
                        <div className="text-xs text-red-400 mb-1">Brute Force</div>
                        <div className="text-2xl font-bold font-mono text-red-300">{bruteForceRenders}</div>
                        <div className="text-xs text-red-400/70">renders</div>
                      </div>
                      <div className="text-center p-3 bg-emerald-950/20 rounded-lg">
                        <div className="text-xs text-emerald-400 mb-1">Memoized</div>
                        <div className="text-2xl font-bold font-mono text-emerald-300">{memoizedRenders}</div>
                        <div className="text-xs text-emerald-400/70">renders</div>
                      </div>
                    </div>
                  )}
                  
                  {chapter >= 3 && executionTime > 0 && (
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Total Computation Time</span>
                        <span className="font-mono text-cyan-300">{executionTime.toFixed(2)}ms</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Component visualization */}
              {chapter >= 4 && (
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
                  <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 text-cyan-400" />
                    Battlefield Sectors
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(sectorProps).map(([sector, value]) => (
                      <div key={sector} className="space-y-2">
                        {showOptimized ? (
                          <MemoizedComponent id={sector} value={value} />
                        ) : (
                          <BruteForceComponent id={sector} value={value} />
                        )}
                        <button
                          onClick={() => changeSectorProps(sector)}
                          className="w-full px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 rounded border border-slate-600 transition-colors"
                        >
                          Change {sector.toUpperCase()} Props
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-3 text-center">
                    {showOptimized 
                      ? "Memoized: Only changed sectors re-render" 
                      : "Brute-force: All sectors re-render every time"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chapter navigation */}
        <nav className="flex items-center justify-between mt-12 pt-6 border-t border-slate-800">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-5 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-800 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous Chapter
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === chapter ? 'bg-cyan-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-400 font-mono">
              {chapter + 1} / {chapters.length}
            </span>
          </div>
          
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-5 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-cyan-600 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            Next Chapter
            <ChevronRight className="w-5 h-5" />
          </button>
        </nav>
      </main>
    </div>
  );
}