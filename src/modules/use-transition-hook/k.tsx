// Kate Version
import { useState, useEffect, useTransition, useMemo } from "react";
import { Clock, Zap, AlertCircle, CheckCircle } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
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
      title: "The Two Clocks",
      content: "Ariadne stood in the center of her workshop, a cavernous industrial space that smelled of ozone and hot metal. Blueprints and wireframes were pinned to every wall, depicting impossible structures. But the room's focus was the wall opposite her desk, where two large, brass-rimmed clocks were mounted side-by-side. One, labeled \"REAL-TIME,\" ticked with a crisp, familiar rhythm. The other, labeled \"DREAM-TIME,\" was nearly static. Its second hand crept forward with an agonizing slowness, each tick separated by a long, humming silence. Cobb entered, his footsteps echoing on the concrete floor. \"You've understood that not all thoughts need to happen at the same speed. Some are immediate reactions, like dodging a punch. Others are deep constructions, like building a cathedral. The architect's greatest challenge is to keep them from fighting for the same moment in time.\""
    },
    {
      title: "The World Freezes",
      content: "In the simulation room, the Subject—a businessman named Saito—sat connected to the PASIV device. Inside the dream, he stood on a rain-slicked street in a generic metropolis. Saito's avatar reached for a floating keyboard. He typed the letter 'P'. Instantly, the world froze. The rain hung in the air like a crystal curtain. The sound of traffic vanished into an oppressive silence. After a jarring second and a half, the world lurched back to life. With each letter—'O', 'U'—the world stuttered so violently that the edges of the buildings began to fray. Cobb delivered the critical diagnosis: \"You're trying to build a mountain in the blink of an eye. Every time the Subject has a thought, you're stopping their heart to listen. You didn't give him a tool; you put him in a prison where the walls rebuild every time he breathes.\""
    },
    {
      title: "The Dream Within a Dream",
      content: "\"You can't do the heavy lifting in his time,\" Cobb explained back in the workshop. He picked up a small, modified PASIV interface from his briefcase. \"You don't build the mountain in his reality. You build it in a deeper level, where you have more time. This lets you start a transition.\" They ran the simulation again. Saito began to type \"Place de la Concorde.\" The letters appeared in the search bar instantly. His avatar was not frozen. The world was perfectly responsive. But as he typed, a subtle change occurred. The existing cityscape around him became slightly transparent, shimmering with a faint blue aura. A low, resonant hum vibrated in the air. Once the typing stopped, the new cathedral district resolved beautifully into view. The transition was seamless, beautiful. Saito smiled, feeling not like a victim of the world, but its conductor."
    },
    {
      title: "Synchronized Time",
      content: "Cobb brought up two monitors in the workshop, placing them side-by-side. \"Watch them together,\" he said. On the left screen, each letter was a blow. The world stopped, shuddered, and restarted. The sound cut in and out. The projections turned hostile, a manifestation of the subconscious rejecting the broken experience. Then, on the right screen: the letters appeared instantly, crisply. The avatar could move freely even as the world shimmered and hummed in the background. The visual cue was informative, not disruptive. When the typing finished, the old world faded and the new one resolved with the smoothness of a memory surfacing. Ariadne spoke with new clarity: \"In the first, we treated every keystroke like a Kick—a world-stopping event. But here... we acknowledged his thought instantly, in his time. We didn't stop the world. We just started a transition.\""
    },
    {
      title: "The Architect of Time",
      content: "Weeks later, Ariadne was no longer fixing broken dreams; she was creating impossible new ones. Her latest project was a vast, virtual library containing every book ever written. As the Subject typed, the letters appeared instantly in the search bar. He could still scroll through the current list. But in the grand hall beyond, entire wings of the library were in flux. Massive shelves dissolved into shimmering light, while new corridors lined with leather-bound volumes elegantly materialized from the haze. The low hum of the transition was now a familiar, comforting sound—the sound of a powerful system working for the user, not against them. Cobb stood beside her: \"You're no longer just a builder. You're an Architect of Time. You understand which moments must be instant, and which can be given time to form. You've given the Subject the most important thing: a world that respects their attention.\""
    }
  ];

  const currentChapter = chapters[chapter];

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
        <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6 text-center">
          <Clock className="w-16 h-16 mx-auto mb-4 text-blue-400" />
          <h3 className="text-2xl font-bold mb-2 text-blue-400">REAL-TIME</h3>
          <p className="text-sm opacity-70 mb-4">Main Thread / Urgent Updates</p>
          <div className="text-6xl font-bold text-blue-500 tabular-nums">
            {String(realTime).padStart(2, '0')}
          </div>
          <p className="text-xs mt-4 opacity-60">Ticks every second</p>
        </div>

        <div className="bg-slate-900/50 border border-cyan-500/30 rounded-lg p-6 text-center">
          <Clock className="w-16 h-16 mx-auto mb-4 text-cyan-400 animate-pulse" />
          <h3 className="text-2xl font-bold mb-2 text-cyan-400">DREAM-TIME</h3>
          <p className="text-sm opacity-70 mb-4">Concurrent Rendering / Deferred Updates</p>
          <div className="text-6xl font-bold text-cyan-500 tabular-nums">
            {String(dreamTime).padStart(2, '0')}
          </div>
          <p className="text-xs mt-4 opacity-60">Ticks every 5 seconds</p>
        </div>
      </div>
    );
  };

  // Chapter 2: Blocking Demo
  const BlockingDemo = () => {
    const [query, setQuery] = useState("");
    const [renderCount, setRenderCount] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
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
      <div className="space-y-6">
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h3 className="text-xl font-bold text-red-500">The Frozen World</h3>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Search landmarks (type slowly and feel the lag):
            </label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-white"
              placeholder="Try typing 'Cathedral'..."
            />
          </div>

          {isBlocked && (
            <div className="bg-red-900/30 border border-red-500/50 rounded p-3 mb-4 animate-pulse">
              <p className="text-red-400 font-medium">⚠️ UI FROZEN - Main thread blocked!</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-900/50 rounded p-3">
              <p className="text-sm opacity-70">Render Count</p>
              <p className="text-2xl font-bold text-red-500">{renderCount}</p>
            </div>
            <div className="bg-slate-900/50 rounded p-3">
              <p className="text-sm opacity-70">Results</p>
              <p className="text-2xl font-bold">{filteredItems.length}</p>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded p-4 max-h-40 overflow-y-auto">
            {filteredItems.map((item, i) => (
              <div key={i} className="py-1 text-sm opacity-80">{item}</div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
      <div className="space-y-6">
        <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-blue-500">The Fluid Transition</h3>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Search landmarks (notice the smooth experience):
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded text-white"
                placeholder="Try typing 'Cathedral'..."
              />
              {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {isPending && (
            <div className="bg-blue-900/30 border border-blue-500/50 rounded p-3 mb-4">
              <p className="text-blue-400 font-medium">
                🌀 Transition in progress... UI remains responsive!
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-900/50 rounded p-3">
              <p className="text-sm opacity-70">Render Count</p>
              <p className="text-2xl font-bold text-blue-500">{renderCount}</p>
            </div>
            <div className="bg-slate-900/50 rounded p-3">
              <p className="text-sm opacity-70">Results</p>
              <p className="text-2xl font-bold">{filteredItems.length}</p>
            </div>
          </div>

          <div className={`bg-slate-900/50 rounded p-4 max-h-40 overflow-y-auto transition-opacity duration-300 ${
            isPending ? 'opacity-50' : 'opacity-100'
          }`}>
            {filteredItems.map((item, i) => (
              <div key={i} className="py-1 text-sm opacity-80">{item}</div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
      <div className="space-y-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("blocking")}
            className={`flex-1 px-6 py-3 rounded font-medium transition-colors ${
              mode === "blocking"
                ? "bg-red-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            ❌ Frozen World
          </button>
          <button
            onClick={() => setMode("transition")}
            className={`flex-1 px-6 py-3 rounded font-medium transition-colors ${
              mode === "transition"
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            ✅ Fluid Transition
          </button>
        </div>

        <div className={`border rounded-lg p-6 ${
          mode === "blocking"
            ? "bg-red-950/20 border-red-500/30"
            : "bg-blue-950/20 border-blue-500/30"
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            mode === "blocking" ? "text-red-500" : "text-blue-500"
          }`}>
            {mode === "blocking" ? "Blocking Mode" : "Transition Mode"}
          </h3>

          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="w-full px-4 py-2 mb-4 bg-slate-900 border border-slate-700 rounded text-white"
            placeholder="Type to search..."
          />

          {mode === "transition" && isPending && (
            <div className="bg-blue-900/30 border border-blue-500/50 rounded p-3 mb-4">
              <p className="text-blue-400 text-sm">🌀 Transition in progress...</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-900/50 rounded p-3">
              <p className="text-sm opacity-70">Blocking Lag</p>
              <p className="text-2xl font-bold text-red-500">
                {metrics.blocking.toFixed(0)}ms
              </p>
            </div>
            <div className="bg-slate-900/50 rounded p-3">
              <p className="text-sm opacity-70">Smooth Lag</p>
              <p className="text-2xl font-bold text-blue-500">
                {metrics.smooth.toFixed(0)}ms
              </p>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded p-4 max-h-32 overflow-y-auto">
            {filteredItems.map((item, i) => (
              <div key={i} className="py-1 text-sm opacity-80">{item}</div>
            ))}
          </div>

          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-600"
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
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border border-blue-500/30 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-blue-500" />
            <h3 className="text-xl font-bold text-blue-500">The Virtual Library</h3>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Search 10,000+ books:
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className="w-full px-4 py-2 bg-slate-900/70 border border-slate-700 rounded text-white"
                placeholder="Try 'Cathedral', 'Renaissance', 'Library'..."
              />
              {isPending && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {isPending && (
            <div className="bg-blue-900/20 border border-blue-500/40 rounded p-4 mb-4">
              <p className="text-blue-300 text-sm font-medium mb-2">
                🌀 Wings of the library are reconfiguring...
              </p>
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse" style={{ width: "70%" }} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-900/50 rounded p-3">
              <p className="text-sm opacity-70">Total Collection</p>
              <p className="text-2xl font-bold text-cyan-500">10,000</p>
            </div>
            <div className="bg-slate-900/50 rounded p-3">
              <p className="text-sm opacity-70">Matching Books</p>
              <p className="text-2xl font-bold text-blue-500">{filteredBooks.length}</p>
            </div>
          </div>

          <div className={`bg-slate-900/50 rounded p-4 max-h-64 overflow-y-auto transition-opacity duration-300 ${
            isPending ? 'opacity-60' : 'opacity-100'
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {filteredBooks.map((book, i) => (
                <div key={i} className="py-2 px-3 bg-slate-800/50 rounded text-sm">
                  📚 {book}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-center text-lg font-medium text-blue-400">
              ✨ "You're an Architect of Time" ✨
            </p>
            <p className="text-center text-sm opacity-70 mt-2">
              You understand which moments must be instant, and which can be given time to form.
            </p>
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
    <div className="min-h-screen bg-slate-950 text-slate-300 p-4 md:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-blue-400">Inception</h1>
        <p className="text-lg md:text-xl opacity-70">Ariadne, The Architect, 2010</p>
        <p className="text-sm mt-2 opacity-60">Teaching: useTransition Hook</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-bold mb-4 text-blue-500">{currentChapter.title}</h2>
          <p className="leading-relaxed text-slate-300">{currentChapter.content}</p>
        </div>

        <section className="mb-12">
          {chapter === 0 && <ClockDemo />}
          {chapter === 1 && <BlockingDemo />}
          {chapter === 2 && <TransitionDemo />}
          {chapter === 3 && <ComparisonDemo />}
          {chapter === 4 && <LibraryDemo />}
        </section>

        <nav className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>
          <span className="text-sm opacity-60 order-first sm:order-none">
            Chapter {chapter + 1} of {chapters.length}
          </span>
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </nav>
      </main>
    </div>
  );
}
      