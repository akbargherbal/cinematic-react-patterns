import { useState, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { Zap, AlertTriangle, CheckCircle, Code } from "lucide-react";

export default function StrangerThingsPortalRendering() {
  const [chapter, setChapter] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPortalVersion, setShowPortalVersion] = useState(false);
  const [message, setMessage] = useState("");
  const [isGateOpen, setIsGateOpen] = useState(false);

  const chapters = useMemo(
    () => [
      {
        id: "intro",
        title: "The Vanishing",
        subtitle: "November 6th, 1983",
      },
      {
        id: "build",
        title: "The Search Party",
        subtitle: "The Problem Portals Solve",
      },
      {
        id: "climax",
        title: "The Gate Opens",
        subtitle: "How Portals Work",
      },
      {
        id: "resolution",
        title: "Closing the Gate",
        subtitle: "Portal Lifecycle Management",
      },
      {
        id: "summary",
        title: "The In-Between",
        subtitle: "When to Use Portals",
      },
    ],
    [],
  );

  const currentChapter = chapters[chapter];

  const handlePrevious = useCallback(() => {
    setChapter((c) => Math.max(0, c - 1));
  }, []);

  const handleNext = useCallback(() => {
    setChapter((c) => Math.min(chapters.length - 1, c + 1));
  }, [chapters.length]);

  const handleLightClick = useCallback((letter: string) => {
    setMessage((prev) => prev + letter);
  }, []);

  const clearMessage = useCallback(() => {
    setMessage("");
  }, []);

  return (
    <div className="min-h-screen bg-red-950 font-sans text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-red-900/30 bg-red-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="mb-2 flex items-center gap-3">
            <Zap className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold uppercase tracking-wide text-red-500 md:text-4xl">
              Stranger Things
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Portal Rendering • React Portals
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-12 pb-32">
        {/* Chapter Header */}
        <div className="mb-8">
          <div className="mb-2 text-sm uppercase tracking-wider text-red-500">
            Chapter {chapter + 1} of {chapters.length}
          </div>
          <h2 className="mb-2 text-4xl font-bold text-slate-100 md:text-5xl">
            {currentChapter.title}
          </h2>
          <p className="text-xl text-slate-400">{currentChapter.subtitle}</p>
        </div>

        {/* Chapter Content */}
        {chapter === 0 && <ChapterIntro />}
        {chapter === 1 && (
          <ChapterBuild
            showPortalVersion={showPortalVersion}
            setShowPortalVersion={setShowPortalVersion}
          />
        )}
        {chapter === 2 && (
          <ChapterClimax
            isGateOpen={isGateOpen}
            setIsGateOpen={setIsGateOpen}
          />
        )}
        {chapter === 3 && <ChapterResolution />}
        {chapter === 4 && <ChapterSummary />}

        {/* Christmas Lights Demo (Chapters 0-2) */}
        {chapter <= 2 && (
          <div className="mt-12">
            <ChristmasLights
              message={message}
              onLightClick={handleLightClick}
              onClear={clearMessage}
            />
          </div>
        )}
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-red-900/30 bg-red-950/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="rounded border border-red-800/50 bg-red-900/40 px-6 py-2 text-slate-300 transition-all hover:border-red-700 hover:bg-red-900/60 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Previous
            </button>

            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="rounded border border-red-800/50 bg-red-900/40 px-6 py-2 text-slate-300 transition-all hover:border-red-700 hover:bg-red-900/60 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ChapterIntro() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed">
          November 6th, 1983. Hawkins, Indiana. The basement is thick with the
          smell of pizza and the electric tension of a campaign reaching its
          climax. Will Byers rolls the dice—and then the lights flicker.
        </p>
        <p className="text-lg leading-relaxed">
          Will's bike is found the next morning, but Will himself is gone.
          Simply... <em>elsewhere</em>. He's in the Upside Down.
        </p>
      </div>

      <div className="rounded-lg border border-red-800/30 bg-red-900/20 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-500">
          <Code className="h-5 w-5" />
          The Core Concept
        </h3>
        <p className="mb-4 text-slate-300">
          <strong>The Upside Down is not another world.</strong> It's the same
          world, the same Hawkins—but rendered in a different space. A parallel
          DOM tree.
        </p>
        <p className="text-slate-300">
          When you build a React application, you create a component tree. But
          the React component tree and the DOM tree are not the same thing.
          Sometimes, you need to render content outside the normal component
          hierarchy—like a modal that appears on top of everything, or a tooltip
          that escapes overflow constraints.
        </p>
      </div>

      <div className="rounded-lg border border-slate-700/30 bg-slate-900/40 p-6">
        <h3 className="mb-4 text-xl font-bold text-amber-500">
          The Problem: Trapped Components
        </h3>
        <p className="mb-4 text-slate-300">
          Imagine you're building a modal dialog deep inside your component
          hierarchy. Logically, it belongs to the component that triggered it.
          But visually, it needs to appear centered on the screen, above
          everything else.
        </p>
        <p className="text-slate-300">
          If you render it as a normal child component, it inherits CSS
          constraints from all its ancestors: <code>overflow: hidden</code>,{" "}
          <code>z-index</code> stacking contexts, <code>position</code>{" "}
          containers. Your modal is trapped—like Will Byers in the Upside Down.
        </p>
      </div>

      <div className="rounded-lg border border-red-800/30 bg-red-900/20 p-6">
        <h3 className="mb-4 text-xl font-bold text-red-500">
          The Solution: React Portals
        </h3>
        <p className="mb-4 text-slate-300">
          <strong>React Portals</strong> are the gates between dimensions. They
          allow you to render a component in a different part of the DOM tree
          while maintaining its position in the React component tree.
        </p>
        <div className="overflow-x-auto rounded bg-slate-950 p-4 font-mono text-sm">
          <pre className="text-emerald-400">
            {`// Will exists in the component tree here
function Sidebar() {
  return (
    <div className="sidebar">
      <UserProfile />
      {/* But the modal renders at document.body */}
    </div>
  );
}`}
          </pre>
        </div>
        <p className="mt-4 text-slate-300">
          Will is in the Upside Down (a different DOM location), but he's still
          Joyce's son (still part of the React tree). The connection remains.
        </p>
      </div>
    </div>
  );
}

function ChapterBuild({
  showPortalVersion,
  setShowPortalVersion,
}: {
  showPortalVersion: boolean;
  setShowPortalVersion: (value: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed">
          The boys ride their bikes through Hawkins, calling Will's name. They
          search everywhere in the normal world, but Will isn't there. He's in
          the same locations—but in a parallel rendering context they cannot
          access.
        </p>
        <p className="text-lg leading-relaxed">
          Joyce Byers hangs Christmas lights across her living room wall. When
          the lights flicker, she can communicate with Will. The lights are her
          interface—her way of rendering his presence in her world.
        </p>
      </div>

      <div className="rounded-lg border border-red-800/30 bg-red-900/20 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-500">
          <AlertTriangle className="h-5 w-5" />
          The Overflow Trap
        </h3>
        <p className="mb-6 text-slate-300">
          Watch what happens when you try to render a modal inside a container
          with <code>overflow: hidden</code>. The modal gets clipped by its
          parent's boundaries—it can't escape.
        </p>

        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setShowPortalVersion(false)}
            className={`rounded border px-4 py-2 transition-all ${
              !showPortalVersion
                ? "border-red-700 bg-red-900/60 text-slate-100"
                : "border-red-800/30 bg-red-900/20 text-slate-400"
            }`}
          >
            Normal Render
          </button>
          <button
            onClick={() => setShowPortalVersion(true)}
            className={`rounded border px-4 py-2 transition-all ${
              showPortalVersion
                ? "border-red-700 bg-red-900/60 text-slate-100"
                : "border-red-800/30 bg-red-900/20 text-slate-400"
            }`}
          >
            Portal Render
          </button>
        </div>

        <OverflowDemo showPortalVersion={showPortalVersion} />
      </div>

      <div className="rounded-lg border border-slate-700/30 bg-slate-900/40 p-6">
        <h3 className="mb-4 text-xl font-bold text-amber-500">
          Three Problems Portals Solve
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-bold text-slate-200">
              1. The Overflow Trap
            </h4>
            <p className="text-slate-300">
              Parent has <code>overflow: hidden</code> → Child gets clipped.
              Portal renders child at document root, escaping the overflow
              container.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-bold text-slate-200">
              2. The Z-Index Stack
            </h4>
            <p className="text-slate-300">
              Parent has <code>z-index: 1</code> → Child can't appear above
              siblings with <code>z-index: 2</code>. Portal renders child in a
              new stacking context.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-bold text-slate-200">
              3. The Position Context
            </h4>
            <p className="text-slate-300">
              Parent has <code>transform</code> → Child's{" "}
              <code>position: fixed</code> is relative to parent, not viewport.
              Portal renders child at document root where{" "}
              <code>position: fixed</code> works as expected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterClimax({
  isGateOpen,
  setIsGateOpen,
}: {
  isGateOpen: boolean;
  setIsGateOpen: (value: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed">
          Hawkins National Laboratory. 1983. Eleven sits in the sensory
          deprivation tank, her mind reaching into the void. When she touches
          the Demogorgon, the gate tears open.
        </p>
        <p className="text-lg leading-relaxed">
          The Upside Down and the normal world are no longer separate. A portal
          has been created—a rift that connects two parallel spaces.
        </p>
      </div>

      <div className="rounded-lg border border-red-800/30 bg-red-900/20 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-500">
          <Zap className="h-5 w-5" />
          Opening the Gate
        </h3>
        <p className="mb-4 text-slate-300">
          Here's the syntax—the incantation that tears a hole between the React
          tree and the DOM tree:
        </p>
        <div className="mb-4 overflow-x-auto rounded bg-slate-950 p-4 font-mono text-sm">
          <pre className="text-emerald-400">
            {`import { createPortal } from 'react-dom';

function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Settings
      </button>
      
      {isOpen && createPortal(
        <SettingsModal onClose={() => setIsOpen(false)} />,
        document.body  // ← The gate location
      )}
    </>
  );
}`}
          </pre>
        </div>
        <p className="text-slate-300">
          The modal is a child of <code>SettingsButton</code> in the React tree.
          But in the actual DOM, it's rendered as a direct child of{" "}
          <code>&lt;body&gt;</code>. This is the gate.
        </p>
      </div>

      <div className="rounded-lg border border-slate-700/30 bg-slate-900/40 p-6">
        <h3 className="mb-4 text-xl font-bold text-amber-500">
          Interactive Gate Control
        </h3>
        <p className="mb-4 text-slate-300">
          Click the button to open or close the gate. Watch how the portal
          mounts and unmounts:
        </p>
        <button
          onClick={() => setIsGateOpen(!isGateOpen)}
          className={`rounded border px-6 py-3 transition-all ${
            isGateOpen
              ? "animate-pulse border-red-500 bg-red-600/60 text-slate-100"
              : "border-red-800/50 bg-red-900/40 text-slate-300"
          }`}
        >
          {isGateOpen ? "Close the Gate" : "Open the Gate"}
        </button>

        {isGateOpen &&
          createPortal(
            <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-red-950/80 backdrop-blur-sm">
              <div className="max-w-md rounded-lg border-2 border-red-500 bg-slate-900 p-8 shadow-2xl shadow-red-500/20">
                <h4 className="mb-4 text-2xl font-bold text-red-500">
                  The Gate is Open
                </h4>
                <p className="mb-4 text-slate-300">
                  This component is rendered through a portal. It's logically a
                  child of the button that opened it, but physically it's
                  rendered at <code>document.body</code>.
                </p>
                <p className="mb-6 text-sm text-slate-400">
                  Check your browser's DevTools—you'll see this element is
                  outside the main React root, but events still bubble through
                  the React tree.
                </p>
                <button
                  onClick={() => setIsGateOpen(false)}
                  className="w-full rounded bg-red-600 px-4 py-2 text-slate-100 transition-colors hover:bg-red-700"
                >
                  Close Gate
                </button>
              </div>
            </div>,
            document.body,
          )}

        <div className="mt-6 rounded border border-slate-700/30 bg-slate-950 p-4">
          <p className="mb-2 text-sm text-slate-400">Gate Status:</p>
          <p
            className={`text-lg font-bold ${
              isGateOpen ? "text-red-500" : "text-slate-500"
            }`}
          >
            {isGateOpen ? "OPEN (Portal Active)" : "CLOSED (Portal Unmounted)"}
          </p>
        </div>
      </div>

      <div className="rounded-lg border border-red-800/30 bg-red-900/20 p-6">
        <h3 className="mb-4 text-xl font-bold text-red-500">
          The Three Guarantees
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-bold text-slate-200">
              1. Props Flow Through the Portal
            </h4>
            <p className="text-slate-300">
              The portal doesn't break React data flow. Props go down, events
              come up, just like normal.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-bold text-slate-200">
              2. Events Bubble Through the React Tree
            </h4>
            <p className="text-slate-300">
              Even though the component is rendered at{" "}
              <code>document.body</code>, clicks bubble up through the React
              tree to parent handlers.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-bold text-slate-200">
              3. Context Flows Through the Portal
            </h4>
            <p className="text-slate-300">
              Components rendered through portals can access context from their
              React ancestors, even though they're physically rendered
              elsewhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChapterResolution() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed">
          Season 2. The gate is still open. The Demogorgon is dead, but the rift
          remains. The Upside Down is bleeding into Hawkins. The gate must be
          closed.
        </p>
        <p className="text-lg leading-relaxed">
          Eleven returns. She descends into the tunnels beneath Hawkins Lab,
          stands before the gate, and with all her power, she seals it shut. The
          portal closes. The dimensions separate.
        </p>
      </div>

      <div className="rounded-lg border border-red-800/30 bg-red-900/20 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-500">
          <AlertTriangle className="h-5 w-5" />
          The Danger of Open Gates
        </h3>
        <p className="mb-4 text-slate-300">
          If you're not careful with portal management, you'll create memory
          leaks, zombie components, and monsters in the normal world.
        </p>
        <div className="overflow-x-auto rounded bg-slate-950 p-4 font-mono text-sm">
          <pre className="text-red-400">
            {`// ❌ DANGER: Gate left open
function BadModal() {
  useEffect(() => {
    const modalRoot = document.createElement('div');
    document.body.appendChild(modalRoot);
    
    // Portal created, but never cleaned up!
    // The modalRoot div stays in the DOM forever
  }, []);
  
  return createPortal(<div>Modal</div>, modalRoot);
}`}
          </pre>
        </div>
      </div>

      <div className="rounded-lg border border-slate-700/30 bg-slate-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-emerald-500">
          <CheckCircle className="h-5 w-5" />
          The Correct Pattern
        </h3>
        <p className="mb-4 text-slate-300">
          Controlled portal lifecycle with proper cleanup:
        </p>
        <div className="overflow-x-auto rounded bg-slate-950 p-4 font-mono text-sm">
          <pre className="text-emerald-400">
            {`function SettingsModal({ isOpen, onClose }) {
  // Only render the portal when needed
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" 
           onClick={e => e.stopPropagation()}>
        <h2>Settings</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Settings
      </button>
      <SettingsModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}`}
          </pre>
        </div>
        <div className="mt-4 space-y-2">
          <p className="text-slate-300">
            <strong>What makes this correct:</strong>
          </p>
          <ul className="list-inside list-disc space-y-1 text-slate-300">
            <li>Conditional rendering—portal only exists when needed</li>
            <li>No manual DOM manipulation</li>
            <li>Clean unmounting when isOpen becomes false</li>
            <li>Fresh closures on every render</li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-red-800/30 bg-red-900/20 p-6">
        <h3 className="mb-4 text-xl font-bold text-red-500">
          Advanced: useEffect Cleanup
        </h3>
        <p className="mb-4 text-slate-300">
          For more complex portal management with custom containers:
        </p>
        <div className="overflow-x-auto rounded bg-slate-950 p-4 font-mono text-sm">
          <pre className="text-emerald-400">
            {`function AdvancedModal({ isOpen, children }) {
  const [modalRoot] = useState(() => {
    const div = document.createElement('div');
    div.className = 'modal-container';
    return div;
  });
  
  useEffect(() => {
    // Open the gate
    document.body.appendChild(modalRoot);
    
    // Return cleanup function to close the gate
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, [modalRoot]);
  
  if (!isOpen) return null;
  
  return createPortal(children, modalRoot);
}`}
          </pre>
        </div>
        <p className="mt-4 text-slate-300">
          The useEffect cleanup function runs when the component unmounts,
          removing the portal container from the DOM. The gate seals.
        </p>
      </div>
    </div>
  );
}

function ChapterSummary() {
  return (
    <div className="space-y-6">
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed">
          Will Byers is home, but he's not the same. He's been to the Upside
          Down and back. He exists in both worlds now—physically in Hawkins, but
          forever connected to that parallel dimension.
        </p>
        <p className="text-lg leading-relaxed">
          He's in-between. And that's exactly what React Portals are: components
          that exist in-between the React tree and the DOM tree, maintaining
          connections to both worlds.
        </p>
      </div>

      <div className="rounded-lg border border-red-800/30 bg-red-900/20 p-6">
        <h3 className="mb-4 text-xl font-bold text-red-500">The Core Truth</h3>
        <p className="text-lg text-slate-300">
          <strong>
            A React Portal is a component that renders in a different part of
            the DOM tree while maintaining its position in the React component
            tree.
          </strong>
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-emerald-700/30 bg-slate-900/40 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-emerald-500">
            <CheckCircle className="h-5 w-5" />
            When to Use Portals
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li>✓ Modals and Dialogs</li>
            <li>✓ Tooltips and Popovers</li>
            <li>✓ Notifications and Toasts</li>
            <li>✓ Dropdown Menus</li>
            <li>✓ Full-Screen Overlays</li>
          </ul>
        </div>

        <div className="rounded-lg border border-red-700/30 bg-slate-900/40 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-red-500">
            <AlertTriangle className="h-5 w-5" />
            When NOT to Use Portals
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li>✗ Normal component rendering</li>
            <li>✗ Avoiding prop drilling</li>
            <li>✗ Breaking encapsulation</li>
            <li>✗ Server-side rendering</li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-red-800/30 bg-red-900/20 p-6">
        <h3 className="mb-4 text-xl font-bold text-red-500">Quick Reference</h3>
        <div className="overflow-x-auto rounded bg-slate-950 p-4 font-mono text-sm">
          <pre className="text-emerald-400">
            {`import { createPortal } from 'react-dom';

// Basic syntax
createPortal(child, container)

// Common pattern
function Modal({ isOpen, children }) {
  if (!isOpen) return null;
  return createPortal(children, document.body);
}

// With custom container
const modalRoot = document.getElementById('modal-root');
createPortal(<Modal />, modalRoot);

// With cleanup
useEffect(() => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return () => document.body.removeChild(div);
}, []);`}
          </pre>
        </div>
      </div>

      <div className="rounded-lg border border-amber-700/30 bg-slate-900/40 p-6">
        <h3 className="mb-4 text-xl font-bold text-amber-500">
          The Three Escape Hatches
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 font-bold text-slate-200">
              1. The Overflow Trap
            </h4>
            <p className="text-slate-300">
              Parent has <code>overflow: hidden</code> → Portal renders child at
              document root, escaping the overflow container.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-bold text-slate-200">
              2. The Z-Index Stack
            </h4>
            <p className="text-slate-300">
              Parent has <code>z-index: 1</code> → Portal renders child in a new
              stacking context at document root.
            </p>
          </div>
          <div>
            <h4 className="mb-2 font-bold text-slate-200">
              3. The Position Context
            </h4>
            <p className="text-slate-300">
              Parent has <code>transform</code> → Portal renders child at
              document root where <code>position: fixed</code> works as
              expected.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-red-800/30 bg-red-900/20 p-6 text-center">
        <p className="mb-2 text-2xl font-bold text-red-500">
          "He's not gone. He's just rendering somewhere else."
        </p>
        <p className="text-slate-400">
          The gate is yours to control. Use it well.
        </p>
      </div>
    </div>
  );
}

function ChristmasLights({
  message,
  onLightClick,
  onClear,
}: {
  message: string;
  onLightClick: (letter: string) => void;
  onClear: () => void;
}) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="rounded-lg border border-amber-700/30 bg-slate-900/40 p-6">
      <h3 className="mb-4 text-xl font-bold text-amber-500">
        Joyce's Christmas Lights
      </h3>
      <p className="mb-4 text-slate-300">
        Click the lights to send a message. Notice how events bubble through the
        portal—even though the lights are rendered elsewhere, the parent
        component receives the clicks.
      </p>

      <div className="mb-6 rounded border border-slate-700/30 bg-slate-950 p-4">
        <p className="mb-2 text-sm text-slate-400">
          Message from the Upside Down:
        </p>
        <p className="min-h-[2rem] text-2xl font-bold text-amber-500">
          {message || "(click lights to spell)"}
        </p>
      </div>

      <div className="md:grid-cols-13 mb-4 grid grid-cols-7 gap-2 sm:grid-cols-9">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => onLightClick(letter)}
            className="flex aspect-square items-center justify-center rounded border border-amber-700/50 bg-amber-900/20 text-sm font-bold text-amber-500 transition-all hover:border-amber-500 hover:bg-amber-600/40 hover:shadow-lg hover:shadow-amber-500/20"
          >
            {letter}
          </button>
        ))}
      </div>

      <button
        onClick={onClear}
        className="rounded border border-red-800/50 bg-red-900/40 px-4 py-2 text-slate-300 transition-all hover:border-red-700 hover:bg-red-900/60"
      >
        Clear Message
      </button>
    </div>
  );
}

function OverflowDemo({ showPortalVersion }: { showPortalVersion: boolean }) {
  const [showModal, setShowModal] = useState(false);

  const modalContent = (
    <div className="absolute left-1/2 top-1/2 z-50 w-64 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-red-500 bg-slate-900 p-6 shadow-2xl">
      <h4 className="mb-2 text-lg font-bold text-red-500">Modal Dialog</h4>
      <p className="mb-4 text-sm text-slate-300">
        {showPortalVersion
          ? "This modal is rendered through a portal at document.body. It escapes the overflow container!"
          : "This modal is rendered normally. It's clipped by the parent's overflow: hidden."}
      </p>
      <button
        onClick={() => setShowModal(false)}
        className="w-full rounded bg-red-600 px-3 py-1 text-sm text-slate-100 transition-colors hover:bg-red-700"
      >
        Close
      </button>
    </div>
  );

  return (
    <div className="relative">
      <div className="h-64 overflow-hidden rounded-lg border border-slate-700/30 bg-slate-950 p-4">
        <p className="mb-4 text-sm text-slate-400">
          Container with <code>overflow: hidden</code>
        </p>
        <div className="space-y-2">
          <div className="h-8 rounded bg-slate-800/50"></div>
          <div className="h-8 rounded bg-slate-800/50"></div>
          <div className="h-8 rounded bg-slate-800/50"></div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 rounded border border-red-700 bg-red-900/60 px-4 py-2 text-slate-100 transition-all hover:bg-red-900/80"
        >
          Open Modal
        </button>

        {showModal && !showPortalVersion && modalContent}
      </div>

      {showModal &&
        showPortalVersion &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-950/60 backdrop-blur-sm">
            {modalContent}
          </div>,
          document.body,
        )}
    </div>
  );
}
