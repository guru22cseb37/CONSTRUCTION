'use client';

import { useState, useEffect } from 'react';
import { dbService, Career } from '@/lib/dbService';
import { Briefcase, MapPin, DollarSign, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [selectedRole, setSelectedRole] = useState<Career | null>(null);
  const [applyForm, setApplyForm] = useState({ name: '', phone: '', email: '', resume: '' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function loadCareers() {
      const data = await dbService.getCareers();
      setCareers(data.filter(c => c.active));
    }
    loadCareers();
  }, []);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.phone) return;

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedRole(null);
      setApplyForm({ name: '', phone: '', email: '', resume: '' });
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      
      {/* Header */}
      <div className="border-b border-gold/10 pb-8 flex flex-col items-start gap-4">
        <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">CSK HUMAN RESOURCES</span>
        <h1 className="font-cormorant text-5xl md:text-7xl text-pearl leading-none">
          Join the Legacy Builders
        </h1>
        <p className="font-dm text-sm md:text-lg text-platinum max-w-2xl leading-relaxed">
          At CSK Constructions, we recruit elite structural engineers, BIM Revit experts, and site estimators committed to zero-noise craftsmanship.
        </p>
      </div>

      {/* Grid of open positions */}
      <div className="space-y-6">
        {careers.map((role) => (
          <div
            key={role.id}
            className="p-8 rounded glass-card border-l-4 border-l-gold bg-graphite/40 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Briefcase size={16} className="text-gold shrink-0" />
                <h3 className="font-bebas text-2xl text-pearl tracking-wider uppercase">
                  {role.position}
                </h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 font-jetbrains text-[9px] text-platinum">
                <span className="flex items-center gap-1">
                  <MapPin size={10} className="text-gold" />
                  {role.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <DollarSign size={10} className="text-gold" />
                  {role.salary_range}
                </span>
              </div>
              
              <p className="font-dm text-xs text-platinum max-w-2xl leading-relaxed">
                {role.description}
              </p>
            </div>

            <button
              onClick={() => setSelectedRole(role)}
              className="py-2.5 px-6 border border-gold text-gold font-jetbrains text-[10px] tracking-widest uppercase hover:bg-gold hover:text-obsidian transition-luxury shrink-0"
            >
              APPLY NOW
            </button>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-lg border border-gold/25 glass-card bg-graphite p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            
            <div className="flex justify-between items-start border-b border-gold/10 pb-4 mb-6">
              <div>
                <span className="font-jetbrains text-[10px] text-gold tracking-widest uppercase">
                  SUBMIT SPECIFICATIONS
                </span>
                <h3 className="font-cormorant text-2xl text-pearl leading-none mt-1">
                  {selectedRole.position}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRole(null)}
                className="text-platinum hover:text-gold transition-colors"
              >
                X
              </button>
            </div>

            {success ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-8 animate-in zoom-in-95 duration-500">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-bebas text-xl text-pearl uppercase">Application Transmitted</h4>
                <p className="font-dm text-xs text-platinum max-w-sm">
                  Your credentials have been indexed in our secure applicant database. Our Human Resources division will follow up.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 font-jetbrains text-xs">
                <div className="flex flex-col gap-1.5">
                  <span className="text-platinum/50 uppercase">Full Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={applyForm.name}
                    onChange={e => setApplyForm({ ...applyForm, name: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-platinum/50 uppercase">Mobile Number *</span>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 99999 88888"
                    value={applyForm.phone}
                    onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-platinum/50 uppercase">Email Address</span>
                  <input
                    type="email"
                    placeholder="e.g. maya@structural.com"
                    value={applyForm.email}
                    onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-platinum/50 uppercase">Resume / Cover Bio *</span>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe BIM Revit skills, high-rise concrete credentials..."
                    value={applyForm.resume}
                    onChange={e => setApplyForm({ ...applyForm, resume: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-champagne text-obsidian font-bold py-3 rounded tracking-widest uppercase transition-colors"
                >
                  TRANSMIT APPLICATIONS
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
