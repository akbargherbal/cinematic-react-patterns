import { useState, useEffect, useCallback } from "react";
import {
  Brain,
  Coffee,
  Building2,
  Hotel,
  Hospital,
  Layers,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  title: string;
  content: string;
  atmosphere: string;
}

interface DreamLayer {
  id: string;
  name: string;
  description: string;
  color: string;
  state: Record<string, any>;
}

export default function InceptionDreamLayers(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [animationParent] = useAutoAnimate();
  const [cafeAmbiance, setCafeAmbiance] = useState<"calm" | "busy">("calm");
  const [monolithMode, setMonolithMode] = useState<"chaos" | "order">("chaos");
  const [renderCount, setRenderCount] = useState<number>(0);
  const [leakCount, setLeakCount] = useState<number>(0);
  const [componentStack, setComponentStack] = useState<DreamLayer[]>([
    {
      id: "city",
      name: "Rainy City",
      description: "Yusuf's level",
      color: "bg-blue-500/20",
      state: { rain: true, traffic: "heavy" },
    },
    {
      id: "hotel",
      name: "Luxury Hotel",
      description: "Arthur's level",
      color: "bg-amber-500/20",
      state: { gravity: "normal", ambiance: "calm" },
    },
    {
      id: "hospital",
      name: "Mountain Hospital",
      description: "Eames's level",
      color: "bg-cyan-500/20",
      state: { snow: true, temperature: "cold" },
    },
  ]);
  const [activeKicks, setActiveKicks] = useState<string[]>([]);
  const [comparisonView, setComparisonView] = useState<
    "monolith" | "components"
  >("monolith");

  const chapters: Chapter[] = [
    {
      title: "The Parisian Cafe",
      content:
        "In the cold warehouse, Cobb teaches Ariadne the first rule of dream architecture: every world must be self-contained. She designs a Parisian cafe with meticulous detail—the wobble of the third table, the aroma of coffee. When rendered through the PASIV device, the cafe exists in perfect isolation. 'This world only knows what you told it. Nothing more.' This establishes the fundamental principle of React components: isolated, reusable units with defined boundaries.",
      atmosphere: "creative, focused, wondrous",
    },
    {
      title: "The Monolithic Blueprint",
      content:
        "The team attempts to build the entire Fischer mission on one colossal blueprint. City rain bleeds into hotel corridors. Hospital hallways appear in city streets. Mal's projection becomes a global virus, crashing the entire construct. 'Everything is bleeding into everything else! We have no control!' This demonstrates the anti-pattern: a single massive component where state changes unpredictably affect everything. Without component boundaries, the application becomes fragile and impossible to debug.",
      atmosphere: "chaotic, frustrating, catastrophic",
    },
    {
      title: "A Stack of Maps",
      content:
        "Ariadne has an epiphany. She cuts the monolithic blueprint into three distinct layers: City, Hotel, Hospital. 'We don't need one map. We need a stack of maps, each with its own rules.' She defines entry points and data requirements between layers. Cobb explains: 'The hotel only needs to receive one thing: the idea about Fischer's father. We pass that down, and nothing else.' This reveals the solution: breaking the UI into isolated components with clear props interfaces.",
      atmosphere: "revelatory, structured, elegant",
    },
    {
      title: "The Monolith vs. The Stack",
      content:
        "Side-by-side comparison proves the new architecture. In the monolith, a freight train from Cobb's subconscious crashes through the hotel bar during a critical conversation. Rain from the city floods the hotel lobby. In the component stack, transitions are clean: the rainy city's chaos stays contained. The hotel exists in calm isolation, receiving only the mission objective. 'It only accepts what we choose to pass down. It can't poison the ones next to it.' Components provide predictability through isolation.",
      atmosphere: "reflective, comparative, analytical",
    },
    {
      title: "The Synchronized Kick",
      content:
        "The mission executes flawlessly through component composition. The van fall in Level 1 triggers Arthur's elevator explosion in Level 2, which triggers Eames's defibrillator in Level 3. Each component waits for its specific callback prop. The cascade works because each dream layer is isolated yet connected through defined interfaces. Back on the airplane, Ariadne understands: 'Independent worlds, working together. That's the architecture.' This demonstrates how composed components create complex applications through clean data flow.",
      atmosphere: "celebratory, confident, complete",
    },
  ];

  // Code examples as template literals
  const cafeComponentCode = `// Chapter 1: Isolated Cafe Component
interface CafeProps {
  ambiance: "calm" | "busy";
  onAmbianceChange: (newAmbiance: "calm" | "busy") => void;
}

function ParisianCafe({ ambiance, onAmbianceChange }: CafeProps) {
  // State is internal to this component
  const [patrons, setPatrons] = useState(ambiance === "busy" ? 12 : 3);
  
  // Effect cleanup ensures no memory leaks
  useEffect(() => {
    if (ambiance === "busy") {
      const timer = setInterval(() => {
        // Functional update prevents stale closures
        setPatrons(p => Math.min(20, p + 1));
      }, 2000);
      return () => clearInterval(timer); // ✅ Mandatory cleanup
    }
  }, [ambiance]); // ✅ Complete dependencies
  
  return (
    <div className="p-6 bg-amber-950/30 border border-amber-500/30 rounded-lg">
      <h3>Parisian Cafe</h3>
      <p>Patrons: {patrons}</p>
      <p>Ambiance: {ambiance}</p>
      <button onClick={() => onAmbianceChange(
        ambiance === "calm" ? "busy" : "calm"
      )}>
        Toggle Ambiance
      </button>
    </div>
  );
}`;

  const monolithicAntiPatternCode = `// Chapter 2: ❌ Monolithic Anti-Pattern
function MonolithicDream() {
  // All state in one component - everything is connected
  const [rain, setRain] = useState(true);
  const [gravity, setGravity] = useState("normal");
  const [snow, setSnow] = useState(false);
  const [malPresent, setMalPresent] = useState(false);

  // Changing rain affects hotel and hospital!
  useEffect(() => {
    if (rain) {
      // ❌ State leakage: rain shouldn't affect hotel gravity
      setGravity("weird");
      // ❌ State leakage: rain shouldn't cause snow
      setSnow(true);
    }
  }, [rain]); // This effect has unintended consequences

  // Missing cleanup - memory leak!
  useEffect(() => {
    const timer = setInterval(() => {
      setMalPresent(m => !m); // ❌ No cleanup
    }, 3000);
    // ❌ Missing: return () => clearInterval(timer)
  }, []);

  return (
    <div className="p-6 bg-red-950/30 border border-red-500/30">
      <h3>Everything Connected = Chaos</h3>
      <p>Rain: {rain ? "Yes" : "No"}</p>
      <p>Hotel Gravity: {gravity}</p>
      <p>Hospital Snow: {snow ? "Yes" : "No"}</p>
      <p>Mal Present: {malPresent ? "YES - DANGER" : "No"}</p>
      <button onClick={() => setRain(!rain)}>
        Toggle Rain (affects everything!)
      </button>
    </div>
  );
}`;

  const componentStackCode = `// Chapter 3: ✅ Component Stack Solution
// Parent component composes children
function DreamStack() {
  const [missionIdea, setMissionIdea] = useState(
    "Fischer's father is disappointed"
  );

  return (
    <div className="space-y-4">
      <RainyCity 
        idea={missionIdea} 
        onKick={() => console.log("City kick!")}
      />
      <LuxuryHotel 
        idea={missionIdea} 
        onKick={() => console.log("Hotel kick!")}
      />
      <MountainHospital 
        idea={missionIdea} 
        onKick={() => console.log("Hospital kick!")}
      />
    </div>
  );
}

// Child components are isolated
interface DreamLayerProps {
  idea: string;
  onKick: () => void;
}

function RainyCity({ idea, onKick }: DreamLayerProps) {
  const [rain, setRain] = useState(true);
  // Hotel doesn't know about this state
  // Hospital doesn't know about this state
  
  return (
    <div className="p-4 bg-blue-950/30 border border-blue-500/30">
      <h4>Rainy City</h4>
      <p>Mission Idea: {idea}</p>
      <p>Rain: {rain ? "Pouring" : "Clear"}</p>
      <button onClick={onKick}>Trigger Kick</button>
    </div>
  );
}

// Hotel component knows nothing about rain
function LuxuryHotel({ idea, onKick }: DreamLayerProps) {
  const [gravity, setGravity] = useState("normal");
  // Isolated state - only this component cares
  
  return (
    <div className="p-4 bg-amber-950/30 border border-amber-500/30">
      <h4>Luxury Hotel</h4>
      <p>Mission Idea: {idea}</p>
      <p>Gravity: {gravity}</p>
      <button onClick={onKick}>Trigger Kick</button>
    </div>
  );
}`;

  const callbackPropCode = `// Chapter 5: Callback Props for Communication
interface LayerProps {
  level: number;
  onKick: () => void;
  kickReceived?: boolean;
}

function DreamLayer({ level, onKick, kickReceived }: LayerProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h4>Level {level}</h4>
      <p>Status: {kickReceived ? "Kick received!" : "Waiting..."}</p>
      <button 
        onClick={onKick}
        className="px-4 py-2 bg-cyan-600 text-white rounded"
      >
        Trigger Kick to Level {level + 1}
      </button>
    </div>
  );
}

// Parent manages the cascade
function MissionCascade() {
  const [kicks, setKicks] = useState<number[]>([]);
  
  const handleLevel1Kick = useCallback(() => {
    setKicks([1]);
    setTimeout(() => setKicks([1, 2]), 1000);
    setTimeout(() => setKicks([1, 2, 3]), 2000);
  }, []);
  
  return (
    <div className="space-y-4">
      <DreamLayer 
        level={1} 
        onKick={handleLevel1Kick}
        kickReceived={false}
      />
      <DreamLayer 
        level={2} 
        onKick={() => {}} // No-op for demo
        kickReceived={kicks.includes(2)}
      />
      <DreamLayer 
        level={3} 
        onKick={() => {}} // No-op for demo
        kickReceived={kicks.includes(3)}
      />
    </div>
  );
}`;

  // Circuit breaker for memory leaks
  useEffect(() => {
    if (leakCount >= 50) {
      alert("⚠️ Circuit breaker: Too many leaked resources. Resetting demo.");
      setLeakCount(0);
      setRenderCount(0);
    }
  }, [leakCount]);

  // Simulate memory leak for Chapter 2 demo
  useEffect(() => {
    if (chapter === 1 && monolithMode === "chaos") {
      const timer = setInterval(() => {
        setRenderCount((r) => r + 1);
        setLeakCount((l) => l + 1);
      }, 1000);

      return () => clearInterval(timer); // Cleanup when component unmounts or mode changes
    }
  }, [chapter, monolithMode]);

  // Handle kick cascade for Chapter 5
  const triggerKickCascade = useCallback(() => {
    setActiveKicks(["city"]);
    setTimeout(() => setActiveKicks(["city", "hotel"]), 800);
    setTimeout(() => setActiveKicks(["city", "hotel", "hospital"]), 1600);
    setTimeout(() => setActiveKicks([]), 3000);
  }, []);

  const currentChapter = chapters[chapter];
  const chapterIcons = [Coffee, Building2, Layers, Hotel, Hospital];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Background atmospheric effect */}
      <div className="pointer-events-none fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%22100%22%20height%3D%22100%22%20viewBox%3D%220%200%20100%20100%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%2C0%20L100%2C0%20L100%2C100%20L0%2C100%20Z%22%20fill%3D%22none%22%20stroke%3D%22%2523334d5c%22%20stroke-width%3D%220.5%22%2F%3E%3C%2Fsvg%3E')] opacity-10"></div>

      <header className="relative border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6">
          {/* First line: Title left, metadata right */}
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3">
              <Brain className="h-7 w-7 text-cyan-500 sm:h-8 sm:w-8" />
              <h1 className="text-2xl font-bold sm:text-3xl">Inception</h1>
            </div>
            <p className="text-sm text-slate-400 sm:text-base">
              Fiction • Ariadne • 2010
            </p>
          </div>

          {/* Second line: Subtitle/concept */}
          <p className="text-base font-medium text-cyan-500 sm:text-lg">
            React Components: Isolation & Composition
          </p>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-4">
          {/* Main content column */}
          <div className="lg:col-span-8">
            {/* Chapter content */}
            <div className="prose prose-invert prose-lg mb-8 max-w-none sm:mb-12">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg bg-slate-800 p-2">
                  {(() => {
                    const Icon = chapterIcons[chapter];
                    return <Icon className="h-6 w-6 text-amber-500" />;
                  })()}
                </div>
                <h2 className="m-0 text-2xl font-bold sm:text-3xl">
                  {currentChapter.title}
                </h2>
              </div>
              <p className="leading-relaxed text-slate-300">
                {currentChapter.content}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <span className="rounded bg-slate-800 px-2 py-1">
                  Atmosphere:
                </span>
                <span>{currentChapter.atmosphere}</span>
              </div>
            </div>

            {/* Interactive demo section */}
            <section className="mb-8 rounded-xl border border-slate-700 bg-slate-900/50 p-4 sm:mb-12 sm:p-6">
              <h3 className="mb-4 text-lg font-semibold text-amber-500 sm:text-xl">
                Interactive Demonstration
              </h3>

              <div ref={animationParent}>
                {/* Chapter 1: Isolated Cafe Component */}
                {chapter === 0 && (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4 sm:p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <Coffee className="h-5 w-5 text-amber-500" />
                        <h4 className="text-lg font-semibold">
                          Parisian Cafe Component
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <p className="mb-2 text-sm text-slate-400">
                            Ambiance:
                          </p>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => setCafeAmbiance("calm")}
                              className={`rounded px-4 py-2 transition-all ${cafeAmbiance === "calm" ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-300"}`}
                            >
                              Calm
                            </button>
                            <button
                              onClick={() => setCafeAmbiance("busy")}
                              className={`rounded px-4 py-2 transition-all ${cafeAmbiance === "busy" ? "bg-amber-600 text-white" : "bg-slate-800 text-slate-300"}`}
                            >
                              Busy
                            </button>
                          </div>
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Patron Count:</span>
                              <span className="font-mono">
                                {cafeAmbiance === "busy" ? "12-20" : "3-5"}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Sound Level:</span>
                              <span className="font-mono">
                                {cafeAmbiance === "busy"
                                  ? "Murmuring"
                                  : "Quiet"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="border-l border-slate-700 pl-4 sm:pl-6">
                          <p className="mb-2 text-sm text-slate-400">
                            Component State:
                          </p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-3 w-3 rounded-full ${cafeAmbiance === "calm" ? "bg-green-500" : "bg-amber-500"}`}
                              ></div>
                              <span className="text-sm">
                                Isolated from other components
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                              <span className="text-sm">
                                Cleanup on unmount
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
                              <span className="text-sm">
                                Props define interface
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CodeBlock
                      code={cafeComponentCode}
                      variant="success"
                      title="// ✅ Isolated Component Pattern"
                      defaultExpanded={true}
                    />
                  </div>
                )}

                {/* Chapter 2: Monolithic Anti-Pattern */}
                {chapter === 1 && (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4 sm:p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-red-500" />
                          <h4 className="text-lg font-semibold">
                            Monolithic Dream
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setMonolithMode("chaos")}
                            className={`rounded px-3 py-1 text-sm ${monolithMode === "chaos" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"}`}
                          >
                            ❌ Show Bug
                          </button>
                          <button
                            onClick={() => setMonolithMode("order")}
                            className={`rounded px-3 py-1 text-sm ${monolithMode === "order" ? "bg-green-600 text-white" : "bg-slate-800 text-slate-300"}`}
                          >
                            ✅ Show Fix
                          </button>
                        </div>
                      </div>

                      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded bg-blue-950/30 p-3">
                          <p className="mb-1 text-sm font-medium">Rainy City</p>
                          <p className="text-xs text-slate-400">
                            State:{" "}
                            {monolithMode === "chaos"
                              ? "Rain affects everything"
                              : "Isolated"}
                          </p>
                        </div>
                        <div className="rounded bg-amber-950/30 p-3">
                          <p className="mb-1 text-sm font-medium">
                            Luxury Hotel
                          </p>
                          <p className="text-xs text-slate-400">
                            Gravity:{" "}
                            {monolithMode === "chaos" ? "Unstable" : "Normal"}
                          </p>
                        </div>
                        <div className="rounded bg-cyan-950/30 p-3">
                          <p className="mb-1 text-sm font-medium">
                            Mountain Hospital
                          </p>
                          <p className="text-xs text-slate-400">
                            Snow:{" "}
                            {monolithMode === "chaos"
                              ? "Caused by rain"
                              : "Independent"}
                          </p>
                        </div>
                      </div>

                      {monolithMode === "chaos" && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <span>Memory Leak Counter:</span>
                            </div>
                            <span className="font-mono text-red-500">
                              {leakCount}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Render Count:</span>
                            <span className="font-mono">{renderCount}</span>
                          </div>
                          <div className="text-xs text-red-400">
                            ⚠️ Without component isolation, changing one state
                            affects everything
                          </div>
                        </div>
                      )}

                      {monolithMode === "order" && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Memory leaks prevented by cleanup</span>
                          </div>
                          <div className="text-xs text-green-400">
                            ✅ Each component manages its own state
                            independently
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          setLeakCount(0);
                          setRenderCount(0);
                        }}
                        className="mt-4 rounded bg-slate-800 px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700"
                      >
                        <RotateCcw className="mr-2 inline h-4 w-4" />
                        Reset Demo
                      </button>
                    </div>

                    <CodeBlock
                      code={monolithicAntiPatternCode}
                      variant={monolithMode === "chaos" ? "error" : "default"}
                      title={
                        monolithMode === "chaos"
                          ? "// ❌ Monolithic Anti-Pattern"
                          : "// ⚠️ Problem Identified"
                      }
                      defaultExpanded={true}
                    />
                  </div>
                )}

                {/* Chapter 3: Component Stack */}
                {chapter === 2 && (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 sm:p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <Layers className="h-5 w-5 text-cyan-500" />
                        <h4 className="text-lg font-semibold">
                          Component Stack
                        </h4>
                      </div>

                      <div className="space-y-4">
                        {componentStack.map((layer, index) => (
                          <div
                            key={layer.id}
                            className={`rounded-lg border p-4 ${layer.color} border-opacity-30`}
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <h5 className="font-medium">{layer.name}</h5>
                              <span className="rounded bg-slate-800 px-2 py-1 text-xs">
                                Level {index + 1}
                              </span>
                            </div>
                            <p className="mb-2 text-sm text-slate-400">
                              {layer.description}
                            </p>
                            <div className="space-y-1 text-xs">
                              {Object.entries(layer.state).map(
                                ([key, value]) => (
                                  <div
                                    key={key}
                                    className="flex justify-between"
                                  >
                                    <span className="text-slate-500">
                                      {key}:
                                    </span>
                                    <span className="font-mono">
                                      {String(value)}
                                    </span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 rounded bg-slate-800/50 p-3">
                        <p className="text-sm text-slate-300">
                          <span className="font-medium text-cyan-400">
                            Key Insight:
                          </span>{" "}
                          Each component receives only the props it needs. The
                          hotel doesn't know about the city's rain, and the
                          hospital doesn't know about the hotel's gravity.
                        </p>
                      </div>
                    </div>

                    <CodeBlock
                      code={componentStackCode}
                      variant="success"
                      title="// ✅ Component Composition Pattern"
                      defaultExpanded={true}
                    />
                  </div>
                )}

                {/* Chapter 4: Comparison */}
                {chapter === 3 && (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 sm:p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Hotel className="h-5 w-5 text-amber-500" />
                          <h4 className="text-lg font-semibold">
                            Architecture Comparison
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setComparisonView("monolith")}
                            className={`rounded px-3 py-1 text-sm ${comparisonView === "monolith" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300"}`}
                          >
                            Monolith
                          </button>
                          <button
                            onClick={() => setComparisonView("components")}
                            className={`rounded px-3 py-1 text-sm ${comparisonView === "components" ? "bg-green-600 text-white" : "bg-slate-800 text-slate-300"}`}
                          >
                            Components
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div
                          className={`rounded-lg p-4 ${comparisonView === "monolith" ? "border-red-500/30 bg-red-950/20" : "border-slate-700 bg-slate-800/30"} border`}
                        >
                          <div className="mb-3 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500" />
                            <h5 className="font-semibold">Single Component</h5>
                          </div>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span>State changes affect everything</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span>Difficult to reason about</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span>Bugs spread uncontrollably</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span>Hard to test in isolation</span>
                            </li>
                          </ul>
                        </div>

                        <div
                          className={`rounded-lg p-4 ${comparisonView === "components" ? "border-green-500/30 bg-green-950/20" : "border-slate-700 bg-slate-800/30"} border`}
                        >
                          <div className="mb-3 flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <h5 className="font-semibold">Component Stack</h5>
                          </div>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Clear boundaries between concerns</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Easier to reason about</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Bugs contained to one component</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <span>Easy to test and reuse</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 rounded bg-slate-800/50 p-3">
                        <p className="text-sm text-slate-300">
                          <span className="font-medium text-amber-400">
                            Cobb's Wisdom:
                          </span>{" "}
                          "The hotel only accepts what we choose to pass down.
                          It can't poison the ones next to it."
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chapter 5: Callback Cascade */}
                {chapter === 4 && (
                  <div className="space-y-6">
                    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4 sm:p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <Hospital className="h-5 w-5 text-cyan-500" />
                        <h4 className="text-lg font-semibold">
                          Synchronized Kick Cascade
                        </h4>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            id: "city",
                            name: "Level 1: Rainy City",
                            description: "Van hits the water",
                          },
                          {
                            id: "hotel",
                            name: "Level 2: Luxury Hotel",
                            description: "Elevator explosion",
                          },
                          {
                            id: "hospital",
                            name: "Level 3: Mountain Hospital",
                            description: "Defibrillator shock",
                          },
                        ].map((level) => (
                          <div
                            key={level.id}
                            className={`rounded-lg border p-4 ${activeKicks.includes(level.id) ? "border-cyan-500 bg-cyan-950/20" : "border-slate-700 bg-slate-800/30"} transition-all duration-300`}
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <h5 className="font-medium">{level.name}</h5>
                              {activeKicks.includes(level.id) ? (
                                <span className="animate-pulse rounded bg-cyan-600 px-2 py-1 text-xs text-white">
                                  KICK ACTIVE
                                </span>
                              ) : (
                                <span className="rounded bg-slate-700 px-2 py-1 text-xs text-slate-300">
                                  Waiting...
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-400">
                              {level.description}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                        <button
                          onClick={triggerKickCascade}
                          className="rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white transition-colors hover:bg-cyan-700"
                        >
                          Trigger Synchronized Kick
                        </button>
                        <button
                          onClick={() => setActiveKicks([])}
                          className="rounded-lg bg-slate-800 px-6 py-3 text-slate-300 transition-colors hover:bg-slate-700"
                        >
                          Reset Cascade
                        </button>
                      </div>

                      <div className="mt-4 rounded bg-slate-800/50 p-3">
                        <p className="text-sm text-slate-300">
                          <span className="font-medium text-cyan-400">
                            The Cascade:
                          </span>{" "}
                          Each component waits for its specific callback prop.
                          Level 1 triggers Level 2, which triggers Level 3.
                          Clean data flow through props enables complex
                          coordination.
                        </p>
                      </div>
                    </div>

                    <CodeBlock
                      code={callbackPropCode}
                      variant="success"
                      title="// ✅ Callback Props for Communication"
                      defaultExpanded={true}
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Navigation */}
            <nav className="flex items-center justify-between border-t border-slate-800 pt-4">
              <button
                onClick={() => setChapter(Math.max(0, chapter - 1))}
                disabled={chapter === 0}
                className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-3 text-slate-300 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="hidden sm:inline">Previous Chapter</span>
                <span className="sm:hidden">Previous</span>
              </button>

              <div className="flex flex-col items-center">
                <div className="mb-1 flex items-center gap-2">
                  {chapters.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 w-2 rounded-full ${idx === chapter ? "bg-cyan-500" : "bg-slate-700"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-500">
                  Chapter {chapter + 1} of {chapters.length}
                </span>
              </div>

              <button
                onClick={() =>
                  setChapter(Math.min(chapters.length - 1, chapter + 1))
                }
                disabled={chapter === chapters.length - 1}
                className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-3 text-white transition-colors hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-30 sm:px-6"
              >
                <span className="hidden sm:inline">Next Chapter</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>

          {/* Sidebar column */}
          <div className="mt-8 lg:col-span-4 lg:mt-0 lg:pl-8">
            <div className="sticky top-8 space-y-6">
              {/* Metaphor registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
                <h3 className="mb-4 text-lg font-semibold text-amber-500">
                  Metaphor Registry
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-950/30 p-2">
                      <Building2 className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Dream Layer = React Component
                      </p>
                      <p className="text-sm text-slate-400">
                        Self-contained, reusable UI unit with own logic
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-amber-950/30 p-2">
                      <Brain className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <p className="font-medium">Architect = Developer</p>
                      <p className="text-sm text-slate-400">
                        Designs and builds component structure
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-green-950/30 p-2">
                      <Layers className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Mission Idea = Props</p>
                      <p className="text-sm text-slate-400">
                        Data passed from parent to child component
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-cyan-950/30 p-2">
                      <Hotel className="h-5 w-5 text-cyan-500" />
                    </div>
                    <div>
                      <p className="font-medium">Kick = Callback Function</p>
                      <p className="text-sm text-slate-400">
                        Allows child to communicate back to parent
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning checkpoint */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
                <h3 className="mb-4 text-lg font-semibold text-green-500">
                  Learning Checkpoint
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="font-medium">
                      Chapter {chapter + 1} Complete
                    </span>
                  </div>
                  <p className="text-sm text-slate-300">
                    {chapter === 0 &&
                      "✓ You understand that components are isolated units with their own state"}
                    {chapter === 1 &&
                      "✓ You recognize the chaos of monolithic components without boundaries"}
                    {chapter === 2 &&
                      "✓ You can break complex UIs into composable components with props"}
                    {chapter === 3 &&
                      "✓ You can compare component isolation vs. monolithic entanglement"}
                    {chapter === 4 &&
                      "✓ You understand how callback props enable component communication"}
                  </p>
                </div>
              </div>

              {/* Key insights */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 sm:p-6">
                <h3 className="mb-4 text-lg font-semibold text-amber-500">
                  Key Insights
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-2 w-2 rounded-full bg-cyan-500"></div>
                    <p className="text-sm">
                      Components create{" "}
                      <span className="text-cyan-400">isolated worlds</span>{" "}
                      with clear boundaries
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                    <p className="text-sm">
                      Props define the{" "}
                      <span className="text-green-400">interface</span> between
                      components
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-2 w-2 rounded-full bg-amber-500"></div>
                    <p className="text-sm">
                      Monolithic components cause{" "}
                      <span className="text-amber-400">state leakage</span> and
                      unpredictable bugs
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                    <p className="text-sm">
                      Callback props enable{" "}
                      <span className="text-blue-400">clean communication</span>{" "}
                      between components
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
