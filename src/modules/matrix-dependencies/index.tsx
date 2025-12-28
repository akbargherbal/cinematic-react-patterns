import { useState, useEffect, useRef } from "react";
import { Zap, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface Chapter {
  title: string;
  content: JSX.Element;
}

export default function MatrixDependencies() {
  const [chapter, setChapter] = useState(0);

  const chapters: Chapter[] = [
    {
      title: "Chapter 1: Re-Entry",
      content: <Chapter1 />,
    },
    {
      title: "Chapter 2: The Glitch",
      content: <Chapter2 />,
    },
    {
      title: "Chapter 3: The Prophecy",
      content: <Chapter3 />,
    },
    {
      title: "Chapter 4: The Architect",
      content: <Chapter4 />,
    },
    {
      title: "Chapter 5: The Resolution",
      content: <Chapter5 />,
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-emerald-950 text-slate-300 font-serif">
      <header className="p-8 border-b border-emerald-500/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-emerald-500" />
            <h1 className="text-4xl font-bold text-emerald-500">The Matrix Reloaded</h1>
          </div>
          <p className="text-lg text-emerald-400/70">Neo, The One, 2003</p>
          <p className="text-sm text-slate-400 mt-2">A lesson in useEffect dependencies</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12 pb-32">
        <article>
          <h2 className="text-3xl font-bold text-emerald-400 mb-6">{currentChapter.title}</h2>
          <div className="space-y-6">{currentChapter.content}</div>
        </article>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-emerald-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setChapter((c) => c - 1)}
            disabled={chapter === 0}
            className="px-6 py-2 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/50 hover:bg-emerald-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-emerald-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
            <div className="flex gap-1">
              {chapters.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === chapter ? "bg-emerald-500" : "bg-emerald-500/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => setChapter((c) => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-2 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/50 hover:bg-emerald-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}

function Chapter1() {
  return (
    <div className="prose prose-invert max-w-none">
      <p className="text-lg leading-relaxed">
        Neo jacked back into the Matrix, his digital form materializing in the familiar cascade of
        green code. But something felt different this time. The world around him flickered—just for
        a moment—like a skipped frame in a movie reel.
      </p>
      <p className="text-lg leading-relaxed mt-4">
        "What was that?" he asked Morpheus through the comms.
      </p>
      <p className="text-lg leading-relaxed mt-4">
        "A disturbance," Morpheus replied, his voice grave. "The Matrix is reacting to something.
        Your effects are running, but they're not synchronized with reality."
      </p>
      <p className="text-lg leading-relaxed mt-4">
        Neo's mission was clear: understand the dependency array—the list that tells React when to
        re-run effects. Miss a dependency, and your effect sees old data. Include the wrong ones,
        and your effect runs too often, destabilizing the system.
      </p>
      <div className="bg-black/50 border border-emerald-500/30 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-bold text-emerald-400 mb-3 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          The Mission
        </h3>
        <p className="text-slate-300">
          In the Matrix of React, <code className="text-emerald-400">useEffect</code> allows you to
          synchronize your component with external systems. But it needs to know what to watch—the
          dependency array.
        </p>
        <p className="text-slate-300 mt-3">
          Get it wrong, and you'll see glitches: stale closures, infinite loops, or effects that
          never run when they should.
        </p>
      </div>
    </div>
  );
}

function Chapter2() {
  const [brokenCount, setBrokenCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const brokenRunCount = useRef(0);
  const correctRunCount = useRef(0);

  // Broken: missing dependency
  useEffect(() => {
    brokenRunCount.current += 1;
    console.log("Broken effect running with stale count:", brokenCount);
  }, []); // Missing brokenCount in dependencies!

  // Correct: includes dependency
  useEffect(() => {
    correctRunCount.current += 1;
    console.log("Correct effect running with current count:", correctCount);
  }, [correctCount]);

  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        The first glitch appeared when Neo tried to track a changing value. He set up two counters,
        but one refused to see reality as it changed.
      </p>

      <p className="text-lg leading-relaxed">
        "This one's stuck in the past," Trinity observed, pointing at the broken counter. "It's
        seeing a snapshot of the count from when the component first mounted. A stale closure."
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-xl font-bold text-red-400">Broken: Missing Dependency</h3>
          </div>

          <div className="bg-black/50 rounded p-4 mb-4 font-mono text-sm">
            <div className="text-slate-500">useEffect(() =&gt; {"{"}</div>
            <div className="text-emerald-400 ml-4">console.log(count);</div>
            <div className="text-slate-500">{"}"}, []);</div>
            <div className="text-red-400 text-xs mt-2">// Missing count!</div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setBrokenCount((c) => c + 1)}
              className="w-full px-4 py-2 bg-red-500/20 text-red-400 rounded border border-red-500/50 hover:bg-red-500/30"
            >
              Increment: {brokenCount}
            </button>
            <div className="text-sm text-slate-400">
              Effect ran: {brokenRunCount.current} time(s)
            </div>
            <div className="text-xs text-red-400">
              Effect always sees count as: 0 (stale!)
            </div>
          </div>
        </div>

        <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-emerald-400">Correct: Proper Dependencies</h3>
          </div>

          <div className="bg-black/50 rounded p-4 mb-4 font-mono text-sm">
            <div className="text-slate-500">useEffect(() =&gt; {"{"}</div>
            <div className="text-emerald-400 ml-4">console.log(count);</div>
            <div className="text-slate-500">{"}"}, [count]);</div>
            <div className="text-emerald-400 text-xs mt-2">// Includes count!</div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setCorrectCount((c) => c + 1)}
              className="w-full px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/50 hover:bg-emerald-500/30"
            >
              Increment: {correctCount}
            </button>
            <div className="text-sm text-slate-400">
              Effect ran: {correctRunCount.current} time(s)
            </div>
            <div className="text-xs text-emerald-400">
              Effect always sees current count
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/50 border border-emerald-500/30 rounded-lg p-6 mt-6">
        <p className="text-emerald-400 font-semibold mb-2">The Lesson:</p>
        <p className="text-slate-300">
          When your effect uses a value that can change, you must include it in the dependency
          array. Otherwise, your effect captures the value from the first render and never sees
          updates—a stale closure.
        </p>
      </div>
    </div>
  );
}

function Chapter3() {
  const [oracleMessage, setOracleMessage] = useState("You are The One");
  const [brokenDisplay, setBrokenDisplay] = useState("");
  const [correctDisplay, setCorrectDisplay] = useState("");

  // Broken: ignores prop/state change
  useEffect(() => {
    setBrokenDisplay(`Oracle said: ${oracleMessage}`);
  }, []); // Should include oracleMessage!

  // Correct: watches the message
  useEffect(() => {
    setCorrectDisplay(`Oracle said: ${oracleMessage}`);
  }, [oracleMessage]);

  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        Neo met the Oracle in the Matrix. She spoke in riddles, and her words changed based on his
        choices. But one of his effects refused to listen to her updated prophecies.
      </p>

      <p className="text-lg leading-relaxed">
        "The Oracle's message keeps changing," Neo said, frustrated. "But this display shows the
        first thing she said. It's frozen in time."
      </p>

      <p className="text-lg leading-relaxed">
        "Because you didn't tell the effect to watch her message," Morpheus explained. "Props and
        state that your effect uses must be in the dependency array."
      </p>

      <div className="bg-black/50 border border-emerald-500/30 rounded-lg p-6 mt-8">
        <label className="block text-emerald-400 font-semibold mb-2">
          The Oracle's Message:
        </label>
        <input
          type="text"
          value={oracleMessage}
          onChange={(e) => setOracleMessage(e.target.value)}
          className="w-full px-4 py-2 bg-emerald-950/50 border border-emerald-500/30 rounded text-emerald-300 focus:outline-none focus:border-emerald-500"
          placeholder="Enter a prophecy..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-bold text-red-400">Broken Display</h3>
          </div>
          <div className="bg-black/50 rounded p-4 mb-4 font-mono text-sm">
            <div className="text-slate-500">useEffect(() =&gt; {"{"}</div>
            <div className="text-emerald-400 ml-4">setDisplay(message);</div>
            <div className="text-slate-500">{"}"}, []);</div>
          </div>
          <div className="text-slate-300 italic">"{brokenDisplay}"</div>
        </div>

        <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-emerald-400">Correct Display</h3>
          </div>
          <div className="bg-black/50 rounded p-4 mb-4 font-mono text-sm">
            <div className="text-slate-500">useEffect(() =&gt; {"{"}</div>
            <div className="text-emerald-400 ml-4">setDisplay(message);</div>
            <div className="text-slate-500">{"}"}, [message]);</div>
          </div>
          <div className="text-slate-300 italic">"{correctDisplay}"</div>
        </div>
      </div>

      <div className="bg-black/50 border border-emerald-500/30 rounded-lg p-6 mt-6">
        <p className="text-emerald-400 font-semibold mb-2">The Prophecy:</p>
        <p className="text-slate-300">
          All values from your component scope that are used inside the effect must be listed in
          the dependency array. This includes props, state, and derived values.
        </p>
      </div>
    </div>
  );
}

function Chapter4() {
  const [agentSpeed, setAgentSpeed] = useState(5);
  const [matrixLoad, setMatrixLoad] = useState(3);
  const [neoStrength, setNeoStrength] = useState(7);
  const [threatLevel, setThreatLevel] = useState("Calculating...");
  const effectRunCount = useRef(0);

  useEffect(() => {
    effectRunCount.current += 1;
    const threat = agentSpeed * matrixLoad - neoStrength;
    if (threat > 20) {
      setThreatLevel("CRITICAL - Evacuate!");
    } else if (threat > 10) {
      setThreatLevel("High - Proceed with caution");
    } else if (threat > 0) {
      setThreatLevel("Moderate - Manageable");
    } else {
      setThreatLevel("Low - Neo has the advantage");
    }
  }, [agentSpeed, matrixLoad, neoStrength]); // All dependencies included

  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        The Architect appeared before Neo in a room of infinite screens. "The Matrix is a system of
        multiple variables," he said coldly. "Your effects must account for all of them."
      </p>

      <p className="text-lg leading-relaxed">
        Neo watched as three parameters shifted: Agent speed, Matrix load, and his own strength.
        The threat level calculation depended on all three.
      </p>

      <div className="bg-black/50 border border-emerald-500/30 rounded-lg p-6 mt-8">
        <h3 className="text-xl font-bold text-emerald-400 mb-4">System Variables</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-2">
              Agent Speed: {agentSpeed}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={agentSpeed}
              onChange={(e) => setAgentSpeed(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">
              Matrix Load: {matrixLoad}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={matrixLoad}
              onChange={(e) => setMatrixLoad(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">
              Neo's Strength: {neoStrength}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={neoStrength}
              onChange={(e) => setNeoStrength(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-emerald-400">Threat Assessment</h3>
          <div className="text-xs text-slate-400">
            Effect runs: {effectRunCount.current}
          </div>
        </div>

        <div className="bg-black/50 rounded p-4 mb-4 font-mono text-sm">
          <div className="text-slate-500">useEffect(() =&gt; {"{"}</div>
          <div className="text-emerald-400 ml-4">const threat = speed * load - strength;</div>
          <div className="text-emerald-400 ml-4">setThreatLevel(calculate(threat));</div>
          <div className="text-slate-500">{"}"}, [speed, load, strength]);</div>
        </div>

        <div className="text-2xl font-bold text-emerald-400">{threatLevel}</div>
      </div>

      <div className="bg-black/50 border border-emerald-500/30 rounded-lg p-6">
        <p className="text-emerald-400 font-semibold mb-2">The Architecture:</p>
        <p className="text-slate-300">
          When your effect depends on multiple values, all of them must be in the dependency array.
          Change any one, and the effect will re-run to stay synchronized with reality.
        </p>
      </div>
    </div>
  );
}

function Chapter5() {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [withoutCleanupCount, setWithoutCleanupCount] = useState(0);

  // Correct: with cleanup
  useEffect(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          setIsTimerActive(false);
          return 10;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isTimerActive]);

  // Demonstration of no cleanup (memory leak)
  useEffect(() => {
    const leak = setInterval(() => {
      setWithoutCleanupCount((c) => c + 1);
    }, 1000);

    // No cleanup! This interval keeps running even after unmount
    // In a real app, this would be a memory leak
    return () => clearInterval(leak); // We actually clean up here to avoid real leaks
  }, []);

  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed">
        Neo finally understood. The Matrix wasn't just about running effects—it was about cleaning
        up after them. Subscriptions, timers, connections—they all needed to be released when the
        component unmounted.
      </p>

      <p className="text-lg leading-relaxed">
        "Return a cleanup function," Morpheus instructed. "It runs before the effect runs again,
        and when the component unmounts. It's how you prevent memory leaks and race conditions."
      </p>

      <div className="bg-black/50 border border-emerald-500/30 rounded-lg p-6 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xl font-bold text-emerald-400">Timer with Cleanup</h3>
        </div>

        <div className="bg-emerald-950/50 rounded p-4 mb-4 font-mono text-sm">
          <div className="text-slate-500">useEffect(() =&gt; {"{"}</div>
          <div className="text-emerald-400 ml-4">const id = setInterval(...);</div>
          <div className="text-slate-500 ml-4">return () =&gt; {"{"}</div>
          <div className="text-emerald-400 ml-8">clearInterval(id);</div>
          <div className="text-slate-500 ml-4">{"}"};</div>
          <div className="text-slate-500">{"}"}, [active]);</div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl font-bold text-emerald-400">
            {countdown}s
          </div>
          <button
            onClick={() => setIsTimerActive(!isTimerActive)}
            className={`px-6 py-2 rounded border transition-all ${
              isTimerActive
                ? "bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30"
                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/50 hover:bg-emerald-500/30"
            }`}
          >
            {isTimerActive ? "Stop" : "Start"} Timer
          </button>
        </div>

        <p className="text-xs text-slate-400">
          When you stop the timer, the cleanup function clears the interval. No memory leaks.
        </p>
      </div>

      <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <h3 className="text-lg font-bold text-red-400">Without Cleanup (Demo)</h3>
        </div>

        <p className="text-sm text-slate-300 mb-4">
          This counter demonstrates a background interval that would continue running even if the
          component unmounted. In production, this causes memory leaks.
        </p>

        <div className="text-2xl font-bold text-red-400">
          Leak counter: {withoutCleanupCount}
        </div>
      </div>

      <div className="bg-black/50 border border-emerald-500/30 rounded-lg p-6">
        <p className="text-emerald-400 font-semibold mb-2">The Resolution:</p>
        <p className="text-slate-300">
          Neo had mastered the dependency array. He knew when effects should run, what they should
          watch, and how to clean up after them. The Matrix was no longer a mystery—it was a system
          he could bend to his will.
        </p>
        <p className="text-slate-300 mt-3">
          Return a cleanup function from your effect whenever you set up subscriptions, timers,
          event listeners, or any resource that needs to be released. React will call this function
          before running the effect again and when the component unmounts.
        </p>
      </div>
    </div>
  );
}