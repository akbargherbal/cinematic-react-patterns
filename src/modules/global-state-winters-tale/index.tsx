import { useState, useEffect, useRef } from "react";
import { Snowflake, Shield, CheckCircle, Users, MessageSquare, Zap, Clock, Thermometer } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";
import {create} from "zustand";

interface Chapter {
  title: string;
  content: string;
}

// Zustand store for interactive demos
interface CourtStore {
  jealousy: number;
  temperature: number;
  whispers: string[];
  updateJealousy: (level: number) => void;
  updateTemperature: (temp: number) => void;
  addWhisper: (whisper: string) => void;
  reset: () => void;
}

const useCourtStore = create<CourtStore>((set) => ({
  jealousy: 0,
  temperature: 75,
  whispers: [],
  updateJealousy: (level) => set({ jealousy: level }),
  updateTemperature: (temp) => set({ temperature: temp }),
  addWhisper: (whisper) => set((state) => ({ whispers: [...state.whispers, whisper] })),
  reset: () => set({ jealousy: 0, temperature: 75, whispers: [] }),
}));

// Prop drilling component chain (anti-pattern)
const LeontesComponent: React.FC<{ jealousy: number; onCommand: (cmd: string) => void }> = ({ jealousy, onCommand }) => {
  const renderCount = useRef(0);
  renderCount.current++;
  
  return (
    <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-bold text-red-300">👑 Leontes</div>
        <div className="text-xs text-slate-500">Renders: {renderCount.current}</div>
      </div>
      <div className="mb-2">Jealousy Level: {jealousy}</div>
      <button 
        onClick={() => onCommand("Poison Polixenes")}
        className="rounded bg-red-700 px-3 py-1 text-sm hover:bg-red-600"
      >
        Whisper Command
      </button>
    </div>
  );
};

const CamilloComponent: React.FC<{ command: string; onBetray: () => void }> = ({ command, onBetray }) => {
  const renderCount = useRef(0);
  renderCount.current++;
  
  return (
    <div className="rounded border border-amber-500/30 bg-amber-950/20 p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-bold text-amber-300">🤫 Camillo</div>
        <div className="text-xs text-slate-500">Renders: {renderCount.current}</div>
      </div>
      <div className="mb-2">Command: {command || "None"}</div>
      <button 
        onClick={onBetray}
        className="rounded bg-amber-700 px-3 py-1 text-sm hover:bg-amber-600"
      >
        Betray Command
      </button>
    </div>
  );
};

// Zustand-powered component (solution)
const PaulinaComponent: React.FC = () => {
  const { jealousy, temperature } = useCourtStore();
  const renderCount = useRef(0);
  renderCount.current++;
  
  return (
    <div className="rounded border border-cyan-500/30 bg-cyan-950/20 p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-bold text-cyan-300">⚖️ Paulina</div>
        <div className="text-xs text-slate-500">Renders: {renderCount.current}</div>
      </div>
      <div className="mb-2">Sensed Jealousy: {jealousy}</div>
      <div className="mb-2">Court Temperature: {temperature}°</div>
      <div className="text-sm text-cyan-200/80">(Direct store access, no props)</div>
    </div>
  );
};

export default function GlobalStateWintersTale(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'drilling' | 'zustand'>('drilling');
  const [command, setCommand] = useState<string>('');
  const [whisperCount, setWhisperCount] = useState<number>(0);
  const [winterYears, setWinterYears] = useState<number>(0);
  
  const { jealousy, temperature, whispers, updateJealousy, updateTemperature, addWhisper, reset } = useCourtStore();
  
  const chapters: Chapter[] = [
    { 
      title: "The Seed of Winter", 
      content: "Leontes' jealousy crystallizes into Sicilia's global state, altering all perception. In React, a Zustand store is a lightweight, central truth—easy to create and update, yet powerful enough to redefine your entire application's reality." 
    },
    { 
      title: "The Chain of Whispers", 
      content: "Leontes whispers commands through courtiers (prop drilling), creating fragile dependencies. When Camillo betrays him, the chain breaks. Similarly, manually passing state through components is brittle, verbose, and prone to failure at any link." 
    },
    { 
      title: "Breathing the Same Air", 
      content: "Paulina senses the court's chill without being told—she breathes the same atmosphere. Zustand's `useStore` hook works identically: any component can access global state directly, without prop drilling or complex context setup." 
    },
    { 
      title: "Command vs. Atmosphere", 
      content: "A specific command reaches one ear and fails. The pervasive atmosphere touches every soul and succeeds. Zustand's global state is efficient and resilient, while prop drilling is complex and brittle." 
    },
    { 
      title: "The Thaw", 
      content: "Sixteen years later, the state of repentance persists. When the statue warms (state update), the entire court reacts simultaneously. Zustand stores maintain state across time and trigger efficient, synchronized re-renders." 
    },
  ];

  const currentChapter = chapters[chapter];

  // Code examples
  const antiPatternCode = `// ❌ Prop Drilling Anti-Pattern
function Leontes() {
  const [jealousy, setJealousy] = useState(10);
  return <Camillo jealousy={jealousy} />;
}

function Camillo({ jealousy }) {
  return <Polixenes jealousy={jealousy} />;
}

function Polixenes({ jealousy }) {
  // 3 levels deep just to read state!
  return <div>Jealousy: {jealousy}</div>;
}`;

  const zustandPatternCode = `// ✅ Zustand Solution
import create from 'zustand';

const useStore = create(set => ({
  jealousy: 10,
  updateJealousy: (level) => set({ jealousy: level })
}));

function Leontes() {
  const updateJealousy = useStore(s => s.updateJealousy);
  return <button onClick={() => updateJealousy(20)}>
    Increase Jealousy
  </button>;
}

function Polixenes() {
  const jealousy = useStore(s => s.jealousy);
  return <div>Jealousy: {jealousy}</div>; // Direct access!
}`;

  const storeCreationCode = `// 🏰 Store Creation (The Kingdom's State)
import create from 'zustand';

const useCourtStore = create((set) => ({
  // State
  jealousy: 0,
  temperature: 75,
  whispers: [],
  
  // Actions
  updateJealousy: (level) => set({ jealousy: level }),
  updateTemperature: (temp) => set({ temperature: temp }),
  addWhisper: (whisper) => 
    set(state => ({ whispers: [...state.whispers, whisper] })),
  
  // Reset
  reset: () => set({ jealousy: 0, temperature: 75, whispers: [] })
}));

// Any component can now access this state:
function Component() {
  const jealousy = useCourtStore(s => s.jealousy);
  const updateJealousy = useCourtStore(s => s.updateJealousy);
  // ...
}`;

  // Winter timer effect (with cleanup)
  useEffect(() => {
    if (chapter === 4) {
      const timer = setInterval(() => {
        setWinterYears(y => {
          if (y >= 16) {
            clearInterval(timer);
            return 16;
          }
          return y + 1;
        });
      }, 800);
      
      return () => clearInterval(timer);
    }
  }, [chapter]);

  // Circuit breaker for whisper count
  useEffect(() => {
    if (whisperCount >= 10) {
      setCommand("⚠️ Too many whispers! Chain broken.");
      setWhisperCount(0);
    }
  }, [whisperCount]);

  const handleWhisper = () => {
    setCommand("Poison Polixenes");
    setWhisperCount(c => c + 1);
    addWhisper(`Whisper ${whisperCount + 1}`);
  };

  const handleBetrayal = () => {
    setCommand("⚠️ BETRAYED - Chain Broken");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-cyan-950/30 font-serif text-slate-300">
      <ModuleHeader
        icon={Snowflake}
        title="The Winter's Tale"
        subtitle="Sicilia's Court, 1611"
        concept="Global State Management with Zustand"
        themeColor="cyan"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Zap className="h-5 w-5 text-cyan-400" />
                  Court Controls
                </h3>
                
                <div className="mb-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-400">Jealousy Level</span>
                    <span className="font-mono">{jealousy}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={jealousy}
                    onChange={(e) => updateJealousy(parseInt(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-400">Court Temperature</span>
                    <span className="font-mono">{temperature}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={temperature}
                    onChange={(e) => updateTemperature(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDemoMode('drilling')}
                    className={`rounded px-3 py-2 text-sm transition-colors ${demoMode === 'drilling' ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ❌ Prop Drilling
                  </button>
                  <button
                    onClick={() => setDemoMode('zustand')}
                    className={`rounded px-3 py-2 text-sm transition-colors ${demoMode === 'zustand' ? 'bg-cyan-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ✅ Zustand
                  </button>
                </div>

                <button
                  onClick={reset}
                  className="mt-4 w-full rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
                >
                  Reset All Demos
                </button>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Leontes' Jealousy</span>
                    <span className="text-sm font-medium">Zustand Store</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Court of Sicilia</span>
                    <span className="text-sm font-medium">React Application</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hermione, Paulina</span>
                    <span className="text-sm font-medium">React Components</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Whispering Chain</span>
                    <span className="text-sm font-medium">Prop Drilling</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Court Atmosphere</span>
                    <span className="text-sm font-medium">useStore Hook</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Accusation Decree</span>
                    <span className="text-sm font-medium">Store Update</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">16-Year Winter</span>
                    <span className="text-sm font-medium">State Persistence</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Statue Warming</span>
                    <span className="text-sm font-medium">Reactive Updates</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-cyan-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-cyan-200/80">
                  {chapter === 0 && "A Zustand store is a lightweight, globally accessible state that becomes your application's central truth—easy to create but powerful enough to redefine everything."}
                  {chapter === 1 && "Prop drilling creates fragile dependency chains. When one link fails (like Camillo's betrayal), the entire state propagation system collapses."}
                  {chapter === 2 && "Zustand's `useStore` lets components access state directly—like breathing the same air—without prop drilling or complex context setup."}
                  {chapter === 3 && "Specific commands (props) reach one component and fail. Pervasive atmosphere (global store) touches every component and succeeds efficiently."}
                  {chapter === 4 && "Zustand stores persist state across time and trigger efficient, synchronized re-renders when updated—like Sicilia's 16-year winter thawing instantly."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && '"A jealousy, once conceived, becomes the architecture of the world."'}
                  {chapter === 1 && '"He builds a chain of whispers, and every link is a point of failure."'}
                  {chapter === 2 && '"She did not need to be told of the winter in his heart; she breathed the same air."'}
                  {chapter === 3 && '"A command reaches one ear. An atmosphere touches every soul."'}
                  {chapter === 4 && '"The stone warmed, and the whole court sighed as one."'}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — The Winter's Tale
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-3xl font-bold text-cyan-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-cyan-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-cyan-500"></div>
              <h3 className="text-xl font-bold text-cyan-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter 0: Store Creation */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3 text-lg font-bold">🏰 Court State</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between rounded bg-slate-800/50 p-4">
                        <span>Jealousy Level</span>
                        <span className="font-mono text-xl text-cyan-300">{jealousy}</span>
                      </div>
                      <div className="flex justify-between rounded bg-slate-800/50 p-4">
                        <span>Court Temperature</span>
                        <span className="font-mono text-xl text-amber-300">{temperature}°</span>
                      </div>
                      <div className="rounded bg-slate-800/50 p-4">
                        <div className="mb-2">Recent Whispers:</div>
                        <div className="space-y-1 text-sm">
                          {whispers.slice(-3).map((w, i) => (
                            <div key={i} className="text-slate-400">"{w}"</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <CodeBlock
                      code={storeCreationCode}
                      language="tsx"
                      variant="success"
                      title="// 🏰 Zustand Store Creation"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  <strong>Teaching Point:</strong> Zustand stores are simple to create but become your application's central truth—like Leontes' jealousy becoming Sicilia's defining state.
                </div>
              </div>
            )}

            {/* Chapter 1: Prop Drilling Anti-Pattern */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className="mb-4">
                  <div className="flex gap-4 mb-4">
                    <button
                      onClick={handleWhisper}
                      className="rounded bg-red-600 px-4 py-2 hover:bg-red-700"
                    >
                      👑 Whisper Command
                    </button>
                    <button
                      onClick={handleBetrayal}
                      className="rounded bg-amber-600 px-4 py-2 hover:bg-amber-700"
                    >
                      🤫 Betray Command
                    </button>
                    <button
                      onClick={() => { setCommand(''); setWhisperCount(0); }}
                      className="rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                    >
                      Reset Chain
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <LeontesComponent 
                      jealousy={jealousy} 
                      onCommand={handleWhisper}
                    />
                    <div className="flex items-center justify-center">
                      <div className="h-0.5 w-8 bg-red-500/50"></div>
                      <MessageSquare className="mx-2 h-5 w-5 text-red-500" />
                      <div className="h-0.5 w-8 bg-red-500/50"></div>
                    </div>
                    <CamilloComponent 
                      command={command}
                      onBetray={handleBetrayal}
                    />
                  </div>
                  
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Whispers</div>
                      <div className="font-mono text-2xl">{whisperCount}</div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Chain Status</div>
                      <div className={`font-mono text-lg ${command.includes('BETRAYED') ? 'text-red-500' : 'text-cyan-500'}`}>
                        {command.includes('BETRAYED') ? 'BROKEN' : 'ACTIVE'}
                      </div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Complexity</div>
                      <div className="font-mono text-xl text-red-500">HIGH</div>
                    </div>
                  </div>
                </div>
                
                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={zustandPatternCode}
                  language="tsx"
                  themeColor="cyan"
                  badLabel="❌ Prop Drilling Anti-Pattern"
                  goodLabel="✅ Zustand Solution Preview"
                  badExplanation="State must pass through multiple components (Leontes → Camillo → Polixenes), creating fragile dependencies and excessive re-renders."
                  goodExplanation="Components access state directly from the store, eliminating prop chains and reducing re-renders."
                />
              </div>
            )}

            {/* Chapter 2: Zustand Solution */}
            {chapter === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-3 text-lg font-bold">⚖️ Paulina (Zustand Access)</h4>
                      <PaulinaComponent />
                    </div>
                    <div className="rounded border border-slate-700 bg-slate-900/30 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Users className="h-5 w-5 text-cyan-400" />
                        <span className="font-bold">Other Components (Also Access Store)</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Hermione Component</span>
                          <span className="text-cyan-300">Accesses: jealousy, temperature</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Polixenes Component</span>
                          <span className="text-cyan-300">Accesses: jealousy</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Camillo Component</span>
                          <span className="text-cyan-300">Accesses: whispers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={zustandPatternCode}
                      language="tsx"
                      variant="success"
                      title="// ✅ Direct Store Access with Zustand"
                      defaultExpanded={true}
                    />
                    <div className="mt-4 rounded bg-cyan-950/20 p-4">
                      <h4 className="mb-2 font-bold text-cyan-300">Key Benefits:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5" />
                          <span><strong>No prop drilling</strong> - Components access store directly</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5" />
                          <span><strong>Efficient updates</strong> - Only subscribing components re-render</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-cyan-400 mt-0.5" />
                          <span><strong>Simple API</strong> - Just `useStore(s =&gt; s.state)`</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 3: Comparison */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="mb-4 text-lg font-bold text-red-400">❌ Prop Drilling Approach</h4>
                    <div className="space-y-4">
                      <div className="rounded border border-red-500/30 p-4">
                        <div className="mb-2 font-bold">Complexity:</div>
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div className="h-full w-4/5 rounded-full bg-red-500"></div>
                        </div>
                        <div className="mt-2 text-right text-sm text-red-400">High (5/5)</div>
                      </div>
                      <div className="rounded border border-red-500/30 p-4">
                        <div className="mb-2 font-bold">Fragility:</div>
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div className="h-full w-full rounded-full bg-red-500"></div>
                        </div>
                        <div className="mt-2 text-right text-sm text-red-400">Very High (Brittle)</div>
                      </div>
                      <div className="rounded border border-red-500/30 p-4">
                        <div className="mb-2 font-bold">Re-renders:</div>
                        <div className="text-2xl font-bold text-red-500">3+ components</div>
                        <div className="text-sm text-red-400">(Entire chain re-renders)</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="mb-4 text-lg font-bold text-cyan-400">✅ Zustand Approach</h4>
                    <div className="space-y-4">
                      <div className="rounded border border-cyan-500/30 p-4">
                        <div className="mb-2 font-bold">Complexity:</div>
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div className="h-full w-1/5 rounded-full bg-cyan-500"></div>
                        </div>
                        <div className="mt-2 text-right text-sm text-cyan-400">Low (1/5)</div>
                      </div>
                      <div className="rounded border border-cyan-500/30 p-4">
                        <div className="mb-2 font-bold">Resilience:</div>
                        <div className="h-2 w-full rounded-full bg-slate-700">
                          <div className="h-full w-1/4 rounded-full bg-cyan-500"></div>
                        </div>
                        <div className="mt-2 text-right text-sm text-cyan-400">Very High (Robust)</div>
                      </div>
                      <div className="rounded border border-cyan-500/30 p-4">
                        <div className="mb-2 font-bold">Re-renders:</div>
                        <div className="text-2xl font-bold text-cyan-500">1 component</div>
                        <div className="text-sm text-cyan-400">(Only subscribers re-render)</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/10 p-6">
                  <h4 className="mb-3 text-lg font-bold text-cyan-200">🏆 Efficiency Comparison</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded bg-slate-800/50 p-4 text-center">
                      <div className="text-2xl font-bold text-red-500">80%</div>
                      <div className="text-xs text-slate-400">Prop Drilling Code</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-4 text-center">
                      <div className="text-2xl font-bold text-cyan-500">20%</div>
                      <div className="text-xs text-slate-400">Zustand Code</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-4 text-center">
                      <div className="text-2xl font-bold text-red-500">3-5x</div>
                      <div className="text-xs text-slate-400">More Re-renders</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-4 text-center">
                      <div className="text-2xl font-bold text-cyan-500">1x</div>
                      <div className="text-xs text-slate-400">Targeted Re-renders</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 4: State Persistence */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-lg font-bold text-amber-300">
                          <Clock className="inline h-5 w-5 mr-2" />
                          The Sixteen-Year Winter
                        </h4>
                        <button
                          onClick={() => setWinterYears(0)}
                          className="rounded bg-amber-800 px-3 py-1 text-sm hover:bg-amber-700"
                        >
                          Reset Time
                        </button>
                      </div>
                      
                      <div className="mb-6">
                        <div className="mb-2 flex justify-between">
                          <span className="text-amber-200">Years Passed:</span>
                          <span className="font-mono text-3xl text-amber-300">{winterYears}</span>
                        </div>
                        <div className="h-4 w-full rounded-full bg-slate-700">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-amber-500 transition-all duration-500"
                            style={{ width: `${(winterYears / 16) * 100}%` }}
                          ></div>
                        </div>
                        <div className="mt-2 flex justify-between text-sm text-slate-400">
                          <span>Leontes' Jealousy</span>
                          <span>Statue's Thaw</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded bg-slate-800/50 p-4">
                          <div className="text-xs text-slate-500">State Persists</div>
                          <div className={`text-xl font-bold ${winterYears >= 16 ? 'text-amber-500' : 'text-cyan-500'}`}>
                            {winterYears >= 16 ? 'YES' : 'MAINTAINING'}
                          </div>
                        </div>
                        <div className="rounded bg-slate-800/50 p-4">
                          <div className="text-xs text-slate-500">Components Subscribed</div>
                          <div className="text-xl font-bold text-amber-300">5</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded border border-slate-700 bg-slate-900/30 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Thermometer className="h-5 w-5 text-amber-400" />
                        <span className="font-bold">Current Store State</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Jealousy</span>
                          <span className="font-mono">{jealousy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Temperature</span>
                          <span className="font-mono">{temperature}°</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Whispers</span>
                          <span className="font-mono">{whispers.length} total</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <CodeBlock
                      code={`// ⏳ State Persistence Demo
useEffect(() => {
  // Store persists across component unmounts
  const store = useCourtStore.getState();
  console.log('Store persists:', store);
  
  // After 16 years (simulated), trigger update
  if (winterYears >= 16) {
    useCourtStore.setState({ 
      temperature: 85, // Warmth returns
      jealousy: 0     // Jealousy fades
    });
    
    // All subscribed components update simultaneously
    console.log('Thaw triggered! All components react.');
  }
}, [winterYears]);

// Anywhere in your app, even years later:
function StatueComponent() {
  const temperature = useCourtStore(s => s.temperature);
  // Still has access to the same persistent state!
  return <div>Temperature: {temperature}°</div>;
}`}
                      language="tsx"
                      variant="success"
                      title="// 🕰️ State Persistence Over Time"
                      defaultExpanded={true}
                    />
                    
                    <div className="mt-4 rounded bg-slate-800/30 p-4">
                      <h4 className="mb-2 font-bold text-amber-300">The Thaw Moment:</h4>
                      <p className="text-sm text-slate-300">
                        When winterYears reaches 16, the store automatically updates (temperature rises, jealousy fades). 
                        <strong className="text-amber-300"> Every subscribed component</strong>—Paulina, Hermione, Polixenes—reacts instantly, 
                        just like the court sighing as one when the statue warms.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Chapter Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="cyan"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}