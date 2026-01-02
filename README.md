# Quick Reference Guide for Module Development

**Version:** 1.0.0  
**Last Updated:** January 2026  
**Audience:** New module contributors  
**Focus:** Maintainability and structural standards

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [Module Structure (Standard Pattern)](#module-structure-standard-pattern)
3. [Shared Components](#shared-components)
4. [Sidebar Design Patterns](#sidebar-design-patterns)
5. [Code Examples Strategy](#code-examples-strategy)
6. [Theme & Styling](#theme--styling)
7. [High-Level Pedagogy](#high-level-pedagogy)
8. [Common Pitfalls](#common-pitfalls)
9. [Checklist](#checklist)

---

## Core Principles

### Maintainability First

- **Use shared components** for all structural elements (header, layout, navigation, code comparisons)
- **Follow the template** (`/src/modules/_template/index.tsx`) exactly
- **Single source of truth**: Structural changes happen in shared components, not individual modules
- **40-60% less boilerplate** per module when following standards

### Module Isolation

- **Zero coupling**: Modules don't depend on each other
- **Self-contained**: All module logic lives within `/src/modules/[module-name]/`
- **Internal structure allowed**: Modules can have subdirectories when complexity justifies it
- **JSON-driven**: Registry controls visibility and routing

### Creative Freedom Within Structure

- **Standardize structure**, not content
- **Your fiction metaphor** is unique to your module
- **Your interactive demos** are yours to design
- **Shared components** handle layout, you handle learning

---

## Module Structure (Standard Pattern)

### File Organization

**Default Structure (Recommended):**

```
src/modules/[module-name]/
└── index.tsx  # Single file for basic concepts
```

**Extended Structure (When Justified):**

```
src/modules/[module-name]/
├── index.tsx           # Main module export
├── components/         # Module-specific components
│   ├── InteractiveDemo.tsx
│   └── CustomVisualizer.tsx
├── hooks/              # Module-specific hooks
│   └── useModuleLogic.ts
├── utils/              # Module-specific utilities
│   └── calculations.ts
└── types.ts            # Module-specific types
```

**Guidelines:**
- **Default to single file** for most modules (basic concepts, straightforward demos)
- **Add structure when justified** by complexity, reusability within the module, or maintainability
- **Keep everything scoped** to the module directory—no cross-module imports
- **Use internal structure** when it improves clarity, not just for organization's sake

**When to use additional structure:**
- Complex interactive demos with multiple sub-components
- Shared logic used across multiple chapter demos within the same module
- Heavy computational utilities that clutter the main file
- Type definitions that benefit from separation

**When to stick with single file:**
- Module fits comfortably in <500 lines
- Components are only used once
- Logic is straightforward and linear

### Module Structure Decision Guide

**Ask yourself:**

1. **Is the code becoming hard to navigate?**
   - Yes → Consider extracting components/utilities
   - No → Keep it in index.tsx

2. **Are components reused within the module?**
   - Yes → Extract to `/components` subdirectory
   - No → Keep inline in index.tsx

3. **Does logic need to be tested independently?**
   - Yes → Extract to `/utils` or `/hooks`
   - No → Keep in main file

4. **Would extraction improve clarity?**
   - Yes → Structure it
   - No → Don't add unnecessary abstraction

**Philosophy:** Start simple (single file), refactor to structure only when complexity demands it. Don't create structure "just in case" or "to be organized."

### Component Anatomy

Every module follows this structure:

```tsx
import { useState } from "react";
import { IconName } from "lucide-react"; // Module-specific icon
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeComparison } from "@/components/common/CodeComparison";
import { CodeBlock } from "@/components/common/CodeBlock";

export default function YourModule() {
  const [chapter, setChapter] = useState(0);

  // Chapter array: title + content
  const chapters = [
    { title: "...", content: "..." },
    { title: "...", content: "..." },
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-[serif|sans] text-slate-300">
      {/* 1. Header */}
      <ModuleHeader {...props} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* 2. Layout (8-4 grid with optional sidebar) */}
        <ModuleLayout sidebar={<Sidebar />}>
          {/* 3. Chapter Content */}
          <div className="prose prose-invert prose-lg mb-8 max-w-none sm:mb-12">
            <h2>{currentChapter.title}</h2>
            <p>{currentChapter.content}</p>
          </div>

          {/* 4. Interactive Demo Section */}
          <section className="mb-8 rounded-xl border border-[theme]/20 bg-slate-900/40 p-6 sm:mb-12 sm:p-8">
            {/* Chapter-specific demos and code examples */}
          </section>

          {/* 5. Navigation */}
          <ChapterNavigation {...props} />
        </ModuleLayout>
      </main>
    </div>
  );
}
```

### Required Sections (in order)

1. **ModuleHeader** - Icon, title, metadata, concept (standardized)
2. **ModuleLayout** - 8-4 responsive grid wrapper
3. **Chapter Content** - Narrative explanation (prose)
4. **Interactive Demo** - Hands-on examples and code blocks
5. **ChapterNavigation** - Previous/Next with dot indicators

---

## Shared Components

### 1. ModuleHeader

**Purpose:** Standardized header displaying icon, title, metadata, and concept

```tsx
<ModuleHeader
  icon={Brain}                    // Lucide icon component
  title="Your Fiction Work"       // Fiction work title
  subtitle="Character • Context • Year" // Metadata line
  concept="React Concept Name"    // React concept being taught
  themeColor="amber"              // One of 6 safelisted colors
/>
```

**Benefits:** 73% code reduction vs custom header

### 2. ModuleLayout

**Purpose:** 8-4 responsive grid with main content and optional sticky sidebar

```tsx
<ModuleLayout
  sidebar={
    <div className="sticky top-24 space-y-6">
      {/* Sidebar components */}
    </div>
  }
>
  {/* Main content: chapters, demos, navigation */}
</ModuleLayout>
```

**Features:**
- Stacks vertically on mobile (content first, then sidebar)
- Sidebar automatically sticky at `top-24`
- Full-width when no sidebar provided

### 3. ChapterNavigation

**Purpose:** Previous/Next buttons, dot indicators, chapter counter

```tsx
<ChapterNavigation
  currentChapter={chapter}
  totalChapters={chapters.length}
  onChapterChange={setChapter}
  themeColor="cyan"
/>
```

**Features:**
- Keyboard navigation (left/right arrow keys)
- Clickable dot indicators for direct access
- Proper ARIA labels
- Theme-aware styling

### 4. CodeComparison

**Purpose:** Toggle between "bad" and "good" code examples (solves mobile overflow)

```tsx
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
```

**When to use:**
- Comparing incorrect vs correct patterns
- Showing before/after refactoring
- Mobile-friendly code pedagogy (no horizontal scroll)

### 5. CodeBlock

**Purpose:** Single code example with syntax highlighting

```tsx
<CodeBlock
  code={exampleCode}
  language="tsx"
  title="// Advanced Usage"
  defaultExpanded={true}
/>
```

**When to use:**
- Single code examples (no comparison needed)
- Advanced demonstrations
- Reference implementations

---

## Sidebar Design Patterns

### Essential Sidebar Components

Every sidebar should contain **at minimum**:

1. **Metaphor Mapping** - Fiction → React concept relationships
2. **Key Insight Card** - Chapter-specific learning reinforcement

### Common Sidebar Patterns

#### Pattern 1: Metaphor Mapping (Always Include)

Shows the relationship between fiction elements and React concepts.

```tsx
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
    <div className="flex justify-between border-b border-slate-800 pb-2">
      <span className="text-sm text-slate-400">Another Element</span>
      <span className="text-sm font-medium">Another Concept</span>
    </div>
  </div>
</div>
```

**Purpose:** Provides quick reference for the metaphor mapping throughout the module.

#### Pattern 2: Interactive Controls (Optional, Module-Specific)

Used when the module has interactive demonstrations with controllable state.

**Examples of interactive controls:**
- Sliders to adjust input values
- Toggles to switch between modes (with/without optimization)
- Buttons to trigger state changes
- Metrics displays showing performance impact
- Visual status indicators

```tsx
<div className="rounded-xl border border-[theme]/30 bg-slate-900/80 p-4">
  <h3 className="mb-4 text-lg font-bold">Interactive Demo Controls</h3>
  
  {/* Mode toggles */}
  <div className="flex gap-2">
    <button onClick={...} className={...}>Mode A</button>
    <button onClick={...} className={...}>Mode B</button>
  </div>
  
  {/* Adjustable inputs */}
  <div className="mt-4 space-y-3">
    {inputs.map(input => (
      <div className="flex items-center justify-between">
        <span>{input.label}</span>
        <div className="flex gap-2">
          <button onClick={() => adjust(input.id, -1)}>−</button>
          <button onClick={() => adjust(input.id, 1)}>+</button>
        </div>
      </div>
    ))}
  </div>
  
  {/* Live metrics */}
  <div className="mt-4 grid grid-cols-2 gap-4">
    <div className="rounded bg-slate-800/30 p-3">
      <div className="text-xs text-slate-500">Metric 1</div>
      <div className="font-mono text-xl">{value}</div>
    </div>
  </div>
</div>
```

**When to use:** When your module concept benefits from live demonstration of state changes, performance impact, or behavior comparisons.

#### Pattern 3: Key Insight Card (Always Include)

Reinforces the main learning point for the current chapter.

```tsx
<div className="rounded-xl border border-[theme]/30 bg-[theme]-950/20 p-4">
  <h4 className="mb-2 flex items-center gap-2 font-bold text-[theme]-300">
    <CheckCircle className="h-4 w-4" />
    Key Insight
  </h4>
  <p className="text-sm text-[theme]-200/80">
    {chapter === 0 && "Insight for chapter 0"}
    {chapter === 1 && "Insight for chapter 1"}
    {chapter === 2 && "Insight for chapter 2"}
  </p>
</div>
```

**Purpose:** Chapter-specific insights without cluttering main narrative.

#### Pattern 4: Quote Card (Optional)

Adds fiction flavor and thematic atmosphere.

```tsx
<div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
  <p className="text-sm text-slate-400 italic">
    "Memorable quote from your fiction source"
  </p>
  <p className="mt-2 text-right text-xs text-slate-500">
    — Character Name
  </p>
</div>
```

**When to use:** When quotes naturally reinforce the concept or add thematic depth. Don't force it.

### Sidebar Organization Best Practice

```tsx
<div className="sticky top-24 space-y-6">
  {/* 1. Interactive Controls (if applicable) - Most dynamic */}
  {/* 2. Metaphor Mapping (always) - Reference */}
  {/* 3. Key Insight Card (always) - Learning reinforcement */}
  {/* 4. Quote Card (optional) - Atmospheric */}
</div>
```

**Rationale:** Most interactive/dynamic elements at top for immediate engagement, static reference material below.

---

## Code Examples Strategy

### CodeComparison vs CodeBlock

**Use CodeComparison when:**
- Showing anti-pattern vs correct pattern
- Demonstrating "before refactoring" vs "after refactoring"
- Teaching by contrast (broken vs fixed)
- Comparing two approaches side-by-side

**Use CodeBlock when:**
- Showing single reference implementation
- Demonstrating advanced usage without comparison
- Providing standalone examples
- Showing isolated concept introduction

### Per-Chapter Code Strategy

**Early Chapters (0-1): Introduction**
- Single CodeBlock showing the concept in isolation
- Minimal complexity
- Focus on "what is this thing?"

**Middle Chapters (2-3): Core Learning**
- CodeComparison showing bad vs good patterns
- Include explanations via `badExplanation` and `goodExplanation` props
- Focus on "how to use this correctly?"

**Later Chapters (4+): Advanced Patterns**
- Mix of CodeBlock (advanced examples) and CodeComparison (refinements)
- More complex demonstrations
- Focus on "when/where to apply this?"

### Code Example Quality Standards

**Good Example:**
```tsx
// ✅ Clear, concise, directly related to concept
const result = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);
```

**Bad Example:**
```tsx
// ❌ Too much context, distracting from core concept
const result = useMemo(() => {
  const preprocessed = data.filter(d => d.valid)
    .map(d => ({ ...d, timestamp: Date.now() }));
  const analyzed = complexAnalysis(preprocessed);
  return formatDisplay(analyzed);
}, [data]);
```

**Guidelines:**
- Keep examples **focused** on the concept being taught
- Use **realistic but simplified** code (avoid toy examples, but don't add complexity)
- Include **inline comments** explaining key lines
- Match **fiction metaphor** in variable names where sensible

---

## Theme & Styling

### Safelisted Theme Colors

Only these 6 colors work with dynamic classes:

| Color       | Visual Style         | Good For                    |
|-------------|----------------------|-----------------------------|
| **cyan**    | Tech, future-forward | Sci-fi, modern tech themes  |
| **amber**   | Warm, intellectual   | Mystery, deduction, warmth  |
| **purple**  | Mystery, magic       | Fantasy, mystical themes    |
| **emerald** | Digital, code        | Matrix-style, code-focused  |
| **red**     | Danger, urgency      | Error states, dramatic      |
| **blue**    | Calm, professional   | Traditional, stable         |

**Critical:** Do not use other colors (e.g., `orange`, `lime`, `teal`) — they will not render correctly due to Tailwind's JIT compilation.

### Font Families

Choose based on fiction source tone:

```tsx
// Serif: Classic literature, period pieces, formal tone
<div className="font-serif">

// Sans: Modern tech, contemporary stories, clean UI
<div className="font-sans">
```

**Decision factors:**
- **Time period** of fiction source
- **Genre** (historical drama vs cyberpunk)
- **Tone** (formal vs casual)

### Background Patterns

**Root container:**
```tsx
<div className="min-h-screen bg-slate-950 text-slate-300">
```

**Interactive demo sections:**
```tsx
<section className="rounded-xl border border-[theme]/20 bg-slate-900/40 p-6 backdrop-blur-sm">
```

**Sidebar cards:**
```tsx
<div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
```

**Consistency:** These patterns are proven across multiple modules. Stick to them unless you have a compelling thematic reason.

---

## High-Level Pedagogy

### Fiction Metaphor Consistency

**Principle:** Every UI element should map to the fiction source

**Application:**
- Use fiction-specific terminology in UI labels
- Name variables/functions using metaphor language
- Visual styling should evoke the fiction source
- Every interactive element should "feel" like the story

**Example mapping structure:**
```
Fiction Element A  →  React Concept X
Fiction Element B  →  React Concept Y
Fiction Process C  →  React Pattern Z
```

**Test:** If someone unfamiliar with React reads your module, they should understand the fiction story. If someone unfamiliar with the fiction reads it, they should understand the React concept.

### Progressive Disclosure

**Standard Chapter Arc:**

1. **Chapter 0-1:** Introduction
   - "What is the problem this concept solves?"
   - Introduce fiction metaphor
   - Show the concept in simplest form

2. **Chapter 2-3:** Core Learning
   - "How does React solve this problem?"
   - Show anti-patterns vs correct patterns
   - Deepen the metaphor

3. **Chapter 4+:** Advanced Patterns
   - "When/where should I apply this?"
   - Real-world considerations
   - Edge cases and best practices

**Complexity Curve:**
- Start simple and concrete
- Build on previous chapters
- Each chapter should be comprehensible if you've read the prior ones
- End with practical, applicable knowledge

### Interactive Reinforcement

**Effective sidebar demos:**
- Show **live React behavior** (renders, re-calculations, state changes)
- Provide **visual feedback** (color changes, metrics, animations)
- Allow **user manipulation** (toggles, sliders, buttons)
- Connect **directly to concept** (not just decorative)

**Anti-pattern:** Interactive demos that don't actually demonstrate the React concept, but are just "fun" or "pretty."

**Good pattern:** Interactive demos where user actions directly show the concept's behavior (e.g., toggling optimization on/off shows performance difference).

### Key Insight Positioning

**Strategy:** Use chapter-conditional rendering in sidebar

```tsx
<p className="text-sm text-[theme]-200/80">
  {chapter === 0 && "Foundational insight for this chapter"}
  {chapter === 1 && "Next key learning point"}
  {chapter === 2 && "Core concept clarification"}
</p>
```

**Purpose:** Reinforces learning without interrupting narrative flow in main content.

---

## Common Pitfalls

### ❌ Don't: Custom Headers/Layouts

```tsx
// ❌ Bad: Reimplementing header
<header className="border-b bg-slate-950/90">
  <div className="flex items-center">
    <Brain className="h-8 w-8" />
    <h1>My Module</h1>
  </div>
</header>
```

```tsx
// ✅ Good: Use ModuleHeader
<ModuleHeader icon={Brain} title="My Module" {...props} />
```

**Why:** Creates maintenance burden, inconsistent UX across modules.

### ❌ Don't: Side-by-Side Code Without CodeComparison

```tsx
// ❌ Bad: Custom side-by-side (mobile overflow)
<div className="grid grid-cols-2 gap-4">
  <CodeBlock code={bad} />
  <CodeBlock code={good} />
</div>
```

```tsx
// ✅ Good: Use CodeComparison (mobile-friendly)
<CodeComparison badCode={bad} goodCode={good} themeColor="cyan" />
```

**Why:** Causes horizontal scrolling on mobile devices.

### ❌ Don't: Non-Safelisted Colors

```tsx
// ❌ Bad: Using non-safelisted color
<ModuleHeader themeColor="orange" /> // Won't work!
```

```tsx
// ✅ Good: Use safelisted color
<ModuleHeader themeColor="amber" /> // Works correctly
```

**Why:** Tailwind JIT compilation doesn't include non-safelisted colors in dynamic classes.

### ❌ Don't: Breaking Module Isolation

```tsx
// ❌ Bad: Importing from another module
import { SomeComponent } from "../other-module/index.tsx";
import { useOtherModuleLogic } from "../other-module/hooks/useLogic";
```

```tsx
// ✅ Good: Internal imports within your own module
import { InteractiveDemo } from "./components/InteractiveDemo";
import { useModuleLogic } from "./hooks/useLogic";

// ✅ Good: Importing from shared components
import { ModuleHeader } from "@/components/common/ModuleHeader";

// ✅ Good: Implement locally if needed
const SomeComponent = () => { /* your implementation */ };
```

**Why:** Cross-module imports create coupling and break maintainability. Internal module structure is fine; dependencies on other modules are not.

### ❌ Don't: Inconsistent Chapter State Management

```tsx
// ❌ Bad: Non-standard state naming
const [step, setStep] = useState(0);
const [page, setPage] = useState(0);
const [section, setSection] = useState(0);
```

```tsx
// ✅ Good: Standard chapter state
const [chapter, setChapter] = useState(0);
const chapters = [...];
```

**Why:** Breaks standardization, confuses contributors, makes navigation integration harder.

### ❌ Don't: Weak Metaphor Connections

```tsx
// ❌ Bad: Metaphor doesn't map to concept
// Example: Teaching useState with a car metaphor where the 
// car's color changes represent state... but why? What does
// a car have to do with React state?
```

```tsx
// ✅ Good: Strong metaphor connection
// Example: Teaching useState with Jekyll/Hyde where the
// character transformation IS the state change—direct mapping
```

**Why:** Weak metaphors confuse rather than clarify. The fiction should illuminate the concept naturally.

### ❌ Don't: Copy Existing Modules Directly

**Problem:** Treating existing modules as templates to copy leads to:
- Repetitive content across the platform
- Loss of creative diversity
- Stale pedagogical approaches
- Modules that feel "samey"

**Solution:** Extract patterns (structure, shared components) but create unique:
- Fiction metaphors
- Interactive demos
- Code examples
- Narrative voice
- Visual theming (within standards)

---

## Checklist

### Before Creating a Module

- [ ] Fiction source chosen with **clear, strong metaphor** mapping to React concept
- [ ] Reviewed template (`/src/modules/_template/index.tsx`)
- [ ] Identified appropriate theme color (one of 6 safelisted)
- [ ] Icon selected from Lucide React library
- [ ] Chapter structure planned (3-5 chapters recommended)
- [ ] Metaphor mapping planned for all major concept aspects

### During Development

- [ ] Using ModuleHeader (not custom header)
- [ ] Using ModuleLayout (not custom grid)
- [ ] Using ChapterNavigation (not custom navigation)
- [ ] Using CodeComparison for bad vs good examples
- [ ] Using CodeBlock for single examples
- [ ] Sidebar includes metaphor mapping
- [ ] Sidebar includes key insight card (chapter-specific)
- [ ] Interactive demo shows live React behavior (if applicable)
- [ ] Code examples are focused and realistic
- [ ] Fiction metaphor is consistent throughout
- [ ] Variable/function names reflect metaphor where sensible
- [ ] Module structure kept simple (single file unless complexity justifies subdirectories)

### Before Submitting

- [ ] Module compiles without TypeScript errors
- [ ] Tested on mobile (no horizontal overflow)
- [ ] Tested keyboard navigation (left/right arrows work)
- [ ] JSON registry entry added to `moduleRegistry.json`
- [ ] Icon mapped in `moduleRegistry.ts` (if new icon)
- [ ] Module ID follows kebab-case convention
- [ ] Module path matches ID
- [ ] Theme color is safelisted
- [ ] `enabled: true` in registry
- [ ] No cross-module dependencies (no imports from other modules)
- [ ] Font family (serif vs sans) appropriate for fiction source

### Quality Validation

- [ ] Metaphor is clear and consistently applied
- [ ] Metaphor strengthens understanding (not just decorative)
- [ ] Progressive disclosure: simple → complex
- [ ] Interactive demos reinforce learning (if applicable)
- [ ] Code examples are copy-pasteable
- [ ] Fiction terminology used in UI/variables
- [ ] Sidebar provides useful reference
- [ ] Navigation works smoothly
- [ ] Visual feedback for state changes (if applicable)
- [ ] Responsive on all breakpoints (sm, md, lg, xl)
- [ ] Module feels unique (not a copy of existing modules)

---

## Quick Tips

### Getting Started

1. **Copy template:** `cp src/modules/_template/index.tsx src/modules/your-module/index.tsx`
2. **Update imports:** Change icon, adjust theme color
3. **Define chapters:** Array of `{ title, content }`
4. **Build sidebar:** Metaphor map + key insights
5. **Add demos:** Interactive examples per chapter (if concept benefits from it)
6. **Test thoroughly:** Mobile + desktop + keyboard nav
7. **Refactor if needed:** Extract to subdirectories only when complexity justifies it

### Performance Considerations

- Use `useState` for chapter state (simple, fast)
- Lazy load heavy components if needed (rare)
- Avoid expensive calculations in render
- Use `useMemo` appropriately in your own module logic
- Limit sidebar re-renders (memoize stable content if needed)

### Accessibility

- ModuleHeader includes proper heading hierarchy
- ChapterNavigation has ARIA labels built-in
- Add accessible labels to your interactive elements
- Color contrast meets WCAG AA standards (built into theme colors)
- Keyboard navigation fully supported (ensure your custom demos support it)

### Metaphor Development

**Start with the connection:**
- What aspect of the fiction source naturally maps to the React concept?
- Is the mapping obvious or does it require explanation?
- Can you extend the metaphor across 3-5 chapters?

**Test the metaphor:**
- Explain it to someone unfamiliar with React
- If they understand the story, the metaphor is working
- If they're confused, the mapping is too abstract

**Refine as you build:**
- Metaphors often strengthen during development
- Don't force connections that don't exist
- It's okay to pivot to a different fiction source if the metaphor breaks down

---

## Additional Resources

- **Template Module:** `/src/modules/_template/index.tsx`
- **Shared Components Guide:** `/src/components/common/Quick_Start_Guide.md`
- **Registry Documentation:** `README.md` (JSON Registry section)

---

## Contribution Guidelines

### Proposing New Shared Components

If you identify a structural pattern appearing in **5+ modules**:

1. Document where the pattern appears and how it varies
2. Design component API (TypeScript + JSDoc)
3. Prototype in 2-3 modules to validate
4. Submit PR with documentation
5. Update this guide with new component usage

### Module Diversity

**We value creative diversity.** While structure is standardized:

- **Your metaphor is yours:** Don't replicate another module's approach
- **Your demos are unique:** Build interactions that fit YOUR concept
- **Your voice matters:** Write in a style that fits your fiction source
- **Your visuals distinguish:** Use theme colors and styling to create atmosphere

**Goal:** 38 modules that feel like 38 different learning experiences, all within a consistent structural framework.

---

**Last Updated:** January 2026  
**Maintained By:** Cinematic React Patterns Team  
**Questions?** Open an issue on GitHub or start a discussion.