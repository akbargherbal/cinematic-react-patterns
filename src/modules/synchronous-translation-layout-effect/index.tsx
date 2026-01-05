import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Sparkles, Wand, Shield, CheckCircle, Drama } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Chapter {
  title: string;
  content: string;
}

type DemoMode = 'useEffect' | 'useLayoutEffect';

const TooltipDemo: React.FC<{
  mode: DemoMode;
  trigger: number;
  onFlicker: () => void;
}> = ({ mode, trigger, onFlicker }) => {
  const targetRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, opacity: 0 });
  const [isFlickering, setIsFlickering] = useState(false);

  const useCorrectEffect = mode === 'useEffect' ? useEffect : useLayoutEffect;

  useCorrectEffect(() => {
    if (targetRef.current) {
      const { offsetTop, offsetLeft, offsetWidth } = targetRef.current;
      const newPos = {
        top: offsetTop - 50,
        left: offsetLeft + offsetWidth / 2 - 50,
        opacity: 1,
      };
      setPosition(newPos);

      if (mode === 'useEffect' && trigger > 0) {
        onFlicker();
        setIsFlickering(true);
        const timer = setTimeout(() => setIsFlickering(false), 100);
        return () => clearTimeout(timer);
      }
    }
  }, [trigger, mode, onFlicker]);

  const randomPosition = {
    top: `${(trigger % 5) * 15 + 10}%`,
    left: `${(trigger % 9) * 10 + 5}%`,
  };

  return (
    <div className="relative h-64 rounded-lg bg-slate-950/50 p-4 overflow-hidden border border-violet-500/20">
      <div
        ref={tooltipRef}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          opacity: position.opacity,
        }}
        className={`absolute z-10 flex h-24 w-24 items-center justify-center rounded-full bg-violet-500 text-center text-xs font-bold text-white shadow-lg shadow-violet-900/50 transition-all duration-200 ${isFlickering ? 'ring-4 ring-amber-400' : ''}`}
      >
        Bottom's<br/>Head
      </div>
      <button
        ref={targetRef}
        style={randomPosition}
        className="absolute h-12 w-12 rounded-full bg-amber-400/20 transition-all duration-300"
      >
        <Drama className="mx-auto h-6 w-6 text-amber-300" />
      </button>
      <div className="absolute bottom-2 right-2 text-xs text-slate-500">Stage Area</div>
    </div>
  );
};

export default function SynchronousTranslationLayoutEffectModule(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<DemoMode>('useEffect');
  const [trigger, setTrigger] = useState(0);
  const [flickerCount, setFlickerCount] = useState(0);
  const [parent] = useAutoAnimate();

  const chapters: Chapter[] = [
    {
      title: "The Instant of Translation",
      content: "Puck's magic transforms Bottom's head instantly—a complete change before anyone perceives it. `useLayoutEffect` works this way, running synchronously after DOM calculations but *before* the browser paints, ensuring a seamless visual update with no intermediate state."
    },
    {
      title: "The Flickering Vision",
      content: "A flawed spell makes Bottom's head flicker between forms, a jarring visual glitch. This is like `useEffect` for layout: the browser may paint an intermediate state before the effect runs, causing UI elements to visibly jump or resize."
    },
    {
      title: "A Deed Without a Name",
      content: "Puck's true spell is a synchronous command to reality. `useLayoutEffect` is this 'deed without a name'—it guarantees DOM mutations happen in the same cycle as render, preventing any paint of a 'before' state and ensuring visual consistency."
    },
    {
      title: "Perfect Horror, Final Face",
      content: "The Mechanicals' unified scream requires a final, stable image. `useEffect` can cause mistimed reactions to a flickering UI. `useLayoutEffect` ensures the user only ever perceives and reacts to the final, correct DOM state, creating a perfect experience."
    },
    {
      title: "Thou Art Translated",
      content: "Bottom accepts his new form as reality, unaware of the magic. A good layout effect is invisible to the user. The UI change is so seamlessly integrated into the paint cycle that it feels like it was always there, stable and ready for interaction."
    },
  ];

  const handleTrigger = () => {
    if (trigger > 50) { // Circuit breaker
        alert("Puck's magic is tiring! Resetting the scene.");
        handleReset();
        return;
    }
    setTrigger(c => c + 1);
  };

  const handleReset = () => {
    setTrigger(0);
    setFlickerCount(0);
  };

  const useEffectCode = `
import { useEffect, useState, useRef } from 'react';

function Tooltip() {
  const [position, setPosition] = useState({ top: 0 });
  const targetRef = useRef(null);

  // Runs AFTER browser paint
  useEffect(() => {
    if (targetRef.current) {
      const { offsetTop } = targetRef.current;
      setPosition({ top: offsetTop - 50 });
      //  Flicker! Browser painted old position first.
    }
  }, [/* dependencies */]);

  return <div style={position}>...</div>;
}`;

  const useLayoutEffectCode = `
import { useLayoutEffect, useState, useRef } from 'react';

function Tooltip() {
  const [position, setPosition] = useState({ top: 0 });
  const targetRef = useRef(null);

  // Runs BEFORE browser paint
  useLayoutEffect(() => {
    if (targetRef.current) {
      const { offsetTop } = targetRef.current;
      setPosition({ top: offsetTop - 50 });
      // No flicker! Position is correct before paint.
    }
  }, [/* dependencies */]);

  return <div style={position}>...</div>;
}`;

  const currentChapter = chapters[chapter];

  return (
    <div className="min-h-screen bg-slate-950 font-serif text-slate-300">
      <ModuleHeader
        icon={Sparkles}
        title="A Midsummer Night's Dream"
        subtitle="Puck & Bottom, c. 1595"
        concept="React Concept: useLayoutEffect Hook"
        themeColor="violet"
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <ModuleLayout
          sidebar={
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border border-violet-500/30 bg-slate-900/80 p-4">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Wand className="h-5 w-5 text-violet-400" />
                  Magical Controls
                </h3>
                <div className="space-y-4">
                  <p className="text-sm text-slate-400">Choose Puck's spell:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setDemoMode('useEffect')} className={`rounded-md px-3 py-2 text-sm font-semibold transition-all ${demoMode === 'useEffect' ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-800 hover:bg-slate-700'}`}>
                      Flickering Spell
                    </button>
                    <button onClick={() => setDemoMode('useLayoutEffect')} className={`rounded-md px-3 py-2 text-sm font-semibold transition-all ${demoMode === 'useLayoutEffect' ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-800 hover:bg-slate-700'}`}>
                      True Translation
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <button onClick={handleTrigger} className="rounded-md bg-emerald-600/80 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-600">Summon Puck</button>
                    <button onClick={handleReset} className="rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-600">Reset Scene</button>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-400">Triggers</div>
                      <div ref={parent} className="font-mono text-xl text-emerald-300">{trigger}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-400">Flickers</div>
                      <div ref={parent} className={`font-mono text-xl ${flickerCount > 0 ? 'text-amber-400' : 'text-emerald-300'}`}>{flickerCount}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                  <Shield className="h-5 w-5 text-violet-400" />
                  Metaphor Registry
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Bottom's Head</span><span className="font-medium">DOM Node</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Puck's Magic</span><span className="font-medium">Layout Effect</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">Flickering Spell</span><span className="font-medium">useEffect Flicker</span></div>
                  <div className="flex justify-between border-b border-slate-800 pb-2"><span className="text-slate-400">True Translation</span><span className="font-medium">useLayoutEffect</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Audience Reaction</span><span className="font-medium">Browser Paint</span></div>
                </div>
              </div>

              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-bold text-violet-300">
                  <CheckCircle className="h-4 w-4" />
                  Key Insight
                </h4>
                <p className="text-sm text-violet-200/80">
                  {chapter === 0 && "useLayoutEffect runs synchronously before the browser paints, preventing visual inconsistencies."}
                  {chapter === 1 && "Using useEffect for DOM measurements can cause a 'flicker' because the browser paints before your code runs."}
                  {chapter === 2 && "The key difference is timing: useLayoutEffect blocks browser paint, guaranteeing your changes are included in the next frame."}
                  {chapter === 3 && "Choose useLayoutEffect when you need to read from the DOM and then synchronously update it based on those readings."}
                  {chapter === 4 && "While powerful, useLayoutEffect is blocking. Prefer useEffect for most side effects to avoid delaying paint."}
                </p>
              </div>
              
              <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                <p className="text-sm italic text-slate-400">
                  "Bless thee, Bottom! bless thee! thou art translated."
                </p>
                <p className="mt-2 text-right text-xs text-slate-500">
                  — Peter Quince
                </p>
              </div>
            </div>
          }
        >
          <div className="prose prose-invert prose-lg mb-8 max-w-none">
            <h2 className="font-serif text-3xl font-bold text-violet-100">
              {currentChapter.title}
            </h2>
            <p className="text-slate-300">{currentChapter.content}</p>
          </div>

          <section className="mb-8 rounded-xl border border-violet-500/20 bg-slate-900/40 p-6">
            {chapter < 1 && (
              <p className="text-center text-slate-400">Proceed to the next chapter to begin the interactive demonstration.</p>
            )}
            {chapter >= 1 && (
              <TooltipDemo
                mode={demoMode}
                trigger={trigger}
                onFlicker={() => setFlickerCount(c => c + 1)}
              />
            )}
          </section>

          {chapter === 1 && (
            <CodeBlock
              code={useEffectCode}
              language="tsx"
              variant="error"
              title="// ❌ The Flickering Spell: useEffect for Layout"
            />
          )}
          {chapter === 2 && (
            <CodeBlock
              code={useLayoutEffectCode}
              language="tsx"
              variant="success"
              title="// ✅ The True Translation: useLayoutEffect"
            />
          )}
          {chapter === 3 && (
            <CodeComparison
              badCode={useEffectCode}
              goodCode={useLayoutEffectCode}
              language="tsx"
              themeColor="violet"
              badLabel="❌ useEffect (Asynchronous)"
              goodLabel="✅ useLayoutEffect (Synchronous)"
              badExplanation="Runs after paint. The browser shows the old position, then the effect runs, causing a re-render and a visible jump."
              goodExplanation="Runs before paint. The position is calculated and applied before the browser draws anything, resulting in a single, correct frame."
            />
          )}

          <ChapterNavigation
            currentChapter={chapter}
            totalChapters={chapters.length}
            onChapterChange={setChapter}
            themeColor="violet"
          />
        </ModuleLayout>
      </main>
    </div>
  );
}