import { supabase } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    // id 순서대로 가져오기
    const { data, error } = await supabase.from('categories').select('*').order('order_no', { ascending: true });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // order_no 계산: 현재 최대값 +1
        const { data: maxOrderData, error: maxOrderError } = await supabase
            .from('categories')
            .select('order_no')
            .order('order_no', { ascending: false })
            .limit(1)
            .single();

        if (maxOrderError && maxOrderError.code !== 'PGRST116') {
            // PGRST116: No rows found, 무시
            return NextResponse.json({ error: maxOrderError.message }, { status: 500 });
        }

        const nextOrder = maxOrderData ? maxOrderData.order_no + 1 : 1;

        const { data, error } = await supabase
            .from('categories')
            .insert({
                icon: body.icon || null,
                text: body.text,
                link: body.link,
                image: body.image || null,
                order_no: nextOrder,
            })
            .select()
            .single();

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID가 필요합니다.' }, { status: 400 });

        const { data, error } = await supabase.from('categories').delete().eq('id', Number(id));

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ message: '삭제 완료', data });
    } catch (err) {
        return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
    }
}
