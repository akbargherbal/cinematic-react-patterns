import { useState, useEffect, useCallback, useMemo } from "react";
import { Clock, AlertCircle, CheckCircle, RotateCcw, Zap } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface SideEffect {
  id: number;
  action: string;
  timestamp: number;
}

interface Skill {
  id: number;
  name: string;
  level: number;
}

export default function GroundhogDayRerendering() {
  const [chapter, setChapter] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [isPure, setIsPure] = useState(false);
  const [sideEffects, setSideEffects] = useState<SideEffect[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLooping, setIsLooping] = useState(false);

  // Demonstrate render counting
  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  });

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "The Loop Begins",
        content:
          'The radio alarm clicks on at 6:00 AM. Phil Connors opens his eyes to the same wooden headboard, the same floral wallpaper, the same February 2nd in Punxsutawney, Pennsylvania. Again.\n\nThis is Phil\'s render cycle. Every morning, React calls his component function with the same props: { date: "February 2nd", location: "Punxsutawney", role: "weatherman" }. The props never change. They\'re immutable, frozen in time like the town itself.\n\nBut Phil—the component—must execute. Must render. Must return something to display on the screen of this strange, looping existence.\n\nIn React, components don\'t render once and disappear. They\'re called repeatedly—when props change, when state updates, when a parent re-renders. A component must be ready to execute its render function at any moment, potentially dozens or hundreds of times during an application\'s lifecycle.',
      },
      {
        id: "build",
        title: "Chaos in the Render",
        content:
          "Phil discovers the intoxicating power of side effects.\n\nOn his tenth loop (tenth render), he walks into the bank and watches the armored car guard drop a bag of money. He notes the exact time, the exact location. The next render, he's there waiting. He picks up the bag and walks away. No consequences. The day resets. The money disappears. But the knowledge remains.\n\nThis is a side effect in the render function: reaching outside the component to manipulate external state.\n\nIn React, the render function should be pure. Given the same props and state, it should always return the same output. It shouldn't make API calls, mutate global variables, or manipulate the DOM directly. These are side effects, and they belong in useEffect, event handlers, or other designated places—not in the render body.\n\nHere's the insidious thing about side effects in render functions: they compound.",
      },
      {
        id: "climax",
        title: "The Breaking Point",
        content:
          "Phil stands on the edge of a building, looking down at the town square. He's rendered this day thousands of times. He knows every crack in the sidewalk, every word of every conversation, every moment of every hour.\n\nAnd he's broken.\n\nThis is what happens when a component is stuck in an infinite render loop with impure side effects. The developer loses their mind trying to debug it. The application becomes unpredictable. The user experience is a nightmare.\n\nYou cannot escape a render cycle through side effects. You can only make it worse.\n\nThe universe—React's reconciliation engine—is trying to tell him something: Your render function must be pure. I cannot let you progress until you understand this.",
      },
      {
        id: "resolution",
        title: "Pure Transformation",
        content:
          "The radio alarm clicks on. 6:00 AM. February 2nd.\n\nPhil opens his eyes, and for the first time in thousands of renders, he doesn't reach for a side effect.\n\nHe starts learning piano. But here's the key difference: he's not learning piano to manipulate Rita. He's learning piano because he wants to learn piano. This is proper state management—updating his internal state (skills, knowledge) through legitimate means, not through render-time side effects.\n\nPhil's day becomes beautiful. Same props (February 2nd), same render call, but now the output is pure. He's not reaching outside his boundaries. He's not mutating external state. He's just rendering—cleanly, predictably, genuinely.\n\nThat night, he goes to sleep next to Rita, and for the first time in thousands of renders, he's not trying to force an outcome. He's just... being. Rendering purely.\n\nThe next morning, the radio alarm clicks on. And it's February 3rd.\n\nThe render cycle completes when the component is pure.",
      },
      {
        id: "summary",
        title: "The Pattern Revealed",
        content:
          "Let's make the mapping explicit. Let's see Phil's journey as a React component lifecycle.\n\nA component will re-render. Many times. With the same props.\n\nYour render function must be ready for this. It must be pure:\n\n✓ No side effects: Don't mutate external state, make API calls, or manipulate DOM during render\n✓ Consistent output: Same props + same state = same JSX\n✓ No assumptions: Don't assume this is the first or last render\n✓ Proper separation: Side effects go in useEffect, interactions go in event handlers\n\nWhen your components are pure, React can optimize, predict, parallelize, debug, and trust your code.\n\nWrite every render like it's the first time, but learn from the past.",
      },
    ],
    [],
  );

  const currentChapter = chapters[chapter];

  const addSideEffect = useCallback((action: string) => {
    setSideEffects((prev) => [
      ...prev,
      {
        id: Date.now(),
        action,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const addSkill = useCallback((name: string) => {
    setSkills((prev) => {
      const existing = prev.find((s) => s.name === name);
      if (existing) {
        return prev.map((s) =>
          s.name === name ? { ...s, level: s.level + 1 } : s,
        );
      }
      return [...prev, { id: Date.now(), name, level: 1 }];
    });
  }, []);

  const resetDemo = useCallback(() => {
    setSideEffects([]);
    setSkills([]);
    setIsLooping(false);
  }, []);

  const triggerLoop = useCallback(() => {
    setIsLooping(true);
    setTimeout(() => setIsLooping(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="border-b border-slate-700/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-center justify-between px-8">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <Clock className="h-8 w-8 text-sky-500" />
                <h1 className="text-4xl font-bold text-white">Groundhog Day</h1>
              </div>

              <p className="mt-1 text-sm text-sky-400 px-2">
                Re-rendering &amp; Pure Functions
              </p>
            </div>
            <p className="text-lg text-slate-400">
              Phil Connors, Punxsutawney, 1993
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl p-8 pb-32">
        {/* Render Counter Badge */}
        <div className="mb-6 flex justify-end mr-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-2 text-sm text-sky-400">
            <RotateCcw className="h-4 w-4" />
            <span>Render #{renderCount}</span>
          </div>
        </div>

        {/* Chapter Content */}
        <article className="prose prose-invert prose-slate mb-12 max-w-none">
          <h2 className="mb-4 text-3xl font-bold text-white">
            {currentChapter.title}
          </h2>
          <div className="leading-relaxed whitespace-pre-line text-slate-300">
            {currentChapter.content}
          </div>
        </article>

        {/* Interactive Demonstrations */}
        <div className="space-y-8">
          {/* Chapter 1: Render Counter Demo */}
          {chapter === 0 && (
            <div className="rounded-lg border border-slate-700/30 bg-slate-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                <Zap className="h-5 w-5 text-sky-500" />
                Same Props, Multiple Renders
              </h3>
              <div className="mb-4 rounded bg-slate-950 p-4 font-mono text-sm">
                <div className="text-sky-400">
                  function PhilConnors(props) {"{"}
                </div>
                <div className="ml-4 text-slate-400">
                  // Props never change:
                </div>
                <div className="ml-4 text-amber-400">
                  const {"{"} date, location {"}"} = props;
                </div>
                <div className="ml-4 text-slate-400">
                  // date: "February 2nd" (always)
                </div>
                <div className="ml-4 text-slate-400">
                  // location: "Punxsutawney" (always)
                </div>
                <div className="mt-2 ml-4 text-slate-300">
                  return &lt;Day /&gt;;
                </div>
                <div className="text-sky-400">{"}"}</div>
              </div>
              <p className="text-sm text-slate-400">
                This component has rendered{" "}
                <span className="font-semibold text-sky-400">
                  {renderCount} times
                </span>{" "}
                with identical props. React calls your render function
                repeatedly—be ready for it.
              </p>
            </div>
          )}

          {/* Chapter 2: Side Effects Demo */}
          {chapter === 1 && (
            <div className="rounded-lg border border-slate-700/30 bg-slate-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Side Effects Compound
              </h3>

              <div className="mb-4 grid gap-4 md:grid-cols-2">
                <button
                  onClick={() => addSideEffect("Stole money from bank")}
                  className="rounded border border-red-500/30 bg-red-500/20 px-4 py-3 text-red-400 transition-colors hover:border-red-500"
                >
                  Steal Money (Side Effect)
                </button>
                <button
                  onClick={() => addSideEffect("Manipulated Nancy")}
                  className="rounded border border-red-500/30 bg-red-500/20 px-4 py-3 text-red-400 transition-colors hover:border-red-500"
                >
                  Manipulate Person (Side Effect)
                </button>
              </div>

              {sideEffects.length > 0 && (
                <div className="mb-4 rounded border border-red-500/30 bg-red-950/30 p-4">
                  <h4 className="mb-2 font-semibold text-red-400">
                    Accumulated Side Effects:
                  </h4>
                  <ul className="space-y-1 text-sm text-red-300">
                    {sideEffects.map((effect) => (
                      <li key={effect.id} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                        {effect.action}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-red-400">
                    ⚠️ Each render adds more chaos. Side effects in render
                    functions compound dangerously.
                  </p>
                </div>
              )}

              <button
                onClick={resetDemo}
                className="text-sm text-slate-400 underline hover:text-slate-300"
              >
                Reset Demo
              </button>
            </div>
          )}

          {/* Chapter 3: Infinite Loop Demo */}
          {chapter === 2 && (
            <div className="rounded-lg border border-slate-700/30 bg-slate-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Stuck in the Loop
              </h3>

              <div className="mb-4 flex items-center justify-center py-8">
                <div className={`relative ${isLooping ? "animate-spin" : ""}`}>
                  <Clock className="h-24 w-24 text-red-500" />
                  {isLooping && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-32 w-32 animate-spin rounded-full border-4 border-red-500/30 border-t-red-500"></div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4 rounded border border-red-500/30 bg-red-950/30 p-4">
                <p className="mb-3 text-sm text-red-300">
                  Impure components cannot progress. React's reconciliation
                  engine detects the instability and keeps re-rendering, hoping
                  you'll fix the render function.
                </p>
                <button
                  onClick={triggerLoop}
                  disabled={isLooping}
                  className="w-full rounded border border-red-500/30 bg-red-500/20 px-4 py-2 text-red-400 transition-colors hover:border-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLooping ? "Stuck in Loop..." : "Try to Escape (Will Fail)"}
                </button>
              </div>

              <p className="text-sm text-slate-400">
                You cannot escape a render cycle through side effects. The only
                way out is to make the render function pure.
              </p>
            </div>
          )}

          {/* Chapter 4: Pure vs Impure Comparison */}
          {chapter === 3 && (
            <div className="rounded-lg border border-slate-700/30 bg-slate-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
                Pure vs Impure: Same Props, Different Outcomes
              </h3>

              <div className="mb-4 grid gap-4 md:grid-cols-2">
                {/* Impure Column */}
                <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    Impure Render
                  </h4>
                  <div className="mb-4 space-y-2 text-sm text-red-300">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                      Side effects during render
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                      Unpredictable behavior
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                      Stuck in loop
                    </div>
                  </div>
                  <div className="rounded bg-slate-950 p-3 font-mono text-xs text-red-400">
                    <div>// ❌ Impure</div>
                    <div>stealMoney();</div>
                    <div>manipulate();</div>
                    <div>return &lt;Chaos /&gt;;</div>
                  </div>
                </div>

                {/* Pure Column */}
                <div className="rounded border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <h4 className="mb-3 flex items-center gap-2 font-semibold text-emerald-400">
                    <CheckCircle className="h-4 w-4" />
                    Pure Render
                  </h4>
                  <div className="mb-4 space-y-2 text-sm text-emerald-300">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      No side effects
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Predictable output
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Can progress
                    </div>
                  </div>
                  <div className="rounded bg-slate-950 p-3 font-mono text-xs text-emerald-400">
                    <div>// ✓ Pure</div>
                    <div>const output = render();</div>
                    <div>return &lt;Beauty /&gt;;</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => addSkill("Piano")}
                  className="flex-1 rounded border border-emerald-500/30 bg-emerald-500/20 px-4 py-2 text-emerald-400 transition-colors hover:border-emerald-500"
                >
                  Learn Piano (Proper State Update)
                </button>
                <button
                  onClick={() => addSkill("Ice Sculpting")}
                  className="flex-1 rounded border border-emerald-500/30 bg-emerald-500/20 px-4 py-2 text-emerald-400 transition-colors hover:border-emerald-500"
                >
                  Learn Ice Sculpting
                </button>
              </div>

              {skills.length > 0 && (
                <div className="mt-4 rounded border border-emerald-500/30 bg-emerald-950/30 p-4">
                  <h4 className="mb-2 font-semibold text-emerald-400">
                    Skills Learned (Proper State):
                  </h4>
                  <div className="space-y-2">
                    {skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-emerald-300">{skill.name}</span>
                        <span className="text-emerald-400">
                          Level {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chapter 5: Pattern Summary */}
          {chapter === 4 && (
            <div className="rounded-lg border border-slate-700/30 bg-slate-900/50 p-6">
              <h3 className="mb-6 text-xl font-semibold text-white">
                The Pattern: Phil's Journey → React Best Practices
              </h3>

              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                    <h4 className="mb-3 font-semibold text-red-400">
                      ❌ Impure Phase
                    </h4>
                    <ul className="space-y-2 text-sm text-red-300">
                      <li>• Side effects during render</li>
                      <li>• Mutating external state</li>
                      <li>• Unpredictable behavior</li>
                      <li>• Stuck in infinite loop</li>
                      <li>• Debugging nightmare</li>
                    </ul>
                  </div>

                  <div className="rounded border border-emerald-500/30 bg-emerald-950/20 p-4">
                    <h4 className="mb-3 font-semibold text-emerald-400">
                      ✓ Pure Phase
                    </h4>
                    <ul className="space-y-2 text-sm text-emerald-300">
                      <li>• Pure render function</li>
                      <li>• Proper state management</li>
                      <li>• Consistent output</li>
                      <li>• Lifecycle completes</li>
                      <li>• Easy to debug</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded border border-sky-500/30 bg-sky-950/20 p-4">
                  <h4 className="mb-3 font-semibold text-sky-400">
                    Core Lesson
                  </h4>
                  <p className="mb-3 text-sm leading-relaxed text-slate-300">
                    A component will re-render many times with the same props.
                    Your render function must be pure:
                  </p>
                  <ul className="space-y-2 text-sm text-sky-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>
                        No side effects: Don't mutate external state during
                        render
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>
                        Consistent output: Same props + state = same JSX
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>
                        Proper separation: Side effects go in useEffect
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="rounded border border-amber-500/30 bg-amber-950/20 p-4">
                  <p className="text-sm text-amber-300 italic">
                    "Write every render like it's the first time, but learn from
                    the past."
                  </p>
                  <p className="mt-2 text-xs text-amber-400">
                    — The wisdom Phil learned after thousands of iterations
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed right-0 bottom-0 left-0 border-t border-slate-700/30 bg-slate-900/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="rounded border border-sky-500/30 bg-sky-500/20 px-6 py-2 text-sky-400 transition-colors hover:border-sky-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-sky-500/30"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="ml-2 flex gap-1">
                {chapters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChapter(idx)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      idx === chapter
                        ? "bg-sky-500"
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                    aria-label={`Go to chapter ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="rounded border border-sky-500/30 bg-sky-500/20 px-6 py-2 text-sky-400 transition-colors hover:border-sky-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-sky-500/30"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
