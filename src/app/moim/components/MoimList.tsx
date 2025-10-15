'use client';

interface Moim {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category?: string;
}

interface MoimListProps {
    moims?: Moim[];
}

export default function MoimList({ moims }: MoimListProps) {
    if (!moims || moims.length === 0) {
        return <p>모임이 없습니다.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {moims.map((moim) => {
                // 마인드 포인트만 별도 라우팅
                const href = moim.title === '마인드 포인트' ? '/moim/mindpoint' : `/moim/${moim.id}`;

                return (
                    <a
                        key={moim.id}
                        href={href}
                        className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                    >
                        {moim.imageUrl && (
                            <img src={moim.imageUrl} alt={moim.title} className="w-full h-40 object-cover" />
                        )}
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{moim.title}</h3>
                            <p className="text-gray-600 text-sm">{moim.description}</p>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
