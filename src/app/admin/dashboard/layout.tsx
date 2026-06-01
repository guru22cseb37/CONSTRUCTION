'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Building2, ShieldAlert, Cpu, Users, BookOpen, 
  MessageSquare, LayoutDashboard, LogOut, ShieldCheck, Clock
} from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: 'OVERVIEW', href: '/admin/dashboard', icon: <LayoutDashboard size={16} /> },
    { name: 'LEADS CRM', href: '/admin/dashboard/leads', icon: <Users size={16} /> },
    { name: 'LANDMARK CRUD', href: '/admin/dashboard/projects', icon: <Building2 size={16} /> },
    { name: 'JOURNAL BLOG', href: '/admin/dashboard/blog', icon: <BookOpen size={16} /> },
    { name: 'TESTIMONIALS', href: '/admin/dashboard/testimonials', icon: <MessageSquare size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-obsidian flex flex-col lg:flex-row text-platinum">
      
      {/* Sidebar Nav */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-gold/15 bg-graphite/80 backdrop-blur-xl p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          
          {/* Admin title header */}
          <div className="border-b border-gold/10 pb-6">
            <Link href="/" className="flex flex-col justify-start">
              <div className="flex items-center gap-2">
                <ShieldAlert size={20} className="text-gold" />
                <span className="font-bebas text-2xl tracking-wider text-pearl">CSK CONTROL</span>
              </div>
              <span className="font-jetbrains text-[8px] text-amber-500 tracking-[0.2em] uppercase block mt-1">
                SYSTEM ADMINISTRATOR
              </span>
            </Link>
          </div>

          {/* Nav links */}
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-2 pb-2 lg:pb-0 font-jetbrains text-xs">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded border transition-all shrink-0 lg:shrink ${
                    isActive 
                      ? 'border-gold bg-gold/15 text-gold shadow-[inset_0_0_10px_rgba(212,175,55,0.05)]' 
                      : 'border-transparent text-platinum hover:text-gold hover:border-gold/25'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

        </div>

        {/* Footer anchors */}
        <div className="border-t border-gold/10 pt-6 mt-6 lg:mt-0 font-jetbrains text-xs flex flex-row lg:flex-col justify-between lg:justify-start gap-4">
          <div className="flex items-center gap-2 text-platinum/50 text-[10px]">
            <Clock size={12} className="text-gold" />
            <span>TERMINAL BKC-18</span>
          </div>
          
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors w-fit text-[11px] font-bold"
          >
            <LogOut size={14} />
            <span>EXIT TERMINAL</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Header breadcrumb bar */}
          <div className="flex justify-between items-center border-b border-gold/10 pb-4">
            <span className="font-jetbrains text-[9px] text-platinum/50 uppercase tracking-widest">
              SYSTEM: OPERATIONAL // RLS CHECK PASSED
            </span>
            <span className="flex items-center gap-1.5 font-jetbrains text-[9px] text-emerald-400 border border-emerald-400/20 bg-emerald-400/5 px-2 py-0.5 rounded">
              <ShieldCheck size={10} />
              ADMIN CONNECTED
            </span>
          </div>

          {children}
        </div>
      </main>

    </div>
  );
}
