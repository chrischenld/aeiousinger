import React from "react";
import { cn } from "@/lib/utils";
import { TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export type NoteField = "duration" | "pitch" | "phoneme1" | "phoneme2";
export type NoteValue = string | null;

export interface Note {
	id: string;
	duration: string | null;
	pitch: string | null;
	phoneme1: string; // Can be empty string or any phoneme (including nonePhoneme "-")
	phoneme2: string; // Can be empty string or any phoneme (including nonePhoneme "-")
}

// Shared data constants
export const regularDurations = [
	"1",
	"1/2",
	"1/4",
	"1/8",
	"1/16",
	"1/32",
	"1/64",
	"2",
	"4",
	"8",
];
export const dottedDurations = [
	"1·",
	"1/2·",
	"1/4·",
	"1/8·",
	"1/16·",
	"1/32·",
	"1/64·",
	"2·",
];
export const tripletDurations = ["1tr", "1/2tr", "1/4tr", "1/8tr", "1/16tr"];
export const durations = [
	...regularDurations,
	...dottedDurations,
	...tripletDurations,
];
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
export const nonePhoneme = "_";
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
export const phonemes = [nonePhoneme, ...consonantPhonemes, ...vowelPhonemes];

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
			"flex-1 text-xs h-full border-none bg-transparent hover:bg-[var(--app-bg-strong)] data-[state=active]:bg-[var(--app-accent-bg)] data-[state=active]:text-[var(--app-fg)] relative",
			"focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--app-fg)] focus-visible:ring-offset-0",
			hasValue && "text-[var(--app-fg)]",
			isSidebar && "border-r border-[var(--app-border)] last:border-r-0"
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
>(({ value, isSelected, onClick, index, onKeyDown }, ref) => (
	<Button
		ref={ref}
		onClick={onClick}
		onKeyDown={(e) => onKeyDown(e, index)}
		className={cn(
			"h-12 text-xs rounded-none text-center cursor-pointer relative transition-all duration-150 p-2 ring-1 ring-inset border-none z-10",
			isSelected
				? "bg-[var(--app-accent-bg)] ring-[var(--app-fg)] text-[var(--app-fg)]"
				: "ring-transparent border-transparent text-[var(--app-fg-muted)] hover:text-[var(--app-fg)] hover:ring-[var(--app-border-hover)] hover:bg-[var(--app-bg-strong)] focus-visible:ring-2 focus-visible:ring-[var(--app-fg)] focus-visible:ring-offset-0"
		)}
		variant="outline"
	>
		{value}
	</Button>
));

OptionButton.displayName = "OptionButton";

// Grid overlay for FloatingMenu
export const GridOverlay = () => (
	<div
		className="absolute inset-0 pointer-events-none z-0"
		style={{
			backgroundImage: `
				linear-gradient(90deg, var(--app-border) 1px, transparent 1px),
				linear-gradient(180deg, var(--app-border) 1px, transparent 1px)
			`,
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
			return note.duration !== null;
		case "pitch":
			return note.pitch !== null;
		case "phoneme1":
			// Consider it filled if it has any content (including nonePhoneme)
			return note.phoneme1 !== undefined && note.phoneme1.length > 0;
		case "phoneme2":
			// Consider it filled if it has any content (including nonePhoneme)
			return note.phoneme2 !== undefined && note.phoneme2.length > 0;
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

	// If all tabs are filled, return the next tab in the sequence
	const nextIndex = (currentIndex + 1) % fields.length;
	return fields[nextIndex];
}
