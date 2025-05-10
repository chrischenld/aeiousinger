import React, { useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import {
	NoteField,
	NoteValue,
	Note,
	StyledTabsTrigger,
	OptionButton,
	durations,
	pitches,
	phonemes,
	getNextTab,
	getNextUnfilledTab,
	getFirstUnfilledTab,
} from "./NoteMenuComponents";
import { useGridNavigation } from "../hooks/useGridNavigation";

interface SidebarMenuProps {
	selectedBlock: Note | null;
	onValueChange: (id: string, field: NoteField, value: NoteValue) => void;
	activeTab: NoteField;
	onTabChange: (tab: NoteField) => void;
}

export function SidebarMenu({
	selectedBlock,
	onValueChange,
	activeTab,
	onTabChange,
}: SidebarMenuProps) {
	// Initialize grid navigation hooks
	const durationNav = useGridNavigation(durations, 4);
	const pitchNav = useGridNavigation(pitches, 4);
	const phoneme1Nav = useGridNavigation(phonemes, 4);
	const phoneme2Nav = useGridNavigation(phonemes, 4);
	const lastSelectedBlockIdRef = useRef<string | null>(null);

	// Effect to determine the first unfilled tab when a block is selected
	useEffect(() => {
		if (selectedBlock) {
			// Set the first unfilled tab as active
			const firstUnfilledTab = getFirstUnfilledTab(selectedBlock);
			onTabChange(firstUnfilledTab);
		}
	}, [selectedBlock, onTabChange]);

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
		// Create the updated note
		const updatedNote = { ...selectedBlock, [field]: value };

		// Calculate the next tab
		const nextTab = getNextUnfilledTab(updatedNote, field);

		// Update the note
		onValueChange(selectedBlock.id, field, value);

		// Change to the next tab
		onTabChange(nextTab);
	};

	return (
		<div className="flex flex-col col-span-full border-l border-[var(--sandDark-5)] border-b border-[var(--sandDark-5)]">
			<Tabs
				defaultValue="duration"
				value={activeTab}
				onValueChange={(value) => {
					onTabChange(value as NoteField);
				}}
				className="flex-1 flex flex-col gap-0"
			>
				<TabsList className="w-full text-xs h-[60px] bg-transparent flex justify-between border-b border-[var(--sandDark-5)]">
					<StyledTabsTrigger
						value="duration"
						hasValue={selectedBlock.duration !== null}
						isSidebar={true}
					>
						dur
					</StyledTabsTrigger>
					<StyledTabsTrigger
						value="pitch"
						hasValue={selectedBlock.pitch !== null}
						isSidebar={true}
					>
						pitch
					</StyledTabsTrigger>
					<StyledTabsTrigger
						value="phoneme1"
						hasValue={selectedBlock.phoneme1 !== ""}
						isSidebar={true}
					>
						ph1
					</StyledTabsTrigger>
					<StyledTabsTrigger
						value="phoneme2"
						hasValue={selectedBlock.phoneme2 !== ""}
						isSidebar={true}
					>
						ph2
					</StyledTabsTrigger>
				</TabsList>

				<TabsContent
					value="duration"
					className="text-xs flex-1 overflow-y-auto"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4">
						{durations.map((value, index) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.duration === value}
								onClick={() => handleValueChange("duration", value)}
								isSidebar={true}
								index={index}
								onKeyDown={durationNav.handleKeyDown}
								ref={(el) => {
									durationNav.buttonRefs.current[index] = el;
								}}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent
					value="pitch"
					className="text-xs flex-1 overflow-y-auto"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4">
						{pitches.map((value, index) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.pitch === value}
								onClick={() => handleValueChange("pitch", value)}
								isSidebar={true}
								index={index}
								onKeyDown={pitchNav.handleKeyDown}
								ref={(el) => {
									pitchNav.buttonRefs.current[index] = el;
								}}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent
					value="phoneme1"
					className="text-xs flex-1 overflow-y-auto"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4">
						{phonemes.map((value, index) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.phoneme1 === value}
								onClick={() => handleValueChange("phoneme1", value)}
								isSidebar={true}
								index={index}
								onKeyDown={phoneme1Nav.handleKeyDown}
								ref={(el) => {
									phoneme1Nav.buttonRefs.current[index] = el;
								}}
							/>
						))}
					</div>
				</TabsContent>

				<TabsContent
					value="phoneme2"
					className="text-xs flex-1 overflow-y-auto"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4">
						{phonemes.map((value, index) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.phoneme2 === value}
								onClick={() => handleValueChange("phoneme2", value)}
								isSidebar={true}
								index={index}
								onKeyDown={phoneme2Nav.handleKeyDown}
								ref={(el) => {
									phoneme2Nav.buttonRefs.current[index] = el;
								}}
							/>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
