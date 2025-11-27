import { StarIcon } from "@heroicons/react/24/solid";

interface RatingProps {
	rating: number;
	size: number;
}

export default function RatingStar({ rating, size }: RatingProps) {
	return (
		<div className={`relative size-5 sm:size-7`}>
			{/* Left half */}
			<StarIcon
				className={`absolute left-0 top-0 size-${size} text-amber-500`}
				style={{ clipPath: `inset(0 ${(1 - rating) * 100}% 0 0)` }} // left 50%
				// style={{ clipPath: `inset(0 100% 0 0)` }} // left 50%
			/>

			{/* Right half */}
			<StarIcon
				className={`absolute left-0 top-0 size-${size} text-neutral-100`}
				style={{ clipPath: `inset(0 0 0 ${rating * 100}%)` }} // right 50%
			/>
		</div>
	);
}
