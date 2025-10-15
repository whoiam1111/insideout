import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

function useScrollDirection(): ScrollDirection {
    const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            const direction: ScrollDirection = scrollY > lastScrollY ? 'down' : 'up';

            // 일정 스크롤 이상 움직였을 때만 방향 업데이트
            if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 10) {
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };

        window.addEventListener('scroll', updateScrollDirection);
        return () => {
            window.removeEventListener('scroll', updateScrollDirection);
        };
    }, [scrollDirection]); // scrollDirection이 변경될 때만 재실행

    return scrollDirection;
}

export default useScrollDirection;
