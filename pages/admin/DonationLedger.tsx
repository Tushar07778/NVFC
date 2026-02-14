import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save, DollarSign, TrendingUp, Users, Calendar } from 'lucide-react';

interface Donation {
    id: string;
    donorName: string;
    email: string;
    amount: number;
    date: string;
    type: string;
    message?: string;
}

const DonationLedger: React.FC = () => {
    const [donations, setDonations] = useState<Donation[]>([
        {
            id: '1',
            donorName: 'Rajesh Kumar',
            email: 'rajesh@example.com',
            amount: 10000,
            date: 'Feb 10, 2024',
            type: 'One-time',
            message: 'Support for the team!'
        },
        {
            id: '2',
            donorName: 'Priya Sharma',
            email: 'priya@example.com',
            amount: 5000,
            date: 'Feb 8, 2024',
            type: 'Monthly',
        },
        {
            id: '3',
            donorName: 'Amit Patel',
            email: 'amit@example.com',
            amount: 25000,
            date: 'Feb 5, 2024',
            type: 'One-time',
            message: 'Go NVFC!'
        },
        {
            id: '4',
            donorName: 'Sneha Reddy',
            email: 'sneha@example.com',
            amount: 3000,
            date: 'Feb 1, 2024',
            type: 'Monthly',
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDonation, setEditingDonation] = useState<Donation | null>(null);
    const [formData, setFormData] = useState({
        donorName: '',
        email: '',
        amount: '',
        date: '',
        type: 'One-time',
        message: '',
    });

    const types = ['All', 'One-time', 'Monthly', 'Yearly'];

    const filteredDonations = donations.filter(donation => {
        const matchesSearch = donation.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            donation.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All' || donation.type === selectedType;
        return matchesSearch && matchesType;
    });

    // Calculate analytics
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
    const totalDonors = donations.length;
    const avgDonation = totalDonors > 0 ? totalDonations / totalDonors : 0;
    const monthlyDonors = donations.filter(d => d.type === 'Monthly').length;

    const handleOpenModal = (donation?: Donation) => {
        if (donation) {
            setEditingDonation(donation);
            setFormData({
                donorName: donation.donorName,
                email: donation.email,
                amount: donation.amount.toString(),
                date: donation.date,
                type: donation.type,
                message: donation.message || '',
            });
        } else {
            setEditingDonation(null);
            setFormData({
                donorName: '',
                email: '',
                amount: '',
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                type: 'One-time',
                message: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingDonation(null);
        setFormData({
            donorName: '',
            email: '',
            amount: '',
            date: '',
            type: 'One-time',
            message: '',
        });
    };

    const handleSave = () => {
        if (!formData.donorName || !formData.email || !formData.amount || !formData.date) {
            alert('Please fill all required fields');
            return;
        }

        if (editingDonation) {
            // Update existing donation
            setDonations(donations.map(donation =>
                donation.id === editingDonation.id
                    ? { ...donation, ...formData, amount: parseFloat(formData.amount) }
                    : donation
            ));
        } else {
            // Create new donation
            const newDonation: Donation = {
                id: Date.now().toString(),
                ...formData,
                amount: parseFloat(formData.amount),
            };
            setDonations([newDonation, ...donations]);
        }

        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this donation?')) {
            setDonations(donations.filter(donation => donation.id !== id));
        }
    };

    return (
        <div className="p-10 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Donation Ledger</h1>
                    <p className="text-slate-500 font-medium">Manage donations and donors</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Donation
                </button>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <TrendingUp className="w-5 h-5 opacity-50" />
                    </div>
                    <h3 className="text-3xl font-black mb-1">₹{totalDonations.toLocaleString('en-IN')}</h3>
                    <p className="text-blue-100 text-sm font-medium">Total Donations</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black mb-1">{totalDonors}</h3>
                    <p className="text-green-100 text-sm font-medium">Total Donors</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <DollarSign className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black mb-1">₹{avgDonation.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h3>
                    <p className="text-purple-100 text-sm font-medium">Average Donation</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Calendar className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black mb-1">{monthlyDonors}</h3>
                    <p className="text-orange-100 text-sm font-medium">Monthly Donors</p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by donor name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Type Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {types.map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${selectedType === type
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Donations Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Donor</th>
                                <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Email</th>
                                <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Amount</th>
                                <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Type</th>
                                <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Date</th>
                                <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Message</th>
                                <th className="text-right px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredDonations.map((donation) => (
                                <tr key={donation.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-slate-900">{donation.donorName}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-600">{donation.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-black text-lg text-green-600">₹{donation.amount.toLocaleString('en-IN')}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${donation.type === 'Monthly' ? 'bg-blue-100 text-blue-700' :
                                                donation.type === 'Yearly' ? 'bg-purple-100 text-purple-700' :
                                                    'bg-green-100 text-green-700'
                                            }`}>
                                            {donation.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-600">{donation.date}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-500 italic max-w-xs truncate">
                                            {donation.message || '-'}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(donation)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(donation.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredDonations.length === 0 && (
                    <div className="text-center py-20">
                        <DollarSign className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <p className="text-2xl font-black text-slate-300">No donations found</p>
                        <p className="text-slate-400 mt-2">Try adjusting your filters or add a new donation</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-black text-slate-900">
                                {editingDonation ? 'Edit Donation' : 'Add Donation'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Donor Name */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Donor Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.donorName}
                                    onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                                    placeholder="Enter donor name..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="donor@example.com"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            {/* Amount and Date */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                        Amount (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        placeholder="10000"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                        Date *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        placeholder="Feb 14, 2024"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Donation Type
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    {types.filter(t => t !== 'All').map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Message (Optional)
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Donor's message..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>

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
                                    {editingDonation ? 'Update' : 'Add'} Donation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonationLedger;
