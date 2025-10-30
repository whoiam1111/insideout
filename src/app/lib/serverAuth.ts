// lib/serverAuth.ts
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export function getSupabaseServer() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // 서버 전용
    return createClient(supabaseUrl, supabaseKey);
}

export async function getUserServer() {
    const supabase = getSupabaseServer();
    const nextCookies = await cookies();
    const token = nextCookies.get('sb-access-token')?.value;

    if (!token) return null;

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser(token);
    if (error || !user) return null;

    const { data: profile } = await supabase
        .from('users')
        .select('id, email, full_name, gender, birthday, phone, interests, admin')
        .eq('id', user.id)
        .single();

    return profile ?? null;
}
