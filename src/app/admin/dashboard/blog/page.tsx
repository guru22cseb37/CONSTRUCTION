'use client';

import { useState, useEffect } from 'react';
import { dbService, BlogPost } from '@/lib/dbService';
import { Plus, Trash2, Calendar, FileText, ToggleLeft, ToggleRight } from 'lucide-react';

export default function AdminBlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Architecture',
    published: true
  });
  const [success, setSuccess] = useState(false);

  async function loadPosts() {
    const data = await dbService.getBlogPosts();
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    await dbService.createBlogPost({
      title: form.title,
      slug,
      content: form.content,
      excerpt: form.excerpt || form.content.slice(0, 120) + '...',
      cover_image: '/images/blog/placeholder.jpg',
      category: form.category,
      published: form.published
    });

    setSuccess(true);
    setForm({
      title: '',
      excerpt: '',
      content: '',
      category: 'Architecture',
      published: true
    });

    loadPosts();
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    await dbService.updateBlogPost(id, { published: !current });
    loadPosts();
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="space-y-1">
        <span className="font-jetbrains text-xs text-gold tracking-widest uppercase">TECHNICAL WRITING TERMINAL</span>
        <h1 className="font-cormorant text-4xl text-pearl">Monolith Journal Editor</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Write Post Form */}
        <div className="p-6 rounded glass-card border-l-4 border-l-gold bg-graphite/70 h-fit space-y-6">
          <div className="border-b border-gold/10 pb-4">
            <span className="font-jetbrains text-[9px] text-gold tracking-widest uppercase">
              COMPRESS NEW WHITEPAPER
            </span>
            <h3 className="font-cormorant text-2xl text-pearl leading-none mt-1">
              Write Journal Log
            </h3>
          </div>

          {success && (
            <div className="p-3 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-jetbrains text-[10px] rounded text-center">
              ✔ Whitepaper committed to database registry.
            </div>
          )}

          <form onSubmit={handleCreatePost} className="space-y-4 font-jetbrains text-xs">
            <div className="flex flex-col gap-1.5">
              <span className="text-platinum/50 uppercase">Article Title *</span>
              <input
                type="text"
                required
                placeholder="e.g. Modern Concrete Cantilevers"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Category</span>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  className="bg-obsidian border border-white/10 rounded px-2.5 py-2 text-pearl focus:border-gold outline-none cursor-pointer"
                >
                  <option value="Architecture">Architecture</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sustainability">Sustainability</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Release State</span>
                <select
                  value={form.published ? 'true' : 'false'}
                  onChange={e => setForm({ ...form, published: e.target.value === 'true' })}
                  className="bg-obsidian border border-white/10 rounded px-2.5 py-2 text-pearl focus:border-gold outline-none cursor-pointer"
                >
                  <option value="true">PUBLISHED</option>
                  <option value="false">DRAFT MANUAL</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-platinum/50 uppercase">Article Excerpt *</span>
              <input
                type="text"
                required
                placeholder="A brief 1-sentence engineering summary description..."
                value={form.excerpt}
                onChange={e => setForm({ ...form, excerpt: e.target.value })}
                className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-platinum/50 uppercase">Complete Research Body *</span>
              <textarea
                rows={5}
                required
                placeholder="Write detailed concrete compaction tests, steel tension ratios, spaceframe dimensions..."
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold hover:bg-champagne text-obsidian font-bold py-3 rounded tracking-widest uppercase transition-colors"
            >
              COMMIT WHITEPAPER
            </button>
          </form>
        </div>

        {/* Right Side Articles Feed */}
        <div className="lg:col-span-2 space-y-4 font-jetbrains text-xs">
          <div className="rounded border border-gold/15 bg-graphite/40 overflow-hidden divide-y divide-white/5">
            {posts.map(post => (
              <div key={post.id} className="p-5 flex justify-between items-center gap-6 hover:bg-white/2 transition-colors">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-gold" />
                    <h4 className="font-cormorant text-xl text-pearl leading-none">{post.title}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] text-platinum/50">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} className="text-gold" />
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span className="text-gold uppercase">{post.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleTogglePublish(post.id, post.published)}
                    className="flex items-center gap-1.5 text-platinum hover:text-gold transition-colors"
                    title={post.published ? 'Retract article to draft' : 'Publish article now'}
                  >
                    {post.published ? (
                      <>
                        <ToggleRight size={24} className="text-emerald-500" />
                        <span className="text-[9px] uppercase tracking-wider text-emerald-400">LIVE</span>
                      </>
                    ) : (
                      <>
                        <ToggleLeft size={24} className="text-platinum/40" />
                        <span className="text-[9px] uppercase tracking-wider text-platinum/50">DRAFT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
