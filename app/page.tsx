"use client";

import { useState, useRef } from "react";
import { Block } from "./components/Block";
import { SidebarMenu } from "./components/SidebarMenu";
import { FloatingMenu } from "./components/FloatingMenu";
import { NoteField, NoteValue, Note } from "./components/NoteMenuComponents";
import { ThemeToggle } from "./components/ui/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
	// Added state for menu type preference
	const [useFloatingMenu, setUseFloatingMenu] = useState<boolean>(true);
	const [notes, setNotes] = useState<Note[]>([
		{ id: "note1", duration: "1/4", pitch: "A1", phoneme1: "a", phoneme2: "h" },
		{ id: "note2", duration: "1/2", pitch: "D1", phoneme1: "e", phoneme2: "l" },
		{ id: "note3", duration: "1/8", pitch: "F1", phoneme1: "o", phoneme2: "" },
		{ id: "note4", duration: null, pitch: null, phoneme1: "", phoneme2: "" },
		{ id: "note5", duration: "1/2", pitch: null, phoneme1: "", phoneme2: "" },
	]);
	const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState<NoteField>("duration");
	const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
	const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

	const handleNoteSelect = (id: string) => {
		// If the clicked note is already selected, deselect it
		if (selectedNoteId === id) {
			setSelectedNoteId(null);
			setAnchorRect(null);
		} else {
			setSelectedNoteId(id);

			// Only get position for FloatingMenu
			if (useFloatingMenu && blockRefs.current[id]) {
				setAnchorRect(blockRefs.current[id]?.getBoundingClientRect() || null);
			}
		}
	};

	const handleValueChange = (
		id: string,
		field: NoteField,
		value: NoteValue
	) => {
		setNotes((prevNotes) =>
			prevNotes.map((note) =>
				note.id === id ? { ...note, [field]: value } : note
			)
		);
	};

	const handleTabChange = (tab: NoteField) => {
		setActiveTab(tab);
	};

	const handleCloseMenu = () => {
		setSelectedNoteId(null);
		setAnchorRect(null);
	};

	// Toggle between floating and sidebar menu
	const toggleMenuType = () => {
		setUseFloatingMenu(!useFloatingMenu);
		// Clear selection when switching menu types
		setSelectedNoteId(null);
		setAnchorRect(null);
	};

	// Determine the column spans based on menu type and responsive breakpoints
	// Full width for floating menu, or appropriate columns for sidebar layout
	const mainContentColSpan = useFloatingMenu
		? "col-span-full"
		: "col-span-full md:col-span-12 lg:col-span-16 xl:col-span-24 2xl:col-span-32";

	// Sidebar size is responsive - keep it at 4 columns from md to xl, then 8 columns
	const sidebarColSpan = "col-span-full md:col-span-4 lg:col-span-8";

	return (
		<div className="GridLayout h-screen overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen md:grid-rows-1 grid-rows-[1fr_auto]">
				<div
					className={`grid grid-cols-subgrid grid-rows-[auto_1fr] ${mainContentColSpan} h-full`}
				>
					<div className="h-[60px] px-4 border-[var(--app-border)] border-b flex justify-between items-center col-span-full">
						<h1 className="text-xs font-bold text-[var(--app-fg)]">
							aeiousinger
						</h1>
						<div className="flex items-center gap-4">
							<Button
								onClick={toggleMenuType}
								variant="ghost"
								size="sm"
								className="text-xs cursor-pointer"
							>
								{useFloatingMenu ? "Floating" : "Sidebar"}
							</Button>
							<ThemeToggle />
						</div>
					</div>
					<div
						className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full overflow-y-auto py-12"
						role="application"
						aria-label="Song Editor"
					>
						<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full">
							{notes.map((note) => (
								<div
									className="col-span-1 relative"
									key={note.id}
									ref={(el) => {
										blockRefs.current[note.id] = el;
									}}
								>
									<Block
										duration={note.duration}
										pitch={note.pitch}
										phoneme1={note.phoneme1}
										phoneme2={note.phoneme2}
										isSelected={selectedNoteId === note.id}
										onSelect={() => handleNoteSelect(note.id)}
										activeTab={
											selectedNoteId === note.id ? activeTab : undefined
										}
									/>
								</div>
							))}
						</div>

						{/* Render FloatingMenu conditionally */}
						{useFloatingMenu && (
							<FloatingMenu
								selectedBlock={selectedNote}
								onValueChange={handleValueChange}
								anchorRect={anchorRect}
								onClose={handleCloseMenu}
								activeTab={activeTab}
								onTabChange={handleTabChange}
							/>
						)}
					</div>
				</div>

				{/* Render SidebarMenu conditionally */}
				{!useFloatingMenu && (
					<div
						className={`grid grid-cols-subgrid ${sidebarColSpan} h-[300px] md:h-screen border-t md:border-t-0 border-[var(--app-border)]`}
					>
						<SidebarMenu
							selectedBlock={selectedNote}
							onValueChange={handleValueChange}
							activeTab={activeTab}
							onTabChange={handleTabChange}
						/>
					</div>
				)}
			</main>
		</div>
	);
}
