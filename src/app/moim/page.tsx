import MoimFilter from './components/MoimFilter';
import MoimList from './components/MoimList';

async function getMoims() {
    return [
        {
            id: '1',
            title: '감정 탐색 워크숍',
            description: '내 안의 감정을 이해하고 표현하는 워크숍',
            imageUrl: 'https://placekitten.com/400/300',
        },
        {
            id: '2',
            title: '가치 발견 세션',
            description: '나의 삶의 방향과 가치관을 함께 나누어요.',
            imageUrl: 'https://placekitten.com/401/300',
        },
        {
            id: '3',
            title: '인연 여행 모임',
            description: '함께 떠나는 감정 리프레시 여행 프로그램',
            imageUrl: 'https://placekitten.com/402/300',
        },
    ];
}

export default async function MoimPage() {
    const moims = await getMoims();

    return (
        <section className="py-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">추천 모임</h1>
            <MoimFilter />
            <MoimList moims={moims} />
        </section>
    );
}
