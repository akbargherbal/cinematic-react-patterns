import { useState, useMemo, useEffect } from "react";
import {
  Zap,
  Skull,
  Users,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function PrestigeModule() {
  const [chapter, setChapter] = useState(0);
  const [performanceCount, setPerformanceCount] = useState(0);
  const [computationCost, setComputationCost] = useState(50);
  const [dependencyStability, setDependencyStability] = useState(50);
  const [isAnimating, setIsAnimating] = useState(false);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Pledge: The Promise of Perfect Duplication",
      content: `Robert Angier stands in the wings of the theater, watching his rival Alfred Borden perform the Transported Man. One moment Borden is on stage left, the next—impossibly—he's on stage right. The audience erupts. Angier's jaw clenches.

"How does he do it?" Angier mutters, studying every movement, every gesture. His own version of the trick requires him to run beneath the stage, emerging through a trapdoor on the opposite side. It works, but it's exhausting. Every performance leaves him breathless, sweating, his timing occasionally off by a fraction of a second.

Angier obsesses over the problem. Each night, he performs the same computation: enter the cabinet, descend the stairs, sprint across the basement, climb the opposite stairs, emerge with a flourish. The same sequence, over and over. Surely there must be a better way.

In React terms, Angier is facing expensive re-renders. Every time his component needs to display the "transported" state, it must execute the entire computation from scratch. The result is always the same, but the process is costly and visible.

"There must be a way," Angier whispers to himself, "to simply be on the other side. Instantly. Perfectly."

He dreams of memoization. What he doesn't yet understand is that some caches cost more to maintain than the computation they're meant to avoid.`,
    },
    {
      id: "build",
      title: "The Turn: The Machine That Remembers",
      content: `The Tesla machine hums with barely contained power, electrical arcs dancing between copper coils. Nikola Tesla stands beside it, his expression grave.

"You understand what this machine does?" Tesla asks.

Angier nods eagerly. "It creates a duplicate. A perfect copy. Instantly."

"It does more than that," Tesla warns. "It creates a cached version of yourself. But Mr. Angier, the cost—"

"I don't care about the cost," Angier interrupts. "Show me."

Tesla activates the machine. Lightning fills the laboratory. And then—impossibly—there are two Angiers. One standing at the machine, one standing thirty feet away. Both real. Both perfect.

The first performance is magical. Angier steps into the cabinet on stage left. The machine activates. Instantly he emerges from the cabinet on stage right. No delay. No visible effort. The audience goes wild.

From the audience's perspective, the optimization is flawless. But Tesla's warning echoes: "The cost—"

What cost? The trick works perfectly. The cache retrieval is instant. The memoization strategy appears to be a complete success.

Angier doesn't yet understand that he's measuring the wrong metrics. He's looking at cache retrieval time (instant) but not at cache creation cost (catastrophic).`,
    },
    {
      id: "climax",
      title: "The Prestige: The Cost of Caching",
      content: `One hundred performances. One hundred perfect duplications. One hundred instances of instant cache retrieval.

And one hundred bodies in the water tank.

Angier stands backstage after his hundredth show, staring at the tank. The water is murky now, filled with the drowned originals—the computational cost of creating each cached value. Every time the machine activates, it creates a duplicate and preserves the original. One becomes the cached result. The other becomes the overhead.

The memoization works perfectly from the audience's perspective. But the total cost is staggering.

Angier's Memoization Strategy:
• Cache creation cost: Death of the original (catastrophic)
• Cache storage cost: One body per performance (accumulating)
• Cache retrieval cost: Instant (perfect)
• Cache invalidation: Every performance (dependencies always change)
• Total cost: 100 deaths for 100 performances

Angier has optimized for the wrong metric. He's minimized cache retrieval time at the expense of catastrophic cache creation cost. In React terms, he's wrapped an expensive computation in useMemo, but the cost of the memoization itself exceeds the cost of just re-computing.

Worse, his dependencies are unstable. Every performance is unique. The cache invalidates constantly. He's not reusing cached values; he's creating new cache entries for every render, each with its catastrophic setup cost.

The bodies accumulate. The optimization that seemed so perfect is revealed as a nightmare of hidden costs.`,
    },
    {
      id: "resolution",
      title: "The Secret: The Sustainable Solution",
      content: `Alfred Borden's secret is revealed in a single, devastating moment: there is no machine. There is no memoization. There are simply two men—identical twins—taking turns.

One performs on stage left. The other waits on stage right. They switch. The audience sees transportation. The reality is far simpler.

Borden's Performance Profile:
• Computation cost: Walking from one side to the other (trivial)
• Storage cost: None (no cache, no accumulation)
• Retrieval cost: Instant (the other twin is already there)
• Total cost: Two men living half-lives, but sustainable indefinitely

No deaths. No water tanks. No catastrophic overhead. Just simple, predictable re-computation.

The brilliance of Borden's solution is its sustainability. There's no accumulating cost, no hidden overhead, no catastrophic failure mode. It's not spectacular—there's no lightning, no Tesla coils, no miraculous duplication. But it works, night after night, year after year.

Angier's mistake was assuming that optimization always improves performance. He saw the expensive computation and immediately reached for memoization without measuring whether the cure was worse than the disease.

The lesson is clear: measure before you memoize. Profile the actual performance. Calculate the total cost, including the overhead of the optimization itself. Sometimes the boring solution—just re-computing—is the optimal one.`,
    },
    {
      id: "summary",
      title: "The Final Curtain: Measuring the True Cost",
      content: `Two approaches to the same problem. Two philosophies of optimization. Two very different outcomes.

Angier's Approach: Premature Optimization
• Saw an expensive operation
• Implemented aggressive memoization
• Achieved perfect cache retrieval
• Ignored total cost
• Result: Catastrophic, unsustainable, ultimately fatal

Borden's Approach: Measured Simplicity
• Saw an expensive operation
• Implemented simple re-computation
• Accepted modest retrieval cost
• Maintained zero overhead
• Result: Sustainable, predictable, optimal

The Decision Framework:

When to use useMemo (Angier's machine is worth it):
1. Profile first: Measure actual performance
2. Expensive computation: The operation genuinely takes significant time
3. Stable dependencies: The cache will be reused across multiple renders
4. Acceptable overhead: Memory and comparison costs are justified

When to skip memoization (Borden's simplicity wins):
1. Cheap computation: The operation is fast (< 1ms)
2. Changing dependencies: Cache invalidates frequently
3. Small data: The computation isn't actually expensive
4. Premature optimization: You haven't measured the problem yet

Performance optimization is not about making everything fast. It's about making the right things fast, at an acceptable cost. Measure. Profile. Calculate the total cost.

The boring solution that works is better than the spectacular solution that kills you.`,
    },
  ];

  const currentChapter = chapters[chapter];

  // Calculate costs based on user parameters
  const angierCost = useMemo(() => {
    const setupCost = 100; // High fixed cost per cache creation
    const retrievalCost = 1; // Instant retrieval
    const invalidationRate = 100 - dependencyStability; // How often cache invalidates
    const effectiveSetupCost = setupCost * (invalidationRate / 100);
    return effectiveSetupCost + retrievalCost;
  }, [dependencyStability]);

  const bordenCost = useMemo(() => {
    const computationCostValue = computationCost / 10; // Scale to reasonable range
    return computationCostValue;
  }, [computationCost]);

  const optimalChoice = angierCost < bordenCost ? "angier" : "borden";

  useEffect(() => {
    if (chapter === 2 && !isAnimating) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [chapter]);

  const renderDemo = () => {
    switch (chapter) {
      case 0:
        // Chapter 1: Simple computation visualizer
        return (
          <div className="rounded-lg border border-amber-500/30 bg-slate-900/50 p-8">
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-amber-500">
              <TrendingDown className="h-6 w-6" />
              The Exhausting Computation
            </h3>
            <p className="mb-6 text-slate-300">
              Every performance, Angier runs beneath the stage. The same
              computation, over and over.
            </p>
            <div className="flex items-center justify-between rounded border border-slate-700 bg-slate-800/50 p-6">
              <div className="text-center">
                <div className="mb-2 text-4xl">🎭</div>
                <div className="text-sm text-slate-400">Stage Left</div>
              </div>
              <div className="mx-8 flex-1">
                <div className="relative h-2 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="absolute inset-0 animate-pulse bg-amber-500"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <div className="mt-2 text-center text-xs text-slate-400">
                  Running... Computing... Exhausting...
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl">🎭</div>
                <div className="text-sm text-slate-400">Stage Right</div>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-slate-400">
              Cost per render:{" "}
              <span className="font-bold text-amber-500">High</span> •
              Sustainability:{" "}
              <span className="font-bold text-emerald-500">Indefinite</span>
            </div>
          </div>
        );

      case 1:
        // Chapter 2: Tesla machine magic
        return (
          <div className="rounded-lg border border-amber-500/30 bg-slate-900/50 p-8">
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-amber-500">
              <Zap className="h-6 w-6" />
              The Tesla Machine: Instant Duplication
            </h3>
            <p className="mb-6 text-slate-300">
              Activate the machine. Watch the magic of memoization.
            </p>
            <div className="relative rounded border border-slate-700 bg-slate-800/50 p-8">
              {isAnimating && (
                <div className="absolute inset-0 animate-pulse rounded bg-amber-500/20"></div>
              )}
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="mb-2 text-6xl">⚡</div>
                  <div className="text-sm text-slate-400">Tesla Machine</div>
                  <div className="mt-2 text-xs text-amber-500">useMemo()</div>
                </div>
                <div className="mx-8 flex-1 text-center">
                  {isAnimating ? (
                    <div className="animate-pulse text-xl font-bold text-amber-500">
                      ⚡ DUPLICATING ⚡
                    </div>
                  ) : (
                    <div className="text-xl font-bold text-emerald-500">
                      ✓ Cached Result Ready
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <div className="mb-2 text-6xl">👤</div>
                  <div className="text-sm text-slate-400">Perfect Copy</div>
                  <div className="mt-2 text-xs text-emerald-500">
                    Instant Retrieval
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded border border-amber-500/30 bg-amber-950/20 p-4">
              <div className="text-sm text-slate-300">
                <strong className="text-amber-500">Cache Hit:</strong> 0.001ms •
                <strong className="ml-4 text-slate-400">Setup Cost:</strong>{" "}
                <span className="text-red-500">Hidden</span>
              </div>
            </div>
          </div>
        );

      case 2:
        // Chapter 3: Bodies in the tank
        return (
          <div className="rounded-lg border border-red-500/30 bg-slate-900/50 p-8">
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-red-500">
              <Skull className="h-6 w-6" />
              The Hidden Cost: Bodies in the Tank
            </h3>
            <p className="mb-6 text-slate-300">
              Every cache entry has a price. Watch the cost accumulate.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded border border-slate-700 bg-slate-800/50 p-6">
                <div className="mb-4 text-center">
                  <div className="mb-2 text-4xl">🌊</div>
                  <div className="text-sm text-slate-400">Water Tank</div>
                </div>
                <div className="space-y-2">
                  {[...Array(Math.min(performanceCount, 10))].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-red-400"
                    >
                      <Skull className="h-4 w-4" />
                      <span>Cache entry #{i + 1} - Cost: 100 units</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setPerformanceCount((c) => c + 1)}
                  className="mt-4 w-full rounded border border-red-500/50 bg-red-500/20 px-4 py-2 text-red-400 transition-colors hover:bg-red-500/30"
                >
                  Perform Again (+1 Body)
                </button>
              </div>
              <div className="rounded border border-slate-700 bg-slate-800/50 p-6">
                <h4 className="mb-4 text-lg font-bold text-amber-500">
                  Cost Analysis
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Performances:</span>
                    <span className="font-bold text-white">
                      {performanceCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cache Entries:</span>
                    <span className="font-bold text-red-400">
                      {performanceCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Setup Cost Each:</span>
                    <span className="font-bold text-red-400">100 units</span>
                  </div>
                  <div className="my-2 h-px bg-slate-700"></div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-slate-300">
                      Total Cost:
                    </span>
                    <span className="font-bold text-red-500">
                      {performanceCount * 100}
                    </span>
                  </div>
                </div>
                <div className="mt-4 rounded border border-red-500/30 bg-red-950/30 p-3">
                  <p className="text-xs text-red-300">
                    <AlertTriangle className="mr-1 inline h-4 w-4" />
                    Dependencies change every render. Cache never reused. Cost
                    accumulates indefinitely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        // Chapter 4: Side-by-side comparison
        return (
          <div className="rounded-lg border border-amber-500/30 bg-slate-900/50 p-8">
            <h3 className="mb-4 flex items-center gap-2 text-2xl font-bold text-amber-500">
              <Users className="h-6 w-6" />
              The Comparison: Angier vs Borden
            </h3>
            <p className="mb-6 text-slate-300">
              Adjust the parameters to see which approach wins.
            </p>

            <div className="mb-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Computation Cost: {computationCost}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={computationCost}
                  onChange={(e) => setComputationCost(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-400">
                  Dependency Stability: {dependencyStability}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dependencyStability}
                  onChange={(e) =>
                    setDependencyStability(Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div
                className={`rounded border-2 bg-slate-800/50 p-6 ${optimalChoice === "angier" ? "border-emerald-500" : "border-red-500/30"}`}
              >
                <div className="mb-4 text-center">
                  <div className="mb-2 text-4xl">⚡</div>
                  <div className="text-lg font-bold text-amber-500">
                    Angier's Approach
                  </div>
                  <div className="text-xs text-slate-400">
                    useMemo Memoization
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Setup Cost:</span>
                    <span className="text-red-400">100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Retrieval Cost:</span>
                    <span className="text-emerald-400">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Invalidation Rate:</span>
                    <span className="text-amber-400">
                      {100 - dependencyStability}%
                    </span>
                  </div>
                  <div className="my-2 h-px bg-slate-700"></div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-slate-300">
                      Total Cost:
                    </span>
                    <span className="font-bold text-white">
                      {angierCost.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`rounded border-2 bg-slate-800/50 p-6 ${optimalChoice === "borden" ? "border-emerald-500" : "border-slate-700"}`}
              >
                <div className="mb-4 text-center">
                  <div className="mb-2 text-4xl">👥</div>
                  <div className="text-lg font-bold text-amber-500">
                    Borden's Approach
                  </div>
                  <div className="text-xs text-slate-400">
                    Simple Re-computation
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Setup Cost:</span>
                    <span className="text-emerald-400">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Computation Cost:</span>
                    <span className="text-amber-400">
                      {(computationCost / 10).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Overhead:</span>
                    <span className="text-emerald-400">0</span>
                  </div>
                  <div className="my-2 h-px bg-slate-700"></div>
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-slate-300">
                      Total Cost:
                    </span>
                    <span className="font-bold text-white">
                      {bordenCost.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded border border-emerald-500/30 bg-emerald-950/20 p-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="h-5 w-5" />
                <span className="font-bold">
                  Optimal Choice:{" "}
                  {optimalChoice === "angier"
                    ? "Angier's Memoization"
                    : "Borden's Re-computation"}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                {optimalChoice === "angier"
                  ? "With stable dependencies and expensive computation, memoization pays off."
                  : "With unstable dependencies or cheap computation, simple re-computation wins."}
              </p>
            </div>
          </div>
        );

      case 4:
        // Chapter 5: Decision framework
        return (
          <div className="rounded-lg border border-amber-500/30 bg-slate-900/50 p-8">
            <h3 className="mb-4 text-2xl font-bold text-amber-500">
              The Decision Framework
            </h3>
            <p className="mb-6 text-slate-300">
              When should you use useMemo? Let the data decide.
            </p>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
                <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-emerald-500">
                  <CheckCircle className="h-5 w-5" />
                  Use useMemo When:
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-500">✓</span>
                    <span>Computation is genuinely expensive (&gt; 1ms)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-500">✓</span>
                    <span>Dependencies are stable (rarely change)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-500">✓</span>
                    <span>Cache will be reused across many renders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-emerald-500">✓</span>
                    <span>You've profiled and confirmed the bottleneck</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
                <h4 className="mb-3 flex items-center gap-2 text-lg font-bold text-red-500">
                  <AlertTriangle className="h-5 w-5" />
                  Skip useMemo When:
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-500">✗</span>
                    <span>Computation is cheap (&lt; 1ms)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-500">✗</span>
                    <span>Dependencies change frequently</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-500">✗</span>
                    <span>You haven't measured the performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-red-500">✗</span>
                    <span>Premature optimization (no proven bottleneck)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded border border-slate-700 bg-slate-800/50 p-6">
              <h4 className="mb-4 text-lg font-bold text-amber-500">
                Code Comparison
              </h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 font-mono text-xs text-red-400">
                    // Angier's Mistake
                  </div>
                  <pre className="overflow-x-auto rounded bg-slate-950 p-3 text-xs text-slate-300">
                    {`// Memoizing cheap computation
const result = useMemo(() => {
  return data.filter(
    item => item.type === filter
  );
}, [data, filter]);

// Overhead > Computation!`}
                  </pre>
                </div>
                <div>
                  <div className="mb-2 font-mono text-xs text-emerald-400">
                    // Borden's Wisdom
                  </div>
                  <pre className="overflow-x-auto rounded bg-slate-950 p-3 text-xs text-slate-300">
                    {`// Just compute it
const result = data.filter(
  item => item.type === filter
);

// Simple, fast, sustainable`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded border border-amber-500/30 bg-amber-950/20 p-4">
              <p className="text-sm italic text-slate-300">
                "The boring solution that works is better than the spectacular
                solution that kills you."
              </p>
              <p className="mt-2 text-right text-xs text-slate-400">
                — The Prestige, on performance optimization
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      {/* Header */}
      <header className="border-b border-amber-500/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-4xl font-bold text-amber-500 md:text-5xl">
                The Prestige
              </h1>
              <p className="mb-1 text-lg text-slate-400">
                Robert Angier & Alfred Borden, Victorian London
              </p>
              <p className="text-sm text-amber-500/70">
                Performance Optimization Trade-offs • useMemo Cost Analysis
              </p>
            </div>
            <div className="hidden md:block">
              <Zap className="h-16 w-16 text-amber-500/30" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-12 pb-32">
        {/* Chapter Content */}
        <div className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-amber-500">
            {currentChapter.title}
          </h2>
          <div className="prose prose-invert prose-slate max-w-none">
            {currentChapter.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4 leading-relaxed text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Interactive Demo */}
        {renderDemo()}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-amber-500/30 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="rounded border border-amber-500/50 bg-amber-500/20 px-6 py-2 text-amber-400 transition-colors hover:bg-amber-500/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-amber-500/20"
            >
              ← Previous
            </button>

            <div className="text-center">
              <div className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </div>
              <div className="mt-2 flex gap-2">
                {chapters.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setChapter(i)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === chapter
                        ? "bg-amber-500"
                        : "bg-slate-600 hover:bg-slate-500"
                    }`}
                    aria-label={`Go to chapter ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="rounded border border-amber-500/50 bg-amber-500/20 px-6 py-2 text-amber-400 transition-colors hover:bg-amber-500/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-amber-500/20"
            >
              Next →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
