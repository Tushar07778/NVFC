
import React, { useState } from 'react';
import { INITIAL_PLAYERS } from '../constants';
import {
  Shield,
  User,
  BarChart2,
  Zap,
  Flame,
  Trophy,
  Award,
  ChevronRight,
  Target,
  Users
} from 'lucide-react';
import { Position } from '../types';

const Squad: React.FC = () => {
  const [filter, setFilter] = useState<Position | 'All'>('All');

  const positions: (Position | 'All')[] = ['All', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

  const filteredPlayers = filter === 'All'
    ? INITIAL_PLAYERS
    : INITIAL_PLAYERS.filter(p => p.position === filter);

  return (
    <div className="min-h-screen bg-[#071324] text-white selection:bg-nv-yellow selection:text-[#071324]">
      {/* Visual Overlays */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-[100]" />
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none z-[100]" />

      {/* 01. CINEMATIC SQUAD HEADER - ENHANCED */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image - ENHANCED */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000"
            alt="Stadium Atmosphere"
            className="w-full h-full object-cover brightness-[0.2] grayscale scale-105 animate-float"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-[#071324]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071324]/50 via-transparent to-[#071324]/50 animate-gradient" style={{ backgroundImage: 'linear-gradient(90deg, #071324 0%, transparent 50%, #071324 100%)' }} />
          {/* Ambient Glows - ENHANCED */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-nv-yellow/10 blur-[120px] rounded-full animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6 sm:space-y-8 animate-reveal">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 text-nv-yellow mb-2">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 fill-nv-yellow/10" />
              <span className="font-black text-[9px] sm:text-[10px] uppercase tracking-[0.5em] sm:tracking-[0.6em]">TEAM ROSTER</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[8rem] font-black italic uppercase leading-[0.8] tracking-tighter">
              THE VALLEYS <br /> <span className="text-nv-yellow text-glow">ELITE</span>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/40 font-medium tracking-widest uppercase">
            SEASON 2024 / 2025 • MISSION REDEMPTION
          </p>
        </div>
      </section>

      {/* 02. POSITION FILTERS - ENHANCED GLASSMORPHISM */}
      <section className="sticky top-20 z-40 px-4 sm:px-6 mt-8 sm:-mt-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="glass-strong p-2 sm:p-3 rounded-full shadow-2xl flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar shimmer">
            {positions.map((pos) => (
              <button
                key={pos}
                onClick={() => setFilter(pos)}
                className={`px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap hover-scale ${filter === pos
                  ? 'bg-nv-yellow text-[#071324] shadow-[0_10px_20px_rgba(255,215,0,0.3)] scale-105 animate-pulse-glow'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
              >
                {pos === 'All' ? 'ALL' : `${pos}S`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 03. PLAYER GRID - Premium Statue Style */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            {filteredPlayers.map((player, idx) => (
              <div
                key={player.id}
                className="group relative animate-reveal"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {/* Player Card Container - ENHANCED */}
                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden glass hover:border-nv-yellow/30 transition-premium shadow-2xl group-hover:-translate-y-4 hover-scale">
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nv-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />

                  {/* Player Image with Cinematic Statue Lighting */}
                  <div className="relative h-full w-full overflow-hidden">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-full object-cover object-top grayscale brightness-75 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000"
                    />

                    {/* Statue Lighting Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-[#071324]/20 to-transparent opacity-80" />

                    {/* Big Number Reveal */}
                    <div className="absolute top-8 right-8 overflow-hidden">
                      <span className="font-oswald text-9xl font-black text-white/5 group-hover:text-nv-yellow/10 transition-colors italic leading-none block transform translate-y-4 group-hover:translate-y-0 duration-700">
                        {player.number}
                      </span>
                    </div>

                    {/* Bottom Info Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 space-y-3 z-10 transition-transform duration-700 group-hover:translate-y-[-70%]">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-nv-yellow rounded-full" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-nv-yellow">{player.position}</p>
                      </div>
                      <h3 className="font-oswald text-4xl font-black italic uppercase leading-[0.85] tracking-tighter">
                        {player.name.split(' ')[0]} <br />
                        <span className="text-white/40 group-hover:text-white transition-colors">{player.name.split(' ').slice(1).join(' ')}</span>
                      </h3>
                    </div>

                    {/* Hover Stats Section - ENHANCED */}
                    <div className="absolute inset-x-0 bottom-0 p-8 h-[70%] glass-strong border-t translate-y-full group-hover:translate-y-0 transition-transform duration-700 z-20">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">APPEARANCES</p>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-nv-yellow" />
                            <span className="text-2xl font-black italic">{player.stats.appearances}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">{player.position === 'Goalkeeper' ? 'CLEAN SHEETS' : 'GOALS'}</p>
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-nv-yellow" />
                            <span className="text-2xl font-black italic">{player.position === 'Goalkeeper' ? player.stats.cleanSheets : player.stats.goals}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">ASSISTS</p>
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-nv-yellow" />
                            <span className="text-2xl font-black italic">{player.stats.assists}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[8px] font-black text-white/30 uppercase tracking-widest">NATION</p>
                          <p className="text-lg font-black uppercase tracking-tighter text-nv-yellow">{player.nationality}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-[10px] font-medium text-white/40 line-clamp-2 leading-relaxed">
                          {player.bio}
                        </p>
                        <button className="w-full bg-nv-yellow text-[#071324] py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white transition-premium flex items-center justify-center gap-2 group/btn animate-pulse-glow">
                          VIEW FULL PROFILE <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COACHING STAFF SECTION */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 border-t border-white/5 relative bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 animate-reveal">
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-nv-yellow">
              <div className="w-8 sm:w-10 md:w-12 h-px bg-nv-yellow" />
              <span className="font-black text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em]">THE ARCHITECTS</span>
              <div className="w-8 sm:w-10 md:w-12 h-px bg-nv-yellow" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black italic uppercase tracking-tighter">COACHING <span className="text-nv-yellow">STAFF</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-5xl mx-auto">
            {[
              { name: "Vikram Chatterjee", role: "Head Coach", bio: "Former international with a deep understanding of the Valley's football culture." },
              { name: "Marco Rossi", role: "Technical Director", bio: "Brings European tactical expertise and player development methodologies." },
              { name: "Sanjay Dutta", role: "Goalie Coach", bio: "The man responsible for developing the best shot-stoppers in the league." }
            ].map((staff, i) => (
              <div key={i} className="glass p-10 rounded-[3rem] hover:border-nv-yellow/20 transition-premium hover:-translate-y-2 group hover-scale shimmer">
                <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                <Users className="w-12 h-12 text-nv-yellow mb-6 opacity-40 group-hover:opacity-100 transition-opacity relative z-10" />
                <h3 className="text-2xl font-black italic uppercase text-white mb-2 relative z-10">{staff.name}</h3>
                <p className="text-nv-yellow text-[10px] font-black uppercase tracking-widest mb-6 relative z-10">{staff.role}</p>
                <p className="text-white/40 text-sm font-medium leading-relaxed relative z-10">{staff.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Squad;
