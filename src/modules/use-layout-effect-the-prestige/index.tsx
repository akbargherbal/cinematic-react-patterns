import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
} from "react";
import { Sparkles, Eye, EyeOff, RotateCcw, Play, Zap } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface Metrics {
  flickerCount: number;
  seamlessCount: number;
  totalFlickerTime: number;
}

export default function UseLayoutEffectThePrestige(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Three Acts of Illusion",
      content: `**"The audience must never see the mechanism in between."**

Every magic trick has three parts: The Pledge (showing something ordinary), The Turn (making it extraordinary), and The Prestige (the reveal). But between the Turn and the Prestige lies a critical, invisible moment—where the secret work happens.

**In React**: Between a DOM mutation (The Turn) and the browser paint (The Prestige), there's a synchronous window where layout work must happen. The audience must never see the mechanism.`,
    },
    {
      id: "build",
      title: "The Flashing Dove",
      content: `**"It's not slow, it's out of sequence! They're seeing behind the curtain."**

Alistair's trick: a gilded cage materializes with a dove inside. He uses a stagehand who places the dove *after* the cage appears. The audience sees the stagehand's arm retreating, or worse—an empty cage before the dove appears. The illusion is spoiled.

**useEffect problem**: It runs *after* the browser paints. Users see the intermediate state (the flicker), then the correction. The timing is wrong, breaking the illusion.`,
    },
    {
      id: "climax",
      title: "The Secret Assistant",
      content: `**"You don't need a faster stagehand. You need a secret assistant."**

Cutter introduces Eliza, hidden beneath the stage. Her hands work *synchronously* with the cage appearing—not after. As the cage materializes, she places the dove through a hidden trapdoor. The audience sees cage and dove as one instant, indivisible moment.

**useLayoutEffect**: Runs synchronously *after* DOM mutations but *before* the browser paints. Perfect for measurements, adjustments, and ensuring seamless visual transitions.`,
    },
    {
      id: "resolution",
      title: "Two Performances, One Night",
      content: `**"One cleans up after the applause. The other makes the applause happen."**

**The Stagehand (useEffect)**: Audience sees cage appear, then a flicker as the dove is added. Two steps, visible sequence, broken magic.

**The Secret Assistant (useLayoutEffect)**: Audience sees cage and dove appear simultaneously. One perfect moment, seamless illusion, pure wonder.

**The principle**: Some work happens after the show (cleanup). Other work must happen during the trick itself (layout, measurements).`,
    },
    {
      id: "summary",
      title: "The Master's Notebook",
      content: `**"The most important work is done in the instant no one is watching."**

Alistair diagrams both methods in his notebook. The Stagehand is for cleanup, post-performance tasks. The Secret Assistant is for synchronous, pre-paint work that must be perfect before the lights come up.

**When to use useLayoutEffect**: DOM measurements, scroll position, tooltip positioning, preventing layout shifts—anything where the user must never see the "before" state. Use sparingly; it blocks painting.`,
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 font-serif text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="h-6 w-6 text-amber-500 sm:h-8 sm:w-8" />
              <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
                The Prestige
              </h1>
            </div>
            <p className="text-xs text-slate-400 sm:text-sm md:text-base">
              Alistair • 2006
            </p>
          </div>
          <p className="text-sm font-medium text-amber-400 sm:text-base md:text-lg">
            useLayoutEffect Hook
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Narrative Column */}
          <div className="lg:col-span-7">
            <div className="mb-8 lg:mb-12">
              <h2 className="mb-4 text-2xl font-bold text-amber-400 sm:mb-6 sm:text-3xl">
                {currentChapter.title}
              </h2>
              <div className="prose prose-invert prose-slate max-w-none">
                {currentChapter.content.split("\n\n").map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="mb-4 text-base leading-relaxed text-slate-300 sm:text-lg"
                  >
                    {paragraph.split("**").map((part, i) =>
                      i % 2 === 1 ? (
                        <strong key={i} className="text-amber-400">
                          {part}
                        </strong>
                      ) : (
                        part
                      ),
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <DemoSection chapter={chapter} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex items-center justify-between border-t border-slate-700 pt-8 sm:mt-12">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:py-3 sm:text-base"
          >
            Previous
          </button>
          <div className="text-center">
            <span className="mb-1 block text-xs text-slate-400 sm:text-sm">
              Act
            </span>
            <span className="font-mono text-sm text-amber-400 sm:text-base">
              {chapter + 1} of {chapters.length}
            </span>
          </div>
          <button
            onClick={() =>
              setChapter(Math.min(chapters.length - 1, chapter + 1))
            }
            disabled={chapter === chapters.length - 1}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6 sm:py-3 sm:text-base"
          >
            Next
          </button>
        </nav>
      </main>
    </div>
  );
}

// Demo Section Router
function DemoSection({ chapter }: { chapter: number }): JSX.Element {
  switch (chapter) {
    case 0:
      return <ThreeActsDemo />;
    case 1:
      return <FlashingDoveDemo />;
    case 2:
      return <SecretAssistantDemo />;
    case 3:
      return <ComparisonDemo />;
    case 4:
      return <SummaryDemo />;
    default:
      return <ThreeActsDemo />;
  }
}

// Chapter 1: The Three Acts of Illusion
function ThreeActsDemo(): JSX.Element {
  const [currentAct, setCurrentAct] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const acts = [
    { name: "The Pledge", description: "Something ordinary", icon: "🎩" },
    { name: "The Turn", description: "Made extraordinary", icon: "✨" },
    { name: "The Prestige", description: "The reveal", icon: "🕊️" },
  ];

  const runSequence = () => {
    setIsAnimating(true);
    setCurrentAct(0);

    setTimeout(() => setCurrentAct(1), 1000);
    setTimeout(() => setCurrentAct(2), 2000);
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentAct(0);
    }, 4000);
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-bold text-amber-400 sm:text-xl">
          The Three Acts
        </h3>
      </div>

      <p className="mb-6 text-xs text-slate-400 sm:text-sm">
        Watch the sequence of a magic trick. Notice the invisible moment between
        the Turn and the Prestige.
      </p>

      {/* Visual Timeline */}
      <div className="mb-6 space-y-4">
        {acts.map((act, idx) => (
          <div
            key={idx}
            className={`rounded-lg border-2 p-4 transition-all duration-500 ${
              currentAct === idx
                ? "scale-105 border-amber-500 bg-amber-950/30"
                : currentAct > idx
                  ? "border-green-500/50 bg-green-950/20"
                  : "border-slate-700 bg-slate-800/30"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{act.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-slate-200">{act.name}</p>
                <p className="text-xs text-slate-400">{act.description}</p>
              </div>
              {currentAct === idx && (
                <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invisible Moment Indicator */}
      {currentAct === 1 && (
        <div className="animate-in fade-in mb-6 rounded-lg border border-amber-500/50 bg-amber-950/40 p-4 duration-300">
          <p className="flex items-center gap-2 text-sm text-amber-300">
            <EyeOff className="h-4 w-4" />
            <strong>The invisible moment:</strong> Between Turn and Prestige,
            secret work happens unseen.
          </p>
        </div>
      )}

      <button
        onClick={runSequence}
        disabled={isAnimating}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-3 font-semibold text-slate-950 transition-all hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Play className="h-4 w-4" />
        {isAnimating ? "Performing..." : "Perform Trick"}
      </button>

      <div className="mt-6 border-t border-slate-700 pt-6">
        <p className="text-xs text-slate-500">
          💡 In React, DOM mutations (Turn) and browser paint (Prestige) are
          separated. useLayoutEffect works in that invisible moment.
        </p>
      </div>
    </div>
  );
}

// Chapter 2: The Flashing Dove (useEffect Anti-pattern)
function FlashingDoveDemo(): JSX.Element {
  const [isPerforming, setIsPerforming] = useState<boolean>(false);
  const [showCage, setShowCage] = useState<boolean>(false);
  const [showDove, setShowDove] = useState<boolean>(false);
  const [flickerCount, setFlickerCount] = useState<number>(0);
  const [totalFlickerTime, setTotalFlickerTime] = useState<number>(0);

  // Circuit breaker
  useEffect(() => {
    if (flickerCount >= 50) {
      reset();
    }
  }, [flickerCount]);

  // Simulate useEffect's async behavior (the flicker)
  useEffect(() => {
    if (showCage && !showDove) {
      const startTime = Date.now();
      // useEffect runs AFTER paint, causing visible flicker
      const timer = setTimeout(() => {
        setShowDove(true);
        const elapsed = Date.now() - startTime;
        setTotalFlickerTime((prev) => prev + elapsed);
        setFlickerCount((prev) => prev + 1);
      }, 150); // Visible delay

      return () => clearTimeout(timer);
    }
  }, [showCage, showDove]);

  const performTrick = () => {
    setIsPerforming(true);
    setShowCage(false);
    setShowDove(false);

    // The Turn: cage appears
    setTimeout(() => {
      setShowCage(true);
      // Dove appears AFTER paint (flicker visible)
    }, 500);

    setTimeout(() => {
      setIsPerforming(false);
    }, 2000);
  };

  const reset = () => {
    setIsPerforming(false);
    setShowCage(false);
    setShowDove(false);
    setFlickerCount(0);
    setTotalFlickerTime(0);
  };

  const useEffectCode = `// ❌ useEffect - Async, Post-Paint (The Stagehand)
function MagicTrick() {
  const [showCage, setShowCage] = useState(false);
  const [showDove, setShowDove] = useState(false);

  useEffect(() => {
    if (showCage) {
      // Runs AFTER browser paints the cage
      // User sees empty cage first (flicker!)
      setShowDove(true);
    }
  }, [showCage]);

  return (
    <div>
      {showCage && <Cage />}
      {showDove && <Dove />}
      {/* Cage appears, THEN dove appears (visible sequence) */}
    </div>
  );
}`;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Eye
          className={`h-5 w-5 ${showCage && !showDove ? "animate-pulse text-red-400" : "text-slate-500"}`}
        />
        <h3 className="text-lg font-bold text-red-400 sm:text-xl">
          The Flashing Dove
        </h3>
      </div>

      <p className="mb-6 text-xs text-slate-400 sm:text-sm">
        Watch the trick with useEffect. Notice the visible flicker when the cage
        appears empty before the dove materializes.
      </p>

      {/* Stage */}
      <div className="relative mb-6 flex min-h-[200px] items-center justify-center rounded-lg border-2 border-slate-700 bg-slate-950 p-8">
        {/* Spotlight effect */}
        <div className="bg-gradient-radial pointer-events-none absolute inset-0 rounded-lg from-amber-500/10 to-transparent" />

        {showCage ? (
          <div className="relative">
            {/* Cage */}
            <div
              className={`text-6xl transition-all duration-300 ${showDove ? "opacity-100" : "opacity-70"}`}
            >
              🗝️
            </div>
            {/* Dove - appears AFTER paint */}
            {showDove && (
              <div className="animate-in fade-in absolute -top-2 left-1/2 -translate-x-1/2 text-4xl duration-300">
                🕊️
              </div>
            )}
            {/* Flicker indicator */}
            {showCage && !showDove && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 animate-pulse text-xs font-bold whitespace-nowrap text-red-400">
                👁️ FLICKER!
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-600 italic">Stage empty...</p>
        )}
      </div>

      {/* Controls */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={performTrick}
          disabled={isPerforming}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="h-4 w-4" />
          {isPerforming ? "Performing..." : "Perform Trick"}
        </button>
        <button
          onClick={reset}
          className="rounded-lg bg-slate-700 px-4 py-3 text-white transition-all hover:bg-slate-600"
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Metrics */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Flicker Count</p>
          <p className="mt-1 font-mono text-xl font-bold text-red-400">
            {flickerCount}
          </p>
        </div>
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Total Flicker (ms)</p>
          <p className="mt-1 font-mono text-xl font-bold text-red-400">
            {totalFlickerTime}
          </p>
        </div>
      </div>

      {/* Code */}
      <CodeBlock
        code={useEffectCode}
        variant="error"
        title="// ❌ The Stagehand (useEffect)"
        language="tsx"
        defaultExpanded={true}
      />

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="text-xs text-slate-500">
          ⚠️ <strong>The Problem</strong>: useEffect runs after paint. The
          audience sees the mechanism.
          {flickerCount >= 45 && (
            <span className="ml-2 text-red-400">
              (Circuit breaker approaching)
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

// Chapter 3: The Secret Assistant (useLayoutEffect Solution)
function SecretAssistantDemo(): JSX.Element {
  const [isPerforming, setIsPerforming] = useState<boolean>(false);
  const [showElements, setShowElements] = useState<boolean>(false);
  const cageRef = useRef<HTMLDivElement>(null);

  // useLayoutEffect: Synchronous, pre-paint (The Secret Assistant)
  useLayoutEffect(() => {
    if (showElements && cageRef.current) {
      // This runs BEFORE paint
      // DOM is updated but not yet visible to user
      // Perfect for measurements, adjustments
      cageRef.current.style.opacity = "1";
    }
  }, [showElements]);

  const performTrick = () => {
    setIsPerforming(true);
    setShowElements(false);

    setTimeout(() => {
      setShowElements(true);
      // Both cage and dove appear in same paint
    }, 500);

    setTimeout(() => {
      setIsPerforming(false);
    }, 2000);
  };

  const reset = () => {
    setIsPerforming(false);
    setShowElements(false);
  };

  const useLayoutEffectCode = `// ✅ useLayoutEffect - Sync, Pre-Paint (The Secret Assistant)
function MagicTrick() {
  const [showElements, setShowElements] = useState(false);
  const cageRef = useRef(null);

  useLayoutEffect(() => {
    if (showElements && cageRef.current) {
      // Runs BEFORE browser paints
      // Cage and dove prepared together
      // User never sees intermediate state
      cageRef.current.classList.add('ready');
    }
  }, [showElements]);

  return (
    <div ref={cageRef}>
      {showElements && (
        <>
          <Cage />
          <Dove />
          {/* Both appear simultaneously to user */}
        </>
      )}
    </div>
  );
}`;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-bold text-amber-400 sm:text-xl">
          The Secret Assistant
        </h3>
      </div>

      <p className="mb-6 text-xs text-slate-400 sm:text-sm">
        Watch the trick with useLayoutEffect. Cage and dove appear as one
        perfect, indivisible moment.
      </p>

      {/* Stage */}
      <div className="relative mb-6 flex min-h-[200px] items-center justify-center rounded-lg border-2 border-amber-500/30 bg-slate-950 p-8">
        {/* Spotlight effect */}
        <div className="bg-gradient-radial pointer-events-none absolute inset-0 rounded-lg from-amber-500/20 to-transparent" />

        {showElements && (
          <div
            ref={cageRef}
            className="relative opacity-0 transition-opacity duration-300"
          >
            {/* Cage */}
            <div className="text-6xl">🗝️</div>
            {/* Dove - appears SYNCHRONOUSLY */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-4xl">
              🕊️
            </div>
            {/* Success indicator */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap text-green-400">
              ✨ SEAMLESS!
            </div>
          </div>
        )}

        {!showElements && !isPerforming && (
          <p className="text-slate-600 italic">Stage empty...</p>
        )}
      </div>

      {/* Controls */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={performTrick}
          disabled={isPerforming}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-3 text-sm font-semibold text-slate-950 transition-all hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Play className="h-4 w-4" />
          {isPerforming ? "Performing..." : "Perform Trick"}
        </button>
        <button
          onClick={reset}
          className="rounded-lg bg-slate-700 px-4 py-3 text-white transition-all hover:bg-slate-600"
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Success Indicator */}
      <div className="mb-6 rounded-lg border border-green-500/30 bg-green-950/30 p-4">
        <p className="flex items-center gap-2 text-sm text-green-300">
          <Sparkles className="h-4 w-4" />
          <strong>Perfect illusion:</strong> No flicker, no visible sequence.
          Pure magic.
        </p>
      </div>

      {/* Code Comparison */}
      <CodeBlock
        code={useLayoutEffectCode}
        variant="success"
        title="// ✅ The Secret Assistant (useLayoutEffect)"
        language="tsx"
        defaultExpanded={true}
      />

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="text-xs text-slate-500">
          ✨ <strong>The Solution</strong>: useLayoutEffect runs synchronously
          before paint. The audience never sees the mechanism.
        </p>
      </div>
    </div>
  );
}

// Chapter 4: Two Performances (Comparison)
function ComparisonDemo(): JSX.Element {
  const [mode, setMode] = useState<"useEffect" | "useLayoutEffect">(
    "useEffect",
  );
  const [isPerforming, setIsPerforming] = useState<boolean>(false);
  const [showElements, setShowElements] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<Metrics>({
    flickerCount: 0,
    seamlessCount: 0,
    totalFlickerTime: 0,
  });
  const elementsRef = useRef<HTMLDivElement>(null);

  // Circuit breaker
  useEffect(() => {
    if (metrics.flickerCount >= 50) {
      reset();
    }
  }, [metrics.flickerCount]);

  // Simulate useEffect behavior (async, post-paint)
  useEffect(() => {
    if (mode === "useEffect" && showElements && elementsRef.current) {
      const startTime = Date.now();
      const timer = setTimeout(() => {
        if (elementsRef.current) {
          elementsRef.current.style.opacity = "1";
          const elapsed = Date.now() - startTime;
          setMetrics((prev) => ({
            ...prev,
            flickerCount: prev.flickerCount + 1,
            totalFlickerTime: prev.totalFlickerTime + elapsed,
          }));
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [mode, showElements]);

  // useLayoutEffect behavior (sync, pre-paint)
  useLayoutEffect(() => {
    if (mode === "useLayoutEffect" && showElements && elementsRef.current) {
      elementsRef.current.style.opacity = "1";
      setMetrics((prev) => ({
        ...prev,
        seamlessCount: prev.seamlessCount + 1,
      }));
    }
  }, [mode, showElements]);

  const performTrick = () => {
    setIsPerforming(true);
    setShowElements(false);
    if (elementsRef.current) {
      elementsRef.current.style.opacity = "0";
    }

    setTimeout(() => {
      setShowElements(true);
    }, 500);

    setTimeout(() => {
      setIsPerforming(false);
    }, 2000);
  };

  const reset = () => {
    setIsPerforming(false);
    setShowElements(false);
    setMetrics({
      flickerCount: 0,
      seamlessCount: 0,
      totalFlickerTime: 0,
    });
  };

  const useEffectExample = `// ❌ Stagehand (useEffect)
useEffect(() => {
  // Post-paint: flicker visible
  if (showCage) setShowDove(true);
}, [showCage]);`;

  const useLayoutEffectExample = `// ✅ Secret Assistant (useLayoutEffect)
useLayoutEffect(() => {
  // Pre-paint: seamless
  if (showElements) prepare();
}, [showElements]);`;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-bold text-amber-400 sm:text-xl">
          Two Performances
        </h3>
      </div>

      <p className="mb-6 text-xs text-slate-400 sm:text-sm">
        Compare the two approaches side-by-side.
      </p>

      {/* Mode Toggle */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setMode("useEffect")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            mode === "useEffect"
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          👁️ Stagehand
        </button>
        <button
          onClick={() => setMode("useLayoutEffect")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
            mode === "useLayoutEffect"
              ? "bg-amber-600 text-slate-950"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          ✨ Secret Assistant
        </button>
      </div>

      {/* Stage */}
      <div
        className={`relative mb-6 flex min-h-[200px] items-center justify-center rounded-lg border-2 p-8 ${
          mode === "useEffect"
            ? "border-red-500/30 bg-slate-950"
            : "border-amber-500/30 bg-slate-950"
        }`}
      >
        <div
          className={`bg-gradient-radial pointer-events-none absolute inset-0 rounded-lg ${
            mode === "useEffect" ? "from-red-500/10" : "from-amber-500/20"
          }`}
        />

        {showElements && (
          <div
            ref={elementsRef}
            className="relative opacity-0 transition-opacity duration-300"
          >
            <div className="text-6xl">🗝️</div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-4xl">
              🕊️
            </div>
          </div>
        )}

        {!showElements && !isPerforming && (
          <p className="text-slate-600 italic">Stage empty...</p>
        )}
      </div>

      {/* Controls */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={performTrick}
          disabled={isPerforming}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 ${
            mode === "useEffect"
              ? "bg-red-600 text-white"
              : "bg-amber-600 text-slate-950"
          }`}
        >
          <Play className="h-4 w-4" />
          Perform
        </button>
        <button
          onClick={reset}
          className="rounded-lg bg-slate-700 px-4 py-3 text-white transition-all hover:bg-slate-600"
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      {/* Metrics */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Flickers (useEffect)</p>
          <p className="mt-1 font-mono text-xl font-bold text-red-400">
            {metrics.flickerCount}
          </p>
        </div>
        <div className="rounded-lg bg-slate-800 p-3">
          <p className="text-xs text-slate-400">Seamless (useLayoutEffect)</p>
          <p className="mt-1 font-mono text-xl font-bold text-green-400">
            {metrics.seamlessCount}
          </p>
        </div>
      </div>

      {/* Code Comparison */}
      <div className="space-y-3">
        <CodeBlock
          code={useEffectExample}
          variant="error"
          title="// ❌ Stagehand"
          language="tsx"
        />
        <CodeBlock
          code={useLayoutEffectExample}
          variant="success"
          title="// ✅ Secret Assistant"
          language="tsx"
        />
      </div>

      <div className="mt-4 border-t border-slate-700 pt-4">
        <p className="text-xs text-slate-500">
          🎯 <strong>The Difference</strong>: One works after the show. The
          other makes the show happen.
          {metrics.flickerCount >= 45 && (
            <span className="ml-2 text-red-400">
              (Circuit breaker approaching)
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

// Chapter 5: The Master's Notebook (Summary)
function SummaryDemo(): JSX.Element {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Real-world useLayoutEffect: Tooltip positioning
  useLayoutEffect(() => {
    if (tooltipVisible && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      });
    }
  }, [tooltipVisible]);

  const summaryCode = `// 🎬 Real-World Use Cases

// 1. Tooltip Positioning
function Tooltip({ targetRef, visible }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useLayoutEffect(() => {
    if (visible && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top - 10 });
      // Measured BEFORE paint - no position flicker
    }
  }, [visible]);
}

// 2. Scroll Restoration
function ScrollRestoration() {
  const scrollRef = useRef(null);
  const [savedPosition, setSavedPosition] = useState(0);
  
  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = savedPosition;
      // Applied BEFORE paint - no visible jump
    }
  }, [savedPosition]);
}

// 3. DOM Measurements
function AutoSizeTextarea() {
  const textareaRef = useRef(null);
  
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = 
        textareaRef.current.scrollHeight + 'px';
      // Measured and adjusted BEFORE paint
    }
  });
}`;

  const guidelinesCode = `// ⚠️ When to Use Each Hook

// Use useEffect for:
// - Data fetching
// - Subscriptions
// - Event listeners
// - Analytics
// - Anything that doesn't affect layout

// Use useLayoutEffect for:
// - DOM measurements (getBoundingClientRect)
// - Scroll position manipulation
// - Tooltip/popover positioning
// - Preventing layout shifts
// - Animations based on DOM state

// Warning: useLayoutEffect blocks paint
// Keep operations fast and synchronous`;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-bold text-amber-400 sm:text-xl">
          The Master's Notebook
        </h3>
      </div>

      <p className="mb-6 text-xs text-slate-400 sm:text-sm">
        Real-world example: tooltip positioning with useLayoutEffect prevents
        flicker.
      </p>

      {/* Interactive Demo */}
      <div className="relative mb-6 flex min-h-[150px] items-center justify-center rounded-lg border-2 border-amber-500/30 bg-slate-950 p-8">
        <button
          ref={buttonRef}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-slate-950 transition-all hover:bg-amber-500"
        >
          Hover for Tooltip
        </button>

        {tooltipVisible && (
          <div
            className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded border border-amber-500 bg-slate-800 px-3 py-2 text-sm text-amber-400"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
            }}
          >
            <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 border-r border-b border-amber-500 bg-slate-800" />
            Positioned with useLayoutEffect
          </div>
        )}
      </div>

      {/* Code Examples */}
      <div className="mb-6 space-y-4">
        <CodeBlock
          code={summaryCode}
          variant="success"
          title="// ✅ Real-World Examples"
          language="tsx"
          defaultExpanded={false}
        />
        <CodeBlock
          code={guidelinesCode}
          variant="default"
          title="// 💡 Decision Guidelines"
          language="tsx"
          defaultExpanded={false}
        />
      </div>

      {/* Key Principles */}
      <div className="space-y-3">
        <div className="rounded-lg border border-amber-500/30 bg-amber-950/30 p-4">
          <p className="mb-2 text-sm font-semibold text-amber-300">
            ✨ Core Principles
          </p>
          <ul className="space-y-2 text-xs text-slate-300 sm:text-sm">
            <li>
              • <strong>useEffect</strong>: After paint, async - for side
              effects
            </li>
            <li>
              • <strong>useLayoutEffect</strong>: Before paint, sync - for
              layout work
            </li>
            <li>• The audience must never see the mechanism</li>
            <li>• Keep useLayoutEffect operations fast (blocks paint)</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="mb-1 text-slate-400">🎭 The Metaphor</p>
            <p className="text-slate-200">Stagehand vs Secret Assistant</p>
          </div>
          <div className="rounded-lg bg-slate-800 p-3">
            <p className="mb-1 text-slate-400">⚛️ The React API</p>
            <p className="text-slate-200">useEffect vs useLayoutEffect</p>
          </div>
        </div>
      </div>
    </div>
  );
}
