'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

interface Program {
    id: number;
    title: string;
    subtitle?: string | null;
    thumbnail?: string | null;
    start_date?: string | null;
    end_date?: string | null;
}

interface CategoryItem {
    id: number;
    order_no: number; // 1~9까지 순서 관리
    icon?: string | null;
    text: string;
    link: string;
    image?: string | null;
}

interface BannerItem {
    id: number;
    title: string;
    link: string;
    image: string;
    order_no: number;
}

export default function HomePage() {
    const [recommendedPrograms, setRecommendedPrograms] = useState<Program[]>([]);
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [banners, setBanners] = useState<BannerItem[]>([]);
    const [bannerIndex, setBannerIndex] = useState(0);

    const carouselRef = useRef<HTMLDivElement>(null);

    // Supabase에서 데이터 가져오기
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

    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('order_no', { ascending: true });
            if (error) throw error;
            if (data) setCategories(data as CategoryItem[]);
        } catch (err) {
            console.error('[Supabase Categories Fetch Error]', err);
            setCategories([]);
        }
    };

    const fetchBanners = async () => {
        try {
            const { data, error } = await supabase.from('banners').select('*').order('order_no', { ascending: true });
            if (error) throw error;
            if (data) setBanners(data as BannerItem[]);
        } catch (err) {
            console.error('[Supabase Banners Fetch Error]', err);
            setBanners([]);
        }
    };

    useEffect(() => {
        fetchPrograms();
        fetchCategories();
        fetchBanners();
    }, []);

    // 배너 자동 슬라이드
    useEffect(() => {
        if (banners.length === 0) return;
        const interval = setInterval(() => {
            setBannerIndex((prev) => (prev < banners.length - 1 ? prev + 1 : 0));
        }, 3000);
        return () => clearInterval(interval);
    }, [banners]);

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

    const programInfo = {
        name: '마인드 포인트',
        target: '20대~30대 초반 청년층',
        duration: '3주 (주 2회, 총 6회)',
        notionDetail: '',
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* 배너 캐러셀 (한 장씩 + 자동 슬라이드) */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
                <div className="relative">
                    <button
                        onClick={() => setBannerIndex((prev) => (prev > 0 ? prev - 1 : banners.length - 1))}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                    >
                        ◀
                    </button>

                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-500"
                            style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
                        >
                            {banners.map((banner) => (
                                <Link key={banner.id} href={banner.link} className="min-w-full flex-shrink-0">
                                    <img
                                        src={banner.image}
                                        alt={banner.title}
                                        className="w-full h-64 sm:h-80 object-cover rounded-2xl"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setBannerIndex((prev) => (prev < banners.length - 1 ? prev + 1 : 0))}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                    >
                        ▶
                    </button>
                </div>
            </section>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-indigo-50 to-white py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-12">
                    <motion.div
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1"
                    >
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                            # {programInfo.name} 프로그램
                        </h1>
                        <p className="mt-4 text-gray-700 max-w-xl">
                            <strong>대상:</strong> {programInfo.target} <br />
                            <strong>기간:</strong> {programInfo.duration} <br />
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
                            <img src="/widthmind.jpg" alt="마인드 포인트" className="w-full h-64 object-cover" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Icon Grid Section (Supabase 카테고리) */}
            <section className="bg-white py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-y-6 text-center">
                        {categories.map((item, i) => (
                            <Link
                                href={item.link}
                                key={item.id}
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
                                        <span className="text-4xl">{item.icon || '❓'}</span>
                                    )}
                                </motion.div>
                                <p className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                                    {item.text}
                                </p>
                            </Link>
                        ))}

                        <Link href="/moim" className="flex flex-col items-center justify-center space-y-2 group">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: categories.length * 0.05 }}
                                className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-sm group-hover:bg-gray-200 transition-colors"
                            >
                                <ArrowDownCircleIcon className="w-10 h-10 text-orange-400" />
                            </motion.div>
                            <p className="text-sm font-medium text-orange-400 group-hover:text-indigo-600 transition-colors">
                                더보기
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 최신 프로그램 그리드 */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">🆕 최신 프로그램</h2>
                        <Link href="#" className="text-orange-500 font-medium hover:underline">
                            더보기 &rarr;
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recommendedPrograms.slice(0, 6).map((prog) => (
                            <Link
                                href={`/moim/${prog.id}`}
                                key={prog.id}
                                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
                            >
                                {prog.thumbnail && (
                                    <img
                                        src={prog.thumbnail}
                                        alt={prog.title}
                                        className="w-full h-48 sm:h-40 object-cover"
                                    />
                                )}
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <h3 className="font-semibold text-lg mb-1 truncate">{prog.title}</h3>
                                    <p className="text-gray-700 text-sm truncate">{prog.subtitle}</p>
                                    <span className="text-orange-500 font-medium mt-2 block">NEW</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
