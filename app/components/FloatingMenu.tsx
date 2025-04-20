import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type NoteField = "duration" | "pitch" | "phoneme1" | "phoneme2";
type NoteValue = number | string;

// Custom styled TabsTrigger to avoid style duplication
const StyledTabsTrigger = ({
	value,
	children,
	hasValue = false,
}: {
	value: string;
	children: React.ReactNode;
	hasValue?: boolean;
}) => (
	<TabsTrigger
		value={value}
		className={cn(
			"h-full flex text-xs cursor-pointer p-0 rounded-none text-[var(--sandDark-10)] border-b border-transparent data-[state=active]:border-b-[var(--sandDark-12)] border-[var(--sandDark-5)] hover:text-[var(--sandDark-11)] hover:border-b-[var(--sandDark-9)] transition-all duration-200 relative",
			"data-[state=active]:bg-[var(--sandDark-3)] data-[state=active]:text-[var(--sandDark-12)] cursor-pointer"
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
const OptionButton = ({
	value,
	isSelected,
	onClick,
}: {
	value: string | number;
	isSelected: boolean;
	onClick: () => void;
}) => (
	<Button
		key={value}
		onClick={onClick}
		className={cn(
			"h-12 text-xs p-2 border rounded-none text-center cursor-pointer relative transition-all duration-150",
			isSelected
				? "bg-[var(--sandDark-3)] border-[var(--sandDark-12)] font-medium text-[var(--sandDark-12)] ring-1 ring-[var(--sandDark-7)] ring-inset"
				: "border-transparent hover:border-[var(--sandDark-6)] hover:bg-[var(--sandDark-2)]"
		)}
		variant="outline"
	>
		{/* {isSelected && (
			<span className="absolute top-0 right-0 w-2 h-2 bg-[var(--sandDark-8)] rounded-full transform translate-x-1/2 -translate-y-1/2" />
		)} */}
		{value}
	</Button>
);

interface FloatingMenuProps {
	selectedBlock: {
		id: string;
		duration: number;
		pitch: number;
		phoneme1: string;
		phoneme2: string;
	} | null;
	onValueChange: (id: string, field: NoteField, value: NoteValue) => void;
	anchorRect?: DOMRect | null; // Position information of the selected Block
	onClose: () => void;
}

export function FloatingMenu({
	selectedBlock,
	onValueChange,
	anchorRect,
	onClose,
}: FloatingMenuProps) {
	const [activeTab, setActiveTab] = useState<NoteField>("duration");
	const menuRef = useRef<HTMLDivElement>(null);

	// Handle positioning of the floating menu
	const [position, setPosition] = useState({ top: 0, left: 0 });

	useEffect(() => {
		if (!anchorRect || !menuRef.current) return;

		const menuRect = menuRef.current.getBoundingClientRect();
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		// Default position is to the right of the block
		let left = anchorRect.right + 10;
		let top = anchorRect.top;

		// Check if menu would go off right edge
		if (left + menuRect.width > windowWidth) {
			// Position to the left of the block instead
			left = anchorRect.left - menuRect.width - 10;
		}

		// Check if menu would go off bottom edge
		if (top + menuRect.height > windowHeight) {
			// Adjust top position to fit within viewport
			top = windowHeight - menuRect.height - 10;
		}

		setPosition({ top, left });
	}, [anchorRect, activeTab]);

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);

	if (!selectedBlock || !anchorRect) {
		return null;
	}

	const handleValueChange = (field: NoteField, value: NoteValue) => {
		onValueChange(selectedBlock.id, field, value);

		// Auto-advance to next tab if current tab has a value selected
		if (field === "duration") {
			setActiveTab("pitch");
		} else if (field === "pitch") {
			setActiveTab("phoneme1");
		} else if (field === "phoneme1") {
			setActiveTab("phoneme2");
		}
	};

	// Example values - these would be replaced with real options
	const durations = [1, 2, 4, 8, 16];
	const pitches = Array.from({ length: 16 }, (_, i) => i);
	const vowelPhonemes = ["a", "e", "i", "o", "u"];
	const consonantPhonemes = [
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

	return (
		<div
			ref={menuRef}
			className="fixed z-50 w-84 bg-[var(--sandDark-1)] border border-[var(--sandDark-5)] rounded-[1px] shadow-lg"
			style={{
				top: `${position.top}px`,
				left: `${position.left}px`,
				maxHeight: "400px",
			}}
		>
			{/* Close button */}
			{/* <Button
				className="absolute top-1 right-1 text-gray-500 hover:text-gray-700 cursor-pointer"
				onClick={onClose}
				aria-label="Close menu"
			>
				✕
			</Button> */}

			<Tabs
				defaultValue="duration"
				value={activeTab}
				onValueChange={(value) => setActiveTab(value as NoteField)}
				className="flex flex-col"
			>
				<TabsList className="h-12 w-full text-xs bg-transparent flex justify-between">
					<StyledTabsTrigger
						value="duration"
						hasValue={
							selectedBlock.duration !== 0 &&
							selectedBlock.duration !== undefined
						}
					>
						dur
					</StyledTabsTrigger>
					<StyledTabsTrigger
						value="pitch"
						hasValue={
							selectedBlock.pitch !== 0 && selectedBlock.pitch !== undefined
						}
					>
						pitch
					</StyledTabsTrigger>
					<StyledTabsTrigger
						value="phoneme1"
						hasValue={selectedBlock.phoneme1 !== ""}
					>
						ph1
					</StyledTabsTrigger>
					<StyledTabsTrigger
						value="phoneme2"
						hasValue={selectedBlock.phoneme2 !== ""}
					>
						ph2
					</StyledTabsTrigger>
				</TabsList>

				<TabsContent value="duration" className="overflow-y-auto">
					<div className="grid grid-cols-4">
						{durations.map((value) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.duration === value}
								onClick={() => handleValueChange("duration", value)}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent value="pitch" className="overflow-y-auto">
					<div className="grid grid-cols-4">
						{pitches.map((value) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.pitch === value}
								onClick={() => handleValueChange("pitch", value)}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent value="phoneme1" className="overflow-y-auto">
					<div className="grid grid-cols-4">
						{vowelPhonemes.map((value) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.phoneme1 === value}
								onClick={() => handleValueChange("phoneme1", value)}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent value="phoneme2" className="overflow-y-auto">
					<div className="grid grid-cols-4">
						{consonantPhonemes.map((value) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.phoneme2 === value}
								onClick={() => handleValueChange("phoneme2", value)}
							/>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
