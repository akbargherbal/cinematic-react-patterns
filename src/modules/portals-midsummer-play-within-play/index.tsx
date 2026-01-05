import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { EyeOff, Theater, AlertCircle, CheckCircle, Quote } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function PortalsMidsummerPlayWithinPlay(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'clipped' | 'portal'>('clipped');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [renderCount, setRenderCount] = useState<number>(0);
  const [clippedModalVisible, setClippedModalVisible] = useState<boolean>(false);
  const portalRootRef = useRef<HTMLDivElement | null>(null);

  // Create portal root on mount
  useEffect(() => {
    const portalRoot = document.getElementById('portal-root');
    if (!portalRoot) {
      const newRoot = document.createElement('div');
      newRoot.id = 'portal-root';
      document.body.appendChild(newRoot);
      portalRootRef.current = newRoot;
    } else {
      portalRootRef.current = portalRoot;
    }

    return () => {
      // Cleanup on unmount
      if (portalRootRef.current && portalRootRef.current.id === 'portal-root') {
        document.body.removeChild(portalRootRef.current);
      }
    };
  }, []);

  // Track renders for demonstration
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, [chapter, demoMode, isModalOpen]);

  const chapters: Chapter[] = [
    { 
      title: "The Play Within Must Have Its Space", 
      content: "The Mechanicals perform 'Pyramus and Thisbe' in a separate chalk circle, distinct from the Athenian court. This visual separation is the core metaphor for React Portals—rendering a component to a different DOM location while keeping it logically in the React tree."
    },
    { 
      title: "The Lion Amidst the Lords", 
      content: "Snug's lion costume gets tangled in the court's furniture when performed within the crowded space. This represents the anti-pattern: rendering modals inside parent containers with overflow:hidden or z-index constraints causes visual clipping and obstruction."
    },
    { 
      title: "Decree for a Separate Stage", 
      content: "Quince directs the lion to the chalk circle—the designated space. The performance stays in the script (React tree) but renders to the separate stage (DOM node). This is ReactDOM.createPortal: logical containment doesn't require physical DOM containment."
    },
    { 
      title: "A Roar in the Ear vs. A Roar on the Stage", 
      content: "A roar in the Duke's ear breaks the illusion (modal clipped by parent). A roar on the stage maintains separation (portal to document.body). Portals provide proper stacking context for overlays, tooltips, and modals that need to escape parent boundaries."
    },
    { 
      title: "Seen in Their Proper Place", 
      content: "The Mechanicals bow within their circle—visible because they're in the right place. Portals ensure child components render where they can be viewed unobstructed. The worst components are 'no worse, if they are seen in their proper place'—the right DOM location."
    }
  ];

  // Code examples
  const antiPatternCode = `// ❌ Modal rendered within parent container
function ClippedModal() {
  return (
    <div className="overflow-hidden border-2 border-red-500">
      <div className="p-4">
        <h3>Snug the Lion</h3>
        <p>ROAR! (clipped by parent)</p>
      </div>
    </div>
  );
}`;

  const portalSolutionCode = `// ✅ Modal portaled to document.body
function PortalModal({ children }) {
  const portalRoot = document.getElementById('portal-root');
  
  if (!portalRoot) return null;
  
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="rounded-lg bg-slate-800 p-6 shadow-2xl">
        {children}
      </div>
    </div>,
    portalRoot
  );
}`;

  const createPortalExample = `// The Portal Pattern
import { createPortal } from 'react-dom';

function MyModal() {
  // Child stays in React component tree
  // But renders to different DOM location
  return createPortal(
    <div className="modal">
      <h2>Pyramus and Thisbe</h2>
      <p>Performed on its own stage</p>
    </div>,
    document.getElementById('modal-root') // Separate DOM node
  );
}`;

  // Demo Components
  const ClippedModal = () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="rounded-lg bg-purple-900 p-4 shadow-lg">
        <div className="mb-2 flex items-center gap-2">
          <Theater className="h-5 w-5 text-purple-300" />
          <h4 className="font-bold">Pyramus and Thisbe</h4>
        </div>
        <p className="text-sm text-purple-200">"ROAR!" - Snug the Lion</p>
        <p className="mt-2 text-xs text-purple-400/70">(Clipped by court container)</p>
      </div>
    </div>
  );

  const PortalModal = ({ children }: { children: React.ReactNode }) => {
    if (!portalRootRef.current) return null;
    
    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded-xl border-2 border-purple-500 bg-slate-900 p-6 shadow-2xl">
          <div className="mb-4 flex items-center gap-3">
            <Mask className="h-6 w-6 text-purple-400" />
            <h3 className="text-xl font-bold text-purple-200">The Mechanicals' Stage</h3>
          </div>
          {children}
          <div className="mt-4 text-center text-xs text-slate-500">
            Rendered via createPortal to #portal-root
          </div>
        </div>
      </div>,
      portalRootRef.current
    );
  };

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-purple-950/30 font-serif text-slate-300">
      <ModuleHeader
        icon={EyeOff}
        title="A Midsummer Night's Dream"
        subtitle="The Mechanicals, 1595"
        concept="React Concept: Portals"
        themeColor="purple"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              <div className="rounded-xl border border-purple-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Theater className="h-5 w-5 text-purple-400" />
                  Stage Controls
                </h3>
                
                <div className="mb-4 flex gap-2">
                  <button
                    onClick={() => setDemoMode('clipped')}
                    className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'clipped' ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ❌ Clipped
                  </button>
                  <button
                    onClick={() => setDemoMode('portal')}
                    className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'portal' ? 'bg-purple-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                  >
                    ✅ Portal
                  </button>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mb-4 w-full rounded bg-purple-700 px-4 py-2 font-medium hover:bg-purple-600"
                >
                  Open Performance
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded bg-slate-800/50 p-3">
                    <div className="text-xs text-slate-500">Mode</div>
                    <div className="font-mono text-sm">{demoMode.toUpperCase()}</div>
                  </div>
                  <div className="rounded bg-slate-800/50 p-3">
                    <div className="text-xs text-slate-500">Renders</div>
                    <div className="font-mono text-sm">{renderCount}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setClippedModalVisible(false);
                  }}
                  className="mt-4 w-full rounded border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800"
                >
                  Reset Stage
                </button>
              </div>

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <EyeOff className="h-5 w-5 text-purple-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Athenian Court</span>
                    <span className="text-sm font-medium">Parent Component DOM</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Pyramus & Thisbe</span>
                    <span className="text-sm font-medium">Child Component (Modal)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Chalk Circle Stage</span>
                    <span className="text-sm font-medium">Portal Target Node</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Play-Within-a-Play</span>
                    <span className="text-sm font-medium">createPortal()</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Wall (Tom Snout)</span>
                    <span className="text-sm font-medium">UI Needing Breakout</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Duke's Viewpoint</span>
                    <span className="text-sm font-medium">User Viewport</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-purple-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-purple-200/80">
                  {chapter === 0 && "Portals render children to a different DOM node while keeping them in the React tree—like a play within a play."}
                  {chapter === 1 && "Without portals, modals get clipped by parent overflow:hidden or z-index—the lion tangled in court furniture."}
                  {chapter === 2 && "createPortal(child, domNode) lets components escape parent constraints—Quince's 'Give it a stage of its own.'"}
                  {chapter === 3 && "Portals maintain proper stacking context for overlays—a roar on stage vs. in the ear."}
                  {chapter === 4 && "Portal placement is about presentation context, not component quality—'seen in their proper place.'"}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && "\"A tedious brief scene... presented in its own space.\""}
                  {chapter === 1 && "\"The lion amidst the lords is but a tangled costume.\""}
                  {chapter === 2 && "\"Give it a stage of its own.\""}
                  {chapter === 3 && "\"A roar in the ear breaks the spell; a roar on the stage makes it.\""}
                  {chapter === 4 && "\"The worst are no worse, if they are seen in their proper place.\""}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — {chapter === 0 || chapter === 4 ? "Duke Theseus" : "Peter Quince"}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-3xl font-bold text-purple-100">
              {currentChapter.title}
            </h2>
            <div className="mt-4 leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-purple-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-2 rounded bg-purple-500"></div>
              <h3 className="text-2xl font-bold text-purple-200">
                Interactive Stage
              </h3>
            </div>

            {/* Chapter-specific demos */}
            {chapter === 0 && (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-lg font-semibold">The Athenian Court</h4>
                    <div className="rounded-lg border-2 border-slate-700 bg-slate-900 p-4">
                      <p className="text-slate-400">Main application UI with its own layout and stacking context.</p>
                      <div className="mt-4 h-40 overflow-hidden rounded border border-slate-800">
                        <p className="p-4 text-slate-500">Parent container with overflow:hidden</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-3 text-lg font-semibold">The Separate Stage</h4>
                    <div className="rounded-lg border-2 border-purple-700 bg-purple-950/30 p-4">
                      <p className="text-purple-300">Portal target node (div#portal-root) outside main hierarchy.</p>
                      <div className="mt-4 flex h-40 items-center justify-center rounded border-2 border-dashed border-purple-500/50">
                        <span className="text-purple-400/70">Chalk circle stage area</span>
                      </div>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={`// Portal target in HTML
<html>
  <body>
    <div id="root"></div> {/* Main app */}
    <div id="portal-root"></div> {/* Portal target */}
  </body>
</html>`}
                  language="html"
                  variant="default"
                  title="// Setting the Stage"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="rounded-xl border-2 border-red-500/30 bg-slate-900 p-4">
                  <div className="mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <h4 className="text-lg font-bold text-red-300">Clipped Performance</h4>
                  </div>
                  
                  <div className="relative h-64 overflow-hidden rounded-lg border-2 border-red-700 bg-slate-950 p-4">
                    <p className="text-slate-400">Parent container with overflow:hidden (Athenian Court)</p>
                    
                    <button
                      onClick={() => setClippedModalVisible(true)}
                      className="mt-4 rounded bg-red-700 px-4 py-2 hover:bg-red-600"
                    >
                      Start Performance
                    </button>

                    {clippedModalVisible && <ClippedModal />}
                    
                    <div className="absolute bottom-2 right-2 text-xs text-red-500/70">
                      ❌ Modal clipped by container
                    </div>
                  </div>
                  
                  <p className="mt-3 text-sm text-red-400/80">
                    The modal renders inside the parent but gets clipped by overflow:hidden—Snug's lion tangled in court furniture.
                  </p>
                </div>

                <CodeBlock
                  code={antiPatternCode}
                  language="tsx"
                  variant="error"
                  title="// ❌ Anti-Pattern: Modal Inside Clipping Container"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded-xl border-2 border-purple-500/30 bg-slate-900 p-4">
                  <div className="mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-purple-500" />
                    <h4 className="text-lg font-bold text-purple-300">Portal Solution</h4>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                      <h5 className="mb-2 font-semibold">React Component Tree</h5>
                      <div className="space-y-2 text-sm">
                        <div className="rounded bg-slate-800 p-2">App</div>
                        <div className="ml-4 rounded bg-purple-900/50 p-2">PortalModal (logical child)</div>
                        <div className="ml-8 rounded bg-purple-700/30 p-2">Performance content</div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-purple-800 bg-purple-950/30 p-4">
                      <h5 className="mb-2 font-semibold">DOM Render Location</h5>
                      <div className="space-y-2 text-sm">
                        <div className="rounded bg-slate-800 p-2">div#root</div>
                        <div className="rounded bg-slate-800 p-2">Main App UI</div>
                        <div className="mt-4 rounded bg-purple-900 p-2">div#portal-root</div>
                        <div className="ml-4 rounded bg-purple-700 p-2">PortalModal (actual DOM)</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 w-full rounded bg-purple-700 px-4 py-3 font-medium hover:bg-purple-600"
                  >
                    Perform with Portal
                  </button>
                </div>

                <CodeBlock
                  code={portalSolutionCode}
                  language="tsx"
                  variant="success"
                  title="// ✅ Solution: Using createPortal"
                  defaultExpanded={true}
                />
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={portalSolutionCode}
                  language="tsx"
                  themeColor="purple"
                  badLabel="❌ Clipped in Parent"
                  goodLabel="✅ Portal to Separate Node"
                  badExplanation="Modal gets clipped by parent's overflow:hidden, z-index issues, visual obstruction"
                  goodExplanation="Modal renders to document.body or separate node, escapes parent constraints, proper stacking"
                />

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div className="rounded-xl border-2 border-red-500/30 bg-slate-900 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-bold text-red-300">Clipped Performance</h4>
                      <span className="rounded-full bg-red-900/50 px-2 py-1 text-xs">Anti-Pattern</span>
                    </div>
                    <div className="h-48 overflow-hidden rounded-lg border border-red-800 bg-slate-950">
                      <div className="p-4">
                        <p className="text-sm text-slate-500">Court container (overflow:hidden)</p>
                        {demoMode === 'clipped' && isModalOpen && (
                          <div className="mt-4 rounded bg-red-900/50 p-3">
                            <p className="text-red-300">"ROAR!" (muffled)</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-red-400/80">
                      Roar in the ear—breaks the illusion, intrusive placement.
                    </p>
                  </div>

                  <div className="rounded-xl border-2 border-purple-500/30 bg-slate-900 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <h4 className="font-bold text-purple-300">Portal Performance</h4>
                      <span className="rounded-full bg-purple-900/50 px-2 py-1 text-xs">Solution</span>
                    </div>
                    <div className="h-48 rounded-lg border border-purple-800 bg-purple-950/20">
                      <div className="p-4">
                        <p className="text-sm text-purple-500">Stage area (separate node)</p>
                        {demoMode === 'portal' && isModalOpen && (
                          <div className="mt-4 rounded bg-purple-900/50 p-3">
                            <p className="text-purple-300">"ROAR!" (clear projection)</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-purple-400/80">
                      Roar on the stage—maintains separation, theatrical distance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded-xl border-2 border-purple-500/30 bg-slate-900 p-4">
                  <div className="mb-4">
                    <h4 className="text-lg font-bold text-purple-300">Complete Portal Implementation</h4>
                    <p className="mt-2 text-slate-400">Best practices for production use</p>
                  </div>

                  <CodeBlock
                    code={createPortalExample}
                    language="tsx"
                    variant="success"
                    title="// 💡 Complete Portal Pattern"
                    defaultExpanded={true}
                  />

                  <div className="mt-6 grid gap-4 rounded-lg bg-slate-950/50 p-4 md:grid-cols-3">
                    <div className="rounded-lg bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Use Cases</div>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Modals & Dialogs</li>
                        <li>• Tooltips & Popovers</li>
                        <li>• Notifications</li>
                        <li>• Dropdowns (context menus)</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Benefits</div>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Escape parent overflow</li>
                        <li>• Control z-index stacking</li>
                        <li>• Event bubbling works</li>
                        <li>• Maintain React tree</li>
                      </ul>
                    </div>
                    <div className="rounded-lg bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Best Practices</div>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Create portal root in HTML</li>
                        <li>• Handle SSR (return null)</li>
                        <li>• Clean up on unmount</li>
                        <li>• Test with screen readers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Render Portal Modal (always in DOM if open) */}
            {isModalOpen && demoMode === 'portal' && (
              <PortalModal>
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <Mask className="h-12 w-12 text-purple-400" />
                  </div>
                  <h4 className="mb-2 text-xl font-bold">Pyramus and Thisbe</h4>
                  <p className="text-slate-300">Performed by the Mechanicals</p>
                  <div className="mt-4 rounded bg-purple-900/30 p-3">
                    <p className="font-mono text-lg">"ROAR!"</p>
                    <p className="text-xs text-purple-300/70">- Snug as the Lion</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="mt-6 rounded bg-slate-700 px-4 py-2 hover:bg-slate-600"
                  >
                    End Performance
                  </button>
                </div>
              </PortalModal>
            )}
          </section>

          {/* Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="purple"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}