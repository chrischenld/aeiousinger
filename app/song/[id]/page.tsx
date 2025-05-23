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
import { ArrowLeftFromLine, PanelRight, PanelTop } from "lucide-react";

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

	// Sidebar size is responsive - keep it at 4 columns from md to xl, then 8 columns
	const sidebarColSpan = "col-span-full md:col-span-4 lg:col-span-8";

	const songNameColSpan = useFloatingMenu
		? "col-span-5 md:col-span-10 lg:col-span-18 xl:col-span-26 2xl:col-span-34"
		: "col-span-5 md:col-span-6 lg:col-span-10 xl:col-span-18 2xl:col-span-26";

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
