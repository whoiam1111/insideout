// app/(legal)/privacy/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "개인정보처리방침 | 인사이드아웃",
	description: "인사이드아웃(Inside Out) 개인정보처리방침",
};

export default function PrivacyLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const toc: Array<{ href: string; label: string }> = [
		{ href: "#collect", label: "제1조 수집 항목" },
		{ href: "#purpose", label: "제2조 이용 목적" },
		{ href: "#retention", label: "제3조 보유·이용기간" },
		{ href: "#third-party", label: "제4조 제3자 제공" },
		{ href: "#outsourcing", label: "제5조 처리위탁" },
		{ href: "#destruction", label: "제6조 파기절차·방법" },
		{ href: "#rights", label: "제7조 이용자 권리" },
		{ href: "#security", label: "제8조 안전성 확보조치" },
		{ href: "#cookies", label: "제9조 쿠키 운영" },
		{ href: "#dpo", label: "제10조 보호책임자" },
		{ href: "#changes", label: "제11조 방침변경" },
	];

	return (
		<div className="min-h-screen bg-white">
			<main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 md:grid-cols-[260px_minmax(0,1fr)]">
				<aside className="order-2 md:order-1 md:sticky md:top-24 md:h-[calc(100dvh-8rem)] md:overflow-auto">
					<nav className="rounded-2xl border p-4">
						<h2 className="mb-3 text-sm font-semibold text-gray-700">
							목차
						</h2>
						<ul className="space-y-2 text-sm">
							{toc.map((item) => (
								<li key={item.href}>
									<a
										href={item.href}
										className="block rounded px-2 py-1 text-gray-700 hover:bg-gray-100"
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
						<div className="mt-4 border-t pt-4 text-xs text-gray-500">
							<a
								href="/(legal)/terms"
								className="underline underline-offset-2"
							>
								이용약관 보기
							</a>
						</div>
					</nav>
				</aside>
				<section className="order-1 md:order-2">{children}</section>
			</main>
		</div>
	);
}
