'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, HelpCircle } from 'lucide-react';
import { dbService } from '@/lib/dbService';

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: 'Greetings. I am the CSK AI Project Assistant. I can assist you with preliminary project scoping, cost estimations, construction timelines, and service details. How may I assist your landmark project today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadFormActive, setLeadFormActive] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate expert AI response
    setTimeout(() => {
      let replyText = '';
      const cleanText = textToSend.toLowerCase();

      if (cleanText.includes('cost') || cleanText.includes('price') || cleanText.includes('budget') || cleanText.includes('estimate')) {
        replyText = 'CSK construction costs depend on quality tiers and project types. Generally:\n\n• High-End Residential: ₹3,500 - ₹5,500 per sqft\n• Luxury Villas: ₹6,000 - ₹9,500 per sqft\n• Commercial High-Rises: ₹4,500 - ₹7,000 per sqft\n• Industrial Facilities: ₹2,200 - ₹3,800 per sqft\n\nWould you like me to connect you with an estimator for a highly detailed quote? Please leave your details.';
        setLeadFormActive(true);
      } else if (cleanText.includes('time') || cleanText.includes('schedule') || cleanText.includes('duration') || cleanText.includes('long')) {
        replyText = 'Timelines vary by structural complexity:\n\n• Luxury Cantilever Villas: 12 - 18 Months\n• Premium High-Rise Apartments: 24 - 36 Months\n• Industrial Warehouses: 8 - 14 Months\n\nWe utilize strict CPM scheduling and double-shift site schedules to ensure military-precision handovers. Would you like our team to draft a preliminary schedule outline for your site?';
        setLeadFormActive(true);
      } else if (cleanText.includes('service') || cleanText.includes('do you') || cleanText.includes('capability') || cleanText.includes('expertise')) {
        replyText = 'CSK specializes in 9 premium verticals: Residential construction, Commercial high-rises, Cantilevered luxury villas, Multi-story apartments, Massive infrastructure viaducts/space-frames, Heavy industrial forge slabs, Refined interior architecture, Strategic renovations, and Turnkey Project Management. Which segment matches your scope?';
      } else if (cleanText.includes('hello') || cleanText.includes('hi') || cleanText.includes('hey')) {
        replyText = 'Greetings. I am ready to review your project. Please specify if you are looking into commercial, premium residential, or high-end villa construction.';
      } else {
        replyText = "Understood. CSK's engineering division addresses complex architectural designs with absolute structural integrity. To provide specific estimations, scheduling frameworks, or material advice, I highly recommend scheduling a consultation. Let me know your contact details below to have our Chief Estimator call you directly.";
        setLeadFormActive(true);
      }

      const botMsg: Message = {
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.phone) return;

    try {
      await dbService.submitLead({
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email || 'ai-assistant@csk.com',
        project_type: 'AI Assistant Referral',
        budget: 'Scoping stage',
        location: 'Inquired via Chatbot',
        message: 'Lead captured during AI Assistant conversation. Inquiry history included.'
      });

      setLeadSubmitted(true);
      setLeadFormActive(false);

      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `Thank you, ${leadData.name}. Your details have been submitted directly to our CRM. Our Chief Project Coordinator will reach out to you via ${leadData.phone} within the next 4 working hours.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  const suggestedPrompts = [
    'How much does a luxury villa cost per sqft?',
    'What is the typical commercial timeline?',
    'Do you build pre-stressed infrastructure?'
  ];

  return (
    <>
      {/* Pulse Orb Trigger Button with Chronograph Casing */}
      <div className="fixed bottom-6 right-6 z-50 group flex items-center justify-center">
        {/* Spinning Watch Compass Dial Rings */}
        <div className="absolute w-[150px] h-[150px] rounded-full border border-gold/15 border-dashed pointer-events-none watch-dial-spin opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />
        <div className="absolute w-[130px] h-[130px] rounded-full border border-gold/10 pointer-events-none watch-dial-spin opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" style={{ animationDirection: 'reverse', animationDuration: '36s' }} />

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-gold border border-gold hover:bg-champagne text-obsidian font-jetbrains text-xs tracking-wider uppercase font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-obsidian opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-obsidian"></span>
          </span>
          <Bot size={16} className="group-hover:scale-110 transition-transform" />
          <span>AI ASSISTANT</span>
        </button>
      </div>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] h-[520px] rounded-lg border border-gold/25 glass-card shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 border-b border-gold/10 bg-graphite/90 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full border border-gold/25 bg-gold/10">
                <Sparkles size={16} className="text-gold animate-pulse" />
              </div>
              <div>
                <h3 className="font-bebas text-lg tracking-widest text-pearl uppercase">CSK DIGITAL HEADQUARTERS</h3>
                <span className="font-jetbrains text-[9px] text-amber-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ONLINE | SCOPE CALCULATOR
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-platinum hover:text-gold transition-colors hover:bg-white/5"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Track */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-7 h-7 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center shrink-0">
                    <Bot size={12} className="text-gold" />
                  </div>
                )}
                
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`p-3 rounded text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-gold/15 border border-gold/30 text-pearl rounded-tr-none'
                        : 'bg-white/5 border border-white/10 text-platinum rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="font-jetbrains text-[8px] text-platinum/50 mt-1 self-end px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full border border-white/20 bg-white/5 flex items-center justify-center shrink-0">
                    <User size={12} className="text-pearl" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center shrink-0">
                  <Bot size={12} className="text-gold" />
                </div>
                <div className="bg-white/5 border border-white/10 text-platinum p-3 rounded rounded-tl-none text-xs flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {/* Lead capture prompt in chat */}
            {leadFormActive && !leadSubmitted && (
              <form
                onSubmit={handleLeadSubmit}
                className="p-4 border border-gold/20 bg-gold/5 rounded space-y-3 animate-in fade-in duration-300"
              >
                <div className="flex items-center gap-1.5 font-bebas text-xs text-gold tracking-wider uppercase">
                  <HelpCircle size={12} />
                  <span>Request Direct Architect Callback</span>
                </div>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={leadData.name}
                    onChange={e => setLeadData({ ...leadData, name: e.target.value })}
                    className="w-full bg-obsidian border border-white/10 rounded px-2.5 py-1.5 font-dm text-xs text-pearl focus:border-gold outline-none"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={leadData.phone}
                    onChange={e => setLeadData({ ...leadData, phone: e.target.value })}
                    className="w-full bg-obsidian border border-white/10 rounded px-2.5 py-1.5 font-dm text-xs text-pearl focus:border-gold outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={leadData.email}
                    onChange={e => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full bg-obsidian border border-white/10 rounded px-2.5 py-1.5 font-dm text-xs text-pearl focus:border-gold outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-champagne text-obsidian font-jetbrains text-[10px] py-2 rounded font-semibold tracking-widest uppercase transition-colors"
                >
                  REQUEST EXPERT CALL
                </button>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 flex flex-col gap-1.5 shrink-0">
              {suggestedPrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(p)}
                  className="text-left py-1.5 px-3 border border-white/5 bg-white/5 rounded text-[10px] text-platinum hover:text-gold hover:border-gold/25 transition-all text-ellipsis overflow-hidden"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 border-t border-gold/10 bg-graphite/90 flex gap-2">
            <input
              type="text"
              placeholder="Ask about square footage, structural materials..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage(input)}
              className="flex-1 bg-obsidian border border-white/10 rounded px-3 py-2 font-dm text-xs text-pearl focus:border-gold outline-none"
            />
            <button
              onClick={() => handleSendMessage(input)}
              className="p-2 border border-gold bg-gold hover:bg-champagne text-obsidian rounded transition-colors"
            >
              <Send size={14} />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
