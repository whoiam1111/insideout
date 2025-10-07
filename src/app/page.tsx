'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function InsideOutLanding() {
    const programs = [
        {
            id: 1,
            title: '내면 탐색 워크숍',
            subtitle: '감정, 가치, 강점 발견하기',
            description:
                '소그룹 실습과 저널링을 통해 자신의 핵심 감정과 가치를 확인하고, 실생활에 적용 가능한 성장 루틴을 설계합니다.',
            duration: '4주',
        },
        {
            id: 2,
            title: '자기대화 코칭',
            subtitle: '생산적인 자기대화 습관 만들기',
            description: '부정적 내적 대화를 다루는 실전 전략과 매주 맞춤 피드백을 제공합니다. 1:1 코칭 옵션 포함.',
            duration: '6주',
        },
        {
            id: 3,
            title: '관계성과 회복력 프로그램',
            subtitle: '관계 역량과 회복탄력성 키우기',
            description: '갈등 관리, 경계 설정, 회복력 훈련을 통해 관계에서 더 건강하게 서는 법을 배웁니다.',
            duration: '5주',
        },
    ];

    const testimonials = [
        {
            id: 1,
            name: '민지 (27)',
            quote: 'InsideOut을 통해 내가 정말 원하는 걸 처음 알게 됐어요. 강연 + 워크숍 구성도 현실적이라 꾸준히 실천하게 됩니다.',
        },
        {
            id: 2,
            name: '준호 (31)',
            quote: '실제 삶에 적용되는 툴을 얻었고, 커뮤니티 덕분에 동기부여도 계속 이어져요.',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Nav */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold">
                                IO
                            </div>
                            <div className="font-semibold">InsideOut</div>
                        </div>
                        <nav className="hidden md:flex items-center gap-6 text-sm">
                            <a
                                className="hover:text-indigo-600"
                                href="#programs"
                            >
                                프로그램
                            </a>
                            <a
                                className="hover:text-indigo-600"
                                href="#how"
                            >
                                진행방식
                            </a>
                            <a
                                className="hover:text-indigo-600"
                                href="#testimonials"
                            >
                                수강후기
                            </a>
                            <a
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:opacity-95"
                                href="#signup"
                            >
                                지금 신청
                            </a>
                        </nav>
                        <div className="md:hidden">{/* mobile menu placeholder */}</div>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <main>
                <section className="relative overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 flex flex-col lg:flex-row items-center gap-12">
                        <motion.div
                            initial={{ x: -40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="flex-1"
                        >
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                                내면에서 시작하는 성장,
                                <br />
                                <span className="text-indigo-600">InsideOut</span>
                            </h1>
                            <p className="mt-4 text-gray-600 max-w-xl">
                                20-30대를 위한 실전 자기개발 프로그램 — 감정 이해, 목표 설계, 일상 습관화를 통해 지속
                                가능한 성장을 돕습니다.
                            </p>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href="#signup"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow hover:opacity-95"
                                >
                                    지금 신청하기
                                </a>
                                <a
                                    href="#programs"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-200 text-sm"
                                >
                                    프로그램 보기
                                </a>
                            </div>

                            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md">
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <div className="text-sm font-semibold">소그룹</div>
                                    <div className="text-xs text-gray-500">소수 인원 중심 몰입형</div>
                                </div>
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <div className="text-sm font-semibold">전문 코치</div>
                                    <div className="text-xs text-gray-500">심리·코칭 융합</div>
                                </div>
                                <div className="p-3 bg-white rounded-lg shadow-sm">
                                    <div className="text-sm font-semibold">커뮤니티</div>
                                    <div className="text-xs text-gray-500">지속적 지원과 모임</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="flex-1 w-full max-w-md"
                        >
                            <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
                                <img
                                    src="/insideout-hero.jpg"
                                    alt="hero"
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-5">
                                    <div className="text-sm text-gray-500">다음 기수</div>
                                    <div className="mt-1 font-semibold">2025년 10월 시작 — 선착순 모집</div>
                                    <p className="mt-3 text-gray-600 text-sm">
                                        실전 과제와 피드백 중심의 커리큘럼. 각 회차 녹화 제공 및 커뮤니티 지속 지원.
                                    </p>
                                    <a
                                        href="#signup"
                                        className="mt-4 inline-block px-4 py-2 rounded-md bg-indigo-600 text-white text-sm"
                                    >
                                        신청하기
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative shapes */}
                    <div className="pointer-events-none absolute right-0 top-0 opacity-10 w-72 h-72 bg-gradient-to-br from-pink-300 to-indigo-400 rounded-full blur-3xl -translate-y-1/3 transform" />
                </section>

                {/* Programs */}
                <section
                    id="programs"
                    className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                >
                    <h2 className="text-2xl font-bold">프로그램</h2>
                    <p className="mt-2 text-gray-600 max-w-2xl">
                        실습 중심의 소규모 워크숍과 장기 코칭 트랙. 20-30대의 라이프스타일을 고려해 설계했습니다.
                    </p>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {programs.map((p) => (
                            <article
                                key={p.id}
                                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">{p.title}</h3>
                                        <div className="text-sm text-indigo-600">{p.subtitle}</div>
                                    </div>
                                    <div className="text-sm text-gray-500">{p.duration}</div>
                                </div>
                                <p className="mt-3 text-gray-600 text-sm">{p.description}</p>
                                <div className="mt-4 flex items-center gap-3">
                                    <a
                                        className="text-sm font-medium text-indigo-600"
                                        href="#signup"
                                    >
                                        자세히 보기
                                    </a>
                                    <a className="ml-auto px-3 py-1 rounded-full border text-sm text-gray-600">
                                        모집중
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* How it works */}
                <section
                    id="how"
                    className="bg-indigo-50 py-12"
                >
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-2xl font-bold">진행 방식</h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-3">
                            <div className="p-5 bg-white rounded-2xl shadow-sm">
                                <div className="text-sm font-semibold">1. 발견</div>
                                <p className="mt-2 text-gray-600 text-sm">
                                    체계적 질문과 저널링으로 현재의 감정·패턴을 확인합니다.
                                </p>
                            </div>
                            <div className="p-5 bg-white rounded-2xl shadow-sm">
                                <div className="text-sm font-semibold">2. 실험</div>
                                <p className="mt-2 text-gray-600 text-sm">
                                    작은 실험과 과제를 통해 새로운 행동을 시도합니다.
                                </p>
                            </div>
                            <div className="p-5 bg-white rounded-2xl shadow-sm">
                                <div className="text-sm font-semibold">3. 습관화</div>
                                <p className="mt-2 text-gray-600 text-sm">
                                    반복 피드백과 커뮤니티 지원으로 변화를 지속시킵니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section
                    id="testimonials"
                    className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
                >
                    <h2 className="text-2xl font-bold">수강 후기</h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        {testimonials.map((t) => (
                            <blockquote
                                key={t.id}
                                className="bg-white p-6 rounded-2xl shadow-sm"
                            >
                                <p className="text-gray-700">“{t.quote}”</p>
                                <footer className="mt-4 text-sm text-gray-500">— {t.name}</footer>
                            </blockquote>
                        ))}
                    </div>
                </section>

                {/* Signup */}
                <section
                    id="signup"
                    className="bg-white py-12"
                >
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="rounded-2xl p-6 shadow-sm bg-gradient-to-br from-white to-indigo-50">
                            <h3 className="text-xl font-bold">체험 신청서</h3>
                            <p className="mt-2 text-sm text-gray-600">
                                무료 오리엔테이션에 참여해 프로그램을 체험해보세요.
                            </p>

                            <form className="mt-6 grid gap-3 sm:grid-cols-2">
                                <input
                                    className="p-3 rounded-lg border"
                                    placeholder="이름"
                                />
                                <input
                                    className="p-3 rounded-lg border"
                                    placeholder="연락처 (전화 또는 카카오톡)"
                                />
                                <input
                                    className="p-3 rounded-lg border sm:col-span-2"
                                    placeholder="간단한 관심 분야 (예: 관계/진로/습관)"
                                />
                                <button
                                    type="button"
                                    className="sm:col-span-2 px-4 py-3 rounded-lg bg-indigo-600 text-white"
                                >
                                    오리엔테이션 신청하기
                                </button>
                            </form>

                            <div className="mt-4 text-xs text-gray-500">
                                * 개인정보는 신청 확인 용도로만 사용합니다.
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-100 py-8">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold">
                                IO
                            </div>
                            <div>
                                <div className="font-semibold">InsideOut</div>
                                <div className="text-xs text-gray-500">내면에서 시작하는 성장</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-600">
                            © {new Date().getFullYear()} InsideOut — Designed for 20s & 30s
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
