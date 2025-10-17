/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://insideout.io.kr', // 본인 사이트 도메인
    generateRobotsTxt: true, // robots.txt 자동 생성
    sitemapSize: 5000, // URL 수가 많으면 분할 가능
    changefreq: 'daily', // 검색 엔진이 갱신 빈도를 파악
    priority: 0.7, // 기본 우선순위
    exclude: ['/auth/*'], // 사이트맵에서 제외할 경로
};
