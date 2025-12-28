import { useState, useEffect, useRef } from "react";
import { Anchor, AlertTriangle, CheckCircle, Zap } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
  demo: () => JSX.Element;
}

export default function ShutterIslandModule() {
  const [chapter, setChapter] = useState(0);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Ferry to Ashecliffe",
      content: `The ferry cuts through fog so thick it feels solid. U.S. Marshal Teddy Daniels stands at the rail, his partner Chuck beside him, both watching Shutter Island materialize like a memory surfacing from deep water. Teddy's hand rests on his notebook—inside, the facts are clear, immutable, captured in ink:

His wife died in a fire. He's here to find a missing patient. He's a federal marshal investigating a case.

These truths are his foundation. He arrived with them, and they define everything that follows. In this moment, on this ferry, these are the values that matter. This is his initial render.

In React, when a component renders, it creates a snapshot of that moment in time. Every variable, every prop, every piece of state—they're captured as they exist right now. When you write a useEffect, it doesn't reach into some mystical "current state" dimension. It captures the values that existed when the component rendered.

Teddy steps onto the dock. The values in his notebook—his captured closure—are everything he knows. The island may hold different truths, but Teddy's investigation will proceed with the information he brought with him.

This is how closures work. They capture the environment at the moment of creation. Teddy's "effect" has begun, and it's running with the values from his arrival.`,
      demo: Demo1ClosureCapture,
    },
    {
      id: "build",
      title: "The Investigation Begins",
      content: `Teddy interviews staff. He searches Rachel Solando's room. He examines the note: THE LAW OF 4. Every piece of evidence passes through the lens of his captured beliefs. He's looking for a missing patient. He's investigating a conspiracy. His wife died in a fire.

But something's wrong.

The doctors watch him with strange patience. Dr. Cawley asks questions that don't quite fit. The orderlies exchange glances. Teddy notices these things, but he interprets them through his original framework—the values he captured when he arrived.

The state has changed. Teddy hasn't.

In your React component, state updates. A user clicks a button. An API returns data. A timer ticks. The component re-renders with new values. But that useEffect you wrote? It's still running with the old values it captured.

The UI shows the updated truth. The component has re-rendered. But that first effect—the one with the interval—is still running with truth from the initial render. It's a stale closure.

Teddy finds a cave. Inside, a woman who claims to be the real Rachel Solando tells him the truth: "This is a game. They're experimenting on you. You're a patient here."

Teddy rejects this. It contradicts his captured values. His closure doesn't include this information. He's still investigating with his original assumptions, even as reality shifts around him.`,
      demo: Demo2StaleClosureProblem,
    },
    {
      id: "climax",
      title: "The Storm and the Lighthouse",
      content: `The hurricane hits. Teddy's investigation reaches its breaking point. He's convinced there's a patient in the lighthouse—the conspiracy's final proof. He climbs through the storm, driven by his captured beliefs, his stale closure pushing him toward a conclusion built on outdated data.

Every decision he makes is wrong because the values he's using are wrong.

He's not investigating a missing patient. He's not uncovering a conspiracy. He's acting out a delusion based on information captured two years ago, in a different render, in a different reality.

This is when stale closures cause real damage in your application. The user clicks "Delete Patient." The UI updates. isDeleted is now true. patientId is now null. But that interval in the effect? It's still running with patientId: 67 and isDeleted: false.

It keeps trying to save a deleted patient.

Every 5 seconds, it sends a request with stale data. The API receives updates for a patient that shouldn't exist. Data corruption. Race conditions. Bugs that only appear in production, under specific timing conditions, impossible to reproduce.

Teddy reaches the lighthouse. Inside, he finds Dr. Cawley waiting for him. Not a mad scientist. Not a conspirator. Just a psychiatrist, patient and sad, ready to show Teddy what his stale closure has cost him.`,
      demo: Demo3Consequences,
    },
    {
      id: "resolution",
      title: "The Truth in Ward C",
      content: `Dr. Cawley takes Teddy—Andrew—to Ward C. He shows him the evidence. The real evidence. Not filtered through a stale closure, but the current state of reality:

His name is Andrew Laeddis. He was a marshal, but that was before. His wife killed their children. He killed his wife. He's been a patient here for two years.

This is the updated state. This is what truth actually equals now. Teddy's effect has been running with values from two years ago, but the state has changed. The component has re-rendered countless times. He just never updated his dependencies.

The solution to stale closures is simple: include your dependencies.

When you include truth and patientId in the dependency array, you're telling React: "When these values change, throw away the old effect and create a new one with the current values."

The effect re-runs. The closure re-captures. The stale values are replaced with current ones.

Andrew sits in the courtyard with Dr. Sheehan (who he knew as "Chuck"). They talk about his children. About Dolores. About what he did. The conversation is painful, but it's based on current state. No stale closures. No outdated values.`,
      demo: Demo4Solution,
    },
    {
      id: "summary",
      title: "Which Would Be Worse?",
      content: `The next morning, Andrew sits on the steps with Dr. Sheehan. They watch the sunrise over the water. Andrew speaks quietly:

"You know, this place makes me wonder... which would be worse? To live as a monster, or to die as a good man?"

Dr. Sheehan's face falls. Andrew has regressed. He's chosen the stale closure. He's chosen to run his effect with the old, captured values—"My wife died in a fire, I'm a marshal, I'm here to investigate"—rather than accept the updated state.

He's deliberately choosing the stale closure over current reality.

In React, you have the same choice. You can ignore the problem, fix it properly with dependencies, or use functional updates to avoid reading state entirely.

Every useEffect is a ferry ride to Shutter Island. You arrive with captured values—your closure. The question is: when the state changes, when reality shifts, will your effect update its dependencies and see the current truth? Or will it keep investigating with stale data, trapped in an old render, forever solving a mystery that no longer exists?

Include your dependencies. Capture current values. Don't let your closures go stale.`,
      demo: Demo5Synthesis,
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 font-serif text-slate-300">
      {/* Header */}
      <header className="border-b border-slate-700/30 bg-slate-950/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div className="mb-2 flex items-center gap-3">
            <Anchor className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-slate-100">
              Shutter Island
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Teddy Daniels, Ashecliffe Hospital, 1954
          </p>
          <p className="mt-2 text-sm text-blue-400">
            Understanding Stale Closures in useEffect
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-slate-100">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 rounded bg-blue-500/50"></div>
        </div>

        {/* Narrative Content */}
        <article className="prose prose-invert prose-slate mb-12 max-w-none">
          {currentChapter.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="mb-4 leading-relaxed text-slate-300">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Interactive Demo */}
        <div className="rounded-lg border border-slate-700/30 bg-slate-900/50 p-6">
          <currentChapter.demo />
        </div>
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-700/30 bg-slate-950/90 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="rounded-lg bg-blue-600 px-6 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-blue-600"
            >
              Previous
            </button>

            <span className="font-sans text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="rounded-lg bg-blue-600 px-6 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Demo 1: Basic Closure Capture
function Demo1ClosureCapture() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    // This captures 'count' from the current render
    const capturedCount = count;
    setLog((prev) => [...prev, `Effect ran. Captured count: ${capturedCount}`]);
  }, []); // Empty deps: only runs once

  return (
    <div>
      <h3 className="mb-4 font-sans text-xl font-bold text-slate-100">
        Teddy's Notebook: Captured Values
      </h3>
      <p className="mb-4 font-sans text-sm text-slate-400">
        The effect captures the count value when it first runs. Click the button
        to update state, but notice the effect never sees the new value.
      </p>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-700/50 bg-slate-800/50 p-4">
          <div className="mb-2 font-sans text-xs text-slate-500">
            CURRENT STATE
          </div>
          <div className="text-3xl font-bold text-blue-400">{count}</div>
        </div>

        <div className="rounded border border-slate-700/50 bg-slate-800/50 p-4">
          <div className="mb-2 font-sans text-xs text-slate-500">
            TEDDY'S NOTEBOOK (CAPTURED)
          </div>
          <div className="text-3xl font-bold text-slate-500">0</div>
        </div>
      </div>

      <button
        onClick={() => setCount((c) => c + 1)}
        className="mb-4 w-full rounded bg-blue-600 px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        Update State (Reality Changes)
      </button>

      <div className="rounded border border-slate-700/50 bg-slate-950/50 p-4 font-mono text-xs">
        <div className="mb-2 text-slate-500">CONSOLE LOG:</div>
        {log.map((entry, idx) => (
          <div key={idx} className="text-slate-400">
            {entry}
          </div>
        ))}
      </div>
    </div>
  );
}

// Demo 2: Stale Closure Problem
function Demo2StaleClosureProblem() {
  const [truth, setTruth] = useState("My wife died in a fire");
  const [realityTruth, setRealityTruth] = useState("My wife died in a fire");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Stale closure: captures initial truth
    const capturedTruth = truth;
    intervalRef.current = setInterval(() => {
      setRealityTruth(capturedTruth); // Always uses initial value!
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // Empty deps: never re-captures

  const updateTruth = () => {
    setTruth("I am Andrew Laeddis. I killed my wife.");
  };

  return (
    <div>
      <h3 className="mb-4 font-sans text-xl font-bold text-slate-100">
        The Investigation: Stale vs. Current
      </h3>
      <p className="mb-4 font-sans text-sm text-slate-400">
        State updates, but the effect keeps using the old captured value. Teddy
        investigates with outdated information.
      </p>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-700/50 bg-slate-800/50 p-4">
          <div className="mb-2 font-sans text-xs text-slate-500">
            REALITY (CURRENT STATE)
          </div>
          <div className="text-sm text-emerald-400">{truth}</div>
        </div>

        <div className="rounded border border-red-900/30 bg-slate-800/50 p-4">
          <div className="mb-2 font-sans text-xs text-slate-500">
            TEDDY'S VIEW (STALE CLOSURE)
          </div>
          <div className="text-sm text-red-400">{realityTruth}</div>
        </div>
      </div>

      <button
        onClick={updateTruth}
        className="w-full rounded bg-blue-600 px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-blue-500"
      >
        Reveal the Truth (Update State)
      </button>

      <div className="mt-4 rounded border border-red-500/30 bg-red-950/20 p-3">
        <div className="flex items-start gap-2">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
          <p className="font-sans text-xs text-red-300">
            The effect's interval keeps logging the old value. Teddy can't see
            the updated truth because his closure is stale.
          </p>
        </div>
      </div>
    </div>
  );
}

// Demo 3: Consequences
function Demo3Consequences() {
  const [patientId, setPatientId] = useState<number | null>(67);
  const [isDeleted, setIsDeleted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Stale closure: captures initial patientId and isDeleted
    const capturedId = patientId;
    const capturedDeleted = isDeleted;

    intervalRef.current = setInterval(() => {
      if (!capturedDeleted && capturedId !== null) {
        setErrors((prev) => [
          ...prev,
          `Attempting to save patient ${capturedId}... ERROR: Patient deleted!`,
        ]);
      }
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // Empty deps: disaster waiting to happen

  const handleDelete = () => {
    setIsDeleted(true);
    setPatientId(null);
  };

  return (
    <div>
      <h3 className="mb-4 font-sans text-xl font-bold text-slate-100">
        The Storm: Consequences of Stale Closures
      </h3>
      <p className="mb-4 font-sans text-sm text-slate-400">
        The auto-save interval uses stale values. Even after deletion, it keeps
        trying to save with the old patient ID.
      </p>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-700/50 bg-slate-800/50 p-4">
          <div className="mb-2 font-sans text-xs text-slate-500">
            PATIENT ID
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {patientId ?? "NULL"}
          </div>
        </div>

        <div className="rounded border border-slate-700/50 bg-slate-800/50 p-4">
          <div className="mb-2 font-sans text-xs text-slate-500">STATUS</div>
          <div
            className={`text-2xl font-bold ${
              isDeleted ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {isDeleted ? "DELETED" : "ACTIVE"}
          </div>
        </div>
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleted}
        className="mb-4 w-full rounded bg-red-600 px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Delete Patient
      </button>

      <div className="max-h-40 overflow-y-auto rounded border border-red-500/30 bg-slate-950/50 p-4 font-mono text-xs">
        <div className="mb-2 text-red-400">ERROR LOG:</div>
        {errors.length === 0 ? (
          <div className="text-slate-500">No errors yet...</div>
        ) : (
          errors.map((error, idx) => (
            <div key={idx} className="mb-1 text-red-300">
              {error}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Demo 4: Solution
function Demo4Solution() {
  const [patientId, setPatientId] = useState<number | null>(67);
  const [isDeleted, setIsDeleted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Proper dependencies: re-captures when values change
    if (!isDeleted && patientId !== null) {
      intervalRef.current = setInterval(() => {
        setLogs((prev) => [...prev, `Saving patient ${patientId}... SUCCESS!`]);
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setLogs((prev) => [...prev, "Effect cleaned up. Interval cleared."]);
      }
    };
  }, [patientId, isDeleted]); // Dependencies: re-run when these change!

  const handleDelete = () => {
    setIsDeleted(true);
    setPatientId(null);
  };

  return (
    <div>
      <h3 className="mb-4 font-sans text-xl font-bold text-slate-100">
        Ward C: The Solution
      </h3>
      <p className="mb-4 font-sans text-sm text-slate-400">
        With proper dependencies, the effect re-runs when values change. It
        cleans up the old interval and creates a new one with current values.
      </p>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div className="rounded border border-slate-700/50 bg-slate-800/50 p-4">
          <div className="mb-2 font-sans text-xs text-slate-500">
            PATIENT ID
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {patientId ?? "NULL"}
          </div>
        </div>

        <div className="rounded border border-slate-700/50 bg-slate-800/50 p-4">
          <div className="mb-2 font-sans text-xs text-slate-500">STATUS</div>
          <div
            className={`text-2xl font-bold ${
              isDeleted ? "text-red-400" : "text-emerald-400"
            }`}
          >
            {isDeleted ? "DELETED" : "ACTIVE"}
          </div>
        </div>
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleted}
        className="mb-4 w-full rounded bg-emerald-600 px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Delete Patient (Properly Handled)
      </button>

      <div className="max-h-40 overflow-y-auto rounded border border-emerald-500/30 bg-slate-950/50 p-4 font-mono text-xs">
        <div className="mb-2 text-emerald-400">SUCCESS LOG:</div>
        {logs.length === 0 ? (
          <div className="text-slate-500">Waiting for activity...</div>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="mb-1 text-emerald-300">
              {log}
            </div>
          ))
        )}
      </div>

      <div className="mt-4 rounded border border-emerald-500/30 bg-emerald-950/20 p-3">
        <div className="flex items-start gap-2">
          <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
          <p className="font-sans text-xs text-emerald-300">
            When you delete the patient, the effect sees the updated values,
            cleans up the interval, and stops trying to save. No stale closures!
          </p>
        </div>
      </div>
    </div>
  );
}

// Demo 5: Synthesis - Three Approaches
function Demo5Synthesis() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const [logs, setLogs] = useState<{ type: string; message: string }[]>([]);

  // Approach 1: Stale closure (empty deps)
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [
        ...prev,
        { type: "stale", message: `Stale: count is ${count1}` },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []); // Never re-captures count1

  // Approach 2: Proper deps
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [
        ...prev,
        { type: "proper", message: `Proper: count is ${count2}` },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, [count2]); // Re-captures when count2 changes

  // Approach 3: Functional update (no state reference)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount3((c) => {
        setLogs((prev) => [
          ...prev,
          { type: "functional", message: `Functional: count is ${c + 1}` },
        ]);
        return c + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []); // Can stay empty because we don't read state

  return (
    <div>
      <h3 className="mb-4 font-sans text-xl font-bold text-slate-100">
        The Choice: Three Approaches
      </h3>
      <p className="mb-4 font-sans text-sm text-slate-400">
        Compare three ways to handle state in effects. Watch how each approach
        behaves differently.
      </p>

      <div className="mb-4 grid gap-4 md:grid-cols-3">
        <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
          <div className="mb-2 font-sans text-xs font-bold text-red-400">
            STALE CLOSURE
          </div>
          <div className="mb-2 text-2xl font-bold text-slate-300">{count1}</div>
          <button
            onClick={() => setCount1((c) => c + 1)}
            className="w-full rounded bg-red-600 px-3 py-1 font-sans text-xs text-white transition-colors hover:bg-red-500"
          >
            Increment
          </button>
        </div>

        <div className="rounded border border-emerald-500/30 bg-emerald-950/20 p-4">
          <div className="mb-2 font-sans text-xs font-bold text-emerald-400">
            PROPER DEPS
          </div>
          <div className="mb-2 text-2xl font-bold text-slate-300">{count2}</div>
          <button
            onClick={() => setCount2((c) => c + 1)}
            className="w-full rounded bg-emerald-600 px-3 py-1 font-sans text-xs text-white transition-colors hover:bg-emerald-500"
          >
            Increment
          </button>
        </div>

        <div className="rounded border border-blue-500/30 bg-blue-950/20 p-4">
          <div className="mb-2 font-sans text-xs font-bold text-blue-400">
            FUNCTIONAL UPDATE
          </div>
          <div className="mb-2 text-2xl font-bold text-slate-300">{count3}</div>
          <div className="font-sans text-xs text-slate-500">
            Auto-incrementing
          </div>
        </div>
      </div>

      <div className="max-h-48 overflow-y-auto rounded border border-slate-700/50 bg-slate-950/50 p-4 font-mono text-xs">
        <div className="mb-2 text-slate-400">COMPARISON LOG:</div>
        {logs.slice(-10).map((log, idx) => (
          <div
            key={idx}
            className={`mb-1 ${
              log.type === "stale"
                ? "text-red-300"
                : log.type === "proper"
                  ? "text-emerald-300"
                  : "text-blue-300"
            }`}
          >
            {log.message}
          </div>
        ))}
      </div>

      <div className="mt-4 rounded border border-blue-500/30 bg-blue-950/20 p-3">
        <div className="flex items-start gap-2">
          <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
          <p className="font-sans text-xs text-blue-300">
            Notice: Stale always logs the same value. Proper logs current value.
            Functional doesn't need to read state at all—it uses the updater
            function.
          </p>
        </div>
      </div>
    </div>
  );
}
