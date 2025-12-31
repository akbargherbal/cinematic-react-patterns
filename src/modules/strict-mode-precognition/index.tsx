import { useState, useEffect, useRef } from "react";
import { Brain, AlertTriangle, CheckCircle, Eye, RefreshCw } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  title: string;
  content: string;
}

// Simulated user profiles
const PROFILES = [
  { id: "1", name: "John Anderton", role: "Chief", avatar: "🔵" },
  { id: "2", name: "Lara Clarke", role: "Analyst", avatar: "🟢" },
  { id: "3", name: "Ben Marks", role: "Technician", avatar: "🟡" },
  { id: "4", name: "Danny Witwer", role: "Auditor", avatar: "🔴" },
];

export default function StrictModePrecognition(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [parent] = useAutoAnimate();
  
  // Demo state
  const [activeProfileId, setActiveProfileId] = useState<string>("1");
  const [profileData, setProfileData] = useState<string>("");
  const [staleFlashCount, setStaleFlashCount] = useState<number>(0);
  const [leakedTimers, setLeakedTimers] = useState<number>(0);
  const [isStrictModeEnabled, setIsStrictModeEnabled] = useState<boolean>(false);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [warnings, setWarnings] = useState<string[]>([]);
  
  const activeProfile = PROFILES.find(p => p.id === activeProfileId);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Extract chapters from narrative
  const chapters: Chapter[] = [
    {
      title: "The Flawless System",
      content: "In the cool, blue-lit PreCrime chamber, Chief Anderton watches a vision of a minor data anomaly—a clerk about to use deprecated schema v2.7. A polite warning appears on her screen. She corrects it. The crime never happens. 'We don't chase bugs; we prevent them,' Anderton explains. This is proactive detection: catching problems before they exist.",
    },
    {
      title: "The Unseen Flaw",
      content: "Building a personal data visualizer outside PreCrime's oversight, Anderton creates a component that fetches user profiles. It works on first load, but when switching profiles, the old data flashes briefly. He dismisses it as a rendering quirk. The missing cleanup function creates a 'data leak'—stale state that corrupts new features. He spends hours debugging: 'Every time I fix one leak, another one springs.'",
    },
    {
      title: "The Double Vision",
      content: "Desperate, Anderton connects his project to the PreCrime system. The PreCogs thrash violently, showing his component rendering twice, effects running twice. It looks like chaos—but reveals the pattern: after the first 'unmount', stale data remains. The second run exposes what the first failed to clean up. 'It's not just seeing the future. It's running it twice to be sure.' He adds the cleanup function. The visions cease.",
    },
    {
      title: "A Tale of Two Systems",
      content: "Anderton demonstrates side-by-side. The unchecked build shows Lara Clarke's data flashing when switching to Ben Marks—a visible ghost. The PreCrime-certified build transitions cleanly. 'The first system felt faster to build, but was broken in ways we couldn't see. Strict Mode forces us to account for setup and teardown. It's not about being faster; it's about being correct.'",
    },
    {
      title: "The New Protocol",
      content: "Months later, Strict Mode is standard protocol. A junior developer sees warnings in her console and smiles—'Thanks for the heads-up.' The warnings aren't failures; they're guardrails. Anderton reflects: the PreCogs don't write code for you, but enforce a discipline of purity that makes every developer better. 'The visions aren't accusations; they're guardrails.'",
    },
  ];

  // Code examples
  const brokenEffectCode = `// ❌ Missing cleanup - data leak!
useEffect(() => {
  // Fetch profile data
  fetchProfile(profileId).then(setData);
  // Missing: return () => cleanup();
}, [profileId]);`;

  const fixedEffectCode = `// ✅ Proper cleanup - pure component
useEffect(() => {
  let isMounted = true;
  
  fetchProfile(profileId).then(data => {
    if (isMounted) {
      setData(data);
    }
  });
  
  return () => {
    isMounted = false; // Cleanup: prevent stale updates
  };
}, [profileId]);`;

  const strictModeCode = `// 🎯 Strict Mode wrapper (development only)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);`;

  // Simulate data fetching with intentional leak in "broken" mode
  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Circuit breaker: auto-reset after 50 leaks
    if (leakedTimers >= 50) {
      resetDemo();
      return;
    }

    if (chapter >= 1 && chapter <= 3) {
      // Simulate data fetch with stale data leak
      const simulateFetch = () => {
        setProfileData(`Loading ${activeProfile?.name}'s data...`);
        
        // Simulate network delay
        setTimeout(() => {
          setProfileData(`${activeProfile?.name} - ${activeProfile?.role}\nLast active: Just now`);
          setRenderCount(c => c + 1);
        }, 300);
      };

      simulateFetch();
      
      // Intentionally leak an interval in "broken" mode (chapter 2)
      if (chapter === 2 && !isStrictModeEnabled) {
        intervalRef.current = setInterval(() => {
          // This simulates a side effect that should be cleaned up
          setStaleFlashCount(c => c + 1);
          setLeakedTimers(l => l + 1);
        }, 2000);
      }
    }

    // Cleanup function (MANDATORY)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [activeProfileId, chapter, isStrictModeEnabled, activeProfile?.name, activeProfile?.role, leakedTimers]);

  // Simulate Strict Mode double invocation
  useEffect(() => {
    if (chapter === 3 && isStrictModeEnabled) {
      // Strict Mode runs effects twice in development
      // We'll simulate this by incrementing a counter
      const timer = setTimeout(() => {
        setRenderCount(c => c + 1);
        setWarnings(prev => [
          ...prev,
          `Strict Mode: Effect ran twice for profile ${activeProfile?.name}`
        ]);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [activeProfileId, chapter, isStrictModeEnabled, activeProfile?.name]);

  // Add warnings for deprecated patterns
  useEffect(() => {
    if (chapter === 0 || chapter === 4) {
      const timer = setTimeout(() => {
        setWarnings(prev => [
          ...prev.slice(-4), // Keep only last 5 warnings
          `PreCrime: Deprecated pattern detected in ${activeProfile?.name}'s component`
        ]);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [chapter, activeProfile?.name]);

  const resetDemo = () => {
    setStaleFlashCount(0);
    setLeakedTimers(0);
    setRenderCount(0);
    setWarnings([]);
    setActiveProfileId("1");
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const switchProfile = (id: string) => {
    // Record flash if we're in buggy mode
    if (chapter === 1) {
      setStaleFlashCount(c => c + 1);
    }
    setActiveProfileId(id);
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950/40 to-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
            <div className="flex items-center gap-3">
              <Brain className="text-blue-400 w-7 h-7 sm:w-8 sm:h-8" />
              <h1 className="text-2xl sm:text-3xl font-bold">Minority Report</h1>
            </div>
            <p className="text-sm sm:text-base text-slate-400">
              PreCrime • John Anderton • 2002
            </p>
          </div>
          <p className="text-base sm:text-lg text-blue-400 font-medium">
            React Strict Mode: Catching Bugs Before They Happen
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - 8 columns */}
          <div className="lg:col-span-8 space-y-8">
            {/* Chapter Content */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{currentChapter.title}</h2>
                <span className="text-sm text-slate-400 px-3 py-1 bg-slate-800 rounded-full">
                  Chapter {chapter + 1} of 5
                </span>
              </div>
              <p className="leading-relaxed text-slate-300 mb-6">
                {currentChapter.content}
              </p>
              
              {/* Memorable Quote */}
              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-950/20 italic">
                {chapter === 0 && "We don't chase bugs; we prevent them."}
                {chapter === 1 && "Every time I fix one leak, another one springs."}
                {chapter === 2 && "It's not just seeing the future. It's running it twice to be sure."}
                {chapter === 3 && "It's not about being faster; it's about being correct."}
                {chapter === 4 && "The visions aren't accusations; they're guardrails."}
              </div>
            </section>

            {/* Interactive Demo Section */}
            <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                PreCrime Simulation
              </h3>

              {/* Demo based on chapter */}
              {chapter === 0 && (
                <div className="space-y-6">
                  <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">PreCrime Vision Detected</span>
                    </div>
                    <p className="text-sm">
                      Deprecated schema `v2.7` detected in data layer. 
                      Update to `v3.0` to prevent data corruption.
                    </p>
                  </div>
                  <CodeBlock
                    code={strictModeCode}
                    variant="default"
                    title="// 🎯 Enabling Strict Mode"
                    language="jsx"
                    defaultExpanded={true}
                  />
                  <p className="text-sm text-slate-400">
                    Strict Mode wraps your app to enable additional checks and warnings during development.
                  </p>
                </div>
              )}

              {chapter >= 1 && chapter <= 4 && (
                <div className="space-y-6">
                  {/* Profile Viewer Demo */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Profile Selector */}
                    <div className="space-y-4">
                      <h4 className="font-medium">PreCrime Profiles</h4>
                      <div className="grid grid-cols-2 gap-3" ref={parent}>
                        {PROFILES.map(profile => (
                          <button
                            key={profile.id}
                            onClick={() => switchProfile(profile.id)}
                            className={`p-4 rounded-lg border transition-all ${activeProfileId === profile.id ? 'border-blue-500 bg-blue-950/30' : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'}`}
                          >
                            <div className="text-2xl mb-2">{profile.avatar}</div>
                            <div className="font-medium">{profile.name}</div>
                            <div className="text-sm text-slate-400">{profile.role}</div>
                          </button>
                        ))}
                      </div>
                      
                      {/* Controls */}
                      <div className="flex flex-wrap gap-3 pt-4">
                        <button
                          onClick={() => setIsStrictModeEnabled(!isStrictModeEnabled)}
                          className={`px-4 py-2 rounded flex items-center gap-2 ${isStrictModeEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700 hover:bg-slate-600'}`}
                        >
                          {isStrictModeEnabled ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                          {isStrictModeEnabled ? 'Strict Mode: ON' : 'Strict Mode: OFF'}
                        </button>
                        <button
                          onClick={resetDemo}
                          className="px-4 py-2 rounded bg-slate-700 hover:bg-slate-600 flex items-center gap-2"
                        >
                          <RefreshCw className="w-4 h-4" />
                          Reset Simulation
                        </button>
                      </div>
                    </div>

                    {/* Profile Data Display */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Profile Data</h4>
                      <div className={`p-4 rounded-lg border ${chapter === 1 && staleFlashCount > 0 ? 'border-red-500/50 bg-red-950/20 animate-pulse' : 'border-slate-700 bg-slate-800/50'}`}>
                        <div className="text-sm text-slate-400 mb-2">Current Data Stream</div>
                        <div className="font-mono text-sm whitespace-pre">{profileData || 'No data loaded'}</div>
                      </div>
                      
                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded bg-slate-800/50">
                          <div className="text-sm text-slate-400">Stale Flashes</div>
                          <div className="text-xl font-mono">{staleFlashCount}</div>
                        </div>
                        <div className="p-3 rounded bg-slate-800/50">
                          <div className="text-sm text-slate-400">Render Count</div>
                          <div className="text-xl font-mono">{renderCount}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code Comparison */}
                  <div className="space-y-4 pt-4 border-t border-slate-800">
                    <h4 className="font-medium">Code Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <CodeBlock
                        code={brokenEffectCode}
                        variant={chapter === 1 ? "error" : "default"}
                        title="// ❌ Without Cleanup"
                        language="jsx"
                        defaultExpanded={chapter === 1}
                      />
                      <CodeBlock
                        code={fixedEffectCode}
                        variant={chapter === 3 || chapter === 4 ? "success" : "default"}
                        title="// ✅ With Cleanup"
                        language="jsx"
                        defaultExpanded={chapter === 3 || chapter === 4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {chapter === 4 && (
                <div className="mt-6 p-4 bg-green-950/20 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="font-medium">All Systems Stable</span>
                  </div>
                  <p className="text-sm">
                    With Strict Mode enabled and proper cleanup implemented, the application runs predictably.
                    Warnings during development prevent bugs in production.
                  </p>
                </div>
              )}
            </section>

            {/* Navigation */}
            <nav className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                onClick={() => setChapter(Math.max(0, chapter - 1))}
                disabled={chapter === 0}
                className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                ← Previous
              </button>
              <div className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </div>
              <button
                onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
                disabled={chapter === chapters.length - 1}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                Next →
              </button>
            </nav>
          </div>

          {/* Sidebar - 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            {/* Warnings Panel */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                PreCrime Warnings
              </h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {warnings.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No warnings detected. System stable.</p>
                ) : (
                  warnings.map((warning, index) => (
                    <div key={index} className="p-3 bg-slate-800/30 rounded border border-slate-700">
                      <div className="text-sm font-mono">{warning}</div>
                      <div className="text-xs text-slate-500 mt-1">PreCrime Division</div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800">
                <div className="text-sm text-slate-400">
                  {leakedTimers > 0 && (
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertTriangle className="w-4 h-4" />
                      {leakedTimers} potential memory leak{leakedTimers !== 1 ? 's' : ''} detected
                    </div>
                  )}
                  {leakedTimers >= 40 && (
                    <div className="mt-2 text-amber-400 text-sm">
                      ⚠️ Circuit breaker will activate at 50 leaks
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Key Concepts */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Strict Mode Guardrails</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span className="text-sm">Double-invokes render/effects to expose impurities</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span className="text-sm">Warns about deprecated lifecycle methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span className="text-sm">Detects unexpected side effects</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                  <span className="text-sm">Development-only: disabled in production builds</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}