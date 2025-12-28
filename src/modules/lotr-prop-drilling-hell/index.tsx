import { useState, useMemo } from "react";
import { Mountain, Users, AlertTriangle, Zap, BookOpen } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface FellowshipMember {
  name: string;
  usesRing: boolean;
  role: string;
}

const chapters: Chapter[] = [
  {
    id: "intro",
    title: "The Burden of the Ring",
    content: `In the great hall of Rivendell, the Council of Elrond convenes. This is your application's root component—the place where all critical decisions begin. On the stone table lies the One Ring, a piece of state so dangerous that its very existence threatens the entire system.

"The Ring must be destroyed," Elrond declares, his voice echoing through the vaulted chamber. "It must be taken deep into Mordor and cast into the fires of Mount Doom."

Mount Doom. The deeply nested child component at the bottom of your application tree. The only place where this critical state can be properly disposed of.

Gandalf the Grey stands, his staff clicking against the stone floor. He is the first handler in the chain—the parent component that must receive this prop and pass it down. "I cannot take it," he says, and the weight of his words fills the room. "The Ring would corrupt me. I would become too powerful, too dangerous."

This is the first lesson of prop drilling: even components that could handle the state directly often shouldn't. The power to mutate critical data must be carefully controlled.

Frodo Baggins, small and unassuming, rises from his seat. "I will take it," he says quietly. "I will take the Ring to Mordor."

And so the chain is established. The Ring will pass from Elrond (root) to Gandalf (parent) to Frodo (child) to Sam (grandchild) and finally to Mount Doom (great-grandchild). Each component in this tree must handle the prop, must be aware of its interface, must pass it along faithfully.

"You will not go alone," Aragorn says, stepping forward. Legolas, Gimli, Boromir, Merry, and Pippin join him. The Fellowship of the Ring is formed—a component tree, each member a link in the chain.

But here's the problem that will haunt this journey: most of these components don't actually need the Ring. They don't use it. They don't transform it. They simply... carry it. Pass it along. Handle it because they must, because they're in the path between the source and the destination.

This is prop drilling. And it's about to become hell.`,
  },
  {
    id: "build",
    title: "The Breaking of the Fellowship",
    content: `The Fellowship travels through the Mines of Moria, and the cracks in the architecture begin to show.

Pippin, curious and impulsive, leans toward Frodo one evening. "Can I see it?" he asks. "Just a quick look?"

This is the read-only access problem. Pippin is an intermediate component that doesn't need the Ring's data, but because he's in the tree, because he's part of the chain, he has access to it. He can see it. He can be tempted by it.

"No," Frodo says firmly, clutching the Ring beneath his shirt. But the damage is done. Pippin now knows the Ring exists. He's coupled to its presence. If the Ring's interface changes—if it becomes a different shape, a different type—Pippin's component must be updated too, even though he never actually uses it.

Later, in the forest of Lothlórien, Boromir approaches. His eyes are wild, desperate. "Give me the Ring, Frodo," he demands. "Let me use it. I can wield it against the enemy. I can save my people."

This is the mutation problem. Boromir is an intermediate component that wants to change the state, to transform it for his own purposes. In a prop-drilled architecture, every component in the chain has the technical ability to mutate the prop—unless you've carefully implemented immutability patterns.

Gimli and Legolas, meanwhile, have their own frustrations. They don't care about the Ring. They have no interest in it. Yet they must be aware of it, must handle it, must pass it along. Their components are bloated with prop interfaces they don't use.

"Why must we carry this burden?" Gimli grumbles. "We're here to fight, not to be couriers."

"Because we're in the path," Legolas replies wearily. "Because the Ring must pass through us to reach its destination."

This is the essence of prop drilling hell: components become coupled to data they don't need, simply because they exist between the source and the sink.`,
  },
  {
    id: "climax",
    title: "The Weight of the Journey",
    content: `The slopes of Mount Doom rise before them, black and terrible. Frodo can barely walk. The Ring—the prop he's been drilling through component after component—has become unbearably heavy.

This is the maintenance nightmare of prop drilling made manifest.

Every step of the journey, the Ring's interface has remained the same: a simple golden band. But what if it had changed? What if, halfway through the journey, the Ring had needed to become a different shape, a different type? Every component in the chain would have needed to be updated.

This is why developers hate prop drilling. Change the shape of the data, and you must update every single intermediate component, even the ones that never used the data in the first place.

Sam watches Frodo struggle. "I can't carry it for you," he says, "but I can carry you."

This is the helper component pattern—a workaround for prop drilling where you create wrapper components to ease the burden. But it doesn't solve the fundamental problem. The Ring still must pass through the chain. The coupling still exists.

At the Crack of Doom, Frodo stands at the edge of the precipice. This is the destination component—the deeply nested child that actually needs the state. Everything before this was just... passing it along.

But Frodo can't let go. The Ring has corrupted him. This is what happens when state passes through too many hands, through too many components. Each touch, each handling, each moment of exposure increases the risk of corruption.

Gollum attacks, biting off Frodo's finger, seizing the Ring. The rogue component has finally stolen the state. He dances at the edge of the precipice, clutching his "precious," and then—he falls.

The Ring tumbles into the fire. The state is finally destroyed, but not in the way anyone planned. The architecture failed. The prop-drilling chain was too fragile, too exposed, too vulnerable.

As Mount Doom erupts and the Fellowship escapes, one question haunts them all: Why didn't we just use the Eagles?`,
  },
  {
    id: "resolution",
    title: "Why Not the Eagles?",
    content: `Gandalf explains it to Frodo after the Ring is destroyed, as they sail toward the Grey Havens.

"You asked me once why we didn't use the Eagles," Gandalf says, his eyes distant. "Why we chose the long, painful road through Middle-earth instead of flying directly to Mordor."

Frodo nods, exhausted. The memory of carrying the Ring through every component, every layer, every intermediate handler still weighs on him.

"The Nazgûl," Gandalf says simply. "The Ringwraiths on their fell beasts. They patrol the skies above Mordor, watching for any disturbance, any broadcast of the Ring's presence."

This is the security argument against Context.

"If we had used the Eagles—if we had flown high above Middle-earth with the Ring exposed—the Nazgûl would have detected us immediately. They would have swarmed us. The Ring would have been taken before we ever reached Mount Doom."

Context API broadcasts state globally. Any component in the tree can access it. It's convenient, elegant, and eliminates prop drilling entirely. But that global accessibility is also its vulnerability.

"The Eagles are like Context," Gandalf continues. "They provide direct access, bypassing all the intermediate components. But that directness comes at a cost. When you broadcast state globally, you expose it to every component in the tree—including the ones that shouldn't have access."

Frodo understands now. "So we had to walk. We had to pass the Ring through each component, each member of the Fellowship, because that was the only way to keep it hidden."

"Exactly," Gandalf says. "Prop drilling is painful. It creates coupling. It makes refactoring difficult. But for sensitive data—for state that must be protected—it provides control. You know exactly which components handle the data. You can audit the chain. You can enforce rules at each step."

This is the lesson: Prop drilling isn't always bad. It's a tool with trade-offs.`,
  },
  {
    id: "summary",
    title: "The Burden Shared and Understood",
    content: `Let's synthesize the journey and understand what we've learned about prop drilling through the lens of Middle-earth.

The Ring represents critical application state that must travel from a root component (Rivendell) to a deeply nested child component (Mount Doom). This is the essence of prop drilling: passing data down through multiple layers of components.

The Fellowship represents the component tree. Each member is a component that must handle the prop, even if they don't use it. This creates unnecessary coupling—Gimli and Legolas don't care about the Ring, but they must be aware of it.

The problems revealed:
• Unnecessary coupling: Components bloated with props they don't use
• Mutation risks: Every intermediate component can corrupt the data
• Security vulnerabilities: More handlers = more attack vectors
• Maintenance nightmares: Change the interface, update every component

The Eagles represent Context API—the obvious alternative. Fly directly to Mount Doom, bypassing the entire component tree. But the Nazgûl would detect the broadcast. Context exposes state globally, making it accessible to any component—including malicious ones.

The trade-offs:
Use prop drilling when data is sensitive, you need explicit control, and security is paramount.
Use Context when data is non-sensitive, many components need it, and convenience outweighs security concerns.

The wisdom: Prop drilling isn't inherently bad. It's a tool with trade-offs. The Fellowship chose to walk to Mordor because security demanded it. Sometimes, the hard path is the right path.

The next time you're tempted to reach for Context to avoid prop drilling, ask yourself: "Am I calling the Eagles when the Nazgûl are watching?"`,
  },
];

const fellowship: FellowshipMember[] = [
  { name: "Elrond", usesRing: false, role: "Root Component" },
  { name: "Gandalf", usesRing: false, role: "Parent Component" },
  { name: "Aragorn", usesRing: false, role: "Intermediate" },
  { name: "Legolas", usesRing: false, role: "Intermediate" },
  { name: "Gimli", usesRing: false, role: "Intermediate" },
  { name: "Boromir", usesRing: false, role: "Intermediate (Mutator)" },
  { name: "Merry", usesRing: false, role: "Intermediate" },
  { name: "Pippin", usesRing: false, role: "Intermediate" },
  { name: "Frodo", usesRing: true, role: "Child Component" },
  { name: "Sam", usesRing: true, role: "Grandchild Component" },
  { name: "Mount Doom", usesRing: true, role: "Destination Component" },
];

export default function LOTRPropDrilling() {
  const [chapter, setChapter] = useState(0);
  const [ringPosition, setRingPosition] = useState(0);
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [useEagles, setUseEagles] = useState(false);
  const [nazgulDetected, setNazgulDetected] = useState(false);

  const currentChapter = useMemo(() => chapters[chapter], [chapter]);

  const handlePrevious = () => {
    if (chapter > 0) {
      setChapter(chapter - 1);
      setRingPosition(0);
      setSelectedMember(null);
      setUseEagles(false);
      setNazgulDetected(false);
    }
  };

  const handleNext = () => {
    if (chapter < chapters.length - 1) {
      setChapter(chapter + 1);
      setRingPosition(0);
      setSelectedMember(null);
      setUseEagles(false);
      setNazgulDetected(false);
    }
  };

  const passRing = () => {
    if (ringPosition < fellowship.length - 1) {
      setRingPosition(ringPosition + 1);
    } else {
      setRingPosition(0);
    }
  };

  const toggleEagles = () => {
    setUseEagles(!useEagles);
    if (!useEagles) {
      setTimeout(() => setNazgulDetected(true), 1000);
    } else {
      setNazgulDetected(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-serif">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <Mountain className="w-12 h-12 text-amber-500" />
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100">
                The Lord of the Rings
              </h1>
              <p className="text-lg sm:text-xl text-amber-500 mt-1">
                Prop Drilling Hell
              </p>
            </div>
          </div>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl">
            One Ring to pass them all, One Ring to bind them, One Ring to drill through all components and in the darkness type them.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Narrative Content */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">
                  {currentChapter.title}
                </h2>
              </div>
              <div className="prose prose-invert prose-slate max-w-none">
                <div className="text-base leading-relaxed whitespace-pre-line">
                  {currentChapter.content}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Demonstration */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6">
              {chapter === 0 &amp;&amp; (
                <div>
                  <h3 className="text-xl font-bold text-amber-500 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    The Component Tree
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Watch the Ring (state) pass through each component. Notice how many components handle it without using it.
                  </p>
                  <div className="space-y-3 mb-6">
                    {fellowship.map((member, index) => (
                      <div
                        key={member.name}
                        className={`p-4 rounded border transition-all duration-300 ${
                          index === ringPosition
                            ? "bg-amber-500/20 border-amber-500 shadow-lg shadow-amber-500/20"
                            : "bg-slate-800/50 border-slate-700"
                        }`}
                        style={{ marginLeft: `${index * 8}px` }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-slate-100">
                              {member.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {member.role}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {member.usesRing ? (
                              <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/30">
                                Uses Ring
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 bg-slate-700/50 text-slate-400 rounded border border-slate-600">
                                Passes Only
                              </span>
                            )}
                            {index === ringPosition &amp;&amp; (
                              <div className="w-6 h-6 bg-amber-500 rounded-full animate-pulse shadow-lg shadow-amber-500/50" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={passRing}
                    className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded transition-colors"
                  >
                    Pass the Ring
                  </button>
                  <div className="mt-4 p-4 bg-slate-800/50 border border-slate-700 rounded text-sm">
                    <strong className="text-amber-500">Observation:</strong> Only 3 of 11 components actually use the Ring, yet all must handle it.
                  </div>
                </div>
              )}

              {chapter === 1 &amp;&amp; (
                <div>
                  <h3 className="text-xl font-bold text-amber-500 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Unnecessary Coupling
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Click on Fellowship members to see their prop interfaces. Notice the bloat.
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {fellowship.slice(2, 8).map((member) => (
                      <button
                        key={member.name}
                        onClick={() => setSelectedMember(member.name)}
                        className={`p-4 rounded border text-left transition-all ${
                          selectedMember === member.name
                            ? "bg-amber-500/20 border-amber-500"
                            : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                        }`}
                      >
                        <div className="font-semibold text-slate-100 text-sm">
                          {member.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {member.role}
                        </div>
                      </button>
                    ))}
                  </div>
                  {selectedMember &amp;&amp; (
                    <div className="p-4 bg-slate-800 border border-slate-700 rounded font-mono text-xs">
                      <div className="text-amber-500 mb-2">
                        interface {selectedMember}Props {"{"}
                      </div>
                      <div className="ml-4 space-y-1">
                        <div className="text-slate-500">
                          // Props this component actually uses:
                        </div>
                        <div className="text-emerald-400">
                          position: Position;
                        </div>
                        <div className="text-emerald-400">
                          onMove: (direction: Direction) =&gt; void;
                        </div>
                        <div className="text-slate-500 mt-2">
                          // Props forced by prop drilling:
                        </div>
                        <div className="text-red-400 line-through opacity-50">
                          ring: Ring; // Never used!
                        </div>
                        <div className="text-red-400 line-through opacity-50">
                          onRingPass: (to: string) =&gt; void; // Never called!
                        </div>
                        <div className="text-red-400 line-through opacity-50">
                          ringInterface: RingInterface; // Unnecessary coupling!
                        </div>
                      </div>
                      <div className="text-amber-500 mt-2">{"}"}</div>
                    </div>
                  )}
                  <div className="mt-4 p-4 bg-red-950/20 border border-red-500/30 rounded text-sm">
                    <strong className="text-red-400">Problem:</strong> If Ring interface changes, ALL components must update, even those that never use it.
                  </div>
                </div>
              )}

              {chapter === 2 &amp;&amp; (
                <div>
                  <h3 className="text-xl font-bold text-amber-500 mb-4">
                    Fragility &amp; Corruption
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">
                    The longer the chain, the more vulnerable it becomes. Watch what happens when components try to mutate or steal the state.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-100">
                          Boromir (Mutator)
                        </span>
                        <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded border border-red-500/30">
                          Mutation Attempt
                        </span>
                      </div>
                      <div className="font-mono text-xs text-red-400">
                        ring.power = "MINE"; // Corrupts state!
                      </div>
                    </div>
                    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-100">
                          Gollum (Rogue Component)
                        </span>
                        <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded border border-red-500/30 animate-pulse">
                          Theft Attempt
                        </span>
                      </div>
                      <div className="font-mono text-xs text-red-400">
                        const stolen = ring; // Unauthorized access!
                      </div>
                    </div>
                    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-slate-100">
                          Pippin (Curious Component)
                        </span>
                        <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded border border-yellow-500/30">
                          Read-Only Access
                        </span>
                      </div>
                      <div className="font-mono text-xs text-yellow-400">
                        console.log(ring); // Unnecessary exposure
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-red-950/20 border border-red-500/30 rounded text-sm">
                    <strong className="text-red-400">Vulnerability:</strong> Every component in the chain is a potential attack vector. More handlers = more risk.
                  </div>
                </div>
              )}

              {chapter === 3 &amp;&amp; (
                <div>
                  <h3 className="text-xl font-bold text-amber-500 mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Eagles vs. Walking
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Choose your approach: Prop drilling (walk) or Context API (fly). See the consequences.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => {
                        setUseEagles(false);
                        setNazgulDetected(false);
                      }}
                      className={`p-6 rounded border transition-all ${
                        !useEagles
                          ? "bg-emerald-500/20 border-emerald-500"
                          : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <Mountain className="w-8 h-8 text-emerald-500 mb-2" />
                      <div className="font-semibold text-slate-100 mb-1">
                        Walk to Mordor
                      </div>
                      <div className="text-xs text-slate-400">
                        Prop Drilling
                      </div>
                    </button>
                    <button
                      onClick={toggleEagles}
                      className={`p-6 rounded border transition-all ${
                        useEagles
                          ? "bg-red-500/20 border-red-500"
                          : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <Zap className="w-8 h-8 text-amber-500 mb-2" />
                      <div className="font-semibold text-slate-100 mb-1">
                        Use the Eagles
                      </div>
                      <div className="text-xs text-slate-400">Context API</div>
                    </button>
                  </div>

                  {!useEagles &amp;&amp; (
                    <div className="space-y-3">
                      <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                          <span className="text-sm font-semibold text-emerald-400">
                            Security: High
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Explicit control over which components access state
                        </p>
                      </div>
                      <div className="p-4 bg-yellow-950/20 border border-yellow-500/30 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span className="text-sm font-semibold text-yellow-400">
                            Convenience: Low
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Must pass through all intermediate components
                        </p>
                      </div>
                      <div className="p-4 bg-yellow-950/20 border border-yellow-500/30 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                          <span className="text-sm font-semibold text-yellow-400">
                            Maintainability: Low
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Interface changes require updating all components
                        </p>
                      </div>
                    </div>
                  )}

                  {useEagles &amp;&amp; (
                    <div className="space-y-3">
                      {nazgulDetected &amp;&amp; (
                        <div className="p-4 bg-red-950/20 border border-red-500 rounded animate-pulse">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                            <span className="text-sm font-semibold text-red-400">
                              NAZGÛL DETECTED!
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            Global state broadcast detected by security threats. Ring exposed to all components!
                          </p>
                        </div>
                      )}
                      <div className="p-4 bg-red-950/20 border border-red-500/30 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                          <span className="text-sm font-semibold text-red-400">
                            Security: Low
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Any component can access state globally
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                          <span className="text-sm font-semibold text-emerald-400">
                            Convenience: High
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Direct access without intermediate components
                        </p>
                      </div>
                      <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                          <span className="text-sm font-semibold text-emerald-400">
                            Maintainability: High
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          Interface changes only affect consumers
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {chapter === 4 &amp;&amp; (
                <div>
                  <h3 className="text-xl font-bold text-amber-500 mb-4">
                    The Trade-Offs Matrix
                  </h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Understanding when to use each approach based on your requirements.
                  </p>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded">
                      <div className="font-semibold text-emerald-400 mb-2">
                        ✓ Use Prop Drilling When:
                      </div>
                      <ul className="text-sm text-slate-300 space-y-1 ml-4">
                        <li>• Data is sensitive (auth tokens, credentials)</li>
                        <li>• You need explicit control over access</li>
                        <li>• Security is more important than convenience</li>
                        <li>• Component tree is relatively shallow</li>
                        <li>• You need to audit data flow</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-slate-800/50 border border-slate-700 rounded">
                      <div className="font-semibold text-amber-400 mb-2">
                        ✓ Use Context When:
                      </div>
                      <ul className="text-sm text-slate-300 space-y-1 ml-4">
                        <li>• Data is non-sensitive (theme, language)</li>
                        <li>• Many components at different levels need it</li>
                        <li>• Convenience outweighs security concerns</li>
                        <li>• Component tree is deep</li>
                        <li>• Prop drilling would be truly painful</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded">
                      <div className="font-semibold text-amber-400 mb-2">
                        The Wisdom:
                      </div>
                      <p className="text-sm text-slate-300">
                        Prop drilling isn't inherently bad. It's a tool with trade-offs. Choose based on your requirements, not convenience. Sometimes, the hard path is the right path.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="px-4 sm:px-6 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-800 text-slate-100 font-semibold rounded transition-colors text-sm sm:text-base"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              {chapters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setChapter(index);
                    setRingPosition(0);
                    setSelectedMember(null);
                    setUseEagles(false);
                    setNazgulDetected(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === chapter
                      ? "bg-amber-500 w-8"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to chapter ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="px-4 sm:px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-amber-500 text-slate-950 font-semibold rounded transition-colors text-sm sm:text-base"
            >
              Next →
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-xs sm:text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}: {currentChapter.title}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}