'use client';

import { useState, useEffect } from 'react';
import { dbService, BlogPost } from '@/lib/dbService';
import { BookOpen, Calendar, ArrowRight, X } from 'lucide-react';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    async function loadPosts() {
      const data = await dbService.getBlogPosts();
      setPosts(data);
    }
    loadPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      
      {/* Header */}
      <div className="border-b border-gold/10 pb-8 flex flex-col items-start gap-4">
        <span className="font-jetbrains text-xs text-gold tracking-[0.25em] uppercase">CSK TECHNICAL LOGS</span>
        <h1 className="font-cormorant text-5xl md:text-7xl text-pearl leading-none">
          The Monolith Journal
        </h1>
        <p className="font-dm text-sm md:text-lg text-platinum max-w-2xl leading-relaxed">
          Deep-dives into brutalist luxury renaissance structural designs, seismic cable pre-stress thresholds, and modern green concrete algorithms.
        </p>
      </div>

      {/* Grid of articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="p-6 rounded glass-card border-l-4 border-l-gold bg-graphite/40 flex flex-col justify-between h-[280px] cursor-pointer hover:border-gold/30 transition-luxury"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center font-jetbrains text-[9px] text-platinum">
                <span className="flex items-center gap-1">
                  <Calendar size={10} className="text-gold" />
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
                <span className="text-gold tracking-widest uppercase border border-gold/20 bg-gold/5 px-2 py-0.5 rounded">
                  {post.category}
                </span>
              </div>
              <h3 className="font-cormorant text-2xl text-pearl leading-tight group-hover:text-gold transition-colors">
                {post.title}
              </h3>
              <p className="font-dm text-xs text-platinum leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="inline-flex items-center gap-2 font-jetbrains text-[9px] text-gold uppercase tracking-widest pt-4 border-t border-gold/5">
              <span>Read technical whitepaper</span>
              <ArrowRight size={10} />
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Lightbox */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-lg border border-gold/25 glass-card bg-graphite p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-start border-b border-gold/10 pb-4 mb-6">
              <div>
                <span className="font-jetbrains text-[10px] text-gold tracking-widest uppercase">
                  JOURNAL ARTICLE | {selectedPost.category}
                </span>
                <h3 className="font-cormorant text-3xl text-pearl leading-tight mt-1">
                  {selectedPost.title}
                </h3>
                <span className="font-jetbrains text-[9px] text-platinum/50 block mt-1">
                  PUBLISHED: {new Date(selectedPost.created_at).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-platinum hover:text-gold transition-colors font-bold"
              >
                X
              </button>
            </div>

            <div className="space-y-4 font-dm text-xs text-platinum leading-relaxed">
              <p className="font-cormorant italic text-sm text-pearl leading-relaxed border-l-2 border-gold pl-4 py-1.5 bg-gold/5">
                {selectedPost.excerpt}
              </p>
              <div className="whitespace-pre-line pt-2">
                {selectedPost.content}
              </div>
            </div>

            <button
              onClick={() => setSelectedPost(null)}
              className="w-full mt-8 py-3 border border-white/20 text-pearl font-jetbrains text-[10px] tracking-widest uppercase hover:border-gold transition-colors"
            >
              CLOSE ARTICLE
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
