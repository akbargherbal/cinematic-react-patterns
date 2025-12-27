import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  AlertTriangle, 
  Terminal, 
  Zap, 
  RotateCcw, 
  ShoppingCart, 
  ShieldAlert, 
  ChevronRight,
  MessageSquare,
  Ghost,
  Trash2
} from 'lucide-react';

// Initialize Gemini API
const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

// --- Components ---

const Header = () => (
  <header className="border-b border-red-900/50 bg-black p-6 sticky top-0 z-50">
    <div className="max-w-5xl mx-auto flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-black tracking-tighter text-red-600 uppercase italic">
          Project Mayhem <span className="text-white">Strict Mode</span>
        </h1>
        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">
          I am Jack's mounting anxiety
        </p>
      </div>
      <div className="flex gap-4">
        <div className="h-2 w-24 bg-red-900/30 overflow-hidden rounded-full">
          <div className="h-full bg-red-600 animate-pulse w-3/4"></div>
        </div>
      </div>
    </div>
  </header>
);

const NetworkLog = ({ logs, clearLogs }: { logs: any[], clearLogs: () => void }) => (
  <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden flex flex-col h-full shadow-inner">
    <div className="bg-zinc-800 p-2 flex justify-between items-center border-b border-zinc-700">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
        <Terminal size={14} /> NETWORK LOGS
      </div>
      <button 
        onClick={clearLogs}
        className="text-zinc-500 hover:text-white transition-colors p-1"
        title="Clear Logs"
      >
        <Trash2 size={14} />
      </button>
    </div>
    <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2 custom-scrollbar">
      {logs.length === 0 && <div className="text-zinc-600 italic text-center py-8">No activity detected...</div>}
      {logs.map((log, i) => (
        <div key={i} className={`p-2 rounded border-l-2 animate-in fade-in slide-in-from-right-2 duration-300 ${log.type === 'error' ? 'bg-red-900/10 border-red-600' : log.type === 'cancelled' ? 'bg-zinc-800 border-zinc-500 text-zinc-500 italic' : 'bg-green-900/10 border-green-600'}`}>
          <div className="flex justify-between font-bold">
            <span className="truncate mr-2">{log.method} {log.url}</span>
            <span className={log.type === 'error' ? 'text-red-500' : 'text-zinc-400'}>{log.status}</span>
          </div>
          <div className="text-[10px] mt-1 opacity-70 truncate">{log.timestamp}</div>
        </div>
      ))}
    </div>
  </div>
);

const TylerChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'tyler', text: string }[]>([
    { role: 'tyler', text: "The first rule of Strict Mode is: You do not question the double mount." }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMsg,
        config: {
          systemInstruction: "You are Tyler Durden from Fight Club, but you are also a world-class senior React engineer. You use gritty metaphors about consumerism and chaos to explain React concepts, specifically why StrictMode double-mounts components in development to find bugs like side-effect leaks. Keep responses punchy, dark, and educational. Don't mention you are an AI. You are Tyler.",
        }
      });
      
      setMessages(prev => [...prev, { role: 'tyler', text: response.text || "I am Jack's lack of response." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'tyler', text: "The system is broken, Jack. Like everything else." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 border border-red-900/30 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[400px]">
      <div className="p-3 bg-red-900/20 border-b border-red-900/30 flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest text-red-500 flex items-center gap-2 uppercase">
          <MessageSquare size={14} /> Tyler Durden Mentor
        </span>
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-lg text-sm ${m.role === 'user' ? 'bg-zinc-800 text-white border border-zinc-700' : 'bg-red-950/40 border border-red-900/50 text-red-100 italic font-medium'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-zinc-600 text-xs animate-pulse italic">Tyler is formatting the chaos...</div>}
      </div>
      <div className="p-3 border-t border-zinc-800 flex gap-2 bg-black/40">
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="I am Jack's question..."
          className="flex-1 bg-black border border-zinc-700 rounded px-3 py-2 text-sm focus:outline-none focus:border-red-600 transition-colors"
        />
        <button 
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:bg-zinc-800 text-white px-4 py-2 rounded text-xs font-bold transition-all uppercase tracking-widest active:scale-95"
        >
          Ask
        </button>
      </div>
    </div>
  );
};

const StrictModeVisualizer = () => {
  const [active, setActive] = useState(false);
  const [isMounting, setIsMounting] = useState(false);

  const trigger = () => {
    setIsMounting(true);
    setTimeout(() => setIsMounting(false), 2000);
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 relative overflow-hidden group shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-zinc-200 uppercase tracking-tighter text-sm">Lifecycle Simulation</h3>
        <button 
          onClick={() => setActive(!active)}
          className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${active ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'bg-zinc-800 text-zinc-500'}`}
        >
          {active ? 'STRICT MODE: ON' : 'STRICT MODE: OFF'}
        </button>
      </div>

      <div className="flex justify-center items-center h-32 gap-8">
        <div className={`transition-all duration-500 transform ${isMounting ? 'scale-110 opacity-100' : 'scale-90 opacity-20'} flex flex-col items-center`}>
          <div className={`h-20 w-20 rounded-2xl border-2 flex items-center justify-center transition-colors duration-500 ${active ? 'border-red-500 bg-red-500/10' : 'border-blue-500 bg-blue-500/10'}`}>
            <Ghost className={active ? 'text-red-500' : 'text-blue-500'} size={32} />
          </div>
          <span className="text-[10px] mt-2 font-black tracking-widest text-zinc-500 uppercase">Mount</span>
        </div>

        {active && (
           <div className={`transition-all duration-500 delay-300 transform ${isMounting ? 'scale-110 opacity-100' : 'scale-90 opacity-0'} flex flex-col items-center`}>
           <div className="h-20 w-20 rounded-2xl border-2 border-dashed border-red-500/50 flex items-center justify-center">
             <RotateCcw className="text-red-500 animate-spin-slow" size={32} />
           </div>
           <span className="text-[10px] mt-2 font-black tracking-widest text-red-500 uppercase">Re-Mount</span>
         </div>
        )}
      </div>

      <button 
        onClick={trigger}
        disabled={isMounting}
        className="w-full mt-6 bg-zinc-800 hover:bg-red-600 hover:text-white disabled:opacity-50 py-4 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-md active:translate-y-0.5"
      >
        {isMounting ? 'Simulating...' : 'Trigger Component Lifecycle'}
      </button>

      {active && isMounting && (
        <div className="absolute top-2 right-2 flex items-center gap-1 text-[8px] text-red-500 font-bold bg-red-950/80 px-2 py-1 rounded-full border border-red-500/30 animate-pulse">
          <ShieldAlert size={10} /> DETECTING IMPURITIES
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function FightClub() {
  const [tab, setTab] = useState<'problem' | 'solution' | 'deepdive'>('problem');
  const [strictMode, setStrictMode] = useState(true);
  const [logs, setLogs] = useState<any[]>([]);
  const [moneyWasted, setMoneyWasted] = useState(0);
  const [hasCleanup, setHasCleanup] = useState(false);

  const addLog = (method: string, url: string, status: string, type: 'success' | 'error' | 'cancelled' = 'success') => {
    setLogs(prev => [{
      method,
      url,
      status,
      type,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev].slice(0, 50));
  };

  const handleOrder = () => {
    const simulateRequest = (id: number) => {
      addLog('POST', `/api/soap/order?id=${id}`, 'PENDING...');
      
      const timeout = setTimeout(() => {
        addLog('POST', `/api/soap/order?id=${id}`, '201 CREATED');
        setMoneyWasted(prev => prev + 4.99);
      }, 1500);

      return () => {
        clearTimeout(timeout);
        addLog('POST', `/api/soap/order?id=${id}`, 'ABORTED', 'cancelled');
      };
    };

    const cleanup1 = simulateRequest(1);
    
    if (strictMode) {
      // Simulate the immediate re-mount that happens in Strict Mode
      setTimeout(() => {
        if (hasCleanup) {
          cleanup1();
        }
        simulateRequest(2);
      }, 50);
    }
  };

  const resetSim = () => {
    setLogs([]);
    setMoneyWasted(0);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-red-600/50 pb-12">
      <Header />
      
      <main className="max-w-5xl mx-auto p-6 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Controls & Simulation */}
        <div className="lg:col-span-7 space-y-10">
          
          <section className="space-y-6">
            <div className="flex gap-6 border-b border-zinc-800 pb-px">
              <button 
                onClick={() => setTab('problem')}
                className={`text-xs font-black uppercase tracking-[0.2em] pb-3 border-b-2 transition-all duration-300 ${tab === 'problem' ? 'text-red-600 border-red-600' : 'text-zinc-500 border-transparent hover:text-zinc-300'}`}
              >
                1. The Glitch
              </button>
              <button 
                onClick={() => setTab('solution')}
                className={`text-xs font-black uppercase tracking-[0.2em] pb-3 border-b-2 transition-all duration-300 ${tab === 'solution' ? 'text-red-600 border-red-600' : 'text-zinc-500 border-transparent hover:text-zinc-300'}`}
              >
                2. The Cure
              </button>
            </div>

            {tab === 'problem' && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="prose prose-invert mb-8">
                  <h2 className="text-3xl font-black italic tracking-tighter text-white mb-3 uppercase leading-none">I am Jack's Duplicate Request</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
                    React's <span className="text-white font-bold">Strict Mode</span> intentionally <span className="text-red-500 font-bold underline decoration-2 underline-offset-4">double-invokes</span> components. 
                    Without a cleanup function, your side effects become ghosts that drain your resources.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between shadow-lg">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Company Waste</span>
                      <div className="text-4xl font-black text-red-600 mt-1 tabular-nums">${moneyWasted.toFixed(2)}</div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 font-medium">
                      <AlertTriangle size={14} className="text-amber-500" />
                      {moneyWasted > 5 ? 'System hemorrhaging cash.' : 'Monitoring leakage...'}
                    </div>
                  </div>
                  <div className="bg-zinc-900/80 border border-zinc-800 p-5 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-black">Configuration</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between cursor-pointer group" onClick={() => setStrictMode(!strictMode)}>
                        <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">Strict Mode Emulation</span>
                        <div className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 ${strictMode ? 'bg-red-600' : 'bg-zinc-700'}`}>
                           <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-300 transform ${strictMode ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between cursor-pointer group" onClick={() => setHasCleanup(!hasCleanup)}>
                        <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">Implement Cleanup Fix</span>
                        <div className={`w-10 h-5 rounded-full p-1 transition-colors duration-300 ${hasCleanup ? 'bg-green-600' : 'bg-zinc-700'}`}>
                           <div className={`w-3 h-3 bg-white rounded-full transition-transform duration-300 transform ${hasCleanup ? 'translate-x-5' : 'translate-x-0'}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={handleOrder}
                    className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all text-white py-5 rounded-xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-red-950/20"
                  >
                    <ShoppingCart size={20} /> Order Soap Bar
                  </button>
                  <button 
                    onClick={resetSim}
                    className="w-full bg-transparent hover:bg-zinc-900 text-zinc-600 hover:text-zinc-400 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-zinc-800/50"
                  >
                    <RotateCcw size={14} /> Reset Simulation Data
                  </button>
                </div>
              </div>
            )}

            {tab === 'solution' && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-8">
                <div className="prose prose-invert">
                  <h2 className="text-3xl font-black italic tracking-tighter text-white mb-3 uppercase leading-none">The Chemical Burn</h2>
                  <p className="text-zinc-400 text-sm max-w-lg">
                    This is your life, and it's ending one unhandled effect at a time. 
                    React 18+ runs effects twice in dev to ensure you've handled the <span className="text-green-500 font-bold uppercase tracking-widest">Cleanup</span> scenario.
                  </p>
                </div>

                <div className="bg-zinc-900 rounded-xl p-6 font-mono text-[11px] leading-relaxed border border-zinc-800 shadow-xl overflow-x-auto">
                  <div className="text-zinc-500 mb-4 select-none">// Use AbortController for fetch cleanup</div>
                  <div className="text-zinc-300 whitespace-pre">
<span className="text-purple-400">useEffect</span>(() =&gt; &#123;
  <span className="text-blue-400">const</span> controller = <span className="text-blue-400">new</span> AbortController();

  <span className="text-zinc-500">// Send request with signal</span>
  fetch(<span className="text-amber-300">'/api/soap'</span>, &#123; signal: controller.signal &#125;);

  <span className="text-red-500 font-black">return</span> () =&gt; &#123;
    <span className="text-zinc-500 font-bold italic">// THE CURE: Abort on unmount</span>
    controller.abort();
  &#125;;
&#125;, []);
                  </div>
                </div>

                <div className="bg-red-950/20 border border-red-900/40 p-6 rounded-xl flex items-start gap-5 shadow-inner">
                  <div className="p-3 bg-red-900/30 rounded-lg shrink-0">
                    <Zap className="text-red-500" size={24} />
                  </div>
                  <div className="text-sm text-red-100">
                    <p className="font-black uppercase tracking-widest mb-2 text-xs">Why the double mount?</p>
                    <p className="opacity-70 leading-relaxed text-xs">It highlights missing cleanup logic by simulating a component being destroyed and immediately recreated. If your app breaks under these conditions, it will break in production during fast navigation or state resets.</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          <section>
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4 pl-1">Diagnostic Tools</h4>
             <StrictModeVisualizer />
          </section>

        </div>

        {/* Right Column: Narrative & Logs */}
        <div className="lg:col-span-5 space-y-8">
          <section className="h-[450px]">
             <NetworkLog logs={logs} clearLogs={() => setLogs([])} />
          </section>

          <section>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4 pl-1">The Narrative</h4>
            <TylerChat />
          </section>

          <div className="bg-zinc-900/30 p-5 rounded-xl border border-zinc-800/50 text-[11px] text-zinc-500 italic text-center leading-relaxed">
            "It's only after we've lost everything (and handled the cleanup) that we're free to do anything."
          </div>
        </div>

      </main>

      <footer className="max-w-5xl mx-auto p-8 border-t border-zinc-900 text-[10px] uppercase tracking-[0.4em] text-zinc-700 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>Project Mayhem &copy; 1999 - {new Date().getFullYear()}</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          System Status: Pure
        </span>
      </footer>

      {/* Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #52525b; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>

      {/* Background Gritty Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
    </div>
  );
};
