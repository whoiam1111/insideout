'use client';

import { useEffect, useState } from 'react';
import MoimList from './components/MoimList';
import { supabase } from '@/app/lib/supabase';

interface Moim {
    id: string;
    title: string;
    subtitle?: string | null;
    imageUrl: string;
    category?: string | null; // 하위 카테고리
    parent_category?: string | null; // 상위 카테고리
    tags?: string[] | null;
    price?: number | null;
}

interface MoimResponse {
    id: string | number;
    title?: string;
    subtitle?: string | null;
    thumbnail?: string | null;
    category?: string | null;
    parent_category?: string | null;
    tags?: string[] | null;
    price?: number | null;
}

// 상위 카테고리 고정
const categories = ['전체', '클래스', '모임', '강연', '챌린지'];

export default function MoimPage() {
    const [moims, setMoims] = useState<Moim[]>([]);
    const [filtered, setFiltered] = useState<Moim[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedParent, setSelectedParent] = useState<string>('전체');
    const [selectedSub, setSelectedSub] = useState<string | null>(null);

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
                    subtitle: d.subtitle ?? d.title ?? '',
                    imageUrl: d.thumbnail ?? '/default.jpg',
                    category: d.category ?? '모임', // 하위 카테고리
                    parent_category: d.parent_category ?? '모임', // 상위 카테고리
                    tags: d.tags ?? [],
                    price: d.price ?? null,
                }));

                setMoims(mapped);
                setFiltered(mapped);
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

    // 선택된 상위 카테고리에 따른 하위 카테고리 추출
    const subCategories =
        selectedParent && selectedParent !== '전체'
            ? Array.from(
                  new Set(
                      moims
                          .filter((m) => (m.category ?? '') === selectedParent)
                          .map((m) => m.parent_category ?? '')
                          .filter(Boolean)
                  )
              )
            : [];

    // 상위 카테고리 선택 시 필터링
    const handleParentCategory = (category: string) => {
        setSelectedParent(category);
        setSelectedSub(null);

        if (category === '전체') {
            setFiltered(moims);
        } else {
            setFiltered(moims.filter((m) => (m.category ?? '') === category));
        }
    };

    // 하위 카테고리 선택 시 필터링
    const handleSubCategory = (sub: string | null) => {
        if (!sub) return;
        setSelectedSub(sub);
        setFiltered(moims.filter((m) => (m.parent_category ?? '') === sub));
    };

    return (
        <section className="py-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* 상위 카테고리 스크롤 탭 */}
            <div className="overflow-x-auto scrollbar-hide mb-2">
                <div className="flex gap-6 whitespace-nowrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleParentCategory(cat)}
                            className={`relative pb-2 font-medium text-sm transition-colors ${
                                selectedParent === cat ? 'text-red-500' : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            {cat}
                            {selectedParent === cat && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* 하위 카테고리 탭 */}
            {subCategories.length > 0 && (
                <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-4">
                    {subCategories.map((sub) => (
                        <button
                            key={sub}
                            onClick={() => handleSubCategory(sub)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                selectedSub === sub
                                    ? 'bg-gray-200 text-gray-800'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {sub}
                        </button>
                    ))}
                </div>
            )}

            {/* 로딩 */}
            {loading && <p className="text-center text-gray-500 text-lg py-20 animate-pulse">불러오는 중...</p>}

            {/* 모임 리스트 */}
            {!loading && <MoimList moims={filtered} />}
        </section>
    );
}
