"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Block } from "../components/Block";
import { FloatingMenu } from "../components/FloatingMenu";
import {
	NoteField,
	NoteValue,
	Note,
	getFirstUnfilledTab,
} from "../components/NoteMenuComponents";

export default function FloatingMenuPage() {
	const [notes, setNotes] = useState<Note[]>([
		{ id: "note1", duration: 4, pitch: "A1", phoneme1: "a", phoneme2: "h" },
		{ id: "note2", duration: 2, pitch: "D1", phoneme1: "e", phoneme2: "l" },
		{ id: "note3", duration: 8, pitch: "F1", phoneme1: "o", phoneme2: "" },
		{ id: "note4", duration: null, pitch: null, phoneme1: "", phoneme2: "" },
		{ id: "note5", duration: 2, pitch: null, phoneme1: "", phoneme2: "" },
	]);
	const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
	const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
	const [activeTab, setActiveTab] = useState<NoteField>("duration");
	const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

	const handleNoteSelect = (id: string) => {
		// If the clicked note is already selected, deselect it
		if (selectedNoteId === id) {
			setSelectedNoteId(null);
			setAnchorRect(null);
		} else {
			setSelectedNoteId(id);
			// Get the position of the selected block for the floating menu
			if (blockRefs.current[id]) {
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

	return (
		<div className="GridLayout h-screen overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen">
				<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full h-screen">
					<div className="p-4 border-[var(--sandDark-5)] border-b flex justify-between items-center col-span-full">
						<h1 className="text-xs">aeiousinger</h1>
						<Link href="/" className="text-xs hover:underline">
							sidebar
						</Link>
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
						<FloatingMenu
							selectedBlock={selectedNote}
							onValueChange={handleValueChange}
							anchorRect={anchorRect}
							onClose={handleCloseMenu}
							activeTab={activeTab}
							onTabChange={handleTabChange}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
