'use client';

import { useState } from 'react';
import { dbService } from '@/lib/dbService';
import { 
  MapPin, Phone, Mail, CheckCircle2, PhoneCall, 
  ExternalLink, HardHat, FileText 
} from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    project_type: 'Luxury Villa',
    budget: '₹1.5Cr - ₹3Cr',
    location: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    try {
      await dbService.submitLead({
        name: form.name,
        phone: form.phone,
        email: form.email || 'no-email@csk.com',
        project_type: form.project_type,
        budget: form.budget,
        location: form.location || 'Not Specified',
        message: form.message || 'Direct contact page submission.'
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setForm({
          name: '',
          phone: '',
          email: '',
          project_type: 'Luxury Villa',
          budget: '₹1.5Cr - ₹3Cr',
          location: '',
          message: ''
        });
      }, 5000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      
      {/* Header */}
      <div className="border-b border-gold/10 pb-8 flex flex-col items-start gap-4">
        <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">CSK ENGAGEMENT COMMUNICATIONS</span>
        <h1 className="font-cormorant text-5xl md:text-7xl text-pearl leading-none">
          Contact Our Headquarters
        </h1>
        <p className="font-dm text-sm md:text-lg text-platinum max-w-3xl leading-relaxed">
          Reach out directly to establish structural targets, request budget parameters, or schedule concrete compaction audits.
        </p>
      </div>

      {/* Grid of contact card and lead form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left specs info and maps */}
        <div className="space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-cormorant text-3xl text-pearl">Corporate HQ Specifications</h3>
            
            <div className="space-y-4 font-dm text-sm">
              <div className="flex items-start gap-4 p-4 border border-gold/15 bg-gold/5 rounded">
                <MapPin className="text-gold shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bebas text-lg tracking-wider text-pearl">BKC MUMBAI OFFICE</h4>
                  <p className="text-platinum text-xs mt-0.5 leading-relaxed">
                    CSK Heights, Level 18, Commercial Plaza, Bandra Kurla Complex, Mumbai, MH - 400051
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-white/10 bg-white/3 rounded">
                <Phone className="text-gold shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-bebas text-lg tracking-wider text-pearl">TELECOMMUNICATIONS</h4>
                  <p className="text-platinum text-xs mt-0.5">+91 (22) 6789-0123 (HQ Operations)</p>
                  <p className="text-platinum text-xs">+91 98765 43210 (Direct WhatsApp Estimator)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 border border-white/10 bg-white/3 rounded">
                <Mail className="text-gold shrink-0 mt-0.5" size={18} />
                <div>
                  <h4 className="font-bebas text-lg tracking-wider text-pearl">ELECTRONIC LOGS</h4>
                  <p className="text-platinum text-xs mt-0.5">hq@cskconstructions.com</p>
                  <p className="text-platinum text-xs">tenders@cskconstructions.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Styled Google Maps iframe */}
          <div className="w-full h-48 rounded border border-gold/15 overflow-hidden relative group bg-graphite">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8025219460596!2d72.86311681533038!3d19.06140518709503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c8e6dfd6e35d%3A0xe6dd7be8ba0f0312!2sBandra%20Kurla%20Complex%2C%20Bandra%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(100%) brightness(85%) contrast(110%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CSK corporate map locator"
            />
          </div>
        </div>

        {/* Right CRM Form */}
        <div className="p-8 rounded glass-card bg-graphite/70">
          {success ? (
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-16 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="font-bebas text-2xl tracking-widest text-pearl uppercase">Transmitted Successfully</h3>
              <p className="font-dm text-xs text-platinum max-w-sm leading-relaxed">
                Your coordinates have been indexed in the database leads CRM. Our planning desk will contact you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-jetbrains text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-platinum/50 uppercase">Full Name *</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rohini Nilkani"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-platinum/50 uppercase">Mobile Number *</span>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 90000 77777"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Email Address</span>
                <input
                  type="email"
                  placeholder="e.g. rohini@nilkani.org"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-platinum/50 uppercase">Project Segment</span>
                  <select
                    value={form.project_type}
                    onChange={e => setForm({ ...form, project_type: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none cursor-pointer"
                  >
                    <option value="Residential">Residential Building</option>
                    <option value="Commercial">Commercial Tower</option>
                    <option value="Luxury Villa">Luxury Cantilever Villa</option>
                    <option value="Industrial">Industrial Assembly Forge</option>
                    <option value="Infrastructure">Civic Space Frame Link</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-platinum/50 uppercase">Budget Allocation</span>
                  <select
                    value={form.budget}
                    onChange={e => setForm({ ...form, budget: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none cursor-pointer"
                  >
                    <option value="Under ₹1.5Cr">Under ₹1.5Cr</option>
                    <option value="₹1.5Cr - ₹3Cr">₹1.5Cr - ₹3Cr</option>
                    <option value="₹3Cr - ₹10Cr">₹3Cr - ₹10Cr</option>
                    <option value="₹10Cr - ₹50Cr">₹10Cr - ₹50Cr</option>
                    <option value="Above ₹50Cr">Above ₹50Cr</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Proposed Site Location</span>
                <input
                  type="text"
                  placeholder="e.g. Gachibowli, Hyderabad"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Structural Scope / Comments</span>
                <textarea
                  rows={4}
                  placeholder="Mention target square footage, crane corridors, materials safety parameters..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold hover:bg-champagne text-obsidian font-bold py-4 rounded tracking-widest uppercase transition-colors"
              >
                TRANSMIT SPECIFICATIONS TO HQ CRM
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
