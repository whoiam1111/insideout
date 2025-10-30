import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// ✅ 전체 조회 (GET) + 등록 (POST)
export async function GET() {
    const { data, error } = await supabase.from('faqs').select('*').order('order_no', { ascending: true });

    if (error) {
        console.error(error);
        return NextResponse.json({ error: 'FAQ 조회 실패' }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();
    const { question, answer, order_no } = body;

    if (!question || !answer) {
        return NextResponse.json({ error: '필수 항목 누락' }, { status: 400 });
    }

    const { error } = await supabase.from('faqs').insert([{ question, answer, order_no: order_no || 1 }]);

    if (error) {
        console.error(error);
        return NextResponse.json({ error: '등록 실패' }, { status: 500 });
    }

    return NextResponse.json({ message: '등록 완료' });
}
