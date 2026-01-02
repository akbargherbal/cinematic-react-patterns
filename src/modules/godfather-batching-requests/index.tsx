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
    {
      id: "justice",
      name: "Bonasera's Justice",
      status: "pending",
      lastUpdated: 0,
    },
    {
      id: "citizenship",
      name: "Nazorine's Citizenship",
      status: "pending",
      lastUpdated: 0,
    },
    { id: "shipment", name: "Luca's Shipment", status: "idle", lastUpdated: 0 },
  ]);
  const [activeRequests, setActiveRequests] = useState<string[]>([]);
  const [isEmergency, setIsEmergency] = useState<boolean>(false);

  const timerRefs = useRef<number[]>([]);
  const [animationParent] = useAutoAnimate();

  // Track renders for demonstration
  useEffect(() => {
    setRenderCount((prev) => prev + 1);
  });

  // Cleanup all timers on unmount or reset
  useEffect(() => {
    return () => {
      timerRefs.current.forEach((timer) => clearTimeout(timer));
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
      content:
        "Outside, the world is a riot of life. Laughter spills over the sound of a mandolin, and sunlight drapes the Corleone family garden in a golden haze. It is the day of Connie Corleone's wedding. But inside, in the cool darkness of Don Vito Corleone's office, another world exists. Amerigo Bonasera stands before the Don, asking for justice. Then Nazorine the baker enters, requesting help with citizenship. The Don hears both requests but makes no immediate decisions. On the day of his daughter's wedding, the Don hears all favors. But he renders judgment only once.",
    },
    {
      title: "The Midnight Phone Calls",
      content:
        "Months later, junior Capo Luca oversees a critical shipment. At 1 a.m., he calls: 'The shipment is ready to move.' The Don is disturbed. Thirty minutes later: 'Police roadblock.' Another disturbance. An hour later: 'Alternate route clear.' A third disturbance. The next day, the Don summons Luca. 'Three calls, Luca? You disturbed my sleep three times for one problem. Why not one conversation?' Each call forced a separate reaction. Each showed an incomplete picture.",
    },
    {
      title: "The New Protocol",
      content:
        "Tom Hagen announces a new protocol. 'From now on, you gather all information. You wait for all answers. Then, you come to us once.' Luca faces a complex situation. He gets three pieces of information: asset in position, payment cleared, target schedule confirmed. The old Luca would have made three frantic calls. The new Luca waits, gathers everything, then delivers one report. The Don reads it, nods once. One interruption. One decision. This is automatic batching.",
    },
    {
      title: "Two Arrangements",
      content:
        "Tom Hagen gives a final lesson. Luca's safe house arrangement: three calls for location, staff, and car—three disturbances. Clemenza's arrangement: one meeting with all details—one update. 'You made the Don render a judgment three times. Clemenza asked for one. That is the difference between a soldier who reacts and a leader who plans.' React prefers the Clemenza way: batched updates for performance.",
    },
    {
      title: "A Matter of Respect",
      content:
        "The Don reflects. 'It's about respect. When a man comes to me, he shows respect by being prepared. He doesn't waste my time with pieces of a problem.' Suddenly, Sonny bursts in: 'Emergency! Sollozzo's men are at the Genco building right now!' This demands immediate action—no time for batching. Later, Tom explains: 'The protocol is for building the future. But emergencies require immediate decisions. You can bypass the protocol, but only when the cost is worth it.'",
    },
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
    setFamilyBusiness((prev) =>
      prev.map((biz) =>
        biz.id === "justice" || biz.id === "citizenship"
          ? { ...biz, status: "approved", lastUpdated: Date.now() }
          : biz,
      ),
    );
    setActiveRequests(["justice", "citizenship"]);
  };

  const handleMidnightCalls = () => {
    if (protocolMode === "old") {
      // Old way - separate renders
      const timer1 = window.setTimeout(() => {
        setFamilyBusiness((prev) =>
          prev.map((biz) =>
            biz.id === "shipment"
              ? { ...biz, status: "moving", lastUpdated: Date.now() }
              : biz,
          ),
        );
        setActiveRequests((prev) => [...prev, "shipment-moving"]);
      }, 0);

      const timer2 = window.setTimeout(() => {
        setFamilyBusiness((prev) =>
          prev.map((biz) =>
            biz.id === "shipment"
              ? { ...biz, status: "blocked", lastUpdated: Date.now() }
              : biz,
          ),
        );
        setActiveRequests((prev) => [...prev, "shipment-blocked"]);
      }, 500);

      const timer3 = window.setTimeout(() => {
        setFamilyBusiness((prev) =>
          prev.map((biz) =>
            biz.id === "shipment"
              ? { ...biz, status: "delivered", lastUpdated: Date.now() }
              : biz,
          ),
        );
        setActiveRequests((prev) => [...prev, "shipment-delivered"]);
      }, 1000);

      timerRefs.current.push(timer1, timer2, timer3);
    } else {
      // New way - batched
      Promise.all([
        new Promise((resolve) => setTimeout(resolve, 0)),
        new Promise((resolve) => setTimeout(resolve, 500)),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]).then(() => {
        setFamilyBusiness((prev) =>
          prev.map((biz) =>
            biz.id === "shipment"
              ? { ...biz, status: "delivered", lastUpdated: Date.now() }
              : biz,
          ),
        );
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
      {
        id: "justice",
        name: "Bonasera's Justice",
        status: "pending",
        lastUpdated: 0,
      },
      {
        id: "citizenship",
        name: "Nazorine's Citizenship",
        status: "pending",
        lastUpdated: 0,
      },
      {
        id: "shipment",
        name: "Luca's Shipment",
        status: "idle",
        lastUpdated: 0,
      },
    ]);
    setActiveRequests([]);
    setIsEmergency(false);
    timerRefs.current.forEach((timer) => clearTimeout(timer));
    timerRefs.current = [];
  };

  const currentChapter = chapters[chapter];
  const businessComplete = familyBusiness.every(
    (biz) => biz.status !== "pending" && biz.status !== "idle",
  );

  return (
    <div className="min-h-screen bg-stone-950 p-4 font-serif text-stone-300 md:p-8">
      {/* Header */}
      <header className="mb-8 border-b border-stone-800 bg-stone-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3">
              <FlaskConical className="h-6 w-6 text-red-500 md:h-8 md:w-8" />
              <h1 className="text-xl font-bold md:text-3xl">The Godfather</h1>
            </div>
            <p className="text-xs text-stone-400 md:text-base">
              Vito Corleone • 1972
            </p>
          </div>
          <p className="text-sm font-medium text-red-500 md:text-lg">
            Batching and Automatic Batching
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12">
        {/* Main Content - 7 columns on desktop */}
        <div className="space-y-6 md:space-y-8 lg:col-span-7">
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="m-0 text-xl font-bold md:text-3xl">
                {currentChapter.title}
              </h2>
              <span className="font-mono text-sm tabular-nums opacity-60">
                Chapter {chapter + 1} of {chapters.length}
              </span>
            </div>
            <p className="text-base leading-relaxed md:text-lg">
              {currentChapter.content}
            </p>
          </div>

          {/* Interactive Demo Section */}
          <section className="rounded-xl border border-stone-700 bg-stone-900/50 p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold md:text-xl">
                <Zap className="h-5 w-5 text-red-500" />
                Family Business Dashboard
              </h3>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tabular-nums opacity-60 md:text-sm">
                  Renders: {renderCount}
                </span>
                <button
                  onClick={resetAll}
                  className="rounded bg-stone-800 px-3 py-1 text-xs transition-colors hover:bg-stone-700"
                >
                  Reset All
                </button>
              </div>
            </div>

            {/* Protocol Toggle - Only show in chapters 2-4 */}
            {chapter >= 1 && chapter <= 3 && (
              <div className="mb-6 rounded-lg bg-stone-800/50 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium">Protocol Mode</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm ${protocolMode === "old" ? "text-red-400" : "text-stone-400"}`}
                    >
                      Old Way (React 17)
                    </span>
                    <button
                      onClick={() =>
                        setProtocolMode((prev) =>
                          prev === "old" ? "new" : "old",
                        )
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${protocolMode === "new" ? "bg-red-600" : "bg-stone-700"}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${protocolMode === "new" ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </button>
                    <span
                      className={`text-sm ${protocolMode === "new" ? "text-green-400" : "text-stone-400"}`}
                    >
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
            <div
              ref={animationParent}
              className="mb-6 grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-4"
            >
              {familyBusiness.map((business) => (
                <div
                  key={business.id}
                  className={`rounded-lg border p-3 md:p-4 ${
                    business.status === "pending" || business.status === "idle"
                      ? "border-stone-700 bg-stone-800/30"
                      : "border-red-500/50 bg-red-950/20"
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium md:text-base">
                      {business.name}
                    </span>
                    {business.status !== "pending" &&
                    business.status !== "idle" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Timer className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  <div className="text-xs capitalize opacity-75 md:text-sm">
                    {business.status}
                  </div>
                  {business.lastUpdated > 0 && (
                    <div className="mt-1 font-mono text-xs opacity-50">
                      Updated:{" "}
                      {new Date(business.lastUpdated).toLocaleTimeString([], {
                        minute: "2-digit",
                        second: "2-digit",
                      })}
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
                    className="w-full rounded-lg bg-red-700 px-4 py-3 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-30"
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
                    className="w-full rounded-lg bg-amber-700 px-4 py-3 text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Handle Shipment Updates (
                    {protocolMode === "old"
                      ? "3 Separate Calls"
                      : "Single Report"}
                    )
                  </button>
                  <CodeBlock
                    code={
                      protocolMode === "old"
                        ? asyncAntiPatternCode
                        : automaticBatchingCode
                    }
                    variant={protocolMode === "old" ? "error" : "success"}
                    title={
                      protocolMode === "old"
                        ? "// ❌ Async Anti-Pattern (Midnight Calls)"
                        : "// ✅ Automatic Batching (New Protocol)"
                    }
                    defaultExpanded={true}
                  />
                </div>
              )}

              {chapter === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <button
                      onClick={() => {
                        setProtocolMode("old");
                        setTimeout(handleMidnightCalls, 100);
                      }}
                      className="rounded-lg bg-stone-700 px-4 py-3 text-white transition-colors hover:bg-stone-600"
                    >
                      Luca's Way (3 Renders)
                    </button>
                    <button
                      onClick={() => {
                        setProtocolMode("new");
                        setTimeout(handleMidnightCalls, 100);
                      }}
                      className="rounded-lg bg-green-700 px-4 py-3 text-white transition-colors hover:bg-green-600"
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
                    className="w-full rounded-lg bg-red-800 px-4 py-3 text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    🚨 Emergency: Bypass Protocol (flushSync)
                  </button>
                  {isEmergency && (
                    <div className="animate-pulse rounded-lg border border-red-500 bg-red-950/50 p-3">
                      <div className="flex items-center justify-center gap-2">
                        <X className="h-5 w-5 text-red-500" />
                        <span className="font-medium">
                          Protocol Bypassed - Immediate Render Forced
                        </span>
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
              <div className="mt-6 rounded-lg bg-stone-800/50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-medium">Active Requests</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeRequests.map((req, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-stone-700 px-2 py-1 font-mono text-xs"
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Navigation */}
          <nav className="flex items-center justify-between">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="flex items-center gap-2 rounded-lg bg-stone-800 px-4 py-2 text-white transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-30 md:px-6 md:py-3"
            >
              ← Previous
            </button>
            <div className="flex items-center gap-4">
              <div className="hidden font-mono text-sm tabular-nums opacity-60 md:block">
                Render Count: {renderCount}
              </div>
              <div className="h-2 w-32 rounded-full bg-stone-800 md:w-48">
                <div
                  className="h-2 rounded-full bg-red-500 transition-all duration-300"
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
              className="flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-30 md:px-6 md:py-3"
            >
              Next →
            </button>
          </nav>
        </div>

        {/* Sidebar - 5 columns on desktop */}
        <div className="lg:col-span-5">
          <div className="space-y-6 lg:sticky lg:top-8">
            {/* Protocol Status */}
            <div className="rounded-xl border border-stone-700 bg-stone-900/50 p-4 md:p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <FlaskConical className="h-5 w-5 text-red-500" />
                Protocol Status
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm">Current Protocol</span>
                    <span
                      className={`text-sm font-medium ${protocolMode === "new" ? "text-green-500" : "text-amber-500"}`}
                    >
                      {protocolMode === "new"
                        ? "Automatic Batching"
                        : "Legacy (No Batching)"}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-stone-800">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${protocolMode === "new" ? "bg-green-500" : "bg-amber-500"}`}
                      style={{ width: protocolMode === "new" ? "100%" : "30%" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm">Render Efficiency</span>
                    <span className="text-sm font-medium text-red-500">
                      {businessComplete ? "100%" : "0%"}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-stone-800">
                    <div
                      className="h-2 rounded-full bg-red-500 transition-all duration-300"
                      style={{ width: businessComplete ? "100%" : "0%" }}
                    />
                  </div>
                </div>

                <div className="border-t border-stone-700 pt-4">
                  <h4 className="mb-2 text-sm font-medium">Key Metrics</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded bg-stone-800/50 p-3">
                      <div className="font-mono text-2xl font-bold text-red-500 tabular-nums">
                        {renderCount}
                      </div>
                      <div className="text-xs opacity-75">Total Renders</div>
                    </div>
                    <div className="rounded bg-stone-800/50 p-3">
                      <div className="font-mono text-2xl font-bold text-green-500 tabular-nums">
                        {
                          familyBusiness.filter(
                            (b) =>
                              b.status !== "pending" && b.status !== "idle",
                          ).length
                        }
                      </div>
                      <div className="text-xs opacity-75">
                        Completed Requests
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metaphor Guide */}
            <div className="rounded-xl border border-stone-700 bg-stone-900/50 p-4 md:p-6">
              <h3 className="mb-4 text-lg font-semibold">
                The Family Metaphor
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500" />
                  <div>
                    <div className="font-medium">Don Corleone</div>
                    <div className="text-sm opacity-75">
                      React Renderer (makes final UI updates)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500" />
                  <div>
                    <div className="font-medium">Tom Hagen</div>
                    <div className="text-sm opacity-75">
                      React Scheduler (queues updates)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                  <div>
                    <div className="font-medium">Wedding Day</div>
                    <div className="text-sm opacity-75">
                      Synchronous Event Handler (batched)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-400" />
                  <div>
                    <div className="font-medium">Midnight Calls</div>
                    <div className="text-sm opacity-75">
                      Async Updates (historically unbatched)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-purple-500" />
                  <div>
                    <div className="font-medium">Emergency Entry</div>
                    <div className="text-sm opacity-75">
                      flushSync() (bypass batching)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Checkpoint */}
            <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4 md:p-6">
              <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                <Check className="h-5 w-5" />
                You Now Understand
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                  <span>Synchronous updates are automatically batched</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                  <span>React 17 didn't batch async updates (inefficient)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
                  <span>React 18+ batches ALL updates automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
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
