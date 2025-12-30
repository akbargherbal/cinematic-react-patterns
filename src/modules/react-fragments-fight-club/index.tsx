import { useState, useEffect, Fragment } from "react";
import { Code2, AlertTriangle, Check, Minus, Plus } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
}

export default function ReactFragmentsFightClub(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [wrapperMode, setWrapperMode] = useState<"div" | "fragment">("div");
  const [flexLayoutBroken, setFlexLayoutBroken] = useState<boolean>(false);
  const [domNodeCount, setDomNodeCount] = useState<number>(0);
  const [leakedWrappers, setLeakedWrappers] = useState<number>(0);

  const chapters: Chapter[] = [
    {
      title: "Two Sides of the Same Coin",
      content: `The world is split. You are one body but contain two distinct, warring personalities. You need the quiet order of your old life and the violent freedom Tyler offers. You need to return both. But how do you show the world two people when there's only one body? A React component can only return one root element, yet you have two JSX elements to render.`
    },
    {
      title: "The Third Man",
      content: `You decide to contain them in a wrapper div—creating a "Third Man" persona. This clumsy unit breaks every layout it touches. In a flexbox line of Space Monkeys, this wrapper div forces two men out of place. The social structure is broken. The wrapper hasn't just broken layouts; it has broken connections. The extra DOM node adds no semantic value and breaks CSS layouts.`
    },
    {
      title: "The Wrapper Was a Lie",
      content: `The mental model has to be destroyed. The truth hits you like a physical blow: there is no Tyler. There is no separate person. There is only you. The Narrator and Tyler are just two aspects of the same identity. They can exist together, side-by-side, because they were never separate. They don't need a box. They are simply the children of a single component. React Fragments (<>...</>) group elements without adding extra DOM nodes.`
    },
    {
      title: "One Box vs. No Box",
      content: `The difference is practical. The div wrapper (The Third Man) breaks flexbox layouts and adds unnecessary nodes. The Fragment (Integrated Self) maintains clean structure. One box was clumsy. No box is clean. The understanding is complete: you don't contain multitudes by building a container; you do it by removing the walls between them.`
    },
    {
      title: "A Clean Structure",
      content: `The new world begins. Two actions flow into one another, a seamless sequence. There is no mental gear-shift, no awkward container to move between states. There is only the component, rendering its children in perfect order. The most robust, elegant, and powerful structures are the ones that have nothing extra. The cleanest structures have nothing you don't need.`
    }
  ];

  // Code examples
  const errorCode = `// ❌ Syntax Error: Adjacent JSX elements
function BrokenComponent() {
  return (
    <div className="narrator">IKEA catalog...</div>
    <div className="tyler">First rule of Fight Club...</div>
  );
}`;

  const divWrapperCode = `// ❌ The Third Man: Extra wrapper div
function ThirdManComponent() {
  return (
    <div className="third-man"> {/* Breaks layouts! */}
      <div className="narrator">Beige apartment</div>
      <div className="tyler">Paper Street basement</div>
    </div>
  );
}`;

  const fragmentCode = `// ✅ Clean Fragment: No extra DOM nodes
function IntegratedComponent() {
  return (
    <> {/* Invisible grouping */}
      <div className="narrator">Ordered chaos</div>
      <div className="tyler">Chaotic order</div>
    </>
  );
}`;

  const comparisonCodeDiv = `// Parent flex container expects direct children
<div className="flex gap-4">
  {/* This wrapper breaks the flex layout */}
  <div> {/* ❌ Extra div */}
    <div>Space Monkey 1</div>
    <div>Space Monkey 2</div>
  </div>
  <div>Space Monkey 3</div>
</div>`;

  const comparisonCodeFragment = `// Parent flex container works correctly
<div className="flex gap-4">
  {/* Fragment groups without extra node */}
  <> {/* ✅ */}
    <div>Space Monkey 1</div>
    <div>Space Monkey 2</div>
  </>
  <div>Space Monkey 3</div>
</div>`;

  const cleanCode = `// Multiple fragments in one component
function CleanComponent() {
  return (
    <div className="p-6">
      <header>
        <h1>Project Mayhem</h1>
        <p>The cleanest structures have nothing extra</p>
      </header>
      
      <main>
        {/* Fragment for related content */}
        <>
          <section className="mission">
            <h2>Mission Statement</h2>
            <p>You are not special...</p>
          </section>
          <section className="rules">
            <h2>The Rules</h2>
            <ol>
              <li>You do not talk about Fight Club</li>
              <li>You DO NOT talk about Fight Club</li>
            </ol>
          </section>
        </>
        
        {/* Another fragment for actions */}
        <>
          <button>Destroy something beautiful</button>
          <button>Let go</button>
        </>
      </main>
    </div>
  );
}`;

  // Reset function
  const resetDemo = (): void => {
    setFlexLayoutBroken(false);
    setDomNodeCount(0);
    setLeakedWrappers(0);
  };

  // Simulate adding wrapper divs (with circuit breaker)
  const addWrapper = (): void => {
    if (wrapperMode === "div") {
      setLeakedWrappers(prev => {
        const newCount = prev + 1;
        if (newCount >= 50) {
          resetDemo();
          return 0;
        }
        return newCount;
      });
      setDomNodeCount(prev => prev + 1);
    }
  };

  // Calculate layout metrics
  useEffect(() => {
    if (wrapperMode === "div" && chapter >= 1) {
      setFlexLayoutBroken(true);
    } else {
      setFlexLayoutBroken(false);
    }
  }, [wrapperMode, chapter]);

  // Demo component for visualization
  const DemoComponent = ({ useFragment }: { useFragment: boolean }): JSX.Element => {
    return useFragment ? (
      <>
        <div className="bg-rose-900/30 text-rose-300 p-4 rounded border border-rose-500/50">
          Narrator: IKEA catalog...
        </div>
        <div className="bg-slate-800 text-slate-300 p-4 rounded border border-slate-500">
          Tyler: First rule of Fight Club...
        </div>
      </>
    ) : (
      <div className="bg-yellow-900/20 border border-yellow-500/50 p-2 rounded">
        <div className="text-yellow-400 text-xs mb-1">🧍 The Third Man (wrapper div)</div>
        <div className="space-y-2">
          <div className="bg-rose-900/30 text-rose-300 p-4 rounded">
            Narrator: IKEA catalog...
          </div>
          <div className="bg-slate-800 text-slate-300 p-4 rounded">
            Tyler: First rule of Fight Club...
          </div>
        </div>
      </div>
    );
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Code2 className="text-rose-500 w-7 h-7 md:w-8 md:h-8" />
              <h1 className="text-2xl md:text-3xl font-bold">Fight Club</h1>
            </div>
            <p className="text-sm md:text-base text-slate-400">
              Fiction • The Narrator/Tyler Durden • 1999
            </p>
          </div>
          <p className="text-base md:text-lg text-rose-500 font-medium">
            React Fragments: Returning Multiple Elements
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Chapter Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{currentChapter.title}</h2>
          <p className="leading-relaxed text-slate-300">{currentChapter.content}</p>
        </div>

        {/* Interactive Demo Section */}
        <section className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 mb-8 md:mb-12">
          <h3 className="text-xl font-semibold mb-6 text-rose-400 flex items-center gap-2">
            <Code2 className="w-5 h-5" />
            Interactive Demonstration
          </h3>

          {/* Chapter-specific demos */}
          {chapter === 0 && (
            <div className="space-y-6">
              <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="text-red-500 w-5 h-5" />
                  <h4 className="text-lg font-medium">The Problem: Adjacent JSX Elements</h4>
                </div>
                <CodeBlock
                  code={errorCode}
                  variant="error"
                  title="// ❌ Syntax Error: Adjacent JSX elements must be wrapped"
                  defaultExpanded={true}
                />
                <div className="mt-4 p-4 bg-red-950/30 rounded border border-red-500/50">
                  <p className="text-red-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Console Error: "Adjacent JSX elements must be wrapped in an enclosing tag"
                  </p>
                </div>
              </div>
            </div>
          )}

          {chapter === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-yellow-400">❌ The Third Man (div wrapper)</h4>
                  <CodeBlock
                    code={divWrapperCode}
                    variant="error"
                    title="// ❌ Extra wrapper div breaks layouts"
                    defaultExpanded={true}
                  />
                  <button
                    onClick={addWrapper}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded transition-colors"
                  >
                    🧍 Add Another "Third Man" Wrapper
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <h5 className="text-sm font-medium text-slate-400 mb-3">Flexbox Layout Demo</h5>
                    <div className={`flex gap-4 p-4 rounded ${flexLayoutBroken ? 'bg-red-950/30 border border-red-500/50' : 'bg-slate-900'}`}>
                      <DemoComponent useFragment={false} />
                      <div className="bg-slate-700 text-slate-300 p-4 rounded flex-1">
                        Space Monkey 3
                      </div>
                    </div>
                    {flexLayoutBroken && (
                      <p className="text-red-400 text-sm mt-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Layout broken: Wrapper div adds unexpected spacing
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {chapter === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-emerald-400">✅ The Fragment Solution</h4>
                  <CodeBlock
                    code={fragmentCode}
                    variant="success"
                    title="// ✅ Fragment: Groups without extra DOM nodes"
                    defaultExpanded={true}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWrapperMode("div")}
                      className={`px-4 py-2 rounded transition-colors ${wrapperMode === "div" ? 'bg-yellow-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                      Show Div Wrapper
                    </button>
                    <button
                      onClick={() => setWrapperMode("fragment")}
                      className={`px-4 py-2 rounded transition-colors ${wrapperMode === "fragment" ? 'bg-emerald-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                      Show Fragment
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-6 rounded-lg">
                    <h5 className="text-sm font-medium text-slate-400 mb-3">Live Preview</h5>
                    <div className="flex gap-4 p-4 rounded bg-slate-900">
                      <DemoComponent useFragment={wrapperMode === "fragment"} />
                      <div className="bg-slate-700 text-slate-300 p-4 rounded flex-1">
                        Space Monkey 3
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-slate-900/50 p-3 rounded">
                        <div className="text-slate-400">Wrapper Type</div>
                        <div className={wrapperMode === "div" ? "text-yellow-400" : "text-emerald-400"}>
                          {wrapperMode === "div" ? "div (extra node)" : "<> (fragment)"}
                        </div>
                      </div>
                      <div className="bg-slate-900/50 p-3 rounded">
                        <div className="text-slate-400">DOM Nodes</div>
                        <div className="text-slate-300">{wrapperMode === "div" ? "3" : "2"}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {chapter === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-yellow-400">❌ Div Wrapper (Breaks Layout)</h4>
                  <CodeBlock
                    code={comparisonCodeDiv}
                    variant="error"
                    title="// ❌ Wrapper div breaks flex parent expectations"
                    defaultExpanded={true}
                  />
                  <div className="bg-red-950/20 p-4 rounded border border-red-500/30">
                    <p className="text-red-300 text-sm">
                      The extra div becomes a flex item itself, causing unexpected spacing and alignment issues.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-emerald-400">✅ Fragment (Clean Structure)</h4>
                  <CodeBlock
                    code={comparisonCodeFragment}
                    variant="success"
                    title="// ✅ Fragment maintains parent layout"
                    defaultExpanded={true}
                  />
                  <div className="bg-emerald-950/20 p-4 rounded border border-emerald-500/30">
                    <p className="text-emerald-300 text-sm">
                      Fragment groups children without adding a DOM node, preserving flexbox layout rules.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="flex justify-between items-center">
                  <button
                    onClick={resetDemo}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
                  >
                    🔄 Reset Demo
                  </button>
                  <div className="text-sm text-slate-400">
                    Leaked wrapper divs: <span className="text-yellow-400 font-mono">{leakedWrappers}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {chapter === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="text-emerald-500 w-5 h-5" />
                  <h4 className="text-lg font-medium">Clean Implementation with Fragments</h4>
                </div>
                <CodeBlock
                  code={cleanCode}
                  variant="success"
                  title="// ✅ Clean component using multiple fragments"
                  defaultExpanded={true}
                  language="jsx"
                />
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-900/50 p-4 rounded">
                      <div className="text-emerald-400 font-medium mb-2">DOM Efficiency</div>
                      <div className="text-3xl font-bold text-emerald-300 font-mono">0</div>
                      <div className="text-sm text-slate-400">extra wrapper nodes</div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded">
                      <div className="text-emerald-400 font-medium mb-2">Layout Integrity</div>
                      <div className="text-3xl font-bold text-emerald-300">✓</div>
                      <div className="text-sm text-slate-400">CSS rules preserved</div>
                    </div>
                    <div className="bg-slate-900/50 p-4 rounded">
                      <div className="text-emerald-400 font-medium mb-2">Semantic Value</div>
                      <div className="text-3xl font-bold text-emerald-300">✓</div>
                      <div className="text-sm text-slate-400">clean HTML structure</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Navigation */}
        <nav className="flex justify-between items-center mt-8 md:mt-12">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-5 py-3 bg-rose-700 hover:bg-rose-600 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Minus className="w-4 h-4" />
            Previous
          </button>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-slate-400">Chapter</span>
              <span className="font-mono font-bold text-rose-400">{chapter + 1}</span>
              <span className="text-sm text-slate-400">of</span>
              <span className="font-mono font-bold">{chapters.length}</span>
            </div>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-rose-500 transition-all duration-300"
                style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
              />
            </div>
          </div>
          
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-5 py-3 bg-rose-700 hover:bg-rose-600 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            Next
            <Plus className="w-4 h-4" />
          </button>
        </nav>
      </main>
    </div>
  );
}