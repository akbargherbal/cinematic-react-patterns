import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Car, Wrench, Layers, Code2, Zap, AlertTriangle, CheckCircle, X, RefreshCw, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
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
    performance: { renderCount: 0, wrapperDepth: 0 }
  });
  
  const [wrapperCount, setWrapperCount] = useState<number>(0);
  const [propCollisions, setPropCollisions] = useState<number>(0);
  const [showHOCApproach, setShowHOCApproach] = useState<boolean>(true);
  const [isRunningDemo, setIsRunningDemo] = useState<boolean>(false);
  const [demoMetrics, setDemoMetrics] = useState({
    totalRenders: 0,
    bugCount: 0,
    leakCount: 0
  });
  
  const availableWrappers = ["withAuth", "withTheme", "withLogging", "withAnalytics", "withFeatureFlag"];
  const availableHooks = ["useAuth", "useTheme", "useLogging", "useAnalytics", "useFeatureFlag"];

  // Chapters from narrative
  const chapters: Chapter[] = [
    {
      title: "Yo Dawg, I Heard You Like Components",
      content: "Meet Dave and his basic UserProfile component—a reliable 1998 sedan that needs authentication. Xzibit introduces the magic of HOCs: 'We don't scrap your ride, we wrap it!' Watch as withAuth adds a velvet rope and bouncer (isAuthenticated prop) without touching the original component."
    },
    {
      title: "The Wrapper Hell Garage",
      content: "Thrilled by the first success, Dave sends his component through withTheme, withLogging, withAnalytics, and withFeatureFlag. The result is a monstrosity: conflicting sound systems, leaking fish tanks, and a dashboard buried under layers. 'You can't even see the engine under all these wrappers!' Debugging becomes impossible as he peels back wrapper after wrapper in DevTools."
    },
    {
      title: "Upgrade the Engine, Don't Wrap the Car",
      content: "Veteran mechanic Mad Mike intervenes: 'Stop wrapping the car and start upgrading the engine.' He introduces modular parts—custom Hooks like useAuth that install directly inside the component. No more mysterious garages, just clean, transparent logic living where it's used. The revelation: engineering beats magic."
    },
    {
      title: "The Drag Race: Wrapper vs. Module",
      content: "Two identical CommentList components: one built through the HOC assembly line (resulting in prop collisions and hidden bugs), the other built with modular Hooks installed side-by-side in a clean engine bay. The comparison is stark: 'One is a car hidden inside a pile of features. The other is a car with features.'"
    },
    {
      title: "Master of the Custom Garage",
      content: "Dave visits a classic codebase car show, appreciating the craftsmanship of Redux's connect() HOC while understanding its layers. Back in his own garage, his components now feature pristine engine bays with plug-and-play custom Hooks. He's no longer just a driver but a master mechanic, choosing the right tool for every job: 'For new builds, you build modular. For classics, you respect the wrap.'"
    }
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
  const addWrapper = useCallback((wrapperName: string) => {
    if (wrapperCount >= 50) {
      resetDemo();
      return;
    }
    
    setCar(prev => {
      const newWrappers = [...prev.wrappers, wrapperName];
      const newProps = { ...prev.props };
      
      // Simulate prop collision
      if (wrapperName === "withAnalytics" && prev.wrappers.includes("withAuth")) {
        setPropCollisions(c => c + 1);
        newProps.user = { source: "analytics", id: Math.random().toString(36) };
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
          wrapperDepth: newWrappers.length
        }
      };
    });
    
    setWrapperCount(c => c + 1);
    setDemoMetrics(m => ({ ...m, totalRenders: m.totalRenders + 1 }));
  }, [wrapperCount]);

  const installHook = useCallback((hookName: string) => {
    setCar(prev => ({
      ...prev,
      installedHooks: [...new Set([...prev.installedHooks, hookName])],
      performance: {
        ...prev.performance,
        renderCount: prev.performance.renderCount + 1
      }
    }));
    setDemoMetrics(m => ({ ...m, totalRenders: m.totalRenders + 1 }));
  }, []);

  const resetDemo = useCallback(() => {
    setCar({
      id: "user-profile",
      name: "UserProfile",
      baseColor: "bg-slate-700",
      wrappers: [],
      installedHooks: [],
      props: { username: "Dave", avatar: "👤" },
      performance: { renderCount: 0, wrapperDepth: 0 }
    });
    setWrapperCount(0);
    setPropCollisions(0);
    setDemoMetrics({ totalRenders: 0, bugCount: 0, leakCount: 0 });
    setIsRunningDemo(false);
  }, []);

  const toggleAuth = useCallback(() => {
    setCar(prev => ({
      ...prev,
      props: { ...prev.props, isAuthenticated: !prev.props.isAuthenticated }
    }));
  }, []);

  // Circuit breaker for wrapper hell
  useEffect(() => {
    if (wrapperCount > 45) {
      setDemoMetrics(m => ({ ...m, bugCount: m.bugCount + 1 }));
    }
    if (wrapperCount >= 50) {
      resetDemo();
    }
  }, [wrapperCount, resetDemo]);

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300 font-sans">
      {/* Header with atmospheric design */}
      <header className="border-b border-cyan-500/30 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
            <div className="flex items-center gap-3">
              <Car className="text-cyan-400 w-8 h-8" />
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Pimp My Ride</h1>
            </div>
            <div className="flex flex-col sm:items-end gap-1">
              <p className="text-sm md:text-base text-slate-400">Reality TV • Xzibit • 2004-2007</p>
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-cyan-500/50"></div>
                <span className="text-xs text-slate-500">West Coast Customs</span>
              </div>
            </div>
          </div>
          <p className="text-lg md:text-xl text-cyan-300 font-medium">
            Higher-Order Components (HOCs) vs Custom Hooks
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content - 7 columns */}
          <div className="lg:col-span-7 space-y-8">
            {/* Chapter content */}
            <section className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-slate-200">{currentChapter.title}</h2>
                <span className="text-sm bg-slate-800 px-3 py-1 rounded-full">
                  Chapter {chapter + 1} of {chapters.length}
                </span>
              </div>
              <p className="text-lg leading-relaxed text-slate-300 mb-6">
                {currentChapter.content}
              </p>
              
              {/* Memorable phrase for each chapter */}
              <div className="border-l-4 border-cyan-500 pl-4 py-2 bg-cyan-950/20">
                <p className="text-cyan-300 italic font-medium">
                  {chapter === 0 && '"We don\'t scrap your ride, we wrap it!"'}
                  {chapter === 1 && '"You can\'t even see the engine under all these wrappers!"'}
                  {chapter === 2 && '"Stop wrapping the car and start upgrading the engine."'}
                  {chapter === 3 && '"One is a car hidden inside a pile of features. The other is a car with features."'}
                  {chapter === 4 && '"For new builds, you build modular. For classics, you respect the wrap."'}
                </p>
              </div>
            </section>

            {/* Interactive demo area */}
            <section className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-200 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Interactive Garage
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowHOCApproach(!showHOCApproach)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${showHOCApproach ? 'bg-cyan-900/50 border border-cyan-500/50' : 'bg-fuchsia-900/50 border border-fuchsia-500/50'}`}
                  >
                    {showHOCApproach ? '🚗 HOC Garage' : '🔧 Hook Workshop'}
                  </button>
                  <button
                    onClick={resetDemo}
                    className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
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
                      <div className="text-sm text-slate-400 mb-2">Wrapper Layers ({car.wrappers.length})</div>
                      <div className="flex flex-wrap gap-2">
                        {car.wrappers.map((wrapper, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-1.5 bg-cyan-900/40 border border-cyan-500/30 rounded-lg text-sm flex items-center gap-2"
                          >
                            <Layers className="w-3 h-3" />
                            {wrapper}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* The "car" component */}
                  <div className={`relative ${car.baseColor} rounded-xl p-6 border-2 ${showHOCApproach && car.wrappers.length > 0 ? 'border-cyan-500' : 'border-slate-600'} transition-all duration-300 w-full max-w-md`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                          <Code2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{car.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            {car.installedHooks.length > 0 && (
                              <>
                                <Wrench className="w-3 h-3 text-fuchsia-400" />
                                <span>Hooks: {car.installedHooks.length}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Render #{car.performance.renderCount}</div>
                        <div className="text-sm font-mono">{car.wrappers.length} wrappers deep</div>
                      </div>
                    </div>

                    {/* Component content */}
                    <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-2xl">
                          {car.props.avatar || "👤"}
                        </div>
                        <div>
                          <div className="font-bold">{car.props.username || "User"}</div>
                          <div className="text-sm text-slate-400">React Developer</div>
                        </div>
                      </div>
                      
                      {/* Authentication gate */}
                      {car.props.isAuthenticated === false && (
                        <div className="bg-red-950/30 border border-red-500/30 rounded p-3 flex items-center gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span>🔒 Authentication required</span>
                        </div>
                      )}
                      {car.props.isAuthenticated === true && (
                        <div className="bg-emerald-950/30 border border-emerald-500/30 rounded p-3 flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <span>✅ Authenticated as {car.props.username}</span>
                        </div>
                      )}
                    </div>

                    {/* Current props */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(car.props).map(([key, value]) => (
                        <div key={key} className="bg-slate-800/30 rounded px-3 py-2">
                          <div className="text-slate-400 text-xs">{key}</div>
                          <div className="font-mono truncate">{JSON.stringify(value)}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Installed hooks visualization */}
                  {car.installedHooks.length > 0 && (
                    <div className="mt-4 w-full max-w-md">
                      <div className="text-sm text-slate-400 mb-2">Installed Hooks ({car.installedHooks.length})</div>
                      <div className="flex flex-wrap gap-2">
                        {car.installedHooks.map((hook, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-1.5 bg-fuchsia-900/40 border border-fuchsia-500/30 rounded-lg text-sm flex items-center gap-2"
                          >
                            <Wrench className="w-3 h-3" />
                            {hook}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {showHOCApproach ? (
                  <>
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-cyan-300 flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        HOC Assembly Line
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {availableWrappers.map(wrapper => (
                          <button
                            key={wrapper}
                            onClick={() => addWrapper(wrapper)}
                            disabled={car.wrappers.includes(wrapper)}
                            className="px-4 py-2 bg-cyan-900/40 border border-cyan-500/50 rounded-lg hover:bg-cyan-800/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            + {wrapper}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={toggleAuth}
                        className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 w-full transition-colors"
                      >
                        {car.props.isAuthenticated ? '🔓 Log Out' : '🔐 Log In'}
                      </button>
                    </div>
                    <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">HOC Pitfalls</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Wrapper Depth</span>
                          <span className={`font-mono ${car.wrappers.length > 3 ? 'text-amber-400' : 'text-slate-300'}`}>
                            {car.wrappers.length} layers
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Prop Collisions</span>
                          <span className={`font-mono ${propCollisions > 0 ? 'text-red-400' : 'text-slate-300'}`}>
                            {propCollisions} detected
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Debug Complexity</span>
                          <span className={`font-mono ${car.wrappers.length > 2 ? 'text-amber-400' : 'text-slate-300'}`}>
                            {car.wrappers.length > 2 ? 'High' : 'Low'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-fuchsia-300 flex items-center gap-2">
                        <Wrench className="w-5 h-5" />
                        Modular Hook Workshop
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {availableHooks.map(hook => (
                          <button
                            key={hook}
                            onClick={() => installHook(hook)}
                            disabled={car.installedHooks.includes(hook)}
                            className="px-4 py-2 bg-fuchsia-900/40 border border-fuchsia-500/50 rounded-lg hover:bg-fuchsia-800/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            + {hook}
                          </button>
                        ))}
                      </div>
                      <div className="text-sm text-slate-400 pt-2">
                        Hooks install directly inside the component—no wrappers, no prop collisions.
                      </div>
                    </div>
                    <div className="bg-slate-900/30 border border-slate-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">Hook Advantages</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <div>
                            <div className="font-medium">Direct Access</div>
                            <div className="text-sm text-slate-400">Logic lives where it's used</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <div>
                            <div className="font-medium">No Wrapper Hell</div>
                            <div className="text-sm text-slate-400">Flat component tree</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <div>
                            <div className="font-medium">Easy Debugging</div>
                            <div className="text-sm text-slate-400">Clear DevTools visibility</div>
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
          <div className="lg:col-span-5 space-y-6">
            {/* Code examples based on current chapter */}
            <div className="sticky top-8">
              <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-cyan-400" />
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
                      <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="w-5 h-5 text-amber-400" />
                          <h4 className="font-semibold">The Problem</h4>
                        </div>
                        <ul className="text-sm space-y-2 text-slate-300">
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
                      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle className="w-5 h-5 text-emerald-400" />
                          <h4 className="font-semibold">The Solution</h4>
                        </div>
                        <ul className="text-sm space-y-2 text-slate-300">
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
                      <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                        <h4 className="font-semibold mb-3">Legacy Appreciation</h4>
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
                        <div className="text-sm text-slate-400 mt-3">
                          Respect the craftsmanship while understanding modern alternatives.
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Demo metrics */}
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <h4 className="font-semibold mb-3">Demo Metrics</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-800/30 rounded-lg p-3">
                      <div className="text-sm text-slate-400">Total Renders</div>
                      <div className="text-2xl font-mono">{demoMetrics.totalRenders}</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-lg p-3">
                      <div className="text-sm text-slate-400">Bug Count</div>
                      <div className="text-2xl font-mono text-red-400">{demoMetrics.bugCount}</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-lg p-3">
                      <div className="text-sm text-slate-400">Wrapper Depth</div>
                      <div className="text-2xl font-mono text-cyan-400">{car.wrappers.length}</div>
                    </div>
                    <div className="bg-slate-800/30 rounded-lg p-3">
                      <div className="text-sm text-slate-400">Installed Hooks</div>
                      <div className="text-2xl font-mono text-fuchsia-400">{car.installedHooks.length}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-6 border-t border-slate-800">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous Chapter
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-slate-500">
              Progress: {Math.round(((chapter + 1) / chapters.length) * 100)}%
            </div>
            <div className="flex gap-1">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === chapter ? 'bg-cyan-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-900 text-cyan-100 rounded-lg hover:bg-cyan-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors w-full sm:w-auto justify-center"
          >
            Next Chapter
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </main>
    </div>
  );
}