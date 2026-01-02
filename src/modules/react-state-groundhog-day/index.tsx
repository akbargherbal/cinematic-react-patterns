import { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Zap,
  Music,
  Heart,
  Snowflake,
  CheckCircle,
  XCircle,
  RefreshCw,
  Play,
  Pause,
  SkipForward,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface PhilState {
  memory: string[];
  skills: {
    piano: number;
    iceSculpting: number;
    french: number;
  };
  character: "cynical" | "neutral" | "compassionate";
  interactions: {
    ritaSlaps: number;
    helpedPeople: number;
    daysSurvived: number;
  };
}

interface Chapter {
  title: string;
  content: string;
  atmosphere: string;
}

export default function GroundhogDayStateModule(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [philState, setPhilState] = useState<PhilState>({
    memory: ["Just arrived in Punxsutawney"],
    skills: { piano: 0, iceSculpting: 0, french: 0 },
    character: "cynical",
    interactions: { ritaSlaps: 0, helpedPeople: 0, daysSurvived: 1 },
  });

  const [demoMode, setDemoMode] = useState<"god" | "grace">("god");
  const [pianoPracticeCount, setPianoPracticeCount] = useState<number>(0);
  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [practiceTimer, setPracticeTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [animationParent] = useAutoAnimate();

  const chapters: Chapter[] = [
    {
      title: "The First Re-Render",
      content:
        "The first time, it was just a day. A bad one. The digital clock flipped to 6:00 AM with an audible click, immediately followed by the gratingly cheerful intro to 'I Got You Babe.' Phil Connors groaned, the sound muffled by his pillow. The room was cold, the wallpaper was hideous, and the air smelled of mothballs and regret. This was the initial render, the component mounting for the first time, fed its initial set of props: `location: 'Punxsutawney'`, `event: 'Groundhog Day'`, `company: 'Rita and Larry'`. Then, the click. 6:00 AM. 'I Got You Babe.' For a moment, his mind refused to process it. The same cold air. The same hideous wallpaper. He sat bolt upright, heart hammering against his ribs. It was a perfect, bit-for-bit copy of the previous morning. A re-render. The props were identical. The town, the people, the sequence of events—all of it was being passed into his reality, unchanged. But as Phil stared into Ned's eyes, a terrifying realization crystallized. The props were the same, but he was not. He remembered the puddle. He remembered Ned. He remembered everything. Amidst the chaos of the repeating world, a single piece of data had persisted across the render boundary. His memory. His state. And it was the only thing that was his.",
      atmosphere: "claustrophobic, repetitive, jarring",
    },
    {
      title: "The God With No Purpose",
      content:
        "At first, this persistent state felt like a superpower. He was a god. He walked into the diner, his memory—his state object—now rich with data from dozens of previous renders. He knew the waitress's name, the specials, the exact moment a tray of dishes would crash to the floor. 'Don't worry about that,' he'd say, a half-second before the cacophony, earning amazed stares. He was reading from a cached version of reality, manipulating the outcome of each render with perfect foresight. But the interactions were hollow, a script he had memorized. His primary objective became Rita. He dedicated loops to data acquisition. In one render, he'd learn her favorite drink. `setState({ ritaLikes: 'Sweet Vermouth on the rocks with a twist' })`. In the next, her favorite poet. `setState({ ritaLikes: '...Rilke' })`. He would then use this state in the next render to construct the 'perfect' evening. But every time, he'd hit a wall. A misstep, a flicker of his underlying cynicism, and slap. The connection would fail. He was updating his state with superficial facts, but the core of his component, his character, remained unchanged. The renders were failing because the underlying logic was flawed.",
      atmosphere: "hollow, cynical, painful",
    },
    {
      title: "The `setState` of Grace",
      content:
        "The change didn't come with a thunderclap, but with a quiet sigh of resignation. He was in the diner with Rita, and for the first time, he just listened. He realized he had been trying to manipulate the props—the people, the events—to get a desired output. He had it all backwards. The only thing he could truly control was himself. The next morning, he walked past the bar, past the movie theater, and into a small house with a sign that read 'Piano Lessons.' He sat at the bench, his fingers stiff and clumsy on the keys. The first notes were awful. But he made a conscious decision, a deliberate function call. `setState({ skills: { ...prevState.skills, piano: 'beginner' } })`. And he did it again the next day. And the next. The narrative doesn't show one lesson; it implies hundreds. We see his fingers, once clumsy, now gliding across the keys. The state wasn't just being updated; it was being refined, built upon with each render. This unlocked a new way of thinking. He saw a block of ice and a chainsaw not as tools of destruction, but of creation. The roar of the saw was the sound of another state change. `setState({ skills: { ...prevState.skills, iceSculpting: 'proficient' } })`. He carved Rita's face into the frozen water, not as a ploy, but as an expression of the beauty he was now capable of creating.",
      atmosphere: "transformative, hopeful, elegant",
    },
    {
      title: "The Performance and The Person",
      content:
        "Imagine two final days, two different Phils running their final program. First, the God. He wakes at 6:00 AM, his eyes cold and calculating. His state is a finely-tuned machine for manipulation. He sidesteps Ned with a perfectly timed insult that leaves him speechless. He walks to the bank, arriving the exact moment the armored car guards are distracted, and pockets a bag of money. He uses the cash to buy a fancy suit. At the bar that night, he uses his memorized lines to charm a woman, leading her away into the evening. The day's objectives are all met. The component renders without error. He ends the night, standing alone in his room, the money on the table, feeling absolutely nothing. It was a perfect performance, a flawless execution of a hollow script. Now, the Person. He wakes at 6:00 AM, and a small, calm smile touches his lips. He walks out and greets Ned with a warm hug, having already bought the insurance policy Ned was selling, transforming the interaction from an annoyance into a moment of connection. He brings coffee for Rita and Larry, not because he knows they want it, but because it's a kind thing to do. At the Groundhog Festival party that night, he sits at the piano. He doesn't play to show off; he plays because the music is now part of him. His fingers dance across the keys, filling the room with a warmth that has nothing to do with the fireplace. The joy on the faces around him is the rendered output of his genuine state.",
      atmosphere: "reflective, comparative, insightful",
    },
    {
      title: "Tomorrow",
      content:
        "He woke with a familiar sense of dread. His eyes were still closed, but his entire being was coiled, waiting for the click of the clock and the first notes of the song. He felt the warmth of Rita beside him, a warmth he had earned, but one he expected to vanish with the inevitable re-render. 6:00 AM. Silence. No click. No Sonny & Cher. Just the soft sound of breathing beside him. He slowly opened his eyes. Rita was still there, asleep. The light filtering through the window seemed different—softer. He turned his head to the radio. It was playing a new song. A gentle, classical piece. The loop was broken. He and Rita walked out into the fresh morning air. The town was the same—the same buildings, the same streets. But it felt entirely new. He looked at the spot where the puddle used to be, now just damp pavement. He saw the corner where he would always meet Ned, now just a corner. The props were just props again. They no longer defined his reality. 'What do we do now?' Rita asked, slipping her hand into his. Phil looked at her, at the town, at the promise of a new day. All the skills, the knowledge, the compassion he had cultivated were not just memories of a loop. They were him. They were his foundation for whatever came next. 'Let's live here,' he said. His state had become his reality.",
      atmosphere: "celebratory, serene, complete",
    },
  ];

  // Circuit breaker for piano practice
  useEffect(() => {
    if (pianoPracticeCount > 50) {
      resetPianoPractice();
    }
  }, [pianoPracticeCount]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (practiceTimer) {
        clearInterval(practiceTimer);
      }
    };
  }, [practiceTimer]);

  const startPianoPractice = useCallback(() => {
    if (isPracticing) return;

    setIsPracticing(true);
    const timer = setInterval(() => {
      setPianoPracticeCount((prev) => {
        const newCount = prev + 1;

        // Update Phil's state with skill progression
        if (newCount % 10 === 0) {
          setPhilState((prevState) => ({
            ...prevState,
            skills: {
              ...prevState.skills,
              piano: Math.min(prevState.skills.piano + 1, 10),
            },
          }));
        }

        return newCount;
      });
    }, 300);

    setPracticeTimer(timer);
  }, [isPracticing]);

  const stopPianoPractice = useCallback(() => {
    if (practiceTimer) {
      clearInterval(practiceTimer);
      setPracticeTimer(null);
    }
    setIsPracticing(false);
  }, [practiceTimer]);

  const resetPianoPractice = useCallback(() => {
    stopPianoPractice();
    setPianoPracticeCount(0);
    setPhilState((prev) => ({
      ...prev,
      skills: { ...prev.skills, piano: 0 },
    }));
  }, [stopPianoPractice]);

  const addMemory = useCallback((memory: string) => {
    setPhilState((prev) => ({
      ...prev,
      memory: [...prev.memory.slice(-4), memory], // Keep last 5 memories
    }));
  }, []);

  const improveCharacter = useCallback(() => {
    setPhilState((prev) => {
      const nextCharacter =
        prev.character === "cynical"
          ? "neutral"
          : prev.character === "neutral"
            ? "compassionate"
            : "compassionate";

      return {
        ...prev,
        character: nextCharacter,
        interactions: {
          ...prev.interactions,
          helpedPeople: prev.interactions.helpedPeople + 1,
        },
      };
    });
  }, []);

  const triggerRitaSlap = useCallback(() => {
    setPhilState((prev) => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        ritaSlaps: prev.interactions.ritaSlaps + 1,
      },
    }));
  }, []);

  const advanceDay = useCallback(() => {
    setPhilState((prev) => ({
      ...prev,
      interactions: {
        ...prev.interactions,
        daysSurvived: prev.interactions.daysSurvived + 1,
      },
    }));
  }, []);

  const resetAll = useCallback(() => {
    setPhilState({
      memory: ["Just arrived in Punxsutawney"],
      skills: { piano: 0, iceSculpting: 0, french: 0 },
      character: "cynical",
      interactions: { ritaSlaps: 0, helpedPeople: 0, daysSurvived: 1 },
    });
    setPianoPracticeCount(0);
    stopPianoPractice();
    setDemoMode("god");
  }, [stopPianoPractice]);

  const currentChapter = chapters[chapter];

  // Code examples
  const initialStateCode = `// Phil's initial state
const [philState, setPhilState] = useState({
  memory: ["Just arrived in Punxsutawney"],
  skills: { piano: 0, iceSculpting: 0 },
  character: "cynical",
  interactions: { ritaSlaps: 0, helpedPeople: 0 }
});`;

  const shallowUpdateCode = `// ❌ Shallow, manipulative state update
const learnRitaFact = (fact: string) => {
  setPhilState(prev => ({
    ...prev,
    // Just adding facts without changing character
    ritaFacts: [...prev.ritaFacts, fact]
  }));
  // State updates, but component still renders the same way
  // because character remains 'cynical'
};`;

  const meaningfulUpdateCode = `// ✅ Meaningful state update
const practicePiano = () => {
  setPhilState(prev => ({
    ...prev,
    skills: {
      ...prev.skills,
      piano: prev.skills.piano + 1  // Actually improves
    },
    character: prev.skills.piano > 5 ? "compassionate" : prev.character
  }));
  // State change leads to different render output
};`;

  const functionalUpdateCode = `// ✅ Functional update for accuracy
const helpPerson = () => {
  setPhilState(prev => {
    const newHelped = prev.interactions.helpedPeople + 1;
    return {
      ...prev,
      interactions: {
        ...prev.interactions,
        helpedPeople: newHelped
      },
      // Character evolves based on actions
      character: newHelped > 3 ? "compassionate" : prev.character
    };
  });
};`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-blue-950 font-sans text-slate-300">
      {/* Header */}
      <header className="top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-7 w-7 text-amber-500 sm:h-8 sm:w-8" />
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Groundhog Day
              </h1>
            </div>
            <p className="text-sm font-medium text-slate-400 sm:text-base">
              Punxsutawney • Phil Connors • 1993
            </p>
          </div>
          <p className="text-base font-medium text-amber-500 sm:text-lg">
            React State: Props are fixed, but State evolves across re-renders
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column: Narrative */}
          <div className="space-y-8">
            <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  {currentChapter.title}
                </h2>
                <span className="rounded-full bg-amber-500/10 px-3 py-1 font-mono text-sm text-amber-500/80">
                  Day {philState.interactions.daysSurvived}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Zap className="h-4 w-4" />
                  <span>Atmosphere: {currentChapter.atmosphere}</span>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="leading-relaxed text-slate-300">
                    {currentChapter.content}
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter Navigation */}
            <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-full rounded-full bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-amber-500 transition-all duration-500"
                      style={{
                        width: `${((chapter + 1) / chapters.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="font-mono text-sm text-slate-400">
                    Chapter {chapter + 1} of {chapters.length}
                  </span>
                </div>

                <button
                  onClick={resetAll}
                  className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm transition-colors hover:bg-slate-700"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Journey
                </button>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setChapter(Math.max(0, chapter - 1))}
                  disabled={chapter === 0}
                  className="flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 font-medium transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  ← Previous
                </button>

                <button
                  onClick={() => {
                    if (chapter < chapters.length - 1) {
                      setChapter(chapter + 1);
                      advanceDay();
                    }
                  }}
                  disabled={chapter === chapters.length - 1}
                  className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-medium transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {chapter === chapters.length - 1
                    ? "Journey Complete"
                    : "Next Day →"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Demo */}
          <div className="space-y-8">
            {/* Phil's Current State Display */}
            <div
              className="rounded-xl border border-slate-700 bg-slate-900/80 p-6 backdrop-blur-sm"
              ref={animationParent}
            >
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                <Calendar className="h-5 w-5 text-amber-500" />
                Phil's State Object
              </h3>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <h4 className="mb-2 text-sm font-semibold text-slate-400">
                      Memory (Last 5)
                    </h4>
                    <ul className="space-y-1">
                      {philState.memory.map((mem, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-slate-300"
                        >
                          <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-amber-500/60" />
                          {mem}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <h4 className="mb-2 text-sm font-semibold text-slate-400">
                      Character
                    </h4>
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-full px-3 py-1 text-sm font-medium ${
                          philState.character === "cynical"
                            ? "bg-red-500/20 text-red-400"
                            : philState.character === "neutral"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-emerald-500/20 text-emerald-400"
                        }`}
                      >
                        {philState.character}
                      </div>
                      <div className="text-xs text-slate-500">
                        {philState.character === "cynical"
                          ? "Manipulates props"
                          : philState.character === "neutral"
                            ? "Learning state"
                            : "Expresses state"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <h4 className="mb-2 text-sm font-semibold text-slate-400">
                      Skills
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-slate-300">
                          <Music className="h-4 w-4" /> Piano
                        </span>
                        <div className="h-2 w-24 rounded-full bg-slate-700">
                          <div
                            className="h-2 rounded-full bg-amber-500 transition-all duration-300"
                            style={{
                              width: `${(philState.skills.piano / 10) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-slate-300">
                          <Snowflake className="h-4 w-4" /> Ice Sculpting
                        </span>
                        <div className="h-2 w-24 rounded-full bg-slate-700">
                          <div
                            className="h-2 rounded-full bg-amber-500"
                            style={{
                              width: `${(philState.skills.iceSculpting / 10) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <h4 className="mb-2 text-sm font-semibold text-slate-400">
                      Interactions
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-400">
                          {philState.interactions.ritaSlaps}
                        </div>
                        <div className="text-xs text-slate-500">Rita Slaps</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-400">
                          {philState.interactions.helpedPeople}
                        </div>
                        <div className="text-xs text-slate-500">
                          People Helped
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chapter-specific demos */}
              {chapter === 0 && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => addMemory("Remembered the puddle")}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-700"
                    >
                      Remember Puddle
                    </button>
                    <button
                      onClick={() => addMemory("Avoided Ned Ryerson")}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-700"
                    >
                      Avoid Ned
                    </button>
                  </div>
                  <CodeBlock
                    code={initialStateCode}
                    variant="default"
                    title="// Initial State Definition"
                    defaultExpanded={true}
                  />
                </div>
              )}

              {chapter === 1 && (
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <button
                      onClick={() => setDemoMode("god")}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        demoMode === "god"
                          ? "bg-red-600 text-white"
                          : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      ❌ God Mode
                    </button>
                    <button
                      onClick={triggerRitaSlap}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-red-700"
                    >
                      Trigger Rita Slap
                    </button>
                  </div>

                  <div className="space-y-4">
                    <CodeBlock
                      code={shallowUpdateCode}
                      variant="error"
                      title="// ❌ Shallow State Updates (Anti-Pattern)"
                      defaultExpanded={true}
                    />

                    <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4 text-sm text-slate-400">
                      <div className="mb-2 flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-400" />
                        <span className="font-medium">
                          Shallow state updates:
                        </span>
                      </div>
                      <ul className="ml-6 space-y-1">
                        <li>
                          • Changing surface data without core transformation
                        </li>
                        <li>• Renders technically work but lack meaning</li>
                        <li>
                          • Component appears functional but produces wrong
                          output
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {chapter === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={startPianoPractice}
                        disabled={isPracticing || pianoPracticeCount >= 50}
                        className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Play className="h-4 w-4" />
                        Practice Piano
                      </button>
                      <button
                        onClick={stopPianoPractice}
                        disabled={!isPracticing}
                        className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <Pause className="h-4 w-4" />
                        Stop
                      </button>
                      <button
                        onClick={resetPianoPractice}
                        className="flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-600"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Reset
                      </button>
                    </div>

                    <div className="text-center">
                      <div className="font-mono text-2xl font-bold text-emerald-400">
                        {pianoPracticeCount}
                      </div>
                      <div className="text-xs text-slate-500">
                        Practice Sessions
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={improveCharacter}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-700"
                    >
                      <Heart className="h-4 w-4" />
                      Help Someone
                    </button>
                    <button
                      onClick={() =>
                        setPhilState((prev) => ({
                          ...prev,
                          skills: {
                            ...prev.skills,
                            iceSculpting: Math.min(
                              prev.skills.iceSculpting + 1,
                              10,
                            ),
                          },
                        }))
                      }
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium transition-colors hover:bg-blue-700"
                    >
                      <Snowflake className="h-4 w-4" />
                      Learn Ice Sculpting
                    </button>
                  </div>

                  <div className="space-y-4">
                    <CodeBlock
                      code={meaningfulUpdateCode}
                      variant="success"
                      title="// ✅ Meaningful State Updates"
                      defaultExpanded={true}
                    />

                    <CodeBlock
                      code={functionalUpdateCode}
                      variant="success"
                      title="// ✅ Functional Updates with Logic"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              )}

              {chapter === 3 && (
                <div className="space-y-6">
                  <div className="mb-4 flex gap-4">
                    <button
                      onClick={() => setDemoMode("god")}
                      className={`flex-1 rounded-lg py-3 font-medium transition-colors ${
                        demoMode === "god"
                          ? "border-2 border-red-500 bg-red-600 text-white"
                          : "border border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="text-lg">👑</div>
                        <div className="text-sm">The God's Day</div>
                        <div className="text-xs opacity-70">
                          Manipulating State
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setDemoMode("grace")}
                      className={`flex-1 rounded-lg py-3 font-medium transition-colors ${
                        demoMode === "grace"
                          ? "border-2 border-emerald-500 bg-emerald-600 text-white"
                          : "border border-slate-700 bg-slate-800 text-slate-400 hover:bg-slate-700"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <div className="text-lg">❤️</div>
                        <div className="text-sm">The Perfect Day</div>
                        <div className="text-xs opacity-70">
                          Expressing State
                        </div>
                      </div>
                    </button>
                  </div>

                  <div
                    className={`rounded-lg border p-4 ${
                      demoMode === "god"
                        ? "border-red-500/30 bg-red-950/20"
                        : "border-emerald-500/30 bg-emerald-950/20"
                    }`}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      {demoMode === "god" ? (
                        <XCircle className="h-5 w-5 text-red-400" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-emerald-400" />
                      )}
                      <h4 className="font-bold">
                        {demoMode === "god" ? "The Performance" : "The Person"}
                      </h4>
                    </div>

                    <ul className="space-y-2 text-sm">
                      {demoMode === "god" ? (
                        <>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-400" />
                            Manipulates props with perfect knowledge
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-400" />
                            Achieves technical objectives
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-400" />
                            Feels hollow and empty
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-400" />
                            Component renders but lacks meaning
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-400" />
                            State naturally expresses through actions
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-400" />
                            Creates genuine connections
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-400" />
                            Finds purpose and satisfaction
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-emerald-400" />
                            Component produces beautiful experience
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {chapter === 4 && (
                <div className="space-y-6">
                  <div className="rounded-lg border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 to-blue-950/30 p-6 text-center">
                    <div className="mb-4 text-5xl">🎉</div>
                    <h4 className="mb-2 text-xl font-bold text-white">
                      The Loop is Broken
                    </h4>
                    <p className="mb-4 text-slate-300">
                      Phil's state has reached its final, perfected form. The
                      component has fulfilled its purpose.
                    </p>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-slate-800/50 p-4">
                        <div className="font-mono text-2xl font-bold text-emerald-400">
                          {philState.skills.piano +
                            philState.skills.iceSculpting +
                            philState.skills.french}
                        </div>
                        <div className="text-sm text-slate-400">
                          Total Skills
                        </div>
                      </div>
                      <div className="rounded-lg bg-slate-800/50 p-4">
                        <div className="font-mono text-2xl font-bold text-emerald-400">
                          {philState.interactions.daysSurvived}
                        </div>
                        <div className="text-sm text-slate-400">
                          Days Survived
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setChapter(0);
                        resetAll();
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-medium transition-colors hover:bg-amber-700"
                    >
                      <SkipForward className="h-5 w-5" />
                      Start New Journey
                    </button>
                  </div>

                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/20 p-4 text-sm text-slate-400">
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="font-medium">Key Insight:</span>
                    </div>
                    <p className="leading-relaxed">
                      State isn't about controlling props. It's about becoming
                      someone who can interact with props gracefully. When your
                      component's internal state is well-managed, the rendered
                      output naturally becomes beautiful and meaningful.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Memorable Phrases */}
            <div className="rounded-xl border border-slate-700 bg-slate-900/60 p-6">
              <h3 className="mb-4 text-lg font-bold text-white">
                Core Insights
              </h3>
              <div className="space-y-3">
                <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3 text-sm text-slate-300">
                  "Every day is a re-render. The props are always the same."
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3 text-sm text-slate-300">
                  "He stopped trying to change the day. He started changing his
                  state."
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-3 text-sm text-slate-300">
                  "One day was a perfect performance. The other was a perfect
                  person."
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
