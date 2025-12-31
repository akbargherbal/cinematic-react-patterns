import { useState, useEffect, useCallback, useRef } from "react";
import { Zap, ArrowLeft, ArrowRight, RefreshCw, Play, AlertTriangle, CheckCircle } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// Custom Hooks for our demonstrations
const useGrapple = (initialLatched = false) => {
  const [isLatched, setIsLatched] = useState(initialLatched);
  const [height, setHeight] = useState(0);
  const grappleRef = useRef<number>(0);

  const fireGrapple = useCallback(() => {
    if (isLatched) return;
    setIsLatched(true);
    setHeight(0);
    
    // Animate ascent
    const interval = setInterval(() => {
      setHeight(h => {
        if (h >= 100) {
          clearInterval(interval);
          return 100;
        }
        return h + 10;
      });
    }, 100);

    grappleRef.current = interval as unknown as number;
  }, [isLatched]);

  const retractGrapple = useCallback(() => {
    setIsLatched(false);
    setHeight(0);
    if (grappleRef.current) {
      clearInterval(grappleRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (grappleRef.current) {
        clearInterval(grappleRef.current);
      }
    };
  }, []);

  return { isLatched, height, fireGrapple, retractGrapple };
};

const useSmokeBomb = () => {
  const [isActive, setIsActive] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const deploy = useCallback(() => {
    if (cooldown > 0) return;
    setIsActive(true);
    setCooldown(5);

    const timer = setInterval(() => {
      setCooldown(c => {
        if (c <= 1) {
          clearInterval(timer);
          setIsActive(false);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }, [cooldown]);

  return { isActive, cooldown, deploy };
};

const useWindowTracker = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// Example of duplicated logic (anti-pattern)
const BrokenWindowTracker = () => {
  const [windowSize1, setWindowSize1] = useState({ width: 0, height: 0 });
  const [windowSize2, setWindowSize2] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize1({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize2({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { windowSize1, windowSize2 };
};

interface Chapter {
  title: string;
  content: string;
}

export default function CustomHooksUtilityBelt(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [mode, setMode] = useState<"broken" | "fixed">("broken");
  const [leakedTimers, setLeakedTimers] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [parent] = useAutoAnimate();

  const grapple = useGrapple();
  const smoke = useSmokeBomb();
  const windowSize = useWindowTracker();
  const brokenTrackers = BrokenWindowTracker();

  const chapters: Chapter[] = [
    {
      title: "The Arsenal in Action",
      content: "The rain falls on Gotham as it always does: a cold, steady drizzle that slicks the stone gargoyles and turns the streets below into rivers of neon light. On the roof of the Merchant's Bank, a shadow detaches itself from the architecture. Batman. His target is the GCPD headquarters, its central spire a beacon in the smog. The mission: deliver encrypted data directly to Commissioner Gordon's private terminal. Getting in through the front door is not an option. He needs to go up. He doesn't pause, doesn't survey for handholds or fire escapes. His hand moves to his belt with practiced ease, fingers closing around a cool, metallic object. There's a faint whir, a nearly silent zip as a line shoots into the night, ending in a solid thunk as it anchors to the spire's balcony. He doesn't check the line; he trusts the tool. A squeeze of the trigger and he is airborne, a phantom ascending through the rain, the city shrinking beneath him. The entire complex process of vertical traversal—calculating trajectory, securing an anchor, managing tension, and lifting his own body weight—is reduced to a single, fluid action."
    },
    {
      title: "The Price of Reinvention",
      content: "Years earlier. The costume is rougher, more fabric than armor. The symbol on his chest is stitched by an unsteady hand. This is not the Batman of legend; this is a man running on pure will. He stands in an alley, rain soaking his cape, staring up at a crumbling tenement. A drug deal is happening on the fourth floor. He has to get up there, now. He uncoils a simple rope with a heavy, four-pronged hook at the end. His gloves are slick with rain. He swings the hook, the chain rattling loudly against the brickwork. It scrapes, finds no purchase, and clatters back to the ground. He bites back a curse, his breath fogging in the cold air. He tries again. And again. On the fourth try, it catches a window ledge. He pulls, testing the weight. It seems to hold. The climb is a nightmare. The rough brick tears at his gloves and scrapes his knuckles raw. His muscles burn with the effort of finding each new handhold, his boots slipping on the wet wall. He makes so much noise, a clumsy, scraping ascent that takes nearly two minutes. By the time he peers through the window, the room is empty. He was too slow. The logic was flawed, built on the fly and prone to failure."
    },
    {
      title: "The Alfred Principle",
      content: "Bruce sits in the cavernous dark of the Batcave, the giant computer screen casting a cold blue light on his face. On the workbench before him lies a collection of failures: a frayed rope, a scorched wiring kit, a bent piece of metal. He's staring at them, but he's seeing the missed opportunities, the close calls, the alarms. Alfred appears at his side, a tray with tea in his hands. He places it down gently and looks at the sad display. He doesn't offer sympathy. He offers a diagnosis. 'You are spending your nights, sir,' he says in his calm, even tone, 'building solutions on the fire escape. May I suggest it's time to start building them in the cave?' Bruce looks up, annoyed. 'I need to be out there, Alfred.' 'Indeed,' Alfred replies. 'Which is why you cannot afford to be solving the same problems over and over again. Tell me, how many times this month have you needed to ascend a building quickly and quietly?' The question hangs in the air. Bruce thinks of the tenement, the bank, the radio tower. The answer is: almost every night. The problem wasn't unique to the mission. The problem was repeatable."
    },
    {
      title: "The Tale of Two Climbs",
      content: "**Approach A: The Fire Escape** - The scene is a warehouse at the industrial docks. A car is idling by the loading bay, its engine a low rumble in the night. A deal is about to go down. The young Batman arrives, his mind a frantic checklist of actions. Need to get to the roof. Find a climbable point. Use the rope. Hope it holds. Don't make noise. His focus is entirely consumed by the immediate, low-level problem of ascent. **Approach B: The Cave** - The same warehouse. The same idling car. But this is the veteran Batman. As he glides to a stop in the shadows, his mind is already three steps ahead. Two lookouts. One primary target. Point of interception is the east corner of the roof. I have 30 seconds. The problem of getting to the roof doesn't even register as a problem. It's a solved equation. His hand goes to his belt. The useGrappleGun hook is deployed. A silent zip-thunk. He's ascending before the lookouts even have a chance to scan his direction. He lands on the roof with the silence of a falling leaf, his mind completely free."
    },
    {
      title: "The Belt Is The System",
      content: "The Bat-Signal cuts through the clouds, a familiar summons. In the cave, Bruce Wayne stands before the armored suit. The final piece of his ritual is not a weapon. It is a system. He lifts the heavy leather belt, its pouches filled with the fruits of his new philosophy. With a solid click, he fastens it around his waist. He doesn't check each individual gadget. He doesn't need to. He trusts the system. Each pouch contains a solution, a custom hook forged in the workshop and tested in the field. useSmokeBomb for stateful visibility management. useCryptographicSequencer for handling complex decryption logic. useBatarang for ranged interactions. Each one is a self-contained, reliable answer to a question he will inevitably face. Perched high above the city, he is a solitary figure against the skyline. Gotham sprawls below him, a vast, complex application with countless components, each with its own unique challenges."
    }
  ];

  const currentChapter = chapters[chapter];

  // Code examples
  const duplicatedLogicCode = `// ❌ Building on the fire escape
function MissionTracker() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener("resize", handleResize);
    // Must remember cleanup in every component
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return <div>Window: {windowSize.width} × {windowSize.height}</div>;
}`;

  const customHookCode = `// ✅ Building in the cave (custom hook)
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array = runs once

  return windowSize;
}

// Now use it anywhere
function MissionTracker() {
  const windowSize = useWindowSize();
  return <div>Window: {windowSize.width} × {windowSize.height}</div>;
}`;

  const memoryLeakCode = `// ❌ Memory leak - missing cleanup
function BuggyComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Timer leaks on unmount
    setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    // Missing: return () => clearInterval(timer)
  }, []);
  
  return <div>Count: {count}</div>;
}`;

  const fixedMemoryLeakCode = `// ✅ Proper cleanup
function FixedComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    // Required cleanup function
    return () => clearInterval(timer);
  }, []);
  
  return <div>Count: {count}</div>;
}`;

  // Circuit breaker for memory leak demo
  useEffect(() => {
    if (leakedTimers >= 50) {
      setLeakedTimers(0);
      setRenderCount(0);
    }
  }, [leakedTimers]);

  const triggerMemoryLeak = () => {
    if (mode === "broken") {
      setLeakedTimers(l => l + 1);
      // Intentionally leak a timer
      setInterval(() => {
        setRenderCount(c => c + 1);
      }, 1000);
    }
  };

  const resetDemo = () => {
    setLeakedTimers(0);
    setRenderCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 p-4 md:p-8">
      {/* Header */}
      <header className="border-b border-yellow-500/30 bg-slate-900/80 backdrop-blur-sm mb-8 md:mb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          {/* First line: Title left, metadata right */}
          <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Zap className="text-yellow-500 w-6 h-6 md:w-8 md:h-8" />
              <h1 className="text-xl md:text-3xl font-bold">Batman</h1>
            </div>
            <p className="text-xs md:text-base text-slate-400">
              Fiction • Bruce Wayne / Batman • Gotham City
            </p>
          </div>
          {/* Second line: Subtitle/concept */}
          <p className="text-sm md:text-lg text-yellow-500 font-medium">
            Custom Hooks: The Utility Belt Principle
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 md:p-8 backdrop-blur-sm">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
                  {currentChapter.title}
                </h2>
                <div className="prose prose-invert prose-lg max-w-none">
                  <p className="leading-relaxed text-slate-300">{currentChapter.content}</p>
                </div>
              </div>

              {/* Chapter-specific content */}
              {chapter === 0 && (
                <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-300 font-medium mb-3">Key Insight:</p>
                  <p className="text-slate-300">
                    "The right tool for the right job, ready before the job even begins."
                    Custom hooks encapsulate complex logic into reusable tools.
                  </p>
                </div>
              )}
              {chapter === 1 && (
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-300 font-medium mb-3">The Pain Point:</p>
                  <p className="text-slate-300">
                    "Stop building the solution on the fire escape. Build it in the cave."
                    Duplicating stateful logic leads to bugs and maintenance nightmares.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Demos */}
          <div className="lg:col-span-5">
            <div className="sticky top-8">
              <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6 md:p-8 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Utility Belt Demonstrations
                </h3>

                {/* Chapter 1 Demo: Using Custom Hooks */}
                {chapter === 0 && (
                  <div ref={parent} className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-lg">Available Gadgets (Custom Hooks)</h4>
                      
                      {/* Grapple Gun Demo */}
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">useGrapple()</span>
                          <span className={`px-2 py-1 text-xs rounded ${grapple.isLatched ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                            {grapple.isLatched ? 'LATCHED' : 'READY'}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div className="h-32 bg-slate-900 rounded relative overflow-hidden">
                            {/* Building visualization */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-full bg-gradient-to-b from-slate-700 to-slate-900"></div>
                            {/* Grapple line */}
                            {grapple.isLatched && (
                              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-300"></div>
                            )}
                            {/* Batman */}
                            <div 
                              className="absolute w-8 h-8 bg-slate-800 border-2 border-yellow-500 rounded-full transition-all duration-300 flex items-center justify-center"
                              style={{ bottom: `${grapple.height}%` }}
                            >
                              <span className="text-xs">🦇</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={grapple.fireGrapple}
                              disabled={grapple.isLatched}
                              className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              Fire Grapple
                            </button>
                            <button
                              onClick={grapple.retractGrapple}
                              disabled={!grapple.isLatched}
                              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            >
                              Retract
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Smoke Bomb Demo */}
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">useSmokeBomb()</span>
                          <span className={`px-2 py-1 text-xs rounded ${smoke.isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-400'}`}>
                            {smoke.isActive ? 'ACTIVE' : `READY (${smoke.cooldown}s CD)`}
                          </span>
                        </div>
                        <div className="space-y-3">
                          <div className={`h-20 rounded transition-all duration-300 flex items-center justify-center ${smoke.isActive ? 'bg-blue-500/20 border border-blue-500/50' : 'bg-slate-900'}`}>
                            {smoke.isActive ? (
                              <div className="text-center">
                                <div className="text-blue-400 font-bold mb-1">SMOKE ACTIVE</div>
                                <div className="text-xs text-blue-300">Perfect for vanishing acts</div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <div className="text-slate-400 font-bold mb-1">SMOKE READY</div>
                                <div className="text-xs text-slate-500">Deploy to obscure vision</div>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={smoke.deploy}
                            disabled={smoke.cooldown > 0}
                            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            {smoke.cooldown > 0 ? `Cooldown: ${smoke.cooldown}s` : 'Deploy Smoke'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <CodeBlock
                      code={customHookCode}
                      variant="success"
                      title="// ✅ Custom Hook Pattern"
                      defaultExpanded={true}
                      language="jsx"
                    />
                  </div>
                )}

                {/* Chapter 2 Demo: Duplicated Logic Pain */}
                {chapter === 1 && (
                  <div ref={parent} className="space-y-6">
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <h4 className="font-semibold text-lg text-red-400">The Pain of Duplication</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-800/50 p-3 rounded">
                            <div className="text-xs text-slate-400 mb-1">Tracker #1</div>
                            <div className="font-mono text-sm">
                              {brokenTrackers.windowSize1.width} × {brokenTrackers.windowSize1.height}
                            </div>
                          </div>
                          <div className="bg-slate-800/50 p-3 rounded">
                            <div className="text-xs text-slate-400 mb-1">Tracker #2</div>
                            <div className="font-mono text-sm">
                              {brokenTrackers.windowSize2.width} × {brokenTrackers.windowSize2.height}
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-slate-400">
                          <p className="mb-2">❌ Same logic copied in two places</p>
                          <p>❌ Double event listeners</p>
                          <p>❌ Maintenance nightmare</p>
                          <p>❌ Bug fixes needed in multiple spots</p>
                        </div>
                      </div>
                    </div>

                    <CodeBlock
                      code={duplicatedLogicCode}
                      variant="error"
                      title="// ❌ Duplicated Logic Anti-Pattern"
                      defaultExpanded={true}
                      language="jsx"
                    />
                  </div>
                )}

                {/* Chapter 3 Demo: Extract Custom Hook */}
                {chapter === 2 && (
                  <div ref={parent} className="space-y-6">
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <h4 className="font-semibold text-lg text-green-400">Extract to Custom Hook</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Window Size Tracker</div>
                            <div className="text-sm text-slate-400">Using useWindowSize() hook</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono text-lg">
                              {windowSize.width} × {windowSize.height}
                            </div>
                            <div className="text-xs text-slate-500">Resize window to update</div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-green-400">
                          <p>✅ Logic extracted once</p>
                          <p>✅ Single event listener</p>
                          <p>✅ Reusable across components</p>
                          <p>✅ Easy to maintain and test</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <CodeBlock
                        code={duplicatedLogicCode}
                        variant="error"
                        title="// ❌ Before: Duplicated in Components"
                        defaultExpanded={false}
                        language="jsx"
                      />
                      
                      <CodeBlock
                        code={customHookCode}
                        variant="success"
                        title="// ✅ After: Extracted to Custom Hook"
                        defaultExpanded={true}
                        language="jsx"
                      />
                    </div>
                  </div>
                )}

                {/* Chapter 4 Demo: Memory Leak Pitfall */}
                {chapter === 3 && (
                  <div ref={parent} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-lg">Memory Leak Demonstration</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setMode(mode === "broken" ? "fixed" : "broken")}
                            className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                          >
                            {mode === "broken" ? "✅ Show Fix" : "❌ Show Bug"}
                          </button>
                          <button
                            onClick={resetDemo}
                            className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 rounded transition-colors flex items-center gap-1"
                          >
                            <RefreshCw className="w-3 h-3" />
                            Reset
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-slate-800/50 p-3 rounded">
                          <div className="text-xs text-slate-400 mb-1">Mode</div>
                          <div className={`font-semibold ${mode === "broken" ? "text-red-400" : "text-green-400"}`}>
                            {mode === "broken" ? "❌ BUGGY" : "✅ FIXED"}
                          </div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded">
                          <div className="text-xs text-slate-400 mb-1">Leaked Timers</div>
                          <div className={`font-mono text-lg ${leakedTimers > 10 ? "text-red-400 animate-pulse" : "text-slate-300"}`}>
                            {leakedTimers}
                          </div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded">
                          <div className="text-xs text-slate-400 mb-1">Render Count</div>
                          <div className="font-mono text-lg">{renderCount}</div>
                        </div>
                      </div>

                      {leakedTimers >= 40 && (
                        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-red-400">
                            <AlertTriangle className="w-5 h-5" />
                            <span className="font-semibold">Circuit Breaker Engaged!</span>
                          </div>
                          <p className="text-sm text-red-300 mt-1">
                            Auto-reset at 50 leaked timers. This prevents browser crashes.
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={triggerMemoryLeak}
                          className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded flex items-center justify-center gap-2 transition-colors"
                        >
                          <Play className="w-4 h-4" />
                          Trigger {mode === "broken" ? "Leak" : "Timer"}
                        </button>
                      </div>
                    </div>

                    <CodeBlock
                      code={mode === "broken" ? memoryLeakCode : fixedMemoryLeakCode}
                      variant={mode === "broken" ? "error" : "success"}
                      title={mode === "broken" ? "// ❌ Missing Cleanup" : "// ✅ Proper Cleanup"}
                      defaultExpanded={true}
                      language="jsx"
                    />
                  </div>
                )}

                {/* Chapter 5 Demo: Hook Composition */}
                {chapter === 4 && (
                  <div ref={parent} className="space-y-6">
                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-purple-400" />
                        <h4 className="font-semibold text-lg text-purple-400">Hook Composition</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <div className="font-medium mb-3">Mission Dashboard</div>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400">Grapple Status:</span>
                              <span className={`font-medium ${grapple.isLatched ? 'text-green-400' : 'text-yellow-400'}`}>
                                {grapple.isLatched ? 'Latched' : 'Ready'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400">Smoke Cooldown:</span>
                              <span className="font-medium text-blue-400">{smoke.cooldown}s</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-slate-400">Window Size:</span>
                              <span className="font-mono text-slate-300">
                                {windowSize.width} × {windowSize.height}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-sm text-purple-400">
                          <p>✅ Multiple hooks work together</p>
                          <p>✅ Each handles specific concern</p>
                          <p>✅ Clean, maintainable component</p>
                          <p>✅ The Utility Belt in action</p>
                        </div>
                        
                        <div className="pt-3 border-t border-slate-700">
                          <p className="text-slate-300 italic">
                            "The belt doesn't solve the crime. It handles the repeatable parts so I can."
                          </p>
                        </div>
                      </div>
                    </div>

                    <CodeBlock
                      code={`// ✅ Hook Composition Example
function MissionDashboard() {
  const grapple = useGrapple();
  const smoke = useSmokeBomb();
  const windowSize = useWindowSize();
  
  return (
    <div>
      <div>Grapple: {grapple.isLatched ? "Active" : "Ready"}</div>
      <div>Smoke: {smoke.cooldown > 0 ? \`\${smoke.cooldown}s CD\` : "Ready"}</div>
      <div>Window: {windowSize.width} × {windowSize.height}</div>
    </div>
  );
}`}
                      variant="success"
                      title="// ✅ Composing Custom Hooks"
                      defaultExpanded={true}
                      language="jsx"
                    />
                  </div>
                )}

                {/* Progress indicator */}
                <div className="mt-6 pt-6 border-t border-slate-700">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <div>Chapter {chapter + 1} of {chapters.length}</div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-yellow-500 transition-all duration-300"
                          style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                        ></div>
                      </div>
                      <span>{Math.round(((chapter + 1) / chapters.length) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex justify-between mt-8 md:mt-12">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-4 py-2 md:px-6 md:py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-1">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${idx === chapter ? 'bg-yellow-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
          </div>
          
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-4 py-2 md:px-6 md:py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </nav>
      </main>
    </div>
  );
}