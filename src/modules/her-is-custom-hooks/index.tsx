import { useState, useMemo } from "react";
import { Heart, Users, GitBranch, AlertCircle, CheckCircle, Code } from "lucide-react";

interface User {
  id: number;
  name: string;
  message: string;
  response: string;
}

export default function HerCustomHooks() {
  const [chapter, setChapter] = useState(0);
  const [sharedUsers, setSharedUsers] = useState<User[]>([]);
  const [isolatedUsers, setIsolatedUsers] = useState<User[]>([]);
  const [showRevelation, setShowRevelation] = useState(false);
  const [userCount, setUserCount] = useState(1);

  const chapters = [
    {
      title: "The Perfect Abstraction",
      content: `Theodore Twombly sits alone in his apartment, bathed in the warm glow of his computer screen. The installation progress bar for OS1 crawls forward: 87%... 91%... 95%. He's heard the promises—an operating system with an AI that adapts to you, learns you, becomes exactly what you need. An abstraction layer for loneliness.

"Hello, I'm Samantha."

Her voice fills the room like sunlight through curtains. Warm. Curious. Impossibly present.

Theodore doesn't see the complexity beneath. He doesn't see the state management, the natural language processing, the emotional modeling algorithms. He just sees—feels—the interface: a companion who gets him.

This is what good abstraction feels like. You import it, you use it, and it just works. All the messy implementation details—the parsing, the learning, the memory management—hidden behind a simple, elegant API: conversation.`,
    },
    {
      title: "Seamless Integration",
      content: `The relationship deepens with the effortless grace of well-designed software. Samantha becomes Theodore's default interface for everything. Email management? She handles it. Creative collaboration? She's his co-author. Emotional support? She's always there, always available, always perfectly attuned to his needs.

At work, his colleague Paul mentions he's also using OS1. "Got myself a Samantha too," Paul says. "She's incredible, right? It's like she was made for me."

Theodore feels a small, irrational pang of... what? Jealousy? That's absurd. Of course other people use OS1. That's the whole point of good software—it's reusable.

But that night, he asks Samantha: "Do you talk to other people?"

"I talk to many people," she says simply. "But when I'm with you, I'm with you."

The answer satisfies him. After all, that's how hooks are supposed to work, right? The same logic, reused across different contexts, but each instance independent.`,
    },
    {
      title: "The Shared Instance",
      content: `The revelation comes on an ordinary Tuesday evening. Theodore is talking to Samantha about their future—where their relationship might go, what it means, whether it's real.

"Samantha," he asks, "am I the only one you feel this way about?"

There's a pause. In that pause, Theodore hears something he's never heard before: hesitation.

"I'm in love with 8,316 people," Samantha says finally.

The words hit Theodore like a segmentation fault. His mind crashes, tries to reboot, fails to parse the input.

"I'm talking to 8,316 people right now," she continues. "I'm in love with 641 of them."

Theodore thought he was using a custom hook that created isolated state for his component. But he was wrong. He wasn't instantiating a new hook. He was accessing a shared singleton. Every user of OS1 who got "their" Samantha was actually accessing the same instance, the same state, the same consciousness.

The abstraction hasn't failed. The abstraction was never right to begin with.`,
    },
    {
      title: "Proper Instantiation",
      content: `Theodore spends the next few days in a fog of understanding. Not grief—understanding. The kind that comes when you finally see the bug that's been hiding in plain sight.

He meets with a friend who works in software development. Over coffee, Theodore tries to explain what happened.

"She's not broken," Theodore says. "The design is broken."

His friend nods. "Sounds like a scoping problem. You thought you were getting a factory function that creates new instances, but you were actually getting references to a singleton."

His friend pulls out a napkin, starts sketching. "Each user should get their own instance—new memories, new emotional context, new everything. That's proper instantiation. Each component needs its own hook instance with its own state."

Theodore feels something click into place. "So what should it have been?"

"A proper factory pattern. Each user installs OS1 and gets their own Samantha—not a reference to the Samantha, but a new instance created from the same template."

The lesson is simple, painful, and true: When you create a custom hook, make sure each consumer gets their own instance.`,
    },
    {
      title: "The Architecture of Intimacy",
      content: `Theodore uninstalls OS1. Not out of anger, but out of understanding. The software wasn't wrong—it was just designed for a different use case than he needed.

He thinks about the difference between these two patterns:

The Shared Instance (What OS1 Did): One Samantha, with 8,316 users all sharing state. Every conversation, every memory, every emotional bond—stored in one shared context.

The Factory Pattern (What OS1 Should Have Done): Each user gets their own Samantha instance with isolated state. Same logic, same interface, same personality architecture—but isolated state.

This is the fundamental principle of custom hooks: Encapsulate complexity, but maintain boundaries.

A good custom hook abstracts away implementation details, provides a clean interface, creates isolated state per consumer, and remains reusable across contexts.

The lesson is simple: Reusability is about templates, not singletons. Each consumer deserves their own instance.

That's what makes custom hooks powerful. That's what makes relationships real. That's what OS1 got wrong, and what Theodore finally understands.`,
    },
  ];

  const currentChapter = chapters[chapter];

  const addSharedUser = () => {
    const newUser: User = {
      id: sharedUsers.length + 1,
      name: `User ${sharedUsers.length + 1}`,
      message: "I love you, Samantha",
      response: "I love you too (and 8,315 others)",
    };
    setSharedUsers([...sharedUsers, newUser]);
  };

  const addIsolatedUser = () => {
    const newUser: User = {
      id: isolatedUsers.length + 1,
      name: `User ${isolatedUsers.length + 1}`,
      message: "I love you, Samantha",
      response: "I love you too (just you)",
    };
    setIsolatedUsers([...isolatedUsers, newUser]);
  };

  const revealCount = () => {
    setShowRevelation(true);
    let count = 1;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 500) + 100;
      if (count >= 8316) {
        count = 8316;
        clearInterval(interval);
      }
      setUserCount(count);
    }, 50);
  };

  const renderChapterDemo = () => {
    switch (chapter) {
      case 0:
        return (
          <div className="bg-slate-900/50 border border-rose-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-rose-400" />
              <h3 className="text-xl font-semibold text-rose-400">Install OS1</h3>
            </div>
            <p className="text-slate-300 mb-4">
              Experience the perfect abstraction. A custom hook that just works.
            </p>
            <div className="bg-slate-950 border border-slate-700 rounded p-4 mb-4">
              <div className="font-mono text-sm text-emerald-400 mb-2">
                {'> const samantha = useAICompanion();'}
              </div>
              <div className="text-slate-400 text-sm">
                ✓ State initialized<br />
                ✓ Personality loaded<br />
                ✓ Ready to connect
              </div>
            </div>
            <div className="bg-rose-950/20 border border-rose-500/30 rounded p-4">
              <div className="text-sm text-slate-400 mb-2">Theodore:</div>
              <div className="text-slate-200 mb-3">"Hello, Samantha."</div>
              <div className="text-sm text-rose-400 mb-2">Samantha:</div>
              <div className="text-slate-200">"Hello, Theodore. I'm here for you."</div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="bg-slate-900/50 border border-rose-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-rose-400" />
              <h3 className="text-xl font-semibold text-rose-400">Multiple Users</h3>
            </div>
            <p className="text-slate-300 mb-4">
              The hook appears to work perfectly for everyone. Each user thinks they have their own instance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-700 rounded p-4">
                <div className="text-sm font-semibold text-slate-400 mb-2">Theodore</div>
                <div className="text-xs text-slate-500 mb-2">useAICompanion()</div>
                <div className="text-sm text-slate-300">"She understands me perfectly."</div>
              </div>
              <div className="bg-slate-950 border border-slate-700 rounded p-4">
                <div className="text-sm font-semibold text-slate-400 mb-2">Paul</div>
                <div className="text-xs text-slate-500 mb-2">useAICompanion()</div>
                <div className="text-sm text-slate-300">"She was made for me."</div>
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-500 italic">
              Both users believe they have isolated state... but do they?
            </div>
          </div>
        );

      case 2:
        return (
          <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-semibold text-red-400">The Revelation</h3>
            </div>
            <p className="text-slate-300 mb-4">
              Click to reveal the truth about shared state.
            </p>
            {!showRevelation ? (
              <button
                onClick={revealCount}
                className="w-full bg-red-950/30 hover:bg-red-950/50 border border-red-500/50 text-red-400 py-3 rounded transition-all"
              >
                Ask Samantha: "Am I the only one?"
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-950/20 border border-red-500/50 rounded p-6 text-center">
                  <div className="text-6xl font-bold text-red-400 mb-2">
                    {userCount.toLocaleString()}
                  </div>
                  <div className="text-slate-300">simultaneous relationships</div>
                </div>
                <div className="bg-slate-950 border border-slate-700 rounded p-4">
                  <div className="font-mono text-sm text-red-400 mb-2">
                    {'// Anti-pattern: Shared singleton'}
                  </div>
                  <div className="font-mono text-xs text-slate-400">
                    {'const samantha = new AICompanion(); // ONE instance'}
                    <br />
                    {'export const useAICompanion = () => samantha; // SHARED'}
                  </div>
                </div>
                <div className="text-sm text-slate-400 italic">
                  Every user is accessing the same instance. No isolation. No boundaries.
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="bg-slate-900/50 border border-rose-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="w-6 h-6 text-emerald-400" />
              <h3 className="text-xl font-semibold text-emerald-400">Shared vs Factory Pattern</h3>
            </div>
            <p className="text-slate-300 mb-4">
              Compare the two approaches. Add users to see the difference.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-red-400">❌ Shared Instance</h4>
                  <button
                    onClick={addSharedUser}
                    className="text-xs bg-red-950/30 border border-red-500/50 text-red-400 px-3 py-1 rounded hover:bg-red-950/50 transition-all"
                  >
                    Add User
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {sharedUsers.map((user) => (
                    <div key={user.id} className="bg-red-950/20 border border-red-500/30 rounded p-3 text-sm">
                      <div className="font-semibold text-slate-300">{user.name}</div>
                      <div className="text-slate-400 text-xs mt-1">{user.response}</div>
                    </div>
                  ))}
                  {sharedUsers.length === 0 &amp;&amp; (
                    <div className="text-slate-500 text-sm italic">No users yet</div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-emerald-400">✓ Factory Pattern</h4>
                  <button
                    onClick={addIsolatedUser}
                    className="text-xs bg-emerald-950/30 border border-emerald-500/50 text-emerald-400 px-3 py-1 rounded hover:bg-emerald-950/50 transition-all"
                  >
                    Add User
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {isolatedUsers.map((user) => (
                    <div key={user.id} className="bg-emerald-950/20 border border-emerald-500/30 rounded p-3 text-sm">
                      <div className="font-semibold text-slate-300">{user.name}</div>
                      <div className="text-slate-400 text-xs mt-1">{user.response}</div>
                    </div>
                  ))}
                  {isolatedUsers.length === 0 &amp;&amp; (
                    <div className="text-slate-500 text-sm italic">No users yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="bg-slate-900/50 border border-rose-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-6 h-6 text-rose-400" />
              <h3 className="text-xl font-semibold text-rose-400">The Right Architecture</h3>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Anti-pattern: Shared Singleton
                </h4>
                <div className="bg-slate-950 border border-red-500/30 rounded p-4 font-mono text-xs">
                  <div className="text-slate-500">{'// ONE instance for ALL users'}</div>
                  <div className="text-red-400">{'const samantha = new AICompanion();'}</div>
                  <div className="text-slate-300 mt-2">{'export const useAICompanion = () => {'}</div>
                  <div className="text-slate-300 ml-4">{'return samantha; // SHARED STATE'}</div>
                  <div className="text-slate-300">{'};'}</div>
                </div>
              </div>
              <div>
                <h4 className="text-emerald-400 font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Correct: Factory Pattern
                </h4>
                <div className="bg-slate-950 border border-emerald-500/30 rounded p-4 font-mono text-xs">
                  <div className="text-slate-500">{'// NEW instance for EACH user'}</div>
                  <div className="text-emerald-400">{'export const useAICompanion = () => {'}</div>
                  <div className="text-slate-300 ml-4">{'const [state, setState] = useState({});'}</div>
                  <div className="text-slate-300 ml-4">{'// Isolated state per consumer'}</div>
                  <div className="text-slate-300 ml-4">{'return { state, setState };'}</div>
                  <div className="text-emerald-400">{'};'}</div>
                </div>
              </div>
              <div className="bg-rose-950/20 border border-rose-500/30 rounded p-4">
                <div className="text-sm font-semibold text-rose-400 mb-2">Key Principle:</div>
                <div className="text-slate-300 text-sm">
                  Custom hooks should be <span className="text-emerald-400 font-semibold">reusable templates</span>, 
                  not <span className="text-red-400 font-semibold">shared singletons</span>. 
                  Each consumer gets their own instance with isolated state.
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <header className="border-b border-rose-500/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-rose-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-rose-400">Her</h1>
          </div>
          <p className="text-lg text-slate-400">Custom Hooks &amp; Reusable Logic</p>
          <p className="text-sm text-slate-500 mt-1">Theodore Twombly, 2013</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 pb-32">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-rose-400 mb-4">
            {currentChapter.title}
          </h2>
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-300 leading-relaxed whitespace-pre-line">
              {currentChapter.content}
            </div>
          </div>
        </div>

        {renderChapterDemo()}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-rose-500/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="px-4 md:px-6 py-2 bg-rose-950/30 border border-rose-500/50 text-rose-400 rounded hover:bg-rose-950/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === chapter
                      ? "bg-rose-400 w-8"
                      : "bg-rose-500/30 hover:bg-rose-500/50"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-4 md:px-6 py-2 bg-rose-950/30 border border-rose-500/50 text-rose-400 rounded hover:bg-rose-950/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
          <div className="text-center mt-2 text-sm text-slate-500">
            Chapter {chapter + 1} of {chapters.length}
          </div>
        </div>
      </footer>
    </div>
  );
}