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
      content: "Your narrative explanation of the concept using fiction metaphors...",
      demo: (
        <div className="space-y-6">
          {/* Your interactive demo components */}
          <div className="bg-slate-900/50 border border-cyan-500/20 rounded-lg p-6">
            <h3 className="font-bold text-cyan-200 mb-4">Interactive Demo</h3>
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
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans">
      {/* Standardized Header */}
      <ModuleHeader
        icon={Brain}
        title="Your Fiction Work Title"
        subtitle="Character • Context • Year"
        concept="React Concept: What You're Teaching"
        themeColor="cyan"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Standardized Layout with Sidebar */}
        <ModuleLayout
          sidebar={
            <div className="sticky top-24">
              {/* Quick Reference Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-4 text-cyan-100">
                  Quick Reference
                </h3>

                <div className="space-y-4">
                  {/* Metrics or status displays */}
                  <div>
                    <h4 className="font-medium text-slate-200 mb-2">📊 Key Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Renders:</span>
                        <span className="font-mono text-cyan-300">12</span>
                      </div>
                    </div>
                  </div>

                  {/* Metaphor mapping */}
                  <div className="pt-4 border-t border-slate-800">
                    <h4 className="font-medium text-slate-200 mb-2">🎭 Metaphor Map</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-500">•</span>
                        <span><strong>Fiction Element</strong> = React Concept</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Optional quote card */}
              <div className="mt-4 bg-slate-900/30 border border-slate-800 rounded-xl p-4">
                <p className="text-sm text-slate-400 italic">
                  "Memorable quote from your fiction source"
                </p>
                <p className="text-xs text-slate-500 mt-2 text-right">
                  — Character Name
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-cyan-100">
              {currentChapter.title}
            </h2>
            <div className="text-slate-300 leading-relaxed space-y-4">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="bg-slate-900/40 border border-cyan-500/20 rounded-xl p-6 sm:p-8 mb-8 sm:mb-12 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-6 bg-cyan-500 rounded"></div>
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