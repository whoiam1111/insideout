'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useScrollDirection from '@/hooks/useScrollDirection';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const scrollDirection = useScrollDirection();
    const pathname = usePathname();

    const navLinks = [
        { href: '/about', label: '트레바리' },
        { href: '/clubs', label: '클럽' },
        { href: '/events', label: '이벤트' },
        { href: '/partners', label: '파트너십' },
        { href: '/recruit', label: '채용' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-transform duration-300
        ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}
        >
            <div className="container flex items-center justify-between py-4 lg:py-5">
                <Link
                    href="/"
                    className="text-2xl font-bold text-primary"
                >
                    Trevari Clone
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    <ul className="flex space-x-6">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`font-medium hover:text-primary transition-colors
                    ${pathname === link.href ? 'text-primary' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex space-x-3 ml-6">
                        <button className="px-4 py-2 border border-primary text-primary rounded-md text-sm font-medium hover:bg-primary hover:text-white transition-colors">
                            로그인
                        </button>
                        <button className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-orange-600 transition-colors">
                            회원가입
                        </button>
                    </div>
                </nav>

                {/* Mobile Burger Menu */}
                <button
                    className="lg:hidden text-3xl z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? '✕' : '☰'}
                </button>

                {/* Mobile Navigation Overlay */}
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-white flex flex-col items-center justify-center p-8 transition-transform duration-300 ease-in-out lg:hidden z-40
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <ul className="flex flex-col space-y-8 text-xl mb-10">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`font-medium hover:text-primary transition-colors
                    ${pathname === link.href ? 'text-primary' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-col space-y-4 w-full max-w-xs">
                        <button className="w-full px-6 py-3 border border-primary text-primary rounded-md text-lg font-medium hover:bg-primary hover:text-white transition-colors">
                            로그인
                        </button>
                        <button className="w-full px-6 py-3 bg-primary text-white rounded-md text-lg font-medium hover:bg-orange-600 transition-colors">
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
