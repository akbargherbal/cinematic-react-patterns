import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Car,
  Wrench,
  Layers,
  Code2,
  Zap,
  AlertTriangle,
  CheckCircle,
  X,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  title: string;
  content: string;
}

interface CarComponent {
  id: string;
  name: string;
  baseColor: string;
  wrappers: string[];
  installedHooks: string[];
  props: Record<string, any>;
  performance: {
    renderCount: number;
    wrapperDepth: number;
  };
}

export default function HigherOrderComponents(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [animationParent] = useAutoAnimate();

  // Demo states
  const [car, setCar] = useState<CarComponent>({
    id: "user-profile",
    name: "UserProfile",
    baseColor: "bg-slate-700",
    wrappers: [],
    installedHooks: [],
    props: { username: "Dave", avatar: "👤" },
    performance: { renderCount: 0, wrapperDepth: 0 },
  });

  const [wrapperCount, setWrapperCount] = useState<number>(0);
  const [propCollisions, setPropCollisions] = useState<number>(0);
  const [showHOCApproach, setShowHOCApproach] = useState<boolean>(true);
  const [isRunningDemo, setIsRunningDemo] = useState<boolean>(false);
  const [demoMetrics, setDemoMetrics] = useState({
    totalRenders: 0,
    bugCount: 0,
    leakCount: 0,
  });

  const availableWrappers = [
    "withAuth",
    "withTheme",
    "withLogging",
    "withAnalytics",
    "withFeatureFlag",
  ];
  const availableHooks = [
    "useAuth",
    "useTheme",
    "useLogging",
    "useAnalytics",
    "useFeatureFlag",
  ];

  // Chapters from narrative
  const chapters: Chapter[] = [
    {
      title: "Yo Dawg, I Heard You Like Components",
      content:
        "Meet Dave and his basic UserProfile component—a reliable 1998 sedan that needs authentication. Xzibit introduces the magic of HOCs: 'We don't scrap your ride, we wrap it!' Watch as withAuth adds a velvet rope and bouncer (isAuthenticated prop) without touching the original component.",
    },
    {
      title: "The Wrapper Hell Garage",
      content:
        "Thrilled by the first success, Dave sends his component through withTheme, withLogging, withAnalytics, and withFeatureFlag. The result is a monstrosity: conflicting sound systems, leaking fish tanks, and a dashboard buried under layers. 'You can't even see the engine under all these wrappers!' Debugging becomes impossible as he peels back wrapper after wrapper in DevTools.",
    },
    {
      title: "Upgrade the Engine, Don't Wrap the Car",
      content:
        "Veteran mechanic Mad Mike intervenes: 'Stop wrapping the car and start upgrading the engine.' He introduces modular parts—custom Hooks like useAuth that install directly inside the component. No more mysterious garages, just clean, transparent logic living where it's used. The revelation: engineering beats magic.",
    },
    {
      title: "The Drag Race: Wrapper vs. Module",
      content:
        "Two identical CommentList components: one built through the HOC assembly line (resulting in prop collisions and hidden bugs), the other built with modular Hooks installed side-by-side in a clean engine bay. The comparison is stark: 'One is a car hidden inside a pile of features. The other is a car with features.'",
    },
    {
      title: "Master of the Custom Garage",
      content:
        "Dave visits a classic codebase car show, appreciating the craftsmanship of Redux's connect() HOC while understanding its layers. Back in his own garage, his components now feature pristine engine bays with plug-and-play custom Hooks. He's no longer just a driver but a master mechanic, choosing the right tool for every job: 'For new builds, you build modular. For classics, you respect the wrap.'",
    },
  ];

  // Code examples for each concept
  const basicComponentCode = `// The basic "car" - a plain React component
function UserProfile({ username, avatar }) {
  return (
    <div className="user-profile">
      <img src={avatar} alt={username} />
      <h2>{username}</h2>
      <p>Welcome to your profile!</p>
    </div>
  );
}`;

  const hocExampleCode = `// HOC garage - wraps a component with new features
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    // Injected prop: isAuthenticated
    if (!props.isAuthenticated) {
      return <div>🔒 Please log in to view this content</div>;
    }
    return <Component {...props} />;
  };
}

// Usage: Send your component to the garage
const EnhancedUserProfile = withAuth(UserProfile);`;

  const hocHellCode = `// Multiple HOCs create wrapper hell
const SuperEnhancedProfile = withFeatureFlag(
  withAnalytics(
    withLogging(
      withTheme(
        withAuth(UserProfile)
      )
    )
  )
);

// DevTools show: 
// <WithFeatureFlag>
//   <WithAnalytics>
//     <WithLogging>
//       <WithTheme>
//         <WithAuth>
//           <UserProfile ... />
//         </WithAuth>
//       </WithTheme>
//     </WithLogging>
//   </WithAnalytics>
// </WithFeatureFlag>`;

  const hookExampleCode = `// Modular part - installs inside the component
import { useAuth } from './hooks/useAuth';

function UserProfile({ username, avatar }) {
  // Install the "part" directly in the engine
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <div>🔒 Please log in to view this content</div>;
  }
  
  return (
    <div className="user-profile">
      <img src={avatar} alt={username} />
      <h2>{username}</h2>
      <p>Welcome back, {user.name}!</p>
    </div>
  );
}`;

  const propCollisionCode = `// ❌ Prop collision when multiple HOCs inject "user"
const EnhancedComponent = withAnalytics(
  withAuth(Component)
);

// Both inject a "user" prop - analytics overwrites auth!
<EnhancedComponent 
  user={{ id: 'analytics-id' }} // from withAnalytics
  // auth user object is lost
/>

// ✅ Hooks avoid collisions with clear naming
function Component() {
  const { user: authUser } = useAuth();
  const { user: analyticsUser } = useAnalytics();
  // Both values available, no overwriting
}`;

  // Interactive demo functions
  const addWrapper = useCallback(
    (wrapperName: string) => {
      if (wrapperCount >= 50) {
        resetDemo();
        return;
      }

      setCar((prev) => {
        const newWrappers = [...prev.wrappers, wrapperName];
        const newProps = { ...prev.props };

        // Simulate prop collision
        if (
          wrapperName === "withAnalytics" &&
          prev.wrappers.includes("withAuth")
        ) {
          setPropCollisions((c) => c + 1);
          newProps.user = {
            source: "analytics",
            id: Math.random().toString(36),
          };
        }
        if (wrapperName === "withAuth" && !prev.props.isAuthenticated) {
          newProps.isAuthenticated = false;
        }
        if (wrapperName === "withTheme" && !prev.props.theme) {
          newProps.theme = "dark";
        }

        return {
          ...prev,
          wrappers: newWrappers,
          props: newProps,
          performance: {
            renderCount: prev.performance.renderCount + 1,
            wrapperDepth: newWrappers.length,
          },
        };
      });

      setWrapperCount((c) => c + 1);
      setDemoMetrics((m) => ({ ...m, totalRenders: m.totalRenders + 1 }));
    },
    [wrapperCount],
  );

  const installHook = useCallback((hookName: string) => {
    setCar((prev) => ({
      ...prev,
      installedHooks: [...new Set([...prev.installedHooks, hookName])],
      performance: {
        ...prev.performance,
        renderCount: prev.performance.renderCount + 1,
      },
    }));
    setDemoMetrics((m) => ({ ...m, totalRenders: m.totalRenders + 1 }));
  }, []);

  const resetDemo = useCallback(() => {
    setCar({
      id: "user-profile",
      name: "UserProfile",
      baseColor: "bg-slate-700",
      wrappers: [],
      installedHooks: [],
      props: { username: "Dave", avatar: "👤" },
      performance: { renderCount: 0, wrapperDepth: 0 },
    });
    setWrapperCount(0);
    setPropCollisions(0);
    setDemoMetrics({ totalRenders: 0, bugCount: 0, leakCount: 0 });
    setIsRunningDemo(false);
  }, []);

  const toggleAuth = useCallback(() => {
    setCar((prev) => ({
      ...prev,
      props: { ...prev.props, isAuthenticated: !prev.props.isAuthenticated },
    }));
  }, []);

  // Circuit breaker for wrapper hell
  useEffect(() => {
    if (wrapperCount > 45) {
      setDemoMetrics((m) => ({ ...m, bugCount: m.bugCount + 1 }));
    }
    if (wrapperCount >= 50) {
      resetDemo();
    }
  }, [wrapperCount, resetDemo]);

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 font-sans text-slate-300">
      {/* Header with atmospheric design */}
      <header className="border-b border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Car className="h-8 w-8 text-cyan-400" />
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                Pimp My Ride
              </h1>
            </div>
            <div className="flex flex-col gap-1 sm:items-end">
              <p className="text-sm text-slate-400 md:text-base">
                Reality TV • Xzibit • 2004-2007
              </p>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-cyan-500/50"></div>
                <span className="text-xs text-slate-500">
                  West Coast Customs
                </span>
              </div>
            </div>
          </div>
          <p className="text-lg font-medium text-cyan-300 md:text-xl">
            Higher-Order Components (HOCs) vs Custom Hooks
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main content - 7 columns */}
          <div className="space-y-8 lg:col-span-7">
            {/* Chapter content */}
            <section className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-200">
                  {currentChapter.title}
                </h2>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
                  Chapter {chapter + 1} of {chapters.length}
                </span>
              </div>
              <p className="mb-6 text-lg leading-relaxed text-slate-300">
                {currentChapter.content}
              </p>

              {/* Memorable phrase for each chapter */}
              <div className="border-l-4 border-cyan-500 bg-cyan-950/20 py-2 pl-4">
                <p className="font-medium text-cyan-300 italic">
                  {chapter === 0 && '"We don\'t scrap your ride, we wrap it!"'}
                  {chapter === 1 &&
                    '"You can\'t even see the engine under all these wrappers!"'}
                  {chapter === 2 &&
                    '"Stop wrapping the car and start upgrading the engine."'}
                  {chapter === 3 &&
                    '"One is a car hidden inside a pile of features. The other is a car with features."'}
                  {chapter === 4 &&
                    '"For new builds, you build modular. For classics, you respect the wrap."'}
                </p>
              </div>
            </section>

            {/* Interactive demo area */}
            <section className="rounded-xl border border-slate-700 bg-slate-900/50 p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-bold text-slate-200">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  Interactive Garage
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHOCApproach(!showHOCApproach)}
                    className={`rounded-lg px-4 py-2 transition-all duration-300 ${showHOCApproach ? "border border-cyan-500/50 bg-cyan-900/50" : "border border-fuchsia-500/50 bg-fuchsia-900/50"}`}
                  >
                    {showHOCApproach ? "🚗 HOC Garage" : "🔧 Hook Workshop"}
                  </button>
                  <button
                    onClick={resetDemo}
                    className="flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 transition-colors hover:bg-slate-700"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Component visualization - the "car" */}
              <div className="mb-8" ref={animationParent}>
                <div className="flex flex-col items-center">
                  {/* Wrapper layers visualization */}
                  {car.wrappers.length > 0 && (
                    <div className="mb-4 w-full max-w-md">
                      <div className="mb-2 text-sm text-slate-400">
                        Wrapper Layers ({car.wrappers.length})
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {car.wrappers.map((wrapper, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-900/40 px-3 py-1.5 text-sm"
                          >
                            <Layers className="h-3 w-3" />
                            {wrapper}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* The "car" component */}
                  <div
                    className={`relative ${car.baseColor} rounded-xl border-2 p-6 ${showHOCApproach && car.wrappers.length > 0 ? "border-cyan-500" : "border-slate-600"} w-full max-w-md transition-all duration-300`}
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800">
                          <Code2 className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold">{car.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            {car.installedHooks.length > 0 && (
                              <>
                                <Wrench className="h-3 w-3 text-fuchsia-400" />
                                <span>Hooks: {car.installedHooks.length}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">
                          Render #{car.performance.renderCount}
                        </div>
                        <div className="font-mono text-sm">
                          {car.wrappers.length} wrappers deep
                        </div>
                      </div>
                    </div>

                    {/* Component content */}
                    <div className="mb-4 rounded-lg bg-slate-800/50 p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-700 text-2xl">
                          {car.props.avatar || "👤"}
                        </div>
                        <div>
                          <div className="font-bold">
                            {car.props.username || "User"}
                          </div>
                          <div className="text-sm text-slate-400">
                            React Developer
                          </div>
                        </div>
                      </div>

                      {/* Authentication gate */}
                      {car.props.isAuthenticated === false && (
                        <div className="flex items-center gap-3 rounded border border-red-500/30 bg-red-950/30 p-3">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                          <span>🔒 Authentication required</span>
                        </div>
                      )}
                      {car.props.isAuthenticated === true && (
                        <div className="flex items-center gap-3 rounded border border-emerald-500/30 bg-emerald-950/30 p-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <span>✅ Authenticated as {car.props.username}</span>
                        </div>
                      )}
                    </div>

                    {/* Current props */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(car.props).map(([key, value]) => (
                        <div
                          key={key}
                          className="rounded bg-slate-800/30 px-3 py-2"
                        >
                          <div className="text-xs text-slate-400">{key}</div>
                          <div className="truncate font-mono">
                            {JSON.stringify(value)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Installed hooks visualization */}
                  {car.installedHooks.length > 0 && (
                    <div className="mt-4 w-full max-w-md">
                      <div className="mb-2 text-sm text-slate-400">
                        Installed Hooks ({car.installedHooks.length})
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {car.installedHooks.map((hook, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 rounded-lg border border-fuchsia-500/30 bg-fuchsia-900/40 px-3 py-1.5 text-sm"
                          >
                            <Wrench className="h-3 w-3" />
                            {hook}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {showHOCApproach ? (
                  <>
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-cyan-300">
                        <Layers className="h-5 w-5" />
                        HOC Assembly Line
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {availableWrappers.map((wrapper) => (
                          <button
                            key={wrapper}
                            onClick={() => addWrapper(wrapper)}
                            disabled={car.wrappers.includes(wrapper)}
                            className="rounded-lg border border-cyan-500/50 bg-cyan-900/40 px-4 py-2 transition-colors hover:bg-cyan-800/60 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            + {wrapper}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={toggleAuth}
                        className="w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 transition-colors hover:bg-slate-700"
                      >
                        {car.props.isAuthenticated ? "🔓 Log Out" : "🔐 Log In"}
                      </button>
                    </div>
                    <div className="rounded-lg border border-slate-700 bg-slate-900/30 p-4">
                      <h4 className="mb-2 text-lg font-semibold">
                        HOC Pitfalls
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Wrapper Depth</span>
                          <span
                            className={`font-mono ${car.wrappers.length > 3 ? "text-amber-400" : "text-slate-300"}`}
                          >
                            {car.wrappers.length} layers
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">
                            Prop Collisions
                          </span>
                          <span
                            className={`font-mono ${propCollisions > 0 ? "text-red-400" : "text-slate-300"}`}
                          >
                            {propCollisions} detected
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">
                            Debug Complexity
                          </span>
                          <span
                            className={`font-mono ${car.wrappers.length > 2 ? "text-amber-400" : "text-slate-300"}`}
                          >
                            {car.wrappers.length > 2 ? "High" : "Low"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      <h4 className="flex items-center gap-2 text-lg font-semibold text-fuchsia-300">
                        <Wrench className="h-5 w-5" />
                        Modular Hook Workshop
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {availableHooks.map((hook) => (
                          <button
                            key={hook}
                            onClick={() => installHook(hook)}
                            disabled={car.installedHooks.includes(hook)}
                            className="rounded-lg border border-fuchsia-500/50 bg-fuchsia-900/40 px-4 py-2 transition-colors hover:bg-fuchsia-800/60 disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            + {hook}
                          </button>
                        ))}
                      </div>
                      <div className="pt-2 text-sm text-slate-400">
                        Hooks install directly inside the component—no wrappers,
                        no prop collisions.
                      </div>
                    </div>
                    <div className="rounded-lg border border-slate-700 bg-slate-900/30 p-4">
                      <h4 className="mb-2 text-lg font-semibold">
                        Hook Advantages
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <div>
                            <div className="font-medium">Direct Access</div>
                            <div className="text-sm text-slate-400">
                              Logic lives where it's used
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <div>
                            <div className="font-medium">No Wrapper Hell</div>
                            <div className="text-sm text-slate-400">
                              Flat component tree
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <div>
                            <div className="font-medium">Easy Debugging</div>
                            <div className="text-sm text-slate-400">
                              Clear DevTools visibility
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar with code examples - 5 columns */}
          <div className="space-y-6 lg:col-span-5">
            {/* Code examples based on current chapter */}
            <div className="sticky top-8">
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-6 backdrop-blur-sm">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-200">
                  <Code2 className="h-5 w-5 text-cyan-400" />
                  Code Examples
                </h3>

                <div className="space-y-6">
                  {chapter === 0 && (
                    <>
                      <CodeBlock
                        code={basicComponentCode}
                        variant="default"
                        title="// 🚗 Basic Component - The 'Car'"
                        language="jsx"
                        defaultExpanded={true}
                      />
                      <CodeBlock
                        code={hocExampleCode}
                        variant="success"
                        title="// ✅ HOC Pattern - The 'Garage'"
                        language="jsx"
                        defaultExpanded={true}
                      />
                    </>
                  )}

                  {chapter === 1 && (
                    <>
                      <CodeBlock
                        code={hocHellCode}
                        variant="error"
                        title="// ❌ HOC Hell - Multiple Wrappers"
                        language="jsx"
                        defaultExpanded={true}
                      />
                      <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
                        <div className="mb-2 flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-amber-400" />
                          <h4 className="font-semibold">The Problem</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li>• DevTools show 5+ nested wrapper components</li>
                          <li>• Prop sources become untraceable</li>
                          <li>• Name collisions silently overwrite data</li>
                          <li>• Performance degrades with each layer</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {chapter === 2 && (
                    <>
                      <CodeBlock
                        code={hookExampleCode}
                        variant="success"
                        title="// ✅ Custom Hook - Modular 'Parts'"
                        language="jsx"
                        defaultExpanded={true}
                      />
                      <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                        <div className="mb-2 flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <h4 className="font-semibold">The Solution</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li>• Logic lives inside the component function</li>
                          <li>• No wrapper components in DevTools</li>
                          <li>• Values are clearly named and scoped</li>
                          <li>• Easy to compose multiple hooks</li>
                        </ul>
                      </div>
                    </>
                  )}

                  {chapter === 3 && (
                    <>
                      <CodeBlock
                        code={propCollisionCode}
                        variant="error"
                        title="// ❌ HOC Prop Collision"
                        language="jsx"
                        defaultExpanded={true}
                      />
                      <CodeBlock
                        code={hookExampleCode}
                        variant="success"
                        title="// ✅ Hook Clean Composition"
                        language="jsx"
                        defaultExpanded={true}
                      />
                    </>
                  )}

                  {chapter === 4 && (
                    <>
                      <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-4">
                        <h4 className="mb-3 font-semibold">
                          Legacy Appreciation
                        </h4>
                        <CodeBlock
                          code={`// Classic Redux connect() HOC
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user,
  theme: state.theme
});

const mapDispatchToProps = { login, logout };

// Wrapping component with Redux store access
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);`}
                          variant="default"
                          title="// 🏛️ Legacy Pattern - React Redux connect()"
                          language="jsx"
                          defaultExpanded={true}
                        />
                        <div className="mt-3 text-sm text-slate-400">
                          Respect the craftsmanship while understanding modern
                          alternatives.
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Demo metrics */}
                <div className="mt-8 border-t border-slate-700 pt-6">
                  <h4 className="mb-3 font-semibold">Demo Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-slate-800/30 p-3">
                      <div className="text-sm text-slate-400">
                        Total Renders
                      </div>
                      <div className="font-mono text-2xl">
                        {demoMetrics.totalRenders}
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-800/30 p-3">
                      <div className="text-sm text-slate-400">Bug Count</div>
                      <div className="font-mono text-2xl text-red-400">
                        {demoMetrics.bugCount}
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-800/30 p-3">
                      <div className="text-sm text-slate-400">
                        Wrapper Depth
                      </div>
                      <div className="font-mono text-2xl text-cyan-400">
                        {car.wrappers.length}
                      </div>
                    </div>
                    <div className="rounded-lg bg-slate-800/30 p-3">
                      <div className="text-sm text-slate-400">
                        Installed Hooks
                      </div>
                      <div className="font-mono text-2xl text-fuchsia-400">
                        {car.installedHooks.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-slate-300 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Chapter
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden text-sm text-slate-500 sm:block">
              Progress: {Math.round(((chapter + 1) / chapters.length) * 100)}%
            </div>
            <div className="flex gap-1">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`h-3 w-3 rounded-full transition-all ${idx === chapter ? "bg-cyan-500" : "bg-slate-700 hover:bg-slate-600"}`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() =>
              setChapter(Math.min(chapters.length - 1, chapter + 1))
            }
            disabled={chapter === chapters.length - 1}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-900 px-6 py-3 text-cyan-100 transition-colors hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
          >
            Next Chapter
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </main>
    </div>
  );
}
