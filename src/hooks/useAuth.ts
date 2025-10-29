'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';

interface User {
    id: string;
    email: string;
    full_name?: string;
    gender?: string;
    birthday?: string;
    phone?: string;
    interests?: string;
    admin?: boolean; // admin 컬럼 추가
}

interface SupabaseSession {
    user: { id: string; email: string | null };
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 세션 확인 + users 테이블에서 admin 포함 정보 가져오기
    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data.session as SupabaseSession | null;

            if (session?.user) {
                const { data: userData } = await supabase
                    .from('users')
                    .select('id, email, full_name, gender, birthday, phone, interests, admin')
                    .eq('id', session.user.id)
                    .single();
                setUser(userData ?? null);
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        fetchUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (_event: string, session: SupabaseSession | null) => {
                if (session?.user) {
                    const { data: userData } = await supabase
                        .from('users')
                        .select('id, email, full_name, gender, birthday, phone, interests, admin')
                        .eq('id', session.user.id)
                        .single();
                    setUser(userData ?? null);
                } else {
                    setUser(null);
                }
            }
        );

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    // 기존 signUp (자동 로그인 가능)
    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return data;
    };

    // 가입 + 프로필 DB 저장 + 자동 로그인 방지
    const signUpWithProfile = async (
        email: string,
        password: string,
        full_name?: string,
        gender?: string,
        birthday?: string,
        phone?: string,
        interests?: string
    ) => {
        const { data: authData, error: authError } = await supabase.auth.signUp(
            { email, password },
            { emailRedirectTo: window.location.origin + '/login' } // 자동 로그인 방지
        );
        if (authError) throw authError;

        const userId = authData.user?.id;
        if (!userId) throw new Error('회원가입 후 사용자 ID를 가져올 수 없습니다.');

        // users 테이블에 프로필 삽입 (admin 기본 FALSE)
        const { error: dbError } = await supabase.from('users').insert([
            {
                id: userId,
                email,
                full_name,
                gender,
                birthday,
                phone,
                interests,
                admin: false,
            },
        ]);
        if (dbError) throw dbError;

        return authData;
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

    return { user, loading, signUp, signUpWithProfile, signIn, signOut };
}
