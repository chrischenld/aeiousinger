"use client";

import { useState } from "react";
import Link from "next/link";
import { Block } from "./components/Block";
import { SidebarMenu } from "./components/SidebarMenu";
import {
	NoteField,
	NoteValue,
	Note,
	getFirstUnfilledTab,
} from "./components/NoteMenuComponents";
import { ThemeToggle } from "./components/ui/theme-toggle";

export default function Home() {
	const [notes, setNotes] = useState<Note[]>([
		{ id: "note1", duration: 4, pitch: "A1", phoneme1: "a", phoneme2: "h" },
		{ id: "note2", duration: 2, pitch: "D1", phoneme1: "e", phoneme2: "l" },
		{ id: "note3", duration: 8, pitch: "F1", phoneme1: "o", phoneme2: "" },
	]);
	const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState<NoteField>("duration");

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

	return (
		<div className="GridLayout h-screen overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen">
				<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-18 h-screen">
					<div className="h-[60px] px-4 border-[var(--app-border)] border-b flex justify-between items-center col-span-full">
						<h1 className="text-xs font-bold text-[var(--app-fg)]">
							aeiousinger
						</h1>
						<div className="flex items-center gap-4">
							<ThemeToggle />
							<Link
								href="/floating"
								className="text-xs hover:underline text-[var(--app-fg)]"
							>
								floating
							</Link>
						</div>
					</div>
					<div
						className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full overflow-y-auto py-12"
						role="application"
						aria-label="Song Editor"
					>
						<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full">
							{notes.map((note) => (
								<div className="col-span-1 relative" key={note.id}>
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
					</div>
				</div>
				<div className="grid grid-cols-subgrid col-span-6 h-screen">
					<SidebarMenu
						selectedBlock={selectedNote}
						onValueChange={handleValueChange}
						activeTab={activeTab}
						onTabChange={handleTabChange}
					/>
				</div>
			</main>
		</div>
	);
}
