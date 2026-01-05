import React, { useState, useReducer, useMemo, useCallback } from "react";
import { Scale, Swords, CheckCircle, Flame, History } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";
import { AnimatePresence, motion } from "framer-motion";

// --- State and Reducer Definition ---

interface RelationshipState {
  anger: number;
  trust: number;
  loyalty: number;
  alliance: 'shaky' | 'strained' | 'solid';
}

type RelationshipAction =
  | { type: 'ACCUSATION'; payload: { severity: 'minor' | 'major' } }
  | { type: 'APOLOGY' }
  | { type: 'EXPLANATION' }
  | { type: 'RESET' };

const initialState: RelationshipState = {
  anger: 60,
  trust: 40,
  loyalty: 70,
  alliance: 'strained',
};

function relationshipReducer(state: RelationshipState, action: RelationshipAction): RelationshipState {
  switch (action.type) {
    case 'ACCUSATION':
      const angerIncrease = action.payload.severity === 'major' ? 30 : 15;
      const newAnger = Math.min(100, state.anger + angerIncrease);
      const newTrust = Math.max(0, state.trust - 20);
      return {
        ...state,
        anger: newAnger,
        trust: newTrust,
        alliance: newAnger > 75 || newTrust < 25 ? 'shaky' : 'strained',
      };
    case 'APOLOGY':
      const reconciledAnger = Math.max(0, state.anger - 40);
      const restoredLoyalty = Math.min(100, state.loyalty + 15);
      return {
        ...state,
        anger: reconciledAnger,
        loyalty: restoredLoyalty,
        alliance: reconciledAnger < 30 && restoredLoyalty > 80 ? 'solid' : 'strained',
      };
    case 'EXPLANATION':
        const reducedAnger = Math.max(0, state.anger - 20);
        const increasedTrust = Math.min(100, state.trust + 25);
        return {
            ...state,
            anger: reducedAnger,
            trust: increasedTrust,
            alliance: increasedTrust > 60 ? 'solid' : 'strained',
        };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// --- Anti-Pattern State Management ---
const useChaoticState = () => {
    const [anger, setAnger] = useState(initialState.anger);
    const [trust, setTrust] = useState(initialState.trust);
    const [loyalty, setLoyalty] = useState(initialState.loyalty);
    const [renderCount, setRenderCount] = useState(0);

    React.useEffect(() => {
        setRenderCount(c => c + 1);
    }, [anger, trust, loyalty]);

    const handleAccusation = () => {
        // Tangled logic: multiple setters, hard to follow
        setAnger(a => Math.min(100, a + 30));
        setTrust(t => Math.max(0, t - 20));
    };

    const handleApology = () => {
        setAnger(a => Math.max(0, a - 40));
        setLoyalty(l => Math.min(100, l + 15));
    };
    
    const reset = () => {
        setAnger(initialState.anger);
        setTrust(initialState.trust);
        setLoyalty(initialState.loyalty);
        setRenderCount(0);
    }

    const alliance = useMemo(() => {
        if (anger > 75 || trust < 25) return 'shaky';
        if (anger < 30 && loyalty > 80) return 'solid';
        return 'strained';
    }, [anger, trust, loyalty]);

    return { anger, trust, loyalty, alliance, handleAccusation, handleApology, reset, renderCount };
};


export default function ReducerConspiracyModule(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [state, dispatch] = useReducer(relationshipReducer, initialState);
  const [actionLog, setActionLog] = useState<string[]>([]);
  const chaoticState = useChaoticState();
  const [comparisonMode, setComparisonMode] = useState<'chaos' | 'protocol'>('chaos');

  const handleDispatch = useCallback((action: RelationshipAction) => {
    dispatch(action);
    setActionLog(log => [...log.slice(-4), action.type]);
  }, []);

  const resetDemos = useCallback(() => {
    handleDispatch({ type: 'RESET' });
    chaoticState.reset();
    setActionLog([]);
  }, [chaoticState]);

  const candleClass = useMemo(() => {
    const currentAnger = comparisonMode === 'protocol' ? state.anger : chaoticState.anger;
    if (currentAnger > 80) return "text-red-500 animate-pulse";
    if (currentAnger > 50) return "text-orange-400";
    return "text-amber-300";
  }, [state.anger, chaoticState.anger, comparisonMode]);

  const chapters = [
    {
      title: "The Ledger of Grievances",
      content: "The relationship between Brutus and Cassius is a complex state object, full of interrelated values like anger, trust, and loyalty. Managing this with simple booleans is impossible; changing one value affects all others. This requires a more robust state management system.",
    },
    {
      title: "The Spiral of Setters",
      content: "Using multiple `useState` hooks for related state is like shouting fragmented accusations. Each `setState` call triggers a reaction, leading to unpredictable side effects, extra re-renders, and chaotic, tangled logic. The state becomes difficult to reason about and debug.",
    },
    {
      title: "The Function of Confrontation",
      content: "The `useReducer` hook provides a formal protocol. Instead of setting state directly, you dispatch actions—structured objects describing what happened. A central reducer function processes these actions, calculating the next state predictably and immutably. It's a clear, debuggable process.",
    },
    {
      title: "Chaos vs. Protocol",
      content: "Contrast the chaos of interdependent `useState` setters with the clean, predictable flow of `useReducer`. One creates tangled side effects; the other guarantees deterministic state transitions from a single source of truth. The reducer pattern is scalable and easier to test.",
    },
    {
      title: "The Reconciled State Object",
      content: "The final, reconciled state is the result of a clear sequence of dispatched actions. `useReducer` provides a history of how state evolved, making complex transitions transparent. The system is stable, predictable, and ready for the next event.",
    },
  ];

  const currentChapter = chapters[chapter];
  const memorablePhrases = [
    "The gulf between us is not empty air, but a ledger of grievances.",
    "You have done that you should be sorry for.",
    "A fault has a name, and a name is a thing that can be addressed.",
    "An apology is not a feeling; it is an action with a type and a payload.",
    "Our state is not what we feel, but what we have formally agreed upon through due process.",
  ];

  const code = {
    initialState: `const initialState = {
  anger: 60,
  trust: 40,
  loyalty: 70,
  alliance: 'strained',
};`,
    useStateChaos: `// ❌ Each piece of state managed separately
const [anger, setAnger] = useState(60);
const [trust, setTrust] = useState(40);
const [loyalty, setLoyalty] = useState(70);

// ❌ Logic is scattered and co-located with the event handler
function handleAccusation() {
  setAnger(a => a + 30);
  setTrust(t => t - 20);
  // ... what about loyalty? what about alliance status?
  // This becomes hard to maintain.
}`,
    useReducerIntro: `// ✅ State object and transitions are centralized
const [state, dispatch] = useReducer(reducer, initialState);

// ✅ Logic is clean and declarative
function handleAccusation() {
  dispatch({ type: 'ACCUSATION', payload: { severity: 'major' } });
}`,
    reducerFunction: `function relationshipReducer(state, action) {
  switch (action.type) {
    case 'ACCUSATION':
      return {
        ...state,
        anger: Math.min(100, state.anger + 30),
        trust: Math.max(0, state.trust - 20),
        alliance: 'shaky',
      };
    case 'APOLOGY':
      return {
        ...state,
        anger: Math.max(0, state.anger - 40),
        loyalty: Math.min(100, state.loyalty + 15),
        alliance: 'solid',
      };
    // ... other actions
    default:
      return state;
  }
}`,
  };

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Scale}
        title="Julius Caesar"
        subtitle="Brutus & Cassius, 44 BC"
        concept="React Concept: useReducer Hook"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 text-lg font-bold">Confrontation Controls</h3>
                <div className="space-y-3">
                    <button onClick={() => chapter < 3 ? chaoticState.handleAccusation() : handleDispatch({ type: 'ACCUSATION', payload: { severity: 'major' } })} className="w-full rounded-md bg-red-900/50 px-4 py-2 text-sm font-semibold text-red-200 transition hover:bg-red-900/80">
                        Dispatch: ACCUSATION
                    </button>
                    <button onClick={() => chapter < 3 ? chaoticState.handleApology() : handleDispatch({ type: 'APOLOGY' })} className="w-full rounded-md bg-green-900/50 px-4 py-2 text-sm font-semibold text-green-200 transition hover:bg-green-900/80">
                        Dispatch: APOLOGY
                    </button>
                    <button onClick={resetDemos} className="w-full mt-2 rounded-md bg-slate-700/50 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-700/80">
                        Reset Dialogue
                    </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div className="rounded bg-slate-800/50 p-2">
                        <div className="text-xs text-slate-400">Anger</div>
                        <div className="font-mono text-xl text-red-400">{chapter < 3 || comparisonMode === 'chaos' ? chaoticState.anger : state.anger}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-2">
                        <div className="text-xs text-slate-400">Trust</div>
                        <div className="font-mono text-xl text-sky-400">{chapter < 3 || comparisonMode === 'chaos' ? chaoticState.trust : state.trust}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-2">
                        <div className="text-xs text-slate-400">Loyalty</div>
                        <div className="font-mono text-xl text-green-400">{chapter < 3 || comparisonMode === 'chaos' ? chaoticState.loyalty : state.loyalty}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-2">
                        <div className="text-xs text-slate-400">Alliance</div>
                        <div className="font-mono text-lg uppercase">{chapter < 3 || comparisonMode === 'chaos' ? chaoticState.alliance : state.alliance}</div>
                    </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Swords className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Brutus/Cassius Relationship</span><span className="font-medium">The State Object</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Verbal Accusation/Apology</span><span className="font-medium">An Action</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">The Act of Speaking</span><span className="font-medium">Dispatch Function</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Rules of Friendship</span><span className="font-medium">Reducer Function</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">The Heated Dialogue</span><span className="font-medium">Reducer Process</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">The Tent</span><span className="font-medium">Component Scope</span></div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "Complex, related state is difficult to manage when each piece is independent."}
                  {chapter === 1 && "Multiple `useState` calls for related state can lead to tangled logic and unpredictable updates."}
                  {chapter === 2 && "`useReducer` centralizes state logic, making complex transitions predictable and easier to debug."}
                  {chapter === 3 && "Dispatching actions is preferable to calling multiple state setters for complex, multi-part state updates."}
                  {chapter === 4 && "A reducer provides a clear history of state transitions, which is invaluable for understanding and maintaining complex components."}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">"{memorablePhrases[chapter]}"</p>
                <p className="mt-2 text-right text-xs text-slate-500">— Act IV, Scene III</p>
              </div>
            </div>
          }
        >
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-amber-100">{currentChapter.title}</h2>
            <p className="leading-relaxed text-slate-300">{currentChapter.content}</p>
          </div>

          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Flame className={`h-8 w-8 transition-colors duration-500 ${candleClass}`} />
                    <h3 className="text-xl font-bold text-amber-200">Interactive Demonstration</h3>
                </div>
                {chapter === 1 && <div className="text-right"><div className="text-xs text-slate-400">Re-Renders</div><div className="font-mono text-xl text-red-400">{chaoticState.renderCount}</div></div>}
            </div>

            {chapter === 0 && <CodeBlock code={code.initialState} language="tsx" title="// The Complex State Object" />}
            
            {chapter === 1 && <CodeBlock code={code.useStateChaos} language="tsx" variant="error" title="// ❌ Anti-Pattern: Multiple Interrelated useStates" />}

            {chapter === 2 && <CodeBlock code={code.reducerFunction} language="tsx" variant="success" title="// ✅ The Centralized Reducer Function" />}

            {chapter === 3 && (
                <div>
                    <div className="mb-4 flex justify-center gap-2 rounded-lg bg-slate-800/50 p-1">
                        <button onClick={() => setComparisonMode('chaos')} className={`w-full rounded-md px-3 py-1 text-sm font-semibold transition ${comparisonMode === 'chaos' ? 'bg-red-800 text-white' : 'hover:bg-slate-700'}`}>❌ Chaos (useState)</button>
                        <button onClick={() => setComparisonMode('protocol')} className={`w-full rounded-md px-3 py-1 text-sm font-semibold transition ${comparisonMode === 'protocol' ? 'bg-green-800 text-white' : 'hover:bg-slate-700'}`}>✅ Protocol (useReducer)</button>
                    </div>
                    <CodeComparison
                        badCode={code.useStateChaos}
                        goodCode={code.useReducerIntro}
                        language="tsx"
                        themeColor="amber"
                        badLabel="Multiple useStates"
                        goodLabel="useReducer"
                        badExplanation="State logic is scattered across event handlers, making it brittle and hard to trace."
                        goodExplanation="A single dispatch call triggers predictable, centralized logic inside the reducer."
                    />
                </div>
            )}

            {chapter === 4 && (
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                        <h4 className="font-bold text-amber-200 mb-2">Final State</h4>
                        <div className="p-4 rounded-lg bg-slate-800/50 font-mono text-sm whitespace-pre-wrap">
                            {JSON.stringify(state, null, 2)}
                        </div>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-amber-200 mb-2 flex items-center gap-2"><History size={16}/> Action History</h4>
                        <div className="p-4 rounded-lg bg-slate-800/50 space-y-2 h-40 overflow-y-auto">
                            <AnimatePresence>
                                {actionLog.length === 0 && <p className="text-slate-500 text-sm">No actions dispatched yet.</p>}
                                {actionLog.map((action, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-sm bg-slate-700/50 rounded px-2 py-1">{action}</motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            )}
          </section>

          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="amber"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}