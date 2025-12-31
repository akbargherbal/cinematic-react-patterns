import { useState, useEffect, useRef, useMemo } from "react";
import { FlaskConical, Timer, Check, X, Zap, BookOpen } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  title: string;
  content: string;
}

interface FamilyBusiness {
  id: string;
  name: string;
  status: string;
  lastUpdated: number;
}

export default function GodfatherBatchingRequests(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [protocolMode, setProtocolMode] = useState<"old" | "new">("new");
  const [familyBusiness, setFamilyBusiness] = useState<FamilyBusiness[]>([
    { id: "justice", name: "Bonasera's Justice", status: "pending", lastUpdated: 0 },
    { id: "citizenship", name: "Nazorine's Citizenship", status: "pending", lastUpdated: 0 },
    { id: "shipment", name: "Luca's Shipment", status: "idle", lastUpdated: 0 },
  ]);
  const [activeRequests, setActiveRequests] = useState<string[]>([]);
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  
  const timerRefs = useRef<number[]>([]);
  const [animationParent] = useAutoAnimate();
  
  // Track renders for demonstration
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });
  
  // Cleanup all timers on unmount or reset
  useEffect(() => {
    return () => {
      timerRefs.current.forEach(timer => clearTimeout(timer));
      timerRefs.current = [];
    };
  }, []);
  
  // Circuit breaker - reset if too many renders
  useEffect(() => {
    if (renderCount > 100) {
      resetAll();
    }
  }, [renderCount]);
  
  const chapters: Chapter[] = [
    {
      title: "The Day of the Wedding",
      content: "Outside, the world is a riot of life. Laughter spills over the sound of a mandolin, and sunlight drapes the Corleone family garden in a golden haze. It is the day of Connie Corleone's wedding. But inside, in the cool darkness of Don Vito Corleone's office, another world exists. Amerigo Bonasera stands before the Don, asking for justice. Then Nazorine the baker enters, requesting help with citizenship. The Don hears both requests but makes no immediate decisions. On the day of his daughter's wedding, the Don hears all favors. But he renders judgment only once."
    },
    {
      title: "The Midnight Phone Calls",
      content: "Months later, junior Capo Luca oversees a critical shipment. At 1 a.m., he calls: 'The shipment is ready to move.' The Don is disturbed. Thirty minutes later: 'Police roadblock.' Another disturbance. An hour later: 'Alternate route clear.' A third disturbance. The next day, the Don summons Luca. 'Three calls, Luca? You disturbed my sleep three times for one problem. Why not one conversation?' Each call forced a separate reaction. Each showed an incomplete picture."
    },
    {
      title: "The New Protocol",
      content: "Tom Hagen announces a new protocol. 'From now on, you gather all information. You wait for all answers. Then, you come to us once.' Luca faces a complex situation. He gets three pieces of information: asset in position, payment cleared, target schedule confirmed. The old Luca would have made three frantic calls. The new Luca waits, gathers everything, then delivers one report. The Don reads it, nods once. One interruption. One decision. This is automatic batching."
    },
    {
      title: "Two Arrangements",
      content: "Tom Hagen gives a final lesson. Luca's safe house arrangement: three calls for location, staff, and car—three disturbances. Clemenza's arrangement: one meeting with all details—one update. 'You made the Don render a judgment three times. Clemenza asked for one. That is the difference between a soldier who reacts and a leader who plans.' React prefers the Clemenza way: batched updates for performance."
    },
    {
      title: "A Matter of Respect",
      content: "The Don reflects. 'It's about respect. When a man comes to me, he shows respect by being prepared. He doesn't waste my time with pieces of a problem.' Suddenly, Sonny bursts in: 'Emergency! Sollozzo's men are at the Genco building right now!' This demands immediate action—no time for batching. Later, Tom explains: 'The protocol is for building the future. But emergencies require immediate decisions. You can bypass the protocol, but only when the cost is worth it.'"
    }
  ];
  
  // Code examples
  const synchronousBatchingCode = `// ✅ Wedding Day Protocol (Synchronous Batching)
function handleWeddingRequests() {
  // Multiple updates in same event handler
  setJustice(true);
  setCitizenship('approved');
  // React batches these - only ONE render
}`;

  const asyncAntiPatternCode = `// ❌ Midnight Calls (Async Anti-Pattern - React 17)
function handleMidnightCalls() {
  setTimeout(() => {
    setShipmentStatus('moving');  // Render #1
  }, 0);
  
  setTimeout(() => {
    setRoute('alternate');        // Render #2
  }, 30);
  
  setTimeout(() => {
    setBlockade(false);           // Render #3
  }, 60);
}`;

  const automaticBatchingCode = `// ✅ New Protocol (Automatic Batching - React 18+)
async function handleNewProtocol() {
  // All async updates batched together
  await Promise.all([
    setAssetLocation('in_place'),
    setPaymentStatus('cleared'),
    setTargetSchedule('confirmed')
  ]);
  // Only ONE render, even though async
}`;

  const flushSyncCode = `// ⚠️ Emergency Bypass (flushSync)
import { flushSync } from 'react-dom';

function handleEmergency() {
  // Normal batched update
  setLocation('123 Elm');
  setStaff(['cook', 'guard']);
  
  // Emergency - force immediate render
  flushSync(() => {
    setEmergency(true); // Renders NOW
  });
  
  setCar('ready'); // Continues batching
}`;

  // Demo functions
  const handleWeddingDay = () => {
    // Simulate synchronous batching
    setFamilyBusiness(prev => prev.map(biz => 
      biz.id === "justice" || biz.id === "citizenship" 
        ? { ...biz, status: "approved", lastUpdated: Date.now() }
        : biz
    ));
    setActiveRequests(["justice", "citizenship"]);
  };

  const handleMidnightCalls = () => {
    if (protocolMode === "old") {
      // Old way - separate renders
      const timer1 = window.setTimeout(() => {
        setFamilyBusiness(prev => prev.map(biz => 
          biz.id === "shipment" 
            ? { ...biz, status: "moving", lastUpdated: Date.now() }
            : biz
        ));
        setActiveRequests(prev => [...prev, "shipment-moving"]);
      }, 0);
      
      const timer2 = window.setTimeout(() => {
        setFamilyBusiness(prev => prev.map(biz => 
          biz.id === "shipment" 
            ? { ...biz, status: "blocked", lastUpdated: Date.now() }
            : biz
        ));
        setActiveRequests(prev => [...prev, "shipment-blocked"]);
      }, 500);
      
      const timer3 = window.setTimeout(() => {
        setFamilyBusiness(prev => prev.map(biz => 
          biz.id === "shipment" 
            ? { ...biz, status: "delivered", lastUpdated: Date.now() }
            : biz
        ));
        setActiveRequests(prev => [...prev, "shipment-delivered"]);
      }, 1000);
      
      timerRefs.current.push(timer1, timer2, timer3);
    } else {
      // New way - batched
      Promise.all([
        new Promise(resolve => setTimeout(resolve, 0)),
        new Promise(resolve => setTimeout(resolve, 500)),
        new Promise(resolve => setTimeout(resolve, 1000))
      ]).then(() => {
        setFamilyBusiness(prev => prev.map(biz => 
          biz.id === "shipment" 
            ? { ...biz, status: "delivered", lastUpdated: Date.now() }
            : biz
        ));
        setActiveRequests(["shipment-complete"]);
      });
    }
  };

  const handleEmergency = () => {
    setIsEmergency(true);
    setActiveRequests(["emergency"]);
    
    // Auto-reset after 2 seconds
    setTimeout(() => {
      setIsEmergency(false);
      setActiveRequests([]);
    }, 2000);
  };

  const resetAll = () => {
    setFamilyBusiness([
      { id: "justice", name: "Bonasera's Justice", status: "pending", lastUpdated: 0 },
      { id: "citizenship", name: "Nazorine's Citizenship", status: "pending", lastUpdated: 0 },
      { id: "shipment", name: "Luca's Shipment", status: "idle", lastUpdated: 0 },
    ]);
    setActiveRequests([]);
    setIsEmergency(false);
    timerRefs.current.forEach(timer => clearTimeout(timer));
    timerRefs.current = [];
  };

  const currentChapter = chapters[chapter];
  const businessComplete = familyBusiness.every(biz => biz.status !== "pending" && biz.status !== "idle");

  return (
    <div className="min-h-screen bg-stone-950 text-stone-300 font-serif p-4 md:p-8">
      {/* Header */}
      <header className="border-b border-stone-800 bg-stone-950/80 backdrop-blur-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4 md:gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-2 md:gap-3">
              <FlaskConical className="text-red-500 w-6 h-6 md:w-8 md:h-8" />
              <h1 className="text-xl md:text-3xl font-bold">The Godfather</h1>
            </div>
            <p className="text-xs md:text-base text-stone-400">
              Vito Corleone • 1972
            </p>
          </div>
          <p className="text-sm md:text-lg text-red-500 font-medium">
            Batching and Automatic Batching
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Main Content - 7 columns on desktop */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8">
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-3xl font-bold m-0">{currentChapter.title}</h2>
              <span className="text-sm opacity-60 font-mono tabular-nums">
                Chapter {chapter + 1} of {chapters.length}
              </span>
            </div>
            <p className="leading-relaxed text-base md:text-lg">{currentChapter.content}</p>
          </div>

          {/* Interactive Demo Section */}
          <section className="bg-stone-900/50 border border-stone-700 rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-500" />
                Family Business Dashboard
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm opacity-60 font-mono tabular-nums">
                  Renders: {renderCount}
                </span>
                <button
                  onClick={resetAll}
                  className="px-3 py-1 text-xs bg-stone-800 hover:bg-stone-700 rounded transition-colors"
                >
                  Reset All
                </button>
              </div>
            </div>

            {/* Protocol Toggle - Only show in chapters 2-4 */}
            {(chapter >= 1 && chapter <= 3) && (
              <div className="mb-6 p-4 bg-stone-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Protocol Mode</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${protocolMode === "old" ? "text-red-400" : "text-stone-400"}`}>
                      Old Way (React 17)
                    </span>
                    <button
                      onClick={() => setProtocolMode(prev => prev === "old" ? "new" : "old")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${protocolMode === "new" ? "bg-red-600" : "bg-stone-700"}`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${protocolMode === "new" ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                    <span className={`text-sm ${protocolMode === "new" ? "text-green-400" : "text-stone-400"}`}>
                      New Way (React 18+)
                    </span>
                  </div>
                </div>
                <div className="text-sm text-stone-400">
                  {protocolMode === "old" 
                    ? "❌ Each update causes separate render (inefficient)" 
                    : "✅ All updates batched into single render (efficient)"}
                </div>
              </div>
            )}

            {/* Business Status */}
            <div ref={animationParent} className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-6">
              {familyBusiness.map(business => (
                <div 
                  key={business.id}
                  className={`p-3 md:p-4 rounded-lg border ${business.status === "pending" || business.status === "idle" 
                    ? "border-stone-700 bg-stone-800/30" 
                    : "border-red-500/50 bg-red-950/20"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm md:text-base">{business.name}</span>
                    {business.status !== "pending" && business.status !== "idle" ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Timer className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                  <div className="text-xs md:text-sm opacity-75 capitalize">{business.status}</div>
                  {business.lastUpdated > 0 && (
                    <div className="text-xs opacity-50 font-mono mt-1">
                      Updated: {new Date(business.lastUpdated).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' })}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Demo Controls */}
            <div className="space-y-4">
              {chapter === 0 && (
                <div className="space-y-4">
                  <button
                    onClick={handleWeddingDay}
                    disabled={activeRequests.includes("justice")}
                    className="w-full px-4 py-3 bg-red-700 hover:bg-red-600 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Process Wedding Day Requests
                  </button>
                  <CodeBlock
                    code={synchronousBatchingCode}
                    variant="success"
                    title="// ✅ Synchronous Batching (Wedding Day Protocol)"
                    defaultExpanded={true}
                  />
                </div>
              )}

              {(chapter === 1 || chapter === 2) && (
                <div className="space-y-4">
                  <button
                    onClick={handleMidnightCalls}
                    disabled={familyBusiness[2].status === "delivered"}
                    className="w-full px-4 py-3 bg-amber-700 hover:bg-amber-600 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    Handle Shipment Updates ({protocolMode === "old" ? "3 Separate Calls" : "Single Report"})
                  </button>
                  <CodeBlock
                    code={protocolMode === "old" ? asyncAntiPatternCode : automaticBatchingCode}
                    variant={protocolMode === "old" ? "error" : "success"}
                    title={protocolMode === "old" 
                      ? "// ❌ Async Anti-Pattern (Midnight Calls)" 
                      : "// ✅ Automatic Batching (New Protocol)"}
                    defaultExpanded={true}
                  />
                </div>
              )}

              {chapter === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setProtocolMode("old");
                        setTimeout(handleMidnightCalls, 100);
                      }}
                      className="px-4 py-3 bg-stone-700 hover:bg-stone-600 text-white rounded-lg transition-colors"
                    >
                      Luca's Way (3 Renders)
                    </button>
                    <button
                      onClick={() => {
                        setProtocolMode("new");
                        setTimeout(handleMidnightCalls, 100);
                      }}
                      className="px-4 py-3 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      Clemenza's Way (1 Render)
                    </button>
                  </div>
                  <div className="text-center text-sm opacity-75">
                    Compare the render count difference
                  </div>
                </div>
              )}

              {chapter === 4 && (
                <div className="space-y-4">
                  <button
                    onClick={handleEmergency}
                    disabled={isEmergency}
                    className="w-full px-4 py-3 bg-red-800 hover:bg-red-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    🚨 Emergency: Bypass Protocol (flushSync)
                  </button>
                  {isEmergency && (
                    <div className="p-3 bg-red-950/50 border border-red-500 rounded-lg animate-pulse">
                      <div className="flex items-center justify-center gap-2">
                        <X className="w-5 h-5 text-red-500" />
                        <span className="font-medium">Protocol Bypassed - Immediate Render Forced</span>
                      </div>
                    </div>
                  )}
                  <CodeBlock
                    code={flushSyncCode}
                    variant="default"
                    title="// ⚠️ Emergency Bypass (flushSync)"
                    defaultExpanded={true}
                  />
                </div>
              )}
            </div>

            {/* Active Requests */}
            {activeRequests.length > 0 && (
              <div className="mt-6 p-3 bg-stone-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium">Active Requests</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeRequests.map((req, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-stone-700 rounded text-xs font-mono"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Navigation */}
          <nav className="flex justify-between items-center">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="px-4 md:px-6 py-2 md:py-3 bg-stone-800 hover:bg-stone-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              ← Previous
            </button>
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-sm opacity-60 font-mono tabular-nums">
                Render Count: {renderCount}
              </div>
              <div className="w-32 md:w-48 bg-stone-800 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                />
              </div>
            </div>
            <button
              onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
              disabled={chapter === chapters.length - 1}
              className="px-4 md:px-6 py-2 md:py-3 bg-red-700 hover:bg-red-600 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              Next →
            </button>
          </nav>
        </div>

        {/* Sidebar - 5 columns on desktop */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-8 space-y-6">
            {/* Protocol Status */}
            <div className="bg-stone-900/50 border border-stone-700 rounded-xl p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-red-500" />
                Protocol Status
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Current Protocol</span>
                    <span className={`text-sm font-medium ${protocolMode === "new" ? "text-green-500" : "text-amber-500"}`}>
                      {protocolMode === "new" ? "Automatic Batching" : "Legacy (No Batching)"}
                    </span>
                  </div>
                  <div className="w-full bg-stone-800 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${protocolMode === "new" ? "bg-green-500" : "bg-amber-500"}`}
                      style={{ width: protocolMode === "new" ? "100%" : "30%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Render Efficiency</span>
                    <span className="text-sm font-medium text-red-500">
                      {businessComplete ? "100%" : "0%"}
                    </span>
                  </div>
                  <div className="w-full bg-stone-800 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: businessComplete ? "100%" : "0%" }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-700">
                  <h4 className="text-sm font-medium mb-2">Key Metrics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-stone-800/50 rounded">
                      <div className="text-2xl font-bold text-red-500 font-mono tabular-nums">{renderCount}</div>
                      <div className="text-xs opacity-75">Total Renders</div>
                    </div>
                    <div className="p-3 bg-stone-800/50 rounded">
                      <div className="text-2xl font-bold text-green-500 font-mono tabular-nums">
                        {familyBusiness.filter(b => b.status !== "pending" && b.status !== "idle").length}
                      </div>
                      <div className="text-xs opacity-75">Completed Requests</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metaphor Guide */}
            <div className="bg-stone-900/50 border border-stone-700 rounded-xl p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-4">The Family Metaphor</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-red-500 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Don Corleone</div>
                    <div className="text-sm opacity-75">React Renderer (makes final UI updates)</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-amber-500 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Tom Hagen</div>
                    <div className="text-sm opacity-75">React Scheduler (queues updates)</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-green-500 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Wedding Day</div>
                    <div className="text-sm opacity-75">Synchronous Event Handler (batched)</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-red-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Midnight Calls</div>
                    <div className="text-sm opacity-75">Async Updates (historically unbatched)</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Emergency Entry</div>
                    <div className="text-sm opacity-75">flushSync() (bypass batching)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Checkpoint */}
            <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Check className="w-5 h-5" />
                You Now Understand
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <span>Synchronous updates are automatically batched</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span>React 17 didn't batch async updates (inefficient)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-green-500 flex-shrink-0" />
                  <span>React 18+ batches ALL updates automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                  <span>flushSync() forces immediate render when needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}