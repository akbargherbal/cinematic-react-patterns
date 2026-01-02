import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Brain, BarChart3, TrendingUp, Timer, Zap } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
}

interface ProfilerMetric {
  id: string;
  name: string;
  renderCount: number;
  totalTime: number;
  isBottleneck: boolean;
}

export default function PerformanceProfilingMoneyball(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [playerStats, setPlayerStats] = useState<number[]>([
    85, 42, 91, 33, 67,
  ]);
  const [optimizedMode, setOptimizedMode] = useState<boolean>(false);
  const [profilerMetrics, setProfilerMetrics] = useState<ProfilerMetric[]>([
    {
      id: "avatar",
      name: "Avatar",
      renderCount: 0,
      totalTime: 0,
      isBottleneck: true,
    },
    {
      id: "chart",
      name: "Chart",
      renderCount: 0,
      totalTime: 0,
      isBottleneck: false,
    },
    {
      id: "stats",
      name: "Stats",
      renderCount: 0,
      totalTime: 0,
      isBottleneck: false,
    },
    {
      id: "header",
      name: "Header",
      renderCount: 0,
      totalTime: 0,
      isBottleneck: false,
    },
  ]);
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<"gut" | "data">("gut");
  const [simulatedLag, setSimulatedLag] = useState<number>(0);
  const [renderTrigger, setRenderTrigger] = useState<number>(0);
  const [autoProfile, setAutoProfile] = useState<boolean>(false);

  const renderTimerRef = useRef<NodeJS.Timeout>();
  const animationFrameRef = useRef<number>();
  const mountTimeRef = useRef<number>(Date.now());

  // Chapters from narrative
  const chapters: Chapter[] = [
    {
      title: "The Problem in the Room",
      content: `The roar of the New York crowd still echoed in Billy Beane's ears, a phantom noise that followed him from the stadium tunnel all the way back to Oakland. They had lost. Again. Outspent, outgunned, and now, out of the playoffs. The application had crashed during the final demo. Days later, he sat in the War Room, a windowless space that smelled of stale cigar smoke and regret. His scouts were talking about aesthetics and feelings. "There are rich teams and there are poor teams. Then there's fifty feet of crap, and then there's us." He knew he couldn't fix the application by guessing. He had to find a different way to see the problem.`,
    },
    {
      title: "Flying Blind",
      content: `Against his better judgment, Billy listened to the scouts. They recommended an expensive player based on "gut feel" - he had power, a classic swing. It was the equivalent of spending two weeks refactoring the main Chart component because it looked complex. The result: the team kept losing. The application was still just as slow. The breaking point came during a critical moment - bases loaded, two outs, and the expensive player struck out. At the exact same moment, a user tried to filter a data grid and the UI froze for two seconds. "We're flying blind. It's all just gut feelings and guesswork." They were measuring form, not results.`,
    },
    {
      title: "The System",
      content: `Billy found himself in a cramped office across from Peter Brand, a young man who looked like he'd never seen a baseball field. "Your goal isn't to buy players. Your goal is to buy wins." Peter turned his laptop around. The screen glowed in the dim office - a spreadsheet, columns of names and numbers. He pointed to a single line: "Scott Hatteberg. Catcher. Can't throw anymore. The scouts think he's finished." Then Peter showed a chart - a cascade of colored bars. "Everyone focuses on the big, expensive players. But this guy does one thing cheaply and effectively. He gets on base." It was the developer's 'Aha!' moment: a tiny Avatar component, re-rendering hundreds of times on every keystroke, was the real culprit. "He gets on base."`,
    },
    {
      title: "Two Ways of Seeing",
      content: `**The Scouts' View**: All eyes on the star player hitting a solo home run. The scouts leap to their feet. "That's a million-dollar swing!" For the rest of the game, he strikes out twice and grounds into a double play. They don't care. Their report is a glowing ode to the home run. They've fallen in love with the one dramatic event, blind to the overall negative impact.\n\n**The Profiler's View**: When the same player hits the home run, Billy barely looks up from the laptop. "Okay, one run. But look at the cost." Later, an undervalued player walks. It's boring. Anti-climactic. But on the screen, a small green number ticks up. "That is a productive out. He advanced the inning." The Ranked Chart tells the whole story. The home run is a single, tall, expensive bar. The walks create cumulative value. It's not about the home run. It's about who gets on base.`,
    },
    {
      title: "The Winning Streak",
      content: `What followed was legendary. "The A's win it! That's ten in a row!" ... "Fifteen straight!" ... "History in Oakland! Twenty consecutive games!" Each win was a smooth user interaction. A filter that applied instantly. A list that scrolled without a stutter. The undervalued players, chosen by data, were the heroes. Later that night, the stadium was empty. Billy walked into the weight room. Peter was there, packing his laptop. "It's hard not to be romantic about baseball," he said softly. He was talking about the beauty of a complex problem, the elegance of a data-driven solution. It's a problem you think you can solve. And with the right tools, you can.`,
    },
  ];

  // Code examples
  const brokenOptimizationCode = `// ❌ Scouts' Approach: Fixing what looks expensive
function ExpensiveChart({ data }) {
  // Complex visualization logic
  // Looks expensive, but only renders once
  return <div>Chart: {data.length} points</div>;
}

// Meanwhile, the real bottleneck...
function Avatar({ userId }) {
  // Simple component, but re-renders on EVERY keystroke
  // No one suspects it because it looks simple
  return <div>User: {userId}</div>;
}`;

  const profilerRevelationCode = `// ✅ Profiler's Revelation: Data shows the truth
import { Profiler } from 'react';

function App() {
  return (
    <Profiler
      id="App"
      onRender={(id, phase, actualDuration) => {
        console.log(\`\${id} took \${actualDuration}ms\`);
        // Data reveals: Avatar takes 85% of render time
        // Chart only takes 2% despite looking complex
      }}
    >
      <ExpensiveChart data={data} />
      <Avatar userId={userId} />
    </Profiler>
  );
}`;

  const memoFixCode = `// ✅ Peter Brand's Fix: Target the real bottleneck
import { memo } from 'react';

// Only re-render when userId actually changes
const MemoizedAvatar = memo(function Avatar({ userId }) {
  return <div>User: {userId}</div>;
});

// Usage - now Avatar only re-renders when needed
function App() {
  return (
    <>
      <ExpensiveChart data={data} />
      <MemoizedAvatar userId={userId} />
    </>
  );
}`;

  const missingMemoCode = `// ❌ Before: Avatar re-renders on every parent render
function TeamRoster({ players }) {
  const [filter, setFilter] = useState('');
  
  return (
    <div>
      <input 
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {players.map(player => (
        <Avatar key={player.id} userId={player.id} />
        // ❌ Every keystroke causes ALL avatars to re-render
      ))}
    </div>
  );
}`;

  // Simulate performance monitoring
  useEffect(() => {
    if (autoProfile && chapter >= 2) {
      renderTimerRef.current = setInterval(() => {
        setProfilerMetrics((prev) => {
          const newMetrics = [...prev];
          const bottleneckIndex = newMetrics.findIndex((m) => m.isBottleneck);

          if (bottleneckIndex >= 0) {
            // Bottleneck component renders more frequently
            newMetrics[bottleneckIndex].renderCount += optimizedMode ? 1 : 5;
            newMetrics[bottleneckIndex].totalTime += optimizedMode ? 2 : 15;
          }

          // Other components render less
          newMetrics.forEach((metric, i) => {
            if (!metric.isBottleneck) {
              metric.renderCount += 1;
              metric.totalTime += optimizedMode ? 1 : 3;
            }
          });

          return newMetrics;
        });
      }, 300);

      return () => {
        if (renderTimerRef.current) {
          clearInterval(renderTimerRef.current);
        }
      };
    }
  }, [autoProfile, chapter, optimizedMode]);

  // Circuit breaker for leaked resources
  useEffect(() => {
    if (leakedTimers > 50) {
      resetDemo();
    }
  }, [leakedTimers]);

  // Simulate lag for unoptimized mode
  useEffect(() => {
    if (!optimizedMode && chapter >= 1) {
      const heavyComputation = () => {
        // Simulate expensive computation
        let sum = 0;
        for (let i = 0; i < 1000000; i++) {
          sum += Math.random();
        }
        setSimulatedLag(sum > 0 ? 150 : 0); // Always true, just for effect
      };

      animationFrameRef.current = requestAnimationFrame(heavyComputation);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [renderTrigger, optimizedMode, chapter]);

  // Update player stats
  const updateRandomStat = useCallback(() => {
    setPlayerStats((prev) => {
      const newStats = [...prev];
      const randomIndex = Math.floor(Math.random() * newStats.length);
      newStats[randomIndex] = Math.min(100, newStats[randomIndex] + 5);
      return newStats;
    });
    setRenderTrigger((prev) => prev + 1);
  }, []);

  // Reset demo
  const resetDemo = () => {
    setProfilerMetrics((prev) =>
      prev.map((m) => ({ ...m, renderCount: 0, totalTime: 0 })),
    );
    setLeakedTimers(0);
    setSimulatedLag(0);
    setPlayerStats([85, 42, 91, 33, 67]);
  };

  // Start profiling
  const startProfiling = () => {
    setAutoProfile(true);
    if (chapter === 2 && demoMode === "gut") {
      setLeakedTimers((prev) => prev + 1);
    }
  };

  const currentChapter = chapters[chapter];
  const totalRenderTime = profilerMetrics.reduce(
    (sum, m) => sum + m.totalTime,
    0,
  );
  const sortedMetrics = [...profilerMetrics].sort(
    (a, b) => b.totalTime - a.totalTime,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 font-sans text-slate-300">
      {/* Background pattern - baseball diamond */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/5 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(16,185,129,0.05)_50%,transparent_51%)] bg-[length:40px_40px]" />

      <header className="relative border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-emerald-500" />
              <h1 className="text-2xl font-bold md:text-3xl">Moneyball</h1>
            </div>
            <p className="text-sm text-slate-400 md:text-base">
              Baseball • Billy Beane • 2011
            </p>
          </div>
          <p className="text-base font-medium text-emerald-500 md:text-lg">
            Performance Profiling
          </p>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-12">
        {/* Left Column - Narrative */}
        <div className="space-y-8 lg:col-span-7">
          {/* Chapter Content */}
          <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-sm md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-emerald-400 md:text-3xl">
              {currentChapter.title}
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="leading-relaxed whitespace-pre-line">
                {currentChapter.content}
              </p>
            </div>
          </div>

          {/* Code Examples */}
          <div className="space-y-6">
            {chapter === 1 && (
              <CodeBlock
                code={brokenOptimizationCode}
                variant="error"
                title="// ❌ Scouts' Approach: Fixing what looks expensive"
                defaultExpanded={true}
              />
            )}

            {chapter === 2 && (
              <CodeBlock
                code={missingMemoCode}
                variant="error"
                title="// ❌ Before: Avatar re-renders on every keystroke"
                defaultExpanded={true}
              />
            )}

            {chapter === 3 && (
              <>
                <CodeBlock
                  code={profilerRevelationCode}
                  variant="success"
                  title="// ✅ Profiler Revelation: Data shows the truth"
                  defaultExpanded={true}
                />
                <CodeBlock
                  code={memoFixCode}
                  variant="success"
                  title="// ✅ Peter Brand's Fix: memo() the real bottleneck"
                  defaultExpanded={true}
                />
              </>
            )}
          </div>
        </div>

        {/* Right Column - Interactive Demo */}
        <div className="space-y-8 lg:col-span-5">
          {/* Demo Controls */}
          <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-xl font-semibold">
                <Zap className="h-5 w-5 text-emerald-500" />
                Interactive Diamond
              </h3>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
                  {optimizedMode ? "✅ Optimized" : "❌ Unoptimized"}
                </span>
                {simulatedLag > 0 && (
                  <span className="rounded-full bg-red-950/50 px-3 py-1 text-sm text-red-400">
                    Lag: {simulatedLag}ms
                  </span>
                )}
              </div>
            </div>

            {/* Player Stats Simulation */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Player Stats</h4>
                <button
                  onClick={updateRandomStat}
                  className={`rounded px-4 py-2 transition-all ${optimizedMode ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-700 hover:bg-slate-600"} ${simulatedLag > 0 ? "animate-pulse" : ""}`}
                  disabled={simulatedLag > 100}
                >
                  Update Random Stat
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
                {playerStats.map((stat, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-center transition-all hover:border-emerald-500/30"
                  >
                    <div className="font-mono text-2xl font-bold tabular-nums">
                      {stat}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      Player {i + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mode Toggle */}
            {chapter >= 2 && (
              <div className="mb-6 flex gap-4">
                <button
                  onClick={() => setDemoMode("gut")}
                  className={`flex-1 rounded-lg border px-4 py-3 transition-all ${demoMode === "gut" ? "border-red-500/50 bg-red-950/20" : "border-slate-700 hover:border-slate-600"}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={
                        demoMode === "gut" ? "text-red-400" : "text-slate-400"
                      }
                    >
                      👴 Scouts' Gut Feel
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setDemoMode("data")}
                  className={`flex-1 rounded-lg border px-4 py-3 transition-all ${demoMode === "data" ? "border-emerald-500/50 bg-emerald-950/20" : "border-slate-700 hover:border-slate-600"}`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span
                      className={
                        demoMode === "data"
                          ? "text-emerald-400"
                          : "text-slate-400"
                      }
                    >
                      💻 Profiler Data
                    </span>
                  </div>
                </button>
              </div>
            )}

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={startProfiling}
                disabled={autoProfile}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 transition-all hover:bg-blue-700 disabled:bg-blue-900 disabled:opacity-50"
              >
                <BarChart3 className="h-4 w-4" />
                {autoProfile ? "Profiling..." : "Start Profiler"}
              </button>

              <button
                onClick={() => setOptimizedMode(!optimizedMode)}
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 transition-all hover:bg-emerald-700"
              >
                <TrendingUp className="h-4 w-4" />
                {optimizedMode ? "Show Bug" : "Apply Fix"}
              </button>

              <button
                onClick={resetDemo}
                className="col-span-2 rounded-lg bg-slate-700 px-4 py-3 transition-all hover:bg-slate-600"
              >
                Reset Demo
              </button>
            </div>
          </div>

          {/* Profiler Metrics */}
          {chapter >= 2 && (
            <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-sm">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <BarChart3 className="h-5 w-5 text-emerald-500" />
                  Profiler Metrics
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <Timer className="h-4 w-4" />
                  <span className="font-mono">{totalRenderTime}ms total</span>
                </div>
              </div>

              <div className="space-y-4">
                {sortedMetrics.map((metric) => (
                  <div key={metric.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span
                        className={`font-medium ${metric.isBottleneck ? "text-red-400" : "text-slate-300"}`}
                      >
                        {metric.name}
                        {metric.isBottleneck && chapter >= 3 && (
                          <span className="ml-2 rounded bg-red-950/50 px-2 py-1 text-xs text-red-400">
                            Bottleneck
                          </span>
                        )}
                      </span>
                      <span className="font-mono tabular-nums">
                        {metric.renderCount} renders • {metric.totalTime}ms
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${metric.isBottleneck ? "bg-red-500" : "bg-emerald-500"}`}
                        style={{
                          width: `${totalRenderTime > 0 ? (metric.totalTime / totalRenderTime) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Circuit Breaker Warning */}
              {leakedTimers > 30 && (
                <div className="mt-6 rounded-lg border border-red-500/30 bg-red-950/30 p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-red-400">⚠️</div>
                    <div>
                      <div className="font-medium text-red-400">
                        Circuit Breaker Warning
                      </div>
                      <div className="mt-1 text-sm text-red-300/80">
                        {leakedTimers} timers leaked. Auto-reset at 50.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chapter Navigation */}
          <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setChapter(Math.max(0, chapter - 1))}
                disabled={chapter === 0}
                className="flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Previous
              </button>

              <div className="text-center">
                <div className="text-sm text-slate-400">Chapter</div>
                <div className="font-mono font-bold tabular-nums">
                  {chapter + 1} of {chapters.length}
                </div>
              </div>

              <button
                onClick={() =>
                  setChapter(Math.min(chapters.length - 1, chapter + 1))
                }
                disabled={chapter === chapters.length - 1}
                className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 transition-all hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
