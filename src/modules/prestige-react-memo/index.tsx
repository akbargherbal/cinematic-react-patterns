import { useState, useEffect, useRef, memo } from "react";
import { Zap, Users, Droplet, ToggleLeft, ToggleRight } from "lucide-react";

// Custom hook to track render count
function useRenderCount() {
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current += 1;
  });
  return renderCount.current;
}

// Angier component (unoptimized)
function AngierComponent({ stage }: { stage: string }) {
  const renders = useRenderCount();
  return (
    <div className="text-center">
      <div className="mb-2 text-2xl font-bold text-red-400">{renders}</div>
      <div className="text-sm text-slate-400">Renders (Drownings)</div>
    </div>
  );
}

// Borden component (optimized with memo)
const BordenComponent = memo(({ stage }: { stage: string }) => {
  const renders = useRenderCount();
  return (
    <div className="text-center">
      <div className="mb-2 text-2xl font-bold text-blue-400">{renders}</div>
      <div className="text-sm text-slate-400">Renders (Efficient)</div>
    </div>
  );
});

// Toggle-able component for demo
function ToggleableComponent({
  stage,
  useMemo,
}: {
  stage: string;
  useMemo: boolean;
}) {
  const renders = useRenderCount();
  return (
    <div className="text-center">
      <div className="mb-2 text-3xl font-bold text-blue-400">{renders}</div>
      <div className="text-sm text-slate-400">
        {useMemo ? "With React.memo" : "Without React.memo"}
      </div>
    </div>
  );
}

const MemoizedToggleable = memo(ToggleableComponent);

export default function PrestigeReactMemo() {
  const [chapter, setChapter] = useState(0);
  const [parentRenders, setParentRenders] = useState(0);
  const [memoEnabled, setMemoEnabled] = useState(false);

  // Auto-increment parent renders for demos
  useEffect(() => {
    const interval = setInterval(() => {
      setParentRenders((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const chapters = [
    {
      title: "Every Night, A New Man",
      content: `The Adelphi Theatre, London. 1899.

Every night at precisely 9:47 PM, Robert Angier steps into Tesla's machine and ceases to exist. A moment later, Robert Angier appears at the back of the theatre, takes his bow, and accepts the thunderous applause. The audience sees magic. They see The Transported Man—the greatest illusion in the history of stage performance.

But beneath the stage, in the darkness below the trapdoor, there is a tank. And in that tank, there is a man drowning.

The same man. Every night.

Angier's journal, March 15th: "One hundred performances. The trick is flawless. The audience gasps every time. They believe I am transported across the theatre in an instant. They do not know the cost. They do not see the tank."

Here is what the audience doesn't understand: the trick's parameters never change. Same stage. Same machine. Same entrance. Same exit. Same gasp of wonder. The input to the performance is identical night after night. The audience expects the Transported Man, and the Transported Man is what they receive.

Yet every single night, Angier creates a complete duplicate of himself. The original steps into the machine. The clone appears at the back of the theatre. The original falls through the trapdoor into the water tank below, where he drowns in the darkness while his duplicate bows to applause.

One hundred performances. One hundred identical tricks. One hundred drowned men.

This is the tragedy of Angier's obsession: he has built a machine that works perfectly, but he has never asked the question that would save his life: "Has anything changed since last night?"

In the language of React, Angier is a component that re-renders on every parent update, regardless of whether his props have changed. His parent component—the theatre, the show, the nightly schedule—triggers a render. And Angier, lacking any optimization, executes the full expensive operation of creating a new version of himself.

Every. Single. Time.`,
      demo: "counter",
    },
    {
      title: "The Tank Fills",
      content: `The weight of the dead is not metaphorical. It is literal, measurable, accumulating.

Angier's journal, June 3rd: "Two hundred and seventeen performances. I have begun to dream of drowning. Not my drowning—theirs. The ones in the tank. Sometimes I wonder: do they dream too, in those final seconds? Do they know they are me?"

The tank beneath the Adelphi Theatre was designed to hold water for stage effects—rain scenes, shipwrecks, dramatic floods. It was never meant to hold bodies. By the sixth month of Angier's run, the tank is nearly full. The theatre's foundation groans under the weight.

Cutter has tried everything to make Angier see reason.

"Look at your performance log," he says, spreading the stage manager's notes across the table. "June 1st: Transported Man, 9:47 PM, standard configuration. June 2nd: Transported Man, 9:47 PM, standard configuration. June 3rd—"

"I know what it says," Angier interrupts.

"Then you know the trick hasn't changed in six months! Same stage marks. Same lighting cues. Same entrance music. Same audience expectations. The input is identical, night after night. So why do you keep creating new versions of yourself?"

This is the anti-pattern: expensive child components that re-render on every parent update, even when their props are stable.

Consider the computational cost of Angier's trick:
- Activating Tesla's machine: enormous electrical power
- Creating a perfect duplicate: the full complexity of a human being
- Disposing of the original: the moral and physical weight of death

Now consider that this cost is paid every night for an identical result. The audience sees the same trick. The applause is the same. The illusion is the same. Only the corpse count changes.`,
      demo: "tank",
    },
    {
      title: "Borden Knows",
      content: `The Orpheum Theatre, across town. The same night.

Alfred Borden steps onto the stage at 9:47 PM. He enters the cabinet. A moment later, Alfred Borden appears at the back of the theatre. The audience gasps. The applause is identical to the applause at the Adelphi.

But beneath the Orpheum's stage, there is no tank. There are no bodies. There is only empty space, and the faint smell of sawdust.

Cutter and Angier watch from the wings, hidden in shadow.

"How?" Angier breathes. "How is he doing it?"

The trick is simple. Elegant. Brutal in its efficiency.

Borden is not one man. He is two. Identical twins, living as a single person, alternating performances. Tonight, Alfred enters the cabinet. His brother—also named Alfred, also Borden—appears at the back of the theatre. Tomorrow night, they will switch. The audience never knows. The illusion is perfect.

But here is the crucial detail: they only perform when the trick is called for. When the props change—when the stage configuration changes, when the audience is different, when the parameters of the illusion shift—then they execute. But when the props are the same as yesterday? They don't create anything new. They simply are.

In React terms, Borden's trick is wrapped in React.memo. Before the component re-renders, React performs a shallow comparison:
- Has stage changed? No.
- Has audience changed? No.
- Has configuration changed? No.

Then don't re-render. Return the cached result. Use the existing Borden. Don't create a new one.

This is the optimization Angier never implemented. This is the check he never performed.

Borden's diary: "We are one magician. The audience never knows which of us performs tonight. They don't need to know. The trick is the same. The result is the same. We simply check: has anything changed since yesterday? If not, we use yesterday's version. No waste. No death. Just the trick, performed efficiently, night after night."`,
      demo: "comparison",
    },
    {
      title: "The Optimization Angier Never Made",
      content: `Let us imagine an alternate timeline. A world where Angier asks the right question.

It is October 1899. Angier stands backstage at the Adelphi, staring at Tesla's machine. The tank beneath the stage holds 412 bodies. The theatre's foundation is cracking.

Cutter stands beside him, holding a piece of paper. On it, written in careful engineer's handwriting, is a simple algorithm:

Before activating the machine:
1. Check if stage configuration has changed
2. Check if audience context has changed
3. Check if trick parameters have changed
4. If nothing has changed: use yesterday's result
5. If something has changed: activate machine

"It's just a comparison," Cutter says. "A shallow check of your props. It takes a fraction of a second. And it would save your life."

Angier reads the paper. Reads it again. The logic is undeniable.

"You're saying... I should wrap my performance in a memo check."

"Yes."

This is React.memo in its purest form. With this wrapper, React performs a shallow comparison before executing the component's logic. The comparison is cheap. The duplication is expensive. The math is obvious.

In our alternate timeline, Angier implements the check. That night, at 9:47 PM, he stands before Tesla's machine and asks the questions:

- Has the stage changed? No. Same marks, same lighting, same configuration.
- Has the audience changed? No. Same demographic, same expectations, same context.
- Has the trick changed? No. Same entrance, same exit, same illusion.

Props are identical. Shallow comparison returns true. Skip the expensive operation.

Angier does not step into the machine. He does not create a new clone. He does not drown. He simply walks to the back of the theatre, takes his bow, and accepts the applause.

The audience sees the same trick they saw yesterday. They are equally amazed. The illusion is equally perfect.

But tonight, no one drowns.`,
      demo: "toggle",
    },
    {
      title: "The Prestige of Performance",
      content: `Every React component is a magician performing a trick. The question is: are you Angier, or are you Borden?

Angier creates a new version of himself every single night, regardless of whether anything has changed. His props remain identical, but he never checks. He simply executes the expensive operation.

Borden checks if the trick's parameters have changed before performing. If nothing has changed, he reuses the existing result. If something has changed, he executes the trick. The audience sees the same perfect illusion, but the cost is sustainable.

The lesson: Optimization is not about compromising the result. It's about achieving the same result more efficiently.

Your users don't care whether you memoized your components. They only care about the performance of your application. If it's fast, smooth, and responsive, the trick is perfect.

But to you, the developer, the method matters. Because unoptimized code accumulates like bodies in a tank. Technical debt grows. Performance degrades. Eventually, the foundation cracks.

Every time you write a React component, ask yourself Angier's question—the one he never asked:

"Has anything changed since the last render?"

If the answer is no, consider wrapping your component in React.memo. Check your props. Reuse your results. Don't drown in unnecessary re-renders.

Be Borden, not Angier.

The prestige isn't in creating something new every time. It's in knowing when the old trick still works.`,
      demo: "summary",
    },
  ];

  const currentChapter = chapters[chapter];

  const renderDemo = () => {
    switch (currentChapter.demo) {
      case "counter":
        return (
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
            <div className="mb-6 text-center">
              <Zap className="mx-auto mb-4 h-12 w-12 text-blue-400" />
              <h3 className="mb-2 text-2xl font-bold text-slate-200">
                The Nightly Performance
              </h3>
              <p className="text-slate-400">
                Parent component updates every 2 seconds. Watch Angier re-render
                every time.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-6">
                <div className="mb-4 text-center">
                  <div className="mb-2 text-lg font-semibold text-slate-300">
                    Parent (Theatre)
                  </div>
                  <div className="text-3xl font-bold text-blue-400">
                    {parentRenders}
                  </div>
                  <div className="mt-2 text-sm text-slate-400">
                    Nightly performances
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-red-500/30 bg-slate-800/50 p-6">
                <div className="mb-4 text-center">
                  <div className="mb-2 text-lg font-semibold text-slate-300">
                    Child (Angier)
                  </div>
                  <AngierComponent stage="main" />
                  <div className="mt-4 text-xs text-red-400">
                    Re-renders on every parent update
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "tank":
        return (
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
            <div className="mb-6 text-center">
              <Droplet className="mx-auto mb-4 h-12 w-12 text-red-400" />
              <h3 className="mb-2 text-2xl font-bold text-slate-200">
                The Tank Beneath the Stage
              </h3>
              <p className="text-slate-400">
                Each unnecessary render adds another drowned Angier to the tank.
              </p>
            </div>
            <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-slate-300">
                  <div className="text-sm">Parent renders:</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {parentRenders}
                  </div>
                </div>
                <div className="text-slate-300">
                  <div className="text-sm">Drowned Angiers:</div>
                  <div className="text-2xl font-bold text-red-400">
                    <AngierComponent stage="main" />
                  </div>
                </div>
              </div>
              <div className="relative h-48 overflow-hidden rounded border border-slate-700 bg-slate-950">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900/50 to-blue-500/20 transition-all duration-500"
                  style={{
                    height: `${Math.min((parentRenders / 20) * 100, 100)}%`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-wrap items-end justify-center gap-1 p-2">
                    {Array.from({ length: Math.min(parentRenders, 50) }).map(
                      (_, i) => (
                        <Droplet
                          key={i}
                          className="h-4 w-4 text-red-400 opacity-70"
                        />
                      ),
                    )}
                  </div>
                </div>
                <div className="absolute left-2 top-2 text-xs text-slate-500">
                  Tank capacity: {Math.min(parentRenders, 50)}/50
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-slate-400">
                Props haven't changed, yet the component keeps re-rendering
              </div>
            </div>
          </div>
        );

      case "comparison":
        return (
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
            <div className="mb-6 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-blue-400" />
              <h3 className="mb-2 text-2xl font-bold text-slate-200">
                Two Methods, Same Trick
              </h3>
              <p className="text-slate-400">
                Angier's machine vs. Borden's twins. Same props, different
                costs.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-red-500/30 bg-slate-800/50 p-6">
                <div className="mb-4 text-center">
                  <div className="mb-2 text-xl font-bold text-red-400">
                    Angier's Method
                  </div>
                  <div className="mb-4 text-sm text-slate-400">
                    No React.memo
                  </div>
                  <AngierComponent stage="main" />
                  <div className="mt-4 text-xs text-slate-500">
                    Creates new clone every night
                  </div>
                </div>
                <div className="mt-6 rounded border border-red-500/20 bg-slate-950 p-3">
                  <div className="font-mono text-xs text-red-300">
                    function Angier(props) {"{"}
                    <br />
                    &nbsp;&nbsp;// Expensive operation
                    <br />
                    &nbsp;&nbsp;return &lt;div&gt;...&lt;/div&gt;;
                    <br />
                    {"}"}
                  </div>
                </div>
              </div>
              <div className="rounded-lg border border-blue-500/30 bg-slate-800/50 p-6">
                <div className="mb-4 text-center">
                  <div className="mb-2 text-xl font-bold text-blue-400">
                    Borden's Method
                  </div>
                  <div className="mb-4 text-sm text-slate-400">
                    With React.memo
                  </div>
                  <BordenComponent stage="main" />
                  <div className="mt-4 text-xs text-slate-500">
                    Reuses existing twin
                  </div>
                </div>
                <div className="mt-6 rounded border border-blue-500/20 bg-slate-950 p-3">
                  <div className="font-mono text-xs text-blue-300">
                    const Borden = memo((props) =&gt; {"{"}
                    <br />
                    &nbsp;&nbsp;// Expensive operation
                    <br />
                    &nbsp;&nbsp;return &lt;div&gt;...&lt;/div&gt;;
                    <br />
                    {"}"});
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="inline-block rounded-lg border border-slate-600 bg-slate-800 px-6 py-3">
                <div className="mb-1 text-sm text-slate-400">
                  Props (identical):
                </div>
                <div className="font-mono text-xs text-slate-300">
                  stage: "main", audience: "standard"
                </div>
              </div>
            </div>
          </div>
        );

      case "toggle":
        return (
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
            <div className="mb-6 text-center">
              {memoEnabled ? (
                <ToggleRight className="mx-auto mb-4 h-12 w-12 text-blue-400" />
              ) : (
                <ToggleLeft className="mx-auto mb-4 h-12 w-12 text-red-400" />
              )}
              <h3 className="mb-2 text-2xl font-bold text-slate-200">
                The Optimization Toggle
              </h3>
              <p className="text-slate-400">
                Add or remove React.memo and watch the render count change.
              </p>
            </div>
            <div className="mb-6 flex justify-center">
              <button
                onClick={() => setMemoEnabled(!memoEnabled)}
                className={`rounded-lg px-8 py-4 font-semibold transition-all ${
                  memoEnabled
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
              >
                {memoEnabled ? "React.memo Enabled" : "React.memo Disabled"}
              </button>
            </div>
            <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-6">
              <div className="mb-4 text-center">
                <div className="mb-4 text-lg font-semibold text-slate-300">
                  Component Renders
                </div>
                {memoEnabled ? (
                  <MemoizedToggleable stage="main" useMemo={true} />
                ) : (
                  <ToggleableComponent stage="main" useMemo={false} />
                )}
              </div>
              <div className="mt-6 rounded border border-slate-700 bg-slate-950 p-4">
                <div className="font-mono text-xs text-slate-300">
                  {memoEnabled ? (
                    <>
                      <span className="text-blue-400">const</span> Component ={" "}
                      <span className="text-blue-400">memo</span>((props) =&gt;{" "}
                      {"{"}
                      <br />
                      &nbsp;&nbsp;
                      <span className="text-slate-500">
                        // Only re-renders when props change
                      </span>
                      <br />
                      &nbsp;&nbsp;<span className="text-blue-400">
                        return
                      </span>{" "}
                      &lt;div&gt;...&lt;/div&gt;;
                      <br />
                      {"}"});
                    </>
                  ) : (
                    <>
                      <span className="text-red-400">function</span>{" "}
                      Component(props) {"{"}
                      <br />
                      &nbsp;&nbsp;
                      <span className="text-slate-500">
                        // Re-renders on every parent update
                      </span>
                      <br />
                      &nbsp;&nbsp;<span className="text-red-400">
                        return
                      </span>{" "}
                      &lt;div&gt;...&lt;/div&gt;;
                      <br />
                      {"}"}
                    </>
                  )}
                </div>
              </div>
              <div className="mt-4 text-center text-sm text-slate-400">
                Parent renders: {parentRenders} times
              </div>
            </div>
          </div>
        );

      case "summary":
        return (
          <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-8">
            <div className="mb-8 text-center">
              <Zap className="mx-auto mb-4 h-12 w-12 text-blue-400" />
              <h3 className="mb-2 text-2xl font-bold text-slate-200">
                The Prestige: When to Optimize
              </h3>
            </div>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-blue-500/30 bg-slate-800/50 p-6">
                <h4 className="mb-4 text-lg font-bold text-blue-400">
                  ✓ Use React.memo when:
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    Component is expensive to render
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    Props are stable between renders
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    Parent re-renders frequently
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-blue-400">•</span>
                    Profiling shows performance issues
                  </li>
                </ul>
              </div>
              <div className="rounded-lg border border-red-500/30 bg-slate-800/50 p-6">
                <h4 className="mb-4 text-lg font-bold text-red-400">
                  ✗ Don't use React.memo when:
                </h4>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start">
                    <span className="mr-2 text-red-400">•</span>
                    Component is cheap to render
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-red-400">•</span>
                    Props change on every render
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-red-400">•</span>
                    Props are objects without memoization
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-red-400">•</span>
                    Comparison cost exceeds render cost
                  </li>
                </ul>
              </div>
            </div>
            <div className="rounded-lg border border-slate-600 bg-slate-800/50 p-6">
              <h4 className="mb-4 text-center text-lg font-bold text-slate-200">
                Live Comparison
              </h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="text-center">
                  <div className="mb-2 text-sm text-red-400">
                    Angier (No memo)
                  </div>
                  <AngierComponent stage="main" />
                </div>
                <div className="text-center">
                  <div className="mb-2 text-sm text-blue-400">
                    Borden (With memo)
                  </div>
                  <BordenComponent stage="main" />
                </div>
              </div>
              <div className="mt-6 text-center text-xs text-slate-400">
                Same props, different optimization strategies
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
          <div className="mb-2 flex items-center gap-4">
            <Zap className="h-8 w-8 text-blue-400 md:h-10 md:w-10" />
            <h1 className="text-3xl font-bold text-slate-100 md:text-5xl">
              The Prestige
            </h1>
          </div>
          <p className="ml-12 text-base text-slate-400 md:ml-14 md:text-lg">
            Robert Angier, Victorian London, 1899
          </p>
          <p className="ml-12 mt-1 text-sm text-blue-400 md:ml-14 md:text-base">
            React.memo & Performance Optimization
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 pb-32 md:py-12">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="mb-4 text-3xl font-bold text-slate-100 md:text-4xl">
            {currentChapter.title}
          </h2>
        </div>

        {/* Narrative Content */}
        <article className="prose prose-invert prose-slate mb-12 max-w-none">
          <div className="whitespace-pre-line text-base leading-relaxed text-slate-300 md:text-lg">
            {currentChapter.content}
          </div>
        </article>

        {/* Interactive Demo */}
        {renderDemo()}
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="rounded-lg bg-slate-800 px-4 py-2 font-semibold text-slate-300 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 md:px-6"
            >
              ← Previous
            </button>

            <div className="text-center">
              <div className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                {currentChapter.title}
              </div>
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-30 md:px-6"
            >
              Next →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
