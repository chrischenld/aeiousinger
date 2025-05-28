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
import { toast } from "sonner";
import { CornerLeftUp, Download, PanelRight, PanelTop } from "lucide-react";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import ToolbarItem from "@/app/components/ToolbarItem";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Common focus styles for toolbar items
const focusStyles =
	"ring-1 ring-inset ring-[var(--app-border)] hover:ring-[var(--app-border-hover)] focus-visible:outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--app-fg)]";

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
	const [importJsonError, setImportJsonError] = useState<string | null>(null);
	const [showImportDialog, setShowImportDialog] = useState(false);
	const [pendingImportData, setPendingImportData] = useState<{
		title: string;
		notes: Note[];
		[key: string]: unknown;
	} | null>(null);

	// State for tempo (BPM for quarter note)
	const [tempo, setTempo] = useState<number>(120);

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

	// Helper function to check if the current song has meaningful data
	const hasMeaningfulData = () => {
		if (!song) return false;

		// Check if title is not default
		if (
			song.title &&
			song.title.trim() !== "" &&
			!song.title.startsWith("Untitled")
		) {
			return true;
		}

		// Check if any notes have been modified from defaults
		return notes.some((note) => {
			// Check if note has duration or pitch set
			if (note.duration !== null || note.pitch !== null) {
				return true;
			}

			// Check if phonemes are not default placeholders
			if (
				(note.phoneme1 !== "_" && note.phoneme1 !== "") ||
				(note.phoneme2 !== "_" && note.phoneme2 !== "")
			) {
				return true;
			}

			return false;
		});
	};

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
			// Show success toast
			toast("note deleted");
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
			toast("JSON copied to clipboard");
		} catch (error) {
			console.error("Failed to copy to clipboard:", error);
			toast.error("Failed to copy to clipboard");
		}
	};

	// Handler to import JSON data
	const handleImportJson = () => {
		if (!song || !importJsonValue.trim()) return;

		// Clear any previous errors
		setImportJsonError(null);

		try {
			const importedSong = JSON.parse(importJsonValue.trim());

			// Validate that the imported data has the required structure
			if (!importedSong || typeof importedSong !== "object") {
				console.error("Invalid JSON: Not an object");
				setImportJsonError("Invalid JSON: Not an object");
				toast.error("Invalid JSON: Not an object");
				return;
			}

			if (!importedSong.title || !Array.isArray(importedSong.notes)) {
				console.error("Invalid JSON: Missing required fields (title, notes)");
				setImportJsonError(
					"Invalid JSON: Missing required fields (title, notes)"
				);
				toast.error("Invalid JSON: Missing required fields (title, notes)");
				return;
			}

			// Validate notes structure
			const validNotes = importedSong.notes.every((note: unknown) => {
				if (!note || typeof note !== "object") return false;

				const noteObj = note as Record<string, unknown>;
				return (
					typeof noteObj.id === "string" &&
					(noteObj.duration === null || typeof noteObj.duration === "string") &&
					(noteObj.pitch === null || typeof noteObj.pitch === "string") &&
					typeof noteObj.phoneme1 === "string" &&
					typeof noteObj.phoneme2 === "string"
				);
			});

			if (!validNotes) {
				console.error("Invalid JSON: Notes have invalid structure");
				setImportJsonError("Invalid JSON: Notes have invalid structure");
				toast.error("invalid json. notes have invalid structure");
				return;
			}

			// Check if current song has meaningful data
			if (hasMeaningfulData()) {
				// Store the validated import data and show confirmation dialog
				setPendingImportData(importedSong);
				setShowImportDialog(true);
			} else {
				// Directly import if no meaningful data would be lost
				performImport(importedSong);
			}
		} catch (error) {
			console.error("Failed to import JSON:", error);
			setImportJsonError("Failed to parse JSON");
			toast.error("failed to import song");
		}
	};

	// Function to actually perform the import
	const performImport = (importedSong: {
		title: string;
		notes: Note[];
		[key: string]: unknown;
	}) => {
		if (!song) return;

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

		// Clear the import input and any errors
		setImportJsonValue("");
		setImportJsonError(null);
		setPendingImportData(null);
		setShowImportDialog(false);

		console.log("Song imported successfully");
		toast("Song imported successfully");
	};

	// Handler for confirming import in dialog
	const handleConfirmImport = () => {
		if (pendingImportData) {
			performImport(pendingImportData);
		}
	};

	// Handler for canceling import
	const handleCancelImport = () => {
		setPendingImportData(null);
		setShowImportDialog(false);
	};

	// Helper function to convert duration string to milliseconds
	const durationToMs = (duration: string | null): number => {
		if (!duration) return 60000 / tempo; // Default duration (quarter note in ms)

		// Remove dots and triplet markers for base calculation
		const baseDuration = duration.replace(/[·tr]/g, "");

		// Calculate quarter note duration in ms based on tempo
		const quarterNoteMs = 60000 / tempo; // 60,000ms per minute / BPM

		// Base note values as multipliers of quarter note duration
		const baseMultipliers: Record<string, number> = {
			"1": 4, // Whole note = 4 quarter notes
			"1/2": 2, // Half note = 2 quarter notes
			"1/4": 1, // Quarter note = 1 quarter note
			"1/8": 0.5, // Eighth note = 0.5 quarter notes
			"1/16": 0.25, // Sixteenth note = 0.25 quarter notes
			"1/32": 0.125, // Thirty-second note = 0.125 quarter notes
			"1/64": 0.0625, // Sixty-fourth note = 0.0625 quarter notes
			"2": 8, // Double whole note = 8 quarter notes
			"4": 16, // Quadruple whole note = 16 quarter notes
			"8": 32, // Octuple whole note = 32 quarter notes
		};

		let ms = quarterNoteMs * (baseMultipliers[baseDuration] || 1); // Default to quarter note

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

		// Handle octave numbering: A and B of octave N are actually
		// in the semitone range of octave N-1
		// A3, B3 are lower than C3, D3, etc.
		let adjustedOctave = octave;
		if (note === "A" || note === "B") {
			adjustedOctave = octave - 1;
		}

		// Calculate absolute semitone (C4 = 25)
		// C4 = adjusted octave 4, note C (0) = 4 * 12 + 0 = 48
		// To make C4 = 25, we need: 48 - 23 = 25
		const absoluteSemitone = adjustedOctave * 12 + semitone - 23;

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
			toast("song code copied to clipboard");
			console.log("Song exported successfully:", exportString);
		} catch (error) {
			console.error("Failed to export song:", error);
			toast.error("Failed to export song");
		}
	};

	return (
		<div className="GridLayout h-screen-dvh overflow-hidden">
			<main className="grid grid-cols-subgrid col-span-full h-screen-dvh md:grid-rows-1 grid-rows-[1fr_auto]">
				<div
					className={`grid grid-cols-subgrid grid-rows-[60px_1fr] ${mainContentColSpan} h-full`}
				>
					<div className="grid grid-cols-subgrid col-span-full h-[60px] ring-1 ring-[var(--app-border)] ring-inset col-span-full sticky top-0 bg-[var(--app-bg)] z-10">
						<ToolbarItem
							className={`grid grid-cols-subgrid ${songNameColSpan} items-center ring-1 ring-[var(--app-border)] ring-inset`}
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
						</ToolbarItem>
						<ToolbarItem className="relative">
							<span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-[var(--app-fg-muted)] pointer-events-none">
								♩
							</span>
							<Input
								className={`col-span-full h-full pl-2 pr-2 text-right ring-0 shadow-none ${focusStyles}`}
								value={tempo}
								onChange={(e) => {
									const newTempo = parseInt(e.target.value) || 120;
									setTempo(newTempo);
								}}
								type="number"
								min="1"
								max="999"
							/>
						</ToolbarItem>
						<ToolbarItem>
							<Popover>
								<PopoverTrigger
									className={`col-span-full flex cursor-pointer w-full h-full items-center justify-center ${focusStyles}`}
								>
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
										placeholder={`{"id": "1", "title": "Song 1", "notes": [{"id": "1"`}
										value={importJsonValue}
										onChange={(e) => {
											setImportJsonValue(e.target.value);
											// Clear error when user starts typing
											if (importJsonError) {
												setImportJsonError(null);
											}
										}}
										aria-invalid={!!importJsonError}
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
						</ToolbarItem>
						<ToolbarItem>
							<Button
								onClick={toggleMenuType}
								className={`text-xs col-span-1 md:col-span-2 cursor-pointer h-full rounded-none ${focusStyles}`}
							>
								{useFloatingMenu ? (
									<PanelTop className="w-4 h-4" />
								) : (
									<PanelRight className="w-4 h-4" />
								)}
							</Button>
						</ToolbarItem>
						<ToolbarItem>
							<Link
								href="/dashboard"
								className={`flex items-center justify-center text-xs cursor-pointer col-span-full ${focusStyles}`}
							>
								<CornerLeftUp className="w-4 h-4" />
							</Link>
						</ToolbarItem>
						{/* <ToolbarItem>
							<ThemeToggle
								className={`flex items-center justify-center text-xs col-span-full rounded-none ${focusStyles}`}
							/>
						</ToolbarItem> */}
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

			{showImportDialog && (
				<AlertDialog open={showImportDialog} onOpenChange={handleCancelImport}>
					<AlertDialogContent className="sm:max-w-[425px]">
						<AlertDialogHeader>
							<AlertDialogTitle>Confirm Import</AlertDialogTitle>
							<AlertDialogDescription>
								This will overwrite your current song &quot;{song.title}&quot;
								and all its notes. This action cannot be undone. Are you sure
								you want to continue?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={handleCancelImport}>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction onClick={handleConfirmImport}>
								Confirm
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</div>
	);
}
