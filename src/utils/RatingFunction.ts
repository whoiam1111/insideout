export function convertRating(rating: number) {
	const result = [];

	for (let i = 0; i < 5; i++) {
		if (rating >= 1) {
			result.push(1);
			rating -= 1;
		} else if (rating > 0) {
			result.push(rating);
			rating = 0;
		} else {
			result.push(0);
		}
	}

	return result;
}
