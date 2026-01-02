import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import {
  Eye,
  Book,
  Terminal,
  AlertCircle,
  CheckCircle,
  XCircle,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
}

export default function ControlledComponents1984(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);

  const chapters: Chapter[] = [
    {
      title: "The Forbidden Diary",
      content: `The alcove in Winston Smith’s flat was a small victory. Tucked away from the telescreen's unblinking eye, it offered the illusion of privacy. In his hands, he held the diary—a book with pages so smooth they felt like a sin. This was his. Its state was his own. He wrote "DOWN WITH BIG BROTHER." The ink soaked into the paper, a permanent, physical change. The words appeared exactly as he formed them. There was no filter, no approval process. The thought in his head became ink on the page. The diary's state was a direct reflection of his input, and his alone. Later, the telescreen announced: "The chocolate ration has been increased to twenty grams!" A cold fury seized Winston. He knew it was thirty grams yesterday. He checked his diary: "chocolate ration cut to 30g." The diary held his truth. The Party broadcast another. The two were not in sync. This discrepancy was a bug in the system of reality itself.`,
    },
    {
      title: "The Lag of Truth",
      content: `In the Records Department, Winston's task was simple: rectify a historical figure. In his lap lay the diary, containing his secret notes. The official terminal had a simple input field. He typed "14500" from his diary. The numbers appeared in the input's private world. Just then, the Two Minutes Hate began. Distracted, he moved on, forgetting to press "Submit." The number sat in the input, but the Ministry's official record remained unchanged. An hour later, his supervisor pointed to a public summary screen. Winston's statistic still showed the old, incorrect figure. A hot flush of shame crept up his neck. His private input had never synchronized with the application's central state. "The diary held his words, but the Party held the truth. The two were not the same." A later submission on an older system was rejected with "UNFACT." The system only checked for truth after he had committed his change, forcing a painful correction.`,
    },
    {
      title: "The Party's Clarity",
      content: `A new, upgraded terminal was installed. Sleek, black, with a single pulsating green light. Winston's first task: correct the war narrative to "The enemy is Eastasia." Out of habit, he typed "Eurasia." He pressed 'E'. For a half-second, nothing. The green light flickered. Then, "Eastasia" appeared. He tried again. 'E', 'u', 'r'. Each keystroke vanished into an unseen process; only "Eastasia" was rendered. A cold realization: he was not typing directly onto the screen. Every keystroke was intercepted, validated, and only the approved result returned. The Thought Police were in his terminal. His next task: update bootlace production to a multiple of 1,000. He tried "8500". The '5' key was dead. He typed "9000". The numbers appeared instantly. This system was restrictive, but perfect. It was clear. "Control is not oppression; it is clarity. The Party's truth is the only truth."`,
    },
    {
      title: "Two Systems, One Truth",
      content: `Winston replayed the last two days. The old way: dusty cubicle, diary on lap. He types a number, gets distracted by the telescreen, moves on. Later, a klaxon sounds—public failure. Shame. Retrieving the rejected document was a walk of humiliation. Private state and Party state were at odds; the result was chaos. The new way: the black terminal hummed. A directive: "RECTIFY CHOCOLATE RATION TO 20 GRAMS." He typed '2'. It appeared. He tried '5' next. The key was dead. A message: "Input must match official records." The terminal was a guardian of truth. He typed '20', hit enter. "RECTIFICATION COMPLETE." Seamless, error-free, ten seconds. The comparison was stark. The diary was a pocket of personal truth, dangerously out of sync. The terminal was a pure conduit to the single, central truth. "One diary for secrets, one pad for the Party. One is chaos, the other is order."`,
    },
    {
      title: "Loving Big Brother's State",
      content: `Winston became a master. His work was now satisfaction, not anxiety. A complex task arrived: replace all mentions of a former ally with "enemy of the people," change dates, round production figures. His fingers flew. It felt like conducting a symphony of truth. As he typed an old name, it flickered into the correct phrase. Entering "47" paused, then resolved to "40." The terminal was an active partner, ensuring every character aligned with the Ministry's central state. No diary, no double-checking. Only one truth. He finished and looked up at the poster. Big Brother's gaze did not feel menacing. It felt validating. He had surrendered chaotic freedom for rigid, perfect clarity. In this controlled system, there were no bugs, no discrepancies. Only the pure, efficient rendering of the single source of truth. He loved Big Brother's single source of truth.`,
    },
  ];

  // Chapter 1: Uncontrolled Diary vs. Official Truth
  const [diaryEntry, setDiaryEntry] = useState<string>("DOWN WITH BIG BROTHER");
  const [officialTruth, setOfficialTruth] = useState<string>(
    "CHOCOLATE RATION: 20g",
  );
  const diaryInputRef = useRef<HTMLInputElement>(null);

  // Chapter 2: Uncontrolled Form Anti-Pattern
  const [uncontrolledInput, setUncontrolledInput] = useState<string>("");
  const [submittedValue, setSubmittedValue] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [failureCount, setFailureCount] = useState<number>(0);
  const uncontrolledInputRef = useRef<HTMLInputElement>(null);

  // Chapter 3: Controlled Input with Validation
  const [controlledInput, setControlledInput] = useState<string>("");
  const [bootlaceInput, setBootlaceInput] = useState<string>("8432");
  const [interceptedKeystrokes, setInterceptedKeystrokes] = useState<string[]>(
    [],
  );

  // Chapter 4: Comparison Mode
  const [comparisonMode, setComparisonMode] = useState<
    "uncontrolled" | "controlled"
  >("uncontrolled");
  const [comparisonInput, setComparisonInput] = useState<string>("");
  const [comparisonOfficial, setComparisonOfficial] = useState<string>("20");
  const [leakedListeners, setLeakedListeners] = useState<number>(0);
  const comparisonInputRef = useRef<HTMLInputElement>(null);

  // Chapter 5: Complex Controlled Form
  const [speechText, setSpeechText] = useState<string>(
    "Our ally Goldstein spoke at the rally on 4/4/83. Production was 47 units.",
  );
  const [rectifiedText, setRectifiedText] = useState<string>("");

  // Chapter-specific demo reset
  const resetChapterDemo = () => {
    if (chapter === 0) {
      setDiaryEntry("DOWN WITH BIG BROTHER");
      setOfficialTruth("CHOCOLATE RATION: 20g");
    } else if (chapter === 1) {
      setUncontrolledInput("");
      setSubmittedValue("");
      setValidationError("");
      setIsSubmitted(false);
      setFailureCount(0);
    } else if (chapter === 2) {
      setControlledInput("");
      setBootlaceInput("8432");
      setInterceptedKeystrokes([]);
    } else if (chapter === 3) {
      setComparisonInput("");
      setLeakedListeners(0);
      setComparisonMode("uncontrolled");
    } else if (chapter === 4) {
      setSpeechText(
        "Our ally Goldstein spoke at the rally on 4/4/83. Production was 47 units.",
      );
      setRectifiedText("");
    }
  };

  // Effect for Chapter 1: Demonstrating uncontrolled input
  useEffect(() => {
    if (chapter === 0 && diaryInputRef.current) {
      // Focus the diary input to show it's "active"
      diaryInputRef.current.focus();
    }
  }, [chapter]);

  // Effect for Chapter 2: Simulating distraction and sync failure
  useEffect(() => {
    if (chapter === 1 && uncontrolledInputRef.current) {
      uncontrolledInputRef.current.focus();
    }

    // Circuit breaker for failure count
    if (failureCount >= 5) {
      setValidationError(
        "CRITICAL FAILURE: Too many errors. Report to Room 101.",
      );
      const timer = setTimeout(() => {
        resetChapterDemo();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [chapter, failureCount]);

  // Effect for Chapter 4: Simulating event listener leaks in uncontrolled mode
  useEffect(() => {
    let mounted = true;

    if (
      chapter === 3 &&
      comparisonMode === "uncontrolled" &&
      comparisonInputRef.current
    ) {
      // Intentionally "leak" event listeners to demonstrate the problem
      const handleLeak = () => {
        if (mounted) {
          setLeakedListeners((prev) => prev + 1);
        }
      };

      const input = comparisonInputRef.current;
      input.addEventListener("input", handleLeak);
      input.addEventListener("change", handleLeak);
      input.addEventListener("blur", handleLeak);

      // Circuit breaker: auto-reset after 50 "leaked" listeners
      if (leakedListeners > 50) {
        resetChapterDemo();
      }

      return () => {
        mounted = false;
        input.removeEventListener("input", handleLeak);
        input.removeEventListener("change", handleLeak);
        input.removeEventListener("blur", handleLeak);
      };
    }
  }, [chapter, comparisonMode, leakedListeners]);

  // Chapter 2 Handlers
  const handleUncontrolledChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUncontrolledInput(e.target.value);
  };

  const handleUncontrolledSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setSubmittedValue(uncontrolledInput);

    // Simulate post-submission validation failure
    if (uncontrolledInput !== "14500") {
      setValidationError("UNFACT: Value does not match official records.");
      setFailureCount((prev) => prev + 1);
    } else {
      setValidationError("");
    }
  };

  // Chapter 3 Handlers
  const handleControlledChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Intercept and validate - only allow "Eastasia"
    if (value.toLowerCase().includes("eurasia")) {
      setInterceptedKeystrokes((prev) => [...prev, `Blocked: "${value}"`]);
      setControlledInput("Eastasia");
    } else {
      setControlledInput(value);
    }
  };

  const handleBootlaceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow multiples of 1000
    if (
      value === "" ||
      (Number.isInteger(Number(value)) && Number(value) % 1000 === 0)
    ) {
      setBootlaceInput(value);
    }
    // Otherwise, key is "dead" - no update
  };

  // Chapter 4 Handlers
  const handleComparisonInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (comparisonMode === "controlled") {
      // Controlled: validate against official truth
      if (value === comparisonOfficial || value === "") {
        setComparisonInput(value);
      }
    } else {
      // Uncontrolled: direct update
      setComparisonInput(value);
    }
  };

  const handleComparisonSubmit = () => {
    if (comparisonMode === "uncontrolled") {
      // Simulate sync failure
      if (comparisonInput !== comparisonOfficial) {
        setLeakedListeners((prev) => prev + 5); // Penalty for error
      }
    }
    // Controlled mode would auto-sync, no separate submit needed
  };

  // Chapter 5 Handler
  const rectifySpeech = () => {
    let result = speechText
      .replace(/Goldstein/g, "enemy of the people")
      .replace(/\d{1,2}\/\d{1,2}\/\d{2,4}/g, "4/4/84")
      .replace(/\b(\d{1,3})\b/g, (match) => {
        const num = parseInt(match);
        return Math.floor(num / 10) * 10 + "0";
      });
    setRectifiedText(result);
  };

  // Code Examples
  const uncontrolledCode = `// ❌ The Diary: Uncontrolled Component
function DiaryInput() {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    // Value exists only in the DOM
    const diaryValue = inputRef.current.value;
    // Must manually sync with application state
    setOfficialTruth(diaryValue);
  };

  return (
    <div>
      <input 
        ref={inputRef} 
        defaultValue="DOWN WITH BIG BROTHER" 
      />
      <button onClick={handleSubmit}>Submit Truth</button>
    </div>
  );
}`;

  const controlledCode = `// ✅ The Terminal: Controlled Component
function TerminalInput() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const input = e.target.value;
    // Thought Police intercept every keystroke
    if (input.includes("Eurasia")) {
      // Validate and transform
      setValue("Eastasia");
    } else {
      // Update central state
      setValue(input);
    }
  };

  return (
    <input 
      value={value}
      onChange={handleChange}
      // Display always reflects state
    />
  );
}`;

  const missingSyncCode = `// ❌ Data Desynchronization Bug
function MinistryForm() {
  const [officialRecord, setOfficialRecord] = useState("30g");
  const inputRef = useRef(null);

  const handleDistraction = () => {
    // User gets distracted by Two Minutes Hate...
    // Forgets to call handleSubmit()
    // inputRef.current.value = "20g" but officialRecord = "30g"
    // BUG: Two sources of truth are out of sync
  };

  return <input ref={inputRef} defaultValue="30g" />;
}`;

  const validationCode = `// ✅ Real-time Validation
function BootlaceInput() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    const num = parseInt(newValue);
    
    // Validate before updating state
    if (newValue === "" || (num % 1000 === 0)) {
      setValue(newValue); // Only multiples of 1000 allowed
    }
    // Otherwise, keystroke is ignored (dead key)
  };

  return <input value={value} onChange={handleChange} />;
}`;

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 p-4 font-serif text-slate-300 md:p-8">
      <header className="top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-3">
              <Eye className="h-6 w-6 text-red-500 md:h-8 md:w-8" />
              <h1 className="text-xl font-bold md:text-3xl">1984</h1>
            </div>
            <p className="text-xs text-slate-400 md:text-base">
              Fiction • Winston Smith • 1949
            </p>
          </div>
          <p className="text-sm font-medium text-red-500 md:text-lg">
            Forms and Controlled Components
          </p>
        </div>
      </header>

      <main className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Chapter Content */}
        <div className="lg:col-span-8">
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="mb-4 text-2xl font-bold text-slate-200 md:text-3xl">
              {currentChapter.title}
            </h2>
            <p className="leading-relaxed whitespace-pre-line text-slate-300">
              {currentChapter.content}
            </p>
          </div>

          {/* Chapter-specific Demo Area */}
          <div className="mt-8">
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Book className="h-5 w-5" /> The Forbidden Diary
                    (Uncontrolled)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Diary Entry (Your Truth)
                      </label>
                      <input
                        ref={diaryInputRef}
                        type="text"
                        className="w-full rounded border border-red-500/50 bg-slate-900 p-3 text-white"
                        value={diaryEntry}
                        onChange={(e) => setDiaryEntry(e.target.value)}
                        placeholder="Write your truth..."
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        This input maintains its own state. You type directly
                        into the DOM.
                      </p>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Telescreen Display (Official Truth)
                      </label>
                      <div className="rounded border border-green-500/30 bg-slate-900 p-3 font-mono">
                        {officialTruth}
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        The official state. Notice: it doesn't match the diary.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setOfficialTruth(
                          `CHOCOLATE RATION: ${Math.floor(Math.random() * 10) + 20}g`,
                        )
                      }
                      className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                    >
                      Simulate Party Announcement
                    </button>
                  </div>
                </div>

                <CodeBlock
                  code={uncontrolledCode}
                  variant="error"
                  title="// ❌ Uncontrolled Component Pattern"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <AlertCircle className="h-5 w-5" /> The Lag of Truth
                    (Anti-Pattern)
                  </h3>
                  <form
                    onSubmit={handleUncontrolledSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Rectify Agricultural Machines (Official: 14500)
                      </label>
                      <input
                        ref={uncontrolledInputRef}
                        type="text"
                        className="w-full rounded border border-red-500/50 bg-slate-900 p-3 text-white"
                        value={uncontrolledInput}
                        onChange={handleUncontrolledChange}
                        placeholder="Type the correct figure..."
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        This input maintains internal DOM state. Try typing
                        "14500" then getting "distracted."
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-30"
                      >
                        Submit Rectification
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setUncontrolledInput("");
                          setIsSubmitted(false);
                        }}
                        className="rounded bg-slate-700 px-4 py-2 text-white hover:bg-slate-600"
                      >
                        Simulate Distraction
                      </button>
                      <button
                        type="button"
                        onClick={resetChapterDemo}
                        className="rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
                      >
                        <RefreshCw className="mr-1 inline h-4 w-4" /> Reset
                      </button>
                    </div>

                    {isSubmitted && (
                      <div
                        className={`rounded p-4 ${validationError ? "border border-red-500/50 bg-red-950/40" : "border border-green-500/50 bg-green-950/40"}`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          {validationError ? (
                            <XCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                          <span className="font-medium">Submission Result</span>
                        </div>
                        <p>
                          You submitted:{" "}
                          <code className="rounded bg-slate-900 px-2 py-1 font-mono">
                            {submittedValue}
                          </code>
                        </p>
                        {validationError && (
                          <p className="mt-2 text-red-400">{validationError}</p>
                        )}
                        {!validationError && (
                          <p className="mt-2 text-green-400">
                            Rectification accepted. Big Brother is watching.
                          </p>
                        )}
                      </div>
                    )}

                    <div className="text-sm">
                      <p className="text-slate-400">
                        Failure Count:{" "}
                        <span className="font-mono text-red-400">
                          {failureCount}
                        </span>
                        /5
                      </p>
                      {failureCount >= 3 && (
                        <p className="mt-2 text-red-300">
                          ⚠️ Multiple errors detected. The Thought Police are
                          noticing.
                        </p>
                      )}
                    </div>
                  </form>
                </div>

                <CodeBlock
                  code={missingSyncCode}
                  variant="error"
                  title="// ❌ Data Desynchronization Bug"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-green-500/30 bg-green-950/20 p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Terminal className="h-5 w-5" /> The Party's Terminal
                    (Controlled)
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        War Narrative Correction (Type "Eurasia" or "Eastasia")
                      </label>
                      <input
                        type="text"
                        className="w-full rounded border border-green-500/50 bg-slate-900 p-3 text-white"
                        value={controlledInput}
                        onChange={handleControlledChange}
                        placeholder="The enemy is..."
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        Each keystroke is intercepted. Try typing "Eurasia" — it
                        becomes "Eastasia."
                      </p>
                      {interceptedKeystrokes.length > 0 && (
                        <div className="mt-3 rounded bg-slate-900/50 p-3 text-sm">
                          <p className="mb-1 font-medium">Interception Log:</p>
                          {interceptedKeystrokes.map((log, i) => (
                            <div
                              key={i}
                              className="font-mono text-xs text-green-300"
                            >
                              • {log}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Bootlace Production (Must be multiple of 1,000)
                      </label>
                      <input
                        type="number"
                        className="w-full rounded border border-green-500/50 bg-slate-900 p-3 text-white"
                        value={bootlaceInput}
                        onChange={handleBootlaceChange}
                        placeholder="8432"
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        Try typing 9500 — the '5' key is dead. Only 9000, 10000,
                        etc. are allowed.
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">
                          Real-time validation prevents errors
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={resetChapterDemo}
                      className="rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
                    >
                      <RefreshCw className="mr-1 inline h-4 w-4" /> Reset Demo
                    </button>
                  </div>
                </div>

                <CodeBlock
                  code={controlledCode}
                  variant="success"
                  title="// ✅ Controlled Component Pattern"
                  defaultExpanded={true}
                />
                <CodeBlock
                  code={validationCode}
                  variant="success"
                  title="// ✅ Real-time Validation"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <ToggleLeft className="h-5 w-5" /> Two Systems, One Truth
                  </h3>

                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-sm font-medium ${comparisonMode === "uncontrolled" ? "text-red-400" : "text-slate-400"}`}
                      >
                        Uncontrolled Diary
                      </span>
                      <button
                        onClick={() =>
                          setComparisonMode((prev) =>
                            prev === "uncontrolled"
                              ? "controlled"
                              : "uncontrolled",
                          )
                        }
                        className="relative h-7 w-14 rounded-full bg-slate-800"
                      >
                        <div
                          className={`absolute top-1 h-5 w-5 rounded-full transition-transform ${comparisonMode === "controlled" ? "translate-x-8 transform bg-green-500" : "translate-x-1 transform bg-red-500"}`}
                        />
                      </button>
                      <span
                        className={`text-sm font-medium ${comparisonMode === "controlled" ? "text-green-400" : "text-slate-400"}`}
                      >
                        Controlled Terminal
                      </span>
                    </div>
                    <button
                      onClick={resetChapterDemo}
                      className="rounded bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
                    >
                      <RefreshCw className="mr-1 inline h-4 w-4" /> Reset
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Left: The Input */}
                    <div
                      className={`rounded border p-4 ${comparisonMode === "uncontrolled" ? "border-red-500/50 bg-red-950/20" : "border-green-500/50 bg-green-950/20"}`}
                    >
                      <h4 className="mb-3 font-medium">
                        {comparisonMode === "uncontrolled"
                          ? "🖋️ Diary Input"
                          : "🖥️ Terminal Input"}
                      </h4>
                      <input
                        ref={comparisonInputRef}
                        type="text"
                        className="mb-3 w-full rounded border border-slate-700 bg-slate-900 p-3 text-white"
                        value={comparisonInput}
                        onChange={handleComparisonInputChange}
                        placeholder={
                          comparisonMode === "uncontrolled"
                            ? "Type anything..."
                            : "Must match '20'"
                        }
                      />
                      <button
                        onClick={handleComparisonSubmit}
                        className="w-full rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
                        disabled={comparisonMode === "controlled"}
                      >
                        {comparisonMode === "uncontrolled"
                          ? "Submit (Risk Error)"
                          : "Auto-submits"}
                      </button>
                    </div>

                    {/* Right: The Official Truth */}
                    <div className="rounded border border-blue-500/30 bg-blue-950/20 p-4">
                      <h4 className="mb-3 font-medium">
                        📺 Telescreen (Official: 20)
                      </h4>
                      <div className="rounded bg-slate-900 p-4 text-center font-mono text-lg">
                        {comparisonMode === "controlled" &&
                        comparisonInput !== "" &&
                        comparisonInput !== "20"
                          ? "20" // Controlled always shows official truth
                          : comparisonInput || "20"}
                      </div>
                      <div className="mt-4 space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          {comparisonMode === "uncontrolled" ? (
                            <>
                              <XCircle className="h-4 w-4 text-red-400" />
                              <span>Input and display can differ</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-400" />
                              <span>Input forced to match display</span>
                            </>
                          )}
                        </p>
                        <p className="text-slate-400">
                          {comparisonMode === "uncontrolled"
                            ? "Leaked listeners: " + leakedListeners
                            : "No leaks - proper cleanup"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <CodeBlock
                    code={uncontrolledCode}
                    variant="error"
                    title="// ❌ Chaos: Uncontrolled"
                    defaultExpanded={false}
                  />
                  <CodeBlock
                    code={controlledCode}
                    variant="success"
                    title="// ✅ Order: Controlled"
                    defaultExpanded={false}
                  />
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-lg border border-green-500/30 bg-green-950/20 p-6">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <Terminal className="h-5 w-5" /> Ministry Rectification
                    Terminal
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Original Speech (Contains Errors)
                      </label>
                      <textarea
                        className="h-40 w-full rounded border border-slate-700 bg-slate-900 p-3 font-mono text-sm text-white"
                        value={speechText}
                        onChange={(e) => setSpeechText(e.target.value)}
                        spellCheck="false"
                      />
                      <p className="mt-1 text-xs text-slate-400">
                        Contains: "Goldstein" (must become "enemy of the
                        people"), wrong date, unrounded number.
                      </p>
                    </div>

                    <button
                      onClick={rectifySpeech}
                      className="flex items-center justify-center gap-2 rounded bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
                    >
                      <CheckCircle className="h-5 w-5" /> Execute Rectification
                    </button>

                    {rectifiedText && (
                      <div>
                        <label className="mb-2 block text-sm font-medium">
                          Rectified Speech (Party Truth)
                        </label>
                        <div className="rounded border border-green-500/50 bg-slate-900 p-4 font-mono text-sm whitespace-pre-wrap">
                          {rectifiedText}
                        </div>
                        <div className="mt-3 rounded bg-green-950/30 p-3">
                          <p className="flex items-center gap-2 text-sm text-green-400">
                            <CheckCircle className="h-4 w-4" />
                            All transformations applied automatically through
                            controlled state.
                          </p>
                          <ul className="mt-2 space-y-1 text-xs text-slate-300">
                            <li>• "Goldstein" → "enemy of the people"</li>
                            <li>• Date normalized to 4/4/84</li>
                            <li>• "47" rounded down to "40"</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={resetChapterDemo}
                      className="rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
                    >
                      <RefreshCw className="mr-1 inline h-4 w-4" /> Reset
                    </button>
                  </div>
                </div>

                <div className="rounded border border-slate-700 bg-slate-900/50 p-4">
                  <h4 className="mb-3 font-medium text-green-400">
                    ✓ Mastery Achieved
                  </h4>
                  <p className="text-sm text-slate-300">
                    With controlled components, the terminal ensures every
                    character aligns with the single source of truth. No manual
                    syncing, no post-submission errors, no conflicting
                    realities. The application state and the UI are always in
                    harmony.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sticky Concept Panel */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5 backdrop-blur-sm">
              <h3 className="mb-3 flex items-center gap-2 text-lg font-bold">
                <Eye className="h-5 w-5 text-red-500" /> Ministry Directive
              </h3>
              <div className="space-y-3 text-sm">
                <div className="rounded border border-red-500/20 bg-red-950/30 p-3">
                  <p className="font-medium text-red-300">
                    Uncontrolled Component
                  </p>
                  <p className="mt-1 text-slate-300">
                    Like Winston's diary. Maintains its own state in the DOM.
                    Leads to desynchronization.
                  </p>
                </div>
                <div className="rounded border border-green-500/20 bg-green-950/30 p-3">
                  <p className="font-medium text-green-300">
                    Controlled Component
                  </p>
                  <p className="mt-1 text-slate-300">
                    Like the Party's terminal. Value driven by React state via{" "}
                    <code className="font-mono">value</code> prop.
                  </p>
                </div>
                <div className="rounded border border-blue-500/20 bg-blue-950/30 p-3">
                  <p className="font-medium text-blue-300">onChange Handler</p>
                  <p className="mt-1 text-slate-300">
                    The Thought Police. Intercepts every keystroke to update
                    central state.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-bold">Chapter Progress</h3>
              <div className="space-y-2">
                {chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChapter(idx)}
                    className={`w-full rounded p-3 text-left transition-all ${chapter === idx ? "border border-red-500/50 bg-red-950/40" : "hover:bg-slate-800/50"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-medium ${chapter === idx ? "text-red-300" : "text-slate-300"}`}
                      >
                        {ch.title}
                      </span>
                      {chapter === idx && (
                        <div className="h-2 w-2 animate-pulse rounded-full bg-red-500"></div>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">
                      {idx === 0 && "Uncontrolled inputs"}
                      {idx === 1 && "Desynchronization bugs"}
                      {idx === 2 && "Controlled pattern"}
                      {idx === 3 && "Comparison"}
                      {idx === 4 && "Mastery"}
                    </p>
                  </button>
                ))}
              </div>
              <div className="mt-4 border-t border-slate-700 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="font-mono">
                    {chapter + 1}/{chapters.length}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-red-500 transition-all duration-500"
                    style={{
                      width: `${((chapter + 1) / chapters.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900/70 p-5 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-bold">Quick Reference</h3>
              <CodeBlock
                code={`// Controlled Component Pattern
const [value, setValue] = useState('');

const handleChange = (e) => {
  // Validate/transform input here
  const newValue = e.target.value;
  if (isValid(newValue)) {
    setValue(newValue); // Update central state
  }
};

return (
  <input
    value={value}         // Telescreen display
    onChange={handleChange} // Thought Police
  />
);`}
                variant="default"
                title="// Core Pattern"
                language="jsx"
                defaultExpanded={false}
                collapsible={true}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Navigation */}
      <nav className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-slate-800 pt-6">
        <button
          onClick={() => setChapter(Math.max(0, chapter - 1))}
          disabled={chapter === 0}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Previous Chapter
        </button>

        <div className="text-center">
          <div className="font-mono text-sm text-slate-400">
            Chapter <span className="text-lg text-white">{chapter + 1}</span> of{" "}
            {chapters.length}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {chapter === 0 && "The Forbidden Diary"}
            {chapter === 1 && "The Lag of Truth"}
            {chapter === 2 && "The Party's Clarity"}
            {chapter === 3 && "Two Systems, One Truth"}
            {chapter === 4 && "Loving Big Brother's State"}
          </div>
        </div>

        <button
          onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
          disabled={chapter === chapters.length - 1}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next Chapter
        </button>
      </nav>
    </div>
  );
}
