// Janet Version
import React, { useState, useEffect, useTransition, useMemo, memo } from "react";
import { Layers, Clock, Zap, AlertTriangle, Brain, ArrowRight, ArrowLeft, Activity } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

// --- Types ---

interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

// --- Helper Components ---

// A component that is intentionally slow to render to simulate a heavy UI
const HeavyCityscape = memo(({ query, highlight }: { query: string; highlight: boolean }) => {
  // Artificial slowdown to simulate complex rendering
  const startTime = performance.now();
  while (performance.now() - startTime < 40) {
    // Block main thread for 40ms per render to simulate heavy work
    // This makes the "blocking" demo feel laggy
  }

  // Generate a visual representation of "buildings"
  const buildings = useMemo(() => {
    const items = [];
    const count = 100; // Number of buildings
    for (let i = 0; i < count; i++) {
      const isMatch = query && `Building ${i}`.toLowerCase().includes(query.toLowerCase());
      items.push(
        <div 
          key={i} 
          className={`
            h-8 w-full rounded mb-2 flex items-center px-3 text-xs transition-all duration-500
            ${isMatch ? 'bg-indigo-500 text-white scale-105' : 'bg-slate-800 text-slate-500'}
            ${highlight && isMatch ? 'shadow-[0_0_15px_rgba(99,102,241,0.6)]' : ''}
          `}
        >
          <div className="w-4 h-4 mr-2 bg-current opacity-20 rounded-sm" />
          {isMatch ? `Target Sector ${i}` : `Sector ${i}`}
        </div>
      );
    }
    return items;
  }, [query, highlight]);

  return (
    <div className="h-64 overflow-y-auto pr-2 custom-scrollbar border border-slate-800 rounded bg-slate-900/50 p-4">
      <div className="grid grid-cols-2 gap-2">
        {buildings}
      </div>
    </div>
  );
});

HeavyCityscape.displayName = "HeavyCityscape";

// --- Main Module Component ---

export default function InceptionModule() {
  const [chapter, setChapter] = useState(0);
  
  // Demo State
  const [inputValue, setInputValue] = useState(""); // Immediate input
  const [query, setQuery] = useState(""); // Deferred query for list
  const [isPending, startTransition] = useTransition();
  const [mode, setMode] = useState<"blocking" | "transition">("blocking");
  
  // Reset state on chapter change
  useEffect(() => {
    setInputValue("");
    setQuery("");
    setMode(chapter === 1 ? "blocking" : "transition");
  }, [chapter]);

  // Handlers
  const handleBlockingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ❌ Anti-pattern: Urgent and non-urgent updates together
    setInputValue(e.target.value);
    setQuery(e.target.value); // Triggers heavy render immediately
  };

  const handleTransitionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ✅ Solution: Separate urgent and non-urgent
    setInputValue(e.target.value); // Urgent: Update input
    startTransition(() => {
      setQuery(e.target.value); // Non-urgent: Update heavy list
    });
  };

  // Code Snippets
  const blockingCode = `// ❌ The World Freezes
const handleChange = (e) => {
  // Both updates happen at same priority
  setInputValue(e.target.value);
  
  // This triggers a heavy re-render
  // blocking the input from updating!
  setQuery(e.target.value); 
};`;

  const transitionCode = `// ✅ The Dream Within a Dream
import { useTransition } from 'react';

const [isPending, startTransition] = useTransition();

const handleChange = (e) => {
  // 1. Urgent: Update input immediately (Real-Time)
  setInputValue(e.target.value);
  
  // 2. Non-Urgent: Wrap heavy update (Dream-Time)
  startTransition(() => {
    setQuery(e.target.value);
  });
};

// UI shows stale content while calculating
<div style={{ opacity: isPending ? 0.5 : 1 }}>
  <HeavyComponent query={query} />
</div>`;

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Two Clocks",
      subtitle: "Ariadne's Workshop",
      content: (
        <div className="space-y-6">
          <p>
            Ariadne stands in her workshop. On the wall, two clocks tick. One moves with the crisp, urgent rhythm of reality. The other moves glacially, deep in the dream layers.
          </p>
          <p>
            "The Subject's keystrokes happen here," she says, pointing to the fast clock. "Instant. Responsive. But the city construction... that takes time. When we try to force the heavy construction to happen at the speed of a keystroke, the dream collapses."
          </p>
          <div className="bg-slate-900 p-8 rounded-lg border border-slate-800 flex justify-center gap-12 items-center my-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full border-4 border-emerald-500 flex items-center justify-center relative mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <div className="absolute inset-0 flex items-center justify-center animate-spin [animation-duration:1s]">
                  <div className="w-1 h-14 bg-emerald-500 -mt-14 rounded-full origin-bottom" />
                </div>
                <Zap className="text-emerald-500 w-8 h-8" />
              </div>
              <h3 className="text-emerald-400 font-bold">Real-Time</h3>
              <p className="text-xs text-slate-500 mt-1">Urgent Updates (Input)</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full border-4 border-indigo-500 flex items-center justify-center relative mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <div className="absolute inset-0 flex items-center justify-center animate-spin [animation-duration:10s]">
                  <div className="w-1 h-14 bg-indigo-500 -mt-14 rounded-full origin-bottom" />
                </div>
                <Layers className="text-indigo-500 w-8 h-8" />
              </div>
              <h3 className="text-indigo-400 font-bold">Dream-Time</h3>
              <p className="text-xs text-slate-500 mt-1">Heavy Rendering (List)</p>
            </div>
          </div>
          <p className="italic text-slate-400 border-l-2 border-slate-700 pl-4">
            "Not all thoughts need to happen at the same speed. The architect's challenge is to keep them from fighting for the same moment."
          </p>
        </div>
      )
    },
    {
      id: "anti-pattern",
      title: "The World Freezes",
      subtitle: "The Failed Simulation",
      content: (
        <div className="space-y-6">
          <p>
            Saito enters the simulation. He attempts to type a destination. But Ariadne has wired the architecture wrong. Every keystroke forces the entire city to rebuild instantly.
          </p>
          <p>
            <strong>Try typing quickly in the field below.</strong> Feel how the interface fights you. The letters don't appear instantly. The world stutters. This is the "Blocking" anti-pattern.
          </p>
          
          <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <AlertTriangle size={20} />
              <span className="font-bold">Simulation: Blocking Mode</span>
            </div>
            
            <input
              type="text"
              value={inputValue}
              onChange={handleBlockingChange}
              placeholder="Type quickly here..."
              className="w-full bg-slate-900 border border-red-500/50 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-slate-600"
            />
            
            <div className="text-xs text-red-400 font-mono">
              Status: {inputValue ? "Rendering Synchronously..." : "Idle"}
            </div>

            <HeavyCityscape query={query} highlight={false} />
          </div>

          <CodeBlock
            code={blockingCode}
            variant="error"
            title="// ❌ The Anti-Pattern"
            defaultExpanded={true}
          />
        </div>
      )
    },
    {
      id: "solution",
      title: "The Dream Within a Dream",
      subtitle: "Introducing useTransition",
      content: (
        <div className="space-y-6">
          <p>
            Cobb hands Ariadne the PASIV device. "Don't build the mountain in his reality," he says. "Build it in a deeper level."
          </p>
          <p>
            Ariadne rewires the logic using <code>useTransition</code>. Now, the keystrokes stay in Real-Time. The city construction is sent to Dream-Time.
          </p>
          <p>
            <strong>Type quickly below.</strong> Notice the input is instant. The city updates a moment later, shimmering while it calculates. The interface remains fluid.
          </p>

          <div className="bg-indigo-950/20 border border-indigo-500/30 p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 mb-2">
              <Zap size={20} />
              <span className="font-bold">Simulation: Transition Mode</span>
            </div>
            
            <input
              type="text"
              value={inputValue}
              onChange={handleTransitionChange}
              placeholder="Type quickly here..."
              className="w-full bg-slate-900 border border-indigo-500/50 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-600"
            />
            
            <div className="flex justify-between items-center">
              <div className={`text-xs font-mono transition-colors ${isPending ? 'text-indigo-400 animate-pulse' : 'text-slate-500'}`}>
                Status: {isPending ? "Constructing in background..." : "Stable"}
              </div>
              {isPending && <Activity size={16} className="text-indigo-400 animate-spin" />}
            </div>

            <div className={`transition-opacity duration-300 ${isPending ? 'opacity-50 grayscale' : 'opacity-100'}`}>
              <HeavyCityscape query={query} highlight={true} />
            </div>
          </div>

          <CodeBlock
            code={transitionCode}
            variant="success"
            title="// ✅ The Solution"
            defaultExpanded={true}
          />
        </div>
      )
    },
    {
      id: "comparison",
      title: "Synchronized Time",
      subtitle: "Side-by-Side Analysis",
      content: (
        <div className="space-y-6">
          <p>
            "Watch them together," Cobb says. On one screen, the frozen, stuttering world. On the other, the fluid, responsive dream.
          </p>
          <p>
            Use the toggle below to switch between the two architectures. Feel the difference in the "texture" of the experience.
          </p>

          <div className="bg-slate-900 border border-slate-700 p-6 rounded-lg">
            <div className="flex justify-center mb-6">
              <div className="bg-slate-800 p-1 rounded-lg flex gap-1">
                <button
                  onClick={() => { setMode("blocking"); setInputValue(""); setQuery(""); }}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all ${mode === "blocking" ? "bg-red-500/20 text-red-400 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
                >
                  Blocking (Frozen)
                </button>
                <button
                  onClick={() => { setMode("transition"); setInputValue(""); setQuery(""); }}
                  className={`px-4 py-2 rounded text-sm font-medium transition-all ${mode === "transition" ? "bg-indigo-500/20 text-indigo-400 shadow-sm" : "text-slate-400 hover:text-slate-200"}`}
                >
                  Transition (Fluid)
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                value={inputValue}
                onChange={mode === "blocking" ? handleBlockingChange : handleTransitionChange}
                placeholder={`Type quickly in ${mode} mode...`}
                className={`w-full bg-slate-950 border rounded p-3 text-white focus:outline-none focus:ring-2 transition-colors
                  ${mode === "blocking" ? "border-red-500/50 focus:ring-red-500" : "border-indigo-500/50 focus:ring-indigo-500"}
                `}
              />

              <div className="flex justify-between text-xs font-mono text-slate-500">
                <span>Mode: {mode === "blocking" ? "Synchronous Render" : "Concurrent Render"}</span>
                <span>{isPending ? "PENDING STATE ACTIVE" : "IDLE"}</span>
              </div>

              <div className={`transition-all duration-300 ${isPending ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}>
                <HeavyCityscape query={query} highlight={mode === "transition"} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-red-950/10 border border-red-900/30 rounded">
              <h4 className="font-bold text-red-400 mb-2">Blocking Approach</h4>
              <p className="text-slate-400">User Input + Heavy Render happen in the same "tick". The browser cannot paint the input letter until the list finishes rendering.</p>
            </div>
            <div className="p-4 bg-indigo-950/10 border border-indigo-900/30 rounded">
              <h4 className="font-bold text-indigo-400 mb-2">Transition Approach</h4>
              <p className="text-slate-400">User Input is high priority. Heavy Render is low priority. React interrupts the heavy render to handle new typing.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "summary",
      title: "The Architect of Time",
      subtitle: "Mastery",
      content: (
        <div className="space-y-6">
          <p>
            Ariadne looks at the two clocks. They are no longer fighting. They are partners. She has built a library where thousands of books reconfigure themselves without ever stopping the user's hand.
          </p>
          <p>
            You are now an Architect of Time. You understand that responsiveness is not just about speed—it's about prioritization.
          </p>
          
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
            <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Brain className="text-indigo-400" />
              Concept Mastery
            </h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-2">
                <div className="mt-1 bg-emerald-500/20 p-1 rounded text-emerald-400"><Zap size={14} /></div>
                <span><strong>Urgent Updates:</strong> Direct state changes (typing, clicking). Must be synchronous.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 bg-indigo-500/20 p-1 rounded text-indigo-400"><Layers size={14} /></div>
                <span><strong>Transitions:</strong> Wrapped in <code>startTransition</code>. Interruptible. The "Dream-Time" work.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-1 bg-blue-500/20 p-1 rounded text-blue-400"><Activity size={14} /></div>
                <span><strong>isPending:</strong> The flag that lets you build UI for the "in-between" state.</span>
              </li>
            </ul>
          </div>

          <div className="text-center pt-8">
            <p className="text-2xl font-serif italic text-slate-500">
              "Don't stop the world; start a transition."
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        
        {/* Header */}
        <header className="mb-12 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="text-indigo-500 w-8 h-8" />
            <h1 className="text-4xl font-bold text-slate-100 tracking-tight">Inception</h1>
          </div>
          <p className="text-xl text-slate-500 font-light">The Dream Levels • 2010</p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
                <span>Chapter {chapter + 1}</span>
                <span className="w-1 h-1 bg-indigo-400 rounded-full" />
                <span>{currentChapter.subtitle}</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-100 mb-6">{currentChapter.title}</h2>
              <div className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
                {currentChapter.content}
              </div>
            </div>
          </div>

          {/* Navigation & Progress Column */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 space-y-8">
              
              {/* Navigation Card */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-medium text-slate-500">Mission Progress</span>
                  <span className="text-sm font-mono text-indigo-400">
                    {Math.round(((chapter + 1) / chapters.length) * 100)}%
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1 bg-slate-800 rounded-full mb-8 overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-500 ease-out"
                    style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setChapter(Math.max(0, chapter - 1))}
                    disabled={chapter === 0}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={18} />
                    Previous
                  </button>
                  <button
                    onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
                    disabled={chapter === chapters.length - 1}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-indigo-900/20"
                  >
                    Next
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>

              {/* Context Card */}
              <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-6">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Architect's Notes</h4>
                <div className="space-y-3 text-sm text-slate-500">
                  <div className="flex gap-3">
                    <Clock size={16} className="shrink-0 mt-1" />
                    <p>React 18+ introduced concurrent features to solve the "blocking rendering" problem.</p>
                  </div>
                  <div className="flex gap-3">
                    <Activity size={16} className="shrink-0 mt-1" />
                    <p><code>useTransition</code> marks updates as "interruptible", keeping the UI responsive.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
      