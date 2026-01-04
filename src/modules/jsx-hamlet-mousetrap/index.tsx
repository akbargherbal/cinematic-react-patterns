import { useState, useEffect } from "react";
import { BookOpen, Shield, CheckCircle, Zap, FileText, Code, Theater, Eye, AlertCircle } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string;
}

export default function JSXHamletMousetrap(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [jsxInput, setJsxInput] = useState<string>(`<div className="scene">
  <h1>The Mousetrap</h1>
  <p style={{ fontStyle: "italic" }}>
    The play's the thing
    <span style={{ color: "var(--tw-color-amber-400)" }}>
      Wherein I'll catch the conscience of the king.
    </span>
  </p>
  {isPaused ? <div className="pause">*pregnant pause*</div> : null}
</div>`);
  const [compiledOutput, setCompiledOutput] = useState<string>("");
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [compilationCount, setCompilationCount] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'broken' | 'fixed'>('fixed');

  // Simulate JSX compilation
  useEffect(() => {
    if (chapter === 0 || chapter === 2) {
      const timer = setTimeout(() => {
        const compiled = jsxInput
          .replace(/className=/g, 'class=')
          .replace(/style=\{\{([^}]+)\}\}/g, 'style="$1"')
          .replace(/\{isPaused \? ([^:]+) : null\}/g, isPaused ? '$1' : '');
        
        setCompiledOutput(compiled);
        setCompilationCount(prev => Math.min(prev + 1, 50));
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [jsxInput, isPaused, chapter]);

  const chapters: Chapter[] = [
    { 
      title: "The Script in the Candlelight", 
      content: "Hamlet's script blends dialogue with stage directions—a unified description of the performance. JSX works the same way: it's a declarative syntax that describes your UI within JavaScript, not the final UI itself." 
    },
    { 
      title: "The Words, Lost in Air", 
      content: "Without the script, actors improvise chaotically. Without JSX, developers use verbose `React.createElement` calls that separate structure from logic, making UI intent hard to visualize and maintain." 
    },
    { 
      title: "One Intention Writ Together", 
      content: "Stage directions like '*pregnant pause*' are embedded in dialogue—inseparable. JSX unifies HTML-like tags with JavaScript logic in one readable syntax, compiling down to efficient React instructions." 
    },
    { 
      title: "A Flourish or a Breath", 
      content: "An actor's improv flourish ruins the moment. Manual `createElement` calls often miss the intent. JSX ensures your rendered output matches your developer intent through descriptive, reliable syntax." 
    },
    { 
      title: "The Conscience is Caught", 
      content: "The script performed perfectly provokes Claudius's reaction. JSX's descriptive power lets React compile your intent into precise UI that users experience exactly as designed—no improvisation needed." 
    }
  ];

  const currentChapter = chapters[chapter];

  // Code examples
  const antiPatternCode = `// ❌ Without JSX - Chaotic Improvisation
const scene = React.createElement(
  "div",
  { class: "scene" },
  React.createElement("h1", null, "The Mousetrap"),
  React.createElement(
    "p",
    { style: { fontStyle: "italic" } },
    "The play's the thing",
    React.createElement(
      "span",
      { style: { color: "#fbbf24" } },
      "Wherein I'll catch the conscience of the king."
    )
  ),
  isPaused ? React.createElement("div", { class: "pause" }, "*pregnant pause*") : null
);`;

  const correctPatternCode = `// ✅ With JSX - Unified Script
const scene = (
  <div className="scene">
    <h1>The Mousetrap</h1>
    <p style={{ fontStyle: "italic" }}>
      The play's the thing
      <span style={{ color: "#fbbf24" }}>
        Wherein I'll catch the conscience of the king.
      </span>
    </p>
    {isPaused && <div className="pause">*pregnant pause*</div>}
  </div>
);`;

  const embeddedLogicCode = `// JSX Embedding JavaScript Logic
function PlayScript({ isPaused, kingName }) {
  return (
    <div className="scene">
      <h1>{"The " + kingName + "'s Conscience"}</h1>
      {isPaused ? (
        <div className="dramatic-pause">
          *tension builds*
        </div>
      ) : (
        <p>The play proceeds...</p>
      )}
    </div>
  );
}`;

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={BookOpen}
        title="Hamlet's Mousetrap"
        subtitle="Hamlet, The Playwright, c. 1600"
        concept="React Concept: JSX (JavaScript XML)"
        themeColor="amber"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* Interactive Controls */}
              {(chapter === 0 || chapter === 2) && (
                <div className="rounded-xl border border-amber-500/30 bg-slate-900/80 p-4">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-200">
                    <Zap className="h-5 w-5" />
                    Script Controls
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Pause</span>
                      <button
                        onClick={() => setIsPaused(!isPaused)}
                        className={`rounded px-3 py-1 text-sm font-medium transition-colors ${isPaused ? 'bg-amber-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                      >
                        {isPaused ? "Paused" : "Playing"}
                      </button>
                    </div>
                    <div className="rounded bg-slate-800/30 p-3">
                      <div className="text-xs text-slate-500">Compilations</div>
                      <div className="font-mono text-xl">{compilationCount}</div>
                    </div>
                    {compilationCount >= 40 && (
                      <div className="rounded bg-red-900/30 p-2 text-xs text-red-300">
                        <AlertCircle className="mr-1 inline h-3 w-3" />
                        Near safety limit (50)
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-amber-200">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hamlet's Script</span>
                    <span className="text-sm font-medium text-amber-300">JSX Code</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">The Players</span>
                    <span className="text-sm font-medium text-amber-300">JavaScript Runtime</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Stage Performance</span>
                    <span className="text-sm font-medium text-amber-300">Rendered DOM</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Stage Directions</span>
                    <span className="text-sm font-medium text-amber-300">JSX Tags & Attributes</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Hamlet's Strategy</span>
                    <span className="text-sm font-medium text-amber-300">JavaScript Logic</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Claudius's Reaction</span>
                    <span className="text-sm font-medium text-amber-300">User Response</span>
                  </div>
                </div>
              </div>

              {/* Key Insight Card */}
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-amber-200/80">
                  {chapter === 0 && "JSX is a declarative description of UI, not the UI itself—just as a play script describes the performance."}
                  {chapter === 1 && "Without JSX, `createElement` calls become verbose and separate structure from logic, causing maintenance chaos."}
                  {chapter === 2 && "JSX embeds JavaScript expressions within HTML-like syntax, creating a unified representation of UI and logic."}
                  {chapter === 3 && "JSX ensures your rendered output matches developer intent, unlike error-prone manual element creation."}
                  {chapter === 4 && "The JSX compiler transforms descriptive syntax into efficient React instructions that render precisely."}
                </p>
              </div>

              {/* Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  {chapter === 0 && "\"Look you, this is the script. The words are the action, the directions are the soul of it.\""}
                  {chapter === 1 && "\"They mouth the words, but the meaning is lost in the air between them.\""}
                  {chapter === 2 && "\"Suit the action to the word, the word to the action. They are not two things, but one intention writ together.\""}
                  {chapter === 3 && "\"A flourish murders the meaning; a pause makes it breathe.\""}
                  {chapter === 4 && "\"The script was performed, not merely spoken.\""}
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — {chapter === 0 ? "Hamlet" : "The Player"}
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="mb-4 text-3xl font-bold text-amber-100">
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
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-amber-400" />
                      <span className="font-medium">JSX Script (Input)</span>
                    </div>
                    <CodeBlock
                      code={jsxInput}
                      language="tsx"
                      variant="default"
                      title="// Hamlet's Script - JSX Description"
                      defaultExpanded={true}
                    />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Code className="h-4 w-4 text-amber-400" />
                      <span className="font-medium">Compiled Performance</span>
                    </div>
                    <div className="rounded-lg bg-slate-800 p-4">
                      <div className="mb-2 text-xs text-slate-500">React.createElement calls:</div>
                      <pre className="overflow-x-auto text-sm text-slate-300">
                        {compiledOutput || "// Compiling..."}
                      </pre>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border border-amber-500/20 bg-amber-950/10 p-4">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Theater className="h-4 w-4" />
                    <span className="font-medium">Rendered Scene Preview</span>
                  </div>
                  <div className="mt-3 rounded bg-slate-800/50 p-4">
                    <div className="scene">
                      <h1 className="text-xl font-bold">The Mousetrap</h1>
                      <p className="italic">
                        The play's the thing
                        <span className="ml-1 text-amber-400">
                          Wherein I'll catch the conscience of the king.
                        </span>
                      </p>
                      {isPaused && (
                        <div className="mt-2 text-sm text-slate-400">*pregnant pause*</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setDemoMode('broken')}
                    className={`rounded px-4 py-2 font-medium transition-colors ${demoMode === 'broken' ? 'bg-red-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                  >
                    ❌ Chaotic Improvisation
                  </button>
                  <button
                    onClick={() => setDemoMode('fixed')}
                    className={`rounded px-4 py-2 font-medium transition-colors ${demoMode === 'fixed' ? 'bg-amber-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                  >
                    ✅ Scripted Performance
                  </button>
                </div>

                {demoMode === 'broken' ? (
                  <div className="space-y-4">
                    <div className="rounded border border-red-500/30 bg-red-950/20 p-4">
                      <div className="flex items-center gap-2 text-red-300">
                        <AlertCircle className="h-4 w-4" />
                        <span className="font-medium">Performance Breakdown</span>
                      </div>
                      <p className="mt-2 text-sm text-red-300/80">
                        Without the script, actors improvise—resulting in mismatched delivery and lost intent.
                        Manual `createElement` calls create similar chaos in code.
                      </p>
                    </div>
                    <CodeBlock
                      code={antiPatternCode}
                      language="tsx"
                      variant="error"
                      title="// ❌ Without JSX - Verbose and Error-Prone"
                      defaultExpanded={true}
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded border border-amber-500/30 bg-amber-950/20 p-4">
                      <div className="flex items-center gap-2 text-amber-300">
                        <CheckCircle className="h-4 w-4" />
                        <span className="font-medium">Scripted Precision</span>
                      </div>
                      <p className="mt-2 text-sm text-amber-300/80">
                        With the script, every pause and emphasis is intentional.
                        JSX provides the same descriptive clarity for UI.
                      </p>
                    </div>
                    <CodeBlock
                      code={correctPatternCode}
                      language="tsx"
                      variant="success"
                      title="// ✅ With JSX - Clear and Unified"
                      defaultExpanded={true}
                    />
                  </div>
                )}
              </div>
            )}

            {chapter === 2 && (
              <div className="space-y-6">
                <div className="rounded border border-amber-500/30 bg-amber-950/20 p-4">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Eye className="h-4 w-4" />
                    <span className="font-medium">Unified Intention</span>
                  </div>
                  <p className="mt-2 text-sm text-amber-300/80">
                    Stage directions (*pregnant pause*) are embedded directly in dialogue.
                    JSX embeds JavaScript expressions directly in HTML-like syntax.
                  </p>
                </div>
                
                <CodeBlock
                  code={embeddedLogicCode}
                  language="tsx"
                  variant="success"
                  title="// JSX Embeds Logic Within Structure"
                  defaultExpanded={true}
                />

                <div className="grid gap-4 rounded-lg bg-slate-800/50 p-4 lg:grid-cols-2">
                  <div>
                    <div className="mb-2 text-sm font-medium text-slate-400">Input (JSX)</div>
                    <div className="rounded bg-slate-900 p-3">
                      <code className="text-sm">
                        {"<div>"}<br/>
                        &nbsp;&nbsp;{"<h1>{'The ' + kingName + \"'s Conscience'}</h1>"}<br/>
                        &nbsp;&nbsp;{"{isPaused ? <div>*tension*</div> : <p>...</p>}"}<br/>
                        {"</div>"}
                      </code>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-sm font-medium text-slate-400">Output (Rendered)</div>
                    <div className="rounded bg-slate-900 p-3">
                      <div className="text-amber-100">
                        <h1 className="text-lg font-bold">{"The Claudius's Conscience"}</h1>
                        {isPaused ? (
                          <div className="mt-2 text-slate-400">*tension builds*</div>
                        ) : (
                          <p className="mt-2">The play proceeds...</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {chapter === 3 && (
              <div className="space-y-6">
                <CodeComparison
                  badCode={antiPatternCode}
                  goodCode={correctPatternCode}
                  language="tsx"
                  themeColor="amber"
                  badLabel="❌ Manual createElement"
                  goodLabel="✅ JSX Syntax"
                  badExplanation="Verbose, separates structure from logic, hard to visualize intent, error-prone"
                  goodExplanation="Unified syntax, clear visual structure, embeds logic naturally, maintains intent"
                />

                <div className="grid gap-4 rounded-lg bg-slate-800/50 p-4 lg:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-red-400">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">Improvised Failure</span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Missing props, inconsistent nesting, unclear intent—just like an actor improvising without direction.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-amber-400">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium">Scripted Success</span>
                    </div>
                    <p className="text-sm text-slate-400">
                      Clear structure, proper attribute syntax, embedded logic—just as the script guides every performance detail.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {chapter === 4 && (
              <div className="space-y-6">
                <div className="rounded border border-amber-500/30 bg-amber-950/20 p-4">
                  <div className="flex items-center gap-2 text-amber-300">
                    <Theater className="h-4 w-4" />
                    <span className="font-medium">Full Performance</span>
                  </div>
                  <p className="mt-2 text-sm text-amber-300/80">
                    The complete Mousetrap script compiled into a perfect performance.
                    JSX compiles your entire component into precise React instructions.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <CodeBlock
                      code={`// Complete JSX Component
function MousetrapPlay({ characters, isRevealing }) {
  return (
    <div className="theater-scene">
      <h1 className="play-title">The Mousetrap</h1>
      <div className="actors">
        {characters.map((actor, index) => (
          <ActorCard 
            key={index}
            name={actor.name}
            role={actor.role}
            isGuilty={actor.isGuilty}
          />
        ))}
      </div>
      {isRevealing && (
        <RevelationScene 
          guiltyCharacter={characters.find(a => a.isGuilty)}
        />
      )}
    </div>
  );
}`}
                      language="tsx"
                      variant="success"
                      title="// Complete JSX Component"
                      defaultExpanded={true}
                    />
                  </div>
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <div className="mb-4 text-center text-lg font-bold text-amber-300">
                      The Mousetrap - Final Performance
                    </div>
                    <div className="space-y-4">
                      <div className="rounded bg-slate-900 p-3">
                        <div className="font-medium text-amber-200">Actor: Player King</div>
                        <div className="text-sm text-slate-400">Role: Murdered King</div>
                      </div>
                      <div className="rounded bg-slate-900 p-3">
                        <div className="font-medium text-amber-200">Actor: Player Queen</div>
                        <div className="text-sm text-slate-400">Role: Mourning Queen</div>
                      </div>
                      <div className="rounded bg-red-900/30 p-3">
                        <div className="font-medium text-red-200">Actor: Lucianus</div>
                        <div className="text-sm text-red-400">Role: Nephew (The Murderer)</div>
                      </div>
                    </div>
                    {isPaused && (
                      <div className="mt-4 rounded border border-amber-500/30 bg-amber-950/20 p-3 text-center">
                        <div className="text-amber-400">*tension builds*</div>
                        <div className="mt-1 text-xs text-slate-500">
                          The king's conscience is caught...
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>

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