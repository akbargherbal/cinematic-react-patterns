import { useState, useEffect, lazy, Suspense, ComponentType } from "react";
import { Brain, Code, Book, Wand, Scroll, Zap, Loader, AlertTriangle } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  id: string;
  title: string;
  content: string;
  demoKey: string;
}

interface LazyComponent {
  name: string;
  size: number;
  loaded: boolean;
  error: boolean;
  component: ComponentType | null;
}

export default function CodeSplittingWithHorcruxes(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [monolithicSize, setMonolithicSize] = useState<number>(3500);
  const [splitMode, setSplitMode] = useState<boolean>(false);
  const [loadedComponents, setLoadedComponents] = useState<Set<string>>(new Set());
  const [activeHorcrux, setActiveHorcrux] = useState<string | null>(null);
  const [simulateCrash, setSimulateCrash] = useState<boolean>(false);
  const [networkDelay, setNetworkDelay] = useState<number>(1000);
  const [lazyComponents, setLazyComponents] = useState<LazyComponent[]>([
    { name: "Diary", size: 450, loaded: false, error: false, component: null },
    { name: "Ring", size: 620, loaded: false, error: false, component: null },
    { name: "Locket", size: 580, loaded: false, error: false, component: null },
    { name: "Cup", size: 510, loaded: false, error: false, component: null },
    { name: "Diadem", size: 670, loaded: false, error: false, component: null },
    { name: "Nagini", size: 890, loaded: false, error: false, component: null },
  ]);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The All-or-Nothing Soul",
      content: "The air in the Forbidden Section of the Hogwarts library was thick with the scent of decaying parchment and forgotten spells. Moonlight struggled through the high, grimy windows, illuminating swirling dust motes like tiny galaxies. Here, long after the castle had fallen silent, Tom Riddle worked. He wasn't studying for his exams; he was plotting against mortality itself. His fingers traced the embossed title of a book bound in what looked unsettlingly like human skin: Magick Moste Evile. He turned a page, the parchment crackling in protest. His eyes devoured a passage on the nature of the soul. The ancient text described it as a singular, whole, and indivisible essence—the complete source of a wizard's power. All of one's magic, memories, and being, contained in a single, perfect vessel. Tom felt a surge of pride in his own powerful soul, but it was immediately followed by a cold spike of contempt. Perfect? No. It was fragile. He closed the book with a soft thud. 'A single soul, however powerful, is a single point of failure,' he whispered to the darkness. The entire structure, dependent on one component. It was poor design.",
      demoKey: "monolithic-bundle"
    },
    {
      id: "build",
      title: "The Godric's Hollow Crash",
      content: "The night was cold and still in Godric's Hollow, but Lord Voldemort was a furnace of dark energy. As he glided toward the Potter's cottage, he felt the totality of his power thrumming within him. Every curse he had ever mastered, every secret torn from the minds of his victims, every ounce of his ambition and rage—it was all present, a single, monolithic payload of pure magical might. He was a walking cataclysm, his entire application loaded into memory, ready to execute. There was no part of him held in reserve; he was all here, all at once. Invincible. Then, the rebound. It was not pain. It was not death. It was a system crash on a cosmic scale. One moment, he was the complete, unified architecture of Lord Voldemort. The next, a fatal error. His entire being—the whole, massive, singular soul—was violently ejected from its container. He felt his knowledge, his power, his very consciousness being ripped away not in pieces, but as one cohesive, screaming whole. The monolithic structure, having hit an unhandled exception, was collapsing entirely. The application wasn't just closing; it was being uninstalled by a hurricane. 'My entire being,' he hissed, 'dependent on a single vessel. One flaw in the execution, and the entire structure failed. All or nothing. And I got nothing.'",
      demoKey: "crash-demo"
    },
    {
      id: "climax",
      title: "The Soul Divided",
      content: "In a dark, dripping chamber far beneath the earth, the newly reborn Lord Voldemort prepared to correct his fundamental design flaw. His rudimentary body was weak, but his mind was ruthlessly clear. He would never again be a single entity. His target was Nagini, his loyal serpent. The murder of Bertha Jorkins was fresh, the act having ripped his soul, preparing it for the ritual. Now came the deliberate, architectural work. He focused his will, not outward to destroy, but inward, to partition. He reached into his own essence and took hold of a fragment. The sensation was a violation of nature—a tearing, shearing agony that made the Cruciatus Curse feel like a tickle. He was deliberately corrupting his own source code, splitting a piece off from the main thread. He felt his immediate power diminish; the monolithic force he once commanded was now lesser, fractured. But as he incanted the final words of the spell, forcing the severed piece of his soul into the hissing snake, he felt something new replace the pain: security. Resilience. 'They can destroy this body,' he whispered, his voice raspy. 'But they cannot destroy me. I am no longer a single entity. I am a network.'",
      demoKey: "lazy-loading"
    },
    {
      id: "resolution",
      title: "Monolith vs. Plague",
      content: "In his office, surrounded by the gentle whirring of silver instruments, Dumbledore led Harry to the Pensieve. 'To understand how to fight Voldemort now, you must first understand what he was,' he said. He uncorked a vial of silvery memory. 'Observe.' Approach A: The Monolith at the Ministry. Harry was standing in the Atrium of the Ministry of Magic. There was a sudden, violent crack of Apparition, and Lord Voldemort stood there in his entirety. It was not just an arrival; it was a detonation of presence. His entire, unsplit soul manifested at once—a massive, instantaneous payload of terror and power. He was a walking catastrophe, and the initial load time was zero. Dumbledore appeared and the duel began. But Harry noticed that all of Voldemort's focus, all of his magic, was right here. When Dumbledore finally forced him back, Voldemort Disapparated with another deafening crack. And then... silence. The threat was immense, but it was either 100% present or 100% gone. Approach B: The Plague at the Ministry. The Atrium was the same, but the sequence was different. The attack began not with Voldemort, but with Bellatrix Lestrange—a smaller, separate piece of his plan. Then, the fountain statues creaked to life—another component loading in. The sense of dread built in layers. Only then did Voldemort himself appear. The main bundle had arrived. The duel with Dumbledore was just as fierce, but Harry felt a crucial difference. Voldemort's power wasn't only in the man standing before him. It was anchored elsewhere—in a locket, in a diary, in a ring. When Dumbledore drove him away, the man vanished, but the threat did not. 'He was a monolith. Now, he is a plague.'",
      demoKey: "comparison"
    },
    {
      id: "summary",
      title: "Hunting the Pieces",
      content: "The cold seeped through the canvas of the tent, but inside, a single lantern cast a warm, golden glow on a worn parchment map. Harry, Ron, and Hermione were not planning a frontal assault. They were not trying to force a single, decisive confrontation with Lord Voldemort. Their entire strategy had shifted. They were hunting. 'The locket is done,' Hermione said, her voice low and steady. 'We think the cup might be at Gringotts. That's the next request we need to make.' Ron nodded. 'It's slow work. One at a time.' 'It's the only way,' Harry said. The lesson from Dumbledore's Pensieve was burned into his mind. Attacking Voldemort's main body was pointless while the other pieces of his soul—the lazy-loaded components of his power—remained hidden and active. 'We don't go after the main body. We find the pieces. That's the only way.' Their quest was no longer a battle, but a systematic process of discovery and destruction, triggering the load of each Horcrux, dealing with it, and moving to the next. This new understanding culminated in the final moments of the Battle of Hogwarts. As Harry walked toward the Forbidden Forest, ready to sacrifice himself, he felt a strange sense of completeness. He was the final, unknown Horcrux. Every other piece had been located and destroyed. The network of souls that had made Voldemort immortal was being dismantled, one node at a time.",
      demoKey: "sequential-loading"
    }
  ];

  const currentChapter = chapters[chapter];

  // Simulate loading a lazy component
  const loadHorcrux = (name: string): void => {
    if (loadedComponents.has(name) || loadedComponents.size >= 5) return;
    
    setActiveHorcrux(name);
    
    // Simulate network delay
    setTimeout(() => {
      setLoadedComponents(prev => new Set([...prev, name]));
      setLazyComponents(prev => prev.map(h => 
        h.name === name ? { ...h, loaded: true } : h
      ));
      setActiveHorcrux(null);
    }, networkDelay);
  };

  // Reset all loaded components
  const resetDemo = (): void => {
    setLoadedComponents(new Set());
    setLazyComponents(prev => prev.map(h => ({ ...h, loaded: false })));
    setActiveHorcrux(null);
  };

  // Code examples as template literals
  const monolithicCode = `// ❌ Monolithic Anti-Pattern
import DiaryComponent from './diary';
import RingComponent from './ring';
import LocketComponent from './locket';
import CupComponent from './cup';
import DiademComponent from './diadem';
import NaginiComponent from './nagini';

function MonolithApp() {
  // All 3.5KB loaded upfront
  return (
    <>
      <DiaryComponent />
      <RingComponent />
      <LocketComponent />
      <CupComponent />
      <DiademComponent />
      <NaginiComponent />
    </>
  );
}`;

  const lazyCode = `// ✅ Code Splitting with React.lazy()
import { lazy, Suspense } from 'react';

const Diary = lazy(() => import('./diary'));
const Ring = lazy(() => import('./ring'));
const Locket = lazy(() => import('./locket'));
const Cup = lazy(() => import('./cup'));
const Diadem = lazy(() => import('./diadem'));
const Nagini = lazy(() => import('./nagini'));

function SplitApp() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Route path="/diary" element={<Diary />} />
      <Route path="/ring" element={<Ring />} />
      {/* Only loads when needed */}
    </Suspense>
  );
}`;

  const missingSuspenseCode = `// ❌ Missing Suspense Boundary
const LazyComponent = lazy(() => import('./component'));

function BrokenApp() {
  return <LazyComponent />; // Will crash!
}`;

  const correctSuspenseCode = `// ✅ With Suspense Boundary
const LazyComponent = lazy(() => import('./component'));

function FixedApp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}`;

  const chunkConfigCode = `// ✅ Optimal Chunk Configuration
// Group related components
const HorcruxViews = lazy(() => import(
  /* webpackChunkName: "horcrux-views" */
  './horcrux-views'
));

const DarkArtifacts = lazy(() => import(
  /* webpackChunkName: "dark-artifacts" */
  './dark-artifacts'
));

// Route-based splitting (most effective)
const routes = [
  {
    path: '/diary',
    element: lazy(() => import('./diary'))
  },
  {
    path: '/ring', 
    element: lazy(() => import('./ring'))
  }
];`;

  // Calculate metrics
  const totalSplitSize = lazyComponents.reduce((sum, h) => sum + h.size, 0);
  const loadedSize = lazyComponents
    .filter(h => loadedComponents.has(h.name))
    .reduce((sum, h) => sum + h.size, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 text-slate-300 font-serif p-4 md:p-8">
      <header className="border-b border-emerald-500/20 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4 md:gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-2 md:gap-3">
              <Brain className="text-emerald-400 w-6 h-6 md:w-8 md:h-8" />
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Harry Potter series</h1>
            </div>
            <p className="text-xs md:text-sm lg:text-base text-slate-400">
              Fiction • Voldemort's Horcruxes • 1997-2007
            </p>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-emerald-400 font-medium">
            Code Splitting and Lazy Loading
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Sidebar - Metaphor Registry */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
            <h3 className="text-lg font-bold text-emerald-300 mb-3 flex items-center gap-2">
              <Book className="w-5 h-5" />
              Metaphor Registry
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500"></div>
                <div>
                  <span className="font-medium">Monolithic Soul</span>
                  <p className="text-slate-400 text-xs">Single JavaScript bundle</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500"></div>
                <div>
                  <span className="font-medium">Horcrux</span>
                  <p className="text-slate-400 text-xs">Code-split chunk</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500"></div>
                <div>
                  <span className="font-medium">Pensieve</span>
                  <p className="text-slate-400 text-xs">Suspense fallback UI</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-purple-500"></div>
                <div>
                  <span className="font-medium">Hunt</span>
                  <p className="text-slate-400 text-xs">Network request for chunk</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Chapter Navigation */}
          <div className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
            <h3 className="text-lg font-bold text-emerald-300 mb-3 flex items-center gap-2">
              <Scroll className="w-5 h-5" />
              Chapters
            </h3>
            <nav className="space-y-2">
              {chapters.map((chap, idx) => (
                <button
                  key={chap.id}
                  onClick={() => setChapter(idx)}
                  className={`w-full text-left p-2 rounded transition-colors ${chapter === idx ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'hover:bg-slate-800/50'}`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${chapter === idx ? 'bg-emerald-400' : 'bg-slate-600'}`}></div>
                    <span className="text-sm">{chap.title}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:col-span-9 space-y-6 md:space-y-8">
          {/* Chapter Content */}
          <div className="bg-slate-900/30 border border-emerald-500/10 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-emerald-300">
              {currentChapter.title}
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="leading-relaxed mb-6">{currentChapter.content}</p>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-xs text-slate-400">Initial Bundle</p>
                <p className="text-lg font-bold">{monolithicSize} KB</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-xs text-slate-400">Loaded Chunks</p>
                <p className="text-lg font-bold">{loadedComponents.size} / 6</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-xs text-slate-400">Loaded Size</p>
                <p className="text-lg font-bold">{loadedSize} KB</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-xs text-slate-400">Savings</p>
                <p className="text-lg font-bold text-emerald-400">
                  {Math.round((1 - loadedSize / monolithicSize) * 100)}%
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Demo Area */}
          <div className="space-y-6">
            {/* Chapter-specific demos */}
            {currentChapter.demoKey === "monolithic-bundle" && (
              <div className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-300">
                  <AlertTriangle className="w-5 h-5" />
                  Monolithic Bundle: All-or-Nothing
                </h3>
                <div className="space-y-4">
                  <CodeBlock
                    code={monolithicCode}
                    variant="error"
                    title="// ❌ Monolithic Anti-Pattern"
                    defaultExpanded={true}
                  />
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setMonolithicSize(3500)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      Simulate 3.5MB Bundle
                    </button>
                    <span className="text-sm text-slate-400">
                      Initial load: 3500KB • Time-to-Interactive: ~7s
                    </span>
                  </div>
                </div>
              </div>
            )}

            {currentChapter.demoKey === "crash-demo" && (
              <div className="bg-slate-900/50 border border-red-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-red-300">
                  <AlertTriangle className="w-5 h-5" />
                  Single Point of Failure
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setSimulateCrash(true)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      Simulate Bundle Crash
                    </button>
                    <button
                      onClick={() => setSimulateCrash(false)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                  {simulateCrash && (
                    <div className="bg-red-950/30 border border-red-500/50 rounded-lg p-4 animate-pulse">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                        <div>
                          <p className="font-bold text-red-300">Fatal Bundle Error</p>
                          <p className="text-sm text-red-400">Application crashed: Entire bundle failed to load</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentChapter.demoKey === "lazy-loading" && (
              <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-300">
                  <Wand className="w-5 h-5" />
                  Code Splitting with React.lazy()
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <CodeBlock
                      code={lazyCode}
                      variant="success"
                      title="// ✅ Code Splitting Solution"
                      defaultExpanded={true}
                    />
                    <CodeBlock
                      code={missingSuspenseCode}
                      variant="error"
                      title="// ❌ Common Mistake: Missing Suspense"
                    />
                    <CodeBlock
                      code={correctSuspenseCode}
                      variant="success"
                      title="// ✅ With Suspense Boundary"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-800/30 rounded-lg p-4">
                      <h4 className="font-bold mb-3 text-emerald-300">Load a Horcrux (Chunk)</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {lazyComponents.map((horcrux) => (
                          <button
                            key={horcrux.name}
                            onClick={() => loadHorcrux(horcrux.name)}
                            disabled={horcrux.loaded || activeHorcrux !== null}
                            className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${horcrux.loaded ? 'bg-emerald-500/20 border border-emerald-500/30' : 'bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700'} disabled:opacity-30 disabled:cursor-not-allowed`}
                          >
                            {activeHorcrux === horcrux.name ? (
                              <Loader className="w-5 h-5 text-amber-400 animate-spin mb-1" />
                            ) : horcrux.loaded ? (
                              <Zap className="w-5 h-5 text-emerald-400 mb-1" />
                            ) : (
                              <Code className="w-5 h-5 text-slate-400 mb-1" />
                            )}
                            <span className="text-sm font-medium">{horcrux.name}</span>
                            <span className="text-xs text-slate-400">{horcrux.size}KB</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-800/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-emerald-300">Network Simulation</h4>
                        <button
                          onClick={resetDemo}
                          className="px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 rounded"
                        >
                          Reset All
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <label className="text-sm">Delay:</label>
                          <input
                            type="range"
                            min="500"
                            max="3000"
                            step="100"
                            value={networkDelay}
                            onChange={(e) => setNetworkDelay(parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm">{networkDelay}ms</span>
                        </div>
                        {activeHorcrux && (
                          <div className="bg-amber-950/20 border border-amber-500/30 rounded p-3">
                            <div className="flex items-center gap-2">
                              <Loader className="w-4 h-4 text-amber-400 animate-spin" />
                              <span className="text-sm">Fetching {activeHorcrux} chunk...</span>
                            </div>
                            <div className="mt-2 w-full bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-amber-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: '100%' }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentChapter.demoKey === "comparison" && (
              <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-center text-emerald-300">
                  Monolith vs. Distributed System
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
                      <h4 className="font-bold text-red-300 mb-3">Monolithic Approach</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span>Loads everything upfront</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span>Single point of failure</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span>Poor Time-to-Interactive</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-3 bg-slate-900/50 rounded">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Bundle Size:</span>
                          <span className="font-bold text-red-300">{monolithicSize} KB</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
                      <h4 className="font-bold text-emerald-300 mb-3">Code-Split Approach</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span>Loads only what's needed</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span>Graceful partial failure</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span>Faster initial render</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-3 bg-slate-900/50 rounded">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Currently Loaded:</span>
                          <span className="font-bold text-emerald-300">{loadedSize} KB</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(loadedSize / monolithicSize) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentChapter.demoKey === "sequential-loading" && (
              <div className="bg-slate-900/50 border border-emerald-500/30 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-emerald-300">
                  Systematic Component Hunting
                </h3>
                <div className="space-y-6">
                  <CodeBlock
                    code={chunkConfigCode}
                    variant="success"
                    title="// ✅ Optimal Chunk Configuration"
                    defaultExpanded={true}
                  />
                  <div className="bg-slate-800/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-emerald-300">Sequential Loading Strategy</h4>
                      <div className="text-sm text-slate-400">
                        Loaded: {loadedComponents.size}/6 • Circuit: {5 - loadedComponents.size} remaining
                      </div>
                    </div>
                    <div className="space-y-3">
                      {lazyComponents.map((horcrux) => (
                        <div 
                          key={horcrux.name}
                          className={`flex items-center justify-between p-3 rounded-lg transition-all ${horcrux.loaded ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-slate-800/50'}`}
                        >
                          <div className="flex items-center gap-3">
                            {horcrux.loaded ? (
                              <Zap className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Code className="w-5 h-5 text-slate-500" />
                            )}
                            <div>
                              <p className="font-medium">{horcrux.name}</p>
                              <p className="text-xs text-slate-400">{horcrux.size}KB chunk</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {horcrux.loaded ? (
                              <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-300 rounded">Loaded</span>
                            ) : (
                              <button
                                onClick={() => loadHorcrux(horcrux.name)}
                                disabled={loadedComponents.size >= 5 || activeHorcrux !== null}
                                className="px-3 py-1 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded disabled:opacity-30"
                              >
                                Hunt
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-sm text-slate-400 text-center">
                        "We don't go after the main body. We find the pieces. That's the only way."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </div>
              <div className="w-32 sm:w-48 bg-slate-800 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <button
              onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      </main>
    </div>
  );
}