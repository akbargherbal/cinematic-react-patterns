
import { useState, useEffect, useCallback } from "react";
import { Crown, Users, Shield, Swords, MapPin } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface ComponentState {
  id: string;
  name: string;
  knowledge: string;
  urgency: number;
}

interface FellowshipMember {
  name: string;
  role: string;
  status: "protecting" | "idle" | "failed";
}

export default function LiftingStateUpInMiddleEarth() {
  const [chapter, setChapter] = useState(0);

  const chapters = [
    {
      title: "The Scattered Truths",
      subtitle: "When components hold their own versions of truth",
    },
    {
      title: "The Cost of Disunion",
      subtitle: "The chaos of unsynchronized state",
    },
    {
      title: "The Council of Elrond",
      subtitle: "Lifting state to a common ancestor",
    },
    {
      title: "Two Paths, One Purpose",
      subtitle: "Comparing broken and fixed patterns",
    },
    {
      title: "One State to Guide Them All",
      subtitle: "The resilience of lifted state",
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-300 font-serif">
      {/* Header */}
<header className="border-b border-amber-500/30 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
  <div className="max-w-6xl mx-auto px-6 py-6">
    <div className="flex items-center gap-4 mb-3">
      <Crown className="w-10 h-10 text-amber-500" />
      <div className="flex items-baseline gap-4">
        <h1 className="text-xl lg:text-3xl font-bold text-amber-500">
          One State to Rule Them All
        </h1>
        <p className="text-lg text-amber-500/70">
          The Council of Elrond, 1954
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3 text-sm">
      <Shield className="w-4 h-4 text-emerald-500" />
      <span className="text-emerald-500">
        React Concept: Lifting State Up
      </span>
    </div>
  </div>
</header>


      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Chapter Header */}
        <div className="mb-12 text-center">
          <div className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4">
            <span className="text-amber-500 text-sm font-medium">
              Chapter {chapter + 1} of {chapters.length}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-500 mb-3">
            {currentChapter.title}
          </h2>
          <p className="text-xl text-slate-400">{currentChapter.subtitle}</p>
        </div>

        {/* Chapter Content */}
        <div className="space-y-12">
          {chapter === 0 && <Chapter1 />}
          {chapter === 1 && <Chapter2 />}
          {chapter === 2 && <Chapter3 />}
          {chapter === 3 && <Chapter4 />}
          {chapter === 4 && <Chapter5 />}
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-between mt-16 pt-8 border-t border-slate-800">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium transition-all hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-amber-600"
            aria-label="Previous chapter"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {chapters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setChapter(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === chapter
                    ? "bg-amber-500 scale-125"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Go to chapter ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium transition-all hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-amber-600"
            aria-label="Next chapter"
          >
            Next →
          </button>
        </nav>
      </main>
    </div>
  );
}

// Chapter 1: The Scattered Truths
function Chapter1() {
  const [components] = useState<ComponentState[]>([
    {
      id: "gandalf",
      name: "Gandalf",
      knowledge: "Historical threat from ancient scrolls",
      urgency: 8,
    },
    {
      id: "aragorn",
      name: "Aragorn",
      knowledge: "Present danger from tracking Gollum",
      urgency: 9,
    },
    {
      id: "boromir",
      name: "Boromir",
      knowledge: "Future hope as a weapon",
      urgency: 7,
    },
  ]);

  const localStateCode = `// Each component manages its own version of the truth
function Gandalf() {
  const [ringKnowledge] = useState("ancient evil from scrolls");
  // Isolated state - no one else knows
}

function Aragorn() {
  const [ringKnowledge] = useState("immediate danger in the wild");
  // Different truth - disconnected
}

function Boromir() {
  const [ringKnowledge] = useState("weapon to save Gondor");
  // Conflicting purpose - chaos incoming
}`;

  return (
    <div className="space-y-8">
      {/* Narrative */}
      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-lg leading-relaxed text-slate-300">
          The story of the state begins not in one place, but in many, each a lonely
          island of knowledge. In the deepest archive of Minas Tirith, Gandalf hunches
          over brittle scrolls. Miles away, Aragorn kneels in the mud tracking Gollum.
          In a windswept tower, Boromir dreams of the Ring as a weapon.
        </p>
        <p className="text-lg leading-relaxed text-slate-300">
          Three men, three components of a story none of them can see in its entirety.
          Each holds a piece of the truth, a local state driving their actions. There are{" "}
          <span className="text-amber-500 font-semibold">
            a dozen truths, but no single plan
          </span>
          .
        </p>
      </div>

      {/* Demo: Isolated Components */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-amber-500 mb-6 flex items-center gap-3">
          <Users className="w-6 h-6" />
          Isolated Components with Local State
        </h3>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {components.map((component) => (
            <div
              key={component.id}
              className="bg-slate-950 border-2 border-red-500/30 rounded-lg p-6 relative"
            >
              <div className="absolute -top-3 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded">
                ❌ ISOLATED
              </div>
              <h4 className="text-xl font-bold text-slate-200 mb-3">
                {component.name}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Knowledge:</span>
                  <span className="text-slate-300">{component.knowledge}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Urgency:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-4 rounded ${
                          i < component.urgency ? "bg-red-500" : "bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <p className="text-xs text-red-400">
                  ⚠️ No communication with other components
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
          <p className="text-red-400 text-sm leading-relaxed">
            <strong>The Problem:</strong> Each component holds its own version of the
            truth. They cannot coordinate, cannot sync, cannot form a unified plan.
            This is the anti-pattern—local state when shared state is needed.
          </p>
        </div>
      </div>

      {/* Code Example */}
      <CodeBlock
        code={localStateCode}
        variant="error"
        title="// ❌ Local State Anti-Pattern"
        language="tsx"
        defaultExpanded={true}
      />

      <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-6">
        <p className="text-amber-400 text-sm">
          💡 <strong>The Lesson:</strong> When multiple components need to share data,
          managing state locally in each component leads to inconsistency and chaos.
          The solution? We'll see it at the Council.
        </p>
      </div>
    </div>
  );
}

// Chapter 2: The Cost of Disunion
function Chapter2() {
  const [simulationActive, setSimulationActive] = useState(false);
  const [conflicts, setConflicts] = useState(0);
  const [failures, setFailures] = useState(0);
  const [componentActions, setComponentActions] = useState<string[]>([]);

  const resetDemo = useCallback(() => {
    setSimulationActive(false);
    setConflicts(0);
    setFailures(0);
    setComponentActions([]);
  }, []);

  const runSimulation = useCallback(() => {
    setSimulationActive(true);
    setComponentActions([]);

    const actions = [
      "Frodo: Consulting local state... isRingMyOnlyDefense = true",
      "Aragorn: Consulting local state... mustFightToProtect = true",
      "Sam: No shared plan, drawing sword...",
      "⚠️ CONFLICT: Multiple components acting independently",
      "💥 FAILURE: Frodo puts on Ring without coordination",
      "🗡️ CATASTROPHIC: Witch-king strikes exposed component",
    ];

    actions.forEach((action, index) => {
      setTimeout(() => {
        setComponentActions((prev) => [...prev, action]);
        if (action.includes("CONFLICT")) setConflicts((c) => c + 1);
        if (action.includes("FAILURE") || action.includes("CATASTROPHIC")) {
          setFailures((f) => f + 1);
        }
      }, index * 800);
    });

    setTimeout(() => setSimulationActive(false), actions.length * 800);
  }, []);

  const brokenCode = `// Weathertop: Each component acts on local state
function Weathertop() {
  return (
    <>
      <Frodo localState={{ fear: true, hasRing: true }} />
      <Aragorn localState={{ mustProtect: true }} />
      <Sam localState={{ confused: true }} />
    </>
  );
}

// Result: Uncoordinated actions lead to failure
// Frodo puts on Ring (exposing himself to Nazgûl)
// Aragorn fights (but doesn't know Frodo's plan)
// Sam tries to help (but has no context)
// ❌ Critical wound - application damaged`;

  return (
    <div className="space-y-8">
      {/* Narrative */}
      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-lg leading-relaxed text-slate-300">
          When components operate on their own internal state, the result is not
          collaboration. It is chaos. The wind howls over Weathertop. The Nazgûl appear,
          their shrieks tearing the night. Each component acts on its own logic—Sam draws
          his sword, Aragorn leaps forward with torch and blade, but Frodo, overwhelmed,
          puts on the Ring.
        </p>
        <p className="text-lg leading-relaxed text-slate-300">
          The application has suffered a critical wound.{" "}
          <span className="text-red-500 font-semibold">
            It answers to no single master here; it corrupts each of us in secret.
          </span>
        </p>
      </div>

      {/* Interactive Simulation */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-3">
          <Swords className="w-6 h-6" />
          The Weathertop Disaster
        </h3>

        <div className="mb-6 flex gap-4">
          <button
            onClick={runSimulation}
            disabled={simulationActive}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium transition-all hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {simulationActive ? "⚔️ Battle in Progress..." : "⚔️ Trigger Attack"}
          </button>
          <button
            onClick={resetDemo}
            className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium transition-all hover:bg-slate-600"
          >
            🔄 Reset
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
            <div className="text-red-400 text-sm mb-1">State Conflicts</div>
            <div className="text-3xl font-bold text-red-500 font-mono">{conflicts}</div>
          </div>
          <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
            <div className="text-red-400 text-sm mb-1">Critical Failures</div>
            <div className="text-3xl font-bold text-red-500 font-mono">{failures}</div>
          </div>
        </div>

        {/* Action Log */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 min-h-[200px]">
          <div className="text-slate-500 text-sm mb-3 font-mono">System Log:</div>
          <div className="space-y-2 font-mono text-sm">
            {componentActions.length === 0 && (
              <div className="text-slate-600">Awaiting trigger...</div>
            )}
            {componentActions.map((action, idx) => (
              <div
                key={idx}
                className={`${
                  action.includes("⚠️")
                    ? "text-yellow-400"
                    : action.includes("💥") || action.includes("🗡️")
                    ? "text-red-400"
                    : "text-slate-400"
                }`}
              >
                {action}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Code Example */}
      <CodeBlock
        code={brokenCode}
        variant="error"
        title="// ❌ The Chaos of Local State"
        language="tsx"
        defaultExpanded={true}
      />

      <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
        <p className="text-red-400 text-sm leading-relaxed">
          <strong>The Catastrophe:</strong> Without a shared source of truth, components
          make decisions in isolation. Frodo's fear, Aragorn's duty, and Sam's confusion
          all pull in different directions. The result is disaster—a wound that nearly
          ends the quest before it begins.
        </p>
      </div>
    </div>
  );
}

// Chapter 3: The Council of Elrond
function Chapter3() {
  const [stateLifted, setStateLifted] = useState(false);

  const beforeCode = `// Before: Each component owns its truth
function MiddleEarth() {
  return (
    <>
      <Gandalf localRingKnowledge="ancient evil" />
      <Aragorn localRingKnowledge="present danger" />
      <Boromir localRingKnowledge="weapon of hope" />
    </>
  );
}
// Result: Conflict, chaos, no coordination`;

  const afterCode = `// After: State lifted to common ancestor
function CouncilOfElrond() {
  // ✅ Single source of truth
  const [ringState, setRingState] = useState({
    location: "Rivendell",
    bearer: "Frodo",
    purpose: "Destroy in Mordor"
  });

  return (
    <Fellowship ringState={ringState}>
      <Gandalf /> {/* Receives props */}
      <Aragorn /> {/* Receives props */}
      <Boromir /> {/* Receives props */}
      <Frodo bearer={true} /> {/* State manager */}
    </Fellowship>
  );
}
// Result: Unity, clarity, single purpose`;

  return (
    <div className="space-y-8">
      {/* Narrative */}
      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-lg leading-relaxed text-slate-300">
          In the hidden valley of Rivendell, the broken system is brought before its
          architect. Elrond stands, his voice calm but authoritative: "You have all come
          seeking counsel. Some bring swords, some bring fears. You each hold a piece of
          the truth. But acting on your own truth, you have only created conflict."
        </p>
        <p className="text-lg leading-relaxed text-slate-300">
          Then Frodo stands. He walks to the center, to a stone plinth, and places the
          One Ring upon it. The state is lifted. It is no longer hidden in a component's
          private scope.{" "}
          <span className="text-emerald-500 font-semibold">
            The Ring must have one bearer, and the Fellowship one purpose.
          </span>
        </p>
      </div>

      {/* Interactive Lifting Demo */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-emerald-500 mb-6 flex items-center gap-3">
          <Crown className="w-6 h-6" />
          The State is Lifted
        </h3>

        <div className="mb-8">
          <button
            onClick={() => setStateLifted(!stateLifted)}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium transition-all hover:bg-emerald-500"
          >
            {stateLifted ? "↓ Show Before" : "↑ Lift State"}
          </button>
        </div>

        <div className="relative">
          {!stateLifted ? (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-full">
                  <span className="text-red-400 font-bold">❌ Before: Scattered State</span>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {["Gandalf", "Aragorn", "Boromir"].map((name) => (
                  <div
                    key={name}
                    className="bg-red-950/20 border-2 border-red-500/30 rounded-lg p-4"
                  >
                    <div className="text-slate-200 font-bold mb-2">{name}</div>
                    <div className="text-xs text-red-400">
                      useState(localTruth) 🔒
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center text-red-400 text-sm mt-4">
                Three sources of truth = Chaos
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
                  <span className="text-emerald-400 font-bold">
                    ✅ After: Lifted State
                  </span>
                </div>
              </div>

              <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-lg p-6 mb-6">
                <div className="text-center">
                  <div className="text-emerald-400 font-bold mb-2">
                    &lt;CouncilOfElrond /&gt;
                  </div>
                  <div className="text-sm text-emerald-300 font-mono">
                    useState(ringState) 👑
                  </div>
                  <div className="text-xs text-emerald-500 mt-2">
                    Single Source of Truth
                  </div>
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <div className="text-emerald-500 text-2xl">↓ ↓ ↓</div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {["Gandalf", "Aragorn", "Boromir"].map((name) => (
                  <div
                    key={name}
                    className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4"
                  >
                    <div className="text-slate-200 font-bold mb-2">{name}</div>
                    <div className="text-xs text-emerald-400">
                      props.ringState ✅
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center text-emerald-400 text-sm mt-4">
                One source of truth = Unity
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Code Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <CodeBlock
          code={beforeCode}
          variant="error"
          title="// ❌ Before Lifting"
          language="tsx"
          defaultExpanded={true}
        />
        <CodeBlock
          code={afterCode}
          variant="success"
          title="// ✅ After Lifting"
          language="tsx"
          defaultExpanded={true}
        />
      </div>

      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
        <p className="text-emerald-400 text-sm leading-relaxed">
          <strong>The Solution:</strong> The state is lifted to the closest common
          ancestor (the Council). Frodo becomes the designated state manager, not the
          owner. The Fellowship is formed with a single purpose, passed down as props to
          all members. One state, one truth, one path forward.
        </p>
      </div>
    </div>
  );
}

// Chapter 4: Two Paths, One Purpose
function Chapter4() {
  const [approachMode, setApproachMode] = useState<"broken" | "fixed">("broken");
  const [metrics, setMetrics] = useState({
    broken: { responseTime: 0, conflicts: 0, failures: 0 },
    fixed: { responseTime: 0, coordination: 0, success: 0 },
  });

  const runComparison = useCallback(() => {
    if (approachMode === "broken") {
      setMetrics((m) => ({
        ...m,
        broken: {
          responseTime: Math.floor(Math.random() * 5000) + 3000,
          conflicts: Math.floor(Math.random() * 5) + 3,
          failures: Math.floor(Math.random() * 3) + 1,
        },
      }));
    } else {
      setMetrics((m) => ({
        ...m,
        fixed: {
          responseTime: Math.floor(Math.random() * 1000) + 500,
          coordination: 100,
          success: 1,
        },
      }));
    }
  }, [approachMode]);

  const brokenApproachCode = `// Path of Local State: Watcher attacks
function WatcherAttack() {
  // Each component acts independently
  const [boromirAction] = useState("protect Gondor heir");
  const [aragornAction] = useState("draw sword");
  const [gandalfAction] = useState("prepare spell");
  
  // ❌ No coordination - who protects Frodo?
  // ❌ Conflicting priorities
  // ❌ Delayed response
  
  return <Chaos />; // Frodo nearly drowned
}`;

  const fixedApproachCode = `// Path of Lifted State: Watcher attacks
function Fellowship({ ringState }) {
  // Single directive from parent
  const protectBearer = () => {
    // All members receive same prop
    return "protect the ringbearer";
  };

  return (
    <>
      <Aragorn action={protectBearer()} />
      <Boromir action={protectBearer()} />
      <Gandalf action={protectBearer()} />
    </>
  );
  // ✅ Instant coordination
  // ✅ Unified purpose
  // ✅ Frodo saved
}`;

  return (
    <div className="space-y-8">
      {/* Narrative */}
      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-lg leading-relaxed text-slate-300">
          To truly understand the power of a pattern, one must witness the failure of
          its alternative. Imagine the Council had failed—Boromir seizes the Ring,
          Aragorn pursues him, and chaos erupts. A Nazgûl plucks the Ring from the
          chaos. The application crashes.
        </p>
        <p className="text-lg leading-relaxed text-slate-300">
          But in reality, when the Watcher attacks at Moria's gate, there is no debate.
          The logic is simple, passed down as a prop:{" "}
          <span className="text-blue-500 font-mono">protectTheBearer()</span>.{" "}
          <span className="text-emerald-500 font-semibold">
            We argued over who owned the Ring, not how to destroy it.
          </span>
        </p>
      </div>

      {/* Comparison Controls */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => setApproachMode("broken")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              approachMode === "broken"
                ? "bg-red-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            ❌ Show Broken Approach
          </button>
          <button
            onClick={() => setApproachMode("fixed")}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              approachMode === "fixed"
                ? "bg-emerald-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            ✅ Show Fixed Approach
          </button>
          <button
            onClick={runComparison}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all hover:bg-blue-500"
          >
            ⚔️ Trigger Attack
          </button>
        </div>

        {/* Metrics Display */}
        {approachMode === "broken" ? (
          <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
            <h4 className="text-red-400 font-bold mb-4">
              ❌ Local State Metrics (Broken)
            </h4>
            <div className="grid grid-cols-3 gap-4 font-mono text-sm">
              <div>
                <div className="text-slate-500 mb-1">Response Time</div>
                <div className="text-red-400 text-2xl">
                  {metrics.broken.responseTime}ms
                </div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Conflicts</div>
                <div className="text-red-400 text-2xl">{metrics.broken.conflicts}</div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Failures</div>
                <div className="text-red-400 text-2xl">{metrics.broken.failures}</div>
              </div>
            </div>
            <p className="text-red-400 text-sm mt-4">
              Components act independently, leading to delays and failures.
            </p>
          </div>
        ) : (
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
            <h4 className="text-emerald-400 font-bold mb-4">
              ✅ Lifted State Metrics (Fixed)
            </h4>
            <div className="grid grid-cols-3 gap-4 font-mono text-sm">
              <div>
                <div className="text-slate-500 mb-1">Response Time</div>
                <div className="text-emerald-400 text-2xl">
                  {metrics.fixed.responseTime}ms
                </div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Coordination</div>
                <div className="text-emerald-400 text-2xl">
                  {metrics.fixed.coordination}%
                </div>
              </div>
              <div>
                <div className="text-slate-500 mb-1">Success</div>
                <div className="text-emerald-400 text-2xl">{metrics.fixed.success}</div>
              </div>
            </div>
            <p className="text-emerald-400 text-sm mt-4">
              Perfect coordination from shared state and unified purpose.
            </p>
          </div>
        )}
      </div>

      {/* Side-by-side Code */}
      <div className="grid lg:grid-cols-2 gap-6">
        <CodeBlock
          code={brokenApproachCode}
          variant="error"
          title="// ❌ Path of Local State"
          language="tsx"
          defaultExpanded={true}
        />
        <CodeBlock
          code={fixedApproachCode}
          variant="success"
          title="// ✅ Path of Lifted State"
          language="tsx"
          defaultExpanded={true}
        />
      </div>
    </div>
  );
}

// Chapter 5: One State to Guide Them All
function Chapter5() {
  const [resilienceTest, setResilienceTest] = useState
    "idle" | "testing" | "survived"
  >("idle");
  const [fellowshipMembers, setFellowshipMembers] = useState<FellowshipMember[]>([
    { name: "Frodo (Bearer)", role: "State Manager", status: "idle" },
    { name: "Aragorn", role: "Protector", status: "idle" },
    { name: "Gandalf", role: "Guide", status: "idle" },
    { name: "Boromir", role: "Defender", status: "idle" },
  ]);

  const testResilience = useCallback(() => {
    setResilienceTest("testing");
    
    const sequence = [
      { index: 3, status: "failed" as const, delay: 1000 },
      { index: 0, status: "protecting" as const, delay: 1500 },
      { index: 1, status: "protecting" as const, delay: 2000 },
      { index: 2, status: "protecting" as const, delay: 2500 },
    ];

    sequence.forEach(({ index, status, delay }) => {
      setTimeout(() => {
        setFellowshipMembers((prev) =>
          prev.map((member, i) => (i === index ? { ...member, status } : member))
        );
      }, delay);
    });

    setTimeout(() => setResilienceTest("survived"), 3000);
  }, []);

  const resetTest = useCallback(() => {
    setResilienceTest("idle");
    setFellowshipMembers((prev) =>
      prev.map((member) => ({ ...member, status: "idle" }))
    );
  }, []);

  const finalCode = `// Complete Lifted State Pattern
function MiddleEarthApp() {
  // State lifted to highest needed level
  const [ringState, setRingState] = useState({
    bearer: "Frodo",
    location: "Shire",
    destination: "Mount Doom",
  });

  // Single update function
  const updateRingLocation = (newLocation: string) => {
    setRingState(prev => ({
      ...prev,
      location: newLocation
    }));
  };

  return (
    <Fellowship
      ringState={ringState}
      onUpdateLocation={updateRingLocation}
    >
      <Frodo /> {/* Manages state */}
      <Aragorn /> {/* Receives state */}
      <Gandalf /> {/* Receives state */}
      <Sam /> {/* Receives state */}
    </Fellowship>
  );
}

// ✅ Single source of truth
// ✅ Consistent state across all components
// ✅ System survives component failures
// ✅ One state to guide them all`;

  return (
    <div className="space-y-8">
      {/* Narrative */}
      <div className="prose prose-invert prose-lg max-w-none">
        <p className="text-lg leading-relaxed text-slate-300">
          The true strength of an architecture is revealed under stress. At Amon Hen,
          Boromir's component fails—he attempts to seize the state. But the system holds.
          Frodo, as the designated state manager, protects the state's integrity. The
          application survives the component failure.
        </p>
        <p className="text-lg leading-relaxed text-slate-300">
          From that point on, the Fellowship works in parallel, miles apart, yet still
          connected by that single, lifted state.{" "}
          <span className="text-amber-500 font-semibold">
            One state, lifted up, to guide them all.
          </span>
        </p>
      </div>

      {/* Resilience Test */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-amber-500 mb-6 flex items-center gap-3">
          <Shield className="w-6 h-6" />
          Resilience Test: Boromir's Temptation
        </h3>

        <div className="mb-6 flex gap-4">
          <button
            onClick={testResilience}
            disabled={resilienceTest === "testing"}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg font-medium transition-all hover:bg-amber-500 disabled:opacity-50"
          >
            {resilienceTest === "testing"
              ? "🔥 Testing..."
              : resilienceTest === "survived"
              ? "✅ System Survived"
              : "🔥 Test Resilience"}
          </button>
          <button
            onClick={resetTest}
            className="px-6 py-3 bg-slate-700 text-white rounded-lg font-medium transition-all hover:bg-slate-600"
          >
            🔄 Reset
          </button>
        </div>

        {/* Fellowship Status */}
        <div className="grid md:grid-cols-2 gap-4">
          {fellowshipMembers.map((member) => (
            <div
              key={member.name}
              className={`rounded-lg p-4 border-2 transition-all ${
                member.status === "failed"
                  ? "bg-red-950/30 border-red-500/50"
                  : member.status === "protecting"
                  ? "bg-emerald-950/30 border-emerald-500/50"
                  : "bg-slate-900 border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-200">{member.name}</h4>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    member.status === "failed"
                      ? "bg-red-500 text-white"
                      : member.status === "protecting"
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {member.status.toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-slate-400">{member.role}</div>
            </div>
          ))}
        </div>

        {resilienceTest === "survived" && (
          <div className="mt-6 bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
            <p className="text-emerald-400 text-sm">
              ✅ <strong>System Integrity Maintained:</strong> Despite Boromir's failure,
              the lifted state architecture allowed Frodo to protect the state and the
              quest to continue. The application didn't crash—it adapted.
            </p>
          </div>
        )}
      </div>

      {/* Final Code */}
      <CodeBlock
        code={finalCode}
        variant="success"
        title="// ✅ Complete Lifted State Pattern"
        language="tsx"
        defaultExpanded={true}
      />

      {/* Summary */}
      <div className="bg-gradient-to-br from-amber-950/30 to-emerald-950/30 border border-amber-500/30 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-amber-500 mb-4 flex items-center gap-3">
          <MapPin className="w-6 h-6" />
          The Architecture of Middle-earth
        </h3>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            When state is scattered and local, chaos reigns. When you lift state to the
            closest common ancestor, you create a single source of truth.
          </p>
          <p>
            The Council of Elrond was not just a meeting—it was the moment the
            application architecture was fixed. One state, managed in one place, passed
            down to all who needed it.
          </p>
          <p className="text-amber-500 font-semibold text-lg">
            One state, lifted up, to guide them all.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-amber-500/30">
          <h4 className="text-amber-500 font-bold mb-3">Key Lessons:</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span>
                When multiple components need the same state, lift it to their closest
                common ancestor
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span>
                Pass state down as props, creating a single source of truth for all
                children
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span>
                Provide update functions alongside state so children can request changes
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-1">✓</span>
              <span>
                Lifted state creates resilient systems that survive component failures
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
     
   