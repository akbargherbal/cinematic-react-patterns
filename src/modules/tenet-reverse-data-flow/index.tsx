import { useState, useCallback, useMemo } from "react";
import { ArrowDown, ArrowUp, AlertTriangle, CheckCircle, Zap } from "lucide-react";

// Type definitions
interface Chapter {
  id: string;
  title: string;
  content: string;
}

interface ArrowProps {
  direction: "down" | "up";
  color: "blue" | "red";
  animated?: boolean;
  label?: string;
}

interface CodeBlockProps {
  code: string;
  highlight?: boolean;
}

// Helper Components
const Arrow: React.FC<ArrowProps> = ({ direction, color, animated = false, label }) => {
  const colorClass = color === "blue" ? "text-blue-500" : "text-red-500";
  const Icon = direction === "down" ? ArrowDown : ArrowUp;
  
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      <Icon 
        className={`w-8 h-8 ${colorClass} ${animated ? 'animate-pulse' : ''}`}
        strokeWidth={3}
      />
      {label && (
        <span className={`text-xs ${colorClass} font-mono`}>
          {label}
        </span>
      )}
    </div>
  );
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, highlight = false }) => {
  return (
    <pre className={`p-4 rounded-lg font-mono text-sm overflow-x-auto ${
      highlight 
        ? 'bg-emerald-950/30 border border-emerald-500/30' 
        : 'bg-slate-900/50 border border-slate-700/30'
    }`}>
      <code className="text-slate-300">{code}</code>
    </pre>
  );
};

// Main Component
export default function TenetReverseDataFlow() {
  const [chapter, setChapter] = useState(0);
  
  // Chapter 1 Demo State
  const [ch1ParentValue, setCh1ParentValue] = useState("Hello from Parent");
  
  // Chapter 2 Demo State
  const [ch2Mode, setCh2Mode] = useState<"normal" | "inverted">("normal");
  const [ch2ParentValue, setCh2ParentValue] = useState("");
  
  // Chapter 3 Demo State
  const [ch3ParentCount, setCh3ParentCount] = useState(0);
  const [ch3ChildCount, setCh3ChildCount] = useState(0);
  
  // Chapter 4 Demo State
  const [ch4FormData, setCh4FormData] = useState({ name: "", email: "" });
  
  // Chapter 5 Demo State
  const [ch5WrongParent, setCh5WrongParent] = useState("Initial");
  const [ch5WrongChild, setCh5WrongChild] = useState("Initial");
  const [ch5RightValue, setCh5RightValue] = useState("Initial");

  // Chapters data
  const chapters: Chapter[] = [
    {
      id: "intro",
      title: "Don't Try to Understand It",
      content: `The Protagonist stands in the laboratory, watching a bullet leap from the wall back into the gun. Not fired—unfired. The scientist's voice echoes: "Don't try to understand it. Feel it."

This is your first encounter with inverted objects—things moving backward through time. In React, you've been living in forward time your entire development career. Data flows in one direction: parent to child. Props cascade down the component tree like water flowing downhill. Predictable. Causal. Safe.

The parent component holds the state. The child receives it as props. This is the natural order of things—the arrow of time pointing in one direction. When the parent's state changes, the child re-renders with new props. Cause precedes effect. The bullet fires forward.`
    },
    {
      id: "build",
      title: "Including My Own",
      content: `The Protagonist steps into the turnstile. The world inverts. He's moving backward through time now, watching events unfold in reverse. He sees the explosion before the bomb is planted. Effects precede causes.

This is what happens when you try to make data flow backward in React.

The naive approach: give the child its own state. Let it manage itself. But how does it tell the parent about changes? Can it reach up and modify parent state? This is moving backward through time without understanding the rules.

The parent gives the child a callback—a function prop. This is the inverted bullet. The child doesn't fire it upward. The child catches it, and the parent has already prepared to receive the impact.`
    },
    {
      id: "climax",
      title: "Temporal Pincer Movement",
      content: `The plan is audacious: a temporal pincer movement. Two teams. One moving forward through time (red team). One moving backward through time (blue team). They converge on the target from opposite temporal directions.

This is bidirectional data flow in React. And it's where everything breaks.

The parent component is the red team, moving forward. It owns the state. It passes props down. Normal causality. The child component is the blue team, moving backward. It needs to update the parent's state. Inverted causality.

Watch what happens when both teams try to control the same state. The parent updates its state. The child doesn't see it—it's using its own state. The child updates its state. The parent doesn't see it. They're in different timelines now. Desynchronized. Entropy is building.

Race conditions. Stale closures. Infinite loops. The temporal pincer is collapsing.`
    },
    {
      id: "resolution",
      title: "Ignorance Is Our Ammunition",
      content: `The temporal pincer works. Not because both teams control the timeline, but because they trust the plan. Each team has a role. They don't try to control each other. They coordinate.

This is the solution in React: lifting state up and controlled components.

The parent owns the state. The parent is the single source of truth. The child receives props and callbacks. The child is controlled by the parent. The child doesn't own state—it receives it. The child doesn't change state directly—it triggers callbacks.

This isn't true bidirectional flow. This is two coordinated unidirectional flows. Props flowing down. Callbacks flowing up. They meet at the child component, coordinate, and the mission succeeds.

The child never owns the state. It's controlled. Like the Protagonist in the final battle—inverted, moving backward, but following the plan.`
    },
    {
      id: "summary",
      title: "What's Happened, Happened",
      content: `The Protagonist sits in the aftermath, understanding the rules of temporal warfare. You can't change what's happened. You can only move through time and coordinate.

React's data flow rules are the same. React enforces unidirectional data flow: parent to child, via props. This is the arrow of time. This is causality.

When you need a child to "send data up," you're not reversing the flow. You're creating a temporal pincer—two coordinated unidirectional flows. Props flow down. Callbacks flow up. Updated props flow down again.

The child never owns the state. The child is controlled. This isn't a limitation. This is what makes React predictable. This prevents temporal paradoxes. This keeps your application from exploding.

Don't try to understand it. Feel it. Then implement it correctly.`
    }
  ];

  const currentChapter = chapters[chapter];
  
  // Calculate entropy for Chapter 3
  const entropy = useMemo(() => {
    return Math.abs(ch3ParentCount - ch3ChildCount);
  }, [ch3ParentCount, ch3ChildCount]);

  // Callbacks
  const handleCh2ChildChange = useCallback((value: string) => {
    setCh2ParentValue(value);
  }, []);

  const handleCh4NameChange = useCallback((value: string) => {
    setCh4FormData(prev => ({ ...prev, name: value }));
  }, []);

  const handleCh4EmailChange = useCallback((value: string) => {
    setCh4FormData(prev => ({ ...prev, email: value }));
  }, []);

  const handleCh5RightChange = useCallback((value: string) => {
    setCh5RightValue(value);
  }, []);

  // Demo Components
  const Chapter1Demo = () => (
    <div className="space-y-6">
      <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-400 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Unidirectional Flow
        </h3>
        
        <div className="space-y-4">
          {/* Parent Component */}
          <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-4">
            <div className="text-sm font-mono text-blue-400 mb-2">Parent Component</div>
            <div className="text-xs text-slate-400 mb-3">State: "{ch1ParentValue}"</div>
            <button
              onClick={() => setCh1ParentValue(prev => prev === "Hello from Parent" ? "State Updated!" : "Hello from Parent")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
            >
              Change State
            </button>
          </div>

          <Arrow direction="down" color="blue" animated label="Props Flow Down" />

          {/* Child Component */}
          <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-4">
            <div className="text-sm font-mono text-slate-400 mb-2">Child Component</div>
            <div className="text-sm text-slate-300">
              Received prop: <span className="text-blue-400 font-semibold">"{ch1ParentValue}"</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-800/30 rounded text-xs text-slate-400">
          <strong className="text-blue-400">Normal Time Flow:</strong> Parent owns state, child receives props. 
          Data flows in one direction. Predictable. Causal.
        </div>
      </div>
    </div>
  );

  const Chapter2Demo = () => (
    <div className="space-y-6">
      <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-6">
        <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5" />
          The Turnstile
        </h3>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setCh2Mode("normal")}
            className={`px-4 py-2 rounded text-sm transition-colors ${
              ch2Mode === "normal"
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Normal Time
          </button>
          <button
            onClick={() => setCh2Mode("inverted")}
            className={`px-4 py-2 rounded text-sm transition-colors ${
              ch2Mode === "inverted"
                ? "bg-red-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
          >
            Inverted Time
          </button>
        </div>

        {ch2Mode === "normal" ? (
          <div className="space-y-4">
            <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-4">
              <div className="text-sm font-mono text-blue-400 mb-2">Parent (Normal)</div>
              <div className="text-xs text-slate-400">Passes static prop down</div>
            </div>
            <Arrow direction="down" color="blue" label="Props" />
            <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-4">
              <div className="text-sm font-mono text-slate-400 mb-2">Child (Normal)</div>
              <div className="text-sm text-slate-300">Displays: "Static Value"</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
              <div className="text-sm font-mono text-red-400 mb-2">Parent (Inverted)</div>
              <div className="text-xs text-slate-400 mb-2">State: "{ch2ParentValue || '(empty)'}"</div>
              <div className="text-xs text-slate-500">Receives callback trigger from child</div>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <Arrow direction="down" color="blue" label="Props + Callback" />
              <Arrow direction="up" color="red" animated label="Callback Trigger" />
            </div>

            <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-4">
              <div className="text-sm font-mono text-slate-400 mb-2">Child (Inverted)</div>
              <input
                type="text"
                value={ch2ParentValue}
                onChange={(e) => handleCh2ChildChange(e.target.value)}
                placeholder="Type to trigger callback..."
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-slate-300 text-sm focus:outline-none focus:border-red-500"
              />
              <div className="text-xs text-slate-500 mt-2">
                Child triggers parent's callback, parent updates state, new props flow down
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const Chapter3Demo = () => (
    <div className="space-y-6">
      <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-6">
        <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Temporal Pincer Chaos
        </h3>

        <div className="mb-4 p-3 bg-amber-950/20 border border-amber-500/30 rounded">
          <div className="text-sm font-bold text-amber-400 mb-1">Entropy Level: {entropy}</div>
          <div className="text-xs text-slate-400">
            {entropy === 0 ? "Synchronized" : entropy < 5 ? "Diverging..." : "DESYNCHRONIZED!"}
          </div>
          <div className="mt-2 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${Math.min(entropy * 10, 100)}%` }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {/* Parent with its own state */}
          <div className="bg-red-950/30 border border-red-500/30 rounded-lg p-4">
            <div className="text-sm font-mono text-red-400 mb-2">Parent (Red Team - Forward)</div>
            <div className="text-xs text-slate-400 mb-3">Own State: {ch3ParentCount}</div>
            <button
              onClick={() => setCh3ParentCount(prev => prev + 1)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition-colors"
            >
              Increment Parent
            </button>
          </div>

          <div className="flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-amber-500 animate-pulse" />
          </div>

          {/* Child with its own state */}
          <div className="bg-blue-950/30 border border-blue-500/30 rounded-lg p-4">
            <div className="text-sm font-mono text-blue-400 mb-2">Child (Blue Team - Backward)</div>
            <div className="text-xs text-slate-400 mb-3">Own State: {ch3ChildCount}</div>
            <button
              onClick={() => setCh3ChildCount(prev => prev + 1)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors"
            >
              Increment Child
            </button>
          </div>
        </div>

        <div className="mt-4 p-3 bg-amber-950/20 border border-amber-500/30 rounded text-xs text-slate-400">
          <strong className="text-amber-400">Anti-Pattern:</strong> Both parent and child own separate state. 
          They will desynchronize. This is the temporal pincer collapsing.
        </div>
      </div>
    </div>
  );

  const Chapter4Demo = () => (
    <div className="space-y-6">
      <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-6">
        <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Controlled Components
        </h3>

        <div className="space-y-4">
          {/* Parent owns all state */}
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-lg p-4">
            <div className="text-sm font-mono text-emerald-400 mb-2">Parent (Single Source of Truth)</div>
            <div className="text-xs text-slate-400 mb-2">
              State: {`{ name: "${ch4FormData.name}", email: "${ch4FormData.email}" }`}
            </div>
            <div className="text-xs text-slate-500">
              Parent owns state, passes it down with callbacks
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Arrow direction="down" color="blue" label="Props + Callbacks" />
            <Arrow direction="up" color="red" label="Triggers" />
          </div>

          {/* Controlled child form */}
          <div className="bg-slate-800/50 border border-slate-600/30 rounded-lg p-4">
            <div className="text-sm font-mono text-slate-400 mb-3">Child (Controlled)</div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Name</label>
                <input
                  type="text"
                  value={ch4FormData.name}
                  onChange={(e) => handleCh4NameChange(e.target.value)}
                  placeholder="Enter name..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-slate-300 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Email</label>
                <input
                  type="email"
                  value={ch4FormData.email}
                  onChange={(e) => handleCh4EmailChange(e.target.value)}
                  placeholder="Enter email..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-slate-300 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="text-xs text-slate-500 mt-3">
              Child is fully controlled. No local state. Triggers callbacks on change.
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-emerald-950/20 border border-emerald-500/30 rounded text-xs text-slate-400">
          <strong className="text-emerald-400">Correct Pattern:</strong> Parent owns state. Child is controlled. 
          Coordinated unidirectional flows. The temporal pincer succeeds.
        </div>
      </div>
    </div>
  );

  const Chapter5Demo = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Wrong Pattern */}
        <div className="bg-red-950/20 border border-red-500/30 rounded-lg p-4">
          <h4 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Anti-Pattern: Dual Ownership
          </h4>
          
          <div className="space-y-3">
            <div className="bg-slate-900/50 rounded p-3">
              <div className="text-xs text-slate-500 mb-2">Parent State: {ch5WrongParent}</div>
              <button
                onClick={() => setCh5WrongParent("Parent Updated")}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
              >
                Update Parent
              </button>
            </div>

            <div className="text-center text-xs text-slate-600">↕ Desynchronized</div>

            <div className="bg-slate-900/50 rounded p-3">
              <div className="text-xs text-slate-500 mb-2">Child State: {ch5WrongChild}</div>
              <button
                onClick={() => setCh5WrongChild("Child Updated")}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs"
              >
                Update Child
              </button>
            </div>
          </div>

          <CodeBlock
            code={`// WRONG
function Parent() {
  const [value, setValue] = useState('');
  return <Child initial={value} />;
}

function Child({ initial }) {
  const [value, setValue] = useState(initial);
  // Two sources of truth!
}`}
          />
        </div>

        {/* Right Pattern */}
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-4">
          <h4 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Correct Pattern: Lifted State
          </h4>
          
          <div className="space-y-3">
            <div className="bg-slate-900/50 rounded p-3">
              <div className="text-xs text-slate-500 mb-2">Parent State: {ch5RightValue}</div>
              <button
                onClick={() => handleCh5RightChange("Parent Updated")}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs"
              >
                Update via Parent
              </button>
            </div>

            <div className="text-center text-xs text-emerald-500">↕ Synchronized</div>

            <div className="bg-slate-900/50 rounded p-3">
              <div className="text-xs text-slate-500 mb-2">Child Props: {ch5RightValue}</div>
              <button
                onClick={() => handleCh5RightChange("Child Triggered")}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs"
              >
                Update via Callback
              </button>
            </div>
          </div>

          <CodeBlock
            code={`// RIGHT
function Parent() {
  const [value, setValue] = useState('');
  return <Child value={value} onChange={setValue} />;
}

function Child({ value, onChange }) {
  // Controlled component
  // Single source of truth
}`}
            highlight
          />
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-700/30 rounded-lg p-4">
        <h4 className="text-sm font-bold text-slate-300 mb-2">Key Takeaways</h4>
        <ul className="space-y-2 text-xs text-slate-400">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>React enforces unidirectional data flow (parent → child)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>"Bidirectional" flow is actually two coordinated unidirectional flows</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Callbacks aren't reverse data flow—they're instructions flowing up</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Always maintain a single source of truth (lift state up)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Controlled components prevent temporal paradoxes</span>
          </li>
        </ul>
      </div>
    </div>
  );

  // Render appropriate demo based on chapter
  const renderDemo = () => {
    switch (chapter) {
      case 0:
        return <Chapter1Demo />;
      case 1:
        return <Chapter2Demo />;
      case 2:
        return <Chapter3Demo />;
      case 3:
        return <Chapter4Demo />;
      case 4:
        return <Chapter5Demo />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-2">
            Tenet: Reverse Data Flow
          </h1>
          <p className="text-base sm:text-lg text-slate-400">
            The Protagonist, Temporal Warfare, 2020
          </p>
          <p className="text-sm text-blue-400 mt-1">
            Concept: Bidirectional Data Flow Patterns
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-32">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Narrative Column */}
          <div className="space-y-6">
            <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">
                {currentChapter.title}
              </h2>
              <div className="prose prose-invert prose-slate max-w-none">
                {currentChapter.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-slate-300 leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Demo Column */}
          <div className="space-y-6">
            {renderDemo()}
          </div>
        </div>
      </main>

      {/* Chapter Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setChapter(c => c - 1)}
              disabled={chapter === 0}
              className="px-4 sm:px-6 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-300 rounded transition-colors text-sm font-medium"
              aria-label="Previous chapter"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400 hidden sm:inline">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <span className="text-xs text-slate-500 sm:hidden">
                {chapter + 1}/{chapters.length}
              </span>
              <div className="flex gap-1 ml-2">
                {chapters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChapter(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === chapter ? 'bg-blue-500' : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Go to chapter ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setChapter(c => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded transition-colors text-sm font-medium"
              aria-label="Next chapter"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}