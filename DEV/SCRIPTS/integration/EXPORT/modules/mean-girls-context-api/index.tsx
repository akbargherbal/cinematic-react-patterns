import { useState, useMemo } from "react";
import { Sparkles, ArrowRight, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
  demo: () => JSX.Element;
}

export default function MeanGirlsContextAPI() {
  const [chapter, setChapter] = useState(0);
  const [isDrilling, setIsDrilling] = useState(true);
  const [burnBookPages, setBurnBookPages] = useState(0);
  const [isOptimized, setIsOptimized] = useState(false);
  const [messageHops, setMessageHops] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const PropDrillingDemo = () => {
    const passMessage = () => {
      setIsAnimating(true);
      setMessageHops(0);
      
      const hops = [1, 2, 3, 4];
      hops.forEach((hop, index) => {
        setTimeout(() => {
          setMessageHops(hop);
          if (hop === 4) {
            setTimeout(() => setIsAnimating(false), 500);
          }
        }, index * 600);
      });
    };

    return (
      <div className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-200 rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          The Gossip Chain
        </h3>
        
        <div className="flex flex-col items-center gap-6 mb-8">
          {/* Regina */}
          <div className={`relative transition-all duration-300 ${messageHops >= 1 ? 'scale-105 ring-4 ring-pink-400' : ''}`}>
            <div className="bg-pink-500 text-white px-6 py-3 rounded-lg font-bold shadow-md">
              Regina (Parent)
            </div>
            {messageHops >= 1 && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-pink-600 font-semibold animate-pulse">
                "Janis is a lesbian"
              </div>
            )}
          </div>
          
          <ArrowRight className="w-6 h-6 text-pink-400 rotate-90" />
          
          {/* Gretchen */}
          <div className={`relative transition-all duration-300 ${messageHops >= 2 ? 'scale-105 ring-4 ring-pink-400' : ''}`}>
            <div className="bg-pink-400 text-white px-6 py-3 rounded-lg font-bold shadow-md">
              Gretchen (Intermediary)
            </div>
            <div className="text-xs text-slate-500 mt-1 text-center">
              Doesn't need this prop
            </div>
          </div>
          
          <ArrowRight className="w-6 h-6 text-pink-400 rotate-90" />
          
          {/* Karen */}
          <div className={`relative transition-all duration-300 ${messageHops >= 3 ? 'scale-105 ring-4 ring-pink-400' : ''}`}>
            <div className="bg-pink-300 text-white px-6 py-3 rounded-lg font-bold shadow-md">
              Karen (Intermediary)
            </div>
            <div className="text-xs text-slate-500 mt-1 text-center">
              Doesn't need this prop
            </div>
          </div>
          
          <ArrowRight className="w-6 h-6 text-pink-400 rotate-90" />
          
          {/* Damian */}
          <div className={`relative transition-all duration-300 ${messageHops >= 4 ? 'scale-105 ring-4 ring-green-400' : ''}`}>
            <div className="bg-slate-600 text-white px-6 py-3 rounded-lg font-bold shadow-md">
              Damian (Consumer)
            </div>
            {messageHops >= 4 && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-green-600 font-semibold animate-pulse">
                "I already knew that!"
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={passMessage}
            disabled={isAnimating}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all disabled:cursor-not-allowed"
          >
            Pass the Gossip
          </button>
          
          <div className="text-right">
            <div className="text-sm text-slate-600">Total Hops:</div>
            <div className="text-3xl font-bold text-pink-600">{messageHops}</div>
          </div>
        </div>
        
        <div className="bg-pink-100 border-l-4 border-pink-500 p-4 rounded">
          <p className="text-sm text-slate-700">
            <strong>The Problem:</strong> Gretchen and Karen must receive and pass along props they don't use, 
            just to get information from Regina to Damian. This is prop drilling.
          </p>
        </div>
      </div>
    );
  };

  const ContextToggleDemo = () => {
    return (
      <div className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-200 rounded-xl p-8 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-pink-600 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            The Burn Book Solution
          </h3>
          
          <button
            onClick={() => setIsDrilling(!isDrilling)}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition-all"
          >
            Toggle: {isDrilling ? "Prop Drilling" : "Context API"}
          </button>
        </div>
        
        {isDrilling ? (
          <div className="space-y-4">
            <div className="bg-slate-100 p-4 rounded-lg border border-slate-300">
              <div className="text-xs text-slate-500 mb-2 font-mono">Prop Drilling Approach:</div>
              <pre className="text-sm font-mono text-slate-800 overflow-x-auto">
{`function Regina() {
  const gossip = "Janis is a lesbian";
  return <Gretchen gossip={gossip} />;
}

function Gretchen({ gossip }) {
  // Doesn't use gossip, just passes it
  return <Karen gossip={gossip} />;
}

function Karen({ gossip }) {
  // Doesn't use gossip, just passes it
  return <Damian gossip={gossip} />;
}

function Damian({ gossip }) {
  return <div>{gossip}</div>;
}`}
              </pre>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-sm text-slate-700">
                <strong>Issues:</strong> Verbose, brittle, clutters intermediate components with unused props.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-100 p-4 rounded-lg border border-slate-300">
              <div className="text-xs text-slate-500 mb-2 font-mono">Context API Approach:</div>
              <pre className="text-sm font-mono text-slate-800 overflow-x-auto">
{`const BurnBookContext = createContext();

function Regina() {
  const gossip = "Janis is a lesbian";
  return (
    <BurnBookContext.Provider value={gossip}>
      <Plastics />
    </BurnBookContext.Provider>
  );
}

function Damian() {
  const gossip = useContext(BurnBookContext);
  return <div>{gossip}</div>;
}

// Gretchen and Karen don't need to know!`}
              </pre>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-slate-700">
                <strong>Benefits:</strong> Clean, direct access, no intermediate prop passing required.
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-center">
          <div className="bg-pink-500 text-white px-8 py-4 rounded-lg shadow-lg text-center">
            <div className="text-sm font-semibold mb-1">The Burn Book</div>
            <div className="text-xs opacity-90">Context Provider</div>
          </div>
        </div>
      </div>
    );
  };

  const RiotSimulator = () => {
    const consumers = 12;
    const reRenders = isOptimized ? burnBookPages : burnBookPages * consumers;
    const chaosLevel = Math.min((burnBookPages / 10) * 100, 100);

    const addPage = () => {
      setBurnBookPages(p => p + 1);
    };

    const reset = () => {
      setBurnBookPages(0);
    };

    return (
      <div className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-200 rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6" />
          The Riot Simulator
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-sm text-slate-600 mb-2">Burn Book Pages Added:</div>
            <div className="text-4xl font-bold text-pink-600">{burnBookPages}</div>
          </div>
          
          <div>
            <div className="text-sm text-slate-600 mb-2">Total Re-renders:</div>
            <div className="text-4xl font-bold text-red-600">{reRenders}</div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Chaos Level:</span>
            <span className="text-sm font-bold text-red-600">{chaosLevel.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-red-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${chaosLevel}%` }}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-6">
          {Array.from({ length: consumers }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-bold transition-all ${
                burnBookPages > 0
                  ? 'bg-red-100 border-red-400 text-red-700 animate-pulse'
                  : 'bg-slate-100 border-slate-300 text-slate-500'
              }`}
            >
              {burnBookPages > 0 ? '😱' : '😊'}
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={addPage}
            className="flex-1 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg font-bold shadow-md transition-all"
          >
            Add Page to Burn Book
          </button>
          
          <button
            onClick={reset}
            className="px-6 py-3 bg-slate-300 hover:bg-slate-400 text-slate-700 rounded-lg font-bold shadow-md transition-all"
          >
            Reset
          </button>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <input
            type="checkbox"
            id="optimize"
            checked={isOptimized}
            onChange={(e) => setIsOptimized(e.target.checked)}
            className="w-5 h-5 text-pink-500 rounded"
          />
          <label htmlFor="optimize" className="text-sm text-slate-700 font-semibold">
            Enable React.memo optimization
          </label>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-sm text-slate-700">
            <strong>The Problem:</strong> Every context update triggers re-renders in ALL {consumers} consumers, 
            even if they don't care about the specific change. {isOptimized && "With React.memo, only components with changed props re-render."}
          </p>
        </div>
      </div>
    );
  };

  const DecisionTree = () => {
    const [selected, setSelected] = useState<string | null>(null);

    const decisions = [
      {
        id: 'start',
        question: 'Does this state need to be accessed by many components across different branches?',
        yes: 'frequency',
        no: 'props',
      },
      {
        id: 'frequency',
        question: 'Does it change frequently?',
        yes: 'alternative',
        no: 'context',
      },
    ];

    const outcomes = {
      props: {
        title: 'Use Props or Local State',
        color: 'green',
        example: 'Form state, list filtering, modal visibility',
      },
      context: {
        title: 'Use Context API',
        color: 'blue',
        example: 'Theme, authentication, localization',
      },
      alternative: {
        title: 'Consider Alternatives',
        color: 'purple',
        example: 'Redux, Zustand, or component composition',
      },
    };

    return (
      <div className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-200 rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          Should I Use Context?
        </h3>
        
        <div className="space-y-6">
          <div className="bg-slate-100 p-6 rounded-lg border-2 border-slate-300">
            <div className="text-sm font-semibold text-slate-600 mb-2">Start Here:</div>
            <div className="text-lg font-bold text-slate-800 mb-4">
              Does this state need to be accessed by many components across different branches?
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setSelected('frequency')}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-all"
              >
                Yes
              </button>
              <button
                onClick={() => setSelected('props')}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-all"
              >
                No
              </button>
            </div>
          </div>
          
          {selected === 'frequency' && (
            <div className="bg-slate-100 p-6 rounded-lg border-2 border-slate-300 animate-fadeIn">
              <div className="text-sm font-semibold text-slate-600 mb-2">Next Question:</div>
              <div className="text-lg font-bold text-slate-800 mb-4">
                Does it change frequently?
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelected('alternative')}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-all"
                >
                  Yes
                </button>
                <button
                  onClick={() => setSelected('context')}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-all"
                >
                  No
                </button>
              </div>
            </div>
          )}
          
          {selected && outcomes[selected as keyof typeof outcomes] && (
            <div className={`bg-${outcomes[selected as keyof typeof outcomes].color}-50 border-2 border-${outcomes[selected as keyof typeof outcomes].color}-300 p-6 rounded-lg animate-fadeIn`}>
              <div className="text-2xl font-bold text-slate-800 mb-2">
                ✓ {outcomes[selected as keyof typeof outcomes].title}
              </div>
              <div className="text-sm text-slate-600">
                <strong>Examples:</strong> {outcomes[selected as keyof typeof outcomes].example}
              </div>
            </div>
          )}
          
          <button
            onClick={() => setSelected(null)}
            className="w-full bg-slate-300 hover:bg-slate-400 text-slate-700 px-4 py-2 rounded-lg font-bold shadow-md transition-all"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  };

  const ComparisonTable = () => {
    return (
      <div className="bg-gradient-to-br from-pink-50 to-white border-2 border-pink-200 rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-pink-600 mb-6 flex items-center gap-2">
          <Sparkles className="w-6 h-6" />
          Prop Drilling vs Context API
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-pink-500 text-white">
                <th className="p-4 text-left font-bold">Feature</th>
                <th className="p-4 text-center font-bold">Prop Drilling</th>
                <th className="p-4 text-center font-bold">Context API</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="p-4 font-semibold text-slate-700">Explicit data flow</td>
                <td className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-6 h-6 text-red-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-slate-200 bg-slate-50">
                <td className="p-4 font-semibold text-slate-700">Clean component code</td>
                <td className="p-4 text-center">
                  <XCircle className="w-6 h-6 text-red-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-4 font-semibold text-slate-700">Targeted re-renders</td>
                <td className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-6 h-6 text-red-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-slate-200 bg-slate-50">
                <td className="p-4 font-semibold text-slate-700">Easy refactoring</td>
                <td className="p-4 text-center">
                  <XCircle className="w-6 h-6 text-red-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-4 font-semibold text-slate-700">No performance pitfalls</td>
                <td className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="w-6 h-6 text-red-500 mx-auto" />
                </td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-4 font-semibold text-slate-700">Scales to many consumers</td>
                <td className="p-4 text-center">
                  <XCircle className="w-6 h-6 text-red-500 mx-auto" />
                </td>
                <td className="p-4 text-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="font-bold text-green-700 mb-2">Use Prop Drilling For:</div>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Local component communication</li>
              <li>• Frequently changing state</li>
              <li>• Small component trees</li>
              <li>• When you need explicit data flow</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="font-bold text-blue-700 mb-2">Use Context API For:</div>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Truly global state (theme, auth)</li>
              <li>• Infrequently changing data</li>
              <li>• Many consumers across branches</li>
              <li>• When prop drilling becomes unwieldy</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const chapters: Chapter[] = useMemo(() => [
    {
      id: 'intro',
      title: 'The Plastic Chain of Command',
      content: `At North Shore High School, information flows through a very specific hierarchy. Regina George sits at the apex—the root component of the entire social tree. Below her, Gretchen Wieners serves as the primary intermediary, and below Gretchen, Karen Smith represents the final node before information reaches the rest of the school.

This is how gossip works in the Plastics' world: Regina whispers to Gretchen, Gretchen whispers to Karen, and Karen—eventually—whispers to whoever needs to know. It's a chain of command, a social protocol that must be respected.

This is **prop drilling** in its purest form: information passing through multiple layers of components that don't actually need it, just to reach the one component that does.`,
      demo: PropDrillingDemo,
    },
    {
      id: 'build',
      title: 'The Burn Book Solution',
      content: `Regina George is many things, but inefficient is not one of them. She recognizes the limitations of the gossip chain—too slow, too many intermediaries, too much room for the message to get distorted. So she creates something revolutionary: **The Burn Book**.

The Burn Book is a shared context, a centralized repository of information that any Plastic can access directly. No more passing props through Gretchen and Karen. No more waiting for information to trickle down the component tree.

The Burn Book is the **Context Provider**. It wraps the Plastics' social circle, making its values available to any component that subscribes.`,
      demo: ContextToggleDemo,
    },
    {
      id: 'climax',
      title: 'The Riot (When Context Goes Wrong)',
      content: `Regina George stands at the top of the main hallway, a stack of Burn Book pages in her hands. She's about to do something catastrophic: she's going to update the context value and broadcast it to every possible consumer simultaneously.

She releases the pages. They flutter down like toxic snow, each one a piece of state that every student (component) must now process. The hallway erupts.

This is what happens when you broadcast a context update to too many consumers at once: **performance bottleneck**. Every subscribed component is re-rendering, recalculating, and updating based on the new information.`,
      demo: RiotSimulator,
    },
    {
      id: 'resolution',
      title: 'Mathletes and Moderation',
      content: `After the riot, after the apologies, after the Burn Book is destroyed, Cady finds herself in a different world: the Mathletes. And she notices something interesting about how information flows here.

The Mathletes don't need a Burn Book. They don't have a centralized context that everyone subscribes to. Instead, they communicate directly, efficiently, in small groups.

This is **component composition** and **local state management**. Not everything needs to be global. Not everything needs to be in context.

The key is knowing which tool to use when.`,
      demo: DecisionTree,
    },
    {
      id: 'summary',
      title: 'The Rules of Context API',
      content: `Cady Heron learned the hard way what every React developer must eventually understand: Context API is powerful, but it comes with rules. Break them, and you get a riot. Follow them, and you get an elegant, maintainable application.

The real skill is knowing which tool to reach for, and when. Context API is not a silver bullet—it's one tool in your toolbox, to be used wisely and sparingly.

In React, as in high school, there's no one-size-fits-all solution. There's only the discipline to analyze your needs, understand your tools, and make thoughtful choices.`,
      demo: ComparisonTable,
    },
  ], [isDrilling, burnBookPages, isOptimized, messageHops, isAnimating]);

  const currentChapter = chapters[chapter];
  const DemoComponent = currentChapter.demo;

  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-8 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-bold">Mean Girls</h1>
          </div>
          <p className="text-xl md:text-2xl opacity-90 font-semibold">
            Context API & Prop Drilling
          </p>
          <p className="text-sm md:text-base opacity-75 mt-2">
            North Shore High School, 2004
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <div className="text-sm text-pink-500 font-semibold mb-2">
            Chapter {chapter + 1} of {chapters.length}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            {currentChapter.title}
          </h2>
        </div>

        {/* Narrative Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {currentChapter.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-slate-700 leading-relaxed mb-4">
              {paragraph.split('**').map((part, i) => 
                i % 2 === 0 ? part : <strong key={i} className="text-pink-600 font-bold">{part}</strong>
              )}
            </p>
          ))}
        </div>

        {/* Interactive Demo */}
        <DemoComponent />
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t-2 border-pink-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter(c => c - 1)}
              disabled={chapter === 0}
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition-all"
            >
              Previous
            </button>
            
            <div className="hidden md:flex items-center gap-2">
              {chapters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setChapter(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === chapter
                      ? 'bg-pink-500 w-8'
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to chapter ${index + 1}`}
                />
              ))}
            </div>
            
            <span className="md:hidden text-sm font-semibold text-slate-600">
              {chapter + 1} / {chapters.length}
            </span>
            
            <button
              onClick={() => setChapter(c => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-3 bg-pink-500 hover:bg-pink-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-lg shadow-md transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}