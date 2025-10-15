'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import MoimList from './components/MoimList';

interface Moim {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category?: string;
}
interface MoimResponse {
    id: number | string;
    title?: string;
    description?: string;
    thumbnail?: string;
    category?: string;
}
// Supabase 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// 카테고리 정의
const categories = ['전체', '자체강연', '모임', '강연', '챌린지'];

export default function MoimPage() {
    const [moims, setMoims] = useState<Moim[]>([]);
    const [filtered, setFiltered] = useState<Moim[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('전체');

    useEffect(() => {
        const fetchMoims = async () => {
            try {
                const { data, error } = await supabase
                    .from('programs')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                const mapped: Moim[] = (data ?? []).map((d: MoimResponse) => ({
                    id: d.id.toString(),
                    title: d.title ?? '',
                    description: d.description ?? '',
                    imageUrl: d.thumbnail ?? '',
                    category: d.category ?? '모임',
                }));

                // 자체강연: 마인드 포인트 추가
                const mindPoint: Moim = {
                    id: 'mp',
                    title: '마인드 포인트',
                    description: '그룹 코칭 기반 자기 성장 프로그램',
                    imageUrl: '/mindpoint-thumbnail.jpg',
                    category: '자체강연',
                };

                if (!mapped.some((m) => m.title === '마인드 포인트')) {
                    mapped.unshift(mindPoint);
                }

                setMoims(mapped);
                setFiltered(mapped); // 초기 전체 필터링
            } catch (err) {
                console.error('[Supabase Fetch Error]', err);
                setMoims([]);
                setFiltered([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMoims();
    }, []);

    // 카테고리 변경 시 필터링
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        if (category === '전체') {
            setFiltered(moims);
        } else {
            setFiltered(moims.filter((m) => m.category === category));
        }
    };

    return (
        <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-3 mb-6 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-2 rounded-lg font-medium ${
                            selectedCategory === cat
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? <p>불러오는 중...</p> : <MoimList moims={filtered || []} />}
        </section>
    );
}
