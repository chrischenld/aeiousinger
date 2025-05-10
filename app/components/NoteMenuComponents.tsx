import React from "react";
import { cn } from "@/lib/utils";
import { TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export type NoteField = "duration" | "pitch" | "phoneme1" | "phoneme2";
export type NoteValue = number | string;

export interface Note {
	id: string;
	duration: number | null;
	pitch: string | null;
	phoneme1: string;
	phoneme2: string;
}

// Shared data constants
export const durations = [1, 2, 4, 8, 16, 0];
export const pitches = [
	"A♭1",
	"A1",
	"A♯1",
	"B♭1",
	"B1",
	"B♯1",
	"C1",
	"C♯1",
	"D1",
	"D♯1",
	"E1",
	"F1",
	"F♯1",
	"G1",
	"G♯1",
	"A2",
];
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
export const phonemes = [...vowelPhonemes, ...consonantPhonemes];

// Custom styled TabsTrigger to avoid style duplication
export const StyledTabsTrigger = React.forwardRef<
	HTMLButtonElement,
	{
		value: string;
		children: React.ReactNode;
		hasValue?: boolean;
		isSidebar?: boolean;
	}
>(({ value, children, hasValue, isSidebar, ...props }, ref) => (
	<TabsTrigger
		ref={ref}
		value={value}
		className={cn(
			"flex-1 text-xs h-full border-none bg-transparent hover:bg-[var(--sandDark-2)] data-[state=active]:bg-[var(--sandDark-3)] data-[state=active]:text-[var(--sandDark-12)]",
			hasValue && "text-[var(--sandDark-12)]",
			isSidebar && "border-r border-[var(--sandDark-5)] last:border-r-0"
		)}
		{...props}
	>
		{children}
	</TabsTrigger>
));

StyledTabsTrigger.displayName = "StyledTabsTrigger";

// Create a reusable component for the option buttons
export const OptionButton = React.forwardRef<
	HTMLButtonElement,
	{
		value: string | number;
		isSelected: boolean;
		onClick: () => void;
		isSidebar?: boolean;
		index: number;
		onKeyDown: (e: React.KeyboardEvent, index: number) => void;
	}
>(
	(
		{ value, isSelected, onClick, isSidebar = false, index, onKeyDown },
		ref
	) => (
		<Button
			ref={ref}
			onClick={onClick}
			onKeyDown={(e) => onKeyDown(e, index)}
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
	)
);

OptionButton.displayName = "OptionButton";

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

// Determine if a note field is empty
export function isTabFilled(note: Note, field: NoteField): boolean {
	if (!note) return false;

	switch (field) {
		case "duration":
			const durationResult = note.duration !== null;
			return durationResult;
		case "pitch":
			const pitchResult = note.pitch !== null;
			return pitchResult;
		case "phoneme1":
			const phoneme1Result = !!note.phoneme1 && note.phoneme1.trim() !== "";
			return phoneme1Result;
		case "phoneme2":
			const phoneme2Result = !!note.phoneme2 && note.phoneme2.trim() !== "";
			return phoneme2Result;
		default:
			return false;
	}
}

// Find the first unfilled tab in a note
export const getFirstUnfilledTab = (note: Note): NoteField => {
	if (!isTabFilled(note, "duration")) return "duration";
	if (!isTabFilled(note, "pitch")) return "pitch";
	if (!isTabFilled(note, "phoneme1")) return "phoneme1";
	if (!isTabFilled(note, "phoneme2")) return "phoneme2";

	// If all tabs are filled, return duration as default
	return "duration";
};

// Find the next unfilled tab after the current tab
export function getNextUnfilledTab(
	note: Note,
	currentTab: NoteField
): NoteField {
	// If note is null, return default
	if (!note) {
		return "duration";
	}

	// Get the index of the current tab
	const fields: NoteField[] = ["duration", "pitch", "phoneme1", "phoneme2"];
	const currentIndex = fields.indexOf(currentTab);

	// Check if the next field is filled
	for (let i = 1; i <= fields.length; i++) {
		const nextIndex = (currentIndex + i) % fields.length;
		const field = fields[nextIndex];
		const filled = isTabFilled(note, field);

		if (!filled) {
			return field;
		}
	}

	// If all tabs are filled, return duration as default
	return "duration";
}
