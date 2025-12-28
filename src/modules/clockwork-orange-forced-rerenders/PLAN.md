## Implementation Architecture

### Component Structure
- Single-file React component with chapter-based navigation (5 chapters)
- State management: useState for current chapter index (0-4)
- Fixed footer navigation with prev/next buttons and chapter indicator
- Main content area: narrative text + interactive demonstrations

### Chapter-to-UI Mapping
1. **Chapter 1 (Intro)**: Narrative + "Natural Component" demo showing proper state-driven renders
2. **Chapter 2 (Build)**: Narrative + "The Ludovico Technique" demo introducing forceUpdate()
3. **Chapter 3 (Climax)**: Narrative + "State-Render Desync" visualizer showing the breakdown
4. **Chapter 4 (Resolution)**: Narrative + "Reversion" demo showing return to natural state
5. **Chapter 5 (Summary)**: Narrative + comprehensive comparison table and final demo

### Interactive Demonstrations

**Demo 1 - Natural Component (Chapter 1)**
- Simple counter component
- Shows setState() triggering predictable re-renders
- Visual: state value → render output, perfectly aligned
- User clicks button, sees state update → render cycle

**Demo 2 - Ludovico Simulator (Chapters 2-3)**
- Two side-by-side "Alex components"
- Left: Uses setState() (proper rehabilitation)
- Right: Uses forceUpdate() (Ludovico technique)
- User triggers "behavioral change" in both
- Right side shows state/render mismatch, error states, visual glitches
- Red warning indicators on the forced update component

**Demo 3 - State-Render Desync Visualizer (Chapter 3)**
- Display component's internal state alongside render output
- Button to "Apply Ludovico Technique" (call forceUpdate without state change)
- Visual disconnect: state says "violent=true", render shows "violent=false"
- Warning messages about crashes, unpredictable behavior
- Reset button to restore proper alignment

**Demo 4 - Comparison Table (Chapter 5)**
- Side-by-side comparison: Proper State Management vs forceUpdate()
- Rows: Sustainability, Predictability, Error Rate, React Compliance
- Visual indicators (checkmarks vs X marks)

### Visual Design Implementation

**Color Scheme (from visual_design: red and slate)**
- Background: bg-slate-950 (dark, dystopian)
- Primary text: text-slate-200
- Accent (violence/errors): text-red-500, border-red-500
- Success (proper patterns): text-emerald-500
- Warnings: bg-red-950/30, border-red-500/50

**Typography (from visual_design: font-sans)**
- Clean, modern sans-serif throughout
- Headers: text-3xl to text-5xl, font-bold
- Body: text-base to text-lg
- Code snippets: font-mono with bg-slate-900

**Layout**
- Max-width container: max-w-6xl mx-auto
- Padding: p-4 to p-8 responsive
- Chapter content: prose-style formatting with custom colors
- Demos: bg-slate-900 rounded-lg border border-slate-700 p-6
- Fixed footer: sticky bottom navigation, backdrop-blur

### State Management Strategy

```
const [chapter, setChapter] = useState(0);
const [demoState, setDemoState] = useState({
  naturalCounter: 0,
  forcedRenderCount: 0,
  stateValue: true,
  renderValue: true,
  isDesyncActive: false
});
```

- Chapter state controls which narrative/demo to show
- Demo state manages interactive demonstrations
- Each demo is self-contained within chapter sections
- Navigation: prev/next buttons update chapter state

### Responsive Strategy

**Mobile-first approach:**
- Base: single column, padding p-4
- sm (640px+): slightly larger text, p-6
- md (768px+): introduce grid for side-by-side demos
- lg (1024px+): max-w-6xl container, optimal reading width
- xl (1280px+): enhanced spacing, larger demos

**Key breakpoints:**
- Footer navigation: stack on mobile, flex-row on sm+
- Demo comparisons: stack on mobile, grid-cols-2 on md+
- Chapter indicator: abbreviated on mobile, full text on sm+

### Technical Implementation Notes

- Use React 19 functional components only
- TypeScript interfaces for all props and state
- Tailwind utility classes exclusively (no inline styles)
- lucide-react icons: Activity (for natural state), AlertTriangle (for warnings), Zap (for forceUpdate)
- Animations: transition classes for smooth chapter changes
- Accessibility: proper button labels, ARIA attributes, keyboard navigation

### Code Organization

```
ClockworkOrangeModule
├── Chapter navigation state
├── Demo state management
├── Chapter data array (titles, content from narrative XML)
├── Interactive demo components (inline, within render)
│   ├── NaturalComponentDemo
│   ├── LudovicoSimulator
│   ├── DesyncVisualizer
│   └── ComparisonTable
├── Main render:
│   ├── Header (title, subtitle)
│   ├── Current chapter content
│   ├── Current chapter demo
│   └── Fixed footer navigation
```

All demos are inline functional components or render logic within the main component—no separate files, keeping module self-contained.