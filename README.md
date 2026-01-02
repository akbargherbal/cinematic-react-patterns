# 🎬 Cinematic React Patterns

> Master React fundamentals through iconic works of fiction

An interactive educational platform that transforms complex React concepts into memorable, story-driven learning experiences. Each module uses a beloved work of fiction—films, novels, plays—as a metaphor to teach core React patterns.

## 🎯 Project Vision

**Cinematic React Patterns** is a comprehensive educational platform that teaches React through the power of storytelling. By mapping iconic works of fiction to React concepts, we create a learning experience that is both comprehensive and unforgettable.

**The Philosophy:** Abstract programming concepts become concrete and memorable when taught through stories we already know and love. Why memorize useEffect dependency rules when you can learn them from Neo dodging bullets in The Matrix?

## 🗂️ Architecture

### Switchboard Pattern: JSON-Driven Registry

The project uses a **JSON-driven module registry** with TypeScript transformation as its architectural foundation:

```json
// src/config/moduleRegistry.json - Pure data configuration
[
  {
    "id": "module-id",
    "path": "/module-path",
    "title": "Module Title",
    "subtitle": "Character, Context, Year",
    "concept": "React Concept",
    "icon": "IconName",
    "colorClass": "text-cyan-500",
    "bgClass": "bg-cyan-950/20 border-cyan-500/30",
    "component": "dynamic_import",
    "wrapperProps": {
      "bgClass": "bg-slate-950",
      "textClass": "text-slate-300",
      "fontClass": "font-sans"
    },
    "enabled": true
  }
]
```

```typescript
// src/config/moduleRegistry.ts - Type transformation layer
import modulesJSONData from "./moduleRegistry.json";

// Transforms JSON strings into React components and functions
export const moduleRegistry: ModuleConfig[] = modulesJSONData.map(
  (raw: RawModuleData): ModuleConfig => ({
    ...raw,
    icon: iconMap[raw.icon] || Brain, // String → React Component
    component: () => import(`../modules/${raw.id}/index.tsx`), // Dynamic import
  }),
);
```

**Key Principles:**

- **JSON as data source**: All module configuration in portable JSON format
- **Type-safe transformation**: TypeScript layer adds types and dynamic imports
- **Dynamic routing**: Routes auto-generated from registry configuration
- **Icon mapping**: String names mapped to Lucide React components
- **Centralized management**: Single JSON file controls entire curriculum
- **Easy maintenance**: Add/remove modules by editing JSON only

### Module Structure

Each module follows a consistent pattern:

1. **Fiction Source**: A well-known work of fiction (film, novel, play)
2. **React Concept**: A specific React pattern or hook
3. **Metaphor Mapping**: How the story teaches the technical concept
4. **Interactive Demo**: Hands-on code examples and exercises

## 📚 Learning Curriculum

The platform covers React concepts across these categories:

### Core Hooks & State Management

- useState, useEffect, useRef fundamentals
- Custom hooks and composition
- Performance hooks (useMemo, useCallback)

### Component Patterns & Architecture

- Component composition and nesting
- Component identity and keys
- Dynamic and conditional rendering
- Component lifecycle patterns

### State Management & Data Flow

- Immutable state updates
- Complex state with useReducer
- Prop drilling and Context API
- State synchronization patterns

### Performance & Optimization

- Memoization strategies
- Performance profiling
- Optimization best practices

### Lifecycle & Effects

- Effect dependencies and timing
- Cleanup patterns
- Side effect management

### Advanced Patterns

- Portals and refs
- Error boundaries
- Higher-order patterns
- State machines

### Forms & User Input

- Controlled vs uncontrolled components
- Form validation patterns
- User input handling

## 🔧 Module Management

### Enabling/Disabling Modules

Control module visibility by editing the JSON registry:

```json
// src/config/moduleRegistry.json

{
  "id": "your-module",
  "enabled": true, // ✅ Module active (visible, routes work)
  // OR
  "enabled": false // ❌ Module disabled (hidden everywhere)
}
```

**Best Practices:**

- Keep production modules `"enabled": true`
- Use `"enabled": false` only for maintenance or testing
- Add JSON comments (in separate documentation) explaining temporary disabling
- Validate JSON syntax after edits

### Adding New Modules

1. **Create module component** in `src/modules/[module-id]/index.tsx`
2. **Add entry to JSON** in `moduleRegistry.json`:
   ```json
   {
     "id": "new-module-id",
     "path": "/new-module-path",
     "title": "Module Title",
     "subtitle": "Character, Context, Year",
     "concept": "React Concept",
     "icon": "Brain",
     "colorClass": "text-cyan-500",
     "bgClass": "bg-cyan-950/20 border-cyan-500/30",
     "component": "dynamic_import",
     "wrapperProps": {
       "bgClass": "bg-slate-950",
       "textClass": "text-slate-300",
       "fontClass": "font-sans"
     },
     "enabled": true
   }
   ```
3. **Add icon to mapping** (if using new icon) in `moduleRegistry.ts`
4. **Route automatically generated** from configuration
5. **Test integration** before enabling

### Available Icons

Icons are mapped in `moduleRegistry.ts` from Lucide React:

```typescript
const iconMap: Record<string, React.ComponentType<any>> = {
  Brain,
  Code,
  Wand: Zap,
  Calendar,
  Zap,
  Door: DoorOpen,
  Crown,
  Image,
  Clock,
  Code2,
  Ship,
  RotateCcw,
  Film,
  Ticket,
  Car,
  // Add new icons here as needed
};
```

To use a new icon:

1. Import from `lucide-react` in `moduleRegistry.ts`
2. Add to `iconMap` object
3. Reference by string name in JSON

## 🎨 Animation Integration

### Auto Animate Library

The platform uses `@formkit/auto-animate` for seamless DOM animations:

```bash
pnpm add @formkit/auto-animate
```

**Basic Usage:**

```tsx
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Component() {
  const [parent] = useAutoAnimate();

  return (
    <div ref={parent}>
      {items.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
}
```

### Integration Strategy

**Approach 1: Targeted Enhancement (Recommended)**

Add animations to modules where DOM changes are demonstrated:

- List operations (add/remove/reorder)
- Conditional rendering (mount/unmount)
- Component keys and reconciliation
- State-driven UI updates

**Example:**

```tsx
// Before (static)
<div className="items-grid">
  {items.map((item) => (
    <ItemCard key={item.id} {...item} />
  ))}
</div>;

// After (animated)
import { useAutoAnimate } from "@formkit/auto-animate/react";

const [itemsRef] = useAutoAnimate();

<div ref={itemsRef} className="items-grid">
  {items.map((item) => (
    <ItemCard key={item.id} {...item} />
  ))}
</div>;
```

**Approach 2: Module-Wide Enhancement (Optional)**

Add to wrapper components for platform-wide transitions:

```tsx
// src/components/ModuleWrapper.tsx
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function ModuleWrapper({ children, ...props }) {
  const [contentRef] = useAutoAnimate({ duration: 200 });

  return (
    <div {...props}>
      <ExitButton />
      <div ref={contentRef}>{children}</div>
    </div>
  );
}
```

### Configuration Options

Customize when needed:

```tsx
const [parent] = useAutoAnimate({
  duration: 250, // Animation duration (ms)
  easing: "ease-in-out", // CSS easing function
});
```

**Default Recommendation:** Use defaults unless the module's theme demands customization.

### Best Practices

1. **Apply Sparingly**: Only animate elements that change
2. **Respect Keys**: Animations reinforce the importance of stable keys
3. **Test Performance**: With 100+ items, consider virtualization
4. **Thematic Consistency**: Match animations to module aesthetics

### Educational Opportunities

**Keys Matter Demonstration:**

```tsx
// Show broken animation with index keys vs stable keys
<button onClick={() => setUseIndexKeys(!useIndexKeys)}>
  Toggle Key Strategy
</button>;

{
  items.map((item, idx) => (
    <div key={useIndexKeys ? idx : item.id}>{item.name}</div>
  ));
}
```

**Learning:** Students see animations glitch with index keys, proving why unique IDs are critical.

**Reconciliation Visualization:**

```tsx
// Each lifecycle mounts/unmounts components
<div ref={autoAnimateRef}>{isActive && <Component />}</div>
```

**Learning:** Mount/unmount becomes visible, reinforcing lifecycle concepts.

### When NOT to Use Auto Animate

- ❌ Modules teaching CSS animations explicitly
- ❌ Heavy data tables (use virtualization)
- ❌ Where animations distract from core concepts
- ❌ Modules with complex custom animations

## 🚀 Development Setup

### Prerequisites

- Node.js 18+ and pnpm
- Modern browser with ES6+ support
- Git for version control

### Installation

```bash
# Clone repository
git clone https://github.com/akbargherbal/cinematic-react-patterns.git

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Project Structure

```
src/
├── config/
│   └── moduleRegistry.ts    # Centralized module configuration
├── modules/
│   └── [module-name]/       # Individual module components
├── components/
│   └── ModuleWrapper.tsx    # Shared wrapper component
├── routes/                  # Route configuration
└── App.tsx                  # Root application
```

## 📖 Module Development Guide

### Creating a New Module

1. **Choose your fiction source**: Select a story that naturally maps to the React concept
2. **Identify the metaphor**: How does the story teach the technical pattern?
3. **Create component directory**: `src/modules/[module-id]/index.tsx`
4. **Build the component**: Create interactive demo with code examples
5. **Add JSON entry**: Register in `moduleRegistry.json`
6. **Map icon** (if new): Add to `iconMap` in `moduleRegistry.ts`
7. **Test and refine**: Ensure the metaphor is clear and memorable

### Module JSON Schema

```json
{
  "id": "unique-module-identifier", // Kebab-case, matches folder name
  "path": "/url-path", // Route path (usually same as id)
  "title": "Fiction Work Title", // Display title
  "subtitle": "Character, Context, Year", // Metadata line
  "concept": "React Concept Name", // What React pattern this teaches
  "icon": "IconName", // Must exist in iconMap
  "colorClass": "text-color-shade", // Tailwind text color
  "bgClass": "bg-color-shade border-color", // Tailwind background/border
  "component": "dynamic_import", // Always "dynamic_import"
  "wrapperProps": {
    "bgClass": "bg-slate-950", // Module background
    "textClass": "text-slate-300", // Module text color
    "fontClass": "font-sans" // Typography
  },
  "enabled": true // Visibility toggle
}
```

### Module Component Structure

For the current module structure and best practices, see the template at `/src/modules/_template/index.tsx`.

The template demonstrates:
- Standardized header with ModuleHeader component
- Responsive layout with ModuleLayout component  
- Chapter-based navigation with ChapterNavigation component
- Code comparison patterns with CodeComparison component

### Available Third-Party Libraries

The platform includes several pre-installed libraries available for use in all modules:

#### Animation
- **@formkit/auto-animate**
  - Seamless DOM animations for list operations, conditional rendering
  - See [Animation Integration](#-animation-integration) section for usage
  - Documentation: [FormKit Auto-Animate](https://auto-animate.formkit.com/)

#### Error Handling
- **react-error-boundary**
  - Declarative error boundaries for React components
  - Graceful error recovery and fallback UI
  - Documentation: [react-error-boundary](https://github.com/bvaughn/react-error-boundary)

#### Icons
- **lucide-react**
  - Extensive icon library for UI elements
  - See [Available Icons](#available-icons) section for mapped icons
  - Documentation: [Lucide Icons](https://lucide.dev/)

All libraries are already installed—no additional setup required.

### Module Query Utilities

The registry provides helper functions for module access:

```typescript
// Get all enabled modules
const modules = getEnabledModules();

// Get specific module by ID
const module = getModuleById("inception-dream-layers-as-components");

// Get module by URL path
const module = getModuleByPath("/inception-dream-layers-as-components");

// Get module statistics
const { total, enabled, disabled } = getModuleStats();
// Returns: { total: 34, enabled: 34, disabled: 0 }
```

These utilities are automatically updated when JSON changes—no manual counting needed.

### Quality Standards

- **Clear metaphor**: Story naturally teaches the concept
- **Interactive demo**: Hands-on examples users can modify
- **Progressive difficulty**: Start simple, build complexity
- **Visual feedback**: Show state changes and re-renders
- **Code examples**: Real-world applicable patterns

## 🎓 Educational Philosophy

### Story-Driven Learning

**Why fiction works:**

- **Memorable**: Stories stick in memory better than abstract rules
- **Contextual**: Concepts make sense within familiar narratives
- **Engaging**: Learning feels like entertainment
- **Universal**: Great stories transcend technical backgrounds

### Concept Mapping

Each module demonstrates:

1. **The Problem**: What challenge does this pattern solve?
2. **The Metaphor**: How does the story illustrate this?
3. **The Pattern**: Technical implementation in React
4. **The Practice**: Interactive exercises and examples

## 📄 License

MIT License - feel free to use this for educational purposes.

## 🙏 Acknowledgments

- Inspired by the brilliant storytelling of great films and literature
- Built with modern React patterns and best practices
- Designed for developers who learn through metaphor and narrative
- Switchboard architecture for scalable module management

## 🔧 Contact & Support

- **Repository:** [github.com/akbargherbal/cinematic-react-patterns](https://github.com/akbargherbal/cinematic-react-patterns)
- **Issues:** [Open an issue](https://github.com/akbargherbal/cinematic-react-patterns/issues)
- **Discussions:** [GitHub Discussions](https://github.com/akbargherbal/cinematic-react-patterns/discussions)

For questions, bug reports, or suggestions, please use GitHub Issues or Discussions.

---

**Learn React through the stories you love.** 🎬✨