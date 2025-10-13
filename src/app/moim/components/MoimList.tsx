import MoimCard from './MoimCard';

interface Moim {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export default function MoimList({ moims }: { moims: Moim[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {moims.map((m) => (
                <MoimCard key={m.id} moim={m} />
            ))}
        </div>
    );
}
