import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-gray-50 text-gray-600 mt-8">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
				{/* 상단 섹션: 2그룹 */}
				<div className="grid grid-cols-2 gap-6 mb-6">
					{/* 인사이드아웃 정보 */}
					<div>
						<h4 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
							인사이드아웃
						</h4>
						<ul className="space-y-1 text-xs md:text-sm">
							<li>
								<Link
									href="/temporary"
									className="hover:text-indigo-600 transition"
								>
									공지사항
								</Link>
							</li>
							<li>
								<Link
									href="/temporary"
									className="hover:text-indigo-600 transition"
								>
									이벤트
								</Link>
							</li>
							<li>
								<Link
									href="/contact"
									className="hover:text-indigo-600 transition"
								>
									FAQ
								</Link>
							</li>
						</ul>
					</div>

					{/* 소셜 미디어 */}
					<div>
						<h4 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
							소셜 미디어
						</h4>
						<ul className="space-y-1 text-xs md:text-sm">
							<li>
								<Link
									href="/temporary"
									className="hover:text-indigo-600 transition"
								>
									인스타그램
								</Link>
							</li>
							<li>
								<Link
									href="/temporary"
									className="hover:text-indigo-600 transition"
								>
									페이스북
								</Link>
							</li>
							<li>
								<Link
									href="/temporary"
									className="hover:text-indigo-600 transition"
								>
									블로그
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* 하단 약관 */}
				<div className="border-t border-gray-300 pt-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-500">
					<div className="flex flex-wrap gap-3 justify-center sm:justify-start">
						<Link
							href="/terms"
							className="hover:text-indigo-600 transition"
						>
							이용약관
						</Link>
						<Link
							href="/privacy"
							className="hover:text-indigo-600 transition"
						>
							개인정보처리방침
						</Link>
					</div>
					<div className="text-center sm:text-right mt-1 sm:mt-0">
						© {new Date().getFullYear()} InsideOut
					</div>
				</div>
			</div>
		</footer>
	);
}
