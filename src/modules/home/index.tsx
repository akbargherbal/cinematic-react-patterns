import { Link } from "react-router-dom";
import { FlaskConical, Zap, Book, Film, Clock } from "lucide-react";

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
  },
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
