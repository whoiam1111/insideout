'use client';
import { useState, useEffect } from 'react';

interface CategoryItem {
    id: number;
    order_no: number;
    icon?: string | null;
    text: string;
    link: string;
    image?: string | null;
}

export default function IconGridManager() {
    const [items, setItems] = useState<CategoryItem[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null); // 수정용
    const [form, setForm] = useState<Omit<CategoryItem, 'id'>>({
        order_no: 1,
        icon: '',
        text: '',
        link: '',
        image: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/icon_grid');
            const data = await res.json();
            const sorted = Array.isArray(data) ? data.sort((a, b) => a.order_no - b.order_no) : [];
            setItems(sorted);
        } catch (err) {
            console.error(err);
            setItems([]);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            let imageUrl: string | null = null;
            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || '이미지 업로드 실패');
                imageUrl = data.url;
            }

            const payload: Omit<CategoryItem, 'id'> = {
                ...form,
                image: imageUrl ?? form.image ?? null,
            };

            let res;
            if (editingId) {
                // 수정
                res = await fetch(`/api/icon_grid/${editingId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            } else {
                // 새로 등록
                res = await fetch('/api/icon_grid', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
            }

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || '등록/수정 실패');

            setMessage(editingId ? '✅ 카테고리가 수정되었습니다!' : '✅ 카테고리가 추가되었습니다!');
            setForm({ order_no: 1, icon: '', text: '', link: '', image: '' });
            setFile(null);
            setPreview(null);
            setEditingId(null);
            fetchCategories();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : '알 수 없는 오류';
            setMessage(`⚠️ ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item: CategoryItem) => {
        setEditingId(item.id);
        setForm({
            order_no: item.order_no,
            icon: item.icon ?? '',
            text: item.text,
            link: item.link,
            image: item.image ?? '',
        });
        setPreview(item.image ?? null);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await fetch(`/api/icon_grid/${id}`, { method: 'DELETE' });
        fetchCategories();
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold mb-8">🎨 카테고리 관리</h1>

            {message && (
                <p
                    className={`mb-4 p-3 rounded-lg ${
                        message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                >
                    {message}
                </p>
            )}

            {/* 폼 */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm space-y-4 mb-10">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 font-medium">순서 (1~9)</label>
                        <input
                            type="number"
                            value={form.order_no}
                            onChange={(e) => setForm({ ...form, order_no: Number(e.target.value) })}
                            min={1}
                            max={9}
                            className="w-full border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">아이콘 (이모지)</label>
                        <input
                            type="text"
                            value={form.icon || ''}
                            onChange={(e) => setForm({ ...form, icon: e.target.value })}
                            placeholder="예: 📣"
                            className="w-full border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">텍스트</label>
                        <input
                            type="text"
                            value={form.text}
                            onChange={(e) => setForm({ ...form, text: e.target.value })}
                            placeholder="예: 오픈 임박!"
                            className="w-full border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">링크 URL</label>
                        <input
                            type="text"
                            value={form.link}
                            onChange={(e) => setForm({ ...form, link: e.target.value })}
                            placeholder="예: /detail"
                            className="w-full border-gray-300 rounded-md px-3 py-2"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-1 font-medium">이미지 (선택)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500"
                    />
                    {preview && (
                        <img src={preview} alt="미리보기" className="w-32 h-32 mt-3 object-cover rounded-lg border" />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                    {loading
                        ? editingId
                            ? '수정 중...'
                            : '등록 중...'
                        : editingId
                        ? '카테고리 수정'
                        : '카테고리 추가'}
                </button>
            </form>

            {/* 미리보기 */}
            <div className="flex flex-wrap gap-4 mb-6">
                {items.map((item) => (
                    <div key={item.id} className="flex flex-col items-center w-20">
                        {item.image ? (
                            <img src={item.image} alt={item.text} className="w-16 h-16 rounded-md" />
                        ) : (
                            <span className="text-3xl">{item.icon}</span>
                        )}
                        <span className="text-sm mt-1">{item.text}</span>
                        <div className="flex flex-col gap-1 mt-1">
                            <button onClick={() => handleEdit(item)} className="text-xs text-blue-500 hover:underline">
                                수정
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-xs text-red-500 hover:underline"
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 10번째 더보기 */}
            <div className="flex flex-wrap gap-4">
                <div className="flex flex-col items-center w-20">
                    <img src="/arrow-down-circle.png" alt="더보기" className="w-16 h-16 rounded-md" />
                    <span className="text-sm mt-1">더보기</span>
                </div>
            </div>
        </div>
    );
}
