import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Sword, Shield, CheckCircle, Target, Timer, RefreshCw, Eye } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

interface ComponentMetrics {
  id: string;
  name: string;
  renderTime: number;
  renderCount: number;
  memoized: boolean;
}

export default function PerformanceProfilingAgincourt(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [profilerMode, setProfilerMode] = useState<'profiling' | 'optimized'>('profiling');
  const [renderTrigger, setRenderTrigger] = useState<number>(0);
  const [metrics, setMetrics] = useState<ComponentMetrics[]>([
    { id: 'longbow', name: 'Longbowman', renderTime: 120, renderCount: 1, memoized: false },
    { id: 'knight', name: 'Heavy Knight', renderTime: 450, renderCount: 1, memoized: false },
    { id: 'pikeman', name: 'Pikeman', renderTime: 80, renderCount: 1, memoized: false },
    { id: 'archer', name: 'Archer', renderTime: 60, renderCount: 1, memoized: true },
  ]);
  const [totalRenderTime, setTotalRenderTime] = useState<number>(0);
  const [isProfiling, setIsProfiling] = useState<boolean>(false);
  const renderCountRef = useRef<number>(0);

  const chapters: Chapter[] = [
    { 
      title: "The Observer's Eye", 
      content: "Henry V walks his camp, observing each soldier's readiness. Some fires burn steady, others flicker weakly.\n\nReact's Profiler works the same—it measures component render performance, showing which parts of your app need optimization." 
    },
    { 
      title: "The Cost of Blindness", 
      content: "A knight's heavy armor becomes a liability in Agincourt's mud—it slows the entire charge.\n\nWithout profiling, expensive components drag down your app's performance, causing unnecessary re-renders and slow interactions." 
    },
    { 
      title: "The Measure of a Man", 
      content: "Henry targets his speech: \"We few, we happy few, each man's duty known.\"\n\nProfiling identifies specific bottlenecks. Use React.memo for expensive components and useCallback for stable function references." 
    },
    { 
      title: "Mud Versus Momentum", 
      content: "The French knight sinks in mud while English arrows fly true.\n\nCompare unoptimized components (slow, heavy) versus optimized ones (fast, targeted). Profiling shows the dramatic difference." 
    },
    { 
      title: "The Band of Brothers", 
      content: "After battle, Henry sees an army performing as one—archers cover, infantry holds, knights strike.\n\nProfiling creates a harmonious app where each component renders efficiently, creating a smooth user experience." 
    },
  ];

  const antiPattern = `// ❌ Without Profiling - Expensive Component
function HeavyKnight({ armorWeight }: KnightProps) {
  // Expensive calculation on every render
  const combatReadiness = calculateCombatScore(armorWeight);
  
  useEffect(() => {
    // Side effect without cleanup
    trainKnight(armorWeight);
  }, []); // Missing armorWeight dependency

  return <div>Knight ready: {combatReadiness}</div>;
}

// Parent component triggers re-renders
function ArmyCamp() {
  const [morale, setMorale] = useState(100);
  
  // This causes ALL knights to re-render
  return <HeavyKnight armorWeight={morale} />;
}`;

  const correctPattern = `// ✅ With Profiling & Optimization
const MemoizedKnight = React.memo(function HeavyKnight(
  { armorWeight }: KnightProps
) {
  // Memoized expensive calculation
  const combatReadiness = useMemo(
    () => calculateCombatScore(armorWeight),
    [armorWeight]
  );
  
  useEffect(() => {
    const subscription = trainKnight(armorWeight);
    return () => subscription.unsubscribe(); // Cleanup
  }, [armorWeight]); // Complete dependencies

  return <div>Knight ready: {combatReadiness}</div>;
});

// Parent uses stable callbacks
function ArmyCamp() {
  const [morale, setMorale] = useState(100);
  const boostMorale = useCallback(() => {
    setMorale(prev => prev + 10);
  }, []);

  // Only re-renders when armorWeight changes
  return <MemoizedKnight armorWeight={morale} />;
}`;

  const profilerExample = `// 🔍 Using React's Profiler Component
import { Profiler } from 'react';

function App() {
  const onRender = (
    id: string,
    phase: 'mount' | 'update',
    actualTime: number,
    baseTime: number
  ) => {
    console.log(\`\${id} took \${actualTime}ms to render\`);
  };

  return (
    <Profiler id="ArmyCamp" onRender={onRender}>
      <ArmyCamp />
    </Profiler>
  );
}`;

  const simulateRender = useCallback(() => {
    if (renderCountRef.current >= 50) {
      alert("Safety limit reached! Resetting demo.");
      resetMetrics();
      return;
    }

    renderCountRef.current += 1;
    setRenderTrigger(prev => prev + 1);
    
    const newMetrics = metrics.map(metric => {
      const isExpensive = metric.name.includes('Knight') && !metric.memoized;
      const baseTime = metric.memoized ? metric.renderTime * 0.3 : metric.renderTime;
      const variance = Math.random() * 50;
      const newTime = isExpensive && profilerMode === 'profiling' 
        ? baseTime + variance * 3 
        : baseTime + variance;
      
      return {
        ...metric,
        renderCount: metric.renderCount + 1,
        renderTime: Math.max(20, Math.min(newTime, 500)),
      };
    });

    setMetrics(newMetrics);
    const total = newMetrics.reduce((sum, m) => sum + m.renderTime, 0);
    setTotalRenderTime(total);
  }, [metrics, profilerMode]);

  const resetMetrics = useCallback(() => {
    setMetrics(metrics.map(m => ({ ...m, renderCount: 1, renderTime: m.memoized ? 60 : m.name.includes('Knight') ? 450 : 120 })));
    setTotalRenderTime(0);
    renderCountRef.current = 0;
  }, [metrics]);

  const toggleOptimization = useCallback((id: string) => {
    setMetrics(prev => prev.map(metric => 
      metric.id === id 
        ? { ...metric, memoized: !metric.memoized, renderTime: !metric.memoized ? 60 : metric.name.includes('Knight') ? 450 : 120 }
        : metric
    ));
  }, []);

  const startProfiling = useCallback(() => {
    setIsProfiling(true);
    const interval = setInterval(() => {
      simulateRender();
    }, 800);

    return () => clearInterval(interval);
  }, [simulateRender]);

  useEffect(() => {
    if (isProfiling) {
      const cleanup = startProfiling();
      return cleanup;
    }
  }, [isProfiling, startProfiling]);

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Sword}
        title="Henry V (c. 1599)"
        subtitle="King Henry V, 1415"
        concept="Performance Profiling"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Target className="h-5 w-5 text-amber-400" />
                  Profiler Controls
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setProfilerMode('profiling')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${profilerMode === 'profiling' ? 'bg-amber-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      <Eye className="mr-2 inline h-3 w-3" />
                      Profile Mode
                    </button>
                    <button
                      onClick={() => setProfilerMode('optimized')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${profilerMode === 'optimized' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      <CheckCircle className="mr-2 inline h-3 w-3" />
                      Optimized
                    </button>
                  </div>

                  <button
                    onClick={simulateRender}
                    className="w-full rounded bg-amber-700 px-4 py-2 hover:bg-amber-600"
                  >
                    <RefreshCw className="mr-2 inline h-4 w-4" />
                    Trigger Render
                  </button>

                  <button
                    onClick={() => setIsProfiling(!isProfiling)}
                    className={`w-full rounded px-4 py-2 ${isProfiling ? 'bg-red-700 hover:bg-red-600' : 'bg-emerald-700 hover:bg-emerald-600'}`}
                  >
                    <Timer className="mr-2 inline h-4 w-4" />
                    {isProfiling ? 'Stop Profiling' : 'Start Profiling'}
                  </button>

                  <button
                    onClick={resetMetrics}
                    className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                  >
                    Reset Metrics
                  </button>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Total Time</div>
                      <div className="font-mono text-xl tabular-nums">{totalRenderTime.toFixed(0)}ms</div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Render Cycle</div>
                      <div className="font-mono text-xl tabular-nums">{renderCountRef.current}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">King Henry V</span>
                    <span className="text-sm font-medium">Developer with Profiler</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">English Army</span>
                    <span className="text-sm font-medium">React Application</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Individual Soldier</span>
                    <span className="text-sm font-medium">React Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Soldier Readiness</span>
                    <span className="text-sm font-medium">Render Performance</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Heavy Armor, Mud</span>
                    <span className="text-sm font-medium">Performance Bottlenecks</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Night Inspection</span>
                    <span className="text-sm font-medium">Running Profiler</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">St. Crispin's Speech</span>
                    <span className="text-sm font-medium">Applying Optimizations</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Agincourt Mud</span>
                    <span className="text-sm font-medium">Cumulative Performance Drag</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "Profiling shows you which components render slowly, just as Henry observed which soldiers struggled."}
                  {chapter === 1 && "Without profiling, expensive components act like knights in mud—they drag down your entire app's performance."}
                  {chapter === 2 && "Targeted optimization (memo, useCallback) fixes specific bottlenecks identified by profiling data."}
                  {chapter === 3 && "Optimized components render faster with fewer resources—like archers versus armored knights."}
                  {chapter === 4 && "A well-profiled app performs harmoniously, with each component rendering efficiently when needed."}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "We few, we happy few, we band of brothers—each man's duty known, each man's place secure."
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — King Henry V
                </p>
              </div>
            </div>
          }
        >
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-amber-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Interactive Demonstration
              </h3>
            </div>

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
                  <h4 className="mb-4 flex items-center gap-2 font-bold">
                    <Eye className="h-5 w-5 text-amber-400" />
                    Component Performance Profile
                  </h4>
                  
                  <div className="space-y-3">
                    {metrics.map(metric => (
                      <div key={metric.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${metric.memoized ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                          <span className="text-sm font-medium">{metric.name}</span>
                          {metric.memoized && (
                            <span className="rounded bg-emerald-900/40 px-2 py-0.5 text-xs text-emerald-300">Memoized</span>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-mono tabular-nums">{metric.renderTime.toFixed(0)}ms</div>
                            <div className="text-xs text-slate-500">render time</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono tabular-nums">{metric.renderCount}</div>
                            <div className="text-xs text-slate-500">renders</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <CodeBlock
                  code={profilerExample}
                  language="tsx"
                  variant="default"
                  title="// Using React's Profiler Component"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                      <h4 className="mb-3 flex items-center gap-2 font-bold text-red-300">
                        ❌ Performance Bottleneck
                      </h4>
                      <p className="text-sm text-red-200/80">
                        The "Heavy Knight" component renders slowly (450ms+) and re-renders unnecessarily, dragging down the entire application's performance.
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <button
                          onClick={() => toggleOptimization('knight')}
                          className="rounded bg-amber-700 px-3 py-1.5 text-sm hover:bg-amber-600"
                        >
                          Toggle Optimization
                        </button>
                        <div className="text-right">
                          <div className="font-mono text-2xl text-red-400">
                            {metrics.find(m => m.id === 'knight')?.renderTime.toFixed(0)}ms
                          </div>
                          <div className="text-xs text-slate-500">current render time</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={antiPattern}
                      language="tsx"
                      variant="error"
                      title="// ❌ Anti-Pattern: Expensive Component Without Optimization"
                    />
                  </div>
                </div>
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={antiPattern}
                  goodCode={correctPattern}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Without Profiling & Optimization"
                  goodLabel="✅ With Profiling & Optimization"
                  badExplanation="Expensive calculations on every render, missing cleanup, incomplete dependencies"
                  goodExplanation="Memoized calculations, proper cleanup, stable callbacks, efficient re-renders"
                />
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
                    <h4 className="mb-2 font-bold text-amber-300">React.memo</h4>
                    <p className="text-sm text-amber-200/80">
                      Memoizes component to prevent re-renders when props haven't changed.
                    </p>
                  </div>
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                    <h4 className="mb-2 font-bold text-emerald-300">useCallback</h4>
                    <p className="text-sm text-emerald-200/80">
                      Provides stable function references to prevent child re-renders.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-xl border border-red-500/30 bg-red-950/10 p-6">
                    <h4 className="mb-4 text-center text-lg font-bold text-red-300">
                      ❌ French Knight (Unoptimized)
                    </h4>
                    <div className="space-y-4">
                      <div className="mx-auto h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-red-900 to-red-700"></div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Render Time:</span>
                          <span className="font-mono text-red-400">450ms+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Re-renders:</span>
                          <span className="font-mono text-red-400">Unnecessary</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Status:</span>
                          <span className="text-red-400">Sinking in Mud</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-6">
                    <h4 className="mb-4 text-center text-lg font-bold text-emerald-300">
                      ✅ English Archer (Optimized)
                    </h4>
                    <div className="space-y-4">
                      <div className="mx-auto h-32 w-32 rounded-full bg-gradient-to-br from-emerald-800 to-emerald-600"></div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Render Time:</span>
                          <span className="font-mono text-emerald-400">60ms</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Re-renders:</span>
                          <span className="font-mono text-emerald-400">Only when needed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Status:</span>
                          <span className="text-emerald-400">Ready & Efficient</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
                  <h4 className="mb-3 font-bold">Performance Comparison</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded bg-slate-800/30 p-3 text-center">
                      <div className="text-xs text-slate-500">Total Render Time</div>
                      <div className="font-mono text-2xl tabular-nums">{totalRenderTime.toFixed(0)}ms</div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3 text-center">
                      <div className="text-xs text-slate-500">Optimized Components</div>
                      <div className="font-mono text-2xl tabular-nums">
                        {metrics.filter(m => m.memoized).length}/{metrics.length}
                      </div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3 text-center">
                      <div className="text-xs text-slate-500">Performance Gain</div>
                      <div className="font-mono text-2xl tabular-nums text-emerald-400">
                        {totalRenderTime > 0 ? ((1 - (metrics.filter(m => m.memoized).length * 60) / totalRenderTime) * 100).toFixed(0) : '0'}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-6">
                  <h4 className="mb-4 text-center text-xl font-bold text-emerald-300">
                    🏆 Optimized Army Performance
                  </h4>
                  
                  <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {metrics.map(metric => (
                      <div key={metric.id} className={`rounded-lg p-3 ${metric.memoized ? 'bg-emerald-900/30 border border-emerald-500/20' : 'bg-amber-900/30 border border-amber-500/20'}`}>
                        <div className="text-center">
                          <div className="mb-1 text-sm font-medium">{metric.name}</div>
                          <div className={`font-mono text-2xl ${metric.memoized ? 'text-emerald-300' : 'text-amber-300'}`}>
                            {metric.renderTime.toFixed(0)}ms
                          </div>
                          <div className="text-xs text-slate-500">per render</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-slate-900/60 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-400">Application Status</div>
                        <div className="text-xl font-bold text-emerald-400">Optimal Performance</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-400">Total Efficiency</div>
                        <div className="font-mono text-2xl tabular-nums text-emerald-300">
                          {((metrics.filter(m => m.memoized).length / metrics.length) * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
                        style={{ width: `${(metrics.filter(m => m.memoized).length / metrics.length) * 100}%` }}
                      ></div>
                    </div>
                    
                    <p className="mt-4 text-center text-sm text-slate-400">
                      Each component performs its specific duty efficiently, creating a harmonious and performant application.
                    </p>
                  </div>
                </div>

                <CodeBlock
                  code={`// 🎯 Well-Optimized Application Architecture
function Battlefield() {
  // Lightweight state management
  const [army, dispatch] = useReducer(armyReducer, initialArmy);
  
  // Memoized selectors for performance
  const knights = useMemo(() => 
    army.units.filter(u => u.type === 'knight'), 
    [army.units]
  );
  
  // Stable callback for events
  const orderCharge = useCallback(() => {
    dispatch({ type: 'ORDER_CHARGE' });
  }, [dispatch]);
  
  return (
    <Profiler id="Battlefield" onRender={onRender}>
      <MemoizedKnights units={knights} onCharge={orderCharge} />
      <MemoizedArchers />
      <MemoizedInfantry />
    </Profiler>
  );
}`}
                  language="tsx"
                  variant="success"
                  title="// ✅ Optimized Application Architecture"
                />
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