import { useCallback, useRef } from "react";

export function useGridNavigation(items: (string | number)[], columns: number) {
	const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent, index: number) => {
			const key = e.key.toLowerCase();
			let nextIndex = index;

			switch (key) {
				case "arrowright":
				case "d":
					nextIndex = index + 1;
					break;
				case "arrowleft":
				case "a":
					nextIndex = index - 1;
					break;
				case "arrowup":
				case "w":
					nextIndex = index - columns;
					break;
				case "arrowdown":
				case "s":
					nextIndex = index + columns;
					break;
				default:
					return;
			}

			// Ensure we stay within bounds
			if (nextIndex >= 0 && nextIndex < items.length) {
				e.preventDefault();
				buttonRefs.current[nextIndex]?.focus();
			}
		},
		[columns, items.length]
	);

	return {
		buttonRefs,
		handleKeyDown,
	};
}
