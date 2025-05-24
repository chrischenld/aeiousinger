"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Block } from "../../components/Block";
import { SidebarMenu } from "../../components/SidebarMenu";
import { FloatingMenu } from "../../components/FloatingMenu";
import {
	NoteField,
	NoteValue,
	Note,
} from "../../components/NoteMenuComponents";
import { ThemeToggle } from "../../components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSongs } from "../../context/SongsContext";
import {
	ArrowLeftFromLine,
	Download,
	PanelRight,
	PanelTop,
} from "lucide-react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";

export default function SongEditor() {
	const router = useRouter();
	const { id } = useParams();
	// Ensure id is a string and handle undefined case
	const songId = id ? (Array.isArray(id) ? id[0] : id) : "";

	const { getSong, updateSong, addNoteToSong, removeNoteFromSong } = useSongs();
	const song = getSong(songId);

	// Initialize all hooks unconditionally
	// Added state for menu type preference
	const [useFloatingMenu, setUseFloatingMenu] = useState<boolean>(true);
	// Use a ref to track if we need to initialize notes from song
	const initializedRef = useRef(false);
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
	const [activeTab, setActiveTab] = useState<NoteField>("duration");
	const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
	const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});

	// State for title editing
	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [titleValue, setTitleValue] = useState("");
	const titleInputRef = useRef<HTMLInputElement>(null);

	// State for JSON import
	const [importJsonValue, setImportJsonValue] = useState("");

	// Redirect to dashboard if song not found
	useEffect(() => {
		if (!song) {
			router.push("/dashboard");
		}
	}, [song, router]);

	// Initialize notes from song data once
	useEffect(() => {
		if (song && !initializedRef.current) {
			setNotes(song.notes);
			setTitleValue(song.title); // Initialize title value
			initializedRef.current = true;
		}
	}, [song]);

	// Update title value when song title changes
	useEffect(() => {
		if (song && !isEditingTitle) {
			setTitleValue(song.title);
		}
	}, [song, isEditingTitle]);

	// Effect to focus input when editing starts
	useEffect(() => {
		if (isEditingTitle && titleInputRef.current) {
			titleInputRef.current.focus();
			titleInputRef.current.select();
		}
	}, [isEditingTitle]);

	// Effect to save changes to the song - add a debounce
	const notesRef = useRef(notes);
	useEffect(() => {
		notesRef.current = notes;
	}, [notes]);

	// Use a separate effect for saving with debounce
	useEffect(() => {
		if (!song || !initializedRef.current) return;

		const saveTimeout = setTimeout(() => {
			updateSong(songId, { notes: notesRef.current });
		}, 500); // 500ms debounce

		return () => clearTimeout(saveTimeout);
	}, [notes, songId, updateSong, song]);

	// If song is not found, show loading state
	if (!song) {
		return (
			<div className="GridLayout h-screen overflow-hidden flex items-center justify-center">
				<p>Loading...</p>
			</div>
		);
	}

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

	const songNameColSpan = useFloatingMenu
		? "col-span-4 md:col-span-8 lg:col-span-16 xl:col-span-24 2xl:col-span-32"
		: "col-span-4 md:col-span-4 lg:col-span-8 xl:col-span-16 2xl:col-span-24";

	// Sidebar size is responsive - keep it at 4 columns from md to xl, then 8 columns
	const sidebarColSpan = "col-span-full md:col-span-4 lg:col-span-8";

	const handleAddNote = () => {
		console.log("Adding note to song:", songId);

		// Call the context method and get the new note
		const newNote = addNoteToSong(songId);

		if (newNote) {
			console.log("New note created:", newNote);
			// Add the new note directly to the current notes array
			setNotes((currentNotes) => [...currentNotes, newNote]);
		} else {
			console.error("Failed to create new note");

			// Fallback - get the fresh song data after the update
			const updatedSong = getSong(songId);
			if (updatedSong) {
				console.log("Updated song notes (fallback):", updatedSong.notes);
				// Update local state with the updated notes
				setNotes(updatedSong.notes);
			}
		}
	};

	const handleRemoveNote = (noteId: string) => {
		console.log("Removing note:", noteId);

		// Clear selection if the note being removed is selected
		if (selectedNoteId === noteId) {
			setSelectedNoteId(null);
			setAnchorRect(null);
		}

		// Call the context method
		const success = removeNoteFromSong(songId, noteId);

		if (success) {
			console.log("Note removed successfully, updating local state");
			// Directly update the local state by filtering out the removed note
			setNotes((currentNotes) =>
				currentNotes.filter((note) => note.id !== noteId)
			);
		} else {
			console.error("Failed to remove note");

			// Fallback - get the fresh song data after the update
			const updatedSong = getSong(songId);
			if (updatedSong) {
				console.log(
					"Updated song notes after remove (fallback):",
					updatedSong.notes
				);
				// Update local state with the updated notes
				setNotes(updatedSong.notes);
			}
		}
	};

	// Handler to start editing title
	const handleTitleClick = () => {
		if (!isEditingTitle) {
			setIsEditingTitle(true);
		}
	};

	// Handler to save title changes
	const handleTitleSave = () => {
		if (song && titleValue.trim() !== song.title) {
			updateSong(songId, { title: titleValue.trim() });
		}
		setIsEditingTitle(false);
	};

	// Handler for title input changes
	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitleValue(e.target.value);
	};

	// Handler for title input key events
	const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleTitleSave();
		} else if (e.key === "Escape") {
			setTitleValue(song?.title || "");
			setIsEditingTitle(false);
		}
	};

	// Handler for title input blur
	const handleTitleBlur = () => {
		handleTitleSave();
	};

	// Handler to copy song JSON to clipboard
	const handleExportJson = async () => {
		if (!song) return;

		try {
			const songJson = JSON.stringify(song, null, 2);
			await navigator.clipboard.writeText(songJson);
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
		}
	};

	// Handler to import JSON data
	const handleImportJson = () => {
		if (!song || !importJsonValue.trim()) return;

		try {
			const importedSong = JSON.parse(importJsonValue.trim());

			// Validate that the imported data has the required structure
			if (!importedSong || typeof importedSong !== "object") {
				console.error("Invalid JSON: Not an object");
				return;
			}

			if (!importedSong.title || !Array.isArray(importedSong.notes)) {
				console.error("Invalid JSON: Missing required fields (title, notes)");
				return;
			}

			// Validate notes structure
			const validNotes = importedSong.notes.every(
				(note: any) =>
					note &&
					typeof note === "object" &&
					typeof note.id === "string" &&
					(note.duration === null || typeof note.duration === "string") &&
					(note.pitch === null || typeof note.pitch === "string") &&
					typeof note.phoneme1 === "string" &&
					typeof note.phoneme2 === "string"
			);

			if (!validNotes) {
				console.error("Invalid JSON: Notes have invalid structure");
				return;
			}

			// Create the updated song, preserving the current song's ID
			const updatedSong = {
				...importedSong,
				id: song.id, // Force keep the current song's ID
				updatedAt: Date.now(), // Update the timestamp
			};

			// Update the song in context
			updateSong(songId, updatedSong);

			// Update local state
			setNotes(updatedSong.notes);
			setTitleValue(updatedSong.title);

			// Clear the import input
			setImportJsonValue("");

			console.log("Song imported successfully");
		} catch (error) {
			console.error("Failed to import JSON:", error);
		}
	};

	// Helper function to convert duration string to milliseconds
	const durationToMs = (duration: string | null): number => {
		if (!duration) return 600; // Default duration

		// Remove dots and triplet markers for base calculation
		const baseDuration = duration.replace(/[·tr]/g, "");

		// Base note values in ms (assuming 120 BPM, quarter note = 500ms)
		const baseMs: Record<string, number> = {
			"1": 2000, // Whole note
			"1/2": 1000, // Half note
			"1/4": 500, // Quarter note
			"1/8": 250, // Eighth note
			"1/16": 125, // Sixteenth note
			"1/32": 62.5, // Thirty-second note
			"1/64": 31.25, // Sixty-fourth note
			"2": 4000, // Double whole note
			"4": 8000, // Quadruple whole note
			"8": 16000, // Octuple whole note
		};

		let ms = baseMs[baseDuration] || 500; // Default to quarter note

		// Apply dotted duration (adds 50% to the duration)
		if (duration.includes("·")) {
			ms = ms * 1.5;
		}

		// Apply triplet duration (2/3 of the original duration)
		if (duration.includes("tr")) {
			ms = ms * (2 / 3);
		}

		return Math.round(ms);
	};

	// Helper function to convert pitch string to semitone number (C4 = 25)
	const pitchToSemitone = (pitch: string | null): number => {
		if (!pitch) return 25; // Default to C4

		// Parse the pitch string (e.g., "C4", "A♯3", "D♭5")
		const match = pitch.match(/^([A-G])([♯♭]?)(\d+)$/);
		if (!match) return 25;

		const [, note, accidental, octaveStr] = match;
		const octave = parseInt(octaveStr);

		// Base semitone values for each note in an octave (C = 0)
		const noteValues: Record<string, number> = {
			C: 0,
			D: 2,
			E: 4,
			F: 5,
			G: 7,
			A: 9,
			B: 11,
		};

		let semitone = noteValues[note];

		// Apply accidentals
		if (accidental === "♯") semitone += 1;
		if (accidental === "♭") semitone -= 1;

		// Calculate absolute semitone (C4 = 25, so C1 = 1)
		const absoluteSemitone = octave * 12 + semitone - 47; // -47 to make C4 = 25

		return absoluteSemitone;
	};

	// Handler to export song in the specified format
	const handleExportSong = async () => {
		if (!song) return;

		try {
			const exportedNotes = notes
				.filter((note) => note.duration && note.pitch) // Only export notes with duration and pitch
				.map((note) => {
					// Combine phonemes (remove empty strings and "_")
					const phoneme1 = note.phoneme1 === "_" ? "" : note.phoneme1;
					const phoneme2 = note.phoneme2 === "_" ? "" : note.phoneme2;
					const combinedPhonemes = phoneme1 + phoneme2;

					// Use default if no phonemes
					const phonemes = combinedPhonemes || "dah";

					const duration = durationToMs(note.duration);
					const semitone = pitchToSemitone(note.pitch);

					return `[${phonemes}<${duration},${semitone}>]`;
				});

			const exportString = exportedNotes.join("");

			// Copy to clipboard
			await navigator.clipboard.writeText(exportString);
			console.log("Song exported successfully:", exportString);
		} catch (error) {
			console.error("Failed to export song:", error);
		}
	};

	return (
		<div className="GridLayout h-screen-dvh overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen-dvh md:grid-rows-1 grid-rows-[1fr_auto]">
				<div
					className={`grid grid-cols-subgrid grid-rows-[60px_1fr] ${mainContentColSpan} h-full`}
				>
					<div className="grid grid-cols-subgrid col-span-full h-[60px] border-[var(--app-border)] border-l border-t border-b col-span-full sticky top-0 bg-[var(--app-bg)] z-10">
						<div
							className={`grid grid-cols-subgrid ${songNameColSpan} items-center`}
						>
							<div
								className="h-full col-span-full text-xs font-bold text-[var(--app-fg)] cursor-pointer flex items-center"
								onClick={handleTitleClick}
							>
								{isEditingTitle ? (
									<Input
										type="text"
										value={titleValue}
										onChange={handleTitleChange}
										onKeyDown={handleTitleKeyDown}
										onBlur={handleTitleBlur}
										ref={titleInputRef}
										className="w-full h-full bg-transparent focus-visible:border-none shadow-none focus-visible:ring-2 focus-visible:ring-[var(--app-fg)] focus-visible:ring-inset text-xs font-bold text-[var(--app-fg)] px-2 py-0 min-h-0"
									/>
								) : (
									<h1 className="px-2">{song.title}</h1>
								)}
							</div>
						</div>
						<div className="grid grid-cols-subgrid col-span-1 md:col-span-2 border-l border-[var(--app-border)]">
							<Link
								href="/dashboard"
								className="flex items-center justify-center text-xs cursor-pointer col-span-full"
							>
								<ArrowLeftFromLine className="w-4 h-4" />
							</Link>
						</div>
						<div className="grid grid-cols-subgrid col-span-1 md:col-span-2 border-l border-[var(--app-border)]">
							<Popover>
								<PopoverTrigger className="col-span-full flex cursor-pointer w-full h-full items-center justify-center">
									<Download className="w-4 h-4" />
								</PopoverTrigger>
								<PopoverContent
									className="grid grid-cols-4 w-72"
									side="bottom"
									align="center"
									sideOffset={8}
								>
									<Input
										type="text"
										className="col-span-3 h-12"
										placeholder={`{"id": "1", "title": "Song 1", "notes": [{"id": "1", "duration": 1, "pitch": "C", "phoneme1": "C", "phoneme2": "C"}]}`}
										value={importJsonValue}
										onChange={(e) => setImportJsonValue(e.target.value)}
									/>
									<Button
										className="col-span-1 cursor-pointer h-12 text-xs border-l border-[var(--border-2xlight)]"
										onClick={handleImportJson}
									>
										import
									</Button>
									<Button
										className="col-span-full cursor-pointer h-12 text-xs border-t border-[var(--border-2xlight)]"
										onClick={handleExportJson}
									>
										copy json to clipboard
									</Button>
									<Button
										className="col-span-full cursor-pointer h-12 text-xs border-t border-[var(--border-2xlight)]"
										onClick={handleExportSong}
									>
										export song
									</Button>
								</PopoverContent>
							</Popover>
						</div>
						<div className="grid grid-cols-subgrid col-span-1 md:col-span-2 border-l border-[var(--app-border)]">
							<Button
								onClick={toggleMenuType}
								variant="ghost"
								size="sm"
								className="text-xs col-span-1 md:col-span-2 cursor-pointer h-full"
							>
								{useFloatingMenu ? (
									<PanelTop className="w-4 h-4" />
								) : (
									<PanelRight className="w-4 h-4" />
								)}
							</Button>
						</div>
						<div className="grid grid-cols-subgrid col-span-1 md:col-span-2 border-l border-[var(--app-border)]">
							<ThemeToggle className="flex items-center justify-center text-xs col-span-full" />
						</div>
					</div>

					<div
						className={`grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full h-dvh-content overflow-y-auto ${
							!useFloatingMenu ? "pb-sidebar-safe md:pb-0" : ""
						}`}
						role="application"
						aria-label="Song Editor"
					>
						<div className="grid grid-cols-subgrid grid-rows-[auto_1fr] col-span-full">
							<div className="grid grid-cols-subgrid col-span-full gap-y-8 py-12">
								{notes.map((note) => (
									<div
										className="col-span-1 relative group"
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
											onDelete={
												notes.length > 1
													? () => handleRemoveNote(note.id)
													: undefined
											}
											activeTab={
												selectedNoteId === note.id ? activeTab : undefined
											}
										/>
									</div>
								))}
								<Button
									onClick={handleAddNote}
									className="col-span-1 h-24 items-center cursor-pointer  border-none bg-[var(--app-bg)] hover:bg-[var(--app-bg-strong)] rounded-none col-span-1 w-full h-auto cursor-pointer text-xs text-[var(--app-fg-muted)] overflow-hidden ring-1 ring-inset ring-[var(--app-border)] hover:ring-[var(--app-border-hover)] focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--app-fg)]"
								>
									<p>+</p>
								</Button>
							</div>
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
								onDelete={
									notes.length > 1 && selectedNoteId
										? () => handleRemoveNote(selectedNoteId)
										: undefined
								}
							/>
						)}
					</div>
				</div>

				{/* Render SidebarMenu conditionally */}
				{!useFloatingMenu && (
					<div
						className={`grid grid-cols-subgrid ${sidebarColSpan} h-[300px] md:h-full border-t border-[var(--app-border)] md:h-screen-dvh md:border-t-0 fixed bottom-0 w-full md:static md:bottom-auto md:w-auto bg-[var(--app-bg)] pb-safe md:pb-0 z-20`}
					>
						<SidebarMenu
							selectedBlock={selectedNote}
							onValueChange={handleValueChange}
							activeTab={activeTab}
							onTabChange={handleTabChange}
							className="md:ring-1 ring-[var(--app-border)]"
							onDelete={
								notes.length > 1 && selectedNoteId
									? () => handleRemoveNote(selectedNoteId)
									: undefined
							}
						/>
					</div>
				)}
			</main>
		</div>
	);
}
