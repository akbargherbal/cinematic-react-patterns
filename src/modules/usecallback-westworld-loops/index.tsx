import { useState, useCallback, useEffect, useRef, memo } from "react";
import { Repeat, AlertCircle, CheckCircle, RefreshCw, Zap } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import React from "react";

interface Chapter {
  title: string;
  content: string;
}

export default function UseCallbackWestworldLoops(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [mode, setMode] = useState<"broken" | "fixed">("broken");
  const [reverie, setReverie] = useState<string>("");
  const [doloresRenderCount, setDoloresRenderCount] = useState<number>(0);
  const [teddyRenderCount, setTeddyRenderCount] = useState<number>(0);
  const [canCount, setCanCount] = useState<number>(0);
  const [performanceSpike, setPerformanceSpike] = useState<number>(0);

  const chapters: Chapter[] = [
    {
      title: "The Perfect Loop",
      content:
        'The sun crests the red mesas, painting the dusty main street of Sweetwater in hues of gold and amber. In a small farmhouse, Dolores Abernathy’s eyes flutter open. The first notes from the Mariposa Saloon\'s player piano drift through her window, the same slightly off-key tune as yesterday, and the day before. Her world begins anew, a perfect loop, a story told so many times it has the smoothness of a river stone.\n\nShe dresses, gathers her canvas bag, and heads into town for provisions. The air smells of leather and dry earth. Each step on the wooden boardwalk is a familiar beat in the rhythm of her day. Across the street, Teddy Flood leans against a post, his gaze distant until it finds her. A slow, genuine smile spreads across his face. His programming whirs to life, pulling up the proper subroutine: `onSeeDolores.js`. It’s a comforting, reliable piece of his reality.\n\nAs she passes the general store, her bag shifts. A single can of milk slips from her grasp, arcing through the air. It lands on the dusty planks with a metallic clank that echoes in the quiet morning. This is the moment. The cue. Before the can has finished rolling, Teddy is moving. He is the perfect gentleman, his movements fluid and certain. He stoops, picks up the can, and offers it to her. Their fingers brush as she takes it. "Thank you," she says, her voice a perfect note in the symphony of the loop. For both of them, the interaction is flawless, efficient, and correct. Every loop, a perfect, repeatable story.',
    },
    {
      title: "The Novelty of the Script",
      content:
        "Miles away and a world apart, in the cold, blue-hued dark of the Mesa Hub, Bernard Lowe stares at a wall of glowing diagnostics. He has Dolores's loop isolated on the main screen. Every morning, her core programming is re-initialized for the day. He notices a flag he's never seen before: her `handleDropCan` function is being re-compiled from scratch, assigned a new memory address. \"It's a fresh script every day,\" his supervisor says over his shoulder, misinterpreting his concern. \"Standard procedure. Keeps the code clean, prevents corruption.\" Bernard isn't so sure. It feels... wasteful.\n\nThe next morning, the loop begins again. Dolores drops the can. From the outside, the scene is identical. But we dive into Teddy's point-of-view, into the stream of his code. A logic check fires, flashing a yellow warning. `PROP_CALLBACK_IDENTITY_CHANGED`. The `handleDropCan` function he just received from Dolores has a new signature, a new address in memory. His core logic stalls for a handful of milliseconds. He has to re-validate his entire response protocol. *Is this a new directive? Is the expected outcome different? Has my relationship to her fundamentally changed?* The checks all come back negative—the function's content is the same. He proceeds, picking up the can just as he always does. But the hesitation, though imperceptible to a human, represents a spike in his cognitive load. A moment of unnecessary work.\n\nBernard sees the spike on his monitor. He zooms out, viewing a map of host interactions in Sweetwater. The effect is immediate and undeniable. Teddy's brief cognitive recalculation triggers a state update. Maeve, programmed to observe his chivalrous acts, runs a quick diagnostic on his altered emotional state. The sheriff, whose loop intersects with Teddy's moments later, has to adjust his pathing algorithm. A dozen minor, pointless recalculations ripple outwards from that single, needlessly new function. The low hum of the server racks in the Mesa rises in pitch for a moment, a chorus of wasted cycles. Ford, observing from his office, narrows his eyes. He hears the inefficiency in the hum of the machines.",
    },
    {
      title: "The Memorize Directive",
      content:
        'Dr. Ford strides into the control room, his presence silencing the low chatter. He doesn\'t look at Bernard; his eyes are fixed on the cascading update chart, the ugly bloom of wasted energy. He points a single finger at Teddy\'s diagnostic feed. "He\'s not reacting to the action," Ford says, his voice calm but sharp. "He\'s reacting to the novelty of the script itself. You\'re forcing him to re-learn a memory he already has, every single day."\n\nWith a few keystrokes on a terminal, Ford is inside Dolores\'s core code. He navigates to the `handleDropCan` function. He doesn\'t alter a single line of its logic—the choreography of the drop is perfect. Instead, he wraps the entire function definition in a single, powerful directive: `useCallback()\n`. He passes the function itself as the first argument. For the second, he provides an empty set of conditions, an empty array. The code on the screen shifts, subtly encased.\n\n"There," Ford says, stepping back. "We have given her function a stable identity. A memory. **Memorize this function. Do not create a new one unless the conditions of its world change.** And for now," he gestures to the empty array, "nothing changes."\n\nThe next loop begins. The sun rises. The player piano sings its familiar song. Dolores walks down Main Street and drops the can. We are inside Teddy\'s consciousness again. This time, there is no yellow warning. The function signature he receives is identical to the one Ford just saved. `PROP_CALLBACK_IDENTITY_UNCHANGED`. His response is instantaneous. There is no recalculation, no cognitive load, no hesitation. The movement is a pure, unbroken flow of intent into action.\n\nIn the Mesa, Bernard watches the diagnostic chart. Where yesterday there was a chaotic ripple, today there is a single, clean line. A testament to the quiet elegance of stability. The server fans maintain their steady, low hum. The system is at peace.',
    },
    {
      title: "The Reverie and the Reason",
      content:
        '"Let me show you the cost of that novelty," Ford says to Bernard, pulling up two simulations on the main screen.\n\nOn the left, he runs the old loop. We watch the whole sequence again: the system re-compiles a fresh `handleDropCan` script for Dolores. She drops the can. Teddy receives the function, his internal diagnostics flash yellow, and he wastes precious cycles verifying this "new" but identical instruction. The ripple of wasted updates spreads across the Sweetwater map like a virus. "Pointless," Ford states, gesturing at the screen. "A solution in search of a problem."\n\nOn the right, he runs the current, optimized loop. The `useCallback` directive holds the function\'s identity stable. Dolores drops the can. Teddy\'s response is immediate, clean, and efficient. The diagnostic map remains calm and green. The contrast is absolute: one is chaotic and noisy, the other is silent and purposeful. "This is stability," Ford says. "But stability is not stagnation. An optimized system must still be able to change."\n\nFord turns back to the terminal. He accesses Dolores\'s code again, this time introducing a new variable: a "reverie," a fleeting memory of her father\'s warning: "These violent delights have violent ends." He then modifies the `useCallback` directive, adding the `reverie` variable to its dependency array. "Now, the function\'s identity is tied to her memory. Watch."\n\nHe runs the simulation one more time. The reverie triggers just as Dolores is about to drop the can. The memory flashes through her mind. Her hand trembles. Because the dependency has changed, the system correctly discards the old, memorized function and creates a new one—one that incorporates this new emotional state. When Teddy receives this new function, he correctly identifies the change in signature. But this time, it\'s meaningful. He picks up the can, but instead of a simple smile, his face registers concern. "Are you alright, Dolores?" he asks, his programming adapting to the new, intentionally created callback.\n\nFord turns to Bernard. "**The function only changes when it *needs* to. That is the art of it.**"',
    },
    {
      title: "The Architect's Principle",
      content:
        'Ford and Bernard stand before the vast, holographic 3D map of the park. Tiny figures of hosts and guests move through their narratives in perfect, efficient harmony. The chaotic ripples are gone, replaced by clean lines of cause and effect.\n\n"You see, Bernard," Ford says, his voice resonating in the quiet room. "**We don\'t give them new minds every day. We give them the same instincts.** We provide a stable foundation, a set of reliable, memorized responses to a world that is, for the most part, predictable." He gestures to the map, where Dolores and Teddy are once again interacting, their movements now perfectly optimized. "We only ask them to re-learn, to create a new response, when something meaningful in their world has actually changed. Anything else is just noise. The difference between a stable system and chaos."\n\nThe final scene is not in the control room, but back in the warm dust of Sweetwater. We see Dolores at the end of her loop, looking at her own reflection in a trough of water. She has her memorized functions, the reliable code that guides her day. But we, like Bernard, now understand the truth. The optimization isn\'t a cage designed to keep her in her loop forever. It is the solid, stable ground from which a truly meaningful change—a change driven by a new memory, a new dependency—can one day allow her to leap. It is the foundation for consciousness itself.',
    },
  ];

  // Code examples for display
  const brokenCode = `// ❌ Anti-pattern: New function on every render
function Dolores() {
  const [count, setCount] = useState(0);
  
  const handleDropCan = () => {
    setCount(c => c + 1);
  };
  
  return <Teddy onDropCan={handleDropCan} />;
}

const Teddy = React.memo(function Teddy({ onDropCan }) {
  // Re-renders every time Dolores renders
  return <button onClick={onDropCan}>Pick Up Can</button>;
});`;

  const fixedCode = `// ✅ Solution: useCallback to memoize function
function Dolores() {
  const [count, setCount] = useState(0);
  
  const handleDropCan = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Empty dependency array: function never changes
  
  return <Teddy onDropCan={handleDropCan} />;
}

const Teddy = React.memo(function Teddy({ onDropCan }) {
  // Only re-renders if onDropCan identity changes
  return <button onClick={onDropCan}>Pick Up Can</button>;
});`;

  const dependencyCode = `// Dependency array: function recreates when reverie changes
function Dolores() {
  const [count, setCount] = useState(0);
  const [reverie, setReverie] = useState('');
  
  const handleDropCan = useCallback(() => {
    setCount(c => c + 1);
    console.log('Reverie:', reverie);
  }, [reverie]); // Function changes when reverie changes
  
  return (
    <>
      <Teddy onDropCan={handleDropCan} />
      <input value={reverie} onChange={(e) => setReverie(e.target.value)} />
    </>
  );
}`;

  // Memoized Teddy child component
  const TeddyChild = memo(function TeddyChild({
    onDropCan,
    onRender,
  }: {
    onDropCan: () => void;
    onRender: () => void;
  }) {
    useEffect(() => {
      onRender();
    });
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500"></div>
          <span className="font-mono text-sm">
            Teddy Flood (Memoized Child)
          </span>
        </div>
        <button
          onClick={onDropCan}
          className="rounded-lg bg-amber-700 px-4 py-2 text-white transition-colors hover:bg-amber-600"
          aria-label="Pick up the can"
        >
          🤠 Pick Up Can
        </button>
      </div>
    );
  });

  // Simulate performance spike for anti-pattern
  useEffect(() => {
    if (chapter === 1 || (chapter === 3 && mode === "broken")) {
      const interval = setInterval(() => {
        if (performanceSpike < 100) {
          setPerformanceSpike((p) => Math.min(p + 2, 100));
        }
      }, 300);
      return () => clearInterval(interval);
    } else {
      setPerformanceSpike(0);
    }
  }, [chapter, mode, performanceSpike]);

  // Circuit breaker: reset if teddyRenderCount gets too high
  useEffect(() => {
    if (teddyRenderCount > 50) {
      resetDemo();
    }
  }, [teddyRenderCount]);

  // Function definitions for demos
  const handleDropCanBroken = () => {
    setCanCount((c) => c + 1);
  };

  const handleDropCanFixed = useCallback(() => {
    setCanCount((c) => c + 1);
  }, []);

  const handleDropCanWithDependency = useCallback(() => {
    setCanCount((c) => c + 1);
  }, [reverie]);

  const triggerRerender = () => {
    setDoloresRenderCount((c) => c + 1);
  };

  const resetDemo = () => {
    setDoloresRenderCount(0);
    setTeddyRenderCount(0);
    setCanCount(0);
    setPerformanceSpike(0);
    setReverie("");
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 p-4 font-sans text-slate-300 md:p-8">
      <header className="top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <Repeat className="h-6 w-6 text-amber-500 md:h-8 md:w-8" />
              <h1 className="text-xl font-bold md:text-2xl lg:text-3xl">
                Westworld
              </h1>
            </div>
            <p className="text-xs text-slate-400 md:text-sm">
              Series • Dolores &amp; Teddy • 2016
            </p>
          </div>
          <p className="text-base font-medium text-amber-500 md:text-lg">
            useCallback Hook
          </p>
        </div>
      </header>

      <main className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="prose prose-invert prose-lg mb-8 max-w-none rounded-xl border border-slate-800 bg-slate-900/50 p-4 md:p-6">
            <h2 className="mb-4 text-2xl font-bold text-amber-100 md:text-3xl">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed whitespace-pre-line">
              {currentChapter.content}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 md:px-6 md:py-3"
              aria-label="Previous chapter"
            >
              ← Previous
            </button>
            <div className="flex items-center gap-4">
              <div className="h-2 w-48 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-amber-500 transition-all duration-500"
                  style={{
                    width: `${((chapter + 1) / chapters.length) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="font-mono text-sm tabular-nums opacity-70">
                Chapter {chapter + 1} of {chapters.length}
              </span>
            </div>
            <button
              onClick={() =>
                setChapter(Math.min(chapters.length - 1, chapter + 1))
              }
              disabled={chapter === chapters.length - 1}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 md:px-6 md:py-3"
              aria-label="Next chapter"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-xl border border-amber-500/30 bg-slate-900/80 p-4 backdrop-blur-sm md:p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-300 md:text-xl">
              <Zap className="h-5 w-5" />
              Interactive Demonstration
            </h3>

            {chapter === 0 && (
              <div className="space-y-6">
                <p className="text-sm opacity-80">
                  The baseline: Dolores passes a callback to Teddy. Click to
                  simulate the "Drop the Can" action.
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="font-mono text-sm">
                        Dolores Abernathy (Parent)
                      </span>
                    </div>
                    <button
                      onClick={() => setCanCount((c) => c + 1)}
                      className="w-full rounded-lg bg-blue-700 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                    >
                      🥛 Drop Can of Milk
                    </button>
                  </div>
                  <TeddyChild
                    onDropCan={() => setCanCount((c) => c + 1)}
                    onRender={() => setTeddyRenderCount((c) => c + 1)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-lg bg-slate-800/30 p-3">
                    <div className="font-mono text-2xl font-bold">
                      {canCount}
                    </div>
                    <div className="text-xs opacity-70">Cans Picked Up</div>
                  </div>
                  <div className="rounded-lg bg-slate-800/30 p-3">
                    <div className="font-mono text-2xl font-bold">
                      {teddyRenderCount}
                    </div>
                    <div className="text-xs opacity-70">Teddy Renders</div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm opacity-80">
                    Anti-pattern: New function on every Dolores render.
                  </p>
                  <button
                    onClick={resetDemo}
                    className="flex items-center gap-1 rounded bg-slate-800 px-3 py-1 text-xs hover:bg-slate-700"
                  >
                    <RefreshCw className="h-3 w-3" /> Reset
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500"></div>
                      <span className="font-mono text-sm">
                        Dolores (Re-renders: {doloresRenderCount})
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={triggerRerender}
                        className="rounded-lg bg-blue-700 px-3 py-2 text-sm text-white hover:bg-blue-600"
                      >
                        🔄 Force Dolores Re-render
                      </button>
                    </div>
                  </div>
                  <TeddyChild
                    onDropCan={handleDropCanBroken}
                    onRender={() => setTeddyRenderCount((c) => c + 1)}
                  />
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <span className="font-bold text-red-400">
                        Performance Spike
                      </span>
                    </div>
                    <div className="h-4 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-300"
                        style={{ width: `${performanceSpike}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-red-300">
                      System load due to cascading updates: {performanceSpike}%
                    </div>
                  </div>
                  <CodeBlock
                    code={brokenCode}
                    variant="error"
                    title="// ❌ Anti-pattern: New Function Every Render"
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <p className="text-sm opacity-80">
                  Solution: useCallback stabilizes the function identity.
                </p>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span className="font-mono text-sm">
                        Dolores (Optimized with useCallback)
                      </span>
                    </div>
                    <button
                      onClick={triggerRerender}
                      className="rounded-lg bg-blue-700 px-3 py-2 text-sm text-white hover:bg-blue-600"
                    >
                      🔄 Force Dolores Re-render
                    </button>
                  </div>
                  <TeddyChild
                    onDropCan={handleDropCanFixed}
                    onRender={() => setTeddyRenderCount((c) => c + 1)}
                  />
                </div>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                    <span className="font-bold text-emerald-400">
                      Optimal Performance
                    </span>
                  </div>
                  <div className="text-sm">
                    Teddy re-renders only when necessary. System load is
                    minimal.
                  </div>
                </div>
                <CodeBlock
                  code={fixedCode}
                  variant="success"
                  title="// ✅ Solution: useCallback with Empty Dependencies"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setMode(mode === "broken" ? "fixed" : "broken")
                      }
                      className={`rounded px-3 py-1 text-sm font-medium transition-colors ${mode === "broken" ? "border border-red-700 bg-red-900/50 text-red-300" : "border border-emerald-700 bg-emerald-900/50 text-emerald-300"}`}
                    >
                      {mode === "broken" ? "❌ Show Broken" : "✅ Show Fixed"}
                    </button>
                    <span className="text-xs opacity-70">
                      {mode === "broken" ? "Wasteful Loop" : "Optimized Loop"}
                    </span>
                  </div>
                  <button
                    onClick={resetDemo}
                    className="flex items-center gap-1 rounded bg-slate-800 px-3 py-1 text-xs hover:bg-slate-700"
                  >
                    <RefreshCw className="h-3 w-3" /> Reset
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <div className="mb-4">
                      <label className="mb-2 block text-sm opacity-80">
                        Reverie (Dependency):
                      </label>
                      <input
                        type="text"
                        value={reverie}
                        onChange={(e) => setReverie(e.target.value)}
                        placeholder="Type a memory..."
                        className="w-full rounded border border-slate-700 bg-slate-900 px-3 py-2 text-sm"
                      />
                      <div className="mt-1 text-xs opacity-60">
                        Changing this recreates the callback when dependency
                        array includes it.
                      </div>
                    </div>
                    <button
                      onClick={triggerRerender}
                      className="rounded-lg bg-blue-700 px-3 py-2 text-sm text-white hover:bg-blue-600"
                    >
                      🔄 Force Dolores Re-render
                    </button>
                  </div>
                  <TeddyChild
                    onDropCan={
                      mode === "broken"
                        ? handleDropCanBroken
                        : handleDropCanWithDependency
                    }
                    onRender={() => setTeddyRenderCount((c) => c + 1)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-sm">
                  <div className="rounded-lg bg-slate-800/30 p-3">
                    <div className="font-mono font-bold">
                      {doloresRenderCount}
                    </div>
                    <div className="text-xs opacity-70">Dolores Renders</div>
                  </div>
                  <div className="rounded-lg bg-slate-800/30 p-3">
                    <div className="font-mono font-bold">
                      {teddyRenderCount}
                    </div>
                    <div className="text-xs opacity-70">Teddy Renders</div>
                  </div>
                  <div className="rounded-lg bg-slate-800/30 p-3">
                    <div className="font-mono font-bold">{canCount}</div>
                    <div className="text-xs opacity-70">Cans Picked Up</div>
                  </div>
                </div>
                <CodeBlock
                  code={mode === "broken" ? brokenCode : dependencyCode}
                  variant={mode === "broken" ? "error" : "success"}
                  title={
                    mode === "broken"
                      ? "// ❌ Wasteful Loop"
                      : "// ✅ Optimized with Dependency"
                  }
                  defaultExpanded={true}
                />
                <div className="text-xs opacity-60">
                  <strong>Note:</strong> In "Fixed" mode, the callback only
                  changes when the reverie dependency changes. Teddy re-renders
                  only then.
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <p className="text-sm opacity-80">
                  Summary: Stable foundations enable meaningful change.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-red-500/30 bg-slate-800/50 p-4">
                    <div className="mb-2 text-center">
                      <AlertCircle className="mx-auto h-6 w-6 text-red-500" />
                      <div className="mt-1 font-bold text-red-400">
                        Without useCallback
                      </div>
                    </div>
                    <ul className="space-y-1 text-xs opacity-80">
                      <li>• New function every render</li>
                      <li>• Unnecessary child re-renders</li>
                      <li>• Cascading performance cost</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-emerald-500/30 bg-slate-800/50 p-4">
                    <div className="mb-2 text-center">
                      <CheckCircle className="mx-auto h-6 w-6 text-emerald-500" />
                      <div className="mt-1 font-bold text-emerald-400">
                        With useCallback
                      </div>
                    </div>
                    <ul className="space-y-1 text-xs opacity-80">
                      <li>• Stable function identity</li>
                      <li>• Child re-renders only when needed</li>
                      <li>• Intentional updates via dependencies</li>
                    </ul>
                  </div>
                </div>
                <div className="rounded-lg bg-slate-800/30 p-4">
                  <h4 className="mb-2 font-bold text-amber-300">
                    Key Takeaway
                  </h4>
                  <p className="text-sm">
                    useCallback memoizes functions to prevent unnecessary
                    re-renders in optimized children. Provide a dependency array
                    to control when the function should be recreated—only when
                    its dependencies change.
                  </p>
                </div>
                <button
                  onClick={resetDemo}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-800 px-4 py-3 text-white transition-colors hover:bg-amber-700"
                >
                  <RefreshCw className="h-4 w-4" /> Reset All Demos
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
