import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
    Ticket,
    Trophy,
    ShoppingBag,
    Newspaper,
    Star,
    Calendar,
    Heart,
    TrendingUp,
    User,
    ArrowRight,
    ShoppingCart,
    Zap
} from 'lucide-react';
import { INITIAL_MATCHES, INITIAL_NEWS } from '../constants';

const UserDashboard: React.FC = () => {
    const { user } = useAuth();
    const nextMatch = INITIAL_MATCHES.find(m => m.status === 'Upcoming') || INITIAL_MATCHES[0];
    const latestNews = INITIAL_NEWS.slice(0, 3);

    const quickActions = [
        {
            title: 'Match Tickets',
            description: 'Book tickets for upcoming matches',
            icon: Ticket,
            color: 'from-blue-600 to-blue-500',
            bgGlow: 'group-hover:shadow-blue-500/30',
            link: '/matches'
        },
        {
            title: 'Team Store',
            description: 'Shop official merchandise',
            icon: ShoppingCart,
            color: 'from-violet-600 to-purple-500',
            bgGlow: 'group-hover:shadow-violet-500/30',
            link: '/store'
        },
        {
            title: 'View Fixtures',
            description: 'Check match schedule',
            icon: Calendar,
            color: 'from-emerald-600 to-green-500',
            bgGlow: 'group-hover:shadow-emerald-500/30',
            link: '/matches'
        },
        {
            title: 'Support Club',
            description: 'Make a donation',
            icon: Heart,
            color: 'from-rose-600 to-red-500',
            bgGlow: 'group-hover:shadow-rose-500/30',
            link: '/donate'
        },
    ];

    return (
        <div className="min-h-screen bg-[#071324] text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-[5]" />
            <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none z-[5]" />

            {/* Hero Section - Simplified */}
            <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-nv-yellow/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-nv-yellow/10 border border-nv-yellow/30 rounded-full">
                            <Star className="w-4 h-4 text-nv-yellow fill-nv-yellow" />
                            <span className="text-xs font-black uppercase tracking-widest text-nv-yellow">Member Dashboard</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">
                            Welcome Back,<br />
                            <span className="bg-gradient-to-r from-nv-yellow via-yellow-400 to-nv-yellow bg-clip-text text-transparent">
                                {user?.name || 'Fan Member'}
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl text-white/60 font-medium max-w-2xl mx-auto">
                            Your personal hub for all things NVFC
                        </p>
                    </div>
                </div>
            </section>

            {/* Quick Actions */}
            <section className="px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 flex items-center gap-3">
                        <Zap className="w-6 h-6 text-nv-yellow" />
                        Quick Actions
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        {quickActions.map((action, idx) => (
                            <Link
                                key={idx}
                                to={action.link}
                                className={`group glass-strong p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 text-left relative overflow-hidden ${action.bgGlow} shadow-lg hover:shadow-2xl hover:scale-105`}
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className={`p-4 rounded-xl bg-gradient-to-br ${action.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                                        <action.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-black mb-2">{action.title}</h3>
                                    <p className="text-sm text-white/60 font-medium">{action.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Next Match */}
            <section className="px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Next Match</h2>
                    <div className="glass rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-nv-yellow/5 via-transparent to-transparent" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-8">
                                <div className="text-center">
                                    <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">NVFC</p>
                                    <div className="w-16 h-16 bg-nv-yellow/10 rounded-2xl flex items-center justify-center">
                                        <Star className="w-8 h-8 text-nv-yellow fill-nv-yellow" />
                                    </div>
                                </div>
                                <div className="text-4xl font-black text-white/20">VS</div>
                                <div className="text-center">
                                    <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-2">{nextMatch.opponent}</p>
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center">
                                        <Trophy className="w-8 h-8 text-white/40" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-center lg:text-right">
                                <p className="text-sm font-bold uppercase tracking-widest text-nv-yellow mb-2">{nextMatch.date}</p>
                                <p className="text-lg font-medium text-white/60 mb-4">{nextMatch.time}</p>
                                <Link
                                    to="/matches"
                                    className="inline-flex items-center gap-2 bg-nv-yellow text-[#071324] px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all"
                                >
                                    <Ticket className="w-4 h-4" />
                                    Book Tickets
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Member Stats */}
            <section className="px-6 pb-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-8">Your Stats</h2>
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                        {[
                            { label: 'Matches Attended', value: '12', icon: Calendar },
                            { label: 'Member Since', value: '2024', icon: Star },
                            { label: 'Tickets Booked', value: '18', icon: Ticket },
                            { label: 'Support Level', value: 'Gold', icon: TrendingUp },
                        ].map((stat, idx) => (
                            <div key={idx} className="glass rounded-2xl p-6 text-center">
                                <stat.icon className="w-6 h-6 text-nv-yellow mx-auto mb-4" />
                                <p className="text-3xl font-black italic tracking-tighter mb-2">{stat.value}</p>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Latest News */}
            <section className="px-6 pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-end justify-between mb-8">
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Latest Updates</h2>
                        <Link to="/news" className="text-sm font-bold uppercase tracking-widest text-nv-yellow hover:text-white transition-colors flex items-center gap-2">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
                        {latestNews.map((news) => (
                            <Link to="/news" key={news.id} className="group glass rounded-[2rem] overflow-hidden hover:scale-105 transition-all">
                                <div className="aspect-video relative overflow-hidden">
                                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#071324] to-transparent" />
                                    <span className="absolute top-4 left-4 bg-nv-yellow text-[#071324] px-3 py-1 rounded-full text-[9px] font-black uppercase">
                                        {news.category}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-black italic uppercase tracking-tight mb-2 line-clamp-2 group-hover:text-nv-yellow transition-colors">
                                        {news.title}
                                    </h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-white/30">{news.date}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserDashboard;
