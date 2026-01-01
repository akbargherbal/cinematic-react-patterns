import React from 'react';

/**
 * ModuleLayout - Standardized 8-4 grid layout for module pages
 *
 * Provides a responsive 12-column grid container:
 * - Left column (8 cols): Main content area
 * - Right column (4 cols): Sticky sidebar
 *
 * The layout is mobile-first:
 * - Mobile: Stacks vertically (content first, then sidebar)
 * - Desktop (lg+): 8-4 grid with sticky sidebar
 *
 * **Semantic HTML Note:**
 * This component renders a `<div>`, NOT a `<main>` tag.
 * The module designer is responsible for wrapping their content
 * in the appropriate semantic container (e.g., `<main>`).
 *
 * @example Basic usage with proper semantic structure
 * ```tsx
 * <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
 *   <ModuleLayout
 *     sidebar={
 *       <div className="space-y-6">
 *         <StatusCard />
 *         <MetricsCard />
 *       </div>
 *     }
 *   >
 *     <ChapterContent />
 *     <InteractiveDemo />
 *     <ChapterNavigation />
 *   </ModuleLayout>
 * </main>
 * ```
 *
 * @example Without sidebar
 * ```tsx
 * <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
 *   <ModuleLayout>
 *     <FullWidthContent />
 *   </ModuleLayout>
 * </main>
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

  /** Optional additional CSS classes for the container */
  className?: string;
}

export const ModuleLayout: React.FC<ModuleLayoutProps> = ({
  children,
  sidebar,
  className = '',
}) => {
  return (
    <div className={className}>
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
    </div>
  );
};

export default ModuleLayout;