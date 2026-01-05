import { useState, useEffect, useRef } from "react";
import { Brain, Shield, CheckCircle, MessageSquare } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function StrictModeHamletAdvice(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [isStrictMode, setIsStrictMode] = useState<boolean>(true);
  const [sideEffectCount, setSideEffectCount] = useState<number>(0);
  const [invocationCount, setInvocationCount] = useState<number>(0);
  const [demoTriggered, setDemoTriggered] = useState<boolean>(false);
  const [renderCount, setRenderCount] = useState<number>(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Circuit breaker for side effects
  useEffect(() => {
    if (sideEffectCount >= 50) {
      alert("Safety limit reached! Too many side effects. Resetting demo.");
      resetDemo();
    }
  }, [sideEffectCount]);

  const triggerSideEffect = (): void => {
    if (!isStrictMode) {
      // Simulate bad side effect
      setSideEffectCount(prev => prev + 1);
      setRenderCount(prev => prev + 1); // Unnecessary render
      
      // Simulate state mutation during render (anti-pattern)
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setRenderCount(prev => prev + 1);
      }, 100);
    } else {
      // With Strict Mode - controlled side effect
      setInvocationCount(prev => prev + 2); // Double invocation
      setDemoTriggered(true);
      setTimeout(() => setDemoTriggered(false), 1000);
    }
  };

  const resetDemo = (): void => {
    setSideEffectCount(0);
    setInvocationCount(0);
    setRenderCount(0);
    setDemoTriggered(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const chapters: Chapter[] = [
    { 
      title: "The Fatherly Wrapper", 
      content: "Polonius's advice wraps Laertes like Strict Mode wraps components. It's a development-only layer that scrutinizes without changing runtime behavior, preparing for production." 
    },
    { 
      title: "The Unchecked Component", 
      content: "Without Strict Mode, Laertes's impulsiveness causes chaos in production. Similarly, unchecked components can have side effects and bugs that crash apps when deployed." 
    },
    { 
      title: "The Double Invocation", 
      content: "Polonius repeats advice to reveal deeper consequences. Strict Mode double-invokes functions to detect hidden side effects, ensuring purity by stress-testing logic." 
    },
    { 
      title: "A Tale of Two Departures", 
      content: "With Strict Mode, components depart calmly, avoiding bugs. Without it, they fail catastrophically. The value is in preventing errors, not runtime changes." 
    },
    { 
      title: "To Thine Own Self Be True", 
      content: "\"To thine own self be true\" means building pure, predictable components. Strict Mode ensures consistency for future compatibility, making apps robust." 
    }
  ];

  const antiPatternCode = `// ❌ Without Strict Mode - Side effects go unnoticed
function UncheckedComponent() {
  // Mutating state during render (anti-pattern)
  const [count, setCount] = useState(0);
  
  // Side effect in render
  console.log('Rendering with side effect:', count);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`;

  const correctPatternCode = `// ✅ With Strict Mode - Side effects are detected
import { StrictMode } from 'react';

function CheckedComponent() {
  const [count, setCount] = useState(0);
  
  // Proper side effect in useEffect
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);
  
  return (
    <StrictMode>
      <button onClick={() => setCount(prev => prev + 1)}>
        Count: {count}
      </button>
    </StrictMode>
  );
}`;

  const doubleInvocationCode = `// Strict Mode double-invokes to detect impurities
function Component() {
  console.log('This logs twice in development with StrictMode');
  
  // Functional update ensures purity
  const [value, setValue] = useState(0);
  const increment = () => setValue(prev => prev + 1);
  
  return <button onClick={increment}>Value: {value}</button>;
}`;

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Brain}
        title="Hamlet"
        subtitle="Polonius's Advice, 1603"
        concept="React Concept: Strict Mode"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 text-lg font-bold">Demo Controls</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Strict Mode</span>
                    <button
                      onClick={() => setIsStrictMode(!isStrictMode)}
                      className={`rounded px-3 py-1 transition-colors ${isStrictMode ? 'bg-amber-600' : 'bg-slate-700'}`}
                    >
                      {isStrictMode ? "✅ Enabled" : "❌ Disabled"}
                    </button>
                  </div>
                  <button
                    onClick={triggerSideEffect}
                    className="w-full rounded bg-amber-500/20 px-4 py-2 hover:bg-amber-500/30"
                  >
                    Trigger Side Effect
                  </button>
                  <button
                    onClick={resetDemo}
                    className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                  >
                    Reset Demo
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded bg-slate-800/30 p-3">
                    <div className="text-xs text-slate-500">Side Effects</div>
                    <div className="font-mono text-xl text-red-400">{sideEffectCount}</div>
                  </div>
                  <div className="rounded bg-slate-800/30 p-3">
                    <div className="text-xs text-slate-500">Invocations</div>
                    <div className="font-mono text-xl text-amber-400">{invocationCount}</div>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Polonius</span>
                    <span className="text-sm font-medium">StrictMode Wrapper</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Laertes</span>
                    <span className="text-sm font-medium">React Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Polonius's Advice</span>
                    <span className="text-sm font-medium">Strict Mode Checks</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Repeated Advice</span>
                    <span className="text-sm font-medium">Double-Invocation</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Laertes's Rage</span>
                    <span className="text-sm font-medium">Side Effects</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Journey to France</span>
                    <span className="text-sm font-medium">Production</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">"To thine own self be true"</span>
                    <span className="text-sm font-medium">Pure Components</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "Strict Mode is a development wrapper that adds checks without changing runtime behavior, like Polonius's advice preparing Laertes."}
                  {chapter === 1 && "Without Strict Mode, side effects can cause unpredictable bugs in production, similar to Laertes's unchecked rage in France."}
                  {chapter === 2 && "Double-invocation stress-tests functions to reveal hidden side effects, just as repeated advice reveals deeper consequences."}
                  {chapter === 3 && "Strict Mode's value is in preventing errors before they reach production, contrasting chaotic failure with calm preparation."}
                  {chapter === 4 && "Building pure, self-consistent components ensures future compatibility, achieving the goal of 'to thine own self be true'."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "This above all: to thine own self be true."
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Polonius, Hamlet
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

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
                  <p className="text-amber-200">Strict Mode wraps components like Polonius's hands on Laertes's shoulders. Enable Strict Mode in controls to see the protective wrapper in action.</p>
                </div>
                <CodeBlock
                  code={`// Wrapping a component in Strict Mode
import { StrictMode } from 'react';

function App() {
  return (
    <StrictMode>
      <YourComponent />
    </StrictMode>
  );
}`}
                  language="tsx"
                  variant="default"
                  title="// The Strict Mode Wrapper"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsStrictMode(false)}
                    className={`rounded px-4 py-2 ${!isStrictMode ? 'bg-red-600' : 'bg-slate-700'}`}
                  >
                    ❌ Without Strict Mode
                  </button>
                  <button
                    onClick={() => setIsStrictMode(true)}
                    className={`rounded px-4 py-2 ${isStrictMode ? 'bg-amber-600' : 'bg-slate-700'}`}
                  >
                    ✅ With Strict Mode
                  </button>
                </div>
                
                {!isStrictMode && (
                  <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                    <p className="text-red-300">⚠️ Side effects accumulating: {sideEffectCount}. Click "Trigger Side Effect" to simulate bugs.</p>
                  </div>
                )}
                
                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={correctPatternCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Without Strict Mode"
                  goodLabel="✅ With Strict Mode"
                  badExplanation="Side effects in render cause unpredictable behavior and memory leaks"
                  goodExplanation="Strict Mode detects side effects, and proper useEffect usage ensures purity"
                />
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
                  <p className="text-amber-200">Click "Trigger Side Effect" with Strict Mode enabled. Notice the invocation count increases by 2, simulating double-invocation.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="rounded bg-slate-800/50 p-4">
                      <div className="text-center font-mono text-3xl text-amber-400">
                        {invocationCount}
                      </div>
                      <div className="text-center text-sm text-slate-500">Function Invocations</div>
                    </div>
                    {demoTriggered && (
                      <div className="animate-pulse rounded bg-amber-500/20 p-3 text-center text-amber-300">
                        Double invocation detected!
                      </div>
                    )}
                  </div>
                  <CodeBlock
                    code={doubleInvocationCode}
                    language="tsx"
                    variant="success"
                    title="// Double-Invocation in Action"
                  />
                </div>
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-red-400">❌ Unchecked Path</h4>
                    <div className="rounded border border-red-500/30 p-4">
                      <p className="text-red-300">Side effects: {sideEffectCount}</p>
                      <p className="text-red-300">Renders: {renderCount}</p>
                      <p className="text-sm text-red-400">Chaotic, unpredictable behavior</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-amber-400">✅ Prepared Path</h4>
                    <div className="rounded border border-amber-500/30 p-4">
                      <p className="text-amber-300">Invocations: {invocationCount}</p>
                      <p className="text-amber-300">Status: {isStrictMode ? "Protected" : "Vulnerable"}</p>
                      <p className="text-sm text-amber-400">Calm, side-effect-aware departure</p>
                    </div>
                  </div>
                </div>
                <CodeComparison
                  badCode={`// Component that fails without Strict Mode
function BuggyComponent() {
  let mutableValue = 0; // Impure mutation
  
  const handleClick = () => {
    mutableValue++; // Side effect
    console.log(mutableValue);
  };
  
  return <button onClick={handleClick}>Click me</button>;
}`}
                  goodCode={`// Component protected by Strict Mode
function RobustComponent() {
  const [value, setValue] = useState(0); // Pure state
  
  const handleClick = () => {
    setValue(prev => prev + 1); // Functional update
  };
  
  return (
    <StrictMode>
      <button onClick={handleClick}>Count: {value}</button>
    </StrictMode>
  );
}`}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Leads to Production Bugs"
                  goodLabel="✅ Prevents Future Errors"
                  badExplanation="Mutable variables and side effects cause hard-to-debug issues"
                  goodExplanation="Pure state and Strict Mode ensure consistent, predictable behavior"
                />
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
                  <p className="text-amber-200">A pure component is 'true to itself'—its output depends only on props and state, with no hidden side effects.</p>
                </div>
                <CodeBlock
                  code={`// A pure component for future compatibility
function PureComponent({ initialCount }: { initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  
  // Pure function - same input always gives same output
  const doubleCount = useMemo(() => count * 2, [count]);
  
  // No side effects in render
  return (
    <div>
      <p>Count: {count}</p>
      <p>Doubled: {doubleCount}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

// Usage with Strict Mode ensures purity
<StrictMode>
  <PureComponent initialCount={0} />
</StrictMode>`}
                  language="tsx"
                  variant="success"
                  title="// Building Pure Components"
                  defaultExpanded={true}
                />
                <div className="rounded bg-slate-800/50 p-4 text-center">
                  <p className="text-amber-300">Strict Mode helps build components that are ready for any future React version.</p>
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