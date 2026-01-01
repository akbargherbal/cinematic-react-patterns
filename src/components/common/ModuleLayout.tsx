import React from 'react';

/**
 * ModuleLayout - Standardized 8-4 grid layout for module pages
 * 
 * Provides the main container with a responsive 12-column grid:
 * - Left column (8 cols): Main content area
 * - Right column (4 cols): Sticky sidebar
 * 
 * The layout is mobile-first:
 * - Mobile: Stacks vertically (content first, then sidebar)
 * - Desktop (lg+): 8-4 grid with sticky sidebar
 * 
 * @example Basic usage
 * ```tsx
 * <ModuleLayout
 *   sidebar={
 *     <div className="space-y-6">
 *       <StatusCard />
 *       <MetricsCard />
 *     </div>
 *   }
 * >
 *   <ChapterContent />
 *   <InteractiveDemo />
 *   <ChapterNavigation />
 * </ModuleLayout>
 * ```
 * 
 * @example Without sidebar
 * ```tsx
 * <ModuleLayout>
 *   <FullWidthContent />
 * </ModuleLayout>
 * ```
 */

interface ModuleLayoutProps {
  /** Main content area (left column, 8 cols on desktop) */
  children: React.ReactNode;
  
  /** 
   * Optional sidebar content (right column, 4 cols on desktop)
   * If not provided, content takes full width
   */
  sidebar?: React.ReactNode;
  
  /** Optional additional CSS classes for the main container */
  className?: string;
}

export const ModuleLayout: React.FC<ModuleLayoutProps> = ({
  children,
  sidebar,
  className = '',
}) => {
  return (
    <main className={`max-w-7xl mx-auto px-4 sm:px-6 py-8 ${className}`}>
      <div className={sidebar ? 'lg:grid lg:grid-cols-12 lg:gap-8' : ''}>
        
        {/* Main Content Column (8 cols on desktop, full width on mobile) */}
        <div className={sidebar ? 'lg:col-span-8' : ''}>
          {children}
        </div>
        
        {/* Sidebar Column (4 cols on desktop, stacks below on mobile) */}
        {sidebar && (
          <div className="lg:col-span-4 lg:mt-0 mt-8">
            <div className="sticky top-24 space-y-6">
              {sidebar}
            </div>
          </div>
        )}
        
      </div>
    </main>
  );
};

export default ModuleLayout;