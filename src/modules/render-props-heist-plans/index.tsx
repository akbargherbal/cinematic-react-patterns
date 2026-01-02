import { useState, useEffect, useCallback } from "react";
import {
  Brain,
  Zap,
  Shield,
  UserCheck,
  Key,
  AlertCircle,
  RefreshCw,
  Play,
  Pause,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// ======================
// Type Definitions
// ======================
interface SecurityState {
  guards: {
    count: number;
    positions: string[];
    distracted: boolean;
  };
  cameras: {
    active: number;
    blindSpots: string[];
  };
  vault: {
    status: "locked" | "unlocked" | "breached";
    laserGridActive: boolean;
    pressurePlateCold: boolean;
  };
  powerGrid: {
    stable: boolean;
    load: number;
  };
  timestamp: number;
}

interface Specialist {
  id: string;
  name: string;
  role: string;
  plan: (data: SecurityState) => string;
  icon: React.ReactNode;
}

// ======================
// Render Prop Component
// ======================
interface BellagioVaultAccessProps {
  children: (state: SecurityState) => React.ReactNode;
  updateInterval?: number;
}

function BellagioVaultAccess({
  children,
  updateInterval = 2000,
}: BellagioVaultAccessProps) {
  const [state, setState] = useState<SecurityState>({
    guards: {
      count: 3,
      positions: ["Main Hall", "Vault Entrance", "East Wing"],
      distracted: false,
    },
    cameras: {
      active: 12,
      blindSpots: ["Ventilation Shaft", "Service Elevator"],
    },
    vault: {
      status: "locked",
      laserGridActive: true,
      pressurePlateCold: false,
    },
    powerGrid: {
      stable: true,
      load: 65,
    },
    timestamp: Date.now(),
  });

  // Simulate live security updates
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        guards: {
          ...prev.guards,
          distracted: Math.random() > 0.7,
          positions: prev.guards.positions.map((pos) =>
            Math.random() > 0.8 ? "On Break" : pos,
          ),
        },
        vault: {
          ...prev.vault,
          laserGridActive: Math.random() > 0.3,
          pressurePlateCold: Math.random() > 0.5,
        },
        powerGrid: {
          stable: Math.random() > 0.2,
          load: Math.min(
            100,
            Math.max(30, prev.powerGrid.load + (Math.random() > 0.5 ? 5 : -5)),
          ),
        },
        timestamp: Date.now(),
      }));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return <>{children(state)}</>;
}

// ======================
// Specialist Components (Using Render Props)
// ======================
function LinusCard({ data }: { data: SecurityState }) {
  const canLiftCard =
    data.guards.distracted &&
    data.cameras.blindSpots.includes("Service Elevator");

  return (
    <div
      className={`rounded-lg border p-4 ${canLiftCard ? "border-green-500/50 bg-green-950/30" : "border-slate-700 bg-slate-900/50"}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <UserCheck className="h-5 w-5 text-blue-400" />
        <div>
          <h4 className="font-semibold">Linus Caldwell</h4>
          <p className="text-sm text-slate-400">Pickpocket Specialist</p>
        </div>
      </div>
      <p className="text-sm">
        {canLiftCard ? (
          <span className="text-green-400">
            ✅ Can lift keycard: Guards distracted & camera blind spot available
          </span>
        ) : (
          <span className="text-amber-400">
            ⏳ Waiting for:{" "}
            {data.guards.distracted ? "Camera blind spot" : "Guard distraction"}
          </span>
        )}
      </p>
    </div>
  );
}

function BasherEmp({ data }: { data: SecurityState }) {
  const canTriggerEMP = data.powerGrid.stable && data.guards.count < 3;

  return (
    <div
      className={`rounded-lg border p-4 ${canTriggerEMP ? "border-green-500/50 bg-green-950/30" : "border-slate-700 bg-slate-900/50"}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <Zap className="h-5 w-5 text-yellow-400" />
        <div>
          <h4 className="font-semibold">Basher Tarr</h4>
          <p className="text-sm text-slate-400">Electronics Expert</p>
        </div>
      </div>
      <p className="text-sm">
        {canTriggerEMP ? (
          <span className="text-green-400">
            ✅ Can trigger EMP: Grid stable ({data.powerGrid.load}%) & guards (
            {data.guards.count}) cleared
          </span>
        ) : (
          <span className="text-amber-400">
            ⏳ Waiting for:{" "}
            {data.powerGrid.stable
              ? `Guards ≤ 2 (currently ${data.guards.count})`
              : "Power grid to stabilize"}
          </span>
        )}
      </p>
    </div>
  );
}

function YenGrid({ data }: { data: SecurityState }) {
  const canTumble = data.vault.laserGridActive && data.vault.pressurePlateCold;
  const windowOpen = canTumble ? 3 : 0;

  return (
    <div
      className={`rounded-lg border p-4 ${canTumble ? "border-green-500/50 bg-green-950/30" : "border-slate-700 bg-slate-900/50"}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <Key className="h-5 w-5 text-purple-400" />
        <div>
          <h4 className="font-semibold">The Amazing Yen</h4>
          <p className="text-sm text-slate-400">Acrobat</p>
        </div>
      </div>
      <p className="text-sm">
        {canTumble ? (
          <span className="text-green-400">
            ✅ Can tumble through grid: {windowOpen} second window open!
          </span>
        ) : (
          <span className="text-amber-400">
            ⏳ Waiting for: Laser grid{" "}
            {data.vault.laserGridActive ? "active" : "inactive"} & pressure
            plate {data.vault.pressurePlateCold ? "cold" : "warm"}
          </span>
        )}
      </p>
    </div>
  );
}

// ======================
// Brittle Blueprint (Anti-Pattern) Components
// ======================
function BrittleLinusCard() {
  const [state, setState] = useState<Partial<SecurityState>>({});
  const [syncError, setSyncError] = useState(false);

  useEffect(() => {
    // Duplicated logic - same as Basher but isolated
    const interval = setInterval(() => {
      setState({
        guards: {
          count: Math.floor(Math.random() * 5),
          positions: [],
          distracted: Math.random() > 0.7,
        },
        cameras: {
          active: 12,
          blindSpots: Math.random() > 0.5 ? ["Service Elevator"] : [],
        },
      });

      // Simulate sync error 30% of the time
      if (Math.random() > 0.7) {
        setSyncError(true);
      }
    }, 2100); // Slightly different interval causes drift

    return () => clearInterval(interval);
  }, []);

  const canLiftCard =
    state.guards?.distracted &&
    state.cameras?.blindSpots?.includes("Service Elevator");

  return (
    <div
      className={`rounded-lg border p-4 ${syncError ? "border-red-500/50 bg-red-950/30" : "border-slate-700 bg-slate-900/50"}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <UserCheck className="h-5 w-5 text-blue-400" />
        <div>
          <h4 className="font-semibold">Linus (Brittle Plan)</h4>
          <p className="text-sm text-slate-400">Isolated data source</p>
        </div>
      </div>
      {syncError && (
        <div className="mb-2 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          <span>Sync error: Data diverged from team!</span>
        </div>
      )}
      <p className="text-sm">
        Guards distracted: {state.guards?.distracted ? "Yes" : "No"}
        <br />
        Camera blind spot:{" "}
        {state.cameras?.blindSpots?.includes("Service Elevator")
          ? "Available"
          : "Unavailable"}
      </p>
    </div>
  );
}

// ======================
// Main Module Component
// ======================
export default function RenderPropsHeistPlans(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<"brittle" | "renderprop">("brittle");
  const [simulationRunning, setSimulationRunning] = useState<boolean>(true);
  const [syncErrors, setSyncErrors] = useState<number>(0);
  const [guardPaused, setGuardPaused] = useState<boolean>(false);
  const [parentRef] = useAutoAnimate();

  const specialists: Specialist[] = [
    {
      id: "linus",
      name: "Linus Caldwell",
      role: "Pickpocket",
      plan: (data) =>
        `if (guards.distracted && cameras.blindSpots.includes("Service Elevator")) { liftKeycard(); }`,
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      id: "basher",
      name: "Basher Tarr",
      role: "Electronics",
      plan: (data) =>
        `if (powerGrid.stable && guards.count < 3) { triggerEMP(); }`,
      icon: <Zap className="h-5 w-5" />,
    },
    {
      id: "yen",
      name: "The Amazing Yen",
      role: "Acrobat",
      plan: (data) =>
        `if (vault.laserGridActive && vault.pressurePlateCold) { tumble(); }`,
      icon: <Key className="h-5 w-5" />,
    },
  ];

  const chapters = [
    {
      title: "The Architect's Dilemma",
      content:
        "The data is the same for everyone. The job is different for everyone. Danny Ocean faces the core problem: multiple specialists need identical live security data—guard positions, camera status, vault state—but each needs it for entirely different purposes. How do you build a system that shares complex logic without duplication?",
    },
    {
      title: "The Brittle Blueprints",
      content:
        "Danny's first solution creates separate, isolated plans for each specialist. Like thick binders with duplicated data, these components quickly fall out of sync. A guard schedule update in one binder isn't reflected in others. One change breaks everything. The maintenance becomes a nightmare, and during the dry run, conflicting plans trigger alarms.",
    },
    {
      title: "The Blank Card",
      content:
        "The breakthrough: inversion of control. Instead of giving specialists rigid scripts, Danny builds a single `<BellagioVaultAccess>` component that manages all the complex state. He hands each specialist a 'blank card'—a function that receives live data and returns their specific action. 'I don't give you the script. I give you the live feed, you give me the action.'",
    },
    {
      title: "Two Plans, One Grid",
      content:
        "Witness the difference. The brittle plan fails when a guard pauses unexpectedly—Yen's rigid script becomes useless. The render prop approach succeeds—Yen's function waits for the exact conditions (laser grid active AND pressure plate cold) then executes. We didn't give him a plan; we gave him a function. And that made all the difference.",
    },
    {
      title: "The Fountain",
      content:
        "The job is done. Each specialist executed their perfect little plan, adapting to real-time chaos. The system handled comms blackouts, target switches, and schedule changes. The secret wasn't building one perfect machine. It was building a factory that lets everyone build their own machine, right when they need it.",
    },
  ];

  const currentChapter = chapters[chapter];

  // Code examples as template literals
  const brittleCode = `// ❌ BRITTLE BLUEPRINT (Anti-pattern)
// Each specialist component manages its own state
function LinusPlan() {
  const [guards, setGuards] = useState([]);
  const [cameras, setCameras] = useState([]);
  
  // Duplicated logic - also in BasherPlan, YenPlan...
  useEffect(() => {
    fetchSecurityData().then(data => {
      setGuards(data.guards);
      setCameras(data.cameras);
    });
  }, []);
  
  // ... more duplicated logic
}

function BasherPlan() {
  const [guards, setGuards] = useState([]); // Duplicated!
  const [powerGrid, setPowerGrid] = useState(null); // Duplicated!
  
  useEffect(() => {
    fetchSecurityData().then(data => {
      setGuards(data.guards); // Same fetch, different component
      setPowerGrid(data.powerGrid);
    });
  }, []);
}`;

  const renderPropCode = `// ✅ RENDER PROP PATTERN
// Single source of truth manages all state
function BellagioVaultAccess({ children }) {
  const [securityState, setSecurityState] = useState({
    guards: [],
    cameras: [],
    vault: {},
    powerGrid: {}
  });

  // Logic centralized here
  useEffect(() => {
    const interval = setInterval(() => {
      fetchSecurityData().then(setSecurityState);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Pass live data to whatever function children provides
  return children(securityState);
}

// Specialists define WHAT to do with the data
function App() {
  return (
    <BellagioVaultAccess>
      {(liveData) => (
        <>
          <LinusCard data={liveData} />
          <BasherEmp data={liveData} />
          <YenGrid data={liveData} />
        </>
      )}
    </BellagioVaultAccess>
  );
}`;

  const functionAsPropCode = `// The "Blank Card" - Function as Prop
interface BellagioVaultAccessProps {
  // The render prop: function that receives state, returns JSX
  children: (state: SecurityState) => React.ReactNode;
}

function BellagioVaultAccess({ children }: BellagioVaultAccessProps) {
  const [state, setState] = useState(initialState);
  // ... manage all complex state logic here
  
  return children(state); // Execute the function with current state
}

// Usage - Specialist provides their action plan
<BellagioVaultAccess>
  {(liveData) => {
    if (liveData.guards.distracted && liveData.cameras.blind) {
      return <LiftKeycard />;
    }
    return <Wait />;
  }}
</BellagioVaultAccess>`;

  // Circuit breaker for sync errors
  useEffect(() => {
    if (syncErrors > 10) {
      setDemoMode("renderprop");
      setSyncErrors(0);
    }
  }, [syncErrors]);

  // Simulate guard pause for chapter 4 comparison
  useEffect(() => {
    if (chapter === 3 && simulationRunning) {
      const pauseTimer = setTimeout(() => {
        setGuardPaused(true);
      }, 3000);

      const resumeTimer = setTimeout(() => {
        setGuardPaused(false);
      }, 8000);

      return () => {
        clearTimeout(pauseTimer);
        clearTimeout(resumeTimer);
      };
    }
  }, [chapter, simulationRunning]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8 text-amber-500" />
              <h1 className="text-2xl font-bold md:text-3xl">Ocean's Eleven</h1>
            </div>
            <p className="text-sm text-slate-400 md:text-base">
              Heist • Danny Ocean & Crew • 2001
            </p>
          </div>
          <p className="text-base font-medium text-amber-500 md:text-lg">
            Render Props: Inverting Control with Function Props
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-12">
        {/* Left Column - Chapter Content */}
        <div className="lg:col-span-8">
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-amber-300 md:text-3xl">
              {currentChapter.title}
            </h2>
            <div className="space-y-4 leading-relaxed text-slate-300">
              {currentChapter.content.split("\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Code Examples */}
          <div className="mb-8 space-y-6">
            {chapter === 1 && (
              <>
                <CodeBlock
                  code={brittleCode}
                  variant="error"
                  title="// ❌ The Brittle Blueprint: Duplicated Logic"
                  language="jsx"
                  defaultExpanded={true}
                />
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span>
                    Problem: Each component fetches its own data. Changes don't
                    sync across the team.
                  </span>
                </div>
              </>
            )}

            {chapter === 2 && (
              <>
                <CodeBlock
                  code={renderPropCode}
                  variant="success"
                  title="// ✅ The Render Prop Solution: Single Source of Truth"
                  language="jsx"
                  defaultExpanded={true}
                />
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>
                    Solution: One component manages all state. Specialists
                    receive live data as function arguments.
                  </span>
                </div>
              </>
            )}

            {chapter === 3 && (
              <CodeBlock
                code={functionAsPropCode}
                variant="success"
                title="// 🔑 The Blank Card: Function as Prop Pattern"
                language="typescript"
                defaultExpanded={true}
              />
            )}
          </div>

          {/* Navigation */}
          <nav className="mt-12 flex items-center justify-between border-t border-slate-800 pt-6">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-slate-300 transition-all duration-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Previous
            </button>

            <div className="flex flex-col items-center">
              <div className="mb-2 flex gap-2">
                {chapters.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 w-2 rounded-full ${idx === chapter ? "bg-amber-500" : "bg-slate-700"}`}
                  />
                ))}
              </div>
              <span className="font-mono text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
            </div>

            <button
              onClick={() =>
                setChapter(Math.min(chapters.length - 1, chapter + 1))
              }
              disabled={chapter === chapters.length - 1}
              className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 text-white transition-all duration-300 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
            </button>
          </nav>
        </div>

        {/* Right Column - Interactive Demo */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-xl border border-slate-700 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-amber-300">
                Live Heist Dashboard
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSimulationRunning(!simulationRunning)}
                  className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
                  title={
                    simulationRunning ? "Pause simulation" : "Resume simulation"
                  }
                >
                  {simulationRunning ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setSyncErrors(0);
                    setGuardPaused(false);
                  }}
                  className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
                  title="Reset simulation"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Demo Mode Toggle */}
            <div className="mb-6">
              <div className="flex rounded-lg bg-slate-800 p-1">
                <button
                  onClick={() => setDemoMode("brittle")}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition-all duration-300 ${demoMode === "brittle" ? "bg-red-900/50 text-red-300" : "text-slate-400 hover:text-slate-300"}`}
                >
                  ❌ Brittle Blueprint
                </button>
                <button
                  onClick={() => setDemoMode("renderprop")}
                  className={`flex-1 rounded-md py-2 text-sm font-medium transition-all duration-300 ${demoMode === "renderprop" ? "bg-green-900/50 text-green-300" : "text-slate-400 hover:text-slate-300"}`}
                >
                  ✅ Render Prop
                </button>
              </div>
            </div>

            {/* Security Status */}
            <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-medium text-slate-300">Security Status</h4>
                <span className="font-mono text-xs text-slate-500">
                  Live {simulationRunning && "• Updating"}
                </span>
              </div>
              {guardPaused && chapter === 3 && (
                <div className="mb-3 rounded border border-amber-500/30 bg-amber-950/30 p-3">
                  <div className="flex items-center gap-2 text-amber-300">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      Guard paused unexpectedly!
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Specialist Plans */}
            <div className="space-y-4" ref={parentRef}>
              {demoMode === "brittle" ? (
                <>
                  <BrittleLinusCard />
                  <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                    <div className="mb-3 flex items-center gap-3">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <div>
                        <h4 className="font-semibold">Basher (Brittle Plan)</h4>
                        <p className="text-sm text-slate-400">
                          Different data source
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">
                      Power grid: Unknown
                      <br />
                      Guards: Unknown
                    </p>
                  </div>
                  {syncErrors > 0 && (
                    <div className="rounded border border-red-500/30 bg-red-950/20 p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-red-400">
                          Sync Errors: {syncErrors}
                        </span>
                        <button
                          onClick={() => setSyncErrors((s) => s + 1)}
                          className="rounded bg-red-900/50 px-2 py-1 text-xs text-red-300 hover:bg-red-800"
                        >
                          Simulate Error
                        </button>
                      </div>
                      {syncErrors >= 5 && (
                        <p className="mt-2 text-xs text-red-400">
                          ⚠️ Circuit breaker: {10 - syncErrors} more errors
                          before auto-switch to Render Prop
                        </p>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <BellagioVaultAccess
                  updateInterval={simulationRunning ? 2000 : 1000000}
                >
                  {(liveData) => (
                    <>
                      <LinusCard data={liveData} />
                      <BasherEmp data={liveData} />
                      <YenGrid data={liveData} />

                      {/* Chapter 4 Comparison */}
                      {chapter === 3 && (
                        <div className="mt-4 rounded-lg border border-slate-700 bg-slate-900/30 p-4">
                          <div className="mb-2 flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium">
                              Render Prop Advantage
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            {guardPaused ? (
                              <span className="text-amber-300">
                                Specialists waiting for conditions... (Guard
                                paused)
                              </span>
                            ) : (
                              "All specialists reacting to same live data"
                            )}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </BellagioVaultAccess>
              )}
            </div>

            {/* Demo Instructions */}
            <div className="mt-6 border-t border-slate-800 pt-6">
              <p className="text-sm text-slate-400">
                <span className="font-medium text-amber-400">
                  Demo Controls:
                </span>{" "}
                Switch between patterns to see the difference. The Brittle
                Blueprint shows isolated components with sync issues. Render
                Prop shows centralized state with real-time coordination.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
