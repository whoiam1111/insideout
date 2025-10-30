import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

export default function TemporaryPage() {
	return (
		<div className="flex flex-col items-center justify-center gap-4 text-gray-800 h-[calc(100vh-350px)]">
			<WrenchScrewdriverIcon className="size-32" />
			<div className="text-4xl md:text-5xl font-black">준비중입니다.</div>
		</div>
	);
}
