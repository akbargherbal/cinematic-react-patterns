import { useState, useMemo, useEffect } from "react";
import { Brain, Zap, Clock, CheckCircle, AlertCircle } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function ArrivalUseMemo() {
  const [chapter, setChapter] = useState(0);
  const [useMemoEnabled, setUseMemoEnabled] = useState(false);
  const [symbols, setSymbols] = useState(["circle", "wave", "spiral"]);
  const [renderCount, setRenderCount] = useState(0);
  const [calculationCount, setCalculationCount] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "First Contact",
      content: `The helicopter blades cut through Montana's fog as Dr. Louise Banks pressed her forehead against the cold window. Below, the massive shell-like craft sat in the meadow, silent and impossible. She'd been summoned because she was the best—a linguist who could decode the undecipherable.

But as she stepped into the makeshift military base, Colonel Weber's briefing made one thing clear: time was running out. Every twelve hours, a new window opened in the shell. Every twelve hours, they had a chance to communicate. Every twelve hours, Louise would enter that chamber and attempt to understand beings whose very concept of language might be alien to human cognition.

The first session was exhausting. Louise stood before the transparent barrier, watching two seven-limbed creatures—Heptapods, the team called them—move with fluid grace. When they "spoke," circular symbols appeared in the air, inky and complex, each one a complete thought rather than a sequence of sounds. She recorded everything, took notes, tried to map meaning to form.

By the time she emerged, her mind felt like it had run a marathon. Understanding even one symbol required analyzing its structure, its context, its relationship to other symbols. It was like solving a multidimensional puzzle where every piece affected every other piece.

"How long until you can translate?" Weber asked.

Louise looked at her notes—pages of observations, hypotheses, dead ends. "I need more sessions. Many more."

What she didn't say: If I have to start from scratch every time, we'll never get there.

In React terms, Louise was facing an expensive calculation. Understanding the Heptapod language wasn't a simple lookup—it required deep analysis, pattern recognition, cognitive restructuring. Every time she entered that chamber, her mind had to process vast amounts of information.

The question was: Would she have to pay that cost every single time?`,
    },
    {
      id: "build",
      title: "The Exhaustion Cycle",
      content: `Days blurred together. Every morning, Louise woke in her temporary quarters, her mind foggy, her notes scattered across the desk. Every morning, she reviewed what she'd learned the previous day—or tried to. The symbols swam before her eyes, their meanings slippery, refusing to solidify.

The problem became clear during the fourth session. She'd spent hours the day before analyzing a particular logogram—a circular symbol with intricate internal structures that seemed to represent a concept related to time or sequence. She'd made progress, felt she was close to understanding.

But when she entered the chamber again and the Heptapods displayed that same symbol, her mind went blank. The analysis she'd done yesterday felt distant, inaccessible. She had to start over: examine the structure, consider the context, rebuild her understanding from first principles.

Ian Donnelly, the physicist working alongside her, noticed her frustration. "You okay?"

"I'm re-learning the same things," Louise said, her voice tight. "Every session, I have to reconstruct my understanding. It's like my brain won't hold onto the patterns."

It wasn't just mentally exhausting—it was inefficient. The military wanted answers. Other nations were making their own contact attempts. There were rumors of aggressive interpretations, of mounting fear. And here she was, spending precious hours re-deriving insights she'd already achieved.

The computational cost was staggering. Each symbol required structural analysis, contextual mapping, semantic inference, and cognitive integration. And she was doing this every single time, even for symbols she'd already analyzed.

In React terms, Louise was a component that recalculated expensive values on every render. No matter that the inputs—the symbols themselves—hadn't changed. No matter that she'd already done the work. Every time she "rendered" (entered the chamber), she paid the full computational cost.

Her team could see the toll. Dark circles under her eyes. Slower response times. Mistakes creeping into her translations. The expensive operation was running constantly, and it was unsustainable.

Something had to change.`,
    },
    {
      id: "climax",
      title: "Breaking Point",
      content: `The crisis came on day seven. Intelligence had intercepted communications suggesting that China was preparing to take military action against their landed shell. Russia was mobilizing. The global situation was deteriorating rapidly.

Weber burst into the analysis room. "We need a translation of their latest message. Now. They displayed a complex sequence—we think it might be about their purpose here."

Louise looked at the recording. Her heart sank. It was a massive logogram, composed of dozens of interlocking elements, each one a symbol she'd seen before but in new combinations. To understand it, she'd need to re-analyze each component symbol, understand their relationships, derive the composite meaning, and verify her interpretation.

She started working. Pulled up her notes on the first symbol. Began the analysis process. But then Weber called her away—another urgent matter. When she returned, she'd lost her train of thought. Started over.

An hour later, Ian needed her input on a physics question. She helped, came back to the translation. Started over again.

Each interruption was like a re-render. Each time, she had to recompute everything from scratch. The expensive calculation—understanding the language—ran again and again, even though the symbols themselves hadn't changed.

By evening, she'd made almost no progress. She sat in the empty analysis room, staring at the logogram on the screen, and felt something break inside her.

"I'm solving the same puzzle repeatedly," she whispered to the empty room.

The weight of it was crushing. Not just the mental exhaustion, but the waste. All those hours, all that cognitive effort, spent re-deriving the same insights. Meanwhile, the world was sliding toward catastrophe, and she was trapped in a loop of redundant computation.

In that moment, Louise understood the true cost of not caching expensive calculations. It wasn't just about performance metrics or render times. It was about the difference between progress and paralysis. Between understanding and confusion. Between success and failure.

She needed a way to learn the language once—truly learn it, deeply and completely—and then access that knowledge instantly, without having to recompute it every single time.

She needed memory. Not just notes on paper, but cognitive memory. The kind that persists between sessions, that caches the results of expensive calculations, that only recalculates when the inputs actually change.

She needed, though she didn't have the word for it yet, memoization.`,
    },
    {
      id: "resolution",
      title: "Non-Linear Time",
      content: `The breakthrough came not through effort, but through surrender.

Louise stopped trying to learn the language in a linear fashion—symbol by symbol, session by session. Instead, she let herself sink into it completely. She spent an entire night surrounded by recordings, letting the logograms wash over her, not analyzing but absorbing.

And something shifted.

The language itself was non-linear. Each symbol contained its entire meaning simultaneously—past, present, future, all at once. To understand it, she couldn't think in sequences. She had to think in wholes.

When she entered the chamber the next morning, everything was different.

She looked at a symbol she'd struggled with for days, and the understanding was just there. Not because she was re-analyzing it, but because she'd already done that work. The expensive calculation had run—deeply, thoroughly, completely—and now the result was cached in her mind.

More than that: she began to experience what the Heptapods experienced. Memories of the future, as vivid as memories of the past. She saw herself years from now, holding her daughter. She saw conversations that hadn't happened yet. She saw the end of the story while living its beginning.

The language had taught her to memoize reality itself.

Now, when she needed to understand a symbol, she didn't recompute. She simply remembered. The expensive operation—learning the entire language—had run once. Now she could access its results instantly.

But here was the crucial insight: the memoization wasn't absolute. When the Heptapods introduced a new symbol, one she hadn't encountered before, she still had to do the work. The expensive calculation ran again, but only for that new element. The dependencies had changed, so recalculation was necessary.

The symbols themselves were her dependency array. As long as they remained the same, she accessed cached knowledge. When they changed, she recomputed. It was efficient, elegant, and it worked.

She could now work at the speed the crisis demanded. When Weber needed a translation, she provided it instantly. When new messages arrived, she understood them without delay. The cognitive overhead was gone, replaced by fluid, immediate comprehension.

Ian noticed the change. "What happened to you?"

Louise smiled, seeing both his question now and her answer in the future, all at once. "I learned to remember forward."

She'd learned to cache expensive calculations. She'd learned that some operations are too costly to run on every render. She'd learned that memoization isn't about avoiding work—it's about doing the work once, deeply and well, and then trusting the cached result until the inputs actually change.`,
    },
    {
      id: "summary",
      title: "The Gift of Memory",
      content: `In the end, Louise saved the world not through frantic effort, but through efficient cognition.

The contrast was stark. Before her breakthrough, she was trapped in an exhaustion cycle: every session required full re-analysis, every interruption meant starting over, progress was glacial and unsustainable, the expensive operation ran constantly.

After learning to memoize: knowledge was instantly accessible, interruptions didn't destroy progress, she could work at the speed of thought, the expensive operation ran only when necessary.

The Heptapods' final message, the one that prevented global war, was complex beyond measure. Without memoization, Louise could never have translated it in time. But with her cached understanding of the language, she decoded it in minutes.

"They're offering a gift," she told Weber. "In three thousand years, humanity will help them. They're here now because they need us then. It's an exchange across time."

The military stood down. The world stepped back from the brink. And Louise understood that the gift wasn't just the Heptapods' technology or knowledge—it was the lesson of non-linear time itself. The lesson of memoization.

useMemo is React's way of caching expensive calculations. Just as Louise didn't need to re-learn the Heptapod language on every session, your components don't need to recalculate expensive values on every render.

When to use useMemo: the calculation is genuinely expensive (complex computations, large data transformations), the inputs (dependencies) don't change frequently, the component re-renders often, and you've measured and confirmed a performance problem.

The dependency array is crucial. List all values the calculation depends on. When dependencies change, the calculation runs again. When dependencies stay the same, the cached value is returned. Missing dependencies lead to stale cached values. Unnecessary dependencies cause too much recalculation.

The trade-off: memoization itself has a cost. React must store the cached value in memory, compare dependencies on each render, and manage the cache lifecycle.

Don't memoize everything. Like Louise, focus on the truly expensive operations—the ones that would exhaust your application if run constantly.

Louise's journey teaches us that optimization isn't about avoiding work—it's about doing expensive work once, caching the result, and only recalculating when the inputs actually change.

She learned to remember forward. Your React components can learn to remember efficiently.

The gift of memory, whether across time or across renders, is the gift of sustainable performance.`,
    },
  ];

  const currentChapter = chapters[chapter];

  // Expensive calculation simulation
  const expensiveLanguageAnalysis = (symbolArray: string[]): string => {
    setIsCalculating(true);
    setCalculationCount((prev) => prev + 1);

    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < 50000000; i++) {
      result += Math.sqrt(i);
    }

    setTimeout(() => setIsCalculating(false), 100);
    return `Language analysis complete: ${symbolArray.join(" → ")} [${symbolArray.length} symbols decoded]`;
  };

  // Memoized version
  const memoizedAnalysis = useMemo(
    () => expensiveLanguageAnalysis(symbols),
    [symbols]
  );

  // Non-memoized version (runs on every render)
  const nonMemoizedAnalysis = expensiveLanguageAnalysis(symbols);

  const analysisResult = useMemoEnabled ? memoizedAnalysis : nonMemoizedAnalysis;

  // Trigger a "render" (simulates component re-rendering)
  const triggerRender = () => {
    setRenderCount((prev) => prev + 1);
  };

  // Reset demo state when changing chapters
  useEffect(() => {
    setRenderCount(0);
    setCalculationCount(0);
    setUseMemoEnabled(chapter >= 3); // Enable memoization from chapter 4 onwards
  }, [chapter]);

  // Update symbols (changes dependencies)
  const updateSymbols = (newSymbols: string[]) => {
    setSymbols(newSymbols);
  };

  const symbolOptions = [
    ["circle", "wave", "spiral"],
    ["triangle", "helix", "vortex"],
    ["square", "pulse", "orbit"],
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-teal-400" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">
              Arrival: useMemo
            </h1>
          </div>
          <p className="text-base sm:text-lg text-slate-400">
            Dr. Louise Banks, Montana, 2016 • Performance Optimization
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 pb-32 sm:px-6 lg:px-8">
        {/* Chapter Content */}
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-400 mb-6">
            {currentChapter.title}
          </h2>
          <div className="prose prose-invert prose-slate max-w-none">
            {currentChapter.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Interactive Demonstrations */}
        {chapter === 0 && (
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 sm:p-8">
            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-teal-400" />
              Heptapod Symbols
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {["circle", "wave", "spiral"].map((symbol) => (
                <div
                  key={symbol}
                  className="w-24 h-24 rounded-full border-2 border-teal-500/30 bg-teal-950/20 flex items-center justify-center"
                >
                  <span className="text-teal-400 text-sm font-mono">
                    {symbol}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-6 text-center">
              Each symbol requires deep analysis to understand. The question is:
              how often must we analyze them?
            </p>
          </div>
        )}

        {chapter >= 1 && chapter <= 2 && (
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                Language Learning Simulator
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-400">Memoization:</span>
                <span className="font-mono text-amber-400">DISABLED</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800/50 rounded p-4 border border-slate-700">
                <div className="text-slate-400 text-sm mb-1">Renders</div>
                <div className="text-2xl font-bold text-slate-100">
                  {renderCount}
                </div>
              </div>
              <div className="bg-slate-800/50 rounded p-4 border border-amber-500/30">
                <div className="text-slate-400 text-sm mb-1">
                  Calculations
                </div>
                <div className="text-2xl font-bold text-amber-400">
                  {calculationCount}
                </div>
              </div>
              <div className="bg-slate-800/50 rounded p-4 border border-slate-700">
                <div className="text-slate-400 text-sm mb-1">Efficiency</div>
                <div className="text-2xl font-bold text-red-400">
                  {renderCount > 0
                    ? `${((calculationCount / renderCount) * 100).toFixed(0)}%`
                    : "0%"}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">
                  Analysis Progress
                </span>
                {isCalculating && (
                  <span className="text-xs text-amber-400 animate-pulse">
                    Computing...
                  </span>
                )}
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-300"
                  style={{
                    width: isCalculating ? "100%" : "0%",
                  }}
                />
              </div>
            </div>

            <div className="bg-slate-800/30 rounded p-4 mb-6 font-mono text-sm text-slate-300 border border-slate-700">
              {analysisResult}
            </div>

            <button
              onClick={triggerRender}
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded transition-colors"
            >
              Trigger Session (Re-render)
            </button>

            <p className="text-slate-400 text-sm mt-6">
              {chapter === 1
                ? "Notice: Every session requires full re-analysis. The calculation runs every time, even though the symbols haven't changed."
                : "Crisis mode: Each interruption forces Louise to start over. Watch the calculation count climb with each render."}
            </p>
          </div>
        )}

        {chapter === 3 && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-teal-500/30 rounded-lg p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  Optimized Language Learning
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400">Memoization:</span>
                  <span className="font-mono text-teal-400">ENABLED</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-800/50 rounded p-4 border border-slate-700">
                  <div className="text-slate-400 text-sm mb-1">Renders</div>
                  <div className="text-2xl font-bold text-slate-100">
                    {renderCount}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded p-4 border border-teal-500/30">
                  <div className="text-slate-400 text-sm mb-1">
                    Calculations
                  </div>
                  <div className="text-2xl font-bold text-teal-400">
                    {calculationCount}
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded p-4 border border-slate-700">
                  <div className="text-slate-400 text-sm mb-1">Efficiency</div>
                  <div className="text-2xl font-bold text-teal-400">
                    {renderCount > 0
                      ? `${(100 - (calculationCount / renderCount) * 100).toFixed(0)}%`
                      : "100%"}
                  </div>
                </div>
              </div>

              <div className="bg-teal-950/20 border border-teal-500/30 rounded p-4 mb-6">
                <div className="text-teal-400 text-sm mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Cached Result
                </div>
                <div className="font-mono text-sm text-slate-300">
                  {analysisResult}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={triggerRender}
                  className="flex-1 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-semibold rounded transition-colors"
                >
                  Trigger Session (Re-render)
                </button>
                <button
                  onClick={() =>
                    updateSymbols(
                      symbolOptions[
                        Math.floor(Math.random() * symbolOptions.length)
                      ]
                    )
                  }
                  className="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded transition-colors"
                >
                  Change Symbols (Dependencies)
                </button>
              </div>

              <div className="bg-slate-800/30 rounded p-4 border border-slate-700">
                <div className="text-slate-400 text-sm mb-2">
                  Current Dependencies:
                </div>
                <div className="flex flex-wrap gap-2">
                  {symbols.map((symbol, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-teal-950/30 border border-teal-500/30 rounded text-teal-400 text-sm font-mono"
                    >
                      {symbol}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-slate-400 text-sm mt-6">
                Notice: The calculation only runs when symbols change. Multiple
                renders with the same dependencies return the cached result
                instantly.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-teal-400" />
                The useMemo Pattern
              </h3>
              <pre className="bg-slate-950 border border-slate-700 rounded p-4 overflow-x-auto text-sm">
                <code className="text-slate-300">
                  {`const languageUnderstanding = useMemo(() => {
  // Expensive calculation: learn the Heptapod language
  // This involves deep cognitive restructuring,
  // pattern recognition, and integration
  return learnHeptapodLanguage(symbols);
}, [symbols]); // Only recalculate when symbols change`}
                </code>
              </pre>
            </div>
          </div>
        )}

        {chapter === 4 && (
          <div className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-100 mb-6">
                Performance Comparison
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-red-400 mb-4">
                    Without useMemo
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Calculation runs on every render</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Wasted computational resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>Performance degradation over time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <span>User experience suffers</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-teal-950/20 border border-teal-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-teal-400 mb-4">
                    With useMemo
                  </h4>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span>Calculation runs only when needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span>Cached results returned instantly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span>Consistent performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 mt-1">✓</span>
                      <span>Smooth user experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-100 mb-4">
                When to Use useMemo
              </h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-100">
                      Expensive Calculations
                    </div>
                    <div className="text-sm text-slate-400">
                      Complex computations, large data transformations, or
                      operations that take noticeable time
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-100">
                      Stable Dependencies
                    </div>
                    <div className="text-sm text-slate-400">
                      The inputs don't change frequently, making caching
                      worthwhile
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-100">
                      Frequent Re-renders
                    </div>
                    <div className="text-sm text-slate-400">
                      The component re-renders often, amplifying the cost of
                      recalculation
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-slate-100">
                      Measured Performance Issues
                    </div>
                    <div className="text-sm text-slate-400">
                      You've profiled and confirmed that the calculation is a
                      bottleneck
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-amber-500/30 rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-400" />
                Common Pitfalls
              </h3>
              <div className="space-y-4 text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5">⚠</span>
                  <div>
                    <div className="font-semibold text-slate-100">
                      Over-memoization
                    </div>
                    <div className="text-sm text-slate-400">
                      Memoizing cheap calculations adds overhead without benefit
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5">⚠</span>
                  <div>
                    <div className="font-semibold text-slate-100">
                      Incorrect Dependencies
                    </div>
                    <div className="text-sm text-slate-400">
                      Missing or wrong dependencies lead to stale cached values
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-amber-400 mt-0.5">⚠</span>
                  <div>
                    <div className="font-semibold text-slate-100">
                      Premature Optimization
                    </div>
                    <div className="text-sm text-slate-400">
                      Profile first, optimize second—don't guess at performance
                      issues
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 sm:p-8">
              <h3 className="text-xl font-bold text-slate-100 mb-4">
                The Complete Pattern
              </h3>
              <pre className="bg-slate-950 border border-slate-700 rounded p-4 overflow-x-auto text-sm">
                <code className="text-slate-300">
                  {`import { useMemo } from 'react';

function LanguageAnalyzer({ symbols }) {
  // Expensive calculation with proper memoization
  const analysis = useMemo(() => {
    // This only runs when 'symbols' changes
    return analyzeHeptapodLanguage(symbols);
  }, [symbols]); // Dependency array
  
  return <div>{analysis}</div>;
}

// The trade-off: memoization has overhead
// - Memory to store cached value
// - Comparison of dependencies on each render
// - Cache lifecycle management
//
// Use it when the calculation cost exceeds
// the memoization overhead`}
                </code>
              </pre>
            </div>
          </div>
        )}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="px-4 sm:px-6 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-semibold rounded transition-colors text-sm sm:text-base"
            >
              Previous
            </button>

            <div className="text-center">
              <div className="text-xs sm:text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </div>
              <div className="text-xs text-slate-500 hidden sm:block">
                {currentChapter.title}
              </div>
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-4 sm:px-6 py-2 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-semibold rounded transition-colors text-sm sm:text-base"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}