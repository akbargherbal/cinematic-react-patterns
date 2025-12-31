import { useState, useEffect, useRef } from "react";
import {
  Crown,
  Sun,
  Moon,
  CloudRain,
  AlertCircle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
  atmosphere: string;
}

export default function ComponentLifecycleCircleOfLife(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [mounted, setMounted] = useState<boolean>(false);
  const [leakyIntervals, setLeakyIntervals] = useState<number>(0);
  const [activeCleanup, setActiveCleanup] = useState<boolean>(false);
  const [componentCount, setComponentCount] = useState<number>(0);
  const [kingdomState, setKingdomState] = useState<"healthy" | "decaying">(
    "healthy",
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const leakyIntervalsRef = useRef<Set<NodeJS.Timeout>>(new Set());

  // Circuit breaker for memory leaks
  useEffect(() => {
    if (leakyIntervals > 50) {
      resetLeaks();
    }
  }, [leakyIntervals]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      leakyIntervalsRef.current.forEach((interval) => clearInterval(interval));
      leakyIntervalsRef.current.clear();
    };
  }, []);

  const chapters: Chapter[] = [
    {
      title: "The Circle of Life",
      content:
        "The sun breaks over the savanna, casting everything in warm gold. At Pride Rock, Rafiki presents newborn Simba to the kingdom—this is component mounting. The component is now live and visible in the DOM. Mufasa explains the Circle of Life: 'A king's time as ruler rises and falls like the sun.' This is the fundamental pattern: mount, update, unmount. The Circle of Life isn't a suggestion; it's the law of the render cycle.",
      atmosphere: "majestic, foundational, orderly",
    },
    {
      title: "The Hakuna Matata Problem",
      content:
        "Simba lives carefree in the jungle with Timon and Pumbaa—'Hakuna Matata.' This is a component that has mounted but ignores all props and state updates. Nala arrives with urgent news: the Pride Lands are devastated under Scar's rule. This is a critical prop change demanding re-render. Simba refuses: 'I can't go back.' The component actively rejects updates, leaving the application broken. 'Hakuna Matata' just means 'no cleanup functions'—and the consequences are piling up.",
      atmosphere: "irresponsible, decaying, tense",
    },
    {
      title: "Remember Who You Are",
      content:
        "Simba stares at his reflection, lost. Rafiki guides him: 'Look harder.' This is debugging, inspecting the component's true identity. Mufasa's ghost appears in storm clouds: 'Remember who you are. You must take your place in the Circle of Life.' This is the useEffect hook—a directive to act based on your dependencies. The component finally understands its purpose. Remember who you are: a component with an effect.",
      atmosphere: "mysterious, epic, revelatory",
    },
    {
      title: "The Two Kingdoms",
      content:
        "APPROACH A: The Kingdom of Ignored Updates. The Pride Lands are grey and barren. Hyenas (memory leaks) laugh as they fight over scraps. The application is broken, slow, and dying. This is the UI of 'Hakuna Matata'—no cleanup, no updates. APPROACH B: The Kingdom of the Lifecycle. After the fight, cleansing rain falls—the useEffect cleanup function. The land transforms to vibrant green. The component accepted props, updated state, and ran cleanup. The UI is restored, healthy, and performant. One king's rule rises and falls like the sun. One component mounts, updates, and unmounts.",
      atmosphere: "reflective, comparative, analytical",
    },
    {
      title: "The Cycle is Complete",
      content:
        "The sun rises again. Rafiki presents Simba's cub on Pride Rock—a new component mounting. The scene mirrors the opening, demonstrating the reusable lifecycle pattern. The Pride Lands thrive in perfect balance. The chaos of Scar's reign is a lesson learned. By understanding and respecting the three phases—mounting, updating, and unmounting—the application doesn't just run; it thrives. The cycle is complete. The state is in balance.",
      atmosphere: "celebratory, confident, complete",
    },
  ];

  // Code examples
  const mountingCode = `// Chapter 1: Mounting - Simba's Presentation
function SimbaComponent() {
  const [isPresented, setIsPresented] = useState(false);

  useEffect(() => {
    // This runs once when component mounts
    console.log("🦁 Simba presented at Pride Rock!");
    setIsPresented(true);
    
    // Optional: Setup that needs cleanup
    const roarTimer = setTimeout(() => {
      console.log("👑 The kingdom acknowledges the new king!");
    }, 1000);

    // Cleanup function (optional for mount-only)
    return () => clearTimeout(roarTimer);
  }, []); // Empty array = mount only

  return <div>{isPresented ? "King of the Pride Lands" : "Hidden cub"}</div>;
}`;

  const leakyCode = `// Chapter 2: Hakuna Matata Bug - No Cleanup
function LeakySimba() {
  const [grubCount, setGrubCount] = useState(0);

  useEffect(() => {
    // ❌ BUG: Missing cleanup function
    setInterval(() => {
      setGrubCount(c => c + 1);
      console.log("🍖 Eating another grub...");
    }, 1000);
    
    // Missing: return () => clearInterval(interval);
  }, []); // Empty array means effect runs once

  return <div>Grubs eaten: {grubCount}</div>;
}`;

  const fixedCode = `// Chapter 3: Remember useEffect - With Cleanup
function ResponsibleSimba() {
  const [responsibility, setResponsibility] = useState(0);
  const [isRuling, setIsRuling] = useState(false);

  useEffect(() => {
    if (!isRuling) return;
    
    console.log("👑 Simba takes the throne");
    const ruleTimer = setInterval(() => {
      setResponsibility(r => r + 1);
    }, 1000);

    // ✅ CORRECT: Cleanup function
    return () => {
      console.log("🔄 Preparing for next king...");
      clearInterval(ruleTimer);
    };
  }, [isRuling]); // ✅ Dependencies listed

  return (
    <div>
      <button onClick={() => setIsRuling(!isRuling)}>
        {isRuling ? "Abdicate Throne" : "Accept Responsibility"}
      </button>
      <p>Years ruled responsibly: {responsibility}</p>
    </div>
  );
}`;

  const comparisonCode = `// Chapter 4: Kingdom Comparison
function PrideLands({ withCleanup }: { withCleanup: boolean }) {
  const [hyenas, setHyenas] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHyenas(h => h + 1);
    }, 500);

    if (withCleanup) {
      // ✅ Kingdom Restored: Cleanup prevents hyena accumulation
      return () => clearInterval(interval);
    }
    
    // ❌ Hakuna Matata: Hyenas keep multiplying
    // No cleanup = memory leak
  }, [withCleanup]);

  return (
    <div className={hyenas > 10 ? "text-red-500" : "text-green-500"}>
      Hyenas in Pride Lands: {hyenas}
      {hyenas > 10 && " ⚠️ Kingdom decaying!"}
    </div>
  );
}`;

  const fullCycleCode = `// Chapter 5: Complete Lifecycle
function CircleOfLifeComponent() {
  const [phase, setPhase] = useState<'mount' | 'update' | 'unmount'>('mount');
  const [resources, setResources] = useState<string[]>([]);

  // Mount phase
  useEffect(() => {
    if (phase === 'mount') {
      console.log("🌅 Component mounted at Pride Rock");
      setResources(['Water', 'Antelope', 'Sunlight']);
      
      // Setup that needs cleanup
      const sunriseTimer = setInterval(() => {
        console.log("☀️ Another day in the Circle of Life");
      }, 2000);
      
      return () => {
        clearInterval(sunriseTimer);
        console.log("🌄 Cleanup before update/unmount");
      };
    }
  }, [phase]);

  return (
    <div>
      <p>Current phase: {phase}</p>
      <p>Kingdom resources: {resources.join(', ')}</p>
      <div className="flex gap-2">
        <button onClick={() => setPhase('mount')}>Mount</button>
        <button onClick={() => setPhase('update')}>Update</button>
        <button onClick={() => setPhase('unmount')}>Unmount</button>
      </div>
    </div>
  );
}`;

  // Demo functions
  const triggerMemoryLeak = () => {
    const interval = setInterval(() => {
      setLeakyIntervals((prev) => {
        const newCount = prev + 1;
        if (newCount % 10 === 0) {
          setKingdomState("decaying");
        }
        return newCount;
      });
    }, 300);
    leakyIntervalsRef.current.add(interval);
  };

  const resetLeaks = () => {
    leakyIntervalsRef.current.forEach((interval) => clearInterval(interval));
    leakyIntervalsRef.current.clear();
    setLeakyIntervals(0);
    setKingdomState("healthy");
  };

  const toggleMount = () => {
    setMounted(!mounted);
    if (!mounted) {
      intervalRef.current = setInterval(() => {
        setComponentCount((c) => c + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const currentChapter = chapters[chapter];
  const progress = ((chapter + 1) / chapters.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-stone-900 to-amber-950 p-4 font-serif text-amber-100 md:p-8">
      {/* Header */}
      <header className="mb-8 border-b border-amber-800/50 bg-amber-950/40 backdrop-blur-sm md:mb-12">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <Crown className="h-6 w-6 text-amber-400 md:h-8 md:w-8" />
              <h1 className="text-xl font-bold tracking-tight md:text-3xl">
                The Lion King
              </h1>
            </div>
            <p className="text-xs text-amber-300/70 md:text-base">
              Simba • Pride Lands • 1994
            </p>
          </div>
          <p className="text-base font-medium text-amber-400 md:text-lg">
            Component Lifecycle: Mount, Update, Unmount
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-4">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12">
          {/* Left Column: Narrative */}
          <div className="space-y-6 lg:col-span-4">
            <div className="rounded-xl border border-amber-800/30 bg-amber-950/30 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-4 flex items-center gap-3">
                <Sun className="h-5 w-5 text-amber-400" />
                <h2 className="text-2xl font-bold text-amber-200 md:text-3xl">
                  {currentChapter.title}
                </h2>
              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                <p className="mb-6 leading-relaxed text-amber-100/90">
                  {currentChapter.content}
                </p>

                <div className="flex items-center gap-2 text-sm text-amber-400/70">
                  <CloudRain className="h-4 w-4" />
                  <span>Atmosphere: {currentChapter.atmosphere}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="mb-2 flex justify-between text-sm text-amber-300/70">
                  <span>
                    Chapter {chapter + 1} of {chapters.length}
                  </span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-amber-900/50">
                  <div
                    className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Demos */}
          <div className="space-y-6 lg:col-span-8">
            {/* Chapter 1: Mounting Demo */}
            {chapter === 0 && (
              <div className="rounded-xl border border-amber-700/30 bg-stone-900/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-300">
                  <Sun className="h-5 w-5" />
                  Mounting Ceremony
                </h3>

                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setMounted(true)}
                      disabled={mounted}
                      className="rounded bg-amber-700 px-4 py-2 text-white hover:bg-amber-600 disabled:opacity-50"
                    >
                      Present Simba (Mount)
                    </button>
                    <button
                      onClick={() => setMounted(false)}
                      disabled={!mounted}
                      className="rounded bg-stone-700 px-4 py-2 text-white hover:bg-stone-600 disabled:opacity-50"
                    >
                      Hide (Unmount)
                    </button>
                  </div>

                  <div className="rounded-lg border border-amber-800/50 p-4 text-center">
                    {mounted ? (
                      <div className="flex items-center justify-center gap-3 text-amber-300">
                        <Crown className="h-6 w-6" />
                        <span className="text-xl">
                          👑 Simba is King of the Pride Lands 👑
                        </span>
                        <Crown className="h-6 w-6" />
                      </div>
                    ) : (
                      <div className="text-stone-500 italic">
                        Simba is hidden in the jungle...
                      </div>
                    )}
                  </div>
                </div>

                <CodeBlock
                  code={mountingCode}
                  variant="success"
                  title="// ✅ Mounting with useEffect"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 2: Memory Leak Demo */}
            {chapter === 1 && (
              <div className="rounded-xl border border-red-700/40 bg-stone-900/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-red-300">
                  <AlertCircle className="h-5 w-5" />
                  Hakuna Matata Memory Leak
                </h3>

                <div className="mb-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={triggerMemoryLeak}
                      className="rounded bg-red-700 px-4 py-3 text-white hover:bg-red-600"
                    >
                      🐛 Create Leaky Interval
                    </button>
                    <button
                      onClick={resetLeaks}
                      className="rounded bg-amber-700 px-4 py-3 text-white hover:bg-amber-600"
                    >
                      🔄 Reset & Cleanup
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded border border-red-800/30 bg-red-950/30 p-3">
                      <span className="text-red-300">Leaky Intervals:</span>
                      <span className="font-mono text-2xl text-red-400 tabular-nums">
                        {leakyIntervals}
                      </span>
                    </div>

                    <div
                      className={`rounded border p-3 transition-all ${kingdomState === "decaying" ? "border-red-500 bg-red-950/20" : "border-amber-800/30 bg-amber-950/10"}`}
                    >
                      <div className="flex items-center gap-2">
                        {kingdomState === "decaying" ? (
                          <AlertCircle className="h-5 w-5 text-red-400" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-amber-400" />
                        )}
                        <span
                          className={
                            kingdomState === "decaying"
                              ? "text-red-300"
                              : "text-amber-300"
                          }
                        >
                          {kingdomState === "decaying"
                            ? "⚠️ Pride Lands decaying!"
                            : "✓ Kingdom healthy"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <CodeBlock
                    code={leakyCode}
                    variant="error"
                    title="// ❌ Missing Cleanup = Memory Leak"
                    defaultExpanded={true}
                  />

                  <div className="rounded border border-red-800/30 bg-red-950/20 p-3 text-sm text-red-300/70">
                    <p className="flex items-start gap-2">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      Each interval continues running even after component
                      unmounts. At {leakyIntervals} intervals, performance
                      degrades.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 3: Cleanup Demo */}
            {chapter === 2 && (
              <div className="rounded-xl border border-emerald-700/40 bg-stone-900/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-emerald-300">
                  <CheckCircle className="h-5 w-5" />
                  Remember useEffect with Cleanup
                </h3>

                <div className="mb-6 space-y-4">
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button
                      onClick={toggleMount}
                      className={`rounded-lg px-6 py-3 transition-all ${mounted ? "bg-emerald-700 hover:bg-emerald-600" : "bg-amber-700 hover:bg-amber-600"}`}
                    >
                      {mounted
                        ? "👑 Abdicate Throne (Unmount)"
                        : "👑 Accept Responsibility (Mount)"}
                    </button>

                    <button
                      onClick={() => setActiveCleanup(!activeCleanup)}
                      className="rounded bg-stone-700 px-4 py-2 text-white hover:bg-stone-600"
                    >
                      {activeCleanup
                        ? "Show Without Cleanup"
                        : "Show With Cleanup"}
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded border border-stone-700/30 bg-stone-800/30 p-3">
                      <span>Years Ruled:</span>
                      <span className="font-mono text-2xl text-amber-300 tabular-nums">
                        {componentCount}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 rounded border border-emerald-800/30 bg-emerald-950/20 p-3">
                      {activeCleanup ? (
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      )}
                      <span
                        className={
                          activeCleanup ? "text-emerald-300" : "text-red-300"
                        }
                      >
                        {activeCleanup
                          ? "✅ Cleanup function active"
                          : "❌ No cleanup (resources leak)"}
                      </span>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={fixedCode}
                  variant="success"
                  title="// ✅ useEffect with Cleanup & Dependencies"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 4: Comparison Demo */}
            {chapter === 3 && (
              <div className="rounded-xl border border-amber-700/40 bg-stone-900/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-300">
                  <RefreshCw className="h-5 w-5" />
                  Kingdom Comparison
                </h3>

                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Broken Kingdom */}
                  <div className="rounded-lg border border-red-700/40 bg-red-950/10 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <h4 className="font-semibold text-red-300">
                        Hakuna Matata Kingdom
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <div className="h-24 rounded border border-red-800/30 bg-gradient-to-br from-red-950/30 to-stone-900/50 p-3">
                        <div className="text-sm text-red-400">
                          No cleanup functions
                        </div>
                        <div className="mt-2 font-mono text-2xl text-red-300">
                          {leakyIntervals}
                        </div>
                        <div className="mt-1 text-xs text-red-400/70">
                          leaking hyenas
                        </div>
                      </div>

                      <button
                        onClick={triggerMemoryLeak}
                        className="w-full rounded bg-red-700 px-3 py-2 text-sm text-white hover:bg-red-600"
                      >
                        Add More Hyenas
                      </button>
                    </div>
                  </div>

                  {/* Restored Kingdom */}
                  <div className="rounded-lg border border-emerald-700/40 bg-emerald-950/10 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <h4 className="font-semibold text-emerald-300">
                        Kingdom Restored
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <div className="h-24 rounded border border-emerald-800/30 bg-gradient-to-br from-emerald-950/30 to-stone-900/50 p-3">
                        <div className="text-sm text-emerald-400">
                          With cleanup
                        </div>
                        <div className="mt-2 font-mono text-2xl text-emerald-300">
                          0
                        </div>
                        <div className="mt-1 text-xs text-emerald-400/70">
                          managed resources
                        </div>
                      </div>

                      <button
                        onClick={resetLeaks}
                        className="w-full rounded bg-emerald-700 px-3 py-2 text-sm text-white hover:bg-emerald-600"
                      >
                        Restore Kingdom
                      </button>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={comparisonCode}
                  variant="default"
                  title="// Comparison: Broken vs Fixed"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 5: Full Cycle Demo */}
            {chapter === 4 && (
              <div className="rounded-xl border border-amber-700/30 bg-stone-900/50 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-300">
                  <Crown className="h-5 w-5" />
                  The Cycle is Complete
                </h3>

                <div className="mb-6 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setMounted(true)}
                      className={`rounded px-3 py-2 ${mounted ? "bg-amber-700" : "bg-stone-700 hover:bg-stone-600"}`}
                    >
                      🌅 Mount
                    </button>
                    <button
                      onClick={() => setComponentCount((c) => c + 1)}
                      className="rounded bg-amber-700 px-3 py-2 hover:bg-amber-600"
                    >
                      🔄 Update
                    </button>
                    <button
                      onClick={() => {
                        setMounted(false);
                        setComponentCount(0);
                      }}
                      className="rounded bg-stone-700 px-3 py-2 hover:bg-stone-600"
                    >
                      🌄 Unmount
                    </button>
                  </div>

                  <div className="rounded-lg border border-amber-800/30 bg-amber-950/10 p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-amber-300/70">
                          Component Status:
                        </span>
                        <span
                          className={`font-medium ${mounted ? "text-amber-300" : "text-stone-500"}`}
                        >
                          {mounted ? "Mounted at Pride Rock" : "Unmounted"}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-amber-300/70">Update Count:</span>
                        <span className="font-mono text-amber-300 tabular-nums">
                          {componentCount}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-amber-300/70">
                          Resources Cleaned:
                        </span>
                        <span className="font-medium text-emerald-300">
                          {mounted ? "Active" : "✓ All cleaned up"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={fullCycleCode}
                  variant="success"
                  title="// ✅ Complete Lifecycle Management"
                  defaultExpanded={true}
                />

                <div className="mt-4 rounded border border-emerald-800/30 bg-emerald-950/20 p-3 text-sm text-emerald-300/80">
                  The cycle is complete. The component properly handles
                  mounting, updating with cleanup, and unmounting. The
                  application state remains balanced.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center justify-between">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="flex items-center gap-2 rounded-lg bg-amber-800 px-4 py-3 text-amber-100 transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-30 md:px-6"
          >
            <span className="rotate-180">→</span>
            Previous
          </button>

          <div className="flex items-center gap-4">
            <span className="font-mono text-sm text-amber-400/60 tabular-nums">
              {chapter + 1}/{chapters.length}
            </span>
            <div className="flex gap-2">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`h-2 w-2 rounded-full transition-all ${idx === chapter ? "scale-125 bg-amber-400" : "bg-amber-800/50 hover:bg-amber-700"}`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              setChapter(Math.min(chapters.length - 1, chapter + 1))
            }
            disabled={chapter === chapters.length - 1}
            className="flex items-center gap-2 rounded-lg bg-amber-800 px-4 py-3 text-amber-100 transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-30 md:px-6"
          >
            Next
            <span>→</span>
          </button>
        </nav>

        {/* Safety Reset - Always Visible */}
        <div className="rounded-lg border border-stone-700/30 bg-stone-900/30 p-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-amber-300/70">
              <span className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Safety Controls
              </span>
              <p className="mt-1 text-xs">
                Circuit breaker active:{" "}
                {leakyIntervals > 50 ? "⚠️ Threshold reached" : "✓ Normal"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setMounted(false);
                  resetLeaks();
                  setComponentCount(0);
                  setActiveCleanup(false);
                }}
                className="rounded bg-stone-700 px-4 py-2 text-sm text-white hover:bg-stone-600"
              >
                Reset All Demos
              </button>

              <button
                onClick={() => setChapter(0)}
                className="rounded bg-amber-800 px-4 py-2 text-sm text-amber-100 hover:bg-amber-700"
              >
                Restart from Chapter 1
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
