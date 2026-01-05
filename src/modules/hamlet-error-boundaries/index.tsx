import { useState, useEffect } from "react";
import { Shield, Sword, AlertCircle, CheckCircle, BookOpen, Skull } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function HamletErrorBoundaries(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'uncontained' | 'shielded'>('uncontained');
  const [errorTriggered, setErrorTriggered] = useState<boolean>(false);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [appStatus, setAppStatus] = useState<'running' | 'crashed' | 'contained'>('running');
  
  const chapters: Chapter[] = [
    { 
      title: "Let the Foils Be Brought", 
      content: `The duel is a contained component tree—a discrete section where risky interactions occur. Without boundaries, any error within can escape and crash the entire application, just as the poisoned duel could destroy the entire court.`
    },
    { 
      title: "The Drink, The Drink!", 
      content: `When Gertrude drinks from the poisoned cup, it's an uncaught JavaScript error. Without error boundaries, this error propagates upward, crashing parent components until the entire app fails—just as the poison spreads through the court.`
    },
    { 
      title: "A Shield Descends", 
      content: `Error boundaries act as protective shields around component trees. They catch errors within their boundary, display fallback UI instead of crashing, and contain the damage—isolating the tragedy to just that component section.`
    },
    { 
      title: "Two Kingdoms", 
      content: `Without boundaries: One error crashes the entire app. With boundaries: The error is contained to its component, fallback UI appears, and the rest of the application continues functioning with limited, graceful degradation.`
    },
    { 
      title: "The Poison Sealed", 
      content: `Error boundaries log errors for debugging while preventing app crashes. Fallback UI maintains user trust and limited functionality. The error is encapsulated, logged, and rendered harmless—the tale continues despite the local tragedy.`
    },
  ];

  const errorBoundaryCode = `class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <FallbackUI />; // Your fallback component
    }
    return this.props.children;
  }
}`;

  const withoutBoundaryCode = `// ❌ Without Error Boundary
function DuelComponent() {
  if (poisoned) {
    throw new Error("The drink, the drink!");
  }
  return <Fight />;
}

// Error propagates upward, crashes entire app
function Court() {
  return <DuelComponent />; // CRASHES HERE
}`;

  const withBoundaryCode = `// ✅ With Error Boundary
function Court() {
  return (
    <ErrorBoundary fallback={<FallbackUI />}>
      <DuelComponent /> {/* Error contained here */}
    </ErrorBoundary>
  );
}

// App continues running despite error
function Kingdom() {
  return <Court />; // STILL FUNCTIONING
}`;

  const triggerError = () => {
    if (demoMode === 'uncontained') {
      setErrorTriggered(true);
      setErrorCount(prev => prev + 1);
      setAppStatus('crashed');
      
      // Circuit breaker: Auto-reset after 5 errors
      if (errorCount >= 4) {
        setTimeout(() => {
          resetDemo();
          alert("Safety limit reached! Demo auto-reset.");
        }, 1000);
      }
    } else {
      setErrorTriggered(true);
      setErrorCount(prev => prev + 1);
      setAppStatus('contained');
    }
  };

  const resetDemo = () => {
    setErrorTriggered(false);
    setErrorCount(0);
    setAppStatus('running');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setErrorTriggered(false);
      setErrorCount(0);
    };
  }, []);

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/40 to-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Sword}
        title="Hamlet"
        subtitle="The Duel, 1609"
        concept="React Concept: Error Boundaries"
        themeColor="purple"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-purple-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-purple-300">
                  <Shield className="h-5 w-5" />
                  Demo Controls
                </h3>
                
                <div className="mb-4 flex gap-2">
                  <button
                    onClick={() => setDemoMode('uncontained')}
                    className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-all ${demoMode === 'uncontained' ? 'bg-red-900/60 text-red-200' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ❌ Uncontained
                  </button>
                  <button
                    onClick={() => setDemoMode('shielded')}
                    className={`flex-1 rounded px-3 py-2 text-sm font-medium transition-all ${demoMode === 'shielded' ? 'bg-emerald-900/60 text-emerald-200' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ✅ Shielded
                  </button>
                </div>

                <div className="mb-4">
                  <button
                    onClick={triggerError}
                    disabled={appStatus === 'crashed' || errorCount >= 5}
                    className="w-full rounded bg-purple-700 px-4 py-2 font-medium hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Trigger Poison Error
                  </button>
                  <p className="mt-2 text-xs text-slate-400">
                    {demoMode === 'uncontained' ? 'Will crash the app' : 'Will be contained by shield'}
                  </p>
                </div>

                <button
                  onClick={resetDemo}
                  className="w-full rounded border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm hover:bg-slate-700/50"
                >
                  Reset Demo
                </button>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded bg-slate-800/30 p-3">
                    <div className="text-xs text-slate-500">Poison Triggers</div>
                    <div className="font-mono text-xl tabular-nums">{errorCount}</div>
                  </div>
                  <div className="rounded bg-slate-800/30 p-3">
                    <div className="text-xs text-slate-500">Kingdom Status</div>
                    <div className={`text-sm font-medium ${appStatus === 'crashed' ? 'text-red-400' : appStatus === 'contained' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                      {appStatus === 'crashed' ? 'CRASHED' : appStatus === 'contained' ? 'CONTAINED' : 'RUNNING'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-purple-300">
                  <BookOpen className="h-5 w-5" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Duel</span>
                    <span className="text-sm font-medium">Child Component Tree</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Poison</span>
                    <span className="text-sm font-medium">JavaScript Error</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Cascade of Deaths</span>
                    <span className="text-sm font-medium">App Crash</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Protective Shield</span>
                    <span className="text-sm font-medium">Error Boundary</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Fortinbras's Arrival</span>
                    <span className="text-sm font-medium">Fallback UI</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Encapsulated Rapier</span>
                    <span className="text-sm font-medium">Error Logging</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-purple-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-purple-200/80">
                  {chapter === 0 && "Error boundaries isolate risky component trees, just as the duel was separated from the court—containing damage before it spreads."}
                  {chapter === 1 && "Without boundaries, errors propagate upward until they crash your root component—total application failure from a single component error."}
                  {chapter === 2 && "Boundaries catch errors and display fallback UI, keeping the rest of your app functional despite localized component failures."}
                  {chapter === 3 && "Strategic boundary placement provides defense in depth—some failures can be contained locally while critical features remain protected."}
                  {chapter === 4 && "Error logging with boundaries provides debugging context while preventing user-facing crashes—maintaining trust through graceful degradation."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "{chapter === 0 && "Let the foils be brought."}
                  {chapter === 1 && "The drink, the drink! I am poisoned."}
                  {chapter === 2 && "A fault, contained, is but a local tragedy."}
                  {chapter === 3 && "The cup stops; the story continues."}
                  {chapter === 4 && "The poison is sealed. The tale is told."}"
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — {chapter === 0 ? "Claudius" : chapter === 1 ? "Gertrude" : chapter === 2 ? "Horatio" : chapter === 3 ? "Narrator" : "Horatio"}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-3xl font-bold text-purple-100">
              {currentChapter.title}
            </h2>
            <div className="mt-4 leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-purple-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-6 w-2 rounded bg-gradient-to-b from-purple-500 to-emerald-500"></div>
              <h3 className="text-xl font-bold text-purple-200">
                Interactive Demonstration
              </h3>
            </div>

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
                      <h4 className="mb-2 text-lg font-medium text-purple-300">The Duel Component</h4>
                      <p className="text-sm text-slate-400">This component tree represents the duel—a contained section where risky operations occur.</p>
                    </div>
                    <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                      <h4 className="mb-2 flex items-center gap-2 text-lg font-medium text-red-300">
                        <AlertCircle className="h-5 w-5" />
                        The Poison (Error)
                      </h4>
                      <p className="text-sm text-red-300/80">When triggered, this error will escape and crash the entire application without boundaries.</p>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-purple-500/30 bg-purple-950/20 p-4">
                    <CodeBlock
                      code={withoutBoundaryCode}
                      language="tsx"
                      variant="default"
                      title="// The Duel Without Protection"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                  <div className="mb-4 flex items-center gap-2">
                    <Skull className="h-5 w-5 text-red-400" />
                    <h4 className="text-lg font-medium text-red-300">Error Propagation Demo</h4>
                  </div>
                  
                  <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className={`rounded p-4 ${errorTriggered ? 'bg-red-900/40 border border-red-500/50' : 'bg-slate-800/30'}`}>
                      <div className="text-xs text-slate-500">Gertrude's Cup</div>
                      <div className={`font-mono text-xl ${errorTriggered ? 'text-red-400' : 'text-slate-400'}`}>
                        {errorTriggered ? '💀 POISONED' : '🍷 CLEAN'}
                      </div>
                    </div>
                    <div className={`rounded p-4 ${errorTriggered ? 'bg-red-900/40 border border-red-500/50' : 'bg-slate-800/30'}`}>
                      <div className="text-xs text-slate-500">Laertes's Rapier</div>
                      <div className={`font-mono text-xl ${errorTriggered ? 'text-red-400' : 'text-slate-400'}`}>
                        {errorTriggered ? '💀 ENVENOMED' : '⚔️ CLEAN'}
                      </div>
                    </div>
                    <div className={`rounded p-4 ${appStatus === 'crashed' ? 'bg-red-900/40 border border-red-500/50' : 'bg-slate-800/30'}`}>
                      <div className="text-xs text-slate-500">Kingdom Status</div>
                      <div className={`font-mono text-xl ${appStatus === 'crashed' ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                        {appStatus === 'crashed' ? '💀 CRASHED' : '🏰 STABLE'}
                      </div>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={`// ❌ Error thrown without boundary
function handlePoison() {
  throw new Error("The drink, the drink!");
  // This error propagates up the component tree
  // Each parent component fails until root crashes
}`}
                  language="tsx"
                  variant="error"
                  title="// Uncontained Error Propagation"
                />
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                  <div className="mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <h4 className="text-lg font-medium text-emerald-300">The Shield Component</h4>
                  </div>
                  
                  <div className="mb-6">
                    <CodeBlock
                      code={errorBoundaryCode}
                      language="tsx"
                      variant="success"
                      title="// Error Boundary Implementation"
                      defaultExpanded={true}
                    />
                  </div>
                  
                  <div className="rounded border border-emerald-500/20 bg-emerald-900/10 p-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-12 w-12 rounded-full ${errorTriggered ? 'bg-red-900/60 border border-red-500/50' : 'bg-slate-800'} flex items-center justify-center`}>
                        {errorTriggered ? '💀' : '🤺'}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Duel Component</div>
                        <div className="text-xs text-slate-500">Inside error boundary shield</div>
                      </div>
                      <div className={`rounded-full px-3 py-1 text-sm ${errorTriggered ? 'bg-emerald-900/40 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                        {errorTriggered ? 'CONTAINED' : 'PROTECTED'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={withoutBoundaryCode}
                  goodCode={withBoundaryCode}
                  language="tsx"
                  themeColor="purple"
                  badLabel="❌ Kingdom Falls (App Crashes)"
                  goodLabel="✅ Kingdom Continues (Fallback UI)"
                  badExplanation="Without boundaries: Error propagates, crashes root component, entire app fails"
                  goodExplanation="With boundaries: Error contained locally, fallback UI displayed, app continues"
                />
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className={`rounded-lg p-4 ${demoMode === 'uncontained' ? 'border-red-500/40 bg-red-950/20' : 'border-slate-700/50 bg-slate-900/30'}`}>
                    <h4 className="mb-2 text-lg font-medium text-red-300">Without Boundaries</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center gap-2">• Error crashes entire app</li>
                      <li className="flex items-center gap-2">• User sees blank screen</li>
                      <li className="flex items-center gap-2">• No graceful degradation</li>
                      <li className="flex items-center gap-2">• Debugging is difficult</li>
                    </ul>
                  </div>
                  <div className={`rounded-lg p-4 ${demoMode === 'shielded' ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-slate-700/50 bg-slate-900/30'}`}>
                    <h4 className="mb-2 text-lg font-medium text-emerald-300">With Boundaries</h4>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center gap-2">• Error contained locally</li>
                      <li className="flex items-center gap-2">• Fallback UI displayed</li>
                      <li className="flex items-center gap-2">• App continues running</li>
                      <li className="flex items-center gap-2">• Errors logged for debugging</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-purple-500/30 bg-purple-950/20 p-4">
                  <div className="mb-4 grid gap-4 md:grid-cols-2">
                    <div className="rounded bg-slate-900/40 p-4">
                      <h4 className="mb-2 font-medium text-purple-300">Error Logging</h4>
                      <p className="text-sm text-slate-400">Boundaries log errors with componentDidCatch, providing context for debugging while keeping the app running.</p>
                      <div className="mt-3 rounded bg-slate-950 p-3 font-mono text-xs">
                        <div className="text-red-400">Error: The drink, the drink!</div>
                        <div className="text-slate-500">Component: DuelComponent</div>
                        <div className="text-slate-500">Boundary: Act5Scene2Shield</div>
                      </div>
                    </div>
                    <div className="rounded bg-slate-900/40 p-4">
                      <h4 className="mb-2 font-medium text-purple-300">Fallback UI</h4>
                      <p className="text-sm text-slate-400">Users see helpful messages instead of crashes, maintaining trust and allowing limited functionality.</p>
                      <div className="mt-3 rounded border border-emerald-500/20 bg-emerald-950/10 p-4">
                        <div className="font-medium text-emerald-300">Something went wrong in this section</div>
                        <div className="mt-2 text-sm text-emerald-300/80">The rest of the application continues to work normally.</div>
                        <button className="mt-3 rounded bg-emerald-800/30 px-3 py-1 text-sm hover:bg-emerald-800/50">
                          Try Again
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <CodeBlock
                    code={`// ✅ Complete error boundary pattern
function App() {
  return (
    <ErrorBoundary 
      fallback={<ErrorDisplay />}
      onError={(error) => logToService(error)}
    >
      <RiskyFeature />
      <OtherFeatures /> {/* These continue working */}
    </ErrorBoundary>
  );
}`}
                    language="tsx"
                    variant="success"
                    title="// Production-Ready Pattern"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="purple"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}