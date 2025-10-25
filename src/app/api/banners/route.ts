import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
// types/banner.ts
export interface BannerItem {
    id: number;
    title: string;
    link: string;
    image?: string | null;
    order_no: number; // 슬라이드 순서
}

export async function GET() {
    const { data, error } = await supabase.from('banners').select('*').order('order_no', { ascending: true });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const typedData = data as BannerItem[];
    return NextResponse.json(typedData);
}

export async function POST(req: NextRequest) {
    try {
        const body: Omit<BannerItem, 'id'> = await req.json();
        const { data, error } = await supabase.from('banners').insert(body).select();
        if (error) throw error;
        return NextResponse.json(data[0]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
