import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// GET - 단일 FAQ 조회
export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    const { data, error } = await supabase.from('faqs').select('*').eq('id', id).single();

    if (error) {
        console.error(error);
        return NextResponse.json({ error: '조회 실패' }, { status: 500 });
    }

    return NextResponse.json(data);
}

// PUT - 단일 FAQ 수정
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const body = await req.json();
    const { question, answer, order_no } = body;

    const { error } = await supabase.from('faqs').update({ question, answer, order_no }).eq('id', id);

    if (error) {
        console.error(error);
        return NextResponse.json({ error: '수정 실패' }, { status: 500 });
    }

    return NextResponse.json({ message: '수정 완료' });
}

// DELETE - 단일 FAQ 삭제
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;

    const { error } = await supabase.from('faqs').delete().eq('id', id);

    if (error) {
        console.error(error);
        return NextResponse.json({ error: '삭제 실패' }, { status: 500 });
    }

    return NextResponse.json({ message: '삭제 완료' });
}
