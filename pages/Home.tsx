
import React, { useState, useEffect } from 'react';
import { INITIAL_NEWS, INITIAL_MATCHES, INITIAL_PLAYERS } from '../constants';
import {
  ArrowRight,
  Shield,
  Trophy,
  ExternalLink,
  Users,
  Calendar,
  Ticket,
  BarChart3,
  Star,
  Zap,
  Flame,
  Heart,
  Clock,
  Play,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const nextMatch = INITIAL_MATCHES.find(m => m.status === 'Upcoming') || INITIAL_MATCHES[0];
  const starPlayer = INITIAL_PLAYERS[0];
  const latestMatch = [...INITIAL_MATCHES].reverse().find(m => m.status === 'Finished') || INITIAL_MATCHES[1];

  // Match Countdown Logic - Dynamically linked to nextMatch
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(nextMatch.date + 'T' + nextMatch.time + ':00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [nextMatch]);

  const formatNum = (num: number) => (num !== undefined ? num : 0).toString().padStart(2, '0');
  const nameParts = starPlayer?.name?.split(' ') || ['NVFC', 'Player'];

  return (
    <div className="flex flex-col min-h-screen font-oswald relative overflow-x-hidden bg-[#071324] text-white selection:bg-nv-yellow selection:text-[#071324]">
      {/* Visual Overlays */}
      <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-[100]" />
      <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none z-[100]" />

      {/* 01. CINEMATIC HERO SECTION - PREMIUM ENHANCED */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 lg:pb-0 overflow-hidden">
        {/* Hero Background with Animated Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=100&w=2400"
            alt="NVFC Stadium"
            className="w-full h-full object-cover object-bottom scale-105 "
          />
          <div className="absolute inset-0 bg-[#071324]/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071324]/50 via-transparent to-[#071324]/50 " style={{ backgroundImage: 'linear-gradient(90deg, #071324 0%, transparent 50%, #071324 100%)' }} />
          {/* Floating particles effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-nv-yellow rounded-full " style={{ animationDelay: '0s', animationDuration: '8s' }} />
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full " style={{ animationDelay: '2s', animationDuration: '6s' }} />
            <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-nv-yellow/60 rounded-full " style={{ animationDelay: '4s', animationDuration: '10s' }} />
          </div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-[1200px] mx-auto w-full flex flex-col items-center mt-8 sm:-mt-16 md:-mt-20">
          <div className="mb-4 sm:mb-6 animate-reveal">
            <div className="inline-flex items-center gap-2 glass-strong px-3 sm:px-4 py-1.5 rounded-full shadow-2xl ">
              <Flame className="w-3 h-3 text-nv-yellow fill-nv-yellow animate-pulse" />
              <span className="text-white text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]">Jabalpur's Legacy • Est. 1988</span>
            </div>
          </div>

          <div className="mb-6 sm:mb-8 animate-reveal" style={{ animationDelay: '0.1s' }}>
            <h1 className="text-white text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[10rem] font-bold tracking-tighter uppercase leading-[0.8] mb-1 hover:text-glow transition-all duration-300">
              PRIDE OF THE
            </h1>
            <h1 className="text-nv-yellow text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[10rem] font-bold tracking-tighter uppercase leading-[0.8] italic text-glow">
              VALLEY
            </h1>
          </div>

          <div className="max-w-2xl mx-auto mb-12 sm:mb-16 animate-reveal" style={{ animationDelay: '0.2s' }}>
            <p className="text-gray-300 text-sm sm:text-base md:text-xl font-medium tracking-[0.05em] sm:tracking-[0.1em] uppercase opacity-90 mb-6 sm:mb-8 md:mb-10">
              One River. One Vision. One Football Club.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
              <Link to="/matches" className="bg-nv-yellow text-[#071324] px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl font-black uppercase text-sm sm:text-base tracking-tight transition-all hover:bg-white hover:scale-105 active:scale-95 flex items-center justify-center group shadow-2xl ">
                MATCH TICKETS <ArrowRight className="ml-2 sm:ml-3 w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/club" className="glass-strong text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-xl font-black uppercase text-sm sm:text-base tracking-tight transition-all hover:bg-white/10 hover:scale-105 active:scale-95 flex items-center justify-center group">
                THE CLUB <ChevronRight className="ml-2 w-4 h-4 opacity-50" />
              </Link>
            </div>
          </div>
        </div>
        {/* BROADCAST HUD - ENHANCED GLASSMORPHISM */}
        <div className="relative mt-20 sm:mt-24 md:mt-32 mb-24 lg:mb-0 lg:absolute lg:bottom-12 lg:left-0 lg:mt-0 w-full flex justify-center z-20 px-4 sm:px-6">
          <div className="animate-reveal-up w-full max-w-[1400px]">
            <div className="flex flex-col xl:flex-row glass-strong rounded-[2.5rem] lg:rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] overflow-hidden  relative">
              <div className="absolute inset-0 bg-gradient-to-r from-nv-yellow/5 via-transparent to-nv-yellow/5 pointer-events-none" />

              {/* LATEST RESULT */}
              <div className="px-6 sm:px-8 md:px-10 lg:px-14 py-6 lg:py-10 flex flex-col items-center justify-center border-b xl:border-b-0 xl:border-r border-white/5 min-w-[300px] sm:min-w-[340px] bg-white/[0.01] relative">
                <p className="text-nv-yellow text-[8px] lg:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-4 opacity-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" /> LATEST RESULT: FT
                </p>
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                  <div className="flex flex-col items-center">
                    <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white/20 mb-1" />
                    <span className="text-[7px] font-black text-white/40 tracking-widest uppercase">NVFC</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-black/40 px-4 sm:px-6 py-2 rounded-2xl border border-white/5">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-tighter text-nv-yellow">{latestMatch.score?.nvfc}</span>
                    <div className="w-px h-6 sm:h-8 bg-white/10" />
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-tighter text-white">{latestMatch.score?.opponent}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    {latestMatch.opponentLogo ? (
                      <img src={latestMatch.opponentLogo} alt={latestMatch.opponent} className="h-6 w-6 sm:h-8 sm:w-8 object-contain mb-1 opacity-60" />
                    ) : (
                      <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white/20 mb-1" />
                    )}
                    <span className="text-[7px] font-black text-white/40 tracking-widest uppercase">{latestMatch.opponent.split(' ')[0]}</span>
                  </div>
                </div>
              </div>

              {/* NEXT MATCH INFO */}
              <div className="px-6 sm:px-8 md:px-10 lg:px-14 py-6 lg:py-10 flex flex-col items-center justify-center border-b xl:border-b-0 xl:border-r border-white/5 min-w-[300px] sm:min-w-[340px] bg-white/[0.03]">
                <p className="text-nv-yellow text-[8px] lg:text-[10px] font-black tracking-[0.3em] sm:tracking-[0.5em] uppercase mb-4 opacity-100 flex items-center gap-2 font-oswald">
                  NEXT MATCH: PRE-GAME
                </p>
                <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
                  <div className="relative flex-shrink-0">
                    <Shield className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-nv-yellow fill-nv-yellow/10" />
                  </div>
                  <div className="flex gap-3 sm:gap-4 md:gap-6">
                    {[
                      { val: timeLeft.days, label: 'DD' },
                      { val: timeLeft.hours, label: 'HH' },
                      { val: timeLeft.minutes, label: 'MM' },
                      { val: timeLeft.seconds, label: 'SS' },
                    ].map((t, idx) => (
                      <div key={idx} className="flex flex-col items-center font-oswald">
                        <span className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic leading-none tabular-nums tracking-tighter">{formatNum(t.val)}</span>
                        <span className="text-white/30 text-[7px] font-black tracking-widest mt-1 sm:mt-1.5">{t.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS - ENHANCED */}
              <div className="px-10 lg:px-16 py-8 lg:py-0 flex items-center justify-center gap-10 lg:gap-14 flex-1 relative bg-white/[0.01]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.01] to-transparent pointer-events-none " />
                {[
                  { to: "/matches", icon: Calendar, label: "FIXTURES" },
                  { to: "/store", icon: Zap, label: "SHOP" },
                  { to: "/news", icon: BarChart3, label: "STATS" }
                ].map((item, idx) => (
                  <Link key={idx} to={item.to} className="group flex flex-col items-center gap-3 hover-scale">
                    <div className="p-3.5 lg:p-4.5 rounded-2xl glass text-white group-hover:bg-nv-yellow group-hover:text-[#071324] transition-premium shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-nv-yellow/40 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <item.icon className="w-5 h-5 lg:w-6 lg:h-6 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    </div>
                    <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-nv-yellow transition-colors">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02. IDENTITY - Elite Glassmorphism Overhaul */}
      <section className="py-20 sm:py-28 md:py-32 lg:py-40 bg-[#071324] relative overflow-hidden">
        {/* Immersive Lighting Layers */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_40%,rgba(255,215,0,0.08)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_60%,rgba(16,33,65,0.4)_0%,transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(7,19,36,0.8)_0%,transparent_100%)] opacity-50" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-32 items-center">
            <div className="lg:col-span-6 space-y-8 sm:space-y-10 md:space-y-12 animate-reveal">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4 text-nv-yellow uppercase tracking-[0.4em] sm:tracking-[0.6em] font-black text-[10px] sm:text-[11px]">
                  <div className="h-1.5 w-8 sm:w-10 md:w-12 bg-nv-yellow rounded-full shadow-[0_0_15px_rgba(255,215,0,0.5)]" /> BORN ON THE RIVER BANKS
                </div>
                <h2 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[9rem] font-black italic tracking-tighter leading-[0.8] uppercase">
                  THE VALLEY <br /> <span className="text-nv-yellow drop-shadow-[0_10px_30px_rgba(255,215,0,0.2)]">SPIRIT</span>
                </h2>
                <p className="font-sans text-gray-400 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-lg pt-4 sm:pt-6 opacity-80">
                  More than a game, we are a movement. A community built on the shared heartbeat of the Narmada Valley.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-2 sm:pt-4">
                {[
                  { icon: Users, label: '35,000 Capacity', desc: 'Central India\'s footballing cathedral.' },
                  { icon: Heart, label: 'Fan Driven', desc: 'The members are the soul of the club.' },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-6 p-10 glass rounded-[2.5rem] hover:border-nv-yellow/40 transition-premium group shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] relative overflow-hidden hover-scale">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-nv-yellow/20 transition-colors duration-700" />
                    <div className="absolute inset-0  opacity-0 group-hover:opacity-100" />
                    <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center group-hover:bg-nv-yellow group-hover:text-[#071324] transition-premium shadow-xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <item.icon className="w-7 h-7 relative z-10 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-white text-2xl font-black uppercase italic tracking-tight mb-3 group-hover:text-nv-yellow transition-colors">{item.label}</h4>
                      <p className="font-sans text-gray-500 font-bold text-[11px] leading-relaxed uppercase tracking-widest">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 animate-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="relative rounded-[3rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)] group glass p-2 hover-scale">
                <div className="absolute inset-0  opacity-0 group-hover:opacity-100" />
                <div className="relative rounded-[2.5rem] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1200"
                    alt="Fans"
                    className="w-full h-[600px] object-cover transition-all duration-1000 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-12 left-12 right-12 flex items-end justify-between">
                    <div>
                      <p className="text-white text-5xl font-black italic uppercase tracking-tighter mb-3 leading-none group-hover:text-glow transition-all">THE BLUE WALL</p>
                      <p className="text-nv-yellow text-[11px] font-black uppercase tracking-[0.5em] opacity-90">Official Supporter's Stand</p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-nv-yellow text-[#071324] flex items-center justify-center transform group-hover:rotate-[360deg] transition-all duration-1000 shadow-[0_0_30px_rgba(255,215,0,0.4)] ">
                      <Shield className="w-7 h-7 fill-[#071324]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. STAR PLAYER - Premium Spotlight Enhancement */}
      <section className="py-24 sm:py-32 md:py-40 lg:py-48 bg-[#071324] relative overflow-hidden border-t border-white/5">
        {/* Dynamic Light Leaks & Atmosphere */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,215,0,0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(16,33,65,0.4)_0%,transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-noise opacity-[0.03] pointer-events-none" />

        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-[0.05] select-none pointer-events-none hidden lg:block">
          <span className="text-[50rem] font-black text-white italic leading-none tracking-tighter" style={{ WebkitTextStroke: '2px rgba(255,215,0,0.2)', color: 'transparent' }}>
            {starPlayer?.number || 10}
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 md:gap-20 items-center">
            <div className="relative max-w-2xl mx-auto lg:ml-0 animate-reveal">
              {/* Premium Image Container - SUPER ENHANCED */}
              <div className="relative group">
                <div className="absolute -inset-16 bg-gradient-to-r from-nv-yellow/20 via-nv-yellow/10 to-transparent blur-[120px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative aspect-[4/5] rounded-[2.5rem] sm:rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_80px_160px_-30px_rgba(0,0,0,0.9)] glass-strong p-2 sm:p-3 hover:scale-[1.02] transition-transform duration-700">
                  <div className="absolute inset-0 bg-gradient-to-br from-nv-yellow/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative h-full w-full rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-[#0a1929] to-[#071324]">
                    <img
                      src="https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?auto=format&fit=crop&q=90&w=800"
                      alt={starPlayer?.name}
                      className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100 brightness-90 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-transparent opacity-60" />

                    {/* Animated Light Ticker Overlay */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-nv-yellow to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[2000ms]" />

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-nv-yellow/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8 sm:space-y-10 md:space-y-12 animate-reveal" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-nv-yellow/20 to-nv-yellow/5 border border-nv-yellow/30 px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl backdrop-blur-sm shadow-[0_0_30px_rgba(255,215,0,0.2)] hover:shadow-[0_0_50px_rgba(255,215,0,0.4)] transition-all duration-500">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-nv-yellow fill-nv-yellow animate-pulse" />
                  <span className="text-nv-yellow text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">VALLEY SUPERSTAR</span>
                </div>
                <div>
                  <h3 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black leading-[0.8] uppercase tracking-tighter italic hover:text-glow transition-all duration-300">
                    {nameParts[0]} <br />
                    <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-nv-yellow via-yellow-400 to-nv-yellow animate-gradient" style={{ WebkitTextStroke: '1px rgba(255,215,0,0.3)' }}>
                      {nameParts.slice(1).join(' ')}
                    </span>
                  </h3>
                </div>
                <p className="font-sans text-gray-400 text-lg sm:text-xl md:text-2xl font-medium leading-relaxed max-w-lg opacity-80">
                  Leading the line with precision and passion. The pride of the valley's front line.
                </p>
              </div>

              <div className="flex flex-wrap gap-8">
                {[
                  { label: 'MATCHES', val: starPlayer?.stats?.appearances || 45, icon: '⚽' },
                  { label: 'ASSISTS', val: starPlayer?.stats?.assists || 12, icon: '🎯' },
                  { label: 'RATING', val: '8.4', icon: '⭐' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col border-l-4 border-nv-yellow/30 pl-8 py-3 bg-gradient-to-r from-white/5 to-transparent rounded-r-2xl hover:border-nv-yellow hover:from-nv-yellow/10 transition-all duration-500 group hover:scale-105">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{stat.icon}</span>
                      <span className="text-5xl font-black italic text-white group-hover:text-nv-yellow transition-colors">{stat.val}</span>
                    </div>
                    <span className="text-nv-yellow/40 text-[10px] font-black uppercase tracking-widest group-hover:text-nv-yellow transition-colors">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 flex gap-6">
                <button className="px-12 py-6 bg-gradient-to-r from-white to-gray-100 text-[#071324] rounded-2xl font-black uppercase text-sm tracking-[0.3em] hover:from-nv-yellow hover:to-yellow-500 transition-all duration-500 shadow-[0_25px_50px_-10px_rgba(255,215,0,0.3)] hover:shadow-[0_30px_60px_-10px_rgba(255,215,0,0.6)] flex items-center gap-4 group hover:scale-105">
                  PLAYER PROFILE <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. NEWS HUB - Premium Dark Redesign */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#071324] relative overflow-hidden border-t border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,33,65,0.4)_0%,transparent_50%)]" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 md:mb-20 gap-6 sm:gap-8">
            <div className="animate-reveal">
              <div className="flex items-center gap-2 sm:gap-3 text-nv-yellow mb-3 sm:mb-4">
                <div className="h-1 w-8 sm:w-10 bg-nv-yellow rounded-full" />
                <span className="font-black text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em]">VALLEY INSIDER</span>
              </div>
              <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black italic tracking-tighter leading-[0.8] uppercase">
                LATEST <br /> <span className="text-nv-yellow">UPDATES</span>
              </h2>
            </div>
            <Link to="/news" className="group flex items-center gap-5 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-[#071324] transition-premium shadow-2xl">
              EXPLORE ALL <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {INITIAL_NEWS.slice(0, 3).map((item, idx) => (
              <Link to={`/news`} key={item.id} className="group animate-reveal hover-scale" style={{ animationDelay: `${0.1 * (idx + 1)}s` }}>
                <div className="relative h-full flex flex-col glass rounded-[2.5rem] overflow-hidden hover:border-nv-yellow/30 transition-premium shadow-2xl">
                  <div className="absolute inset-0  opacity-0 group-hover:opacity-100" />
                  {/* Image Container */}
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071324] via-transparent to-transparent opacity-60" />

                    {/* Category Tag */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-nv-yellow text-[#071324] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl ">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-8 lg:p-10 flex flex-col flex-1 relative z-10">
                    <div className="flex items-center gap-3 text-white/30 mb-5">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[9px] font-bold uppercase tracking-widest">{item.date}</span>
                    </div>
                    <h3 className="text-white text-2xl lg:text-3xl font-black italic uppercase leading-tight tracking-tight mb-6 group-hover:text-nv-yellow transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-nv-yellow/40 group-hover:text-nv-yellow text-[9px] font-black uppercase tracking-[0.2em] transition-colors">READ ARTICLE</span>
                      <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-nv-yellow group-hover:text-[#071324] transition-premium group-hover:rotate-45">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 05. JOIN THE SPIRIT - ENHANCED HYPE BANNER */}
      <section className="py-16 sm:py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover grayscale brightness-50 scale-105 "
            alt="Stadium Interior"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071324] via-[#071324]/80 to-transparent " style={{ backgroundImage: 'linear-gradient(90deg, #071324 0%, rgba(7,19,36,0.8) 50%, transparent 100%)' }} />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-2xl space-y-6 sm:space-y-8 animate-reveal">
            <div className="flex items-center gap-2 sm:gap-3 text-nv-yellow">
              <span className="w-8 sm:w-10 md:w-12 h-0.5 bg-nv-yellow rounded-full " />
              <span className="font-black text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em]">BECOME A MEMBER</span>
            </div>
            <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black italic tracking-tighter leading-[0.85] uppercase">
              JOIN THE <br /> <span className="text-nv-yellow text-glow">VALLEY SPIRIT</span>
            </h2>
            <p className="font-sans text-gray-300 text-base sm:text-lg md:text-xl font-medium leading-relaxed">
              Don't just watch history. Be part of it. Get exclusive access to tickets, member-only content, and club events.
            </p>
            <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              <Link to="/donate" className="bg-nv-yellow text-[#071324] px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-premium shadow-[0_20px_40px_-10px_rgba(255,215,0,0.3)] ">
                JOIN NOW
              </Link>
              <button className="glass-strong text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-premium hover-scale">
                DOWNLOAD APP
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 06. PARTNERS - Premium Elite Finish */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-32 bg-[#071324] border-t border-white/5 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,33,65,0.2)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="flex flex-col items-center mb-12 sm:mb-16 md:mb-20 animate-reveal">
            <p className="text-[10px] sm:text-[11px] font-black text-nv-yellow uppercase tracking-[0.6em] sm:tracking-[0.8em] mb-4 sm:mb-5">OFFICIAL CLUB PARTNERS</p>
            <div className="h-1 w-12 sm:w-14 md:w-16 bg-nv-yellow rounded-full shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          </div>

          <div className="flex flex-wrap justify-center items-center gap-16 lg:gap-24">
            {[
              { src: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Tata_logo.svg", alt: "Tata Motors", h: "h-12" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", alt: "Nike", h: "h-10" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg", alt: "Adidas", h: "h-16" },
              { src: "https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Reliance_Jio_Logo.svg/300px-Reliance_Jio_Logo.svg.png", alt: "Reliance Jio", h: "h-8" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/5/53/HDFC_Bank_Logo.svg", alt: "HDFC Bank", h: "h-10" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/300px-SBI-logo.svg.png", alt: "State Bank of India", h: "h-11" },
              { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Mahindra_%26_Mahindra_Logo.svg/300px-Mahindra_%26_Mahindra_Logo.svg.png", alt: "Mahindra", h: "h-9" },
              { src: "https://upload.wikimedia.org/wikipedia/en/3/3b/Indigo_Air_Logo.svg", alt: "IndiGo", h: "h-10" }
            ].map((partner, i) => (
              <div
                key={i}
                className="group relative animate-reveal hover-scale"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="absolute -inset-8 bg-gradient-to-r from-white/5 via-nv-yellow/10 to-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-8 py-6 group-hover:bg-white/10 group-hover:border-nv-yellow/30 transition-all duration-500">
                  <img
                    src={partner.src}
                    className={`${partner.h} invert brightness-[0.5] group-hover:brightness-[2] group-hover:scale-110 transition-all duration-700 cursor-pointer object-contain grayscale group-hover:grayscale-0 drop-shadow-lg`}
                    alt={partner.alt}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
