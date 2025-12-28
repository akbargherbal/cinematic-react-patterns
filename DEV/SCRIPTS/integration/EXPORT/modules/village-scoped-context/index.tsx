import { useState, useMemo } from "react";
import { Shield, Users, ArrowRight, Layers, GitBranch } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function VillageModule() {
  const [chapter, setChapter] = useState(0);
  const [boundaryPosition, setBoundaryPosition] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "The Boundary Keepers",
        content: `The village of Covington exists within walls. Not metaphorical walls—actual wooden barriers that mark where safety ends and terror begins. Beyond those boundaries, the elders say, creatures dwell in the woods. Creatures that wear red cloaks. Creatures that will come if you venture too far.

Every villager knows this truth. It is not taught through lengthy explanation but absorbed through the very air they breathe. Children learn it before they learn to read. Adults reference it in casual conversation. The context of their entire existence is shaped by this single, unquestioned reality: we are safe here, and only here.

The elders—Edward Walker, Alice Hunt, and the others—maintain this context with careful precision. They do not need to remind the villagers daily. The context simply exists, available to anyone who lives within the boundaries. It is the water the fish swim in, invisible until you try to imagine life without it.

This is the power of scoped context: within its boundaries, it feels absolute. Universal. True.

But here's what the villagers don't know, what they've never had reason to question: the boundaries are not natural features of the world. They are architectural decisions. The elders built the walls. The elders defined the scope. And most importantly—the elders chose what truth would exist within that scope.

In React terms, the village is a Context Provider. The story about the creatures is the context value. And every villager is a component consuming that context, believing it to be reality itself.`,
      },
      {
        id: "build",
        title: "The Inherited Truth",
        content: `Ivy Walker, blind since birth, navigates the village with a confidence that seems impossible. She cannot see the boundaries, yet she respects them. She cannot see the woods, yet she fears them. How?

She consumes the same context as everyone else.

In a React application, when you use useContext(VillageContext), you don't need to know how the context got to you. You don't need to trace the component tree upward to find the Provider. The context is simply available. This is the promise of Context API: frictionless access to shared state within a scope.

Watch how naturally the villagers reference the creatures: "We must not go to the woods." "The bad color attracts them." "They have made a truce with us, but we must not break it."

These aren't conscious retrievals of data. They're automatic. The context has become internalized, part of their mental model. This is what good context design achieves—it becomes invisible infrastructure.

But here's where developers often make a critical mistake: they assume this invisibility means the context is global. They forget about the Provider boundary.

The villagers make the same mistake. They've never had reason to think about the scope of their context because they've never approached its edge. The boundary wall is physical, yes, but more importantly, it's conceptual. It marks where the VillageContext Provider ends.`,
      },
      {
        id: "climax",
        title: "The Wall's Edge",
        content: `The moment Ivy crosses the boundary wall is the moment she leaves the Provider's scope.

In the film, this moment is shot with deliberate disorientation. The familiar sounds of the village fade. The context that has shaped her entire existence begins to dissolve. She is blind, yes, but she has always navigated by the context of her world—the sounds, the spaces, the shared understanding of what exists and what doesn't.

Now that context is... gone.

This is the exact experience of a React component trying to access context outside a Provider. The useContext hook doesn't throw an error. It doesn't crash your application. It simply returns undefined (or the default value you specified when creating the context). The context you expected to be there just... isn't.

And then she sees it: a paved road. A yellow truck. A park ranger in a modern uniform.

This is the moment of complete context dissolution. She's not in a context-less void. She's in a different context entirely. The modern world has its own Provider, its own values, its own truth. And those values directly contradict everything the village context told her.

The creatures don't exist. The year isn't 1897. The danger isn't supernatural—it's cars and highways and the mundane threats of contemporary life.`,
      },
      {
        id: "resolution",
        title: "Two Worlds, Two Truths",
        content: `Ivy returns to the village with the medicine, and the elders face a choice: tell her the truth, or maintain the context.

Edward Walker, her father, chooses truth. He explains the architecture.

The village was founded by people who had suffered tragedy in the modern world. They purchased this land, built the boundaries, and created a new context—deliberately, intentionally. They fabricated the creatures to keep everyone within the scope. They chose 1897 as their context value for "current year." They designed every aspect of the Provider.

This is the revelation that transforms Ivy's understanding: context isn't discovered, it's designed.

Within the village, the context works perfectly. It provides safety, community, simplicity. The villagers who never leave the Provider's scope live their entire lives with a consistent, functional context. They're not suffering from a bug—they're experiencing the intended design.

The modern world outside has a different context. Also not "wrong"—just different. Different Provider, different values, different scope.

Multiple Providers can coexist. Each Provider creates its own scope. Each provides its own values. A component can consume multiple contexts simultaneously, just as Ivy now understands both the village context and the modern world context.`,
      },
      {
        id: "summary",
        title: "The Architecture of Belief",
        content: `Let's synthesize what The Village teaches us about Context scope and Provider boundaries in React.

The Core Lesson: Context Is Scoped, Not Global

The village's boundaries are not the edges of reality—they're the edges of a Provider's scope. When you use Context API, you're not creating global state. You're creating scoped state. The scope is defined by where you place the Provider in your component tree.

Inside the Provider: Components can access context values via useContext(). The values feel "global" because they're available without prop drilling.

Outside the Provider: Components get undefined (or default values). The context simply doesn't exist in that scope.

Architectural Decisions Matter

The village elders didn't stumble into their context design—they architected it deliberately. In React, you make the same decisions: where to place the Provider, what values to provide, how to maintain consistency.

The placement of that Provider tag is an architectural decision with real consequences.

Design Your Boundaries Intentionally

Place your Providers intentionally: Too high in the tree? You're providing context to components that don't need it. Too low in the tree? Components that need the context can't access it.

The architecture should serve your application's needs, just as the village's architecture served the elders' goals.`,
      },
    ],
    []
  );

  const currentChapter = chapters[chapter];

  const handlePrevious = () => {
    if (chapter > 0) setChapter(chapter - 1);
  };

  const handleNext = () => {
    if (chapter < chapters.length - 1) setChapter(chapter + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-serif">
      {/* Header */}
      <header className="border-b border-amber-900/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-amber-600" />
            <h1 className="text-4xl font-bold text-amber-500">The Village</h1>
          </div>
          <p className="text-lg text-slate-400">
            Ivy Walker, Covington, 1897 (2004)
          </p>
          <p className="text-sm text-amber-600/80 mt-1">
            Context Scope &amp; Provider Boundaries
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-amber-400 mb-2">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 bg-amber-600/50 rounded"></div>
        </div>

        {/* Chapter Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="text-slate-300 leading-relaxed whitespace-pre-line text-lg">
            {currentChapter.content}
          </div>
        </div>

        {/* Interactive Demonstrations */}
        <div className="bg-slate-900/50 border border-amber-900/30 rounded-lg p-8">
          {chapter === 0 &amp;&amp; (
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                The Provider Boundary
              </h3>
              <div className="relative">
                <div className="border-4 border-amber-600/50 rounded-lg p-8 bg-amber-950/20">
                  <div className="text-center mb-6">
                    <div className="inline-block px-4 py-2 bg-amber-600/20 border border-amber-600/50 rounded text-amber-400 font-mono text-sm mb-4">
                      &lt;VillageProvider value=&#123;&#123; creatures: true, year: 1897 &#125;&#125;&gt;
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Ivy", "Lucius", "Noah"].map((name) => (
                      <div
                        key={name}
                        className="bg-slate-800/50 border border-amber-600/30 rounded p-4 text-center"
                      >
                        <Users className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                        <div className="text-amber-300 font-semibold mb-1">
                          {name}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">
                          useContext(VillageContext)
                        </div>
                        <div className="text-xs text-emerald-400 mt-2">
                          ✓ Has access
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="text-center mt-6">
                    <div className="inline-block px-4 py-2 bg-amber-600/20 border border-amber-600/50 rounded text-amber-400 font-mono text-sm">
                      &lt;/VillageProvider&gt;
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-slate-800/30 border border-slate-700/50 rounded">
                  <div className="text-center">
                    <Users className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                    <div className="text-slate-500 font-semibold mb-1">
                      Park Ranger
                    </div>
                    <div className="text-xs text-slate-600 font-mono">
                      useContext(VillageContext)
                    </div>
                    <div className="text-xs text-red-400 mt-2">
                      ✗ Returns undefined
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                Components inside the Provider can access context. Components
                outside cannot.
              </p>
            </div>
          )}

          {chapter === 1 &amp;&amp; (
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Context Inheritance Tree
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-amber-600/50 pl-6">
                  <div
                    className={`p-4 rounded cursor-pointer transition-all ${
                      selectedComponent === "provider"
                        ? "bg-amber-600/20 border-2 border-amber-600/50"
                        : "bg-slate-800/30 border border-slate-700/50"
                    }`}
                    onClick={() => setSelectedComponent("provider")}
                  >
                    <div className="font-mono text-sm text-amber-400 mb-2">
                      VillageProvider
                    </div>
                    <div className="text-xs text-slate-400">
                      Provides: &#123; creatures: true, danger: "woods", year:
                      1897 &#125;
                    </div>
                  </div>
                  <div className="ml-8 mt-4 space-y-3">
                    {["Ivy", "Lucius", "Noah"].map((name) => (
                      <div
                        key={name}
                        className={`p-3 rounded cursor-pointer transition-all ${
                          selectedComponent === name
                            ? "bg-amber-600/20 border-2 border-amber-600/50"
                            : "bg-slate-800/30 border border-slate-700/50"
                        }`}
                        onClick={() => setSelectedComponent(name)}
                      >
                        <div className="font-mono text-sm text-amber-300">
                          {name} Component
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          const context = useContext(VillageContext)
                        </div>
                        {selectedComponent === name &amp;&amp; (
                          <div className="mt-2 p-2 bg-slate-900/50 rounded text-xs text-emerald-400 font-mono">
                            context.creatures === true
                            <br />
                            context.danger === "woods"
                            <br />
                            context.year === 1897
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                Click components to see how they inherit context automatically.
                No prop drilling needed.
              </p>
            </div>
          )}

          {chapter === 2 &amp;&amp; (
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Crossing the Boundary
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-400 whitespace-nowrap">
                    Inside Village
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={boundaryPosition}
                    onChange={(e) =>
                      setBoundaryPosition(Number(e.target.value))
                    }
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, rgb(217 119 6 / 0.3) 0%, rgb(217 119 6 / 0.3) ${boundaryPosition}%, rgb(51 65 85) ${boundaryPosition}%, rgb(51 65 85) 100%)`,
                    }}
                  />
                  <span className="text-sm text-slate-400 whitespace-nowrap">
                    Outside Village
                  </span>
                </div>
                <div className="relative h-64 bg-slate-800/30 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-amber-950/30 border-r-4 border-amber-600/50 transition-all duration-300"
                    style={{ width: `${100 - boundaryPosition}%` }}
                  >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                      <Users className="w-12 h-12 text-amber-500 mx-auto mb-2" />
                      <div className="text-amber-300 font-semibold">Ivy</div>
                      <div className="text-xs text-slate-400 font-mono mt-2">
                        useContext(VillageContext)
                      </div>
                      {boundaryPosition < 50 &amp;&amp; (
                        <div className="mt-2 p-2 bg-slate-900/50 rounded text-xs text-emerald-400">
                          ✓ Context available
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="absolute inset-y-0 right-0 bg-slate-900/50 transition-all duration-300"
                    style={{ width: `${boundaryPosition}%` }}
                  >
                    {boundaryPosition > 50 &amp;&amp; (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <Users className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                        <div className="text-slate-500 font-semibold">Ivy</div>
                        <div className="text-xs text-slate-600 font-mono mt-2">
                          useContext(VillageContext)
                        </div>
                        <div className="mt-2 p-2 bg-slate-900/50 rounded text-xs text-red-400">
                          ✗ Returns undefined
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                Drag the slider to simulate crossing the Provider boundary.
                Watch context dissolve.
              </p>
            </div>
          )}

          {chapter === 3 &amp;&amp; (
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Two Contexts, Two Truths
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-amber-600/50 rounded-lg p-6 bg-amber-950/20">
                  <div className="text-center mb-4">
                    <Shield className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <div className="font-mono text-sm text-amber-400 mb-2">
                      VillageProvider
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-slate-900/30 rounded">
                      <span className="text-slate-400">creatures:</span>
                      <span className="text-emerald-400 font-mono">true</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-900/30 rounded">
                      <span className="text-slate-400">danger:</span>
                      <span className="text-amber-400 font-mono">"woods"</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-900/30 rounded">
                      <span className="text-slate-400">year:</span>
                      <span className="text-amber-400 font-mono">1897</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-slate-800/50 rounded">
                    <Users className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <div className="text-center text-amber-300 text-sm">
                      Ivy (inside village)
                    </div>
                  </div>
                </div>
                <div className="border-2 border-slate-600/50 rounded-lg p-6 bg-slate-900/50">
                  <div className="text-center mb-4">
                    <Users className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <div className="font-mono text-sm text-slate-400 mb-2">
                      ModernWorldProvider
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between p-2 bg-slate-800/30 rounded">
                      <span className="text-slate-400">creatures:</span>
                      <span className="text-red-400 font-mono">false</span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-800/30 rounded">
                      <span className="text-slate-400">danger:</span>
                      <span className="text-slate-400 font-mono">
                        "traffic"
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-slate-800/30 rounded">
                      <span className="text-slate-400">year:</span>
                      <span className="text-slate-400 font-mono">2004</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-slate-800/50 rounded">
                    <Users className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                    <div className="text-center text-slate-400 text-sm">
                      Park Ranger (outside village)
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                Two different Providers, two different contexts. Both valid
                within their scopes.
              </p>
            </div>
          )}

          {chapter === 4 &amp;&amp; (
            <div>
              <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Nested Provider Architecture
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-amber-600/50 rounded-lg p-6 bg-amber-950/20">
                  <div className="font-mono text-sm text-amber-400 mb-4">
                    &lt;AppProvider&gt;
                  </div>
                  <div className="ml-6 border-2 border-amber-600/40 rounded-lg p-4 bg-amber-950/10">
                    <div className="font-mono text-sm text-amber-400 mb-4">
                      &lt;ThemeProvider&gt;
                    </div>
                    <div className="ml-6 border-2 border-amber-600/30 rounded-lg p-4 bg-amber-950/10">
                      <div className="font-mono text-sm text-amber-400 mb-4">
                        &lt;UserProvider&gt;
                      </div>
                      <div className="ml-6 p-3 bg-slate-800/50 rounded border border-amber-600/20">
                        <Users className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                        <div className="text-center text-amber-300 text-sm">
                          Component
                        </div>
                        <div className="text-xs text-slate-400 text-center mt-2">
                          Can access all three contexts
                        </div>
                      </div>
                      <div className="font-mono text-sm text-amber-400 mt-4">
                        &lt;/UserProvider&gt;
                      </div>
                    </div>
                    <div className="font-mono text-sm text-amber-400 mt-4">
                      &lt;/ThemeProvider&gt;
                    </div>
                  </div>
                  <div className="font-mono text-sm text-amber-400 mt-4">
                    &lt;/AppProvider&gt;
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded">
                    <div className="text-amber-400 font-semibold mb-2 text-sm">
                      Outer Provider
                    </div>
                    <div className="text-xs text-slate-400">
                      Widest scope, available to all nested components
                    </div>
                  </div>
                  <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded">
                    <div className="text-amber-400 font-semibold mb-2 text-sm">
                      Middle Provider
                    </div>
                    <div className="text-xs text-slate-400">
                      Can override outer values, adds new context
                    </div>
                  </div>
                  <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded">
                    <div className="text-amber-400 font-semibold mb-2 text-sm">
                      Inner Provider
                    </div>
                    <div className="text-xs text-slate-400">
                      Most specific scope, highest priority
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-6 text-center">
                Providers can be nested. Inner Providers can override outer
                values. Design your scope hierarchy intentionally.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-amber-900/30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="px-6 py-2 bg-amber-600/20 border border-amber-600/50 rounded text-amber-400 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-600/30 transition-colors"
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
                      ? "bg-amber-500 w-8"
                      : "bg-amber-900/50 hover:bg-amber-700/50"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-amber-600/20 border border-amber-600/50 rounded text-amber-400 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-600/30 transition-colors"
            >
              Next
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}