'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import MainSlider from './components/MainSlider';

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
    const [shortPrograms, setShortPrograms] = useState<Program[]>([]);
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
            console.log(data);
        } catch (err) {
            console.error('[Supabase Fetch Error]', err);
            setRecommendedPrograms([]);
        }
    };

    const fetchShortPrograms = async () => {
        try {
            const { data, error } = await supabase
                .from('programs')
                .select()
                .eq('duration_type', '단기')
                .order('created_at', { ascending: false });
            if (error) throw error;
            if (data) setShortPrograms(data as Program[]);
        } catch (err) {
            console.error('[Supabase Fetch Error]', err);
            setShortPrograms([]);
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
            // console.log("banner data", data);
        } catch (err) {
            console.error('[Supabase Banners Fetch Error]', err);
            setBanners([]);
        }
    };

    useEffect(() => {
        fetchPrograms();
        fetchShortPrograms();
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
        <div className="min-h-screen bg-white text-gray-900">
            {/* 배너 캐러셀 (한 장씩 + 자동 슬라이드) */}
            <section className="max-w-6xl mx-auto md:px-4 sm:px-6 lg:px-8 py-6 relative">
                <MainSlider banners={banners} />
            </section>

            {/* Icon Grid Section (Supabase 카테고리) */}
            <section className="bg-white py-8 mb-10">
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
                                    transition={{
                                        duration: 0.3,
                                        delay: i * 0.05,
                                    }}
                                    className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-sm group-hover:bg-gray-200 transition-colors"
                                >
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.text}
                                            className="w-10 h-10 object-contain"
                                        />
                                    ) : (
                                        <span className="text-4xl">{item.icon || '❓'}</span>
                                    )}
                                </motion.div>
                                <p className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                                    {item.text}
                                </p>
                            </Link>
                        ))}

                        <Link
                            href="/insideout"
                            className="flex flex-col items-center justify-center space-y-2 group"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    duration: 0.3,
                                    delay: categories.length * 0.05,
                                }}
                                className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-sm group-hover:bg-gray-200 transition-colors"
                            >
                                <ArrowDownCircleIcon className="w-10 h-10 text-indigo-600" />
                            </motion.div>
                            <p className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                                더보기
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 최신 프로그램 그리드 */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">🔥 요즘 핫한 프로그램</h2>
                        <Link
                            href="#"
                            className="text-gray-500 font-medium hover:underline"
                        >
                            더보기 &rarr;
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {recommendedPrograms.slice(0, 6).map((prog) => (
                            <Link
                                href={`/insideout/${prog.id}`}
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
                                    <span className="text-rose-500 font-medium mt-2 block">NEW</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 단기 프로그램 그리드 */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">하루만 참여할 수 있는 프로그램</h2>
                        <Link
                            href="#"
                            className="text-gray-500 font-medium hover:underline"
                        >
                            더보기 &rarr;
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {shortPrograms.slice(0, 6).map((prog) => (
                            <Link
                                href={`/insideout/${prog.id}`}
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
                                    {/* <span className="text-rose-500 font-medium mt-2 block">
                                        NEW
                                    </span> */}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
