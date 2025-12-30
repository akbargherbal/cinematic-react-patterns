import React, { useState, useRef, forwardRef, useEffect, useCallback } from "react";
import { Ticket, Forward, Lock, Unlock, RefreshCw, ArrowLeft, ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
  demoCode: string;
  fixedCode?: string;
}

export default function ForwardingTheGoldenTicket(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<"broken" | "fixed">("broken");
  const [focusAttempts, setFocusAttempts] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  // Refs for demonstration
  const directInputRef = useRef<HTMLInputElement>(null);
  const brokenInputRef = useRef<HTMLInputElement>(null);
  const fixedInputRef = useRef<HTMLInputElement>(null);
  const nestedTargetRef = useRef<HTMLInputElement>(null);

  const chapters: Chapter[] = [
    {
      title: "The Promise on Gilded Paper",
      content: "The Golden Ticket isn't just an invitation—it's a direct line of access. In React, a `ref` is your golden ticket to a specific DOM element. While props pass data downward, refs provide direct access to the underlying node. This chapter introduces refs as special keys that bypass the normal data flow.",
      demoCode: `// The Golden Ticket: A direct ref
const goldenTicket = useRef(null);

// Using the ticket to focus an input
const openInventingRoom = () => {
  if (goldenTicket.current) {
    goldenTicket.current.focus(); // Direct access!
  }
};

// In your JSX
<input 
  ref={goldenTicket} 
  placeholder="The Inventing Room"
  className="border-2 border-amber-500/30 bg-amber-950/20 p-2 rounded"
/>`
    },
    {
      title: "The Bureaucracy of the Factory Floor",
      content: "Standard React components are like Oompa Loompa gatekeepers—they process props but don't know how to handle refs. When you pass a ref to a regular component, it gets 'filed away' in general admittance. The ref never reaches the underlying input, leaving you stuck outside the room you wanted to access.",
      demoCode: `// ❌ The Gatekeeper Component (swallows the ref)
function FancyInput({ label }: { label: string }) {
  return (
    <div className="p-4 border border-slate-600 rounded">
      <label>{label}</label>
      <input className="mt-2 p-2 border rounded w-full" />
    </div>
  );
}

// Charlie tries to use his ticket...
const ticket = useRef(null);

<FancyInput 
  label="Inventing Room Access"
  ref={ticket} // ❌ This ref goes nowhere!
/>

// ticket.current is null! The component consumed it.
// Try focusing: ticket.current?.focus() → Error!`,
      fixedCode: `// ✅ The Gatekeeper with "FORWARD" Stamp
const FancyInput = forwardRef<HTMLInputElement, { label: string }>(
  function FancyInput({ label }, ref) {
    return (
      <div className="p-4 border border-slate-600 rounded">
        <label>{label}</label>
        <input 
          ref={ref} // ✅ Ref forwarded to the actual input
          className="mt-2 p-2 border rounded w-full" 
        />
      </div>
    );
  }
);`
    },
    {
      title: "The Forwarding Instruction",
      content: "`React.forwardRef()` is Wonka's golden stamp. It transforms a component from a gatekeeper into a forwarder. The component receives the ref as a second parameter and knows its job is to 'pass it on' to a specific child. The ticket stays in Charlie's hand until it reaches the final door.",
      demoCode: `// Wonka's Golden Stamp: forwardRef
import { forwardRef } from 'react';

// Component definition with forwardRef
const FancyInput = forwardRef<HTMLInputElement, { label: string }>(
  function FancyInput({ label }, ref) {
    return (
      <div className="gatekeeper">
        <label>{label}</label>
        {/* The ref gets attached here */}
        <input ref={ref} className="inventing-room" />
      </div>
    );
  }
);

// Charlie presents his stamped ticket
const goldenTicket = useRef<HTMLInputElement>(null);

<FancyInput 
  label="Inventing Room" 
  ref={goldenTicket} // ✅ Now it works!
/>

// The ticket reaches its destination
goldenTicket.current?.focus(); // Success!`,
      fixedCode: `// Complete implementation
const FancyInput = forwardRef<HTMLInputElement, { label: string }>(
  ({ label }, ref) => (
    <div className="border border-slate-600 rounded p-4 bg-slate-900/50">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <input
        ref={ref}
        className="w-full p-2 rounded border border-slate-500 bg-slate-800"
        placeholder="Type here..."
      />
    </div>
  )
);

FancyInput.displayName = 'FancyInput'; // Better dev tools`
    },
    {
      title: "Two Tickets, Two Fates",
      content: "Same component, different behavior. Without forwardRef, the wrapper consumes the ref. With forwardRef, it passes it through. This side-by-side comparison shows identical UI components with drastically different capabilities. Veruca's unstamped ticket gets her inside the factory but not into the Nut Room. Charlie's stamped ticket flows through every layer.",
      demoCode: `// 🎫 Veruca's Unstamped Ticket (Broken)
const BrokenFancyInput = ({ label }: { label: string }) => {
  return (
    <div className="gatekeeper">
      <label>{label}</label>
      <input className="nut-room" />
    </div>
  );
};

// 🎫 Charlie's Stamped Ticket (Fixed)
const FixedFancyInput = forwardRef<HTMLInputElement, { label: string }>(
  ({ label }, ref) => (
    <div className="gatekeeper">
      <label>{label}</label>
      <input ref={ref} className="inventing-room" />
    </div>
  )
);

// Both look identical in UI...
<BrokenFancyInput label="Nut Room" ref={verucaTicket} /> // ❌
<FixedFancyInput label="Inventing Room" ref={charlieTicket} /> // ✅`,
      fixedCode: `// Practical comparison
const verucaRef = useRef<HTMLInputElement>(null);
const charlieRef = useRef<HTMLInputElement>(null);

const tryFocusVeruca = () => {
  // This will fail - ref is null
  verucaRef.current?.focus();
};

const tryFocusCharlie = () => {
  // This will succeed
  charlieRef.current?.focus();
};`
    },
    {
      title: "The Key in the Lock",
      content: "When the stamped ticket finally reaches the Inventing Room door, it clicks into place. The ref has navigated through multiple layers of abstraction to find its target. This demonstrates forwardRef's power in complex component hierarchies—ensuring direct access survives through styled components, layout wrappers, and other abstractions.",
      demoCode: `// Factory with multiple layers
const FactoryGate = forwardRef<HTMLInputElement>((props, ref) => (
  <div className="factory-gate">
    <CorridorMonitor {...props} ref={ref} />
  </div>
));

const CorridorMonitor = forwardRef<HTMLInputElement>((props, ref) => (
  <div className="corridor">
    <InventingRoomDoor {...props} ref={ref} />
  </div>
));

const InventingRoomDoor = forwardRef<HTMLInputElement>((props, ref) => (
  <div className="door-frame">
    <input 
      ref={ref} // 🎯 Final destination
      {...props}
      className="golden-slot"
    />
  </div>
));

// The ticket travels through all layers
const goldenTicket = useRef<HTMLInputElement>(null);

<FactoryGate ref={goldenTicket} />

// Still works after 3 layers!
goldenTicket.current?.focus(); // Click!`,
      fixedCode: `// Type-safe nested forwardRef
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const FactoryGate = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => (
    <div className="p-6 border-2 border-purple-500/30 rounded-lg bg-purple-950/20">
      <CorridorMonitor {...props} ref={ref} />
    </div>
  )
);

FactoryGate.displayName = 'FactoryGate';

// All layers preserve the ref
const goldenTicket = useRef<HTMLInputElement>(null);

useEffect(() => {
  // Ticket reaches its destination
  if (goldenTicket.current) {
    goldenTicket.current.value = "Welcome to the Inventing Room!";
  }
}, []);`
    }
  ];

  // Demo components
  const BrokenFancyInput = React.memo(({ label }: { label: string }) => (
    <div className="p-4 border border-red-500/30 rounded-lg bg-red-950/20">
      <label className="block text-sm font-medium mb-2 text-red-300">{label} ❌</label>
      <input 
        className="w-full p-2 rounded border border-red-500/50 bg-slate-800 text-slate-300"
        placeholder="This input can't be focused externally"
      />
      <p className="text-xs text-red-400 mt-2">Gatekeeper consumed the ticket</p>
    </div>
  ));

  const FixedFancyInput = forwardRef<HTMLInputElement, { label: string }>(
    ({ label }, ref) => (
      <div className="p-4 border border-emerald-500/30 rounded-lg bg-emerald-950/20">
        <label className="block text-sm font-medium mb-2 text-emerald-300">{label} ✅</label>
        <input
          ref={ref}
          className="w-full p-2 rounded border border-emerald-500/50 bg-slate-800 text-slate-300"
          placeholder="This input accepts forwarded refs"
        />
        <p className="text-xs text-emerald-400 mt-2">Forwarding ticket to destination</p>
      </div>
    )
  );
  FixedFancyInput.displayName = 'FixedFancyInput';

  // Nested forwardRef demo components
  const FactoryLayer1 = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    (props, ref) => (
      <div className="p-3 border border-purple-500/20 rounded bg-purple-950/10">
        <div className="text-xs text-purple-400 mb-1">Factory Gate</div>
        <FactoryLayer2 {...props} ref={ref} />
      </div>
    )
  );
  FactoryLayer1.displayName = 'FactoryLayer1';

  const FactoryLayer2 = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    (props, ref) => (
      <div className="p-3 border border-amber-500/20 rounded bg-amber-950/10">
        <div className="text-xs text-amber-400 mb-1">Corridor Monitor</div>
        <FactoryLayer3 {...props} ref={ref} />
      </div>
    )
  );
  FactoryLayer2.displayName = 'FactoryLayer2';

  const FactoryLayer3 = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    (props, ref) => (
      <div className="p-3 border border-emerald-500/20 rounded bg-emerald-950/10">
        <div className="text-xs text-emerald-400 mb-1">Inventing Room Door</div>
        <input
          ref={ref}
          {...props}
          className="w-full p-2 rounded border-2 border-emerald-500/50 bg-slate-800 text-slate-300"
          placeholder="Final destination (3 layers deep)"
        />
      </div>
    )
  );
  FactoryLayer3.displayName = 'FactoryLayer3';

  // Demo actions
  const handleDirectFocus = useCallback(() => {
    directInputRef.current?.focus();
    setIsFocused(true);
    setTimeout(() => setIsFocused(false), 1000);
  }, []);

  const handleBrokenFocus = useCallback(() => {
    setFocusAttempts(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        setTimeout(() => setFocusAttempts(0), 2000); // Circuit breaker
        return 5;
      }
      return newCount;
    });
    // This won't work - ref points to component instance, not input
    if (brokenInputRef.current) {
      // In reality, brokenInputRef.current is null
      console.log("Broken ref value:", brokenInputRef.current);
    }
  }, []);

  const handleFixedFocus = useCallback(() => {
    fixedInputRef.current?.focus();
    setIsFocused(true);
    setTimeout(() => setIsFocused(false), 1000);
  }, []);

  const handleNestedFocus = useCallback(() => {
    nestedTargetRef.current?.focus();
    setIsFocused(true);
    setTimeout(() => setIsFocused(false), 1000);
  }, []);

  const resetDemo = useCallback(() => {
    setFocusAttempts(0);
    setIsFocused(false);
    if (directInputRef.current) directInputRef.current.value = "";
    if (fixedInputRef.current) fixedInputRef.current.value = "";
    if (nestedTargetRef.current) nestedTargetRef.current.value = "";
  }, []);

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-purple-950 text-slate-300 font-serif">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <Ticket className="text-amber-500 w-7 h-7 sm:w-8 sm:h-8" />
              <h1 className="text-2xl sm:text-3xl font-bold">Charlie and the Chocolate Factory</h1>
            </div>
            <p className="text-sm sm:text-base text-slate-400">
              Willy Wonka • 1964
            </p>
          </div>
          <p className="text-base sm:text-lg text-amber-500 font-medium">
            Forward Refs: The Golden Ticket Pattern
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-7">
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-8 bg-amber-500 rounded"></div>
              <h2 className="text-2xl sm:text-3xl font-bold m-0">{currentChapter.title}</h2>
            </div>
            <p className="leading-relaxed text-slate-300 mb-6">{currentChapter.content}</p>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${((chapter + 1) / chapters.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-mono tabular-nums text-slate-400">
                {chapter + 1}/{chapters.length}
              </span>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                {chapter === 0 && "🎫 Direct Ref Access"}
                {chapter === 1 && "❌ The Broken Gatekeeper"}
                {chapter === 2 && "✅ The Forwarding Stamp"}
                {chapter === 3 && "🔄 Side-by-Side Comparison"}
                {chapter === 4 && "🏭 Nested Forwarding"}
              </h3>
              
              {chapter >= 1 && chapter <= 3 && (
                <button
                  onClick={() => setDemoMode(demoMode === "broken" ? "fixed" : "broken")}
                  className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  {demoMode === "broken" ? "Show Fixed" : "Show Broken"}
                </button>
              )}
            </div>

            {/* Demo 1: Direct ref access */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="p-4 border border-amber-500/30 rounded-lg bg-amber-950/20">
                  <label className="block text-sm font-medium mb-2 text-amber-300">Direct Input Access</label>
                  <input
                    ref={directInputRef}
                    className="w-full p-3 rounded border-2 border-amber-500/50 bg-slate-800 text-slate-300"
                    placeholder="This input accepts a direct ref"
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={handleDirectFocus}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      {isFocused ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                      Focus with Ref
                    </button>
                    <button
                      onClick={resetDemo}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <CodeBlock
                  code={currentChapter.demoCode}
                  variant="success"
                  title="// 🎫 The Golden Ticket Pattern"
                  language="tsx"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Demo 2: Broken wrapper */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-medium mb-3 text-red-400">Without forwardRef</h4>
                    <BrokenFancyInput label="Nut Room Access" />
                    <div className="mt-4">
                      <button
                        onClick={handleBrokenFocus}
                        disabled={focusAttempts >= 5}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
                      >
                        Try to Focus (Broken)
                      </button>
                      <p className="text-sm text-red-400 mt-2">
                        Attempts: {focusAttempts}/5 {focusAttempts >= 5 && "(Circuit breaker activated)"}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium mb-3 text-emerald-400">With forwardRef</h4>
                    <FixedFancyInput label="Inventing Room Access" ref={fixedInputRef} />
                    <button
                      onClick={handleFixedFocus}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors w-full mt-4"
                    >
                      Try to Focus (Fixed)
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <CodeBlock
                    code={currentChapter.demoCode}
                    variant="error"
                    title="// ❌ Common Mistake: Ref Gets Swallowed"
                    language="tsx"
                    defaultExpanded={true}
                  />
                  
                  <CodeBlock
                    code={currentChapter.fixedCode!}
                    variant="success"
                    title="// ✅ Solution: forwardRef"
                    language="tsx"
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}

            {/* Demo 3: forwardRef solution */}
            {chapter === 2 && (
              <div className="space-y-6">
                <div className="p-6 border border-emerald-500/30 rounded-xl bg-emerald-950/20">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Forward className="w-5 h-5 text-emerald-400" />
                      <h4 className="text-lg font-medium text-emerald-300">Stamped Ticket Demo</h4>
                    </div>
                    <FixedFancyInput label="Forwarded Input Component" ref={fixedInputRef} />
                  </div>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={handleFixedFocus}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex-1"
                    >
                      Focus Forwarded Input
                    </button>
                    <button
                      onClick={() => {
                        if (fixedInputRef.current) {
                          fixedInputRef.current.value = "Ticket reached destination!";
                        }
                      }}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex-1"
                    >
                      Set Value
                    </button>
                    <button
                      onClick={resetDemo}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <CodeBlock
                  code={currentChapter.demoCode}
                  variant="success"
                  title="// 🎫 Wonka's Forwarding Stamp"
                  language="tsx"
                  defaultExpanded={true}
                />
              </div>
            )}

            {/* Demo 4: Comparison */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-4 rounded-xl border-2 ${demoMode === "broken" ? "border-red-500/50 bg-red-950/20" : "border-emerald-500/50 bg-emerald-950/20"}`}>
                    <div className="flex items-center gap-2 mb-3">
                      {demoMode === "broken" ? (
                        <>
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="font-medium text-red-300">Veruca's Journey</span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span className="font-medium text-emerald-300">Charlie's Journey</span>
                        </>
                      )}
                    </div>
                    
                    {demoMode === "broken" ? (
                      <>
                        <BrokenFancyInput label="Wrapper Component" />
                        <p className="text-sm text-red-400 mt-3">
                          ❌ Ref gets consumed at first gatekeeper
                        </p>
                      </>
                    ) : (
                      <>
                        <FixedFancyInput label="Wrapper Component" ref={fixedInputRef} />
                        <p className="text-sm text-emerald-400 mt-3">
                          ✅ Ref forwarded through to target
                        </p>
                      </>
                    )}
                    
                    <button
                      onClick={demoMode === "broken" ? handleBrokenFocus : handleFixedFocus}
                      className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${demoMode === "broken" ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"} text-white`}
                    >
                      {demoMode === "broken" ? "Try Broken Focus" : "Try Fixed Focus"}
                    </button>
                  </div>
                  
                  <div className="p-4 border border-slate-700 rounded-xl bg-slate-900/50">
                    <h4 className="font-medium mb-3 text-slate-300">What's Happening?</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                        <span><strong>Without forwardRef:</strong> Component receives ref as prop, but doesn't attach it to child</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                        <span><strong>With forwardRef:</strong> Component passes ref to specific child element</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Ticket className="w-4 h-4 text-amber-500 mt-1" />
                        <span><strong>Golden Ticket:</strong> The ref object stays with parent, controlled access granted</span>
                      </li>
                    </ul>
                    
                    <div className="mt-4 pt-4 border-t border-slate-700">
                      <p className="text-xs text-slate-400">
                        Attempts: {focusAttempts}/5 {focusAttempts >= 5 && "✓ Circuit breaker active"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <CodeBlock
                    code={currentChapter.demoCode}
                    variant={demoMode === "broken" ? "error" : "success"}
                    title={demoMode === "broken" ? "// ❌ Without forwardRef" : "// ✅ With forwardRef"}
                    language="tsx"
                    defaultExpanded={true}
                  />
                </div>
              </div>
            )}

            {/* Demo 5: Nested forwarding */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="p-6 border border-purple-500/30 rounded-xl bg-gradient-to-br from-purple-950/20 to-amber-950/20">
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-4 text-purple-300">Factory Layers Demo</h4>
                    <FactoryLayer1 ref={nestedTargetRef} placeholder="Type reaches through 3 layers" />
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleNestedFocus}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      Focus Through Layers
                    </button>
                    <button
                      onClick={() => {
                        if (nestedTargetRef.current) {
                          nestedTargetRef.current.value = "🎉 Ticket reached final door!";
                        }
                      }}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                    >
                      Insert Golden Ticket
                    </button>
                    <button
                      onClick={resetDemo}
                      className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                      Reset All
                    </button>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <p className="text-sm text-slate-400">
                      The ref travels through: Factory Gate → Corridor Monitor → Inventing Room Door
                    </p>
                  </div>
                </div>

                <CodeBlock
                  code={currentChapter.demoCode}
                  variant="success"
                  title="// 🏭 Nested ForwardRef Pattern"
                  language="tsx"
                  defaultExpanded={true}
                />
              </div>
            )}
          </section>

          {/* Navigation */}
          <nav className="flex justify-between items-center pt-6 border-t border-slate-800">
            <button
              onClick={() => setChapter(Math.max(0, chapter - 1))}
              disabled={chapter === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono tabular-nums text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="flex gap-1">
                {chapters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChapter(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === chapter ? "bg-amber-500" : "bg-slate-700 hover:bg-slate-600"}`}
                    aria-label={`Go to chapter ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
              disabled={chapter === chapters.length - 1}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </nav>
        </div>

        {/* Sidebar - Right Column */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
            {/* Chapter Summaries */}
            <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-5 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-500" />
                Chapter Guide
              </h3>
              <div className="space-y-3">
                {chapters.map((chap, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChapter(idx)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${idx === chapter ? "bg-amber-950/40 border border-amber-500/30" : "hover:bg-slate-800/50"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${idx === chapter ? "bg-amber-500 text-slate-900" : "bg-slate-800 text-slate-400"}`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{chap.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {idx === 0 && "Direct ref access"}
                          {idx === 1 && "Anti-pattern: swallowed ref"}
                          {idx === 2 && "Solution: forwardRef"}
                          {idx === 3 && "Comparison"}
                          {idx === 4 && "Nested patterns"}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Key Concepts */}
            <div className="bg-purple-950/30 border border-purple-500/20 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-4 text-purple-300">Key Concepts</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-amber-400 flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    ref Object
                  </dt>
                  <dd className="text-sm text-slate-400 mt-1">
                    A React reference that provides direct access to DOM elements or component instances
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                    <Forward className="w-4 h-4" />
                    forwardRef()
                  </dt>
                  <dd className="text-sm text-slate-400 mt-1">
                    HOC that allows a component to forward a ref to one of its children
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-blue-400 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Use Cases
                  </dt>
                  <dd className="text-sm text-slate-400 mt-1">
                    Focus management, text selection, media playback, animation triggers
                  </dd>
                </div>
              </dl>
            </div>

            {/* Best Practices */}
            <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-4">Best Practices</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                  <span className="text-sm">Use forwardRef for reusable UI components that wrap native elements</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5"></div>
                  <span className="text-sm">Always add displayName for better dev tools experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5"></div>
                  <span className="text-sm">Combine with useImperativeHandle for custom instance methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                  <span className="text-sm">Don't overuse refs - prefer props for data flow when possible</span>
                </li>
              </ul>
            </div>

            {/* Reset Panel */}
            <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-5">
              <h3 className="text-lg font-semibold mb-4">Demo Controls</h3>
              <div className="space-y-3">
                <button
                  onClick={resetDemo}
                  className="w-full px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset All Demos
                </button>
                <button
                  onClick={() => setChapter(0)}
                  className="w-full px-4 py-2.5 border border-slate-600 hover:border-slate-500 text-slate-300 rounded-lg transition-colors"
                >
                  Restart from Chapter 1
                </button>
                <div className="text-xs text-slate-500 pt-2 border-t border-slate-800">
                  <p>Circuit breakers active: Max 5 attempts per broken demo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}