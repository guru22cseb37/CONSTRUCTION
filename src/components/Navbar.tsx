'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShieldAlert, Cpu } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    { name: 'SERVICES', href: '/services' },
    { name: 'PORTFOLIO', href: '/projects' },
    { name: 'JOURNEY', href: '/process' },
    { name: 'CAREERS', href: '/careers' },
    { name: 'LOGS', href: '/blog' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-luxury ${
        isScrolled
          ? 'glass-nav py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-6 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col justify-start">
          <div className="flex items-center gap-2">
            <span className="font-bebas text-3xl tracking-wider text-pearl group-hover:text-gold transition-colors">
              CSK
            </span>
            <span className="font-cormorant italic text-sm tracking-widest text-gold opacity-80 mt-1">
              CONSTRUCTIONS
            </span>
          </div>
          <span className="font-jetbrains text-[9px] text-platinum tracking-[0.2em] -mt-1 group-hover:text-champagne transition-colors">
            ENGINEERING LEGACY
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-jetbrains text-xs tracking-widest hover:text-gold transition-colors relative py-1 ${
                  isActive ? 'text-gold' : 'text-pearl'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold shadow-[0_0_8px_#D4AF37]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center space-x-4">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-amber-500/20 rounded bg-white/5 font-jetbrains text-[10px] text-amber-500/80 hover:bg-amber-500/10 hover:text-amber-500 transition-luxury"
            title="Admin CRM Dashboard"
          >
            <ShieldAlert size={12} />
            <span>ADMIN HQ</span>
          </Link>

          <Link
            href="/contact"
            className="relative px-5 py-2.5 overflow-hidden group border border-gold bg-transparent text-gold font-jetbrains text-xs tracking-wider uppercase transition-luxury hover:text-obsidian"
          >
            <span className="absolute inset-0 w-full h-full bg-gold transition-luxury transform -translate-x-full group-hover:translate-x-0 z-0" />
            <span className="relative z-10 flex items-center gap-2">
              START PROJECT <Cpu size={12} className="group-hover:rotate-45 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          <Link
            href="/admin"
            className="p-2 border border-amber-500/20 rounded bg-white/5 text-amber-500/80 hover:bg-amber-500/10 transition-luxury"
          >
            <ShieldAlert size={16} />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-pearl hover:text-gold transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-obsidian/95 backdrop-blur-xl border-t border-gold/10 z-40 flex flex-col justify-between py-12 px-6">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-bebas text-3xl tracking-widest hover:text-gold transition-colors ${
                    isActive ? 'text-gold' : 'text-pearl'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-col space-y-4">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-4 border border-gold text-gold font-jetbrains text-xs tracking-widest uppercase hover:bg-gold hover:text-obsidian transition-luxury"
            >
              START PROJECT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
