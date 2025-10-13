async function getMoimDetail(id: string) {
    return {
        id,
        title: `모임 ${id}`,
        description: '이 모임은 함께 성장하고 대화하는 청년 모임입니다.',
        content:
            '이곳은 당신의 내면을 탐색하고, 자신을 표현할 수 있는 안전한 공간입니다. 다양한 청년들과 함께 대화하며 나를 확장해보세요.',
        imageUrl: 'https://placekitten.com/600/400',
    };
}

export default async function MoimDetailPage({ params }: { params: { id: string } }) {
    const moim = await getMoimDetail(params.id);

    return (
        <article className="py-8">
            <img src={moim.imageUrl} alt={moim.title} className="w-full h-80 object-cover rounded-lg mb-8" />
            <h1 className="text-3xl font-bold mb-4">{moim.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{moim.description}</p>
            <div className="text-gray-600 leading-relaxed">{moim.content}</div>
        </article>
    );
}
