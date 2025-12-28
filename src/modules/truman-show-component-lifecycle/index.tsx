import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Play, Pause, RotateCcw, Sun, Cloud, Users, Camera, Zap, DoorOpen, Activity } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function TrumanShowLifecycle() {
  const [chapter, setChapter] = useState(0);

  const chapters: Chapter[] = useMemo(() => [
    {
      id: "intro",
      title: "Good Morning, and in Case I Don't See Ya...",
      content: `Every morning at 7:00 AM sharp, the sun rises over Seahaven Island. Not because of celestial mechanics, but because Christof presses a button in the control room. The light floods Truman Burbank's bedroom, the alarm clock chirps, and the component mounts for another day.

Truman doesn't know it, but his entire existence is a single React component with the most elaborate useEffect hook ever written. When he was born—when the component first mounted—the production crew executed a massive setup function. They built the island. They hired the actors. They programmed the weather systems. They synchronized 5,000 cameras. Every element of his reality is a side effect, carefully orchestrated to run in perfect harmony with his state.

Watch him now, stepping out his front door. "Good morning!" he calls to his neighbor, Spencer. Spencer waves back—right on cue, because Spencer is part of the effect. The newspaper delivery, the passing cars, the dog walker, the friendly insurance salesman—all side effects, all synchronized to Truman's current state.

This is what useEffect does. It synchronizes external systems with your component's internal state. When Truman moves, the world moves with him. When his mood shifts, the weather adjusts. When he drives to work, actors are deployed along his route. The effect keeps the outside world consistent with the inside state.`
    },
    {
      id: "build",
      title: "The Cracks in the Dome",
      content: `It starts with a light falling from the sky.

Truman is walking to his car, coffee in hand, when a massive stage light crashes onto the street in front of him. It's labeled "SIRIUS (9 Canis Major)." For a moment, the effect has failed. A piece of the machinery has become visible. The dependency array didn't account for equipment failure.

In the control room, panic. "How did that happen?" Christof demands. "Get it cleaned up before he examines it too closely." They scramble. They improvise. The radio announces it was debris from an airplane. The effect tries to self-correct, but the damage is done. Truman's suspicion state has changed.

And when state changes, effects re-run.

Now Truman is paying attention. He notices the same people walking past his office in loops. He sees the same Volkswagen Beetle drive by three times. He catches the radio frequency that's narrating his movements: "He's at the corner of Lancaster Square, heading east." These are all side effects running on a schedule, but now he's seeing the pattern. The dependency array is incomplete—it tracks his location but not his awareness.`
    },
    {
      id: "climax",
      title: "The Storm Without Cleanup",
      content: `The sailboat is called the Santa Maria, and Truman is sailing it straight toward the edge of his world. Behind him, Seahaven Island grows smaller. Ahead, the horizon beckons. He's unmounting, and there's nothing Christof can do to stop him.

Except there is. One last, desperate effect.

"Cue the storm," Christof commands. "Everything we have."

The weather system activates with terrifying force. Wind machines roar to life. Wave generators churn the water into mountains. Lightning rigs fire bolts across the artificial sky. This is an effect running at maximum intensity, consuming every available resource, trying to force Truman back to shore. Trying to prevent the unmount.

This is what happens when you don't write cleanup functions. The effect can't gracefully handle the component's unmounting. It can only thrash, consuming resources, trying to maintain a state that's no longer sustainable. It's a memory leak in human form—a system that refuses to let go.`
    },
    {
      id: "resolution",
      title: "Exit Through the Painted Sky",
      content: `The door is small, black, and utterly real. It has a handle. It has hinges. It has a sign that reads "EXIT." This is the cleanup function, the proper unmounting sequence, the graceful way to end a component's lifecycle.

Truman stands before it, hand on the handle, and Christof's voice booms from the sky.

"Truman." The voice is everywhere, omnipresent, like a system message from React itself. "You can speak. I can hear you."

This is the last effect trying to run. The final attempt to keep the component mounted. Christof offers everything—safety, predictability, control. "There's no more truth out there than in the world I created for you. The same lies, the same deceit. But in my world, you have nothing to fear."

But Truman understands something Christof doesn't. Something every React developer must learn.

Components are meant to unmount. Effects are meant to clean up. Lifecycles are meant to end.

"In case I don't see ya," Truman says, "good afternoon, good evening, and good night."

He opens the door. He steps through. The component unmounts. And finally—finally—the cleanup function runs.`
    },
    {
      id: "summary",
      title: "Life, Lifecycle, and Cleanup",
      content: `Let's step back from Seahaven and look at what we've learned about useEffect and component lifecycle through Truman's journey.

Truman Burbank was a component. His birth was mounting. His daily life was the render cycle. His departure was unmounting. This is the fundamental lifecycle of every React component: Mount → Update → Unmount.

The show's production system was a massive useEffect hook. It synchronized external systems (weather, actors, sets) with Truman's internal state (location, mood, desires). This is what useEffect does—it lets you step outside the pure render cycle and interact with the world beyond React.

The storm was what happens when you don't write cleanup functions. Christof tried to prevent unmounting through increasingly aggressive effects, consuming resources, creating chaos, refusing to let go. This is a memory leak—an effect that doesn't clean up after itself.

Every component is Truman. Every useEffect is Seahaven's production system. And every cleanup function is that door in the painted sky—the graceful way to end the lifecycle.

Write your effects with cleanup in mind. Track your dependencies accurately. Handle unmounting gracefully. Don't try to prevent the inevitable.

Good afternoon, good evening, and good night.`
    }
  ], []);

  const currentChapter = chapters[chapter];

  const handlePrevious = useCallback(() => {
    setChapter(c => Math.max(0, c - 1));
  }, []);

  const handleNext = useCallback(() => {
    setChapter(c => Math.min(chapters.length - 1, c + 1));
  }, [chapters.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-b from-slate-900 to-slate-950 border-b border-sky-500/20 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold text-sky-400 mb-2">The Truman Show</h1>
          <p className="text-xl text-slate-400 mb-4">Seahaven Island, 1998</p>
          <div className="flex items-center gap-2 text-cyan-400">
            <Activity className="w-5 h-5" />
            <span className="font-semibold">useEffect & Component Lifecycle</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-sky-300 mb-2">{currentChapter.title}</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"></div>
        </div>

        {/* Chapter Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          {currentChapter.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-slate-300 leading-relaxed mb-4 text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Interactive Demonstrations */}
        {chapter === 0 && <ControlRoomDemo />}
        {chapter === 1 && <DependencyTrackerDemo />}
        {chapter === 2 && <CleanupComparisonDemo />}
        {chapter === 3 && <UnmountSequenceDemo />}
        {chapter === 4 && <LifecycleTimelineDemo />}
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-sky-500/20 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={chapter === 0}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            aria-label="Previous chapter"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>
            <div className="flex gap-1">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setChapter(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === chapter ? 'bg-sky-400' : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          <button
            onClick={handleNext}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
            aria-label="Next chapter"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}

// Demo 1: Control Room - Shows useEffect executing on mount
function ControlRoomDemo() {
  const [mounted, setMounted] = useState(false);
  const [systems, setSystems] = useState({
    sunrise: false,
    weather: false,
    actors: false,
    cameras: false
  });

  useEffect(() => {
    if (!mounted) return;

    const timers: NodeJS.Timeout[] = [];
    
    timers.push(setTimeout(() => setSystems(s => ({ ...s, sunrise: true })), 300));
    timers.push(setTimeout(() => setSystems(s => ({ ...s, weather: true })), 600));
    timers.push(setTimeout(() => setSystems(s => ({ ...s, actors: true })), 900));
    timers.push(setTimeout(() => setSystems(s => ({ ...s, cameras: true })), 1200));

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [mounted]);

  const handleMount = () => {
    setMounted(true);
    setSystems({ sunrise: false, weather: false, actors: false, cameras: false });
  };

  const handleUnmount = () => {
    setMounted(false);
    setSystems({ sunrise: false, weather: false, actors: false, cameras: false });
  };

  return (
    <div className="bg-slate-900/50 border border-sky-500/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-sky-300 mb-4 flex items-center gap-2">
        <Camera className="w-6 h-6" />
        The Control Room
      </h3>
      <p className="text-slate-400 mb-6">
        Watch the useEffect setup function execute when Truman's component mounts. Each system activates in sequence.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SystemIndicator icon={Sun} label="Sunrise System" active={systems.sunrise} />
        <SystemIndicator icon={Cloud} label="Weather System" active={systems.weather} />
        <SystemIndicator icon={Users} label="Actor Deployment" active={systems.actors} />
        <SystemIndicator icon={Camera} label="Surveillance (5000 cameras)" active={systems.cameras} />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleMount}
          disabled={mounted}
          className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          <Play className="w-4 h-4" />
          Mount Component
        </button>
        <button
          onClick={handleUnmount}
          disabled={!mounted}
          className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          <Pause className="w-4 h-4" />
          Unmount Component
        </button>
      </div>

      <div className="mt-6 p-4 bg-slate-950/50 rounded border border-slate-700 font-mono text-sm">
        <div className="text-cyan-400 mb-2">useEffect(() =&gt; &#123;</div>
        <div className="pl-4 text-slate-400">
          <div className={systems.sunrise ? "text-sky-300" : ""}>const sunrise = scheduleSunrise(7, 0);</div>
          <div className={systems.weather ? "text-sky-300" : ""}>const weather = initializeWeatherSystem();</div>
          <div className={systems.actors ? "text-sky-300" : ""}>const actors = deployActors(truman.location);</div>
          <div className={systems.cameras ? "text-sky-300" : ""}>const surveillance = activateCameras(5000);</div>
        </div>
        <div className="text-cyan-400 mt-2">&#125;, [truman.mounted]);</div>
      </div>
    </div>
  );
}

function SystemIndicator({ icon: Icon, label, active }: { icon: any; label: string; active: boolean }) {
  return (
    <div className={`p-4 rounded-lg border transition-all ${
      active 
        ? 'bg-sky-500/20 border-sky-500 shadow-lg shadow-sky-500/20' 
        : 'bg-slate-800/50 border-slate-700'
    }`}>
      <div className="flex items-center gap-3">
        <Icon className={`w-6 h-6 ${active ? 'text-sky-400 animate-pulse' : 'text-slate-600'}`} />
        <span className={active ? 'text-sky-300 font-semibold' : 'text-slate-500'}>{label}</span>
      </div>
    </div>
  );
}

// Demo 2: Dependency Tracker - Shows stale effects
function DependencyTrackerDemo() {
  const [location, setLocation] = useState("home");
  const [suspicion, setSuspicion] = useState(0);
  const [effectLog, setEffectLog] = useState<string[]>([]);

  useEffect(() => {
    const message = `Effect ran: location="${location}", suspicion=${suspicion}`;
    setEffectLog(log => [...log, message].slice(-5));
  }, [location, suspicion]);

  return (
    <div className="bg-slate-900/50 border border-sky-500/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-sky-300 mb-4 flex items-center gap-2">
        <Zap className="w-6 h-6" />
        Dependency Array Tracker
      </h3>
      <p className="text-slate-400 mb-6">
        Change Truman's state and watch which effects re-run. Notice how the effect tracks both dependencies.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sky-300 font-semibold mb-2">Truman's Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 focus:border-sky-500 focus:outline-none"
          >
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="marina">Marina</option>
            <option value="bridge">Bridge</option>
          </select>
        </div>

        <div>
          <label className="block text-sky-300 font-semibold mb-2">
            Suspicion Level: {suspicion}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={suspicion}
            onChange={(e) => setSuspicion(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="p-4 bg-slate-950/50 rounded border border-slate-700">
        <div className="text-cyan-400 font-mono text-sm mb-2">Effect Execution Log:</div>
        <div className="space-y-1 font-mono text-xs">
          {effectLog.length === 0 ? (
            <div className="text-slate-500">No effects run yet...</div>
          ) : (
            effectLog.map((log, idx) => (
              <div key={idx} className="text-sky-300">&gt; {log}</div>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 p-4 bg-slate-800/50 rounded border border-cyan-500/30">
        <div className="text-cyan-400 font-semibold mb-2">Key Insight:</div>
        <p className="text-slate-300 text-sm">
          The effect re-runs whenever <code className="text-sky-400">location</code> or <code className="text-sky-400">suspicion</code> changes. 
          If we forgot to include <code className="text-sky-400">suspicion</code> in the dependency array, 
          the effect would use stale values—just like the production crew not noticing Truman's growing awareness.
        </p>
      </div>
    </div>
  );
}

// Demo 3: Cleanup Comparison - Shows memory leaks
function CleanupComparisonDemo() {
  const [withCleanup, setWithCleanup] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [leakedTimers, setLeakedTimers] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!mounted) return;

    if (withCleanup) {
      timerRef.current = setInterval(() => {
        console.log("Effect running with cleanup...");
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          console.log("Cleanup executed!");
        }
      };
    } else {
      setInterval(() => {
        console.log("Effect running WITHOUT cleanup...");
      }, 1000);
      setLeakedTimers(prev => prev + 1);
    }
  }, [mounted, withCleanup]);

  const handleToggleMount = () => {
    setMounted(!mounted);
  };

  const handleReset = () => {
    setMounted(false);
    setLeakedTimers(0);
  };

  return (
    <div className="bg-slate-900/50 border border-sky-500/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-sky-300 mb-4 flex items-center gap-2">
        <Zap className="w-6 h-6" />
        The Storm: With vs Without Cleanup
      </h3>
      <p className="text-slate-400 mb-6">
        Compare what happens when a component unmounts with and without cleanup functions. 
        Without cleanup, resources leak—timers keep running, creating chaos.
      </p>

      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={withCleanup}
            onChange={(e) => setWithCleanup(e.target.checked)}
            className="w-5 h-5"
          />
          <span className="text-sky-300 font-semibold">Use Cleanup Function</span>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className={`p-6 rounded-lg border ${
          mounted && withCleanup
            ? 'bg-sky-500/10 border-sky-500'
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <h4 className="font-bold text-sky-300 mb-2">With Cleanup</h4>
          <p className="text-sm text-slate-400 mb-4">
            Effect runs, then cleanup executes on unmount. Resources freed cleanly.
          </p>
          {mounted && withCleanup && (
            <div className="text-sky-400 text-sm animate-pulse">✓ Running smoothly</div>
          )}
        </div>

        <div className={`p-6 rounded-lg border ${
          mounted && !withCleanup
            ? 'bg-red-500/10 border-red-500 animate-pulse'
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <h4 className="font-bold text-red-400 mb-2">Without Cleanup</h4>
          <p className="text-sm text-slate-400 mb-4">
            Effect runs, but timers keep running after unmount. Memory leak!
          </p>
          {!withCleanup && leakedTimers > 0 && (
            <div className="text-red-400 text-sm">⚠ {leakedTimers} leaked timer(s)</div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleToggleMount}
          className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-colors ${
            mounted
              ? 'bg-red-600 hover:bg-red-500 text-white'
              : 'bg-sky-600 hover:bg-sky-500 text-white'
          }`}
        >
          {mounted ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {mounted ? 'Unmount (Trigger Storm)' : 'Mount Component'}
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="p-4 bg-slate-950/50 rounded border border-slate-700 font-mono text-sm">
        <div className="text-cyan-400 mb-2">useEffect(() =&gt; &#123;</div>
        <div className="pl-4 text-slate-400">
          <div>const timer = setInterval(() =&gt; &#123;</div>
          <div className="pl-4">console.log('Running...');</div>
          <div>&#125;, 1000);</div>
        </div>
        <div className="text-cyan-400 mt-2 pl-2">
          {withCleanup ? (
            <>
              <div>return () =&gt; &#123;</div>
              <div className="pl-4 text-sky-300">clearInterval(timer); // Cleanup!</div>
              <div>&#125;;</div>
            </>
          ) : (
            <div className="text-red-400">// No cleanup function - memory leak!</div>
          )}
        </div>
        <div className="text-cyan-400">&#125;, []);</div>
      </div>
    </div>
  );
}

// Demo 4: Unmount Sequence - Step through cleanup
function UnmountSequenceDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Component Mounted", systems: { lights: true, actors: true, cameras: true, weather: true } },
    { label: "Unmount Triggered", systems: { lights: true, actors: true, cameras: true, weather: true } },
    { label: "Cleanup: Lights Dimming", systems: { lights: false, actors: true, cameras: true, weather: true } },
    { label: "Cleanup: Actors Leaving", systems: { lights: false, actors: false, cameras: true, weather: true } },
    { label: "Cleanup: Cameras Shutting Down", systems: { lights: false, actors: false, cameras: false, weather: true } },
    { label: "Cleanup: Weather System Off", systems: { lights: false, actors: false, cameras: false, weather: false } },
    { label: "Component Unmounted", systems: { lights: false, actors: false, cameras: false, weather: false } }
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const handleReset = () => setStep(0);

  return (
    <div className="bg-slate-900/50 border border-sky-500/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-sky-300 mb-4 flex items-center gap-2">
        <DoorOpen className="w-6 h-6" />
        The Door: Unmounting Sequence
      </h3>
      <p className="text-slate-400 mb-6">
        Step through the unmounting process. Watch cleanup functions execute in order, freeing resources gracefully.
      </p>

      <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-cyan-500/30">
        <div className="text-cyan-400 font-semibold mb-2">Current Step: {currentStep.label}</div>
        <div className="text-sm text-slate-400">Step {step + 1} of {steps.length}</div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <SystemStatus label="Studio Lights" active={currentStep.systems.lights} />
        <SystemStatus label="Actors" active={currentStep.systems.actors} />
        <SystemStatus label="Cameras" active={currentStep.systems.cameras} />
        <SystemStatus label="Weather System" active={currentStep.systems.weather} />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleNext}
          disabled={step === steps.length - 1}
          className="flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          Next Step
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {step === steps.length - 1 && (
        <div className="mt-6 p-4 bg-sky-500/10 border border-sky-500 rounded-lg">
          <div className="text-sky-300 font-semibold mb-2">✓ Clean Unmount Complete</div>
          <p className="text-slate-300 text-sm">
            All resources freed. All cleanup functions executed. The component has unmounted gracefully, 
            just like Truman walking through the door.
          </p>
        </div>
      )}
    </div>
  );
}

function SystemStatus({ label, active }: { label: string; active: boolean }) {
  return (
    <div className={`p-4 rounded-lg border transition-all ${
      active
        ? 'bg-sky-500/20 border-sky-500'
        : 'bg-slate-800/50 border-slate-700 opacity-50'
    }`}>
      <div className="flex items-center justify-between">
        <span className={active ? 'text-sky-300 font-semibold' : 'text-slate-500'}>{label}</span>
        <div className={`w-3 h-3 rounded-full ${active ? 'bg-sky-400 animate-pulse' : 'bg-slate-600'}`} />
      </div>
    </div>
  );
}

// Demo 5: Lifecycle Timeline - Complete visualization
function LifecycleTimelineDemo() {
  const [phase, setPhase] = useState<'unmounted' | 'mounting' | 'mounted' | 'updating' | 'unmounting'>('unmounted');
  const [updateCount, setUpdateCount] = useState(0);

  const handleMount = () => {
    setPhase('mounting');
    setTimeout(() => setPhase('mounted'), 500);
  };

  const handleUpdate = () => {
    setPhase('updating');
    setUpdateCount(c => c + 1);
    setTimeout(() => setPhase('mounted'), 500);
  };

  const handleUnmount = () => {
    setPhase('unmounting');
    setTimeout(() => {
      setPhase('unmounted');
      setUpdateCount(0);
    }, 500);
  };

  return (
    <div className="bg-slate-900/50 border border-sky-500/30 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-sky-300 mb-4 flex items-center gap-2">
        <Activity className="w-6 h-6" />
        Complete Lifecycle Timeline
      </h3>
      <p className="text-slate-400 mb-6">
        Visualize the full component lifecycle: mount → update → unmount. See when effects run and cleanup executes.
      </p>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <PhaseIndicator label="Unmounted" active={phase === 'unmounted'} />
          <div className="flex-1 h-1 bg-slate-700 mx-2" />
          <PhaseIndicator label="Mounting" active={phase === 'mounting'} />
          <div className="flex-1 h-1 bg-slate-700 mx-2" />
          <PhaseIndicator label="Mounted" active={phase === 'mounted'} />
          <div className="flex-1 h-1 bg-slate-700 mx-2" />
          <PhaseIndicator label="Updating" active={phase === 'updating'} />
          <div className="flex-1 h-1 bg-slate-700 mx-2" />
          <PhaseIndicator label="Unmounting" active={phase === 'unmounting'} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-lg border ${
          phase === 'mounting' || phase === 'mounted'
            ? 'bg-sky-500/20 border-sky-500'
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className="font-bold text-sky-300 mb-2">Setup Function</div>
          <div className="text-sm text-slate-400">Runs on mount and when dependencies change</div>
          {(phase === 'mounting' || phase === 'updating') && (
            <div className="mt-2 text-sky-400 text-xs animate-pulse">→ Executing...</div>
          )}
        </div>

        <div className={`p-4 rounded-lg border ${
          phase === 'mounted'
            ? 'bg-cyan-500/20 border-cyan-500'
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className="font-bold text-cyan-300 mb-2">Component Active</div>
          <div className="text-sm text-slate-400">Rendering and responding to state changes</div>
          {phase === 'mounted' && (
            <div className="mt-2 text-cyan-400 text-xs">Updates: {updateCount}</div>
          )}
        </div>

        <div className={`p-4 rounded-lg border ${
          phase === 'unmounting'
            ? 'bg-red-500/20 border-red-500'
            : 'bg-slate-800/50 border-slate-700'
        }`}>
          <div className="font-bold text-red-300 mb-2">Cleanup Function</div>
          <div className="text-sm text-slate-400">Runs before re-running effect or unmounting</div>
          {phase === 'unmounting' && (
            <div className="mt-2 text-red-400 text-xs animate-pulse">→ Cleaning up...</div>
          )}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleMount}
          disabled={phase !== 'unmounted'}
          className="px-6 py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          Mount
        </button>
        <button
          onClick={handleUpdate}
          disabled={phase !== 'mounted'}
          className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          Update State
        </button>
        <button
          onClick={handleUnmount}
          disabled={phase === 'unmounted' || phase === 'unmounting'}
          className="px-6 py-3 bg-red-600 hover:bg-red-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
        >
          Unmount
        </button>
      </div>

      <div className="mt-6 p-4 bg-slate-950/50 rounded border border-slate-700">
        <div className="text-cyan-400 font-semibold mb-2">Key Takeaway:</div>
        <p className="text-slate-300 text-sm">
          Every component follows this lifecycle. Effects run during mount and updates. 
          Cleanup runs before re-running effects and during unmount. 
          Understanding this flow is essential for managing side effects properly—just like Christof needed to understand 
          that Truman's lifecycle would eventually end, and he needed a cleanup function (the door) to handle it gracefully.
        </p>
      </div>
    </div>
  );
}

function PhaseIndicator({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-4 h-4 rounded-full mb-2 transition-all ${
        active ? 'bg-sky-400 ring-4 ring-sky-400/30 animate-pulse' : 'bg-slate-600'
      }`} />
      <span className={`text-xs font-semibold ${active ? 'text-sky-300' : 'text-slate-500'}`}>
        {label}
      </span>
    </div>
  );
}