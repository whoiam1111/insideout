'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function SignupPage() {
    const { signUpWithProfile } = useAuth(); // 회원가입 + 프로필 저장
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [interests, setInterests] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('⏳ 처리 중... 잠시만 기다려주세요.');
        try {
            // 1️⃣ 회원가입 + 프로필 DB 저장 (자동 로그인 없음)
            await signUpWithProfile(email, password, fullName, gender, birthday, phone, interests);

            // 2️⃣ 안내 메시지
            setMessage('🎉 회원가입 완료! 이메일 인증 후 로그인해주세요.');

            // 3️⃣ 폼 초기화
            setEmail('');
            setPassword('');
            setFullName('');
            setGender('');
            setBirthday('');
            setPhone('');
            setInterests('');
        } catch (err: unknown) {
            if (err instanceof Error) setMessage(`❌ ${err.message}`);
            else setMessage('❌ 알 수 없는 오류가 발생했습니다.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">회원가입</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-2xl p-8 w-80 space-y-3"
            >
                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border w-full p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border w-full p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="이름"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border w-full p-2 rounded"
                />
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="border w-full p-2 rounded"
                >
                    <option value="">성별 선택</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                </select>
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="border w-full p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="전화번호"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border w-full p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="관심사"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="border w-full p-2 rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
                >
                    회원가입
                </button>
            </form>
            <p className="mt-4 text-gray-600">
                이미 계정이 있으신가요?{' '}
                <Link
                    href="/login"
                    className="text-indigo-500 hover:underline"
                >
                    로그인
                </Link>
            </p>
            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
        </div>
    );
}
