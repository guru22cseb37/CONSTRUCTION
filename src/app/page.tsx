'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, Home, Warehouse, HardHat, ShieldCheck, Clock, 
  Coins, ArrowRight, MapPin, Award, Sparkles, Send, 
  Calculator, Check, ChevronRight, MessageSquare, Phone, 
  CheckCircle, Plus, Eye, ChevronLeft, Calendar, X, User
} from 'lucide-react';
import { dbService, Project, Testimonial } from '@/lib/dbService';

export default function HomePage() {
  // Database datasets loaded reactively
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  // Interactive UI State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState<number>(0);
  
  // Custom Stats Animation
  const [stats, setStats] = useState({ projects: 0, years: 0, satisfaction: 0, awards: 0 });

  // Construction Cost Calculator State
  const [calcInputs, setCalcInputs] = useState({
    projectType: 'luxury-villa',
    area: 2500,
    quality: 'ultra-premium',
    location: 'metro'
  });
  const [calcResult, setCalcResult] = useState<{
    minCost: number;
    maxCost: number;
    duration: string;
    description: string;
  } | null>(null);

  // Lead Form State
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    project_type: 'Luxury Villa',
    budget: '₹1.5Cr - ₹3Cr',
    location: '',
    message: ''
  });
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load Data and Trigger Count-ups
  useEffect(() => {
    setMounted(true);
    async function loadData() {
      const projs = await dbService.getProjects();
      const tests = await dbService.getTestimonials();
      setProjects(projs);
      setTestimonials(tests);
    }
    loadData();

    // Trigger parametric stat counts
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic
      const easeProgress = progress * (2 - progress);

      setStats({
        projects: Math.floor(easeProgress * 500),
        years: Math.floor(easeProgress * 25),
        satisfaction: Math.floor(easeProgress * 98),
        awards: Math.floor(easeProgress * 50)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    calculateCost();
  }, []);

  // Recalculate construction costs dynamically
  const calculateCost = () => {
    const { projectType, area, quality, location } = calcInputs;
    
    // Base cost per sqft
    let baseRate = 2500;
    if (projectType === 'commercial') baseRate = 4500;
    if (projectType === 'luxury-villa') baseRate = 7000;
    if (projectType === 'industrial') baseRate = 2200;
    if (projectType === 'infrastructure') baseRate = 8500;

    // Quality multiplier
    let qualityMult = 1.0;
    if (quality === 'premium') qualityMult = 1.35;
    if (quality === 'ultra-premium') qualityMult = 1.85;

    // Location modifier
    let locMod = 1.0;
    if (location === 'metro') locMod = 1.2;
    if (location === 'tier-2') locMod = 1.05;

    const ratePerSqft = baseRate * qualityMult * locMod;
    const estimatedCost = area * ratePerSqft;

    const minCost = Math.round(estimatedCost * 0.95);
    const maxCost = Math.round(estimatedCost * 1.10);
    
    let duration = '12 - 16 Months';
    if (area > 5000) duration = '18 - 24 Months';
    if (projectType === 'infrastructure' || projectType === 'commercial') duration = '30 - 40 Months';

    let desc = 'Exquisite raw structures designed with Zaha Hadid inspired curvatures, exposed architectural concrete columns, suspended ceilings, and warm golden frames.';

    setCalcResult({
      minCost,
      maxCost,
      duration,
      description: desc
    });
  };

  // Run calculation whenever input variables change
  useEffect(() => {
    calculateCost();
  }, [calcInputs]);

  // Lead Submission Handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    try {
      await dbService.submitLead({
        name: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email || 'no-email@csk.com',
        project_type: leadForm.project_type,
        budget: leadForm.budget,
        location: leadForm.location || 'Not Specified',
        message: leadForm.message || 'Standard inquiry submission.'
      });
      setLeadSuccess(true);
      setTimeout(() => {
        setLeadSuccess(false);
        setLeadForm({
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

  // Filtered case studies
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Featured Projects List (3 editorial pieces)
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);

  // 9 specialized Services List
  const services = [
    {
      title: 'Residential Construction',
      desc: 'Legacy multi-family high-rises and residential communities built with certified low-carbon concrete frames and modern sky-gardens.',
      icon: <Home className="text-gold" size={24} />,
      badge: 'ETERNAL SLABS'
    },
    {
      title: 'Commercial Buildings',
      desc: 'Soaring steel skyscrapers and prime commercial towers incorporating suspended cantilevers and gold-tinted curtain wall glass.',
      icon: <Building2 className="text-gold" size={24} />,
      badge: 'TROPHY TOWERS'
    },
    {
      title: 'Luxury Villas',
      desc: 'Exclusive, custom sea-facing cantilevered villas fusing raw brutalist concrete envelopes with polished wooden frames.',
      icon: <Sparkles className="text-gold" size={24} />,
      badge: 'ZAHA GEOMETRY'
    },
    {
      title: 'Apartments & Communities',
      desc: 'High-density luxury gated developments featuring centralized solar micro-grids and localized advanced clean air systems.',
      icon: <Building2 className="text-gold" size={24} />,
      badge: 'SMART DISTRICTS'
    },
    {
      title: 'Infrastructure Projects',
      desc: 'Double-curved space frames, high-load segmental viaduct spans, and deep-piled marine bridge connectors.',
      icon: <Warehouse className="text-gold" size={24} />,
      badge: 'CIVIC LEGACIES'
    },
    {
      title: 'Industrial Facilities',
      desc: 'Automated manufacturing forges built with massive fiber-reinforced steel slabs capable of absorbing high machinery impact.',
      icon: <Warehouse className="text-gold" size={24} />,
      badge: 'HEAVY FORGES'
    },
    {
      title: 'Interior Solutions',
      desc: 'Pre-fitted spaces containing hand-polished bronze, custom marble accents, obsidian backdrops, and acoustic glass baffles.',
      icon: <Award className="text-gold" size={24} />,
      badge: 'GOLD INLAYS'
    },
    {
      title: 'Renovation Services',
      desc: 'Structural reinforcements, facade upgrades, and core architectural retrofits transforming aged assets into modern masterpieces.',
      icon: <HardHat className="text-gold" size={24} />,
      badge: 'CORE RETROFITS'
    },
    {
      title: 'Project Management',
      desc: 'End-to-end turnkey project execution utilizing military precision, strict scheduling, and complete zero-noise budgets.',
      icon: <Clock className="text-gold" size={24} />,
      badge: 'MILITARY AUDITS'
    }
  ];

  // 7-step journey process
  const processSteps = [
    { title: 'Consultation', est: '1 - 2 Weeks', desc: 'Direct engagement with our design leads. We analyze the client’s legacy vision, topographic conditions, and architectural boundaries.' },
    { title: 'Planning', est: '3 - 4 Weeks', desc: 'Drafting strict critical-path schedule models (CPM) and conducting preliminary material supply assessments.' },
    { title: 'Design', est: '4 - 8 Weeks', desc: 'Developing high-fidelity 3D BIM models on Revit. Detailing gold structural joints and volcanic aggregates.' },
    { title: 'Approval', est: '2 - 4 Weeks', desc: 'Expediting zoning licenses, municipal codes, and structural safety board certifications with transparent reporting.' },
    { title: 'Construction', est: 'Varies', desc: 'Breaking ground. Double-shift site cycles led by certified managers utilizing high-load concrete segment cranes.' },
    { title: 'Inspection', est: '2 Weeks', desc: 'Millimeter-tolerance laser scan audits, concrete compaction testing, and dynamic wind-load dampening checks.' },
    { title: 'Handover', est: '1 Week', desc: 'Transferring the keys to your new digital and physical headquarters. Complete catalog of structural logs delivered.' }
  ];

  // Testimonials track index
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <span className="inline-block w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen select-none">
      
      {/* 🎬 HERO SECTION */}
      <section className="relative h-[calc(100vh-6rem)] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-gold/10">
        {/* Background Image with Gold Wireframe overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_wireframe.png"
            alt="CSK architectural hero wireframe banner"
            fill
            priority
            className="object-cover opacity-20 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-transparent z-10" />
          <div className="absolute inset-0 wireframe-pattern opacity-10" />
        </div>

        {/* Diagonal Gold Light Stream entering from top-left */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden">
          <div className="absolute top-[-50%] left-[-20%] w-[150%] h-[10px] bg-gradient-to-r from-transparent via-gold/15 to-transparent rotate-45 transform translate-y-[200px] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-20 flex flex-col items-start text-left pt-12">
          {/* Label technical */}
          <div className="flex items-center gap-2 mb-4 font-jetbrains text-xs text-gold tracking-[0.3em] uppercase">
            <span className="inline-block w-2 h-[1px] bg-gold shadow-[0_0_8px_#D4AF37]" />
            <span>ESTABLISHED 2001 | SPECIALIZED INFRASTRUCTURE</span>
          </div>

          {/* Master Cormorant Garamond Title */}
          <h1 className="font-cormorant text-5xl md:text-8xl lg:text-9xl text-pearl leading-none tracking-tight mb-3">
            CSK CONSTRUCTIONS
          </h1>

          {/* Staggered reveal title subheading in Bebas Neue */}
          <div className="overflow-hidden mb-6">
            <h2 className="font-bebas text-3xl md:text-6xl lg:text-7xl text-pearl tracking-wider uppercase leading-none border-b border-gold/25 pb-4">
              BUILDING TOMORROW'S <span className="text-gold glow-text-gold">LANDMARKS TODAY</span>
            </h2>
          </div>

          <p className="font-dm text-sm md:text-lg text-platinum max-w-2xl leading-relaxed mb-8">
            "Delivering exceptional residential, commercial, and infrastructure projects through innovation, precision engineering, and uncompromising quality."
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
            <a
              href="#contact"
              className="px-8 py-4 border border-gold bg-gold hover:bg-champagne text-obsidian text-center font-jetbrains text-xs tracking-widest uppercase font-bold transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              Start Your Project →
            </a>
            <a
              href="#portfolio"
              className="px-8 py-4 border border-white/20 bg-white/5 hover:border-gold text-pearl text-center font-jetbrains text-xs tracking-widest uppercase transition-all"
            >
              Explore Portfolio ↗
            </a>
          </div>

          {/* Statistics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full pt-6 border-t border-white/10">
            {[
              { label: 'Completed Landmarks', count: stats.projects, suffix: '+' },
              { label: 'Years of Engineering', count: stats.years, suffix: ' Yrs' },
              { label: 'Client Satisfaction', count: stats.satisfaction, suffix: '%' },
              { label: 'Architectural Awards', count: stats.awards, suffix: '+' }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded border border-gold/10 bg-white/3 backdrop-blur-md flex flex-col justify-start relative group overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold/50 to-transparent" />
                <span className="font-bebas text-3xl md:text-4xl text-pearl tracking-widest flex items-baseline">
                  {stat.count}
                  <span className="text-gold text-xl ml-0.5">{stat.suffix}</span>
                </span>
                <span className="font-jetbrains text-[9px] text-platinum tracking-widest uppercase mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 1. 🏛️ ABOUT CSK */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 border-b border-gold/10" id="about">
        {/* Left Side: Editorial */}
        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-2 font-jetbrains text-xs text-gold tracking-[0.2em] uppercase">
            <span className="inline-block w-1.5 h-[1px] bg-gold" />
            <span>01 / HISTORICAL LEGACY</span>
          </div>
          <h2 className="font-cormorant text-4xl md:text-6xl text-pearl leading-tight">
            Building Beyond Boundaries, Fusing Strength & Refinement
          </h2>
          <p className="font-dm text-sm text-platinum leading-relaxed">
            At CSK Constructions, we do not simply manage job sites — we craft legacy landmarks. Founded in 2001, our team has integrated advanced core-suspension skyscrapers, complex viaduct infrastructure, and bespoke residential concrete monoliths under a zero-compromise approach.
          </p>
          <div className="p-6 border-l-2 border-gold bg-gold/5 rounded-r">
            <p className="font-cormorant italic text-lg text-pearl leading-relaxed">
              "We approach every structure as a Zaha Hadid masterpiece built with a Swiss watchmaker’s mathematical precision. If a project does not carry structural confidence, it is not a CSK project."
            </p>
            <span className="block mt-3 font-jetbrains text-[10px] text-gold tracking-widest uppercase">
              — C. SHIVAKUMAR, FOUNDING CHAIRMAN
            </span>
          </div>
        </div>

        {/* Right Side: Stacked Vertical Timeline */}
        <div className="flex flex-col justify-start relative pl-8 py-4">
          <div className="absolute left-[7px] top-0 w-[2px] h-full bg-gradient-to-b from-gold via-gold/50 to-transparent" />
          
          {[
            { year: '2001', title: 'Groundbreaking Foundation', desc: 'Started as a custom industrial concrete contractor in Chennai with zero compromise on raw aggregates.' },
            { year: '2007', title: 'High-Rise Vertical Launch', desc: 'Constructed our first 30-story residential high-rise featuring smart solar slabs and seismic safety checks.' },
            { year: '2015', title: 'Major Infrastructure Viaducts', desc: 'Awarded heavy national road segment contracts, engineering pre-stressed hollow span bridges.' },
            { year: '2023', title: 'Obsidian Luxury Headquarters', desc: 'Pioneered Brutalist Luxury, fusing exposed concrete structures with hand-polished bronze, custom inlays, and AI estimates.' }
          ].map((milestone, index) => (
            <div key={index} className="mb-8 relative group">
              {/* Gold dot connected on timeline */}
              <div className="absolute left-[-37px] top-1.5 w-4 h-4 rounded-full border border-gold bg-obsidian flex items-center justify-center z-10 group-hover:bg-gold transition-colors duration-300">
                <div className="w-1.5 h-1.5 rounded-full bg-gold group-hover:bg-obsidian" />
              </div>
              <span className="font-bebas text-2xl text-gold tracking-wider">{milestone.year}</span>
              <h4 className="font-cormorant text-xl text-pearl mt-0.5">{milestone.title}</h4>
              <p className="font-dm text-xs text-platinum leading-relaxed mt-1">
                {milestone.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. 🏗️ SERVICES (9 cards in 3x3 grid) */}
      <section className="py-24 bg-graphite/40 border-b border-gold/10" id="services">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">02 / CORE CAPABILITIES</span>
            <h2 className="font-cormorant text-4xl md:text-6xl text-pearl max-w-3xl">
              Nine Verticals, Engineered with Military Precision
            </h2>
            <div className="w-20 h-[1px] bg-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv, idx) => (
              <div
                key={idx}
                className="p-8 rounded glass-card relative group flex flex-col justify-between overflow-hidden h-[260px]"
              >
                {/* Subtle gold bottom gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center">
                    <div className="p-3 border border-gold/25 bg-gold/5 rounded">
                      {srv.icon}
                    </div>
                    <span className="font-jetbrains text-[9px] text-amber-500/80 tracking-widest border border-amber-500/15 bg-amber-500/5 px-2 py-0.5 rounded">
                      {srv.badge}
                    </span>
                  </div>
                  <h3 className="font-bebas text-2xl text-pearl tracking-wider group-hover:text-gold transition-colors">
                    {srv.title}
                  </h3>
                  <p className="font-dm text-xs text-platinum leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-4 relative z-10 flex items-center gap-1.5 font-jetbrains text-[10px] text-gold tracking-widest opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-luxury">
                  <span>DISCUSS PROJECT</span>
                  <ArrowRight size={10} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. 🖼️ PORTFOLIO SHOWCASE & LIGHTBOX */}
      <section className="py-24 border-b border-gold/10" id="portfolio">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="space-y-4">
              <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">03 / ACTIVE MONOLITHS</span>
              <h2 className="font-cormorant text-4xl md:text-6xl text-pearl">
                Our Landmark Case Studies
              </h2>
            </div>
            {/* Filter bar */}
            <div className="flex flex-wrap gap-2 border-b border-gold/15 pb-2 font-jetbrains text-[10px] tracking-wider">
              {['all', 'residential', 'commercial', 'luxury', 'industrial', 'infrastructure'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 uppercase transition-colors rounded ${
                    activeCategory === cat 
                      ? 'bg-gold text-obsidian font-bold shadow-[0_0_8px_rgba(212,175,55,0.3)]' 
                      : 'text-platinum hover:text-gold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group rounded border border-gold/15 bg-graphite overflow-hidden cursor-pointer relative h-[320px] transition-luxury"
              >
                {/* Fake luxury layout placeholder background (to prevent broken image crash and fit style) */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-graphite to-obsidian flex flex-col items-center justify-center p-6 text-center border-b border-gold/10 z-0">
                  <div className="absolute inset-0 wireframe-pattern opacity-10" />
                  <Building2 size={40} className="text-gold/20 mb-3 group-hover:scale-110 group-hover:text-gold/40 transition-all duration-700" />
                  <span className="font-jetbrains text-[10px] text-gold/30 tracking-widest uppercase">
                    CSK STRUCTURAL PRECAST
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
                      VIEW STUDY <Eye size={10} />
                    </span>
                  </div>
                </div>

                {/* Tiny corner gold highlight tag */}
                <div className="absolute top-4 right-4 z-20 bg-obsidian/60 border border-gold/20 rounded px-2.5 py-1 font-jetbrains text-[9px] text-gold uppercase">
                  {proj.location}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
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

            {/* Right Col: Details Specifications Panel */}
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
                  DEEP REVIEWS →
                </Link>
                <a
                  href="#contact"
                  onClick={() => {
                    setSelectedProject(null);
                    setLeadForm({
                      ...leadForm,
                      project_type: selectedProject.category.toUpperCase(),
                      message: `Inquired regarding a project similar to: ${selectedProject.title}`
                    });
                  }}
                  className="flex-1 py-3 border border-white/20 text-center text-pearl bg-white/5 font-jetbrains text-xs tracking-widest uppercase hover:border-gold transition-colors"
                >
                  DISCUSS SIMILAR
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 4. 📰 FEATURED PROJECTS spreads */}
      <section className="py-24 bg-graphite/20 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-start mb-16 space-y-4">
            <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">04 / THE CROWN JEWELS</span>
            <h2 className="font-cormorant text-4xl md:text-6xl text-pearl">
              Featured Corporate Case Studies
            </h2>
            <div className="w-20 h-[1px] bg-gold" />
          </div>

          <div className="space-y-20">
            {featuredProjects.map((proj, idx) => (
              <div 
                key={proj.id} 
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Cinematic Image Frame */}
                <div className="w-full lg:w-3/5 h-[350px] md:h-[450px] relative rounded border border-gold/15 overflow-hidden bg-gradient-to-tr from-gold/15 via-graphite to-obsidian">
                  <div className="absolute inset-0 wireframe-pattern opacity-10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Award size={48} className="text-gold/25 animate-pulse mb-3" />
                    <span className="font-bebas text-2xl tracking-widest text-pearl uppercase">CSK FEATURED LANDMARK</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-obsidian/75 border border-gold/20 px-3 py-1.5 rounded font-jetbrains text-[10px] text-gold uppercase">
                    {proj.location}
                  </div>
                </div>

                {/* Floating Glass Spec Card (Right/Left Aligned) */}
                <div className="w-full lg:w-2/5 p-8 rounded glass-card border-l-4 border-l-gold relative">
                  <span className="font-jetbrains text-[9px] text-amber-500 tracking-[0.2em] uppercase font-bold">
                    PREMIUM CASE STUDY 0{idx + 1}
                  </span>
                  <h3 className="font-cormorant text-3xl md:text-4xl text-pearl leading-none mt-1 mb-4">
                    {proj.title}
                  </h3>
                  <p className="font-dm text-xs text-platinum leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gold/10 font-jetbrains text-[10px] mb-6">
                    <div>
                      <span className="text-platinum/50 block">PROJECT SCOPE</span>
                      <span className="text-pearl block mt-0.5 uppercase">{proj.category}</span>
                    </div>
                    <div>
                      <span className="text-platinum/50 block">TOTAL INVESTMENT</span>
                      <span className="text-gold block font-semibold mt-0.5">{proj.budget}</span>
                    </div>
                    <div>
                      <span className="text-platinum/50 block">TIMELINE LIMIT</span>
                      <span className="text-pearl block mt-0.5">{proj.timeline}</span>
                    </div>
                    <div>
                      <span className="text-platinum/50 block">TOLERANCE STATUS</span>
                      <span className="text-pearl block mt-0.5 uppercase">VERIFIED ✔</span>
                    </div>
                  </div>

                  <Link 
                    href={`/projects/${proj.slug}`}
                    className="inline-flex items-center gap-2 font-jetbrains text-xs text-gold hover:text-champagne uppercase tracking-widest"
                  >
                    <span>View Full Breakdown Case Study</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. 🏆 WHY CHOOSE CSK (01-06 grid) */}
      <section className="py-24 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">05 / TRUST & PRECISION</span>
            <h2 className="font-cormorant text-4xl md:text-6xl text-pearl">
              Zero-Noise Construction Frameworks
            </h2>
            <div className="w-20 h-[1px] bg-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Engineering Excellence', desc: 'Custom core-suspension designs, mass dampeners, and space-frame structures calculated for absolute resilience.' },
              { num: '02', title: 'Certified Professionals', desc: 'Over 120 certified high-rise structural estimators, BIM coordinators, and on-site veteran supervisors.' },
              { num: '03', title: 'Sustainable Construction', desc: 'Fly-ash volcanic low-carbon concrete slab mixes and graywater closed-loop loops minimizing footprint by 40%.' },
              { num: '04', title: 'On-Time Handovers', desc: 'Strict Critical Path Method (CPM) algorithms ensuring milestones are met on time with military consistency.' },
              { num: '05', title: 'Quality Auditing', desc: 'Laser-guided scanning, concrete cube compression testing, and double-dampening architectural certification.' },
              { num: '06', title: 'Transparent CRM', desc: 'Daily project reports uploaded to the admin panel, complete lead scoping grids, and cost logs accessible 24/7.' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="p-8 rounded border border-gold/10 bg-graphite/40 relative overflow-hidden group hover:border-gold/30 transition-luxury"
              >
                {/* Large translucent backing numeral */}
                <span className="absolute right-4 bottom-[-10px] font-bebas text-8xl text-gold/3 font-bold select-none transition-transform duration-700 group-hover:scale-110">
                  {item.num}
                </span>

                <div className="relative z-10 space-y-4">
                  <span className="font-jetbrains text-xs text-gold tracking-widest block font-bold">
                    SYSTEM {item.num}
                  </span>
                  <h4 className="font-cormorant text-2xl text-pearl leading-none">
                    {item.title}
                  </h4>
                  <p className="font-dm text-xs text-platinum leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. 🗺️ CONSTRUCTION PROCESS */}
      <section className="py-24 bg-graphite/10 border-b border-gold/10" id="process">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">06 / PROJECT JOURNEY</span>
            <h2 className="font-cormorant text-4xl md:text-6xl text-pearl">
              Our 7-Step Architectural Path
            </h2>
            <p className="font-dm text-sm text-platinum max-w-xl">
              From the initial blueprints to handing over the key details, our timeline is built on military accuracy.
            </p>
            <div className="w-20 h-[1px] bg-gold" />
          </div>

          {/* Interactive Steps Tracker */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            {/* Left Steps Menu */}
            <div className="w-full lg:w-1/3 flex flex-col gap-2.5 shrink-0">
              {processSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveProcessStep(idx)}
                  className={`text-left p-4 rounded border transition-all duration-300 font-bebas text-xl tracking-wider flex justify-between items-center ${
                    activeProcessStep === idx 
                      ? 'border-gold bg-gold/10 text-gold shadow-[inset_0_0_15px_rgba(212,175,55,0.06)]' 
                      : 'border-white/5 bg-white/3 text-platinum hover:text-gold hover:border-gold/25'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-jetbrains text-xs text-gold">0{idx + 1}</span>
                    <span>{step.title}</span>
                  </span>
                  <ChevronRight size={16} className={`transition-transform duration-300 ${
                    activeProcessStep === idx ? 'translate-x-1 text-gold' : 'text-platinum/50'
                  }`} />
                </button>
              ))}
            </div>

            {/* Right Step Specification Box */}
            <div className="w-full lg:w-2/3 p-8 rounded glass-card border-l-4 border-l-gold bg-graphite/70 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-jetbrains text-xs text-gold tracking-widest uppercase">
                    STAGE STATUS 0{activeProcessStep + 1} / 07
                  </span>
                  <span className="font-jetbrains text-[9px] text-amber-500 border border-amber-500/20 bg-amber-500/5 px-2.5 py-1 rounded">
                    EST: {processSteps[activeProcessStep].est}
                  </span>
                </div>
                <h3 className="font-cormorant text-4xl text-pearl leading-none">
                  {processSteps[activeProcessStep].title} Stage
                </h3>
                <p className="font-dm text-sm text-platinum leading-relaxed">
                  {processSteps[activeProcessStep].desc}
                </p>
              </div>

              <div className="pt-8 border-t border-gold/10 flex justify-between items-center">
                <span className="font-jetbrains text-[10px] text-platinum">
                  SYSTEM AUDIT: <span className="text-gold">COMPLIANT ✔</span>
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 font-jetbrains text-xs text-gold hover:text-champagne uppercase tracking-widest"
                >
                  <span>Begin journey at step 1</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. 💬 TESTIMONIALS Carousel */}
      <section className="py-24 border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="flex flex-col items-center text-center mb-16 space-y-4">
            <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">07 / CLIENT CONFIDENCE</span>
            <h2 className="font-cormorant text-4xl md:text-6xl text-pearl">
              Words of the Landmark Trust
            </h2>
            <div className="w-20 h-[1px] bg-gold" />
          </div>

          <div className="max-w-3xl mx-auto relative px-10">
            {testimonials.length > 0 && (
              <div className="p-8 rounded glass-card text-center space-y-6 relative overflow-hidden animate-in fade-in duration-500">
                {/* Quotation mark */}
                <span className="absolute left-6 top-4 font-cormorant italic text-9xl text-gold/3 pointer-events-none select-none">
                  “
                </span>

                <p className="font-cormorant italic text-xl md:text-2xl text-pearl leading-relaxed relative z-10">
                  "{testimonials[activeTestimonial].review}"
                </p>

                <div className="flex flex-col items-center pt-4 relative z-10">
                  <div className="w-12 h-12 rounded-full border-2 border-gold bg-graphite flex items-center justify-center overflow-hidden mb-3">
                    <User className="text-gold" size={24} />
                  </div>
                  <h4 className="font-bebas text-lg tracking-wider text-pearl">
                    {testimonials[activeTestimonial].client_name}
                  </h4>
                  <span className="font-jetbrains text-[9px] text-platinum tracking-widest uppercase">
                    {testimonials[activeTestimonial].company} | PROJECT STAGE
                  </span>
                </div>
              </div>
            )}

            {/* Slider arrows */}
            <button
              onClick={() => setActiveTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="absolute left-[-15px] top-1/2 transform -translate-y-1/2 p-2 rounded-full border border-gold/25 bg-obsidian text-gold hover:bg-gold hover:text-obsidian transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setActiveTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 p-2 rounded-full border border-gold/25 bg-obsidian text-gold hover:bg-gold hover:text-obsidian transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>

        </div>
      </section>

      {/* 8. 🧮 CONSTRUCTION COST CALCULATOR */}
      <section className="py-24 bg-graphite/40 border-b border-gold/10" id="calculator">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Inputs */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-2 font-jetbrains text-xs text-gold tracking-[0.2em] uppercase">
              <Calculator size={14} />
              <span>08 / PARAMETRIC COST ESTIMATOR</span>
            </div>
            <h2 className="font-cormorant text-4xl md:text-6xl text-pearl leading-tight">
              Pre-Scope Your Landmark Costs In Real-Time
            </h2>
            <p className="font-dm text-sm text-platinum leading-relaxed">
              Use our custom estimator algorithm configured with local Mumbai, Hyderabad, and Bengaluru material rates to establish a project target.
            </p>

            <div className="space-y-4 p-6 rounded border border-gold/10 bg-obsidian/60">
              {/* Type Select */}
              <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                <span className="text-platinum/50 uppercase">Project Segment</span>
                <select
                  value={calcInputs.projectType}
                  onChange={e => setCalcInputs({ ...calcInputs, projectType: e.target.value })}
                  className="bg-graphite border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none cursor-pointer"
                >
                  <option value="luxury-villa">Luxury Villa (Zaha Cantilevers)</option>
                  <option value="commercial">Commercial Tower (Trophy Skyscrapers)</option>
                  <option value="residential">Premium Apartments (Green Highrise)</option>
                  <option value="industrial">Heavy Assembly Plant (Forge Slabs)</option>
                  <option value="infrastructure">Civic Infrastructure (Space Frames)</option>
                </select>
              </div>

              {/* Area Slider */}
              <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                <div className="flex justify-between">
                  <span className="text-platinum/50 uppercase">Built-Up Area (sqft)</span>
                  <span className="text-gold font-bold">{calcInputs.area.toLocaleString()} SQFT</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="500"
                  value={calcInputs.area}
                  onChange={e => setCalcInputs({ ...calcInputs, area: parseInt(e.target.value) })}
                  className="w-full accent-gold h-1.5 bg-graphite rounded-lg outline-none cursor-pointer"
                />
              </div>

              {/* Quality Select */}
              <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                <span className="text-platinum/50 uppercase">Architectural Quality Tier</span>
                <select
                  value={calcInputs.quality}
                  onChange={e => setCalcInputs({ ...calcInputs, quality: e.target.value })}
                  className="bg-graphite border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none cursor-pointer"
                >
                  <option value="standard">Standard Structural Concrete (Certified)</option>
                  <option value="premium">Premium Board-Formed Aggregate</option>
                  <option value="ultra-premium">Brutalist Luxury Spec (Gold Inlays)</option>
                </select>
              </div>

              {/* Location Select */}
              <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                <span className="text-platinum/50 uppercase">Regional Corridor Modifier</span>
                <select
                  value={calcInputs.location}
                  onChange={e => setCalcInputs({ ...calcInputs, location: e.target.value })}
                  className="bg-graphite border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none cursor-pointer"
                >
                  <option value="metro">Metro Core (Mumbai BKC, Bengaluru ORR)</option>
                  <option value="tier-2">Tier-2 Suburban (Pune Baner, Noida Sector)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Estimate Output Panel */}
          <div className="p-8 rounded glass-card border-l-4 border-l-gold bg-graphite flex flex-col justify-between">
            {calcResult && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gold/10 pb-4">
                  <span className="font-jetbrains text-xs text-gold tracking-widest uppercase">
                    ESTIMATED BUDGET METRICS
                  </span>
                  <span className="font-jetbrains text-[9px] text-amber-500 border border-amber-500/20 bg-amber-500/5 px-2.5 py-1 rounded">
                    CPM CALC
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="font-bebas text-5xl md:text-6xl text-pearl block tracking-wider leading-none">
                    ₹{(calcResult.minCost / 10000000).toFixed(2)}Cr — ₹{(calcResult.maxCost / 10000000).toFixed(2)}Cr
                  </span>
                  <span className="font-jetbrains text-[10px] text-gold tracking-widest uppercase block">
                    Estimated Cost Range (INR)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-gold/10 font-jetbrains text-[10px]">
                  <div>
                    <span className="text-platinum/50 block">EST. CONSTRUCTION TIMELINE</span>
                    <span className="text-pearl block mt-0.5 font-bold">{calcResult.duration}</span>
                  </div>
                  <div>
                    <span className="text-platinum/50 block">BUILT-UP AREA TARGET</span>
                    <span className="text-pearl block mt-0.5 font-bold">{calcInputs.area.toLocaleString()} SQFT</span>
                  </div>
                  <div>
                    <span className="text-platinum/50 block">QUALITY ENVELOPE</span>
                    <span className="text-pearl block mt-0.5 uppercase">{calcInputs.quality}</span>
                  </div>
                  <div>
                    <span className="text-platinum/50 block">TOLERANCE ESTIMATE</span>
                    <span className="text-gold block mt-0.5 font-semibold">± 7.5% VARIABILITY</span>
                  </div>
                </div>

                <p className="font-dm text-xs text-platinum leading-relaxed">
                  {calcResult.description}
                </p>
              </div>
            )}

            <button
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
                
                // Prefill contact form
                setLeadForm({
                  ...leadForm,
                  project_type: calcInputs.projectType.toUpperCase(),
                  budget: `₹${(calcResult!.minCost / 10000000).toFixed(1)}Cr - ₹${(calcResult!.maxCost / 10000000).toFixed(1)}Cr`,
                  message: `Parametric quote estimate generated. Area: ${calcInputs.area} sqft, Quality: ${calcInputs.quality}.`
                });
              }}
              className="w-full py-4 border border-gold text-gold font-jetbrains text-xs tracking-widest uppercase hover:bg-gold hover:text-obsidian transition-luxury mt-8"
            >
              Get Detailed Quote & Structural Review
            </button>
          </div>

        </div>
      </section>

      {/* 9. ✉️ CONTACT & LEAD FORM */}
      <section className="py-24 border-b border-gold/10 relative" id="contact">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Info Column */}
          <div className="space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">09 / CORE ENGAGEMENT</span>
              <h2 className="font-cormorant text-4xl md:text-6xl text-pearl leading-tight">
                Secure Your Architectural Consultation
              </h2>
              <p className="font-dm text-sm text-platinum leading-relaxed">
                Submit your project specifications directly to our Bandra Kurla Complex headquarters. Our chief design coordinators will review structural metrics, site maps, and estimated budgets.
              </p>
            </div>

            <div className="flex gap-4 items-center p-4 border border-gold/15 bg-gold/5 rounded">
              <div className="p-3 border border-gold/25 bg-gold/5 rounded shrink-0">
                <HardHat className="text-gold" size={24} />
              </div>
              <div>
                <h4 className="font-bebas text-lg tracking-wider text-pearl">MILITARY QUALITY REPORT</h4>
                <p className="font-dm text-xs text-platinum">Every lead submits a structured record to our local CRM database instantly.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 font-jetbrains text-xs">
              <a
                href="https://wa.me/919876543210?text=Hi%20CSK,%20I'm%20interested%20in%20discussing%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-4 border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 rounded transition-colors"
              >
                <Phone size={14} />
                <span>DISCUSS VIA WHATSAPP</span>
              </a>
              <a
                href="tel:+912267890123"
                className="flex items-center justify-center gap-2 px-6 py-4 border border-gold/20 bg-white/3 hover:border-gold text-pearl rounded transition-all"
              >
                <MessageSquare size={14} />
                <span>CALL BKC OFFICE</span>
              </a>
            </div>
          </div>

          {/* Right Lead Capture Form */}
          <div className="p-8 rounded glass-card bg-graphite/80 relative">
            
            {leadSuccess ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-16 animate-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle size={36} />
                </div>
                <h3 className="font-bebas text-2xl tracking-widest text-pearl uppercase">Lead Captured Successfully</h3>
                <p className="font-dm text-xs text-platinum max-w-sm leading-relaxed">
                  Your project specifications have been submitted directly to our CRM database. Our Chief Estimator will contact you within the next 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="flex justify-between items-center border-b border-gold/10 pb-4">
                  <span className="font-jetbrains text-xs text-gold tracking-widest uppercase">
                    Consultation Lead Sheet
                  </span>
                  <span className="font-jetbrains text-[8px] text-platinum/50 uppercase">
                    RLS PUBLIC WRITE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                    <span className="text-platinum/50 uppercase">Full Name *</span>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Mahindra"
                      value={leadForm.name}
                      onChange={e => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                    <span className="text-platinum/50 uppercase">Mobile Number *</span>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={leadForm.phone}
                      onChange={e => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                  <span className="text-platinum/50 uppercase">Email Address</span>
                  <input
                    type="email"
                    placeholder="e.g. anand@mahindra.com"
                    value={leadForm.email}
                    onChange={e => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                    <span className="text-platinum/50 uppercase">Project Segment</span>
                    <select
                      value={leadForm.project_type}
                      onChange={e => setLeadForm({ ...leadForm, project_type: e.target.value })}
                      className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none cursor-pointer transition-colors"
                    >
                      <option value="Residential">Residential Building</option>
                      <option value="Commercial">Commercial Tower</option>
                      <option value="Luxury Villa">Luxury Cantilever Villa</option>
                      <option value="Industrial">Industrial Assembly Forge</option>
                      <option value="Infrastructure">Civic Space Frame Link</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                    <span className="text-platinum/50 uppercase">Budget Range</span>
                    <select
                      value={leadForm.budget}
                      onChange={e => setLeadForm({ ...leadForm, budget: e.target.value })}
                      className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none cursor-pointer transition-colors"
                    >
                      <option value="Under ₹1.5Cr">Under ₹1.5Cr</option>
                      <option value="₹1.5Cr - ₹3Cr">₹1.5Cr - ₹3Cr</option>
                      <option value="₹3Cr - ₹10Cr">₹3Cr - ₹10Cr</option>
                      <option value="₹10Cr - ₹50Cr">₹10Cr - ₹50Cr</option>
                      <option value="Above ₹50Cr">Above ₹50Cr</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                  <span className="text-platinum/50 uppercase">Site Location</span>
                  <input
                    type="text"
                    placeholder="e.g. Bandra East, Mumbai"
                    value={leadForm.location}
                    onChange={e => setLeadForm({ ...leadForm, location: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5 font-jetbrains text-xs">
                  <span className="text-platinum/50 uppercase">Brief Project Scope / Message</span>
                  <textarea
                    rows={3}
                    placeholder="Describe building heights, cantilever loads, material grades..."
                    value={leadForm.message}
                    onChange={e => setLeadForm({ ...leadForm, message: e.target.value })}
                    className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold hover:bg-champagne text-obsidian font-jetbrains text-xs tracking-widest uppercase font-bold py-4 rounded transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                >
                  TRANSMIT SPECIFICATIONS TO CRM
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

    </div>
  );
}
