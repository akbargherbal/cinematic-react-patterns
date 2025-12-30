import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

/**
 * [Module Name]: [Concept]
 * Teaching [React Concept] through [Fiction Source] metaphors
 */

export default function ModuleTemplate() {
  const [chapter, setChapter] = useState(0);

  // Example code
  const wrongExample = `// ❌ Common Mistake
function BrokenComponent() {
  // Your broken example here
}`;

  const rightExample = `// ✅ Correct Approach
function FixedComponent() {
  // Your fixed example here
}`;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 px-8">
        <h1 className="text-4xl font-bold">[Module Title]</h1>
        <p className="text-blue-100">Teaching [Concept]</p>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-8">
        {/* Problem Section */}
        <div className="border-4 border-red-500 bg-red-50/20 p-6 rounded-2xl mb-6">
          <h2 className="text-2xl font-bold mb-4">❌ The Problem</h2>
          <p className="text-gray-600 mb-6">
            Explain what's wrong...
          </p>

          {/* Just use CodeBlock - that's it! */}
          <CodeBlock
            code={wrongExample}
            variant="error"
            title="// ❌ Common Mistake"
          />
        </div>

        {/* Solution Section */}
        <div className="border-4 border-green-500 bg-green-50/20 p-6 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4">✅ The Solution</h2>
          <p className="text-gray-600 mb-6">
            Explain the fix...
          </p>

          {/* Just use CodeBlock - that's it! */}
          <CodeBlock
            code={rightExample}
            variant="success"
            title="// ✅ Correct Approach"
          />
        </div>
      </main>
    </div>
  );
}