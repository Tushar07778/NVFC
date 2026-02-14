
import React, { useState } from 'react';
import { INITIAL_NEWS } from '../constants';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Tag,
  Search,
  Filter,
  Play,
  ChevronRight,
  ArrowRight,
  Clock,
  TrendingUp,
  Share2,
  Video
} from 'lucide-react';

const News: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Transfers', 'Match Report', 'Announcement', 'Community'];

  const featuredNews = INITIAL_NEWS.find(n => n.isFeatured) || INITIAL_NEWS[0];
  const otherNews = INITIAL_NEWS.filter(n => n.id !== featuredNews.id);

  const filteredNews = activeCategory === 'All'
    ? otherNews
    : otherNews.filter(n => n.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#071324] text-white selection:bg-nv-yellow selection:text-[#071324]">
      {/* Visual Overlays */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-[100]" />
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none z-[100]" />

      {/* CINEMATIC NEWS HERO - ENHANCED */}
      <section className="relative h-[85vh] min-h-[600px] flex items-end overflow-hidden">
        {/* Background Layers - ENHANCED */}
        <div className="absolute inset-0 z-0">
          <img
            src={featuredNews.image}
            alt={featuredNews.title}
            className="w-full h-full object-cover brightness-[0.4] scale-105 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-[#071324]/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,215,0,0.1),transparent_50%)] animate-gradient" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 pb-24 relative z-10 w-full">
          <div className="max-w-4xl space-y-8 animate-reveal">
            <div className="flex items-center gap-4">
              <span className="bg-nv-yellow text-[#071324] px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_10px_20px_rgba(255,215,0,0.3)]">
                FEATURED STORY
              </span>
              <div className="h-px w-20 bg-white/10" />
            </div>

            <h1 className="text-6xl md:text-[7rem] font-black italic uppercase leading-[0.85] tracking-tighter">
              {featuredNews.title}
            </h1>

            <p className="text-xl md:text-2xl text-white/60 font-medium leading-relaxed max-w-2xl line-clamp-2">
              {featuredNews.summary}
            </p>

            <div className="flex flex-wrap gap-6 pt-6">
              <button className="bg-white text-[#071324] px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-nv-yellow transition-premium shadow-2xl flex items-center gap-3 group animate-pulse-glow">
                READ ARTICLE <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-4 px-8 py-5 rounded-2xl glass-strong shimmer">
                <Clock className="w-5 h-5 text-nv-yellow" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{featuredNews.date}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HUB CONTROLS - Filter Bar ENHANCED */}
      <section className="sticky top-20 z-40 px-6 -mt-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="glass-strong p-4 rounded-[2rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 shimmer">
            <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar px-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap hover-scale ${activeCategory === cat
                    ? 'bg-nv-yellow text-[#071324] shadow-lg scale-105 animate-pulse-glow'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto px-4">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="SEARCH NEWS..."
                  className="w-full bg-black/20 border border-white/5 rounded-xl py-3 pl-12 pr-4 text-[10px] font-bold tracking-widest focus:outline-none focus:border-nv-yellow/50 transition-colors uppercase"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALLEY TV - Media Highlights Section */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-end justify-between mb-16 px-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-nv-yellow">
                <div className="w-8 h-1 bg-nv-yellow rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">EXCLUSIVE ACCESS</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">
                VALLEY <span className="text-nv-yellow">TV</span>
              </h2>
            </div>
            <Link to="/media" className="hidden md:flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-nv-yellow transition-colors group">
              VIEW MEDIA CENTER <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {[
              { title: "Match Highlights: NVFC vs BFC", thumb: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800", time: "08:24" },
              { title: "Inside Training: The Blue Wall", thumb: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800", time: "12:15" },
              { title: "Arjun Singh Exclusive Interview", thumb: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800", time: "05:40" },
              { title: "NVFC Academy: The Next Generation", thumb: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800", time: "15:20" }
            ].map((video, idx) => (
              <div key={idx} className="group relative aspect-video rounded-[2rem] overflow-hidden glass hover-scale shimmer cursor-pointer">
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                <img src={video.thumb} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-nv-yellow text-[#071324] flex items-center justify-center scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-2xl shadow-nv-yellow/20">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] font-black uppercase text-white tracking-tight line-clamp-1 mb-2 transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">{video.title}</p>
                  <div className="flex items-center gap-2 text-[8px] font-black text-white/40 tracking-widest transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <Video className="w-3 h-3" /> {video.time} DURATION
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS GRID - Glassmorphism 2.0 */}
      <section className="py-24 px-6 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredNews.map((post, idx) => (
              <Link to={`/news`} key={post.id} className="group animate-reveal" style={{ animationDelay: `${0.1 * idx}s` }}>
                <div className="h-full flex flex-col glass rounded-[3rem] overflow-hidden hover:border-nv-yellow/40 transition-premium shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] hover-scale shimmer">
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  {/* Image Header */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000"
                      alt={post.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-transparent opacity-80" />

                    <div className="absolute top-8 left-8">
                      <span className="bg-nv-yellow text-[#071324] px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-2xl">
                        {post.category}
                      </span>
                    </div>

                    <button className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-nv-yellow hover:text-[#071324]">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content Area */}
                  <div className="p-10 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-white/30 mb-6">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-nv-yellow" />
                        <span className="text-[9px] font-black uppercase tracking-widest">TRENDING</span>
                      </div>
                      <div className="w-1 h-1 bg-white/10 rounded-full" />
                      <span className="text-[9px] font-black uppercase tracking-widest">{post.date}</span>
                    </div>

                    <h3 className="text-white text-3xl font-black italic uppercase leading-[0.9] tracking-tighter mb-6 group-hover:text-nv-yellow transition-colors line-clamp-3">
                      {post.title}
                    </h3>

                    <p className="text-white/40 text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                      {post.summary}
                    </p>

                    <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 group-hover:text-nv-yellow transition-premium">
                        FULL ARTICLE
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-nv-yellow group-hover:text-[#071324] transition-premium shadow-xl">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* LOAD MORE BUTTON - ENHANCED */}
          <div className="mt-24 flex justify-center">
            <button className="px-16 py-6 glass border border-white/10 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-[#071324] transition-premium flex items-center gap-4 group shimmer animate-pulse-glow">
              LOAD MORE NEWS <TrendingUp className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* MEDIA CTA BANNER */}
      <section className="py-32 px-6">
        <div className="max-w-[1400px] mx-auto bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.1),transparent_50%)] rounded-[4rem] border border-white/5 p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-nv-yellow/5 to-transparent pointer-events-none" />
          <div className="max-w-2xl relative z-10 space-y-8">
            <h2 className="text-5xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter">
              UNPARALLELED <br /> <span className="text-nv-yellow">ACCESS</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-medium leading-relaxed">
              Unlock behind-the-scenes content, exclusive documentaries, and limited edition drops by joining NVFC+.
            </p>
            <div className="pt-4 flex flex-wrap gap-6">
              <button className="bg-nv-yellow text-[#071324] px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-premium shadow-2xl animate-pulse-glow">
                JOIN NVFC+ NOW
              </button>
              <button className="glass-strong backdrop-blur-xl text-white px-12 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-white/10 transition-premium shimmer">
                LOG IN
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
