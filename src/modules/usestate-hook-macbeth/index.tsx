import { useState, useEffect, useRef } from "react";
import { Crown, Shield, CheckCircle, Quote } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function UseStateHookMacbeth(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);

  // Demo State for Chapter 1 (Anti-pattern)
  const [directVar, setDirectVar] = useState<number>(0);
  const directVarRef = useRef<number>(0);
  const [renderCount, setRenderCount] = useState<number>(0);

  // Demo State for Chapter 2 & 4 (Working useState)
  const [count, setCount] = useState<number>(0);
  const [kingState, setKingState] = useState<{
    title: string;
    ambition: number;
  }>({
    title: "Thane of Glamis",
    ambition: 0,
  });

  const chapters: Chapter[] = [
    {
      title: "The Prophecy",
      content: `The witches' prophecy hooks state onto Macbeth. \`useState("king")\` initializes ambition inside him. A static component becomes dynamic, its future now dictated by this internal, mutable data.`,
    },
    {
      title: "The Unmanaged State",
      content: `Without a state mechanism, ambition is a chaotic internal variable. Changing it directly doesn't trigger a re-render. The component appears frozen, unable to reflect its new internal reality—a broken, buggy UI.`,
    },
    {
      title: "The Setter is Summoned",
      content: `Lady Macbeth's persuasion is the setter function: \`setAmbition("actionable")\`. This declarative update cleanly changes the state value. The component re-renders immediately, its actions now driven by the new state.`,
    },
    {
      title: "Two Kings, Two States",
      content: `Compare approaches. Wrong: Ignoring the state hook leads to internal corruption and UI stasis. Right: Using \`useState\` and its setter allows state to cleanly drive the component's narrative and rendered output.`,
    },
    {
      title: "A State of Being",
      content: `The crown is the rendered output. The throne room UI is a direct expression of the managed ambition state. \`useState\` transformed a static noble into a dynamic, state-driven king.`,
    },
  ];

  // Anti-pattern and correct pattern code examples
  const antiPatternCode = `// ❌ Unmanaged State - The Wrong Way
function MacbethComponent() {
  let ambition = "thane"; // Just a variable

  const handleProphecy = () => {
    ambition = "king"; // Changes, but doesn't re-render!
    console.log(ambition); // Logs "king"
  };

  return (
    <div>
      <p>Title: {ambition}</p> {/* Always shows "thane"! */}
      <button onClick={handleProphecy}>Hear Prophecy</button>
    </div>
  );
}`;

  const correctPatternCode = `// ✅ Managed State with useState
function MacbethComponent() {
  const [ambition, setAmbition] = useState("thane"); // Hook with initial state

  const handleProphecy = () => {
    setAmbition("king"); // Declarative update triggers re-render
  };

  return (
    <div>
      <p>Title: {ambition}</p> {/* Updates to "king" on click! */}
      <button onClick={handleProphecy}>Hear Prophecy</button>
    </div>
  );
}`;

  const complexStateCode = `// ✅ Complex State Driving UI
function KingMacbeth() {
  const [state, setState] = useState({
    title: "Thane",
    ambition: 0,
    actions: [] as string[],
  });

  const seizePower = () => {
    setState(prev => ({
      title: "King",
      ambition: prev.ambition + 10,
      actions: [...prev.actions, "Seized the throne"],
    }));
  };
  // UI renders based on state.title, state.actions, etc.
}`;

  // Effect to increment render count for demo
  useEffect(() => {
    setRenderCount((c) => c + 1);
  }, [count, directVar, kingState]);

  // Function to demonstrate the anti-pattern (Chapter 1)
  const incrementDirectVar = () => {
    directVarRef.current += 1;
    setDirectVar(directVarRef.current); // Force a re-render to show the ref value
  };

  const resetDemos = () => {
    setDirectVar(0);
    directVarRef.current = 0;
    setCount(0);
    setKingState({ title: "Thane of Glamis", ambition: 0 });
    setRenderCount(0);
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Crown}
        title="Macbeth"
        subtitle="The Scottish Play, c. 1606"
        concept="React Concept: useState Hook"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* 1. Interactive Controls */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 text-lg font-bold text-amber-200">
                  Demo Controls
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm text-slate-400">
                      Ambition Level
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={kingState.ambition}
                      onChange={(e) =>
                        setKingState((prev) => ({
                          ...prev,
                          ambition: parseInt(e.target.value),
                        }))
                      }
                      className="h-2 w-full appearance-none rounded-lg bg-slate-700 accent-amber-500"
                    />
                    <div className="mt-1 text-center text-xs text-amber-300">
                      {kingState.ambition}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded bg-slate-800/30 p-3 text-center">
                      <div className="text-xs text-slate-500">
                        Total Renders
                      </div>
                      <div className="font-mono text-xl tabular-nums">
                        {renderCount}
                      </div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3 text-center">
                      <div className="text-xs text-slate-500">
                        Current Title
                      </div>
                      <div className="font-medium">{kingState.title}</div>
                    </div>
                  </div>
                  <button
                    onClick={resetDemos}
                    className="w-full rounded bg-slate-700 px-3 py-2 text-sm hover:bg-slate-600 active:scale-95"
                  >
                    Reset All Demos
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
                    <span className="text-sm text-slate-400">
                      Macbeth (Thane)
                    </span>
                    <span className="text-sm font-medium">
                      Functional Component
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">
                      Witches' Prophecy
                    </span>
                    <span className="text-sm font-medium">useState() call</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">
                      Ambition for the Throne
                    </span>
                    <span className="text-sm font-medium">State Variable</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">
                      Lady Macbeth's Push
                    </span>
                    <span className="text-sm font-medium">Setter Function</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">
                      Murder, Tyranny
                    </span>
                    <span className="text-sm font-medium">
                      Re-renders & Side Effects
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">
                      The Misty Heath
                    </span>
                    <span className="text-sm font-medium">
                      Component Context
                    </span>
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
                  {chapter === 0 &&
                    "`useState` hooks state onto a component, transforming it from static to dynamic."}
                  {chapter === 1 &&
                    "Changing a regular variable doesn't trigger a re-render. You need the state hook."}
                  {chapter === 2 &&
                    "The setter function provides the only proper way to update state and cause a re-render."}
                  {chapter === 3 &&
                    "Managed state drives predictable UI updates. Unmanaged state causes bugs and staleness."}
                  {chapter === 4 &&
                    "A component's rendered output (UI) is a direct expression of its current state."}
                </p>
              </div>

              {/* 4. Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm text-slate-400 italic">
                  "I am settled, and bend up each corporal agent to this
                  terrible feat."
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Macbeth, Act I, Scene VII
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

            {/* Chapter 0: The Prophecy - Intro */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-bold text-amber-100">
                      The Prophecy (Initial State)
                    </h4>
                    <p className="text-sm text-slate-400">
                      The hook is called, initializing the state. The component
                      now possesses internal data.
                    </p>
                    <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-4">
                      <div className="font-mono text-sm">
                        <span className="text-amber-400">const </span>
                        <span className="text-cyan-300">[title, setTitle]</span>
                        <span className="text-amber-400"> = </span>
                        <span className="text-purple-300">useState</span>
                        <span className="text-slate-300">(</span>
                        <span className="text-green-400">
                          "Thane of Glamis"
                        </span>
                        <span className="text-slate-300">)</span>
                        <span className="text-slate-500">;</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-900/50 p-6">
                    <div className="mb-4 text-4xl">👑</div>
                    <div className="text-center">
                      <div className="text-xs text-slate-500 uppercase">
                        Current Title
                      </div>
                      <div className="text-2xl font-bold text-amber-300">
                        Thane of Glamis
                      </div>
                    </div>
                  </div>
                </div>
                <CodeBlock
                  code={`// The useState hook declaration
const [title, setTitle] = useState("Thane of Glamis");
const [ambition, setAmbition] = useState(0);`}
                  language="tsx"
                  variant="default"
                  title="useState: Declaring State"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 1: Unmanaged State - Anti-pattern */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-red-500/30 bg-red-950/10 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-full bg-red-500/20 px-3 py-1 text-sm font-bold text-red-300">
                      ❌ Anti-Pattern Demo
                    </div>
                  </div>
                  <p className="mb-4 text-sm text-slate-400">
                    Click "Hear Prophecy". The variable updates internally
                    (check console), but the UI does <strong>not</strong>{" "}
                    re-render to show the new value.
                  </p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={incrementDirectVar}
                          className="rounded bg-red-700 px-4 py-2 font-bold hover:bg-red-600 active:scale-95"
                        >
                          Hear Prophecy
                        </button>
                        <div className="text-sm text-slate-500">
                          Variable: {directVarRef.current}
                        </div>
                      </div>
                      <div className="rounded border border-slate-700 bg-slate-900 p-4 text-center">
                        <div className="text-xs text-slate-500">
                          Rendered Title (Stale)
                        </div>
                        <div className="text-2xl font-bold text-red-400">
                          Thane #{directVar}
                        </div>
                        <div className="mt-2 text-xs text-red-500/80">
                          UI not updating!
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded bg-slate-800/50 p-3">
                        <div className="text-xs text-slate-500">
                          Internal Variable (Ref)
                        </div>
                        <div className="font-mono text-xl text-red-300 tabular-nums">
                          {directVarRef.current}
                        </div>
                      </div>
                      <div className="rounded bg-slate-800/50 p-3">
                        <div className="text-xs text-slate-500">
                          UI Variable (State)
                        </div>
                        <div className="font-mono text-xl text-amber-300 tabular-nums">
                          {directVar}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        The ref updates instantly. The state only updates when
                        we force it, proving the disconnect.
                      </div>
                    </div>
                  </div>
                </div>
                <CodeBlock
                  code={antiPatternCode}
                  language="tsx"
                  variant="error"
                  title="// ❌ Bug: Changing a variable doesn't re-render"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 2: The Setter - Solution */}
            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="rounded-full bg-amber-500/20 px-3 py-1 text-sm font-bold text-amber-300">
                      ✅ Setter Function Demo
                    </div>
                  </div>
                  <p className="mb-4 text-sm text-slate-400">
                    Click "Seize Power". The <code>setCount</code> function
                    updates the state, triggering an immediate re-render.
                  </p>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <button
                        onClick={() => setCount((c) => c + 1)}
                        className="w-full rounded bg-amber-700 px-4 py-3 text-lg font-bold hover:bg-amber-600 active:scale-95"
                      >
                        Seize Power (+1 Ambition)
                      </button>
                      <div className="rounded border border-amber-500/30 bg-amber-950/20 p-4 text-center">
                        <div className="text-xs text-amber-500/80 uppercase">
                          Ambition Level
                        </div>
                        <div className="text-5xl font-bold text-amber-300 tabular-nums">
                          {count}
                        </div>
                        <div className="mt-2 text-sm text-amber-200/80">
                          {count === 0 && "Loyal General"}
                          {count > 0 && count < 5 && "Ambitious Thane"}
                          {count >= 5 && count < 10 && "Usurper"}
                          {count >= 10 && "King Macbeth"}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded bg-slate-800/50 p-3">
                        <div className="text-xs text-slate-500">
                          Component Re-renders
                        </div>
                        <div className="font-mono text-2xl text-cyan-300 tabular-nums">
                          {renderCount}
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">
                        Each click calls <code>setCount</code>, updating state
                        and causing a re-render. The UI always reflects the
                        current state.
                      </div>
                    </div>
                  </div>
                </div>
                <CodeBlock
                  code={`// The setter function in action
const [ambition, setAmbition] = useState(0);

const handleSeizePower = () => {
  // ✅ Correct: Using the setter function
  setAmbition(prevAmbition => prevAmbition + 1);
  // Triggers re-render, UI updates
};`}
                  language="tsx"
                  variant="success"
                  title="✅ Correct: Using the Setter Function"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 3: Two Kings - Comparison */}
            {chapter === 3 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={correctPatternCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ The Suppressed General (Buggy)"
                  goodLabel="✅ The Sovereign King (Correct)"
                  badExplanation="Variable changes internally but UI stays stale. Component is dysfunctional."
                  goodExplanation="Setter function updates state, triggering re-renders. UI reflects state accurately."
                />
                <div className="grid gap-4 rounded-lg border border-slate-700 bg-slate-900/50 p-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="font-bold text-red-300">
                        Without useState
                      </div>
                    </div>
                    <ul className="list-inside list-disc space-y-1 text-sm text-slate-400">
                      <li>Internal data ≠ UI</li>
                      <li>No re-render triggers</li>
                      <li>Buggy, unpredictable component</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <div className="font-bold text-amber-300">
                        With useState
                      </div>
                    </div>
                    <ul className="list-inside list-disc space-y-1 text-sm text-slate-400">
                      <li>State drives UI</li>
                      <li>Declarative updates via setter</li>
                      <li>Predictable, reactive component</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 4: A State of Being - Complex State */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-6">
                  <div className="mb-4">
                    <h4 className="font-bold text-amber-100">
                      The King's State Drives Everything
                    </h4>
                    <p className="text-sm text-slate-400">
                      The UI below is rendered entirely from the single{" "}
                      <code>kingState</code> object. Changing any part updates
                      the whole component.
                    </p>
                  </div>
                  <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                      <div className="text-center">
                        <div className="text-3xl">👑</div>
                        <div className="mt-2 text-xs text-slate-500 uppercase">
                          Title
                        </div>
                        <div
                          className={`text-xl font-bold ${kingState.ambition > 50 ? "text-amber-300" : "text-slate-300"}`}
                        >
                          {kingState.ambition > 50
                            ? "King of Scotland"
                            : kingState.title}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                      <div>
                        <div className="text-xs text-slate-500 uppercase">
                          Ambition Level
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-700">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400"
                              style={{
                                width: `${Math.min(100, kingState.ambition)}%`,
                              }}
                            ></div>
                          </div>
                          <span className="font-mono tabular-nums">
                            {kingState.ambition}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">
                          Royal Actions
                        </div>
                        <div className="mt-2 space-y-1">
                          {kingState.ambition > 20 && (
                            <div className="text-sm">
                              🔪 Met with Three Witches
                            </div>
                          )}
                          {kingState.ambition > 40 && (
                            <div className="text-sm">
                              ⚔️ Ordered Duncan's Murder
                            </div>
                          )}
                          {kingState.ambition > 60 && (
                            <div className="text-sm">🏰 Crowned at Scone</div>
                          )}
                          {kingState.ambition > 80 && (
                            <div className="text-sm">👥 Purged the Nobles</div>
                          )}
                          {kingState.ambition <= 20 && (
                            <div className="text-sm text-slate-600">
                              - No decisive actions -
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <button
                        onClick={() =>
                          setKingState((prev) => ({
                            ...prev,
                            ambition: prev.ambition + 15,
                          }))
                        }
                        className="w-full rounded bg-amber-700 px-4 py-2 font-bold hover:bg-amber-600"
                      >
                        Feed Ambition (+15)
                      </button>
                      <button
                        onClick={() =>
                          setKingState({
                            title: "Thane of Glamis",
                            ambition: 0,
                          })
                        }
                        className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                      >
                        Reset Kingship
                      </button>
                      <div className="rounded bg-slate-800/30 p-3 text-center">
                        <div className="text-xs text-slate-500">
                          State-Driven Renders
                        </div>
                        <div className="font-mono text-xl text-cyan-300 tabular-nums">
                          {renderCount}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CodeBlock
                  code={complexStateCode}
                  language="tsx"
                  variant="success"
                  title="✅ Complex State Object Driving UI"
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
