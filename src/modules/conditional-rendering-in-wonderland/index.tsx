import { useState, useEffect, useMemo } from "react";
import {
  DoorOpen,
  Cat,
  Coffee,
  Scale,
  Key,
  Users,
  Minus,
  Plus,
  Check,
  X,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
  color: string;
  icon: React.ReactNode;
}

interface Guest {
  id: string;
  name: string;
  present: boolean;
}

export default function ConditionalRenderingInWonderland(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [aliceSize, setAliceSize] = useState<"small" | "normal" | "giant">(
    "normal",
  );
  const [isCatVisible, setIsCatVisible] = useState<boolean>(false);
  const [antiPatternMode, setAntiPatternMode] = useState<"broken" | "fixed">(
    "broken",
  );
  const [distortionPain, setDistortionPain] = useState<number>(0);
  const [teaPartyGuests, setTeaPartyGuests] = useState<Guest[]>([
    { id: "1", name: "March Hare", present: true },
    { id: "2", name: "Dormouse", present: false },
    { id: "3", name: "Cheshire Cat", present: false },
  ]);
  const [courtConditions, setCourtConditions] = useState({
    isKnave: true,
    tartStolen: true,
    witnessIsHatter: false,
    witnessIsAlice: true,
  });

  // Circuit breaker for anti-pattern demo
  useEffect(() => {
    if (distortionPain > 50) {
      setDistortionPain(0);
      setAntiPatternMode("fixed");
      setAliceSize("normal");
    }
  }, [distortionPain]);

  const chapters: Chapter[] = [
    {
      title: "The Hall of Shifting Doors",
      content:
        "The fall ended. Alice found herself in a long, low hall, lit by a row of lamps hanging from the ceiling. Behind a low curtain she discovered a small door, no more than fifteen inches high. She found a tiny golden key that fit the lock perfectly. Peering through, she saw the loveliest garden she had ever seen. But she couldn't so much as get her head through the doorway. Then she noticed a small bottle labeled 'DRINK ME'. As she drank, a wide, knowing grin materialized in the air before her—just the grin, hanging unsupported. The Cheshire Cat faded into view, then vanished again, starting with the tail and ending with the grin. One moment, a cat was there. The next, it was not. Alice stared at the empty air, a thought forming in her mind. In Wonderland, what you see depends entirely on what you are.",
      color: "text-sky-500",
      icon: <DoorOpen className="h-5 w-5" />,
    },
    {
      title: "A Most Awkward Predicament",
      content:
        "The potion worked. Alice felt herself shrinking rapidly. She ran to the tiny door—it opened! But the key was still on the table, now a sheer cliff she couldn't climb. She was the right size for the door, but wrong for the key. After weeping, she found a cake marked 'EAT ME'. She ate it, and soon her head pressed against the ceiling. She could now reach the key, but the door was a mouse-hole. In panicked desperation, she tried to be both sizes at once—taking a sip while keeping her arm long. The result was agonizing. A sharp, tearing sensation ripped through her shoulder. Her proportions became a grotesque nightmare. One part giant, the other tiny, the junction searing with pain. 'You can't be two sizes at once,' she sobbed. 'You'll simply tear yourself apart.'",
      color: "text-rose-500",
      icon: <Key className="h-5 w-5" />,
    },
    {
      title: "The Cat's Logic",
      content:
        "Alice lay on the floor, defeated by contradictory rules. 'A bit of a muddle, are we?' The Cheshire Cat faded into view. 'It's no use!' Alice cried. 'To get the key, I must be large. To get through the door, I must be small. I tried to be both, and it nearly broke me!' The Cat chuckled. 'That's not how Wonderland works. You can go this way, or that way. But you cannot go both.' As it vanished, leaving only a grin, it delivered the revelation: 'Choose one path, and one path only. The other will simply cease to be.' Everything clicked. With newfound clarity, Alice executed a clean sequence: grow large to get the key, then shrink small to use it. No pain, no conflict—just elegant conditional execution. The garden lay before her.",
      color: "text-emerald-500",
      icon: <Cat className="h-5 w-5" />,
    },
    {
      title: "A Tale of Two Tea Parties",
      content:
        "Alice arrived at a tea party under a tree. The table was set for dozens, but only three guests were present. Dirty cups and plates piled everywhere. 'No room! No room!' they cried. The Hatter poured tea into an empty cup. 'For the White Rabbit, in case he arrives!' He checked the Dormouse. 'Is he awake? No? Then no tea for him!' But the cup remained, unused. He was preparing for states that weren't active. Later, Alice hosted her own party. A field mouse approached. 'If you are here,' she said, 'then you shall have a cup.' She placed a thimble. The Cheshire Cat's grin shimmered. 'And if you are here, then you shall have one too.' A saucer appeared. The cat vanished, and she removed the saucer. 'The Hatter's table shows everything that could be. My table shows only what is.'",
      color: "text-amber-500",
      icon: <Coffee className="h-5 w-5" />,
    },
    {
      title: "The Queen's Conditional Court",
      content:
        "A trumpet blast shattered the peace. Playing cards seized Alice, dragging her to court. The Queen of Hearts glared down. The old Alice would have trembled. But this Alice saw a system, governed by rules. The Queen bellowed a complex decree. The White Rabbit read: 'IF the prisoner is the Knave of Hearts, AND the charge is theft of tarts, AND the witness is the Mad Hatter, THEN the verdict is Off with his head! ELSE IF the witness is a girl named Alice, THEN the verdict is Let her speak! ELSE, the verdict is Trial postponed!' A hush fell. Alice calmly parsed the nested conditions. The prisoner was the Knave. The charge was tarts. But the witness was not the Hatter. First condition: false. The witness was a girl named Alice. Second condition: true. Outcome determined. She felt no fear. The Queen's rage was just a set of rules. If you know the conditions, you know the outcome.",
      color: "text-purple-500",
      icon: <Scale className="h-5 w-5" />,
    },
  ];

  // Code examples for each chapter
  const codeExamples = useMemo(
    () => [
      {
        title: "Conditional Access with && Operator",
        correct: `// ✅ Only render when condition is true
function DoorToGarden() {
  const [aliceSize, setAliceSize] = useState('normal');
  
  return (
    <div>
      {/* Door only accessible when small */}
      {aliceSize === 'small' && (
        <div className="door-open">
          <Key /> Enter the garden
        </div>
      )}
      
      {/* Cat appears only when visible */}
      {isCatVisible && <CheshireCat />}
    </div>
  );
}`,
        incorrect: `// ❌ Complex, non-mutually exclusive conditions
function DoorToGarden() {
  const [aliceSize, setAliceSize] = useState('normal');
  
  return (
    <div>
      {/* Both states rendered simultaneously */}
      <div className={aliceSize === 'small' ? 'visible' : 'hidden'}>
        <Key /> Enter the garden
      </div>
      <div className={aliceSize === 'normal' ? 'visible' : 'invisible'}>
        Can't reach the key
      </div>
    </div>
  );
}`,
      },
      {
        title: "Mutually Exclusive Ternary Operator",
        correct: `// ✅ Clean ternary for exclusive states
function AliceRenderer() {
  const [size, setSize] = useState('normal');
  
  return (
    <div>
      {size === 'small' ? (
        <SmallAlice onDoorClick={openTinyDoor} />
      ) : size === 'giant' ? (
        <GiantAlice onKeyReach={grabKey} />
      ) : (
        <NormalAlice />
      )}
    </div>
  );
}`,
        incorrect: `// ❌ Trying to render multiple states
function AliceRenderer() {
  const [size, setSize] = useState('normal');
  
  return (
    <div>
      {/* All components rendered, visibility toggled */}
      <SmallAlice style={{ opacity: size === 'small' ? 1 : 0.3 }} />
      <GiantAlice style={{ opacity: size === 'giant' ? 1 : 0.3 }} />
      <NormalAlice style={{ opacity: size === 'normal' ? 1 : 0.3 }} />
      {/* All three exist in DOM simultaneously! */}
    </div>
  );
}`,
      },
      {
        title: "Conditional List Rendering",
        correct: `// ✅ Render only present guests
function TeaPartyTable() {
  const [guests, setGuests] = useState([
    { name: 'March Hare', present: true },
    { name: 'Dormouse', present: false },
  ]);
  
  return (
    <table>
      {guests
        .filter(guest => guest.present)
        .map(guest => (
          <TeaCup key={guest.name} guest={guest.name} />
        ))
      }
    </table>
  );
}`,
        incorrect: `// ❌ Render all, hide absent
function TeaPartyTable() {
  const [guests, setGuests] = useState([
    { name: 'March Hare', present: true },
    { name: 'Dormouse', present: false },
  ]);
  
  return (
    <table>
      {guests.map(guest => (
        <TeaCup 
          key={guest.name} 
          guest={guest.name}
          style={{ display: guest.present ? 'block' : 'none' }}
        />
      ))}
      {/* Empty cups still in DOM! */}
    </table>
  );
}`,
      },
      {
        title: "Nested Conditional Logic",
        correct: `// ✅ Clear nested conditions
function CourtVerdict() {
  const { isKnave, tartStolen, witness } = useCourtState();
  
  if (isKnave && tartStolen && witness === 'Hatter') {
    return <Verdict>Off with his head!</Verdict>;
  } else if (witness === 'Alice') {
    return <Verdict>Let her speak!</Verdict>;
  } else {
    return <Verdict>Trial postponed!</Verdict>;
  }
}`,
        incorrect: `// ❌ Overly complex single expression
function CourtVerdict() {
  const { isKnave, tartStolen, witness } = useCourtState();
  
  return (
    <Verdict>
      {isKnave && tartStolen && witness === 'Hatter' 
        ? 'Off with his head!'
        : witness === 'Alice'
        ? 'Let her speak!'
        : 'Trial postponed!'}
    </Verdict>
  );
}`,
      },
    ],
    [],
  );

  // Chapter-specific demos
  const renderChapterDemo = () => {
    switch (chapter) {
      case 0: // Chapter 1: Door accessibility
        return (
          <div className="space-y-8">
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
              <div
                className={`border-2 ${aliceSize === "small" ? "border-sky-500" : "border-slate-700"} rounded-lg p-6 transition-all duration-300`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-16 w-16 items-center justify-center ${aliceSize === "small" ? "bg-sky-500/20" : "bg-slate-800"} rounded-lg`}
                  >
                    <DoorOpen
                      className={`h-8 w-8 ${aliceSize === "small" ? "text-sky-500" : "text-slate-600"}`}
                    />
                  </div>
                  <div>
                    <h3 className="mb-2 font-bold">Tiny Door to Garden</h3>
                    <p className="text-sm text-slate-400">
                      {aliceSize === "small"
                        ? "✅ Door is accessible! Alice can enter the garden."
                        : "❌ Door is too small. Alice cannot fit."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div
                  className={`flex h-24 w-24 items-center justify-center rounded-full border-4 ${aliceSize === "small" ? "border-sky-500 bg-sky-500/10" : aliceSize === "giant" ? "border-rose-500 bg-rose-500/10" : "border-slate-600 bg-slate-800"}`}
                >
                  <span
                    className={`text-xl font-bold ${aliceSize === "small" ? "text-sky-500" : aliceSize === "giant" ? "text-rose-500" : "text-slate-400"}`}
                  >
                    {aliceSize === "small"
                      ? "Small"
                      : aliceSize === "giant"
                        ? "Giant"
                        : "Normal"}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setAliceSize("small")}
                    className={`rounded px-4 py-2 ${aliceSize === "small" ? "bg-sky-600" : "bg-slate-700"} transition-colors hover:bg-sky-700`}
                  >
                    Drink Potion
                  </button>
                  <button
                    onClick={() => setAliceSize("giant")}
                    className={`rounded px-4 py-2 ${aliceSize === "giant" ? "bg-rose-600" : "bg-slate-700"} transition-colors hover:bg-rose-700`}
                  >
                    Eat Cake
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-900/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold">
                  <Cat className="h-5 w-5" /> Cheshire Cat Visibility
                </h3>
                <button
                  onClick={() => setIsCatVisible(!isCatVisible)}
                  className="rounded bg-purple-600 px-4 py-2 transition-colors hover:bg-purple-700"
                >
                  {isCatVisible ? "Make Disappear" : "Make Appear"}
                </button>
              </div>

              <div className="flex justify-center py-8">
                {isCatVisible ? (
                  <div className="relative">
                    <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                      <Cat className="h-16 w-16 text-purple-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-slate-700">
                    <div className="text-center text-slate-600">
                      <Cat className="mx-auto mb-2 h-8 w-8 opacity-30" />
                      <p className="text-xs">Not rendered</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 1: // Chapter 2: Anti-pattern
        return (
          <div className="space-y-8">
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setAntiPatternMode("broken")}
                className={`rounded px-6 py-3 ${antiPatternMode === "broken" ? "bg-rose-600" : "bg-slate-700"} transition-colors hover:bg-rose-700`}
              >
                ❌ Show Anti-Pattern
              </button>
              <button
                onClick={() => setAntiPatternMode("fixed")}
                className={`rounded px-6 py-3 ${antiPatternMode === "fixed" ? "bg-emerald-600" : "bg-slate-700"} transition-colors hover:bg-emerald-700`}
              >
                ✅ Show Solution
              </button>
            </div>

            {antiPatternMode === "broken" ? (
              <div className="rounded-lg border border-rose-500/30 bg-rose-950/30 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-bold text-rose-500">
                    <X className="h-5 w-5" /> Trying to Render Both Sizes
                  </h3>
                  <button
                    onClick={() => {
                      setDistortionPain((p) => Math.min(50, p + 10));
                      setAliceSize((p) => (p === "small" ? "giant" : "small"));
                    }}
                    className="rounded bg-rose-700 px-4 py-2 transition-colors hover:bg-rose-800"
                  >
                    🐛 Trigger Distortion
                  </button>
                </div>

                <div className="relative h-48 overflow-hidden rounded-lg bg-slate-900/50">
                  {/* Both Alices rendered simultaneously */}
                  <div
                    className={`absolute top-8 left-1/4 transition-all duration-500 ${aliceSize === "small" ? "scale-75 opacity-100" : "scale-50 opacity-30"}`}
                  >
                    <div className="flex h-32 w-20 items-center justify-center rounded-lg border border-sky-500/50 bg-sky-500/30">
                      <span className="font-bold text-sky-400">
                        Small Alice
                      </span>
                    </div>
                  </div>

                  <div
                    className={`absolute top-8 right-1/4 transition-all duration-500 ${aliceSize === "giant" ? "scale-125 opacity-100" : "scale-100 opacity-30"}`}
                  >
                    <div className="flex h-40 w-24 items-center justify-center rounded-lg border border-rose-500/50 bg-rose-500/30">
                      <span className="font-bold text-rose-400">
                        Giant Alice
                      </span>
                    </div>
                  </div>

                  {/* Distortion pain indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform">
                    <div className="h-4 w-64 overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 to-rose-700 transition-all duration-300"
                        style={{ width: `${distortionPain * 2}%` }}
                      />
                    </div>
                    <p className="mt-2 text-center text-sm text-rose-400">
                      Distortion Pain: {distortionPain}/50
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-center text-sm text-rose-400">
                  Both components exist in DOM simultaneously, causing layout
                  conflicts and inefficiency.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/30 p-6">
                <h3 className="mb-6 flex items-center gap-2 font-bold text-emerald-500">
                  <Check className="h-5 w-5" /> Clean Conditional Rendering
                </h3>

                <div className="flex justify-center py-8">
                  {aliceSize === "small" && (
                    <div className="animate-in fade-in zoom-in">
                      <div className="flex h-48 w-32 items-center justify-center rounded-lg border-2 border-sky-500 bg-sky-500/20">
                        <span className="text-xl font-bold text-sky-400">
                          Small Alice
                        </span>
                      </div>
                    </div>
                  )}
                  {aliceSize === "giant" && (
                    <div className="animate-in fade-in zoom-in">
                      <div className="flex h-56 w-40 items-center justify-center rounded-lg border-2 border-emerald-500 bg-emerald-500/20">
                        <span className="text-xl font-bold text-emerald-400">
                          Giant Alice
                        </span>
                      </div>
                    </div>
                  )}
                  {aliceSize === "normal" && (
                    <div className="flex h-40 w-28 items-center justify-center rounded-lg border border-slate-600 bg-slate-700/50">
                      <span className="font-bold text-slate-400">
                        Normal Alice
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-center gap-4">
                  <button
                    onClick={() => setAliceSize("small")}
                    className="rounded bg-sky-600 px-4 py-2 hover:bg-sky-700"
                  >
                    Shrink
                  </button>
                  <button
                    onClick={() => setAliceSize("normal")}
                    className="rounded bg-slate-600 px-4 py-2 hover:bg-slate-700"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => setAliceSize("giant")}
                    className="rounded bg-emerald-600 px-4 py-2 hover:bg-emerald-700"
                  >
                    Grow
                  </button>
                </div>
              </div>
            )}

            <CodeBlock
              code={codeExamples[1].incorrect}
              variant="error"
              title="// ❌ Anti-Pattern: Rendering Both States"
              defaultExpanded={antiPatternMode === "broken"}
            />
            <CodeBlock
              code={codeExamples[1].correct}
              variant="success"
              title="// ✅ Solution: Mutually Exclusive Rendering"
              defaultExpanded={antiPatternMode === "fixed"}
            />
          </div>
        );

      case 2: // Chapter 3: Solution
        return (
          <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
                <h3 className="mb-4 font-bold text-emerald-500">
                  Clean Conditional Logic
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Current Size:
                    </span>
                    <span
                      className={`font-bold ${aliceSize === "small" ? "text-sky-500" : aliceSize === "giant" ? "text-rose-500" : "text-slate-300"}`}
                    >
                      {aliceSize.charAt(0).toUpperCase() + aliceSize.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setAliceSize("small")}
                      className={`w-full rounded py-3 ${aliceSize === "small" ? "border-2 border-sky-500 bg-sky-600" : "bg-slate-800"} transition-all`}
                    >
                      {aliceSize === "small"
                        ? "✓ Small (Door accessible)"
                        : "Become Small"}
                    </button>
                    <button
                      onClick={() => setAliceSize("giant")}
                      className={`w-full rounded py-3 ${aliceSize === "giant" ? "border-2 border-rose-500 bg-rose-600" : "bg-slate-800"} transition-all`}
                    >
                      {aliceSize === "giant"
                        ? "✓ Giant (Key reachable)"
                        : "Become Giant"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-purple-500/30 bg-purple-950/20 p-6">
                <h3 className="mb-4 font-bold text-purple-500">
                  Conditional Component Mount
                </h3>

                <div className="flex flex-col items-center justify-center py-6">
                  {isCatVisible ? (
                    <div className="animate-in fade-in zoom-in">
                      <div className="relative">
                        <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30">
                          <Cat className="h-20 w-20 text-purple-400" />
                        </div>
                        <div className="absolute -top-2 -right-2 flex h-10 w-10 animate-pulse items-center justify-center rounded-full bg-emerald-500">
                          <span className="font-bold text-white">✓</span>
                        </div>
                      </div>
                      <p className="mt-4 text-center text-purple-400">
                        Cheshire Cat is mounted
                      </p>
                    </div>
                  ) : (
                    <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-dashed border-slate-700">
                      <div className="text-center">
                        <Cat className="mx-auto mb-3 h-12 w-12 text-slate-600" />
                        <p className="text-sm text-slate-500">Not mounted</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => setIsCatVisible(!isCatVisible)}
                    className="mt-6 rounded bg-purple-600 px-6 py-3 transition-colors hover:bg-purple-700"
                  >
                    {isCatVisible ? "Unmount Component" : "Mount Component"}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <CodeBlock
                code={`// Using ternary operator
function AliceView() {
  return aliceSize === 'small' ? (
    <SmallAlice onEnter={enterGarden} />
  ) : (
    <LargeAlice onReach={grabKey} />
  );
}`}
                variant="success"
                title="// ✅ Ternary: Choose One"
                defaultExpanded={true}
              />

              <CodeBlock
                code={`// Using && operator for optional
function WonderlandScene() {
  return (
    <div>
      {isCatVisible && <CheshireCat />}
      {hasPotion && <DrinkMeBottle />}
      {!isDoorLocked && <GardenView />}
    </div>
  );
}`}
                variant="success"
                title="// ✅ && for Optional Elements"
                defaultExpanded={true}
              />
            </div>
          </div>
        );

      case 3: // Chapter 4: Tea Party Comparison
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              {/* Mad Hatter's Table */}
              <div className="rounded-lg border border-rose-500/30 bg-rose-950/20 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-bold text-rose-500">
                    <Users className="h-5 w-5" /> Mad Hatter's Table
                  </h3>
                  <div className="rounded bg-rose-900/50 px-3 py-1 text-sm text-rose-400">
                    Inefficient
                  </div>
                </div>

                <div className="space-y-4">
                  {teaPartyGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className={`flex items-center justify-between rounded p-4 ${guest.present ? "bg-slate-800" : "bg-slate-900/50 opacity-50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-full ${guest.present ? "border border-amber-500/50 bg-amber-500/20" : "border border-slate-700 bg-slate-800"} flex items-center justify-center`}
                        >
                          <Coffee
                            className={`h-5 w-5 ${guest.present ? "text-amber-400" : "text-slate-600"}`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{guest.name}</p>
                          <p className="text-xs text-slate-500">
                            {guest.present ? "Present" : "Absent"} • Rendered
                            anyway
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          guest.present ? "text-emerald-500" : "text-slate-600"
                        }
                      >
                        {guest.present ? "Visible" : "Hidden"}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-center text-sm text-rose-400">
                  All guests rendered, visibility toggled with CSS
                </p>
              </div>

              {/* Alice's Table */}
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-bold text-emerald-500">
                    <Coffee className="h-5 w-5" /> Alice's Conditional Table
                  </h3>
                  <div className="rounded bg-emerald-900/50 px-3 py-1 text-sm text-emerald-400">
                    Efficient
                  </div>
                </div>

                <div className="space-y-4">
                  {teaPartyGuests
                    .filter((guest) => guest.present)
                    .map((guest) => (
                      <div
                        key={guest.id}
                        className="animate-in fade-in flex items-center justify-between rounded border border-emerald-500/30 bg-emerald-500/10 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/20">
                            <Coffee className="h-5 w-5 text-emerald-400" />
                          </div>
                          <div>
                            <p className="font-medium text-emerald-300">
                              {guest.name}
                            </p>
                            <p className="text-xs text-emerald-500/70">
                              Present • Conditionally rendered
                            </p>
                          </div>
                        </div>
                        <div className="text-emerald-500">✓ Mounted</div>
                      </div>
                    ))}

                  {teaPartyGuests.filter((g) => g.present).length === 0 && (
                    <div className="py-8 text-center text-slate-500">
                      <Coffee className="mx-auto mb-3 h-12 w-12 opacity-30" />
                      <p>No guests present • Nothing to render</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-slate-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 font-bold">
                <Users className="h-5 w-5" /> Guest Management
              </h3>

              <div className="mb-6 grid gap-4 md:grid-cols-3">
                {teaPartyGuests.map((guest) => (
                  <div
                    key={guest.id}
                    className="flex flex-col items-center gap-2 rounded bg-slate-800/50 p-4"
                  >
                    <span className="font-medium">{guest.name}</span>
                    <button
                      onClick={() => {
                        setTeaPartyGuests((prev) =>
                          prev.map((g) =>
                            g.id === guest.id
                              ? { ...g, present: !g.present }
                              : g,
                          ),
                        );
                      }}
                      className={`rounded px-3 py-1 ${guest.present ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-700 hover:bg-slate-600"} transition-colors`}
                    >
                      {guest.present ? "Present" : "Absent"}
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setTeaPartyGuests((prev) =>
                      prev.map((g) => ({ ...g, present: true })),
                    )
                  }
                  className="rounded bg-sky-600 px-4 py-2 hover:bg-sky-700"
                >
                  All Present
                </button>
                <button
                  onClick={() =>
                    setTeaPartyGuests((prev) =>
                      prev.map((g) => ({ ...g, present: false })),
                    )
                  }
                  className="rounded bg-slate-600 px-4 py-2 hover:bg-slate-700"
                >
                  All Absent
                </button>
              </div>
            </div>

            <CodeBlock
              code={codeExamples[2].incorrect}
              variant="error"
              title="// ❌ Hatter's Way: Render All, Hide Some"
              defaultExpanded={true}
            />
            <CodeBlock
              code={codeExamples[2].correct}
              variant="success"
              title="// ✅ Alice's Way: Render Only Present"
              defaultExpanded={true}
            />
          </div>
        );

      case 4: // Chapter 5: Queen's Court
        return (
          <div className="space-y-8">
            <div className="rounded-lg border border-purple-500/30 bg-purple-950/20 p-8">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-bold text-purple-500">
                  <Scale className="h-6 w-6" /> Queen's Conditional Court
                </h3>
                <div className="rounded bg-purple-900/50 px-3 py-1 text-sm text-purple-400">
                  Nested Conditions
                </div>
              </div>

              {/* Conditions Panel */}
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-bold text-slate-300">Court Conditions</h4>
                  {Object.entries(courtConditions).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded bg-slate-900/50 p-4"
                    >
                      <div>
                        <p className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <p className="text-xs text-slate-500">
                          {key === "isKnave"
                            ? "Prisoner is Knave of Hearts"
                            : key === "tartStolen"
                              ? "Tarts were stolen"
                              : key === "witnessIsHatter"
                                ? "Witness is Mad Hatter"
                                : "Witness is Alice"}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setCourtConditions((prev) => ({
                            ...prev,
                            [key]: !value,
                          }));
                        }}
                        className={`rounded px-4 py-2 ${value ? "bg-emerald-600" : "bg-slate-700"} transition-opacity hover:opacity-90`}
                      >
                        {value ? "True" : "False"}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Verdict Display */}
                <div className="rounded-lg bg-slate-900/70 p-6">
                  <h4 className="mb-4 font-bold text-slate-300">
                    Verdict Logic
                  </h4>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${courtConditions.isKnave && courtConditions.tartStolen && courtConditions.witnessIsHatter ? "bg-rose-500" : "bg-slate-700"}`}
                      >
                        {courtConditions.isKnave &&
                        courtConditions.tartStolen &&
                        courtConditions.witnessIsHatter ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <Minus className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      <span className="text-sm">
                        IF prisoner is Knave AND tarts stolen AND witness is
                        Hatter
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${!courtConditions.witnessIsHatter && courtConditions.witnessIsAlice ? "bg-sky-500" : "bg-slate-700"}`}
                      >
                        {!courtConditions.witnessIsHatter &&
                        courtConditions.witnessIsAlice ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <Minus className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      <span className="text-sm">ELSE IF witness is Alice</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${!(courtConditions.isKnave && courtConditions.tartStolen && courtConditions.witnessIsHatter) && !courtConditions.witnessIsAlice ? "bg-amber-500" : "bg-slate-700"}`}
                      >
                        {!(
                          courtConditions.isKnave &&
                          courtConditions.tartStolen &&
                          courtConditions.witnessIsHatter
                        ) && !courtConditions.witnessIsAlice ? (
                          <Check className="h-4 w-4 text-white" />
                        ) : (
                          <Minus className="h-4 w-4 text-slate-400" />
                        )}
                      </div>
                      <span className="text-sm">ELSE</span>
                    </div>
                  </div>

                  {/* Dynamic Verdict */}
                  <div className="mt-8 rounded-lg border bg-slate-950/50 p-6">
                    <p className="mb-2 text-sm text-slate-400">
                      Current Verdict:
                    </p>
                    {courtConditions.isKnave &&
                    courtConditions.tartStolen &&
                    courtConditions.witnessIsHatter ? (
                      <div className="animate-in fade-in">
                        <p className="text-2xl font-bold text-rose-500">
                          "Off with his head!"
                        </p>
                        <p className="mt-2 text-sm text-rose-400/70">
                          First condition satisfied
                        </p>
                      </div>
                    ) : courtConditions.witnessIsAlice ? (
                      <div className="animate-in fade-in">
                        <p className="text-2xl font-bold text-sky-500">
                          "Let her speak!"
                        </p>
                        <p className="mt-2 text-sm text-sky-400/70">
                          Second condition satisfied
                        </p>
                      </div>
                    ) : (
                      <div className="animate-in fade-in">
                        <p className="text-2xl font-bold text-amber-500">
                          "Trial postponed!"
                        </p>
                        <p className="mt-2 text-sm text-amber-400/70">
                          No conditions satisfied
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <CodeBlock
                code={codeExamples[3].correct}
                variant="success"
                title="// ✅ Clean Nested Conditional Logic"
                defaultExpanded={true}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-slate-900/50 p-6">
                <h4 className="mb-4 font-bold">Key Takeaways</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <Check className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span>
                      Use ternary (<code>? :</code>) for mutually exclusive
                      branches
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <Check className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span>
                      Use <code>&&</code> operator for optional elements
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                      <Check className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span>
                      Keep logic readable with early returns for complex
                      conditions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20">
                      <X className="h-4 w-4 text-rose-400" />
                    </div>
                    <span>Avoid rendering hidden elements—unmount instead</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-slate-900/50 p-6">
                <h4 className="mb-4 font-bold">Performance Impact</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      Conditional Mounting:
                    </span>
                    <span className="font-bold text-emerald-400">
                      Efficient
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div className="h-full w-1/4 rounded-full bg-emerald-500"></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      CSS Hide/Show:
                    </span>
                    <span className="font-bold text-amber-400">Moderate</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div className="h-full w-2/3 rounded-full bg-amber-500"></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Render All:</span>
                    <span className="font-bold text-rose-400">Inefficient</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div className="h-full w-full rounded-full bg-rose-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 font-serif text-slate-300">
      {/* Header */}
      <header className="top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <DoorOpen className="h-7 w-7 text-sky-500" />
              <div>
                <h1 className="text-xl font-bold sm:text-2xl">
                  Alice's Adventures in Wonderland
                </h1>
                <p className="text-sm text-slate-400">Conditional Rendering</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-slate-400">
                  Chapter {chapter + 1} of {chapters.length}
                </p>
                <div className="mt-1 h-1.5 w-32 rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-sky-500 to-purple-500 transition-all duration-500"
                    style={{
                      width: `${((chapter + 1) / chapters.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Chapter Header */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className={`rounded-lg p-2 ${currentChapter.color.replace("text-", "bg-")}/20`}
                >
                  {currentChapter.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    {currentChapter.title}
                  </h2>
                  <p className={`${currentChapter.color} font-medium`}>
                    {chapter === 0 && "Intro to Conditional Rendering"}
                    {chapter === 1 && "Anti-Pattern: Rendering Conflicts"}
                    {chapter === 2 && "Solution: Clean Conditional Logic"}
                    {chapter === 3 && "Comparison: Efficient vs Inefficient"}
                    {chapter === 4 && "Mastery: Nested Conditions"}
                  </p>
                </div>
              </div>

              <div className="prose prose-invert prose-lg max-w-none rounded-xl border border-slate-800 bg-slate-900/30 p-6">
                <p className="leading-relaxed text-slate-300">
                  {currentChapter.content}
                </p>
              </div>
            </div>

            {/* Interactive Demo Section */}
            <section className="mb-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                <span className="rounded-lg bg-sky-500/20 p-2">
                  <DoorOpen className="h-5 w-5 text-sky-400" />
                </span>
                Interactive Demonstration
              </h3>
              {renderChapterDemo()}
            </section>

            {/* Code Examples */}
            {[0, 1, 2, 3].includes(chapter) && (
              <section className="mb-8 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <span className="rounded-lg bg-purple-500/20 p-2">
                    <Cat className="h-5 w-5 text-purple-400" />
                  </span>
                  Code Patterns
                </h3>
                <div className="space-y-6">
                  <CodeBlock
                    code={codeExamples[chapter].correct}
                    variant="success"
                    title="// ✅ Recommended Approach"
                    defaultExpanded={true}
                  />
                  {chapter === 0 && (
                    <CodeBlock
                      code={codeExamples[chapter].incorrect}
                      variant="error"
                      title="// ❌ Common Misconception"
                      defaultExpanded={true}
                    />
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Cat className="h-5 w-5 text-sky-400" />
                  Wonderland Metaphors
                </h3>
                <div className="space-y-4">
                  <div className="rounded-lg border border-sky-500/30 bg-sky-500/10 p-3">
                    <p className="font-medium text-sky-400">Alice's Size</p>
                    <p className="text-sm text-slate-400">
                      Component state determining rendered output
                    </p>
                  </div>
                  <div className="rounded-lg border border-purple-500/30 bg-purple-500/10 p-3">
                    <p className="font-medium text-purple-400">Cheshire Cat</p>
                    <p className="text-sm text-slate-400">
                      Conditionally mounted component (<code>&&</code>)
                    </p>
                  </div>
                  <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-3">
                    <p className="font-medium text-rose-400">
                      Two Sizes at Once
                    </p>
                    <p className="text-sm text-slate-400">
                      Anti-pattern of rendering conflicting states
                    </p>
                  </div>
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
                    <p className="font-medium text-emerald-400">
                      The Cat's Logic
                    </p>
                    <p className="text-sm text-slate-400">
                      Ternary operator for exclusive choices
                    </p>
                  </div>
                </div>
              </div>

              {/* Chapter Navigation */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
                <h3 className="mb-4 text-lg font-bold">Chapter Navigation</h3>
                <div className="space-y-2">
                  {chapters.map((chap, idx) => (
                    <button
                      key={idx}
                      onClick={() => setChapter(idx)}
                      className={`w-full rounded-lg p-3 text-left transition-all ${chapter === idx ? "border border-sky-500/50 bg-sky-500/20" : "hover:bg-slate-800/50"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${chapter === idx ? "bg-sky-500" : "bg-slate-700"}`}
                        >
                          <span className="text-sm font-bold">{idx + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{chap.title}</p>
                          <p className="truncate text-xs text-slate-500">
                            {idx === 0 && "Intro to conditional rendering"}
                            {idx === 1 &&
                              "The anti-pattern of conflicting renders"}
                            {idx === 2 && "Clean, exclusive conditional logic"}
                            {idx === 3 && "Efficient vs. inefficient rendering"}
                            {idx === 4 && "Complex nested conditions"}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Prev/Next Buttons */}
                <div className="mt-6 flex justify-between border-t border-slate-800 pt-6">
                  <button
                    onClick={() => setChapter(Math.max(0, chapter - 1))}
                    disabled={chapter === 0}
                    className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-slate-300 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() =>
                      setChapter(Math.min(chapters.length - 1, chapter + 1))
                    }
                    disabled={chapter === chapters.length - 1}
                    className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
