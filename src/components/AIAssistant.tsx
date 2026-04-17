import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Sparkles, User } from 'lucide-react';
import { getAssistantResponse } from '../lib/gemini';
import type { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'assistant', content: 'Welcome to Premium Arena! I am your StadiumFlow AI. How can I assist your experience today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const history = messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: m.content
        }));

        const response = await getAssistantResponse(input, history);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[380px] h-[600px] glass-panel flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-white/20"
                    >
                        {/* Header */}
                        <div className="p-5 border-b border-white/10 flex justify-between items-center bg-linear-to-b from-premium-card to-premium-bg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-premium-accent flex items-center justify-center shadow-lg shadow-premium-accent/20">
                                    <Bot size={22} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-premium-highlight flex items-center gap-1">
                                        StadiumFlow AI
                                        <Sparkles size={12} className="text-premium-accent animate-pulse" />
                                    </h3>
                                    <p className="text-[10px] text-premium-accent font-bold uppercase tracking-wider">Concierge Active</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/5 rounded-lg text-secondary hover:text-premium-highlight transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-premium-bg/30">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={idx}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-primary/20 text-primary' : 'bg-premium-accent/20 text-premium-accent'
                                        }`}>
                                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                            ? 'bg-primary text-white rounded-tr-none shadow-md'
                                            : 'bg-premium-card text-premium-highlight border border-white/10 rounded-tl-none shadow-lg'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-premium-accent/20 text-premium-accent flex items-center justify-center">
                                        <Bot size={16} />
                                    </div>
                                    <div className="bg-premium-card p-4 rounded-2xl rounded-tl-none border border-white/10">
                                        <div className="flex gap-1.5">
                                            <div className="w-2 h-2 bg-premium-accent/60 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-premium-accent/60 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                            <div className="w-2 h-2 bg-premium-accent/60 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-5 bg-premium-card/80 border-t border-white/10">
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask for the quickest route to Gate A..."
                                    className="w-full bg-premium-bg border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-premium-accent/50 focus:ring-1 focus:ring-premium-accent/20 transition-all placeholder:text-secondary/50 shadow-inner"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-premium-accent text-white rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-md shadow-premium-accent/30"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p className="text-[9px] text-center text-secondary mt-3 uppercase font-bold tracking-widest opacity-50">
                                Powered by Google Gemini • Real-time Stadium Context
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB */}
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(63, 185, 80, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center text-white relative overflow-hidden group transition-colors duration-500 ${isOpen ? 'bg-premium-card text-premium-accent border border-premium-accent/20' : 'bg-premium-accent'
                    }`}
            >
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
            </motion.button>
        </div>
    );
};

export default AIAssistant;
