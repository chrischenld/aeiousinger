import React, { useState } from "react";
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
			"flex text-xs cursor-pointer text-[var(--sandDark-10)] hover:text-[var(--sandDark-11)] hover:bg-[var(--sandDark-2)] transition-all duration-200 relative",
			"data-[state=active]:bg-[var(--sandDark-3)] data-[state=active]:text-[var(--sandDark-12)] data-[state=active]:font-medium h-full p-0"
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
			"text-xs p-2 border rounded-none text-center cursor-pointer relative transition-all duration-150",
			isSelected
				? "bg-[var(--sandDark-3)] border-[var(--sandDark-12)] text-[var(--sandDark-12)] ring-1 ring-[var(--sandDark-7)] ring-inset"
				: "border-[var(--sandDark-5)] hover:border-[var(--sandDark-6)] hover:bg-[var(--sandDark-1)]"
		)}
		variant="outline"
	>
		{/* {isSelected && (
			<span className="absolute top-1/2 right-0 w-1 h-1 bg-[var(--sandDark-8)] rounded-full transform translate-x-1/2 -translate-y-1/2" />
		)} */}
		{value}
	</Button>
);

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
			<div className="border-l border-[var(--sandDark-5)] flex items-center col-span-full">
				<p className="h-[60px] p-4 w-full text-xs text-center text-[var(--sandDark-10)]">
					No note selected
				</p>
			</div>
		);
	}

	const handleValueChange = (field: NoteField, value: NoteValue) => {
		onValueChange(selectedBlock.id, field, value);
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
		<div className="flex flex-col col-span-full border-l border-[var(--sandDark-5)] border-b border-[var(--sandDark-5)]">
			<Tabs
				defaultValue="duration"
				value={activeTab}
				onValueChange={(value) => setActiveTab(value as NoteField)}
				className="flex-1 flex flex-col"
			>
				<TabsList className="w-full text-xs h-[60px] bg-transparent flex justify-between border-b border-[var(--sandDark-5)]">
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

				<TabsContent
					value="duration"
					className="text-xs flex-1 overflow-y-auto"
				>
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

				<TabsContent value="pitch" className="text-xs flex-1 overflow-y-auto">
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

				<TabsContent
					value="phoneme1"
					className="text-xs flex-1 overflow-y-auto"
				>
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

				<TabsContent
					value="phoneme2"
					className="text-xs flex-1 overflow-y-auto"
				>
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
