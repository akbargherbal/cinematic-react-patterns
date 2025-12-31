import { useState, useEffect, useRef } from "react";
import { Brain, ChevronLeft, ChevronRight, Zap, Cpu, Bird, BookOpen } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
}

// ==================== DEMO COMPONENTS ====================

// Chapter 1: Simple, composable parts
const Arm = ({ side, strength }: { side: 'left' | 'right'; strength: number }) => (
  <div className={`p-4 border rounded-lg ${side === 'left' ? 'border-blue-500/50 bg-blue-950/20' : 'border-purple-500/50 bg-purple-950/20'}`}>
    <div className="font-mono text-sm">{side.toUpperCase()} ARM</div>
    <div className="text-xs opacity-70">Strength: {strength}</div>
  </div>
);

const Leg = ({ side }: { side: 'left' | 'right' }) => (
  <div className={`p-4 border rounded-lg ${side === 'left' ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-amber-500/50 bg-amber-950/20'}`}>
    <div className="font-mono text-sm">{side.toUpperCase()} LEG</div>
  </div>
);

const Eye = ({ color }: { color: string }) => (
  <div className="p-4 border rounded-lg border-rose-500/50 bg-rose-950/20">
    <div className="font-mono text-sm">EYE</div>
    <div className="text-xs opacity-70">Color: <span style={{ color }}>● {color}</span></div>
  </div>
);

// A composer that uses composition
const CreatureComposer = ({ parts }: { parts: Array<'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg' | 'eye'> }) => {
  return (
    <div className="p-6 border-2 border-emerald-500/30 rounded-xl bg-slate-900/50">
      <div className="text-sm font-mono text-emerald-400 mb-4">// &lt;CreatureComposer&gt;</div>
      <div className="flex flex-wrap gap-4 justify-center">
        {parts.includes('leftArm') && <Arm side="left" strength={90} />}
        {parts.includes('rightArm') && <Arm side="right" strength={85} />}
        {parts.includes('leftLeg') && <Leg side="left" />}
        {parts.includes('rightLeg') && <Leg side="right" />}
        {parts.includes('eye') && <Eye color="yellow" />}
      </div>
      <div className="text-sm font-mono text-emerald-400 mt-4">// &lt;/CreatureComposer&gt;</div>
    </div>
  );
};

// Chapter 3: Composition with BAD props (chaotic signals)
const BrokenCreature = () => {
  const [chaos, setChaos] = useState(0);
  const chaosRef = useRef<NodeJS.Timeout | null>(null);
  const [cycle, setCycle] = useState(0);

  const triggerChaos = () => {
    if (chaosRef.current) clearInterval(chaosRef.current);
    setCycle(0);
    chaosRef.current = setInterval(() => {
      setChaos(Math.floor(Math.random() * 100));
      setCycle(c => {
        if (c >= 5) { // CIRCUIT BREAKER: Max 5 chaotic cycles
          if (chaosRef.current) clearInterval(chaosRef.current);
          return c;
        }
        return c + 1;
      });
    }, 600);
  };

  const resetChaos = () => {
    if (chaosRef.current) clearInterval(chaosRef.current);
    setChaos(0);
    setCycle(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chaosRef.current) clearInterval(chaosRef.current);
    };
  }, []);

  return (
    <div className="p-6 border-2 border-rose-500/30 rounded-xl bg-slate-900/50">
      <div className="text-sm font-mono text-rose-400 mb-2">// &lt;BrokenCreature chaoticSignal={chaos} /&gt;</div>
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <div className="p-4 border border-rose-700 rounded bg-rose-950/30">
          <div className="font-mono">ARM</div>
          <div className="text-xs">Twitch: {chaos % 3 === 0 ? 'YES' : 'no'}</div>
        </div>
        <div className="p-4 border border-rose-700 rounded bg-rose-950/30">
          <div className="font-mono">LEG</div>
          <div className="text-xs">Kick: {chaos % 5 === 0 ? 'YES' : 'no'}</div>
        </div>
        <div className="p-4 border border-rose-700 rounded bg-rose-950/30">
          <div className="font-mono">EYE</div>
          <div className="text-xs">Blink: {chaos % 2 === 0 ? 'YES' : 'no'}</div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={triggerChaos}
          disabled={cycle >= 5}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🧪 Trigger Chaotic Signal
        </button>
        <button
          onClick={resetChaos}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm"
        >
          🔄 Reset
        </button>
      </div>
      <div className="text-xs mt-3 text-slate-400">
        Chaotic Cycles: <span className={`font-mono ${cycle >= 5 ? 'text-rose-400' : ''}`}>{cycle}/5</span> {cycle >= 5 && '(Circuit Breaker Engaged)'}
      </div>
    </div>
  );
};

// Chapter 4: The Working Bird (Good Composition)
const Wing = ({ isFlapping, side }: { isFlapping: boolean; side: 'left' | 'right' }) => (
  <div className={`p-3 border rounded-lg ${isFlapping ? 'bg-amber-500/20 border-amber-500/60' : 'bg-slate-800/50 border-slate-600'}`}>
    <div className="font-mono text-xs">{side.toUpperCase()} WING</div>
    <div className="text-xs opacity-70">{isFlapping ? 'FLAPPING ▲' : 'resting'}</div>
  </div>
);

const Beak = ({ song }: { song: string }) => (
  <div className="p-3 border rounded-lg bg-violet-500/20 border-violet-500/60">
    <div className="font-mono text-xs">BEAK</div>
    <div className="text-xs opacity-70">Song: "{song}"</div>
  </div>
);

const BirdHarness = ({ flapCount, song }: { flapCount: number; song: string }) => {
  const isFlapping = flapCount % 4 < 2; // Simple flapping animation logic
  return (
    <div className="p-6 border-2 border-emerald-500/30 rounded-xl bg-slate-900/50">
      <div className="text-sm font-mono text-emerald-400 mb-4">// &lt;BirdHarness flapCount={flapCount} song={song}&gt;</div>
      <div className="flex items-center justify-center gap-6 mb-4">
        <Wing isFlapping={isFlapping} side="left" />
        <Beak song={song} />
        <Wing isFlapping={isFlapping} side="right" />
      </div>
      <div className="text-sm font-mono text-emerald-400">// &lt;/BirdHarness&gt;</div>
      <div className="text-xs mt-4 text-slate-400 text-center">
        Props passed: <code className="bg-slate-800 px-2 py-1 rounded">flapCount: {flapCount}</code>, <code className="bg-slate-800 px-2 py-1 rounded">song: "{song}"</code>
      </div>
    </div>
  );
};

// Chapter 5: Final composed component
const Avatar = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-16 h-16 rounded-full bg-emerald-900 border-2 border-emerald-500/50 flex items-center justify-center">
    <div className="text-2xl">👨‍🔬</div>
  </div>
);

const Bio = ({ name, title }: { name: string; title: string }) => (
  <div>
    <h3 className="font-bold text-lg">{name}</h3>
    <p className="text-sm text-slate-400">{title}</p>
  </div>
);

const SkillList = ({ skills }: { skills: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {skills.map(skill => (
      <span key={skill} className="px-3 py-1 bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 rounded-full text-xs">
        {skill}
      </span>
    ))}
  </div>
);

const ProfileCard = () => {
  return (
    <div className="p-8 border-2 border-emerald-500/20 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 max-w-md mx-auto">
      <div className="flex items-start gap-4 mb-6">
        <Avatar src="#" alt="Victor" />
        <Bio name="Dr. Victor Frankenstein" title="Master of Component Composition" />
      </div>
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-slate-400 mb-3">CREATOR SKILLS</h4>
        <SkillList skills={["React Components", "Prop Design", "State Management", "UI Architecture"]} />
      </div>
      <p className="text-sm text-slate-500 italic border-t border-slate-800 pt-4">
        "A society of perfect parts, united by a clear and common purpose."
      </p>
    </div>
  );
};

// ==================== MAIN MODULE COMPONENT ====================

export default function CompositionVsInheritanceFrankenstein(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  // For Chapter 4 demo
  const [flapCount, setFlapCount] = useState<number>(0);
  const flapIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const chapters: Chapter[] = [
    {
      title: "The Promise of Patchwork",
      content: "Victor Frankenstein rejects the slow mimicry of inheritance. In his laboratory, he collects perfect parts—a mountaineer's leg, an artist's hand. Each is a self-contained component. He envisions not a single lineage, but a collage of excellence. 'Why mimic one life,' he murmurs, 'when I can assemble the perfection of a thousand?' This is the promise of Composition: infinite flexibility by combining discrete, reusable parts."
    },
    {
      title: "The Prison of Purity",
      content: "Dr. Waldman champions inheritance, building an automaton from a single, unified blueprint—a pure lineage. When asked to give it a delicate hand, he discovers the arm and hand are a single, inherited `Limb` class. Changing the hand requires recasting the entire arm. Worse, the modification causes unforeseen failures in the torso. 'This damnable rigidity!' he roars. 'To change the foot, I must rebuild the entire skeleton!' Inheritance creates a tightly-coupled hierarchy where modifications cascade uncontrollably."
    },
    {
      title: "A Monstrous Union",
      content: "Frankenstein completes his Creature, stitching perfect components together with crude, generic sinews. He passes a single, chaotic spark of life—a poorly defined prop. The Creature lives, but its parts fail to coordinate. The legs lurch, the hands twitch. It is a cacophony of function. 'The parts are beautiful,' Frankenstein realizes in horror, 'but the seams are monstrous!' Composition alone is not enough. Success depends on the quality of the interfaces—the props—that connect the components."
    },
    {
      title: "The Clockwork Nightingale",
      content: "Humbled, Frankenstein builds a clockwork bird. His first attempt jams beautiful wings and a beak together with generic rods—composition with bad props. It shatters. His second attempt starts not with the parts, but with the interface. He builds a central harness with specific sockets: `onFlap`, `headAngle`, `songToPlay`. He then modifies each component to connect perfectly to this harness. The result is fluid grace and a clear, perfect note. 'The power is not in the pieces,' he understands, 'but in the elegance of their union.' Well-defined props enable seamless collaboration."
    },
    {
      title: "The Architect's Journal",
      content: "Frankenstein writes his new philosophy: 'Create a society of perfect parts, united by a clear and common purpose.' He is no longer a god of monolithic creation, but an architect of systems. The clockwork bird on his shelf is a testament: discrete components (wings, beak, harness) working in concert through clean interfaces to produce a single, beautiful output. In React, we build UIs not by extending rigid class hierarchies, but by composing focused components connected via deliberate, well-named props."
    }
  ];

  // Code Examples
  const inheritanceExample = `// ❌ The Inheritance Prison (Chapter 2)
class BaseAutomaton {
  constructor() {
    this.material = 'brass';
    this.powerSource = 'spring';
  }
  move() { console.log('Moving...'); }
}

class WritingAutomaton extends BaseAutomaton {
  constructor() {
    super();
    // Overriding hand requires redefining entire arm structure
    this.handType = 'delicate';
    this.armLength = 'short'; // This might break torso alignment!
  }
  // Can't easily swap just the hand
}`;

  const badPropsExample = `// ❌ Composition with Monstrous Seams (Chapter 3)
function Monster() {
  // Passing a chaotic, undefined signal
  const chaoticSignal = Math.random();
  return (
    <>
      <Arm signal={chaoticSignal} />
      <Leg signal={chaoticSignal} /> {/* Both get the same useless prop */}
      <Eye signal={chaoticSignal} />
    </>
  );
}`;

  const goodPropsExample = `// ✅ Composition with Elegant Union (Chapter 4)
function Nightingale() {
  const [isSinging, setIsSinging] = useState(true);
  const [flapCycle, setFlapCycle] = useState(0);

  // Clear, specific props for each child's role
  return (
    <BirdHarness 
      isSinging={isSinging}
      flapCycle={flapCycle}
      song="Aria of the Dawn"
    >
      <LeftWing isFlapping={flapCycle % 2 === 0} />
      <RightWing isFlapping={flapCycle % 2 === 0} />
      <Beak song="Aria of the Dawn" />
    </BirdHarness>
  );
}`;

  const finalCompositionExample = `// ✅ A Society of Perfect Parts (Chapter 5)
function UserProfile({ user }) {
  // Compose specialized components with clear props
  return (
    <Card>
      <Header>
        <Avatar src={user.avatarUrl} alt={user.name} />
        <Bio name={user.name} title={user.title} />
      </Header>
      <SkillList skills={user.skills} />
      <ActionBar onFollow={() => {}} onMessage={() => {}} />
    </Card>
  );
  // Each component is independent, reusable, and connected via props.
}`;

  const currentChapter = chapters[chapter];

  // Effect for bird flapping demo (Chapter 4)
  useEffect(() => {
    if (chapter === 3) {
      flapIntervalRef.current = setInterval(() => {
        setFlapCount(c => c + 1);
      }, 800);
    } else {
      if (flapIntervalRef.current) clearInterval(flapIntervalRef.current);
      setFlapCount(0);
    }
    return () => {
      if (flapIntervalRef.current) clearInterval(flapIntervalRef.current);
    };
  }, [chapter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-slate-300 font-serif">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-1">
            <div className="flex items-center gap-3">
              <Brain className="text-emerald-500 w-7 h-7 md:w-8 md:h-8" />
              <h1 className="text-2xl md:text-3xl font-bold font-sans">Frankenstein</h1>
            </div>
            <p className="text-sm md:text-base text-slate-400 font-sans">
              Gothic • The Modern Prometheus • 1818
            </p>
          </div>
          <p className="text-base md:text-lg text-emerald-400 font-medium font-sans">
            Composition vs Inheritance in React
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Narrative & Instructions */}
          <div className="lg:col-span-7">
            <div className="prose prose-invert prose-lg max-w-none mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-3 h-3 rounded-full ${chapter === 0 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <div className={`w-3 h-3 rounded-full ${chapter === 1 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <div className={`w-3 h-3 rounded-full ${chapter === 2 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <div className={`w-3 h-3 rounded-full ${chapter === 3 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <div className={`w-3 h-3 rounded-full ${chapter === 4 ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <span className="text-sm text-slate-500 ml-2 font-sans">Chapter {chapter + 1} of 5</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-sans mb-4 text-slate-200">{currentChapter.title}</h2>
              <div className="leading-relaxed text-slate-300">
                {currentChapter.content}
              </div>
            </div>

            {/* Chapter-specific Instructions */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5 mb-8">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 font-sans">
                <Zap className="w-4 h-4 text-emerald-400" />
                Interactive Lesson
              </h3>
              <p className="text-sm text-slate-400">
                {chapter === 0 && "Use the buttons below to compose a 'Creature' from individual parts. This demonstrates the flexibility of composition."}
                {chapter === 1 && "Explore the inheritance hierarchy. Try to change a property and see how it requires modifying the entire chain."}
                {chapter === 2 && "Trigger the 'chaotic signal' to see how poor props (interfaces) lead to uncoordinated, broken behavior."}
                {chapter === 3 && "Observe the working clockwork bird. It uses the same composition principle as Chapter 1, but with clear, specific props."}
                {chapter === 4 && "This final ProfileCard is built entirely through composition. Each part is independent and reusable."}
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex items-center justify-between pt-6 border-t border-slate-800">
              <button
                onClick={() => setChapter(Math.max(0, chapter - 1))}
                disabled={chapter === 0}
                className="flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-sans"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              <div className="text-sm text-slate-500 font-sans px-4 py-2 bg-slate-900/50 rounded-lg">
                <span className="text-emerald-400 font-mono">{chapter + 1}</span> / 5
              </div>
              <button
                onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
                disabled={chapter === chapters.length - 1}
                className="flex items-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-sans"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>

          {/* Right Column: Live Demos & Code */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-8">
              {/* Chapter 0 Demo: Basic Composition */}
              {chapter === 0 && (
                <>
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 font-sans">
                      <Cpu className="w-5 h-5" />
                      Live: Composing a Creature
                    </h3>
                    <CreatureComposer parts={['leftArm', 'rightArm', 'leftLeg', 'rightLeg', 'eye']} />
                    <p className="text-sm text-slate-400 mt-4">
                      The <code className="text-emerald-300">&lt;CreatureComposer&gt;</code> renders a UI by combining independent <code className="text-blue-300">&lt;Arm&gt;</code>, <code className="text-emerald-300">&lt;Leg&gt;</code>, and <code className="text-rose-300">&lt;Eye&gt;</code> components. Try imagining adding a <code>&lt;Wing&gt;</code>—it's easy!
                    </p>
                  </div>
                  <CodeBlock
                    code={`// Component Definitions (Simplified)
const Arm = ({ side, strength }) => <div>Arm: {side}</div>;
const Leg = ({ side }) => <div>Leg: {side}</div>;

// Parent Composer
function CreatureComposer() {
  return (
    <div>
      <Arm side="left" strength={90} />
      <Leg side="right" />
      {/* More parts... */}
    </div>
  );
}`}
                    language="jsx"
                    variant="default"
                    title="// ✅ Composition: Combining Independent Parts"
                    defaultExpanded={true}
                  />
                </>
              )}

              {/* Chapter 1 Demo: Inheritance Anti-Pattern */}
              {chapter === 1 && (
                <>
                  <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 font-sans">
                      <Cpu className="w-5 h-5" />
                      Live: The Inheritance Prison
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-rose-700/50 rounded-lg bg-rose-950/30">
                        <div className="font-mono text-sm text-rose-300">BaseAutomaton</div>
                        <div className="text-xs text-slate-400">material: 'brass'</div>
                      </div>
                      <div className="p-4 border border-rose-700/50 rounded-lg bg-rose-950/30 ml-6">
                        <div className="font-mono text-sm text-rose-300">WritingAutomaton extends BaseAutomaton</div>
                        <div className="text-xs text-slate-400">handType: 'delicate'</div>
                        <div className="text-xs text-rose-400 mt-1">❌ Problem: Changing handType might break armLength and torso alignment.</div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 mt-4">
                      In this inheritance chain, modifying a property in a subclass can have unintended consequences up and down the hierarchy. The system is tightly coupled.
                    </p>
                  </div>
                  <CodeBlock
                    code={inheritanceExample}
                    language="jsx"
                    variant="error"
                    title="// ❌ Anti-Pattern: Inheritance Creates Rigid Hierarchy"
                    defaultExpanded={true}
                  />
                </>
              )}

              {/* Chapter 2 Demo: Bad Props */}
              {chapter === 2 && (
                <>
                  <BrokenCreature />
                  <CodeBlock
                    code={badPropsExample}
                    language="jsx"
                    variant="error"
                    title="// ❌ Pitfall: Composition with Poorly Defined Props"
                    defaultExpanded={true}
                  />
                </>
              )}

              {/* Chapter 3 Demo: Good Props (Working Bird) */}
              {chapter === 3 && (
                <>
                  <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 font-sans">
                      <Bird className="w-5 h-5" />
                      Live: The Clockwork Nightingale
                    </h3>
                    <BirdHarness flapCount={flapCount} song="Aria of the Dawn" />
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={() => {
                          if (flapIntervalRef.current) {
                            clearInterval(flapIntervalRef.current);
                            flapIntervalRef.current = null;
                          } else {
                            flapIntervalRef.current = setInterval(() => setFlapCount(c => c + 1), 800);
                          }
                        }}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-sm font-sans"
                      >
                        {flapIntervalRef.current ? '⏸️ Pause Animation' : '▶️ Start Animation'}
                      </button>
                    </div>
                    <p className="text-sm text-slate-400 mt-4">
                      The <code className="text-emerald-300">&lt;BirdHarness&gt;</code> passes clear, specific props (<code>flapCount</code>, <code>song</code>) to its child components. Each child uses only the props it needs to perform its specific role.
                    </p>
                  </div>
                  <CodeBlock
                    code={goodPropsExample}
                    language="jsx"
                    variant="success"
                    title="// ✅ Solution: Composition with Clear, Specific Props"
                    defaultExpanded={true}
                  />
                </>
              )}

              {/* Chapter 4 Demo: Final Composition */}
              {chapter === 4 && (
                <>
                  <ProfileCard />
                  <CodeBlock
                    code={finalCompositionExample}
                    language="jsx"
                    variant="success"
                    title="// ✅ Mastery: A Society of Composable Parts"
                    defaultExpanded={true}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}