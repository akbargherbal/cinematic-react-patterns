import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock";

/**
 * CodeComparison - Toggle between "Bad" and "Good" code examples
 *
 * Solves the horizontal scrolling problem of side-by-side code blocks on mobile
 * by showing one full-width code block at a time with toggle buttons.
 *
 * @example Basic usage
 * ```tsx
 * <CodeComparison
 *   badCode={`// Bad: Index as key
 * {items.map((item, idx) => (
 *   <div key={idx}>{item.name}</div>
 * ))}`}
 *   goodCode={`// Good: Unique ID as key
 * {items.map((item) => (
 *   <div key={item.id}>{item.name}</div>
 * ))}`}
 *   language="tsx"
 *   themeColor="cyan"
 * />
 * ```
 *
 * @example With explanations
 * ```tsx
 * <CodeComparison
 *   badCode={stateCode}
 *   goodCode={reducerCode}
 *   language="typescript"
 *   badLabel="Using multiple useState"
 *   goodLabel="Using useReducer"
 *   badExplanation="Scattered state logic makes it hard to track relationships"
 *   goodExplanation="Centralized state logic with predictable transitions"
 *   themeColor="amber"
 * />
 * ```
 */

interface CodeComparisonProps {
  /** Code example showing the incorrect/suboptimal approach */
  badCode: string;

  /** Code example showing the correct/optimal approach */
  goodCode: string;

  /** Programming language for syntax highlighting (e.g., 'tsx', 'javascript', 'typescript') */
  language: string;

  /**
   * Theme color from the safelist: cyan, amber, purple, emerald, red, blue
   * Controls the active toggle button styling
   */
  themeColor:
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose";

  /** Custom label for the "bad" example (default: "❌ Problematic") */
  badLabel?: string;

  /** Custom label for the "good" example (default: "✅ Better") */
  goodLabel?: string;

  /** Optional explanation text shown below the "bad" code */
  badExplanation?: string;

  /** Optional explanation text shown below the "good" code */
  goodExplanation?: string;

  /** Start with good code visible instead of bad (default: false) */
  startWithGood?: boolean;

  /** Optional additional CSS classes */
  className?: string;
}

export const CodeComparison: React.FC<CodeComparisonProps> = ({
  badCode,
  goodCode,
  language,
  themeColor,
  badLabel = "❌ Problematic",
  goodLabel = "✅ Better",
  badExplanation,
  goodExplanation,
  startWithGood = false,
  className = "",
}) => {
  const [showGood, setShowGood] = useState(startWithGood);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toggle Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowGood(false)}
          className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
            !showGood
              ? `border-2 border-red-500/50 bg-red-900/40 text-red-200`
              : "border-2 border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
          } `}
          aria-pressed={!showGood}
        >
          {badLabel}
        </button>

        <button
          onClick={() => setShowGood(true)}
          className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 ${
            showGood
              ? `bg-${themeColor}-900/40 border-2 border-${themeColor}-500/50 text-${themeColor}-200`
              : "border-2 border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
          } `}
          aria-pressed={showGood}
        >
          {goodLabel}
        </button>
      </div>

      {/* Code Display */}
      <div className="relative">
        {showGood ? (
          <div className="space-y-2">
            <CodeBlock code={goodCode} language={language} />
            {goodExplanation && (
              <p
                className={`text-sm text-${themeColor}-400 bg-${themeColor}-950/20 border border-${themeColor}-500/30 rounded-lg p-4`}
              >
                <strong className={`text-${themeColor}-300`}>
                  Why this works:{" "}
                </strong>
                {goodExplanation}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <CodeBlock code={badCode} language={language} />
            {badExplanation && (
              <p className="rounded-lg border border-red-500/30 bg-red-950/20 p-4 text-sm text-red-400">
                <strong className="text-red-300">Why this fails: </strong>
                {badExplanation}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeComparison;
