'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function SignupPage() {
    const { signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            setMessage('🎉 회원가입 성공! 이메일을 확인하세요.');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setMessage(`❌ ${err.message}`);
            } else {
                setMessage('❌ 알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">회원가입</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-8 w-80">
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border w-full p-2 rounded mb-3"
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border w-full p-2 rounded mb-4"
                    required
                />
                <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
                    회원가입
                </button>
            </form>
            <p className="mt-4 text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link href="/login" className="text-indigo-500 hover:underline">
                    로그인
                </Link>
            </p>
            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </div>
    );
}
