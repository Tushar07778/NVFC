import React, { useState } from 'react';
import { Save, Globe, Tag, Image as ImageIcon, FileText, Mail, Phone, MapPin, Check } from 'lucide-react';

interface ClubSettings {
    // SEO
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;

    // Branding
    clubName: string;
    clubTagline: string;
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;

    // Contact
    email: string;
    phone: string;
    address: string;

    // Social Media
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
}

const ClubSettings: React.FC = () => {
    const [settings, setSettings] = useState<ClubSettings>({
        // SEO
        metaTitle: 'Narmada Valley Football Club - Official Website',
        metaDescription: 'Official website of Narmada Valley Football Club. Stay updated with latest news, matches, squad information and more.',
        metaKeywords: 'NVFC, Narmada Valley FC, Football Club, Soccer, Indian Football',

        // Branding
        clubName: 'Narmada Valley Football Club',
        clubTagline: 'Valley Pride, Football Pride',
        primaryColor: '#FFD700',
        secondaryColor: '#071324',
        logoUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200',

        // Contact
        email: 'info@nvfc.com',
        phone: '+91 98765 43210',
        address: 'NVFC Stadium, Narmada Valley, India',

        // Social Media
        facebook: 'https://facebook.com/nvfc',
        twitter: 'https://twitter.com/nvfc',
        instagram: 'https://instagram.com/nvfc',
        youtube: 'https://youtube.com/nvfc',
    });

    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (field: keyof ClubSettings, value: string) => {
        setSettings({ ...settings, [field]: value });
        setIsSaved(false);
    };

    const handleSave = () => {
        // In a real app, this would save to backend
        console.log('Saving settings:', settings);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="p-10 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Club Settings</h1>
                    <p className="text-slate-500 font-medium">Manage SEO, branding and metadata</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`px-6 py-3 rounded-xl font-bold transition-all shadow-xl flex items-center gap-2 ${isSaved
                            ? 'bg-green-600 text-white'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                >
                    {isSaved ? (
                        <>
                            <Check className="w-5 h-5" />
                            Saved!
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Settings */}
                <div className="lg:col-span-2 space-y-8">
                    {/* SEO Settings */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 rounded-xl">
                                <Globe className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">SEO Settings</h2>
                                <p className="text-sm text-slate-500">Optimize for search engines</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    value={settings.metaTitle}
                                    onChange={(e) => handleChange('metaTitle', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="Your website title..."
                                />
                                <p className="text-xs text-slate-400 mt-1">{settings.metaTitle.length} / 60 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Meta Description
                                </label>
                                <textarea
                                    value={settings.metaDescription}
                                    onChange={(e) => handleChange('metaDescription', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                    placeholder="Brief description of your website..."
                                />
                                <p className="text-xs text-slate-400 mt-1">{settings.metaDescription.length} / 160 characters</p>
                            </div>

                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Meta Keywords
                                </label>
                                <input
                                    type="text"
                                    value={settings.metaKeywords}
                                    onChange={(e) => handleChange('metaKeywords', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    placeholder="keyword1, keyword2, keyword3..."
                                />
                                <p className="text-xs text-slate-400 mt-1">Separate with commas</p>
                            </div>
                        </div>
                    </div>

                    {/* Branding */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-purple-100 rounded-xl">
                                <Tag className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Branding</h2>
                                <p className="text-sm text-slate-500">Club identity and colors</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Club Name
                                </label>
                                <input
                                    type="text"
                                    value={settings.clubName}
                                    onChange={(e) => handleChange('clubName', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Tagline
                                </label>
                                <input
                                    type="text"
                                    value={settings.clubTagline}
                                    onChange={(e) => handleChange('clubTagline', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                        Primary Color
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={settings.primaryColor}
                                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                                            className="h-12 w-16 rounded-lg border-2 border-slate-200 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={settings.primaryColor}
                                            onChange={(e) => handleChange('primaryColor', e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                        Secondary Color
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={settings.secondaryColor}
                                            onChange={(e) => handleChange('secondaryColor', e.target.value)}
                                            className="h-12 w-16 rounded-lg border-2 border-slate-200 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={settings.secondaryColor}
                                            onChange={(e) => handleChange('secondaryColor', e.target.value)}
                                            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Logo URL
                                </label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={settings.logoUrl}
                                        onChange={(e) => handleChange('logoUrl', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                        placeholder="https://..."
                                    />
                                </div>
                                {settings.logoUrl && (
                                    <div className="mt-4 p-4 bg-slate-50 rounded-xl flex items-center gap-4">
                                        <img
                                            src={settings.logoUrl}
                                            alt="Logo Preview"
                                            className="w-16 h-16 object-contain rounded-lg bg-white"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200?text=Invalid+URL';
                                            }}
                                        />
                                        <p className="text-sm text-slate-500">Logo Preview</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-green-100 rounded-xl">
                                <Mail className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Contact Information</h2>
                                <p className="text-sm text-slate-500">How to reach the club</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        value={settings.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Phone
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="tel"
                                        value={settings.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Address
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                    <textarea
                                        value={settings.address}
                                        onChange={(e) => handleChange('address', e.target.value)}
                                        rows={2}
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Social Media */}
                <div className="space-y-8">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 sticky top-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-orange-100 rounded-xl">
                                <FileText className="w-6 h-6 text-orange-600" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">Social Media</h2>
                                <p className="text-sm text-slate-500">Connect your profiles</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Facebook
                                </label>
                                <input
                                    type="url"
                                    value={settings.facebook}
                                    onChange={(e) => handleChange('facebook', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                    placeholder="https://facebook.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Twitter
                                </label>
                                <input
                                    type="url"
                                    value={settings.twitter}
                                    onChange={(e) => handleChange('twitter', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                    placeholder="https://twitter.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Instagram
                                </label>
                                <input
                                    type="url"
                                    value={settings.instagram}
                                    onChange={(e) => handleChange('instagram', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                    placeholder="https://instagram.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">
                                    YouTube
                                </label>
                                <input
                                    type="url"
                                    value={settings.youtube}
                                    onChange={(e) => handleChange('youtube', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Save Reminder */}
                    {!isSaved && (
                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
                            <p className="text-sm font-bold text-yellow-800 mb-2">⚠️ Unsaved Changes</p>
                            <p className="text-xs text-yellow-700">Don't forget to save your changes!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClubSettings;
