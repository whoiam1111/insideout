"use client";

import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, signOut } = useAuth();
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm w-full">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {" "}
                    {/* 높이도 조금 키움 */}
                    {/* 로고 */}
                    <Link href="/" className="flex items-center gap-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-white shadow">
                            <img
                                src="/logo.png"
                                alt="InsideOut 로고"
                                className="w-14 h-14 object-contain"
                            />
                        </div>
                        <span className="font-bold text-gray-800 text-xl sm:text-2xl">
                            InsideOut
                        </span>
                    </Link>
                    {/* 데스크탑 네비게이션 */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                        <Link
                            href="/moim"
                            className={`hover:text-indigo-600 transition-colors ${
                                pathname === "/moim"
                                    ? "text-indigo-600"
                                    : "text-gray-700"
                            }`}
                        >
                            모임
                        </Link>
                        <Link
                            href="/about"
                            className={`hover:text-indigo-600 transition-colors ${
                                pathname === "/about"
                                    ? "text-indigo-600"
                                    : "text-gray-700"
                            }`}
                        >
                            소개
                        </Link>
                        <Link
                            href="/contact"
                            className={`hover:text-indigo-600 transition-colors ${
                                pathname === "/contact"
                                    ? "text-indigo-600"
                                    : "text-gray-700"
                            }`}
                        >
                            문의
                        </Link>

                        {/* 로그인 상태 */}
                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 text-sm">
                                    {user.email}
                                </span>
                                <button
                                    onClick={signOut}
                                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                                >
                                    로그아웃
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/auth"
                                className="px-3 py-1.5 text-sm rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
                            >
                                로그인 / 회원가입
                            </Link>
                        )}
                    </nav>
                    {/* 모바일 메뉴 버튼 */}
                    <div className="md:hidden flex items-center">
                        <button
                            type="button"
                            className="p-2 text-gray-600 hover:text-gray-900"
                            aria-label="모바일 메뉴 열기"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <XMarkIcon className="w-6 h-6" />
                            ) : (
                                <Bars3Icon className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* 모바일 메뉴 */}
            {mobileMenuOpen && (
                <nav className="md:hidden bg-white shadow-md border-t border-gray-200">
                    <ul className="flex flex-col p-4 space-y-3 text-gray-700">
                        <li>
                            <Link
                                href="/moim"
                                className="block px-3 py-2 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                모임
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                className="block px-3 py-2 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                소개
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="block px-3 py-2 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                문의
                            </Link>
                        </li>

                        {/* 모바일 로그인/로그아웃 */}
                        <li className="border-t border-gray-200 pt-3 mt-3">
                            {user ? (
                                <div className="flex flex-col gap-2">
                                    <span className="text-sm text-gray-600">
                                        {user.email}
                                    </span>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm transition"
                                    >
                                        로그아웃
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/auth"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block px-3 py-2 rounded-md bg-indigo-500 text-white text-center hover:bg-indigo-600 transition"
                                >
                                    로그인 / 회원가입
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
}
