import React, { useState } from 'react';
import {
  Search,
  Send,
  MapPin,
  Users,
  Utensils,
  ShieldAlert,
  Activity,
  Zap,
  Accessibility,
  HeartPulse,
  Flame,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssistantResponse } from './lib/gemini';
import type { ChatMessage } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (customPrompt?: string) => {
    const text = customPrompt || input;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: m.content
    }));

    const response = await getAssistantResponse(text, history);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const QUICK_ACTIONS = [
    { icon: HeartPulse, label: 'Nearest toilets', pr: 'Where are the nearest toilets?' },
    { icon: Flame, label: 'Quick food', pr: 'Any food with low queue?' },
    { icon: MapPin, label: 'Best exit gate', pr: 'Fastest exit gate now?' },
    { icon: ShieldAlert, label: 'Emergency', pr: 'I need help!' },
    { icon: Zap, label: 'Event info', pr: 'Whats next in event?' },
    { icon: Accessibility, label: 'Accessible route', pr: 'Show accessible routes' },
  ];

  return (
    <div className="flex flex-col h-screen w-full bg-premium-bg text-premium-highlight font-inter select-none">

      {/* Header */}
      <header className="h-20 flex items-center justify-between px-8 border-b border-premium-border bg-premium-bg z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Bot size={24} className="text-black" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Stadium<span className="text-primary italic">Assist</span></h1>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Live
          </div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
            <MapPin size={14} className="text-secondary/50" />
            Wembley Stadium
          </div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
            <Users size={14} className="text-secondary/50" />
            73,000 Attendees
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">

        {/* Left Sidebar */}
        <aside className="w-[340px] border-r border-premium-border bg-premium-bg overflow-y-auto hidden xl:block custom-scrollbar">

          <div className="sidebar-section">
            <h2 className="sidebar-title">Attendee Context</h2>
            <div className="glass-panel p-5 bg-linear-to-br from-white/[0.03] to-transparent">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black border border-primary/20 text-lg">
                  MR
                </div>
                <div>
                  <h3 className="text-sm font-bold">Demo Attendee</h3>
                  <p className="text-[10px] text-secondary font-medium px-0.5">Section B • Seat 14 • Row C</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-sm bg-primary/10 text-primary text-[9px] font-black uppercase tracking-wider">Burgers</span>
                <span className="px-2.5 py-1 rounded-sm bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-wider">English</span>
                <span className="px-2.5 py-1 rounded-sm bg-orange-500/10 text-orange-400 text-[9px] font-black uppercase tracking-wider">No mobility needs</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h2 className="sidebar-title">Live Crowd Stats</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Capacity', val: '84%', color: 'text-premium-highlight' },
                { label: 'Density', val: 'MED', color: 'text-primary' },
                { label: 'Open Gates', val: '6', color: 'text-primary' },
                { label: 'Stalls Open', val: '14', color: 'text-premium-highlight' },
              ].map((s, i) => (
                <div key={i} className="glass-panel p-4 bg-white/[0.01]">
                  <p className="text-[8px] uppercase font-black text-secondary tracking-widest mb-1.5">{s.label}</p>
                  <p className={`text-xl font-black tracking-tighter ${s.color}`}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h2 className="sidebar-title">Crowd Density</h2>
            <div className="space-y-5">
              {[
                { label: 'North Stand', val: 62, color: '#00e699' },
                { label: 'South Stand', val: 41, color: '#00e699' },
                { label: 'East Stand', val: 78, color: '#f7b500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] font-bold mb-2 uppercase tracking-tight">
                    <span>{item.label}</span>
                    <span className="text-secondary">{item.val}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-premium-border rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.val}%` }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section border-b-0 pb-10">
            <h2 className="sidebar-title">Gate Wait Times</h2>
            <div className="space-y-2">
              {[
                { label: 'Gate A', time: '12 min', color: 'text-orange-400' },
                { label: 'Gate B', time: '7 min', color: 'text-orange-400' },
                { label: 'Gate C ★', time: '3 min', color: 'text-primary' },
                { label: 'Gate D', time: '14 min', color: 'text-orange-400' },
              ].map((gate, i) => (
                <div key={i} className="flex justify-between items-center px-4 py-3.5 glass-panel bg-white/[0.01] hover:bg-white/[0.03] transition-colors border-white/5">
                  <span className={`text-xs font-bold ${gate.label.includes('★') ? 'text-primary' : ''}`}>{gate.label}</span>
                  <span className={`text-xs font-black ${gate.color}`}>{gate.time}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Central UI */}
        <main className="flex-1 flex flex-col items-center justify-center relative bg-[#0a0a0e]/50">

          <div className="max-w-2xl w-full flex flex-col items-center text-center px-6">

            <AnimatePresence mode="wait">
              {messages.length === 0 ? (
                <motion.div
                  key="greeting"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-10 mb-8"
                >
                  <div className="relative group">
                    <div className="absolute -inset-8 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-all duration-1000"></div>
                    {/* Arena SVG Placeholder */}
                    <div className="w-40 h-24 bg-[#161b22] border-4 border-[#21262d] rounded-[2rem] relative overflow-hidden flex items-center justify-center shadow-2xl">
                      <div className="w-28 h-12 border-2 border-primary/10 rounded-full flex items-center justify-center">
                        <div className="w-16 h-6 border border-primary/20 rounded-full"></div>
                      </div>
                      <div className="absolute top-0 w-full h-3 bg-primary/5"></div>
                      <div className="absolute bottom-0 w-full h-3 bg-primary/5"></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-5xl font-black tracking-tight flex flex-col sm:flex-row items-center justify-center gap-3">
                      <span>Hi, I'm</span>
                      <span className="text-primary italic">StadiumAssist</span>
                    </h2>
                    <p className="text-secondary font-medium leading-relaxed max-w-lg mx-auto text-lg">
                      Ask me anything — directions, food, wait times, event info, or accessibility help. I’m connected to live stadium data.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full space-y-6 mb-4 overflow-y-auto max-h-[480px] pr-4 custom-scrollbar flex flex-col"
                >
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm text-left shadow-lg ${m.role === 'user'
                        ? 'bg-primary/10 border border-primary/20 text-premium-highlight rounded-tr-none'
                        : 'bg-[#161b22] border border-[#21262d] text-premium-highlight rounded-tl-none'
                        }`}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="p-4 rounded-2xl bg-[#161b22] border border-[#21262d] rounded-tl-none">
                        <div className="flex gap-1.5">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-full mb-6 z-10">
              <div className="flex flex-wrap justify-center gap-2 overflow-x-auto py-2 custom-scrollbar no-scrollbar">
                {QUICK_ACTIONS.map((btn, i) => (
                  <button key={i} onClick={() => handleSend(btn.pr)} className="pill-action whitespace-nowrap bg-premium-bg/40 backdrop-blur-md border-white/5 shadow-sm">
                    <btn.icon size={13} className="text-primary" />
                    <span className="text-[11px]">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full relative">
              <div className="absolute -inset-1.5 bg-primary/20 rounded-[2rem] blur-xl opacity-0 transition-opacity duration-700 group-focus-within:opacity-100"></div>
              <div className="input-container group relative">
                <Search size={22} className="text-secondary/50 group-focus-within:text-primary transition-colors ml-1" />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything about the stadium..."
                  className="flex-1 bg-transparent border-none outline-none py-4 text-base placeholder:text-secondary/40 h-full"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="w-12 h-12 rounded-[1.2rem] bg-primary flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30 disabled:opacity-50 disabled:scale-100 mr-1"
                >
                  {isLoading ? <div className="w-5 h-5 border-3 border-black border-t-transparent rounded-full animate-spin" /> : <Send size={20} />}
                </button>
              </div>
              <p className="mt-4 text-[10px] text-secondary/40 font-bold uppercase tracking-widest text-center">
                Encrypted • Real-time Venue Analytics • v2.4.0
              </p>
            </div>

          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[340px] border-l border-premium-border bg-premium-bg overflow-y-auto hidden 2xl:block px-8 py-6 custom-scrollbar">

          <div className="mb-10 pt-4">
            <h2 className="sidebar-title">Live Match</h2>
            <div className="glass-panel p-6 bg-linear-to-br from-white/[0.04] to-transparent border-primary/5">
              <div className="flex justify-between items-center mb-8">
                <div className="text-[10px] font-black uppercase tracking-wider">Championship Final</div>
                <div className="text-[10px] text-secondary font-medium">Wembley</div>
              </div>

              <div className="flex justify-around items-center gap-6 mb-8">
                <div className="flex flex-col items-center gap-3">
                  <div className="text-4xl font-black italic tracking-tighter">2</div>
                  <span className="text-[9px] uppercase font-black text-secondary tracking-[0.2em]">Home</span>
                </div>
                <div className="text-xl font-bold text-secondary/20">:</div>
                <div className="flex flex-col items-center gap-3">
                  <div className="text-4xl font-black italic tracking-tighter">1</div>
                  <span className="text-[9px] uppercase font-black text-secondary tracking-[0.2em]">Away</span>
                </div>
              </div>

              <div className="flex justify-center items-center gap-3 py-2 border-t border-white/[0.03]">
                <span className="text-xs font-black italic text-primary">83'</span>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_8px_#00e699]"></div>
                <span className="text-[10px] text-secondary uppercase font-bold tracking-widest">Live</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="sidebar-title">Live Alerts</h2>
            <div className="space-y-4">
              {[
                { color: '#00e699', text: 'South Stand exits all clear — great egress now', time: 'just now', ic: Zap },
                { color: '#f7b500', text: 'Pizza Palace (Gate C) queue down to 4 minutes', time: 'just now', ic: Utensils },
                { color: '#f7b500', text: 'Gate B concourse getting busy — allow extra time', time: 'just now', ic: Activity },
                { color: '#00e699', text: 'Gate C now has lowest wait time — 3 min', time: '2 min ago', ic: Zap },
                { color: '#007aff', text: 'Big Bites (Gate B) restocked — queue clearing', time: '5 min ago', ic: Flame },
                { color: '#ff4d4d', text: 'East Stand concourse congested — use South route', time: '8 min ago', ic: ShieldAlert },
              ].map((alert, i) => (
                <div key={i} className="flex gap-4 p-5 glass-panel bg-white/[0.01] hover:bg-white/[0.04] transition-all border-white/5 group">
                  <div className="flex-shrink-0 mt-0.5">
                    <span
                      className="block w-2.5 h-2.5 rounded-full transition-all group-hover:scale-125"
                      style={{ backgroundColor: alert.color, boxShadow: `0 0 10px ${alert.color}44` }}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold leading-relaxed tracking-tight text-[#f0f6fc]/90">{alert.text}</p>
                    <p className="text-[9px] text-secondary font-black uppercase tracking-widest opacity-60">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default App;
