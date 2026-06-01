'use client';

import { CheckCircle2, ShieldCheck, Clock, Layers } from 'lucide-react';

export default function ProcessPage() {
  const steps = [
    {
      title: 'Consultation & Scoping',
      est: '1 - 2 Weeks',
      desc: 'Our lead architects and coordinators meet at our Bandra Kurla Complex headquarters. We review geographical constraints, soil loading reports, and zoning factors to align our engineering team.'
    },
    {
      title: 'Structural Planning & Scheduling',
      est: '3 - 4 Weeks',
      desc: 'Developing critical path algorithm charts (CPM) that calculate supply chain delays, double-shift allocations, and scheduling milestones with zero room for error.'
    },
    {
      title: 'BIM Design & Modeling',
      est: '4 - 8 Weeks',
      desc: 'We construct full-resolution 3D Building Information Models (BIM) on Autodesk Revit. All mechanical, electrical, and structural systems are overlaid to perform instant clash-detection audits.'
    },
    {
      title: 'Licensing & Building Approval',
      est: '2 - 4 Weeks',
      desc: 'CSK navigates regional zoning regulations, structural safety permits, and environment green clearances, presenting clients with complete transparency reports.'
    },
    {
      title: 'Precision Construction Groundbreak',
      est: 'Varies',
      desc: 'Mobilizing heavy-machinery corridors. Our specialized engineers and veteran site managers implement real-time logs, tracking concrete compaction and steel weld tolerances.'
    },
    {
      title: 'Millimeter Quality Inspections',
      est: '2 Weeks',
      desc: 'Audit managers execute laser-guided scan measurements, concrete core compression tests, and dynamic wind-load dampening checks, certifying structural integrity.'
    },
    {
      title: 'Key Handover & Document Delivery',
      est: '1 Week',
      desc: 'Delivering the keys of your landmark development. CSK hands over a complete binder of structural logs, material safety certifications, and BIM blueprints.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      
      {/* Header */}
      <div className="border-b border-gold/10 pb-8 flex flex-col items-start gap-4">
        <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">CSK TIMELINE PIPELINE</span>
        <h1 className="font-cormorant text-5xl md:text-7xl text-pearl leading-none">
          Our Seven Construction Steps
        </h1>
        <p className="font-dm text-sm md:text-lg text-platinum max-w-2xl leading-relaxed">
          From the initial sketches to the final structural handover, CSK implements a rigorous military checklist at every stage of construction.
        </p>
      </div>

      {/* Vertical Steps */}
      <div className="space-y-10 relative pl-8 py-4">
        {/* Animated Gold timeline stream */}
        <div className="absolute left-[7px] top-0 w-[2px] h-full bg-gradient-to-b from-gold via-gold/40 to-transparent" />

        {steps.map((step, idx) => (
          <div key={idx} className="relative group space-y-2">
            {/* Connected orb */}
            <div className="absolute left-[-37px] top-1 w-4 h-4 rounded-full border border-gold bg-obsidian flex items-center justify-center z-10 group-hover:bg-gold transition-colors duration-300">
              <div className="w-1.5 h-1.5 rounded-full bg-gold group-hover:bg-obsidian" />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="font-bebas text-3xl text-gold tracking-widest leading-none">
                0{idx + 1}
              </span>
              <h3 className="font-cormorant text-2xl text-pearl leading-none">
                {step.title}
              </h3>
              <span className="font-jetbrains text-[8px] text-amber-500 border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 rounded ml-auto">
                EST: {step.est}
              </span>
            </div>
            
            <p className="font-dm text-xs text-platinum leading-relaxed max-w-2xl">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
