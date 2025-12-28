## Component Architecture

**Core Structure:**

- Main component with chapter-based state (5 chapters)
- Fixed footer navigation for chapter progression
- Dedicated demo sections for each chapter showing callback timing concepts
- Timeline visualizer showing schedule vs. execution points
- Interactive "Loop Closer" simulator demonstrating cleanup patterns

**Chapter Flow:**

1. Intro: Basic callback scheduling concept
2. Build: Stale closures problem demonstration
3. Climax: Memory leak/unmounted component scenario
4. Resolution: Proper cleanup function implementation
5. Summary: Side-by-side comparison of patterns

## State Management

**Primary State:**

- `chapter`: number (0-4) for navigation
- `isSimulatorActive`: boolean for interactive demo
- `capturedValue`: string for closure demonstration
- `currentValue`: string for showing state changes
- `callbackExecuted`: boolean for showing execution timing
- `cleanupRegistered`: boolean for demonstrating cleanup

**Demo States (per chapter):**

- Chapter 1: Simple setTimeout with value capture
- Chapter 2: State change between schedule and execute
- Chapter 3: Component unmount scenario
- Chapter 4: Cleanup function demonstration
- Chapter 5: Comparative view (with/without cleanup)

## Interactive Demonstrations

**Timeline Visualizer (Chapters 1-2):**

- Horizontal timeline with "Schedule" and "Execute" markers
- Visual representation of 30-second delay
- Shows what value callback captures vs. current value
- User can change state and see what callback accesses

**Stale Closure Demo (Chapter 2):**

- Input field for "mission" value
- Schedule button captures current value
- User changes value
- Execute button shows stale captured value vs. new value
- Visual diff highlighting the problem

**Memory Leak Simulator (Chapter 3):**

- Component mount/unmount toggle
- Schedule callback while mounted
- Unmount component
- Show error/warning when callback tries to execute
- Visual representation of "accessing gone state"

**Cleanup Pattern Demo (Chapter 4):**

- Side-by-side comparison
- Left: No cleanup (shows errors)
- Right: With cleanup (shows cancellation)
- Code snippets showing proper pattern
- Real-time execution showing cleanup preventing execution

**Comparison Matrix (Chapter 5):**

- Table comparing approaches
- Without cleanup: red indicators, error states
- With cleanup: green indicators, safe states
- Interactive toggles to see each approach

## Visual Design Implementation

**Color Palette (Slate & Amber):**

- Background: `bg-slate-950`
- Primary text: `text-slate-200`
- Accent: `text-amber-500`, `border-amber-500/30`
- Error states: `text-red-400`
- Success states: `text-green-400`
- Code blocks: `bg-slate-900/50 border-slate-700`

**Typography:**

- Headers: `font-sans font-bold`
- Body: `font-sans`
- Code: `font-mono text-sm`

**Atmosphere:**

- Gritty, noir feel with dark backgrounds
- Amber accents for "silver bars" callbacks
- Subtle grid patterns suggesting time/scheduling
- Pulse animations for active callbacks
- Fade-out animations for cleanup/cancellation

## Layout Strategy

**Desktop (1024px+):**

- Two-column layout: narrative left, demo right
- Sticky demo section during scroll
- Wide code blocks with syntax highlighting simulation

**Tablet (768px-1023px):**

- Single column, narrative above demo
- Demo sections full-width
- Collapsible code snippets

**Mobile (320px-767px):**

- Full-width single column
- Simplified demos with tap interactions
- Stacked timeline visualizations

## Responsive Breakpoints

- Mobile: 320px - 767px (stack everything)
- Tablet: 768px - 1023px (two-column with breaks)
- Desktop: 1024px+ (side-by-side layout)

## Code Organization

**Component Structure:**

- Main `LooperCallbackTiming` component
- Inline demo components (no external files):
  - `TimelineVisualizer`
  - `StaleClosureDemo`
  - `MemoryLeakSimulator`
  - `CleanupPatternDemo`
  - `ComparisonMatrix`
- Chapter data array with content and demos
- Navigation footer (fixed position)

**Hooks Usage:**

- `useState` for all interactive state
- `useEffect` in demos to demonstrate concepts
- `useCallback` for event handlers to prevent re-renders
- `useRef` for tracking mounted state in demos

## Teaching Strategy

Each chapter maps fiction to code:

- Young Joe scheduling = `setTimeout`/event handlers
- Old Joe executing = callback running later
- 30-year delay = async timing gap
- Closure capture = variables captured at schedule time
- State changes = different context at execution
- Killing yourself = cleanup function
- Breaking loop = `clearTimeout`/cancellation

Demos progress from simple (timer) to complex (unmount scenarios) to practical (cleanup patterns).