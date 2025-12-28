import { useState, useEffect, useRef, useMemo } from "react";
import { Zap, AlertTriangle, Shield, Skull, CheckCircle } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function JurassicParkSideEffects() {
  const [chapter, setChapter] = useState(0);

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "Welcome to Jurassic Park",
        content: `"Welcome to Jurassic Park."

John Hammond's voice echoes through the visitor center as the massive wooden doors swing open. Before you stands something impossible: a living, breathing Brachiosaurus, its neck stretching toward the treetops of Isla Nublar. The paleontologists—Grant, Sattler, Malcolm—stand frozen in awe.

"We spared no expense," Hammond beams, gesturing at the sprawling complex of paddocks, electric fences, and monitoring systems. Every dinosaur is tracked. Every fence is electrified. Every contingency is planned.

This is a React component mounting for the first time. The park initializes its systems—power grids hum to life, security cameras activate, feeding schedules begin. These are side effects: processes that reach beyond the component itself, touching the outside world. They start timers, open connections, create living processes.

Hammond's chief engineer, Ray Arnold, pulls up the control room interface. "All systems automated," he explains, cigarette dangling from his lips. "The park runs itself. Dinosaurs are fed on schedule. Fences maintain 10,000 volts. Tour vehicles follow their tracks."

Dr. Ian Malcolm, dressed in black, leans against the console. His voice carries a warning wrapped in chaos theory: "The lack of humility before nature that's being displayed here staggers me."

But Hammond waves him off. The tour begins. The Jeeps roll forward on their automated tracks. Everything appears controlled, contained, perfect.

This is the seductive moment when you add a useEffect hook. It works beautifully at first. Your side effect—fetching data, subscribing to events, starting an animation—does exactly what you want. The component mounts, the effect runs, and everything seems stable.

The dinosaurs are in their paddocks. The fences are electrified. What could possibly go wrong?

Malcolm adjusts his sunglasses and mutters to himself: "Life finds a way."

He's talking about side effects. And he's right to be worried.`,
      },
      {
        id: "build",
        title: "Life Finds a Way",
        content: `"How do you know they're all female?" Dr. Sattler asks, watching a herd of Gallimimus sprint across the plain.

Henry Wu, the park's chief geneticist, explains with scientific confidence: "We control their chromosomes. All the dinosaurs are female. We engineered them that way to prevent breeding."

"But again, how do you know they're all female?" Sattler presses.

"Because we control the chromosomes—"

"But life finds a way," Malcolm interrupts, his voice sharp with certainty.

Later, deep in the park, Grant and the kids discover something that shouldn't exist: eggshells. Broken, empty eggshells. The dinosaurs are breeding.

This is the moment you discover your side effect is doing more than you thought.

Wu's team used frog DNA to fill gaps in the dinosaur genome. Frogs—specifically West African frogs—can spontaneously change sex in a single-sex environment. The dinosaurs inherited this trait. The side effect you thought was contained has spawned additional, unintended side effects.

In React terms: your useEffect is triggering behaviors you didn't account for in your dependency array.

You set up a WebSocket connection. But that connection triggers a reconnection attempt when it drops. Which triggers an error handler. Which triggers a notification. Which triggers a state update. Which triggers a re-render. Which triggers the effect again.

You thought you were creating one dinosaur. You're actually creating a breeding population.

Back in the control room, Arnold pulls up the park's population count. "We have 238 dinosaurs," he announces.

Malcolm leans over the screen. "How many were supposed to be here?"

"238."

"Are you sure?"

Arnold runs the count again, this time including all age groups, not just the expected adults. The number climbs: 239... 244... 262... 283...

"Jesus Christ," Arnold whispers.

This is your console filling with warnings. This is your network tab showing dozens of redundant requests. This is your memory profiler showing a leak.

The park has a failsafe, of course. The "lysine contingency." All dinosaurs are engineered to be unable to produce the amino acid lysine. They require lysine supplements in their food. If they escape, they'll die within 7 days.

"It's a cleanup function," Malcolm observes dryly. "Assuming it works. Assuming you remembered to implement it. Assuming the dinosaurs don't find another source of lysine in the wild."

This is the return statement in your useEffect. The cleanup function that's supposed to run when your component unmounts or re-renders. The function that closes connections, cancels subscriptions, clears timers.

But here's the question that should terrify you: Did you actually implement it? Did you test it? Do you know what happens when your component unmounts?

Outside, thunder rumbles. A tropical storm is approaching Isla Nublar.

And in the maintenance shed, Dennis Nedry is about to shut down the park's security systems.`,
      },
      {
        id: "climax",
        title: "System Failure",
        content: `"Hold onto your butts," Arnold mutters, watching his screens flicker.

Dennis Nedry's sabotage is elegant and devastating. To steal dinosaur embryos, he needs to shut down the security systems. But the park's infrastructure is interconnected—turning off the security grid means turning off the electric fences.

This is your component unmounting. Or re-rendering. Or being removed from the DOM.

The power dies. The fences go dark. And the dinosaurs—those living, autonomous side effects—don't stop just because the component that created them is gone.

In the Tyrannosaur paddock, the tour vehicles sit motionless on their track. The kids press their faces against the glass, watching the rain. Then they notice: the fence isn't humming anymore. The warning lights are off.

The T-Rex pushes against the fence. It doesn't shock her. She pushes harder. The fence collapses.

This is an event listener that keeps firing after your component unmounts. This is a WebSocket connection that stays open, consuming memory. This is a timer that keeps ticking, triggering callbacks in a component that no longer exists.

The T-Rex attacks the vehicles. She flips one, shatters the glass of another. Grant and the kids barely escape, running into the darkness while the dinosaur's roar shakes the jungle.

In the visitor center, the raptors—the park's most intelligent predators—test the fences systematically. They remember. They learn. And now the fences are down.

"They should all be dead," Wu insists, staring at the monitors. "The lysine contingency—"

"Didn't work," Malcolm finishes. "Or you never actually tested it. Or the dinosaurs found lysine in the wild plants. Your cleanup function failed."

This is the nightmare scenario: your cleanup function either doesn't exist, doesn't run, or doesn't work correctly.

Arnold frantically tries to restore power. But Nedry's code is a mess—a tangle of hacks and shortcuts. "I can't get the security systems back online without rebooting the entire park," he realizes.

"Then reboot it!" Hammond shouts.

"If I reboot, everything shuts down. Including the raptor fences."

This is the cascade failure. One missing cleanup function leads to resource leaks. Resource leaks lead to performance degradation. Performance degradation leads to crashes. Crashes lead to data loss.

The raptors escape. They hunt in packs, coordinating, learning. They corner Arnold in the maintenance shed. They stalk Ellie through the dark corridors. They trap the kids in the kitchen, their claws clicking on the stainless steel counters.

Each dinosaur is a side effect that should have been cleaned up when the park "unmounted." Instead, they're loose, consuming resources (in this case, people), growing more dangerous with every passing minute.

Grant watches from the visitor center's second floor as a raptor stalks below. "They're lethal at eight months," he whispers to the kids. "And I do mean lethal."

These are your memory leaks at scale. Your application slowing to a crawl. Your server running out of connections. Your users experiencing crashes.

All because you forgot one simple thing: the cleanup function.

The storm rages outside. The power is still down. And the dinosaurs—those beautiful, terrible side effects—are everywhere.`,
      },
      {
        id: "resolution",
        title: "Restoring Containment",
        content: `"I'm going to bring the systems back online," Ellie announces, grabbing a flashlight. "One by one. Properly."

This is the moment of understanding. The moment when you realize that cleanup isn't optional—it's survival.

Ellie runs through the rain to the maintenance shed, stepping over Nedry's body (killed by a Dilophosaurus—another escaped side effect). Inside, she finds the manual override panel. But she can't just flip everything back on. She has to follow the proper shutdown and restart sequence.

This is implementing your cleanup function correctly.

Ellie throws the first breaker. The main power grid hums to life. Then the second: the security systems boot up. Then the third: the fences begin to charge.

But there's a problem. The raptors are already inside the visitor center. The cleanup function can't retroactively fix the damage caused by its absence. It can only prevent future damage.

This is the hard truth about cleanup functions: they prevent leaks, but they don't fix the consequences of past leaks. If your WebSocket stayed open for an hour, consuming memory, closing it now doesn't give you that memory back. You have to restart (reload the page, restart the server).

Grant and the kids are trapped in the kitchen with two raptors. But Grant understands systems now. He understands that you can't just fight the side effects—you have to contain them properly from the start.

He uses the kitchen's reflective surfaces to confuse the raptors. He leads them into the freezer—a containment system. He locks the door. This is manual cleanup when automatic cleanup fails.

In the control room, Arnold's replacement (he didn't make it) brings the systems online in the correct order:

1. Power grid (component infrastructure)
2. Security systems (monitoring and logging)
3. Fence network (cleanup functions)
4. Lysine supplementation (ongoing maintenance)

The fences electrify. The remaining dinosaurs are contained. The park is still a disaster, but at least the side effects are no longer propagating.

Hammond sits in the ruined visitor center, holding a cane, looking at the wreckage. "I was so preoccupied with whether or not I could," he says quietly, "that I didn't stop to think if I should."

This is the developer's realization: just because you can add a side effect doesn't mean you should. And if you do, you must respect its power.

Malcolm, injured but alive, offers the final lesson: "You stood on the shoulders of geniuses to accomplish something as fast as you could, and before you even knew what you had, you patented it, packaged it, slapped it on a plastic lunchbox, and now you want to sell it."

Translation: You copied a useEffect from Stack Overflow without understanding it. You shipped it without testing the cleanup. You didn't consider the consequences.

The helicopter arrives. The survivors board. As they lift off, Grant looks back at Isla Nublar—the island where side effects ran wild because someone forgot the cleanup function.

"Some things," he says, "shouldn't be controlled. But if you're going to control them, do it right."

Every useEffect needs a cleanup function. Every side effect needs containment. Every dinosaur needs a fence.

No exceptions.`,
      },
      {
        id: "summary",
        title: "The Lysine Contingency",
        content: `Six months later, Isla Nublar is abandoned. The dinosaurs roam free, a monument to hubris and missing cleanup functions.

But let's imagine an alternate timeline. A timeline where InGen's engineers understood side effects.

When the fences go down, the lysine contingency activates automatically. The dinosaurs, unable to produce lysine, begin to weaken. Within hours, they return to their paddocks, seeking the lysine-enriched food. The cleanup function works.

When Nedry shuts down the security systems, a failsafe triggers: all dinosaur paddocks automatically seal with mechanical locks—backup containment that doesn't rely on electricity. The cleanup function has redundancy.

When the T-Rex escapes, a tracking system activates, deploying tranquilizer drones. The side effect is monitored and contained. The cleanup function is proactive, not reactive.

Every side effect must have a cleanup function. If your useEffect creates something that persists (connection, subscription, timer, listener), your cleanup function must destroy it. No exceptions. The dinosaurs don't clean themselves up.

Cleanup functions must actually work. The lysine contingency sounded good in theory. But it was never tested in real conditions. Test your cleanup. Verify it runs. Confirm it actually closes/cancels/removes what it's supposed to.

Side effects will find a way to escape. Malcolm was right. Your side effect will do things you didn't anticipate. It will trigger other effects. It will persist when you think it stopped. It will breed. Account for this in your dependencies and cleanup logic.

Without cleanup: Component unmounts → side effects continue running → dinosaurs escape → consume resources (people/memory) → system crashes → total failure → survivors traumatized → users frustrated.

With cleanup: Component unmounts → cleanup function runs → side effects terminate gracefully → resources freed → system remains stable → smooth user experience → everyone goes home safely → users happy.

As the helicopter flies away from Isla Nublar, Grant looks at Hammond. The old man is broken, his dream in ruins.

"You never had control," Grant says. "That was the illusion. The dinosaurs were always going to do what they do. The only question was whether you'd be ready when they did."

Your side effects are dinosaurs. They're powerful, autonomous, and dangerous. They will do what they do. The only question is: Did you write the cleanup function?

Because life—and side effects—will always find a way.

Remember: useEffect without cleanup = Jurassic Park without fences. Side effects without containment = dinosaurs without lysine contingency. Components without proper unmounting = visitors without an escape plan.

The lysine contingency is your return statement. Use it. Test it. Respect it.

Or prepare for the T-Rex.`,
      },
    ],
    []
  );

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-amber-500/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-amber-500" />
            <h1 className="text-4xl font-bold text-amber-500">
              Jurassic Park
            </h1>
          </div>
          <p className="text-lg text-slate-400 ml-11">
            Isla Nublar, 1993
          </p>
          <p className="text-sm text-amber-400/70 ml-11 mt-1">
            Side Effects &amp; useEffect Cleanup
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-amber-400 mb-2">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 bg-amber-500/50 rounded"></div>
        </div>

        {/* Chapter Content */}
        <article className="prose prose-invert prose-slate max-w-none mb-12">
          <div className="text-slate-300 leading-relaxed whitespace-pre-line text-lg">
            {currentChapter.content}
          </div>
        </article>

        {/* Interactive Demonstrations */}
        {chapter === 0 &amp;&amp; <ParkStatusDemo />}
        {chapter === 1 &amp;&amp; <BreedingCounterDemo />}
        {chapter === 2 &amp;&amp; <PowerFailureDemo />}
        {chapter === 3 &amp;&amp; <CodeComparisonDemo />}
        {chapter === 4 &amp;&amp; <SideBySideDemo />}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-amber-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded transition-colors"
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
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-semibold rounded transition-colors"
            >
              Next
            </button>
          </div>

          <div className="text-center mt-2 text-sm text-slate-500">
            Chapter {chapter + 1} of {chapters.length}
          </div>
        </div>
      </footer>
    </div>
  );
}

// Demo Components

function ParkStatusDemo() {
  return (
    <div className="bg-slate-900/50 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        Park Status: All Systems Operational
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["T-Rex Paddock", "Raptor Enclosure", "Brachiosaurus Field"].map(
          (paddock) => (
            <div
              key={paddock}
              className="bg-slate-800/50 border border-emerald-500/50 rounded p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">{paddock}</span>
                <CheckCircle className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-xs text-emerald-400">
                Fence: 10,000V Active
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Containment: Secure
              </div>
            </div>
          )
        )}
      </div>
      <p className="text-sm text-slate-500 mt-4 italic">
        "We spared no expense." — John Hammond
      </p>
    </div>
  );
}

function BreedingCounterDemo() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [population, setPopulation] = useState(238);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMonitoring) {
      intervalRef.current = window.setInterval(() => {
        setPopulation((p) => p + Math.floor(Math.random() * 3) + 1);
      }, 800);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMonitoring]);

  const handleReset = () => {
    setIsMonitoring(false);
    setPopulation(238);
  };

  return (
    <div className="bg-slate-900/50 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Population Monitor
      </h3>

      <div className="bg-slate-800/50 rounded-lg p-6 mb-4">
        <div className="text-center">
          <div className="text-sm text-slate-400 mb-2">
            Dinosaur Population
          </div>
          <div
            className={`text-6xl font-bold mb-2 ${
              population > 238 ? "text-red-500" : "text-emerald-500"
            }`}
          >
            {population}
          </div>
          <div className="text-xs text-slate-500">
            Expected: 238 | Current: {population}
          </div>
          {population > 238 &amp;&amp; (
            <div className="mt-4 text-sm text-red-400 flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Unauthorized breeding detected!
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`flex-1 px-4 py-2 rounded font-semibold transition-colors ${
            isMonitoring
              ? "bg-red-600 hover:bg-red-500 text-white"
              : "bg-amber-600 hover:bg-amber-500 text-white"
          }`}
        >
          {isMonitoring ? "Stop Monitoring" : "Start Monitoring"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-semibold transition-colors"
        >
          Reset
        </button>
      </div>

      <p className="text-sm text-slate-500 mt-4 italic">
        "Life finds a way." — Dr. Ian Malcolm
      </p>
    </div>
  );
}

function PowerFailureDemo() {
  const [hasPower, setHasPower] = useState(true);
  const [hasCleanup, setHasCleanup] = useState(false);
  const [escapedDinosaurs, setEscapedDinosaurs] = useState(0);
  const [resourceUsage, setResourceUsage] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hasPower &amp;&amp; !hasCleanup) {
      // Simulate memory leak - effect continues without cleanup
      intervalRef.current = window.setInterval(() => {
        setEscapedDinosaurs((d) => d + 1);
        setResourceUsage((r) => Math.min(r + 5, 100));
      }, 500);
    }

    // Cleanup function - only runs if hasCleanup is true
    return () => {
      if (hasCleanup &amp;&amp; intervalRef.current) {
        clearInterval(intervalRef.current);
        setEscapedDinosaurs(0);
        setResourceUsage(0);
      }
    };
  }, [hasPower, hasCleanup]);

  const handlePowerToggle = () => {
    if (hasPower) {
      setHasPower(false);
    } else {
      setHasPower(true);
      if (hasCleanup) {
        setEscapedDinosaurs(0);
        setResourceUsage(0);
      }
    }
  };

  const handleReset = () => {
    setHasPower(true);
    setEscapedDinosaurs(0);
    setResourceUsage(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5" />
        Power Grid Simulator
      </h3>

      <div className="mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
          <input
            type="checkbox"
            checked={hasCleanup}
            onChange={(e) => setHasCleanup(e.target.checked)}
            className="w-4 h-4"
          />
          Enable Cleanup Function (Lysine Contingency)
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-2">Power Status</div>
          <div
            className={`text-2xl font-bold ${
              hasPower ? "text-emerald-500" : "text-red-500"
            }`}
          >
            {hasPower ? "ONLINE" : "OFFLINE"}
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <div className="text-sm text-slate-400 mb-2">Escaped Dinosaurs</div>
          <div className="flex items-center gap-2">
            <Skull className="w-5 h-5 text-red-500" />
            <span className="text-2xl font-bold text-red-500">
              {escapedDinosaurs}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
        <div className="text-sm text-slate-400 mb-2">
          Resource Usage (Memory Leak)
        </div>
        <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
          <div
            className="bg-red-500 h-full transition-all duration-300"
            style={{ width: `${resourceUsage}%` }}
          ></div>
        </div>
        <div className="text-xs text-slate-500 mt-1">{resourceUsage}%</div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handlePowerToggle}
          className={`flex-1 px-4 py-2 rounded font-semibold transition-colors ${
            hasPower
              ? "bg-red-600 hover:bg-red-500 text-white"
              : "bg-emerald-600 hover:bg-emerald-500 text-white"
          }`}
        >
          {hasPower ? "Cut Power" : "Restore Power"}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-semibold transition-colors"
        >
          Reset
        </button>
      </div>

      <p className="text-sm text-slate-500 mt-4 italic">
        {hasCleanup
          ? "Cleanup function active. Side effects will be contained."
          : "No cleanup function. Side effects will persist after unmount."}
      </p>
    </div>
  );
}

function CodeComparisonDemo() {
  return (
    <div className="bg-slate-900/50 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-amber-400 mb-4">
        The Lysine Contingency: Code Comparison
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Without Cleanup */}
        <div className="bg-slate-800/50 border border-red-500/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h4 className="font-bold text-red-400">Without Cleanup</h4>
          </div>
          <pre className="text-xs text-slate-300 overflow-x-auto">
            <code>{`useEffect(() => {
  // Create side effect
  const subscription = 
    dataSource.subscribe(
      handleData
    );
  
  const timer = 
    setInterval(
      checkStatus, 
      1000
    );
  
  const listener = 
    window.addEventListener(
      'resize', 
      handleResize
    );
  
  // ❌ NO CLEANUP!
  // Side effects persist
  // Memory leaks
  // Dinosaurs escape
}, [dataSource]);`}</code>
          </pre>
        </div>

        {/* With Cleanup */}
        <div className="bg-slate-800/50 border border-emerald-500/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <h4 className="font-bold text-emerald-400">With Cleanup</h4>
          </div>
          <pre className="text-xs text-slate-300 overflow-x-auto">
            <code>{`useEffect(() => {
  // Create side effect
  const subscription = 
    dataSource.subscribe(
      handleData
    );
  
  const timer = 
    setInterval(
      checkStatus, 
      1000
    );
  
  const listener = 
    window.addEventListener(
      'resize', 
      handleResize
    );
  
  // ✅ CLEANUP FUNCTION
  return () => {
    subscription.unsubscribe();
    clearInterval(timer);
    window.removeEventListener(
      'resize', 
      handleResize
    );
  };
}, [dataSource]);`}</code>
          </pre>
        </div>
      </div>

      <p className="text-sm text-slate-500 mt-4 italic">
        "I was so preoccupied with whether I could, I didn't stop to think if I
        should." — John Hammond
      </p>
    </div>
  );
}

function SideBySideDemo() {
  const [withoutCleanupMounted, setWithoutCleanupMounted] = useState(true);
  const [withCleanupMounted, setWithCleanupMounted] = useState(true);
  const [withoutCleanupLeaks, setWithoutCleanupLeaks] = useState(0);
  const [withCleanupLeaks, setWithCleanupLeaks] = useState(0);

  // Simulate park without cleanup
  useEffect(() => {
    let interval: number | null = null;

    if (withoutCleanupMounted) {
      interval = window.setInterval(() => {
        setWithoutCleanupLeaks((l) => l + 1);
      }, 500);
    }

    // NO CLEANUP - intentional leak for demonstration
    return () => {
      // Cleanup not implemented
    };
  }, [withoutCleanupMounted]);

  // Simulate park with cleanup
  useEffect(() => {
    let interval: number | null = null;

    if (withCleanupMounted) {
      interval = window.setInterval(() => {
        setWithCleanupLeaks((l) => l + 1);
      }, 500);
    }

    // PROPER CLEANUP
    return () => {
      if (interval) {
        clearInterval(interval);
        setWithCleanupLeaks(0);
      }
    };
  }, [withCleanupMounted]);

  return (
    <div className="bg-slate-900/50 border border-amber-500/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-amber-400 mb-4">
        Two Parks: A Comparison
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Without Cleanup Park */}
        <div className="bg-slate-800/50 border border-red-500/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-red-400">Park A: No Cleanup</h4>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>

          <div className="mb-4">
            <div className="text-sm text-slate-400 mb-2">Status</div>
            <div
              className={`text-lg font-bold ${
                withoutCleanupMounted ? "text-emerald-500" : "text-red-500"
              }`}
            >
              {withoutCleanupMounted ? "MOUNTED" : "UNMOUNTED"}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-slate-400 mb-2">
              Escaped Dinosaurs (Memory Leaks)
            </div>
            <div className="text-3xl font-bold text-red-500">
              {withoutCleanupLeaks}
            </div>
          </div>

          <button
            onClick={() =>
              setWithoutCleanupMounted(!withoutCleanupMounted)
            }
            className={`w-full px-4 py-2 rounded font-semibold transition-colors ${
              withoutCleanupMounted
                ? "bg-red-600 hover:bg-red-500"
                : "bg-emerald-600 hover:bg-emerald-500"
            } text-white`}
          >
            {withoutCleanupMounted ? "Unmount" : "Mount"}
          </button>

          <p className="text-xs text-slate-500 mt-3 italic">
            Side effects continue after unmount
          </p>
        </div>

        {/* With Cleanup Park */}
        <div className="bg-slate-800/50 border border-emerald-500/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-emerald-400">Park B: With Cleanup</h4>
            <CheckCircle className="w-5 h-5 text-emerald-500" />
          </div>

          <div className="mb-4">
            <div className="text-sm text-slate-400 mb-2">Status</div>
            <div
              className={`text-lg font-bold ${
                withCleanupMounted ? "text-emerald-500" : "text-slate-500"
              }`}
            >
              {withCleanupMounted ? "MOUNTED" : "UNMOUNTED"}
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-slate-400 mb-2">
              Escaped Dinosaurs (Memory Leaks)
            </div>
            <div className="text-3xl font-bold text-emerald-500">
              {withCleanupLeaks}
            </div>
          </div>

          <button
            onClick={() => setWithCleanupMounted(!withCleanupMounted)}
            className={`w-full px-4 py-2 rounded font-semibold transition-colors ${
              withCleanupMounted
                ? "bg-red-600 hover:bg-red-500"
                : "bg-emerald-600 hover:bg-emerald-500"
            } text-white`}
          >
            {withCleanupMounted ? "Unmount" : "Mount"}
          </button>

          <p className="text-xs text-slate-500 mt-3 italic">
            Cleanup function runs on unmount
          </p>
        </div>
      </div>

      <div className="mt-6 bg-amber-900/20 border border-amber-500/30 rounded-lg p-4">
        <p className="text-sm text-amber-300">
          <strong>Notice:</strong> Park A continues accumulating "escaped
          dinosaurs" even after unmounting. Park B properly cleans up when
          unmounted, resetting the count to zero.
        </p>
      </div>
    </div>
  );
}