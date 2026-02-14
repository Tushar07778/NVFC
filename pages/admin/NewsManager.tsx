import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon, Save } from 'lucide-react';
import { INITIAL_NEWS } from '../../constants';

interface NewsArticle {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
}

const NewsManager: React.FC = () => {
    const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_NEWS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        image: '',
        category: 'Match Report',
    });

    const categories = ['All', 'Match Report', 'Club News', 'Player News', 'Academy', 'Transfers'];

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleOpenModal = (article?: NewsArticle) => {
        if (article) {
            setEditingArticle(article);
            setFormData({
                title: article.title,
                excerpt: article.excerpt,
                image: article.image,
                category: article.category,
            });
        } else {
            setEditingArticle(null);
            setFormData({
                title: '',
                excerpt: '',
                image: '',
                category: 'Match Report',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingArticle(null);
        setFormData({
            title: '',
            excerpt: '',
            image: '',
            category: 'Match Report',
        });
    };

    const handleSave = () => {
        if (!formData.title || !formData.excerpt || !formData.image) {
            alert('Please fill all fields');
            return;
        }

        if (editingArticle) {
            // Update existing article
            setArticles(articles.map(article =>
                article.id === editingArticle.id
                    ? { ...article, ...formData }
                    : article
            ));
        } else {
            // Create new article
            const newArticle: NewsArticle = {
                id: Date.now().toString(),
                ...formData,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            };
            setArticles([newArticle, ...articles]);
        }

        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this article?')) {
            setArticles(articles.filter(article => article.id !== id));
        }
    };

    return (
        <div className="p-10 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">News Manager</h1>
                    <p className="text-slate-500 font-medium">Create and manage news articles</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    New Article
                </button>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-all ${selectedCategory === category
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-100'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                    <div
                        key={article.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
                    >
                        <div className="aspect-video relative overflow-hidden">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <span className="absolute top-4 left-4 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-black uppercase">
                                {article.category}
                            </span>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-black text-slate-900 mb-2 line-clamp-2">
                                {article.title}
                            </h3>
                            <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                                {article.excerpt}
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                                {article.date}
                            </p>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleOpenModal(article)}
                                    className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(article.id)}
                                    className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredArticles.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-2xl font-black text-slate-300">No articles found</p>
                    <p className="text-slate-400 mt-2">Try adjusting your filters or create a new article</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-black text-slate-900">
                                {editingArticle ? 'Edit Article' : 'New Article'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Article Title
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter article title..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Category
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                >
                                    {categories.filter(c => c !== 'All').map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Excerpt
                                </label>
                                <textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Brief summary of the article..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Image URL
                                </label>
                                <div className="relative">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                {formData.image && (
                                    <div className="mt-4 aspect-video rounded-xl overflow-hidden">
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Invalid+Image+URL';
                                            }}
                                        />
                                    </div>
                                )}
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
                                    {editingArticle ? 'Update' : 'Create'} Article
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsManager;
