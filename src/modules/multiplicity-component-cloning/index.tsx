import { useState, useMemo } from "react";
import {
  Copy,
  Users,
  AlertTriangle,
  CheckCircle,
  Code,
  ArrowRight,
} from "lucide-react";

interface NestedObject {
  family: { wife: string; daughter: string };
  opinions: { fence: string; wine: string };
}

interface DougState {
  name: string;
  memories: NestedObject;
}

interface CloneCardProps {
  doug: DougState | null;
  label: string;
  quality: number;
  isCorrupted: boolean;
  onModify?: (path: string, value: string) => void;
}

const CloneCard = ({
  doug,
  label,
  quality,
  isCorrupted,
  onModify,
}: CloneCardProps) => {
  if (!doug) return null;

  const qualityColor = quality > 80 ? "green" : quality > 50 ? "yellow" : "red";
  const qualityBg =
    quality > 80
      ? "bg-green-500/20"
      : quality > 50
        ? "bg-yellow-500/20"
        : "bg-red-500/20";

  return (
    <div
      className={`border-2 bg-slate-800 ${isCorrupted ? "border-red-500/50" : "border-slate-700"} rounded-lg p-4 transition-all duration-300 ${isCorrupted ? "animate-pulse" : ""}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className={`h-5 w-5 text-${qualityColor}-500`} />
          <span className="text-lg font-bold">{label}</span>
        </div>
        <div
          className={`${qualityBg} rounded-full px-3 py-1 text-sm font-semibold text-${qualityColor}-400`}
        >
          {quality}% Quality
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Name:</span>
          <span className="font-mono text-white">{doug.name}</span>
        </div>

        <div className="space-y-2 border-l-2 border-slate-700 pl-4">
          <div className="font-semibold text-slate-400">Memories:</div>

          <div className="space-y-1 pl-4">
            <div className="text-slate-400">Family:</div>
            <div className="space-y-1 pl-4">
              {onModify ? (
                <>
                  <input
                    type="text"
                    value={doug.memories.family.wife}
                    onChange={(e) => onModify("wife", e.target.value)}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-white"
                    placeholder="Wife's name"
                  />
                  <input
                    type="text"
                    value={doug.memories.family.daughter}
                    onChange={(e) => onModify("daughter", e.target.value)}
                    className="w-full rounded border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-white"
                    placeholder="Daughter's name"
                  />
                </>
              ) : (
                <>
                  <div className="text-xs">
                    Wife:{" "}
                    <span className="font-mono text-blue-400">
                      {doug.memories.family.wife}
                    </span>
                  </div>
                  <div className="text-xs">
                    Daughter:{" "}
                    <span className="font-mono text-blue-400">
                      {doug.memories.family.daughter}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="space-y-1 pl-4">
            <div className="text-slate-400">Opinions:</div>
            <div className="space-y-1 pl-4 text-xs">
              <div>
                Fence:{" "}
                <span className="font-mono text-blue-400">
                  {doug.memories.opinions.fence}
                </span>
              </div>
              <div>
                Wine:{" "}
                <span className="font-mono text-blue-400">
                  {doug.memories.opinions.wine}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MultiplicityModule() {
  const [chapter, setChapter] = useState(0);

  // Chapter 2 demo state
  const [originalDoug, setOriginalDoug] = useState<DougState>({
    name: "Doug Kinney",
    memories: {
      family: { wife: "Laura", daughter: "Jennifer" },
      opinions: { fence: "fine", wine: "expensive" },
    },
  });
  const [shallowClone, setShallowClone] = useState<DougState | null>(null);

  // Chapter 3 demo state
  const [clones, setClones] = useState<(DougState | null)[]>([
    {
      name: "Doug Kinney",
      memories: {
        family: { wife: "Laura", daughter: "Jennifer" },
        opinions: { fence: "fine", wine: "expensive" },
      },
    },
    null,
    null,
    null,
  ]);

  // Chapter 4 demo state
  const [shallowDemo, setShallowDemo] = useState<DougState>({
    name: "Doug (Shallow)",
    memories: {
      family: { wife: "Laura", daughter: "Jennifer" },
      opinions: { fence: "fine", wine: "expensive" },
    },
  });
  const [shallowDemoClone, setShallowDemoClone] = useState<DougState | null>(
    null,
  );
  const [deepDemo, setDeepDemo] = useState<DougState>({
    name: "Doug (Deep)",
    memories: {
      family: { wife: "Laura", daughter: "Jennifer" },
      opinions: { fence: "fine", wine: "expensive" },
    },
  });
  const [deepDemoClone, setDeepDemoClone] = useState<DougState | null>(null);

  const chapters = [
    {
      title: "One Doug to Rule Them All",
      subtitle: "Introduction to Object Copying",
    },
    {
      title: "The Shared Mind Problem",
      subtitle: "Shallow Copy Behavior",
    },
    {
      title: "Degradation Cascade",
      subtitle: "Nested Shallow Copy Corruption",
    },
    {
      title: "The Deep Copy Solution",
      subtitle: "True Independence",
    },
    {
      title: "Independence Day",
      subtitle: "Best Practices Summary",
    },
  ];

  const currentChapter = chapters[chapter];

  const createShallowClone = () => {
    const clone = { ...originalDoug };
    setShallowClone(clone);
  };

  const modifyShallowClone = (path: string, value: string) => {
    if (!shallowClone) return;

    const updated = { ...shallowClone };
    if (path === "wife") {
      updated.memories.family.wife = value;
    } else if (path === "daughter") {
      updated.memories.family.daughter = value;
    }
    setShallowClone(updated);

    // Update original too (showing shared reference)
    setOriginalDoug((prev) => ({
      ...prev,
      memories: {
        ...prev.memories,
        family: {
          ...prev.memories.family,
          [path]: value,
        },
      },
    }));
  };

  const createClone = (sourceIndex: number) => {
    const source = clones[sourceIndex];
    if (!source) return;

    const newClones = [...clones];
    // Shallow copy
    newClones[sourceIndex + 1] = { ...source };
    setClones(newClones);
  };

  const corruptClone = () => {
    if (!clones[3]) return;

    const newClones = [...clones];
    // Modify Doug #4's nested property
    if (newClones[3]) {
      newClones[3].memories.family.wife = "Lorna";
      newClones[3].memories.opinions.fence = "peppy";
    }

    // Corruption ripples backward
    if (newClones[2]) {
      newClones[2].memories.family.wife = "Lorna";
      newClones[2].memories.opinions.fence = "peppy";
    }
    if (newClones[1]) {
      newClones[1].memories.family.wife = "Lorna";
      newClones[1].memories.opinions.fence = "peppy";
    }
    if (newClones[0]) {
      newClones[0].memories.family.wife = "Lorna";
      newClones[0].memories.opinions.fence = "peppy";
    }

    setClones(newClones);
  };

  const resetClones = () => {
    setClones([
      {
        name: "Doug Kinney",
        memories: {
          family: { wife: "Laura", daughter: "Jennifer" },
          opinions: { fence: "fine", wine: "expensive" },
        },
      },
      null,
      null,
      null,
    ]);
  };

  const createShallowDemoClone = () => {
    const clone = { ...shallowDemo };
    setShallowDemoClone(clone);
  };

  const modifyShallowDemoClone = () => {
    if (!shallowDemoClone) return;

    const updated = { ...shallowDemoClone };
    updated.memories.family.wife = "Lorna";
    setShallowDemoClone(updated);

    // Original changes too
    setShallowDemo((prev) => ({
      ...prev,
      memories: {
        ...prev.memories,
        family: {
          ...prev.memories.family,
          wife: "Lorna",
        },
      },
    }));
  };

  const createDeepDemoClone = () => {
    const clone = structuredClone(deepDemo);
    setDeepDemoClone(clone);
  };

  const modifyDeepDemoClone = () => {
    if (!deepDemoClone) return;

    const updated = structuredClone(deepDemoClone);
    updated.memories.family.wife = "Lorna";
    setDeepDemoClone(updated);
  };

  const resetChapter4 = () => {
    setShallowDemo({
      name: "Doug (Shallow)",
      memories: {
        family: { wife: "Laura", daughter: "Jennifer" },
        opinions: { fence: "fine", wine: "expensive" },
      },
    });
    setShallowDemoClone(null);
    setDeepDemo({
      name: "Doug (Deep)",
      memories: {
        family: { wife: "Laura", daughter: "Jennifer" },
        opinions: { fence: "fine", wine: "expensive" },
      },
    });
    setDeepDemoClone(null);
  };

  const cloneQualities = useMemo(() => {
    return [100, 85, 60, 25];
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-2 flex items-center gap-3">
            <Copy className="h-8 w-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-white">Multiplicity</h1>
          </div>
          <p className="text-xl text-blue-400">
            Component Cloning: Shallow vs Deep Copy
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Doug Kinney, Suburban America, 1996
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-white">
            {currentChapter.title}
          </h2>
          <p className="text-lg text-blue-400">{currentChapter.subtitle}</p>
        </div>

        {/* Chapter 0: Introduction */}
        {chapter === 0 && (
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Doug Kinney stands in his suburban driveway at 6:47 AM,
                briefcase in one hand, coffee in the other, trying to remember
                if he promised to coach his daughter's soccer game or attend his
                wife Laura's work dinner. Both are tonight. Both are
                non-negotiable.
              </p>
              <p className="text-lg leading-relaxed">
                Inside the house, Laura calls out a reminder about the broken
                dishwasher. From the garage, his son yells about needing a ride
                to band practice. His pager buzzes—the office, already. Doug
                closes his eyes and does the mental math: 24 hours, 47
                commitments, one human body.
              </p>
              <p className="text-lg leading-relaxed">The math doesn't work.</p>
              <p className="text-lg leading-relaxed">
                This is when Doug meets Dr. Owen Leeds, a geneticist with a
                solution that sounds like science fiction: a cloning machine.
                Not the slow, grow-a-baby-in-a-vat kind. The instant,
                walk-in-walk-out-with-a-duplicate kind.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
              <div className="mb-4 flex items-start gap-4">
                <Code className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    In React: The Copying Problem
                  </h3>
                  <p className="text-slate-300">
                    We face Doug's dilemma constantly. We have a component with
                    state—an object full of data, nested properties, arrays of
                    information. We need to create a copy of that state to
                    update it immutably.
                  </p>
                </div>
              </div>

              <div className="rounded bg-slate-950 p-4 font-mono text-sm">
                <div className="text-slate-500">
                  // We reach for the spread operator:
                </div>
                <div className="text-blue-400">
                  const <span className="text-white">newState</span> = {"{"} ...
                  <span className="text-yellow-400">oldState</span> {"}"};
                </div>
                <div className="mt-2 text-slate-500">
                  // It looks perfect. It feels perfect.
                </div>
                <div className="text-slate-500">
                  // We've created a "clone" of our state, right?
                </div>
              </div>

              <div className="mt-4 rounded border border-yellow-500/30 bg-yellow-500/10 p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
                  <p className="text-sm text-yellow-200">
                    Just like Doug, we're about to discover that "copy" is a
                    more complicated word than it appears.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center italic text-slate-400">
              "This is going to work," they say in unison. They have no idea
              what they've just created.
            </div>
          </div>
        )}

        {/* Chapter 1: Shared Mind Problem */}
        {chapter === 1 && (
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                For the first week, it's paradise. Doug #1 goes to work, crushes
                his presentations. Doug #2 stays home, fixes the dishwasher,
                coaches soccer. They high-five when they pass each other in the
                hallway.
              </p>
              <p className="text-lg leading-relaxed">
                Then, on Tuesday, something strange happens. Doug #2 is at the
                grocery store when he sees Laura's favorite wine on sale. He
                grabs three bottles. That evening, Doug #1 comes home from work
                and immediately says, "Did you get that wine?"
              </p>
              <p className="text-lg leading-relaxed">
                Doug #2 freezes. "How did you know I bought wine?"
              </p>
              <p className="text-lg leading-relaxed">
                "I... I don't know. I just remembered doing it."
              </p>
              <p className="text-lg leading-relaxed">
                They stare at each other. Doug #1 wasn't at the grocery store.
                He was in a budget meeting. But he remembers the fluorescent
                lights, the sale sign, the weight of the bottles in the cart.
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                <Users className="h-6 w-6 text-blue-500" />
                Interactive Demo: Shared References
              </h3>

              <p className="mb-6 text-slate-300">
                Create a shallow clone and modify its nested properties. Watch
                how both objects change together.
              </p>

              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <CloneCard
                  doug={originalDoug}
                  label="Doug #1 (Original)"
                  quality={100}
                  isCorrupted={false}
                />

                {shallowClone && (
                  <CloneCard
                    doug={shallowClone}
                    label="Doug #2 (Shallow Clone)"
                    quality={100}
                    isCorrupted={false}
                    onModify={modifyShallowClone}
                  />
                )}
              </div>

              {!shallowClone ? (
                <button
                  onClick={createShallowClone}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <Copy className="h-5 w-5" />
                  Create Shallow Clone
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="rounded border border-yellow-500/30 bg-yellow-500/10 p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
                      <div className="text-sm text-yellow-200">
                        <p className="mb-1 font-semibold">
                          Try modifying Doug #2's wife or daughter name above.
                        </p>
                        <p>
                          Notice how Doug #1's memories change too! They're
                          sharing the same nested object reference.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded bg-slate-950 p-4 font-mono text-xs">
                    <div className="text-slate-500">
                      // The shallow copy problem:
                    </div>
                    <div className="mt-2 text-blue-400">
                      const <span className="text-white">doug2</span> = {"{"}{" "}
                      ...<span className="text-yellow-400">doug1</span> {"}"};
                    </div>
                    <div className="mt-2 text-slate-500">
                      // doug2.memories points to the SAME object as
                      doug1.memories
                    </div>
                    <div className="mt-2 text-blue-400">
                      doug2.memories.family.wife ={" "}
                      <span className="text-green-400">"Lorna"</span>;
                    </div>
                    <div className="text-slate-500">
                      // doug1.memories.family.wife is now "Lorna" too!
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center italic text-slate-400">
              "We're not copies. We're more like... two browsers with the same
              cache."
            </div>
          </div>
        )}

        {/* Chapter 2: Degradation Cascade */}
        {chapter === 2 && (
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Doug #2 makes the decision on a Thursday. He's overwhelmed—even
                with the workload split, there's too much. He needs another him.
              </p>
              <p className="text-lg leading-relaxed">
                "Don't," Doug #1 warns. "We don't know what'll happen."
              </p>
              <p className="text-lg leading-relaxed">
                But Doug #2 is already at Dr. Leeds's lab. Thirty seconds later,
                Doug #3 steps out. He's... different. His movements are slightly
                slower. His smile takes a half-second longer to form.
              </p>
              <p className="text-lg leading-relaxed">
                Then Doug #3 makes Doug #4. And Doug #4 says: "She touched my
                peppy, Steve."
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                Clone Degradation Simulator
              </h3>

              <p className="mb-6 text-slate-300">
                Create clones of clones and watch the quality degrade. Then
                corrupt Doug #4 and see the cascade.
              </p>

              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {clones.map(
                  (clone, index) =>
                    clone && (
                      <CloneCard
                        key={index}
                        doug={clone}
                        label={`Doug #${index + 1}`}
                        quality={cloneQualities[index]}
                        isCorrupted={clone.memories.opinions.fence === "peppy"}
                      />
                    ),
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {!clones[1] && (
                  <button
                    onClick={() => createClone(0)}
                    className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <Copy className="h-4 w-4" />
                    Create Doug #2
                  </button>
                )}
                {clones[1] && !clones[2] && (
                  <button
                    onClick={() => createClone(1)}
                    className="flex items-center gap-2 rounded bg-yellow-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-yellow-700"
                  >
                    <Copy className="h-4 w-4" />
                    Create Doug #3
                  </button>
                )}
                {clones[2] && !clones[3] && (
                  <button
                    onClick={() => createClone(2)}
                    className="flex items-center gap-2 rounded bg-orange-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-700"
                  >
                    <Copy className="h-4 w-4" />
                    Create Doug #4
                  </button>
                )}
                {clones[3] && clones[3].memories.opinions.fence !== "peppy" && (
                  <button
                    onClick={corruptClone}
                    className="flex items-center gap-2 rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Corrupt Doug #4
                  </button>
                )}
                <button
                  onClick={resetClones}
                  className="rounded bg-slate-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-slate-600"
                >
                  Reset
                </button>
              </div>

              {clones[3] && clones[3].memories.opinions.fence === "peppy" && (
                <div className="mt-6 rounded border border-red-500/30 bg-red-500/10 p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                    <div className="text-sm text-red-200">
                      <p className="mb-1 font-semibold">
                        Catastrophic Corruption!
                      </p>
                      <p>
                        Doug #4's corrupted data has rippled backward through
                        all the clones. This is what happens with nested shallow
                        copies—change one, corrupt them all.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center italic text-slate-400">
              "This is what happens when you copy without understanding what
              you're copying."
            </div>
          </div>
        )}

        {/* Chapter 3: Deep Copy Solution */}
        {chapter === 3 && (
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Dr. Owen Leeds arrives at 2 AM. He finds four Dougs in various
                states of confusion. Doug #4 is trying to eat a remote control.
              </p>
              <p className="text-lg leading-relaxed">
                "The machine does shallow cloning," Dr. Leeds explains. "I copy
                your physical structure, your neural patterns, your memory
                pathways. But the memories themselves—the actual data—those are
                stored in a shared substrate. It's more efficient. Faster."
              </p>
              <p className="text-lg leading-relaxed">
                "So we're not independent," Doug #2 says.
              </p>
              <p className="text-lg leading-relaxed">
                "Not at the deep level, no. But if you were to start over...
                you'd need deep cloning. Complete independence at every level."
              </p>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Shallow vs Deep Comparison
              </h3>

              <p className="mb-6 text-slate-300">
                See the difference between shallow and deep copying. Modify the
                clones and watch what happens to the originals.
              </p>

              <div className="mb-6 grid gap-6 lg:grid-cols-2">
                {/* Shallow Copy Demo */}
                <div className="space-y-4">
                  <div className="rounded border border-red-500/30 bg-red-500/10 p-3">
                    <h4 className="mb-1 flex items-center gap-2 font-bold text-red-400">
                      <AlertTriangle className="h-4 w-4" />
                      Shallow Copy (Shared References)
                    </h4>
                    <p className="text-xs text-red-200">
                      Changes affect both objects
                    </p>
                  </div>

                  <div className="space-y-3">
                    <CloneCard
                      doug={shallowDemo}
                      label="Original"
                      quality={100}
                      isCorrupted={shallowDemo.memories.family.wife === "Lorna"}
                    />
                    {shallowDemoClone && (
                      <CloneCard
                        doug={shallowDemoClone}
                        label="Shallow Clone"
                        quality={100}
                        isCorrupted={false}
                      />
                    )}
                  </div>

                  {!shallowDemoClone ? (
                    <button
                      onClick={createShallowDemoClone}
                      className="w-full rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      Create Shallow Clone
                    </button>
                  ) : (
                    <button
                      onClick={modifyShallowDemoClone}
                      disabled={shallowDemo.memories.family.wife === "Lorna"}
                      className="w-full rounded bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-700"
                    >
                      {shallowDemo.memories.family.wife === "Lorna"
                        ? "Both Changed!"
                        : "Modify Clone"}
                    </button>
                  )}

                  <div className="rounded bg-slate-950 p-3 font-mono text-xs">
                    <div className="text-blue-400">
                      const clone = {"{"} ...original {"}"};
                    </div>
                    <div className="mt-1 text-slate-500">
                      // Nested objects still shared!
                    </div>
                  </div>
                </div>

                {/* Deep Copy Demo */}
                <div className="space-y-4">
                  <div className="rounded border border-green-500/30 bg-green-500/10 p-3">
                    <h4 className="mb-1 flex items-center gap-2 font-bold text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      Deep Copy (True Independence)
                    </h4>
                    <p className="text-xs text-green-200">
                      Changes are isolated
                    </p>
                  </div>

                  <div className="space-y-3">
                    <CloneCard
                      doug={deepDemo}
                      label="Original"
                      quality={100}
                      isCorrupted={false}
                    />
                    {deepDemoClone && (
                      <CloneCard
                        doug={deepDemoClone}
                        label="Deep Clone"
                        quality={100}
                        isCorrupted={
                          deepDemoClone.memories.family.wife === "Lorna"
                        }
                      />
                    )}
                  </div>

                  {!deepDemoClone ? (
                    <button
                      onClick={createDeepDemoClone}
                      className="w-full rounded bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700"
                    >
                      Create Deep Clone
                    </button>
                  ) : (
                    <button
                      onClick={modifyDeepDemoClone}
                      disabled={deepDemoClone.memories.family.wife === "Lorna"}
                      className="w-full rounded bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-700"
                    >
                      {deepDemoClone.memories.family.wife === "Lorna"
                        ? "Only Clone Changed!"
                        : "Modify Clone"}
                    </button>
                  )}

                  <div className="rounded bg-slate-950 p-3 font-mono text-xs">
                    <div className="text-blue-400">
                      const clone = structuredClone(original);
                    </div>
                    <div className="mt-1 text-slate-500">
                      // Complete independence!
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={resetChapter4}
                className="w-full rounded bg-slate-700 px-4 py-2 font-semibold text-white transition-colors hover:bg-slate-600"
              >
                Reset Demo
              </button>
            </div>

            <div className="text-center italic text-slate-400">
              "Deep cloning means copying everything. It takes longer. Uses more
              resources. But each clone is truly independent."
            </div>
          </div>
        )}

        {/* Chapter 4: Summary */}
        {chapter === 4 && (
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Six months later, Doug Kinney stands in his driveway with Doug
                #2—the new Doug #2, the deep-cloned one. They look identical,
                but they're fundamentally different. When Doug #1 learns
                something new, Doug #2 doesn't automatically know it. They're
                independent.
              </p>
              <p className="text-lg leading-relaxed">
                "How's it feel?" Doug #1 asks.
              </p>
              <p className="text-lg leading-relaxed">
                "Like being my own person," Doug #2 says. "Weird, but good."
              </p>
            </div>

            <div className="space-y-6">
              {/* Shallow Copy Reference */}
              <div className="rounded-lg border border-red-500/30 bg-slate-900 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  Shallow Copy: The Surface Clone
                </h3>

                <div className="mb-4 rounded bg-slate-950 p-4 font-mono text-sm">
                  <div className="text-blue-400">
                    const <span className="text-white">newState</span> = {"{"}{" "}
                    ...<span className="text-yellow-400">oldState</span> {"}"};
                  </div>
                  <div className="text-blue-400">
                    const <span className="text-white">newArray</span> = [...
                    <span className="text-yellow-400">oldArray</span>];
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="mb-1 font-semibold text-white">
                      What it copies:
                    </div>
                    <ul className="list-inside list-disc space-y-1 text-slate-300">
                      <li>Top-level properties</li>
                      <li>
                        References to nested objects/arrays (not the objects
                        themselves)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="mb-1 font-semibold text-white">
                      When to use it:
                    </div>
                    <ul className="list-inside list-disc space-y-1 text-green-300">
                      <li>Flat objects with no nesting</li>
                      <li>Only changing top-level properties</li>
                      <li>Performance-critical code</li>
                      <li>Immutable data patterns</li>
                    </ul>
                  </div>

                  <div>
                    <div className="mb-1 font-semibold text-white">
                      The danger:
                    </div>
                    <div className="rounded border border-red-500/30 bg-red-500/10 p-3 text-red-200">
                      Nested objects are shared. Change one, change all.
                    </div>
                  </div>
                </div>
              </div>

              {/* Deep Copy Reference */}
              <div className="rounded-lg border border-green-500/30 bg-slate-900 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  Deep Copy: The Complete Clone
                </h3>

                <div className="mb-4 rounded bg-slate-950 p-4 font-mono text-sm">
                  <div className="text-blue-400">
                    const <span className="text-white">newState</span> ={" "}
                    <span className="text-yellow-400">structuredClone</span>(
                    <span className="text-white">oldState</span>);
                  </div>
                  <div className="mt-2 text-slate-500">// or</div>
                  <div className="text-blue-400">
                    const <span className="text-white">newState</span> ={" "}
                    <span className="text-yellow-400">JSON.parse</span>(
                    <span className="text-yellow-400">JSON.stringify</span>(
                    <span className="text-white">oldState</span>));
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="mb-1 font-semibold text-white">
                      What it copies:
                    </div>
                    <ul className="list-inside list-disc space-y-1 text-slate-300">
                      <li>Everything, recursively</li>
                      <li>All nested objects and arrays</li>
                      <li>Complete independence at every level</li>
                    </ul>
                  </div>

                  <div>
                    <div className="mb-1 font-semibold text-white">
                      When to use it:
                    </div>
                    <ul className="list-inside list-disc space-y-1 text-green-300">
                      <li>Complex nested structures</li>
                      <li>User input or external data</li>
                      <li>Need guaranteed independence</li>
                      <li>Unsure what's nested inside</li>
                    </ul>
                  </div>

                  <div>
                    <div className="mb-1 font-semibold text-white">
                      The cost:
                    </div>
                    <ul className="list-inside list-disc space-y-1 text-yellow-300">
                      <li>Slower than shallow copy</li>
                      <li>Uses more memory</li>
                      <li>
                        Can't clone functions or circular references (JSON
                        method)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Red Flags */}
              <div className="rounded-lg border border-yellow-500/30 bg-slate-900 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                  Red Flags: You Need Deep Copy
                </h3>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-500">⚠</span>
                    <span>Changing nested property affects original</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-500">⚠</span>
                    <span>Multiple components share state unexpectedly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-500">⚠</span>
                    <span>State updates cause unrelated re-renders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-500">⚠</span>
                    <span>Debugging "ghost mutations"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-red-500">⚠</span>
                    <span>You find yourself saying "peppy"</span>
                  </li>
                </ul>
              </div>

              {/* Key Takeaway */}
              <div className="rounded-lg border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-green-500/10 p-6">
                <h3 className="mb-3 text-2xl font-bold text-white">
                  The Mental Model
                </h3>
                <p className="mb-4 text-lg text-slate-300">
                  Think of your state object as Doug Kinney:
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-400" />
                    <span>
                      <strong className="text-white">Shallow copy</strong> =
                      Cloning machine that shares memories (fast, efficient,
                      linked)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-400" />
                    <span>
                      <strong className="text-white">Deep copy</strong> =
                      Complete independence (slower, more resources, truly
                      separate)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                    <span>
                      <strong className="text-white">
                        Nested shallow copies
                      </strong>{" "}
                      = Doug #4 (degraded, corrupted, disaster)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center text-xl font-semibold italic text-blue-400">
              "In React, as in life, true independence requires going deep."
            </div>
          </div>
        )}
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/95 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={() => setChapter((c) => c - 1)}
            disabled={chapter === 0}
            className="rounded bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="text-center">
            <div className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {currentChapter.title}
            </div>
          </div>

          <button
            onClick={() => setChapter((c) => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="rounded bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
