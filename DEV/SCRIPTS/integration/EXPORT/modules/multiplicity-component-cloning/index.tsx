import { useState, useMemo } from "react";
import { Copy, Users, AlertTriangle, CheckCircle, Code, ArrowRight } from "lucide-react";

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

const CloneCard = ({ doug, label, quality, isCorrupted, onModify }: CloneCardProps) => {
  if (!doug) return null;

  const qualityColor = quality > 80 ? "green" : quality > 50 ? "yellow" : "red";
  const qualityBg = quality > 80 ? "bg-green-500/20" : quality > 50 ? "bg-yellow-500/20" : "bg-red-500/20";

  return (
    <div className={`bg-slate-800 border-2 ${isCorrupted ? "border-red-500/50" : "border-slate-700"} rounded-lg p-4 transition-all duration-300 ${isCorrupted ? "animate-pulse" : ""}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className={`w-5 h-5 text-${qualityColor}-500`} />
          <span className="font-bold text-lg">{label}</span>
        </div>
        <div className={`${qualityBg} px-3 py-1 rounded-full text-sm font-semibold text-${qualityColor}-400`}>
          {quality}% Quality
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-slate-400">Name:</span>
          <span className="text-white font-mono">{doug.name}</span>
        </div>
        
        <div className="pl-4 border-l-2 border-slate-700 space-y-2">
          <div className="text-slate-400 font-semibold">Memories:</div>
          
          <div className="pl-4 space-y-1">
            <div className="text-slate-400">Family:</div>
            <div className="pl-4 space-y-1">
              {onModify ? (
                <>
                  <input
                    type="text"
                    value={doug.memories.family.wife}
                    onChange={(e) => onModify("wife", e.target.value)}
                    className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white text-xs w-full"
                    placeholder="Wife's name"
                  />
                  <input
                    type="text"
                    value={doug.memories.family.daughter}
                    onChange={(e) => onModify("daughter", e.target.value)}
                    className="bg-slate-900 border border-slate-600 rounded px-2 py-1 text-white text-xs w-full"
                    placeholder="Daughter's name"
                  />
                </>
              ) : (
                <>
                  <div className="text-xs">Wife: <span className="text-blue-400 font-mono">{doug.memories.family.wife}</span></div>
                  <div className="text-xs">Daughter: <span className="text-blue-400 font-mono">{doug.memories.family.daughter}</span></div>
                </>
              )}
            </div>
          </div>
          
          <div className="pl-4 space-y-1">
            <div className="text-slate-400">Opinions:</div>
            <div className="pl-4 space-y-1 text-xs">
              <div>Fence: <span className="text-blue-400 font-mono">{doug.memories.opinions.fence}</span></div>
              <div>Wine: <span className="text-blue-400 font-mono">{doug.memories.opinions.wine}</span></div>
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
      opinions: { fence: "fine", wine: "expensive" }
    }
  });
  const [shallowClone, setShallowClone] = useState<DougState | null>(null);
  
  // Chapter 3 demo state
  const [clones, setClones] = useState<(DougState | null)[]>([
    {
      name: "Doug Kinney",
      memories: {
        family: { wife: "Laura", daughter: "Jennifer" },
        opinions: { fence: "fine", wine: "expensive" }
      }
    },
    null,
    null,
    null
  ]);
  
  // Chapter 4 demo state
  const [shallowDemo, setShallowDemo] = useState<DougState>({
    name: "Doug (Shallow)",
    memories: {
      family: { wife: "Laura", daughter: "Jennifer" },
      opinions: { fence: "fine", wine: "expensive" }
    }
  });
  const [shallowDemoClone, setShallowDemoClone] = useState<DougState | null>(null);
  const [deepDemo, setDeepDemo] = useState<DougState>({
    name: "Doug (Deep)",
    memories: {
      family: { wife: "Laura", daughter: "Jennifer" },
      opinions: { fence: "fine", wine: "expensive" }
    }
  });
  const [deepDemoClone, setDeepDemoClone] = useState<DougState | null>(null);

  const chapters = [
    {
      title: "One Doug to Rule Them All",
      subtitle: "Introduction to Object Copying"
    },
    {
      title: "The Shared Mind Problem",
      subtitle: "Shallow Copy Behavior"
    },
    {
      title: "Degradation Cascade",
      subtitle: "Nested Shallow Copy Corruption"
    },
    {
      title: "The Deep Copy Solution",
      subtitle: "True Independence"
    },
    {
      title: "Independence Day",
      subtitle: "Best Practices Summary"
    }
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
    setOriginalDoug(prev => ({
      ...prev,
      memories: {
        ...prev.memories,
        family: {
          ...prev.memories.family,
          [path]: value
        }
      }
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
          opinions: { fence: "fine", wine: "expensive" }
        }
      },
      null,
      null,
      null
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
    setShallowDemo(prev => ({
      ...prev,
      memories: {
        ...prev.memories,
        family: {
          ...prev.memories.family,
          wife: "Lorna"
        }
      }
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
        opinions: { fence: "fine", wine: "expensive" }
      }
    });
    setShallowDemoClone(null);
    setDeepDemo({
      name: "Doug (Deep)",
      memories: {
        family: { wife: "Laura", daughter: "Jennifer" },
        opinions: { fence: "fine", wine: "expensive" }
      }
    });
    setDeepDemoClone(null);
  };

  const cloneQualities = useMemo(() => {
    return [100, 85, 60, 25];
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Copy className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-white">Multiplicity</h1>
          </div>
          <p className="text-xl text-blue-400">Component Cloning: Shallow vs Deep Copy</p>
          <p className="text-sm text-slate-400 mt-2">Doug Kinney, Suburban America, 1996</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{currentChapter.title}</h2>
          <p className="text-lg text-blue-400">{currentChapter.subtitle}</p>
        </div>

        {/* Chapter 0: Introduction */}
        {chapter === 0 &amp;&amp; (
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Doug Kinney stands in his suburban driveway at 6:47 AM, briefcase in one hand, coffee in the other, trying to remember if he promised to coach his daughter's soccer game or attend his wife Laura's work dinner. Both are tonight. Both are non-negotiable.
              </p>
              <p className="text-lg leading-relaxed">
                Inside the house, Laura calls out a reminder about the broken dishwasher. From the garage, his son yells about needing a ride to band practice. His pager buzzes—the office, already. Doug closes his eyes and does the mental math: 24 hours, 47 commitments, one human body.
              </p>
              <p className="text-lg leading-relaxed">
                The math doesn't work.
              </p>
              <p className="text-lg leading-relaxed">
                This is when Doug meets Dr. Owen Leeds, a geneticist with a solution that sounds like science fiction: a cloning machine. Not the slow, grow-a-baby-in-a-vat kind. The instant, walk-in-walk-out-with-a-duplicate kind.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <div className="flex items-start gap-4 mb-4">
                <Code className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">In React: The Copying Problem</h3>
                  <p className="text-slate-300">
                    We face Doug's dilemma constantly. We have a component with state—an object full of data, nested properties, arrays of information. We need to create a copy of that state to update it immutably.
                  </p>
                </div>
              </div>
              
              <div className="bg-slate-950 rounded p-4 font-mono text-sm">
                <div className="text-slate-500">// We reach for the spread operator:</div>
                <div className="text-blue-400">const <span className="text-white">newState</span> = {'{'} ...<span className="text-yellow-400">oldState</span> {'}'};</div>
                <div className="text-slate-500 mt-2">// It looks perfect. It feels perfect.</div>
                <div className="text-slate-500">// We've created a "clone" of our state, right?</div>
              </div>

              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-200">
                    Just like Doug, we're about to discover that "copy" is a more complicated word than it appears.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center text-slate-400 italic">
              "This is going to work," they say in unison. They have no idea what they've just created.
            </div>
          </div>
        )}

        {/* Chapter 1: Shared Mind Problem */}
        {chapter === 1 &amp;&amp; (
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                For the first week, it's paradise. Doug #1 goes to work, crushes his presentations. Doug #2 stays home, fixes the dishwasher, coaches soccer. They high-five when they pass each other in the hallway.
              </p>
              <p className="text-lg leading-relaxed">
                Then, on Tuesday, something strange happens. Doug #2 is at the grocery store when he sees Laura's favorite wine on sale. He grabs three bottles. That evening, Doug #1 comes home from work and immediately says, "Did you get that wine?"
              </p>
              <p className="text-lg leading-relaxed">
                Doug #2 freezes. "How did you know I bought wine?"
              </p>
              <p className="text-lg leading-relaxed">
                "I... I don't know. I just remembered doing it."
              </p>
              <p className="text-lg leading-relaxed">
                They stare at each other. Doug #1 wasn't at the grocery store. He was in a budget meeting. But he remembers the fluorescent lights, the sale sign, the weight of the bottles in the cart.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-500" />
                Interactive Demo: Shared References
              </h3>
              
              <p className="text-slate-300 mb-6">
                Create a shallow clone and modify its nested properties. Watch how both objects change together.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <CloneCard
                  doug={originalDoug}
                  label="Doug #1 (Original)"
                  quality={100}
                  isCorrupted={false}
                />
                
                {shallowClone &amp;&amp; (
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-5 h-5" />
                  Create Shallow Clone
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-yellow-200">
                        <p className="font-semibold mb-1">Try modifying Doug #2's wife or daughter name above.</p>
                        <p>Notice how Doug #1's memories change too! They're sharing the same nested object reference.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 rounded p-4 font-mono text-xs">
                    <div className="text-slate-500">// The shallow copy problem:</div>
                    <div className="text-blue-400 mt-2">const <span className="text-white">doug2</span> = {'{'} ...<span className="text-yellow-400">doug1</span> {'}'};</div>
                    <div className="text-slate-500 mt-2">// doug2.memories points to the SAME object as doug1.memories</div>
                    <div className="text-blue-400 mt-2">doug2.memories.family.wife = <span className="text-green-400">"Lorna"</span>;</div>
                    <div className="text-slate-500">// doug1.memories.family.wife is now "Lorna" too!</div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-slate-400 italic">
              "We're not copies. We're more like... two browsers with the same cache."
            </div>
          </div>
        )}

        {/* Chapter 2: Degradation Cascade */}
        {chapter === 2 &amp;&amp; (
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Doug #2 makes the decision on a Thursday. He's overwhelmed—even with the workload split, there's too much. He needs another him.
              </p>
              <p className="text-lg leading-relaxed">
                "Don't," Doug #1 warns. "We don't know what'll happen."
              </p>
              <p className="text-lg leading-relaxed">
                But Doug #2 is already at Dr. Leeds's lab. Thirty seconds later, Doug #3 steps out. He's... different. His movements are slightly slower. His smile takes a half-second longer to form.
              </p>
              <p className="text-lg leading-relaxed">
                Then Doug #3 makes Doug #4. And Doug #4 says: "She touched my peppy, Steve."
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                Clone Degradation Simulator
              </h3>
              
              <p className="text-slate-300 mb-6">
                Create clones of clones and watch the quality degrade. Then corrupt Doug #4 and see the cascade.
              </p>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {clones.map((clone, index) => (
                  clone &amp;&amp; (
                    <CloneCard
                      key={index}
                      doug={clone}
                      label={`Doug #${index + 1}`}
                      quality={cloneQualities[index]}
                      isCorrupted={clone.memories.opinions.fence === "peppy"}
                    />
                  )
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {!clones[1] &amp;&amp; (
                  <button
                    onClick={() => createClone(0)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Create Doug #2
                  </button>
                )}
                {clones[1] &amp;&amp; !clones[2] &amp;&amp; (
                  <button
                    onClick={() => createClone(1)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded transition-colors flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Create Doug #3
                  </button>
                )}
                {clones[2] &amp;&amp; !clones[3] &amp;&amp; (
                  <button
                    onClick={() => createClone(2)}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded transition-colors flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Create Doug #4
                  </button>
                )}
                {clones[3] &amp;&amp; clones[3].memories.opinions.fence !== "peppy" &amp;&amp; (
                  <button
                    onClick={corruptClone}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors flex items-center gap-2"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Corrupt Doug #4
                  </button>
                )}
                <button
                  onClick={resetClones}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                  Reset
                </button>
              </div>

              {clones[3] &amp;&amp; clones[3].memories.opinions.fence === "peppy" &amp;&amp; (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-200">
                      <p className="font-semibold mb-1">Catastrophic Corruption!</p>
                      <p>Doug #4's corrupted data has rippled backward through all the clones. This is what happens with nested shallow copies—change one, corrupt them all.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-slate-400 italic">
              "This is what happens when you copy without understanding what you're copying."
            </div>
          </div>
        )}

        {/* Chapter 3: Deep Copy Solution */}
        {chapter === 3 &amp;&amp; (
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Dr. Owen Leeds arrives at 2 AM. He finds four Dougs in various states of confusion. Doug #4 is trying to eat a remote control.
              </p>
              <p className="text-lg leading-relaxed">
                "The machine does shallow cloning," Dr. Leeds explains. "I copy your physical structure, your neural patterns, your memory pathways. But the memories themselves—the actual data—those are stored in a shared substrate. It's more efficient. Faster."
              </p>
              <p className="text-lg leading-relaxed">
                "So we're not independent," Doug #2 says.
              </p>
              <p className="text-lg leading-relaxed">
                "Not at the deep level, no. But if you were to start over... you'd need deep cloning. Complete independence at every level."
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                Shallow vs Deep Comparison
              </h3>
              
              <p className="text-slate-300 mb-6">
                See the difference between shallow and deep copying. Modify the clones and watch what happens to the originals.
              </p>

              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Shallow Copy Demo */}
                <div className="space-y-4">
                  <div className="bg-red-500/10 border border-red-500/30 rounded p-3">
                    <h4 className="font-bold text-red-400 mb-1 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Shallow Copy (Shared References)
                    </h4>
                    <p className="text-xs text-red-200">Changes affect both objects</p>
                  </div>

                  <div className="space-y-3">
                    <CloneCard
                      doug={shallowDemo}
                      label="Original"
                      quality={100}
                      isCorrupted={shallowDemo.memories.family.wife === "Lorna"}
                    />
                    {shallowDemoClone &amp;&amp; (
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
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                    >
                      Create Shallow Clone
                    </button>
                  ) : (
                    <button
                      onClick={modifyShallowDemoClone}
                      disabled={shallowDemo.memories.family.wife === "Lorna"}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors"
                    >
                      {shallowDemo.memories.family.wife === "Lorna" ? "Both Changed!" : "Modify Clone"}
                    </button>
                  )}

                  <div className="bg-slate-950 rounded p-3 font-mono text-xs">
                    <div className="text-blue-400">const clone = {'{'} ...original {'}'};</div>
                    <div className="text-slate-500 mt-1">// Nested objects still shared!</div>
                  </div>
                </div>

                {/* Deep Copy Demo */}
                <div className="space-y-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                    <h4 className="font-bold text-green-400 mb-1 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Deep Copy (True Independence)
                    </h4>
                    <p className="text-xs text-green-200">Changes are isolated</p>
                  </div>

                  <div className="space-y-3">
                    <CloneCard
                      doug={deepDemo}
                      label="Original"
                      quality={100}
                      isCorrupted={false}
                    />
                    {deepDemoClone &amp;&amp; (
                      <CloneCard
                        doug={deepDemoClone}
                        label="Deep Clone"
                        quality={100}
                        isCorrupted={deepDemoClone.memories.family.wife === "Lorna"}
                      />
                    )}
                  </div>

                  {!deepDemoClone ? (
                    <button
                      onClick={createDeepDemoClone}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                    >
                      Create Deep Clone
                    </button>
                  ) : (
                    <button
                      onClick={modifyDeepDemoClone}
                      disabled={deepDemoClone.memories.family.wife === "Lorna"}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded transition-colors"
                    >
                      {deepDemoClone.memories.family.wife === "Lorna" ? "Only Clone Changed!" : "Modify Clone"}
                    </button>
                  )}

                  <div className="bg-slate-950 rounded p-3 font-mono text-xs">
                    <div className="text-blue-400">const clone = structuredClone(original);</div>
                    <div className="text-slate-500 mt-1">// Complete independence!</div>
                  </div>
                </div>
              </div>

              <button
                onClick={resetChapter4}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Reset Demo
              </button>
            </div>

            <div className="text-center text-slate-400 italic">
              "Deep cloning means copying everything. It takes longer. Uses more resources. But each clone is truly independent."
            </div>
          </div>
        )}

        {/* Chapter 4: Summary */}
        {chapter === 4 &amp;&amp; (
          <div className="space-y-8">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed">
                Six months later, Doug Kinney stands in his driveway with Doug #2—the new Doug #2, the deep-cloned one. They look identical, but they're fundamentally different. When Doug #1 learns something new, Doug #2 doesn't automatically know it. They're independent.
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
              <div className="bg-slate-900 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  Shallow Copy: The Surface Clone
                </h3>
                
                <div className="bg-slate-950 rounded p-4 font-mono text-sm mb-4">
                  <div className="text-blue-400">const <span className="text-white">newState</span> = {'{'} ...<span className="text-yellow-400">oldState</span> {'}'};</div>
                  <div className="text-blue-400">const <span className="text-white">newArray</span> = [...<span className="text-yellow-400">oldArray</span>];</div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-white mb-1">What it copies:</div>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>Top-level properties</li>
                      <li>References to nested objects/arrays (not the objects themselves)</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold text-white mb-1">When to use it:</div>
                    <ul className="list-disc list-inside text-green-300 space-y-1">
                      <li>Flat objects with no nesting</li>
                      <li>Only changing top-level properties</li>
                      <li>Performance-critical code</li>
                      <li>Immutable data patterns</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold text-white mb-1">The danger:</div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-red-200">
                      Nested objects are shared. Change one, change all.
                    </div>
                  </div>
                </div>
              </div>

              {/* Deep Copy Reference */}
              <div className="bg-slate-900 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  Deep Copy: The Complete Clone
                </h3>
                
                <div className="bg-slate-950 rounded p-4 font-mono text-sm mb-4">
                  <div className="text-blue-400">const <span className="text-white">newState</span> = <span className="text-yellow-400">structuredClone</span>(<span className="text-white">oldState</span>);</div>
                  <div className="text-slate-500 mt-2">// or</div>
                  <div className="text-blue-400">const <span className="text-white">newState</span> = <span className="text-yellow-400">JSON.parse</span>(<span className="text-yellow-400">JSON.stringify</span>(<span className="text-white">oldState</span>));</div>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold text-white mb-1">What it copies:</div>
                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                      <li>Everything, recursively</li>
                      <li>All nested objects and arrays</li>
                      <li>Complete independence at every level</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold text-white mb-1">When to use it:</div>
                    <ul className="list-disc list-inside text-green-300 space-y-1">
                      <li>Complex nested structures</li>
                      <li>User input or external data</li>
                      <li>Need guaranteed independence</li>
                      <li>Unsure what's nested inside</li>
                    </ul>
                  </div>

                  <div>
                    <div className="font-semibold text-white mb-1">The cost:</div>
                    <ul className="list-disc list-inside text-yellow-300 space-y-1">
                      <li>Slower than shallow copy</li>
                      <li>Uses more memory</li>
                      <li>Can't clone functions or circular references (JSON method)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Red Flags */}
              <div className="bg-slate-900 border border-yellow-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                  Red Flags: You Need Deep Copy
                </h3>
                
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">⚠</span>
                    <span>Changing nested property affects original</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">⚠</span>
                    <span>Multiple components share state unexpectedly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">⚠</span>
                    <span>State updates cause unrelated re-renders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">⚠</span>
                    <span>Debugging "ghost mutations"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">⚠</span>
                    <span>You find yourself saying "peppy"</span>
                  </li>
                </ul>
              </div>

              {/* Key Takeaway */}
              <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/30 rounded-lg p-6">
                <h3 className="text-2xl font-bold text-white mb-3">The Mental Model</h3>
                <p className="text-lg text-slate-300 mb-4">
                  Think of your state object as Doug Kinney:
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Shallow copy</strong> = Cloning machine that shares memories (fast, efficient, linked)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Deep copy</strong> = Complete independence (slower, more resources, truly separate)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span><strong className="text-white">Nested shallow copies</strong> = Doug #4 (degraded, corrupted, disaster)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center text-xl text-blue-400 font-semibold italic">
              "In React, as in life, true independence requires going deep."
            </div>
          </div>
        )}
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => setChapter(c => c - 1)}
            disabled={chapter === 0}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded transition-colors"
          >
            Previous
          </button>
          
          <div className="text-center">
            <div className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {currentChapter.title}
            </div>
          </div>
          
          <button
            onClick={() => setChapter(c => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded transition-colors"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}