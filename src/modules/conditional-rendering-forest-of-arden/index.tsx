import { useState, useEffect, useCallback } from "react";
import { EyeOff, Shield, CheckCircle, User, Users, AlertTriangle, RefreshCw } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

// Simple UI components for the demo
const Rosalind: React.FC = () => (
  <div className="flex flex-col items-center justify-center rounded-lg bg-rose-900/30 p-6 border border-rose-500/30">
    <User className="h-12 w-12 text-rose-300 mb-4" />
    <div className="text-lg font-semibold text-rose-200">Princess Rosalind</div>
    <div className="text-sm text-rose-400">Silk Gown • Court</div>
  </div>
);

const Ganymede: React.FC = () => (
  <div className="flex flex-col items-center justify-center rounded-lg bg-emerald-900/30 p-6 border border-emerald-500/30">
    <Users className="h-12 w-12 text-emerald-300 mb-4" />
    <div className="text-lg font-semibold text-emerald-200">Ganymede</div>
    <div className="text-sm text-emerald-400">Wool Tunic • Leather Boots</div>
  </div>
);

const Forester: React.FC<{ recognizes: boolean }> = ({ recognizes }) => (
  <div className={`flex items-center justify-center rounded-lg p-6 ${recognizes ? 'bg-amber-900/30 border-amber-500/30' : 'bg-slate-800/30 border-slate-600/30'}`}>
    <AlertTriangle className={`h-10 w-10 ${recognizes ? 'text-amber-400' : 'text-slate-400'}`} />
    <div className="ml-4">
      <div className="font-semibold">The Forester</div>
      <div className={`text-sm ${recognizes ? 'text-amber-300' : 'text-slate-400'}`}>
        {recognizes ? "Recognizes princess!" : "Sees a stranger"}
      </div>
    </div>
  </div>
);

export default function ConditionalRenderingForestOfArden(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [isBanished, setIsBanished] = useState<boolean>(false);
  const [isSafe, setIsSafe] = useState<boolean>(false);
  const [demoMode, setDemoMode] = useState<'broken' | 'fixed'>('broken');
  const [recognitionCount, setRecognitionCount] = useState<number>(0);
  const [acceptanceCount, setAcceptanceCount] = useState<number>(0);
  const [interactionKey, setInteractionKey] = useState<number>(0);

  // Circuit breaker for failure demos
  useEffect(() => {
    if (recognitionCount >= 50) {
      alert("Safety limit reached! Too many failures. Resetting demo.");
      resetDemo();
    }
  }, [recognitionCount]);

  const resetDemo = useCallback(() => {
    setIsBanished(false);
    setIsSafe(false);
    setRecognitionCount(0);
    setAcceptanceCount(0);
    setInteractionKey(prev => prev + 1);
  }, []);

  const triggerForesterInteraction = useCallback(() => {
    if (isBanished && demoMode === 'broken') {
      // Anti-pattern: Always shows Rosalind even when banished = failure
      setRecognitionCount(prev => prev + 1);
      return 'failure';
    } else if (isBanished && demoMode === 'fixed') {
      // Correct pattern: Shows Ganymede when banished = success
      setAcceptanceCount(prev => prev + 1);
      return 'success';
    } else if (!isBanished) {
      // Not banished = no interaction
      return 'neutral';
    }
    return 'neutral';
  }, [isBanished, demoMode]);

  const chapters: Chapter[] = [
    {
      title: "The Decree",
      content: "Duke Frederick's banishment decree instantly changes Rosalind's status—from safe princess to hunted outlaw. In React, this is a **state change** (`isBanished: true`). The app must now render different UI based on this new condition."
    },
    {
      title: "The Beacon",
      content: `Rosalind's silk gown makes her dangerously visible in the forest—the wrong UI for the environment. This is **static rendering**: showing Component A when state requires Component B. Without conditional logic, your app presents incompatible interfaces.`
    },
    {
      title: "The Choice",
      content: `In the shepherd's hut, Rosalind chooses the tunic—deliberate conditional logic. In React: \`if (isBanished) return <Ganymede />\`. The **component evaluates state** and returns appropriate JSX. This transformation happens at render time.`
    },
    {
      title: "Two Faces of the Forest",
      content: "**Static rendering** fails: forester recognizes the princess. **Conditional rendering** succeeds: Ganymede is accepted. Same forest (`isBanished: true`), different output. Conditional rendering matches UI to application state."
    },
    {
      title: "A Martial Outside",
      content: `Ganymede's performance embodies **dynamic conditional rendering**. While \`isBanished === true\`, the component returns \`<Ganymede />\`. Multiple nested conditions (Celia → Aliena) show complex logic trees. The UI continuously re-evaluates state.`
    }
  ];

  // Code examples
  const antiPatternCode = `// ❌ Static Rendering - Ignores state
function RosalindComponent() {
  // Always returns the same UI
  return <Rosalind />;
}

// In the forest (isBanished = true):
// <Rosalind /> is rendered → Forester recognizes → FAILURE`;

  const correctPatternCode = `// ✅ Conditional Rendering - Respects state
function RosalindComponent({ isBanished }: { isBanished: boolean }) {
  // Returns UI based on condition
  if (isBanished) {
    return <Ganymede />; // Safe in forest
  }
  return <Rosalind />; // Safe at court
}

// In the forest (isBanished = true):
// <Ganymede /> is rendered → Forester accepts → SUCCESS`;

  const ternaryExample = `// Ternary operator (inline conditional)
function CharacterDisplay({ isBanished }: { isBanished: boolean }) {
  return (
    <div>
      {isBanished ? <Ganymede /> : <Rosalind />}
    </div>
  );
}`;

  const nestedConditionExample = `// Nested conditions (Celia's choice)
function Companions({ isBanished, celiaAccompanies }: { 
  isBanished: boolean; 
  celiaAccompanies: boolean;
}) {
  if (!isBanished) return <RosalindWithCelia />;
  
  if (celiaAccompanies) {
    return (
      <>
        <Ganymede />
        <Aliena />  // Celia's disguise
      </>
    );
  }
  
  return <Ganymede />;
}`;

  const currentChapter = chapters[chapter];
  const foresterResult = triggerForesterInteraction();

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={EyeOff}
        title="As You Like It"
        subtitle="Rosalind, The Forest of Arden, 1599"
        concept="React Concept: Conditional Rendering"
        themeColor="emerald"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* 1. Interactive Controls */}
              <div className="rounded-xl border border-emerald-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <RefreshCw className="h-5 w-5 text-emerald-400" />
                  Forest Controls
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Banishment Status</span>
                    <button
                      onClick={() => setIsBanished(!isBanished)}
                      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${isBanished ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                    >
                      {isBanished ? "Banished 🔴" : "Safe 🟢"}
                    </button>
                  </div>

                  {(chapter === 1 || chapter === 3) && (
                    <div className="space-y-2">
                      <div className="text-sm">Rendering Mode</div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setDemoMode('broken')}
                          className={`flex-1 rounded px-3 py-2 text-sm ${demoMode === 'broken' ? 'bg-rose-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                        >
                          ❌ Static
                        </button>
                        <button
                          onClick={() => setDemoMode('fixed')}
                          className={`flex-1 rounded px-3 py-2 text-sm ${demoMode === 'fixed' ? 'bg-emerald-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                        >
                          ✅ Conditional
                        </button>
                      </div>
                    </div>
                  )}

                  {chapter === 4 && (
                    <div className="space-y-2">
                      <div className="text-sm">Celia's Choice</div>
                      <button
                        onClick={() => setIsSafe(!isSafe)}
                        className={`w-full rounded px-3 py-2 ${isSafe ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-800 hover:bg-slate-700'}`}
                      >
                        {isSafe ? "Accompanies as Aliena" : "Remains at Court"}
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Recognitions</div>
                      <div className="font-mono text-xl text-rose-400">{recognitionCount}</div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Acceptances</div>
                      <div className="font-mono text-xl text-emerald-400">{acceptanceCount}</div>
                    </div>
                  </div>

                  <button
                    onClick={resetDemo}
                    className="mt-2 w-full rounded bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
                  >
                    Reset Forest
                  </button>
                </div>
              </div>

              {/* 2. Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-emerald-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Banishment Decree</span>
                    <span className="text-sm font-medium">State Change</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Silk Gown (Court)</span>
                    <span className="text-sm font-medium">Default Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Wool Tunic (Forest)</span>
                    <span className="text-sm font-medium">Conditional Component</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Shepherd's Hut Choice</span>
                    <span className="text-sm font-medium">Conditional Logic</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Forest of Arden</span>
                    <span className="text-sm font-medium">Runtime Environment</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Forester</span>
                    <span className="text-sm font-medium">User Validation</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-sm text-slate-400">Celia → Aliena</span>
                    <span className="text-sm font-medium">Nested Conditions</span>
                  </div>
                </div>
              </div>

              {/* 3. Key Insight Card */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-emerald-200/80">
                  {chapter === 0 && "State changes trigger UI re-evaluation. Conditional rendering ensures the right component displays for the current state."}
                  {chapter === 1 && "Static rendering ignores state—showing the wrong UI leads to user confusion and application failure."}
                  {chapter === 2 && "Conditional logic (if/else, ternary) lets components return different JSX based on props or state."}
                  {chapter === 3 && "Compare approaches: Static rendering fails when state changes. Conditional rendering adapts seamlessly."}
                  {chapter === 4 && "Nested conditions handle complex scenarios. The UI continuously evaluates state to stay consistent."}
                </p>
              </div>

              {/* 4. Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && "\"Full of banishment, sharper than a serpent's tooth.\""}
                  {chapter === 1 && "\"This gown is a beacon in this wood.\""}
                  {chapter === 2 && "\"This, now, is what I must be.\""}
                  {chapter === 3 && "\"The same forest, the same danger, a different face.\""}
                  {chapter === 4 && "\"We'll have a swashing and a martial outside.\""}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — {chapter === 0 || chapter === 1 ? "Duke Frederick" : "Rosalind"}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-emerald-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-emerald-500/20 bg-slate-900/40 p-6" key={interactionKey}>
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-emerald-500"></div>
              <h3 className="text-xl font-bold text-emerald-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter 0: State Change Demo */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Current State</div>
                    <div className={`text-3xl font-bold ${isBanished ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {isBanished ? "isBanished: true" : "isBanished: false"}
                    </div>
                    <p className="text-sm text-slate-400">
                      Toggle the banishment state in the sidebar. When state changes, components must re-render with appropriate UI.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Rendered Character</div>
                    {isBanished ? <Ganymede /> : <Rosalind />}
                  </div>
                </div>

                <CodeBlock
                  code={`// State-driven conditional rendering
function CharacterScene() {
  const [isBanished, setIsBanished] = useState(false);
  
  // Component returns different JSX based on state
  return (
    <div>
      {isBanished ? (
        <Ganymede />  // Forest-appropriate UI
      ) : (
        <Rosalind />  // Court-appropriate UI
      )}
    </div>
  );
}`}
                  language="tsx"
                  variant="default"
                  title="// State Change Triggers Re-render"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 1: Anti-pattern Demo */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Current Character</div>
                    {/* Anti-pattern: Always shows Rosalind */}
                    <Rosalind />
                    <div className="text-sm text-slate-400">
                      Static rendering ignores the <code>isBanished</code> state. Even in the forest, Rosalind appears.
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Forester's Reaction</div>
                    <Forester recognizes={isBanished} />
                    {isBanished && (
                      <div className="rounded bg-rose-900/40 p-3 text-sm text-rose-200">
                        ⚠️ Forester recognizes the princess! This is dangerous in the forest.
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => triggerForesterInteraction()}
                  disabled={!isBanished}
                  className={`rounded px-4 py-2 font-medium ${isBanished ? 'bg-rose-600 hover:bg-rose-700' : 'bg-slate-700 cursor-not-allowed'}`}
                >
                  {isBanished ? "Test Forest Encounter" : "Enter Forest First (Toggle Banishment)"}
                </button>

                <CodeBlock
                  code={antiPatternCode}
                  language="tsx"
                  variant="error"
                  title="// ❌ Anti-Pattern: Static Rendering"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Chapter 2: Solution Demo */}
            {chapter === 2 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Condition</div>
                    <div className="rounded-lg bg-slate-800/50 p-4">
                      <div className="font-mono text-lg">
                        isBanished = {isBanished.toString()}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Logic Evaluation</div>
                    <div className="rounded-lg bg-slate-800/50 p-4 font-mono">
                      {isBanished ? 'if (true) → Ganymede' : 'if (false) → Rosalind'}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Rendered Output</div>
                    {isBanished ? <Ganymede /> : <Rosalind />}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CodeBlock
                    code={correctPatternCode}
                    language="tsx"
                    variant="success"
                    title="// ✅ Solution: Conditional Rendering"
                    defaultExpanded={true}
                  />
                  <CodeBlock
                    code={ternaryExample}
                    language="tsx"
                    variant="default"
                    title="// Alternative: Ternary Operator"
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}

            {/* Chapter 3: Comparison Demo */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-rose-300">Static Rendering (Broken)</div>
                    <Rosalind />
                    <Forester recognizes={isBanished && demoMode === 'broken'} />
                    {isBanished && demoMode === 'broken' && (
                      <div className="rounded bg-rose-900/40 p-3 text-sm">
                        <div className="font-semibold">Failure: Recognized!</div>
                        <div className="text-rose-200">Wrong UI for current state leads to failure.</div>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold text-emerald-300">Conditional Rendering (Fixed)</div>
                    {isBanished ? <Ganymede /> : <Rosalind />}
                    <Forester recognizes={false} />
                    {isBanished && (
                      <div className="rounded bg-emerald-900/40 p-3 text-sm">
                        <div className="font-semibold">Success: Accepted!</div>
                        <div className="text-emerald-200">Correct UI matches state → success.</div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => triggerForesterInteraction()}
                  disabled={!isBanished}
                  className={`rounded px-4 py-2 font-medium ${isBanished ? 'bg-amber-600 hover:bg-amber-700' : 'bg-slate-700 cursor-not-allowed'}`}
                >
                  {isBanished ? "Test Both Approaches" : "Toggle Banishment to Test"}
                </button>

                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={correctPatternCode}
                  language="tsx"
                  themeColor="emerald"
                  badLabel="❌ Static Rendering (Anti-Pattern)"
                  goodLabel="✅ Conditional Rendering (Correct Pattern)"
                  badExplanation="Ignores application state, shows wrong UI, leads to user confusion and failure"
                  goodExplanation="Evaluates state, returns appropriate JSX, ensures UI consistency with application logic"
                />
              </div>
            )}

            {/* Chapter 4: Advanced Demo */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Primary Condition</div>
                    <div className={`rounded-lg p-4 ${isBanished ? 'bg-rose-900/30' : 'bg-emerald-900/30'}`}>
                      <div className="font-mono">isBanished: {isBanished.toString()}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Nested Condition</div>
                    <div className={`rounded-lg p-4 ${isSafe ? 'bg-amber-900/30' : 'bg-slate-800/30'}`}>
                      <div className="font-mono">celiaAccompanies: {isSafe.toString()}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Rendered Party</div>
                    <div className="grid grid-cols-1 gap-4">
                      {isBanished ? <Ganymede /> : <Rosalind />}
                      {isBanished && isSafe && (
                        <div className="rounded-lg bg-amber-900/20 p-4 border border-amber-500/20">
                          <div className="text-center font-semibold text-amber-300">Aliena (Celia)</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-800/30 p-4">
                  <div className="font-mono text-sm">
                    {isBanished 
                      ? isSafe 
                        ? "if (isBanished && celiaAccompanies) → <Ganymede /> + <Aliena />"
                        : "if (isBanished && !celiaAccompanies) → <Ganymede />"
                      : "if (!isBanished) → <Rosalind />"}
                  </div>
                </div>

                <CodeBlock
                  code={nestedConditionExample}
                  language="tsx"
                  variant="default"
                  title="// Nested Conditional Rendering"
                  defaultExpanded={true}
                />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="rounded bg-slate-800/30 p-3">
                    <div className="text-xs text-slate-500">State Changes</div>
                    <div className="font-mono text-xl">{interactionKey}</div>
                  </div>
                  <div className="rounded bg-slate-800/30 p-3">
                    <div className="text-xs text-slate-500">Conditions</div>
                    <div className="font-mono text-xl">2</div>
                  </div>
                  <div className="rounded bg-slate-800/30 p-3">
                    <div className="text-xs text-slate-500">Possible Outputs</div>
                    <div className="font-mono text-xl">3</div>
                  </div>
                  <div className="rounded bg-slate-800/30 p-3">
                    <div className="text-xs text-slate-500">Render Time</div>
                    <div className="font-mono text-xl">&lt;1ms</div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="emerald"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}