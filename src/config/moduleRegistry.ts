import React from "react";
import * as modulesJSONData from './moduleRegistry.json';

import {
  FlaskConical,
  Code,
  Zap,
  Crown,
  Book,
  Film,
  Clock,
  Sparkles,
  Flame,
  Layers,
  Camera,
  FileText,
  Activity,
  Mountain,
  Users,
  Heart,
  Anchor,
  Ghost,
  Database,
  Brain,
  Eye,
  GitBranch,
  AlertTriangle,
  RotateCcw,
  Copy,
  Moon,
  Shield,
  RefreshCw,
} from "lucide-react";

/**
 * Module Configuration Interface
 * Defines the complete structure for each React learning module
 */
export interface ModuleConfig {
  id: string; // Unique identifier (matches path without /)
  path: string; // URL path for routing
  title: string; // Display title
  subtitle: string; // Fiction source context
  concept: string; // React concept being taught
  icon: React.ComponentType<any>; // Lucide icon component
  colorClass: string; // Tailwind color class for icon
  bgClass: string; // Tailwind background classes for card

  // Component import (lazy-loaded)
  component: () => Promise<{ default: React.ComponentType }>;

  // ModuleWrapper styling props
  wrapperProps: {
    bgClass: string;
    textClass?: string;
    fontClass?: string;
  };

  // 🔌 SWITCHBOARD TOGGLE - Enable/disable module across entire app
  enabled: boolean;
}

/**
 * 🎬 CINEMATIC REACT PATTERNS - MODULE REGISTRY
 *
 * This is the SINGLE SOURCE OF TRUTH for all modules.
 *
 * SWITCHBOARD INSTRUCTIONS:
 * - Set `enabled: true` to activate a module (appears in home + routing works)
 * - Set `enabled: false` to disable a module (hidden from home + route disabled)
 *
 * TROUBLESHOOTING WORKFLOW:
 * 1. If system crashes, set suspicious module to `enabled: false`
 * 2. Restart dev server
 * 3. If crash resolved, you found the problematic module
 * 4. Fix the module or keep it disabled
 */
export const moduleRegistry: ModuleConfig[] = [
  {
    id: "mean-girls-context-api",
    path: "/mean-girls-context-api",
    title: "Mean Girls",
    subtitle: "North Shore High, 2004",
    concept: "Context API & Prop Drilling",
    icon: Sparkles,
    colorClass: "text-pink-500",
    bgClass: "bg-pink-50 border-pink-300 hover:border-pink-500",
    component: () => import("@modules/mean-girls-context-api"),
    wrapperProps: {
      bgClass: "bg-white",
      textClass: "text-slate-700",
      fontClass: "font-sans",
    },
    enabled: true, // ✅ COMPLETED MODULE
  },

  {
    id: "frankenstein-controlled-components",
    path: "/frankenstein-controlled-components",
    title: "Frankenstein's Covenant",
    subtitle: "Victor Frankenstein, Geneva, 1818",
    concept: "Controlled vs Uncontrolled Components",
    icon: Zap,
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500",
    component: () => import("@modules/frankenstein-controlled-components"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-serif",
    },
    enabled: true, // ✅ COMPLETED MODULE
  },

  {
    id: "fight-club-strict-mode",
    path: "/fight-club-strict-mode",
    title: "Fight Club",
    subtitle: "Tyler Durden, 1999",
    concept: "Strict Mode & Effect Cleanup",
    icon: Flame,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500",
    component: () => import("@modules/fight-club-strict-mode"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-200",
      fontClass: "font-sans",
    },
    enabled: true, // ✅ COMPLETED MODULE
  },

  {
    id: "matrix-useeffect-dependencies",
    path: "/matrix-useeffect-dependencies",
    title: "The Matrix",
    subtitle: "Neo, The Construct, 1999",
    concept: "useEffect Dependencies",
    icon: Zap,
    colorClass: "text-green-500",
    bgClass: "bg-green-950/20 border-green-500/30 hover:border-green-500",
    component: () => import("@modules/matrix-useeffect-dependencies"),
    wrapperProps: {
      bgClass: "bg-black",
      textClass: "text-green-500",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER - Enable when ready
  },

  {
    id: "inception-component-composition",
    path: "/inception-component-composition",
    title: "Inception",
    subtitle: "Cobb's Team, 2010",
    concept: "Component Composition & Children Props",
    icon: Layers,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/inception-component-composition"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "memento-state-management",
    path: "/memento-state-management",
    title: "Memento",
    subtitle: "Leonard Shelby, 2000",
    concept: "useState vs useRef",
    icon: Camera,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
    component: () => import("@modules/memento-state-management"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "groundhog-day-rerendering",
    path: "/groundhog-day-rerendering",
    title: "Groundhog Day",
    subtitle: "Phil Connors, Punxsutawney, 1993",
    concept: "Re-rendering & Pure Functions",
    icon: Clock,
    colorClass: "text-sky-500",
    bgClass: "bg-sky-950/20 border-sky-500/30 hover:border-sky-500",
    component: () => import("@modules/groundhog-day-rerendering"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "1984-state-mutation",
    path: "/1984-state-mutation",
    title: "1984",
    subtitle: "Winston Smith, Ministry of Truth, 1949",
    concept: "Immutable State Updates",
    icon: FileText,
    colorClass: "text-blue-400",
    bgClass: "bg-slate-950/20 border-slate-700/30 hover:border-slate-500",
    component: () => import("@modules/1984-state-mutation"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "back-to-future-prop-changes",
    path: "/back-to-future-prop-changes",
    title: "Back to the Future",
    subtitle: "Marty McFly, Hill Valley, 1985",
    concept: "Props Changes & Component Updates",
    icon: Clock,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/back-to-future-prop-changes"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-200",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "truman-show-component-lifecycle",
    path: "/truman-show-component-lifecycle",
    title: "The Truman Show",
    subtitle: "Seahaven Island, 1998",
    concept: "useEffect & Component Lifecycle",
    icon: Activity,
    colorClass: "text-sky-400",
    bgClass: "bg-sky-950/20 border-sky-500/30 hover:border-sky-500",
    component: () => import("@modules/truman-show-component-lifecycle"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "lotr-prop-drilling-hell",
    path: "/lotr-prop-drilling-hell",
    title: "The Lord of the Rings",
    subtitle: "Frodo Baggins, Middle-earth, 2001-2003",
    concept: "Prop Drilling Problem",
    icon: Mountain,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
    component: () => import("@modules/lotr-prop-drilling-hell"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "oceans-eleven-coordinated-state",
    path: "/oceans-eleven-coordinated-state",
    title: "Ocean's Eleven",
    subtitle: "Danny Ocean, Bellagio Vault, 2001",
    concept: "useReducer for Complex State",
    icon: Users,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
    component: () => import("@modules/oceans-eleven-coordinated-state"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "jurassic-park-side-effects",
    path: "/jurassic-park-side-effects",
    title: "Jurassic Park",
    subtitle: "Isla Nublar, 1993",
    concept: "Side Effects & useEffect Cleanup",
    icon: Zap,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
    component: () => import("@modules/jurassic-park-side-effects"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "eternal-sunshine-state-reset",
    path: "/eternal-sunshine-state-reset",
    title: "Eternal Sunshine of the Spotless Mind",
    subtitle: "Joel & Clementine, 2004",
    concept: "State Reset & Key Prop",
    icon: Heart,
    colorClass: "text-blue-500",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/eternal-sunshine-state-reset"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "prestige-react-memo",
    path: "/prestige-react-memo",
    title: "The Prestige",
    subtitle: "Robert Angier, Victorian London, 1899",
    concept: "React.memo & Performance Optimization",
    icon: Zap,
    colorClass: "text-blue-400",
    bgClass: "bg-slate-950/20 border-slate-700 hover:border-blue-500",
    component: () => import("@modules/prestige-react-memo"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-serif",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "shutter-island-stale-closures",
    path: "/shutter-island-stale-closures",
    title: "Shutter Island",
    subtitle: "Teddy Daniels, Ashecliffe Hospital, 1954",
    concept: "Stale Closures in useEffect",
    icon: Anchor,
    colorClass: "text-blue-400",
    bgClass: "bg-slate-950/20 border-slate-700/30 hover:border-blue-500",
    component: () => import("@modules/shutter-island-stale-closures"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "sixth-sense-conditional-rendering",
    path: "/sixth-sense-conditional-rendering",
    title: "The Sixth Sense",
    subtitle: "Malcolm Crowe, Child Psychologist, 1999",
    concept: "Conditional Rendering Logic",
    icon: Ghost,
    colorClass: "text-red-500",
    bgClass: "bg-slate-950/20 border-red-500/30 hover:border-red-500",
    component: () => import("@modules/sixth-sense-conditional-rendering"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "interstellar-async-state",
    path: "/interstellar-async-state",
    title: "Interstellar",
    subtitle: "Cooper, Gargantua, 2014",
    concept: "Asynchronous State & Race Conditions",
    icon: Clock,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/interstellar-async-state"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "social-network-state-sync",
    path: "/social-network-state-sync",
    title: "The Social Network",
    subtitle: "Mark Zuckerberg & Eduardo Saverin, 2003-2005",
    concept: "State Synchronization Across Instances",
    icon: Database,
    colorClass: "text-blue-600",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/social-network-state-sync"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "parasite-component-injection",
    path: "/parasite-component-injection",
    title: "Parasite",
    subtitle: "The Kim Family, 2019",
    concept: "Component Injection & Children Props",
    icon: Users,
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500",
    component: () => import("@modules/parasite-component-injection"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "clockwork-orange-forced-rerenders",
    path: "/clockwork-orange-forced-rerenders",
    title: "A Clockwork Orange",
    subtitle: "Alex DeLarge, Dystopian Future, 1971",
    concept: "forceUpdate() & Uncontrolled Re-renders",
    icon: Zap,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500",
    component: () => import("@modules/clockwork-orange-forced-rerenders"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "arrival-usememo-expensive-calculations",
    path: "/arrival-usememo-expensive-calculations",
    title: "Arrival",
    subtitle: "Dr. Louise Banks, Montana, 2016",
    concept: "useMemo for Performance Optimization",
    icon: Brain,
    colorClass: "text-teal-400",
    bgClass: "bg-teal-950/20 border-teal-500/30 hover:border-teal-500",
    component: () => import("@modules/arrival-usememo-expensive-calculations"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "usual-suspects-dynamic-rendering",
    path: "/usual-suspects-dynamic-rendering",
    title: "The Usual Suspects",
    subtitle: "Verbal Kint, Interrogation Room, 1995",
    concept: "Dynamic Component Rendering",
    icon: Eye,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
    component: () => import("@modules/usual-suspects-dynamic-rendering"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "primer-state-time-travel",
    path: "/primer-state-time-travel",
    title: "Primer",
    subtitle: "Aaron & Abe, 2004",
    concept: "State Time Travel & Debugging",
    icon: Clock,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
    component: () => import("@modules/primer-state-time-travel"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "get-out-component-hijacking",
    path: "/get-out-component-hijacking",
    title: "Get Out",
    subtitle: "Chris Washington, Armitage Estate, 2017",
    concept: "Higher-Order Components (HOCs)",
    icon: Eye,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500",
    component: () => import("@modules/get-out-component-hijacking"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "her-is-custom-hooks",
    path: "/her-is-custom-hooks",
    title: "Her",
    subtitle: "Theodore Twombly, Los Angeles, 2025",
    concept: "Custom Hooks & Abstraction",
    icon: Heart,
    colorClass: "text-pink-500",
    bgClass: "bg-pink-950/20 border-pink-500/30 hover:border-pink-500",
    component: () => import("@modules/her-is-custom-hooks"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "donnie-darko-effect-dependencies",
    path: "/donnie-darko-effect-dependencies",
    title: "Donnie Darko",
    subtitle: "Middlesex, Virginia, 1988",
    concept: "Effect Dependencies & Timing",
    icon: Clock,
    colorClass: "text-blue-500",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/donnie-darko-effect-dependencies"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "bandersnatch-state-branching",
    path: "/bandersnatch-state-branching",
    title: "Black Mirror: Bandersnatch",
    subtitle: "Stefan Butler, 1984",
    concept: "State Branching & Decision Trees",
    icon: GitBranch,
    colorClass: "text-purple-500",
    bgClass: "bg-purple-950/20 border-purple-500/30 hover:border-purple-500",
    component: () => import("@modules/bandersnatch-state-branching"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "tenet-reverse-data-flow",
    path: "/tenet-reverse-data-flow",
    title: "Tenet",
    subtitle: "The Protagonist, 2020",
    concept: "Reverse Data Flow & State Inversion",
    icon: GitBranch,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/tenet-reverse-data-flow"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "rashomon-component-perspectives",
    path: "/rashomon-component-perspectives",
    title: "Rashomon",
    subtitle: "Kyoto, 12th Century Japan",
    concept: "Multiple Component Views of Same State",
    icon: Eye,
    colorClass: "text-amber-600",
    bgClass: "bg-amber-950/20 border-amber-600/30 hover:border-amber-600",
    component: () => import("@modules/rashomon-component-perspectives"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-serif",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "westworld-component-vs-instance",
    path: "/westworld-component-vs-instance",
    title: "Westworld",
    subtitle: "Delos Destinations, 2052",
    concept: "Component Definition vs Instance",
    icon: Users,
    colorClass: "text-orange-500",
    bgClass: "bg-orange-950/20 border-orange-500/30 hover:border-orange-500",
    component: () => import("@modules/westworld-component-vs-instance"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-serif",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "blade-runner-component-identity",
    path: "/blade-runner-component-identity",
    title: "Blade Runner",
    subtitle: "Rick Deckard, Los Angeles, 2019",
    concept: "Component Identity & Keys",
    icon: Eye,
    colorClass: "text-cyan-400",
    bgClass: "bg-slate-950/20 border-cyan-500/30 hover:border-cyan-500",
    component: () => import("@modules/blade-runner-component-identity"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "the-thing-component-replacement",
    path: "/the-thing-component-replacement",
    title: "The Thing",
    subtitle: "U.S. Outpost 31, Antarctica, 1982",
    concept: "Component Swapping & Type Checking",
    icon: AlertTriangle,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500",
    component: () => import("@modules/the-thing-component-replacement"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "stranger-things-portal-rendering",
    path: "/stranger-things-portal-rendering",
    title: "Stranger Things",
    subtitle: "Hawkins, Indiana, 1983",
    concept: "React Portals",
    icon: Zap,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500",
    component: () => import("@modules/stranger-things-portal-rendering"),
    wrapperProps: {
      bgClass: "bg-red-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "ex-machina-component-testing",
    path: "/ex-machina-component-testing",
    title: "Ex Machina",
    subtitle: "Caleb Programmer, Nathan's Facility, 2014",
    concept: "Component Testing & Behavior Verification",
    icon: Eye,
    colorClass: "text-cyan-400",
    bgClass: "bg-slate-950/20 border-cyan-500/30 hover:border-cyan-500",
    component: () => import("@modules/ex-machina-component-testing"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "looper-callback-timing",
    path: "/looper-callback-timing",
    title: "Looper",
    subtitle: "Joe, Kansas Cornfield, 2044",
    concept: "Callback Execution Timing",
    icon: Clock,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
    component: () => import("@modules/looper-callback-timing"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "butterfly-effect-state-mutation",
    path: "/butterfly-effect-state-mutation",
    title: "The Butterfly Effect",
    subtitle: "Evan Treborn, 2004",
    concept: "Side Effects & State Purity",
    icon: GitBranch,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
    component: () => import("@modules/butterfly-effect-state-mutation"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "source-code-remounting-loop",
    path: "/source-code-remounting-loop",
    title: "Source Code",
    subtitle: "Colter Stevens, The Train, 2011",
    concept: "Component Remounting & Cleanup",
    icon: RotateCcw,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/source-code-remounting-loop"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "multiplicity-component-cloning",
    path: "/multiplicity-component-cloning",
    title: "Multiplicity",
    subtitle: "Doug Kinney, Suburban America, 1996",
    concept: "Shallow vs Deep Copy",
    icon: Copy,
    colorClass: "text-blue-500",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/multiplicity-component-cloning"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "edge-of-tomorrow-component-reset",
    path: "/edge-of-tomorrow-component-reset",
    title: "Edge of Tomorrow",
    subtitle: "Major Cage, 2014",
    concept: "State Reset & Component Lifecycle",
    icon: RotateCcw,
    colorClass: "text-orange-500",
    bgClass: "bg-orange-950/20 border-orange-500/30 hover:border-orange-500",
    component: () => import("@modules/edge-of-tomorrow-component-reset"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "prestige-usememo-cost-analysis",
    path: "/prestige-usememo-cost-analysis",
    title: "The Prestige",
    subtitle: "Angier & Borden, Victorian London",
    concept: "useMemo Cost Analysis",
    icon: Zap,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
    component: () => import("@modules/prestige-usememo-cost-analysis"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-serif",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "moon-singleton-pattern",
    path: "/moon-singleton-pattern",
    title: "Moon",
    subtitle: "Sam Bell, Lunar Station Sarang, 2009",
    concept: "Singleton Components & Global State",
    icon: Moon,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/moon-singleton-pattern"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "matrix-reloaded-system-exit",
    path: "/matrix-reloaded-system-exit",
    title: "The Matrix Reloaded",
    subtitle: "Neo's Choice, 2003",
    concept: "useEffect Cleanup & Lifecycle",
    icon: Zap,
    colorClass: "text-green-500",
    bgClass: "bg-green-950/20 border-green-500/30 hover:border-green-500",
    component: () => import("@modules/matrix-reloaded-system-exit"),
    wrapperProps: {
      bgClass: "bg-black",
      textClass: "text-green-400",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "village-scoped-context",
    path: "/village-scoped-context",
    title: "The Village",
    subtitle: "Ivy Walker, Covington, 2004",
    concept: "Context Scope & Provider Boundaries",
    icon: Shield,
    colorClass: "text-amber-600",
    bgClass: "bg-amber-950/20 border-amber-600/30 hover:border-amber-600",
    component: () => import("@modules/village-scoped-context"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-serif",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "twelve-monkeys-circular-dependencies",
    path: "/twelve-monkeys-circular-dependencies",
    title: "Twelve Monkeys",
    subtitle: "James Cole, 1995",
    concept: "Circular Dependencies & Infinite Loops",
    icon: Zap,
    colorClass: "text-amber-500",
    bgClass: "bg-slate-950/20 border-slate-500/30 hover:border-amber-500",
    component: () => import("@modules/twelve-monkeys-circular-dependencies"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-mono",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "minority-report-optimistic-rendering",
    path: "/minority-report-optimistic-rendering",
    title: "Minority Report",
    subtitle: "Pre-Crime Division, 2054",
    concept: "Optimistic Updates & Speculative Rendering",
    icon: Eye,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/minority-report-optimistic-rendering"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "coherence-state-sync",
    path: "/coherence-state-sync",
    title: "Coherence",
    subtitle: "Em, The Dinner Party, 2013",
    concept: "State Synchronization Across Component Instances",
    icon: Users,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500",
    component: () => import("@modules/coherence-state-sync"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "russian-doll-lifecycle-debugging",
    path: "/russian-doll-lifecycle-debugging",
    title: "Russian Doll",
    subtitle: "Nadia Vulvokov, 2019",
    concept: "Debugging Component Lifecycle Issues",
    icon: RefreshCw,
    colorClass: "text-orange-500",
    bgClass: "bg-orange-950/20 border-orange-500/30 hover:border-orange-500",
    component: () => import("@modules/russian-doll-lifecycle-debugging"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true, // 🚧 PLACEHOLDER
  },

  {
    id: "use-transition-hook",
    path: "/use-transition-hook",
    title: "Inception",
    subtitle: "Ariadne, The Architect, 2010",
    concept: "useTransition Hook",
    icon: Zap,
    colorClass: "text-blue-500",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/use-transition-hook"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
    },
    enabled: true,
  },

  {
    id: "use-transition-hook",
    path: "/use-transition-hook_gemini",
    title: "Inception",
    subtitle: "The Dream Levels, 2010",
    concept: "useTransition Hook",
    icon: Layers,
    colorClass: "text-indigo-400",
    bgClass: "bg-slate-900 border-indigo-500/30 hover:border-indigo-500",
    component: () => import("@modules/use-transition-hook_gemini"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true,
  },

  {
    id: "use-reducer-minority-report",
    path: "/use-reducer-minority-report",
    title: "Minority Report",
    subtitle: "PreCrime Unit, 2054",
    concept: "useReducer Hook",
    icon: Eye,
    colorClass: "text-cyan-400",
    bgClass: "bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-500",
    component: () => import("@modules/use-reducer-minority-report"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true,
  },
  {
    id: "lifting-state-up-in-middle-earth",
    path: "/lifting-state-up-in-middle-earth",
    title: "The Lord of the Rings",
    subtitle: "The Council of Elrond, 1954",
    concept: "Lifting State Up",
    icon: Crown,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
    component: () => import("@modules/lifting-state-up-in-middle-earth"),
    wrapperProps: {
      bgClass: "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-serif",
    },
    enabled: true,
  },
  {
    id: "the-force-is-the-context",
    path: "/the-force-is-the-context",
    title: "Star Wars",
    subtitle: "Padawan Anya, Jedi Temple, 1977",
    concept: "useContext Hook and Context API",
    icon: Zap,
    colorClass: "text-blue-500",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
    component: () => import("@modules/the-force-is-the-context"),
    wrapperProps: {
      bgClass: "bg-slate-950",
      textClass: "text-slate-300",
      fontClass: "font-sans",
    },
    enabled: true,
  },

  {
  id: "strict-mode-precognition",
  path: "/strict-mode-precognition",
  title: "Minority Report",
  subtitle: "Chief John Anderton, PreCrime Division, 2002",
  concept: "React Strict Mode",
  icon: Eye,
  colorClass: "text-blue-500",
  bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500",
  component: () => import("@modules/strict-mode-precognition"),
  wrapperProps: {
    bgClass: "bg-slate-950",
    textClass: "text-slate-300",
    fontClass: "font-sans"
  },
  enabled: true
},
{
  id: "code-splitting-with-horcruxes",
  path: "/code-splitting-with-horcruxes",
  title: "Harry Potter",
  subtitle: "Voldemort, 1997-2007",
  concept: "Code Splitting & Lazy Loading",
  icon: Ghost,
  colorClass: "text-emerald-500",
  bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500",
  component: () => import("@modules/code-splitting-with-horcruxes"),
  wrapperProps: {
    bgClass: "bg-slate-950",
    textClass: "text-slate-300",
    fontClass: "font-serif"
  },
  enabled: true
},

{
  id: "inception-dream-layers-as-components",
  path: "/inception-dream-layers-as-components",
  title: "Inception",
  subtitle: "Ariadne, The Architect, 2010",
  concept: "React Components",
  icon: Brain,
  colorClass: "text-cyan-500",
  bgClass: "bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-500",
  component: () => import("@modules/inception-dream-layers-as-components"),
  wrapperProps: {
    bgClass: "bg-slate-950",
    textClass: "text-slate-300",
    fontClass: "font-sans"
  },
  enabled: true
},


{
  id: "the-matrix-is-jsx",
  path: "/the-matrix-is-jsx",
  title: "The Matrix",
  subtitle: "Neo, The One, 1999",
  concept: "JSX (JavaScript XML)",
  icon: Code,
  colorClass: "text-emerald-500",
  bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500",
  component: () => import("@modules/the-matrix-is-jsx"),
  wrapperProps: {
    bgClass: "bg-slate-950",
    textClass: "text-slate-300",
    fontClass: "font-mono"
  },
  enabled: true
}

];

/**
 * UTILITY FUNCTIONS
 */

// Get all enabled modules
export const getEnabledModules = (): ModuleConfig[] => {
  return moduleRegistry.filter((module) => module.enabled);
};

// Get module by ID
export const getModuleById = (id: string): ModuleConfig | undefined => {
  return moduleRegistry.find((module) => module.id === id);
};

// Get module by path
export const getModuleByPath = (path: string): ModuleConfig | undefined => {
  return moduleRegistry.find((module) => module.path === path);
};

// Count enabled vs total modules
export const getModuleStats = () => {
  const total = moduleRegistry.length;
  const enabled = moduleRegistry.filter((m) => m.enabled).length;
  const disabled = total - enabled;

  return { total, enabled, disabled };
};
