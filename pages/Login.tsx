import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Mail, Lock, LogIn, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, loginWithGoogle, isAuthenticated, isAdmin } = useAuth();

    // Redirect if already logged in
    React.useEffect(() => {
        if (isAuthenticated) {
            navigate(isAdmin ? '/admin' : '/dashboard', { replace: true });
        }
    }, [isAuthenticated, isAdmin, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                // Navigation will happen automatically via useEffect
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = (role: 'admin' | 'user') => {
        if (role === 'admin') {
            setEmail('admin@nvfc.com');
            setPassword('admin123');
        } else {
            setEmail('user@nvfc.com');
            setPassword('user123');
        }
        setError('');
    };

    return (
        <div className="min-h-screen bg-[#071324] text-white flex items-center justify-center relative overflow-hidden">
            {/* Visual Overlays */}
            <div className="fixed inset-0 bg-noise opacity-[0.03] pointer-events-none z-[100]" />
            <div className="fixed inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none z-[100]" />

            {/* Background Effects */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000"
                    alt="Stadium"
                    className="w-full h-full object-cover brightness-[0.15] scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#071324] via-[#071324]/95 to-nv-yellow/10" />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md px-6 animate-reveal">
                <Link to="/" className="flex justify-center mb-8">
                    <div className="flex items-center gap-3 group">
                        <Shield className="w-12 h-12 text-nv-yellow fill-nv-yellow/20 group-hover:scale-110 transition-transform" />
                        <div>
                            <h1 className="text-3xl font-black italic tracking-tighter uppercase">NVFC</h1>
                            <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-nv-yellow">Member Portal</p>
                        </div>
                    </div>
                </Link>

                <div className="glass-strong rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-nv-yellow/5 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10">
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-2">Welcome Back</h2>
                        <p className="text-white/50 text-sm font-medium mb-8">Sign in to access your account</p>

                        {error && (
                            <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-red-400" />
                                <p className="text-red-300 text-sm font-medium">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-3">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-nv-yellow/50 transition-colors"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-white/40 mb-3">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-nv-yellow/50 transition-colors"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-nv-yellow to-yellow-500 text-[#071324] py-4 rounded-xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all duration-300 shadow-[0_20px_60px_-5px_rgba(255,215,0,0.6)] hover:shadow-[0_25px_80px_0px_rgba(255,215,0,0.8)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group animate-pulse-glow"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                {loading ? (
                                    <span>Signing In...</span>
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5" />
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center gap-4">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Or continue with</span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </div>

                        {/* Google Sign In */}
                        <button
                            onClick={async () => {
                                setError('');
                                setLoading(true);
                                const result = await loginWithGoogle();
                                setLoading(false);
                                if (!result.success) {
                                    setError(result.error || 'Failed to sign in with Google');
                                }
                            }}
                            disabled={loading}
                            className="w-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white py-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-[0_10px_30px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_40px_0px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            <span>Continue with Google</span>
                        </button>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-white/60">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-nv-yellow font-bold hover:text-white transition-colors">
                                    Create Account
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4 text-center">
                            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-nv-yellow transition-colors">
                                ← Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
