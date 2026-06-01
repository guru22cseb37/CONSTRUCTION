'use client';

import { ShieldCheck, HardHat, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      
      {/* Header Banner */}
      <div className="border-b border-gold/10 pb-8 flex flex-col items-start gap-4">
        <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">CSK HISTORY & LEADERSHIP</span>
        <h1 className="font-cormorant text-5xl md:text-7xl text-pearl leading-none">
          Where Engineering Meets Legacy
        </h1>
        <p className="font-dm text-sm md:text-lg text-platinum max-w-3xl leading-relaxed">
          Established at the dawn of the century, CSK Constructions has transformed from a custom Chennai foundation supplier into a nationwide multi-disciplinary powerhouse specializing in brutalist luxury skyscrapers and critical civic logistics infrastructure.
        </p>
      </div>

      {/* Core Philosophies (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Obsidian Refinement',
            desc: 'We merge heavy-duty structural concrete frames and raw volcanic aggregates with hand-finished bronze, custom glass, and polished gold accents.',
            icon: <Award className="text-gold" size={24} />
          },
          {
            title: 'Military Precision',
            desc: 'Every project utilizes strict Critical Path Method (CPM) algorithms and Revit BIM clash detection. We manage site safety audits with zero noise.',
            icon: <HardHat className="text-gold" size={24} />
          },
          {
            title: 'Zero-Noise Budgets',
            desc: 'Millimeter-tolerance material estimates and automated local-market pricing integrations ensure budgets remain completely stable.',
            icon: <ShieldCheck className="text-gold" size={24} />
          }
        ].map((phi, idx) => (
          <div key={idx} className="p-8 rounded glass-card border-t-2 border-t-gold space-y-4">
            <div className="p-3 border border-gold/20 bg-gold/5 rounded w-fit">
              {phi.icon}
            </div>
            <h3 className="font-bebas text-2xl text-pearl tracking-wider uppercase">
              {phi.title}
            </h3>
            <p className="font-dm text-xs text-platinum leading-relaxed">
              {phi.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Corporate Leadership Team */}
      <div className="space-y-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <span className="font-jetbrains text-xs text-gold tracking-widest uppercase">BOARD OF DIRECTORS</span>
          <h2 className="font-cormorant text-4xl md:text-5xl text-pearl">Executive Architectures</h2>
          <div className="w-12 h-[1px] bg-gold" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'C. Shivakumar',
              role: 'Founding Chairman & Chief Estimator',
              bio: 'A veteran civil contractor with 32 years of experience. Shivakumar oversees large-span viaduct bridges and commercial steel skyscrapers.'
            },
            {
              name: 'Dr. Evelyn Vance',
              role: 'Executive Director of Structural Engineering',
              bio: 'Former consultant to major international architectural forums. Evelyn manages BIM digital designs, seismic dampers, and raw aggregate formulas.'
            },
            {
              name: 'Aravind Swaminathan',
              role: 'Chief of Operations & CPM Logistics',
              bio: 'An expert in Lean Construction methodologies. Aravind ensures double-shift site scheduling and national material corridors operate seamlessly.'
            }
          ].map((member, idx) => (
            <div key={idx} className="p-6 rounded border border-gold/10 bg-graphite/40 relative overflow-hidden group hover:border-gold/30 transition-luxury">
              {/* Backing large number */}
              <span className="absolute right-4 bottom-[-10px] font-bebas text-8xl text-gold/3 font-bold select-none">
                0{idx + 1}
              </span>
              <div className="relative z-10 space-y-4">
                <div className="w-16 h-16 rounded-full border border-gold/30 bg-white/5 flex items-center justify-center text-gold mb-4">
                  <Users size={28} />
                </div>
                <h4 className="font-cormorant text-2xl text-pearl leading-none">{member.name}</h4>
                <span className="font-jetbrains text-[9px] text-gold tracking-widest uppercase block">{member.role}</span>
                <p className="font-dm text-xs text-platinum leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
