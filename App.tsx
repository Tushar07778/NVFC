
import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Squad from './pages/Squad';
import News from './pages/News';
import Matches from './pages/Matches';
import Store from './pages/Store';
import Donate from './pages/Donate';
import Club from './pages/Club';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Dashboard from './pages/admin/Dashboard';
import SquadManager from './pages/admin/SquadManager';
import NewsManager from './pages/admin/NewsManager';
import MatchManager from './pages/admin/MatchManager';
import DonationLedger from './pages/admin/DonationLedger';
import StoreInventory from './pages/admin/StoreInventory';
import ClubSettings from './pages/admin/ClubSettings';
import { LayoutDashboard, Newspaper, Users, Trophy, Settings, Heart, ShoppingBag, ArrowLeft, Shield } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'News Manager', path: '/admin/news', icon: Newspaper },
    { name: 'Squad Manager', path: '/admin/squad', icon: Users },
    { name: 'Match Manager', path: '/admin/matches', icon: Trophy },
    { name: 'Donations', path: '/admin/donations', icon: Heart },
    { name: 'Store', path: '/admin/store', icon: ShoppingBag },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 min-h-screen text-gray-400 p-6 fixed left-0 top-0 z-[100] border-r border-white/5">
      {/* Logo Section */}
      <div className="mb-10 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-nv-yellow to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Shield className="w-7 h-7 text-slate-900 fill-slate-900" />
          </div>
          <div>
            <h2 className="text-white font-black text-2xl tracking-tight uppercase">NVFC</h2>
            <p className="text-nv-yellow text-xs font-bold uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden ${isActive
                ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent animate-pulse" />
              )}

              <div className="relative z-10 flex items-center gap-4 w-full">
                <item.icon className={`h-5 w-5 ${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Back to Site Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <Link
          to="/"
          className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-nv-yellow/30 text-gray-400 hover:text-nv-yellow text-sm font-bold uppercase tracking-wider transition-all duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Site</span>
        </Link>
      </div>
    </div>
  );
};

const PublicLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const AdminLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex bg-gray-50 min-h-screen">
    <AdminSidebar />
    <main className="flex-grow ml-72 min-h-screen">{children}</main>
  </div>
);

const UserDashboardLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<div className="flex h-screen w-full items-center justify-center bg-nv-blue text-white font-oswald text-4xl italic">NVFC LOADING...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
            <Route path="/squad" element={<PublicLayout><Squad /></PublicLayout>} />
            <Route path="/matches" element={<PublicLayout><Matches /></PublicLayout>} />
            <Route path="/store" element={<PublicLayout><Store /></PublicLayout>} />
            <Route path="/donate" element={<PublicLayout><Donate /></PublicLayout>} />
            <Route path="/club" element={<PublicLayout><Club /></PublicLayout>} />

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User Dashboard - Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboardLayout><UserDashboard /></UserDashboardLayout>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes - Protected with Admin Role */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><Dashboard /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/news"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><NewsManager /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/squad"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><SquadManager /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/matches"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><MatchManager /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/donations"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><DonationLedger /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/store"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><StoreInventory /></AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout><ClubSettings /></AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default App;
