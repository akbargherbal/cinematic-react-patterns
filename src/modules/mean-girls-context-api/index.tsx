import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  Book,
  User,
  ArrowRight,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Code2,
  Play,
  RefreshCcw,
  Sparkles,
  Info,
  XCircle,
  CheckCircle,
  Search,
  Pause,
  Eye,
  EyeOff,
} from "lucide-react";

/**
 * THE BURN BOOK: Interactive Context API Tutorial
 * Teaching React Context through Mean Girls metaphors
 * 
 * Following Best Practices for Designing Effective React Learning Modules
 */

// --- Types & Constants ---
type Chapter =
  | "intro"
  | "prop-drilling"
  | "context-solution"
  | "comparison"
  | "performance-pitfall"
  | "split-contexts"
  | "summary";

// --- Contexts (for demos) ---
const BurnBookContext = createContext<string>("");
const ThemeContext = createContext<string>("pink");
const UserContext = createContext<string>("Regina");
const NotificationsContext = createContext<number>(0);

// --- Components ---

const Header = () => (
  <header className="bg-pink-600 text-white py-6 px-8 shadow-lg relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-20 rotate-12">
      <Book size={120} />
    </div>
    <div className="relative z-10">
      <h1 className="text-4xl font-extrabold tracking-tighter uppercase italic">
        The Burn Book
      </h1>
      <p className="text-pink-100 font-medium mt-1">
        A Plastic's Guide to React Context API
      </p>
    </div>
  </header>
);

const ProgressBar = ({ current }: { current: Chapter }) => {
  const chapters: Chapter[] = [
    "intro",
    "prop-drilling",
    "context-solution",
    "comparison",
    "performance-pitfall",
    "split-contexts",
    "summary",
  ];
  const currentIndex = chapters.indexOf(current);

  return (
    <div className="mb-8">
      <div className="flex w-full h-2 bg-pink-100 rounded-full overflow-hidden">
        {chapters.map((_, i) => (
          <div
            key={i}
            className={`flex-1 transition-all duration-500 ${
              i <= currentIndex ? "bg-pink-500" : "bg-transparent"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Intro</span>
        <span>Problem</span>
        <span>Solution</span>
        <span>Compare</span>
        <span>Pitfall</span>
        <span>Fix</span>
        <span>Graduate</span>
      </div>
    </div>
  );
};

// --- Chapter: Intro ---
const Intro = ({ onNext }: { onNext: () => void }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="bg-white border-4 border-pink-400 p-8 rounded-2xl shadow-xl relative">
      <div className="absolute -top-6 -right-6 bg-yellow-400 p-4 rounded-full shadow-lg rotate-12 border-4 border-white">
        <Sparkles className="text-white" />
      </div>
      
      <h2 className="text-3xl font-black text-pink-600 mb-4">
        "Get in, loser. We're learning Context."
      </h2>
      
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        Passing data through nested components can be a total disaster—like
        trying to keep a secret in North Shore High. In this tutorial, we'll see
        why <strong>Prop Drilling</strong> is basically social suicide, and how
        the <strong>Context API</strong> can save your app's reputation.
      </p>

      {/* Learning Objectives */}
      <div className="bg-pink-50 border-2 border-pink-200 p-6 rounded-xl mb-6">
        <h3 className="font-bold text-pink-800 mb-3 flex items-center gap-2">
          <CheckCircle2 className="text-pink-600" size={20} />
          By the end of this module, you'll:
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-pink-500 mt-1">✓</span>
            <span>Recognize when prop drilling becomes a problem</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-500 mt-1">✓</span>
            <span>Implement Context API for global state</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-500 mt-1">✓</span>
            <span>Avoid common Context performance pitfalls</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-pink-500 mt-1">✓</span>
            <span>Know when NOT to use Context</span>
          </li>
        </ul>
      </div>

      {/* Zen Callout */}
      <div className="bg-purple-50 border-2 border-purple-300 p-6 rounded-xl mb-6">
        <h4 className="font-bold text-purple-800 mb-3">💎 Zen of React</h4>
        <div className="space-y-2 text-purple-700 text-sm">
          <p><em>"Props down, events up."</em></p>
          <p><em>"Lift state up when sharing; keep it local when not."</em></p>
        </div>
        <p className="text-purple-600 text-xs mt-3">
          Context is about lifting state to a higher level so descendants can access it—without drilling through every layer.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: <User />,
            title: "Prop Drilling",
            desc: "The Gretchen Problem",
          },
          {
            icon: <Book />,
            title: "Context API",
            desc: "The Burn Book Strategy",
          },
          { icon: <Zap />, title: "Performance", desc: "Avoiding the Riot" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-pink-50 p-4 rounded-xl border border-pink-200"
          >
            <div className="text-pink-500 mb-2">{item.icon}</div>
            <h4 className="font-bold text-gray-800">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        Start the Drama <ArrowRight size={20} />
      </button>
    </div>
  </div>
);

// --- Chapter 1: Prop Drilling ---
const PropDrillingDemo = ({ onNext }: { onNext: () => void }) => {
  const [secret, setSecret] = useState("Cady is a grool friend.");
  const [renderCount, setRenderCount] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecret(e.target.value);
    setRenderCount((c) => c + 1);
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* Problem Statement with Red Border */}
      <div className="border-4 border-red-500 bg-red-50/20 p-6 rounded-2xl shadow-lg">
        <div className="bg-red-500 text-white px-4 py-2 rounded-full mb-4 inline-flex items-center gap-2">
          <XCircle size={18} />
          <span className="font-bold">❌ Common Mistake: Prop Drilling</span>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Info className="text-red-500" size={24} />
          The Gretchen Weiners Problem
        </h3>
        
        <p className="text-gray-600 mb-6">
          Regina has a secret. She needs to tell Karen, but Karen only listens
          to Gretchen. Gretchen doesn't care about the secret, but she{" "}
          <strong>has</strong> to pass it through her props. Every time Regina
          breathes, Gretchen re-renders.
        </p>

        {/* Visual Demo (2 interactive elements: input + visual tree) */}
        <div className="flex flex-col items-center gap-8 py-10 bg-white rounded-2xl border-2 border-dashed border-red-300 relative">
          <div className="flex flex-col items-center gap-4 relative z-10">
            {/* Regina (Parent) */}
            <div className="bg-red-600 text-white p-4 rounded-xl shadow-lg w-56 text-center">
              <div className="text-xs uppercase opacity-80 mb-1">
                Regina (Parent)
              </div>
              <div className="font-bold mb-2">Holds State</div>
              <input
                type="text"
                value={secret}
                onChange={handleUpdate}
                className="mt-2 text-red-900 px-3 py-2 rounded w-full text-sm outline-none focus:ring-2 ring-yellow-400"
                placeholder="Type a secret..."
              />
            </div>

            <div className="h-8 w-1 bg-red-400" />

            {/* Gretchen (Middle - Unnecessary Re-render) */}
            <div className="bg-white border-4 border-red-400 p-4 rounded-xl shadow-md w-56 text-center relative">
              <div className="absolute -top-3 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                Re-renders: {renderCount}
              </div>
              <div className="text-xs uppercase text-red-500 mb-1 font-bold">
                Gretchen (Middle)
              </div>
              <div className="font-bold text-gray-700 italic">
                "Just passing props..."
              </div>
              <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                Doesn't even use 'secret'! 😤
              </div>
            </div>

            <div className="h-8 w-1 bg-red-400" />

            {/* Karen (Target) */}
            <div className="bg-blue-500 text-white p-4 rounded-xl shadow-lg w-56 text-center">
              <div className="text-xs uppercase opacity-80 mb-1">
                Karen (Target)
              </div>
              <div className="font-bold mb-2">Uses Secret</div>
              <div className="mt-2 text-xs italic bg-blue-600 px-3 py-2 rounded break-words">
                "{secret}"
              </div>
            </div>
          </div>

          {/* Problem Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full border border-yellow-200">
              Poor Performance
            </span>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full border border-red-200">
              High Coupling
            </span>
          </div>
        </div>

        {/* Why This Is Wrong */}
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded mt-6">
          <h5 className="font-bold text-red-800 mb-2">Why This Is Wrong:</h5>
          <ul className="text-red-700 text-sm space-y-1">
            <li>• Gretchen re-renders unnecessarily (she doesn't use the secret)</li>
            <li>• High coupling: Regina → Gretchen → Karen all tightly dependent</li>
            <li>• Maintenance nightmare: adding props requires changing every layer</li>
          </ul>
        </div>
      </div>

      {/* Code Example - Collapsible */}
      <div className="bg-gray-900 text-pink-100 p-6 rounded-2xl font-mono text-sm shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-red-400 font-bold flex items-center gap-2">
            <Code2 size={20} />
            // ❌ Prop Drilling Boilerplate
          </h4>
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-pink-300 hover:text-pink-100 flex items-center gap-2 text-xs"
          >
            {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>

        {showCode && (
          <pre className="overflow-x-auto text-xs leading-relaxed">
            {`// ❌ Prop Drilling Pattern

// Step 1: Parent creates state
function Regina() {
  const [secret, setSecret] = useState("...");
  return <Gretchen secret={secret} />; // Step 2: Pass to child
}

// Step 3: Middle component (doesn't use it!)
function Gretchen({ secret }) {
  // ❌ Why am I here? Just passing through...
  // ❌ But I re-render EVERY time 'secret' changes!
  return <Karen secret={secret} />; // Step 4: Pass again
}

// Step 5: Finally used here
function Karen({ secret }) {
  return <div>{secret}</div>;
}`}
          </pre>
        )}
      </div>

      {/* Learning Checkpoint */}
      <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-xl">
        <p className="text-yellow-800">
          <strong>⚠️ You now recognize:</strong> Prop drilling creates unnecessary 
          re-renders and tight coupling between components. Gretchen suffers for no reason!
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        That's So Fetch. What's the Fix? <ArrowRight size={20} />
      </button>
    </div>
  );
};

// --- Chapter 2: Context Solution ---
const ContextDemo = ({ onNext }: { onNext: () => void }) => {
  const [secret, setSecret] = useState("She's fabulous, but she's evil.");
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* Solution Statement with Green Border */}
      <div className="border-4 border-green-500 bg-green-50/20 p-6 rounded-2xl shadow-lg">
        <div className="bg-green-500 text-white px-4 py-2 rounded-full mb-4 inline-flex items-center gap-2">
          <CheckCircle size={18} />
          <span className="font-bold">✅ Correct Approach: Context API</span>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Book className="text-green-500" size={24} />
          The Burn Book Strategy
        </h3>
        
        <p className="text-gray-600 mb-6">
          Instead of passing secrets hand-to-hand, we put them in the{" "}
          <strong>Burn Book (Context)</strong>. Now, anyone who wants to know
          the drama can just look it up directly. Gretchen is free to do
          whatever she wants without re-rendering every time the secret changes.
        </p>

        {/* Visual Demo */}
        <div className="flex flex-col items-center gap-8 py-10 bg-white rounded-2xl border-2 border-dashed border-green-300 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex flex-wrap gap-4 p-4">
            {Array(20)
              .fill(0)
              .map((_, i) => (
                <Book key={i} size={24} />
              ))}
          </div>

          <div className="flex justify-between items-center w-full max-w-2xl px-8 relative z-10">
            {/* Regina (Provider) */}
            <div className="bg-green-600 text-white p-4 rounded-xl shadow-lg w-44 text-center">
              <div className="text-xs uppercase opacity-80 mb-1">Regina</div>
              <div className="font-bold mb-2">Provider</div>
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="mt-2 text-green-900 px-2 py-1 rounded w-full text-xs outline-none"
                placeholder="Secret..."
              />
            </div>

            {/* The Burn Book (Context) */}
            <div className="flex flex-col items-center justify-center">
              <div className="bg-pink-100 p-4 rounded-full border-4 border-white shadow-xl animate-bounce">
                <Book className="text-pink-600" size={40} />
              </div>
              <div className="text-pink-600 font-black text-xs mt-2 uppercase">
                The Burn Book
              </div>
              <div className="text-gray-500 text-xs italic">
                (Context)
              </div>
            </div>

            {/* Karen (Consumer) */}
            <div className="bg-blue-500 text-white p-4 rounded-xl shadow-lg w-44 text-center">
              <div className="text-xs uppercase opacity-80 mb-1">Karen</div>
              <div className="font-bold mb-2">Consumer</div>
              <div className="mt-2 text-xs italic bg-blue-600 px-2 py-1 rounded break-words">
                "{secret}"
              </div>
            </div>
          </div>

          {/* Gretchen - Separate and Happy */}
          <div className="bg-white border-2 border-green-400 p-4 rounded-xl shadow-md w-44 text-center mt-4">
            <div className="text-xs uppercase text-green-500 mb-1 font-bold">
              Gretchen
            </div>
            <div className="font-bold text-gray-700 italic">
              "I'm totally chill! 😌"
            </div>
            <div className="mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">
              Renders: 1 (only once!)
            </div>
          </div>

          {/* Success Tags */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">
              Decoupled
            </span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200">
              Better Perf
            </span>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-gray-900 text-green-100 p-6 rounded-2xl font-mono text-sm shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-green-400 font-bold flex items-center gap-2">
            <Code2 size={20} />
            // ✅ The Context API Pattern
          </h4>
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-green-300 hover:text-green-100 flex items-center gap-2 text-xs"
          >
            {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>

        {showCode && (
          <pre className="overflow-x-auto text-xs leading-relaxed">
            {`// ✅ Context API Pattern

// Step 1: Create the Context (The Burn Book)
const BurnBookContext = createContext();

// Step 2: Wrap tree with Provider
function App() {
  const [secret, setSecret] = useState("...");
  
  return (
    <BurnBookContext.Provider value={secret}>
      <School /> {/* ✅ Any descendant can access */}
    </BurnBookContext.Provider>
  );
}

// Step 3: Consume directly (no props!)
function Karen() {
  const secret = useContext(BurnBookContext);
  // ✅ Gets 'secret' directly from Context
  return <div>{secret}</div>;
}

// ✅ Gretchen doesn't need to know about 'secret'
function Gretchen() {
  // ✅ No props! No re-renders when 'secret' changes!
  return <div>I'm just doing my thing!</div>;
}`}
          </pre>
        )}
      </div>

      {/* Zen Integration */}
      <div className="bg-purple-50 border-2 border-purple-400 p-6 rounded-xl">
        <h5 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
          <Sparkles className="text-purple-600" size={18} />
          💎 Zen of React
        </h5>
        <p className="text-purple-700 text-sm mb-2">
          <em>"Lift state up when sharing; keep it local when not."</em>
        </p>
        <p className="text-purple-600 text-xs">
          Context lifts state to the <strong>Provider</strong> level, making it available 
          to all descendants without prop drilling. This is "lifting up" taken to the max!
        </p>
      </div>

      {/* Learning Checkpoint */}
      <div className="bg-green-50 border-2 border-green-400 p-4 rounded-xl">
        <p className="text-green-800">
          <strong>✓ You now understand:</strong> Context API decouples components and 
          prevents unnecessary re-renders in middle layers. Gretchen is free!
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        Show Me the Difference <ArrowRight size={20} />
      </button>
    </div>
  );
};

// --- Chapter 3: Comparison View ---
const ComparisonView = ({ onNext }: { onNext: () => void }) => {
  const [mode, setMode] = useState<"both" | "drilling" | "context">("both");
  const [secret, setSecret] = useState("Regina is the queen bee");
  const [drillingRenders, setDrillingRenders] = useState(0);
  const [contextRenders, setContextRenders] = useState(0);

  const handleSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecret(e.target.value);
    setDrillingRenders((c) => c + 1);
    setContextRenders((c) => c + 1);
  };

  const ComponentBox = ({
    name,
    renders,
    color,
    highlighted = false,
  }: {
    name: string;
    renders: number;
    color: "red" | "green";
    highlighted?: boolean;
  }) => (
    <div
      className={`p-4 rounded-lg border-2 ${
        color === "red"
          ? highlighted
            ? "bg-red-100 border-red-400"
            : "bg-white border-red-200"
          : highlighted
          ? "bg-green-100 border-green-400"
          : "bg-white border-green-200"
      } text-center transition-all duration-300`}
    >
      <div className="font-bold text-gray-800 text-sm mb-1">{name}</div>
      <div
        className={`text-xs ${
          color === "red" ? "text-red-600" : "text-green-600"
        }`}
      >
        Renders: {renders}
      </div>
      {highlighted && (
        <div className="text-xs mt-1 font-bold text-yellow-700">
          ⚠️ Unnecessary!
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Eye className="text-purple-500" size={24} />
          Side-by-Side Comparison
        </h3>
        <p className="text-gray-600 mb-6">
          Let's see both approaches in action. Type in the input below and watch 
          how each pattern handles re-renders. Notice Gretchen's suffering in prop 
          drilling vs. her peace with Context!
        </p>

        {/* Toggle Controls */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          <button
            onClick={() => setMode("drilling")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              mode === "drilling"
                ? "bg-red-500 text-white shadow-lg scale-105"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            ❌ Show Only Prop Drilling
          </button>
          <button
            onClick={() => setMode("context")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              mode === "context"
                ? "bg-green-500 text-white shadow-lg scale-105"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            ✅ Show Only Context
          </button>
          <button
            onClick={() => setMode("both")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
              mode === "both"
                ? "bg-purple-500 text-white shadow-lg scale-105"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            🔄 Compare Both
          </button>
        </div>

        {/* Side-by-Side Comparison */}
        <div
          className={
            mode === "both" ? "grid md:grid-cols-2 gap-6 mb-6" : "mb-6"
          }
        >
          {/* Prop Drilling Demo */}
          {(mode === "drilling" || mode === "both") && (
            <div className="border-4 border-red-500 bg-red-50/10 p-6 rounded-xl">
              <h4 className="text-red-600 font-bold mb-4 flex items-center gap-2">
                <XCircle size={18} />
                ❌ Prop Drilling
              </h4>
              <div className="space-y-3">
                <ComponentBox
                  name="Regina (Parent)"
                  renders={drillingRenders}
                  color="red"
                />
                <div className="h-4 w-1 bg-red-400 mx-auto" />
                <ComponentBox
                  name="Gretchen (Middle)"
                  renders={drillingRenders}
                  color="red"
                  highlighted
                />
                <div className="h-4 w-1 bg-red-400 mx-auto" />
                <ComponentBox
                  name="Karen (Target)"
                  renders={drillingRenders}
                  color="red"
                />
              </div>
              <div className="mt-4 bg-red-100 p-3 rounded-lg text-center">
                <div className="text-xs text-red-600 font-bold uppercase mb-1">
                  Total Re-renders
                </div>
                <div className="text-2xl font-black text-red-700">
                  {drillingRenders * 3}
                </div>
                <div className="text-xs text-red-600 mt-1">
                  👎 Gretchen suffers: {drillingRenders} times
                </div>
              </div>
            </div>
          )}

          {/* Context Demo */}
          {(mode === "context" || mode === "both") && (
            <div className="border-4 border-green-500 bg-green-50/10 p-6 rounded-xl">
              <h4 className="text-green-600 font-bold mb-4 flex items-center gap-2">
                <CheckCircle size={18} />
                ✅ Context API
              </h4>
              <div className="space-y-3">
                <ComponentBox
                  name="Regina (Provider)"
                  renders={contextRenders}
                  color="green"
                />
                <div className="flex items-center justify-center gap-4">
                  <div className="h-1 w-12 bg-green-400" />
                  <Book className="text-pink-500" size={24} />
                  <div className="h-1 w-12 bg-green-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <ComponentBox
                    name="Gretchen"
                    renders={1}
                    color="green"
                    highlighted
                  />
                  <ComponentBox
                    name="Karen (Consumer)"
                    renders={contextRenders}
                    color="green"
                  />
                </div>
              </div>
              <div className="mt-4 bg-green-100 p-3 rounded-lg text-center">
                <div className="text-xs text-green-600 font-bold uppercase mb-1">
                  Total Re-renders
                </div>
                <div className="text-2xl font-black text-green-700">
                  {contextRenders * 2 + 1}
                </div>
                <div className="text-xs text-green-600 mt-1">
                  👍 Gretchen is chill: Only 1 render!
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Shared Input */}
        <div className="bg-white p-6 rounded-xl border-2 border-gray-300 shadow-inner">
          <label className="font-bold mb-2 block text-gray-700">
            Type a new secret:
          </label>
          <input
            value={secret}
            onChange={handleSecretChange}
            className="w-full border-2 border-gray-300 focus:border-pink-400 p-3 rounded-lg outline-none transition-colors"
            placeholder="Start typing to see re-renders..."
          />
          <div className="mt-2 text-xs text-gray-500 text-center">
            👆 Type here and watch both patterns react
          </div>
        </div>

        {/* Metrics Comparison */}
        {mode === "both" && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl">
              <h5 className="font-bold text-red-800 text-sm mb-2">
                ❌ Prop Drilling Performance
              </h5>
              <div className="flex items-center justify-between">
                <span className="text-xs text-red-600">Wasted Re-renders:</span>
                <span className="text-xl font-black text-red-700">
                  {drillingRenders}
                </span>
              </div>
              <div className="text-xs text-red-600 mt-1">
                (Gretchen's unnecessary suffering)
              </div>
            </div>
            <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
              <h5 className="font-bold text-green-800 text-sm mb-2">
                ✅ Context Performance
              </h5>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600">Wasted Re-renders:</span>
                <span className="text-xl font-black text-green-700">0</span>
              </div>
              <div className="text-xs text-green-600 mt-1">
                (Gretchen stays at 1 render!)
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Learning Checkpoint */}
      <div className="bg-blue-50 border-2 border-blue-400 p-4 rounded-xl">
        <p className="text-blue-800">
          <strong>✓ You can now:</strong> Compare prop drilling vs Context side-by-side 
          and see the performance difference in real-time. The numbers don't lie!
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        Wait, what's the catch? <ArrowRight size={20} />
      </button>
    </div>
  );
};

// --- Chapter 4: Performance Pitfall ---
const PerformancePitfall = ({ onNext }: { onNext: () => void }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [tick, setTick] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTick((t) => t + 1);
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const reset = () => {
    setIsRunning(false);
    setTick(0);
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* Problem Statement with Red Border */}
      <div className="border-4 border-red-500 bg-red-50/20 p-6 rounded-2xl shadow-lg relative overflow-hidden">
        {isRunning && (
          <div className="absolute inset-0 bg-red-500 opacity-5 pointer-events-none animate-pulse" />
        )}

        <div className="bg-red-500 text-white px-4 py-2 rounded-full mb-4 inline-flex items-center gap-2">
          <XCircle size={18} />
          <span className="font-bold">❌ Common Mistake: Monolithic Context</span>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={24} />
          The Riot: God Context Problem
        </h3>
        
        <p className="text-gray-600 mb-6">
          Putting <strong>everything</strong> in one giant Context is like
          Regina releasing all the pages of the Burn Book at once. When{" "}
          <strong>any tiny piece</strong> of data changes,{" "}
          <strong>every single consumer</strong> has to re-render. Total chaos!
        </p>

        {/* Visual Demo - Grid of Components */}
        <div className="mb-6">
          <div className="grid grid-cols-6 md:grid-cols-8 gap-2 mb-4">
            {Array(24)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={`h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-100 ${
                    isRunning
                      ? "bg-red-500 border-red-600 scale-105 shadow-md animate-pulse"
                      : "bg-gray-100 border-gray-200"
                  }`}
                >
                  <User
                    size={20}
                    className={isRunning ? "text-white" : "text-gray-300"}
                  />
                </div>
              ))}
          </div>

          {/* Controls */}
          <div className="bg-red-50 p-4 rounded-xl border border-red-200">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-red-800 font-bold uppercase text-xs tracking-wider">
                  Affected Components
                </div>
                <div className="text-3xl font-black text-red-600">
                  {isRunning ? "24 / 24" : "0 / 24"}
                </div>
                <div className="text-xs text-red-600 mt-1">
                  System lag: {isRunning ? (tick * 1.5).toFixed(1) : "0.0"} ms
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`p-4 rounded-full shadow-lg transition-transform active:scale-90 ${
                    isRunning
                      ? "bg-red-600 text-white"
                      : "bg-green-500 text-white"
                  }`}
                  title={isRunning ? "Pause" : "Start"}
                >
                  {isRunning ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <button
                  onClick={reset}
                  className="p-4 rounded-full shadow-lg transition-transform active:scale-90 bg-gray-600 text-white"
                  title="Reset"
                >
                  <RefreshCcw size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Why This Is Wrong */}
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded mb-6">
          <h5 className="font-bold text-red-800 mb-2">Why This Causes Riots:</h5>
          <ul className="text-red-700 text-sm space-y-1">
            <li>• Every consumer re-renders on <strong>ANY</strong> context value change</li>
            <li>• React can't optimize—context values are compared by reference</li>
            <li>• Components that only need 'theme' get updates from 'notifications'</li>
            <li>• Performance degrades as your app grows</li>
          </ul>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-gray-900 text-red-100 p-6 rounded-2xl font-mono text-sm shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-red-400 font-bold flex items-center gap-2">
            <Code2 size={20} />
            // ❌ Monolithic Context (Everything in One)
          </h4>
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-red-300 hover:text-red-100 flex items-center gap-2 text-xs"
          >
            {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>

        {showCode && (
          <pre className="overflow-x-auto text-xs leading-relaxed">
            {`// ❌ God Context Anti-Pattern

const AppContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({});
  const [cart, setCart] = useState([]);
  // ... 20 more pieces of state

  return (
    <AppContext.Provider value={{
      user, setUser,
      theme, setTheme,
      notifications, setNotifications,
      settings, setSettings,
      cart, setCart,
      // ... everything!
    }}>
      <App />
    </AppContext.Provider>
  );
}

// ❌ Component only needs 'theme' but gets ALL updates
function Navbar() {
  const { theme } = useContext(AppContext);
  
  // 💥 Re-renders when notifications change!
  // 💥 Re-renders when user data changes!
  // 💥 Re-renders when cart changes!
  // 💥 Re-renders when settings change!
  
  return <nav className={theme}>...</nav>;
}`}
          </pre>
        )}
      </div>

      {/* Learning Checkpoint */}
      <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-xl">
        <p className="text-yellow-800">
          <strong>⚠️ You now recognize:</strong> Monolithic contexts cause unnecessary 
          re-renders across unrelated components. When everything is in one Context, 
          changing anything affects everyone!
        </p>
      </div>

      {/* Preview the Solution */}
      <div className="bg-blue-50 border-2 border-blue-400 p-4 rounded-xl">
        <p className="text-blue-800 font-bold flex items-center gap-2">
          <Info className="text-blue-600" size={18} />
          💡 Next: How to fix this by splitting contexts logically
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        Show Me How to Fix This <ArrowRight size={20} />
      </button>
    </div>
  );
};

// --- Chapter 5: Split Contexts Solution ---
const SplitContexts = ({ onNext }: { onNext: () => void }) => {
  const [activeUpdate, setActiveUpdate] = useState<"theme" | "user" | "notifications" | null>(null);
  const [showCode, setShowCode] = useState(false);

  const triggerUpdate = (type: "theme" | "user" | "notifications") => {
    setActiveUpdate(type);
    setTimeout(() => setActiveUpdate(null), 1000);
  };

  const ComponentGroup = ({
    name,
    count,
    active,
    color,
  }: {
    name: string;
    count: number;
    active: boolean;
    color: string;
  }) => (
    <div className="text-center">
      <div className="text-sm font-bold text-gray-700 mb-2">{name}</div>
      <div className="grid grid-cols-4 gap-1">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`h-8 w-8 flex items-center justify-center rounded border-2 transition-all duration-300 ${
                active
                  ? `bg-${color}-500 border-${color}-600 scale-110 shadow-md`
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <User size={14} className={active ? "text-white" : "text-gray-300"} />
            </div>
          ))}
      </div>
      <div className={`text-xs mt-2 font-bold ${active ? `text-${color}-600` : "text-gray-400"}`}>
        {active ? "Re-rendering!" : "Idle"}
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      {/* Solution Statement with Green Border */}
      <div className="border-4 border-green-500 bg-green-50/20 p-6 rounded-2xl shadow-lg">
        <div className="bg-green-500 text-white px-4 py-2 rounded-full mb-4 inline-flex items-center gap-2">
          <CheckCircle size={18} />
          <span className="font-bold">✅ Correct Approach: Split Contexts</span>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Zap className="text-green-500" size={24} />
          The Solution: Divide and Conquer
        </h3>
        
        <p className="text-gray-600 mb-6">
          Instead of one giant Burn Book, create <strong>multiple themed notebooks</strong>:
          one for theme/UI, one for user/auth, one for notifications. Now when theme
          changes, only components that care about theme re-render. Performance crisis averted!
        </p>

        {/* Interactive Demo */}
        <div className="bg-white p-6 rounded-xl border-2 border-green-200 mb-6">
          <h4 className="font-bold text-gray-800 mb-4 text-center">
            Interactive Demo: Trigger Updates
          </h4>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => triggerUpdate("theme")}
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-bold text-sm transition-transform active:scale-95"
            >
              Update Theme
            </button>
            <button
              onClick={() => triggerUpdate("user")}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold text-sm transition-transform active:scale-95"
            >
              Update User
            </button>
            <button
              onClick={() => triggerUpdate("notifications")}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-sm transition-transform active:scale-95"
            >
              New Notification
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ComponentGroup
              name="Theme Consumers"
              count={8}
              active={activeUpdate === "theme"}
              color="purple"
            />
            <ComponentGroup
              name="User Consumers"
              count={8}
              active={activeUpdate === "user"}
              color="blue"
            />
            <ComponentGroup
              name="Notification Consumers"
              count={8}
              active={activeUpdate === "notifications"}
              color="orange"
            />
          </div>

          <p className="text-center text-sm text-gray-600 mt-4">
            👆 Notice how only <strong>relevant</strong> components re-render!
          </p>
        </div>

        {/* Performance Comparison */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 border-2 border-red-200 p-4 rounded-xl">
            <h5 className="font-bold text-red-800 text-sm mb-2">
              ❌ Monolithic Context
            </h5>
            <div className="text-3xl font-black text-red-600">24</div>
            <p className="text-xs text-red-700">
              Components re-render on <strong>any</strong> change
            </p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
            <h5 className="font-bold text-green-800 text-sm mb-2">
              ✅ Split Contexts
            </h5>
            <div className="text-3xl font-black text-green-600">8</div>
            <p className="text-xs text-green-700">
              Only <strong>relevant</strong> consumers re-render
            </p>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="bg-gray-900 text-green-100 p-6 rounded-2xl font-mono text-sm shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-green-400 font-bold flex items-center gap-2">
            <Code2 size={20} />
            // ✅ Split into Logical Contexts
          </h4>
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-green-300 hover:text-green-100 flex items-center gap-2 text-xs"
          >
            {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>

        {showCode && (
          <pre className="overflow-x-auto text-xs leading-relaxed">
            {`// ✅ Split into Logical Contexts

// Step 1: Create separate contexts for different concerns
const ThemeContext = createContext();      // UI-related
const UserContext = createContext();       // Auth-related
const NotificationsContext = createContext(); // Messages-related

// Step 2: Each provider manages its own domain
function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <UserContext.Provider value={{ user, setUser }}>
        <NotificationsContext.Provider value={{ notifications, setNotifications }}>
          <AppContent />
        </NotificationsContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

// Step 3: Components only subscribe to what they need
function Navbar() {
  const { theme } = useContext(ThemeContext);
  // ✅ ONLY re-renders when theme changes
  // ✅ Ignores user/notification updates
  return <nav className={theme}>...</nav>;
}

function UserProfile() {
  const { user } = useContext(UserContext);
  // ✅ ONLY re-renders when user changes
  return <div>{user.name}</div>;
}

function NotificationBell() {
  const { notifications } = useContext(NotificationsContext);
  // ✅ ONLY re-renders when notifications change
  return <span>{notifications.length}</span>;
}`}
          </pre>
        )}
      </div>

      {/* Zen Integration */}
      <div className="bg-purple-50 border-2 border-purple-400 p-6 rounded-xl">
        <h5 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
          <Sparkles className="text-purple-600" size={18} />
          💎 Zen of React
        </h5>
        <p className="text-purple-700 text-sm mb-2">
          <em>"Components should do one thing well."</em>
        </p>
        <p className="text-purple-600 text-xs">
          This applies to Contexts too! Each Context should manage <strong>one logical
          domain</strong> (theme, auth, notifications) rather than everything. Single
          responsibility principle at the architecture level.
        </p>
      </div>

      {/* Learning Checkpoint */}
      <div className="bg-green-50 border-2 border-green-400 p-4 rounded-xl">
        <p className="text-green-800">
          <strong>✓ You now know how to:</strong> Split contexts logically to prevent
          unnecessary re-renders and improve performance. Each Context serves one purpose!
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        I'm Basically an Expert Now <ArrowRight size={20} />
      </button>
    </div>
  );
};

// --- Chapter 6: Summary ---
const Summary = ({ onRestart }: { onRestart: () => void }) => (
  <div className="animate-in fade-in zoom-in duration-500 space-y-6">
    {/* Graduation Header */}
    <div className="bg-white p-8 rounded-2xl shadow-2xl border-4 border-pink-400 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 p-4 opacity-5">
        <Sparkles size={80} />
      </div>
      <div className="mb-6 inline-block bg-pink-100 p-6 rounded-full">
        <CheckCircle2 size={64} className="text-pink-500" />
      </div>
      <h2 className="text-4xl font-black text-pink-600 mb-2">You Graduated!</h2>
      <p className="text-gray-500 mb-8 italic">
        North Shore High Class of 2024 (Context Edition)
      </p>

      {/* Key Takeaways */}
      <div className="text-left space-y-4 mb-10 max-w-md mx-auto">
        <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-pink-500">
          <h4 className="font-bold text-gray-800">
            1. Prop Drilling is for Losers
          </h4>
          <p className="text-sm text-gray-600">
            Don't pass props through components that don't need them. It's messy
            and causes unnecessary re-renders.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-pink-500">
          <h4 className="font-bold text-gray-800">
            2. Context is your Burn Book
          </h4>
          <p className="text-sm text-gray-600">
            Use it for "global" state like themes, user auth, or shared data that
            many components need.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-pink-500">
          <h4 className="font-bold text-gray-800">3. Don't Create a Riot</h4>
          <p className="text-sm text-gray-600">
            Split your Contexts logically so only relevant components re-render
            when data changes.
          </p>
        </div>
      </div>
    </div>

    {/* When to Use Context */}
    <div className="bg-blue-50 border-2 border-blue-500 p-6 rounded-xl">
      <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
        <Info className="text-blue-600" size={20} />
        When to Use Context
      </h4>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="font-semibold text-green-700 mb-2 flex items-center gap-1">
            <CheckCircle size={16} />
            ✅ Good Use Cases:
          </div>
          <ul className="text-sm space-y-1 text-green-800">
            <li>• Theme/dark mode toggles</li>
            <li>• User authentication state</li>
            <li>• Language/i18n preferences</li>
            <li>• Global UI state (modals, toasts)</li>
          </ul>
        </div>

        <div>
          <div className="font-semibold text-red-700 mb-2 flex items-center gap-1">
            <XCircle size={16} />
            ❌ Avoid When:
          </div>
          <ul className="text-sm space-y-1 text-red-800">
            <li>• State only used in 1-2 components</li>
            <li>• Frequently changing data (forms, animations)</li>
            <li>• Can solve with composition instead</li>
            <li>• Need fine-grained updates (use state lib)</li>
          </ul>
        </div>
      </div>
    </div>

    {/* Debugging Strategies */}
    <div className="bg-purple-50 border-2 border-purple-500 p-6 rounded-xl">
      <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
        <Search className="text-purple-600" size={20} />
        How to Debug Context Issues
      </h4>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
            1
          </div>
          <div>
            <div className="font-semibold text-purple-900">
              React DevTools Profiler
            </div>
            <div className="text-sm text-purple-700">
              Record a session and see which components re-render when context updates
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
            2
          </div>
          <div>
            <div className="font-semibold text-purple-900">
              Console Log Context Value
            </div>
            <div className="text-sm text-purple-700 font-mono bg-purple-100 p-2 rounded mt-1">
              const value = useContext(MyContext);
              <br />
              console.log('Context updated:', value);
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
            3
          </div>
          <div>
            <div className="font-semibold text-purple-900">
              Check Provider Nesting
            </div>
            <div className="text-sm text-purple-700">
              Components outside Provider return undefined—verify tree structure
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Alternatives */}
    <div className="bg-gray-50 border-2 border-gray-300 p-6 rounded-xl">
      <h4 className="font-bold text-gray-800 mb-3">Alternatives to Consider</h4>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
          <div>
            <div className="font-semibold text-gray-800">Component Composition</div>
            <div className="text-sm text-gray-600">
              Pass components as children/props instead of drilling data
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
          <div>
            <div className="font-semibold text-gray-800">State Management Libraries</div>
            <div className="text-sm text-gray-600">
              For complex state: Zustand, Jotai, Redux Toolkit, Recoil
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
          <div>
            <div className="font-semibold text-gray-800">URL State</div>
            <div className="text-sm text-gray-600">
              Search params, route params for shareable/bookmarkable state
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Quick Reference Card */}
    <div className="bg-pink-500 text-white p-6 rounded-xl shadow-xl">
      <h4 className="font-bold mb-4 text-center text-xl">Context API Cheat Sheet</h4>
      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
          <div className="font-bold mb-2">1. Create</div>
          <code className="text-xs break-words">createContext(defaultValue)</code>
        </div>
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
          <div className="font-bold mb-2">2. Provide</div>
          <code className="text-xs break-words">&lt;Context.Provider value={'{'}{'}'}{'>'}</code>
        </div>
        <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
          <div className="font-bold mb-2">3. Consume</div>
          <code className="text-xs break-words">useContext(Context)</code>
        </div>
      </div>
    </div>

    {/* Final Zen Integration */}
    <div className="bg-purple-100 border-2 border-purple-400 p-6 rounded-xl">
      <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
        <Sparkles className="text-purple-600" size={20} />
        💎 The Mean Girls Zen of Context
      </h4>
      <ul className="space-y-2 text-purple-800 text-sm">
        <li>
          <strong>"Props down, events up."</strong> Context doesn't replace this—it
          complements it for global state.
        </li>
        <li>
          <strong>"Lift state up when sharing; keep it local when not."</strong> Context
          is lifting to Provider level.
        </li>
        <li>
          <strong>"Components should do one thing well."</strong> One Context = One
          logical concern.
        </li>
        <li>
          <strong>"Explicit state changes beat implicit mutations."</strong> Context
          updates are explicit via Provider value.
        </li>
      </ul>
    </div>

    {/* Restart Button */}
    <div className="text-center">
      <button
        onClick={onRestart}
        className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl inline-flex items-center justify-center gap-2"
      >
        <RefreshCcw size={20} /> One More Time?
      </button>
    </div>
  </div>
);

// --- Main App ---
export default function MeanGirls() {
  const [chapter, setChapter] = useState<Chapter>("intro");

  const nextChapter = () => {
    const chapters: Chapter[] = [
      "intro",
      "prop-drilling",
      "context-solution",
      "comparison",
      "performance-pitfall",
      "split-contexts",
      "summary",
    ];
    const currentIdx = chapters.indexOf(chapter);
    if (currentIdx < chapters.length - 1) {
      setChapter(chapters[currentIdx + 1]);
    }
  };

  const restart = () => setChapter("intro");

  return (
    <div className="min-h-screen bg-pink-50 font-sans text-gray-900 pb-20">
      <Header />

      <main className="max-w-3xl mx-auto px-4 mt-8">
        <ProgressBar current={chapter} />

        {chapter === "intro" && <Intro onNext={nextChapter} />}
        {chapter === "prop-drilling" && <PropDrillingDemo onNext={nextChapter} />}
        {chapter === "context-solution" && <ContextDemo onNext={nextChapter} />}
        {chapter === "comparison" && <ComparisonView onNext={nextChapter} />}
        {chapter === "performance-pitfall" && <PerformancePitfall onNext={nextChapter} />}
        {chapter === "split-contexts" && <SplitContexts onNext={nextChapter} />}
        {chapter === "summary" && <Summary onRestart={restart} />}
      </main>

      {/* Decorative Stickers */}
      <div className="fixed bottom-4 left-4 pointer-events-none opacity-40 md:opacity-100">
        <div className="bg-yellow-400 text-white px-3 py-1 rounded-full font-bold rotate-[-10deg] shadow-lg border-2 border-white mb-2 text-sm uppercase">
          Fetch!
        </div>
        <div className="bg-pink-500 text-white px-3 py-1 rounded-full font-bold rotate-[5deg] shadow-lg border-2 border-white text-sm uppercase">
          Grool
        </div>
      </div>

      <div className="fixed top-24 right-4 pointer-events-none hidden lg:block">
        <div className="w-32 h-32 border-4 border-pink-200 rounded-2xl flex items-center justify-center rotate-12 bg-white/50 backdrop-blur-sm">
          <span className="font-serif text-pink-300 text-6xl select-none">
            B
          </span>
        </div>
      </div>
    </div>
  );
}