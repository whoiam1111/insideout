'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { HomeIcon, ClipboardDocumentListIcon, PhotoIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { supabase } from '@/app/lib/supabase';
import LoadingSpinner from '../components/LoadingSpinner';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function checkAdmin() {
            try {
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();
                if (userError || !user) throw new Error('사용자 정보를 가져올 수 없습니다.');

                const { data: userRecord, error: dbError } = await supabase
                    .from('users')
                    .select('admin')
                    .eq('id', user.id)
                    .single();

                if (dbError || !userRecord || !userRecord.admin) {
                    router.replace('/');
                } else {
                    setIsAdmin(true);
                }
            } catch (err) {
                console.error(err);
                router.replace('/');
            } finally {
                setLoading(false);
            }
        }

        checkAdmin();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner text="관리자 인증 중..." />
            </div>
        );
    }

    if (!isAdmin) return null; // 인증 안되면 렌더링 금지

    const menuItems = [
        { href: '/admin', label: '대시보드', icon: HomeIcon },
        { href: '/admin/add-program', label: '프로그램 관리', icon: ClipboardDocumentListIcon },
        { href: '/admin/banners', label: '배너 관리', icon: PhotoIcon },
        { href: '/admin/icon-grid', label: '메뉴 관리', icon: Squares2X2Icon },
        { href: '/admin/faq', label: '자주묻는질문 관리', icon: Squares2X2Icon },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            {/* 좌측 메뉴 */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="h-16 flex items-center justify-center border-b font-bold text-lg text-indigo-600">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* 메인 컨텐츠 */}
            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
    );
}
