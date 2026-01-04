import { useState, useEffect, useRef, memo } from "react";
import { Brain, Scroll, TreePine, CheckCircle, RefreshCw, Timer } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function MuchAdoAboutMemo(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'withoutMemo' | 'withMemo'>('withoutMemo');
  const [propValue, setPropValue] = useState<number>(5);
  const [parentRenderCount, setParentRenderCount] = useState<number>(0);
  const [unnecessaryRenders, setUnnecessaryRenders] = useState<number>(0);
  const [isRunningDemo, setIsRunningDemo] = useState<boolean>(false);
  
  // Simulate expensive calculation
  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  const chapters: Chapter[] = [
    { 
      title: "The Bachelor in the Orchard", 
      content: "Benedick represents an expensive React component. His complex bachelor philosophy is like a component with heavy internal logic. The orchard is his scope—private, isolated, ready to process inputs (props) that arrive from outside."
    },
    { 
      title: "The Whispered Lie", 
      content: "When Benedick hears the fabricated story (new props), he completely re-evaluates his worldview, even though the underlying truth hasn't changed. This is the anti-pattern: an expensive component re-rendering when props are effectively the same."
    },
    { 
      title: "The Unmade Decision", 
      content: "A memoized Benedick compares the new story to the old one. Finding them shallowly equal—same lie, different teller—he skips the costly internal turmoil. React.memo does this: shallow prop comparison prevents unnecessary re-renders."
    },
    { 
      title: "Two Paths in the Garden", 
      content: "Without memo: every whisper triggers complete re-evaluation. With memo: only truly new information causes a re-render. The ledger shows wasted effort versus conserved performance. Memoization is a filter, not a gate."
    },
    { 
      title: "The Gate and the Filter", 
      content: "Not every component needs React.memo. Use it for expensive components with stable props—like Benedick should have filtered gossip. It's an optimization tool, not a default. Wise components know when to re-render."
    }
  ];

  // Code examples
  const expensiveComponentCode = `// Benedick - Expensive Component
const ExpensiveComponent = ({ story }: { story: string }) => {
  // Simulated expensive calculation
  const result = fibonacci(35); // Heavy computation
  return (
    <div className="p-4 bg-emerald-950/40 rounded-lg">
      <p>Story: "{story}"</p>
      <p>Processed result: {result}</p>
    </div>
  );
};`;

  const withoutMemoCode = `// ❌ Without React.memo - Re-renders on every parent update
const BenedickWithoutMemo = ({ story }: { story: string }) => {
  // This expensive logic runs every time
  const result = fibonacci(35);
  return <div>Result: {result}</div>;
};

// Parent component re-renders frequently
const Parent = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Trigger Parent Render
      </button>
      <BenedickWithoutMemo story="Beatrice loves Benedick" />
      {/* Component re-renders even when story prop doesn't change */}
    </div>
  );
};`;

  const withMemoCode = `// ✅ With React.memo - Skips unnecessary re-renders
const ExpensiveComponent = memo(function BenedickWithMemo({ 
  story 
}: { 
  story: string 
}) {
  // This only runs when story prop changes
  const result = fibonacci(35);
  return <div>Result: {result}</div>;
});

// Custom comparison for complex props
const CustomMemoizedComponent = memo(ExpensiveComponent, (prev, next) => {
  // Return true if props are equal (skip re-render)
  // Return false if props differ (allow re-render)
  return prev.story === next.story;
});`;

  const currentChapter = chapters[chapter];
  const expensiveComponentRef = useRef<number>(0);
  const memoizedComponentRef = useRef<number>(0);

  // Demo: Simulate unnecessary re-renders
  useEffect(() => {
    if (!isRunningDemo || demoMode === 'withMemo') return;

    const interval = setInterval(() => {
      setParentRenderCount(prev => {
        const newCount = prev + 1;
        if (newCount % 2 === 0) {
          setUnnecessaryRenders(u => {
            const updated = u + 1;
            if (updated >= 50) {
              clearInterval(interval);
              setIsRunningDemo(false);
              alert("Safety limit reached! Demo reset.");
            }
            return updated;
          });
        }
        return newCount;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isRunningDemo, demoMode]);

  const resetDemo = () => {
    setParentRenderCount(0);
    setUnnecessaryRenders(0);
    setIsRunningDemo(false);
    expensiveComponentRef.current = 0;
    memoizedComponentRef.current = 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-emerald-950/30 font-serif text-slate-300">
      <ModuleHeader
        icon={Brain}
        title="Much Ado About Nothing"
        subtitle="Benedick, Leonato's Orchard, 1598"
        concept="React Concept: React.memo Optimization"
        themeColor="emerald"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-emerald-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-300">
                  <RefreshCw className="h-5 w-5" />
                  Demo Controls
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDemoMode('withoutMemo')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'withoutMemo' ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      ❌ Without Memo
                    </button>
                    <button
                      onClick={() => setDemoMode('withMemo')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'withMemo' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      ✅ With Memo
                    </button>
                  </div>

                  <button
                    onClick={() => setIsRunningDemo(!isRunningDemo)}
                    className={`w-full rounded px-4 py-2 font-medium transition-colors ${isRunningDemo ? 'bg-amber-600 hover:bg-amber-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                  >
                    {isRunningDemo ? '⏹️ Stop Demo' : '▶️ Start Demo'}
                  </button>

                  <button
                    onClick={resetDemo}
                    className="w-full rounded bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
                  >
                    🔄 Reset All Metrics
                  </button>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-400">Parent Renders</div>
                      <div className="font-mono text-xl tabular-nums">{parentRenderCount}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-400">Unnecessary Renders</div>
                      <div className={`font-mono text-xl tabular-nums ${unnecessaryRenders > 20 ? 'text-red-400' : 'text-emerald-400'}`}>
                        {unnecessaryRenders}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Scroll className="h-5 w-5 text-emerald-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Benedick</span>
                    <span className="text-sm font-medium">React Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Overheard Conversation</span>
                    <span className="text-sm font-medium">Component Props</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Beatrice's True Feelings</span>
                    <span className="text-sm font-medium">Application State</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Change of Heart</span>
                    <span className="text-sm font-medium">Component Re-render</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Recognizing Same Story</span>
                    <span className="text-sm font-medium">Shallow Comparison</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Orchard</span>
                    <span className="text-sm font-medium">Component Scope</span>
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
                  {chapter === 0 && "Expensive components (like Benedick's philosophy) should avoid unnecessary work—every re-render has a cost."}
                  {chapter === 1 && "Props can change frequently without meaningful data changing, triggering wasteful re-renders."}
                  {chapter === 2 && "React.memo performs shallow comparison: if props are equal, it skips the re-render entirely."}
                  {chapter === 3 && "Memoization trades comparison overhead for computation savings—worth it for expensive components."}
                  {chapter === 4 && "Use React.memo selectively: for expensive components with stable props, not as a default."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && '"Let me be that I am, and seek not to alter me."'}
                  {chapter === 1 && '"This can be no trick. The conference was sadly borne."'}
                  {chapter === 2 && '"The tale is old, though the teller be new."'}
                  {chapter === 3 && '"To render anew on every whisper is a comedy; to compare and conserve is a performance."'}
                  {chapter === 4 && '"A wise component knows not every word demands an answer."'}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — {chapter === 3 ? 'Narrator' : 'Benedick'}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-emerald-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-slate-900/40 to-emerald-950/20 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-2 rounded bg-emerald-500"></div>
              <h3 className="text-xl font-bold text-emerald-200">
                <TreePine className="mr-2 inline h-5 w-5" />
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter 0: Introduction */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-bold text-emerald-300">The Orchard (Component Scope)</h4>
                    <div className="rounded-lg bg-gradient-to-br from-emerald-950/40 to-slate-900/60 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm text-slate-400">Expensive Calculation</span>
                        <span className="rounded-full bg-emerald-900/60 px-3 py-1 font-mono text-sm">
                          fibonacci(35)
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="mb-2 text-xs text-slate-500">Current Result</div>
                        <div className="font-mono text-3xl text-emerald-300">
                          {fibonacci(5)}
                        </div>
                        <div className="mt-4 text-sm text-slate-400">
                          This calculation simulates Benedick's complex internal logic.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-emerald-300">Component Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between rounded-lg bg-slate-800/40 p-4">
                        <span className="text-slate-400">Render Cost</span>
                        <span className="font-mono text-emerald-300">~15ms</span>
                      </div>
                      <div className="flex justify-between rounded-lg bg-slate-800/40 p-4">
                        <span className="text-slate-400">Props Received</span>
                        <span className="font-mono text-emerald-300">"Beatrice loves..."</span>
                      </div>
                      <div className="flex justify-between rounded-lg bg-slate-800/40 p-4">
                        <span className="text-slate-400">Optimization Needed</span>
                        <span className="font-mono text-amber-400">High</span>
                      </div>
                    </div>
                  </div>
                </div>
                <CodeBlock
                  code={expensiveComponentCode}
                  language="tsx"
                  variant="default"
                  title="// Expensive Component (Benedick)"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 1: Anti-pattern */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
                  <div className="mb-4 flex items-center gap-2 text-red-300">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
                    <span className="font-bold">❌ Current Mode: Without React.memo</span>
                  </div>
                  <p className="text-sm text-red-200/80">
                    The parent component is re-rendering {parentRenderCount} times. 
                    Each re-render triggers the expensive child component, even though the story prop hasn't changed.
                    {unnecessaryRenders > 0 && ` ${unnecessaryRenders} unnecessary re-renders detected.`}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className={`rounded-lg p-6 transition-all duration-300 ${isRunningDemo ? 'bg-red-900/30 border border-red-500/40' : 'bg-slate-800/40'}`}>
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-bold text-red-300">Parent Component</h4>
                      <div className="rounded-full bg-slate-800 px-3 py-1 font-mono text-sm">
                        Renders: {parentRenderCount}
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-slate-400">
                      This parent re-renders frequently (simulated by the demo).
                    </p>
                    <div className="text-center">
                      <div className="mb-2 text-xs text-slate-500">Current Prop Value</div>
                      <div className="font-mono text-2xl text-slate-300">{propValue}</div>
                    </div>
                  </div>
                  <div className={`rounded-lg p-6 transition-all duration-300 ${isRunningDemo ? 'bg-red-900/40 border border-red-500/40 animate-pulse' : 'bg-slate-800/40'}`}>
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-bold text-red-300">Child Component</h4>
                      <div className="rounded-full bg-red-900/60 px-3 py-1 font-mono text-sm">
                        Re-renders: {expensiveComponentRef.current}
                      </div>
                    </div>
                    <p className="mb-4 text-sm text-slate-400">
                      Re-renders every time parent re-renders, even with same props.
                    </p>
                    <div className="text-center">
                      <Timer className="mx-auto mb-2 h-8 w-8 text-red-400" />
                      <div className="text-xs text-red-400">Computing fibonacci(35)...</div>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={withoutMemoCode}
                  language="tsx"
                  variant="error"
                  title="// ❌ Anti-Pattern: Component Without React.memo"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 2: Solution */}
            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
                  <div className="mb-4 flex items-center gap-2 text-emerald-300">
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                    <span className="font-bold">✅ Solution: React.memo Comparison</span>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded bg-slate-800/40 p-4">
                      <div className="text-xs text-slate-500">Previous Props</div>
                      <div className="truncate font-mono text-sm">story: "Beatrice loves..."</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Brain className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div className="rounded bg-slate-800/40 p-4">
                      <div className="text-xs text-slate-500">New Props</div>
                      <div className="truncate font-mono text-sm">story: "Beatrice loves..."</div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <div className="inline-block rounded-full bg-emerald-900/60 px-4 py-2 font-mono text-sm">
                      Shallow Comparison: EQUAL → Skip Re-render
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={withMemoCode}
                  language="tsx"
                  variant="success"
                  title="// ✅ Correct Pattern: Using React.memo"
                  defaultExpanded={true}
                />

                <div className="rounded-lg bg-slate-800/40 p-6">
                  <h4 className="mb-4 font-bold text-emerald-300">Shallow Comparison Rules</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span>Primitives (string, number, boolean): Compared by value</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-amber-500"></div>
                      <span>Objects & Arrays: Compared by reference (same object?)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                      <span>Functions: Compared by reference (same function instance)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-amber-500"></div>
                      <span>Use custom comparison function for complex cases</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Chapter 3: Comparison */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="rounded-lg border border-red-500/30 bg-gradient-to-b from-red-950/20 to-slate-900/40 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-bold text-red-300">❌ Without React.memo</h4>
                      <div className="rounded-full bg-red-900/60 px-3 py-1 font-mono text-sm">
                        Renders: {parentRenderCount}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                        <div 
                          className="h-full bg-red-500 transition-all duration-300"
                          style={{ width: `${Math.min(100, (unnecessaryRenders / 50) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded bg-slate-800/60 p-3">
                          <div className="text-xs text-slate-400">CPU Cost</div>
                          <div className="font-mono text-xl text-red-400">High</div>
                        </div>
                        <div className="rounded bg-slate-800/60 p-3">
                          <div className="text-xs text-slate-400">Performance</div>
                          <div className="font-mono text-xl text-red-400">Poor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-900/40 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-bold text-emerald-300">✅ With React.memo</h4>
                      <div className="rounded-full bg-emerald-900/60 px-3 py-1 font-mono text-sm">
                        Renders: {Math.floor(parentRenderCount / 2)}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${Math.min(100, (Math.floor(parentRenderCount / 2) / 50) * 100)}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded bg-slate-800/60 p-3">
                          <div className="text-xs text-slate-400">CPU Cost</div>
                          <div className="font-mono text-xl text-emerald-400">Low</div>
                        </div>
                        <div className="rounded bg-slate-800/60 p-3">
                          <div className="text-xs text-slate-400">Performance</div>
                          <div className="font-mono text-xl text-emerald-400">Excellent</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CodeComparison
                  badCode={withoutMemoCode}
                  goodCode={withMemoCode}
                  language="tsx"
                  themeColor="emerald"
                  badLabel="❌ Without Memoization"
                  goodLabel="✅ With React.memo"
                  badExplanation="Component re-renders on every parent update, wasting CPU cycles on expensive calculations"
                  goodExplanation="Component skips re-renders when props are unchanged, preserving performance"
                />

                <div className="rounded-lg bg-slate-800/40 p-6">
                  <h4 className="mb-4 font-bold text-emerald-300">Performance Ledger</h4>
                  <div className="overflow-hidden rounded-lg border border-slate-700">
                    <table className="w-full">
                      <thead className="border-b border-slate-700 bg-slate-900/60">
                        <tr>
                          <th className="p-3 text-left text-sm font-medium text-slate-400">Metric</th>
                          <th className="p-3 text-left text-sm font-medium text-red-400">Without Memo</th>
                          <th className="p-3 text-left text-sm font-medium text-emerald-400">With Memo</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-slate-800">
                          <td className="p-3 text-sm">Re-renders</td>
                          <td className="p-3 font-mono text-red-400">{parentRenderCount}</td>
                          <td className="p-3 font-mono text-emerald-400">{Math.floor(parentRenderCount / 2)}</td>
                        </tr>
                        <tr className="border-b border-slate-800">
                          <td className="p-3 text-sm">CPU Time</td>
                          <td className="p-3 font-mono text-red-400">~{parentRenderCount * 15}ms</td>
                          <td className="p-3 font-mono text-emerald-400">~{Math.floor(parentRenderCount / 2) * 15}ms</td>
                        </tr>
                        <tr>
                          <td className="p-3 text-sm">Efficiency</td>
                          <td className="p-3 font-mono text-red-400">{unnecessaryRenders} wasted</td>
                          <td className="p-3 font-mono text-emerald-400">0 wasted</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 4: Guidelines */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-emerald-400" />
                    <h4 className="font-bold text-emerald-300">When to Use React.memo</h4>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-3">
                      <div className="rounded-lg bg-emerald-900/30 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                          <span className="font-bold text-emerald-300">✅ Good Candidates</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                            <span>Expensive calculations (fibonacci, sorts, filters)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                            <span>Components with stable props (rarely change)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                            <span>Pure presentational components</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-slate-800/40 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-slate-500"></div>
                          <span className="font-bold text-slate-300">⚠️ Avoid When</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500"></div>
                            <span>Props change frequently (comparison overhead)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500"></div>
                            <span>Components are already cheap to render</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500"></div>
                            <span>You need access to latest props in callbacks</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CodeBlock
                    code={`// ✅ Correct Usage
const UserProfile = memo(({ user }) => {
  // Expensive transformation
  const stats = calculateUserStats(user);
  return <ProfileCard stats={stats} />;
});

// Only re-renders when user object changes`}
                    language="tsx"
                    variant="success"
                    title="// Good Example: Expensive Component"
                  />
                  <CodeBlock
                    code={`// ❌ Unnecessary Memo
const Button = memo(({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
});

// Button is cheap to render, memo adds overhead
// onClick prop changes frequently (new function each render)`}
                    language="tsx"
                    variant="error"
                    title="// Bad Example: Cheap Component"
                  />
                </div>

                <div className="rounded-lg bg-gradient-to-r from-slate-800/40 to-emerald-950/20 p-6">
                  <h4 className="mb-4 font-bold text-emerald-300">Decision Flowchart</h4>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-emerald-500/20 bg-slate-900/40 p-4">
                      <div className="font-bold text-emerald-300">1. Is the component expensive to render?</div>
                      <div className="mt-2 text-sm text-slate-400">(Complex calculations, large DOM trees, performance issues)</div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-6 w-0.5 bg-emerald-500/50"></div>
                    </div>
                    <div className="rounded-lg border border-emerald-500/20 bg-slate-900/40 p-4">
                      <div className="font-bold text-emerald-300">2. Do props remain stable between renders?</div>
                      <div className="mt-2 text-sm text-slate-400">(Primitives don't change, objects same reference, functions stable)</div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-6 w-0.5 bg-emerald-500/50"></div>
                    </div>
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                      <div className="font-bold text-emerald-300">✅ Use React.memo</div>
                      <div className="mt-2 text-sm text-emerald-300/80">Adds comparison overhead but saves expensive renders</div>
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
            themeColor="emerald"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}