"use client";
import { useState } from "react";

export default function ContactPage() {
	const [activeTab, setActiveTab] = useState<"faq" | "partner">("faq");

	return (
		<main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
			{/* 탭 메뉴 */}
			<div className="flex justify-center gap-4 border-b border-gray-200 mb-8 md:mb-10">
				<button
					className={`px-6 py-2 font-semibold cursor-pointer ${
						activeTab === "faq"
							? "border-b-4 border-indigo-600 text-indigo-600"
							: "text-gray-500 hover:text-gray-700"
					} transition`}
					onClick={() => setActiveTab("faq")}
				>
					자주 묻는 질문
				</button>
				<button
					className={`px-6 py-2 font-semibold cursor-pointer ${
						activeTab === "partner"
							? "border-b-4 border-indigo-600 text-indigo-600"
							: "text-gray-500 hover:text-gray-700"
					} transition`}
					onClick={() => setActiveTab("partner")}
				>
					파트너 지원 하기
				</button>
			</div>

			{/* 탭 컨텐츠 */}
			{activeTab === "faq" && <FAQSection />}
			{activeTab === "partner" && <PartnerSection />}
		</main>
	);
}

// 자주 묻는 질문 섹션
function FAQSection() {
	const faqs = [
		{
			question: "인사이드아웃 멤버십은 무엇인가요?",
			answer: "인사이드아웃 멤버십은 청년들을 위한 커뮤니티 참여와 성장 프로그램 혜택을 제공하는 멤버십입니다.",
		},
		{
			question: "프로그램 참가 비용은 얼마인가요?",
			answer: "각 프로그램마다 다르지만, 멤버십 가입 시 일부 할인 혜택이 제공됩니다.",
		},
		{
			question: "온라인 모임과 오프라인 모임의 차이는 무엇인가요?",
			answer: "온라인 모임은 주로 토론 및 강연 참여 중심이고, 오프라인 모임은 워크숍, 네트워킹, 실습 경험을 제공합니다.",
		},
	];

	return (
		<section className="space-y-6">
			{faqs.map((faq, i) => (
				<div
					key={i}
					className="border rounded-lg p-6 shadow-sm hover:shadow-md transition"
				>
					<h3 className="font-semibold text-lg text-gray-800">
						{faq.question}
					</h3>
					<p className="text-gray-600 mt-2">{faq.answer}</p>
				</div>
			))}
		</section>
	);
}

// 파트너 지원 섹션
function PartnerSection() {
	return (
		<section className="space-y-6 max-w-4xl mx-auto">
			<p className="text-gray-600 text-center">
				인사이드아웃과 함께할 파트너를 모집합니다. 아래 정보를 작성하여
				지원해 주세요.
			</p>
			<form className="space-y-4">
				<div className="flex flex-col">
					<label className="text-gray-700 font-medium mb-1">
						이름
					</label>
					<input
						type="text"
						className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						placeholder="이름을 입력하세요"
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-gray-700 font-medium mb-1">
						이메일
					</label>
					<input
						type="email"
						className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						placeholder="이메일을 입력하세요"
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-gray-700 font-medium mb-1">
						지원 내용
					</label>
					<textarea
						className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						placeholder="파트너 지원 내용을 작성해주세요"
						rows={5}
					/>
				</div>
				<button
					type="submit"
					className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
				>
					지원하기
				</button>
			</form>
		</section>
	);
}
