"use client";

import { useState } from "react";
import Link from "next/link";
import { Block } from "./components/Block";
import { SidebarMenu } from "./components/SidebarMenu";

interface Note {
	id: string;
	duration: number;
	pitch: number;
	phoneme1: string;
	phoneme2: string;
}

export default function Home() {
	const [notes, setNotes] = useState<Note[]>([
		{ id: "note1", duration: 4, pitch: 5, phoneme1: "a", phoneme2: "h" },
		{ id: "note2", duration: 2, pitch: 8, phoneme1: "e", phoneme2: "l" },
		{ id: "note3", duration: 8, pitch: 3, phoneme1: "o", phoneme2: "" },
	]);
	const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

	const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

	const handleNoteSelect = (id: string) => {
		if (selectedNoteId === id) {
			setSelectedNoteId(null);
		} else {
			setSelectedNoteId(id);
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

	return (
		<div className="GridLayout h-screen overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen">
				<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-18 h-screen">
					<div className="p-4 border-sandDark-5 border-b flex justify-between items-center col-span-full">
						<h1 className="text-xs font-bold">Note Editor (Sidebar)</h1>
						<Link href="/floating" className="text-xs hover:underline">
							floating
						</Link>
					</div>
					<div
						className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full overflow-y-auto py-12"
						role="application"
						aria-label="Song Editor"
					>
						<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full">
							{notes.map((note) => (
								<Block
									key={note.id}
									duration={note.duration}
									pitch={note.pitch}
									phoneme1={note.phoneme1}
									phoneme2={note.phoneme2}
									isSelected={selectedNoteId === note.id}
									onSelect={() => handleNoteSelect(note.id)}
								/>
							))}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-subgrid col-span-6 h-screen">
					<SidebarMenu
						selectedBlock={selectedNote}
						onValueChange={handleValueChange}
					/>
				</div>
			</main>
		</div>
	);
}
