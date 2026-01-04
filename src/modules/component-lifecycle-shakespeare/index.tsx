import { useState, useEffect, useRef } from "react";
import { Theater, Shield, CheckCircle, Quote, Play, Pause, RotateCcw, Timer } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function ComponentLifecycleShakespeare(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  
  // Demo states
  const [componentMounted, setComponentMounted] = useState<boolean>(false);
  const [resourceLeak, setResourceLeak] = useState<boolean>(false);
  const [leakCount, setLeakCount] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [timerCount, setTimerCount] = useState<number>(0);
  const [unmountClean, setUnmountClean] = useState<boolean>(true);
  const [lifecycleStage, setLifecycleStage] = useState<string>("WAITING");
  
  const chapters: Chapter[] = [
    { 
      title: "All The World's A Stage", 
      content: "Just as a player's entrance marks their first appearance on stage, a React component's mounting phase is its initial render. This is where the component first appears in the DOM, ready to play its part in your application." 
    },
    { 
      title: "The Soldier Who Would Not Sheath His Sword", 
      content: "Components that don't clean up resources are like soldiers who won't change roles. Timers, event listeners, and subscriptions left running cause memory leaks and bugs—cluttering your application's stage with discarded props." 
    },
    { 
      title: "And One Man In His Time Plays Many Parts", 
      content: "Lifecycle methods provide structure: mount (entrance), update (role change), unmount (exit). useEffect with cleanup functions ensures each phase transitions smoothly, preventing conflicts between a component's different roles." 
    },
    { 
      title: "Exits and Entrances", 
      content: "A messy unmount leaves orphaned resources that break the stage. A clean unmount with proper cleanup (return function in useEffect) removes event listeners and timers, leaving the DOM ready for the next component's entrance." 
    },
    { 
      title: "A Completed Play", 
      content: "Mastering the full lifecycle—mount, update, unmount—creates robust components. Each phase has specific responsibilities: setup, adaptation, and cleanup. Managed properly, your components will perform their roles flawlessly from entrance to exit." 
    },
  ];

  // Code examples
  const antiPatternCode = `// ❌ Soldier who won't sheathe his sword
function LeakyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Timer keeps running after unmount
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    // Missing cleanup: return () => clearInterval(id);
  }, []);

  return <div>Count: {count}</div>;
}`;

  const correctPatternCode = `// ✅ Graceful exit with cleanup
function CleanComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    // Proper cleanup on unmount
    return () => clearInterval(id);
  }, []);

  return <div>Count: {count}</div>;
}`;

  const mountExampleCode = `// Component mounting (entering stage)
function PlayerEntrance() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Runs once on mount
    setMounted(true);
    console.log("Player has entered the stage");
    
    return () => {
      console.log("Player has exited");
    };
  }, []); // Empty array = mount only

  return <div>{mounted ? "On stage" : "Backstage"}</div>;
}`;

  const unmountComparisonBad = `// ❌ Sudden drag off stage
function MessyExit() {
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // No cleanup - listener leaks!
  }, []);
  
  return <div>Performing...</div>;
}`;

  const unmountComparisonGood = `// ✅ Dignified bow with cleanup
function CleanExit() {
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    
    // Cleanup removes listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return <div>Performing...</div>;
}`;

  // Demo 1: Resource leak simulation
  useEffect(() => {
    if (resourceLeak && chapter === 1) {
      const id = setInterval(() => {
        setLeakCount(prev => {
          const newCount = prev + 1;
          // Circuit breaker at 50
          if (newCount >= 50) {
            setResourceLeak(false);
            alert("Safety limit reached! Demo auto-reset.");
            return 0;
          }
          return newCount;
        });
      }, 200);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [resourceLeak, chapter]);

  // Demo 2: Lifecycle visualization
  useEffect(() => {
    if (componentMounted && chapter === 0) {
      setLifecycleStage("MOUNTED");
      const timer = setTimeout(() => {
        setLifecycleStage("UPDATING");
        setTimeout(() => {
          setLifecycleStage("READY");
        }, 1000);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setLifecycleStage("WAITING");
    }
  }, [componentMounted, chapter]);

  // Demo 3: Timer with/without cleanup
  useEffect(() => {
    if (chapter === 3 && !unmountClean) {
      const id = setInterval(() => {
        setTimerCount(prev => prev + 1);
      }, 500);
      return () => clearInterval(id);
    }
  }, [chapter, unmountClean]);

  // Reset all demos on chapter change
  useEffect(() => {
    setComponentMounted(false);
    setResourceLeak(false);
    setLeakCount(0);
    setTimerCount(0);
    setLifecycleStage("WAITING");
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [chapter]);

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Theater}
        title="As You Like It"
        subtitle="The Forest of Arden, 1599"
        concept="React Concept: Component Lifecycle"
        themeColor="emerald"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-emerald-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Timer className="h-5 w-5 text-emerald-400" />
                  Stage Controls
                </h3>
                
                {chapter === 0 && (
                  <div className="space-y-4">
                    <button
                      onClick={() => setComponentMounted(!componentMounted)}
                      className={`w-full rounded px-4 py-2 font-medium transition-all ${
                        componentMounted
                          ? "bg-emerald-700 hover:bg-emerald-600"
                          : "bg-slate-800 hover:bg-slate-700"
                      }`}
                    >
                      {componentMounted ? "Exit Stage" : "Enter Stage"}
                    </button>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Lifecycle Stage</div>
                      <div className="font-mono text-lg tabular-nums">
                        {lifecycleStage}
                      </div>
                    </div>
                  </div>
                )}

                {chapter === 1 && (
                  <div className="space-y-4">
                    <button
                      onClick={() => setResourceLeak(!resourceLeak)}
                      className={`w-full rounded px-4 py-2 font-medium transition-all ${
                        resourceLeak
                          ? "bg-red-700 hover:bg-red-600"
                          : "bg-slate-800 hover:bg-slate-700"
                      }`}
                    >
                      {resourceLeak ? "Stop Leak" : "Start Leaky Timer"}
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Leaked Timers</div>
                        <div className="font-mono text-2xl tabular-nums text-red-400">
                          {leakCount}
                        </div>
                      </div>
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Status</div>
                        <div className={resourceLeak ? "text-red-400" : "text-emerald-400"}>
                          {resourceLeak ? "LEAKING" : "CLEAN"}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {chapter === 3 && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUnmountClean(false)}
                        className={`flex-1 rounded px-3 py-2 text-sm ${
                          !unmountClean ? "bg-red-700" : "bg-slate-800"
                        }`}
                      >
                        ❌ Messy
                      </button>
                      <button
                        onClick={() => setUnmountClean(true)}
                        className={`flex-1 rounded px-3 py-2 text-sm ${
                          unmountClean ? "bg-emerald-700" : "bg-slate-800"
                        }`}
                      >
                        ✅ Clean
                      </button>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Orphaned Timers</div>
                      <div className="font-mono text-2xl tabular-nums">
                        {!unmountClean ? timerCount : 0}
                      </div>
                    </div>
                  </div>
                )}

                {(chapter === 2 || chapter === 4) && (
                  <div className="space-y-4">
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Current Phase</div>
                      <div className="font-mono text-lg tabular-nums text-emerald-400">
                        {chapter === 2 ? "UPDATE" : "COMPLETE CYCLE"}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setComponentMounted(true);
                        setTimeout(() => setComponentMounted(false), 2000);
                      }}
                      className="w-full rounded bg-emerald-700 px-4 py-2 hover:bg-emerald-600"
                    >
                      <Play className="mr-2 inline h-4 w-4" />
                      Run Full Cycle
                    </button>
                  </div>
                )}
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Stage</span>
                    <span className="text-sm font-medium">DOM / Application</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Player</span>
                    <span className="text-sm font-medium">React Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Entrance</span>
                    <span className="text-sm font-medium">Component Mounting</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Seven Ages</span>
                    <span className="text-sm font-medium">Component Updates</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Exit</span>
                    <span className="text-sm font-medium">Component Unmounting</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Jaques' Speech</span>
                    <span className="text-sm font-medium">Lifecycle Documentation</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Costumes & Props</span>
                    <span className="text-sm font-medium">State & Side Effects</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-emerald-200/80">
                  {chapter === 0 && "Mounting is a component's entrance onto the DOM stage—it happens once and sets up initial state and effects."}
                  {chapter === 1 && "Without cleanup, resources (timers, listeners) leak memory like props left on stage, causing bugs and performance issues."}
                  {chapter === 2 && "useEffect's return function is your cleanup crew—it removes resources before the component updates or unmounts."}
                  {chapter === 3 && "Clean unmounting prevents memory leaks and errors, ensuring the DOM stage is ready for the next component's entrance."}
                  {chapter === 4 && "Mastering mount/update/unmount creates predictable components that manage their entire lifecycle responsibly."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && "\"All the world's a stage, and all its components merely players.\""}
                  {chapter === 1 && "\"A role unchanging is a scene decaying.\""}
                  {chapter === 2 && "\"Each act must be played to its completion before the next begins.\""}
                  {chapter === 3 && "\"A graceful exit leaves no props behind.\""}
                  {chapter === 4 && "\"From entrance to exit, every phase has its purpose.\""}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — {chapter === 0 || chapter === 2 ? "Jaques" : "The Playwright"}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-3xl font-bold text-emerald-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-emerald-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-emerald-500"></div>
              <h3 className="text-xl font-bold text-emerald-200">
                Interactive Demonstration
              </h3>
            </div>

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-emerald-500/30 bg-slate-900/60 p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium">Player Status</span>
                        <span className={`font-mono text-sm ${componentMounted ? "text-emerald-400" : "text-slate-500"}`}>
                          {componentMounted ? "ON STAGE" : "BACKSTAGE"}
                        </span>
                      </div>
                      <div className="h-32 rounded border border-slate-700 bg-slate-900/50 p-4">
                        <div className={`flex h-full items-center justify-center rounded transition-all duration-500 ${componentMounted ? "bg-emerald-900/40 border border-emerald-500/30" : "bg-slate-900/20"}`}>
                          {componentMounted ? (
                            <div className="text-center">
                              <div className="text-4xl">🎭</div>
                              <div className="mt-2 text-sm">Performing</div>
                            </div>
                          ) : (
                            <div className="text-center text-slate-500">
                              <div className="text-4xl">🚪</div>
                              <div className="mt-2 text-sm">Waiting in Wings</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="rounded bg-slate-800/30 p-2 text-center">
                          <div className="text-xs text-slate-500">Phase</div>
                          <div className="font-mono text-sm">{lifecycleStage}</div>
                        </div>
                        <div className="rounded bg-slate-800/30 p-2 text-center">
                          <div className="text-xs text-slate-500">Mounted</div>
                          <div className="font-mono text-sm">{componentMounted ? "✓" : "✗"}</div>
                        </div>
                        <div className="rounded bg-slate-800/30 p-2 text-center">
                          <div className="text-xs text-slate-500">Effects</div>
                          <div className="font-mono text-sm">1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={mountExampleCode}
                      language="tsx"
                      variant="success"
                      title="// Component Mounting (Player's Entrance)"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-500/30 bg-slate-900/60 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-medium">Resource Leak Demo</span>
                        <span className={`font-mono text-sm ${resourceLeak ? "animate-pulse text-red-400" : "text-slate-500"}`}>
                          {resourceLeak ? "LEAKING MEMORY" : "STABLE"}
                        </span>
                      </div>
                      <div className="mb-4 h-40 rounded border border-slate-700 bg-slate-900/50 p-4">
                        <div className="h-full overflow-hidden rounded">
                          <div className="relative h-full">
                            {/* Visual leak representation */}
                            {Array.from({ length: Math.min(leakCount, 20) }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute h-4 w-4 animate-pulse rounded-full bg-red-500/60"
                                style={{
                                  left: `${10 + (i % 5) * 20}%`,
                                  top: `${10 + Math.floor(i / 5) * 20}%`,
                                  animationDelay: `${i * 0.1}s`
                                }}
                              ></div>
                            ))}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <Timer className="mx-auto h-8 w-8 text-red-400" />
                                <div className="mt-2 font-mono text-2xl tabular-nums text-red-300">
                                  {leakCount}
                                </div>
                                <div className="text-sm text-slate-400">Leaked Timers</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setResourceLeak(!resourceLeak)}
                          className={`rounded px-4 py-2 font-medium ${
                            resourceLeak
                              ? "bg-red-700 hover:bg-red-600"
                              : "bg-slate-800 hover:bg-slate-700"
                          }`}
                        >
                          {resourceLeak ? "⏹️ Stop Leak" : "💥 Start Leak"}
                        </button>
                        <button
                          onClick={() => setLeakCount(0)}
                          className="rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                        >
                          <RotateCcw className="mr-2 inline h-4 w-4" />
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={antiPatternCode}
                      language="tsx"
                      variant="error"
                      title="// ❌ Anti-Pattern: Missing Cleanup"
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
                  goodCode={correctPatternCode}
                  language="tsx"
                  themeColor="emerald"
                  badLabel="❌ Soldier Without Cleanup"
                  goodLabel="✅ Soldier Who Sheathes Sword"
                  badExplanation="Missing cleanup function causes timers to run after unmount, wasting memory and potentially causing errors."
                  goodExplanation="Cleanup function ensures timer stops when component unmounts, preventing memory leaks and keeping stage clean."
                />
                
                <div className="rounded-lg border border-emerald-500/30 bg-slate-900/60 p-4">
                  <div className="mb-4 grid grid-cols-3 gap-4">
                    <div className="rounded bg-slate-800/30 p-3 text-center">
                      <div className="text-xs text-slate-500">Mount Phase</div>
                      <div className="font-mono text-lg text-emerald-400">useEffect(() =&gt; {}, [])</div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3 text-center">
                      <div className="text-xs text-slate-500">Update Phase</div>
                      <div className="font-mono text-lg text-amber-400">useEffect(() =&gt; {}, [deps])</div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3 text-center">
                      <div className="text-xs text-slate-500">Unmount Phase</div>
                      <div className="font-mono text-lg text-cyan-400">return () =&gt; {}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400">
                    <span className="font-medium text-emerald-300">Key Insight:</span> Each lifecycle phase has a specific useEffect pattern. Empty array for mount, dependency array for updates, and return function for unmount cleanup.
                  </p>
                </div>
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className={`rounded-lg border p-4 transition-all ${
                      unmountClean 
                        ? "border-emerald-500/30 bg-emerald-950/20" 
                        : "border-red-500/30 bg-red-950/20"
                    }`}>
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-medium">
                          {unmountClean ? "✅ Clean Unmount" : "❌ Messy Unmount"}
                        </span>
                        <span className={`font-mono text-sm ${
                          unmountClean ? "text-emerald-400" : "text-red-400"
                        }`}>
                          {unmountClean ? "PROPS RETURNED" : "PROPS ORPHANED"}
                        </span>
                      </div>
                      <div className="mb-4 h-40 rounded border border-slate-700 bg-slate-900/50 p-4">
                        <div className="h-full overflow-hidden rounded">
                          <div className="relative h-full">
                            {!unmountClean && (
                              <>
                                {/* Visual orphaned props */}
                                {Array.from({ length: timerCount % 8 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="absolute h-8 w-8 animate-bounce rounded bg-red-500/40"
                                    style={{
                                      left: `${15 + (i * 12)}%`,
                                      top: `${30 + (i % 3) * 20}%`,
                                    }}
                                  ></div>
                                ))}
                              </>
                            )}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                {unmountClean ? (
                                  <>
                                    <div className="text-4xl">🎩</div>
                                    <div className="mt-2 text-emerald-300">Stage Clean</div>
                                    <div className="text-sm text-slate-400">All props returned</div>
                                  </>
                                ) : (
                                  <>
                                    <div className="text-4xl">💥</div>
                                    <div className="mt-2 text-red-300">Stage Cluttered</div>
                                    <div className="text-sm text-slate-400">{timerCount} orphaned timers</div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded bg-slate-800/30 p-2 text-center">
                          <div className="text-xs text-slate-500">Timer Count</div>
                          <div className="font-mono text-lg">{!unmountClean ? timerCount : 0}</div>
                        </div>
                        <div className="rounded bg-slate-800/30 p-2 text-center">
                          <div className="text-xs text-slate-500">Status</div>
                          <div className={unmountClean ? "text-emerald-400" : "text-red-400"}>
                            {unmountClean ? "CLEAN" : "DIRTY"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <CodeComparison
                      badCode={unmountComparisonBad}
                      goodCode={unmountComparisonGood}
                      language="tsx"
                      themeColor="emerald"
                      badLabel="❌ Sudden Drag (No Cleanup)"
                      goodLabel="✅ Dignified Bow (With Cleanup)"
                      badExplanation="Event listener remains attached after unmount, causing memory leaks and potential errors when event fires."
                      goodExplanation="Cleanup function removes the event listener before unmount, preventing memory leaks and keeping the DOM clean."
                    />
                  </div>
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-emerald-500/30 bg-slate-900/60 p-6">
                  <div className="mb-6">
                    <h4 className="mb-4 text-lg font-bold text-emerald-200">Complete Lifecycle Journey</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {["MOUNT", "UPDATE", "UPDATE", "UPDATE", "UNMOUNT"].map((phase, index) => (
                        <div
                          key={index}
                          className={`rounded p-3 text-center transition-all ${
                            componentMounted && index <= (lifecycleStage === "READY" ? 4 : 2)
                              ? "bg-emerald-900/40 border border-emerald-500/30"
                              : "bg-slate-800/30"
                          }`}
                        >
                          <div className="mb-1 text-2xl">
                            {["👶", "🎒", "💘", "⚔️", "👋"][index]}
                          </div>
                          <div className="text-xs font-medium">{phase}</div>
                          <div className="mt-1 text-xs text-slate-500">
                            {["Entrance", "School", "Love", "Battle", "Exit"][index]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <CodeBlock
                        code={`// Complete lifecycle management
function PlayerJourney() {
  // 1. Mount: Initialize state
  const [age, setAge] = useState("infant");
  
  // 2. Effects with cleanup for each phase
  useEffect(() => {
    console.log(\`Mounted as \${age}\`);
    
    // 3. Setup phase-specific resources
    const phaseTimer = setInterval(() => {
      // Update logic here
    }, 1000);
    
    // 4. Cleanup on unmount OR before re-run
    return () => {
      console.log(\`Cleaning up \${age} phase\`);
      clearInterval(phaseTimer);
    };
  }, [age]); // Re-run when age changes

  // 5. Render based on current phase
  return <div>Playing: {age}</div>;
}`}
                        language="tsx"
                        variant="success"
                        title="// The Complete Player (Component)"
                        defaultExpanded={true}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div className="rounded bg-slate-800/30 p-4">
                        <h5 className="mb-3 font-medium text-emerald-300">Lifecycle Checklist</h5>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                            <span>Mount: Initialize state & setup effects</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                            <span>Update: Respond to prop/state changes</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                            <span>Unmount: Cleanup all resources</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-400" />
                            <span>Effects: Re-run when dependencies change</span>
                          </li>
                        </ul>
                      </div>
                      
                      <button
                        onClick={() => {
                          setComponentMounted(true);
                          setLifecycleStage("MOUNTED");
                          setTimeout(() => setLifecycleStage("UPDATING"), 800);
                          setTimeout(() => setLifecycleStage("READY"), 1800);
                          setTimeout(() => {
                            setComponentMounted(false);
                            setLifecycleStage("WAITING");
                          }, 3000);
                        }}
                        className="w-full rounded bg-emerald-700 px-4 py-3 font-medium hover:bg-emerald-600"
                      >
                        <Play className="mr-2 inline h-5 w-5" />
                        Run Complete Lifecycle Demo
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="emerald"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}