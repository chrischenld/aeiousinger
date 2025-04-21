import React from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import {
	NoteField,
	NoteValue,
	Note,
	StyledTabsTrigger,
	OptionButton,
	durations,
	pitches,
	vowelPhonemes,
	consonantPhonemes,
	getNextTab,
} from "./NoteMenuComponents";

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
		onTabChange(getNextTab(field));
	};

	return (
		<div className="flex flex-col col-span-full border-l border-[var(--sandDark-5)] border-b border-[var(--sandDark-5)]">
			<Tabs
				defaultValue="duration"
				value={activeTab}
				onValueChange={(value) => onTabChange(value as NoteField)}
				className="flex-1 flex flex-col gap-0"
			>
				<TabsList className="w-full text-xs h-[60px] bg-transparent flex justify-between border-b border-[var(--sandDark-5)]">
					<StyledTabsTrigger
						value="duration"
						hasValue={
							selectedBlock.duration !== 0 &&
							selectedBlock.duration !== undefined
						}
						isSidebar={true}
					>
						dur
					</StyledTabsTrigger>
					<StyledTabsTrigger
						value="pitch"
						hasValue={
							selectedBlock.pitch !== 0 && selectedBlock.pitch !== undefined
						}
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
				>
					<div className="grid grid-cols-4">
						{durations.map((value) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.duration === value}
								onClick={() => handleValueChange("duration", value)}
								isSidebar={true}
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
								isSidebar={true}
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
								isSidebar={true}
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
								isSidebar={true}
							/>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
