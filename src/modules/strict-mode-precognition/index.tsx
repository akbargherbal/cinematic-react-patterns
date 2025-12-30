import { useState, useEffect, useCallback, useRef } from "react";
import { Eye, AlertTriangle, CheckCircle, RefreshCw, Zap } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  id: string;
  title: string;
  content: string;
  pedagogicalBeat: string;
}

interface ProfileData {
  id: string;
  name: string;
  avatar: string;
}

export default function StrictModePrecognition() {
  const [chapter, setChapter] = useState(0);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Flawless System",
      pedagogicalBeat: "intro",
      content: `**PreCrime prevents bugs before they exist.** The PreCogs (Strict Mode) observe your component tree, generating warnings about potential problems. Think of it as a development-time safety net that stress-tests your code.

**The Philosophy:** "We don't chase bugs; we prevent them." React's Strict Mode identifies unsafe patterns during development—before they become production disasters.

**Key Insight:** Just like PreCrime operates only within its jurisdiction, Strict Mode only runs in development. It has no impact on your production builds.`,
    },
    {
      id: "build",
      title: "The Unseen Flaw",
      pedagogicalBeat: "anti_pattern",
      content: `**The hidden cost of speed.** Building without Strict Mode is like developing outside PreCrime's oversight—problems slip through undetected.

**The Symptom:** Data "flickers" between renders. Old state leaks into new renders. These aren't just visual glitches—they corrupt application logic.

**The Root Cause:** Side effects without cleanup. When components unmount, they leave resources behind: active timers, subscriptions, cached data. "Every time I fix one leak, another one springs."

**Reality Check:** These bugs often work fine in simple tests, then fail catastrophically under real-world conditions.`,
    },
    {
      id: "climax",
      title: "The Double Vision",
      pedagogicalBeat: "solution",
      content: `**Strict Mode runs your code twice—deliberately.** It's not a bug; it's a stress test that exposes hidden impurities.

**The Mechanism:** In development, Strict Mode double-invokes:
- Function component bodies
- useState/useReducer/useMemo initializers  
- useEffect setup functions

**The Revelation:** "It's not just seeing the future. It's running it twice to be sure." The second run reveals what the first run failed to clean up.

**The Fix:** Add cleanup functions to your effects. If your code breaks under double invocation, it was already broken—Strict Mode just made it visible.`,
    },
    {
      id: "resolution",
      title: "A Tale of Two Systems",
      pedagogicalBeat: "comparison",
      content: `**Side-by-side proof.** The same interaction, two implementations:

**Without Cleanup:** Stale data flickers. Ghost states persist. Logic corrupts.

**With Cleanup:** Clean transitions. Predictable behavior. Robust code.

**The Truth:** "It's not about being faster; it's about being correct." Strict Mode forces you to account for the full lifecycle—setup AND teardown.

**Production Impact:** The discipline enforced during development creates code that's resilient in production.`,
    },
    {
      id: "summary",
      title: "The New Protocol",
      pedagogicalBeat: "summary",
      content: `**Strict Mode is your development partner.** It doesn't write code for you, but holds you to a higher standard.

**The Shift:** From reactive debugging to proactive prevention. Warnings aren't failures—they're guardrails.

**Best Practices:**
- Always wrap your app in <StrictMode> during development
- Fix warnings immediately—they reveal real problems
- Write cleanup functions for all effects with side effects
- Test component unmounting and remounting scenarios

**Final Wisdom:** "The visions aren't accusations; they're guardrails." Trust the process.`,
    },
  ];

  const currentChapter = chapters[chapter];

  // Demo states
  const [leakDemoMode, setLeakDemoMode] = useState<"broken" | "fixed">("broken");
  const [profileSwitchCount, setProfileSwitchCount] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(0);
  const [leakedTimers, setLeakedTimers] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const leakTimersRef = useRef<NodeJS.Timeout[]>([]);

  const profiles: ProfileData[] = [
    { id: "anderton", name: "John Anderton", avatar: "👮" },
    { id: "clarke", name: "Lara Clarke", avatar: "👩‍💼" },
    { id: "marks", name: "Ben Marks", avatar: "👨‍💻" },
  ];

  // Circuit breaker
  useEffect(() => {
    if (leakedTimers > 50) {
      resetLeakDemo();
    }
  }, [leakedTimers]);

  const resetLeakDemo = useCallback(() => {
    leakTimersRef.current.forEach(clearTimeout);
    leakTimersRef.current = [];
    setLeakedTimers(0);
    setRenderCount(0);
    setProfileSwitchCount(0);
    setCurrentProfile(0);
  }, []);

  const switchProfile = useCallback(() => {
    setCurrentProfile((prev) => (prev + 1) % profiles.length);
    setProfileSwitchCount((c) => c + 1);
    setRenderCount((c) => c + 1);

    if (leakDemoMode === "broken") {
      // Intentionally broken: no cleanup
      const timer = setTimeout(() => {
        setRenderCount((c) => c + 1);
      }, 100);
      leakTimersRef.current.push(timer);
      setLeakedTimers((l) => l + 1);
    }
    // Fixed version automatically cleans up in useEffect
  }, [leakDemoMode, profiles.length]);

  // Proper cleanup for fixed mode
  useEffect(() => {
    if (leakDemoMode === "fixed" && profileSwitchCount > 0) {
      const timer = setTimeout(() => {
        setRenderCount((c) => c + 1);
      }, 100);
      return () => clearTimeout(timer); // ✅ Proper cleanup
    }
  }, [leakDemoMode, profileSwitchCount]);

  const strictModeWrapperCode = `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`;

  const brokenEffectCode = `function ProfileComponent({ userId }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch user data
    const subscription = api.subscribe(userId, setData);
    
    // ❌ Missing cleanup - memory leak!
    // Old subscriptions stay active
  }, [userId]);
  
  return <div>{data?.name}</div>;
}`;

  const fixedEffectCode = `function ProfileComponent({ userId }) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Fetch user data  
    const subscription = api.subscribe(userId, setData);
    
    // ✅ Proper cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);
  
  return <div>{data?.name}</div>;
}`;

  const doubleInvocationCode = `// Strict Mode in Development:
// 1. Mount component
// 2. Run effect setup
// 3. Immediately run effect cleanup (if exists)
// 4. Run effect setup again

useEffect(() => {
  console.log('Effect setup'); // Runs TWICE
  const timer = setInterval(() => {...}, 1000);
  
  return () => {
    console.log('Effect cleanup'); // Runs between setups
    clearInterval(timer);
  };
}, []);

// This reveals missing cleanup:
// - If cleanup is missing, the first timer keeps running
// - The second setup creates another timer
// - Now you have TWO timers instead of one!`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4 sm:gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Eye className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Minority Report</h1>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-slate-400">
              PreCrime Division • Chief Anderton • 2002
            </p>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-blue-400 font-medium">
            React Strict Mode
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Progress Bar */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-2 text-xs sm:text-sm text-slate-400">
            <span>Chapter Progress</span>
            <span className="font-mono tabular-nums">
              {chapter + 1} of {chapters.length}
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Chapter Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-4">
            <div className="prose prose-invert prose-lg max-w-none">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-blue-400">
                {currentChapter.title}
              </h2>
              <div
                className="leading-relaxed space-y-4 text-sm sm:text-base md:text-lg"
                dangerouslySetInnerHTML={{ __html: currentChapter.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-300">$1</strong>') }}
              />
            </div>
          </div>

          {/* Interactive Demos - Sidebar */}
          <div className="lg:col-span-8">
            <div className="sticky top-24 space-y-6">
              {/* Chapter 0: Intro - Strict Mode Wrapper */}
              {chapter === 0 && (
                <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="text-blue-500 w-5 h-5" />
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-400">
                      Enable PreCrime
                    </h3>
                  </div>
                  <CodeBlock
                    code={strictModeWrapperCode}
                    language="jsx"
                    variant="success"
                    title="// ✅ Wrap your app in development"
                    defaultExpanded={true}
                  />
                  <p className="mt-4 text-xs sm:text-sm text-slate-400 leading-relaxed">
                    In production builds, StrictMode does nothing. It only activates during development to help you write better code.
                  </p>
                </div>
              )}

              {/* Chapter 1: Anti-Pattern - The Leak */}
              {chapter === 1 && (
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="text-yellow-500 w-5 h-5" />
                    <h3 className="text-lg sm:text-xl font-semibold">Data Leak Demo</h3>
                  </div>

                  {/* Demo Controls */}
                  <div className="space-y-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={switchProfile}
                        className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                      >
                        Switch Profile
                      </button>
                      <button
                        onClick={resetLeakDemo}
                        className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors text-sm sm:text-base"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Profile Display */}
                    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl sm:text-4xl">{profiles[currentProfile].avatar}</span>
                        <div>
                          <p className="font-semibold text-sm sm:text-base">{profiles[currentProfile].name}</p>
                          <p className="text-xs text-slate-400">Profile ID: {profiles[currentProfile].id}</p>
                        </div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                      <div className="bg-slate-800 rounded p-2 sm:p-3">
                        <div className="text-slate-400 mb-1">Switches</div>
                        <div className="font-mono text-base sm:text-lg font-bold tabular-nums">{profileSwitchCount}</div>
                      </div>
                      <div className="bg-slate-800 rounded p-2 sm:p-3">
                        <div className="text-slate-400 mb-1">Renders</div>
                        <div className="font-mono text-base sm:text-lg font-bold tabular-nums">{renderCount}</div>
                      </div>
                      <div className="bg-red-950/30 border border-red-500/30 rounded p-2 sm:p-3">
                        <div className="text-red-400 mb-1">Leaks</div>
                        <div className="font-mono text-base sm:text-lg font-bold text-red-500 tabular-nums">{leakedTimers}</div>
                      </div>
                    </div>
                  </div>

                  <CodeBlock
                    code={brokenEffectCode}
                    variant="error"
                    title="// ❌ Without cleanup"
                    defaultExpanded={false}
                  />
                </div>
              )}

              {/* Chapter 2: Solution - Double Invocation */}
              {chapter === 2 && (
                <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="text-blue-500 w-5 h-5" />
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-400">
                      The Double Vision
                    </h3>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-4 mb-4 border border-slate-700">
                    <div className="grid grid-cols-2 gap-4 text-center text-xs sm:text-sm">
                      <div>
                        <div className="text-slate-400 mb-2">Production</div>
                        <div className="space-y-2">
                          <div className="bg-blue-600 text-white py-2 rounded">Mount</div>
                          <div className="text-slate-500">→</div>
                          <div className="bg-green-600 text-white py-2 rounded">Effect Setup</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-blue-400 mb-2">Development</div>
                        <div className="space-y-2">
                          <div className="bg-blue-600 text-white py-2 rounded">Mount</div>
                          <div className="text-slate-500">→</div>
                          <div className="bg-green-600 text-white py-2 rounded">Setup</div>
                          <div className="text-slate-500">→</div>
                          <div className="bg-yellow-600 text-white py-2 rounded text-xs">Cleanup</div>
                          <div className="text-slate-500">→</div>
                          <div className="bg-green-600 text-white py-2 rounded">Setup</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CodeBlock
                    code={doubleInvocationCode}
                    variant="default"
                    title="// 💡 How Strict Mode stress-tests your code"
                    defaultExpanded={true}
                  />
                </div>
              )}

              {/* Chapter 3: Comparison */}
              {chapter === 3 && (
                <div className="space-y-4">
                  <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg sm:text-xl font-semibold">Code Comparison</h3>
                      <button
                        onClick={() => setLeakDemoMode(leakDemoMode === "broken" ? "fixed" : "broken")}
                        className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                      >
                        {leakDemoMode === "broken" ? "✅ Show Fix" : "❌ Show Bug"}
                      </button>
                    </div>

                    <CodeBlock
                      code={leakDemoMode === "broken" ? brokenEffectCode : fixedEffectCode}
                      variant={leakDemoMode === "broken" ? "error" : "success"}
                      title={leakDemoMode === "broken" ? "// ❌ Without cleanup" : "// ✅ With cleanup"}
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              )}

              {/* Chapter 4: Summary */}
              {chapter === 4 && (
                <div className="bg-blue-950/20 border border-blue-500/30 rounded-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="text-blue-500 w-5 h-5" />
                    <h3 className="text-lg sm:text-xl font-semibold text-blue-400">
                      Best Practices
                    </h3>
                  </div>

                  <ul className="space-y-3 text-xs sm:text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Always use <code className="bg-slate-800 px-1 py-0.5 rounded text-blue-300">&lt;StrictMode&gt;</code> in development</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Add cleanup functions to effects with side effects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Fix warnings immediately—they reveal real problems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Test component mounting and unmounting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span>Write idempotent effect setup functions</span>
                    </li>
                  </ul>

                  <div className="mt-6 p-4 bg-slate-900 rounded-lg border border-blue-500/30">
                    <p className="text-sm sm:text-base italic text-blue-300 text-center">
                      "The visions aren't accusations; they're guardrails."
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 sm:mt-16">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
          >
            ← Previous
          </button>
          <span className="text-xs sm:text-sm text-slate-400 font-mono tabular-nums order-first sm:order-none">
            Chapter {chapter + 1} of {chapters.length}
          </span>
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm sm:text-base"
          >
            Next →
          </button>
        </nav>
      </main>
    </div>
  );
}
