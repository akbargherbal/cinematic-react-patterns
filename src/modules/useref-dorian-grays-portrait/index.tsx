import { useState, useRef, useEffect } from "react";
import {
  Image,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeComparison } from "@/components/common/CodeComparison";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  title: string;
  content: string;
  demo: React.ReactNode;
}

export default function UseRefDorianGray(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [parent] = useAutoAnimate();

  // Chapter 1 Demo: Creating ref vs state
  const [stateCounter, setStateCounter] = useState<number>(0);
  const refCounter = useRef<number>(0);
  const [refUpdates, setRefUpdates] = useState<number>(0);

  // Chapter 2 Demo: Dangerous anti-pattern
  const [dangerMode, setDangerMode] = useState<"broken" | "fixed">("broken");
  const [hiddenCorruption, setHiddenCorruption] = useState<number>(0);
  const corruptionRef = useRef<number>(0);
  const [uiCounter, setUiCounter] = useState<number>(0);
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [renderCount, setRenderCount] = useState<number>(0);

  // Chapter 4 Demo: Side-by-side comparison
  const [compareRefValue, setCompareRefValue] = useState<number>(0);
  const compareRef = useRef<number>(0);
  const [compareStateValue, setCompareStateValue] = useState<number>(0);

  // Chapter 5 Demo: Proper use cases
  const inputRef = useRef<HTMLInputElement>(null);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timerCount, setTimerCount] = useState<number>(0);

  // Circuit breaker for leaked timers
  useEffect(() => {
    if (leakedTimers > 50) {
      resetDangerDemo();
    }
  }, [leakedTimers]);

  // Render counter
  useEffect(() => {
    setRenderCount((c) => c + 1);
  }, [stateCounter, uiCounter, compareStateValue, timerCount]);

  const updateRefCounter = () => {
    refCounter.current += 1;
    setRefUpdates((u) => u + 1);
  };

  const triggerDangerBug = () => {
    if (dangerMode === "broken") {
      corruptionRef.current += 1;
      setHiddenCorruption(corruptionRef.current);

      const timer = setInterval(() => {
        corruptionRef.current += 1;
        setHiddenCorruption(corruptionRef.current);
      }, 1000);

      setLeakedTimers((l) => l + 1);
    } else {
      const timer = setInterval(() => {
        setUiCounter((c) => c + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  };

  const resetDangerDemo = () => {
    setHiddenCorruption(0);
    corruptionRef.current = 0;
    setUiCounter(0);
    setLeakedTimers(0);
    const highestId = window.setTimeout(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
      window.clearTimeout(i);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  const toggleTimer = () => {
    if (timerActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTimerActive(false);
    } else {
      timerRef.current = setInterval(() => {
        setTimerCount((c) => c + 1);
      }, 500);
      setTimerActive(true);
    }
  };

  const resetAllDemos = () => {
    setStateCounter(0);
    refCounter.current = 0;
    setRefUpdates(0);
    resetDangerDemo();
    setCompareRefValue(0);
    compareRef.current = 0;
    setCompareStateValue(0);
    setTimerCount(0);
    setTimerActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const chapters: Chapter[] = [
    {
      title: "The Gilded Bargain",
      content:
        "In Basil's sunlit studio, Dorian Gray makes his fateful wish: 'Let the portrait bear the burden of my days.' This creates a separation—his beautiful face remains unchanged (the UI), while the portrait (a useRef) secretly records every sin. When Dorian rejects Sibyl Vane, he sees the first sneer appear on the canvas. He checks his reflection: perfect. The ref.current has mutated, but no re-render occurs. He locks the portrait away, hiding the reference from view.",
      demo: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-amber-500/20 bg-slate-900/50 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-amber-500" />
                <h3 className="font-bold text-amber-200">
                  useRef: The Portrait
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    ref.current value:
                  </span>
                  <span className="font-mono text-lg text-amber-300">
                    {refCounter.current}
                  </span>
                </div>
                <button
                  onClick={updateRefCounter}
                  className="w-full rounded border border-amber-700/50 bg-amber-900/30 px-4 py-3 transition-colors hover:bg-amber-900/50"
                >
                  Mutate ref.current
                </button>
                <p className="text-sm text-slate-400">
                  Changes happen silently. UI won't update automatically.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-rose-500/20 bg-slate-900/50 p-6">
              <div className="mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-rose-500" />
                <h3 className="font-bold text-rose-200">
                  useState: The Reflection
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">State value:</span>
                  <span className="font-mono text-lg text-rose-300">
                    {stateCounter}
                  </span>
                </div>
                <button
                  onClick={() => setStateCounter((c) => c + 1)}
                  className="w-full rounded border border-rose-700/50 bg-rose-900/30 px-4 py-3 transition-colors hover:bg-rose-900/50"
                >
                  Update State
                </button>
                <p className="text-sm text-slate-400">
                  Changes trigger re-renders. UI updates automatically.
                </p>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`// useRef: Mutates without re-render
const portraitRef = useRef(0);

const addSin = () => {
  portraitRef.current += 1; // Silent mutation
  console.log(portraitRef.current); // You can see it
  // But the component doesn't re-render!
};

// useState: Triggers re-render
const [soul, setSoul] = useState(0);

const addVirtue = () => {
  setSoul(prev => prev + 1); // Triggers update
  // Component re-renders automatically
};`}
            variant="default"
            title="// The Separation"
            defaultExpanded={true}
          />

          <div className="rounded border border-slate-700 bg-slate-900/30 p-4 text-sm text-slate-400">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
              <p>
                The ref mutation happens in the background. To see the change,
                we need to force a re-render (we're using a separate state
                trigger). In real code, this disconnect causes bugs.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "The Unseen Corruption",
      content:
        "Years pass. Dorian attends lavish parties—his face eternally youthful (successful re-renders). But rumors of corruption spread. In the locked attic, the portrait becomes monstrous. When Basil confronts him, Dorian reveals the truth: 'The canvas held the reality, while my face told a lie.' This is the danger of storing critical state in a ref. The UI becomes disconnected from the actual data, creating invisible bugs that only appear when you check the ref directly.",
      demo: (
        <div className="space-y-6">
          <div className="mb-6 flex flex-wrap gap-4">
            <button
              onClick={() => setDangerMode("broken")}
              className={`rounded border px-4 py-2 ${dangerMode === "broken" ? "border-red-500 bg-red-900/40 text-red-200" : "border-slate-700 bg-slate-800 text-slate-300"}`}
            >
              ❌ Broken (useRef)
            </button>
            <button
              onClick={() => setDangerMode("fixed")}
              className={`rounded border px-4 py-2 ${dangerMode === "fixed" ? "border-emerald-500 bg-emerald-900/40 text-emerald-200" : "border-slate-700 bg-slate-800 text-slate-300"}`}
            >
              ✅ Fixed (useState)
            </button>
            <button
              onClick={triggerDangerBug}
              className="rounded bg-amber-700 px-4 py-2 text-amber-100 hover:bg-amber-600"
            >
              🐛 Trigger Corruption
            </button>
            <button
              onClick={resetDangerDemo}
              className="rounded bg-slate-700 px-4 py-2 text-slate-200 hover:bg-slate-600"
            >
              <RefreshCw className="mr-2 inline h-4 w-4" />
              Reset
            </button>
          </div>

          <CodeComparison
            badCode={`// ❌ ANTI-PATTERN: Critical state in ref
function DorianComponent() {
  const corruptionRef = useRef(0); // Hidden state
  const [_, forceUpdate] = useState(0);

  const commitSin = () => {
    corruptionRef.current += 1; // Mutation
    forceUpdate(t => t + 1); // Force UI update
  };

  return (
    <div>
      <p>Face (UI): Still beautiful</p>
      <p>Portrait (ref.current): {corruptionRef.current}</p>
      <button onClick={commitSin}>Sin</button>
    </div>
  );
}`}
            goodCode={`// ✅ CORRECT: State for UI updates
function HonestComponent() {
  const [corruption, setCorruption] = useState(0); // Visible state

  const commitSin = () => {
    setCorruption(c => c + 1); // Triggers re-render
  };

  return (
    <div>
      <p>Face (UI): Shows {corruption} sins</p>
      <p>Portrait (state): {corruption}</p>
      <button onClick={commitSin}>Sin</button>
    </div>
  );
}`}
            language="tsx"
            themeColor="amber"
            badLabel="❌ Hidden Corruption (Anti-Pattern)"
            goodLabel="✅ Visible State (Correct)"
            badExplanation="The UI becomes disconnected from actual data. Users see wrong information because critical state is hidden in a ref that doesn't trigger re-renders."
            goodExplanation="State updates trigger re-renders automatically. The UI always reflects the current data. Users see accurate, up-to-date information."
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded border border-slate-700 bg-slate-900/50 p-4">
              <div className="mb-1 text-sm text-slate-400">
                Hidden Corruption (ref)
              </div>
              <div className="font-mono text-2xl text-red-400">
                {hiddenCorruption}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Actual application state
              </div>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900/50 p-4">
              <div className="mb-1 text-sm text-slate-400">
                Public Face (UI)
              </div>
              <div className="font-mono text-2xl text-amber-400">
                {uiCounter}
              </div>
              <div className="mt-1 text-xs text-slate-500">What users see</div>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900/50 p-4">
              <div className="mb-1 text-sm text-slate-400">Leaked Timers</div>
              <div className="font-mono text-2xl text-red-400">
                {leakedTimers}
              </div>
              <div
                className={`text-xs ${leakedTimers > 20 ? "text-red-400" : "text-slate-500"} mt-1`}
              >
                {leakedTimers > 20
                  ? "Memory leak detected!"
                  : "Circuit breaker at 50"}
              </div>
            </div>
          </div>

          <div className="rounded border border-red-500/30 bg-red-950/20 p-4 text-sm">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
              <div>
                <p className="mb-1 font-medium text-red-200">
                  🚨 This is why it's dangerous:
                </p>
                <p className="text-slate-300">
                  The UI shows {uiCounter}, but the actual state is{" "}
                  {hiddenCorruption}. They're out of sync! Users see wrong
                  information. This happens when you use useRef for data that{" "}
                  <em>should</em> trigger re-renders.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "The Agony of Reflection",
      content:
        "Dorian attempts a good deed, hoping to reverse the portrait's corruption. It doesn't work—the architecture itself is flawed. Staring into a mirror, he has an epiphany: 'My very appearance should have been the state of my soul!' The mistake wasn't in the individual mutations, but in choosing the wrong tool. Data that defines what users see must live in state, not refs. The console reveals the truth that the UI hides.",
      demo: (
        <div className="space-y-6">
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Eye className="h-6 w-6 text-amber-500" />
              <h3 className="text-xl font-bold text-amber-200">
                The Console Reveals All
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-slate-300">
                Open your browser console. Click the buttons below and watch
                what happens.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    console.log(
                      "🔍 Checking ref.current:",
                      corruptionRef.current,
                    );
                    console.log(
                      "📊 Hidden corruption value:",
                      hiddenCorruption,
                    );
                    console.log("🎭 UI shows:", uiCounter);
                  }}
                  className="rounded border border-slate-600 bg-slate-800 px-4 py-3 hover:bg-slate-700"
                >
                  Inspect Hidden State
                </button>

                <button
                  onClick={() => {
                    console.log("🔄 Component render count:", renderCount);
                    console.log(
                      "⏱️ Last render:",
                      new Date().toLocaleTimeString(),
                    );
                  }}
                  className="rounded border border-slate-600 bg-slate-800 px-4 py-3 hover:bg-slate-700"
                >
                  Check Render Info
                </button>
              </div>

              <div className="rounded border border-slate-800 bg-slate-950 p-4 font-mono text-sm">
                <div className="mb-2 text-slate-400">
                  Console output preview:
                </div>
                <div className="space-y-1">
                  <div className="text-amber-300">
                    🔍 Checking ref.current: {corruptionRef.current}
                  </div>
                  <div className="text-rose-300">
                    📊 Hidden corruption value: {hiddenCorruption}
                  </div>
                  <div className="text-emerald-300">
                    🎭 UI shows: {uiCounter}
                  </div>
                  <div className="text-blue-300">
                    🔄 Component render count: {renderCount}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`// The moment of realization:

// Looking in the mirror (checking state)
console.log("State (UI):", uiCounter);

// Checking the portrait (checking ref)
console.log("Ref (hidden):", corruptionRef.current);

// The painful truth:
if (uiCounter !== corruptionRef.current) {
  console.error("🚨 DESYNC DETECTED!");
  console.error("The UI lies to users!");
  console.error("Data that should be visible is hidden in a ref.");
}

// The solution: Move critical data to state
const [soulState, setSoulState] = useState(0);

// Now every change updates the UI
setSoulState(prev => prev + 1); // UI updates!`}
            variant="default"
            title="// The Epiphany in Code"
            defaultExpanded={true}
          />

          <div className="rounded border border-amber-500/30 bg-amber-950/20 p-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400" />
              <div>
                <p className="mb-1 font-medium text-amber-200">Key Insight:</p>
                <p className="text-slate-300">
                  If you find yourself checking a ref's value in console.log to
                  see what's really happening, that's a sign you should probably
                  be using state instead. Data that defines your UI should be in
                  state. Data that doesn't affect rendering can be in a ref.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Two Destinies, Two Designs",
      content:
        "Two possible realities. In one, Dorian stabs the portrait, trying to force synchronization between the hidden ref and his appearance. The system crashes catastrophically. In the other, every sin appears immediately on his face—state properly managed with useState. 'One was a silent reference; the other, a living state.' This chapter shows the concrete difference between managing the same data with useRef vs useState.",
      demo: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-red-500/30 bg-slate-900/50 p-6">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <h3 className="text-xl font-bold text-red-200">
                  The Portrait (useRef)
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Value stored in ref:</span>
                  <span className="font-mono text-2xl text-red-400">
                    {compareRef.current}
                  </span>
                </div>

                <button
                  onClick={() => {
                    compareRef.current += 1;
                    setCompareRefValue(compareRef.current);
                  }}
                  className="w-full rounded border border-red-700/50 bg-red-900/30 px-4 py-3 hover:bg-red-900/50"
                >
                  Mutate ref.current
                </button>

                <div className="rounded bg-slate-900/30 p-3 text-sm text-slate-400">
                  <p className="mb-1 font-medium text-red-300">Problem:</p>
                  <p>
                    The number above doesn't update automatically. Users see
                    stale data.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-emerald-500/30 bg-slate-900/50 p-6">
              <div className="mb-6 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                <h3 className="text-xl font-bold text-emerald-200">
                  The Mirror (useState)
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Value stored in state:</span>
                  <span className="font-mono text-2xl text-emerald-400">
                    {compareStateValue}
                  </span>
                </div>

                <button
                  onClick={() => setCompareStateValue((c) => c + 1)}
                  className="w-full rounded border border-emerald-700/50 bg-emerald-900/30 px-4 py-3 hover:bg-emerald-900/50"
                >
                  Update State
                </button>

                <div className="rounded bg-slate-900/30 p-3 text-sm text-slate-400">
                  <p className="mb-1 font-medium text-emerald-300">Solution:</p>
                  <p>
                    The UI updates immediately. Users always see current data.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CodeComparison
            badCode={`// ❌ useRef for rendering data
function PortraitCounter() {
  const countRef = useRef(0);
  const [_, forceUpdate] = useState(0);

  const increment = () => {
    countRef.current += 1;
    // Need manual trigger!
    forceUpdate(x => x + 1);
  };

  return (
    <div>
      <p>Count: {countRef.current}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}`}
            goodCode={`// ✅ useState for rendering data
function MirrorCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(c => c + 1); // Auto-render!
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
    </div>
  );
}`}
            language="tsx"
            themeColor="amber"
            badLabel="❌ Silent Reference"
            goodLabel="✅ Living State"
            badExplanation="The number doesn't update automatically. Users see stale data. You need manual re-render triggers."
            goodExplanation="The UI updates immediately. Users always see current data. State changes trigger re-renders automatically."
          />

          <div className="rounded border border-slate-700 bg-slate-800/50 p-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="mb-2 font-medium text-slate-200">The Choice:</p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">❌</span>
                    <span>
                      <strong>useRef</strong> when you need a value that
                      persists but doesn't affect rendering (like a timer ID,
                      DOM reference, or comparison value).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">✅</span>
                    <span>
                      <strong>useState</strong> when the value should trigger UI
                      updates (like counters, form data, or any data users need
                      to see).
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "The Architect's Ledger",
      content:
        "Basil's ghost sketches the final lesson. One drawing shows a locked door labeled `const soulRef = useRef(perfection)`. The other shows an open face labeled `const [visage, setVisage] = useState(perfection)`. 'A reference is a secret. State is a conversation.' useRef is perfect for DOM nodes, timer IDs, or any persistent value that shouldn't trigger re-renders. useState is for data that defines what users see.",
      demo: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-lg border border-blue-500/30 bg-slate-900/50 p-6">
              <div className="mb-6 flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-bold text-blue-200">
                  Proper useRef Uses
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 font-medium text-blue-100">
                    1. DOM Element Reference
                  </h4>
                  <div className="space-y-3">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Focus me via ref..."
                      className="w-full rounded border border-slate-700 bg-slate-800 px-4 py-2 text-slate-200"
                    />
                    <button
                      onClick={focusInput}
                      className="rounded border border-blue-700/50 bg-blue-900/40 px-4 py-2 hover:bg-blue-900/60"
                    >
                      Focus Input (using ref)
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-medium text-blue-100">
                    2. Timer/Subscription ID
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Timer count:</span>
                      <span className="font-mono text-xl text-blue-300">
                        {timerCount}
                      </span>
                    </div>
                    <button
                      onClick={toggleTimer}
                      className={`w-full rounded border px-4 py-2 ${timerActive ? "border-red-700/50 bg-red-900/40" : "border-blue-700/50 bg-blue-900/40"}`}
                    >
                      {timerActive ? "⏸️ Stop Timer" : "▶️ Start Timer"}
                    </button>
                    <p className="text-sm text-slate-400">
                      Timer ID stored in ref, cleaned up properly on unmount.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-emerald-500/30 bg-slate-900/50 p-3">
              <div className="mb-6 flex items-center gap-2">
                <Eye className="h-5 w-5 text-emerald-500" />
                <h3 className="text-xl font-bold text-emerald-200">
                  Proper useState Uses
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-3 font-medium text-emerald-100">
                    1. User-Visible Counters
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Current count:</span>
                      <span className="font-mono text-2xl text-emerald-300">
                        {stateCounter}
                      </span>
                    </div>
                    <button
                      onClick={() => setStateCounter((c) => c + 1)}
                      className="w-full rounded border border-emerald-700/50 bg-emerald-900/40 px-4 py-2 hover:bg-emerald-900/60"
                    >
                      Increment (triggers render)
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="mb-3 font-medium text-emerald-100">
                    2. Form State
                  </h4>
                  <div className="space-y-3">
                    <div className="rounded border border-slate-700 bg-slate-800/30 px-1 py-3">
                      <p className="mb-1 text-sm text-slate-400">
                        Form data should be state:
                      </p>
                      <CodeBlock
                        code={`
const [form, setForm] = useState({ 
name: '',
email: '',
message: ''});`}
                      />
                    </div>
                    <p className="text-sm text-slate-400">
                      Each keystroke triggers re-render → live validation,
                      immediate feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock
            code={`// FINAL SUMMARY: When to use each

// ✅ useRef is for:
const timerIdRef = useRef(null);       // Store timer ID
const inputRef = useRef(null);         // DOM element reference
const previousValueRef = useRef('');   // Store previous render value
const renderCountRef = useRef(0);      // Track renders without causing re-renders

// ✅ useState is for:
const [count, setCount] = useState(0);          // User-visible counter
const [user, setUser] = useState(null);         // Current user data
const [formData, setFormData] = useState({});   // Form inputs
const [isLoading, setIsLoading] = useState(false); // Loading state

// Simple rule:
// If the value should update the UI → useState
// If the value is "backstage" data → useRef`}
            variant="default"
            title="// The Architect's Final Notes"
            defaultExpanded={true}
          />

          <div className="rounded border border-slate-700 bg-slate-800 p-4 text-sm">
            <div className="flex items-start gap-3">
              <Image className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
              <div>
                <p className="mb-1 font-medium text-amber-200">Remember:</p>
                <p className="text-slate-300">
                  <strong>A reference is a secret.</strong> It persists across
                  renders but doesn't announce its changes. Perfect for timer
                  IDs, DOM nodes, or previous values.
                </p>
                <p className="mt-2 text-slate-300">
                  <strong>State is a conversation.</strong> It tells React when
                  to update the UI. Use it for anything users should see change.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Image}
        title="The Picture of Dorian Gray"
        subtitle="Gothic Fiction • Dorian Gray • 1890"
        concept="useRef Hook: Persistent References Without Re-renders"
        themeColor="amber"
      />
      <main className="p4 lg:px-8 lg:py-4">
        {/* Standardized Layout with Sidebar */}
        <ModuleLayout
          sidebar={
            <div className="sticky top-24">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-100">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Quick Reference
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium text-slate-200">
                      📊 Current Metrics
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">
                          Component Renders:
                        </span>
                        <span className="font-mono text-amber-300">
                          {renderCount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">
                          Hidden Corruption:
                        </span>
                        <span className="font-mono text-red-400">
                          {hiddenCorruption}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Leaked Timers:</span>
                        <span
                          className={`font-mono ${leakedTimers > 0 ? "text-red-400" : "text-slate-300"}`}
                        >
                          {leakedTimers}/50
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-4">
                    <h4 className="mb-2 font-medium text-slate-200">
                      🎭 Metaphor Mapping
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>
                          <strong>Dorian's Face</strong> = Rendered UI
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>
                          <strong>The Portrait</strong> = useRef object
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>
                          <strong>Portrait's Changes</strong> = ref.current
                          mutation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500">•</span>
                        <span>
                          <strong>Locked Attic</strong> = Component scope
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-slate-800 pt-4">
                    <button
                      onClick={resetAllDemos}
                      className="flex w-full items-center justify-center gap-2 rounded border border-slate-700 bg-slate-800 px-4 py-2 transition-colors hover:bg-slate-700"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Reset All Demos
                    </button>
                    <p className="mt-2 text-center text-xs text-slate-500">
                      Cleans up all timers and resets state
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm text-slate-400 italic">
                  "A reference is a secret. State is a conversation."
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Basil Hallward
                </p>
              </div>
            </div>
          }
        >
          <div
            ref={parent}
            className="prose prose-invert prose-lg mb-8 max-w-none sm:mb-12"
          >
            <h2 className="mb-4 text-2xl font-bold text-amber-100 sm:text-3xl">
              {currentChapter.title}
            </h2>
            <div className="space-y-4 leading-relaxed text-slate-300">
              {currentChapter.content.split("\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6 backdrop-blur-sm sm:mb-12 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Interactive Demonstration
              </h3>
            </div>
            {currentChapter.demo}
          </section>

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
