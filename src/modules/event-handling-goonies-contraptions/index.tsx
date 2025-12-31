import { useState, useEffect, useRef } from "react";
import { Zap, Cpu, AlertCircle, CheckCircle, RotateCcw, Play, Pause } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
}

export default function EventHandlingGooniesContraptions(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [gateOpen, setGateOpen] = useState<boolean>(false);
  const [chainReactionStep, setChainReactionStep] = useState<number>(0);
  const [bubblingMode, setBubblingMode] = useState<"uncontrolled" | "controlled">("uncontrolled");
  const [parentTriggered, setParentTriggered] = useState<number>(0);
  const [childTriggered, setChildTriggered] = useState<number>(0);
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [sequenceProgress, setSequenceProgress] = useState<number>(0);
  const [isSequenceRunning, setIsSequenceRunning] = useState<boolean>(false);
  const timerRefs = useRef<number[]>([]);

  const chapters: Chapter[] = [
    {
      title: "The Perfect Machine",
      content: "Data's Gate-omatic demonstrates perfect event handling: a single intentional action produces a predictable result. Pulling the rope triggers a chain reaction that opens the gate—nothing more, nothing less. 'Every pull deserves a purpose.' This is the ideal React event handler: one trigger, one clear outcome.",
    },
    {
      title: "The Unintended Cascade",
      content: "The Map Revealer, nested within the Gate-omatic, shows the bubbling problem. When you pull its lever, the event doesn't stop at the child component—it propagates up and triggers the parent's handler too. Chunk gets trapped, then soaked. 'It's not just my machine that's firing—it's triggering everything around it!' This is uncontrolled event propagation in React.",
    },
    {
      title: "The Brake Pad",
      content: "Data's solution isn't to rebuild the entire system. He adds a simple brake pad that stops the marble's journey at the boundary. 'Don't fix the chaos. Stop the first domino.' In React, this is `event.stopPropagation()`—it prevents an event from bubbling up to parent components, containing the reaction exactly where it should end.",
    },
    {
      title: "Teaching the Machine to be Quiet",
      content: "Compare the two approaches side by side. Without stopPropagation, the child's event shouts and the parent listens, causing unintended side effects. With stopPropagation, the child does its job and falls silent. 'It's not about separating the machines, it's about teaching them when to be quiet.' Understanding when to stop propagation is key to controlled UI interactions.",
    },
    {
      title: "The Symphony of Silence",
      content: "The final door requires three locks opened in sequence. Each machine fires, does its work, then stops completely before the next begins. 'A perfect chain reaction is one that knows exactly when to end.' This demonstrates masterful event handling: complex interactions where each component isolates its events, preventing accidental triggers while maintaining precise coordination.",
    },
  ];

  // Cleanup all timers on unmount or reset
  const cleanupTimers = () => {
    timerRefs.current.forEach(timer => clearTimeout(timer));
    timerRefs.current = [];
  };

  // Circuit breaker: reset if too many timers leak
  useEffect(() => {
    if (leakedTimers > 50) {
      resetAllDemos();
      alert("Safety circuit breaker: Too many timers were leaked. Demo has been reset.");
    }
  }, [leakedTimers]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupTimers();
    };
  }, []);

  // Chapter 1: Simple event handler
  const triggerGateOmatic = () => {
    setGateOpen(false);
    setChainReactionStep(0);
    
    // Simulate chain reaction steps
    const steps = [
      "🎳 Bowling ball rolls...",
      "⚖️ Seesaw tips...",
      "🎯 Marbles cascade...",
      "🥊 Slick Shoe fires...",
      "🚪 Gate opens!"
    ];
    
    steps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setChainReactionStep(index + 1);
        if (index === steps.length - 1) {
          setGateOpen(true);
        }
      }, (index + 1) * 600) as unknown as number;
      
      timerRefs.current.push(timer);
    });
  };

  // Chapter 2 & 3: Event bubbling demo
  const handleParentClick = (e: React.MouseEvent) => {
    if (bubblingMode === "controlled" && e.currentTarget !== e.target) {
      // In controlled mode, we check if this is from bubbling
      return;
    }
    setParentTriggered(prev => prev + 1);
  };

  const handleChildClick = (e: React.MouseEvent) => {
    setChildTriggered(prev => prev + 1);
    if (bubblingMode === "controlled") {
      e.stopPropagation();
    }
  };

  // Chapter 5: Sequential machine
  const startSequence = () => {
    if (isSequenceRunning) return;
    
    setIsSequenceRunning(true);
    setSequenceProgress(0);
    
    const sequenceSteps = [
      { step: 1, label: "First lock disengages" },
      { step: 2, label: "Second lock retracts" },
      { step: 3, label: "Third lock opens" },
      { step: 4, label: "Door swings wide!" }
    ];
    
    sequenceSteps.forEach((step, index) => {
      const timer = setTimeout(() => {
        setSequenceProgress(step.step);
        if (index === sequenceSteps.length - 1) {
          setIsSequenceRunning(false);
        }
      }, (index + 1) * 1000) as unknown as number;
      
      timerRefs.current.push(timer);
    });
  };

  // Reset functions
  const resetGateDemo = () => {
    cleanupTimers();
    setGateOpen(false);
    setChainReactionStep(0);
  };

  const resetBubblingDemo = () => {
    setParentTriggered(0);
    setChildTriggered(0);
  };

  const resetSequenceDemo = () => {
    cleanupTimers();
    setSequenceProgress(0);
    setIsSequenceRunning(false);
  };

  const resetAllDemos = () => {
    cleanupTimers();
    setGateOpen(false);
    setChainReactionStep(0);
    setParentTriggered(0);
    setChildTriggered(0);
    setLeakedTimers(0);
    setSequenceProgress(0);
    setIsSequenceRunning(false);
  };

  const currentChapter = chapters[chapter];

  // Code examples as template literals
  const simpleEventHandler = `// ✅ Simple event handler
function GateOpener() {
  const [gateOpen, setGateOpen] = useState(false);
  
  const handlePullRope = () => {
    // Chain of actions in response to event
    setGateOpen(true);
    console.log("Gate opening sequence complete!");
  };
  
  return (
    <div>
      <button 
        onClick={handlePullRope}
        className="px-4 py-2 bg-amber-600 text-white rounded"
      >
        Pull Rope
      </button>
      <p>Gate is {gateOpen ? "Open" : "Closed"}</p>
    </div>
  );
}`;

  const bubblingProblemCode = `// ❌ Event bubbling problem
function ParentMachine() {
  const handleParentClick = () => {
    console.log("Parent triggered!");
  };
  
  const handleChildClick = () => {
    console.log("Child triggered!");
  };
  
  return (
    <div onClick={handleParentClick} className="p-8 border">
      <button onClick={handleChildClick}>
        Pull Child Lever
      </button>
      {/* Clicking button triggers BOTH handlers */}
    </div>
  );
}`;

  const stopPropagationCode = `// ✅ Controlled with stopPropagation
function ParentMachine() {
  const handleParentClick = () => {
    console.log("Parent triggered!");
  };
  
  const handleChildClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling
    console.log("Child triggered!");
  };
  
  return (
    <div onClick={handleParentClick} className="p-8 border">
      <button onClick={handleChildClick}>
        Pull Child Lever
      </button>
      {/* Clicking button triggers ONLY child handler */}
    </div>
  );
}`;

  const memoryLeakExample = `// ❌ Memory leak (no cleanup)
function LeakyComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Timer never cleaned up
    setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    // Missing: return () => clearInterval(timer)
  }, []);
  
  return <div>Count: {count}</div>;
}

// ✅ Proper cleanup
function CleanComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    return () => clearInterval(timer); // ✅ Cleanup
  }, []);
  
  return <div>Count: {count}</div>;
}`;

  const sequentialEventsCode = `// ✅ Sequential events with isolation
function ThreeLockDoor() {
  const [activeStep, setActiveStep] = useState(0);
  
  const handleStep1 = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStep(1);
    // Only step 1 logic here
  };
  
  const handleStep2 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStep >= 1) {
      setActiveStep(2);
      // Only step 2 logic here
    }
  };
  
  const handleStep3 = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStep >= 2) {
      setActiveStep(3);
      // Only step 3 logic here
    }
  };
  
  return (
    <div>
      <button onClick={handleStep1} disabled={activeStep > 0}>
        Step 1
      </button>
      <button onClick={handleStep2} disabled={activeStep !== 1}>
        Step 2
      </button>
      <button onClick={handleStep3} disabled={activeStep !== 2}>
        Step 3
      </button>
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-stone-900 text-stone-300 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="border-b border-stone-800 bg-stone-900/80 backdrop-blur-sm top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Zap className="text-amber-500 w-8 h-8" />
              <h1 className="text-2xl md:text-3xl font-bold">The Goonies</h1>
            </div>
            <p className="text-sm md:text-base text-stone-400">
              Data's Contraptions • 1985
            </p>
          </div>
          <p className="text-base md:text-lg text-amber-500 font-medium">
            Event Handling & Propagation
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-7">
          <div className="prose prose-invert prose-lg max-w-none mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-amber-400">
              {currentChapter.title}
            </h2>
            <div className="bg-stone-800/50 border border-stone-700 rounded-xl p-6">
              <p className="leading-relaxed text-stone-300">{currentChapter.content}</p>
            </div>
          </div>

          {/* Chapter-specific explanations */}
          <div className="mt-8 space-y-6">
            {chapter === 0 && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-300 mb-3">React Concept: Basic Event Handling</h3>
                <p className="text-stone-300">In React, event handlers are functions that run in response to user interactions like clicks, form submissions, or keyboard input. They should be predictable: one trigger → one clear outcome.</p>
              </div>
            )}
            
            {chapter === 1 && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-300 mb-3">React Concept: Event Bubbling</h3>
                <p className="text-stone-300">Events in React bubble up the DOM tree. A click on a child element will trigger handlers on the child, then its parent, then its parent's parent, and so on. This can cause unintended side effects.</p>
              </div>
            )}
            
            {chapter === 2 && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-300 mb-3">React Concept: stopPropagation()</h3>
                <p className="text-stone-300">The <code className="bg-stone-800 px-1 rounded">event.stopPropagation()</code> method stops an event from bubbling up to parent elements. It's like Data's brake pad—it contains the reaction where it should end.</p>
              </div>
            )}
            
            {chapter === 3 && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-300 mb-3">React Concept: Controlled vs Uncontrolled</h3>
                <p className="text-stone-300">Controlled components manage their own state changes and prevent unwanted bubbling. Uncontrolled components let events propagate freely, which can simplify some cases but risks side effects.</p>
              </div>
            )}
            
            {chapter === 4 && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-amber-300 mb-3">React Concept: Complex Event Sequences</h3>
                <p className="text-stone-300">For complex interactions, each step should isolate its events. Use <code className="bg-stone-800 px-1 rounded">stopPropagation()</code> to prevent accidental triggers while maintaining coordination through shared state.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Demos */}
        <div className="lg:col-span-5 space-y-8">
          {/* Chapter 1 Demo: Simple Event Handler */}
          {chapter === 0 && (
            <div className="bg-stone-800/50 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5" /> Gate-omatic Demo
              </h3>
              
              <div className="space-y-4 mb-6">
                <button
                  onClick={triggerGateOmatic}
                  className="w-full px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" /> Pull the Rope
                </button>
                
                <div className="bg-stone-900/80 border border-stone-700 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-stone-400">Chain Reaction Progress:</span>
                    <span className="text-amber-400 font-mono">{chainReactionStep}/5</span>
                  </div>
                  <div className="h-2 bg-stone-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{ width: `${(chainReactionStep / 5) * 100}%` }}
                    />
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    {chainReactionStep >= 1 && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span>🎳 Bowling ball released</span>
                      </div>
                    )}
                    {chainReactionStep >= 2 && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span>⚖️ Seesaw tips</span>
                      </div>
                    )}
                    {chainReactionStep >= 3 && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span>🎯 Marbles cascade</span>
                      </div>
                    )}
                    {chainReactionStep >= 4 && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span>🥊 Slick Shoe fires</span>
                      </div>
                    )}
                    {chainReactionStep >= 5 && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-emerald-400">🚪 Gate is OPEN</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={resetGateDemo}
                    className="flex-1 px-4 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset
                  </button>
                </div>
              </div>
              
              <CodeBlock
                code={simpleEventHandler}
                variant="success"
                title="// ✅ Basic Event Handler Pattern"
                defaultExpanded={true}
              />
            </div>
          )}

          {/* Chapter 2 & 3 Demo: Event Bubbling */}
          {(chapter === 1 || chapter === 2) && (
            <div className="bg-stone-800/50 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Event Bubbling Demo
              </h3>
              
              <div className="space-y-6 mb-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setBubblingMode("uncontrolled")}
                    className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                      bubblingMode === "uncontrolled" 
                        ? "bg-red-600 text-white" 
                        : "bg-stone-700 hover:bg-stone-600 text-stone-300"
                    }`}
                  >
                    ❌ Uncontrolled
                  </button>
                  <button
                    onClick={() => setBubblingMode("controlled")}
                    className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                      bubblingMode === "controlled" 
                        ? "bg-emerald-600 text-white" 
                        : "bg-stone-700 hover:bg-stone-600 text-stone-300"
                    }`}
                  >
                    ✅ Controlled
                  </button>
                </div>
                
                {/* Visual nested components */}
                <div 
                  onClick={handleParentClick}
                  className={`p-8 rounded-lg border-2 transition-all ${
                    bubblingMode === "uncontrolled" 
                      ? "border-red-500/50 bg-red-950/10" 
                      : "border-emerald-500/50 bg-emerald-950/10"
                  }`}
                >
                  <div className="text-center mb-4">
                    <h4 className="font-semibold text-lg">Parent Machine (Gate-omatic)</h4>
                    <p className="text-sm text-stone-400">Triggered: {parentTriggered} times</p>
                  </div>
                  
                  <div className="bg-stone-900/80 border border-stone-700 rounded-lg p-6">
                    <div className="text-center mb-4">
                      <h4 className="font-semibold text-lg">Child Machine (Map Revealer)</h4>
                      <p className="text-sm text-stone-400">Triggered: {childTriggered} times</p>
                    </div>
                    
                    <button
                      onClick={handleChildClick}
                      className={`w-full py-4 rounded-lg font-semibold transition-all ${
                        bubblingMode === "uncontrolled"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-emerald-500 hover:bg-emerald-600"
                      } text-white`}
                    >
                      Pull Child Lever
                    </button>
                    
                    <div className="mt-4 text-sm text-stone-400 text-center">
                      {bubblingMode === "uncontrolled" ? (
                        <span className="text-red-400">⚠️ Will trigger both machines</span>
                      ) : (
                        <span className="text-emerald-400">✓ Will trigger only child</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-stone-900/80 p-4 rounded-lg">
                    <div className="text-sm text-stone-400 mb-1">Child Triggers</div>
                    <div className="text-2xl font-mono text-amber-400">{childTriggered}</div>
                  </div>
                  <div className="bg-stone-900/80 p-4 rounded-lg">
                    <div className="text-sm text-stone-400 mb-1">Parent Triggers</div>
                    <div className={`text-2xl font-mono ${
                      parentTriggered > childTriggered ? "text-red-400" : "text-emerald-400"
                    }`}>
                      {parentTriggered}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={resetBubblingDemo}
                    className="flex-1 px-4 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Counters
                  </button>
                </div>
              </div>
              
              {bubblingMode === "uncontrolled" ? (
                <CodeBlock
                  code={bubblingProblemCode}
                  variant="error"
                  title="// ❌ Event Bubbling Problem"
                  defaultExpanded={true}
                />
              ) : (
                <CodeBlock
                  code={stopPropagationCode}
                  variant="success"
                  title="// ✅ Controlled with stopPropagation"
                  defaultExpanded={true}
                />
              )}
            </div>
          )}

          {/* Chapter 4 Demo: Comparison */}
          {chapter === 3 && (
            <div className="bg-stone-800/50 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Side-by-Side Comparison
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-red-400 mb-3">Without stopPropagation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>Events bubble up</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>Parent handlers fire</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>Causes side effects</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-emerald-400 mb-3">With stopPropagation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span>Events stop at boundary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span>Only intended handlers fire</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span>No unintended side effects</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-stone-900/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-300 mb-3">When to Use Each</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                      <div>
                        <span className="font-medium text-red-300">Use bubbling (default):</span>
                        <p className="text-stone-400">When you want parent components to react to child events (e.g., click-away handlers, event delegation).</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="mt-1 w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                      <div>
                        <span className="font-medium text-emerald-300">Use stopPropagation:</span>
                        <p className="text-stone-400">When child events should be isolated (e.g., buttons in modals, form controls in nested components).</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CodeBlock
                  code={memoryLeakExample}
                  variant="default"
                  title="// 💡 Important: Always Clean Up Event Listeners"
                  defaultExpanded={true}
                />
              </div>
            </div>
          )}

          {/* Chapter 5 Demo: Complex Sequence */}
          {chapter === 4 && (
            <div className="bg-stone-800/50 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-amber-300 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" /> Three-Lock Sequence
              </h3>
              
              <div className="space-y-6">
                <div className="bg-stone-900/80 border border-stone-700 rounded-lg p-6">
                  <div className="text-center mb-6">
                    <h4 className="font-semibold text-lg mb-2">Pirate Ship Door</h4>
                    <p className="text-stone-400">Three locks must open in sequence</p>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Progress bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-stone-400 mb-2">
                        <span>Progress</span>
                        <span className="font-mono">{sequenceProgress}/4</span>
                      </div>
                      <div className="h-3 bg-stone-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500"
                          style={{ width: `${(sequenceProgress / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Lock indicators */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[1, 2, 3].map(lock => (
                        <div 
                          key={lock}
                          className={`p-4 rounded-lg text-center transition-all ${
                            sequenceProgress >= lock
                              ? "bg-emerald-900/30 border border-emerald-500/50"
                              : "bg-stone-800 border border-stone-700"
                          }`}
                        >
                          <div className="text-2xl mb-2">
                            {sequenceProgress >= lock ? "🔓" : "🔒"}
                          </div>
                          <div className="text-sm font-semibold">
                            Lock {lock}
                          </div>
                          <div className="text-xs text-stone-400 mt-1">
                            {sequenceProgress >= lock ? "Open" : "Locked"}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Control button */}
                    <button
                      onClick={startSequence}
                      disabled={isSequenceRunning}
                      className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      {isSequenceRunning ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                          Running Sequence...
                        </>
                      ) : (
                        <>
                          <Play className="w-5 h-5" />
                          Start Master Sequence
                        </>
                      )}
                    </button>
                    
                    {sequenceProgress === 4 && (
                      <div className="mt-4 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg text-center">
                        <div className="text-2xl mb-2">🚪</div>
                        <p className="text-emerald-300 font-semibold">Door is open! Treasure awaits!</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={resetSequenceDemo}
                    className="flex-1 px-4 py-2 bg-stone-700 hover:bg-stone-600 text-white rounded flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset Sequence
                  </button>
                  <button
                    onClick={resetAllDemos}
                    className="flex-1 px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" /> Reset All
                  </button>
                </div>
                
                <CodeBlock
                  code={sequentialEventsCode}
                  variant="success"
                  title="// ✅ Complex Event Sequences"
                  defaultExpanded={true}
                />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto mt-12 px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => setChapter(Math.max(0, chapter - 1))}
          disabled={chapter === 0}
          className="px-6 py-3 bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          ← Previous Chapter
        </button>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-stone-400 font-mono">
            Chapter <span className="text-amber-400">{chapter + 1}</span> of <span className="text-stone-300">5</span>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(i => (
              <button
                key={i}
                onClick={() => setChapter(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === chapter 
                    ? "bg-amber-500" 
                    : i < chapter 
                    ? "bg-amber-500/30" 
                    : "bg-stone-700"
                }`}
                aria-label={`Go to chapter ${i + 1}`}
              />
            ))}
          </div>
        </div>
        
        <button
          onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
          disabled={chapter === chapters.length - 1}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          Next Chapter →
        </button>
      </nav>
      
      {/* Safety metrics footer */}
      <div className="max-w-7xl mx-auto mt-8 px-4 pt-4 border-t border-stone-800 text-xs text-stone-500">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span>Safe demo: Circuit breakers active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <span>Leaked timers: {leakedTimers}/50 max</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span>All effects have cleanup functions</span>
          </div>
        </div>
      </div>
    </div>
  );
}