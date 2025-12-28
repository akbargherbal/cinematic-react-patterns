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
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-emerald-500" />
        Declarative Control
      </h3>
      <div className={`w-full h-32 rounded flex items-center justify-center transition-all duration-300 ${
        isActive ? "bg-emerald-500/20 border-2 border-emerald-500" : "bg-slate-800 border-2 border-slate-600"
      }`}>
        <span className="text-slate-300 font-mono text-sm">
          {isActive ? "Active (via props)" : "Inactive (via props)"}
        </span>
      </div>
      <button
        onClick={onToggle}
        className="mt-4 w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
      >
        Toggle via Props
      </button>
      <p className="mt-3 text-xs text-slate-400">
        Component controls its own rendering based on props
      </p>
    </div>
  );
};

const HijackedComponent = forwardRef<HijackedComponentRef, HijackedComponentProps>(
  ({ isActive }, ref) => {
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
      <div className="bg-slate-900 border border-red-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Imperative Control (Ref)
        </h3>
        <div className={`w-full h-32 rounded flex items-center justify-center transition-all duration-300 ${
          isActive ? "bg-red-500/20 border-2 border-red-500" : "bg-slate-800 border-2 border-slate-600"
        } ${isHijacked ? "opacity-50 blur-[1px]" : ""}`}>
          <div className="text-center">
            <span className="text-slate-300 font-mono text-sm block">
              {isActive ? "Active (via ref)" : "Inactive (via ref)"}
            </span>
            {isHijacked && (
              <span className="text-xs text-red-400 mt-2 block">
                Internal state: {internalState ? "true" : "false"} (ignored)
              </span>
            )}
          </div>
        </div>
        <div className="mt-3 text-xs text-slate-400 bg-slate-800/50 p-3 rounded">
          <p className="font-mono">Internal state still runs...</p>
          <p className="font-mono">But parent controls rendering via ref</p>
        </div>
      </div>
    );
  }
);

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
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-slate-300 mb-4">
        The Coagula Procedure: Multiple Hijacked Components
      </h3>
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800 border border-slate-600 rounded p-4">
          <p className="text-sm text-slate-400 mb-2 font-mono">Walter</p>
          <HijackedComponent ref={victim1Ref} isActive={controlActive} />
        </div>
        <div className="bg-slate-800 border border-slate-600 rounded p-4">
          <p className="text-sm text-slate-400 mb-2 font-mono">Georgina</p>
          <HijackedComponent ref={victim2Ref} isActive={controlActive} />
        </div>
        <div className="bg-slate-800 border border-slate-600 rounded p-4">
          <p className="text-sm text-slate-400 mb-2 font-mono">Chris</p>
          <HijackedComponent ref={victim3Ref} isActive={controlActive} />
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={takeControl}
          className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded transition-colors font-semibold"
        >
          Activate Coagula (Imperative Control)
        </button>
        <button
          onClick={releaseControl}
          className="flex-1 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors font-semibold"
        >
          Release Control
        </button>
      </div>
      <p className="mt-4 text-sm text-slate-400 bg-slate-800/50 p-3 rounded">
        All three components' internal logic still runs, but the parent controls their rendering imperatively through refs.
      </p>
    </div>
  );
};

// Breaking Free Demo
const BreakingFreeDemo = () => {
  const [pattern, setPattern] = useState<"imperative" | "declarative">("imperative");

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-slate-300 mb-4">
        Breaking Free: Imperative → Declarative
      </h3>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className={`p-4 rounded-lg border-2 transition-all ${
          pattern === "imperative" 
            ? "border-red-500 bg-red-950/20" 
            : "border-slate-600 bg-slate-800/50 opacity-50"
        }`}>
          <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Imperative (Hijacked)
          </h4>
          <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`const victimRef = useRef();

useEffect(() => {
  // Parent controls child imperatively
  victimRef.current.forceState();
  victimRef.current.overrideRender();
}, []);

<VictimComponent ref={victimRef} />`}
          </pre>
        </div>
        <div className={`p-4 rounded-lg border-2 transition-all ${
          pattern === "declarative" 
            ? "border-emerald-500 bg-emerald-950/20" 
            : "border-slate-600 bg-slate-800/50 opacity-50"
        }`}>
          <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Declarative (Autonomous)
          </h4>
          <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
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
          className={`flex-1 px-6 py-3 rounded transition-all font-semibold ${
            pattern === "imperative"
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-400 hover:bg-slate-600"
          }`}
        >
          Show Imperative
        </button>
        <button
          onClick={() => setPattern("declarative")}
          className={`flex-1 px-6 py-3 rounded transition-all font-semibold ${
            pattern === "declarative"
              ? "bg-emerald-600 text-white"
              : "bg-slate-700 text-slate-400 hover:bg-slate-600"
          }`}
        >
          Show Declarative
        </button>
      </div>
      <p className="mt-4 text-sm text-slate-400 bg-slate-800/50 p-3 rounded">
        {pattern === "imperative" 
          ? "Component is trapped in the Sunken Place - internal logic runs but can't control rendering"
          : "Component has autonomy - it controls its own rendering based on props and state"
        }
      </p>
    </div>
  );
};

// Guidelines Demo
const GuidelinesDemo = () => {
  const appropriate = [
    { icon: CheckCircle, text: "Focus management (.focus())", example: "inputRef.current.focus()" },
    { icon: CheckCircle, text: "DOM measurements", example: "divRef.current.getBoundingClientRect()" },
    { icon: CheckCircle, text: "Animations (imperative libraries)", example: "gsap.to(elementRef.current, {...})" },
    { icon: CheckCircle, text: "Third-party integrations", example: "new Chart(canvasRef.current, {...})" },
  ];

  const inappropriate = [
    { icon: XCircle, text: "State management", example: "❌ ref.current.setState()" },
    { icon: XCircle, text: "Conditional rendering", example: "❌ ref.current.show()" },
    { icon: XCircle, text: "Data flow control", example: "❌ ref.current.updateData()" },
    { icon: XCircle, text: "Replacing render logic", example: "❌ ref.current.render()" },
  ];

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-slate-300 mb-6">
        When to Use Refs: The Guidelines
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Appropriate Use
          </h4>
          <div className="space-y-3">
            {appropriate.map((item, idx) => (
              <div key={idx} className="bg-emerald-950/20 border border-emerald-500/30 rounded p-3">
                <div className="flex items-start gap-2 mb-2">
                  <item.icon className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">{item.text}</span>
                </div>
                <code className="text-xs font-mono text-emerald-400 block pl-6">
                  {item.example}
                </code>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
            <XCircle className="w-5 h-5" />
            Inappropriate Use
          </h4>
          <div className="space-y-3">
            {inappropriate.map((item, idx) => (
              <div key={idx} className="bg-red-950/20 border border-red-500/30 rounded p-3">
                <div className="flex items-start gap-2 mb-2">
                  <item.icon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">{item.text}</span>
                </div>
                <code className="text-xs font-mono text-red-400 block pl-6">
                  {item.example}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 bg-slate-800/50 border border-slate-600 rounded p-4">
        <p className="text-sm text-slate-300 leading-relaxed">
          <strong className="text-slate-200">Remember:</strong> Refs are escape hatches for imperative operations that can't be expressed declaratively. Use them sparingly and only when necessary. Building your architecture around refs creates the Sunken Place.
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
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-300 mb-4">
            Normal React Flow vs. Ref Control
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <NormalComponent isActive={normalActive} onToggle={() => setNormalActive(!normalActive)} />
            <div className="bg-slate-900 border border-red-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-300 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Imperative Control (Ref)
              </h3>
              <div className={`w-full h-32 rounded flex items-center justify-center transition-all duration-300 ${
                hijackedActive ? "bg-red-500/20 border-2 border-red-500" : "bg-slate-800 border-2 border-slate-600"
              }`}>
                <span className="text-slate-300 font-mono text-sm">
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
                className="mt-4 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
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
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <Eye className="w-6 h-6 text-red-500" />
            The Sunken Place: Internal Logic Still Runs
          </h3>
          <div className="bg-slate-800 border border-red-500/30 rounded-lg p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Component Internal State:</span>
                <span className="text-sm font-mono text-emerald-400">Running ✓</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Effects Firing:</span>
                <span className="text-sm font-mono text-emerald-400">Yes ✓</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Render Control:</span>
                <span className="text-sm font-mono text-red-400">Hijacked ✗</span>
              </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-600 rounded p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 pointer-events-none" />
              <p className="text-slate-300 text-sm mb-2 relative z-10">Component's perspective:</p>
              <p className="text-slate-400 text-xs italic relative z-10 opacity-70">
                "I can see everything. I can process events. My state updates. But I can't control what renders. Someone else has my ref. I'm in the Sunken Place."
              </p>
            </div>
          </div>
          <div className="mt-4 bg-red-950/20 border border-red-500/30 rounded p-4">
            <p className="text-sm text-slate-300">
              <strong className="text-red-400">The Pattern:</strong> When a parent uses forwardRef() and gains imperative control, the child's internal logic continues to execute, but it can no longer control its own rendering.
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
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="p-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-slate-100">Get Out</h1>
          </div>
          <p className="text-lg text-slate-400">Chris Washington, The Armitage Estate, 2017</p>
          <p className="text-sm text-red-400 mt-1">
            Ref Forwarding & Imperatively Controlling Children
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-100 mb-2">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 bg-red-500 rounded" />
        </div>

        {/* Chapter Content */}
        <div className="prose prose-invert max-w-none mb-8">
          <div className="text-slate-300 leading-relaxed space-y-4">
            {currentChapter.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        {currentChapter.demo && (
          <div className="mt-8">
            {currentChapter.demo()}
          </div>
        )}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => setChapter(c => c - 1)}
            disabled={chapter === 0}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors font-semibold"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
            <Zap className="w-4 h-4 text-red-500" />
          </div>
          
          <button
            onClick={() => setChapter(c => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded transition-colors font-semibold"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}