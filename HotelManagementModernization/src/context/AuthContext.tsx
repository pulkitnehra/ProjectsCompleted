import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Staff } from '../types';

interface AuthContextType {
    user: Staff | null;
    loading: boolean;
    login: (email: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<Staff | null>(null);
    const [loading, setLoading] = useState(false);

    // For this prototype, we will simulate login by checking the 'staff' table directly
    // In a real production app, we would use supabase.auth.signInWithPassword
    const login = async (email: string) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('staff')
                .select('*')
                .eq('email', email)
                .single();

            if (error) throw error;
            if (data) {
                setUser(data);
                localStorage.setItem('hotel_user', JSON.stringify(data));
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please check your email.');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('hotel_user');
    };

    useEffect(() => {
        // Check local storage on load
        const storedUser = localStorage.getItem('hotel_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
