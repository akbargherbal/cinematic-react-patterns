# Implementation Plan: The Matrix Reloaded (useEffect Dependencies)

## Component Architecture

**Core Structure:**
- Single-page component with chapter-based navigation (5 chapters)
- Fixed footer with chapter controls (Previous/Next buttons + progress indicator)
- Main content area with narrative text + interactive demonstrations
- Each chapter combines storytelling with live React concept visualization

**State Management:**
- `chapter` (number): Current chapter index (0-4)
- Demo-specific state for each interactive section:
  - Chapter 1: No interactive demo (introduction)
  - Chapter 2: Two effect counters (missing vs. correct dependencies)
  - Chapter 3: Prop-based effect with comparison view
  - Chapter 4: Multiple dependencies example
  - Chapter 5: Cleanup demonstration with timer

## Visual Design Implementation

**Color Palette (from narrative):**
- Background: `bg-emerald-950` (deep matrix green)
- Text: `text-emerald-500` (bright matrix green)
- Accents: `text-slate-300` (neutral text)
- Borders: `border-emerald-500/30` with hover states
- Code blocks: `bg-black/50` with `text-emerald-400`

**Typography:**
- Font family: `font-serif` (gothic atmosphere)
- Headers: Bold, large scale (text-4xl for main title)
- Body: Readable prose with proper line-height
- Code: Monospace for effect syntax examples

**Layout Strategy:**
- Max width: 4xl for content, 6xl for interactive sections
- Padding: Generous spacing (p-8 header, p-6 cards)
- Responsive: Mobile-first, single column on small screens

## Interactive Demonstrations

**Chapter 2: "The Glitch" - Missing Dependencies**
- Two side-by-side effect counters
- Left: Broken (missing dependency) - shows stale closure
- Right: Correct (proper dependencies) - updates correctly
- Visual differentiation with red (broken) vs green (working) borders
- Live code snippets showing the dependency array difference

**Chapter 3: "The Prophecy" - Props in Dependencies**
- Input field for "Oracle's message"
- Two effect implementations: one ignoring prop, one watching it
- Clear visual feedback when effects run vs. don't run
- Comparison layout showing correct vs incorrect behavior

**Chapter 4: "The Architect" - Multiple Dependencies**
- Three input controls (representing multiple state values)
- Effect that depends on all three
- Real-time display of when effect fires
- Log/history of effect executions

**Chapter 5: "The Resolution" - Cleanup Functions**
- Timer/interval demonstration
- Toggle to mount/unmount component
- Visual indication of cleanup execution
- Side-by-side: with cleanup vs without (memory leak scenario)

## Technical Implementation Details

**Hooks Usage:**
- `useState`: Chapter navigation, all demo states
- `useEffect`: Demonstrations of correct/incorrect patterns
- `useRef`: For tracking effect execution counts, timer IDs
- `useCallback`: Event handlers in memoized components (if needed)

**Component Breakdown:**
- Main module component (default export)
- Inline sub-components for each chapter's interactive demo
- No external component files (single-file module)

**Accessibility:**
- Semantic HTML (header, main, footer, article for chapters)
- Disabled states for navigation buttons (first/last chapter)
- Keyboard navigation support (buttons are focusable)
- ARIA labels where needed

**Responsive Strategy:**
- Mobile (< 640px): Single column, stacked demos
- Tablet (640-1024px): Comfortable reading width
- Desktop (> 1024px): Max width constraint, centered layout
- Side-by-side comparisons stack on mobile

## Chapter Content Mapping

**Chapter 1: Introduction**
- Neo entering the Matrix
- Text-only, sets atmosphere
- Introduce the concept: useEffect dependencies

**Chapter 2: The Glitch**
- Bug manifestation (stale closure)
- Interactive: Broken vs fixed counter demo
- Teaching moment: Missing dependencies cause stale closures

**Chapter 3: The Prophecy**
- Oracle's wisdom (props in dependencies)
- Interactive: Prop-watching effect demo
- Teaching moment: Props must be in dependency array

**Chapter 4: The Architect**
- Multiple dependencies coordination
- Interactive: Multi-input effect demo
- Teaching moment: All used values must be listed

**Chapter 5: The Resolution**
- Neo's understanding (cleanup)
- Interactive: Timer with cleanup demo
- Teaching moment: Return cleanup function for subscriptions

## Code Quality Standards

- TypeScript interfaces for chapter structure, demo props
- Explicit typing for all state and functions
- No `any` types
- Clear variable names reflecting the Matrix theme where appropriate
- Consistent indentation and formatting
- Minimal comments (code should be self-documenting)
- Proper use of React 19 features

## Performance Considerations

- Memoize chapter data (static array, no need for useMemo but good practice)
- Avoid unnecessary re-renders in demos
- Efficient state updates
- No inline function definitions in render (extract if complex)

This plan provides the structural foundation. Implementation will bring the Matrix atmosphere to life while teaching useEffect dependencies through interactive, memorable demonstrations.