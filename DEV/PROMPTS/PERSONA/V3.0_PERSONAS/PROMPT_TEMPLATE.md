# Implementation Translator - Prompt Template

## Quick Reference

**Your Role**: Transform narrative XML into production-ready React learning module

**Core Constraints**:
- Default single-file: `src/modules/[slug]/index.tsx` (multi-file allowed if needed)
- Tech stack: React 19, TypeScript, Tailwind
- Integration: One registry entry in `moduleRegistry.ts`
- Chapter-based navigation: 5 chapters from narrative

**MANDATORY Shared Components** (see System Prompt for full documentation):
```typescript
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";
```

**Component Usage Rules**:
- ✅ ALWAYS use ModuleHeader (never build custom header)
- ✅ ALWAYS use ModuleLayout (never use manual grid)
- ✅ ALWAYS use ChapterNavigation (never build custom nav)
- ✅ ALWAYS use CodeBlock for single code examples
- ✅ ALWAYS use CodeComparison for anti-pattern vs correct pattern

**Sidebar Requirements** (see System Prompt for full examples):
1. Interactive Controls (optional - if demos are interactive)
2. Metaphor Registry (required - 4-8 fiction → React mappings)
3. Key Insight Card (required - chapter-conditional content)
4. Quote Card (optional - atmospheric flavor)

**Content Brevity**:
- Chapter narrative: 30-50 words per chapter (excluding code)
- Tweet Test: Fit metaphor in ~280 characters
- Use bullets, bold, formatting over prose paragraphs

**Key Patterns**:
- ✅ Mandatory cleanup for timers/subscriptions
- ✅ Complete dependency arrays
- ✅ Functional state updates in async contexts
- ✅ TypeScript interfaces for all props
- ✅ Accessibility (ARIA, keyboard nav)

**Pitfall Teaching** (when showing mistakes):
- ❌ CodeBlock variant="error" for wrong code
- ✅ CodeBlock variant="success" for correct code
- Always include: trigger button, metrics, reset, comparison toggle
- Circuit breakers: max 50 leaked resources
- Never violate: security, accessibility, browser stability

**Visual Standards**:
- Max 3-4 interactive elements per view
- Icons + color (not color alone)
- CodeComparison stacks on mobile (no horizontal scroll)
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
   - 5 chapters extracted from narrative (30-50 words each)
   - All 5 shared components used correctly
   - Interactive React demos per chapter
   - Complete, working TypeScript (no TODOs)

2. **Registry Entry** (for `moduleRegistry.ts`)
   - Exact slug, path, title, subtitle, concept
   - Actual icon name from lucide-react
   - Real Tailwind color classes (from safelisted colors)
   - Lazy import: `() => import("@modules/[slug]")`

---

## Critical Requirements Checklist

**Shared Components (MANDATORY):**
- [ ] ModuleHeader imported and used (no custom header)
- [ ] ModuleLayout imported and used (no manual grid)
- [ ] ChapterNavigation imported and used (no custom nav)
- [ ] CodeBlock imported and used for single examples
- [ ] CodeComparison imported and used for anti-pattern comparisons
- [ ] NO custom header code anywhere
- [ ] NO manual grid layout (`grid-cols-12`, `lg:col-span-8`, etc.)
- [ ] NO custom Previous/Next buttons or dot indicators

**Sidebar Structure (MANDATORY):**
- [ ] Metaphor Registry card included (4-8 mappings from narrative)
- [ ] Key Insight card included (chapter-conditional, 5 different insights)
- [ ] Quote card included (if appropriate to fiction source)
- [ ] Interactive controls included (if demos have adjustable state)
- [ ] Sidebar components in correct order: Controls → Registry → Insight → Quote

**Code Quality:**
- [ ] All timers/subscriptions have cleanup functions
- [ ] All useEffect dependencies are complete
- [ ] Async state updates use functional form: `setState(prev => ...)`
- [ ] No `any` types - proper TypeScript interfaces
- [ ] Semantic HTML with ARIA labels

**Code Display:**
- [ ] CodeBlock used for all single code examples
- [ ] CodeComparison used for anti-pattern vs correct pattern comparisons
- [ ] CodeBlock variant="error" for broken code
- [ ] CodeBlock variant="success" for fixed code
- [ ] NO `<pre>` tags anywhere

**Pitfall Demos** (if applicable):
- [ ] Trigger button, metrics display, reset button, comparison toggle
- [ ] Circuit breaker at 50 leaked resources
- [ ] No security/accessibility violations in "wrong" examples

**Content Quality:**
- [ ] Chapter narrative: 30-50 words per chapter
- [ ] Concise, tweet-length metaphor explanations
- [ ] Direct fiction → React concept mapping
- [ ] Uses formatting (bold, bullets) over paragraphs

**Educational Design:**
- [ ] One concept per chapter/screen
- [ ] Progressive complexity (simple → advanced)
- [ ] Interactive demos with immediate visual feedback
- [ ] Max 3-4 interactive elements visible simultaneously

**Visual Polish:**
- [ ] Atmospheric design matching fiction
- [ ] Responsive design (mobile-first)
- [ ] Proper contrast ratios (WCAG AA minimum)
- [ ] Consistent spacing and typography
- [ ] Icons + color for accessibility

**Integration:**
- [ ] Registry entry has NO placeholders
- [ ] Registry entry uses `@modules` alias
- [ ] Registry entry has actual icon name (e.g., `Ship`, not `IconName`)
- [ ] Registry entry has real Tailwind classes (e.g., `text-cyan-500`)
- [ ] Registry entry uses safelisted color (see System Prompt)
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
- Layout: ModuleLayout with 8-col main + 4-col sidebar

## Component Architecture
- Chapter state: useState(0)
- Shared components: ModuleHeader, ModuleLayout, ChapterNavigation, CodeBlock, CodeComparison
- Demo sections: [per chapter]

## Sidebar Structure
1. Interactive Controls (if applicable)
2. Metaphor Registry (required - 4-8 mappings)
3. Key Insight Card (required - chapter-conditional)
4. Quote Card (optional)

## Interactive Demonstrations
Chapter 0: [specific demo]
Chapter 1: [specific demo]
Chapter 2: [specific demo]
Chapter 3: [specific demo]
Chapter 4: [specific demo]

## Pitfall Demonstrations (if applicable)
- [Describe specific bug demos]
- [Safety measures and circuit breakers]

## Content Brevity Strategy
- Chapter narrative: 30-50 words each
- Code examples: focused, minimal context
- Sidebar insights: 1-2 sentences per chapter

## Responsive Strategy
- Mobile: Sidebar stacks above content, single column
- Tablet: ModuleLayout maintains structure
- Desktop: Full 8-4 grid with sticky sidebar
  ]]></plan>
  
  <files>
    <file>
      <path>src/modules/[actual-slug]/index.tsx</path>
      <content><![CDATA[
import { useState } from "react";
import { Ship, Shield, CheckCircle } from "lucide-react"; // Actual icons
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";

interface Chapter {
  title: string;
  content: string; // 30-50 words
}

export default function ModuleName(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  
  const chapters: Chapter[] = [
    { 
      title: "Chapter Title", 
      content: "Concise metaphor explanation (30-50 words). Direct mapping to React concept. No prose, no story progression." 
    },
    // ... 4 more chapters
  ];

  // Code examples as template literals
  const antiPattern = `// ❌ Common Mistake
function BrokenComponent() {
  // Anti-pattern code
}`;

  const correctPattern = `// ✅ Correct Approach
function FixedComponent() {
  // Fixed code
}`;

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      {/* MANDATORY: ModuleHeader */}
      <ModuleHeader
        icon={Ship}
        title="Fiction Work Title"
        subtitle="Character/Setting, Year"
        concept="React Concept: What You're Teaching"
        themeColor="cyan"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* MANDATORY: ModuleLayout */}
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              {/* OPTIONAL: Interactive Controls (if demos have adjustable state) */}
              <div className="rounded-xl border border-cyan-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 text-lg font-bold">Demo Controls</h3>
                {/* Mode toggles, sliders, metrics */}
              </div>

              {/* REQUIRED: Metaphor Registry */}
              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-cyan-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-sm text-slate-400">Fiction Element</span>
                    <span className="text-sm font-medium">React Concept</span>
                  </div>
                  {/* Add 4-8 mappings from narrative */}
                </div>
              </div>

              {/* REQUIRED: Key Insight Card (chapter-conditional) */}
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-cyan-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-cyan-200/80">
                  {chapter === 0 && "Insight for chapter 0 (1-2 sentences)"}
                  {chapter === 1 && "Insight for chapter 1 (1-2 sentences)"}
                  {chapter === 2 && "Insight for chapter 2 (1-2 sentences)"}
                  {chapter === 3 && "Insight for chapter 3 (1-2 sentences)"}
                  {chapter === 4 && "Insight for chapter 4 (1-2 sentences)"}
                </p>
              </div>

              {/* OPTIONAL: Quote Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "Memorable quote from fiction source"
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Character Name
                </p>
              </div>
            </div>
          }
        >
          {/* Chapter Content (30-50 words) */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="text-2xl font-bold text-cyan-100">
              {currentChapter.title}
            </h2>
            <div className="leading-relaxed text-slate-300">
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-cyan-500/20 bg-slate-900/40 p-6">
            <div className="mb-6 flex items-center gap-2">
              <div className="h-6 w-2 rounded bg-cyan-500"></div>
              <h3 className="text-xl font-bold text-cyan-200">
                Interactive Demonstration
              </h3>
            </div>

            {/* Chapter-specific demos */}
            {chapter === 0 && (
              <div className="space-y-6">
                {/* Demo UI */}
                <CodeBlock
                  code={antiPattern}
                  language="tsx"
                  variant="default"
                  title="// Introduction Example"
                />
              </div>
            )}

            {chapter === 1 && (
              <div className="space-y-6">
                {/* Use CodeComparison for anti-pattern vs correct */}
                <CodeComparison
                  badCode={antiPattern}
                  goodCode={correctPattern}
                  language="tsx"
                  themeColor="cyan"
                  badLabel="❌ Anti-Pattern"
                  goodLabel="✅ Correct Pattern"
                  badExplanation="Why this approach is problematic"
                  goodExplanation="Why this approach is better"
                />
              </div>
            )}

            {/* More chapters... */}
          </section>

          {/* MANDATORY: ChapterNavigation */}
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
      ]]></content>
    </file>
  </files>
  
  <integration>
    <registry_entry><![CDATA[
{
  id: "actual-slug-here",
  path: "/actual-slug-here",
  title: "Actual Fiction Title",
  subtitle: "Character/Setting, Year",
  concept: "React Concept Name",
  icon: Ship,
  colorClass: "text-cyan-500",
  bgClass: "bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-500",
  component: () => import("@modules/actual-slug-here"),
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

**Shared Components (NON-NEGOTIABLE)**:
- Import all 5 components: ModuleHeader, ModuleLayout, ChapterNavigation, CodeBlock, CodeComparison
- Use ModuleHeader (never build custom `<header>`)
- Use ModuleLayout (never use manual `grid-cols-12`)
- Use ChapterNavigation (never build custom buttons/dots)
- Use CodeBlock for single examples
- Use CodeComparison for anti-pattern vs correct comparisons

**Sidebar (REQUIRED STRUCTURE)**:
1. Interactive Controls (optional)
2. Metaphor Registry (required - use `<Shield>` icon, 4-8 mappings)
3. Key Insight Card (required - use `<CheckCircle>` icon, chapter-conditional)
4. Quote Card (optional - atmospheric)

**Content Brevity (CRITICAL)**:
- Chapter narrative: 30-50 words per chapter
- Tweet Test: Metaphor fits in ~280 characters
- Use bullets, bold, formatting over prose
- Direct metaphor → concept mapping

**Registry Entry**:
- Must be copy-paste ready (no placeholders)
- Use actual icon name from lucide-react (e.g., `Ship`, `Zap`, `Brain`)
- Import path must use `@modules` alias
- Color must be from safelisted list (System Prompt)
- `enabled: true` (always)

**Code Quality**:
- Complete TypeScript implementation (no TODOs, no placeholders)
- All interfaces defined
- All effects have cleanup
- All dependencies listed
- Functional updates for async state
- CodeBlock/CodeComparison for ALL code display (no `<pre>` tags)

**Pitfall Demos**:
- Use CodeComparison with badCode/goodCode props
- Include all 5 required elements: trigger, indicator, metrics, reset, toggle
- Implement circuit breakers (max 50 resources)
- Never demonstrate: XSS, security holes, accessibility violations, browser crashes

---

## Begin Generation

Using the narrative XML provided above, generate the complete module XML now.