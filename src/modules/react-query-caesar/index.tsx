import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Swords, Shield, CheckCircle, Quote, Zap, AlertCircle, RefreshCw, Users, FileText, Crown } from "lucide-react";
import { ModuleHeader } from "@/components/common/ModuleHeader";
import { ModuleLayout } from "@/components/common/ModuleLayout";
import { ChapterNavigation } from "@/components/common/ChapterNavigation";
import { CodeBlock } from "@/components/common/CodeBlock";
import { CodeComparison } from "@/components/common/CodeComparison";
import { useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock server state simulation
interface RomanState {
  ruler: string;
  isAlive: boolean;
  latestNews: string;
  successor: string | null;
}

const initialRome: RomanState = {
  ruler: "Julius Caesar",
  isAlive: true,
  latestNews: "All is well in Rome",
  successor: null,
};

// Create local QueryClient for module isolation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
      refetchOnWindowFocus: false,
    },
  },
});

// Mock API functions
const fetchRomanState = async (): Promise<RomanState> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return { ...initialRome };
};

const fetchWithAssassination = async (): Promise<RomanState> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    ruler: "Julius Caesar",
    isAlive: false,
    latestNews: "Caesar has been assassinated in the Senate!",
    successor: null,
  };
};

const fetchAntonysSpeech = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  return "Friends, Romans, countrymen, lend me your ears...";
};

const fetchCaesarsWill = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "To every Roman citizen, seventy-five drachmas...";
};

const fetchOctavius = async (): Promise<RomanState> => {
  await new Promise(resolve => setTimeout(resolve, 900));
  return {
    ruler: "Octavius",
    isAlive: true,
    latestNews: "The Republic is restored under new leadership",
    successor: "Mark Antony",
  };
};

interface Chapter {
  title: string;
  content: string;
}

export default function ReactQueryCaesar(): JSX.Element {
  const [chapter, setChapter] = useState<number>(0);
  const [demoMode, setDemoMode] = useState<'manual' | 'react-query'>('manual');
  const [manualFetchCount, setManualFetchCount] = useState<number>(0);
  const [serverState, setServerState] = useState<RomanState>(initialRome);
  const [isAssassinated, setIsAssassinated] = useState<boolean>(false);
  const [staleDataErrors, setStaleDataErrors] = useState<number>(0);
  const [cinnaErrorTriggered, setCinnaErrorTriggered] = useState<boolean>(false);
  const [activeRequests, setActiveRequests] = useState<number>(0);
  const requestRefs = useRef<Array<NodeJS.Timeout>>([]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      requestRefs.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  const chapters: Chapter[] = [
    {
      title: "The Ides of March: A Mutation",
      content: "Caesar's assassination is a server state mutation. The UI—citizens and senators—must refetch reality. Without React Query, every component triggers its own frantic network request, leading to chaos and conflicting data across Rome."
    },
    {
      title: "The Chaos of Manual Fetching",
      content: "Manual useEffect fetching creates duplicate requests, inconsistent caches, and stale data. Like citizens with different rumors, components show conflicting states. The Cinna error occurs when stale cache keys cause catastrophic UI failures."
    },
    {
      title: "The Declarative Oration",
      content: "React Query provides centralized cache management. Antony's speech demonstrates declarative data fetching: one source, consistent delivery, automatic cache updates. Components receive synchronized state without manual coordination or duplicate requests."
    },
    {
      title: "Cache Invalidation vs. Background Refetch",
      content: "Manual fetching fails at cache invalidation—stale data causes errors. React Query handles background refetching automatically. Caesar's will triggers seamless UI updates without jarring reloads, keeping all components synchronized with server truth."
    },
    {
      title: "A New Query for a New State",
      content: "With server state managed, new queries integrate seamlessly. Octavius's arrival demonstrates React Query's consistency: fresh data caches properly, components update uniformly, and the UI remains stable despite server mutations."
    }
  ];

  // Manual fetching simulation
  const simulateManualFetch = useCallback(() => {
    if (activeRequests >= 10) return; // Circuit breaker
    
    setActiveRequests(prev => prev + 1);
    setManualFetchCount(prev => prev + 1);
    
    const timer = setTimeout(() => {
      setActiveRequests(prev => prev - 1);
      // Simulate inconsistent data
      if (Math.random() > 0.7 && !cinnaErrorTriggered) {
        setStaleDataErrors(prev => prev + 1);
        setCinnaErrorTriggered(true);
      }
    }, 1000 + Math.random() * 1000);
    
    requestRefs.current.push(timer);
  }, [activeRequests, cinnaErrorTriggered]);

  // Trigger assassination (server mutation)
  const triggerAssassination = useCallback(() => {
    setIsAssassinated(true);
    setServerState(prev => ({
      ...prev,
      isAlive: false,
      latestNews: "CAESAR IS DEAD! The Republic is in chaos!"
    }));
    queryClient.invalidateQueries({ queryKey: ['romanState'] });
  }, []);

  // Reset demo
  const resetDemo = useCallback(() => {
    setIsAssassinated(false);
    setServerState(initialRome);
    setManualFetchCount(0);
    setStaleDataErrors(0);
    setCinnaErrorTriggered(false);
    setActiveRequests(0);
    requestRefs.current.forEach(timer => clearTimeout(timer));
    requestRefs.current = [];
    queryClient.clear();
  }, []);

  // Code examples
  const manualFetchingCode = `// ❌ Manual Fetching Chaos
function CitizenGroup() {
  const [news, setNews] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Each component fetches separately
    fetch('/api/roman-news')
      .then(res => res.json())
      .then(data => setNews(data.news))
      .finally(() => setLoading(false));
  }, []); // No cache invalidation

  return <div>{loading ? 'Asking around...' : news}</div>;
}

// Problem: Duplicate requests, no cache sharing,
// stale data, no background updates`;

  const reactQueryCode = `// ✅ React Query Solution
function RomanCitizen() {
  const { data, isLoading } = useQuery({
    queryKey: ['romanNews'],
    queryFn: fetchRomanNews,
    staleTime: 5000, // Auto-refresh
  });

  return (
    <div>{isLoading ? 'Listening...' : data.news}</div>
  );
}

// Benefits: Single source, automatic caching,
// background refetch, synchronized components`;

  const currentChapter = chapters[chapter];

  // React Query components
  function RomanStateQuery() {
    const { data, isLoading, isFetching } = useQuery({
      queryKey: ['romanState'],
      queryFn: isAssassinated ? fetchWithAssassination : fetchRomanState,
      enabled: demoMode === 'react-query',
    });

    return (
      <div className="rounded-lg bg-slate-800/50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-semibold">Roman State Query</span>
          <div className="flex items-center gap-2">
            {isLoading && <span className="text-xs text-amber-500">Loading...</span>}
            {isFetching && !isLoading && <span className="text-xs text-cyan-500">Refreshing</span>}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Ruler:</span>
            <span className={data?.isAlive ? "text-green-400" : "text-red-400"}>
              {data?.ruler} {data?.isAlive ? "👑" : "💀"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Status:</span>
            <span>{data?.latestNews}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-stone-950 font-serif text-slate-300">
        <ModuleHeader
          icon={Swords}
          title="The State of Rome"
          subtitle="Julius Caesar, 44 BC"
          concept="React Query: Server State Management"
          themeColor="red"
        />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <ModuleLayout
            sidebar={
              <div className="sticky top-24 space-y-6">
                {/* Interactive Controls */}
                <div className="rounded-xl border border-red-500/30 bg-slate-900/80 p-4">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                    <Zap className="h-5 w-5 text-red-400" />
                    Demo Controls
                  </h3>
                  
                  <div className="mb-4 flex gap-2">
                    <button
                      onClick={() => setDemoMode('manual')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'manual' ? 'bg-red-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      Manual Fetching
                    </button>
                    <button
                      onClick={() => setDemoMode('react-query')}
                      className={`flex-1 rounded px-3 py-2 text-sm transition-colors ${demoMode === 'react-query' ? 'bg-amber-600' : 'bg-slate-800 hover:bg-slate-700'}`}
                    >
                      React Query
                    </button>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={simulateManualFetch}
                      disabled={demoMode === 'react-query' || activeRequests >= 5}
                      className="w-full rounded bg-red-700/50 px-4 py-2 hover:bg-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {demoMode === 'manual' ? 'Simulate Manual Fetch' : 'React Query Active'}
                    </button>
                    
                    <button
                      onClick={triggerAssassination}
                      className="w-full rounded bg-red-900/50 px-4 py-2 hover:bg-red-800/50"
                    >
                      Trigger Server Mutation (Assassination)
                    </button>
                    
                    <button
                      onClick={resetDemo}
                      className="w-full rounded bg-slate-800 px-4 py-2 hover:bg-slate-700"
                    >
                      Reset All Demos
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-500">Manual Fetches</div>
                      <div className="font-mono text-xl">{manualFetchCount}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-500">Active Requests</div>
                      <div className={`font-mono text-xl ${activeRequests > 3 ? 'text-red-400' : 'text-slate-300'}`}>
                        {activeRequests}
                      </div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-500">Stale Errors</div>
                      <div className="font-mono text-xl text-red-400">{staleDataErrors}</div>
                    </div>
                    <div className="rounded bg-slate-800/50 p-3">
                      <div className="text-xs text-slate-500">Mode</div>
                      <div className={`font-mono text-sm ${demoMode === 'manual' ? 'text-red-400' : 'text-amber-400'}`}>
                        {demoMode === 'manual' ? 'CHAOS' : 'MANAGED'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Metaphor Registry */}
                <div className="rounded-xl border border-slate-700 bg-slate-900/50 p-5">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                    <Shield className="h-5 w-5 text-red-400" />
                    Metaphor Registry
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Political Reality of Rome</span>
                      <span className="text-sm font-medium text-amber-400">Server State</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Roman Citizens & Factions</span>
                      <span className="text-sm font-medium text-cyan-400">React Components</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Rumors & Hearsay</span>
                      <span className="text-sm font-medium text-red-400">Stale Cache</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Antony's Speech & Will</span>
                      <span className="text-sm font-medium text-green-400">Background Refetch</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">Manual News Gathering</span>
                      <span className="text-sm font-medium text-red-400">useEffect Fetching</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-sm text-slate-400">The Forum's Pulpit</span>
                      <span className="text-sm font-medium text-amber-400">QueryClient</span>
                    </div>
                    <div className="flex justify-between pb-2">
                      <span className="text-sm text-slate-400">Cinna the Poet Error</span>
                      <span className="text-sm font-medium text-red-400">Stale Cache Read</span>
                    </div>
                  </div>
                </div>

                {/* Key Insight Card */}
                <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-4">
                  <h4 className="mb-2 flex items-center gap-2 font-bold text-red-300">
                    <CheckCircle className="h-4 w-4" />
                    Key Insight
                  </h4>
                  <p className="text-sm text-red-200/80">
                    {chapter === 0 && "Server mutations (like Caesar's death) require coordinated refetching. React Query manages this automatically."}
                    {chapter === 1 && "Manual fetching creates duplicate requests, inconsistent state, and stale data errors—just like conflicting rumors in Rome."}
                    {chapter === 2 && "Declarative queries centralize data management. Components receive synchronized updates without manual coordination."}
                    {chapter === 3 && "Background refetching and smart cache invalidation prevent stale data while keeping UI responsive."}
                    {chapter === 4 && "Managed server state enables seamless integration of new data sources and consistent component rendering."}
                  </p>
                </div>

                {/* Quote Card */}
                <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                  <p className="text-sm italic text-slate-400">
                    {chapter === 0 && "\"Liberty! Freedom! Tyranny is dead!\""}
                    {chapter === 1 && "\"I am Cinna the poet! I am Cinna the poet!\""}
                    {chapter === 2 && "\"Friends, Romans, countrymen, lend me your ears.\""}
                    {chapter === 3 && "\"The will! The testament!\""}
                    {chapter === 4 && "\"Hence, and not a man depart.\""}
                  </p>
                  <p className="mt-2 text-right text-xs text-slate-500">
                    {chapter === 0 && "— Citizen of Rome"}
                    {chapter === 1 && "— Cinna the Poet"}
                    {chapter === 2 && "— Mark Antony"}
                    {chapter === 3 && "— Roman Citizen"}
                    {chapter === 4 && "— Mark Antony"}
                  </p>
                </div>
              </div>
            }
          >
            {/* Chapter Content */}
            <div className="prose prose-invert prose-lg mb-8 max-w-none">
              <h2 className="text-3xl font-bold text-red-100">{currentChapter.title}</h2>
              <div className="leading-relaxed text-slate-300">
                <p>{currentChapter.content}</p>
              </div>
            </div>

            {/* Interactive Demo Section */}
            <section className="mb-8 rounded-xl border border-red-500/20 bg-slate-900/40 p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-2 rounded bg-red-500"></div>
                <h3 className="text-xl font-bold text-red-200">
                  Interactive Demonstration
                </h3>
              </div>

              {chapter === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="rounded-lg bg-slate-800/50 p-4">
                        <div className="mb-2 font-semibold">Server State</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Current Ruler:</span>
                            <span className={serverState.isAlive ? "text-green-400" : "text-red-400"}>
                              {serverState.ruler} {serverState.isAlive ? "👑" : "💀"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Latest News:</span>
                            <span>{serverState.latestNews}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Successor:</span>
                            <span>{serverState.successor || "None declared"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg bg-red-900/30 p-4">
                        <div className="mb-3 font-semibold text-red-200">Mutation Impact</div>
                        <p className="text-sm text-red-300/80">
                          When server state changes (assassination), all components depending on Roman state must refetch.
                          Without React Query, each triggers separate requests, causing network duplication and UI inconsistency.
                        </p>
                      </div>
                    </div>

                    <div>
                      <CodeBlock
                        code={`// Server mutation triggers refetch needs
const assassinateCaesar = async () => {
  // This POST changes server state
  await api.post('/assassinate', { target: 'caesar' });
  
  // All queries for Roman state are now stale
  // Components must refetch to get new reality
  queryClient.invalidateQueries({ queryKey: ['romanState'] });
};`}
                        language="tsx"
                        variant="error"
                        title="// Server Mutation Event"
                        defaultExpanded={true}
                      />
                    </div>
                  </div>
                </div>
              )}

              {chapter === 1 && (
                <div className="space-y-6">
                  <CodeComparison
                    badCode={manualFetchingCode}
                    goodCode={reactQueryCode}
                    language="tsx"
                    themeColor="red"
                    badLabel="❌ Manual Fetching (Chaos)"
                    goodLabel="✅ React Query (Order)"
                    badExplanation="Duplicate requests, no cache sharing, stale data, inconsistent UI state across components"
                    goodExplanation="Centralized cache, automatic refetching, synchronized components, efficient network usage"
                  />
                  
                  <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <span className="font-semibold text-red-200">Cinna Error Simulation</span>
                    </div>
                    <p className="mb-3 text-sm text-red-300/80">
                      The mob acts on stale cache keyed by "name: Cinna" without verifying "id: conspirator". 
                      Manual fetching provides no cache invalidation after server mutations.
                    </p>
                    <div className={`p-3 rounded ${cinnaErrorTriggered ? 'bg-red-900/50 border border-red-500' : 'bg-slate-800/50'}`}>
                      <div className="flex justify-between items-center">
                        <span>Stale Cache Read Result:</span>
                        <span className={`font-mono ${cinnaErrorTriggered ? 'text-red-400 animate-pulse' : 'text-slate-400'}`}>
                          {cinnaErrorTriggered ? 'FATAL ERROR: Wrong Cinna!' : 'No error yet'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {chapter === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <RomanStateQuery />
                      
                      <div className="rounded-lg bg-amber-900/30 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Users className="h-5 w-5 text-amber-400" />
                          <span className="font-semibold text-amber-200">Declarative Query Benefits</span>
                        </div>
                        <ul className="text-sm text-amber-300/80 space-y-1">
                          <li>• Single source of truth for all components</li>
                          <li>• Automatic caching with configurable stale times</li>
                          <li>• Background refetching while UI remains responsive</li>
                          <li>• Synchronized updates across all subscribers</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <CodeBlock
                        code={`// Declarative data fetching with React Query
import { useQuery } from '@tanstack/react-query';

function RomanCitizen() {
  // Declare what data you need
  const { data, isLoading, error } = useQuery({
    queryKey: ['romanState'], // Unique cache key
    queryFn: fetchRomanState, // How to fetch
    staleTime: 5000, // When to refetch
    retry: 2, // Error handling
  });

  if (isLoading) return <div>Listening to news...</div>;
  if (error) return <div>Failed to hear news: {error.message}</div>;
  
  return (
    <div>
      <h3>Ruler: {data.ruler}</h3>
      <p>Status: {data.isAlive ? 'Alive' : 'Deceased'}</p>
    </div>
  );
}`}
                        language="tsx"
                        variant="success"
                        title="// Declarative Data Fetching"
                        defaultExpanded={true}
                      />
                    </div>
                  </div>
                </div>
              )}

              {chapter === 3 && (
                <div className="space-y-6">
                  <div className="rounded-lg bg-slate-800/50 p-4">
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="mb-3 font-semibold text-red-300">Stale Cache Failure</div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span className="text-sm">Cache key: <code className="bg-red-900/50 px-1">name: "Cinna"</code></span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span className="text-sm">Not invalidated after assassination</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span className="text-sm">No background refetch running</span>
                          </div>
                          <div className="mt-4 p-3 rounded bg-red-900/30 border border-red-700">
                            <span className="text-red-300">Result: Catastrophic UI error based on stale data</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="mb-3 font-semibold text-green-300">Background Refetch Success</div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Cache invalidated by new server data</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Automatic refetch triggered by mutation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Optimistic UI updates during fetch</span>
                          </div>
                          <div className="mt-4 p-3 rounded bg-green-900/30 border border-green-700">
                            <span className="text-green-300">Result: Seamless UI update with fresh data</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-700">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-amber-400" />
                        <span className="font-semibold">Caesar's Will: Background Refetch Demo</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">
                        Triggering a background refetch with React Query updates all subscribed components without blocking UI.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {chapter === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="rounded-lg bg-slate-800/50 p-4">
                        <div className="mb-3 flex items-center gap-2">
                          <Crown className="h-5 w-5 text-amber-400" />
                          <span className="font-semibold">New Query Integration</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Previous Cache:</span>
                            <span>Antony's speech, Caesar's will, riot status</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">New Query:</span>
                            <span className="text-amber-300">fetchOctavius()</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Cache Behavior:</span>
                            <span className="text-green-400">Fresh data, proper invalidation</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">UI Impact:</span>
                            <span className="text-green-400">Consistent across all components</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <CodeBlock
                        code={`// New data source integrates seamlessly
function NewLeadershipView() {
  const { data: romanState } = useQuery({
    queryKey: ['romanState'],
    queryFn: fetchRomanState,
  });

  const { data: successor } = useQuery({
    queryKey: ['successor'],
    queryFn: fetchOctavius,
    // Enabled only when needed
    enabled: !romanState?.isAlive,
  });

  return (
    <div>
      {successor ? (
        <div>
          <h3>New Ruler: {successor.ruler}</h3>
          <p>Successor: {successor.successor}</p>
        </div>
      ) : (
        <div>Current ruler: {romanState?.ruler}</div>
      )}
    </div>
  );
}`}
                        language="tsx"
                        variant="success"
                        title="// Seamless New Query Integration"
                        defaultExpanded={true}
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Navigation */}
            <ChapterNavigation
              currentChapter={chapter}
              totalChapters={chapters.length}
              onChapterChange={setChapter}
              themeColor="red"
            />
          </ModuleLayout>
        </main>
      </div>
    </QueryClientProvider>
  );
}