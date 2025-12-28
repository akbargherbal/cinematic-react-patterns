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

  const chapters = useMemo(() => [
    {
      title: "The Architect's Revelation",
      key: "intro",
      concept: "Every component that mounts must eventually unmount"
    },
    {
      title: "The Two Doors",
      key: "build",
      concept: "useEffect cleanup functions are the 'right door'"
    },
    {
      title: "The Smith Virus",
      key: "climax",
      concept: "Side effects without cleanup multiply uncontrollably"
    },
    {
      title: "The Emergency Cleanup",
      key: "resolution",
      concept: "Cleanup debt must eventually be paid"
    },
    {
      title: "The Prophecy Was a Shutdown Script",
      key: "summary",
      concept: "Choose graceful shutdown over catastrophic failure"
    }
  ], []);

  // Right Door: Proper cleanup
  useEffect(() => {
    if (rightDoorMounted) {
      setRightDoorListeners(prev => prev + 1);
      
      return () => {
        setRightDoorListeners(prev => Math.max(0, prev - 1));
      };
    }
  }, [rightDoorMounted]);

  // Left Door: No cleanup (memory leak simulation)
  useEffect(() => {
    if (leftDoorMounted) {
      setLeftDoorListeners(prev => prev + 1);
      
      leftDoorTimerRef.current = setInterval(() => {
        // Simulating orphaned side effect
      }, 1000);
      
      // Intentionally no cleanup to demonstrate the problem
    }
  }, [leftDoorMounted]);

  // Smith replication effect
  useEffect(() => {
    if (smiths.length > 0 &amp;&amp; !cleanupEnabled) {
      const timer = setTimeout(() => {
        if (smiths.length < 50) {
          setSmiths(prev => [...prev, { id: Date.now(), timestamp: Date.now() }]);
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
    setSmiths(prev => [...prev, { id: Date.now(), timestamp: Date.now() }]);
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
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      {/* Matrix rain background effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 to-black"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-green-500/30">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Zap className="w-8 h-8 text-green-500" />
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">The Matrix Reloaded</h1>
              <p className="text-sm md:text-base text-green-400 mt-1">Neo's Choice, 2003 • useEffect Cleanup &amp; Component Lifecycle</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Chapter Title */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentChapter.title}</h2>
            <p className="text-green-500 text-sm md:text-base border-l-4 border-green-500 pl-4 py-2 bg-green-950/20">
              <strong>Core Concept:</strong> {currentChapter.concept}
            </p>
          </div>

          {/* Chapter-specific content */}
          {chapter === 0 &amp;&amp; (
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed mb-4">
                  The room is impossibly white. Not the white of paint or paper, but the white of absence—a void where color has been systematically removed. The Architect sits perfectly still, his presence like a system administrator overseeing the entire Matrix.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  "You are the eventuality of an anomaly," he says. "The function of the One is now to return to the Source."
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  This is not a philosophical statement. This is a <strong className="text-green-400">shutdown script</strong>. Every component that mounts must eventually unmount. The question is not whether Neo will terminate—the question is <strong className="text-green-400">how</strong>.
                </p>
              </div>

              <div className="bg-slate-950 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  The Component Lifecycle
                </h3>
                <div className="space-y-4">
                  <div className="bg-black/50 p-4 rounded border border-green-500/20">
                    <code className="text-green-400 text-sm">
                      <span className="text-slate-500">// Every component follows this cycle</span><br/>
                      <span className="text-blue-400">useEffect</span>(() =&gt; &#123;<br/>
                      &amp;nbsp;&amp;nbsp;<span className="text-slate-500">// Mount: Component initializes</span><br/>
                      &amp;nbsp;&amp;nbsp;<span className="text-purple-400">const</span> mission = <span className="text-yellow-400">initializeTheOne</span>();<br/>
                      <br/>
                      &amp;nbsp;&amp;nbsp;<span className="text-slate-500">// Unmount: Component must clean up</span><br/>
                      &amp;nbsp;&amp;nbsp;<span className="text-pink-400">return</span> () =&gt; &#123;<br/>
                      &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;mission.<span className="text-yellow-400">cleanup</span>();<br/>
                      &amp;nbsp;&amp;nbsp;&#125;;<br/>
                      &#125;, []);
                    </code>
                  </div>
                  <p className="text-slate-400 text-sm">
                    The Architect's revelation: Neo is not the hero. He is a <strong className="text-green-400">process</strong>. A component that was mounted with a specific purpose, and now that purpose is complete. The only question is whether he will execute the cleanup function gracefully.
                  </p>
                </div>
              </div>
            </div>
          )}

          {chapter === 1 &amp;&amp; (
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed mb-4">
                  "The door to your right leads to the Source, and the salvation of Zion. The door to your left leads back to the Matrix, to her, and to the end of your species."
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Two paths. Two ways to terminate. The right door is the cleanup function that every useEffect should return. The left door is the memory leak waiting to happen.
                </p>
              </div>

              <div className="bg-slate-950 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-500" />
                  The Two Doors Simulator
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Right Door */}
                  <div className="bg-green-950/20 border border-green-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-green-400">Right Door: Graceful Shutdown</h4>
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                    
                    <div className="bg-black/50 p-3 rounded mb-4 text-xs">
                      <code className="text-green-400">
                        <span className="text-blue-400">useEffect</span>(() =&gt; &#123;<br/>
                        &amp;nbsp;&amp;nbsp;<span className="text-purple-400">const</span> listener = ...;<br/>
                        &amp;nbsp;&amp;nbsp;<span className="text-pink-400">return</span> () =&gt; &#123;<br/>
                        &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;<span className="text-slate-500">// Cleanup!</span><br/>
                        &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;remove(listener);<br/>
                        &amp;nbsp;&amp;nbsp;&#125;;<br/>
                        &#125;);
                      </code>
                    </div>

                    <button
                      onClick={handleRightDoorToggle}
                      className={`w-full py-2 px-4 rounded font-bold transition-colors ${
                        rightDoorMounted
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-green-500 hover:bg-green-600 text-black'
                      }`}
                    >
                      {rightDoorMounted ? 'Unmount Component' : 'Mount Component'}
                    </button>

                    <div className="mt-4 p-3 bg-black/50 rounded">
                      <p className="text-sm text-slate-400 mb-2">Active Listeners:</p>
                      <p className="text-2xl font-bold text-green-400">{rightDoorListeners}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {rightDoorMounted ? '✓ Cleanup function will run on unmount' : 'Component unmounted cleanly'}
                      </p>
                    </div>
                  </div>

                  {/* Left Door */}
                  <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-red-400">Left Door: No Cleanup</h4>
                      <XCircle className="w-6 h-6 text-red-500" />
                    </div>
                    
                    <div className="bg-black/50 p-3 rounded mb-4 text-xs">
                      <code className="text-red-400">
                        <span className="text-blue-400">useEffect</span>(() =&gt; &#123;<br/>
                        &amp;nbsp;&amp;nbsp;<span className="text-purple-400">const</span> listener = ...;<br/>
                        &amp;nbsp;&amp;nbsp;<span className="text-slate-500">// No cleanup!</span><br/>
                        &amp;nbsp;&amp;nbsp;<span className="text-slate-500">// Memory leak</span><br/>
                        &#125;);
                      </code>
                    </div>

                    <button
                      onClick={handleLeftDoorToggle}
                      className={`w-full py-2 px-4 rounded font-bold transition-colors ${
                        leftDoorMounted
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      {leftDoorMounted ? 'Unmount Component' : 'Mount Component'}
                    </button>

                    <div className="mt-4 p-3 bg-black/50 rounded">
                      <p className="text-sm text-slate-400 mb-2">Orphaned Listeners:</p>
                      <p className="text-2xl font-bold text-red-400">{leftDoorListeners}</p>
                      <p className="text-xs text-red-500 mt-2">
                        {leftDoorListeners > 0 ? '⚠ Listeners persist after unmount!' : 'Mount to see the problem'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-950/20 border border-yellow-500/30 rounded">
                  <p className="text-sm text-yellow-400">
                    <strong>Notice:</strong> The right door properly cleans up when unmounted. The left door leaves listeners behind, accumulating with each mount/unmount cycle. This is the memory leak Neo's choice creates.
                  </p>
                </div>
              </div>
            </div>
          )}

          {chapter === 2 &amp;&amp; (
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed mb-4">
                  Neo saves Trinity. But the Architect was right: "Failure to comply with this process will result in a cataclysmic system crash."
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Agent Smith begins to replicate. Every time he touches someone, he copies himself. This is not a superpower—this is a <strong className="text-red-400">memory leak</strong>. When you don't remove event listeners, they pile up. When you don't cancel subscriptions, they keep running.
                </p>
              </div>

              <div className="bg-slate-950 border border-red-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  The Smith Replication Visualizer
                </h3>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-slate-400">Smith Copies:</p>
                      <p className="text-3xl font-bold text-red-400">{smiths.length}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSmithMount}
                        disabled={cleanupEnabled}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded font-bold transition-colors"
                      >
                        Mount Without Cleanup
                      </button>
                      <button
                        onClick={handleCleanupToggle}
                        className={`px-4 py-2 rounded font-bold transition-colors ${
                          cleanupEnabled
                            ? 'bg-green-500 hover:bg-green-600 text-black'
                            : 'bg-slate-700 hover:bg-slate-600 text-white'
                        }`}
                      >
                        {cleanupEnabled ? 'Cleanup Enabled ✓' : 'Enable Cleanup'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-black/50 rounded p-4 min-h-[200px] border border-red-500/20">
                    <div className="grid grid-cols-8 md:grid-cols-12 gap-2">
                      {smiths.map((smith, index) => (
                        <div
                          key={smith.id}
                          className="aspect-square bg-red-950 border border-red-500 rounded flex items-center justify-center animate-pulse"
                          style={{
                            animationDelay: `${index * 50}ms`
                          }}
                        >
                          <User className="w-4 h-4 text-red-400" />
                        </div>
                      ))}
                    </div>
                    {smiths.length === 0 &amp;&amp; (
                      <div className="flex items-center justify-center h-full text-slate-500">
                        Click "Mount Without Cleanup" to see Smith replicate
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-black/50 p-4 rounded mb-4 text-xs">
                  <code className="text-red-400">
                    <span className="text-blue-400">useEffect</span>(() =&gt; &#123;<br/>
                    &amp;nbsp;&amp;nbsp;<span className="text-purple-400">const</span> smithEffect = <span className="text-yellow-400">createSmithCopy</span>();<br/>
                    &amp;nbsp;&amp;nbsp;<span className="text-slate-500">// Each Smith creates more Smiths</span><br/>
                    &amp;nbsp;&amp;nbsp;<span className="text-slate-500">// No cleanup, so they all persist</span><br/>
                    &amp;nbsp;&amp;nbsp;smithEffect.<span className="text-yellow-400">replicate</span>();<br/>
                    &#125;, []);
                  </code>
                </div>

                <div className="p-4 bg-red-950/20 border border-red-500/30 rounded">
                  <p className="text-sm text-red-400">
                    <strong>The Consequence:</strong> Without cleanup, side effects multiply exponentially. Each orphaned listener creates more orphaned listeners. This is the Agent Smith virus—the cascading failure that results from refusing to execute the shutdown script.
                  </p>
                </div>
              </div>
            </div>
          )}

          {chapter === 3 &amp;&amp; (
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed mb-4">
                  Neo lets Smith absorb him. This is not surrender—this is a <strong className="text-green-400">forced unmount</strong>. By allowing himself to be destroyed, Neo triggers the cleanup function that should have run when he chose the left door.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  The moment Smith absorbs Neo, every Smith copy begins to dissolve. All at once. Because they're all the same orphaned side effect, and when you finally remove the root listener, all the duplicates disappear with it.
                </p>
              </div>

              <div className="bg-slate-950 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">Emergency Cleanup Pattern</h3>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-950/20 border border-green-500/30 rounded p-4">
                      <h4 className="text-green-400 font-bold mb-2">Graceful (Right Door)</h4>
                      <div className="bg-black/50 p-3 rounded text-xs">
                        <code className="text-green-400">
                          <span className="text-blue-400">useEffect</span>(() =&gt; &#123;<br/>
                          &amp;nbsp;&amp;nbsp;<span className="text-purple-400">const</span> effect = ...;<br/>
                          &amp;nbsp;&amp;nbsp;<span className="text-pink-400">return</span> () =&gt; &#123;<br/>
                          &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;effect.<span className="text-yellow-400">cleanup</span>();<br/>
                          &amp;nbsp;&amp;nbsp;&#125;;<br/>
                          &#125;);
                        </code>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">✓ Cleanup on schedule</p>
                    </div>

                    <div className="bg-red-950/20 border border-red-500/30 rounded p-4">
                      <h4 className="text-red-400 font-bold mb-2">Emergency (Neo's Path)</h4>
                      <div className="bg-black/50 p-3 rounded text-xs">
                        <code className="text-red-400">
                          <span className="text-blue-400">useEffect</span>(() =&gt; &#123;<br/>
                          &amp;nbsp;&amp;nbsp;<span className="text-purple-400">const</span> effect = ...;<br/>
                          &amp;nbsp;&amp;nbsp;<span className="text-slate-500">// No cleanup</span><br/>
                          &#125;);<br/>
                          <br/>
                          <span className="text-slate-500">// Later: forced cleanup</span><br/>
                          <span className="text-yellow-400">forceUnmount</span>();
                        </code>
                      </div>
                      <p className="text-xs text-red-400 mt-2">⚠ Delayed, expensive</p>
                    </div>
                  </div>

                  {leftDoorListeners > 0 &amp;&amp; (
                    <div className="bg-red-950/20 border border-red-500/30 rounded p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-red-400 font-bold">System Unstable</p>
                          <p className="text-sm text-slate-400">{leftDoorListeners} orphaned listeners detected</p>
                        </div>
                        <button
                          onClick={handleEmergencyCleanup}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-bold transition-colors"
                        >
                          Emergency Cleanup
                        </button>
                      </div>
                      <p className="text-xs text-slate-400">
                        Click to force cleanup of all orphaned side effects. This is expensive and should be avoided by using proper cleanup functions.
                      </p>
                    </div>
                  )}

                  <div className="p-4 bg-yellow-950/20 border border-yellow-500/30 rounded">
                    <p className="text-sm text-yellow-400">
                      <strong>The Cost:</strong> Neo sacrifices himself to trigger cleanup. In code terms, this is destroying the entire component tree to force unmount. Much more expensive than graceful shutdown. The lesson: execute cleanup when you should, not when you're forced to.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {chapter === 4 &amp;&amp; (
            <div className="space-y-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed mb-4">
                  "Everything that has a beginning has an end, Neo." The Oracle's wisdom is the fundamental law of component lifecycle. You cannot escape it. You can only choose whether the end is graceful or catastrophic.
                </p>
              </div>

              <div className="bg-slate-950 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-6">The Three Paths</h3>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-green-950/20 border border-green-500/30 rounded p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h4 className="font-bold text-green-400">Right Door</h4>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li>✓ Return cleanup function</li>
                      <li>✓ Remove listeners on unmount</li>
                      <li>✓ Cancel subscriptions</li>
                      <li>✓ Clear timers</li>
                      <li>✓ System stable</li>
                    </ul>
                  </div>

                  <div className="bg-red-950/20 border border-red-500/30 rounded p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <h4 className="font-bold text-red-400">Left Door</h4>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li>✗ No cleanup function</li>
                      <li>✗ Listeners persist</li>
                      <li>✗ Memory leaks</li>
                      <li>✗ Performance degrades</li>
                      <li>✗ System crashes</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-950/20 border border-yellow-500/30 rounded p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <h4 className="font-bold text-yellow-400">Neo's Path</h4>
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li>⚠ Delayed cleanup</li>
                      <li>⚠ Side effects multiply</li>
                      <li>⚠ System unstable</li>
                      <li>⚠ Forced cleanup required</li>
                      <li>⚠ High cost</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-black/50 p-4 rounded mb-6">
                  <h4 className="text-white font-bold mb-3">Best Practices Checklist</h4>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2 text-slate-300">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Every useEffect with side effects returns a cleanup function</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Event listeners are removed on unmount</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Timers and intervals are cleared</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Subscriptions are cancelled</span>
                    </label>
                    <label className="flex items-center gap-2 text-slate-300">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>API requests are aborted if component unmounts</span>
                    </label>
                  </div>
                </div>

                <div className="bg-green-950/20 border border-green-500/30 rounded p-4">
                  <h4 className="text-green-400 font-bold mb-2">The Golden Rule</h4>
                  <p className="text-slate-300 text-sm mb-3">
                    If your useEffect creates a side effect (listener, timer, subscription), it must return a cleanup function. No exceptions.
                  </p>
                  <div className="bg-black/50 p-3 rounded text-xs">
                    <code className="text-green-400">
                      <span className="text-blue-400">useEffect</span>(() =&gt; &#123;<br/>
                      &amp;nbsp;&amp;nbsp;<span className="text-purple-400">const</span> subscription = api.<span className="text-yellow-400">subscribe</span>();<br/>
                      &amp;nbsp;&amp;nbsp;<span className="text-purple-400">const</span> timer = <span className="text-yellow-400">setInterval</span>(update, 1000);<br/>
                      &amp;nbsp;&amp;nbsp;window.<span className="text-yellow-400">addEventListener</span>(<span className="text-orange-400">'resize'</span>, handler);<br/>
                      <br/>
                      &amp;nbsp;&amp;nbsp;<span className="text-pink-400">return</span> () =&gt; &#123;<br/>
                      &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;subscription.<span className="text-yellow-400">unsubscribe</span>();<br/>
                      &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;<span className="text-yellow-400">clearInterval</span>(timer);<br/>
                      &amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;window.<span className="text-yellow-400">removeEventListener</span>(<span className="text-orange-400">'resize'</span>, handler);<br/>
                      &amp;nbsp;&amp;nbsp;&#125;;<br/>
                      &#125;, []);
                    </code>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Key Takeaways</h3>
                <ul className="space-y-3 text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">1.</span>
                    <span>Every component that mounts must eventually unmount. This is not negotiable.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">2.</span>
                    <span>The cleanup function is your "right door"—the graceful shutdown path.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">3.</span>
                    <span>Skipping cleanup creates memory leaks that multiply like Agent Smith.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">4.</span>
                    <span>You can delay cleanup, but you cannot avoid it. The bill always comes due.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 font-bold">5.</span>
                    <span>Choose graceful shutdown over catastrophic failure. Return that cleanup function.</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-t border-green-500/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setChapter(c => c - 1)}
              disabled={chapter === 0}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-black disabled:text-slate-500 rounded font-bold transition-colors"
            >
              ← Previous
            </button>
            
            <div className="text-center">
              <p className="text-sm text-slate-400">Chapter {chapter + 1} of {chapters.length}</p>
              <p className="text-xs text-green-500 mt-1">{currentChapter.title}</p>
            </div>
            
            <button
              onClick={() => setChapter(c => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-black disabled:text-slate-500 rounded font-bold transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}