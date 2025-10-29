'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { useRouter } from 'next/navigation';

interface MoimDetail {
    id: string;
    title: string;
    description: string;
    category?: string;
    city?: string;
    district?: string;
    capacity?: number;
    duration_type?: string;
    time?: string;
    date?: string;
    start_date?: string;
    end_date?: string;
    imageUrl?: string;
    price?: number;
    address?: string;
}

interface MoimDetailPageProps {
    params: { tab: string; id: string };
}

export default function MoimDetailPage({ params }: MoimDetailPageProps) {
    const { tab, id } = params;
    const [moim, setMoim] = useState<MoimDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // 카테고리 탭
    const tabs = ['moim', '자체강연', '강연', '팝업', '챌린지'];

    useEffect(() => {
        const fetchMoimDetail = async (id: string) => {
            setLoading(true);
            if (!id) return;

            const numericId = parseInt(id, 10);
            if (isNaN(numericId)) {
                console.warn('id가 숫자가 아닙니다:', id);
                setMoim(null);
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('programs')
                    .select('*')
                    .eq('id', numericId)
                    .eq('category', tab)
                    .single();
                console.log(data, '?dta');
                if (error) throw error;

                setMoim({
                    id: data.id.toString(),
                    title: data.title ?? '제목 없음',
                    description: data.description ?? '상세 설명이 없습니다.',
                    category: data.category ?? '문화',
                    city: data.city ?? '서울',
                    district: data.district ?? '용산구',
                    capacity: data.capacity ?? 10,
                    duration_type: data.duration_type ?? '1회성',
                    time: data.time ?? '13:00 - 18:00',
                    date: data.date ? data.date.toString() : '',
                    start_date: data.start_date ? data.start_date.toString() : '',
                    end_date: data.end_date ? data.end_date.toString() : '',
                    imageUrl: data.thumbnail ?? '',
                    price: data.price ?? 0,
                    address: data.address ?? '',
                });
            } catch (err) {
                console.error('[Supabase Fetch Error]', err);
                setMoim(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMoimDetail(id);
    }, [tab, id]);

    if (loading) return <p className="text-center text-gray-500 py-10 animate-pulse">불러오는 중...</p>;
    if (!moim) return <p className="text-center text-gray-500 py-10">모임 정보를 불러올 수 없습니다.</p>;

    return (
        <div className="pt-16 pb-20 bg-white min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* 탭 네비게이션 */}
                <div className="flex border-b border-gray-200 mb-6">
                    {tabs.map((t) => (
                        <button
                            key={t}
                            className={`px-4 py-2 -mb-px font-medium border-b-2 ${
                                t === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'
                            }`}
                            onClick={() => router.push(`/inside/${t}/${id}`)}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* 모임 정보 */}
                <h1 className="text-2xl font-bold mb-2">{moim.title}</h1>
                <p className="text-gray-500 mb-4">{moim.category}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700">
                    {moim.city && (
                        <p>
                            <strong>지역:</strong> {moim.city} {moim.district}
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
                    {moim.start_date && moim.end_date && (
                        <p>
                            <strong>기간:</strong> {moim.start_date} ~ {moim.end_date}
                        </p>
                    )}
                    {moim.address && (
                        <p>
                            <strong>주소:</strong> {moim.address}
                        </p>
                    )}
                </div>

                {moim.imageUrl && (
                    <div className="w-full rounded-2xl shadow-md overflow-hidden mt-6">
                        <img
                            src={moim.imageUrl}
                            alt={moim.title}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                )}

                <div className="bg-gray-50 rounded-xl p-5 sm:p-6 mt-6 shadow-sm">
                    <p className="text-gray-700 whitespace-pre-line">{moim.description}</p>
                </div>
            </div>
        </div>
    );
}
