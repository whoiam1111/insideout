'use client';

interface Program {
    id: string;
    title: string;
    subtitle?: string | null;
    imageUrl: string;
    category?: string | null;
    tags?: string[] | null;
    price?: number | null;
}
interface ProgramListProps {
    moims?: Program[];
}

export default function ProgramList({ moims }: ProgramListProps) {
    if (!moims || moims.length === 0) {
        return <p className="text-center text-gray-500 mt-8">모임이 없습니다.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {moims.map((program) => {
                const href = program.title === '마인드 포인트' ? '/moim/mindpoint' : `/moim/${program.id}`;

                return (
                    <a
                        key={program.id}
                        href={href}
                        className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
                    >
                        {/* 이미지 영역 */}
                        <div className="relative w-full h-64 md:h-72 overflow-hidden">
                            <img
                                src={program.imageUrl}
                                alt={program.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* 태그 오버레이 */}
                            {program.tags && program.tags.length > 0 && (
                                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                                    {program.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 텍스트 영역 */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{program.title}</h3>

                            {program.subtitle && (
                                <p className="text-gray-600 text-sm line-clamp-3 mb-3">{program.subtitle}</p>
                            )}

                            {/* 가격 */}
                            {/* {program.price !== undefined && program.price !== null && (
                                <p className="text-indigo-700 font-semibold text-sm">
                                    가격: {program.price.toLocaleString()}원
                                </p>
                            )} */}
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
