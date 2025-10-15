import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-dark text-white py-10 text-sm">
            <div className="container flex flex-wrap justify-between gap-8 md:gap-12 lg:gap-20">
                <div className="w-full md:w-auto md:flex-1 min-w-[200px]">
                    <h3 className="text-xl font-bold text-primary mb-4">Trevari Clone</h3>
                    <p className="leading-relaxed mb-4">함께 읽고, 함께 대화하며, 함께 성장하는 커뮤니티</p>
                    <div className="flex space-x-3">
                        <a
                            href="https://www.facebook.com/trevari.co.kr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 rounded-full hover:bg-primary transition-colors"
                        >
                            F
                        </a>
                        <a
                            href="https://www.instagram.com/trevari_official/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 rounded-full hover:bg-primary transition-colors"
                        >
                            I
                        </a>
                        <a
                            href="https://blog.naver.com/trevari_official"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 rounded-full hover:bg-primary transition-colors"
                        >
                            B
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-auto min-w-[120px]">
                    <h3 className="text-base font-bold text-primary mb-4">바로가기</h3>
                    <ul>
                        <li className="mb-2">
                            <Link
                                href="/about"
                                className="hover:text-primary transition-colors"
                            >
                                트레바리
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="/clubs"
                                className="hover:text-primary transition-colors"
                            >
                                클럽
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="/events"
                                className="hover:text-primary transition-colors"
                            >
                                이벤트
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="/partners"
                                className="hover:text-primary transition-colors"
                            >
                                파트너십
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                href="/recruit"
                                className="hover:text-primary transition-colors"
                            >
                                채용
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="w-full md:w-auto min-w-[200px]">
                    <h3 className="text-base font-bold text-primary mb-4">문의</h3>
                    <p className="mb-2">support@trevari-clone.com</p>
                    <p className="mb-2">대표: 홍길동</p>
                    <p>서울시 강남구 테헤란로 123 (가상)</p>
                </div>
            </div>
            <div className="text-center mt-10 pt-6 border-t border-gray-700">
                <p>&copy; {new Date().getFullYear()} Trevari Clone. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
