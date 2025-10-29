'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';

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

        fetchMoimDetail(params.id);
    }, [params.id]);

    if (loading) return <p className="text-center text-gray-500 py-10 animate-pulse">불러오는 중...</p>;
    if (!moim) return <p className="text-center text-gray-500 py-10">모임 정보를 불러올 수 없습니다.</p>;

    const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <section className="py-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
            {children}
        </section>
    );

    return (
        <>
            <div className="pt-16 pb-20 lg:pb-0 bg-white min-h-screen">
                <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <section className="py-6 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-gray-800 mb-2">{moim.title}</h1>
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                            <span>
                                {moim.city} {moim.district}
                            </span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                            <span>{moim.time}</span>
                        </div>
                        <p className="text-3xl font-bold text-gray-900 mb-4">
                            {moim.price?.toLocaleString()}
                            <span className="text-base font-normal ml-1">원</span>
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-700 text-sm sm:text-base">
                            {moim.category && (
                                <p>
                                    <strong className="text-gray-900">카테고리:</strong> {moim.category}
                                </p>
                            )}
                            {moim.city && (
                                <p>
                                    <strong className="text-gray-900">지역:</strong> {moim.city} {moim.district}
                                </p>
                            )}
                            {moim.capacity !== undefined && (
                                <p>
                                    <strong className="text-gray-900">정원:</strong> {moim.capacity}명
                                </p>
                            )}
                            {moim.duration_type && (
                                <p>
                                    <strong className="text-gray-900">기간 유형:</strong> {moim.duration_type}
                                </p>
                            )}
                            {moim.time && (
                                <p>
                                    <strong className="text-gray-900">시간:</strong> {moim.time}
                                </p>
                            )}
                            {moim.date && (
                                <p>
                                    <strong className="text-gray-900">일정:</strong> {moim.date}
                                </p>
                            )}
                            {moim.start_date && moim.end_date && (
                                <p>
                                    <strong className="text-gray-900">기간:</strong> {moim.start_date} ~ {moim.end_date}
                                </p>
                            )}
                            {moim.address && (
                                <p>
                                    <strong className="text-gray-900">주소:</strong> {moim.address}
                                </p>
                            )}
                        </div>
                        {moim.imageUrl && (
                            <div className="w-full rounded-2xl shadow-md overflow-hidden mt-6">
                                <img src={moim.imageUrl} alt={moim.title} className="w-full h-auto object-cover" />
                            </div>
                        )}
                        <div className="bg-gray-50 rounded-xl p-5 sm:p-6 mt-6 shadow-sm">
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                                {moim.description}
                            </p>
                        </div>
                    </section>
                </article>
            </div>
        </>
    );
}
