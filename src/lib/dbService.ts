import { supabase, isSupabaseConfigured } from './supabase';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  project_type: string;
  budget: string;
  location: string;
  message: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: 'residential' | 'commercial' | 'luxury' | 'industrial' | 'infrastructure';
  images: string[];
  budget: string;
  timeline: string;
  location: string;
  status: 'published' | 'draft';
  featured: boolean;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  company: string;
  review: string;
  rating: number;
  image_url: string;
  video_url?: string;
  published: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  category: string;
  published: boolean;
  created_at: string;
}

export interface Career {
  id: string;
  position: string;
  location: string;
  description: string;
  requirements: string;
  salary_range: string;
  active: boolean;
  created_at: string;
}

export interface Conversation {
  id: string;
  session_id: string;
  messages: Array<{ sender: 'user' | 'assistant'; text: string; timestamp: string }>;
  lead_captured: boolean;
  created_at: string;
}

// Cinematic Mock Data Generators
const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'The Obsidian Tower',
    slug: 'obsidian-tower',
    description: 'A towering 64-story dark steel and structural glass skyscraper utilizing advanced core-suspension engineering and dual-layered gold-tinted facades. Featuring high-durability thermal dampening, self-regulating ventilation systems, and smart wind-load deflectors tested to withstand heavy monsoons and high altitudes.',
    category: 'commercial',
    images: ['/images/projects/obsidian_tower.jpg'],
    budget: '$180,000,000',
    timeline: '36 Months',
    location: 'Lower Parel, Mumbai',
    status: 'published',
    featured: true,
    created_at: new Date('2025-01-15').toISOString()
  },
  {
    id: 'p2',
    title: 'Aurelia Cantilever Villas',
    slug: 'aurelia-villas',
    description: 'A cluster of six private sea-facing luxury villas built on architectural textured concrete stilts, suspended over the rocky shoreline. Every structure incorporates exposed cedar paneling, high-performance structural steel tiebacks, and an integrated thermal energy recovery infinity pool.',
    category: 'luxury',
    images: ['/images/projects/aurelia_villas.jpg'],
    budget: '$42,000,000',
    timeline: '18 Months',
    location: 'Alibaug Coastline',
    status: 'published',
    featured: true,
    created_at: new Date('2025-03-20').toISOString()
  },
  {
    id: 'p3',
    title: 'Zenith Logistics Terminal',
    slug: 'zenith-terminal',
    description: 'A massive modern technology park and automated logistic headquarters. Features a double-curved steel space frame roof spanning over 120 meters unsupported, full seismic insulation pads, integrated graywater filtration networks, and solar energy capture blocks.',
    category: 'infrastructure',
    images: ['/images/projects/zenith_terminal.jpg'],
    budget: '$320,000,000',
    timeline: '42 Months',
    location: 'Gachibowli, Hyderabad',
    status: 'published',
    featured: true,
    created_at: new Date('2024-11-10').toISOString()
  },
  {
    id: 'p4',
    title: 'The Brutalist Monolith',
    slug: 'brutalist-monolith',
    description: 'An architectural corporate headquarters constructed from boards-formed raw concrete and custom volcanic aggregate. The structure houses multi-floor garden atriums, smart dynamic tint glass panels, and an underfloor air distribution system for maximum efficiency.',
    category: 'commercial',
    images: ['/images/projects/monolith.jpg'],
    budget: '$95,000,000',
    timeline: '24 Months',
    location: 'Outer Ring Road, Bengaluru',
    status: 'published',
    featured: false,
    created_at: new Date('2025-04-05').toISOString()
  },
  {
    id: 'p5',
    title: 'Vedic Meadows Green Highrise',
    slug: 'vedic-meadows',
    description: 'A premium residential complex focusing on low-carbon footprints. Combines precast concrete frames with cross-laminated timber flooring slabs, complete vertical gardens, integrated geothermal heating, and decentralized solar grid networks.',
    category: 'residential',
    images: ['/images/projects/vedic_meadows.jpg'],
    budget: '$65,000,000',
    timeline: '28 Months',
    location: 'Baner Hills, Pune',
    status: 'published',
    featured: false,
    created_at: new Date('2025-02-18').toISOString()
  },
  {
    id: 'p6',
    title: 'Hyperion Automotive Forge',
    slug: 'hyperion-forge',
    description: 'A high-load industrial automotive manufacturing plant utilizing heavy-duty fiber-reinforced concrete slabs designed to carry massive mechanical stamping machinery. Includes large-span steel portal frames and heavy structural crane systems.',
    category: 'industrial',
    images: ['/images/projects/hyperion_forge.jpg'],
    budget: '$110,000,000',
    timeline: '30 Months',
    location: 'Sriperumbudur, Chennai',
    status: 'published',
    featured: false,
    created_at: new Date('2024-09-12').toISOString()
  },
  {
    id: 'p7',
    title: 'Pearl Sands Beach Pavilion',
    slug: 'pearl-sands',
    description: 'A beautiful luxury beachfront hospitality resort utilizing polished white exposed micro-cement concrete, custom extruded bronze partitions, and glass panes capable of resisting marine erosion and high ocean gusts.',
    category: 'luxury',
    images: ['/images/projects/pearl_sands.jpg'],
    budget: '$15,000,000',
    timeline: '12 Months',
    location: 'Candolim Beach, Goa',
    status: 'published',
    featured: false,
    created_at: new Date('2025-05-01').toISOString()
  },
  {
    id: 'p8',
    title: 'Narmada Span-Launch Viaduct',
    slug: 'narmada-viaduct',
    description: 'A major infrastructure project spanning 12.8 kilometers over river beds and industrial corridors. Implements pre-stressed hollow girder bridges launched dynamically via specialized launching gantries under rigid tolerances.',
    category: 'infrastructure',
    images: ['/images/projects/narmada_viaduct.jpg'],
    budget: '$450,000,000',
    timeline: '48 Months',
    location: 'Vadodara, Gujarat',
    status: 'published',
    featured: false,
    created_at: new Date('2024-06-25').toISOString()
  },
  {
    id: 'p9',
    title: 'Verdant Crest Luxury Suites',
    slug: 'verdant-crest',
    description: 'A high-density luxury residential enclave featuring custom glass structural panels, rooftop cascading water elements, personalized lift lobbies for every apartment, and localized air purification systems.',
    category: 'residential',
    images: ['/images/projects/verdant_crest.jpg'],
    budget: '$80,000,000',
    timeline: '32 Months',
    location: 'Sector 150, Noida',
    status: 'published',
    featured: false,
    created_at: new Date('2025-05-15').toISOString()
  }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    client_name: 'Rajesh Singhania',
    company: 'Singhania Group',
    review: 'The Obsidian Tower is a triumph of modern engineering. CSK Constructions executed the structural steel cantilevers and gold-tinted facades with absolute millimeter precision. A team that truly speaks the language of legacy building.',
    rating: 5,
    image_url: '/images/testimonials/avatar1.jpg',
    published: true,
    created_at: new Date('2025-05-10').toISOString()
  },
  {
    id: 't2',
    client_name: 'Dr. Amara Goel',
    company: 'Goel Ventures',
    review: 'Every single square foot of our Aurelia Cantilever Villa radiates luxury and structural confidence. The interplay of architectural concrete with custom warm wood inlays is breathtaking. The level of military precision was outstanding.',
    rating: 5,
    image_url: '/images/testimonials/avatar2.jpg',
    published: true,
    created_at: new Date('2025-05-20').toISOString()
  },
  {
    id: 't3',
    client_name: 'Marcus Vance',
    company: 'Vance Tech Logistics',
    review: 'CSK delivered our Hyperion Forge ahead of our targeted schedule. Their deep coordination with our international automated systems engineers was highly professional. They represent true zero-noise project management.',
    rating: 5,
    image_url: '/images/testimonials/avatar3.jpg',
    published: true,
    created_at: new Date('2025-04-12').toISOString()
  },
  {
    id: 't4',
    client_name: 'K. Rama Rao',
    company: 'Secretary, Infrastructure Dept.',
    review: 'We trusted CSK with our critical Gachibowli terminal bypass and space frame roof. They met all strict logistics metrics and delivered under budget with absolute transparency. Highly recommended for nationwide infrastructure.',
    rating: 5,
    image_url: '/images/testimonials/avatar4.jpg',
    published: true,
    created_at: new Date('2025-03-30').toISOString()
  },
  {
    id: 't5',
    client_name: 'Shalini Sen',
    company: 'Sen & Associates',
    review: 'Transparent communication, thorough planning, and pristine craftsmanship. CSK Constructions has built our primary residential complexes with an uncompromising eye for sustainability and safety. An exceptional builder.',
    rating: 5,
    image_url: '/images/testimonials/avatar5.jpg',
    published: true,
    created_at: new Date('2025-05-05').toISOString()
  }
];

const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Brutalist Luxury: The Modern Architecture Renaissance',
    slug: 'brutalist-luxury-renaissance',
    content: 'Brutalist Luxury represents the fascinating intersection of structural rawness and refined finishes. By utilizing bold structural frames, board-formed exposed concrete, and heavy cantilevered angles, we pay homage to pure engineering. However, the true luxury manifests in the highlights: hand-polished bronze, custom champagne-gold inlay bands, and triple-glazed intelligent glass panels. This design philosophy strips away unnecessary decorative clutter, celebrating raw strength and architectural confidence. CSK Constructions has pioneered this movement, creating spaces that feel as eternal as monoliths yet behave as smart, luxury workspaces.',
    excerpt: 'Exploring the fusion of raw exposed concrete forms with warm champagne gold detailing to create high-end legacy landmarks.',
    cover_image: '/images/blog/brutalist_luxury.jpg',
    category: 'Architecture',
    published: true,
    created_at: new Date('2025-04-15').toISOString()
  },
  {
    id: 'b2',
    title: 'Precision Engineering in High-Rise Suspended Structures',
    slug: 'precision-engineering-highrise',
    content: 'As urban footprints compact, high-rise buildings must push boundary designs. The traditional column-grid layout limits spatial flexibility and structural response. By introducing deep-suspension engineering, central core support shafts, and high-tension steel alloy cable tiebacks, architects can create spectacular floating structures. At CSK, our team employs advanced seismic-damping systems and multi-layered mass tuned dampers in high-rise projects like The Obsidian Tower to minimize shear loads and dynamic sways. This article details the structural formulas, cable pre-stress thresholds, and aerodynamic grid deflectors utilized in trophy skylines.',
    excerpt: 'How cantilevered suspension designs and high-strength steel alloy cables are redefining core skyscraper limits.',
    cover_image: '/images/blog/highrise_engineering.jpg',
    category: 'Engineering',
    published: true,
    created_at: new Date('2025-05-02').toISOString()
  },
  {
    id: 'b3',
    title: 'Integrating Green Energy Grids in Modern Industrial Plants',
    slug: 'green-energy-industrial-plants',
    content: 'Sustainability is no longer optional for heavy manufacturing. Modern industrial campuses require massive power inputs, but smart design can achieve near carbon-neutral operations. We accomplish this through a three-pronged approach: first, utilizing low-carbon fly-ash concrete mixes that reduce cement calcination footprints by 40%; second, installing massive structural solar-slab roofs that act as secondary shading barriers; third, implementing complete closed-loop circular graywater reclamation systems. This tech brief analyzes the ROI and operational metrics of Hyperion Forge as a primary case study.',
    excerpt: 'A technical breakdown of solar-slab roof integrations, localized graywater reclamation, and low-carbon cement blocks.',
    cover_image: '/images/blog/green_industrial.jpg',
    category: 'Sustainability',
    published: true,
    created_at: new Date('2025-05-22').toISOString()
  }
];

const DEFAULT_CAREERS: Career[] = [
  {
    id: 'c1',
    position: 'Senior Structural Engineer',
    location: 'Mumbai Headquarters',
    description: 'We are seeking a senior structural engineer to lead the design and audit of complex high-rise commercial structures and architectural cantilevers. You will oversee calculation reviews, coordinate wind-tunnel simulation reports, and verify high-performance concrete mix formulas.',
    requirements: 'M.Tech / MS in Structural Engineering, 10+ years experience in premium skyscraper systems, expertise in ETABS, STAAD.Pro, and seismic damping designs.',
    salary_range: '₹24,00,000 - ₹36,00,000 per annum',
    active: true,
    created_at: new Date('2025-05-01').toISOString()
  },
  {
    id: 'c2',
    position: 'Lead BIM Modeler (Revit)',
    location: 'Gachibowli Office, Hyderabad',
    description: 'We are expanding our digital design studio. You will manage and develop high-resolution 3D building information models, coordinate structural, mechanical, and electrical system overlaps, and run clash-detection reports for landmark projects.',
    requirements: 'B.Arch or Civil Engineering, 5+ years Autodesk Revit expertise, Navisworks proficiency, and previous portfolio modeling structures above 250,000 sqft.',
    salary_range: '₹12,00,000 - ₹18,00,000 per annum',
    active: true,
    created_at: new Date('2025-05-12').toISOString()
  },
  {
    id: 'c3',
    position: 'Project Manager (Industrial & Steel Portal)',
    location: 'Sriperumbudur Site, Chennai',
    description: 'Lead on-site operations for high-load industrial assembly plants and massive precast structures. You will coordinate material deliveries, lead subcontractor compliance meetings, and ensure strict zero-tolerance quality and safety audits.',
    requirements: 'B.Tech in Civil / Project Management, 8+ years executing industrial portal frames, solid understanding of Lean Construction and CPM scheduling.',
    salary_range: '₹18,00,000 - ₹26,00,000 per annum',
    active: true,
    created_at: new Date('2025-05-18').toISOString()
  },
  {
    id: 'c4',
    position: 'Interior Architecture Specialist',
    location: 'Koramangala Studio, Bengaluru',
    description: 'Translate brutalist building envelopes into highly refined, obsidian luxury interior environments. You will select materials, design custom brass and gold metal accent inlays, specify acoustic glass solutions, and manage specialized lighting configurations.',
    requirements: 'Degree in Interior Architecture or Design, 4+ years in premium hospitality or luxury residential detailing, high proficiency in Rhino and AutoCAD.',
    salary_range: '₹10,00,000 - ₹15,00,000 per annum',
    active: true,
    created_at: new Date('2025-05-24').toISOString()
  }
];

// Initialize State Manager for Local Mock mode
class LocalDatabase {
  private getStorageItem<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const data = localStorage.getItem(`csk_${key}`);
    if (!data) {
      localStorage.setItem(`csk_${key}`, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(data);
  }

  private setStorageItem<T>(key: string, value: T): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`csk_${key}`, JSON.stringify(value));
    }
  }

  getLeads(): Lead[] {
    return this.getStorageItem<Lead[]>('leads', []);
  }

  addLead(lead: Omit<Lead, 'id' | 'status' | 'created_at'>): Lead {
    const leads = this.getLeads();
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      status: 'new',
      created_at: new Date().toISOString()
    };
    leads.unshift(newLead);
    this.setStorageItem('leads', leads);
    return newLead;
  }

  updateLeadStatus(id: string, status: Lead['status']): Lead | null {
    const leads = this.getLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx === -1) return null;
    leads[idx].status = status;
    this.setStorageItem('leads', leads);
    return leads[idx];
  }

  getProjects(): Project[] {
    return this.getStorageItem<Project[]>('projects', DEFAULT_PROJECTS);
  }

  addProject(project: Omit<Project, 'id' | 'created_at'>): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...project,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    projects.unshift(newProject);
    this.setStorageItem('projects', projects);
    return newProject;
  }

  updateProject(id: string, updated: Partial<Project>): Project | null {
    const projects = this.getProjects();
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    projects[idx] = { ...projects[idx], ...updated } as Project;
    this.setStorageItem('projects', projects);
    return projects[idx];
  }

  deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    if (filtered.length === projects.length) return false;
    this.setStorageItem('projects', filtered);
    return true;
  }

  getTestimonials(): Testimonial[] {
    return this.getStorageItem<Testimonial[]>('testimonials', DEFAULT_TESTIMONIALS);
  }

  addTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>): Testimonial {
    const testimonials = this.getTestimonials();
    const newTestimonial: Testimonial = {
      ...testimonial,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    testimonials.unshift(newTestimonial);
    this.setStorageItem('testimonials', testimonials);
    return newTestimonial;
  }

  toggleTestimonialApproval(id: string): Testimonial | null {
    const testimonials = this.getTestimonials();
    const idx = testimonials.findIndex(t => t.id === id);
    if (idx === -1) return null;
    testimonials[idx].published = !testimonials[idx].published;
    this.setStorageItem('testimonials', testimonials);
    return testimonials[idx];
  }

  getBlogPosts(): BlogPost[] {
    return this.getStorageItem<BlogPost[]>('blog_posts', DEFAULT_BLOG_POSTS);
  }

  addBlogPost(post: Omit<BlogPost, 'id' | 'created_at'>): BlogPost {
    const posts = this.getBlogPosts();
    const newPost: BlogPost = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    posts.unshift(newPost);
    this.setStorageItem('blog_posts', posts);
    return newPost;
  }

  updateBlogPost(id: string, updated: Partial<BlogPost>): BlogPost | null {
    const posts = this.getBlogPosts();
    const idx = posts.findIndex(p => p.id === id);
    if (idx === -1) return null;
    posts[idx] = { ...posts[idx], ...updated } as BlogPost;
    this.setStorageItem('blog_posts', posts);
    return posts[idx];
  }

  getCareers(): Career[] {
    return this.getStorageItem<Career[]>('careers', DEFAULT_CAREERS);
  }

  addCareer(career: Omit<Career, 'id' | 'created_at'>): Career {
    const careers = this.getCareers();
    const newCareer: Career = {
      ...career,
      id: Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };
    careers.unshift(newCareer);
    this.setStorageItem('careers', careers);
    return newCareer;
  }

  toggleCareerActive(id: string): Career | null {
    const careers = this.getCareers();
    const idx = careers.findIndex(c => c.id === id);
    if (idx === -1) return null;
    careers[idx].active = !careers[idx].active;
    this.setStorageItem('careers', careers);
    return careers[idx];
  }
}

export const LocalDB = new LocalDatabase();

// Centralized Unified Database Service API Layer
export const dbService = {
  // Leads CRM
  async getLeads(): Promise<Lead[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Lead[];
    }
    return LocalDB.getLeads();
  },

  async submitLead(lead: Omit<Lead, 'id' | 'status' | 'created_at'>): Promise<Lead> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('leads').insert([lead]).select().single();
      if (!error && data) return data as Lead;
    }
    return LocalDB.addLead(lead);
  },

  async updateLeadStatus(id: string, status: Lead['status']): Promise<Lead | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('leads').update({ status }).eq('id', id).select().single();
      if (!error && data) return data as Lead;
    }
    return LocalDB.updateLeadStatus(id, status);
  },

  // Projects Portfolio
  async getProjects(): Promise<Project[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Project[];
    }
    return LocalDB.getProjects();
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find(p => p.slug === slug) || null;
  },

  async createProject(project: Omit<Project, 'id' | 'created_at'>): Promise<Project> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('projects').insert([project]).select().single();
      if (!error && data) return data as Project;
    }
    return LocalDB.addProject(project);
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('projects').update(project).eq('id', id).select().single();
      if (!error && data) return data as Project;
    }
    return LocalDB.updateProject(id, project);
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      return !error;
    }
    return LocalDB.deleteProject(id);
  },

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Testimonial[];
    }
    return LocalDB.getTestimonials();
  },

  async submitTestimonial(testimonial: Omit<Testimonial, 'id' | 'created_at'>): Promise<Testimonial> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('testimonials').insert([testimonial]).select().single();
      if (!error && data) return data as Testimonial;
    }
    return LocalDB.addTestimonial(testimonial);
  },

  async toggleTestimonialApproval(id: string): Promise<Testimonial | null> {
    if (isSupabaseConfigured && supabase) {
      const testimonials = await this.getTestimonials();
      const current = testimonials.find(t => t.id === id);
      if (current) {
        const { data, error } = await supabase.from('testimonials').update({ published: !current.published }).eq('id', id).select().single();
        if (!error && data) return data as Testimonial;
      }
    }
    return LocalDB.toggleTestimonialApproval(id);
  },

  // Blog posts
  async getBlogPosts(): Promise<BlogPost[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as BlogPost[];
    }
    return LocalDB.getBlogPosts();
  },

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts();
    return posts.find(p => p.slug === slug) || null;
  },

  async createBlogPost(post: Omit<BlogPost, 'id' | 'created_at'>): Promise<BlogPost> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('blog_posts').insert([post]).select().single();
      if (!error && data) return data as BlogPost;
    }
    return LocalDB.addBlogPost(post);
  },

  async updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost | null> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('blog_posts').update(post).eq('id', id).select().single();
      if (!error && data) return data as BlogPost;
    }
    return LocalDB.updateBlogPost(id, post);
  },

  // Careers
  async getCareers(): Promise<Career[]> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('careers').select('*').order('created_at', { ascending: false });
      if (!error && data) return data as Career[];
    }
    return LocalDB.getCareers();
  },

  async createCareer(career: Omit<Career, 'id' | 'created_at'>): Promise<Career> {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.from('careers').insert([career]).select().single();
      if (!error && data) return data as Career;
    }
    return LocalDB.addCareer(career);
  },

  async toggleCareerActive(id: string): Promise<Career | null> {
    if (isSupabaseConfigured && supabase) {
      const careers = await this.getCareers();
      const current = careers.find(c => c.id === id);
      if (current) {
        const { data, error } = await supabase.from('careers').update({ active: !current.active }).eq('id', id).select().single();
        if (!error && data) return data as Career;
      }
    }
    return LocalDB.toggleCareerActive(id);
  }
};
