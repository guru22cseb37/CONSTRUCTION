'use client';

import Link from 'next/link';
import { 
  Building2, Home, Warehouse, HardHat, ShieldCheck, 
  Clock, Coins, Sparkles, Award, ArrowRight 
} from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      title: 'Residential Construction',
      badge: 'ETERNAL SLABS',
      desc: 'Legacy multi-family high-rises and premium smart residential towers utilizing low-carbon fly-ash concrete and modular green layouts.',
      icon: <Home size={24} className="text-gold" />
    },
    {
      title: 'Commercial Buildings',
      badge: 'TROPHY TOWERS',
      desc: 'State-of-the-art office spaces and soaring corporate headquarters built with deep structural suspended cantilevers and energy-saving glass envelopes.',
      icon: <Building2 size={24} className="text-gold" />
    },
    {
      title: 'Luxury Villas',
      badge: 'ZAHA GEOMETRY',
      desc: 'Custom, architecturally daring sea-facing residences that merge bold raw brutalist exposed concrete walls with warm wooden timber frameworks.',
      icon: <Sparkles size={24} className="text-gold" />
    },
    {
      title: 'Apartments & Communities',
      badge: 'SMART DISTRICTS',
      desc: 'Premium gated high-density luxury residential projects featuring centralized water-treatment plants, solar micro-grids, and clean air filters.',
      icon: <Building2 size={24} className="text-gold" />
    },
    {
      title: 'Infrastructure Projects',
      badge: 'CIVIC LEGACIES',
      desc: 'Double-curved steel space frame roofs, heavy marine concrete pylons, and pre-stressed multi-span segments for high-load transit channels.',
      icon: <Warehouse size={24} className="text-gold" />
    },
    {
      title: 'Industrial Facilities',
      badge: 'HEAVY FORGES',
      desc: 'Heavy assembly plants designed with fiber-reinforced floor slabs, massive portal crane structural pillars, and integrated chemical treatment sectors.',
      icon: <Warehouse size={24} className="text-gold" />
    },
    {
      title: 'Interior Solutions',
      badge: 'GOLD INLAYS',
      desc: 'Complete high-end interior architecture fit-outs containing polished bronze panels, marble flooring slabs, and custom warm lighting structures.',
      icon: <Award size={24} className="text-gold" />
    },
    {
      title: 'Renovation Services',
      badge: 'CORE RETROFITS',
      desc: 'Expedited structural retrofitting, seismic dampening additions, and cosmetic exterior glass replacements transforming legacy corporate assets.',
      icon: <HardHat size={24} className="text-gold" />
    },
    {
      title: 'Project Management',
      badge: 'MILITARY AUDITS',
      desc: 'Turnkey project management utilizing strict CPM planning tracks, regular visual reviews, supply procurement networks, and zero noise budgets.',
      icon: <Clock size={24} className="text-gold" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      
      {/* Page Header */}
      <div className="border-b border-gold/10 pb-8 flex flex-col items-start gap-4">
        <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">CSK SPECIALTIES</span>
        <h1 className="font-cormorant text-5xl md:text-7xl text-pearl leading-none">
          Nine Luxury Technical Verticals
        </h1>
        <p className="font-dm text-sm md:text-lg text-platinum max-w-3xl leading-relaxed">
          From heavy civil engineering projects spanning kilometers to fine interior architecture bronze details, our expertise is built with military precision and zero compromise.
        </p>
      </div>

      {/* Grid of 9 detailed cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((srv, idx) => (
          <div key={idx} className="p-8 rounded glass-card flex flex-col justify-between h-[300px] hover:border-gold/30 transition-luxury">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="p-3 border border-gold/20 bg-gold/5 rounded w-fit">
                  {srv.icon}
                </div>
                <span className="font-jetbrains text-[9px] text-gold tracking-widest uppercase border border-gold/20 bg-gold/5 px-2 py-0.5 rounded">
                  {srv.badge}
                </span>
              </div>
              <h3 className="font-bebas text-2xl text-pearl tracking-wider uppercase">{srv.title}</h3>
              <p className="font-dm text-xs text-platinum leading-relaxed">{srv.desc}</p>
            </div>
            
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-jetbrains text-[10px] text-gold hover:text-champagne uppercase tracking-widest pt-4 border-t border-gold/5"
            >
              <span>Secure Scoping Quote</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
}
