import React, { useState, useEffect, Suspense, lazy } from "react";
import { Ghost, Skull, Split, Map, Zap, ArrowRight, ArrowLeft, Loader2, BookOpen } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

// --- Types ---

interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  demo: React.ReactNode;
}

// --- Mock Components for Lazy Loading Simulation ---

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Demos ---

const Chapter1Demo = () => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-700">
        <h3 className="text-emerald-400 font-serif text-xl mb-4 flex items-center gap-2">
          <Ghost className="w-5 h-5" /> Soul Architecture Analysis
        </h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-slate-400 mb-1">
              <span>Voldemort's Soul (Monolith)</span>
              <span>10.5 MB (Critical)</span>
            </div>
            <div className="h-12 bg-slate-800 rounded-md overflow-hidden relative border border-red-900/30">
              <div className="absolute inset-0 bg-red-900/20 flex items-center justify-center text-red-400 font-mono text-xs">
                [==================================================]
              </div>
            </div>
            <p className="text-xs text-red-400 mt-1">⚠️ Single Point of Failure Detected</p>
          </div>

          <div>
            <div className="flex justify-between text-sm text-slate-400 mb-1">
              <span>Standard Wizard Soul</span>
              <span>150 KB</span>
            </div>
            <div className="h-4 bg-slate-800 rounded-md overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-[5%] bg-emerald-600"></div>
            </div>
          </div>
        </div>
      </div>
      
      <CodeBlock
        code={`// ❌ The Monolith Pattern
import { DarkMagic, Immortality, Flight, Parseltongue } from "./voldemort-utils";

// All powers loaded upfront, even if not used immediately
export default function Voldemort() {
  return (
    <Soul>
      <DarkMagic />
      <Immortality />
      <Flight />
      <Parseltongue />
    </Soul>
  );
}`}
        variant="error"
        title="// The Unsplit Soul"
        language="javascript"
      />
    </div>
  );
};

const Chapter2Demo = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "crashed">("idle");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (status === "loading") {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 90) {
            clearInterval(interval);
            setStatus("crashed");
            return 90;
          }
          return p + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
    if (status === "idle") setProgress(0);
  }, [status]);

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 relative overflow-hidden">
        {status === "crashed" && (
          <div className="absolute inset-0 bg-red-950/90 z-10 flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm animate-in fade-in duration-500">
            <Skull className="w-16 h-16 text-red-500 mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-red-200 mb-2">System Failure</h3>
            <p className="text-red-300 mb-6">Unhandled Exception: Soul Integrity Compromised</p>
            <button 
              onClick={() => setStatus("idle")}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            >
              Reboot from Albania
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-emerald-400 font-serif text-xl">Godric's Hollow Execution</h3>
          <div className="px-3 py-1 rounded bg-slate-800 text-xs font-mono text-slate-400">
            Status: {status.toUpperCase()}
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-600 transition-all duration-300 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-slate-400 font-mono">
            Loading bundle: main.js (10.5MB)... {progress}%
          </p>
        </div>

        <button
          onClick={() => setStatus("loading")}
          disabled={status !== "idle"}
          className="w-full py-3 bg-emerald-900/50 border border-emerald-500/50 text-emerald-100 rounded hover:bg-emerald-900/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {status === "loading" ? <Loader2 className="animate-spin w-4 h-4" /> : <Zap className="w-4 h-4" />}
          Execute Killing Curse
        </button>
      </div>

      <CodeBlock
        code={`// ❌ Catastrophic Failure
// If this single file fails to load or throws an error,
// the ENTIRE application renders nothing (White Screen of Death).

try {
  loadMassiveBundle(); // 10MB download
} catch (e) {
  // No error boundary, no fallback
  crashApplication(); 
}`}
        variant="error"
        title="// The Single Point of Failure"
      />
    </div>
  );
};

const Chapter3Demo = () => {
  const [isSplit, setIsSplit] = useState(false);

  const monolithCode = `import Nagini from './Nagini'; // 2MB
import Diadem from './Diadem'; // 3MB
import Cup from './Cup';       // 2MB

function Voldemort() {
  return (
    <div>
      <Nagini />
      <Diadem />
      <Cup />
    </div>
  );
}`;

  const splitCode = `import { lazy, Suspense } from 'react';

// ✅ Lazy load components (Horcruxes)
const Nagini = lazy(() => import('./Nagini'));
const Diadem = lazy(() => import('./Diadem'));
const Cup = lazy(() => import('./Cup'));

function Voldemort() {
  return (
    // ✅ Show fallback while loading
    <Suspense fallback={<PensieveSpinner />}>
      <Nagini />
    </Suspense>
  );
}`;

  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsSplit(!isSplit)}
          className={`
            relative px-8 py-4 rounded-lg border transition-all duration-500 flex items-center gap-3
            ${isSplit 
              ? "bg-emerald-950/40 border-emerald-500 text-emerald-300 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]" 
              : "bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500"}
          `}
        >
          <Split className={`w-6 h-6 ${isSplit ? "text-emerald-400" : "text-slate-500"}`} />
          <span className="font-serif text-lg">{isSplit ? "Soul Successfully Split" : "Perform Splitting Ritual"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`transition-opacity duration-500 ${isSplit ? "opacity-40 grayscale" : "opacity-100"}`}>
          <CodeBlock
            code={monolithCode}
            variant="error"
            title="// Before: Monolith"
          />
        </div>
        <div className={`transition-opacity duration-500 ${isSplit ? "opacity-100" : "opacity-40 blur-sm"}`}>
          <CodeBlock
            code={splitCode}
            variant="success"
            title="// After: Horcruxes"
          />
        </div>
      </div>
    </div>
  );
};

const Chapter4Demo = () => {
  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);
  const [loadedA, setLoadedA] = useState(false);
  const [loadedB, setLoadedB] = useState({ shell: false, chunk1: false, chunk2: false });

  const reset = () => {
    setLoadingA(false);
    setLoadingB(false);
    setLoadedA(false);
    setLoadedB({ shell: false, chunk1: false, chunk2: false });
  };

  const runMonolith = async () => {
    reset();
    setLoadingA(true);
    await delay(3000); // Long wait
    setLoadingA(false);
    setLoadedA(true);
  };

  const runDistributed = async () => {
    reset();
    setLoadingB(true);
    await delay(300); // Fast initial load
    setLoadedB(prev => ({ ...prev, shell: true }));
    
    // Load chunks independently
    delay(1000).then(() => setLoadedB(prev => ({ ...prev, chunk1: true })));
    delay(2000).then(() => setLoadedB(prev => ({ ...prev, chunk2: true })));
    
    setLoadingB(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Monolith Approach */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
            <Skull className="w-5 h-5" /> Approach A: The Monolith
          </h3>
          <div className="h-48 bg-slate-950 rounded border border-slate-800 flex items-center justify-center relative overflow-hidden">
            {loadingA && (
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-500 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Downloading 10MB...</p>
              </div>
            )}
            {loadedA && (
              <div className="animate-in zoom-in duration-300 text-center">
                <Ghost className="w-16 h-16 text-red-500 mx-auto mb-2" />
                <p className="text-red-400 font-bold">FULL VOLDEMORT</p>
              </div>
            )}
            {!loadingA && !loadedA && <p className="text-slate-600 text-sm">System Idle</p>}
          </div>
          <button 
            onClick={runMonolith}
            disabled={loadingA || loadingB}
            className="mt-4 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors disabled:opacity-50"
          >
            Load Monolith
          </button>
        </div>

        {/* Distributed Approach */}
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
            <Split className="w-5 h-5" /> Approach B: The Plague
          </h3>
          <div className="h-48 bg-slate-950 rounded border border-slate-800 p-4 relative">
            {!loadedB.shell && !loadingB && (
              <div className="h-full flex items-center justify-center text-slate-600 text-sm">System Idle</div>
            )}
            
            {(loadingB || loadedB.shell) && (
              <div className="space-y-3 animate-in fade-in duration-300">
                {/* Shell loaded immediately */}
                <div className="h-8 bg-emerald-900/30 rounded border border-emerald-500/30 flex items-center px-3">
                  <span className="text-xs text-emerald-500">App Shell (Loaded)</span>
                </div>
                
                {/* Chunk 1 */}
                <div className="h-12 bg-slate-900 rounded border border-slate-800 flex items-center justify-center">
                  {loadedB.chunk1 ? (
                    <span className="text-emerald-400 text-sm flex items-center gap-2 animate-in slide-in-from-left-2">
                      <BookOpen className="w-4 h-4" /> Diary Loaded
                    </span>
                  ) : (
                    <span className="text-slate-600 text-xs flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" /> Fetching Diary...
                    </span>
                  )}
                </div>

                {/* Chunk 2 */}
                <div className="h-12 bg-slate-900 rounded border border-slate-800 flex items-center justify-center">
                  {loadedB.chunk2 ? (
                    <span className="text-emerald-400 text-sm flex items-center gap-2 animate-in slide-in-from-left-2">
                      <Zap className="w-4 h-4" /> Ring Loaded
                    </span>
                  ) : (
                    <span className="text-slate-600 text-xs flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" /> Fetching Ring...
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <button 
            onClick={runDistributed}
            disabled={loadingA || loadingB}
            className="mt-4 w-full py-2 bg-emerald-900/50 hover:bg-emerald-900/80 text-emerald-100 rounded transition-colors disabled:opacity-50"
          >
            Load Distributed
          </button>
        </div>
      </div>
    </div>
  );
};

const Chapter5Demo = () => {
  const [activeRoute, setActiveRoute] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);

  const navigate = async (route: string) => {
    if (loading) return;
    setActiveRoute(route);
    setLoading(true);
    setContent(null);

    // Simulate network request for chunk
    await delay(1500);

    let loadedContent;
    switch (route) {
      case "gringotts":
        loadedContent = (
          <div className="text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-yellow-600/50">
              <div className="text-3xl">🏆</div>
            </div>
            <h4 className="text-yellow-500 font-bold">Hufflepuff's Cup Found</h4>
            <p className="text-xs text-slate-400 mt-2">Chunk: cup-component.js loaded</p>
          </div>
        );
        break;
      case "hogwarts":
        loadedContent = (
          <div className="text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-600/50">
              <div className="text-3xl">👑</div>
            </div>
            <h4 className="text-blue-400 font-bold">Ravenclaw's Diadem Found</h4>
            <p className="text-xs text-slate-400 mt-2">Chunk: diadem-component.js loaded</p>
          </div>
        );
        break;
      case "shack":
        loadedContent = (
          <div className="text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-600/50">
              <div className="text-3xl">💍</div>
            </div>
            <h4 className="text-emerald-500 font-bold">Gaunt's Ring Found</h4>
            <p className="text-xs text-slate-400 mt-2">Chunk: ring-component.js loaded</p>
          </div>
        );
        break;
    }

    setContent(loadedContent);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 min-h-[300px] flex flex-col">
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => navigate("gringotts")}
            className={`px-4 py-2 rounded border transition-all ${activeRoute === "gringotts" ? "bg-yellow-900/30 border-yellow-600 text-yellow-200" : "bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500"}`}
          >
            Gringotts
          </button>
          <button
            onClick={() => navigate("hogwarts")}
            className={`px-4 py-2 rounded border transition-all ${activeRoute === "hogwarts" ? "bg-blue-900/30 border-blue-600 text-blue-200" : "bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500"}`}
          >
            Hogwarts
          </button>
          <button
            onClick={() => navigate("shack")}
            className={`px-4 py-2 rounded border transition-all ${activeRoute === "shack" ? "bg-emerald-900/30 border-emerald-600 text-emerald-200" : "bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500"}`}
          >
            Gaunt Shack
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center bg-slate-950/50 rounded-lg border border-slate-800/50 relative overflow-hidden">
          {loading ? (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center animate-pulse">
                <div className="w-8 h-8 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-slate-400 font-serif italic">Consulting the Pensieve...</p>
              <p className="text-xs text-slate-600 font-mono">Suspense Fallback Active</p>
            </div>
          ) : content ? (
            content
          ) : (
            <div className="text-slate-600 flex flex-col items-center">
              <Map className="w-12 h-12 mb-2 opacity-20" />
              <p>Select a location to hunt a Horcrux</p>
            </div>
          )}
        </div>
      </div>

      <CodeBlock
        code={`// ✅ Route-based Code Splitting
import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// These files are NOT downloaded until the route is visited
const Gringotts = lazy(() => import('./Gringotts'));
const Hogwarts = lazy(() => import('./Hogwarts'));

export default function App() {
  return (
    <Suspense fallback={<PensieveLoader />}>
      <Routes>
        <Route path="/gringotts" element={<Gringotts />} />
        <Route path="/hogwarts" element={<Hogwarts />} />
      </Routes>
    </Suspense>
  );
}`}
        variant="success"
        title="// The Hunt Strategy"
      />
    </div>
  );
};

// --- Main Module Component ---

export default function CodeSplittingModule() {
  const [chapterIndex, setChapterIndex] = useState(0);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The All-or-Nothing Soul",
      subtitle: "Tom Riddle, Hogwarts Library, 1943",
      content: (
        <>
          <p className="mb-4">
            The air in the Forbidden Section was thick with dust and ambition. Tom Riddle traced the text of <em>Magick Moste Evile</em>. It described the soul as a singular, indivisible vessel—a monolith.
          </p>
          <p className="mb-4">
            "A single soul, however powerful, is a single point of failure," he whispered. If the vessel breaks, the wizard ends. In the world of web development, this is the <strong>Monolithic Bundle</strong>: a single, massive JavaScript file containing your entire application.
          </p>
          <p>
            It's powerful, yes. But it requires the user to download <em>everything</em> before they can see <em>anything</em>.
          </p>
        </>
      ),
      demo: <Chapter1Demo />
    },
    {
      id: "crash",
      title: "The Godric's Hollow Crash",
      subtitle: "Voldemort, Godric's Hollow, 1981",
      content: (
        <>
          <p className="mb-4">
            Voldemort arrived at Godric's Hollow as a walking cataclysm. His entire application was loaded into memory—every curse, every secret, all at once. He was invincible, until he wasn't.
          </p>
          <p className="mb-4">
            When the Killing Curse rebounded, it wasn't just a wound; it was a <strong>System Crash</strong>. Because his soul was one cohesive block, the failure was total. He was ripped from the world entirely.
          </p>
          <p>
            In a monolithic app, if the main bundle fails to load (network error) or parsing fails (syntax error), the user sees a white screen. There is no partial recovery.
          </p>
        </>
      ),
      demo: <Chapter2Demo />
    },
    {
      id: "solution",
      title: "The Soul Divided",
      subtitle: "Voldemort, The Riddle House, 1994",
      content: (
        <>
          <p className="mb-4">
            Reborn, Voldemort corrected his design flaw. He performed the ritual to split his soul, placing a fragment into Nagini. It was a painful refactor, tearing a piece of his essence away from the main thread.
          </p>
          <p className="mb-4">
            This is <strong>Code Splitting</strong>. We take a large component (a Horcrux) and separate it from the main bundle. We use <code>React.lazy()</code> to define it as a resource that exists elsewhere.
          </p>
          <p>
            "They can destroy this body," he hissed, "but they cannot destroy <em>me</em>. I am a network."
          </p>
        </>
      ),
      demo: <Chapter3Demo />
    },
    {
      id: "comparison",
      title: "Monolith vs. Plague",
      subtitle: "Dumbledore's Office, 1996",
      content: (
        <>
          <p className="mb-4">
            Dumbledore showed Harry two memories in the Pensieve. In the first, the "Monolith" Voldemort arrives with a deafening crack—terrifying, but requiring a massive initial load of power.
          </p>
          <p className="mb-4">
            In the second, the "Distributed" Voldemort is a plague. His influence loads in chunks: first Bellatrix, then the animated statues, then himself. The initial load is faster, and the threat is resilient.
          </p>
          <p>
            Code splitting improves <strong>Initial Load Time</strong> (Tti). Users see the "App Shell" immediately, while heavy features load in the background.
          </p>
        </>
      ),
      demo: <Chapter4Demo />
    },
    {
      id: "mastery",
      title: "Hunting the Pieces",
      subtitle: "Harry Potter, The Tent, 1997",
      content: (
        <>
          <p className="mb-4">
            Harry, Ron, and Hermione didn't attack the main body. They hunted the pieces. "We find the Horcruxes," Hermione said. "That's the only way."
          </p>
          <p className="mb-4">
            This is the user's journey through a code-split app. As they navigate to a new route (Gringotts), the browser fetches that specific chunk. While it fetches, we show a <strong>Suspense Fallback</strong>—like the shimmering surface of the Pensieve—to let the user know the magic is loading.
          </p>
        </>
      ),
      demo: <Chapter5Demo />
    }
  ];

  const currentChapter = chapters[chapterIndex];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-emerald-900 selection:text-emerald-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-950/50 rounded-lg border border-emerald-500/30">
                <Ghost className="text-emerald-500 w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-100 tracking-tight">Code Splitting</h1>
                <p className="text-xs text-emerald-500 font-medium uppercase tracking-wider">With Horcruxes</p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm text-slate-400 font-serif italic">{currentChapter.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Narrative Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="prose prose-invert prose-lg">
              <h2 className="text-3xl font-serif font-bold text-emerald-100 mb-2">
                {currentChapter.title}
              </h2>
              <div className="w-20 h-1 bg-emerald-600 mb-6 rounded-full"></div>
              <div className="text-slate-300 leading-relaxed">
                {currentChapter.content}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-800">
              <button
                onClick={() => setChapterIndex(Math.max(0, chapterIndex - 1))}
                disabled={chapterIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              
              <div className="flex gap-1">
                {chapters.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all ${idx === chapterIndex ? "bg-emerald-500 w-4" : "bg-slate-800"}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setChapterIndex(Math.min(chapters.length - 1, chapterIndex + 1))}
                disabled={chapterIndex === chapters.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded text-slate-400 hover:text-emerald-400 hover:bg-emerald-950/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Demo Column */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div className="bg-slate-950 rounded-xl border border-slate-800 shadow-2xl shadow-black/50 overflow-hidden">
                <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono ml-2">interactive_demo.tsx</span>
                </div>
                <div className="p-6 md:p-8 bg-slate-950/50 backdrop-blur-sm">
                  {currentChapter.demo}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
