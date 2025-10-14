import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface ProgramInsert {
    title: string;
    subtitle?: string | null;
    image?: string | null;
    thumbnail?: string | null;
    link?: string | null;
}

// ✅ GET: 프로그램 목록
export async function GET() {
    const { data, error } = await supabase.from('programs').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error('[GET Error]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
}

// ✅ POST: 새 프로그램 추가
export async function POST(req: NextRequest) {
    try {
        const body: ProgramInsert = await req.json();
        console.log('[POST Request Body]', body);

        const { data, error, status } = await supabase.from('programs').insert([body]).select();

        if (error) {
            console.error('[Supabase Insert Error]', error);
            return NextResponse.json(
                {
                    error: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code,
                },
                { status: status || 500 }
            );
        }

        console.log('[Insert Success]', data);
        return NextResponse.json(data);
    } catch (err: unknown) {
        console.error('[POST Unknown Error]', err);
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message, stack: err.stack }, { status: 500 });
        }
        return NextResponse.json({ error: '알 수 없는 오류' }, { status: 500 });
    }
}
