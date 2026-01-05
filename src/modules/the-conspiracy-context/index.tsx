import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { Swords, Shield, CheckCircle, Quote, Users, Home, Target, MessageSquare, Zap, XCircle } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

// Context for the conspiracy
interface ConspiracyContextType {
  motive: string;
  plan: string;
  signal: string;
  conspirators: string[];
  updateSignal: (newSignal: string) => void;
}

const ConspiracyContext = createContext<ConspiracyContextType | undefined>(undefined);

interface Chapter {
  title: string;
  content: string;
}

export default function TheConspiracyContext(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'context' | 'props'>('context');
  const [accessCount, setAccessCount] = useState<number>(0);
  const [propPassCount, setPropPassCount] = useState<number>(0);
  const [signal, setSignal] = useState<string>('Ready');
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [renderLog, setRenderLog] = useState<string[]>([]);

  // Circuit breaker for prop drilling demo
  useEffect(() => {
    if (propPassCount >= 50) {
      setPropPassCount(0);
      setRenderLog(prev => [...prev, '⚡ Circuit breaker: Too many prop passes!']);
    }
  }, [propPassCount]);

  const contextValue: ConspiracyContextType = {
    motive: 'Liberty for Rome',
    plan: 'Assassinate Caesar',
    signal,
    conspirators: ['Brutus', 'Cassius', 'Casca', 'Decius', 'Metellus'],
    updateSignal: useCallback((newSignal: string) => {
      setSignal(newSignal);
      setAccessCount(prev => prev + 1);
    }, []),
  };

  const chapters: Chapter[] = [
    {
      title: "The Silent Understanding",
      content: "Cassius's dagger gesture communicates everything without words within Brutus's house—the shared conspiracy is already understood. In React, `useContext` provides this instant, implicit data access to any component within the Provider's scope, eliminating verbose prop passing."
    },
    {
      title: "The Poet's Confusion",
      content: "Cinna the poet lacks the conspiracy's context when questioned by the mob. He fails catastrophically, unable to explain motives never passed to him. This illustrates **prop drilling**: manually passing data through components is fragile, error-prone, and inefficient."
    },
    {
      title: "The Orchard Oath",
      content: "Brutus declares the conspiracy's motive in the orchard: \"If these be motives weak, break off betimes.\" He establishes the shared context for all present. This is `createContext` and `Provider`—defining the data value and making it available to the entire component subtree."
    },
    {
      title: "Inside the Light, Outside the Dark",
      content: "**Inside**: Ligarius instantly understands Brutus's cryptic message—direct context access. **Outside**: Antony must laboriously rebuild understanding for the crowd—manual prop drilling. `useContext` provides efficient data access; prop drilling requires verbose, explicit passing."
    },
    {
      title: "The Synchronized Blow",
      content: "The conspirators strike as one on an unspoken signal—shared context enabling perfect coordination. In React, multiple components can act on the same context value, triggering synchronized updates without prop chains. The shared state update is immediate and consistent."
    }
  ];

  // Demo components
  const ConspiratorWithContext: React.FC<{ name: string }> = ({ name }) => {
    const ctx = useContext(ConspiracyContext);
    useEffect(() => {
      if (chapter === 0 || chapter === 4) {
        setRenderLog(prev => [...prev, `${name} accessed context`]);
      }
    }, [ctx?.signal, name]);
    return (
      <div className="flex items-center gap-2 rounded bg-amber-950/30 p-3">
        <Users className="h-4 w-4 text-amber-400" />
        <span className="font-medium">{name}</span>
        <span className="text-sm text-amber-300">Knows: "{ctx?.motive}"</span>
      </div>
    );
  };

  const PropDrillingChain: React.FC<{ name: string; motive?: string; plan?: string }> = ({ name, motive, plan }) => {
    useEffect(() => {
      if (chapter === 1 && motive) {
        setPropPassCount(prev => prev + 1);
      }
    }, [motive, plan]);
    
    const hasData = motive && plan;
    return (
      <div className={`flex items-center gap-2 rounded p-3 ${hasData ? 'bg-slate-800' : 'bg-red-950/40'}`}>
        <Users className={`h-4 w-4 ${hasData ? 'text-slate-400' : 'text-red-400'}`} />
        <span className="font-medium">{name}</span>
        {hasData ? (
          <span className="text-sm text-slate-400">Passing data down...</span>
        ) : (
          <span className="text-sm text-red-400">❌ I lack context!</span>
        )}
      </div>
    );
  };

  // Code examples
  const propDrillingCode = `// ❌ Prop Drilling Anti-Pattern
function App() {
  const [motive, setMotive] = useState('Liberty for Rome');
  
  return (
    <ConspiratorA motive={motive} />
  );
}

function ConspiratorA({ motive }) {
  return <ConspiratorB motive={motive} />;
}

function ConspiratorB({ motive }) {
  return <ConspiratorC motive={motive} />;
}

function ConspiratorC({ motive }) {
  return <div>Motive: {motive}</div>; // Finally used!
}`;

  const useContextCode = `// ✅ useContext Pattern
const ConspiracyContext = createContext();

function App() {
  const [motive, setMotive] = useState('Liberty for Rome');
  
  return (
    <ConspiracyContext.Provider value={motive}>
      <ConspiratorA />
      <ConspiratorB />
      <ConspiratorC />
    </ConspiracyContext.Provider>
  );
}

function ConspiratorC() {
  const motive = useContext(ConspiracyContext); // Direct access!
  return <div>Motive: {motive}</div>;
}`;

  const createContextCode = `// Creating and Providing Context
import { createContext, useState } from 'react';

// 1. Create the context
const ConspiracyContext = createContext();

function App() {
  const [motive, setMotive] = useState('Liberty for Rome');
  
  // 2. Provide the value
  return (
    <ConspiracyContext.Provider value={{ motive, setMotive }}>
      <Conspirator />
    </ConspiracyContext.Provider>
  );
}`;

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-stone-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Swords}
        title="Julius Caesar"
        subtitle="The Conspiracy, 44 BC"
        concept="React Concept: useContext Hook"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ConspiracyContext.Provider value={contextValue}>
          <ModuleLayout
            sidebar={
              <div className="sticky top-24 space-y-6">
                {/* Interactive Controls */}
                <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-200">
                    <Zap className="h-5 w-5" />
                    Demo Controls
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDemoMode('context')}
                        className={`flex-1 rounded px-3 py-2 text-sm transition ${demoMode === 'context' ? 'bg-amber-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                      >
                        useContext
                      </button>
                      <button
                        onClick={() => setDemoMode('props')}
                        className={`flex-1 rounded px-3 py-2 text-sm transition ${demoMode === 'props' ? 'bg-amber-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                      >
                        Prop Drilling
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded bg-slate-800/50 p-2 text-center">
                          <div className="text-xs text-slate-400">Context Accesses</div>
                          <div className="font-mono text-xl text-amber-400">{accessCount}</div>
                        </div>
                        <div className="rounded bg-slate-800/50 p-2 text-center">
                          <div className="text-xs text-slate-400">Prop Passes</div>
                          <div className="font-mono text-xl text-red-400">{propPassCount}</div>
                        </div>
                      </div>
                      
                      {chapter === 4 && (
                        <button
                          onClick={() => {
                            contextValue.updateSignal('Strike Now!');
                            setIsActivated(true);
                          }}
                          className="w-full rounded bg-amber-700 px-4 py-2 font-medium hover:bg-amber-600"
                        >
                          Send Signal
                        </button>
                      )}
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
                      <span className="text-sm text-slate-400">Brutus's House/Orchard</span>
                      <span className="text-sm font-medium">Context.Provider</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">The Conspirators</span>
                      <span className="text-sm font-medium">useContext() Components</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Shared Purpose & Plan</span>
                      <span className="text-sm font-medium">Context Value</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Cassius's Silent Gesture</span>
                      <span className="text-sm font-medium">Instant Context Access</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Cinna the Poet</span>
                      <span className="text-sm font-medium">Component Without Context</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Brutus's Motive Speech</span>
                      <span className="text-sm font-medium">Creating Context Value</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Ligarius's Understanding</span>
                      <span className="text-sm font-medium">Nested Component Access</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Antony's Oration</span>
                      <span className="text-sm font-medium">Manual Prop Drilling</span>
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
                    {chapter === 0 && "useContext provides implicit, instant data access—like conspirators understanding without words. No props needed within the Provider's scope."}
                    {chapter === 1 && "Prop drilling is fragile: data gets lost or corrupted through manual passing. Components without proper context fail catastrophically."}
                    {chapter === 2 && "CreateContext defines shared data; Provider makes it available. This establishes the 'orchard' where all children can access the context."}
                    {chapter === 3 && "Inside context: instant access. Outside: verbose prop drilling. useContext eliminates intermediate components passing data they don't use."}
                    {chapter === 4 && "Multiple components can act on the same context value simultaneously, enabling coordinated updates without complex event chains."}
                  </p>
                </div>

                {/* Quote Card */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                  <p className="text-sm italic text-slate-400">
                    {chapter === 0 && '"No words were needed. The gesture said everything."'}
                    {chapter === 1 && '"I lack the context!"'}
                    {chapter === 2 && '"If these be motives weak, break off betimes."'}
                    {chapter === 3 && '"A piece of work that will make sick men whole."'}
                    {chapter === 4 && '"Liberty! Freedom! Tyranny is dead!"'}
                  </p>
                  <p className="mt-2 text-right text-xs text-slate-500">
                    — {chapter === 0 ? 'Cassius' : chapter === 1 ? 'Cinna' : chapter === 2 ? 'Brutus' : chapter === 3 ? 'Brutus' : 'Conspirators'}
                  </p>
                </div>
              </div>
            }
          >
            {/* Chapter Content */}
            <div className="prose prose-invert prose-lg mb-8 max-w-none">
              <h2 className="mb-4 text-3xl font-bold text-amber-100">
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

              {/* Chapter 0: Silent Understanding */}
              {chapter === 0 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-amber-500/30 bg-slate-900/60 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-bold text-amber-300">The Conspirators' Access</h4>
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-amber-400" />
                        <span className="text-sm text-amber-300">Within Provider Scope</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {contextValue.conspirators.slice(0, 4).map(name => (
                        <ConspiratorWithContext key={name} name={name} />
                      ))}
                    </div>
                    <div className="mt-4 text-center text-sm text-slate-400">
                      Each conspirator instantly knows the motive: "{contextValue.motive}"
                    </div>
                  </div>
                  
                  <CodeBlock
                    code={`// Conspirator Component with useContext
function Conspirator({ name }) {
  // Direct access - no props needed!
  const { motive } = useContext(ConspiracyContext);
  
  return (
    <div>
      <strong>{name}</strong> knows: "{motive}"
    </div>
  );
}`}
                    language="tsx"
                    variant="success"
                    title="// ✅ Instant Context Access"
                    defaultExpanded={true}
                  />
                </div>
              )}

              {/* Chapter 1: Poet's Confusion */}
              {chapter === 1 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-red-500/30 bg-slate-900/60 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-bold text-red-300">Prop Drilling Chain</h4>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-red-400">Prop Passes: {propPassCount}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <PropDrillingChain name="Brutus" motive={contextValue.motive} plan={contextValue.plan} />
                      <PropDrillingChain name="Cassius" motive={contextValue.motive} plan={contextValue.plan} />
                      <PropDrillingChain name="Casca" motive={contextValue.motive} />
                      <PropDrillingChain name="Cinna" />
                    </div>
                    <div className="mt-4 rounded bg-red-950/40 p-3 text-center text-sm text-red-300">
                      ❌ Cinna lacks context! The data chain broke at Casca.
                    </div>
                  </div>
                  
                  <CodeComparison
                    badCode={propDrillingCode}
                    goodCode={useContextCode}
                    language="tsx"
                    themeColor="amber"
                    badLabel="❌ Prop Drilling Anti-Pattern"
                    goodLabel="✅ useContext Solution"
                    badExplanation="Data must be manually passed through components that don't use it. Breaks easily and causes unnecessary re-renders."
                    goodExplanation="Components directly access shared data without intermediate props. Clean, efficient, and maintainable."
                  />
                </div>
              )}

              {/* Chapter 2: Orchard Oath */}
              {chapter === 2 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-amber-500/30 bg-slate-900/60 p-4">
                    <div className="mb-4 text-center">
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-900/50 px-4 py-2">
                        <Target className="h-4 w-4 text-amber-400" />
                        <span className="font-bold text-amber-300">Context Value Defined</span>
                      </div>
                      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded bg-slate-800/50 p-3 text-center">
                          <div className="text-xs text-slate-400">Motive</div>
                          <div className="font-medium text-amber-300">{contextValue.motive}</div>
                        </div>
                        <div className="rounded bg-slate-800/50 p-3 text-center">
                          <div className="text-xs text-slate-400">Plan</div>
                          <div className="font-medium text-amber-300">{contextValue.plan}</div>
                        </div>
                        <div className="rounded bg-slate-800/50 p-3 text-center">
                          <div className="text-xs text-slate-400">Conspirators</div>
                          <div className="font-medium text-amber-300">{contextValue.conspirators.length}</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm text-slate-400">
                      This context value is now available to all components in the Provider tree
                    </div>
                  </div>
                  
                  <CodeBlock
                    code={createContextCode}
                    language="tsx"
                    variant="success"
                    title="// ✅ Creating and Providing Context"
                    defaultExpanded={true}
                  />
                </div>
              )}

              {/* Chapter 3: Inside vs Outside */}
              {chapter === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Inside Context */}
                    <div className="rounded-lg border border-amber-500/30 bg-slate-900/60 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-bold text-amber-300">Inside the Context</h4>
                        <div className="rounded-full bg-amber-900/50 px-3 py-1 text-xs text-amber-300">
                          useContext
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded bg-amber-950/30 p-3 text-center">
                          <div className="font-medium">Ligarius understands instantly</div>
                          <div className="mt-1 text-sm text-amber-300">
                            Access count: {accessCount}
                          </div>
                        </div>
                        <button
                          onClick={() => contextValue.updateSignal('New signal')}
                          className="w-full rounded bg-amber-700 px-4 py-2 hover:bg-amber-600"
                        >
                          Update Context
                        </button>
                      </div>
                    </div>
                    
                    {/* Outside Context */}
                    <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="font-bold text-slate-400">Outside the Context</h4>
                        <div className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                          Prop Drilling
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <div className="rounded bg-slate-800/50 p-2 text-center text-sm">
                            Antony explains motive...
                          </div>
                          <div className="rounded bg-slate-800/50 p-2 text-center text-sm">
                            ...then explains plan...
                          </div>
                          <div className="rounded bg-slate-800/50 p-2 text-center text-sm">
                            ...then explains each conspirator...
                          </div>
                        </div>
                        <button
                          onClick={() => setPropPassCount(prev => prev + 3)}
                          className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                        >
                          Manually Pass Props
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xs text-slate-400">Context Updates</div>
                        <div className="font-mono text-2xl text-amber-400">{accessCount}</div>
                        <div className="text-xs text-amber-400">Instant propagation</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-400">Prop Passes</div>
                        <div className="font-mono text-2xl text-slate-400">{propPassCount}</div>
                        <div className="text-xs text-slate-400">Manual, sequential</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Chapter 4: Synchronized Action */}
              {chapter === 4 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-amber-500/30 bg-slate-900/60 p-4">
                    <div className="mb-4 text-center">
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-900/50 px-4 py-2">
                        <MessageSquare className="h-4 w-4 text-amber-400" />
                        <span className="font-bold text-amber-300">Current Signal: {signal}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                      {contextValue.conspirators.map(name => (
                        <div key={name} className={`rounded p-3 text-center transition ${isActivated ? 'bg-red-900/60' : 'bg-slate-800/60'}`}>
                          <div className="font-medium">{name}</div>
                          <div className={`mt-1 text-sm ${isActivated ? 'text-red-300' : 'text-slate-400'}`}>
                            {isActivated ? 'Acting!' : 'Waiting...'}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 text-center text-sm text-slate-400">
                      When the signal updates via context, all conspirators receive it simultaneously and act in unison.
                    </div>
                  </div>
                  
                  <CodeBlock
                    code={`// Multiple components responding to context
function Conspirator({ name }) {
  const { signal } = useContext(ConspiracyContext);
  
  return (
    <div className={signal === 'Strike Now!' ? 'active' : 'inactive'}>
      {name}: {signal === 'Strike Now!' ? 'Acting!' : 'Waiting...'}
    </div>
  );
}

// One update triggers all
<ConspiracyContext.Provider value={{ signal, updateSignal }}>
  <Conspirator name="Brutus" />
  <Conspirator name="Cassius" />
  <Conspirator name="Casca" />
</ConspiracyContext.Provider>`}
                    language="tsx"
                    variant="success"
                    title="// ✅ Coordinated Updates via Shared Context"
                    defaultExpanded={true}
                  />
                </div>
              )}
              
              {/* Reset button for demos */}
              {(chapter === 1 || chapter === 4) && (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => {
                      setAccessCount(0);
                      setPropPassCount(0);
                      setSignal('Ready');
                      setIsActivated(false);
                      setRenderLog([]);
                    }}
                    className="rounded bg-slate-800 px-6 py-2 hover:bg-slate-700"
                  >
                    Reset All Demos
                  </button>
                </div>
              )}
            </section>

            {/* Chapter Navigation */}
            <ChapterNavigation
              currentChapter={chapter}
              totalChapters={chapters.length}
              onChapterChange={setChapter}
              themeColor="amber"
            />
          </ModuleLayout>
        </ConspiracyContext.Provider>
      </main>
    </div>
  );
}