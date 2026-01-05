import React, { useState, useRef, useEffect } from "react";
import { KeyRound, Shield, CheckCircle, Scale, ScrollText, UserCheck, Hand, Drama } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type Casket = "gold" | "silver" | "lead";
type DemoMode = "uncontrolled" | "controlled";

interface Chapter {
  title: string;
  content: string;
}

const CasketComponent: React.FC<{
  type: Casket;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}> = ({ type, label, isSelected, onClick }) => {
  const baseClasses = "w-full p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer text-center";
  const colorClasses = {
    gold: "border-amber-500/40 hover:border-amber-400 hover:bg-amber-950/50",
    silver: "border-slate-500/40 hover:border-slate-400 hover:bg-slate-800/50",
    lead: "border-zinc-600/40 hover:border-zinc-500 hover:bg-zinc-800/50",
  };
  const selectedClasses = {
    gold: "border-amber-400 bg-amber-950/50 shadow-lg shadow-amber-900/50",
    silver: "border-slate-400 bg-slate-800/50 shadow-lg shadow-slate-900/50",
    lead: "border-zinc-500 bg-zinc-800/50 shadow-lg shadow-zinc-900/50",
  };

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${colorClasses[type]} ${isSelected ? selectedClasses[type] : ""}`}
    >
      <div className="text-lg font-bold capitalize">{type}</div>
      <div className="text-xs text-slate-400 mt-1">"{label}"</div>
    </div>
  );
};

export default function MerchantOfVeniceControlledFormsModule(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [animationParent] = useAutoAnimate();

  // Demo State
  const [demoMode, setDemoMode] = useState<DemoMode>("uncontrolled");
  const [selectedCasket, setSelectedCasket] = useState<Casket | null>(null);
  const [choiceResult, setChoiceResult] = useState<string | null>(null);

  useEffect(() => {
    // Reset demo when chapter changes
    setSelectedCasket(null);
    setChoiceResult(null);
    setDemoMode(chapter === 1 ? "uncontrolled" : "controlled");
  }, [chapter]);

  const handleCasketChoice = (casket: Casket) => {
    if (demoMode === "controlled") {
      setSelectedCasket(casket);
      if (casket === "lead") {
        setChoiceResult("Success! You found Portia's portrait.");
      } else {
        setChoiceResult("Failure. A skull lies within.");
      }
    } else { // Uncontrolled
      setSelectedCasket(casket); // Visually select for demo clarity
      if (casket === "lead") {
        setChoiceResult("Success! (By chance). The DOM value was correct.");
      } else {
        setChoiceResult("Failure. The DOM value was incorrect.");
      }
    }
  };

  const chapters: Chapter[] = [
    {
      title: "The Will of a Dead Father",
      content: "Portia's father's will is the **single source of truth**, like React state. The caskets are form inputs. A suitor's choice is only valid if it aligns with the will's logic (the state), not the caskets' appearance (the DOM). This is the core of a controlled component.",
    },
    {
      title: "The Anti-Pattern: Impulse",
      content: "An **uncontrolled component** is like Morocco's choice. He interacts directly with the UI (the gold casket), reading its value from the DOM. The result is immediate and wrong because it bypasses the governing logic (state). The DOM, not state, dictates the outcome.",
    },
    {
      title: "The Solution: Deliberation",
      content: "A **controlled component** is Bassanio's choice. He deliberates (the `onChange` handler), updates his internal state, and *then* the UI reflects his decision. The input's `value` is driven by state, and user actions (`onChange`) update that state. State is the source of truth.",
    },
    {
      title: "Outward Shows vs. Inner Truth",
      content: "Uncontrolled components read values directly from the DOM. Controlled components use an `onChange` handler to update state, and the component re-renders to show the `value` from state. The UI becomes a predictable reflection of the application's inner truth.",
    },
    {
      title: "The Reward of Control",
      content: "The reward for using controlled components is a predictable, reliable UI. The form's value (Portia's portrait) is a guaranteed reflection of the application's state, preventing bugs and inconsistencies. The system behaves as expected because it's governed by state.",
    },
  ];

  const uncontrolledCode = `function UncontrolledCasket() {
  const choiceRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    // ❌ Read value directly from the DOM
    alert('You chose: ' + choiceRef.current.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* The DOM holds the state */}
      <select ref={choiceRef}>
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="lead">Lead</option>
      </select>
      <button type="submit">Choose</button>
    </form>
  );
}`;

  const controlledCode = `function ControlledCasket() {
  const [choice, setChoice] = useState('lead');

  function handleChange(e) {
    // ✅ Update state on user interaction
    setChoice(e.target.value);
  }

  return (
    <form>
      {/* React state is the source of truth */}
      <select value={choice} onChange={handleChange}>
        <option value="gold">Gold</option>
        <option value="silver">Silver</option>
        <option value="lead">Lead</option>
      </select>
      <p>Current choice: {choice}</p>
    </form>
  );
}`;

  const currentChapter = chapters[chapter];

  const renderDemo = () => (
    <div ref={animationParent}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <CasketComponent
          type="gold"
          label="Who chooseth me shall gain what many men desire."
          isSelected={selectedCasket === "gold"}
          onClick={() => handleCasketChoice("gold")}
        />
        <CasketComponent
          type="silver"
          label="Who chooseth me shall get as much as he deserves."
          isSelected={selectedCasket === "silver"}
          onClick={() => handleCasketChoice("silver")}
        />
        <CasketComponent
          type="lead"
          label="Who chooseth me must give and hazard all he hath."
          isSelected={selectedCasket === "lead"}
          onClick={() => handleCasketChoice("lead")}
        />
      </div>
      {choiceResult && (
        <div className={`mt-4 p-4 rounded-lg text-center font-bold ${choiceResult.startsWith("Success") ? "bg-green-900/50 text-green-300" : "bg-red-900/50 text-red-300"}`}>
          {choiceResult}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Drama}
        title="The Merchant of Venice"
        subtitle="Portia & Bassanio, c.1596"
        concept="React Concept: Forms and Controlled Components"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 text-lg font-bold">The Casket Test</h3>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Approach</label>
                  <div className="flex gap-2 rounded-lg bg-slate-800 p-1">
                    <button onClick={() => setDemoMode('uncontrolled')} className={`w-1/2 rounded-md px-3 py-1 text-sm font-semibold transition-colors ${demoMode === 'uncontrolled' ? 'bg-red-600 text-white' : 'hover:bg-slate-700'}`}>
                      Uncontrolled
                    </button>
                    <button onClick={() => setDemoMode('controlled')} className={`w-1/2 rounded-md px-3 py-1 text-sm font-semibold transition-colors ${demoMode === 'controlled' ? 'bg-green-600 text-white' : 'hover:bg-slate-700'}`}>
                      Controlled
                    </button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Current Choice</div>
                        <div className="font-mono text-lg capitalize">{selectedCasket || 'None'}</div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Source of Truth</div>
                        <div className={`font-mono text-lg ${demoMode === 'uncontrolled' ? 'text-red-400' : 'text-green-400'}`}>
                            {demoMode === 'uncontrolled' ? 'DOM' : 'State'}
                        </div>
                    </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Father's Will</span>
                    <span className="text-sm font-medium flex items-center gap-1.5"><ScrollText className="h-4 w-4"/>React State</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Caskets</span>
                    <span className="text-sm font-medium flex items-center gap-1.5"><Scale className="h-4 w-4"/>Form Inputs</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Suitor's Choice</span>
                    <span className="text-sm font-medium flex items-center gap-1.5"><Hand className="h-4 w-4"/>onChange Event</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Bassanio's Logic</span>
                    <span className="text-sm font-medium flex items-center gap-1.5"><UserCheck className="h-4 w-4"/>State Update</span>
                  </div>
                   <div className="flex justify-between pb-2">
                    <span className="text-sm text-slate-400">Portia's Portrait</span>
                    <span className="text-sm font-medium flex items-center gap-1.5"><KeyRound className="h-4 w-4"/>Correct UI Value</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "In a controlled component, React state is the single source of truth for an input's value, not the DOM."}
                  {chapter === 1 && "Uncontrolled components read their value from the DOM, which can lead to unpredictable behavior and bugs."}
                  {chapter === 2 && "The `value` and `onChange` props work together to create a controlled component, ensuring UI and state are always in sync."}
                  {chapter === 3 && "The fundamental difference: controlled components push state changes to the DOM; uncontrolled components pull values from it."}
                  {chapter === 4 && "Controlling your forms with state makes your application more predictable, easier to debug, and simpler to test."}
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "So may the outward shows be least themselves: the world is still deceived with ornament."
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Bassanio
                </p>
              </div>
            </div>
          }
        >
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-amber-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Interactive Demonstration
              </h3>
            </div>

            {chapter === 0 && (
              <div className="space-y-4">
                <p className="text-slate-400">This is the basic structure of a controlled component. The displayed choice is tied directly to React's state, not the DOM element itself. Try the controls in the sidebar.</p>
                {renderDemo()}
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-4">
                <p className="text-slate-400">This demo is in **uncontrolled** mode. Your choice is read directly from your click event. It bypasses state logic, leading to failure unless you guess correctly. This mirrors Morocco's impulsive grab.</p>
                {renderDemo()}
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-4">
                <p className="text-slate-400">This demo is in **controlled** mode. Your choice updates a state variable, and the UI re-renders to reflect that state. The logic inside the handler determines the outcome, just like Bassanio's deliberation.</p>
                {renderDemo()}
              </div>
            )}

            {chapter === 3 && (
              <CodeComparison
                badCode={uncontrolledCode}
                goodCode={controlledCode}
                language="tsx"
                themeColor="amber"
                badLabel="❌ Uncontrolled (DOM is Truth)"
                goodLabel="✅ Controlled (State is Truth)"
                badExplanation="This component uses a ref to pull the value from the DOM on submit. React doesn't 'know' the value until the form is submitted."
                goodExplanation="This component uses state to control the select's value. Every change updates the state, keeping React and the UI perfectly in sync."
              />
            )}

            {chapter === 4 && (
              <div className="space-y-4">
                <p className="text-slate-400">The final, correct implementation. Because the component is controlled by state, the result is predictable and correct. Choose the lead casket to see the reward of honoring the single source of truth.</p>
                {renderDemo()}
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