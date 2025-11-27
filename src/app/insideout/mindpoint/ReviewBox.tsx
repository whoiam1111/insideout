"use client";

import React, { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { StarIcon, UserIcon } from "@heroicons/react/24/solid";
import { convertRating } from "@/utils/RatingFunction";

interface ReviewProps {
	id: number;
	name: string;
	rating: number;
	comment: string;
	date: string;
}

const ReviewCard = ({ review }: { review: ReviewProps }) => {
	return (
		<div className="h-full w-full p-2">
			<div
				className="flex h-full flex-col justify-between rounded-xl border border-gray-200 
            bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
			>
				<div className="mb-3">
					<div className="mb-2 flex items-center justify-between">
						<div className="flex items-center gap-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500">
								<UserIcon className="h-4 w-4" />
							</div>
							<div>
								<p className="text-sm font-bold text-gray-900">
									{review.name}
								</p>
								<p className="text-xs text-gray-400">
									{review.date}
								</p>
							</div>
						</div>
					</div>
					<div className="flex gap-2 items-center text-yellow-400">
						<div className="flex">
							{convertRating(review.rating).map((_, i) => (
								<StarIcon
									key={i}
									className={`h-4 w-4 ${
										i < review.rating
											? "text-yellow-400"
											: "text-neutral-100"
									}`}
								/>
							))}
						</div>
						<div className="text-neutral-800 text-sm">
							{review.rating}
						</div>
					</div>
				</div>
				<p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">
					{review.comment}
				</p>
				<div className="mt-auto pt-3 border-t border-gray-100">
					<span className="text-xs font-medium text-indigo-500">
						프로그램 수료
					</span>
				</div>
			</div>
		</div>
	);
};

export default function ReviewCarousel({
	reviews,
}: {
	reviews: ReviewProps[];
}) {
	// 스크롤 컨테이너를 제어하기 위한 Ref
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	// 스크롤 핸들러 함수
	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const { current } = scrollContainerRef;
			// 현재 컨테이너의 너비만큼 이동 (한 화면에 4개가 보이므로 4개 세트씩 이동됨)
			const scrollAmount = current.clientWidth;

			current.scrollBy({
				left: direction === "left" ? -scrollAmount : scrollAmount,
				behavior: "smooth", // 부드러운 이동
			});
		}
	};

	return (
		<section className="w-full py-10">
			<div className="mx-auto max-w-4xl px-4">
				{/* <h2 className="mb-6 text-2xl font-bold text-gray-900">
					생생한 수강 후기
				</h2> */}

				{/* Carousel Wrapper */}
				<div className="relative group">
					{/* 왼쪽 화살표 버튼 (absolute positioning) */}
					<button
						onClick={() => scroll("left")}
						className="absolute left-2 sm:left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 rounded-full 
                        bg-white p-2 shadow-lg hover:bg-gray-50 focus:outline-none md:-translate-x-4"
						aria-label="Previous reviews"
					>
						<ChevronLeftIcon className="size-4 sm:size-6 text-gray-600" />
					</button>

					{/* 스크롤 영역 */}
					{/* scrollbar-hide 클래스 적용 필요 (아래 설명 참조) */}
					<div
						ref={scrollContainerRef}
						className="flex w-full overflow-x-auto scroll-smooth pb-4 scrollbar-hide"
					>
						{reviews.map((review) => (
							<div
								key={review.id}
								className="flex-none w-1/2 sm:w-1/4"
							>
								<ReviewCard review={review} />
							</div>
						))}
					</div>

					{/* 오른쪽 화살표 버튼 */}
					<button
						onClick={() => scroll("right")}
						className="absolute right-2 sm:right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50 focus:outline-none md:translate-x-4"
						aria-label="Next reviews"
					>
						<ChevronRightIcon className="size-4 sm:size-6 text-gray-600" />
					</button>
				</div>
			</div>
		</section>
	);
}
