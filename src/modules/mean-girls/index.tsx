import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
  useMemo,
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
} from "lucide-react";

/**
 * THE BURN BOOK: Interactive Context API Tutorial
 * A world-class senior frontend engineer's implementation
 */

// --- Types & Constants ---
type Chapter =
  | "intro"
  | "prop-drilling"
  | "context-solution"
  | "performance-riot"
  | "summary";

const COLORS = {
  pink: "#FF69B4",
  hotPink: "#FF1493",
  lightPink: "#FFF0F5",
  purple: "#9370DB",
  gold: "#FFD700",
};

// --- Contexts ---
const BurnBookContext = createContext<{
  secret: string;
  setSecret: (s: string) => void;
  renderCount: number;
}>({ secret: "", setSecret: () => {}, renderCount: 0 });

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
    "performance-riot",
    "summary",
  ];
  const currentIndex = chapters.indexOf(current);

  return (
    <div className="flex w-full h-2 bg-pink-100 mb-8 rounded-full overflow-hidden">
      {chapters.map((_, i) => (
        <div
          key={i}
          className={`flex-1 transition-all duration-500 ${
            i <= currentIndex ? "bg-pink-500" : "bg-transparent"
          }`}
        />
      ))}
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
        the <strong>Context API</strong>
        can save your app's reputation.
      </p>
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
  const [gretchenRenders, setGretchenRenders] = useState(0);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecret(e.target.value);
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-pink-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Info className="text-pink-500" size={24} />
          The Gretchen Weiners Problem
        </h3>
        <p className="text-gray-600 mb-6">
          Regina has a secret. She needs to tell Karen, but Karen only listens
          to Gretchen. Gretchen doesn't care about the secret, but she{" "}
          <strong>has</strong> to pass it through her props. Every time Regina
          breathes, Gretchen re-renders.
        </p>

        <div className="flex flex-col items-center gap-8 py-10 bg-pink-50 rounded-2xl border-2 border-dashed border-pink-200 relative">
          <div className="flex flex-col items-center gap-4 relative z-10">
            <div className="bg-pink-600 text-white p-4 rounded-xl shadow-lg w-48 text-center">
              <div className="text-xs uppercase opacity-80 mb-1">
                Regina (Parent)
              </div>
              <div className="font-bold">Holds State</div>
              <input
                type="text"
                value={secret}
                onChange={handleUpdate}
                className="mt-2 text-pink-900 px-2 py-1 rounded w-full text-sm outline-none focus:ring-2 ring-yellow-400"
              />
            </div>

            <div className="h-8 w-1 bg-pink-300 animate-pulse" />

            <div
              className="bg-white border-2 border-pink-300 p-4 rounded-xl shadow-md w-48 text-center"
              onAnimationIteration={() => setGretchenRenders((r) => r + 1)}
            >
              <div className="text-xs uppercase text-pink-400 mb-1">
                Gretchen (Middle)
              </div>
              <div className="font-bold text-gray-700">
                Just passing props...
              </div>
              <div className="mt-2 text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded">
                Renders: {gretchenRenders}
              </div>
            </div>

            <div className="h-8 w-1 bg-pink-300 animate-pulse" />

            <div className="bg-blue-500 text-white p-4 rounded-xl shadow-lg w-48 text-center">
              <div className="text-xs uppercase opacity-80 mb-1">
                Karen (Target)
              </div>
              <div className="font-bold">Uses Secret</div>
              <div className="mt-2 text-xs italic bg-blue-600 p-1 rounded">
                "{secret}"
              </div>
            </div>
          </div>

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full border border-yellow-200">
              Poor Performance
            </span>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full border border-red-200">
              High Coupling
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-pink-100 p-6 rounded-2xl font-mono text-sm shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Code2 size={48} />
        </div>
        <h4 className="text-pink-400 font-bold mb-4">
          // Prop Drilling Boilerplate
        </h4>
        <pre className="overflow-x-auto">
          {`function Regina() {
  const [secret, setSecret] = useState("...");
  return <Gretchen secret={secret} />;
}

function Gretchen({ secret }) {
  // Why am I here? I don't use 'secret'!
  return <Karen secret={secret} />;
}

function Karen({ secret }) {
  return <div>{secret}</div>;
}`}
        </pre>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        That's So Fetch. Next? <ArrowRight size={20} />
      </button>
    </div>
  );
};

// --- Chapter 2: Context Solution ---
const ContextDemo = ({ onNext }: { onNext: () => void }) => {
  const [secret, setSecret] = useState("She's fabulous, but she's evil.");

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-pink-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Book className="text-pink-500" size={24} />
          The Burn Book Strategy
        </h3>
        <p className="text-gray-600 mb-6">
          Instead of passing secrets hand-to-hand, we put them in the{" "}
          <strong>Burn Book (Context)</strong>. Now, anyone who wants to know
          the drama can just look it up directly. Gretchen is free to do
          whatever she wants without re-rendering every time the secret changes.
        </p>

        <div className="flex flex-col items-center gap-8 py-10 bg-indigo-50 rounded-2xl border-2 border-dashed border-indigo-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none flex flex-wrap gap-4 p-4">
            {Array(20)
              .fill(0)
              .map((_, i) => (
                <Book key={i} size={24} />
              ))}
          </div>

          <div className="flex justify-between w-full max-w-lg px-8 relative z-10">
            <div className="bg-pink-600 text-white p-4 rounded-xl shadow-lg w-40 text-center">
              <div className="text-xs uppercase opacity-80 mb-1">Regina</div>
              <div className="font-bold">Provider</div>
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="mt-2 text-pink-900 px-2 py-1 rounded w-full text-sm outline-none"
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="bg-pink-100 p-4 rounded-full border-4 border-white shadow-xl animate-bounce">
                <Book className="text-pink-600" size={40} />
              </div>
              <div className="text-pink-600 font-black text-xs mt-2 uppercase">
                The Burn Book
              </div>
            </div>

            <div className="bg-blue-500 text-white p-4 rounded-xl shadow-lg w-40 text-center">
              <div className="text-xs uppercase opacity-80 mb-1">Karen</div>
              <div className="font-bold">Consumer</div>
              <div className="mt-2 text-xs italic bg-blue-600 p-1 rounded">
                "{secret}"
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-indigo-300 p-4 rounded-xl shadow-md w-40 text-center mt-4">
            <div className="text-xs uppercase text-indigo-400 mb-1">
              Gretchen
            </div>
            <div className="font-bold text-gray-700 italic">
              "I'm totally chill"
            </div>
            <div className="mt-2 text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
              Renders: 1
            </div>
          </div>

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full border border-green-200">
              Decoupled
            </span>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200">
              Better Perf
            </span>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-pink-100 p-6 rounded-2xl font-mono text-sm shadow-xl">
        <h4 className="text-pink-400 font-bold mb-4">
          // The Context API Pattern
        </h4>
        <pre className="overflow-x-auto">
          {`// 1. Create the Book
const BurnBookContext = createContext();

function App() {
  const [secret, setSecret] = useState("...");
  // 2. Wrap with Provider
  return (
    <BurnBookContext.Provider value={secret}>
      <School />
    </BurnBookContext.Provider>
  );
}

function Karen() {
  // 3. Access directly! No props!
  const secret = useContext(BurnBookContext);
  return <div>{secret}</div>;
}`}
        </pre>
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

// --- Chapter 3: Performance Riot ---
const PerformanceRiot = ({ onNext }: { onNext: () => void }) => {
  const [tick, setTick] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTick((t) => t + 1);
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-red-100 relative overflow-hidden">
        {isRunning && (
          <div className="absolute inset-0 bg-red-500 opacity-5 pointer-events-none animate-pulse" />
        )}
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={24} />
          The Riot: Context Pitfalls
        </h3>
        <p className="text-gray-600 mb-6">
          Putting <strong>everything</strong> in one giant Context is like
          Regina releasing the pages of the Burn Book to the whole school. Every
          time <strong>any</strong> small piece of data changes,{" "}
          <strong>every single consumer</strong>
          has to re-render. Chaos!
        </p>

        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-8">
          {Array(24)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`h-12 flex items-center justify-center rounded-lg border-2 transition-all duration-75 ${
                  isRunning
                    ? "bg-red-500 border-red-600 scale-105 shadow-md"
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

        <div className="bg-red-50 p-4 rounded-xl border border-red-200 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-red-800 font-bold uppercase text-xs tracking-wider">
                System Lag
              </div>
              <div className="text-3xl font-black text-red-600">
                {isRunning ? (tick * 1.2).toFixed(1) : "0.0"} ms
              </div>
            </div>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`p-4 rounded-full shadow-lg transition-transform active:scale-90 ${
                isRunning ? "bg-red-600 text-white" : "bg-green-500 text-white"
              }`}
            >
              {isRunning ? <RefreshCcw className="animate-spin" /> : <Play />}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-red-100 p-1 rounded-full">
              <CheckCircle2 className="text-red-600" size={16} />
            </div>
            <p className="text-sm text-gray-700">
              <strong>Problem:</strong> Huge Context objects cause
              "over-subscription".
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-1 rounded-full">
              <CheckCircle2 className="text-green-600" size={16} />
            </div>
            <p className="text-sm text-gray-700">
              <strong>Solution:</strong> Split your state into smaller, logical
              contexts.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95"
      >
        I'm basically an expert now <ArrowRight size={20} />
      </button>
    </div>
  );
};

// --- Chapter 4: Summary ---
const Summary = ({ onRestart }: { onRestart: () => void }) => (
  <div className="animate-in fade-in zoom-in duration-500">
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

      <div className="text-left space-y-4 mb-10 max-w-md mx-auto">
        <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-pink-500">
          <h4 className="font-bold text-gray-800">
            1. Prop Drilling is for Losers
          </h4>
          <p className="text-sm text-gray-600">
            Don't pass props through components that don't need them. It's messy
            and annoying.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-pink-500">
          <h4 className="font-bold text-gray-800">
            2. Context is your Burn Book
          </h4>
          <p className="text-sm text-gray-600">
            Use it for "Global" state like themes, user auth, or shared secrets.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-xl border-l-4 border-pink-500">
          <h4 className="font-bold text-gray-800">3. Don't cause a Riot</h4>
          <p className="text-sm text-gray-600">
            Split your Contexts so only relevant components re-render when data
            changes.
          </p>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 mx-auto"
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
      "performance-riot",
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
        {chapter === "prop-drilling" && (
          <PropDrillingDemo onNext={nextChapter} />
        )}
        {chapter === "context-solution" && <ContextDemo onNext={nextChapter} />}
        {chapter === "performance-riot" && (
          <PerformanceRiot onNext={nextChapter} />
        )}
        {chapter === "summary" && <Summary onRestart={restart} />}
      </main>

      {/* Stickers Decorations */}
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
};
