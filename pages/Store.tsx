
import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from '../constants';
import { ShoppingBag, Star, Tag, Filter, Search, ChevronRight, Zap, Trophy, Shield } from 'lucide-react';

const Store: React.FC = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (id: string) => {
    setCart([...cart, id]);
    // In a real app, we'd show a toast notification here
  };

  const filteredProducts = INITIAL_PRODUCTS.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const featuredProduct = INITIAL_PRODUCTS.find(p => p.bestseller);

  return (
    <div className="min-h-screen bg-[#071324] text-white selection:bg-nv-yellow selection:text-nv-blue">
      {/* Cinematic Store Header - ENHANCED */}
      <div className="relative h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-float"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1577212017184-80cc1b73524e?auto=format&fit=crop&q=80&w=2000")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071324] via-[#071324]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#071324]/50 to-[#071324]" />
        <div className="absolute inset-0 animate-gradient" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(255, 215, 0, 0.05) 50%, transparent 100%)' }} />

        <div className="relative max-w-[1400px] mx-auto px-6 w-full pt-20">
          <div className="max-w-2xl animate-reveal-up">
            <div className="flex items-center gap-3 text-nv-yellow font-bold text-xs uppercase tracking-[0.3em] mb-4">
              <ShoppingBag className="w-4 h-4" />
              <span>Official Club Store</span>
            </div>
            <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black italic uppercase tracking-tighter leading-none mb-4 sm:mb-6">
              Wear The <span className="text-transparent stroke-white text-stroke-thin" style={{ WebkitTextStroke: '1px white' }}>Pride</span>
            </h1>
            <p className="text-gray-300 text-lg font-medium leading-relaxed mb-8 max-w-xl">
              From the stands to the streets. Discover the new 2024/25 collection, authentic kits, and exclusive supporter merchandise.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <button className="bg-nv-yellow text-nv-blue px-8 py-4 rounded-xl font-black uppercase tracking-wider text-sm hover:bg-white transition-all flex items-center gap-2 animate-pulse-glow hover-scale">
                Shop New Arrivals <ChevronRight className="w-4 h-4" />
              </button>
              <button className="glass px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white/5 transition-all shimmer">
                View Lookbook
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 -mt-20 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 md:gap-12">

          {/* Sidebar & Filters */}
          <div className="w-full lg:w-72 space-y-8 h-fit lg:sticky lg:top-24">
            {/* Search - ENHANCED */}
            <div className="relative group">
              <div className="absolute inset-0 bg-nv-yellow/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity animate-pulse-glow" />
              <div className="relative glass-strong p-1 rounded-2xl flex items-center shimmer">
                <Search className="w-5 h-5 text-gray-400 ml-3" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 text-sm font-bold py-3 px-3"
                />
              </div>
            </div>

            {/* Categories - ENHANCED */}
            <div className="glass-strong rounded-3xl p-6 shimmer">
              <h3 className="font-oswald text-lg font-bold uppercase mb-6 flex items-center gap-2 text-white/90">
                <Filter className="w-4 h-4 text-nv-yellow" /> Collections
              </h3>
              <div className="space-y-2">
                {['All', 'Jersey', 'Training', 'Accessories', 'Souvenirs'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-between group hover-scale ${filter === cat
                      ? 'bg-nv-yellow text-nv-blue shadow-lg shadow-nv-yellow/20 animate-pulse-glow'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    {cat}
                    {filter === cat && <ChevronRight className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Card - ENHANCED */}
            <div className="relative overflow-hidden rounded-3xl p-8 glass-strong text-center group hover-scale">
              <div className="absolute top-0 right-0 w-32 h-32 bg-nv-yellow/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 animate-pulse-glow" />
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
              <Shield className="w-12 h-12 text-nv-yellow mx-auto mb-4 relative z-10" />
              <h4 className="font-oswald text-2xl font-black italic uppercase mb-2 relative z-10">Join The Squad</h4>
              <p className="text-xs text-gray-400 mb-6 leading-relaxed relative z-10">Official members get 10% off on all store items and early access to kit launches.</p>
              <button className="w-full bg-white/10 border border-white/10 hover:bg-nv-yellow hover:text-nv-blue hover:border-nv-yellow text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 animate-pulse-glow relative z-10">
                Sign Up Now
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-oswald text-2xl font-bold uppercase italic">
                {filter === 'All' ? 'All Products' : `${filter} Collection`}
                <span className="text-sm font-medium text-gray-500 normal-case not-italic ml-4 tracking-normal">
                  {filteredProducts.length} items found
                </span>
              </h2>

              {/* Cart Indicator */}
              <div className="flex items-center gap-4 bg-[#0A1931] border border-white/10 px-4 py-2 rounded-full">
                <ShoppingBag className="w-4 h-4 text-nv-yellow" />
                <span className="text-sm font-bold">{cart.length} items</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group relative glass rounded-[2rem] hover:border-nv-yellow/30 transition-all duration-500 overflow-hidden flex flex-col hover-scale shimmer">
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                  {/* Image Container - ENHANCED */}
                  <div className="relative h-80 overflow-hidden bg-[#152035]">
                    <img
                      src={product.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={product.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1931] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <div className="bg-nv-yellow text-nv-blue px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                          <Zap className="w-3 h-3 fill-current" /> New
                        </div>
                      )}
                      {product.bestseller && (
                        <div className="bg-white text-nv-blue px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1">
                          <Trophy className="w-3 h-3 fill-current" /> Hot
                        </div>
                      )}
                    </div>

                    {/* Quick Add Overlay - ENHANCED */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <button
                        onClick={() => addToCart(product.id)}
                        className="w-full bg-nv-yellow text-nv-blue py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white transition-colors shadow-lg shadow-black/50 flex items-center justify-center gap-2 animate-pulse-glow hover-scale"
                      >
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[10px] font-black text-nv-yellow uppercase tracking-widest border border-nv-yellow/20 px-2 py-1 rounded-md bg-nv-yellow/5">{product.category}</div>
                      {product.stock < 50 && (
                        <span className="text-[10px] font-bold text-red-400 animate-pulse">Low Stock</span>
                      )}
                    </div>

                    <h3 className="font-oswald text-xl font-bold text-white mb-2 leading-tight group-hover:text-nv-yellow transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    <p className="text-xs text-gray-400 mb-6 line-clamp-2 flex-grow">
                      {product.description || 'Premium quality merch for the true fans.'}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                      <span className="font-oswald text-2xl font-black italic text-white group-hover:text-nv-yellow transition-colors">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 h-3 text-nv-yellow fill-nv-yellow" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
