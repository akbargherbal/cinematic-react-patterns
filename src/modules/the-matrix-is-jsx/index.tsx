import { useState, useEffect, useRef } from "react";
import { Code, Zap, Eye, FileCode, CheckCircle } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  title: string;
  content: string;
}

export default function TheMatrixIsJSX(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [parentRef] = useAutoAnimate();

  // Chapter 1: Simple JSX preview
  const [showGeneratedCode, setShowGeneratedCode] = useState<boolean>(false);

  // Chapter 2: Manual createElement builder
  const [manualSteps, setManualSteps] = useState<string[]>([
    "createElement('div', {className: 'street'})",
  ]);
  const [currentStep, setCurrentStep] = useState<string>("");
  const [error, setError] = useState<string>("");
  const streetPreviewRef = useRef<HTMLDivElement>(null);

  // Chapter 3: JSX description builder
  const [jsxDescription, setJsxDescription] = useState<string>(
    "<div className='street'>\n  <div className='building' />\n  <div className='lamppost' />\n  <div className='woman-red-dress' />\n</div>"
  );
  const [sceneRendered, setSceneRendered] = useState<boolean>(false);

  // Chapter 4: Comparison
  const [jsxInput, setJsxInput] = useState<string>("<div className='exit-sign'>EXIT</div>");
  const [createElementInput, setCreateElementInput] = useState<string>(
    "React.createElement('div', {className: 'exit-sign'}, 'EXIT')"
  );
  const [comparisonOutput, setComparisonOutput] = useState<string>("");

  // Chapter 5: Mastery gallery
  const [selectedScene, setSelectedScene] = useState<number>(0);

  const chapters: Chapter[] = [
    {
      title: "Welcome to the Construct",
      content:
        "The world dissolves into a searing, infinite white. Neo stands in the Construct, a loading program where anything can be defined. Morpheus demonstrates: describe an object, and it materializes. As a vintage television set appears, Neo glimpses the cascading green code beneath—the machine language of the Matrix. 'We don't build the world with code,' Morpheus says. 'We describe it, and the Matrix builds itself.'",
    },
    {
      title: "The Language of the Machine",
      content:
        "Morpheus tasks Neo with building a street scene using 'Operator Protocol'—dictating every element and property verbosely. Neo struggles, his head throbbing from the cognitive load of nested function calls. The resulting simulation is a glitchy mess: a lamppost inside a building, corrupted textures. 'You're speaking to the machine, not to me,' Morpheus corrects. 'And the machine is very literal.' The anti-pattern of manual React.createElement is painful and error-prone.",
    },
    {
      title: "Stop Building the Spoon",
      content:
        "Dejected, Neo learns the solution. Morpheus holds a spoon: 'Stop trying to build it. Just see the spoon.' Instead of verbose instructions, Neo describes the street scene in simple, human terms. Instantly, a perfect simulation flows into existence: brick building, lamppost, woman in red dress. Relief washes over him. He described the 'what'; the Operator handled the 'how.' JSX is this descriptive language for React.",
    },
    {
      title: "Two Maps, One Destination",
      content:
        "To solidify the lesson, Neo creates an EXIT sign twice: first with painful Operator Protocol, then with a simple description. Both signs are identical. Morpheus shows the operator's logs: the generated machine code is exactly the same. 'The destination is the same. The code is identical. JSX is just a better map.' JSX is syntactic sugar that compiles to React.createElement, offering a human-friendly way to write the same instructions.",
    },
    {
      title: "I Know JSX",
      content:
        "Weeks later, Neo is fluent. He describes entire worlds into existence: a Japanese dojo, a rainy cityscape. During a sparring match, he sees both the illusion and the code beneath—the green wireframe defining reality. 'I can see both now,' he says. 'The world, and the code that makes it.' Mastery means understanding that JSX and React.createElement are two views of the same truth: one for humans, one for the machine.",
    },
  ];

  // Chapter 1: Generated code for TV set
  const tvJSX = `<div className="tv-set vintage">
  <div className="screen">
    <div className="static" />
  </div>
  <div className="controls">
    <div className="knob" />
    <div className="knob" />
  </div>
</div>`;

  const tvCreateElement = `React.createElement(
  'div',
  { className: 'tv-set vintage' },
  React.createElement(
    'div',
    { className: 'screen' },
    React.createElement('div', { className: 'static' })
  ),
  React.createElement(
    'div',
    { className: 'controls' },
    React.createElement('div', { className: 'knob' }),
    React.createElement('div', { className: 'knob' })
  )
)`;

  // Chapter 2: Build manual createElement steps
  const handleAddStep = () => {
    if (!currentStep.trim()) {
      setError("Step cannot be empty");
      return;
    }
    // Basic validation: should look like createElement(...)
    if (!currentStep.includes("createElement")) {
      setError("Step must be a createElement call");
      return;
    }
    setManualSteps([...manualSteps, currentStep]);
    setCurrentStep("");
    setError("");
  };

  const handleResetManual = () => {
    setManualSteps(["createElement('div', {className: 'street'})"]);
    setError("");
  };

  // Chapter 3: Render scene from JSX description
  const handleRenderScene = () => {
    setSceneRendered(true);
    setTimeout(() => {
      setSceneRendered(false);
    }, 2000);
  };

  // Chapter 4: Compare JSX and createElement
  useEffect(() => {
    // Simulate compilation: both inputs should produce similar output
    const output = `// Compiled React.createElement output
React.createElement(
  'div',
  { className: 'exit-sign' },
  'EXIT'
)`;
    setComparisonOutput(output);
  }, [jsxInput, createElementInput]);

  // Chapter 5: Scenes gallery
  const scenes = [
    {
      name: "Japanese Dojo",
      jsx: `<div className="dojo">
  <div className="tatami-floor" />
  <div className="paper-screen" />
  <div className="training-dummy" />
</div>`,
      color: "bg-amber-950",
    },
    {
      name: "City Rooftop",
      jsx: `<div className="rooftop night">
  <div className="neon-sign" />
  <div className="water-tank" />
  <div className="antenna" />
</div>`,
      color: "bg-blue-950",
    },
    {
      name: "Construct Core",
      jsx: `<div className="core">
  <div className="data-stream" />
  <div className="terminal" />
  <div className="server-rack" />
</div>`,
      color: "bg-emerald-950",
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-4 md:p-8 font-mono">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4 md:gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Code className="text-emerald-500 w-6 h-6 md:w-8 md:h-8" />
              <h1 className="text-2xl md:text-3xl font-bold">The Matrix</h1>
            </div>
            <p className="text-xs md:text-sm text-slate-400">Neo • The Construct • 1999</p>
          </div>
          <p className="text-base md:text-lg text-emerald-500 font-medium">JSX (JavaScript XML)</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8" ref={parentRef}>
        {/* Chapter Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{currentChapter.title}</h2>
          <p className="leading-relaxed font-sans">{currentChapter.content}</p>
        </div>

        {/* Interactive Demo Section */}
        <section className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 md:p-8 mb-8 md:mb-12 shadow-lg shadow-emerald-900/10">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="text-emerald-500 w-5 h-5" />
            Interactive Simulation
          </h3>

          {/* Chapter 1 Demo: The Construct */}
          {chapter === 0 && (
            <div className="space-y-6">
              <p className="text-slate-400">
                Below is a TV set described with JSX. Toggle to see the equivalent React.createElement
                code.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold">JSX Description</h4>
                    <button
                      onClick={() => setShowGeneratedCode(!showGeneratedCode)}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      {showGeneratedCode ? "Show JSX" : "Show Generated Code"}
                    </button>
                  </div>
                  <CodeBlock
                    code={showGeneratedCode ? tvCreateElement : tvJSX}
                    variant="default"
                    title={showGeneratedCode ? "// Generated React.createElement" : "// JSX"}
                    language="jsx"
                    defaultExpanded={true}
                  />
                  <div className="border border-slate-700 rounded p-6 bg-slate-950 flex items-center justify-center min-h-[200px]">
                    <div className="tv-set vintage">
                      <div className="screen">
                        <div className="static" />
                      </div>
                      <div className="controls">
                        <div className="knob" />
                        <div className="knob" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-950/50 border border-slate-700 rounded p-6">
                  <h4 className="font-bold mb-4">How It Works</h4>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1" />
                      JSX is a <strong>declarative</strong> syntax: you describe what you want.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1" />
                      The <strong>Babel compiler</strong> (the Operator) translates JSX into
                      React.createElement calls.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1" />
                      The generated code is what React actually executes to create the DOM.
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-emerald-950/20 border border-emerald-500/30 rounded">
                    <p className="text-sm">
                      <strong className="text-emerald-400">Remember:</strong> You describe the UI,
                      React builds it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 2 Demo: Manual createElement */}
          {chapter === 1 && (
            <div className="space-y-6">
              <p className="text-slate-400">
                Try to build a street scene by manually specifying each React.createElement call.
                Notice how verbose and error-prone this is.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold">Manual createElement Builder</h4>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={currentStep}
                      onChange={(e) => setCurrentStep(e.target.value)}
                      placeholder="createElement('div', {className: 'building'})"
                      className="flex-1 bg-slate-900 border border-slate-700 rounded px-4 py-2 text-sm"
                    />
                    <button
                      onClick={handleAddStep}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded text-sm"
                    >
                      Add Step
                    </button>
                    <button
                      onClick={handleResetManual}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded text-sm"
                    >
                      Reset
                    </button>
                  </div>
                  {error && <p className="text-red-400 text-sm">{error}</p>}
                  <div className="border border-slate-700 rounded p-4 bg-slate-900/50 max-h-60 overflow-y-auto">
                    <CodeBlock
                      code={manualSteps.join(",\n")}
                      variant="error"
                      title="// ❌ Manual createElement Calls"
                      language="javascript"
                      defaultExpanded={true}
                    />
                  </div>
                  <div className="text-sm text-slate-500">
                    <p>Steps: {manualSteps.length}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold">Live Preview</h4>
                  <div
                    ref={streetPreviewRef}
                    className="border border-slate-700 rounded p-6 bg-slate-950 min-h-[300px]"
                  >
                    <div className="street">
                      {manualSteps.map((step, idx) => {
                        // Very simplified rendering for demo purposes
                        if (step.includes("building")) {
                          return (
                            <div key={idx} className="building w-16 h-24 bg-red-900 mb-4" />
                          );
                        }
                        if (step.includes("lamppost")) {
                          return (
                            <div key={idx} className="lamppost w-4 h-20 bg-gray-700 mb-4" />
                          );
                        }
                        return null;
                      })}
                    </div>
                    {manualSteps.length <= 1 && (
                      <div className="text-slate-600 text-center mt-20">
                        Add createElement steps to see the scene build.
                      </div>
                    )}
                  </div>
                  <div className="bg-red-950/20 border border-red-500/30 rounded p-4">
                    <h5 className="font-bold text-red-400 mb-2">Pain Points</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Nested calls are hard to read and maintain</li>
                      <li>• Missing commas or parentheses break everything</li>
                      <li>• No visual intuition of the resulting UI</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 3 Demo: JSX description */}
          {chapter === 2 && (
            <div className="space-y-6">
              <p className="text-slate-400">
                Now describe the same street scene using JSX. It's intuitive and human-readable.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold">JSX Description</h4>
                  <textarea
                    value={jsxDescription}
                    onChange={(e) => setJsxDescription(e.target.value)}
                    className="w-full h-48 bg-slate-900 border border-slate-700 rounded p-4 font-mono text-sm"
                    spellCheck="false"
                  />
                  <button
                    onClick={handleRenderScene}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded font-bold flex items-center justify-center gap-2 w-full"
                  >
                    <Eye className="w-5 h-5" />
                    Render Scene from JSX
                  </button>
                  {sceneRendered && (
                    <div className="p-4 bg-emerald-950/30 border border-emerald-500/50 rounded flex items-center gap-3">
                      <CheckCircle className="text-emerald-400 w-5 h-5" />
                      <span className="text-emerald-400">Scene rendered perfectly!</span>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold">Instant Preview</h4>
                  <div className="border border-slate-700 rounded p-6 bg-slate-950 min-h-[300px] flex items-center justify-center">
                    <div className="street relative w-full h-full">
                      <div className="building absolute left-4 bottom-0 w-20 h-32 bg-red-900" />
                      <div className="lamppost absolute left-32 bottom-0 w-4 h-24 bg-gray-700" />
                      <div className="woman-red-dress absolute right-8 bottom-0 w-6 h-16 bg-red-600" />
                    </div>
                  </div>
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded p-4">
                    <h5 className="font-bold text-emerald-400 mb-2">Advantages</h5>
                    <ul className="text-sm space-y-1">
                      <li>• HTML-like syntax is familiar and intuitive</li>
                      <li>• Clear visual structure mirrors the DOM</li>
                      <li>• Less cognitive load—describe what you want</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 4 Demo: Comparison */}
          {chapter === 3 && (
            <div className="space-y-6">
              <p className="text-slate-400">
                Both JSX and React.createElement produce identical output. The compiler translates
                JSX into the same function calls.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold">JSX Input</h4>
                  <textarea
                    value={jsxInput}
                    onChange={(e) => setJsxInput(e.target.value)}
                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded p-4 font-mono text-sm"
                    spellCheck="false"
                  />
                  <CodeBlock
                    code={jsxInput}
                    variant="success"
                    title="// ✅ JSX"
                    language="jsx"
                    defaultExpanded={false}
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold">React.createElement Input</h4>
                  <textarea
                    value={createElementInput}
                    onChange={(e) => setCreateElementInput(e.target.value)}
                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded p-4 font-mono text-sm"
                    spellCheck="false"
                  />
                  <CodeBlock
                    code={createElementInput}
                    variant="default"
                    title="// Manual createElement"
                    language="javascript"
                    defaultExpanded={false}
                  />
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold">Compiled Output</h4>
                  <div className="border border-slate-700 rounded p-4 bg-slate-900/50 h-32 overflow-y-auto">
                    <pre className="text-sm text-emerald-400 whitespace-pre-wrap">
                      {comparisonOutput}
                    </pre>
                  </div>
                  <div className="border border-slate-700 rounded p-6 bg-slate-950 min-h-[100px] flex items-center justify-center">
                    <div className="exit-sign bg-green-800 text-white font-bold px-4 py-2 rounded border border-green-600">
                      EXIT
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900/50 rounded border border-slate-700">
                    <p className="text-sm text-center">
                      <strong className="text-emerald-400">Both produce the same result.</strong>
                      <br />
                      JSX is syntactic sugar for React.createElement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chapter 5 Demo: Mastery gallery */}
          {chapter === 4 && (
            <div className="space-y-6">
              <p className="text-slate-400">
                With mastery, you can rapidly prototype complex scenes using JSX. Select a scene to
                view its JSX source.
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold">Scene Gallery</h4>
                  <div className="grid grid-cols-3 gap-4">
                    {scenes.map((scene, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedScene(idx)}
                        className={`p-4 rounded border ${
                          selectedScene === idx
                            ? "border-emerald-500 bg-emerald-950/30"
                            : "border-slate-700 bg-slate-900/50"
                        } hover:border-slate-500 transition-colors`}
                      >
                        <div
                          className={`w-full h-20 rounded mb-2 ${scene.color} flex items-center justify-center`}
                        >
                          <div className="text-xs text-slate-300">{scene.name}</div>
                        </div>
                        <div className="text-xs text-slate-400 truncate">{scene.name}</div>
                      </button>
                    ))}
                  </div>
                  <div className="border border-slate-700 rounded p-6 bg-slate-950 min-h-[200px] flex items-center justify-center">
                    <div className="scene-preview w-full h-full flex items-center justify-center">
                      <div className="text-slate-600">Visual representation of {scenes[selectedScene].name}</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold">JSX Source</h4>
                  <CodeBlock
                    code={scenes[selectedScene].jsx}
                    variant="success"
                    title={`// ${scenes[selectedScene].name} JSX`}
                    language="jsx"
                    defaultExpanded={true}
                  />
                  <div className="bg-slate-900/50 border border-slate-700 rounded p-6">
                    <h5 className="font-bold mb-3 flex items-center gap-2">
                      <FileCode className="w-4 h-4" />
                      Mastery Insights
                    </h5>
                    <ul className="space-y-3 text-sm text-slate-400">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1" />
                        JSX allows you to think in <strong>visual components</strong>, not function calls.
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1" />
                        The structure is <strong>declarative</strong>: you describe the end state.
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1" />
                        You can see both the <strong>UI</strong> and the <strong>code</strong> that creates it.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Navigation */}
        <nav className="flex justify-between items-center mt-8 md:mt-12">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            Previous
          </button>
          <div className="flex flex-col items-center">
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
            <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            Next
          </button>
        </nav>
      </main>

      <style>{`
        .tv-set {
          width: 200px;
          height: 150px;
          background: #1e293b;
          border: 8px solid #475569;
          border-radius: 12px;
          position: relative;
        }
        .tv-set.vintage {
          border-color: #92400e;
        }
        .tv-set .screen {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          bottom: 40px;
          background: #0f172a;
          border-radius: 4px;
          overflow: hidden;
        }
        .tv-set .static {
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, #064e3b 25%, transparent 25%),
                      linear-gradient(-45deg, #064e3b 25%, transparent 25%),
                      linear-gradient(45deg, transparent 75%, #064e3b 75%),
                      linear-gradient(-45deg, transparent 75%, #064e3b 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
          animation: staticMove 0.5s infinite linear;
        }
        @keyframes staticMove {
          0% { background-position: 0 0, 0 10px, 10px -10px, -10px 0px; }
          100% { background-position: 20px 0, 20px 10px, 30px -10px, 10px 0px; }
        }
        .tv-set .controls {
          position: absolute;
          bottom: 8px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .tv-set .knob {
          width: 16px;
          height: 16px;
          background: #475569;
          border-radius: 50%;
        }
        .street {
          position: relative;
          width: 100%;
          height: 100%;
          background: #334155;
        }
        .building {
          background: #7f1d1d;
        }
        .lamppost {
          background: #374151;
        }
        .woman-red-dress {
          background: #dc2626;
        }
        .exit-sign {
          background: #065f46;
          color: white;
          font-weight: bold;
          padding: 8px 16px;
          border-radius: 4px;
          border: 2px solid #10b981;
        }
      `}</style>
    </div>
  );
}