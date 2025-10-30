// app/(legal)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "이용약관 | 인사이드아웃",
	description: "인사이드아웃(Inside Out) 플랫폼 이용약관",
};

export default function LegalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-white">
			<main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-[260px_minmax(0,1fr)]">
				<aside className="order-2 md:order-1 md:sticky md:top-24 md:h-[calc(100dvh-8rem)] md:overflow-auto">
					<nav className="rounded-2xl border p-4">
						<h2 className="mb-3 text-sm font-semibold text-gray-700">
							목차
						</h2>
						<ul className="space-y-2 text-sm">
							{[
								["#purpose", "제1조 목적"],
								["#definitions", "제2조 정의"],
								["#effect", "제3조 효력 및 변경"],
								["#service", "제4조 서비스 제공"],
								["#intermediary", "제5조 중개 성격"],
								["#contract", "제6조 이용계약"],
								["#member-duty", "제7조 회원의 의무"],
								["#payment-refund", "제8조 결제 및 환불"],
								["#privacy", "제9조 개인정보 보호"],
								["#copyright", "제10조 저작권"],
								["#restriction", "제11조 이용제한 및 해지"],
								["#disclaimer", "제12조 면책"],
								["#law", "제13조 준거법 및 관할"],
							].map(([href, label]) => (
								<li key={href}>
									<a
										href={href}
										className="block rounded px-2 py-1 text-gray-700 hover:bg-gray-100"
									>
										{label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</aside>

				<section className="order-1 md:order-2">{children}</section>
			</main>
		</div>
	);
}
