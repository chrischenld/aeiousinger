"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Block } from "../components/Block";
import { FloatingMenu } from "../components/FloatingMenu";

interface Note {
	id: string;
	duration: number;
	pitch: number;
	phoneme1: string;
	phoneme2: string;
}

export default function FloatingMenuPage() {
	const [notes, setNotes] = useState<Note[]>([
		{ id: "note1", duration: 4, pitch: 5, phoneme1: "a", phoneme2: "h" },
		{ id: "note2", duration: 2, pitch: 8, phoneme1: "e", phoneme2: "l" },
		{ id: "note3", duration: 8, pitch: 3, phoneme1: "o", phoneme2: "" },
	]);
	const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
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
			// Get the position of the selected block for the floating menu
			if (blockRefs.current[id]) {
				setAnchorRect(blockRefs.current[id]?.getBoundingClientRect() || null);
			}
		}
	};

	const handleValueChange = (
		id: string,
		field: "duration" | "pitch" | "phoneme1" | "phoneme2",
		value: number | string
	) => {
		setNotes((prevNotes) =>
			prevNotes.map((note) =>
				note.id === id ? { ...note, [field]: value } : note
			)
		);
	};

	const handleCloseMenu = () => {
		setSelectedNoteId(null);
		setAnchorRect(null);
	};

	return (
		<div className="GridLayout h-screen overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen">
				<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full h-screen">
					<div className="p-4 border-b flex justify-between items-center col-span-full">
						<h1 className="text-xs">Note Editor (Floating Menu)</h1>
						<Link href="/" className="text-blue-500 hover:underline">
							Switch to Sidebar Version
						</Link>
					</div>
					<div
						className="p-4 overflow-y-auto"
						role="application"
						aria-label="Song Editor"
					>
						<div className="flex flex-wrap gap-2">
							{notes.map((note) => (
								<div
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
									/>
								</div>
							))}
						</div>

						{/* Floating Menu */}
						<FloatingMenu
							selectedBlock={selectedNote}
							onValueChange={handleValueChange}
							anchorRect={anchorRect}
							onClose={handleCloseMenu}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
