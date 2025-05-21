"use client";

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import { Song } from "../lib/types";
import { Note } from "../components/NoteMenuComponents";

// Default notes for a new song
const getDefaultNotes = (): Note[] => [
	{ id: "note1", duration: null, pitch: null, phoneme1: "", phoneme2: "" },
	{ id: "note2", duration: null, pitch: null, phoneme1: "", phoneme2: "" },
	{ id: "note3", duration: null, pitch: null, phoneme1: "", phoneme2: "" },
	{ id: "note4", duration: null, pitch: null, phoneme1: "", phoneme2: "" },
	{ id: "note5", duration: null, pitch: null, phoneme1: "", phoneme2: "" },
];

// Empty song structure
const createNewSong = (id: string): Song => ({
	id,
	title: `Song ${id}`,
	notes: getDefaultNotes(),
	createdAt: Date.now(),
	updatedAt: Date.now(),
});

interface SongsContextType {
	songs: Song[];
	currentSong: Song | null;
	addSong: () => string; // Returns the new song ID
	getSong: (id: string) => Song | null;
	updateSong: (id: string, updatedSong: Partial<Song>) => void;
	deleteSong: (id: string) => void;
	addNoteToSong: (songId: string) => Note | null; // Returns the new note
	removeNoteFromSong: (songId: string, noteId: string) => boolean; // Returns success flag
}

const SongsContext = createContext<SongsContextType | undefined>(undefined);

export function SongsProvider({ children }: { children: ReactNode }) {
	const [songs, setSongs] = useState<Song[]>([]);
	const [currentSong, setCurrentSong] = useState<Song | null>(null);
	const [isInitialized, setIsInitialized] = useState(false);

	// Load songs from localStorage on first mount
	useEffect(() => {
		const loadSongs = () => {
			if (typeof window === "undefined") return;

			try {
				const storedSongs = localStorage.getItem("aeiousinger_songs");
				if (storedSongs) {
					setSongs(JSON.parse(storedSongs));
				} else {
					// Initialize with a default song if none exist
					const defaultSong = createNewSong("1");
					setSongs([defaultSong]);
					localStorage.setItem(
						"aeiousinger_songs",
						JSON.stringify([defaultSong])
					);
				}
			} catch (error) {
				console.error("Failed to load songs from localStorage", error);
				// Fall back to a new default song
				const defaultSong = createNewSong("1");
				setSongs([defaultSong]);
			}

			setIsInitialized(true);
		};

		loadSongs();
	}, []);

	// Save songs to localStorage whenever they change
	useEffect(() => {
		if (!isInitialized) return;

		if (typeof window !== "undefined") {
			localStorage.setItem("aeiousinger_songs", JSON.stringify(songs));
		}
	}, [songs, isInitialized]);

	// Add a new song
	const addSong = (): string => {
		// Generate a new ID that's one higher than the highest existing ID
		const nextId =
			songs.length > 0
				? String(Math.max(...songs.map((song) => parseInt(song.id))) + 1)
				: "1";

		const newSong = createNewSong(nextId);

		setSongs((prevSongs) => [...prevSongs, newSong]);
		return nextId;
	};

	// Get a song by ID
	const getSong = (id: string): Song | null => {
		return songs.find((song) => song.id === id) || null;
	};

	// Update an existing song
	const updateSong = (id: string, updates: Partial<Song>) => {
		setSongs((prevSongs) => {
			// Check if any actual changes exist to avoid needless updates
			const songIndex = prevSongs.findIndex((song) => song.id === id);
			if (songIndex === -1) return prevSongs;

			const oldSong = prevSongs[songIndex];
			const updatedSong = {
				...oldSong,
				...updates,
				updatedAt: Date.now(),
			};

			// Deep equality check for notes to prevent unnecessary updates
			if (updates.notes && areNotesEqual(oldSong.notes, updates.notes)) {
				// If notes are identical, don't update
				return prevSongs;
			}

			const newSongs = [...prevSongs];
			newSongs[songIndex] = updatedSong;
			return newSongs;
		});

		// Only update currentSong if it's the one being updated
		if (currentSong?.id === id) {
			setCurrentSong((prev) =>
				prev ? { ...prev, ...updates, updatedAt: Date.now() } : null
			);
		}
	};

	// Helper function to compare notes arrays
	const areNotesEqual = (oldNotes: Note[], newNotes: Note[]): boolean => {
		if (oldNotes.length !== newNotes.length) return false;

		return oldNotes.every((oldNote, index) => {
			const newNote = newNotes[index];
			return (
				oldNote.id === newNote.id &&
				oldNote.duration === newNote.duration &&
				oldNote.pitch === newNote.pitch &&
				oldNote.phoneme1 === newNote.phoneme1 &&
				oldNote.phoneme2 === newNote.phoneme2
			);
		});
	};

	// Delete a song
	const deleteSong = (id: string) => {
		setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));

		// Clear currentSong if it's the one being deleted
		if (currentSong?.id === id) {
			setCurrentSong(null);
		}
	};

	// Add a new note to a song
	const addNoteToSong = (songId: string): Note | null => {
		let newNote: Note | null = null;

		setSongs((prevSongs) => {
			const songIndex = prevSongs.findIndex((song) => song.id === songId);
			if (songIndex === -1) return prevSongs;

			const song = prevSongs[songIndex];

			// Generate a unique ID for the new note
			const noteIds = song.notes.map((note) => note.id);
			let newNoteId = "";
			let counter = 1;

			// Find available note ID
			do {
				newNoteId = `note${song.notes.length + counter}`;
				counter++;
			} while (noteIds.includes(newNoteId));

			// Create new note
			newNote = {
				id: newNoteId,
				duration: null,
				pitch: null,
				phoneme1: "",
				phoneme2: "",
			};

			// Create new songs array with the updated song
			const newSongs = [...prevSongs];
			newSongs[songIndex] = {
				...song,
				notes: [...song.notes, newNote],
				updatedAt: Date.now(),
			};

			return newSongs;
		});

		return newNote;
	};

	// Remove a note from a song
	const removeNoteFromSong = (songId: string, noteId: string): boolean => {
		let success = false;

		setSongs((prevSongs) => {
			const songIndex = prevSongs.findIndex((song) => song.id === songId);
			if (songIndex === -1) return prevSongs;

			const song = prevSongs[songIndex];

			// Don't allow removing if there's only one note left
			if (song.notes.length <= 1) return prevSongs;

			// Create new songs array with the updated song
			const newSongs = [...prevSongs];
			newSongs[songIndex] = {
				...song,
				notes: song.notes.filter((note) => note.id !== noteId),
				updatedAt: Date.now(),
			};

			success = true;
			return newSongs;
		});

		return success;
	};

	return (
		<SongsContext.Provider
			value={{
				songs,
				currentSong,
				addSong,
				getSong,
				updateSong,
				deleteSong,
				addNoteToSong,
				removeNoteFromSong,
			}}
		>
			{children}
		</SongsContext.Provider>
	);
}

// Hook for using the songs context
export function useSongs() {
	const context = useContext(SongsContext);
	if (context === undefined) {
		throw new Error("useSongs must be used within a SongsProvider");
	}
	return context;
}
