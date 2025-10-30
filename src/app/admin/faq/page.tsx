'use client';

import { useState, useEffect } from 'react';
import { PlusCircleIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    order_no: number;
}

export default function FaqManager() {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [form, setForm] = useState<Omit<FAQItem, 'id'>>({
        question: '',
        answer: '',
        order_no: 1,
    });
    const [editId, setEditId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        try {
            const res = await fetch('/api/faqs');
            const data = await res.json();
            setFaqs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const method = editId ? 'PUT' : 'POST';
            const url = editId ? `/api/faqs/${editId}` : '/api/faqs';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || '처리 실패');

            setForm({ question: '', answer: '', order_no: 1 });
            setEditId(null);
            fetchFaqs();
            setMessage(editId ? '✅ 수정 완료' : '✅ 등록 완료');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setMessage(`⚠️ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (faq: FAQItem) => {
        setForm({ question: faq.question, answer: faq.answer, order_no: faq.order_no });
        setEditId(faq.id);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return;
        await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
        fetchFaqs();
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-6 min-h-screen flex flex-col">
            <h1 className="text-3xl font-bold mb-8">💬 자주 묻는 질문 관리</h1>

            {message && (
                <p
                    className={`mb-4 p-3 rounded-lg ${
                        message.startsWith('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                >
                    {message}
                </p>
            )}

            {/* 등록/수정 폼 */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow space-y-4 mb-10"
            >
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        value={form.question}
                        onChange={(e) => setForm({ ...form, question: e.target.value })}
                        placeholder="질문"
                        className="border px-3 py-2 rounded"
                    />
                    <textarea
                        value={form.answer}
                        onChange={(e) => setForm({ ...form, answer: e.target.value })}
                        placeholder="답변"
                        rows={4}
                        className="border px-3 py-2 rounded"
                    />
                    <input
                        type="number"
                        value={form.order_no}
                        onChange={(e) => setForm({ ...form, order_no: Number(e.target.value) })}
                        placeholder="순서"
                        className="border px-3 py-2 rounded w-32"
                        min={1}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    <PlusCircleIcon className="w-5 h-5" />
                    {editId ? '수정 완료' : 'FAQ 추가'}
                </button>
            </form>

            {/* FAQ 목록 */}
            <div className="space-y-4 flex-1 overflow-y-auto">
                {faqs
                    .sort((a, b) => a.order_no - b.order_no)
                    .map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-white border rounded-lg shadow-sm hover:shadow-md transition p-5 flex justify-between items-start"
                        >
                            <div>
                                <h3 className="font-semibold text-lg">{faq.question}</h3>
                                <p className="text-gray-600 mt-2 whitespace-pre-line">{faq.answer}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleEdit(faq)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(faq.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
