import { useState } from "react";
import { Brain } from "lucide-react"; // Change to your module's icon
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeComparison } from "@/components/common/CodeComparison";
import { CodeBlock } from "@/components/common/CodeBlock";

/**
 * [Module Name]: [React Concept]
 * Teaching [React Concept] through [Fiction Source]
 *
 * Replace placeholders:
 * - Module name and fiction source
 * - Icon import (Brain, Code, Zap, etc.)
 * - Theme color (cyan, amber, purple, emerald, red, blue)
 * - Chapter content and demos
 */

export default function ModuleTemplate() {
  const [chapter, setChapter] = useState(0);

  // Define your chapters
  const chapters = [
    {
      title: "Chapter 1: Introduction",
      content:
        "Your narrative explanation of the concept using fiction metaphors...",
      demo: (
        <div className="space-y-6">
          {/* Your interactive demo components */}
          <div className="rounded-lg border border-cyan-500/20 bg-slate-900/50 p-6">
            <h3 className="mb-4 font-bold text-cyan-200">Interactive Demo</h3>
            <p className="text-slate-300">Your demo content here...</p>
          </div>

          {/* Code comparison: bad vs good */}
          <CodeComparison
            badCode={`// ❌ Common mistake
function BrokenComponent() {
  // Your anti-pattern example
  const [state, setState] = useState(0);
  state = 5; // Direct mutation!
  return <div>{state}</div>;
}`}
            goodCode={`// ✅ Correct approach
function FixedComponent() {
  // Your correct pattern
  const [state, setState] = useState(0);
  setState(5); // Proper state update
  return <div>{state}</div>;
}`}
            language="tsx"
            themeColor="cyan"
            badLabel="❌ Anti-Pattern"
            goodLabel="✅ Correct Pattern"
            badExplanation="Explain why this approach is problematic"
            goodExplanation="Explain why this approach is better"
          />
        </div>
      ),
    },
    {
      title: "Chapter 2: Deep Dive",
      content: "Further exploration of the concept...",
      demo: (
        <div className="space-y-6">
          {/* Single code example */}
          <CodeBlock
            code={`// Advanced example
function AdvancedComponent() {
  // Your advanced example here
  return <div>Advanced usage</div>;
}`}
            language="tsx"
            title="// Advanced Usage"
            defaultExpanded={true}
          />
        </div>
      ),
    },
  ];

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Standardized Header */}
      <ModuleHeader
        icon={Brain}
        title="Your Fiction Work Title"
        subtitle="Character • Context • Year"
        concept="React Concept: What You're Teaching"
        themeColor="cyan"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Standardized Layout with Sidebar */}
        <ModuleLayout
          sidebar={
            <div className="sticky top-24">
              {/* Quick Reference Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
                <h3 className="mb-4 text-lg font-bold text-cyan-100">
                  Quick Reference
                </h3>

                <div className="space-y-4">
                  {/* Metrics or status displays */}
                  <div>
                    <h4 className="mb-2 font-medium text-slate-200">
                      📊 Key Metrics
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Renders:</span>
                        <span className="font-mono text-cyan-300">12</span>
                      </div>
                    </div>
                  </div>

                  {/* Metaphor mapping */}
                  <div className="border-t border-slate-800 pt-4">
                    <h4 className="mb-2 font-medium text-slate-200">
                      🎭 Metaphor Map
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-500">•</span>
                        <span>
                          <strong>Fiction Element</strong> = React Concept
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Optional quote card */}
              <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm text-slate-400 italic">
                  "Memorable quote from your fiction source"
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Character Name
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none sm:mb-12">
            <h2 className="mb-4 text-2xl font-bold text-cyan-100 sm:text-3xl">
              {currentChapter.title}
            </h2>
            <div className="space-y-4 leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-cyan-500/20 bg-slate-900/40 p-6 backdrop-blur-sm sm:mb-12 sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-cyan-500"></div>
              <h3 className="text-xl font-bold text-cyan-200">
                Interactive Demonstration
              </h3>
            </div>
            {currentChapter.demo}
          </section>

          {/* Standardized Navigation */}
          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="cyan"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}
