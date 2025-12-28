import { useState, useEffect } from "react";
import { Clock, GitBranch, AlertTriangle, CheckCircle, Zap } from "lucide-react";

interface StateSnapshot {
  id: number;
  timestamp: string;
  data: { userId: number; email: string; cartItems: number };
  isClean: boolean;
  parentId?: number;
}

interface Action {
  id: number;
  type: string;
  payload: string;
}

export default function PrimerStateTimeTravel() {
  const [chapter, setChapter] = useState(0);
  const [timelineMode, setTimelineMode] = useState<"clean" | "chaotic">("clean");
  const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState(0);
  const [showConflict, setShowConflict] = useState(false);

  const chapters = [
    {
      title: "The Box in the Garage",
      content: `Aaron stares at the device in the corner of the garage. It's not much to look at—a refrigerator-sized metal box with a simple control panel. But what it does is impossible.

"We can go back," Abe says, his voice tight with controlled excitement. "Not in the application. In the *state*. We can rewind to any point in the history."

Aaron's been debugging the same issue for three days. A user action that corrupts the data model. He's tried logging, breakpoints, unit tests. Nothing reveals the exact moment when the state goes wrong. But now...

"Show me," Aaron says.

Abe pulls up the DevTools panel. The timeline stretches back hours—every action, every state change, meticulously recorded. He clicks on a point thirty minutes ago, before the corruption.

"Watch."

The application rewinds. Components re-render in reverse. The corrupted data disappears. They're back to a clean state, but they can still see the current timeline—the broken one—in the history log.`,
    },
    {
      title: "The Multiplication",
      content: `Three weeks later, Aaron's notebook is a mess.

He's sitting in the garage at 2 AM, trying to reconstruct the timeline. They've been rewinding constantly—sometimes multiple times a day. Debugging features. Testing edge cases. Exploring different state configurations.

But something's wrong.

"Which version of the state are we in?" Aaron asks.

Abe looks up from his laptop, eyes red from lack of sleep. "What do you mean?"

"I mean—" Aaron gestures at the DevTools timeline. It's no longer a clean, linear chain. It's branching. Forking. Multiple timelines diverging from single points.

"We're mutating the snapshots," Aaron realizes. "We're supposed to treat them as immutable. Just replay the actions. But we've been... editing them. Changing the state directly during replay."`,
    },
    {
      title: "The Paradox",
      content: `The application is breaking in ways that shouldn't be possible.

Aaron watches as a user action triggers three different state updates simultaneously. The same action. Three different results. As if the application exists in three timelines at once.

"This is impossible," he mutters.

But it's happening. Right there on the screen. The state inspector shows multiple versions of the same data. User object with ID 42 has three different email addresses. The shopping cart contains both two items and five items. The authentication token is simultaneously valid and expired.

"We broke causality," Aaron says. "We rewound so many times, made so many changes, that the state history doesn't make sense anymore. Actions are executing out of order. State updates are applying to the wrong snapshots."`,
    },
    {
      title: "The Protocol",
      content: `Aaron tapes a sheet of paper to the wall above the workstation. In careful block letters, he's written:

**STATE TIME-TRAVEL PROTOCOL**

1. Snapshots are immutable. Never edit state directly during replay.
2. Actions only. Replay the action sequence, don't modify the state.
3. One timeline at a time. Document before branching.
4. Pure reducers. State updates must be deterministic.
5. Maintain the log. Record every rewind, every replay, every branch.
6. Failsafe first. Always have a clean backup before experimenting.

"This should have been rule one," Abe says.

"It is now," Aaron replies.

They're rebuilding. Starting from the clean failsafe state, carefully replaying only the actions they need. But this time, they're following the protocol.`,
    },
    {
      title: "The Lesson",
      content: `Six months later, Aaron is teaching a new developer how to use the time-travel debugging tools.

"Think of it like this," he says, pulling up the DevTools timeline. "Every state snapshot is a photograph. Immutable. Permanent. You can look at it, study it, learn from it. But you can't change it."

"So when I rewind..." the new developer asks.

"You're just viewing the photograph," Aaron says. "You're not going back in time to change what happened. You're observing what happened so you can understand it."

"That's the power of time-travel debugging," Aaron says. "Not the ability to change history. The ability to understand it. To see exactly how your application's state evolved. To replay any sequence of actions and observe the results."`,
    },
  ];

  const cleanTimeline: StateSnapshot[] = [
    { id: 0, timestamp: "10:00:00", data: { userId: 42, email: "user@example.com", cartItems: 0 }, isClean: true },
    { id: 1, timestamp: "10:05:00", data: { userId: 42, email: "user@example.com", cartItems: 2 }, isClean: true },
    { id: 2, timestamp: "10:10:00", data: { userId: 42, email: "user@example.com", cartItems: 3 }, isClean: true },
    { id: 3, timestamp: "10:15:00", data: { userId: 42, email: "user@example.com", cartItems: 5 }, isClean: true },
  ];

  const chaoticTimeline: StateSnapshot[] = [
    { id: 0, timestamp: "10:00:00", data: { userId: 42, email: "user@example.com", cartItems: 0 }, isClean: true },
    { id: 1, timestamp: "10:05:00", data: { userId: 42, email: "user@example.com", cartItems: 2 }, isClean: true },
    { id: 2, timestamp: "10:10:00", data: { userId: 42, email: "modified@example.com", cartItems: 3 }, isClean: false, parentId: 1 },
    { id: 3, timestamp: "10:10:00", data: { userId: 42, email: "user@example.com", cartItems: 7 }, isClean: false, parentId: 1 },
    { id: 4, timestamp: "10:15:00", data: { userId: 42, email: "user@example.com", cartItems: 5 }, isClean: true, parentId: 1 },
  ];

  const actions: Action[] = [
    { id: 0, type: "USER_LOGIN", payload: "userId: 42" },
    { id: 1, type: "ADD_TO_CART", payload: "itemId: 101, 102" },
    { id: 2, type: "ADD_TO_CART", payload: "itemId: 103" },
    { id: 3, type: "ADD_TO_CART", payload: "itemId: 104, 105" },
  ];

  const protocol = [
    "Snapshots are immutable. Never edit state directly during replay.",
    "Actions only. Replay the action sequence, don't modify the state.",
    "One timeline at a time. Document before branching.",
    "Pure reducers. State updates must be deterministic.",
    "Maintain the log. Record every rewind, every replay, every branch.",
    "Failsafe first. Always have a clean backup before experimenting.",
  ];

  const currentChapter = chapters[chapter];
  const timeline = timelineMode === "clean" ? cleanTimeline : chaoticTimeline;

  useEffect(() => {
    if (chapter === 1) {
      setTimelineMode("chaotic");
    } else if (chapter === 3 || chapter === 4) {
      setTimelineMode("clean");
    }
  }, [chapter]);

  const handleRewind = (index: number) => {
    setCurrentSnapshotIndex(index);
    if (chapter === 2) {
      setShowConflict(true);
      setTimeout(() => setShowConflict(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-mono">
      {/* Header */}
      <header className="border-b border-slate-800 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100">Primer: State Time-Travel</h1>
          </div>
          <p className="text-lg text-slate-400">Aaron & Abe, 2004</p>
          <p className="text-sm text-blue-400 mt-1">Time-Travel Debugging & State History</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 pb-32">
        {/* Chapter Title */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">{currentChapter.title}</h2>
          <div className="h-1 w-20 bg-blue-500"></div>
        </div>

        {/* Narrative Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="text-slate-300 leading-relaxed whitespace-pre-line text-sm md:text-base">
            {currentChapter.content}
          </div>
        </div>

        {/* Interactive Demonstrations */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 md:p-8">
          {/* Chapter 0: The Discovery */}
          {chapter === 0 && (
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Time-Travel Debugging Interface
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Click any snapshot to rewind. Observe the state at that moment in time.
              </p>
              
              {/* Timeline Visualization */}
              <div className="mb-8">
                <div className="flex items-center gap-2 overflow-x-auto pb-4">
                  {cleanTimeline.map((snapshot, index) => (
                    <div key={snapshot.id} className="flex items-center">
                      <button
                        onClick={() => handleRewind(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 transition-all ${
                          currentSnapshotIndex === index
                            ? "border-blue-500 bg-blue-500/20 scale-110"
                            : "border-slate-700 bg-slate-800 hover:border-blue-400"
                        }`}
                      >
                        <div className="text-xs text-slate-400">{snapshot.timestamp}</div>
                        <div className="text-lg font-bold text-slate-200">{index}</div>
                      </button>
                      {index < cleanTimeline.length - 1 && (
                        <div className="w-8 h-0.5 bg-slate-700"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* State Inspector */}
              <div className="bg-slate-950 border border-slate-800 rounded p-4">
                <div className="text-xs text-slate-500 mb-2">STATE SNAPSHOT #{currentSnapshotIndex}</div>
                <pre className="text-sm text-emerald-400">
{`{
  userId: ${timeline[currentSnapshotIndex].data.userId},
  email: "${timeline[currentSnapshotIndex].data.email}",
  cartItems: ${timeline[currentSnapshotIndex].data.cartItems}
}`}
                </pre>
              </div>
            </div>
          )}

          {/* Chapter 1: The Multiplication */}
          {chapter === 1 && (
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Timeline Branching (Mutation Detected)
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                When you mutate state during replay, timelines branch. Multiple versions exist simultaneously.
              </p>

              {/* Chaotic Timeline */}
              <div className="mb-8 overflow-x-auto">
                <div className="inline-flex flex-col gap-4 min-w-max">
                  {/* Main timeline */}
                  <div className="flex items-center gap-2">
                    {chaoticTimeline.slice(0, 2).map((snapshot, index) => (
                      <div key={snapshot.id} className="flex items-center">
                        <div className={`w-12 h-12 rounded border-2 flex items-center justify-center text-xs ${
                          snapshot.isClean ? "border-emerald-500 bg-emerald-500/10" : "border-red-500 bg-red-500/10"
                        }`}>
                          {index}
                        </div>
                        {index < 1 && <div className="w-8 h-0.5 bg-slate-700"></div>}
                      </div>
                    ))}
                    <div className="w-8 h-0.5 bg-slate-700"></div>
                    <div className="text-amber-400 text-xs">BRANCH POINT</div>
                  </div>

                  {/* Branch 1 */}
                  <div className="flex items-center gap-2 ml-20">
                    <div className="w-0.5 h-8 bg-slate-700 -mt-8"></div>
                    <div className="w-12 h-12 rounded border-2 border-red-500 bg-red-500/10 flex items-center justify-center text-xs">
                      2a
                    </div>
                    <div className="text-xs text-red-400">mutated email</div>
                  </div>

                  {/* Branch 2 */}
                  <div className="flex items-center gap-2 ml-20">
                    <div className="w-0.5 h-8 bg-slate-700 -mt-8"></div>
                    <div className="w-12 h-12 rounded border-2 border-red-500 bg-red-500/10 flex items-center justify-center text-xs">
                      2b
                    </div>
                    <div className="text-xs text-red-400">mutated cart</div>
                  </div>

                  {/* Branch 3 */}
                  <div className="flex items-center gap-2 ml-20">
                    <div className="w-0.5 h-8 bg-slate-700 -mt-8"></div>
                    <div className="w-12 h-12 rounded border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center text-xs">
                      2c
                    </div>
                    <div className="text-xs text-emerald-400">clean replay</div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-950/30 border border-amber-500/30 rounded p-4 text-sm text-amber-200">
                <strong>Warning:</strong> 3 conflicting timelines detected. State integrity compromised.
              </div>
            </div>
          )}

          {/* Chapter 2: The Paradox */}
          {chapter === 2 && (
            <div>
              <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                State Paradox Detected
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Multiple versions of the same data exist simultaneously. Which one is real?
              </p>

              {/* Conflicting States */}
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className={`bg-slate-950 border rounded p-4 transition-all ${
                  showConflict ? "border-red-500 animate-pulse" : "border-slate-800"
                }`}>
                  <div className="text-xs text-slate-500 mb-2">TIMELINE A</div>
                  <pre className="text-xs text-red-400">
{`{
  userId: 42,
  email: "user@example.com",
  cartItems: 2
}`}
                  </pre>
                </div>

                <div className={`bg-slate-950 border rounded p-4 transition-all ${
                  showConflict ? "border-red-500 animate-pulse" : "border-slate-800"
                }`}>
                  <div className="text-xs text-slate-500 mb-2">TIMELINE B</div>
                  <pre className="text-xs text-red-400">
{`{
  userId: 42,
  email: "modified@example.com",
  cartItems: 5
}`}
                  </pre>
                </div>

                <div className={`bg-slate-950 border rounded p-4 transition-all ${
                  showConflict ? "border-red-500 animate-pulse" : "border-slate-800"
                }`}>
                  <div className="text-xs text-slate-500 mb-2">TIMELINE C</div>
                  <pre className="text-xs text-red-400">
{`{
  userId: 42,
  email: "user@example.com",
  cartItems: 7
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-red-950/30 border border-red-500/30 rounded p-4 text-sm text-red-200">
                <strong>Critical Error:</strong> Causality violated. State history is incomprehensible. Application behavior unpredictable.
              </div>
            </div>
          )}

          {/* Chapter 3: The Protocol */}
          {chapter === 3 && (
            <div>
              <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                State Time-Travel Protocol
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Six rules for safe time-travel debugging. Follow them, and the timeline stays clean.
              </p>

              {/* Protocol Rules */}
              <div className="space-y-3 mb-8">
                {protocol.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3 bg-slate-950 border border-emerald-500/30 rounded p-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-xs text-emerald-400 font-bold">
                      {index + 1}
                    </div>
                    <div className="text-sm text-slate-300">{rule}</div>
                  </div>
                ))}
              </div>

              {/* Clean Timeline Demo */}
              <div className="bg-slate-950 border border-emerald-500/30 rounded p-4">
                <div className="text-xs text-emerald-400 mb-3">CLEAN TIMELINE (Protocol Followed)</div>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {cleanTimeline.map((snapshot, index) => (
                    <div key={snapshot.id} className="flex items-center">
                      <div className="w-12 h-12 rounded border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center text-xs">
                        {index}
                      </div>
                      {index < cleanTimeline.length - 1 && (
                        <div className="w-8 h-0.5 bg-emerald-500"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chapter 4: The Lesson */}
          {chapter === 4 && (
            <div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">Comparison: Wrong vs Right</h3>
              <p className="text-sm text-slate-400 mb-6">
                Time-travel debugging is powerful, but only with discipline. Compare the approaches.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Wrong Approach */}
                <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold text-red-400 mb-3">❌ Wrong Approach</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Mutate state during replay</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Edit snapshots directly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Merge timelines carelessly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>Lose track of branches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400">•</span>
                      <span>No documentation</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-red-300 italic">
                    Result: Chaos, paradoxes, unpredictable behavior
                  </div>
                </div>

                {/* Right Approach */}
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-bold text-emerald-400 mb-3">✓ Right Approach</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Treat snapshots as immutable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Replay actions only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Maintain clean history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Document every rewind</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>Keep failsafe backups</span>
                    </li>
                  </ul>
                  <div className="mt-4 text-xs text-emerald-300 italic">
                    Result: Clean, predictable, comprehensible state history
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-950/30 border border-blue-500/30 rounded p-4 text-sm text-blue-200">
                <strong>Key Insight:</strong> Time-travel debugging is the art of learning from history without trying to change it. Observe, understand, then fix in the present.
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={() => setChapter(c => c - 1)}
            disabled={chapter === 0}
            className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded font-mono text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
          >
            ← Previous
          </button>
          
          <div className="text-sm text-slate-400 font-mono">
            Chapter {chapter + 1} of {chapters.length}
          </div>
          
          <button
            onClick={() => setChapter(c => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded font-mono text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
          >
            Next →
          </button>
        </div>
      </footer>
    </div>
  );
}