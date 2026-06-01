'use client';

import { useState, useEffect } from 'react';
import { dbService, Testimonial } from '@/lib/dbService';
import { MessageSquare, Star, EyeOff, Eye, CheckCircle2, User } from 'lucide-react';

export default function AdminTestimonialsManager() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [success, setSuccess] = useState(false);
  const [newReview, setNewReview] = useState({
    client_name: '',
    company: '',
    review: '',
    rating: 5
  });

  async function loadReviews() {
    const data = await dbService.getTestimonials();
    setReviews(data);
  }

  useEffect(() => {
    loadReviews();
  }, []);

  const handleToggleApproval = async (id: string) => {
    await dbService.toggleTestimonialApproval(id);
    loadReviews();
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.client_name || !newReview.review) return;

    await dbService.submitTestimonial({
      client_name: newReview.client_name,
      company: newReview.company || 'Legacy Client',
      review: newReview.review,
      rating: newReview.rating,
      image_url: '/images/testimonials/avatar.jpg',
      published: true
    });

    setSuccess(true);
    setNewReview({ client_name: '', company: '', review: '', rating: 5 });
    loadReviews();
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="space-y-1">
        <span className="font-jetbrains text-xs text-gold tracking-widest uppercase">AUDIENCE SATISFACTION MODERATION</span>
        <h1 className="font-cormorant text-4xl text-pearl">Testimonials Moderator</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Add Review form */}
        <div className="p-6 rounded glass-card border-l-4 border-l-gold bg-graphite/70 h-fit space-y-6">
          <div className="border-b border-gold/10 pb-4">
            <span className="font-jetbrains text-[9px] text-gold tracking-widest uppercase">
              REGISTER NEW REPUTATION
            </span>
            <h3 className="font-cormorant text-2xl text-pearl leading-none mt-1">
              Add Direct Review
            </h3>
          </div>

          {success && (
            <div className="p-3 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-jetbrains text-[10px] rounded text-center">
              ✔ Review submitted directly into testimonials feed.
            </div>
          )}

          <form onSubmit={handleCreateReview} className="space-y-4 font-jetbrains text-xs">
            <div className="flex flex-col gap-1.5">
              <span className="text-platinum/50 uppercase">Client Name *</span>
              <input
                type="text"
                required
                placeholder="e.g. Nandan Nilekani"
                value={newReview.client_name}
                onChange={e => setNewReview({ ...newReview, client_name: e.target.value })}
                className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Company</span>
                <input
                  type="text"
                  placeholder="e.g. Infosys Link"
                  value={newReview.company}
                  onChange={e => setNewReview({ ...newReview, company: e.target.value })}
                  className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-platinum/50 uppercase">Stars Rating</span>
                <select
                  value={newReview.rating}
                  onChange={e => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                  className="bg-obsidian border border-white/10 rounded px-2.5 py-2 text-pearl focus:border-gold outline-none cursor-pointer"
                >
                  <option value="5">5 STARS MASTER</option>
                  <option value="4">4 STARS RESILIENT</option>
                  <option value="3">3 STARS COAXIAL</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-platinum/50 uppercase">Review Quote Statement *</span>
              <textarea
                rows={3}
                required
                placeholder="Detail precision concrete frames, steel joints, on-time parameters..."
                value={newReview.review}
                onChange={e => setNewReview({ ...newReview, review: e.target.value })}
                className="bg-obsidian border border-white/10 rounded px-3 py-2 text-pearl focus:border-gold outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold hover:bg-champagne text-obsidian font-bold py-3 rounded tracking-widest uppercase transition-colors"
            >
              REGISTER TESTIMONIAL
            </button>
          </form>
        </div>

        {/* Right Side Review Feed list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded border border-gold/15 bg-graphite/40 overflow-hidden divide-y divide-white/5">
            {reviews.map(rev => (
              <div key={rev.id} className="p-5 flex justify-between items-start gap-6 hover:bg-white/2 transition-colors">
                <div className="space-y-3 flex-1 font-dm text-xs">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full border border-gold bg-obsidian flex items-center justify-center text-gold">
                        <User size={16} />
                      </div>
                      <div>
                        <h4 className="font-bebas text-lg text-pearl tracking-wider uppercase leading-none">{rev.client_name}</h4>
                        <span className="font-jetbrains text-[8px] text-platinum/50 tracking-widest uppercase mt-0.5 block">
                          {rev.company} | RECORD INDICES
                        </span>
                      </div>
                    </div>

                    {/* Star indicators */}
                    <div className="flex gap-0.5 text-gold">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={10} fill="#D4AF37" className="stroke-none" />
                      ))}
                    </div>
                  </div>

                  <p className="font-cormorant italic text-sm text-pearl leading-relaxed bg-white/3 p-3 border-l border-gold/30 rounded-r">
                    "{rev.review}"
                  </p>
                </div>

                <button
                  onClick={() => handleToggleApproval(rev.id)}
                  className={`p-2 border rounded font-jetbrains text-[8px] tracking-wider uppercase flex flex-col items-center gap-1 shrink-0 ${
                    rev.published 
                      ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-bold' 
                      : 'border-white/10 bg-white/3 text-platinum/50'
                  }`}
                  title={rev.published ? 'Retract and hide review' : 'Approve and publish review'}
                >
                  {rev.published ? (
                    <>
                      <Eye size={14} />
                      <span>APPROVED</span>
                    </>
                  ) : (
                    <>
                      <EyeOff size={14} />
                      <span>HIDDEN</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
