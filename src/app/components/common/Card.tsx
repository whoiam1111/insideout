// src/components/common/Card.tsx
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string; // className은 선택 사항으로 유지
}

const Card = ({ children, className, ...props }: CardProps) => {
    // Tailwind CSS 클래스를 직접 결합
    const baseClasses = 'bg-white rounded-lg shadow-md transition-transform duration-200 hover:translate-y-[-5px]';

    return (
        <div
            className={`${baseClasses} ${className || ''}`} // className이 없을 경우 빈 문자열로 처리
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
