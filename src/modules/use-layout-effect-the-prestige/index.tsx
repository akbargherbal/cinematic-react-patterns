import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 text-slate-200 font-serif">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-950/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4 sm:gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="text-amber-500 w-6 h-6 sm:w-8 sm:h-8" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">The Prestige</h1>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">
              Alistair • 2006
            </p>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-amber-400 font-medium">
            useLayoutEffect Hook
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Narrative Column */}
          <div className="lg:col-span-7">
            <div className="mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-amber-400">
                {currentChapter.title}
              </h2>
              <div className="prose prose-invert prose-slate max-w-none">
                {currentChapter.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 leading-relaxed text-base sm:text-lg text-slate-300">
                    {paragraph.split('**').map((part, i) =>
                      i % 2 === 1 ? <strong key={i} className="text-amber-400">{part}</strong> : part
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
        <nav className="flex justify-between items-center mt-8 sm:mt-12 pt-8 border-t border-slate-700">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-amber-600 text-slate-950 rounded-lg hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base font-semibold"
          >
            Previous
          </button>
          <div className="text-center">
            <span className="text-xs sm:text-sm text-slate-400 block mb-1">Act</span>
            <span className="text-sm sm:text-base font-mono text-amber-400">
              {chapter + 1} of {chapters.length}
            </span>
          </div>
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-amber-600 text-slate-950 rounded-lg hover:bg-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base font-semibold"
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
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-amber-500 w-5 h-5" />
        <h3 className="text-lg sm:text-xl font-bold text-amber-400">The Three Acts</h3>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 mb-6">
        Watch the sequence of a magic trick. Notice the invisible moment between the Turn and the Prestige.
      </p>

      {/* Visual Timeline */}
      <div className="space-y-4 mb-6">
        {acts.map((act, idx) => (
          <div
            key={idx}
            className={`border-2 rounded-lg p-4 transition-all duration-500 ${
              currentAct === idx
                ? "border-amber-500 bg-amber-950/30 scale-105"
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
                <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invisible Moment Indicator */}
      {currentAct === 1 && (
        <div className="bg-amber-950/40 border border-amber-500/50 rounded-lg p-4 mb-6 animate-in fade-in duration-300">
          <p className="text-sm text-amber-300 flex items-center gap-2">
            <EyeOff className="w-4 h-4" />
            <strong>The invisible moment:</strong> Between Turn and Prestige, secret work happens unseen.
          </p>
        </div>
      )}

      <button
        onClick={runSequence}
        disabled={isAnimating}
        className="w-full px-4 py-3 bg-amber-600 text-slate-950 rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 font-semibold"
      >
        <Play className="w-4 h-4" />
        {isAnimating ? "Performing..." : "Perform Trick"}
      </button>

      <div className="mt-6 pt-6 border-t border-slate-700">
        <p className="text-xs text-slate-500">
          💡 In React, DOM mutations (Turn) and browser paint (Prestige) are separated. useLayoutEffect works in that invisible moment.
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
        setTotalFlickerTime(prev => prev + elapsed);
        setFlickerCount(prev => prev + 1);
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
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Eye className={`w-5 h-5 ${showCage && !showDove ? "text-red-400 animate-pulse" : "text-slate-500"}`} />
        <h3 className="text-lg sm:text-xl font-bold text-red-400">The Flashing Dove</h3>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 mb-6">
        Watch the trick with useEffect. Notice the visible flicker when the cage appears empty before the dove materializes.
      </p>

      {/* Stage */}
      <div className="bg-slate-950 border-2 border-slate-700 rounded-lg p-8 mb-6 min-h-[200px] flex items-center justify-center relative">
        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 to-transparent rounded-lg pointer-events-none" />
        
        {showCage ? (
          <div className="relative">
            {/* Cage */}
            <div className={`text-6xl transition-all duration-300 ${showDove ? "opacity-100" : "opacity-70"}`}>
              🗝️
            </div>
            {/* Dove - appears AFTER paint */}
            {showDove && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-4xl animate-in fade-in duration-300">
                🕊️
              </div>
            )}
            {/* Flicker indicator */}
            {showCage && !showDove && (
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-red-400 text-xs font-bold whitespace-nowrap animate-pulse">
                👁️ FLICKER!
              </div>
            )}
          </div>
        ) : (
          <p className="text-slate-600 italic">Stage empty...</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={performTrick}
          disabled={isPerforming}
          className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm font-semibold"
        >
          <Play className="w-4 h-4" />
          {isPerforming ? "Performing..." : "Perform Trick"}
        </button>
        <button
          onClick={reset}
          className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400">Flicker Count</p>
          <p className="text-xl font-mono font-bold text-red-400 mt-1">
            {flickerCount}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400">Total Flicker (ms)</p>
          <p className="text-xl font-mono font-bold text-red-400 mt-1">
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

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">
          ⚠️ <strong>The Problem</strong>: useEffect runs after paint. The audience sees the mechanism.
          {flickerCount >= 45 && <span className="text-red-400 ml-2">(Circuit breaker approaching)</span>}
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
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-amber-500 w-5 h-5" />
        <h3 className="text-lg sm:text-xl font-bold text-amber-400">The Secret Assistant</h3>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 mb-6">
        Watch the trick with useLayoutEffect. Cage and dove appear as one perfect, indivisible moment.
      </p>

      {/* Stage */}
      <div className="bg-slate-950 border-2 border-amber-500/30 rounded-lg p-8 mb-6 min-h-[200px] flex items-center justify-center relative">
        {/* Spotlight effect */}
        <div className="absolute inset-0 bg-gradient-radial from-amber-500/20 to-transparent rounded-lg pointer-events-none" />
        
        {showElements && (
          <div ref={cageRef} className="relative opacity-0 transition-opacity duration-300">
            {/* Cage */}
            <div className="text-6xl">
              🗝️
            </div>
            {/* Dove - appears SYNCHRONOUSLY */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-4xl">
              🕊️
            </div>
            {/* Success indicator */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-green-400 text-xs font-bold whitespace-nowrap">
              ✨ SEAMLESS!
            </div>
          </div>
        )}
        
        {!showElements && !isPerforming && (
          <p className="text-slate-600 italic">Stage empty...</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={performTrick}
          disabled={isPerforming}
          className="flex-1 px-4 py-3 bg-amber-600 text-slate-950 rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm font-semibold"
        >
          <Play className="w-4 h-4" />
          {isPerforming ? "Performing..." : "Perform Trick"}
        </button>
        <button
          onClick={reset}
          className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Success Indicator */}
      <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <strong>Perfect illusion:</strong> No flicker, no visible sequence. Pure magic.
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

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">
          ✨ <strong>The Solution</strong>: useLayoutEffect runs synchronously before paint. The audience never sees the mechanism.
        </p>
      </div>
    </div>
  );
}

// Chapter 4: Two Performances (Comparison)
function ComparisonDemo(): JSX.Element {
  const [mode, setMode] = useState<"useEffect" | "useLayoutEffect">("useEffect");
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
          setMetrics(prev => ({
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
      setMetrics(prev => ({
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
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-amber-500 w-5 h-5" />
        <h3 className="text-lg sm:text-xl font-bold text-amber-400">Two Performances</h3>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 mb-6">
        Compare the two approaches side-by-side.
      </p>

      {/* Mode Toggle */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setMode("useEffect")}
          className={`flex-1 px-4 py-3 rounded-lg transition-all text-sm font-semibold ${
            mode === "useEffect"
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          👁️ Stagehand
        </button>
        <button
          onClick={() => setMode("useLayoutEffect")}
          className={`flex-1 px-4 py-3 rounded-lg transition-all text-sm font-semibold ${
            mode === "useLayoutEffect"
              ? "bg-amber-600 text-slate-950"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          ✨ Secret Assistant
        </button>
      </div>

      {/* Stage */}
      <div className={`border-2 rounded-lg p-8 mb-6 min-h-[200px] flex items-center justify-center relative ${
        mode === "useEffect" ? "bg-slate-950 border-red-500/30" : "bg-slate-950 border-amber-500/30"
      }`}>
        <div className={`absolute inset-0 bg-gradient-radial rounded-lg pointer-events-none ${
          mode === "useEffect" ? "from-red-500/10" : "from-amber-500/20"
        }`} />
        
        {showElements && (
          <div ref={elementsRef} className="relative opacity-0 transition-opacity duration-300">
            <div className="text-6xl">🗝️</div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-4xl">🕊️</div>
          </div>
        )}
        
        {!showElements && !isPerforming && (
          <p className="text-slate-600 italic">Stage empty...</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={performTrick}
          disabled={isPerforming}
          className={`flex-1 px-4 py-3 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-sm font-semibold ${
            mode === "useEffect" ? "bg-red-600 text-white" : "bg-amber-600 text-slate-950"
          }`}
        >
          <Play className="w-4 h-4" />
          Perform
        </button>
        <button
          onClick={reset}
          className="px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400">Flickers (useEffect)</p>
          <p className="text-xl font-mono font-bold text-red-400 mt-1">
            {metrics.flickerCount}
          </p>
        </div>
        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-xs text-slate-400">Seamless (useLayoutEffect)</p>
          <p className="text-xl font-mono font-bold text-green-400 mt-1">
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

      <div className="mt-4 pt-4 border-t border-slate-700">
        <p className="text-xs text-slate-500">
          🎯 <strong>The Difference</strong>: One works after the show. The other makes the show happen.
          {metrics.flickerCount >= 45 && <span className="text-red-400 ml-2">(Circuit breaker approaching)</span>}
        </p>
      </div>
    </div>
  );
}

// Chapter 5: The Master's Notebook (Summary)
function SummaryDemo(): JSX.Element {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
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
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-amber-500 w-5 h-5" />
        <h3 className="text-lg sm:text-xl font-bold text-amber-400">The Master's Notebook</h3>
      </div>

      <p className="text-xs sm:text-sm text-slate-400 mb-6">
        Real-world example: tooltip positioning with useLayoutEffect prevents flicker.
      </p>

      {/* Interactive Demo */}
      <div className="bg-slate-950 border-2 border-amber-500/30 rounded-lg p-8 mb-6 min-h-[150px] flex items-center justify-center relative">
        <button
          ref={buttonRef}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
          className="px-6 py-3 bg-amber-600 text-slate-950 rounded-lg hover:bg-amber-500 transition-all font-semibold"
        >
          Hover for Tooltip
        </button>

        {tooltipVisible && (
          <div
            className="fixed bg-slate-800 border border-amber-500 rounded px-3 py-2 text-sm text-amber-400 pointer-events-none z-50 -translate-x-1/2 -translate-y-full"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
            }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-slate-800 border-r border-b border-amber-500 rotate-45" />
            Positioned with useLayoutEffect
          </div>
        )}
      </div>

      {/* Code Examples */}
      <div className="space-y-4 mb-6">
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
        <div className="bg-amber-950/30 border border-amber-500/30 rounded-lg p-4">
          <p className="text-sm font-semibold text-amber-300 mb-2">
            ✨ Core Principles
          </p>
          <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
            <li>• <strong>useEffect</strong>: After paint, async - for side effects</li>
            <li>• <strong>useLayoutEffect</strong>: Before paint, sync - for layout work</li>
            <li>• The audience must never see the mechanism</li>
            <li>• Keep useLayoutEffect operations fast (blocks paint)</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-slate-400 mb-1">🎭 The Metaphor</p>
            <p className="text-slate-200">Stagehand vs Secret Assistant</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-slate-400 mb-1">⚛️ The React API</p>
            <p className="text-slate-200">useEffect vs useLayoutEffect</p>
          </div>
        </div>
      </div>
    </div>
  );
}