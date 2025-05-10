import React, { useEffect, useRef, useState, MutableRefObject } from "react";
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
	getNextTab,
	getNextUnfilledTab,
	getFirstUnfilledTab,
} from "./NoteMenuComponents";
import { useGridNavigation } from "../hooks/useGridNavigation";

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
	const firstFocusableRef = useRef<HTMLButtonElement>(null);
	const lastFocusableRef = useRef<HTMLButtonElement | null>(null);
	const lastSelectedBlockIdRef = useRef<string | null>(null);

	// Grid navigation hooks for each tab
	const durationNav = useGridNavigation(durations, 4);
	const pitchNav = useGridNavigation(pitches, 4);
	const phoneme1Nav = useGridNavigation(phonemes, 4);
	const phoneme2Nav = useGridNavigation(phonemes, 4);

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

	// Focus management
	useEffect(() => {
		if (selectedBlock && menuRef.current) {
			// Focus the first focusable element when menu opens
			firstFocusableRef.current?.focus();
		}
	}, [selectedBlock]);

	// Effect to determine the first unfilled tab when a block is selected
	useEffect(() => {
		if (selectedBlock) {
			// Set the first unfilled tab as active
			const firstUnfilledTab = getFirstUnfilledTab(selectedBlock);
			onTabChange(firstUnfilledTab);
		}
	}, [selectedBlock, onTabChange]);

	// Set lastFocusableRef based on the active tab
	useEffect(() => {
		// Wait for the next render to ensure refs are populated
		const timer = setTimeout(() => {
			if (!selectedBlock) return;

			// Find the last button in the currently active tab grid
			let lastButtonIndex = -1;
			let currentRefs: (HTMLButtonElement | null)[] = [];

			switch (activeTab) {
				case "duration":
					lastButtonIndex = durations.length - 1;
					currentRefs = durationNav.buttonRefs.current;
					break;
				case "pitch":
					lastButtonIndex = pitches.length - 1;
					currentRefs = pitchNav.buttonRefs.current;
					break;
				case "phoneme1":
					lastButtonIndex = phonemes.length - 1;
					currentRefs = phoneme1Nav.buttonRefs.current;
					break;
				case "phoneme2":
					lastButtonIndex = phonemes.length - 1;
					currentRefs = phoneme2Nav.buttonRefs.current;
					break;
			}

			// Set the last focusable reference to the last grid item button
			if (lastButtonIndex >= 0) {
				lastFocusableRef.current = currentRefs[lastButtonIndex];
			}
		}, 50); // Small delay to ensure rendering completes

		return () => clearTimeout(timer);
	}, [
		activeTab,
		selectedBlock,
		durations.length,
		pitches.length,
		phonemes.length,
		durationNav.buttonRefs,
		pitchNav.buttonRefs,
		phoneme1Nav.buttonRefs,
		phoneme2Nav.buttonRefs,
	]);

	// Handle keyboard events for focus trapping - but allow tabbing to grid items
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Escape") {
			onClose();
			return;
		}

		// Only handle Tab key if we're at the edges of focusable elements
		if (e.key === "Tab") {
			if (e.shiftKey) {
				// If shift + tab and on first element, move to last
				if (document.activeElement === firstFocusableRef.current) {
					e.preventDefault();
					lastFocusableRef.current?.focus();
				}
			}
			// Remove the forward tab handling to allow natural tab order to grid items
		}
	};

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
		<div
			ref={menuRef}
			className="fixed z-50 w-84 bg-[var(--sandDark-1)] border border-[var(--sandDark-5)] rounded-[1px] shadow-lg"
			style={{
				top: `${position.top}px`,
				left: `${position.left}px`,
				maxHeight: "400px",
			}}
			role="dialog"
			aria-label="Note properties"
			onKeyDown={handleKeyDown}
		>
			<Tabs
				defaultValue="duration"
				value={activeTab}
				onValueChange={(value) => {
					onTabChange(value as NoteField);
				}}
				className="flex flex-col gap-0"
			>
				<TabsList className="h-12 w-full text-xs bg-transparent flex justify-between">
					<StyledTabsTrigger
						ref={firstFocusableRef}
						value="duration"
						hasValue={selectedBlock.duration !== null}
					>
						dur
					</StyledTabsTrigger>
					<StyledTabsTrigger
						value="pitch"
						hasValue={selectedBlock.pitch !== null}
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
					className="overflow-y-auto relative"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4 relative">
						<GridOverlay />
						{durations.map((value, index) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.duration === value}
								onClick={() => handleValueChange("duration", value)}
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
					className="overflow-y-auto relative"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4 relative">
						<GridOverlay />
						{pitches.map((value, index) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.pitch === value}
								onClick={() => handleValueChange("pitch", value)}
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
					className="overflow-y-auto relative"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4 relative">
						<GridOverlay />
						{phonemes.map((value, index) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.phoneme1 === value}
								onClick={() => handleValueChange("phoneme1", value)}
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
					className="overflow-y-auto relative"
					tabIndex={-1}
				>
					<div className="grid grid-cols-4 relative">
						<GridOverlay />
						{phonemes.map((value, index) => (
							<OptionButton
								key={value}
								value={value}
								isSelected={selectedBlock.phoneme2 === value}
								onClick={() => handleValueChange("phoneme2", value)}
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
