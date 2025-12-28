import { useState, useMemo } from "react";
import { AlertTriangle, Shield, Eye, Code, Flame } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
  demo?: React.ReactNode;
}

export default function TheThingComponentReplacement() {
  const [chapter, setChapter] = useState(0);
  const [revealedComponent, setRevealedComponent] = useState<string | null>(null);
  const [typeCheckingEnabled, setTypeCheckingEnabled] = useState(false);
  const [infectedNodes, setInfectedNodes] = useState<Set<string>>(new Set());
  const [testedSamples, setTestedSamples] = useState<Set<string>>(new Set());

  const chapters: Chapter[] = useMemo(() => [
    {
      id: "intro",
      title: "Trust in the Interface",
      content: `The Antarctic wind howls across U.S. Outpost 31. Inside, twelve men work in harmony—a perfectly functioning system. Each person has their role, their interface to the others.

In React terms, Outpost 31 is a component tree. Each crew member is a component with a defined interface—props they accept, behaviors they expose. The system works because each component does what it promises.

Then the Norwegian helicopter arrives, chasing a dog across the ice. The dog looks normal—same props as any dog component: four legs, fur, tail, bark. It passes every visual inspection. The crew takes it in.

This is the fundamental assumption of component-based architecture: if something has the right props, accepts the right inputs, and appears to behave correctly, we trust it.

But what if the interface is a lie?`,
      demo: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 border border-slate-700 p-6 rounded">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-slate-200">Component A</h3>
              </div>
              <pre className="text-sm text-slate-400 mb-4">
{`interface DogProps {
  legs: number;
  fur: string;
  bark: () => void;
}`}
              </pre>
              <button
                onClick={() => setRevealedComponent(revealedComponent === "A" ? null : "A")}
                className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-400 hover:bg-blue-500/30 transition-colors"
              >
                {revealedComponent === "A" ? "Hide" : "Reveal"} Implementation
              </button>
              {revealedComponent === "A" &amp;&amp; (
                <div className="mt-4 p-4 bg-blue-950/30 border border-blue-500/30 text-sm text-blue-300">
                  <code>
{`// Normal dog behavior
function bark() {
  console.log("Woof!");
}`}
                  </code>
                </div>
              )}
            </div>

            <div className="bg-slate-900/50 border border-red-700 p-6 rounded">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-bold text-slate-200">Component B</h3>
              </div>
              <pre className="text-sm text-slate-400 mb-4">
{`interface DogProps {
  legs: number;
  fur: string;
  bark: () => void;
}`}
              </pre>
              <button
                onClick={() => setRevealedComponent(revealedComponent === "B" ? null : "B")}
                className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                {revealedComponent === "B" ? "Hide" : "Reveal"} Implementation
              </button>
              {revealedComponent === "B" &amp;&amp; (
                <div className="mt-4 p-4 bg-red-950/30 border border-red-500/30 text-sm text-red-300">
                  <code>
{`// Thing behavior
function bark() {
  assimilateNearby();
  replicate();
}`}
                  </code>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-slate-400 text-center">
            Both components have identical interfaces. Can you tell which is the Thing?
          </p>
        </div>
      ),
    },
    {
      id: "build",
      title: "The Perfect Mimic",
      content: `The first sign of trouble comes when Bennings is found, his body contorted in the middle of transformation. The Thing was trying to replace him—to swap the Bennings component with a perfect copy.

This is the horror of duck typing. In JavaScript, if two components have the same props, they're treated as interchangeable. The type system doesn't look inside. It doesn't verify the implementation.

The crew tries visual inspection. They watch each other constantly. But the Thing is patient. It knows how to behave like the component it replaced. It accepts the same props. It returns the same outputs.

This is why prop types alone aren't enough. You can validate that a component accepts the right props, but you can't validate what it does with them internally.`,
      demo: (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-200">Component Swap Simulator</h3>
            <button
              onClick={() => setTypeCheckingEnabled(!typeCheckingEnabled)}
              className={`px-4 py-2 border transition-colors ${
                typeCheckingEnabled
                  ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                  : "bg-slate-700/20 border-slate-600 text-slate-400"
              }`}
            >
              TypeScript: {typeCheckingEnabled ? "ON" : "OFF"}
            </button>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 p-6 rounded">
            <pre className="text-sm text-slate-300 mb-4">
{`// JavaScript allows this swap
const bennings = {
  role: "meteorologist",
  skills: ["weather", "data-analysis"]
};

const thingAsBennings = {
  role: "meteorologist",
  skills: ["weather", "data-analysis"],
  assimilate: () => { /* hidden */ }
};

// Both pass duck typing
crew.push(bennings);
crew.push(thingAsBennings); // ✓ Allowed`}
            </pre>

            {typeCheckingEnabled &amp;&amp; (
              <div className="p-4 bg-blue-950/30 border border-blue-500/30 rounded">
                <pre className="text-sm text-blue-300">
{`// TypeScript catches the mismatch
interface CrewMember {
  role: string;
  skills: string[];
}

const thingAsBennings = {
  role: "meteorologist",
  skills: ["weather", "data-analysis"],
  assimilate: () => {}
};

const crew: CrewMember[] = [thingAsBennings];
// ❌ Error: Object literal may only specify
// known properties`}
                </pre>
              </div>
            )}
          </div>

          <p className="text-sm text-slate-400">
            {typeCheckingEnabled
              ? "TypeScript prevents the swap at compile time by detecting extra properties."
              : "JavaScript allows the swap because the interface matches. The hidden behavior goes undetected."}
          </p>
        </div>
      ),
    },
    {
      id: "climax",
      title: "Paranoia Sets In",
      content: `The power goes out. In the darkness, someone has sabotaged the generator. And in the chaos, the Thing makes its move.

Norris collapses. The crew rushes him to medical. When the defibrillator touches his chest, Norris's chest opens like a mouth and bites the doctor's arms off.

The Norris-component wasn't Norris anymore. It was a Thing wearing Norris's interface, and when stressed—when the defibrillator threatened its disguise—it revealed its true implementation.

This is the nightmare of runtime component replacement: you don't know it's happened until the component is invoked under stress. Until you call a method that reveals the implementation doesn't match the interface.

The component tree is deeply corrupted. And they have no idea how many.`,
      demo: (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-200 mb-4">Infection Spread Simulator</h3>
          
          <div className="bg-slate-900/50 border border-slate-700 p-6 rounded">
            <div className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <div
                  className={`inline-block px-6 py-3 border-2 rounded cursor-pointer transition-all ${
                    infectedNodes.has("root")
                      ? "bg-red-950/50 border-red-500 text-red-400"
                      : "bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500"
                  }`}
                  onClick={() => {
                    const newInfected = new Set(infectedNodes);
                    if (infectedNodes.has("root")) {
                      newInfected.clear();
                    } else {
                      newInfected.add("root");
                      setTimeout(() => {
                        setInfectedNodes(new Set([...newInfected, "child1", "child2"]));
                      }, 500);
                      setTimeout(() => {
                        setInfectedNodes(new Set([...newInfected, "child1", "child2", "grandchild1", "grandchild2"]));
                      }, 1000);
                    }
                    setInfectedNodes(newInfected);
                  }}
                >
                  <Code className="w-6 h-6 mx-auto mb-1" />
                  <div className="font-mono text-sm">App</div>
                </div>
              </div>

              <div className="flex gap-8">
                <div
                  className={`px-6 py-3 border-2 rounded transition-all ${
                    infectedNodes.has("child1")
                      ? "bg-red-950/50 border-red-500 text-red-400"
                      : "bg-slate-800 border-slate-600 text-slate-300"
                  }`}
                >
                  <Code className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-mono text-xs">Header</div>
                </div>
                <div
                  className={`px-6 py-3 border-2 rounded transition-all ${
                    infectedNodes.has("child2")
                      ? "bg-red-950/50 border-red-500 text-red-400"
                      : "bg-slate-800 border-slate-600 text-slate-300"
                  }`}
                >
                  <Code className="w-5 h-5 mx-auto mb-1" />
                  <div className="font-mono text-xs">Content</div>
                </div>
              </div>

              <div className="flex gap-8">
                <div
                  className={`px-4 py-2 border-2 rounded transition-all ${
                    infectedNodes.has("grandchild1")
                      ? "bg-red-950/50 border-red-500 text-red-400"
                      : "bg-slate-800 border-slate-600 text-slate-300"
                  }`}
                >
                  <Code className="w-4 h-4 mx-auto mb-1" />
                  <div className="font-mono text-xs">Nav</div>
                </div>
                <div
                  className={`px-4 py-2 border-2 rounded transition-all ${
                    infectedNodes.has("grandchild2")
                      ? "bg-red-950/50 border-red-500 text-red-400"
                      : "bg-slate-800 border-slate-600 text-slate-300"
                  }`}
                >
                  <Code className="w-4 h-4 mx-auto mb-1" />
                  <div className="font-mono text-xs">List</div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400 text-center">
            Click the root component to see how corruption spreads through the tree.
            {infectedNodes.size > 0 &amp;&amp; " One infected component can compromise the entire system."}
          </p>
        </div>
      ),
    },
    {
      id: "resolution",
      title: "The Blood Test",
      content: `MacReady holds the hot copper wire over the first blood sample. Every man is tied to a couch, unable to move, unable to interfere. This is the ultimate defensive programming: isolate every component, test each one individually, assume nothing.

He touches the wire to the first sample. Nothing. Human blood doesn't react—it's just cells, no independent intelligence. The man is verified. The component is authentic.

This is TypeScript's compile-time checking: you define what a component should be, and the type system verifies it matches. If there's a mismatch, the test fails.

Then he reaches Palmer's blood. The wire touches the sample. The blood explodes. Palmer screams—not in fear, but in rage. His body erupts, transforming. The Thing has been exposed.

This is the moment of type checking revelation: the component claimed to be human, but the test proved otherwise. The interface was perfect. The props matched. But the implementation was alien.`,
      demo: (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-200 mb-4">The Blood Test</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { name: "MacReady", isHuman: true },
              { name: "Childs", isHuman: true },
              { name: "Palmer", isHuman: false },
              { name: "Garry", isHuman: true },
            ].map((crew) => (
              <div
                key={crew.name}
                className={`bg-slate-900/50 border p-4 rounded transition-all ${
                  testedSamples.has(crew.name)
                    ? crew.isHuman
                      ? "border-blue-500/50"
                      : "border-red-500"
                    : "border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-slate-300">{crew.name}</span>
                  {testedSamples.has(crew.name) &amp;&amp; (
                    crew.isHuman ? (
                      <Shield className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Flame className="w-5 h-5 text-red-400" />
                    )
                  )}
                </div>
                
                <button
                  onClick={() => {
                    const newTested = new Set(testedSamples);
                    newTested.add(crew.name);
                    setTestedSamples(newTested);
                  }}
                  disabled={testedSamples.has(crew.name)}
                  className={`w-full px-4 py-2 border transition-colors ${
                    testedSamples.has(crew.name)
                      ? "bg-slate-800/50 border-slate-700 text-slate-600 cursor-not-allowed"
                      : "bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  {testedSamples.has(crew.name) ? "Tested" : "Test Blood Sample"}
                </button>
                
                {testedSamples.has(crew.name) &amp;&amp; (
                  <div className={`mt-3 p-3 rounded text-sm ${
                    crew.isHuman
                      ? "bg-blue-950/30 border border-blue-500/30 text-blue-300"
                      : "bg-red-950/30 border border-red-500/30 text-red-300"
                  }`}>
                    {crew.isHuman ? (
                      <code>✓ Human verified</code>
                    ) : (
                      <code>✗ Thing detected!</code>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-sm text-slate-400 text-center">
            Test each crew member's blood sample. The test reveals true identity despite perfect mimicry.
          </p>
        </div>
      ),
    },
    {
      id: "summary",
      title: "Trust, But Verify",
      content: `The Antarctic wind howls over the ruins of Outpost 31. MacReady and Childs sit in the snow, the station burning behind them, sharing a bottle of whiskey. The heat won't last. They'll freeze soon.

"How do we know you're not one of them?" Childs asks.

"I don't," MacReady says. "But if we're both human, we'll freeze to death anyway."

This is the final lesson: even with perfect type checking, even with runtime validation, even with defensive programming—you can't eliminate all risk. You can only manage it.

TypeScript catches type mismatches at compile time. Runtime validation catches behavioral anomalies. Defensive programming limits the damage when something slips through.

But in the end, you're building systems in an uncertain world. You verify what you can. You test what you can. You build safeguards.

The interface is not the implementation. The props are not the behavior. The type signature is not the truth.

You verify. You test. You remain vigilant.

And you never, ever trust a component just because it looks right.`,
      demo: (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-200 mb-4">Three Layers of Defense</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-950/20 border border-blue-500/30 p-6 rounded">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-6 h-6 text-blue-400" />
                <h4 className="font-bold text-blue-300">Layer 1: Compile-Time Type Checking</h4>
              </div>
              <pre className="text-sm text-slate-300 mb-2">
{`interface CrewMember {
  name: string;
  role: string;
  isHuman: true;
}

// TypeScript catches this at compile time
const thing: CrewMember = {
  name: "Palmer",
  role: "mechanic",
  isHuman: true,
  assimilate: () => {} // ❌ Error
};`}
              </pre>
              <p className="text-sm text-blue-300">Catches type mismatches before code runs.</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-600 p-6 rounded">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-6 h-6 text-slate-400" />
                <h4 className="font-bold text-slate-300">Layer 2: Runtime Validation</h4>
              </div>
              <pre className="text-sm text-slate-300 mb-2">
{`import { z } from 'zod';

const CrewSchema = z.object({
  name: z.string(),
  role: z.string(),
  isHuman: z.literal(true)
});

// Validates at runtime
const validated = CrewSchema.parse(data);`}
              </pre>
              <p className="text-sm text-slate-400">Catches data issues when components are used.</p>
            </div>

            <div className="bg-red-950/20 border border-red-500/30 p-6 rounded">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <h4 className="font-bold text-red-300">Layer 3: Defensive Programming</h4>
              </div>
              <pre className="text-sm text-slate-300 mb-2">
{`function SafeProfile({ user }: { user: unknown }) {
  if (!user || typeof user !== 'object') {
    return <ErrorBoundary />;
  }
  
  if (!('name' in user)) {
    return <ErrorBoundary />;
  }
  
  return <div>{user.name}</div>;
}`}
              </pre>
              <p className="text-sm text-red-300">Assumes components might be compromised.</p>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-700 p-6 rounded text-center">
            <p className="text-slate-300 mb-2">
              <strong>The Lesson:</strong> The interface is not the implementation.
            </p>
            <p className="text-sm text-slate-400">
              Verify your components. Test their behavior. Build systems that survive when verification fails.
            </p>
          </div>
        </div>
      ),
    },
  ], [revealedComponent, typeCheckingEnabled, infectedNodes, testedSamples]);

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-mono">
      <header className="border-b border-red-500/30 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
              The Thing
            </h1>
          </div>
          <p className="text-slate-400 text-sm md:text-base">
            U.S. Outpost 31, Antarctica, 1982
          </p>
          <p className="text-red-400 text-xs md:text-sm mt-1">
            Component Swapping &amp; Type Checking
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 pb-32">
        <article className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6 border-l-4 border-red-500 pl-4">
            {currentChapter.title}
          </h2>
          
          <div className="prose prose-invert max-w-none mb-8">
            {currentChapter.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {currentChapter.demo &amp;&amp; (
          <section className="bg-slate-900/30 border border-slate-700 rounded-lg p-6 md:p-8">
            {currentChapter.demo}
          </section>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-t border-red-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="px-4 md:px-6 py-2 bg-slate-800 border border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-800 disabled:hover:border-slate-600 transition-colors"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs md:text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="flex gap-1">
                {chapters.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === chapter ? "bg-red-500" : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-4 md:px-6 py-2 bg-slate-800 border border-slate-600 text-slate-300 hover:bg-slate-700 hover:border-slate-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-800 disabled:hover:border-slate-600 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}