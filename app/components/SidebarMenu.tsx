import React, { useEffect, useRef } from "react";
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
	phonemes,
	getNextUnfilledTab,
	getFirstUnfilledTab,
} from "./NoteMenuComponents";
import { useGridNavigation } from "../hooks/useGridNavigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarMenuProps {
	selectedBlock: Note | null;
	onValueChange: (id: string, field: NoteField, value: NoteValue) => void;
	activeTab: NoteField;
	onTabChange: (tab: NoteField) => void;
	className?: string;
	onDelete?: () => void;
}

export function SidebarMenu({
	selectedBlock,
	onValueChange,
	activeTab,
	onTabChange,
	className,
	onDelete,
}: SidebarMenuProps) {
	// Initialize grid navigation hooks
	const durationNav = useGridNavigation(durations, 4);
	const pitchNav = useGridNavigation(pitches, 4);
	const phoneme1Nav = useGridNavigation(phonemes, 4);
	const phoneme2Nav = useGridNavigation(phonemes, 4);
	// Track if we're in the middle of handling a tab change
	const isChangingTab = useRef(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const handleKeyDown = (e: React.KeyboardEvent) => {
		console.log("SidebarMenu keyDown:", {
			key: e.key,
			hasDeleteHandler: !!onDelete,
			activeElement: document.activeElement?.tagName,
			menuElement: menuRef.current?.tagName,
		});

		if ((e.key === "Delete" || e.key === "Backspace") && onDelete) {
			console.log("SidebarMenu delete triggered");
			e.preventDefault();
			onDelete();
		}
	};

	// Effect to determine the first unfilled tab ONLY when a block is initially selected
	useEffect(() => {
		if (selectedBlock) {
			// Only set the first unfilled tab when a block is first selected
			isChangingTab.current = true;
			try {
				const firstUnfilledTab = getFirstUnfilledTab(selectedBlock);
				onTabChange(firstUnfilledTab);
			} finally {
				// Reset the flag regardless of success/failure
				setTimeout(() => {
					isChangingTab.current = false;
				}, 0);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedBlock?.id]); // Only run when the selected block ID changes

	if (!selectedBlock) {
		return (
			<div className="border-l border-[var(--app-border)] flex items-center justify-center col-span-full h-full">
				<p className="p-4 text-xs text-center text-[var(--app-fg-muted)]">
					No note selected
				</p>
			</div>
		);
	}

	const handleValueChange = (field: NoteField, value: NoteValue) => {
		// Check if the value is actually changing
		let isValueChanged = false;

		// Type-specific comparison logic
		if (field === "duration" || field === "pitch") {
			isValueChanged = selectedBlock[field] !== value;
		} else {
			// For phonemes, handle empty string comparison correctly
			isValueChanged = String(selectedBlock[field]) !== String(value);
		}

		// Create the updated note
		const updatedNote = { ...selectedBlock, [field]: value };

		// Update the note state
		onValueChange(selectedBlock.id, field, value);

		// Only auto-advance to next tab if the value actually changed
		if (isValueChanged) {
			// Calculate the next tab
			const nextTab = getNextUnfilledTab(updatedNote, field);

			// Set flag to prevent overlapping tab changes
			isChangingTab.current = true;

			// Use a timeout to ensure state update completes before changing tab
			setTimeout(() => {
				onTabChange(nextTab);
				// Reset the flag after a small delay
				setTimeout(() => {
					isChangingTab.current = false;
				}, 50);
			}, 0);
		}
	};

	// Handler for manual tab changes
	const handleManualTabChange = (value: string) => {
		// Prevent manual tab changes when an auto change is in progress
		if (isChangingTab.current) {
			return;
		}

		// Handle manual tab change
		onTabChange(value as NoteField);
	};

	return (
		<div
			ref={menuRef}
			className={cn(
				"flex flex-col col-span-full border-b border-[var(--app-border)] h-full",
				className
			)}
			onKeyDown={handleKeyDown}
			tabIndex={-1}
		>
			<Tabs
				defaultValue="duration"
				value={activeTab}
				onValueChange={handleManualTabChange}
				className="flex-1 flex flex-col gap-0"
			>
				<TabsList className="w-full text-xs h-[60px] bg-transparent flex justify-between border-b border-[var(--app-border)] sticky top-0 bg-[var(--app-bg)]">
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
					className="text-xs flex-1 overflow-y-auto max-h-[240px] pb-12"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4 relative border-b border-[var(--border-2xlight)]">
						<GridOverlay />
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
					className="text-xs flex-1 overflow-y-auto max-h-[240px] pb-12"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4 relative border-b border-[var(--border-2xlight)]">
						<GridOverlay />
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
					className="text-xs flex-1 overflow-y-auto max-h-[240px] pb-12"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4 relative border-b border-[var(--border-2xlight)]">
						<GridOverlay />
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
					className="text-xs flex-1 overflow-y-auto max-h-[240px] pb-12"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4 relative border-b border-[var(--border-2xlight)]">
						<GridOverlay />
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

				{onDelete && (
					<div className="border-t border-[var(--app-border)] p-2 mt-auto bottom-0-dvh bg-[var(--app-bg)] z-10 pb-safe-2">
						<Button
							variant="default"
							size="sm"
							className="w-full text-xs bg-[var(--app-bg-muted)] text-[var(--app-fg-muted)] hover:text-[var(--app-fg)] cursor-pointer"
							onClick={onDelete}
						>
							Delete Note
						</Button>
					</div>
				)}
			</Tabs>
		</div>
	);
}
