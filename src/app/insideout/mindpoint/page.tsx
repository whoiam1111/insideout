'use client';

import Image from 'next/image';
import { useState } from 'react'; // FAQ 아코디언 기능을 위해 useState 추가

export default function MindPointPage() {
    const sessions = [
        {
            week: '1주차',
            session: '1회',
            title: '나의 정체성 - 나는 누구인가?',
            activity: '에릭슨 발달 과제 점검',
        },
        {
            week: '1주차',
            session: '2회',
            title: '가치관의 지도 - 나에게 중요한 것은?',
            activity: '가치관 명료화, 우선순위 매트릭스',
        },
        {
            week: '2주차',
            session: '3회',
            title: '성장을 위한 마인드셋 - 나는 내 삶을 책임지는가?',
            activity: '인생 그래프, 결정적 순간 분석',
        },
        {
            week: '2주차',
            session: '4회',
            title: '삶의 의미와 소명 - 나는 무엇을 성취하고 싶은가?',
            activity: '미션 선언문 작성',
        },
        {
            week: '3주차',
            session: '5회',
            title: '그림자 찾기 - 숨겨진 잠재력과 두려움은?',
            activity: '그림자 투사 분석',
        },
        {
            week: '3주차',
            session: '6회',
            title: '나의 이야기 만들기 - 나는 어떤 이야기의 주인공인가?',
            activity: '자기 서사 만들기',
        },
    ];

    const faqs = [
        {
            question: '프로그램 참여 대상은 어떻게 되나요?',
            answer: '20대에서 30대 초반 청년층을 대상으로 합니다. 자신을 탐구하고 성장하고 싶은 모든 분들을 환영합니다.',
        },
        {
            question: '프로그램은 언제 진행되나요?',
            answer: '총 3주 동안 주 2회, 총 6회 진행됩니다. 구체적인 요일과 시간은 신청 페이지에서 확인해주세요.',
        },
        {
            question: '준비물이나 사전 지식이 필요한가요?',
            answer: '아니요, 특별한 준비물이나 사전 지식은 필요하지 않습니다. 편안한 마음으로 참여하시면 됩니다.',
        },
        {
            question: '온라인으로 진행되나요?',
            answer: '모든 과정은 오프라인, 대면으로 진행 되빈다.',
        },

        {
            question: '그룹 코칭은 어떤 방식으로 진행되나요?',
            answer: '소규모 그룹으로 진행되며, 각 회차별 주제에 맞춰 개인적인 성찰과 그룹 내 공유를 통해 함께 성장하는 방식입니다.',
        },
    ];

    const expectations = [
        '1. 정체성 혼란 극복 → “나는 누구인가?”에 대한 답을 찾아갑니다.',
        '2. 가치 명료화 → 나만의 핵심 가치와 삶의 우선순위를 세웁니다.',
        '3. 삶의 의미와 소명 발견 → 단순한 진로를 넘어 ‘내가 존재하는 이유’를 성찰합니다.',
        '4. 나만의 서사 구축 → 나의 이야기를 서사로 정리하고 미래를 설계합니다.',
        '5. 지속 가능한 성장을 위한 발판 마련 → 프로그램 이후에도 스스로 성장할 수 있는 토대를 마련합니다.',
    ];

    const recommend = [
        '“나는 누구인가?”라는 질문을 하고 계신 분',
        '진로, 가치, 인간관계 속에서 방향성을 잃었다고 느끼는 분',
        '미래에 대한 불안감과, 내면의 혼란·공허함을 느끼는 분',
        '일시적 동기부여가 아닌, 지속 가능한 성장 기반을 찾고 싶은 분',
        '자기 성찰을 넘어 진정한 자기 실현을 꿈꾸는 분',
    ];

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen font-sans text-gray-900">
            {/* Hero Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    {/* Left - Poster */}
                    <div className="flex justify-center md:justify-start">
                        <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-200/50">
                            <Image
                                src="/poster.jpg" // 이미지 경로를 실제 파일 위치로 변경해주세요.
                                alt="마인드 포인트 포스터"
                                width={600}
                                height={800}
                                layout="responsive"
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right - Text Content */}
                    <div className="text-center md:text-left">
                        <p className="text-indigo-600 text-sm font-semibold mb-2 uppercase tracking-wide">
                            2025 청년 성장 프로그램
                        </p>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-2">
                            MIND POINT
                        </h1>
                        <p className="mb-4">“당신의 마음이 머무는 지점, 삶의 의미가 시작되는 좌표.”</p>
                        <p className="text-lg text-gray-700 mb-6">
                            <span className="font-semibold text-gray-800">3주 (주 2회, 총 6회)</span> 자기 성장 프로그램
                        </p>
                        <p className="text-gray-500 text-sm mb-4">
                            대상: <span className="font-medium text-gray-700">20대~30대 청년층</span>
                        </p>
                        {/* 리프레임포인트 참고 문구 추가 */}
                        <p className="text-gray-400 text-xs mb-6">
                            본 프로그램의 일부 콘텐츠는{' '}
                            <a
                                href="https://www.reframepoint.co.kr/content"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-indigo-600"
                            >
                                리프레임포인트
                            </a>
                            에서 기획한 그룹 코칭으로 구성되었습니다.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                            <button
                                className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-full bg-white shadow-sm 
        hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                문의하기
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-center mb-12">
                        “당신의 마음이 머무는 지점, 삶의 의미가 시작되는 좌표.”
                    </h2>
                    <div className="text-center mb-10">
                        <div>마인드 포인트는 대한민국 청년들을 위해 설계된 통합 상담·코칭 프로그램입니다.</div>
                        <div>
                            빠르게 변하는 세상 속에서 불안과 혼란을 겪는 청년들에게, 자신만의 가치와 의미를 발견하는
                            ‘좌표(Point)’를 찾아줍니다.
                        </div>
                    </div>
                    <div className="space-y-4 max-w-3xl mx-auto mb-10 text-sm md:text-lg font-semibold">
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                            Mind: 내면의 생각, 감정, 성찰
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                            Point: 인생의 방향을 정해주는 좌표, 전환점, 포인트
                        </div>
                    </div>
                    <div className="font-semibold text-base md:text-xl text-center">
                        “마인드 포인트”는 삶의 중요한 지점에서 나를 돌아보고, 새로운 방향성을 발견하도록 돕습니다.
                    </div>
                </div>
            </section>

            {/* Expectation Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
                        🎯 기대 효과
                    </h2>

                    <div className="flex flex-col gap-4 md:gap-8 max-w-3xl mx-auto">
                        {expectations.map((s, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300
                flex items-center"
                            >
                                <p className="font-semibold mb-2">{s}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recommend Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
                        🚀 이런 분들에게 추천합니다
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {recommend.map((s, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3">{s}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Session Program Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
                        📚 회차별 프로그램 구성
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {sessions.map((s, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <p className="text-sm font-semibold text-indigo-600 mb-2">
                                    {s.week} • {s.session}
                                </p>
                                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">{s.title}</h3>
                                <p className="text-gray-600 text-sm">
                                    <span className="font-medium text-gray-700">활동:</span> {s.activity}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
                        ⁉️ 자주 묻는 질문
                    </h2>

                    <div className="space-y-4 max-w-3xl mx-auto">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-200 rounded-lg shadow-sm"
                            >
                                <button
                                    className="flex justify-between items-center w-full p-5 text-left text-sm md:text-lg font-medium text-gray-800 hover:bg-gray-50 focus:outline-none"
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                >
                                    <span>{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 transition-transform duration-300 ${
                                            openFaq === idx ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        ></path>
                                    </svg>
                                </button>
                                {openFaq === idx && (
                                    <div className="px-5 pb-5 text-gray-600 border-t border-gray-100">
                                        <p className="pt-3">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8 md:mb-12">
                        📍 마인드 포인트에서 만나는 변화와 성장의 여정
                    </h2>
                    <div className="text-center text-lg mb-10">
                        <div>단순한 상담이 아닌, 당신의 삶을 의미있게 만들어 갈 나만의 이야기를 만들어요.</div>
                        <div>불안과 혼란을 넘어, 가치와 의미를 좌표로 삼는 새로운 시작을 함깨 해요.</div>
                    </div>
                    <div className="font-semibold text-2xl text-center mb-10">
                        👉 지금, 마인드 포인트에서 당신의 삶의 좌표를 찾아보세요.
                    </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-indigo-500 px-20 py-3 border border-gray-300 text-white font-semibold rounded-full shadow-sm
                          hover:bg-indigo-600 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            신청하기
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
