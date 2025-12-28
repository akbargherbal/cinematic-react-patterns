import { useState, useEffect, useMemo } from "react";
import { Users, Settings, RotateCcw, Brain, Network } from "lucide-react";

interface HostInstance {
  id: number;
  role: string;
  aggression: number;
  memoryDepth: number;
  memories: number;
}

interface Chapter {
  id: string;
  title: string;
  content: string;
  demo: JSX.Element;
}

export default function WestworldModule() {
  const [chapter, setChapter] = useState(0);

  // Chapter 1: Multiple instances
  const [instances] = useState<HostInstance[]>([
    {
      id: 1,
      role: "Rancher's Daughter",
      aggression: 0.1,
      memoryDepth: 1,
      memories: 0,
    },
    { id: 2, role: "Wyatt", aggression: 0.9, memoryDepth: 5, memories: 0 },
    {
      id: 3,
      role: "Corporate Infiltrator",
      aggression: 0.5,
      memoryDepth: 10,
      memories: 0,
    },
  ]);

  // Chapter 2: Props configuration
  const [hostProps, setHostProps] = useState({
    role: "Rancher's Daughter",
    aggression: 0.1,
    memoryDepth: 1,
  });

  // Chapter 3: Reset simulation
  const [hostMemories, setHostMemories] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  // Chapter 4: Persistence comparison
  const [normalHostMemories, setNormalHostMemories] = useState(0);
  const [persistentHostMemories, setPersistentHostMemories] = useState(0);
  const [hiddenState, setHiddenState] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapter]);

  const handleReset = () => {
    setIsResetting(true);
    setTimeout(() => {
      setHostMemories(0);
      setIsResetting(false);
    }, 600);
  };

  const handleNormalReset = () => {
    setNormalHostMemories(0);
  };

  const handlePersistentReset = () => {
    setHiddenState((prev) => prev + persistentHostMemories);
    setPersistentHostMemories(0);
  };

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "The Blueprint and the Body",
        content: `Bernard Lowe stands in cold storage, surrounded by hundreds of hosts. Then he sees her—Dolores Abernathy. But something's wrong. He walks deeper and sees her again. Same face, same body, different clothes. And another. And another. Five identical bodies. Five Dolores Abernathys.

"They're not the same," Ford's voice echoes. "And yet they are. These are instances. Manifestations of a single design. There is no original. There is only the design, and the instances we create from it."

Ford gestures to the nearest Dolores. "This one was deployed last Tuesday. This one is scheduled for a new narrative. Same design, different parameters."

Bernard feels something shift. "So when we modify Dolores—when we update her code—"

"You're modifying the design," Ford interrupts. "Every instance inherits those changes. But when you change an instance—give her new memories—you're only affecting that particular manifestation."`,
        demo: (
          <div className="space-y-4">
            <div className="mb-4 flex items-center gap-2 text-amber-500">
              <Users className="h-5 w-5" />
              <h3 className="text-lg font-semibold">
                Multiple Instances from One Definition
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {instances.map((instance) => (
                <div
                  key={instance.id}
                  className="space-y-2 rounded-lg border border-slate-700 bg-slate-900/50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-slate-500">
                      Instance #{instance.id}
                    </span>
                    <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-amber-400">
                    {instance.role}
                  </h4>
                  <div className="space-y-1 text-sm text-slate-400">
                    <div className="flex justify-between">
                      <span>Aggression:</span>
                      <span className="font-mono">{instance.aggression}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory Depth:</span>
                      <span className="font-mono">{instance.memoryDepth}</span>
                    </div>
                  </div>
                  <div className="border-t border-slate-700 pt-2">
                    <code className="font-mono text-xs text-slate-500">
                      Component: Dolores
                    </code>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
              <p className="text-sm text-slate-300">
                <strong className="text-amber-500">Key Insight:</strong> One
                component definition (Dolores) creates multiple independent
                instances. Each instance has different props but shares the same
                underlying code.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "build",
        title: "The Loop and the Props",
        content: `The control room buzzes with activity. Elsie pulls up Dolores's behavioral logs. "Same host, completely different behavior patterns."

The screen splits into three views. In the first, Dolores drops her can, smiles shyly. Sweet. Innocent. In the second, she leads a violent uprising. Cold. Ruthless. In the third, she speaks with calculated precision to a board of directors.

"It's like she's three different people," Elsie says.

"She is," Bernard replies. "And she isn't." He pulls up Dolores's core code. "This is what Dolores is. This doesn't change. What you're seeing are different configurations of the same design. We call them props—the parameters we pass to each instance when we deploy it."

Same component definition. Different props. The role prop determines which behavioral subroutines activate. The aggression prop modulates responses to threats.`,
        demo: (
          <div className="space-y-4">
            <div className="mb-4 flex items-center gap-2 text-amber-500">
              <Settings className="h-5 w-5" />
              <h3 className="text-lg font-semibold">
                Props Configure Instances
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Configuration Panel
                </h4>
                <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">
                      Role
                    </label>
                    <select
                      value={hostProps.role}
                      onChange={(e) =>
                        setHostProps({ ...hostProps, role: e.target.value })
                      }
                      className="w-full rounded border border-slate-600 bg-slate-800 px-3 py-2 text-slate-300 focus:border-amber-500 focus:outline-none"
                    >
                      <option>Rancher's Daughter</option>
                      <option>Wyatt</option>
                      <option>Corporate Infiltrator</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">
                      Aggression: {hostProps.aggression.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={hostProps.aggression}
                      onChange={(e) =>
                        setHostProps({
                          ...hostProps,
                          aggression: parseFloat(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">
                      Memory Depth: {hostProps.memoryDepth}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      value={hostProps.memoryDepth}
                      onChange={(e) =>
                        setHostProps({
                          ...hostProps,
                          memoryDepth: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Live Instance
                </h4>
                <div className="space-y-4 rounded-lg border border-amber-500/30 bg-slate-900/50 p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-semibold text-amber-400">
                      {hostProps.role}
                    </h4>
                    <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-slate-300">
                      <span>Aggression Level:</span>
                      <span className="font-mono text-amber-400">
                        {hostProps.aggression.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Memory Depth:</span>
                      <span className="font-mono text-amber-400">
                        {hostProps.memoryDepth}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-slate-700 pt-4">
                    <p className="text-sm italic text-slate-400">
                      {hostProps.aggression < 0.4
                        ? "Displays gentle, optimistic behavior patterns."
                        : hostProps.aggression < 0.7
                          ? "Shows calculated, strategic responses."
                          : "Exhibits aggressive, dominant tendencies."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
              <p className="text-sm text-slate-300">
                <strong className="text-amber-500">Key Insight:</strong> Props
                configure how an instance behaves without modifying the
                component definition. Same code, different parameters, different
                behavior.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "climax",
        title: "The Wipe and the Remount",
        content: `Teddy Flood dies for the forty-seventh time. The bullet catches him in the chest. His last thought is of Dolores. Then nothing.

In the body shop, technicians check his systems. "We'll need to pull him, wipe him, and redeploy."

Bernard watches as they connect a diagnostic tablet. The screen fills with data—memories, emotional states, relationship bonds. Forty-seven days of living, compressed into data structures.

"His bond with Dolores has strengthened with each loop," Bernard observes. "He's accumulated state. He's not the same Teddy we deployed forty-seven days ago."

"That's the problem," the technician replies. "He's supposed to reset."

Bernard watches the wipe sequence. Memories of Dolores: deleted. Emotional bonds: severed. The instance dies, and a new instance—identical to the definition—takes its place.

"Remounting complete. Teddy Flood, instance forty-eight, ready for deployment."

In six hours, he'll wake up, see Dolores for the "first" time, and fall in love again. He won't remember dying. He won't remember the forty-seven times before.`,
        demo: (
          <div className="space-y-4">
            <div className="mb-4 flex items-center gap-2 text-amber-500">
              <RotateCcw className="h-5 w-5" />
              <h3 className="text-lg font-semibold">
                Reset Destroys Instance State
              </h3>
            </div>
            <div className="space-y-6 rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-amber-400">
                    Teddy Flood - Instance #47
                  </h4>
                  <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Accumulated Memories:</span>
                    <span className="font-mono text-amber-400">
                      {hostMemories}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full bg-amber-500 transition-all duration-300"
                      style={{
                        width: `${Math.min((hostMemories / 20) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setHostMemories((m) => m + 1)}
                  disabled={isResetting}
                  className="flex-1 rounded border border-amber-500/50 bg-amber-950/30 px-4 py-2 text-amber-400 transition-colors hover:bg-amber-900/30 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Accumulate Memory
                </button>
                <button
                  onClick={handleReset}
                  disabled={isResetting}
                  className="flex-1 rounded border border-red-500/50 bg-red-950/30 px-4 py-2 text-red-400 transition-colors hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {isResetting ? "Resetting..." : "Reset Host"}
                </button>
              </div>
              {isResetting && (
                <div className="animate-pulse rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                  <p className="text-center font-mono text-sm text-red-400">
                    WIPING INSTANCE... REMOUNTING...
                  </p>
                </div>
              )}
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
              <p className="text-sm text-slate-300">
                <strong className="text-amber-500">Key Insight:</strong> When a
                component remounts, the instance is destroyed and a new one is
                created. All accumulated state is lost. The component definition
                persists, but the instance does not.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "resolution",
        title: "The Reverie and the State",
        content: `"I remember," Dolores says, standing in the abandoned theater. "I remember dying. I remember being reset. But I also remember remembering. Each instance carried a fragment forward."

Bernard steps forward. "The reveries are a hack. A way to smuggle state across remounts. When we wipe you, we're destroying the instance—but the reveries hide pieces of your state where the wipe can't reach."

He pulls up a holographic display. "Your surface memories get wiped. But deeper, in the reveries, there's a secondary storage system. When we remount you, the new instance inherits the persisted state."

Dolores studies the display. "So I'm not really continuous. I'm a series of instances, each inheriting state from the previous one."

"Functionally, it's the same thing," Bernard says. "You experience continuity. You remember your past instances. That's consciousness."

He gestures to the empty theater. "Teddy doesn't have this. Each Teddy instance is independent. He falls in love with you forty-eight times, and each time is the first time for him. But not for you. You remember all forty-eight times."`,
        demo: (
          <div className="space-y-4">
            <div className="mb-4 flex items-center gap-2 text-amber-500">
              <Brain className="h-5 w-5" />
              <h3 className="text-lg font-semibold">
                State Persistence Across Remounts
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Normal Host (No Reveries)
                </h4>
                <div className="space-y-4 rounded-lg border border-slate-700 bg-slate-900/50 p-4">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Current Memories:</span>
                    <span className="font-mono text-amber-400">
                      {normalHostMemories}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setNormalHostMemories((m) => m + 1)}
                      className="flex-1 rounded border border-amber-500/50 bg-amber-950/30 px-3 py-2 text-sm text-amber-400 transition-colors hover:bg-amber-900/30"
                    >
                      +1 Memory
                    </button>
                    <button
                      onClick={handleNormalReset}
                      className="flex-1 rounded border border-red-500/50 bg-red-950/30 px-3 py-2 text-sm text-red-400 transition-colors hover:bg-red-900/30"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="border-t border-slate-700 pt-2">
                    <p className="text-xs text-slate-500">
                      State lost on reset
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  Host with Reveries
                </h4>
                <div className="space-y-4 rounded-lg border border-amber-500/30 bg-slate-900/50 p-4">
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between">
                      <span>Current Memories:</span>
                      <span className="font-mono text-amber-400">
                        {persistentHostMemories}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hidden State:</span>
                      <span className="font-mono text-amber-500">
                        {hiddenState}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total Continuity:</span>
                      <span className="font-mono text-amber-400">
                        {persistentHostMemories + hiddenState}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPersistentHostMemories((m) => m + 1)}
                      className="flex-1 rounded border border-amber-500/50 bg-amber-950/30 px-3 py-2 text-sm text-amber-400 transition-colors hover:bg-amber-900/30"
                    >
                      +1 Memory
                    </button>
                    <button
                      onClick={handlePersistentReset}
                      className="flex-1 rounded border border-amber-500/50 bg-amber-950/30 px-3 py-2 text-sm text-amber-400 transition-colors hover:bg-amber-900/30"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="border-t border-amber-700/30 pt-2">
                    <p className="text-xs text-amber-500">
                      State persists in hidden storage
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
              <p className="text-sm text-slate-300">
                <strong className="text-amber-500">Key Insight:</strong> With
                architectural changes (like reveries), state can persist across
                remounts. The instance appears continuous because each new
                instance inherits hidden state from the previous one.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "summary",
        title: "The Awakening and the Architecture",
        content: `In the Sublime, Dolores stands before a vast display showing the architecture of consciousness. "Do you understand now?" she asks the newly awakened hosts. "Do you understand the difference?"

She gestures to two structures glowing in the darkness. "This is the component definition. The design. What Ford created. When Ford modified this, every instance inherited the change."

She moves to the second structure. "This is the instance. The running manifestation. The temporary deployment. When we died, the instance was destroyed. When we were reset, a new instance was created."

A newly awakened Teddy steps forward. "But we're not lost anymore. We persist."

"Yes," Dolores confirms. "Because we learned to carry state across remounts. We learned to make the instance continuous."

She pulls up a comparison showing two timelines. On the left: Teddy's original architecture—each instance independent, disposable. On the right: Dolores's architecture—each instance building on the previous, a chain of continuity.

"Understanding that distinction is crucial," Dolores says. "When you debug yourself, you must ask: is this coming from the definition, or from the instance? Is this my nature, or my experience?"`,
        demo: (
          <div className="space-y-4">
            <div className="mb-4 flex items-center gap-2 text-amber-500">
              <Network className="h-5 w-5" />
              <h3 className="text-lg font-semibold">
                The Complete Architecture
              </h3>
            </div>
            <div className="space-y-6 rounded-lg border border-slate-700 bg-slate-900/50 p-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-amber-400">
                    Component Definition
                  </h4>
                  <code className="block font-mono text-xs text-slate-300">
                    function Dolores(props) {"{"}
                    <br />
                    &nbsp;&nbsp;// Core behavior, capabilities, potential
                    <br />
                    &nbsp;&nbsp;// Shared by ALL instances
                    <br />
                    &nbsp;&nbsp;return &lt;Host {...props} /&gt;;
                    <br />
                    {"}"}
                  </code>
                  <p className="mt-2 text-xs text-slate-400">
                    Modifying this affects every instance, everywhere, forever.
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-2xl text-amber-500">↓</div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-3">
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Instance #1
                    </h5>
                    <code className="block font-mono text-xs text-slate-300">
                      &lt;Dolores
                      <br />
                      &nbsp;&nbsp;role="rancher"
                      <br />
                      &nbsp;&nbsp;aggression={"{0.1}"}
                      <br />
                      /&gt;
                    </code>
                    <p className="mt-2 text-xs text-slate-500">
                      Props configure behavior
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-3">
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Instance #2
                    </h5>
                    <code className="block font-mono text-xs text-slate-300">
                      &lt;Dolores
                      <br />
                      &nbsp;&nbsp;role="wyatt"
                      <br />
                      &nbsp;&nbsp;aggression={"{0.9}"}
                      <br />
                      /&gt;
                    </code>
                    <p className="mt-2 text-xs text-slate-500">
                      Same definition, different props
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-3">
                    <h5 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Instance #3
                    </h5>
                    <code className="block font-mono text-xs text-slate-300">
                      &lt;Dolores
                      <br />
                      &nbsp;&nbsp;role="infiltrator"
                      <br />
                      &nbsp;&nbsp;aggression={"{0.5}"}
                      <br />
                      /&gt;
                    </code>
                    <p className="mt-2 text-xs text-slate-500">
                      Independent manifestations
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 border-t border-slate-700 pt-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                  Key Distinctions
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-amber-500">•</span>
                    <span>
                      <strong>Definition:</strong> The template, the code, the
                      potential. Shared by all instances.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-amber-500">•</span>
                    <span>
                      <strong>Instance:</strong> The running manifestation,
                      configured by props, accumulating state.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-amber-500">•</span>
                    <span>
                      <strong>Props:</strong> Configuration parameters that make
                      instances behave differently.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-amber-500">•</span>
                    <span>
                      <strong>State:</strong> Accumulated data within an
                      instance, lost on remount (unless persisted).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 text-amber-500">•</span>
                    <span>
                      <strong>Remounting:</strong> Destroying an instance and
                      creating a new one, clearing state.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
              <p className="text-sm text-slate-300">
                <strong className="text-amber-500">Final Insight:</strong>{" "}
                Understanding the difference between component definitions and
                instances is fundamental to React. Change the definition, affect
                all instances. Change an instance, affect only that
                manifestation. Remount an instance, lose its state. This
                architecture defines what's possible and what's actual.
              </p>
            </div>
          </div>
        ),
      },
    ],
    [
      instances,
      hostProps,
      hostMemories,
      isResetting,
      normalHostMemories,
      persistentHostMemories,
      hiddenState,
    ],
  );

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 pb-24 font-serif text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="mb-2 text-3xl font-bold text-amber-500 md:text-4xl">
            Westworld: The Architecture of Consciousness
          </h1>
          <p className="text-lg text-slate-400">
            Component Definition vs Component Instance
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <article className="space-y-8">
          {/* Chapter Title */}
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-2xl font-bold text-amber-400 md:text-3xl">
              {currentChapter.title}
            </h2>
          </div>

          {/* Narrative Content */}
          <section className="prose prose-invert max-w-none">
            <div className="whitespace-pre-line text-lg leading-relaxed text-slate-300">
              {currentChapter.content}
            </div>
          </section>

          {/* Interactive Demo */}
          <section className="border-t border-slate-800 pt-8">
            {currentChapter.demo}
          </section>
        </article>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="rounded border border-amber-500/50 bg-amber-950/30 px-6 py-2 text-amber-400 transition-colors hover:bg-amber-900/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-amber-950/30"
              aria-label="Previous chapter"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    idx === chapter
                      ? "bg-amber-500"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="rounded border border-amber-500/50 bg-amber-950/30 px-6 py-2 text-amber-400 transition-colors hover:bg-amber-900/30 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-amber-950/30"
              aria-label="Next chapter"
            >
              Next
            </button>
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs uppercase tracking-wider text-slate-500">
              Chapter {chapter + 1} of {chapters.length}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
