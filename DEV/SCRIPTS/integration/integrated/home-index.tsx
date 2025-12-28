import { Link } from "react-router-dom";
import {  FlaskConical, Zap, Book, Film, Clock, Sparkles, Flame, Layers, Camera, FileText, Activity, Mountain, Users, Heart, Anchor, Ghost, Database, Users, Brain, Eye, Eye, Heart, GitBranch, Eye, Users, Eye, AlertTriangle, Eye, GitBranch, RotateCcw, Copy, RotateCcw, Moon, Shield, Eye, Users, RefreshCw } from "lucide-react";

interface Module {
  path: string;
  title: string;
  subtitle: string;
  concept: string;
  icon: React.ComponentType<any>;
  colorClass: string;
  bgClass: string;
}

const modules: Module[] = [
  {
    path: "/dr-frank",
    title: "Frankenstein's Forms",
    subtitle: "Dr. Victor Frankenstein, 18--",
    concept: "Controlled vs Uncontrolled Components",
    icon: FlaskConical,
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500",
  },
  {
    path: "/fight-club",
    title: "Project Mayhem",
    subtitle: "I am Jack's Component",
    concept: "Strict Mode & Cleanup Functions",
    icon: Zap,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500",
  },
  {
    path: "/mean-girls",
    title: "The Burn Book",
    subtitle: "North Shore High, 2004",
    concept: "Context API & Prop Drilling",
    icon: Book,
    colorClass: "text-pink-500",
    bgClass: "bg-pink-950/20 border-pink-500/30 hover:border-pink-500",
  },

  {
    path: "/clockwork-orange-forced-rerenders",
    title: "A Clockwork Orange",
    subtitle: "Alex DeLarge, 1971",
    concept: "forceUpdate & Forced Re-renders",
    icon: Zap,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500",
  },

  {
    path: "/matrix-dependencies",
    title: "The Matrix Reloaded",
    subtitle: "Neo, The One, 2003",
    concept: "useEffect Dependencies",
    icon: Zap,
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500",
  },

  {
    path: "/looper-callback-timing",
    title: "Looper",
    subtitle: "Joe, Kansas, 2044",
    concept: "Callback Execution Timing",
    icon: Clock,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500",
  },,

  {
    path: "/mean-girls-context-api",
    title: "Mean Girls",
    subtitle: "North Shore High, 2004",
    concept: "Context API &amp; Prop Drilling",
    icon: Sparkles,
    colorClass: "text-pink-500",
    bgClass: "bg-pink-50 border-pink-300 hover:border-pink-500"
  },

  {
    path: "/frankenstein-controlled-components",
    title: "Frankenstein's Covenant",
    subtitle: "Victor Frankenstein, Geneva, 1818",
    concept: "Controlled vs Uncontrolled Components",
    icon: Zap,
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500"
  },

  {
    path: "/fight-club-strict-mode",
    title: "Fight Club",
    subtitle: "Tyler Durden, 1999",
    concept: "Strict Mode &amp; Effect Cleanup",
    icon: Flame,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500"
  },

  {
    path: "/matrix-useeffect-dependencies",
    title: "The Matrix",
    subtitle: "Neo, The Construct, 1999",
    concept: "useEffect Dependencies",
    icon: Zap,
    colorClass: "text-green-500",
    bgClass: "bg-green-950/20 border-green-500/30 hover:border-green-500"
  },

  {
    path: "/inception-component-composition",
    title: "Inception",
    subtitle: "Cobb's Team, 2010",
    concept: "Component Composition &amp; Children Props",
    icon: Layers,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
  },

  {
    path: "/memento-state-management",
    title: "Memento",
    subtitle: "Leonard Shelby, 2000",
    concept: "useState vs useRef",
    icon: Camera,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500"
  },

  {
    path: "/groundhog-day-rerendering",
    title: "Groundhog Day",
    subtitle: "Phil Connors, Punxsutawney, 1993",
    concept: "Re-rendering &amp; Pure Functions",
    icon: Clock,
    colorClass: "text-sky-500",
    bgClass: "bg-sky-950/20 border-sky-500/30 hover:border-sky-500"
  },

  {
    path: "/1984-state-mutation",
    title: "1984",
    subtitle: "Winston Smith, Ministry of Truth, 1949",
    concept: "Immutable State Updates",
    icon: FileText,
    colorClass: "text-blue-400",
    bgClass: "bg-slate-950/20 border-slate-700/30 hover:border-slate-500"
  },

  {
    path: "/back-to-future-prop-changes",
    title: "Back to the Future",
    subtitle: "Marty McFly, Hill Valley, 1985",
    concept: "Props Changes &amp; Component Updates",
    icon: Clock,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
  },

  {
    path: "/truman-show-component-lifecycle",
    title: "The Truman Show",
    subtitle: "Seahaven Island, 1998",
    concept: "useEffect &amp; Component Lifecycle",
    icon: Activity,
    colorClass: "text-sky-400",
    bgClass: "bg-sky-950/20 border-sky-500/30 hover:border-sky-500"
  },

  {
    path: "/lotr-prop-drilling-hell",
    title: "The Lord of the Rings",
    subtitle: "Frodo Baggins, Middle-earth, 2001-2003",
    concept: "Prop Drilling Problem",
    icon: Mountain,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500"
  },

  {
    path: "/oceans-eleven-coordinated-state",
    title: "Ocean's Eleven",
    subtitle: "Danny Ocean, Bellagio Vault, 2001",
    concept: "useReducer for Complex State",
    icon: Users,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500"
  },

  {
    path: "/jurassic-park-side-effects",
    title: "Jurassic Park",
    subtitle: "Isla Nublar, 1993",
    concept: "Side Effects &amp; useEffect Cleanup",
    icon: Zap,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500"
  },

  {
    path: "/eternal-sunshine-state-reset",
    title: "Eternal Sunshine of the Spotless Mind",
    subtitle: "Joel &amp; Clementine, 2004",
    concept: "State Reset &amp; Key Prop",
    icon: Heart,
    colorClass: "text-blue-500",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
  },

  {
    path: "/prestige-react-memo",
    title: "The Prestige",
    subtitle: "Robert Angier, Victorian London, 1899",
    concept: "React.memo &amp; Performance Optimization",
    icon: Zap,
    colorClass: "text-blue-400",
    bgClass: "bg-slate-950/20 border-slate-700 hover:border-blue-500"
  },

  {
    path: "/shutter-island-stale-closures",
    title: "Shutter Island",
    subtitle: "Teddy Daniels, Ashecliffe Hospital, 1954",
    concept: "Stale Closures in useEffect",
    icon: Anchor,
    colorClass: "text-blue-400",
    bgClass: "bg-slate-950/20 border-slate-700/30 hover:border-blue-500"
  },

  {
    path: "/sixth-sense-conditional-rendering",
    title: "The Sixth Sense",
    subtitle: "Malcolm Crowe, Child Psychologist, 1999",
    concept: "Conditional Rendering Logic",
    icon: Ghost,
    colorClass: "text-red-500",
    bgClass: "bg-slate-950/20 border-red-500/30 hover:border-red-500"
  },

  {
    path: "/interstellar-async-state",
    title: "Interstellar",
    subtitle: "Cooper, Gargantua, 2014",
    concept: "Asynchronous State &amp; Race Conditions",
    icon: Clock,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
  },

  {
    path: "/social-network-state-sync",
    title: "The Social Network",
    subtitle: "Mark Zuckerberg &amp; Eduardo Saverin, 2003-2005",
    concept: "State Synchronization Across Instances",
    icon: Database,
    colorClass: "text-blue-600",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
  },

  {
    path: "/parasite-component-injection",
    title: "Parasite",
    subtitle: "The Kim Family, 2019",
    concept: "Component Injection &amp; Children Props",
    icon: Users,
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500"
  },

  {
    path: "/arrival-usememo-expensive-calculations",
    title: "Arrival",
    subtitle: "Dr. Louise Banks, Montana, 2016",
    concept: "useMemo for Performance Optimization",
    icon: Brain,
    colorClass: "text-teal-400",
    bgClass: "bg-teal-950/20 border-teal-500/30 hover:border-teal-500"
  },

  {
    path: "/usual-suspects-dynamic-rendering",
    title: "The Usual Suspects",
    subtitle: "Verbal Kint, Interrogation Room, 1995",
    concept: "Dynamic Component Rendering",
    icon: Eye,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500"
  },

  {
    path: "/primer-state-time-travel",
    title: "Primer",
    subtitle: "Aaron &amp; Abe, 2004",
    concept: "Time-Travel Debugging &amp; State History",
    icon: Clock,
    colorClass: "text-blue-400",
    bgClass: "bg-slate-950/20 border-slate-700/30 hover:border-blue-400"
  },

  {
    path: "/get-out-component-hijacking",
    title: "Get Out",
    subtitle: "Chris Washington, The Armitage Estate, 2017",
    concept: "Ref Forwarding &amp; Imperative Control",
    icon: Eye,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500"
  },

  {
    path: "/her-is-custom-hooks",
    title: "Her",
    subtitle: "Theodore Twombly, 2013",
    concept: "Custom Hooks &amp; Reusable Logic",
    icon: Heart,
    colorClass: "text-rose-400",
    bgClass: "bg-rose-950/20 border-rose-500/30 hover:border-rose-500"
  },

  {
    path: "/donnie-darko-effect-dependencies",
    title: "Donnie Darko",
    subtitle: "Middlesex, Virginia • 1988",
    concept: "useEffect Dependencies",
    icon: Clock,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
  },

  {
    path: "/bandersnatch-state-branching",
    title: "Black Mirror: Bandersnatch",
    subtitle: "Stefan Butler, 1984",
    concept: "State Machines &amp; Branching Logic",
    icon: GitBranch,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500"
  },

  {
    path: "/tenet-reverse-data-flow",
    title: "Tenet",
    subtitle: "The Protagonist, Temporal Warfare, 2020",
    concept: "Bidirectional Data Flow Patterns",
    icon: Zap,
    colorClass: "text-blue-500",
    bgClass: "bg-slate-950/20 border-slate-500/30 hover:border-blue-500"
  },

  {
    path: "/rashomon-component-perspectives",
    title: "Rashomon",
    subtitle: "Akira Kurosawa, 1950",
    concept: "Same Data, Different Renders",
    icon: Eye,
    colorClass: "text-amber-500",
    bgClass: "bg-slate-950/20 border-slate-500/30 hover:border-amber-500"
  },

  {
    path: "/westworld-component-vs-instance",
    title: "Westworld",
    subtitle: "Dolores Abernathy, 2016",
    concept: "Component Definition vs Instance",
    icon: Users,
    colorClass: "text-amber-500",
    bgClass: "bg-slate-950/20 border-slate-500/30 hover:border-amber-500"
  },

  {
    path: "/blade-runner-component-identity",
    title: "Blade Runner",
    subtitle: "Deckard, Los Angeles, 2019",
    concept: "Component Keys &amp; Identity",
    icon: Eye,
    colorClass: "text-cyan-400",
    bgClass: "bg-slate-950/20 border-cyan-500/30 hover:border-cyan-500"
  },

  {
    path: "/the-thing-component-replacement",
    title: "The Thing",
    subtitle: "U.S. Outpost 31, Antarctica, 1982",
    concept: "Component Swapping &amp; Type Checking",
    icon: AlertTriangle,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500"
  },

  {
    path: "/stranger-things-portal-rendering",
    title: "Stranger Things",
    subtitle: "Hawkins, Indiana, 1983",
    concept: "React Portals",
    icon: Zap,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500"
  },

  {
    path: "/ex-machina-component-testing",
    title: "Ex Machina",
    subtitle: "Caleb Programmer, Nathan's Facility, 2014",
    concept: "Component Testing &amp; Behavior Verification",
    icon: Eye,
    colorClass: "text-cyan-400",
    bgClass: "bg-slate-950/20 border-cyan-500/30 hover:border-cyan-500"
  },

  {
    path: "/butterfly-effect-state-mutation",
    title: "The Butterfly Effect",
    subtitle: "Evan Treborn, 2004",
    concept: "Side Effects &amp; State Purity",
    icon: GitBranch,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500"
  },

  {
    path: "/source-code-remounting-loop",
    title: "Source Code",
    subtitle: "Colter Stevens, The Train, 2011",
    concept: "Component Remounting &amp; Cleanup",
    icon: RotateCcw,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
  },

  {
    path: "/multiplicity-component-cloning",
    title: "Multiplicity",
    subtitle: "Doug Kinney, Suburban America, 1996",
    concept: "Shallow vs Deep Copy",
    icon: Copy,
    colorClass: "text-blue-500",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
  },

  {
    path: "/edge-of-tomorrow-component-reset",
    title: "Edge of Tomorrow",
    subtitle: "Major Cage, 2014",
    concept: "State Reset &amp; Component Lifecycle",
    icon: RotateCcw,
    colorClass: "text-orange-500",
    bgClass: "bg-orange-950/20 border-orange-500/30 hover:border-orange-500"
  },

  {
    path: "/prestige-usememo-cost-analysis",
    title: "The Prestige",
    subtitle: "Angier &amp; Borden, Victorian London",
    concept: "useMemo Cost Analysis",
    icon: Zap,
    colorClass: "text-amber-500",
    bgClass: "bg-amber-950/20 border-amber-500/30 hover:border-amber-500"
  },

  {
    path: "/moon-singleton-pattern",
    title: "Moon",
    subtitle: "Sam Bell, Lunar Station Sarang, 2009",
    concept: "Singleton Components &amp; Global State",
    icon: Moon,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
  },

  {
    path: "/matrix-reloaded-system-exit",
    title: "The Matrix Reloaded",
    subtitle: "Neo's Choice, 2003",
    concept: "useEffect Cleanup &amp; Lifecycle",
    icon: Zap,
    colorClass: "text-green-500",
    bgClass: "bg-green-950/20 border-green-500/30 hover:border-green-500"
  },

  {
    path: "/village-scoped-context",
    title: "The Village",
    subtitle: "Ivy Walker, Covington, 2004",
    concept: "Context Scope &amp; Provider Boundaries",
    icon: Shield,
    colorClass: "text-amber-600",
    bgClass: "bg-amber-950/20 border-amber-600/30 hover:border-amber-600"
  },

  {
    path: "/twelve-monkeys-circular-dependencies",
    title: "Twelve Monkeys",
    subtitle: "James Cole, 1995",
    concept: "Circular Dependencies &amp; Infinite Loops",
    icon: Zap,
    colorClass: "text-amber-500",
    bgClass: "bg-slate-950/20 border-slate-500/30 hover:border-amber-500"
  },

  {
    path: "/minority-report-optimistic-rendering",
    title: "Minority Report",
    subtitle: "Pre-Crime Division, 2054",
    concept: "Optimistic Updates &amp; Speculative Rendering",
    icon: Eye,
    colorClass: "text-blue-400",
    bgClass: "bg-blue-950/20 border-blue-500/30 hover:border-blue-500"
  },

  {
    path: "/coherence-state-sync",
    title: "Coherence",
    subtitle: "Em, The Dinner Party, 2013",
    concept: "State Synchronization Across Component Instances",
    icon: Users,
    colorClass: "text-red-500",
    bgClass: "bg-red-950/20 border-red-500/30 hover:border-red-500"
  },

  {
    path: "/russian-doll-lifecycle-debugging",
    title: "Russian Doll",
    subtitle: "Nadia Vulvokov, 2019",
    concept: "Debugging Component Lifecycle Issues",
    icon: RefreshCw,
    colorClass: "text-orange-500",
    bgClass: "bg-orange-950/20 border-orange-500/30 hover:border-orange-500"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4 md:p-8">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4 bg-zinc-900/50 px-6 py-3 rounded-full border border-zinc-800">
            <Film className="text-emerald-500" size={24} />
            <span className="text-zinc-400 font-mono text-sm uppercase tracking-widest">
              Educational Series
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">
            Cinematic <span className="text-emerald-500">React</span> Patterns
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Master React fundamentals through the lens of iconic film
            narratives. Each module transforms complex concepts into memorable,
            story-driven experiences.
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => (
            <Link
              key={module.path}
              to={module.path}
              className={`group ${module.bgClass} border-2 p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl relative overflow-hidden`}
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <module.icon size={120} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <module.icon
                  className={`${module.colorClass} mb-4 group-hover:scale-110 transition-transform`}
                  size={48}
                />

                <h3 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">
                  {module.title}
                </h3>

                <p className="text-sm text-zinc-500 italic mb-4">
                  {module.subtitle}
                </p>

                <div className="pt-4 border-t border-zinc-800">
                  <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
                    Learn
                  </span>
                  <p className="text-sm text-zinc-400 mt-1">{module.concept}</p>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className={`${module.colorClass} text-2xl`}>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-zinc-600 text-sm font-mono uppercase tracking-[0.3em]">
            A World-Class Learning Experience
          </p>
        </div>
      </div>

      {/* Ambient Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.02]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500 rounded-full blur-[128px]" />
      </div>
    </div>
  );
}
