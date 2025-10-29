'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && (!user || !user.admin)) {
            // admin이 아니면 메인 페이지로 이동
            router.replace('/');
        }
    }, [user, loading, router]);

    if (loading || !user || !user.admin) {
        return <div>권한이 없습니다.</div>;
    }

    return <div className="space-y-8">관리자 전용 페이지</div>;
}
