import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Brain,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Timer,
  GitCompare,
  List,
  Key,
  Cpu,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  title: string;
  content: string;
  atmosphere: string;
}

export default function ReconciliationAsHeptapodLanguage(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [parentRef] = useAutoAnimate();
  const [animationRef] = useAutoAnimate();

  // Demo 1: Real DOM vs Virtual DOM
  const [realDomCount, setRealDomCount] = useState<number>(0);
  const [virtualDomCount, setVirtualDomCount] = useState<number>(0);
  const [realDomUpdates, setRealDomUpdates] = useState<number>(0);
  const [virtualDomUpdates, setVirtualDomUpdates] = useState<number>(0);

  // Demo 2: Keys anti-pattern
  const [logograms, setLogograms] = useState<string[]>([
    "weapon",
    "tool",
    "gift",
    "language",
    "time",
  ]);
  const [logogramsNoKey, setLogogramsNoKey] = useState<string[]>([
    "weapon",
    "tool",
    "gift",
    "language",
    "time",
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [selectedIndexNoKey, setSelectedIndexNoKey] = useState<number>(1);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [renderCountNoKey, setRenderCountNoKey] = useState<number>(0);

  // Demo 3: Reconciliation visualization
  const [oldTree, setOldTree] = useState<number[]>([1, 2, 3, 4, 5]);
  const [newTree, setNewTree] = useState<number[]>([1, 2, 6, 4, 5]);
  const [highlightedDiff, setHighlightedDiff] = useState<number>(-1);

  // Demo 4: Keys comparison
  const [listWithKeys, setListWithKeys] = useState<
    Array<{ id: string; name: string; count: number }>
  >([
    { id: "item-1", name: "General Shang's Ship", count: 0 },
    { id: "item-2", name: "Support Unit Alpha", count: 0 },
    { id: "item-3", name: "Supply Convoy", count: 0 },
  ]);
  const [listWithoutKeys, setListWithoutKeys] = useState<
    Array<{ id: string; name: string; count: number }>
  >([
    { id: "item-1", name: "General Shang's Ship", count: 0 },
    { id: "item-2", name: "Support Unit Alpha", count: 0 },
    { id: "item-3", name: "Supply Convoy", count: 0 },
  ]);
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    withKeys: number;
    withoutKeys: number;
  }>({ withKeys: 0, withoutKeys: 0 });

  // Demo 5: Mastery demonstration
  const [masterForm, setMasterForm] = useState({
    name: "",
    email: "",
    role: "developer",
    experience: "intermediate",
    tools: ["react", "typescript"],
    timestamp: Date.now(),
  });
  const [formRenderCount, setFormRenderCount] = useState<number>(0);
  const [optimizedFormRenderCount, setOptimizedFormRenderCount] =
    useState<number>(0);

  // Timer leak demonstration (with safety limits)
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [timerIds, setTimerIds] = useState<NodeJS.Timeout[]>([]);
  const maxLeakedTimers = 50;

  const chapters: Chapter[] = [
    {
      title: "The Weight of a Single Word",
      content:
        "The air inside the suit always tasted stale, recycled one too many times. Louise adjusted the microphone, her breath fogging the inside of her helmet. Beyond the thick glass partition, the world was a uniform, luminous white fog. In the center of it, the immense, seven-limbed form of a Heptapod shifted, its texture like carved stone. 'Ask... them... what... their... purpose... is,' Colonel Weber's voice crackled in her ear, each word a distinct, separate command. Louise took a breath. 'What is your purpose on Earth?' she spoke into the mic. Her words appeared, stark and linear, on the monitor facing the creature. The process was agonizingly slow. Each word was a discrete packet of information, a single, heavy stone she had to lay down in a long, uncertain line. Every word was a step in the dark, a single frame in a movie I couldn't see. There was no context, no flow, just a sequence of isolated commands sent into the void. This was communication as brute force.",
      atmosphere: "sterile, tense, mysterious",
    },
    {
      title: "Drowning in Transcripts",
      content:
        "The floor of the temporary command post was no longer visible. It was a sea of paper, a sprawling map of conversations printed in 12-point font. At three in the morning, surrounded by the ghosts of empty coffee cups, Louise was on her hands and knees, crawling between two massive printouts. One was yesterday's logogram transcript; the other was from an hour ago. A red pen was clenched in her hand, its cap chewed to plastic shreds. Her back screamed in protest as she drew another shaky circle. 'Okay... here,' she muttered to herself, her voice hoarse. 'They replaced humanity with human species. A subtle change. And here... the clause about time has moved from sentence five to sentence two.' She was comparing the entire state of the conversation, word by painful word. It was the only way she knew. To find the one critical change, she had to re-process everything, every single element, from scratch.",
      atmosphere: "frustration, inefficiency, pain",
    },
    {
      title: "The Shape of the Story",
      content:
        "Louise stood in front of the whiteboard in her quarters, the marker feeling heavy in her hand. She had failed. The linear, word-by-word approach was a dead end, a swamp of meaningless details. She was drowning. Closing her eyes, she tried to shut out the noise, the pressure, the endless lines of text. She pictured the logogram from yesterday, not its translation, but its shape. The elegant, smoky circle. Then, she pictured the new one. Another circle, almost identical. The old way was to flatten them into thousands of words and compare them. A thought, wild and strange, sparked in her mind. What if she didn't? In the quiet darkness behind her eyelids, she let the two images drift. She pulled the new logogram forward, laying it directly over the old one, like two transparencies on a projector. For a second, her stomach lurched with a feeling of intense vertigo, the sensation of her mind being fundamentally rewired. The two images flickered, then settled. And then she saw it.",
      atmosphere: "triumphant, elegant, satisfying",
    },
    {
      title: "Two Timelines, One Truth",
      content:
        "Colonel Weber, now a cautious believer, presented Louise with a final test. Two incredibly dense logograms had arrived from the Chinese landing site, detailing military positions. 'The old way first, Banks,' he ordered. 'Show me what you would have done yesterday.' Louise nodded. A printer began to hum, spitting out page after page of raw text analysis. The scene was a familiar nightmare: papers spread across the floor, Louise on her knees with a highlighter, her brow furrowed in concentration. An hour passed. Finally, she stood up, brushing dust from her pants. 'Okay,' she said, sounding tired. 'There are seventeen changes. They've rephrased the battalion names, changed the syntax describing their supply lines, and altered the honorifics for their commanders. It's a lot of noise. I think their posture is more aggressive, but I can't be certain.' The result was a mountain of data with very little actionable intelligence.",
      atmosphere: "reflective, comparative, analytical",
    },
    {
      title: "The Language of Now",
      content:
        "In the final days, the glass partition felt less like a barrier and more like a shared canvas. Louise no longer wore the bulky suit. She stood before the luminous fog, a simple headset her only interface. Abbott raised a limb, and the familiar black ink began to spread. But this time, Louise didn't wait. As the logogram was still forming, its tendrils still expanding towards their final meaning, her own mind was already working. She saw the trajectory of the ink, anticipated the final shape of the thought, and understood the change it represented from the previous state before it was even complete. She began speaking her reply while Abbott was still 'rendering' its message. The conversation became a seamless, overlapping dance of state and response. She wasn't translating anymore. She was thinking in Heptapod. She had mastered the art of seeing the state, not the steps.",
      atmosphere: "celebratory, confident, complete",
    },
  ];

  // Code examples for CodeBlock
  const realDomCode = `// ❌ Brute-force DOM updates (Linear Time)
function updateCounter(value) {
  // Destroy old element
  const container = document.getElementById('counter');
  container.innerHTML = '';
  
  // Recreate entire element
  const newElement = document.createElement('div');
  newElement.id = 'counter';
  newElement.textContent = \`Count: \${value}\`;
  
  // Reattach to DOM
  document.body.appendChild(newElement);
}`;

  const virtualDomCode = `// ✅ React's Virtual DOM (Heptapod Logogram)
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div id="counter">
      Count: {count}
    </div>
  );
}

// React compares Virtual DOM snapshots
// Only updates the changed text node
// Minimal DOM operations`;

  const missingKeysCode = `// ❌ List without keys (Anonymous Events)
function LogogramList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>  // No key prop!
      ))}
    </ul>
  );
}

// When list reorders, React can't track identity
// Causes unnecessary re-renders and state loss`;

  const withKeysCode = `// ✅ List with keys (Unique Entities)
function LogogramList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>  {/* Unique key! */}
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// React tracks each element's identity
// Efficient updates when list changes`;

  const directMutationCode = `// ❌ Direct state mutation (Altering Memory)
function handleClick() {
  // This won't trigger re-render
  stateObject.property = 'new value';
  
  // React doesn't know about the change
  // No reconciliation occurs
}`;

  const properUpdateCode = `// ✅ Proper state update (New Snapshot)
function handleClick() {
  // Create new object reference
  setStateObject(prev => ({
    ...prev,
    property: 'new value'
  }));
  
  // React sees the change
  // Triggers reconciliation
}`;

  const useEffectCleanupCode = `// ✅ Proper cleanup (Circuit Breaker)
useEffect(() => {
  const timer = setInterval(() => {
    // Update state
  }, 1000);
  
  // Required cleanup function
  return () => clearInterval(timer);
}, []);`;

  // Demo functions
  const incrementRealDom = () => {
    setRealDomCount((prev) => prev + 1);
    setRealDomUpdates((prev) => prev + 10); // Simulating 10x more operations
  };

  const incrementVirtualDom = () => {
    setVirtualDomCount((prev) => prev + 1);
    setVirtualDomUpdates((prev) => prev + 1);
  };

  const shuffleLogograms = () => {
    const shuffled = [...logograms].sort(() => Math.random() - 0.5);
    setLogograms(shuffled);
    setRenderCount((prev) => prev + 1);

    const shuffledNoKey = [...logogramsNoKey].sort(() => Math.random() - 0.5);
    setLogogramsNoKey(shuffledNoKey);
    setRenderCountNoKey((prev) => prev + 5); // Simulating more renders
  };

  const simulateReconciliation = () => {
    const randomIndex = Math.floor(Math.random() * oldTree.length);
    const newValue = Math.floor(Math.random() * 100);

    const newArray = [...oldTree];
    newArray[randomIndex] = newValue;

    setNewTree(newArray);
    setHighlightedDiff(randomIndex);

    setTimeout(() => setHighlightedDiff(-1), 1000);
  };

  const reorderWithKeys = () => {
    const reordered = [...listWithKeys];
    const [moved] = reordered.splice(1, 1);
    reordered.unshift(moved);

    // Only increment count for moved item
    const updated = reordered.map((item, index) =>
      index === 0 ? { ...item, count: item.count + 1 } : item,
    );

    setListWithKeys(updated);

    // Performance measurement
    setPerformanceMetrics((prev) => ({ ...prev, withKeys: prev.withKeys + 1 }));
  };

  const reorderWithoutKeys = () => {
    const reordered = [...listWithoutKeys];
    const [moved] = reordered.splice(1, 1);
    reordered.unshift(moved);

    // Increment all counts (state loss simulation)
    const updated = reordered.map((item) => ({
      ...item,
      count: item.count + 1,
    }));

    setListWithoutKeys(updated);
    setPerformanceMetrics((prev) => ({
      ...prev,
      withoutKeys: prev.withoutKeys + 5,
    }));
  };

  const leakTimers = () => {
    if (leakedTimers >= maxLeakedTimers) {
      resetLeakedTimers();
      return;
    }

    const newTimer = setInterval(() => {
      setLeakedTimers((prev) => {
        if (prev >= maxLeakedTimers) {
          clearInterval(newTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    setTimerIds((prev) => [...prev, newTimer]);
  };

  const resetLeakedTimers = () => {
    timerIds.forEach((id) => clearInterval(id));
    setTimerIds([]);
    setLeakedTimers(0);
  };

  // Circuit breaker for timer leak
  useEffect(() => {
    if (leakedTimers >= maxLeakedTimers) {
      resetLeakedTimers();
    }
  }, [leakedTimers]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      timerIds.forEach((id) => clearInterval(id));
    };
  }, []);

  const currentChapter = chapters[chapter];

  // Logogram visualization for sidebar
  const renderLogogram = () => {
    const basePoints = Array.from({ length: 8 }, (_, i) => {
      const angle = (i * Math.PI * 2) / 8;
      return {
        x: 50 + 40 * Math.cos(angle),
        y: 50 + 40 * Math.sin(angle),
      };
    });

    const tendrils = basePoints.map((point, i) => {
      const variation = chapter * 0.1 + i * 0.3;
      return {
        ...point,
        endX: 50 + (60 + Math.sin(variation) * 20) * Math.cos(angle),
        endY: 50 + (60 + Math.cos(variation) * 20) * Math.sin(angle),
        isDiff: highlightedDiff === i % oldTree.length,
      };
    });

    return (
      <svg width="100%" height="200" viewBox="0 0 100 100" className="mb-6">
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="rgb(249 115 22 / 0.3)"
          strokeWidth="1"
        />
        {tendrils.map((t, i) => (
          <g key={i}>
            <circle cx={t.x} cy={t.y} r="2" fill="rgb(249 115 22)" />
            <path
              d={`M ${t.x} ${t.y} Q ${(t.x + t.endX) / 2} ${(t.y + t.endY) / 2 + 5} ${t.endX} ${t.endY}`}
              fill="none"
              stroke={t.isDiff ? "#10b981" : "rgb(249 115 22 / 0.5)"}
              strokeWidth={t.isDiff ? "2" : "1"}
              className={t.isDiff ? "animate-pulse" : ""}
            />
            <circle
              cx={t.endX}
              cy={t.endY}
              r="1.5"
              fill={t.isDiff ? "#10b981" : "rgb(249 115 22 / 0.7)"}
            />
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Brain className="h-7 w-7 text-orange-500" />
              <h1 className="text-2xl font-bold md:text-3xl">Arrival</h1>
            </div>
            <p className="text-sm text-slate-400 md:text-base">
              Science Fiction • Dr. Louise Banks • 2016
            </p>
          </div>
          <p className="text-base font-medium text-orange-500 md:text-lg">
            Reconciliation and Virtual DOM
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-12">
        {/* Main Content - 8 columns on desktop */}
        <div className="space-y-8 lg:col-span-8">
          {/* Chapter Content */}
          <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-orange-400">
                {currentChapter.title}
              </h2>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
                Atmosphere: {currentChapter.atmosphere}
              </span>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="mb-4 text-lg leading-relaxed">
                {currentChapter.content}
              </p>

              {/* Memorable phrase for each chapter */}
              <div className="my-6 rounded-r border-l-4 border-orange-500 bg-orange-950/20 py-3 pl-4 italic">
                {chapter === 0 &&
                  "Every word was a step in the dark, a single frame in a movie I couldn't see."}
                {chapter === 1 &&
                  "We're re-reading the entire book from the first page, just to see if they changed a comma on the last."}
                {chapter === 2 &&
                  "Stop reading the sentences. See the shape of the story."}
                {chapter === 3 &&
                  "I stopped re-living the timeline. I just compared the snapshots."}
                {chapter === 4 &&
                  "The past and the future are just two versions of the same file. The trick is seeing the diff."}
              </div>
            </div>
          </section>

          {/* Interactive Demo Section */}
          <section
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
            ref={parentRef}
          >
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
              <GitCompare className="h-5 w-5 text-orange-500" />
              Interactive Demonstration
            </h3>

            {/* Chapter 1: Real DOM vs Virtual DOM */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <h4 className="font-bold">Real DOM (Linear Time)</h4>
                    </div>
                    <p className="mb-4 text-sm text-slate-400">
                      Brute-force updates: Destroy and rebuild entire UI
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Counter Value:</span>
                        <span className="font-mono text-2xl font-bold">
                          {realDomCount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>DOM Operations:</span>
                        <span className="font-mono text-xl text-red-400">
                          {realDomUpdates}
                        </span>
                      </div>
                      <button
                        onClick={incrementRealDom}
                        className="w-full rounded bg-red-600 py-2 text-white transition-colors hover:bg-red-700"
                      >
                        Increment (Costly Update)
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <h4 className="font-bold">Virtual DOM (Logogram)</h4>
                    </div>
                    <p className="mb-4 text-sm text-slate-400">
                      Efficient updates: Compare snapshots, apply minimal diff
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Counter Value:</span>
                        <span className="font-mono text-2xl font-bold">
                          {virtualDomCount}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>DOM Operations:</span>
                        <span className="font-mono text-xl text-emerald-400">
                          {virtualDomUpdates}
                        </span>
                      </div>
                      <button
                        onClick={incrementVirtualDom}
                        className="w-full rounded bg-emerald-600 py-2 text-white transition-colors hover:bg-emerald-700"
                      >
                        Increment (Efficient Update)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CodeBlock
                    code={realDomCode}
                    variant="error"
                    title="// ❌ Linear DOM Updates (Brute Force)"
                    defaultExpanded={true}
                  />
                  <CodeBlock
                    code={virtualDomCode}
                    variant="success"
                    title="// ✅ Virtual DOM Snapshot (Efficient)"
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}

            {/* Chapter 2: Keys Anti-pattern */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                        <h4 className="font-bold">Without Keys (Anonymous)</h4>
                      </div>
                      <span className="rounded bg-red-500/20 px-2 py-1 text-sm">
                        Renders: {renderCountNoKey}
                      </span>
                    </div>
                    <div className="mb-4 space-y-3" ref={animationRef}>
                      {logogramsNoKey.map((item, index) => (
                        <div
                          key={index} // ❌ Using index as key (anti-pattern!)
                          className={`rounded border p-3 transition-all ${selectedIndexNoKey === index ? "border-red-500 bg-red-500/20" : "border-slate-700 bg-slate-800/50"}`}
                          onClick={() => setSelectedIndexNoKey(index)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item}</span>
                            <span className="text-xs opacity-70">
                              Index: {index}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mb-4 text-sm text-slate-400">
                      Cannot track identity when items reorder
                    </p>
                    <button
                      onClick={shuffleLogograms}
                      className="w-full rounded bg-red-600 py-2 text-white transition-colors hover:bg-red-700"
                    >
                      Shuffle (State Loss Risk)
                    </button>
                  </div>

                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-emerald-500" />
                        <h4 className="font-bold">With Unique Keys</h4>
                      </div>
                      <span className="rounded bg-emerald-500/20 px-2 py-1 text-sm">
                        Renders: {renderCount}
                      </span>
                    </div>
                    <div className="mb-4 space-y-3" ref={animationRef}>
                      {logograms.map((item, index) => (
                        <div
                          key={item} // ✅ Using item value as key
                          className={`rounded border p-3 transition-all ${selectedIndex === index ? "border-emerald-500 bg-emerald-500/20" : "border-slate-700 bg-slate-800/50"}`}
                          onClick={() => setSelectedIndex(index)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{item}</span>
                            <span className="text-xs opacity-70">
                              Key: {item}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mb-4 text-sm text-slate-400">
                      Tracks identity through reordering
                    </p>
                    <button
                      onClick={shuffleLogograms}
                      className="w-full rounded bg-emerald-600 py-2 text-white transition-colors hover:bg-emerald-700"
                    >
                      Shuffle (Preserves State)
                    </button>
                  </div>
                </div>

                <CodeBlock
                  code={missingKeysCode}
                  variant="error"
                  title="// ❌ Missing Keys Cause Identity Confusion"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 3: Reconciliation Visualization */}
            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg bg-slate-800/50 p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h4 className="text-lg font-bold">
                      Reconciliation: Finding the Diff
                    </h4>
                    <button
                      onClick={simulateReconciliation}
                      className="rounded bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
                    >
                      Generate Change
                    </button>
                  </div>

                  <div className="mb-6 grid grid-cols-2 gap-8">
                    <div>
                      <h5 className="mb-3 font-medium text-slate-400">
                        Old VDOM Tree
                      </h5>
                      <div className="space-y-2">
                        {oldTree.map((value, index) => (
                          <div
                            key={index}
                            className={`rounded border p-3 ${highlightedDiff === index ? "border-red-500 bg-red-950/30" : "border-slate-700 bg-slate-800/30"}`}
                          >
                            <div className="flex justify-between">
                              <span>Node {index + 1}</span>
                              <span className="font-mono">{value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h5 className="mb-3 font-medium text-slate-400">
                        New VDOM Tree
                      </h5>
                      <div className="space-y-2">
                        {newTree.map((value, index) => (
                          <div
                            key={index}
                            className={`rounded border p-3 ${highlightedDiff === index ? "border-emerald-500 bg-emerald-950/30" : "border-slate-700 bg-slate-800/30"}`}
                          >
                            <div className="flex justify-between">
                              <span>Node {index + 1}</span>
                              <span className="font-mono">{value}</span>
                            </div>
                            {highlightedDiff === index && (
                              <div className="mt-2 flex items-center gap-1 text-xs text-emerald-400">
                                <GitCompare className="h-3 w-3" />
                                Only this node changed
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rounded border border-slate-700 bg-slate-800/30 p-4 text-center">
                    <p className="text-sm text-slate-400">
                      React compares these two trees and finds the{" "}
                      <span className="font-medium text-emerald-400">
                        single difference
                      </span>
                      . Only that one DOM element gets updated.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 4: Keys Comparison */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <List className="h-5 w-5 text-red-500" />
                        <h4 className="font-bold">List Without Keys</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        <span className="text-sm">
                          Cost: {performanceMetrics.withoutKeys} ops
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 space-y-3">
                      {listWithoutKeys.map((item, index) => (
                        <div
                          key={index} // ❌ Index as key
                          className="rounded border border-slate-700 bg-slate-800/50 p-3"
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="rounded bg-red-500/20 px-2 py-1 text-xs">
                                Clicks: {item.count}
                              </span>
                              <span className="text-xs opacity-70">
                                Pos: {index}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={reorderWithoutKeys}
                      className="w-full rounded bg-red-600 py-2 text-white transition-colors hover:bg-red-700"
                    >
                      Move Command Ship (Inefficient)
                    </button>
                    <p className="mt-3 text-xs text-slate-400">
                      All items lose their click counts when reordered
                    </p>
                  </div>

                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-emerald-500" />
                        <h4 className="font-bold">List With Unique Keys</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4" />
                        <span className="text-sm">
                          Cost: {performanceMetrics.withKeys} ops
                        </span>
                      </div>
                    </div>
                    <div className="mb-4 space-y-3">
                      {listWithKeys.map((item) => (
                        <div
                          key={item.id} // ✅ Unique key
                          className="rounded border border-slate-700 bg-slate-800/50 p-3"
                        >
                          <div className="flex items-center justify-between">
                            <span>{item.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="rounded bg-emerald-500/20 px-2 py-1 text-xs">
                                Clicks: {item.count}
                              </span>
                              <span className="text-xs opacity-70">
                                ID: {item.id}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={reorderWithKeys}
                      className="w-full rounded bg-emerald-600 py-2 text-white transition-colors hover:bg-emerald-700"
                    >
                      Move Command Ship (Efficient)
                    </button>
                    <p className="mt-3 text-xs text-slate-400">
                      Only moved item updates, click counts preserved
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CodeBlock
                    code={directMutationCode}
                    variant="error"
                    title="// ❌ Direct Mutation (Breaks Reconciliation)"
                    defaultExpanded={true}
                  />
                  <CodeBlock
                    code={withKeysCode}
                    variant="success"
                    title="// ✅ Keys for Identity Tracking"
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}

            {/* Chapter 5: Mastery Demonstration */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg bg-slate-800/50 p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h4 className="text-lg font-bold">
                      Mastery: Efficient State Updates
                    </h4>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-slate-400">Renders: </span>
                        <span className="font-mono">{formRenderCount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Name
                        </label>
                        <input
                          type="text"
                          value={masterForm.name}
                          onChange={(e) => {
                            setMasterForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }));
                            setFormRenderCount((prev) => prev + 1);
                          }}
                          className="w-full rounded border border-slate-700 bg-slate-800 p-3"
                          placeholder="Dr. Louise Banks"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Role
                        </label>
                        <select
                          value={masterForm.role}
                          onChange={(e) => {
                            setMasterForm((prev) => ({
                              ...prev,
                              role: e.target.value,
                            }));
                            setFormRenderCount((prev) => prev + 1);
                          }}
                          className="w-full rounded border border-slate-700 bg-slate-800 p-3"
                        >
                          <option value="linguist">Linguist</option>
                          <option value="developer">Developer</option>
                          <option value="scientist">Scientist</option>
                        </select>
                      </div>
                    </div>

                    <div className="rounded border border-slate-700 bg-slate-900/50 p-4">
                      <h5 className="mb-3 font-medium">
                        Current State Snapshot
                      </h5>
                      <pre className="overflow-auto font-mono text-sm">
                        {JSON.stringify(masterForm, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div className="mt-6 rounded border border-emerald-500/30 bg-emerald-950/20 p-4">
                    <p className="text-sm">
                      <span className="font-medium text-emerald-400">
                        ✓ Each field update triggers reconciliation
                      </span>
                      <br />
                      React compares the new VDOM snapshot with the old one and
                      updates only the changed parts. The entire form doesn't
                      re-render from scratch.
                    </p>
                  </div>
                </div>

                {/* Timer leak demonstration */}
                <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Timer className="h-5 w-5 text-red-500" />
                      <h4 className="font-bold">Memory Leak Demo</h4>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${leakedTimers > 20 ? "bg-red-500/30" : "bg-slate-800"}`}
                    >
                      Timers: {leakedTimers}/50
                    </span>
                  </div>

                  <p className="mb-4 text-sm text-slate-400">
                    Missing cleanup functions cause timer accumulation. Circuit
                    breaker activates at 50 timers.
                  </p>

                  <div className="mb-4 grid grid-cols-3 gap-4">
                    <button
                      onClick={leakTimers}
                      className="rounded bg-red-600 py-2 text-white transition-colors hover:bg-red-700"
                    >
                      Leak Timer
                    </button>
                    <button
                      onClick={resetLeakedTimers}
                      className="rounded bg-slate-700 py-2 text-white transition-colors hover:bg-slate-600"
                    >
                      Reset All
                    </button>
                    <div className="self-center text-center">
                      {leakedTimers >= 40 && (
                        <span className="text-sm text-red-400">
                          ⚠️ Circuit breaker soon
                        </span>
                      )}
                    </div>
                  </div>

                  <CodeBlock
                    code={useEffectCleanupCode}
                    variant="success"
                    title="// ✅ Always Clean Up Effects"
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}
          </section>

          {/* Navigation */}
          <nav className="flex items-center justify-between">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>

            <div className="flex flex-col items-center">
              <span className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="mt-1 h-2 w-48 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-orange-500 transition-all duration-300"
                  style={{
                    width: `${((chapter + 1) / chapters.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <button
              onClick={() =>
                setChapter(Math.min(chapters.length - 1, chapter + 1))
              }
              disabled={chapter === chapters.length - 1}
              className="flex items-center gap-2 rounded-lg bg-orange-600 px-6 py-3 text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>

        {/* Sidebar - 4 columns on desktop */}
        <div className="space-y-8 lg:col-span-4">
          {/* Logogram Visualization */}
          <div className="sticky top-24 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
              <Brain className="h-5 w-5 text-orange-500" />
              Current Logogram
            </h3>
            <div className="mb-4">{renderLogogram()}</div>
            <p className="text-sm text-slate-400">
              Each tendril represents a DOM element. When the state changes,
              only the modified tendrils update.
            </p>
          </div>

          {/* React Concept Summary */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-4 text-lg font-bold">Concept Mapping</h3>
            <div className="space-y-3">
              <div className="rounded border border-slate-700 bg-slate-800/30 p-3">
                <div className="font-medium text-orange-400">
                  Heptapod Logogram
                </div>
                <div className="text-sm text-slate-400">
                  = Virtual DOM Snapshot
                </div>
              </div>
              <div className="rounded border border-slate-700 bg-slate-800/30 p-3">
                <div className="font-medium text-orange-400">
                  Overlaying Two Logograms
                </div>
                <div className="text-sm text-slate-400">
                  = Reconciliation Diffing
                </div>
              </div>
              <div className="rounded border border-slate-700 bg-slate-800/30 p-3">
                <div className="font-medium text-orange-400">
                  Unique Named Entity
                </div>
                <div className="text-sm text-slate-400">
                  = Component with Key Prop
                </div>
              </div>
              <div className="rounded border border-slate-700 bg-slate-800/30 p-3">
                <div className="font-medium text-orange-400">
                  Linear Transcript
                </div>
                <div className="text-sm text-slate-400">
                  = Real DOM Manipulation
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="mb-4 text-lg font-bold">Reconciliation Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex justify-between text-sm">
                  <span>Efficiency Gain</span>
                  <span className="font-mono">
                    {realDomUpdates > 0
                      ? `${Math.round((realDomUpdates / virtualDomUpdates) * 100)}%`
                      : "N/A"}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (virtualDomUpdates / (realDomUpdates || 1)) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded bg-slate-800/30 p-3 text-center">
                  <div className="font-mono text-2xl font-bold text-red-400">
                    {realDomUpdates}
                  </div>
                  <div className="text-xs text-slate-400">DOM Ops (Linear)</div>
                </div>
                <div className="rounded bg-slate-800/30 p-3 text-center">
                  <div className="font-mono text-2xl font-bold text-emerald-400">
                    {virtualDomUpdates}
                  </div>
                  <div className="text-xs text-slate-400">DOM Ops (VDOM)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="rounded-xl border border-orange-500/30 bg-orange-950/20 p-6">
            <h3 className="mb-4 text-lg font-bold">Key Takeaways</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                <span className="text-sm">
                  React uses Virtual DOM for efficient updates
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                <span className="text-sm">
                  Always provide unique keys for list items
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                <span className="text-sm">
                  Clean up effects to prevent memory leaks
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
                <span className="text-sm">Never mutate state directly</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
