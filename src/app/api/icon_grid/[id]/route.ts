import { supabase } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(_: Request, context: any) {
    const { id } = context.params; // any로 처리
    console.log('Deleting id:', id);

    const { error } = await supabase.from('categories').delete().eq('id', Number(id));

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}
