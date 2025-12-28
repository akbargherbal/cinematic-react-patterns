import { useState, useMemo } from "react";
import {
  FileText,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Trash2,
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
}

export default function StateMutation1984() {
  const [chapter, setChapter] = useState(0);

  // Chapter 1 demo state
  const [recordChocolate, setRecordChocolate] = useState(30);
  const [telescreenValue, setTelescoreenValue] = useState(30);
  const [mutationRenderCount, setMutationRenderCount] = useState(0);

  // Chapter 3 demo state
  const [historyLog, setHistoryLog] = useState<
    Array<{ time: string; value: string }>
  >([{ time: "09:00", value: "Enemy: Eurasia" }]);

  // Chapter 4 demo state
  const [diaryEntries, setDiaryEntries] = useState<
    Array<{ id: number; date: string; content: string }>
  >([{ id: 1, date: "April 4th", content: "Chocolate ration: 30g" }]);

  const chapters: Chapter[] = useMemo(
    () => [
      {
        id: "intro",
        title: "The Records Department",
        content: `Winston Smith sits at his desk in the Records Department of the Ministry of Truth, a small man made smaller by the vast white walls and the ever-watching telescreen. Before him lies a pneumatic tube, and from it, a message arrives with a soft thud.

The directive is simple: Chocolate ration reduced from 30 grams to 20 grams. Correct all references.

But this is not a reduction. According to the records Winston must now alter, the chocolate ration has always been 20 grams. Yesterday's newspaper, which clearly stated 30 grams, must be corrected. The past must be rewritten.

Winston pulls the relevant documents from the archives. He locates the article: "Big Brother Increases Chocolate Ration to 30 Grams." With practiced efficiency, he begins his work. He doesn't create a new document. He doesn't file the old one away. He simply changes it.

The number 30 becomes 20. The word "increases" becomes "maintains." The document is the same document—same paper, same file number, same position in the archive. Only the content has changed.

This is how the Ministry of Truth operates. This is how history is managed.

In React terms, this is state mutation.

When you write state.chocolate = 20, you're doing exactly what Winston does. You're reaching into an existing object and changing its contents. The object itself—its reference, its identity, its place in memory—remains unchanged. You've mutated it in place.

And just like the Ministry's records, React cannot detect what you've done.`,
      },
      {
        id: "build",
        title: "The Mutation Method",
        content: `The Ministry of Truth's efficiency depends on a simple principle: alter the original, preserve the container.

Winston understands this instinctively now, after years in the Records Department. When a directive arrives to change the enemy from Eurasia to Eastasia, he doesn't create a new set of newspapers. He takes the existing newspapers and overwrites them. Same paper, different words.

This is the Party's genius. By mutating records directly, they leave no trace. There's no "before" and "after"—there's only the current version. The object in memory is the same object it always was. Its reference—its identity—is unchanged.

The telescreen in the corner still displays outdated information. Winston has corrected dozens of records today, but the screen hasn't updated once.

"The screen checks the record book," Tillotson explains. "If the book is the same book, it assumes nothing has changed. Why would it read every page?"

Winston nods slowly. The logic is sound. Checking every property of every object would be impossibly slow. The telescreen—like React's reconciliation algorithm—uses a shortcut: it checks if the reference has changed. If the object is the same object, it assumes the content is the same.

This is reference equality checking.`,
      },
      {
        id: "climax",
        title: "The Invisible Edit",
        content: `It's a Tuesday morning when Winston encounters the full horror of mutation.

He receives an urgent directive: Correct all references to the war. We have always been at war with Eastasia. But Winston distinctly remembers—just yesterday—correcting records to say they were at war with Eurasia. He's certain of it. He did the work himself.

He pulls up the records. They say Eastasia. They've always said Eastasia.

Winston's hands tremble slightly as he realizes what's happened. Someone else has mutated the records he already mutated. The changes have overwritten each other, silently, invisibly. There's no history, no trail, no way to know what the records said an hour ago, a day ago, a week ago.

This is the nightmare of mutation: changes that leave no trace.

The telescreen on the wall still shows "Eurasia" as the enemy. Winston has corrected the records to say "Eastasia," but the screen hasn't updated. He's mutated the state, but React hasn't re-rendered.

Winston stares at the telescreen, which stubbornly displays "Eurasia." He's changed the records. He's done his job. But the change is invisible to the system that matters.

This is the Party's ultimate control: they can change the past without anyone noticing. Not even the machines notice. The mutations are silent, undetectable, perfect.`,
      },
      {
        id: "resolution",
        title: "Winston's Journal",
        content: `That evening, in the alcove of his apartment where the telescreen cannot see, Winston opens his diary.

This diary is different from the records at the Ministry. When Winston writes in it, he doesn't erase the previous entry. He doesn't open yesterday's page and change the words. He turns to a new page. Every entry is separate, distinct, immutable.

April 4th, 1984: Today I corrected records about the chocolate ration.
April 5th, 1984: Today I corrected records about the war. We are at war with Eastasia.

Each entry is its own object. Each page is its own reference. The diary doesn't mutate—it accumulates. The past is preserved, not overwritten.

This is immutable state management.

Winston realizes, with sudden clarity, that his diary operates on the opposite principle from the Ministry's records. The Ministry mutates. The diary creates anew.

If Winston were to manage state the way he manages his diary, React would see every change. Each update would create a new object with a new reference. React's reconciliation would work perfectly.

The spread operator creates a new object. It copies all the properties from the old object into a new container. The content might be mostly the same, but the reference is different. React can detect this.

Mutation erases the past. Immutability preserves it.`,
      },
      {
        id: "summary",
        title: "Two Systems, One Truth",
        content: `Winston Smith lives between two systems of record-keeping, two philosophies of state management.

The Ministry of Truth: Mutation

The Party's records are mutable. When history changes, they don't create new documents—they alter the existing ones. The record book remains the same record book; only the words inside change.

This is efficient for the Party. No accumulation of evidence. No trail of changes. No way to prove what the past actually was.

But it's invisible to React. When you mutate state directly, React cannot detect the change. The object reference stays the same, so React assumes nothing has changed. The UI doesn't update.

Winston's Diary: Immutability

Winston's diary is immutable. Each entry is a new page. The past is never erased, only added to. Every change creates a new object, a new reference, a new piece of evidence.

This is what React requires. When you create a new object, React can detect the change by comparing references. The UI updates. Your changes become visible.

In React, the past must be preserved to create the future.

Every state update is a new page in the diary. Every render is a new truth. And unlike the Ministry's records, these truths cannot be silently erased.`,
      },
    ],
    [],
  );

  const currentChapter = chapters[chapter];

  const handleMutateRecord = () => {
    // Simulate mutation - changes value but not reference
    const tempRecord = { chocolate: recordChocolate };
    tempRecord.chocolate = 20;
    setRecordChocolate(tempRecord.chocolate);
    // Telescreen doesn't update because React didn't detect change
    setMutationRenderCount((prev) => prev); // No actual state change
  };

  const handleImmutableUpdate = () => {
    // Proper immutable update
    setRecordChocolate(20);
    setTelescoreenValue(20);
    setMutationRenderCount((prev) => prev + 1);
  };

  const handleAddMutatedHistory = () => {
    // Simulate mutation - no new reference
    const newEntry = { time: "10:00", value: "Enemy: Eastasia" };
    historyLog.push(newEntry); // Mutation!
    // This won't trigger re-render properly
  };

  const handleAddImmutableHistory = () => {
    // Proper immutable update
    setHistoryLog((prev) => [
      ...prev,
      { time: "10:00", value: "Enemy: Eastasia" },
    ]);
  };

  const handleAddDiaryEntry = () => {
    // Immutable array update
    const newEntry = {
      id: diaryEntries.length + 1,
      date: `April ${diaryEntries.length + 4}th`,
      content: `War status updated. Enemy: ${diaryEntries.length % 2 === 0 ? "Eastasia" : "Eurasia"}`,
    };
    setDiaryEntries((prev) => [...prev, newEntry]);
  };

  const handleRemoveDiaryEntry = (id: number) => {
    // Immutable array removal
    setDiaryEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const renderDemo = () => {
    switch (chapter) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold text-slate-200">
                  Ministry Record Book
                </h3>
              </div>

              <div className="mb-4 rounded border border-slate-700 bg-slate-950 p-4 font-mono text-sm">
                <div className="text-slate-400">// Current Record Object</div>
                <div className="text-slate-200">
                  const record = &#123; chocolate:{" "}
                  <span className="text-blue-400">{recordChocolate}</span>{" "}
                  &#125;;
                </div>
              </div>

              <div className="mb-4 rounded border border-blue-500/30 bg-blue-950/30 p-4">
                <div className="mb-2 text-sm text-blue-300">
                  Telescreen Display:
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  Chocolate Ration: {telescreenValue}g
                </div>
              </div>

              <button
                onClick={handleMutateRecord}
                className="mb-2 w-full rounded border border-red-700 bg-red-900/50 px-4 py-3 font-mono text-sm text-red-200 transition-colors hover:bg-red-900/70"
              >
                Mutate Record (record.chocolate = 20)
              </button>

              <button
                onClick={handleImmutableUpdate}
                className="w-full rounded border border-emerald-700 bg-emerald-900/50 px-4 py-3 font-mono text-sm text-emerald-200 transition-colors hover:bg-emerald-900/70"
              >
                Immutable Update (setRecord(&#123; ...record, chocolate: 20
                &#125;))
              </button>

              <div className="mt-4 rounded bg-slate-800 p-3 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <AlertCircle className="h-4 w-4" />
                  <span>Render Count: {mutationRenderCount}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-slate-200">
                Reference Equality Check
              </h3>

              <div className="space-y-4">
                <div className="rounded border border-red-700/50 bg-red-950/30 p-4">
                  <div className="mb-2 font-bold text-red-300">
                    ❌ Mutation (Invisible)
                  </div>
                  <pre className="overflow-x-auto font-mono text-sm text-slate-300">
                    {`const history = { enemy: "Eurasia" };
history.enemy = "Eastasia";
setState(history);

// React's check:
oldState === newState  // true
// "Same reference, no update"`}
                  </pre>
                </div>

                <div className="rounded border border-emerald-700/50 bg-emerald-950/30 p-4">
                  <div className="mb-2 font-bold text-emerald-300">
                    ✓ Immutability (Visible)
                  </div>
                  <pre className="overflow-x-auto font-mono text-sm text-slate-300">
                    {`const history = { enemy: "Eurasia" };
setState({ ...history, enemy: "Eastasia" });

// React's check:
oldState === newState  // false
// "Different reference, re-render!"`}
                  </pre>
                </div>
              </div>

              <div className="mt-4 rounded bg-slate-800 p-4">
                <div className="mb-2 text-sm text-slate-400">Key Insight:</div>
                <div className="text-slate-200">
                  React compares object references, not their contents. Mutation
                  keeps the same reference, making changes invisible.
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Trash2 className="h-6 w-6 text-red-400" />
                <h3 className="text-xl font-bold text-slate-200">
                  The Memory Hole
                </h3>
              </div>

              <div className="mb-4">
                <div className="mb-2 text-sm text-slate-400">History Log:</div>
                <div className="max-h-48 overflow-y-auto rounded border border-slate-700 bg-slate-950 p-4">
                  {historyLog.length === 0 ? (
                    <div className="text-sm italic text-slate-500">
                      No history recorded...
                    </div>
                  ) : (
                    historyLog.map((entry, idx) => (
                      <div
                        key={idx}
                        className="mb-1 font-mono text-sm text-slate-300"
                      >
                        [{entry.time}] {entry.value}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <button
                  onClick={handleAddMutatedHistory}
                  className="rounded border border-red-700 bg-red-900/50 px-4 py-3 text-sm text-red-200 transition-colors hover:bg-red-900/70"
                >
                  Mutate History (Invisible)
                </button>
                <button
                  onClick={handleAddImmutableHistory}
                  className="rounded border border-emerald-700 bg-emerald-900/50 px-4 py-3 text-sm text-emerald-200 transition-colors hover:bg-emerald-900/70"
                >
                  Add Immutable Entry
                </button>
              </div>

              <div className="mt-4 rounded bg-slate-800 p-3 text-sm text-slate-300">
                <AlertCircle className="mr-2 inline h-4 w-4" />
                Mutation erases the trail. Immutability preserves history.
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
              <div className="mb-4 flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-slate-200">
                  Winston's Diary
                </h3>
              </div>

              <div className="mb-4">
                <div className="mb-2 text-sm text-slate-400">
                  Diary Entries (Immutable):
                </div>
                <div className="max-h-64 space-y-2 overflow-y-auto rounded border border-slate-700 bg-slate-950 p-4">
                  {diaryEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-start justify-between rounded border border-slate-700 bg-slate-900 p-3"
                    >
                      <div className="flex-1">
                        <div className="mb-1 text-sm font-bold text-emerald-400">
                          {entry.date}
                        </div>
                        <div className="text-sm text-slate-300">
                          {entry.content}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveDiaryEntry(entry.id)}
                        className="ml-3 text-red-400 transition-colors hover:text-red-300"
                        aria-label="Remove entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleAddDiaryEntry}
                className="w-full rounded border border-emerald-700 bg-emerald-900/50 px-4 py-3 text-emerald-200 transition-colors hover:bg-emerald-900/70"
              >
                Add New Entry (Immutable)
              </button>

              <div className="mt-4 rounded border border-slate-700 bg-slate-950 p-4">
                <div className="mb-2 text-sm text-slate-400">Code Pattern:</div>
                <pre className="overflow-x-auto font-mono text-xs text-slate-300">
                  {`// Add entry (immutable)
setEntries([...entries, newEntry]);

// Remove entry (immutable)
setEntries(entries.filter(e => e.id !== id));

// Update entry (immutable)
setEntries(entries.map(e => 
  e.id === id ? { ...e, content: newContent } : e
));`}
                </pre>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-700 bg-slate-900 p-6">
              <h3 className="mb-4 text-xl font-bold text-slate-200">
                Common Immutable Patterns
              </h3>

              <div className="space-y-4">
                <div className="rounded border border-slate-700 bg-slate-950 p-4">
                  <div className="mb-2 font-bold text-emerald-400">Objects</div>
                  <pre className="overflow-x-auto font-mono text-sm text-slate-300">
                    {`// Update property
setState({ ...state, prop: newValue });

// Nested update
setState({
  ...state,
  nested: { ...state.nested, deep: value }
});`}
                  </pre>
                </div>

                <div className="rounded border border-slate-700 bg-slate-950 p-4">
                  <div className="mb-2 font-bold text-blue-400">Arrays</div>
                  <pre className="overflow-x-auto font-mono text-sm text-slate-300">
                    {`// Add item
setState([...state, newItem]);

// Remove item
setState(state.filter(item => item.id !== id));

// Update item
setState(state.map(item =>
  item.id === id ? { ...item, prop: value } : item
));`}
                  </pre>
                </div>

                <div className="rounded border border-emerald-700/50 bg-emerald-950/30 p-4">
                  <div className="mb-2 flex items-center gap-2 text-emerald-300">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-bold">Why Immutability Matters</span>
                  </div>
                  <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                    <li>React can detect changes via reference comparison</li>
                    <li>Fast performance (no deep equality checks)</li>
                    <li>Predictable state updates</li>
                    <li>Enables time-travel debugging</li>
                    <li>Preserves history for undo/redo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-mono text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="mb-2 flex items-center gap-4">
            <FileText className="h-8 w-8 text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
                1984
              </h1>
              <p className="text-sm text-slate-400 md:text-base">
                Winston Smith, Ministry of Truth, 1949
              </p>
            </div>
          </div>
          <div className="inline-block rounded border border-blue-700/50 bg-blue-950/50 px-3 py-1 text-sm text-blue-300">
            React Concept: Immutable State Updates
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 pb-32">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Narrative Column */}
          <article className="prose prose-invert prose-slate max-w-none">
            <h2 className="mb-4 border-b border-slate-800 pb-2 text-2xl font-bold text-slate-100">
              {currentChapter.title}
            </h2>
            <div className="whitespace-pre-line text-sm leading-relaxed text-slate-300 md:text-base">
              {currentChapter.content}
            </div>
          </article>

          {/* Interactive Demo Column */}
          <aside className="self-start lg:sticky lg:top-24">
            <div className="mb-4 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <h3 className="mb-2 text-lg font-bold text-slate-200">
                Interactive Demonstration
              </h3>
              <p className="text-sm text-slate-400">
                Explore the concept through hands-on examples
              </p>
            </div>
            {renderDemo()}
          </aside>
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-slate-800 bg-slate-900/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setChapter((c) => c - 1)}
              disabled={chapter === 0}
              className="rounded bg-slate-800 px-6 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-slate-800 md:text-base"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">
                Chapter {chapter + 1} of {chapters.length}
              </span>
              <div className="hidden gap-1 md:flex">
                {chapters.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChapter(idx)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      idx === chapter
                        ? "bg-blue-400"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                    aria-label={`Go to chapter ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => setChapter((c) => c + 1)}
              disabled={chapter === chapters.length - 1}
              className="rounded bg-slate-800 px-6 py-2 text-sm text-slate-200 transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-slate-800 md:text-base"
            >
              Next
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
