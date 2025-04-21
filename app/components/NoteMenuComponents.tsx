import React from "react";
import { cn } from "@/lib/utils";
import { TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export type NoteField = "duration" | "pitch" | "phoneme1" | "phoneme2";
export type NoteValue = number | string;

export interface Note {
	id: string;
	duration: number;
	pitch: number;
	phoneme1: string;
	phoneme2: string;
}

// Shared data constants
export const durations = [1, 2, 4, 8, 16];
export const pitches = Array.from({ length: 16 }, (_, i) => i);
export const vowelPhonemes = ["a", "e", "i", "o", "u"];
export const consonantPhonemes = [
	"b",
	"d",
	"f",
	"g",
	"h",
	"k",
	"l",
	"m",
	"n",
	"p",
	"r",
	"s",
	"t",
	"v",
	"w",
	"y",
	"z",
];

// Custom styled TabsTrigger to avoid style duplication
export const StyledTabsTrigger = ({
	value,
	children,
	hasValue = false,
	isSidebar = false,
}: {
	value: string;
	children: React.ReactNode;
	hasValue?: boolean;
	isSidebar?: boolean;
}) => (
	<TabsTrigger
		value={value}
		className={cn(
			"text-xs cursor-pointer text-[var(--sandDark-10)] transition-all duration-200 relative",
			isSidebar
				? "flex hover:text-[var(--sandDark-11)] hover:bg-[var(--sandDark-2)] data-[state=active]:bg-[var(--sandDark-3)] data-[state=active]:text-[var(--sandDark-12)] data-[state=active]:font-medium h-full p-0"
				: "h-full flex p-0 rounded-none border-b border-transparent data-[state=active]:border-b-[var(--sandDark-12)] border-[var(--sandDark-5)] hover:text-[var(--sandDark-11)] hover:border-b-[var(--sandDark-9)] data-[state=active]:bg-[var(--sandDark-3)] data-[state=active]:text-[var(--sandDark-12)]"
		)}
	>
		<div className="flex items-center gap-1 px-2">
			{children}
			{hasValue && (
				<span className="inline-block w-1 h-1 bg-[var(--sandDark-9)] rounded-full" />
			)}
		</div>
	</TabsTrigger>
);

// Create a reusable component for the option buttons
export const OptionButton = ({
	value,
	isSelected,
	onClick,
	isSidebar = false,
}: {
	value: string | number;
	isSelected: boolean;
	onClick: () => void;
	isSidebar?: boolean;
}) => (
	<Button
		key={value}
		onClick={onClick}
		className={cn(
			"h-12 text-xs rounded-none text-center cursor-pointer relative transition-all duration-150 p-2 ring-1 ring-inset border-none z-10",
			isSelected
				? "bg-[var(--sandDark-3)] ring-[var(--sandDark-12)] text-[var(--sandDark-12)]"
				: "ring-transparent border-transparent text-[var(--sandDark-9)] hover:text-[var(--sandDark-11)] hover:ring-[var(--sandDark-9)] hover:bg-[var(--sandDark-2)] focus-visible:ring-1 focus-visible:ring-offset-1"
		)}
		variant="outline"
	>
		{value}
	</Button>
);

// Grid overlay for FloatingMenu
export const GridOverlay = () => (
	<div
		className="absolute inset-0 pointer-events-none z-0"
		style={{
			backgroundImage: `linear-gradient(90deg, var(--sandDark-4) 1px, transparent 0), linear-gradient(0deg, var(--sandDark-4) 1px, transparent 0)`,
			backgroundSize: `calc(100% / 4) 48px`,
			backgroundPosition: "0 0",
			opacity: "0.3",
		}}
	/>
);

// Shared tab management logic
export const getNextTab = (currentTab: NoteField): NoteField => {
	switch (currentTab) {
		case "duration":
			return "pitch";
		case "pitch":
			return "phoneme1";
		case "phoneme1":
			return "phoneme2";
		default:
			return "phoneme2";
	}
};
