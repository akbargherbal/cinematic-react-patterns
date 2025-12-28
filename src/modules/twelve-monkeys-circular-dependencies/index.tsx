import { useState, useMemo, useCallback, useEffect } from "react";
import { AlertCircle, ArrowRight, ArrowLeft, RefreshCw, CheckCircle, XCircle, Zap } from "lucide-react";

export default function TwelveMonkeysModule() {
  const [chapter, setChapter] = useState(0);
  const [loopActive, setLoopActive] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState(0);

  const chapters = useMemo(() => [
    {
      id: "intro",
      title: "The Mission",
      narrative: `The year is 2035. Humanity lives underground, hiding from a plague that wiped out five billion people in 1996-1997. The surface world belongs to the animals now.

James Cole sits in a metal chair, strapped down, electrodes attached to his shaved head. The scientists in their plastic suits lean forward, their voices crackling through speakers: "We need you to go back. Find the Army of the Twelve Monkeys. Find out where the virus came from. The information exists in the past—we just need you to retrieve it."

Cole nods. The mission is simple. Linear. The future needs information from the past. He'll go back, gather the data, return, and save humanity. Cause and effect. A straight line through time.`,
      concept: "In React, we build component trees the same way. Component A needs data, so it imports Component B. Component B provides that data. Simple. Linear. Parent to child. Future to past. Information flows in one direction.",
    },
    {
      id: "build",
      title: "The Paradox Emerges",
      narrative: `Cole wakes up in 1990—six years too early. He's in a mental institution. The doctors think he's insane. He tries to explain: "I'm from the future. There's going to be a plague. I need to find the Army of the Twelve Monkeys."

Dr. Kathryn Railly studies him with clinical fascination. She shows him a photograph from World War I—a soldier who looks exactly like Cole, standing in a trench in 1917. "This was taken before you were born," she says. "How do you explain that?"

Cole stares at the photograph. His face. His eyes. But it's impossible. He hasn't been to 1917. He's never been to that trench.

Or has he?`,
      concept: "This is where the paradox emerges. The photograph exists in the past, but it shows Cole—who comes from the future. The past contains evidence of the future. The future is shaped by the past. Which came first?",
    },
    {
      id: "climax",
      title: "Trapped in the Loop",
      narrative: `The airport. December 1996. Cole stands in the terminal, watching the crowds. Dr. Railly is beside him, finally believing him, finally understanding. They're trying to stop the plague before it starts.

Cole sees a man with a silver briefcase. The man is nervous, sweating. This is it—the virus carrier. Cole starts to move toward him.

Then he sees the boy.

A young boy, maybe eight years old, standing with his mother. The boy is staring at Cole with wide, terrified eyes. And Cole realizes: he's seen this before.

Not as a memory. As a dream. A recurring nightmare that's haunted him his entire life. A man running through an airport. Gunshots. A woman screaming. Blood on the floor.

He's been dreaming about his own death.`,
      concept: "The components trigger each other's re-renders in an endless cycle. FutureComponent renders, which causes PastComponent to render, which causes FutureComponent to render, forever.",
    },
    {
      id: "resolution",
      title: "Breaking the Cycle",
      narrative: `What if Cole had never been sent back?

What if the scientists in 2035 had structured their mission differently? What if, instead of sending Cole to retrieve information that his presence would create, they had found another way?

In React, breaking a circular dependency requires restructuring your component architecture. You can't have Component A and Component B directly depending on each other. You need to break the cycle.`,
      concept: "The key insight: React's component tree must be a directed acyclic graph (DAG). Dependencies must flow in one direction. Parent to child. Top to bottom. Future to past—but never back again.",
    },
    {
      id: "summary",
      title: "Causality Restored",
      narrative: `James Cole dies on the airport floor in 1996. The young boy watches, traumatized. The loop continues. The plague is released. Humanity falls. The scientists send Cole back. He dies. The boy watches. Forever.

This is what happens when you can't break the circular dependency. The system locks. The loop perpetuates. Nothing can move forward.

But in React, you have the power to break the cycle.`,
      concept: "React's component tree must be a directed acyclic graph: Dependencies flow in one direction (parent → child), and there are no cycles—you can't follow the dependency arrows and end up back where you started.",
    },
  ], []);

  const currentChapter = chapters[chapter];

  const handlePrevious = useCallback(() => {
    if (chapter > 0) {
      setChapter(c => c - 1);
      setLoopActive(false);
      setErrorCount(0);
    }
  }, [chapter]);

  const handleNext = useCallback(() => {
    if (chapter < chapters.length - 1) {
      setChapter(c => c + 1);
      setLoopActive(false);
      setErrorCount(0);
    }
  }, [chapter, chapters.length]);

  const handleAttemptRender = useCallback(() => {
    setLoopActive(true);
    setErrorCount(0);
    const interval = setInterval(() => {
      setErrorCount(c => {
        if (c >= 10) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, 200);
  }, []);

  const handleReset = useCallback(() => {
    setLoopActive(false);
    setErrorCount(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-mono">
      {/* Header */}
      <header className="border-b border-slate-800 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start gap-4">
            <Zap className="w-8 h-8 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
                Twelve Monkeys
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mt-1">
                James Cole, 1995
              </p>
              <p className="text-sm md:text-base text-amber-500 mt-2 font-semibold">
                Circular Dependencies &amp; Infinite Loops
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-20 bg-amber-500"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Narrative Section */}
          <div className="space-y-6">
            <div className="prose prose-invert prose-slate max-w-none">
              {currentChapter.narrative.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-950/20">
              <p className="text-slate-200 leading-relaxed">
                {currentChapter.concept}
              </p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <div className="space-y-6">
            {chapter === 0 &amp;&amp; <SimpleImportDemo />}
            {chapter === 1 &amp;&amp; <CircularDependencyDemo />}
            {chapter === 2 &amp;&amp; (
              <InfiniteLoopDemo
                loopActive={loopActive}
                errorCount={errorCount}
                onAttemptRender={handleAttemptRender}
                onReset={handleReset}
              />
            )}
            {chapter === 3 &amp;&amp; (
              <SolutionComparator
                selectedSolution={selectedSolution}
                onSelectSolution={setSelectedSolution}
              />
            )}
            {chapter === 4 &amp;&amp; <DAGVisualizer />}
          </div>
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={chapter === 0}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous chapter"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-2">
            {chapters.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-2 rounded-full transition-colors ${
                  idx === chapter ? "bg-amber-500" : "bg-slate-700"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-slate-400">
              {chapter + 1} / {chapters.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={chapter === chapters.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-slate-950 rounded hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-semibold"
            aria-label="Next chapter"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}

// Chapter 1 Demo: Simple Import
function SimpleImportDemo() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-emerald-500" />
        Correct: Unidirectional Flow
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-8">
          <div className="bg-slate-800 border border-emerald-500/30 rounded p-4 text-center">
            <div className="text-emerald-400 font-semibold mb-1">FutureComponent</div>
            <div className="text-xs text-slate-400">Parent</div>
          </div>
          <ArrowRight className="w-6 h-6 text-emerald-500" />
          <div className="bg-slate-800 border border-emerald-500/30 rounded p-4 text-center">
            <div className="text-emerald-400 font-semibold mb-1">PastComponent</div>
            <div className="text-xs text-slate-400">Child</div>
          </div>
        </div>

        <div className="bg-slate-950 rounded p-4 overflow-x-auto">
          <pre className="text-sm text-blue-400">
            <code>{`// FutureComponent.jsx
import { PastData } from './PastComponent';

function FutureComponent() {
  return <div>Using: {PastData}</div>;
}`}</code>
          </pre>
        </div>

        <div className="flex items-center gap-2 text-emerald-500 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Dependencies flow in one direction</span>
        </div>
      </div>
    </div>
  );
}

// Chapter 2 Demo: Circular Dependency
function CircularDependencyDemo() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-red-500" />
        Problem: Circular Reference
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-4 relative">
          <div className="bg-slate-800 border border-red-500/30 rounded p-4 text-center">
            <div className="text-red-400 font-semibold mb-1">FutureComponent</div>
            <div className="text-xs text-slate-400">imports Past</div>
          </div>
          
          <div className="flex flex-col gap-2">
            <ArrowRight className="w-6 h-6 text-red-500 animate-pulse" />
            <ArrowLeft className="w-6 h-6 text-red-500 animate-pulse" />
          </div>
          
          <div className="bg-slate-800 border border-red-500/30 rounded p-4 text-center">
            <div className="text-red-400 font-semibold mb-1">PastComponent</div>
            <div className="text-xs text-slate-400">imports Future</div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-red-500 text-sm bg-red-950/20 px-3 py-1 rounded">
            <XCircle className="w-4 h-4" />
            <span>Circular dependency detected</span>
          </div>
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors text-sm"
        >
          {showCode ? "Hide" : "Show"} Problematic Code
        </button>

        {showCode &amp;&amp; (
          <div className="bg-slate-950 rounded p-4 overflow-x-auto space-y-3">
            <pre className="text-sm text-blue-400">
              <code>{`// FutureComponent.jsx
import { PastComponent } from './PastComponent';

export function FutureComponent() {
  return <div><PastComponent /></div>;
}`}</code>
            </pre>
            <pre className="text-sm text-blue-400">
              <code>{`// PastComponent.jsx
import { FutureComponent } from './FutureComponent';

export function PastComponent() {
  return <div><FutureComponent /></div>;
}`}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

// Chapter 3 Demo: Infinite Loop
interface InfiniteLoopDemoProps {
  loopActive: boolean;
  errorCount: number;
  onAttemptRender: () => void;
  onReset: () => void;
}

function InfiniteLoopDemo({ loopActive, errorCount, onAttemptRender, onReset }: InfiniteLoopDemoProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
        <XCircle className="w-5 h-5 text-red-500" />
        Consequence: Infinite Loop
      </h3>
      
      <div className="space-y-4">
        <div className="bg-slate-950 rounded p-4 min-h-[200px] overflow-y-auto">
          {!loopActive &amp;&amp; errorCount === 0 &amp;&amp; (
            <div className="text-slate-500 text-sm text-center py-8">
              Click "Attempt Render" to see what happens...
            </div>
          )}
          {loopActive &amp;&amp; (
            <div className="space-y-2 font-mono text-xs">
              {Array.from({ length: errorCount }).map((_, idx) => (
                <div key={idx} className="text-red-400 animate-pulse">
                  Error: Maximum update depth exceeded
                  <br />
                  <span className="text-slate-500">
                    at FutureComponent → PastComponent → FutureComponent...
                  </span>
                </div>
              ))}
              {errorCount >= 10 &amp;&amp; (
                <div className="text-red-500 font-bold mt-4 p-2 bg-red-950/30 rounded">
                  ⚠ Stack Overflow - Application Crashed
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onAttemptRender}
            disabled={loopActive &amp;&amp; errorCount < 10}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            Attempt Render
          </button>
          <button
            onClick={onReset}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
            aria-label="Reset simulation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {errorCount >= 10 &amp;&amp; (
          <div className="text-xs text-slate-400 text-center">
            Neither component can render without the other already being rendered.
          </div>
        )}
      </div>
    </div>
  );
}

// Chapter 4 Demo: Solution Comparator
interface SolutionComparatorProps {
  selectedSolution: number;
  onSelectSolution: (index: number) => void;
}

function SolutionComparator({ selectedSolution, onSelectSolution }: SolutionComparatorProps) {
  const solutions = [
    {
      name: "Lift State Up",
      description: "Create a parent component that manages shared state",
      code: `// TimelineManager.jsx
function TimelineManager() {
  const [data, setData] = useState(null);
  
  return (
    <>
      <FutureComponent data={data} />
      <PastComponent onDataChange={setData} />
    </>
  );
}`,
    },
    {
      name: "Use Context",
      description: "Both components consume shared context",
      code: `// TimelineContext.jsx
const TimelineContext = createContext();

export function TimelineProvider({ children }) {
  const [data, setData] = useState(null);
  return (
    <TimelineContext.Provider value={{ data, setData }}>
      {children}
    </TimelineContext.Provider>
  );
}`,
    },
    {
      name: "Invert Dependencies",
      description: "Make dependency flow unidirectional",
      code: `// FutureComponent.jsx
export function FutureComponent() {
  const [pastData, setPastData] = useState(null);
  
  return (
    <div>
      <h1>Future: {pastData}</h1>
      <PastComponent onDataReady={setPastData} />
    </div>
  );
}`,
    },
    {
      name: "Lazy Loading",
      description: "Use dynamic imports to break circular reference",
      code: `// FutureComponent.jsx
import { lazy, Suspense } from 'react';

const PastComponent = lazy(() => 
  import('./PastComponent')
);

export function FutureComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PastComponent />
    </Suspense>
  );
}`,
    },
  ];

  const currentSolution = solutions[selectedSolution];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-emerald-500" />
        Solutions: Break the Cycle
      </h3>
      
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {solutions.map((solution, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSolution(idx)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedSolution === idx
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {solution.name}
            </button>
          ))}
        </div>

        <div className="bg-slate-950 rounded p-4">
          <div className="text-emerald-400 font-semibold mb-2">
            {currentSolution.name}
          </div>
          <div className="text-slate-400 text-sm mb-3">
            {currentSolution.description}
          </div>
          <pre className="text-xs text-blue-400 overflow-x-auto">
            <code>{currentSolution.code}</code>
          </pre>
        </div>

        <div className="flex items-center gap-2 text-emerald-500 text-sm">
          <CheckCircle className="w-4 h-4" />
          <span>Circular dependency eliminated</span>
        </div>
      </div>
    </div>
  );
}

// Chapter 5 Demo: DAG Visualizer
function DAGVisualizer() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-bold text-slate-100 mb-4">
        DAG vs Cycle: The Difference
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Circular - Bad */}
        <div className="space-y-3">
          <div className="text-red-400 font-semibold text-sm flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Circular (Bad)
          </div>
          <div className="bg-slate-950 rounded p-4 border border-red-500/30">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-red-950/30 border border-red-500/50 rounded px-3 py-2 text-red-400 text-sm">
                Component A
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-red-500 rotate-90" />
                <ArrowLeft className="w-4 h-4 text-red-500 -rotate-90" />
              </div>
              <div className="bg-red-950/30 border border-red-500/50 rounded px-3 py-2 text-red-400 text-sm">
                Component B
              </div>
            </div>
            <div className="text-xs text-slate-500 text-center mt-3">
              A → B → A (cycle!)
            </div>
          </div>
        </div>

        {/* DAG - Good */}
        <div className="space-y-3">
          <div className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            DAG (Good)
          </div>
          <div className="bg-slate-950 rounded p-4 border border-emerald-500/30">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-emerald-950/30 border border-emerald-500/50 rounded px-3 py-2 text-emerald-400 text-sm">
                Parent
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-500 rotate-90" />
              <div className="flex gap-3">
                <div className="bg-emerald-950/30 border border-emerald-500/50 rounded px-3 py-2 text-emerald-400 text-sm">
                  Child A
                </div>
                <div className="bg-emerald-950/30 border border-emerald-500/50 rounded px-3 py-2 text-emerald-400 text-sm">
                  Child B
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-500 text-center mt-3">
              Parent → Children (no cycles)
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-emerald-950/20 border border-emerald-500/30 rounded p-4">
        <div className="text-emerald-400 font-semibold text-sm mb-2">
          Key Principle
        </div>
        <div className="text-slate-300 text-sm">
          React's component tree must be a <strong>Directed Acyclic Graph</strong>:
          dependencies flow in one direction (parent → child), and you can't follow
          the arrows back to where you started.
        </div>
      </div>
    </div>
  );
}