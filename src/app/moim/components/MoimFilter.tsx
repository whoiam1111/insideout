'use client';

import { useState } from 'react';

const categories = ['전체', '자기계발', '문화예술', '여행', '대화', '운동'];

export default function MoimFilter() {
    const [selected, setSelected] = useState('전체');

    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setSelected(cat)}
                    className={`px-4 py-2 rounded-full text-sm border transition ${
                        selected === cat
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
}
