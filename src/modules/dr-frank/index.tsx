
import React, { useState, useRef, useEffect } from 'react';
import { 
  FlaskConical, 
  Book, 
  Zap, 
  ChevronRight, 
  ChevronLeft, 
  History,
  Info,
  CheckCircle2,
  XCircle
} from 'lucide-react';

// --- Types & Data ---

type Chapter = {
  id: number;
  title: string;
  date: string;
  narrative: string;
  technicalTitle: string;
  technicalDescription: string;
  codeSnippet: string;
};

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "The Philosophy",
    date: "October 11, 17--",
    narrative: "My colleagues at Ingolstadt obsession with 'total control' is maddening. They insist every twitch of a muscle, every spark of life be cataloged and dictated by a central mind. I propose a different path: to imbue the matter with its own inherent default state, and let it manage its own internal humors. Why should the creator be bothered by every trivial change?",
    technicalTitle: "Initial Value vs. Continuous State",
    technicalDescription: "In React, we distinguish between setting a 'defaultValue' (uncontrolled) and a 'value' prop tied to state (controlled). Uncontrolled components act more like traditional HTML inputs.",
    codeSnippet: `// Controlled\n<input value={state} onChange={e => setState(e.target.value)} />\n\n// Uncontrolled\n<input defaultValue="Initial Spark" />`
  },
  {
    id: 2,
    title: "Creation",
    date: "October 12, 17--",
    narrative: "It breathes! By the glimmer of a half-extinguished light, I saw the dull yellow eye of the creature open. I gave it a name via 'defaultValue', but as it stirs, I realize I have no tether to its thoughts. It exists, it changes, yet I am a stranger to its current configuration. The data flows only once, at the moment of animation.",
    technicalTitle: "One-Way Initialization",
    technicalDescription: "The 'defaultValue' prop only sets the initial value. After that, the DOM node takes over. The parent React component loses track of what the user is actually typing unless it explicitly queries the DOM.",
    codeSnippet: `const creatureRef = useRef(null);\n// We set it once, but we don't 'watch' it\n<input ref={creatureRef} defaultValue="The Creature" />`
  },
  {
    id: 3,
    title: "Elizabeth's Warning",
    date: "October 15, 17--",
    narrative: "Elizabeth writes to me of the dangers of isolation. 'Communication is the tether that keeps us human,' she says. I look at my creation. If it feels pain, I do not know it. If it feels joy, I am blind to it. A controlled soul would speak its state back to me at every heartbeat. My uncontrolled beast remains a silent, opaque mystery.",
    technicalTitle: "Bidirectional Data Flow",
    technicalDescription: "Controlled components create a feedback loop: Component State -> Input Value -> User Input -> Event Handler -> Component State. This ensures the UI and Data are always in sync.",
    codeSnippet: `// The Loop of Control\nconst [spirit, setSpirit] = useState("");\n\nreturn (\n  <input \n    value={spirit} \n    onChange={(e) => setSpirit(e.target.value)} \n  />\n);`
  },
  {
    id: 4,
    title: "The Daisy",
    date: "October 21, 17--",
    narrative: "I observed the creature in the woods today. It picked a daisy and looked... peaceful? Its internal state had clearly shifted from the rage of yesterday. But back in my journal (my parent component), I had written 'Subject is Angry'. My records are outdated. The creature has its own memory now, and it is entirely disconnected from mine.",
    technicalTitle: "Internal DOM State",
    technicalDescription: "Uncontrolled components rely on the DOM as the 'source of truth'. React is unaware of changes, meaning parent re-renders won't capture the new value unless you use a Ref to 'pull' the data.",
    codeSnippet: `// React thinks it's "Angry"\n// But the DOM knows it's "Peaceful"\nconsole.log(ref.current.value); // "Peaceful"`
  },
  {
    id: 5,
    title: "The Fire",
    date: "October 23, 17--",
    narrative: "Disaster! The creature encountered a village. Because I had no 'onChange' handler to intercept its impulses, it acted on every raw input from the world. I could not validate its actions. I could not say 'No, do not touch the flame'. It accepted the heat as truth, and chaos ensued. Without control, there is no validation.",
    technicalTitle: "Input Validation & Interception",
    technicalDescription: "Controlled components allow you to intercept user input before it reaches the state. You can format, validate, or even reject characters (e.g., preventing special characters or numbers).",
    codeSnippet: `const handleChange = (e) => {\n  const val = e.target.value;\n  if (!val.includes("🔥")) { // Intercept!\n    setSpirit(val);\n  }\n};`
  },
  {
    id: 6,
    title: "The Tragedy",
    date: "October 29, 17--",
    narrative: "I tried to reset the creature's temperament to 'Docile', but it ignored me! Since I do not provide a 'value' prop, the creature ignores my attempts to overwrite its current state from the lab. I am a powerless observer in my own experiment. The debugging of this soul is impossible; I cannot even see the logs of its heart.",
    technicalTitle: "The Reset Problem",
    technicalDescription: "Resetting or programmatically changing an uncontrolled input is difficult. You have to manually manipulate the DOM node via a Ref, which bypasses React's declarative nature and makes testing/debugging harder.",
    codeSnippet: `// Trying to force a change\nref.current.value = "New State"; // Imperative & messy`
  },
  {
    id: 7,
    title: "The Solution",
    date: "November 2, 17--",
    narrative: "I see now. To truly create life that is part of a whole, the creator and the created must share a single source of truth. The controlled component is not a cage, but a bridge. By holding the state in my own hands and passing it down, we are in harmony. I shall rebuild, with state as the heart and props as the nerves.",
    technicalTitle: "Choosing the Pattern",
    technicalDescription: "Use Controlled for: validation, dynamic inputs, custom UI, and complex forms. Use Uncontrolled for: simple forms with low interaction, performance-critical large lists, or file inputs.",
    codeSnippet: `// The Harmonious Pattern\nfunction Lab() {\n  const [life, setLife] = useState("Balanced");\n  return <Creature value={life} onPulse={setLife} />;\n}`
  }
];

// --- Sub-Components ---

const CodeViewer = ({ code }: { code: string }) => (
  <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-emerald-400 overflow-x-auto border border-slate-800 shadow-inner">
    <pre>{code}</pre>
  </div>
);

const LabInput = React.forwardRef<HTMLInputElement, { label: string; type: 'controlled' | 'uncontrolled' } & any>(({ label, type, ...props }, ref) => (
  <div className="flex flex-col gap-2 p-4 bg-slate-900/50 border border-slate-700 rounded-lg shadow-lg">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
        {type === 'controlled' ? <Zap size={12} className="text-yellow-400" /> : <History size={12} className="text-slate-500" />}
        {label}
      </span>
      <span className={`text-[10px] px-2 py-0.5 rounded-full ${type === 'controlled' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-slate-800 text-slate-400'}`}>
        {type.toUpperCase()}
      </span>
    </div>
    <input 
      ref={ref}
      className="bg-slate-950 border border-slate-700 rounded p-2 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
      {...props}
    />
  </div>
));

// --- Main App Component ---

export default function DrFrank() {

  const [currentChapter, setCurrentChapter] = useState(0);
  
  // State for Demos
  const [controlledVal, setControlledVal] = useState("Initial Spark");
  const [uncontrolledKey, setUncontrolledKey] = useState(0); // For resetting uncontrolled
  const uncontrolledRef = useRef<HTMLInputElement>(null);
  const [lastLoggedRef, setLastLoggedRef] = useState("");

  const chapter = CHAPTERS[currentChapter];

  const nextChapter = () => {
    if (currentChapter < CHAPTERS.length - 1) {
      setCurrentChapter(prev => prev + 1);
    }
  };

  const prevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1);
    }
  };

  const resetDemos = () => {
    setControlledVal("Initial Spark");
    setUncontrolledKey(k => k + 1);
    setLastLoggedRef("Initial Spark");
  };

  // Effect to sync last logged ref value in demos
  useEffect(() => {
    const timer = setInterval(() => {
      if (uncontrolledRef.current) {
        setLastLoggedRef(uncontrolledRef.current.value);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-serif selection:bg-emerald-900/50 flex flex-col items-center p-4 md:p-8">
      
      {/* Header */}
      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between border-b border-slate-800 pb-6 mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-950/30 border border-emerald-800/50 rounded-full text-emerald-500 animate-pulse">
            <FlaskConical size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tighter text-slate-100 uppercase italic">
              Frankenstein's <span className="text-emerald-500">Forms</span>
            </h1>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">A Study in React State & Control</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {CHAPTERS.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 w-8 rounded-full transition-all duration-500 ${idx === currentChapter ? 'bg-emerald-500 w-12 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : idx < currentChapter ? 'bg-slate-700' : 'bg-slate-900'}`}
            />
          ))}
        </div>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Narrative & Journal */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-[#1a1c24] border-l-4 border-emerald-600 p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 text-slate-800 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity">
              <Book size={120} />
            </div>
            
            <div className="relative z-10">
              <span className="text-xs font-mono text-emerald-500/70 mb-2 block">{chapter.date}</span>
              <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                Chapter {chapter.id}: {chapter.title}
              </h2>
              <p className="leading-relaxed text-lg italic text-slate-300 first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:text-emerald-500">
                {chapter.narrative}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Info size={16} className="text-blue-400" />
              Creator's Annotations
            </h3>
            <div className="space-y-3">
              <p className="text-sm text-slate-400 leading-snug">
                <strong className="text-slate-200">{chapter.technicalTitle}:</strong> {chapter.technicalDescription}
              </p>
              <CodeViewer code={chapter.codeSnippet} />
            </div>
          </div>
        </section>

        {/* Right: Interactive Demo */}
        <section className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-slate-800 px-6 py-3 flex items-center justify-between border-b border-slate-700">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                LIVE EXPERIMENT LABORATORY
              </span>
              <button 
                onClick={resetDemos}
                className="text-[10px] bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1 rounded transition-colors uppercase tracking-widest font-bold"
              >
                Reset Subject
              </button>
            </div>

            <div className="p-8 space-y-12">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Controlled Demo Side */}
                <div className="space-y-4">
                  <LabInput 
                    label="Controlled Soul" 
                    type="controlled"
                    value={controlledVal}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (currentChapter === 4 && /[^a-zA-Z0-9\s]/.test(e.target.value)) {
                        return;
                      }
                      setControlledVal(e.target.value);
                    }}
                    placeholder="Type to influence..."
                  />
                  
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Journal Record (State)</span>
                    <div className="flex items-center gap-2 text-yellow-500 font-mono text-sm break-all">
                      <Zap size={14} />
                      {controlledVal || <span className="text-slate-700 italic">No signal...</span>}
                    </div>
                  </div>
                </div>

                {/* Uncontrolled Demo Side */}
                <div className="space-y-4">
                  <LabInput 
                    key={uncontrolledKey}
                    label="Uncontrolled Beast" 
                    type="uncontrolled"
                    defaultValue="Initial Spark"
                    ref={uncontrolledRef}
                    placeholder="Type to see drift..."
                  />
                  
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Journal Record (Parent Knowledge)</span>
                    <div className="flex items-center gap-2 text-slate-500 font-mono text-sm">
                      <History size={14} />
                      <span className="line-through">Initial Spark</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-500 font-mono text-sm break-all">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                      Actual Reality: "{lastLoggedRef}"
                    </div>
                  </div>
                </div>

              </div>

              {/* Visual Metaphor / Status */}
              <div className="border-t border-slate-800 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase">Synchronicity Analysis</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4 h-24">
                  <div className={`rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all duration-500 ${controlledVal ? 'bg-emerald-950/10 border-emerald-500/30' : 'bg-slate-900 border-slate-800'}`}>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Controlled Flow</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Bilateral Harmony</div>
                  </div>

                  <div className={`rounded-lg border-2 flex flex-col items-center justify-center gap-2 transition-all duration-500 ${lastLoggedRef !== "Initial Spark" ? 'bg-red-950/10 border-red-500/30' : 'bg-slate-900 border-slate-800'}`}>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Uncontrolled Flow</div>
                    <div className="text-[10px] text-red-400 font-mono">Disconnected Drift</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Nav Controls */}
            <div className="bg-slate-800/50 p-6 flex justify-between items-center border-t border-slate-700">
              <button 
                onClick={prevChapter}
                disabled={currentChapter === 0}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-slate-200 transition-all font-bold text-sm uppercase"
              >
                <ChevronLeft size={18} />
                Previous Entry
              </button>
              
              <div className="text-xs font-mono text-slate-500">
                Entry {currentChapter + 1} of {CHAPTERS.length}
              </div>

              <button 
                onClick={nextChapter}
                disabled={currentChapter === CHAPTERS.length - 1}
                className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-white shadow-lg shadow-emerald-900/20 transition-all font-bold text-sm uppercase"
              >
                {currentChapter === CHAPTERS.length - 1 ? 'End Study' : 'Next Entry'}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {currentChapter === CHAPTERS.length - 1 && (
            <div className="bg-emerald-900/10 border border-emerald-500/30 rounded-2xl p-8 space-y-6 animate-pulse">
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 size={24} />
                Final Revelation: The Comparison
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 text-sm text-slate-400">
                  <h4 className="font-bold text-slate-200 uppercase tracking-widest border-b border-slate-700 pb-2">Controlled</h4>
                  <p>State is in React. Predictable. Easy to test. Perfect for complex logic.</p>
                </div>
                <div className="space-y-3 text-sm text-slate-400">
                  <h4 className="font-bold text-slate-200 uppercase tracking-widest border-b border-slate-700 pb-2">Uncontrolled</h4>
                  <p>State is in DOM. Less code. Good for simple forms or file inputs.</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="mt-12 text-slate-600 text-[10px] uppercase tracking-[0.2em] pb-8 flex items-center gap-2">
        The Modern Prometheus of Web Development
      </footer>
    </div>
  );
}

