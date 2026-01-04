import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Box, MessageSquare, Wand, Sparkles, CheckCircle, Shield, Quote } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function HeadlessUIPrimitives(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'headless' | 'styled' | 'broken'>('headless');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [accessibilityScore, setAccessibilityScore] = useState<number>(100);
  const [keyboardTestPassed, setKeyboardTestPassed] = useState<boolean>(true);
  const [focusTestPassed, setFocusTestPassed] = useState<boolean>(true);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const chapters: Chapter[] = [
    { 
      title: "The Voice Without a Face", 
      content: "Ariel's voice delivers a powerful message without visual spectacle. This demonstrates the core primitive: accessible, functional UI without styling. In React, headless UI primitives provide the core behavior and accessibility, separate from visual design." 
    },
    { 
      title: "The Feast That Wasn't There", 
      content: "The magician's illusion fails because it's built style-first. Without a functional core, the UI collapses on interaction. Similarly, building UI components by starting with styling leads to inaccessible, brittle components that fail under real use." 
    },
    { 
      title: "Prospero's Realization", 
      content: "Prospero instructs Ariel to separate the message (core functionality) from the spectacle (styling). This is the key insight of headless UI: build the accessible, functional primitive first, then add styling as a separate layer." 
    },
    { 
      title: "Message vs. Mirage", 
      content: "Compare the magician's failing illusion (style-first) with Ariel's primitive (function-first) that works, then adds styling as a separate layer. The headless approach ensures the UI is robust and accessible, regardless of the visual layer." 
    },
    { 
      title: "The Word, Not the Spectacle", 
      content: "The power lies in the accessible, unstyled primitive. Styling is a secondary layer that can be changed or removed. Headless UI libraries provide the core functionality; you provide the styling." 
    },
  ];

  // Accessibility testing simulation
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setRenderCount(prev => {
          const newCount = prev + 1;
          if (newCount > 50) {
            setIsRunning(false);
            setRenderCount(0);
          }
          return newCount;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  // Update accessibility metrics based on demo mode
  useEffect(() => {
    switch(demoMode) {
      case 'headless':
        setAccessibilityScore(100);
        setKeyboardTestPassed(true);
        setFocusTestPassed(true);
        break;
      case 'styled':
        setAccessibilityScore(90);
        setKeyboardTestPassed(true);
        setFocusTestPassed(true);
        break;
      case 'broken':
        setAccessibilityScore(30);
        setKeyboardTestPassed(false);
        setFocusTestPassed(false);
        break;
    }
  }, [demoMode]);

  // Focus management for accessible dialog
  useEffect(() => {
    if (dialogOpen && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [dialogOpen]);

  const handleCloseDialog = () => {
    setDialogOpen(false);
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  };

  const resetDemo = () => {
    setDialogOpen(false);
    setRenderCount(0);
    setIsRunning(false);
  };

  const runAccessibilityTest = () => {
    setIsRunning(true);
    setRenderCount(0);
  };

  // Code examples
  const brokenDialogCode = `// ❌ Style-First Anti-Pattern
function BrokenDialog() {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button 
        className="px-4 py-2 bg-purple-600 rounded-lg"
        onClick={() => setOpen(true)}
      >
        Open Illusion
      </button>
      
      {open && (
        <div className="fixed inset-0 bg-black/50">
          <div className="absolute top-1/2 left-1/2 
              transform -translate-x-1/2 -translate-y-1/2
              p-6 bg-gradient-to-br from-purple-900 
              to-pink-800 rounded-2xl shadow-2xl">
            <p className="text-xl">Beautiful but inaccessible</p>
            <button 
              className="mt-4 px-4 py-2 bg-pink-500 rounded"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}`;

  const headlessDialogCode = `// ✅ Headless Primitive Pattern
import * as Dialog from '@radix-ui/react-dialog';

function AccessibleDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 bg-emerald-600 rounded-lg">
          Open Message
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content 
          className="fixed top-1/2 left-1/2 transform 
            -translate-x-1/2 -translate-y-1/2 p-6 bg-slate-800 
            rounded-lg shadow-xl"
          onEscapeKeyDown={() => console.log('Escape pressed')}
        >
          <Dialog.Title className="text-lg font-bold">
            Accessible Core Functionality
          </Dialog.Title>
          <Dialog.Description>
            This works for everyone, regardless of styling.
          </Dialog.Description>
          <Dialog.Close asChild>
            <button className="mt-4 px-4 py-2 bg-slate-700 rounded">
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`;

  const styledPrimitiveCode = `// 💡 Styling the Primitive
function StyledDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {/* Custom trigger styling */}
        <button className="px-6 py-3 bg-gradient-to-r 
          from-emerald-500 to-cyan-500 rounded-xl 
          shadow-lg hover:shadow-emerald-500/30">
          Open Styled Message
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        {/* Custom overlay styling */}
        <Dialog.Overlay className="fixed inset-0 
          backdrop-blur-sm bg-black/40" />
        
        {/* Custom content styling */}
        <Dialog.Content className="fixed top-1/2 left-1/2 
          transform -translate-x-1/2 -translate-y-1/2 
          p-8 bg-gradient-to-br from-slate-900 to-slate-800 
          border border-emerald-500/30 rounded-2xl 
          shadow-2xl shadow-emerald-900/20">
          
          <div className="space-y-4">
            <Dialog.Title className="text-2xl font-bold 
              bg-gradient-to-r from-emerald-300 to-cyan-300 
              bg-clip-text text-transparent">
              Styled But Still Accessible
            </Dialog.Title>
            
            <Dialog.Description className="text-slate-300">
              The core accessibility remains intact.
            </Dialog.Description>
            
            <Dialog.Close asChild>
              <button className="px-6 py-2 bg-emerald-600 
                rounded-lg hover:bg-emerald-500">
                Close Dialog
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}`;

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Box}
        title="The Tempest (1611)"
        subtitle="Prospero, Ariel, and the Lords"
        concept="React Concept: Headless UI Primitives"
        themeColor="emerald"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-emerald-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-300">
                  <Wand className="h-5 w-5" />
                  Demo Controls
                </h3>
                
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-slate-400">Dialog Type</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setDemoMode('headless')}
                        className={`px-3 py-2 rounded text-sm transition-all ${
                          demoMode === 'headless' 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                      >
                        Headless
                      </button>
                      <button
                        onClick={() => setDemoMode('styled')}
                        className={`px-3 py-2 rounded text-sm transition-all ${
                          demoMode === 'styled' 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                      >
                        Styled
                      </button>
                      <button
                        onClick={() => setDemoMode('broken')}
                        className={`px-3 py-2 rounded text-sm transition-all ${
                          demoMode === 'broken' 
                            ? 'bg-red-600 text-white' 
                            : 'bg-slate-800 hover:bg-slate-700'
                        }`}
                      >
                        Broken
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <button
                      onClick={runAccessibilityTest}
                      disabled={isRunning}
                      className="w-full px-4 py-2 bg-emerald-700 rounded hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isRunning ? 'Testing...' : 'Run Accessibility Test'}
                    </button>
                    
                    <button
                      onClick={resetDemo}
                      className="w-full mt-2 px-4 py-2 bg-slate-800 rounded hover:bg-slate-700"
                    >
                      Reset Demo
                    </button>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Accessibility Score</div>
                        <div className={`font-mono text-xl ${
                          accessibilityScore > 70 ? 'text-emerald-400' : 
                          accessibilityScore > 40 ? 'text-amber-400' : 
                          'text-red-400'
                        }`}>
                          {accessibilityScore}%
                        </div>
                      </div>
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Render Count</div>
                        <div className="font-mono text-xl">{renderCount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-emerald-300">
                  <Shield className="h-5 w-5" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Ariel (as the Harpy)</span>
                    <span className="text-sm font-medium text-emerald-300">UI Component Primitive</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Illusory Feast</span>
                    <span className="text-sm font-medium text-purple-300">Visual Styling</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Ariel's Message</span>
                    <span className="text-sm font-medium text-emerald-300">Accessibility</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Prospero</span>
                    <span className="text-sm font-medium">The Developer</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Clumsy Magician</span>
                    <span className="text-sm font-medium text-red-300">Style-First Anti-Pattern</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-400">The Lords</span>
                    <span className="text-sm font-medium">Users / Assistive Tech</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-emerald-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-emerald-200/80">
                  {chapter === 0 && "Headless UI primitives provide core functionality and accessibility first—the 'message' that must be heard regardless of visual presentation."}
                  {chapter === 1 && "Starting with styling creates beautiful but brittle components that fail under real interaction—like a feast that vanishes when touched."}
                  {chapter === 2 && "Separate core functionality from styling. Build the accessible primitive first, then add visual design as a removable layer."}
                  {chapter === 3 && "The primitive ensures accessibility works for everyone; styling can be changed or removed without breaking core functionality."}
                  {chapter === 4 && "The true power is in the accessible core primitive. Visual styling is secondary and customizable clothing for that core."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && '"A voice that carved its meaning into the air."'}
                  {chapter === 1 && '"All glitter, no substance."'}
                  {chapter === 2 && '"Be the message. Then clothe it."'}
                  {chapter === 3 && '"The spectacle broke. The message held."'}
                  {chapter === 4 && '"The power was never in the spectacle. It was in the word that could not be ignored."'}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — The Tempest
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-emerald-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-emerald-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-emerald-500"></div>
              <h3 className="text-xl font-bold text-emerald-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter 0: Headless Primitive */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <div className="mb-4 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-emerald-400" />
                      <h4 className="text-lg font-bold">Headless Dialog Primitive</h4>
                    </div>
                    <div className="rounded-lg border border-emerald-500/20 bg-slate-900/60 p-6">
                      <button
                        ref={triggerRef}
                        onClick={() => setDialogOpen(true)}
                        className="px-6 py-3 bg-emerald-700 rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                      >
                        Open Headless Dialog
                      </button>
                      
                      {dialogOpen && (
                        <div 
                          ref={dialogRef}
                          className="fixed inset-0 z-50 flex items-center justify-center p-4"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="dialog-title"
                          tabIndex={-1}
                        >
                          <div 
                            className="absolute inset-0 bg-black/50"
                            onClick={handleCloseDialog}
                          />
                          <div className="relative z-10 w-full max-w-md rounded-lg bg-slate-800 p-6 shadow-xl">
                            <h3 id="dialog-title" className="text-xl font-bold mb-2">
                              Accessible Core Message
                            </h3>
                            <p className="text-slate-300 mb-4">
                              This dialog works for everyone—keyboard, screen readers, voice control.
                            </p>
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={handleCloseDialog}
                                className="px-4 py-2 bg-slate-700 rounded hover:bg-slate-600"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Keyboard Access</div>
                        <div className="font-mono text-lg text-emerald-400">✓ Working</div>
                      </div>
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Screen Reader</div>
                        <div className="font-mono text-lg text-emerald-400">✓ Compatible</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <CodeBlock
                      code={headlessDialogCode}
                      language="tsx"
                      variant="success"
                      title="// ✅ Headless UI Primitive Pattern"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 1: Broken Anti-Pattern */}
            {chapter === 1 && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <div className="mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-400" />
                      <h4 className="text-lg font-bold">Style-First Anti-Pattern</h4>
                    </div>
                    <div className="rounded-lg border border-purple-500/20 bg-slate-900/60 p-6">
                      <button
                        onClick={() => setDialogOpen(true)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg"
                      >
                        Open Beautiful Illusion
                      </button>
                      
                      {dialogOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50" />
                          <div className="relative z-10 w-full max-w-md rounded-2xl bg-gradient-to-br from-purple-900 to-pink-800 p-8 shadow-2xl">
                            <h3 className="text-2xl font-bold mb-4 text-white">
                              Beautiful But Broken
                            </h3>
                            <p className="text-pink-100 mb-6">
                              This looks impressive but fails accessibility tests.
                            </p>
                            <button
                              onClick={() => setDialogOpen(false)}
                              className="px-6 py-3 bg-pink-600 rounded-lg hover:bg-pink-500"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Keyboard Access</div>
                        <div className="font-mono text-lg text-red-400">✗ Missing</div>
                      </div>
                      <div className="rounded bg-slate-800/30 p-3">
                        <div className="text-xs text-slate-500">Focus Trap</div>
                        <div className="font-mono text-lg text-red-400">✗ Broken</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <CodeBlock
                      code={brokenDialogCode}
                      language="tsx"
                      variant="error"
                      title="// ❌ Style-First Anti-Pattern"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 2: Code Comparison */}
            {chapter === 2 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={brokenDialogCode}
                  goodCode={headlessDialogCode}
                  language="tsx"
                  themeColor="emerald"
                  badLabel="❌ Style-First (Broken)"
                  goodLabel="✅ Primitive-First (Working)"
                  badExplanation="Focuses on visuals first, resulting in inaccessible components that fail under real interaction"
                  goodExplanation="Provides core accessibility and functionality first, allowing styling to be added as a separate layer"
                />
              </div>
            )}

            {/* Chapter 3: Live Comparison */}
            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-red-500/30 bg-slate-900/60 p-6">
                      <h4 className="text-lg font-bold text-red-300 mb-4">The Magician's Illusion</h4>
                      <button
                        onClick={() => setDemoMode('broken')}
                        className="w-full px-6 py-3 bg-gradient-to-r from-red-700 to-pink-700 rounded-lg mb-4"
                      >
                        Trigger Broken Dialog
                      </button>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${keyboardTestPassed ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span className="text-sm">Keyboard Navigation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`h-3 w-3 rounded-full ${focusTestPassed ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span className="text-sm">Focus Management</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded-lg border border-emerald-500/30 bg-slate-900/60 p-6">
                      <h4 className="text-lg font-bold text-emerald-300 mb-4">Ariel's Primitive</h4>
                      <button
                        onClick={() => setDemoMode('headless')}
                        className="w-full px-6 py-3 bg-gradient-to-r from-emerald-700 to-cyan-700 rounded-lg mb-4"
                      >
                        Trigger Accessible Dialog
                      </button>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-emerald-500" />
                          <span className="text-sm">Keyboard Navigation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-emerald-500" />
                          <span className="text-sm">Focus Management</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-6">
                  <h4 className="text-lg font-bold mb-4">Accessibility Test Results</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="rounded bg-slate-800/30 p-4">
                      <div className="text-xs text-slate-500">Overall Score</div>
                      <div className={`text-2xl font-bold ${
                        accessibilityScore > 70 ? 'text-emerald-400' : 
                        accessibilityScore > 40 ? 'text-amber-400' : 
                        'text-red-400'
                      }`}>
                        {accessibilityScore}%
                      </div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-4">
                      <div className="text-xs text-slate-500">Keyboard Test</div>
                      <div className={`text-2xl font-bold ${keyboardTestPassed ? 'text-emerald-400' : 'text-red-400'}`}>
                        {keyboardTestPassed ? 'PASS' : 'FAIL'}
                      </div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-4">
                      <div className="text-xs text-slate-500">Focus Test</div>
                      <div className={`text-2xl font-bold ${focusTestPassed ? 'text-emerald-400' : 'text-red-400'}`}>
                        {focusTestPassed ? 'PASS' : 'FAIL'}
                      </div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-4">
                      <div className="text-xs text-slate-500">ARIA Labels</div>
                      <div className={`text-2xl font-bold ${demoMode === 'broken' ? 'text-red-400' : 'text-emerald-400'}`}>
                        {demoMode === 'broken' ? 'MISSING' : 'PRESENT'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Chapter 4: Styling the Primitive */}
            {chapter === 4 && (
              <div className="space-y-6">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="lg:w-1/2">
                    <div className="mb-4 flex items-center gap-2">
                      <Wand className="h-5 w-5 text-emerald-400" />
                      <h4 className="text-lg font-bold">Styled Primitive</h4>
                    </div>
                    <div className="rounded-lg border border-emerald-500/20 bg-slate-900/60 p-6">
                      <button
                        onClick={() => setDialogOpen(true)}
                        className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-shadow"
                      >
                        Open Styled Message
                      </button>
                      
                      {dialogOpen && (
                        <div 
                          ref={dialogRef}
                          className="fixed inset-0 z-50 flex items-center justify-center p-4"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="styled-dialog-title"
                          tabIndex={-1}
                        >
                          <div 
                            className="absolute inset-0 backdrop-blur-sm bg-black/40"
                            onClick={handleCloseDialog}
                          />
                          <div className="relative z-10 w-full max-w-lg rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-emerald-500/30 p-8 shadow-2xl shadow-emerald-900/20">
                            <h3 id="styled-dialog-title" className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                              Styled But Still Accessible
                            </h3>
                            <p className="text-slate-300 mb-6">
                              Custom visual design applied to the accessible primitive core.
                            </p>
                            <div className="flex justify-end gap-3">
                              <button
                                onClick={handleCloseDialog}
                                className="px-6 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-500"
                              >
                                Accept
                              </button>
                              <button
                                onClick={handleCloseDialog}
                                className="px-6 py-2 bg-slate-700 rounded-lg hover:bg-slate-600"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <div className="text-sm text-slate-400 mb-2">Accessibility Features Maintained:</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-emerald-900/30 text-emerald-300 rounded-full text-sm">Keyboard Nav</span>
                        <span className="px-3 py-1 bg-emerald-900/30 text-emerald-300 rounded-full text-sm">Focus Trap</span>
                        <span className="px-3 py-1 bg-emerald-900/30 text-emerald-300 rounded-full text-sm">ARIA Labels</span>
                        <span className="px-3 py-1 bg-emerald-900/30 text-emerald-300 rounded-full text-sm">Screen Reader</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <CodeBlock
                      code={styledPrimitiveCode}
                      language="tsx"
                      variant="success"
                      title="// 💡 Styling the Headless Primitive"
                      defaultExpanded={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="emerald"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}