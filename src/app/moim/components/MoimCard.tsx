import Link from 'next/link';

interface Moim {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export default function MoimCard({ moim }: { moim: Moim }) {
    return (
        <Link
            href={`/moim/${moim.id}`}
            className="block bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden"
        >
            <img src={moim.imageUrl} alt={moim.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{moim.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{moim.description}</p>
            </div>
        </Link>
    );
}
