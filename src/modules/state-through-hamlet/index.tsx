import { useState, useEffect, useRef, useCallback } from "react";
import { Brain, Shield, CheckCircle, Quote } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

// Custom hook to count renders
const useRenderCounter = (label: string): number => {
  const renderCount = useRef(0);
  renderCount.current += 1;
  return renderCount.current;
};

export default function StateThroughHamlet(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'broken' | 'fixed'>('broken');
  const [internalState, setInternalState] = useState<number>(0);
  const [opheliaTriggered, setOpheliaTriggered] = useState<boolean>(false);
  const [certainty, setCertainty] = useState<'low' | 'absolute'>('low');
  const [passiveState, setPassiveState] = useState<number>(0);
  const [activeState, setActiveState] = useState<number>(0);
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Circuit breaker for Chapter 1 demo
  useEffect(() => {
    if (leakedTimers >= 50) {
      alert("Safety limit reached! Too many timers leaked. Resetting demo.");
      resetChapter1Demo();
    }
  }, [leakedTimers]);

  // Auto-cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up any running timers
      setLeakedTimers(0);
      setIsPlaying(false);
    };
  }, []);

  const renderCount = useRenderCounter('HamletComponent');

  const chapters: Chapter[] = [
    {
      title: "The Weight of the Question",
      content: `Hamlet holds Yorick's skull—a tangible object representing his **internal state**. His "to be or not to be" contemplation is **mutable component data** that defines his current condition and drives his behavior.`
    },
    {
      title: "The Prison of Stasis",
      content: `When Ophelia appears, Hamlet's **stale state** can't process new input. His wild, broken reaction is a **buggy re-render** caused by **incorrect state updates**. A locked mind renders broken UI.`
    },
    {
      title: "The Trigger Within",
      content: `Watching Claudius panic, Hamlet's internal state flips from suspicion to certainty. This **internal setState call** triggers an **automatic re-render**: new purposeful behavior. The change within commands the change without.`
    },
    {
      title: "To Suffer or To Act",
      content: `**Passive state** (Ghost's tale) overwhelms → ineffective inaction. **Active state** (Mousetrap realization) is managed internally → decisive action. The difference is **who controls the update**.`
    },
    {
      title: "The Engine of the Self",
      content: `State isn't a cage—it's the **engine**. Hamlet's changing thoughts (state) make him dynamic, not static. A component's **internal state** is its capacity to be interactive, to respond, to *be*.`
    }
  ];

  // Code examples
  const staticComponent = `// ❌ Static Portrait
function StaticHamlet() {
  return <p>"Alas, poor Yorick!"</p>;
}`;

  const statefulComponent = `// ✅ Dynamic Component
function LivingHamlet() {
  const [contemplation, setContemplation] = 
    useState("To be, or not to be");
  
  const handleRealization = () => {
    setContemplation("I must be cruel, only to be kind");
  };
  
  return (
    <div>
      <p>{contemplation}</p>
      <button onClick={handleRealization}>
        Realize Truth
      </button>
    </div>
  );
}`;

  const staleClosureBug = `// ❌ Stale Closure Bug
function BrokenHamlet() {
  const [indecision, setIndecision] = useState(100);
  
  const meetOphelia = () => {
    setTimeout(() => {
      // ❌ Captures OLD indecision value
      setIndecision(indecision + 50);
    }, 1000);
  };
  
  return <button onClick={meetOphelia}>Meet Ophelia</button>;
}`;

  const fixedClosure = `// ✅ Fixed with Functional Update
function FixedHamlet() {
  const [indecision, setIndecision] = useState(100);
  
  const meetOphelia = () => {
    setTimeout(() => {
      // ✅ Always uses latest state
      setIndecision(prev => prev + 50);
    }, 1000);
  };
  
  return <button onClick={meetOphelia}>Meet Ophelia</button>;
}`;

  const passiveStateCode = `// ❌ Passive State Suffering
function PassiveHamlet() {
  const [trauma, setTrauma] = useState(0);
  
  // External event OVERWRITES state
  useEffect(() => {
    setTrauma(100); // Flooded by ghost's tale
  }, []);
  
  return <p>Trauma level: {trauma}</p>; // Renders: paralysis
}`;

  const activeStateCode = `// ✅ Active State Management
function ActiveHamlet() {
  const [resolve, setResolve] = useState(0);
  
  const observeGuilt = () => {
    // Active internal processing
    setResolve(100); // Intentional update
  };
  
  return (
    <>
      <p>Resolve: {resolve}</p>
      <button onClick={observeGuilt}>
        Watch The Mousetrap
      </button>
    </>
  );
}`;

  // Demo functions
  const triggerOpheliaBug = useCallback(() => {
    setOpheliaTriggered(true);
    setIsPlaying(true);
    
    // Simulate stale closure bug
    const buggyTimer = setTimeout(() => {
      // This captures the initial internalState value
      setInternalState(prev => {
        const newVal = prev + 1;
        setLeakedTimers(old => old + 1);
        return newVal;
      });
    }, 500);
    
    // Intentionally DON'T clean up to show bug
    // In real code: return () => clearTimeout(buggyTimer);
  }, []);

  const triggerMousetrap = () => {
    setCertainty('absolute');
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  const resetChapter1Demo = () => {
    setLeakedTimers(0);
    setOpheliaTriggered(false);
    setIsPlaying(false);
  };

  const resetChapter3Demo = () => {
    setPassiveState(0);
    setActiveState(0);
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Brain}
        title="Hamlet"
        subtitle="The Prince of Denmark, c. 1600"
        concept="React Concept: Component State"
        themeColor="cyan"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 text-lg font-bold text-cyan-200">Demo Controls</h3>
                
                {chapter === 1 && (
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDemoMode('broken')}
                        className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'broken' ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                      >
                        ❌ Stale Closure
                      </button>
                      <button
                        onClick={() => setDemoMode('fixed')}
                        className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'fixed' ? 'bg-cyan-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                      >
                        ✅ Fixed Update
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Leaked Timers</div>
                        <div className="font-mono text-xl text-red-400">{leakedTimers}</div>
                      </div>
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Demo Status</div>
                        <div className={`font-mono text-sm ${isPlaying ? 'text-amber-400' : 'text-slate-400'}`}>
                          {isPlaying ? 'PLAYING' : 'READY'}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={resetChapter1Demo}
                      className="w-full rounded bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
                    >
                      Reset Demo
                    </button>
                  </div>
                )}
                
                {chapter === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Passive</div>
                        <div className="font-mono text-xl text-slate-400">{passiveState}</div>
                      </div>
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Active</div>
                        <div className="font-mono text-xl text-cyan-400">{activeState}</div>
                      </div>
                    </div>
                    <button
                      onClick={resetChapter3Demo}
                      className="w-full rounded bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
                    >
                      Reset Comparison
                    </button>
                  </div>
                )}
                
                <div className="mt-4 border-t border-slate-800 pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">Total Renders</span>
                    <span className="font-mono text-sm text-amber-200">{renderCount}</span>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hamlet</span>
                    <span className="text-sm font-medium">React Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">"To be or not to be"</span>
                    <span className="text-sm font-medium">Component State</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Realization (Mousetrap)</span>
                    <span className="text-sm font-medium">setState Call</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">New Action Plan</span>
                    <span className="text-sm font-medium">Re-render</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Ghost's Command</span>
                    <span className="text-sm font-medium">External Props</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-sm text-slate-400">Yorick's Skull</span>
                    <span className="text-sm font-medium">State Visualized</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-cyan-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-cyan-200/80">
                  {chapter === 0 && "State is internal, mutable data that defines a component's current condition and drives its logic."}
                  {chapter === 1 && "Stale state (incorrect closures) causes buggy re-renders—the component renders broken UI."}
                  {chapter === 2 && "Calling setState triggers an automatic re-render—the UI updates to reflect the new state."}
                  {chapter === 3 && "Active state management (internal updates) beats passive reception (external overwrites)."}
                  {chapter === 4 && "State is your component's engine—its capacity to change, respond, and be interactive."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "To be, or not to be: that is the question."
                </p>
                <p className="mt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>— Hamlet</span>
                  <Quote className="h-3 w-3" />
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-3xl font-bold text-cyan-100">
              {currentChapter.title}
            </h2>
            <div className="mt-4 leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-cyan-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-6 w-2 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-600"></div>
              <h3 className="text-xl font-bold text-cyan-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter 0: Intro to State */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-400">Static Portrait</h4>
                    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6 text-center">
                      <p className="text-amber-200">"Alas, poor Yorick! I knew him, Horatio."</p>
                      <p className="mt-2 text-sm text-slate-500">(This component never changes)</p>
                    </div>
                    <CodeBlock
                      code={staticComponent}
                      language="tsx"
                      variant="default"
                      title="// ❌ Static Component"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-bold text-cyan-300">Dynamic Hamlet</h4>
                    <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-6 text-center">
                      <p className="text-cyan-100">Contemplation: "{internalState === 0 ? "To be, or not to be" : "I must be cruel, only to be kind"}"</p>
                      <button
                        onClick={() => setInternalState(prev => prev + 1)}
                        className="mt-4 rounded bg-cyan-700 px-4 py-2 hover:bg-cyan-600"
                      >
                        Realize Truth (setState)
                      </button>
                      <p className="mt-2 text-sm text-cyan-400/70">
                        State updates: {internalState}
                      </p>
                    </div>
                    <CodeBlock
                      code={statefulComponent}
                      language="tsx"
                      variant="success"
                      title="// ✅ Stateful Component"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 1: Stale Closure Bug */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div className={`rounded p-4 ${demoMode === 'broken' ? 'bg-red-950/40 border border-red-700/50' : 'bg-cyan-950/40 border border-cyan-700/50'}`}>
                      <div className="text-center">
                        <div className="text-sm font-bold">
                          {demoMode === 'broken' ? '❌ Stale Hamlet' : '✅ Fixed Hamlet'}
                        </div>
                        <div className="mt-2 font-mono text-2xl">
                          {demoMode === 'broken' ? '🤯' : '🧠'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded bg-slate-800/30 p-4">
                      <div className="text-center">
                        <div className="text-sm font-bold text-slate-400">Ophelia</div>
                        <div className="mt-2 text-2xl">
                          {opheliaTriggered ? '🎭' : '🌸'}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={triggerOpheliaBug}
                    disabled={isPlaying}
                    className={`w-full rounded px-4 py-3 font-bold transition-colors ${isPlaying ? 'bg-slate-800 cursor-not-allowed' : 'bg-red-700 hover:bg-red-600'}`}
                  >
                    {isPlaying ? 'Processing...' : 'Meet Ophelia (Trigger Bug)'}
                  </button>
                  
                  <div className="mt-4 text-sm text-slate-400">
                    {demoMode === 'broken' 
                      ? 'This demo simulates a stale closure bug. The timer captures old state values, causing incorrect updates.'
                      : 'Fixed version uses functional updates (prev => prev + 1) to always get latest state.'}
                  </div>
                </div>
                
                <CodeComparison
                  badCode={staleClosureBug}
                  goodCode={fixedClosure}
                  language="tsx"
                  themeColor="cyan"
                  badLabel="❌ Stale Closure Bug"
                  goodLabel="✅ Functional Update Fix"
                  badExplanation="setTimeout captures old indecision value, causing buggy increments"
                  goodExplanation="Functional update (prev => prev + 1) always uses latest state"
                />
              </div>
            )}

            {/* Chapter 2: Correct State Update */}
            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
                  <div className="mb-4 text-center">
                    <div className="inline-block rounded-full bg-slate-800 p-4">
                      <div className="text-4xl">🎭</div>
                    </div>
                    <div className="mt-4 text-lg font-bold">The Mousetrap Play</div>
                    <div className="mt-2 text-slate-400">Watch King Claudius's reaction</div>
                  </div>
                  
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="rounded bg-slate-800/30 p-4 text-center">
                      <div className="text-xs text-slate-500">Before</div>
                      <div className={`mt-2 text-2xl ${certainty === 'low' ? 'text-amber-400' : 'text-slate-500'}`}>
                        {certainty === 'low' ? '🤔' : '✅'}
                      </div>
                      <div className="mt-1 text-sm">Suspicion</div>
                    </div>
                    
                    <div className="rounded bg-cyan-950/30 p-4 text-center">
                      <div className="text-xs text-cyan-400">After</div>
                      <div className={`mt-2 text-2xl ${certainty === 'absolute' ? 'text-cyan-400' : 'text-slate-500'}`}>
                        {certainty === 'absolute' ? '🎯' : '❓'}
                      </div>
                      <div className="mt-1 text-sm">Certainty</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={triggerMousetrap}
                    disabled={certainty === 'absolute'}
                    className={`w-full rounded px-4 py-3 font-bold transition-colors ${certainty === 'absolute' ? 'bg-slate-800 cursor-not-allowed' : 'bg-cyan-700 hover:bg-cyan-600'}`}
                  >
                    {certainty === 'absolute' ? 'Clarity Achieved' : 'Observe Guilt (Trigger setState)'}
                  </button>
                  
                  {certainty === 'absolute' && (
                    <div className="mt-4 animate-pulse rounded border border-cyan-500/50 bg-cyan-950/30 p-4 text-center">
                      <div className="font-bold text-cyan-300">Re-render Triggered!</div>
                      <div className="mt-1 text-sm text-cyan-200/70">
                        New action: "I'll take the ghost's word for a thousand pound"
                      </div>
                    </div>
                  )}
                </div>
                
                <CodeBlock
                  code={`// Hamlet's Internal State Update
const [certainty, setCertainty] = useState<'low' | 'absolute'>('low');

const observeGuilt = () => {
  // Internal setState call
  setCertainty('absolute');
  // ↑ This automatically triggers a re-render
  // ↓ New behavior appears in UI
  console.log("Now I'll confront my mother");
};`}
                  language="tsx"
                  variant="success"
                  title="// ✅ State Update → Re-render"
                />
              </div>
            )}

            {/* Chapter 3: Passive vs Active */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
                      <h4 className="mb-4 text-center font-bold text-slate-400">Passive State</h4>
                      <div className="mb-4 text-center text-4xl">👻</div>
                      <p className="mb-4 text-center text-sm text-slate-400">
                        Ghost's tale floods Hamlet
                      </p>
                      <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div 
                          className="h-full bg-slate-500 transition-all duration-500"
                          style={{ width: `${Math.min(passiveState, 100)}%` }}
                        ></div>
                      </div>
                      <button
                        onClick={() => setPassiveState(100)}
                        className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                      >
                        Receive Prop (Trauma +100)
                      </button>
                      <div className="mt-4 text-center text-xs text-slate-500">
                        Result: Paralysis, feigned madness
                      </div>
                    </div>
                    <CodeBlock
                      code={passiveStateCode}
                      language="tsx"
                      variant="error"
                      title="// ❌ Passive State Suffering"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-6">
                      <h4 className="mb-4 text-center font-bold text-cyan-300">Active State</h4>
                      <div className="mb-4 text-center text-4xl">⚔️</div>
                      <p className="mb-4 text-center text-sm text-cyan-400/70">
                        Hamlet processes and decides
                      </p>
                      <div className="mb-4 h-2 overflow-hidden rounded-full bg-cyan-900/50">
                        <div 
                          className="h-full bg-cyan-500 transition-all duration-500"
                          style={{ width: `${Math.min(activeState, 100)}%` }}
                        ></div>
                      </div>
                      <button
                        onClick={() => setActiveState(100)}
                        className="w-full rounded bg-cyan-700 px-4 py-2 hover:bg-cyan-600"
                      >
                        Process Event (Resolve +100)
                      </button>
                      <div className="mt-4 text-center text-xs text-cyan-400/70">
                        Result: Decisive action, purpose
                      </div>
                    </div>
                    <CodeBlock
                      code={activeStateCode}
                      language="tsx"
                      variant="success"
                      title="// ✅ Active State Management"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 4: Summary */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-cyan-500/20 bg-gradient-to-br from-slate-900/50 to-cyan-950/20 p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 text-6xl">💀</div>
                    <div className="mb-4 text-2xl font-bold text-cyan-100">
                      Yorick's Skull Revisited
                    </div>
                    <div className="mb-6 max-w-md text-slate-300">
                      The skull's weight is no longer a burden—it's the heft of potential.
                      Your component's <span className="font-bold text-cyan-300">internal state</span> is its engine.
                    </div>
                    
                    <div className="grid w-full max-w-sm grid-cols-3 gap-4">
                      <div className="rounded bg-slate-800/30 p-4 text-center">
                        <div className="text-2xl">🤔</div>
                        <div className="mt-2 text-xs text-slate-400">State: Indecision</div>
                      </div>
                      <div className="rounded bg-cyan-950/30 p-4 text-center">
                        <div className="text-2xl">🎯</div>
                        <div className="mt-2 text-xs text-cyan-400">State: Certainty</div>
                      </div>
                      <div className="rounded bg-amber-950/30 p-4 text-center">
                        <div className="text-2xl">⚔️</div>
                        <div className="mt-2 text-xs text-amber-400">State: Action</div>
                      </div>
                    </div>
                    
                    <div className="mt-8 max-w-md">
                      <CodeBlock
                        code={`// The Engine of Your Component
function DynamicComponent() {
  // State is your power to change
  const [state, setState] = useState(initialValue);
  
  // State updates trigger re-renders
  const handleEvent = () => {
    setState(newValue); // ← Engine turns
  };
  
  // UI reflects current state
  return <div>{state}</div>; // ← Output changes
}`}
                        language="tsx"
                        variant="success"
                        title="// 🎭 State = Component Engine"
                      />
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
            themeColor="cyan"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}