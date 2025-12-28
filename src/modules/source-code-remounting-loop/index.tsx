import { useState, useEffect, useRef } from "react";
import { RotateCcw, Play, Pause, Trash2, Save, Database } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

const chapters: Chapter[] = [
  {
    id: "intro",
    title: "Eight Minutes to Live",
    content: `Colter Stevens jolts awake to fluorescent lights and the rhythmic clatter of train wheels on tracks. His reflection in the window shows a face that isn't his. The woman across from him—Christina—is mid-sentence, laughing about something he doesn't remember saying.

He has eight minutes.

Eight minutes before the train explodes. Eight minutes before everything goes white, then black, then he's back in the capsule—that coffin-like pod where Goodwin's voice crackles through speakers, telling him to find the bomber, save the train, complete the mission.

But here's what Colter learns in those first few loops: every time he wakes up on that train, he's starting from scratch.

The coffee cup is full again. Christina doesn't remember their previous conversation. The businessman in the next car hasn't been warned yet. It's as if the previous eight minutes never happened—because for everyone else on that train, they haven't.

This is component mounting.

When a React component mounts, it initializes fresh. Props flow in from the parent (the train, the passengers, the bomber—all predetermined). The component renders its UI (Colter experiences the train). State begins at its initial values (Colter's confusion, his disorientation).

And when those eight minutes end? Unmount. The component is destroyed. Cleanup runs. Memory is released. The instance ceases to exist.

Then the Source Code machine fires again. A new instance mounts. Same props (same train, same passengers, same bomb). But it's not the same Colter—it's a fresh instance of Colter, initialized from the same starting conditions.

Except... Colter remembers.

He remembers the previous loops. He remembers Christina's laugh, the bomber's face, the location of the bomb. This shouldn't be possible—not if each loop is truly a fresh start.

This is the paradox developers face: If components remount fresh, how do we persist information across those remounts? If each instance is new, how does anything survive?

Colter stumbles through the train car, checking his reflection again. Same borrowed face. Same eight minutes. Same inevitable explosion. But his memory persists—stored somewhere outside the loop itself, in that capsule, in whatever machinery keeps him tethered to consciousness.

The train rocks. Christina asks if he's okay. The countdown begins.

He has eight minutes to understand the system. Eight minutes to learn what persists and what dies. Eight minutes before the unmount.

The clock is ticking.`,
  },
  {
    id: "build",
    title: "The Loop Repeats",
    content: `Loop seventeen. Or is it eighteen? Colter has lost count.

Each time he wakes on that train, he tries something different. He warns Christina immediately—she thinks he's crazy. He tackles the suspected bomber—wrong guy, and now security is involved. He pulls the emergency brake—the explosion happens anyway, just with the train stopped.

Every loop, he's learning. But every loop, he's starting over.

Here's what makes it maddening: the train doesn't remember. Christina doesn't remember. The bomber doesn't remember. Only Colter remembers, and even that memory isn't stored in the loop—it's stored outside it, in the capsule, in whatever neural interface keeps him conscious between iterations.

This is the critical lesson about component remounting: when a component unmounts and remounts, its internal state is gone.

Imagine a React component that fetches user data, stores it in useState, displays it beautifully. Then the user navigates away (component unmounts) and comes back (component remounts). That state? Gone. The component doesn't remember the fetched data. It doesn't remember the user's scroll position. It doesn't remember anything—it's a brand new instance.

Colter experiences this viscerally. Each loop, he has to:
• Re-establish rapport with Christina (she doesn't remember their previous conversations)
• Re-identify the bomber (his previous detective work is lost)
• Re-navigate the train layout (muscle memory persists in him, but the train resets)

The anti-pattern developers fall into: assuming state will persist across remounts.

"But I set that state!" they protest. "I stored that value!" Yes—in the previous instance. That instance is dead. This is a new one.

Colter tries to leave notes. He scratches messages into the bathroom mirror—but when the loop resets, the mirror is clean. He tries to warn the conductor early—but the conductor doesn't remember the previous warning. Everything inside the loop resets.

In React terms: everything stored in component state (useState, useReducer) dies with the unmount. Event listeners? Cleaned up. Timers? Cleared. Subscriptions? Unsubscribed. The component's entire internal world is destroyed and rebuilt.

Loop twenty-three. Colter is getting desperate.

He's learned the bomber's identity (Derek Frost, the businessman in the next car). He's learned the bomb's location (under a specific seat). He's learned the exact moment of detonation (7 minutes, 52 seconds into the loop).

But he can't change any of it.

Because the train—the props—are immutable. They're set by the Source Code machine, by Goodwin's control room, by forces outside Colter's control. He's not the parent component; he's the child. He receives the props (train, passengers, bomber, bomb) and must work within those constraints.

He can change his behavior (state). He can run to different cars, talk to different people, make different choices. But he can't change the fundamental props: the train will be the same train, the bomber will be the same bomber, and at 7:52, the bomb will detonate.

This is the frustration of component architecture: you can manage your own state, but you can't change your props. You can only request that your parent change them.

Colter screams into the void between loops. In the capsule, Goodwin's voice is clinical: "You're not changing the past, Captain Stevens. You're accessing a parallel reality. The train always explodes. Your job is to find the bomber so we can prevent the next attack."

The train always explodes. The props never change.

Loop twenty-seven. The explosion comes. The unmount happens. The cleanup runs.

And Colter wakes up again, fresh instance, same props, no memory stored in the loop itself.

But he's starting to understand something. If his memory persists outside the loop, in the capsule... maybe that's where the answer lies.

Maybe the key isn't to change what happens inside the eight minutes.

Maybe the key is to affect what exists outside them.`,
  },
  {
    id: "climax",
    title: "The Immutable Train",
    content: `Loop thirty-four, and Colter has reached his breaking point.

He knows everything now. Derek Frost, the bomber. The white van in the parking lot. The second bomb, the bigger one, targeting Chicago. He's solved the mission—he's given Goodwin the information she needs.

But the train still explodes.

Every. Single. Time.

"Why?" he demands in the capsule between loops. "I found the bomber! I gave you what you needed! Why do I have to keep going back?"

Goodwin's response is cold comfort: "The Source Code doesn't change the past, Captain. That train already exploded. Those people are already dead. You're just... accessing the last eight minutes of their consciousness."

This is the immutability of props.

In React, when a parent component passes props to a child, those props are read-only from the child's perspective. The child can't modify them. It can't reach up and change the parent's state. It can only work with what it's given.

Colter is the child component. The Source Code machine is the parent. The train, the passengers, the bomb—these are props passed down. And no matter what Colter does inside his render cycle (his eight minutes), he cannot change those props.

He can change his own state:
• His emotional state (panic → determination → despair)
• His knowledge state (ignorant → informed → expert)
• His behavioral state (passive → active → desperate)

But the props remain constant. The train is the train. The bomber is the bomber. The explosion happens at 7:52.

This is the pain point developers hit: fighting against the architecture instead of working with it.

"Why can't I just modify this prop?" they ask, trying to do props.user.name = "New Name" in a child component. Because props flow down. Data flows down. Control flows down. The child doesn't get to reach up and modify the parent's state.

Colter tries everything:
• He physically restrains Derek Frost—the bomb still detonates (it's on a timer)
• He throws the bomb off the train—it detonates mid-air, still kills everyone
• He stops the train entirely—the bomb detonates anyway

The props are immutable. The train's fate is sealed. He's not here to change the train—he's here to extract information from the train to affect something outside it.

Loop thirty-seven. Colter sits across from Christina, defeated.

"What if this is all there is?" he asks her. "What if we're just... stuck in this loop forever?"

Christina, who doesn't remember any previous loops, smiles sadly. "Then I guess we make the most of the time we have."

And that's when it clicks.

He's been thinking about this wrong. He's been trying to change the props (the train, the explosion) when he should be thinking about what persists beyond the component lifecycle.

In React terms: he needs to lift state up. He needs to use external storage. He needs to affect the parent component, not fight the child component's constraints.

The train is going to explode. That's immutable. But what happens after the explosion? What exists outside the eight-minute loop?

Goodwin's control room. The real world. The next attack that hasn't happened yet.

And suddenly, Colter realizes: he's been given a phone. Christina's phone. A phone that exists in the real world, that can send messages outside the loop.

This is the escape hatch. This is how you persist state beyond component lifecycle.

Not by fighting the props. Not by trying to modify immutable data. But by using mechanisms that exist outside the component's scope:
• Parent state (lifting state up)
• Context (shared state across component tree)
• Refs (values that persist across renders)
• External storage (localStorage, sessionStorage, databases)

Colter's memory persists in the capsule (external to the loop). Now he needs to make his actions persist in the real world (external to the train).

The train rocks. Five minutes left. Christina is talking about her plans for the day—plans she'll never fulfill, because this train already exploded, these people are already dead.

But Colter can save the next train. The next city. The next thousand people.

He just needs to work with the system, not against it.

The props are immutable. But the world outside the props? That's still mutable.

That's where the real work happens.`,
  },
  {
    id: "resolution",
    title: "Beyond the Capsule",
    content: `Loop forty-one. Colter's last loop. Though he doesn't know it yet.

This time, he's not fighting the train. He's not trying to change the props. He's working with the system, using the mechanisms available to persist state beyond the component lifecycle.

First: He uses Christina's phone.

Not to call the police (they won't believe him—he's tried that). Not to warn the passengers (they can't escape—he's tried that too). But to send a text message to Goodwin's personal phone. A message that will exist outside the loop, in the real world, after the explosion.

The text contains everything: Derek Frost's identity, the white van's license plate, the location of the second bomb. Information extracted from inside the component (the train) and persisted to external storage (the real world).

This is useRef in action. A ref persists across renders and remounts. It's not part of the component's state—it's a container that survives the component lifecycle. When the component unmounts, the ref's value remains accessible to the parent.

Second: He affects parent state.

By sending that text, Colter is essentially calling a callback prop: onBomberIdentified(data). The child component (Colter in the loop) can't change its own props, but it can trigger changes in the parent component (Goodwin's control room) by invoking functions passed down as props.

Goodwin receives the text. In the real world, outside the loop, she dispatches teams. They find the white van. They stop the second bombing. Thousands of lives saved—not by changing the past (the train), but by affecting the future (the parent's state).

Third: He creates a new timeline.

This is where the metaphor gets beautiful. In the film's final moments, Colter realizes the Source Code isn't just accessing dead people's memories—it's creating parallel realities. Each loop isn't just a replay; it's a new branch, a new instance.

And in one of those branches, he can persist beyond the eight minutes.

This is the difference between component state and external state:

• Component state (useState): Dies with unmount. Perfect for UI state, temporary data, things that should reset.
• External state (Context, parent state, refs, storage): Survives unmount. Perfect for data that needs to persist across navigation, remounts, or component lifecycle.

Colter's final act is to save the train in one timeline—not by preventing the explosion (can't change the props), but by creating a reality where the explosion never happens. He stops Derek Frost before the bomb is armed. He works within the system's rules (eight minutes, same starting conditions) but uses his accumulated knowledge (persisted memory) to change the outcome.

The pattern:
1. Component mounts (Colter wakes on train)
2. Component gathers data (identifies bomber)
3. Component persists data externally (sends text, affects parent state)
4. Component unmounts (explosion, cleanup)
5. Component remounts (new loop)
6. Component reads persisted data (Colter's memory)
7. Component renders differently based on that data (stops bomber earlier)

The train is saved. Christina lives. Colter—this instance of Colter—persists beyond the eight minutes, frozen in time but conscious, aware, alive in a way that transcends the component lifecycle.

The lesson is complete:

• Props are immutable (the train, the passengers, the initial conditions)
• Component state dies with unmount (anything stored in useState is lost)
• External state persists (refs, parent state, storage, context)
• Cleanup is crucial (Colter's final loop includes proper cleanup—stopping the bomber, sending the text, ensuring nothing leaks into the next iteration)
• Working with the system is more powerful than fighting it

Goodwin's voice crackles one last time: "Thank you, Captain Stevens. You've saved thousands of lives."

But Colter isn't in the capsule anymore. He's on the train, frozen in Christina's kiss, existing in a timeline where the bomb never exploded, where the component never unmounted, where state persisted because he learned to work with the architecture instead of against it.

The Source Code machine powers down. The parent component has received its data. The child component has fulfilled its purpose.

But in one branch, one timeline, one persistent state—Colter Stevens lives on.

Not by changing the props. But by understanding what persists beyond the lifecycle.`,
  },
  {
    id: "summary",
    title: "The Architecture of Memory",
    content: `Let's step back from the train, from the capsule, from the loops. Let's synthesize what Colter Stevens taught us about component lifecycle and state persistence.

The Core Truths

1. Every mount is a fresh start.

When a React component mounts, it initializes from scratch. State begins at initial values. Effects run. The component has no memory of previous instances—because previous instances are gone. They were unmounted, cleaned up, garbage collected.

Colter waking on the train = component mounting. Fresh instance, clean slate, no memory of previous renders (except what's persisted externally).

2. Props are immutable from the child's perspective.

The train, the passengers, the bomber—these are props passed from the parent (the Source Code machine). Colter can't change them. He can only work with them, react to them, extract information from them.

In React: props.value = newValue doesn't work. Props flow down. The child receives them, renders based on them, but cannot modify them. To change props, you must communicate with the parent (via callbacks) and let the parent change its own state.

3. Component state dies with unmount.

Anything stored in useState, useReducer, or component-scoped variables is destroyed when the component unmounts. It doesn't persist to the next mount. It's not saved anywhere. It's gone.

Colter's attempts to leave notes on the train = trying to persist state in component scope. Doesn't work. The train resets. The notes vanish. The state is lost.

4. External state persists beyond lifecycle.

But Colter's memory persists—because it's stored in the capsule, outside the loop. And his text message persists—because it's sent to the real world, outside the component.

In React:
• Refs (useRef): Persist across renders and remounts. Not part of state, don't trigger re-renders, but survive the lifecycle.
• Parent state: Lift state up to a parent component that doesn't unmount. Child can affect it via callbacks.
• Context: Shared state across component tree, survives individual component unmounts.
• External storage: localStorage, sessionStorage, databases—persist beyond app lifecycle entirely.

5. Cleanup is not optional.

Every loop, the Source Code machine runs cleanup: Colter is extracted from the train, the connection is severed, resources are released. Without cleanup, you get memory leaks, stale subscriptions, zombie listeners.

In React: useEffect cleanup functions are crucial. Return a function that cancels subscriptions, clears timers, removes event listeners. When the component unmounts, cleanup runs. Always.

The Wisdom

Colter Stevens learned to work with the Source Code machine, not against it. He accepted the immutability of props (the train). He understood the ephemerality of component state (the loop). He discovered the persistence of external state (the text message, the capsule memory).

And in doing so, he saved thousands of lives.

As developers, we must learn the same lessons:

• Accept that components remount. Design for it.
• Accept that props are immutable. Use callbacks to communicate up.
• Accept that component state is temporary. Use external storage for persistence.
• Accept that cleanup is mandatory. Always clean up effects.

The architecture isn't a limitation—it's a framework for clarity. Component lifecycle isn't a bug—it's a feature. Immutability isn't a constraint—it's a guarantee.

Colter had eight minutes to live, die, and learn.

We have a lifetime to build, unmount, and persist.

The train is waiting. The loop is ready. The component will mount.

What will you persist beyond the lifecycle?`,
  },
];

// Demo component for Chapter 1
function MountUnmountDemo() {
  const [isMounted, setIsMounted] = useState(true);
  const [parentLoops, setParentLoops] = useState(0);

  const handleRemount = () => {
    setIsMounted(false);
    setTimeout(() => {
      setIsMounted(true);
      setParentLoops((prev) => prev + 1);
    }, 100);
  };

  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
        <RotateCcw className="w-5 h-5" />
        The Eight-Minute Loop
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Parent Loop Counter:</span>
          <span className="text-orange-500 font-mono text-2xl">{parentLoops}</span>
        </div>
        <button
          onClick={handleRemount}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Loop (Unmount/Remount)
        </button>
        {isMounted &amp;&amp; <LoopComponent />}
      </div>
    </div>
  );
}

function LoopComponent() {
  const [stateCounter, setStateCounter] = useState(0);
  const refCounter = useRef(0);
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    refCounter.current += 1;
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded p-4 space-y-3">
      <div className="text-center">
        <div className="text-4xl font-bold text-orange-500 mb-1">{countdown}</div>
        <div className="text-xs text-slate-400">seconds until unmount</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-900/50 p-3 rounded">
          <div className="text-xs text-slate-400 mb-1">useState (dies)</div>
          <div className="text-2xl font-mono text-red-400">{stateCounter}</div>
          <button
            onClick={() => setStateCounter((c) => c + 1)}
            className="mt-2 w-full bg-slate-700 hover:bg-slate-600 text-white text-xs px-2 py-1 rounded"
          >
            Increment
          </button>
        </div>
        <div className="bg-slate-900/50 p-3 rounded">
          <div className="text-xs text-slate-400 mb-1">useRef (persists)</div>
          <div className="text-2xl font-mono text-green-400">{refCounter.current}</div>
          <button
            onClick={() => {
              refCounter.current += 1;
              setStateCounter((c) => c + 1); // Force re-render
            }}
            className="mt-2 w-full bg-slate-700 hover:bg-slate-600 text-white text-xs px-2 py-1 rounded"
          >
            Increment
          </button>
        </div>
      </div>
      <div className="text-xs text-slate-400 text-center">
        Watch what happens when the loop resets
      </div>
    </div>
  );
}

// Demo component for Chapter 2
function LoopIterationDemo() {
  const [childMounted, setChildMounted] = useState(true);
  const [totalLoops, setTotalLoops] = useState(0);

  const resetLoop = () => {
    setChildMounted(false);
    setTimeout(() => {
      setChildMounted(true);
      setTotalLoops((prev) => prev + 1);
    }, 100);
  };

  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">Loop Iteration Counter</h3>
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded p-4">
          <div className="text-sm text-slate-400 mb-2">Parent Component (Capsule)</div>
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Total Loops:</span>
            <span className="text-green-400 font-mono text-3xl">{totalLoops}</span>
          </div>
          <div className="text-xs text-slate-400 mt-2">
            ✓ Persists across child remounts
          </div>
        </div>
        {childMounted &amp;&amp; <ChildLoopComponent />}
        <button
          onClick={resetLoop}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Loop (Remount Child)
        </button>
      </div>
    </div>
  );
}

function ChildLoopComponent() {
  const [attempts, setAttempts] = useState(0);

  return (
    <div className="bg-slate-800/50 border border-red-500/30 rounded p-4">
      <div className="text-sm text-slate-400 mb-2">Child Component (Train)</div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-300">Attempts This Loop:</span>
        <span className="text-red-400 font-mono text-3xl">{attempts}</span>
      </div>
      <button
        onClick={() => setAttempts((a) => a + 1)}
        className="w-full bg-slate-700 hover:bg-slate-600 text-white px-3 py-2 rounded text-sm"
      >
        Try Something Different
      </button>
      <div className="text-xs text-slate-400 mt-2">
        ✗ Resets to 0 on remount
      </div>
    </div>
  );
}

// Demo component for Chapter 3
function ImmutablePropsDemo() {
  const [trainProps, setTrainProps] = useState({
    passengers: 47,
    time: "7:52",
    bomber: "Derek Frost",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleParentChange = () => {
    setTrainProps({
      passengers: 0,
      time: "8:00",
      bomber: "Stopped",
    });
    setErrorMessage("");
  };

  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">Immutable Train Props</h3>
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded p-4">
          <div className="text-sm text-slate-400 mb-3">Parent Component (Source Code Machine)</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-300">Passengers:</span>
              <span className="text-blue-400 font-mono">{trainProps.passengers}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Detonation Time:</span>
              <span className="text-blue-400 font-mono">{trainProps.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">Bomber:</span>
              <span className="text-blue-400 font-mono">{trainProps.bomber}</span>
            </div>
          </div>
        </div>
        <TrainChildComponent
          trainProps={trainProps}
          onRequestChange={handleParentChange}
          onError={setErrorMessage}
        />
        {errorMessage &amp;&amp; (
          <div className="bg-red-900/30 border border-red-500/50 rounded p-3 text-red-300 text-sm">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}

interface TrainChildComponentProps {
  trainProps: { passengers: number; time: string; bomber: string };
  onRequestChange: () => void;
  onError: (msg: string) => void;
}

function TrainChildComponent({ trainProps, onRequestChange, onError }: TrainChildComponentProps) {
  const tryToModifyProps = () => {
    onError("❌ Error: Cannot modify props directly! Props are read-only from child's perspective.");
  };

  const requestParentChange = () => {
    onRequestChange();
    onError("");
  };

  return (
    <div className="bg-slate-800/50 border border-orange-500/30 rounded p-4">
      <div className="text-sm text-slate-400 mb-3">Child Component (Colter on Train)</div>
      <div className="space-y-2 mb-3 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-300">Received Passengers:</span>
          <span className="text-orange-400 font-mono">{trainProps.passengers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-300">Received Time:</span>
          <span className="text-orange-400 font-mono">{trainProps.time}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-300">Received Bomber:</span>
          <span className="text-orange-400 font-mono">{trainProps.bomber}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={tryToModifyProps}
          className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          Try to Change Props
        </button>
        <button
          onClick={requestParentChange}
          className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          Request Parent Change
        </button>
      </div>
    </div>
  );
}

// Demo component for Chapter 4
function PersistenceMechanismsDemo() {
  const [componentMounted, setComponentMounted] = useState(true);

  const remount = () => {
    setComponentMounted(false);
    setTimeout(() => setComponentMounted(true), 100);
  };

  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">Persistence Mechanisms</h3>
      <div className="space-y-4">
        {componentMounted &amp;&amp; <PersistenceComponent />}
        <button
          onClick={remount}
          className="w-full bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded transition-colors flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Unmount/Remount Component
        </button>
        <div className="text-xs text-slate-400 text-center">
          Type messages and see what survives the remount
        </div>
      </div>
    </div>
  );
}

function PersistenceComponent() {
  const [stateMessage, setStateMessage] = useState("");
  const refMessage = useRef("");
  const [sessionMessage, setSessionMessage] = useState(
    () => sessionStorage.getItem("sourceCodeMessage") || ""
  );

  useEffect(() => {
    sessionStorage.setItem("sourceCodeMessage", sessionMessage);
  }, [sessionMessage]);

  return (
    <div className="space-y-3">
      <div className="bg-slate-800/50 border border-red-500/30 rounded p-3">
        <div className="flex items-center gap-2 mb-2">
          <Trash2 className="w-4 h-4 text-red-400" />
          <span className="text-sm font-semibold text-red-400">useState (Dies)</span>
        </div>
        <input
          type="text"
          value={stateMessage}
          onChange={(e) => setStateMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-300 text-sm"
        />
        <div className="text-xs text-slate-400 mt-1">
          ✗ Lost on unmount
        </div>
      </div>

      <div className="bg-slate-800/50 border border-yellow-500/30 rounded p-3">
        <div className="flex items-center gap-2 mb-2">
          <Save className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-semibold text-yellow-400">useRef (Persists)</span>
        </div>
        <input
          type="text"
          defaultValue={refMessage.current}
          onChange={(e) => {
            refMessage.current = e.target.value;
          }}
          placeholder="Type a message..."
          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-300 text-sm"
        />
        <div className="text-xs text-slate-400 mt-1">
          ✓ Survives remount (but doesn't trigger re-render)
        </div>
      </div>

      <div className="bg-slate-800/50 border border-green-500/30 rounded p-3">
        <div className="flex items-center gap-2 mb-2">
          <Database className="w-4 h-4 text-green-400" />
          <span className="text-sm font-semibold text-green-400">sessionStorage (Persists)</span>
        </div>
        <input
          type="text"
          value={sessionMessage}
          onChange={(e) => setSessionMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-slate-300 text-sm"
        />
        <div className="text-xs text-slate-400 mt-1">
          ✓ Survives remount AND page refresh
        </div>
      </div>
    </div>
  );
}

// Demo component for Chapter 5
function LifecycleSimulator() {
  const [phase, setPhase] = useState<"unmounted" | "mounting" | "mounted" | "unmounting">("unmounted");
  const [hasCleanup, setHasCleanup] = useState(true);
  const [leaks, setLeaks] = useState<string[]>([]);

  const mount = () => {
    setPhase("mounting");
    setTimeout(() => setPhase("mounted"), 500);
  };

  const unmount = () => {
    setPhase("unmounting");
    if (!hasCleanup) {
      setLeaks((prev) => [...prev, "Timer not cleared", "Listener not removed"]);
    }
    setTimeout(() => {
      setPhase("unmounted");
    }, 500);
  };

  const reset = () => {
    setPhase("unmounted");
    setLeaks([]);
  };

  return (
    <div className="bg-slate-900/50 border border-blue-500/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-blue-400 mb-4">Complete Lifecycle Simulator</h3>
      <div className="space-y-4">
        <div className="bg-slate-800/50 border border-slate-700 rounded p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-300">Current Phase:</span>
            <span className={`font-mono text-lg ${
              phase === "mounted" ? "text-green-400" :
              phase === "unmounted" ? "text-slate-500" :
              "text-orange-400"
            }`}>
              {phase.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="cleanup"
              checked={hasCleanup}
              onChange={(e) => setHasCleanup(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="cleanup" className="text-sm text-slate-300">
              Include cleanup function
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={mount}
              disabled={phase !== "unmounted"}
              className="bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center gap-1"
            >
              <Play className="w-3 h-3" />
              Mount
            </button>
            <button
              onClick={unmount}
              disabled={phase !== "mounted"}
              className="bg-red-600 hover:bg-red-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center gap-1"
            >
              <Pause className="w-3 h-3" />
              Unmount
            </button>
            <button
              onClick={reset}
              className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 rounded text-sm transition-colors flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>

        {phase === "mounted" &amp;&amp; (
          <div className="bg-green-900/30 border border-green-500/50 rounded p-3 text-green-300 text-sm">
            ✓ Component is mounted
            <br />✓ State initialized
            <br />✓ Effects running
            <br />✓ Event listeners active
          </div>
        )}

        {phase === "unmounting" &amp;&amp; (
          <div className="bg-orange-900/30 border border-orange-500/50 rounded p-3 text-orange-300 text-sm">
            ⚠ Component unmounting...
            <br />⚠ Running cleanup functions
            <br />⚠ Clearing timers
            <br />⚠ Removing listeners
          </div>
        )}

        {leaks.length > 0 &amp;&amp; (
          <div className="bg-red-900/30 border border-red-500/50 rounded p-3">
            <div className="text-red-300 font-semibold mb-2">Memory Leaks Detected:</div>
            {leaks.map((leak, i) => (
              <div key={i} className="text-red-400 text-sm">
                ✗ {leak}
              </div>
            ))}
          </div>
        )}

        {phase === "unmounted" &amp;&amp; leaks.length === 0 &amp;&amp; (
          <div className="bg-slate-800/50 border border-slate-700 rounded p-3 text-slate-400 text-sm text-center">
            Component unmounted cleanly. Ready to mount again.
          </div>
        )}
      </div>
    </div>
  );
}

export default function SourceCodeRemountingLoop() {
  const [chapter, setChapter] = useState(0);

  const currentChapter = chapters[chapter];

  const renderDemo = () => {
    switch (chapter) {
      case 0:
        return <MountUnmountDemo />;
      case 1:
        return <LoopIterationDemo />;
      case 2:
        return <ImmutablePropsDemo />;
      case 3:
        return <PersistenceMechanismsDemo />;
      case 4:
        return <LifecycleSimulator />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
          Source Code: The Remounting Loop
        </h1>
        <p className="text-lg text-slate-400">
          Colter Stevens, The Train, 2011
        </p>
        <p className="text-sm text-orange-500 mt-2">
          Component Remounting &amp; Cleanup
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Narrative */}
          <article className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4">
              {currentChapter.title}
            </h2>
            <div className="text-slate-300 leading-relaxed whitespace-pre-line">
              {currentChapter.content}
            </div>
          </article>

          {/* Interactive Demo */}
          <aside className="lg:sticky lg:top-8 h-fit">
            {renderDemo()}
          </aside>
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setChapter((c) => c - 1)}
            disabled={chapter === 0}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {chapters.map((_, i) => (
              <button
                key={i}
                onClick={() => setChapter(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === chapter ? "bg-blue-400" : "bg-slate-600 hover:bg-slate-500"
                }`}
                aria-label={`Go to chapter ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setChapter((c) => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded transition-colors"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}