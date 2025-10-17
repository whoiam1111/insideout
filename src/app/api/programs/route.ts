import { supabase } from '@/app/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export interface ProgramInsert {
    title: string;
    subtitle?: string | null;
    category?: string | null;
    city?: string | null;
    district?: string | null;
    description?: string | null;
    capacity?: number | null;
    duration_type?: string | null;
    time?: string | null;
    date?: string | null;
    days?: string[] | null;
    start_date?: string | null;
    end_date?: string | null;
    thumbnail?: string | null;
    price?: number | null;
    tags?: string[] | null;
}

// GET: 프로그램 목록
export async function GET() {
    const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

// POST: 새 프로그램 추가
export async function POST(req: NextRequest) {
    try {
        const body: ProgramInsert = await req.json();
        const { data, error } = await supabase.from('programs').insert([body]).select();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '알 수 없는 서버 오류';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
