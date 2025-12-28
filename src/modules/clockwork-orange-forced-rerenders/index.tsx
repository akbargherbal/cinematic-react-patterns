import { useState } from "react";
import { Activity, AlertTriangle, Zap, CheckCircle, XCircle } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function ClockworkOrangeModule() {
  const [chapter, setChapter] = useState(0);
  
  // Demo states
  const [naturalCounter, setNaturalCounter] = useState(0);
  const [forcedCounter, setForcedCounter] = useState(0);
  const [forcedRenderKey, setForcedRenderKey] = useState(0);
  const [internalState, setInternalState] = useState(true);
  const [renderState, setRenderState] = useState(true);
  const [isDesynced, setIsDesynced] = useState(false);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Droog Component",
      content: `In the dark streets of a dystopian future, Alex DeLarge moves through the night like a component in its natural render cycle. He is young, charismatic, and driven by an internal state of pure, unfiltered violence. His white outfit gleams under streetlights as he and his droogs—Pete, Georgie, and Dim—prowl for their next bit of the old ultra-violence.

Alex is a component. His behavior—what he renders to the world—flows directly from his internal state. When his state says "violence," he renders violence. When his state says "Beethoven," he renders ecstasy. There is no disconnect, no confusion. His render output is a pure expression of his data.

Watch him operate: He sees a drunk man stumbling from a pub. His internal state processes this input. His render method executes. Fists fly. The man crumples. This is not chaos—this is a component functioning exactly as designed. State drives behavior. Behavior produces output. The cycle is natural, predictable, and—in its own terrible way—honest.

This is how React components are meant to work. State changes, the component re-renders. The render is a pure function of the state. No shortcuts, no external manipulation, no forced updates. Just clean, predictable, state-driven behavior.`,
    },
    {
      id: "build",
      title: "The Ludovico Protocol",
      content: `Prison is tedious. Alex serves his time, but his internal state remains unchanged. He's still violent, still cruel, still Alex. His render output is constrained by his environment—prison walls are like a parent component's props restricting behavior—but his state is intact.

Then comes the offer: volunteer for the Ludovico Technique, be released in two weeks. Alex agrees. He doesn't understand what he's agreeing to.

The Ludovico Technique is forceUpdate() incarnate.

They strap Alex into a chair in a sterile white room. They inject him with drugs that make him violently ill. They clamp his eyes open—literally forcing him to watch. Then they show him films: violence, rape, brutality. The same ultra-violence that his internal state craves.

But now, because of the drugs, his body associates violence with sickness. His render output is being forcibly changed without touching his internal state.

This is the seductive promise of forceUpdate(): change the component's behavior immediately, without the "hassle" of proper state management. Need a component to re-render? Just call forceUpdate(). Need Alex to stop being violent? Just condition his responses.`,
    },
    {
      id: "climax",
      title: "Conditioned Render",
      content: `Alex walks free, but he is not free. He is a component in a broken state—literally.

His internal state still contains all his violent desires, his cruel impulses, his love of the old ultra-violence. But his render method has been hijacked. When his state says "violence," his render method throws an error. When his state says "attack," his body crashes.

Watch what happens when he encounters his old droogs, now police officers. They beat him savagely. His internal state screams for retaliation, for violence, for revenge. But his render method cannot execute. Instead, he collapses, vomiting, helpless.

This is the nightmare of state-render desynchronization.

In a proper React component, state and render are aligned. When state changes, render reflects it. When render executes, it's a pure expression of state. But Alex is a component where forceUpdate() has created a catastrophic mismatch. His state says one thing, his render does another, and the result is system failure.`,
    },
    {
      id: "resolution",
      title: "The Reversion",
      content: `In the hospital bed, Alex lies broken. The government, desperate to avoid scandal, reverses the Ludovico Technique. They remove the forced update mechanism. They restore his natural render cycle.

This is the inevitable outcome of forceUpdate(): eventually, you have to let the component render naturally again. And when you do, the original state—never actually changed—resurfaces.

Alex recovers. The conditioning fades. His render method is no longer hijacked. And slowly, beautifully, terribly, his true internal state reasserts itself.

The final scene is telling: Alex lies in the hospital bed, imagining violence, and smiles. "I was cured, all right," he says. But he wasn't cured. He was never cured. His internal state was never changed. The forced re-renders were temporary, artificial, unsustainable.

This is the fundamental lesson: you cannot sustainably change a component's behavior by forcing its render. You must change its state.`,
    },
    {
      id: "summary",
      title: "Choice and Consequence",
      content: `Alex DeLarge's journey is a perfect metaphor for the dangers of forceUpdate() and uncontrolled re-renders.

The Ludovico Technique failed because it tried to change behavior (render) without changing nature (state). Similarly, forceUpdate() fails because it triggers re-renders without state changes, creating components where render output doesn't match internal data.

When you need a component to re-render:
1. Identify what state needs to change
2. Update that state through proper channels (setState, props, context)
3. Let React's reconciliation process handle the re-render
4. Trust that render will be a pure function of the new state

A component must choose its render, not be forced into it.`,
    },
  ];

  const currentChapter = chapters[chapter];

  const applyLudovico = () => {
    setIsDesynced(true);
    setRenderState(false);
    // Internal state remains true, but render shows false
  };

  const resetComponent = () => {
    setIsDesynced(false);
    setRenderState(internalState);
  };

  const properRehabilitation = () => {
    setInternalState(false);
    setRenderState(false);
    setIsDesynced(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 p-8 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-2">
            A Clockwork Orange
          </h1>
          <p className="text-lg md:text-xl text-slate-400">
            Alex DeLarge, Dystopian England, 1971
          </p>
          <p className="text-sm md:text-base text-slate-500 mt-2">
            Understanding forceUpdate() & Uncontrolled Re-renders
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 bg-red-500"></div>
        </div>

        {/* Chapter Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          {currentChapter.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-base md:text-lg leading-relaxed text-slate-300 mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Interactive Demonstrations */}
        {chapter === 0 && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-emerald-500" />
              <h3 className="text-xl md:text-2xl font-bold text-slate-100">
                Natural Component Behavior
              </h3>
            </div>
            <p className="text-slate-400 mb-6">
              This is how React components should work: state changes drive re-renders naturally.
            </p>
            <div className="bg-slate-950 border border-emerald-500/30 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center">
                  <div className="text-sm text-slate-500 mb-2">Internal State</div>
                  <div className="text-4xl font-bold text-emerald-500">{naturalCounter}</div>
                </div>
                <div className="hidden md:block text-emerald-500 text-2xl">→</div>
                <div className="text-center">
                  <div className="text-sm text-slate-500 mb-2">Render Output</div>
                  <div className="text-4xl font-bold text-emerald-500">{naturalCounter}</div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={() => setNaturalCounter(c => c + 1)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Update State (setState)
                </button>
              </div>
              <p className="text-center text-emerald-400 text-sm mt-4">
                ✓ State and render perfectly aligned
              </p>
            </div>
          </div>
        )}

        {chapter === 1 && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-red-500" />
              <h3 className="text-xl md:text-2xl font-bold text-slate-100">
                The Ludovico Technique
              </h3>
            </div>
            <p className="text-slate-400 mb-6">
              Watch what happens when we force a component to re-render without changing its state.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Proper Method */}
              <div className="bg-slate-950 border border-emerald-500/30 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-sm font-semibold text-emerald-500 mb-2">
                    Proper Rehabilitation
                  </div>
                  <div className="text-xs text-slate-500">(setState)</div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Internal State:</span>
                    <span className="text-emerald-500 font-mono">{naturalCounter}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Render Output:</span>
                    <span className="text-emerald-500 font-mono">{naturalCounter}</span>
                  </div>
                </div>
                <button
                  onClick={() => setNaturalCounter(c => c + 1)}
                  className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm transition-colors"
                >
                  Update Properly
                </button>
                <p className="text-xs text-emerald-400 text-center mt-3">
                  ✓ Stable & predictable
                </p>
              </div>

              {/* Forced Method */}
              <div className="bg-slate-950 border border-red-500/30 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="text-sm font-semibold text-red-500 mb-2">
                    Ludovico Technique
                  </div>
                  <div className="text-xs text-slate-500">(forceUpdate)</div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Internal State:</span>
                    <span className="text-slate-300 font-mono">{forcedCounter}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Render Output:</span>
                    <span className="text-red-500 font-mono">{forcedRenderKey}</span>
                  </div>
                </div>
                <button
                  onClick={() => setForcedRenderKey(k => k + 1)}
                  className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
                >
                  Force Re-render
                </button>
                <p className="text-xs text-red-400 text-center mt-3">
                  ✗ State unchanged, render forced
                </p>
              </div>
            </div>
          </div>
        )}

        {chapter === 2 && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-xl md:text-2xl font-bold text-slate-100">
                State-Render Desynchronization
              </h3>
            </div>
            <p className="text-slate-400 mb-6">
              When render output doesn't match internal state, components become unstable and error-prone.
            </p>
            <div className="bg-slate-950 border border-red-500/30 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <div className="text-sm font-semibold text-slate-400 mb-3">Internal State</div>
                  <div className="bg-slate-900 border border-slate-700 rounded p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Violence Enabled:</span>
                      <span className={`font-mono font-bold ${internalState ? 'text-red-500' : 'text-emerald-500'}`}>
                        {internalState.toString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-400 mb-3">Render Output</div>
                  <div className={`bg-slate-900 border rounded p-4 ${isDesynced ? 'border-red-500 animate-pulse' : 'border-slate-700'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Violence Enabled:</span>
                      <span className={`font-mono font-bold ${renderState ? 'text-red-500' : 'text-emerald-500'}`}>
                        {renderState.toString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {isDesynced && (
                <div className="bg-red-950/30 border border-red-500 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-red-400 mb-1">State-Render Mismatch Detected</div>
                      <div className="text-sm text-red-300">
                        Component is unstable. Internal state conflicts with render output. Crashes imminent.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={applyLudovico}
                  disabled={isDesynced}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded font-semibold transition-colors"
                >
                  Apply Ludovico Technique
                </button>
                <button
                  onClick={properRehabilitation}
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold transition-colors"
                >
                  Proper State Update
                </button>
                {isDesynced && (
                  <button
                    onClick={resetComponent}
                    className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded font-semibold transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {chapter === 3 && (
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-emerald-500" />
              <h3 className="text-xl md:text-2xl font-bold text-slate-100">
                Return to Natural State
              </h3>
            </div>
            <p className="text-slate-400 mb-6">
              Forced updates are temporary. Eventually, components revert to their true internal state.
            </p>
            <div className="bg-slate-950 border border-slate-700 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🔄</div>
                <div className="text-lg text-slate-300">
                  Without genuine state changes, forced renders eventually fail.
                </div>
                <div className="text-sm text-slate-500 mt-2">
                  The component returns to its original behavior.
                </div>
              </div>
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
                <div className="text-center">
                  <div className="text-sm font-semibold text-emerald-400 mb-3">The Correct Pattern</div>
                  <code className="block bg-slate-950 text-emerald-400 p-4 rounded text-sm font-mono text-left">
                    <div>// Don't force renders</div>
                    <div className="text-red-400">component.forceUpdate() // ✗ WRONG</div>
                    <div className="mt-3">// Update state properly</div>
                    <div className="text-emerald-400">setState(&#123; value: newValue &#125;) // ✓ RIGHT</div>
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {chapter === 4 && (
          <div className="space-y-8">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-6">
                Comparison: Proper State Management vs forceUpdate()
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="py-3 px-4 text-slate-400 font-semibold">Aspect</th>
                      <th className="py-3 px-4 text-emerald-400 font-semibold">setState()</th>
                      <th className="py-3 px-4 text-red-400 font-semibold">forceUpdate()</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800">
                      <td className="py-4 px-4 text-slate-300">State Changes</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                          <span className="text-slate-300">Updates state properly</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-slate-300">Bypasses state</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-4 px-4 text-slate-300">Predictability</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                          <span className="text-slate-300">Render reflects state</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-slate-300">State/render mismatch</span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-4 px-4 text-slate-300">Sustainability</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                          <span className="text-slate-300">Long-term stable</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-slate-300">Temporary, fragile</span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-slate-300">Error Rate</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                          <span className="text-slate-300">Low, predictable</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-5 h-5 text-red-500" />
                          <span className="text-slate-300">High, unpredictable</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-950/30 to-slate-950 border border-red-500/30 rounded-lg p-6 md:p-8 text-center">
              <div className="text-4xl mb-4">⚙️</div>
              <blockquote className="text-xl md:text-2xl font-bold text-red-400 mb-4">
                "A component must choose its render, not be forced into it."
              </blockquote>
              <p className="text-slate-400">
                Update state properly. Trust React's reconciliation. Let render be a pure function of state.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 p-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => setChapter(c => c - 1)}
            disabled={chapter === 0}
            className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Previous
          </button>
          
          <div className="text-sm text-slate-400">
            <span className="hidden sm:inline">Chapter </span>
            {chapter + 1} of {chapters.length}
            <span className="hidden sm:inline"> • {currentChapter.title}</span>
          </div>
          
          <button
            onClick={() => setChapter(c => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="w-full sm:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}