import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

interface User {
    email: string;
    role: 'admin' | 'user';
    name: string;
}

interface RegisterData {
    email: string;
    password: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
    register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get registered users from localStorage
const getRegisteredUsers = () => {
    try {
        const users = localStorage.getItem('nvfc_registered_users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Failed to parse registered users:', error);
        return [];
    }
};

// Helper to save registered users to localStorage
const saveRegisteredUsers = (users: any[]) => {
    localStorage.setItem('nvfc_registered_users', JSON.stringify(users));
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('nvfc_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Failed to parse saved user:', error);
                localStorage.removeItem('nvfc_user');
            }
        }
    }, []);

    const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return { success: false, error: 'Invalid email format' };
        }

        // Validate password length
        if (data.password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }

        // Check if email already exists
        const registeredUsers = getRegisteredUsers();
        const emailExists = registeredUsers.some((u: any) => u.email === data.email);

        if (emailExists || data.email === 'admin@nvfc.com') {
            return { success: false, error: 'Email already registered' };
        }

        // Add new user to registered users
        const newUser = {
            email: data.email,
            password: data.password,
            name: data.name,
            role: 'user' as const,
        };

        registeredUsers.push(newUser);
        saveRegisteredUsers(registeredUsers);

        // Auto-login after registration
        const userData: User = {
            email: newUser.email,
            role: newUser.role,
            name: newUser.name,
        };
        setUser(userData);
        localStorage.setItem('nvfc_user', JSON.stringify(userData));

        return { success: true };
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        // Default admin account
        if (email === 'admin@nvfc.com' && password === 'admin123') {
            const userData: User = {
                email: 'admin@nvfc.com',
                role: 'admin',
                name: 'Admin User',
            };
            setUser(userData);
            localStorage.setItem('nvfc_user', JSON.stringify(userData));
            return true;
        }

        // Check registered users
        const registeredUsers = getRegisteredUsers();
        const foundUser = registeredUsers.find(
            (u: any) => u.email === email && u.password === password
        );

        if (foundUser) {
            const userData: User = {
                email: foundUser.email,
                role: foundUser.role,
                name: foundUser.name,
            };
            setUser(userData);
            localStorage.setItem('nvfc_user', JSON.stringify(userData));
            return true;
        }

        return false;
    };

    const loginWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
        try {
            console.log('Attempting Google sign-in...');
            const result = await signInWithPopup(auth, googleProvider);
            const firebaseUser = result.user;

            const userData: User = {
                email: firebaseUser.email || '',
                role: 'user',
                name: firebaseUser.displayName || 'Google User',
            };

            setUser(userData);
            localStorage.setItem('nvfc_user', JSON.stringify(userData));

            return { success: true };
        } catch (error: any) {
            console.error('❌ Google sign-in error details:');
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            console.error('Full error:', error);

            let errorMessage = 'Failed to sign in with Google';

            // Handle specific error codes
            if (error.code === 'auth/unauthorized-domain') {
                errorMessage = 'This domain is not authorized. Please add it in Firebase Console.';
            } else if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Sign-in cancelled';
            } else if (error.code === 'auth/popup-blocked') {
                errorMessage = 'Popup blocked by browser. Please allow popups.';
            }

            return {
                success: false,
                error: errorMessage
            };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('nvfc_user');
    };

    const value: AuthContextType = {
        user,
        login,
        loginWithGoogle,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
