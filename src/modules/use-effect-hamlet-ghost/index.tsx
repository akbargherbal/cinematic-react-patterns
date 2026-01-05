import { useState, useEffect, useRef } from "react";
import { Ghost, Shield, CheckCircle, Quote, Zap, AlertTriangle, Play, RotateCcw } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function UseEffectHamletGhost(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [ghostPresent, setGhostPresent] = useState<boolean>(false);
  const [command, setCommand] = useState<string>("");
  const [renderCount, setRenderCount] = useState<number>(0);
  const [isFrozen, setIsFrozen] = useState<boolean>(false);
  const [demoMode, setDemoMode] = useState<'broken' | 'fixed'>('broken');
  const [subscriptionActive, setSubscriptionActive] = useState<boolean>(false);
  const [lingeringPurpose, setLingeringPurpose] = useState<string>("");

  // Circuit breaker for infinite loop demo
  const safetyRenderCount = useRef<number>(0);

  const chapters: Chapter[] = [
    {
      title: "The Unbidden Visitor",
      content: `The Ghost's command, "Revenge his murder," is an external event that changes Hamlet's state. **useEffect synchronizes external events (APIs, subscriptions) with your component's state, running after render.**`
    },
    {
      title: "The Frozen Prince",
      content: `Trying to process the Ghost's command *during* the encounter freezes Hamlet. **Side effects in the render body block React updates, causing UI freezes and infinite loops.**`
    },
    {
      title: "The Patient Vow",
      content: `Hamlet stores the command in memory and acts *after* the encounter. **useEffect schedules side effects to run after rendering, preventing blocking and enabling smooth updates.**`
    },
    {
      title: "Court Chaos vs. Battlements Resolve",
      content: `Without useEffect, side effects run during render and break the UI. **With useEffect, they run after render, allowing the component to update smoothly and predictably.**`
    },
    {
      title: "The Engine of Vengeance",
      content: `The Ghost departs (cleanup), but his command persists in Hamlet's state. **useEffect cleanup disconnects from external sources, while the effect's state changes remain, driving future behavior.**`
    }
  ];

  // Code examples
  const antiPatternRender = `// ❌ Side effect in render body (FREEZES UI)
function FrozenPrince() {
  const [purpose, setPurpose] = useState("");

  // This runs during render - BLOCKS updates!
  if (ghostAppears) {
    setPurpose("Revenge"); // Triggers re-render -> infinite loop
  }

  return <div>{purpose}</div>;
}`;

  const correctUseEffect = `// ✅ Side effect scheduled with useEffect
function PatientPrince() {
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    // Runs AFTER render, won't block UI
    if (ghostAppears) {
      setPurpose("Revenge");
    }
  }, [ghostAppears]); // Dependency: runs when ghostAppears changes

  return <div>{purpose}</div>;
}`;

  const useEffectWithCleanup = `// ✅ useEffect with cleanup function
function EngineOfVengeance() {
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    // Subscribe to external event (Ghost)
    const subscription = ghostEvents.subscribe((command) => {
      setPurpose(command);
    });

    // Cleanup: runs when component unmounts or dependency changes
    return () => {
      subscription.unsubscribe(); // Ghost departs
    };
  }, []); // Empty array = runs once on mount

  return <div>{purpose}</div>;
}`;

  const currentChapter = chapters[chapter];

  // Demo 1: Ghost encounter (external event)
  const handleSummonGhost = () => {
    setGhostPresent(true);
    setTimeout(() => {
      setCommand("Revenge his foul and most unnatural murder.");
    }, 800);
  };

  // Demo 2: Infinite loop anti-pattern (with circuit breaker)
  useEffect(() => {
    if (chapter === 1 && demoMode === 'broken' && ghostPresent) {
      safetyRenderCount.current += 1;
      setRenderCount(prev => prev + 1);
      
      if (safetyRenderCount.current > 10) {
        setIsFrozen(true);
        return;
      }
      
      // This simulates the infinite loop
      const timer = setTimeout(() => {
        setRenderCount(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [chapter, demoMode, ghostPresent, renderCount]);

  // Demo 3: Patient vow with useEffect
  useEffect(() => {
    if (chapter === 2 && ghostPresent && !command) {
      const timer = setTimeout(() => {
        setCommand("Revenge stored for later action.");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [chapter, ghostPresent, command]);

  // Demo 4: Subscription and cleanup
  useEffect(() => {
    if (chapter === 4) {
      if (subscriptionActive) {
        const timer = setInterval(() => {
          setLingeringPurpose(prev => prev ? prev : "Driving every action");
        }, 1500);
        return () => clearInterval(timer);
      } else {
        setLingeringPurpose("");
      }
    }
  }, [chapter, subscriptionActive]);

  // Reset function
  const resetDemo = () => {
    setGhostPresent(false);
    setCommand("");
    setRenderCount(0);
    setIsFrozen(false);
    safetyRenderCount.current = 0;
    setSubscriptionActive(false);
    setLingeringPurpose("");
  };

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Ghost}
        title="Hamlet"
        subtitle="The Prince of Denmark, c. 1600"
        concept="React Concept: useEffect Hook"
        themeColor="indigo"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-indigo-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Zap className="h-5 w-5 text-indigo-400" />
                  Scene Controls
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={handleSummonGhost}
                      disabled={ghostPresent}
                      className="flex-1 rounded bg-indigo-700 px-3 py-2 text-sm font-medium hover:bg-indigo-600 disabled:opacity-50"
                    >
                      <Play className="mr-2 inline h-4 w-4" />
                      Summon Ghost
                    </button>
                    <button
                      onClick={resetDemo}
                      className="rounded bg-slate-700 px-3 py-2 text-sm hover:bg-slate-600"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {chapter === 3 && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDemoMode('broken')}
                        className={`flex-1 rounded px-3 py-2 text-sm ${demoMode === 'broken' ? 'bg-red-700' : 'bg-slate-800'}`}
                      >
                        ❌ Court Chaos
                      </button>
                      <button
                        onClick={() => setDemoMode('fixed')}
                        className={`flex-1 rounded px-3 py-2 text-sm ${demoMode === 'fixed' ? 'bg-indigo-700' : 'bg-slate-800'}`}
                      >
                        ✅ Battlements
                      </button>
                    </div>
                  )}

                  {chapter === 4 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ghost Subscription</span>
                      <button
                        onClick={() => setSubscriptionActive(!subscriptionActive)}
                        className={`rounded-full px-4 py-1 text-sm ${subscriptionActive ? 'bg-amber-700' : 'bg-slate-700'}`}
                      >
                        {subscriptionActive ? "Active" : "Inactive"}
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-500">Renders</div>
                      <div className="font-mono text-xl">{renderCount}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-500">Status</div>
                      <div className={`font-mono text-sm ${isFrozen ? 'text-red-500' : 'text-indigo-500'}`}>
                        {isFrozen ? "FROZEN" : "ACTIVE"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-indigo-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hamlet</span>
                    <span className="text-sm font-medium">Functional Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Ghost</span>
                    <span className="text-sm font-medium">External Event / Data Source</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Ghost's Command</span>
                    <span className="text-sm font-medium">Side Effect</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Encounter</span>
                    <span className="text-sm font-medium">useEffect Hook</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Ghost's Appearance</span>
                    <span className="text-sm font-medium">Dependency Array</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Ghost's Departure</span>
                    <span className="text-sm font-medium">Cleanup Function</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Sworn Vengeance</span>
                    <span className="text-sm font-medium">State Update</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-indigo-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-indigo-200/80">
                  {chapter === 0 && "useEffect synchronizes your component with external systems, running side effects after rendering—just like Hamlet processing the Ghost's command."}
                  {chapter === 1 && "Side effects in the render body cause infinite loops and UI freezes. Always separate effects from rendering logic."}
                  {chapter === 2 && "useEffect schedules work after render completion, preventing blocking and enabling predictable component updates."}
                  {chapter === 3 && "The dependency array controls when effects re-run. Empty array = once on mount, with values = when they change."}
                  {chapter === 4 && "Cleanup functions remove subscriptions when components unmount, but state updates from effects persist."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && "\"Revenge his foul and most unnatural murder.\""}
                  {chapter === 1 && "\"My lord, you do not answer.\""}
                  {chapter === 2 && "\"I'll wipe away all trivial fond records... And thy commandment all alone shall live.\""}
                  {chapter === 3 && "\"Now to my word.\""}
                  {chapter === 4 && "\"The ghost is gone, but his words remain, driving my every action.\""}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — {chapter === 0 || chapter === 2 ? "The Ghost" : chapter === 1 ? "Horatio" : "Hamlet"}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-indigo-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-indigo-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-indigo-500"></div>
              <h3 className="text-xl font-bold text-indigo-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter 0: Ghost Encounter */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className={`rounded-lg border-2 p-6 transition-all duration-500 ${ghostPresent ? 'border-indigo-500 bg-indigo-950/30' : 'border-slate-700 bg-slate-900/50'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${ghostPresent ? 'animate-pulse bg-indigo-500' : 'bg-slate-600'}`}></div>
                          <span className="font-medium">Ghost Presence</span>
                        </div>
                        <span className={`font-mono ${ghostPresent ? 'text-indigo-400' : 'text-slate-500'}`}>
                          {ghostPresent ? "DETECTED" : "ABSENT"}
                        </span>
                      </div>
                      {command && (
                        <div className="mt-6 rounded bg-slate-800/70 p-4">
                          <Quote className="mb-2 h-5 w-5 text-indigo-400" />
                          <p className="text-lg italic text-slate-200">{command}</p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleSummonGhost}
                      disabled={ghostPresent}
                      className="w-full rounded-lg bg-indigo-700 py-3 font-medium hover:bg-indigo-600 disabled:opacity-50"
                    >
                      {ghostPresent ? "Ghost Already Present" : "Summon the Ghost (External Event)"}
                    </button>
                  </div>
                  <div className="space-y-4">
                    <CodeBlock
                      code={`// External event triggers state update
useEffect(() => {
  if (ghostAppears) {
    setPurpose("Revenge"); // State update
  }
}, [ghostAppears]); // Dependency: run when ghostAppears changes`}
                      language="tsx"
                      variant="default"
                      title="// useEffect Synchronizes External Events"
                      defaultExpanded={true}
                    />
                    <div className="rounded bg-slate-800/40 p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">The Pattern:</span>
                      </div>
                      <ul className="mt-2 space-y-1">
                        <li>• Ghost appears (external event changes)</li>
                        <li>• useEffect dependency array triggers</li>
                        <li>• Effect runs, updating component state</li>
                        <li>• Component re-renders with new purpose</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 1: Anti-Pattern */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className={`rounded-lg border-2 p-6 transition-all ${isFrozen ? 'border-red-500 bg-red-950/20' : 'border-slate-700'}`}>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-3 w-3 rounded-full ${isFrozen ? 'bg-red-500' : 'bg-slate-600'}`}></div>
                      <span className="font-medium">Prince's Mind (Render Logic)</span>
                    </div>
                    <span className={`font-mono text-sm ${isFrozen ? 'text-red-500' : 'text-slate-400'}`}>
                      {isFrozen ? "FROZEN - Circuit Breaker Engaged" : `Renders: ${renderCount}`}
                    </span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="text-sm text-slate-500">Ghost Command Processing</div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                        <div 
                          className={`h-full ${isFrozen ? 'bg-red-500' : 'bg-indigo-500'}`}
                          style={{ width: `${Math.min(renderCount * 10, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-slate-500">UI Responsiveness</div>
                      <div className={`rounded px-3 py-2 text-center font-mono text-sm ${isFrozen ? 'bg-red-900/40 text-red-300' : 'bg-slate-800 text-slate-300'}`}>
                        {isFrozen ? "❌ BLOCKED" : "✅ RESPONSIVE"}
                      </div>
                    </div>
                  </div>
                  {isFrozen && (
                    <div className="mt-4 rounded border border-red-500/30 bg-red-950/20 p-4">
                      <div className="flex items-center gap-2 text-red-300">
                        <AlertTriangle className="h-5 w-5" />
                        <span className="font-medium">Safety Limit Reached</span>
                      </div>
                      <p className="mt-1 text-sm text-red-300/80">
                        Render loop detected! The component tried to update state during render more than 10 times.
                      </p>
                    </div>
                  )}
                </div>
                <CodeBlock
                  code={antiPatternRender}
                  language="tsx"
                  variant="error"
                  title="// ❌ ANTI-PATTERN: Side Effect in Render Body"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 2: Solution */}
            {chapter === 2 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className={`rounded-lg border-2 p-6 ${ghostPresent ? 'border-indigo-500/50 bg-indigo-950/20' : 'border-slate-700'}`}>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${command ? 'bg-emerald-500' : 'bg-slate-600'}`}></div>
                          <span className="font-medium">Command Storage (State)</span>
                        </div>
                        <span className="font-mono text-sm text-slate-400">
                          {command ? "STORED" : "PENDING"}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded bg-slate-800/50 p-4">
                          <div className="text-sm text-slate-500">Current Purpose</div>
                          <div className={`mt-1 font-medium ${command ? 'text-emerald-300' : 'text-slate-400'}`}>
                            {command || "Waiting for effect to run..."}
                          </div>
                        </div>
                        <div className="rounded bg-slate-800/30 p-3">
                          <div className="text-sm text-slate-500">Effect Status</div>
                          <div className="mt-1 flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${command ? 'bg-emerald-500' : 'animate-pulse bg-amber-500'}`}></div>
                            <span className="text-sm">
                              {command ? "Completed after render" : "Scheduled for post-render"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-slate-500">
                      The effect runs AFTER the component renders, preventing UI freezes.
                    </div>
                  </div>
                  <div>
                    <CodeBlock
                      code={correctUseEffect}
                      language="tsx"
                      variant="success"
                      title="// ✅ SOLUTION: useEffect Schedules Post-Render"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 3: Comparison */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className={`rounded-lg border-2 p-6 ${demoMode === 'broken' ? 'border-red-500/50 bg-red-950/20' : 'border-slate-700/50'}`}>
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-bold text-slate-300">
                        {demoMode === 'broken' ? "❌ Court Chaos" : "✅ Battlements Resolve"}
                      </h4>
                      <span className={`rounded px-3 py-1 text-xs font-medium ${demoMode === 'broken' ? 'bg-red-900/50 text-red-300' : 'bg-indigo-900/50 text-indigo-300'}`}>
                        {demoMode === 'broken' ? "Sync Render" : "useEffect"}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded bg-slate-800/50 p-4">
                        <div className="text-sm text-slate-500">UI Flow</div>
                        <div className={`mt-2 font-mono text-lg ${demoMode === 'broken' ? 'text-red-400' : 'text-indigo-400'}`}>
                          {demoMode === 'broken' ? "INTERRUPTED" : "SMOOTH"}
                        </div>
                      </div>
                      <div className="rounded bg-slate-800/50 p-4">
                        <div className="text-sm text-slate-500">Render Timing</div>
                        <div className="mt-2">
                          {demoMode === 'broken' ? (
                            <div className="space-y-2">
                              <div className="h-2 rounded-full bg-red-900/50"></div>
                              <div className="h-2 rounded-full bg-red-900/50"></div>
                              <div className="h-2 rounded-full bg-red-900/50"></div>
                              <div className="text-xs text-red-400">Side effect blocks render cycle</div>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="h-2 rounded-full bg-indigo-900/50"></div>
                              <div className="ml-4 h-2 w-3/4 rounded-full bg-indigo-500/50"></div>
                              <div className="h-2 rounded-full bg-indigo-900/50"></div>
                              <div className="text-xs text-indigo-400">Side effect runs after render</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <CodeComparison
                      badCode={antiPatternRender}
                      goodCode={correctUseEffect}
                      language="tsx"
                      themeColor="indigo"
                      badLabel="❌ During Render (Chaos)"
                      goodLabel="✅ After Render (Resolve)"
                      badExplanation="State update during render causes infinite loop and UI freeze"
                      goodExplanation="useEffect schedules update after render, maintaining smooth UI flow"
                    />
                    <div className="rounded bg-slate-800/40 p-4 text-sm">
                      <div className="font-medium text-slate-300">Key Difference:</div>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-red-500"></div>
                          <span><strong>Wrong:</strong> Effect runs <em>during</em> render, blocking updates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span><strong>Right:</strong> Effect runs <em>after</em> render, via useEffect dependency array</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 4: Summary */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border-2 border-slate-700 p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-3 w-3 rounded-full ${subscriptionActive ? 'bg-amber-500' : 'bg-slate-600'}`}></div>
                          <span className="font-medium">Ghost Subscription</span>
                        </div>
                        <button
                          onClick={() => setSubscriptionActive(!subscriptionActive)}
                          className={`rounded px-3 py-1 text-sm ${subscriptionActive ? 'bg-amber-900/50 text-amber-300' : 'bg-slate-800 text-slate-400'}`}
                        >
                          {subscriptionActive ? "Active" : "Inactive"}
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="rounded bg-slate-800/50 p-4">
                          <div className="text-sm text-slate-500">Subscription Status</div>
                          <div className="mt-2 flex items-center gap-2">
                            <div className={`h-2 w-2 rounded-full ${subscriptionActive ? 'animate-pulse bg-amber-500' : 'bg-slate-600'}`}></div>
                            <span className="font-mono text-sm">
                              {subscriptionActive ? "LISTENING..." : "DISCONNECTED"}
                            </span>
                          </div>
                        </div>
                        <div className="rounded border border-emerald-500/20 bg-emerald-950/10 p-4">
                          <div className="text-sm text-slate-500">Lingering Effect (State)</div>
                          <div className="mt-2 font-medium text-emerald-300">
                            {lingeringPurpose || "(Cleanup executed, state remains)"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-slate-500">
                      The subscription can be cleaned up, but the state change from the effect persists.
                    </div>
                  </div>
                  <div className="space-y-4">
                    <CodeBlock
                      code={useEffectWithCleanup}
                      language="tsx"
                      variant="default"
                      title="// ✅ useEffect with Cleanup Function"
                      defaultExpanded={true}
                    />
                    <div className="rounded bg-slate-800/40 p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="font-medium">Persistent vs. Ephemeral</span>
                      </div>
                      <ul className="mt-2 space-y-2">
                        <li>• <strong>Subscription:</strong> Active connection (cleaned up on unmount)</li>
                        <li>• <strong>State Update:</strong> Persistent data (remains after cleanup)</li>
                        <li>• <strong>Cleanup Function:</strong> Runs before next effect or on unmount</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="indigo"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}