import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, X, Save, Package, TrendingDown, DollarSign, ShoppingBag, AlertTriangle } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    image: string;
    size?: string;
}

const StoreInventory: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([
        {
            id: '1',
            name: 'NVFC Home Jersey 2024',
            category: 'Jerseys',
            price: 1999,
            stock: 45,
            image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400',
            size: 'M'
        },
        {
            id: '2',
            name: 'NVFC Training Shorts',
            category: 'Apparel',
            price: 899,
            stock: 12,
            image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400',
            size: 'L'
        },
        {
            id: '3',
            name: 'Official Match Ball',
            category: 'Equipment',
            price: 2499,
            stock: 8,
            image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?w=400',
        },
        {
            id: '4',
            name: 'NVFC Cap',
            category: 'Accessories',
            price: 599,
            stock: 67,
            image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400',
        },
        {
            id: '5',
            name: 'Training Kit',
            category: 'Apparel',
            price: 3499,
            stock: 5,
            image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400',
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Jerseys',
        price: '',
        stock: '',
        image: '',
        size: '',
    });

    const categories = ['All', 'Jerseys', 'Apparel', 'Equipment', 'Accessories'];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Calculate analytics
    const totalProducts = products.reduce((sum, p) => sum + p.stock, 0);
    const lowStockItems = products.filter(p => p.stock < 15).length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const outOfStock = products.filter(p => p.stock === 0).length;

    const handleOpenModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                category: product.category,
                price: product.price.toString(),
                stock: product.stock.toString(),
                image: product.image,
                size: product.size || '',
            });
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                category: 'Jerseys',
                price: '',
                stock: '',
                image: '',
                size: '',
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            category: 'Jerseys',
            price: '',
            stock: '',
            image: '',
            size: '',
        });
    };

    const handleSave = () => {
        if (!formData.name || !formData.price || !formData.stock || !formData.image) {
            alert('Please fill all required fields');
            return;
        }

        if (editingProduct) {
            // Update existing product
            setProducts(products.map(product =>
                product.id === editingProduct.id
                    ? {
                        ...product,
                        ...formData,
                        price: parseFloat(formData.price),
                        stock: parseInt(formData.stock)
                    }
                    : product
            ));
        } else {
            // Create new product
            const newProduct: Product = {
                id: Date.now().toString(),
                ...formData,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
            };
            setProducts([newProduct, ...products]);
        }

        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    return (
        <div className="p-10 bg-gray-50/50 min-h-screen">
            {/* Header */}
            <div className="mb-10 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Store Inventory</h1>
                    <p className="text-slate-500 font-medium">Manage products and stock levels</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add Product
                </button>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <Package className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black mb-1">{totalProducts}</h3>
                    <p className="text-blue-100 text-sm font-medium">Total Items in Stock</p>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black mb-1">{lowStockItems}</h3>
                    <p className="text-orange-100 text-sm font-medium">Low Stock Items</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <DollarSign className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black mb-1">₹{(totalValue / 1000).toFixed(1)}K</h3>
                    <p className="text-green-100 text-sm font-medium">Inventory Value</p>
                </div>

                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-white/20 rounded-xl">
                            <TrendingDown className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-black mb-1">{outOfStock}</h3>
                    <p className="text-red-100 text-sm font-medium">Out of Stock</p>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
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

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all group"
                    >
                        <div className="aspect-square relative overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <span className="absolute top-4 left-4 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-black uppercase">
                                {product.category}
                            </span>
                            {product.stock < 15 && (
                                <span className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-black uppercase flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    Low Stock
                                </span>
                            )}
                        </div>

                        <div className="p-6">
                            <h3 className="text-lg font-black text-slate-900 mb-2 line-clamp-2">
                                {product.name}
                            </h3>
                            {product.size && (
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                                    Size: {product.size}
                                </p>
                            )}

                            <div className="flex items-center justify-between mb-4">
                                <p className="text-2xl font-black text-green-600">₹{product.price.toLocaleString('en-IN')}</p>
                                <p className={`text-sm font-bold ${product.stock < 15 ? 'text-orange-500' : 'text-slate-600'}`}>
                                    Stock: {product.stock}
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleOpenModal(product)}
                                    className="flex-1 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
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

            {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                    <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <p className="text-2xl font-black text-slate-300">No products found</p>
                    <p className="text-slate-400 mt-2">Try adjusting your filters or add a new product</p>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
                    <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-black text-slate-900">
                                {editingProduct ? 'Edit Product' : 'Add Product'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Product Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g., NVFC Home Jersey 2024"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Category *
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

                            {/* Price and Stock */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                        Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        placeholder="1999"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                        Stock *
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        placeholder="50"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Size (Optional) */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Size (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.size}
                                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                    placeholder="e.g., M, L, XL"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">
                                    Image URL *
                                </label>
                                <input
                                    type="text"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                                />
                                {formData.image && (
                                    <div className="mt-4 aspect-square max-w-xs rounded-xl overflow-hidden">
                                        <img
                                            src={formData.image}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400?text=Invalid+Image+URL';
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
                                    {editingProduct ? 'Update' : 'Add'} Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoreInventory;
