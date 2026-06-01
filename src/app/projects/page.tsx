'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { dbService, Project } from '@/lib/dbService';
import { Building2, Eye, MapPin, X } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      const data = await dbService.getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  const filtered = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      
      {/* Header */}
      <div className="border-b border-gold/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">CSK LANDMARKS CATALOG</span>
          <h1 className="font-cormorant text-5xl md:text-7xl text-pearl leading-none mt-1">
            Built Masterworks
          </h1>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 border-b border-gold/10 pb-2 font-jetbrains text-[10px] tracking-wider">
          {['all', 'residential', 'commercial', 'luxury', 'industrial', 'infrastructure'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 uppercase transition-colors rounded ${
                activeCategory === cat 
                  ? 'bg-gold text-obsidian font-bold' 
                  : 'text-platinum hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((proj) => (
          <div
            key={proj.id}
            onClick={() => setSelectedProject(proj)}
            className="group rounded border border-gold/15 bg-graphite overflow-hidden cursor-pointer relative h-[320px] transition-luxury"
          >
            {/* Blueprint Wireframe Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-graphite to-obsidian flex flex-col items-center justify-center p-6 text-center border-b border-gold/10 z-0">
              <div className="absolute inset-0 wireframe-pattern opacity-10" />
              <Building2 size={40} className="text-gold/20 mb-3 group-hover:scale-110 group-hover:text-gold/40 transition-all duration-700" />
              <span className="font-jetbrains text-[10px] text-gold/30 tracking-widest uppercase">
                CSK SEGMENT PRECAST
              </span>
            </div>

            {/* Dark Hover overlay screen */}
            <div className="absolute inset-0 bg-obsidian/85 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6 border-2 border-transparent group-hover:border-gold/30">
              <span className="font-jetbrains text-[9px] text-gold tracking-widest uppercase mb-1">
                {proj.category}
              </span>
              <h4 className="font-cormorant text-2xl text-pearl leading-none mb-2">
                {proj.title}
              </h4>
              <p className="font-dm text-[11px] text-platinum leading-relaxed mb-4 line-clamp-2">
                {proj.description}
              </p>
              
              <div className="flex justify-between items-center border-t border-gold/10 pt-3">
                <span className="font-jetbrains text-[9px] text-platinum">
                  BUDGET: <span className="text-gold">{proj.budget}</span>
                </span>
                <span className="flex items-center gap-1 font-jetbrains text-[9px] text-gold uppercase">
                  VIEW CASE STUDY <Eye size={10} />
                </span>
              </div>
            </div>

            {/* Location tag */}
            <div className="absolute top-4 right-4 z-20 bg-obsidian/60 border border-gold/20 rounded px-2.5 py-1 font-jetbrains text-[9px] text-gold uppercase">
              {proj.location}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox details modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-4xl rounded-lg border border-gold/25 glass-card overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Left Col: Blueprint Wireframe Placeholder */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-gold/20 via-graphite to-obsidian relative min-h-[300px] flex items-center justify-center border-b md:border-b-0 md:border-r border-gold/15">
              <div className="absolute inset-0 wireframe-pattern opacity-15" />
              <div className="p-8 text-center relative z-10 flex flex-col items-center">
                <Building2 size={48} className="text-gold/30 mb-4 animate-pulse" />
                <span className="font-bebas text-3xl text-pearl tracking-widest mb-1">{selectedProject.title}</span>
                <span className="font-jetbrains text-[10px] text-gold tracking-widest uppercase border border-gold/20 px-3 py-1 rounded bg-obsidian/50">
                  {selectedProject.location}
                </span>
              </div>
            </div>

            {/* Right Col: Details specifications panel */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto bg-graphite/95">
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-jetbrains text-[10px] text-gold tracking-widest uppercase">
                      CASE STUDY | {selectedProject.category}
                    </span>
                    <h3 className="font-cormorant text-3xl text-pearl leading-none mt-1">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-1 rounded-full text-platinum hover:text-gold transition-colors hover:bg-white/5"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="font-dm text-xs text-platinum leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Specs list */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold/10 font-jetbrains text-[10px]">
                  <div>
                    <span className="text-platinum/50 uppercase block">INVESTMENT</span>
                    <span className="text-gold font-bold text-sm block mt-0.5">{selectedProject.budget}</span>
                  </div>
                  <div>
                    <span className="text-platinum/50 uppercase block">TIMELINE FRAME</span>
                    <span className="text-pearl block mt-0.5">{selectedProject.timeline}</span>
                  </div>
                  <div>
                    <span className="text-platinum/50 uppercase block">DEVELOPER STATUS</span>
                    <span className="text-pearl block mt-0.5 uppercase">{selectedProject.status}</span>
                  </div>
                  <div>
                    <span className="text-platinum/50 uppercase block">ESTIMATION METHOD</span>
                    <span className="text-pearl block mt-0.5">MILITARY TOLERANCE</span>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex gap-4">
                <Link
                  href={`/projects/${selectedProject.slug}`}
                  className="flex-1 py-3 border border-gold text-center text-gold bg-transparent font-jetbrains text-xs tracking-widest uppercase hover:bg-gold hover:text-obsidian transition-luxury"
                >
                  DEEP STUDY PAGE →
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 py-3 border border-white/20 text-center text-pearl bg-white/5 font-jetbrains text-xs tracking-widest uppercase hover:border-gold transition-colors"
                >
                  CLOSE DIALOG
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
