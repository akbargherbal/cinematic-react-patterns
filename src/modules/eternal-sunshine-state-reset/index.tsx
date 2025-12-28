import { useState, useEffect, useRef } from "react";
import { Heart, RotateCcw, Trash2, CheckCircle2, XCircle } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

const chapters: Chapter[] = [
  {
    id: "intro",
    title: "Meet Me in Montauk",
    content: "The train rattles through the gray February morning. Joel sits alone, staring out at the frozen landscape, when she slides into the seat across from him. Blue hair. Orange sweatshirt. A smile that feels both foreign and familiar.\n\nThis is how components mount in React. Fresh. New. With no memory of what came before.\n\nEvery time a component mounts, it starts with initial state. The component has no awareness of previous instances. It's a clean slate—or so it seems.\n\nBut there's something beneath the surface. A pull stronger than first-meeting attraction. A familiarity that neither can explain.\n\nWhat if some data lives outside the component lifecycle? What if some memories—some state—persists in places the mounting process can't reach?"
  },
  {
    id: "build",
    title: "The Procedure",
    content: "Two years earlier, Clementine sits in the waiting room at Lacuna Inc., filling out forms. Dr. Mierzwiak explains the process with calm confidence: \"We'll map every memory associated with Joel, then erase them while you sleep. When you wake up, it will be as if he never existed. A completely clean slate.\"\n\nThis is the promise of React's key prop. When you want to force a component to completely reset—to destroy the current instance and create a new one—you change its key.\n\nChanging the key tells React: \"This is not the same component. Unmount the old one completely and mount a fresh instance.\" It's the nuclear option. The memory erasure procedure.\n\nWhen a component unmounts due to a key change, React performs thorough cleanup: all state is destroyed, all effects are cleaned up, the component instance is garbage collected.\n\nIt's exactly what Clementine wants. Joel will be gone. The fights, the resentment, the painful ending—all erased."
  },
  {
    id: "climax",
    title: "Something's Wrong",
    content: "Joel is inside his own mind, watching his memories of Clementine dissolve. The Lacuna machine is working backward through time, erasing each moment systematically.\n\nBut something is wrong. Joel is becoming aware inside the erasure. He tries to hide Clementine in memories where she doesn't belong.\n\nThis is what happens when developers discover that their \"clean slate\" remount didn't actually reset everything.\n\nThe visible state resets perfectly. The component mounts fresh. But the ref still contains data from the previous instance. The localStorage still holds cached feelings. The parent component's state still remembers.\n\nThe procedure completes. Joel wakes up. He doesn't remember Clementine. But he feels something. A void. A sense that something important is missing.\n\nThe key changed. The component remounted. The state reset. But some data lives outside the lifecycle."
  },
  {
    id: "resolution",
    title: "Okay",
    content: "Joel and Clementine sit in her apartment, listening to the tapes. They hear themselves tear each other apart. They hear the pain, the resentment, the reasons they wanted to forget.\n\nAnd then Clementine says: \"Okay. I'm impulsive and erratic. You're boring and closed off. We'll probably fight again. But... okay. Let's try anyway.\"\n\nThis is the moment of understanding. The moment when you stop fighting the persistence and start managing it intentionally.\n\nThe correct pattern isn't to assume the key change will reset everything. The correct pattern is to know what persists, clean it explicitly, reset parent state, and document the persistence.\n\nWith intentional state management, you can control exactly what persists and what resets. The \"spotless mind\" is impossible, but you can manage the boundaries."
  },
  {
    id: "summary",
    title: "Meet Me in Montauk",
    content: "The film ends where it began: on the beach in Montauk. Joel and Clementine walk along the frozen shore, knowing their pattern now, accepting it.\n\nThe memory erasure procedure promised a clean slate. It delivered a remounted component. But some state persisted—in unconscious feelings, in muscle memory, in the pull that drew them back together.\n\nThe lesson isn't that key props are broken. The lesson is that you need to understand the boundaries of the component lifecycle.\n\nWhen you change a component's key, React will destroy the instance and create a new one. But React only controls what lives inside the component. Everything outside—refs, external storage, parent state—is your responsibility to manage.\n\nSome state is meant to survive the reset. Your job is to understand it, manage it intentionally, and know when to embrace it."
  }
];

function MountingDemo() {
  const [key, setKey] = useState(0);
  
  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">Basic Mounting</h3>
      <div className="space-y-4">
        <RelationshipComponent key={key} />
        <button
          onClick={() => setKey(k => k + 1)}
          className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Meet Again (Change Key)
        </button>
        <p className="text-sm text-slate-400">
          Current key: <span className="text-blue-400 font-mono">{key}</span>
        </p>
      </div>
    </div>
  );
}

function RelationshipComponent() {
  const [memories, setMemories] = useState(0);
  
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded p-4">
      <p className="text-slate-300 mb-2">Memories together: {memories}</p>
      <button
        onClick={() => setMemories(m => m + 1)}
        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded text-sm transition-colors"
      >
        Create Memory
      </button>
    </div>
  );
}

function KeyPropDemo() {
  const [leftKey, setLeftKey] = useState(0);
  const [rightCounter, setRightCounter] = useState(0);
  
  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">Key Prop Mechanism</h3>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-slate-400 mb-2">With Key Change</p>
          <CounterComponent key={leftKey} />
        </div>
        <div>
          <p className="text-sm text-slate-400 mb-2">Without Key Change</p>
          <CounterComponent counter={rightCounter} setCounter={setRightCounter} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <button
          onClick={() => setLeftKey(k => k + 1)}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Erase (Change Key)
        </button>
        <button
          onClick={() => setRightCounter(0)}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
        >
          Reset Manually
        </button>
      </div>
    </div>
  );
}

function CounterComponent({ counter: externalCounter, setCounter: externalSetCounter }: { counter?: number; setCounter?: (n: number) => void } = {}) {
  const [internalCounter, setInternalCounter] = useState(0);
  
  const counter = externalCounter !== undefined ? externalCounter : internalCounter;
  const setCounter = externalSetCounter || setInternalCounter;
  
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded p-4">
      <p className="text-2xl font-bold text-slate-200 mb-2">{counter}</p>
      <button
        onClick={() => setCounter(counter + 1)}
        className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded text-sm transition-colors"
      >
        Increment
      </button>
    </div>
  );
}

function PersistenceDemo() {
  const [componentKey, setComponentKey] = useState(0);
  
  return (
    <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-orange-400 mb-4">Persistence Problem</h3>
      <PersistentComponent key={componentKey} />
      <button
        onClick={() => setComponentKey(k => k + 1)}
        className="w-full mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded transition-colors flex items-center justify-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Erase Memory (Change Key)
      </button>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-slate-300">Component State (resets)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-slate-300">Ref & localStorage (persist)</span>
        </div>
      </div>
    </div>
  );
}

function PersistentComponent() {
  const [stateValue, setStateValue] = useState(0);
  const refValue = useRef(0);
  
  useEffect(() => {
    const stored = localStorage.getItem('eternal-sunshine-demo');
    if (stored) {
      refValue.current = parseInt(stored, 10);
    }
  }, []);
  
  const increment = () => {
    const newValue = refValue.current + 1;
    refValue.current = newValue;
    localStorage.setItem('eternal-sunshine-demo', newValue.toString());
    setStateValue(newValue);
  };
  
  return (
    <div className="space-y-3">
      <div className="bg-blue-900/30 border border-blue-500/30 rounded p-3">
        <p className="text-sm text-blue-300 mb-1">Component State</p>
        <p className="text-xl font-bold text-blue-400">{stateValue}</p>
      </div>
      <div className="bg-orange-900/30 border border-orange-500/30 rounded p-3">
        <p className="text-sm text-orange-300 mb-1">Ref & localStorage</p>
        <p className="text-xl font-bold text-orange-400">{refValue.current}</p>
      </div>
      <button
        onClick={increment}
        className="w-full px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded transition-colors"
      >
        Create Memory
      </button>
    </div>
  );
}

function CleanupDemo() {
  const [showBefore, setShowBefore] = useState(true);
  
  return (
    <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-emerald-400 mb-4">Cleanup Solution</h3>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowBefore(true)}
          className={`flex-1 px-4 py-2 rounded transition-colors ${
            showBefore 
              ? 'bg-emerald-500 text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          Without Cleanup
        </button>
        <button
          onClick={() => setShowBefore(false)}
          className={`flex-1 px-4 py-2 rounded transition-colors ${
            !showBefore 
              ? 'bg-emerald-500 text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          With Cleanup
        </button>
      </div>
      <div className="bg-slate-800/50 rounded p-4 font-mono text-sm overflow-x-auto">
        {showBefore ? (
          <pre className="text-slate-300">
{`useEffect(() => {
  persistentRef.current = 'data';
  localStorage.setItem('key', 'value');
  
  // ❌ No cleanup!
}, []);`}
          </pre>
        ) : (
          <pre className="text-slate-300">
{`useEffect(() => {
  persistentRef.current = 'data';
  localStorage.setItem('key', 'value');
  
  // ✓ Explicit cleanup
  return () => {
    persistentRef.current = null;
    localStorage.removeItem('key');
  };
}, []);`}
          </pre>
        )}
      </div>
    </div>
  );
}

function SummaryChecklist() {
  const items = [
    { label: "useState values", resets: true },
    { label: "useEffect subscriptions", resets: true },
    { label: "Component instance", resets: true },
    { label: "useRef values", resets: false },
    { label: "localStorage data", resets: false },
    { label: "Parent state", resets: false },
    { label: "Global variables", resets: false },
  ];
  
  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">What Key Prop Resets</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded ${
              item.resets 
                ? 'bg-blue-900/30 border border-blue-500/30' 
                : 'bg-orange-900/30 border border-orange-500/30'
            }`}
          >
            <span className="text-slate-200">{item.label}</span>
            {item.resets ? (
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
            ) : (
              <XCircle className="w-5 h-5 text-orange-400" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700 space-y-2 text-sm text-slate-400">
        <p className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-400" />
          <span>Resets on key change</span>
        </p>
        <p className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-orange-400" />
          <span>Persists across remounts</span>
        </p>
      </div>
    </div>
  );
}

export default function EternalSunshine() {
  const [chapter, setChapter] = useState(0);
  
  const currentChapter = chapters[chapter];
  
  const renderDemo = () => {
    switch (chapter) {
      case 0:
        return <MountingDemo />;
      case 1:
        return <KeyPropDemo />;
      case 2:
        return <PersistenceDemo />;
      case 3:
        return <CleanupDemo />;
      case 4:
        return <SummaryChecklist />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-5xl font-bold text-slate-100">
              Eternal Sunshine of the Spotless Mind
            </h1>
          </div>
          <p className="text-lg md:text-xl text-slate-400">
            Joel & Clementine, 2004
          </p>
          <p className="text-sm md:text-base text-blue-400 mt-2">
            Understanding State Reset & the Key Prop
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 pb-32">
        <article className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6 border-l-4 border-blue-500 pl-4">
            {currentChapter.title}
          </h2>
          <div className="prose prose-invert prose-slate max-w-none mb-8">
            {currentChapter.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-slate-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        <section>
          {renderDemo()}
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter(c => c - 1)}
              disabled={chapter === 0}
              className="px-4 md:px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded transition-colors text-sm md:text-base"
            >
              Previous
            </button>
            
            <div className="text-center">
              <p className="text-xs md:text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </p>
              <div className="flex gap-1 mt-1">
                {chapters.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === chapter ? 'bg-blue-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setChapter(c => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-4 md:px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded transition-colors text-sm md:text-base"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}