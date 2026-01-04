import { useState, useRef, useEffect } from "react";
import { Skull, Shield, CheckCircle, Quote, Brain, Zap, Target, Anchor, Ghost, Sword, User } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function UseRefHamletYoricksSkull(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  
  // Demo states for various chapters
  const [stateCounter, setStateCounter] = useState<number>(0);
  const refCounter = useRef<number>(0);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [inputText, setInputText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [demoMode, setDemoMode] = useState<'state' | 'ref'>('state');
  const [persistentValue, setPersistentValue] = useState<string>("Initial");
  const persistentRef = useRef<string>("Initial");
  const [showPersisted, setShowPersisted] = useState<boolean>(false);

  // Effect to track renders for demo
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  // Cleanup for any potential intervals (safety)
  useEffect(() => {
    return () => {
      // Cleanup if any timers were used
    };
  }, []);

  const chapters: Chapter[] = [
    { 
      title: "The Gravedigger's Gift", 
      content: "Hamlet picks up Yorick's skull—a persistent object that outlasts the man. Like useRef, it provides a stable reference that survives renders without triggering re-renders. The skull is a mutable ref (.current) you can hold onto."
    },
    { 
      title: "The Ghost That Fades", 
      content: "Using state (emotions) to hold a memory causes it to fade on every re-render. The reference is unstable, like a ghost that vanishes when needed. State changes trigger re-renders, resetting values inefficiently."
    },
    { 
      title: "This Bone Does Not Change", 
      content: "The skull remains unchanged despite Hamlet's volatile state. useRef creates a mutable ref object (.current) that persists across renders without causing re-renders. It's a container for values that must endure."
    },
    { 
      title: "A Fixed Point in a Shifting World", 
      content: "State-based references fail when needed most; ref-based references enable direct manipulation. The skull allows precise measurement (DOM focus), unlike the fading ghost. useRef is for direct access and persistence."
    },
    { 
      title: "That Did Outlast the Man", 
      content: "The skull persists beyond Hamlet's death, ready for new use. useRef objects outlive component lifecycle, providing enduring references. They survive re-renders and can be passed between components."
    }
  ];

  // Code examples as template literals
  const introCode = `import { useRef } from 'react';

function HamletComponent() {
  const skullRef = useRef<HTMLDivElement>(null); // For DOM element
  const memoryRef = useRef<string>("Yorick");    // For persistent value
  
  // Access the ref value
  console.log(skullRef.current); // null initially, then DOM node
  console.log(memoryRef.current); // "Yorick" - persists across renders
  
  return <div ref={skullRef}>Skull element</div>;
}`;

  const antiPatternCode = `// ❌ Using state for persistent reference
function GhostComponent() {
  const [memory, setMemory] = useState("Ghost");
  
  const updateMemory = () => {
    setMemory("Faded Ghost"); // Triggers re-render
  };
  
  // Each update causes re-render, inefficient if only storing
  return <button onClick={updateMemory}>{memory}</button>;
}`;

  const correctPatternCode = `// ✅ Using useRef for persistent reference
function SkullComponent() {
  const memoryRef = useRef("Yorick");
  
  const updateMemory = () => {
    memoryRef.current = "Persistent Yorick"; // No re-render
    // Access updated value immediately
    console.log(memoryRef.current);
  };
  
  // UI doesn't update automatically, ref persists
  return <button onClick={updateMemory}>Update Ref</button>;
}`;

  const persistenceCode = `// Ref persists across renders
function PersistentComponent() {
  const renderCount = useRef(0);
  
  // Increment on each render without causing infinite loop
  renderCount.current += 1;
  
  return (
    <div>
      Renders: {renderCount.current} {/* Warning: doesn't update UI */}
    </div>
  );
}`;

  const domFocusCode = `// Direct DOM manipulation with useRef
function InputFocusComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleClick = () => {
    // Direct access to DOM element
    inputRef.current?.focus(); // Imperative command
  };
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}`;

  const lifecycleCode = `// Ref persists through component lifecycle
function ParentComponent() {
  const sharedRef = useRef("Shared Value");
  
  return (
    <div>
      <ChildComponent ref={sharedRef} />
      <button onClick={() => console.log(sharedRef.current)}>
        Log Ref Value
      </button>
    </div>
  );
}

function ChildComponent({ ref }: { ref: React.RefObject<string> }) {
  // Child can access and modify the same ref
  ref.current = "Modified by Child";
  return null;
}`;

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Skull}
        title="Hamlet"
        subtitle="Yorick's Skull, 1600"
        concept="React Concept: useRef Hook"
        themeColor="cyan"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls for chapters 3-4 */}
              {(chapter === 3 || chapter === 4) && (
                <div className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-4">
                  <h3 className="mb-4 text-lg font-bold">Demo Controls</h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDemoMode('state')}
                        className={`flex-1 rounded px-3 py-2 transition-colors ${demoMode === 'state' ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                      >
                        State Mode
                      </button>
                      <button
                        onClick={() => setDemoMode('ref')}
                        className={`flex-1 rounded px-3 py-2 transition-colors ${demoMode === 'ref' ? 'bg-cyan-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                      >
                        Ref Mode
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Renders</div>
                        <div className="font-mono text-xl">{renderCount}</div>
                      </div>
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Mode</div>
                        <div className={`font-mono text-sm ${demoMode === 'state' ? 'text-red-400' : 'text-cyan-400'}`}>
                          {demoMode.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setStateCounter(0);
                        refCounter.current = 0;
                        setInputText("");
                        setIsInputFocused(false);
                        setPersistentValue("Initial");
                        persistentRef.current = "Initial";
                        setShowPersisted(false);
                      }}
                      className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                    >
                      Reset All Demos
                    </button>
                  </div>
                </div>
              )}

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hamlet</span>
                    <span className="text-sm font-medium">Functional Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Yorick's Skull</span>
                    <span className="text-sm font-medium">useRef object (.current)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Holding the Skull</span>
                    <span className="text-sm font-medium">Calling useRef Hook</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Memory of Yorick</span>
                    <span className="text-sm font-medium">Value in ref.current</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hamlet's Emotions</span>
                    <span className="text-sm font-medium">Component State</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Testing Rapier Balance</span>
                    <span className="text-sm font-medium">Direct DOM Manipulation</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-sm text-slate-400">Skull After Death</span>
                    <span className="text-sm font-medium">Ref Persistence</span>
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
                  {chapter === 0 && "useRef provides a mutable ref object (.current) that persists across renders without triggering re-renders, like a skull that outlives its owner."}
                  {chapter === 1 && "Using state for values that don't need UI updates causes unnecessary re-renders—inefficient and unstable for persistent references."}
                  {chapter === 2 && "Ref values survive renders independently; changing .current doesn't cause re-renders, making them ideal for storing mutable data."}
                  {chapter === 3 && "useRef enables direct DOM access (e.g., focus, measurements) that state cannot handle—imperative commands need stable references."}
                  {chapter === 4 && "Refs outlive component instances and can be shared between components, providing enduring references across your app."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && '"Alas, poor Yorick! I knew him, Horatio..."'}
                  {chapter === 1 && '"The memory slips through my mind like sand."'}
                  {chapter === 2 && '"This bone does not change."'}
                  {chapter === 3 && '"A fixed point in a shifting world."'}
                  {chapter === 4 && '"The skull endured."'}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — William Shakespeare, Hamlet
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-cyan-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-cyan-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-cyan-500"></div>
              <h3 className="text-xl font-bold text-cyan-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter 0 Demo: Simple useRef */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <CodeBlock
                      code={introCode}
                      language="tsx"
                      variant="default"
                      title="// useRef Basics: Storing Persistent Values"
                      defaultExpanded={true}
                    />
                  </div>
                  <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Brain className="h-5 w-5 text-cyan-400" />
                      <h4 className="font-bold">Ref in Action</h4>
                    </div>
                    <p className="mb-4 text-sm text-slate-400">
                      The ref stores "Yorick" across renders. Try interacting—it persists.
                    </p>
                    <div className="space-y-4">
                      <div className="rounded bg-slate-900/60 p-4">
                        <div className="text-xs text-slate-500">Current Ref Value</div>
                        <div className="font-mono text-lg">"Yorick"</div>
                      </div>
                      <button
                        className="rounded bg-cyan-700 px-4 py-2 hover:bg-cyan-600"
                        onClick={() => alert('Ref value persists: ' + introCode.includes('useRef'))}
                      >
                        Simulate Access
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 1 Demo: Anti-pattern vs Correct */}
            {chapter === 1 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={correctPatternCode}
                  language="tsx"
                  themeColor="cyan"
                  badLabel="❌ State for Persistent Reference"
                  goodLabel="✅ useRef for Persistent Reference"
                  badExplanation="State changes trigger re-renders—inefficient for storing values that don't need UI updates."
                  goodExplanation="useRef persists values across renders without causing re-renders—optimal for mutable references."
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
                    <h4 className="mb-4 font-bold text-red-300">State Demo (Inefficient)</h4>
                    <div className="space-y-4">
                      <div className="rounded bg-slate-900/60 p-4">
                        <div className="text-xs text-slate-500">Counter Value</div>
                        <div className="font-mono text-2xl">{stateCounter}</div>
                      </div>
                      <button
                        onClick={() => setStateCounter(prev => prev + 1)}
                        className="w-full rounded bg-red-700 px-4 py-2 hover:bg-red-600"
                      >
                        Increment (Triggers Re-render)
                      </button>
                      <div className="text-sm text-red-400">
                        Each click causes a re-render → render count: {renderCount}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-6">
                    <h4 className="mb-4 font-bold text-cyan-300">Ref Demo (Efficient)</h4>
                    <div className="space-y-4">
                      <div className="rounded bg-slate-900/60 p-4">
                        <div className="text-xs text-slate-500">Ref Value (Not Auto-Updated)</div>
                        <div className="font-mono text-2xl">{refCounter.current}</div>
                      </div>
                      <button
                        onClick={() => {
                          refCounter.current += 1;
                          alert(`Ref value updated to: ${refCounter.current}. No re-render triggered.`);
                        }}
                        className="w-full rounded bg-cyan-700 px-4 py-2 hover:bg-cyan-600"
                      >
                        Increment (No Re-render)
                      </button>
                      <div className="text-sm text-cyan-400">
                        Click doesn't update UI automatically → render count: {renderCount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 2 Demo: Ref Persistence */}
            {chapter === 2 && (
              <div className="space-y-6">
                <CodeBlock
                  code={persistenceCode}
                  language="tsx"
                  variant="success"
                  title="// Ref Persistence Across Renders"
                  defaultExpanded={true}
                />
                <div className="rounded-lg border border-cyan-500/30 bg-slate-900/60 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <Anchor className="h-5 w-5 text-cyan-400" />
                    <h4 className="font-bold">Ref Value Persists</h4>
                  </div>
                  <p className="mb-4 text-sm text-slate-400">
                    The ref increments on each render but doesn't cause re-renders. Click buttons to see persistence.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="rounded bg-slate-800/40 p-4">
                        <div className="text-xs text-slate-500">Ref Value (Manual Check)</div>
                        <div className="font-mono text-2xl">{refCounter.current}</div>
                      </div>
                      <button
                        onClick={() => {
                          refCounter.current += 1;
                          alert(`Ref incremented to: ${refCounter.current}. Try navigating chapters to see it persists.`);
                        }}
                        className="w-full rounded bg-cyan-700 px-4 py-2 hover:bg-cyan-600"
                      >
                        Increment Ref
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded bg-slate-800/40 p-4">
                        <div className="text-xs text-slate-500">Total Renders</div>
                        <div className="font-mono text-2xl">{renderCount}</div>
                      </div>
                      <button
                        onClick={() => setRenderCount(0)}
                        className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                      >
                        Reset Render Count
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-cyan-300">
                    💡 Ref value survives even after resetting render count—it's stored independently.
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 3 Demo: Direct DOM Manipulation */}
            {chapter === 3 && (
              <div className="space-y-6">
                <CodeBlock
                  code={domFocusCode}
                  language="tsx"
                  variant="success"
                  title="// Direct DOM Access with useRef"
                  defaultExpanded={true}
                />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className={`rounded-lg border p-6 ${demoMode === 'state' ? 'border-red-500/30 bg-red-950/20' : 'border-cyan-500/30 bg-cyan-950/20'}`}>
                    <h4 className="mb-4 font-bold">{demoMode === 'state' ? '❌ Attempt with State' : '✅ Success with Ref'}</h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        ref={demoMode === 'ref' ? inputRef : null}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type something..."
                        className="w-full rounded bg-slate-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <button
                        onClick={() => {
                          if (demoMode === 'state') {
                            setIsInputFocused(true);
                            // State cannot focus input directly
                            alert("State can't focus input directly—need to use ref!");
                          } else {
                            inputRef.current?.focus();
                            setIsInputFocused(true);
                          }
                        }}
                        className={`w-full rounded px-4 py-2 ${demoMode === 'state' ? 'bg-red-700 hover:bg-red-600' : 'bg-cyan-700 hover:bg-cyan-600'}`}
                      >
                        {demoMode === 'state' ? 'Try to Focus (Fails)' : 'Focus Input (Works)'}
                      </button>
                      <div className={`text-sm ${demoMode === 'state' ? 'text-red-400' : 'text-cyan-400'}`}>
                        {demoMode === 'state' 
                          ? "State tracks focus status but can't imperatively focus the element." 
                          : "Ref provides direct DOM access, allowing immediate focus command."}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <Target className="h-5 w-5 text-cyan-400" />
                      <h4 className="font-bold">Demo Metrics</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded bg-slate-800/40 p-3">
                        <div className="text-xs text-slate-500">Input Focused</div>
                        <div className={`font-mono text-lg ${isInputFocused ? 'text-cyan-400' : 'text-slate-500'}`}>
                          {isInputFocused ? 'YES' : 'NO'}
                        </div>
                      </div>
                      <div className="rounded bg-slate-800/40 p-3">
                        <div className="text-xs text-slate-500">Current Mode</div>
                        <div className="font-mono text-lg">{demoMode.toUpperCase()}</div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-slate-400">
                      Switch modes using the sidebar controls to compare state vs ref behavior.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 4 Demo: Ref Lifecycle */}
            {chapter === 4 && (
              <div className="space-y-6">
                <CodeBlock
                  code={lifecycleCode}
                  language="tsx"
                  variant="success"
                  title="// Ref Persistence Across Components"
                  defaultExpanded={true}
                />
                <div className="rounded-lg border border-cyan-500/30 bg-slate-900/60 p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <User className="h-5 w-5 text-cyan-400" />
                    <h4 className="font-bold">Ref Outlives Component</h4>
                  </div>
                  <p className="mb-4 text-sm text-slate-400">
                    The ref value persists even when components unmount or state resets.
                  </p>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="rounded bg-slate-800/40 p-4">
                        <div className="text-xs text-slate-500">State Value</div>
                        <div className="font-mono text-2xl">{persistentValue}</div>
                      </div>
                      <button
                        onClick={() => setPersistentValue("Updated State")}
                        className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                      >
                        Update State
                      </button>
                      <button
                        onClick={() => setPersistentValue("Initial")}
                        className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                      >
                        Reset State
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded bg-slate-800/40 p-4">
                        <div className="text-xs text-slate-500">Ref Value (Persistent)</div>
                        <div className="font-mono text-2xl">
                          {showPersisted ? persistentRef.current : "Hidden"}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          persistentRef.current = "Updated Ref";
                          setShowPersisted(true);
                        }}
                        className="w-full rounded bg-cyan-700 px-4 py-2 hover:bg-cyan-600"
                      >
                        Update Ref
                      </button>
                      <button
                        onClick={() => setShowPersisted(!showPersisted)}
                        className="w-full rounded bg-cyan-700/70 px-4 py-2 hover:bg-cyan-600/70"
                      >
                        {showPersisted ? 'Hide Ref' : 'Show Ref'}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-cyan-300">
                    💡 Ref value remains "Updated Ref" even after resetting state—it survives independently.
                  </div>
                </div>
              </div>
            )}
          </section>

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