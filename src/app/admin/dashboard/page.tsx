'use client';

import { useState, useEffect } from 'react';
import { 
  Users, Building2, BookOpen, MessageSquare, 
  TrendingUp, Activity, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { dbService, Lead, Project, BlogPost, Testimonial } from '@/lib/dbService';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    async function loadStats() {
      const l = await dbService.getLeads();
      const p = await dbService.getProjects();
      const b = await dbService.getBlogPosts();
      const t = await dbService.getTestimonials();
      
      setLeads(l);
      setProjects(p);
      setPosts(b);
      setReviews(t);
      setMounted(true);
    }
    loadStats();
  }, []);

  // Compute stats
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const convertedLeads = leads.filter(l => l.status === 'converted').length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  // Chart Mock Data detailing weekly conversion curves
  const leadTrendData = [
    { name: 'Week 1', Leads: 12, Converted: 3 },
    { name: 'Week 2', Leads: 19, Converted: 6 },
    { name: 'Week 3', Leads: 15, Converted: 8 },
    { name: 'Week 4', Leads: 28, Converted: 14 },
    { name: 'Week 5', Leads: 24, Converted: 18 },
    { name: 'Week 6', Leads: totalLeads > 0 ? totalLeads : 35, Converted: convertedLeads > 0 ? convertedLeads : 22 },
  ];

  const categoryData = [
    { name: 'Luxury', count: projects.filter(p => p.category === 'luxury').length || 2 },
    { name: 'Commercial', count: projects.filter(p => p.category === 'commercial').length || 2 },
    { name: 'Residential', count: projects.filter(p => p.category === 'residential').length || 2 },
    { name: 'Industrial', count: projects.filter(p => p.category === 'industrial').length || 1 },
    { name: 'Infra', count: projects.filter(p => p.category === 'infrastructure').length || 2 },
  ];

  if (!mounted) return (
    <div className="flex items-center justify-center py-20">
      <span className="inline-block w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      
      {/* Page Title */}
      <div className="space-y-1">
        <span className="font-jetbrains text-xs text-gold tracking-widest uppercase">DIAGNOSTIC TELEMETRY</span>
        <h1 className="font-cormorant text-4xl text-pearl">Dashboard Overview</h1>
      </div>

      {/* Metrics Card Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Requisitions', value: totalLeads, desc: 'Total leads captured', icon: <Users size={20} className="text-gold" /> },
          { label: 'New / Uncontacted', value: newLeads, desc: 'Needs architect follow-up', icon: <Activity size={20} className="text-amber-500 animate-pulse" /> },
          { label: 'Successful Conversion', value: `${conversionRate}%`, desc: 'Average converter weight', icon: <TrendingUp size={20} className="text-emerald-500" /> },
          { label: 'Trophy Landmarks', value: projects.length, desc: 'Active detailed case projects', icon: <Building2 size={20} className="text-gold" /> }
        ].map((met, idx) => (
          <div key={idx} className="p-6 rounded border border-gold/10 bg-graphite/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold/30 to-transparent" />
            <div className="flex justify-between items-center mb-3">
              <span className="font-jetbrains text-[9px] text-platinum/50 uppercase tracking-wider">{met.label}</span>
              <div className="p-2 border border-white/5 bg-white/3 rounded">
                {met.icon}
              </div>
            </div>
            <div className="font-bebas text-3xl text-pearl tracking-wider">{met.value}</div>
            <span className="font-dm text-[10px] text-platinum/60 block mt-1">{met.desc}</span>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recharts Area Curve */}
        <div className="lg:col-span-2 p-6 rounded glass-card space-y-4">
          <div className="flex justify-between items-center border-b border-gold/10 pb-4">
            <span className="font-bebas text-lg tracking-widest text-pearl uppercase">Lead Acquisition Curve</span>
            <span className="font-jetbrains text-[8px] text-gold">WEEKLY RESOLUTIONS</span>
          </div>
          <div className="h-64 w-full font-jetbrains text-[10px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={leadTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="name" stroke="#8A8A8A" />
                <YAxis stroke="#8A8A8A" />
                <Tooltip contentStyle={{ backgroundColor: '#161616', borderColor: 'rgba(212, 175, 55, 0.25)', color: '#F5F0E8' }} />
                <Area type="monotone" dataKey="Leads" stroke="#D4AF37" fillOpacity={1} fill="url(#colorLeads)" />
                <Area type="monotone" dataKey="Converted" stroke="#10b981" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div className="p-6 rounded glass-card space-y-4">
          <div className="flex justify-between items-center border-b border-gold/10 pb-4">
            <span className="font-bebas text-lg tracking-widest text-pearl uppercase">Segment Weights</span>
            <span className="font-jetbrains text-[8px] text-gold">PORTFOLIO</span>
          </div>
          <div className="h-64 w-full font-jetbrains text-[10px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="name" stroke="#8A8A8A" />
                <YAxis stroke="#8A8A8A" />
                <Tooltip contentStyle={{ backgroundColor: '#161616', borderColor: 'rgba(212, 175, 55, 0.25)', color: '#F5F0E8' }} />
                <Bar dataKey="count" fill="#D4AF37" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent leads activity table */}
      <div className="p-6 rounded glass-card space-y-4">
        <div className="flex justify-between items-center border-b border-gold/10 pb-4">
          <span className="font-bebas text-lg tracking-widest text-pearl uppercase">Recent Activity Feed</span>
          <span className="font-jetbrains text-[8px] text-gold">SECURE LOGS</span>
        </div>

        <div className="space-y-4 font-jetbrains text-xs">
          {leads.slice(0, 4).map((lead) => (
            <div key={lead.id} className="flex justify-between items-center p-3 border border-white/5 bg-white/3 rounded hover:border-gold/25 transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 rounded">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <span className="text-pearl block font-medium">{lead.name} submitted a new quote sheet</span>
                  <span className="text-platinum/50 text-[9px] block">Segment: {lead.project_type} | Budget: {lead.budget}</span>
                </div>
              </div>
              <span className="text-platinum/50 text-[9px]">
                {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {leads.length === 0 && (
            <div className="text-center py-6 text-platinum/50">
              No recent leads recorded. System standing by.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
