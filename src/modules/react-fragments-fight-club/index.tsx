import { useState, useEffect } from "react";
import { Code2, AlertTriangle, Check, Shield, Users } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeComparison } from "@/components/common/CodeComparison";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
}

export default function ReactFragmentsFightClub() {
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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      <ModuleHeader
        icon={Code2}
        title="Fight Club"
        subtitle="The Narrator/Tyler Durden • 1999"
        concept="React Fragments"
        themeColor="rose"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Status Card */}
              <div className="rounded-xl border border-rose-500/20 bg-slate-900/60 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-lg font-bold text-rose-100">
                  Project Mayhem Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-slate-400">
                      Leaked Wrappers
                    </h4>
                    <div className="flex items-end gap-2">
                      <span className="font-mono text-3xl font-bold text-rose-400">
                        {leakedWrappers}
                      </span>
                      <span className="mb-1 text-xs text-slate-500">
                        / 50 (Circuit Breaker)
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full bg-rose-500 transition-all duration-300"
                        style={{ width: `${(leakedWrappers / 50) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Metaphor Map */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-200">
                  <Shield className="h-5 w-5 text-rose-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Wrapper Div</span>
                    <span className="text-sm font-medium text-rose-300">
                      The Third Man
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Fragment</span>
                    <span className="text-sm font-medium text-emerald-300">
                      Integrated Self
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Flex Layout</span>
                    <span className="text-sm font-medium text-slate-300">
                      Social Structure
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Insight */}
              <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-rose-300">
                  <Check className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-rose-200/80">
                  {chapter === 0 &&
                    "A component can only return one root element, just as you can only be one person at a time."}
                  {chapter === 1 &&
                    "Wrapping elements in a div creates a 'Third Man' that breaks layout structures."}
                  {chapter === 2 &&
                    "Fragments (<>...</>) allow you to group elements without adding a node to the DOM."}
                  {chapter === 3 &&
                    "Fragments preserve the parent's layout rules (like Flexbox or Grid) by being invisible."}
                  {chapter === 4 &&
                    "The cleanest structures have nothing extra. No wrapper divs, no layout breakage."}
                </p>
              </div>

              {/* Quote */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "It's only after we've lost everything that we're free to do
                  anything."
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Tyler Durden
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-rose-100 sm:text-3xl">
              {currentChapter.title}
            </h2>
            <p className="leading-relaxed text-slate-300">
              {currentChapter.content}
            </p>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-rose-500/20 bg-slate-900/40 p-6 backdrop-blur-sm sm:mb-12 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-rose-500"></div>
              <h3 className="text-xl font-bold text-rose-200">
                Interactive Demonstration
              </h3>
            </div>

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <h4 className="text-lg font-medium text-red-200">
                      The Problem: Adjacent JSX Elements
                    </h4>
                  </div>
                  <CodeBlock
                    code={errorCode}
                    language="tsx"
                    title="// ❌ Syntax Error: Adjacent JSX elements must be wrapped"
                    defaultExpanded={true}
                  />
                  <div className="mt-4 rounded border border-red-500/50 bg-red-950/30 p-4">
                    <p className="flex items-center gap-2 text-red-300">
                      <AlertTriangle className="h-4 w-4" />
                      Console Error: "Adjacent JSX elements must be wrapped in
                      an enclosing tag"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-yellow-400">
                      ❌ The Third Man (div wrapper)
                    </h4>
                    <CodeBlock
                      code={divWrapperCode}
                      language="tsx"
                      title="// ❌ Extra wrapper div breaks layouts"
                      defaultExpanded={true}
                    />
                    <button
                      onClick={addWrapper}
                      className="w-full rounded bg-yellow-600 px-4 py-2 text-white transition-colors hover:bg-yellow-700"
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
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-emerald-400">
                      ✅ The Fragment Solution
                    </h4>
                    <CodeBlock
                      code={fragmentCode}
                      language="tsx"
                      title="// ✅ Fragment: Groups without extra DOM nodes"
                      defaultExpanded={true}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => setWrapperMode("div")}
                        className={`flex-1 rounded px-4 py-2 transition-colors ${wrapperMode === "div" ? "bg-yellow-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
                      >
                        Show Div Wrapper
                      </button>
                      <button
                        onClick={() => setWrapperMode("fragment")}
                        className={`flex-1 rounded px-4 py-2 transition-colors ${wrapperMode === "fragment" ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"}`}
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
                        <DemoComponent
                          useFragment={wrapperMode === "fragment"}
                        />
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
                <CodeComparison
                  badCode={comparisonCodeDiv}
                  goodCode={comparisonCodeFragment}
                  language="tsx"
                  themeColor="rose"
                  badLabel="❌ Div Wrapper (Breaks Layout)"
                  goodLabel="✅ Fragment (Clean Structure)"
                  badExplanation="The extra div becomes a flex item itself, causing unexpected spacing and alignment issues."
                  goodExplanation="Fragment groups children without adding a DOM node, preserving flexbox layout rules."
                />

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
                    <h4 className="text-lg font-medium text-emerald-200">
                      Clean Implementation with Fragments
                    </h4>
                  </div>
                  <CodeBlock
                    code={cleanCode}
                    language="tsx"
                    title="// ✅ Clean component using multiple fragments"
                    defaultExpanded={true}
                  />
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                      <div className="rounded bg-slate-900/50 p-4">
                        <div className="mb-2 font-medium text-emerald-400">
                          DOM Efficiency
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-3xl font-bold text-emerald-300">
                            0
                          </span>
                          <Users className="h-5 w-5 text-slate-500" />
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