import { useState, useMemo, useCallback } from "react";
import {
  Users,
  GitBranch,
  AlertTriangle,
  CheckCircle,
  Zap,
} from "lucide-react";

interface Instance {
  id: string;
  state: number;
  label: string;
}

export default function CoherenceStateSync() {
  const [chapter, setChapter] = useState(0);
  const [splitTriggered, setSplitTriggered] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState<string | null>(null);
  const [approach, setApproach] = useState<"wrong" | "right">("wrong");

  const chapters = useMemo(
    () => [
      {
        id: "intro",
        title: "The Dinner Party Begins",
        content: `Eight friends gather around a dinner table in a suburban home. They are comfortable with each other—finishing each other's sentences, referencing shared memories, moving through the evening with the synchronized rhythm of people who know each other well.

Em and Kevin are hosting. Mike and Lee, Hugh and Beth, Amir and Laurie—four couples, eight people, one coherent group. They share the same context, the same history, the same state of knowledge about each other's lives.

Outside, a comet is passing overhead. It happens once every lifetime, they say. The news has been full of it for weeks. Some people are having parties. Some people are afraid. These eight friends are simply curious, occasionally stepping outside to glimpse the streak of light across the sky.

Then the power flickers.

It's brief—just a moment—but when the lights come back, something feels different. The conversation continues, but there's a subtle lag, a microsecond of desynchronization that no one quite notices yet.

Kevin's phone rings. It's a call from Kevin. His own number, calling him.

"That's impossible," he says, staring at the screen.

But it's ringing. And across the street, through the window, they can see another house—the same house—with lights on. With people moving inside. With what looks like... themselves.

The synchronization has broken.`,
      },
      {
        id: "build",
        title: "The First Divergence",
        content: `Hugh and Amir decide to investigate. They walk across the street to the other house—the one that looks exactly like the house they just left. They knock on the door.

The door opens. Hugh and Amir are standing there. The same Hugh and Amir who just knocked.

"What the hell?" both Hughs say simultaneously.

Inside the other house, the other versions of their friends are having the same dinner party. Same food, same conversation topics, same comet outside. But when they compare notes, tiny differences emerge.

"We decided to stay inside after the power went out," says the other Mike.

"No, we went outside to look at the comet," says the original Mike.

Both are certain they're right. Both have memories of their decision. Both believe their version of events is the authoritative one.

The two groups try to synchronize. They compare phone numbers—different. They compare photos on their phones—different people in the pictures. They try to establish which house is "real," but both houses are equally real, equally convinced of their own authenticity.

Then they realize: the divergence happened at the power flicker. At that exact moment, the group split. One version made one set of choices. Another version made different choices. And now they're both executing independently, both mutating their state in different directions.

"We need to figure out which one of us is the original," says Em.

But there is no original. There are only instances, each with their own state, each continuing to evolve independently.`,
      },
      {
        id: "climax",
        title: "Multiplying Realities",
        content: `It's not just two houses. It's dozens. Hundreds. Maybe infinite.

Every time the group makes a decision—stay or go, trust or suspect, fight or flee—they split again. Every choice creates a new branch, a new instance with slightly different state.

Em walks outside and sees them: other versions of herself, wandering the street, each looking for "their" house. Some are carrying red glow sticks (they decided to mark their house). Some are injured (they got into fights with their doubles). Some are terrified. Some are calculating.

When two versions of the same person meet, the conflict is immediate and violent. They can't both be real. They can't both occupy the same space. Their states are incompatible—different memories, different decisions, different wounds. One of them has to be wrong.

But neither is wrong. They're both valid instances, both executing correctly according to their own context. The problem is that they're trying to exist in the same space, trying to reconcile states that have diverged too far to merge.

Hugh finds a box in the other house—a box full of photos and notes. It's a record of all the different versions of their group, all the different states they've been in. Some versions where Mike and Lee broke up. Some where Beth died. Some where they never had this dinner party at all.

"We need a way to identify which version we are," says Amir, holding up a red glow stick. "We need a key."

But even with keys, even with identifiers, the fundamental problem remains: there are multiple instances of the same component, all with different state, all trying to determine which one is "correct."

Em realizes something the others haven't yet: some versions of herself are better than others. Some made smarter choices. Some are happier. Some have better relationships with Kevin.

She starts to wonder: what if she could replace herself with a better version?`,
      },
      {
        id: "resolution",
        title: "The Replacement Strategy",
        content: `Em makes her decision. She's found a version of herself that's better—smarter, more confident, in a better relationship with Kevin. That Em made better choices after the split. That Em has better state.

So she's going to replace herself with that version.

She follows the other Em home, watches her enter the house. She waits until the other Em is alone, then confronts her. The other Em is confused, frightened. They're the same person, but they're not. They have different memories of the last few hours. Different wounds. Different fears.

"I'm taking your place," Em says.

"You can't," the other Em replies. "This is my house. My Kevin. My life."

"Not anymore."

Em attacks her double. It's brutal, desperate, necessary. She drags her other self to the bathroom, locks her inside. She takes the other Em's clothes, her keys, her phone. She studies the photos, memorizes the details. She becomes the other Em.

When Kevin comes home, he doesn't notice the difference. Or maybe he does, but the differences are small enough that he dismisses them. Em is Em. Same component, same interface. The internal state is different, but from the outside, she looks the same.

Em has successfully replaced one instance with another. She's forced a state synchronization by eliminating the competing instance and taking its place.

But the cost is enormous. She's destroyed her original self. She's living in a context that isn't quite hers. And outside, she can see other Ems, still wandering, still trying to find their houses. The synchronization problem hasn't been solved—it's just been hidden.`,
      },
      {
        id: "summary",
        title: "The Morning After",
        content: `Em wakes up in "her" house. Kevin is beside her. The comet has passed. The night is over.

But something is wrong.

The photos on the wall are slightly different. The books on the shelf are in a different order. Kevin mentions a conversation they had last week that Em doesn't remember. Small details, tiny discrepancies, but they accumulate.

She goes to the window and looks outside. There are other Ems out there, still wandering the street. Some are trying doors, looking for houses that feel right. Some are sitting on curbs, defeated. Some are watching other houses, planning their own replacement strategies.

The synchronization problem is permanent. Once instances diverge, once state desynchronizes across multiple contexts, there's no clean way to merge them back together. You can force a replacement, like Em did, but you can't truly reconcile the states. You can't make them coherent again.

Em realizes the truth: she's not in her original reality. She's in a close approximation, a version that's similar enough to pass, but not quite right. And she can never go back. Her original context is gone, locked in a bathroom somewhere, or wandering the streets, or sitting in some other version of this house wondering why nothing feels quite real.`,
      },
    ],
    [],
  );

  const currentChapter = chapters[chapter];

  const handlePrevious = useCallback(() => {
    setChapter((c) => Math.max(0, c - 1));
    setSplitTriggered(false);
    setSelectedInstance(null);
  }, []);

  const handleNext = useCallback(() => {
    setChapter((c) => Math.min(chapters.length - 1, c + 1));
    setSplitTriggered(false);
    setSelectedInstance(null);
  }, [chapters.length]);

  const triggerSplit = useCallback(() => {
    setSplitTriggered(true);
  }, []);

  const instances: Instance[] = useMemo(
    () => [
      { id: "A", state: 42, label: "Instance A" },
      { id: "B", state: 37, label: "Instance B" },
      { id: "C", state: 51, label: "Instance C" },
      { id: "D", state: 29, label: "Instance D" },
      { id: "E", state: 44, label: "Instance E" },
      { id: "F", state: 38, label: "Instance F" },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-12 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <Users className="h-8 w-8 text-red-500" />
                <h1 className="text-4xl font-bold text-slate-100">Coherence</h1>
              </div>
            </div>
            <p className="text-lg text-slate-400">
              State Synchronization Across Component Instances
            </p>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Em, The Dinner Party, 2013
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-semibold text-slate-100">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 rounded-full bg-red-500"></div>
        </div>

        {/* Chapter Content */}
        <div className="prose prose-invert prose-slate mb-12 max-w-none">
          <div className="leading-relaxed whitespace-pre-line text-slate-300">
            {currentChapter.content}
          </div>
        </div>

        {/* Interactive Demonstrations */}
        {chapter === 0 && (
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-slate-100">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              Synchronized Component Instances
            </h3>
            <div className="mb-6 grid grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="flex aspect-square animate-pulse items-center justify-center rounded-lg border-2 border-emerald-500/50 bg-emerald-950/30"
                >
                  <div className="text-center">
                    <Users className="mx-auto mb-2 h-8 w-8 text-emerald-500" />
                    <div className="font-mono text-xs text-emerald-400">
                      state: 42
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded border border-emerald-500/30 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">
                <strong className="text-emerald-400">Technical Reality:</strong>{" "}
                When your application initializes, component instances start
                with synchronized state. They share the same props, the same
                initial values, the same context. They are, for this moment,
                coherent.
              </p>
            </div>
          </div>
        )}

        {chapter === 1 && (
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-slate-100">
              <GitBranch className="h-5 w-5 text-red-500" />
              The Split: Watch Instances Diverge
            </h3>
            <div className="mb-6">
              <button
                onClick={triggerSplit}
                disabled={splitTriggered}
                className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                <Zap className="h-5 w-5" />
                {splitTriggered ? "Split Triggered" : "Trigger the Comet Event"}
              </button>
            </div>

            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div
                className={`rounded-lg border-2 bg-slate-950/50 p-6 transition-all duration-500 ${
                  splitTriggered
                    ? "translate-x-[-10px] border-red-500/50"
                    : "border-emerald-500/50"
                }`}
              >
                <div className="mb-4 text-center">
                  <Users className="mx-auto mb-2 h-12 w-12 text-emerald-500" />
                  <div className="text-sm font-semibold text-slate-300">
                    Instance A
                  </div>
                </div>
                <div className="rounded bg-slate-900 p-3 font-mono text-sm">
                  <div className="text-slate-400">state:</div>
                  <div
                    className={`text-lg font-bold transition-colors ${
                      splitTriggered ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {splitTriggered ? "42" : "42"}
                  </div>
                  {splitTriggered && (
                    <div className="mt-2 text-xs text-slate-500">
                      Decided to stay inside
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`rounded-lg border-2 bg-slate-950/50 p-6 transition-all duration-500 ${
                  splitTriggered
                    ? "translate-x-[10px] border-red-500/50 opacity-100"
                    : "border-emerald-500/50 opacity-50"
                }`}
              >
                <div className="mb-4 text-center">
                  <Users className="mx-auto mb-2 h-12 w-12 text-red-500" />
                  <div className="text-sm font-semibold text-slate-300">
                    Instance B
                  </div>
                </div>
                <div className="rounded bg-slate-900 p-3 font-mono text-sm">
                  <div className="text-slate-400">state:</div>
                  <div
                    className={`text-lg font-bold transition-colors ${
                      splitTriggered ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {splitTriggered ? "37" : "42"}
                  </div>
                  {splitTriggered && (
                    <div className="mt-2 text-xs text-slate-500">
                      Went outside to see comet
                    </div>
                  )}
                </div>
              </div>
            </div>

            {splitTriggered && (
              <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                <p className="text-sm text-slate-400">
                  <strong className="text-red-400">Technical Reality:</strong>{" "}
                  When component instances lose synchronization, they don't
                  freeze—they keep executing. Each instance continues to respond
                  to events, update its state, and make decisions based on its
                  local information. They're all the "same" component, but
                  they're living in different execution contexts.
                </p>
              </div>
            )}
          </div>
        )}

        {chapter === 2 && (
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-slate-100">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Multiple Instances with Conflicting State
            </h3>
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {instances.map((instance) => (
                <button
                  key={instance.id}
                  onClick={() => setSelectedInstance(instance.id)}
                  className={`rounded-lg border-2 bg-slate-950/50 p-4 transition-all hover:scale-105 ${
                    selectedInstance === instance.id
                      ? "border-red-500 ring-2 ring-red-500/50"
                      : "border-slate-700 hover:border-slate-600"
                  }`}
                >
                  <div className="text-center">
                    <Users className="mx-auto mb-2 h-8 w-8 text-red-500" />
                    <div className="mb-1 text-sm font-semibold text-slate-300">
                      {instance.label}
                    </div>
                    <div className="font-mono text-xs text-slate-500">
                      state: {instance.state}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {selectedInstance && (
              <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
                <h4 className="mb-3 text-lg font-semibold text-red-400">
                  Instance {selectedInstance} Details
                </h4>
                <div className="mb-4 rounded bg-slate-950 p-4 font-mono text-sm">
                  <div className="mb-2 text-slate-400">Full State:</div>
                  <pre className="text-slate-300">
                    {JSON.stringify(
                      {
                        id: selectedInstance,
                        state:
                          instances.find((i) => i.id === selectedInstance)
                            ?.state || 0,
                        context: "independent",
                        lastUpdate: "diverged",
                        canReconcile: false,
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                  <p>
                    This instance has diverged from all others. Attempting to
                    reconcile states will cause conflicts. Each instance
                    believes it has the authoritative state.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 rounded border border-slate-700 bg-slate-950/50 p-4">
              <p className="text-sm text-slate-400">
                <strong className="text-slate-300">Technical Reality:</strong>{" "}
                Without proper state synchronization mechanisms, component
                instances multiply uncontrollably. Every render cycle, every
                event handler, every state update creates potential for further
                divergence. Keys don't synchronize state—they just help React
                identify which instance is which.
              </p>
            </div>
          </div>
        )}

        {chapter === 3 && (
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8">
            <h3 className="mb-6 text-xl font-semibold text-slate-100">
              Wrong vs Right: Synchronization Approaches
            </h3>

            <div className="mb-6 flex gap-4">
              <button
                onClick={() => setApproach("wrong")}
                className={`flex-1 rounded-lg px-4 py-3 font-semibold transition-all ${
                  approach === "wrong"
                    ? "bg-red-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Wrong: Force Replacement
              </button>
              <button
                onClick={() => setApproach("right")}
                className={`flex-1 rounded-lg px-4 py-3 font-semibold transition-all ${
                  approach === "right"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                Right: Single Source of Truth
              </button>
            </div>

            {approach === "wrong" && (
              <div className="space-y-4">
                <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
                  <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-red-400">
                    <AlertTriangle className="h-5 w-5" />
                    The Replacement Strategy (Wrong)
                  </h4>
                  <div className="mb-4 overflow-x-auto rounded bg-slate-950 p-4 font-mono text-sm">
                    <pre className="text-slate-300">
                      {`// Trying to force synchronization
function BadComponent() {
  const [state, setState] = useState(42);
  
  // Multiple instances, each with own state
  // Trying to "fix" by replacing one with another
  
  useEffect(() => {
    // Force update from "better" instance
    const betterState = getBetterInstanceState();
    setState(betterState); // Violent replacement
  }, []);
  
  return <div>{state}</div>;
}`}
                    </pre>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-400">
                    <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                    <p>
                      This approach destroys the original state, creates race
                      conditions, and doesn't solve the underlying architecture
                      problem. Each instance still maintains independent state.
                    </p>
                  </div>
                </div>

                <div className="rounded border border-slate-700 bg-slate-950/50 p-4">
                  <p className="text-sm text-slate-400">
                    <strong className="text-red-400">Em's Mistake:</strong> She
                    tried to replace herself with a "better" version, but
                    replacement doesn't solve desynchronization—it just hides
                    it. The underlying architecture is still broken.
                  </p>
                </div>
              </div>
            )}

            {approach === "right" && (
              <div className="space-y-4">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
                  <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-emerald-400">
                    <CheckCircle className="h-5 w-5" />
                    Single Source of Truth (Right)
                  </h4>
                  <div className="mb-4 overflow-x-auto rounded bg-slate-950 p-4 font-mono text-sm">
                    <pre className="text-slate-300">
                      {`// Proper state synchronization
function ParentComponent() {
  const [sharedState, setSharedState] = useState(42);
  
  return (
    <>
      <ChildInstance state={sharedState} />
      <ChildInstance state={sharedState} />
      <ChildInstance state={sharedState} />
    </>
  );
}

function ChildInstance({ state }) {
  // No local state - reads from parent
  // All instances automatically synchronized
  return <div>{state}</div>;
}`}
                    </pre>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    <p>
                      Lift state to a common ancestor. One component owns the
                      state, all instances read from it. Synchronization is
                      automatic and guaranteed.
                    </p>
                  </div>
                </div>

                <div className="rounded border border-emerald-500/30 bg-slate-950/50 p-4">
                  <p className="text-sm text-slate-400">
                    <strong className="text-emerald-400">
                      The Right Solution:
                    </strong>{" "}
                    Prevent desynchronization from the start. Design your state
                    architecture so instances can't diverge. Establish a single
                    source of truth. Make synchronization automatic, not manual.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {chapter === 4 && (
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-slate-100">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              Proper State Synchronization Patterns
            </h3>

            <div className="mb-6 space-y-4">
              <div className="rounded-lg border border-emerald-500/30 bg-slate-950/50 p-4">
                <h4 className="mb-2 font-semibold text-emerald-400">
                  1. Single Source of Truth
                </h4>
                <p className="mb-3 text-sm text-slate-400">
                  Lift state to a common ancestor. One component owns the state,
                  all instances read from it.
                </p>
                <div className="overflow-x-auto rounded bg-slate-950 p-3 font-mono text-xs">
                  <pre className="text-slate-300">
                    {`const [state, setState] = useState(initial);
<Child state={state} />
<Child state={state} />`}
                  </pre>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-slate-950/50 p-4">
                <h4 className="mb-2 font-semibold text-emerald-400">
                  2. Context for Global State
                </h4>
                <p className="mb-3 text-sm text-slate-400">
                  When many components need the same state, use Context to
                  provide a single synchronized source.
                </p>
                <div className="overflow-x-auto rounded bg-slate-950 p-3 font-mono text-xs">
                  <pre className="text-slate-300">
                    {`const StateContext = createContext();
<StateContext.Provider value={state}>
  <ComponentTree />
</StateContext.Provider>`}
                  </pre>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-slate-950/50 p-4">
                <h4 className="mb-2 font-semibold text-emerald-400">
                  3. Controlled Components
                </h4>
                <p className="mb-3 text-sm text-slate-400">
                  Let parent components own state, child components just render
                  and report events.
                </p>
                <div className="overflow-x-auto rounded bg-slate-950 p-3 font-mono text-xs">
                  <pre className="text-slate-300">
                    {`function Child({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}`}
                  </pre>
                </div>
              </div>

              <div className="rounded-lg border border-emerald-500/30 bg-slate-950/50 p-4">
                <h4 className="mb-2 font-semibold text-emerald-400">
                  4. Stable Keys for Identity
                </h4>
                <p className="mb-3 text-sm text-slate-400">
                  Use stable, unique keys so React can track instances correctly
                  across renders.
                </p>
                <div className="overflow-x-auto rounded bg-slate-950 p-3 font-mono text-xs">
                  <pre className="text-slate-300">
                    {`items.map(item => (
  <Component key={item.id} data={item} />
))`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
              <h4 className="mb-3 text-lg font-semibold text-emerald-400">
                The Lesson of Coherence
              </h4>
              <p className="leading-relaxed text-slate-300">
                Prevent desynchronization from the start. Design your state
                architecture so instances can't diverge. Establish a single
                source of truth. Implement proper data flow. Make
                synchronization automatic, not manual.
              </p>
              <p className="mt-3 text-sm text-slate-400">
                Because once the comet passes, once the split happens, once your
                instances start living in parallel realities with conflicting
                state, there's no clean way back. You can only try to minimize
                the damage and hope the details don't give you away.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed right-0 bottom-0 left-0 border-t border-slate-800 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-2">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="rounded-lg bg-slate-800 px-6 py-2 font-semibold text-slate-300 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-slate-600"
            >
              Previous
            </button>

            <div className="text-center">
              <div className="text-sm text-slate-500">
                Chapter {chapter + 1} of {chapters.length}
              </div>
              <div className="mt-1 flex gap-1">
                {chapters.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === chapter ? "bg-red-500" : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="rounded-lg bg-red-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-slate-600"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
