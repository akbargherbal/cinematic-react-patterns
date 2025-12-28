import { useState, useEffect, useCallback, useMemo } from "react";
import { Database, Users, FileSpreadsheet, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

interface ChapterData {
  id: string;
  title: string;
  content: string;
}

interface VoteState {
  left: number;
  right: number;
}

interface InstanceState {
  users: number;
  friends: number;
  posts: number;
}

interface DriftEvent {
  time: string;
  eduardo: number;
  mark: number;
  action: string;
}

export default function SocialNetworkStateSync() {
  const [chapter, setChapter] = useState(0);

  // Chapter 1 state
  const [votes, setVotes] = useState<VoteState>({ left: 0, right: 0 });
  const [activeUsers, setActiveUsers] = useState(47);

  // Chapter 2 state
  const [instances, setInstances] = useState<Record<string, InstanceState>>({
    harvard: { users: 500, friends: 0, posts: 0 },
    stanford: { users: 450, friends: 0, posts: 0 },
    yale: { users: 380, friends: 0, posts: 0 },
  });

  // Chapter 3 state
  const [eduardoOwnership, setEduardoOwnership] = useState(30);
  const [markOwnership, setMarkOwnership] = useState(30);
  const [driftEvents, setDriftEvents] = useState<DriftEvent[]>([
    { time: "Feb 2004", eduardo: 30, mark: 30, action: "Initial agreement" },
  ]);

  // Chapter 4 state
  const [showReconciliation, setShowReconciliation] = useState(false);
  const [reconciled, setReconciled] = useState(false);

  const chapters: ChapterData[] = useMemo(
    () => [
      {
        id: "intro",
        title: "One Server, One Truth",
        content: `October 2003. Eduardo Saverin's dorm room at Kirkland House smells like pizza and ambition. The server—a Dell desktop with a fan that sounds like a dying helicopter—sits on his desk, its monitor casting blue light across Mark Zuckerberg's face as he types furiously.

"It's beautiful," Mark says, refreshing the page. "Look at that."

FaceMash loads instantly. Two photos side by side. Vote counts updating in real-time. Every click, every comparison, every bit of data flowing through one machine, one process, one source of truth.

Eduardo leans over Mark's shoulder, watching the numbers climb. "How many people are on right now?"

"Forty-seven," Mark says, pointing to a counter in the corner. "All hitting the same server. All seeing the same data."

This is the simplest architecture in the world: one component, one state, one instance. When a user votes, the state updates. When the state updates, everyone sees it immediately because there's only one place the data lives—right here, in this overheating Dell, in this cramped dorm room.

In React terms, this is useState in its purest form: a single component instance managing its own state. No props drilling. No context providers. No Redux stores. Just a component that owns its data, updates it when needed, and renders the result.`,
      },
      {
        id: "build",
        title: "Scaling Requires Synchronization",
        content: `February 2004. TheFacebook has launched, and the problem is immediately obvious.

"Stanford can't see Harvard profiles," Eduardo says, staring at his laptop in the new office space they've rented. "And Yale can't see Stanford. It's like we're running three separate Facebooks."

Mark is at the whiteboard, drawing boxes and arrows. "We deployed an instance at each school. Each one has its own database, its own state. They're isolated."

This is the scaling problem in its rawest form. What worked perfectly in Eduardo's dorm room—one server, one state, one truth—falls apart the moment you need multiple instances.

A Harvard student creates a profile. That data lives on the Harvard server. A Stanford student creates a profile. That data lives on the Stanford server. They might as well be different applications.

"Can't we just... copy the data between them?" Eduardo asks.

Mark shakes his head. "How? Every second, users are updating profiles, adding friends, posting photos. Do we copy every change to every server? What if two servers update the same user at the same time? Which version wins?"

This is the anti-pattern: trying to manually synchronize state across multiple component instances.`,
      },
      {
        id: "climax",
        title: "The Drift",
        content: `Summer 2004. Palo Alto. The office is bigger now, the team is growing, and Eduardo is in New York trying to sell ads while Mark is in California rewriting the entire platform.

Eduardo keeps a spreadsheet. It's meticulous. Every investment he's made, every expense he's covered, every share of the company he owns. According to his records—his local state—he owns 30% of Facebook.

He updates it regularly. When he wires money for servers: 30%. When he pays for the incorporation: 30%. When he covers the rent: still 30%. His spreadsheet is his source of truth, and it tells him he's a co-founder with a significant stake in something that's about to be huge.

In California, Mark is building something else: a centralized state management system. Not just for Facebook's user data, but for the company itself. He's working with lawyers, filing papers in Delaware, creating a cap table—an authoritative source of truth for who owns what.

This is state drift in action. Eduardo's local state (his spreadsheet) and Mark's authoritative state (the legal cap table) are diverging. They started synchronized—both agreed Eduardo owned 30%—but now they're updating independently, and Eduardo doesn't know his local copy is becoming stale.`,
      },
      {
        id: "resolution",
        title: "The Source of Truth",
        content: `Spring 2005. A conference room in Palo Alto. Eduardo has flown in from New York because Mark finally agreed to a meeting. There's a lawyer present. That should have been Eduardo's first warning.

"Let's talk about equity," Mark says.

Eduardo pulls out his laptop, opens his spreadsheet. "I own thirty percent. We agreed on that from the beginning."

The lawyer slides a document across the table. "According to the company's official records, you own point-zero-three percent."

Eduardo stares at the number. 0.03%. Not 30%. Not even 3%. Point-zero-three.

"That's impossible," Eduardo says. "I have records. I tracked every investment, every—"

"Your records are local," the lawyer says. "They're not the authoritative source. The Delaware incorporation documents are the authoritative source. The cap table is the authoritative source. And according to those sources, your shares were diluted."

This is the reconciliation moment. When local state finally syncs with authoritative state, and the local state is overwritten.`,
      },
      {
        id: "summary",
        title: "Reconciliation and Lessons",
        content: `The lawsuit settles. Eduardo gets a better deal than 0.03%—enough to become a billionaire—but the technical lesson remains: he lost because he didn't understand state synchronization.

Let's synthesize what The Social Network teaches us about state management in React.`,
      },
    ],
    []
  );

  const currentChapter = chapters[chapter];

  // Reset demo state when chapter changes
  useEffect(() => {
    if (chapter === 0) {
      setVotes({ left: 0, right: 0 });
      setActiveUsers(47);
    } else if (chapter === 1) {
      setInstances({
        harvard: { users: 500, friends: 0, posts: 0 },
        stanford: { users: 450, friends: 0, posts: 0 },
        yale: { users: 380, friends: 0, posts: 0 },
      });
    } else if (chapter === 2) {
      setEduardoOwnership(30);
      setMarkOwnership(30);
      setDriftEvents([{ time: "Feb 2004", eduardo: 30, mark: 30, action: "Initial agreement" }]);
    } else if (chapter === 3) {
      setShowReconciliation(false);
      setReconciled(false);
    }
  }, [chapter]);

  const handleVote = useCallback((side: "left" | "right") => {
    setVotes((prev) => ({ ...prev, [side]: prev[side] + 1 }));
    setActiveUsers((prev) => Math.min(prev + Math.floor(Math.random() * 3), 99));
  }, []);

  const handleInstanceAction = useCallback((college: string, action: "friends" | "posts") => {
    setInstances((prev) => ({
      ...prev,
      [college]: {
        ...prev[college],
        [action]: prev[college][action] + 1,
      },
    }));
  }, []);

  const handleInvestment = useCallback(() => {
    const newMarkOwnership = markOwnership - 5;
    setMarkOwnership(newMarkOwnership);
    setDriftEvents((prev) => [
      ...prev,
      {
        time: `Event ${prev.length}`,
        eduardo: eduardoOwnership,
        mark: newMarkOwnership,
        action: "New investment round",
      },
    ]);
  }, [markOwnership, eduardoOwnership]);

  const handleDilution = useCallback(() => {
    const newMarkOwnership = Math.max(0.03, markOwnership * 0.1);
    setMarkOwnership(newMarkOwnership);
    setDriftEvents((prev) => [
      ...prev,
      {
        time: `Event ${prev.length}`,
        eduardo: eduardoOwnership,
        mark: newMarkOwnership,
        action: "Share dilution",
      },
    ]);
  }, [markOwnership, eduardoOwnership]);

  const handleReconciliation = useCallback(() => {
    setShowReconciliation(true);
    setTimeout(() => {
      setEduardoOwnership(markOwnership);
      setReconciled(true);
    }, 1000);
  }, [markOwnership]);

  const handlePrevious = useCallback(() => {
    setChapter((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setChapter((prev) => Math.min(chapters.length - 1, prev + 1));
  }, [chapters.length]);

  return (
    <div className="min-h-screen bg-slate-800 text-white font-sans">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl md:text-4xl font-bold">The Social Network</h1>
          </div>
          <p className="text-lg text-slate-400">State Synchronization Across Instances</p>
          <p className="text-sm text-slate-500 mt-1">Mark Zuckerberg &amp; Eduardo Saverin, 2003-2005</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Narrative Panel */}
          <div className="bg-slate-900 rounded-lg p-6 md:p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">{currentChapter.title}</h2>
            <div className="prose prose-invert prose-slate max-w-none">
              {currentChapter.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Interactive Demo Panel */}
          <div className="bg-slate-900 rounded-lg p-6 md:p-8 border border-slate-700">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <h3 className="text-xl font-bold text-blue-400">Interactive Demo</h3>
            </div>

            {/* Chapter 0: FaceMash Demo */}
            {chapter === 0 &amp;&amp; (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-lg p-6 border border-blue-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-blue-300">FaceMash</h4>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Users className="w-4 h-4" />
                      <span>{activeUsers} active users</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleVote("left")}
                      className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg p-8 text-center"
                    >
                      <div className="text-4xl font-bold mb-2">{votes.left}</div>
                      <div className="text-sm text-blue-200">Vote Left</div>
                    </button>
                    <button
                      onClick={() => handleVote("right")}
                      className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg p-8 text-center"
                    >
                      <div className="text-4xl font-bold mb-2">{votes.right}</div>
                      <div className="text-sm text-blue-200">Vote Right</div>
                    </button>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-2">
                    <strong className="text-blue-400">Concept:</strong> Single component instance with local state
                  </p>
                  <pre className="text-xs text-slate-300 bg-slate-950 p-3 rounded overflow-x-auto">
                    {`const [votes, setVotes] = useState({ left: 0, right: 0 });
// One instance, one state, one truth`}
                  </pre>
                </div>
              </div>
            )}

            {/* Chapter 1: Multiple Instances Demo */}
            {chapter === 1 &amp;&amp; (
              <div className="space-y-4">
                {Object.entries(instances).map(([college, state]) => (
                  <div key={college} className="bg-slate-800 rounded-lg p-4 border border-blue-500/30">
                    <h4 className="text-lg font-semibold text-blue-300 capitalize mb-3">{college}</h4>
                    <div className="grid grid-cols-3 gap-2 mb-3 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{state.users}</div>
                        <div className="text-slate-400">Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{state.friends}</div>
                        <div className="text-slate-400">Friends</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">{state.posts}</div>
                        <div className="text-slate-400">Posts</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleInstanceAction(college, "friends")}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors rounded px-3 py-2 text-sm"
                      >
                        Add Friend
                      </button>
                      <button
                        onClick={() => handleInstanceAction(college, "posts")}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors rounded px-3 py-2 text-sm"
                      >
                        Create Post
                      </button>
                    </div>
                  </div>
                ))}
                <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-300 font-semibold mb-1">Problem: Isolated State</p>
                      <p className="text-xs text-red-200">
                        Each instance has independent state. Changes in Harvard don't affect Stanford or Yale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 2: Drift Demo */}
            {chapter === 2 &amp;&amp; (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800 rounded-lg p-4 border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <FileSpreadsheet className="w-5 h-5 text-blue-400" />
                      <h4 className="text-sm font-semibold text-blue-300">Eduardo's Spreadsheet</h4>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-400 mb-1">{eduardoOwnership}%</div>
                      <div className="text-xs text-slate-400">Local State (Stale)</div>
                    </div>
                  </div>
                  <div className="bg-slate-800 rounded-lg p-4 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="w-5 h-5 text-green-400" />
                      <h4 className="text-sm font-semibold text-green-300">Mark's Cap Table</h4>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-1">{markOwnership.toFixed(2)}%</div>
                      <div className="text-xs text-slate-400">Authoritative State</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleInvestment}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors rounded px-4 py-2 text-sm"
                  >
                    New Investment
                  </button>
                  <button
                    onClick={handleDilution}
                    className="flex-1 bg-red-600 hover:bg-red-700 transition-colors rounded px-4 py-2 text-sm"
                  >
                    Share Dilution
                  </button>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 border border-slate-700 max-h-48 overflow-y-auto">
                  <h5 className="text-xs font-semibold text-slate-400 mb-2">Event History</h5>
                  <div className="space-y-2">
                    {driftEvents.map((event, idx) => (
                      <div key={idx} className="text-xs text-slate-300 flex justify-between items-center">
                        <span className="text-slate-500">{event.time}</span>
                        <span className="flex-1 mx-2 text-slate-400">{event.action}</span>
                        <span className="text-blue-400">E: {event.eduardo}%</span>
                        <span className="text-green-400 ml-2">M: {event.mark.toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {Math.abs(eduardoOwnership - markOwnership) > 5 &amp;&amp; (
                  <div className="bg-yellow-950/30 border border-yellow-500/30 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-yellow-300 font-semibold mb-1">State Drift Detected</p>
                        <p className="text-xs text-yellow-200">
                          Eduardo's local state is {Math.abs(eduardoOwnership - markOwnership).toFixed(2)}% off from the
                          authoritative source.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Chapter 3: Reconciliation Demo */}
            {chapter === 3 &amp;&amp; (
              <div className="space-y-6">
                <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-slate-300 mb-4 text-center">The Reconciliation Moment</h4>
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="text-center">
                      <div
                        className={`text-5xl font-bold mb-2 transition-all duration-1000 ${
                          showReconciliation ? "text-red-400 line-through" : "text-blue-400"
                        }`}
                      >
                        {eduardoOwnership}%
                      </div>
                      <div className="text-sm text-slate-400">Eduardo's Local State</div>
                    </div>
                    {showReconciliation &amp;&amp; (
                      <ArrowRight className="w-8 h-8 text-red-400 animate-pulse" />
                    )}
                    <div className="text-center">
                      <div className="text-5xl font-bold text-green-400 mb-2">{markOwnership.toFixed(2)}%</div>
                      <div className="text-sm text-slate-400">Authoritative State</div>
                    </div>
                  </div>
                  {!showReconciliation ? (
                    <button
                      onClick={handleReconciliation}
                      className="w-full bg-red-600 hover:bg-red-700 transition-colors rounded-lg px-6 py-3 font-semibold"
                    >
                      Trigger Reconciliation
                    </button>
                  ) : (
                    <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        {reconciled ? (
                          <CheckCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
                        )}
                        <div>
                          <p className="text-sm text-red-300 font-semibold mb-1">
                            {reconciled ? "Reconciliation Complete" : "Reconciling..."}
                          </p>
                          <p className="text-xs text-red-200">
                            {reconciled
                              ? "Local state has been overwritten by authoritative state."
                              : "Authoritative state is overwriting local state..."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-2">
                    <strong className="text-blue-400">Pattern:</strong> Centralized State Management
                  </p>
                  <pre className="text-xs text-slate-300 bg-slate-950 p-3 rounded overflow-x-auto">
                    {`// All components read from authoritative source
const ownership = useContext(OwnershipContext);
// No local state. Always in sync.`}
                  </pre>
                </div>
              </div>
            )}

            {/* Chapter 4: Summary */}
            {chapter === 4 &amp;&amp; (
              <div className="space-y-4">
                <div className="bg-slate-800 rounded-lg p-4 border border-blue-500/30">
                  <h4 className="text-sm font-semibold text-blue-300 mb-3">When to Use Each Pattern</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <strong className="text-slate-200">Local State (useState)</strong>
                      </div>
                      <p className="text-slate-400 text-xs ml-6">
                        Form inputs, UI state, component-specific data that's truly isolated
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <strong className="text-slate-200">Lifted State (Props)</strong>
                      </div>
                      <p className="text-slate-400 text-xs ml-6">
                        Data shared between siblings, parent coordinating children
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <strong className="text-slate-200">Context API</strong>
                      </div>
                      <p className="text-slate-400 text-xs ml-6">
                        Data needed by many components at different nesting levels
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <strong className="text-slate-200">Redux/Zustand</strong>
                      </div>
                      <p className="text-slate-400 text-xs ml-6">
                        Complex state with many interdependencies, large-scale apps
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-300 font-semibold mb-1">The Eduardo Principle</p>
                      <p className="text-xs text-red-200">
                        Never maintain local state that duplicates authoritative state. When your local copy drifts—and
                        it will drift—the authoritative state wins.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-2">
                    <strong className="text-blue-400">Key Takeaway:</strong>
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    State synchronization isn't just a technical problem—it's about control. Whoever owns the
                    authoritative state owns the truth. Make sure you know where your source of truth lives, and make
                    sure all your components are reading from it.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={chapter === 0}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors rounded-lg font-semibold"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
            <div className="flex gap-1 ml-2">
              {chapters.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === chapter ? "bg-blue-500" : idx < chapter ? "bg-blue-700" : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors rounded-lg font-semibold"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}