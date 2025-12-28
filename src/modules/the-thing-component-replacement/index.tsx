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
  const [revealedComponent, setRevealedComponent] = useState<string | null>(
    null,
  );
  const [typeCheckingEnabled, setTypeCheckingEnabled] = useState(false);
  const [infectedNodes, setInfectedNodes] = useState<Set<string>>(new Set());
  const [testedSamples, setTestedSamples] = useState<Set<string>>(new Set());

  const chapters: Chapter[] = useMemo(
    () => [
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
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded border border-slate-700 bg-slate-900/50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-bold text-slate-200">
                    Component A
                  </h3>
                </div>
                <pre className="mb-4 text-sm text-slate-400">
                  {`interface DogProps {
  legs: number;
  fur: string;
  bark: () => void;
}`}
                </pre>
                <button
                  onClick={() =>
                    setRevealedComponent(revealedComponent === "A" ? null : "A")
                  }
                  className="border border-blue-500/50 bg-blue-500/20 px-4 py-2 text-blue-400 transition-colors hover:bg-blue-500/30"
                >
                  {revealedComponent === "A" ? "Hide" : "Reveal"} Implementation
                </button>
                {revealedComponent === "A" && (
                  <div className="mt-4 border border-blue-500/30 bg-blue-950/30 p-4 text-sm text-blue-300">
                    <code>
                      {`// Normal dog behavior
function bark() {
  console.log("Woof!");
}`}
                    </code>
                  </div>
                )}
              </div>

              <div className="rounded border border-red-700 bg-slate-900/50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h3 className="text-lg font-bold text-slate-200">
                    Component B
                  </h3>
                </div>
                <pre className="mb-4 text-sm text-slate-400">
                  {`interface DogProps {
  legs: number;
  fur: string;
  bark: () => void;
}`}
                </pre>
                <button
                  onClick={() =>
                    setRevealedComponent(revealedComponent === "B" ? null : "B")
                  }
                  className="border border-red-500/50 bg-red-500/20 px-4 py-2 text-red-400 transition-colors hover:bg-red-500/30"
                >
                  {revealedComponent === "B" ? "Hide" : "Reveal"} Implementation
                </button>
                {revealedComponent === "B" && (
                  <div className="mt-4 border border-red-500/30 bg-red-950/30 p-4 text-sm text-red-300">
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
            <p className="text-center text-sm text-slate-400">
              Both components have identical interfaces. Can you tell which is
              the Thing?
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
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-200">
                Component Swap Simulator
              </h3>
              <button
                onClick={() => setTypeCheckingEnabled(!typeCheckingEnabled)}
                className={`border px-4 py-2 transition-colors ${
                  typeCheckingEnabled
                    ? "border-blue-500/50 bg-blue-500/20 text-blue-400"
                    : "border-slate-600 bg-slate-700/20 text-slate-400"
                }`}
              >
                TypeScript: {typeCheckingEnabled ? "ON" : "OFF"}
              </button>
            </div>

            <div className="rounded border border-slate-700 bg-slate-900/50 p-6">
              <pre className="mb-4 text-sm text-slate-300">
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

              {typeCheckingEnabled && (
                <div className="rounded border border-blue-500/30 bg-blue-950/30 p-4">
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
            <h3 className="mb-4 text-lg font-bold text-slate-200">
              Infection Spread Simulator
            </h3>

            <div className="rounded border border-slate-700 bg-slate-900/50 p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="text-center">
                  <div
                    className={`inline-block cursor-pointer rounded border-2 px-6 py-3 transition-all ${
                      infectedNodes.has("root")
                        ? "border-red-500 bg-red-950/50 text-red-400"
                        : "border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500"
                    }`}
                    onClick={() => {
                      const newInfected = new Set(infectedNodes);
                      if (infectedNodes.has("root")) {
                        newInfected.clear();
                      } else {
                        newInfected.add("root");
                        setTimeout(() => {
                          setInfectedNodes(
                            new Set([...newInfected, "child1", "child2"]),
                          );
                        }, 500);
                        setTimeout(() => {
                          setInfectedNodes(
                            new Set([
                              ...newInfected,
                              "child1",
                              "child2",
                              "grandchild1",
                              "grandchild2",
                            ]),
                          );
                        }, 1000);
                      }
                      setInfectedNodes(newInfected);
                    }}
                  >
                    <Code className="mx-auto mb-1 h-6 w-6" />
                    <div className="font-mono text-sm">App</div>
                  </div>
                </div>

                <div className="flex gap-8">
                  <div
                    className={`rounded border-2 px-6 py-3 transition-all ${
                      infectedNodes.has("child1")
                        ? "border-red-500 bg-red-950/50 text-red-400"
                        : "border-slate-600 bg-slate-800 text-slate-300"
                    }`}
                  >
                    <Code className="mx-auto mb-1 h-5 w-5" />
                    <div className="font-mono text-xs">Header</div>
                  </div>
                  <div
                    className={`rounded border-2 px-6 py-3 transition-all ${
                      infectedNodes.has("child2")
                        ? "border-red-500 bg-red-950/50 text-red-400"
                        : "border-slate-600 bg-slate-800 text-slate-300"
                    }`}
                  >
                    <Code className="mx-auto mb-1 h-5 w-5" />
                    <div className="font-mono text-xs">Content</div>
                  </div>
                </div>

                <div className="flex gap-8">
                  <div
                    className={`rounded border-2 px-4 py-2 transition-all ${
                      infectedNodes.has("grandchild1")
                        ? "border-red-500 bg-red-950/50 text-red-400"
                        : "border-slate-600 bg-slate-800 text-slate-300"
                    }`}
                  >
                    <Code className="mx-auto mb-1 h-4 w-4" />
                    <div className="font-mono text-xs">Nav</div>
                  </div>
                  <div
                    className={`rounded border-2 px-4 py-2 transition-all ${
                      infectedNodes.has("grandchild2")
                        ? "border-red-500 bg-red-950/50 text-red-400"
                        : "border-slate-600 bg-slate-800 text-slate-300"
                    }`}
                  >
                    <Code className="mx-auto mb-1 h-4 w-4" />
                    <div className="font-mono text-xs">List</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-slate-400">
              Click the root component to see how corruption spreads through the
              tree.
              {infectedNodes.size > 0 &&
                " One infected component can compromise the entire system."}
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
            <h3 className="mb-4 text-lg font-bold text-slate-200">
              The Blood Test
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { name: "MacReady", isHuman: true },
                { name: "Childs", isHuman: true },
                { name: "Palmer", isHuman: false },
                { name: "Garry", isHuman: true },
              ].map((crew) => (
                <div
                  key={crew.name}
                  className={`rounded border bg-slate-900/50 p-4 transition-all ${
                    testedSamples.has(crew.name)
                      ? crew.isHuman
                        ? "border-blue-500/50"
                        : "border-red-500"
                      : "border-slate-700"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-slate-300">
                      {crew.name}
                    </span>
                    {testedSamples.has(crew.name) &&
                      (crew.isHuman ? (
                        <Shield className="h-5 w-5 text-blue-400" />
                      ) : (
                        <Flame className="h-5 w-5 text-red-400" />
                      ))}
                  </div>

                  <button
                    onClick={() => {
                      const newTested = new Set(testedSamples);
                      newTested.add(crew.name);
                      setTestedSamples(newTested);
                    }}
                    disabled={testedSamples.has(crew.name)}
                    className={`w-full border px-4 py-2 transition-colors ${
                      testedSamples.has(crew.name)
                        ? "cursor-not-allowed border-slate-700 bg-slate-800/50 text-slate-600"
                        : "border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500"
                    }`}
                  >
                    {testedSamples.has(crew.name)
                      ? "Tested"
                      : "Test Blood Sample"}
                  </button>

                  {testedSamples.has(crew.name) && (
                    <div
                      className={`mt-3 rounded p-3 text-sm ${
                        crew.isHuman
                          ? "border border-blue-500/30 bg-blue-950/30 text-blue-300"
                          : "border border-red-500/30 bg-red-950/30 text-red-300"
                      }`}
                    >
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

            <p className="text-center text-sm text-slate-400">
              Test each crew member's blood sample. The test reveals true
              identity despite perfect mimicry.
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
            <h3 className="mb-4 text-lg font-bold text-slate-200">
              Three Layers of Defense
            </h3>

            <div className="space-y-4">
              <div className="rounded border border-blue-500/30 bg-blue-950/20 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-400" />
                  <h4 className="font-bold text-blue-300">
                    Layer 1: Compile-Time Type Checking
                  </h4>
                </div>
                <pre className="mb-2 text-sm text-slate-300">
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
                <p className="text-sm text-blue-300">
                  Catches type mismatches before code runs.
                </p>
              </div>

              <div className="rounded border border-slate-600 bg-slate-800/50 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <Eye className="h-6 w-6 text-slate-400" />
                  <h4 className="font-bold text-slate-300">
                    Layer 2: Runtime Validation
                  </h4>
                </div>
                <pre className="mb-2 text-sm text-slate-300">
                  {`import { z } from 'zod';

const CrewSchema = z.object({
  name: z.string(),
  role: z.string(),
  isHuman: z.literal(true)
});

// Validates at runtime
const validated = CrewSchema.parse(data);`}
                </pre>
                <p className="text-sm text-slate-400">
                  Catches data issues when components are used.
                </p>
              </div>

              <div className="rounded border border-red-500/30 bg-red-950/20 p-6">
                <div className="mb-3 flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                  <h4 className="font-bold text-red-300">
                    Layer 3: Defensive Programming
                  </h4>
                </div>
                <pre className="mb-2 text-sm text-slate-300">
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
                <p className="text-sm text-red-300">
                  Assumes components might be compromised.
                </p>
              </div>
            </div>

            <div className="rounded border border-slate-700 bg-slate-900/50 p-6 text-center">
              <p className="mb-2 text-slate-300">
                <strong>The Lesson:</strong> The interface is not the
                implementation.
              </p>
              <p className="text-sm text-slate-400">
                Verify your components. Test their behavior. Build systems that
                survive when verification fails.
              </p>
            </div>
          </div>
        ),
      },
    ],
    [revealedComponent, typeCheckingEnabled, infectedNodes, testedSamples],
  );

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-mono text-slate-300">
      <header className="sticky top-0 z-10 border-b border-red-500/30 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="mb-2 flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold tracking-tight text-slate-100 md:text-4xl">
              The Thing
            </h1>
          </div>
          <p className="text-sm text-slate-400 md:text-base">
            U.S. Outpost 31, Antarctica, 1982
          </p>
          <p className="mt-1 text-xs text-red-400 md:text-sm">
            Component Swapping & Type Checking
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 pb-32">
        <article className="mb-12">
          <h2 className="mb-6 border-l-4 border-red-500 pl-4 text-2xl font-bold text-slate-100 md:text-3xl">
            {currentChapter.title}
          </h2>

          <div className="prose prose-invert mb-8 max-w-none">
            {currentChapter.content.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 leading-relaxed text-slate-300">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {currentChapter.demo && (
          <section className="rounded-lg border border-slate-700 bg-slate-900/30 p-6 md:p-8">
            {currentChapter.demo}
          </section>
        )}
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-red-500/30 bg-slate-950/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="border border-slate-600 bg-slate-800 px-4 py-2 text-slate-300 transition-colors hover:border-slate-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-600 disabled:hover:bg-slate-800 md:px-6"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 md:text-sm">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="flex gap-1">
                {chapters.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      idx === chapter ? "bg-red-500" : "bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="border border-slate-600 bg-slate-800 px-4 py-2 text-slate-300 transition-colors hover:border-slate-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-slate-600 disabled:hover:bg-slate-800 md:px-6"
            >
              Next →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
