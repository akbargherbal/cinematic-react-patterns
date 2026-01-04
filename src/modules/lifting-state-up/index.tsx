import { useState, useEffect, useRef } from "react";
import { Heart, Shield, CheckCircle, MessageSquare } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function LiftingStateUp(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  
  // Demo state
  const [romeoLove, setRomeoLove] = useState<string>("I love Juliet");
  const [julietLove, setJulietLove] = useState<string>("I love Romeo");
  const [sharedPlan, setSharedPlan] = useState<string>("");
  const [isSynced, setIsSynced] = useState<boolean>(false);
  const [attemptCount, setAttemptCount] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'broken' | 'fixed'>('broken');
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  
  // Circuit breaker for pitfall demo
  const maxAttempts = 50;
  
  // Cleanup timers
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);
  
  // Reset all demo state
  const resetDemo = (): void => {
    setRomeoLove("I love Juliet");
    setJulietLove("I love Romeo");
    setSharedPlan("");
    setIsSynced(false);
    setAttemptCount(0);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };
  
  // Anti-pattern: Async attempt to sync directly (fails)
  const attemptDirectSync = (): void => {
    if (attemptCount >= maxAttempts) {
      alert("Safety limit reached! Too many attempts. Resetting.");
      resetDemo();
      return;
    }
    
    setAttemptCount(prev => prev + 1);
    setIsSynced(false);
    
    // Simulate async mismatch
    const id = setTimeout(() => {
      setRomeoLove(prev => prev + "!");
      // Juliet's update might not match due to timing
      setTimeout(() => {
        setJulietLove(prev => prev + "?");
      }, 100);
      setTimeoutId(null);
    }, 200);
    
    setTimeoutId(id);
  };
  
  // Lifted state sync: Update through parent
  const updateSharedPlan = (): void => {
    const newPlan = "Meet at the chapel at noon";
    setSharedPlan(newPlan);
    setIsSynced(true);
  };
  
  const chapters: Chapter[] = [
    {
      title: "The Balcony Promise",
      content: "Juliet's request for marriage coordination reveals the need for shared state. Like components with isolated state, they require a common plan to synchronize."
    },
    {
      title: "Crossed Messages",
      content: "Direct coordination fails as messages cross, causing a missed meeting. This demonstrates the anti-pattern of managing shared state separately in components."
    },
    {
      title: "The Friar's Accord",
      content: "Friar Laurence becomes the common ground, lifting their shared intention to his management. Similarly, lift state to the closest common ancestor component."
    },
    {
      title: "Two Paths Diverged",
      content: "Contrast: Direct coordination leads to miscommunication; lifted state ensures synchronization. Use a common parent to manage and pass down shared state."
    },
    {
      title: "One Bond, One Hand",
      content: "The wedding ceremony symbolizes successful shared state management. Lifting state up enables components to coordinate seamlessly through a single source of truth."
    }
  ];

  const currentChapter = chapters[chapter];
  
  // Code examples
  const antiPatternCode = `// ❌ Anti-Pattern: Direct sibling coordination
function RomeoComponent() {
  const [love, setLove] = useState("I love Juliet");
  const onUpdate = () => {
    // Trying to sync with Juliet directly
    setLove("I love Juliet!");
    // Juliet's state might not update correctly
  };
  return <button onClick={onUpdate}>Declare Love</button>;
}

function JulietComponent() {
  const [love, setLove] = useState("I love Romeo");
  // No direct way to sync with Romeo's state
  return <div>{love}</div>;
}`;

  const correctPatternCode = `// ✅ Correct Pattern: State lifted to common parent
function FriarLaurenceParent() {
  const [sharedPlan, setSharedPlan] = useState("");
  
  return (
    <>
      <RomeoComponent plan={sharedPlan} />
      <JulietComponent plan={sharedPlan} />
      <button onClick={() => setSharedPlan("Meet at chapel")}>
        Set Shared Plan
      </button>
    </>
  );
}

function RomeoComponent({ plan }: { plan: string }) {
  return <div>Romeo knows: {plan}</div>;
}

function JulietComponent({ plan }: { plan: string }) {
  return <div>Juliet knows: {plan}</div>;
}`;

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Heart}
        title="Romeo and Juliet"
        subtitle="Verona, 1597"
        concept="React Concept: Lifting State Up"
        themeColor="rose"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-rose-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <MessageSquare className="h-5 w-5 text-rose-400" />
                  Demo Controls
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDemoMode('broken')}
                      className={`flex-1 rounded px-3 py-2 transition-colors ${demoMode === 'broken' ? 'bg-rose-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      ❌ Broken
                    </button>
                    <button
                      onClick={() => setDemoMode('fixed')}
                      className={`flex-1 rounded px-3 py-2 transition-colors ${demoMode === 'fixed' ? 'bg-rose-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      ✅ Fixed
                    </button>
                  </div>
                  <button
                    onClick={resetDemo}
                    className="w-full rounded bg-slate-800 px-4 py-2 hover:bg-slate-700"
                  >
                    Reset All Demos
                  </button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Attempts</div>
                      <div className="font-mono text-xl">{attemptCount}</div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Status</div>
                      <div className={isSynced ? "text-rose-400" : "text-slate-400"}>
                        {isSynced ? "Synced" : "Unsynced"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-rose-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Romeo</span>
                    <span className="text-sm font-medium">Child Component 1</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Juliet</span>
                    <span className="text-sm font-medium">Child Component 2</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Mutual Love</span>
                    <span className="text-sm font-medium">Shared State</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Friar Laurence</span>
                    <span className="text-sm font-medium">Common Ancestor</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Instructions</span>
                    <span className="text-sm font-medium">Props</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Marriage Plan</span>
                    <span className="text-sm font-medium">Lifted State</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Family Feud</span>
                    <span className="text-sm font-medium">Isolated Context</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Balcony</span>
                    <span className="text-sm font-medium">Component Isolation</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-rose-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-rose-200/80">
                  {chapter === 0 && "Independent components with local state need coordination, revealing the necessity for shared state management."}
                  {chapter === 1 && "Direct communication between siblings leads to inconsistency; state must be lifted to a common ancestor."}
                  {chapter === 2 && "Lifting state up to the closest common parent provides a single source of truth for synchronized updates."}
                  {chapter === 3 && "Comparing anti-pattern and correct pattern clarifies the benefits of lifted state for consistency and maintainability."}
                  {chapter === 4 && "With state lifted, components receive synchronized data via props, enabling seamless coordination."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "Thy purpose marriage, send me word tomorrow,"
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Juliet
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-rose-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-rose-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-rose-500"></div>
              <h3 className="text-xl font-bold text-rose-200">
                Interactive Demonstration
              </h3>
            </div>

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-6">
                    <h4 className="mb-3 font-bold text-amber-300">Romeo (Component A)</h4>
                    <div className="mb-4 font-mono text-lg">{romeoLove}</div>
                    <button
                      onClick={() => setRomeoLove("I love Juliet!")}
                      className="rounded bg-amber-700 px-4 py-2 hover:bg-amber-600"
                    >
                      Update Love
                    </button>
                  </div>
                  <div className="rounded-lg border border-rose-500/30 bg-rose-950/10 p-6">
                    <h4 className="mb-3 font-bold text-rose-300">Juliet (Component B)</h4>
                    <div className="mb-4 font-mono text-lg">{julietLove}</div>
                    <button
                      onClick={() => setJulietLove("I love Romeo!")}
                      className="rounded bg-rose-700 px-4 py-2 hover:bg-rose-600"
                    >
                      Update Love
                    </button>
                  </div>
                </div>
                <div className="rounded border border-slate-700 bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-400">
                    <strong>Problem:</strong> Both components have separate state. How do they coordinate for marriage?
                  </p>
                </div>
                <CodeBlock
                  code={`// Two components with isolated state
const [romeoLove, setRomeoLove] = useState("I love Juliet");
const [julietLove, setJulietLove] = useState("I love Romeo");`}
                  language="tsx"
                  variant="default"
                  title="// Initial Local State"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                  <p className="text-red-200">
                    ❌ Trying to sync directly: Messages cross and updates don't match.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded bg-slate-800/50 p-4">
                      <h4 className="font-bold text-amber-300">Romeo's State</h4>
                      <div className="font-mono text-xl mt-2">{romeoLove}</div>
                    </div>
                    <button
                      onClick={attemptDirectSync}
                      className="w-full rounded bg-red-700 px-4 py-2 hover:bg-red-600"
                      disabled={attemptCount >= maxAttempts}
                    >
                      Attempt Direct Sync
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded bg-slate-800/50 p-4">
                      <h4 className="font-bold text-rose-300">Juliet's State</h4>
                      <div className="font-mono text-xl mt-2">{julietLove}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-4">
                      <div className="text-sm text-slate-500">Sync Status</div>
                      <div className={`text-lg font-bold ${isSynced ? "text-green-400" : "text-red-400"}`}>
                        {isSynced ? "✅ Synced" : "❌ Unsynced"}
                      </div>
                    </div>
                  </div>
                </div>
                <CodeBlock
                  code={antiPatternCode}
                  language="tsx"
                  variant="error"
                  title="// ❌ Anti-Pattern: Direct Sibling Coordination"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded border border-rose-500/30 bg-rose-950/20 p-4">
                  <p className="text-rose-200">
                    ✅ State lifted to common parent: Friar Laurence manages the shared plan.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="rounded border border-slate-700 bg-slate-900/50 p-6">
                    <h4 className="mb-3 font-bold text-amber-300">Romeo</h4>
                    <div className="font-mono">Plan: {sharedPlan || "None"}</div>
                  </div>
                  <div className="rounded border border-rose-500/30 bg-rose-900/20 p-6">
                    <h4 className="mb-3 font-bold text-rose-100">Friar Laurence (Parent)</h4>
                    <div className="mb-4 font-mono">{sharedPlan || "No plan set"}</div>
                    <button
                      onClick={updateSharedPlan}
                      className="rounded bg-rose-700 px-4 py-2 hover:bg-rose-600"
                    >
                      Set Shared Plan
                    </button>
                  </div>
                  <div className="rounded border border-slate-700 bg-slate-900/50 p-6">
                    <h4 className="mb-3 font-bold text-rose-300">Juliet</h4>
                    <div className="font-mono">Plan: {sharedPlan || "None"}</div>
                  </div>
                </div>
                <CodeBlock
                  code={correctPatternCode}
                  language="tsx"
                  variant="success"
                  title="// ✅ Correct Pattern: State Lifted to Parent"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={correctPatternCode}
                  language="tsx"
                  themeColor="rose"
                  badLabel="❌ Anti-Pattern: Direct Coordination"
                  goodLabel="✅ Correct Pattern: Lifted State"
                  badExplanation="Components try to sync directly, leading to async mismatches and inconsistency."
                  goodExplanation="State lifted to common parent ensures single source of truth and synchronized updates via props."
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded border border-red-500/30 bg-red-950/20 p-6">
                    <h4 className="mb-3 font-bold text-red-300">Without Lifting State</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Components manage state separately</li>
                      <li>Direct communication attempts fail</li>
                      <li>Async updates cause inconsistency</li>
                      <li>Hard to debug and maintain</li>
                    </ul>
                  </div>
                  <div className="rounded border border-rose-500/30 bg-rose-950/20 p-6">
                    <h4 className="mb-3 font-bold text-rose-300">With Lifted State</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Single source of truth in parent</li>
                      <li>Props ensure synchronized data</li>
                      <li>Easier to manage and update</li>
                      <li>Better performance and predictability</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded border border-rose-500/30 bg-rose-950/20 p-4">
                  <p className="text-rose-200">
                    ✅ Working example: Lifted state enables perfect coordination between components.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="rounded bg-amber-950/20 p-6">
                    <h4 className="mb-3 font-bold text-amber-300">Romeo Component</h4>
                    <div className="font-mono text-lg">Knows: {sharedPlan || "Nothing yet"}</div>
                  </div>
                  <div className="rounded bg-rose-900/30 p-6">
                    <h4 className="mb-3 font-bold text-rose-100">Parent State</h4>
                    <input
                      type="text"
                      value={sharedPlan}
                      onChange={(e) => setSharedPlan(e.target.value)}
                      placeholder="Enter shared plan..."
                      className="w-full rounded bg-slate-800 px-3 py-2 border border-rose-500/50"
                    />
                    <div className="mt-4 text-sm text-slate-400">
                      Both children receive this value instantly via props
                    </div>
                  </div>
                  <div className="rounded bg-rose-950/20 p-6">
                    <h4 className="mb-3 font-bold text-rose-300">Juliet Component</h4>
                    <div className="font-mono text-lg">Knows: {sharedPlan || "Nothing yet"}</div>
                  </div>
                </div>
                <div className="rounded bg-slate-900/50 p-4">
                  <p className="text-slate-300">
                    <strong>Result:</strong> When you type in the parent input, both Romeo and Juliet components update simultaneously—no crossed messages, perfect synchronization.
                  </p>
                </div>
                <CodeBlock
                  code={`// Real-time synchronization through lifted state
function Parent() {
  const [plan, setPlan] = useState("");
  return (
    <>
      <Child name="Romeo" plan={plan} />
      <input value={plan} onChange={(e) => setPlan(e.target.value)} />
      <Child name="Juliet" plan={plan} />
    </>
  );
}`}
                  language="tsx"
                  variant="success"
                  title="// 🎉 Final Working Implementation"
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
            themeColor="rose"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}