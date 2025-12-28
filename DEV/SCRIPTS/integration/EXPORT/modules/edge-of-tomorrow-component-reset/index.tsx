import { useState, useCallback, useEffect } from "react";
import { RotateCcw, Skull, Brain, Code, CheckCircle } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
  demo?: () => JSX.Element;
}

export default function EdgeOfTomorrow() {
  const [chapter, setChapter] = useState(0);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "Initial Render",
      content: `Major William Cage jolts awake on the tarmac at Heathrow Airport, his heart hammering against his ribs. The smell of jet fuel and rain-soaked concrete fills his nostrils. Soldiers rush past him, barking orders he doesn't understand. He's wearing combat armor he doesn't know how to operate, holding a weapon he's never fired.

This is his initial state.

In React terms, Cage is a component being mounted for the first time. He has no props passed down from experienced handlers, no previous state to draw from. He's a fresh instance with default values: courage: 0, combatSkills: [], survivalKnowledge: null. The system has instantiated him with these initial conditions, and he's about to discover what happens when a component's lifecycle reaches its inevitable conclusion.

The battle is chaos. Cage stumbles onto the beach, surrounded by explosions and the screech of alien Mimics. He doesn't last five minutes. A Mimic's tendril pierces his chest, and as his vision fades to black, he experiences his first unmount.

Then he wakes up on the tarmac again.

Same moment. Same confusion. Same initial state.

The armor feels unfamiliar. The weapon is foreign in his hands. His heart rate spikes with the same panic. Every variable has been reset to its starting value. The component that was "Cage" has been destroyed and recreated, and this new instance has no memory of what came before.

He dies again on the beach. Wakes up on the tarmac. Dies. Wakes. Dies. Wakes.

Each iteration is a fresh mount. Each death is an unmount that wipes the slate clean. Cage is trapped in a render loop, and he's beginning to realize that something is very, very wrong with his lifecycle.`,
      demo: ResetCounterDemo,
    },
    {
      id: "build",
      title: "The Render Loop",
      content: `Rita puts Cage through training montages that feel like rapid-fire render cycles. Each session ends the same way: death, reset, repeat. But now there's structure to it. Now there's purpose.

"You're thinking about this wrong," Rita tells him between iterations. "You keep trying to hold onto state that doesn't belong to you."

She's right. Cage has been attempting the classic anti-pattern: expecting his component-level state to survive unmounting. He wants to wake up on the beach instead of the tarmac. He wants to start with the weapons he's learned to use, the skills he's acquired, the knowledge of where the Mimics will attack.

But that's not how component lifecycle works.

Every time Cage dies, React's reconciliation system—represented by the Omega, the alien intelligence controlling the time loop—enforces the rules. The component unmounts. The state is destroyed. A new instance is created with fresh initial state. The tarmac. The confusion. The unfamiliar armor.

The montage continues. Cage learns to roll under the troop carrier. Dies. Resets. Learns to avoid the Mimic in the farmhouse. Dies. Resets. Learns the timing of the helicopter crash. Dies. Resets.

Each iteration teaches him something new, but each iteration also strips away everything he's built. He's optimizing his behavior within a single render, but the moment that render ends (the moment he dies), all component state is garbage collected.`,
      demo: MemoryPersistenceDemo,
    },
    {
      id: "climax",
      title: "State Corruption",
      content: `The turning point comes when Cage loses his power.

A Mimic's blood—different from the others, not blue but red—splashes across his face during a battle. When he dies this time, he doesn't wake up on the tarmac. He wakes up in a hospital, injured but alive, and the loop is broken.

Or so it seems.

This is the moment of state corruption—when the component's lifecycle is disrupted in an unexpected way, when the rules you thought you understood suddenly change. Cage has been operating under the assumption that death equals reset, that unmount equals remount. But now the pattern has shifted, and he's facing something worse than endless resets.

He's facing permanent state.

Without the ability to reset, every mistake is final. Every wrong decision compounds. Cage is now like a component that can't unmount cleanly, that accumulates errors and side effects without the cleansing reset of a fresh mount.

Rita explains the truth: the power to reset came from the Omega's blood. Cage was infected with it, making him part of the alien's time-manipulation system. But now he's lost that connection. He's been ejected from the render loop.

Cage realizes he's been thinking about the problem backwards. He's been cursing the reset, wishing he could persist state across unmounts. But now that he's lost the ability to reset, he understands its value.

The reset was protecting him.`,
      demo: StateCorruptionDemo,
    },
    {
      id: "resolution",
      title: "Hot-Reload Wisdom",
      content: `Cage and Rita break into a military facility, steal a prototype device, and use it to locate the Omega. But the plan requires something radical: Cage needs to get the reset power back, which means getting infected with the Omega's blood again.

It means voluntarily entering the render loop one more time.

But this time, he understands the pattern. This time, he's not fighting the system—he's working with it.

Rita explains the strategy, and it's a perfect metaphor for proper state management:

"Your knowledge doesn't live in the loop," she says. "It lives outside it. The loop just gives you chances to apply what you've learned. Each reset is a fresh render with clean state, but the developer—you—keeps getting smarter."

This is the key insight: separate concerns.

• Component state: Ephemeral, resets on unmount, lives within the component lifecycle
• Lifted state: Persists across component unmounts, lives in a parent component
• External state: Survives the entire application lifecycle, lives outside React entirely
• Developer knowledge: Persists across hot-reloads, lives in the codebase and the developer's mind

The learned patterns live outside Cage's component. When he unmounts (dies), his local state resets, but the patterns persist in the parent system. When he remounts (wakes up), he receives those patterns as props.`,
      demo: LearningTimelineDemo,
    },
    {
      id: "summary",
      title: "Breaking the Cycle",
      content: `Cage wakes up in the helicopter, flying toward London. The invasion hasn't happened yet. The Omega is already dead—destroyed in a timeline that no longer exists, but whose effects ripple forward into this new present.

This is the final reset, the ultimate remount with clean state. But unlike all the previous resets, this one sticks. The loop is broken. The component has found its stable state.

The Core Lessons:

1. State Resets on Unmount (And That's Good)
Every time Cage died, his component unmounted and his state reset to initial values. This wasn't a bug—it was a feature that ensured predictability.

2. Knowledge Lives Outside the Component
Cage's learning persisted across resets because it wasn't stored in component state—it was stored in his consciousness, outside the loop.

3. The Reset is a Development Tool
Every reset gave Cage a chance to test a new approach with clean state. This is exactly how hot-reload works in development.

4. Optimize Within Constraints
Cage couldn't change the fact that he'd reset on death, so he optimized his behavior to work within that constraint.

5. Separate Concerns
The breakthrough came when Cage understood what belonged in the loop and what belonged outside it.

State resets. Knowledge compounds. And a developer who understands that difference can build components that are both flexible and reliable.`,
      demo: PatternComparisonDemo,
    },
  ];

  const currentChapter = chapters[chapter];

  const handlePrevious = useCallback(() => {
    setChapter((c) => Math.max(0, c - 1));
  }, []);

  const handleNext = useCallback(() => {
    setChapter((c) => Math.min(chapters.length - 1, c + 1));
  }, [chapters.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      <header className="border-b border-orange-500/30 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <RotateCcw className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-orange-500">
              Edge of Tomorrow
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Component Lifecycle & State Reset
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
        <article className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-400 mb-6">
            {currentChapter.title}
          </h2>
          <div className="prose prose-invert prose-slate max-w-none">
            {currentChapter.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {currentChapter.demo && (
          <section className="bg-orange-950/20 border border-orange-500/30 rounded-lg p-6 md:p-8">
            <currentChapter.demo />
          </section>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-orange-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium transition-all hover:bg-orange-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-orange-600"
              aria-label="Previous chapter"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="flex gap-1 ml-2">
                {chapters.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === chapter ? "bg-orange-500" : "bg-slate-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg font-medium transition-all hover:bg-orange-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-orange-600"
              aria-label="Next chapter"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ResetCounterDemo() {
  const [componentMounted, setComponentMounted] = useState(true);
  const [liftedCount, setLiftedCount] = useState(0);
  const [deathCount, setDeathCount] = useState(0);

  const handleKill = useCallback(() => {
    setComponentMounted(false);
    setDeathCount((c) => c + 1);
    setTimeout(() => setComponentMounted(true), 500);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Skull className="w-6 h-6 text-orange-500" />
        <h3 className="text-xl font-bold text-orange-400">
          Interactive Demo: State Reset on Unmount
        </h3>
      </div>

      <p className="text-slate-300 mb-6">
        Watch what happens when a component unmounts and remounts. The local
        state resets to initial values, but lifted state persists in the parent.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-slate-200 mb-4">
            Component State (Resets)
          </h4>
          {componentMounted ? (
            <ComponentCounter />
          ) : (
            <div className="h-32 flex items-center justify-center text-slate-500">
              Component Unmounted...
            </div>
          )}
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-slate-200 mb-4">
            Lifted State (Persists)
          </h4>
          <div className="text-center">
            <div className="text-5xl font-bold text-orange-500 mb-2">
              {liftedCount}
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Lives in parent component
            </p>
            <button
              onClick={() => setLiftedCount((c) => c + 1)}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-500 transition-colors"
            >
              Increment
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900/50 border border-orange-500/30 rounded-lg">
        <div className="text-center sm:text-left">
          <div className="text-2xl font-bold text-orange-500">
            {deathCount}
          </div>
          <div className="text-sm text-slate-400">Deaths (Unmounts)</div>
        </div>
        <button
          onClick={handleKill}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-500 transition-colors flex items-center gap-2"
        >
          <Skull className="w-5 h-5" />
          Kill Component
        </button>
      </div>
    </div>
  );
}

function ComponentCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <div className="text-5xl font-bold text-orange-500 mb-2">{count}</div>
      <p className="text-sm text-slate-400 mb-4">Lives in component state</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-500 transition-colors"
      >
        Increment
      </button>
    </div>
  );
}

function MemoryPersistenceDemo() {
  const [localMounted, setLocalMounted] = useState(true);
  const [liftedMounted, setLiftedMounted] = useState(true);
  const [externalMounted, setExternalMounted] = useState(true);
  const [liftedValue, setLiftedValue] = useState("");
  const [externalValue, setExternalValue] = useState(
    localStorage.getItem("cage-memory") || ""
  );

  const killLocal = () => {
    setLocalMounted(false);
    setTimeout(() => setLocalMounted(true), 500);
  };

  const killLifted = () => {
    setLiftedMounted(false);
    setTimeout(() => setLiftedMounted(true), 500);
  };

  const killExternal = () => {
    setExternalMounted(false);
    setTimeout(() => setExternalMounted(true), 500);
  };

  const updateExternal = (value: string) => {
    setExternalValue(value);
    localStorage.setItem("cage-memory", value);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-6 h-6 text-orange-500" />
        <h3 className="text-xl font-bold text-orange-400">
          Memory Persistence Patterns
        </h3>
      </div>

      <p className="text-slate-300 mb-6">
        Three approaches to state management. Watch what survives the unmount.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
          <h4 className="font-semibold text-slate-200 mb-3 text-sm">
            Local State
          </h4>
          {localMounted ? (
            <LocalMemory />
          ) : (
            <div className="h-24 flex items-center justify-center text-slate-500 text-sm">
              Unmounted...
            </div>
          )}
          <button
            onClick={killLocal}
            className="w-full mt-3 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-500 transition-colors"
          >
            Kill
          </button>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
          <h4 className="font-semibold text-slate-200 mb-3 text-sm">
            Lifted State
          </h4>
          {liftedMounted ? (
            <LiftedMemory value={liftedValue} onChange={setLiftedValue} />
          ) : (
            <div className="h-24 flex items-center justify-center text-slate-500 text-sm">
              Unmounted...
            </div>
          )}
          <button
            onClick={killLifted}
            className="w-full mt-3 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-500 transition-colors"
          >
            Kill
          </button>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
          <h4 className="font-semibold text-slate-200 mb-3 text-sm">
            External Storage
          </h4>
          {externalMounted ? (
            <ExternalMemory value={externalValue} onChange={updateExternal} />
          ) : (
            <div className="h-24 flex items-center justify-center text-slate-500 text-sm">
              Unmounted...
            </div>
          )}
          <button
            onClick={killExternal}
            className="w-full mt-3 px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-500 transition-colors"
          >
            Kill
          </button>
        </div>
      </div>
    </div>
  );
}

function LocalMemory() {
  const [memory, setMemory] = useState("");
  return (
    <input
      type="text"
      value={memory}
      onChange={(e) => setMemory(e.target.value)}
      placeholder="Type something..."
      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-slate-200 text-sm placeholder-slate-500"
    />
  );
}

function LiftedMemory({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type something..."
      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-slate-200 text-sm placeholder-slate-500"
    />
  );
}

function ExternalMemory({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type something..."
      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded text-slate-200 text-sm placeholder-slate-500"
    />
  );
}

function StateCorruptionDemo() {
  const [hasError, setHasError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  const triggerError = () => {
    setHasError(true);
    setErrorCount((c) => c + 1);
  };

  const reset = () => {
    setHasError(false);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Skull className="w-6 h-6 text-red-500" />
        <h3 className="text-xl font-bold text-orange-400">
          State Corruption Without Reset
        </h3>
      </div>

      <p className="text-slate-300 mb-6">
        When a component can't unmount cleanly, errors accumulate. The reset
        isn't a limitation—it's protection.
      </p>

      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
        {hasError ? (
          <div className="text-center">
            <div className="text-6xl mb-4">💀</div>
            <div className="text-red-500 font-bold text-xl mb-2">
              Corrupted State
            </div>
            <p className="text-slate-400 mb-4">
              Without the ability to reset, errors compound. Every mistake is
              permanent.
            </p>
            <div className="text-3xl font-bold text-red-500 mb-4">
              {errorCount} Accumulated Errors
            </div>
            <button
              onClick={reset}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-500 transition-colors"
            >
              Manual Reset Required
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">✨</div>
            <div className="text-orange-500 font-bold text-xl mb-2">
              Clean State
            </div>
            <p className="text-slate-400 mb-4">
              Component is healthy. But what happens when we can't reset?
            </p>
            <button
              onClick={triggerError}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-500 transition-colors"
              >
              Trigger Error (No Auto-Reset)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LearningTimelineDemo() {
  const [iterations, setIterations] = useState(0);
  const [patterns, setPatterns] = useState<string[]>([]);

  const learnablePatterns = [
    "Roll under carrier",
    "Avoid farmhouse Mimic",
    "Helicopter timing",
    "Beach assault route",
    "Omega location",
  ];

  const iterate = () => {
    setIterations((i) => i + 1);
    if (iterations < learnablePatterns.length) {
      setPatterns((p) => [...p, learnablePatterns[iterations]]);
    }
  };

  const reset = () => {
    setIterations(0);
    setPatterns([]);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <RotateCcw className="w-6 h-6 text-orange-500" />
        <h3 className="text-xl font-bold text-orange-400">
          Learning Across Iterations
        </h3>
      </div>

      <p className="text-slate-300 mb-6">
        Component state resets, but developer knowledge accumulates. Each
        iteration teaches something new.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h4 className="font-semibold text-slate-200 mb-4">
            Component State (Resets)
          </h4>
          <div className="text-center mb-4">
            <div className="text-5xl font-bold text-red-500 mb-2">
              {iterations}
            </div>
            <div className="text-sm text-slate-400">Current Iteration</div>
          </div>
          <div className="text-center text-slate-500 text-sm">
            Resets to 0 on each unmount
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h4 className="font-semibold text-slate-200 mb-4">
            Learned Patterns (Persist)
          </h4>
          <div className="space-y-2 mb-4">
            {patterns.length === 0 ? (
              <div className="text-slate-500 text-sm text-center py-4">
                No patterns learned yet
              </div>
            ) : (
              patterns.map((pattern, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-slate-300 bg-slate-800 px-3 py-2 rounded"
                >
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {pattern}
                </div>
              ))
            )}
          </div>
          <div className="text-center text-orange-500 text-sm font-medium">
            {patterns.length} / {learnablePatterns.length} patterns learned
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={iterate}
          disabled={iterations >= learnablePatterns.length}
          className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Die & Learn ({iterations + 1})
        </button>
        <button
          onClick={reset}
          className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
        >
          Reset Demo
        </button>
      </div>
    </div>
  );
}

function PatternComparisonDemo() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Code className="w-6 h-6 text-orange-500" />
        <h3 className="text-xl font-bold text-orange-400">
          Anti-Pattern vs Correct Pattern
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
          <h4 className="font-semibold text-red-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">❌</span>
            Fighting the System
          </h4>
          <pre className="bg-slate-900 p-4 rounded text-xs overflow-x-auto">
            <code className="text-slate-300">
              {`// Trying to persist state
// across unmounts
function Cage() {
  const [skills, setSkills] = 
    useState(previousSkills);
  // ❌ Can't access previous
  // instance's state
  
  const [knowledge, setKnowledge] = 
    useState(previousKnowledge);
  // ❌ State is destroyed
  
  return (
    <Soldier 
      skills={skills}
      knowledge={knowledge}
    />
  );
}`}
            </code>
          </pre>
          <p className="text-sm text-slate-400 mt-4">
            Expecting component state to survive unmounting leads to bugs and
            unpredictable behavior.
          </p>
        </div>

        <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-6">
          <h4 className="font-semibold text-green-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">✅</span>
            Working With It
          </h4>
          <pre className="bg-slate-900 p-4 rounded text-xs overflow-x-auto">
            <code className="text-slate-300">
              {`// Lift state to parent
function BattleSystem() {
  const [patterns, setPatterns] = 
    useState([]);
  
  return (
    <Cage 
      initialState="tarmac"
      patterns={patterns}
      onLearn={(p) => 
        setPatterns([...patterns, p])
      }
    />
  );
}

// Component accepts reset
function Cage({ patterns }) {
  const [position, setPosition] = 
    useState('tarmac');
  // ✅ Resets on unmount
  
  return <Soldier patterns={patterns} />;
}`}
            </code>
          </pre>
          <p className="text-sm text-slate-400 mt-4">
            Separate ephemeral state from persistent data. Let components reset
            cleanly.
          </p>
        </div>
      </div>
    </div>
  );
}