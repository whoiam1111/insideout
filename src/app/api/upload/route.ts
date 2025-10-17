// app/api/upload/route.ts
'use server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Service Role Key 사용 (RLS 무시 가능)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // 반드시 Service Role Key
);

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `programs/${fileName}`;

        const { error } = await supabaseAdmin.storage.from('program-images').upload(filePath, file, { upsert: true });

        if (error) throw error;

        const { data } = supabaseAdmin.storage.from('program-images').getPublicUrl(filePath);
        return NextResponse.json({ url: data.publicUrl });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Upload error';
        console.error('[Upload Error]', err);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
