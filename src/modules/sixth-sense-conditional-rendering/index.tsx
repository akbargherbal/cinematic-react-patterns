import { useState, useMemo, useCallback } from "react";
import { Eye, Ghost, Zap, AlertTriangle, CheckCircle, Code } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function SixthSenseModule() {
  const [chapter, setChapter] = useState(0);
  const [isAlive, setIsAlive] = useState(false);
  const [showGhostOverlay, setShowGhostOverlay] = useState(true);
  const [ghostCount, setGhostCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);

  const chapters: Chapter[] = useMemo(() => [
    {
      id: "intro",
      title: "I See Dead Components",
      content: `Cole Sear sits in the church pew, small hands gripping the wood, eyes wide with terror. "I see dead people," he whispers to Dr. Malcolm Crowe, the child psychologist who's been trying to help him.

But Cole isn't just seeing ghosts. He's seeing something far more insidious in the world of React applications: components that should be unmounted but are still rendering.

Malcolm leans forward, concerned, professional. He's been working with Cole for weeks now, trying to understand this strange affliction. What Malcolm doesn't know—what he can't know yet—is that he himself is one of these ghost components.

In React, we control whether components exist in the tree through conditional rendering. It's not about hiding things with CSS. It's not about setting display: none or opacity: 0. It's about whether the component should exist at all.`
    },
    {
      id: "build",
      title: "The Condition That Wasn't Checked",
      content: `Malcolm Crowe goes about his work with dedication and purpose. He attends sessions with Cole. He reviews his notes. He goes home to his wife Anna each night, watching her sleep, trying to reconnect with a marriage that feels distant and cold.

But there's something wrong with every interaction. Something subtly, persistently broken.

Anna doesn't respond when he speaks. She sits at restaurants alone, even when he's sitting across from her. It's as if he's not there. As if he's...

This is the anti-pattern. This is where everything went wrong. Conditional rendering isn't about visibility—it's about existence. When you write <Component /> without a condition, that component always renders. It's always in the React tree. It's always executing its effects, always consuming memory, always trying to interact with the world around it.`
    },
    {
      id: "climax",
      title: "Haunted by Bad Logic",
      content: `Cole's fear is reaching a breaking point. The ghost components are everywhere, and they're getting more aggressive. They don't just render—they demand attention, they try to force interactions, they create chaos in the component tree.

"They don't know they're dead," Cole tells Malcolm, his voice breaking. "They only see what they want to see."

This is the core problem with improper conditional rendering. The components don't know they shouldn't exist. They continue executing as if everything is normal, as if their condition is still true, as if they still belong in the tree.

The consequences are mounting: performance degradation, stale state and closures, broken event propagation, memory leaks everywhere. Each ghost component is a memory leak. They're never garbage collected because they're still in the tree.`
    },
    {
      id: "resolution",
      title: "The Twist: Evaluating the Condition",
      content: `Malcolm sits in his home, watching a video of his session with Vincent Grey from years ago. The former patient who broke into his house. The one who shot him and then shot himself.

And then it happens. The condition is finally evaluated correctly.

He's been dead the entire time.

The component should have been unmounted in the opening scene. When Vincent Grey shot him, that's when isAlive became false. That's when the conditional should have prevented him from rendering.

But it didn't. The condition was never checked. Malcolm kept rendering, kept executing, kept trying to interact with a world that had moved on without him.

Now, rewinding through the entire narrative with the correct conditional logic, everything makes sense. Anna wasn't ignoring him—he wasn't there. The component wasn't in the tree.`
    },
    {
      id: "summary",
      title: "Conditional Clarity",
      content: `Cole Sear walks through the world with new understanding. He still sees dead people—still sees ghost components rendering when they shouldn't exist—but now he knows what to do with them.

He knows how to help them unmount properly.

The entire narrative is a masterclass in what happens when conditional rendering logic is wrong. Malcolm Crowe was a component that should have been unmounted in the opening scene, but the condition was never checked.

Before rendering a component, ask: Should this component exist right now? Is there a condition that determines its existence? Am I checking that condition correctly?

"I see dead people" becomes "I prevent dead components." Check your conditions. Understand component existence versus visibility. Implement proper cleanup.`
    }
  ], []);

  const currentChapter = chapters[chapter];

  const handlePrevious = useCallback(() => {
    setChapter(c => Math.max(0, c - 1));
  }, []);

  const handleNext = useCallback(() => {
    setChapter(c => Math.min(chapters.length - 1, c + 1));
  }, [chapters.length]);

  const toggleCondition = useCallback(() => {
    setIsAlive(prev => !prev);
    if (!isAlive) {
      setEffectCount(prev => prev + 1);
    }
  }, [isAlive]);

  const addGhostComponent = useCallback(() => {
    setGhostCount(prev => prev + 1);
  }, []);

  const clearGhosts = useCallback(() => {
    setGhostCount(0);
    setEffectCount(0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-serif">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-4">
            <Ghost className="w-12 h-12 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
                The Sixth Sense
              </h1>
              <p className="text-lg sm:text-xl text-amber-500 mb-1">
                Malcolm Crowe, Child Psychologist, 1999
              </p>
              <p className="text-base sm:text-lg text-slate-400">
                Conditional Rendering Logic
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-8 h-8 text-amber-500" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
              {currentChapter.title}
            </h2>
          </div>
          <div className="h-1 bg-gradient-to-r from-amber-500 via-red-500 to-transparent rounded-full" />
        </div>

        {/* Narrative Content */}
        <article className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="text-base sm:text-lg leading-relaxed whitespace-pre-line text-slate-300">
            {currentChapter.content}
          </div>
        </article>

        {/* Interactive Demonstrations */}
        {chapter === 0 &amp;&amp; (
          <section className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Code className="w-6 h-6 text-amber-500" />
                Ghost Component Detector
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Wrong Pattern */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-red-400">❌ Always Mounted</span>
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="bg-slate-950 border border-red-500/30 rounded p-4 font-mono text-sm">
                    <div className="text-slate-500">{'// Component always renders'}</div>
                    <div className="text-red-400">{'<MalcolmTherapist />'}</div>
                  </div>
                  <div className={`border rounded p-4 transition-all ${showGhostOverlay ? 'opacity-50 border-red-500/50 bg-red-950/20' : 'border-slate-700'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Ghost className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-semibold">Malcolm Component</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Still in tree, effects running, consuming memory...
                    </p>
                  </div>
                </div>

                {/* Right Pattern */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-emerald-400">✓ Conditionally Rendered</span>
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="bg-slate-950 border border-emerald-500/30 rounded p-4 font-mono text-sm">
                    <div className="text-slate-500">{'// Only renders when true'}</div>
                    <div className="text-emerald-400">{'isAlive &amp;&amp; <MalcolmTherapist />'}</div>
                  </div>
                  {isAlive ? (
                    <div className="border border-emerald-500 rounded p-4 bg-emerald-950/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-semibold">Malcolm Component</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Properly mounted, effects running correctly
                      </p>
                    </div>
                  ) : (
                    <div className="border border-slate-700 rounded p-4 bg-slate-900/50">
                      <p className="text-xs text-slate-500 italic text-center">
                        Component unmounted (not in tree)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={toggleCondition}
                  className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold transition-colors"
                >
                  Toggle isAlive: {isAlive ? 'true' : 'false'}
                </button>
                <button
                  onClick={() => setShowGhostOverlay(!showGhostOverlay)}
                  className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded font-semibold transition-colors"
                >
                  {showGhostOverlay ? 'Hide' : 'Show'} Ghost Overlay
                </button>
              </div>
            </div>
          </section>
        )}

        {chapter === 1 &amp;&amp; (
          <section className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-amber-500" />
                Side Effects Visualization
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-950 border-l-4 border-red-500 rounded p-4">
                  <div className="font-mono text-sm mb-3">
                    <div className="text-slate-500">{'useEffect(() => {'}</div>
                    <div className="text-red-400 ml-4">{'console.log("Malcolm interacting...");'}</div>
                    <div className="text-red-400 ml-4">{'// Effects run even when unmounted!'}</div>
                    <div className="text-slate-500">{'}, []);'}</div>
                  </div>
                  <div className="text-xs text-slate-400">
                    Effect execution count: <span className="text-red-400 font-bold">{effectCount}</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="border border-slate-700 rounded p-4">
                    <h4 className="text-sm font-semibold mb-2 text-slate-300">Anna's Perspective</h4>
                    <p className="text-xs text-slate-400">
                      She's alone at the restaurant. No husband component in her tree. Props don't include Malcolm.
                    </p>
                  </div>
                  <div className="border border-red-500/30 rounded p-4 bg-red-950/10">
                    <h4 className="text-sm font-semibold mb-2 text-slate-300">Malcolm's Perspective</h4>
                    <p className="text-xs text-slate-400">
                      Trying to interact, but handlers fire in invalid context. Stale closures reference old state.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {chapter === 2 &amp;&amp; (
          <section className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                Memory Leak Accumulation
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-950 border border-red-500/30 rounded p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold">Ghost Components in Tree</span>
                    <span className="text-2xl font-bold text-red-500">{ghostCount}</span>
                  </div>
                  
                  <div className="h-4 bg-slate-800 rounded-full overflow-hidden mb-4">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 via-red-500 to-red-700 transition-all duration-500"
                      style={{ width: `${Math.min(ghostCount * 10, 100)}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {Array.from({ length: ghostCount }).map((_, i) => (
                      <div key={i} className="border border-red-500/50 rounded p-2 bg-red-950/20 opacity-50">
                        <Ghost className="w-4 h-4 text-red-500 mx-auto" />
                        <p className="text-xs text-center mt-1">Ghost {i + 1}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={addGhostComponent}
                      disabled={ghostCount >= 10}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded text-sm font-semibold transition-colors"
                    >
                      Add Ghost Component
                    </button>
                    <button
                      onClick={clearGhosts}
                      className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-sm font-semibold transition-colors"
                    >
                      Fix Conditionals (Clear)
                    </button>
                  </div>
                </div>

                <div className="text-xs text-slate-400 space-y-1">
                  <p>• Each ghost component consumes memory</p>
                  <p>• Effects continue running unnecessarily</p>
                  <p>• Event listeners never removed</p>
                  <p>• Performance degrades with accumulation</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {chapter === 3 &amp;&amp; (
          <section className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Eye className="w-6 h-6 text-amber-500" />
                The Revelation: Before &amp; After
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-red-400">Before: Wrong Condition</span>
                  </div>
                  <div className="bg-slate-950 border border-red-500/30 rounded p-4 font-mono text-xs">
                    <div className="text-slate-500">{'const isAlive = false;'}</div>
                    <div className="text-red-400 mt-2">{'// Always renders!'}</div>
                    <div className="text-red-400">{'<MalcolmTherapist />'}</div>
                  </div>
                  <div className="border border-red-500/50 rounded p-3 bg-red-950/20">
                    <p className="text-xs text-slate-300 mb-2">Consequences:</p>
                    <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                      <li>Component stays in tree</li>
                      <li>Effects keep running</li>
                      <li>Memory never freed</li>
                      <li>Stale closures persist</li>
                    </ul>
                  </div>
                </div>

                {/* After */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold text-emerald-400">After: Correct Condition</span>
                  </div>
                  <div className="bg-slate-950 border border-emerald-500/30 rounded p-4 font-mono text-xs">
                    <div className="text-slate-500">{'const isAlive = false;'}</div>
                    <div className="text-emerald-400 mt-2">{'// Properly conditional'}</div>
                    <div className="text-emerald-400">{'isAlive &amp;&amp; <MalcolmTherapist />'}</div>
                  </div>
                  <div className="border border-emerald-500/50 rounded p-3 bg-emerald-950/20">
                    <p className="text-xs text-slate-300 mb-2">Results:</p>
                    <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                      <li>Component unmounts cleanly</li>
                      <li>Cleanup effects run</li>
                      <li>Memory freed properly</li>
                      <li>No ghost components</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-950/20 border border-amber-500/30 rounded">
                <p className="text-sm text-amber-200">
                  <strong>The Twist:</strong> Malcolm was dead from the opening scene. The condition was false from frame one, but it was never checked. Once properly evaluated, he could finally unmount.
                </p>
              </div>
            </div>
          </section>
        )}

        {chapter === 4 &amp;&amp; (
          <section className="space-y-6">
            <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-emerald-500" />
                Pattern Reference Guide
              </h3>
              
              <div className="space-y-6">
                {/* Pattern 1 */}
                <div className="border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-emerald-400">✓ Conditional Rendering</span>
                    <span className="text-xs text-slate-500">Recommended</span>
                  </div>
                  <div className="bg-slate-950 rounded p-3 font-mono text-xs mb-2">
                    <div className="text-emerald-400">{'condition &amp;&amp; <Component />'}</div>
                  </div>
                  <p className="text-xs text-slate-400">
                    Component only exists when condition is true. Removed from tree when false. Effects don't run. Memory freed.
                  </p>
                </div>

                {/* Pattern 2 */}
                <div className="border border-slate-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-emerald-400">✓ Ternary Conditional</span>
                    <span className="text-xs text-slate-500">Recommended</span>
                  </div>
                  <div className="bg-slate-950 rounded p-3 font-mono text-xs mb-2">
                    <div className="text-emerald-400">{'condition ? <ComponentA /> : <ComponentB />'}</div>
                  </div>
                  <p className="text-xs text-slate-400">
                    Render one component or another based on condition. Both properly mount/unmount.
                  </p>
                </div>

                {/* Anti-Pattern 1 */}
                <div className="border border-red-500/30 rounded-lg p-4 bg-red-950/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-red-400">❌ Always Mounted</span>
                    <span className="text-xs text-red-500">Avoid</span>
                  </div>
                  <div className="bg-slate-950 rounded p-3 font-mono text-xs mb-2">
                    <div className="text-red-400">{'<Component />'}</div>
                  </div>
                  <p className="text-xs text-slate-400">
                    Component always in tree regardless of state. Creates ghost components.
                  </p>
                </div>

                {/* Anti-Pattern 2 */}
                <div className="border border-red-500/30 rounded-lg p-4 bg-red-950/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-red-400">❌ CSS Hiding</span>
                    <span className="text-xs text-red-500">Avoid</span>
                  </div>
                  <div className="bg-slate-950 rounded p-3 font-mono text-xs mb-2">
                    <div className="text-red-400">{'<Component style={{display: condition ? "block" : "none"}} />'}</div>
                  </div>
                  <p className="text-xs text-slate-400">
                    Component stays mounted, just hidden. Effects still run. Memory not freed.
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-800 rounded border border-slate-700">
                <p className="text-sm text-slate-300 font-semibold mb-2">Key Takeaway:</p>
                <p className="text-sm text-slate-400">
                  Conditional rendering controls <strong className="text-amber-400">existence</strong>, not visibility. 
                  Check your conditions. Prevent ghost components. Let components unmount properly.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="px-4 sm:px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded font-semibold transition-colors text-sm sm:text-base"
              aria-label="Previous chapter"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="flex gap-1">
                {chapters.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === chapter ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="px-4 sm:px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded font-semibold transition-colors text-sm sm:text-base"
              aria-label="Next chapter"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}