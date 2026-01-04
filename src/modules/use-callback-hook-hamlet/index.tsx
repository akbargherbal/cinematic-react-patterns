import { useState, useCallback, useRef, useEffect, memo } from "react";
import { Drama, Shield, CheckCircle, Quote, RotateCcw } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

// Memoized Child Component for demos
const Player = memo<{ onPerform: () => void; name: string; renderCount: React.MutableRefObject<number> }>(
  function Player({ onPerform, name, renderCount }) {
    renderCount.current++;
    return (
      <div className="rounded border border-amber-500/30 bg-amber-950/10 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-bold text-amber-300">{name}</div>
            <div className="text-sm text-slate-400">Renders: {renderCount.current}</div>
          </div>
          <button
            onClick={onPerform}
            className="rounded bg-amber-700 px-3 py-1 text-sm font-medium hover:bg-amber-600"
          >
            Perform Gesture
          </button>
        </div>
      </div>
    );
  }
);

export default function UseCallbackHookHamlet(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<"improvised" | "memoized">("improvised");
  const [parentRenderCount, setParentRenderCount] = useState(0);
  const playerRenderCount = useRef(0);
  const [gesture, setGesture] = useState<string>("(Gesture ready)");
  const [performances, setPerformances] = useState(0);

  const triggerParentRender = () => {
    setParentRenderCount((c) => c + 1);
    setGesture(demoMode === "improvised" ? `Gesture #${parentRenderCount + 1}` : "Fixed Gesture");
  };

  const resetDemo = useCallback(() => {
    setParentRenderCount(0);
    playerRenderCount.current = 0;
    setPerformances(0);
    setGesture("(Gesture ready)");
  }, []);

  // Circuit breaker for render count
  useEffect(() => {
    if (playerRenderCount.current > 50) {
      alert("⚡ Safety Limit: Too many re-renders. Resetting demo.");
      resetDemo();
    }
  }, [playerRenderCount.current, resetDemo]);

  // Anti-pattern: new function on every parent render
  const improvisedCallback = () => {
    setPerformances((p) => p + 1);
    console.log("Improvised gesture performed");
  };

  // Correct pattern: memoized callback
  const memoizedCallback = useCallback(() => {
    setPerformances((p) => p + 1);
    console.log("Memoized gesture performed");
  }, []);

  const currentCallback = demoMode === "improvised" ? improvisedCallback : memoizedCallback;

  const chapters: Chapter[] = [
    {
      title: "The Instruction",
      content: "Hamlet defines a precise hand gesture—a **fixed point** for the Players to follow. In React, this is a **callback function**. When passed to a child component, its stability determines performance.",
    },
    {
      title: "The Unstable Reference",
      content: "Without a stable reference, the Players improvise the gesture **differently each rehearsal**. This is the anti-pattern: a new function instance on every render, causing **unnecessary child re-renders**.",
    },
    {
      title: "The Fixed Point",
      content: "Hamlet returns to the **exact hand position**, memoizing the instruction. `useCallback` does this: it returns the **same function instance** unless dependencies change, stabilizing the reference.",
    },
    {
      title: "Decided Once",
      content: "**Chaos vs. Coordination.** Improvised callbacks waste renders re-deciding logic. A memoized callback is **decided once**, enabling efficient, unified performance in child components.",
    },
    {
      title: "The Performance",
      content: "The play succeeds because the gesture **did not change**. Similarly, `useCallback` optimizes apps by providing stable function references, preventing wasteful re-renders and ensuring smooth execution.",
    },
  ];

  const currentChapter = chapters[chapter];

  // Code examples
  const antiPatternCode = `// ❌ IMPROVISED (New function each render)
function Hamlet() {
  const [count, setCount] = useState(0);

  const handleGesture = () => { // <-- NEW INSTANCE EVERY TIME
    console.log("Perform gesture");
  };

  return <Player onPerform={handleGesture} />;
}`;

  const correctPatternCode = `// ✅ MEMOIZED (Stable reference)
function Hamlet() {
  const [count, setCount] = useState(0);

  const handleGesture = useCallback(() => { // <-- SAME INSTANCE
    console.log("Perform gesture");
  }, []); // <- Empty deps: never changes

  return <Player onPerform={handleGesture} />;
}`;

  const introExampleCode = `// Hamlet (Parent Component)
function Director() {
  // The callback - the instruction
  const instructPlayers = () => {
    console.log("Hand gesture: palm down, fingers relaxed");
  };

  return <Troupe onPerform={instructPlayers} />;
}`;

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Drama}
        title="Hamlet"
        subtitle="The Players, 1600"
        concept="React Concept: useCallback Hook"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* 1. Interactive Controls */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Drama className="h-5 w-5 text-amber-400" />
                  Rehearsal Controls
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDemoMode("improvised")}
                      className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors ${demoMode === "improvised" ? "bg-red-600 hover:bg-red-700" : "bg-slate-800 hover:bg-slate-700"}`}
                    >
                      ❌ Improvised
                    </button>
                    <button
                      onClick={() => setDemoMode("memoized")}
                      className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors ${demoMode === "memoized" ? "bg-amber-600 hover:bg-amber-700" : "bg-slate-800 hover:bg-slate-700"}`}
                    >
                      ✅ Memoized
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-400">Parent Renders</div>
                      <div className="font-mono text-xl">{parentRenderCount}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-400">Player Renders</div>
                      <div className="font-mono text-xl">{playerRenderCount.current}</div>
                    </div>
                  </div>
                  <button
                    onClick={resetDemo}
                    className="flex w-full items-center justify-center gap-2 rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset Rehearsal
                  </button>
                </div>
              </div>

              {/* 2. Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hamlet</span>
                    <span className="text-sm font-medium">Parent Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Players</span>
                    <span className="text-sm font-medium">Child Components</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hamlet's Instructions</span>
                    <span className="text-sm font-medium">Callback Function</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Exact Hand Gesture</span>
                    <span className="text-sm font-medium">Memoized Instance</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Instruction Purpose</span>
                    <span className="text-sm font-medium">Dependencies Array</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Players Improvising</span>
                    <span className="text-sm font-medium">Unnecessary Re-renders</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Chaotic Rehearsals</span>
                    <span className="text-sm font-medium">Poor Performance</span>
                  </div>
                  <div className="flex justify-between border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Smooth Performance</span>
                    <span className="text-sm font-medium">Optimized App</span>
                  </div>
                </div>
              </div>

              {/* 3. Key Insight Card */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "A callback function is an instruction. Its stability determines child component performance."}
                  {chapter === 1 && "Without useCallback, functions are recreated on every render, causing wasteful child re-renders."}
                  {chapter === 2 && "useCallback memoizes a function, returning the same instance unless dependencies change."}
                  {chapter === 3 && "Stable function references prevent unnecessary re-renders in memoized child components."}
                  {chapter === 4 && "useCallback optimizes performance by ensuring callbacks only change when their logic changes."}
                </p>
              </div>

              {/* 4. Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && `"Nor do not saw the air too much with your hand, thus; but use all gently:"`}
                  {chapter === 1 && `"Was it 'thus' or 'so'?"`}
                  {chapter === 2 && `"Return to that same point each time you play, unless the very purpose of the scene changes."`}
                  {chapter === 3 && `"With a fixed instruction, the action is decided once."`}
                  {chapter === 4 && `"The play's success was built on a gesture that did not change."`}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — {chapter === 2 || chapter === 4 ? "Hamlet" : "The Players"}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-3xl font-bold text-amber-100">{currentChapter.title}</h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Interactive Rehearsal
              </h3>
            </div>

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-4">
                      <div className="mb-2 font-bold text-amber-300">The Instruction (Callback)</div>
                      <div className="font-mono text-lg">{gesture}</div>
                    </div>
                    <button
                      onClick={triggerParentRender}
                      className="w-full rounded bg-amber-700 px-4 py-3 font-medium hover:bg-amber-600"
                    >
                      Change Parent State (Re-render Hamlet)
                    </button>
                    <div className="text-sm text-slate-400">
                      Each click simulates a parent re-render. Watch what happens to the Player's render count.
                    </div>
                  </div>
                  <div>
                    <Player
                      onPerform={currentCallback}
                      name="Player 1"
                      renderCount={playerRenderCount}
                    />
                  </div>
                </div>
                <CodeBlock
                  code={introExampleCode}
                  language="tsx"
                  variant="default"
                  title="// Defining and passing a callback"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-red-500/30 bg-red-950/10 p-4">
                  <div className="flex items-center gap-2 text-red-300">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                    <div className="font-bold">Chaotic Rehearsal (Anti-Pattern)</div>
                  </div>
                  <div className="mt-2 text-sm text-red-300/80">
                    Player re-renders every time Hamlet re-renders, even though the gesture logic hasn't changed.
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="mb-4 space-y-4">
                      <button
                        onClick={triggerParentRender}
                        className="w-full rounded bg-slate-700 px-4 py-3 hover:bg-slate-600"
                      >
                        Trigger Parent Re-render
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded bg-slate-800/50 p-3">
                          <div className="text-xs text-slate-400">Parent Renders</div>
                          <div className="font-mono text-2xl">{parentRenderCount}</div>
                        </div>
                        <div className="rounded bg-red-950/30 p-3">
                          <div className="text-xs text-red-400">Player Renders</div>
                          <div className="font-mono text-2xl text-red-400">{playerRenderCount.current}</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-slate-400">
                      <span className="font-medium text-red-400">Problem:</span> The Player re-renders just because Hamlet does, even though the callback does the same thing.
                    </div>
                  </div>
                  <div>
                    <Player
                      onPerform={currentCallback}
                      name="Player 1"
                      renderCount={playerRenderCount}
                    />
                    <div className="mt-4 text-sm text-slate-400">
                      Performances: <span className="font-mono">{performances}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-4">
                  <div className="flex items-center gap-2 text-amber-300">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <div className="font-bold">Fixed Point (Solution)</div>
                  </div>
                  <div className="mt-2 text-sm text-amber-300/80">
                    The callback is now memoized with useCallback. Player only re-renders when the callback actually changes.
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <button
                      onClick={triggerParentRender}
                      className="mb-4 w-full rounded bg-amber-700 px-4 py-3 hover:bg-amber-600"
                    >
                      Trigger Parent Re-render
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded bg-slate-800/50 p-3">
                        <div className="text-xs text-slate-400">Parent Renders</div>
                        <div className="font-mono text-2xl">{parentRenderCount}</div>
                      </div>
                      <div className="rounded bg-amber-950/30 p-3">
                        <div className="text-xs text-amber-400">Player Renders</div>
                        <div className="font-mono text-2xl text-amber-400">{playerRenderCount.current}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Player
                      onPerform={currentCallback}
                      name="Player 1"
                      renderCount={playerRenderCount}
                    />
                    <div className="mt-4 text-sm text-slate-400">
                      Performances: <span className="font-mono">{performances}</span>
                    </div>
                  </div>
                </div>
                <CodeBlock
                  code={correctPatternCode}
                  language="tsx"
                  variant="success"
                  title="// ✅ useCallback stabilizes the function reference"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <div className="text-center text-lg font-bold text-amber-200">
                  Side-by-Side Comparison
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-500/30 bg-red-950/10 p-4">
                      <div className="mb-2 font-bold text-red-300">❌ Improvised</div>
                      <div className="text-sm text-red-300/80">New function every render</div>
                    </div>
                    <div className="rounded bg-red-950/20 p-4">
                      <div className="mb-2 font-mono text-red-400">Player Renders: {demoMode === "improvised" ? playerRenderCount.current : "N/A"}</div>
                      <div className="text-sm text-red-400/70">Re-renders with parent</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-4">
                      <div className="mb-2 font-bold text-amber-300">✅ Memoized</div>
                      <div className="text-sm text-amber-300/80">Stable function reference</div>
                    </div>
                    <div className="rounded bg-amber-950/20 p-4">
                      <div className="mb-2 font-mono text-amber-400">Player Renders: {demoMode === "memoized" ? playerRenderCount.current : "N/A"}</div>
                      <div className="text-sm text-amber-400/70">Only re-renders if props change</div>
                    </div>
                  </div>
                </div>
                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={correctPatternCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Without useCallback"
                  goodLabel="✅ With useCallback"
                  badExplanation="New function instance on every parent render causes unnecessary child re-renders"
                  goodExplanation="Memoized function maintains same reference, preventing wasteful re-renders"
                />
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-4">
                  <div className="flex items-center gap-2 text-amber-300">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <div className="font-bold">Flawless Performance</div>
                  </div>
                  <div className="mt-2 text-sm text-amber-300/80">
                    With a stable callback, the Player component renders minimally, optimizing performance.
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg bg-slate-800/40 p-4">
                      <div className="text-sm text-slate-400">Performance Metrics</div>
                      <div className="mt-2 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-300">Parent Re-renders</span>
                          <span className="font-mono">{parentRenderCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Player Re-renders</span>
                          <span className="font-mono text-amber-400">{playerRenderCount.current}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-300">Gesture Performances</span>
                          <span className="font-mono">{performances}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={triggerParentRender}
                      className="w-full rounded bg-amber-700 px-4 py-3 font-medium hover:bg-amber-600"
                    >
                      Simulate App Activity (Re-render Parent)
                    </button>
                  </div>
                  <div>
                    <Player
                      onPerform={currentCallback}
                      name="Player 1"
                      renderCount={playerRenderCount}
                    />
                    <div className="mt-4 text-sm text-slate-400">
                      Notice how Player re-renders stay low despite parent activity, thanks to useCallback.
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-slate-900/60 p-4">
                  <div className="text-sm text-slate-300">
                    <span className="font-bold text-amber-300">The Takeaway:</span> useCallback prevents wasteful re-renders in memoized child components by stabilizing function references. Use it when passing callbacks to optimized children that depend on referential equality.
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
            themeColor="amber"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}