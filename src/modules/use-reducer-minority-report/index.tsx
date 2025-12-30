import { useState, useReducer } from "react";
import { Eye, AlertTriangle, CheckCircle, Zap, Activity } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  id: string;
  title: string;
  content: string;
  atmosphere: string;
}

interface PreCrimeState {
  timeline: string;
  team: string;
  alertLevel: string;
  vehicleTracking: string;
  medicalDispatch: string;
}

type PreCrimeAction =
  | { type: "SIMPLE_CRIME"; payload: { timeline: string; team: string; alert: string } }
  | { type: "CONDITIONAL_SEQUENCE"; payload: { events: string[] } }
  | { type: "MULTI_DEPENDENCY"; payload: { primary: string; dependencies: string[] } }
  | { type: "RESET" };

const initialState: PreCrimeState = {
  timeline: "No active predictions",
  team: "Standby",
  alertLevel: "Green",
  vehicleTracking: "Inactive",
  medicalDispatch: "Inactive",
};

function precogReducer(state: PreCrimeState, action: PreCrimeAction): PreCrimeState {
  switch (action.type) {
    case "SIMPLE_CRIME":
      return {
        ...state,
        timeline: action.payload.timeline,
        team: action.payload.team,
        alertLevel: action.payload.alert,
      };
    case "CONDITIONAL_SEQUENCE":
      return {
        ...state,
        timeline: action.payload.events.join(" → "),
        team: "Alpha + Bravo (Coordinated)",
        alertLevel: "Red",
        vehicleTracking: "Active",
        medicalDispatch: "Standby",
      };
    case "MULTI_DEPENDENCY":
      return {
        ...state,
        timeline: `${action.payload.primary} (Dependencies: ${action.payload.dependencies.join(", ")})`,
        team: "Tactical Response",
        alertLevel: "Elevated",
        vehicleTracking: "Active",
        medicalDispatch: "Active",
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export default function MinorityReportModule(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Temple of State",
      content:
        "The air in the Temple is cool and still, thick with the scent of ozone and sterile fluids. Chief John Anderton stands on the gantry, looking down at the three PreCogs suspended in milky fluid. They are a single, unified processing unit. A source of pure, undeniable truth. \"The future,\" he murmurs, \"is just a state we haven't rendered yet.\" A red ball alert arrives: PREMEDITATED_MURDER. The system, fed by the PreCogs' vision, returns the next state. The arrest is flawless. The timeline is preserved. The system is perfect.",
      atmosphere: "sterile, futuristic, efficient",
    },
    {
      id: "build",
      title: "The Chaos of Intersecting Futures",
      content:
        "The first vision is simple: armed robbery at 14:00. Anderton manually updates three separate state variables. Then a second vision arrives—the same perpetrator kidnapping a child at 11:00, but only if a train runs on time. Anderton freezes. Which state updates first? A third vision: the father will chase and cause a pile-up. The screen fractures into overlapping windows. His team shouts questions. He's trying to hold all dependencies in his mind. In the confusion, he dispatches the wrong team to a stale location. \"Every vision is another piece of state I have to manage myself!\" The system has failed.",
      atmosphere: "frustrating, chaotic, overwhelming",
    },
    {
      id: "climax",
      title: "The Reducer Protocol",
      content:
        "In Dr. Hineman's greenhouse, Anderton recounts his failure. She smiles: \"You think the PreCogs send raw data you must assemble. Wrong. They are a collective consciousness. Their final vision IS the reconciliation. Stop trying to be the reducer, John. Just dispatch the vision.\" Back in the Ops Room, Anderton creates a protocol—defining the logic, not executing it. He packages three chaotic visions into a single action and dispatches it to the Temple. A single wooden ball returns with a clear, coherent future. Perfect. Elegant. He didn't build the future; he described the events and let the reducer do the rest.",
      atmosphere: "revelatory, elegant, satisfying",
    },
    {
      id: "resolution",
      title: "The Two Timelines",
      content:
        "A complex case arrives: bank heist dependent on power grid failure, dependent on solar flare. Fletcher uses the old method—screen fractures, confusion reigns, wrong team dispatched. Anderton steps in. He takes the same fragmented visions and composes one action: MULTI_DEPENDENCY_EVENT. The system processes everything. One directive returns: the flare is a bust, the real crime is the diversion. Clean arrest. \"You were trying to put the logic out here,\" Anderton explains. \"But the logic doesn't belong on the floor; it belongs in the Temple. We describe what happened. It gives us back the future.\"",
      atmosphere: "reflective, comparative, analytical",
    },
    {
      id: "summary",
      title: "The Elegance of Dispatch",
      content:
        "Anderton addresses his team, holding a blank wooden ball: \"This is our initial state.\" He holds up a data puck: \"This is an action—a description of an event.\" He gestures to the Temple: \"The reducer lives there. All the complex logic, handled in one place. Our job is no longer to manage state. We describe what happened. We dispatch. The reducer does the rest.\" A complex hostage alert arrives. The team doesn't panic. They compose an action, dispatch it. The system returns new state. The team moves. Resolution is swift and perfect. The system is in harmony.",
      atmosphere: "celebratory, confident, complete",
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-2">
            <Eye className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-100">Minority Report</h1>
          </div>
          <p className="text-lg md:text-xl text-cyan-400/70 ml-14">PreCrime Unit, 2054</p>
          <p className="text-sm text-slate-400 ml-14 mt-1">
            Teaching: <span className="text-cyan-400 font-mono">useReducer Hook</span>
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Chapter Navigation Bar */}
        <div className="mb-8 flex items-center justify-between bg-slate-900/30 border border-slate-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-mono text-slate-400">
              Chapter {chapter + 1} / {chapters.length}
            </span>
          </div>
          <div className="flex gap-1">
            {chapters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setChapter(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === chapter
                    ? "bg-cyan-400 w-8"
                    : idx < chapter
                    ? "bg-cyan-600"
                    : "bg-slate-700"
                }`}
                aria-label={`Go to chapter ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Chapter Content */}
        <div className="mb-12">
          <div className="flex items-baseline gap-4 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-100">{currentChapter.title}</h2>
            <span className="text-sm text-slate-500 italic">{currentChapter.atmosphere}</span>
          </div>
          <p className="text-lg leading-relaxed text-slate-300 max-w-4xl">{currentChapter.content}</p>
        </div>

        {/* Interactive Demo Section */}
        <section className="bg-slate-900/40 border border-cyan-500/20 rounded-xl p-8 shadow-xl shadow-cyan-900/10">
          {chapter === 0 && <Chapter1Demo />}
          {chapter === 1 && <Chapter2Demo />}
          {chapter === 2 && <Chapter3Demo />}
          {chapter === 3 && <Chapter4Demo />}
          {chapter === 4 && <Chapter5Demo />}
        </section>

        {/* Navigation Controls */}
        <nav className="flex justify-between items-center mt-12">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Previous
          </button>
          <span className="text-sm text-slate-500 font-mono">
            {currentChapter.id.toUpperCase()}
          </span>
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-3 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next →
          </button>
        </nav>
      </main>
    </div>
  );
}

// Chapter 1: Static visualization of reducer flow
function Chapter1Demo(): JSX.Element {
  const reducerFlowCode = `// The PreCog reducer: pure function, centralized logic
function precogReducer(currentState, action) {
  switch (action.type) {
    case 'PREMEDITATED_MURDER':
      return {
        ...currentState,
        timeline: action.payload.timestamp,
        suspect: action.payload.perpetrator,
        victim: action.payload.victim,
        team: 'Alpha Unit',
        status: 'INTERCEPTED'
      };
    default:
      return currentState;
  }
}

// Usage: dispatch the vision, get the future
const action = { 
  type: 'PREMEDITATED_MURDER', 
  payload: { perpetrator: 'Donald Dubin', victim: 'Leo Crow', timestamp: '14:09' } 
};

const newState = precogReducer(currentState, action);
// The future is rendered. Perfect. Precise.`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-cyan-400" />
        <h3 className="text-2xl font-bold text-cyan-100">The Perfect System</h3>
      </div>
      <p className="text-slate-300 leading-relaxed">
        The PreCogs operate as a single, pure function. They receive the current state of the world
        and a vision (action). They return a new, predicted state. No side effects. No chaos. Just
        input, logic, output.
      </p>

      <CodeBlock
        code={reducerFlowCode}
        variant="success"
        title="✅ The Temple's Pure Logic"
        defaultExpanded={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6">
          <div className="text-cyan-400 font-mono text-sm mb-2">INPUT</div>
          <div className="text-slate-300">Current State + Action</div>
        </div>
        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 flex items-center justify-center">
          <Eye className="w-8 h-8 text-cyan-400 animate-pulse" />
        </div>
        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6">
          <div className="text-cyan-400 font-mono text-sm mb-2">OUTPUT</div>
          <div className="text-slate-300">Next State (Predicted Future)</div>
        </div>
      </div>

      <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-6 mt-6">
        <p className="text-cyan-300 italic">
          "The future is just a state we haven't rendered yet."
        </p>
      </div>
    </div>
  );
}

// Chapter 2: Anti-pattern - multiple useState chaos
function Chapter2Demo(): JSX.Element {
  const [timeline, setTimeline] = useState<string>("Idle");
  const [team, setTeam] = useState<string>("Standby");
  const [alertLevel, setAlertLevel] = useState<string>("Green");
  const [vehicle, setVehicle] = useState<string>("Inactive");
  const [medical, setMedical] = useState<string>("Inactive");
  const [updateCount, setUpdateCount] = useState<number>(0);

  const handleVision1 = () => {
    setTimeline("Robbery at 14:00");
    setTeam("Bravo");
    setAlertLevel("Yellow");
    setUpdateCount((c) => c + 3);
  };

  const handleVision2 = () => {
    setTimeline("Kidnapping at 11:00 (if train on time)");
    setTeam("Bravo (redirected)");
    setAlertLevel("Orange");
    setVehicle("Tracking");
    setUpdateCount((c) => c + 4);
  };

  const handleVision3 = () => {
    setTimeline("Multi-vehicle pile-up at 11:45");
    setMedical("Dispatched");
    setAlertLevel("Red");
    // Oops, forgot to check if previous states are still valid!
    setUpdateCount((c) => c + 3);
  };

  const reset = () => {
    setTimeline("Idle");
    setTeam("Standby");
    setAlertLevel("Green");
    setVehicle("Inactive");
    setMedical("Inactive");
    setUpdateCount(0);
  };

  const brokenCode = `// ❌ Scattered State: Multiple useState hooks
const [timeline, setTimeline] = useState("Idle");
const [team, setTeam] = useState("Standby");
const [alertLevel, setAlertLevel] = useState("Green");
const [vehicle, setVehicle] = useState("Inactive");
const [medical, setMedical] = useState("Inactive");

// Vision 1: Simple robbery
function handleVision1() {
  setTimeline("Robbery at 14:00");  // Update 1
  setTeam("Bravo");                 // Update 2
  setAlertLevel("Yellow");          // Update 3
}

// Vision 2: Conditional kidnapping
function handleVision2() {
  setTimeline("Kidnapping at 11:00");  // Overwrites previous!
  setTeam("Bravo (redirected)");       // More manual logic
  setAlertLevel("Orange");             // Another update
  setVehicle("Tracking");              // Don't forget this!
}

// Vision 3: Pile-up
function handleVision3() {
  setTimeline("Pile-up at 11:45");  // Wait, what about previous timelines?
  setMedical("Dispatched");         // Dependencies unclear
  setAlertLevel("Red");             // Is robbery still happening?
  // Easy to forget updates. Logic is scattered everywhere.
}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        <h3 className="text-2xl font-bold text-red-100">The Manual State Nightmare</h3>
      </div>
      <p className="text-slate-300 leading-relaxed">
        Anderton tries to manage each piece of state manually. Every new vision requires multiple
        updates. The logic is scattered. Dependencies are unclear. One mistake and the entire
        system collapses.
      </p>

      <CodeBlock code={brokenCode} variant="error" title="❌ Scattered State Logic" defaultExpanded={true} />

      <div className="bg-slate-800/50 border border-red-500/30 rounded-lg p-6">
        <h4 className="text-lg font-bold text-red-300 mb-4">🐛 Try It: Trigger the Chaos</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <button
            onClick={handleVision1}
            className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all"
          >
            Vision 1: Robbery
          </button>
          <button
            onClick={handleVision2}
            className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all"
          >
            Vision 2: Kidnapping
          </button>
          <button
            onClick={handleVision3}
            className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all"
          >
            Vision 3: Pile-up
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-slate-900/50 p-3 rounded">
            <div className="text-xs text-slate-500 mb-1">Timeline</div>
            <div className="text-sm font-mono text-slate-200">{timeline}</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded">
            <div className="text-xs text-slate-500 mb-1">Team</div>
            <div className="text-sm font-mono text-slate-200">{team}</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded">
            <div className="text-xs text-slate-500 mb-1">Alert</div>
            <div className="text-sm font-mono text-slate-200">{alertLevel}</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded">
            <div className="text-xs text-slate-500 mb-1">Vehicle</div>
            <div className="text-sm font-mono text-slate-200">{vehicle}</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded">
            <div className="text-xs text-slate-500 mb-1">Medical</div>
            <div className="text-sm font-mono text-slate-200">{medical}</div>
          </div>
          <div className="bg-slate-900/50 p-3 rounded border border-red-500/30">
            <div className="text-xs text-slate-500 mb-1">State Updates</div>
            <div className="text-lg font-mono text-red-400">{updateCount}</div>
          </div>
        </div>

        <button
          onClick={reset}
          className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-all"
        >
          🔄 Reset Demo
        </button>
      </div>

      <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
        <p className="text-red-300 italic">
          "Every vision is another piece of state I have to manage myself!"
        </p>
        <p className="text-slate-400 text-sm mt-2">
          ⚠️ Notice: Logic is scattered, updates are manual, and it's easy to create inconsistent
          state. This approach doesn't scale.
        </p>
      </div>
    </div>
  );
}

// Chapter 3: Solution - useReducer with centralized logic
function Chapter3Demo(): JSX.Element {
  const [state, dispatch] = useReducer(precogReducer, initialState);

  const reducerCode = `// ✅ Centralized Logic: Single reducer function
interface PreCrimeState {
  timeline: string;
  team: string;
  alertLevel: string;
  vehicleTracking: string;
  medicalDispatch: string;
}

type PreCrimeAction =
  | { type: "SIMPLE_CRIME"; payload: { timeline: string; team: string; alert: string } }
  | { type: "CONDITIONAL_SEQUENCE"; payload: { events: string[] } }
  | { type: "RESET" };

function precogReducer(state: PreCrimeState, action: PreCrimeAction): PreCrimeState {
  switch (action.type) {
    case "SIMPLE_CRIME":
      return {
        ...state,
        timeline: action.payload.timeline,
        team: action.payload.team,
        alertLevel: action.payload.alert,
      };
    case "CONDITIONAL_SEQUENCE":
      // All the complex logic in ONE place
      return {
        ...state,
        timeline: action.payload.events.join(" → "),
        team: "Alpha + Bravo (Coordinated)",
        alertLevel: "Red",
        vehicleTracking: "Active",
        medicalDispatch: "Standby",
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// Usage: Just describe what happened, dispatch the action
const [state, dispatch] = useReducer(precogReducer, initialState);

dispatch({ 
  type: "CONDITIONAL_SEQUENCE", 
  payload: { events: ["Kidnapping", "Chase", "Pile-up"] } 
});
// The reducer handles ALL the logic. State is consistent. Perfect.`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle className="w-6 h-6 text-emerald-400" />
        <h3 className="text-2xl font-bold text-emerald-100">The Reducer Protocol</h3>
      </div>
      <p className="text-slate-300 leading-relaxed">
        All state transition logic lives in one place: the reducer. Anderton doesn't manage state
        manually. He dispatches actions—descriptions of events. The reducer returns a complete,
        consistent new state every time.
      </p>

      <CodeBlock
        code={reducerCode}
        variant="success"
        title="✅ Centralized State Logic"
        defaultExpanded={true}
      />

      <div className="bg-slate-800/50 border border-emerald-500/30 rounded-lg p-6">
        <h4 className="text-lg font-bold text-emerald-300 mb-4">✨ Dispatch Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          <button
            onClick={() =>
              dispatch({
                type: "SIMPLE_CRIME",
                payload: { timeline: "Robbery at 14:00", team: "Bravo", alert: "Yellow" },
              })
            }
            className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all"
          >
            Dispatch: Simple Crime
          </button>
          <button
            onClick={() =>
              dispatch({
                type: "CONDITIONAL_SEQUENCE",
                payload: { events: ["Kidnapping", "Father Chase", "Pile-up"] },
              })
            }
            className="px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-all"
          >
            Dispatch: Complex Sequence
          </button>
        </div>

        <div className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4 mb-4">
          <div className="text-xs text-emerald-400 font-mono mb-3">CURRENT STATE</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono">
            <div>
              <span className="text-slate-500">Timeline:</span>{" "}
              <span className="text-slate-200">{state.timeline}</span>
            </div>
            <div>
              <span className="text-slate-500">Team:</span>{" "}
              <span className="text-slate-200">{state.team}</span>
            </div>
            <div>
              <span className="text-slate-500">Alert Level:</span>{" "}
              <span className="text-slate-200">{state.alertLevel}</span>
            </div>
            <div>
              <span className="text-slate-500">Vehicle:</span>{" "}
              <span className="text-slate-200">{state.vehicleTracking}</span>
            </div>
            <div>
              <span className="text-slate-500">Medical:</span>{" "}
              <span className="text-slate-200">{state.medicalDispatch}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => dispatch({ type: "RESET" })}
          className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-all"
        >
          🔄 Reset State
        </button>
      </div>

      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
        <p className="text-emerald-300 italic">
          "Stop trying to be the reducer, John. Just dispatch the vision."
        </p>
        <p className="text-slate-400 text-sm mt-2">
          ✓ All logic centralized. State always consistent. No scattered updates. Beautiful.
        </p>
      </div>
    </div>
  );
}

// Chapter 4: Side-by-side comparison
function Chapter4Demo(): JSX.Element {
  const [mode, setMode] = useState<"broken" | "fixed">("broken");

  const brokenCode = `// ❌ Manual State: Fletcher's approach
function handleComplexCase() {
  const [heist, setHeist] = useState(false);
  const [grid, setGrid] = useState("stable");
  const [flare, setFlare] = useState("pending");
  
  // Vision 1: Bank heist
  setHeist(true);
  
  // Vision 2: Check solar flare
  if (checkFlareData()) {
    setFlare("confirmed");
    setGrid("failure");
  } else {
    setFlare("fizzled");
    // Oops! Forgot to update heist state
    // based on grid status
  }
  
  // Which team do I dispatch?
  // The logic is scattered everywhere!
}`;

  const fixedCode = `// ✅ Reducer: Anderton's protocol
function handleComplexCase() {
  const [state, dispatch] = useReducer(precogReducer, initialState);
  
  // Just describe what's happening
  dispatch({
    type: "MULTI_DEPENDENCY_EVENT",
    payload: {
      primary: "BANK_HEIST",
      dependencies: ["POWER_GRID_FAILURE", "SOLAR_FLARE_CONFIRMED"]
    }
  });
  
  // The reducer contains ALL the logic
  // for reconciling these dependencies.
  // One dispatch. One consistent state.
  // Clean. Reliable. Elegant.
}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="w-6 h-6 text-cyan-400" />
        <h3 className="text-2xl font-bold text-cyan-100">The Two Approaches</h3>
      </div>

      <div className="flex items-center justify-between mb-6">
        <p className="text-slate-300">Compare the scattered state vs. centralized reducer</p>
        <button
          onClick={() => setMode(mode === "broken" ? "fixed" : "broken")}
          className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-all font-medium"
        >
          {mode === "broken" ? "✅ Show Fix" : "❌ Show Bug"}
        </button>
      </div>

      <CodeBlock
        code={mode === "broken" ? brokenCode : fixedCode}
        variant={mode === "broken" ? "error" : "success"}
        title={mode === "broken" ? "❌ Scattered State Logic" : "✅ Centralized Reducer"}
        defaultExpanded={true}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
          <h4 className="text-lg font-bold text-red-300 mb-3">Fletcher's Way (Manual)</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">×</span>
              <span>Multiple useState calls</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">×</span>
              <span>Logic scattered across handlers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">×</span>
              <span>Easy to miss state updates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">×</span>
              <span>Inconsistent state likely</span>
            </li>
          </ul>
        </div>

        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
          <h4 className="text-lg font-bold text-emerald-300 mb-3">Anderton's Way (Reducer)</h4>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span>Single useReducer call</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span>All logic in one pure function</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span>Impossible to miss updates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-1">✓</span>
              <span>State always consistent</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-6">
        <p className="text-cyan-300 italic">
          "The logic doesn't belong on the floor; it belongs in the Temple."
        </p>
      </div>
    </div>
  );
}

// Chapter 5: Complete working example with multiple action types
function Chapter5Demo(): JSX.Element {
  const [state, dispatch] = useReducer(precogReducer, initialState);
  const [actionLog, setActionLog] = useState<string[]>([]);

  const handleDispatch = (action: PreCrimeAction, description: string) => {
    dispatch(action);
    setActionLog((log) => [...log, description]);
  };

  const reset = () => {
    dispatch({ type: "RESET" });
    setActionLog([]);
  };

  const completeCode = `// ✅ Production-Ready useReducer Pattern

// 1. Define your state shape
interface PreCrimeState {
  timeline: string;
  team: string;
  alertLevel: string;
  vehicleTracking: string;
  medicalDispatch: string;
}

// 2. Define your action types
type PreCrimeAction =
  | { type: "SIMPLE_CRIME"; payload: {...} }
  | { type: "CONDITIONAL_SEQUENCE"; payload: {...} }
  | { type: "MULTI_DEPENDENCY"; payload: {...} }
  | { type: "RESET" };

// 3. Write your reducer (centralized logic)
function precogReducer(state: PreCrimeState, action: PreCrimeAction): PreCrimeState {
  switch (action.type) {
    case "SIMPLE_CRIME":
      return { ...state, /* updates */ };
    case "CONDITIONAL_SEQUENCE":
      return { ...state, /* complex logic */ };
    case "MULTI_DEPENDENCY":
      return { ...state, /* reconciliation */ };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// 4. Use it in your component
function PreCrimeSystem() {
  const [state, dispatch] = useReducer(precogReducer, initialState);
  
  return (
    <div>
      <button onClick={() => dispatch({ type: "SIMPLE_CRIME", payload: {...} })}>
        Dispatch Vision
      </button>
      <StateDisplay state={state} />
    </div>
  );
}

// That's it. Clean. Scalable. Maintainable.`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Eye className="w-6 h-6 text-cyan-400" />
        <h3 className="text-2xl font-bold text-cyan-100">System in Harmony</h3>
      </div>
      <p className="text-slate-300 leading-relaxed">
        The PreCrime unit operates with effortless grace. Every action is dispatched. Every state
        transition is handled by the reducer. The system is predictable, reliable, and elegant.
      </p>

      <CodeBlock
        code={completeCode}
        variant="success"
        title="✅ Complete useReducer Pattern"
        defaultExpanded={true}
      />

      <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6">
        <h4 className="text-lg font-bold text-cyan-300 mb-4">🎯 Live System</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <button
            onClick={() =>
              handleDispatch(
                {
                  type: "SIMPLE_CRIME",
                  payload: { timeline: "Assault at 09:30", team: "Charlie", alert: "Yellow" },
                },
                "SIMPLE_CRIME dispatched"
              )
            }
            className="px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-all text-sm"
          >
            Simple Crime
          </button>
          <button
            onClick={() =>
              handleDispatch(
                {
                  type: "CONDITIONAL_SEQUENCE",
                  payload: { events: ["Burglary", "Car Chase", "Standoff"] },
                },
                "CONDITIONAL_SEQUENCE dispatched"
              )
            }
            className="px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-all text-sm"
          >
            Complex Sequence
          </button>
          <button
            onClick={() =>
              handleDispatch(
                {
                  type: "MULTI_DEPENDENCY",
                  payload: { primary: "Hostage Situation", dependencies: ["Traffic Jam", "Weather Alert"] },
                },
                "MULTI_DEPENDENCY dispatched"
              )
            }
            className="px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-all text-sm"
          >
            Multi-Dependency
          </button>
        </div>

        <div className="bg-slate-900/70 border border-cyan-500/20 rounded-lg p-6 mb-4">
          <div className="text-xs text-cyan-400 font-mono mb-3">SYSTEM STATE</div>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Timeline:</span>
              <span className="text-slate-200">{state.timeline}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Team:</span>
              <span className="text-slate-200">{state.team}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Alert Level:</span>
              <span className="text-slate-200">{state.alertLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Vehicle Tracking:</span>
              <span className="text-slate-200">{state.vehicleTracking}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Medical Dispatch:</span>
              <span className="text-slate-200">{state.medicalDispatch}</span>
            </div>
          </div>
        </div>

        {actionLog.length > 0 && (
          <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-4 mb-4">
            <div className="text-xs text-cyan-400 font-mono mb-2">ACTION LOG</div>
            <div className="space-y-1 text-xs font-mono text-slate-400 max-h-24 overflow-y-auto">
              {actionLog.map((log, idx) => (
                <div key={idx}>
                  {idx + 1}. {log}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={reset}
          className="w-full px-4 py-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 transition-all"
        >
          🔄 Reset System
        </button>
      </div>

      <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-6">
        <p className="text-cyan-300 italic mb-3">
          "We don't manage the state. We describe what happened."
        </p>
        <div className="text-sm text-slate-400 space-y-2">
          <p>✓ State transitions are predictable</p>
          <p>✓ Logic is centralized and testable</p>
          <p>✓ Complex dependencies are handled elegantly</p>
          <p>✓ The system scales with grace</p>
        </div>
      </div>
    </div>
  );
}
