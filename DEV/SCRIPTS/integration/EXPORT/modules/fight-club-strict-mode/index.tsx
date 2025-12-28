import { useState, useEffect, useRef, useCallback } from "react";
import { Flame, Zap, AlertTriangle, CheckCircle, Code, Play, Pause, RotateCcw } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

const chapters: Chapter[] = [
  {
    id: "intro",
    title: "The First Rule",
    content: `You are the Narrator. You write React components in a beige, IKEA-catalog existence. Your effects run once. Your state updates predictably. You attend support groups for insomnia—useEffect hooks that won't let you sleep because you can't figure out why they're firing twice.

Then you meet Tyler Durden.

He appears in your codebase wrapped around your <App /> component like a leather jacket that smells of gasoline and possibility.

"What is this?" you ask.

Tyler grins. "This is development mode. And in development mode, I run your effects twice."

You blink. "Twice?"

"Mount. Unmount. Mount again. Immediately." He lights a cigarette. "Just to see if you're pure."

You think he's joking. You write a simple effect. You expect to see "Effect ran" once. You see it twice.

"I didn't write it twice," you protest.

Tyler exhales smoke. "But I ran it twice. Welcome to Project Mayhem."

You don't understand yet. You think this is a bug. You think Tyler is chaos. You don't realize he's the only thing standing between you and production disaster.

The first rule of StrictMode is: your effects will run twice in development.

The second rule of StrictMode is: your effects will run twice in development.

You're about to learn why.`,
  },
  {
    id: "build",
    title: "Welcome to Project Mayhem",
    content: `Tyler takes you to the basement—the development environment where the real work happens. Here, the rules are different. Here, Tyler has power.

"Show me your effects," he says.

You show him a component that subscribes to a WebSocket. Tyler nods slowly. "Run it."

The component mounts. The WebSocket connects. Console logs appear. Then—

The component unmounts. Immediately. Then mounts again.

Two WebSocket connections. Both active. Both sending messages.

"What the hell?" you say.

"I unmounted your component," Tyler says calmly. "Then I mounted it again. This is what I do. This is Project Mayhem."

"But why?"

"Because in production, components unmount all the time. User navigates away. Route changes. Parent re-renders. And if you don't clean up your effects—" He gestures at the two WebSocket connections, both pumping data into the same state variable. "—you get ghosts. Zombie subscriptions. Memory leaks."

You watch the console. Messages are duplicating. The state is thrashing. Your component is receiving data from two sources, both claiming to be the truth.

"This is insane," you say.

"This is development," Tyler corrects. "In production, I disappear. But the problems I reveal? Those stay. Those blow up credit card company buildings."

He shows you another example—an effect that starts an interval. Mount. Unmount. Mount again. Two intervals. Both ticking. Forever.

"You're creating timers you can't stop," Tyler says. "Every time this component mounts in production—every time the user navigates back to this page—you add another interval. Another ghost. Another memory leak."

You feel sick. You've been writing effects like this for months.

"I didn't know," you whisper.

Tyler leans close. "That's why I'm here. I force the unmount. I make you see the ghosts while you can still kill them."

The double-execution isn't a bug. It's a stress test. Tyler is deliberately breaking your component to show you where it's fragile.

You're not debugging React. You're debugging yourself.`,
  },
  {
    id: "climax",
    title: "The Chemical Burn",
    content: `Tyler takes your hand. You think he's going to shake it. Instead, he pours lye on the back of it.

The pain is immediate. Searing. Your skin bubbles.

"What are you doing?!" you scream.

"This is an effect without cleanup," Tyler says calmly. "This is your hand burning."

You try to pull away. He holds you firm.

"This is what happens when you create a side effect and don't clean it up. The damage persists. It spreads. It gets worse."

The burn deepens. You can smell your own flesh.

"Make it stop!"

"You make it stop," Tyler says. "Return a cleanup function."

Your mind races through the pain. The WebSocket. The interval. The event listeners you've attached to window without ever removing them. Every effect that creates something without destroying it.

"I don't know how!" you gasp.

Tyler's voice is steady, almost gentle: "Return a function. From your effect. That function runs when the component unmounts. That function is the antidote."

Through the pain, you understand. The moment you write the cleanup function in your mind, the burn stops spreading. The pain plateaus.

"Now the interval," Tyler says.

The burn begins to heal.

"Every effect that creates something must destroy it," Tyler says. "Every subscription must unsubscribe. Every listener must be removed. Every timer must be cleared. Every connection must be closed."

He releases your hand. The scar remains, but the pain is manageable now.

"This is your pain," he says. "This is your hand. This is what happens when you ignore cleanup. I made you feel it in development so you wouldn't feel it in production."

You look at the scar. It's shaped like a memory leak.

"In production, I'm not there to catch you," Tyler continues. "In production, the burn happens slowly. Users complain about performance. Memory usage climbs. The app crashes after an hour of use. And you have no idea why."

You understand now. The double-execution. The forced unmount. Tyler isn't torturing you.

He's vaccinating you.`,
  },
  {
    id: "resolution",
    title: "His Name is Robert Paulson",
    content: `You rewrite your effects. All of them. Every subscription gets an unsubscribe. Every listener gets a removal. Every resource gets a release.

Tyler watches you work. When you run the component now, you see the pattern clearly:

1. Mount: Effect runs. Subscription created.
2. Unmount (Tyler's doing): Cleanup runs. Subscription destroyed.
3. Mount again: Effect runs again. New subscription created.

No ghosts. No leaks. No duplicate subscriptions.

"The cleanup function is your promise," Tyler says. "Your promise that when this component unmounts—and it will unmount—you'll leave no trace. No zombie listeners. No orphaned timers. No open connections."

You test an event listener. Mount. Unmount. Mount again. One listener. Always one listener.

"What about effects that don't need cleanup?" you ask.

Tyler nods. "Some effects are pure. They don't create persistent resources. They just compute something or log something."

"But if you're not sure," Tyler adds, "ask yourself: did I create something that will outlive this component? A subscription? A timer? A listener? A connection? If yes, you need cleanup."

You practice the pattern:

1. Create the resource
2. Use the resource
3. Return cleanup that destroys the resource

Tyler smiles. "Now you're thinking in lifecycles. Mount and unmount. Create and destroy. Effect and cleanup. Yin and yang."

You look at your hand. The scar is still there, but it doesn't hurt anymore. It's a reminder.

"In production," Tyler says, "I won't be there. StrictMode only exists in development. But the discipline I taught you? That stays. That's what keeps your app alive."

You understand now why he forced the double-execution. Not to break your code, but to reveal where it was already broken. To show you the ghosts before they haunted production.

His name is Robert Paulson. His name is proper effect cleanup. His name is the pattern that saves your app.`,
  },
  {
    id: "summary",
    title: "I Am Jack's Complete Lack of Surprise",
    content: `The revelation comes slowly, then all at once.

Tyler Durden was never separate from you. He was always part of your development environment. He was React itself, trying to teach you through controlled chaos.

React.StrictMode is Tyler. And Tyler is you.

In development, he wraps your components and forces them through stress tests:

• Double-invokes effects to reveal missing cleanup
• Deliberately unmounts and remounts to simulate real-world navigation
• Exposes impure code by running it twice and showing the inconsistencies

In production, Tyler disappears. StrictMode is automatically disabled. Your components run normally, mounting once, unmounting when they should.

But the lessons remain.

Every effect that creates a persistent resource must clean it up. Every time he forced an unmount, he was asking: "Did you clean up? Did you close the socket? Did you clear the timer? Did you remove the listener?"

Every time you saw an effect run twice, he was asking: "Is this effect pure? Or does it have hidden side effects that will compound?"

The chemical burn on your hand—the scar from effects without cleanup—is your reminder. Your tattoo. Your proof that you survived Project Mayhem and learned its lessons.

You are not your code. You are not your components. You are not your effects.

You are the developer who learned to clean up after themselves.

You are Jack's properly managed side effects.

And Tyler? Tyler was you all along, teaching yourself to write better code.

His name is Robert Paulson. His name is effect cleanup. His name is the pattern that prevents production disasters.

Welcome to the rest of your development career. You're going to be fine.`,
  },
];

export default function FightClubStrictMode() {
  const [chapter, setChapter] = useState(0);
  const [strictModeEnabled, setStrictModeEnabled] = useState(true);
  const [connectionCount, setConnectionCount] = useState(0);
  const [intervalCount, setIntervalCount] = useState(0);
  const [burnIntensity, setBurnIntensity] = useState(0);
  const [hasCleanup, setHasCleanup] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);
  const mountCountRef = useRef(0);

  const currentChapter = chapters[chapter];

  const addLog = useCallback((message: string) => {
    setExecutionLog(prev => [...prev.slice(-5), message]);
  }, []);

  const simulateEffect = useCallback(() => {
    setIsRunning(true);
    mountCountRef.current += 1;
    const mountId = mountCountRef.current;

    addLog(`[Mount ${mountId}] Effect running...`);
    setConnectionCount(prev => prev + 1);
    
    const interval = setInterval(() => {
      setIntervalCount(prev => prev + 1);
    }, 1000);
    
    intervalsRef.current.push(interval);

    if (!hasCleanup) {
      setBurnIntensity(prev => Math.min(prev + 20, 100));
    }

    if (strictModeEnabled) {
      setTimeout(() => {
        addLog(`[Unmount ${mountId}] StrictMode cleanup...`);
        if (hasCleanup) {
          clearInterval(interval);
          intervalsRef.current = intervalsRef.current.filter(i => i !== interval);
          setConnectionCount(prev => Math.max(prev - 1, 0));
          addLog(`[Unmount ${mountId}] Resources cleaned up ✓`);
          setBurnIntensity(prev => Math.max(prev - 15, 0));
        } else {
          addLog(`[Unmount ${mountId}] No cleanup! Resource leaked ✗`);
        }

        setTimeout(() => {
          addLog(`[Remount ${mountId}] Effect running again...`);
          setConnectionCount(prev => prev + 1);
          const newInterval = setInterval(() => {
            setIntervalCount(prev => prev + 1);
          }, 1000);
          intervalsRef.current.push(newInterval);
          
          if (!hasCleanup) {
            setBurnIntensity(prev => Math.min(prev + 20, 100));
          }
        }, 500);
      }, 1000);
    }
  }, [strictModeEnabled, hasCleanup, addLog]);

  const resetDemo = useCallback(() => {
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    setConnectionCount(0);
    setIntervalCount(0);
    setBurnIntensity(0);
    setIsRunning(false);
    setExecutionLog([]);
    mountCountRef.current = 0;
  }, []);

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  const resourceTable = [
    { type: "WebSocket", create: "new WebSocket(url)", cleanup: "socket.close()" },
    { type: "Interval", create: "setInterval(fn, ms)", cleanup: "clearInterval(id)" },
    { type: "Timeout", create: "setTimeout(fn, ms)", cleanup: "clearTimeout(id)" },
    { type: "Event Listener", create: "element.addEventListener()", cleanup: "element.removeEventListener()" },
    { type: "Subscription", create: "api.subscribe(fn)", cleanup: "subscription.unsubscribe()" },
    { type: "Animation Frame", create: "requestAnimationFrame(fn)", cleanup: "cancelAnimationFrame(id)" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Header */}
      <header className="border-b border-red-500/30 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Flame className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold tracking-tight text-red-500">Fight Club</h1>
          </div>
          <p className="text-lg text-slate-400">Tyler Durden, 1999</p>
          <p className="text-sm text-red-400 font-semibold mt-1">React.StrictMode &amp; Effect Cleanup</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-red-500 mb-2">{currentChapter.title}</h2>
          <div className="h-1 w-24 bg-red-500"></div>
        </div>

        {/* Chapter Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          {currentChapter.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-4 leading-relaxed text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Interactive Demonstrations */}
        {chapter === 0 &amp;&amp; (
          <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-red-500" />
              <h3 className="text-xl font-bold text-red-500">The StrictMode Wrapper</h3>
            </div>
            <div className="bg-slate-950 border-2 border-red-500/50 rounded p-4 font-mono text-sm">
              <div className="text-red-400">&lt;React.StrictMode&gt;</div>
              <div className="pl-4 text-slate-300">&lt;App /&gt;</div>
              <div className="text-red-400">&lt;/React.StrictMode&gt;</div>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              In development, this wrapper forces your effects to run twice. Mount → Unmount → Mount again.
            </p>
          </div>
        )}

        {chapter === 1 &amp;&amp; (
          <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-red-500" />
                <h3 className="text-xl font-bold text-red-500">Double-Execution Simulator</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStrictModeEnabled(!strictModeEnabled)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                    strictModeEnabled
                      ? "bg-red-500 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  StrictMode: {strictModeEnabled ? "ON" : "OFF"}
                </button>
                <button
                  onClick={() => setHasCleanup(!hasCleanup)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
                    hasCleanup
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-700 text-slate-400"
                  }`}
                >
                  Cleanup: {hasCleanup ? "YES" : "NO"}
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-slate-950 border border-slate-700 rounded p-4">
                <div className="text-sm text-slate-400 mb-2">Active Connections</div>
                <div className="text-3xl font-bold text-red-500">{connectionCount}</div>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded p-4">
                <div className="text-sm text-slate-400 mb-2">Interval Ticks</div>
                <div className="text-3xl font-bold text-red-500">{intervalCount}</div>
              </div>
            </div>

            <div className="bg-slate-950 border border-slate-700 rounded p-4 mb-4 font-mono text-xs max-h-32 overflow-y-auto">
              {executionLog.length === 0 ? (
                <div className="text-slate-500">Click "Run Effect" to see execution log...</div>
              ) : (
                executionLog.map((log, idx) => (
                  <div key={idx} className="text-slate-300 mb-1">{log}</div>
                ))
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={simulateEffect}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Play className="w-4 h-4" />
                Run Effect
              </button>
              <button
                onClick={resetDemo}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-300 rounded font-semibold hover:bg-slate-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        )}

        {chapter === 2 &amp;&amp; (
          <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <h3 className="text-xl font-bold text-red-500">The Chemical Burn</h3>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Memory Leak Intensity</span>
                <span className="text-red-500 font-bold">{burnIntensity}%</span>
              </div>
              <div className="h-8 bg-slate-950 border border-slate-700 rounded overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-500"
                  style={{ width: `${burnIntensity}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-slate-950 border-2 border-red-500/50 rounded p-4 font-mono text-sm">
              <div className="text-slate-500">// Effect without cleanup</div>
              <div className="text-blue-400">useEffect</div>
              <div className="text-slate-300">{"(() => {"}</div>
              <div className="pl-4 text-slate-300">
                <span className="text-purple-400">const</span> socket = <span className="text-blue-400">new</span> WebSocket(url);
              </div>
              <div className="pl-4 text-slate-300">socket.onmessage = handleMessage;</div>
              <div className="pl-4 text-red-500">// No cleanup - the burn continues...</div>
              <div className="text-slate-300">{"}, []);"}</div>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Without cleanup, resources leak. The burn intensifies. The damage persists.
            </p>
          </div>
        )}

        {chapter === 3 &amp;&amp; (
          <div className="bg-slate-900/50 border border-emerald-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <h3 className="text-xl font-bold text-emerald-500">The Antidote: Cleanup Functions</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-red-400 font-semibold mb-2">❌ Without Cleanup</div>
                <div className="bg-slate-950 border-2 border-red-500/50 rounded p-4 font-mono text-xs">
                  <div className="text-blue-400">useEffect</div>
                  <div className="text-slate-300">{"(() => {"}</div>
                  <div className="pl-2 text-slate-300">
                    <span className="text-purple-400">const</span> id = setInterval(fn, 1000);
                  </div>
                  <div className="pl-2 text-red-500">// Leak!</div>
                  <div className="text-slate-300">{"}, []);"}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-emerald-400 font-semibold mb-2">✓ With Cleanup</div>
                <div className="bg-slate-950 border-2 border-emerald-500/50 rounded p-4 font-mono text-xs">
                  <div className="text-blue-400">useEffect</div>
                  <div className="text-slate-300">{"(() => {"}</div>
                  <div className="pl-2 text-slate-300">
                    <span className="text-purple-400">const</span> id = setInterval(fn, 1000);
                  </div>
                  <div className="pl-2 text-emerald-400">
                    <span className="text-purple-400">return</span> () =&gt; clearInterval(id);
                  </div>
                  <div className="text-slate-300">{"}, []);"}</div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Return a cleanup function. It runs on unmount. It destroys what you created. The burn heals.
            </p>
          </div>
        )}

        {chapter === 4 &amp;&amp; (
          <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-red-500" />
              <h3 className="text-xl font-bold text-red-500">Resource Cleanup Patterns</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3 text-red-400 font-semibold">Resource Type</th>
                    <th className="text-left py-2 px-3 text-red-400 font-semibold">Creation</th>
                    <th className="text-left py-2 px-3 text-red-400 font-semibold">Cleanup</th>
                  </tr>
                </thead>
                <tbody>
                  {resourceTable.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-300">{row.type}</td>
                      <td className="py-3 px-3 font-mono text-xs text-slate-400">{row.create}</td>
                      <td className="py-3 px-3 font-mono text-xs text-emerald-400">{row.cleanup}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 bg-slate-950 border border-emerald-500/30 rounded p-4">
              <div className="text-sm text-emerald-400 font-semibold mb-2">The Pattern:</div>
              <div className="font-mono text-xs text-slate-300">
                <div className="text-blue-400">useEffect</div>
                <div>{"(() => {"}</div>
                <div className="pl-2 text-slate-500">// 1. Create the resource</div>
                <div className="pl-2">
                  <span className="text-purple-400">const</span> resource = createResource();
                </div>
                <div className="pl-2 text-slate-500 mt-2">// 2. Use the resource</div>
                <div className="pl-2">resource.doSomething();</div>
                <div className="pl-2 text-slate-500 mt-2">// 3. Return cleanup</div>
                <div className="pl-2 text-emerald-400">
                  <span className="text-purple-400">return</span> () =&gt; resource.destroy();
                </div>
                <div>{"}, [dependencies]);"}</div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-red-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setChapter(c => c - 1)}
              disabled={chapter === 0}
              className="px-6 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="flex gap-1">
                {chapters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChapter(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === chapter ? "bg-red-500" : "bg-slate-700 hover:bg-slate-600"
                    }`}
                    aria-label={`Go to chapter ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setChapter(c => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}