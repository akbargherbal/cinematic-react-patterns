import { useState, useMemo, useCallback } from "react";
import { Moon, AlertTriangle, CheckCircle, Code, Eye } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface Instance {
  id: number;
  x: number;
  y: number;
  state: string;
  color: string;
}

export default function MoonSingletonPattern() {
  const [chapter, setChapter] = useState(0);
  const [instances, setInstances] = useState<Instance[]>([
    { id: 1, x: 50, y: 50, state: "healthy", color: "bg-blue-400" },
  ]);
  const [patternMode, setPatternMode] = useState<"broken" | "proper">("broken");

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "The Only One",
        content:
          "Sam Bell knows he's alone. Three years on the lunar surface, mining helium-3 in the Sarang station, and he's never seen another human being. Just him, the machines, and GERTY—the AI assistant with the calm voice and the glowing yellow eye that follows him through every corridor. This is the promise of the singleton pattern: one instance, globally accessible, maintaining state across the entire system.",
      },
      {
        id: "build",
        title: "Cracks in the System",
        content:
          "Sam can't let it go. Against GERTY's advice, he takes a rover back to Harvester 4. The crashed vehicle is real—twisted metal and shattered glass on the lunar surface. And inside, slumped over the controls, is a man in a Lunar Industries suit. His face. This is the nightmare scenario for any singleton pattern: discovering that multiple instances exist when you believed there was only one.",
      },
      {
        id: "climax",
        title: "Two Sams, One Moon",
        content:
          "The station feels smaller with two Sams in it. They move around each other awkwardly, two instances of the same component trying to occupy the same space. Every Sam clone is implanted with the same base memories—Tess, Eve, the house, the recruitment. This shared state makes each Sam believe he's the continuation of the original. But the state isn't truly shared. Each Sam is a separate instance with a copy of the state.",
      },
      {
        id: "resolution",
        title: "The Truth About GERTY",
        content:
          "GERTY opens the full database. Hundreds of Sam Bells, spanning decades. Each one lived for three years, believed he was the original, and died thinking he was going home. The company never intended a true singleton—they wanted a renewable resource that felt like a singleton to each instance. This is the anti-pattern: they wanted singleton behavior without the commitment, so they faked it.",
      },
      {
        id: "summary",
        title: "Breaking the Pattern",
        content:
          "The story of Sam Bell is the story of every developer who's reached for the singleton pattern without understanding its true cost. Sam didn't need to be a singleton. He needed proper support, honest communication, and acknowledgment of his humanity. Similarly, your component doesn't need to be a singleton—it needs proper state management.",
      },
    ],
    [],
  );

  const currentChapter = chapters[chapter];

  const createInstance = useCallback(() => {
    const newInstance: Instance = {
      id: instances.length + 1,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      state: `diverged-${instances.length + 1}`,
      color: instances.length === 0 ? "bg-blue-400" : "bg-red-400",
    };
    setInstances((prev) => [...prev, newInstance]);
  }, [instances.length]);

  const resetInstances = useCallback(() => {
    setInstances([
      { id: 1, x: 50, y: 50, state: "healthy", color: "bg-blue-400" },
    ]);
  }, []);

  const handlePrevious = useCallback(() => {
    setChapter((c) => Math.max(0, c - 1));
  }, []);

  const handleNext = useCallback(() => {
    setChapter((c) => Math.min(chapters.length - 1, c + 1));
  }, [chapters.length]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Moon className="h-10 w-10 text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">
                Moon: Singleton Pattern
              </h1>
              <p className="mt-1 text-sm text-slate-400 sm:text-base">
                Sam Bell, Lunar Station Sarang, 2009
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 pb-32 sm:px-6 lg:px-8">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-slate-100 sm:text-3xl">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 rounded-full bg-blue-400"></div>
        </div>

        {/* Chapter Content */}
        <div className="mb-8 grid gap-8 lg:grid-cols-2">
          {/* Narrative */}
          <div className="prose prose-invert prose-slate max-w-none">
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              {currentChapter.content}
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="space-y-6">
            {/* Chapter 0-1: Single Instance Demo */}
            {(chapter === 0 || chapter === 1) && (
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-slate-100">
                    GERTY Monitoring System
                  </h3>
                </div>

                <div className="relative mb-4 h-64 overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
                  {/* GERTY Eye */}
                  <div className="absolute right-4 top-4">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>
                  </div>

                  {/* Instance Visualization */}
                  {instances.map((instance) => (
                    <div
                      key={instance.id}
                      className={`absolute h-12 w-12 rounded-full ${instance.color} shadow-lg transition-all duration-500`}
                      style={{
                        left: `${instance.x}%`,
                        top: `${instance.y}%`,
                        transform: "translate(-50%, -50%)",
                        boxShadow: `0 0 20px ${instance.color === "bg-blue-400" ? "rgba(96, 165, 250, 0.5)" : "rgba(248, 113, 113, 0.5)"}`,
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-950">
                        {instance.id}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Instance Count:</span>
                    <span
                      className={`font-mono font-bold ${instances.length === 1 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {instances.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Pattern Status:</span>
                    <span
                      className={`font-mono font-bold ${instances.length === 1 ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {instances.length === 1 ? "SINGLETON" : "VIOLATED"}
                    </span>
                  </div>
                </div>

                {chapter === 1 && (
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={createInstance}
                      className="w-full rounded border border-red-500/50 bg-red-500/20 px-4 py-2 font-medium text-red-400 transition-colors hover:bg-red-500/30"
                    >
                      Discover Another Instance
                    </button>
                    <button
                      onClick={resetInstances}
                      className="w-full rounded border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700"
                    >
                      Reset System
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Chapter 2: State Conflict Demo */}
            {chapter === 2 && (
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h3 className="text-lg font-semibold text-slate-100">
                    State Conflict Detected
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border border-red-500/30 bg-slate-950 p-4">
                    <div className="mb-2 font-mono text-xs text-slate-400">
                      Instance 1 State:
                    </div>
                    <div className="font-mono text-sm text-blue-400">
                      {`{ memories: "Tess, Eve, Earth", years: 3, health: "failing" }`}
                    </div>
                  </div>

                  <div className="rounded-lg border border-red-500/30 bg-slate-950 p-4">
                    <div className="mb-2 font-mono text-xs text-slate-400">
                      Instance 2 State:
                    </div>
                    <div className="font-mono text-sm text-red-400">
                      {`{ memories: "Tess, Eve, Earth", years: 0, health: "healthy" }`}
                    </div>
                  </div>

                  <div className="flex items-start gap-2 rounded border border-red-500/30 bg-red-500/10 p-3">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                    <p className="text-xs text-red-300">
                      Two instances with identical base state but diverging
                      runtime state. This is the catastrophic failure mode of a
                      broken singleton pattern.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 3-4: Pattern Comparison */}
            {(chapter === 3 || chapter === 4) && (
              <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-slate-100">
                    Pattern Comparison
                  </h3>
                </div>

                <div className="mb-4 flex gap-2">
                  <button
                    onClick={() => setPatternMode("broken")}
                    className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors ${
                      patternMode === "broken"
                        ? "border border-red-500/50 bg-red-500/20 text-red-400"
                        : "border border-slate-700 bg-slate-800 text-slate-400"
                    }`}
                  >
                    Broken Singleton
                  </button>
                  <button
                    onClick={() => setPatternMode("proper")}
                    className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-colors ${
                      patternMode === "proper"
                        ? "border border-emerald-500/50 bg-emerald-500/20 text-emerald-400"
                        : "border border-slate-700 bg-slate-800 text-slate-400"
                    }`}
                  >
                    Proper Context
                  </button>
                </div>

                {patternMode === "broken" ? (
                  <div className="space-y-3">
                    <div className="rounded border border-red-500/30 bg-slate-950 p-3">
                      <pre className="overflow-x-auto font-mono text-xs text-red-300">
                        {`// Fake singleton - multiple instances
const GlobalState = {
  user: null,
  settings: {}
};

// Each import creates new instance!
export default GlobalState;`}
                      </pre>
                    </div>
                    <div className="flex items-start gap-2 rounded bg-red-500/10 p-2 text-xs text-red-300">
                      <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0" />
                      <span>Module bundler may create multiple instances</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="rounded border border-emerald-500/30 bg-slate-950 p-3">
                      <pre className="overflow-x-auto font-mono text-xs text-emerald-300">
                        {`// Proper Context pattern
const StateContext = createContext();

function App() {
  return (
    <StateContext.Provider value={state}>
      {children}
    </StateContext.Provider>
  );
}`}
                      </pre>
                    </div>
                    <div className="flex items-start gap-2 rounded bg-emerald-500/10 p-2 text-xs text-emerald-300">
                      <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0" />
                      <span>Explicit provider, clear state management</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Chapter 4: Best Practices */}
            {chapter === 4 && (
              <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-100">
                  When to Use Each Pattern
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    <div>
                      <div className="font-medium text-slate-200">
                        React Context
                      </div>
                      <div className="text-xs text-slate-400">
                        Shared state in component tree
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    <div>
                      <div className="font-medium text-slate-200">
                        State Libraries
                      </div>
                      <div className="text-xs text-slate-400">
                        Complex global state (Redux, Zustand)
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                    <div>
                      <div className="font-medium text-slate-200">
                        True Singletons
                      </div>
                      <div className="text-xs text-slate-400">
                        Config objects, connection managers (rare)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Key Takeaway */}
        {chapter === 4 && (
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-6">
            <div className="flex items-start gap-3">
              <Moon className="mt-1 h-6 w-6 flex-shrink-0 text-blue-400" />
              <div>
                <h3 className="mb-2 text-lg font-semibold text-slate-100">
                  The Lesson from the Moon
                </h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  Sam Bell didn't need to be a singleton. He needed proper
                  support, honest communication, and acknowledgment of his
                  humanity. Similarly, your component doesn't need to be a
                  singleton—it needs proper state management. Break the pattern.
                  Build something honest.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="rounded border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:text-base"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === chapter
                      ? "w-8 bg-blue-400"
                      : idx < chapter
                        ? "bg-blue-400/50"
                        : "bg-slate-700"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="rounded border border-blue-400 bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:text-base"
            >
              Next
            </button>
          </div>

          <div className="mt-2 text-center">
            <span className="text-xs text-slate-400 sm:text-sm">
              Chapter {chapter + 1} of {chapters.length}: {currentChapter.title}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
