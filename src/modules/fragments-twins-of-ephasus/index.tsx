import { useState, useMemo } from "react";
import { Users, Shield, CheckCircle, Quote, Code, Eye, EyeOff } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function FragmentsTwinsOfEphesus(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'wrapper' | 'fragment'>('wrapper');
  const [showDomNodes, setShowDomNodes] = useState<boolean>(true);
  const [renderCount, setRenderCount] = useState<number>(0);

  const chapters: Chapter[] = [
    { 
      title: "A Stage Set for Confusion", 
      content: "Four identical-looking twins stand scattered, creating visual chaos on stage. In React, when you need to return multiple sibling elements together, you face the same grouping problem without cluttering your DOM." 
    },
    { 
      title: "The Clumsy Herald", 
      content: "The Town Crier stands between twins, becoming an unnecessary fifth character. This is the wrapper div anti-pattern—adding extra DOM nodes just for grouping, which clutters your output and breaks semantic structure." 
    },
    { 
      title: "The Father's Gesture", 
      content: "Egeon points to the twins, grouping them without adding himself to the stage. React Fragments work the same way—they let you group elements logically without rendering extra DOM nodes." 
    },
    { 
      title: "The Space That Binds", 
      content: "Compare the cluttered stage with the Crier versus the clean pairs with just Egeon's gesture. Fragments create logical grouping while wrapper divs add visual and structural noise to your DOM." 
    },
    { 
      title: "Two Pairs, No Fifth", 
      content: "The final bow shows two clean pairs with no fifth character. With Fragments, you return grouped elements without unnecessary wrapper nodes, keeping your DOM structure clean and semantic." 
    },
  ];

  // Code examples
  const wrapperDivCode = `// ❌ With Extra Wrapper Div
function TwinGroup() {
  return (
    <div> {/* Unnecessary wrapper div */}
      <AntipholusEphesus />
      <AntipholusSyracuse />
      <DromioEphesus />
      <DromioSyracuse />
    </div>
  );
}`;

  const fragmentCode = `// ✅ With React Fragment
function TwinGroup() {
  return (
    <> {/* Fragment - no DOM node */}
      <AntipholusEphesus />
      <AntipholusSyracuse />
      <DromioEphesus />
      <DromioSyracuse />
    </>
  );
}`;

  const componentCode = `// Example components
function AntipholusEphesus() {
  return <div className="p-4 rounded bg-amber-800/40">Antipholus of Ephesus</div>;
}

function AntipholusSyracuse() {
  return <div className="p-4 rounded bg-amber-800/40">Antipholus of Syracuse</div>;
}`;

  const currentChapter = chapters[chapter];

  // Demo stage components
  const StageVisualization = useMemo(() => {
    const masters = (
      <div className="space-y-2">
        <div className="rounded-lg bg-amber-900/50 p-4 text-center border border-amber-700/50">
          Antipholus of Ephesus
        </div>
        <div className="rounded-lg bg-amber-900/50 p-4 text-center border border-amber-700/50">
          Antipholus of Syracuse
        </div>
      </div>
    );

    const servants = (
      <div className="space-y-2">
        <div className="rounded-lg bg-stone-800/50 p-4 text-center border border-stone-700/50">
          Dromio of Ephesus
        </div>
        <div className="rounded-lg bg-stone-800/50 p-4 text-center border border-stone-700/50">
          Dromio of Syracuse
        </div>
      </div>
    );

    if (demoMode === 'wrapper') {
      return (
        <div className="space-y-6">
          <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-6">
            <div className="mb-4">
              <div className="text-sm font-medium text-amber-400">Wrapper Div (Town Crier)</div>
              <div className="mt-2 rounded-lg bg-red-950/40 p-4 text-center border border-red-800/50">
                &lt;div&gt; wrapper node
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-amber-300 mb-2">Masters</div>
                {masters}
              </div>
              <div>
                <div className="text-sm font-medium text-stone-300 mb-2">Servants</div>
                {servants}
              </div>
            </div>
            <div className="mt-4 text-xs text-amber-500/70 text-center">
              DOM nodes: 5 (1 wrapper + 4 elements)
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6">
            <div className="mb-4">
              <div className="text-sm font-medium text-emerald-400">Fragment (Egeon's Gesture)</div>
              <div className="mt-2 rounded-lg bg-emerald-950/30 p-4 text-center border border-emerald-800/50 italic">
                &lt;&gt; ... &lt;/&gt; (no DOM node)
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-medium text-amber-300 mb-2">Masters</div>
                {masters}
              </div>
              <div>
                <div className="text-sm font-medium text-stone-300 mb-2">Servants</div>
                {servants}
              </div>
            </div>
            <div className="mt-4 text-xs text-emerald-500/70 text-center">
              DOM nodes: 4 (only the elements)
            </div>
          </div>
        </div>
      );
    }
  }, [demoMode]);

  return (
    <div className="min-h-screen bg-stone-950 font-serif text-stone-300">
      <ModuleHeader
        icon={Users}
        title="The Comedy of Errors"
        subtitle="Twins of Ephesus, 1594"
        concept="React Concept: Fragments"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-amber-500/30 bg-stone-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Code className="h-5 w-5 text-amber-400" />
                  Stage Controls
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDemoMode('wrapper')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'wrapper' ? 'bg-red-600 text-white' : 'bg-stone-800 hover:bg-stone-700'}`}
                    >
                      ❌ With Wrapper
                    </button>
                    <button
                      onClick={() => setDemoMode('fragment')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'fragment' ? 'bg-emerald-600 text-white' : 'bg-stone-800 hover:bg-stone-700'}`}
                    >
                      ✅ With Fragment
                    </button>
                  </div>
                  <button
                    onClick={() => setShowDomNodes(!showDomNodes)}
                    className="flex w-full items-center justify-center gap-2 rounded bg-stone-800 px-3 py-2 text-sm hover:bg-stone-700"
                  >
                    {showDomNodes ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {showDomNodes ? 'Hide DOM Nodes' : 'Show DOM Nodes'}
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded bg-stone-800/50 p-3 text-center">
                      <div className="text-xs text-stone-500">Render Count</div>
                      <div className="font-mono text-xl">{renderCount}</div>
                    </div>
                    <div className="rounded bg-stone-800/50 p-3 text-center">
                      <div className="text-xs text-stone-500">DOM Nodes</div>
                      <div className="font-mono text-xl">{demoMode === 'wrapper' ? 5 : 4}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-stone-700 bg-stone-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">The Twins</span>
                    <span className="text-sm font-medium">Multiple React Elements</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Town Crier</span>
                    <span className="text-sm font-medium">Wrapper Div (Anti-pattern)</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Egeon's Gesture</span>
                    <span className="text-sm font-medium">React Fragment</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">The Stage</span>
                    <span className="text-sm font-medium">DOM / Rendered Output</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Empty Space</span>
                    <span className="text-sm font-medium">Clean DOM Structure</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-stone-400">Fifth Character</span>
                    <span className="text-sm font-medium">Unnecessary Node</span>
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
                  {chapter === 0 && "React requires a single parent element for returns. Multiple sibling elements need logical grouping without DOM clutter."}
                  {chapter === 1 && "Wrapper divs add unnecessary DOM nodes that affect styling, semantics, and performance—like an extra character on stage."}
                  {chapter === 2 && "Fragments let you group elements without adding extra nodes to the DOM, keeping your output clean and semantic."}
                  {chapter === 3 && "The key difference is DOM nodes: wrappers add them, Fragments don't. This affects CSS, accessibility, and structure."}
                  {chapter === 4 && "Use Fragments whenever you need to return multiple elements without wrapper semantics. Clean DOM = better performance & maintainability."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-4">
                <p className="text-sm italic text-stone-400">
                  {chapter === 0 && "\"One of these men is my husband, which is he?\""}
                  {chapter === 1 && "\"Stand here, Crier, and bind them with your voice!\""}
                  {chapter === 2 && "\"Behold your sons. Behold your servants.\""}
                  {chapter === 3 && "\"The space between them spoke their relation clearer than any herald.\""}
                  {chapter === 4 && "\"Two pairs, no fifth.\""}
                </p>
                <p className="mt-2 text-right text-xs text-stone-500">
                  {chapter === 0 && "— Adriana"}
                  {chapter === 1 && "— The Duke of Ephesus"}
                  {chapter === 2 && "— Egeon"}
                  {chapter === 3 && "— The Duke of Ephesus"}
                  {chapter === 4 && "— Narration"}
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
                Interactive Stage
              </h3>
            </div>

            {/* Stage Visualization */}
            <div className="mb-8">
              {StageVisualization}
            </div>

            {/* Code Examples */}
            {chapter === 0 && (
              <div className="space-y-6">
                <CodeBlock
                  code={componentCode}
                  language="tsx"
                  variant="default"
                  title="// Individual Components (The Twins)"
                  defaultExpanded={true}
                />
                <div className="rounded-lg border border-amber-500/20 bg-amber-950/10 p-4">
                  <p className="text-sm text-amber-300/80">
                    <span className="font-bold">Problem:</span> React components must return a single parent element. How do we return both Antipholuses and Dromios together?
                  </p>
                </div>
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <CodeBlock
                  code={wrapperDivCode}
                  language="tsx"
                  variant="error"
                  title="// ❌ With Unnecessary Wrapper Div (The Town Crier)"
                  defaultExpanded={true}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-red-400">Problems:</h4>
                    <ul className="text-sm text-stone-400 space-y-1">
                      <li>• Adds extra DOM node</li>
                      <li>• Affects CSS selectors</li>
                      <li>• Breaks semantic HTML</li>
                      <li>• Can cause layout issues</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-red-400">When It Happens:</h4>
                    <ul className="text-sm text-stone-400 space-y-1">
                      <li>• Returning lists of elements</li>
                      <li>• Conditional rendering</li>
                      <li>• Mapping over arrays</li>
                      <li>• Multiple sibling components</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <CodeBlock
                  code={fragmentCode}
                  language="tsx"
                  variant="success"
                  title="// ✅ With React Fragment (Egeon's Gesture)"
                  defaultExpanded={true}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-bold text-emerald-400">Benefits:</h4>
                    <ul className="text-sm text-stone-400 space-y-1">
                      <li>• No extra DOM nodes</li>
                      <li>• Cleaner HTML output</li>
                      <li>• Better performance</li>
                      <li>• Maintains semantics</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-emerald-400">Syntax Options:</h4>
                    <ul className="text-sm text-stone-400 space-y-1">
                      <li>• <code className="text-emerald-300">&lt;&gt;...&lt;/&gt;</code> (short)</li>
                      <li>• <code className="text-emerald-300">&lt;Fragment&gt;...&lt;/Fragment&gt;</code></li>
                      <li>• <code className="text-emerald-300">React.Fragment</code></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={wrapperDivCode}
                  goodCode={fragmentCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ With Wrapper Div"
                  goodLabel="✅ With Fragment"
                  badExplanation="Adds unnecessary DOM node that affects CSS, semantics, and performance"
                  goodExplanation="Groups elements logically without adding extra nodes to the DOM"
                />
                <div className="rounded-lg border border-amber-500/20 bg-amber-950/10 p-4">
                  <p className="text-sm text-amber-300/80">
                    <span className="font-bold">Key Difference:</span> Wrapper divs render as <code className="text-amber-300">&lt;div&gt;</code> elements in the DOM. Fragments don't render anything—they're purely logical groupings.
                  </p>
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <CodeBlock
                  code={`// Final Pattern: Clean Grouping with Keys
function CharacterList({ characters }) {
  return (
    <>
      {characters.map((char) => (
        <Character key={char.id} {...char} />
      ))}
    </>
  );
}

// Usage: Returns multiple elements without wrapper
<CharacterList characters={[/* ... */]} />`}
                  language="tsx"
                  variant="default"
                  title="// Real-World Fragment Pattern"
                  defaultExpanded={true}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg bg-stone-800/50 p-4 text-center">
                    <div className="text-xs text-stone-500">When to Use Fragments</div>
                    <ul className="mt-2 text-sm text-stone-400 space-y-1">
                      <li>• Returning lists</li>
                      <li>• Conditional groups</li>
                      <li>• Table rows/cells</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-stone-800/50 p-4 text-center">
                    <div className="text-xs text-stone-500">When to Keep Wrappers</div>
                    <ul className="mt-2 text-sm text-stone-400 space-y-1">
                      <li>• Need styling</li>
                      <li>• Event handlers</li>
                      <li>• Semantic meaning</li>
                    </ul>
                  </div>
                  <div className="rounded-lg bg-stone-800/50 p-4 text-center">
                    <div className="text-xs text-stone-500">Fragment Keys</div>
                    <ul className="mt-2 text-sm text-stone-400 space-y-1">
                      <li>• Use with lists</li>
                      <li>• <code>key</code> prop only</li>
                      <li>• Required for reorder</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={(newChapter) => {
              setChapter(newChapter);
              setRenderCount(prev => prev + 1);
            }}
            themeColor="amber"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}