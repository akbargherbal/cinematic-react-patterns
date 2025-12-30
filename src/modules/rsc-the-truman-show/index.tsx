import { useState, useEffect, useRef } from "react";
import { Server, Sun, Film, Zap, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
}

// Server Component examples
const serverComponentExample = `// Server Component - Rendered on Server
// Zero JavaScript sent to client
export default async function SeahavenBackground() {
  // Can access databases, APIs, filesystem
  const weather = await fetchWeather();
  const news = await fetchHeadlines();
  
  return (
    <div className="seahaven-scene">
      <Sky timeOfDay="morning" />
      <Buildings count={42} />
      <BackgroundActors />
      <WeatherReport data={weather} />
      <NewsStand headlines={news} />
    </div>
  );
}`;

// Client Component example
const clientComponentExample = `// Client Component - Interactive parts
"use client";
import { useState } from "react";

export default function TrumansCar() {
  const [speed, setSpeed] = useState(0);
  const [radioOn, setRadioOn] = useState(false);
  
  return (
    <div className="car">
      <Speedometer value={speed} />
      <button onClick={() => setSpeed(s => s + 10)}>
        Accelerate
      </button>
      <Radio isOn={radioOn} toggle={() => setRadioOn(!radioOn)} />
    </div>
  );
}`;

// Anti-pattern: Everything client-side
const antiPatternExample = `// ❌ ANTI-PATTERN: Everything is "use client"
"use client"; // This applies to whole file

import { useState, useEffect } from "react";

// Buildings with unnecessary interactivity
export default function Building({ id }) {
  const [lightsOn, setLightsOn] = useState(false);
  const [occupants, setOccupants] = useState(0);
  
  useEffect(() => {
    // Complex logic for each building
    fetchOccupants(id).then(setOccupants);
  }, [id]);
  
  return (
    <div onClick={() => setLightsOn(!lightsOn)}>
      <Window lightsOn={lightsOn} />
      <span>{occupants} simulated people</span>
    </div>
  );
}

// Background actor with full script
export function BackgroundActor({ name }) {
  const [mood, setMood] = useState("happy");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Animation loop for each actor
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(p => ({ ...p, x: p.x + 1 }));
    }, 100);
    return () => clearInterval(interval);
  }, []);
  
  return <div style={{ left: position.x }}>{name}</div>;
}`;

export default function RSCTheTrumanShow(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [bundleSize, setBundleSize] = useState<number>(0.1); // MB
  const [interactionTime, setInteractionTime] = useState<number>(100); // ms
  const [simulationMode, setSimulationMode] = useState<"optimal" | "bloated">("optimal");
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [isDoorStuck, setIsDoorStuck] = useState<boolean>(false);
  const [doorAttempts, setDoorAttempts] = useState<number>(0);
  
  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const chapters: Chapter[] = [
    {
      title: "A Perfectly Rendered Morning",
      content: `The light that hits Seahaven Island is born in darkness, 240,000 miles away. It begins not as fusion, but as a command. Inside the lunar control room, a cavern of cold, blue light and humming servers, Christof raises a single finger. "Cue the sun," he says. His team doesn't build pieces for Truman to assemble. They build the entire reality. The houses are placed, the trees are rendered, the extras are given their morning paths. All of it is composed here, in the silent vacuum of space, before being broadcast as a finished, seamless whole. Down below, Truman Burbank steps out into that perfect light. His walk to work is a symphony of flawless execution. The world is fast, rich, and responsive because the vast majority of it arrived fully formed—a beautiful, static image with no assembly required.`
    },
    {
      title: "The Lagging Prop Department",
      content: `Christof is away. A young director named Simon pitches his "Total Immersion" initiative. "Let's make everything interactive! Every person, every car, every stray dog should have a full, dynamic script. Let's ship the entire production's logic down to the set!" The change is immediate and catastrophic. In the control room, a massive monitor tracking the Seahaven broadcast signal surges into solid red. "Signal overload! We're trying to push ten thousand times the normal data load!" For Truman, the world begins to fray. Mrs. Gable is frozen mid-spritz. A bicycle flickers in and out of existence. He reaches his office building and pulls on the large glass door. Nothing happens. For a full, agonizing two seconds, the door remains inert. Then, with a sudden jolt, it swings open. Truman stumbles inside, a profound sense of unease washing over him. The world feels heavy, slow, like it's struggling to keep up.`
    },
    {
      title: "The Director's Cut",
      content: `Christof returns to a war room. Alarms blare, technicians shout. He slams his hand on the console. "What have you done? You're sending the whole library when he only needs a single line! The world is built here. It is rendered, complete, before it ever reaches him." He points to a monitor. "She doesn't need a script! She just needs to be there. She is scenery." Then, the architect takes command. "Kill all interactive scripts on non-essential assets. Now. The background players, the vehicles, the buildings—strip them. They are Server Components. They exist only as part of the rendered image we send down." The team flies into action. With every command, a section of red on the bandwidth monitor vanishes, replaced by cool, clean green. Down in Seahaven, Truman reaches for the office door handle, bracing himself for the lag. But the moment his hand makes contact, it swings open smoothly, silently. The world is crisp, immediate, and weightless once more.`
    },
    {
      title: "The Two Blueprints",
      content: `Christof calls Simon to a private viewing room. Two massive screens hang side-by-side. On the left, labeled "Total Immersion," footage from the glitch plays. Next to the video, a telemetry graph shows a colossal, sustained data spike. Every step Truman takes causes the graph to tremble. They watch the agonizing two-second delay. "This is your world," Christof says. "Every single prop is screaming for attention. The signal is choked with noise." On the right screen, labeled "Architect's Cut," footage from after the fix plays. The telemetry graph is almost flat—a thin, serene green line. It remains perfectly calm as Truman passes houses, trees, and background actors. Only when his hand touches the office doorknob does a tiny, instantaneous blip appear. "Look," Christof says. "The world is silent. It arrives fully rendered. We do all the work up here. We only send an instruction to the one element he needs to interact with." The difference is not just technical; it's philosophical.`
    },
    {
      title: "The View from the Moon",
      content: `The next cycle begins. Christof stands before the main console, a lone figure in the vast, quiet control room. Below him, Seahaven awakens under another perfect, server-rendered sunrise. The hum of the machines is a gentle, reassuring thrum—the sound of a powerful system operating with effortless grace. He watches Truman emerge, smiling and carefree, into a world that is once again fast, beautiful, and utterly convincing. The user is happy. The experience is seamless. Christof thinks of the core principle, the architectural truth: The user doesn't need to know about the machinery. They shouldn't have to bear its weight. "Do the heavy lifting up here," he murmurs, "so all he experiences is life." The camera pulls back until the entire lunar control room is just a small, glowing dome on the surface of the moon. And far below, suspended in the velvet blackness, is the tiny, perfect world of Seahaven—a complete, beautiful image delivered from a powerful, distant server.`
    }
  ];

  // Simulate the bloated bundle effect
  useEffect(() => {
    if (simulationMode === "bloated") {
      // Add "leaked" timers to simulate heavy client-side processing
      const timer = setInterval(() => {
        setLeakedTimers(l => {
          const newCount = l + 1;
          if (newCount >= 50) {
            resetSimulation(); // Circuit breaker
            return 0;
          }
          return newCount;
        });
      }, 500);

      // Update bundle size and interaction time for bloated mode
      setBundleSize(10.4); // MB - represents massive bundle
      setInteractionTime(2000); // ms - 2 second delay
      setIsDoorStuck(true);

      return () => {
        if (timer) clearInterval(timer);
      };
    } else {
      // Optimal mode
      setBundleSize(0.8); // MB - small bundle
      setInteractionTime(100); // ms - fast interaction
      setIsDoorStuck(false);
      setLeakedTimers(0);
    }
  }, [simulationMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, []);

  const resetSimulation = () => {
    setBundleSize(0.1);
    setInteractionTime(100);
    setLeakedTimers(0);
    setIsDoorStuck(false);
    setDoorAttempts(0);
    setSimulationMode("optimal");
  };

  const simulateDoorAttempt = () => {
    setDoorAttempts(a => a + 1);
    if (simulationMode === "bloated") {
      setIsDoorStuck(true);
      setTimeout(() => {
        setIsDoorStuck(false);
      }, 2000);
    }
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 p-4 md:p-8 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center justify-between gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Film className="text-amber-500 w-8 h-8" />
              <h1 className="text-2xl md:text-3xl font-bold">The Truman Show</h1>
            </div>
            <p className="text-sm md:text-base text-slate-400">
              Fiction • Truman Burbank • 1998
            </p>
          </div>
          <p className="text-base md:text-lg text-amber-500 font-medium">
            Server Components (RSC)
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto mt-8">
        {/* Chapter Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-amber-100">
            {currentChapter.title}
          </h2>
          <p className="leading-relaxed text-slate-300">{currentChapter.content}</p>
        </div>

        {/* Interactive Demo Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Server Side (Left) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Server className="text-blue-400 w-6 h-6" />
                <h3 className="text-xl font-semibold text-blue-300">Control Room (Server)</h3>
              </div>
              
              {/* Code Examples based on chapter */}
              {chapter === 0 && (
                <CodeBlock
                  code={serverComponentExample}
                  variant="default"
                  title="// Server Component - Rendered Before Broadcast"
                  defaultExpanded={true}
                  language="tsx"
                />
              )}
              
              {chapter === 1 && (
                <CodeBlock
                  code={antiPatternExample}
                  variant="error"
                  title="// ❌ ANTI-PATTERN: Everything is 'use client'"
                  defaultExpanded={true}
                  language="tsx"
                />
              )}
              
              {(chapter === 2 || chapter === 3) && (
                <div className="space-y-4">
                  <CodeBlock
                    code={serverComponentExample}
                    variant="success"
                    title="// ✅ Server Components (Static Scenery)"
                    defaultExpanded={true}
                    language="tsx"
                  />
                  <CodeBlock
                    code={clientComponentExample}
                    variant="default"
                    title="// Client Components (Interactive Props)"
                    defaultExpanded={true}
                    language="tsx"
                  />
                </div>
              )}
              
              {chapter === 4 && (
                <CodeBlock
                  code={serverComponentExample}
                  variant="success"
                  title="// ✅ Architecture: Heavy Lifting on Server"
                  defaultExpanded={true}
                  language="tsx"
                />
              )}
            </div>

            {/* Simulation Controls */}
            <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="text-amber-500 w-5 h-5" />
                Simulation Controls
              </h4>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <button
                  onClick={() => setSimulationMode("optimal")}
                  className={`px-4 py-2 rounded-lg transition-all ${simulationMode === "optimal" ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                >
                  <CheckCircle className="inline w-4 h-4 mr-2" />
                  Optimal Architecture
                </button>
                <button
                  onClick={() => setSimulationMode("bloated")}
                  className={`px-4 py-2 rounded-lg transition-all ${simulationMode === "bloated" ? "bg-red-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                >
                  <AlertTriangle className="inline w-4 h-4 mr-2" />
                  Bloated Bundle
                </button>
                <button
                  onClick={resetSimulation}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
                >
                  <RefreshCw className="inline w-4 h-4 mr-2" />
                  Reset Simulation
                </button>
              </div>

              {/* Telemetry */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Bundle Size</div>
                  <div className={`text-2xl font-bold ${bundleSize > 5 ? "text-red-400" : "text-emerald-400"}`}>
                    {bundleSize.toFixed(1)} MB
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Interaction Time</div>
                  <div className={`text-2xl font-bold ${interactionTime > 1000 ? "text-red-400" : "text-emerald-400"}`}>
                    {interactionTime}ms
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Leaked Timers</div>
                  <div className={`text-2xl font-bold ${leakedTimers > 10 ? "text-red-400" : "text-slate-300"}`}>
                    {leakedTimers}
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="text-sm text-slate-400">Door Attempts</div>
                  <div className="text-2xl font-bold text-amber-400">{doorAttempts}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Client Side (Right) */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-amber-950/40 to-amber-900/20 border border-amber-700/30 rounded-xl p-6 h-full">
              <div className="flex items-center gap-3 mb-6">
                <Sun className="text-amber-400 w-6 h-6" />
                <h3 className="text-xl font-semibold text-amber-300">Seahaven (Client)</h3>
              </div>
              
              {/* Interactive Scene */}
              <div className="space-y-6">
                <div className="bg-amber-900/20 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-amber-300">Office Building Door</span>
                    <span className={`text-xs px-2 py-1 rounded ${isDoorStuck ? "bg-red-900/50 text-red-300" : "bg-emerald-900/50 text-emerald-300"}`}>
                      {isDoorStuck ? "STUCK" : "RESPONSIVE"}
                    </span>
                  </div>
                  <button
                    onClick={simulateDoorAttempt}
                    disabled={isDoorStuck}
                    className={`w-full py-3 rounded-lg transition-all ${isDoorStuck ? "bg-red-800/50 text-red-300 cursor-not-allowed" : "bg-amber-700 hover:bg-amber-600 text-white"}`}
                  >
                    {isDoorStuck ? "⏳ Door Unresponsive..." : "🚪 Open Door"}
                  </button>
                  <div className="mt-2 text-sm text-amber-400/70">
                    {simulationMode === "bloated" 
                      ? "2-second delay due to bloated bundle" 
                      : "Instant response with server rendering"}
                  </div>
                </div>

                {/* World Status */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300">Background Actors</span>
                    <span className={simulationMode === "bloated" ? "text-red-400" : "text-emerald-400"}>
                      {simulationMode === "bloated" ? "❌ Scripted (Heavy)" : "✅ Server-Rendered (Light)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300">Buildings & Scenery</span>
                    <span className={simulationMode === "bloated" ? "text-red-400" : "text-emerald-400"}>
                      {simulationMode === "bloated" ? "❌ Interactive (Slow)" : "✅ Static (Fast)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300">Weather & News</span>
                    <span className="text-emerald-400">✅ Server-Fetched</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-amber-300">Truman's Car</span>
                    <span className="text-blue-400">🚗 Client Component</span>
                  </div>
                </div>

                {/* Performance Indicator */}
                <div className="mt-8 p-4 bg-slate-900/40 rounded-lg">
                  <div className="text-sm text-slate-400 mb-2">User Experience Rating</div>
                  <div className={`text-2xl font-bold ${simulationMode === "bloated" ? "text-red-400" : "text-emerald-400"}`}>
                    {simulationMode === "bloated" ? "FRUSTRATING" : "SEAMLESS"}
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${simulationMode === "bloated" ? "bg-red-500 w-1/4" : "bg-emerald-500 w-full"}`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex justify-between items-center mt-8 md:mt-12 p-4 bg-slate-900/40 rounded-xl">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-6 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            ← Previous
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-sm text-slate-400 mb-1">Progress</span>
            <div className="flex items-center gap-4">
              <span className="font-mono text-amber-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            Next →
          </button>
        </nav>
      </main>
    </div>
  );
}