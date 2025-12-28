import { useState, useMemo } from "react";
import { Users, GitBranch, AlertTriangle, CheckCircle, Home } from "lucide-react";

export default function ParasiteComponentInjection() {
  const [chapter, setChapter] = useState(0);
  const [injected, setInjected] = useState(false);
  const [injectedMembers, setInjectedMembers] = useState<string[]>([]);
  const [cleanupEnabled, setCleanupEnabled] = useState(true);
  const [collisionActive, setCollisionActive] = useState(false);

  const chapters = useMemo(() => [
    {
      title: "The Composition Pattern",
      icon: Home,
      content: `The Park family home sits pristine on a hillside, a monument to clean architecture. Every room flows into the next with intentional design. The household operates like a well-structured component tree: Mr. and Mrs. Park at the root, their children Da-song and Da-hye as nested elements, and carefully selected service providers as injected dependencies.

When Ki-woo Kim arrives for his interview, he carries a scholar's stone—a gift, a prop, a token of legitimacy. Mrs. Park examines him with the careful scrutiny of a parent component evaluating a child it's about to render.

"You come highly recommended," she says, holding the forged letter. In React terms, this is a reference prop—a pointer to another component vouching for his validity. She accepts the prop. She invokes the render.

Ki-woo is now part of the Park household's component tree. He's been passed as a child to the parent container. The composition is simple, elegant, contained.`,
    },
    {
      title: "Cascading Injection",
      icon: GitBranch,
      content: `The infiltration happens through a pattern React developers know well: component composition through recommendation. Each Kim family member gets injected by having the previous one pass them as a prop.

First, Ki-woo recommends his sister Ki-jung for art therapy. "I know someone," he tells Mrs. Park, and just like that, he's passing a new component to the parent. Mrs. Park accepts the prop. Ki-jung mounts.

The pattern repeats with surgical precision. Ki-jung engineers the driver's removal and recommends her father. Ki-taek notices the housekeeper's vulnerability and recommends his wife. Each Kim is a child component passed to the Park parent.

This is component composition at its most aggressive. They've nested themselves at every level of the household hierarchy, creating a deeply coordinated component tree that the Parks never see in full.`,
    },
    {
      title: "The Memory Leak",
      icon: AlertTriangle,
      content: `The doorbell rings at 11 PM. Moon-gwang stands there, drenched in rain, desperate. "I left something in the basement," she says.

This is the moment the Kims discover the truth about component lifecycle: Moon-gwang was never properly unmounted. She was removed from the visible rendering tree, yes—fired, sent away, seemingly gone. But she left something running.

In the basement, behind a hidden door, her husband Geun-sae has been living for four years. He's a memory leak in human form. A component that should have been garbage collected but wasn't.

When Moon-gwang was hired, she secretly injected her husband into the household's memory space. He's been running in the background, invisible to the Parks, consuming their resources, never properly cleaned up.

The technical parallel is exact: when you mount a component that creates subscriptions or event listeners, and then unmount without cleanup, those processes keep running. They persist in memory. They consume resources. They create leaks.`,
    },
    {
      title: "The Collision",
      icon: AlertTriangle,
      content: `And then the Parks come home early. Now you have two complete component trees trying to render in the same parent container at the same time.

The Kims scramble to hide. They're child components trying to unmount before the parent notices they were ever there. But Moon-gwang and Geun-sae are in the basement, and Moon-gwang has leverage now.

This is a race condition. Multiple component instances trying to occupy the same space, trying to control the same parent, trying to render simultaneously. In code, this causes unpredictable behavior, data corruption, crashes.

The next day is Da-song's birthday party. The Parks are rendering their perfect family celebration. But underneath, the corrupted component tree is still there.

And then Geun-sae emerges. He's been in the basement too long. The memory leak has become unstable. He crashes through the party with a knife, a component that's lost all connection to the system that spawned it.

The entire rendering tree collapses. This is what happens when you don't manage component lifecycle properly.`,
    },
    {
      title: "Proper Composition Architecture",
      icon: CheckCircle,
      content: `In the aftermath, Ki-woo begins to understand what went wrong—not morally, but architecturally. The Kim family's approach to component injection violated every principle of proper composition.

Lesson 1: Respect Component Boundaries. A child component should have a clear interface with its parent. It should receive props, render based on those props, and not try to control the parent's state.

Lesson 2: Always Clean Up on Unmount. Every component that creates side effects must clean them up. Event listeners must be removed. Timers must be cleared. Subscriptions must be cancelled.

Lesson 3: One Component Instance Per Slot. You can't have two component instances trying to control the same DOM node. You need clear ownership.

Lesson 4: Composition Requires Trust. The fundamental principle is that the parent trusts the children it renders. When that trust is violated, the system collapses.

Component composition through children props is one of React's most powerful patterns. But it requires discipline: respect boundaries, clean up side effects, maintain clear ownership, and honor the contract of composition.`,
    },
  ], []);

  const currentChapter = chapters[chapter];

  const resetDemos = () => {
    setInjected(false);
    setInjectedMembers([]);
    setCleanupEnabled(true);
    setCollisionActive(false);
  };

  const handleChapterChange = (newChapter: number) => {
    setChapter(newChapter);
    resetDemos();
  };

  const handleInjectMember = (member: string) => {
    if (!injectedMembers.includes(member)) {
      setInjectedMembers([...injectedMembers, member]);
    }
  };

  const memoryUsage = cleanupEnabled ? 25 : 75;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-2">
            <Users className="w-8 h-8 text-emerald-500" />
            <h1 className="text-4xl font-bold text-white">Parasite</h1>
          </div>
          <p className="text-lg text-slate-400">Component Injection & Children Props</p>
          <p className="text-sm text-emerald-500 mt-1">The Kim Family • 2019</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 pb-32">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Narrative Section */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <currentChapter.icon className="w-6 h-6 text-emerald-500" />
              <h2 className="text-2xl font-bold text-white">{currentChapter.title}</h2>
            </div>
            
            <div className="prose prose-invert max-w-none">
              {currentChapter.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-base leading-relaxed mb-4 text-slate-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Interactive Demonstration */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-emerald-400 mb-4">
                  Interactive Demo
                </h3>

                {/* Chapter 0: Basic Composition */}
                {chapter === 0 && (
                  <div className="space-y-4">
                    <div className="text-sm text-slate-400 mb-4">
                      Click to inject Ki-woo into the Park household component tree:
                    </div>
                    
                    <div className="bg-slate-900/50 border border-slate-700 rounded p-4">
                      <div className="font-mono text-xs text-slate-400 mb-3">
                        {'<ParkHousehold>'}
                      </div>
                      
                      {injected && (
                        <div className="ml-4 font-mono text-xs text-emerald-400 animate-fade-in">
                          {'  <EnglishTutor'}
                          <br />
                          {'    name="Ki-woo"'}
                          <br />
                          {'    credentials={verified}'}
                          <br />
                          {'  />'}
                        </div>
                      )}
                      
                      <div className="font-mono text-xs text-slate-400 mt-3">
                        {'</ParkHousehold>'}
                      </div>
                    </div>

                    <button
                      onClick={() => setInjected(!injected)}
                      className="w-full px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
                    >
                      {injected ? 'Remove Ki-woo' : 'Inject Ki-woo'}
                    </button>

                    {injected && (
                      <div className="text-xs text-emerald-400 animate-fade-in">
                        ✓ Component successfully mounted as child
                      </div>
                    )}
                  </div>
                )}

                {/* Chapter 1: Cascading Injection */}
                {chapter === 1 && (
                  <div className="space-y-4">
                    <div className="text-sm text-slate-400 mb-4">
                      Watch the component tree grow as each Kim family member is injected:
                    </div>
                    
                    <div className="bg-slate-900/50 border border-slate-700 rounded p-4 font-mono text-xs">
                      <div className="text-slate-400">{'<ParkHousehold>'}</div>
                      
                      {injectedMembers.includes('Ki-woo') && (
                        <div className="ml-4 text-emerald-400 animate-fade-in">
                          {'<EnglishTutor name="Ki-woo" />'}
                        </div>
                      )}
                      
                      {injectedMembers.includes('Ki-jung') && (
                        <div className="ml-4 text-emerald-400 animate-fade-in">
                          {'<ArtTherapist name="Ki-jung" />'}
                        </div>
                      )}
                      
                      {injectedMembers.includes('Ki-taek') && (
                        <div className="ml-4 text-emerald-400 animate-fade-in">
                          {'<Driver name="Ki-taek" />'}
                        </div>
                      )}
                      
                      {injectedMembers.includes('Chung-sook') && (
                        <div className="ml-4 text-emerald-400 animate-fade-in">
                          {'<Housekeeper name="Chung-sook" />'}
                        </div>
                      )}
                      
                      <div className="text-slate-400">{'</ParkHousehold>'}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {['Ki-woo', 'Ki-jung', 'Ki-taek', 'Chung-sook'].map((member) => (
                        <button
                          key={member}
                          onClick={() => handleInjectMember(member)}
                          disabled={injectedMembers.includes(member)}
                          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm rounded transition-colors"
                        >
                          {injectedMembers.includes(member) ? '✓ ' : '+ '}{member}
                        </button>
                      ))}
                    </div>

                    <div className="text-xs text-slate-400">
                      Components injected: {injectedMembers.length} / 4
                    </div>
                  </div>
                )}

                {/* Chapter 2: Memory Leak */}
                {chapter === 2 && (
                  <div className="space-y-4">
                    <div className="text-sm text-slate-400 mb-4">
                      Toggle cleanup behavior to see memory impact:
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-300">Cleanup on unmount:</span>
                        <button
                          onClick={() => setCleanupEnabled(!cleanupEnabled)}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                            cleanupEnabled
                              ? 'bg-emerald-600 text-white'
                              : 'bg-red-600 text-white'
                          }`}
                        >
                          {cleanupEnabled ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>

                      <div className="bg-slate-900/50 border border-slate-700 rounded p-4">
                        <div className="text-xs text-slate-400 mb-2">Memory Usage:</div>
                        <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              cleanupEnabled ? 'bg-emerald-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${memoryUsage}%` }}
                          />
                        </div>
                        <div className="text-xs text-slate-400 mt-2">
                          {memoryUsage}% ({cleanupEnabled ? 'Normal' : 'Leaked'})
                        </div>
                      </div>

                      <div className="bg-slate-900/50 border border-slate-700 rounded p-3 font-mono text-xs">
                        <div className="text-slate-400">useEffect(() =&gt; {'{'}</div>
                        <div className="ml-4 text-emerald-400">const sub = subscribe();</div>
                        <div className="ml-4 text-slate-400">
                          {cleanupEnabled ? (
                            <span className="text-emerald-400">
                              return () =&gt; sub.cleanup();
                            </span>
                          ) : (
                            <span className="text-red-400 line-through">
                              // No cleanup!
                            </span>
                          )}
                        </div>
                        <div className="text-slate-400">{'}, []);'}</div>
                      </div>

                      {!cleanupEnabled && (
                        <div className="flex items-start gap-2 text-xs text-red-400 animate-fade-in">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>Memory leak detected: Component unmounted but side effects persist</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Chapter 3: Collision */}
                {chapter === 3 && (
                  <div className="space-y-4">
                    <div className="text-sm text-slate-400 mb-4">
                      Simulate race condition with multiple component trees:
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className={`bg-slate-900/50 border rounded p-3 transition-all ${
                          collisionActive ? 'border-red-500 animate-shake' : 'border-emerald-500/30'
                        }`}>
                          <div className="text-xs font-semibold text-emerald-400 mb-2">
                            Tree 1: Kim Family
                          </div>
                          <div className="font-mono text-xs text-slate-400">
                            <div>Ki-woo</div>
                            <div>Ki-jung</div>
                            <div>Ki-taek</div>
                            <div>Chung-sook</div>
                          </div>
                        </div>

                        <div className={`bg-slate-900/50 border rounded p-3 transition-all ${
                          collisionActive ? 'border-red-500 animate-shake' : 'border-slate-700'
                        }`}>
                          <div className="text-xs font-semibold text-slate-400 mb-2">
                            Tree 2: Memory Leak
                          </div>
                          <div className="font-mono text-xs text-slate-400">
                            <div>Moon-gwang</div>
                            <div>Geun-sae</div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setCollisionActive(!collisionActive)}
                        className={`w-full px-4 py-2 rounded transition-colors ${
                          collisionActive
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-emerald-600 hover:bg-emerald-700'
                        } text-white`}
                      >
                        {collisionActive ? 'Stop Collision' : 'Trigger Collision'}
                      </button>

                      {collisionActive && (
                        <div className="flex items-start gap-2 text-xs text-red-400 animate-fade-in">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>Race condition: Multiple component instances competing for same parent container</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Chapter 4: Best Practices */}
                {chapter === 4 && (
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-emerald-400 mb-3">
                      Proper Composition Checklist:
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        'Respect component boundaries',
                        'Clean up side effects on unmount',
                        'One component instance per slot',
                        'Maintain clear ownership',
                        'Honor the composition contract',
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-900/50 border border-emerald-500/30 rounded p-4 mt-4">
                      <div className="text-xs font-semibold text-emerald-400 mb-2">
                        Correct Pattern:
                      </div>
                      <pre className="font-mono text-xs text-slate-300 overflow-x-auto">
{`<ParkHousehold>
  <EnglishTutor
    name="Ki-woo"
    credentials={verified}
    onUnmount={cleanup}
  />
</ParkHousehold>`}
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleChapterChange(chapter - 1)}
              disabled={chapter === 0}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded transition-colors font-semibold"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="flex gap-1 ml-2">
                {chapters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChapterChange(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === chapter ? 'bg-emerald-500' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Go to chapter ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => handleChapterChange(chapter + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded transition-colors font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}