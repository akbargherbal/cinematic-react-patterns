import { useState, useEffect, useCallback, useRef } from "react";
import { Wand2, BookOpen, Sparkles, CheckCircle, Zap, XCircle, RefreshCw } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

// Custom hooks for demonstrations
const useStorm = () => {
  const [isStorming, setIsStorming] = useState(false);
  const toggleStorm = () => setIsStorming(!isStorming);
  return { isStorming, toggleStorm };
};

const useCharm = (initialTarget: string) => {
  const [target, setTarget] = useState(initialTarget);
  const [isCharmed, setIsCharmed] = useState(false);
  const castCharm = () => setIsCharmed(true);
  const breakCharm = () => setIsCharmed(false);
  return { target, isCharmed, castCharm, breakCharm, setTarget };
};

const useSummonSpirit = (spiritName: string) => {
  const [isSummoned, setIsSummoned] = useState(false);
  const [task, setTask] = useState<string>("Idle");
  const summon = (assignedTask: string) => {
    setIsSummoned(true);
    setTask(assignedTask);
  };
  const dismiss = () => {
    setIsSummoned(false);
    setTask("Dismissed");
  };
  return { spiritName, isSummoned, task, summon, dismiss };
};

export default function ProsperosCustomSpells(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'broken' | 'fixed'>('broken');
  const [errorCount, setErrorCount] = useState<number>(0);
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [renderCount, setRenderCount] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Demo states
  const stormDemo = useStorm();
  const [charmTarget1, setCharmTarget1] = useState<string>("Ferdinand");
  const [charmTarget2, setCharmTarget2] = useState<string>("Miranda");
  const [charm1State, setCharm1State] = useState<boolean>(false);
  const [charm2State, setCharm2State] = useState<boolean>(false);
  const [forgotIncantation, setForgotIncantation] = useState<boolean>(false);
  
  const charmHook1 = useCharm("Ferdinand");
  const charmHook2 = useCharm("Miranda");
  
  const spirit1 = useSummonSpirit("Ariel");
  const spirit2 = useSummonSpirit("Goblin");
  const [chaosMode, setChaosMode] = useState<boolean>(false);
  
  const [spellActive, setSpellActive] = useState<boolean>(false);
  const [timerCount, setTimerCount] = useState<number>(0);

  // Circuit breaker for pitfall demos
  useEffect(() => {
    if (errorCount >= 50) {
      alert("Safety limit reached! Resetting demo.");
      resetDemos();
    }
  }, [errorCount]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const triggerError = () => {
    setErrorCount(prev => prev + 1);
    setForgotIncantation(true);
  };

  const triggerChaos = () => {
    setChaosMode(true);
    spirit1.summon("Fetch item");
    spirit2.summon("Guard item");
    setTimeout(() => {
      spirit1.dismiss();
      spirit2.dismiss();
      setChaosMode(false);
    }, 2000);
  };

  const triggerOrder = () => {
    spirit1.summon("Fetch item");
    spirit2.summon("Guard item");
  };

  const startLeakySpell = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimerCount(prev => prev + 1);
      setLeakedTimers(prev => prev + 1);
    }, 100);
    setSpellActive(true);
  };

  const startCleanSpell = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimerCount(prev => prev + 1);
    }, 100);
    setSpellActive(true);
  };

  const stopSpell = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setSpellActive(false);
  };

  const resetDemos = () => {
    setErrorCount(0);
    setLeakedTimers(0);
    setRenderCount(0);
    setForgotIncantation(false);
    setChaosMode(false);
    setCharm1State(false);
    setCharm2State(false);
    setSpellActive(false);
    setTimerCount(0);
    charmHook1.breakCharm();
    charmHook2.breakCharm();
    spirit1.dismiss();
    spirit2.dismiss();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const chapters: Chapter[] = [
    { 
      title: "The Mage's Invocation", 
      content: `Prospero's storm spell—a single command creates or calms a tempest. One complex effect, encapsulated and reusable.

Custom hooks work the same way. Encapsulate complex logic into a reusable function like \`useStorm\`, then invoke it anywhere.` 
    },
    { 
      title: "The Forgotten Incantation", 
      content: `Without encapsulation, Prospero recites full incantations for each charm attempt. He forgets a line, and the magic fails.

Duplicating logic across components leads to the same errors. State management becomes fragile and inconsistent.` 
    },
    { 
      title: "The Codified Spell", 
      content: `Prospero writes the charm once in his book, naming it \`useCharm\`. Now he can invoke it with a single word.

Custom hooks encapsulate logic so you write it once, then reuse it anywhere with consistent, reliable behavior.` 
    },
    { 
      title: "Chaos and Order", 
      content: `Duplicate commands to spirits create chaotic collisions. Using \`useSummonSpirit\` for each creates orderly coordination.

Custom hooks manage side effects cleanly, preventing conflicts when multiple instances run simultaneously.` 
    },
    { 
      title: "The Mage's Renunciation", 
      content: `Prospero breaks his staff and drowns his book, ending all active spells and cleaning up their effects.

Custom hooks include cleanup functions that run on unmount, preventing memory leaks when components are removed.` 
    },
  ];

  // Code examples
  const duplicatedCharmCode = `// ❌ Duplicated logic
function CharmFerdinand() {
  const [isCharmed, setIsCharmed] = useState(false);
  // 15 lines of charm logic...
}

function CharmMiranda() {
  const [isCharmed, setIsCharmed] = useState(false);
  // Same 15 lines repeated...
}`;

  const useCharmCode = `// ✅ Custom hook
function useCharm(target: string) {
  const [isCharmed, setIsCharmed] = useState(false);
  const castCharm = () => setIsCharmed(true);
  const breakCharm = () => setIsCharmed(false);
  
  return { target, isCharmed, castCharm, breakCharm };
}

// Use it anywhere
function CharmComponent() {
  const { isCharmed, castCharm } = useCharm("Ferdinand");
  return <button onClick={castCharm}>Charm</button>;
}`;

  const leakySpellCode = `// ❌ Missing cleanup
function useLeakySpell() {
  useEffect(() => {
    setInterval(() => {
      // Spell logic...
    }, 100);
    // Missing: return () => clearInterval(timer)
  }, []);
}`;

  const cleanSpellCode = `// ✅ With cleanup
function useCleanSpell() {
  useEffect(() => {
    const timer = setInterval(() => {
      // Spell logic...
    }, 100);
    
    return () => clearInterval(timer); // Cleanup
  }, []);
}`;

  const useStormCode = `// Custom hook: useStorm
function useStorm() {
  const [isStorming, setIsStorming] = useState(false);
  const toggleStorm = () => setIsStorming(!isStorming);
  
  return { isStorming, toggleStorm };
}

// Reusable in any component
function WeatherControl() {
  const { isStorming, toggleStorm } = useStorm();
  return <button onClick={toggleStorm}>
    {isStorming ? "Calm Storm" : "Summon Storm"}
  </button>;
}`;

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Wand2}
        title="The Tempest"
        subtitle="Prospero, The Enchanted Isle, 1611"
        concept="React Concept: Custom Hooks"
        themeColor="violet"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-violet-500/30 bg-slate-900/80 p-4 backdrop-blur-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-violet-200">
                  <Sparkles className="h-5 w-5" />
                  Spell Controls
                </h3>
                
                <div className="mb-4 flex gap-2">
                  <button
                    onClick={() => setDemoMode('broken')}
                    className={`flex-1 rounded px-3 py-2 text-sm transition-all ${demoMode === 'broken' ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ❌ Anti-Pattern
                  </button>
                  <button
                    onClick={() => setDemoMode('fixed')}
                    className={`flex-1 rounded px-3 py-2 text-sm transition-all ${demoMode === 'fixed' ? 'bg-violet-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ✅ Custom Hook
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded bg-slate-800/30 p-3">
                    <div className="text-xs text-slate-500">Errors Triggered</div>
                    <div className="font-mono text-xl tabular-nums text-red-400">{errorCount}</div>
                  </div>
                  <div className="rounded bg-slate-800/30 p-3">
                    <div className="text-xs text-slate-500">Timers Active</div>
                    <div className="font-mono text-xl tabular-nums text-violet-400">{leakedTimers}</div>
                  </div>
                </div>

                <button
                  onClick={resetDemos}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded bg-slate-800 px-4 py-2 text-sm hover:bg-slate-700"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset All Demos
                </button>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5 backdrop-blur-sm">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-violet-200">
                  <BookOpen className="h-5 w-5 text-violet-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Prospero</span>
                    <span className="text-sm font-medium text-violet-300">Functional Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Specific Spell</span>
                    <span className="text-sm font-medium text-violet-300">Custom Hook (useStorm)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Incantation</span>
                    <span className="text-sm font-medium text-violet-300">Encapsulated Logic</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Repeated Invocation</span>
                    <span className="text-sm font-medium text-violet-300">Hook Reusability</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Spell Book</span>
                    <span className="text-sm font-medium text-violet-300">Hook Library</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Breaking Staff</span>
                    <span className="text-sm font-medium text-violet-300">Cleanup Function</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Ariel (Spirit)</span>
                    <span className="text-sm font-medium text-violet-300">Side Effect</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-sm text-slate-400">The Island</span>
                    <span className="text-sm font-medium text-violet-300">React Application</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 backdrop-blur-sm">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-violet-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-violet-200/80">
                  {chapter === 0 && "Custom hooks encapsulate complex logic into reusable functions—write once, use anywhere."}
                  {chapter === 1 && "Duplicated logic across components creates maintenance nightmares and inconsistent behavior."}
                  {chapter === 2 && "Encapsulation in custom hooks ensures consistent behavior and single source of truth."}
                  {chapter === 3 && "Custom hooks manage side effects cleanly, preventing conflicts between multiple instances."}
                  {chapter === 4 && "Cleanup functions in hooks prevent memory leaks when components unmount."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4 backdrop-blur-sm">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && "\"By my so potent art, I call upon the storm.\""}
                  {chapter === 1 && "\"The incantation slips my mind—the magic fails!\""}
                  {chapter === 2 && "\"Let this spell be written once, invoked a thousand times.\""}
                  {chapter === 3 && "\"Chaos from duplication, order from encapsulation.\""}
                  {chapter === 4 && "\"I'll break my staff, and drown my book.\""}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — {chapter === 4 ? "Prospero" : "The Tempest"}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-3xl font-bold text-violet-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-violet-500/20 bg-slate-900/40 p-6 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-gradient-to-b from-violet-500 to-purple-500"></div>
              <h3 className="text-xl font-bold text-violet-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter 0: useStorm hook */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className={`rounded-lg border-2 p-6 transition-all ${stormDemo.isStorming ? 'border-red-500/50 bg-gradient-to-br from-red-950/40 to-slate-900' : 'border-violet-500/50 bg-gradient-to-br from-violet-950/40 to-slate-900'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold">Storm Status</div>
                          <div className={`text-2xl font-bold ${stormDemo.isStorming ? 'text-red-400' : 'text-violet-400'}`}>
                            {stormDemo.isStorming ? "⚡ Tempest Active" : "☁️ Calm Seas"}
                          </div>
                        </div>
                        <div className={`h-12 w-12 rounded-full ${stormDemo.isStorming ? 'animate-pulse bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-violet-500 to-blue-500'}`}></div>
                      </div>
                    </div>
                    
                    <button
                      onClick={stormDemo.toggleStorm}
                      className={`w-full rounded-lg py-3 font-bold transition-all ${stormDemo.isStorming ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700' : 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700'}`}
                    >
                      {stormDemo.isStorming ? "Calm the Storm" : "Summon Tempest"}
                    </button>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={useStormCode}
                      language="tsx"
                      variant="success"
                      title="// ✅ Custom Hook: useStorm"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 1: Duplicated logic anti-pattern */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className="mb-4 flex gap-4">
                  <button
                    onClick={() => setDemoMode('broken')}
                    className={`rounded px-4 py-2 transition-all ${demoMode === 'broken' ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ❌ Duplicated Logic
                  </button>
                  <button
                    onClick={() => setDemoMode('fixed')}
                    className={`rounded px-4 py-2 transition-all ${demoMode === 'fixed' ? 'bg-violet-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ✅ Custom Hook
                  </button>
                </div>

                {demoMode === 'broken' ? (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className={`rounded-lg border-2 p-6 ${forgotIncantation ? 'border-red-500/50 bg-red-950/20' : 'border-slate-700 bg-slate-900/50'}`}>
                        <div className="mb-4 flex items-center justify-between">
                          <div className="font-bold">Charm: {charmTarget1}</div>
                          <div className={`h-8 w-8 rounded-full ${charm1State ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 'bg-slate-700'}`}></div>
                        </div>
                        <div className="space-y-3">
                          <button
                            onClick={() => setCharm1State(true)}
                            className="w-full rounded bg-amber-600/30 px-4 py-2 hover:bg-amber-600/50"
                            disabled={forgotIncantation}
                          >
                            Cast Charm
                          </button>
                          <button
                            onClick={() => setCharm1State(false)}
                            className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                          >
                            Break Charm
                          </button>
                        </div>
                      </div>
                      
                      <div className={`rounded-lg border-2 p-6 ${forgotIncantation ? 'border-red-500/50 bg-red-950/20' : 'border-slate-700 bg-slate-900/50'}`}>
                        <div className="mb-4 flex items-center justify-between">
                          <div className="font-bold">Charm: {charmTarget2}</div>
                          <div className={`h-8 w-8 rounded-full ${charm2State ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 'bg-slate-700'}`}></div>
                        </div>
                        <div className="space-y-3">
                          <button
                            onClick={() => {
                              setCharm2State(true);
                              triggerError();
                            }}
                            className="w-full rounded bg-amber-600/30 px-4 py-2 hover:bg-amber-600/50"
                          >
                            Cast Charm
                          </button>
                          <button
                            onClick={() => setCharm2State(false)}
                            className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                          >
                            Break Charm
                          </button>
                        </div>
                        {forgotIncantation && (
                          <div className="mt-4 rounded bg-red-900/40 p-3 text-center text-red-300">
                            ✨ Magic Failed! Incantation forgotten.
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <CodeBlock
                      code={duplicatedCharmCode}
                      language="tsx"
                      variant="error"
                      title="// ❌ Anti-Pattern: Duplicated Logic"
                      defaultExpanded={true}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className={`rounded-lg border-2 p-6 ${charmHook1.isCharmed ? 'border-violet-500/50 bg-violet-950/20' : 'border-slate-700 bg-slate-900/50'}`}>
                        <div className="mb-4 flex items-center justify-between">
                          <div className="font-bold">Charm: {charmHook1.target}</div>
                          <div className={`h-8 w-8 rounded-full ${charmHook1.isCharmed ? 'bg-gradient-to-r from-violet-500 to-purple-500' : 'bg-slate-700'}`}></div>
                        </div>
                        <div className="space-y-3">
                          <button
                            onClick={charmHook1.castCharm}
                            className="w-full rounded bg-violet-600/30 px-4 py-2 hover:bg-violet-600/50"
                          >
                            Cast Charm
                          </button>
                          <button
                            onClick={charmHook1.breakCharm}
                            className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                          >
                            Break Charm
                          </button>
                        </div>
                      </div>
                      
                      <div className={`rounded-lg border-2 p-6 ${charmHook2.isCharmed ? 'border-violet-500/50 bg-violet-950/20' : 'border-slate-700 bg-slate-900/50'}`}>
                        <div className="mb-4 flex items-center justify-between">
                          <div className="font-bold">Charm: {charmHook2.target}</div>
                          <div className={`h-8 w-8 rounded-full ${charmHook2.isCharmed ? 'bg-gradient-to-r from-violet-500 to-purple-500' : 'bg-slate-700'}`}></div>
                        </div>
                        <div className="space-y-3">
                          <button
                            onClick={charmHook2.castCharm}
                            className="w-full rounded bg-violet-600/30 px-4 py-2 hover:bg-violet-600/50"
                          >
                            Cast Charm
                          </button>
                          <button
                            onClick={charmHook2.breakCharm}
                            className="w-full rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                          >
                            Break Charm
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <CodeBlock
                      code={useCharmCode}
                      language="tsx"
                      variant="success"
                      title="// ✅ Solution: Custom Hook"
                      defaultExpanded={true}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Chapter 2: useCharm hook implementation */}
            {chapter === 2 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border-2 border-violet-500/50 bg-violet-950/20 p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-500 to-purple-500"></div>
                        <div>
                          <div className="font-bold">Spell Book Entry</div>
                          <div className="text-sm text-slate-400">useCharm Hook</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="rounded bg-slate-900/50 p-3">
                          <div className="text-sm text-slate-400">Current Target</div>
                          <div className="font-mono">{charmHook1.target}</div>
                        </div>
                        <div className="rounded bg-slate-900/50 p-3">
                          <div className="text-sm text-slate-400">Status</div>
                          <div className={charmHook1.isCharmed ? "font-bold text-violet-400" : "text-slate-400"}>
                            {charmHook1.isCharmed ? "✨ Charmed" : "Not Charmed"}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        charmHook1.castCharm();
                        charmHook2.castCharm();
                      }}
                      className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 py-3 font-bold hover:from-violet-700 hover:to-purple-700"
                    >
                      Invoke useCharm on Both Targets
                    </button>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={useCharmCode}
                      language="tsx"
                      variant="success"
                      title="// ✅ Custom Hook Implementation"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 3: Chaos vs Order comparison */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className={`rounded-lg border-2 p-6 ${chaosMode ? 'border-red-500/50 bg-red-950/20' : 'border-slate-700 bg-slate-900/50'}`}>
                      <h4 className="mb-4 flex items-center gap-2 text-lg font-bold">
                        <Zap className={`h-5 w-5 ${chaosMode ? 'text-red-400 animate-pulse' : 'text-slate-500'}`} />
                        Spirit Summoning
                      </h4>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded bg-slate-900/50 p-3">
                          <div>
                            <div className="font-bold">{spirit1.spiritName}</div>
                            <div className="text-sm text-slate-400">{spirit1.task}</div>
                          </div>
                          <div className={`h-6 w-6 rounded-full ${spirit1.isSummoned ? 'bg-gradient-to-r from-violet-500 to-blue-500' : 'bg-slate-700'}`}></div>
                        </div>
                        
                        <div className="flex items-center justify-between rounded bg-slate-900/50 p-3">
                          <div>
                            <div className="font-bold">{spirit2.spiritName}</div>
                            <div className="text-sm text-slate-400">{spirit2.task}</div>
                          </div>
                          <div className={`h-6 w-6 rounded-full ${spirit2.isSummoned ? 'bg-gradient-to-r from-violet-500 to-blue-500' : 'bg-slate-700'}`}></div>
                        </div>
                      </div>
                      
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                          onClick={triggerChaos}
                          className="rounded bg-red-600/30 px-4 py-2 hover:bg-red-600/50"
                        >
                          Duplicate Commands
                        </button>
                        <button
                          onClick={triggerOrder}
                          className="rounded bg-violet-600/30 px-4 py-2 hover:bg-violet-600/50"
                        >
                          useSummonSpirit()
                        </button>
                      </div>
                    </div>
                    
                    {chaosMode && (
                      <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                        <div className="flex items-center gap-2 text-red-400">
                          <XCircle className="h-5 w-5" />
                          <span className="font-bold">Chaos Detected!</span>
                        </div>
                        <p className="mt-2 text-sm text-red-300">
                          Spirits collide when given separate, uncoordinated commands. Tasks overlap and fail.
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <CodeComparison
                      badCode={`// ❌ Duplicated summoning logic
function SummonAriel() {
  const [isSummoned, setIsSummoned] = useState(false);
  const [task, setTask] = useState('');
  
  const summon = (newTask: string) => {
    setIsSummoned(true);
    setTask(newTask);
  };
  // ...15 more lines
}

function SummonGoblin() {
  const [isSummoned, setIsSummoned] = useState(false);
  const [task, setTask] = useState('');
  
  const summon = (newTask: string) => {
    setIsSummoned(true);
    setTask(newTask);
  };
  // Same 15 lines repeated...
}`}
                      goodCode={`// ✅ Custom hook
function useSummonSpirit(spiritName: string) {
  const [isSummoned, setIsSummoned] = useState(false);
  const [task, setTask] = useState('');
  
  const summon = (newTask: string) => {
    setIsSummoned(true);
    setTask(newTask);
  };
  
  const dismiss = () => {
    setIsSummoned(false);
    setTask('Dismissed');
  };
  
  return { spiritName, isSummoned, task, summon, dismiss };
}

// Reusable for any spirit
const ariel = useSummonSpirit("Ariel");
const goblin = useSummonSpirit("Goblin");`}
                      language="tsx"
                      themeColor="violet"
                      badLabel="❌ Duplicated Logic"
                      goodLabel="✅ Custom Hook"
                      badExplanation="Separate implementations for each spirit lead to code duplication and coordination issues."
                      goodExplanation="One hook handles any spirit, ensuring consistent behavior and easy coordination."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 4: Cleanup demonstration */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="mb-4 flex gap-4">
                  <button
                    onClick={() => setDemoMode('broken')}
                    className={`rounded px-4 py-2 transition-all ${demoMode === 'broken' ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ❌ Missing Cleanup
                  </button>
                  <button
                    onClick={() => setDemoMode('fixed')}
                    className={`rounded px-4 py-2 transition-all ${demoMode === 'fixed' ? 'bg-violet-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ✅ With Cleanup
                  </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border-2 border-slate-700 bg-slate-900/50 p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold">Active Spell</div>
                          <div className={`text-2xl font-bold ${spellActive ? 'text-violet-400' : 'text-slate-400'}`}>
                            {spellActive ? "ACTIVE" : "INACTIVE"}
                          </div>
                        </div>
                        <div className={`h-16 w-16 rounded-full ${spellActive ? 'animate-spin bg-gradient-to-r from-violet-500 to-blue-500' : 'bg-gradient-to-r from-slate-700 to-slate-800'}`}></div>
                      </div>
                      
                      <div className="mb-6 rounded bg-slate-900/70 p-4">
                        <div className="mb-2 flex justify-between">
                          <div className="text-sm text-slate-400">Timer Count</div>
                          <div className="font-mono text-2xl tabular-nums text-violet-300">{timerCount}</div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-800">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-300"
                            style={{ width: `${Math.min(timerCount % 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {demoMode === 'broken' ? (
                          <button
                            onClick={startLeakySpell}
                            disabled={spellActive}
                            className="rounded bg-red-600/30 px-4 py-3 hover:bg-red-600/50 disabled:opacity-50"
                          >
                            Start Spell
                          </button>
                        ) : (
                          <button
                            onClick={startCleanSpell}
                            disabled={spellActive}
                            className="rounded bg-violet-600/30 px-4 py-3 hover:bg-violet-600/50 disabled:opacity-50"
                          >
                            Start Spell
                          </button>
                        )}
                        
                        <button
                          onClick={stopSpell}
                          disabled={!spellActive}
                          className="rounded bg-slate-700 px-4 py-3 hover:bg-slate-600 disabled:opacity-50"
                        >
                          Stop Spell
                        </button>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border border-slate-800 bg-slate-900/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Leaked Timers</div>
                        <div className="font-mono text-xl tabular-nums text-red-400">{leakedTimers}</div>
                      </div>
                      <div className="mt-2 text-xs text-slate-500">
                        {demoMode === 'broken' 
                          ? "Missing cleanup leaves timers running after component unmounts." 
                          : "Cleanup function properly clears timers when component unmounts."}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <CodeComparison
                      badCode={leakySpellCode}
                      goodCode={cleanSpellCode}
                      language="tsx"
                      themeColor="violet"
                      badLabel="❌ Missing Cleanup"
                      goodLabel="✅ With Cleanup"
                      badExplanation="Timer continues running after component unmounts, causing memory leaks."
                      goodExplanation="Cleanup function stops timer when component unmounts, preventing memory leaks."
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Chapter Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="violet"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}