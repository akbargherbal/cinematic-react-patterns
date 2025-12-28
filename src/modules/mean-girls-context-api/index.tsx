import { useState, useMemo } from "react";
import {
  Sparkles,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

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
      <div className="rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white p-8 shadow-lg">
        <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-pink-600">
          <Sparkles className="h-6 w-6" />
          The Gossip Chain
        </h3>

        <div className="mb-8 flex flex-col items-center gap-2">
          {/* Regina */}
          <div
            className={`relative transition-all duration-300 ${messageHops >= 1 ? "scale-105 ring-2 ring-pink-400" : ""}`}
          >
            <div className="rounded-lg bg-pink-500 px-6 py-3 font-bold text-white shadow-md">
              Regina (Parent)
            </div>
            {messageHops >= 1 && (
              <div className="absolute -bottom-6 left-2 -translate-x-1/2 transform animate-pulse text-xs font-semibold text-pink-600">
                "Janis is a lesbian"
              </div>
            )}
          </div>

          <ArrowRight className="h-6 w-6 rotate-90 text-pink-400" />

          {/* Gretchen */}
          <div
            className={`relative transition-all duration-300 ${messageHops >= 2 ? "scale-105 ring-2 ring-pink-400" : ""}`}
          >
            <div className="rounded-lg bg-pink-400 px-6 py-3 font-bold text-white shadow-md">
              Gretchen (Intermediary)
            </div>
            <div className="mt-1 text-center text-xs text-slate-500">
              Doesn't need this prop
            </div>
          </div>

          <ArrowRight className="h-6 w-6 rotate-90 text-pink-400" />

          {/* Karen */}
          <div
            className={`relative transition-all duration-300 ${messageHops >= 3 ? "scale-105 ring-2 ring-pink-400" : ""}`}
          >
            <div className="rounded-lg bg-pink-300 px-6 py-3 font-bold text-white shadow-md">
              Karen (Intermediary)
            </div>
            <div className="mt-1 text-center text-xs text-slate-500">
              Doesn't need this prop
            </div>
          </div>

          <ArrowRight className="h-6 w-6 rotate-90 text-pink-400" />

          {/* Damian */}
          <div
            className={`relative transition-all duration-300 ${messageHops >= 4 ? "scale-105 ring-2 ring-green-400" : ""}`}
          >
            <div className="rounded-lg bg-slate-600 px-6 py-3 font-bold text-white shadow-md">
              Damian (Consumer)
            </div>
            {messageHops >= 4 && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform animate-pulse text-xs font-semibold text-green-600">
                "I already knew that!"
              </div>
            )}
          </div>
        </div>

        <div className="mb-4 px-12 flex items-center justify-between">
          <button
            onClick={passMessage}
            disabled={isAnimating}
            className="rounded-lg bg-pink-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-pink-300"
          >
            Pass the Gossip
          </button>

          <div className="text-right">
            <div className="text-sm text-slate-600">Total Hops:</div>
            <div className="text-3xl font-bold text-pink-600">
              {messageHops}
            </div>
          </div>
        </div>

        <div className="rounded border-l-4 border-pink-500 bg-pink-100 p-4">
          <p className="text-sm text-slate-700">
            <strong>The Problem:</strong> Gretchen and Karen must receive and
            pass along props they don't use, just to get information from Regina
            to Damian. This is prop drilling.
          </p>
        </div>
      </div>
    );
  };

  const ContextToggleDemo = () => {
    return (
      <div className="rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-2xl font-bold text-pink-600">
            <Sparkles className="h-6 w-6" />
            The Burn Book Solution
          </h3>

          <button
            onClick={() => setIsDrilling(!isDrilling)}
            className="rounded-lg bg-pink-500 px-4 py-2 font-semibold text-white shadow-md transition-all hover:bg-pink-600"
          >
            Toggle: {isDrilling ? "Prop Drilling" : "Context API"}
          </button>
        </div>

        {isDrilling ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-300 bg-slate-100 p-4">
              <div className="mb-2 font-mono text-xs text-slate-500">
                Prop Drilling Approach:
              </div>
              <pre className="overflow-x-auto font-mono text-sm text-slate-800">
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

            <div className="rounded border-l-4 border-red-500 bg-red-50 p-4">
              <p className="text-sm text-slate-700">
                <strong>Issues:</strong> Verbose, brittle, clutters intermediate
                components with unused props.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border border-slate-300 bg-slate-100 p-4">
              <div className="mb-2 font-mono text-xs text-slate-500">
                Context API Approach:
              </div>
              <pre className="overflow-x-auto font-mono text-sm text-slate-800">
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

            <div className="rounded border-l-4 border-green-500 bg-green-50 p-4">
              <p className="text-sm text-slate-700">
                <strong>Benefits:</strong> Clean, direct access, no intermediate
                prop passing required.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-center">
          <div className="rounded-lg bg-pink-500 px-8 py-4 text-center text-white shadow-lg">
            <div className="mb-1 text-sm font-semibold">The Burn Book</div>
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
      setBurnBookPages((p) => p + 1);
    };

    const reset = () => {
      setBurnBookPages(0);
    };

    return (
      <div className="rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white p-8 shadow-lg">
        <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-pink-600">
          <AlertTriangle className="h-6 w-6" />
          The Riot Simulator
        </h3>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <div className="mb-2 text-sm text-slate-600">
              Burn Book Pages Added:
            </div>
            <div className="text-4xl font-bold text-pink-600">
              {burnBookPages}
            </div>
          </div>

          <div>
            <div className="mb-2 text-sm text-slate-600">Total Re-renders:</div>
            <div className="text-4xl font-bold text-red-600">{reRenders}</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-slate-600">Chaos Level:</span>
            <span className="text-sm font-bold text-red-600">
              {chaosLevel.toFixed(0)}%
            </span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 to-red-600 transition-all duration-500"
              style={{ width: `${chaosLevel}%` }}
            />
          </div>
        </div>

        <div className="mb-6 grid grid-cols-4 gap-2">
          {Array.from({ length: consumers }).map((_, i) => (
            <div
              key={i}
              className={`flex aspect-square items-center justify-center rounded-lg border-2 text-xs font-bold transition-all ${
                burnBookPages > 0
                  ? "animate-pulse border-red-400 bg-red-100 text-red-700"
                  : "border-slate-300 bg-slate-100 text-slate-500"
              }`}
            >
              {burnBookPages > 0 ? "😱" : "😊"}
            </div>
          ))}
        </div>

        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={addPage}
            className="flex-1 rounded-lg bg-pink-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-pink-600"
          >
            Add Page to Burn Book
          </button>

          <button
            onClick={reset}
            className="rounded-lg bg-slate-300 px-6 py-3 font-bold text-slate-700 shadow-md transition-all hover:bg-slate-400"
          >
            Reset
          </button>
        </div>

        <div className="mb-4 flex items-center gap-3">
          <input
            type="checkbox"
            id="optimize"
            checked={isOptimized}
            onChange={(e) => setIsOptimized(e.target.checked)}
            className="h-5 w-5 rounded text-pink-500"
          />
          <label
            htmlFor="optimize"
            className="text-sm font-semibold text-slate-700"
          >
            Enable React.memo optimization
          </label>
        </div>

        <div className="rounded border-l-4 border-yellow-500 bg-yellow-50 p-4">
          <p className="text-sm text-slate-700">
            <strong>The Problem:</strong> Every context update triggers
            re-renders in ALL {consumers} consumers, even if they don't care
            about the specific change.{" "}
            {isOptimized &&
              "With React.memo, only components with changed props re-render."}
          </p>
        </div>
      </div>
    );
  };

  const DecisionTree = () => {
    const [selected, setSelected] = useState<string | null>(null);

    const decisions = [
      {
        id: "start",
        question:
          "Does this state need to be accessed by many components across different branches?",
        yes: "frequency",
        no: "props",
      },
      {
        id: "frequency",
        question: "Does it change frequently?",
        yes: "alternative",
        no: "context",
      },
    ];

    const outcomes = {
      props: {
        title: "Use Props or Local State",
        color: "green",
        example: "Form state, list filtering, modal visibility",
      },
      context: {
        title: "Use Context API",
        color: "blue",
        example: "Theme, authentication, localization",
      },
      alternative: {
        title: "Consider Alternatives",
        color: "purple",
        example: "Redux, Zustand, or component composition",
      },
    };

    return (
      <div className="rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white p-8 shadow-lg">
        <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-pink-600">
          <Sparkles className="h-6 w-6" />
          Should I Use Context?
        </h3>

        <div className="space-y-6">
          <div className="rounded-lg border-2 border-slate-300 bg-slate-100 p-6">
            <div className="mb-2 text-sm font-semibold text-slate-600">
              Start Here:
            </div>
            <div className="mb-4 text-lg font-bold text-slate-800">
              Does this state need to be accessed by many components across
              different branches?
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setSelected("frequency")}
                className="flex-1 rounded-lg bg-green-500 px-4 py-2 font-bold text-white shadow-md transition-all hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => setSelected("props")}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2 font-bold text-white shadow-md transition-all hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>

          {selected === "frequency" && (
            <div className="animate-fadeIn rounded-lg border-2 border-slate-300 bg-slate-100 p-6">
              <div className="mb-2 text-sm font-semibold text-slate-600">
                Next Question:
              </div>
              <div className="mb-4 text-lg font-bold text-slate-800">
                Does it change frequently?
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelected("alternative")}
                  className="flex-1 rounded-lg bg-purple-500 px-4 py-2 font-bold text-white shadow-md transition-all hover:bg-purple-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => setSelected("context")}
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-2 font-bold text-white shadow-md transition-all hover:bg-blue-600"
                >
                  No
                </button>
              </div>
            </div>
          )}

          {selected && outcomes[selected as keyof typeof outcomes] && (
            <div
              className={`bg-${outcomes[selected as keyof typeof outcomes].color}-50 border-2 border-${outcomes[selected as keyof typeof outcomes].color}-300 animate-fadeIn rounded-lg p-6`}
            >
              <div className="mb-2 text-2xl font-bold text-slate-800">
                ✓ {outcomes[selected as keyof typeof outcomes].title}
              </div>
              <div className="text-sm text-slate-600">
                <strong>Examples:</strong>{" "}
                {outcomes[selected as keyof typeof outcomes].example}
              </div>
            </div>
          )}

          <button
            onClick={() => setSelected(null)}
            className="w-full rounded-lg bg-slate-300 px-4 py-2 font-bold text-slate-700 shadow-md transition-all hover:bg-slate-400"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  };

  const ComparisonTable = () => {
    return (
      <div className="rounded-xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-white p-8 shadow-lg">
        <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-pink-600">
          <Sparkles className="h-6 w-6" />
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
                <td className="p-4 font-semibold text-slate-700">
                  Explicit data flow
                </td>
                <td className="p-4 text-center">
                  <CheckCircle className="mx-auto h-6 w-6 text-green-500" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="mx-auto h-6 w-6 text-red-500" />
                </td>
              </tr>
              <tr className="border-b border-slate-200 bg-slate-50">
                <td className="p-4 font-semibold text-slate-700">
                  Clean component code
                </td>
                <td className="p-4 text-center">
                  <XCircle className="mx-auto h-6 w-6 text-red-500" />
                </td>
                <td className="p-4 text-center">
                  <CheckCircle className="mx-auto h-6 w-6 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-4 font-semibold text-slate-700">
                  Targeted re-renders
                </td>
                <td className="p-4 text-center">
                  <CheckCircle className="mx-auto h-6 w-6 text-green-500" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="mx-auto h-6 w-6 text-red-500" />
                </td>
              </tr>
              <tr className="border-b border-slate-200 bg-slate-50">
                <td className="p-4 font-semibold text-slate-700">
                  Easy refactoring
                </td>
                <td className="p-4 text-center">
                  <XCircle className="mx-auto h-6 w-6 text-red-500" />
                </td>
                <td className="p-4 text-center">
                  <CheckCircle className="mx-auto h-6 w-6 text-green-500" />
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-4 font-semibold text-slate-700">
                  No performance pitfalls
                </td>
                <td className="p-4 text-center">
                  <CheckCircle className="mx-auto h-6 w-6 text-green-500" />
                </td>
                <td className="p-4 text-center">
                  <XCircle className="mx-auto h-6 w-6 text-red-500" />
                </td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-4 font-semibold text-slate-700">
                  Scales to many consumers
                </td>
                <td className="p-4 text-center">
                  <XCircle className="mx-auto h-6 w-6 text-red-500" />
                </td>
                <td className="p-4 text-center">
                  <CheckCircle className="mx-auto h-6 w-6 text-green-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded border-l-4 border-green-500 bg-green-50 p-4">
            <div className="mb-2 font-bold text-green-700">
              Use Prop Drilling For:
            </div>
            <ul className="space-y-1 text-sm text-slate-700">
              <li>• Local component communication</li>
              <li>• Frequently changing state</li>
              <li>• Small component trees</li>
              <li>• When you need explicit data flow</li>
            </ul>
          </div>

          <div className="rounded border-l-4 border-blue-500 bg-blue-50 p-4">
            <div className="mb-2 font-bold text-blue-700">
              Use Context API For:
            </div>
            <ul className="space-y-1 text-sm text-slate-700">
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

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "The Plastic Chain of Command",
        content: `At North Shore High School, information flows through a very specific hierarchy. Regina George sits at the apex—the root component of the entire social tree. Below her, Gretchen Wieners serves as the primary intermediary, and below Gretchen, Karen Smith represents the final node before information reaches the rest of the school.

This is how gossip works in the Plastics' world: Regina whispers to Gretchen, Gretchen whispers to Karen, and Karen—eventually—whispers to whoever needs to know. It's a chain of command, a social protocol that must be respected.

This is **prop drilling** in its purest form: information passing through multiple layers of components that don't actually need it, just to reach the one component that does.`,
        demo: PropDrillingDemo,
      },
      {
        id: "build",
        title: "The Burn Book Solution",
        content: `Regina George is many things, but inefficient is not one of them. She recognizes the limitations of the gossip chain—too slow, too many intermediaries, too much room for the message to get distorted. So she creates something revolutionary: **The Burn Book**.

The Burn Book is a shared context, a centralized repository of information that any Plastic can access directly. No more passing props through Gretchen and Karen. No more waiting for information to trickle down the component tree.

The Burn Book is the **Context Provider**. It wraps the Plastics' social circle, making its values available to any component that subscribes.`,
        demo: ContextToggleDemo,
      },
      {
        id: "climax",
        title: "The Riot (When Context Goes Wrong)",
        content: `Regina George stands at the top of the main hallway, a stack of Burn Book pages in her hands. She's about to do something catastrophic: she's going to update the context value and broadcast it to every possible consumer simultaneously.

She releases the pages. They flutter down like toxic snow, each one a piece of state that every student (component) must now process. The hallway erupts.

This is what happens when you broadcast a context update to too many consumers at once: **performance bottleneck**. Every subscribed component is re-rendering, recalculating, and updating based on the new information.`,
        demo: RiotSimulator,
      },
      {
        id: "resolution",
        title: "Mathletes and Moderation",
        content: `After the riot, after the apologies, after the Burn Book is destroyed, Cady finds herself in a different world: the Mathletes. And she notices something interesting about how information flows here.

The Mathletes don't need a Burn Book. They don't have a centralized context that everyone subscribes to. Instead, they communicate directly, efficiently, in small groups.

This is **component composition** and **local state management**. Not everything needs to be global. Not everything needs to be in context.

The key is knowing which tool to use when.`,
        demo: DecisionTree,
      },
      {
        id: "summary",
        title: "The Rules of Context API",
        content: `Cady Heron learned the hard way what every React developer must eventually understand: Context API is powerful, but it comes with rules. Break them, and you get a riot. Follow them, and you get an elegant, maintainable application.

The real skill is knowing which tool to reach for, and when. Context API is not a silver bullet—it's one tool in your toolbox, to be used wisely and sparingly.

In React, as in high school, there's no one-size-fits-all solution. There's only the discipline to analyze your needs, understand your tools, and make thoughtful choices.`,
        demo: ComparisonTable,
      },
    ],
    [isDrilling, burnBookPages, isOptimized, messageHops, isAnimating],
  );

  const currentChapter = chapters[chapter];
  const DemoComponent = currentChapter.demo;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-700">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 to-pink-600 p-4 text-white shadow-lg">
        <div className="mx-auto max-w-6xl">

<div>

          <div className="flex justify-between px-4 items-center">          
            <div className="mb-2 flex items-center gap-3">
            <Sparkles className="h-8 w-8" />
            <h1 className="text-4xl font-bold md:text-5xl">Mean Girls</h1>
          </div>
          <p className="text-sm opacity-75 md:text-base ml-6">
            North Shore High School, 2004
          </p>
</div>



          <p className="text-xl font-semibold opacity-90 md:text-2xl">
            Context API & Prop Drilling
          </p></div>


        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <div className="mb-2 text-sm font-semibold text-pink-500">
            Chapter {chapter + 1} of {chapters.length}
          </div>
          <h2 className="mb-4 text-3xl font-bold text-slate-800 md:text-4xl">
            {currentChapter.title}
          </h2>
        </div>

        {/* Narrative Content */}
        <div className="prose prose-lg mb-12 max-w-none">
          {currentChapter.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed text-slate-700">
              {paragraph.split("**").map((part, i) =>
                i % 2 === 0 ? (
                  part
                ) : (
                  <strong key={i} className="font-bold text-pink-600">
                    {part}
                  </strong>
                ),
              )}
            </p>
          ))}
        </div>

        {/* Interactive Demo */}
        <DemoComponent />
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t-2 border-pink-200 bg-white/95 shadow-lg backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="rounded-lg bg-pink-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Previous
            </button>

            <div className="hidden items-center gap-2 md:flex">
              {chapters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setChapter(index)}
                  className={`h-3 w-3 rounded-full transition-all ${
                    index === chapter
                      ? "w-8 bg-pink-500"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to chapter ${index + 1}`}
                />
              ))}
            </div>

            <span className="text-sm font-semibold text-slate-600 md:hidden">
              {chapter + 1} / {chapters.length}
            </span>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="rounded-lg bg-pink-500 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
