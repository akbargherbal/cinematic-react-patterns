import { useState, useEffect, useRef } from "react";
import { BookOpen, Zap, Brain, Sparkles, Shield, CheckCircle } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function TheTempestCompositionOverInheritance(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<"inheritance" | "composition">("composition");
  const [componentCount, setComponentCount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [renderCount, setRenderCount] = useState<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const chapters: Chapter[] = [
    {
      title: "The Library, Not the Dukedom",
      content: "Prospero's power comes from composing spirits (components), not inheriting a dukedom (base class). In React, build UIs by combining independent components with props, not extending rigid class hierarchies. Composition gives you flexible, reusable power."
    },
    {
      title: "The Curse of the Wrong Interface",
      content: "Forcing Caliban into a courtier's role crashes the system. Forcing React components into inheritance hierarchies creates bugs and rigid code. Components need interfaces (props) that match their capabilities, not pre-defined class structures."
    },
    {
      title: "Go Make Thyself Like a Nymph",
      content: "Prospero composes the tempest by directing Ariel with specific instructions (props). Build complex React features by composing specialized components with clear interfaces. Delegate implementation to components; orchestrate with props."
    },
    {
      title: "Chains vs. The Network",
      content: "Inheritance creates brittle chains—break one link, everything fails. Composition creates resilient networks—components work independently. Compare rigid class hierarchies with flexible component composition for maintainable React apps."
    },
    {
      title: "Drowning the Book",
      content: "When the play ends, Prospero releases his components cleanly. Composed React systems allow clean separation—components unmount independently, no tangled inheritance to unravel. Composition enables maintainable, flexible application lifecycles."
    }
  ];

  // Code examples
  const inheritanceAntiPattern = `// ❌ Inheritance Anti-Pattern
class Notification extends BaseComponent {
  render() {
    return (
      <div className="notification">
        {this.formatMessage(this.props.message)}
      </div>
    );
  }
}

class ErrorNotification extends Notification {
  formatMessage(msg) {
    return \`ERROR: \${msg}\`;
  }
}

// Locked into hierarchy - can't reuse formatting
// elsewhere without inheritance`;

  const compositionPattern = `// ✅ Composition Pattern
function Notification({ message, format }) {
  return (
    <div className="notification">
      {format ? format(message) : message}
    </div>
  );
}

// Use with any formatter
<Notification 
  message="Ship approaching" 
  format={(msg) => \`⚠️ \${msg}\`} 
/>

// Reusable formatting function
function errorFormatter(msg) {
  return \`ERROR: \${msg}\`;
}

// Component stays simple
// Formatters are independent`;

  const propDrillingAntiPattern = `// ❌ Prop Drilling (Caliban's Chains)
function App() {
  const data = fetchData();
  return <Page data={data} />;
}

function Page({ data }) {
  return <Header data={data} />;
}

function Header({ data }) {
  return <UserPanel data={data} />; // Forced to pass through
}`;

  const contextComposition = `// ✅ Context Composition (Ariel's Network)
const DataContext = createContext();

function App() {
  const data = fetchData();
  return (
    <DataContext.Provider value={data}>
      <Page /> {/* No props! */}
    </DataContext.Provider>
  );
}

function Page() {
  return <Header />; // Clean composition
}

function Header() {
  return <UserPanel />; // Uses context directly
}`;

  const complexFeatureInheritance = `// ❌ Inheritance for Complex Feature
class WeatherDisplay extends BaseWidget {
  render() {
    return (
      <div>
        {this.renderTemperature()}
        {this.renderForecast()}
        {this.renderAlerts()}
      </div>
    );
  }
  // All logic bundled together
  // Hard to test individually
}`;

  const complexFeatureComposition = `// ✅ Composition for Complex Feature
function WeatherDisplay() {
  return (
    <Card>
      <TemperatureDisplay />
      <ForecastPanel />
      <AlertSystem />
    </Card>
  );
}

// Each component independent
// Can be tested and reused separately
// Easy to modify or extend`;

  // Demo logic
  useEffect(() => {
    if (isActive && demoMode === "composition") {
      timerRef.current = setInterval(() => {
        setComponentCount(prev => prev + 1);
        setRenderCount(prev => prev + 1);
      }, 800);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [isActive, demoMode]);

  useEffect(() => {
    // Circuit breaker
    if (componentCount > 50) {
      setIsActive(false);
      setComponentCount(0);
    }
  }, [componentCount]);

  const triggerDemo = () => {
    setIsActive(true);
    if (demoMode === "inheritance") {
      // Simulate inheritance rigidity
      setComponentCount(5); // Fixed hierarchy
    }
  };

  const resetDemo = () => {
    setIsActive(false);
    setComponentCount(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={BookOpen}
        title="The Tempest"
        subtitle="Prospero's Island, 1611"
        concept="React Concept: Composition vs Inheritance"
        themeColor="cyan"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Sparkles className="h-5 w-5 text-cyan-400" />
                  Magic Controls
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDemoMode("inheritance")}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === "inheritance" ? "bg-slate-700 text-red-300" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
                    >
                      ❌ Inheritance
                    </button>
                    <button
                      onClick={() => setDemoMode("composition")}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === "composition" ? "bg-cyan-900/40 text-cyan-300" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
                    >
                      ✅ Composition
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Active Spirits</div>
                      <div className={`font-mono text-xl ${demoMode === "composition" ? "text-cyan-400" : "text-slate-500"}`}>
                        {componentCount}
                      </div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Renders</div>
                      <div className="font-mono text-xl text-cyan-400">{renderCount}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={triggerDemo}
                      disabled={isActive}
                      className="flex-1 rounded bg-cyan-900/60 px-3 py-2 text-sm text-cyan-200 hover:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isActive ? "Active" : "Summon"}
                    </button>
                    <button
                      onClick={resetDemo}
                      className="flex-1 rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Prospero's Island</span>
                    <span className="text-sm font-medium">React Application</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Prospero</span>
                    <span className="text-sm font-medium">React Developer</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Ariel (Spirit)</span>
                    <span className="text-sm font-medium">Specialized Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Caliban</span>
                    <span className="text-sm font-medium">Another Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Spells & Commands</span>
                    <span className="text-sm font-medium">Props & Context</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Dukedom of Milan</span>
                    <span className="text-sm font-medium">Inheritance Hierarchy</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Summoning Ariel</span>
                    <span className="text-sm font-medium">Component Composition</span>
                  </div>
                  <div className="flex justify-between border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Tempest</span>
                    <span className="text-sm font-medium">Complex UI Feature</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-cyan-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-cyan-200/80">
                  {chapter === 0 && "Power comes from composing independent components with props, not inheriting rigid class structures."}
                  {chapter === 1 && "Forcing components into inheritance hierarchies creates bugs—components need interfaces that match their capabilities."}
                  {chapter === 2 && "Build complex features by composing specialized components with clear props, delegating implementation details."}
                  {chapter === 3 && "Inheritance creates brittle chains; composition creates resilient networks of independent, reusable components."}
                  {chapter === 4 && "Composed systems allow clean separation—components can be independently unmounted and reused elsewhere."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && '"My library was dukedom large enough."'}
                  {chapter === 1 && '"You taught me language, and my profit on\'t / Is, I know how to curse."'}
                  {chapter === 2 && '"I have done well for thee, and more than thou hast promised."'}
                  {chapter === 3 && '"Ariel and his quality..."'}
                  {chapter === 4 && '"I\'ll break my staff... / I\'ll drown my book."'}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — William Shakespeare, The Tempest
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-cyan-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-cyan-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-cyan-500"></div>
              <h3 className="text-xl font-bold text-cyan-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter 0: Introduction */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-300">Current Mode: <span className={demoMode === "composition" ? "text-cyan-400" : "text-red-400"}>{demoMode === "composition" ? "Composition" : "Inheritance"}</span></h4>
                    <p className="text-sm text-slate-400">
                      {demoMode === "composition" 
                        ? "Like Prospero summoning Ariel, you're composing independent components that work together flexibly."
                        : "Like the rigid dukedom hierarchy, components are locked into inheritance chains with limited flexibility."
                      }
                    </p>
                    <div className="rounded-lg bg-slate-800/30 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">Spirits Active:</span>
                        <span className={`font-mono ${demoMode === "composition" ? "text-cyan-300" : "text-slate-500"}`}>
                          {componentCount}
                        </span>
                      </div>
                      {demoMode === "composition" && isActive && (
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-700">
                          <div 
                            className="h-full bg-cyan-500 transition-all duration-300"
                            style={{ width: `${Math.min(componentCount * 2, 100)}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <CodeBlock
                    code={demoMode === "composition" ? compositionPattern : inheritanceAntiPattern}
                    language="tsx"
                    variant={demoMode === "composition" ? "success" : "error"}
                    title={demoMode === "composition" ? "// ✅ Composition Pattern" : "// ❌ Inheritance Anti-Pattern"}
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}

            {/* Chapter 1: Anti-pattern */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-red-400" />
                    <h4 className="font-bold text-red-300">The Cursed Interface</h4>
                  </div>
                  <p className="mt-2 text-sm text-red-300/80">
                    Trying to force props through multiple levels (prop drilling) creates rigid, fragile chains—just like forcing Caliban into a courtier's role.
                  </p>
                </div>
                <CodeComparison
                  badCode={propDrillingAntiPattern}
                  goodCode={contextComposition}
                  language="tsx"
                  themeColor="cyan"
                  badLabel="❌ Prop Drilling (Rigid Chains)"
                  goodLabel="✅ Context Composition (Flexible Network)"
                  badExplanation="Props forced through unrelated components, creating maintenance nightmares"
                  goodExplanation="Components access shared data through context, remaining independent and composable"
                />
              </div>
            )}

            {/* Chapter 2: Solution */}
            {chapter === 2 && (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-cyan-500/20 p-2">
                        <Brain className="h-6 w-6 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-cyan-300">Orchestrating Components</h4>
                        <p className="text-sm text-slate-400">Like Prospero directing Ariel with precise commands, compose features by delegating to specialized components.</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded bg-slate-800/30 px-3 py-2">
                        <span className="text-sm">TemperatureDisplay</span>
                        <span className="text-xs text-cyan-400">Independent</span>
                      </div>
                      <div className="flex items-center justify-between rounded bg-slate-800/30 px-3 py-2">
                        <span className="text-sm">ForecastPanel</span>
                        <span className="text-xs text-cyan-400">Reusable</span>
                      </div>
                      <div className="flex items-center justify-between rounded bg-slate-800/30 px-3 py-2">
                        <span className="text-sm">AlertSystem</span>
                        <span className="text-xs text-cyan-400">Specialized</span>
                      </div>
                    </div>
                  </div>
                  <CodeBlock
                    code={complexFeatureComposition}
                    language="tsx"
                    variant="success"
                    title="// ✅ Composition: Complex Weather Feature"
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}

            {/* Chapter 3: Comparison */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className={`rounded-lg border p-4 ${demoMode === "inheritance" ? "border-red-500/40 bg-red-950/10" : "border-slate-700 bg-slate-900/30"}`}>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-red-500/30 flex items-center justify-center">
                        <span className="text-xs">❌</span>
                      </div>
                      <h4 className="font-bold">Inheritance Chain</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-red-500/30"></div>
                      <div className="h-2 w-3/4 rounded-full bg-red-500/30"></div>
                      <div className="h-2 w-1/2 rounded-full bg-red-500/30"></div>
                    </div>
                    <p className="mt-3 text-xs text-slate-400">Break one link, everything fails. Rigid hierarchy limits flexibility.</p>
                  </div>
                  <div className={`rounded-lg border p-4 ${demoMode === "composition" ? "border-cyan-500/40 bg-cyan-950/10" : "border-slate-700 bg-slate-900/30"}`}>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-cyan-500/30 flex items-center justify-center">
                        <span className="text-xs">✅</span>
                      </div>
                      <h4 className="font-bold">Composition Network</h4>
                    </div>
                    <div className="flex justify-center">
                      <div className="relative h-24 w-24">
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-cyan-500/10">
                          <div className="h-8 w-8 rounded-full bg-cyan-500/40"></div>
                        </div>
                        <div className="absolute left-1/2 top-0 h-8 w-0.5 -translate-x-1/2 bg-cyan-500/30"></div>
                        <div className="absolute right-0 top-1/2 h-0.5 w-8 bg-cyan-500/30"></div>
                        <div className="absolute bottom-0 left-1/2 h-8 w-0.5 -translate-x-1/2 bg-cyan-500/30"></div>
                        <div className="absolute left-0 top-1/2 h-0.5 w-8 bg-cyan-500/30"></div>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-slate-400">Independent components, resilient connections. Failure in one doesn't break others.</p>
                  </div>
                </div>
                <CodeComparison
                  badCode={complexFeatureInheritance}
                  goodCode={complexFeatureComposition}
                  language="tsx"
                  themeColor="cyan"
                  badLabel="❌ Inheritance: Bundled Logic"
                  goodLabel="✅ Composition: Independent Components"
                  badExplanation="All logic bundled together—hard to test, modify, or reuse pieces"
                  goodExplanation="Components work independently—easy to test, modify, and reuse anywhere"
                />
              </div>
            )}

            {/* Chapter 4: Summary */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-cyan-400" />
                    <div>
                      <h4 className="font-bold text-cyan-300">Clean Separation</h4>
                      <p className="text-sm text-cyan-300/80">Like Prospero releasing Ariel, composed components can cleanly unmount without tangled dependencies.</p>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Active Components</span>
                      <span className="font-mono text-cyan-300">{componentCount}</span>
                    </div>
                    <div className="h-32 rounded-lg bg-slate-900/60 p-4">
                      <div className="flex h-full items-center justify-center">
                        {isActive ? (
                          <div className="text-center">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
                              <Sparkles className="h-6 w-6 text-cyan-400" />
                            </div>
                            <p className="mt-2 text-sm text-cyan-300">Components Active</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">
                              <BookOpen className="h-6 w-6 text-slate-500" />
                            </div>
                            <p className="mt-2 text-sm text-slate-500">Components Released</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={resetDemo}
                      className="w-full rounded bg-slate-800 py-2 text-sm hover:bg-slate-700"
                    >
                      Release All Components (Clean Unmount)
                    </button>
                  </div>
                  <div>
                    <CodeBlock
                      code={`// Clean component unmounting
useEffect(() => {
  const subscription = api.subscribe();
  const timer = setInterval(update, 1000);
  
  return () => {
    // Cleanup on unmount
    subscription.unsubscribe();
    clearInterval(timer);
    console.log("Component cleanly unmounted");
  };
}, []);

// Independent components = clean separation
// No inheritance chains to untangle`}
                      language="tsx"
                      variant="success"
                      title="// ✅ Clean Component Lifecycle"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="cyan"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}