import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: NextRequest, context: any) {
    const { id } = context.params; // any 사용
    const { error } = await supabase.from('banners').delete().eq('id', Number(id));
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PATCH(req: NextRequest, context: any) {
    const { id } = context.params; // any 사용
    try {
        const body = await req.json();
        const { data, error } = await supabase.from('banners').update(body).eq('id', Number(id)).select();

        if (error) throw error;

        return NextResponse.json(data[0]);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
