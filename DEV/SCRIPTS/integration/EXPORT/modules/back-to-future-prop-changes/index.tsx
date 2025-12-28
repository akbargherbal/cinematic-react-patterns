import { useState, useMemo } from "react";
import { Clock, Zap, Users, ArrowRight, ArrowLeft, Camera } from "lucide-react";

interface FamilyMember {
  name: string;
  opacity: number;
}

export default function BackToFuturePropChanges() {
  const [chapter, setChapter] = useState(0);
  const [parentsMetAtSchool, setParentsMetAtSchool] = useState(true);
  const [fatherConfidence, setFatherConfidence] = useState(80);
  const [motherAttraction, setMotherAttraction] = useState<"George" | "Marty">("George");

  const chapters = useMemo(() => [
    {
      title: "The Photograph Renders",
      content: `Marty McFly stands in his garage, staring at a photograph. It's a simple family portrait: his father George, his mother Lorraine, his brother Dave, his sister Linda, and himself. Everyone is smiling. Everyone exists.

This photograph is not just a memory—it's a render. It's the visual output of a component tree, a snapshot of what happens when all the right props flow down from parent to child. Marty is a component, and like all components, his existence—his very ability to render—depends entirely on the props he receives from his parents.

Think of it this way: Marty is a function. function Marty(props). Those props include fatherConfidence, motherHappiness, parentsMetAtSchool, and parentsKissedAtDance. When these props have the right values, Marty renders correctly. He exists. He plays guitar. He has a girlfriend. The photograph shows him smiling.

But here's the thing about components: they re-render when their props change.`,
    },
    {
      title: "Disrupting the Props at the Source",
      content: `Marty finds Doc Brown in 1955—a younger, more manic version, but still the same brilliant scientist. He explains the situation: "I'm from the future. I'm your friend's son. And I just prevented my parents from meeting."

Doc examines the photograph. Dave's face is now almost completely transparent. Linda's is starting to fade too. "Great Scott!" Doc breathes. "You've created a time paradox. If your parents don't meet, you won't be born. You're being erased from existence."

"Erased from existence" is a dramatic way of saying unmounted. In React, when a component's props change such that the component should no longer exist, it unmounts. It's removed from the DOM. It ceases to render.

Over the next few days, Marty tries desperately to redirect Lorraine's attention to George. But every attempt fails. And every time, the photograph fades a little more.`,
    },
    {
      title: "Cascading Re-renders",
      content: `The night of the dance arrives. Marty sits in the car with Lorraine, waiting for George to arrive and "rescue" her. But something has gone wrong. Biff Tannen—the school bully—has shown up instead.

Marty's hand flickers. Transparent, then solid, then transparent again. The component is trying to render, failing, trying again. The props are in flux. The render is unstable.

Inside the dance, Marty is on stage with the band, filling in for an injured guitarist. He can barely hold the guitar. His hand keeps phasing out of existence. He looks down at the photograph—it's almost completely white now. Just a faint outline of his own face remains.

In React terms, this is the moment before unmounting. The component has received props that make its existence impossible.`,
    },
    {
      title: "Restoring the Correct Props",
      content: `George and Lorraine dance. They look into each other's eyes. They lean closer. George and Lorraine kiss.

The moment their lips touch, Marty feels it. A surge of solidity. His hand snaps back into full existence. His body stabilizes. He looks down at the photograph—it's flooding back with color. Dave reappears, grinning. Linda reappears, smiling. And Marty himself, solid and real.

The prop has been set. parentsKissedAtDance: true.

The component tree re-renders. All the child components that depend on this prop—Dave, Linda, Marty—remount. They render correctly now, because the props are correct.

But then he notices something strange. The photograph looks... different. Better. George looks confident. Lorraine looks happy. They're standing in front of a nicer house. The props didn't just get restored. They got improved.`,
    },
    {
      title: "One-Way Data Flow Through Time",
      content: `Let's step back from Hill Valley and talk about what we've learned. The story of Marty McFly is the story of every React component that receives props from a parent.

Components re-render when their props change. Same component, same identity, but different output based on different input.

Props flow one way: from parent to child. You cannot change a child component's props from within the child. You must change them at the source (the parent).

You cannot change rendered output directly. You must change the props and let the component re-render. The photograph cannot be edited; the past must be changed.

When props change at a high level, all children that depend on those props re-render. The changes cascade down the tree.

Wrong props can cause unmounting. If props change such that a component should no longer exist, it unmounts.

Better props produce better renders. The quality of your props determines the quality of your output.`,
    },
  ], []);

  const currentChapter = chapters[chapter];

  const calculateFamilyOpacity = (): FamilyMember[] => {
    let baseOpacity = 1;
    
    if (!parentsMetAtSchool) {
      baseOpacity = 0.3;
    }
    
    if (motherAttraction === "Marty") {
      baseOpacity = Math.min(baseOpacity, 0.5);
    }
    
    const confidenceMultiplier = fatherConfidence / 100;
    baseOpacity = baseOpacity * (0.3 + 0.7 * confidenceMultiplier);

    return [
      { name: "Dave", opacity: Math.max(0.1, baseOpacity - 0.2) },
      { name: "Linda", opacity: Math.max(0.1, baseOpacity - 0.1) },
      { name: "Marty", opacity: Math.max(0.1, baseOpacity) },
      { name: "George", opacity: 1 },
      { name: "Lorraine", opacity: 1 },
    ];
  };

  const familyMembers = calculateFamilyOpacity();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 text-slate-200">
      {/* Header */}
      <header className="border-b border-blue-500/30 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              Back to the Future
            </h1>
          </div>
          <p className="text-lg text-slate-400 ml-11">Marty McFly, Hill Valley, 1985</p>
          <div className="flex items-center gap-2 mt-3 ml-11">
            <Zap className="w-5 h-5 text-orange-400" />
            <p className="text-sm font-semibold text-orange-400">Props Changes &amp; Component Updates</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"></div>
        </div>

        {/* Narrative Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="text-slate-300 leading-relaxed whitespace-pre-line">
            {currentChapter.content}
          </div>
        </div>

        {/* Interactive Demonstrations */}
        {chapter === 0 &amp;&amp; (
          <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              <Camera className="w-6 h-6" />
              The Family Photograph (Component Tree)
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                <div className="text-center mb-4">
                  <div className="inline-block bg-slate-800 rounded-lg p-4 border-2 border-blue-500/50">
                    <Users className="w-16 h-16 text-blue-400 mx-auto mb-2" />
                    <p className="text-sm font-mono text-slate-400">McFly Family Photo</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {["George (Father)", "Lorraine (Mother)", "Dave (Brother)", "Linda (Sister)", "Marty (Son)"].map((member) => (
                    <div key={member} className="flex items-center gap-2 bg-slate-800/50 rounded px-3 py-2">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <span className="text-sm text-slate-300">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                <h4 className="text-sm font-semibold text-orange-400 mb-3">Component Structure</h4>
                <div className="font-mono text-xs text-slate-300 space-y-1">
                  <div className="text-blue-400">{"function Marty(props) {"}</div>
                  <div className="pl-4 text-slate-400">{"const { fatherConfidence,"}</div>
                  <div className="pl-4 text-slate-400">{"        motherHappiness,"}</div>
                  <div className="pl-4 text-slate-400">{"        parentsMetAtSchool } = props;"}</div>
                  <div className="pl-4 mt-2 text-slate-400">{"if (!parentsMetAtSchool) {"}</div>
                  <div className="pl-8 text-orange-400">{"return null; // Unmount"}</div>
                  <div className="pl-4 text-slate-400">{"}"}</div>
                  <div className="pl-4 mt-2 text-green-400">{"return <MartyMcFly />;"}</div>
                  <div className="text-blue-400">{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {chapter === 1 &amp;&amp; (
          <div className="bg-orange-950/30 border border-orange-500/30 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-orange-400 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Prop Disruption Simulator
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-300">Parents Met At School</span>
                    <button
                      onClick={() => setParentsMetAtSchool(!parentsMetAtSchool)}
                      className={`px-4 py-1 rounded-full text-xs font-semibold transition-colors ${
                        parentsMetAtSchool
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {parentsMetAtSchool ? "TRUE" : "FALSE"}
                    </button>
                  </label>
                </div>
                <div>
                  <label className="block mb-2">
                    <span className="text-sm font-semibold text-slate-300">Father Confidence: {fatherConfidence}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={fatherConfidence}
                    onChange={(e) => setFatherConfidence(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    <span className="text-sm font-semibold text-slate-300">Mother Attracted To</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMotherAttraction("George")}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        motherAttraction === "George"
                          ? "bg-green-500 text-white"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      George
                    </button>
                    <button
                      onClick={() => setMotherAttraction("Marty")}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        motherAttraction === "Marty"
                          ? "bg-red-500 text-white"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      Marty (Wrong!)
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                <h4 className="text-sm font-semibold text-blue-400 mb-4">Family Photo (Live Render)</h4>
                <div className="space-y-2">
                  {familyMembers.map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-2 bg-slate-800/50 rounded px-3 py-2 transition-opacity duration-500"
                      style={{ opacity: member.opacity }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-colors ${
                          member.opacity > 0.7 ? "bg-green-400" : member.opacity > 0.4 ? "bg-orange-400" : "bg-red-400"
                        }`}
                      ></div>
                      <span className="text-sm text-slate-300">{member.name}</span>
                      {member.opacity < 0.5 &amp;&amp; (
                        <span className="ml-auto text-xs text-red-400">Fading...</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-slate-800/50 rounded border border-slate-600">
                  <p className="text-xs text-slate-400">
                    {familyMembers[2].opacity < 0.5
                      ? "⚠️ Component unmounting! Wrong props detected."
                      : "✓ Component rendering correctly."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {chapter === 2 &amp;&amp; (
          <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
              <ArrowRight className="w-6 h-6" />
              Cascading Re-renders
            </h3>
            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700">
                <h4 className="text-sm font-semibold text-blue-400 mb-4">Timeline: Props Flow Forward</h4>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 text-center">
                    <div className="bg-blue-900/50 rounded-lg p-4 border border-blue-500/50 mb-2">
                      <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-blue-400">1955</p>
                      <p className="text-xs text-slate-400">Props Source</p>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <div>parentsMetAtSchool: <span className="text-red-400">false</span></div>
                      <div>fatherConfidence: <span className="text-red-400">20</span></div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <ArrowRight className="w-6 h-6 text-orange-400 animate-pulse" />
                    <p className="text-xs text-orange-400 font-semibold">Re-render</p>
                    <ArrowRight className="w-6 h-6 text-orange-400 animate-pulse" />
                  </div>
                  <div className="flex-1 text-center">
                    <div className="bg-red-900/50 rounded-lg p-4 border border-red-500/50 mb-2">
                      <Users className="w-8 h-8 text-red-400 mx-auto mb-2 opacity-30" />
                      <p className="text-sm font-semibold text-red-400">1985</p>
                      <p className="text-xs text-slate-400">Rendered Output</p>
                    </div>
                    <div className="text-xs text-slate-400 space-y-1">
                      <div>Dave: <span className="text-red-400">unmounted</span></div>
                      <div>Linda: <span className="text-red-400">unmounted</span></div>
                      <div>Marty: <span className="text-red-400">fading...</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                <p className="text-sm text-slate-300">
                  <span className="font-semibold text-red-400">Critical:</span> The component is trying to render with props that make its existence impossible. Without correct prop values, the component cannot mount.
                </p>
              </div>
            </div>
          </div>
        )}

        {chapter === 3 &amp;&amp; (
          <div className="bg-green-950/30 border border-green-500/30 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Prop Restoration: Before &amp; After
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-900/50 rounded-lg p-4 border border-red-500/50">
                <h4 className="text-sm font-semibold text-red-400 mb-3">Wrong Props</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">parentsKissed:</span>
                    <span className="text-red-400 font-mono">false</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">fatherConfidence:</span>
                    <span className="text-red-400 font-mono">20</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">motherHappiness:</span>
                    <span className="text-red-400 font-mono">30</span>
                  </div>
                </div>
                <div className="mt-4 p-2 bg-red-900/30 rounded text-xs text-red-400">
                  ✗ Component cannot render
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-blue-500/50">
                <h4 className="text-sm font-semibold text-blue-400 mb-3">Correct Props</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">parentsKissed:</span>
                    <span className="text-blue-400 font-mono">true</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">fatherConfidence:</span>
                    <span className="text-blue-400 font-mono">60</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">motherHappiness:</span>
                    <span className="text-blue-400 font-mono">70</span>
                  </div>
                </div>
                <div className="mt-4 p-2 bg-blue-900/30 rounded text-xs text-blue-400">
                  ✓ Component renders correctly
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-4 border border-green-500/50">
                <h4 className="text-sm font-semibold text-green-400 mb-3">Improved Props</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">parentsKissed:</span>
                    <span className="text-green-400 font-mono">true</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">fatherConfidence:</span>
                    <span className="text-green-400 font-mono">95</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">motherHappiness:</span>
                    <span className="text-green-400 font-mono">90</span>
                  </div>
                </div>
                <div className="mt-4 p-2 bg-green-900/30 rounded text-xs text-green-400">
                  ✓ Better props = better render!
                </div>
              </div>
            </div>
          </div>
        )}

        {chapter === 4 &amp;&amp; (
          <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-blue-400 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6" />
              Key Takeaways: One-Way Data Flow
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: "Components Re-render on Prop Changes",
                  description: "Same component, same identity, but different output based on different input.",
                  color: "blue",
                },
                {
                  title: "Props Flow One Way",
                  description: "From parent to child. You cannot change props from within the child component.",
                  color: "orange",
                },
                {
                  title: "Cannot Change Output Directly",
                  description: "You must change the props and let the component re-render. The photograph cannot be edited.",
                  color: "purple",
                },
                {
                  title: "Changes Cascade Down",
                  description: "When a parent's props change, all children that depend on those props re-render.",
                  color: "green",
                },
              ].map((takeaway) => (
                <div
                  key={takeaway.title}
                  className={`bg-slate-900/50 rounded-lg p-4 border border-${takeaway.color}-500/30 hover:border-${takeaway.color}-500/60 transition-colors`}
                >
                  <h4 className={`text-sm font-semibold text-${takeaway.color}-400 mb-2`}>
                    {takeaway.title}
                  </h4>
                  <p className="text-xs text-slate-400">{takeaway.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-slate-900/50 rounded-lg p-6 border border-slate-700">
              <h4 className="text-sm font-semibold text-orange-400 mb-3">The Final Lesson</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Marty McFly learned that time flows in one direction, and you cannot change the future by staying in the future. You must go to the past—the source—and change things there.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mt-3">
                React developers must learn the same lesson: <span className="font-semibold text-blue-400">Data flows in one direction, and you cannot change a component's output by manipulating the output. You must go to the source—the parent component—and change the props there.</span>
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-sm border-t border-blue-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="text-center">
              <p className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </p>
              <div className="flex gap-1 mt-1">
                {chapters.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === chapter ? "bg-blue-400" : "bg-slate-600"
                    }`}
                  ></div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="flex items-center gap-2 px-6 py-2 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}