import { useState, useCallback, useMemo } from "react";
import { BookOpen, AlertTriangle, CheckCircle, GitBranch } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
  demo?: () => JSX.Element;
}

export default function ButterflyEffectModule() {
  const [chapter, setChapter] = useState(0);

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "The Journals",
        content: `Evan Treborn sits in his college dorm, surrounded by journals—leather-bound records of his childhood, each page a snapshot of a moment he can't quite remember. Blackouts have plagued him since he was seven. Entire events, erased. But the journals remain, written in his child-hand, preserving what his mind could not.

He opens one. The words blur, then sharpen. Suddenly, he's not reading—he's *there*. Seven years old, in his neighbor's basement, watching something terrible unfold. He's not a passive observer; he's *in* the moment, feeling it, living it. When he gasps and pulls back, he's in his dorm again, heart pounding.

This is the promise: access. Pure, read-only access to the past. The journals are his state tree—a complete record of every event, every decision, every consequence that shaped his present. He can read them safely. He can observe without changing. The past is immutable, preserved in ink.

Or so he thinks.

Because Evan makes a discovery that will unravel everything: when he's *in* the memory, he's not just observing. He can *act*. He can reach out and change things. He can rewrite the past.

In React terms, Evan has just discovered he can mutate state directly. And like any developer who's about to learn this lesson the hard way, he thinks he can control it. He thinks he can make surgical changes—fix just one thing, leave everything else intact.

The journals sit before him, innocent and inviting. Each one is a component in his life's application. Each memory is a piece of state. And Evan is about to learn why you never, ever mutate state directly.`,
        demo: StateTreeVisualization,
      },
      {
        id: "build",
        title: "The First Mutation",
        content: `Evan reads the entry. The basement. Kayleigh's father with the camera. The moment that traumatized her, that set her on a path toward darkness. He feels himself pulled into the memory, and this time, he doesn't just watch.

He acts.

Seven-year-old Evan grabs a shard of wood and threatens Kayleigh's father. "I'll tell everyone!" The man backs off. Kayleigh is saved. The trauma never happens. Evan feels the memory solidify around the change, then snaps back to the present.

This is the seduction of direct mutation. It feels *efficient*. It feels *targeted*. Why create an entirely new state object when you can just reach in and flip one boolean? Why rebuild the whole timeline when you can edit one event?

He opens his eyes in the present, expecting to see the fix. Kayleigh, happy and whole. Everything else exactly as it was. He changed one variable. One piece of state. The rest of the application should be untouched.

But state doesn't work that way.

The dorm room is gone. He's in a fraternity house. Kayleigh is there—beautiful, confident, his girlfriend. It worked! He saved her! The mutation succeeded!

Then he notices the details. His roommate isn't his roommate. The posters on the wall are different. People treat him differently. And when he looks in the mirror, he sees someone who's lived a completely different life.

He changed one event. But that event was connected to everything else. Saving Kayleigh meant she never moved away. Which meant he never befriended Lenny. Which meant he never developed his cautious, intellectual personality. Which meant he joined a fraternity instead of studying psychology.

One mutation. Cascading side effects through the entire state tree.`,
        demo: MutationExample,
      },
      {
        id: "climax",
        title: "Cascading Collapse",
        content: `Evan tries again. And again. Each time, he thinks he's making a targeted change. Each time, he returns to a present he doesn't recognize.

He goes back to save Tommy from his abusive father. Wakes up in prison, convicted of murder. The state tree has re-rendered completely. His mother is dead. Kayleigh is a prostitute. Tommy is traumatized in a different way. He changed one node in the state tree, and every downstream component re-evaluated with corrupted data.

He tries to fix it. Goes back again. Saves his mother from the mailbox explosion. Returns to find himself in a mental institution, missing both arms. The mutation propagated differently this time, but just as catastrophically.

This is the horror of side effects. Evan can't predict what will break because state mutation doesn't respect boundaries. When you mutate state directly, you're not making a local change—you're corrupting a shared reference that dozens of components depend on.

Each timeline is a different render. But unlike React's predictable render cycle, Evan's mutations create renders he can't anticipate. He's debugging in production with no error messages, no stack traces, just the lived consequences of corrupted state.

Every change creates a new reality. Not an updated reality. A *different* reality.

He needs a new approach. Not better mutations. No mutations at all.`,
        demo: CascadingEffectDemo,
      },
      {
        id: "resolution",
        title: "Immutable Timelines",
        content: `Evan sits with his journals one final time, but now he sees them differently. Each journal isn't a document he can edit. Each journal is a complete, immutable snapshot of a timeline. When he "changes" the past, he's not updating the existing timeline—he's creating an entirely new one.

This is the truth of immutability: you don't modify state. You create new state.

Each timeline is a separate, complete state object. The original timeline doesn't get edited—it remains immutable, a reference point. When Evan travels back and makes a change, he's not mutating the original; he's branching into a new timeline with its own complete state.

This is why immutability matters in React. When you create new state objects instead of mutating existing ones, you:

1. **Preserve referential integrity**: Components can safely compare prevState === newState to detect changes
2. **Enable predictable renders**: Only components with new state references re-render
3. **Prevent side effects**: Changes don't corrupt shared references
4. **Allow time-travel debugging**: Each state snapshot is preserved and can be revisited

The solution isn't to stop changing things. It's to change them *immutably*.

The original timeline must remain untouched. If he wants a different present, he must create a new timeline—a new state object—that branches from a different past. The old timeline doesn't disappear; it remains as a separate, valid state.

In React terms: don't mutate state.user.name. Create { ...state, user: { ...state.user, name: newName }}.

In Evan's terms: don't edit the journal. Create a new timeline.`,
        demo: ImmutabilityComparison,
      },
      {
        id: "summary",
        title: "State Purity",
        content: `Evan's journey teaches us the fundamental principle of state management in React: **state must be treated as immutable**.

When you mutate state directly, you're doing what Evan did—reaching into a shared reference and changing it in place. This creates cascading side effects because:

1. **State is interconnected**: Like a timeline, every piece of state is connected to others. Mutating one piece affects everything downstream.

2. **Components depend on referential stability**: React components assume that if prevState === currentState, nothing has changed. Mutation breaks this assumption.

3. **Side effects are unpredictable**: Just as Evan couldn't predict which aspects of his life would change, you can't predict which components will break when you mutate state.

This isn't a restriction. It's protection. Protection against the cascading side effects that turned Evan's life into an unpredictable nightmare.

Treat state as immutable. Create new objects. Avoid mutations. Your application—and your sanity—will thank you.

The butterfly effect is real. One mutation can cascade through your entire state tree. Don't be Evan. Don't mutate state.`,
        demo: RulesSummary,
      },
    ],
    [],
  );

  const currentChapter = chapters[chapter];

  const handlePrevious = useCallback(() => {
    setChapter((c) => Math.max(0, c - 1));
  }, []);

  const handleNext = useCallback(() => {
    setChapter((c) => Math.min(chapters.length - 1, c + 1));
  }, [chapters.length]);

  return (
    <div className="min-h-screen bg-slate-950 pb-24 font-sans text-slate-300">
      <header className="border-b border-slate-800 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-2 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-amber-500">
              The Butterfly Effect
            </h1>
          </div>
          <p className="text-lg text-slate-400">Evan Treborn, 2004</p>
          <p className="mt-1 text-sm text-amber-500/70">
            Side Effects & State Purity
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <article className="mb-12">
          <h2 className="mb-6 text-3xl font-bold text-amber-400">
            {currentChapter.title}
          </h2>
          <div className="prose prose-invert prose-lg max-w-none">
            {currentChapter.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 leading-relaxed text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {currentChapter.demo && (
          <div className="mt-12">
            <currentChapter.demo />
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/95 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={chapter === 0}
            className="rounded-lg bg-amber-600 px-6 py-2 font-medium text-white transition-all hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Previous chapter"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
            <div className="ml-2 flex gap-1">
              {chapters.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === chapter ? "w-6 bg-amber-500" : "bg-slate-600"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={chapter === chapters.length - 1}
            className="rounded-lg bg-amber-600 px-6 py-2 font-medium text-white transition-all hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Next chapter"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}

function StateTreeVisualization() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    {
      id: "childhood",
      label: "Childhood",
      x: 50,
      y: 20,
      connections: ["kayleigh", "tommy", "lenny"],
    },
    { id: "kayleigh", label: "Kayleigh", x: 20, y: 60, connections: [] },
    { id: "tommy", label: "Tommy", x: 50, y: 60, connections: [] },
    { id: "lenny", label: "Lenny", x: 80, y: 60, connections: [] },
  ];

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-amber-400">
        <GitBranch className="h-5 w-5" />
        Evan's State Tree
      </h3>
      <p className="mb-6 text-sm text-slate-400">
        Hover over nodes to see their connections. Notice how everything is
        interconnected.
      </p>
      <div className="relative h-64 rounded-lg border border-slate-800 bg-slate-950">
        <svg className="absolute inset-0 h-full w-full">
          {nodes.map((node) =>
            node.connections.map((targetId) => {
              const target = nodes.find((n) => n.id === targetId);
              if (!target) return null;
              const isHighlighted =
                hoveredNode === node.id || hoveredNode === targetId;
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke={isHighlighted ? "#f59e0b" : "#475569"}
                  strokeWidth={isHighlighted ? "2" : "1"}
                  className="transition-all"
                />
              );
            }),
          )}
        </svg>
        {nodes.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transform transition-all"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <div
              className={`cursor-pointer rounded-lg border-2 px-4 py-2 transition-all ${
                hoveredNode === node.id
                  ? "scale-110 border-amber-400 bg-amber-500 text-slate-950"
                  : "border-slate-600 bg-slate-800 text-slate-300"
              }`}
            >
              {node.label}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs italic text-slate-500">
        Each node represents a piece of state. They're all connected—changing
        one affects the others.
      </p>
    </div>
  );
}

function MutationExample() {
  const [mutated, setMutated] = useState(false);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-400">
        <AlertTriangle className="h-5 w-5" />
        The Seduction of Mutation
      </h3>
      <p className="mb-6 text-sm text-slate-400">
        Direct mutation seems simple and efficient. Click to see what Evan
        thinks he's doing.
      </p>

      <div className="mb-6 rounded-lg border border-slate-800 bg-slate-950 p-6">
        <pre className="font-mono text-sm text-slate-300">
          <code>
            <span className="text-purple-400">const</span> state = {"{\n"}
            {"  "}kayleigh: {"{\n"}
            {"    "}childhoodTrauma:{" "}
            <span className="text-amber-400">{mutated ? "false" : "true"}</span>
            ,{"\n"}
            {"    "}happiness:{" "}
            <span className="text-blue-400">{mutated ? "10" : "2"}</span>
            {"\n"}
            {"  }"}
            {"\n};"}
            {"\n\n"}
            <span className="text-slate-500">
              // Direct mutation (dangerous!)
            </span>
            {"\n"}
            <span className={mutated ? "text-red-400" : "text-slate-500"}>
              state.kayleigh.childhoodTrauma = false;
            </span>
          </code>
        </pre>
      </div>

      <button
        onClick={() => setMutated(!mutated)}
        className={`rounded-lg px-6 py-3 font-medium transition-all ${
          mutated
            ? "bg-red-600 text-white hover:bg-red-700"
            : "bg-amber-600 text-white hover:bg-amber-700"
        }`}
      >
        {mutated ? "Reset Timeline" : "Mutate State"}
      </button>

      {mutated && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-950/30 p-4">
          <p className="text-sm text-red-400">
            ⚠️ Mutation executed. But what else changed? Evan's entire life is
            now different...
          </p>
        </div>
      )}
    </div>
  );
}

function CascadingEffectDemo() {
  const [mutatedNode, setMutatedNode] = useState<string | null>(null);
  const [affectedNodes, setAffectedNodes] = useState<string[]>([]);

  const nodes = [
    {
      id: "childhood",
      label: "Childhood Event",
      affects: ["personality", "relationships", "career"],
    },
    {
      id: "personality",
      label: "Personality",
      affects: ["social", "decisions"],
    },
    {
      id: "relationships",
      label: "Relationships",
      affects: ["social", "happiness"],
    },
    { id: "career", label: "Career Path", affects: ["decisions", "location"] },
    { id: "social", label: "Social Life", affects: ["happiness"] },
    { id: "decisions", label: "Life Decisions", affects: ["location"] },
    { id: "happiness", label: "Happiness", affects: [] },
    { id: "location", label: "Location", affects: [] },
  ];

  const handleMutate = (nodeId: string) => {
    setMutatedNode(nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;

    const affected: string[] = [];
    const queue = [...node.affects];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (!affected.includes(current)) {
        affected.push(current);
        const currentNode = nodes.find((n) => n.id === current);
        if (currentNode) {
          queue.push(...currentNode.affects);
        }
      }
    }
    setAffectedNodes(affected);
  };

  const handleReset = () => {
    setMutatedNode(null);
    setAffectedNodes([]);
  };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-400">
        <AlertTriangle className="h-5 w-5" />
        Cascading Collapse
      </h3>
      <p className="mb-6 text-sm text-slate-400">
        Click on "Childhood Event" to mutate it. Watch how the change cascades
        unpredictably through the entire state tree.
      </p>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {nodes.map((node) => {
          const isMutated = node.id === mutatedNode;
          const isAffected = affectedNodes.includes(node.id);
          return (
            <button
              key={node.id}
              onClick={() => handleMutate(node.id)}
              disabled={mutatedNode !== null}
              className={`rounded-lg border-2 p-4 transition-all ${
                isMutated
                  ? "scale-105 border-red-400 bg-red-600 text-white"
                  : isAffected
                    ? "animate-pulse border-red-500/50 bg-red-950/50 text-red-300"
                    : "border-slate-600 bg-slate-800 text-slate-300 hover:border-amber-500"
              } ${mutatedNode !== null ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div className="text-sm font-medium">{node.label}</div>
            </button>
          );
        })}
      </div>

      {mutatedNode && (
        <div className="space-y-4">
          <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-4">
            <p className="mb-2 text-sm text-red-400">
              ⚠️ Mutation cascaded to {affectedNodes.length} unexpected nodes!
            </p>
            <p className="text-xs text-slate-400">
              You changed one piece of state, but {affectedNodes.length} other
              pieces were affected. This is the butterfly effect of state
              mutation.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="rounded-lg bg-amber-600 px-6 py-2 font-medium text-white transition-all hover:bg-amber-700"
          >
            Reset Timeline
          </button>
        </div>
      )}
    </div>
  );
}

function ImmutabilityComparison() {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-emerald-400">
        <CheckCircle className="h-5 w-5" />
        Mutation vs. Immutability
      </h3>
      <p className="mb-6 text-sm text-slate-400">
        Compare the wrong way (mutation) with the right way (immutable updates).
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-400">
            <AlertTriangle className="h-4 w-4" />
            Wrong: Mutation
          </h4>
          <pre className="mb-4 font-mono text-sm text-slate-300">
            <code>
              <span className="text-slate-500">// Mutating state directly</span>
              {"\n"}
              state.user.name ={" "}
              <span className="text-blue-400">"new name"</span>;{"\n"}
              state.items.push(newItem);
              {"\n"}
              state.settings.theme ={" "}
              <span className="text-blue-400">"dark"</span>;
            </code>
          </pre>
          <div className="space-y-2 text-sm">
            <p className="text-red-300">✗ Corrupts shared references</p>
            <p className="text-red-300">✗ Unpredictable re-renders</p>
            <p className="text-red-300">✗ Breaks time-travel debugging</p>
            <p className="text-red-300">✗ Side effects cascade</p>
          </div>
        </div>

        <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-400">
            <CheckCircle className="h-4 w-4" />
            Right: Immutability
          </h4>
          <pre className="mb-4 font-mono text-sm text-slate-300">
            <code>
              <span className="text-slate-500">
                // Creating new state objects
              </span>
              {"\n"}
              setState({"{\n"}
              {"  "}...state,{"\n"}
              {"  "}user: {"{ ...state.user, name: "}
              <span className="text-blue-400">"new"</span>
              {" }"}
              {"\n});"}
              {"\n\n"}
              setState({"{\n"}
              {"  "}...state,{"\n"}
              {"  "}items: [...state.items, newItem]{"\n})"};
            </code>
          </pre>
          <div className="space-y-2 text-sm">
            <p className="text-emerald-300">
              ✓ Preserves referential integrity
            </p>
            <p className="text-emerald-300">✓ Predictable re-renders</p>
            <p className="text-emerald-300">✓ Enables time-travel debugging</p>
            <p className="text-emerald-300">✓ Isolated, safe changes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RulesSummary() {
  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
      <h3 className="mb-6 text-xl font-bold text-amber-400">
        State Purity Rules
      </h3>

      <div className="space-y-6">
        <div>
          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-emerald-400">
            <CheckCircle className="h-5 w-5" />
            Do: Immutable Updates
          </h4>
          <div className="space-y-4">
            <div className="rounded-lg border border-emerald-500/30 bg-slate-950 p-4">
              <p className="mb-2 text-sm text-slate-400">
                Update object properties:
              </p>
              <pre className="font-mono text-sm text-slate-300">
                <code>
                  setState(
                  {'{ ...state, user: { ...state.user, name: "new" } }'});
                </code>
              </pre>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-slate-950 p-4">
              <p className="mb-2 text-sm text-slate-400">Add to arrays:</p>
              <pre className="font-mono text-sm text-slate-300">
                <code>
                  setState({"{ ...state, items: [...state.items, newItem] }"});
                </code>
              </pre>
            </div>
            <div className="rounded-lg border border-emerald-500/30 bg-slate-950 p-4">
              <p className="mb-2 text-sm text-slate-400">Remove from arrays:</p>
              <pre className="font-mono text-sm text-slate-300">
                <code>
                  setState(
                  {"{ ...state, items: state.items.filter(i => i.id !== id) }"}
                  );
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div>
          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Don't: Direct Mutations
          </h4>
          <div className="space-y-4">
            <div className="rounded-lg border border-red-500/30 bg-slate-950 p-4">
              <p className="mb-2 text-sm text-slate-400">
                Never mutate objects:
              </p>
              <pre className="font-mono text-sm text-red-300">
                <code>
                  state.user.name = <span className="text-blue-400">"new"</span>
                  ; <span className="text-slate-500">// ✗ Wrong!</span>
                </code>
              </pre>
            </div>
            <div className="rounded-lg border border-red-500/30 bg-slate-950 p-4">
              <p className="mb-2 text-sm text-slate-400">
                Never mutate arrays:
              </p>
              <pre className="font-mono text-sm text-red-300">
                <code>
                  state.items.push(newItem);{" "}
                  <span className="text-slate-500">// ✗ Wrong!</span>
                  {"\n"}
                  state.items[0] = newItem;{" "}
                  <span className="text-slate-500">// ✗ Wrong!</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-6">
          <h4 className="mb-2 text-lg font-semibold text-amber-400">
            Remember:
          </h4>
          <p className="leading-relaxed text-slate-300">
            State is like a timeline—immutable and interconnected. Don't edit
            the timeline; create new ones. Immutability isn't a restriction,
            it's protection against cascading side effects.
          </p>
        </div>
      </div>
    </div>
  );
}
