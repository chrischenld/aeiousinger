import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type NoteField = "duration" | "pitch" | "phoneme1" | "phoneme2";
type NoteValue = number | string;

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
			className="fixed z-50 w-64 bg-white border rounded-md shadow-lg p-4"
			style={{
				top: `${position.top}px`,
				left: `${position.left}px`,
				maxHeight: "400px",
			}}
		>
			{/* Close button */}
			<button
				className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
				onClick={onClose}
				aria-label="Close menu"
			>
				✕
			</button>

			<Tabs
				defaultValue="duration"
				value={activeTab}
				onValueChange={(value) => setActiveTab(value as NoteField)}
				className="flex flex-col pt-4"
			>
				<TabsList className="w-full grid grid-cols-4 mb-4">
					<TabsTrigger value="duration">Duration</TabsTrigger>
					<TabsTrigger value="pitch">Pitch</TabsTrigger>
					<TabsTrigger value="phoneme1">Ph 1</TabsTrigger>
					<TabsTrigger value="phoneme2">Ph 2</TabsTrigger>
				</TabsList>

				<TabsContent value="duration" className="overflow-y-auto">
					<div className="grid grid-cols-3 gap-2">
						{durations.map((value) => (
							<button
								key={value}
								onClick={() => handleValueChange("duration", value)}
								className={cn(
									"p-2 border rounded text-center",
									selectedBlock.duration === value
										? "bg-blue-100 border-blue-500"
										: "border-gray-300"
								)}
							>
								{value}
							</button>
						))}
					</div>
				</TabsContent>

				<TabsContent value="pitch" className="overflow-y-auto">
					<div className="grid grid-cols-4 gap-2">
						{pitches.map((value) => (
							<button
								key={value}
								onClick={() => handleValueChange("pitch", value)}
								className={cn(
									"p-2 border rounded text-center",
									selectedBlock.pitch === value
										? "bg-blue-100 border-blue-500"
										: "border-gray-300"
								)}
							>
								{value}
							</button>
						))}
					</div>
				</TabsContent>

				<TabsContent value="phoneme1" className="overflow-y-auto">
					<div className="grid grid-cols-3 gap-2">
						{vowelPhonemes.map((value) => (
							<button
								key={value}
								onClick={() => handleValueChange("phoneme1", value)}
								className={cn(
									"p-2 border rounded text-center",
									selectedBlock.phoneme1 === value
										? "bg-blue-100 border-blue-500"
										: "border-gray-300"
								)}
							>
								{value}
							</button>
						))}
					</div>
				</TabsContent>

				<TabsContent value="phoneme2" className="overflow-y-auto">
					<div className="grid grid-cols-4 gap-2">
						{consonantPhonemes.map((value) => (
							<button
								key={value}
								onClick={() => handleValueChange("phoneme2", value)}
								className={cn(
									"p-2 border rounded text-center",
									selectedBlock.phoneme2 === value
										? "bg-blue-100 border-blue-500"
										: "border-gray-300"
								)}
							>
								{value}
							</button>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
