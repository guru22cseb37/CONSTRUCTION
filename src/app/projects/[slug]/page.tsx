import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dbService } from '@/lib/dbService';
import { ArrowLeft, Building2, MapPin, Calendar, Clock, DollarSign, Hammer } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await dbService.getProjectBySlug(slug);

  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | CSK Case Study`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = await dbService.getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      
      {/* Return link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 font-jetbrains text-xs text-gold hover:text-champagne uppercase tracking-widest transition-colors"
      >
        <ArrowLeft size={14} />
        <span>Back to landmarks list</span>
      </Link>

      {/* Header section */}
      <div className="border-b border-gold/15 pb-8 space-y-4">
        <div className="flex items-center gap-2 font-jetbrains text-xs text-gold tracking-wider uppercase">
          <span className="px-2.5 py-0.5 border border-gold/20 bg-gold/5 rounded">
            {project.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {project.location}
          </span>
        </div>
        <h1 className="font-cormorant text-4xl md:text-6xl text-pearl leading-none">
          {project.title}
        </h1>
        <p className="font-dm text-sm md:text-base text-platinum leading-relaxed">
          Detailed engineering analysis and material logistics review.
        </p>
      </div>

      {/* Grid Blueprint Placeholder */}
      <div className="h-[300px] md:h-[400px] w-full rounded border border-gold/15 bg-gradient-to-br from-gold/15 via-graphite to-obsidian relative overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-lg">
        <div className="absolute inset-0 wireframe-pattern opacity-15" />
        <Building2 size={64} className="text-gold/25 animate-pulse mb-4" />
        <span className="font-bebas text-3xl tracking-widest text-pearl uppercase">{project.title} Blueprint</span>
        <span className="font-jetbrains text-[9px] text-platinum tracking-widest uppercase mt-2">
          SURFACE METRIC TOLERANCE: ±0.03mm
        </span>
      </div>

      {/* Summary layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Editorial specs */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="font-cormorant text-3xl text-pearl">Engineering Blueprint Analysis</h2>
          <p className="font-dm text-sm text-platinum leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
          <p className="font-dm text-sm text-platinum leading-relaxed">
            In executing this site, CSK Constructions deployed two dual-segment concrete placement cranes, custom thermal-dampening glass curtain systems, and an integrated seismic structural core. Our planning team maintained an on-site supervisor ratio of 1:12, executing checks at every major concrete compaction.
          </p>
        </div>

        {/* Right Side: Quick Stats Column */}
        <div className="p-6 rounded glass-card border-l-2 border-l-gold h-fit space-y-6">
          <h3 className="font-bebas text-xl text-pearl tracking-widest uppercase">Project Metrics</h3>
          
          <div className="space-y-4 font-jetbrains text-xs">
            <div className="flex items-center gap-3">
              <DollarSign size={16} className="text-gold shrink-0" />
              <div>
                <span className="text-platinum/50 block">BUDGET VALUATION</span>
                <span className="text-gold font-bold">{project.budget}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-gold shrink-0" />
              <div>
                <span className="text-platinum/50 block">TIMELINE LIMIT</span>
                <span className="text-pearl font-bold">{project.timeline}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar size={16} className="text-gold shrink-0" />
              <div>
                <span className="text-platinum/50 block">COMPLETED DATE</span>
                <span className="text-pearl">{new Date(project.created_at).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Hammer size={16} className="text-gold shrink-0" />
              <div>
                <span className="text-platinum/50 block">COMPACTION GRADE</span>
                <span className="text-pearl uppercase">M60 ULTRA HIGH DURABILITY</span>
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className="block w-full text-center py-3 border border-gold text-gold font-jetbrains text-[10px] tracking-widest uppercase hover:bg-gold hover:text-obsidian transition-colors"
          >
            DISCUSS THIS MODEL
          </Link>
        </div>

      </div>

    </div>
  );
}
