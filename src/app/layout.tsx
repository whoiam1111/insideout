import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
    title: '내 안을 밖으로 | INSIDEOUT',
    description: '2030 모임 플랫폼',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
