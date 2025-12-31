import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import { getEnabledModules, getModuleStats } from "../../config/moduleRegistry";

/**
 * Home Page Component
 *
 * 🔌 SWITCHBOARD INTEGRATION
 *
 * This component now dynamically displays modules from the central registry.
 * Only modules with `enabled: true` will appear here.
 *
 * To show/hide modules, edit src/config/moduleRegistry.ts
 */
export default function Home() {
  // Get only enabled modules from the registry
  const modules = getEnabledModules();

  // Get module statistics for admin info
  const stats = getModuleStats();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4 text-white md:p-8">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-zinc-800 bg-zinc-900/50 px-6 py-3">
            <Film className="text-emerald-500" size={24} />
            <span className="font-mono text-sm uppercase tracking-widest text-zinc-400">
              Educational Series
            </span>
          </div>

          <h1 className="mb-4 text-5xl font-black tracking-tighter md:text-7xl">
            Cinematic <span className="text-emerald-500">React</span> Patterns
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            Master React fundamentals through the lens of iconic film
            narratives. Each module transforms complex concepts into memorable,
            story-driven experiences.
          </p>

          {/* Module Statistics - Hidden in production, useful for development */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 inline-flex gap-4 font-mono text-xs text-zinc-600">
              <span>Total: {stats.total}</span>
              <span className="text-emerald-500">Enabled: {stats.enabled}</span>
              {stats.disabled > 0 && (
                <span className="text-red-500">Disabled: {stats.disabled}</span>
              )}
            </div>
          )}
        </div>

        {/* Module Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.id}
              to={module.path}
              className={`group ${module.bgClass} relative overflow-hidden rounded-2xl border-2 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              {/* Background Decoration */}
              <div className="absolute right-0 top-0 p-6 opacity-5 transition-opacity group-hover:opacity-10">
                <module.icon size={120} />
              </div>

              <div className="relative z-10">
                {/* SECTION 1: Icon (left) + Concept (right) */}
                <div className="mb-4 flex items-center gap-4">
                  {/* Icon (Left) */}
                  <module.icon
                    className={`${module.colorClass} transition-transform group-hover:scale-110 flex-shrink-0`}
                    size={32}
                  />
                  {/* Concept (Right) - The core learning topic */}
                  <p className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                    {module.concept}
                  </p>
                </div>

                {/* Separator */}
                <div className="border-t border-zinc-800 pt-4" />

                {/* SECTION 2: Fiction Work Details (Title + Subtitle) */}
                <div className="mt-4">
                  {/* Title (Largest text) */}
                  <h3 className="mb-1 text-3xl font-bold leading-snug transition-colors group-hover:text-white">
                    {module.title}
                  </h3>

                  {/* Subtitle/Metadata */}
                  <p className="text-sm italic text-zinc-500">
                    {module.subtitle}
                  </p>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                <span className={`${module.colorClass} text-2xl`}>→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-zinc-600">
            A World-Class Learning Experience
          </p>
        </div>
      </div>

      {/* Ambient Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.02]">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-emerald-500 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-red-500 blur-[128px]" />
      </div>
    </div>
  );
}