import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ChapterNavigation - Standardized navigation for multi-chapter modules
 * 
 * Provides Previous/Next buttons, dot indicators, and chapter counter.
 * Supports keyboard navigation and proper accessibility.
 * 
 * @example Basic usage
 * ```tsx
 * const [chapter, setChapter] = useState(0);
 * const totalChapters = 5;
 * 
 * <ChapterNavigation
 *   currentChapter={chapter}
 *   totalChapters={totalChapters}
 *   onChapterChange={setChapter}
 *   themeColor="cyan"
 * />
 * ```
 * 
 * @example With custom labels
 * ```tsx
 * <ChapterNavigation
 *   currentChapter={chapter}
 *   totalChapters={totalChapters}
 *   onChapterChange={setChapter}
 *   themeColor="amber"
 *   previousLabel="← Back"
 *   nextLabel="Continue →"
 * />
 * ```
 */

interface ChapterNavigationProps {
  /** Current chapter index (0-based) */
  currentChapter: number;
  
  /** Total number of chapters */
  totalChapters: number;
  
  /** Callback when chapter changes (receives new chapter index) */
  onChapterChange: (chapter: number) => void;
  
  /** 
   * Theme color from the safelist: cyan, amber, purple, emerald, red, blue
   * Controls the active dot color and Next button styling
   */
  themeColor: 'cyan' | 'amber' | 'purple' | 'emerald' | 'red' | 'blue';
  
  /** Custom label for Previous button (default: "Previous") */
  previousLabel?: string;
  
  /** Custom label for Next button (default: "Next") */
  nextLabel?: string;
  
  /** Hide dot indicators on mobile (default: false) */
  hideMobileDots?: boolean;
  
  /** Optional additional CSS classes */
  className?: string;
}

export const ChapterNavigation: React.FC<ChapterNavigationProps> = ({
  currentChapter,
  totalChapters,
  onChapterChange,
  themeColor,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  hideMobileDots = false,
  className = '',
}) => {
  const isFirstChapter = currentChapter === 0;
  const isLastChapter = currentChapter === totalChapters - 1;

  const handlePrevious = () => {
    if (!isFirstChapter) {
      onChapterChange(currentChapter - 1);
    }
  };

  const handleNext = () => {
    if (!isLastChapter) {
      onChapterChange(currentChapter + 1);
    }
  };

  const handleDotClick = (index: number) => {
    onChapterChange(index);
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && !isFirstChapter) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && !isLastChapter) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentChapter, totalChapters]);

  return (
    <nav 
      className={`flex items-center justify-between mt-8 pt-6 border-t border-slate-800 ${className}`}
      aria-label="Chapter navigation"
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={isFirstChapter}
        className={`
          px-5 sm:px-6 py-3 
          bg-slate-800 border border-slate-700 text-slate-300 
          rounded-lg 
          hover:bg-slate-700 hover:border-slate-600 
          disabled:opacity-30 disabled:cursor-not-allowed 
          transition-all duration-200 
          flex items-center gap-2
        `}
        aria-label="Go to previous chapter"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="hidden sm:inline">{previousLabel}</span>
        <span className="sm:hidden">Prev</span>
      </button>

      {/* Center: Dot Indicators + Counter */}
      <div className="flex flex-col items-center gap-2">
        {/* Dot Indicators */}
        <div className={`flex items-center gap-2 ${hideMobileDots ? 'hidden md:flex' : 'flex'}`}>
          {Array.from({ length: totalChapters }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`
                rounded-full transition-all duration-200
                ${idx === currentChapter 
                  ? `bg-${themeColor}-500 w-6 h-2` 
                  : 'bg-slate-700 hover:bg-slate-600 w-2 h-2'
                }
              `}
              aria-label={`Go to chapter ${idx + 1}`}
              aria-current={idx === currentChapter ? 'true' : 'false'}
            />
          ))}
        </div>

        {/* Chapter Counter */}
        <span className="text-sm text-slate-400 font-mono">
          Chapter {currentChapter + 1} of {totalChapters}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={isLastChapter}
        className={`
          px-5 sm:px-6 py-3 
          bg-${themeColor}-900/40 border border-${themeColor}-700/50 text-${themeColor}-200 
          rounded-lg 
          hover:bg-${themeColor}-900/60 hover:border-${themeColor}-600 
          disabled:opacity-30 disabled:cursor-not-allowed 
          transition-all duration-200 
          flex items-center gap-2
        `}
        aria-label="Go to next chapter"
      >
        <span className="hidden sm:inline">{nextLabel}</span>
        <span className="sm:hidden">Next</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default ChapterNavigation;