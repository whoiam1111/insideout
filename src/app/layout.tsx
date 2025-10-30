import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
	title: "내 안을 밖으로 | INSIDEOUT",
	description: "2030 모임 플랫폼",
	icons: {
		icon: [{ url: "/favicon.png", type: "image/png" }],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko">
			<body className="min-h-screen">
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
