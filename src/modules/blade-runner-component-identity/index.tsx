import { useState, useEffect } from "react";
import { Eye, AlertTriangle, CheckCircle, XCircle, Shuffle } from "lucide-react";

interface Replicant {
  id: string;
  name: string;
  model: string;
  color: string;
}

export default function BladeRunnerComponentIdentity() {
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [chapter]);

  const chapters = [
    {
      title: "The Voight-Kampff Protocol",
      content: `Los Angeles, November 2019. Rain hammers the streets in sheets, neon bleeding through the darkness like wounds in the night. Deckard sits across from the subject, the Voight-Kampff machine between them—a brass and leather apparatus that looks more like a Victorian torture device than a test of humanity.

"Tell me about your mother," he says, watching the bellows expand and contract, measuring microscopic changes in the iris, the dilation of the pupil, the flush of capillaries in the cheek.

The subject answers. The machine records. Numbers scroll across the screen.

This is how you identify a replicant.

Not by looking at them—they're identical to humans, down to the cellular level. Not by talking to them—they have memories, emotions, dreams. The Nexus-6 models are "more human than human," as their creator Tyrell boasts. You can't tell by appearance or behavior.

You can only tell by the test.

The Voight-Kampff measures something deeper than surface characteristics. It measures authenticity. It verifies identity. Because in a world where perfect copies exist, where manufactured beings walk among the genuine, you need a way to know which is which.

The machine doesn't care what the subject looks like. It doesn't care what memories they have. It only cares about one thing: Are you who you claim to be?

---

In React, every component faces the same question.

When your application re-renders, React looks at the new tree of components and compares it to the old one. It sees components that look identical—same type, same props, same position in the tree. But are they the same component instance, or are they different components that just happen to look alike?

React needs to know. Because if it's the same component, it should preserve its state, keep its place in the DOM, maintain its identity. But if it's a different component—even one that looks identical—it should unmount the old one and mount the new one fresh.

How does React tell the difference?

The same way Deckard does: with a test.

That test is the key prop.

The key is React's Voight-Kampff machine. It's the external identifier that says, "This component is this specific instance, not just a component of this type." Without it, React has to guess. And when React guesses wrong, components lose their identity.

When components lose their identity, they lose their state. Their memories. Their place in the world.

They get retired.`,
      demo: <VoightKampffDemo />,
    },
    {
      title: "Implanted Memories",
      content: `Rachael sits in Deckard's apartment, a photograph clutched in her hands. It shows a young girl with her mother, a moment of warmth captured in sepia tones. She remembers that day. The dress she wore. The way the sun felt on her face. The smell of her mother's perfume.

"They're not your memories," Deckard tells her. "They're Tyrell's niece's. They implanted them in you."

She stares at him, the photograph trembling. "You think I'm a replicant."

"I don't think. I know."

The memories feel real. They are real—real neural patterns, real emotional responses, real experiences encoded in her mind. But they're not hers. They were manufactured, implanted, given to her at inception. She was born fully formed, with a past she never lived.

The memories don't make her human. They don't determine her identity.

---

In React, components are born with memories too.

When you create a component, you pass it props—initial data that shapes its behavior, its appearance, its starting state. These props are like implanted memories: they come from outside, they're given at creation, they feel like part of the component's identity.

But here's what developers often misunderstand: props don't determine identity.

You can create two components with identical props. They look the same. They have the same memories. They'll render the same output. But they're different components. Different instances. Different identities.

If you don't tell React which is which, it has to guess. And sometimes it guesses wrong.

The problem manifests when components change position or when lists reorder. React sees these components. It sees their props. But without keys, it can't tell them apart. When the list reorders, React doesn't know that the component in position 0 is now a different replicant. It thinks it's still whoever was there before.

So it keeps the old component's state and just updates its props.

The component gets someone else's memories. Someone else's internal state. Someone else's identity.

The component experiences an identity crisis.`,
      demo: <ImplantedMemoriesDemo />,
    },
    {
      title: "The Retirement List",
      content: `Four replicants have escaped from the Off-world colonies. Four Nexus-6 combat models, designed for maximum strength and agility, now loose in Los Angeles. They're on the retirement list. Deckard's job is to find them and terminate them.

But they're not where they're supposed to be.

Roy Batty, the leader, was logged at the Tyrell Corporation. Now he's at Sebastian's apartment. Pris was tracked to the industrial sector. Now she's with Roy. Zhora was identified working at a nightclub. Now she's running through the streets, crashing through glass, bleeding and desperate.

The system is breaking down. Components are appearing in the wrong places. The tracking mechanism—the way the city identifies and locates replicants—is failing.

When you can't track identity, you get chaos.

---

In React, this is what happens when keys are missing or unstable.

At first, everything seems fine. React tracks components by their position. But then the list reorders. React looks at index 0. It sees a component there. It thinks, "This is the same component that was at index 0 before." So it keeps the old component's state and just updates the props to the new data.

The component at index 0 now has the wrong internal state but different external data.

Identity confusion.

The component doesn't know who it is. React doesn't know who it is. State gets attached to the wrong instance. Form inputs retain the wrong values. Animations trigger on the wrong elements. The entire tracking system fails.

The worst case is when keys collide—when two different components have the same key. React sees two components with the same identity marker. It can't tell them apart. It treats them as the same component, even though they're different instances.

Identity collision.

When you lose track of identity, you lose control. When React loses track of component identity, it loses control too. Components unmount when they shouldn't. State attaches to the wrong instances. The UI becomes unpredictable, chaotic, broken.

All because the keys—the identity markers—were wrong.`,
      demo: <RetirementListDemo />,
    },
    {
      title: "Tears in Rain",
      content: `Roy Batty sits on the rooftop, rain streaming down his face, a white dove in his hands. Deckard watches, wounded, exhausted, waiting for the killing blow.

But Roy doesn't kill him. Instead, he speaks.

"I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate."

His voice is quiet, reflective. A component examining its own state before unmounting.

"All those moments will be lost in time, like tears in rain."

He pauses, looks at Deckard.

"Time to die."

His head drops. The dove flies away. Roy Batty—Nexus-6 combat model, serial number N6MAA10816—ceases to function.

His memories, his experiences, his internal state—all of it vanishes. Not because the memories weren't real. Not because the experiences didn't matter. But because when a component unmounts, its state is lost.

Unless that state was preserved somewhere else. Unless the component's identity was tracked correctly. Unless React knew which component was which and could maintain that identity across renders.

---

This is the core truth about component identity in React: state is tied to identity, and identity is determined by keys.

When you give a component a stable, unique key, you're telling React: "This is a specific instance. Track it. Remember it. Preserve its state across renders."

Now when the list reorders, React knows which component is which. The key is external to the component. It's not part of its props. It's not part of its state. It's the identifier that React uses to track the component's identity across renders.

The key is the serial number. The Voight-Kampff result. The proof of identity.

When Roy dies, his memories die with him. But imagine if his identity had been preserved—if his serial number had been tracked correctly, if the system had maintained his state across different contexts.

That's what proper keys do in React. They ensure that when a component moves in the tree, it doesn't lose its identity. When a list reorders, components maintain their state. When the UI updates, React knows which instances to preserve and which to unmount.`,
      demo: <TearsInRainDemo />,
    },
    {
      title: "Am I a Replicant?",
      content: `The film ends with a question: Is Deckard himself a replicant?

He finds an origami unicorn outside his apartment—a sign that Gaff knows about Deckard's dreams. But how could Gaff know, unless those dreams were implanted? Unless Deckard's memories, like Rachael's, are manufactured?

The question hangs in the air, unanswered. Because the point isn't whether Deckard is human or replicant. The point is that identity is assigned, not inherent.

You are who the system says you are. You are who the test says you are. You are who your key says you are.

---

In React, every component faces the same existential question: "What makes me me?"

Is it my props? No—props are just initialization data, implanted memories that shape my starting state but don't define my identity.

Is it my state? No—state is internal, private, tied to my identity but not the source of it.

Is it my position in the tree? No—I can move positions and still be the same component instance.

My identity is my key.

The key is external. It's assigned by the developer. It's the identifier that React uses to track me across renders, across reorders, across the entire lifecycle of the application.

Without a key, I'm just a component that looks like other components. React has to guess which instance I am. And when React guesses wrong, I lose my state. I lose my identity. I get retired and remounted as a new instance.

With a stable, unique key, I persist. My state survives. My identity is maintained.`,
      demo: <KeyPatternsDemo />,
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-mono">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-cyan-400">
              Blade Runner
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Component Keys & Identity
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4">
            {currentChapter.title}
          </h2>
          <div className="prose prose-invert prose-slate max-w-none">
            {currentChapter.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('---')) {
                return (
                  <div key={idx} className="my-8 border-t border-slate-700" />
                );
              }
              return (
                <p key={idx} className="mb-4 text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mt-12">
          {currentChapter.demo}
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setChapter(c => c - 1)}
              disabled={chapter === 0}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded transition-colors"
            >
              Previous
            </button>
            
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
            
            <button
              onClick={() => setChapter(c => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Chapter 1 Demo: Voight-Kampff Simulator
function VoightKampffDemo() {
  const [useKeys, setUseKeys] = useState(true);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Eye className="w-5 h-5" />
        Voight-Kampff Identity Test
      </h3>
      
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={useKeys}
            onChange={(e) => setUseKeys(e.target.checked)}
            className="w-5 h-5 accent-cyan-500"
          />
          <span className="text-slate-300">
            Use proper keys for identity verification
          </span>
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800 border border-slate-700 rounded p-4">
          <div className="text-sm text-slate-400 mb-2">Component A</div>
          <div className="text-cyan-400 font-semibold mb-1">Replicant #1</div>
          <div className="text-xs text-slate-500">
            {useKeys ? 'Key: N6MAA10816' : 'Key: undefined'}
          </div>
        </div>
        
        <div className="bg-slate-800 border border-slate-700 rounded p-4">
          <div className="text-sm text-slate-400 mb-2">Component B</div>
          <div className="text-cyan-400 font-semibold mb-1">Replicant #1</div>
          <div className="text-xs text-slate-500">
            {useKeys ? 'Key: N6MAA10819' : 'Key: undefined'}
          </div>
        </div>
      </div>

      <button
        onClick={handleScan}
        disabled={scanning}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 text-white font-semibold rounded transition-colors mb-4"
      >
        {scanning ? 'Scanning...' : 'Run Identity Test'}
      </button>

      {scanning && (
        <div className="bg-slate-800 border border-cyan-500/30 rounded p-4 animate-pulse">
          <div className="text-cyan-400 text-sm mb-2">Analyzing...</div>
          <div className="h-2 bg-slate-700 rounded overflow-hidden">
            <div className="h-full bg-cyan-500 animate-[scan_2s_ease-in-out]" />
          </div>
        </div>
      )}

      {!scanning && (
        <div className={`border rounded p-4 ${useKeys ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-red-950/20 border-red-500/30'}`}>
          <div className="flex items-start gap-3">
            {useKeys ? (
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className={`font-semibold mb-1 ${useKeys ? 'text-emerald-400' : 'text-red-400'}`}>
                {useKeys ? 'Identity Verified' : 'Identity Uncertain'}
              </div>
              <div className="text-sm text-slate-400">
                {useKeys 
                  ? 'React can distinguish between these components. Each maintains its own identity and state.'
                  : 'React cannot reliably distinguish between these components. Identity confusion may occur during re-renders.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Chapter 2 Demo: Implanted Memories
function ImplantedMemoriesDemo() {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">
        Memory Implantation Lab
      </h3>
      
      <p className="text-slate-400 mb-6 text-sm">
        Both components receive identical props (memories), but they maintain separate identities and state because they have different keys.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800 border border-cyan-500/30 rounded p-4">
          <div className="text-xs text-slate-500 mb-2">Key: "rachael-1"</div>
          <div className="text-cyan-400 font-semibold mb-3">Rachael (Instance 1)</div>
          <div className="text-sm text-slate-400 mb-4">
            Props: name="Rachael", memories="Tyrell's niece"
          </div>
          <div className="bg-slate-900 rounded p-3 mb-3">
            <div className="text-xs text-slate-500 mb-1">Internal State:</div>
            <div className="text-2xl font-bold text-cyan-400">{countA}</div>
          </div>
          <button
            onClick={() => setCountA(c => c + 1)}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded transition-colors"
          >
            Increment State
          </button>
        </div>

        <div className="bg-slate-800 border border-cyan-500/30 rounded p-4">
          <div className="text-xs text-slate-500 mb-2">Key: "rachael-2"</div>
          <div className="text-cyan-400 font-semibold mb-3">Rachael (Instance 2)</div>
          <div className="text-sm text-slate-400 mb-4">
            Props: name="Rachael", memories="Tyrell's niece"
          </div>
          <div className="bg-slate-900 rounded p-3 mb-3">
            <div className="text-xs text-slate-500 mb-1">Internal State:</div>
            <div className="text-2xl font-bold text-cyan-400">{countB}</div>
          </div>
          <button
            onClick={() => setCountB(c => c + 1)}
            className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded transition-colors"
          >
            Increment State
          </button>
        </div>
      </div>

      <div className="mt-4 bg-amber-950/20 border border-amber-500/30 rounded p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-slate-400">
            <strong className="text-amber-400">Key Insight:</strong> Identical props don't mean identical identity. Each component maintains its own state because each has a unique key.
          </div>
        </div>
      </div>
    </div>
  );
}

// Chapter 3 Demo: Retirement List
function RetirementListDemo() {
  const [useStableKeys, setUseStableKeys] = useState(false);
  const [replicants, setReplicants] = useState<Replicant[]>([
    { id: 'N6MAA10816', name: 'Roy Batty', model: 'Nexus-6', color: 'bg-red-900' },
    { id: 'N6MAA10819', name: 'Pris', model: 'Nexus-6', color: 'bg-purple-900' },
    { id: 'N6MAC41717', name: 'Zhora', model: 'Nexus-6', color: 'bg-blue-900' },
  ]);

  const shuffleList = () => {
    setReplicants(prev => [...prev].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <Shuffle className="w-5 h-5" />
        Retirement Tracker
      </h3>

      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={useStableKeys}
            onChange={(e) => setUseStableKeys(e.target.checked)}
            className="w-5 h-5 accent-cyan-500"
          />
          <span className="text-slate-300">
            Use stable keys (serial numbers) instead of array indices
          </span>
        </label>
      </div>

      <div className="space-y-3 mb-6">
        {replicants.map((replicant, index) => (
          <ReplicantCard
            key={useStableKeys ? replicant.id : index}
            replicant={replicant}
            useStableKeys={useStableKeys}
            position={index}
          />
        ))}
      </div>

      <button
        onClick={shuffleList}
        className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded transition-colors mb-4"
      >
        Reorder List (Simulate Re-render)
      </button>

      <div className={`border rounded p-4 ${useStableKeys ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-red-950/20 border-red-500/30'}`}>
        <div className="flex items-start gap-3">
          {useStableKeys ? (
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          )}
          <div className="text-sm text-slate-400">
            {useStableKeys 
              ? 'With stable keys, each component maintains its state when the list reorders. React tracks identity correctly.'
              : 'With array indices as keys, state gets attached to positions, not components. When the list reorders, components get the wrong state.'}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReplicantCard({ replicant, useStableKeys, position }: { replicant: Replicant; useStableKeys: boolean; position: number }) {
  const [internalState] = useState(Math.floor(Math.random() * 100));

  return (
    <div className={`${replicant.color} border border-slate-700 rounded p-4`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-cyan-400 font-semibold">{replicant.name}</div>
          <div className="text-xs text-slate-500">
            {useStableKeys ? `Key: ${replicant.id}` : `Key: ${position}`}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">Internal State:</div>
          <div className="text-lg font-bold text-cyan-400">{internalState}</div>
        </div>
      </div>
      <div className="text-xs text-slate-400">{replicant.model}</div>
    </div>
  );
}

// Chapter 4 Demo: Tears in Rain
function TearsInRainDemo() {
  const [mounted, setMounted] = useState(true);
  const [useProperKey, setUseProperKey] = useState(true);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-4">
        State Preservation Test
      </h3>

      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={useProperKey}
            onChange={(e) => setUseProperKey(e.target.checked)}
            className="w-5 h-5 accent-cyan-500"
          />
          <span className="text-slate-300">
            Use stable key to preserve identity
          </span>
        </label>
      </div>

      <div className="mb-6">
        {mounted && (
          <RoyBattyComponent useProperKey={useProperKey} />
        )}
      </div>

      <button
        onClick={() => {
          setMounted(false);
          setTimeout(() => setMounted(true), 100);
        }}
        className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded transition-colors mb-4"
      >
        Trigger Unmount/Remount
      </button>

      <div className="bg-slate-800 border border-slate-700 rounded p-4 text-sm text-slate-400">
        <p className="mb-2">
          <strong className="text-cyan-400">With proper key:</strong> Component maintains identity across unmount/remount cycles. State can be preserved if managed externally.
        </p>
        <p>
          <strong className="text-cyan-400">Without proper key:</strong> Component loses identity. All internal state is lost, like tears in rain.
        </p>
      </div>
    </div>
  );
}

function RoyBattyComponent({ useProperKey }: { useProperKey: boolean }) {
  const [memories] = useState([
    'Attack ships on fire off the shoulder of Orion',
    'C-beams glitter in the dark near the Tannhäuser Gate',
  ]);

  return (
    <div className="bg-slate-800 border border-cyan-500/30 rounded p-4">
      <div className="text-xs text-slate-500 mb-2">
        {useProperKey ? 'Key: N6MAA10816' : 'Key: undefined'}
      </div>
      <div className="text-cyan-400 font-semibold mb-3">Roy Batty</div>
      <div className="text-sm text-slate-400 mb-2">Memories:</div>
      <ul className="text-xs text-slate-500 space-y-1">
        {memories.map((memory, idx) => (
          <li key={idx}>• {memory}</li>
        ))}
      </ul>
    </div>
  );
}

// Chapter 5 Demo: Key Patterns
function KeyPatternsDemo() {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-cyan-400 mb-6">
        The Voight-Kampff Test for Keys
      </h3>

      <div className="space-y-6">
        <KeyPattern
          title="✓ Stable Unique Keys"
          code={`{replicants.map(r => (
  <Replicant key={r.serialNumber} {...r} />
))}`}
          status="pass"
          explanation="Database IDs, UUIDs, or serial numbers that never change. React can track identity reliably."
        />

        <KeyPattern
          title="✗ Array Indices"
          code={`{replicants.map((r, index) => (
  <Replicant key={index} {...r} />
))}`}
          status="fail"
          explanation="Indices change when list reorders. Component at index 0 gets different data but keeps old state."
        />

        <KeyPattern
          title="✗ Random Values"
          code={`{replicants.map(r => (
  <Replicant key={Math.random()} {...r} />
))}`}
          status="fail"
          explanation="New key every render means new identity. Component unmounts and remounts constantly, losing all state."
        />

        <KeyPattern
          title="✗ Non-Unique Values"
          code={`{replicants.map(r => (
  <Replicant key={r.model} {...r} />
))}`}
          status="fail"
          explanation="Multiple replicants share the same model. Key collision causes React to lose track of which is which."
        />
      </div>

      <div className="mt-8 bg-cyan-950/20 border border-cyan-500/30 rounded p-4">
        <h4 className="text-cyan-400 font-semibold mb-3">The Four Questions:</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>1. Is this key <strong className="text-cyan-400">stable</strong>? (Same on next render?)</li>
          <li>2. Is this key <strong className="text-cyan-400">unique</strong>? (No siblings share it?)</li>
          <li>3. Is this key <strong className="text-cyan-400">meaningful</strong>? (Represents the data entity?)</li>
          <li>4. Is this key <strong className="text-cyan-400">position-independent</strong>? (Stays same if item moves?)</li>
        </ul>
        <p className="mt-4 text-sm text-slate-400">
          If you answer "no" to any question, your keys will fail the test.
        </p>
      </div>
    </div>
  );
}

function KeyPattern({ title, code, status, explanation }: { title: string; code: string; status: 'pass' | 'fail'; explanation: string }) {
  return (
    <div className={`border rounded p-4 ${status === 'pass' ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-red-950/20 border-red-500/30'}`}>
      <div className="flex items-start gap-3 mb-3">
        {status === 'pass' ? (
          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <div className={`font-semibold mb-2 ${status === 'pass' ? 'text-emerald-400' : 'text-red-400'}`}>
            {title}
          </div>
          <pre className="bg-slate-900 rounded p-3 text-xs text-slate-300 overflow-x-auto mb-2">
            <code>{code}</code>
          </pre>
          <div className="text-sm text-slate-400">
            {explanation}
          </div>
        </div>
      </div>
    </div>
  );
}