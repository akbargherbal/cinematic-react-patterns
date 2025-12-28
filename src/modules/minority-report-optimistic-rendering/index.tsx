import { useState, useCallback, useEffect } from "react";
import {
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  Zap,
} from "lucide-react";

interface PendingAction {
  id: string;
  type: string;
  timestamp: number;
  status: "pending" | "confirmed" | "failed";
}

export default function MinorityReportOptimisticRendering() {
  const [chapter, setChapter] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Demo 1: Pre-Cog Vision Simulator
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
  const [likePending, setLikePending] = useState(false);
  const [likeError, setLikeError] = useState<string | null>(null);

  // Demo 2: Halo Tracker
  const [halos, setHalos] = useState<PendingAction[]>([]);
  const [haloCounter, setHaloCounter] = useState(0);

  // Demo 3: Minority Report Demo
  const [items, setItems] = useState([
    { id: "1", name: "Howard Marks" },
    { id: "2", name: "Sarah Marks" },
    { id: "3", name: "Leo Crow" },
  ]);
  const [deletePending, setDeletePending] = useState<Set<string>>(new Set());
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Demo 4: Anderton's Choice
  const [accountStatus, setAccountStatus] = useState<
    "active" | "deleting" | "deleted"
  >("active");
  const [deleteTimer, setDeleteTimer] = useState<number | null>(null);
  const [canCancel, setCanCancel] = useState(false);

  const chapters = [
    {
      title: "The Temple",
      subtitle: "Introduction to Optimistic Rendering",
      content: `In the year 2054, in a sterile white room beneath the Department of Pre-Crime, three human beings float in a shallow pool of milky fluid. They are called pre-cogs—Agatha, Arthur, and Dashiell—and they dream the future.

When a vision comes, the pre-cogs scream. Their bodies convulse. And in the control room above, technicians spring into action. They don't wait. They don't verify. They don't pause to consider whether the future they're seeing is certain.

They dispatch.

This is optimistic rendering at a dystopian scale. In React, when you implement an optimistic update, you're doing exactly what Pre-Crime does: you're rendering the future state of your application before the action that causes it has been confirmed.`,
    },
    {
      title: "The Halo Effect",
      subtitle: "The Anti-Pattern: Treating Predictions as Facts",
      content: `The wooden balls are beautiful in their simplicity. They drop from the ceiling like prophecies made solid, and when they land in Anderton's hands, they feel like truth.

The system doesn't hesitate. The moment the halo drops, the UI updates. No confirmation needed. No server response awaited. No "pending" flag displayed.

This is the anti-pattern that makes optimistic updates dangerous: treating predicted state as confirmed state. The system displays GUILTY, not "ARREST PENDING CONFIRMATION."`,
    },
    {
      title: "The Minority Report",
      subtitle: "When Predictions Fail",
      content: `Anderton is a fugitive from his own system. The very apparatus he built to prevent murders is now hunting him for a murder he hasn't committed. The optimistic render has become his reality, even though the underlying action hasn't occurred.

Sometimes the pre-cogs don't agree. Sometimes their visions diverge. Sometimes one of them sees a different future. This is called a minority report. And when it occurs, the system is supposed to acknowledge it, to flag the prediction as uncertain.

But Pre-Crime doesn't do that. It only records the majority vision. The minority report is filed away, hidden, ignored.`,
    },
    {
      title: "The Choice",
      subtitle: "Implementing Rollback Mechanisms",
      content: `John Anderton lowers the gun. In that single moment, the entire foundation of Pre-Crime collapses. The pre-cogs predicted he would kill Leo Crow. The system rendered that future. But he chooses not to pull the trigger.

The prediction was wrong. The optimistic render must be rolled back.

When you implement an optimistic update, you're making a bet. But sometimes you lose that bet. The server returns an error. The network times out. The optimistic update is rejected. And when that happens, you must reconcile.`,
    },
    {
      title: "The System Shutdown",
      subtitle: "Best Practices for Optimistic Updates",
      content: `In the end, Pre-Crime is dismantled. The pre-cogs are freed from their pool, released from the burden of rendering futures that may never come to pass.

But the lesson remains. Optimistic updates are not inherently wrong. They're a powerful tool for creating responsive, fluid user experiences. The key is understanding what they are: predictions, not guarantees.

Render the future, but mark it as tentative. Always preserve the previous state. Plan for the minority report. Reconcile with server truth. Know when NOT to be optimistic.`,
    },
  ];

  const currentChapter = chapters[chapter];

  // Handle chapter transitions with fade effect
  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, [chapter]);

  // Demo 1: Optimistic Like Handler
  const handleLike = useCallback(() => {
    if (likePending) return;

    const previousLiked = liked;
    const previousCount = likeCount;

    // Optimistic update
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    setLikePending(true);
    setLikeError(null);

    // Simulate server request
    setTimeout(() => {
      if (Math.random() > 0.2) {
        // Success
        setLikePending(false);
      } else {
        // Failure - rollback
        setLiked(previousLiked);
        setLikeCount(previousCount);
        setLikePending(false);
        setLikeError("Server rejected the update. Rolled back.");
        setTimeout(() => setLikeError(null), 3000);
      }
    }, 2000);
  }, [liked, likeCount, likePending]);

  // Demo 2: Halo Tracker
  const dropHalo = useCallback(() => {
    const newHalo: PendingAction = {
      id: `halo-${haloCounter}`,
      type: `Arrest-${haloCounter}`,
      timestamp: Date.now(),
      status: "pending",
    };

    setHalos((prev) => [...prev, newHalo]);
    setHaloCounter((c) => c + 1);

    // Simulate server response
    setTimeout(() => {
      setHalos((prev) =>
        prev.map((h) =>
          h.id === newHalo.id
            ? { ...h, status: Math.random() > 0.3 ? "confirmed" : "failed" }
            : h,
        ),
      );

      // Remove after animation
      setTimeout(() => {
        setHalos((prev) => prev.filter((h) => h.id !== newHalo.id));
      }, 2000);
    }, 2000);
  }, [haloCounter]);

  // Demo 3: Optimistic Delete with Rollback
  const handleDelete = useCallback(
    (id: string) => {
      if (deletePending.has(id)) return;

      const previousItems = items;

      // Optimistic update
      setItems(items.filter((item) => item.id !== id));
      setDeletePending((prev) => new Set(prev).add(id));
      setDeleteError(null);

      // Simulate server request
      setTimeout(() => {
        if (Math.random() > 0.3) {
          // Success
          setDeletePending((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
        } else {
          // Failure - rollback
          setItems(previousItems);
          setDeletePending((prev) => {
            const next = new Set(prev);
            next.delete(id);
            return next;
          });
          setDeleteError(
            "Minority report detected. Arrest cancelled. State rolled back.",
          );
          setTimeout(() => setDeleteError(null), 4000);
        }
      }, 2000);
    },
    [items, deletePending],
  );

  // Demo 4: Anderton's Choice - Cancellable Action
  const handleAccountDelete = useCallback(() => {
    if (accountStatus !== "active") return;

    setAccountStatus("deleting");
    setCanCancel(true);
    setDeleteTimer(5);

    const countdown = setInterval(() => {
      setDeleteTimer((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdown);
          setAccountStatus("deleted");
          setCanCancel(false);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-confirm after 5 seconds
    setTimeout(() => {
      setAccountStatus((current) =>
        current === "deleting" ? "deleted" : current,
      );
      setCanCancel(false);
    }, 5000);
  }, [accountStatus]);

  const handleCancelDelete = useCallback(() => {
    if (!canCancel) return;
    setAccountStatus("active");
    setCanCancel(false);
    setDeleteTimer(null);
  }, [canCancel]);

  const resetAccountDemo = useCallback(() => {
    setAccountStatus("active");
    setCanCancel(false);
    setDeleteTimer(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-300">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="mb-2 flex items-center gap-3">
            <Eye className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-slate-100 md:text-4xl">
              Minority Report
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Pre-Crime Division, 2054 • Optimistic Updates & Speculative
            Rendering
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-8 pb-32">
        <div
          className={`transition-opacity duration-300 ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Chapter Header */}
          <div className="mb-8">
            <h2 className="mb-2 text-3xl font-bold text-slate-100">
              {currentChapter.title}
            </h2>
            <p className="text-lg text-blue-400">{currentChapter.subtitle}</p>
          </div>

          {/* Chapter Content */}
          <div className="prose prose-invert prose-slate mb-12 max-w-none">
            <div className="whitespace-pre-line text-base leading-relaxed">
              {currentChapter.content}
            </div>
          </div>

          {/* Interactive Demonstrations */}
          {chapter === 0 && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
                <Zap className="h-5 w-5 text-blue-400" />
                Pre-Cog Vision Simulator
              </h3>
              <p className="mb-6 text-sm text-slate-400">
                Click the button to trigger an optimistic update. The UI renders
                the future state immediately, but the server might reject it
                (20% failure rate).
              </p>

              <div className="flex flex-col items-center gap-6">
                <div className="w-full max-w-md rounded-lg bg-slate-800/50 p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-slate-300">
                      Post by John Anderton
                    </span>
                    <span className="text-sm text-slate-500">
                      {likeCount} likes
                    </span>
                  </div>

                  <button
                    onClick={handleLike}
                    disabled={likePending}
                    className={`w-full rounded-lg px-6 py-3 font-semibold transition-all ${
                      liked
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    } ${
                      likePending ? "cursor-not-allowed opacity-50" : ""
                    } flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {likePending && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {liked ? "Unlike" : "Like"}
                    {likePending && (
                      <span className="text-xs">(pending...)</span>
                    )}
                  </button>

                  {likeError && (
                    <div className="mt-4 flex items-start gap-2 rounded border border-red-500/50 bg-red-900/30 p-3 text-sm text-red-400">
                      <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{likeError}</span>
                    </div>
                  )}
                </div>

                <div className="max-w-md text-center text-xs text-slate-500">
                  <strong>Optimistic Update:</strong> The UI changes immediately
                  (future state rendered). If the server rejects it, the state
                  rolls back to the previous value.
                </div>
              </div>
            </div>
          )}

          {chapter === 1 && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                Halo Data Tracker
              </h3>
              <p className="mb-6 text-sm text-slate-400">
                Each "halo" represents a pending optimistic update. Watch how
                the system treats them as confirmed immediately, with no
                indication of uncertainty.
              </p>

              <div className="flex flex-col items-center gap-6">
                <button
                  onClick={dropHalo}
                  className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-amber-600"
                >
                  Drop Halo (Dispatch Arrest)
                </button>

                <div className="min-h-[200px] w-full max-w-2xl rounded-lg border border-slate-700 bg-slate-800/30 p-4">
                  {halos.length === 0 ? (
                    <div className="py-12 text-center text-slate-500">
                      No active arrests. System idle.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {halos.map((halo) => (
                        <div
                          key={halo.id}
                          className={`rounded-lg border-2 p-4 transition-all ${
                            halo.status === "pending"
                              ? "animate-pulse border-amber-500/50 bg-amber-900/20"
                              : halo.status === "confirmed"
                                ? "border-emerald-500/50 bg-emerald-900/20"
                                : "border-red-500/50 bg-red-900/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-sm">
                              {halo.type}
                            </span>
                            {halo.status === "pending" && (
                              <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
                            )}
                            {halo.status === "confirmed" && (
                              <CheckCircle className="h-4 w-4 text-emerald-400" />
                            )}
                            {halo.status === "failed" && (
                              <XCircle className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                          <div className="mt-1 text-xs uppercase text-slate-500">
                            {halo.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="max-w-md text-center text-xs text-slate-500">
                  <strong>Anti-Pattern:</strong> The system shows arrests as
                  "GUILTY" immediately, with no indication that they're pending
                  server confirmation.
                </div>
              </div>
            </div>
          )}

          {chapter === 2 && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
                <XCircle className="h-5 w-5 text-red-400" />
                Minority Report: Rollback Demo
              </h3>
              <p className="mb-6 text-sm text-slate-400">
                Delete a suspect from the list. The UI updates optimistically,
                but there's a 30% chance the server will reject it (minority
                report), forcing a rollback.
              </p>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-4"
                  >
                    <span className="text-slate-300">{item.name}</span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletePending.has(item.id)}
                      className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-red-500/50"
                    >
                      {deletePending.has(item.id) && (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      )}
                      {deletePending.has(item.id) ? "Arresting..." : "Arrest"}
                    </button>
                  </div>
                ))}

                {deleteError && (
                  <div className="flex items-start gap-2 rounded border border-red-500/50 bg-red-900/30 p-4 text-sm text-red-400">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <span>{deleteError}</span>
                  </div>
                )}

                <div className="pt-4 text-center text-xs text-slate-500">
                  <strong>Proper Rollback:</strong> When the server rejects the
                  deletion, the item reappears in the list. The optimistic
                  update is reversed.
                </div>
              </div>
            </div>
          )}

          {chapter === 3 && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-100">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                Anderton's Choice: Cancellable Action
              </h3>
              <p className="mb-6 text-sm text-slate-400">
                Trigger a critical action. The UI shows the optimistic state
                immediately, but you have 5 seconds to cancel before the server
                confirms it.
              </p>

              <div className="flex flex-col items-center gap-6">
                <div className="w-full max-w-md rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                  <div className="mb-6 text-center">
                    <div className="mb-2 text-sm text-slate-400">
                      Account Status
                    </div>
                    <div
                      className={`text-2xl font-bold ${
                        accountStatus === "active"
                          ? "text-emerald-400"
                          : accountStatus === "deleting"
                            ? "text-amber-400"
                            : "text-red-400"
                      }`}
                    >
                      {accountStatus === "active" && "ACTIVE"}
                      {accountStatus === "deleting" && "DELETING..."}
                      {accountStatus === "deleted" && "DELETED"}
                    </div>
                  </div>

                  {accountStatus === "active" && (
                    <button
                      onClick={handleAccountDelete}
                      className="w-full rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-600"
                    >
                      Delete Account
                    </button>
                  )}

                  {accountStatus === "deleting" && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="mb-2 text-4xl font-bold text-amber-400">
                          {deleteTimer}
                        </div>
                        <div className="text-sm text-slate-400">
                          seconds until permanent deletion
                        </div>
                      </div>
                      <button
                        onClick={handleCancelDelete}
                        className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-600"
                      >
                        Cancel Deletion (Lower the Gun)
                      </button>
                    </div>
                  )}

                  {accountStatus === "deleted" && (
                    <div className="space-y-4">
                      <div className="text-center text-sm text-slate-400">
                        Account permanently deleted. The prediction came true.
                      </div>
                      <button
                        onClick={resetAccountDemo}
                        className="w-full rounded-lg bg-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-600"
                      >
                        Reset Demo
                      </button>
                    </div>
                  )}
                </div>

                <div className="max-w-md text-center text-xs text-slate-500">
                  <strong>Cancellation Window:</strong> Like Anderton choosing
                  not to pull the trigger, you can invalidate the optimistic
                  update before it's confirmed.
                </div>
              </div>
            </div>
          )}

          {chapter === 4 && (
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="mb-4 text-xl font-semibold text-slate-100">
                The Pre-Crime Principles
              </h3>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-900/20 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-emerald-400">
                      <CheckCircle className="h-4 w-4" />
                      Use Optimistic Updates For:
                    </h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                      <li>High-confidence predictions (like/unlike)</li>
                      <li>Reversible actions (add/remove from list)</li>
                      <li>Non-critical operations (UI preferences)</li>
                      <li>Actions with fast server responses</li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-red-500/30 bg-red-900/20 p-4">
                    <h4 className="mb-2 flex items-center gap-2 font-semibold text-red-400">
                      <XCircle className="h-4 w-4" />
                      Don't Use Them For:
                    </h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-slate-300">
                      <li>Financial transactions (payments)</li>
                      <li>Destructive operations (permanent deletes)</li>
                      <li>Security-critical actions (permissions)</li>
                      <li>Actions with low confidence of success</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-4">
                  <h4 className="mb-3 font-semibold text-blue-400">
                    Implementation Checklist:
                  </h4>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                      <span>
                        <strong>Mark as tentative:</strong> Use visual
                        indicators (opacity, loading states, pending flags)
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                      <span>
                        <strong>Preserve previous state:</strong> Store a
                        snapshot before applying the optimistic update
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                      <span>
                        <strong>Handle errors gracefully:</strong> Show
                        user-friendly messages when rollback occurs
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                      <span>
                        <strong>Reconcile with server:</strong> The server's
                        response is the source of truth
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                      <span>
                        <strong>Test failure scenarios:</strong> Ensure rollback
                        works correctly in all edge cases
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                  <h4 className="mb-3 font-mono text-sm font-semibold text-slate-100">
                    Code Pattern:
                  </h4>
                  <pre className="overflow-x-auto text-xs text-slate-300">
                    <code>{`// 1. Store previous state
const previousState = currentState;

// 2. Optimistically update UI
setState(newState);
setPending(true);

// 3. Send request
apiCall()
  .then(() => {
    // Success: remove pending flag
    setPending(false);
  })
  .catch(() => {
    // Failure: ROLL BACK
    setState(previousState);
    setPending(false);
    showError("Update failed");
  });`}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Chapter Navigation */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/95 p-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <button
            onClick={() => setChapter((c) => c - 1)}
            disabled={chapter === 0}
            className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
          >
            Previous
          </button>

          <div className="text-center">
            <div className="text-sm text-slate-400">
              Chapter {chapter + 1} of {chapters.length}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {currentChapter.title}
            </div>
          </div>

          <button
            onClick={() => setChapter((c) => c + 1)}
            disabled={chapter === chapters.length - 1}
            className="rounded-lg bg-blue-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
          >
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}
