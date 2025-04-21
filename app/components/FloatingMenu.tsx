import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import {
	NoteField,
	NoteValue,
	Note,
	StyledTabsTrigger,
	OptionButton,
	GridOverlay,
	durations,
	pitches,
	vowelPhonemes,
	consonantPhonemes,
	getNextTab,
} from "./NoteMenuComponents";

interface FloatingMenuProps {
	selectedBlock: Note | null;
	onValueChange: (id: string, field: NoteField, value: NoteValue) => void;
	anchorRect?: DOMRect | null; // Position information of the selected Block
	onClose: () => void;
	activeTab: NoteField;
	onTabChange: (tab: NoteField) => void;
}

export function FloatingMenu({
	selectedBlock,
	onValueChange,
	anchorRect,
	onClose,
	activeTab,
	onTabChange,
}: FloatingMenuProps) {
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
		onTabChange(getNextTab(field));
	};

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
			<Tabs
				defaultValue="duration"
				value={activeTab}
				onValueChange={(value) => onTabChange(value as NoteField)}
				className="flex flex-col gap-0"
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

				<TabsContent value="duration" className="overflow-y-auto relative">
					<div className="grid grid-cols-4 relative">
						<GridOverlay />
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

				<TabsContent value="pitch" className="overflow-y-auto relative">
					<div className="grid grid-cols-4 relative">
						<GridOverlay />
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

				<TabsContent value="phoneme1" className="overflow-y-auto relative">
					<div className="grid grid-cols-4 relative">
						<GridOverlay />
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

				<TabsContent value="phoneme2" className="overflow-y-auto relative">
					<div className="grid grid-cols-4 relative">
						<GridOverlay />
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
