# 🎬 Cinematic React Patterns

> Master React fundamentals through iconic works of fiction

An interactive educational platform that transforms complex React concepts into memorable, story-driven learning experiences. Each module uses a beloved work of fiction—films, novels, plays—as a metaphor to teach core React patterns.

**Status:** Proof of Concept - Actively seeking contributors!

## 🎯 Project Vision

**Cinematic React Patterns** is a proof-of-concept platform designed to teach React through fiction. The goal is to build a comprehensive library of React concepts, each connected to memorable works of fiction (movies, novels, plays, etc.) that serve as teaching metaphors.

### Current Status

- ✅ 3 modules completed (controlled components, Strict Mode, Context API)
- 🚧 Architecture established for modular contributions
- 📢 Open for community contributions

### Long-term Goal

Create a complete React learning platform where every concept has its own self-contained, fiction-themed module that developers can explore independently.

## 📚 Current Modules

### 🧪 Module 1: Frankenstein's Forms

- **Fiction Source:** Mary Shelley's _Frankenstein_ (Novel, 1818)
- **React Concept:** Controlled vs Uncontrolled Components
- **Path:** `/src/modules/dr-frank/`
- **Key Learning:** Understanding component state management through Dr. Frankenstein's journal entries

### ⚡ Module 2: Project Mayhem

- **Fiction Source:** _Fight Club_ (Novel/Film, 1996/1999)
- **React Concept:** Strict Mode & Cleanup Functions
- **Path:** `/src/modules/fight-club/`
- **Key Learning:** Why React double-mounts and the importance of effect cleanup

### 💖 Module 3: The Burn Book

- **Fiction Source:** _Mean Girls_ (Film, 2004)
- **React Concept:** Context API & Prop Drilling
- **Path:** `/src/modules/mean-girls/`
- **Key Learning:** Sharing state without passing props through every component

## 🏗️ Architecture

This project follows a **Modular Monolith** architecture where each React concept lives in its own self-contained module.

### Core Principles

1. **Module Isolation:** Each concept is a standalone directory under `/src/modules/`
2. **Plug-and-Play:** Modules only need to be imported into `App.tsx` to work
3. **Zero Dependencies Between Modules:** Modules don't import from each other
4. **Thematic Consistency:** Each module has its own visual theme tied to its fiction source

### Directory Structure

```
cinematic-react-patterns/
├── src/
│   ├── modules/
│   │   ├── home/              # Landing page (module showcase)
│   │   ├── dr-frank/          # Module 1: Controlled/Uncontrolled
│   │   ├── fight-club/        # Module 2: Strict Mode
│   │   ├── mean-girls/        # Module 3: Context API
│   │   └── [your-module]/     # Your contribution here!
│   ├── App.tsx                # Main router - import modules here
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
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

1. **Create module directory:**

   ```bash
   mkdir src/modules/your-concept-name
   ```

2. **Build your module:**

   ```tsx
   // src/modules/your-concept-name/index.tsx
   export default function YourModule() {
     return (
       <div className="min-h-screen">
         {/* Your fiction-themed React lesson */}
       </div>
     );
   }
   ```

3. **Register in App.tsx:**

   ```tsx
   import YourModule from "@modules/your-concept-name";

   // Add route in <Routes>:
   <Route
     path="/your-path"
     element={
       <ModuleWrapper bgClass="bg-your-color" ...>
         <YourModule />
       </ModuleWrapper>
     }
   />
   ```

4. **Add to home page:**
   ```tsx
   // src/modules/home/index.tsx - Add to modules array
   {
     path: "/your-path",
     title: "Your Module Title",
     concept: "React Concept",
     // ...
   }
   ```

That's it! Your module is now live and accessible.

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

# Open browser to http://localhost:3000
```

### Building for Production

```bash
# Create production build
pnpm build

# Preview production build locally
pnpm preview
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
├── modules/
│   ├── home/              # Landing page showcasing all modules
│   ├── dr-frank/          # Module 1: Controlled/Uncontrolled Components
│   ├── fight-club/        # Module 2: Strict Mode & Cleanup
│   ├── mean-girls/        # Module 3: Context API & Prop Drilling
│   └── [new-module]/      # Future modules live here
├── App.tsx                # Main router - registers all module routes
├── main.tsx              # Application entry point
└── index.css             # Global styles & animations
```

### Module Pattern

Each module follows these principles:

1. **Self-Contained:** All code lives within the module directory
2. **Single Export:** Module exports one default component
3. **Independent:** No imports from other modules
4. **Themed:** Unique visual design tied to fiction source

## 🎨 Design Philosophy

### Visual Themes

Each module has a unique aesthetic that reflects its fiction source:

- **Dr. Frank:** Gothic serif typography (Crimson Pro), dark slate with emerald accents
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

- Sets body background/text/font classes
- Universal EXIT button (top-left, fixed position)
- Cleanup on unmount
- Scroll-to-top on route change

## 🔧 Key Implementation Details

### Route Registration

All modules are registered in `App.tsx`:

```tsx
<Route
  path="/your-module"
  element={
    <ModuleWrapper
      bgClass="bg-color"
      textClass="text-color"
      fontClass="font-family"
    >
      <YourModule />
    </ModuleWrapper>
  }
/>
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

By exploring the current modules, developers will understand:

### Module 1: Frankenstein's Forms

- Difference between controlled and uncontrolled components
- When to use each pattern
- State synchronization between React and DOM
- Input validation strategies

### Module 2: Project Mayhem

- Why React Strict Mode double-mounts components
- How to write proper cleanup functions
- Managing side effects safely
- AbortController for async operations

### Module 3: The Burn Book

- Problems with prop drilling
- Context API implementation
- Provider/Consumer pattern
- Performance optimization with Context

_As more modules are added, this list will grow to cover the entire React ecosystem._

## 🤝 Contributing

We're actively seeking contributors to expand this platform! Each React concept deserves its own fiction-themed module.

### Contribution Guidelines

1. **Choose a React concept** not yet covered (see ideas below)
2. **Select a work of fiction** that serves as a good metaphor
3. **Create a self-contained module** following the architecture above
4. **Submit a PR** with your module

### Module Requirements

- ✅ **Isolated:** Lives entirely in `/src/modules/your-module/`
- ✅ **Plug-and-play:** Only requires import in `App.tsx`
- ✅ **Educational:** Clearly teaches the React concept
- ✅ **Themed:** Visual design reflects the fiction source
- ✅ **Interactive:** Includes working demonstrations
- ✅ **Documented:** Code comments explaining key patterns

### Module Ideas (Open for Claiming!)

**React Concepts Needed:**

- useEffect & Side Effects → _The Matrix_ (reality vs simulation)
- useReducer & Complex State → _Pulp Fiction_ (non-linear state management)
- useMemo & useCallback → _Memento_ (memory optimization)
- Component Composition → _Inception_ (nested components)
- Custom Hooks → _Harry Potter_ (spell creation/reusable magic)
- Error Boundaries → _1984_ (thought police/error catching)
- Refs & DOM Access → _The Picture of Dorian Gray_ (direct manipulation)
- Lazy Loading → _Waiting for Godot_ (suspense and delays)
- Portals → _Alice in Wonderland_ (rendering outside hierarchy)
- Keys & Lists → _The Hobbit_ (item reconciliation)

**Your idea here!** Open an issue to claim a concept + fiction pairing.

### Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/cinematic-react-patterns.git

# 2. Create branch
git checkout -b module/your-concept-name

# 3. Install dependencies
pnpm install

# 4. Create your module
mkdir src/modules/your-concept-name
# Build your module...

# 5. Test locally
pnpm dev

# 6. Commit and push
git add .
git commit -m "feat: add [Your Concept] module based on [Fiction Work]"
git push origin module/your-concept-name

# 7. Open Pull Request
```

### Code Standards

- **TypeScript:** Strictly typed (no `any` unless absolutely necessary)
- **Styling:** Tailwind CSS (utility-first approach)
- **Formatting:** Follow existing code style
- **Components:** Functional components with hooks
- **Comments:** Explain complex logic and metaphor connections

### What Makes a Great Module?

1. **Clear Metaphor:** Fiction narrative naturally maps to React concept
2. **Interactive Demo:** Users can experiment with the concept
3. **Progressive Learning:** Concept builds from simple to complex
4. **Visual Polish:** Design reflects the fiction's aesthetic
5. **Code Examples:** Live, editable code demonstrations
6. **Memorable:** The fiction helps cement the concept in memory

## 📝 License

MIT License - feel free to use this for educational purposes.

## 🙏 Acknowledgments

- Inspired by the brilliant storytelling of great films
- Built with modern React patterns and best practices
- Designed for developers who learn through metaphor and narrative

## 📧 Contact & Support

- **Repository:** [github.com/akbargherbal/cinematic-react-patterns](https://github.com/akbargherbal/cinematic-react-patterns)
- **Issues:** [Open an issue](https://github.com/akbargherbal/cinematic-react-patterns/issues)
- **Discussions:** [GitHub Discussions](https://github.com/akbargherbal/cinematic-react-patterns/discussions)

For questions, bug reports, or module proposals, please use GitHub Issues or Discussions.

---

**Remember:** The first rule of React development is you _do_ talk about React development. 🎬
