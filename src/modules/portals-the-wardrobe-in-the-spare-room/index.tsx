import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  DoorOpen,
  Map,
  Eye,
  EyeOff,
  RefreshCw,
  Zap,
  Wrench,
  ChevronLeft,
  ChevronRight,
  Volume2,
} from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  title: string;
  content: string;
  atmosphere: string;
}

export default function PortalsTheWardrobe(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [portalMode, setPortalMode] = useState<"trapped" | "free">("trapped");
  const [showMap, setShowMap] = useState<boolean>(false);
  const [zIndexProblem, setZIndexProblem] = useState<boolean>(true);
  const [overflowHidden, setOverflowHidden] = useState<boolean>(true);
  const [positionRelative, setPositionRelative] = useState<boolean>(true);
  const [eventCount, setEventCount] = useState<number>(0);
  const [portalCreations, setPortalCreations] = useState<number>(0);
  const [parentRef] = useAutoAnimate();

  // Circuit breaker for portal creations
  useEffect(() => {
    if (portalCreations > 50) {
      setPortalCreations(0);
      setShowMap(false);
      alert("Safety reset: Too many portal creations");
    }
  }, [portalCreations]);

  const chapters: Chapter[] = [
    {
      title: "The Grand Map and the Cramped Room",
      content:
        "The Professor's house was a component tree unto itself—a sprawling collection of corridors, libraries, and forgotten rooms, each nested inside another. When Lucy Pevensie arrived, the air itself felt full of hidden rules and ancient logic. He entrusted her with a glowing map of Narnia, saying, \"Some things are too grand for the rooms that hold them.\" But when she tried to display it in the small, restrictive spare room, the map's edges were clipped by the walls. The room was a box that wouldn't suffer anything to exist beyond its borders.",
      atmosphere: "mysterious, dusty, confined",
    },
    {
      title: "The Walls Have Rules",
      content:
        'Lucy tried everything. Hanging the map resulted in a dust sheet (higher z-index) obscuring it. Laying it on the floor caused edges to vanish (overflow: hidden). Trying to position it for the hallway proved impossible (position: relative). "The walls of the room are the edges of its world," she whispered. Every CSS constraint of the parent component trapped the child. The map was clipped, obscured, and frustratingly small—a battle against the very architecture of the space.',
      atmosphere: "frustration, illogical, trapped",
    },
    {
      title: "A Door to a Different World",
      content:
        "Leaning against the wardrobe, Lucy discovered a passage to a snowy forest. The Professor explained: \"Some things don't belong in the room, but they are still of the room. Their story begins here, but their world must be displayed elsewhere.\" With this insight, she pushed the map through the wardrobe's opening. In Narnia's vast clearing, it unfurled to full size—no walls to clip it, no constraints to limit it. The solution wasn't fighting the room but rendering elsewhere.",
      atmosphere: "magical, liberating, wondrous",
    },
    {
      title: "Two Worlds, One Story",
      content:
        'The contrast was stark: the map trapped versus the map free. But the magic wasn\'t just visual. When Lucy touched the lion on the map in Narnia, a roar echoed through the woods—and also back through the wardrobe into the spare room. "Its voice is heard here, even if its world is displayed there," the Professor smiled. "It still reports back to its origin." The event bubbled from the portal\'d component back to its logical parent, proving the connection remained despite separate rendering.',
      atmosphere: "reflective, comparative, analytical",
    },
    {
      title: "Master of the Passages",
      content:
        'Lucy now saw every cramped space as a potential starting point. A spyglass for viewing stars from a low-ceilinged attic? She found a shimmering crack and rendered the celestial view outside. A delicate unfolding letter in a narrow hallway? Passed through a loose floorboard. She understood: "Every room can have a door to a larger world." Portals became her tool for modals, tooltips, dropdowns—any component that needed to escape parent constraints while maintaining logical connection.',
      atmosphere: "celebratory, confident, complete",
    },
  ];

  // Portal target container
  const portalContainer =
    typeof document !== "undefined"
      ? document.getElementById("portal-root") ||
        (() => {
          const div = document.createElement("div");
          div.id = "portal-root";
          div.className = "portal-container";
          document.body.appendChild(div);
          return div;
        })()
      : null;

  const currentChapter = chapters[chapter];

  // Code examples
  const trappedCode = `// ❌ Map trapped in spare room
function SpareRoom() {
  const [showMap, setShowMap] = useState(false);
  
  return (
    <div className="spare-room" style={{
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1
    }}>
      <button onClick={() => setShowMap(true)}>
        Show Narnia Map
      </button>
      
      {showMap && (
        <div className="narnia-map">
          {/* Map gets clipped by parent's CSS! */}
          <h2>The Grand Map of Narnia</h2>
        </div>
      )}
    </div>
  );
}`;

  const portalCode = `// ✅ Map rendered through portal
function WardrobePortal() {
  const [showMap, setShowMap] = useState(false);
  const portalRoot = document.getElementById('portal-root');
  
  return (
    <div className="spare-room">
      <button onClick={() => setShowMap(true)}>
        Show Narnia Map
      </button>
      
      {showMap && portalRoot && createPortal(
        <div className="narnia-map">
          <h2>The Grand Map of Narnia</h2>
          {/* Rendered in portal-root, free from CSS constraints! */}
        </div>,
        portalRoot
      )}
    </div>
  );
}`;

  const eventBubblingCode = `// Events bubble through portals
function WardrobeWithEvents() {
  const handleRoar = () => {
    console.log('Roar heard in spare room!');
  };
  
  return (
    <div className="spare-room" onClick={handleRoar}>
      {/* Click in portal still bubbles to parent */}
      {createPortal(
        <button onClick={() => console.log('Clicked in Narnia')}>
          Touch the Lion
        </button>,
        document.getElementById('portal-root')
      )}
    </div>
  );
}`;

  // Tooltip component for chapter 5
  const TooltipPortal = ({
    children,
    content,
  }: {
    children: React.ReactNode;
    content: string;
  }) => {
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top - 10 });
      setShow(true);
    };

    return (
      <>
        <span
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setShow(false)}
          className="cursor-help border-b border-dashed border-amber-500/50"
        >
          {children}
        </span>

        {show &&
          portalContainer &&
          createPortal(
            <div
              className="fixed z-50 rounded-lg border border-amber-600/40 bg-stone-900/95 px-3 py-2 text-sm text-amber-100/90 shadow-lg shadow-black/50 backdrop-blur-sm"
              style={{
                left: position.x,
                top: position.y,
                transform: "translateY(-100%)",
              }}
            >
              {content}
              <div className="absolute bottom-0 left-4 h-0 w-0 translate-y-full transform border-t-4 border-r-4 border-l-4 border-t-stone-900/95 border-r-transparent border-l-transparent" />
            </div>,
            portalContainer,
          )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950/90 via-stone-900/95 to-stone-950/90 p-4 font-serif text-amber-100/90 md:p-8">
      <header className="mb-8 border-b border-stone-800 bg-stone-950/80 backdrop-blur-sm md:mb-12">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <DoorOpen className="h-6 w-6 text-amber-500 md:h-8 md:w-8" />
              <h1 className="text-xl font-bold md:text-3xl">
                The Chronicles of Narnia
              </h1>
            </div>
            <p className="text-xs text-stone-400 md:text-base">
              The Wardrobe • 1950
            </p>
          </div>
          <p className="text-sm font-medium text-amber-500 md:text-lg">
            React Portals: Rendering Outside Parent DOM Hierarchy
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-12">
          {/* Left column: Narrative */}
          <div className="lg:col-span-7">
            <div className="prose prose-invert prose-lg mb-8 max-w-none rounded-xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <Map className="h-5 w-5 text-amber-500" />
                <h2 className="m-0 text-xl font-bold md:text-2xl">
                  {currentChapter.title}
                </h2>
              </div>
              <p className="mb-4 leading-relaxed text-amber-100/90">
                {currentChapter.content}
              </p>
              <div className="mt-6 flex items-center gap-2 border-t border-stone-800 pt-4 text-sm text-stone-400">
                <Zap className="h-4 w-4" />
                <span>Atmosphere: {currentChapter.atmosphere}</span>
              </div>
            </div>

            {/* Code examples based on chapter */}
            <div className="space-y-4 md:space-y-6">
              {chapter === 0 && (
                <CodeBlock
                  code={trappedCode}
                  variant="error"
                  title="// ❌ The Problem: Map Trapped in Spare Room"
                  defaultExpanded={true}
                  language="jsx"
                />
              )}

              {chapter === 1 && (
                <>
                  <CodeBlock
                    code={`// z-index: Dust sheet covers map
.spare-room {
  position: relative;
  z-index: 1; /* Low stacking context */
}

.dust-sheet {
  position: relative;
  z-index: 2; /* Higher than map! */
}`}
                    variant="error"
                    title="// ❌ CSS Constraint: z-index Stacking"
                    defaultExpanded={true}
                    language="css"
                  />

                  <CodeBlock
                    code={`// overflow: Map edges vanish
.spare-room {
  overflow: hidden; /* Clips children! */
  width: 300px;
  height: 200px;
}

.narnia-map {
  width: 500px; /* Too wide! */
  height: 400px; /* Too tall! */
}`}
                    variant="error"
                    title="// ❌ CSS Constraint: overflow: hidden"
                    defaultExpanded={true}
                    language="css"
                  />
                </>
              )}

              {chapter === 2 && (
                <CodeBlock
                  code={portalCode}
                  variant="success"
                  title="// ✅ The Solution: createPortal() to Another World"
                  defaultExpanded={true}
                  language="jsx"
                />
              )}

              {chapter === 3 && (
                <CodeBlock
                  code={eventBubblingCode}
                  variant="success"
                  title="// ✅ Event Bubbling Through Portals"
                  defaultExpanded={true}
                  language="jsx"
                />
              )}

              {chapter === 4 && (
                <>
                  <CodeBlock
                    code={`// Tooltip using portal
function Tooltip({ children, content }) {
  const [show, setShow] = useState(false);
  const portalRoot = document.getElementById('tooltip-root');
  
  return (
    <>
      <span onMouseEnter={() => setShow(true)}>
        {children}
      </span>
      
      {show && portalRoot && createPortal(
        <div className="tooltip">
          {content}
        </div>,
        portalRoot
      )}
    </>
  );
}`}
                    variant="success"
                    title="// ✅ Portal Pattern: Tooltip Escape"
                    defaultExpanded={true}
                    language="jsx"
                  />

                  <CodeBlock
                    code={`// Modal using portal (best practice)
function Modal({ isOpen, onClose, children }) {
  const portalRoot = document.getElementById('modal-root');
  
  if (!isOpen || !portalRoot) return null;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    portalRoot
  );
}`}
                    variant="success"
                    title="// ✅ Portal Pattern: Modal Dialog"
                    defaultExpanded={true}
                    language="jsx"
                  />
                </>
              )}
            </div>
          </div>

          {/* Right column: Interactive Demo */}
          <div className="lg:col-span-5">
            <div className="sticky top-8 rounded-xl border border-amber-600/30 bg-stone-900/60 p-6 backdrop-blur-sm md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-bold">
                  <DoorOpen className="h-5 w-5 text-amber-500" />
                  Interactive Wardrobe
                </h3>
                <button
                  onClick={() => {
                    setShowMap(false);
                    setEventCount(0);
                    setPortalCreations(0);
                  }}
                  className="flex items-center gap-1 rounded bg-stone-800 px-3 py-1 text-xs hover:bg-stone-700"
                >
                  <RefreshCw className="h-3 w-3" />
                  Reset
                </button>
              </div>

              {/* Demo based on current chapter */}
              <div ref={parentRef} className="space-y-6">
                {/* Chapter 1-3: Map display demo */}
                {chapter <= 3 && (
                  <>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Render Mode:</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setPortalMode("trapped")}
                            className={`rounded px-3 py-1 text-xs ${portalMode === "trapped" ? "border border-red-700/50 bg-red-900/40" : "bg-stone-800 hover:bg-stone-700"}`}
                          >
                            <EyeOff className="mr-1 inline h-3 w-3" />
                            Trapped in Room
                          </button>
                          <button
                            onClick={() => {
                              setPortalMode("free");
                              setPortalCreations((c) => c + 1);
                            }}
                            className={`rounded px-3 py-1 text-xs ${portalMode === "free" ? "border border-emerald-700/50 bg-emerald-900/40" : "bg-stone-800 hover:bg-stone-700"}`}
                          >
                            <Eye className="mr-1 inline h-3 w-3" />
                            Through Wardrobe
                          </button>
                        </div>
                      </div>

                      {/* Spare Room Container */}
                      <div
                        className="relative rounded-lg border-2 border-dashed p-4"
                        style={{
                          backgroundColor:
                            portalMode === "trapped" ? "#1c1917" : "#0c0a09",
                          borderColor:
                            portalMode === "trapped"
                              ? "#dc2626/40"
                              : "#10b981/40",
                          overflow: overflowHidden ? "hidden" : "visible",
                          position: positionRelative ? "relative" : "static",
                          height: "200px",
                          zIndex: zIndexProblem ? 1 : 10,
                        }}
                        onClick={() => {
                          if (showMap) {
                            setEventCount((c) => c + 1);
                          }
                        }}
                      >
                        <div className="absolute top-2 right-2 text-xs opacity-60">
                          Spare Room Container
                        </div>

                        <button
                          onClick={() => {
                            setShowMap(!showMap);
                            if (portalMode === "free") {
                              setPortalCreations((c) => c + 1);
                            }
                          }}
                          className="rounded bg-amber-700 px-4 py-2 text-sm hover:bg-amber-600"
                        >
                          {showMap ? "Hide Narnia Map" : "Show Narnia Map"}
                        </button>

                        {/* Dust sheet (z-index problem) */}
                        {chapter >= 1 && zIndexProblem && (
                          <div
                            className="absolute top-4 right-4 h-20 w-16 rotate-12 rounded bg-stone-700/80"
                            style={{ zIndex: 2 }}
                          >
                            <div className="rotate-[-12deg] p-2 text-xs opacity-60">
                              Dust Sheet
                            </div>
                          </div>
                        )}

                        {/* Map rendered inside container (when trapped) */}
                        {showMap && portalMode === "trapped" && (
                          <div className="absolute top-12 left-4 h-32 w-48 rounded-lg border border-amber-600/50 bg-gradient-to-br from-amber-900/40 to-amber-700/30 p-3">
                            <div className="text-sm font-bold text-amber-300">
                              Narnia Map
                            </div>
                            <div className="mt-2 text-xs opacity-70">
                              Clipped by container edges
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEventCount((c) => c + 1);
                              }}
                              className="mt-2 flex items-center gap-1 rounded bg-amber-800 px-2 py-1 text-xs hover:bg-amber-700"
                            >
                              <Volume2 className="h-3 w-3" />
                              Touch the Lion
                            </button>
                          </div>
                        )}

                        {/* Wardrobe visualization */}
                        <div className="absolute bottom-4 left-1/2 flex h-24 w-16 -translate-x-1/2 transform items-center justify-center rounded-lg border-2 border-stone-700 bg-stone-800">
                          <DoorOpen className="h-8 w-8 text-amber-500/60" />
                        </div>
                      </div>

                      {/* Map rendered through portal (when free) */}
                      {showMap &&
                        portalMode === "free" &&
                        portalContainer &&
                        createPortal(
                          <div className="pointer-events-none fixed inset-0 z-50">
                            <div className="pointer-events-auto absolute top-1/2 left-1/2 h-48 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-xl border-2 border-emerald-600/60 bg-gradient-to-br from-emerald-900/40 to-emerald-700/30 p-4 shadow-2xl shadow-black/50">
                              <div className="text-lg font-bold text-emerald-300">
                                The Grand Map of Narnia
                              </div>
                              <div className="mt-2 text-sm opacity-90">
                                Rendered through portal to document.body
                              </div>
                              <div className="mt-2 text-xs opacity-60">
                                Full size, no clipping
                              </div>
                              <button
                                onClick={() => setEventCount((c) => c + 1)}
                                className="mt-3 flex items-center gap-2 rounded bg-emerald-800 px-3 py-1.5 text-sm hover:bg-emerald-700"
                              >
                                <Volume2 className="h-4 w-4" />
                                Roar from Narnia
                              </button>
                            </div>
                          </div>,
                          portalContainer,
                        )}

                      {/* Chapter 2: Constraint toggles */}
                      {chapter >= 1 && (
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <button
                            onClick={() => setZIndexProblem(!zIndexProblem)}
                            className={`rounded p-2 ${zIndexProblem ? "bg-red-900/40" : "bg-emerald-900/40"}`}
                          >
                            z-index: {zIndexProblem ? "❌ Problem" : "✅ Fixed"}
                          </button>
                          <button
                            onClick={() => setOverflowHidden(!overflowHidden)}
                            className={`rounded p-2 ${overflowHidden ? "bg-red-900/40" : "bg-emerald-900/40"}`}
                          >
                            overflow:{" "}
                            {overflowHidden ? "❌ hidden" : "✅ visible"}
                          </button>
                          <button
                            onClick={() =>
                              setPositionRelative(!positionRelative)
                            }
                            className={`rounded p-2 ${positionRelative ? "bg-red-900/40" : "bg-emerald-900/40"}`}
                          >
                            position:{" "}
                            {positionRelative ? "❌ relative" : "✅ static"}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="rounded bg-stone-800/50 p-3">
                        <div className="text-xs opacity-60">
                          Roar Events Heard
                        </div>
                        <div className="font-mono text-lg tabular-nums">
                          {eventCount}
                        </div>
                      </div>
                      <div className="rounded bg-stone-800/50 p-3">
                        <div className="text-xs opacity-60">
                          Portal Creations
                        </div>
                        <div className="font-mono text-lg tabular-nums">
                          {portalCreations}/50
                        </div>
                      </div>
                    </div>

                    <div className="rounded bg-stone-800/30 p-3 text-sm">
                      <div className="mb-1 flex items-center gap-2">
                        {portalMode === "trapped" ? (
                          <>
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <span className="font-medium">
                              Map Trapped in Spare Room
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="h-2 w-2 rounded-full bg-emerald-500" />
                            <span className="font-medium">
                              Map Rendered Through Portal to Narnia
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-xs opacity-70">
                        {portalMode === "trapped"
                          ? "Events bubble directly. Map clipped by container CSS."
                          : "Events still bubble to Spare Room. Map free from constraints."}
                      </p>
                    </div>
                  </>
                )}

                {/* Chapter 5: Tooltip & Dropdown examples */}
                {chapter === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="flex items-center gap-2 text-sm font-bold">
                        <Wrench className="h-4 w-4 text-amber-500" />
                        Portal Applications
                      </h4>

                      <div className="rounded-lg bg-stone-800/30 p-4">
                        <p className="mb-4 text-sm">
                          Hover these elements to see portal-rendered tooltips:
                        </p>

                        <div className="space-y-3">
                          <div>
                            <TooltipPortal content="This tooltip renders outside the component hierarchy via portal, avoiding clipping by parent overflow.">
                              Spyglass Tooltip
                            </TooltipPortal>
                            <span className="ml-2 text-xs opacity-60">
                              (Hover me)
                            </span>
                          </div>

                          <div>
                            <TooltipPortal content="Another portal example. The tooltip appears at cursor position, not constrained by parent container.">
                              Unfolding Letter
                            </TooltipPortal>
                            <span className="ml-2 text-xs opacity-60">
                              (Hover me)
                            </span>
                          </div>
                        </div>
                      </div>

                      <CodeBlock
                        code={`// Portal target in index.html
<html>
  <body>
    <div id="root"></div>
    <div id="portal-root"></div> {/* For modals */}
    <div id="tooltip-root"></div> {/* For tooltips */}
  </body>
</html>`}
                        variant="default"
                        title="// Best Practice: Dedicated Portal Targets"
                        defaultExpanded={false}
                        language="html"
                      />
                    </div>

                    <div className="rounded border border-amber-700/30 bg-amber-900/20 p-3 text-sm">
                      <div className="mb-1 font-medium">
                        ✓ Key Portal Use Cases
                      </div>
                      <ul className="space-y-1 text-xs opacity-90">
                        <li>• Modals, dialogs, lightboxes</li>
                        <li>• Tooltips, popovers, dropdowns</li>
                        <li>• Notifications, toasts</li>
                        <li>
                          • Any UI that needs to escape parent CSS constraints
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-6">
              <div className="mb-2 flex justify-between text-xs text-stone-400">
                <span>Chapter Progress</span>
                <span>
                  {chapter + 1} / {chapters.length}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-stone-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-500 transition-all duration-500"
                  style={{
                    width: `${((chapter + 1) / chapters.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 flex items-center justify-between border-t border-stone-800 pt-6 md:mt-12">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="flex items-center gap-2 rounded-lg bg-stone-800 px-5 py-2.5 text-stone-300 transition-colors hover:bg-stone-700 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <div className="flex items-center gap-4">
            {chapters.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setChapter(idx)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs ${chapter === idx ? "bg-amber-600 text-white" : "bg-stone-800 text-stone-400 hover:bg-stone-700"}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setChapter(Math.min(chapters.length - 1, chapter + 1))
            }
            disabled={chapter === chapters.length - 1}
            className="flex items-center gap-2 rounded-lg bg-amber-700 px-5 py-2.5 text-white transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </main>
    </div>
  );
}
