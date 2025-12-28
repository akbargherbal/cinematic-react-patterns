import { useState, useRef, useMemo, useCallback } from "react";
import {
  Camera,
  Pencil,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function MementoStateManagement() {
  const [chapter, setChapter] = useState(0);
  const [memoryChoice, setMemoryChoice] = useState<"photo" | "tattoo" | null>(
    null,
  );
  const [manipulationDemo, setManipulationDemo] = useState({
    stateValue: "Teddy: Friend",
    refValue: "Teddy: Friend",
    hasManipulated: false,
  });
  const demoRef = useRef("Teddy: Friend");

  const chapters = useMemo(
    () => [
      {
        id: "intro",
        title: "The Man Who Can't Remember",
        content: `Leonard Shelby wakes up in a motel room. Again.

He doesn't remember arriving. He doesn't remember yesterday. He doesn't remember ten minutes ago. Every time he blinks—every time his attention shifts—his short-term memory vanishes like smoke. Anterograde amnesia. The last thing he truly remembers is his wife's murder, and everything since then is a series of disconnected moments.

But Leonard has a system.

He sits up, checks his pockets. Polaroid photos spill onto the bed. Each one has a caption scrawled on the back: "DON'T TRUST HER," "CAR: WHITE SEDAN, LICENSE 4TGH-928," "TEDDY: 555-0134." He studies each photo carefully, his face tightening as he reads. These photos are his conscious memory—when he looks at them, he reconsiders everything. They force him to re-evaluate his situation, to make new decisions based on new information.

Then he checks his body. His shirt comes off, revealing a canvas of tattoos. Facts. Permanent facts. "JOHN G. RAPED AND MURDERED MY WIFE." "FIND HIM AND KILL HIM." "FACT: CAR LICENSE PLATE 4TGH-928." These aren't memories—they're data that persists through every reset, every blink, every moment of forgetting. They're always there, written on his skin, surviving each time his mind wipes clean.

Leonard trusts his system. Photos for things that might change, that require him to reconsider. Tattoos for permanent truths that will guide him even when he can't remember why.

But here's what Leonard doesn't fully understand: his tattoos don't make him think. They're just there, silent and persistent. When he looks at a photo, something clicks—he reconsiders, re-evaluates, changes his plan. But tattoos? He can have a tattoo for years and never question it, never reconsider, never update his understanding based on it.`,
      },
      {
        id: "build",
        title: "Facts, Not Memories",
        content: `Leonard sits in a tattoo parlor, the needle buzzing against his skin. Another fact being permanently inscribed. "FACT: TEDDY IS JOHN G."

The tattoo artist works methodically, and Leonard watches in the mirror. This is how he builds his system. When he's certain of something—absolutely certain—it becomes a tattoo. Permanent. Immutable. A fact that will guide him even when he can't remember the reasoning behind it.

"You sure about this one?" the artist asks, not for the first time.

"It's a fact," Leonard says flatly. "Facts don't change."

But here's the problem Leonard doesn't see: he's treating his tattoos like they're his decision-making system. He thinks that because they persist, because they survive every memory reset, they're the most reliable form of information. He's putting critical data—data that should drive his actions—into a system that doesn't trigger reconsideration.

This is the anti-pattern: using useRef for data that should drive UI decisions.`,
      },
      {
        id: "climax",
        title: "The Manipulation",
        content: `Teddy knows Leonard's system. He's studied it, tested it, exploited it.

He knows that Leonard's photos make him reconsider everything. Show Leonard a photo with new information, and Leonard re-evaluates his entire situation. The photo triggers a complete re-render of Leonard's understanding.

But the tattoos? The tattoos are different. They're just there. Leonard trusts them implicitly, but he doesn't actively reconsider them. They're persistent data that survives every reset, but they don't trigger any re-evaluation.

And that's the vulnerability.

Leonard wakes up in a bathroom, disoriented. There's blood on his hands. He checks his photos frantically—nothing explains this. He checks his tattoos. "FACT: TEDDY IS JOHN G." Okay. He knows what to do.

But what Leonard doesn't know—what he can't know because his system doesn't tell him—is that Teddy manipulated his tattoos while he was unconscious. Not literally changed the ink, but manipulated the information that led to those tattoos. Teddy fed Leonard false information, knowing Leonard would make it permanent, knowing Leonard would never reconsider it.`,
      },
      {
        id: "resolution",
        title: "Remember Sammy Jankis",
        content: `Leonard tells everyone about Sammy Jankis. It's his cautionary tale, his proof that he's different, that his system works.

Sammy had the same condition—anterograde amnesia. Couldn't form new memories. But Sammy's system failed. Sammy's wife tested him, over and over, trying to prove his love. She'd ask for her insulin shot, and Sammy would give it to her. Then she'd ask again. And again. Sammy couldn't remember giving the previous shots, so he kept giving them, trusting that each request was the first.

She died from an overdose. Sammy's system failed because he had no way to reconsider. No way to re-evaluate. No mechanism to trigger awareness when critical information changed.

The correct pattern—the pattern Leonard should have followed—is this:

Use useState for data that should trigger re-evaluation: information that drives decisions, data that affects your UI/actions, values that when changed should make you reconsider everything.

Use useRef for data that needs persistence but doesn't drive decisions: DOM references, timer IDs, previous values for comparison, mutable data that's supplementary, not critical.`,
      },
      {
        id: "summary",
        title: "Two Memory Systems",
        content: `Leonard Shelby has two memory systems, and understanding the difference between them is the difference between truth and tragedy.

The difference between useState and useRef isn't about persistence—both persist across re-renders. The difference is about reactivity.

useState: "When this changes, reconsider everything."
useRef: "Keep this around, but don't reconsider when it changes."

Leonard's tragedy came from storing critical information in a non-reactive system. He put decision-driving data in tattoos when it should have been in photos. He chose persistence over reactivity when he needed both.

Choose your persistence mechanism based on whether changes should trigger re-evaluation.

If the data drives your UI, if changes should make your component reconsider its rendering, if the information affects decisions—use useState.

If the data is supplementary, if it needs to persist but shouldn't trigger re-renders, if it's context rather than driver—use useRef.`,
      },
    ],
    [chapter],
  );

  const currentChapter = chapters[chapter];

  const handlePrevious = useCallback(() => {
    setChapter((c) => Math.max(0, c - 1));
  }, []);

  const handleNext = useCallback(() => {
    setChapter((c) => Math.min(chapters.length - 1, c + 1));
  }, [chapters.length]);

  const handleMemoryChoice = (choice: "photo" | "tattoo") => {
    setMemoryChoice(choice);
  };

  const handleManipulation = () => {
    setManipulationDemo((prev) => ({
      stateValue: "Teddy: Enemy",
      refValue: prev.refValue,
      hasManipulated: true,
    }));
    demoRef.current = "Teddy: Enemy";
  };

  const resetManipulation = () => {
    setManipulationDemo({
      stateValue: "Teddy: Friend",
      refValue: "Teddy: Friend",
      hasManipulated: false,
    });
    demoRef.current = "Teddy: Friend";
  };

  return (
    <div className="min-h-screen bg-slate-950 font-mono text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-amber-500/30 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-amber-500 md:text-4xl">
            MEMENTO
          </h1>
          <p className="text-sm text-slate-400 md:text-base">
            Leonard Shelby's Memory Systems
          </p>
          <div className="mt-3 inline-block rounded border border-amber-500/30 bg-amber-950/30 px-3 py-1 text-xs text-amber-400">
            useState vs useRef
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold text-amber-500 md:text-3xl">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 bg-amber-500/50"></div>
        </div>

        {/* Chapter Content */}
        <article className="prose prose-invert prose-slate mb-12 max-w-none">
          <div className="whitespace-pre-line text-sm leading-relaxed text-slate-300 md:text-base">
            {currentChapter.content}
          </div>
        </article>

        {/* Interactive Demonstrations */}
        {chapter === 0 && (
          <div className="mb-8 rounded-lg border border-amber-500/30 bg-slate-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-amber-500">
              <Camera className="h-5 w-5" />
              Leonard's Memory Systems
            </h3>
            <p className="mb-6 text-sm text-slate-400">
              In React terms, Leonard is a component that re-renders constantly.
              Choose how to store critical information:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={() => handleMemoryChoice("photo")}
                className={`rounded-lg border-2 p-6 transition-all ${
                  memoryChoice === "photo"
                    ? "border-amber-500 bg-amber-950/30"
                    : "border-slate-700 hover:border-amber-500/50"
                }`}
              >
                <Camera className="mb-3 h-8 w-8 text-amber-500" />
                <h4 className="mb-2 font-bold text-amber-500">
                  Polaroid Photo (useState)
                </h4>
                <p className="text-xs text-slate-400">
                  Triggers re-evaluation. When you look at it, you reconsider
                  everything. Changes force re-renders.
                </p>
              </button>
              <button
                onClick={() => handleMemoryChoice("tattoo")}
                className={`rounded-lg border-2 p-6 transition-all ${
                  memoryChoice === "tattoo"
                    ? "border-amber-500 bg-amber-950/30"
                    : "border-slate-700 hover:border-amber-500/50"
                }`}
              >
                <Pencil className="mb-3 h-8 w-8 text-amber-500" />
                <h4 className="mb-2 font-bold text-amber-500">
                  Tattoo (useRef)
                </h4>
                <p className="text-xs text-slate-400">
                  Persists silently. Always there, but doesn't trigger
                  reconsideration. Mutations don't cause re-renders.
                </p>
              </button>
            </div>
            {memoryChoice && (
              <div className="mt-6 rounded border border-amber-500/20 bg-slate-950/50 p-4">
                <p className="text-sm text-slate-300">
                  {memoryChoice === "photo" ? (
                    <>
                      <CheckCircle className="mr-2 inline h-4 w-4 text-green-500" />
                      Good choice. Photos (useState) trigger re-evaluation when
                      information changes.
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="mr-2 inline h-4 w-4 text-red-500" />
                      Dangerous. Tattoos (useRef) persist but don't trigger
                      reconsideration of critical decisions.
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        )}

        {chapter === 1 && (
          <div className="mb-8 rounded-lg border border-red-500/30 bg-slate-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-500">
              <AlertTriangle className="h-5 w-5" />
              The Anti-Pattern
            </h3>
            <p className="mb-6 text-sm text-slate-400">
              Leonard stores critical decision-making information in tattoos
              (useRef). This is dangerous:
            </p>
            <div className="mb-4 rounded border border-slate-700 bg-slate-950/50 p-4">
              <pre className="overflow-x-auto text-xs text-slate-300">
                <code>{`// Leonard's mistake: using useRef for critical data
const target = useRef('unknown');

// Later, information changes
target.current = 'Teddy';

// But Leonard doesn't reconsider!
// No re-render, no re-evaluation
// He acts on stale assumptions`}</code>
              </pre>
            </div>
            <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
              <p className="text-sm text-red-400">
                <AlertTriangle className="mr-2 inline h-4 w-4" />
                Critical data in refs means decisions based on information that
                can change without triggering re-evaluation.
              </p>
            </div>
          </div>
        )}

        {chapter === 2 && (
          <div className="mb-8 rounded-lg border border-red-500/30 bg-slate-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-500">
              <AlertTriangle className="h-5 w-5" />
              The Manipulation Simulator
            </h3>
            <p className="mb-6 text-sm text-slate-400">
              Watch what happens when Teddy manipulates Leonard's memory
              systems:
            </p>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="rounded border border-amber-500/30 bg-slate-950/50 p-4">
                <h4 className="mb-3 text-sm font-bold text-amber-500">
                  Photo System (useState)
                </h4>
                <div className="mb-3 rounded border border-amber-500/20 bg-amber-950/20 p-3">
                  <p className="font-mono text-xs text-slate-300">
                    {manipulationDemo.stateValue}
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  {manipulationDemo.hasManipulated ? (
                    <span className="text-green-400">
                      <CheckCircle className="mr-1 inline h-3 w-3" />
                      Re-rendered! Leonard reconsiders.
                    </span>
                  ) : (
                    "Waiting for manipulation..."
                  )}
                </p>
              </div>
              <div className="rounded border border-red-500/30 bg-slate-950/50 p-4">
                <h4 className="mb-3 text-sm font-bold text-red-500">
                  Tattoo System (useRef)
                </h4>
                <div className="mb-3 rounded border border-red-500/20 bg-red-950/20 p-3">
                  <p className="font-mono text-xs text-slate-300">
                    {manipulationDemo.refValue}
                  </p>
                </div>
                <p className="text-xs text-slate-400">
                  {manipulationDemo.hasManipulated ? (
                    <span className="text-red-400">
                      <AlertTriangle className="mr-1 inline h-3 w-3" />
                      No re-render. Stale UI. Danger.
                    </span>
                  ) : (
                    "Waiting for manipulation..."
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleManipulation}
                disabled={manipulationDemo.hasManipulated}
                className="rounded bg-red-500 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Teddy Manipulates
              </button>
              <button
                onClick={resetManipulation}
                className="rounded bg-slate-700 px-4 py-2 text-sm text-slate-300 transition-all hover:bg-slate-600"
              >
                Reset
              </button>
            </div>
            {manipulationDemo.hasManipulated && (
              <div className="mt-6 rounded border border-red-500/30 bg-red-950/20 p-4">
                <p className="text-sm text-red-400">
                  <AlertTriangle className="mr-2 inline h-4 w-4" />
                  The ref was mutated (Teddy changed to Enemy), but the
                  component didn't re-render. Leonard acts on stale information.
                </p>
              </div>
            )}
          </div>
        )}

        {chapter === 3 && (
          <div className="mb-8 rounded-lg border border-green-500/30 bg-slate-900/50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-green-500">
              <CheckCircle className="h-5 w-5" />
              The Correct Pattern
            </h3>
            <p className="mb-6 text-sm text-slate-400">
              Leonard should have used photos (useState) for critical
              information:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded border border-green-500/30 bg-slate-950/50 p-4">
                <h4 className="mb-3 text-sm font-bold text-green-500">
                  Use useState for:
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-500" />
                    <span>Data that drives UI decisions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-500" />
                    <span>Information that affects rendering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-500" />
                    <span>Values that should trigger re-evaluation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-green-500" />
                    <span>Critical decision-making data</span>
                  </li>
                </ul>
              </div>
              <div className="rounded border border-amber-500/30 bg-slate-950/50 p-4">
                <h4 className="mb-3 text-sm font-bold text-amber-500">
                  Use useRef for:
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <Pencil className="mt-0.5 h-3 w-3 flex-shrink-0 text-amber-500" />
                    <span>DOM element references</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Pencil className="mt-0.5 h-3 w-3 flex-shrink-0 text-amber-500" />
                    <span>Timer IDs and intervals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Pencil className="mt-0.5 h-3 w-3 flex-shrink-0 text-amber-500" />
                    <span>Previous values for comparison</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Pencil className="mt-0.5 h-3 w-3 flex-shrink-0 text-amber-500" />
                    <span>Supplementary, non-critical data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {chapter === 4 && (
          <div className="mb-8 rounded-lg border border-amber-500/30 bg-slate-900/50 p-6">
            <h3 className="mb-4 text-xl font-bold text-amber-500">
              The Critical Distinction
            </h3>
            <p className="mb-6 text-sm text-slate-400">
              Both useState and useRef persist across re-renders. The difference
              is reactivity:
            </p>
            <div className="space-y-4">
              <div className="rounded border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-amber-500">
                  <Camera className="h-4 w-4" />
                  useState: "When this changes, reconsider everything."
                </h4>
                <pre className="mt-3 overflow-x-auto text-xs text-slate-300">
                  <code>{`const [target, setTarget] = useState(null);
const [trustLevel, setTrustLevel] = useState('unknown');

// When these change, component re-renders
// Decisions are reconsidered
// UI updates automatically`}</code>
                </pre>
              </div>
              <div className="rounded border border-slate-700 bg-slate-950/50 p-4">
                <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-400">
                  <Pencil className="h-4 w-4" />
                  useRef: "Keep this around, but don't reconsider when it
                  changes."
                </h4>
                <pre className="mt-3 overflow-x-auto text-xs text-slate-300">
                  <code>{`const investigationNotes = useRef([]);
const previousRender = useRef(null);

// These persist but don't trigger re-renders
// Mutations are silent
// Context, not drivers`}</code>
                </pre>
              </div>
            </div>
            <div className="mt-6 rounded border border-amber-500/30 bg-amber-950/20 p-4">
              <p className="text-sm font-bold text-amber-400">
                Choose your persistence mechanism based on whether changes
                should trigger re-evaluation.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-amber-500/30 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="flex items-center gap-2 rounded bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition-all hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Previous chapter"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <span className="font-mono text-xs text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="flex items-center gap-2 rounded bg-amber-500 px-4 py-2 text-sm font-bold text-slate-950 transition-all hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-30"
              aria-label="Next chapter"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
