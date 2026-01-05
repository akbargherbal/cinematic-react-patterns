import React, { useState, useMemo } from "react";
import { Crown, Shield, CheckCircle, Map, Users, BookOpen } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";
import { AnimatePresence, motion } from "framer-motion";

interface Chapter {
  title: string;
  content: string;
}

interface DaughterProps {
  name: string;
  inheritance?: {
    land: number;
    title: string;
  };
  onRebellion?: () => void;
}

const Daughter: React.FC<DaughterProps> = ({ name, inheritance, onRebellion }) => {
  const handleRebellion = () => {
    if (inheritance) {
      // This is the anti-pattern: trying to mutate a prop.
      // In React, this won't work and will likely throw an error in strict mode.
      // We simulate the attempt for the demo.
      // inheritance.land = 100; // This would be the illegal act.
    }
    onRebellion?.();
  };

  return (
    <div className={`rounded-lg border p-4 transition-all duration-300 ${inheritance ? 'border-amber-500/40 bg-amber-950/30' : 'border-slate-700 bg-slate-800/50'}`}>
      <h4 className="font-bold text-amber-200">{name}</h4>
      {inheritance ? (
        <div className="mt-2 text-sm text-slate-300">
          <p>Inherits: <span className="font-mono text-amber-400">{inheritance.land}%</span> of the Kingdom</p>
          <p>Title: <span className="font-medium text-amber-400">{inheritance.title}</span></p>
        </div>
      ) : (
        <p className="mt-2 text-sm italic text-slate-500">"Nothing."</p>
      )}
      {onRebellion && (
        <button
          onClick={handleRebellion}
          className="mt-4 w-full rounded-md bg-red-800/50 px-3 py-1 text-xs text-red-200 transition-colors hover:bg-red-800/80"
        >
          Attempt to Seize Power
        </button>
      )}
    </div>
  );
};

export default function PropsKingLearModule(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [rebellionAttempts, setRebellionAttempts] = useState(0);
  const [learGenerosity, setLearGenerosity] = useState(66);

  const chapters: Chapter[] = [
    {
      title: "The Divestiture",
      content: "King Lear divides his kingdom, bestowing portions upon his daughters. This is the parent component passing data—props—to its children. The map with its clear divisions is the props object, a defined and immutable contract passed down.",
    },
    {
      title: "The Breach of Bond",
      content: "Cordelia attempts to renegotiate her inheritance, effectively trying to send data back up to her father. In React, this is an anti-pattern. Props are read-only; a child component cannot modify the props it receives from its parent.",
    },
    {
      title: "The Hollow Crown",
      content: "Lear, cast out, rages, 'I gave you all.' He understands the data flow is one-way. He passed the props (the kingdom) but cannot control his daughters' internal logic (their cruelty). The parent sets the props; the child determines its own behavior.",
    },
    {
      title: "Two Thrones",
      content: "Goneril accepts her prop and renders her domain. Cordelia receives nothing and renders accordingly. This shows how components behave based on the props they receive. A component's output is a function of its props.",
    },
    {
      title: "The Ancient Dower",
      content: "Despite the tragedy, the map's divisions remain. This demonstrates reusability. The same 'Daughter' component can represent Goneril, Regan, or Cordelia, rendering differently based on the unique 'kingdom' prop it receives each time.",
    },
  ];

  const currentChapter = chapters[chapter];

  const code = {
    passingProps: `// Parent Component: KingLear.tsx
function KingLear() {
  return (
    <div>
      <Daughter name="Goneril" inheritance={{ land: 33, title: "Duchess of Albany" }} />
      <Daughter name="Regan" inheritance={{ land: 33, title: "Duchess of Cornwall" }} />
      <Daughter name="Cordelia" inheritance={{ land: 34, title: "Queen of France" }} />
    </div>
  );
}

// Child Component: Daughter.tsx
function Daughter({ name, inheritance }) {
  return (
    <div>
      <h4>{name}</h4>
      <p>Inherits {inheritance.land}% of the Kingdom</p>
    </div>
  );
}`,
    antiPattern: `// Cordelia.tsx (Child Component)
function Cordelia({ inheritance }) {
  const tryToChangeInheritance = () => {
    // ❌ ANTI-PATTERN: Child tries to mutate its prop
    inheritance.land = 100; // This will fail or cause errors!
  };

  return (
    <div>
      <p>My inheritance: {inheritance.land}%</p>
      <button onClick={tryToChangeInheritance}>
        Demand More
      </button>
    </div>
  );
}`,
    correctPattern: `// Cordelia.tsx (Child Component)
function Cordelia({ inheritance }) {
  // ✅ CORRECT: Props are treated as read-only.
  // The component simply renders based on what it receives.
  // To request a change, it would need to call a function
  // passed down from the parent (e.g., onRequestMore).

  return (
    <div>
      <p>My inheritance: {inheritance.land}%</p>
    </div>
  );
}`,
    oneWayFlow: `// KingLear.tsx (Parent)
function KingLear() {
  const [generosity, setGenerosity] = useState(66);

  return (
    <div>
      {/* Parent controls the state */}
      <input 
        type="range" 
        value={generosity}
        onChange={(e) => setGenerosity(Number(e.target.value))} 
      />
      
      {/* Parent passes state down as a prop */}
      <Goneril inheritance={{ land: generosity / 2 }} />
      <Regan inheritance={{ land: generosity / 2 }} />
    </div>
  );
}`,
    reusability: `// The same component used for different data
function RoyalCourt() {
  return (
    <>
      <Daughter 
        name="Goneril" 
        inheritance={{ land: 33, title: "Duchess of Albany" }} 
      />
      <Daughter 
        name="Regan" 
        inheritance={{ land: 33, title: "Duchess of Cornwall" }} 
      />
      {/* The same component, but with different props */}
    </>
  );
}`
  };

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Crown}
        title="King Lear"
        subtitle="The Kingdom, Antiquity"
        concept="React Props: One-Way Data Flow"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-200">
                  <Users className="h-5 w-5" />
                  Court Controls
                </h3>
                <label htmlFor="generosity" className="mb-2 block text-sm font-medium text-slate-400">
                  Lear's Generosity ({learGenerosity}%)
                </label>
                <input
                  id="generosity"
                  type="range"
                  min="0"
                  max="100"
                  value={learGenerosity}
                  onChange={(e) => setLearGenerosity(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-amber-500"
                />
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded bg-slate-800/50 p-3 text-center">
                    <div className="text-xs text-slate-500">Rebellion Attempts</div>
                    <div className="font-mono text-xl text-red-400">{rebellionAttempts}</div>
                  </div>
                   <button
                      onClick={() => setRebellionAttempts(0)}
                      className="rounded bg-slate-700/50 p-3 text-center text-xs text-slate-400 transition-colors hover:bg-slate-700"
                    >
                      Reset Attempts
                    </button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">King Lear</span><span className="font-medium">Parent Component</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Daughters</span><span className="font-medium">Child Components</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Kingdom Portions</span><span className="font-medium">Props Data</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">The Sealed Map</span><span className="font-medium">Props Object</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Dividing the Kingdom</span><span className="font-medium">Passing Props</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Daughters' Rule</span><span className="font-medium">Child Logic/State</span></div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "Props are how parent components pass information to their children, like Lear dividing his kingdom on the map."}
                  {chapter === 1 && "Props are read-only. A child component cannot change the props it receives, just as Cordelia could not change her father's decree."}
                  {chapter === 2 && "Data flows one way: from parent to child. The parent owns the data (state) and passes it down as props."}
                  {chapter === 3 && "A component's rendered output is determined by its props. Different props will result in different UI."}
                  {chapter === 4 && "Props make components reusable. A single component definition can be used many times with different data."}
                </p>
              </div>
              
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "I gave you all."
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — King Lear, Act II, Scene 4
                </p>
              </div>
            </div>
          }
        >
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="font-bold text-amber-100">{currentChapter.title}</h2>
            <p className="text-slate-300">{currentChapter.content}</p>
          </div>

          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                The Royal Court
              </h3>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={chapter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {chapter === 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <Daughter name="Goneril" inheritance={{ land: 33, title: "Duchess of Albany" }} />
                      <Daughter name="Regan" inheritance={{ land: 33, title: "Duchess of Cornwall" }} />
                      <Daughter name="Cordelia" inheritance={{ land: 34, title: "Queen of France" }} />
                    </div>
                    <CodeBlock code={code.passingProps} language="tsx" title="// The Parent passes data via attributes (props)" />
                  </div>
                )}

                {chapter === 1 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-lg border border-red-500/40 bg-red-950/30 p-4">
                        <h4 className="font-bold text-red-200">Cordelia's Folly</h4>
                        <p className="my-2 text-sm text-slate-400">Click the button to see Cordelia attempt to modify her prop. Notice the 'Rebellion Attempts' count increases, but her inheritance remains unchanged.</p>
                        <Daughter name="Cordelia" inheritance={{ land: 0, title: "Disinherited" }} onRebellion={() => setRebellionAttempts(c => c + 1)} />
                      </div>
                      <div className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                        <p className="text-center text-slate-400">A child component that accepts its props renders without issue.</p>
                      </div>
                    </div>
                    <CodeComparison
                      badCode={code.antiPattern}
                      goodCode={code.correctPattern}
                      language="tsx"
                      themeColor="amber"
                      badLabel="❌ Anti-Pattern: Mutating Props"
                      goodLabel="✅ Correct: Read-Only Props"
                      badExplanation="A child must never directly change its props. This breaks the one-way data flow and makes the app unpredictable."
                      goodExplanation="A child should treat props as immutable. If a change is needed, the parent must pass down a function to call."
                    />
                  </div>
                )}

                {chapter === 2 && (
                  <div className="space-y-6">
                    <p className="text-center text-slate-400">Use the "Lear's Generosity" slider in the sidebar to see the one-way data flow in action. Lear (the parent) controls the data, and his daughters (the children) simply reflect the changes.</p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Daughter name="Goneril" inheritance={{ land: Math.floor(learGenerosity / 2), title: "Duchess of Albany" }} />
                      <Daughter name="Regan" inheritance={{ land: Math.ceil(learGenerosity / 2), title: "Duchess of Cornwall" }} />
                    </div>
                    <CodeBlock code={code.oneWayFlow} language="tsx" title="// Parent state flows down to children as props" />
                  </div>
                )}

                {chapter === 3 && (
                  <div className="space-y-6">
                    <p className="text-center text-slate-400">A component's output is a direct result of its props. Here, the same `Daughter` component renders two different outcomes based on the `inheritance` prop it receives.</p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Daughter name="Goneril" inheritance={{ land: 50, title: "Ruler of Half the Kingdom" }} />
                      <Daughter name="Cordelia" inheritance={undefined} />
                    </div>
                  </div>
                )}

                {chapter === 4 && (
                  <div className="space-y-6">
                    <p className="text-center text-slate-400">The `Daughter` component is a reusable template. We can create any number of daughters, each with unique data, using the same component definition.</p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <Daughter name="Goneril" inheritance={{ land: 33, title: "Duchess of Albany" }} />
                      <Daughter name="Regan" inheritance={{ land: 33, title: "Duchess of Cornwall" }} />
                      <Daughter name="A New Heir" inheritance={{ land: 34, title: "Future Queen" }} />
                    </div>
                    <CodeBlock code={code.reusability} language="tsx" title="// Reusing the <Daughter /> component with different props" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </section>

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