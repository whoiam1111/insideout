'use client';

export default function MindPointPage() {
    const sessions = [
        {
            week: '1주차',
            session: '1회',
            title: '나의 정체성 - 나는 누구인가?',
            activity: '에릭슨 발달 과제 점검',
            goal: '마음 열기, 교사 신뢰, 배움의 필요성과 자세',
        },
        {
            week: '1주차',
            session: '2회',
            title: '가치관의 지도 - 나에게 중요한 것은?',
            activity: '가치관 명료화, 우선순위 매트릭스',
            goal: '가치관 전환, 배움의 자세',
        },
        {
            week: '2주차',
            session: '3회',
            title: '성장을 위한 마인드셋 - 나는 내 삶을 책임지는가?',
            activity: '인생 그래프, 결정적 순간 분석',
            goal: '가치관 전환, 배움의 자세',
        },
        {
            week: '2주차',
            session: '4회',
            title: '삶의 의미와 소명 - 나는 무엇을 성취하고 싶은가?',
            activity: '미션 선언문 작성',
            goal: '삶의 가치관과 태도, 보이지 않는 것 인식',
        },
        {
            week: '3주차',
            session: '5회',
            title: '그림자 찾기 - 숨겨진 잠재력과 두려움은?',
            activity: '그림자 투사 분석',
            goal: '삶의 가치관과 태도, 보이지 않는 것 인식',
        },
        {
            week: '3주차',
            session: '6회',
            title: '나의 이야기 만들기 - 나는 어떤 이야기의 주인공인가?',
            activity: '자기 서사 만들기',
            goal: '약따기(인철종), 배움의 자세, 성경에 대한 경계 낮추기',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 py-20 px-6">
            {/* Hero */}
            <div className="text-center mb-20">
                <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">MIND POINT</h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                    <span className="font-medium text-indigo-600">그룹 코칭 기반</span> 자기 성장 프로그램
                    <br />
                    <span className="text-gray-800 font-semibold">3주 (주 2회, 총 6회)</span>
                </p>
                <p className="mt-4 text-gray-500 text-sm uppercase tracking-widest">대상: 20대~30대 초반 청년층</p>
            </div>

            {/* 회차별 프로그램 */}
            <section className="mb-20">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">회차별 프로그램 구성</h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {sessions.map((s, idx) => (
                        <div
                            key={idx}
                            className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-indigo-600">
                                    {s.week} • {s.session}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-700 transition">
                                {s.title}
                            </h3>
                            <p className="text-gray-700 mb-2">
                                <strong className="text-gray-900">활동:</strong> {s.activity}
                            </p>
                            {/* <p className="text-gray-600 text-sm leading-snug">
                                <strong className="text-gray-800">목표:</strong> {s.goal}
                            </p> */}
                        </div>
                    ))}
                </div>
            </section>

            {/* 활용 */}
            <section className="mb-20 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-900">활용</h2>
                <ul className="space-y-3 text-gray-700 text-lg">
                    <li>• 개인 코칭 / 그룹 코칭 모두 진행 가능 (2인 이상 권장)</li>
                    <li>• 에니어그램, 그림상담 도구 등 병행 가능</li>
                    <li>• 노방 활동 없이 프로그램만으로도 활용 가능</li>
                    <li>• 미니 강의는 직접 진행 또는 특강자 초청 가능</li>
                </ul>
            </section>

            {/* 후속 프로그램 */}
            {/* <section className="text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">후속 프로그램 소개</h2>
                <p className="text-gray-700 text-lg">자세한 내용은 내부 안내 자료를 통해 확인하실 수 있습니다.</p>
                <button className="mt-8 px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    안내 자료 요청하기
                </button>
            </section> */}
        </div>
    );
}
