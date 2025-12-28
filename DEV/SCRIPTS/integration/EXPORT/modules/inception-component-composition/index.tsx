import { useState, useCallback, useMemo, useEffect } from "react";
import { Layers, ChevronLeft, ChevronRight, Check, X, Zap } from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function InceptionComposition() {
  const [chapter, setChapter] = useState(0);
  const [nestedLayers, setNestedLayers] = useState({
    van: true,
    hotel: true,
    fortress: true,
  });
  const [propsPassed, setPropsPassed] = useState({
    vanToHotel: true,
    hotelToFortress: true,
  });
  const [kickTriggered, setKickTriggered] = useState(false);
  const [kickTimeline, setKickTimeline] = useState<number[]>([]);

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "The Architecture of Dreams",
        content: `"You're waiting for a train," Cobb says, his voice steady in the warehouse's dim light. Ariadne watches as he sketches on the glass table, drawing boxes within boxes within boxes. "A train that will take you far away. You know where you hope this train will take you, but you can't be sure."

He taps the outermost box. "This is the first level—the van. Simple. Straightforward. But here's what makes it powerful." His finger moves to a smaller box nested inside. "Inside the van, we build another dream. The hotel. And inside the hotel..." Another box, smaller still. "The snow fortress."

Ariadne leans forward, studying the nested architecture. "But how do they connect? How does someone in the fortress know what's happening in the van?"

Cobb smiles. "That's the art of it. Each level is self-contained, but it must be *aware* of the levels around it. The van doesn't need to know the details of the fortress—it just provides the space for the hotel to exist. And the hotel provides the space for the fortress."`,
      },
      {
        id: "build",
        title: "The Descent",
        content: `The team sits around the table in the warehouse, the plan laid out before them. Arthur points to the timeline, his finger tracing the synchronized sequence.

"Ten hours on the plane. One week in the van. Six months in the hotel. Ten years in the snow fortress." He looks at each of them. "The kick has to propagate through all three levels. If we miss the timing at any level, we're stuck."

Eames leans back in his chair. "So the van hits the water, which triggers the kick in the hotel, which triggers the kick in the fortress. Simple enough."

"Not simple," Arthur corrects. "Each level has to *know* about the kick. The van has to tell the hotel when it's coming. The hotel has to tell the fortress. If any level doesn't pass the signal down, the chain breaks."`,
      },
      {
        id: "climax",
        title: "Limbo",
        content: `The fortress is collapsing. Fischer is down. Saito is bleeding out. And Cobb realizes with cold horror that they've lost the thread.

"Where's the kick?" Ariadne shouts over the gunfire. "Arthur, where's the kick?"

But Arthur is floating in zero gravity in the hotel, the elevator shaft spinning around him. The van has already hit the water. The kick signal should have propagated down, but something is wrong. The hotel level didn't receive it correctly. The timing is off.

In the snow fortress, Cobb and Ariadne stare at each other. They're three levels deep, and the kick isn't coming. The van has already sunk. The hotel is in freefall. But the fortress—the deepest component—never received the signal.

"We're stuck," Cobb says quietly. "We're in limbo."`,
      },
      {
        id: "resolution",
        title: "The Synchronized Kick",
        content: `"Again," Cobb says. "From the top."

They're back in the warehouse, the plan spread out before them. But this time, they're not taking chances. This time, they're building the composition correctly.

Arthur draws the component tree on the glass. "Van receives the kick callback from the root—from reality, from the plane. Van passes it to Hotel. Hotel passes it to Fortress. Every level explicitly receives the callback as a prop."

The team runs through the sequence one more time. Van to hotel. Hotel to fortress. Each level receiving its props. Each level passing callbacks down. Each level executing its logic at the right time.

"This is it," Cobb says. "This is how we build complex applications from simple components. We compose them. We nest them. We pass data and callbacks down explicitly. And we trust that each component will do its job."`,
      },
      {
        id: "summary",
        title: "Waking Up",
        content: `The plane touches down in Los Angeles. Cobb opens his eyes, the dream fading. Around him, the team is waking up—Arthur, Ariadne, Eames, Yusuf. Fischer blinks in confusion. Saito smiles knowingly.

The mission is complete. The composition held.

Component composition is the foundation of React architecture. It's how you build complex UIs from simple, reusable pieces. It's how you create maintainable applications that scale.

The key principles are clear: Components are containers. Props must be passed explicitly. Each component does one thing well. Callbacks propagate through the tree. Broken composition leads to limbo.

The dream is over. The lesson remains. Welcome back to reality.`,
      },
    ],
    []
  );

  const currentChapter = chapters[chapter];
  const canGoNext = chapter < chapters.length - 1;
  const canGoPrevious = chapter > 0;

  const handleNext = useCallback(() => {
    if (canGoNext) {
      setChapter((c) => c + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [canGoNext]);

  const handlePrevious = useCallback(() => {
    if (canGoPrevious) {
      setChapter((c) => c - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [canGoPrevious]);

  const toggleLayer = useCallback((layer: keyof typeof nestedLayers) => {
    setNestedLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  }, []);

  const toggleProp = useCallback((prop: keyof typeof propsPassed) => {
    setPropsPassed((prev) => ({ ...prev, [prop]: !prev[prop] }));
  }, []);

  const triggerKick = useCallback(() => {
    setKickTriggered(true);
    setKickTimeline([]);

    const timeline = [0, 1000, 1500, 2000];
    timeline.forEach((delay, index) => {
      setTimeout(() => {
        setKickTimeline((prev) => [...prev, index]);
      }, delay);
    });

    setTimeout(() => {
      setKickTriggered(false);
      setKickTimeline([]);
    }, 3000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && canGoNext) handleNext();
      if (e.key === "ArrowLeft" && canGoPrevious) handlePrevious();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canGoNext, canGoPrevious, handleNext, handlePrevious]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-100">
              Inception
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Component Composition & Children Props
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 pb-32">
        {/* Chapter Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-blue-400 mb-2">
            <span>Chapter {chapter + 1} of {chapters.length}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
            {currentChapter.title}
          </h2>
        </div>

        {/* Chapter Content */}
        <div className="prose prose-invert prose-slate max-w-none mb-12">
          {currentChapter.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="text-lg leading-relaxed mb-4 text-slate-300">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Interactive Demonstrations */}
        {chapter === 0 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              Nested Component Visualizer
            </h3>
            <p className="text-slate-400 mb-6">
              Click each layer to toggle visibility. Notice how components nest inside each other.
            </p>

            <div className="space-y-4">
              {/* Van Layer */}
              <div
                className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                  nestedLayers.van
                    ? "border-blue-500/50 bg-blue-500/5"
                    : "border-slate-700 bg-slate-800/30 opacity-50"
                }`}
                onClick={() => toggleLayer("van")}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-sm text-blue-400">
                    {"<Van>"}
                  </span>
                  <span className="text-xs text-slate-500">Level 1</span>
                </div>

                {nestedLayers.van && (
                  <div className="ml-6 space-y-4">
                    {/* Hotel Layer */}
                    <div
                      className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                        nestedLayers.hotel
                          ? "border-blue-400/50 bg-blue-400/5"
                          : "border-slate-700 bg-slate-800/30 opacity-50"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLayer("hotel");
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-sm text-blue-300">
                          {"<Hotel>"}
                        </span>
                        <span className="text-xs text-slate-500">Level 2</span>
                      </div>

                      {nestedLayers.hotel && (
                        <div className="ml-6">
                          {/* Fortress Layer */}
                          <div
                            className={`border-2 rounded-lg p-6 transition-all cursor-pointer ${
                              nestedLayers.fortress
                                ? "border-blue-300/50 bg-blue-300/5"
                                : "border-slate-700 bg-slate-800/30 opacity-50"
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLayer("fortress");
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-sm text-blue-200">
                                {"<Fortress />"}
                              </span>
                              <span className="text-xs text-slate-500">
                                Level 3
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <span className="font-mono text-sm text-blue-300 block mt-4">
                        {"</Hotel>"}
                      </span>
                    </div>
                  </div>
                )}

                <span className="font-mono text-sm text-blue-400 block mt-4">
                  {"</Van>"}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded border border-slate-700">
              <p className="text-sm text-slate-400">
                <strong className="text-slate-300">Key Concept:</strong> Each
                component can contain other components through the{" "}
                <code className="text-blue-400 font-mono">children</code> prop.
                The parent doesn't need to know what's inside—it just provides
                the structure.
              </p>
            </div>
          </div>
        )}

        {chapter === 1 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              Prop Drilling Simulator
            </h3>
            <p className="text-slate-400 mb-6">
              Toggle whether each level passes the "kick" callback to its
              children. Watch what happens when the chain breaks.
            </p>

            <div className="space-y-6">
              {/* Van Level */}
              <div className="border-2 border-blue-500/50 bg-blue-500/5 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-mono text-sm text-blue-400 block">
                      Van Component
                    </span>
                    <span className="text-xs text-slate-500">
                      Receives: onKick callback
                    </span>
                  </div>
                  <Check className="w-5 h-5 text-emerald-400" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => toggleProp("vanToHotel")}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      propsPassed.vanToHotel
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {propsPassed.vanToHotel
                      ? "Passing onKick to Hotel"
                      : "NOT passing onKick"}
                  </button>
                </div>

                {/* Hotel Level */}
                <div
                  className={`ml-6 border-2 rounded-lg p-6 transition-all ${
                    propsPassed.vanToHotel
                      ? "border-blue-400/50 bg-blue-400/5"
                      : "border-red-500/50 bg-red-500/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-mono text-sm text-blue-300 block">
                        Hotel Component
                      </span>
                      <span className="text-xs text-slate-500">
                        {propsPassed.vanToHotel
                          ? "Receives: onKick callback"
                          : "Missing: onKick callback"}
                      </span>
                    </div>
                    {propsPassed.vanToHotel ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <X className="w-5 h-5 text-red-400" />
                    )}
                  </div>

                  {propsPassed.vanToHotel && (
                    <div className="flex items-center gap-3 mb-4">
                      <button
                        onClick={() => toggleProp("hotelToFortress")}
                        className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                          propsPassed.hotelToFortress
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30"
                        }`}
                      >
                        {propsPassed.hotelToFortress
                          ? "Passing onKick to Fortress"
                          : "NOT passing onKick"}
                      </button>
                    </div>
                  )}

                  {/* Fortress Level */}
                  <div
                    className={`ml-6 border-2 rounded-lg p-6 transition-all ${
                      propsPassed.vanToHotel && propsPassed.hotelToFortress
                        ? "border-blue-300/50 bg-blue-300/5"
                        : "border-red-500/50 bg-red-500/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-mono text-sm text-blue-200 block">
                          Fortress Component
                        </span>
                        <span className="text-xs text-slate-500">
                          {propsPassed.vanToHotel &&
                          propsPassed.hotelToFortress
                            ? "Receives: onKick callback"
                            : "Missing: onKick callback"}
                        </span>
                      </div>
                      {propsPassed.vanToHotel &&
                      propsPassed.hotelToFortress ? (
                        <Check className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded border border-slate-700">
              <p className="text-sm text-slate-400">
                <strong className="text-slate-300">Key Concept:</strong> Props
                must be explicitly passed at every level. If any component
                forgets to pass a prop to its children, those children lose
                access to that data or callback.
              </p>
            </div>
          </div>
        )}

        {chapter === 2 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-red-400" />
              Limbo: Broken Composition
            </h3>
            <p className="text-slate-400 mb-6">
              When the prop chain breaks, components become orphaned—still
              mounted, but disconnected from the tree.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Broken Composition */}
              <div className="border-2 border-red-500/50 bg-red-500/5 rounded-lg p-6">
                <h4 className="font-bold text-red-400 mb-4">
                  Broken Composition
                </h4>
                <div className="space-y-3">
                  <div className="bg-slate-800/50 rounded p-3">
                    <div className="font-mono text-xs text-slate-300 mb-1">
                      Van Component
                    </div>
                    <div className="text-xs text-emerald-400">
                      ✓ Has onKick callback
                    </div>
                  </div>
                  <div className="ml-4 bg-slate-800/50 rounded p-3">
                    <div className="font-mono text-xs text-slate-300 mb-1">
                      Hotel Component
                    </div>
                    <div className="text-xs text-red-400">
                      ✗ onKick not passed down
                    </div>
                  </div>
                  <div className="ml-8 bg-red-900/20 border border-red-500/30 rounded p-3">
                    <div className="font-mono text-xs text-slate-300 mb-1">
                      Fortress Component
                    </div>
                    <div className="text-xs text-red-400">
                      ✗ Orphaned - no callback
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                      Stuck in limbo...
                    </div>
                  </div>
                </div>
              </div>

              {/* Correct Composition */}
              <div className="border-2 border-emerald-500/50 bg-emerald-500/5 rounded-lg p-6">
                <h4 className="font-bold text-emerald-400 mb-4">
                  Correct Composition
                </h4>
                <div className="space-y-3">
                  <div className="bg-slate-800/50 rounded p-3">
                    <div className="font-mono text-xs text-slate-300 mb-1">
                      Van Component
                    </div>
                    <div className="text-xs text-emerald-400">
                      ✓ Has onKick callback
                    </div>
                  </div>
                  <div className="ml-4 bg-slate-800/50 rounded p-3">
                    <div className="font-mono text-xs text-slate-300 mb-1">
                      Hotel Component
                    </div>
                    <div className="text-xs text-emerald-400">
                      ✓ Receives & passes onKick
                    </div>
                  </div>
                  <div className="ml-8 bg-emerald-900/20 border border-emerald-500/30 rounded p-3">
                    <div className="font-mono text-xs text-slate-300 mb-1">
                      Fortress Component
                    </div>
                    <div className="text-xs text-emerald-400">
                      ✓ Receives onKick callback
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                      Connected to tree
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded border border-slate-700">
              <p className="text-sm text-slate-400">
                <strong className="text-slate-300">Key Concept:</strong> Broken
                prop chains create orphaned components that can't communicate
                with parents. This leads to bugs, memory leaks, and unpredictable
                behavior—the "limbo" of React applications.
              </p>
            </div>
          </div>
        )}

        {chapter === 3 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              The Synchronized Kick
            </h3>
            <p className="text-slate-400 mb-6">
              Watch the kick propagate through all three levels in perfect
              synchronization. Each component executes its logic and passes the
              callback along.
            </p>

            <div className="mb-6">
              <button
                onClick={triggerKick}
                disabled={kickTriggered}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
              >
                {kickTriggered ? "Kick in Progress..." : "Trigger the Kick"}
              </button>
            </div>

            <div className="space-y-4">
              {/* Van */}
              <div
                className={`border-2 rounded-lg p-6 transition-all ${
                  kickTimeline.includes(0)
                    ? "border-emerald-500 bg-emerald-500/10 scale-105"
                    : "border-slate-700 bg-slate-800/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-sm text-blue-400 block">
                      Van Component
                    </span>
                    <span className="text-xs text-slate-500">
                      Level 1 - Hits water
                    </span>
                  </div>
                  {kickTimeline.includes(0) && (
                    <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Hotel */}
              <div
                className={`ml-6 border-2 rounded-lg p-6 transition-all ${
                  kickTimeline.includes(1)
                    ? "border-emerald-500 bg-emerald-500/10 scale-105"
                    : "border-slate-700 bg-slate-800/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-sm text-blue-300 block">
                      Hotel Component
                    </span>
                    <span className="text-xs text-slate-500">
                      Level 2 - Elevator explodes
                    </span>
                  </div>
                  {kickTimeline.includes(1) && (
                    <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Fortress */}
              <div
                className={`ml-12 border-2 rounded-lg p-6 transition-all ${
                  kickTimeline.includes(2)
                    ? "border-emerald-500 bg-emerald-500/10 scale-105"
                    : "border-slate-700 bg-slate-800/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-sm text-blue-200 block">
                      Fortress Component
                    </span>
                    <span className="text-xs text-slate-500">
                      Level 3 - Detonates
                    </span>
                  </div>
                  {kickTimeline.includes(2) && (
                    <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Wake Up */}
              <div
                className={`ml-18 border-2 rounded-lg p-6 transition-all ${
                  kickTimeline.includes(3)
                    ? "border-emerald-500 bg-emerald-500/10 scale-105"
                    : "border-slate-700 bg-slate-800/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-sm text-emerald-400 block">
                      Reality
                    </span>
                    <span className="text-xs text-slate-500">
                      Wake up on the plane
                    </span>
                  </div>
                  {kickTimeline.includes(3) && (
                    <Check className="w-5 h-5 text-emerald-400" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded border border-slate-700">
              <p className="text-sm text-slate-400">
                <strong className="text-slate-300">Key Concept:</strong> Proper
                composition means callbacks propagate correctly through the
                tree. Each component receives the callback, executes its logic,
                and passes it along—creating predictable, synchronized behavior.
              </p>
            </div>
          </div>
        )}

        {chapter === 4 && (
          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-100 mb-4">
              Key Takeaways
            </h3>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-slate-100 mb-2">
                  Component Composition
                </h4>
                <p className="text-slate-400">
                  Components can contain other components through the{" "}
                  <code className="text-blue-400 font-mono">children</code>{" "}
                  prop. This creates nested structures like dream levels—each
                  self-contained but connected.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-slate-100 mb-2">
                  Explicit Prop Passing
                </h4>
                <p className="text-slate-400">
                  Props don't automatically flow down the tree. Every component
                  must explicitly pass data and callbacks to its children. Miss
                  one level, and the chain breaks.
                </p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-slate-100 mb-2">
                  Callback Propagation
                </h4>
                <p className="text-slate-400">
                  Callbacks passed as props allow child components to
                  communicate with parents. Each component can execute its logic
                  and trigger the callback—like the synchronized kick.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h4 className="font-bold text-slate-100 mb-2">
                  Broken Composition = Limbo
                </h4>
                <p className="text-slate-400">
                  When prop chains break, components become orphaned. They're
                  still mounted but disconnected from the tree—leading to bugs,
                  memory leaks, and unpredictable behavior.
                </p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4">
                <h4 className="font-bold text-slate-100 mb-2">
                  Proper Architecture
                </h4>
                <p className="text-slate-400">
                  Well-composed components create maintainable, scalable
                  applications. Each component does one thing well, receives
                  what it needs, and passes callbacks correctly.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-slate-300 text-center italic">
                "The dream is over. The lesson remains. Welcome back to
                reality."
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800/50 disabled:cursor-not-allowed disabled:opacity-50 text-slate-300 rounded-lg transition-colors"
              aria-label="Previous chapter"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {chapters.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setChapter(idx);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === chapter
                      ? "bg-blue-400 w-8"
                      : "bg-slate-700 hover:bg-slate-600"
                  }`}
                  aria-label={`Go to chapter ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-800/50 disabled:cursor-not-allowed disabled:opacity-50 text-white rounded-lg transition-colors"
              aria-label="Next chapter"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}