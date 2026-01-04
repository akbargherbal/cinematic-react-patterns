import { useState, useEffect, useRef } from "react";
import { ScrollText, Theater, CheckCircle, Shield, AlertCircle, Users } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

interface Mechanical {
  id: string;
  name: string;
  role: string;
  script: string;
  color: string;
}

export default function ComponentsMechanicalsPlay(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'monolithic' | 'modular'>('monolithic');
  const [renderCount, setRenderCount] = useState<number>(0);
  const [isPerformance, setIsPerformance] = useState<boolean>(false);
  const [activeMechanical, setActiveMechanical] = useState<string>('bottom');
  
  const renderCountRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const chapters: Chapter[] = [
    {
      title: "The Scroll in the Hand",
      content: "Quince hands Bottom a scroll defining his role as Pyramus. Like an actor receiving a script, a React component receives props that define its behavior and appearance. Props are inputs that make components reusable and declarative."
    },
    {
      title: "The Tangle of Ambition",
      content: "Bottom tries to play every role, creating a tangled mess. Similarly, a monolithic React component attempting to handle all UI logic becomes unmanageable. This anti-pattern leads to complex state, poor reusability, and debugging nightmares."
    },
    {
      title: "The Director's Decree",
      content: "Quince declares 'One man to one part.' In React, this means breaking UI into focused, single-responsibility components. Modular components are easier to test, maintain, and reuse. Clear boundaries create clean architecture."
    },
    {
      title: "The Wall's Chink",
      content: "When Snout simply announces 'I am the wall,' the story flows. A well-boundaried component renders its specific UI without blocking others. Modular components work independently yet in concert, creating smooth user experiences."
    },
    {
      title: "The Duke's Applause",
      content: "The complete play emerges from well-partitioned parts. A React application is the sum of its components—each playing its specific role. Proper composition creates maintainable, scalable applications that delight users."
    }
  ];

  const mechanicals: Mechanical[] = [
    { id: 'bottom', name: 'Bottom', role: 'Pyramus', script: 'O grim-look\'d night!', color: 'bg-amber-600' },
    { id: 'flute', name: 'Flute', role: 'Thisbe', script: 'Asleep, my love?', color: 'bg-violet-600' },
    { id: 'snug', name: 'Snug', role: 'Lion', script: 'You ladies, you...', color: 'bg-rose-600' },
    { id: 'snout', name: 'Snout', role: 'Wall', script: 'I am the wall.', color: 'bg-stone-600' },
  ];

  const currentMechanical = mechanicals.find(m => m.id === activeMechanical) || mechanicals[0];

  // Monolithic component example (anti-pattern)
  const monolithicCode = `// ❌ Monolithic Component (Tries to do everything)
function PlayAllParts() {
  const [role, setRole] = useState('Pyramus');
  const [script, setScript] = useState('O grim-look'd night!');
  const [isWall, setIsWall] = useState(false);
  const [isLion, setIsLion] = useState(false);

  return (
    <div className="p-4 border border-red-500">
      {role === 'Pyramus' && <p>{script}</p>}
      {isWall && <p>I am the wall.</p>}
      {isLion && <p>Roar!</p>}
      {/* 20 more conditional renders... */}
    </div>
  );
}`;

  // Modular components example (correct pattern)
  const modularCode = `// ✅ Modular Components (Single responsibility)
function Pyramus({ script }: { script: string }) {
  return <p className="text-amber-300">{script}</p>;
}

function Wall() {
  return <p className="text-stone-300">I am the wall.</p>;
}

function Lion() {
  return <p className="text-rose-300">Roar!</p>;
}

// Parent component composes them
function Play() {
  return (
    <div className="p-4 border border-emerald-500">
      <Pyramus script="O grim-look'd night!" />
      <Wall />
      <Lion />
    </div>
  );
}`;

  // Prop passing example
  const propExampleCode = `// Component definition with props
interface ActorProps {
  name: string;
  role: string;
  script: string;
}

function Actor({ name, role, script }: ActorProps) {
  return (
    <div className="p-4 border border-amber-500/30 rounded-lg">
      <h3 className="font-bold">{name} as {role}</h3>
      <p className="mt-2 italic">"{script}"</p>
    </div>
  );
}

// Using the component with different props
function App() {
  return (
    <>
      <Actor name="Bottom" role="Pyramus" script="O grim-look'd night!" />
      <Actor name="Flute" role="Thisbe" script="Asleep, my love?" />
    </>
  );
}`;

  const currentChapter = chapters[chapter];

  // Demo effect for showing render issues
  useEffect(() => {
    if (chapter === 1 && demoMode === 'monolithic') {
      timerRef.current = setInterval(() => {
        renderCountRef.current += 1;
        setRenderCount(renderCountRef.current);
        
        // Circuit breaker
        if (renderCountRef.current >= 50) {
          if (timerRef.current) clearInterval(timerRef.current);
          alert("Safety limit reached! Monolithic component causing excessive renders.");
        }
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      renderCountRef.current = 0;
      setRenderCount(0);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [chapter, demoMode]);

  return (
    <div className="min-h-screen bg-amber-950/30 font-serif text-stone-200">
      <ModuleHeader
        icon={Theater}
        title="A Midsummer Night's Dream"
        subtitle="The Mechanicals' Play, 1595"
        concept="React Concept: Components & Props"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-amber-500/30 bg-stone-900/80 p-4">
                <h3 className="mb-4 text-lg font-bold text-amber-200">Demo Controls</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDemoMode('monolithic')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${
                        demoMode === 'monolithic' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      ❌ Monolithic
                    </button>
                    <button
                      onClick={() => setDemoMode('modular')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${
                        demoMode === 'modular' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      ✅ Modular
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded bg-stone-800/50 p-3">
                      <div className="text-xs text-stone-500">Render Count</div>
                      <div className="font-mono text-xl tabular-nums">
                        {renderCount}
                      </div>
                    </div>
                    <div className="rounded bg-stone-800/50 p-3">
                      <div className="text-xs text-stone-500">Mode</div>
                      <div className={`font-semibold ${
                        demoMode === 'monolithic' ? 'text-red-400' : 'text-emerald-400'
                      }`}>
                        {demoMode === 'monolithic' ? 'TANGLED' : 'CLEAN'}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setRenderCount(0);
                      renderCountRef.current = 0;
                      setIsPerformance(false);
                    }}
                    className="w-full rounded bg-stone-700 px-3 py-2 text-sm hover:bg-stone-600"
                  >
                    Reset Demo
                  </button>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-stone-700 bg-stone-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-200">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Each Mechanical</span>
                    <span className="text-sm font-medium">React Component</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Role/Part</span>
                    <span className="text-sm font-medium">Component Type</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Script & Costume</span>
                    <span className="text-sm font-medium">Props</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Actor Performing</span>
                    <span className="text-sm font-medium">Component Rendering</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">The Play</span>
                    <span className="text-sm font-medium">React Application</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Quince (Director)</span>
                    <span className="text-sm font-medium">Root App Component</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Rehearsal</span>
                    <span className="text-sm font-medium">Render Cycle</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-sm text-stone-400">Performance</span>
                    <span className="text-sm font-medium">Rendered UI</span>
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
                  {chapter === 0 && "Props define components like scrolls define actors. They make components reusable and declarative."}
                  {chapter === 1 && "Monolithic components become tangled messes. They're hard to debug, test, and maintain."}
                  {chapter === 2 && "Single-responsibility components are the foundation of clean React architecture. Each has one job."}
                  {chapter === 3 && "Well-boundaried components don't block each other. They render independently but work together."}
                  {chapter === 4 && "Great applications are composed of small, focused components. The whole emerges from the parts."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-4">
                <p className="text-sm italic text-stone-400">
                  {chapter === 0 && "\"Here is your scroll. Be Pyramus.\""}
                  {chapter === 1 && "\"Let me play all the parts!\""}
                  {chapter === 2 && "\"One man to one part.\""}
                  {chapter === 3 && "\"I am the wall.\""}
                  {chapter === 4 && "\"A play of parts, well parted.\""}
                </p>
                <p className="mt-2 text-right text-xs text-stone-500">
                  {chapter === 0 && "— Peter Quince"}
                  {chapter === 1 && "— Bottom"}
                  {chapter === 2 && "— Peter Quince"}
                  {chapter === 3 && "— Snout as Wall"}
                  {chapter === 4 && "— Theseus"}
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
            <div className="leading-relaxed text-stone-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-amber-500/20 bg-stone-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter 0: Prop Passing */}
            {chapter === 0 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Select an Actor</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {mechanicals.map((mech) => (
                        <button
                          key={mech.id}
                          onClick={() => setActiveMechanical(mech.id)}
                          className={`p-4 rounded-lg border transition-all ${
                            activeMechanical === mech.id
                              ? 'border-amber-500 bg-amber-950/30'
                              : 'border-stone-700 bg-stone-800/30 hover:bg-stone-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-full ${mech.color} flex items-center justify-center`}>
                              <Users className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-left">
                              <div className="font-bold">{mech.name}</div>
                              <div className="text-sm text-stone-400">{mech.role}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Component Rendering</h4>
                    <div className="rounded-lg border border-amber-500/30 bg-stone-900/60 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`h-12 w-12 rounded-full ${currentMechanical.color} flex items-center justify-center`}>
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-bold">{currentMechanical.name}</div>
                          <div className="text-amber-300">as {currentMechanical.role}</div>
                        </div>
                      </div>
                      <div className="border-t border-stone-700 pt-4 mt-4">
                        <div className="text-sm text-stone-400 mb-2">Script (from props):</div>
                        <div className="text-lg italic p-4 bg-stone-800/50 rounded border-l-4 border-amber-500">
                          "{currentMechanical.script}"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CodeBlock
                  code={propExampleCode}
                  language="tsx"
                  variant="default"
                  title="// Component with Props - Reusable and Declarative"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 1: Monolithic Anti-Pattern */}
            {chapter === 1 && (
              <div className="space-y-8">
                <div className={`p-6 rounded-lg border ${
                  demoMode === 'monolithic' 
                    ? 'border-red-500/30 bg-red-950/20' 
                    : 'border-emerald-500/30 bg-emerald-950/20'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-lg">
                      {demoMode === 'monolithic' ? '❌ Monolithic Component' : '✅ Modular Components'}
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${
                        demoMode === 'monolithic' ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                      }`}></div>
                      <span className="text-sm">
                        {demoMode === 'monolithic' ? 'TANGLED STATE' : 'CLEAN ARCHITECTURE'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="h-48 rounded-lg border border-stone-700 bg-stone-900/50 p-4 overflow-auto">
                        {demoMode === 'monolithic' ? (
                          <div className="space-y-3">
                            <div className="p-3 bg-red-900/30 rounded border border-red-500/30">
                              <div className="font-bold text-red-300">Pyramus:</div>
                              <div>"O grim-look'd night!"</div>
                            </div>
                            <div className="p-3 bg-rose-900/30 rounded border border-rose-500/30">
                              <div className="font-bold text-rose-300">Lion:</div>
                              <div>"Roar! You ladies, you..."</div>
                            </div>
                            <div className="p-3 bg-stone-700 rounded border border-stone-600">
                              <div className="font-bold text-stone-300">Wall:</div>
                              <div>"I am the wall."</div>
                            </div>
                            <div className="text-xs text-stone-500 mt-4">
                              All roles tangled in one component...
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="p-3 bg-amber-900/30 rounded border border-amber-500/30">
                              <div className="font-bold text-amber-300">Pyramus Component</div>
                              <div>"O grim-look'd night!"</div>
                            </div>
                            <div className="p-3 bg-rose-900/30 rounded border border-rose-500/30">
                              <div className="font-bold text-rose-300">Lion Component</div>
                              <div>"Roar!"</div>
                            </div>
                            <div className="p-3 bg-stone-700 rounded border border-stone-600">
                              <div className="font-bold text-stone-300">Wall Component</div>
                              <div>"I am the wall."</div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="rounded bg-stone-800/50 p-3 text-center">
                          <div className="text-xs text-stone-500">Components</div>
                          <div className="font-mono text-xl">
                            {demoMode === 'monolithic' ? '1' : '3'}
                          </div>
                        </div>
                        <div className="rounded bg-stone-800/50 p-3 text-center">
                          <div className="text-xs text-stone-500">Lines of Code</div>
                          <div className="font-mono text-xl">
                            {demoMode === 'monolithic' ? '45' : '18'}
                          </div>
                        </div>
                        <div className="rounded bg-stone-800/50 p-3 text-center">
                          <div className="text-xs text-stone-500">Testability</div>
                          <div className={`font-semibold ${
                            demoMode === 'monolithic' ? 'text-red-400' : 'text-emerald-400'
                          }`}>
                            {demoMode === 'monolithic' ? 'Low' : 'High'}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className={`h-48 rounded-lg ${
                        demoMode === 'monolithic' 
                          ? 'bg-red-950/30 border border-red-500/30' 
                          : 'bg-emerald-950/30 border border-emerald-500/30'
                      } p-4`}>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className={`h-5 w-5 ${
                            demoMode === 'monolithic' ? 'text-red-400' : 'text-emerald-400'
                          }`} />
                          <div className="font-bold">
                            {demoMode === 'monolithic' ? 'Issues Detected' : 'Architecture Benefits'}
                          </div>
                        </div>
                        <ul className="space-y-2 text-sm">
                          {demoMode === 'monolithic' ? (
                            <>
                              <li className="flex items-start gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5"></div>
                                <span>Tangled state management</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5"></div>
                                <span>Difficult to debug</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5"></div>
                                <span>Poor reusability</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5"></div>
                                <span>Render performance issues</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-start gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5"></div>
                                <span>Single responsibility</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5"></div>
                                <span>Easy to test</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5"></div>
                                <span>Highly reusable</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5"></div>
                                <span>Optimized renders</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CodeComparison
                  badCode={monolithicCode}
                  goodCode={modularCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Monolithic Anti-Pattern"
                  goodLabel="✅ Modular Pattern"
                  badExplanation="Single component tries to handle everything—difficult to maintain, test, and debug."
                  goodExplanation="Small, focused components with single responsibilities—easy to compose, test, and reuse."
                />
              </div>
            )}

            {/* Chapter 2: Component Breakdown */}
            {chapter === 2 && (
              <div className="space-y-8">
                <div className="rounded-lg border border-amber-500/30 bg-stone-900/60 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-lg">Component Decomposition</h4>
                    <button
                      onClick={() => setIsPerformance(!isPerformance)}
                      className="rounded bg-amber-700 px-4 py-2 hover:bg-amber-600"
                    >
                      {isPerformance ? 'Show Rehearsal' : 'Show Performance'}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mechanicals.map((mech) => (
                      <div 
                        key={mech.id}
                        className={`rounded-lg border p-4 transition-all ${
                          isPerformance
                            ? 'border-emerald-500/30 bg-emerald-950/20'
                            : 'border-amber-500/30 bg-amber-950/20'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`h-10 w-10 rounded-full ${mech.color} flex items-center justify-center`}>
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <div className="font-bold">{mech.name}</div>
                            <div className="text-sm opacity-75">{mech.role}</div>
                          </div>
                        </div>
                        
                        <div className="border-t border-stone-700 pt-3">
                          <div className="text-sm mb-2">Component Output:</div>
                          <div className={`p-3 rounded text-center ${
                            isPerformance 
                              ? 'bg-emerald-900/30 text-emerald-200' 
                              : 'bg-amber-900/30 text-amber-200'
                          }`}>
                            {isPerformance ? (
                              <div className="font-semibold">"{mech.script}"</div>
                            ) : (
                              <div className="text-stone-400">Ready to render...</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-4 text-xs text-stone-500">
                          {isPerformance ? '✅ Rendering successfully' : '⚡ Component mounted'}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-stone-700">
                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-800">
                        <ScrollText className="h-4 w-4" />
                        <span className="font-medium">
                          {isPerformance 
                            ? 'Performance: All components rendering independently' 
                            : 'Rehearsal: Components defined with clear boundaries'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CodeBlock
                  code={`// Component Composition Example
function Play() {
  return (
    <div className="play">
      <Pyramus script="O grim-look'd night!" />
      <Thisbe script="Asleep, my love?" />
      <Wall />
      <Lion />
      <Moonshine />
    </div>
  );
}

// Each component is imported and used once
// Clear boundaries prevent overlap
// Easy to rearrange or replace components`}
                  language="tsx"
                  variant="success"
                  title="// Clean Component Composition"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 3: Flow Comparison */}
            {chapter === 3 && (
              <div className="space-y-8">
                <div className="rounded-lg border border-amber-500/30 bg-stone-900/60 p-6">
                  <h4 className="font-bold text-lg mb-6">UI Flow Comparison</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-red-500"></div>
                        <h5 className="font-bold text-red-300">Blocked Flow (Monolithic)</h5>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-red-500/30"></div>
                        
                        <div className="space-y-6 ml-10">
                          <div className="p-4 rounded-lg border border-red-500/30 bg-red-950/20">
                            <div className="font-bold mb-2">Scene: Pyramus at Wall</div>
                            <div className="text-sm text-red-300">
                              ❌ Wall component blocks Pyramus's path
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg border border-red-500/30 bg-red-950/20 opacity-60">
                            <div className="font-bold mb-2">Scene: Pyramus's Lament</div>
                            <div className="text-sm text-stone-400">
                              Blocked by previous component
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg border border-red-500/30 bg-red-950/20 opacity-40">
                            <div className="font-bold mb-2">Scene: Thisbe's Discovery</div>
                            <div className="text-sm text-stone-500">
                              Never reached
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded bg-red-950/30 border border-red-500/30">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-400" />
                          <span className="text-sm font-medium">Flow interrupted</span>
                        </div>
                        <p className="text-sm text-stone-400 mt-1">
                          One component overstepping breaks the entire sequence
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-emerald-500"></div>
                        <h5 className="font-bold text-emerald-300">Flowing UI (Modular)</h5>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-emerald-500/30"></div>
                        
                        <div className="space-y-6 ml-10">
                          <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-950/20">
                            <div className="font-bold mb-2">Pyramus Component</div>
                            <div className="text-sm text-emerald-300">
                              ✅ Renders: "O grim-look'd night!"
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-950/20">
                            <div className="font-bold mb-2">Wall Component</div>
                            <div className="text-sm text-emerald-300">
                              ✅ Renders: "I am the wall."
                            </div>
                          </div>
                          
                          <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-950/20">
                            <div className="font-bold mb-2">Thisbe Component</div>
                            <div className="text-sm text-emerald-300">
                              ✅ Renders: "Asleep, my love?"
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 rounded bg-emerald-950/30 border border-emerald-500/30">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-emerald-400" />
                          <span className="text-sm font-medium">Smooth progression</span>
                        </div>
                        <p className="text-sm text-stone-400 mt-1">
                          Each component renders independently, creating seamless flow
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CodeBlock
                  code={`// Modular components yield to each other
function Scene() {
  return (
    <>
      {/* Each component renders in sequence */}
      <Pyramus />
      
      {/* Wall doesn't block - it just renders its part */}
      <Wall />
      
      {/* Thisbe renders after Wall finishes */}
      <Thisbe />
    </>
  );
}

// Compare to monolithic approach:
function MonolithicScene() {
  const [step, setStep] = useState(0);
  
  // Manual state management required
  if (step === 0) {
    return <div>Pyramus and Wall tangled...</div>;
  }
  if (step === 1) {
    return <div>Blocked by previous state...</div>;
  }
  // Complex state logic continues...
}`}
                  language="tsx"
                  variant="default"
                  title="// Modular vs Monolithic Flow"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 4: Complete Application */}
            {chapter === 4 && (
              <div className="space-y-8">
                <div className="rounded-lg border border-emerald-500/30 bg-stone-900/60 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-lg">Complete Application</h4>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle className="h-5 w-5" />
                      <span>All components working together</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {mechanicals.map((mech) => (
                        <div 
                          key={mech.id}
                          className="rounded-lg border border-emerald-500/20 bg-emerald-950/10 p-4 text-center"
                        >
                          <div className={`h-12 w-12 rounded-full ${mech.color} flex items-center justify-center mx-auto mb-3`}>
                            <Users className="h-6 w-6 text-white" />
                          </div>
                          <div className="font-bold">{mech.role}</div>
                          <div className="text-sm text-stone-400">{mech.name}</div>
                          <div className="mt-2 text-xs text-emerald-400">✓ Component Active</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="rounded-lg border border-amber-500/30 bg-stone-900 p-4">
                      <div className="text-center mb-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/30 border border-amber-500/30">
                          <Theater className="h-4 w-4" />
                          <span className="font-medium">Play in Progress</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4 max-w-2xl mx-auto">
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-stone-800/50">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center">
                              <span className="font-bold">B</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-amber-300">Pyramus (Bottom)</div>
                            <div className="italic mt-1">"O grim-look'd night! O night with hue so black!"</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-stone-800/50 ml-8">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-stone-600 flex items-center justify-center">
                              <span className="font-bold">S</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-stone-300">Wall (Snout)</div>
                            <div className="italic mt-1">"I am the wall. Through this chink, Pyramus and Thisbe whisper."</div>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 rounded-lg bg-stone-800/50">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-violet-600 flex items-center justify-center">
                              <span className="font-bold">F</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-violet-300">Thisbe (Flute)</div>
                            <div className="italic mt-1">"Asleep, my love? What, dead, my dove?"</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-stone-700 text-center">
                        <div className="inline-flex items-center gap-2 text-emerald-400">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Application running smoothly</span>
                        </div>
                        <p className="text-sm text-stone-400 mt-2">
                          All components rendering their parts in harmony
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CodeBlock
                  code={`// The complete application composed of modular components
function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-white p-8">
      <Header title="Pyramus and Thisbe" />
      
      <main className="max-w-4xl mx-auto">
        <Scene1>
          <Pyramus script="O night with hue so black!" />
          <Wall />
          <Thisbe script="O Pyramus, arise!" />
        </Scene1>
        
        <Scene2>
          <Lion />
          <Moonshine />
          <Pyramus script="Thus die I, thus, thus, thus." />
        </Scene2>
        
        <Scene3>
          <Thisbe script="Asleep, my love? What, dead, my dove?" />
          <Narrator text="And so the lovers meet their end." />
        </Scene3>
      </main>
      
      <Footer />
    </div>
  );
}

// Each component is:
// 1. Self-contained with clear responsibility
// 2. Reusable in different contexts
// 3. Easy to test and maintain
// 4. Composable with other components`}
                  language="tsx"
                  variant="success"
                  title="// Complete React Application Architecture"
                  defaultExpanded={true}
                />
              </div>
            )}
          </section>

          {/* Navigation */}
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