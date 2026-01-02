import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Zap,
  Shield,
  Sword,
  Eye,
  Users,
  Book,
  Map,
  Target,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface RingState {
  location: string;
  bearer: string;
  status: "hidden" | "revealed" | "in-danger" | "destroyed";
  corruptionLevel: number;
}

interface CharacterState {
  name: string;
  role: string;
  knowledge: string;
  desire: string;
  ringBelief: "weapon" | "destroy" | "study" | "hide";
}

interface Chapter {
  title: string;
  content: string;
  demoKey: string;
}

export default function LiftingStateInMiddleEarth(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [mode, setMode] = useState<"scattered" | "lifted">("scattered");
  const [ringState, setRingState] = useState<RingState>({
    location: "Frodo's pocket",
    bearer: "Frodo",
    status: "hidden",
    corruptionLevel: 10,
  });

  // Scattered state - each character has their own version
  const [gandalfState, setGandalfState] = useState<CharacterState>({
    name: "Gandalf",
    role: "Wizard",
    knowledge: "Ancient scrolls in Minas Tirith",
    desire: "Study the Ring's history",
    ringBelief: "study",
  });

  const [aragornState, setAragornState] = useState<CharacterState>({
    name: "Aragorn",
    role: "Ranger",
    knowledge: "Gollum's trail in Dead Marshes",
    desire: "Destroy immediate threat",
    ringBelief: "destroy",
  });

  const [boromirState, setBoromirState] = useState<CharacterState>({
    name: "Boromir",
    role: "Captain of Gondor",
    knowledge: "Dream of broken sword and halfling",
    desire: "Use Ring as weapon for Gondor",
    ringBelief: "weapon",
  });

  // Fellowship state (lifted)
  const [fellowshipMembers, setFellowshipMembers] = useState<string[]>([
    "Frodo",
    "Sam",
    "Merry",
    "Pippin",
    "Gandalf",
    "Aragorn",
    "Boromir",
    "Legolas",
    "Gimli",
  ]);

  const [activeDanger, setActiveDanger] = useState<string>("none");
  const [conflictCount, setConflictCount] = useState<number>(0);
  const [coordinationScore, setCoordinationScore] = useState<number>(0);

  // Circuit breaker
  useEffect(() => {
    if (conflictCount > 50) {
      resetAllState();
      alert("⚡ Circuit breaker: Too many state conflicts! System reset.");
    }
  }, [conflictCount]);

  const chapters: Chapter[] = useMemo(
    () => [
      {
        title: "The Scattered Truths",
        content:
          "Three men, three components of a story none of them can see in its entirety. Each holds a piece of the truth, a local state driving their actions. Gandalf has the history, Aragorn the present danger, Boromir the desperate future. They are all correct, and all dangerously incomplete. There are a dozen truths, but no single plan.",
        demoKey: "scattered-intro",
      },
      {
        title: "The Cost of Disunion",
        content:
          "When components operate on their own internal state, the result is not collaboration. It is chaos. At Weathertop, each component acts on its own logic. Aragorn fights, Frodo puts on the Ring in fear. The result is a critical wound. On Caradhras, conflicting state-driven decisions paralyze the group. The Ring corrupts from within, invisible to others.",
        demoKey: "disunion-chaos",
      },
      {
        title: "The Council of Elrond",
        content:
          "The state is lifted. It is no longer hidden in a component's private state. It is now visible in the common ancestor's scope, for all to see. The Ring must have one bearer, and the Fellowship one purpose. Frodo accepts the burden as designated state manager. The Council establishes props to pass down: the unified purpose.",
        demoKey: "council-lifting",
      },
      {
        title: "Two Paths, One Purpose",
        content:
          "To truly understand the power of a pattern, witness the failure of its alternative. Without lifted state: Boromir seizes the Ring, Aragorn pursues, Nazgûl snatches it. Application crashed. With lifted state: When the Watcher attacks, components react in perfect sync to `protectTheBearer`. The system works under pressure.",
        demoKey: "comparison-paths",
      },
      {
        title: "One State to Guide Them All",
        content:
          "The true strength of an architecture is revealed under stress. At Amon Hen, Boromir attempts a rogue state seizure. The lifted state architecture holds: Frodo makes a decision for the entire application. Even scattered across Middle-earth, components work in parallel connected by that single, lifted state.",
        demoKey: "resilience-test",
      },
    ],
    [],
  );

  const handleWeathertopAttack = useCallback(() => {
    setActiveDanger("weathertop");

    if (mode === "scattered") {
      // Unsynchronized response - each acts independently
      setTimeout(() => {
        setGandalfState((prev) => ({
          ...prev,
          desire: "Cast protective spell",
        }));
      }, 300);

      setTimeout(() => {
        setAragornState((prev) => ({
          ...prev,
          desire: "Fight Nazgûl with sword",
        }));
      }, 600);

      setTimeout(() => {
        setRingState((prev) => ({
          ...prev,
          status: "in-danger",
          corruptionLevel: prev.corruptionLevel + 20,
        }));
        setConflictCount((prev) => prev + 1);
      }, 900);

      setTimeout(() => {
        setActiveDanger("none");
        alert(
          "❌ Critical Failure: Frodo stabbed! States were unsynchronized.",
        );
      }, 1200);
    } else {
      // Lifted state - coordinated response
      setRingState((prev) => ({ ...prev, status: "in-danger" }));

      setTimeout(() => {
        setCoordinationScore((prev) => prev + 1);
        setActiveDanger("none");
        alert("✅ Coordinated Defense: Fellowship protected the bearer!");
      }, 800);
    }
  }, [mode]);

  const handleWatcherAttack = useCallback(() => {
    setActiveDanger("watcher");

    if (mode === "scattered") {
      // Chaotic, uncoordinated response
      const actions = [
        () =>
          setGandalfState((prev) => ({
            ...prev,
            desire: "Cast spell at tentacles",
          })),
        () =>
          setAragornState((prev) => ({
            ...prev,
            desire: "Cut nearest tentacle",
          })),
        () =>
          setBoromirState((prev) => ({
            ...prev,
            desire: "Shout orders to retreat",
          })),
      ];

      actions.forEach((action, index) => {
        setTimeout(action, index * 400);
      });

      setTimeout(() => {
        setConflictCount((prev) => prev + 1);
        setActiveDanger("none");
        alert("❌ Chaos: Uncoordinated actions failed to protect Frodo!");
      }, 1600);
    } else {
      // Coordinated through lifted state
      setRingState((prev) => ({ ...prev, status: "in-danger" }));

      const coordinatedActions = [
        "Gandalf prepares defensive spell",
        "Aragorn and Boromir hack at tentacles",
        "Legolas fires arrows",
        "All focus on protecting the Ringbearer",
      ];

      coordinatedActions.forEach((action, index) => {
        setTimeout(() => {
          setCoordinationScore((prev) => prev + 1);
        }, index * 300);
      });

      setTimeout(() => {
        setRingState((prev) => ({ ...prev, status: "hidden" }));
        setActiveDanger("none");
        alert("✅ Success: Coordinated defense through shared state!");
      }, 1500);
    }
  }, [mode]);

  const handleBoromirTemptation = useCallback(() => {
    if (mode === "scattered") {
      // System crash - conflicting state updates
      setBoromirState((prev) => ({
        ...prev,
        desire: "SEIZE THE RING FOR GONDOR!",
      }));
      setRingState((prev) => ({
        ...prev,
        bearer: "Boromir",
        corruptionLevel: 100,
      }));
      setConflictCount((prev) => prev + 10);

      setTimeout(() => {
        alert(
          "💥 SYSTEM CRASH: Conflicting state updates corrupted the application!",
        );
      }, 500);
    } else {
      // Lifted state allows graceful handling
      setRingState((prev) => ({
        ...prev,
        status: "in-danger",
        corruptionLevel: prev.corruptionLevel + 30,
      }));

      setTimeout(() => {
        // Frodo (state manager) makes decision
        setRingState((prev) => ({
          ...prev,
          bearer: "Frodo",
          location: "Fleeing to Mordor alone",
        }));

        // Fellowship splits but purpose remains
        setFellowshipMembers([
          "Aragorn",
          "Legolas",
          "Gimli",
          "Merry",
          "Pippin",
        ]);

        alert(
          "⚠️ Component Failure Handled: State manager preserved application integrity!",
        );
      }, 1000);
    }
  }, [mode]);

  const resetAllState = useCallback(() => {
    setRingState({
      location: "Frodo's pocket",
      bearer: "Frodo",
      status: "hidden",
      corruptionLevel: 10,
    });
    setGandalfState({
      name: "Gandalf",
      role: "Wizard",
      knowledge: "Ancient scrolls in Minas Tirith",
      desire: "Study the Ring's history",
      ringBelief: "study",
    });
    setAragornState({
      name: "Aragorn",
      role: "Ranger",
      knowledge: "Gollum's trail in Dead Marshes",
      desire: "Destroy immediate threat",
      ringBelief: "destroy",
    });
    setBoromirState({
      name: "Boromir",
      role: "Captain of Gondor",
      knowledge: "Dream of broken sword and halfling",
      desire: "Use Ring as weapon for Gondor",
      ringBelief: "weapon",
    });
    setFellowshipMembers([
      "Frodo",
      "Sam",
      "Merry",
      "Pippin",
      "Gandalf",
      "Aragorn",
      "Boromir",
      "Legolas",
      "Gimli",
    ]);
    setActiveDanger("none");
    setConflictCount(0);
    setCoordinationScore(0);
  }, []);

  const currentChapter = chapters[chapter];

  // Code examples
  const scatteredStateCode = `// ❌ SCATTERED STATE - Each component manages its own truth
function GandalfComponent() {
  const [myRingKnowledge, setMyRingKnowledge] = useState("Isildur's scroll");
  // Gandalf's local state - others can't see it
}

function AragornComponent() {
  const [myRingKnowledge, setMyRingKnowledge] = useState("Gollum's trail");
  // Aragorn's local state - conflicts with Gandalf's
}

function BoromirComponent() {
  const [myRingKnowledge, setMyRingKnowledge] = useState("Dream of power");
  // Boromir's local state - causes arguments
}`;

  const liftedStateCode = `// ✅ LIFTED STATE - Single source of truth
function Fellowship() {
  const [ringState, setRingState] = useState({
    location: "Frodo's pocket",
    bearer: "Frodo",
    status: "hidden"
  });

  return (
    <>
      <Gandalf ringState={ringState} />
      <Aragorn ringState={ringState} />
      <Boromir ringState={ringState} />
    </>
  );
}

// All children receive the same props
function Gandalf({ ringState }) {
  // Uses the shared state, not local copy
  return <div>Ring location: {ringState.location}</div>;
}`;

  const councilOfElrondCode = `// The Council of Elrond - Finding the Common Ancestor
function CouncilOfElrond() {
  // State lifted HERE - the closest common ancestor
  const [ringState, setRingState] = useState(initialRingState);
  
  // Create the Fellowship (parent component) with lifted state
  return (
    <Fellowship 
      ringState={ringState}
      onRingStateChange={setRingState}
    />
  );
}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 p-4 font-serif text-amber-50 md:p-8">
      {/* Header */}
      <header className="mb-8 border-b border-amber-800/30 bg-slate-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-amber-500" />
              <h1 className="text-2xl font-bold text-amber-200 md:text-3xl">
                The Lord of the Rings
              </h1>
            </div>
            <p className="text-sm text-slate-400 md:text-base">
              Fiction • The Fellowship • 1954
            </p>
          </div>
          <p className="text-base font-medium text-emerald-400 md:text-lg">
            Lifting State Up: One State to Rule Them All
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Chapter Content */}
          <div className="lg:col-span-7">
            <div className="prose prose-invert prose-lg mb-8 max-w-none">
              <h2 className="mb-4 text-2xl font-bold text-amber-200 md:text-3xl">
                {currentChapter.title}
              </h2>
              <p className="mb-6 leading-relaxed text-slate-300">
                {currentChapter.content}
              </p>

              {/* Chapter-specific memorable phrase */}
              {chapter === 0 && (
                <blockquote className="my-6 border-l-4 border-amber-500 pl-4 text-amber-300 italic">
                  "A dozen truths, but no single plan."
                </blockquote>
              )}
              {chapter === 1 && (
                <blockquote className="my-6 border-l-4 border-amber-500 pl-4 text-amber-300 italic">
                  "It answers to no single master here; it corrupts each of us
                  in secret."
                </blockquote>
              )}
              {chapter === 2 && (
                <blockquote className="my-6 border-l-4 border-emerald-500 pl-4 text-emerald-300 italic">
                  "The Ring must have one bearer, and the Fellowship one
                  purpose."
                </blockquote>
              )}
              {chapter === 3 && (
                <blockquote className="my-6 border-l-4 border-emerald-500 pl-4 text-emerald-300 italic">
                  "We argued over who owned the Ring, not how to destroy it."
                </blockquote>
              )}
              {chapter === 4 && (
                <blockquote className="my-6 border-l-4 border-emerald-500 pl-4 text-emerald-300 italic">
                  "One state, lifted up, to guide them all."
                </blockquote>
              )}
            </div>

            {/* Code Examples Section */}
            <div className="mb-8 space-y-6">
              {chapter === 0 && (
                <>
                  <CodeBlock
                    code={scatteredStateCode}
                    variant="error"
                    title="// ❌ Scattered State Anti-Pattern"
                    defaultExpanded={true}
                  />
                  <div className="rounded-lg bg-slate-800/50 p-4 text-sm text-slate-400">
                    <Book className="mr-2 inline h-4 w-4" />
                    <strong>Problem:</strong> Each component has its own
                    isolated state. When Gandalf updates his knowledge, Aragorn
                    and Boromir don't see it. This leads to inconsistency and
                    bugs.
                  </div>
                </>
              )}

              {chapter === 2 && (
                <>
                  <CodeBlock
                    code={councilOfElrondCode}
                    variant="success"
                    title="// ✅ The Council of Elrond Solution"
                    defaultExpanded={true}
                  />
                  <div className="rounded-lg bg-slate-800/50 p-4 text-sm text-slate-400">
                    <Users className="mr-2 inline h-4 w-4" />
                    <strong>Solution:</strong> Find the closest common ancestor
                    (Council of Elrond) and lift the state there. Create a
                    parent component (Fellowship) that manages the state and
                    passes it down as props.
                  </div>
                </>
              )}

              {chapter === 3 && (
                <CodeBlock
                  code={liftedStateCode}
                  variant="success"
                  title="// ✅ Lifted State Pattern"
                  defaultExpanded={true}
                />
              )}
            </div>
          </div>

          {/* Interactive Demo Panel */}
          <div className="lg:col-span-5">
            <div className="mb-6 rounded-xl border border-slate-700 bg-slate-800/40 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-bold text-amber-200">
                  <Target className="h-5 w-5" />
                  Interactive Fellowship
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMode("scattered")}
                    className={`rounded px-3 py-1 text-sm ${mode === "scattered" ? "bg-amber-600 text-white" : "bg-slate-700 text-slate-300"}`}
                  >
                    ❌ Scattered
                  </button>
                  <button
                    onClick={() => setMode("lifted")}
                    className={`rounded px-3 py-1 text-sm ${mode === "lifted" ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-300"}`}
                  >
                    ✅ Lifted
                  </button>
                </div>
              </div>

              {/* Ring State Display */}
              <div className="mb-6 rounded-lg border border-amber-500/30 bg-slate-900/60 p-4">
                <div className="mb-3 flex items-center gap-3">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <h4 className="font-bold text-amber-300">
                    The One Ring (Shared State)
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-slate-400">Location:</span>
                    <div className="font-mono">{ringState.location}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Bearer:</span>
                    <div className="font-mono">{ringState.bearer}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Status:</span>
                    <div
                      className={`font-mono ${ringState.status === "in-danger" ? "text-red-400" : "text-emerald-400"}`}
                    >
                      {ringState.status.toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400">Corruption:</span>
                    <div className="font-mono">
                      {ringState.corruptionLevel}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Character States */}
              <div className="mb-6 space-y-4">
                <div
                  className={`rounded-lg p-3 ${mode === "scattered" ? "border border-amber-500/30 bg-amber-950/20" : "border border-emerald-500/30 bg-emerald-950/20"}`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Book className="h-4 w-4 text-amber-400" />
                    <span className="font-bold">{gandalfState.name}</span>
                    <span className="ml-auto text-xs text-slate-400">
                      {mode === "scattered" ? "Local State" : "Receives Props"}
                    </span>
                  </div>
                  <div className="text-sm text-slate-300">
                    <div className="truncate">"{gandalfState.desire}"</div>
                    <div className="mt-1 text-xs text-slate-400">
                      Belief: {gandalfState.ringBelief}
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-lg p-3 ${mode === "scattered" ? "border border-amber-500/30 bg-amber-950/20" : "border border-emerald-500/30 bg-emerald-950/20"}`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Sword className="h-4 w-4 text-amber-400" />
                    <span className="font-bold">{aragornState.name}</span>
                    <span className="ml-auto text-xs text-slate-400">
                      {mode === "scattered" ? "Local State" : "Receives Props"}
                    </span>
                  </div>
                  <div className="text-sm text-slate-300">
                    <div className="truncate">"{aragornState.desire}"</div>
                    <div className="mt-1 text-xs text-slate-400">
                      Belief: {aragornState.ringBelief}
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-lg p-3 ${mode === "scattered" ? "border border-amber-500/30 bg-amber-950/20" : "border border-emerald-500/30 bg-emerald-950/20"}`}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-400" />
                    <span className="font-bold">{boromirState.name}</span>
                    <span className="ml-auto text-xs text-slate-400">
                      {mode === "scattered" ? "Local State" : "Receives Props"}
                    </span>
                  </div>
                  <div className="text-sm text-slate-300">
                    <div className="truncate">"{boromirState.desire}"</div>
                    <div className="mt-1 text-xs text-slate-400">
                      Belief: {boromirState.ringBelief}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chapter-Specific Controls */}
              <div className="space-y-3">
                {chapter === 1 && (
                  <button
                    onClick={handleWeathertopAttack}
                    disabled={activeDanger !== "none"}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/50 bg-red-900/40 px-4 py-3 text-red-300 hover:bg-red-900/60 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Eye className="h-4 w-4" />
                    Trigger Weathertop Attack
                  </button>
                )}

                {chapter === 3 && (
                  <button
                    onClick={handleWatcherAttack}
                    disabled={activeDanger !== "none"}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-500/50 bg-blue-900/40 px-4 py-3 text-blue-300 hover:bg-blue-900/60 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Sword className="h-4 w-4" />
                    Trigger Watcher Attack
                  </button>
                )}

                {chapter === 4 && (
                  <button
                    onClick={handleBoromirTemptation}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-purple-500/50 bg-purple-900/40 px-4 py-3 text-purple-300 hover:bg-purple-900/60"
                  >
                    <Shield className="h-4 w-4" />
                    Test Boromir's Temptation
                  </button>
                )}

                <button
                  onClick={resetAllState}
                  className="w-full rounded-lg bg-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-600"
                >
                  🔄 Reset All State
                </button>
              </div>

              {/* Metrics */}
              <div className="mt-6 border-t border-slate-700 pt-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-lg bg-slate-900/40 p-3 text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {conflictCount}
                    </div>
                    <div className="text-xs text-slate-400">
                      State Conflicts
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-900/40 p-3 text-center">
                    <div className="text-2xl font-bold text-emerald-400">
                      {coordinationScore}
                    </div>
                    <div className="text-xs text-slate-400">
                      Coordinated Actions
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-xs text-slate-500">
                  Current Mode:{" "}
                  <span
                    className={
                      mode === "scattered"
                        ? "text-amber-500"
                        : "text-emerald-500"
                    }
                  >
                    {mode.toUpperCase()} STATE
                  </span>
                </div>
              </div>
            </div>

            {/* Fellowship Members */}
            <div className="rounded-xl border border-slate-700 bg-slate-800/30 p-4">
              <h4 className="mb-3 flex items-center gap-2 font-bold text-amber-200">
                <Users className="h-4 w-4" />
                Fellowship Members ({fellowshipMembers.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {fellowshipMembers.map((member) => (
                  <span
                    key={member}
                    className={`rounded-full px-3 py-1 text-sm ${member === "Frodo" ? "border border-emerald-500/30 bg-emerald-900/40 text-emerald-300" : "bg-slate-700/40 text-slate-300"}`}
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex items-center justify-between border-t border-slate-800 pt-8">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="flex items-center gap-2 rounded-lg bg-amber-900/40 px-6 py-3 text-amber-300 hover:bg-amber-900/60 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ← Previous
          </button>

          <div className="flex flex-col items-center">
            <div className="mb-2 flex gap-1">
              {chapters.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-3 w-3 rounded-full ${idx === chapter ? "bg-emerald-500" : "bg-slate-700"}`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}: {currentChapter.title}
            </span>
          </div>

          <button
            onClick={() =>
              setChapter(Math.min(chapters.length - 1, chapter + 1))
            }
            disabled={chapter === chapters.length - 1}
            className="flex items-center gap-2 rounded-lg bg-emerald-900/40 px-6 py-3 text-emerald-300 hover:bg-emerald-900/60 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next →
          </button>
        </nav>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
        <div className="mx-auto max-w-3xl">
          <Map className="mx-auto mb-2 h-6 w-6 text-slate-600" />
          <p>
            One state, lifted to the closest common ancestor, creates a single
            source of truth.
          </p>
          <p className="mt-2">
            Pass data and callbacks as props to keep child components
            synchronized.
          </p>
        </div>
      </footer>
    </div>
  );
}
