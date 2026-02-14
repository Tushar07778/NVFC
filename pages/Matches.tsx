
import React, { useState } from 'react';
import { INITIAL_MATCHES, INITIAL_LEAGUE_TABLE } from '../constants';
import { Shield, MapPin, Calendar, Clock, Ticket, Trophy, Target, ChevronRight, Play, TrendingUp, Users, Activity, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { Match } from '../types';

const Matches: React.FC = () => {
  const [tab, setTab] = useState<'live' | 'fixtures' | 'results' | 'standings'>('live');
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const liveMatches = INITIAL_MATCHES.filter(m => m.status === 'Live');
  const fixtures = INITIAL_MATCHES.filter(m => m.status === 'Upcoming');
  const results = INITIAL_MATCHES.filter(m => m.status === 'Finished');

  const toggleMatchExpand = (matchId: string) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId);
  };

  const renderFormBadge = (result: string) => {
    const colors = {
      'W': 'bg-green-500',
      'D': 'bg-gray-500',
      'L': 'bg-red-500'
    };
    return (
      <div className={`w-6 h-6 rounded-full ${colors[result as keyof typeof colors]} flex items-center justify-center text-[10px] font-black text-white`}>
        {result}
      </div>
    );
  };

  const renderStatBar = (label: string, nvfcValue: number, opponentValue: number, max?: number) => {
    const total = max || (nvfcValue + opponentValue);
    const nvfcPercent = (nvfcValue / total) * 100;
    const opponentPercent = (opponentValue / total) * 100;

    return (
      <div className="mb-4">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
          <span className="text-nv-yellow">{nvfcValue}</span>
          <span className="text-gray-400">{label}</span>
          <span className="text-gray-300">{opponentValue}</span>
        </div>
        <div className="flex gap-2 h-2 rounded-full overflow-hidden bg-white/5">
          <div className="bg-nv-yellow rounded-l-full transition-all duration-500" style={{ width: `${nvfcPercent}%` }} />
          <div className="bg-gray-400 rounded-r-full transition-all duration-500" style={{ width: `${opponentPercent}%` }} />
        </div>
      </div>
    );
  };

  const renderExpandedMatchDetails = (match: Match) => {
    if (expandedMatch !== match.id) return null;

    return (
      <div className="mt-8 pt-8 border-t border-white/10 space-y-8 animate-reveal-up">
        {/* Match Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {match.referee && (
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-black mb-1">Referee</div>
              <div className="text-sm font-bold text-white">{match.referee}</div>
            </div>
          )}
          {match.attendance && (
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-black mb-1">Attendance</div>
              <div className="text-sm font-bold text-white">{match.attendance.toLocaleString()} / {match.stadiumCapacity?.toLocaleString()}</div>
            </div>
          )}
          {match.weather && (
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-gray-500 font-black mb-1">Weather</div>
              <div className="text-sm font-bold text-white">{match.weather.condition}, {match.weather.temperature}°C</div>
            </div>
          )}
        </div>

        {/* Form Guide & Head-to-Head */}
        {match.form && match.headToHead && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Guide */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xs uppercase tracking-widest font-black text-nv-yellow mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Form Guide (Last 5)
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">NVFC</span>
                  <div className="flex gap-1">
                    {match.form.nvfc.split('').map((result, i) => (
                      <React.Fragment key={i}>{renderFormBadge(result)}</React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{match.opponent}</span>
                  <div className="flex gap-1">
                    {match.form.opponent.split('').map((result, i) => (
                      <React.Fragment key={i}>{renderFormBadge(result)}</React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Head-to-Head */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xs uppercase tracking-widest font-black text-nv-yellow mb-4">Head-to-Head</h3>
              <div className="flex justify-around mb-4">
                <div className="text-center">
                  <div className="text-2xl font-black text-nv-yellow">{match.headToHead.nvfcWins}</div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">NVFC Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-gray-400">{match.headToHead.draws}</div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Draws</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-gray-300">{match.headToHead.opponentWins}</div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{match.opponent} Wins</div>
                </div>
              </div>
              <div className="space-y-1">
                {match.headToHead.lastFiveMeetings.slice(0, 3).map((meeting, i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-gray-500">{meeting.date}</span>
                    <span className={`font-bold ${meeting.result === 'W' ? 'text-green-400' : meeting.result === 'L' ? 'text-red-400' : 'text-gray-400'}`}>
                      {meeting.result} {meeting.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Match Statistics */}
        {match.statistics && (
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xs uppercase tracking-widest font-black text-nv-yellow mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Match Statistics
            </h3>
            <div className="space-y-3">
              {renderStatBar('Possession', match.statistics.possession.nvfc, match.statistics.possession.opponent, 100)}
              {renderStatBar('Shots', match.statistics.shots.nvfc, match.statistics.shots.opponent)}
              {renderStatBar('Shots on Target', match.statistics.shotsOnTarget.nvfc, match.statistics.shotsOnTarget.opponent)}
              {renderStatBar('Corners', match.statistics.corners.nvfc, match.statistics.corners.opponent)}
              {renderStatBar('Fouls', match.statistics.fouls.nvfc, match.statistics.fouls.opponent)}
              {renderStatBar('Saves', match.statistics.saves.nvfc, match.statistics.saves.opponent)}
            </div>
          </div>
        )}

        {/* Match Events & Commentary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Match Events */}
          {match.events && match.events.length > 0 && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xs uppercase tracking-widest font-black text-nv-yellow mb-4 flex items-center gap-2">
                <Play className="w-4 h-4" /> Match Events
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {[...match.events].reverse().map((event, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-white/5">
                    <div className="text-xs font-black text-nv-yellow w-8 shrink-0">{event.minute}'</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {event.type === 'Goal' && <span className="text-lg">⚽</span>}
                        {event.type === 'Yellow' && <span className="text-lg">🟨</span>}
                        {event.type === 'Red' && <span className="text-lg">🟥</span>}
                        {event.type === 'Sub' && <span className="text-lg">🔄</span>}
                        <span className="font-bold text-sm">{event.player}</span>
                      </div>
                      {event.description && <p className="text-xs text-gray-400">{event.description}</p>}
                      {event.assistedBy && <p className="text-xs text-gray-500 italic">Assist: {event.assistedBy}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Commentary */}
          {match.commentary && match.commentary.length > 0 && (
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h3 className="text-xs uppercase tracking-widest font-black text-nv-yellow mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Live Commentary
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                {[...match.commentary].reverse().map((comment, i) => (
                  <div key={i} className={`pb-3 border-b border-white/5 ${comment.isHighlight ? 'bg-nv-yellow/5 -mx-3 px-3 py-2 rounded-lg' : ''}`}>
                    <div className="text-xs font-black text-nv-yellow mb-1">{comment.minute}'</div>
                    <p className="text-sm text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lineups */}
        {match.lineup && (
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xs uppercase tracking-widest font-black text-nv-yellow mb-6 flex items-center gap-2">
              <Users className="w-4 h-4" /> Starting Lineups
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* NVFC Lineup */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-black text-nv-yellow text-sm">NVFC</h4>
                  <span className="text-xs bg-nv-yellow/20 px-3 py-1 rounded-full font-bold">{match.lineup.nvfc.formation}</span>
                </div>
                <div className="space-y-2">
                  {match.lineup.nvfc.startingXI.map((player) => (
                    <div key={player.id} className="flex items-center gap-3 bg-white/5 rounded-lg p-2">
                      <div className="w-8 h-8 rounded-lg bg-nv-yellow/20 border border-nv-yellow flex items-center justify-center font-black text-xs text-nv-yellow">
                        {player.number}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{player.name}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{player.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {match.lineup.nvfc.substitutes.length > 0 && (
                  <div className="mt-4">
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-black mb-2">Substitutes</div>
                    <div className="flex flex-wrap gap-2">
                      {match.lineup.nvfc.substitutes.map((sub) => (
                        <div key={sub.id} className="bg-white/5 px-2 py-1 rounded text-xs">
                          <span className="font-black text-nv-yellow">{sub.number}</span> {sub.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Opponent Lineup */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-black text-gray-300 text-sm">{match.opponent}</h4>
                  <span className="text-xs bg-white/10 px-3 py-1 rounded-full font-bold">{match.lineup.opponent.formation}</span>
                </div>
                <div className="space-y-2">
                  {match.lineup.opponent.startingXI.map((player) => (
                    <div key={player.id} className="flex items-center gap-3 bg-white/5 rounded-lg p-2">
                      <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center font-black text-xs">
                        {player.number}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{player.name}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{player.position}</div>
                      </div>
                    </div>
                  ))}
                </div>
                {match.lineup.opponent.substitutes.length > 0 && (
                  <div className="mt-4">
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-black mb-2">Substitutes</div>
                    <div className="flex flex-wrap gap-2">
                      {match.lineup.opponent.substitutes.map((sub) => (
                        <div key={sub.id} className="bg-white/5 px-2 py-1 rounded text-xs">
                          <span className="font-black">{sub.number}</span> {sub.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#071324] text-white selection:bg-nv-yellow selection:text-nv-blue">
      {/* Cinematic Header - ENHANCED */}
      <div className="relative h-[60vh] flex items-center overflow-hidden">
        {/* Stadium Background - ENHANCED */}
        <div
          className="absolute inset-0 bg-cover bg-center animate-float"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071324]/40 via-[#071324]/90 to-[#071324]" />
        <div className="absolute inset-0 animate-gradient" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255, 215, 0, 0.05) 50%, transparent 100%)' }} />

        <div className="relative max-w-7xl mx-auto px-6 w-full pt-12">
          <div className="animate-reveal-up">
            <div className="flex items-center gap-3 text-nv-yellow font-bold text-xs uppercase tracking-[0.4em] mb-6">
              <Trophy className="w-5 h-5" />
              <span>ISL Campaign 2024/25</span>
            </div>

            <div className="relative inline-block">
              <h1 className="font-oswald text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black italic uppercase tracking-tighter leading-[0.8]">
                Match <span className="text-transparent stroke-white text-stroke-thin" style={{ WebkitTextStroke: '1px white' }}>Centre</span>
              </h1>
              <div className="absolute -bottom-4 left-0 w-full h-4 bg-nv-yellow blur-md opacity-30 animate-pulse" />
              <div className="mt-4 w-full h-2 bg-nv-yellow rounded-full" />
            </div>

            <p className="mt-12 text-gray-300 max-w-2xl text-xl font-medium leading-relaxed opacity-80">
              Experience the pulse of the valley. From high-stakes derbies to championship fixtures, track our journey through the season.
            </p>
          </div>
        </div>
      </div>

      {/* Glass morphism Tab Bar - ENHANCED */}
      <div className="sticky top-20 z-50 -mt-12 px-4 sm:px-6">
        <div className="max-w-fit mx-auto glass-strong rounded-full p-1.5 sm:p-2 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] flex gap-1 sm:gap-2 shimmer overflow-x-auto">
          {['live', 'fixtures', 'results', 'standings'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 rounded-full font-black uppercase text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.25em] transition-all duration-500 whitespace-nowrap ${tab === t
                ? 'bg-nv-yellow text-nv-blue shadow-[0_0_30px_rgba(255,215,0,0.4)] scale-105 animate-pulse-glow'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {t}
              {t === 'live' && liveMatches.length > 0 && (
                <span className="ml-2 w-2 h-2 bg-red-500 rounded-full inline-block animate-pulse"></span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Live Matches Tab */}
        {tab === 'live' && (
          <div className="space-y-8">
            {liveMatches.length === 0 ? (
              <div className="text-center py-20">
                <div className="inline-block p-6 bg-white/5 rounded-full mb-4">
                  <Play className="w-12 h-12 text-gray-500" />
                </div>
                <p className="text-gray-400 text-lg">No live matches at the moment</p>
              </div>
            ) : (
              liveMatches.map((match) => (
                <div key={match.id} className="group relative bg-[#0A1931]/60 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] p-6 sm:p-8 md:p-10 lg:p-12 border-2 border-nv-yellow/40 transition-all duration-700 shadow-[0_40px_80px_-20px_rgba(255,215,0,0.3)] overflow-hidden">
                  {/* Live Indicator */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 flex items-center gap-2 bg-red-500 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <span className="text-white font-black text-[10px] sm:text-xs uppercase tracking-widest">Live</span>
                  </div>

                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-nv-yellow/20 to-red-500/10 opacity-100 transition-opacity duration-1000" />

                  <div className="relative">
                    {/* Match Minute */}
                    <div className="text-center mb-8">
                      <div className="inline-block bg-nv-yellow/20 border-2 border-nv-yellow px-6 py-2 rounded-full">
                        <span className="text-2xl font-black text-nv-yellow">{match.currentMinute}'</span>
                      </div>
                    </div>

                    {/* VS Layout */}
                    <div className="flex items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24 mb-6 sm:mb-8">
                      <div className="text-center group-hover:scale-110 transition-transform duration-1000">
                        <div className="relative mb-4 sm:mb-6">
                          <div className="absolute inset-0 bg-nv-yellow rounded-full blur-3xl opacity-50 animate-pulse" />
                          <div className="relative bg-[#071324] p-4 sm:p-6 md:p-8 rounded-full border-2 border-nv-yellow shadow-2xl">
                            <Shield className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-nv-yellow fill-nv-yellow/20" />
                          </div>
                        </div>
                        <p className="font-oswald text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-widest italic mb-2">NVFC</p>
                        <div className="text-4xl sm:text-5xl md:text-6xl font-black text-nv-yellow">{match.score?.nvfc}</div>
                      </div>

                      <div className="text-center">
                        <div className="font-oswald text-2xl sm:text-3xl md:text-4xl italic font-black text-white/10 tracking-tighter">VS</div>
                      </div>

                      <div className="text-center group-hover:scale-110 transition-transform duration-1000">
                        <div className="relative mb-4 sm:mb-6">
                          <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-20" />
                          <div className="relative bg-[#071324] p-4 sm:p-6 md:p-8 rounded-full border border-white/20 shadow-2xl overflow-hidden min-w-[100px] min-h-[100px] sm:min-w-[132px] sm:min-h-[132px] md:min-w-[148px] md:min-h-[148px] flex items-center justify-center">
                            <img
                              src={match.opponentLogo}
                              className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
                              alt={match.opponent}
                              onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/80?text=CLUB';
                              }}
                            />
                          </div>
                        </div>
                        <p className="font-oswald text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-widest italic mb-2">{match.opponent}</p>
                        <div className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-300">{match.score?.opponent}</div>
                      </div>
                    </div>

                    {/* Match Info */}
                    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                      <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                        <MapPin className="w-3 h-3 text-nv-yellow" />
                        {match.venue}
                      </div>
                      <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                        <Calendar className="w-3 h-3 text-nv-yellow" />
                        {match.date}
                      </div>
                    </div>

                    {/* Expand Button */}
                    <button
                      onClick={() => toggleMatchExpand(match.id)}
                      className="w-full bg-nv-yellow text-nv-blue font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                    >
                      {expandedMatch === match.id ? (
                        <>
                          <ChevronUp className="w-5 h-5" />
                          <span className="uppercase text-sm tracking-widest">Hide Details</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-5 h-5" />
                          <span className="uppercase text-sm tracking-widest">View Full Match Details</span>
                        </>
                      )}
                    </button>

                    {renderExpandedMatchDetails(match)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Fixtures Tab */}
        {tab === 'fixtures' && (
          <div className="space-y-16">
            {fixtures.map((match) => (
              <div key={match.id} className="group relative bg-[#0A1931]/60 backdrop-blur-2xl rounded-[2rem] sm:rounded-[3rem] md:rounded-[4rem] p-6 sm:p-10 md:p-12 lg:p-16 border border-white/10 hover:border-nv-yellow/40 transition-all duration-700 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-nv-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 md:gap-16">
                  {/* Match Metadata */}
                  <div className="flex flex-col gap-6 sm:gap-8 w-full lg:w-1/4">
                    <div className="space-y-3">
                      <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 text-sm font-black uppercase tracking-widest text-gray-200">
                        <Calendar className="w-4 h-4 text-nv-yellow" />
                        {match.date}
                      </div>
                      <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3 text-sm font-black uppercase tracking-widest text-gray-200">
                        <Clock className="w-4 h-4 text-nv-yellow" />
                        {match.time}
                      </div>
                    </div>
                    <div className="flex items-start gap-4 text-gray-400 font-bold group-hover:text-gray-200 transition-colors">
                      <MapPin className="w-6 h-6 text-nv-yellow shrink-0" />
                      <span className="text-sm uppercase tracking-widest leading-normal">{match.venue}</span>
                    </div>
                  </div>

                  {/* VS Layout */}
                  <div className="flex-1 flex items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
                    <div className="text-center group-hover:scale-110 transition-transform duration-1000">
                      <div className="relative mb-6 sm:mb-8">
                        <div className="absolute inset-0 bg-nv-yellow rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
                        <div className="relative bg-[#071324] p-4 sm:p-6 md:p-8 rounded-full border-2 border-nv-yellow shadow-2xl">
                          <Shield className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-nv-yellow fill-nv-yellow/20" />
                        </div>
                      </div>
                      <p className="font-oswald text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-widest italic leading-none">NVFC</p>
                    </div>

                    <div className="relative flex flex-col items-center">
                      <div className="font-oswald text-8xl md:text-9xl italic font-black text-white/5 tracking-tighter select-none rotate-[-10deg]">VS</div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-nv-yellow font-black italic tracking-[0.5em] text-2xl mb-2 ml-4">PRO</div>
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-nv-yellow to-transparent opacity-50" />
                      </div>
                    </div>

                    <div className="text-center group-hover:scale-110 transition-transform duration-1000">
                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-10 group-hover:opacity-30 transition-opacity" />
                        <div className="relative bg-[#071324] p-8 rounded-full border border-white/20 shadow-2xl overflow-hidden min-w-[148px] min-h-[148px] flex items-center justify-center">
                          <img
                            src={match.opponentLogo}
                            className="h-20 w-20 object-contain"
                            alt={match.opponent}
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/80?text=CLUB';
                            }}
                          />
                        </div>
                      </div>
                      <p className="font-oswald text-3xl font-black uppercase tracking-widest italic leading-none">{match.opponent}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-4 w-full lg:w-1/4">
                    <button className="group/btn relative bg-nv-yellow text-nv-blue font-black py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] overflow-hidden">
                      <Ticket className="w-5 h-5 font-black shrink-0 animate-bounce" />
                      <span className="uppercase text-sm tracking-widest">TICKET OFFICE</span>
                      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 skew-x-[45deg]" />
                    </button>
                    <button
                      onClick={() => toggleMatchExpand(match.id)}
                      className="bg-white/5 border border-white/10 text-white py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 hover:bg-white/10 uppercase text-[10px] tracking-[0.2em] font-bold"
                    >
                      <Target className="w-4 h-4 text-nv-yellow" />
                      {expandedMatch === match.id ? 'Hide Details' : 'Match Preview'}
                    </button>
                  </div>
                </div>

                {renderExpandedMatchDetails(match)}
              </div>
            ))}
          </div>
        )}

        {/* Results Tab */}
        {tab === 'results' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-reveal-up">
            {results.map((match) => (
              <div key={match.id} className="group relative bg-[#0A1931]/40 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-nv-yellow/30 transition-all duration-500">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="text-[10px] font-black tracking-[0.3em] text-nv-yellow uppercase opacity-60">Full Time • {match.date}</div>
                    <button
                      onClick={() => toggleMatchExpand(match.id)}
                      className="bg-white/5 p-2 rounded-lg group-hover:bg-nv-yellow/10 transition-colors"
                    >
                      {expandedMatch === match.id ? <ChevronUp className="w-4 h-4 text-nv-yellow" /> : <Play className="w-4 h-4 text-nv-yellow" />}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="flex flex-col items-center gap-3 flex-1">
                      <Shield className={`h-10 w-10 ${match.isHome ? 'text-nv-yellow' : 'text-gray-500'} fill-current`} />
                      <span className="font-oswald text-lg font-bold uppercase tracking-wide">{match.isHome ? 'NVFC' : match.opponent}</span>
                    </div>

                    <div className="px-6 py-3 bg-[#071324] rounded-2xl border border-white/5 text-4xl font-black italic tracking-tighter shadow-inner min-w-[120px] text-center">
                      <span className={match.score?.nvfc! > match.score?.opponent! ? 'text-nv-yellow' : ''}>{match.isHome ? match.score?.nvfc : match.score?.opponent}</span>
                      <span className="mx-2 text-white/20">-</span>
                      <span className={match.score?.opponent! > match.score?.nvfc! ? 'text-nv-yellow' : ''}>{match.isHome ? match.score?.opponent : match.score?.nvfc}</span>
                    </div>

                    <div className="flex flex-col items-center gap-3 flex-1">
                      {match.isHome ? (
                        <img src={match.opponentLogo} className="h-10 w-10 object-contain" alt={match.opponent} />
                      ) : (
                        <Shield className="h-10 w-10 text-nv-yellow fill-current" />
                      )}
                      <span className="font-oswald text-lg font-bold uppercase tracking-wide">{match.isHome ? match.opponent : 'NVFC'}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleMatchExpand(match.id)}
                    className="w-full py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] border border-white/5 bg-white/5 hover:bg-nv-yellow hover:text-nv-blue transition-all duration-300"
                  >
                    {expandedMatch === match.id ? 'Hide Match Report' : 'Detailed Match Report'}
                  </button>
                </div>

                {renderExpandedMatchDetails(match)}
              </div>
            ))}
          </div>
        )}

        {/* Standings Tab */}
        {tab === 'standings' && (
          <div className="bg-[#0A1931]/60 backdrop-blur-3xl rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl animate-reveal-up">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-[10px] uppercase tracking-[0.3em] font-black text-gray-400">
                    <th className="px-8 py-6">Pos</th>
                    <th className="px-8 py-6">Club</th>
                    <th className="px-8 py-6">Played</th>
                    <th className="px-8 py-6 text-center">W</th>
                    <th className="px-8 py-6 text-center">D</th>
                    <th className="px-8 py-6 text-center">L</th>
                    <th className="px-8 py-6 text-center">GD</th>
                    <th className="px-8 py-6 text-end">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {INITIAL_LEAGUE_TABLE.map((row) => (
                    <tr
                      key={row.rank}
                      className={`group hover:bg-white/5 transition-colors ${row.team === 'NVFC' ? 'bg-nv-yellow/5' : ''}`}
                    >
                      <td className="px-8 py-6">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-oswald font-black italic border ${row.rank <= 4 ? 'border-nv-yellow/30 text-nv-yellow bg-nv-yellow/10' : 'border-white/10 text-gray-500'
                          }`}>
                          {row.rank}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          {row.team === 'NVFC' ? (
                            <Shield className="h-6 w-6 text-nv-yellow fill-nv-yellow/10 group-hover:animate-pulse" />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-white/10" />
                          )}
                          <span className={`font-bold tracking-wide uppercase ${row.team === 'NVFC' ? 'text-nv-yellow' : 'text-gray-200'}`}>
                            {row.team}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-mono text-gray-400 font-bold">{row.played}</td>
                      <td className="px-8 py-6 text-center font-mono opacity-60">{row.won}</td>
                      <td className="px-8 py-6 text-center font-mono opacity-60">{row.drawn}</td>
                      <td className="px-8 py-6 text-center font-mono opacity-60">{row.lost}</td>
                      <td className="px-8 py-6 text-center font-mono text-gray-500">{row.gd > 0 ? `+${row.gd}` : row.gd}</td>
                      <td className="px-8 py-6 text-end">
                        <div className={`font-oswald text-2xl font-black italic ${row.team === 'NVFC' ? 'text-nv-yellow' : 'text-white'}`}>
                          {row.points}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white/5 px-8 py-4 flex items-center gap-6">
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-black text-gray-500">
                <div className="w-2 h-2 rounded-full bg-nv-yellow" /> Champions League
              </div>
              <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-black text-gray-500">
                <div className="w-2 h-2 rounded-full bg-blue-500" /> Continental Playoff
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Light Leak */}
      <div className="fixed bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-nv-yellow/5 to-transparent pointer-events-none" />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 215, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 215, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Matches;
