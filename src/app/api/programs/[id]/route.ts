import { supabase } from '@/app/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import type { ProgramInsert } from '../route';

// ✅ 프로그램 수정 (PUT)
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; // ✅ await 필수!

    try {
        const body: ProgramInsert = await req.json();

        const { data, error } = await supabase.from('programs').update(body).eq('id', id).select();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '알 수 없는 서버 오류';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}

// ✅ 프로그램 삭제 (DELETE)
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params; // ✅ 반드시 await!

    try {
        const { error } = await supabase.from('programs').delete().eq('id', id);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ message: '삭제 완료' }, { status: 200 });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '알 수 없는 서버 오류';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
