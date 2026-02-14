
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, ShoppingCart, User, Heart, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'NEWS', path: '/news' },
    { name: 'SQUAD', path: '/squad' },
    { name: 'MATCH CENTRE', path: '/matches' },
    { name: 'STORE', path: '/store' },
    { name: 'DONATE', path: '/donate' },
    { name: 'THE CLUB', path: '/club' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[#0A1931] backdrop-blur-xl py-4 shadow-2xl border-b border-nv-yellow/20' : 'bg-gradient-to-b from-[#071324]/90 to-transparent py-6'
      }`}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="bg-nv-yellow rounded-2xl p-2.5 transition-premium group-hover:rotate-[15deg] group-hover:scale-110 shadow-lg">
                <Shield className="h-8 w-8 text-[#0A1931] fill-[#0A1931]" />
              </div>
              <div className="flex flex-col">
                <span className="font-oswald text-2xl font-black tracking-tighter uppercase leading-none text-white">NARMADA VALLEY</span>
                <span className="font-oswald text-xs font-bold tracking-[0.4em] text-nv-yellow uppercase">Football Club</span>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-black tracking-[0.15em] transition-premium hover:text-nv-yellow relative group py-2 ${isActive(link.path) ? 'text-nv-yellow' : 'text-white'
                  }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-1 bg-nv-yellow transition-all duration-300 rounded-full ${isActive(link.path) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                  }`} />
              </Link>
            ))}
          </div>

          {/* Action Icons - ENHANCED with Auth */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/store" className="text-white hover:text-nv-yellow transition-premium relative p-3 hover:bg-white/5 rounded-xl">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-1 right-1 bg-nv-yellow text-[#0A1931] text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center shadow-lg">0</span>
            </Link>
            <Link to="/donate" className="bg-nv-yellow text-[#0A1931] px-8 py-4 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-white transition-premium shadow-xl hover:scale-105">
              <Heart className="h-5 w-5 fill-[#0A1931]" /> DONATE
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 text-white hover:text-nv-yellow transition-premium p-3 hover:bg-white/5 rounded-xl"
                >
                  <div className="w-8 h-8 bg-nv-yellow rounded-full flex items-center justify-center">
                    <span className="text-[#0A1931] font-black text-sm">{user?.name.charAt(0)}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0A1931] border border-white/10 rounded-2xl shadow-2xl py-2 animate-reveal">
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/40">Signed in as</p>
                      <p className="text-sm font-black text-white mt-1">{user?.name}</p>
                      <p className="text-xs text-white/60">{user?.email}</p>
                    </div>
                    {isAdmin ? (
                      <Link
                        to="/admin"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        <span className="text-sm font-bold">Admin Panel</span>
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        <span className="text-sm font-bold">My Dashboard</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/10"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-bold">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-black text-sm transition-all"
              >
                <User className="h-5 w-5" />
                LOGIN
              </Link>
            )}
          </div>

          {/* Mobile menu button - ENHANCED */}
          <div className="xl:hidden flex items-center gap-3">
            <Link to="/donate" className="md:hidden bg-nv-yellow text-[#0A1931] p-3 rounded-xl shadow-lg">
              <Heart className="h-5 w-5 fill-[#0A1931]" />
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-nv-yellow p-3 hover:bg-white/10 rounded-xl transition-all">
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - ENHANCED with Auth */}
      {isOpen && (
        <div className="xl:hidden bg-[#0A1931] border-t border-nv-yellow/20 shadow-2xl animate-reveal">
          <div className="px-6 pt-6 pb-20 space-y-1 max-h-[calc(100vh-80px)] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-5 px-4 text-xl font-black uppercase tracking-tight border-b border-white/5 transition-all hover:bg-white/5 rounded-xl ${isActive(link.path) ? 'text-nv-yellow bg-nv-yellow/10' : 'text-white'
                  }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                {isActive(link.path) && <span className="ml-2 text-sm">●</span>}
              </Link>
            ))}
            <div className="pt-8 flex flex-col gap-4">
              <Link to="/donate" onClick={() => setIsOpen(false)} className="w-full bg-nv-yellow text-[#0A1931] py-6 text-center font-black text-xl uppercase rounded-2xl shadow-xl hover:bg-white transition-all">SUPPORT THE PRIDE</Link>
              <Link to="/store" onClick={() => setIsOpen(false)} className="w-full bg-white/10 text-white py-5 text-center font-bold uppercase rounded-2xl hover:bg-white/20 transition-all">VISIT STORE</Link>

              {isAuthenticated ? (
                <>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3 px-2">Account</p>
                    <p className="text-white font-bold px-2 mb-2">{user?.name}</p>
                    {isAdmin ? (
                      <Link to="/admin" onClick={() => setIsOpen(false)} className="w-full bg-blue-600 text-white py-4 text-center font-bold uppercase rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                        <LayoutDashboard className="h-5 w-5" />
                        ADMIN PANEL
                      </Link>
                    ) : (
                      <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full bg-white/10 text-white py-4 text-center font-bold uppercase rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                        <User className="h-5 w-5" />
                        MY DASHBOARD
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full mt-2 bg-red-500/20 text-red-400 py-4 text-center font-bold uppercase rounded-xl hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut className="h-5 w-5" />
                      LOGOUT
                    </button>
                  </div>
                </>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center bg-white/10 text-white py-5 font-bold uppercase rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                  <User className="h-5 w-5" />
                  LOGIN / REGISTER
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
