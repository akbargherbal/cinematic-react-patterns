import { useState, useReducer, useMemo } from "react";
import { Lock, Unlock, Camera, CameraOff, Briefcase, Zap, AlertTriangle, CheckCircle, Users, ArrowRight } from "lucide-react";

// Types
interface HeistState {
  vault: "LOCKED" | "UNLOCKED";
  security: "ACTIVE" | "DISABLED";
  briefcase: "WITH_BENEDICT" | "WITH_LINUS";
  yenPosition: "OUTSIDE_VAULT" | "IN_SHAFT_WAITING" | "INSIDE_VAULT";
  power: "NORMAL" | "BACKUP";
  benedictStatus: "ALERT" | "DISTRACTED";
  stage: "PREPARATION" | "POSITIONING" | "INFILTRATION" | "VAULT_ACCESS" | "EXTRACTION" | "COMPLETE";
}

type HeistAction =
  | { type: "POSITION_YEN" }
  | { type: "DISABLE_SECURITY" }
  | { type: "CUT_POWER" }
  | { type: "TRIGGER_EXPLOSION" }
  | { type: "DISTRACT_BENEDICT" }
  | { type: "SWAP_BRIEFCASE" }
  | { type: "RESET" };

// Initial state
const initialHeistState: HeistState = {
  vault: "LOCKED",
  security: "ACTIVE",
  briefcase: "WITH_BENEDICT",
  yenPosition: "OUTSIDE_VAULT",
  power: "NORMAL",
  benedictStatus: "ALERT",
  stage: "PREPARATION",
};

// Reducer with validation
function heistReducer(state: HeistState, action: HeistAction): HeistState {
  switch (action.type) {
    case "POSITION_YEN":
      if (state.yenPosition !== "OUTSIDE_VAULT") return state;
      return {
        ...state,
        yenPosition: "IN_SHAFT_WAITING",
        stage: "POSITIONING",
      };

    case "DISABLE_SECURITY":
      if (state.yenPosition !== "IN_SHAFT_WAITING") return state;
      return {
        ...state,
        security: "DISABLED",
        stage: "INFILTRATION",
      };

    case "CUT_POWER":
      if (state.security !== "DISABLED") return state;
      return {
        ...state,
        power: "BACKUP",
        stage: "VAULT_ACCESS",
      };

    case "TRIGGER_EXPLOSION":
      if (state.power !== "BACKUP" || state.security !== "DISABLED") return state;
      return {
        ...state,
        vault: "UNLOCKED",
        yenPosition: "INSIDE_VAULT",
      };

    case "DISTRACT_BENEDICT":
      return {
        ...state,
        benedictStatus: "DISTRACTED",
      };

    case "SWAP_BRIEFCASE":
      if (state.vault !== "UNLOCKED" || state.benedictStatus !== "DISTRACTED") return state;
      return {
        ...state,
        briefcase: "WITH_LINUS",
        stage: "COMPLETE",
      };

    case "RESET":
      return initialHeistState;

    default:
      return state;
  }
}

// State display component
function HeistStateDisplay({ state, isValid = true }: { state: HeistState; isValid?: boolean }) {
  const borderColor = isValid ? "border-emerald-500/30" : "border-red-500/30";
  const bgColor = isValid ? "bg-emerald-500/5" : "bg-red-500/5";

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-4 space-y-2 transition-colors duration-300`}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Vault:</span>
        <span className="flex items-center gap-2 text-amber-400 font-medium">
          {state.vault === "LOCKED" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          {state.vault}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Security:</span>
        <span className="flex items-center gap-2 text-amber-400 font-medium">
          {state.security === "ACTIVE" ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
          {state.security}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Briefcase:</span>
        <span className="flex items-center gap-2 text-amber-400 font-medium">
          <Briefcase className="w-4 h-4" />
          {state.briefcase}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Yen Position:</span>
        <span className="text-amber-400 font-medium">{state.yenPosition}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Power:</span>
        <span className="flex items-center gap-2 text-amber-400 font-medium">
          <Zap className="w-4 h-4" />
          {state.power}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">Benedict:</span>
        <span className="text-amber-400 font-medium">{state.benedictStatus}</span>
      </div>
      <div className="pt-2 border-t border-slate-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Stage:</span>
          <span className="text-amber-500 font-bold">{state.stage}</span>
        </div>
      </div>
    </div>
  );
}

// Action button component
function ActionButton({
  onClick,
  disabled,
  children,
  variant = "default",
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "default" | "success" | "danger";
}) {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed";
  const variantClasses = {
    default: "bg-amber-500/20 border border-amber-500/50 text-amber-400 hover:bg-amber-500/30 active:scale-95",
    success: "bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30 active:scale-95",
    danger: "bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 active:scale-95",
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
}

// Chaos demo (useState approach)
function ChaosDemo() {
  const [vault, setVault] = useState<"LOCKED" | "UNLOCKED">("LOCKED");
  const [security, setSecurity] = useState<"ACTIVE" | "DISABLED">("ACTIVE");
  const [briefcase, setBriefcase] = useState<"WITH_BENEDICT" | "WITH_LINUS">("WITH_BENEDICT");
  const [yenPosition, setYenPosition] = useState<"OUTSIDE_VAULT" | "IN_SHAFT_WAITING" | "INSIDE_VAULT">("OUTSIDE_VAULT");
  const [power, setPower] = useState<"NORMAL" | "BACKUP">("NORMAL");
  const [benedictStatus, setBenedictStatus] = useState<"ALERT" | "DISTRACTED">("ALERT");

  // Check for invalid states
  const hasInvalidState =
    (vault === "UNLOCKED" && security === "ACTIVE") ||
    (briefcase === "WITH_LINUS" && vault === "LOCKED") ||
    (yenPosition === "INSIDE_VAULT" && vault === "LOCKED");

  const chaosState: HeistState = {
    vault,
    security,
    briefcase,
    yenPosition,
    power,
    benedictStatus,
    stage: hasInvalidState ? "PREPARATION" : "COMPLETE",
  };

  const handleReset = () => {
    setVault("LOCKED");
    setSecurity("ACTIVE");
    setBriefcase("WITH_BENEDICT");
    setYenPosition("OUTSIDE_VAULT");
    setPower("NORMAL");
    setBenedictStatus("ALERT");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-400" />
        <h3 className="text-lg font-bold text-red-400">Uncoordinated Approach (useState)</h3>
      </div>

      <HeistStateDisplay state={chaosState} isValid={!hasInvalidState} />

      {hasInvalidState && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-300">
            <strong>INVALID STATE DETECTED:</strong> Multiple independent updates have created an impossible state combination.
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <ActionButton onClick={() => setSecurity("DISABLED")} variant="danger">
          Disable Security
        </ActionButton>
        <ActionButton onClick={() => setYenPosition("INSIDE_VAULT")} variant="danger">
          Move Yen to Vault
        </ActionButton>
        <ActionButton onClick={() => setVault("UNLOCKED")} variant="danger">
          Unlock Vault
        </ActionButton>
        <ActionButton onClick={() => setBriefcase("WITH_LINUS")} variant="danger">
          Swap Briefcase
        </ActionButton>
        <ActionButton onClick={() => setPower("BACKUP")} variant="danger">
          Cut Power
        </ActionButton>
        <ActionButton onClick={() => setBenedictStatus("DISTRACTED")} variant="danger">
          Distract Benedict
        </ActionButton>
      </div>

      <ActionButton onClick={handleReset} variant="default">
        Reset Heist
      </ActionButton>
    </div>
  );
}

// Coordinated demo (useReducer approach)
function CoordinatedDemo() {
  const [state, dispatch] = useReducer(heistReducer, initialHeistState);
  const [lastAction, setLastAction] = useState<string>("");
  const [actionResult, setActionResult] = useState<"success" | "rejected" | null>(null);

  const handleAction = (action: HeistAction, actionName: string) => {
    const prevState = state;
    dispatch(action);
    setLastAction(actionName);

    // Check if state changed (action was accepted)
    setTimeout(() => {
      setActionResult(prevState === state ? "rejected" : "success");
      setTimeout(() => setActionResult(null), 2000);
    }, 0);
  };

  const isComplete = state.stage === "COMPLETE";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle className="w-5 h-5 text-emerald-400" />
        <h3 className="text-lg font-bold text-emerald-400">Coordinated Approach (useReducer)</h3>
      </div>

      <HeistStateDisplay state={state} isValid={true} />

      {actionResult && (
        <div
          className={`${
            actionResult === "success" ? "bg-emerald-500/10 border-emerald-500/30" : "bg-amber-500/10 border-amber-500/30"
          } border rounded-lg p-3 flex items-start gap-2 transition-all duration-300`}
        >
          {actionResult === "success" ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          )}
          <div className="text-sm">
            {actionResult === "success" ? (
              <span className="text-emerald-300">
                <strong>ACTION APPROVED:</strong> {lastAction} executed successfully.
              </span>
            ) : (
              <span className="text-amber-300">
                <strong>ACTION REJECTED:</strong> {lastAction} failed validation. Prerequisites not met.
              </span>
            )}
          </div>
        </div>
      )}

      {isComplete && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-emerald-400" />
          <div>
            <div className="text-emerald-400 font-bold">HEIST COMPLETE</div>
            <div className="text-sm text-emerald-300">All actions coordinated successfully. $160 million secured.</div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <ActionButton
          onClick={() => handleAction({ type: "POSITION_YEN" }, "Position Yen")}
          disabled={state.yenPosition !== "OUTSIDE_VAULT"}
          variant="success"
        >
          Position Yen
        </ActionButton>
        <ActionButton
          onClick={() => handleAction({ type: "DISABLE_SECURITY" }, "Disable Security")}
          disabled={state.yenPosition !== "IN_SHAFT_WAITING"}
          variant="success"
        >
          Disable Security
        </ActionButton>
        <ActionButton
          onClick={() => handleAction({ type: "CUT_POWER" }, "Cut Power")}
          disabled={state.security !== "DISABLED"}
          variant="success"
        >
          Cut Power
        </ActionButton>
        <ActionButton
          onClick={() => handleAction({ type: "TRIGGER_EXPLOSION" }, "Trigger Explosion")}
          disabled={state.power !== "BACKUP" || state.security !== "DISABLED"}
          variant="success"
        >
          Trigger Explosion
        </ActionButton>
        <ActionButton
          onClick={() => handleAction({ type: "DISTRACT_BENEDICT" }, "Distract Benedict")}
          disabled={state.benedictStatus === "DISTRACTED"}
          variant="success"
        >
          Distract Benedict
        </ActionButton>
        <ActionButton
          onClick={() => handleAction({ type: "SWAP_BRIEFCASE" }, "Swap Briefcase")}
          disabled={state.vault !== "UNLOCKED" || state.benedictStatus !== "DISTRACTED"}
          variant="success"
        >
          Swap Briefcase
        </ActionButton>
      </div>

      <ActionButton onClick={() => dispatch({ type: "RESET" })} variant="default">
        Reset Heist
      </ActionButton>
    </div>
  );
}

// Main component
export default function OceansElevenModule() {
  const [chapter, setChapter] = useState(0);

  const chapters = useMemo(
    () => [
      {
        title: "The Briefing",
        content: `Danny Ocean stands before a blueprint of the Bellagio, his finger tracing the path from the casino floor to the vault three stories below. Around him, ten specialists lean in—each a master of their craft, each essential to the plan.

"Gentlemen," Danny says, his voice calm but absolute, "we're going to rob three casinos in one night."

The room erupts in murmurs. Rusty Ryan, Danny's right hand, silences them with a look.

"The Bellagio vault holds $160 million on fight night," Danny continues. "But here's the thing—it's not just about getting in. It's about *coordination*. Security systems, vault timers, briefcase swaps, power grids, elevator controls—every piece has to move in perfect sequence."

He taps the blueprint. "Livingston, you'll monitor from the surveillance van. Every action goes through you. Linus, you don't swap the briefcase until Livingston confirms the vault is open. Yen, you don't trigger the explosion until Rusty confirms Benedict's men are in position."

"What if something changes?" Linus asks. "What if I see an opportunity—"

"You don't take it," Danny interrupts. "You report it. The plan adjusts. But *nothing* happens outside the plan. Because the moment someone improvises, the moment someone acts on their own timing, the whole thing collapses."`,
        demo: null,
      },
      {
        title: "The Chaos Timeline",
        content: `But let's imagine, for a moment, that Danny's team *didn't* follow the plan. Let's imagine they each acted independently, making their own decisions about when to execute their part of the heist.

**11:37 PM** - Rusty sees an opportunity and signals Basher to cut the cameras. No coordination.

**11:38 PM** - Livingston's screens flicker. "Wait, what? Who cut the cameras? We're not at that stage yet—Yen isn't in position!"

**11:39 PM** - Yen, seeing the power fluctuation, assumes it's his cue. He triggers the explosive charge. But the vault door is still locked.

**11:40 PM** - Linus, hearing the explosion, panics and swaps Benedict's briefcase. But Benedict is still in the room. He sees Linus. "What are you doing?"

Each team member made a decision based on their local view. None had the full picture. None knew what state the heist was actually in.

The heist entered a *race condition*. Multiple actions executed in an uncoordinated sequence. The state became inconsistent. Some parts thought the heist was in progress. Others thought it hadn't started. Still others thought it had already failed.`,
        demo: <ChaosDemo />,
      },
      {
        title: "The Impossible State",
        content: `Let's examine exactly *why* the uncoordinated approach failed. Let's look at the specific impossible states that emerged.

**The State Explosion Problem**

The heist has multiple pieces of state: vault status, security cameras, briefcase location, Yen's position, power grid, Benedict's attention.

If each piece updates independently, you have 2^6 = 64 possible combinations. But most are *invalid*.

**Invalid State #1: The Schrödinger's Vault**

When Rusty disabled cameras and Yen triggered the explosion simultaneously, the vault entered a quantum state: both accessible and inaccessible.

From Yen's perspective: "The explosion went off, so the vault must be accessible."
From Livingston's perspective: "The vault door is still locked, so it's inaccessible."

Both perspectives were based on real events. But they contradicted each other.

**Invalid State #2: The Phantom Briefcase**

When Linus swapped the briefcase before Benedict left, the briefcase entered a paradoxical state: both with Benedict (he's holding it) and with Linus (Linus swapped it).

This is a classic race condition. Linus updated his local state without checking the global state.`,
        demo: null,
      },
      {
        title: "The Master Plan",
        content: `Now let's see how the heist *actually* worked. Let's see what happens when every action goes through the master plan—through the reducer.

**The Control Room**

Livingston sits in the surveillance van. In front of him is a console showing the current state of the heist. This is the single source of truth.

**11:37 PM** - Rusty: "Request permission to disable cameras."

Livingston checks the state. He runs the action through the plan:
- ACTION: DISABLE_SECURITY
- CURRENT STATE: Yen is OUTSIDE_VAULT
- VALIDATION: Can we disable security while Yen is outside?
- RESULT: REJECTED

"Negative, Rusty. Yen isn't in position yet. Hold position."

**11:38 PM** - Yen: "Request permission to enter shaft."

Livingston validates:
- ACTION: ENTER_SHAFT
- VALIDATION: Can Yen position himself?
- RESULT: APPROVED

"Approved, Yen. Enter the shaft and hold."

Every action is validated against the current state before execution. Invalid actions are rejected, preventing impossible states.`,
        demo: <CoordinatedDemo />,
      },
      {
        title: "The Vault Opens",
        content: `The vault door swings open. Inside, $160 million in cash. Yen moves through the space with practiced efficiency. The heist is working.

Not because of luck. Not because of improvisation. But because every action went through the plan.

**When to Use a Reducer**

"You don't need a reducer for simple state," Danny explains. "If you're just tracking a single value—a counter, a toggle—use useState."

"But when do you need a reducer?"

**1. Multiple Pieces of Interdependent State** - When state depends on other state. The vault state depended on power, security, and Yen's position.

**2. Complex State Transitions** - When moving from one state to another requires logic and validation.

**3. Multiple Sources of Updates** - When different parts of your system need to update the same state.

**4. State That Needs to Be Predictable** - When you need to know exactly how state will change in response to an action.

The heist worked because we understood: complexity requires coordination. When you have multiple moving parts, multiple dependencies—you need a master plan. You need a single source of truth. You need a reducer.`,
        demo: (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ChaosDemo />
            </div>
            <div>
              <CoordinatedDemo />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-amber-500/30 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-amber-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-amber-500">Ocean's Eleven</h1>
          </div>
          <p className="text-lg text-slate-400">Coordinated State Management</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-amber-400">
            <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">useReducer</span>
            <span className="text-slate-500">•</span>
            <span>Complex State Logic</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-4">{currentChapter.title}</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Narrative */}
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-line">{currentChapter.content}</div>
          </div>

          {/* Interactive Demo */}
          {currentChapter.demo && (
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-slate-900/50 border border-amber-500/20 rounded-lg p-6">{currentChapter.demo}</div>
            </div>
          )}
        </div>

        {/* Key Takeaway */}
        {chapter === 4 && (
          <div className="mt-12 bg-amber-500/5 border border-amber-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <CheckCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">The Power of useReducer</h3>
                <p className="text-slate-300 mb-4">
                  When state is complex and interdependent, coordination isn't optional—it's survival. The reducer pattern ensures that every state transition is validated, preventing impossible states and race conditions.
                </p>
                <div className="flex items-center gap-2 text-sm text-amber-400">
                  <ArrowRight className="w-4 h-4" />
                  <span>Single source of truth • Validated transitions • Predictable behavior</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-t border-amber-500/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setChapter((c) => c - 1)}
            disabled={chapter === 0}
            className="px-6 py-2 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-lg font-medium transition-all duration-200 hover:bg-amber-500/30 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
            <div className="flex gap-1">
              {chapters.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    idx === chapter ? "bg-amber-500" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => setChapter((c) => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-2 bg-amber-500/20 border border-amber-500/50 text-amber-400 rounded-lg font-medium transition-all duration-200 hover:bg-amber-500/30 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}