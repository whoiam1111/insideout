'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// Supabase 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface MoimDetail {
    id: string;
    title: string;
    description: string; // 상세 내용
    category?: string; // 모임/챌린지/강연/클래스
    city?: string;
    district?: string;
    capacity?: number;
    duration_type?: string; // 단기/장기
    time?: string;
    date?: string; // 단기일 경우
    days?: string[]; // 장기일 경우
    start_date?: string;
    end_date?: string;
    imageUrl?: string;
}

interface MoimDetailPageProps {
    params: { id: string };
}

export default function MoimDetailPage({ params }: MoimDetailPageProps) {
    const [moim, setMoim] = useState<MoimDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMoimDetail = async (id: string) => {
            try {
                const { data, error } = await supabase.from('programs').select('*').eq('id', id).single();

                if (error) throw error;

                const moimData: MoimDetail = {
                    id: data.id.toString(),
                    title: data.title ?? '제목 없음',
                    description: data.description ?? '',
                    category: data.category ?? undefined,
                    city: data.city ?? undefined,
                    district: data.district ?? undefined,
                    capacity: data.capacity ?? undefined,
                    duration_type: data.duration_type ?? undefined,
                    time: data.time ?? undefined,
                    date: data.date ? data.date.toString() : undefined,
                    days: data.days ?? undefined,
                    start_date: data.start_date ? data.start_date.toString() : undefined,
                    end_date: data.end_date ? data.end_date.toString() : undefined,
                    imageUrl: data.thumbnail ?? undefined,
                };

                setMoim(moimData);
            } catch (err) {
                console.error('[Supabase Fetch Error]', err);
                setMoim(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMoimDetail(params.id);
    }, [params.id]);

    if (loading) return <p>불러오는 중...</p>;
    if (!moim) return <p>모임 정보를 불러올 수 없습니다.</p>;

    return (
        <article className="py-8">
            {moim.imageUrl && (
                <img src={moim.imageUrl} alt={moim.title} className="w-full h-80 object-cover rounded-lg mb-8" />
            )}
            <h1 className="text-3xl font-bold mb-4">{moim.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{moim.description}</p>

            <div className="grid grid-cols-2 gap-4 text-gray-700 mb-6">
                {moim.category && (
                    <p>
                        <strong>카테고리:</strong> {moim.category}
                    </p>
                )}
                {moim.city && (
                    <p>
                        <strong>지역:</strong> {moim.city} {moim.district ?? ''}
                    </p>
                )}
                {moim.capacity !== undefined && (
                    <p>
                        <strong>정원:</strong> {moim.capacity}명
                    </p>
                )}
                {moim.duration_type && (
                    <p>
                        <strong>기간 유형:</strong> {moim.duration_type}
                    </p>
                )}
                {moim.time && (
                    <p>
                        <strong>시간:</strong> {moim.time}
                    </p>
                )}
                {moim.date && (
                    <p>
                        <strong>일정:</strong> {moim.date}
                    </p>
                )}
                {moim.days && (
                    <p>
                        <strong>요일:</strong> {moim.days.join(', ')}
                    </p>
                )}
                {moim.start_date && moim.end_date && (
                    <p>
                        <strong>기간:</strong> {moim.start_date} ~ {moim.end_date}
                    </p>
                )}
            </div>
        </article>
    );
}
