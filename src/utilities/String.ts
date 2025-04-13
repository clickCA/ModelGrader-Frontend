export function convertToSnakeCase(text: string): string {
	if (!text) return text;

	const words = text.split(" ");
	const snakeCase = words.join("_").toLowerCase();
	return snakeCase;
}
