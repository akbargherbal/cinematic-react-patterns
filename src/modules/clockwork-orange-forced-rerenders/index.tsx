import { useState, useCallback, useEffect } from "react";
import { AlertTriangle, CheckCircle, Code, RefreshCw, Zap } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface ComponentState {
  violent: boolean;
  stable: boolean;
  errorCount: number;
}

export default function ClockworkOrange() {
  const [chapter, setChapter] = useState(0);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Droog Component",
      content: "In the dark streets of a dystopian future, Alex DeLarge moves through the night like a component in its natural render cycle. He is young, charismatic, and driven by an internal state of pure, unfiltered violence. His white outfit gleams under streetlights as he and his droogs—Pete, Georgie, and Dim—prowl for their next bit of the old ultra-violence.\n\nAlex is a component. His behavior—what he renders to the world—flows directly from his internal state. When his state says \"violence,\" he renders violence. When his state says \"Beethoven,\" he renders ecstasy. There is no disconnect, no confusion. His render output is a pure expression of his data.\n\nWatch him operate: He sees a drunk man stumbling from a pub. His internal state processes this input. His render method executes. Fists fly. The man crumples. This is not chaos—this is a component functioning exactly as designed. State drives behavior. Behavior produces output. The cycle is natural, predictable, and—in its own terrible way—honest.\n\nThis is how React components are meant to work. State changes, the component re-renders. The render is a pure function of the state. No shortcuts, no external manipulation, no forced updates. Just clean, predictable, state-driven behavior.",
    },
    {
      id: "build",
      title: "The Ludovico Protocol",
      content: "Prison is tedious. Alex serves his time, but his internal state remains unchanged. He's still violent, still cruel, still Alex. His render output is constrained by his environment—prison walls are like a parent component's props restricting behavior—but his state is intact.\n\nThen comes the offer: volunteer for the Ludovico Technique, be released in two weeks. Alex agrees. He doesn't understand what he's agreeing to.\n\nThe Ludovico Technique is forceUpdate() incarnate.\n\nThey strap Alex into a chair in a sterile white room. They inject him with drugs that make him violently ill. They clamp his eyes open—literally forcing him to watch. Then they show him films: violence, rape, brutality. The same ultra-violence that his internal state craves.\n\nBut now, because of the drugs, his body associates violence with sickness. His render output is being forcibly changed without touching his internal state.\n\nThis is the seductive promise of forceUpdate(): change the component's behavior immediately, without the \"hassle\" of proper state management. Need a component to re-render? Just call forceUpdate(). Need Alex to stop being violent? Just condition his responses.",
    },
    {
      id: "climax",
      title: "Conditioned Render",
      content: "Alex walks free, but he is not free. He is a component in a broken state—literally.\n\nHis internal state still contains all his violent desires, his cruel impulses, his love of the old ultra-violence. But his render method has been hijacked. When his state says \"violence,\" his render method throws an error. When his state says \"attack,\" his body crashes.\n\nWatch what happens when he encounters his old droogs, now police officers. They beat him savagely. His internal state screams for retaliation, for violence, for revenge. But his render method cannot execute. Instead, he collapses, vomiting, helpless.\n\nThis is the nightmare of state-render desynchronization.\n\nIn a proper React component, state and render are aligned. When state changes, render reflects it. When render executes, it's a pure expression of state. But Alex is a component where forceUpdate() has created a catastrophic mismatch. His state says one thing, his render does another, and the result is system failure.",
    },
    {
      id: "resolution",
      title: "The Reversion",
      content: "In the hospital bed, Alex lies broken. The government, desperate to avoid scandal, reverses the Ludovico Technique. They remove the forced update mechanism. They restore his natural render cycle.\n\nThis is the inevitable outcome of forceUpdate(): eventually, you have to let the component render naturally again. And when you do, the original state—never actually changed—resurfaces.\n\nAlex recovers. The conditioning fades. His render method is no longer hijacked. And slowly, beautifully, terribly, his true internal state reasserts itself.\n\nThe final scene is telling: Alex lies in the hospital bed, imagining violence, and smiles. \"I was cured, all right,\" he says. But he wasn't cured. He was never cured. His internal state was never changed. The forced re-renders were temporary, artificial, unsustainable.\n\nThis is the fundamental lesson: you cannot sustainably change a component's behavior by forcing its render. You must change its state.",
    },
    {
      id: "summary",
      title: "Choice and Consequence",
      content: "Alex DeLarge's journey is a perfect metaphor for the dangers of forceUpdate() and uncontrolled re-renders. The Ludovico Technique failed because it tried to change behavior (render) without changing nature (state). This created a catastrophic disconnect.\n\nSimilarly, forceUpdate() fails because it triggers re-renders without state changes, creating components where render output doesn't match internal data. It leads to bugs, errors, and unpredictable behavior.\n\nThe correct pattern: Don't force renders. Update state. When you need a component to re-render, identify what state needs to change, update that state through proper channels (setState, props, context), and let React's reconciliation process handle the re-render.\n\nA component must choose its render, not be forced into it. That's not just good React practice. That's the difference between code that works and code that breaks.",
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
      <header className="border-b border-red-500/30 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">
            A Clockwork Orange
          </h1>
          <p className="text-lg text-slate-400">
            Alex DeLarge, Dystopian Future, 1971
          </p>
          <p className="text-sm text-red-400 mt-1">
            Concept: forceUpdate() & Uncontrolled Re-renders
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-red-400 mb-4">
                {currentChapter.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                {currentChapter.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-slate-300 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {chapter === 0 && <NaturalComponentDemo />}
            {chapter === 1 && <LudovicoIntroDemo />}
            {chapter === 2 && <TreatmentSimulator />}
            {chapter === 3 && <StateRenderVisualizer />}
            {chapter === 4 && <CodeComparison />}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-red-500/30 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="px-6 py-2 bg-red-600 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
              aria-label="Previous chapter"
            >
              Previous
            </button>

            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-red-600 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-700 transition-colors"
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

function NaturalComponentDemo() {
  const [state, setState] = useState({ violent: true, energy: 100 });

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-500" />
        Natural State-Driven Rendering
      </h3>
      <p className="text-slate-400 text-sm mb-4">
        Alex operates naturally: his behavior (render) flows from his state.
      </p>

      <div className="space-y-4">
        <div className="bg-slate-800/50 rounded p-4">
          <div className="text-xs text-slate-500 mb-2">Internal State:</div>
          <div className="font-mono text-sm text-slate-300">
            {JSON.stringify(state, null, 2)}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded p-4">
          <div className="text-xs text-slate-500 mb-2">Render Output:</div>
          <div className="text-slate-300">
            {state.violent ? (
              <span className="text-red-400">⚡ Ultra-violence mode active</span>
            ) : (
              <span className="text-green-400">✓ Peaceful behavior</span>
            )}
          </div>
          <div className="text-slate-400 text-sm mt-2">
            Energy: {state.energy}%
          </div>
        </div>

        <button
          onClick={() =>
            setState({ violent: !state.violent, energy: state.energy - 10 })
          }
          className="w-full px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
        >
          Change State (Natural Update)
        </button>

        <div className="text-xs text-green-400 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          State and render are synchronized
        </div>
      </div>
    </div>
  );
}

function LudovicoIntroDemo() {
  return (
    <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        The Ludovico Technique
      </h3>
      <p className="text-slate-400 text-sm mb-4">
        A forced behavioral modification that bypasses internal change.
      </p>

      <div className="space-y-4">
        <div className="bg-red-950/20 border border-red-500/30 rounded p-4">
          <div className="text-sm text-red-400 font-semibold mb-2">
            forceUpdate() Pattern
          </div>
          <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
            {`class AlexComponent extends React.Component {
  state = { violent: true };
  
  ludovicoTechnique() {
    // Force render without changing state
    this.forceUpdate();
  }
  
  render() {
    // Render doesn't match state!
    return <div>Appears peaceful</div>;
  }
}`}
          </pre>
        </div>

        <div className="bg-slate-800/50 rounded p-4">
          <div className="text-xs text-slate-500 mb-2">The Problem:</div>
          <ul className="text-sm text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Bypasses setState()</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Creates state-render mismatch</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">✗</span>
              <span>Leads to unpredictable behavior</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TreatmentSimulator() {
  const [ludovicoState, setLudovicoState] = useState<ComponentState>({
    violent: true,
    stable: true,
    errorCount: 0,
  });
  const [naturalState, setNaturalState] = useState<ComponentState>({
    violent: true,
    stable: true,
    errorCount: 0,
  });
  const [ludovicoRender, setLudovicoRender] = useState(true);

  const applyLudovico = () => {
    setLudovicoRender(false);
    setTimeout(() => {
      setLudovicoState((s) => ({
        ...s,
        stable: false,
        errorCount: s.errorCount + 1,
      }));
    }, 500);
  };

  const applyNatural = () => {
    setNaturalState({ violent: false, stable: true, errorCount: 0 });
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-red-500" />
        Treatment Simulator
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div
          className={`border rounded-lg p-4 ${
            ludovicoState.stable
              ? "border-slate-700 bg-slate-800/30"
              : "border-red-500/50 bg-red-950/20 animate-pulse"
          }`}
        >
          <div className="text-sm font-semibold text-red-400 mb-2">
            Ludovico Component
          </div>
          <div className="text-xs text-slate-500 mb-2">State:</div>
          <div className="font-mono text-xs text-slate-300 mb-3">
            violent: {ludovicoState.violent.toString()}
          </div>
          <div className="text-xs text-slate-500 mb-2">Render:</div>
          <div className="text-sm mb-3">
            {ludovicoRender ? (
              <span className="text-red-400">⚡ Violent</span>
            ) : (
              <span className="text-slate-400">Peaceful (forced)</span>
            )}
          </div>
          {!ludovicoState.stable && (
            <div className="text-xs text-red-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              State-render mismatch! Errors: {ludovicoState.errorCount}
            </div>
          )}
          <button
            onClick={applyLudovico}
            className="w-full mt-3 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
          >
            Apply Ludovico (forceUpdate)
          </button>
        </div>

        <div className="border border-green-500/30 bg-slate-800/30 rounded-lg p-4">
          <div className="text-sm font-semibold text-green-400 mb-2">
            Natural Component
          </div>
          <div className="text-xs text-slate-500 mb-2">State:</div>
          <div className="font-mono text-xs text-slate-300 mb-3">
            violent: {naturalState.violent.toString()}
          </div>
          <div className="text-xs text-slate-500 mb-2">Render:</div>
          <div className="text-sm mb-3">
            {naturalState.violent ? (
              <span className="text-red-400">⚡ Violent</span>
            ) : (
              <span className="text-green-400">✓ Peaceful</span>
            )}
          </div>
          <div className="text-xs text-green-400 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Stable. Errors: {naturalState.errorCount}
          </div>
          <button
            onClick={applyNatural}
            className="w-full mt-3 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
          >
            Update State (setState)
          </button>
        </div>
      </div>

      <div className="text-xs text-slate-400 bg-slate-800/50 rounded p-3">
        <strong className="text-slate-300">Observe:</strong> The Ludovico
        component's render changes without state changing, creating instability.
        The natural component updates state first, keeping everything
        synchronized.
      </div>
    </div>
  );
}

function StateRenderVisualizer() {
  const [internalState, setInternalState] = useState({ violent: true });
  const [renderOutput, setRenderOutput] = useState("violent");
  const [mismatch, setMismatch] = useState(false);

  const applyLudovico = () => {
    setRenderOutput("peaceful");
    setMismatch(true);
  };

  const revert = () => {
    setRenderOutput("violent");
    setMismatch(false);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
        <RefreshCw className="w-5 h-5 text-red-500" />
        State vs Render Desync
      </h3>

      <div className="space-y-4">
        <div
          className={`border rounded-lg p-4 ${
            mismatch
              ? "border-red-500/50 bg-red-950/20"
              : "border-slate-700 bg-slate-800/30"
          }`}
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-slate-500 mb-2">Internal State:</div>
              <div className="font-mono text-sm text-slate-300">
                {JSON.stringify(internalState, null, 2)}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-2">Render Output:</div>
              <div className="font-mono text-sm text-slate-300">
                "{renderOutput}"
              </div>
            </div>
          </div>

          {mismatch && (
            <div className="bg-red-950/30 border border-red-500/50 rounded p-3 text-sm text-red-400 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Mismatch Detected!</strong> State says "violent" but
                render shows "peaceful". This component will crash on normal
                interactions.
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={applyLudovico}
            disabled={mismatch}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded transition-colors"
          >
            Apply Ludovico
          </button>
          <button
            onClick={revert}
            disabled={!mismatch}
            className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200 rounded transition-colors"
          >
            Revert (State Resurfaces)
          </button>
        </div>

        <div className="text-xs text-slate-400 bg-slate-800/50 rounded p-3">
          <strong className="text-slate-300">The Lesson:</strong> Forced renders
          create temporary changes. The original state always resurfaces,
          causing unpredictable behavior.
        </div>
      </div>
    </div>
  );
}

function CodeComparison() {
  const [showWrong, setShowWrong] = useState(true);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
        <Code className="w-5 h-5 text-slate-400" />
        The Correct Pattern
      </h3>

      <div className="mb-4">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setShowWrong(true)}
            className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
              showWrong
                ? "bg-red-600 text-white"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            Ludovico Technique
          </button>
          <button
            onClick={() => setShowWrong(false)}
            className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
              !showWrong
                ? "bg-green-600 text-white"
                : "bg-slate-800 text-slate-400"
            }`}
          >
            Proper Rehabilitation
          </button>
        </div>

        {showWrong ? (
          <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
            <div className="text-sm font-semibold text-red-400 mb-3">
              ✗ WRONG: Forcing Renders
            </div>
            <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
              {`// Class component anti-pattern
class AlexComponent extends React.Component {
  state = { violent: true };
  
  ludovicoTechnique() {
    // Bypasses state management!
    this.forceUpdate();
  }
  
  render() {
    // Render doesn't reflect state
    return <div>Peaceful</div>;
  }
}

// Result: State-render mismatch
// Component becomes unstable
// Errors on normal interactions`}
            </pre>
          </div>
        ) : (
          <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4">
            <div className="text-sm font-semibold text-green-400 mb-3">
              ✓ RIGHT: Update State Properly
            </div>
            <pre className="text-xs text-slate-300 font-mono overflow-x-auto">
              {`// Functional component with proper state
function AlexComponent() {
  const [violent, setViolent] = useState(true);
  
  const rehabilitate = () => {
    // Update state, let React handle render
    setViolent(false);
  };
  
  return (
    <div>
      {violent ? 'Violent' : 'Peaceful'}
    </div>
  );
}

// Result: State and render synchronized
// Component remains stable
// Predictable behavior`}
            </pre>
          </div>
        )}
      </div>

      <div className="bg-slate-800/50 rounded p-4">
        <div className="text-sm font-semibold text-slate-200 mb-2">
          Key Takeaway:
        </div>
        <p className="text-sm text-slate-300">
          A component must <strong>choose</strong> its render through state
          updates, not be <strong>forced</strong> into it. Update state, let
          React handle the re-render. That's the difference between code that
          works and code that breaks.
        </p>
      </div>
    </div>
  );
}