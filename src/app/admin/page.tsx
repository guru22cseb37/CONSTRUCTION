'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Terminal, EyeOff, Fingerprint } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@cskconstructions.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate high-tech biometric authorization
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      
      <div className="w-full max-w-md rounded-lg border border-gold/25 glass-card bg-graphite p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden">
        {/* Tech backing details */}
        <div className="absolute top-0 right-0 p-2 font-jetbrains text-[8px] text-platinum/30 border-b border-l border-gold/10">
          SECURE INTERFACE LINK v1.2.6
        </div>

        <div className="flex flex-col items-center text-center space-y-3 mb-8">
          <div className="p-3 border border-amber-500/30 bg-amber-500/5 rounded-full text-amber-500 animate-pulse">
            <Fingerprint size={28} />
          </div>
          <h2 className="font-bebas text-3xl tracking-widest text-pearl uppercase">
            CSK MISSION CONTROL
          </h2>
          <span className="font-jetbrains text-[9px] text-platinum/50 uppercase tracking-wider block">
            AUTHORIZATION OVERRIDE REQUISITIONED
          </span>
        </div>

        <form onSubmit={handleSimulatedLogin} className="space-y-4 font-jetbrains text-xs">
          
          <div className="flex flex-col gap-1.5">
            <span className="text-platinum/50 uppercase">Staff Credentials (Email)</span>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-obsidian border border-white/10 rounded px-3 py-2.5 text-pearl focus:border-gold outline-none pl-9"
              />
              <Terminal size={14} className="absolute left-3 top-3 text-gold/60" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-platinum/50 uppercase">Biometric Password Override</span>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-obsidian border border-white/10 rounded px-3 py-2.5 text-pearl focus:border-gold outline-none pl-9"
              />
              <Lock size={14} className="absolute left-3 top-3 text-gold/60" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-platinum/70 pt-2">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-gold" />
              <span>Remember active BKC terminal</span>
            </label>
            <span className="text-gold hover:underline cursor-pointer">Re-request Key</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold hover:bg-champagne text-obsidian font-bold py-3.5 rounded tracking-widest uppercase transition-colors flex items-center justify-center gap-2 mt-6 shadow-[0_0_15px_rgba(212,175,55,0.2)] disabled:opacity-50"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 rounded-full border-2 border-obsidian border-t-transparent animate-spin" />
            ) : (
              <>
                <ShieldCheck size={16} />
                <span>AUTHORIZE CREDENTIALS</span>
              </>
            )}
          </button>

        </form>

        <div className="mt-8 border-t border-gold/10 pt-4 flex justify-between items-center font-jetbrains text-[9px] text-platinum/50">
          <span>IP LOGGED: SECURE SSL</span>
          <span className="text-amber-500 font-semibold">BKC NETWORK TERMINAL</span>
        </div>

      </div>

    </div>
  );
}
