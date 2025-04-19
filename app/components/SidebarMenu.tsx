import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type NoteField = "duration" | "pitch" | "phoneme1" | "phoneme2";
type NoteValue = number | string;

interface SidebarMenuProps {
	selectedBlock: {
		id: string;
		duration: number;
		pitch: number;
		phoneme1: string;
		phoneme2: string;
	} | null;
	onValueChange: (id: string, field: NoteField, value: NoteValue) => void;
}

export function SidebarMenu({
	selectedBlock,
	onValueChange,
}: SidebarMenuProps) {
	const [activeTab, setActiveTab] = useState<NoteField>("duration");

	if (!selectedBlock) {
		return (
			<div className="p-4 text-center text-gray-500">No note selected</div>
		);
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
		<div className="h-full flex flex-col border-l border-sandDark-5 p-4">
			<Tabs
				defaultValue="duration"
				value={activeTab}
				onValueChange={(value) => setActiveTab(value as NoteField)}
				className="flex-1 flex flex-col"
			>
				<TabsList className="w-full grid grid-cols-4 mb-4">
					<TabsTrigger value="duration">Duration</TabsTrigger>
					<TabsTrigger value="pitch">Pitch</TabsTrigger>
					<TabsTrigger value="phoneme1">Phoneme 1</TabsTrigger>
					<TabsTrigger value="phoneme2">Phoneme 2</TabsTrigger>
				</TabsList>

				<TabsContent value="duration" className="flex-1 overflow-y-auto">
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

				<TabsContent value="pitch" className="flex-1 overflow-y-auto">
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

				<TabsContent value="phoneme1" className="flex-1 overflow-y-auto">
					<div className="grid grid-cols-5 gap-2">
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

				<TabsContent value="phoneme2" className="flex-1 overflow-y-auto">
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
