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

          {/* Module Statistics - Hidden in production, useful for development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 inline-flex gap-4 text-xs font-mono text-zinc-600">
              <span>Total: {stats.total}</span>
              <span className="text-emerald-500">Enabled: {stats.enabled}</span>
              {stats.disabled > 0 && (
                <span className="text-red-500">Disabled: {stats.disabled}</span>
              )}
            </div>
          )}
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => (
            <Link
              key={module.id}
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