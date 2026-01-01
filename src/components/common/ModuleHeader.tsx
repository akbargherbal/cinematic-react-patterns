import React from 'react';

/**
 * ModuleHeader - Standardized sticky header for all fiction-based modules
 * 
 * Displays an icon, fiction work title, metadata (character • context • year),
 * and the React concept being taught. Supports dynamic theming with sticky behavior.
 * 
 * @example
 * ```tsx
 * import { Brain } from 'lucide-react';
 * 
 * <ModuleHeader
 *   icon={Brain}
 *   title="Minority Report"
 *   subtitle="PreCrime • John Anderton • 2002"
 *   concept="useReducer for Complex State Management"
 *   themeColor="cyan"
 * />
 * ```
 * 
 * @example From module registry
 * ```tsx
 * const module = getModuleById('use-reducer-minority-report');
 * 
 * <ModuleHeader
 *   icon={module.icon}
 *   title={module.title}
 *   subtitle={module.subtitle}
 *   concept={module.concept}
 *   themeColor="cyan"
 * />
 * ```
 */

interface ModuleHeaderProps {
  /** Lucide icon component (e.g., Brain, Code, Zap) */
  icon: React.ComponentType<any>;
  
  /** The title of the fiction work (e.g., "Minority Report") */
  title: string;
  
  /** Metadata with bullet separators (e.g., "PreCrime • John Anderton • 2002") */
  subtitle: string;
  
  /** The React concept being taught (e.g., "useReducer for Complex State Management") */
  concept: string;
  
  /** 
   * Theme color from the safelist: cyan, amber, purple, emerald, red, blue
   * Controls the icon color, border color, and concept text color
   */
  themeColor: 'cyan' | 'amber' | 'purple' | 'emerald' | 'red' | 'blue';
  
  /** Optional additional CSS classes for custom styling */
  className?: string;
}

export const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  concept,
  themeColor,
  className = '',
}) => {
  return (
    <header 
      className={`
        border-b border-${themeColor}-800/50 
        bg-slate-950/90 backdrop-blur-sm 
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
        
        {/* Top row: Icon + Title | Metadata */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          
          {/* Left side: Icon + Title */}
          <div className="flex items-center gap-3">
            <Icon className={`text-${themeColor}-400 w-8 h-8`} />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {title}
            </h1>
          </div>
          
          {/* Right side: Character • Context • Year */}
          <p className="text-sm md:text-base text-slate-400 font-medium">
            {subtitle}
          </p>
        </div>
        
        {/* Bottom row: React concept */}
        <p className={`text-base md:text-lg text-${themeColor}-400 font-medium mt-2`}>
          {concept}
        </p>
        
      </div>
    </header>
  );
};

export default ModuleHeader;