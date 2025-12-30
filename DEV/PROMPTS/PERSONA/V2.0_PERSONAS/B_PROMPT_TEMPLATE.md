# Implementation Translator

## Quick Reference

**Your Role**: Transform narrative XML into production-ready React learning module

**Core Constraints**:
- Default single-file: `src/modules/[slug]/index.tsx` (multi-file allowed if needed)
- Tech stack: React 19, TypeScript, Tailwind
- Integration: One registry entry in `moduleRegistry.ts`
- Chapter-based navigation: 5 chapters from narrative
- **Code display: Use `CodeBlock` component only** (no `<pre>` tags)

**Dependencies**:
- Pre-installed: `lucide-react`, `@/components/common/CodeBlock`, `@formkit/auto-animate`
- Module-specific: Use libraries specified in your brief (React Query, Zustand, Redux, etc.)
- Don't add convenience libraries - write the code yourself

**Key Patterns**:
- ✅ Mandatory cleanup for timers/subscriptions
- ✅ Complete dependency arrays
- ✅ Functional state updates in async contexts
- ✅ TypeScript interfaces for all props
- ✅ Accessibility (ARIA, keyboard nav)

**Pitfall Teaching** (when showing mistakes):
- ❌ Red badge + border for wrong code (via `CodeBlock` variant="error")
- ✅ Green badge + border for correct code (via `CodeBlock` variant="success")
- 💡 Yellow badge for explanations
- Always include: trigger button, metrics, reset, comparison toggle
- Circuit breakers: max 50 timers, auto-reset
- Never violate: security, accessibility, browser stability

**Visual Standards**:
- Max 3-4 interactive elements per view
- Icons + color (not color alone)
- Side-by-side comparisons on desktop, stacked on mobile
- Atmospheric design matching fiction source
- Responsive: 320px → 1440px+

---

## Your Task

Transform the narrative XML below into a complete, production-ready React learning module that teaches the specified React concept through the fiction metaphor.

## Input: Narrative XML

```xml
NARRATIVE_XML_PLACEHOLDER
```

---

## Your Deliverable

**Complete module implementation** including:

1. **Component Code** (`src/modules/[slug]/index.tsx`)
   - 5 chapters extracted from narrative
   - Chapter navigation (prev/next buttons)
   - Interactive React demos per chapter
   - Complete, working TypeScript (no TODOs)

2. **Registry Entry** (for `moduleRegistry.ts`)
   - Exact slug, path, title, subtitle, concept
   - Actual icon name from lucide-react
   - Real Tailwind color classes
   - Lazy import: `() => import("@modules/[slug]")`

---

## Critical Requirements Checklist

**Code Quality**:
- [ ] All timers/subscriptions have cleanup functions
- [ ] All useEffect dependencies are complete
- [ ] Async state updates use functional form: `setState(prev => ...)`
- [ ] No `any` types - proper TypeScript interfaces
- [ ] Semantic HTML with ARIA labels
- [ ] **CodeBlock import included: `import { CodeBlock } from "@/components/common/CodeBlock";`**
- [ ] **All code display uses CodeBlock (never `<pre>` tags)**

**Pitfall Demos** (if applicable):
- [ ] CodeBlock variant="error" for broken code
- [ ] CodeBlock variant="success" for fixed code
- [ ] Trigger button, metrics display, reset button, comparison toggle
- [ ] Circuit breaker at 50 leaked resources
- [ ] No security/accessibility violations in "wrong" examples

**Educational Design**:
- [ ] One concept per chapter/screen
- [ ] Progressive complexity (simple → advanced)
- [ ] Interactive demos with immediate visual feedback
- [ ] Learning checkpoints: "✓ You now understand X"
- [ ] Max 3-4 interactive elements visible simultaneously

**Visual Polish**:
- [ ] Atmospheric design matching fiction
- [ ] Responsive design (mobile-first)
- [ ] Proper contrast ratios (WCAG AA minimum)
- [ ] Consistent spacing and typography
- [ ] Icons + color for accessibility

**Integration**:
- [ ] Registry entry has NO placeholders
- [ ] Registry entry uses `@modules` alias
- [ ] Registry entry has actual icon name (e.g., `Zap`, not `IconName`)
- [ ] Registry entry has real Tailwind classes (e.g., `text-emerald-500`)
- [ ] File path matches slug exactly: `src/modules/[slug]/index.tsx`
- [ ] `enabled: true` in registry entry

---

## Output Format (ABSOLUTE)

**YOU MUST OUTPUT ONLY VALID XML. NO PREAMBLE. NO EXPLANATION.**

Follow this exact structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<module>
  <metadata>
    <slug>kebab-case-slug</slug>
    <title>Fiction Title</title>
    <subtitle>Character/Setting, Year</subtitle>
    <concept>React Concept Name</concept>
  </metadata>
  
  <plan><![CDATA[
# Implementation Plan (max 2 pages)

## Visual Design
- Color palette: [from narrative atmosphere]
- Typography: [matching fiction tone]
- Layout: [describe structure]

## Component Architecture
- Chapter state: useState(0)
- Navigation: prev/next with disable logic
- Demo sections: [per chapter]

## Interactive Demonstrations
Chapter 1: [specific demo]
Chapter 2: [specific demo]
Chapter 3: [specific demo]
Chapter 4: [specific demo]
Chapter 5: [specific demo]

## Pitfall Demonstrations (if applicable)
- [Describe specific bug demos]
- [Safety measures and circuit breakers]

## Responsive Strategy
- Mobile: [approach]
- Tablet: [approach]
- Desktop: [approach]
  ]]></plan>
  
  <files>
    <file>
      <path>src/modules/[actual-slug]/index.tsx</path>
      <content><![CDATA[
import { useState, useEffect } from "react";
import { ActualIconName } from "lucide-react";
import { CodeBlock } from "@/components/common/CodeBlock";

interface Chapter {
  title: string;
  content: string;
}

export default function ModuleName(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  
  const chapters: Chapter[] = [
    { title: "Chapter 1", content: "..." },
    { title: "Chapter 2", content: "..." },
    { title: "Chapter 3", content: "..." },
    { title: "Chapter 4", content: "..." },
    { title: "Chapter 5", content: "..." },
  ];

  // Code examples as template literals
  const brokenExample = `// ❌ Common Mistake
function BrokenComponent() {
  // Broken code here
}`;

  const fixedExample = `// ✅ Correct Approach
function FixedComponent() {
  // Fixed code here
}`;

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-8">
      <header className="mb-12">
        <h1 className="text-5xl font-bold mb-2">Module Title</h1>
        <p className="text-xl opacity-70">Subtitle</p>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Chapter Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <h2 className="text-3xl font-bold mb-4">{currentChapter.title}</h2>
          <p className="leading-relaxed">{currentChapter.content}</p>
        </div>

        {/* Interactive Demo Section */}
        <section className="bg-emerald-950/20 border border-emerald-500/30 rounded-lg p-8 mb-12">
          {/* Chapter-specific interactive React demonstrations */}
          
          {/* Example code display - ALWAYS use CodeBlock */}
          <CodeBlock
            code={brokenExample}
            variant="error"
            title="// ❌ Common Mistake"
          />
          
          <CodeBlock
            code={fixedExample}
            variant="success"
            title="// ✅ Correct Approach"
          />
        </section>

        {/* Navigation */}
        <nav className="flex justify-between">
          <button
            onClick={() => setChapter(Math.max(0, chapter - 1))}
            disabled={chapter === 0}
            className="px-6 py-3 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="self-center text-sm opacity-60">
            Chapter {chapter + 1} of {chapters.length}
          </span>
          <button
            onClick={() => setChapter(Math.min(chapters.length - 1, chapter + 1))}
            disabled={chapter === chapters.length - 1}
            className="px-6 py-3 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>
      </main>
    </div>
  );
}
      ]]></content>
    </file>
  </files>
  
  <integration>
    <registry_entry><![CDATA[
{
  id: "actual-slug",
  path: "/actual-slug",
  title: "Actual Fiction Title",
  subtitle: "Character/Setting, Year",
  concept: "React Concept Name",
  icon: ActualIconName,
  colorClass: "text-emerald-500",
  bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500",
  component: () => import("@modules/actual-slug"),
  wrapperProps: {
    bgClass: "bg-slate-950",
    textClass: "text-slate-300",
    fontClass: "font-serif"
  },
  enabled: true
}
    ]]></registry_entry>
  </integration>
</module>
```

---

## Critical Reminders

**XML Structure**:
- Start immediately with `<?xml version="1.0" encoding="UTF-8"?>`
- End with `</module>` - **nothing after**
- No text outside XML tags
- All code wrapped in `<![CDATA[...]]>`

**Registry Entry**:
- Must be copy-paste ready (no placeholders)
- Use actual values: real slug, real icon name, real Tailwind classes
- Icon must be imported from lucide-react (e.g., `Zap`, `Brain`, `Code`)
- Import path must use `@modules` alias
- `enabled: true` (always)

**Code Quality**:
- Complete TypeScript implementation (no TODOs, no placeholders)
- All interfaces defined
- All effects have cleanup
- All dependencies listed
- Functional updates for async state
- **CodeBlock component for ALL code display**

**Pitfall Demos**:
- Use CodeBlock with variant="error" for broken code
- Use CodeBlock with variant="success" for fixed code
- Include all 5 required elements: trigger, indicator, metrics, reset, toggle
- Implement circuit breakers (max 50 resources)
- Never demonstrate: XSS, security holes, accessibility violations, browser crashes

---

## Begin Generation

Using the narrative XML provided above, generate the complete module XML now.