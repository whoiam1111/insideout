'use client';
import { useState } from 'react';

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState<'intro' | 'membership'>('intro');

    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            {/* 탭 메뉴 */}
            <div className="flex justify-center gap-4 border-b border-gray-200 mb-8">
                <button
                    className={`px-6 py-2 font-semibold ${
                        activeTab === 'intro'
                            ? 'border-b-4 border-orange-500 text-orange-600'
                            : 'text-gray-500 hover:text-gray-700'
                    } transition`}
                    onClick={() => setActiveTab('intro')}
                >
                    소개
                </button>
                <button
                    className={`px-6 py-2 font-semibold ${
                        activeTab === 'membership'
                            ? 'border-b-4 border-indigo-600 text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                    } transition`}
                    onClick={() => setActiveTab('membership')}
                >
                    멤버십
                </button>
            </div>

            {/* 탭 컨텐츠 */}
            {activeTab === 'intro' && <IntroSection />}
            {activeTab === 'membership' && <MembershipSection />}
        </main>
    );
}

// 소개 섹션
function IntroSection() {
    return (
        <section className="space-y-20">
            {/* Hero Banner */}
            <section className="text-center bg-orange-500 text-white rounded-xl p-12 space-y-4 shadow-lg">
                <h1 className="text-4xl sm:text-5xl font-extrabold">
                    읽고 쓰고
                    <br />
                    대화하고
                    <br />
                    친해져요
                </h1>
                <p className="text-lg sm:text-xl font-medium">
                    인사이드아웃은 청년 대상 커뮤니티 플랫폼으로, 모임과 강연, 성장 프로그램을 제공합니다.
                </p>
            </section>

            {/* 플랫폼 소개 */}
            <section className="space-y-12">
                <IntroCard
                    image="/images/intro1.jpg"
                    title="왜 인사이드아웃인가요?"
                    description="우리는 관심사와 자기성장을 중심으로 다양한 모임과 강연을 제공하며, 새로운 사람들과 의미 있는 경험을 만들어갑니다."
                />
                <IntroCard
                    image="/images/intro2.jpg"
                    title="혼자라면 놓쳤을 경험"
                    description="함께 모임과 대화를 통해 시야를 넓히고, 새로운 인사이트와 교류를 경험할 수 있습니다."
                    reverse
                />
                <IntroCard
                    image="/images/intro3.jpg"
                    title="새로운 동료들이 함께할 거예요"
                    description="직업, 나이, 성별과 관계없이 비슷한 관심사와 목표를 가진 청년들과 소통하며, 관계를 만들어갈 수 있습니다."
                />
            </section>

            {/* 자체 프로그램 강조 */}
            <section className="bg-orange-50 p-12 rounded-xl text-center space-y-6">
                <h2 className="text-3xl font-bold text-gray-800">자체 강연: 마인드 포인트</h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    그룹 코칭 기반 자기 성장 프로그램으로, 20~30대 청년들이 자기 인식과 가치 발견, 성장 경험을 누릴 수
                    있도록 설계되었습니다.
                </p>
            </section>
        </section>
    );
}

// 멤버십 섹션
function MembershipSection() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-indigo-50">
            {/* 상단 문구 */}
            <div className="text-center mb-14">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">인사이드아웃 멤버십</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    멤버십에 가입하면 <strong className="text-indigo-600">인사이드</strong>와{' '}
                    <strong className="text-orange-500">아웃</strong> 두 가지 디벨롭 혜택을 함께 누릴 수 있습니다.
                </p>
            </div>

            {/* 멤버십 카드 섹션 */}
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto px-6">
                {/* 인사이드 디벨롭 */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group border border-indigo-100 hover:shadow-2xl transition">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="p-10 space-y-6 relative z-10">
                        <h3 className="text-2xl font-bold text-indigo-700">인사이드 디벨롭</h3>
                        <p className="text-gray-600">자신을 깊이 탐구하고, 내면의 성장을 도와주는 여정</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
                            <li>자기 분석 및 자기 인식 워크숍 참여</li>
                            <li>1:1 내면 성장 코칭 프로그램</li>
                            <li>맞춤형 성장 콘텐츠 제공</li>
                            <li>주 1회 멤버 전용 온라인 모임</li>
                        </ul>
                    </div>
                </div>

                {/* 아웃 디벨롭 */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden group border border-orange-100 hover:shadow-2xl transition">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
                    <div className="p-10 space-y-6 relative z-10">
                        <h3 className="text-2xl font-bold text-orange-600">아웃 디벨롭</h3>
                        <p className="text-gray-600">세상과 연결되고, 실무 경험과 네트워킹을 확장하는 단계</p>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 text-left">
                            <li>오프라인 모임 및 워크숍 참여</li>
                            <li>그룹 코칭 프로그램 할인 혜택</li>
                            <li>파트너 이벤트 및 커리어 네트워킹</li>
                            <li>외부 프로젝트 및 실무 경험 확장</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* CTA 버튼 */}
            <div className="text-center mt-16">
                <button className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                    인사이드아웃 멤버십 가입하기
                </button>
                <p className="text-gray-500 text-sm mt-3">
                    지금 가입하면 첫 달 <strong className="text-indigo-600">10% 할인</strong> 혜택 제공 🎉
                </p>
            </div>
        </section>
    );
}

// IntroCard Component
function IntroCard({
    image,
    title,
    description,
    reverse = false,
}: {
    image: string;
    title: string;
    description: string;
    reverse?: boolean;
}) {
    return (
        <div className={`flex flex-col md:flex-row items-center gap-6 ${reverse ? 'md:flex-row-reverse' : ''}`}>
            <img src={image} alt={title} className="w-full md:w-1/2 rounded-xl shadow-md object-cover" />
            <div className="md:w-1/2 space-y-4 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
}
