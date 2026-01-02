import { useState, useEffect, useRef } from "react";
import {
  Wand,
  Sparkles,
  AlertTriangle,
  Check,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// ==================== TYPE DEFINITIONS ====================
interface WandProps {
  wood: string;
  core: string;
  length: number;
  wizard: string;
  isChosen?: boolean;
}

interface Chapter {
  title: string;
  content: string;
  atmosphere: string;
}

// ==================== REUSABLE COMPONENTS ====================
function WandComponent({ wood, core, length, wizard, isChosen }: WandProps) {
  const [animationRef] = useAutoAnimate();
  const [sparks, setSparks] = useState<number>(0);

  const coreColors: Record<string, string> = {
    "Phoenix Feather": "text-red-400",
    "Dragon Heartstring": "text-orange-400",
    "Unicorn Hair": "text-white",
    "Veela Hair": "text-pink-400",
  };

  const woodColors: Record<string, string> = {
    Holly: "text-amber-800",
    Beech: "text-yellow-800",
    Maple: "text-amber-600",
    Ash: "text-stone-600",
    Cherry: "text-rose-800",
    Yew: "text-green-800",
    Oak: "text-brown-800",
    Willow: "text-lime-700",
  };

  const castSpell = () => {
    if (isChosen) {
      setSparks((prev) => prev + 5);
      setTimeout(() => setSparks(0), 1000);
    }
  };

  return (
    <div
      ref={animationRef}
      className={`relative rounded-xl border-2 p-6 transition-all duration-300 ${
        isChosen
          ? "border-amber-500 bg-amber-950/30"
          : "border-slate-700 bg-slate-900/30"
      }`}
    >
      <div className="mb-4 flex items-center gap-4">
        <div
          className={`rounded-lg p-3 ${isChosen ? "bg-amber-900/50" : "bg-slate-800/50"}`}
        >
          <Wand
            className={`h-8 w-8 ${isChosen ? "text-amber-400" : "text-slate-400"}`}
          />
        </div>
        <div>
          <h3 className="text-xl font-bold">{wizard}'s Wand</h3>
          <p className="text-sm opacity-70">Presented by Ollivander</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="opacity-70">Wood:</span>
          <span className={`font-medium ${woodColors[wood] || "text-white"}`}>
            {wood}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">Core:</span>
          <span className={`font-medium ${coreColors[core] || "text-white"}`}>
            {core}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">Length:</span>
          <span className="font-mono">{length}"</span>
        </div>
      </div>

      <button
        onClick={castSpell}
        disabled={!isChosen}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 transition-all duration-300 ${
          isChosen
            ? "bg-amber-700 text-white hover:bg-amber-600"
            : "cursor-not-allowed bg-slate-800 text-slate-400"
        }`}
      >
        <Sparkles className="h-4 w-4" />
        {isChosen ? "Cast Lumos!" : "Wand Not Chosen"}
      </button>

      {sparks > 0 && (
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: sparks }).map((_, i) => (
            <div
              key={i}
              className="animate-spark absolute h-1 w-1 rounded-full bg-yellow-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes spark {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-spark {
          animation: spark 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function BrokenWandComponent({
  wood,
  core,
  length,
  wizard,
  onBackfire,
}: WandProps & {
  onBackfire: () => void;
}) {
  const [mutating, setMutating] = useState(false);
  const [backfires, setBackfires] = useState(0);

  const handleMutationAttempt = () => {
    setMutating(true);
    // Simulate the violent failure of trying to mutate props
    setTimeout(() => {
      setBackfires((prev) => {
        const newCount = prev + 1;
        if (newCount <= 3) {
          onBackfire();
        }
        return newCount;
      });
      setMutating(false);
    }, 800);
  };

  return (
    <div className="rounded-xl border-2 border-red-500/50 bg-red-950/20 p-6">
      <div className="mb-4 flex items-center gap-3">
        <AlertTriangle className="h-6 w-6 text-red-400" />
        <h3 className="text-xl font-bold">{wizard}'s Wand</h3>
        <span className="ml-auto rounded-full bg-red-900/50 px-3 py-1 text-sm text-red-300">
          Attempting Mutation
        </span>
      </div>

      <div className="mb-6 space-y-3">
        <div className="flex justify-between">
          <span className="opacity-70">Wood:</span>
          <span className="text-amber-600 line-through">{wood}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">Core:</span>
          <div className="flex items-center gap-2">
            <span className="text-red-300 line-through">{core}</span>
            <span className="text-sm opacity-50">→</span>
            <span className="font-medium text-orange-400">
              Dragon Heartstring?
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="opacity-70">Length:</span>
          <span className="font-mono">{length}"</span>
        </div>
      </div>

      <button
        onClick={handleMutationAttempt}
        disabled={backfires >= 3 || mutating}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-700 py-3 text-white transition-all duration-300 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-30"
      >
        {mutating ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Mutating Core...
          </>
        ) : backfires >= 3 ? (
          "❌ Mutation Failed"
        ) : (
          "Attempt Core Mutation (Anti-Pattern)"
        )}
      </button>

      {backfires > 0 && (
        <div className="mt-4 rounded-lg bg-red-900/30 p-3">
          <p className="text-sm text-red-300">
            <span className="font-bold">
              {backfires} backfire{backfires !== 1 ? "s" : ""}:
            </span>{" "}
            Wand rejects mutation attempt. Props are read-only!
          </p>
        </div>
      )}
    </div>
  );
}

// ==================== MAIN MODULE COMPONENT ====================
export default function PropsTheWandChoosesTheWizard(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [animationRef] = useAutoAnimate();
  const [harryWand, setHarryWand] = useState<WandProps>({
    wood: "Holly",
    core: "Phoenix Feather",
    length: 11,
    wizard: "Harry",
    isChosen: true,
  });
  const [wrongWands, setWrongWands] = useState<WandProps[]>([
    {
      wood: "Beech",
      core: "Dragon Heartstring",
      length: 9,
      wizard: "Test 1",
      isChosen: false,
    },
    {
      wood: "Maple",
      core: "Phoenix Feather",
      length: 7,
      wizard: "Test 2",
      isChosen: false,
    },
  ]);
  const [nevilleOldWand, setNevilleOldWand] = useState<WandProps>({
    wood: "Yew",
    core: "Dragon Heartstring",
    length: 10,
    wizard: "Neville (Old)",
    isChosen: false,
  });
  const [nevilleNewWand, setNevilleNewWand] = useState<WandProps>({
    wood: "Cherry",
    core: "Unicorn Hair",
    length: 13,
    wizard: "Neville (New)",
    isChosen: true,
  });
  const [ronBackfires, setRonBackfires] = useState(0);
  const [greatHallWands, setGreatHallWands] = useState<WandProps[]>([]);

  const chapters: Chapter[] = [
    {
      title: "The Wand Chooses the Wizard",
      content:
        "The bell above the door chimed a single, dusty note as Harry Potter stepped inside. The shop was narrow and shabby, but it felt ancient, filled with a potent silence. From floor to ceiling, thousands of slender boxes were stacked on precarious shelves, each containing a story, a potential. Garrick Ollivander emerged—the parent component, the one who knew the properties of every wand he'd ever sold. He presented wand after wand: 'Beechwood and dragon heartstring. Nine inches. Nice and flexible.' Each configuration caused chaos until finally, 'Holly and phoenix feather. Eleven inches.' The moment Harry touched it, red and gold sparks erupted. 'The wand chooses the wizard, Mr. Potter. It's not always clear why. But these properties—holly, phoenix feather, eleven inches—have chosen you.' The properties weren't just specifications; they were his configuration, a read-only gift that defined his magical identity.",
      atmosphere: "mysterious, ancient, fateful",
    },
    {
      title: "The Stubborn Core",
      content:
        "Ron Weasley stared at his hand-me-down wand in frustration. 'If it just had a dragon heartstring, like Harry's, I could actually do something!' He wanted to reach inside the component and mutate its props. Finding a dubious charm to 'reinforce a wand's inner essence,' he attempted it: 'Corpus immuto!' The result was immediate and violent. The wand didn't change; it objected. With a sound like a firecracker, it shot green, foul-smelling smoke into Ron's face. Hermione burst in, hands on hips. 'Were you trying to change your wand's core? Honestly, Ronald! You can't just change a wand's core! It's what it *is*. Its properties are set by the maker when it's created. They're immutable! Trying to force it is just going to break it worse.' Ron, coughing and covered in soot, learned the painful lesson: a wand's properties were not suggestions to be edited; they were rules to be respected.",
      atmosphere: "frustration, desperation, failure",
    },
    {
      title: "A New Wand for a New Task",
      content:
        "Neville Longbottom dreaded Duelling Club. His father's wand never felt right. Every Disarming Charm either fizzled or careened into the ceiling. The wand wasn't broken; its properties simply weren't his. Professor Lupin observed the struggle. 'That's a fine wand, Neville. But I'm not sure it's *your* wand.' He didn't suggest altering it. He escorted Neville back to Ollivander's—the original parent component. Ollivander took the old wand. 'Ah, yes. Yew, dragon heartstring. A powerful wand. But not for you.' There was no talk of modification. After careful measurements, Ollivander presented a new wand: 'Cherry, thirteen inches, with a unicorn hair core.' The moment Neville held it, it felt like an extension of his arm. 'Wingardium Leviosa.' The cushion lifted instantly, perfectly controlled. Lupin smiled. 'You see, Neville? To change the magic, you must change the wand.'",
      atmosphere: "triumphant, elegant, satisfying",
    },
    {
      title: "Two Wizards, Two Wands",
      content:
        "Ron shuddered, remembering his attempt. 'I was trying to force my wand to be something it wasn't.' The scene played out: frustration, the forbidden spell, the violent rejection, the stinking smoke. It was an act of force against a fundamental law, resulting in chaos and a more unreliable wand. Harry described Neville's trip: quiet, methodical. Neville standing in Ollivander's shop, not trying to fix his old wand, but allowing the master craftsman—the parent component—to determine the right configuration. No violent spell, no explosion. Just the calm presentation of a new wand with new properties: Cherry wood, unicorn hair. The result was harmony—a warm light, a perfectly executed spell, and a surge of confidence. Harry nodded. 'Neville was given one that was right for him from the start. He didn't change the wand; the wand was changed *for* him, by Ollivander.' Hermione summarized: 'You can't command a component to change its own nature. You can only ask its creator for a new one with the properties you need. The data flows one way—from the maker down. Always.'",
      atmosphere: "reflective, comparative, analytical",
    },
    {
      title: "The Great Hall of Wands",
      content:
        "Harry looked out over the Great Hall during the feast. Below the enchanted starry ceiling, hundreds of students sat at long tables. But tonight, Harry saw a vast, complex application brought to life. On the tables lay wands of every shape and size: a slender birch wand next to Hermione's books, a sturdy oak wand by a Hufflepuff's plate, the Weasley twins' identical-but-different wands. Each was an instance of a `<Wand />` component, rendered into the hall. They shared a common function, but their unique properties—wood, core, length, passed down from Ollivander—made each behave uniquely for its owner. The entire magical society was built on these configured components. He remembered Ollivander's wisdom: 'The properties of a wand are its unchangeable heart, a gift from its maker. Holly and phoenix feather. Willow and unicorn hair. They are not limitations; they are the very source of its unique magic.' Harry finally understood: data flows one way, from parent to child, from maker to wand. In that simple, immutable rule lay all the power and elegance of magic.",
      atmosphere: "celebratory, confident, complete",
    },
  ];

  // Initialize Great Hall wands
  useEffect(() => {
    if (chapter === 4 && greatHallWands.length === 0) {
      const wands: WandProps[] = [
        {
          wood: "Holly",
          core: "Phoenix Feather",
          length: 11,
          wizard: "Harry",
          isChosen: true,
        },
        {
          wood: "Willow",
          core: "Unicorn Hair",
          length: 14,
          wizard: "Hermione",
          isChosen: true,
        },
        {
          wood: "Ash",
          core: "Unicorn Hair",
          length: 12,
          wizard: "Ron",
          isChosen: true,
        },
        {
          wood: "Cherry",
          core: "Unicorn Hair",
          length: 13,
          wizard: "Neville",
          isChosen: true,
        },
        {
          wood: "Yew",
          core: "Dragon Heartstring",
          length: 13,
          wizard: "Voldemort",
          isChosen: true,
        },
        {
          wood: "Elder",
          core: "Thestral Hair",
          length: 15,
          wizard: "Dumbledore",
          isChosen: true,
        },
        {
          wood: "Vine",
          core: "Dragon Heartstring",
          length: 10,
          wizard: "Luna",
          isChosen: true,
        },
        {
          wood: "Hawthorn",
          core: "Unicorn Hair",
          length: 10,
          wizard: "Draco",
          isChosen: true,
        },
        {
          wood: "Cypress",
          core: "Phoenix Feather",
          length: 10,
          wizard: "Remus",
          isChosen: true,
        },
        {
          wood: "Blackthorn",
          core: "Veela Hair",
          length: 10,
          wizard: "Fleur",
          isChosen: true,
        },
        {
          wood: "Apple",
          core: "Unicorn Hair",
          length: 9,
          wizard: "Cedric",
          isChosen: true,
        },
        {
          wood: "Walnut",
          core: "Dragon Heartstring",
          length: 12,
          wizard: "Bellatrix",
          isChosen: true,
        },
      ];
      setGreatHallWands(wands);
    }
  }, [chapter, greatHallWands.length]);

  const currentChapter = chapters[chapter];

  // Chapter-specific code examples
  const introCode = `// Ollivander (Parent Component) creates wands with specific props
function OllivandersShop() {
  return (
    <div>
      {/* Passing props to child Wand components */}
      <Wand 
        wood="Holly" 
        core="Phoenix Feather" 
        length={11} 
        wizard="Harry" 
      />
      <Wand 
        wood="Beech" 
        core="Dragon Heartstring" 
        length={9} 
        wizard="Test" 
      />
    </div>
  );
}

// Wand component receives props (read-only!)
function Wand({ wood, core, length, wizard }) {
  // These props CANNOT be changed inside this component
  return (
    <div className="wand">
      <h3>{wizard}'s Wand</h3>
      <p>Wood: {wood}</p>
      <p>Core: {core}</p>
      <p>Length: {length}"</p>
    </div>
  );
}`;

  const antiPatternCode = `// ❌ ANTI-PATTERN: Trying to mutate props
function RonsBrokenWand({ core }) {
  const [mutatedCore, setMutatedCore] = useState(core);
  
  const tryToChangeCore = () => {
    // This creates a LOCAL copy, doesn't affect parent's prop
    setMutatedCore("Dragon Heartstring");
    // The original 'core' prop from parent remains unchanged!
    console.log("Original prop:", core); // Still "Unicorn Hair"
    console.log("Local state:", mutatedCore); // Now "Dragon Heartstring"
  };
  
  return (
    <div>
      <p>Original Core (from props): {core}</p>
      <p>Attempted Mutation: {mutatedCore}</p>
      <button onClick={tryToChangeCore}>
        Try to Change Core (WILL FAIL)
      </button>
    </div>
  );
}

// Parent component
function WeasleyHouse() {
  return <RonsBrokenWand core="Unicorn Hair" />;
}`;

  const solutionCode = `// ✅ SOLUTION: Parent provides new props
function NevillesWandJourney() {
  const [wandProps, setWandProps] = useState({
    wood: "Yew",
    core: "Dragon Heartstring",
    length: 10,
    wizard: "Neville"
  });

  const getNewWandFromOllivander = () => {
    // Parent component creates NEW props
    setWandProps({
      wood: "Cherry",
      core: "Unicorn Hair", 
      length: 13,
      wizard: "Neville"
    });
  };

  return (
    <div>
      {/* Child receives new props when parent updates them */}
      <Wand {...wandProps} />
      
      <button onClick={getNewWandFromOllivander}>
        Get New Wand from Ollivander
      </button>
    </div>
  );
}

// Wand component remains the same - it just receives new props
function Wand({ wood, core, length, wizard }) {
  // Props flow ONE WAY: parent → child
  return (
    <div className="wand">
      <h3>{wizard}'s Wand</h3>
      <p>Wood: {wood}</p>
      <p>Core: {core}</p>
      <p>Length: {length}"</p>
    </div>
  );
}`;

  const comparisonCode = `// Ron's Approach (Anti-Pattern)
<BrokenWand 
  wood="Ash"
  core="Unicorn Hair"
  length={12}
  wizard="Ron"
  onMutationAttempt={() => {
    // Violent backfire - props can't be mutated!
    console.error("Cannot mutate props!");
  }}
/>

// Neville's Approach (Solution)
<div>
  {/* Old wand */}
  <Wand 
    wood="Yew" 
    core="Dragon Heartstring" 
    length={10} 
    wizard="Neville (Old)" 
  />
  
  {/* New wand with different props */}
  <Wand 
    wood="Cherry" 
    core="Unicorn Hair" 
    length={13} 
    wizard="Neville (New)" 
  />
</div>`;

  const summaryCode = `// The Great Hall: Many component instances with different props
function GreatHall() {
  const wands = [
    { wood: "Holly", core: "Phoenix Feather", length: 11, wizard: "Harry" },
    { wood: "Willow", core: "Unicorn Hair", length: 14, wizard: "Hermione" },
    { wood: "Cherry", core: "Unicorn Hair", length: 13, wizard: "Neville" },
    // ... many more configurations
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {wands.map((wand, index) => (
        <Wand
          key={index}
          wood={wand.wood}
          core={wand.core}
          length={wand.length}
          wizard={wand.wizard}
        />
      ))}
    </div>
  );
}

// Each <Wand /> is the SAME component template
// Different props create different instances
// Props flow ONE WAY: Parent → Child
// Props are READ-ONLY in child components`;

  // Demo functions
  const tryWand = (index: number) => {
    setWrongWands((prev) =>
      prev.map((wand, i) => ({
        ...wand,
        isChosen: i === index,
      })),
    );
  };

  const resetRonDemo = () => {
    setRonBackfires(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 font-serif text-amber-50">
      {/* Header */}
      <header className="top-0 z-10 border-b border-amber-800/30 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Wand className="h-8 w-8 text-amber-400" />
              <h1 className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                Harry Potter and the Philosopher's Stone
              </h1>
            </div>
            <p className="text-sm text-amber-300/70 md:text-base">
              Harry Potter • Ollivander's • 1997
            </p>
          </div>
          <p className="text-base font-medium text-amber-400 md:text-lg">
            Props (Properties): The Wand Chooses the Wizard
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 gap-8 lg:grid-cols-7"
          ref={animationRef}
        >
          {/* Left Column: Narrative & Code */}
          <div className="lg:col-span-4">
            {/* Chapter Content */}
            <div className="prose prose-invert prose-lg mb-8 max-w-none">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-amber-500" />
                <h2 className="m-0 text-2xl font-bold md:text-3xl">
                  {currentChapter.title}
                </h2>
              </div>
              <p className="mb-6 leading-relaxed text-amber-100/90">
                {currentChapter.content}
              </p>
              <div className="flex items-center gap-2 text-sm text-amber-300/60">
                <div className="h-2 w-2 rounded-full bg-current" />
                Atmosphere: {currentChapter.atmosphere}
              </div>
            </div>

            {/* Code Examples */}
            <div className="mb-8 space-y-6">
              {chapter === 0 && (
                <CodeBlock
                  code={introCode}
                  variant="default"
                  title="// Ollivander's Shop: Parent Passing Props to Children"
                  language="jsx"
                  defaultExpanded={true}
                />
              )}

              {chapter === 1 && (
                <>
                  <CodeBlock
                    code={antiPatternCode}
                    variant="error"
                    title="// ❌ ANTI-PATTERN: Trying to Mutate Props (Ron's Mistake)"
                    language="jsx"
                    defaultExpanded={true}
                  />
                  <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <h4 className="font-bold text-red-300">Key Insight</h4>
                    </div>
                    <p className="text-sm text-red-200/80">
                      Props are <strong>read-only</strong> in child components.
                      Trying to modify them creates a local copy but doesn't
                      affect the parent's data. The one-way data flow (parent →
                      child) must be respected.
                    </p>
                  </div>
                </>
              )}

              {chapter === 2 && (
                <CodeBlock
                  code={solutionCode}
                  variant="success"
                  title="// ✅ SOLUTION: Parent Provides New Props (Neville's Success)"
                  language="jsx"
                  defaultExpanded={true}
                />
              )}

              {chapter === 3 && (
                <CodeBlock
                  code={comparisonCode}
                  variant="default"
                  title="// Side-by-Side: Ron vs Neville Approaches"
                  language="jsx"
                  defaultExpanded={true}
                />
              )}

              {chapter === 4 && (
                <CodeBlock
                  code={summaryCode}
                  variant="success"
                  title="// The Great Hall: Many Component Instances"
                  language="jsx"
                  defaultExpanded={true}
                />
              )}
            </div>

            {/* Navigation */}
            <nav className="flex items-center justify-between border-t border-amber-800/30 pt-6">
              <button
                onClick={() => setChapter(Math.max(0, chapter - 1))}
                disabled={chapter === 0}
                className="flex items-center gap-2 rounded-lg bg-amber-900/50 px-4 py-2 text-amber-200 transition-all duration-300 hover:bg-amber-800/50 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {chapters.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setChapter(i)}
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        i === chapter
                          ? "w-6 bg-amber-400"
                          : "bg-amber-800/50 hover:bg-amber-700/50"
                      }`}
                      aria-label={`Go to chapter ${i + 1}`}
                    />
                  ))}
                </div>
                <span className="font-mono text-sm text-amber-300/70">
                  Chapter {chapter + 1} of {chapters.length}
                </span>
              </div>

              <button
                onClick={() =>
                  setChapter(Math.min(chapters.length - 1, chapter + 1))
                }
                disabled={chapter === chapters.length - 1}
                className="flex items-center gap-2 rounded-lg bg-amber-900/50 px-4 py-2 text-amber-200 transition-all duration-300 hover:bg-amber-800/50 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          </div>

          {/* Right Column: Interactive Demos */}
          <div className="space-y-8 lg:col-span-3">
            <div className="sticky top-24">
              {/* Chapter 1 Demo: Wand Fitting */}
              {chapter === 0 && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                    <h3 className="text-xl font-bold">Wand Fitting Demo</h3>
                  </div>

                  <WandComponent {...harryWand} />

                  <div className="space-y-4">
                    <h4 className="font-medium text-amber-300">
                      Try Other Configurations:
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {wrongWands.map((wand, i) => (
                        <button
                          key={i}
                          onClick={() => tryWand(i)}
                          className={`rounded-lg border p-3 transition-all duration-300 ${
                            wand.isChosen
                              ? "border-amber-500 bg-amber-900/20"
                              : "border-amber-800/50 hover:border-amber-700"
                          }`}
                        >
                          <div className="text-left">
                            <p className="font-medium">{wand.wood}</p>
                            <p className="text-sm opacity-70">{wand.core}</p>
                            <p className="text-xs opacity-50">{wand.length}"</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-500/30 bg-amber-950/30 p-4">
                    <p className="text-sm text-amber-200/80">
                      <strong>Learning:</strong> Each wand is the same{" "}
                      <code>&lt;Wand /&gt;</code> component, but different props
                      create different instances. Only the right configuration
                      (props) creates a successful connection.
                    </p>
                  </div>
                </div>
              )}

              {/* Chapter 2 Demo: Anti-Pattern */}
              {chapter === 1 && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                      <h3 className="text-xl font-bold">
                        Mutating Props (Anti-Pattern)
                      </h3>
                    </div>
                    <button
                      onClick={resetRonDemo}
                      className="flex items-center gap-1 rounded bg-slate-800 px-3 py-1 text-sm text-slate-300 transition-colors hover:bg-slate-700"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset
                    </button>
                  </div>

                  <BrokenWandComponent
                    wood="Ash"
                    core="Unicorn Hair"
                    length={12}
                    wizard="Ron"
                    onBackfire={() => setRonBackfires((prev) => prev + 1)}
                  />

                  <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-red-300">
                        Circuit Breaker
                      </span>
                      <span className="font-mono text-red-400">
                        {ronBackfires}/3 backfires
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-red-900/50">
                      <div
                        className="h-2 rounded-full bg-red-500 transition-all duration-300"
                        style={{ width: `${(ronBackfires / 3) * 100}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-red-200/80">
                      After 3 backfires, the demo resets. In real React,
                      attempting to mutate props doesn't cause explosions—it
                      just doesn't work. Props are <strong>immutable</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Chapter 3 Demo: Solution */}
              {chapter === 2 && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-emerald-400" />
                    <h3 className="text-xl font-bold">
                      New Props from Parent (Solution)
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <WandComponent {...nevilleOldWand} />

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                        <div className="rounded-full border border-amber-500/50 bg-slate-800 px-4 py-1 text-sm text-amber-300">
                          Ollivander provides new props
                        </div>
                      </div>
                      <div className="h-8" />
                    </div>

                    <WandComponent {...nevilleNewWand} />
                  </div>

                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                    <p className="text-sm text-emerald-200/80">
                      <strong>Correct Pattern:</strong> When behavior needs to
                      change, the <strong>parent component</strong> provides new
                      props. The child component receives them and re-renders
                      with the new configuration.
                    </p>
                  </div>
                </div>
              )}

              {/* Chapter 4 Demo: Comparison */}
              {chapter === 3 && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
                    <h3 className="text-xl font-bold">
                      Side-by-Side Comparison
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <h4 className="font-bold text-red-300">Ron's Way</h4>
                      </div>
                      <div className="mb-2 text-xs opacity-70">
                        Trying to mutate props
                      </div>
                      <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                        <p className="text-sm text-red-200/80">
                          ❌ Fails violently
                          <br />
                          ❌ Creates local copy only
                          <br />
                          ❌ Violates one-way data flow
                          <br />❌ Causes confusion
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="mb-3 flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-400" />
                        <h4 className="font-bold text-emerald-300">
                          Neville's Way
                        </h4>
                      </div>
                      <div className="mb-2 text-xs opacity-70">
                        Getting new props from parent
                      </div>
                      <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4">
                        <p className="text-sm text-emerald-200/80">
                          ✅ Clean and elegant
                          <br />
                          ✅ Respects data flow
                          <br />
                          ✅ Parent controls state
                          <br />✅ Predictable results
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                    <p className="text-sm text-slate-200">
                      <strong>Rule of Wand Properties:</strong>
                      <br />
                      Data flows <strong>one way</strong> from parent to child.
                      <br />
                      Props are <strong>read-only</strong> in child components.
                      <br />
                      To change behavior, parent provides{" "}
                      <strong>new props</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* Chapter 5 Demo: Great Hall */}
              {chapter === 4 && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-400" />
                    <h3 className="text-xl font-bold">
                      The Great Hall of Wands
                    </h3>
                  </div>

                  <div className="grid max-h-[500px] grid-cols-2 gap-3 overflow-y-auto p-2">
                    {greatHallWands.map((wand, i) => (
                      <div
                        key={i}
                        className="transform transition-transform duration-300 hover:scale-[1.02]"
                      >
                        <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="truncate text-sm font-medium">
                              {wand.wizard}
                            </span>
                            <div className="h-2 w-2 rounded-full bg-emerald-400" />
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span className="opacity-60">Wood:</span>
                              <span className="ml-2 truncate font-medium">
                                {wand.wood}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="opacity-60">Core:</span>
                              <span className="ml-2 truncate font-medium">
                                {wand.core}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="opacity-60">Length:</span>
                              <span className="font-mono">{wand.length}"</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg border border-amber-500/30 bg-gradient-to-r from-amber-950/20 to-slate-900/20 p-4">
                    <p className="text-sm text-amber-200/80">
                      <strong>Final Understanding:</strong> Each student's wand
                      is the same <code>&lt;Wand /&gt;</code> component,
                      configured with unique props. The diversity comes from
                      different property values, not different component types.
                      This is the power of reusable components with props.
                    </p>
                  </div>
                </div>
              )}

              {/* Progress Indicator */}
              <div className="mt-8 border-t border-amber-800/30 pt-6">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-amber-300/70">
                    Learning Progress
                  </span>
                  <span className="font-mono text-sm text-amber-300">
                    {Math.round(((chapter + 1) / chapters.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                    style={{
                      width: `${((chapter + 1) / chapters.length) * 100}%`,
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-xs text-amber-300/50">
                  <span>Props Intro</span>
                  <span>Anti-Pattern</span>
                  <span>Solution</span>
                  <span>Comparison</span>
                  <span>Mastery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-amber-800/30 bg-slate-950/50 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-amber-300/50">
            "The wand chooses the wizard, Mr. Potter. Its properties are its
            unchangeable heart, a gift from its maker."
          </p>
          <p className="mt-2 text-center text-xs text-amber-400/30">
            React Concept: Props flow one-way, from parent to child, and are
            read-only in the receiving component.
          </p>
        </div>
      </footer>
    </div>
  );
}
