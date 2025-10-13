'use client';
import { useState, useEffect } from 'react';

// 프로그램 타입 정의
interface Program {
    id: number;
    title: string;
    subtitle: string;
    image?: string;
    link?: string;
    created_at?: string;
    updated_at?: string;
}

export default function AddProgramPage() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [image, setImage] = useState('');
    const [link, setLink] = useState('');
    const [programs, setPrograms] = useState<Program[]>([]); // any 대신 Program[]
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPrograms = async () => {
        const res = await fetch('/api/programs');
        const data: Program[] = await res.json(); // 타입 지정
        setPrograms(data);
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const res = await fetch('/api/programs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, subtitle, image, link }),
        });
        if (!res.ok) throw new Error('추가 실패');
        setMessage(`✅ "${title}" 모임 추가됨`);
        setTitle('');
        setSubtitle('');
        setImage('');
        setLink('');
        fetchPrograms();
    };

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">➕ 새 모임 관리</h1>

            {message && (
                <p className={`mb-4 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <input
                    type="text"
                    placeholder="모임 이름"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="설명"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="이미지 URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                />
                <input
                    type="text"
                    placeholder="링크"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full border px-3 py-2 rounded-lg"
                />
                <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg">
                    {loading ? '추가 중...' : '모임 추가'}
                </button>
            </form>

            <h2 className="text-2xl font-bold mb-4">등록된 모임</h2>
            <ul className="space-y-2">
                {programs.map((p) => (
                    <li key={p.id} className="p-3 border rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{p.title}</p>
                            <p className="text-sm text-gray-600">{p.subtitle}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
