'use client';

import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Header() {
    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* 로고 */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold">
                            IO
                        </div>
                        <span className="font-semibold text-gray-800">InsideOut</span>
                    </Link>

                    {/* 네비게이션 */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                        <Link href="/moim" className="hover:text-indigo-600 transition-colors">
                            모임
                        </Link>
                        <Link href="/about" className="hover:text-indigo-600 transition-colors">
                            소개
                        </Link>
                        <Link href="/contact" className="hover:text-indigo-600 transition-colors">
                            문의
                        </Link>
                    </nav>

                    {/* 모바일 메뉴 아이콘 */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="p-2 text-gray-600 hover:text-gray-900"
                            aria-label="모바일 메뉴 열기"
                        >
                            <Bars3Icon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
