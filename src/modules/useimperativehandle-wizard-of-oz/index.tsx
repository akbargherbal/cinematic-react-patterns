import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect, useCallback } from "react";
import { Brain, Heart, Medal, Zap, AlertCircle, RefreshCw, Eye, EyeOff, Settings, Wand2 } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// === TYPE DEFINITIONS ===
interface WizardHandle {
  grantBrain: () => void;
  grantHeart: () => void;
  grantCourage: () => void;
}

interface WizardStats {
  brainGrants: number;
  heartGrants: number;
  courageGrants: number;
  internalLeversPulled: number;
  systemErrors: number;
}

interface ConsoleButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "success" | "danger" | "default";
}

// === CHAPTER DATA ===
const chapters = [
  {
    title: "The Great and Powerful Interface",
    content: "The throne room doors groan open, revealing a chamber of impossible scale. Polished emerald tiles stretch into the distance, reflecting green-tinted light. Above the empty jade throne, suspended in billowing green smoke, floats an enormous, disembodied face. Dorothy and her friends huddle together, dwarfed by the cavernous space. A single, ornate microphone stands before them—their only connection to the magnificent being. The Scarecrow leans in, his straw-filled voice a mere whisper: 'If you please... I am a Scarecrow, and I have come to ask for a brain.' The great head nods, its smoky features swirling. 'A BRAIN! A VERY NOBLE REQUEST!' The voice booms, a perfectly rehearsed line. For a fleeting moment, behind a heavy velvet curtain, a small man in a tweed suit frantically spins a wheel, his face beaded with sweat. He is the operator, the engine, the hidden reality behind the great and powerful interface."
  },
  {
    title: "The Toto Problem",
    content: "As the friends stand frozen, a small, uncontrolled element enters the system. Toto, sniffing at the base of the throne, catches an oily scent and darts behind the curtain. The atmosphere changes instantly—hot, thick with grease and hot metal. Toto's wagging tail bumps a large red lever marked 'SMOKE DENSITY - DO NOT TOUCH.' Out in the throne room, the elegant green smoke sputters into thick, black, acrid clouds. The great face flickers violently, its voice distorting into a screech: 'SYSTEM... SYS-SYS-SYSTEM ERROR!' Before the Wizard can diagnose the issue, Toto pulls the curtain open, exposing the entire operation. The grand illusion evaporates, replaced by the pathetic reality of a single, overwhelmed operator. 'PAY NO ATTENTION TO THAT MAN BEHIND THE CURTAIN!' he yells, but it's too late. They have seen the levers. They have seen the whole machine."
  },
  {
    title: "The Imperative Handle",
    content: "The Wizard sits on a crate in his machine room, the smell of burnt wiring hanging in the air. 'It wasn't the curtain,' he whispers. 'A better curtain wouldn't have helped. The problem was the access. Toto wasn't supposed to be able to touch the levers. No one is.' He stands up with new energy. 'They don't need to see the machine. They just need to make their requests. I won't give them the curtain... I will give them a console.' He builds a small, beautiful podium of polished mahogany with three simple brass buttons: BRAIN, HEART, COURAGE. He wires them directly to three specific, reliable functions from his complex machinery, ensuring they can do nothing else. The Scarecrow presses the BRAIN button. It clicks satisfyingly. A quiet whirring sounds from behind the curtain, and a hidden drawer slides open with a rolled-up diploma inside. It is simple, predictable, and works perfectly."
  },
  {
    title: "Curtain vs. Console",
    content: "The Wizard replays the two moments in his mind. First, the day the curtain was pulled: the panic, the acrid smell of burnt smoke, the screech of his voice amplifier shorting out, the horrifying exposure. The system broke, the users were confused and angry, his credibility shattered. Then, yesterday: a Munchkin dignitary arrives needing to schedule the city's parade. He's directed to a new button labeled 'Schedule Event.' He presses it, inserts a request form. Behind the curtain, the Wizard receives the form, checks his calendar, stamps it 'APPROVED,' and sends it back. The consequence is a smooth, silent, successful transaction. The Wizard's internal process remains completely hidden. 'Exposing everything was the mistake,' he thinks. 'Giving them only what they need... that's the real magic. It protects my work, and it gives them the power they need without the confusion.'"
  },
  {
    title: "The Operator of Oz",
    content: "The throne room is now a place of quiet, predictable efficiency. Citizens come and go, using the ever-expanding console to submit forms and request permits. The Wizard is no longer a fraud hiding behind a curtain; he is the respected chief operator of the city's central system. One afternoon, he trains a young engineer. 'You've given the people direct access to your machine,' she says. The Wizard smiles and shakes his head. 'Ah, but that's the secret. I haven't. If I gave them access to the whole machine, they'd get lost in the levers. They'd break things.' He taps one of the brass buttons. 'We don't give them the whole machine. We give them a handle. A specific, imperative handle to the one thing they need to do. That protects our work, and it makes their lives easier. That is the secret to being a true wizard.'"
  }
];

// === COMPONENTS ===
const ConsoleButton: React.FC<ConsoleButtonProps> = ({ icon, label, onClick, disabled = false, variant = "default" }) => {
  const variantClasses = {
    default: "bg-emerald-700 hover:bg-emerald-600 border-emerald-500",
    success: "bg-green-700 hover:bg-green-600 border-green-500",
    danger: "bg-red-700 hover:bg-red-600 border-red-500"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 ${variantClasses[variant]} transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed min-h-[120px]`}
      aria-label={label}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <span className="font-bold text-lg">{label}</span>
    </button>
  );
};

// === MAIN MODULE COMPONENT ===
export default function UseImperativeHandleWizardOfOz(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<"curtain" | "console">("curtain");
  const [stats, setStats] = useState<WizardStats>({
    brainGrants: 0,
    heartGrants: 0,
    courageGrants: 0,
    internalLeversPulled: 0,
    systemErrors: 0
  });
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [isConsoleActive, setIsConsoleActive] = useState<boolean>(true);
  const [showInternal, setShowInternal] = useState<boolean>(false);
  const [parent] = useAutoAnimate();

  // === CIRCUIT BREAKER ===
  useEffect(() => {
    if (leakedTimers > 50) {
      resetDemo();
    }
  }, [leakedTimers]);

  // === DEMO RESET ===
  const resetDemo = useCallback(() => {
    setStats({
      brainGrants: 0,
      heartGrants: 0,
      courageGrants: 0,
      internalLeversPulled: 0,
      systemErrors: 0
    });
    setLeakedTimers(0);
    setIsConsoleActive(true);
    setShowInternal(false);
  }, []);

  // === CHILD COMPONENTS (FOR DEMO) ===
  // Broken version: Exposes everything
  const BrokenWizard = forwardRef<{ 
    grantBrain: () => void;
    grantHeart: () => void;
    grantCourage: () => void;
    pullRandomLever: () => void;
    showSystemError: () => void;
    internalState: string;
  }, {}>((props, ref) => {
    const [internalState, setInternalState] = useState<string>("IDLE");
    const [errorCount, setErrorCount] = useState<number>(0);

    // Expose everything (DANGEROUS!)
    useImperativeHandle(ref, () => ({
      grantBrain: () => {
        setStats(s => ({ ...s, brainGrants: s.brainGrants + 1 }));
        setInternalState("GRANTING_BRAIN");
      },
      grantHeart: () => {
        setStats(s => ({ ...s, heartGrants: s.heartGrants + 1 }));
        setInternalState("GRANTING_HEART");
      },
      grantCourage: () => {
        setStats(s => ({ ...s, courageGrants: s.courageGrants + 1 }));
        setInternalState("GRANTING_COURAGE");
      },
      pullRandomLever: () => {
        setStats(s => ({ ...s, internalLeversPulled: s.internalLeversPulled + 1 }));
        setInternalState("LEVER_PULLED");
        // Random chance of error
        if (Math.random() > 0.7) {
          setStats(s => ({ ...s, systemErrors: s.systemErrors + 1 }));
          setErrorCount(c => c + 1);
          setInternalState("ERROR");
        }
      },
      showSystemError: () => {
        setStats(s => ({ ...s, systemErrors: s.systemErrors + 1 }));
        setErrorCount(c => c + 1);
        setInternalState("ERROR");
      },
      internalState
    }), [internalState]);

    // Leaky timer (no cleanup)
    useEffect(() => {
      if (demoMode === "curtain") {
        const timer = setInterval(() => {
          setLeakedTimers(l => l + 1);
        }, 1000);
        // ❌ INTENTIONALLY NO CLEANUP - THIS IS THE BUG
      }
    }, [demoMode]);

    return (
      <div className="bg-slate-900 border border-red-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="text-red-500 w-6 h-6" />
          <h3 className="text-xl font-bold text-red-400">Behind the Curtain (Exposed)</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-red-950/30 p-4 rounded">
            <p className="text-sm opacity-70">Internal State:</p>
            <p className="font-mono text-red-300">{internalState}</p>
          </div>
          <div className="bg-red-950/30 p-4 rounded">
            <p className="text-sm opacity-70">Error Count:</p>
            <p className="font-mono text-red-300">{errorCount}</p>
          </div>
        </div>
        <p className="text-sm text-red-300/70 mb-4">Parent can access ALL levers and methods</p>
      </div>
    );
  });

  // Fixed version: Only exposes safe methods
  const ConsoleWizard = forwardRef<WizardHandle, {}>((props, ref) => {
    const [internalState, setInternalState] = useState<string>("IDLE");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    // ✅ Safe exposure via useImperativeHandle
    useImperativeHandle(ref, () => ({
      grantBrain: () => {
        if (!isProcessing) {
          setIsProcessing(true);
          setInternalState("PROCESSING_BRAIN_REQUEST");
          setTimeout(() => {
            setStats(s => ({ ...s, brainGrants: s.brainGrants + 1 }));
            setInternalState("BRAIN_GRANTED");
            setIsProcessing(false);
          }, 800);
        }
      },
      grantHeart: () => {
        if (!isProcessing) {
          setIsProcessing(true);
          setInternalState("PROCESSING_HEART_REQUEST");
          setTimeout(() => {
            setStats(s => ({ ...s, heartGrants: s.brainGrants + 1 }));
            setInternalState("HEART_GRANTED");
            setIsProcessing(false);
          }, 800);
        }
      },
      grantCourage: () => {
        if (!isProcessing) {
          setIsProcessing(true);
          setInternalState("PROCESSING_COURAGE_REQUEST");
          setTimeout(() => {
            setStats(s => ({ ...s, courageGrants: s.courageGrants + 1 }));
            setInternalState("COURAGE_GRANTED");
            setIsProcessing(false);
          }, 800);
        }
      }
    }), [isProcessing]);

    // ✅ Proper cleanup
    useEffect(() => {
      const healthCheck = setInterval(() => {
        setInternalState(s => s === "ERROR" ? "RECOVERED" : s);
      }, 5000);
      return () => clearInterval(healthCheck);
    }, []);

    return (
      <div className="bg-slate-900 border border-emerald-500/30 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Wand2 className="text-emerald-500 w-6 h-6" />
          <h3 className="text-xl font-bold text-emerald-400">Console Interface</h3>
        </div>
        <div className="mb-4">
          <div className="bg-emerald-950/30 p-4 rounded mb-2">
            <p className="text-sm opacity-70">System Status:</p>
            <p className="font-mono text-emerald-300">{isProcessing ? "PROCESSING..." : internalState}</p>
          </div>
          <p className="text-sm text-emerald-300/70">Parent can only call: grantBrain, grantHeart, grantCourage</p>
        </div>
      </div>
    );
  });

  // Refs for the demos
  const brokenWizardRef = useRef<{ 
    grantBrain: () => void;
    grantHeart: () => void;
    grantCourage: () => void;
    pullRandomLever: () => void;
    showSystemError: () => void;
    internalState: string;
  }>(null);

  const consoleWizardRef = useRef<WizardHandle>(null);

  // === CODE EXAMPLES ===
  const brokenRefCode = `// ❌ TOTO PROBLEM: Direct component instance access
const ParentComponent = () => {
  const wizardRef = useRef(null);

  // Parent can call ANYTHING - even internal methods!
  const causeChaos = () => {
    wizardRef.current?.pullRandomLever(); // ⚠️ Dangerous!
    wizardRef.current?.showSystemError(); // ⚠️ Breaks encapsulation
    console.log(wizardRef.current?.internalState); // ⚠️ Exposes internal state
  };

  return <WizardComponent ref={wizardRef} />;
};`;

  const fixedRefCode = `// ✅ CONSOLE SOLUTION: useImperativeHandle
const WizardComponent = forwardRef((props, ref) => {
  const [internalState, setInternalState] = useState("IDLE");

  // Only expose these 3 safe methods
  useImperativeHandle(ref, () => ({
    grantBrain: () => {
      setInternalState("PROCESSING");
      // Complex internal logic...
    },
    grantHeart: () => { /* Safe heart logic */ },
    grantCourage: () => { /* Safe courage logic */ }
    // Internal state NOT exposed!
  }), []);

  return <div>Wizard Machinery (Hidden)</div>;
});

const ParentComponent = () => {
  const wizardRef = useRef();

  // Parent can ONLY call exposed methods
  const requestBrain = () => {
    wizardRef.current?.grantBrain(); // ✅ Safe
    // wizardRef.current?.internalState ❌ Not accessible
  };

  return <WizardComponent ref={wizardRef} />;
};`;

  const useImperativeHandleCode = `import { useImperativeHandle, forwardRef } from 'react';

// Child component defines what to expose
const ChildComponent = forwardRef((props, ref) => {
  const [internalData, setInternalData] = useState();

  // useImperativeHandle: Map ref to specific methods
  useImperativeHandle(ref, () => ({
    // Public API - parent can call these
    doSomething: () => {
      // Can use internal state
      console.log(internalData);
    },
    reset: () => setInternalData(null)
    
    // Everything else remains private!
  }), [internalData]); // Dependencies like useEffect

  return <div>Internal Implementation</div>;
});

// Parent uses the ref safely
const ParentComponent = () => {
  const childRef = useRef();
  
  return (
    <>
      <ChildComponent ref={childRef} />
      <button onClick={() => childRef.current?.doSomething()}>
        Safe Interaction
      </button>
    </>
  );
};`;

  // === RENDER DEMO BASED ON CHAPTER ===
  const renderChapterDemo = () => {
    switch (chapter) {
      case 0: // Intro
        return (
          <div className="space-y-6" ref={parent}>
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-emerald-500 w-8 h-8" />
                <h3 className="text-2xl font-bold">The Projection & The Machine</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-emerald-400 mb-4">Public Interface (The Projection)</h4>
                  <div className="space-y-4">
                    <ConsoleButton 
                      icon={<Brain className="w-8 h-8" />}
                      label="Request Brain"
                      onClick={() => setStats(s => ({ ...s, brainGrants: s.brainGrants + 1 }))}
                      variant="default"
                    />
                    <p className="text-sm text-emerald-300/70 text-center">Simple, controlled interaction</p>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-slate-400 mb-4">Internal Machinery (Hidden)</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-slate-500" />
                      <span className="text-slate-400">Complex state management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-slate-500" />
                      <span className="text-slate-400">Private methods and logic</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-slate-500" />
                      <span className="text-slate-400">Hidden implementation details</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <CodeBlock
              code={useImperativeHandleCode}
              variant="default"
              title="// useImperativeHandle Pattern"
              defaultExpanded={true}
            />
          </div>
        );

      case 1: // Toto Problem
        return (
          <div className="space-y-6" ref={parent}>
            <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-red-500 w-8 h-8" />
                  <h3 className="text-2xl font-bold text-red-400">The Pulled Curtain</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowInternal(!showInternal)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-2"
                  >
                    {showInternal ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showInternal ? "Hide Internals" : "Show Internals"}
                  </button>
                  <button
                    onClick={resetDemo}
                    className="px-4 py-2 bg-red-800 hover:bg-red-700 rounded flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset Chaos
                  </button>
                </div>
              </div>

              <BrokenWizard ref={brokenWizardRef} />

              <div className="mt-6">
                <h4 className="text-lg font-bold mb-4 text-red-300">Dangerous Controls (Parent Access)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ConsoleButton
                    icon={<Brain className="w-6 h-6" />}
                    label="Grant Brain"
                    onClick={() => brokenWizardRef.current?.grantBrain()}
                    variant="danger"
                  />
                  <ConsoleButton
                    icon="🎪"
                    label="Pull Random Lever"
                    onClick={() => {
                      brokenWizardRef.current?.pullRandomLever();
                      if (Math.random() > 0.7) {
                        setStats(s => ({ ...s, systemErrors: s.systemErrors + 1 }));
                      }
                    }}
                    variant="danger"
                  />
                  <ConsoleButton
                    icon="⚡"
                    label="Cause System Error"
                    onClick={() => {
                      brokenWizardRef.current?.showSystemError();
                      setStats(s => ({ ...s, systemErrors: s.systemErrors + 1 }));
                    }}
                    variant="danger"
                  />
                  <div className="bg-red-950/30 p-4 rounded">
                    <p className="text-sm opacity-70">Leaked Timers:</p>
                    <p className="text-2xl font-mono text-red-400">{leakedTimers}</p>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock
              code={brokenRefCode}
              variant="error"
              title="// ❌ Common Mistake: Direct Component Instance Access"
              defaultExpanded={true}
            />
          </div>
        );

      case 2: // Solution
        return (
          <div className="space-y-6" ref={parent}>
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Wand2 className="text-emerald-500 w-8 h-8" />
                  <h3 className="text-2xl font-bold text-emerald-400">The Imperative Console</h3>
                </div>
                <button
                  onClick={resetDemo}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 rounded flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset Console
                </button>
              </div>

              <ConsoleWizard ref={consoleWizardRef} />

              <div className="mt-6">
                <h4 className="text-lg font-bold mb-4 text-emerald-300">Safe Console Interface</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <ConsoleButton
                    icon={<Brain className="w-8 h-8" />}
                    label="Request Brain"
                    onClick={() => consoleWizardRef.current?.grantBrain()}
                    variant="success"
                  />
                  <ConsoleButton
                    icon={<Heart className="w-8 h-8" />}
                    label="Request Heart"
                    onClick={() => consoleWizardRef.current?.grantHeart()}
                    variant="success"
                  />
                  <ConsoleButton
                    icon={<Medal className="w-8 h-8" />}
                    label="Request Courage"
                    onClick={() => consoleWizardRef.current?.grantCourage()}
                    variant="success"
                  />
                </div>
                <p className="text-center mt-4 text-emerald-300/70">
                  Parent can only use these 3 safe methods. Internal machinery remains protected.
                </p>
              </div>
            </div>

            <CodeBlock
              code={fixedRefCode}
              variant="success"
              title="// ✅ Correct Approach: useImperativeHandle"
              defaultExpanded={true}
            />
          </div>
        );

      case 3: // Comparison
        return (
          <div className="space-y-6" ref={parent}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Broken */}
              <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <AlertCircle className="text-red-500 w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold text-red-400">Pulled Curtain</h3>
                    <p className="text-red-300/70">Uncontrolled ref access</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => {
                      brokenWizardRef.current?.pullRandomLever();
                      if (Math.random() > 0.5) {
                        setStats(s => ({ ...s, systemErrors: s.systemErrors + 1 }));
                      }
                    }}
                    className="w-full py-3 bg-red-800 hover:bg-red-700 rounded flex items-center justify-center gap-2"
                  >
                    <span>🎪</span>
                    Pull Random Lever (Dangerous!)
                  </button>
                  
                  <div className="bg-red-950/30 p-4 rounded">
                    <p className="text-sm opacity-70">System Errors:</p>
                    <p className="text-3xl font-mono text-red-400">{stats.systemErrors}</p>
                  </div>
                </div>
                
                <p className="text-sm text-red-300/70">
                  ❌ Parent has full access to internal state and methods
                  <br />❌ Can cause system errors and break encapsulation
                  <br />❌ Implementation details exposed
                </p>
              </div>

              {/* Right: Fixed */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Wand2 className="text-emerald-500 w-8 h-8" />
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-400">Console Interface</h3>
                    <p className="text-emerald-300/70">useImperativeHandle</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => consoleWizardRef.current?.grantBrain()}
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-700 rounded flex items-center justify-center gap-2"
                  >
                    <Brain className="w-5 h-5" />
                    Request Brain (Safe)
                  </button>
                  
                  <div className="bg-emerald-950/30 p-4 rounded">
                    <p className="text-sm opacity-70">Brain Grants:</p>
                    <p className="text-3xl font-mono text-emerald-400">{stats.brainGrants}</p>
                  </div>
                </div>
                
                <p className="text-sm text-emerald-300/70">
                  ✅ Parent can only call exposed methods
                  <br />✅ Internal implementation protected
                  <br />✅ Clean, predictable API
                </p>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="text-slate-400 w-6 h-6" />
                <h4 className="text-lg font-bold">Comparison Metrics</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-4 rounded">
                  <p className="text-sm opacity-70">System Errors</p>
                  <p className={`text-2xl font-mono ${stats.systemErrors > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {stats.systemErrors}
                  </p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded">
                  <p className="text-sm opacity-70">Successful Grants</p>
                  <p className="text-2xl font-mono text-emerald-400">
                    {stats.brainGrants + stats.heartGrants + stats.courageGrants}
                  </p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded">
                  <p className="text-sm opacity-70">Internal Levers Pulled</p>
                  <p className="text-2xl font-mono text-amber-400">{stats.internalLeversPulled}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded">
                  <p className="text-sm opacity-70">Leaked Resources</p>
                  <p className="text-2xl font-mono text-red-400">{leakedTimers}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Summary
        return (
          <div className="space-y-6" ref={parent}>
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-8">
              <div className="flex items-center gap-3 mb-6">
                <Wand2 className="text-emerald-500 w-8 h-8" />
                <h3 className="text-2xl font-bold">The Complete Wizard System</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8">
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6 mb-6">
                    <h4 className="text-lg font-bold text-emerald-400 mb-4">Master Console</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <button
                        onClick={() => consoleWizardRef.current?.grantBrain()}
                        disabled={!isConsoleActive}
                        className="p-4 bg-emerald-800 hover:bg-emerald-700 rounded flex flex-col items-center disabled:opacity-30"
                      >
                        <Brain className="w-8 h-8 mb-2" />
                        <span className="font-bold">Brain</span>
                        <span className="text-xs opacity-70">Grants: {stats.brainGrants}</span>
                      </button>
                      <button
                        onClick={() => consoleWizardRef.current?.grantHeart()}
                        disabled={!isConsoleActive}
                        className="p-4 bg-emerald-800 hover:bg-emerald-700 rounded flex flex-col items-center disabled:opacity-30"
                      >
                        <Heart className="w-8 h-8 mb-2" />
                        <span className="font-bold">Heart</span>
                        <span className="text-xs opacity-70">Grants: {stats.heartGrants}</span>
                      </button>
                      <button
                        onClick={() => consoleWizardRef.current?.grantCourage()}
                        disabled={!isConsoleActive}
                        className="p-4 bg-emerald-800 hover:bg-emerald-700 rounded flex flex-col items-center disabled:opacity-30"
                      >
                        <Medal className="w-8 h-8 mb-2" />
                        <span className="font-bold">Courage</span>
                        <span className="text-xs opacity-70">Grants: {stats.courageGrants}</span>
                      </button>
                    </div>
                    
                    <div className="mt-6 flex justify-center gap-4">
                      <button
                        onClick={() => setIsConsoleActive(true)}
                        disabled={isConsoleActive}
                        className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 rounded disabled:opacity-30"
                      >
                        Activate Console
                      </button>
                      <button
                        onClick={() => setIsConsoleActive(false)}
                        disabled={!isConsoleActive}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded disabled:opacity-30"
                      >
                        Deactivate Console
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
                    <h4 className="text-lg font-bold mb-4">Apprentice Training</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span>Console provides controlled, safe API</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span>Internal machinery remains completely hidden</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span>Parent components interact predictably</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span>Encapsulation protects implementation details</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-4">
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 sticky top-8">
                    <h4 className="text-lg font-bold mb-4">System Status</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm opacity-70">Console Active</p>
                        <p className={`font-mono ${isConsoleActive ? 'text-emerald-400' : 'text-red-400'}`}>
                          {isConsoleActive ? 'YES' : 'NO'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm opacity-70">Total Grants</p>
                        <p className="font-mono text-2xl text-emerald-400">
                          {stats.brainGrants + stats.heartGrants + stats.courageGrants}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm opacity-70">System Health</p>
                        <p className="font-mono text-green-400">OPTIMAL</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-70">Encapsulation</p>
                        <p className="font-mono text-emerald-400">100%</p>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-slate-700">
                      <p className="text-sm opacity-70 mb-2">Wizard's Wisdom:</p>
                      <p className="text-emerald-300 italic">
                        "We don't give them the whole machine. We give them a handle."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <CodeBlock
              code={`// 🧙‍♂️ Key Takeaways:
// 1. useImperativeHandle creates a controlled API for parent components
// 2. Only expose what's necessary - keep implementation details private
// 3. Forward refs to child components using forwardRef()
// 4. The parent gets a clean, predictable interface
// 5. The child maintains encapsulation and can change internal implementation freely

// Pattern:
const Child = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    publicMethod1: () => { /* implementation */ },
    publicMethod2: () => { /* implementation */ }
    // NO internal state exposure!
  }), [dependencies]);

  return <div>Child Component</div>;
});`}
              variant="default"
              title="// 🧙‍♂️ Wizard's Summary: The Imperative Handle Pattern"
              defaultExpanded={true}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-serif p-4 md:p-8">
      {/* HEADER */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          {/* First line: Title left, metadata right */}
          <div className="flex items-center justify-between gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Zap className="text-emerald-500 w-8 h-8" />
              <h1 className="text-2xl md:text-3xl font-bold">The Wizard of Oz</h1>
            </div>
            <p className="text-sm md:text-base text-slate-400">
              Fantasy • The Man Behind the Curtain • 1939
            </p>
          </div>

          {/* Second line: Subtitle/concept */}
          <p className="text-base md:text-lg text-emerald-500 font-medium">
            useImperativeHandle Hook
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* CHAPTER CONTENT */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {currentChapter.title}
          </h2>
          <p className="leading-relaxed text-lg">{currentChapter.content}</p>
        </div>

        {/* INTERACTIVE DEMO */}
        <section className="mb-12">
          {renderChapterDemo()}
        </section>

        {/* NAVIGATION */}
        <nav className="flex justify-between items-center mt-12 pt-8 border-t border-slate-800">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            ← Previous
          </button>
          
          <div className="flex flex-col items-center">
            <div className="flex gap-2 mb-2">
              {chapters.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === chapter 
                      ? 'bg-emerald-500' 
                      : index < chapter 
                        ? 'bg-emerald-500/50' 
                        : 'bg-slate-700'
                  }`}
                  aria-label={`Chapter ${index + 1}`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-400 font-mono">
              Chapter {chapter + 1} of {chapters.length}
            </span>
          </div>
          
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next →
          </button>
        </nav>
      </main>

      {/* SAFETY FOOTER */}
      <footer className="mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-between">
          <div>
            <p className="mb-1">💡 <strong>Educational Module</strong></p>
            <p>Chapter {chapter + 1}: Teaching proper ref management patterns</p>
          </div>
          <div>
            <p className="mb-1">⚠️ <strong>Safety Measures Active</strong></p>
            <p>Circuit breakers: Max 50 leaked timers • Auto-reset at threshold</p>
          </div>
          <button
            onClick={resetDemo}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded flex items-center gap-2 self-start"
          >
            <RefreshCw className="w-4 h-4" />
            Reset All Demos
          </button>
        </div>
      </footer>
    </div>
  );
}