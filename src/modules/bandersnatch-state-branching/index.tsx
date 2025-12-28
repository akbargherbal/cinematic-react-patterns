import { useState, useCallback } from "react";
import { Play, GitBranch, Zap, Eye, CheckCircle } from "lucide-react";

export default function BandersnatchStateBranching() {
  const [chapter, setChapter] = useState(0);

  const chapters = [
    {
      id: "intro",
      title: "You Are Watching",
      icon: Eye,
    },
    {
      id: "build",
      title: "The Branches Multiply",
      icon: GitBranch,
    },
    {
      id: "climax",
      title: "I'm Being Controlled",
      icon: Zap,
    },
    {
      id: "resolution",
      title: "Mapping the Maze",
      icon: CheckCircle,
    },
    {
      id: "summary",
      title: "Choose Your Architecture",
      icon: Play,
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-mono text-slate-300">
      {/* Header */}
      <header className="border-b border-red-900/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="mb-2 flex items-center gap-3">
            <Play className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold text-slate-100">BANDERSNATCH</h1>
          </div>
          <p className="text-lg text-pink-400">
            Stefan Butler, 1984 • State Machines & Branching Logic
          </p>
        </div>
      </header>

      {/* Chapter Header */}
      <div className="border-b border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center gap-3">
            {currentChapter.icon && (
              <currentChapter.icon className="h-6 w-6 text-red-500" />
            )}
            <h2 className="text-2xl font-bold text-slate-100">
              {currentChapter.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12 pb-32">
        {chapter === 0 && <ChapterIntro />}
        {chapter === 1 && <ChapterBuild />}
        {chapter === 2 && <ChapterClimax />}
        {chapter === 3 && <ChapterResolution />}
        {chapter === 4 && <ChapterSummary />}
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-red-900/30 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="border border-red-500/30 bg-red-900/30 px-6 py-2 text-red-400 transition-all hover:border-red-500 hover:bg-red-900/50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    idx === chapter
                      ? "w-8 bg-red-500"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="border border-red-500/30 bg-red-900/30 px-6 py-2 text-red-400 transition-all hover:border-red-500 hover:bg-red-900/50 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ChapterIntro() {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Stefan Butler sits in his childhood bedroom, surrounded by the
            technological detritus of 1984: cassette tapes, a ZX Spectrum
            computer, and a dog-eared copy of "Bandersnatch"—a
            choose-your-own-adventure novel that never got published because its
            author went mad trying to map all the possible paths.
          </p>
          <p className="text-lg leading-relaxed">
            Stefan is adapting it into a video game. Not just any game, but an
            interactive fiction where every choice branches into new
            possibilities. He types on his keyboard, defining the first decision
            point:
          </p>
          <pre className="overflow-x-auto rounded border border-slate-700 bg-slate-900 p-4 text-sm">
            <code className="text-pink-400">
              {`IF player chooses LEFT THEN
  state = "forest_path"
ELSE
  state = "mountain_path"`}
            </code>
          </pre>
          <p className="text-lg leading-relaxed">
            It's simple. Elegant. One variable—
            <code className="text-pink-400">state</code>—determines everything
            the player sees next. The forest path shows forest descriptions,
            forest choices, forest consequences. The mountain path shows
            mountains. The state is the source of truth. Change the state,
            change the reality.
          </p>
          <p className="mt-8 text-xl font-bold text-red-400">
            This is how React works.
          </p>
          <p className="text-lg leading-relaxed">
            Your component has state. That state determines what renders on
            screen. When state changes, React re-renders, showing the user a
            different reality. Just like Stefan's game, your application is a
            series of branching possibilities, all controlled by state values.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-red-900/30 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-bold text-slate-100">
            Interactive: The First Choice
          </h3>
          <p className="mb-6 text-sm text-slate-400">
            Stefan's game presents a simple choice. Click a button to see how
            state determines what renders.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={() => setChoice("frosties")}
                className={`flex-1 border-2 px-6 py-4 transition-all ${
                  choice === "frosties"
                    ? "border-red-500 bg-red-900/50 text-red-300"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-red-500/50"
                }`}
              >
                Frosties
              </button>
              <button
                onClick={() => setChoice("sugar_puffs")}
                className={`flex-1 border-2 px-6 py-4 transition-all ${
                  choice === "sugar_puffs"
                    ? "border-red-500 bg-red-900/50 text-red-300"
                    : "border-slate-700 bg-slate-800 text-slate-300 hover:border-red-500/50"
                }`}
              >
                Sugar Puffs
              </button>
            </div>

            {choice && (
              <div className="animate-[fadeIn_0.3s_ease-in] rounded border border-pink-500/30 bg-slate-800 p-4">
                <p className="mb-2 text-sm text-slate-400">Current State:</p>
                <code className="text-lg text-pink-400">
                  state = "{choice}"
                </code>
                <p className="mt-4 text-sm text-slate-300">
                  {choice === "frosties"
                    ? "Stefan pours Frosties. The day begins with a sugary crunch. His mood: optimistic."
                    : "Stefan chooses Sugar Puffs. A safer choice. His mood: cautious."}
                </p>
                <p className="mt-4 text-xs italic text-slate-500">
                  The state variable determines what the user experiences.
                  Change the state, change the reality.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-slate-700 pt-6">
            <p className="text-sm text-slate-400">
              <strong className="text-slate-300">The Core Truth:</strong> In
              React, state is not just data—it's the determinant of reality.
              Your component's entire existence flows from state.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
          <h4 className="mb-3 text-lg font-bold text-slate-100">
            React Equivalent
          </h4>
          <pre className="overflow-x-auto rounded border border-slate-700 bg-slate-950 p-4 text-xs">
            <code className="text-slate-300">
              {`const [choice, setChoice] = useState(null);

return (
  <div>
    <button onClick={() => setChoice('frosties')}>
      Frosties
    </button>
    <button onClick={() => setChoice('sugar_puffs')}>
      Sugar Puffs
    </button>
    
    {choice === 'frosties' && (
      <p>Optimistic mood...</p>
    )}
    {choice === 'sugar_puffs' && (
      <p>Cautious mood...</p>
    )}
  </div>
);`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function ChapterBuild() {
  const [cereal, setCereal] = useState<string | null>(null);
  const [music, setMusic] = useState<string | null>(null);
  const [job, setJob] = useState<string | null>(null);
  const [colin, setColin] = useState<string | null>(null);

  const complexity = [cereal, music, job, colin].filter(Boolean).length;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Three weeks into development, Stefan's bedroom has become a war
            room. Papers cover every surface—flowcharts, decision trees, hastily
            scribbled notes about which choices lead where. The game has grown
            beyond his initial vision.
          </p>
          <p className="text-lg leading-relaxed">
            The problem started small. After the cereal choice, he added a
            choice about music. Then a choice about the bus or walking. Then
            whether to accept the job at Tuckersoft. Each choice seemed
            independent, but they weren't.
          </p>
          <pre className="overflow-x-auto rounded border border-slate-700 bg-slate-900 p-4 text-sm">
            <code className="text-pink-400">
              {`IF cereal = "frosties" AND music = "thompson_twins" THEN
  IF job_accepted = true THEN
    IF colin_relationship > 5 THEN
      // Show party scene
    ELSE
      // Show lonely coding scene
    END IF
  ELSE
    // Show rejection scene
  END IF
END IF`}
            </code>
          </pre>
          <p className="text-lg leading-relaxed">
            Nested conditionals, stacked six levels deep. He's lost track of
            which combinations are even possible. Can you get to the party scene
            if you chose Sugar Puffs? He thinks so, but he'd have to trace
            through dozens of IF statements to be sure.
          </p>
          <p className="mt-8 text-xl font-bold text-red-400">
            This is the state management nightmare.
          </p>
          <p className="text-lg leading-relaxed">
            You start with simple{" "}
            <code className="text-pink-400">useState</code> calls. Then you add
            another. Then another. Soon your component is a maze of conditional
            renders, and you're managing state dependencies in your head.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-red-900/30 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-bold text-slate-100">
            Interactive: The Complexity Spiral
          </h3>
          <p className="mb-6 text-sm text-slate-400">
            Make choices and watch the conditional logic explode. This is what
            happens without proper state architecture.
          </p>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Cereal:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCereal("frosties")}
                  className={`flex-1 border px-4 py-2 text-sm transition-all ${
                    cereal === "frosties"
                      ? "border-red-500 bg-red-900/50"
                      : "border-slate-700 bg-slate-800 hover:border-red-500/50"
                  }`}
                >
                  Frosties
                </button>
                <button
                  onClick={() => setCereal("sugar_puffs")}
                  className={`flex-1 border px-4 py-2 text-sm transition-all ${
                    cereal === "sugar_puffs"
                      ? "border-red-500 bg-red-900/50"
                      : "border-slate-700 bg-slate-800 hover:border-red-500/50"
                  }`}
                >
                  Sugar Puffs
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Music:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMusic("thompson_twins")}
                  className={`flex-1 border px-4 py-2 text-sm transition-all ${
                    music === "thompson_twins"
                      ? "border-red-500 bg-red-900/50"
                      : "border-slate-700 bg-slate-800 hover:border-red-500/50"
                  }`}
                >
                  Thompson Twins
                </button>
                <button
                  onClick={() => setMusic("now_2")}
                  className={`flex-1 border px-4 py-2 text-sm transition-all ${
                    music === "now_2"
                      ? "border-red-500 bg-red-900/50"
                      : "border-slate-700 bg-slate-800 hover:border-red-500/50"
                  }`}
                >
                  Now 2
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">Job:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setJob("accept")}
                  className={`flex-1 border px-4 py-2 text-sm transition-all ${
                    job === "accept"
                      ? "border-red-500 bg-red-900/50"
                      : "border-slate-700 bg-slate-800 hover:border-red-500/50"
                  }`}
                >
                  Accept
                </button>
                <button
                  onClick={() => setJob("refuse")}
                  className={`flex-1 border px-4 py-2 text-sm transition-all ${
                    job === "refuse"
                      ? "border-red-500 bg-red-900/50"
                      : "border-slate-700 bg-slate-800 hover:border-red-500/50"
                  }`}
                >
                  Refuse
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Colin:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setColin("befriend")}
                  className={`flex-1 border px-4 py-2 text-sm transition-all ${
                    colin === "befriend"
                      ? "border-red-500 bg-red-900/50"
                      : "border-slate-700 bg-slate-800 hover:border-red-500/50"
                  }`}
                >
                  Befriend
                </button>
                <button
                  onClick={() => setColin("ignore")}
                  className={`flex-1 border px-4 py-2 text-sm transition-all ${
                    colin === "ignore"
                      ? "border-red-500 bg-red-900/50"
                      : "border-slate-700 bg-slate-800 hover:border-red-500/50"
                  }`}
                >
                  Ignore
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-700 pt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-400">Complexity Level:</span>
              <span className="text-lg font-bold text-red-400">
                {complexity}/4
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-300"
                style={{ width: `${(complexity / 4) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {complexity === 0 && "No choices made yet."}
              {complexity === 1 && "Simple state. Easy to manage."}
              {complexity === 2 && "Getting complex. Dependencies emerging."}
              {complexity === 3 &&
                "Nested conditionals. Hard to track all paths."}
              {complexity === 4 &&
                "Chaos. You've lost track of which states are possible."}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
          <h4 className="mb-3 text-lg font-bold text-slate-100">
            The Anti-Pattern
          </h4>
          <pre className="overflow-x-auto rounded border border-slate-700 bg-slate-950 p-4 text-xs">
            <code className="text-slate-300">
              {`const [cereal, setCereal] = useState(null);
const [music, setMusic] = useState(null);
const [job, setJob] = useState(null);
const [colin, setColin] = useState(null);

// Implicit state machine hidden in conditionals
{cereal === 'frosties' && music === 'thompson_twins' && (
  job === 'accept' ? (
    colin === 'befriend' ? (
      <PartyScene />
    ) : (
      <LonelyScene />
    )
  ) : (
    <RejectionScene />
  )
)}`}
            </code>
          </pre>
          <p className="mt-3 text-xs text-slate-400">
            This is unmaintainable. You need explicit state management.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChapterClimax() {
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [stefanState, setStefanState] = useState("WAITING");

  const handleChoice = useCallback((choice: string) => {
    setUserChoice(choice);
    setStefanState(choice === "talk" ? "TALKING" : "REFUSING");
  }, []);

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            The moment of realization comes in the therapist's office.
          </p>
          <p className="text-lg leading-relaxed">
            Dr. Haynes asks Stefan about his mother. Stefan feels a strange
            compulsion, a sense that his words aren't entirely his own. Then the
            choice appears—not in the game he's coding, but in his reality:
          </p>
          <div className="my-6 rounded-lg border border-red-500/50 bg-slate-900 p-6">
            <p className="mb-4 text-center text-xl font-bold text-red-400">
              TALK ABOUT MUM or REFUSE
            </p>
            <p className="text-center text-sm text-slate-400">
              A floating prompt in his vision, like a UI element rendered over
              the world.
            </p>
          </div>
          <p className="text-lg leading-relaxed">
            He sees it. Two buttons. Two possible state transitions. He's not
            choosing—someone else is choosing for him.
          </p>
          <p className="mt-8 text-xl font-bold text-red-400">You are.</p>
          <p className="text-lg leading-relaxed">
            Stefan's reality branches based on your input. You click "TALK ABOUT
            MUM" and Stefan talks. You click "REFUSE" and Stefan refuses. His
            state changes. His behavior changes. His entire experienced reality
            changes.
          </p>
          <p className="mt-8 text-xl font-bold text-pink-400">
            He is a controlled component.
          </p>
          <p className="text-lg leading-relaxed">
            In React, components don't control their own state. Parent
            components do. A controlled component receives its state as props
            and reports changes back up through callbacks.
          </p>
          <p className="text-lg leading-relaxed">
            Stefan can't change his own state. He can only trigger events that
            request state changes from the entity controlling him. You. The
            viewer. The parent component.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-red-900/30 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-bold text-slate-100">
            Interactive: You Are The Controller
          </h3>
          <p className="mb-6 text-sm text-slate-400">
            Make a choice for Stefan. Watch how he responds to YOUR state
            management.
          </p>

          <div className="mb-6 rounded-lg border border-pink-500/30 bg-slate-800 p-6">
            <div className="mb-6 text-center">
              <p className="mb-2 text-sm text-slate-400">Stefan's State:</p>
              <code className="text-2xl font-bold text-pink-400">
                {stefanState}
              </code>
            </div>

            {stefanState === "WAITING" && (
              <div className="animate-[fadeIn_0.3s_ease-in] space-y-4">
                <p className="text-center text-slate-300">
                  Stefan sits in the therapist's office, waiting for your
                  decision...
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleChoice("talk")}
                    className="flex-1 border-2 border-red-500 bg-red-900/30 px-6 py-4 text-red-300 transition-all hover:bg-red-900/50"
                  >
                    TALK ABOUT MUM
                  </button>
                  <button
                    onClick={() => handleChoice("refuse")}
                    className="flex-1 border-2 border-slate-600 bg-slate-700 px-6 py-4 text-slate-300 transition-all hover:bg-slate-600"
                  >
                    REFUSE
                  </button>
                </div>
              </div>
            )}

            {stefanState === "TALKING" && (
              <div className="animate-[fadeIn_0.3s_ease-in] space-y-4">
                <p className="text-center text-slate-300">
                  Stefan begins talking about his mother. The words flow, but
                  they're not entirely his. He's responding to your choice.
                </p>
                <p className="text-center text-sm italic text-pink-400">
                  State changed by parent component (you)
                </p>
                <button
                  onClick={() => {
                    setUserChoice(null);
                    setStefanState("WAITING");
                  }}
                  className="w-full border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-slate-300 transition-all hover:bg-slate-600"
                >
                  Reset
                </button>
              </div>
            )}

            {stefanState === "REFUSING" && (
              <div className="animate-[fadeIn_0.3s_ease-in] space-y-4">
                <p className="text-center text-slate-300">
                  Stefan refuses to talk. He crosses his arms. But even this
                  refusal was determined by your choice.
                </p>
                <p className="text-center text-sm italic text-pink-400">
                  State changed by parent component (you)
                </p>
                <button
                  onClick={() => {
                    setUserChoice(null);
                    setStefanState("WAITING");
                  }}
                  className="w-full border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-slate-300 transition-all hover:bg-slate-600"
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          <div className="rounded border border-slate-700 bg-slate-950 p-4">
            <p className="mb-2 text-xs text-slate-400">
              Unidirectional Data Flow:
            </p>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <span className="text-pink-400">Parent (You)</span>
                <span className="text-slate-600">→</span>
                <span className="text-slate-400">state flows down</span>
                <span className="text-slate-600">→</span>
                <span className="text-pink-400">Child (Stefan)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-pink-400">Parent (You)</span>
                <span className="text-slate-600">←</span>
                <span className="text-slate-400">events flow up</span>
                <span className="text-slate-600">←</span>
                <span className="text-pink-400">Child (Stefan)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
          <h4 className="mb-3 text-lg font-bold text-slate-100">
            Controlled Component Pattern
          </h4>
          <pre className="overflow-x-auto rounded border border-slate-700 bg-slate-950 p-4 text-xs">
            <code className="text-slate-300">
              {`function StefanComponent({ state, onChoice }) {
  // Stefan doesn't own his state
  // He receives it from above (the viewer)
  // He can only request changes via onChoice
  
  return (
    <div>
      {state === 'WAITING' && (
        <>
          <button onClick={() => onChoice('talk')}>
            Talk About Mum
          </button>
          <button onClick={() => onChoice('refuse')}>
            Refuse
          </button>
        </>
      )}
      {state === 'TALKING' && <p>Talking...</p>}
      {state === 'REFUSING' && <p>Refusing...</p>}
    </div>
  );
}`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}

function ChapterResolution() {
  const [currentState, setCurrentState] = useState("INIT");

  const STATES = {
    INIT: "INIT",
    TUCKERSOFT: "TUCKERSOFT",
    SOLO_DEV: "SOLO_DEV",
    PARTY: "PARTY",
    THERAPY: "THERAPY",
    COMPLETE: "COMPLETE",
  };

  const TRANSITIONS: Record<string, Record<string, string>> = {
    INIT: {
      ACCEPT_JOB: "TUCKERSOFT",
      REFUSE_JOB: "SOLO_DEV",
    },
    TUCKERSOFT: {
      MEET_COLIN: "PARTY",
      WORK_ALONE: "SOLO_DEV",
    },
    SOLO_DEV: {
      SEEK_HELP: "THERAPY",
      FINISH_GAME: "COMPLETE",
    },
    PARTY: {
      TAKE_DRUGS: "THERAPY",
      LEAVE_EARLY: "SOLO_DEV",
    },
    THERAPY: {
      BREAKTHROUGH: "COMPLETE",
      GIVE_UP: "INIT",
    },
    COMPLETE: {},
  };

  const transition = useCallback(
    (event: string) => {
      const nextState = TRANSITIONS[currentState]?.[event];
      if (nextState) {
        setCurrentState(nextState);
      }
    },
    [currentState],
  );

  const getAvailableTransitions = () => {
    return Object.keys(TRANSITIONS[currentState] || {});
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Colin sits in his apartment, surrounded by computers and flowcharts.
            He's already figured it out. He's mapped the maze.
          </p>
          <p className="text-lg leading-relaxed">
            "It's all just a state machine, mate," he says, showing Stefan a
            massive diagram on his wall. Every possible scene in Bandersnatch,
            every choice, every outcome, all laid out in a directed graph. Nodes
            and edges. States and transitions.
          </p>
          <p className="text-lg leading-relaxed">
            "Look: You start in <code className="text-pink-400">INIT</code>.
            Player chooses cereal, you transition to either{" "}
            <code className="text-pink-400">FROSTIES_PATH</code> or{" "}
            <code className="text-pink-400">SUGAR_PUFFS_PATH</code>. From there,
            you can reach these states..." He traces his finger along the lines.
            "But you can't get from{" "}
            <code className="text-pink-400">PARTY_SCENE</code> to{" "}
            <code className="text-pink-400">THERAPY_SESSION</code> directly. You
            have to go through{" "}
            <code className="text-pink-400">MORNING_AFTER</code> first. See? The
            transitions are defined. The paths are explicit."
          </p>
          <p className="mt-8 text-xl font-bold text-red-400">
            This is the solution.
          </p>
          <p className="text-lg leading-relaxed">
            Instead of scattered boolean flags and nested conditionals, you
            define your states explicitly. Then you define valid transitions.
            Now your state management is explicit. You can't accidentally
            transition to an invalid state.
          </p>
          <p className="text-lg leading-relaxed">
            Stefan stares at Colin's diagram. It's beautiful. Every possible
            path through Bandersnatch, all visible at once. He can see which
            endings are reachable from which choices. He can see the loops, the
            dead ends, the optimal paths.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border border-red-900/30 bg-slate-900 p-6">
          <h3 className="mb-4 text-xl font-bold text-slate-100">
            Interactive: The State Machine
          </h3>
          <p className="mb-6 text-sm text-slate-400">
            Navigate through an explicit state machine. Only valid transitions
            are allowed.
          </p>

          <div className="mb-6 rounded-lg border border-pink-500/30 bg-slate-800 p-6">
            <div className="mb-6 text-center">
              <p className="mb-2 text-sm text-slate-400">Current State:</p>
              <code className="text-2xl font-bold text-pink-400">
                {currentState}
              </code>
            </div>

            <div className="space-y-3">
              {getAvailableTransitions().length > 0 ? (
                <>
                  <p className="mb-4 text-center text-sm text-slate-400">
                    Available Transitions:
                  </p>
                  {getAvailableTransitions().map((event) => (
                    <button
                      key={event}
                      onClick={() => transition(event)}
                      className="w-full border border-red-500/50 bg-red-900/30 px-4 py-3 text-sm text-red-300 transition-all hover:border-red-500 hover:bg-red-900/50"
                    >
                      {event.replace(/_/g, " ")} →{" "}
                      {TRANSITIONS[currentState][event]}
                    </button>
                  ))}
                </>
              ) : (
                <div className="py-6 text-center">
                  <p className="mb-4 text-slate-300">
                    Terminal state reached. No more transitions available.
                  </p>
                  <button
                    onClick={() => setCurrentState("INIT")}
                    className="border border-slate-600 bg-slate-700 px-6 py-2 text-sm text-slate-300 transition-all hover:bg-slate-600"
                  >
                    Reset to INIT
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="rounded border border-slate-700 bg-slate-950 p-4">
            <p className="mb-3 text-xs text-slate-400">State Machine Map:</p>
            <div className="space-y-2 font-mono text-xs">
              <div className="text-pink-400">INIT</div>
              <div className="pl-4 text-slate-500">
                ├─ ACCEPT_JOB → TUCKERSOFT
              </div>
              <div className="pl-4 text-slate-500">
                └─ REFUSE_JOB → SOLO_DEV
              </div>
              <div className="mt-2 text-pink-400">TUCKERSOFT</div>
              <div className="pl-4 text-slate-500">├─ MEET_COLIN → PARTY</div>
              <div className="pl-4 text-slate-500">
                └─ WORK_ALONE → SOLO_DEV
              </div>
              <div className="mt-2 text-pink-400">PARTY</div>
              <div className="pl-4 text-slate-500">├─ TAKE_DRUGS → THERAPY</div>
              <div className="pl-4 text-slate-500">
                └─ LEAVE_EARLY → SOLO_DEV
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
          <h4 className="mb-3 text-lg font-bold text-slate-100">
            Explicit State Machine
          </h4>
          <pre className="overflow-x-auto rounded border border-slate-700 bg-slate-950 p-4 text-xs">
            <code className="text-slate-300">
              {`const STATES = {
  INIT: 'INIT',
  TUCKERSOFT: 'TUCKERSOFT',
  SOLO_DEV: 'SOLO_DEV',
  // ... all states
};

const TRANSITIONS = {
  INIT: {
    ACCEPT_JOB: 'TUCKERSOFT',
    REFUSE_JOB: 'SOLO_DEV'
  },
  // ... all transitions
};

const transition = (event) => {
  const next = TRANSITIONS[state]?.[event];
  if (next) setState(next);
};`}
            </code>
          </pre>
          <p className="mt-3 text-xs text-slate-400">
            Predictable. Debuggable. Maintainable.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChapterSummary() {
  const [view, setView] = useState<"before" | "after">("before");

  return (
    <div className="space-y-8">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed">
          The final scene: Stefan sits at his computer, the completed
          Bandersnatch game running on screen. The reviewer from the gaming
          magazine plays through it, making choices, branching through states.
        </p>
        <p className="text-lg leading-relaxed">
          "It's remarkable," the reviewer says. "Every choice feels meaningful.
          Every path feels intentional. It's like you've mapped out every
          possible player experience."
        </p>
        <p className="text-lg leading-relaxed">
          Stefan has. Because he stopped trying to manage state in his head and
          started defining it explicitly. He created a state machine.
        </p>
      </div>

      <div className="rounded-lg border border-red-900/30 bg-slate-900 p-8">
        <h3 className="mb-6 text-center text-2xl font-bold text-slate-100">
          The Contrast: Before vs After
        </h3>

        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setView("before")}
            className={`border-2 px-6 py-3 transition-all ${
              view === "before"
                ? "border-red-500 bg-red-900/50 text-red-300"
                : "border-slate-700 bg-slate-800 text-slate-400 hover:border-red-500/50"
            }`}
          >
            Before (Chaos)
          </button>
          <button
            onClick={() => setView("after")}
            className={`border-2 px-6 py-3 transition-all ${
              view === "after"
                ? "border-red-500 bg-red-900/50 text-red-300"
                : "border-slate-700 bg-slate-800 text-slate-400 hover:border-red-500/50"
            }`}
          >
            After (Clarity)
          </button>
        </div>

        {view === "before" && (
          <div className="animate-[fadeIn_0.3s_ease-in] space-y-6">
            <div className="rounded-lg border border-slate-700 bg-slate-950 p-6">
              <h4 className="mb-4 text-lg font-bold text-red-400">
                Scattered State (Anti-Pattern)
              </h4>
              <pre className="overflow-x-auto text-xs">
                <code className="text-slate-300">
                  {`const [isLoggedIn, setIsLoggedIn] = useState(false);
const [hasProfile, setHasProfile] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

// Implicit state machine hidden in conditionals
if (isLoading) return <Spinner />;
if (error) return <Error />;
if (!isLoggedIn) return <Login />;
if (!hasProfile) return <CreateProfile />;
return <Dashboard />;`}
                </code>
              </pre>
              <div className="mt-4 space-y-2 text-sm text-slate-400">
                <p className="font-bold text-red-400">Problems:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>What if isLoading AND error are both true?</li>
                  <li>Can you be logged in without a profile?</li>
                  <li>How do you transition from isLoading to hasProfile?</li>
                  <li>The state machine exists but it's implicit</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {view === "after" && (
          <div className="animate-[fadeIn_0.3s_ease-in] space-y-6">
            <div className="rounded-lg border border-slate-700 bg-slate-950 p-6">
              <h4 className="mb-4 text-lg font-bold text-pink-400">
                Explicit State Machine (Correct Pattern)
              </h4>
              <pre className="overflow-x-auto text-xs">
                <code className="text-slate-300">
                  {`const STATES = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  LOGGED_OUT: 'LOGGED_OUT',
  NEEDS_PROFILE: 'NEEDS_PROFILE',
  READY: 'READY'
};

const [state, setState] = useState(STATES.LOADING);

// Explicit state machine
switch (state) {
  case STATES.LOADING:
    return <Spinner />;
  case STATES.ERROR:
    return <Error onRetry={() => setState(STATES.LOADING)} />;
  case STATES.LOGGED_OUT:
    return <Login onSuccess={() => setState(STATES.NEEDS_PROFILE)} />;
  case STATES.NEEDS_PROFILE:
    return <CreateProfile onComplete={() => setState(STATES.READY)} />;
  case STATES.READY:
    return <Dashboard />;
}`}
                </code>
              </pre>
              <div className="mt-4 space-y-2 text-sm text-slate-400">
                <p className="font-bold text-pink-400">Benefits:</p>
                <ul className="list-inside list-disc space-y-1">
                  <li>Impossible states are impossible</li>
                  <li>Transitions are explicit and visible</li>
                  <li>Easy to test each state independently</li>
                  <li>Easy to add new states or transitions</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-8">
        <h3 className="mb-6 text-2xl font-bold text-slate-100">
          The Synthesis
        </h3>
        <div className="space-y-4 text-lg text-slate-300">
          <p>
            <strong className="text-pink-400">
              Your React application is Bandersnatch.
            </strong>
          </p>
          <p>
            Every user interaction is a choice that triggers a state transition.
            Every state transition determines what renders next. Your job as a
            developer is to:
          </p>
          <ol className="list-inside list-decimal space-y-2 pl-4">
            <li>
              <strong className="text-red-400">Define states explicitly</strong>{" "}
              - Not scattered booleans, but clear, named states
            </li>
            <li>
              <strong className="text-red-400">Define valid transitions</strong>{" "}
              - Not implicit logic, but explicit rules
            </li>
            <li>
              <strong className="text-red-400">Make the machine visible</strong>{" "}
              - Document it, diagram it, make it understandable
            </li>
            <li>
              <strong className="text-red-400">
                Accept that you're controlled by state
              </strong>{" "}
              - Components render based on state, not the other way around
            </li>
          </ol>
        </div>
      </div>

      <div className="rounded-lg border border-red-500/30 bg-gradient-to-r from-red-900/20 to-pink-900/20 p-8 text-center">
        <p className="mb-4 text-2xl font-bold text-red-400">The Final Choice</p>
        <p className="mb-6 text-lg text-slate-300">
          You can continue managing state with scattered useState calls and
          nested conditionals, hoping you've covered all the edge cases...
        </p>
        <p className="mb-6 text-lg text-slate-300">
          Or you can architect a state machine. Define your states explicitly.
          Define your transitions clearly. Make the invisible visible.
        </p>
        <p className="text-xl font-bold text-pink-400">The choice is yours.</p>
        <p className="mt-6 text-sm italic text-slate-400">
          Choose carefully. Choose consciously. Because in React, as in
          Bandersnatch, you're not just writing code. You're defining reality
          itself.
        </p>
      </div>
    </div>
  );
}
