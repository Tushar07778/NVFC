import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Clock, Trophy, Search, X, Save, MapPin } from 'lucide-react';
import { INITIAL_MATCHES } from '../../constants';

interface Match {
    id: string;
    opponent: string;
    date: string;
    time: string;
    venue: string;
    competition: string;
    status: 'Upcoming' | 'Live' | 'Completed';
    homeScore?: number;
    awayScore?: number;
}

const MatchManager: React.FC = () => {
    const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMatch, setEditingMatch] = useState<Match | null>(null);
    const [formData, setFormData] = useState({
        opponent: '',
        date: '',
        time: '',
        venue: 'Home',
        competition: 'League',
        status: 'Upcoming' as 'Upcoming' | 'Live' | 'Completed',
        homeScore: 0,
        awayScore: 0,
    });

    const statuses = ['All', 'Upcoming', 'Live', 'Completed'];
    const competitions = ['League', 'Cup', 'Friendly', 'Tournament'];

    const filteredMatches = matches.filter(match => {
        const matchesSearch = match.opponent.toLowerCase().includes(searchQuery.toLowerCase()) ||
            match.competition.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || match.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const handleOpenModal = (match?: Match) => {
        if (match) {
            setEditingMatch(match);
            setFormData({
                opponent: match.opponent,
                date: match.date,
                time: match.time,
                venue: match.venue,
                competition: match.competition,
                status: match.status,
                homeScore: match.homeScore || 0,
                awayScore: match.awayScore || 0,
            });
        } else {
            setEditingMatch(null);
            setFormData({
                opponent: '',
                date: '',
                time: '',
                venue: 'Home',
                competition: 'League',
                status: 'Upcoming',
                homeScore: 0,
                awayScore: 0,
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingMatch(null);
        setFormData({
            opponent: '',
            date: '',
            time: '',
            venue: 'Home',
            competition: 'League',
            status: 'Upcoming',
            homeScore: 0,
            awayScore: 0,
        });
    };

    const handleSave = () => {
        if (!formData.opponent || !formData.date || !formData.time) {
            alert('Please fill all required fields');
            return;
        }

        if (editingMatch) {
            // Update existing match
            setMatches(matches.map(match =>
                match.id === editingMatch.id
                    ? { ...match, ...formData }
                    : match
            ));
        } else {
            // Create new match
            const newMatch: Match = {
                id: Date.now().toString(),
                ...formData,
            };
            setMatches([...matches, newMatch]);
        }

        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this match?')) {
            setMatches(matches.filter(match => match.id !== id));
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Live':
                return 'bg-red-500';
            case 'Upcoming':
                return 'bg-blue-500';
            case 'Completed':
                return 'bg-green-500';
            default:
                return 'bg-slate-500';
        }
    };

    return (
        <div className="p-10 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Match Manager</h1>
                    <p className="text-slate-500 font-medium">Manage fixtures and results</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    New Match
                </button>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by opponent or competition..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Status Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {statuses.map((status) => (
                        <button
                            key={status}
                            onClick={() => setSelectedStatus(status)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${selectedStatus === status
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Matches List */}
            <div className="space-y-4">
                {filteredMatches.map((match) => (
                    <div
                        key={match.id}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            {/* Match Info */}
                            <div className="flex-1 space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase text-white ${getStatusColor(match.status)}`}>
                                        {match.status}
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                        {match.competition}
                                    </span>
                                </div>

                                {/* Teams */}
                                <div className="flex items-center gap-6">
                                    <div className="text-center">
                                        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">NVFC</p>
                                        {match.status === 'Completed' && (
                                            <p className="text-4xl font-black text-slate-900">{match.homeScore}</p>
                                        )}
                                    </div>
                                    <div className="text-2xl font-black text-slate-300">VS</div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">{match.opponent}</p>
                                        {match.status === 'Completed' && (
                                            <p className="text-4xl font-black text-slate-900">{match.awayScore}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Date, Time, Venue */}
                                <div className="flex flex-wrap gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Calendar className="w-4 h-4" />
                                        <span className="font-medium">{match.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Clock className="w-4 h-4" />
                                        <span className="font-medium">{match.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <MapPin className="w-4 h-4" />
                                        <span className="font-medium">{match.venue}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleOpenModal(match)}
                                    className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-100 transition-colors flex items-center gap-2"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(match.id)}
                                    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-100 transition-colors flex items-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredMatches.length === 0 && (
                <div className="text-center py-20">
                    <Trophy className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-2xl font-black text-slate-300">No matches found</p>
                    <p className="text-slate-400 mt-2">Try adjusting your filters or create a new match</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-black text-slate-900">
                                {editingMatch ? 'Edit Match' : 'New Match'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Opponent */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Opponent Team
                                </label>
                                <input
                                    type="text"
                                    value={formData.opponent}
                                    onChange={(e) => setFormData({ ...formData, opponent: e.target.value })}
                                    placeholder="e.g., Bengaluru FC"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            {/* Date and Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                        Date
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        placeholder="Dec 25, 2024"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                        Time
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        placeholder="7:00 PM IST"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Venue and Competition */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                        Venue
                                    </label>
                                    <select
                                        value={formData.venue}
                                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="Home">Home</option>
                                        <option value="Away">Away</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                        Competition
                                    </label>
                                    <select
                                        value={formData.competition}
                                        onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    >
                                        {competitions.map((comp) => (
                                            <option key={comp} value={comp}>{comp}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Upcoming' | 'Live' | 'Completed' })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    <option value="Upcoming">Upcoming</option>
                                    <option value="Live">Live</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>

                            {/* Score (only for Completed matches) */}
                            {formData.status === 'Completed' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                            NVFC Score
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.homeScore}
                                            onChange={(e) => setFormData({ ...formData, homeScore: parseInt(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                            {formData.opponent || 'Opponent'} Score
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.awayScore}
                                            onChange={(e) => setFormData({ ...formData, awayScore: parseInt(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    {editingMatch ? 'Update' : 'Create'} Match
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MatchManager;
