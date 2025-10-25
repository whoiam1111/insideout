'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BannerItem {
    id: number;
    title: string;
    link: string;
    image?: string | null;
    order_no: number;
}

export default function BannerManager() {
    const [banners, setBanners] = useState<BannerItem[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [form, setForm] = useState<Omit<BannerItem, 'id'>>({
        title: '',
        link: '',
        image: '',
        order_no: 1,
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const carouselRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const res = await fetch('/api/banners');
            const data = await res.json();
            setBanners(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
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
            let imageUrl = form.image || null;

            if (file) {
                const formData = new FormData();
                formData.append('file', file);
                // 업로드할 버킷 지정
                formData.append('bucket', 'banners'); // 필요에 따라 'icons' 등으로 변경 가능

                const res = await fetch('/api/upload', { method: 'POST', body: formData });
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || '업로드 실패');
                imageUrl = data.url;
            }

            const res = await fetch('/api/banners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, image: imageUrl }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || '등록 실패');

            setForm({ title: '', link: '', image: '', order_no: 1 });
            setFile(null);
            setPreview(null);
            fetchBanners();
            setMessage('✅ 배너 추가 완료');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setMessage(`⚠️ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await fetch(`/api/banners/${id}`, { method: 'DELETE' });
        fetchBanners();
    };

    const scrollLeft = () => carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    const scrollRight = () => carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });

    return (
        <div className="max-w-5xl mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold mb-8">🖼️ 메인 배너 관리</h1>

            {message && (
                <p
                    className={`mb-4 p-3 rounded-lg ${
                        message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                >
                    {message}
                </p>
            )}

            {/* 배너 등록 폼 */}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4 mb-10">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="배너 제목"
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="text"
                        value={form.link}
                        onChange={(e) => setForm({ ...form, link: e.target.value })}
                        placeholder="링크 URL"
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="number"
                        value={form.order_no}
                        onChange={(e) => setForm({ ...form, order_no: Number(e.target.value) })}
                        placeholder="순서"
                        className="border px-3 py-2 rounded"
                        min={1}
                    />
                </div>

                <input type="file" accept="image/*" onChange={handleFileChange} />
                {preview && <img src={preview} alt="미리보기" className="w-full h-40 object-cover mt-2 rounded" />}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? '등록중...' : '배너 추가'}
                </button>
            </form>

            {/* 배너 슬라이드 미리보기 */}
            <div className="relative">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                >
                    ◀
                </button>
                <div ref={carouselRef} className="flex space-x-4 overflow-x-auto scrollbar-hide py-2">
                    {banners
                        .sort((a, b) => a.order_no - b.order_no)
                        .map((banner) => (
                            <motion.div
                                key={banner.id}
                                className="min-w-[400px] flex-shrink-0 relative rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                                whileHover={{ scale: 1.03 }}
                            >
                                {banner.image && (
                                    <img src={banner.image} alt={banner.title} className="w-full h-40 object-cover" />
                                )}
                                <div className="absolute bottom-2 left-2 text-white font-bold bg-black/50 px-2 py-1 rounded">
                                    {banner.title}
                                </div>
                                <button
                                    onClick={() => handleDelete(banner.id)}
                                    className="absolute top-2 right-2 text-red-500 bg-white/70 px-2 rounded hover:bg-white"
                                >
                                    삭제
                                </button>
                            </motion.div>
                        ))}
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow hover:bg-gray-100"
                >
                    ▶
                </button>
            </div>
        </div>
    );
}
