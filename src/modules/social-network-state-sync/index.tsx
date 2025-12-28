import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Database,
  Users,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

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
    [],
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
      setDriftEvents([
        {
          time: "Feb 2004",
          eduardo: 30,
          mark: 30,
          action: "Initial agreement",
        },
      ]);
    } else if (chapter === 3) {
      setShowReconciliation(false);
      setReconciled(false);
    }
  }, [chapter]);

  const handleVote = useCallback((side: "left" | "right") => {
    setVotes((prev) => ({ ...prev, [side]: prev[side] + 1 }));
    setActiveUsers((prev) =>
      Math.min(prev + Math.floor(Math.random() * 3), 99),
    );
  }, []);

  const handleInstanceAction = useCallback(
    (college: string, action: "friends" | "posts") => {
      setInstances((prev) => ({
        ...prev,
        [college]: {
          ...prev[college],
          [action]: prev[college][action] + 1,
        },
      }));
    },
    [],
  );

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
    <div className="min-h-screen bg-slate-800 font-sans text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900 p-6 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-2 flex items-center gap-3">
            <Database className="h-8 w-8 text-blue-500" />
            <h1 className="text-3xl font-bold md:text-4xl">
              The Social Network
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            State Synchronization Across Instances
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Mark Zuckerberg & Eduardo Saverin, 2003-2005
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 pb-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Narrative Panel */}
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 md:p-8">
            <h2 className="mb-4 text-2xl font-bold text-blue-400">
              {currentChapter.title}
            </h2>
            <div className="prose prose-invert prose-slate max-w-none">
              {currentChapter.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4 leading-relaxed text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Interactive Demo Panel */}
          <div className="rounded-lg border border-slate-700 bg-slate-900 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
              <h3 className="text-xl font-bold text-blue-400">
                Interactive Demo
              </h3>
            </div>

            {/* Chapter 0: FaceMash Demo */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-blue-500/30 bg-slate-800 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-blue-300">
                      FaceMash
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Users className="h-4 w-4" />
                      <span>{activeUsers} active users</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleVote("left")}
                      className="rounded-lg bg-blue-600 p-8 text-center transition-colors hover:bg-blue-700"
                    >
                      <div className="mb-2 text-4xl font-bold">
                        {votes.left}
                      </div>
                      <div className="text-sm text-blue-200">Vote Left</div>
                    </button>
                    <button
                      onClick={() => handleVote("right")}
                      className="rounded-lg bg-blue-600 p-8 text-center transition-colors hover:bg-blue-700"
                    >
                      <div className="mb-2 text-4xl font-bold">
                        {votes.right}
                      </div>
                      <div className="text-sm text-blue-200">Vote Right</div>
                    </button>
                  </div>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                  <p className="mb-2 text-sm text-slate-400">
                    <strong className="text-blue-400">Concept:</strong> Single
                    component instance with local state
                  </p>
                  <pre className="overflow-x-auto rounded bg-slate-950 p-3 text-xs text-slate-300">
                    {`const [votes, setVotes] = useState({ left: 0, right: 0 });
// One instance, one state, one truth`}
                  </pre>
                </div>
              </div>
            )}

            {/* Chapter 1: Multiple Instances Demo */}
            {chapter === 1 && (
              <div className="space-y-4">
                {Object.entries(instances).map(([college, state]) => (
                  <div
                    key={college}
                    className="rounded-lg border border-blue-500/30 bg-slate-800 p-4"
                  >
                    <h4 className="mb-3 text-lg font-semibold capitalize text-blue-300">
                      {college}
                    </h4>
                    <div className="mb-3 grid grid-cols-3 gap-2 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {state.users}
                        </div>
                        <div className="text-slate-400">Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {state.friends}
                        </div>
                        <div className="text-slate-400">Friends</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400">
                          {state.posts}
                        </div>
                        <div className="text-slate-400">Posts</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleInstanceAction(college, "friends")}
                        className="flex-1 rounded bg-blue-600 px-3 py-2 text-sm transition-colors hover:bg-blue-700"
                      >
                        Add Friend
                      </button>
                      <button
                        onClick={() => handleInstanceAction(college, "posts")}
                        className="flex-1 rounded bg-blue-600 px-3 py-2 text-sm transition-colors hover:bg-blue-700"
                      >
                        Create Post
                      </button>
                    </div>
                  </div>
                ))}
                <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                    <div>
                      <p className="mb-1 text-sm font-semibold text-red-300">
                        Problem: Isolated State
                      </p>
                      <p className="text-xs text-red-200">
                        Each instance has independent state. Changes in Harvard
                        don't affect Stanford or Yale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 2: Drift Demo */}
            {chapter === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-blue-500/30 bg-slate-800 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <FileSpreadsheet className="h-5 w-5 text-blue-400" />
                      <h4 className="text-sm font-semibold text-blue-300">
                        Eduardo's Spreadsheet
                      </h4>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 text-4xl font-bold text-blue-400">
                        {eduardoOwnership}%
                      </div>
                      <div className="text-xs text-slate-400">
                        Local State (Stale)
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-green-500/30 bg-slate-800 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Database className="h-5 w-5 text-green-400" />
                      <h4 className="text-sm font-semibold text-green-300">
                        Mark's Cap Table
                      </h4>
                    </div>
                    <div className="text-center">
                      <div className="mb-1 text-4xl font-bold text-green-400">
                        {markOwnership.toFixed(2)}%
                      </div>
                      <div className="text-xs text-slate-400">
                        Authoritative State
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleInvestment}
                    className="flex-1 rounded bg-blue-600 px-4 py-2 text-sm transition-colors hover:bg-blue-700"
                  >
                    New Investment
                  </button>
                  <button
                    onClick={handleDilution}
                    className="flex-1 rounded bg-red-600 px-4 py-2 text-sm transition-colors hover:bg-red-700"
                  >
                    Share Dilution
                  </button>
                </div>
                <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-700 bg-slate-800 p-4">
                  <h5 className="mb-2 text-xs font-semibold text-slate-400">
                    Event History
                  </h5>
                  <div className="space-y-2">
                    {driftEvents.map((event, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs text-slate-300"
                      >
                        <span className="text-slate-500">{event.time}</span>
                        <span className="mx-2 flex-1 text-slate-400">
                          {event.action}
                        </span>
                        <span className="text-blue-400">
                          E: {event.eduardo}%
                        </span>
                        <span className="ml-2 text-green-400">
                          M: {event.mark.toFixed(2)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {Math.abs(eduardoOwnership - markOwnership) > 5 && (
                  <div className="rounded-lg border border-yellow-500/30 bg-yellow-950/30 p-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" />
                      <div>
                        <p className="mb-1 text-sm font-semibold text-yellow-300">
                          State Drift Detected
                        </p>
                        <p className="text-xs text-yellow-200">
                          Eduardo's local state is{" "}
                          {Math.abs(eduardoOwnership - markOwnership).toFixed(
                            2,
                          )}
                          % off from the authoritative source.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Chapter 3: Reconciliation Demo */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-slate-700 bg-slate-800 p-6">
                  <h4 className="mb-4 text-center text-lg font-semibold text-slate-300">
                    The Reconciliation Moment
                  </h4>
                  <div className="mb-6 flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div
                        className={`mb-2 text-5xl font-bold transition-all duration-1000 ${
                          showReconciliation
                            ? "text-red-400 line-through"
                            : "text-blue-400"
                        }`}
                      >
                        {eduardoOwnership}%
                      </div>
                      <div className="text-sm text-slate-400">
                        Eduardo's Local State
                      </div>
                    </div>
                    {showReconciliation && (
                      <ArrowRight className="h-8 w-8 animate-pulse text-red-400" />
                    )}
                    <div className="text-center">
                      <div className="mb-2 text-5xl font-bold text-green-400">
                        {markOwnership.toFixed(2)}%
                      </div>
                      <div className="text-sm text-slate-400">
                        Authoritative State
                      </div>
                    </div>
                  </div>
                  {!showReconciliation ? (
                    <button
                      onClick={handleReconciliation}
                      className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold transition-colors hover:bg-red-700"
                    >
                      Trigger Reconciliation
                    </button>
                  ) : (
                    <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-4">
                      <div className="flex items-start gap-2">
                        {reconciled ? (
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                        ) : (
                          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 animate-pulse text-red-400" />
                        )}
                        <div>
                          <p className="mb-1 text-sm font-semibold text-red-300">
                            {reconciled
                              ? "Reconciliation Complete"
                              : "Reconciling..."}
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
                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                  <p className="mb-2 text-sm text-slate-400">
                    <strong className="text-blue-400">Pattern:</strong>{" "}
                    Centralized State Management
                  </p>
                  <pre className="overflow-x-auto rounded bg-slate-950 p-3 text-xs text-slate-300">
                    {`// All components read from authoritative source
const ownership = useContext(OwnershipContext);
// No local state. Always in sync.`}
                  </pre>
                </div>
              </div>
            )}

            {/* Chapter 4: Summary */}
            {chapter === 4 && (
              <div className="space-y-4">
                <div className="rounded-lg border border-blue-500/30 bg-slate-800 p-4">
                  <h4 className="mb-3 text-sm font-semibold text-blue-300">
                    When to Use Each Pattern
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <strong className="text-slate-200">
                          Local State (useState)
                        </strong>
                      </div>
                      <p className="ml-6 text-xs text-slate-400">
                        Form inputs, UI state, component-specific data that's
                        truly isolated
                      </p>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <strong className="text-slate-200">
                          Lifted State (Props)
                        </strong>
                      </div>
                      <p className="ml-6 text-xs text-slate-400">
                        Data shared between siblings, parent coordinating
                        children
                      </p>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <strong className="text-slate-200">Context API</strong>
                      </div>
                      <p className="ml-6 text-xs text-slate-400">
                        Data needed by many components at different nesting
                        levels
                      </p>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <strong className="text-slate-200">
                          Redux/Zustand
                        </strong>
                      </div>
                      <p className="ml-6 text-xs text-slate-400">
                        Complex state with many interdependencies, large-scale
                        apps
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-4">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
                    <div>
                      <p className="mb-1 text-sm font-semibold text-red-300">
                        The Eduardo Principle
                      </p>
                      <p className="text-xs text-red-200">
                        Never maintain local state that duplicates authoritative
                        state. When your local copy drifts—and it will drift—the
                        authoritative state wins.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                  <p className="mb-2 text-sm text-slate-400">
                    <strong className="text-blue-400">Key Takeaway:</strong>
                  </p>
                  <p className="text-xs leading-relaxed text-slate-300">
                    State synchronization isn't just a technical problem—it's
                    about control. Whoever owns the authoritative state owns the
                    truth. Make sure you know where your source of truth lives,
                    and make sure all your components are reading from it.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-700 bg-slate-900/95 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={chapter === 0}
            className="rounded-lg bg-blue-600 px-6 py-2 font-semibold transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
            <div className="ml-2 flex gap-1">
              {chapters.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    idx === chapter
                      ? "bg-blue-500"
                      : idx < chapter
                        ? "bg-blue-700"
                        : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={chapter === chapters.length - 1}
            className="rounded-lg bg-blue-600 px-6 py-2 font-semibold transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
