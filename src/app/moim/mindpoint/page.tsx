// src/app/mindpoint/page.tsx
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
            activity: '자기 서사 만들기, 후속 소개',
            goal: '약따기(인철종), 배움의 자세, 성경에 대한 경계 낮추기',
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero */}
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold mb-4">마인드 포인트 프로그램</h1>
                <p className="text-lg text-gray-700">
                    그룹 코칭 기반 자기 성장 프로그램
                    <br />
                    3주 (주 2회, 총 6회)
                </p>
                <p className="mt-2 text-gray-600">대상: 20대~30대 초반 청년층</p>
            </div>

            {/* 회차별 프로그램 */}
            <div className="mb-12 overflow-x-auto">
                <h2 className="text-2xl font-bold mb-4">회차별 프로그램 구성</h2>
                <table className="w-full table-auto border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-3 py-2">주차</th>
                            <th className="border px-3 py-2">회차</th>
                            <th className="border px-3 py-2">주제</th>
                            <th className="border px-3 py-2">주요 활동</th>
                            <th className="border px-3 py-2">단계향상목표</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((s, idx) => (
                            <tr key={idx} className="even:bg-gray-50">
                                <td className="border px-3 py-2">{s.week}</td>
                                <td className="border px-3 py-2">{s.session}</td>
                                <td className="border px-3 py-2">{s.title}</td>
                                <td className="border px-3 py-2">{s.activity}</td>
                                <td className="border px-3 py-2">{s.goal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 활용 */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">활용</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>개인 코칭 / 그룹 코칭 모두 진행 가능 (2인 이상 권장)</li>
                    <li>개인 상담 도구 병행 가능 (에니어그램, 그림상담 도구 등)</li>
                    <li>노방 활동 없이 프로그램 활용 가능</li>
                    <li>미니 강의는 교사가 직접 진행하거나, 특강자 초청 가능</li>
                </ul>
            </div>

            {/* 후속 프로그램 */}
            <div>
                <h2 className="text-2xl font-bold mb-4">후속 프로그램 소개</h2>
                <p className="text-gray-700">자세한 후속 프로그램 내용은 내부 안내 자료를 참고하세요.</p>
            </div>
        </div>
    );
}
