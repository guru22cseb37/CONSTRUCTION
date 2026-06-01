'use client';

import { useState, useEffect } from 'react';
import { dbService, Lead } from '@/lib/dbService';
import { Search, Phone, Mail, Filter, CheckCircle2, PhoneCall, ExternalLink, RefreshCw } from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  async function loadLeads() {
    const data = await dbService.getLeads();
    setLeads(data);
  }

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (id: string, status: Lead['status']) => {
    await dbService.updateLeadStatus(id, status);
    loadLeads(); // reload
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => prev ? { ...prev, status } : null);
    }
  };

  const filtered = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                          l.phone.includes(search) || 
                          l.email.toLowerCase().includes(search.toLowerCase()) ||
                          l.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || l.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="space-y-1">
        <span className="font-jetbrains text-xs text-gold tracking-widest uppercase">CLIENT INBOX</span>
        <h1 className="font-cormorant text-4xl text-pearl">Lead CRM Center</h1>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between font-jetbrains text-xs">
        <div className="flex items-center gap-2 bg-obsidian border border-white/10 rounded px-3 py-2 flex-1 max-w-md">
          <Search size={14} className="text-gold/60" />
          <input
            type="text"
            placeholder="Search leads name, phone, locations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent border-none text-pearl outline-none w-full"
          />
        </div>

        <div className="flex gap-3 items-center">
          <Filter size={14} className="text-gold" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-graphite border border-white/10 rounded px-3 py-2 text-pearl outline-none cursor-pointer"
          >
            <option value="all">ALL RESOLUTIONS</option>
            <option value="new">NEW INQUIRIES</option>
            <option value="contacted">CONTACTED STAGE</option>
            <option value="converted">CONVERTED LANDMARKS</option>
            <option value="closed">CLOSED LOCKS</option>
          </select>
          
          <button
            onClick={loadLeads}
            className="p-2 border border-gold/20 bg-white/5 rounded text-gold hover:bg-gold/10 transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Grid of Leads list & Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leads Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded border border-gold/15 bg-graphite/40 overflow-x-auto">
            <table className="w-full text-left font-dm text-xs">
              <thead className="bg-obsidian font-jetbrains text-[9px] text-platinum/50 uppercase tracking-widest border-b border-gold/10">
                <tr>
                  <th className="p-4">Name / Date</th>
                  <th className="p-4">Project Segment</th>
                  <th className="p-4">Site Location</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(l => (
                  <tr
                    key={l.id}
                    onClick={() => setSelectedLead(l)}
                    className={`cursor-pointer hover:bg-white/3 transition-colors ${
                      selectedLead?.id === l.id ? 'bg-gold/5' : ''
                    }`}
                  >
                    <td className="p-4">
                      <span className="text-pearl font-bold block">{l.name}</span>
                      <span className="text-platinum/50 text-[9px] font-jetbrains block">
                        {new Date(l.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-4 uppercase font-jetbrains text-[10px] text-gold">{l.project_type}</td>
                    <td className="p-4 text-platinum">{l.location}</td>
                    <td className="p-4 font-jetbrains">
                      <span className={`px-2 py-0.5 border text-[9px] rounded uppercase ${
                        l.status === 'new' ? 'border-amber-500/30 bg-amber-500/5 text-amber-500' :
                        l.status === 'contacted' ? 'border-blue-500/30 bg-blue-500/5 text-blue-400' :
                        l.status === 'converted' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400 font-bold' :
                        'border-platinum/30 bg-platinum/5 text-platinum/70'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-platinum/50">
                      No matching CRM logs recorded. Standing by.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Lead details panel */}
        <div className="p-6 rounded glass-card border-l-4 border-l-gold bg-graphite/70 h-fit space-y-6">
          {selectedLead ? (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="border-b border-gold/10 pb-4">
                <span className="font-jetbrains text-[9px] text-gold tracking-widest uppercase">
                  CRM LOG RECORD
                </span>
                <h3 className="font-cormorant text-2xl text-pearl leading-none mt-1">
                  {selectedLead.name}
                </h3>
              </div>

              {/* Data fields */}
              <div className="space-y-4 font-dm text-xs">
                <div>
                  <span className="font-jetbrains text-[9px] text-platinum/50 uppercase block">Project Type</span>
                  <span className="text-gold font-bold uppercase">{selectedLead.project_type}</span>
                </div>
                <div>
                  <span className="font-jetbrains text-[9px] text-platinum/50 uppercase block">Investment Target</span>
                  <span className="text-pearl font-bold">{selectedLead.budget}</span>
                </div>
                <div>
                  <span className="font-jetbrains text-[9px] text-platinum/50 uppercase block">Site Location</span>
                  <span className="text-pearl">{selectedLead.location}</span>
                </div>
                <div>
                  <span className="font-jetbrains text-[9px] text-platinum/50 uppercase block">Client Coordinates</span>
                  <div className="flex flex-col gap-1 mt-1 font-jetbrains text-[10px]">
                    <a href={`tel:${selectedLead.phone}`} className="flex items-center gap-1.5 text-platinum hover:text-gold transition-colors">
                      <Phone size={12} className="text-gold" />
                      <span>{selectedLead.phone}</span>
                    </a>
                    {selectedLead.email && (
                      <a href={`mailto:${selectedLead.email}`} className="flex items-center gap-1.5 text-platinum hover:text-gold transition-colors">
                        <Mail size={12} className="text-gold" />
                        <span>{selectedLead.email}</span>
                      </a>
                    )}
                  </div>
                </div>

                <div>
                  <span className="font-jetbrains text-[9px] text-platinum/50 uppercase block">Project Description</span>
                  <p className="text-platinum leading-relaxed mt-1 p-3 bg-obsidian border border-white/5 rounded italic">
                    "{selectedLead.message}"
                  </p>
                </div>

                {/* Status selector */}
                <div className="flex flex-col gap-1.5 font-jetbrains text-[10px]">
                  <span className="text-platinum/50 uppercase block">Update Pipeline Resolution</span>
                  <select
                    value={selectedLead.status}
                    onChange={e => handleStatusChange(selectedLead.id, e.target.value as Lead['status'])}
                    className="bg-obsidian border border-white/10 rounded px-2.5 py-1.5 text-pearl outline-none cursor-pointer"
                  >
                    <option value="new">NEW RECORD</option>
                    <option value="contacted">CONTACTED CUSTOMER</option>
                    <option value="converted">CONVERTED TO LANDMARK</option>
                    <option value="closed">CLOSED ARCHIVE</option>
                  </select>
                </div>
              </div>

              {/* CRM Actions */}
              <div className="pt-6 border-t border-gold/10 flex flex-col gap-2 font-jetbrains text-[10px]">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(selectedLead.name)},%20I%27m%20the%20Chief%20Project%20Estimator%20from%20CSK%20Constructions.%20I%20have%20received%20your%20quote%20request.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 uppercase tracking-widest rounded"
                >
                  <PhoneCall size={12} />
                  <span>WHATSAPP TEMPLATE</span>
                  <ExternalLink size={10} />
                </a>
              </div>

            </div>
          ) : (
            <div className="text-center py-16 text-platinum/50 font-jetbrains text-xs">
              Select a lead record to load detailed CRM telemetry and direct whatsapp templates.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
