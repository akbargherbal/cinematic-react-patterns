# 🎬 Cinematic React Patterns

> Master React fundamentals through iconic works of fiction

An interactive educational platform that transforms complex React concepts into memorable, story-driven learning experiences. Each module uses a beloved work of fiction—films, novels, plays—as a metaphor to teach core React patterns.

**📊 Project Scale:**

- 🎬 **48 fiction sources** mapped to React concepts
- ✅ **3 modules complete** (Frankenstein, Fight Club, Mean Girls)
- 🚧 **45 modules configured** and ready for implementation
- 📚 **Every major React concept** covered from hooks to advanced patterns
- 🌍 **200+ years of stories** (1818-2019) teaching modern React

**Status:** Active Development - Contributors Welcome!

## 🎯 Project Vision

**Cinematic React Patterns** is an educational platform that teaches React through the power of storytelling. We've mapped **48 iconic works of fiction**—from Mary Shelley's Frankenstein (1818) to Netflix's Russian Doll (2019)—to create the most comprehensive and memorable React learning experience ever built.

**The Philosophy:** Abstract programming concepts become concrete and unforgettable when taught through stories we already know and love. Why memorize useEffect dependency rules when you can learn them from Neo dodging bullets in The Matrix?

### Current Status

- ✅ **48 modules configured** - Complete React curriculum mapped to fiction
- ✅ **3 modules fully implemented** - Frankenstein, Fight Club, Mean Girls
- ✅ **45+ modules ready for development** - Architecture and metadata complete
- ✅ **Centralized module registry** - Single source of truth for all modules
- 🚧 **Active development** - Module implementations in progress
- 📢 **Open for contributions** - Claim a module and bring it to life!

### Long-term Goal

Build the **most comprehensive React learning platform** where every concept—from basic hooks to advanced patterns—has its own fiction-themed module. With 48 modules spanning classic literature to modern cinema, we're creating an educational experience that makes React fundamentals truly unforgettable.

**Coverage:** useState to useReducer, controlled components to portals, prop drilling to Context API, and everything in between—each concept paired with the perfect cinematic metaphor.

## 📚 Module Library

### ✅ Fully Implemented Modules

#### 🧪 Frankenstein's Forms

- **Fiction:** Mary Shelley's _Frankenstein_ (1818)
- **Concept:** Controlled vs Uncontrolled Components
- **Path:** `/frankenstein-controlled-components`
- **Learning:** Dr. Frankenstein's failed uncontrolled component (The Creature) teaches the importance of controlling your inputs

#### ⚡ Project Mayhem

- **Fiction:** _Fight Club_ (1996/1999)
- **Concept:** Strict Mode & Cleanup Functions
- **Path:** `/fight-club-strict-mode`
- **Learning:** Tyler Durden forces double-mounts to expose your side effects—learn to write proper cleanup

#### 💖 The Burn Book

- **Fiction:** _Mean Girls_ (2004)
- **Concept:** Context API & Prop Drilling
- **Path:** `/mean-girls-context-api`
- **Learning:** Stop passing gossip through every Plastic—use the Burn Book (Context) for global state

---

### 🚧 Configured Modules (45+ Ready for Implementation)

Our complete curriculum covers **every major React concept** through cinematic storytelling:

**🎣 Core Hooks & State**

- The Matrix → useEffect Dependencies
- Memento → useState vs useRef
- Groundhog Day → Re-rendering & Pure Functions
- Arrival → useMemo for Performance
- Looper → useCallback Timing
- Her → Custom Hooks
- Donnie Darko → Effect Dependencies & Timing

**🏗️ Component Patterns**

- Inception → Component Composition
- Blade Runner → Component Identity & Keys
- Westworld → Component vs Instance
- The Thing → Component Swapping
- Rashomon → Multiple Component Perspectives
- Usual Suspects → Dynamic Rendering
- Sixth Sense → Conditional Rendering
- Multiplicity → Component Cloning

**📦 State Management**

- 1984 → Immutable State Updates
- Ocean's 11 → useReducer for Complex State
- LOTR → Prop Drilling Problem
- The Village → Scoped Context
- Social Network → State Synchronization
- Coherence → State Sync Across Instances
- Bandersnatch → State Branching
- Primer → State Time Travel
- Butterfly Effect → State Purity

**⚡ Performance & Optimization**

- The Prestige → React.memo (x2 for cost analysis)
- Clockwork Orange → Forced Re-renders
- Shutter Island → Stale Closures

**🎯 Advanced Patterns**

- Stranger Things → React Portals
- Parasite → Component Injection
- Get Out → Higher-Order Components
- Ex Machina → Component Testing
- Moon → Singleton Pattern
- Tenet → Reverse Data Flow

**♻️ Lifecycle & Effects**

- Truman Show → Component Lifecycle
- Jurassic Park → Side Effects & Cleanup
- Eternal Sunshine → State Reset & Key Prop
- Edge of Tomorrow → Component Reset Loop
- Source Code → Remounting Loop
- Russian Doll → Lifecycle Debugging
- Matrix Reloaded → System Exit

**🔄 Time & Async**

- Back to the Future → Props Changes & Re-renders
- Interstellar → Async State & Race Conditions
- 12 Monkeys → Circular Dependencies
- Minority Report → Optimistic Rendering

**📊 Complete Coverage:**

- 📽️ **48 fiction sources** from 1818 to 2019
- 🎭 **15+ genres** - Sci-fi, horror, comedy, drama, thriller, fantasy
- 🌍 **International** - American, Japanese, Korean, British cinema
- 🎬 **Every React concept** - Hooks, patterns, state, performance, lifecycle

Each module transforms abstract programming into memorable storytelling. From Frankenstein's uncontrolled creation to Neo's dependency arrays, every concept has its perfect cinematic metaphor.

## 🏗️ Architecture

This project follows a **Modular Monolith** architecture with a **centralized module registry** for easy management and troubleshooting.

### Core Principles

1. **Module Isolation:** Each concept is a standalone directory under `/src/modules/`
2. **Centralized Configuration:** All modules registered in a single source of truth
3. **Switchboard Control:** Enable/disable modules with a single boolean toggle
4. **Zero Dependencies Between Modules:** Modules don't import from each other
5. **Thematic Consistency:** Each module has its own visual theme tied to its fiction source
6. **Lazy Loading:** Modules load on-demand for optimal performance

### 🔌 Module Switchboard System

The project uses a **centralized module registry** that acts like an electrical switchboard:

```typescript
// src/config/moduleRegistry.ts
export const moduleRegistry = [
  {
    id: "mean-girls-context-api",
    path: "/mean-girls-context-api",
    title: "Mean Girls",
    concept: "Context API & Prop Drilling",
    enabled: true, // 🔌 Toggle to enable/disable module
    // ... all module configuration in one place
  },
  // ... other modules
];
```

**Benefits:**

- ✅ **One-line toggle** - Enable/disable any module instantly
- ✅ **Single source of truth** - Zero duplication across files
- ✅ **Easy troubleshooting** - Quickly isolate problematic modules
- ✅ **Clean architecture** - 80% less code in App.tsx and home page
- ✅ **Type-safe** - Full TypeScript support

### Directory Structure

```
cinematic-react-patterns/
├── src/
│   ├── config/
│   │   └── moduleRegistry.ts  # 🔌 SWITCHBOARD - All 48 modules
│   ├── modules/
│   │   ├── home/              # Landing page (module showcase)
│   │   ├── frankenstein.../   # ✅ COMPLETED
│   │   ├── fight-club.../     # ✅ COMPLETED
│   │   ├── mean-girls.../     # ✅ COMPLETED
│   │   ├── matrix.../         # 🚧 Ready for implementation
│   │   ├── inception.../      # 🚧 Ready for implementation
│   │   ├── memento.../        # 🚧 Ready for implementation
│   │   └── [42+ more]/        # 🚧 All configured, claim one!
│   ├── App.tsx                # Router - auto-generates routes
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/
├── package.json
├── vite.config.ts
└── README.md
```

### Module Anatomy

Each module should be **completely self-contained**:

```
src/modules/your-module/
├── index.tsx              # Main module component (default export)
├── components/            # Module-specific components (optional)
├── utils/                 # Module-specific utilities (optional)
└── README.md              # Module documentation (optional)
```

### Adding a New Module

With the switchboard system, adding modules is streamlined:

#### 1. Create module directory and component

```bash
mkdir src/modules/your-concept-name
```

```tsx
// src/modules/your-concept-name/index.tsx
export default function YourModule() {
  return (
    <div className="min-h-screen">{/* Your fiction-themed React lesson */}</div>
  );
}
```

#### 2. Register in module registry (ONLY place needed!)

```typescript
// src/config/moduleRegistry.ts

export const moduleRegistry: ModuleConfig[] = [
  // ... existing modules ...

  {
    id: "your-concept-name",
    path: "/your-concept-name",
    title: "Your Film Title",
    subtitle: "Context, Year",
    concept: "React Concept You're Teaching",
    icon: YourIcon, // from lucide-react
    colorClass: "text-blue-500",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/your-concept-name"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🔌 Set to false while developing if needed
  },
];
```

**That's it!** The module is now:

- ✅ Automatically added to routing
- ✅ Automatically displayed on home page
- ✅ Lazy-loaded for performance
- ✅ Toggleable via the `enabled` flag

### Disabling a Module for Troubleshooting

If a module is causing issues:

```typescript
// src/config/moduleRegistry.ts
{
  id: "problematic-module",
  enabled: false, // 🔌 Module now disabled everywhere
  // ...
}
```

Restart dev server → Module hidden from home page and routes!

## 🛠️ Local Development

### Prerequisites

- Node.js 18+
- pnpm (recommended package manager)

If you don't have pnpm installed:

```bash
npm install -g pnpm
```

### Installation

```bash
# Clone the repository
git clone https://github.com/akbargherbal/cinematic-react-patterns.git
cd cinematic-react-patterns

# Install dependencies
pnpm install

# Create environment file (only needed for modules using external APIs)
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory (only required if using modules with external API integrations):

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

_Note: The Gemini API is only used in the Fight Club module for the AI mentor feature._

Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### Running Locally

```bash
# Start development server
pnpm dev

# Open browser to http://localhost:5173
```

### Building for Production

```bash
# Create production build
pnpm build

# Preview production build locally
pnpm preview
```

### Troubleshooting with the Switchboard

If the app crashes or a module misbehaves:

1. Open `src/config/moduleRegistry.ts`
2. Set `enabled: false` for the suspicious module
3. Restart dev server
4. If crash resolved, you found the problem!
5. Fix the module and set `enabled: true` again

**Binary search approach** for unknown issues:

```typescript
// Disable half the modules
enabled: false, // modules 1-24
enabled: true,  // modules 25-48

// Crash gone? Problem is in first half
// Still crashes? Problem is in second half
// Repeat until isolated
```

## 🚢 Deployment

The project is configured for Firebase Hosting.

```bash
# Install Firebase CLI globally
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy to Firebase
firebase deploy
```

### Deployment Configuration

The `firebase.json` configuration handles SPA routing:

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

## 📁 Project Structure

```
src/
├── config/
│   └── moduleRegistry.ts  # 🔌 Single source of truth for all modules
├── modules/
│   ├── home/              # Landing page (reads from registry)
│   ├── frankenstein.../   # Module 1: Controlled/Uncontrolled Components
│   ├── fight-club.../     # Module 2: Strict Mode & Cleanup
│   ├── mean-girls.../     # Module 3: Context API & Prop Drilling
│   └── [48+ modules]/     # All configured, ready for development
├── App.tsx                # Router (generates routes from registry)
├── main.tsx               # Application entry point
└── index.css              # Global styles & animations
```

### Module Pattern

Each module follows these principles:

1. **Self-Contained:** All code lives within the module directory
2. **Single Export:** Module exports one default component
3. **Independent:** No imports from other modules
4. **Themed:** Unique visual design tied to fiction source
5. **Registry-Configured:** Metadata lives in moduleRegistry.ts

## 🎨 Design Philosophy

### Visual Themes

Each module has a unique aesthetic that reflects its fiction source:

- **Frankenstein:** Gothic serif typography (Crimson Pro), dark slate with emerald accents
- **Fight Club:** Industrial monospace (JetBrains Mono), pure black with red highlights
- **Mean Girls:** Modern sans-serif (Inter), pink pastels with vibrant accents

### Custom Animations

Defined in `index.css` for smooth module transitions:

- `fade-in`: Opacity transitions
- `slide-in-from-bottom-4`: Entry animations
- `slide-in-from-right-2`: Sequential reveals
- `zoom-in`: Scale-based entrances

### ModuleWrapper Component

Provides environment isolation for each module:

- Sets body background/text/font classes (from registry)
- Universal EXIT button (top-left, fixed position)
- Cleanup on unmount
- Scroll-to-top on route change

## 🔧 Key Implementation Details

### Centralized Module Registry

All module configuration lives in `src/config/moduleRegistry.ts`:

```typescript
export interface ModuleConfig {
  id: string;                    // Unique identifier
  path: string;                  // URL route
  title: string;                 // Display name
  subtitle: string;              // Fiction context
  concept: string;               // React concept taught
  icon: React.ComponentType;     // Lucide icon
  colorClass: string;            // Tailwind color
  bgClass: string;               // Tailwind background
  component: () => Promise<...>; // Lazy-loaded component
  wrapperProps: {                // ModuleWrapper styling
    bgClass: string;
    textClass?: string;
    fontClass?: string;
  };
  enabled: boolean;              // 🔌 Switchboard toggle
}
```

### Dynamic Route Generation

Routes are generated automatically from enabled modules:

```tsx
// App.tsx
import { getEnabledModules } from "./config/moduleRegistry";

export default function App() {
  const enabledModules = getEnabledModules();

  return (
    <Routes>
      {enabledModules.map((module) => (
        <Route
          key={module.id}
          path={module.path}
          element={
            <ModuleWrapper {...module.wrapperProps}>
              <LazyComponent />
            </ModuleWrapper>
          }
        />
      ))}
    </Routes>
  );
}
```

### Path Aliases

Configured in `tsconfig.json` and `vite.config.ts`:

```typescript
"@/*": ["./src/*"]
"@modules/*": ["./src/modules/*"]
```

Import modules: `import YourModule from "@modules/your-module";`

### Environment Handling

Only modules using external APIs need environment variables. Core functionality works without them.

## 🎯 Learning Outcomes

By exploring our 48-module curriculum, developers will master the complete React ecosystem through unforgettable cinematic storytelling:

### 🎓 Core Fundamentals (Completed)

**Frankenstein - Controlled vs Uncontrolled Components**

- Difference between controlled and uncontrolled components
- When to use each pattern
- State synchronization between React and DOM
- Input validation strategies

**Fight Club - Strict Mode & Effect Cleanup**

- Why React Strict Mode double-mounts components
- How to write proper cleanup functions
- Managing side effects safely
- AbortController for async operations

**Mean Girls - Context API**

- Problems with prop drilling
- Context API implementation
- Provider/Consumer pattern
- Performance optimization with Context

### 🚀 Advanced Topics (Ready to Implement)

**State Management Mastery**

- Immutable updates (1984)
- Complex state with useReducer (Ocean's 11)
- State synchronization (Social Network, Coherence)
- State time travel debugging (Primer)
- Optimistic rendering (Minority Report)

**Performance Optimization**

- React.memo strategies (Prestige)
- useMemo cost-benefit analysis (Prestige cost analysis)
- Preventing unnecessary re-renders (Groundhog Day)
- Stale closure pitfalls (Shutter Island)

**Component Architecture**

- Deep composition patterns (Inception)
- Component identity and keys (Blade Runner)
- Higher-order components (Get Out)
- Dynamic component rendering (Usual Suspects)
- Portal rendering (Stranger Things)

**Hooks Deep Dive**

- useEffect dependency mastery (Matrix)
- useState vs useRef (Memento)
- Custom hooks abstraction (Her)
- useCallback timing (Looper)
- Effect cleanup lifecycle (Jurassic Park)

**Advanced Patterns**

- Singleton patterns (Moon)
- Component testing strategies (Ex Machina)
- Error boundaries and resilience
- Circular dependency resolution (12 Monkeys)
- Async state management (Interstellar)

**Real-World Scenarios**

- Prop changes causing cascading updates (Back to the Future)
- Component lifecycle debugging (Russian Doll)
- State reset strategies (Eternal Sunshine, Edge of Tomorrow)
- Multiple component perspectives (Rashomon)
- Reverse data flow (Tenet)

---

With **48 modules covering 48 fiction sources**, this isn't just a React course—it's a comprehensive journey through modern React development, where every concept becomes a story you'll never forget. 🎬

## 🤝 Contributing

We're actively seeking contributors to expand this platform! Each React concept deserves its own fiction-themed module.

### Contribution Guidelines

1. **Choose a React concept** not yet covered (check `moduleRegistry.ts` for placeholders)
2. **Select a work of fiction** that serves as a good metaphor
3. **Create a self-contained module** following the architecture above
4. **Add your module to the registry** with `enabled: true`
5. **Submit a PR** with your module

### Module Requirements

- ✅ **Isolated:** Lives entirely in `/src/modules/your-module/`
- ✅ **Registry-configured:** Added to `moduleRegistry.ts` with complete metadata
- ✅ **Educational:** Clearly teaches the React concept
- ✅ **Themed:** Visual design reflects the fiction source
- ✅ **Interactive:** Includes working demonstrations
- ✅ **Documented:** Code comments explaining key patterns

### Adding Your Module

```typescript
// 1. Create your module
// src/modules/your-module/index.tsx

export default function YourModule() {
  // Your implementation
}

// 2. Add to registry
// src/config/moduleRegistry.ts

{
  id: "your-module",
  path: "/your-module",
  title: "Your Fiction Title",
  subtitle: "Context, Year",
  concept: "React Concept",
  icon: YourIcon,
  colorClass: "text-color",
  bgClass: "bg-color...",
  component: () => import("@modules/your-module"),
  wrapperProps: {
    bgClass: "bg-slate-950",
    textClass: "text-slate-300",
    fontClass: "font-sans",
  },
  enabled: true,
}

// 3. Done! Module automatically appears in routing and home page
```

### Module Ideas (48 Configured - Claim Yours!)

All 48 modules are **already configured** in `moduleRegistry.ts` with complete metadata! Browse the registry and claim one to implement:

**🔥 High-Priority Core Concepts:**

- ✅ The Matrix → useEffect Dependencies
- ✅ Inception → Component Composition
- ✅ Memento → useState vs useRef
- ✅ Groundhog Day → Re-rendering & Pure Functions
- ✅ Interstellar → Async State & Race Conditions

**⚡ Performance & Optimization:**

- ✅ The Prestige → React.memo
- ✅ Arrival → useMemo for Expensive Calculations
- ✅ Shutter Island → Stale Closures
- ✅ Clockwork Orange → Forced Re-renders

**🏗️ Component Patterns:**

- ✅ Blade Runner → Component Identity & Keys
- ✅ Westworld → Component vs Instance
- ✅ Rashomon → Multiple Component Perspectives
- ✅ Stranger Things → React Portals
- ✅ Get Out → Higher-Order Components

**📦 State Management:**

- ✅ 1984 → Immutable State Updates
- ✅ Ocean's 11 → useReducer for Complex State
- ✅ LOTR → Prop Drilling Problem
- ✅ Primer → State Time Travel
- ✅ Minority Report → Optimistic Updates

**And 28+ more!** Check `src/config/moduleRegistry.ts` for the complete list.

**How to claim a module:**

1. Browse `moduleRegistry.ts` to see all 48 modules
2. Open an issue: "Claiming [Module Name]"
3. Implement following the pattern in completed modules
4. Set `enabled: true` in registry
5. Submit your PR!

Each module already has:

- ✅ Fiction source identified
- ✅ React concept mapped
- ✅ Icon, colors, and styling configured
- ✅ Route path defined
- ✅ Metadata complete

You just need to build the educational content! 🎬

### Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/cinematic-react-patterns.git

# 2. Create branch
git checkout -b module/your-concept-name

# 3. Install dependencies
pnpm install

# 4. Find your module slot in moduleRegistry.ts
# Look for modules with enabled: false or create a new entry

# 5. Create your module
mkdir src/modules/your-concept-name
# Build your module...

# 6. Update registry
# Set enabled: true and verify all metadata

# 7. Test locally
pnpm dev

# 8. Commit and push
git add .
git commit -m "feat: add [Your Concept] module based on [Fiction Work]"
git push origin module/your-concept-name

# 9. Open Pull Request
```

### Code Standards

- **TypeScript:** Strictly typed (no `any` unless absolutely necessary)
- **Styling:** Tailwind CSS (utility-first approach)
- **Formatting:** Follow existing code style
- **Components:** Functional components with hooks
- **Comments:** Explain complex logic and metaphor connections
- **Registry:** Complete all metadata fields accurately

### What Makes a Great Module?

1. **Clear Metaphor:** Fiction narrative naturally maps to React concept
2. **Interactive Demo:** Users can experiment with the concept
3. **Progressive Learning:** Concept builds from simple to complex
4. **Visual Polish:** Design reflects the fiction's aesthetic
5. **Code Examples:** Live, editable code demonstrations
6. **Memorable:** The fiction helps cement the concept in memory
7. **Complete Registry Entry:** All fields properly configured

## 🔌 Module Management

### Enabling/Disabling Modules

```typescript
// src/config/moduleRegistry.ts

{
  id: "your-module",
  enabled: true,  // ✅ Module active (shows on home, routes work)
  // OR
  enabled: false, // ❌ Module disabled (hidden everywhere)
}
```

### Module Statistics

In development mode, the home page shows:

```
Total: 48  Enabled: 45  Disabled: 3
```

This helps you track which modules are currently active.

### Best Practices

- ✅ Keep completed modules `enabled: true`
- ✅ Set `enabled: false` while developing to avoid distractions
- ✅ Disable problematic modules immediately for troubleshooting
- ✅ Use comments to explain disabled modules
- ✅ Re-enable modules once tested and working

```typescript
{
  id: "my-module",
  enabled: false, // 🚧 TODO: Fix stale closure bug
  // ...
}
```

## 📝 License

MIT License - feel free to use this for educational purposes.

## 🙏 Acknowledgments

- Inspired by the brilliant storytelling of great films and literature
- Built with modern React patterns and best practices
- Designed for developers who learn through metaphor and narrative
- Switchboard architecture for scalable module management

## 📧 Contact & Support

- **Repository:** [github.com/akbargherbal/cinematic-react-patterns](https://github.com/akbargherbal/cinematic-react-patterns)
- **Issues:** [Open an issue](https://github.com/akbargherbal/cinematic-react-patterns/issues)
- **Discussions:** [GitHub Discussions](https://github.com/akbargherbal/cinematic-react-patterns/discussions)

For questions, bug reports, or module proposals, please use GitHub Issues or Discussions.

---

**Remember:** The first rule of React development is you _do_ talk about React development. 🎬

**The Achievement:** 48 React concepts. 48 unforgettable stories. One comprehensive curriculum. From Frankenstein's uncontrolled components to Neo's dependency arrays—every concept has its perfect cinematic metaphor.

**Your Turn:** With 45 modules ready for implementation, the stage is set. Claim your favorite film and teach the world React. 🔌✨
