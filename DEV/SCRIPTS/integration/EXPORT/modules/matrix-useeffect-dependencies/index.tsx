import { useState, useEffect, useCallback, useMemo } from "react";
import { Zap, AlertTriangle, CheckCircle, Code } from "lucide-react";

export default function MatrixUseEffectDependencies() {
  const [chapter, setChapter] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  // Chapter 1 state: Dependency selector
  const [watchedDeps, setWatchedDeps] = useState({
    spoon: false,
    apple: false,
    rabbit: false,
  });
  const [depEffectCount, setDepEffectCount] = useState(0);

  // Chapter 2 state: Watch everything
  const [watchEverything, setWatchEverything] = useState(false);
  const [agentCount, setAgentCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // Chapter 3 state: Déjà vu
  const [buildingLayout, setBuildingLayout] = useState("original");
  const [glitchLog, setGlitchLog] = useState<string[]>([]);
  const [catVisible, setCatVisible] = useState(false);

  // Chapter 4 state: Upload
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Chapter 5 state: Belief
  const [belief, setBelief] = useState(0);
  const [jumpAttempted, setJumpAttempted] = useState(false);

  const chapters = [
    {
      id: "intro",
      title: "There Is No Spoon",
      content: `Neo sits in the white void of the construct, a simple room with a single chair and a table. On the table: a spoon. Morpheus stands behind him, hands clasped.

"Do you believe you're watching the spoon?" Morpheus asks.

Neo stares at it. The spoon is there. Solid. Real. "Yes."

"Then you'll never see it change."

Morpheus waves his hand. The spoon bends, straightens, disappears, reappears. Neo blinks. He saw nothing. The spoon looks exactly as it did before.

"I don't understand," Neo says.

"You're not watching the spoon, Neo. You're watching *everything*. The chair. The walls. The light. Me. When you watch everything, you see nothing. When the spoon changes, your mind is too busy processing the static to notice the signal."

Morpheus leans forward. "In the Matrix, you are a function. You execute when reality changes. But you must tell the system *what part of reality you care about*. Otherwise, you'll run on every flicker of every pixel, and the system will collapse under the weight of your attention."

Neo looks at the spoon again. "So I need to... choose?"

"You need to **declare your dependencies**."`,
    },
    {
      id: "build",
      title: "The Woman in the Red Dress",
      content: `"This is the training simulation," Mouse says, grinning as the program loads. "I designed her myself."

The Matrix materializes around Neo: a crowded street, hundreds of people in business attire walking past. And there, in the middle of the crowd, a woman in a red dress.

"Watch her," Mouse instructs.

Neo watches. But he also watches the man in the gray suit. And the woman with the briefcase. And the traffic light changing. And the reflection in the window. And the pigeon on the sidewalk. And the cloud passing overhead.

His head begins to pound.

"Neo," Morpheus's voice cuts through. "What are you doing?"

"I'm watching," Neo gasps. "I'm watching everything. Every person. Every movement. I need to see it all, right? To be ready?"

"Turn around," Morpheus commands.

Neo turns. Agent Smith stands where the woman in the red dress was, gun pointed at Neo's head.

The simulation freezes.

"You died," Morpheus says flatly, "because you were watching everything."`,
    },
    {
      id: "climax",
      title: "Déjà Vu",
      content: `They're moving through the building, heading for the exit. Neo sees it first.

A black cat walks past the doorway. Then, a moment later, the same black cat walks past again. Same movement. Same posture. Identical.

"Déjà vu," Neo whispers.

Trinity freezes. "What did you just say?"

"I saw a cat. Then I saw the same cat again. Like... like it repeated."

The team stops. Morpheus's face goes dark. "How much like it?"

"Exactly like it. Every detail."

Trinity's hand moves to her gun. "A déjà vu is usually a glitch in the Matrix. It happens when they change something."

Neo's dependency array just detected a change.`,
    },
    {
      id: "resolution",
      title: "I Know Kung Fu",
      content: `Neo is back in the construct. The chair. The white void. But this time, his eyes are closed.

"Load the program," Morpheus says.

Tank's fingers fly across the keyboard. "Initiating combat training upload."

Neo sits perfectly still. Not watching the room. Not watching Morpheus. Not watching anything external. He's waiting for one specific signal: the upload completion.

The upload completes. Neo's eyes snap open.

"I know kung fu."

Morpheus smiles. "Show me."

This is the empty dependency array pattern. Neo's effect ran once when the component mounted, and never again. The kung fu knowledge doesn't need to update. It's stable. Permanent.`,
    },
    {
      id: "summary",
      title: "Free Your Mind",
      content: `The rooftop. The impossible jump. Morpheus has just made it across. Now it's Neo's turn.

"What if I fall?" Neo asks.

"Then you'll know you were watching the wrong things."

Neo looks at the gap. Fifteen feet of empty air. In the Matrix, this should be impossible. But Neo understands now: it's not about the jump. It's about what he's watching.

Three versions of Neo stand at the edge. One watches everything and falls paralyzed. One watches nothing and falls blind. One watches his belief—just that—and when it changes, he jumps.

There is no spoon. But there *is* a dependency array.

And now, you know kung fu.`,
    },
  ];

  const currentChapter = chapters[chapter];

  // Chapter 1 effect: Demonstrate dependency array
  useEffect(() => {
    if (chapter === 0 && (watchedDeps.spoon || watchedDeps.apple || watchedDeps.rabbit)) {
      setDepEffectCount((c) => c + 1);
    }
  }, [watchedDeps.spoon, watchedDeps.apple, watchedDeps.rabbit, chapter]);

  // Chapter 2 effect: Demonstrate no dependency array (controlled)
  useEffect(() => {
    if (chapter === 1 && watchEverything) {
      setRenderCount((c) => c + 1);
      const timer = setTimeout(() => {
        setAgentCount((a) => Math.min(a + 1, 20));
      }, 100);
      return () => clearTimeout(timer);
    }
  });

  // Chapter 3 effect: Demonstrate specific dependency
  useEffect(() => {
    if (chapter === 2) {
      const timestamp = new Date().toLocaleTimeString();
      setGlitchLog((log) => [
        ...log.slice(-4),
        `[${timestamp}] Building layout changed to: ${buildingLayout}`,
      ]);
      setGlitchActive(true);
      setCatVisible(true);
      const timer = setTimeout(() => {
        setGlitchActive(false);
        setCatVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [buildingLayout, chapter]);

  // Chapter 4 effect: Demonstrate empty dependency array
  useEffect(() => {
    if (chapter === 3 && uploadProgress > 0 && uploadProgress < 100) {
      const timer = setTimeout(() => {
        setUploadProgress((p) => Math.min(p + 10, 100));
      }, 200);
      return () => clearTimeout(timer);
    }
    if (uploadProgress === 100 && !uploadComplete) {
      setUploadComplete(true);
    }
  }, [uploadProgress, uploadComplete, chapter]);

  // Chapter 5 effect: Demonstrate belief-based dependency
  useEffect(() => {
    if (chapter === 4 && belief >= 80 && !jumpAttempted) {
      setJumpAttempted(true);
    }
  }, [belief, chapter, jumpAttempted]);

  const handlePrevChapter = useCallback(() => {
    if (chapter > 0) {
      setChapter((c) => c - 1);
    }
  }, [chapter]);

  const handleNextChapter = useCallback(() => {
    if (chapter < chapters.length - 1) {
      setChapter((c) => c + 1);
    }
  }, [chapter, chapters.length]);

  const toggleDependency = useCallback((dep: keyof typeof watchedDeps) => {
    setWatchedDeps((prev) => ({ ...prev, [dep]: !prev[dep] }));
  }, []);

  const changeBuildingLayout = useCallback(() => {
    setBuildingLayout((prev) =>
      prev === "original" ? "trap" : prev === "trap" ? "sealed" : "original"
    );
  }, []);

  const startUpload = useCallback(() => {
    if (uploadProgress === 0) {
      setUploadProgress(10);
    }
  }, [uploadProgress]);

  const resetChapter2 = useCallback(() => {
    setWatchEverything(false);
    setAgentCount(0);
    setRenderCount(0);
  }, []);

  const agentSmithIcons = useMemo(() => {
    return Array.from({ length: agentCount }, (_, i) => i);
  }, [agentCount]);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono relative overflow-hidden">
      {/* Matrix rain effect */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="matrix-rain" />
      </div>

      {/* Glitch overlay */}
      {glitchActive && (
        <div className="fixed inset-0 bg-green-500 opacity-20 pointer-events-none animate-pulse z-50" />
      )}

      {/* Header */}
      <header className="relative z-10 p-6 md:p-8 border-b border-green-500/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              THE MATRIX
            </h1>
          </div>
          <p className="text-lg md:text-xl text-green-300 opacity-80">
            useEffect Dependency Array
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
            <Code className="w-4 h-4" />
            <span>Neo's Guide to Watching the Matrix</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-green-400 mb-2">
            {currentChapter.title}
          </h2>
          <div className="h-1 w-24 bg-green-500" />
        </div>

        {/* Chapter Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Narrative */}
          <div className="space-y-4">
            <div className="bg-gray-950 border border-green-500/30 rounded-lg p-6">
              <div className="prose prose-invert prose-green max-w-none">
                {currentChapter.content.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-green-300 leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="space-y-4">
            {chapter === 0 && (
              <div className="bg-gray-950 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  The Construct: Choose Your Dependencies
                </h3>
                <div className="space-y-4">
                  <div className="space-y-3">
                    {(["spoon", "apple", "rabbit"] as const).map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={watchedDeps[item]}
                          onChange={() => toggleDependency(item)}
                          className="w-5 h-5 accent-green-500"
                        />
                        <span
                          className={`text-lg capitalize transition-all ${
                            watchedDeps[item]
                              ? "text-green-400 font-bold"
                              : "text-green-600"
                          }`}
                        >
                          {item}
                        </span>
                        {watchedDeps[item] && (
                          <span className="text-xs text-green-500 animate-pulse">
                            [watching]
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-black/50 border border-green-500/50 rounded">
                    <div className="text-sm text-green-400 mb-2">Effect Executions:</div>
                    <div className="text-3xl font-bold text-green-500">
                      {depEffectCount}
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-950/20 border border-green-500/30 rounded text-xs">
                    <code className="text-green-400">
                      useEffect(() =&gt; &#123;{"\n"}
                      {"  "}// Neo's awareness executes{"\n"}
                      &#125;, [{watchedDeps.spoon && "spoon"}
                      {watchedDeps.spoon && watchedDeps.apple && ", "}
                      {watchedDeps.apple && "apple"}
                      {(watchedDeps.spoon || watchedDeps.apple) &&
                        watchedDeps.rabbit &&
                        ", "}
                      {watchedDeps.rabbit && "rabbit"}]);
                    </code>
                  </div>
                </div>
              </div>
            )}

            {chapter === 1 && (
              <div className="bg-gray-950 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  Training Simulation: Watch Everything
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={watchEverything}
                      onChange={(e) => setWatchEverything(e.target.checked)}
                      className="w-5 h-5 accent-red-500"
                    />
                    <span className="text-lg text-green-300">
                      Watch Everything (No Dependency Array)
                    </span>
                  </label>

                  {watchEverything && (
                    <div className="p-4 bg-red-950/30 border border-red-500/50 rounded">
                      <div className="text-sm text-red-400 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        SYSTEM OVERLOAD
                      </div>
                      <div className="text-2xl font-bold text-red-500 mb-2">
                        Render Count: {renderCount}
                      </div>
                      <div className="text-sm text-red-400">
                        Agents Deployed: {agentCount}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-5 gap-2 min-h-[120px]">
                    {agentSmithIcons.map((i) => (
                      <div
                        key={i}
                        className="w-full aspect-square bg-gray-900 border border-red-500/50 rounded flex items-center justify-center text-2xl animate-pulse"
                      >
                        👤
                      </div>
                    ))}
                  </div>

                  {watchEverything && (
                    <button
                      onClick={resetChapter2}
                      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-black font-bold rounded transition-colors"
                    >
                      Reset Simulation
                    </button>
                  )}

                  <div className="mt-4 p-3 bg-red-950/20 border border-red-500/30 rounded text-xs">
                    <code className="text-red-400">
                      useEffect(() =&gt; &#123;{"\n"}
                      {"  "}// Runs on EVERY render{"\n"}
                      {"  "}// Performance death{"\n"}
                      &#125;); // No dependency array = chaos
                    </code>
                  </div>
                </div>
              </div>
            )}

            {chapter === 2 && (
              <div className="bg-gray-950 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Glitch Detector: Déjà Vu
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={changeBuildingLayout}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-black font-bold rounded transition-colors"
                  >
                    Change Building Layout
                  </button>

                  <div className="p-4 bg-black/50 border border-green-500/50 rounded">
                    <div className="text-sm text-green-400 mb-2">
                      Current Layout:
                    </div>
                    <div className="text-2xl font-bold text-green-500 uppercase">
                      {buildingLayout}
                    </div>
                  </div>

                  {catVisible && (
                    <div className="relative h-24 bg-gray-900 border border-green-500/50 rounded overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                        <span className="text-6xl">🐈</span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-50 animate-pulse delay-500">
                        <span className="text-6xl">🐈</span>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-black/70 border border-green-500/30 rounded font-mono text-xs space-y-1 max-h-32 overflow-y-auto">
                    {glitchLog.map((log, i) => (
                      <div key={i} className="text-green-400">
                        {log}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-green-950/20 border border-green-500/30 rounded text-xs">
                    <code className="text-green-400">
                      useEffect(() =&gt; &#123;{"\n"}
                      {"  "}// Runs when buildingLayout changes{"\n"}
                      {"  "}detectGlitch();{"\n"}
                      &#125;, [buildingLayout]);
                    </code>
                  </div>
                </div>
              </div>
            )}

            {chapter === 3 && (
              <div className="bg-gray-950 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Combat Training Upload
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={startUpload}
                    disabled={uploadProgress > 0}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold rounded transition-colors"
                  >
                    {uploadProgress === 0
                      ? "Load Program"
                      : uploadComplete
                      ? "Upload Complete"
                      : "Uploading..."}
                  </button>

                  {uploadProgress > 0 && (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all duration-200"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <div className="text-center text-green-400 text-sm">
                        {uploadProgress}%
                      </div>
                    </div>
                  )}

                  {uploadComplete && (
                    <div className="p-4 bg-green-950/30 border border-green-500/50 rounded text-center">
                      <div className="text-2xl font-bold text-green-400 mb-2">
                        I know kung fu.
                      </div>
                      <div className="text-sm text-green-500">
                        Effect ran once on mount
                      </div>
                    </div>
                  )}

                  <div className="mt-4 p-3 bg-green-950/20 border border-green-500/30 rounded text-xs">
                    <code className="text-green-400">
                      useEffect(() =&gt; &#123;{"\n"}
                      {"  "}// Runs once on mount{"\n"}
                      {"  "}loadKungFu();{"\n"}
                      &#125;, []); // Empty array
                    </code>
                  </div>

                  <div className="mt-6 space-y-2 text-xs">
                    <div className="p-2 bg-black/50 border border-green-500/30 rounded">
                      <div className="text-green-400 font-bold mb-1">
                        ✓ Empty Array []
                      </div>
                      <div className="text-green-600">
                        Runs once on mount, never again
                      </div>
                    </div>
                    <div className="p-2 bg-black/50 border border-red-500/30 rounded">
                      <div className="text-red-400 font-bold mb-1">✗ No Array</div>
                      <div className="text-red-600">Runs on every render</div>
                    </div>
                    <div className="p-2 bg-black/50 border border-green-500/30 rounded">
                      <div className="text-green-400 font-bold mb-1">
                        ✓ [dependency]
                      </div>
                      <div className="text-green-600">
                        Runs when dependency changes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="bg-gray-950 border border-green-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  The Rooftop Jump: Free Your Mind
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-green-400 mb-2">
                      Neo's Belief: {belief}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={belief}
                      onChange={(e) => setBelief(Number(e.target.value))}
                      className="w-full accent-green-500"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div
                      className={`p-3 border rounded ${
                        belief < 80
                          ? "border-red-500/50 bg-red-950/20"
                          : "border-gray-700 bg-gray-900"
                      }`}
                    >
                      <div className="text-2xl mb-1">🧍</div>
                      <div className="text-red-400 font-bold">Watch All</div>
                      <div className="text-red-600">Paralyzed</div>
                    </div>
                    <div
                      className={`p-3 border rounded ${
                        belief < 80
                          ? "border-red-500/50 bg-red-950/20"
                          : "border-gray-700 bg-gray-900"
                      }`}
                    >
                      <div className="text-2xl mb-1">🧍</div>
                      <div className="text-red-400 font-bold">Watch None</div>
                      <div className="text-red-600">Blind</div>
                    </div>
                    <div
                      className={`p-3 border rounded ${
                        belief >= 80
                          ? "border-green-500/50 bg-green-950/20"
                          : "border-gray-700 bg-gray-900"
                      }`}
                    >
                      <div className="text-2xl mb-1">
                        {jumpAttempted ? "🦸" : "🧍"}
                      </div>
                      <div className="text-green-400 font-bold">Watch Belief</div>
                      <div className="text-green-600">
                        {jumpAttempted ? "Jumps!" : "Ready"}
                      </div>
                    </div>
                  </div>

                  {jumpAttempted && (
                    <div className="p-4 bg-green-950/30 border border-green-500/50 rounded text-center animate-pulse">
                      <div className="text-xl font-bold text-green-400">
                        Neo makes the jump!
                      </div>
                      <div className="text-sm text-green-500 mt-1">
                        Effect triggered when belief crossed threshold
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-black/50 border border-red-500/30 rounded">
                      <code className="text-red-400">
                        useEffect(() =&gt; &#123; jump(); &#125;); // No deps = chaos
                      </code>
                    </div>
                    <div className="p-2 bg-black/50 border border-red-500/30 rounded">
                      <code className="text-red-400">
                        useEffect(() =&gt; &#123; jump(); &#125;, []); // Empty = blind
                      </code>
                    </div>
                    <div className="p-2 bg-black/50 border border-green-500/30 rounded">
                      <code className="text-green-400">
                        useEffect(() =&gt; &#123; if (belief) jump(); &#125;,
                        [belief]);
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-green-500/30 p-4 z-20">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button
            onClick={handlePrevChapter}
            disabled={chapter === 0}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-black font-bold rounded transition-colors"
          >
            Previous
          </button>

          <div className="text-center">
            <div className="text-sm text-green-400">
              Chapter {chapter + 1} of {chapters.length}
            </div>
            <div className="text-xs text-green-600 mt-1">
              {currentChapter.title}
            </div>
          </div>

          <button
            onClick={handleNextChapter}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-black font-bold rounded transition-colors"
          >
            Next
          </button>
        </div>
      </footer>

      <style>{`
        .matrix-rain {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 255, 0, 0.05) 50%,
            transparent 100%
          );
          background-size: 100% 200%;
          animation: rain 20s linear infinite;
          height: 100%;
        }
        
        @keyframes rain {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 0% 200%;
          }
        }
      `}</style>
    </div>
  );
}