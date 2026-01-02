import React, { useState, useEffect, memo } from "react";
import {
  Brain,
  SkipForward,
  Zap,
  Cpu,
  RefreshCw,
  Shield,
  Target,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeComparison } from "@/components/common/CodeComparison";
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
    delta: 4,
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
      content:
        "The world lurches into existence with a drill sergeant's scream. This is the render cycle—the parent component state updates and the day begins anew. Every time the parent re-renders, all children must evaluate. The beach landing executes again, identical to the last loop. Live. Die. Re-render. The loop is relentless.",
    },
    {
      id: "brute-force",
      title: "The Brute-Force Approach",
      content:
        "Loop after loop, Cage hammers himself against the problem. He re-executes the beach landing perfectly each time, but the cost is immense. His suit steams, his muscles scream. 'You're re-fighting battles you've already won,' Rita tells him. The waste leaves him too exhausted to handle new threats when props finally change.",
    },
    {
      id: "recognition",
      title: "The Recognition Principle",
      content:
        "'If the picture is the same, you don't need to paint it again,' Rita explains. Cage learns to perform a shallow comparison: check if the tactical inputs (props) are identical. If they are, skip the execution and use the cached result. He sprints through the beach untouched, conserving all resources for the real problems ahead.",
    },
    {
      id: "effort-vs-memory",
      title: "Effort vs. Memory",
      content:
        "Two approaches to the same fortified nest. Brute-force: 87 seconds, half ammo, exhaustion warnings. Optimized: 12 seconds, full ammo, stable biometrics. The result is identical—nest neutralized—but the cost differs dramatically. One path is effort. The other is memory. Use memory when the inputs are unchanged; use effort only when they change.",
    },
    {
      id: "symphony",
      title: "The Symphony of Optimization",
      content:
        "The battlefield becomes a component tree. Cage moves with fluid efficiency: 'Trench sequence? Props unchanged. Skip render. Bunker approach? Props unchanged. Skip render. Ridge assault? New variable detected—render.' He memoizes entire sectors, focusing energy only where props change. He has learned not just to survive renders, but to master the application.",
    },
  ];

  // Brute force component (no memo)
  const BruteForceComponent: React.FC<{ id: string; value: number }> = ({
    id,
    value,
  }) => {
    useEffect(() => {
      setBruteForceRenders((prev) => {
        const newCount = prev + 1;
        // Simulate expensive computation
        const start = performance.now();
        let dummy = 0;
        for (let i = 0; i < 1000000; i++) {
          dummy += Math.sqrt(i);
        }
        const end = performance.now();
        setExecutionTime((prevTime) => prevTime + (end - start));
        return newCount;
      });
    });

    return (
      <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
        <div className="flex items-center gap-2 text-red-300">
          <Target className="h-4 w-4" />
          <span className="font-mono">Sector {id.toUpperCase()}</span>
          <span className="text-xs opacity-70">
            (Renders: {bruteForceRenders})
          </span>
        </div>
        <div className="mt-2 font-mono text-lg">Value: {value}</div>
        <div className="mt-1 text-xs text-red-400/70">Re-rendering... ⚡</div>
      </div>
    );
  };

  // Memoized component
  const MemoizedComponent: React.FC<{ id: string; value: number }> = memo(
    ({ id, value }) => {
      useEffect(() => {
        setMemoizedRenders((prev) => prev + 1);
      });

      return (
        <div className="rounded border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="flex items-center gap-2 text-emerald-300">
            <Shield className="h-4 w-4" />
            <span className="font-mono">Sector {id.toUpperCase()}</span>
            <span className="text-xs opacity-70">
              (Renders: {memoizedRenders})
            </span>
          </div>
          <div className="mt-2 font-mono text-lg">Value: {value}</div>
          <div className="mt-1 text-xs text-emerald-400/70">Memoized ✓</div>
        </div>
      );
    },
  );

  MemoizedComponent.displayName = "MemoizedComponent";

  const triggerParentRender = () => {
    setParentRenderCount((prev) => prev + 1);
    setForceRenders((prev) => prev + 1);
  };

  const changeSectorProps = (sector: string) => {
    setSectorProps((prev) => ({
      ...prev,
      [sector]: prev[sector] + 1,
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
      delta: 4,
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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      <ModuleHeader
        icon={Brain}
        title="Edge of Tomorrow"
        subtitle="Major William Cage • 2014"
        concept="React.memo Optimization"
        themeColor="cyan"
      />

      <ModuleLayout className="py-4 px-6"
        sidebar={
          <div className="sticky top-24 space-y-6">
            {/* Demo header */}
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
                <Zap className="h-5 w-5 text-cyan-400" />
                Live Optimization Drill
              </h3>
              <p className="mb-4 text-sm text-slate-400">
                {chapter === 0 &&
                  "Trigger parent re-renders to see the relentless loop"}
                {chapter === 1 &&
                  "Watch energy deplete with brute-force re-renders"}
                {chapter === 2 &&
                  "Toggle between memoized and non-memoized components"}
                {chapter === 3 && "Compare effort vs memory approaches"}
                {chapter === 4 &&
                  "Manage the entire battlefield with strategic memoization"}
              </p>

              {/* Controls */}
              <div className="space-y-3">
                <button
                  onClick={triggerParentRender}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-3 font-medium text-white transition-colors hover:bg-cyan-700"
                >
                  <RefreshCw className="h-4 w-4" />
                  Force Parent Re-render
                </button>

                {chapter >= 2 && (
                  <button
                    onClick={() => setShowOptimized(!showOptimized)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 font-medium transition-colors hover:bg-slate-700"
                  >
                    <SkipForward className="h-4 w-4" />
                    {showOptimized ? "Show Brute-Force" : "Show Optimized"}
                  </button>
                )}

                <button
                  onClick={resetDemo}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-slate-800 px-4 py-3 font-medium text-red-300 transition-colors hover:bg-slate-700"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Simulation
                </button>
              </div>
            </div>

            {/* Metrics dashboard */}
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
              <h4 className="mb-4 flex items-center gap-2 font-bold text-white">
                <Cpu className="h-4 w-4 text-cyan-400" />
                Battlefield Diagnostics
              </h4>

              <div className="space-y-4" ref={animationParent}>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-slate-400">Parent Render Cycles</span>
                    <span className="font-mono">{parentRenderCount}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-cyan-500 transition-all duration-300"
                      style={{
                        width: `${Math.min(parentRenderCount * 2, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {chapter >= 1 && (
                  <div>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-slate-400">Energy Reserve</span>
                      <span className="font-mono">{Math.round(energy)}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full transition-all duration-300 ${energy > 30 ? "bg-emerald-500" : "bg-red-500"}`}
                        style={{ width: `${energy}%` }}
                      />
                    </div>
                  </div>
                )}

                {chapter >= 2 && (
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-2">
                    <div className="rounded-lg bg-red-950/20 p-3 text-center">
                      <div className="mb-1 text-xs text-red-400">
                        Brute Force
                      </div>
                      <div className="font-mono text-2xl font-bold text-red-300">
                        {bruteForceRenders}
                      </div>
                      <div className="text-xs text-red-400/70">renders</div>
                    </div>
                    <div className="rounded-lg bg-emerald-950/20 p-3 text-center">
                      <div className="mb-1 text-xs text-emerald-400">
                        Memoized
                      </div>
                      <div className="font-mono text-2xl font-bold text-emerald-300">
                        {memoizedRenders}
                      </div>
                      <div className="text-xs text-emerald-400/70">renders</div>
                    </div>
                  </div>
                )}

                {chapter >= 3 && executionTime > 0 && (
                  <div className="border-t border-slate-800 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">
                        Total Computation Time
                      </span>
                      <span className="font-mono text-cyan-300">
                        {executionTime.toFixed(2)}ms
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Component visualization */}
            {chapter >= 4 && (
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
                <h4 className="mb-4 flex items-center gap-2 font-bold text-white">
                  <Target className="h-4 w-4 text-cyan-400" />
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
                        className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs transition-colors hover:bg-slate-700"
                      >
                        Change {sector.toUpperCase()} Props
                      </button>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-center text-xs text-slate-500">
                  {showOptimized
                    ? "Memoized: Only changed sectors re-render"
                    : "Brute-force: All sectors re-render every time"}
                </p>
              </div>
            )}
          </div>
        }
      >
        <div className="prose prose-invert max-w-none mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            {currentChapter.title}
          </h2>
          <p className="text-lg leading-relaxed text-slate-300">
            {currentChapter.content}
          </p>
        </div>

        <section className="space-y-6 mb-8">
          <h3 className="flex items-center gap-2 text-xl font-bold text-white">
            <Cpu className="h-5 w-5" />
            Tactical Code Analysis
          </h3>

          <CodeComparison
            badCode={brokenCode}
            goodCode={fixedCode}
            language="jsx"
            themeColor="cyan"
            badLabel="❌ Brute-Force Loop"
            goodLabel="✅ Optimized Loop"
            badExplanation="Re-runs expensive logic on every render, regardless of props."
            goodExplanation="Memoizes the component to skip renders when props haven't changed."
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

        <ChapterNavigation
          currentChapter={chapter}
          totalChapters={chapters.length}
          onChapterChange={setChapter}
          themeColor="cyan"
        />
      </ModuleLayout>
    </div>
  );
}