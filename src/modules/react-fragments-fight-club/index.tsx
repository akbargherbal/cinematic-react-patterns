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
      content: `The world is split. You are one body but contain two distinct, warring personalities. You need the quiet order of your old life and the violent freedom Tyler offers. You need to return both. But how do you show the world two people when there's only one body? A React component can only return one root element, yet you have two JSX elements to render.`,
    },
    {
      title: "The Third Man",
      content: `You decide to contain them in a wrapper div—creating a "Third Man" persona. This clumsy unit breaks every layout it touches. In a flexbox line of Space Monkeys, this wrapper div forces two men out of place. The social structure is broken. The wrapper hasn't just broken layouts; it has broken connections. The extra DOM node adds no semantic value and breaks CSS layouts.`,
    },
    {
      title: "The Wrapper Was a Lie",
      content: `The mental model has to be destroyed. The truth hits you like a physical blow: there is no Tyler. There is no separate person. There is only you. The Narrator and Tyler are just two aspects of the same identity. They can exist together, side-by-side, because they were never separate. They don't need a box. They are simply the children of a single component. React Fragments (<>...</>) group elements without adding extra DOM nodes.`,
    },
    {
      title: "One Box vs. No Box",
      content: `The difference is practical. The div wrapper (The Third Man) breaks flexbox layouts and adds unnecessary nodes. The Fragment (Integrated Self) maintains clean structure. One box was clumsy. No box is clean. The understanding is complete: you don't contain multitudes by building a container; you do it by removing the walls between them.`,
    },
    {
      title: "A Clean Structure",
      content: `The new world begins. Two actions flow into one another, a seamless sequence. There is no mental gear-shift, no awkward container to move between states. There is only the component, rendering its children in perfect order. The most robust, elegant, and powerful structures are the ones that have nothing extra. The cleanest structures have nothing you don't need.`,
    },
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
      setLeakedWrappers((prev) => {
        const newCount = prev + 1;
        if (newCount >= 50) {
          resetDemo();
          return 0;
        }
        return newCount;
      });
      setDomNodeCount((prev) => prev + 1);
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
  const DemoComponent = ({
    useFragment,
  }: {
    useFragment: boolean;
  }): JSX.Element => {
    return useFragment ? (
      <>
        <div className="rounded border border-rose-500/50 bg-rose-900/30 p-4 text-rose-300">
          Narrator: IKEA catalog...
        </div>
        <div className="rounded border border-slate-500 bg-slate-800 p-4 text-slate-300">
          Tyler: First rule of Fight Club...
        </div>
      </>
    ) : (
      <div className="rounded border border-yellow-500/50 bg-yellow-900/20 p-2">
        <div className="mb-1 text-xs text-yellow-400">
          🧍 The Third Man (wrapper div)
        </div>
        <div className="space-y-2">
          <div className="rounded bg-rose-900/30 p-4 text-rose-300">
            Narrator: IKEA catalog...
          </div>
          <div className="rounded bg-slate-800 p-4 text-slate-300">
            Tyler: First rule of Fight Club...
          </div>
        </div>
      </div>
    );
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 p-4 font-sans text-slate-300 md:p-8">
      {/* Header */}
      <header className="mb-8 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Code2 className="h-7 w-7 text-rose-500 md:h-8 md:w-8" />
              <h1 className="text-2xl font-bold md:text-3xl">Fight Club</h1>
            </div>
            <p className="text-sm text-slate-400 md:text-base">
              Fiction • The Narrator/Tyler Durden • 1999
            </p>
          </div>
          <p className="text-base font-medium text-rose-500 md:text-lg">
            React Fragments: Returning Multiple Elements
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl">
        {/* Chapter Content */}
        <div className="prose prose-invert prose-lg mb-8 max-w-none md:mb-12">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            {currentChapter.title}
          </h2>
          <p className="leading-relaxed text-slate-300">
            {currentChapter.content}
          </p>
        </div>

        {/* Interactive Demo Section */}
        <section className="mb-8 rounded-lg border border-slate-700 bg-slate-900/50 p-6 md:mb-12">
          <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-rose-400">
            <Code2 className="h-5 w-5" />
            Interactive Demonstration
          </h3>

          {/* Chapter-specific demos */}
          {chapter === 0 && (
            <div className="space-y-6">
              <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <h4 className="text-lg font-medium">
                    The Problem: Adjacent JSX Elements
                  </h4>
                </div>
                <CodeBlock
                  code={errorCode}
                  variant="error"
                  title="// ❌ Syntax Error: Adjacent JSX elements must be wrapped"
                  defaultExpanded={true}
                />
                <div className="mt-4 rounded border border-red-500/50 bg-red-950/30 p-4">
                  <p className="flex items-center gap-2 text-red-300">
                    <AlertTriangle className="h-4 w-4" />
                    Console Error: "Adjacent JSX elements must be wrapped in an
                    enclosing tag"
                  </p>
                </div>
              </div>
            </div>
          )}

          {chapter === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-yellow-400">
                    ❌ The Third Man (div wrapper)
                  </h4>
                  <CodeBlock
                    code={divWrapperCode}
                    variant="error"
                    title="// ❌ Extra wrapper div breaks layouts"
                    defaultExpanded={true}
                  />
                  <button
                    onClick={addWrapper}
                    className="rounded bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700"
                  >
                    🧍 Add Another "Third Man" Wrapper
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-800 p-6">
                    <h5 className="mb-3 text-sm font-medium text-slate-400">
                      Flexbox Layout Demo
                    </h5>
                    <div
                      className={`flex gap-4 rounded p-4 ${flexLayoutBroken ? "border border-red-500/50 bg-red-950/30" : "bg-slate-900"}`}
                    >
                      <DemoComponent useFragment={false} />
                      <div className="flex-1 rounded bg-slate-700 p-4 text-slate-300">
                        Space Monkey 3
                      </div>
                    </div>
                    {flexLayoutBroken && (
                      <p className="mt-3 flex items-center gap-2 text-sm text-red-400">
                        <AlertTriangle className="h-4 w-4" />
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
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-emerald-400">
                    ✅ The Fragment Solution
                  </h4>
                  <CodeBlock
                    code={fragmentCode}
                    variant="success"
                    title="// ✅ Fragment: Groups without extra DOM nodes"
                    defaultExpanded={true}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWrapperMode("div")}
                      className={`rounded px-4 py-2 transition-colors ${wrapperMode === "div" ? "bg-yellow-600" : "bg-slate-700 hover:bg-slate-600"}`}
                    >
                      Show Div Wrapper
                    </button>
                    <button
                      onClick={() => setWrapperMode("fragment")}
                      className={`rounded px-4 py-2 transition-colors ${wrapperMode === "fragment" ? "bg-emerald-600" : "bg-slate-700 hover:bg-slate-600"}`}
                    >
                      Show Fragment
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-800 p-6">
                    <h5 className="mb-3 text-sm font-medium text-slate-400">
                      Live Preview
                    </h5>
                    <div className="flex gap-4 rounded bg-slate-900 p-4">
                      <DemoComponent useFragment={wrapperMode === "fragment"} />
                      <div className="flex-1 rounded bg-slate-700 p-4 text-slate-300">
                        Space Monkey 3
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="rounded bg-slate-900/50 p-3">
                        <div className="text-slate-400">Wrapper Type</div>
                        <div
                          className={
                            wrapperMode === "div"
                              ? "text-yellow-400"
                              : "text-emerald-400"
                          }
                        >
                          {wrapperMode === "div"
                            ? "div (extra node)"
                            : "<> (fragment)"}
                        </div>
                      </div>
                      <div className="rounded bg-slate-900/50 p-3">
                        <div className="text-slate-400">DOM Nodes</div>
                        <div className="text-slate-300">
                          {wrapperMode === "div" ? "3" : "2"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {chapter === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-yellow-400">
                    ❌ Div Wrapper (Breaks Layout)
                  </h4>
                  <CodeBlock
                    code={comparisonCodeDiv}
                    variant="error"
                    title="// ❌ Wrapper div breaks flex parent expectations"
                    defaultExpanded={true}
                  />
                  <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                    <p className="text-sm text-red-300">
                      The extra div becomes a flex item itself, causing
                      unexpected spacing and alignment issues.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-emerald-400">
                    ✅ Fragment (Clean Structure)
                  </h4>
                  <CodeBlock
                    code={comparisonCodeFragment}
                    variant="success"
                    title="// ✅ Fragment maintains parent layout"
                    defaultExpanded={true}
                  />
                  <div className="rounded border border-emerald-500/30 bg-emerald-950/20 p-4">
                    <p className="text-sm text-emerald-300">
                      Fragment groups children without adding a DOM node,
                      preserving flexbox layout rules.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-700 pt-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={resetDemo}
                    className="rounded bg-slate-700 px-4 py-2 text-white transition-colors hover:bg-slate-600"
                  >
                    🔄 Reset Demo
                  </button>
                  <div className="text-sm text-slate-400">
                    Leaked wrapper divs:{" "}
                    <span className="font-mono text-yellow-400">
                      {leakedWrappers}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {chapter === 4 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-500" />
                  <h4 className="text-lg font-medium">
                    Clean Implementation with Fragments
                  </h4>
                </div>
                <CodeBlock
                  code={cleanCode}
                  variant="success"
                  title="// ✅ Clean component using multiple fragments"
                  defaultExpanded={true}
                  language="jsx"
                />
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded bg-slate-900/50 p-4">
                      <div className="mb-2 font-medium text-emerald-400">
                        DOM Efficiency
                      </div>
                      <div className="font-mono text-3xl font-bold text-emerald-300">
                        0
                      </div>
                      <div className="text-sm text-slate-400">
                        extra wrapper nodes
                      </div>
                    </div>
                    <div className="rounded bg-slate-900/50 p-4">
                      <div className="mb-2 font-medium text-emerald-400">
                        Layout Integrity
                      </div>
                      <div className="text-3xl font-bold text-emerald-300">
                        ✓
                      </div>
                      <div className="text-sm text-slate-400">
                        CSS rules preserved
                      </div>
                    </div>
                    <div className="rounded bg-slate-900/50 p-4">
                      <div className="mb-2 font-medium text-emerald-400">
                        Semantic Value
                      </div>
                      <div className="text-3xl font-bold text-emerald-300">
                        ✓
                      </div>
                      <div className="text-sm text-slate-400">
                        clean HTML structure
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Navigation */}
        <nav className="mt-8 flex items-center justify-between md:mt-12">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="flex items-center gap-2 rounded-lg bg-rose-700 px-5 py-3 text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
            Previous
          </button>

          <div className="flex flex-col items-center">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-sm text-slate-400">Chapter</span>
              <span className="font-mono font-bold text-rose-400">
                {chapter + 1}
              </span>
              <span className="text-sm text-slate-400">of</span>
              <span className="font-mono font-bold">{chapters.length}</span>
            </div>
            <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-rose-500 transition-all duration-300"
                style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={() =>
              setChapter(Math.min(chapters.length - 1, chapter + 1))
            }
            disabled={chapter === chapters.length - 1}
            className="flex items-center gap-2 rounded-lg bg-rose-700 px-5 py-3 text-white transition-colors hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
            <Plus className="h-4 w-4" />
          </button>
        </nav>
      </main>
    </div>
  );
}
