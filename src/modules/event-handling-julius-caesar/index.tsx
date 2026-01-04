import { useState, useEffect, useCallback } from "react";
import { Volume2, Shield, CheckCircle, Zap, Mic } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface CrowdState {
  loyalty: 'brutus' | 'caesar' | 'none';
  emotion: 'calm' | 'listening' | 'sadness' | 'rage';
  isMob: boolean;
}

interface EventLogEntry {
  id: number;
  event: string;
  handler: string;
  newState: string;
}

export default function EventHandlingJuliusCaesar(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [crowdState, setCrowdState] = useState<CrowdState>({
    loyalty: 'brutus',
    emotion: 'calm',
    isMob: false,
  });
  const [eventLog, setEventLog] = useState<EventLogEntry[]>([
    { id: 1, event: 'Brutus Speech', handler: 'Initial Render', newState: 'loyalty: brutus' },
  ]);
  const [triggerCount, setTriggerCount] = useState<number>(0);
  const [listenerMode, setListenerMode] = useState<'static' | 'interactive'>('static');
  const [isClimaxTriggered, setIsClimaxTriggered] = useState<boolean>(false);

  // Circuit breaker safety
  useEffect(() => {
    if (triggerCount >= 50) {
      alert("Safety Limit Reached! Resetting demo.");
      handleReset();
    }
  }, [triggerCount]);

  const logEvent = useCallback((eventName: string, handlerName: string, newStateDesc: string) => {
    setEventLog(prev => [...prev, {
      id: prev.length + 1,
      event: eventName,
      handler: handlerName,
      newState: newStateDesc,
    }]);
    setTriggerCount(prev => prev + 1);
  }, []);

  const handleFirstEvent = () => {
    setCrowdState(prev => ({ ...prev, emotion: 'listening' }));
    logEvent('"Lend me your ears"', 'onSilenceRequest', 'emotion: listening');
  };

  const handleClimaxSequence = () => {
    setIsClimaxTriggered(true);
    // Sequence of state updates mimicking cascading handlers
    setTimeout(() => {
      setCrowdState(prev => ({ ...prev, emotion: 'sadness' }));
      logEvent('"If you have tears..."', 'onEmotionalAppeal', 'emotion: sadness');
    }, 600);
    setTimeout(() => {
      setCrowdState(prev => ({ ...prev, emotion: 'rage', loyalty: 'caesar' }));
      logEvent('"Read the Will"', 'onDataReveal', 'emotion: rage, loyalty: caesar');
    }, 1200);
    setTimeout(() => {
      setCrowdState(prev => ({ ...prev, isMob: true }));
      logEvent('"Mischief, afoot"', 'onFinalState', 'isMob: true');
    }, 1800);
  };

  const handleSideEffect = () => {
    if (crowdState.emotion === 'rage' && crowdState.isMob) {
      logEvent('Mob Action', 'sideEffect', 'Action: Storm houses');
      alert("Side Effect Triggered: The mob storms the conspirators' houses!");
    }
  };

  const handleReset = () => {
    setCrowdState({ loyalty: 'brutus', emotion: 'calm', isMob: false });
    setEventLog([{ id: 1, event: 'Brutus Speech', handler: 'Initial Render', newState: 'loyalty: brutus' }]);
    setTriggerCount(0);
    setIsClimaxTriggered(false);
  };

  const chapters = [
    {
      title: "The State of Rome",
      content: "Brutus's speech sets the crowd's initial state: `loyalty: 'brutus'`. Like a React component receiving props, this static rendering creates a UI but provides no interactivity. The state is fixed until an event occurs."
    },
    {
      title: "Lend Me Your Ears",
      content: "Antony's request is an event. The crowd's handler—`onSilenceRequest`—fires, updating state to `isListening: true`. This is React's `onClick`: an external trigger that causes a handler function to run and update state."
    },
    {
      title: "The Will and The Wave",
      content: "A sequence of events (pause, reveal, read) triggers multiple handlers. Each updates the state (`sadness` → `rage`), culminating in a re-render—the crowd's roar. This is cascading `setState` calls within event handlers."
    },
    {
      title: "The Empty Podium and The Living Code",
      content: "Brutus's static speech has no event handlers. Antony's interactive approach binds handlers (`onClick`, `onChange`) that listen and update state. This comparison shows static rendering versus interactive, event-driven components."
    },
    {
      title: "Mischief, Afoot",
      content: "The final state (`isMob: true`) drives action—a side effect. In React, event handlers update state, and that new state can trigger side effects (API calls, navigation), completing the event handling cycle."
    }
  ];

  const currentChapter = chapters[chapter];

  // Code Examples
  const staticComponentCode = `// ❌ Brutus Pattern: Static, No Handlers
function BrutusSpeech({ logic }: { logic: string }) {
  return <div>Rendered: {logic}</div>;
  // No onClick, no state updates
}`;

  const interactiveComponentCode = `// ✅ Antony Pattern: Interactive, Event-Driven
function AntonySpeech() {
  const [crowdState, setCrowdState] = useState({ isListening: false });

  const handleSpeechEvent = () => {
    // Event Handler
    setCrowdState({ isListening: true });
  };

  return (
    <button onClick={handleSpeechEvent}>
      "Lend me your ears"
    </button>
  );
}`;

  const eventHandlerCode = `// Event Handler with State Update
function CrowdComponent() {
  const [emotion, setEmotion] = useState('calm');

  const handleReveal = () => {
    // 1. Event triggered (click)
    // 2. Handler runs
    setEmotion('rage'); // 3. State updates
    // Component re-renders with new emotion
  };

  return <button onClick={handleReveal}>Reveal Will</button>;
}`;

  const sideEffectCode = `// State Driving a Side Effect
useEffect(() => {
  if (crowdState.isMob) {
    // Side effect triggered by state
    console.log('Storming houses...');
    navigate('/revenge');
  }
}, [crowdState.isMob]);`;

  return (
    <div className="min-h-screen bg-stone-950 font-serif text-stone-300">
      <ModuleHeader
        icon={Volume2}
        title="Julius Caesar (Act 3, Scene 2)"
        subtitle="Mark Antony, The Roman Forum, 44 BC"
        concept="React Concept: Event Handling"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* 1. Interactive Controls */}
              <div className="rounded-xl border border-amber-500/30 bg-stone-900/80 p-4">
                <h3 className="mb-4 text-lg font-bold">Crowd Controls</h3>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setListenerMode('static')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition ${listenerMode === 'static' ? 'bg-amber-600' : 'bg-stone-800 hover:bg-stone-700'}`}
                    >
                      Static (Brutus)
                    </button>
                    <button
                      onClick={() => setListenerMode('interactive')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition ${listenerMode === 'interactive' ? 'bg-amber-600' : 'bg-stone-800 hover:bg-stone-700'}`}
                    >
                      Interactive (Antony)
                    </button>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full rounded bg-stone-700 px-3 py-2 text-sm hover:bg-stone-600"
                  >
                    Reset All Demos
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded bg-stone-800/40 p-3">
                    <div className="text-xs text-stone-500">Events Fired</div>
                    <div className="font-mono text-xl tabular-nums">{triggerCount}</div>
                  </div>
                  <div className="rounded bg-stone-800/40 p-3">
                    <div className="text-xs text-stone-500">Crowd Status</div>
                    <div className={`text-sm font-medium ${crowdState.emotion === 'rage' ? 'text-red-400' : 'text-amber-400'}`}>
                      {crowdState.emotion.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Metaphor Registry */}
              <div className="rounded-xl border border-stone-700 bg-stone-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">The Roman Crowd</span>
                    <span className="text-sm font-medium">React Component</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Antony's Tactics</span>
                    <span className="text-sm font-medium">User Events (onClick)</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Crowd's Reactions</span>
                    <span className="text-sm font-medium">Event Handlers</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Loyalty Shift</span>
                    <span className="text-sm font-medium">State Update</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Brutus's Speech</span>
                    <span className="text-sm font-medium">Static Render</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">The Podium</span>
                    <span className="text-sm font-medium">DOM / UI Layer</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-800 pb-2">
                    <span className="text-sm text-stone-400">Caesar's Will</span>
                    <span className="text-sm font-medium">Critical Prop/Data</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-stone-400">Antony Listening</span>
                    <span className="text-sm font-medium">Event Bubbling</span>
                  </div>
                </div>
              </div>

              {/* 3. Key Insight Card */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "Initial props set state, but without event handlers, your component is static and unresponsive."}
                  {chapter === 1 && "Event handlers (`onClick`) are functions that run in response to user actions, updating component state."}
                  {chapter === 2 && "Multiple events can trigger sequential handlers, causing cascading state updates and re-renders."}
                  {chapter === 3 && "Interactive components need event handlers; static rendering creates UI but no user interaction."}
                  {chapter === 4 && "The final state from event handlers can drive side effects, completing the interactive cycle."}
                </p>
              </div>

              {/* 4. Quote Card */}
              <div className="rounded-xl border border-stone-800 bg-stone-900/30 p-4">
                <p className="text-sm italic text-stone-400">
                  {chapter === 0 && "\"Romans, countrymen, and lovers! Hear me for my cause.\""}
                  {chapter === 1 && "\"Friends, Romans, countrymen, lend me your ears.\""}
                  {chapter === 2 && "\"If you have tears, prepare to shed them now.\""}
                  {chapter === 3 && "\"I am no orator, as Brutus is...\""}
                  {chapter === 4 && "\"Now let it work. Mischief, thou art afoot.\""}
                </p>
                <p className="mt-2 text-right text-xs text-stone-500">
                  — {chapter === 0 || chapter === 3 ? "Brutus" : "Mark Antony"}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="mb-2 text-3xl font-bold text-amber-100">{currentChapter.title}</h2>
            <div className="leading-relaxed text-stone-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-amber-500/20 bg-stone-900/40 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">Interactive Demonstration</h3>
              <Zap className="h-5 w-5 text-amber-400" />
            </div>

            {/* Chapter 0: Static State */}
            {chapter === 0 && (
              <div className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-bold text-stone-300">The Crowd's State</h4>
                    <div className="rounded-lg border border-stone-700 bg-stone-900/60 p-6">
                      <div className="mb-4 grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-sm text-stone-500">Loyalty</div>
                          <div className={`text-2xl font-bold ${crowdState.loyalty === 'brutus' ? 'text-blue-400' : 'text-red-400'}`}>
                            {crowdState.loyalty.toUpperCase()}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-stone-500">Emotion</div>
                          <div className={`text-2xl font-bold ${
                            crowdState.emotion === 'calm' ? 'text-stone-400' :
                            crowdState.emotion === 'rage' ? 'text-red-400' : 'text-amber-400'
                          }`}>
                            {crowdState.emotion.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-stone-500">
                        This state was set by initial props (Brutus's speech). No events can change it yet.
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-stone-300">Static Component Code</h4>
                    <CodeBlock
                      code={staticComponentCode}
                      language="tsx"
                      variant="default"
                      title="// Initial State via Props"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 1: First Event */}
            {chapter === 1 && (
              <div className="space-y-8">
                <div className="rounded-lg border border-amber-500/30 bg-stone-900/60 p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-300">Trigger an Event</h4>
                      <p className="text-sm text-stone-500">Click to simulate Antony's first request</p>
                    </div>
                    <button
                      onClick={handleFirstEvent}
                      disabled={crowdState.emotion === 'listening'}
                      className="rounded bg-amber-600 px-6 py-3 font-bold hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      "Lend me your ears"
                    </button>
                  </div>
                  <div className={`rounded p-4 transition-all ${crowdState.emotion === 'listening' ? 'bg-amber-950/40 border border-amber-500/30' : 'bg-stone-800/30'}`}>
                    <div className="flex items-center gap-3">
                      <Mic className={`h-5 w-5 ${crowdState.emotion === 'listening' ? 'text-amber-400 animate-pulse' : 'text-stone-600'}`} />
                      <div>
                        <div className="font-medium">Crowd Attention</div>
                        <div className="text-sm text-stone-500">
                          {crowdState.emotion === 'listening' ? 'Handler fired: setEmotion("listening")' : 'Waiting for event...'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={`// Event Binding in JSX
<button onClick={handleSilenceRequest}>
  "Lend me your ears"
</button>

// Handler Function
const handleSilenceRequest = () => {
  // This function runs when button is clicked
  setCrowdState(prev => ({ ...prev, emotion: 'listening' }));
};`}
                  language="tsx"
                  variant="success"
                  title="// ✅ Event Binding and Handler"
                />
              </div>
            )}

            {/* Chapter 2: Cascading Events */}
            {chapter === 2 && (
              <div className="space-y-8">
                <div className="rounded-lg border border-amber-500/30 bg-stone-900/60 p-6">
                  <div className="mb-6">
                    <h4 className="mb-2 font-bold text-stone-300">Cascading Event Sequence</h4>
                    <p className="text-sm text-stone-500">Trigger multiple handlers that update state progressively</p>
                  </div>
                  <div className="mb-6 flex flex-wrap gap-4">
                    <button
                      onClick={() => {
                        setCrowdState(prev => ({ ...prev, emotion: 'sadness' }));
                        logEvent('"If you have tears..."', 'onEmotionalAppeal', 'emotion: sadness');
                      }}
                      className="rounded bg-amber-700 px-4 py-2 hover:bg-amber-600"
                    >
                      Emotional Appeal
                    </button>
                    <button
                      onClick={() => {
                        setCrowdState(prev => ({ ...prev, loyalty: 'caesar' }));
                        logEvent('"Reveal Will"', 'onDataReveal', 'loyalty: caesar');
                      }}
                      className="rounded bg-amber-700 px-4 py-2 hover:bg-amber-600"
                    >
                      Reveal Prop (Will)
                    </button>
                    <button
                      onClick={handleClimaxSequence}
                      disabled={isClimaxTriggered}
                      className="rounded bg-red-700 px-4 py-2 hover:bg-red-600 disabled:opacity-50"
                    >
                      Full Climax Sequence
                    </button>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className={`rounded p-4 ${crowdState.emotion === 'sadness' ? 'bg-amber-950/40 border border-amber-500/30' : 'bg-stone-800/30'}`}>
                      <div className="text-sm text-stone-500">Step 1</div>
                      <div className="font-medium">Sadness Handler</div>
                      <div className="text-xs mt-2">{crowdState.emotion === 'sadness' ? '✅ State Updated' : 'Pending'}</div>
                    </div>
                    <div className={`rounded p-4 ${crowdState.loyalty === 'caesar' ? 'bg-red-950/40 border border-red-500/30' : 'bg-stone-800/30'}`}>
                      <div className="text-sm text-stone-500">Step 2</div>
                      <div className="font-medium">Loyalty Shift</div>
                      <div className="text-xs mt-2">{crowdState.loyalty === 'caesar' ? '✅ State Updated' : 'Pending'}</div>
                    </div>
                    <div className={`rounded p-4 ${crowdState.isMob ? 'bg-red-950/40 border border-red-500/30' : 'bg-stone-800/30'}`}>
                      <div className="text-sm text-stone-500">Step 3</div>
                      <div className="font-medium">Mob Formation</div>
                      <div className="text-xs mt-2">{crowdState.isMob ? '✅ State Updated' : 'Pending'}</div>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={eventHandlerCode}
                  language="tsx"
                  variant="success"
                  title="// ✅ Multiple Handlers Updating State"
                />
              </div>
            )}

            {/* Chapter 3: Static vs Interactive Comparison */}
            {chapter === 3 && (
              <div className="space-y-8">
                <div className="rounded-lg border border-amber-500/30 bg-stone-900/60 p-6">
                  <div className="mb-6">
                    <h4 className="mb-2 font-bold text-stone-300">Live Comparison</h4>
                    <p className="text-sm text-stone-500">
                      Current mode: <span className="font-bold text-amber-400">{listenerMode.toUpperCase()}</span>
                    </p>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="rounded bg-stone-800/40 p-4">
                        <h5 className="mb-2 font-bold text-stone-400">Brutus Pattern</h5>
                        <p className="text-sm text-stone-500 mb-4">Static rendering, no event handlers</p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-stone-500">Event Binding</span>
                            <span className="font-mono text-sm text-red-400">None</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-stone-500">State Updates</span>
                            <span className="font-mono text-sm text-red-400">0</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-stone-500">Interactive</span>
                            <span className="font-mono text-sm text-red-400">No</span>
                          </div>
                        </div>
                      </div>
                      {listenerMode === 'static' && (
                        <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                          <div className="text-sm text-red-300">❌ Cannot respond to events</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="rounded bg-stone-800/40 p-4">
                        <h5 className="mb-2 font-bold text-amber-400">Antony Pattern</h5>
                        <p className="text-sm text-stone-500 mb-4">Event-driven, interactive handlers</p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-stone-500">Event Binding</span>
                            <span className="font-mono text-sm text-amber-400">onClick, onChange</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-stone-500">State Updates</span>
                            <span className="font-mono text-sm text-amber-400">{triggerCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-stone-500">Interactive</span>
                            <span className="font-mono text-sm text-amber-400">Yes</span>
                          </div>
                        </div>
                      </div>
                      {listenerMode === 'interactive' && (
                        <button
                          onClick={handleFirstEvent}
                          className="w-full rounded bg-amber-600 py-2 font-bold hover:bg-amber-500"
                        >
                          Test Interaction
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <CodeComparison
                  badCode={staticComponentCode}
                  goodCode={interactiveComponentCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Static Rendering (Brutus)"
                  goodLabel="✅ Interactive Component (Antony)"
                  badExplanation="No event handlers - component cannot respond to user interaction"
                  goodExplanation="Event handlers allow component to respond to clicks and update state"
                />
              </div>
            )}

            {/* Chapter 4: State-Driven Side Effects */}
            {chapter === 4 && (
              <div className="space-y-8">
                <div className="rounded-lg border border-amber-500/30 bg-stone-900/60 p-6">
                  <div className="mb-6">
                    <h4 className="mb-2 font-bold text-stone-300">State-Driven Action</h4>
                    <p className="text-sm text-stone-500">
                      Current mob status: <span className={`font-bold ${crowdState.isMob ? 'text-red-400' : 'text-stone-400'}`}>
                        {crowdState.isMob ? 'ACTIVE' : 'INACTIVE'}
                      </span>
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <button
                      onClick={handleSideEffect}
                      disabled={!crowdState.isMob}
                      className="rounded bg-red-700 px-6 py-3 font-bold hover:bg-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Execute Mob Action
                    </button>
                    <p className="mt-2 text-sm text-stone-500">
                      {crowdState.isMob 
                        ? "Button enabled because state.isMob === true"
                        : "Button disabled. Trigger the climax sequence in Chapter 2 to enable."}
                    </p>
                  </div>
                  
                  <div className="rounded bg-stone-800/40 p-4">
                    <h5 className="mb-3 font-bold text-stone-400">Event Log</h5>
                    <div className="max-h-60 space-y-2 overflow-y-auto">
                      {eventLog.map(log => (
                        <div key={log.id} className="rounded border border-stone-800 bg-stone-900/30 p-3">
                          <div className="flex justify-between">
                            <span className="font-mono text-sm text-amber-300">#{log.id}</span>
                            <span className="text-sm text-stone-500">{log.event}</span>
                          </div>
                          <div className="mt-1 text-xs text-stone-500">
                            Handler: <span className="text-stone-400">{log.handler}</span> → 
                            State: <span className="text-amber-300">{log.newState}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={sideEffectCode}
                  language="tsx"
                  variant="success"
                  title="// ✅ Side Effect Triggered by State"
                  defaultExpanded={true}
                />
              </div>
            )}
          </section>

          {/* Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="amber"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}