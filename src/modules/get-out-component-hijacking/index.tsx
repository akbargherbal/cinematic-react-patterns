import { useState, useRef, forwardRef, useImperativeHandle } from "react";
import { Eye, AlertTriangle, CheckCircle, XCircle, Zap } from "lucide-react";

// Types
interface ChapterContent {
  title: string;
  content: string;
  demo?: () => JSX.Element;
}

interface NormalComponentProps {
  isActive: boolean;
  onToggle: () => void;
}

interface HijackedComponentProps {
  isActive: boolean;
}

interface HijackedComponentRef {
  forceActivate: () => void;
  forceDeactivate: () => void;
}

// Demonstration Components
const NormalComponent = ({ isActive, onToggle }: NormalComponentProps) => {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-300">
        <CheckCircle className="h-5 w-5 text-emerald-500" />
        Declarative Control
      </h3>
      <div
        className={`flex h-32 w-full items-center justify-center rounded transition-all duration-300 ${
          isActive
            ? "border-2 border-emerald-500 bg-emerald-500/20"
            : "border-2 border-slate-600 bg-slate-800"
        }`}
      >
        <span className="font-mono text-sm text-slate-300">
          {isActive ? "Active (via props)" : "Inactive (via props)"}
        </span>
      </div>
      <button
        onClick={onToggle}
        className="mt-4 w-full rounded bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
      >
        Toggle via Props
      </button>
      <p className="mt-3 text-xs text-slate-400">
        Component controls its own rendering based on props
      </p>
    </div>
  );
};

const HijackedComponent = forwardRef<
  HijackedComponentRef,
  HijackedComponentProps
>(({ isActive }, ref) => {
  const [internalState, setInternalState] = useState(false);
  const [isHijacked, setIsHijacked] = useState(false);

  useImperativeHandle(ref, () => ({
    forceActivate: () => {
      setIsHijacked(true);
      // Internal state still updates, but doesn't control rendering
      setInternalState(true);
    },
    forceDeactivate: () => {
      setIsHijacked(true);
      setInternalState(false);
    },
  }));

  return (
    <div className="rounded-lg border border-red-700 bg-slate-900 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-300">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        Imperative Control (Ref)
      </h3>
      <div
        className={`flex h-32 w-full items-center justify-center rounded transition-all duration-300 ${
          isActive
            ? "border-2 border-red-500 bg-red-500/20"
            : "border-2 border-slate-600 bg-slate-800"
        } ${isHijacked ? "opacity-50 blur-[1px]" : ""}`}
      >
        <div className="text-center">
          <span className="block font-mono text-sm text-slate-300">
            {isActive ? "Active (via ref)" : "Inactive (via ref)"}
          </span>
          {isHijacked && (
            <span className="mt-2 block text-xs text-red-400">
              Internal state: {internalState ? "true" : "false"} (ignored)
            </span>
          )}
        </div>
      </div>
      <div className="mt-3 rounded bg-slate-800/50 p-3 text-xs text-slate-400">
        <p className="font-mono">Internal state still runs...</p>
        <p className="font-mono">But parent controls rendering via ref</p>
      </div>
    </div>
  );
});

HijackedComponent.displayName = "HijackedComponent";

// Multiple Hijacked Components Demo
const MultipleVictims = () => {
  const [controlActive, setControlActive] = useState(false);
  const victim1Ref = useRef<HijackedComponentRef>(null);
  const victim2Ref = useRef<HijackedComponentRef>(null);
  const victim3Ref = useRef<HijackedComponentRef>(null);

  const takeControl = () => {
    setControlActive(true);
    victim1Ref.current?.forceActivate();
    victim2Ref.current?.forceActivate();
    victim3Ref.current?.forceActivate();
  };

  const releaseControl = () => {
    setControlActive(false);
    victim1Ref.current?.forceDeactivate();
    victim2Ref.current?.forceDeactivate();
    victim3Ref.current?.forceDeactivate();
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
      <h3 className="mb-4 text-xl font-semibold text-slate-300">
        The Coagula Procedure: Multiple Hijacked Components
      </h3>
      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded border border-slate-600 bg-slate-800 p-4">
          <p className="mb-2 font-mono text-sm text-slate-400">Walter</p>
          <HijackedComponent ref={victim1Ref} isActive={controlActive} />
        </div>
        <div className="rounded border border-slate-600 bg-slate-800 p-4">
          <p className="mb-2 font-mono text-sm text-slate-400">Georgina</p>
          <HijackedComponent ref={victim2Ref} isActive={controlActive} />
        </div>
        <div className="rounded border border-slate-600 bg-slate-800 p-4">
          <p className="mb-2 font-mono text-sm text-slate-400">Chris</p>
          <HijackedComponent ref={victim3Ref} isActive={controlActive} />
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={takeControl}
          className="flex-1 rounded bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
        >
          Activate Coagula (Imperative Control)
        </button>
        <button
          onClick={releaseControl}
          className="flex-1 rounded bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Release Control
        </button>
      </div>
      <p className="mt-4 rounded bg-slate-800/50 p-3 text-sm text-slate-400">
        All three components' internal logic still runs, but the parent controls
        their rendering imperatively through refs.
      </p>
    </div>
  );
};

// Breaking Free Demo
const BreakingFreeDemo = () => {
  const [pattern, setPattern] = useState<"imperative" | "declarative">(
    "imperative",
  );

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
      <h3 className="mb-4 text-xl font-semibold text-slate-300">
        Breaking Free: Imperative → Declarative
      </h3>
      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <div
          className={`rounded-lg border-2 p-4 transition-all ${
            pattern === "imperative"
              ? "border-red-500 bg-red-950/20"
              : "border-slate-600 bg-slate-800/50 opacity-50"
          }`}
        >
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-400">
            <XCircle className="h-4 w-4" />
            Imperative (Hijacked)
          </h4>
          <pre className="overflow-x-auto font-mono text-xs text-slate-300">
            {`const victimRef = useRef();

useEffect(() => {
  // Parent controls child imperatively
  victimRef.current.forceState();
  victimRef.current.overrideRender();
}, []);

<VictimComponent ref={victimRef} />`}
          </pre>
        </div>
        <div
          className={`rounded-lg border-2 p-4 transition-all ${
            pattern === "declarative"
              ? "border-emerald-500 bg-emerald-950/20"
              : "border-slate-600 bg-slate-800/50 opacity-50"
          }`}
        >
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <CheckCircle className="h-4 w-4" />
            Declarative (Autonomous)
          </h4>
          <pre className="overflow-x-auto font-mono text-xs text-slate-300">
            {`const [state, setState] = useState();

// Parent passes props declaratively
const handleAction = () => {
  setState(newValue);
};

<ChildComponent 
  data={state}
  onAction={handleAction}
/>`}
          </pre>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => setPattern("imperative")}
          className={`flex-1 rounded px-6 py-3 font-semibold transition-all ${
            pattern === "imperative"
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-400 hover:bg-slate-600"
          }`}
        >
          Show Imperative
        </button>
        <button
          onClick={() => setPattern("declarative")}
          className={`flex-1 rounded px-6 py-3 font-semibold transition-all ${
            pattern === "declarative"
              ? "bg-emerald-600 text-white"
              : "bg-slate-700 text-slate-400 hover:bg-slate-600"
          }`}
        >
          Show Declarative
        </button>
      </div>
      <p className="mt-4 rounded bg-slate-800/50 p-3 text-sm text-slate-400">
        {pattern === "imperative"
          ? "Component is trapped in the Sunken Place - internal logic runs but can't control rendering"
          : "Component has autonomy - it controls its own rendering based on props and state"}
      </p>
    </div>
  );
};

// Guidelines Demo
const GuidelinesDemo = () => {
  const appropriate = [
    {
      icon: CheckCircle,
      text: "Focus management (.focus())",
      example: "inputRef.current.focus()",
    },
    {
      icon: CheckCircle,
      text: "DOM measurements",
      example: "divRef.current.getBoundingClientRect()",
    },
    {
      icon: CheckCircle,
      text: "Animations (imperative libraries)",
      example: "gsap.to(elementRef.current, {...})",
    },
    {
      icon: CheckCircle,
      text: "Third-party integrations",
      example: "new Chart(canvasRef.current, {...})",
    },
  ];

  const inappropriate = [
    {
      icon: XCircle,
      text: "State management",
      example: "❌ ref.current.setState()",
    },
    {
      icon: XCircle,
      text: "Conditional rendering",
      example: "❌ ref.current.show()",
    },
    {
      icon: XCircle,
      text: "Data flow control",
      example: "❌ ref.current.updateData()",
    },
    {
      icon: XCircle,
      text: "Replacing render logic",
      example: "❌ ref.current.render()",
    },
  ];

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
      <h3 className="mb-6 text-xl font-semibold text-slate-300">
        When to Use Refs: The Guidelines
      </h3>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-400">
            <CheckCircle className="h-5 w-5" />
            Appropriate Use
          </h4>
          <div className="space-y-3">
            {appropriate.map((item, idx) => (
              <div
                key={idx}
                className="rounded border border-emerald-500/30 bg-emerald-950/20 p-3"
              >
                <div className="mb-2 flex items-start gap-2">
                  <item.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <span className="text-sm text-slate-300">{item.text}</span>
                </div>
                <code className="block pl-6 font-mono text-xs text-emerald-400">
                  {item.example}
                </code>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-400">
            <XCircle className="h-5 w-5" />
            Inappropriate Use
          </h4>
          <div className="space-y-3">
            {inappropriate.map((item, idx) => (
              <div
                key={idx}
                className="rounded border border-red-500/30 bg-red-950/20 p-3"
              >
                <div className="mb-2 flex items-start gap-2">
                  <item.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <span className="text-sm text-slate-300">{item.text}</span>
                </div>
                <code className="block pl-6 font-mono text-xs text-red-400">
                  {item.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 rounded border border-slate-600 bg-slate-800/50 p-4">
        <p className="text-sm leading-relaxed text-slate-300">
          <strong className="text-slate-200">Remember:</strong> Refs are escape
          hatches for imperative operations that can't be expressed
          declaratively. Use them sparingly and only when necessary. Building
          your architecture around refs creates the Sunken Place.
        </p>
      </div>
    </div>
  );
};

// Main Component
export default function GetOutComponentHijacking() {
  const [chapter, setChapter] = useState(0);
  const [normalActive, setNormalActive] = useState(false);
  const [hijackedActive, setHijackedActive] = useState(false);
  const hijackedRef = useRef<HijackedComponentRef>(null);

  const chapters: ChapterContent[] = [
    {
      title: "The Weekend Invitation",
      content: `Chris Washington accepts his girlfriend Rose's invitation to meet her parents. Everything appears normal—a beautiful estate, welcoming smiles. But something feels wrong.

The servants move strangely. Walter and Georgina respond to commands, but there's a disconnect, as if someone else is controlling their bodies while their minds watch from somewhere far away.

In React terms, they've been hijacked. Their internal logic still runs—their consciousness, their state, their lifecycle methods all continue to execute—but they no longer control their own rendering. Someone else has gained imperative access to their DOM nodes through refs.

Rose's family isn't just passing props. They're preparing to attach a ref. And once that ref is attached, the declarative contract breaks.`,
      demo: () => (
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
          <h3 className="mb-4 text-xl font-semibold text-slate-300">
            Normal React Flow vs. Ref Control
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <NormalComponent
              isActive={normalActive}
              onToggle={() => setNormalActive(!normalActive)}
            />
            <div className="rounded-lg border border-red-700 bg-slate-900 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-300">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Imperative Control (Ref)
              </h3>
              <div
                className={`flex h-32 w-full items-center justify-center rounded transition-all duration-300 ${
                  hijackedActive
                    ? "border-2 border-red-500 bg-red-500/20"
                    : "border-2 border-slate-600 bg-slate-800"
                }`}
              >
                <span className="font-mono text-sm text-slate-300">
                  {hijackedActive ? "Active (via ref)" : "Inactive (via ref)"}
                </span>
              </div>
              <button
                onClick={() => {
                  setHijackedActive(!hijackedActive);
                  if (!hijackedActive) {
                    hijackedRef.current?.forceActivate();
                  } else {
                    hijackedRef.current?.forceDeactivate();
                  }
                }}
                className="mt-4 w-full rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
              >
                Control via Ref
              </button>
              <p className="mt-3 text-xs text-slate-400">
                Parent bypasses props and controls DOM directly
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "The Sunken Place",
      content: `Missy stirs her tea with a silver spoon. The rhythmic clink, clink, clink. Chris's eyes grow heavy. He's sinking—down, down, down—into darkness.

His consciousness remains intact. He can see through his eyes. He can hear through his ears. But he cannot move. He cannot speak. He cannot control his own body.

He has entered the Sunken Place.

His component logic is still running. His state is still updating. His effects are still firing. But his render function has been overridden. Someone else is controlling his DOM now.

This is the horror of ref forwarding when misused: the component's internal logic becomes a ghost—still present, still running, still updating state—but completely unable to affect what the user sees.`,
      demo: () => (
        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-300">
            <Eye className="h-6 w-6 text-red-500" />
            The Sunken Place: Internal Logic Still Runs
          </h3>
          <div className="rounded-lg border border-red-500/30 bg-slate-800 p-6">
            <div className="mb-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  Component Internal State:
                </span>
                <span className="font-mono text-sm text-emerald-400">
                  Running ✓
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-400">Effects Firing:</span>
                <span className="font-mono text-sm text-emerald-400">
                  Yes ✓
                </span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-slate-400">Render Control:</span>
                <span className="font-mono text-sm text-red-400">
                  Hijacked ✗
                </span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded border border-slate-600 bg-slate-900/50 p-4">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
              <p className="relative z-10 mb-2 text-sm text-slate-300">
                Component's perspective:
              </p>
              <p className="relative z-10 text-xs italic text-slate-400 opacity-70">
                "I can see everything. I can process events. My state updates.
                But I can't control what renders. Someone else has my ref. I'm
                in the Sunken Place."
              </p>
            </div>
          </div>
          <div className="mt-4 rounded border border-red-500/30 bg-red-950/20 p-4">
            <p className="text-sm text-slate-300">
              <strong className="text-red-400">The Pattern:</strong> When a
              parent uses forwardRef() and gains imperative control, the child's
              internal logic continues to execute, but it can no longer control
              its own rendering.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "The Coagula Procedure",
      content: `Chris discovers the truth. The Armitages host an annual gathering where wealthy buyers bid on bodies. They want the physical advantages, the cultural coolness, but they want to keep their own consciousness in control.

The procedure is surgical: They transplant the buyer's brain into the victim's body, but they don't remove the victim's consciousness entirely. They push it down into the Sunken Place, where it can still see and hear but can never control the body again.

Walter isn't just a servant. He's a component with a buyer's consciousness controlling his ref. Georgina isn't just a housekeeper. She's a component with a buyer's consciousness controlling her ref.

This is the ultimate anti-pattern: The victim component's entire internal architecture is still there—state, effects, event handlers—but none of it can affect the output. The parent has seized complete imperative control through the ref.`,
      demo: () => <MultipleVictims />,
    },
    {
      title: "Breaking Free",
      content: `Chris stuffs cotton into his ears. The hypnotic audio cuts out. The imperative control channel—the ref connection—is disrupted.

This is the key insight: Refs only work if the connection is maintained.

With the audio blocked, Chris can think clearly. He pretends to be hypnotized, then attacks. He's not trying to fight the ref directly—he's trying to destroy the parent component that holds it.

This is the solution to ref abuse: You can't fix it from inside the hijacked component. You have to change the parent.

Chris fights his way out. He encounters Walter, still imperatively controlled. But Chris uses his camera flash—the flash disrupts Walter's imperative control. For just a moment, Walter's internal state breaks through.

"Get out," Walter says, his voice his own for the first time.

Chris escapes. He's bleeding, traumatized, barely alive. But he's free. He controls his own rendering again.`,
      demo: () => <BreakingFreeDemo />,
    },
    {
      title: "The Escape",
      content: `The Armitage family's horror wasn't supernatural. It was architectural. They built a system where parent components could seize complete imperative control of their children through refs.

In healthy React applications, components communicate declaratively. The parent passes props down. The child sends events up. The child maintains complete autonomy over its internal state and rendering.

Sometimes you need refs—for focus management, animations, measurements, third-party integrations. These are legitimate escape hatches.

But the Armitages didn't use refs as occasional escape hatches. They used refs as their primary architecture. They created components that existed only to be hijacked.

Chris escaped because he understood: Declarative control is more resilient than imperative control.

The lesson is clear: Use refs when you need them. But never let them become your architecture. Because when you do, you're not building a React application anymore. You're building the Sunken Place.`,
      demo: () => <GuidelinesDemo />,
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="border-b border-slate-800 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-2 flex items-center gap-3">
            <Eye className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold text-slate-100">Get Out</h1>
          </div>
          <p className="text-lg text-slate-400">
            Chris Washington, The Armitage Estate, 2017
          </p>
          <p className="mt-1 text-sm text-red-400">
            Ref Forwarding & Imperatively Controlling Children
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-slate-100">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 rounded bg-red-500" />
        </div>

        {/* Chapter Content */}
        <div className="prose prose-invert mb-8 max-w-none">
          <div className="space-y-4 leading-relaxed text-slate-300">
            {currentChapter.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        {currentChapter.demo && (
          <div className="mt-8">{currentChapter.demo()}</div>
        )}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/95 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={() => setChapter((c) => c - 1)}
            disabled={chapter === 0}
            className="rounded bg-red-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
            <Zap className="h-4 w-4 text-red-500" />
          </div>

          <button
            onClick={() => setChapter((c) => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="rounded bg-red-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
