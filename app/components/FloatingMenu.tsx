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
	phonemes,
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
	// Track if we're in the middle of handling a tab change
	const isChangingTab = useRef(false);

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
		const menuWidth = menuRect.width;
		const menuHeight = menuRect.height;
		const gap = 10; // Gap between note block and menu

		// First try: Position to the right of the block
		let left = anchorRect.right + gap;
		let top = anchorRect.top;

		// Check if menu would go off right edge
		if (left + menuWidth > windowWidth) {
			// Second try: Position to the left of the block
			left = anchorRect.left - menuWidth - gap;

			// Check if menu would go off left edge
			if (left < 0) {
				// Third try: Position below the block
				top = anchorRect.bottom + gap;

				// Try to align with left edge of block
				left = anchorRect.left;

				// If aligning with left edge causes right overflow, adjust leftward
				if (left + menuWidth > windowWidth) {
					// Adjust to keep menu within right edge
					left = Math.max(0, windowWidth - menuWidth - gap);
				}
			}
		}

		// Check if menu would go off bottom edge
		if (top + menuHeight > windowHeight) {
			// Adjust top position to fit within viewport
			top = Math.max(0, windowHeight - menuHeight - gap);
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
			className="fixed z-50 w-84 bg-[var(--app-bg)] border border-[var(--app-border)] rounded-[1px] shadow-lg"
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
				onValueChange={handleManualTabChange}
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
						hasValue={selectedBlock.phoneme1.length > 0}
					>
						ph1
					</StyledTabsTrigger>
					<StyledTabsTrigger
						value="phoneme2"
						hasValue={selectedBlock.phoneme2.length > 0}
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
