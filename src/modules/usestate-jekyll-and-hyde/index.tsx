import { useState, useEffect, useRef } from "react";
import { FlaskRound, BookOpen, AlertTriangle, CheckCircle, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function UseStateJekyllAndHyde(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  
  // Chapter 1: Basic useState demo
  const [persona, setPersona] = useState<"Jekyll" | "Hyde">("Jekyll");
  
  // Chapter 2: Direct mutation anti-pattern tracking
  const [manualMutationCount, setManualMutationCount] = useState<number>(0);
  const [isUiInSync, setIsUiInSync] = useState<boolean>(true);
  const [buggyBehavior, setBuggyBehavior] = useState<string>("None");
  const directStateRef = useRef<"Jekyll" | "Hyde">("Jekyll");
  
  // Chapter 3: Comparison mode
  const [showCorrectApproach, setShowCorrectApproach] = useState<boolean>(false);
  
  // Chapter 4: Comparison metrics
  const [declarativeSuccesses, setDeclarativeSuccesses] = useState<number>(0);
  const [mutationFailures, setMutationFailures] = useState<number>(0);
  
  // Chapter 5: Principles explorer
  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "The Two Natures",
      content: `The London fog pressed against the windows of Dr. Henry Jekyll's study, a silent, grey accomplice to his thoughts. He was a man of impeccable standing—and he was suffocating. This single, unyielding persona was a cage. "Every man contains two natures," he murmured. "The question is how to declare which one is present."\n\nIn his laboratory, he discovered the binary choice. He held up a vial: his current state. Beside it, the reagent—not another state, but the means of transformation. He wrote in his journal: \`const [persona, setPersona] = useState('Jekyll');\`. The state, and the function to change it. The man, and the potion.\n\nHe drank. Pain, then transformation. In the mirror: Mr. Hyde. He had called \`setPersona('Hyde')\`. The component had re-rendered. The antidote brought him back: \`setPersona('Jekyll')\`. Clean. Predictable.`
    },
    {
      id: "build", 
      title: "The Unstable State",
      content: `Hubris took root. Jekyll believed he could control the transformation without the potion. At a dinner party, he decided to act like Hyde. He forced a cruel sneer, delivered a guttural insult. The result wasn't intimidation but profound awkwardness. He hadn't transformed; he had introduced a bug. He tried to patch the man, but only corrupted the whole.\n\nAfter nights as Hyde, he'd awaken as Jekyll but find Hyde's handwriting, his impatience leaking through. He tried to force himself back through willpower—manual patches, not a true state reset. Remnants of the previous state caused unpredictable side effects.\n\nHis lawyer Utterson confronted him about Hyde. Jekyll stammered lies, creating conflicting narratives. He was managing two sources of truth, tearing himself apart. A state so corrupted it was becoming unmanageable.`
    },
    {
      id: "climax",
      title: "The Setter's Decree",
      content: `Locked in his laboratory, surrounded by failure, Jekyll read his journal. The realization dawned: "It's not a process. It's a declaration."\n\nHis mistake was trying to modify his existing state—to add a little Hyde to his Jekyll. But the potion was never designed for that. Its purpose was to discard the old state entirely and render a new one from scratch. You don't modify the state. You command a new one.\n\nWith cold precision, he prepared the potion. He held the glass, forming the command: \`setPersona('Hyde')\`. He drank. The transformation was immediate and absolute—no lingering trace of Jekyll. A perfect re-render. The antidote: \`setPersona('Jekyll')\`. Just as swift, just as complete. He had discovered the law.`
    },
    {
      id: "resolution",
      title: "A Tale of Two Transformations",
      content: `Jekyll codified his discovery. He remembered the dinner party: forcing Hyde's personality, the confused faces, the retreat in shame. A messy, unpredictable hack that corrupted everything.\n\nThen, a recent event. A brutish man demanded money. Jekyll remained calm. "Excuse me for one moment." He retreated to his lab and executed the function: \`setPersona('Hyde')\`. The door opened. Hyde emerged. The man fled in terror. Hyde retreated. \`setPersona('Jekyll')\`. Dr. Jekyll emerged, adjusted his waistcoat, returned to his reading. Atomic. Perfect. Stable.\n\nThe contrast was absolute. One was corruption; the other was command. He wrote the final sentence, underlining it twice: "One state, one render. That is the law of transformation."`
    },
    {
      id: "summary",
      title: "The Sealed Confession",
      content: `The last of the salts were gone. Jekyll wrote his final confession—a document of scientific discovery.\n\n"Let it be known that the management of a man's nature is governed by simple, immutable laws. First, a man is rendered in a default state; for me, this was Henry Jekyll. This is his initial presentation.\n\n"Second, this state cannot be safely altered by degrees or by force of will. Such attempts lead only to corruption. There exists only one valid method for change: a singular agent of transformation. This function does not negotiate with the current state. It obliterates it.\n\n"Finally, upon application of this agent, the subject is re-rendered entirely according to the new state declared. The change is total. The outcome is predictable. The potion is not a suggestion; it is a command to re-render the soul."\n\nHe signed the letter as transformation began. He had lost control of the state, but died with perfect knowledge of how it worked.`
    }
  ];

  // Code examples as template literals
  const useStateDeclaration = `// ✅ Declaring State
const [persona, setPersona] = useState('Jekyll');
// persona = current state value ('Jekyll')
// setPersona = function to update state`;

  const correctTransformation = `// ✅ Commanding a New State
const becomeHyde = () => {
  setPersona('Hyde'); // Clean re-render
};

const becomeJekyll = () => {
  setPersona('Jekyll'); // Complete transformation
};`;

  const directMutationBroken = `// ❌ Direct State Mutation (ANTI-PATTERN)
const handleManualChange = () => {
  // This looks like it should work...
  if (persona === 'Jekyll') {
    persona = 'Hyde'; // WRONG: Direct assignment
  }
  // UI won't update! No re-render triggered
  // State and UI become out of sync
};`;

  const fixedSetterApproach = `// ✅ Using the Setter Function
const handleProperChange = () => {
  if (persona === 'Jekyll') {
    setPersona('Hyde'); // RIGHT: Use setter
  }
  // Component re-renders with new state
  // UI stays perfectly in sync
};`;

  const principles = [
    `// 1. Initial State
const [state, setState] = useState(initialValue);
// The component begins with this default`,
    `// 2. Single Update Path
// Never mutate state directly
// state = newValue; // ❌ WRONG
setState(newValue); // ✅ RIGHT
// The setter is the only valid update mechanism`,
    `// 3. Complete Re-render
// Every setState call triggers:
// 1. State update
// 2. Component re-render
// 3. UI reflects new state
// It's atomic and predictable`
  ];

  // Chapter 2: Direct mutation demo (with circuit breaker)
  const attemptManualMutation = (): void => {
    if (manualMutationCount >= 50) {
      resetMutationDemo();
      return;
    }

    // ANTI-PATTERN: Direct mutation
    if (directStateRef.current === "Jekyll") {
      directStateRef.current = "Hyde";
    } else {
      directStateRef.current = "Jekyll";
    }
    
    setManualMutationCount(prev => prev + 1);
    setIsUiInSync(false);
    
    // Simulate buggy behavior
    const bugs = [
      "Hyde's handwriting appears",
      "Jekyll's manners slip", 
      "Conflicting memories",
      "Social confusion"
    ];
    setBuggyBehavior(bugs[Math.floor(Math.random() * bugs.length)]);
  };

  const resetMutationDemo = (): void => {
    setManualMutationCount(0);
    setIsUiInSync(true);
    setBuggyBehavior("None");
    directStateRef.current = "Jekyll";
  };

  // Chapter 4: Comparison functions
  const attemptDeclarativeChange = (): void => {
    setPersona(prev => prev === "Jekyll" ? "Hyde" : "Jekyll");
    setDeclarativeSuccesses(prev => prev + 1);
  };

  const attemptMutationFailure = (): void => {
    attemptManualMutation();
    setMutationFailures(prev => prev + 1);
  };

  // Reset all demos on chapter change
  useEffect(() => {
    setPersona("Jekyll");
    resetMutationDemo();
    setShowCorrectApproach(false);
    setDeclarativeSuccesses(0);
    setMutationFailures(0);
    setActivePrinciple(0);
  }, [chapter]);

  const currentChapter = chapters[chapter];
  const isLastChapter = chapter === chapters.length - 1;
  const isFirstChapter = chapter === 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-serif p-4 md:p-8">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm mb-8 md:mb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6">
          <div className="flex items-center justify-between gap-4 md:gap-6 mb-2 flex-wrap">
            <div className="flex items-center gap-2 md:gap-3">
              <FlaskRound className="text-emerald-500 w-6 h-6 md:w-8 md:h-8" />
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">Strange Case of Dr Jekyll and Mr Hyde</h1>
            </div>
            <p className="text-xs md:text-sm text-slate-400">
              Gothic Fiction • Dr. Henry Jekyll • 1886
            </p>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-emerald-500 font-medium">
            useState Hook: Declarative State Management
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            <div className="prose prose-invert prose-lg max-w-none mb-8 md:mb-12">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-emerald-500 w-5 h-5" />
                <h2 className="text-2xl md:text-3xl font-bold m-0">{currentChapter.title}</h2>
              </div>
              <div className="leading-relaxed space-y-4">
                {currentChapter.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="m-0">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center justify-between mt-8 md:mt-12 pt-6 border-t border-slate-800">
              <button
                onClick={() => setChapter(Math.max(0, chapter - 1))}
                disabled={isFirstChapter}
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous chapter"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden md:inline">Previous</span>
              </button>
              
              <div className="flex flex-col items-center">
                <span className="text-sm text-slate-400">
                  Chapter {chapter + 1} of {chapters.length}
                </span>
                <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                  />
                </div>
              </div>
              
              <button
                onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
                disabled={isLastChapter}
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="Next chapter"
              >
                <span className="hidden md:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>

          {/* Laboratory Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-slate-900/70 backdrop-blur-sm border border-slate-700 rounded-xl p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <FlaskRound className="text-emerald-500 w-5 h-5" />
                  <h3 className="text-lg md:text-xl font-semibold">Jekyll's Laboratory</h3>
                </div>

                {/* Chapter-specific demonstrations */}
                {chapter === 0 && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className={`text-5xl md:text-6xl mb-4 transition-all duration-500 ${persona === "Hyde" ? "scale-90 rotate-2" : "scale-100"}`}>
                        {persona === "Jekyll" ? "🧪" : "😈"}
                      </div>
                      <p className="text-lg font-medium mb-2">
                        Current Persona: <span className={`font-bold ${persona === "Jekyll" ? "text-blue-400" : "text-red-400"}`}>{persona}</span>
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPersona("Jekyll")}
                        disabled={persona === "Jekyll"}
                        className="px-4 py-3 bg-blue-600/30 text-blue-300 border border-blue-500/30 rounded-lg hover:bg-blue-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Antidote → Jekyll
                      </button>
                      <button
                        onClick={() => setPersona("Hyde")}
                        disabled={persona === "Hyde"}
                        className="px-4 py-3 bg-red-600/30 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Potion → Hyde
                      </button>
                    </div>
                    
                    <CodeBlock
                      code={useStateDeclaration}
                      variant="success"
                      title="// useState Declaration"
                      defaultExpanded={true}
                      language="typescript"
                    />
                  </div>
                )}

                {chapter === 1 && (
                  <div className="space-y-6">
                    <div className="text-center p-4 bg-red-950/20 border border-red-500/30 rounded-lg">
                      <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <p className="text-sm text-red-300">Direct Mutation Anti-pattern</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Direct State:</span>
                        <span className="font-mono">{directStateRef.current}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">UI Shows:</span>
                        <span className="font-mono">{persona}</span>
                      </div>
                      <div className={`flex justify-between items-center ${isUiInSync ? "text-emerald-400" : "text-red-400"}`}>
                        <span className="text-sm">In Sync:</span>
                        <span>{isUiInSync ? "✓ Yes" : "✗ No"}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Buggy Behavior:</span>
                        <span className="text-red-300 text-sm">{buggyBehavior}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <button
                        onClick={attemptManualMutation}
                        disabled={manualMutationCount >= 50}
                        className="w-full px-4 py-3 bg-red-600/30 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-600/50 disabled:opacity-50 transition-colors"
                      >
                        🚫 Manual Override (Anti-pattern)
                      </button>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Mutation Attempts: <span className="font-bold">{manualMutationCount}/50</span></span>
                        <button
                          onClick={resetMutationDemo}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Reset
                        </button>
                      </div>
                    </div>
                    
                    <CodeBlock
                      code={directMutationBroken}
                      variant="error"
                      title="// ❌ Common Mistake: Direct Mutation"
                      defaultExpanded={true}
                      language="typescript"
                    />
                  </div>
                )}

                {chapter === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <button
                        onClick={() => setShowCorrectApproach(false)}
                        className={`px-4 py-2 rounded-lg transition-colors ${!showCorrectApproach ? "bg-red-600/30 text-red-300 border border-red-500/30" : "bg-slate-800 text-slate-400"}`}
                      >
                        ❌ Broken
                      </button>
                      <button
                        onClick={() => setShowCorrectApproach(true)}
                        className={`px-4 py-2 rounded-lg transition-colors ${showCorrectApproach ? "bg-emerald-600/30 text-emerald-300 border border-emerald-500/30" : "bg-slate-800 text-slate-400"}`}
                      >
                        ✅ Fixed
                      </button>
                    </div>
                    
                    {!showCorrectApproach ? (
                      <>
                        <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-lg">
                          <p className="text-red-300 text-sm">
                            Direct mutation corrupts state. The UI shows "{persona}" but manual overrides create hidden inconsistencies.
                          </p>
                        </div>
                        <CodeBlock
                          code={directMutationBroken}
                          variant="error"
                          title="// ❌ What Doesn't Work"
                          defaultExpanded={true}
                          language="typescript"
                        />
                      </>
                    ) : (
                      <>
                        <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-lg">
                          <p className="text-emerald-300 text-sm">
                            The setter function declares a new state. The component re-renders completely. UI stays perfectly in sync.
                          </p>
                        </div>
                        <CodeBlock
                          code={fixedSetterApproach}
                          variant="success"
                          title="// ✅ The Correct Approach"
                          defaultExpanded={true}
                          language="typescript"
                        />
                        <CodeBlock
                          code={correctTransformation}
                          variant="success"
                          title="// Clean Transformation Functions"
                          defaultExpanded={false}
                          language="typescript"
                        />
                      </>
                    )}
                    
                    <button
                      onClick={() => setPersona(prev => prev === "Jekyll" ? "Hyde" : "Jekyll")}
                      className="w-full px-4 py-3 bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/50 transition-colors"
                    >
                      Execute setPersona() Transformation
                    </button>
                  </div>
                )}

                {chapter === 3 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
                        <h4 className="text-red-400 font-semibold mb-2 text-sm">Manual Mutation</h4>
                        <button
                          onClick={attemptMutationFailure}
                          className="w-full px-3 py-2 bg-red-600/30 text-red-300 text-sm rounded hover:bg-red-600/50 transition-colors"
                        >
                          Attempt Manual Change
                        </button>
                        <div className="mt-3 text-center">
                          <div className="text-2xl text-red-400 font-mono">{mutationFailures}</div>
                          <div className="text-xs text-red-300/70">Failures</div>
                        </div>
                      </div>
                      
                      <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
                        <h4 className="text-emerald-400 font-semibold mb-2 text-sm">Declarative Setter</h4>
                        <button
                          onClick={attemptDeclarativeChange}
                          className="w-full px-3 py-2 bg-emerald-600/30 text-emerald-300 text-sm rounded hover:bg-emerald-600/50 transition-colors"
                        >
                          Use setPersona()
                        </button>
                        <div className="mt-3 text-center">
                          <div className="text-2xl text-emerald-400 font-mono">{declarativeSuccesses}</div>
                          <div className="text-xs text-emerald-300/70">Successes</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current State:</span>
                        <span className={`font-mono ${persona === "Jekyll" ? "text-blue-400" : "text-red-400"}`}>{persona}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Transformations:</span>
                        <span className="font-mono">{declarativeSuccesses + mutationFailures}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Success Rate:</span>
                        <span className={`font-mono ${declarativeSuccesses > 0 ? "text-emerald-400" : "text-slate-400"}`}>
                          {declarativeSuccesses + mutationFailures > 0 
                            ? `${Math.round((declarativeSuccesses / (declarativeSuccesses + mutationFailures)) * 100)}%`
                            : "0%"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-800">
                      <p className="text-sm text-slate-400 mb-3">The Law of Transformation:</p>
                      <div className="p-3 bg-slate-800/50 rounded border border-slate-700">
                        <p className="text-emerald-300 text-sm font-medium">
                          "One state, one render."
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {chapter === 4 && (
                  <div className="space-y-6">
                    <div className="text-center p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                      <p className="text-sm text-emerald-300">The Three Immutable Laws</p>
                    </div>
                    
                    <div className="space-y-4">
                      {principles.map((principle, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActivePrinciple(idx)}
                          className={`w-full text-left p-3 rounded-lg transition-colors ${activePrinciple === idx ? "bg-emerald-950/30 border border-emerald-500/30" : "bg-slate-800/30 hover:bg-slate-800/50"}`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${activePrinciple === idx ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-400"}`}>
                              {idx + 1}
                            </div>
                            <span className="text-sm font-medium">
                              {idx === 0 && "Initial State"}
                              {idx === 1 && "Single Update Path"}
                              {idx === 2 && "Complete Re-render"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            {idx === 0 && "Components begin with a default value"}
                            {idx === 1 && "The setter is the only valid update mechanism"}
                            {idx === 2 && "Every state change triggers a full re-render"}
                          </p>
                        </button>
                      ))}
                    </div>
                    
                    <CodeBlock
                      code={principles[activePrinciple]}
                      variant="success"
                      title={`// Principle ${activePrinciple + 1}`}
                      defaultExpanded={true}
                      language="typescript"
                    />
                    
                    <div className="pt-4 border-t border-slate-800">
                      <p className="text-sm text-slate-400 mb-2">Final Understanding:</p>
                      <p className="text-emerald-300 text-sm italic">
                        "The potion is not a suggestion; it is a command to re-render the soul."
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}