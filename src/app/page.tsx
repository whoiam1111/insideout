'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Program {
    id: number;
    title: string;
    subtitle?: string | null;
    thumbnail?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}

export default function HomePage() {
    const [recommendedPrograms, setRecommendedPrograms] = useState<Program[]>([]);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Supabase에서 프로그램 가져오기
    const fetchPrograms = async () => {
        try {
            const { data, error } = await supabase
                .from('programs')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setRecommendedPrograms(data as Program[]);
        } catch (err) {
            console.error('[Supabase Fetch Error]', err);
            setRecommendedPrograms([]);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // 기존 아이콘 그리드 유지
    const iconGridItems = [
        { icon: '📣', text: '오픈 임박!', link: '#' },
        { icon: '⏰', text: '마감 임박!', link: '#' },
        { icon: '🗓️', text: '2주 안에 시작', link: '#' },
        { icon: '❤️', text: '크루 추천 클럽', link: '#' },
        { icon: '🍊', text: '제주에서 모임하기', link: '#' },
        { icon: '🏛️', text: '인문/사회/철학/과학', link: '#' },
        { icon: '📺', text: '문화/예술/콘텐츠', link: '#' },
        { icon: '💼', text: '커리어/리더십', link: '#' },
        { icon: '💰', text: '금융/경제/투자', link: '#' },
        { icon: '더보기', iconClass: 'text-orange-400', image: '/arrow-down-circle.png', link: '/detail' },
    ];

    const program = {
        name: '마인드 포인트(가제)',
        target: '20대~30대 초반 청년층',
        duration: '3주 (주 2회, 총 6회)',
        notionDetail: '',
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* 추천 프로그램 캐러셀 */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
                <h2 className="text-2xl font-bold mb-4">🔥 추천 프로그램</h2>
                <div className="relative">
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                    >
                        ◀
                    </button>
                    <div ref={carouselRef} className="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
                        {recommendedPrograms.map((prog) => (
                            <motion.div
                                key={prog.id}
                                className="min-w-[250px] bg-white rounded-2xl shadow-md overflow-hidden flex-shrink-0 hover:shadow-lg transition"
                                whileHover={{ scale: 1.03 }}
                            >
                                <Link href="#" className="block">
                                    {prog.thumbnail && (
                                        <img
                                            src={prog.thumbnail}
                                            alt={prog.title}
                                            className="w-full h-40 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg">{prog.title}</h3>
                                        <p className="text-sm text-gray-600 mt-1">{prog.subtitle}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                    >
                        ▶
                    </button>
                </div>
            </section>

            {/* Hero Section (기존 유지) */}
            <section className="bg-gradient-to-br from-indigo-50 to-white py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-12">
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                            # {program.name} 프로그램
                        </h1>
                        <p className="mt-4 text-gray-700 max-w-xl">
                            <strong>대상:</strong> {program.target} <br />
                            <strong>기간:</strong> {program.duration} <br />
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/moim/mindpoint"
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300"
                            >
                                상세보기
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 w-full max-w-md"
                    >
                        <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
                            <img src="/insideout-hero.jpg" alt="마인드 포인트" className="w-full h-64 object-cover" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Icon Grid Section */}
            <section className="bg-white py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-5 md:grid-cols-5 gap-y-6 text-center">
                        {iconGridItems.map((item, i) => (
                            <Link
                                href={item.link}
                                key={i}
                                className="flex flex-col items-center justify-center space-y-2 group"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-sm group-hover:bg-gray-200 transition-colors"
                                >
                                    {item.image ? (
                                        <img src={item.image} alt={item.text} className="w-10 h-10 object-contain" />
                                    ) : (
                                        <span className={`text-4xl ${item.iconClass || ''}`}>{item.icon}</span>
                                    )}
                                </motion.div>
                                <p className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                                    {item.text}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* 최신 프로그램 */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">🆕 최신 프로그램</h2>
                        <Link href="#" className="text-orange-500 font-medium hover:underline">
                            더보기 &rarr;
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recommendedPrograms
                            .slice(0, 3) // 최신 3개
                            .map((prog) => (
                                <div
                                    key={prog.id}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                                >
                                    {prog.thumbnail && (
                                        <img
                                            src={prog.thumbnail}
                                            alt={prog.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">{prog.title}</h3>
                                        <p className="text-gray-700 text-sm">{prog.subtitle}</p>
                                        <span className="text-orange-500 font-medium mt-2 block">NEW</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* 추천 프로그램 */}
                {/* <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">🔥 추천 프로그램</h2>
                        <Link
                            href="#"
                            className="text-orange-500 font-medium hover:underline"
                        >
                            더보기 &rarr;
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recommendedPrograms
                            .filter((p) => p.is_recommended) // 추천 프로그램만 필터링
                            .slice(0, 3)
                            .map((prog) => (
                                <div
                                    key={prog.id}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                                >
                                    {prog.thumbnail && (
                                        <img
                                            src={prog.thumbnail}
                                            alt={prog.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-2">{prog.title}</h3>
                                        <p className="text-gray-700 text-sm">{prog.subtitle}</p>
                                        <span className="text-red-500 font-medium mt-2 block">추천</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div> */}
            </section>
        </div>
    );
}
