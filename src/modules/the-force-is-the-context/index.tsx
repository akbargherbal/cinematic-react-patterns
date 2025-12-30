import { useState, createContext, useContext, useEffect } from "react";
import { Sparkles, AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

// Demo context for interactive examples
interface ThemeContextType {
  theme: string;
  targetingData: string;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export default function TheForceIsTheContext() {
  const [chapter, setChapter] = useState(0);
  const [demoMode, setDemoMode] = useState<"drilling" | "context">("drilling");
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [isDelivering, setIsDelivering] = useState(false);

  const chapters = [
    {
      title: "The Pervasive Field",
      subtitle: "Understanding the Force",
      content: `In the Jedi Temple training grounds, Master Kai demonstrates the Force—an ambient energy field connecting all things. **The Force isn't about touching each stone individually; it's about attuning to the shared field that binds them all.**

Young Padawan Anya walks the Temple's vast halls, seeing layers upon layers: grand chambers → smaller halls → meditation rooms. A deeply nested structure. Kai explains: *"The Force surrounds us, penetrates us, binds the galaxy together. It is the context of our existence."*

**The Teaching**: Just as the Force provides ambient awareness, React Context provides ambient data availability throughout your component tree.`,
      atmosphere: "mysterious, grand",
    },
    {
      title: "The Path of the Messenger",
      subtitle: "The Pain of Prop Drilling",
      content: `Anya receives a glowing data crystal from the Archives with orders: deliver targeting data to Sector Gamma-7. But protocol demands she follow "The Path of the Messenger"—a rigid chain of handoffs.

**Master Zenn** (doesn't need the data) → **Knight Jorli** (fumbles the catch) → **Finally the droid bay** (too late, simulation out of sync).

Every intermediary is a bottleneck. Every handoff risks data corruption. Anya's question echoes: *"Why must I carry the message when the Force can deliver it?"*

**The Problem**: Props must be manually threaded through every component in the tree, even those that don't need the data.`,
      atmosphere: "frantic, inefficient",
    },
    {
      title: "Reaching Out",
      subtitle: "The Power of useContext",
      content: `In the meditation chamber, Kai teaches Anya a different way. No data crystal. No running. Just... connection.

*"Don't pass the knowledge. Access it."*

Anya closes her eyes, reaches out through the Force, and feels the connection directly to the Archives. Her datapad chimes—the targeting sequence appears instantly. No intermediaries. No delays. Just direct access to the shared context.

**The Solution**: \`useContext()\` lets any component directly access data from a Provider, no matter how deeply nested, without prop drilling.`,
      atmosphere: "serene, focused, powerful",
    },
    {
      title: "The Chain and The Connection",
      subtitle: "Comparing Patterns",
      content: `Kai projects two holograms side-by-side:

**LEFT**: Anya running, breathing hard, multiple handoffs, fumbled catches, delays—a fragile chain.

**RIGHT**: Anya sitting calmly, eyes closed briefly, datapad chimes—a direct connection.

*"One path is a chain, fragile at every link. The other is a connection—direct, resilient, available to any who know how to listen."*

**The Contrast**: Prop drilling creates brittle dependencies. Context creates resilient connections.`,
      atmosphere: "reflective, comparative",
    },
    {
      title: "The Dark Side of Dependence",
      subtitle: "When NOT to Use Context",
      content: `Flush with power, Anya uses the Force to summon a spoon across the refectory. Clumsy. Unnecessary. Disruptive.

Kai's gentle rebuke: *"The Dark Side is not just anger; it is dependence. It is putting everything in the Force. You forget the simple arts and couple your destiny to a single power."*

A spoon is local state. The Temple's targeting system is shared context. Know the difference.

**The Wisdom**: Context is for truly global, shared state (theme, auth, user preferences). Use local state for component-specific data. Overusing context leads to tight coupling and performance issues.`,
      atmosphere: "cautionary, wise",
    },
  ];

  const currentChapter = chapters[chapter];

  // Demo: Simulated prop drilling
  const simulatePropDrilling = () => {
    setIsDelivering(true);
    setDeliveryTime(0);
    let time = 0;
    const interval = setInterval(() => {
      time += 200;
      setDeliveryTime(time);
      if (time >= 2000) {
        clearInterval(interval);
        setIsDelivering(false);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-sky-400 w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold text-sky-100">
              The Force is the Context
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Star Wars • Padawan Anya, Coruscant Jedi Temple, 1977
          </p>
          <p className="text-sm text-sky-400 mt-1 font-medium">
            useContext Hook and Context API
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-8 space-y-8">
            {/* Chapter Header */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-sky-100">
                {currentChapter.title}
              </h2>
              <p className="text-xl text-sky-400 italic">
                {currentChapter.subtitle}
              </p>
              <p className="text-sm text-slate-500 uppercase tracking-wide">
                Chapter {chapter + 1} of {chapters.length}
              </p>
            </div>

            {/* Chapter Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="leading-relaxed text-slate-300 space-y-4">
                {currentChapter.content.split('\n\n').map((para, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-sky-300">$1</strong>').replace(/\*(.*?)\*/g, '<em class="text-amber-400">$1</em>') }} />
                ))}
              </div>
            </div>

            {/* Interactive Demos */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-8 space-y-6">
              {chapter === 0 && <Chapter1Demo />}
              {chapter === 1 && (
                <Chapter2Demo
                  isDelivering={isDelivering}
                  deliveryTime={deliveryTime}
                  onDeliver={simulatePropDrilling}
                />
              )}
              {chapter === 2 && <Chapter3Demo />}
              {chapter === 3 && (
                <Chapter4Demo demoMode={demoMode} setDemoMode={setDemoMode} />
              )}
              {chapter === 4 && <Chapter5Demo />}
            </section>
          </main>

          {/* Sidebar - Progress & Navigation */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 lg:sticky lg:top-24">
              {/* Progress */}
              <div className="space-y-4 mb-6">
                <h3 className="text-lg font-semibold text-sky-300 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Your Journey
                </h3>
                <div className="space-y-2">
                  {chapters.map((ch, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                        idx === chapter
                          ? "bg-sky-900/30 border border-sky-700/50"
                          : idx < chapter
                          ? "bg-slate-800/30 opacity-60"
                          : "opacity-40"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          idx === chapter
                            ? "bg-sky-400"
                            : idx < chapter
                            ? "bg-green-500"
                            : "bg-slate-600"
                        }`}
                      />
                      <span className="text-sm font-medium">{ch.title}</span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 mt-4">
                  <div
                    className="bg-gradient-to-r from-sky-500 to-sky-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-400 text-center">
                  {Math.round(((chapter + 1) / chapters.length) * 100)}% Complete
                </p>
              </div>

              {/* Navigation */}
              <div className="space-y-3">
                <button
                  onClick={() => setChapter(Math.max(0, chapter - 1))}
                  disabled={chapter === 0}
                  className="w-full px-4 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  ← Previous
                </button>
                <button
                  onClick={() =>
                    setChapter(Math.min(chapters.length - 1, chapter + 1))
                  }
                  disabled={chapter === chapters.length - 1}
                  className="w-full px-4 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-medium"
                >
                  Next →
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Chapter 1 Demo: Context Provider Visualization
function Chapter1Demo() {
  const [contextValue] = useState({ theme: "Jedi Temple", targetingData: "Gamma-7 Coordinates" });

  const codeExample = `// The Force (Context) wraps everything
import { createContext, useContext } from 'react';

const ForceContext = createContext(null);

function JediTemple() {
  const forceData = { 
    theme: "Jedi Temple",
    targetingData: "Gamma-7 Coordinates"
  };

  return (
    <ForceContext.Provider value={forceData}>
      <GrandHall />
    </ForceContext.Provider>
  );
}`;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-sky-300 flex items-center gap-2">
        <Sparkles className="w-5 h-5" />
        The Force Field Visualization
      </h3>

      {/* Visual Demo */}
      <div className="bg-slate-950/50 border-2 border-sky-500/30 rounded-xl p-6">
        <ThemeContext.Provider value={contextValue}>
          <div className="space-y-4">
            <div className="text-center p-4 bg-sky-900/20 rounded-lg border border-sky-700/50">
              <p className="text-sm text-sky-300 font-mono">
                ForceContext.Provider
              </p>
              <p className="text-xs text-slate-400 mt-1">
                value = {`{ theme: "${contextValue.theme}", targetingData: "${contextValue.targetingData}" }`}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ContextConsumer name="Grand Hall" />
              <ContextConsumer name="Archives" />
              <ContextConsumer name="Training Room" />
            </div>

            <p className="text-sm text-slate-400 text-center italic">
              ✨ All components can "feel" the Force without explicit passing
            </p>
          </div>
        </ThemeContext.Provider>
      </div>

      <CodeBlock
        code={codeExample}
        variant="success"
        title="// ✅ Creating Context"
        defaultExpanded={true}
      />
    </div>
  );
}

function ContextConsumer({ name }: { name: string }) {
  const context = useContext(ThemeContext);
  return (
    <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 text-center">
      <p className="text-sm font-medium text-slate-200 mb-2">{name}</p>
      <p className="text-xs text-sky-400 font-mono">useContext (ForceContext) </p>
      <p className="text-xs text-slate-500 mt-2">✓ Can access theme & data</p>
    </div>
  );
}

// Chapter 2 Demo: Prop Drilling Visualization
function Chapter2Demo({
  isDelivering,
  deliveryTime,
  onDeliver,
}: {
  isDelivering: boolean;
  deliveryTime: number;
  onDeliver: () => void;
}) {
  const propDrillingCode = `// The Path of the Messenger (Prop Drilling)
function Archives() {
  const targetingData = "Gamma-7 Update";
  return <CentralSpire data={targetingData} />;
}

function CentralSpire({ data }) {
  // Master Zenn doesn't need this data
  return <HangarBay data={data} />;
}

function HangarBay({ data }) {
  // Knight Jorli doesn't need this data
  return <TrainingRoom data={data} />;
}

function TrainingRoom({ data }) {
  // Finally! The droid operator needs it
  return <div>{data}</div>;
}`;

  const step = Math.min(Math.floor(deliveryTime / 500), 4);
  const levels = ["Archives", "Master Zenn", "Knight Jorli", "Droid Bay"];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-amber-400 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        The Path of the Messenger
      </h3>

      <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex flex-col gap-3">
          {levels.map((level, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-lg border-2 transition-all ${
                step > idx
                  ? "bg-amber-900/30 border-amber-600/50"
                  : step === idx
                  ? "bg-amber-900/50 border-amber-500 scale-105"
                  : "bg-slate-800/30 border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{level}</span>
                {step > idx && <CheckCircle className="w-5 h-5 text-green-500" />}
                {step === idx && (
                  <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              {idx < levels.length - 1 && step >= idx && (
                <p className="text-xs text-slate-500 mt-2">
                  → Passing data crystal down...
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-900 rounded-lg">
          <div className="space-y-1">
            <p className="text-sm font-mono text-slate-300">
              Time: <span className="text-amber-400">{deliveryTime}ms</span>
            </p>
            <p className="text-sm font-mono text-slate-300">
              Handoffs: <span className="text-amber-400">{step}</span> / {levels.length}
            </p>
          </div>
          <button
            onClick={onDeliver}
            disabled={isDelivering}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isDelivering ? "Delivering..." : "🏃 Deliver Message"}
          </button>
        </div>
      </div>

      <CodeBlock
        code={propDrillingCode}
        variant="error"
        title="// ❌ Prop Drilling - The Inefficient Way"
        defaultExpanded={true}
      />
    </div>
  );
}

// Chapter 3 Demo: useContext Solution
function Chapter3Demo() {
  const propDrillingCode = `// The Old Way: Manual passing through each level
function Archives() {
  const data = "Gamma-7 Update";
  return <CentralSpire data={data} />;
}

function CentralSpire({ data }) {
  return <HangarBay data={data} />; // Just passing through
}

function HangarBay({ data }) {
  return <TrainingRoom data={data} />; // Just passing through
}

function TrainingRoom({ data }) {
  return <div>{data}</div>; // Finally use it!
}`;

  const useContextCode = `// The Force Way: Direct access with useContext
import { createContext, useContext } from 'react';

const ForceContext = createContext(null);

function Archives() {
  const data = "Gamma-7 Update";
  return (
    <ForceContext.Provider value={data}>
      <CentralSpire />
    </ForceContext.Provider>
  );
}

function CentralSpire() {
  return <HangarBay />; // No props needed!
}

function HangarBay() {
  return <TrainingRoom />; // No props needed!
}

function TrainingRoom() {
  const data = useContext(ForceContext); // Direct access!
  return <div>{data}</div>;
}`;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-sky-300 flex items-center gap-2">
        <Sparkles className="w-5 h-5" />
        Reaching Out with useContext
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CodeBlock
          code={propDrillingCode}
          variant="error"
          title="// ❌ The Chain: Prop Drilling"
          defaultExpanded={false}
        />

        <CodeBlock
          code={useContextCode}
          variant="success"
          title="// ✅ The Connection: useContext"
          defaultExpanded={true}
        />
      </div>

      <div className="bg-sky-900/20 border border-sky-700/50 rounded-lg p-6">
        <p className="text-sm text-sky-300 italic text-center">
          💡 <strong>Key Insight:</strong> useContext lets you "reach out" and access
          data from anywhere in the component tree without manual passing.
        </p>
      </div>
    </div>
  );
}

// Chapter 4 Demo: Side-by-side comparison
function Chapter4Demo({
  demoMode,
  setDemoMode,
}: {
  demoMode: "drilling" | "context";
  setDemoMode: (mode: "drilling" | "context") => void;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-sky-300 flex items-center gap-2">
        <Sparkles className="w-5 h-5" />
        The Chain vs. The Connection
      </h3>

      <div className="flex items-center justify-center gap-4 p-4 bg-slate-900 rounded-lg">
        <button
          onClick={() => setDemoMode("drilling")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            demoMode === "drilling"
              ? "bg-amber-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          ❌ The Chain
        </button>
        <button
          onClick={() => setDemoMode("context")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            demoMode === "context"
              ? "bg-sky-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          ✅ The Connection
        </button>
      </div>

      <div className="bg-slate-950/50 border-2 border-slate-800 rounded-xl p-6">
        {demoMode === "drilling" ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-400 mb-4">
              <XCircle className="w-6 h-6" />
              <h4 className="text-lg font-semibold">Prop Drilling (The Chain)</h4>
            </div>
            <div className="space-y-3">
              {["Archives (source)", "→ Master Zenn", "→ Knight Jorli", "→ Droid Bay (destination)"].map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-amber-900/20 border border-amber-700/50 rounded-lg"
                >
                  <p className="text-sm font-mono">{step}</p>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-700 space-y-2 text-sm">
              <p className="text-slate-400">
                <strong className="text-amber-400">Fragile:</strong> Each link can break
              </p>
              <p className="text-slate-400">
                <strong className="text-amber-400">Bottlenecks:</strong> Components in
                the middle must wait
              </p>
              <p className="text-slate-400">
                <strong className="text-amber-400">Overhead:</strong> Unnecessary props
                everywhere
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sky-400 mb-4">
              <CheckCircle className="w-6 h-6" />
              <h4 className="text-lg font-semibold">useContext (The Connection)</h4>
            </div>
            <div className="relative">
              <div className="p-4 bg-sky-900/20 border-2 border-sky-700/50 rounded-lg mb-4">
                <p className="text-sm font-mono text-center">Archives (Provider)</p>
              </div>
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg">
                  <p className="text-xs text-slate-400">Master Zenn</p>
                  <p className="text-xs text-slate-600 mt-1">No props needed</p>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-700 rounded-lg">
                  <p className="text-xs text-slate-400">Knight Jorli</p>
                  <p className="text-xs text-slate-600 mt-1">No props needed</p>
                </div>
                <div className="p-3 bg-sky-900/30 border-2 border-sky-700/50 rounded-lg">
                  <p className="text-xs text-sky-300 font-medium">Droid Bay</p>
                  <p className="text-xs text-sky-500 mt-1">useContext() ✓</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-700 space-y-2 text-sm">
              <p className="text-slate-400">
                <strong className="text-sky-400">Resilient:</strong> Direct connection
              </p>
              <p className="text-slate-400">
                <strong className="text-sky-400">Efficient:</strong> Only consumers
                involved
              </p>
              <p className="text-slate-400">
                <strong className="text-sky-400">Clean:</strong> No intermediate props
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Chapter 5 Demo: When NOT to use Context
function Chapter5Demo() {
  const [approach, setApproach] = useState<"wrong" | "right">("wrong");

  const wrongCode = `// ❌ Using Context for local state (overuse)
const SpoonContext = createContext(null);

function Refectory() {
  const [spoon, setSpoon] = useState("serving spoon");
  
  return (
    <SpoonContext.Provider value={spoon}>
      <Table />
    </SpoonContext.Provider>
  );
}

function Table() {
  return <Tray />; // Just passing structure
}

function Tray() {
  const spoon = useContext(SpoonContext); // Overkill!
  return <div>{spoon}</div>;
}`;

  const rightCode = `// ✅ Using local state for local concerns
function Tray() {
  // Local state for local needs
  const [spoon, setSpoon] = useState("serving spoon");
  
  return (
    <div>
      <p>{spoon}</p>
      <button onClick={() => setSpoon("dinner spoon")}>
        Change Spoon
      </button>
    </div>
  );
}

// Context is reserved for truly global state:
// - User authentication
// - Theme preferences
// - Language settings
// - App-wide configuration`;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-amber-400 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        The Dark Side of Dependence
      </h3>

      <div className="flex items-center justify-center gap-4 p-4 bg-slate-900 rounded-lg">
        <button
          onClick={() => setApproach("wrong")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            approach === "wrong"
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          ❌ Overuse
        </button>
        <button
          onClick={() => setApproach("right")}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            approach === "right"
              ? "bg-green-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          ✅ Appropriate Use
        </button>
      </div>

      {approach === "wrong" ? (
        <CodeBlock
          code={wrongCode}
          variant="error"
          title="// ❌ Context Overuse - The Dark Side"
          defaultExpanded={true}
        />
      ) : (
        <CodeBlock
          code={rightCode}
          variant="success"
          title="// ✅ Local State for Local Needs"
          defaultExpanded={true}
        />
      )}

      <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-6 space-y-4">
        <h4 className="font-semibold text-amber-300 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          When to Use Context
        </h4>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Truly global state:</strong> Theme, auth, language
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Deep prop drilling:</strong> 5+ levels with many intermediaries
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Shared by many:</strong> Data needed across distant components
            </span>
          </li>
        </ul>

        <h4 className="font-semibold text-amber-300 flex items-center gap-2 pt-4">
          <XCircle className="w-5 h-5" />
          When NOT to Use Context
        </h4>
        <ul className="space-y-2 text-sm text-slate-300">
          <li className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Local component state:</strong> Form inputs, toggles, counters
            </span>
          </li>
          <li className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Frequently changing data:</strong> Can cause excessive re-renders
            </span>
          </li>
          <li className="flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Just to avoid props:</strong> Props aren't bad for 1-2 levels
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}