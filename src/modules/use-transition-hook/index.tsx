import { useState, useEffect, useTransition, useMemo } from "react";
import { Clock, Zap, AlertCircle, CheckCircle, Layers, TrendingUp } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
  metadata: string;
}

// Generate large dataset for demos
const generateItems = (count: number): string[] => {
  const prefixes = ["The", "A", "An"];
  const subjects = ["Cathedral", "Museum", "Palace", "Tower", "Bridge", "Monument", "Library", "Theater", "Opera", "Park"];
  const adjectives = ["Grand", "Ancient", "Modern", "Historic", "Royal", "National", "Imperial", "Sacred", "Gothic", "Renaissance"];
  
  return Array.from({ length: count }, (_, i) => {
    const prefix = prefixes[i % prefixes.length];
    const adj = adjectives[i % adjectives.length];
    const subject = subjects[i % subjects.length];
    return `${prefix} ${adj} ${subject} ${i + 1}`;
  });
};

export default function UseTransitionHook(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);

  const chapters: Chapter[] = [
    {
      metadata: "Chapter 1 • Introduction",
      title: "The Two Clocks",
      content: "Ariadne stood in the center of her workshop, a cavernous industrial space that smelled of ozone and hot metal. Blueprints and wireframes were pinned to every wall, depicting impossible structures. But the room's focus was the wall opposite her desk, where two large, brass-rimmed clocks were mounted side-by-side. One, labeled \"REAL-TIME,\" ticked with a crisp, familiar rhythm. The other, labeled \"DREAM-TIME,\" was nearly static. Its second hand crept forward with an agonizing slowness, each tick separated by a long, humming silence. Cobb entered, his footsteps echoing on the concrete floor. \"You've understood that not all thoughts need to happen at the same speed. Some are immediate reactions, like dodging a punch. Others are deep constructions, like building a cathedral. The architect's greatest challenge is to keep them from fighting for the same moment in time.\""
    },
    {
      metadata: "Chapter 2 • The Problem",
      title: "The World Freezes",
      content: "In the simulation room, the Subject—a businessman named Saito—sat connected to the PASIV device. Inside the dream, he stood on a rain-slicked street in a generic metropolis. Saito's avatar reached for a floating keyboard. He typed the letter 'P'. Instantly, the world froze. The rain hung in the air like a crystal curtain. The sound of traffic vanished into an oppressive silence. After a jarring second and a half, the world lurched back to life. With each letter—'O', 'U'—the world stuttered so violently that the edges of the buildings began to fray. Cobb delivered the critical diagnosis: \"You're trying to build a mountain in the blink of an eye. Every time the Subject has a thought, you're stopping their heart to listen. You didn't give him a tool; you put him in a prison where the walls rebuild every time he breathes.\""
    },
    {
      metadata: "Chapter 3 • The Solution",
      title: "The Dream Within a Dream",
      content: "\"You can't do the heavy lifting in his time,\" Cobb explained back in the workshop. He picked up a small, modified PASIV interface from his briefcase. \"You don't build the mountain in his reality. You build it in a deeper level, where you have more time. This lets you start a transition.\" They ran the simulation again. Saito began to type \"Place de la Concorde.\" The letters appeared in the search bar instantly. His avatar was not frozen. The world was perfectly responsive. But as he typed, a subtle change occurred. The existing cityscape around him became slightly transparent, shimmering with a faint blue aura. A low, resonant hum vibrated in the air. Once the typing stopped, the new cathedral district resolved beautifully into view. The transition was seamless, beautiful. Saito smiled, feeling not like a victim of the world, but its conductor."
    },
    {
      metadata: "Chapter 4 • Comparison",
      title: "Synchronized Time",
      content: "Cobb brought up two monitors in the workshop, placing them side-by-side. \"Watch them together,\" he said. On the left screen, each letter was a blow. The world stopped, shuddered, and restarted. The sound cut in and out. The projections turned hostile, a manifestation of the subconscious rejecting the broken experience. Then, on the right screen: the letters appeared instantly, crisply. The avatar could move freely even as the world shimmered and hummed in the background. The visual cue was informative, not disruptive. When the typing finished, the old world faded and the new one resolved with the smoothness of a memory surfacing. Ariadne spoke with new clarity: \"In the first, we treated every keystroke like a Kick—a world-stopping event. But here... we acknowledged his thought instantly, in his time. We didn't stop the world. We just started a transition.\""
    },
    {
      metadata: "Chapter 5 • Mastery",
      title: "The Architect of Time",
      content: "Weeks later, Ariadne was no longer fixing broken dreams; she was creating impossible new ones. Her latest project was a vast, virtual library containing every book ever written. As the Subject typed, the letters appeared instantly in the search bar. He could still scroll through the current list. But in the grand hall beyond, entire wings of the library were in flux. Massive shelves dissolved into shimmering light, while new corridors lined with leather-bound volumes elegantly materialized from the haze. The low hum of the transition was now a familiar, comforting sound—the sound of a powerful system working for the user, not against them. Cobb stood beside her: \"You're no longer just a builder. You're an Architect of Time. You understand which moments must be instant, and which can be given time to form. You've given the Subject the most important thing: a world that respects their attention.\""
    }
  ];

  const currentChapter = chapters[chapter];
  const progress = ((chapter + 1) / chapters.length) * 100;

  // Chapter 1: Two Clocks Demo
  const ClockDemo = () => {
    const [realTime, setRealTime] = useState(0);
    const [dreamTime, setDreamTime] = useState(0);

    useEffect(() => {
      const realTimer = setInterval(() => {
        setRealTime((t) => (t + 1) % 60);
      }, 1000);
      
      const dreamTimer = setInterval(() => {
        setDreamTime((t) => (t + 1) % 60);
      }, 5000);

      return () => {
        clearInterval(realTimer);
        clearInterval(dreamTimer);
      };
    }, []);

    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-emerald-950/40 to-emerald-900/30 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-8 text-center shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-500/60 transition-all duration-300">
          <Clock className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
          <h3 className="text-2xl font-bold mb-2 text-emerald-400 tracking-tight">REAL-TIME</h3>
          <p className="text-sm opacity-70 mb-6">Main Thread • Urgent Updates</p>
          <div className="text-7xl font-bold text-emerald-500 tabular-nums mb-4">
            {String(realTime).padStart(2, '0')}
          </div>
          <div className="inline-block px-4 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
            <p className="text-xs font-medium text-emerald-400">⚡ Instant Response</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-950/40 to-cyan-950/30 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-8 text-center shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:border-indigo-500/60 transition-all duration-300">
          <Clock className="w-16 h-16 mx-auto mb-4 text-indigo-400 animate-pulse" />
          <h3 className="text-2xl font-bold mb-2 text-indigo-400 tracking-tight">DREAM-TIME</h3>
          <p className="text-sm opacity-70 mb-6">Concurrent Rendering • Deferred Updates</p>
          <div className="text-7xl font-bold text-indigo-500 tabular-nums mb-4">
            {String(dreamTime).padStart(2, '0')}
          </div>
          <div className="inline-block px-4 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full">
            <p className="text-xs font-medium text-indigo-400">🌀 Background Processing</p>
          </div>
        </div>
      </div>
    );
  };

  // Chapter 2: Blocking Demo
  const BlockingDemo = () => {
    const [query, setQuery] = useState("");
    const [renderCount, setRenderCount] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    const [blockTime, setBlockTime] = useState(0);
    const items = useMemo(() => generateItems(5000), []);

    // Intentionally blocking filter (anti-pattern)
    const filteredItems = useMemo(() => {
      if (!query) return items.slice(0, 20);
      
      // Simulate expensive computation
      const start = performance.now();
      const result = items.filter(item => 
        item.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 20);
      const duration = performance.now() - start;
      
      setBlockTime(duration);
      
      // Show blocking indicator if computation took too long
      if (duration > 16) {
        setIsBlocked(true);
        setTimeout(() => setIsBlocked(false), 500);
      }
      
      return result;
    }, [query, items]);

    useEffect(() => {
      setRenderCount((c) => c + 1);
    }, [filteredItems]);

    const handleReset = () => {
      setQuery("");
      setRenderCount(0);
      setIsBlocked(false);
      setBlockTime(0);
    };

    const blockingCode = `// ❌ Blocking Pattern - Freezes the UI
function BlockingSearch() {
  const [query, setQuery] = useState("");
  
  // This filter runs synchronously on EVERY keystroke
  // Blocks the main thread until complete
  const results = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      // UI freezes here during filtering! ❄️
    />
  );
}`;

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-red-950/40 to-red-900/30 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-7 h-7 text-red-500" />
            <h3 className="text-2xl font-bold text-red-500 tracking-tight">The Frozen World</h3>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-slate-300">
              Search landmarks (type slowly and feel the lag):
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/70 backdrop-blur-sm border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
              placeholder="Try typing 'Cathedral'..."
            />
          </div>

          {isBlocked && (
            <div className="bg-red-900/40 border border-red-500/60 rounded-lg p-4 mb-6 animate-pulse shadow-lg shadow-red-900/30">
              <p className="text-red-400 font-bold text-center">⚠️ UI FROZEN - Main thread blocked!</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-xs opacity-70 mb-1">Render Count</p>
              <p className="text-3xl font-bold text-red-500">{renderCount}</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-xs opacity-70 mb-1">Block Time</p>
              <p className="text-3xl font-bold text-red-500">{blockTime.toFixed(0)}ms</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-xs opacity-70 mb-1">Results</p>
              <p className="text-3xl font-bold text-slate-300">{filteredItems.length}</p>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 max-h-48 overflow-y-auto border border-slate-700/50 mb-6">
            {filteredItems.map((item, i) => (
              <div key={i} className="py-2 px-3 text-sm opacity-80 hover:bg-slate-800/50 rounded transition-colors">{item}</div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-200 font-medium"
          >
            🔄 Reset Demo
          </button>
        </div>

        <CodeBlock
          code={blockingCode}
          variant="error"
          title="// ❌ Every keystroke freezes the world"
          defaultExpanded={true}
        />
      </div>
    );
  };

  // Chapter 3: Transition Demo
  const TransitionDemo = () => {
    const [query, setQuery] = useState("");
    const [deferredQuery, setDeferredQuery] = useState("");
    const [isPending, startTransition] = useTransition();
    const [renderCount, setRenderCount] = useState(0);
    const items = useMemo(() => generateItems(5000), []);

    const filteredItems = useMemo(() => {
      if (!deferredQuery) return items.slice(0, 20);
      return items.filter(item =>
        item.toLowerCase().includes(deferredQuery.toLowerCase())
      ).slice(0, 20);
    }, [deferredQuery, items]);

    useEffect(() => {
      setRenderCount((c) => c + 1);
    }, [filteredItems]);

    const handleQueryChange = (value: string) => {
      // Urgent: Update input immediately
      setQuery(value);
      
      // Non-urgent: Defer expensive filtering
      startTransition(() => {
        setDeferredQuery(value);
      });
    };

    const handleReset = () => {
      setQuery("");
      setDeferredQuery("");
      setRenderCount(0);
    };

    const transitionCode = `// ✅ useTransition - Non-blocking UI
import { useState, useTransition } from "react";

function FluidSearch() {
  const [query, setQuery] = useState("");
  const [deferredQuery, setDeferredQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  
  const handleChange = (value: string) => {
    // URGENT: Update input immediately (Real-Time)
    setQuery(value);
    
    // NON-URGENT: Defer filtering (Dream-Time)
    startTransition(() => {
      setDeferredQuery(value);
    });
  };
  
  // Filter based on deferred query
  const results = items.filter(item =>
    item.toLowerCase().includes(deferredQuery.toLowerCase())
  );
  
  return (
    <>
      <input
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        // Input stays responsive! ✨
      />
      
      {isPending && <div>Rebuilding city...</div>}
      
      <ResultsList items={results} />
    </>
  );
}`;

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-indigo-950/40 via-blue-950/30 to-cyan-950/30 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-8 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-7 h-7 text-indigo-500" />
            <h3 className="text-2xl font-bold text-indigo-500 tracking-tight">The Fluid Transition</h3>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-slate-300">
              Search landmarks (notice the smooth experience):
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/70 backdrop-blur-sm border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                placeholder="Try typing 'Cathedral'..."
              />
              {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {isPending ? (
            <div className="bg-indigo-900/40 border border-indigo-500/60 rounded-lg p-4 mb-6 shadow-lg shadow-indigo-900/30">
              <p className="text-indigo-400 font-medium text-center">
                🌀 PENDING STATE ACTIVE - UI remains responsive!
              </p>
            </div>
          ) : (
            <div className="bg-emerald-900/30 border border-emerald-500/40 rounded-lg p-4 mb-6">
              <p className="text-emerald-400 font-medium text-center">
                ✅ IDLE - Ready for next input
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-xs opacity-70 mb-1">Render Count</p>
              <p className="text-3xl font-bold text-indigo-500">{renderCount}</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-xs opacity-70 mb-1">Results</p>
              <p className="text-3xl font-bold text-slate-300">{filteredItems.length}</p>
            </div>
          </div>

          <div className={`bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 max-h-48 overflow-y-auto border border-slate-700/50 mb-6 transition-opacity duration-300 ${
            isPending ? 'opacity-50' : 'opacity-100'
          }`}>
            {filteredItems.map((item, i) => (
              <div key={i} className="py-2 px-3 text-sm opacity-80 hover:bg-slate-800/50 rounded transition-colors">{item}</div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 shadow-lg shadow-indigo-900/30 hover:shadow-indigo-900/50 transition-all duration-200 font-medium"
          >
            🔄 Reset Demo
          </button>
        </div>

        <CodeBlock
          code={transitionCode}
          variant="success"
          title="// ✅ Separate urgent and non-urgent updates"
          defaultExpanded={true}
        />
      </div>
    );
  };

  // Chapter 4: Comparison Demo
  const ComparisonDemo = () => {
    const [mode, setMode] = useState<"blocking" | "transition">("blocking");
    const [query, setQuery] = useState("");
    const [deferredQuery, setDeferredQuery] = useState("");
    const [isPending, startTransition] = useTransition();
    const [metrics, setMetrics] = useState({ blocking: 0, smooth: 0 });
    const items = useMemo(() => generateItems(5000), []);

    const handleQueryChange = (value: string) => {
      setQuery(value);
      
      if (mode === "transition") {
        startTransition(() => {
          setDeferredQuery(value);
        });
      } else {
        setDeferredQuery(value);
      }

      // Track responsiveness
      const start = performance.now();
      requestAnimationFrame(() => {
        const lag = performance.now() - start;
        setMetrics((m) => ({
          ...m,
          [mode === "blocking" ? "blocking" : "smooth"]: Math.max(m[mode === "blocking" ? "blocking" : "smooth"], lag)
        }));
      });
    };

    const filteredItems = useMemo(() => {
      if (!deferredQuery) return items.slice(0, 15);
      return items.filter(item =>
        item.toLowerCase().includes(deferredQuery.toLowerCase())
      ).slice(0, 15);
    }, [deferredQuery, items]);

    const handleReset = () => {
      setQuery("");
      setDeferredQuery("");
      setMetrics({ blocking: 0, smooth: 0 });
    };

    const blockingCode = `// ❌ Blocking: Synchronous filtering
const results = items.filter(item =>
  item.includes(query)
);
// Main thread blocked during filter!`;

    const transitionCode = `// ✅ Transition: Deferred filtering
startTransition(() => {
  setDeferredQuery(query);
});
// Input stays responsive!`;

    return (
      <div className="space-y-8">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("blocking")}
            className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all duration-200 ${
              mode === "blocking"
                ? "bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg shadow-red-900/40"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-700"
            }`}
          >
            ❌ Frozen World
          </button>
          <button
            onClick={() => setMode("transition")}
            className={`flex-1 px-6 py-4 rounded-xl font-bold transition-all duration-200 ${
              mode === "transition"
                ? "bg-gradient-to-br from-indigo-600 to-blue-700 text-white shadow-lg shadow-indigo-900/40"
                : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 border border-slate-700"
            }`}
          >
            ✅ Fluid Transition
          </button>
        </div>

        <div className={`border rounded-xl p-8 backdrop-blur-sm transition-all duration-300 ${
          mode === "blocking"
            ? "bg-gradient-to-br from-red-950/40 to-red-900/30 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            : "bg-gradient-to-br from-indigo-950/40 to-blue-950/30 border-indigo-500/30 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
        }`}>
          <h3 className={`text-2xl font-bold mb-6 tracking-tight ${
            mode === "blocking" ? "text-red-500" : "text-indigo-500"
          }`}>
            {mode === "blocking" ? "Blocking Mode" : "Transition Mode"}
          </h3>

          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-full px-4 py-3 mb-6 bg-slate-900/70 backdrop-blur-sm border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500/50 transition-all"
            placeholder="Type to search..."
          />

          {mode === "transition" && isPending && (
            <div className="bg-indigo-900/40 border border-indigo-500/60 rounded-lg p-4 mb-6 shadow-lg">
              <p className="text-indigo-400 font-medium text-center">🌀 Transition in progress...</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-xs opacity-70 mb-1">Blocking Lag</p>
              <p className="text-3xl font-bold text-red-500">
                {metrics.blocking.toFixed(0)}ms
              </p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-xs opacity-70 mb-1">Smooth Lag</p>
              <p className="text-3xl font-bold text-emerald-500">
                {metrics.smooth.toFixed(0)}ms
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 max-h-40 overflow-y-auto border border-slate-700/50 mb-6">
            {filteredItems.map((item, i) => (
              <div key={i} className="py-2 px-3 text-sm opacity-80 hover:bg-slate-800/50 rounded transition-colors">{item}</div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="w-full px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
          >
            🔄 Reset Metrics
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <CodeBlock
            code={blockingCode}
            variant="error"
            title="// ❌ Frozen World"
          />
          <CodeBlock
            code={transitionCode}
            variant="success"
            title="// ✅ Fluid Transition"
          />
        </div>
      </div>
    );
  };

  // Chapter 5: Library Demo
  const LibraryDemo = () => {
    const [query, setQuery] = useState("");
    const [deferredQuery, setDeferredQuery] = useState("");
    const [isPending, startTransition] = useTransition();
    const books = useMemo(() => generateItems(10000), []);

    const filteredBooks = useMemo(() => {
      if (!deferredQuery) return books.slice(0, 50);
      return books.filter(book =>
        book.toLowerCase().includes(deferredQuery.toLowerCase())
      ).slice(0, 50);
    }, [deferredQuery, books]);

    const handleQueryChange = (value: string) => {
      setQuery(value);
      startTransition(() => {
        setDeferredQuery(value);
      });
    };

    const masteryCode = `// 🎯 Mastery: Complex UI stays responsive
function VirtualLibrary() {
  const [query, setQuery] = useState("");
  const [deferred, setDeferred] = useState("");
  const [isPending, startTransition] = useTransition();
  
  // 10,000+ books in the library
  const books = useMemo(() => generateBooks(10000), []);
  
  const handleSearch = (value: string) => {
    // Instant input update
    setQuery(value);
    
    // Deferred heavy filtering
    startTransition(() => {
      setDeferred(value);
    });
  };
  
  const results = useMemo(() => 
    books.filter(book => book.includes(deferred)),
    [deferred, books]
  );
  
  return (
    <div>
      <input value={query} onChange={handleSearch} />
      {isPending && <Shimmer />}
      <ResultsGrid books={results} />
    </div>
  );
}

// You're an Architect of Time 🏛️`;

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-indigo-950/50 via-blue-950/40 to-cyan-950/40 backdrop-blur-sm border border-indigo-500/40 rounded-xl p-8 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-cyan-500" />
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight">
              The Virtual Library
            </h3>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-slate-300">
              Search 10,000+ books:
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="Try 'Cathedral', 'Renaissance', 'Library'..."
              />
              {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {isPending && (
            <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-6 mb-6 shadow-lg">
              <p className="text-indigo-300 text-sm font-medium mb-3">
                🌀 Wings of the library are reconfiguring...
              </p>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 animate-pulse transition-all duration-500" style={{ width: "70%" }} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-xs opacity-70 mb-1">Total Collection</p>
              <p className="text-3xl font-bold text-cyan-500">10,000</p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
              <p className="text-xs opacity-70 mb-1">Matching Books</p>
              <p className="text-3xl font-bold text-indigo-500">{filteredBooks.length}</p>
            </div>
          </div>

          <div className={`bg-slate-900/60 backdrop-blur-sm rounded-lg p-6 max-h-80 overflow-y-auto border border-slate-700/50 transition-opacity duration-300 ${
            isPending ? 'opacity-60' : 'opacity-100'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredBooks.map((book, i) => (
                <div key={i} className="py-2 px-4 bg-slate-800/60 rounded-lg text-sm hover:bg-slate-700/60 transition-colors">
                  📚 {book}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-700">
            <div className="text-center">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full shadow-lg shadow-indigo-900/40 mb-4">
                <p className="text-lg font-bold text-white">
                  🏛️ Architect of Time
                </p>
              </div>
              <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
                ✨ "You're an Architect of Time" ✨
              </p>
              <p className="text-sm opacity-70 max-w-2xl mx-auto leading-relaxed">
                You understand which moments must be instant, and which can be given time to form.
                You've given the Subject the most important thing: a world that respects their attention.
              </p>
            </div>
          </div>
        </div>

        <CodeBlock
          code={masteryCode}
          variant="success"
          title="// 🏛️ Architecting Time"
          defaultExpanded={true}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      {/* Header */}
      <header className="bg-gradient-to-b from-slate-900/50 to-transparent backdrop-blur-sm border-b border-slate-800/50 sticky top-0 z-50 mb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center gap-4 mb-3">
            <Layers className="text-indigo-500 w-10 h-10" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Inception
              </h1>
              <p className="text-sm text-slate-400">The Dream Levels • 2010</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-medium text-slate-400">Mission Progress</span>
              <span className="text-xs font-bold text-indigo-400">{progress.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid lg:grid-cols-[1fr,350px] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Chapter Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="mb-4">
                <span className="text-sm font-medium text-indigo-400">{currentChapter.metadata}</span>
              </div>
              <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 tracking-tight">
                {currentChapter.title}
              </h2>
              <p className="leading-relaxed text-slate-300 text-lg">{currentChapter.content}</p>
            </div>

            {/* Interactive Demo */}
            <section>
              {chapter === 0 && <ClockDemo />}
              {chapter === 1 && <BlockingDemo />}
              {chapter === 2 && <TransitionDemo />}
              {chapter === 3 && <ComparisonDemo />}
              {chapter === 4 && <LibraryDemo />}
            </section>

            {/* Navigation (Mobile) */}
            <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 lg:hidden">
              <button
                onClick={() => setChapter(Math.max(0, chapter - 1))}
                disabled={chapter === 0}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-500 hover:to-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-indigo-900/50"
              >
                ← Previous
              </button>
              <span className="text-sm opacity-60 order-first sm:order-none font-medium">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <button
                onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
                disabled={chapter === chapters.length - 1}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-500 hover:to-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-indigo-900/50"
              >
                Next →
              </button>
            </nav>
          </div>

          {/* Sticky Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Progress Card */}
              <div className="bg-gradient-to-br from-indigo-950/50 to-blue-950/40 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-indigo-400" />
                  <h3 className="font-bold text-indigo-400 tracking-tight">Progress</h3>
                </div>
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
                  {progress.toFixed(0)}%
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
                {/* Chapter Timeline */}
                <div className="space-y-2">
                  {chapters.map((ch, i) => (
                    <button
                      key={i}
                      onClick={() => setChapter(i)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        i === chapter
                          ? 'bg-indigo-600/40 border border-indigo-500/50 text-white font-medium'
                          : i < chapter
                          ? 'bg-emerald-900/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/30'
                          : 'bg-slate-800/30 border border-slate-700/30 text-slate-500 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          i === chapter
                            ? 'bg-indigo-500 text-white'
                            : i < chapter
                            ? 'bg-emerald-500 text-white'
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {i < chapter ? '✓' : i + 1}
                        </span>
                        <span className="truncate">{ch.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Architect's Notes */}
              <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/30 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                <h3 className="font-bold text-cyan-400 mb-3 tracking-tight">Architect's Notes</h3>
                <div className="text-sm space-y-3 text-slate-300 leading-relaxed">
                  {chapter === 0 && (
                    <p>Two speeds of operation: urgent updates on the main thread, deferred updates in concurrent rendering.</p>
                  )}
                  {chapter === 1 && (
                    <p>Every synchronous filter blocks the UI. The subject's interaction is frozen while JavaScript processes the array.</p>
                  )}
                  {chapter === 2 && (
                    <p>useTransition separates urgent input updates from non-urgent rendering. The input remains instant while filtering happens in the background.</p>
                  )}
                  {chapter === 3 && (
                    <p>Compare the lag metrics. Blocking mode shows frame drops; transition mode keeps the main thread free for user input.</p>
                  )}
                  {chapter === 4 && (
                    <p>At scale (10,000+ items), transitions are essential. Complex UIs stay fluid because React can interrupt and prioritize urgent work.</p>
                  )}
                </div>
              </div>

              {/* Navigation (Desktop) */}
              <div className="space-y-3">
                <button
                  onClick={() => setChapter(Math.max(0, chapter - 1))}
                  disabled={chapter === 0}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-500 hover:to-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-indigo-900/50"
                >
                  ← Previous Chapter
                </button>
                <button
                  onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
                  disabled={chapter === chapters.length - 1}
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-500 hover:to-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg hover:shadow-indigo-900/50"
                >
                  Next Chapter →
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}