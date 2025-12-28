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
    []
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
    <div className="min-h-screen bg-red-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-red-900/30 bg-red-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl md:text-4xl font-bold text-red-500 uppercase tracking-wide">
              Stranger Things
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Portal Rendering • React Portals
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12 pb-32">
        {/* Chapter Header */}
        <div className="mb-8">
          <div className="text-sm text-red-500 uppercase tracking-wider mb-2">
            Chapter {chapter + 1} of {chapters.length}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2">
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
      <footer className="fixed bottom-0 left-0 right-0 bg-red-950/95 backdrop-blur-sm border-t border-red-900/30 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={chapter === 0}
              className="px-6 py-2 bg-red-900/40 text-slate-300 rounded border border-red-800/50 hover:bg-red-900/60 hover:border-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>

            <span className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </span>

            <button
              onClick={handleNext}
              disabled={chapter === chapters.length - 1}
              className="px-6 py-2 bg-red-900/40 text-slate-300 rounded border border-red-800/50 hover:bg-red-900/60 hover:border-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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

      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
          <Code className="w-5 h-5" />
          The Core Concept
        </h3>
        <p className="text-slate-300 mb-4">
          <strong>The Upside Down is not another world.</strong> It's the same
          world, the same Hawkins—but rendered in a different space. A parallel
          DOM tree.
        </p>
        <p className="text-slate-300">
          When you build a React application, you create a component tree. But
          the React component tree and the DOM tree are not the same thing.
          Sometimes, you need to render content outside the normal component
          hierarchy—like a modal that appears on top of everything, or a
          tooltip that escapes overflow constraints.
        </p>
      </div>

      <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-amber-500 mb-4">
          The Problem: Trapped Components
        </h3>
        <p className="text-slate-300 mb-4">
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

      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-500 mb-4">
          The Solution: React Portals
        </h3>
        <p className="text-slate-300 mb-4">
          <strong>React Portals</strong> are the gates between dimensions. They
          allow you to render a component in a different part of the DOM tree
          while maintaining its position in the React component tree.
        </p>
        <div className="bg-slate-950 rounded p-4 font-mono text-sm overflow-x-auto">
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
        <p className="text-slate-300 mt-4">
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

      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          The Overflow Trap
        </h3>
        <p className="text-slate-300 mb-6">
          Watch what happens when you try to render a modal inside a container
          with <code>overflow: hidden</code>. The modal gets clipped by its
          parent's boundaries—it can't escape.
        </p>

        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setShowPortalVersion(false)}
            className={`px-4 py-2 rounded border transition-all ${
              !showPortalVersion
                ? "bg-red-900/60 border-red-700 text-slate-100"
                : "bg-red-900/20 border-red-800/30 text-slate-400"
            }`}
          >
            Normal Render
          </button>
          <button
            onClick={() => setShowPortalVersion(true)}
            className={`px-4 py-2 rounded border transition-all ${
              showPortalVersion
                ? "bg-red-900/60 border-red-700 text-slate-100"
                : "bg-red-900/20 border-red-800/30 text-slate-400"
            }`}
          >
            Portal Render
          </button>
        </div>

        <OverflowDemo showPortalVersion={showPortalVersion} />
      </div>

      <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-amber-500 mb-4">
          Three Problems Portals Solve
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-slate-200 mb-2">
              1. The Overflow Trap
            </h4>
            <p className="text-slate-300">
              Parent has <code>overflow: hidden</code> → Child gets clipped.
              Portal renders child at document root, escaping the overflow
              container.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-2">
              2. The Z-Index Stack
            </h4>
            <p className="text-slate-300">
              Parent has <code>z-index: 1</code> → Child can't appear above
              siblings with <code>z-index: 2</code>. Portal renders child in a
              new stacking context.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-2">
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

      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Opening the Gate
        </h3>
        <p className="text-slate-300 mb-4">
          Here's the syntax—the incantation that tears a hole between the React
          tree and the DOM tree:
        </p>
        <div className="bg-slate-950 rounded p-4 font-mono text-sm overflow-x-auto mb-4">
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
          The modal is a child of <code>SettingsButton</code> in the React
          tree. But in the actual DOM, it's rendered as a direct child of{" "}
          <code>&lt;body&gt;</code>. This is the gate.
        </p>
      </div>

      <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-amber-500 mb-4">
          Interactive Gate Control
        </h3>
        <p className="text-slate-300 mb-4">
          Click the button to open or close the gate. Watch how the portal
          mounts and unmounts:
        </p>
        <button
          onClick={() => setIsGateOpen(!isGateOpen)}
          className={`px-6 py-3 rounded border transition-all ${
            isGateOpen
              ? "bg-red-600/60 border-red-500 text-slate-100 animate-pulse"
              : "bg-red-900/40 border-red-800/50 text-slate-300"
          }`}
        >
          {isGateOpen ? "Close the Gate" : "Open the Gate"}
        </button>

        {isGateOpen &&
          createPortal(
            <div className="fixed inset-0 bg-red-950/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
              <div className="bg-slate-900 border-2 border-red-500 rounded-lg p-8 max-w-md shadow-2xl shadow-red-500/20">
                <h4 className="text-2xl font-bold text-red-500 mb-4">
                  The Gate is Open
                </h4>
                <p className="text-slate-300 mb-4">
                  This component is rendered through a portal. It's logically a
                  child of the button that opened it, but physically it's
                  rendered at <code>document.body</code>.
                </p>
                <p className="text-slate-400 text-sm mb-6">
                  Check your browser's DevTools—you'll see this element is
                  outside the main React root, but events still bubble through
                  the React tree.
                </p>
                <button
                  onClick={() => setIsGateOpen(false)}
                  className="w-full px-4 py-2 bg-red-600 text-slate-100 rounded hover:bg-red-700 transition-colors"
                >
                  Close Gate
                </button>
              </div>
            </div>,
            document.body
          )}

        <div className="mt-6 p-4 bg-slate-950 rounded border border-slate-700/30">
          <p className="text-sm text-slate-400 mb-2">Gate Status:</p>
          <p
            className={`text-lg font-bold ${
              isGateOpen ? "text-red-500" : "text-slate-500"
            }`}
          >
            {isGateOpen ? "OPEN (Portal Active)" : "CLOSED (Portal Unmounted)"}
          </p>
        </div>
      </div>

      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-500 mb-4">
          The Three Guarantees
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-slate-200 mb-2">
              1. Props Flow Through the Portal
            </h4>
            <p className="text-slate-300">
              The portal doesn't break React data flow. Props go down, events
              come up, just like normal.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-2">
              2. Events Bubble Through the React Tree
            </h4>
            <p className="text-slate-300">
              Even though the component is rendered at <code>document.body</code>
              , clicks bubble up through the React tree to parent handlers.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-2">
              3. Context Flows Through the Portal
            </h4>
            <p className="text-slate-300">
              Components rendered through portals can access context from their
              React ancestors, even though they're physically rendered elsewhere.
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
          Season 2. The gate is still open. The Demogorgon is dead, but the
          rift remains. The Upside Down is bleeding into Hawkins. The gate must
          be closed.
        </p>
        <p className="text-lg leading-relaxed">
          Eleven returns. She descends into the tunnels beneath Hawkins Lab,
          stands before the gate, and with all her power, she seals it shut.
          The portal closes. The dimensions separate.
        </p>
      </div>

      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          The Danger of Open Gates
        </h3>
        <p className="text-slate-300 mb-4">
          If you're not careful with portal management, you'll create memory
          leaks, zombie components, and monsters in the normal world.
        </p>
        <div className="bg-slate-950 rounded p-4 font-mono text-sm overflow-x-auto">
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

      <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-emerald-500 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          The Correct Pattern
        </h3>
        <p className="text-slate-300 mb-4">
          Controlled portal lifecycle with proper cleanup:
        </p>
        <div className="bg-slate-950 rounded p-4 font-mono text-sm overflow-x-auto">
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
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            <li>Conditional rendering—portal only exists when needed</li>
            <li>No manual DOM manipulation</li>
            <li>Clean unmounting when isOpen becomes false</li>
            <li>Fresh closures on every render</li>
          </ul>
        </div>
      </div>

      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-500 mb-4">
          Advanced: useEffect Cleanup
        </h3>
        <p className="text-slate-300 mb-4">
          For more complex portal management with custom containers:
        </p>
        <div className="bg-slate-950 rounded p-4 font-mono text-sm overflow-x-auto">
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
        <p className="text-slate-300 mt-4">
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
          Down and back. He exists in both worlds now—physically in Hawkins,
          but forever connected to that parallel dimension.
        </p>
        <p className="text-lg leading-relaxed">
          He's in-between. And that's exactly what React Portals are:
          components that exist in-between the React tree and the DOM tree,
          maintaining connections to both worlds.
        </p>
      </div>

      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-500 mb-4">The Core Truth</h3>
        <p className="text-slate-300 text-lg">
          <strong>
            A React Portal is a component that renders in a different part of
            the DOM tree while maintaining its position in the React component
            tree.
          </strong>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-900/40 border border-emerald-700/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-emerald-500 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
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

        <div className="bg-slate-900/40 border border-red-700/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-500 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
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

      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-red-500 mb-4">Quick Reference</h3>
        <div className="bg-slate-950 rounded p-4 font-mono text-sm overflow-x-auto">
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

      <div className="bg-slate-900/40 border border-amber-700/30 rounded-lg p-6">
        <h3 className="text-xl font-bold text-amber-500 mb-4">
          The Three Escape Hatches
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-slate-200 mb-2">
              1. The Overflow Trap
            </h4>
            <p className="text-slate-300">
              Parent has <code>overflow: hidden</code> → Portal renders child at
              document root, escaping the overflow container.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-2">
              2. The Z-Index Stack
            </h4>
            <p className="text-slate-300">
              Parent has <code>z-index: 1</code> → Portal renders child in a new
              stacking context at document root.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-200 mb-2">
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

      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-6 text-center">
        <p className="text-2xl font-bold text-red-500 mb-2">
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
    <div className="bg-slate-900/40 border border-amber-700/30 rounded-lg p-6">
      <h3 className="text-xl font-bold text-amber-500 mb-4">
        Joyce's Christmas Lights
      </h3>
      <p className="text-slate-300 mb-4">
        Click the lights to send a message. Notice how events bubble through
        the portal—even though the lights are rendered elsewhere, the parent
        component receives the clicks.
      </p>

      <div className="mb-6 p-4 bg-slate-950 rounded border border-slate-700/30">
        <p className="text-sm text-slate-400 mb-2">Message from the Upside Down:</p>
        <p className="text-2xl font-bold text-amber-500 min-h-[2rem]">
          {message || "(click lights to spell)"}
        </p>
      </div>

      <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-13 gap-2 mb-4">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => onLightClick(letter)}
            className="aspect-square bg-amber-900/20 border border-amber-700/50 rounded hover:bg-amber-600/40 hover:border-amber-500 transition-all hover:shadow-lg hover:shadow-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-sm"
          >
            {letter}
          </button>
        ))}
      </div>

      <button
        onClick={onClear}
        className="px-4 py-2 bg-red-900/40 text-slate-300 rounded border border-red-800/50 hover:bg-red-900/60 hover:border-red-700 transition-all"
      >
        Clear Message
      </button>
    </div>
  );
}

function OverflowDemo({ showPortalVersion }: { showPortalVersion: boolean }) {
  const [showModal, setShowModal] = useState(false);

  const modalContent = (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border-2 border-red-500 rounded-lg p-6 shadow-2xl z-50 w-64">
      <h4 className="text-lg font-bold text-red-500 mb-2">Modal Dialog</h4>
      <p className="text-slate-300 text-sm mb-4">
        {showPortalVersion
          ? "This modal is rendered through a portal at document.body. It escapes the overflow container!"
          : "This modal is rendered normally. It's clipped by the parent's overflow: hidden."}
      </p>
      <button
        onClick={() => setShowModal(false)}
        className="w-full px-3 py-1 bg-red-600 text-slate-100 rounded text-sm hover:bg-red-700 transition-colors"
      >
        Close
      </button>
    </div>
  );

  return (
    <div className="relative">
      <div className="bg-slate-950 border border-slate-700/30 rounded-lg p-4 h-64 overflow-hidden">
        <p className="text-slate-400 text-sm mb-4">
          Container with <code>overflow: hidden</code>
        </p>
        <div className="space-y-2">
          <div className="h-8 bg-slate-800/50 rounded"></div>
          <div className="h-8 bg-slate-800/50 rounded"></div>
          <div className="h-8 bg-slate-800/50 rounded"></div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 px-4 py-2 bg-red-900/60 text-slate-100 rounded border border-red-700 hover:bg-red-900/80 transition-all"
        >
          Open Modal
        </button>

        {showModal && !showPortalVersion && modalContent}
      </div>

      {showModal &&
        showPortalVersion &&
        createPortal(
          <div className="fixed inset-0 bg-red-950/60 backdrop-blur-sm flex items-center justify-center z-50">
            {modalContent}
          </div>,
          document.body
        )}
    </div>
  );
}