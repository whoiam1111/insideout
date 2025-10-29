'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function LoginPage() {
    const { user, signIn, signOut } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            setMessage('✅ 로그인 성공!');
        } catch (err: unknown) {
            if (err instanceof Error) setMessage(`❌ ${err.message}`);
            else setMessage('❌ 알 수 없는 오류가 발생했습니다.');
        }
    };

    if (user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">안녕하세요, {user.email}</h1>
                <button
                    onClick={signOut}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                    로그아웃
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">로그인</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-2xl p-8 w-80"
            >
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
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
                >
                    로그인
                </button>
            </form>
            <p className="mt-4 text-gray-600">
                계정이 없으신가요?{' '}
                <Link
                    href="/signup"
                    className="text-indigo-500 hover:underline"
                >
                    회원가입
                </Link>
            </p>
            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </div>
    );
}
