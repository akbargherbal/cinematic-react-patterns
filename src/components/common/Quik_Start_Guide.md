# Shared Module Components

**Location:** `/src/components/common/`

Standardized, reusable components for all fiction-based React learning modules. These components extract the structural skeleton while preserving each module's creative freedom and unique visual identity.

---

## 🎯 Purpose

**Problem:** 60% of module structure was identical but implemented independently across 38 modules. Fixing layout bugs required editing 38 separate files.

**Solution:** Extract common patterns into shared components while preserving:
- ✅ Unique theme colors per module
- ✅ Module-specific demos and content
- ✅ Creative freedom for designers
- ✅ Fiction-specific visual metaphors

**Benefits:**
- **40-60% less boilerplate** per module
- **Single source of truth** for layout/navigation
- **Consistent UX** across all modules
- **Faster iteration** for new modules

---

## 📦 Component Library

### 1. ModuleHeader

**File:** `ModuleHeader.tsx`  
**Purpose:** Standardized header displaying icon, title, metadata, and concept

**Props:**
```typescript
interface ModuleHeaderProps {
  icon: React.ComponentType<any>;      // Lucide icon (e.g., Brain, Code)
  title: string;                       // Fiction work title (e.g., "Minority Report")
  subtitle: string;                    // Metadata: "Character • Context • Year"
  concept: string;                     // React concept (e.g., "useReducer")
  themeColor: 'cyan' | 'amber' | 'purple' | 'emerald' | 'red' | 'blue';
  className?: string;                  // Optional additional styles
}
```

**Example Usage:**
```tsx
import { Brain } from 'lucide-react';
import { ModuleHeader } from '@/components/common/ModuleHeader';

<ModuleHeader
  icon={Brain}
  title="Minority Report"
  subtitle="PreCrime • John Anderton • 2002"
  concept="useReducer for Complex State Management"
  themeColor="cyan"
/>
```

**Features:**
- Responsive layout (mobile-first)
- Theme-aware colors
- Backdrop blur effect for visual depth
- Horizontal layout: Icon + Title (left) | Metadata (right) | Concept (below)

---

### 2. ModuleLayout

**File:** `ModuleLayout.tsx`  
**Purpose:** 8-4 responsive grid with main content and optional sticky sidebar

**Props:**
```typescript
interface ModuleLayoutProps {
  children: React.ReactNode;           // Main content (8 cols desktop)
  sidebar?: React.ReactNode;           // Optional sidebar (4 cols desktop)
  className?: string;                  // Optional additional styles
}
```

**Example Usage:**
```tsx
import { ModuleLayout } from '@/components/common/ModuleLayout';

<ModuleLayout
  sidebar={
    <div className="space-y-6">
      <StatusCard />
      <MetricsPanel />
    </div>
  }
>
  <ChapterContent />
  <InteractiveDemo />
  <ChapterNavigation />
</ModuleLayout>
```

**Features:**
- 12-column grid: 8 cols content + 4 cols sidebar (desktop)
- Stacks vertically on mobile (content first, then sidebar)
- Sticky sidebar at `top-24` (accounts for header height)
- Full-width content when no sidebar provided
- Responsive padding and max-width container

---

### 3. ChapterNavigation

**File:** `ChapterNavigation.tsx`  
**Purpose:** Previous/Next buttons, dot indicators, and chapter counter

**Props:**
```typescript
interface ChapterNavigationProps {
  currentChapter: number;              // Current chapter index (0-based)
  totalChapters: number;               // Total number of chapters
  onChapterChange: (chapter: number) => void;  // Callback on change
  themeColor: 'cyan' | 'amber' | 'purple' | 'emerald' | 'red' | 'blue';
  previousLabel?: string;              // Default: "Previous"
  nextLabel?: string;                  // Default: "Next"
  hideMobileDots?: boolean;            // Default: false
  className?: string;                  // Optional additional styles
}
```

**Example Usage:**
```tsx
import { ChapterNavigation } from '@/components/common/ChapterNavigation';

const [chapter, setChapter] = useState(0);

<ChapterNavigation
  currentChapter={chapter}
  totalChapters={5}
  onChapterChange={setChapter}
  themeColor="cyan"
/>
```

**Features:**
- Previous/Next buttons with disabled states
- Clickable dot indicators for direct chapter access
- Chapter counter display (e.g., "Chapter 2 of 5")
- Keyboard navigation support (left/right arrow keys)
- Proper ARIA labels for accessibility
- Theme-aware active dot and Next button styling

---

### 4. CodeComparison

**File:** `CodeComparison.tsx`  
**Purpose:** Toggle between "Bad" and "Good" code examples (solves mobile horizontal scrolling)

**Props:**
```typescript
interface CodeComparisonProps {
  badCode: string;                     // Code showing incorrect approach
  goodCode: string;                    // Code showing correct approach
  language: string;                    // Language for syntax highlighting
  themeColor: 'cyan' | 'amber' | 'purple' | 'emerald' | 'red' | 'blue';
  badLabel?: string;                   // Default: "❌ Problematic"
  goodLabel?: string;                  // Default: "✅ Better"
  badExplanation?: string;             // Optional explanation below bad code
  goodExplanation?: string;            // Optional explanation below good code
  startWithGood?: boolean;             // Default: false
  className?: string;                  // Optional additional styles
}
```

**Example Usage:**
```tsx
import { CodeComparison } from '@/components/common/CodeComparison';

<CodeComparison
  badCode={`// Bad: Index as key
{items.map((item, idx) => (
  <div key={idx}>{item.name}</div>
))}`}
  goodCode={`// Good: Unique ID as key
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}`}
  language="tsx"
  badExplanation="Using index as key causes React to lose track of component identity when items reorder"
  goodExplanation="Stable unique IDs ensure React correctly matches components across renders"
  themeColor="cyan"
/>
```

**Features:**
- Toggle between two code examples with buttons
- Full-width code blocks (no horizontal scrolling on mobile)
- Optional explanation text below each code block
- Visual distinction: red for bad, theme color for good
- Integrates with existing `CodeBlock` component
- Smooth transitions between examples

---

## 🎨 Theme Colors

Components support 6 pre-safelisted theme colors:

| Color | Usage Example | Visual Style |
|-------|---------------|--------------|
| **cyan** | Minority Report, Inception | Tech, future-forward |
| **amber** | Sherlock's Mind Palace | Warm, intellectual |
| **purple** | Various modules | Mystery, magic |
| **emerald** | The Matrix | Digital, code |
| **red** | Various modules | Danger, urgency |
| **blue** | Various modules | Calm, professional |

**Implementation:** Colors are safelisted in `tailwind.config.ts` to support dynamic class generation.

---

## 🚀 Getting Started

### Creating a New Module with Shared Components

```tsx
// src/modules/your-module/index.tsx
import { Brain } from 'lucide-react';
import { ModuleHeader } from '@/components/common/ModuleHeader';
import { ModuleLayout } from '@/components/common/ModuleLayout';
import { ChapterNavigation } from '@/components/common/ChapterNavigation';
import { CodeComparison } from '@/components/common/CodeComparison';

export default function YourModule() {
  const [chapter, setChapter] = useState(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      
      {/* Header */}
      <ModuleHeader
        icon={Brain}
        title="Your Fiction Work"
        subtitle="Character • Context • Year"
        concept="React Concept You're Teaching"
        themeColor="cyan"
      />

      {/* Content Layout */}
      <ModuleLayout
        sidebar={
          <div className="space-y-6">
            {/* Your sidebar components */}
            <StatusCard />
            <MetricsPanel />
          </div>
        }
      >
        {/* Chapter 1 Content */}
        {chapter === 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Chapter 1: Introduction</h2>
            <p>Your narrative and teaching content...</p>
            
            <CodeComparison
              badCode={badExample}
              goodCode={goodExample}
              language="tsx"
              themeColor="cyan"
            />
          </div>
        )}

        {/* Chapter 2 Content */}
        {chapter === 1 && (
          <div className="space-y-6">
            {/* More content... */}
          </div>
        )}

        {/* Navigation */}
        <ChapterNavigation
          currentChapter={chapter}
          totalChapters={2}
          onChapterChange={setChapter}
          themeColor="cyan"
        />

      </ModuleLayout>
    </div>
  );
}
```

---

## 📐 Code Reduction Example

**Before (Minority Report - Old Header):**
```tsx
{/* 26 lines of HTML */}
<header className="border-b border-cyan-800/50 bg-slate-950/90 backdrop-blur-sm top-0 z-10">
  <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <Brain className="text-cyan-400 w-8 h-8" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Minority Report
        </h1>
      </div>
      <p className="text-sm md:text-base text-slate-400 font-medium">
        PreCrime • John Anderton • 2002
      </p>
    </div>
    <p className="text-base md:text-lg text-cyan-400 font-medium mt-2">
      useReducer for Complex State Management
    </p>
  </div>
</header>
```

**After (With ModuleHeader):**
```tsx
{/* 7 lines - 73% reduction */}
<ModuleHeader
  icon={Brain}
  title="Minority Report"
  subtitle="PreCrime • John Anderton • 2002"
  concept="useReducer for Complex State Management"
  themeColor="cyan"
/>
```

**Result:** 73% less code, same visual output, easier to maintain.

---

## 🔧 Migration Guide

### Converting Existing Modules

**Step 1: Install Imports**
```tsx
import { ModuleHeader } from '@/components/common/ModuleHeader';
import { ModuleLayout } from '@/components/common/ModuleLayout';
import { ChapterNavigation } from '@/components/common/ChapterNavigation';
import { CodeComparison } from '@/components/common/CodeComparison';
```

**Step 2: Replace Header HTML**
Find your existing header section and replace with:
```tsx
<ModuleHeader
  icon={YourIcon}
  title="Your Title"
  subtitle="Character • Context • Year"
  concept="Your React Concept"
  themeColor="cyan"  // Match your module's theme
/>
```

**Step 3: Wrap Content in ModuleLayout**
Extract your main content and sidebar:
```tsx
<ModuleLayout
  sidebar={/* Your existing sidebar JSX */}
>
  {/* Your existing main content */}
</ModuleLayout>
```

**Step 4: Replace Navigation HTML**
Find your chapter navigation and replace with:
```tsx
<ChapterNavigation
  currentChapter={chapter}
  totalChapters={totalChapters}
  onChapterChange={setChapter}
  themeColor="cyan"
/>
```

**Step 5: Replace Side-by-Side Code Blocks**
If you have side-by-side code comparisons causing mobile issues:
```tsx
<CodeComparison
  badCode={beforeCode}
  goodCode={afterCode}
  language="tsx"
  badExplanation="Why this approach has problems"
  goodExplanation="Why this approach is better"
  themeColor="cyan"
/>
```

---

## 📊 Expected Results

### Code Metrics (Based on Pilot Conversions)
- **Header:** 20-30 lines → 7 lines (70-80% reduction)
- **Layout:** 15-20 lines → 5 lines (75% reduction)
- **Navigation:** 40-60 lines → 8 lines (85% reduction)
- **Code Comparison:** 30-40 lines → 15 lines (60% reduction)

### Overall Module Reduction
- **Target:** 40-60% less boilerplate
- **Example:** 870 lines → ~520 lines (Dorian Gray pilot)

---

## 🐛 Troubleshooting

### Theme Colors Not Working
**Problem:** Dynamic classes like `text-${color}-500` not applying.  
**Solution:** Ensure the color is safelisted in `tailwind.config.ts`. Only use: `cyan`, `amber`, `purple`, `emerald`, `red`, `blue`.

### Sidebar Not Sticky
**Problem:** Sidebar scrolls with content instead of staying fixed.  
**Solution:** ModuleLayout sets `sticky top-24` automatically. Ensure your module wrapper doesn't have `overflow-hidden` or conflicting positioning.

### Navigation Dots Not Clickable
**Problem:** Dot indicators don't respond to clicks.  
**Solution:** Ensure `onChapterChange` callback is properly passed and updates state.

### Code Blocks Overflowing on Mobile
**Problem:** Code blocks still cause horizontal scrolling.  
**Solution:** CodeComparison handles this automatically. Ensure you're using the component, not raw side-by-side divs.

---

## 📚 Additional Resources

- **Executive Summary:** `/docs/module_standardization/executive-summary.md`
- **Technical Analysis:** `/docs/module_standardization/pattern-analysis.md`
- **Visual Mockups:** `/docs/module_standardization/mockup-*.html`
- **Project Tracker:** `/docs/module_standardization/project-tracker.md`
- **Pilot Module:** `src/modules/useref-dorian-grays-portrait/` (after conversion)

---

## 🤝 Contributing

### Adding New Shared Components

If you identify a new pattern that appears in 5+ modules:

1. **Analyze:** Document where the pattern appears and how it varies
2. **Propose:** Create a design document with component API
3. **Prototype:** Build the component with TypeScript + JSDoc
4. **Test:** Validate in 2-3 real modules before standardizing
5. **Document:** Add to this README with examples

### Improving Existing Components

Pull requests welcome! Ensure:
- Backward compatibility maintained
- All theme colors tested
- JSDoc comments updated
- README examples updated
- No breaking changes (or properly versioned)

---

## 📜 License

MIT - Same as parent project (Cinematic React Patterns)

---

**Last Updated:** January 2026  
**Component Version:** 1.0.0  
**Maintained By:** Cinematic React Patterns Team