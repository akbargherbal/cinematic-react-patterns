import { useState, useEffect, useRef } from "react";
import { Theater, Eye, Lightbulb, CheckCircle, Shield, AlertCircle } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function TheMousetrapTest(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [testMode, setTestMode] = useState<'implementation' | 'behavior'>('implementation');
  const [testResult, setTestResult] = useState<'pending' | 'pass' | 'fail'>('pending');
  const [userReaction, setUserReaction] = useState<string>('');
  const [testRunCount, setTestRunCount] = useState<number>(0);
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  
  const testTimeoutRef = useRef<NodeJS.Timeout>();

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (testTimeoutRef.current) {
        clearTimeout(testTimeoutRef.current);
      }
    };
  }, []);

  // Circuit breaker - reset after 50 test runs
  useEffect(() => {
    if (testRunCount >= 50) {
      resetTest();
      alert("Safety limit reached! Demo auto-reset.");
    }
  }, [testRunCount]);

  const chapters: Chapter[] = [
    { 
      title: "The Conscience of the King", 
      content: "Hamlet tests Claudius not by analyzing the play's mechanics, but by observing his reaction. React Testing Library follows the same principle: test components from the user's perspective, focusing on observable behavior rather than implementation details." 
    },
    { 
      title: "That Within Which Passeth Show", 
      content: "Hamlet's internal knowledge of murder couldn't be tested—it produced no observable outcome. Similarly, testing a component's internal state or methods doesn't guarantee a good user experience. Focus on what users can actually see and do." 
    },
    { 
      title: "Give Me Some Light", 
      content: "Claudius's cry—'Give me some light! Away!'—was observable proof. In React Testing Library, you simulate user interactions (clicks, typing) and assert on visible outcomes (text appears, element is visible). The user's reaction validates the test." 
    },
    { 
      title: "The Play's the Thing", 
      content: "A perfect performance means nothing if the king sits unmoved. A technically perfect component means nothing if users can't interact with it correctly. Test user impact, not implementation purity." 
    },
    { 
      title: "For What I Have Seen", 
      content: "Hamlet's validated hypothesis came from observable behavior, not internal truth. Your tests should give the same confidence: if the test passes, users will have the intended experience. Behavior-focused tests are actionable proof." 
    },
  ];

  // Code examples for demonstrations
  const implementationTest = `// ❌ Testing Implementation Details
import { render, screen } from '@testing-library/react';
import { KingReaction } from './KingReaction';

test('tests internal state directly', () => {
  const { container } = render(<KingReaction />);
  
  // ❌ Tests implementation, not user experience
  const button = container.querySelector('button');
  expect(button).toHaveProperty('onClick');
  
  // ❌ Accesses internal state directly
  const state = container.querySelector('[data-testid="internal-state"]');
  expect(state).toHaveTextContent('guilty');
  
  // Test passes but reveals nothing about user experience
});`;

  const behaviorTest = `// ✅ Testing Observable Behavior
import { render, screen, fireEvent } from '@testing-library/react';
import { KingReaction } from './KingReaction';

test('tests user interaction and visible outcome', async () => {
  render(<KingReaction />);
  
  // ✅ Finds element as user would (by role)
  const performButton = screen.getByRole('button', { 
    name: /perform the play/i 
  });
  
  // ✅ Simulates user interaction
  fireEvent.click(performButton);
  
  // ✅ Asserts on observable outcome
  const reaction = await screen.findByText(
    /give me some light! away!/i
  );
  
  expect(reaction).toBeInTheDocument();
  // Test validates actual user experience
});`;

  const componentCode = `// Component Under Test
function KingReaction() {
  const [isGuilty, setIsGuilty] = useState(false);
  const [reaction, setReaction] = useState('');

  const handlePerformance = () => {
    setIsGuilty(true);
    setReaction("Give me some light! Away!");
  };

  return (
    <div>
      <button 
        onClick={handlePerformance}
        aria-label="Perform the play"
      >
        Perform The Mousetrap
      </button>
      
      {reaction && (
        <div 
          role="alert"
          className="reaction-display"
        >
          {reaction}
        </div>
      )}
      
      {/* Internal state - users can't see this */}
      <div data-testid="internal-state">
        {isGuilty ? 'guilty' : 'innocent'}
      </div>
    </div>
  );
}`;

  const runTest = () => {
    if (isTestRunning) return;
    
    setIsTestRunning(true);
    setTestResult('pending');
    setUserReaction('');
    
    // Simulate test execution
    if (testMode === 'implementation') {
      testTimeoutRef.current = setTimeout(() => {
        setTestResult('pass');
        setUserReaction('');
        setIsTestRunning(false);
        setTestRunCount(prev => prev + 1);
      }, 800);
    } else {
      // Behavior test - show user reaction
      testTimeoutRef.current = setTimeout(() => {
        setUserReaction("Give me some light! Away!");
        
        setTimeout(() => {
          setTestResult('pass');
          setIsTestRunning(false);
          setTestRunCount(prev => prev + 1);
        }, 600);
      }, 600);
    }
  };

  const resetTest = () => {
    if (testTimeoutRef.current) {
      clearTimeout(testTimeoutRef.current);
    }
    setTestResult('pending');
    setUserReaction('');
    setIsTestRunning(false);
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Theater}
        title="The Mousetrap"
        subtitle="Hamlet, c. 1600"
        concept="React Testing Library"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Eye className="h-5 w-5 text-amber-400" />
                  Test Controls
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setTestMode('implementation')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${testMode === 'implementation' ? 'bg-amber-900/60 text-amber-200 border border-amber-500/40' : 'bg-slate-800/50 hover:bg-slate-800'}`}
                    >
                      🎭 Test Actor
                    </button>
                    <button
                      onClick={() => setTestMode('behavior')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${testMode === 'behavior' ? 'bg-amber-900/60 text-amber-200 border border-amber-500/40' : 'bg-slate-800/50 hover:bg-slate-800'}`}
                    >
                      👑 Test King
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={runTest}
                      disabled={isTestRunning}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${isTestRunning ? 'bg-slate-700 cursor-not-allowed' : 'bg-amber-700 hover:bg-amber-600'}`}
                    >
                      {isTestRunning ? 'Testing...' : 'Run Test'}
                    </button>
                    <button
                      onClick={resetTest}
                      className="flex-1 rounded bg-slate-700 px-3 py-2 text-sm hover:bg-slate-600"
                    >
                      Reset
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Test Runs</div>
                      <div className="font-mono text-xl tabular-nums">{testRunCount}</div>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Result</div>
                      <div className={`font-mono text-sm ${testResult === 'pass' ? 'text-green-400' : testResult === 'fail' ? 'text-red-400' : 'text-amber-400'}`}>
                        {testResult === 'pending' ? 'PENDING' : testResult.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Play "The Mousetrap"</span>
                    <span className="text-sm font-medium">Component Under Test</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">King Claudius</span>
                    <span className="text-sm font-medium">End User</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hamlet as Observer</span>
                    <span className="text-sm font-medium">RTL Developer</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Claudius's Reaction</span>
                    <span className="text-sm font-medium">Observable Outcome</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Actor's Techniques</span>
                    <span className="text-sm font-medium">Implementation Details</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hamlet's Instructions</span>
                    <span className="text-sm font-medium">RTL Setup</span>
                  </div>
                  <div className="flex justify-between pb-2">
                    <span className="text-sm text-slate-400">Torchlight on Face</span>
                    <span className="text-sm font-medium">RTL Queries</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <Lightbulb className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "Test from the user's perspective—what they see and do, not how the component works internally."}
                  {chapter === 1 && "Testing implementation details creates brittle tests that break with refactoring, even when user experience remains the same."}
                  {chapter === 2 && "Simulate real user interactions (clicks, typing) and assert on visible outcomes that users actually experience."}
                  {chapter === 3 && "A test that passes while the user experience fails is worse than a test that fails—it gives false confidence."}
                  {chapter === 4 && "Behavior-focused tests survive refactoring and give real confidence that your components work for users."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "The play's the thing / Wherein I'll catch the conscience of the King."
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Hamlet, Act 2 Scene 2
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-amber-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-amber-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-amber-500"></div>
              <h3 className="text-xl font-bold text-amber-200">
                Interactive Demonstration
              </h3>
            </div>

            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3 font-semibold text-amber-300">The Component</h4>
                    <CodeBlock
                      code={componentCode}
                      language="tsx"
                      variant="default"
                      title="// The Mousetrap - Component Under Test"
                      defaultExpanded={true}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="rounded border border-slate-700 bg-slate-800/30 p-4">
                      <h5 className="mb-2 font-medium">Live Preview</h5>
                      <div className="space-y-3">
                        <button 
                          className="rounded bg-amber-700 px-4 py-2 hover:bg-amber-600"
                          onClick={() => setUserReaction("Give me some light! Away!")}
                        >
                          Perform The Mousetrap
                        </button>
                        {userReaction && (
                          <div className="rounded border border-rose-500/40 bg-rose-950/30 p-3">
                            <div className="flex items-center gap-2 text-rose-300">
                              <AlertCircle className="h-4 w-4" />
                              <span className="font-medium">{userReaction}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">
                      <strong>Observation:</strong> The user sees a button and (after clicking) a reaction message. 
                      They cannot see the internal `isGuilty` state.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={implementationTest}
                  goodCode={behaviorTest}
                  language="tsx"
                  themeColor="amber"
                  badLabel="🎭 Testing the Actor (Implementation)"
                  goodLabel="👑 Testing the King (Behavior)"
                  badExplanation="Tests internal implementation details that users never see. Passes even when user experience is broken."
                  goodExplanation="Tests observable behavior that users actually experience. Validates real user interactions."
                />
                
                <div className="rounded border border-slate-700 bg-slate-800/30 p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-amber-300">Implementation Test</h4>
                      <p className="text-sm text-slate-400">
                        Tests button's `onClick` property and internal state. 
                        <span className="block mt-1 text-amber-200/80">
                          ✅ Test passes but reveals nothing about user experience
                        </span>
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-amber-300">User Reality</h4>
                      <p className="text-sm text-slate-400">
                        User clicks button but sees no reaction. 
                        <span className="block mt-1 text-rose-300">
                          ❌ User experience fails despite passing test
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <CodeBlock
                  code={behaviorTest}
                  language="tsx"
                  variant="success"
                  title="// ✅ Behavior-Focused Test"
                  defaultExpanded={true}
                />
                
                <div className="rounded border border-slate-700 bg-slate-800/30 p-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-amber-300">Test Steps</h4>
                      <ol className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-900/40 text-xs">1</div>
                          <span>Render component as user sees it</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-900/40 text-xs">2</div>
                          <span>Find button by accessible role</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-900/40 text-xs">3</div>
                          <span>Simulate user click</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-900/40 text-xs">4</div>
                          <span>Assert reaction text appears</span>
                        </li>
                      </ol>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-amber-300">User Alignment</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-400" />
                          <span>Tests what user actually sees (button, reaction)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-400" />
                          <span>Simulates real user interaction (click)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-400" />
                          <span>Validates observable outcome (text appears)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-4 w-4 text-green-400" />
                          <span>Test fails if user experience breaks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="rounded border border-amber-500/30 bg-amber-950/20 p-4">
                      <h4 className="mb-2 font-medium text-amber-300">Beautiful Implementation</h4>
                      <p className="text-sm text-slate-300">
                        Perfect code, clean architecture, optimal state management.
                      </p>
                      <div className="mt-3 rounded bg-slate-800/50 p-3">
                        <div className="text-center text-sm">
                          <div className="font-mono text-green-400">✅ Test PASS</div>
                          <div className="mt-1 text-xs text-slate-500">All implementation tests pass</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">
                      <strong>The Problem:</strong> User clicks the beautifully coded button and... nothing happens. 
                      The test suite is green, but the user experience is broken.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="rounded border border-amber-500/30 bg-slate-900/60 p-4">
                      <h4 className="mb-2 font-medium text-amber-300">Functional User Experience</h4>
                      <p className="text-sm text-slate-300">
                        Code might be messy, but when user clicks, they get the expected reaction.
                      </p>
                      <div className="mt-3 rounded bg-slate-800/50 p-3">
                        <div className="text-center text-sm">
                          <div className="font-mono text-green-400">✅ Test PASS</div>
                          <div className="mt-1 text-xs text-slate-500">Behavior test validates user experience</div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">
                      <strong>The Solution:</strong> User clicks button → sees reaction. 
                      Behavior test validates this works. Implementation details can be refactored without breaking tests.
                    </p>
                  </div>
                </div>
                
                <div className="rounded border border-slate-700 bg-slate-800/30 p-4">
                  <h4 className="mb-3 font-medium text-amber-300">The Difference</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="mb-2 text-slate-500">Implementation Testing</div>
                      <ul className="space-y-1 text-slate-400">
                        <li>• Tests how it works</li>
                        <li>• Brittle to refactoring</li>
                        <li>• Can pass while UX fails</li>
                        <li>• Focuses on actor's technique</li>
                      </ul>
                    </div>
                    <div>
                      <div className="mb-2 text-slate-500">Behavior Testing</div>
                      <ul className="space-y-1 text-amber-200/80">
                        <li>• Tests what user experiences</li>
                        <li>• Survives refactoring</li>
                        <li>• Fails when UX breaks</li>
                        <li>• Focuses on king's reaction</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded border border-amber-500/30 bg-amber-950/20 p-6">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-6 w-6 text-green-400" />
                    <div>
                      <h4 className="mb-2 text-lg font-bold text-amber-200">Validated Hypothesis</h4>
                      <p className="text-slate-300">
                        When your behavior-focused tests pass, you have actionable proof that:
                      </p>
                      <ul className="mt-3 space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>Users can complete the intended interaction</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>The component displays the expected information</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>Accessibility requirements are met (ARIA roles, labels)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span>The user experience matches design specifications</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <CodeBlock
                    code={`// ❌ Implementation assertions (avoid)
expect(componentInstance.state.isGuilty).toBe(true);
expect(componentInstance.handleClick).toHaveBeenCalled();
expect(container.querySelector('.internal-class')).toBeDefined();`}
                    language="tsx"
                    variant="error"
                    title="// Don't Test Implementation"
                  />
                  
                  <CodeBlock
                    code={`// ✅ Behavior assertions (prefer)
expect(screen.getByText('Reaction text')).toBeInTheDocument();
expect(screen.getByRole('button')).toBeEnabled();
expect(screen.getByLabelText('Search')).toHaveValue('query');
expect(screen.queryByRole('alert')).not.toBeInTheDocument();`}
                    language="tsx"
                    variant="success"
                    title="// Do Test User Behavior"
                  />
                </div>
                
                <div className="rounded border border-slate-700 bg-slate-800/30 p-4">
                  <h4 className="mb-3 font-medium text-amber-300">Actionable Confidence</h4>
                  <p className="text-sm text-slate-300">
                    When behavior tests pass, you can refactor with confidence. Change state management, 
                    extract hooks, optimize renders—your tests only fail if you break the user experience.
                    <span className="mt-2 block text-amber-200/80">
                      Just as Hamlet could act on Claudius's visible reaction, you can ship code based on validated user experience.
                    </span>
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Chapter Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="amber"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}