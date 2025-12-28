import { useState, useEffect, useRef, useMemo } from "react";
import { Zap, AlertTriangle, CheckCircle, XCircle, User } from "lucide-react";

interface SmithAvatar {
  id: number;
  timestamp: number;
}

export default function MatrixReloadedSystemExit() {
  const [chapter, setChapter] = useState(0);
  const [rightDoorMounted, setRightDoorMounted] = useState(false);
  const [leftDoorMounted, setLeftDoorMounted] = useState(false);
  const [rightDoorListeners, setRightDoorListeners] = useState(0);
  const [leftDoorListeners, setLeftDoorListeners] = useState(0);
  const [smiths, setSmiths] = useState<SmithAvatar[]>([]);
  const [cleanupEnabled, setCleanupEnabled] = useState(false);
  const leftDoorTimerRef = useRef<NodeJS.Timeout | null>(null);

  const chapters = useMemo(
    () => [
      {
        title: "The Architect's Revelation",
        key: "intro",
        concept: "Every component that mounts must eventually unmount",
      },
      {
        title: "The Two Doors",
        key: "build",
        concept: "useEffect cleanup functions are the 'right door'",
      },
      {
        title: "The Smith Virus",
        key: "climax",
        concept: "Side effects without cleanup multiply uncontrollably",
      },
      {
        title: "The Emergency Cleanup",
        key: "resolution",
        concept: "Cleanup debt must eventually be paid",
      },
      {
        title: "The Prophecy Was a Shutdown Script",
        key: "summary",
        concept: "Choose graceful shutdown over catastrophic failure",
      },
    ],
    [],
  );

  // Right Door: Proper cleanup
  useEffect(() => {
    if (rightDoorMounted) {
      setRightDoorListeners((prev) => prev + 1);

      return () => {
        setRightDoorListeners((prev) => Math.max(0, prev - 1));
      };
    }
  }, [rightDoorMounted]);

  // Left Door: No cleanup (memory leak simulation)
  useEffect(() => {
    if (leftDoorMounted) {
      setLeftDoorListeners((prev) => prev + 1);

      leftDoorTimerRef.current = setInterval(() => {
        // Simulating orphaned side effect
      }, 1000);

      // Intentionally no cleanup to demonstrate the problem
    }
  }, [leftDoorMounted]);

  // Smith replication effect
  useEffect(() => {
    if (smiths.length > 0 && !cleanupEnabled) {
      const timer = setTimeout(() => {
        if (smiths.length < 50) {
          setSmiths((prev) => [
            ...prev,
            { id: Date.now(), timestamp: Date.now() },
          ]);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [smiths, cleanupEnabled]);

  const handleRightDoorToggle = () => {
    setRightDoorMounted(!rightDoorMounted);
  };

  const handleLeftDoorToggle = () => {
    setLeftDoorMounted(!leftDoorMounted);
  };

  const handleSmithMount = () => {
    setSmiths((prev) => [...prev, { id: Date.now(), timestamp: Date.now() }]);
  };

  const handleCleanupToggle = () => {
    setCleanupEnabled(!cleanupEnabled);
    if (!cleanupEnabled) {
      setSmiths([]);
    }
  };

  const handleEmergencyCleanup = () => {
    setSmiths([]);
    setLeftDoorListeners(0);
    setLeftDoorMounted(false);
    if (leftDoorTimerRef.current) {
      clearInterval(leftDoorTimerRef.current);
      leftDoorTimerRef.current = null;
    }
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="relative min-h-screen overflow-hidden bg-black font-mono text-green-400">
      {/* Matrix rain background effect */}
      <div className="pointer-events-none fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 to-black"></div>
      </div>

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-green-500/30 bg-black/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center gap-4">
            <Zap className="h-8 w-8 text-green-500" />
            <div>
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                The Matrix Reloaded
              </h1>
              <p className="mt-1 text-sm text-green-400 md:text-base">
                Neo's Choice, 2003 • useEffect Cleanup & Component Lifecycle
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-32 pt-32">
        <div className="mx-auto max-w-7xl">
          {/* Chapter Title */}
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
              {currentChapter.title}
            </h2>
            <p className="border-l-4 border-green-500 bg-green-950/20 py-2 pl-4 text-sm text-green-500 md:text-base">
              <strong>Core Concept:</strong> {currentChapter.concept}
            </p>
          </div>

          {/* Chapter-specific content */}
          {chapter === 0 && (
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="mb-4 leading-relaxed text-slate-300">
                  The room is impossibly white. Not the white of paint or paper,
                  but the white of absence—a void where color has been
                  systematically removed. The Architect sits perfectly still,
                  his presence like a system administrator overseeing the entire
                  Matrix.
                </p>
                <p className="mb-4 leading-relaxed text-slate-300">
                  "You are the eventuality of an anomaly," he says. "The
                  function of the One is now to return to the Source."
                </p>
                <p className="mb-4 leading-relaxed text-slate-300">
                  This is not a philosophical statement. This is a{" "}
                  <strong className="text-green-400">shutdown script</strong>.
                  Every component that mounts must eventually unmount. The
                  question is not whether Neo will terminate—the question is{" "}
                  <strong className="text-green-400">how</strong>.
                </p>
              </div>

              <div className="rounded-lg border border-green-500/30 bg-slate-950 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  The Component Lifecycle
                </h3>
                <div className="space-y-4">
                  <div className="rounded border border-green-500/20 bg-black/50 p-4">
                    <code className="text-sm text-green-400">
                      <span className="text-slate-500">
                        // Every component follows this cycle
                      </span>
                      <br />
                      <span className="text-blue-400">useEffect</span>(() =&gt;
                      &#123;
                      <br />
                      &nbsp;&nbsp;
                      <span className="text-slate-500">
                        // Mount: Component initializes
                      </span>
                      <br />
                      &nbsp;&nbsp;<span className="text-purple-400">
                        const
                      </span>{" "}
                      mission ={" "}
                      <span className="text-yellow-400">initializeTheOne</span>
                      ();
                      <br />
                      <br />
                      &nbsp;&nbsp;
                      <span className="text-slate-500">
                        // Unmount: Component must clean up
                      </span>
                      <br />
                      &nbsp;&nbsp;<span className="text-pink-400">
                        return
                      </span>{" "}
                      () =&gt; &#123;
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;mission.
                      <span className="text-yellow-400">cleanup</span>();
                      <br />
                      &nbsp;&nbsp;&#125;;
                      <br />
                      &#125;, []);
                    </code>
                  </div>
                  <p className="text-sm text-slate-400">
                    The Architect's revelation: Neo is not the hero. He is a{" "}
                    <strong className="text-green-400">process</strong>. A
                    component that was mounted with a specific purpose, and now
                    that purpose is complete. The only question is whether he
                    will execute the cleanup function gracefully.
                  </p>
                </div>
              </div>
            </div>
          )}

          {chapter === 1 && (
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="mb-4 leading-relaxed text-slate-300">
                  "The door to your right leads to the Source, and the salvation
                  of Zion. The door to your left leads back to the Matrix, to
                  her, and to the end of your species."
                </p>
                <p className="mb-4 leading-relaxed text-slate-300">
                  Two paths. Two ways to terminate. The right door is the
                  cleanup function that every useEffect should return. The left
                  door is the memory leak waiting to happen.
                </p>
              </div>

              <div className="rounded-lg border border-green-500/30 bg-slate-950 p-6">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                  <Zap className="h-5 w-5 text-green-500" />
                  The Two Doors Simulator
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Right Door */}
                  <div className="rounded-lg border border-green-500/30 bg-green-950/20 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="text-lg font-bold text-green-400">
                        Right Door: Graceful Shutdown
                      </h4>
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>

                    <div className="mb-4 rounded bg-black/50 p-3 text-xs">
                      <code className="text-green-400">
                        <span className="text-blue-400">useEffect</span>(()
                        =&gt; &#123;
                        <br />
                        &nbsp;&nbsp;
                        <span className="text-purple-400">const</span> listener
                        = ...;
                        <br />
                        &nbsp;&nbsp;
                        <span className="text-pink-400">return</span> () =&gt;
                        &#123;
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="text-slate-500">// Cleanup!</span>
                        <br />
                        &nbsp;&nbsp;&nbsp;&nbsp;remove(listener);
                        <br />
                        &nbsp;&nbsp;&#125;;
                        <br />
                        &#125;);
                      </code>
                    </div>

                    <button
                      onClick={handleRightDoorToggle}
                      className={`w-full rounded px-4 py-2 font-bold transition-colors ${
                        rightDoorMounted
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-black hover:bg-green-600"
                      }`}
                    >
                      {rightDoorMounted
                        ? "Unmount Component"
                        : "Mount Component"}
                    </button>

                    <div className="mt-4 rounded bg-black/50 p-3">
                      <p className="mb-2 text-sm text-slate-400">
                        Active Listeners:
                      </p>
                      <p className="text-2xl font-bold text-green-400">
                        {rightDoorListeners}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        {rightDoorMounted
                          ? "✓ Cleanup function will run on unmount"
                          : "Component unmounted cleanly"}
                      </p>
                    </div>
                  </div>

                  {/* Left Door */}
                  <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="text-lg font-bold text-red-400">
                        Left Door: No Cleanup
                      </h4>
                      <XCircle className="h-6 w-6 text-red-500" />
                    </div>

                    <div className="mb-4 rounded bg-black/50 p-3 text-xs">
                      <code className="text-red-400">
                        <span className="text-blue-400">useEffect</span>(()
                        =&gt; &#123;
                        <br />
                        &nbsp;&nbsp;
                        <span className="text-purple-400">const</span> listener
                        = ...;
                        <br />
                        &nbsp;&nbsp;
                        <span className="text-slate-500">// No cleanup!</span>
                        <br />
                        &nbsp;&nbsp;
                        <span className="text-slate-500">// Memory leak</span>
                        <br />
                        &#125;);
                      </code>
                    </div>

                    <button
                      onClick={handleLeftDoorToggle}
                      className={`w-full rounded px-4 py-2 font-bold transition-colors ${
                        leftDoorMounted
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                    >
                      {leftDoorMounted
                        ? "Unmount Component"
                        : "Mount Component"}
                    </button>

                    <div className="mt-4 rounded bg-black/50 p-3">
                      <p className="mb-2 text-sm text-slate-400">
                        Orphaned Listeners:
                      </p>
                      <p className="text-2xl font-bold text-red-400">
                        {leftDoorListeners}
                      </p>
                      <p className="mt-2 text-xs text-red-500">
                        {leftDoorListeners > 0
                          ? "⚠ Listeners persist after unmount!"
                          : "Mount to see the problem"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded border border-yellow-500/30 bg-yellow-950/20 p-4">
                  <p className="text-sm text-yellow-400">
                    <strong>Notice:</strong> The right door properly cleans up
                    when unmounted. The left door leaves listeners behind,
                    accumulating with each mount/unmount cycle. This is the
                    memory leak Neo's choice creates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {chapter === 2 && (
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="mb-4 leading-relaxed text-slate-300">
                  Neo saves Trinity. But the Architect was right: "Failure to
                  comply with this process will result in a cataclysmic system
                  crash."
                </p>
                <p className="mb-4 leading-relaxed text-slate-300">
                  Agent Smith begins to replicate. Every time he touches
                  someone, he copies himself. This is not a superpower—this is a{" "}
                  <strong className="text-red-400">memory leak</strong>. When
                  you don't remove event listeners, they pile up. When you don't
                  cancel subscriptions, they keep running.
                </p>
              </div>

              <div className="rounded-lg border border-red-500/30 bg-slate-950 p-6">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  The Smith Replication Visualizer
                </h3>

                <div className="mb-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Smith Copies:</p>
                      <p className="text-3xl font-bold text-red-400">
                        {smiths.length}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSmithMount}
                        disabled={cleanupEnabled}
                        className="rounded bg-red-500 px-4 py-2 font-bold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-slate-700"
                      >
                        Mount Without Cleanup
                      </button>
                      <button
                        onClick={handleCleanupToggle}
                        className={`rounded px-4 py-2 font-bold transition-colors ${
                          cleanupEnabled
                            ? "bg-green-500 text-black hover:bg-green-600"
                            : "bg-slate-700 text-white hover:bg-slate-600"
                        }`}
                      >
                        {cleanupEnabled
                          ? "Cleanup Enabled ✓"
                          : "Enable Cleanup"}
                      </button>
                    </div>
                  </div>

                  <div className="min-h-[200px] rounded border border-red-500/20 bg-black/50 p-4">
                    <div className="grid grid-cols-8 gap-2 md:grid-cols-12">
                      {smiths.map((smith, index) => (
                        <div
                          key={smith.id}
                          className="flex aspect-square animate-pulse items-center justify-center rounded border border-red-500 bg-red-950"
                          style={{
                            animationDelay: `${index * 50}ms`,
                          }}
                        >
                          <User className="h-4 w-4 text-red-400" />
                        </div>
                      ))}
                    </div>
                    {smiths.length === 0 && (
                      <div className="flex h-full items-center justify-center text-slate-500">
                        Click "Mount Without Cleanup" to see Smith replicate
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4 rounded bg-black/50 p-4 text-xs">
                  <code className="text-red-400">
                    <span className="text-blue-400">useEffect</span>(() =&gt;
                    &#123;
                    <br />
                    &nbsp;&nbsp;<span className="text-purple-400">
                      const
                    </span>{" "}
                    smithEffect ={" "}
                    <span className="text-yellow-400">createSmithCopy</span>();
                    <br />
                    &nbsp;&nbsp;
                    <span className="text-slate-500">
                      // Each Smith creates more Smiths
                    </span>
                    <br />
                    &nbsp;&nbsp;
                    <span className="text-slate-500">
                      // No cleanup, so they all persist
                    </span>
                    <br />
                    &nbsp;&nbsp;smithEffect.
                    <span className="text-yellow-400">replicate</span>();
                    <br />
                    &#125;, []);
                  </code>
                </div>

                <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                  <p className="text-sm text-red-400">
                    <strong>The Consequence:</strong> Without cleanup, side
                    effects multiply exponentially. Each orphaned listener
                    creates more orphaned listeners. This is the Agent Smith
                    virus—the cascading failure that results from refusing to
                    execute the shutdown script.
                  </p>
                </div>
              </div>
            </div>
          )}

          {chapter === 3 && (
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="mb-4 leading-relaxed text-slate-300">
                  Neo lets Smith absorb him. This is not surrender—this is a{" "}
                  <strong className="text-green-400">forced unmount</strong>. By
                  allowing himself to be destroyed, Neo triggers the cleanup
                  function that should have run when he chose the left door.
                </p>
                <p className="mb-4 leading-relaxed text-slate-300">
                  The moment Smith absorbs Neo, every Smith copy begins to
                  dissolve. All at once. Because they're all the same orphaned
                  side effect, and when you finally remove the root listener,
                  all the duplicates disappear with it.
                </p>
              </div>

              <div className="rounded-lg border border-green-500/30 bg-slate-950 p-6">
                <h3 className="mb-6 text-xl font-bold text-white">
                  Emergency Cleanup Pattern
                </h3>

                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded border border-green-500/30 bg-green-950/20 p-4">
                      <h4 className="mb-2 font-bold text-green-400">
                        Graceful (Right Door)
                      </h4>
                      <div className="rounded bg-black/50 p-3 text-xs">
                        <code className="text-green-400">
                          <span className="text-blue-400">useEffect</span>(()
                          =&gt; &#123;
                          <br />
                          &nbsp;&nbsp;
                          <span className="text-purple-400">const</span> effect
                          = ...;
                          <br />
                          &nbsp;&nbsp;
                          <span className="text-pink-400">return</span> () =&gt;
                          &#123;
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;effect.
                          <span className="text-yellow-400">cleanup</span>();
                          <br />
                          &nbsp;&nbsp;&#125;;
                          <br />
                          &#125;);
                        </code>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">
                        ✓ Cleanup on schedule
                      </p>
                    </div>

                    <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                      <h4 className="mb-2 font-bold text-red-400">
                        Emergency (Neo's Path)
                      </h4>
                      <div className="rounded bg-black/50 p-3 text-xs">
                        <code className="text-red-400">
                          <span className="text-blue-400">useEffect</span>(()
                          =&gt; &#123;
                          <br />
                          &nbsp;&nbsp;
                          <span className="text-purple-400">const</span> effect
                          = ...;
                          <br />
                          &nbsp;&nbsp;
                          <span className="text-slate-500">// No cleanup</span>
                          <br />
                          &#125;);
                          <br />
                          <br />
                          <span className="text-slate-500">
                            // Later: forced cleanup
                          </span>
                          <br />
                          <span className="text-yellow-400">forceUnmount</span>
                          ();
                        </code>
                      </div>
                      <p className="mt-2 text-xs text-red-400">
                        ⚠ Delayed, expensive
                      </p>
                    </div>
                  </div>

                  {leftDoorListeners > 0 && (
                    <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-red-400">
                            System Unstable
                          </p>
                          <p className="text-sm text-slate-400">
                            {leftDoorListeners} orphaned listeners detected
                          </p>
                        </div>
                        <button
                          onClick={handleEmergencyCleanup}
                          className="rounded bg-red-500 px-4 py-2 font-bold text-white transition-colors hover:bg-red-600"
                        >
                          Emergency Cleanup
                        </button>
                      </div>
                      <p className="text-xs text-slate-400">
                        Click to force cleanup of all orphaned side effects.
                        This is expensive and should be avoided by using proper
                        cleanup functions.
                      </p>
                    </div>
                  )}

                  <div className="rounded border border-yellow-500/30 bg-yellow-950/20 p-4">
                    <p className="text-sm text-yellow-400">
                      <strong>The Cost:</strong> Neo sacrifices himself to
                      trigger cleanup. In code terms, this is destroying the
                      entire component tree to force unmount. Much more
                      expensive than graceful shutdown. The lesson: execute
                      cleanup when you should, not when you're forced to.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {chapter === 4 && (
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="mb-4 leading-relaxed text-slate-300">
                  "Everything that has a beginning has an end, Neo." The
                  Oracle's wisdom is the fundamental law of component lifecycle.
                  You cannot escape it. You can only choose whether the end is
                  graceful or catastrophic.
                </p>
              </div>

              <div className="rounded-lg border border-green-500/30 bg-slate-950 p-6">
                <h3 className="mb-6 text-xl font-bold text-white">
                  The Three Paths
                </h3>

                <div className="mb-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded border border-green-500/30 bg-green-950/20 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <h4 className="font-bold text-green-400">Right Door</h4>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      <li>✓ Return cleanup function</li>
                      <li>✓ Remove listeners on unmount</li>
                      <li>✓ Cancel subscriptions</li>
                      <li>✓ Clear timers</li>
                      <li>✓ System stable</li>
                    </ul>
                  </div>

                  <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <h4 className="font-bold text-red-400">Left Door</h4>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      <li>✗ No cleanup function</li>
                      <li>✗ Listeners persist</li>
                      <li>✗ Memory leaks</li>
                      <li>✗ Performance degrades</li>
                      <li>✗ System crashes</li>
                    </ul>
                  </div>

                  <div className="rounded border border-yellow-500/30 bg-yellow-950/20 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <h4 className="font-bold text-yellow-400">Neo's Path</h4>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      <li>⚠ Delayed cleanup</li>
                      <li>⚠ Side effects multiply</li>
                      <li>⚠ System unstable</li>
                      <li>⚠ Forced cleanup required</li>
                      <li>⚠ High cost</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-6 rounded bg-black/50 p-4">
                  <h4 className="mb-3 font-bold text-white">
                    Best Practices Checklist
                  </h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2 text-slate-300">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        defaultChecked
                      />
                      <span>
                        Every useEffect with side effects returns a cleanup
                        function
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        defaultChecked
                      />
                      <span>Event listeners are removed on unmount</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        defaultChecked
                      />
                      <span>Timers and intervals are cleared</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        defaultChecked
                      />
                      <span>Subscriptions are cancelled</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300">
                      <input
                        type="checkbox"
                        className="h-4 w-4"
                        defaultChecked
                      />
                      <span>
                        API requests are aborted if component unmounts
                      </span>
                    </label>
                  </div>
                </div>

                <div className="rounded border border-green-500/30 bg-green-950/20 p-4">
                  <h4 className="mb-2 font-bold text-green-400">
                    The Golden Rule
                  </h4>
                  <p className="mb-3 text-sm text-slate-300">
                    If your useEffect creates a side effect (listener, timer,
                    subscription), it must return a cleanup function. No
                    exceptions.
                  </p>
                  <div className="rounded bg-black/50 p-3 text-xs">
                    <code className="text-green-400">
                      <span className="text-blue-400">useEffect</span>(() =&gt;
                      &#123;
                      <br />
                      &nbsp;&nbsp;<span className="text-purple-400">
                        const
                      </span>{" "}
                      subscription = api.
                      <span className="text-yellow-400">subscribe</span>();
                      <br />
                      &nbsp;&nbsp;<span className="text-purple-400">
                        const
                      </span>{" "}
                      timer ={" "}
                      <span className="text-yellow-400">setInterval</span>
                      (update, 1000);
                      <br />
                      &nbsp;&nbsp;window.
                      <span className="text-yellow-400">addEventListener</span>(
                      <span className="text-orange-400">'resize'</span>,
                      handler);
                      <br />
                      <br />
                      &nbsp;&nbsp;<span className="text-pink-400">
                        return
                      </span>{" "}
                      () =&gt; &#123;
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;subscription.
                      <span className="text-yellow-400">unsubscribe</span>();
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <span className="text-yellow-400">clearInterval</span>
                      (timer);
                      <br />
                      &nbsp;&nbsp;&nbsp;&nbsp;window.
                      <span className="text-yellow-400">
                        removeEventListener
                      </span>
                      (<span className="text-orange-400">'resize'</span>,
                      handler);
                      <br />
                      &nbsp;&nbsp;&#125;;
                      <br />
                      &#125;, []);
                    </code>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-green-500/30 bg-slate-950 p-6">
                <h3 className="mb-4 text-xl font-bold text-white">
                  Key Takeaways
                </h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-green-500">1.</span>
                    <span>
                      Every component that mounts must eventually unmount. This
                      is not negotiable.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-green-500">2.</span>
                    <span>
                      The cleanup function is your "right door"—the graceful
                      shutdown path.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-green-500">3.</span>
                    <span>
                      Skipping cleanup creates memory leaks that multiply like
                      Agent Smith.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-green-500">4.</span>
                    <span>
                      You can delay cleanup, but you cannot avoid it. The bill
                      always comes due.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-green-500">5.</span>
                    <span>
                      Choose graceful shutdown over catastrophic failure. Return
                      that cleanup function.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-green-500/30 bg-black/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="rounded bg-green-500 px-6 py-2 font-bold text-black transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
            >
              ← Previous
            </button>

            <div className="text-center">
              <p className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </p>
              <p className="mt-1 text-xs text-green-500">
                {currentChapter.title}
              </p>
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="rounded bg-green-500 px-6 py-2 font-bold text-black transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
            >
              Next →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
