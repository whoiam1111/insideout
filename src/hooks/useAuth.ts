'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';

interface User {
    id: string;
    email: string;
}

interface SupabaseSession {
    user: { id: string; email: string | null };
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data.session as SupabaseSession | null;

            if (session?.user) {
                setUser({ id: session.user.id, email: session.user.email ?? '' });
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        fetchSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event: string, session: SupabaseSession | null) => {
                if (session?.user) {
                    setUser({ id: session.user.id, email: session.user.email ?? '' });
                } else {
                    setUser(null);
                }
            }
        );

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return data;
    };

    const signIn = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        setUser(null);
    };

    return { user, loading, signUp, signIn, signOut };
}
