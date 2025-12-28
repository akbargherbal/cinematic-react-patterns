import { useState, useMemo, useCallback } from "react";
import { Eye, Users, Ghost, Axe } from "lucide-react";

interface MurderEvent {
  victim: string;
  location: string;
  weapon: string;
  witnesses: string[];
}

type WitnessId = "bandit" | "wife" | "samurai" | "woodcutter";

interface Witness {
  id: WitnessId;
  name: string;
  icon: typeof Eye;
  color: string;
  bgColor: string;
  narrative: string;
  internalState: {
    primary: string;
    secondary: string;
    perspective: string;
  };
}

export default function RashomonModule() {
  const [chapter, setChapter] = useState(0);
  const [selectedWitness, setSelectedWitness] = useState<WitnessId>("bandit");
  const [showPropsInspector, setShowPropsInspector] = useState(true);

  const murderEvent: MurderEvent = useMemo(
    () => ({
      victim: "Samurai Takehiro",
      location: "The grove",
      weapon: "A blade",
      witnesses: [
        "Tajomaru the bandit",
        "Masago the wife",
        "The samurai's ghost",
        "The woodcutter",
      ],
    }),
    [],
  );

  const witnesses: Witness[] = useMemo(
    () => [
      {
        id: "bandit",
        name: "Tajomaru (Bandit)",
        icon: Users,
        color: "text-red-500",
        bgColor: "bg-red-950/20 border-red-500/30",
        narrative:
          "I killed him in a fair duel! The woman desired me. Her husband challenged me to honorable combat. We fought with skill—twenty-three clashes of steel! He fell with dignity.",
        internalState: {
          primary: "ego: maximum",
          secondary: "shame: none",
          perspective: "heroic conquest",
        },
      },
      {
        id: "wife",
        name: "Masago (Wife)",
        icon: Eye,
        color: "text-purple-500",
        bgColor: "bg-purple-950/20 border-purple-500/30",
        narrative:
          "The bandit violated me. My husband looked at me with disgust. I begged him to kill me. When he refused, I fainted—and when I woke, he was dead by my own hand.",
        internalState: {
          primary: "shame: overwhelming",
          secondary: "agency: none",
          perspective: "tragic violation",
        },
      },
      {
        id: "samurai",
        name: "Takehiro (Ghost)",
        icon: Ghost,
        color: "text-blue-500",
        bgColor: "bg-blue-950/20 border-blue-500/30",
        narrative:
          "The bandit left. My wife suggested we kill me together and run away. Disgusted by her treachery, I took my own life with honor. The blade was my own hand's work.",
        internalState: {
          primary: "honor: absolute",
          secondary: "betrayal: unforgivable",
          perspective: "noble suicide",
        },
      },
      {
        id: "woodcutter",
        name: "Woodcutter",
        icon: Axe,
        color: "text-amber-500",
        bgColor: "bg-amber-950/20 border-amber-500/30",
        narrative:
          "There was no heroic duel. Both men were cowards—they fought clumsily, desperately. The samurai died almost by accident. The wife fled. The bandit fled. I stole the dagger.",
        internalState: {
          primary: "guilt: heavy",
          secondary: "perspective: external observer",
          perspective: "unheroic reality",
        },
      },
    ],
    [],
  );

  const chapters = useMemo(
    () => [
      {
        title: "The Gate in the Rain",
        content: `The rain falls in sheets at Rashomon gate, the great southern entrance to Kyoto now crumbling into ruin. A woodcutter sits beneath its decaying roof, his face haunted, his hands trembling. Beside him, a priest and a commoner wait out the storm. The woodcutter must speak. He must tell what he saw.

"Three days ago," he begins, "I found a body in the grove."

This is the prop—the immutable fact, the data that will be passed down. A samurai is dead. His wife was there. A bandit was involved. These are the constants, the truth that cannot change, the object that will be distributed to every component in this system.

But here's what the woodcutter doesn't yet understand: the same data can render four completely different stories.

In React terms, imagine a parent component that holds a single props object. This object is truth. It is immutable. It will be passed to four different components, four different witnesses, four different render functions. But what each component does with these props—how it interprets them, what UI it produces, what story it tells—that will vary wildly.

The woodcutter doesn't know this yet. He thinks there's one truth, one render, one authoritative version. He's about to learn that in React, as in Rashomon, props are constant but renders are infinite.`,
      },
      {
        title: "The Bandit's Glory",
        content: `Tajomaru the bandit swaggers into the courtyard, chains rattling, eyes gleaming with pride. He receives the same props—the murder, the grove, the samurai, the wife. But his internal state is ego. His render function is glory.

"I killed him in a fair duel!" he declares.

Watch what happens when a component has strong internal state. The props are identical to what the woodcutter described. The victim, the location, the weapon—all the same. But Tajomaru's render produces a completely different UI.

His version: The wife desired him. The samurai challenged him to honorable combat. They fought with skill and courage—twenty-three clashes of steel! The samurai fell with dignity. The wife fled in awe of Tajomaru's prowess.

The scene he renders is swashbuckling, heroic, romantic. Sunlight filters through the trees. The duel is choreographed like a dance. This is the UI his component produces.

But here's the critical lesson: this render is not wrong. It's not a bug. It's a valid interpretation of the props based on the component's internal state.

This is the anti-pattern developers fall into: assuming that identical props mean identical renders. They don't. That's not how React works.`,
      },
      {
        title: "Three Truths, One Event",
        content: `Now the contradictions cascade. Now the pattern reveals itself. Now the magistrate—and we—must confront the fundamental architecture of perspective.

The wife's testimony: Masago enters, veiled, trembling. She receives the same props. But her internal state is shame. Her render function is victimhood. Her render: The bandit violated her. Her husband looked at her with disgust. In her despair, she begged her husband to kill her. When he refused, she fainted—and when she woke, he was dead by her own hand.

The samurai's ghost testimony: Through a medium, the dead man speaks. Same props. Same event. But his internal state is honor. His render function is betrayal. His render: The bandit left. His wife suggested they kill him together. Disgusted by her treachery, he took his own life with honor.

Three components. Identical props. Three completely different UIs.

The magistrate is paralyzed. Which render is correct? Which component has the authoritative version?

This is the moment of crisis. This is where developers panic and try to force a single source of truth, a canonical render, one component to rule them all.

But that's not the lesson. The resolution is understanding that all three renders are valid. They're not bugs. They're different components doing what components do—taking props and producing output based on their internal state and render logic.`,
      },
      {
        title: "The Woodcutter's Confession",
        content: `"I saw everything," the woodcutter admits, his voice breaking. "I was there. I witnessed it all."

He receives the same props. The same murder, the same grove, the same people. But his internal state is guilt—guilt for stealing the valuable dagger, guilt for staying silent, guilt for letting three lies stand unchallenged.

His render function is mundane truth.

His render: There was no heroic duel. The bandit begged the wife to come with him. She freed her husband and demanded the men fight for her. Both men were cowards—they fought clumsily, desperately, pathetically. The samurai died almost by accident. The wife fled. The bandit fled. The woodcutter stole the dagger and ran.

The UI he produces is unglamorous, awkward, human. No glory, no tragedy, no honor. Just fear, greed, and survival.

Four components. Identical props. Four completely different renders.

And here's the revelation: they're all correct.

Not "correct" as in "true to objective reality"—we'll never know that. Correct as in valid implementations of the component pattern. Each component received the same props and produced output based on its internal state and render logic.

In React, this pattern is powerful: dashboard components showing same data in different visualizations, user preference components with different themes, accessibility components with different presentations, responsive components with different layouts.

The props are the source of truth. The render is interpretation.`,
      },
      {
        title: "The Architecture of Perspective",
        content: `Pull back now. Step outside the courtyard, outside the gate, outside the film itself. Look at what Kurosawa built—and what React builds.

The props never change. The event is constant. The data is immutable. That's the foundation, the source of truth.

The renders vary wildly. Each component has internal state. Each has its own render logic. Each produces a different UI from the same input.

And all four are valid.

This is not a bug. This is the system working as designed.

In React applications, you'll constantly encounter this pattern: multiple components consuming the same props, same data in different contexts, user preferences affecting render, responsive design adapting to viewport.

Don't assume that identical props mean identical renders. Don't try to force a single "authoritative" component. Don't treat different renders as bugs to fix.

The bandit's testimony isn't wrong—it's his perspective. The wife's testimony isn't wrong—it's her perspective. The samurai's testimony isn't wrong—it's his perspective. The woodcutter's testimony isn't wrong—it's his perspective.

They're all valid interpretations of the same props.

The memorable takeaway: "The truth is the props. The story is the render."

Props are immutable facts—the data that flows down from parent to child, the constants that don't change, the objective reality of your application state.

Renders are interpretations—the UI that components produce, the perspectives they embody, the stories they tell with the data they receive.

In Rashomon, four witnesses see one event and tell four stories. In React, four components receive one props object and render four UIs.

Both are architecture. Both are intentional. Both are powerful.`,
      },
    ],
    [],
  );

  const currentChapter = chapters[chapter];
  const currentWitness = witnesses.find((w) => w.id === selectedWitness)!;

  const handlePrevChapter = useCallback(() => {
    setChapter((c) => Math.max(0, c - 1));
  }, []);

  const handleNextChapter = useCallback(() => {
    setChapter((c) => Math.min(chapters.length - 1, c + 1));
  }, [chapters.length]);

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      {/* Header */}
      <header className="border-b border-slate-800 p-6 md:p-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-2 text-3xl font-bold text-slate-100 md:text-4xl">
            Rashomon
          </h1>
          <p className="mb-1 text-lg text-slate-400 md:text-xl">
            Akira Kurosawa, 1950
          </p>
          <p className="text-sm text-amber-500 md:text-base">
            React Concept: Same Data, Different Renders
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 pb-32 md:px-6 md:py-12">
        {/* Chapter Content */}
        <article className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-slate-100 md:text-3xl">
            {currentChapter.title}
          </h2>
          <div className="prose prose-invert prose-slate max-w-none">
            {currentChapter.content.split("\n\n").map((paragraph, idx) => (
              <p
                key={idx}
                className="mb-4 text-base leading-relaxed text-slate-300 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Interactive Demonstration */}
        {chapter >= 1 && (
          <section className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 md:p-8">
            <h3 className="mb-6 text-xl font-bold text-slate-100 md:text-2xl">
              Interactive Demonstration
            </h3>

            {/* Witness Selector */}
            <div className="mb-6">
              <p className="mb-3 text-sm text-slate-400">
                Select a witness to see their render:
              </p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {witnesses.map((witness) => {
                  const Icon = witness.icon;
                  return (
                    <button
                      key={witness.id}
                      onClick={() => setSelectedWitness(witness.id)}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 transition-all ${
                        selectedWitness === witness.id
                          ? `${witness.bgColor} border-current ${witness.color}`
                          : "border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600"
                      }`}
                      aria-label={`View ${witness.name}'s testimony`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden text-sm font-medium md:inline">
                        {witness.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Props Inspector Toggle */}
            <div className="mb-6">
              <button
                onClick={() => setShowPropsInspector(!showPropsInspector)}
                className="text-sm text-amber-500 transition-colors hover:text-amber-400"
              >
                {showPropsInspector ? "Hide" : "Show"} Props Inspector
              </button>
            </div>

            {/* Props Inspector */}
            {showPropsInspector && (
              <div className="mb-6 rounded-lg border border-slate-700 bg-slate-950 p-4 md:p-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
                  Immutable Props (Constant)
                </h4>
                <pre className="overflow-x-auto text-xs text-slate-300 md:text-sm">
                  <code>{`const murderEvent = {
  victim: "${murderEvent.victim}",
  location: "${murderEvent.location}",
  weapon: "${murderEvent.weapon}",
  witnesses: [
    "${murderEvent.witnesses[0]}",
    "${murderEvent.witnesses[1]}",
    "${murderEvent.witnesses[2]}",
    "${murderEvent.witnesses[3]}"
  ]
}`}</code>
                </pre>
              </div>
            )}

            {/* Witness Render Output */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Internal State */}
              <div
                className={`rounded-lg border p-4 md:p-6 ${currentWitness.bgColor} border-current ${currentWitness.color}`}
              >
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide">
                  Internal State
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="opacity-70">
                      {currentWitness.internalState.primary}
                    </span>
                  </p>
                  <p>
                    <span className="opacity-70">
                      {currentWitness.internalState.secondary}
                    </span>
                  </p>
                  <p>
                    <span className="opacity-70">
                      {currentWitness.internalState.perspective}
                    </span>
                  </p>
                </div>
              </div>

              {/* Render Output */}
              <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 md:p-6">
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
                  Render Output
                </h4>
                <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                  {currentWitness.narrative}
                </p>
              </div>
            </div>

            {/* Key Insight */}
            <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
              <p className="text-sm text-amber-500">
                <strong>Key Insight:</strong> Same props (murderEvent),
                different internal state, completely different render output.
                All four are valid.
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/95 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={handlePrevChapter}
            disabled={chapter === 0}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-300 transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 md:px-6 md:text-base"
          >
            Previous
          </button>

          <span className="text-xs text-slate-400 md:text-sm">
            Chapter {chapter + 1} of {chapters.length}
          </span>

          <button
            onClick={handleNextChapter}
            disabled={chapter === chapters.length - 1}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-slate-950 transition-all hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-30 md:px-6 md:text-base"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
