import { useState, useMemo, useCallback, useEffect } from "react";
import {
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  XCircle,
  Zap,
} from "lucide-react";

export default function TwelveMonkeysModule() {
  const [chapter, setChapter] = useState(0);
  const [loopActive, setLoopActive] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [selectedSolution, setSelectedSolution] = useState(0);

  const chapters = useMemo(
    () => [
      {
        id: "intro",
        title: "The Mission",
        narrative: `The year is 2035. Humanity lives underground, hiding from a plague that wiped out five billion people in 1996-1997. The surface world belongs to the animals now.

James Cole sits in a metal chair, strapped down, electrodes attached to his shaved head. The scientists in their plastic suits lean forward, their voices crackling through speakers: "We need you to go back. Find the Army of the Twelve Monkeys. Find out where the virus came from. The information exists in the past—we just need you to retrieve it."

Cole nods. The mission is simple. Linear. The future needs information from the past. He'll go back, gather the data, return, and save humanity. Cause and effect. A straight line through time.`,
        concept:
          "In React, we build component trees the same way. Component A needs data, so it imports Component B. Component B provides that data. Simple. Linear. Parent to child. Future to past. Information flows in one direction.",
      },
      {
        id: "build",
        title: "The Paradox Emerges",
        narrative: `Cole wakes up in 1990—six years too early. He's in a mental institution. The doctors think he's insane. He tries to explain: "I'm from the future. There's going to be a plague. I need to find the Army of the Twelve Monkeys."

Dr. Kathryn Railly studies him with clinical fascination. She shows him a photograph from World War I—a soldier who looks exactly like Cole, standing in a trench in 1917. "This was taken before you were born," she says. "How do you explain that?"

Cole stares at the photograph. His face. His eyes. But it's impossible. He hasn't been to 1917. He's never been to that trench.

Or has he?`,
        concept:
          "This is where the paradox emerges. The photograph exists in the past, but it shows Cole—who comes from the future. The past contains evidence of the future. The future is shaped by the past. Which came first?",
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
        concept:
          "The components trigger each other's re-renders in an endless cycle. FutureComponent renders, which causes PastComponent to render, which causes FutureComponent to render, forever.",
      },
      {
        id: "resolution",
        title: "Breaking the Cycle",
        narrative: `What if Cole had never been sent back?

What if the scientists in 2035 had structured their mission differently? What if, instead of sending Cole to retrieve information that his presence would create, they had found another way?

In React, breaking a circular dependency requires restructuring your component architecture. You can't have Component A and Component B directly depending on each other. You need to break the cycle.`,
        concept:
          "The key insight: React's component tree must be a directed acyclic graph (DAG). Dependencies must flow in one direction. Parent to child. Top to bottom. Future to past—but never back again.",
      },
      {
        id: "summary",
        title: "Causality Restored",
        narrative: `James Cole dies on the airport floor in 1996. The young boy watches, traumatized. The loop continues. The plague is released. Humanity falls. The scientists send Cole back. He dies. The boy watches. Forever.

This is what happens when you can't break the circular dependency. The system locks. The loop perpetuates. Nothing can move forward.

But in React, you have the power to break the cycle.`,
        concept:
          "React's component tree must be a directed acyclic graph: Dependencies flow in one direction (parent → child), and there are no cycles—you can't follow the dependency arrows and end up back where you started.",
      },
    ],
    [],
  );

  const currentChapter = chapters[chapter];

  const handlePrevious = useCallback(() => {
    if (chapter > 0) {
      setChapter((c) => c - 1);
      setLoopActive(false);
      setErrorCount(0);
    }
  }, [chapter]);

  const handleNext = useCallback(() => {
    if (chapter < chapters.length - 1) {
      setChapter((c) => c + 1);
      setLoopActive(false);
      setErrorCount(0);
    }
  }, [chapter, chapters.length]);

  const handleAttemptRender = useCallback(() => {
    setLoopActive(true);
    setErrorCount(0);
    const interval = setInterval(() => {
      setErrorCount((c) => {
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
    <div className="min-h-screen bg-slate-950 font-mono text-slate-300">
      {/* Header */}
      <header className="border-b border-slate-800 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-start gap-4">
            <Zap className="mt-1 h-8 w-8 flex-shrink-0 text-amber-500" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-100 md:text-4xl">
                Twelve Monkeys
              </h1>
              <p className="mt-1 text-lg text-slate-400 md:text-xl">
                James Cole, 1995
              </p>
              <p className="mt-2 text-sm font-semibold text-amber-500 md:text-base">
                Circular Dependencies & Infinite Loops
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 pb-32 md:px-6 md:py-12">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-slate-100 md:text-3xl">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-20 bg-amber-500"></div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Narrative Section */}
          <div className="space-y-6">
            <div className="prose prose-invert prose-slate max-w-none">
              {currentChapter.narrative.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="border-l-4 border-amber-500 bg-amber-950/20 py-2 pl-4">
              <p className="leading-relaxed text-slate-200">
                {currentChapter.concept}
              </p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <div className="space-y-6">
            {chapter === 0 && <SimpleImportDemo />}
            {chapter === 1 && <CircularDependencyDemo />}
            {chapter === 2 && (
              <InfiniteLoopDemo
                loopActive={loopActive}
                errorCount={errorCount}
                onAttemptRender={handleAttemptRender}
                onReset={handleReset}
              />
            )}
            {chapter === 3 && (
              <SolutionComparator
                selectedSolution={selectedSolution}
                onSelectSolution={setSelectedSolution}
              />
            )}
            {chapter === 4 && <DAGVisualizer />}
          </div>
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/95 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={chapter === 0}
            className="flex items-center gap-2 rounded bg-slate-800 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous chapter"
          >
            <ArrowLeft className="h-4 w-4" />
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
            className="flex items-center gap-2 rounded bg-amber-600 px-4 py-2 font-semibold text-slate-950 transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next chapter"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}

// Chapter 1 Demo: Simple Import
function SimpleImportDemo() {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-100">
        <CheckCircle className="h-5 w-5 text-emerald-500" />
        Correct: Unidirectional Flow
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-center gap-8">
          <div className="rounded border border-emerald-500/30 bg-slate-800 p-4 text-center">
            <div className="mb-1 font-semibold text-emerald-400">
              FutureComponent
            </div>
            <div className="text-xs text-slate-400">Parent</div>
          </div>
          <ArrowRight className="h-6 w-6 text-emerald-500" />
          <div className="rounded border border-emerald-500/30 bg-slate-800 p-4 text-center">
            <div className="mb-1 font-semibold text-emerald-400">
              PastComponent
            </div>
            <div className="text-xs text-slate-400">Child</div>
          </div>
        </div>

        <div className="overflow-x-auto rounded bg-slate-950 p-4">
          <pre className="text-sm text-blue-400">
            <code>{`// FutureComponent.jsx
import { PastData } from './PastComponent';

function FutureComponent() {
  return <div>Using: {PastData}</div>;
}`}</code>
          </pre>
        </div>

        <div className="flex items-center gap-2 text-sm text-emerald-500">
          <CheckCircle className="h-4 w-4" />
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
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-100">
        <AlertCircle className="h-5 w-5 text-red-500" />
        Problem: Circular Reference
      </h3>

      <div className="space-y-4">
        <div className="relative flex items-center justify-center gap-4">
          <div className="rounded border border-red-500/30 bg-slate-800 p-4 text-center">
            <div className="mb-1 font-semibold text-red-400">
              FutureComponent
            </div>
            <div className="text-xs text-slate-400">imports Past</div>
          </div>

          <div className="flex flex-col gap-2">
            <ArrowRight className="h-6 w-6 animate-pulse text-red-500" />
            <ArrowLeft className="h-6 w-6 animate-pulse text-red-500" />
          </div>

          <div className="rounded border border-red-500/30 bg-slate-800 p-4 text-center">
            <div className="mb-1 font-semibold text-red-400">PastComponent</div>
            <div className="text-xs text-slate-400">imports Future</div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded bg-red-950/20 px-3 py-1 text-sm text-red-500">
            <XCircle className="h-4 w-4" />
            <span>Circular dependency detected</span>
          </div>
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          className="w-full rounded bg-slate-800 px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700"
        >
          {showCode ? "Hide" : "Show"} Problematic Code
        </button>

        {showCode && (
          <div className="space-y-3 overflow-x-auto rounded bg-slate-950 p-4">
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

function InfiniteLoopDemo({
  loopActive,
  errorCount,
  onAttemptRender,
  onReset,
}: InfiniteLoopDemoProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-100">
        <XCircle className="h-5 w-5 text-red-500" />
        Consequence: Infinite Loop
      </h3>

      <div className="space-y-4">
        <div className="min-h-[200px] overflow-y-auto rounded bg-slate-950 p-4">
          {!loopActive && errorCount === 0 && (
            <div className="py-8 text-center text-sm text-slate-500">
              Click "Attempt Render" to see what happens...
            </div>
          )}
          {loopActive && (
            <div className="space-y-2 font-mono text-xs">
              {Array.from({ length: errorCount }).map((_, idx) => (
                <div key={idx} className="animate-pulse text-red-400">
                  Error: Maximum update depth exceeded
                  <br />
                  <span className="text-slate-500">
                    at FutureComponent → PastComponent → FutureComponent...
                  </span>
                </div>
              ))}
              {errorCount >= 10 && (
                <div className="mt-4 rounded bg-red-950/30 p-2 font-bold text-red-500">
                  ⚠ Stack Overflow - Application Crashed
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onAttemptRender}
            disabled={loopActive && errorCount < 10}
            className="flex-1 rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Attempt Render
          </button>
          <button
            onClick={onReset}
            className="rounded bg-slate-800 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-700"
            aria-label="Reset simulation"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {errorCount >= 10 && (
          <div className="text-center text-xs text-slate-400">
            Neither component can render without the other already being
            rendered.
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

function SolutionComparator({
  selectedSolution,
  onSelectSolution,
}: SolutionComparatorProps) {
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
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-100">
        <CheckCircle className="h-5 w-5 text-emerald-500" />
        Solutions: Break the Cycle
      </h3>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {solutions.map((solution, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSolution(idx)}
              className={`rounded px-3 py-1 text-sm transition-colors ${
                selectedSolution === idx
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {solution.name}
            </button>
          ))}
        </div>

        <div className="rounded bg-slate-950 p-4">
          <div className="mb-2 font-semibold text-emerald-400">
            {currentSolution.name}
          </div>
          <div className="mb-3 text-sm text-slate-400">
            {currentSolution.description}
          </div>
          <pre className="overflow-x-auto text-xs text-blue-400">
            <code>{currentSolution.code}</code>
          </pre>
        </div>

        <div className="flex items-center gap-2 text-sm text-emerald-500">
          <CheckCircle className="h-4 w-4" />
          <span>Circular dependency eliminated</span>
        </div>
      </div>
    </div>
  );
}

// Chapter 5 Demo: DAG Visualizer
function DAGVisualizer() {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h3 className="mb-4 text-lg font-bold text-slate-100">
        DAG vs Cycle: The Difference
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Circular - Bad */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-red-400">
            <XCircle className="h-4 w-4" />
            Circular (Bad)
          </div>
          <div className="rounded border border-red-500/30 bg-slate-950 p-4">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded border border-red-500/50 bg-red-950/30 px-3 py-2 text-sm text-red-400">
                Component A
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 rotate-90 text-red-500" />
                <ArrowLeft className="h-4 w-4 -rotate-90 text-red-500" />
              </div>
              <div className="rounded border border-red-500/50 bg-red-950/30 px-3 py-2 text-sm text-red-400">
                Component B
              </div>
            </div>
            <div className="mt-3 text-center text-xs text-slate-500">
              A → B → A (cycle!)
            </div>
          </div>
        </div>

        {/* DAG - Good */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
            <CheckCircle className="h-4 w-4" />
            DAG (Good)
          </div>
          <div className="rounded border border-emerald-500/30 bg-slate-950 p-4">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded border border-emerald-500/50 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-400">
                Parent
              </div>
              <ArrowRight className="h-4 w-4 rotate-90 text-emerald-500" />
              <div className="flex gap-3">
                <div className="rounded border border-emerald-500/50 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-400">
                  Child A
                </div>
                <div className="rounded border border-emerald-500/50 bg-emerald-950/30 px-3 py-2 text-sm text-emerald-400">
                  Child B
                </div>
              </div>
            </div>
            <div className="mt-3 text-center text-xs text-slate-500">
              Parent → Children (no cycles)
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded border border-emerald-500/30 bg-emerald-950/20 p-4">
        <div className="mb-2 text-sm font-semibold text-emerald-400">
          Key Principle
        </div>
        <div className="text-sm text-slate-300">
          React's component tree must be a{" "}
          <strong>Directed Acyclic Graph</strong>: dependencies flow in one
          direction (parent → child), and you can't follow the arrows back to
          where you started.
        </div>
      </div>
    </div>
  );
}
