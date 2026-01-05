import { useState, useEffect, useMemo, useCallback } from "react";
import { Crown, Shield, CheckCircle, Swords, Users, Scroll } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Soldier {
  id: string;
  name: string;
  rank: string;
  status: "active" | "fallen";
}

interface Chapter {
  title: string;
  content: string;
}

export default function ListsAndKeysHenryV(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [useIndexKeys, setUseIndexKeys] = useState<boolean>(false);
  const [soldiers, setSoldiers] = useState<Soldier[]>([
    { id: "1", name: "Thomas of Kent", rank: "Archer", status: "active" },
    { id: "2", name: "William of York", rank: "Bowman", status: "active" },
    { id: "3", name: "John of Harrow", rank: "Spearman", status: "active" },
    { id: "4", name: "Richard of Lancaster", rank: "Knight", status: "active" },
    { id: "5", name: "Henry of Monmouth", rank: "King", status: "active" },
  ]);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [misidentificationCount, setMisidentificationCount] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Circuit breaker: prevent more than 50 misidentifications
  useEffect(() => {
    if (misidentificationCount >= 50) {
      alert("Safety limit reached! Too many misidentifications. Resetting demo.");
      resetDemo();
    }
  }, [misidentificationCount]);

  // Increment render count on each render
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });

  const chapters: Chapter[] = [
    {
      title: "The Band of Brothers",
      content: "Henry addresses his army—a list of soldiers with inherent identity. Each man is a distinct component in the formation."
    },
    {
      title: "Chaos in the Mud",
      content: "Counting soldiers by position fails when mud obscures faces and positions shift—just like using array indices as React keys."
    },
    {
      title: "The Name That Endures",
      content: "Calling soldiers by name works despite the mud—unique identifiers ensure correct tracking, like proper React keys."
    },
    {
      title: "Position vs. Identity",
      content: "Positional tracking fails when soldiers swap places. Named identification succeeds because identity persists through changes."
    },
    {
      title: "Remembered by Key",
      content: "Each soldier remembered by his unique identifier. React keys ensure efficient reconciliation and accurate updates."
    }
  ];

  const simulateBattle = useCallback(() => {
    setIsSimulating(true);
    
    // Simulate battle casualties and reordering
    const newSoldiers = [...soldiers];
    
    // Randomly mark one soldier as fallen
    const fallenIndex = Math.floor(Math.random() * newSoldiers.length);
    newSoldiers[fallenIndex] = { ...newSoldiers[fallenIndex], status: "fallen" };
    
    // Shuffle the array (simulate position changes in battle)
    for (let i = newSoldiers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newSoldiers[i], newSoldiers[j]] = [newSoldiers[j], newSoldiers[i]];
    }
    
    setSoldiers(newSoldiers);
    
    // If using index keys, count misidentifications
    if (useIndexKeys) {
      // Check if any soldier is in a different position than their ID would suggest
      const misidentifications = newSoldiers.filter((soldier, index) => 
        soldier.id !== soldiers[index]?.id
      ).length;
      
      if (misidentifications > 0) {
        setMisidentificationCount(prev => prev + misidentifications);
      }
    }
    
    setTimeout(() => setIsSimulating(false), 1000);
  }, [soldiers, useIndexKeys]);

  const swapTwoSoldiers = useCallback(() => {
    if (soldiers.length >= 2) {
      const newSoldiers = [...soldiers];
      [newSoldiers[0], newSoldiers[1]] = [newSoldiers[1], newSoldiers[0]];
      setSoldiers(newSoldiers);
      
      if (useIndexKeys) {
        setMisidentificationCount(prev => prev + 2); // Both soldiers are misidentified
      }
    }
  }, [soldiers, useIndexKeys]);

  const resetDemo = useCallback(() => {
    setSoldiers([
      { id: "1", name: "Thomas of Kent", rank: "Archer", status: "active" },
      { id: "2", name: "William of York", rank: "Bowman", status: "active" },
      { id: "3", name: "John of Harrow", rank: "Spearman", status: "active" },
      { id: "4", name: "Richard of Lancaster", rank: "Knight", status: "active" },
      { id: "5", name: "Henry of Monmouth", rank: "King", status: "active" },
    ]);
    setMisidentificationCount(0);
    setIsSimulating(false);
  }, []);

  const antiPatternCode = `// ❌ Using array indices as keys
{soldiers.map((soldier, index) => (
  <SoldierCard
    key={index} // PROBLEM: Changes when list reorders
    soldier={soldier}
  />
))}`;

  const correctPatternCode = `// ✅ Using unique IDs as keys
{soldiers.map((soldier) => (
  <SoldierCard
    key={soldier.id} // SOLUTION: Stable identity
    soldier={soldier}
  />
))}`;

  const soldierCardCode = `// Soldier component with visual feedback
function SoldierCard({ soldier }: { soldier: Soldier }) {
  return (
    <div className="border border-slate-700 rounded p-4">
      <h3 className="font-bold">{soldier.name}</h3>
      <p className="text-sm text-slate-400">{soldier.rank}</p>
      <div className={\`mt-2 text-xs px-2 py-1 rounded \${
        soldier.status === "active" 
          ? "bg-emerald-900/30 text-emerald-400" 
          : "bg-red-900/30 text-red-400"
      }\`}>
        {soldier.status === "active" ? "ACTIVE" : "FALLEN"}
      </div>
    </div>
  );
}`;

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Crown}
        title="Henry V"
        subtitle="The Band of Brothers, 1415"
        concept="React Concept: Lists and Keys"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-300">
                  <Swords className="h-5 w-5" />
                  Battle Simulation
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setUseIndexKeys(true)}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-all ${useIndexKeys ? 'bg-amber-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      ❌ Index Keys
                    </button>
                    <button
                      onClick={() => setUseIndexKeys(false)}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-all ${!useIndexKeys ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      ✅ ID Keys
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Renders</div>
                      <div className="font-mono text-xl tabular-nums">{renderCount}</div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Misidentifications</div>
                      <div className={`font-mono text-xl tabular-nums ${misidentificationCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {misidentificationCount}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={simulateBattle}
                    disabled={isSimulating}
                    className="w-full rounded bg-amber-700 px-4 py-2 font-medium hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSimulating ? "BATTLE IN PROGRESS..." : "⚔️ Simulate Battle"}
                  </button>

                  <button
                    onClick={resetDemo}
                    className="w-full rounded border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm hover:bg-slate-700"
                  >
                    Reset Army
                  </button>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-300">
                  <Shield className="h-5 w-5" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">English Army</span>
                    <span className="text-sm font-medium">Array of Data</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Individual Soldier</span>
                    <span className="text-sm font-medium">List Item Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Soldier's Name</span>
                    <span className="text-sm font-medium">Key Prop</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Battle Casualties</span>
                    <span className="text-sm font-medium">State Change</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Roll Call Process</span>
                    <span className="text-sm font-medium">Reconciliation</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-sm text-slate-400">King Henry V</span>
                    <span className="text-sm font-medium">Parent Component</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "Lists render collections; each item needs unique identity."}
                  {chapter === 1 && "Array indices fail as keys when items move—like counting soldiers by position."}
                  {chapter === 2 && "Unique keys enable React to track items accurately despite changes."}
                  {chapter === 3 && "Position changes cause misidentification; stable identity prevents errors."}
                  {chapter === 4 && "Keys optimize reconciliation, preventing unnecessary re-renders."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && "\"We few, we happy few, we band of brothers.\""}
                  {chapter === 1 && "\"Without a name, a man is but a number in the mud.\""}
                  {chapter === 2 && "\"Let every man be known by his own name.\""}
                  {chapter === 3 && "\"A position deceives, but a name endures.\""}
                  {chapter === 4 && "\"We are remembered, each by his key.\""}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Henry V
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-amber-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Interactive Demonstration
              </h3>
            </div>

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3 text-lg font-medium text-amber-100">The Army (Data Array)</h4>
                    <CodeBlock
                      code={`const soldiers = [
  { id: "1", name: "Thomas of Kent", rank: "Archer" },
  { id: "2", name: "William of York", rank: "Bowman" },
  { id: "3", name: "John of Harrow", rank: "Spearman" },
  { id: "4", name: "Richard of Lancaster", rank: "Knight" },
  { id: "5", name: "Henry of Monmouth", rank: "King" },
];`}
                      language="typescript"
                      variant="default"
                      title="// The List to Render"
                      defaultExpanded={true}
                    />
                  </div>
                  <div>
                    <h4 className="mb-3 text-lg font-medium text-amber-100">Rendered Formation</h4>
                    <div className="space-y-3">
                      {soldiers.map((soldier) => (
                        <div key={soldier.id} className="border border-slate-700 rounded p-4 bg-slate-800/30">
                          <h3 className="font-bold text-amber-100">{soldier.name}</h3>
                          <p className="text-sm text-slate-400">{soldier.rank}</p>
                          <div className="mt-2 text-xs px-2 py-1 rounded bg-emerald-900/30 text-emerald-400 inline-block">
                            ACTIVE
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <CodeBlock
                  code={soldierCardCode}
                  language="tsx"
                  variant="default"
                  title="// Soldier Component"
                />
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-amber-500/30 bg-amber-950/10 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-lg font-medium text-amber-100">
                    <span className="rounded bg-amber-500/20 px-2 py-1 text-xs">❌ ANTI-PATTERN</span>
                    Index Keys Cause Chaos
                  </h4>
                  <p className="mb-4 text-slate-300">When soldiers reorder in battle, tracking by position fails. React misidentifies components.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <CodeBlock
                        code={antiPatternCode}
                        language="tsx"
                        variant="error"
                        title="// Using Array Indices as Keys"
                      />
                    </div>
                    <div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Current Key Strategy:</span>
                          <span className="rounded bg-amber-600 px-2 py-1 text-xs font-medium">Index Keys</span>
                        </div>
                        <button
                          onClick={simulateBattle}
                          disabled={isSimulating}
                          className="w-full rounded bg-amber-700 px-4 py-3 font-medium hover:bg-amber-600 disabled:opacity-50"
                        >
                          {isSimulating ? "⚔️ Battle in Progress..." : "⚔️ Simulate Battle Reordering"}
                        </button>
                        {misidentificationCount > 0 && (
                          <div className="rounded-lg border border-amber-500/30 bg-amber-900/20 p-3">
                            <div className="text-sm text-amber-300">
                              <span className="font-medium">Misidentifications:</span> {misidentificationCount}
                            </div>
                            <div className="mt-1 text-xs text-amber-400/80">
                              Soldiers tracked incorrectly due to position changes
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/10 p-4">
                  <h4 className="mb-3 flex items-center gap-2 text-lg font-medium text-emerald-100">
                    <span className="rounded bg-emerald-500/20 px-2 py-1 text-xs">✅ SOLUTION</span>
                    Unique Keys Ensure Accuracy
                  </h4>
                  <p className="mb-4 text-slate-300">Using stable identifiers allows React to track soldiers correctly despite position changes.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <CodeBlock
                        code={correctPatternCode}
                        language="tsx"
                        variant="success"
                        title="// Using Unique IDs as Keys"
                      />
                    </div>
                    <div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400">Current Key Strategy:</span>
                          <span className="rounded bg-emerald-600 px-2 py-1 text-xs font-medium">ID Keys</span>
                        </div>
                        <button
                          onClick={simulateBattle}
                          disabled={isSimulating}
                          className="w-full rounded bg-emerald-700 px-4 py-3 font-medium hover:bg-emerald-600 disabled:opacity-50"
                        >
                          {isSimulating ? "⚔️ Battle in Progress..." : "⚔️ Simulate Battle Reordering"}
                        </button>
                        {misidentificationCount === 0 && (
                          <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 p-3">
                            <div className="text-sm text-emerald-300">
                              <span className="font-medium">No Misidentifications</span>
                            </div>
                            <div className="mt-1 text-xs text-emerald-400/80">
                              All soldiers correctly tracked despite position changes
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <button
                    onClick={swapTwoSoldiers}
                    className="rounded-lg bg-amber-700 px-6 py-3 font-medium hover:bg-amber-600"
                  >
                    🔄 Simulate Two Soldiers Swapping Places
                  </button>
                  <p className="mt-2 text-sm text-slate-400">Thomas and William exchange positions in the formation</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-amber-100">Before Swap</h4>
                    <div className="space-y-3">
                      {soldiers.slice(0, 2).map((soldier, index) => (
                        <div key={index} className="border border-slate-700 rounded p-4 bg-slate-800/30">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-amber-100">{soldier.name}</h3>
                              <p className="text-sm text-slate-400">{soldier.rank}</p>
                            </div>
                            <div className="rounded bg-slate-700 px-2 py-1 text-xs">
                              Position: {index}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-emerald-100">After Swap</h4>
                    <div className="space-y-3">
                      {[...soldiers].reverse().slice(0, 2).map((soldier, index) => (
                        <div key={index} className="border border-slate-700 rounded p-4 bg-slate-800/30">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-emerald-100">{soldier.name}</h3>
                              <p className="text-sm text-slate-400">{soldier.rank}</p>
                            </div>
                            <div className="rounded bg-slate-700 px-2 py-1 text-xs">
                              Position: {index}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={correctPatternCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Index Keys (Position)"
                  goodLabel="✅ ID Keys (Identity)"
                  badExplanation="When soldiers swap positions, React thinks the component at position 0 is still Thomas (but it's now William)"
                  goodExplanation="Each soldier tracked by unique ID, so swapping positions doesn't cause misidentification"
                />
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                    <div className="text-xs text-slate-500">Total Renders</div>
                    <div className="font-mono text-2xl tabular-nums">{renderCount}</div>
                  </div>
                  <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                    <div className="text-xs text-slate-500">Misidentifications</div>
                    <div className={`font-mono text-2xl tabular-nums ${misidentificationCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {misidentificationCount}
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                    <div className="text-xs text-slate-500">Key Strategy</div>
                    <div className={`font-mono text-lg ${useIndexKeys ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {useIndexKeys ? 'INDEX KEYS' : 'ID KEYS'}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/10 p-6">
                  <h4 className="mb-4 text-lg font-medium text-emerald-100">Complete Implementation</h4>
                  <CodeBlock
                    code={`// ✅ Best Practices for Lists and Keys
interface Soldier {
  id: string;           // Unique, stable identifier
  name: string;
  rank: string;
  status: "active" | "fallen";
}

function ArmyList({ soldiers }: { soldiers: Soldier[] }) {
  return (
    <div className="space-y-4">
      {soldiers.map((soldier) => (
        <SoldierCard
          key={soldier.id} // ✅ Stable key from data
          soldier={soldier}
        />
      ))}
    </div>
  );
}

// Keys should be:
// 1. ✅ Unique among siblings
// 2. ✅ Stable across re-renders  
// 3. ✅ Predictable (not random)
// 4. ❌ Never use array indices (unless list is static)`}
                    language="typescript"
                    variant="success"
                    title="// Final Best Practices"
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}
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