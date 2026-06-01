'use client';

import { useState, useEffect } from 'react';
import { dbService, Project } from '@/lib/dbService';
import { Plus, Trash2, ShieldCheck, Sparkles } from 'lucide-react';

export default function AdminProjectsCRUD() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'luxury' as Project['category'],
    budget: '',
    timeline: '',
    location: '',
    featured: false
  });
  const [success, setSuccess] = useState(false);

  async function loadProjects() {
    const data = await dbService.getProjects();
    setProjects(data);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.budget) return;

    // Auto-generate slug
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await dbService.createProject({
      title: form.title,
      slug,
      description: form.description || 'Standard corporate landmark.',
      category: form.category,
      images: ['/images/projects/placeholder.jpg'],
      budget: form.budget,
      timeline: form.timeline || '24 Months',
      location: form.location || 'Mumbai',
      status: 'published',
      featured: form.featured
    });

    setSuccess(true);
    setForm({
      title: '',
      description: '',
      category: 'luxury',
      budget: '',
      timeline: '',
      location: '',
      featured: false
    });

    loadProjects();
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Verify requisition to archive this landmark? This action is permanent.')) {
      await dbService.deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="space-y-1">
        <span className="font-jetbrains text-xs text-gold tracking-widest uppercase">PORTFOLIO EDITOR</span>
        <h1 className="font-cormorant text-4xl text-pearl">Landmark Projects Manager</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side Add form */}
        <div className="p-6 rounded glass-card border-l-4 border-l-gold bg-graphite/70 h-fit space-y-6">
          <div className="border-b border-gold/10 pb-4">
            <span className="font-jetbrains text-[9px] text-gold tracking-widest uppercase">
              REGISTER NEW LANDMARK
            </span>
            <h3 className="font-cormorant text-2xl text-pearl leading-none mt-1">
              Add Case Study
            </h3>
          </div>

          {success && (
            <div className="p-3 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-jetbrains text-[10px] rounded text-center">
              ✔ Landmark registered in portfolio table.
            </div>
          )}

          <form onSubmit={handleCreateProject} className="space-y-4 font-jetbrains text-xs">
            <div className="flex flex-col gap-1.5">
              <span className="text-platinum/50 uppercase">Landmark Title *</span>
              <input
                type="text"
                required
                placeholder="e.g. BKC Commercial Hub"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Investment *</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. $85,000,000"
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Timeline</span>
                <input
                  type="text"
                  placeholder="e.g. 24 Months"
                  value={form.timeline}
                  onChange={e => setForm({ ...form, timeline: e.target.value })}
                  className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Segment</span>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value as Project['category'] })}
                  className="bg-obsidian border border-white/10 rounded px-2.5 py-2 text-pearl focus:border-gold outline-none cursor-pointer"
                >
                  <option value="luxury">Luxury Villa</option>
                  <option value="commercial">Commercial Tower</option>
                  <option value="residential">Apartments</option>
                  <option value="industrial">Heavy Forge</option>
                  <option value="infrastructure">Space Frame</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Location</span>
                <input
                  type="text"
                  placeholder="e.g. BKC, Mumbai"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                  className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-platinum/50 uppercase">Scope Specifications</span>
              <textarea
                rows={3}
                placeholder="Exposed concrete, structural cantilevers details..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none resize-none"
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer font-jetbrains text-[10px] text-pearl py-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={e => setForm({ ...form, featured: e.target.checked })}
                className="accent-gold"
              />
              <span>Feature on homepage editorial spreads</span>
            </label>

            <button
              type="submit"
              className="w-full bg-gold hover:bg-champagne text-obsidian font-bold py-3 rounded tracking-widest uppercase transition-colors"
            >
              REGISTER LANDMARK
            </button>
          </form>
        </div>

        {/* Right Side Projects Table List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded border border-gold/15 bg-graphite/40 overflow-x-auto">
            <table className="w-full text-left font-dm text-xs">
              <thead className="bg-obsidian font-jetbrains text-[9px] text-platinum/50 uppercase tracking-widest border-b border-gold/10">
                <tr>
                  <th className="p-4">Title / Location</th>
                  <th className="p-4">Investment</th>
                  <th className="p-4">Segment</th>
                  <th className="p-4">Feat.</th>
                  <th className="p-4 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map(p => (
                  <tr key={p.id} className="hover:bg-white/2">
                    <td className="p-4">
                      <span className="text-pearl font-bold block">{p.title}</span>
                      <span className="text-platinum/50 text-[9px] font-jetbrains block">{p.location}</span>
                    </td>
                    <td className="p-4 font-jetbrains text-gold">{p.budget}</td>
                    <td className="p-4 uppercase font-jetbrains text-[9px] text-platinum/80">{p.category}</td>
                    <td className="p-4">
                      {p.featured ? (
                        <span title="Featured Spreads"><Sparkles size={12} className="text-gold" /></span>
                      ) : (
                        <span className="text-platinum/30">-</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-amber-500 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
