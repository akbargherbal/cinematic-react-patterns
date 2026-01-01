import { useState, useReducer, useEffect, useCallback } from "react";
import { Brain, Zap, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, RefreshCw, Eye, Code, Activity } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const themeColor = 'cyan'; // Try changing to 'amber', 'purple', etc.
import ModuleHeader from '@/components/common/ModuleHeader';

// ==================== TYPES ====================
interface CrimeVision {
  id: string;
  type: 'SIMPLE_CRIME' | 'CONDITIONAL_SEQUENCE' | 'MULTI_DEPENDENCY';
  victim: string;
  perpetrator: string;
  time: string;
  condition?: string;
}

interface PreCrimeState {
  timeline: string[];
  assignedTeam: string | null;
  alertLevel: 'GREEN' | 'YELLOW' | 'RED';
  pendingCrimes: CrimeVision[];
  preventedCrimes: number;
  chaosLevel: number;
}

type Action = 
  | { type: 'RECEIVE_VISION'; vision: CrimeVision }
  | { type: 'ASSIGN_TEAM'; team: string }
  | { type: 'UPDATE_ALERT'; level: PreCrimeState['alertLevel'] }
  | { type: 'PREVENT_CRIME'; crimeId: string }
  | { type: 'RESET_SYSTEM' };

// ==================== REDUCER ====================
const precogReducer = (state: PreCrimeState, action: Action): PreCrimeState => {
  switch (action.type) {
    case 'RECEIVE_VISION':
      // Centralized logic: Handle all vision types in one place
      const newTimeline = [...state.timeline, 
        `${action.vision.time}: ${action.vision.type} - ${action.vision.perpetrator} → ${action.vision.victim}`
      ];
      
      let newAlertLevel = state.alertLevel;
      if (action.vision.type === 'MULTI_DEPENDENCY') newAlertLevel = 'RED';
      else if (action.vision.type === 'CONDITIONAL_SEQUENCE') newAlertLevel = 'YELLOW';
      
      return {
        ...state,
        timeline: newTimeline.slice(-3), // Keep only last 3
        pendingCrimes: [...state.pendingCrimes, action.vision],
        alertLevel: newAlertLevel,
        chaosLevel: state.chaosLevel + (action.vision.type === 'CONDITIONAL_SEQUENCE' ? 10 : 0)
      };
      
    case 'ASSIGN_TEAM':
      return { ...state, assignedTeam: action.team };
      
    case 'UPDATE_ALERT':
      return { ...state, alertLevel: action.level };
      
    case 'PREVENT_CRIME':
      return {
        ...state,
        pendingCrimes: state.pendingCrimes.filter(c => c.id !== action.crimeId),
        preventedCrimes: state.preventedCrimes + 1,
        chaosLevel: Math.max(0, state.chaosLevel - 15)
      };
      
    case 'RESET_SYSTEM':
      return initialState;
      
    default:
      return state;
  }
};

const initialState: PreCrimeState = {
  timeline: [],
  assignedTeam: null,
  alertLevel: 'GREEN',
  pendingCrimes: [],
  preventedCrimes: 0,
  chaosLevel: 0
};

// ==================== COMPONENT ====================
export default function UseReducerMinorityReport(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'broken' | 'fixed'>('fixed');
  const [state, dispatch] = useReducer(precogReducer, initialState);
  const [timelineView, setTimelineView] = useState<boolean>(true);
  const [autoAnimateRef] = useAutoAnimate();
  
  // Circuit breaker for chaos
  useEffect(() => {
    if (state.chaosLevel > 50) {
      setTimeout(() => {
        dispatch({ type: 'RESET_SYSTEM' });
      }, 1000);
    }
  }, [state.chaosLevel]);
  
  // ==================== CHAPTERS ====================
  const chapters = [
    {
      title: "The Temple of State",
      content: "The air in the Temple is cool and still, thick with the scent of ozone and sterile fluids. It hums with a low, resonant frequency that you feel in your teeth. This is the heart of PreCrime, where the future is born. The PreCogs are a single, unified processing unit—a source of pure, undeniable truth. The future is just a state we haven't rendered yet."
    },
    {
      title: "The Chaos of Intersecting Futures",
      content: "The first vision arrives: a simple robbery. Then a second: a conditional kidnapping that only happens if the maglev train is on time. Then a third: a car chase from the kidnapping's father. Anderton manually updates timeline, team assignments, and alert levels with separate useState calls. The screen becomes a mess of overlapping windows. 'Every vision is another piece of state I have to manage myself!' The system, fractured by scattered logic, fails."
    },
    {
      title: "The Reducer Protocol",
      content: "Dr. Hineman explains: 'Stop trying to be the reducer, John. Just dispatch the vision.' The PreCogs see contradictions and dependencies—their unified vision is the reconciliation. Anderton defines a protocol: a single reducer function that handles all state transitions. He packages three conflicting visions into one descriptive action and dispatches it. A single wooden ball returns with a perfectly reconciled future."
    },
    {
      title: "The Two Timelines",
      content: "A new complex case: bank heist, power grid failure, solar flare. Fletcher tries the old way—multiple useState hooks, manual dependency tracking. The room becomes a cacophony of alarms. Anderton steps in, composes one action with all dependencies, and dispatches it. The reducer processes everything, returning a single coherent directive. 'The logic doesn't belong on the floor; it belongs in the Temple.'"
    },
    {
      title: "The Elegance of Dispatch",
      content: "'This is our initial state,' Anderton says, holding a blank wooden ball. 'This is an action,' holding a data puck. 'The reducer lives in the Temple. Our job is no longer to manage the state. We describe what happened. We dispatch the action. The reducer does the rest.' The system handles complex alerts with effortless grace: Dispatch → Reduce → Render. Harmony."
    }
  ];
  
  // ==================== DEMO UTILITIES ====================
  const generateVision = (type: CrimeVision['type']): CrimeVision => ({
    id: Date.now().toString(),
    type,
    victim: ['Leo Crow', 'Sarah Marks', 'Alex Rivera'][Math.floor(Math.random() * 3)],
    perpetrator: ['Donald Dubin', 'Howard Marks', 'Elias Vaughn'][Math.floor(Math.random() * 3)],
    time: `${Math.floor(Math.random() * 23)}:${Math.random() > 0.5 ? '15' : '45'}`,
    condition: type === 'CONDITIONAL_SEQUENCE' ? 'If maglev train is on time' : undefined
  });
  
  const handleReceiveVision = useCallback(() => {
    const types: CrimeVision['type'][] = ['SIMPLE_CRIME', 'CONDITIONAL_SEQUENCE', 'MULTI_DEPENDENCY'];
    const vision = generateVision(types[Math.floor(Math.random() * types.length)]);
    dispatch({ type: 'RECEIVE_VISION', vision });
  }, []);
  
  const handlePreventCrime = useCallback(() => {
    if (state.pendingCrimes.length > 0) {
      const crime = state.pendingCrimes[0];
      dispatch({ type: 'PREVENT_CRIME', crimeId: crime.id });
    }
  }, [state.pendingCrimes]);
  
  const resetSystem = useCallback(() => {
    dispatch({ type: 'RESET_SYSTEM' });
  }, []);
  
  // ==================== CODE EXAMPLES ====================
  const brokenCode = `// ❌ ANTI-PATTERN: Multiple useState hooks
const [timeline, setTimeline] = useState([]);
const [assignedTeam, setAssignedTeam] = useState(null);
const [alertLevel, setAlertLevel] = useState('GREEN');
const [pendingCrimes, setPendingCrimes] = useState([]);

// Receiving a vision requires manual coordination
const handleVision = (vision) => {
  setTimeline([...timeline, \`\${vision.time}: \${vision.type}\`]);
  setPendingCrimes([...pendingCrimes, vision]);
  
  // Need to remember all dependencies
  if (vision.type === 'CONDITIONAL_SEQUENCE') {
    setAlertLevel('YELLOW');
    // Did we update everything? What about team assignment?
  }
};`;

  const fixedCode = `// ✅ SOLUTION: Centralized reducer
const precogReducer = (state, action) => {
  switch (action.type) {
    case 'RECEIVE_VISION':
      return {
        ...state,
        timeline: [...state.timeline, action.vision.details],
        pendingCrimes: [...state.pendingCrimes, action.vision],
        alertLevel: action.vision.conditional ? 'YELLOW' : state.alertLevel
        // All logic in one place!
      };
    // Other actions: ASSIGN_TEAM, PREVENT_CRIME, etc.
  }
};

const [state, dispatch] = useReducer(precogReducer, initialState);

// Dispatch is the only way to update state
const handleVision = (vision) => {
  dispatch({ type: 'RECEIVE_VISION', vision });
};`;

  const dispatchExample = `// 🎯 ELEGANT DISPATCH PATTERN
// 1. Describe what happened (action)
const action = {
  type: 'COMPLEX_CRIME_SEQUENCE',
  payload: {
    events: [vision1, vision2, vision3],
    dependencies: ['train_schedule', 'grid_status']
  }
};

// 2. Dispatch to reducer
dispatch(action);

// 3. Reducer handles ALL logic
// 4. New state is returned automatically
// Clean, predictable, maintainable`;

  // ==================== RENDER ====================
  const currentChapter = chapters[chapter];
  
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      <ModuleHeader
        icon={Brain}
        title="Minority Report"
        subtitle="PreCrime • John Anderton • 2002"
        concept="useReducer for Complex State Management"
        themeColor="cyan"
      />

      
      {/* MAIN CONTENT - Two Column Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN - Content & Demos */}
        <div className="lg:col-span-8 space-y-8">
          {/* Chapter Content */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">{currentChapter.title}</h2>
              <span className="text-sm text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                Chapter {chapter + 1} of 5
              </span>
            </div>
            
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="leading-relaxed text-slate-300 text-base md:text-lg">
                {currentChapter.content}
              </p>
            </div>
          </section>
          
          {/* Interactive Demo */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                PreCrime System Simulation
              </h3>
              
              {chapter === 3 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => setDemoMode('broken')}
                    className={`px-3 py-1.5 text-sm rounded transition-all ${demoMode === 'broken' ? 'bg-red-500/20 border border-red-500/50 text-red-400' : 'bg-slate-800 text-slate-400'}`}
                  >
                    ❌ Manual State
                  </button>
                  <button
                    onClick={() => setDemoMode('fixed')}
                    className={`px-3 py-1.5 text-sm rounded transition-all ${demoMode === 'fixed' ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}
                  >
                    ✅ Reducer Protocol
                  </button>
                </div>
              )}
            </div>
            
            {/* Demo Content per Chapter */}
            <div ref={autoAnimateRef} className="space-y-6">
              {/* Chapter 1: Simple Reducer */}
              {chapter === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={handleReceiveVision}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-5 h-5" />
                      Receive Vision
                    </button>
                    <button
                      onClick={handlePreventCrime}
                      disabled={state.pendingCrimes.length === 0}
                      className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Prevent Crime
                    </button>
                  </div>
                  
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-300">System Status</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${state.alertLevel === 'GREEN' ? 'bg-emerald-500/20 text-emerald-400' : state.alertLevel === 'YELLOW' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                        {state.alertLevel} ALERT
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">Prevented Crimes</p>
                        <p className="text-2xl font-mono text-emerald-400">{state.preventedCrimes}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Pending Visions</p>
                        <p className="text-2xl font-mono text-yellow-400">{state.pendingCrimes.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Chapter 2: Anti-pattern chaos */}
              {chapter === 1 && (
                <div className="space-y-6">
                  <CodeBlock
                    code={brokenCode}
                    variant="error"
                    title="// ❌ Manual State Management (Chaos)"
                    defaultExpanded={true}
                  />
                  
                  <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <h4 className="font-medium text-red-400">Chaos Meter</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-red-900/50 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, state.chaosLevel)}%` }}
                        />
                      </div>
                      <p className="text-sm text-slate-400">
                        Managing state with multiple useState hooks increases system chaos.
                        {state.chaosLevel > 30 && " Critical levels detected!"}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Chapter 3: Reducer solution */}
              {chapter === 2 && (
                <div className="space-y-6">
                  <CodeBlock
                    code={fixedCode}
                    variant="success"
                    title="// ✅ Centralized Reducer Logic"
                    defaultExpanded={true}
                  />
                  
                  <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-cyan-400" />
                      <h4 className="font-medium text-cyan-400">Reducer in Action</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Last Action:</span>
                        <span className="text-cyan-300 font-mono">RECEIVE_VISION</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">State Updates:</span>
                        <span className="text-emerald-300 font-mono">Single atomic update</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Logic Location:</span>
                        <span className="text-cyan-300 font-mono">Centralized reducer</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Chapter 4: Comparison */}
              {chapter === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`border rounded-lg p-4 transition-all ${demoMode === 'broken' ? 'border-red-500/50 bg-red-950/10' : 'border-slate-700/50 bg-slate-900/30'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <h4 className="font-medium text-slate-300">Manual Approach</h4>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">
                        Multiple useState hooks, scattered logic, manual dependency tracking.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                          <span>Race conditions</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                          <span>Stale closures</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                          <span>Complex bug fixes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`border rounded-lg p-4 transition-all ${demoMode === 'fixed' ? 'border-cyan-500/50 bg-cyan-950/10' : 'border-slate-700/50 bg-slate-900/30'}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-cyan-400" />
                        <h4 className="font-medium text-slate-300">Reducer Protocol</h4>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">
                        Single dispatch, centralized logic, predictable state transitions.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2" />
                          <span>Atomic updates</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2" />
                          <span>Easy debugging</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2" />
                          <span>Testable logic</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Chapter 5: Elegant dispatch */}
              {chapter === 4 && (
                <div className="space-y-6">
                  <CodeBlock
                    code={dispatchExample}
                    variant="success"
                    title="// 🎯 Elegant Dispatch Pattern"
                    defaultExpanded={true}
                  />
                  
                  <div className="bg-gradient-to-r from-cyan-950/20 to-emerald-950/20 border border-cyan-500/30 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Activity className="w-5 h-5 text-cyan-400" />
                      <h4 className="font-medium text-white">System Harmony</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-400 mb-1">1</div>
                          <p className="text-xs text-slate-400">Describe Action</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-400 mb-1">2</div>
                          <p className="text-xs text-slate-400">Dispatch</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-400 mb-1">3</div>
                          <p className="text-xs text-slate-400">Render State</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 text-center">
                        Clean flow of information → Predictable state → Maintainable code
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Reset Button */}
            {(chapter === 1 || chapter === 3) && (
              <div className="mt-6 pt-6 border-t border-slate-800">
                <button
                  onClick={resetSystem}
                  className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset System Simulation
                </button>
              </div>
            )}
          </section>
          
          {/* Navigation */}
          <nav className="flex items-center justify-between pt-6 border-t border-slate-800">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                {chapters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChapter(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${chapter === idx ? 'bg-cyan-500' : 'bg-slate-700 hover:bg-slate-600'}`}
                    aria-label={`Go to chapter ${idx + 1}`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-400 font-mono">
                Chapter {chapter + 1} of {chapters.length}
              </span>
            </div>
            
            <button
              onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
              disabled={chapter === chapters.length - 1}
              className="flex items-center gap-2 px-5 py-3 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-30 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </nav>
        </div>
        
        {/* RIGHT COLUMN - Sticky Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* System Status Card */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                Temple Status
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Timeline Integrity</span>
                    <span className="text-emerald-400 font-mono">{100 - state.chaosLevel}%</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${100 - Math.min(100, state.chaosLevel)}%` }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-sm text-slate-400 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-yellow-400 font-mono">{state.pendingCrimes.length}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-sm text-slate-400 mb-1">Prevented</p>
                    <p className="text-2xl font-bold text-emerald-400 font-mono">{state.preventedCrimes}</p>
                  </div>
                </div>
                
                <div className="bg-slate-800/30 rounded-lg p-3">
                  <p className="text-sm text-slate-400 mb-2">Active Team</p>
                  <p className="text-cyan-300 font-medium">
                    {state.assignedTeam || 'Awaiting assignment...'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Vision Log */}
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 text-cyan-400" />
                  Recent Visions
                </h3>
                <button
                  onClick={() => setTimelineView(!timelineView)}
                  className="text-sm text-slate-400 hover:text-slate-300"
                >
                  {timelineView ? 'Show Details' : 'Show Timeline'}
                </button>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {timelineView ? (
                  state.timeline.length > 0 ? (
                    state.timeline.map((event, idx) => (
                      <div key={idx} className="bg-slate-800/30 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-cyan-500" />
                          <span className="text-sm text-slate-300 font-medium">{event}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-center py-4">No timeline events yet</p>
                  )
                ) : (
                  state.pendingCrimes.length > 0 ? (
                    state.pendingCrimes.map((crime) => (
                      <div key={crime.id} className="bg-slate-800/30 rounded p-3">
                        <div className="flex justify-between items-start mb-1">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded ${crime.type === 'SIMPLE_CRIME' ? 'bg-blue-500/20 text-blue-400' : crime.type === 'CONDITIONAL_SEQUENCE' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                            {crime.type.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-slate-400">{crime.time}</span>
                        </div>
                        <p className="text-sm text-slate-300">
                          {crime.perpetrator} → {crime.victim}
                        </p>
                        {crime.condition && (
                          <p className="text-xs text-slate-500 mt-1">Condition: {crime.condition}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-center py-4">No pending crimes</p>
                  )
                )}
              </div>
            </div>
            
            {/* Key Insight */}
            <div className="bg-gradient-to-br from-cyan-950/30 to-slate-900/50 border border-cyan-500/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" />
                Key Insight
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {chapter === 0 && "useReducer centralizes state logic in one place—like the Temple housing the PreCogs."}
                {chapter === 1 && "Multiple useState hooks scatter logic, creating race conditions and stale state bugs."}
                {chapter === 2 && "The reducer is a pure function: given (state, action), it returns the next state."}
                {chapter === 3 && "Dispatch is the only way to update state—predictable, debuggable, maintainable."}
                {chapter === 4 && "We don't manage state; we describe what happened. The reducer handles the rest."}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* SAFETY CIRCUIT BREAKER (Hidden but always present) */}
      {state.chaosLevel > 40 && (
        <div className="fixed bottom-4 right-4 bg-red-900/90 border border-red-500/50 text-red-100 text-sm px-4 py-2 rounded-lg animate-pulse">
          ⚡ Chaos level critical ({state.chaosLevel}/50). System will auto-reset.
        </div>
      )}
    </div>
  );
}