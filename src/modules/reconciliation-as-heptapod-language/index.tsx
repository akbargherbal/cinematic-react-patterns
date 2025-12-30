import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Brain, ChevronLeft, ChevronRight, RefreshCw, AlertTriangle, CheckCircle, Eye, EyeOff, Timer, GitCompare, List, Key, Cpu } from "lucide-react";
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
  const [logograms, setLogograms] = useState<string[]>(["weapon", "tool", "gift", "language", "time"]);
  const [logogramsNoKey, setLogogramsNoKey] = useState<string[]>(["weapon", "tool", "gift", "language", "time"]);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);
  const [selectedIndexNoKey, setSelectedIndexNoKey] = useState<number>(1);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [renderCountNoKey, setRenderCountNoKey] = useState<number>(0);

  // Demo 3: Reconciliation visualization
  const [oldTree, setOldTree] = useState<number[]>([1, 2, 3, 4, 5]);
  const [newTree, setNewTree] = useState<number[]>([1, 2, 6, 4, 5]);
  const [highlightedDiff, setHighlightedDiff] = useState<number>(-1);

  // Demo 4: Keys comparison
  const [listWithKeys, setListWithKeys] = useState<Array<{id: string, name: string, count: number}>>([
    { id: "item-1", name: "General Shang's Ship", count: 0 },
    { id: "item-2", name: "Support Unit Alpha", count: 0 },
    { id: "item-3", name: "Supply Convoy", count: 0 },
  ]);
  const [listWithoutKeys, setListWithoutKeys] = useState<Array<{id: string, name: string, count: number}>>([
    { id: "item-1", name: "General Shang's Ship", count: 0 },
    { id: "item-2", name: "Support Unit Alpha", count: 0 },
    { id: "item-3", name: "Supply Convoy", count: 0 },
  ]);
  const [performanceMetrics, setPerformanceMetrics] = useState<{withKeys: number, withoutKeys: number}>({withKeys: 0, withoutKeys: 0});

  // Demo 5: Mastery demonstration
  const [masterForm, setMasterForm] = useState({
    name: "",
    email: "",
    role: "developer",
    experience: "intermediate",
    tools: ["react", "typescript"],
    timestamp: Date.now()
  });
  const [formRenderCount, setFormRenderCount] = useState<number>(0);
  const [optimizedFormRenderCount, setOptimizedFormRenderCount] = useState<number>(0);

  // Timer leak demonstration (with safety limits)
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [timerIds, setTimerIds] = useState<NodeJS.Timeout[]>([]);
  const maxLeakedTimers = 50;

  const chapters: Chapter[] = [
    {
      title: "The Weight of a Single Word",
      content: "The air inside the suit always tasted stale, recycled one too many times. Louise adjusted the microphone, her breath fogging the inside of her helmet. Beyond the thick glass partition, the world was a uniform, luminous white fog. In the center of it, the immense, seven-limbed form of a Heptapod shifted, its texture like carved stone. 'Ask... them... what... their... purpose... is,' Colonel Weber's voice crackled in her ear, each word a distinct, separate command. Louise took a breath. 'What is your purpose on Earth?' she spoke into the mic. Her words appeared, stark and linear, on the monitor facing the creature. The process was agonizingly slow. Each word was a discrete packet of information, a single, heavy stone she had to lay down in a long, uncertain line. Every word was a step in the dark, a single frame in a movie I couldn't see. There was no context, no flow, just a sequence of isolated commands sent into the void. This was communication as brute force.",
      atmosphere: "sterile, tense, mysterious"
    },
    {
      title: "Drowning in Transcripts",
      content: "The floor of the temporary command post was no longer visible. It was a sea of paper, a sprawling map of conversations printed in 12-point font. At three in the morning, surrounded by the ghosts of empty coffee cups, Louise was on her hands and knees, crawling between two massive printouts. One was yesterday's logogram transcript; the other was from an hour ago. A red pen was clenched in her hand, its cap chewed to plastic shreds. Her back screamed in protest as she drew another shaky circle. 'Okay... here,' she muttered to herself, her voice hoarse. 'They replaced humanity with human species. A subtle change. And here... the clause about time has moved from sentence five to sentence two.' She was comparing the entire state of the conversation, word by painful word. It was the only way she knew. To find the one critical change, she had to re-process everything, every single element, from scratch.",
      atmosphere: "frustration, inefficiency, pain"
    },
    {
      title: "The Shape of the Story",
      content: "Louise stood in front of the whiteboard in her quarters, the marker feeling heavy in her hand. She had failed. The linear, word-by-word approach was a dead end, a swamp of meaningless details. She was drowning. Closing her eyes, she tried to shut out the noise, the pressure, the endless lines of text. She pictured the logogram from yesterday, not its translation, but its shape. The elegant, smoky circle. Then, she pictured the new one. Another circle, almost identical. The old way was to flatten them into thousands of words and compare them. A thought, wild and strange, sparked in her mind. What if she didn't? In the quiet darkness behind her eyelids, she let the two images drift. She pulled the new logogram forward, laying it directly over the old one, like two transparencies on a projector. For a second, her stomach lurched with a feeling of intense vertigo, the sensation of her mind being fundamentally rewired. The two images flickered, then settled. And then she saw it.",
      atmosphere: "triumphant, elegant, satisfying"
    },
    {
      title: "Two Timelines, One Truth",
      content: "Colonel Weber, now a cautious believer, presented Louise with a final test. Two incredibly dense logograms had arrived from the Chinese landing site, detailing military positions. 'The old way first, Banks,' he ordered. 'Show me what you would have done yesterday.' Louise nodded. A printer began to hum, spitting out page after page of raw text analysis. The scene was a familiar nightmare: papers spread across the floor, Louise on her knees with a highlighter, her brow furrowed in concentration. An hour passed. Finally, she stood up, brushing dust from her pants. 'Okay,' she said, sounding tired. 'There are seventeen changes. They've rephrased the battalion names, changed the syntax describing their supply lines, and altered the honorifics for their commanders. It's a lot of noise. I think their posture is more aggressive, but I can't be certain.' The result was a mountain of data with very little actionable intelligence.",
      atmosphere: "reflective, comparative, analytical"
    },
    {
      title: "The Language of Now",
      content: "In the final days, the glass partition felt less like a barrier and more like a shared canvas. Louise no longer wore the bulky suit. She stood before the luminous fog, a simple headset her only interface. Abbott raised a limb, and the familiar black ink began to spread. But this time, Louise didn't wait. As the logogram was still forming, its tendrils still expanding towards their final meaning, her own mind was already working. She saw the trajectory of the ink, anticipated the final shape of the thought, and understood the change it represented from the previous state before it was even complete. She began speaking her reply while Abbott was still 'rendering' its message. The conversation became a seamless, overlapping dance of state and response. She wasn't translating anymore. She was thinking in Heptapod. She had mastered the art of seeing the state, not the steps.",
      atmosphere: "celebratory, confident, complete"
    }
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
    setRealDomCount(prev => prev + 1);
    setRealDomUpdates(prev => prev + 10); // Simulating 10x more operations
  };

  const incrementVirtualDom = () => {
    setVirtualDomCount(prev => prev + 1);
    setVirtualDomUpdates(prev => prev + 1);
  };

  const shuffleLogograms = () => {
    const shuffled = [...logograms].sort(() => Math.random() - 0.5);
    setLogograms(shuffled);
    setRenderCount(prev => prev + 1);
    
    const shuffledNoKey = [...logogramsNoKey].sort(() => Math.random() - 0.5);
    setLogogramsNoKey(shuffledNoKey);
    setRenderCountNoKey(prev => prev + 5); // Simulating more renders
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
      index === 0 ? {...item, count: item.count + 1} : item
    );
    
    setListWithKeys(updated);
    
    // Performance measurement
    setPerformanceMetrics(prev => ({...prev, withKeys: prev.withKeys + 1}));
  };

  const reorderWithoutKeys = () => {
    const reordered = [...listWithoutKeys];
    const [moved] = reordered.splice(1, 1);
    reordered.unshift(moved);
    
    // Increment all counts (state loss simulation)
    const updated = reordered.map(item => ({...item, count: item.count + 1}));
    
    setListWithoutKeys(updated);
    setPerformanceMetrics(prev => ({...prev, withoutKeys: prev.withoutKeys + 5}));
  };

  const leakTimers = () => {
    if (leakedTimers >= maxLeakedTimers) {
      resetLeakedTimers();
      return;
    }
    
    const newTimer = setInterval(() => {
      setLeakedTimers(prev => {
        if (prev >= maxLeakedTimers) {
          clearInterval(newTimer);
          return prev;
        }
        return prev + 1;
      });
    }, 100);
    
    setTimerIds(prev => [...prev, newTimer]);
  };

  const resetLeakedTimers = () => {
    timerIds.forEach(id => clearInterval(id));
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
      timerIds.forEach(id => clearInterval(id));
    };
  }, []);

  const currentChapter = chapters[chapter];

  // Logogram visualization for sidebar
  const renderLogogram = () => {
    const basePoints = Array.from({length: 8}, (_, i) => {
      const angle = (i * Math.PI * 2) / 8;
      return {
        x: 50 + 40 * Math.cos(angle),
        y: 50 + 40 * Math.sin(angle)
      };
    });

    const tendrils = basePoints.map((point, i) => {
      const variation = chapter * 0.1 + i * 0.3;
      return {
        ...point,
        endX: 50 + (60 + Math.sin(variation) * 20) * Math.cos(angle),
        endY: 50 + (60 + Math.cos(variation) * 20) * Math.sin(angle),
        isDiff: highlightedDiff === i % oldTree.length
      };
    });

    return (
      <svg width="100%" height="200" viewBox="0 0 100 100" className="mb-6">
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgb(249 115 22 / 0.3)" strokeWidth="1" />
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
            <circle cx={t.endX} cy={t.endY} r="1.5" fill={t.isDiff ? "#10b981" : "rgb(249 115 22 / 0.7)"} />
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Brain className="text-orange-500 w-7 h-7" />
              <h1 className="text-2xl md:text-3xl font-bold">Arrival</h1>
            </div>
            <p className="text-sm md:text-base text-slate-400">
              Science Fiction • Dr. Louise Banks • 2016
            </p>
          </div>
          <p className="text-base md:text-lg text-orange-500 font-medium">
            Reconciliation and Virtual DOM
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - 8 columns on desktop */}
        <div className="lg:col-span-8 space-y-8">
          {/* Chapter Content */}
          <section className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-orange-400">{currentChapter.title}</h2>
              <span className="text-sm px-3 py-1 bg-slate-800 rounded-full">
                Atmosphere: {currentChapter.atmosphere}
              </span>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-4">{currentChapter.content}</p>
              
              {/* Memorable phrase for each chapter */}
              <div className="border-l-4 border-orange-500 pl-4 my-6 italic bg-orange-950/20 py-3 rounded-r">
                {chapter === 0 && "Every word was a step in the dark, a single frame in a movie I couldn't see."}
                {chapter === 1 && "We're re-reading the entire book from the first page, just to see if they changed a comma on the last."}
                {chapter === 2 && "Stop reading the sentences. See the shape of the story."}
                {chapter === 3 && "I stopped re-living the timeline. I just compared the snapshots."}
                {chapter === 4 && "The past and the future are just two versions of the same file. The trick is seeing the diff."}
              </div>
            </div>
          </section>

          {/* Interactive Demo Section */}
          <section className="bg-slate-900/50 rounded-xl p-6 border border-slate-800" ref={parentRef}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <GitCompare className="text-orange-500 w-5 h-5" />
              Interactive Demonstration
            </h3>

            {/* Chapter 1: Real DOM vs Virtual DOM */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="text-red-500 w-5 h-5" />
                      <h4 className="font-bold">Real DOM (Linear Time)</h4>
                    </div>
                    <p className="text-sm mb-4 text-slate-400">Brute-force updates: Destroy and rebuild entire UI</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Counter Value:</span>
                        <span className="text-2xl font-mono font-bold">{realDomCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>DOM Operations:</span>
                        <span className="text-xl font-mono text-red-400">{realDomUpdates}</span>
                      </div>
                      <button
                        onClick={incrementRealDom}
                        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                      >
                        Increment (Costly Update)
                      </button>
                    </div>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="text-emerald-500 w-5 h-5" />
                      <h4 className="font-bold">Virtual DOM (Logogram)</h4>
                    </div>
                    <p className="text-sm mb-4 text-slate-400">Efficient updates: Compare snapshots, apply minimal diff</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Counter Value:</span>
                        <span className="text-2xl font-mono font-bold">{virtualDomCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>DOM Operations:</span>
                        <span className="text-xl font-mono text-emerald-400">{virtualDomUpdates}</span>
                      </div>
                      <button
                        onClick={incrementVirtualDom}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
                      >
                        Increment (Efficient Update)
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="text-red-500 w-5 h-5" />
                        <h4 className="font-bold">Without Keys (Anonymous)</h4>
                      </div>
                      <span className="text-sm px-2 py-1 bg-red-500/20 rounded">Renders: {renderCountNoKey}</span>
                    </div>
                    <div className="space-y-3 mb-4" ref={animationRef}>
                      {logogramsNoKey.map((item, index) => (
                        <div
                          key={index} // ❌ Using index as key (anti-pattern!)
                          className={`p-3 rounded border transition-all ${selectedIndexNoKey === index ? 'bg-red-500/20 border-red-500' : 'bg-slate-800/50 border-slate-700'}`}
                          onClick={() => setSelectedIndexNoKey(index)}
                        >
                          <div className="flex justify-between items-center">
                            <span>{item}</span>
                            <span className="text-xs opacity-70">Index: {index}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-slate-400 mb-4">Cannot track identity when items reorder</p>
                    <button
                      onClick={shuffleLogograms}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                    >
                      Shuffle (State Loss Risk)
                    </button>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Key className="text-emerald-500 w-5 h-5" />
                        <h4 className="font-bold">With Unique Keys</h4>
                      </div>
                      <span className="text-sm px-2 py-1 bg-emerald-500/20 rounded">Renders: {renderCount}</span>
                    </div>
                    <div className="space-y-3 mb-4" ref={animationRef}>
                      {logograms.map((item, index) => (
                        <div
                          key={item} // ✅ Using item value as key
                          className={`p-3 rounded border transition-all ${selectedIndex === index ? 'bg-emerald-500/20 border-emerald-500' : 'bg-slate-800/50 border-slate-700'}`}
                          onClick={() => setSelectedIndex(index)}
                        >
                          <div className="flex justify-between items-center">
                            <span>{item}</span>
                            <span className="text-xs opacity-70">Key: {item}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-slate-400 mb-4">Tracks identity through reordering</p>
                    <button
                      onClick={shuffleLogograms}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
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
                <div className="bg-slate-800/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-lg">Reconciliation: Finding the Diff</h4>
                    <button
                      onClick={simulateReconciliation}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors"
                    >
                      Generate Change
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <div>
                      <h5 className="font-medium mb-3 text-slate-400">Old VDOM Tree</h5>
                      <div className="space-y-2">
                        {oldTree.map((value, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded border ${highlightedDiff === index ? 'bg-red-950/30 border-red-500' : 'bg-slate-800/30 border-slate-700'}`}
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
                      <h5 className="font-medium mb-3 text-slate-400">New VDOM Tree</h5>
                      <div className="space-y-2">
                        {newTree.map((value, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded border ${highlightedDiff === index ? 'bg-emerald-950/30 border-emerald-500' : 'bg-slate-800/30 border-slate-700'}`}
                          >
                            <div className="flex justify-between">
                              <span>Node {index + 1}</span>
                              <span className="font-mono">{value}</span>
                            </div>
                            {highlightedDiff === index && (
                              <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                                <GitCompare className="w-3 h-3" />
                                Only this node changed
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-800/30 rounded border border-slate-700">
                    <p className="text-sm text-slate-400">
                      React compares these two trees and finds the <span className="text-emerald-400 font-medium">single difference</span>.
                      Only that one DOM element gets updated.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 4: Keys Comparison */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <List className="text-red-500 w-5 h-5" />
                        <h4 className="font-bold">List Without Keys</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        <span className="text-sm">Cost: {performanceMetrics.withoutKeys} ops</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      {listWithoutKeys.map((item, index) => (
                        <div
                          key={index} // ❌ Index as key
                          className="p-3 rounded bg-slate-800/50 border border-slate-700"
                        >
                          <div className="flex justify-between items-center">
                            <span>{item.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs px-2 py-1 bg-red-500/20 rounded">
                                Clicks: {item.count}
                              </span>
                              <span className="text-xs opacity-70">Pos: {index}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={reorderWithoutKeys}
                      className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                    >
                      Move Command Ship (Inefficient)
                    </button>
                    <p className="text-xs text-slate-400 mt-3">
                      All items lose their click counts when reordered
                    </p>
                  </div>

                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Key className="text-emerald-500 w-5 h-5" />
                        <h4 className="font-bold">List With Unique Keys</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4" />
                        <span className="text-sm">Cost: {performanceMetrics.withKeys} ops</span>
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      {listWithKeys.map((item) => (
                        <div
                          key={item.id} // ✅ Unique key
                          className="p-3 rounded bg-slate-800/50 border border-slate-700"
                        >
                          <div className="flex justify-between items-center">
                            <span>{item.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs px-2 py-1 bg-emerald-500/20 rounded">
                                Clicks: {item.count}
                              </span>
                              <span className="text-xs opacity-70">ID: {item.id}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={reorderWithKeys}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
                    >
                      Move Command Ship (Efficient)
                    </button>
                    <p className="text-xs text-slate-400 mt-3">
                      Only moved item updates, click counts preserved
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="bg-slate-800/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-lg">Mastery: Efficient State Updates</h4>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        <span className="text-slate-400">Renders: </span>
                        <span className="font-mono">{formRenderCount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          value={masterForm.name}
                          onChange={(e) => {
                            setMasterForm(prev => ({...prev, name: e.target.value}));
                            setFormRenderCount(prev => prev + 1);
                          }}
                          className="w-full p-3 bg-slate-800 border border-slate-700 rounded"
                          placeholder="Dr. Louise Banks"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <select
                          value={masterForm.role}
                          onChange={(e) => {
                            setMasterForm(prev => ({...prev, role: e.target.value}));
                            setFormRenderCount(prev => prev + 1);
                          }}
                          className="w-full p-3 bg-slate-800 border border-slate-700 rounded"
                        >
                          <option value="linguist">Linguist</option>
                          <option value="developer">Developer</option>
                          <option value="scientist">Scientist</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
                      <h5 className="font-medium mb-3">Current State Snapshot</h5>
                      <pre className="text-sm font-mono overflow-auto">
{JSON.stringify(masterForm, null, 2)}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-emerald-950/20 border border-emerald-500/30 rounded">
                    <p className="text-sm">
                      <span className="text-emerald-400 font-medium">✓ Each field update triggers reconciliation</span>
                      <br />
                      React compares the new VDOM snapshot with the old one and updates only the changed parts.
                      The entire form doesn't re-render from scratch.
                    </p>
                  </div>
                </div>

                {/* Timer leak demonstration */}
                <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Timer className="text-red-500 w-5 h-5" />
                      <h4 className="font-bold">Memory Leak Demo</h4>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full ${leakedTimers > 20 ? 'bg-red-500/30' : 'bg-slate-800'}`}>
                      Timers: {leakedTimers}/50
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-400 mb-4">
                    Missing cleanup functions cause timer accumulation. Circuit breaker activates at 50 timers.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <button
                      onClick={leakTimers}
                      className="py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                    >
                      Leak Timer
                    </button>
                    <button
                      onClick={resetLeakedTimers}
                      className="py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors"
                    >
                      Reset All
                    </button>
                    <div className="text-center self-center">
                      {leakedTimers >= 40 && (
                        <span className="text-red-400 text-sm">⚠️ Circuit breaker soon</span>
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
              className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="flex flex-col items-center">
              <span className="text-sm text-slate-400">Chapter {chapter + 1} of {chapters.length}</span>
              <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden mt-1">
                <div 
                  className="h-full bg-orange-500 transition-all duration-300"
                  style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                />
              </div>
            </div>
            
            <button
              onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
              disabled={chapter === chapters.length - 1}
              className="flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>

        {/* Sidebar - 4 columns on desktop */}
        <div className="lg:col-span-4 space-y-8">
          {/* Logogram Visualization */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800 sticky top-24">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Brain className="text-orange-500 w-5 h-5" />
              Current Logogram
            </h3>
            <div className="mb-4">
              {renderLogogram()}
            </div>
            <p className="text-sm text-slate-400">
              Each tendril represents a DOM element. When the state changes, only the modified tendrils update.
            </p>
          </div>

          {/* React Concept Summary */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-bold mb-4">Concept Mapping</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/30 rounded border border-slate-700">
                <div className="font-medium text-orange-400">Heptapod Logogram</div>
                <div className="text-sm text-slate-400">= Virtual DOM Snapshot</div>
              </div>
              <div className="p-3 bg-slate-800/30 rounded border border-slate-700">
                <div className="font-medium text-orange-400">Overlaying Two Logograms</div>
                <div className="text-sm text-slate-400">= Reconciliation Diffing</div>
              </div>
              <div className="p-3 bg-slate-800/30 rounded border border-slate-700">
                <div className="font-medium text-orange-400">Unique Named Entity</div>
                <div className="text-sm text-slate-400">= Component with Key Prop</div>
              </div>
              <div className="p-3 bg-slate-800/30 rounded border border-slate-700">
                <div className="font-medium text-orange-400">Linear Transcript</div>
                <div className="text-sm text-slate-400">= Real DOM Manipulation</div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-bold mb-4">Reconciliation Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Efficiency Gain</span>
                  <span className="font-mono">
                    {realDomUpdates > 0 ? `${Math.round((realDomUpdates / virtualDomUpdates) * 100)}%` : 'N/A'}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${Math.min(100, (virtualDomUpdates / (realDomUpdates || 1)) * 100)}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-800/30 rounded">
                  <div className="text-2xl font-bold font-mono text-red-400">{realDomUpdates}</div>
                  <div className="text-xs text-slate-400">DOM Ops (Linear)</div>
                </div>
                <div className="text-center p-3 bg-slate-800/30 rounded">
                  <div className="text-2xl font-bold font-mono text-emerald-400">{virtualDomUpdates}</div>
                  <div className="text-xs text-slate-400">DOM Ops (VDOM)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="bg-orange-950/20 rounded-xl p-6 border border-orange-500/30">
            <h3 className="text-lg font-bold mb-4">Key Takeaways</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">React uses Virtual DOM for efficient updates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Always provide unique keys for list items</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Clean up effects to prevent memory leaks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Never mutate state directly</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}