'use client';
import { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabase';
import LoadingSpinner from '../components/LoadingSpinner';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    order_no: number;
}

export default function ContactPage() {
    const [activeTab, setActiveTab] = useState<'faq' | 'partner'>('faq');

    return (
        <main className="min-h-screen flex flex-col justify-start max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12 overflow-y-auto">
            <div className="flex justify-center gap-4 border-b border-gray-200 mb-8 md:mb-10">
                <button
                    className={`px-6 py-2 font-semibold cursor-pointer ${
                        activeTab === 'faq'
                            ? 'border-b-4 border-indigo-600 text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                    } transition`}
                    onClick={() => setActiveTab('faq')}
                >
                    자주 묻는 질문
                </button>
                <button
                    className={`px-6 py-2 font-semibold cursor-pointer ${
                        activeTab === 'partner'
                            ? 'border-b-4 border-indigo-600 text-indigo-600'
                            : 'text-gray-500 hover:text-gray-700'
                    } transition`}
                    onClick={() => setActiveTab('partner')}
                >
                    파트너 지원 하기
                </button>
            </div>

            <div className="flex-1">
                {activeTab === 'faq' && <FAQSection />}
                {activeTab === 'partner' && <PartnerSection />}
            </div>
        </main>
    );
}

// ✅ FAQ 아코디언 (API GET만)
function FAQSection() {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('faqs').select('*');
        if (data) setFaqs(data);
        setLoading(false);
    };

    const toggleAccordion = (index: number) => setOpenIndex(openIndex === index ? null : index);
    if (loading) return <LoadingSpinner text="FAQ 불러오는 중..." />;
    return (
        <section className="space-y-4">
            {faqs.map((faq, i) => (
                <div
                    key={faq.id}
                    className="border rounded-lg p-4 shadow-sm transition hover:shadow-md"
                >
                    <button
                        onClick={() => toggleAccordion(i)}
                        className="w-full flex justify-between items-center text-left"
                    >
                        <h3 className="font-semibold text-lg text-gray-800">{faq.question}</h3>
                        {openIndex === i ? (
                            <ChevronUpIcon className="w-6 h-6 text-indigo-600" />
                        ) : (
                            <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                        )}
                    </button>
                    <div
                        className={`overflow-hidden transition-all duration-300 ${
                            openIndex === i ? 'max-h-40 mt-3' : 'max-h-0'
                        }`}
                    >
                        <p className="text-gray-600 whitespace-pre-line">{faq.answer}</p>
                    </div>
                </div>
            ))}
        </section>
    );
}

// ✅ 파트너 지원 폼 (보기용)
function PartnerSection() {
    return (
        <section className="space-y-6 max-w-4xl mx-auto">
            <p className="text-gray-600 text-center">
                인사이드아웃과 함께할 파트너를 모집합니다. 아래 정보를 작성하여 지원해 주세요.
            </p>
            <form className="space-y-4">
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">이름</label>
                    <input
                        type="text"
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="이름을 입력하세요"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">이메일</label>
                    <input
                        type="email"
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="이메일을 입력하세요"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-gray-700 font-medium mb-1">지원 내용</label>
                    <textarea
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        placeholder="파트너 지원 내용을 작성해주세요"
                        rows={5}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                    지원하기
                </button>
            </form>
        </section>
    );
}
